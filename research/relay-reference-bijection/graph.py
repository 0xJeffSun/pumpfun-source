"""A unique, label-preserving correspondence for retained Relay reference graphs."""
from bisect import bisect_right
from collections import Counter
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import struct

ARTIFACT = "repro/donation-relay/donation-wrapper-artifact-recovery"
PARSER = "repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py"
WINDOWS = "repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json"
ORIGINAL = "evidence/dependencies/donation_relay/deployed.so"
LAYOUT = "repro/donation-relay/linked-elf-reproduction/layout/solution.json"


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read(path):
    raw = path.read_bytes()
    return json.loads(gzip.decompress(raw) if path.suffix == ".gz" else raw)


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"))


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def color(value):
    return sha(canonical(value).encode())


def parser(repo):
    spec = importlib.util.spec_from_file_location("retained_relay_parser", repo / PARSER)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def instruction_offsets(raw):
    require(len(raw) % 8 == 0, "unaligned function")
    at, starts = 0, set()
    while at < len(raw):
        starts.add(at)
        width = 16 if raw[at] == 0x18 else 8
        require(at + width <= len(raw), "truncated LDDW")
        at += width
    return starts


def build_graph(elf, functions):
    require(struct.unpack_from("<HH", elf.b, 16) == (3, 263)
            and struct.unpack_from("<I", elf.b, 48)[0] == 0, "expected generic-v0 SBF ELF")
    text = elf.by_name[".text"]
    expected = text["address"]
    starts, boundaries = [], []
    for f in functions:
        require(f["start"] == expected and f["end"] == f["start"] + f["bytes"], "function coverage gap")
        raw = elf.at(f["start"], f["bytes"])
        require(sha(raw) == f["raw_sha256"], "stale function ledger")
        starts.append(f["start"])
        boundaries.append(instruction_offsets(raw))
        expected = f["end"]
    require(expected == text["address"] + text["size"], "function coverage ends early")

    def target(address):
        i = bisect_right(starts, address) - 1
        require(i >= 0 and address < functions[i]["end"], "reference outside text windows")
        delta = address - starts[i]
        require(delta in boundaries[i], "reference targets a continuation/noninstruction")
        return i, delta

    records = []
    for section in elf.sections:
        if section["type"] != 9:
            continue
        require(section["entry_size"] == 16 and section["size"] % 16 == 0, "bad REL table")
        for at in range(section["offset"], section["offset"] + section["size"], 16):
            address, info = struct.unpack_from("<QQ", elf.b, at)
            records.append((address, info))
    require(len(records) == len(elf.relocations), "duplicate relocation site")

    nodes = []
    for i, f in enumerate(functions):
        relocations = [(address - f["start"], r["type"], r["symbol"])
                       for address, r in sorted(elf.relocations.items())
                       if f["start"] <= address < f["end"]]
        external = [(r["offset"], r["immediate"],
                     None if r["relocation"] is None else
                     (r["relocation"]["type"], r["relocation"]["symbol"]))
                    for r in f["external_calls"]]
        base = dict(bytes=f["bytes"], normalized_sha256=f["normalized_sha256"],
                    relocations=relocations, external_calls=external, data_references=[], roots=[])
        nodes.append(dict(index=i, start=f["start"], bytes=f["bytes"], names=f["names"],
                          raw_sha256=f["raw_sha256"], base=base, outgoing=[], incoming=[],
                          indirect_instruction_count=len(f["indirect_calls"])))
    for i, f in enumerate(functions):
        for r in f["direct_calls"]:
            j, delta = target(r["target"])
            nodes[i]["outgoing"].append((("call", r["offset"], delta), j))
        for r in f["data_references"]:
            section = elf.containing(r["target"])
            require(section is not None, "relocated reference has no allocated section")
            relation = r["relocation"]
            if section["name"] == ".text":
                j, delta = target(r["target"])
                nodes[i]["outgoing"].append((("text-reference", r["offset"], relation["type"],
                                              relation["symbol"], delta), j))
            else:
                nodes[i]["base"]["data_references"].append((r["offset"], relation["type"],
                    relation["symbol"], section["name"], r["target"] - section["address"]))
        for label, j in nodes[i]["outgoing"]:
            nodes[j]["incoming"].append((label, i))

    slots, witnesses = [], []
    def root(address, label, witness):
        j, delta = target(address)
        nodes[j]["base"]["roots"].append((*label, delta))
        witnesses.append(dict(label=label, target_address=address, target_index=j,
                              target_offset=delta, **witness))

    entry, = struct.unpack_from("<Q", elf.b, 24)
    root(entry, ("elf-entry",), dict(file_offset=24, raw_hex=elf.b[24:32].hex()))
    for address, r in sorted(elf.relocations.items()):
        if r["type"] != 8:
            continue
        section = elf.containing(address)
        require(section is not None, "relocation site outside allocated sections")
        if section["name"] == ".text":
            continue
        raw = elf.at(address, 8)
        stored, = struct.unpack("<Q", raw)
        require(stored & 0xffffffff == 0, "nonzero generic-v0 stored pointer low word")
        destination = stored >> 32
        dest_section = elf.containing(destination)
        if dest_section and dest_section["name"] == ".text":
            relative = address - section["address"]
            slots.append((section["name"], relative, 8))
            root(destination, ("data-code-pointer", section["name"], relative, r["type"], r["symbol"]),
                 dict(file_offset=section["offset"] + relative, raw_hex=raw.hex(),
                      relocation_record_offset=r["record_offset"]))
    symbol_slots = []
    for section in elf.sections:
        if section["type"] != 11:
            continue
        strings = elf.section_bytes(elf.sections[section["link"]])
        for at in range(section["offset"], section["offset"] + section["size"], 24):
            n, info, other, defined, value, size = struct.unpack_from("<IBBHQQ", elf.b, at)
            containing = elf.containing(value)
            if defined and containing and containing["name"] == ".text":
                relative = at - section["offset"]
                name = elf.string(strings, n)
                symbol_slots.append((section["name"], relative + 8, 8))
                root(value, ("dynamic-symbol", section["name"], relative, name, info, other, defined, size),
                     dict(file_offset=at + 8, raw_hex=elf.b[at + 8:at + 16].hex()))
    for n in nodes:
        n["base"]["roots"].sort(key=canonical)
    return dict(nodes=nodes, code_pointer_slots=slots, dynamic_symbol_slots=symbol_slots,
                root_witnesses=witnesses)


def refine(original, candidate):
    require(len(original) == len(candidate) and original, "unequal or empty graphs")
    graphs = dict(original=original, candidate=candidate)
    colors = {side: [color(n["base"]) for n in nodes] for side, nodes in graphs.items()}
    history, previous = [], -1
    for step in range(2 * len(original) + 1):
        counts = {side: Counter(values) for side, values in colors.items()}
        require(counts["original"] == counts["candidate"], f"reference graph differs at refinement {step}")
        classes = len(counts["original"])
        history.append(dict(round=step, classes=classes,
                            singleton_pairs=sum(n == 1 for n in counts["original"].values()),
                            compatible_pairs=sum(n * n for n in counts["original"].values())))
        if classes == len(original):
            lookup = {c: i for i, c in enumerate(colors["candidate"])}
            mapping = [lookup[c] for c in colors["original"]]
            check_mapping(original, candidate, mapping)
            return mapping, history, colors
        require(classes != previous, "ambiguous reference classes remain; no unique mapping claimed")
        previous = classes
        colors = {side: [color([colors[side][i],
            sorted([(label, colors[side][j]) for label, j in n["outgoing"]], key=canonical),
            sorted([(label, colors[side][j]) for label, j in n["incoming"]], key=canonical)])
            for i, n in enumerate(nodes)] for side, nodes in graphs.items()}
    raise ValueError("refinement did not stabilize")


def check_mapping(original, candidate, mapping):
    require(sorted(mapping) == list(range(len(candidate))) and len(mapping) == len(original),
            "mapping is not bijective")
    for i, j in enumerate(mapping):
        require(original[i]["base"] == candidate[j]["base"], "mapped node labels differ")
        expected = sorted([(label, mapping[k]) for label, k in original[i]["outgoing"]], key=canonical)
        actual = sorted(candidate[j]["outgoing"], key=canonical)
        require(expected == actual, "mapped reference edge differs")


def fixed_data(original, candidate, graphs):
    """Compare positional data, treating only individually mapped code-pointer fields separately."""
    result = {}
    for kind in ("code_pointer_slots", "dynamic_symbol_slots"):
        require(graphs["original"][kind] == graphs["candidate"][kind], "address-field slots differ")
    slots = graphs["original"]["code_pointer_slots"] + graphs["original"]["dynamic_symbol_slots"]
    for name in (".rodata", ".data.rel.ro", ".dynsym", ".dynstr"):
        a, b = original.by_name[name], candidate.by_name[name]
        require((a["address"], a["size"]) == (b["address"], b["size"]), "data placement differs: " + name)
        left, right = bytearray(original.section_bytes(a)), bytearray(candidate.section_bytes(b))
        selected = [(offset, size) for section, offset, size in slots if section == name]
        for offset, size in selected:
            require(0 <= offset and offset + size <= len(left), "address field outside section")
            left[offset:offset + size] = b"\0" * size
            right[offset:offset + size] = b"\0" * size
        require(left == right, "non-code-pointer data differs: " + name)
        result[name] = dict(bytes=a["size"], individually_mapped_address_fields=len(selected),
                            remaining_bytes_equal=True,
                            remaining_bytes_sha256=sha(left),
                            raw_equal=original.section_bytes(a) == candidate.section_bytes(b))
    return result


def relocation_correspondence(original, candidate, functions, mapping):
    starts = [f["start"] for f in functions["original"]]
    text = original.by_name[".text"]
    mapped, originals = [], []
    for address, r in sorted(original.relocations.items()):
        if text["address"] <= address < text["address"] + text["size"]:
            i = bisect_right(starts, address) - 1
            require(i >= 0 and address < functions["original"][i]["end"], "relocation outside window")
            expected = functions["candidate"][mapping[i]]["start"] + address - starts[i]
        else:
            section = original.containing(address)
            require(section is not None, "relocation outside allocated data")
            expected = candidate.by_name[section["name"]]["address"] + address - section["address"]
        mapped.append((expected, r["type"], r["symbol"]))
        originals.append(dict(original_site=address, candidate_site=expected,
                              type=r["type"], symbol=r["symbol"]))
    actual = sorted((address, r["type"], r["symbol"]) for address, r in candidate.relocations.items())
    require(sorted(mapped) == actual, "relocation-site correspondence differs")
    return originals


def derive(repo):
    p = parser(repo)
    folder = repo / ARTIFACT
    metadata = read(folder / "metadata.json")["variants"]["recovered"]["artifacts"]
    images = {"original": (repo / ORIGINAL).read_bytes()}
    for role, row in metadata.items():
        raw = gzip.decompress((folder / row["path"]).read_bytes())
        require(len(raw) == row["bytes"] and sha(raw) == row["sha256"], "retained artifact differs")
        images[role] = raw
    o, c, u = (p.Elf(images[n]) for n in ("original", "candidate", "symbols"))
    for s in u.sections:
        if s["flags"] & 2 and s["type"] != 8:
            cs = c.by_name[s["name"]]
            require(s["address"] == cs["address"] and u.section_bytes(s) == c.section_bytes(cs),
                    "stripped allocated image differs")
    original = []
    for w in read(repo / WINDOWS):
        f = o.function(w["start"], w["bytes"], [])
        require(f["raw_sha256"] == w["sha256"], "captured window differs")
        f["ordinal"] = w["ordinal"]
        original.append(f)
    symbols = {}
    for s in u.symbols:
        if s["type"] == 2 and s["size"]:
            symbols.setdefault((s["start"], s["size"]), []).append(s["name"])
    candidate = []
    for i, ((start, size), names) in enumerate(sorted(symbols.items())):
        f = u.function(start, size, sorted(names))
        f["index"] = i
        candidate.append(f)
    functions = dict(original=original, candidate=candidate)
    for side, rows in functions.items():
        require(rows == read(folder / f"analysis/recovered/{side}-function-ledger.json.gz"),
                "regenerated function ledger differs")
    require(len(original) == len(candidate) == 492, "wrong retained cohort")
    require([f["ordinal"] for f in original] == list(range(492)), "noncontiguous original ordinals")
    graphs = dict(original=build_graph(o, original), candidate=build_graph(c, candidate))
    data = fixed_data(o, c, graphs)
    mapping, history, colors = refine(graphs["original"]["nodes"], graphs["candidate"]["nodes"])
    published = {int(k): v for k, v in read(repo / LAYOUT)["mapping"].items()}
    require(published == dict(enumerate(mapping)), "published linker correspondence differs")
    relocations = relocation_correspondence(o, c, functions, mapping)
    pairs = [dict(original_ordinal=i, candidate_index=j, original_start=original[i]["start"],
                  candidate_start=candidate[j]["start"], bytes=original[i]["bytes"],
                  candidate_names=candidate[j]["names"], color=colors["original"][i],
                  raw_equal=original[i]["raw_sha256"] == candidate[j]["raw_sha256"])
             for i, j in enumerate(mapping)]
    witnesses = read(folder / "analysis/recovered/match-witnesses.json.gz")
    closed = {(w["original_ordinal"], w["candidate_index"]) for w in witnesses if w["recursive_call_shape_closed"]}
    require(all((i, j) in closed for i, j in enumerate(mapping)), "mapping leaves prior closed-pair relation")
    counters = {side: dict(Counter(label[0] for n in g["nodes"] for label, _ in n["outgoing"]))
                for side, g in graphs.items()}
    roots = {side: dict(Counter(w["label"][0] for w in g["root_witnesses"])) for side, g in graphs.items()}
    require(counters["original"] == counters["candidate"] and roots["original"] == roots["candidate"],
            "reference totals differ")
    old = read(folder / "analysis/recovered/comparison-summary.json")
    require(sum(r["raw_equal"] for r in pairs) == old["original_raw_match_windows"], "raw match attribution differs")
    summary = dict(uniquely_mapped_windows=len(mapping), refinement=history,
        equals_published_linker_correspondence=True,
        edge_counts=counters["original"], fixed_reference_counts=roots["original"],
        raw_pairs=sum(r["raw_equal"] for r in pairs),
        moved_function_indices=sum(i != j for i, j in enumerate(mapping)),
        prior_shape_pairs=old["matched_pairs"], prior_outgoing_closed_pairs=old["recursive_call_shape_closed_pairs"],
        mapped_relocations=len(relocations), fixed_data=data,
        data_reference_counts=dict(Counter(r[3] for n in graphs["original"]["nodes"]
                                           for r in n["base"]["data_references"])),
        candidate_aliased_windows=sum(len(f["names"]) > 1 for f in candidate),
        indirect_call_instructions=sum(n["indirect_instruction_count"] for n in graphs["original"]["nodes"]),
        indirect_targets_resolved=False, whole_file_equal=images["original"] == images["candidate"],
        common_position_differences=sum(a != b for a, b in zip(images["original"], images["candidate"])),
        allocation_tail_bytes=len(images["original"]) - len(images["candidate"]),
        image_sha256={name: sha(raw) for name, raw in images.items()},
        scope="Unique isomorphism of this declared instruction/reference graph; not historical source identity or behavioral proof.")
    return dict(summary=summary, mapping=pairs, graphs=graphs, relocation_mapping=relocations)
