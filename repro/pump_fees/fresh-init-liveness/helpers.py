"""Disposable local-only helpers for the original Pump Fees initializer replay."""
import base64
import hashlib
import re
import struct
from pathlib import Path
from solders.account import Account
from solders.instruction import AccountMeta, Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

ROOT = Path(__file__).resolve().parents[3]
IDL = ROOT / "evidence/upstream/pump_fees.json"
ELF = ROOT / "evidence/original/pump_fees/deployed.so"
PROGRAM = Pubkey.from_string("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ")
PUMP = Pubkey.from_string("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P")
PUMP_AMM = Pubkey.from_string("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA")
PAYER = Keypair.from_seed(bytes([218]) * 32)
ADMIN = Keypair.from_seed(bytes([219]) * 32)
OUTSIDER = Keypair.from_seed(bytes([220]) * 32)
REFERENCE_SHA = "4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e"

def sha(data):
    return hashlib.sha256(data).hexdigest()


def tier_counts(data):
    assert bytes(data[:8]) == bytes([143, 52, 146, 187, 219, 123, 76, 155])
    regular = struct.unpack_from("<I", data, 65)[0]
    stable_offset = 69 + regular * 40
    assert stable_offset + 4 <= len(data)
    stable = struct.unpack_from("<I", data, stable_offset)[0]
    assert stable_offset + 4 + stable * 40 + 24 <= len(data)
    return {"regular": regular, "stable": stable}


def encode_tiers(rows):
    data = bytearray(struct.pack("<I", len(rows)))
    for threshold, lp, protocol, creator in rows:
        data += struct.pack("<QQQQQ", threshold & ((1 << 64) - 1),
                            threshold >> 64, lp, protocol, creator)
    return bytes(data)


def execute(vm, idl_instructions, config_address, name, rows=(), *,
            signer=ADMIN, meta_signer=True, offset=0, config_program_id=PUMP,
            include_tx=False):
    ix_def = idl_instructions[name]
    data = bytes(ix_def["discriminator"])
    if name in ("update_fee_config", "update_stable_fee_config",
                "upsert_fee_tiers", "upsert_stable_fee_tiers"):
        data += encode_tiers(rows)
        if name == "update_fee_config":
            data += struct.pack("<QQQ", 0, 95, 30)
        if name.startswith("upsert_"):
            data += bytes([offset])
        metas = [AccountMeta(config_address, False, True),
                 AccountMeta(signer.pubkey(), meta_signer, False),
                 AccountMeta(config_program_id, False, False),
                 AccountMeta(Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0], False, False),
                 AccountMeta(PROGRAM, False, False)]
    elif name == "initialize_fee_config":
        metas = [AccountMeta(signer.pubkey(), meta_signer, True),
                 AccountMeta(config_address, False, True),
                 AccountMeta(Pubkey.default(), False, False),
                 AccountMeta(config_program_id, False, False),
                 AccountMeta(Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0], False, False),
                 AccountMeta(PROGRAM, False, False)]
    elif name == "set_exotic_flat_fees":
        data += struct.pack("<QQQ", 1, 94, 30)
        metas = [AccountMeta(config_address, False, True),
                 AccountMeta(signer.pubkey(), meta_signer, True),
                 AccountMeta(config_program_id, False, False),
                 AccountMeta(Pubkey.default(), False, False),
                 AccountMeta(Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0], False, False),
                 AccountMeta(PROGRAM, False, False)]
    elif name == "update_admin":
        metas = [AccountMeta(signer.pubkey(), meta_signer, False),
                 AccountMeta(config_address, False, True),
                 AccountMeta(OUTSIDER.pubkey(), False, False),
                 AccountMeta(config_program_id, False, False),
                 AccountMeta(Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0], False, False),
                 AccountMeta(PROGRAM, False, False)]
    elif name == "extend_fee_config":
        metas = [AccountMeta(config_address, False, True),
                 AccountMeta(signer.pubkey(), meta_signer, False),
                 AccountMeta(config_program_id, False, False),
                 AccountMeta(Pubkey.default(), False, False),
                 AccountMeta(Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0], False, False),
                 AccountMeta(PROGRAM, False, False)]
    else:
        raise ValueError(name)
    before = vm.get_account(config_address)
    tx = Transaction.new_signed_with_payer(
        [Instruction(PROGRAM, data, metas)], PAYER.pubkey(),
        [PAYER, signer] if meta_signer and signer != PAYER else [PAYER],
        vm.latest_blockhash())
    assert all(tx.verify_with_results())
    result = vm.send_transaction(tx)
    failed = isinstance(result, FailedTransactionMetadata)
    meta = result.meta() if failed else result
    error = str(result.err()) if failed else None
    custom = re.search(r"InstructionErrorCustom\((\d+)\)", error or "")
    after = vm.get_account(config_address)
    before_bytes = bytes(before.data) if before else None
    after_bytes = bytes(after.data) if after else None
    assert not failed or before_bytes == after_bytes, "failed transaction changed FeeConfig"
    assert not failed or (before.lamports if before else None) == (after.lamports if after else None)
    receipt = {
        "instruction": name, "signed_transaction": True,
        "config_program_id": str(config_program_id),
        "authority": "admin" if signer == ADMIN else "outsider",
        "authority_meta_signer": meta_signer,
        "input_tiers": len(rows) if name != "initialize_fee_config" else None,
        "offset": offset if name.startswith("upsert_") else None,
        "error": int(custom.group(1)) if custom else error,
        "signature": str(meta.signature()),
        "before_sha256": sha(before_bytes) if before_bytes is not None else None,
        "after_sha256": sha(after_bytes) if after_bytes is not None else None,
        "before_lamports": before.lamports if before else None,
        "after_lamports": after.lamports if after else None,
        "before_bytes": len(before_bytes) if before_bytes is not None else None,
        "after_bytes": len(after_bytes) if after_bytes is not None else None,
        "before_admin": str(Pubkey.from_bytes(before_bytes[9:41])) if before_bytes else None,
        "after_admin": str(Pubkey.from_bytes(after_bytes[9:41])) if after_bytes else None,
        "before_tiers": tier_counts(before_bytes) if before_bytes else None,
        "after_tiers": tier_counts(after_bytes) if after_bytes else None,
        "changed_offsets": [i for i, (a, b) in enumerate(zip(before_bytes, after_bytes)) if a != b]
                           if before_bytes and after_bytes else None,
        "compute_units": meta.compute_units_consumed(),
        "logs": list(meta.logs()) if failed or include_tx else [],
    }
    if include_tx:
        receipt["transaction_base64"] = base64.b64encode(bytes(tx)).decode()
    return receipt
