"""Reproduce exact, unmodified sysroot function matches; no instruction execution."""
from pathlib import Path
import struct
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import elf

SELECTION = ("All nonempty STT_FUNC symbols in the two retained generic-v0 rlibs; "
             "at least 64 bytes, no object relocation and no direct CALL opcode. "
             "Indirect CALLX is retained. Symbol aliases are counted separately only in the scan.")


def functions(obj):
    result = []
    for table in obj.sections:
        if table["type"] != 2:
            continue
        elf.require(table["entsize"] == 24 and table["size"] % 24 == 0, "invalid symbols")
        strings = obj.section_bytes(table["link"])
        for at in range(table["offset"], table["offset"] + table["size"], 24):
            n, info, _, index, value, size = struct.unpack_from("<IBBHQQ", obj.data, at)
            if info & 15 == 2 and size and 0 < index < len(obj.sections):
                section = obj.sections[index]
                relative = value if obj.kind == 1 else value - section["addr"]
                elf.require(section["flags"] & 4 and relative >= 0 and
                            relative + size <= section["size"], "function outside executable section")
                offset = section["offset"] + relative
                result.append(dict(symbol=obj.string(strings, n), section=index,
                    section_name=section["name"], section_relative_offset=relative,
                    offset=offset, bytes=size,
                    sha256=elf.digest(elf.checked_slice(obj.data, offset, size))))
    return result


def instructions(raw):
    elf.require(len(raw) % 8 == 0, "unaligned instruction bytes")
    at = 0
    while at < len(raw):
        op, reg, off, imm = struct.unpack_from("<BBhi", raw, at)
        width = 16 if op == 0x18 else 8
        elf.require(at + width <= len(raw), "truncated LDDW")
        yield at, op, reg, off, imm
        at += width


def relocations(obj):
    rows = []
    for section in obj.sections:
        elf.require(section["type"] != 4, "RELA outside linked-capture scope")
        if section["type"] != 9:
            continue
        elf.require(section["entsize"] == 16 and section["size"] % 16 == 0, "bad REL table")
        for at in range(section["offset"], section["offset"] + section["size"], 16):
            address, info = struct.unpack_from("<QQ", obj.data, at)
            rows.append(dict(address=address, type=info & 0xffffffff, symbol_index=info >> 32))
    return rows


def overlapping(rows, start, end):
    # Conservatively cover both slots of an LDDW for every relocation type.
    return [r for r in rows if r["address"] < end and r["address"] + 16 > start]


def context(obj):
    elf.require((obj.kind, obj.machine, obj.flags) == (3, 263, 0),
                "expected generic-v0 SBF linked ELF")
    index, text = obj.section_named(".text")
    raw = obj.section_bytes(index)
    insns = list(instructions(raw))
    boundaries = {text["addr"] + at for at, *_ in insns}
    rels = relocations(obj)
    refs = {}
    for at, op, reg, off, imm in insns:
        pc = text["addr"] + at
        if (op, reg, off) == (0x85, 0x10, 0) and not overlapping(rels, pc, pc + 8):
            dest = pc + 8 + imm * 8
            if dest in boundaries:
                refs.setdefault(dest, []).append(dict(
                    caller_address=pc, caller_file_offset=text["offset"] + at,
                    instruction_hex=raw[at:at + 8].hex(), signed_displacement=imm))
    return text, rels, refs, boundaries


def occurrences(obj, code, ctx):
    text, rels, refs, boundaries = ctx
    entries = sorted(refs)
    start, end = text["offset"], text["offset"] + text["size"]
    hits = []
    while (start := obj.data.find(code, start, end)) >= 0:
        address = text["addr"] + start - text["offset"]
        stop = address + len(code)
        if address in boundaries:
            following = next((x for x in entries if x > address), None)
            overlap = overlapping(rels, address, stop)
            hits.append(dict(file_offset=start, address=address, end_address=stop,
                start_callers=refs.get(address, []), end_callers=refs.get(stop, []),
                next_called_entry=following, loader_relocation_overlaps=overlap,
                call_bounded=address in refs and following == stop,
                relocation_free=not overlap))
        start += 1
    return hits


def scan(objects, capture):
    obj = elf.Elf(capture)
    ctx = context(obj)
    selected, rejected = [], []
    for object_id, raw in sorted(objects.items()):
        source = elf.Elf(raw)
        elf.require((source.kind, source.machine, source.flags) == (1, 263, 0),
                    "expected generic-v0 ET_REL object")
        for f in functions(source):
            code = elf.body(source, f)
            rels = source.object_relocations(f)
            calls = [at for at, op, *_ in instructions(code) if op == 0x85]
            reasons = [reason for condition, reason in [
                (len(code) < 64, "under_64_bytes"), (bool(rels), "object_relocations"),
                (bool(calls), "direct_call_opcode")] if condition]
            if reasons:
                rejected.append(dict(object=object_id, function=f, reasons=reasons))
            else:
                selected.append(dict(object=object_id, function=f, raw_hits=occurrences(obj, code, ctx)))
    return dict(selection=SELECTION, selected=selected, rejected=rejected)


def group_matches(scan_result):
    groups = {}
    for row in scan_result["selected"]:
        f = row["function"]
        for hit in row["raw_hits"]:
            key = (hit["file_offset"], f["bytes"], f["sha256"])
            group = groups.setdefault(key, dict(bytes=f["bytes"], sha256=f["sha256"],
                                                capture=hit, object_symbols=[]))
            group["object_symbols"].append(dict(object=row["object"], symbol=f["symbol"]))
    return [groups[key] for key in sorted(groups)]


def compare(objects, capture, linked_raw, stripped_raw, prior):
    result = scan(objects, capture)
    linked, stripped = elf.Elf(linked_raw), elf.Elf(stripped_raw)
    context(linked)
    context(stripped)
    li, lt = linked.section_named(".text")
    si, st = stripped.section_named(".text")
    elf.require(linked.section_bytes(li) == stripped.section_bytes(si), "strip changed .text")
    elf.require((lt["offset"], lt["addr"]) == (st["offset"], st["addr"]), "strip moved .text")
    linked_functions = functions(linked)
    groups = group_matches(result)
    for group in groups:
        body_matches = [f for f in linked_functions
                        if (f["bytes"], f["sha256"]) == (group["bytes"], group["sha256"])]
        known_names = {r["symbol"] for r in group["object_symbols"]}
        named_matches = [f for f in body_matches if f["symbol"] in known_names]
        elf.require(bool(named_matches), "positive body lacks same-named linked symbol")
        group["linked_functions"] = named_matches
        group["prior_helper_records"] = [
            dict(names=f["names"], candidate_start=f["candidate_start"])
            for f in prior["builds"]["v154"]["functions"]
            if f["raw_sha256"] == group["sha256"] and f["bytes"] == group["bytes"]
            and any(m["original_start"] == group["capture"]["file_offset"]
                    and m["raw_byte_equality"] for m in f["matches"])]
    positive_symbols = sum(bool(r["raw_hits"]) for r in result["selected"])
    return dict(comparison="unmodified raw bytes", scan=result, matches=groups,
        summary=dict(objects=len(objects), selected_symbols=len(result["selected"]),
            rejected_symbols=len(result["rejected"]), positive_symbols=positive_symbols,
            selected_without_raw_hit=len(result["selected"]) - positive_symbols,
            distinct_capture_ranges=len(groups),
            call_bounded_relocation_free_ranges=sum(g["capture"]["call_bounded"] and
                g["capture"]["relocation_free"] for g in groups),
            ranges_in_prior_helper_table=sum(bool(g["prior_helper_records"]) for g in groups),
            ranges_absent_from_prior_helper_table=sum(not g["prior_helper_records"] for g in groups)),
        linked_text=dict(offset=lt["offset"], bytes=lt["size"],
                         sha256=elf.digest(linked.section_bytes(li)), stripped_text_identical=True),
        boundary_scope="Consecutive decoded direct-call targets, not exhaustive function discovery.",
        relocation_scope="Conservative 16-byte footprint for every captured relocation.",
        compiler_executions=0, normalized_comparisons=0, unique_historical_compiler_proved=False)
