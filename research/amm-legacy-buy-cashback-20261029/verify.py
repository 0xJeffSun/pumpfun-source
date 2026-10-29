"""Verify the retained legacy-buy cashback receipts (no build claimed).

Checks, independently of the producer:
- packet manifest lists exactly the files present, with matching hashes;
- repository inputs (images, harness scripts, evidence programs)
  hash to the recorded values;
- 42 cases x 3 images = 126 receipts, ordered, with contexts
  matching the report;
- every transaction verifies (all signatures valid, 1 signature field);
- success cases: the recorded error is None, exactly 1 event whose
  decoded fields (buy 497 bytes: curve @64, lp @80, protocol @96,
  quote-with-lp @104, user-quote-in @112, creator_bps @344,
  creator_fee @352, track @360, min_base @393, cashback_bps @408,
  cashback @416, buyback_bps @424, buyback_fee @432; buy_exact
  512 bytes: cashback_bps @423, cashback @431, buyback_bps @439,
  buyback_fee @447) match the recorded event, token deltas
  recomputed from the before/after snapshots via the receipt roles
  match the recorded deltas, the volume accumulator's
  cashback_earned / current_sol_volume / lamports match, the
  cashback ATA lamports match, withheld transfer fees recomputed
  from the snapshots (178-byte accounts @170, 182-byte accounts
  @174) match, and the payer delta matches;
- failure cases: the recorded error code appears (in the error
  string or the logs), 0 events, every non-payer watched account
  is byte identical before/after, the payer delta matches, and
  where a per-image site line was recorded it appears verbatim
  in that image's logs;
- receipts are stored as parts, each under 25MB, read in order;
- all three images agree on every case's observed values.
"""
import base64
import gzip
import hashlib
import json
import struct
from pathlib import Path

from solders.transaction import Transaction

if not __debug__:
    raise SystemExit("Run without -O")

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
IMAGES = ("original", "control", "candidate")


def sha(data):
    return hashlib.sha256(data).hexdigest()


def amount_at(data_hex, offset=64):
    if data_hex is None:
        return None
    raw = bytes.fromhex(data_hex)
    if len(raw) < offset + 8:
        return None
    return struct.unpack_from("<Q", raw, offset)[0]


def withheld_at(data_hex):
    if data_hex is None:
        return None
    raw = bytes.fromhex(data_hex)
    if len(raw) == 178:
        return struct.unpack_from("<Q", raw, 170)[0]
    if len(raw) == 182:
        return struct.unpack_from("<Q", raw, 174)[0]
    return None


def vol_field(data_hex, offset):
    if data_hex is None:
        return None
    raw = bytes.fromhex(data_hex)
    if len(raw) < offset + 8:
        return None
    return struct.unpack_from("<Q", raw, offset)[0]


def decode_buy_event(logs, exact):
    lines = [l for l in logs if l.startswith("Program data: ")]
    if len(lines) != 1:
        return None
    raw = base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())
    if len(raw) != (512 if exact else 497):
        return None
    ev = {"out": struct.unpack_from("<Q", raw, 16)[0],
          "max": struct.unpack_from("<Q", raw, 24)[0],
          "curve": struct.unpack_from("<Q", raw, 64)[0],
          "lp_bps": struct.unpack_from("<Q", raw, 72)[0],
          "lp": struct.unpack_from("<Q", raw, 80)[0],
          "proto_bps": struct.unpack_from("<Q", raw, 88)[0],
          "proto": struct.unpack_from("<Q", raw, 96)[0],
          "qwlp": struct.unpack_from("<Q", raw, 104)[0],
          "uqin": struct.unpack_from("<Q", raw, 112)[0],
          "creator_bps": struct.unpack_from("<Q", raw, 344)[0],
          "creator": struct.unpack_from("<Q", raw, 352)[0],
          "track": raw[360],
          "min_base": struct.unpack_from("<Q", raw, 393)[0]}
    if exact:
        ev.update({"cb_bps": struct.unpack_from("<Q", raw, 423)[0],
                   "cb": struct.unpack_from("<Q", raw, 431)[0],
                   "bb_bps": struct.unpack_from("<Q", raw, 439)[0],
                   "bb": struct.unpack_from("<Q", raw, 447)[0]})
    else:
        ev.update({"cb_bps": struct.unpack_from("<Q", raw, 408)[0],
                   "cb": struct.unpack_from("<Q", raw, 416)[0],
                   "bb_bps": struct.unpack_from("<Q", raw, 424)[0],
                   "bb": struct.unpack_from("<Q", raw, 432)[0]})
    return ev


def main():
    manifest = json.loads((HERE / "MANIFEST.json").read_text())
    present = {str(p.relative_to(HERE)) for p in HERE.rglob("*")
               if p.is_file() and p.name != "MANIFEST.json"}
    assert set(manifest["files"]) == present, (
        "manifest mismatch", set(manifest["files"]) ^ present)
    for rel, digest in manifest["files"].items():
        assert sha((HERE / rel).read_bytes()) == digest, rel
    report = json.loads(gzip.decompress(
        (HERE / "runtime/report.json.gz").read_bytes()))
    assert report["case_count"] == 42, report["case_count"]
    assert report["mismatches"] == [] and report["divergent_cases"] == []
    for rel, digest in report["input_sha256"].items():
        assert sha((ROOT / rel).read_bytes()) == digest, rel
    receipts = []
    for part in report["transaction_receipts"]["parts"]:
        data = (HERE / part["path"]).read_bytes()
        assert len(data) < 25 * 1024 * 1024, part["path"]
        assert sha(data) == part["sha256"], part["path"]
        chunk = [json.loads(l) for l in gzip.decompress(data).decode().splitlines() if l]
        assert len(chunk) == part["receipts"], part["path"]
        receipts.extend(chunk)
    assert len(receipts) == 126, len(receipts)
    assert report["counts"] == {"vms": 126, "transactions": 126, "signature_fields": 126}
    for seq, r in enumerate(receipts):
        assert r["sequence"] == seq and r["vm"] == seq, seq
        assert r["all_signatures_verified"] is True and r["signature_fields"] == 1, seq
        tx = Transaction.from_bytes(base64.b64decode(r["transaction_base64"]))
        assert tx.verify_with_results() and all(tx.verify_with_results()), seq
        assert str(tx.signatures[0]) == r["signatures"][0], seq
        assert r["transaction_sha256"] == sha(base64.b64decode(r["transaction_base64"])), seq
        assert r["payer_delta_lamports"] == r["observed"]["payer_paid"], seq
    by_case = {}
    for r in receipts:
        ctx = r["context"]
        by_case.setdefault(ctx["label"], {}).setdefault(ctx["image"], []).append(r)
    assert len(by_case) == 42, len(by_case)
    for case in report["cases"]:
        label = case["case"]["label"]
        ix_name = case["case"]["instruction"]
        exact = ix_name == "buy_exact_quote_in"
        exp = case["case"]["expected"]
        obs_seen = set()
        for image in IMAGES:
            steps = by_case[label][image]
            assert len(steps) == 1, (label, image)
            r = steps[0]
            roles, before, after = r["roles"], r["before"], r["after"]
            logs = r["metadata"]["logs"]
            obs = r["observed"]
            obs_seen.add(json.dumps(obs, sort_keys=True))
            payer = roles["fee_payer"]
            payer_paid = before[payer]["lamports"] - after[payer]["lamports"] \
                if before.get(payer) and after.get(payer) else None
            assert payer_paid == obs["payer_paid"], (label, image, payer_paid)
            vol_b, vol_a = before.get(roles["volume"]), after.get(roles["volume"])
            vol = {"earned_before": vol_field(vol_b["data_hex"], 74) if vol_b else None,
                   "earned_after": vol_field(vol_a["data_hex"], 74) if vol_a else None,
                   "sol_before": vol_field(vol_b["data_hex"], 57) if vol_b else None,
                   "sol_after": vol_field(vol_a["data_hex"], 57) if vol_a else None,
                   "lamports_before": vol_b["lamports"] if vol_b else None,
                   "lamports_after": vol_a["lamports"] if vol_a else None}
            assert vol == obs["volume"], (label, image, vol, obs["volume"])
            uva_b, uva_a = before.get(roles["uvata"]), after.get(roles["uvata"])
            uvata_lamports = [uva_b["lamports"] if uva_b else None,
                              uva_a["lamports"] if uva_a else None]
            assert uvata_lamports == obs["uvata_lamports"], (label, image, uvata_lamports)
            if exp["kind"] == "ok":
                assert r["error"] is None, (label, image, r["error"])
                assert r["metadata"]["events"] == 1, (label, image)
                assert decode_buy_event(logs, exact) == obs["event"], (label, image)
                deltas = {}
                for name in obs["deltas"]:
                    key = roles[name]
                    b, a = before.get(key), after.get(key)
                    assert a, (label, image, name)
                    b_amt = amount_at(b["data_hex"]) if b else 0
                    deltas[name] = amount_at(a["data_hex"]) - b_amt
                assert deltas == obs["deltas"], (label, image, deltas)
                withheld = {}
                for name, key in roles.items():
                    if name in ("fee_payer", "pool", "global_config", "volume"):
                        continue
                    snap = after.get(key)
                    w = withheld_at(snap["data_hex"]) if snap else None
                    if w is not None:
                        withheld[name] = w
                assert withheld == obs["withheld"], (label, image, withheld)
            else:
                assert r["error"] is not None, (label, image)
                assert exp["code"] in r["error"], (label, image, r["error"])
                assert exp["fragment"] in (r["error"] or "") or exp["fragment"] in "\n".join(logs), \
                    (label, image)
                assert r["metadata"]["events"] == 0, (label, image)
                assert obs["rollback"] is True, (label, image)
                for key, snap_b in before.items():
                    if key == payer:
                        continue
                    assert snap_b == after.get(key), (label, image, key, "no rollback")
                site = (case.get("error_sites") or {}).get(image)
                if site:
                    assert site in "\n".join(logs), (label, image, site)
        assert len(obs_seen) == 1, (label, "images must agree", obs_seen)
    print("verify PASS: 42 cases x 3 images = 126 receipts, all checks passed")


if __name__ == "__main__":
    main()
