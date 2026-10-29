"""Verify the retained admin `disable` setter receipts (no build claimed).

Checks, independently of the producer:
- packet manifest lists exactly the files present, with matching hashes;
- repository inputs (images, harness scripts, evidence programs)
  hash to the recorded values;
- 26 cases x 3 images = 111 receipts (family A: 21 cases x 1 step;
  family B: 5 chains x 3-4 steps), ordered, with contexts matching
  the report;
- every transaction verifies (all signatures valid, 1 signature field);
- family A success cases: the config byte 56 lands exactly on the
  expected flags, only byte 56 differs, exactly 1 DisableEvent
  (discriminator 6bfdc14ce4ca1b68, 53 bytes, timestamp 0, admin
  equal to the config's own admin bytes 8..40, bools equal to the
  instruction payload), payer charged exactly 5,000;
- family A failure cases: the recorded error code and fragment
  appear, the config (bytes and lamports) is fully rolled back,
  the payer is charged exactly 5,000, and the event count is 0 —
  except the 907/948-byte truncation cases, where exactly 1 ghost
  DisableEvent with the attempted bools remains in the log; where
  a per-image site line was recorded, it appears verbatim in that
  image's logs;
- family B disable steps: same event/flags/payer checks, with the
  chained-VM clock timestamp 1234567890;
- family B gated steps: the recorded gate code and fragment
  appear, 0 events, every non-payer watched account is byte
  identical before/after, the payer is charged exactly 5,000,
  and the recorded per-image site line appears in the logs;
- family B live trade steps: token deltas recomputed from the
  before/after snapshots via the receipt roles match the recorded
  deltas, the Buy/Sell event fields decoded from the logs match,
  the pool deltas are (-56, +56, 0), exactly 1 event, payer
  charged exactly 1,849,400;
- family B live liquidity steps: token deltas recomputed via
  roles match, exactly 1 event, payer charged exactly 5,000;
- family B create steps: the gated create fails 6017 with no
  pool / LP mint / user LP account created and both vaults
  unchanged; the re-enabled create succeeds with init_liq 1009
  and lp_out 909 (event fields decoded from the logs), user LP
  and mint supply 909, vaults 100 / 10200, payer charged
  exactly 10,507,640;
- receipts are stored as parts, each under 25MB, read in order;
- all three images agree on every case-step's observed values.
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

if not __debug__:
    raise SystemExit("Run without -O")

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
IMAGES = ("original", "control", "candidate")
DISABLE_DISC = "6bfdc14ce4ca1b68"
CREATE_DISC = "b1310cd2a076a774"


def sha(data):
    return hashlib.sha256(data).hexdigest()


def amount_at(data_hex, offset=64):
    return struct.unpack_from("<Q", bytes.fromhex(data_hex), offset)[0]


def disable_event(logs):
    lines = [l for l in logs if l.startswith("Program data: ")]
    if len(lines) != 1:
        return None
    raw = base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())
    if raw[:8].hex() != DISABLE_DISC or len(raw) != 53:
        return None
    return {"disc": raw[:8].hex(),
            "timestamp": struct.unpack_from("<q", raw, 8)[0],
            "admin": raw[16:48].hex(),
            "bools": list(raw[48:53])}


def trade_event_fields(ix_name, logs):
    lines = [l for l in logs if l.startswith("Program data: ")]
    assert len(lines) == 1, lines
    raw = base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())
    offs = (64, 72, 80, 88, 96, 104, 112) if ix_name == "buy_v2" else (64, 72, 80, 88, 96)
    assert len(raw) >= max(offs) + 8, len(raw)
    return tuple(struct.unpack_from("<Q", raw, off)[0] for off in offs)


def create_event_fields(logs):
    lines = [l for l in logs if l.startswith("Program data: ")]
    if len(lines) != 1:
        return None
    raw = base64.b64decode(lines[0].split("Program data: ", 1)[1].strip())
    if raw[:8].hex() != CREATE_DISC or len(raw) < 344:
        return None
    return {"disc": raw[:8].hex(),
            "base_in": struct.unpack_from("<Q", raw, 116)[0],
            "quote_in": struct.unpack_from("<Q", raw, 124)[0],
            "pool_base": struct.unpack_from("<Q", raw, 132)[0],
            "pool_quote": struct.unpack_from("<Q", raw, 140)[0],
            "min_liq": struct.unpack_from("<Q", raw, 148)[0],
            "init_liq": struct.unpack_from("<Q", raw, 156)[0],
            "lp_out": struct.unpack_from("<Q", raw, 164)[0]}


def pool_deltas(before_hex, after_hex):
    b, a = bytes.fromhex(before_hex), bytes.fromhex(after_hex)
    return (int.from_bytes(a[245:261], "little", signed=True) - int.from_bytes(b[245:261], "little", signed=True),
            struct.unpack_from("<Q", a, 271)[0] - struct.unpack_from("<Q", b, 271)[0],
            struct.unpack_from("<Q", a, 279)[0] - struct.unpack_from("<Q", b, 279)[0])


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
    assert len(receipts) == 111, len(receipts)
    assert report["counts"] == {"vms": 111, "transactions": 111, "signature_fields": 111}
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
        label = case["case"]["label"]
        family = case["case"]["family"]
        exp = case["case"]["expected"] if family == "A" else None
        obs_seen = {}
        for image in IMAGES:
            steps = sorted(by_case[label][image], key=lambda r: r["context"].get("step", 0))
            if family == "A":
                assert len(steps) == 1, (label, image)
                r = steps[0]
                roles, before, after = r["roles"], r["before"], r["after"]
                logs = r["metadata"]["logs"]
                cfg = roles["global_config"]
                payer = roles["fee_payer"]
                b_hex = before[cfg]["data_hex"]
                a_hex = after[cfg]["data_hex"]
                b, a = bytes.fromhex(b_hex), bytes.fromhex(a_hex)
                admin_hex = b[8:40].hex()
                obs = r["observed"]
                obs_seen.setdefault("all", set()).add(json.dumps(obs, sort_keys=True))
                assert obs["payer_paid"] == 5000, (label, image)
                assert obs["length"] == len(a), (label, image)
                if exp["kind"] == "ok":
                    assert r["error"] is None, (label, image, r["error"])
                    assert a[56] == exp["flags"], (label, image, a[56])
                    diffs = [i for i in range(min(len(b), len(a))) if b[i] != a[i]]
                    assert diffs == exp["diffs"], (label, image, diffs)
                    assert r["metadata"]["events"] == 1, (label, image)
                    assert disable_event(logs) == {
                        "disc": DISABLE_DISC, "timestamp": 0, "admin": admin_hex,
                        "bools": case["case"]["payload"][:5]}, (label, image)
                else:
                    assert r["error"] is not None and exp["code"] in r["error"], (label, image, r["error"])
                    assert exp["fragment"] in "\n".join(logs), (label, image)
                    assert before[cfg] == after[cfg], (label, image, "no rollback")
                    assert a[56] == b[56], (label, image, "flags moved on failure")
                    if exp.get("ghost"):
                        assert r["metadata"]["events"] == 1, (label, image)
                        assert disable_event(logs) == {
                            "disc": DISABLE_DISC, "timestamp": 0, "admin": admin_hex,
                            "bools": case["case"]["payload"][:5]}, (label, image)
                    else:
                        assert r["metadata"]["events"] == 0, (label, image)
                    site = (case.get("error_sites") or {}).get(image)
                    if site:
                        assert site in "\n".join(logs), (label, image, site)
            else:
                for step_index, r in enumerate(steps):
                    ctx = r["context"]
                    assert ctx["step"] == step_index and ctx["step_name"] in (
                        "disable", "buy_v2", "sell_v2", "deposit", "withdraw", "create_pool"), ctx
                    roles, before, after = r["roles"], r["before"], r["after"]
                    logs = r["metadata"]["logs"]
                    obs = r["observed"]
                    obs_seen.setdefault(step_index, set()).add(json.dumps(obs, sort_keys=True))
                    payer = roles["fee_payer"]
                    assert obs["payer_paid"] == r["payer_delta_lamports"]
                    if ctx["step_name"] == "disable":
                        assert r["error"] is None, (label, image, step_index, r["error"])
                        cfg = roles["global_config"]
                        admin_hex = bytes.fromhex(before[cfg]["data_hex"])[8:40].hex()
                        assert after[cfg]["data_hex"][112:114] == f"{obs['flags_after']:02x}"
                        assert r["metadata"]["events"] == 1
                        assert disable_event(logs) == {
                            "disc": DISABLE_DISC, "timestamp": 1234567890,
                            "admin": admin_hex, "bools": obs["event"]["bools"]}, (label, image, step_index)
                        assert obs["payer_paid"] == 5000
                    elif "error_code" in obs:
                        assert r["error"] is not None and obs["error_code"] in r["error"], (label, image, step_index)
                        assert obs["fragment"] in "\n".join(logs), (label, image, step_index)
                        assert r["metadata"]["events"] == 0, (label, image, step_index)
                        assert obs["payer_paid"] == 5000
                        for key, snap_b in before.items():
                            if key == payer:
                                assert snap_b["lamports"] - after[key]["lamports"] == 5000
                            else:
                                assert snap_b == after[key], (label, image, step_index, key)
                        site = (case.get("error_sites") or {}).get(f"{image}:{ctx['step_name']}")
                        assert site and site in "\n".join(logs), (label, image, step_index, site)
                        if ctx["step_name"] == "create_pool":
                            assert after[roles["pool"]] is None
                            assert after[roles["lp_mint"]] is None
                            assert after[roles["userlp"]] is None
                            assert after[roles["vaultbase"]] == before[roles["vaultbase"]]
                            assert after[roles["vaultquote"]] == before[roles["vaultquote"]]
                    elif ctx["step_name"] in ("buy_v2", "sell_v2"):
                        assert r["error"] is None, (label, image, step_index, r["error"])
                        assert r["metadata"]["events"] == 1
                        deltas = {}
                        for name, key in (("userbase", "userbase"), ("userquote", "userquote"),
                                          ("vaultbase", "vaultbase"), ("vaultquote", "vaultquote"),
                                          ("buyback", "buyback")):
                            deltas[name] = amount_at(after[roles[key]]["data_hex"]) - amount_at(before[roles[key]]["data_hex"])
                        assert deltas == obs["deltas"], (label, image, step_index, deltas)
                        assert trade_event_fields(ctx["step_name"], logs) == tuple(obs["event"]), (label, image, step_index)
                        assert pool_deltas(before[roles["pool"]]["data_hex"],
                                           after[roles["pool"]]["data_hex"]) == (-56, 56, 0)
                        assert obs["payer_paid"] == 1849400
                    elif ctx["step_name"] in ("deposit", "withdraw"):
                        assert r["error"] is None, (label, image, step_index, r["error"])
                        assert r["metadata"]["events"] == 1
                        deltas = {}
                        for name in ("userbase", "userquote", "userlp", "vaultbase", "vaultquote"):
                            deltas[name] = amount_at(after[roles[name]]["data_hex"]) - amount_at(before[roles[name]]["data_hex"])
                        assert deltas == obs["deltas"], (label, image, step_index, deltas)
                        assert obs["payer_paid"] == 5000
                    elif ctx["step_name"] == "create_pool":
                        assert r["error"] is None, (label, image, step_index, r["error"])
                        assert r["metadata"]["events"] == 1
                        assert create_event_fields(logs) == {
                            "disc": CREATE_DISC, "base_in": 100, "quote_in": 10200,
                            "pool_base": 100, "pool_quote": 10200, "min_liq": 100,
                            "init_liq": 1009, "lp_out": 909}, (label, image, step_index)
                        assert amount_at(after[roles["userlp"]]["data_hex"]) == 909
                        assert amount_at(after[roles["lp_mint"]]["data_hex"], 36) == 909
                        assert amount_at(after[roles["vaultbase"]]["data_hex"]) == 100
                        assert amount_at(after[roles["vaultquote"]]["data_hex"]) == 10200
                        assert obs["payer_paid"] == 10507640
                    else:
                        raise AssertionError((label, image, step_index, ctx))
        for key, s in obs_seen.items():
            assert len(s) == 1, (label, key, "images must agree", s)
    print("verify PASS: 26 cases x 3 images = 111 receipts, all checks passed")


if __name__ == "__main__":
    main()
