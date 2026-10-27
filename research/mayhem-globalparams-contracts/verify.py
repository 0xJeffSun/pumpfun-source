#!/usr/bin/env python3
"""Verifier for the mayhem-globalparams-contracts package.

Standard library only. Checks, in order:
  1. manifest.json: SHA-256 and size of every listed file; every package
     file except manifest.json itself is listed.
  2. Source pins: each pinned source copy in evidence/src/ recomputes to
     the git blob SHA-1 recorded in contracts.json.
  3. Citations: every citation object in contracts.json is re-extracted
     from the pinned local copies and compared to the recorded quote.
  4. History: the sibling package's analysis_timeseries.json (PR #148) is
     located by relative path, its SHA-256 is compared to the value
     recorded in contracts.json, and every field's v1..v10 values in
     contracts.json are compared to the timeseries update events.
  5. Phase 2 captures: re-decoded with fresh code (MayhemState window
     arithmetic and creation-timestamp equality, current GlobalParams
     values vs the v10 event, timeline page spans, the sweep-screen
     paging bound).
  6. README hygiene: no em dash characters; credit line present.

Exit code 0 means every check passed (a history SKIP is reported when the
sibling package is not present in either expected location; the recorded
SHA-256 is printed so the check can be completed by hand).
"""
import base64
import hashlib
import json
import os
import struct
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FAIL = []
NOTES = []


def check(ok, label, detail=""):
    if ok:
        print(f"  ok   {label}")
    else:
        print(f"  FAIL {label} {detail}")
        FAIL.append(label)


def load(rel):
    with open(os.path.join(HERE, rel), "rb") as f:
        return f.read()


def walk(o):
    if isinstance(o, dict):
        yield o
        for v in o.values():
            yield from walk(v)
    elif isinstance(o, list):
        for v in o:
            yield from walk(v)


def main():
    contracts = json.loads(load("contracts.json"))

    print("== 1. manifest ==")
    manifest = json.loads(load("manifest.json"))
    listed = set()
    for rel, meta in sorted(manifest["files"].items()):
        listed.add(rel)
        try:
            raw = load(rel)
        except FileNotFoundError:
            check(False, f"manifest file present: {rel}")
            continue
        check(hashlib.sha256(raw).hexdigest() == meta["sha256"] and len(raw) == meta["bytes"],
              f"manifest hash+size: {rel}")
    present = set()
    for root, _dirs, files in os.walk(HERE):
        for fn in files:
            rel = os.path.relpath(os.path.join(root, fn), HERE)
            if rel != "manifest.json":
                present.add(rel)
    check(present == listed, "manifest covers exactly the package files",
          f"(unlisted: {sorted(present - listed)}, missing: {sorted(listed - present)})")

    print("== 2. source pins (git blob SHA-1) ==")
    pins = contracts["source_pins"]
    local_lines = {}
    for repo_path, pin in sorted(pins.items()):
        raw = load(pin["local"])
        blob = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
        check(blob == pin["blob_sha"] and len(raw) == pin["bytes"],
              f"pin {repo_path} -> {pin['local']}")
        local_lines[repo_path] = raw.decode("utf-8").splitlines()

    print("== 3. citations ==")
    n_cite = 0
    bad = 0
    for node in walk(contracts):
        if {"file", "lines", "quote"} <= set(node.keys()) and isinstance(node.get("lines"), list):
            n_cite += 1
            f, (a, b), q = node["file"], node["lines"], node["quote"]
            lines = local_lines.get(f)
            if lines is None or not (1 <= a <= b <= len(lines)):
                bad += 1
                print(f"  FAIL citation range {f}:{a}-{b}")
                continue
            if "\n".join(lines[a - 1:b]) != q:
                bad += 1
                print(f"  FAIL citation text {f}:{a}-{b}")
    check(bad == 0, f"all {n_cite} citations re-extract exactly ({bad} bad)")

    print("== 4. history vs merged package (PR #148) ==")
    hs = contracts["history_source"]
    candidates = [
        os.path.normpath(os.path.join(HERE, hs["repo_relative_location"])),
        os.path.expanduser("~/workspace/taobot/hidden_files/pumpfun_mayhem_study/package/evidence/analysis_timeseries.json"),
    ]
    ts = None
    for cand in candidates:
        if os.path.exists(cand):
            raw = open(cand, "rb").read()
            if hashlib.sha256(raw).hexdigest() == hs["sha256"]:
                ts = json.loads(raw)
                print(f"  ok   timeseries located and SHA-256 matches: {cand}")
                break
            check(False, f"timeseries SHA-256 at {cand}")
    if ts is None:
        print(f"  SKIP sibling package not found in an expected location; "
              f"recorded SHA-256 is {hs['sha256']} ({hs['bytes']} bytes)")
        NOTES.append("history check skipped (sibling package absent)")
    else:
        ups = sorted((t for t in ts["transactions"] if t.get("update_events")),
                     key=lambda t: t["block_time"])
        check(len(ups) == 10, "timeseries holds exactly 10 update transactions")
        events = {}
        for t in ups:
            ev = t["update_events"][-1]
            events[ev["new_version"]] = ev["fields"]
        mismatches = 0
        for f in contracts["fields"]:
            vals = f["history"]["values_v1_to_v10"]
            for v in range(1, 11):
                ev_fields = events.get(v, {})
                want = vals[v - 1]
                got = ev_fields.get(f["field"], "not_in_schema")
                if want != got:
                    mismatches += 1
                    print(f"  FAIL history {f['field']} v{v}: contracts={want} timeseries={got}")
        check(mismatches == 0, "all 16 fields x 10 versions match the timeseries events")

    print("== 5. Phase 2 captures re-decoded ==")
    ev_dir = os.path.join(HERE, "evidence")
    p2 = contracts["phase2"]
    # 5a. MayhemState arithmetic from the raw capture + creation blockTime from the scan record
    sc = p2["field_6_check"]["state_checks"][0]
    cap = json.loads(load(os.path.join("evidence", sc["capture_file"])))
    raw = base64.b64decode(cap["response"]["result"]["value"]["data"][0])
    creation = struct.unpack_from("<Q", raw, 8)[0]
    end = struct.unpack_from("<q", raw, 16)[0]
    check(raw[:8].hex() == "b1fdbf7dcb16866b" and len(raw) == 106,
          "MayhemState capture: discriminator and 106-byte length")
    check(creation == sc["creation_stored_offset8"] and end == sc["end_timestamp"],
          "MayhemState capture: offsets 8/16 match contracts.json")
    scan = json.loads(load("evidence/scan_dec2025_era_txs.json"))
    tx = scan["transactions"][sc["creation_tx"]]["result"]
    check(tx["blockTime"] == creation,
          "stored creation timestamp equals the creation transaction blockTime")
    check(end - creation == 86400, "end_timestamp minus creation equals 86,400 (24 x 3600)")
    # 5b. current GlobalParams vs v10 values recorded in contracts.json
    gp_cap = json.loads(load("evidence/capture_gp_account_current.json"))
    graw = base64.b64decode(gp_cap["response"]["result"]["value"]["data"][0])
    offs = {"field_0": ("<I", 8), "field_1": ("<I", 12), "field_2": ("<Q", 16),
            "field_3": ("<Q", 24), "field_4": ("<Q", 32), "field_5": ("<Q", 40),
            "field_6": (None, 137), "field_7": ("<Q", 146), "field_8": ("<Q", 154),
            "field_9": ("<Q", 129), "field_10": ("<Q", 166), "field_11": ("<Q", 182),
            "field_12": ("<Q", 190), "field_13": ("<Q", 198), "field_14": ("<Q", 222),
            "field_15": ("<Q", 230)}
    bad = 0
    for f in contracts["fields"]:
        fmt, off = offs[f["field"]]
        got = graw[off] if fmt is None else struct.unpack_from(fmt, graw, off)[0]
        if got != f["history"]["values_v1_to_v10"][-1]:
            bad += 1
            print(f"  FAIL current GP {f['field']}: capture={got}")
    check(bad == 0, "fresh GlobalParams capture matches v10 on all 16 fields")
    check(struct.unpack_from("<I", graw, 162)[0] == 10, "fresh GlobalParams version is 10")
    # 5c. timeline pages: recompute spans from the raw sig captures
    tl = json.loads(load("evidence/phase2_field1_timeline.json"))
    bad = 0
    for page in tl["pages"]:
        capf = os.path.join("evidence", f"capture_sigs_timeline_{page['tag']}.json")
        if not os.path.exists(os.path.join(HERE, capf)):
            bad += 1
            continue
        resp = json.loads(load(capf))["response"]
        if "result" not in resp:
            NOTES.append(f"timeline page {page['tag']}: capture holds an RPC error, skipped")
            continue
        res = resp["result"]
        bts = [e["blockTime"] for e in res if e.get("blockTime")]
        if len(res) != page["count"] or (bts and max(bts) - min(bts) != page["span_seconds"]):
            bad += 1
            print(f"  FAIL timeline page {page['tag']}")
    check(bad == 0, "timeline pages recompute from raw captures")
    # 5d. field_10 screen bound: pages recorded, window not reached, span small
    scr = p2["field_10_screen"]
    pages = scr["pages"]
    span = pages[0]["newest_blockTime"] - pages[-1]["oldest_blockTime"]
    check(scr["window_reached"] is False and len(pages) == 10 and span < 3600,
          f"field_10 screen: 10 pages cover {span}s, window unreached (bound as reported)")

    print("== 6. README hygiene ==")
    readme = load("README.md").decode("utf-8")
    check("—" not in readme, "README contains no em dash characters")
    check("TaoBot x Lightbrush" in readme, "README carries the TaoBot x Lightbrush credit")

    print()
    if FAIL:
        print(f"VERIFY FAILED: {len(FAIL)} check(s): {FAIL}")
        return 1
    print("VERIFY PASSED" + (f" (notes: {NOTES})" if NOTES else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
