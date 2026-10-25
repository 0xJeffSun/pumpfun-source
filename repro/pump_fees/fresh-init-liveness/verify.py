"""Read-only integrity and signature checks for the FeeConfig liveness receipt."""

import base64
import hashlib
import json
import struct
import sys
from pathlib import Path

from solders.pubkey import Pubkey
from solders.transaction import Transaction


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(HERE))
from helpers import tier_counts  # noqa: E402


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def signed(raw_base64, *, expected):
    tx = Transaction.from_bytes(base64.b64decode(raw_base64, validate=True))
    flags = list(tx.verify_with_results())
    assert flags == expected, flags
    return len(flags)


def main():
    expected_files = json.loads((HERE / "manifest-sha256.json").read_text())
    actual_files = {path.name: sha(path.read_bytes()) for path in HERE.iterdir()
                    if path.is_file() and path.name != "manifest-sha256.json"}
    assert actual_files == expected_files
    receipt = json.loads((HERE / "offline-init-and-query.json").read_text())
    assert sha((ROOT / "evidence/original/pump_fees/deployed.so").read_bytes()) == receipt["program_sha256"]
    idl_raw = (ROOT / "evidence/upstream/pump_fees.json").read_bytes()
    assert sha(idl_raw) == receipt["idl_sha256"]
    idl = json.loads(idl_raw)
    program = Pubkey.from_string(idl["address"])
    pump = Pubkey.from_string("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P")
    config = Pubkey.find_program_address([b"fee_config", bytes(pump)], program)[0]
    assert str(config) == receipt["fee_config_address"]
    init_def = next(row for row in idl["instructions"]
                    if row["name"] == "initialize_fee_config")
    assert next(row["address"] for row in init_def["accounts"]
                if row["name"] == "admin") == receipt["fixed_admin"]
    extend_def = next(row for row in idl["instructions"]
                      if row["name"] == "extend_fee_config")
    user_meta = next(row for row in extend_def["accounts"]
                     if row["name"] == "user")
    assert user_meta.get("signer") and not user_meta.get("writable", False)
    assert receipt["official_idl_extend_user_writable"] is False

    live_raw = (HERE / "live-finalized-configs.json").read_bytes()
    headers_raw = (HERE / "programdata-head-check.json").read_bytes()
    assert sha(live_raw) == receipt["live_snapshot_sha256"]
    assert sha(headers_raw) == receipt["programdata_header_receipt_sha256"]
    live = json.loads(live_raw)
    headers = json.loads(headers_raw)
    assert live["rpc_context_slot"] == headers["rpc_context_slot"] == receipt["live_finalized_slot"]
    assert len(live["accounts"]) == 2
    for row in live["accounts"]:
        data = base64.b64decode(row["data_base64"], validate=True)
        assert sha(data) == row["data_sha256"] and len(data) == row["data_bytes"] == 4097
        assert tier_counts(data) == row["tiers"]
        assert row["owner"] == str(program)
        assert min(row["tiers"].values()) > 0
    fee_head = next(row for row in headers["programs"]
                    if row["program"] == str(program))
    assert fee_head["matches_pinned_deploy_slot"]
    assert fee_head["last_deploy_slot"] == receipt["programdata_last_deploy_slot"]
    assert fee_head["pinned_payload_sha256"] == receipt["program_sha256"]

    init = receipt["unsigned_fixed_admin_initializer"]
    assert init["signature_verification_enabled"] is False
    assert init["required_signatures_valid"] == [True, False]
    assert signed(init["transaction_base64"], expected=[True, False]) == 2
    data = base64.b64decode(init["initialized_data_base64"], validate=True)
    assert sha(data) == init["initialized_data_sha256"]
    assert len(data) == init["initialized_bytes"] == 2512
    assert tier_counts(data) == init["tier_counts"] == {"regular": 0, "stable": 0}
    assert str(Pubkey.from_bytes(data[9:41])) == receipt["fixed_admin"]

    verified = 0
    denied = receipt["signed_disposable_admin_control"]
    assert denied["error"] == 6001 and denied["after_sha256"] is None
    verified += signed(denied["transaction_base64"], expected=[True, True])
    query_groups = ["initial_signed_queries", "signed_queries_after_regular_update",
                    "signed_queries_after_unextended_updates",
                    "signed_queries_after_writable_extension"]
    for group in query_groups:
        for row in receipt[group]:
            assert row["fully_signed"] and row["fee_config_unchanged"]
            verified += signed(row["transaction_base64"], expected=[True])
    initial = receipt["initial_signed_queries"]
    assert len(initial) == 5 and initial[0]["error"] is None
    assert initial[0]["return_data_hex"] == "00" * 24
    for row in initial[1:]:
        assert "ProgramFailedToComplete" in row["error"]
        assert any("panicked at pump-fees-math/src/lib.rs:49:23" in log
                   for log in row["logs"])
    assert all(row["fee_config_data_sha256"] == init["initialized_data_sha256"]
               for row in initial)
    updates = receipt["local_admin_substitution_updates"]
    assert len(updates) == 2
    assert updates[0]["before_tiers"] == {"regular": 0, "stable": 0}
    assert updates[0]["after_tiers"] == {"regular": 1, "stable": 0}
    assert updates[1]["after_tiers"] == {"regular": 1, "stable": 1}
    for row in updates:
        assert row["signed_transaction"] and row["error"] is None
        verified += signed(row["transaction_base64"], expected=[True, True])
    regular_only = receipt["signed_queries_after_regular_update"]
    unextended = receipt["signed_queries_after_unextended_updates"]
    assert regular_only[0]["error"] is None and regular_only[1]["error"]
    assert unextended[0]["error"] is None and unextended[1]["error"]
    assert unextended[1]["fee_config_tiers"] == {"regular": 1, "stable": 1}
    assert all(row["fee_config_data_sha256"] == updates[0]["after_sha256"]
               for row in regular_only)
    assert all(row["fee_config_data_sha256"] == updates[1]["after_sha256"]
               for row in unextended)

    denied_extend = receipt["idl_readonly_user_extension"]
    allowed_extend = receipt["writable_user_extension"]
    assert denied_extend["user_writable"] is False
    assert "PrivilegeEscalation" in denied_extend["error"]
    assert denied_extend["before_data_sha256"] == denied_extend["after_data_sha256"]
    assert allowed_extend["user_writable"] is True and allowed_extend["error"] is None
    assert allowed_extend["before_bytes"] == 2512 and allowed_extend["after_bytes"] == 4097
    assert allowed_extend["after_tiers"] == {"regular": 1, "stable": 1}
    assert allowed_extend["before_data_sha256"] == updates[1]["after_sha256"]
    for row in (denied_extend, allowed_extend):
        assert row["fully_signed"]
        verified += signed(row["transaction_base64"], expected=[True, True])
    extended = receipt["signed_queries_after_writable_extension"]
    assert len(extended) == 2 and all(row["error"] is None for row in extended)
    assert all(row["fee_config_data_sha256"] == allowed_extend["after_data_sha256"]
               for row in extended)
    expected_fees = struct.pack("<QQQ", 0, 95, 30).hex()
    assert regular_only[0]["return_data_hex"] == expected_fees
    assert unextended[0]["return_data_hex"] == expected_fees
    assert all(row["return_data_hex"] == expected_fees for row in extended)
    print(json.dumps({"verified_transaction_signatures": verified,
                      "signed_queries": sum(len(receipt[name]) for name in query_groups),
                      "live_finalized_slot": live["rpc_context_slot"],
                      "fresh_init_tiers": init["tier_counts"],
                      "stable_query_unextended_fails": bool(unextended[1]["error"]),
                      "writable_extension_recovers": all(row["error"] is None
                                                          for row in extended)}))


if __name__ == "__main__":
    main()
