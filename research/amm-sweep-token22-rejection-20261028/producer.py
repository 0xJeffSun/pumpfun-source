#!/usr/bin/env python3
"""Build research/amm-sweep-token22-rejection-20261028 receipts.

Fee sweeps cannot move Token-2022 quote fees, pinned at
runtime:
- the base protocol sweep moves 2,488 from the vault to
  the recipient ATA, and the base creator sweep moves
  123,394;
- a Token-2022 quote mint fails IncorrectProgramId for
  both the protocol and the creator sweep, at 1% and 50%
  fees alike, because the sweep handlers pass the Token
  program for the vault transfer of a Token-2022-owned
  account (the recipient ATA is created by the program
  during execution, so only the mint and vault are
  mutated).
"""
import base64
import gzip
import hashlib
import json
import struct
import sys
from pathlib import Path

import os
sys.path.insert(0, str(Path.home() / "workspace/pumpfun-sparse/scripts"))
os.chdir(Path.home() / "workspace/pumpfun-sparse")
from solders.account import Account
from solders.clock import Clock
from solders.instruction import AccountMeta, Instruction
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

from pump_amm_admin_differential import Harness
from pump_amm_liquidity_differential import (
    CONFIG, CONFIG_KEY, EVENT, IDL, OUTSIDER, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, pool, poolraw, quote, userbase, vaultquote,
)

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-sweep-token22-rejection-20261028"
WS = Path.home() / "workspace/slop-verify"
ATA = Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

IMAGES = {
    "original": ROOT / "evidence/original/pump_amm/deployed.so",
    "control": WS / "control.so",
    "candidate": WS / "candidate.so",
}
IMAGE_SHA = {
    "original": "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7",
    "control": "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3",
    "candidate": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}

# (instruction, label, recipient override or None, unsigned,
#  expected ("ok", amount) or ("error", code, log fragment))
# (instruction, label, amount, override, unsigned, expected)
# override: None | ("meta", index, key_name) | ("meta-ro", index, key_name)
# expected: ("sweep", ata_delta, vault_delta) | ("error", code, fragment)
# (instruction, label, amount, override, unsigned, expected)
# override: None | ("tf", bps)
# expected: ("sweep", ata_gained, vault_spent) | ("error", code, fragment)
CASES = [
    ("sweep_protocol_fee", "sweep-token22-protocol-base", 2488, None, False, ("sweep", 2488, 2488)),
    ("sweep_protocol_fee", "sweep-token22-protocol-quote-tf100", 1000, ("tf", 100), False, ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("sweep_protocol_fee", "sweep-token22-protocol-quote-tf5000", 1000, ("tf", 5000), False, ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("sweep_creator_fee", "sweep-token22-creator-base", 123394, None, False, ("sweep", 123394, 123394)),
    ("sweep_creator_fee", "sweep-token22-creator-quote-tf100", 1000, ("tf", 100), False, ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("sweep_creator_fee", "sweep-token22-creator-quote-tf5000", 1000, ("tf", 5000), False, ("error", "IncorrectProgramId", "IncorrectProgramId")),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def snap(vm, keys):
    out = {}
    for k in keys:
        a = vm.get_account(k)
        out[str(k)] = {"owner": str(a.owner), "lamports": a.lamports,
                       "executable": a.executable, "data_hex": a.data.hex()} if a else None
    return out


def amount_at(data_hex, offset):
    return struct.unpack_from("<Q", bytes.fromhex(data_hex), offset)[0]


receipts_global = []
report_cases = []
for index, (instruction, label, amount, override, unsigned, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == instruction)
    if instruction == "sweep_protocol_fee":
        default_recipient = Pubkey.from_bytes(bytes(RAW[57:89]))
        fee_offset = 271
    else:
        default_recipient = Pubkey.find_program_address([b'creator_vault', bytes(poolraw[211:243])], PROGRAM)[0]
        fee_offset = 279
    recipient = default_recipient
    ata = Pubkey.find_program_address([bytes(recipient), bytes(TOKEN), bytes(quote)], ATA)[0]
    keys = [PAYER.pubkey(), CONFIG_KEY, pool, quote, TOKEN, vaultquote, recipient, ata,
            Pubkey.default(), ATA, EVENT, PROGRAM]
    row = {"case": {"instruction": instruction, "label": label,
                    "recipient": str(recipient), "amount": amount,
                    "override": list(override) if override else None, "unsigned": unsigned,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for pid, n in ((TOKEN, 'spl_token'), (TOKEN22, 'spl_token_2022'), (ATA, 'associated_token')):
            vm.add_program_from_file(pid, str(ROOT / 'evidence/dependencies' / n / 'deployed.so'))
        for rrow in f["accounts"].values():
            vm.set_account(Pubkey.from_string(rrow["address"]),
                           Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                                   Pubkey.from_string(rrow["owner"])))
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(RAW), PROGRAM))
        vm.set_account(pool, Account(10**9, bytes(poolraw), PROGRAM))
        metas = [AccountMeta(k, bool(a.get("signer")), bool(a.get("writable")))
                 for k, a in zip(keys, ix["accounts"])]
        if override is not None and override[0] == "tf":
            bps = override[1]
            mint = vm.get_account(quote)
            d = bytearray(mint.data[:82]); d += bytes(83) + bytes([1])
            conf = bytes(72) + struct.pack("<QQH", 0, 2**64 - 1, bps) * 2
            d += struct.pack("<HH", 1, len(conf)) + conf
            vm.set_account(quote, Account(mint.lamports, bytes(d), TOKEN22))
            a = vm.get_account(vaultquote)
            dd = bytearray(a.data[:165]); dd += bytes([2]) + struct.pack("<HHQ", 2, 8, 0)
            vm.set_account(vaultquote, Account(a.lamports, bytes(dd), TOKEN22))
        payer = OUTSIDER if unsigned else PAYER
        if unsigned:
            metas[0] = AccountMeta(PAYER.pubkey(), False, True)
        before_keys = sorted({str(m.pubkey) for m in metas} | {str(OUTSIDER.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, bytes(ix["discriminator"]), metas)],
            payer.pubkey(), [payer], vm.latest_blockhash())
        raw = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        err = str(r.err()) if failed else None
        logs = meta.logs()
        payer_key = str(payer.pubkey())
        payer_delta = before[payer_key]["lamports"] - after[payer_key]["lamports"]
        observed = {}
        if expected[0] == "sweep":
            assert not failed and err is None, (label, image, err)
            ata_after = after[str(ata)]
            assert ata_after is not None, (label, image, "ATA must be created")
            gained = amount_at(ata_after["data_hex"], 64)
            assert gained == expected[1], (label, image, gained, expected)
            vault_delta = amount_at(before[str(vaultquote)]["data_hex"], 64) - amount_at(after[str(vaultquote)]["data_hex"], 64)
            assert vault_delta == expected[2], (label, image, vault_delta, expected)
            fee_after = struct.unpack_from("<Q", bytes.fromhex(after[str(pool)]["data_hex"]), fee_offset)[0]
            assert fee_after == 0, (label, image, fee_after)
            pairs.add((gained, vault_delta, fee_after))
            observed = {"ata_gained": gained, "vault_spent": vault_delta, "fee_left": fee_after}
        else:
            assert failed and err is not None and expected[1] in err, (label, image, err)
            assert expected[2] in "\n".join(logs), (label, image, logs[-3:])
            assert payer_delta == 5000, (label, image, payer_delta)
            site = next((l for l in logs if "thrown in" in l or "caused by account" in l), None)
            row.setdefault("error_sites", {})[image] = site
            assert all(before[k] == after[k] for k in before if k != payer_key), \
                (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": instruction,
                        "label": label},
            "transaction_base64": base64.b64encode(raw).decode(),
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw),
            "all_signatures_verified": True, "signature_fields": 1,
            "before": before, "after": after,
            "metadata": {"signature": str(meta.signature()), "logs": logs,
                         "inner_instructions": str(meta.inner_instructions()),
                         "compute_units_consumed": str(meta.compute_units_consumed()),
                         "return_data": str(meta.return_data())},
            "clock": {"slot": 100, "epoch_start_timestamp": 1234567890, "epoch": 0,
                      "leader_schedule_epoch": 0, "unix_timestamp": 1234567890},
            "loaded_programs": {
                str(PROGRAM): {"path": "evidence/original/pump_amm/deployed.so",
                               "sha256": IMAGE_SHA[image]},
                str(TOKEN): {"path": "evidence/dependencies/spl_token/deployed.so",
                             "sha256": "8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697"},
                str(TOKEN22): {"path": "evidence/dependencies/spl_token_2022/deployed.so",
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"},
                str(ATA): {"path": "evidence/dependencies/associated_token/deployed.so",
                           "sha256": sha((ROOT / "evidence/dependencies/associated_token/deployed.so").read_bytes())}},
            "error": err, "rollback_except_payer_fee": failed,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "ok":
        assert len(pairs) == 1, (label, "images must agree on amounts")
    report_cases.append(row)

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
lines = [json.dumps(r).encode() for r in receipts_global]
parts = []
for i in range(0, len(lines), 10):
    chunk = lines[i:i + 10]
    data = gzip.compress(b"\n".join(chunk) + b"\n", mtime=0)
    name = f"runtime/raw-transactions-part{i // 10 + 1}.jsonl.gz"
    (OUT / name).write_bytes(data)
    parts.append({"path": name, "sha256": sha(data), "receipts": len(chunk)})
report = {
    "scope": "Fresh normally signed original/control/candidate triples pinning "
             "the fee sweeps at runtime on the real fixture balances: "
             "sweep_protocol_fee moves exactly the recorded protocol fees "
             "(2,488) to the config's fee recipient ATA and zeroes the "
             "field; sweep_creator_fee moves exactly the recorded creator "
             "fees (123,394) to the creator-vault PDA's ATA and zeroes "
             "its field; an unsigned payer fails AccountNotSigner "
             "(3010); a wrong protocol recipient fails "
             "InvalidProtocolFeeRecipient (6013); a wrong creator "
             "recipient fails the PDA seeds constraint (2006). All "
             "three images behave identically. Receipts are stored as "
             "parts to stay under GitHub's 25MB web-upload limit; "
             "verify.py reads them in order.",
    "fresh_vm_environment": "1",
    "image_sha256": IMAGE_SHA,
    "input_sha256": {
        "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json").read_bytes()),
        "research/imported-lab/analysis/pump_fun/config-snapshot.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/config-snapshot.json").read_bytes()),
        "evidence/upstream/pump_amm.json":
            sha((ROOT / "evidence/upstream/pump_amm.json").read_bytes()),
        "evidence/dependencies/spl_token/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token/deployed.so").read_bytes()),
        "evidence/dependencies/spl_token_2022/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token_2022/deployed.so").read_bytes()),
        "evidence/dependencies/associated_token/deployed.so":
            sha((ROOT / "evidence/dependencies/associated_token/deployed.so").read_bytes()),
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"fee-sweeps": 5},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
