#!/usr/bin/env python3
"""Show that captured Mayhem text only transports GlobalParams.field_0.

The 441-window source already has zero business reads of this u32. This
script checks the captured .text as well: the only 32-bit memory ops at the
native displacement and at the update-event displacement copy or store the
word. Width-8 ops at the same numeric displacement are recorded and are not
this u32. It does not rename the field, patch the binary, or execute a program.
"""

from __future__ import annotations

import hashlib
import io
import json
import re
import struct
import sys
import tarfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = Path(__file__).resolve().parent

ELF_REL = "evidence/original/mayhem/deployed.so"
ELF_SHA256 = "a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb"
ELF_BYTES = 777408
TEXT_OFF = 0x120
TEXT_SIZE = 0xAC8B8

CAPTURE_REL = "evidence/original/mayhem/capture.json"
CAPTURE_SHA256 = "fcdd031280b2d85491f3600dd8723134d529d39c7e701df9b91ff80a76e48b64"
LAST_DEPLOY_SLOT = 452655053

TAR_REL = "research/claude-mayhem-441-20261028/sources/source.tar.gz"
TAR_SHA256 = "049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494"
TAR_BYTES = 94829

HISTORY_REL = "research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json"
HISTORY_SHA256 = "c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c"
# 十次更新事件里 field_0 都是 8000。v1–v6 写成 Some(8000)，v7–v10 的参数是 None。
HISTORY_SERIES = [8000] * 10
HISTORY_SOME_ARGS = [8000] * 6
HISTORY_NONE_ARGS = 4

PINNED_RUST = {
    "src/lib.rs": "5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579",
    "src/state.rs": "bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0",
    "src/instructions/admin.rs": "9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e",
}

# 宽度 4 的内存操作。0x62 是立即数写，出现也算进 census。
WORD_OPS = {0x61: "ldxw", 0x62: "stw", 0x63: "stxw"}
LOAD_OPS = {0x61, 0x69, 0x71, 0x79}
STORE_OPS = {0x62, 0x63, 0x6A, 0x6B, 0x72, 0x73, 0x7A, 0x7B}
IDENT = re.compile(r"\bfield_0\b")
ALLOWED_ROLES = {"declaration", "binding", "transport_write", "event_read"}

# 位移数值等于 232 / 272 的全部 opcode。分支偏移和 8 字节操作都留在表里。
HISTOGRAM = {
    232: {0x05: 3, 0x15: 2, 0x3D: 1, 0x61: 1, 0x63: 2, 0x79: 14, 0x7B: 4},
    272: {0x05: 1, 0x15: 1, 0x5D: 2, 0x61: 1, 0x69: 1, 0x6B: 1, 0x79: 8, 0x7B: 6, 0xB5: 1},
}
WORD_PCS = {
    232: (0x2BC68, 0x66EF0, 0x68198),
    272: (0xCCE0,),
}
# 半字不是这个 u32。两条都记下来，避免扫描被说成藏起了非字宽的命中。
HALF_AT_272 = (
    (0xF0, 0x69, 1, 7, 0),
    (0x8F910, 0x6B, 8, 4, 0),
)

EVENT_DISC = bytes.fromhex("1802000063a75c980000000098e32629")
COPY_LEN = 4


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_pinned(rel: str, digest: str, size: int | None = None) -> bytes:
    path = ROOT / rel
    data = path.read_bytes()
    if size is not None and len(data) != size:
        raise SystemExit(f"{rel} size {len(data)} != {size}")
    found = sha256(data)
    if found != digest:
        raise SystemExit(f"{rel} sha256 {found} != {digest}")
    return data


def text_section(elf: bytes) -> bytes:
    """取出 .text。捕获镜像里它的文件偏移等于虚拟地址。"""
    if elf[:4] != b"\x7fELF":
        raise SystemExit("not an ELF")
    e_shoff = struct.unpack_from("<Q", elf, 40)[0]
    e_shentsize = struct.unpack_from("<H", elf, 58)[0]
    e_shnum = struct.unpack_from("<H", elf, 60)[0]
    e_shstrndx = struct.unpack_from("<H", elf, 62)[0]
    shstr_header = e_shoff + e_shstrndx * e_shentsize
    shstr_off = struct.unpack_from("<Q", elf, shstr_header + 24)[0]
    found = None
    for index in range(e_shnum):
        off = e_shoff + index * e_shentsize
        name_off = struct.unpack_from("<I", elf, off)[0]
        name_end = elf.find(b"\x00", shstr_off + name_off)
        name = elf[shstr_off + name_off : name_end].decode()
        sh_addr, sh_offset, sh_size = struct.unpack_from("<QQQ", elf, off + 16)
        if name == ".text":
            found = (sh_addr, sh_offset, sh_size)
    if found != (TEXT_OFF, TEXT_OFF, TEXT_SIZE):
        raise SystemExit(f".text geometry {found} != {(TEXT_OFF, TEXT_OFF, TEXT_SIZE)}")
    return elf[TEXT_OFF : TEXT_OFF + TEXT_SIZE]


def decode(text: bytes, pc: int) -> tuple[int, int, int, int, int]:
    op, regs, off, imm = struct.unpack_from("<BBhI", text, pc)
    dst, src = regs & 0xF, regs >> 4
    if imm >= 0x80000000:
        imm -= 0x100000000
    return op, dst, src, off, imm


def histogram(text: bytes) -> dict[int, dict[int, int]]:
    counts = {232: {}, 272: {}}
    for pc in range(0, len(text), 8):
        op, _dst, _src, off, _imm = decode(text, pc)
        if off in counts:
            counts[off][op] = counts[off].get(op, 0) + 1
    return counts


def assert_histogram(text: bytes) -> None:
    found = histogram(text)
    for off, expected in HISTOGRAM.items():
        if found[off] != expected:
            raise SystemExit(f"displacement {off} histogram {found[off]} != {expected}")
    half = []
    for pc in range(0, len(text), 8):
        op, dst, src, off, imm = decode(text, pc)
        if off == 272 and op in (0x69, 0x6B):
            half.append((pc, op, dst, src, imm))
    if tuple(half) != HALF_AT_272:
        raise SystemExit(f"halfword ops at 272 {half} != {HALF_AT_272}")
    for off, pcs in WORD_PCS.items():
        found_pcs = []
        for pc in range(0, len(text), 8):
            op, _dst, _src, disp, _imm = decode(text, pc)
            if disp == off and op in WORD_OPS:
                found_pcs.append(pc)
        if tuple(found_pcs) != pcs:
            raise SystemExit(f"word ops at {off}: {found_pcs} != {pcs}")


def assert_u32_copy(text: bytes, load_pc: int, disp: int) -> None:
    """序列化加载之后只能是 4 字节拷贝。比较或算术会让这里失败。"""
    op, dst, src, off, _imm = decode(text, load_pc)
    if (op, dst, src, off) != (0x61, 1, 7, disp):
        raise SystemExit(f"copy load at {load_pc:#x} is not ldxw r1, [r7+{disp}]")
    spill = decode(text, load_pc + 8)
    mov_r2 = decode(text, load_pc + 16)
    add_r2 = decode(text, load_pc + 24)
    mov_r1 = decode(text, load_pc + 32)
    mov_r3 = decode(text, load_pc + 40)
    call = decode(text, load_pc + 48)
    status = decode(text, load_pc + 56)
    if spill != (0x63, 10, 1, -16, 0):
        raise SystemExit(f"copy spill at {load_pc:#x} uses the word as {spill}")
    if mov_r2 != (0xBF, 2, 10, 0, 0):
        raise SystemExit(f"copy pointer setup at {load_pc:#x} is {mov_r2}")
    if add_r2 != (0x07, 2, 0, 0, -16):
        raise SystemExit(f"copy pointer adjust at {load_pc:#x} is {add_r2}")
    if mov_r1 != (0xBF, 1, 6, 0, 0):
        raise SystemExit(f"copy dst at {load_pc:#x} is {mov_r1}")
    if mov_r3[:4] != (0xB7, 3, 0, 0) or mov_r3[4] != COPY_LEN:
        raise SystemExit(f"copy length at {load_pc:#x} is {mov_r3}")
    if call[0] != 0x85:
        raise SystemExit(f"copy call at {load_pc:#x} is {call}")
    # 调用结果在 r0。这里比较的是写入是否成功，不是字段值。
    if status[0] != 0x55 or status[1] != 0 or status[4] != 0:
        raise SystemExit(f"post-copy branch at {load_pc:#x} is {status}")


def _target(pc: int, off: int) -> int:
    return pc + 8 + off * 8


def assert_setter(text: bytes) -> None:
    """Option 判别位在调用返回后的 r2。Some 才把 r3 里的值写到对象 +232。"""
    call = decode(text, 0x2B940)
    if call[0] != 0x85 or call[2] != 1:
        raise SystemExit(f"setter decoder call is not a pseudo-call: {call}")
    # 紧挨着的下一条保存返回值 r3。r1–r5 会被调用覆盖，所以这个槽就是这次调用留下的值。
    if decode(text, 0x2B948) != (0x7B, 10, 3, -408, 0):
        raise SystemExit("setter does not spill post-call r3 to [r10-408]")
    for pc in range(0x2B950, 0x2BAE8, 8):
        op, dst, _src, _off, _imm = decode(text, pc)
        if dst == 2 and op != 0x18:
            raise SystemExit(f"setter tag register r2 is redefined at {pc:#x}")
    if decode(text, 0x2BAE8) != (0x57, 2, 0, 0, 1):
        raise SystemExit("setter option gate is not `and r2, 1`")
    gate = decode(text, 0x2BAF0)
    if gate[:4] != (0x55, 2, 0, 45) or gate[4] != 0:
        raise SystemExit(f"setter option gate is not `jne r2, 0, +45`: {gate}")
    if _target(0x2BAF0, gate[3]) != 0x2BC60:
        raise SystemExit("Some path does not land on the field_0 reload")
    # None 会落到后面的版本号更新，再被这条无条件跳转带过 store。
    skip = decode(text, 0x2BC58)
    if skip[0] != 0x05 or _target(0x2BC58, skip[3]) <= 0x2BC68:
        raise SystemExit(f"None path does not jump over the field_0 store: {skip}")
    if decode(text, 0x2BC60) != (0x79, 2, 10, -408, 0):
        raise SystemExit("setter reload is not ldxdw r2, [r10-408]")
    if decode(text, 0x2BC68) != (0x63, 1, 2, 232, 0):
        raise SystemExit("setter store is not stxw [r1+232], r2")
    # 同一个基址上的下一格就是已经证明过的 field_1。
    if decode(text, 0x2BC70) != (0x57, 4, 0, 0, 1):
        raise SystemExit("field_0 store is not followed by the field_1 option gate")
    if decode(text, 0x2BC80) != (0x63, 1, 5, 236, 0):
        raise SystemExit("field_0 store is not paired with stxw [r1+236], r5")


def assert_event(text: bytes) -> None:
    if decode(text, 0xCCD0) != (0x61, 1, 7, 276, 0):
        raise SystemExit("event window is not paired with the field_1 load at r7+276")
    if decode(text, 0xCCE0) != (0x61, 9, 7, 272, 0):
        raise SystemExit("event load is not ldxw r9, [r7+272]")
    # 同一条 r7 上的 8 字节加载在 +232，对应的是对象偏移 192，不是 field_0。
    if decode(text, 0xCC10) != (0x79, 1, 7, 232, 0):
        raise SystemExit("event qword at r7+232 changed; it is not the field_0 word")
    accesses = []
    pc = 0xCCE0
    end = 0xD1C0
    while pc < end:
        op, dst, src, off, _imm = decode(text, pc)
        if op == 0x95:
            raise SystemExit(f"exit inside event window at {pc:#x}")
        if op == 0x18:
            pc += 16
            continue
        if dst == 9 or src == 9:
            accesses.append((pc, op, dst, src, off))
        pc += 8
    expected = [
        (0xCCE0, 0x61, 9, 7, 272),
        (0xCED0, 0x63, 1, 9, 16),
        (0xD1B8, 0x63, 7, 9, 16),
    ]
    if accesses != expected:
        raise SystemExit(f"event r9 accesses {accesses} != {expected}")
    if text[0xCEF0:0xCF00] != EVENT_DISC:
        raise SystemExit("event discriminator is not 63a75c9898e32629")
    if decode(text, 0xCF10) != (0x7A, 10, 0, -120, 129):
        raise SystemExit("emit length immediate is not 129")
    if decode(text, 0xD1F8) != (0xB7, 8, 0, 0, 137):
        raise SystemExit("emit_cpi length in r8 is not 137")
    if decode(text, 0xD208) != (0xB7, 2, 0, 0, 137):
        raise SystemExit("emit_cpi length in r2 is not 137")


def assert_checked_u64_add(text: bytes, load_pc: int, base_src: int) -> None:
    """这两处把 8 字节加到另一个 8 字节上，并做无符号溢出检查。

    基址是前一条指令刚从别的指针装进来的。随后又从同一基址的 +240 装一个
    qword。GlobalParams.field_0 在对象 +232 是 u32，version 在 +240 也是 u32，
    而且真正的 field_0 字协议和 field_1 的 +236 成对出现。所以这里不是 field_0。
    """
    prev = decode(text, load_pc - 8)
    load = decode(text, load_pc)
    if prev[0] != 0x79 or prev[1] != 1 or prev[2] != base_src or prev[3] != 88:
        raise SystemExit(f"checked-add base at {load_pc:#x} is not a fresh load from +88")
    if load[0] != 0x79 or load[2] != 1 or load[3] != 232:
        raise SystemExit(f"checked-add load at {load_pc:#x} is not an 8-byte load at +232")
    added = load[1]
    # 下一条把另一个 qword 拷进结果寄存器，再和刚装入的值相加。
    mov = decode(text, load_pc + 8)
    add = decode(text, load_pc + 16)
    if mov[0] != 0xBF or add != (0x0F, mov[1], added, 0, 0):
        raise SystemExit(f"checked-add at {load_pc:#x} is not `add` of the loaded qword")
    other = mov[2]
    flag_one = decode(text, load_pc + 24)
    branch = decode(text, load_pc + 32)
    flag_zero = decode(text, load_pc + 40)
    if flag_one != (0xB7, added, 0, 0, 1):
        raise SystemExit(f"checked-add flag setup at {load_pc:#x} changed")
    # jlt 结果, 加数：无符号和小于其中一个加数，就是溢出。比较的不是 field_0 常量。
    if branch != (0xAD, mov[1], other, 1, 0):
        raise SystemExit(f"checked-add overflow test at {load_pc:#x} is {branch}")
    if flag_zero != (0xB7, added, 0, 0, 0):
        raise SystemExit(f"checked-add clear at {load_pc:#x} changed")
    wider = decode(text, load_pc + 48)
    if wider != (0x79, 1, 1, 240, 0):
        raise SystemExit(f"struct at {load_pc:#x} does not also load a qword at +240")


def assert_qword_sites(text: bytes) -> None:
    """宽度 8 的 +232 不是这个 u32。每一条都有本地形状，出现比较就失败。"""
    loads = []
    stores = []
    for pc in range(0, len(text), 8):
        op, _dst, _src, off, _imm = decode(text, pc)
        if off == 232 and op == 0x79:
            loads.append(pc)
        elif off == 232 and op == 0x7B:
            stores.append(pc)
    if loads != [
        0x340, 0xCC10, 0xDAA0, 0x14DD0, 0x163A8, 0x175D0, 0x28118,
        0x5BDB0, 0x6F150, 0x70308, 0x76348, 0x77880, 0x854F0, 0x86BA8,
    ]:
        raise SystemExit(f"qword loads at 232 changed: {[hex(pc) for pc in loads]}")
    if stores != [0x49E18, 0x5FBB8, 0x64FF0, 0x8F888]:
        raise SystemExit(f"qword stores at 232 changed: {[hex(pc) for pc in stores]}")

    def require(pc: int, expected: tuple[int, int, int, int, int]) -> None:
        found = decode(text, pc)
        if found != expected:
            raise SystemExit(f"insn at {pc:#x} is {found} != {expected}")

    # 直接溢出到栈上的拷贝。下一条不再使用这个值。
    require(0x340, (0x79, 2, 7, 232, 0))
    require(0x348, (0x7B, 10, 2, -8, 0))
    require(0xCC10, (0x79, 1, 7, 232, 0))
    require(0xCC18, (0x7B, 10, 1, -232, 0))
    require(0xDAA0, (0x79, 1, 8, 232, 0))
    require(0xDAA8, (0x7B, 10, 1, -344, 0))
    require(0x5BDB0, (0x79, 8, 7, 232, 0))
    require(0x5BDD8, (0x7B, 1, 8, 0, 0))
    for pc in range(0x5BDB8, 0x5BDD8, 8):
        op, dst, src, _off, _imm = decode(text, pc)
        if dst == 8 or src == 8:
            raise SystemExit(f"qword copy at 0x5bdb0 is consumed early at {pc:#x}")
        if op in (0x15, 0x1D, 0x55, 0x5D, 0xAD, 0xBD) and dst == 8:
            raise SystemExit(f"qword copy compared at {pc:#x}")

    # 下一条把装入的寄存器当指针用。
    for load_pc, base in (
        (0x28118, (0x79, 3, 2, 8, 0)),
        (0x6F150, (0x79, 2, 1, 0, 0)),
        (0x70308, (0x79, 2, 1, 0, 0)),
        (0x76348, (0x79, 2, 1, 0, 0)),
        (0x77880, (0x79, 2, 1, 0, 0)),
        (0x854F0, (0x79, 2, 1, 0, 0)),
        (0x86BA8, (0x79, 2, 1, 0, 0)),
    ):
        loaded = decode(text, load_pc)
        if loaded[0] != 0x79 or loaded[3] != 232:
            raise SystemExit(f"pointer-shaped load at {load_pc:#x} changed")
        if decode(text, load_pc + 8) != base:
            raise SystemExit(f"load at {load_pc:#x} is not immediately dereferenced")

    # 值留在 r2 里进入调用。被调函数的第一条指令从 [r2+8] 装指针。
    require(0x163A8, (0x79, 2, 3, 232, 0))
    call = decode(text, 0x163D0)
    if call[0] != 0x85 or call[2] != 1:
        raise SystemExit("0x163a8 value is not passed into a pseudo-call")
    for pc in range(0x163B0, 0x163D0, 8):
        op, dst, src, _off, _imm = decode(text, pc)
        # 调用前 r2 必须原样留下来。比较或改写都说明它不是一个指针参数。
        if dst == 2 or src == 2:
            raise SystemExit(f"0x163a8 value is used before the call at {pc:#x}")
    callee = _target(0x163D0, call[4])
    if decode(text, callee) != (0x79, 3, 2, 8, 0):
        raise SystemExit("callee of 0x163a8 does not treat r2 as a pointer")

    assert_checked_u64_add(text, 0x14DD0, 7)
    assert_checked_u64_add(text, 0x175D0, 9)


def assert_word_protocol(text: bytes) -> None:
    if len(text) != TEXT_SIZE:
        raise SystemExit(f"text size {len(text)} != {TEXT_SIZE:#x}")
    assert_histogram(text)
    assert_setter(text)
    assert_u32_copy(text, 0x66EF0, 232)
    # 账户解码：同一个 r6，先写 field_0 再写 field_1。这是写入，不是读取。
    if decode(text, 0x68190) != (0x79, 1, 10, -160, 0):
        raise SystemExit("decoder value is not reloaded from [r10-160]")
    if decode(text, 0x68198) != (0x63, 6, 1, 232, 0):
        raise SystemExit("decoder store is not stxw [r6+232], r1")
    if decode(text, 0x681A0) != (0x63, 6, 9, 236, 0):
        raise SystemExit("decoder is not paired with the field_1 store at r6+236")
    assert_event(text)
    assert_qword_sites(text)


def mask_source(text: str) -> str:
    """抹掉注释和字符串。生命周期的单引号保留，避免把后面的代码一起抹掉。"""
    out = list(text)
    i = 0
    n = len(text)
    while i < n:
        if text.startswith("//", i):
            while i < n and text[i] != "\n":
                out[i] = " "
                i += 1
            continue
        if text.startswith("/*", i):
            out[i] = out[i + 1] = " "
            i += 2
            while i < n and not text.startswith("*/", i):
                if text[i] != "\n":
                    out[i] = " "
                i += 1
            if i < n:
                out[i] = out[i + 1] = " "
                i += 2
            continue
        if text[i] == '"':
            out[i] = " "
            i += 1
            while i < n:
                if text[i] == "\\":
                    out[i] = " "
                    if i + 1 < n and text[i + 1] != "\n":
                        out[i + 1] = " "
                        i += 2
                        continue
                if text[i] == "\n":
                    break
                if text[i] == '"':
                    out[i] = " "
                    i += 1
                    break
                out[i] = " "
                i += 1
            continue
        if text[i] == "'":
            # 字符字面量是 'x' 或 '\n'。'info 这种生命周期不闭合，不能当字符串抹。
            if i + 2 < n and text[i + 1] != "\\" and text[i + 2] == "'":
                out[i] = out[i + 1] = out[i + 2] = " "
                i += 3
                continue
            if i + 1 < n and text[i + 1] == "\\":
                out[i] = " "
                i += 1
                while i < n and text[i] != "'" and text[i] != "\n":
                    out[i] = " "
                    i += 1
                if i < n and text[i] == "'":
                    out[i] = " "
                    i += 1
                continue
        i += 1
    return "".join(out)


def classify_line(masked_line: str, start: int) -> str:
    """一个 field_0 标识符的角色。业务读取是账户上的非赋值读取。"""
    prefix = masked_line[:start]
    suffix = masked_line[start + len("field_0") :]
    receiver_match = re.search(r"\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*$", prefix)
    receiver = receiver_match.group(1) if receiver_match else None
    writes = bool(re.match(r"\s*(\+=|=)(?!=)", suffix))
    if receiver is None and re.search(r"\bpub\s+$", prefix):
        return "declaration"
    event = re.search(r"\bfield_0\s*:\s*state\s*\.\s*field_0\b", masked_line)
    if receiver in {"global_params", "params", "state", "self"} and not writes:
        if receiver == "state" and event:
            return "event_read"
        if receiver in {"global_params", "params", "self"}:
            return "business_read"
        return "unclassified_read"
    if receiver in {"global_params", "params", "state", "self"} and writes:
        return "transport_write"
    if receiver is None:
        return "binding"
    return f"unclassified:{receiver}"


def occurrences_in_text(path: str, text: str) -> list[dict]:
    masked = mask_source(text)
    found = []
    for line_no, (raw, masked_line) in enumerate(zip(text.splitlines(), masked.splitlines()), 1):
        for match in IDENT.finditer(masked_line):
            found.append(
                {
                    "file": path,
                    "line": line_no,
                    "column": match.start() + 1,
                    "role": classify_line(masked_line, match.start()),
                    "quote": raw.strip(),
                }
            )
    return found


def program_sources(archive: bytes) -> dict[str, str]:
    files: dict[str, str] = {}
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
        for member in tar.getmembers():
            name = member.name
            if not member.isfile() or not name.endswith(".rs"):
                continue
            if name.startswith("vendor/") or "/vendor/" in name:
                continue
            extracted = tar.extractfile(member)
            if extracted is None:
                raise SystemExit(f"missing tar member {name}")
            files[name] = extracted.read().decode("utf-8")
    if len(files) != 22:
        raise SystemExit(f"program rust file count {len(files)} != 22")
    for name, digest in PINNED_RUST.items():
        if name not in files:
            raise SystemExit(f"missing {name}")
        found = sha256(files[name].encode())
        if found != digest:
            raise SystemExit(f"{name} sha256 {found} != {digest}")
    return files


def collect_occurrences(sources: dict[str, str]) -> list[dict]:
    rows: list[dict] = []
    for path in sorted(sources):
        rows.extend(occurrences_in_text(path, sources[path]))
    return rows


def assert_occurrences(rows: list[dict]) -> None:
    bad = [row for row in rows if row["role"] not in ALLOWED_ROLES]
    if bad:
        raise SystemExit(f"field_0 roles outside transport: {bad}")
    quotes = {(row["file"], row["role"], row["quote"]) for row in rows}
    required = (
        ("src/state.rs", "declaration"),
        ("src/state.rs", "transport_write"),
        ("src/lib.rs", "transport_write"),
        ("src/lib.rs", "event_read"),
        ("src/instructions/admin.rs", "declaration"),
    )
    for file_name, role in required:
        if not any(item[0] == file_name and item[1] == role for item in quotes):
            raise SystemExit(f"missing {role} in {file_name}")
    writes = [row["quote"] for row in rows if row["role"] == "transport_write"]
    if sum("state.field_0 = 0" in quote for quote in writes) != 2:
        raise SystemExit(f"expected initialize and reset zero-writes, got {writes}")
    if not any("self.field_0 = v" in quote for quote in writes):
        raise SystemExit("apply_update write is missing")
    if not any(row["role"] == "event_read" and "field_0: state.field_0" in row["quote"] for row in rows):
        raise SystemExit("event projection is missing")
    if any(row["role"] == "business_read" for row in rows):
        raise SystemExit("field_0 business read appeared")


def history_facts(document: dict) -> dict:
    series = []
    some_args = []
    none_args = 0
    first_event_hex = None
    for tx in document["transactions"]:
        events = tx.get("update_events") or []
        if len(events) > 1:
            raise SystemExit(f"more than one update event in {tx.get('signature')}")
        event_value = None
        if events:
            event_value = events[0]["fields"]["field_0"]
            series.append(event_value)
        for instruction in tx.get("instructions") or []:
            if instruction.get("instruction") != "update_global_params":
                continue
            arg = instruction["args"]["field_0"]
            if arg is None:
                none_args += 1
            else:
                some_args.append(arg)
                if event_value is not None and arg != event_value:
                    raise SystemExit(f"arg {arg} != event {event_value}")
        for instruction in tx.get("instructions") or []:
            if instruction.get("instruction") == "event_cpi_carrier:GlobalParamsUpdateEvent" and first_event_hex is None:
                first_event_hex = instruction["data_hex"]
    if series != HISTORY_SERIES:
        raise SystemExit(f"field_0 series {series} != {HISTORY_SERIES}")
    if some_args != HISTORY_SOME_ARGS or none_args != HISTORY_NONE_ARGS:
        raise SystemExit(f"field_0 args some={some_args} none={none_args}")
    # 8000 的小端是 40 1f 00 00，紧挨着当时的 field_1=10。
    if first_event_hex is None or "401f00000a000000" not in first_event_hex:
        raise SystemExit("first event does not carry field_0=8000 beside field_1=10")
    if "63a75c9898e32629" not in first_event_hex:
        raise SystemExit("first event discriminator mismatch")
    return {"series": series, "some_args": some_args, "none_arg_count": none_args}


def build_survey(root: Path = ROOT) -> dict:
    elf = read_pinned(ELF_REL, ELF_SHA256, ELF_BYTES)
    text = text_section(elf)
    assert_word_protocol(text)
    capture = json.loads(read_pinned(CAPTURE_REL, CAPTURE_SHA256).decode())
    if capture.get("last_deploy_slot") != LAST_DEPLOY_SLOT:
        raise SystemExit("capture last_deploy_slot changed")
    if capture.get("payload_sha256") != ELF_SHA256:
        raise SystemExit("capture payload hash is not the ELF")
    archive = read_pinned(TAR_REL, TAR_SHA256, TAR_BYTES)
    sources = program_sources(archive)
    rows = collect_occurrences(sources)
    assert_occurrences(rows)
    history_raw = read_pinned(HISTORY_REL, HISTORY_SHA256)
    facts = history_facts(json.loads(history_raw.decode()))
    return {
        "claim": "GlobalParams.field_0 is transport-only in the captured Mayhem text",
        "elf": {
            "path": ELF_REL,
            "sha256": ELF_SHA256,
            "bytes": ELF_BYTES,
            "text_file_offset": TEXT_OFF,
            "text_size": TEXT_SIZE,
        },
        "capture": {
            "path": CAPTURE_REL,
            "sha256": CAPTURE_SHA256,
            "last_deploy_slot": LAST_DEPLOY_SLOT,
            "payload_sha256": ELF_SHA256,
        },
        "source_tar": {"path": TAR_REL, "sha256": TAR_SHA256, "bytes": TAR_BYTES},
        "pinned_rust_sha256": PINNED_RUST,
        "word_sites": [
            {
                "name": "setter_store",
                "text_pc": 0x2BC68,
                "file_offset": 0x2BC68 + TEXT_OFF,
                "raw": text[0x2BC68 : 0x2BC70].hex(),
            },
            {
                "name": "account_serializer_load",
                "text_pc": 0x66EF0,
                "file_offset": 0x66EF0 + TEXT_OFF,
                "raw": text[0x66EF0 : 0x66EF8].hex(),
            },
            {
                "name": "account_decoder_store",
                "text_pc": 0x68198,
                "file_offset": 0x68198 + TEXT_OFF,
                "raw": text[0x68198 : 0x681A0].hex(),
            },
            {
                "name": "update_event_load",
                "text_pc": 0xCCE0,
                "file_offset": 0xCCE0 + TEXT_OFF,
                "raw": text[0xCCE0 : 0xCCE8].hex(),
                "event_stores": [0xCED0, 0xD1B8],
                "event_wire_offset": 16,
            },
        ],
        "displacement_histogram": {
            str(off): {f"0x{op:02x}": count for op, count in sorted(ops.items())}
            for off, ops in HISTOGRAM.items()
        },
        "halfword_ops_at_272": [
            {"text_pc": pc, "file_offset": pc + TEXT_OFF, "opcode": f"0x{op:02x}", "raw": text[pc : pc + 8].hex()}
            for pc, op, _dst, _src, _imm in HALF_AT_272
        ],
        "qword_load_pcs_at_232": [
            0x340, 0xCC10, 0xDAA0, 0x14DD0, 0x163A8, 0x175D0, 0x28118,
            0x5BDB0, 0x6F150, 0x70308, 0x76348, 0x77880, 0x854F0, 0x86BA8,
        ],
        "business_read_count": sum(row["role"] == "business_read" for row in rows),
        "source_occurrences": rows,
        "history": facts,
        "timeseries": {"path": HISTORY_REL, "sha256": HISTORY_SHA256},
        "not_claimed": ["field_3"],
    }


def main() -> None:
    fresh = build_survey(ROOT)
    recorded_path = PACKAGE / "survey.json"
    if "--write" in sys.argv:
        recorded_path.write_text(json.dumps(fresh, indent=2, sort_keys=True) + "\n")
        print(f"wrote {recorded_path}")
        return
    recorded = json.loads(recorded_path.read_text())
    if recorded != fresh:
        raise SystemExit("survey.json does not match the recomputed census")
    print("field_0 transport census: ok")
    print(f"business reads: {fresh['business_read_count']}")
    print(f"history: {fresh['history']['series']}")


if __name__ == "__main__":
    main()
