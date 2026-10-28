#!/usr/bin/env python3
"""Static structural inventory of a single sBPF text window in a captured program.

Analyst evidence only. This reads the unmodified captured ELF, decodes one
function-window's instructions with the same rules as
``scripts/sbpf_disassembly_inventory.py`` and summarises its control flow,
calls, loaded constants and memory accesses. It does NOT rebuild, compare
against a candidate, or claim byte/semantic identity. It is intended to supply
the raw operations needed to form a source hypothesis for an opaque window.

Defaults target Mayhem window 188864-190160 (1,296 bytes), which
``repro/reconstruction-status-2026-10-26/functions.tsv`` lists as
``opaque_unassessed`` in the selected build.
"""
import argparse
import hashlib
import json
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Minimal sBPF opcode -> mnemonic map, enough to read structure. Exact targets,
# registers and immediates come from the raw fields, so naming gaps never affect
# the recorded facts.
MNEMONIC = {
    0x07: "add64 imm", 0x0f: "add64 reg", 0x17: "sub64 imm", 0x1f: "sub64 reg",
    0x27: "mul64 imm", 0x2f: "mul64 reg", 0x37: "div64 imm", 0x3f: "div64 reg",
    0x47: "or64 imm", 0x4f: "or64 reg", 0x57: "and64 imm", 0x5f: "and64 reg",
    0x67: "lsh64 imm", 0x6f: "lsh64 reg", 0x77: "rsh64 imm", 0x7f: "rsh64 reg",
    0x87: "neg64", 0x97: "mod64 imm", 0x9f: "mod64 reg", 0xa7: "xor64 imm",
    0xaf: "xor64 reg", 0xb7: "mov64 imm", 0xbf: "mov64 reg", 0xc7: "arsh64 imm",
    0xcf: "arsh64 reg",
    0x04: "add32 imm", 0x0c: "add32 reg", 0x14: "sub32 imm", 0x1c: "sub32 reg",
    0x24: "mul32 imm", 0xb4: "mov32 imm", 0xbc: "mov32 reg", 0x54: "and32 imm",
    0x44: "or32 imm", 0x74: "rsh32 imm", 0x64: "lsh32 imm",
    0x18: "lddw", 0x61: "ldxw", 0x69: "ldxh", 0x71: "ldxb", 0x79: "ldxdw",
    0x62: "stw imm", 0x6a: "sth imm", 0x72: "stb imm", 0x7a: "stdw imm",
    0x63: "stxw", 0x6b: "stxh", 0x73: "stxb", 0x7b: "stxdw",
    0x05: "ja", 0x15: "jeq imm", 0x1d: "jeq reg", 0x25: "jgt imm", 0x2d: "jgt reg",
    0x35: "jge imm", 0x3d: "jge reg", 0x45: "jset imm", 0x4d: "jset reg",
    0x55: "jne imm", 0x5d: "jne reg", 0x65: "jsgt imm", 0x6d: "jsgt reg",
    0x75: "jsge imm", 0x7d: "jsge reg", 0xa5: "jlt imm", 0xad: "jlt reg",
    0xb5: "jle imm", 0xbd: "jle reg", 0xc5: "jslt imm", 0xcd: "jslt reg",
    0xd5: "jsle imm", 0xdd: "jsle reg",
    0x85: "call", 0x8d: "callx", 0x95: "exit",
}

JUMP_CLASSES = (5, 6)  # JMP, JMP32
NON_BRANCH_JMP = (0x85, 0x8d, 0x95)  # call, callx, exit do not use the offset field


def sha(data):
    return hashlib.sha256(data).hexdigest()


def sections(data):
    if data[:7] != b"\x7fELF\x02\x01\x01":
        raise ValueError("expected ELF64 little endian")
    table = struct.unpack_from("<Q", data, 40)[0]
    size, count, names_index = struct.unpack_from("<HHH", data, 58)
    if size != 64 or not count or names_index >= count:
        raise ValueError("invalid section table")
    rows = [struct.unpack_from("<IIQQQQIIQQ", data, table + i * size) for i in range(count)]
    strings = rows[names_index]
    names = data[strings[4]:strings[4] + strings[5]]
    out = {}
    for row in rows:
        out[names[row[0]:].split(b"\0", 1)[0].decode()] = row
    return out


def relocations(data, secs, text):
    start, length = text[4], text[5]
    found = {}
    for section in secs.values():
        if section[1] != 9:  # SHT_REL
            continue
        for pos in range(section[4], section[4] + section[5], 16):
            address, info = struct.unpack_from("<QQ", data, pos)
            if text[3] <= address < text[3] + length:
                found[start + address - text[3]] = {"type": info & 0xffffffff,
                                                     "symbol_index": info >> 32}
    return found


def load_windows(tsv, program):
    rows = []
    if not tsv.exists():
        return rows
    with tsv.open() as handle:
        header = handle.readline().rstrip("\n").split("\t")
        idx = {name: i for i, name in enumerate(header)}
        for line in handle:
            cells = line.rstrip("\n").split("\t")
            if cells[idx["program"]] != program:
                continue
            rows.append({
                "start": int(cells[idx["original_start"]]),
                "end": int(cells[idx["original_end"]]),
                "bytes": int(cells[idx["bytes"]]),
                "disposition": cells[idx["disposition"]],
                "candidate_names": cells[idx["candidate_names"]],
            })
    rows.sort(key=lambda r: r["start"])
    return rows


def window_for(text_offset, windows):
    for row in windows:
        if row["start"] <= text_offset < row["end"]:
            return row
    return None


def decode(data, text, reloc, start_off, end_off):
    text_start, text_len = text[4], text[5]
    vaddr = text[3]
    if start_off % 8 or end_off % 8:
        raise ValueError("window bounds must be 8-byte aligned")
    if not (0 <= start_off < end_off <= text_len):
        raise ValueError("window outside .text")
    insns = []
    at = text_start + start_off
    stop = text_start + end_off
    while at < stop:
        opcode, regs, disp, imm = struct.unpack_from("<BBhi", data, at)
        size = 16 if opcode == 0x18 else 8
        if at + size > stop:
            raise ValueError(f"wide instruction crosses window end at {at - text_start}")
        row = {
            "text_offset": at - text_start,
            "vaddr": vaddr + at - text_start,
            "raw": data[at:at + size].hex(),
            "opcode": opcode,
            "mnemonic": MNEMONIC.get(opcode, f"op_0x{opcode:02x}"),
            "dst": regs & 15,
            "src": regs >> 4,
            "off": disp,
            "imm": imm,
        }
        if opcode == 0x18:
            hi = struct.unpack_from("<i", data, at + 12)[0]
            if data[at + 8] != 0:
                raise ValueError(f"malformed lddw second slot at {at - text_start}")
            row["imm64"] = (imm & 0xffffffff) | ((hi & 0xffffffff) << 32)
        if (opcode & 7) in JUMP_CLASSES and opcode not in NON_BRANCH_JMP:
            row["branch_target"] = (at + 8 + disp * 8) - text_start
        if opcode == 0x85:
            kind = "syscall"
            if regs == 0x10 and reloc.get(at, {}).get("type") != 10:
                kind = "rel_call"
                row["call_target"] = (at + 8 + imm * 8) - text_start
            elif reloc.get(at, {}).get("type") == 10:
                kind = "external_reloc_call"
            row["call_kind"] = kind
        if opcode == 0x8d:
            row["call_kind"] = "callx"
        if at in reloc:
            row["relocation"] = reloc[at]
        insns.append(row)
        at += size
    if at != stop:
        raise ValueError("decode did not land exactly on window end")
    return insns


def basic_blocks(insns, start_off, end_off):
    offsets = [i["text_offset"] for i in insns]
    offset_set = set(offsets)
    leaders = {start_off}
    for ins in insns:
        nxt = ins["text_offset"] + (16 if ins["opcode"] == 0x18 else 8)
        if ins.get("branch_target") is not None:
            if start_off <= ins["branch_target"] < end_off:
                leaders.add(ins["branch_target"])
            if nxt < end_off:
                leaders.add(nxt)  # fall-through after conditional / ja
        if ins["opcode"] in (0x95, 0x85, 0x8d) and nxt < end_off:
            leaders.add(nxt)
    leaders = sorted(l for l in leaders if l in offset_set)
    blocks = []
    for i, lead in enumerate(leaders):
        upper = leaders[i + 1] if i + 1 < len(leaders) else end_off
        body = [ins for ins in insns if lead <= ins["text_offset"] < upper]
        term = body[-1] if body else None
        blocks.append({
            "start": lead,
            "end": upper,
            "insns": len(body),
            "terminator": term["mnemonic"] if term else None,
        })
    return blocks


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--binary", type=Path, default=ROOT / "evidence/original/mayhem/deployed.so")
    ap.add_argument("--program", default="mayhem")
    ap.add_argument("--start", type=int, default=188864)
    ap.add_argument("--end", type=int, default=190160)
    ap.add_argument("--functions-tsv", type=Path,
                    default=ROOT / "repro/reconstruction-status-2026-10-26/functions.tsv")
    ap.add_argument("--out", type=Path, default=Path(__file__).resolve().parent / "report.json")
    args = ap.parse_args()

    data = args.binary.read_bytes()
    secs = sections(data)
    text = secs[".text"]
    reloc = relocations(data, secs, text)
    windows = load_windows(args.functions_tsv, args.program)
    self_window = window_for(args.start, windows)

    insns = decode(data, text, reloc, args.start, args.end)
    blocks = basic_blocks(insns, args.start, args.end)

    calls = []
    for ins in insns:
        if ins.get("call_kind"):
            entry = {"site": ins["text_offset"], "kind": ins["call_kind"]}
            if "call_target" in ins:
                entry["target"] = ins["call_target"]
                tgt = window_for(ins["call_target"], windows)
                if tgt:
                    entry["target_window"] = f"{tgt['start']}-{tgt['end']}"
                    entry["target_disposition"] = tgt["disposition"]
                    entry["target_candidate"] = tgt["candidate_names"]
            else:
                entry["imm"] = ins["imm"]
            calls.append(entry)

    constants = [{"site": i["text_offset"], "value": i["imm64"],
                  "hex": f"0x{i['imm64']:016x}"}
                 for i in insns if "imm64" in i]
    mem = {}
    for ins in insns:
        if ins["mnemonic"].startswith(("ldx", "stx", "stw", "sth", "stb", "stdw")):
            mem.setdefault(ins["mnemonic"], []).append(ins["off"])
    exits = [i["text_offset"] for i in insns if i["opcode"] == 0x95]
    in_window_reloc = [{"text_offset": off - text[4], **meta}
                       for off, meta in sorted(reloc.items())
                       if text[4] + args.start <= off < text[4] + args.end]

    report = {
        "scope": "Original-only static structural inventory. Not a rebuild, "
                 "candidate comparison, byte match or semantic claim.",
        "binary": str(args.binary.relative_to(ROOT)),
        "binary_sha256": sha(data),
        "program": args.program,
        "window": {"text_start": args.start, "text_end": args.end,
                   "bytes": args.end - args.start,
                   "slots": (args.end - args.start) // 8},
        "window_sha256": sha(data[text[4] + args.start:text[4] + args.end]),
        "selected_disposition": self_window["disposition"] if self_window else "unknown",
        "selected_candidate": self_window["candidate_names"] if self_window else "unknown",
        "instruction_count": len(insns),
        "basic_block_count": len(blocks),
        "exit_count": len(exits),
        "call_count": len(calls),
        "calls": calls,
        "loaded_constants": constants,
        "memory_access_offsets": {k: sorted(set(v)) for k, v in sorted(mem.items())},
        "in_window_relocations": in_window_reloc,
        "basic_blocks": blocks,
        "instructions": insns,
    }
    args.out.write_text(json.dumps(report, indent=2))

    print(f"binary        {report['binary']} sha={report['binary_sha256'][:16]}")
    print(f"window        {args.start}-{args.end}  {report['window']['bytes']} bytes "
          f"({report['window']['slots']} slots)  sha={report['window_sha256'][:16]}")
    print(f"selected      disposition={report['selected_disposition']} "
          f"candidate={report['selected_candidate']}")
    print(f"instructions  {report['instruction_count']}  blocks={report['basic_block_count']}  "
          f"exits={report['exit_count']}  calls={report['call_count']}")
    print("calls:")
    for c in calls:
        extra = ""
        if "target" in c:
            extra = f" -> text {c['target']}"
            if "target_window" in c:
                extra += f" [{c['target_window']} {c['target_disposition']}]"
                if c.get("target_candidate") not in ("[]", "", None):
                    extra += f" {c['target_candidate']}"
        else:
            extra = f" imm={c.get('imm')}"
        print(f"  @{c['site']:>6} {c['kind']}{extra}")
    print("loaded 64-bit constants:")
    for k in constants:
        print(f"  @{k['site']:>6} {k['hex']}  ({k['value']})")
    print("memory access offsets by form:")
    for form, offs in report["memory_access_offsets"].items():
        print(f"  {form:<8} {offs}")
    print(f"in-window relocations: {len(in_window_reloc)}")
    print(f"report written: {args.out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
