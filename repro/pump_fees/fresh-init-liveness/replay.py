"""Probe a freshly initialized Pump FeeConfig using the pinned original ELF.

The fixed admin key is unavailable. Only the initializer uses disabled local
signature verification; it is an explicitly unsigned privilege simulation.
Each subsequent fee query is a fully signed transaction in a fresh isolated
LiteSVM. The later admin updates locally substitute a disposable stored admin.
No RPC, mainnet transaction, or real funds are used by this script.
"""

import base64
import hashlib
import json
from pathlib import Path

from solders.account import Account
from solders.instruction import AccountMeta, Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.message import Message
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

from helpers import (
    ADMIN, ELF, IDL, PAYER, PROGRAM, PUMP, REFERENCE_SHA,
    execute, sha, tier_counts,
)


ROOT = Path(__file__).resolve().parents[3]
FOLDER = ROOT / "repro/pump_fees/fresh-init-liveness"
LIVE = FOLDER / "live-finalized-configs.json"
HEADERS = FOLDER / "programdata-head-check.json"
OUT = FOLDER / "offline-init-and-query.json"
WSOL = Pubkey.from_string("So11111111111111111111111111111111111111112")
USDC = Pubkey.from_string("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
EXTEND_USER = Keypair.from_seed(bytes([232]) * 32)


def query(config_address, account, selector, *, pool, stable=False,
          quote_mint=None, name=""):
    vm = LiteSVM().with_sigverify(True).with_blockhash_check(False)
    vm.airdrop(PAYER.pubkey(), 10**9)
    vm.add_program_from_file(PROGRAM, str(ELF))
    vm.set_account(config_address, Account(account.lamports, bytes(account.data), PROGRAM))
    data = selector + bytes([int(pool)]) + (1).to_bytes(16, "little")
    if quote_mint is None:
        data += (1).to_bytes(8, "little") + bytes([int(stable)])
    else:
        data += bytes(quote_mint)
    tx = Transaction.new_signed_with_payer(
        [Instruction(PROGRAM, data, [AccountMeta(config_address, False, False),
                                     AccountMeta(PUMP, False, False)])],
        PAYER.pubkey(), [PAYER], vm.latest_blockhash())
    assert all(tx.verify_with_results())
    before = vm.get_account(config_address)
    result = vm.send_transaction(tx)
    failed = isinstance(result, FailedTransactionMetadata)
    meta = result.meta() if failed else result
    after = vm.get_account(config_address)
    assert before is not None and after is not None
    assert bytes(before.data) == bytes(after.data) and before.lamports == after.lamports
    return {"name": name, "pool": pool, "stable": stable if quote_mint is None else None,
            "quote_mint": str(quote_mint) if quote_mint is not None else None,
            "fully_signed": True,
            "transaction_base64": base64.b64encode(bytes(tx)).decode(),
            "error": str(result.err()) if failed else None,
            "return_data_hex": bytes(meta.return_data().data).hex(),
            "logs": list(meta.logs()),
            "fee_config_data_sha256": sha(bytes(after.data)),
            "fee_config_tiers": tier_counts(bytes(after.data)),
            "fee_config_unchanged": True}


def extend(config_address, account, selector, *, user_writable):
    vm = LiteSVM().with_sigverify(True).with_blockhash_check(False)
    vm.airdrop(PAYER.pubkey(), 10**10)
    vm.airdrop(EXTEND_USER.pubkey(), 10**10)
    vm.add_program_from_file(PROGRAM, str(ELF))
    vm.set_account(config_address, Account(account.lamports, bytes(account.data), PROGRAM))
    event = Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0]
    tx = Transaction.new_signed_with_payer([
        Instruction(PROGRAM, selector, [
            AccountMeta(config_address, False, True),
            AccountMeta(EXTEND_USER.pubkey(), True, user_writable),
            AccountMeta(PUMP, False, False),
            AccountMeta(Pubkey.default(), False, False),
            AccountMeta(event, False, False),
            AccountMeta(PROGRAM, False, False),
        ])], PAYER.pubkey(), [PAYER, EXTEND_USER], vm.latest_blockhash())
    assert all(tx.verify_with_results())
    result = vm.send_transaction(tx)
    failed = isinstance(result, FailedTransactionMetadata)
    meta = result.meta() if failed else result
    after = vm.get_account(config_address)
    assert after is not None
    if failed:
        assert bytes(after.data) == bytes(account.data)
        assert after.lamports == account.lamports
    return {"user_writable": user_writable, "fully_signed": True,
            "transaction_base64": base64.b64encode(bytes(tx)).decode(),
            "error": str(result.err()) if failed else None,
            "before_bytes": len(account.data), "after_bytes": len(after.data),
            "before_lamports": account.lamports, "after_lamports": after.lamports,
            "before_data_sha256": sha(bytes(account.data)),
            "after_data_sha256": sha(bytes(after.data)),
            "before_tiers": tier_counts(bytes(account.data)),
            "after_tiers": tier_counts(bytes(after.data)),
            "logs": list(meta.logs())}, after


def main():
    assert sha(ELF.read_bytes()) == REFERENCE_SHA
    idl_raw = IDL.read_bytes()
    idl = json.loads(idl_raw)
    assert idl["address"] == str(PROGRAM)
    instructions = {row["name"]: row for row in idl["instructions"]}
    extend_user = next(row for row in instructions["extend_fee_config"]["accounts"]
                       if row["name"] == "user")
    assert extend_user.get("signer") is True
    assert extend_user.get("writable", False) is False
    fixed_admin = Pubkey.from_string(next(
        row["address"] for row in instructions["initialize_fee_config"]["accounts"]
        if row["name"] == "admin"))
    config_address, bump = Pubkey.find_program_address(
        [b"fee_config", bytes(PUMP)], PROGRAM)
    event_authority = Pubkey.find_program_address([b"__event_authority"], PROGRAM)[0]

    # A valid disposable signature cannot pass the fixed-admin address guard.
    denied_vm = LiteSVM().with_sigverify(True).with_blockhash_check(False)
    denied_vm.airdrop(PAYER.pubkey(), 10**10)
    denied_vm.airdrop(ADMIN.pubkey(), 10**10)
    denied_vm.add_program_from_file(PROGRAM, str(ELF))
    denied = execute(denied_vm, instructions, config_address,
                     "initialize_fee_config", include_tx=True)
    assert denied["error"] == 6001 and denied["after_sha256"] is None

    # Deliberately unsigned fixed-admin simulation, in a local VM only.
    init_vm = LiteSVM().with_sigverify(False).with_blockhash_check(False)
    init_vm.airdrop(PAYER.pubkey(), 10**10)
    init_vm.airdrop(fixed_admin, 10**10)
    init_vm.add_program_from_file(PROGRAM, str(ELF))
    init_ix = Instruction(PROGRAM,
        bytes(instructions["initialize_fee_config"]["discriminator"]), [
            AccountMeta(fixed_admin, True, True),
            AccountMeta(config_address, False, True),
            AccountMeta(Pubkey.default(), False, False),
            AccountMeta(PUMP, False, False),
            AccountMeta(event_authority, False, False),
            AccountMeta(PROGRAM, False, False),
        ])
    message = Message.new_with_blockhash(
        [init_ix], PAYER.pubkey(), init_vm.latest_blockhash())
    init_tx = Transaction.new_unsigned(message)
    init_tx.partial_sign([PAYER], message.recent_blockhash)
    assert list(init_tx.verify_with_results()) == [True, False]
    assert init_vm.get_account(config_address) is None
    init_result = init_vm.send_transaction(init_tx)
    assert not isinstance(init_result, FailedTransactionMetadata)
    initialized = init_vm.get_account(config_address)
    assert initialized is not None and initialized.owner == PROGRAM
    initialized_raw = bytes(initialized.data)
    assert len(initialized_raw) == 2512 and initialized_raw[8] == bump
    assert Pubkey.from_bytes(initialized_raw[9:41]) == fixed_admin
    assert tier_counts(initialized_raw) == {"regular": 0, "stable": 0}

    get_fees = bytes(instructions["get_fees"]["discriminator"])
    with_quote = bytes(instructions["get_fees_with_quote_mint"]["discriminator"])
    initial_queries = [
        query(config_address, initialized, get_fees, pool=False, name="non_pool_control"),
        query(config_address, initialized, get_fees, pool=True, name="regular"),
        query(config_address, initialized, get_fees, pool=True, stable=True,
              name="stable"),
        query(config_address, initialized, with_quote, pool=True,
              quote_mint=WSOL, name="wsol"),
        query(config_address, initialized, with_quote, pool=True,
              quote_mint=USDC, name="usdc"),
    ]
    assert initial_queries[0]["error"] is None
    assert initial_queries[0]["return_data_hex"] == "00" * 24
    for row in initial_queries[1:]:
        assert "ProgramFailedToComplete" in row["error"], row
        assert any("panicked at pump-fees-math/src/lib.rs:49:23" in log
                   for log in row["logs"]), row

    # Only the stored admin bytes are changed locally to permit signed updates.
    substituted = bytearray(initialized_raw)
    substituted[9:41] = bytes(ADMIN.pubkey())
    update_vm = LiteSVM().with_sigverify(True).with_blockhash_check(False)
    update_vm.airdrop(PAYER.pubkey(), 10**10)
    update_vm.airdrop(ADMIN.pubkey(), 10**10)
    update_vm.add_program_from_file(PROGRAM, str(ELF))
    update_vm.set_account(config_address,
                          Account(initialized.lamports, bytes(substituted), PROGRAM))
    one_tier = ((10_000_000_000, 0, 95, 30),)
    regular_update = execute(update_vm, instructions, config_address,
                             "update_fee_config", one_tier, include_tx=True)
    assert regular_update["error"] is None
    assert regular_update["after_tiers"] == {"regular": 1, "stable": 0}
    regular_only = update_vm.get_account(config_address)
    after_regular = [
        query(config_address, regular_only, get_fees, pool=True,
              name="regular_after_regular_update"),
        query(config_address, regular_only, get_fees, pool=True, stable=True,
              name="stable_after_regular_update"),
    ]
    assert after_regular[0]["error"] is None
    assert "ProgramFailedToComplete" in after_regular[1]["error"]

    stable_update = execute(update_vm, instructions, config_address,
                            "update_stable_fee_config", one_tier, include_tx=True)
    assert stable_update["error"] is None
    assert stable_update["after_tiers"] == {"regular": 1, "stable": 1}
    fully_configured = update_vm.get_account(config_address)
    after_both = [
        query(config_address, fully_configured, get_fees, pool=True,
              name="regular_after_unextended_updates"),
        query(config_address, fully_configured, get_fees, pool=True, stable=True,
              name="stable_after_unextended_updates"),
    ]
    assert after_both[0]["error"] is None
    assert "ProgramFailedToComplete" in after_both[1]["error"]

    extend_selector = bytes(instructions["extend_fee_config"]["discriminator"])
    idl_extend, unchanged = extend(config_address, fully_configured,
                                   extend_selector, user_writable=False)
    assert "PrivilegeEscalation" in idl_extend["error"]
    assert unchanged.data == fully_configured.data
    writable_extend, extended = extend(config_address, fully_configured,
                                       extend_selector, user_writable=True)
    assert writable_extend["error"] is None
    assert writable_extend["before_bytes"] == 2512
    assert writable_extend["after_bytes"] == 4097
    assert writable_extend["after_tiers"] == {"regular": 1, "stable": 1}
    after_extend = [
        query(config_address, extended, get_fees, pool=True,
              name="regular_after_writable_extension"),
        query(config_address, extended, get_fees, pool=True, stable=True,
              name="stable_after_writable_extension"),
    ]
    assert all(row["error"] is None for row in after_extend)

    # The separately captured finalized accounts remain nonempty at that slot.
    live_raw = LIVE.read_bytes()
    live = json.loads(live_raw)
    assert len(live["accounts"]) == 2
    assert all(row["tiers"]["regular"] > 0 and row["tiers"]["stable"] > 0
               for row in live["accounts"])
    for row in live["accounts"]:
        data = base64.b64decode(row["data_base64"], validate=True)
        assert sha(data) == row["data_sha256"]
        assert tier_counts(data) == row["tiers"]
    headers_raw = HEADERS.read_bytes()
    headers = json.loads(headers_raw)
    assert all(row["matches_pinned_deploy_slot"] for row in headers["programs"])
    assert any(row["program"] == str(PROGRAM) and
               row["pinned_payload_sha256"] == REFERENCE_SHA
               for row in headers["programs"])
    assert headers["rpc_context_slot"] == live["rpc_context_slot"]

    result = {
        "scope": "Captured original Pump Fees ELF. Fresh initializer is an unsigned fixed-admin privilege simulation in LiteSVM with signature verification disabled; all fee queries are independently fully signed in signature-verifying local VMs. Later signed admin updates substitute only the stored admin key locally. No public transaction or real funds.",
        "program_sha256": REFERENCE_SHA,
        "idl_sha256": sha(idl_raw),
        "live_snapshot_sha256": sha(live_raw),
        "programdata_header_receipt_sha256": sha(headers_raw),
        "live_finalized_slot": live["rpc_context_slot"],
        "programdata_last_deploy_slot": next(
            row["last_deploy_slot"] for row in headers["programs"]
            if row["program"] == str(PROGRAM)),
        "fee_config_address": str(config_address),
        "official_idl_extend_user_writable": False,
        "fixed_admin": str(fixed_admin),
        "disposable_admin": str(ADMIN.pubkey()),
        "signed_disposable_admin_control": denied,
        "unsigned_fixed_admin_initializer": {
            "signature_verification_enabled": False,
            "required_signatures_valid": [True, False],
            "transaction_base64": base64.b64encode(bytes(init_tx)).decode(),
            "initialized_data_sha256": sha(initialized_raw),
            "initialized_data_base64": base64.b64encode(initialized_raw).decode(),
            "initialized_lamports": initialized.lamports,
            "initialized_bytes": len(initialized_raw),
            "tier_counts": tier_counts(initialized_raw),
            "logs": list(init_result.logs()),
        },
        "initial_signed_queries": initial_queries,
        "local_admin_substitution_updates": [regular_update, stable_update],
        "signed_queries_after_regular_update": after_regular,
        "signed_queries_after_unextended_updates": after_both,
        "idl_readonly_user_extension": idl_extend,
        "writable_user_extension": writable_extend,
        "signed_queries_after_writable_extension": after_extend,
        "assessment": "Fresh authorized initialization creates a 2,512-byte FeeConfig with zero regular and stable tiers, so pool fee queries panic. Signed updates can encode both vectors, but the stable query still ignores its vector on the legacy-size account. A signed extension to 4,097 bytes makes both queries succeed; the official IDL marks the funding user read-only, which causes writable privilege escalation unless the caller overrides that meta. This is a conditional setup liveness and client-integration hazard, not evidence of current user-fund loss: both captured live configs are extended and nonempty, the live initializer requires a fixed privileged admin, and tested empty updates reject.",
    }
    OUT.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"init_tiers": result["unsigned_fixed_admin_initializer"]["tier_counts"],
                      "initial_query_errors": [row["error"] is not None
                                               for row in initial_queries],
                      "regular_only_errors": [row["error"] is not None
                                              for row in after_regular],
                      "unextended_errors": [row["error"] is not None
                                            for row in after_both],
                      "extend_idl_error": idl_extend["error"],
                      "extend_writable_error": writable_extend["error"],
                      "extended_errors": [row["error"] is not None
                                          for row in after_extend],
                      "live_tiers": {row["program"]: row["tiers"]
                                     for row in live["accounts"]}}))


if __name__ == "__main__":
    main()
