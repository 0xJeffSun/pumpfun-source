"""Verify the retained track-volume receipts (no build claimed).

Checks, independently of the producer:
- packet manifest lists exactly the files present, with matching hashes;
- repository inputs (images, harness scripts, evidence programs)
  hash to the recorded values;
- 26 cases x 3 images = 78 receipts, ordered, with contexts
  matching the report;
- every transaction verifies (all signatures valid, 1 signature field);
- success cases: the recorded error is None, exactly 1 event whose
  decoded fields match the recorded event (legacy buy 497 bytes /
  buy_exact 512 bytes with track byte @360; tuple events for
  legacy sell 449 bytes, v2 buy 500 / sell 449 / buy_exact 515
  bytes, multi-hop buy 508 / sell 449 bytes with the
  (out, max, quote, lp_bps, lp_fee, protocol_bps, protocol_fee,
  quote_with_lp, user_quote_in) tuple), token deltas recomputed
  from the before/after snapshots via the receipt roles match the
  recorded deltas, the volume accumulator's full 137-byte
  after-state matches the expected seed/fresh/overwrite form
  (discriminator recomputed as sha256("account:
  UserVolumeAccumulator")[:8], seed fields needs=1,
  unclaimed=111, claimed=222, sol=333444, last=999, has=1,
  earned=555 or 1103, cb_claimed=666), the pool protocol /
  creator / virtual-quote deltas match where recorded, and the
  payer delta matches;
- failure cases: the recorded error code appears (in the error
  string or the logs), 0 events, every non-payer watched account
  is byte identical before/after, and the payer delta matches;
- receipts are stored as parts, each under 25MB, read in order;
- all three images agree on every case's observed values.
"""
import base64
import gzip
import hashlib
import json
import struct
from pathlib import Path

from solders.pubkey import Pubkey
from solders.transaction import Transaction

if not __debug__:
    raise SystemExit("Run without -O")

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
IMAGES = ("original", "control", "candidate")
DISC = hashlib.sha256(b"account:UserVolumeAccumulator").digest()[:8]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def amount_at(data_hex, offset=64):
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


def decode_tuple_event(logs, length, track):
    lines = [l for l in logs if l.startswith("Program data: ")]
    if len(lines) != 1:
        return None
    raw = base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())
    if len(raw) != length:
        return None
    tup = [struct.unpack_from("<Q", raw, off)[0]
           for off in (16, 24, 64, 72, 80, 88, 96, 104, 112)]
    if track is not None:
        assert raw[360] == track, (raw[360], track)
    return {"tuple": tup, "length": length, "track": track}


def seed_bytes(user_key_str, earned):
    user = bytes(Pubkey.from_string(user_key_str))
    raw = DISC + user + bytes([1]) + struct.pack("<Q", 111) \
        + struct.pack("<Q", 222) + struct.pack("<Q", 333444) \
        + struct.pack("<q", 999) + bytes([1]) + struct.pack("<Q", earned) \
        + struct.pack("<Q", 666)
    return raw.ljust(137, b"\0").hex()


def expected_vol_hex(spec, payer_key_str):
    if spec[0] == "fresh":
        return (DISC + bytes(Pubkey.from_string(payer_key_str)) + bytes(97)).hex()
    if spec[0] == "seed":
        return seed_bytes(spec[1], 555 if spec[2] is None else spec[2])
    if spec[0] == "seed_user_to_payer":
        return seed_bytes(payer_key_str, 555)
    raise AssertionError(spec)


def pool_fields(data_hex):
    raw = bytes.fromhex(data_hex)
    return {"vq": struct.unpack_from("<q", raw, 245)[0],
            "proto": struct.unpack_from("<Q", raw, 271)[0],
            "creator": struct.unpack_from("<Q", raw, 279)[0]}


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
    assert report["case_count"] == 26, report["case_count"]
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
    assert len(receipts) == 78, len(receipts)
    assert report["counts"] == {"vms": 78, "transactions": 78, "signature_fields": 78}
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
    assert len(by_case) == 26, len(by_case)
    for case in report["cases"]:
        c = case["case"]
        label, ix_name, kind = c["label"], c["instruction"], c["kind"]
        exp = c["expected"]
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
            vol_a = after.get(roles["volume"])
            vol_after_hex = vol_a["data_hex"] if vol_a else None
            assert vol_after_hex == obs["volume_after_hex"], (label, image)
            assert (vol_a["lamports"] if vol_a else None) == obs["volume_after_lamports"], \
                (label, image)
            if exp["kind"] == "ok":
                assert r["error"] is None, (label, image, r["error"])
                assert r["metadata"]["events"] == 1, (label, image)
                if kind == "legacy_buy":
                    ev = decode_buy_event(logs, ix_name == "buy_exact_quote_in")
                    assert ev == obs["event"], (label, image, ev, obs["event"])
                    want_ev = dict(exp["event"])
                    want_ev["max"] = want_ev.pop("max_")
                    assert obs["event"] == want_ev, (label, image)
                else:
                    ev = decode_tuple_event(logs, exp["event"]["length"],
                                            exp["event"]["track"])
                    assert ev == obs["event"] == exp["event"], (label, image, ev)
                deltas = {}
                for name in obs["deltas"]:
                    key = roles[name]
                    b, a = before.get(key), after.get(key)
                    assert a, (label, image, name)
                    b_amt = amount_at(b["data_hex"]) if b else 0
                    deltas[name] = amount_at(a["data_hex"]) - b_amt
                assert deltas == obs["deltas"] == exp["deltas"], (label, image, deltas)
                want_vol = expected_vol_hex(exp["vol_after"], payer)
                assert vol_after_hex == want_vol, (label, image)
                if exp["vol_after"][0] == "fresh":
                    assert obs["volume_after_lamports"] == 1844400, (label, image)
                else:
                    assert obs["volume_after_lamports"] == 10**9, (label, image)
                assert payer_paid == exp["payer"], (label, image, payer_paid)
                if exp.get("pool_after") is not None:
                    pa = pool_fields(after[roles["pool"]]["data_hex"])
                    pool_after = {"vq_delta": pa["vq"] - (-125882),
                                  "proto_delta": pa["proto"] - 2488,
                                  "creator_delta": pa["creator"] - 123394}
                    assert pool_after == obs["pool_after"] == \
                        {"vq_delta": exp["pool_after"]["vq"],
                         "proto_delta": exp["pool_after"]["proto"],
                         "creator_delta": exp["pool_after"]["creator"]}, \
                        (label, image, pool_after)
            else:
                assert r["error"] is not None, (label, image)
                assert exp["code"] in r["error"], (label, image, r["error"])
                assert exp["fragment"] in (r["error"] or "") or exp["fragment"] in "\n".join(logs), \
                    (label, image)
                assert r["metadata"]["events"] == 0, (label, image)
                assert obs["rollback"] is True, (label, image)
                assert payer_paid == exp["payer"], (label, image, payer_paid)
                for key, snap_b in before.items():
                    if key == payer:
                        continue
                    assert snap_b == after.get(key), (label, image, key, "no rollback")
        assert len(obs_seen) == 1, (label, "images must agree", obs_seen)
    print("verify PASS: 26 cases x 3 images = 78 receipts, all checks passed")


if __name__ == "__main__":
    main()
