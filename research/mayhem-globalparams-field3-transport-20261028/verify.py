#!/usr/bin/env python3
"""Show that captured Mayhem text only transports GlobalParams.field_3.

Displacement 104 is an 8-byte slot, so a width filter cannot separate it from
other structs. A field_3 access in this image is an 8-byte operation at object
displacement 104 on a base that also has the width-4 field_0 operation at 232
and the field_2 / field_4 qwords at 96 and 112, or the update-event load at
wrapper displacement 144 paired with field_0 at 272. Those four instructions
are the whole set. The 441-window source has no business read of the name.
This script does not rename the field, patch the binary, or execute a program.
"""

from __future__ import annotations

import gzip
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

# 这份带符号的 ELF 和捕获镜像的 .text 逐字节相同。符号只用来给指令命名。
SYMBOLS_REL = "research/claude-mayhem-441-20261028/builds/symbols.so.gz"
SYMBOLS_GZIP_SHA256 = "8f93fd2e398135ba42086c9ba57c7733f7fc8129c03bd7ff52742c67724ea8f3"
SYMBOLS_GZIP_BYTES = 196827
SYMBOLS_SHA256 = "5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448"
SYMBOLS_BYTES = 907776

HISTORY_REL = "research/mayhem-globalparams-field-history/evidence/analysis_timeseries.json"
HISTORY_SHA256 = "c0c3a58fe6a92ba7b4d442159c5e0210441e4cb02266d411c89c29542d09448c"
# 十次更新事件都是这个整数。v1–v6 写成 Some，v7–v10 的参数是 None。
HISTORY_VALUE = 20000000000
HISTORY_SERIES = [HISTORY_VALUE] * 10
HISTORY_SOME_ARGS = [HISTORY_VALUE] * 6
HISTORY_NONE_ARGS = 4

PINNED_RUST = {
    "src/lib.rs": "5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579",
    "src/state.rs": "bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0",
    "src/instructions/admin.rs": "9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e",
}

# 和 field_0 的 u32 配在同一条活基址上的三条对象操作。
SETTER_PC = 0x2BCC0
SERIALIZER_PC = 0x66FB0
DECODER_PC = 0x681D8
EVENT_PC = 0xCCB0
PAIRED_OBJECT_PCS = (SETTER_PC, SERIALIZER_PC, DECODER_PC)

# 同一条对象基址上的 +144 是 field_7，不是 field_3 的事件视图。
FIELD7_SHAPED_144 = (0x2BD40, 0x67208, 0x68220)

APPLY_UPDATE = "_ZN16mayhem_recovered5state12GlobalParams12apply_update17hd8026b0ae003abf7E"
SERIALIZE = (
    "_ZN87_$LT$mayhem_recovered..state..GlobalParams$u20$as$u20$anchor_lang"
    "..AccountSerialize$GT$13try_serialize17he5de98f48c6f0d1bE"
)
DESERIALIZE = (
    "_ZN89_$LT$mayhem_recovered..state..GlobalParams$u20$as$u20$anchor_lang"
    "..AccountDeserialize$GT$25try_deserialize_unchecked17h87d456873fd69834E"
)
UPDATE_EVENT = "_ZN16mayhem_recovered16mayhem_recovered20update_global_params17h5df4e250e0706744E"
INITIALIZE = "_ZN16mayhem_recovered9__private8__global24initialize_global_params17h32a414a032c4aa20E"
RESET = "_ZN16mayhem_recovered9__private8__global11reset_state17h507193dadc3c3422E"

# reset_state / initialize_global_params 写成 0 的 u64 / i128 低位。
# field_0 和 field_1 共用对象 232 处的那一个 8 字节槽。field_9、field_10 和两个上限不在里面。
ZEROED_OFFSETS = frozenset(
    {
        64, 72, 80, 88, 96, 104, 112, 120, 136, 144, 152,
        176, 184, 192, 200, 208, 216, 232,
    }
)

# 位移数值等于 104 的全部 opcode。分支偏移留在表里，避免扫描藏起非内存命中。
HISTOGRAM_104 = {0x05: 2, 0x1D: 1, 0x2D: 1, 0x3D: 1, 0x55: 8, 0x6D: 1, 0x79: 87, 0x7B: 16}

IDENT = re.compile(r"\bfield_3\b")
ALLOWED_ROLES = {"declaration", "binding", "transport_write", "event_read"}
LOADS = {0x61, 0x69, 0x71, 0x79}
STORES = {0x62, 0x6A, 0x72, 0x7A, 0x63, 0x6B, 0x73, 0x7B}
WORD_OPS = {0x61, 0x62, 0x63}
QWORD_OPS = {0x79, 0x7A, 0x7B}
ALU_REG = {0x0F, 0x1F, 0x2F, 0x3F, 0x4F, 0x5F, 0x6F, 0x7F, 0x9F, 0xAF, 0xBF, 0xCF}
ALU_IMM = {0x07, 0x17, 0x27, 0x37, 0x47, 0x57, 0x67, 0x77, 0x87, 0x97, 0xA7, 0xB7, 0xC7}
EVENT_DISC = bytes.fromhex("1802000063a75c980000000098e32629")
COPY_LEN = 8


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_pinned(rel: str, digest: str, size: int | None = None) -> bytes:
    data = (ROOT / rel).read_bytes()
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
    shstr_off = struct.unpack_from("<Q", elf, e_shoff + e_shstrndx * e_shentsize + 24)[0]
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


def instructions(text: bytes) -> tuple[list[int], dict[int, tuple[int, int, int, int, int]]]:
    """按指令边界走。lddw 占 16 字节，后一半不能再被当成一条指令。"""
    pcs: list[int] = []
    insns: dict[int, tuple[int, int, int, int, int]] = {}
    pc = 0
    while pc < len(text):
        decoded = decode(text, pc)
        pcs.append(pc)
        insns[pc] = decoded
        pc += 16 if decoded[0] == 0x18 else 8
    return pcs, insns


def symbols(elf: bytes) -> list[tuple[int, int, str]]:
    """返回 .text 内的函数 (text_pc, size, name)，按地址排序。"""
    if elf[:4] != b"\x7fELF":
        raise SystemExit("symbols file is not an ELF")
    e_shoff = struct.unpack_from("<Q", elf, 40)[0]
    e_shentsize = struct.unpack_from("<H", elf, 58)[0]
    e_shnum = struct.unpack_from("<H", elf, 60)[0]
    e_shstrndx = struct.unpack_from("<H", elf, 62)[0]
    shstr_off = struct.unpack_from("<Q", elf, e_shoff + e_shstrndx * e_shentsize + 24)[0]
    sections: dict[str, tuple[int, int, int]] = {}
    for index in range(e_shnum):
        off = e_shoff + index * e_shentsize
        name_off = struct.unpack_from("<I", elf, off)[0]
        name_end = elf.find(b"\x00", shstr_off + name_off)
        name = elf[shstr_off + name_off : name_end].decode()
        sh_addr, sh_offset, sh_size = struct.unpack_from("<QQQ", elf, off + 16)
        sections[name] = (sh_offset, sh_size, sh_addr)
    text_addr = sections[".text"][2]
    sym_off, sym_size, _ = sections[".symtab"]
    str_off = sections[".strtab"][0]
    if sections[".text"][1] != TEXT_SIZE or text_addr != TEXT_OFF:
        raise SystemExit("symbols ELF .text geometry is not the captured text")
    found: list[tuple[int, int, str]] = []
    for off in range(sym_off, sym_off + sym_size, 24):
        st_name, st_info, _other, _shndx, st_value, st_size = struct.unpack_from("<IBBHQQ", elf, off)
        if (st_info & 0xF) != 2 or st_size == 0:
            continue
        if not (text_addr <= st_value < text_addr + TEXT_SIZE):
            continue
        name_end = elf.find(b"\x00", str_off + st_name)
        name = elf[str_off + st_name : name_end].decode()
        found.append((st_value - text_addr, st_size, name))
    found.sort()
    return found


def owner(funcs: list[tuple[int, int, str]], pc: int) -> tuple[int, int, str]:
    lo, hi = 0, len(funcs) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        start, size, name = funcs[mid]
        if start <= pc < start + size:
            return start, size, name
        if pc < start:
            hi = mid - 1
        else:
            lo = mid + 1
    raise SystemExit(f"no symbol owns text pc {pc:#x}")


def _writes(op: int, dst: int, base: int) -> bool:
    if dst == base and (op in LOADS or op in ALU_REG or op in ALU_IMM or op == 0x18):
        return True
    # 调用会覆盖 r0–r5。r6–r9 还活着，基址如果在这些寄存器里就能跨过调用。
    return op == 0x85 and base <= 5


def live_has(
    pcs: list[int],
    insns: dict[int, tuple[int, int, int, int, int]],
    start: int,
    base: int,
    want_off: int,
    want_ops: set[int],
) -> bool:
    """基址寄存器还没被改写时，同一条基址上有没有目标位移的内存操作。"""
    index = {pc: i for i, pc in enumerate(pcs)}

    def hit(op: int, src: int, dst: int, off: int) -> bool:
        if off != want_off or op not in want_ops:
            return False
        if op in LOADS:
            return src == base
        if op in STORES:
            return dst == base
        return False

    for cursor in range(index[start] - 1, -1, -1):
        pc = pcs[cursor]
        op, dst, src, off, _imm = insns[pc]
        if hit(op, src, dst, off):
            return True
        if _writes(op, dst, base):
            break
    for cursor in range(index[start] + 1, len(pcs)):
        pc = pcs[cursor]
        op, dst, src, off, _imm = insns[pc]
        if _writes(op, dst, base):
            break
        if hit(op, src, dst, off):
            return True
    return False


def histogram_104(text: bytes) -> dict[int, int]:
    counts: dict[int, int] = {}
    for pc in range(0, len(text), 8):
        op, _dst, _src, off, _imm = decode(text, pc)
        if off == 104:
            counts[op] = counts.get(op, 0) + 1
    return counts


def paired_sites(
    pcs: list[int], insns: dict[int, tuple[int, int, int, int, int]]
) -> tuple[list[int], list[int], list[int]]:
    """返回 (对象 field_3, 事件 field_3, 对象 field_7 形状的 +144)。"""
    object_104: list[int] = []
    event_144: list[int] = []
    object_144: list[int] = []
    for pc, (op, dst, src, off, _imm) in insns.items():
        if op not in (0x79, 0x7B):
            continue
        base = src if op == 0x79 else dst
        if off == 104 and live_has(pcs, insns, pc, base, 232, WORD_OPS):
            if not (
                live_has(pcs, insns, pc, base, 96, QWORD_OPS)
                and live_has(pcs, insns, pc, base, 112, QWORD_OPS)
            ):
                raise SystemExit(f"+104 at {pc:#x} meets field_0 but not field_2/field_4")
            object_104.append(pc)
        if off == 144 and live_has(pcs, insns, pc, base, 272, WORD_OPS):
            event_144.append(pc)
        if off == 144 and live_has(pcs, insns, pc, base, 232, WORD_OPS):
            object_144.append(pc)
    return object_104, event_144, object_144


def assert_copy8(text: bytes, load_pc: int) -> None:
    """序列化加载之后只能是 8 字节拷贝。拿去比较会在这里失败。"""
    if decode(text, load_pc) != (0x79, 1, 7, 104, 0):
        raise SystemExit("serializer load is not ldxdw r1, [r7+104]")
    if decode(text, load_pc + 8) != (0x7B, 10, 1, -16, 0):
        raise SystemExit("serializer spill is not a qword store")
    if decode(text, load_pc + 16) != (0xBF, 2, 10, 0, 0):
        raise SystemExit("serializer pointer setup changed")
    if decode(text, load_pc + 24) != (0x07, 2, 0, 0, -16):
        raise SystemExit("serializer pointer adjust changed")
    if decode(text, load_pc + 32) != (0xBF, 1, 6, 0, 0):
        raise SystemExit("serializer destination changed")
    length = decode(text, load_pc + 40)
    if length[:4] != (0xB7, 3, 0, 0) or length[4] != COPY_LEN:
        raise SystemExit(f"serializer length is {length}")
    if decode(text, load_pc + 48)[0] != 0x85:
        raise SystemExit("serializer copy is not a call")
    status = decode(text, load_pc + 56)
    # 比较的是写入是否成功（r0），不是字段值。
    if status[0] != 0x55 or status[1] != 0 or status[4] != 0:
        raise SystemExit(f"serializer status check is {status}")
    if decode(text, load_pc - 64) != (0x79, 1, 7, 96, 0):
        raise SystemExit("serializer is not preceded by the field_2 copy")
    if decode(text, load_pc + 64) != (0x79, 1, 7, 112, 0):
        raise SystemExit("serializer is not followed by the field_4 copy")


def assert_setter(text: bytes) -> None:
    """Some 才把栈上的值写到对象 +104。None 跳回下一个字段的判别，碰不到这条 store。"""
    if decode(text, SETTER_PC) != (0x7B, 1, 2, 104, 0):
        raise SystemExit("setter store is not stxdw [r1+104], r2")
    if decode(text, SETTER_PC - 8) != (0x79, 2, 10, -416, 0):
        raise SystemExit("setter does not reload the saved option value")
    # 上一个字段写完后，tag 为 0 就跳过这条 store。
    skip = decode(text, SETTER_PC - 16)
    if skip != (0x15, 6, 0, -50, 0):
        raise SystemExit(f"setter None edge is {skip}")
    if SETTER_PC - 16 + 8 + (-50) * 8 != 0x2BB28:
        raise SystemExit("setter None edge does not land on the next tag test")
    # 判别链上的 Some 直接跳到 reload，而不是跳到 store 前面的 None 边。
    some = decode(text, 0x2BB20)
    if some != (0x55, 6, 0, 50, 0) or 0x2BB20 + 8 + 50 * 8 != SETTER_PC - 8:
        raise SystemExit(f"setter Some edge is {some}")
    if decode(text, SETTER_PC - 32) != (0x7B, 1, 2, 96, 0):
        raise SystemExit("setter is not paired with the field_2 store")
    if decode(text, SETTER_PC + 32) != (0x7B, 1, 2, 112, 0):
        raise SystemExit("setter is not paired with the field_4 store")
    if decode(text, 0x2BC68) != (0x63, 1, 2, 232, 0):
        raise SystemExit("setter base lost the field_0 word store")


def assert_decoder(text: bytes) -> None:
    if decode(text, DECODER_PC) != (0x7B, 6, 1, 104, 0):
        raise SystemExit("decoder store is not stxdw [r6+104], r1")
    if decode(text, DECODER_PC - 8) != (0x79, 1, 10, -144, 0):
        raise SystemExit("decoder value is not reloaded from the stack")
    if decode(text, DECODER_PC - 16) != (0x7B, 6, 1, 96, 0):
        raise SystemExit("decoder is not paired with the field_2 store")
    if decode(text, DECODER_PC + 16) != (0x7B, 6, 1, 112, 0):
        raise SystemExit("decoder is not paired with the field_4 store")
    if decode(text, 0x68198) != (0x63, 6, 1, 232, 0):
        raise SystemExit("decoder base lost the field_0 word store")


def assert_event(text: bytes) -> None:
    if decode(text, EVENT_PC) != (0x79, 1, 7, 144, 0):
        raise SystemExit("event load is not ldxdw r1, [r7+144]")
    if decode(text, EVENT_PC + 8) != (0x7B, 10, 1, -152, 0):
        raise SystemExit("event spill is not [r10-152]")
    if decode(text, 0xCCE0) != (0x61, 9, 7, 272, 0):
        raise SystemExit("event base lost the field_0 word at r7+272")
    # 同一个槽只被写一次、读两次，两次都紧接着写到输出偏移 32。
    slot_uses: list[tuple[int, int]] = []
    pc = EVENT_PC
    end = 0xD198
    while pc < end:
        op, dst, src, off, _imm = decode(text, pc)
        if op == 0x95:
            raise SystemExit(f"exit inside event window at {pc:#x}")
        if off == -152 and op in (0x79, 0x7B):
            slot_uses.append((pc, op))
        pc += 16 if op == 0x18 else 8
    if slot_uses != [(EVENT_PC + 8, 0x7B), (0xCEA0, 0x79), (0xD188, 0x79)]:
        raise SystemExit(f"event slot uses {slot_uses}")
    if decode(text, 0xCEA8) != (0x7B, 1, 2, 32, 0):
        raise SystemExit("emit store is not stxdw [r1+32], r2")
    if decode(text, 0xD190) != (0x7B, 7, 1, 32, 0):
        raise SystemExit("emit_cpi store is not stxdw [r7+32], r1")
    if text[0xCEF0:0xCF00] != EVENT_DISC:
        raise SystemExit("event discriminator is not 63a75c9898e32629")


def zero_base(text: bytes, start: int, end: int) -> int:
    """在这个函数里找唯一的栈基址，使 r10 上的 8 字节零槽刚好盖住源码清掉的那些字段。"""
    slots: list[int] = []
    pc = start
    while pc < end:
        op, dst, _src, off, imm = decode(text, pc)
        if op == 0x7A and dst == 10 and imm == 0:
            slots.append(off)
        pc += 16 if op == 0x18 else 8
    found: list[int] = []
    for slot in slots:
        base = slot - 104
        if {item - base for item in slots} == ZEROED_OFFSETS:
            found.append(base)
    unique = sorted(set(found))
    if len(unique) != 1:
        raise SystemExit(f"stack zero base for {start:#x} is {unique}, slots {slots}")
    return unique[0]


def assert_stack_zero(text: bytes, funcs: list[tuple[int, int, str]], name: str) -> int:
    start, size, owner_name = owner(funcs, next(pc for pc, _size, found in funcs if found == name))
    if owner_name != name:
        raise SystemExit(f"symbol lookup failed for {name}")
    base = zero_base(text, start, start + size)
    slot = base + 104
    # 这个槽必须确实是一条立即数 0 的 8 字节写。
    found = False
    pc = start
    while pc < start + size:
        op, dst, _src, off, imm = decode(text, pc)
        if op == 0x7A and dst == 10 and imm == 0 and off == slot:
            found = True
        pc += 16 if op == 0x18 else 8
    if not found:
        raise SystemExit(f"{name} does not zero stack slot {slot}")
    return base


def assert_protocol(text: bytes, funcs: list[tuple[int, int, str]]) -> dict[str, int]:
    if len(text) != TEXT_SIZE:
        raise SystemExit(f"text size {len(text)} != {TEXT_SIZE:#x}")
    if histogram_104(text) != HISTOGRAM_104:
        raise SystemExit(f"displacement 104 histogram changed: {histogram_104(text)}")
    pcs, insns = instructions(text)
    object_104, event_144, object_144 = paired_sites(pcs, insns)
    if tuple(object_104) != PAIRED_OBJECT_PCS:
        raise SystemExit(f"paired object sites {[hex(pc) for pc in object_104]}")
    if event_144 != [EVENT_PC]:
        raise SystemExit(f"event sites {[hex(pc) for pc in event_144]}")
    if tuple(object_144) != FIELD7_SHAPED_144:
        raise SystemExit(f"object +144 sites {[hex(pc) for pc in object_144]}")
    assert_setter(text)
    assert_copy8(text, SERIALIZER_PC)
    assert_decoder(text)
    assert_event(text)
    for pc, expected in (
        (SETTER_PC, APPLY_UPDATE),
        (SERIALIZER_PC, SERIALIZE),
        (DECODER_PC, DESERIALIZE),
        (EVENT_PC, UPDATE_EVENT),
    ):
        _start, _size, name = owner(funcs, pc)
        if name != expected:
            raise SystemExit(f"{pc:#x} is in {name}, not {expected}")
    # 名字里带 GlobalParams 的函数，只有这三条碰对象位移 104。
    touching: list[str] = []
    for pc, (op, _dst, _src, off, _imm) in insns.items():
        if off == 104 and op in (0x79, 0x7B):
            _start, _size, name = owner(funcs, pc)
            if "GlobalParams" in name:
                touching.append(name)
    if sorted(set(touching)) != sorted({APPLY_UPDATE, SERIALIZE, DESERIALIZE}):
        raise SystemExit(f"GlobalParams functions touching +104: {sorted(set(touching))}")
    init_base = assert_stack_zero(text, funcs, INITIALIZE)
    reset_base = assert_stack_zero(text, funcs, RESET)
    if init_base != -520 or reset_base != -536:
        raise SystemExit(f"stack bases init={init_base} reset={reset_base}")
    return {"initialize_base": init_base, "reset_base": reset_base}


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
    """一个 field_3 标识符的角色。业务读取是账户上的非赋值读取。"""
    prefix = masked_line[:start]
    suffix = masked_line[start + len("field_3") :]
    receiver_match = re.search(r"\b([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*$", prefix)
    receiver = receiver_match.group(1) if receiver_match else None
    writes = bool(re.match(r"\s*(\+=|=)(?!=)", suffix))
    if receiver is None and re.search(r"\bpub\s+$", prefix):
        return "declaration"
    event = re.search(r"\bfield_3\s*:\s*state\s*\.\s*field_3\b", masked_line)
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


def assert_occurrences(rows: list[dict]) -> None:
    bad = [row for row in rows if row["role"] not in ALLOWED_ROLES]
    if bad:
        raise SystemExit(f"field_3 roles outside transport: {bad}")
    writes = [row["quote"] for row in rows if row["role"] == "transport_write"]
    if sum("state.field_3 = 0" in quote for quote in writes) != 2:
        raise SystemExit(f"expected initialize and reset zero-writes, got {writes}")
    if not any("self.field_3 = v" in quote for quote in writes):
        raise SystemExit("apply_update write is missing")
    if not any(row["role"] == "event_read" and "field_3: state.field_3" in row["quote"] for row in rows):
        raise SystemExit("event projection is missing")
    if any(row["role"] == "business_read" for row in rows):
        raise SystemExit("field_3 business read appeared")


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
            event_value = events[0]["fields"]["field_3"]
            series.append(event_value)
        for instruction in tx.get("instructions") or []:
            if instruction.get("instruction") != "update_global_params":
                continue
            arg = instruction["args"]["field_3"]
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
        raise SystemExit(f"field_3 series {series} != {HISTORY_SERIES}")
    if some_args != HISTORY_SOME_ARGS or none_args != HISTORY_NONE_ARGS:
        raise SystemExit(f"field_3 args some={some_args} none={none_args}")
    encoded = HISTORY_VALUE.to_bytes(8, "little").hex()
    if first_event_hex is None or encoded not in first_event_hex:
        raise SystemExit("first event does not carry field_3")
    if "63a75c9898e32629" not in first_event_hex:
        raise SystemExit("first event discriminator mismatch")
    return {"series": series, "some_args": some_args, "none_arg_count": none_args, "wire": encoded}


def build_survey(root: Path = ROOT) -> dict:
    elf = read_pinned(ELF_REL, ELF_SHA256, ELF_BYTES)
    text = text_section(elf)
    gzip_bytes = read_pinned(SYMBOLS_REL, SYMBOLS_GZIP_SHA256, SYMBOLS_GZIP_BYTES)
    symbols_elf = gzip.decompress(gzip_bytes)
    if len(symbols_elf) != SYMBOLS_BYTES or sha256(symbols_elf) != SYMBOLS_SHA256:
        raise SystemExit("symbols ELF hash changed after decompress")
    if text_section(symbols_elf) != text:
        raise SystemExit("symbols ELF .text is not the captured text")
    funcs = symbols(symbols_elf)
    bases = assert_protocol(text, funcs)
    capture = json.loads(read_pinned(CAPTURE_REL, CAPTURE_SHA256).decode())
    if capture.get("last_deploy_slot") != LAST_DEPLOY_SLOT:
        raise SystemExit("capture last_deploy_slot changed")
    if capture.get("payload_sha256") != ELF_SHA256:
        raise SystemExit("capture payload hash is not the ELF")
    archive = read_pinned(TAR_REL, TAR_SHA256, TAR_BYTES)
    sources = program_sources(archive)
    rows: list[dict] = []
    for path in sorted(sources):
        rows.extend(occurrences_in_text(path, sources[path]))
    assert_occurrences(rows)
    facts = history_facts(json.loads(read_pinned(HISTORY_REL, HISTORY_SHA256).decode()))
    pcs, insns = instructions(text)
    by_function: dict[str, dict[str, int]] = {}
    for pc, (op, _dst, _src, off, _imm) in insns.items():
        if off == 104 and op in (0x79, 0x7B):
            _start, _size, name = owner(funcs, pc)
            bucket = by_function.setdefault(name, {"loads": 0, "stores": 0})
            if op == 0x79:
                bucket["loads"] += 1
            else:
                bucket["stores"] += 1
    return {
        "claim": "GlobalParams.field_3 is transport-only in the captured Mayhem text",
        "elf": {
            "path": ELF_REL,
            "sha256": ELF_SHA256,
            "bytes": ELF_BYTES,
            "text_file_offset": TEXT_OFF,
            "text_size": TEXT_SIZE,
        },
        "symbols_elf": {
            "path": SYMBOLS_REL,
            "gzip_sha256": SYMBOLS_GZIP_SHA256,
            "gzip_bytes": SYMBOLS_GZIP_BYTES,
            "sha256": SYMBOLS_SHA256,
            "bytes": SYMBOLS_BYTES,
            "text_equal_to_captured": True,
        },
        "capture": {
            "path": CAPTURE_REL,
            "sha256": CAPTURE_SHA256,
            "last_deploy_slot": LAST_DEPLOY_SLOT,
            "payload_sha256": ELF_SHA256,
        },
        "source_tar": {"path": TAR_REL, "sha256": TAR_SHA256, "bytes": TAR_BYTES},
        "pinned_rust_sha256": PINNED_RUST,
        "object_sites": [
            {
                "name": "setter_store",
                "text_pc": SETTER_PC,
                "file_offset": SETTER_PC + TEXT_OFF,
                "raw": text[SETTER_PC : SETTER_PC + 8].hex(),
                "symbol": APPLY_UPDATE,
            },
            {
                "name": "account_serializer_load",
                "text_pc": SERIALIZER_PC,
                "file_offset": SERIALIZER_PC + TEXT_OFF,
                "raw": text[SERIALIZER_PC : SERIALIZER_PC + 8].hex(),
                "symbol": SERIALIZE,
            },
            {
                "name": "account_decoder_store",
                "text_pc": DECODER_PC,
                "file_offset": DECODER_PC + TEXT_OFF,
                "raw": text[DECODER_PC : DECODER_PC + 8].hex(),
                "symbol": DESERIALIZE,
            },
        ],
        "event_site": {
            "name": "update_event_load",
            "text_pc": EVENT_PC,
            "file_offset": EVENT_PC + TEXT_OFF,
            "raw": text[EVENT_PC : EVENT_PC + 8].hex(),
            "symbol": UPDATE_EVENT,
            "event_stores": [0xCEA8, 0xD190],
            "event_wire_offset": 32,
        },
        "stack_zeros": {
            "initialize_base": bases["initialize_base"],
            "initialize_slot": bases["initialize_base"] + 104,
            "reset_base": bases["reset_base"],
            "reset_slot": bases["reset_base"] + 104,
            "zeroed_field_offsets": sorted(ZEROED_OFFSETS),
        },
        "displacement_104_histogram": {f"0x{op:02x}": count for op, count in sorted(HISTOGRAM_104.items())},
        "qword_104_by_function": [
            {"symbol": name, "loads": counts["loads"], "stores": counts["stores"]}
            for name, counts in sorted(by_function.items())
        ],
        "paired_104_count": 3,
        "unpaired_104_count": sum(item["loads"] + item["stores"] for item in by_function.values()) - 3,
        "field7_shaped_144": list(FIELD7_SHAPED_144),
        "business_read_count": sum(row["role"] == "business_read" for row in rows),
        "source_occurrences": rows,
        "history": facts,
        "timeseries": {"path": HISTORY_REL, "sha256": HISTORY_SHA256},
        "not_claimed": ["historical_name", "older_deployment"],
    }


def main() -> None:
    fresh = build_survey(ROOT)
    recorded_path = PACKAGE / "survey.json"
    if "--write" in sys.argv:
        recorded_path.write_text(json.dumps(fresh, indent=2) + "\n")
        print(f"wrote {recorded_path}")
        return
    recorded = json.loads(recorded_path.read_text())
    if recorded != fresh:
        raise SystemExit("survey.json does not match the recomputed census")
    print("field_3 transport census: ok")
    print(f"business reads: {fresh['business_read_count']}")
    print(f"unpaired displacement-104 ops: {fresh['unpaired_104_count']}")
    print(f"history: {fresh['history']['series'][0]} x {len(fresh['history']['series'])}")


if __name__ == "__main__":
    main()
