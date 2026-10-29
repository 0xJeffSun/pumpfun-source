#!/usr/bin/env python3
"""Independent re-verification for amm-reserved-fee-recipients-downstream-20261029.

Checks, from the packet files alone (plus the three program images):
- MANIFEST.json lists every packet file with a matching sha256.
- runtime/report.json.gz: 34 cases, 162 receipts, 17 parts (16x10 + 2),
  part sha256/byte counts match the part files.
- Every receipt transaction parses (solders) and all signatures verify.
- Every receipt's recorded before/after snapshots reproduce the
  report's expected values: payer delta (unique lamport mover rule),
  pool protocol/creator fee fields and virtual quote reserves,
  config writes for set steps (whitelist_pda 353..385,
  reserved_fee_recipient 385..417, reserved_fee_recipients 418..642,
  byte 417 untouched, nothing else changed), event count, and
  decoded event fields (set/buy/buyexact/sell/v2buy/v2sell/mh layouts
  documented in README).
- Failure steps roll back every watched account except the payer
  (fee 5,000) and carry the expected error code plus the recorded
  per-image site line ("thrown in" / "caused by account") in their
  logs. Site lines are checked per image, never compared across
  images, because original and rebuilt sources differ in line
  numbers.
- The observed surface of every case (step, error, event count,
  pool fees/vq, config bytes, all token/lamport deltas, payer delta)
  is identical across the original, control, and candidate images.
- The three program images hash to the values recorded in the
  report.

Usage: python3 verify.py   (run from this packet directory)
"""
import base64
import gzip
import hashlib
import json
import struct
import sys
from pathlib import Path

from solders.pubkey import Pubkey
from solders.transaction import Transaction

ROOT = Path(__file__).resolve().parent
WS = Path.home() / "workspace/slop-verify"
SPARSE = Path.home() / "workspace/pumpfun-sparse"
IMAGE_PATHS = {
    "original": SPARSE / "evidence/original/pump_amm/deployed.so",
    "control": WS / "control.so",
    "candidate": WS / "candidate.so",
}


def fail(msg):
    raise SystemExit(f"FAIL: {msg}")


def sha(data):
    return hashlib.sha256(data).hexdigest()


def tok_amount(entry):
    if entry is None:
        return None
    raw = bytes.fromhex(entry["data_hex"])
    if len(raw) < 72:
        return None
    return struct.unpack_from("<Q", raw, 64)[0]


def tok_delta(before, after):
    return (tok_amount(after) or 0) - (tok_amount(before) or 0)


def lam_delta(before, after):
    return (after["lamports"] if after else 0) - (before["lamports"] if before else 0)


def pool_fees(entry):
    raw = bytes.fromhex(entry["data_hex"])
    return [struct.unpack_from("<Q", raw, 271)[0],
            struct.unpack_from("<Q", raw, 279)[0]]


def pool_vq(entry):
    return struct.unpack_from("<q", bytes.fromhex(entry["data_hex"]), 245)[0]


def ev_data(logs):
    lines = [l for l in logs if l.startswith("Program data: ")]
    if len(lines) != 1:
        return None
    return base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())


def u64(raw, off):
    return struct.unpack_from("<Q", raw, off)[0]


def decode_event(kind, rec):
    raw = ev_data(rec["logs"])
    if raw is None:
        return None
    if kind in ("buy", "buyexact"):
        bb, bf = (439, 447) if kind == "buyexact" else (424, 432)
        return {"curve": u64(raw, 64), "lp_bps": u64(raw, 72), "lp_fee": u64(raw, 80),
                "proto_bps": u64(raw, 88), "proto_fee": u64(raw, 96),
                "qwlp": u64(raw, 104), "uqin": u64(raw, 112),
                "creator_bps": u64(raw, 344), "creator_fee": u64(raw, 352),
                "buyback_bps": u64(raw, bb), "buyback_fee": u64(raw, bf)}
    if kind == "sell":
        return {"quote": u64(raw, 64), "proto_fee": u64(raw, 96)}
    if kind in ("v2buy", "v2sell"):
        d = {"curve": u64(raw, 64), "quote": u64(raw, 64), "lp_bps": u64(raw, 72),
             "lp_fee": u64(raw, 80), "proto_bps": u64(raw, 88),
             "proto_fee": u64(raw, 96), "qwlp": u64(raw, 104),
             "uqin": u64(raw, 112), "creator_bps": u64(raw, 344),
             "creator_fee": u64(raw, 352)}
        if kind == "v2buy":
            d["buyback_bps"] = u64(raw, 427)
            d["buyback_fee"] = u64(raw, 435)
        else:
            d["buyback_bps"] = u64(raw, 376)
            d["buyback_fee"] = u64(raw, 384)
        return d
    if kind in ("mhbuy", "mhsell"):
        return {"hop": [u64(raw, o) for o in (64, 72, 80, 88, 96, 104, 112)]}
    if kind == "set":
        return {"ts": struct.unpack_from("<q", raw, 8)[0],
                "recip": raw[16:48].hex(),
                "recips": [raw[48 + i * 32:80 + i * 32].hex() for i in range(7)],
                "disc": raw[:8].hex(), "len": len(raw)}
    return None


def main():
    manifest = json.loads((ROOT / "MANIFEST.json").read_text())
    for rel, want in manifest["files"].items():
        path = ROOT / rel
        if not path.exists():
            fail(f"manifest file missing: {rel}")
        if sha(path.read_bytes()) != want:
            fail(f"manifest sha mismatch: {rel}")
    with gzip.open(ROOT / "runtime" / "report.json.gz", "rt", encoding="utf-8") as fh:
        report = json.load(fh)
    if report["case_count"] != 34:
        fail(f"case_count {report['case_count']} != 34")
    if report["receipt_count"] != 162:
        fail(f"receipt_count {report['receipt_count']} != 162")
    if report["counts"] != {"cases": 34, "receipts": 162, "parts": 17}:
        fail(f"counts {report['counts']}")
    if report["mismatches"] != []:
        fail(f"mismatches non-empty: {report['mismatches']}")
    for name, want in report["input_sha256"].items():
        if sha(IMAGE_PATHS[name].read_bytes()) != want:
            fail(f"image sha mismatch: {name}")
    receipts = []
    for part in report["parts"]:
        path = ROOT / part["file"]
        if sha(path.read_bytes()) != part["sha256"]:
            fail(f"part sha mismatch: {part['file']}")
        if path.stat().st_size != part["bytes"]:
            fail(f"part bytes mismatch: {part['file']}")
        with gzip.open(path, "rt", encoding="utf-8") as fh:
            chunk = [json.loads(line) for line in fh]
        if len(chunk) != part["count"]:
            fail(f"part count mismatch: {part['file']}")
        receipts.extend(chunk)
    if len(receipts) != 162:
        fail(f"total receipts {len(receipts)} != 162")
    if [p["count"] for p in report["parts"]] != [10] * 16 + [2]:
        fail(f"part counts {[p['count'] for p in report['parts']]}")

    expected_order = []
    for case in report["cases"]:
        for image in ("original", "control", "candidate"):
            for step in case["steps"]:
                expected_order.append((case["label"], image, step["name"]))
    got_order = [(r["case"], r["image"], r["step"]) for r in receipts]
    if got_order != expected_order:
        fail("receipt order does not match report cases")

    cases_by_label = {c["label"]: c for c in report["cases"]}
    surfaces = {}
    for (case, image, step_name), rec, exp in zip(
            expected_order, receipts,
            [s for c in report["cases"] for _ in ("original", "control", "candidate") for s in c["steps"]]):
        tag = f"{case}/{image}/{step_name}"
        tx = Transaction.from_bytes(base64.b64decode(rec["transaction_base64"]))
        if not all(tx.verify_with_results()):
            fail(f"{tag}: signature verification failed")
        if set(rec["before"]) != set(rec["after"]):
            fail(f"{tag}: before/after key sets differ")
        pool_key = next(k for k in rec["before"] if rec["before"][k] and len(bytes.fromhex(rec["before"][k]["data_hex"])) == 300)
        pool_before, pool_after = rec["before"][pool_key], rec["after"][pool_key]
        if exp.get("pool_fees") is not None and pool_fees(pool_after) != exp["pool_fees"]:
            fail(f"{tag}: pool_fees {pool_fees(pool_after)} != {exp['pool_fees']}")
        if exp.get("pool_vq") is not None and pool_vq(pool_after) != exp["pool_vq"]:
            fail(f"{tag}: pool_vq {pool_vq(pool_after)} != {exp['pool_vq']}")
        if exp["error"] is None:
            if rec["error"] is not None:
                fail(f"{tag}: unexpected error {rec['error']}")
        else:
            if rec["error"] is None or exp["error"] not in rec["error"]:
                fail(f"{tag}: expected error {exp['error']}, got {rec['error']}")
        if len(rec["events"]) != exp["events"]:
            fail(f"{tag}: events {len(rec['events'])} != {exp['events']}")
        payers = []
        for k in rec["before"]:
            if lam_delta(rec["before"][k], rec["after"][k]) == -exp["payer"]:
                payers.append(k)
        if len(payers) != 1:
            fail(f"{tag}: payer candidates {payers} for fee {exp['payer']}")
        payer_key = payers[0]
        if exp.get("rollback"):
            for k in rec["before"]:
                if k == payer_key:
                    continue
                if rec["before"][k] != rec["after"][k]:
                    fail(f"{tag}: rollback violated for {k}")
        if exp.get("site_fragment"):
            blob = "\n".join(rec["logs"])
            if exp["site_fragment"] not in blob:
                fail(f"{tag}: site fragment {exp['site_fragment']} not in logs")
        if exp.get("event") is not None:
            got = decode_event(step_name, rec)
            if got is None:
                fail(f"{tag}: event decode failed")
            for fkey, want in exp["event"].items():
                if got.get(fkey) != want:
                    fail(f"{tag}: event {fkey} {got.get(fkey)} != {want}")
        if step_name == "set" and exp.get("config") is not None:
            cfg_key = next(k for k in rec["before"] if rec["before"][k] and len(bytes.fromhex(rec["before"][k]["data_hex"])) == 949)
            before_cfg = bytes.fromhex(rec["before"][cfg_key]["data_hex"])
            after_cfg = bytes.fromhex(rec["after"][cfg_key]["data_hex"])
            wl = bytes(Pubkey.from_string(exp["config"]["wl"]))
            res = [bytes(Pubkey.from_string(x)) for x in exp["config"]["res"]]
            if after_cfg[353:385] != wl:
                fail(f"{tag}: config whitelist_pda mismatch")
            if after_cfg[385:417] != res[0]:
                fail(f"{tag}: config reserved_fee_recipient mismatch")
            if after_cfg[418:642] != b"".join(res[1:8]):
                fail(f"{tag}: config reserved_fee_recipients mismatch")
            if after_cfg[417] != before_cfg[417]:
                fail(f"{tag}: config byte 417 changed")
            masked_before = bytearray(before_cfg)
            masked_after = bytearray(after_cfg)
            for lo, hi in ((353, 385), (385, 417), (418, 642)):
                masked_before[lo:hi] = bytes(hi - lo)
                masked_after[lo:hi] = bytes(hi - lo)
            if bytes(masked_before) != bytes(masked_after):
                fail(f"{tag}: config changed outside the setter ranges")
            if step_name == "set":
                got = decode_event(step_name, rec)
                if got is None or got["len"] != 272:
                    fail(f"{tag}: set event len != 272")
        site = cases_by_label[case]["error_sites"][image][
            [s["name"] for s in cases_by_label[case]["steps"]].index(step_name)]
        if site is not None and site not in rec["logs"]:
            fail(f"{tag}: recorded site line not in logs")
        cfg_key = next((k for k in rec["before"] if rec["before"][k] and len(bytes.fromhex(rec["before"][k]["data_hex"])) == 949), None)
        surface = {"step": step_name, "error": rec["error"],
                   "events": len(rec["events"]),
                   "pool_fees": pool_fees(pool_after),
                   "pool_vq": pool_vq(pool_after),
                   "config": rec["after"][cfg_key]["data_hex"] if cfg_key else None,
                   "payer": lam_delta(rec["before"][payer_key], rec["after"][payer_key]),
                   "deltas": {k: tok_delta(rec["before"][k], rec["after"][k]) for k in rec["before"]},
                   "lam_deltas": {k: lam_delta(rec["before"][k], rec["after"][k]) for k in rec["before"]}}
        surfaces.setdefault(case, {}).setdefault(image, []).append(surface)
    for case, by_image in surfaces.items():
        base = by_image["original"]
        for image in ("control", "candidate"):
            if by_image[image] != base:
                fail(f"{case}: {image} observed surface differs from original")
    print("PASS: 34 cases, 162 receipts, 17 parts, 3 images agree "
          "(signatures, deltas, events, error codes/sites, rollback)")


if __name__ == "__main__":
    main()
