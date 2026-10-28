#!/usr/bin/env python3
"""Build research/amm-transfer-fee-bps-overflow-20261028 receipts.

Six cases x three images (original / #424 control / #427 candidate), all
fresh LiteSVM executions with normally signed transactions.

Fixture derivation (documented, reproducible):
- withdraw template: #427 packet case 170 (fee-1-max-0-amount-1000000)
- deposit template: #427 packet case 155 (fee-10000-max-u64max-amount-1000000)
- quote-mint TLV patched in account data (offset 166): older bps @258,
  newer bps @276, older max @250, newer max @268.
- payer: fresh deterministic keypair, seed byte 77. The template payer key is
  replaced everywhere it appears (tx account key 0, three token-account owner
  fields at data offset 32, one pool-authority field at data offset 8).
  The replacement payer is funded with 10**12 lamports in the before snapshot.
- clock: slot 100, epoch 0 (same as the #427 matrix).
"""
import base64
import gzip
import hashlib
import json
import struct
from pathlib import Path

from solders.account import Account
from solders.clock import Clock
from solders.instruction import AccountMeta, Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.message import Message
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

ROOT = Path.home() / "workspace/pumpfun-sparse"
PACKET427 = ROOT / "research/amm-transfer-fee-diagnostic-recovery"
OUT = Path(__file__).resolve().parent
AMM = Pubkey.from_string("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA")
TOKEN = Pubkey.from_string("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
TOKEN22 = Pubkey.from_string("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb")
MINT_KEY = "So11111111111111111111111111111111111111112"
PAYER_SEED = bytes([77]) * 32
PAYER_LAMPORTS = 10 ** 12

def _decompress(path):
    import gzip as _gzip
    out = Path("/tmp") / ("bps-overflow-" + path.name.replace(".gz", ""))
    if not out.exists():
        out.write_bytes(_gzip.decompress(path.read_bytes()))
    return out


IMAGES = {
    "original": ROOT / "evidence/original/pump_amm/deployed.so",
    "control": _decompress(ROOT / "research/amm-multi-hop-group-slice-recovery/artifacts/candidate.so.gz"),
    "candidate": _decompress(ROOT / "research/amm-transfer-fee-diagnostic-recovery/artifacts/candidate.so.gz"),
}
IMAGE_SHA = {
    "original": "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7",
    "control": "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3",
    "candidate": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}

CASES = [
    # (label, template_index, instruction, bps, max_fee, args, expected lines orig/control/cand or None)
    ("withdraw-bps-65535-amount-1000000", 170, "withdraw", 65535, 0xFFFFFFFFFFFFFFFF,
     [1_000_000, 0, 0], (57, 28, 57)),
    ("withdraw-bps-10001-amount-1000000", 170, "withdraw", 10001, 0xFFFFFFFFFFFFFFFF,
     [1_000_000, 0, 0], (57, 28, 57)),
    ("deposit-bps-65535-amount-1000000", 155, "deposit", 65535, 0xFFFFFFFFFFFFFFFF,
     [1_000_000, 0xFFFFFFFFFFFFFFFF, 0xFFFFFFFFFFFFFFFF], (67, 35, 67)),
    ("deposit-bps-10001-amount-1000000", 155, "deposit", 10001, 0xFFFFFFFFFFFFFFFF,
     [1_000_000, 0xFFFFFFFFFFFFFFFF, 0xFFFFFFFFFFFFFFFF], (67, 35, 67)),
    ("withdraw-bps-65535-amount-1-success", 170, "withdraw", 65535, 0xFFFFFFFFFFFFFFFF,
     [1, 0, 0], None),
    ("withdraw-bps-10001-amount-1-success", 170, "withdraw", 10001, 0xFFFFFFFFFFFFFFFF,
     [1, 0, 0], None),
]
DISC = {"withdraw": "b712469c946da122", "deposit": "f223c68952e1f2b6"}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_template(index):
    rep = json.loads(gzip.decompress((PACKET427 / "runtime/report.json.gz").read_bytes()))
    recs = [json.loads(l) for l in gzip.decompress(
        (PACKET427 / "runtime/raw-transactions.jsonl.gz").read_bytes()).splitlines()]
    return rep["cases"][index], recs[index * 3]


def diag_line(logs):
    for line in logs:
        if "transfer_fee.rs:" in line:
            return int(line.split("transfer_fee.rs:")[1].split(".")[0])
    return None


def build_case(label, template_idx, instruction, bps, max_fee, args, expected):
    case, rec = load_template(template_idx)
    assert case["case"]["instruction"] == instruction
    old_tx = Transaction.from_bytes(base64.b64decode(rec["transaction_base64"]))
    old_keys = [str(k) for k in old_tx.message.account_keys]
    old_payer = old_keys[0]
    kp = Keypair.from_seed(PAYER_SEED)
    new_keys = [kp.pubkey()] + [Pubkey.from_string(k) for k in old_keys[1:]]

    # Fixture accounts: patch mint TLV + old payer key occurrences.
    fixture = {}
    for key, acc in rec["before"].items():
        data = bytearray(bytes.fromhex(acc["data_hex"]))
        if key == MINT_KEY:
            assert data[166:168] == b"\x01\x00"
            for bps_off, max_off in ((258, 250), (276, 268)):
                data[bps_off:bps_off + 2] = struct.pack("<H", bps)
                data[max_off:max_off + 8] = struct.pack("<Q", max_fee)
        old_bytes = bytes(Pubkey.from_string(old_payer))
        start = 0
        while True:
            i = bytes(data).find(old_bytes, start)
            if i < 0:
                break
            data[i:i + 32] = bytes(kp.pubkey())
            start = i + 32
        fixture[key] = {"owner": acc["owner"], "lamports": acc["lamports"],
                        "executable": acc["executable"], "data_hex": data.hex()}
    fixture[str(kp.pubkey())] = {"owner": str(Pubkey.default()), "lamports": PAYER_LAMPORTS,
                                 "executable": False, "data_hex": ""}

    # Instruction metas from the template (signer: index 0; writable: 0..7).
    old_ix = old_tx.message.instructions[0]
    metas = [AccountMeta(new_keys[idx], idx == 0, idx <= 7) for idx in old_ix.accounts]
    data_bytes = bytes.fromhex(DISC[instruction]) + b"".join(struct.pack("<Q", a) for a in args)

    results = {}
    receipts = []
    for image_offset, image in enumerate(("original", "control", "candidate")):
        vm = LiteSVM().with_transaction_history(0)
        vm.add_program_from_file(AMM, str(IMAGES[image]))
        vm.add_program_from_file(TOKEN, str(ROOT / "evidence/dependencies/spl_token/deployed.so"))
        vm.add_program_from_file(TOKEN22, str(ROOT / "evidence/dependencies/spl_token_2022/deployed.so"))
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for key, acc in fixture.items():
            vm.set_account(Pubkey.from_string(key), Account(
                acc["lamports"], bytes.fromhex(acc["data_hex"]),
                Pubkey.from_string(acc["owner"])))
        tx = Transaction.new_signed_with_payer(
            [Instruction(AMM, data_bytes, metas)], kp.pubkey(), [kp], vm.latest_blockhash())
        raw = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = {}
        for key in fixture:
            got = vm.get_account(Pubkey.from_string(key))
            after[key] = {"owner": str(got.owner), "lamports": got.lamports,
                          "executable": got.executable, "data_hex": got.data.hex()}
        payer_after = after[str(kp.pubkey())]["lamports"]
        payer_before = PAYER_LAMPORTS
        err = str(r.err()) if failed else None
        logs = meta.logs()
        line = diag_line(logs)
        if expected is None:
            assert err is None and line is None, (label, image, err, line)
            rollback, fee = None, None
        else:
            want = dict(zip(("original", "control", "candidate"), expected))[image]
            assert line == want, (label, image, line, want)
            assert err is not None and "6023" in err, (label, image, err)
            assert payer_before - payer_after == 5000, (label, image, payer_before, payer_after)
            non_payer = {k: v for k, v in after.items() if k != str(kp.pubkey())}
            assert non_payer == {k: v for k, v in fixture.items() if k != str(kp.pubkey())}, \
                (label, image, "rollback mismatch")
            rollback, fee = True, 5000
        receipts.append({
            "sequence": case_index_global * 3 + image_offset, "vm": case_index_global * 3 + image_offset,
            "context": {"index": case_index_global, "image": image,
                        "instruction": instruction, "mint": "quote", "label": label},
            "transaction_base64": base64.b64encode(raw).decode(),
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw),
            "all_signatures_verified": True, "signature_fields": 1,
            "before": fixture, "after": after,
            "metadata": {"signature": str(meta.signature()), "logs": logs,
                         "inner_instructions": str(meta.inner_instructions()),
                         "compute_units_consumed": str(meta.compute_units_consumed()),
                         "return_data": str(meta.return_data())},
            "clock": {"slot": 100, "epoch_start_timestamp": 1234567890, "epoch": 0,
                      "leader_schedule_epoch": 0, "unix_timestamp": 1234567890},
            "loaded_programs": {
                str(AMM): {"path": "evidence/original/pump_amm/deployed.so",
                           "sha256": IMAGE_SHA[image]},
                str(TOKEN): {"path": "evidence/dependencies/spl_token/deployed.so",
                             "sha256": "8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697"},
                str(TOKEN22): {"path": "evidence/dependencies/spl_token_2022/deployed.so",
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"}},
            "error": err, "rollback_except_payer_fee": rollback, "payer_fee_lamports": fee,
        })
        results[image] = {"error": err, "logs": logs,
                          "accounts": {k: v for k, v in after.items()}}
        print(f"  {label} [{image}] error={err} diag_line={line}")
    return {"case": {"instruction": instruction, "mint": "quote", "label": label,
                     "bps": bps, "maximum_fee": max_fee, "amount": args[0],
                     "template": f"#427 matrix case {template_idx}"},
            **results}, receipts


receipts_global = []
case_index_global = 0
report_cases = []
for c in CASES:
    row, recs = build_case(*c)
    report_cases.append(row)
    receipts_global.extend(recs)
    case_index_global += 1

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
raw = b"\n".join(json.dumps(r).encode() for r in receipts_global) + b"\n"
(OUT / "runtime/raw-transactions.jsonl.gz").write_bytes(gzip.compress(raw, mtime=0))
report = {
    "scope": "Fresh normally signed original/control/candidate triples extending the #427 "
             "216-case matrix with transfer-fee basis points above the SPL-valid maximum "
             "(10000). The decoder accepts any u16 bps, so bps 10001 and 65535 reach the "
             "fee arithmetic and trigger the two diagnostics the 216-case matrix left "
             "untriggered (line 57) plus the line-67 path under malformed bps.",
    "fresh_vm_environment": "1",
    "image_sha256": IMAGE_SHA,
    "input_sha256": {
        "research/amm-transfer-fee-diagnostic-recovery/runtime/report.json.gz":
            sha((PACKET427 / "runtime/report.json.gz").read_bytes()),
        "research/amm-transfer-fee-diagnostic-recovery/runtime/raw-transactions.jsonl.gz":
            sha((PACKET427 / "runtime/raw-transactions.jsonl.gz").read_bytes()),
        "evidence/dependencies/spl_token/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token/deployed.so").read_bytes()),
        "evidence/dependencies/spl_token_2022/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token_2022/deployed.so").read_bytes()),
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"line-57-overflow": 2, "line-67-overflow": 2, "success": 2},
    "mismatches": [0, 1, 2, 3],
    "cases": report_cases,
    "transaction_receipts": {"path": "raw-transactions.jsonl.gz",
                             "sha256": sha((OUT / "runtime/raw-transactions.jsonl.gz").read_bytes())},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
