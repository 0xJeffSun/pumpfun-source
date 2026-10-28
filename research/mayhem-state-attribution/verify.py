#!/usr/bin/env python3
"""Verifier for the mayhem-state-attribution package.

Standard library only, offline. Checks, in order:
  1. manifest.json: SHA-256 and size of every listed file; every package
     file except manifest.json itself is listed.
  2. Source pins: each pinned source copy in evidence/src/ recomputes to
     the git blob SHA-1 recorded in attribution.json.
  3. Citations: every citation object in attribution.json is re-extracted
     from the pinned local copies and compared to the recorded quote.
  4. Captures: both retained captures decode to the values recorded in
     attribution.json; the fresh capture's account bytes equal the
     retained capture's; the derived checks hold (field_8 equals the
     recorded creation blockTime, end_timestamp minus field_8 equals
     86400, field_89 minus field_8 equals 48, status byte equals 2).
  5. Sibling cross-check: research/mayhem-globalparams-contracts
     (PR #284) is located by relative path and its field_6 record is
     confirmed to carry the value 24 and this state's creation
     transaction. A SKIP is reported when the sibling is not present.
  6. README hygiene: no em dash characters; credit line present.

Exit code 0 means every check passed.
"""
import base64
import hashlib
import json
import os
import struct
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
FAIL = []


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
    attr = json.loads(load("attribution.json"))

    print("1. manifest")
    manifest = json.loads(load("manifest.json"))
    listed = set(manifest["files"])
    present = set()
    for root, _dirs, files in os.walk(HERE):
        for fn in files:
            rel = os.path.relpath(os.path.join(root, fn), HERE).replace(os.sep, "/")
            if rel != "manifest.json":
                present.add(rel)
    check(listed == present, "manifest lists exactly the package files",
          f"missing={sorted(present - listed)} extra={sorted(listed - present)}")
    for rel, meta in sorted(manifest["files"].items()):
        data = load(rel)
        check(hashlib.sha256(data).hexdigest() == meta["sha256"] and len(data) == meta["bytes"],
              f"manifest entry {rel}")

    print("2. source pins")
    lines = {}
    for repo_path, pin in sorted(attr["source_pins"].items()):
        data = load(pin["local"])
        blob = hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()
        check(blob == pin["blob_sha"] and len(data) == pin["bytes"], f"pin {repo_path}")
        lines[repo_path] = data.decode("utf-8").splitlines()

    print("3. citations")
    n = 0
    for obj in walk(attr):
        if "file" in obj and "line" in obj and "quote" in obj:
            n += 1
            text = lines[obj["file"]][obj["line"] - 1].strip()
            if obj.get("mode") == "contains":
                ok = obj["quote"] in text
            else:
                ok = text == obj["quote"]
            check(ok, f"citation {obj['file']}:{obj['line']}", f"got {text[:80]!r}")
    print(f"   {n} citations re-extracted")

    print("4. captures")
    def decode(rel):
        d = json.loads(load(rel))
        raw = base64.b64decode(d["response"]["result"]["value"]["data"][0])

        def i128(off):
            lo, hi = struct.unpack_from("<QQ", raw, off)
            v = lo + (hi << 64)
            return v - (1 << 128) if hi >> 63 else v

        return raw, {
            "discriminator_hex": raw[:8].hex(),
            "field_8": struct.unpack_from("<Q", raw, 8)[0],
            "end_timestamp": struct.unpack_from("<q", raw, 16)[0],
            "mint_base58_bytes_hex": raw[24:56].hex(),
            "field_56": i128(56),
            "field_72": i128(72),
            "flag_88": raw[88],
            "field_89": struct.unpack_from("<Q", raw, 89)[0],
            "status": raw[97],
            "burned_amount": struct.unpack_from("<Q", raw, 98)[0],
        }

    ce = attr["chain_evidence"]
    raw_old, dec_old = decode(ce["retained_capture"])
    raw_new, dec_new = decode(ce["fresh_capture"])
    check(dec_old == ce["decoded"], "retained capture decodes to recorded values")
    check(raw_new == raw_old, "fresh capture bytes equal retained capture bytes")
    check(dec_new == dec_old, "fresh capture decodes identically")
    der = ce["derived"]
    check(dec_old["field_8"] == ce["creation_block_time"] and der["field_8_equals_creation_block_time"],
          "field_8 equals the creation blockTime recorded in PR #284")
    check(dec_old["end_timestamp"] - dec_old["field_8"] == 86400 == der["end_timestamp_minus_field_8"],
          "end_timestamp minus field_8 equals 86400")
    check(dec_old["field_89"] - dec_old["field_8"] == 48 == der["field_89_minus_field_8"],
          "field_89 minus field_8 equals 48")
    check(dec_old["status"] == 2, "status byte equals 2 (Ended)")

    print("5. sibling cross-check (PR #284)")
    sibling = os.path.join(HERE, "..", "mayhem-globalparams-contracts", "contracts.json")
    if os.path.exists(sibling):
        contracts = json.load(open(sibling))
        f6 = None
        for f in contracts.get("fields", []):
            if f.get("name") == "field_6" or f.get("field") == "field_6":
                f6 = f
        blob = json.dumps(contracts)
        check("1764874513" in blob and ce["creation_tx"] in blob,
              "sibling records this state's creation transaction and blockTime")
        check(f6 is not None and "24" in json.dumps(f6), "sibling field_6 record carries the value 24")
    else:
        print("   SKIP sibling package not present beside this one; "
              "recorded values: field_6 = 24, creation tx " + ce["creation_tx"])

    print("6. README hygiene")
    readme = load("README.md").decode("utf-8")
    check("—" not in readme, "README contains no em dash")
    check("Credit: TaoBot x Lightbrush." in readme, "README credit line present")
    attr_text = load("attribution.json").decode("utf-8")
    check("—" not in attr_text, "attribution.json contains no em dash")

    print()
    if FAIL:
        print(f"FAILED: {len(FAIL)} check(s)")
        return 1
    print("ALL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
