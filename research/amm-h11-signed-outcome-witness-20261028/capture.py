#!/usr/bin/env python3
"""Capture one outcome record around every unchanged LiteSVM send call."""
import argparse, base64, gzip, hashlib, json, runpy, sys
from pathlib import Path

sys.dont_write_bytecode = True
from solders.litesvm import LiteSVM
from solders.transaction_metadata import FailedTransactionMetadata

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
AMM = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
sha = lambda data: hashlib.sha256(data).hexdigest()
canonical = lambda value: json.dumps(value, sort_keys=True, separators=(",", ":")).encode()


def account_value(account):
    if account is None:
        return None
    data = bytes(account.data)
    value = {
        "lamports": account.lamports,
        "owner": str(account.owner),
        "executable": account.executable,
        "rent_epoch": account.rent_epoch,
        "data_len": len(data),
    }
    if account.executable:
        value["data_sha256"] = sha(data)
    else:
        value["data_hex"] = data.hex()
    return value


def snapshot(vm, keys):
    rows = [{"pubkey": str(key), "account": account_value(vm.get_account(key))} for key in keys]
    behavioral = [row for row in rows if row["account"] is None or not row["account"]["executable"]]
    return rows, sha(canonical(behavioral))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--suite", required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--script", type=Path, required=True)
    parser.add_argument("args", nargs=argparse.REMAINDER)
    args = parser.parse_args()
    output, script = args.output.resolve(), args.script.resolve()
    check_args = args.args[1:] if args.args[:1] == ["--"] else args.args
    assert not output.exists()

    original_send = LiteSVM.send_transaction
    original_load = LiteSVM.add_program_from_file
    original_sigverify = LiteSVM.with_sigverify
    loads, records = {}, []

    def logical_path(path):
        path = Path(path).resolve()
        try:
            return path.relative_to(ROOT).as_posix()
        except ValueError:
            return "external/" + path.name

    def load(vm, program_id, path):
        path = Path(path).resolve()
        assert not path.name.endswith("-keypair.json")
        data = path.read_bytes()
        value = {"path": logical_path(path), "sha256": sha(data), "bytes": len(data)}
        loads[str(program_id)] = value
        result = original_load(vm, program_id, path)
        if not hasattr(vm, "_outcome_witness_programs"):
            vm._outcome_witness_programs = {}
        vm._outcome_witness_programs[str(program_id)] = value
        return result

    def sigverify(vm, enabled):
        assert enabled is True, "fixture disabled signature verification"
        return original_sigverify(vm, enabled)

    def send(vm, transaction):
        verified = transaction.verify_with_results()
        assert verified and all(verified)
        raw = bytes(transaction)
        keys = transaction.message.account_keys
        before, before_digest = snapshot(vm, keys)
        programs = dict(getattr(vm, "_outcome_witness_programs", {}))
        assert AMM in programs
        result = original_send(vm, transaction)
        assert bytes(transaction) == raw
        after, after_digest = snapshot(vm, keys)
        failed = isinstance(result, FailedTransactionMetadata)
        metadata = result.meta() if failed else result
        meta = json.loads(metadata.to_json())
        logs = metadata.logs()
        changed = [a["pubkey"] for a, b in zip(before, after) if a != b and
                   (a["account"] is None or not a["account"]["executable"]) and
                   (b["account"] is None or not b["account"]["executable"])]
        records.append({
            "sequence": len(records),
            "transaction_base64": base64.b64encode(raw).decode(),
            "transaction_sha256": sha(raw),
            "message_sha256": sha(bytes(transaction.message)),
            "signature_count": len(verified),
            "all_signatures_verified": True,
            "amm_program_sha256": programs[AMM]["sha256"],
            "loaded_programs": programs,
            "prestate": before,
            "prestate_digest": before_digest,
            "poststate": after,
            "poststate_digest": after_digest,
            "changed_nonexecutable_accounts": changed,
            "error": str(result.err()) if failed else None,
            "events": [line for line in logs if line.startswith("Program data: ")],
            "inner_instructions": meta.get("inner_instructions"),
            "return_data": meta.get("return_data"),
            "logs": logs,
            "logs_sha256": sha(canonical(logs)),
        })
        return result

    LiteSVM.add_program_from_file = load
    LiteSVM.with_sigverify = sigverify
    LiteSVM.send_transaction = send
    sys.path.insert(0, str(ROOT / "scripts"))
    sys.path.insert(0, str(script.parent))
    sys.argv = [str(script), *check_args]
    try:
        runpy.run_path(str(script), run_name="__main__")
    finally:
        document = {
            "scope": "Direct around-send capture of signed local LiteSVM executions; no RPC.",
            "suite": args.suite,
            "script_sha256": sha(script.read_bytes()),
            "capture_sha256": sha(Path(__file__).read_bytes()),
            "records": records,
            "transaction_count": len(records),
            "signature_count": sum(row["signature_count"] for row in records),
            "loaded_program_inventory": loads,
        }
        output.parent.mkdir(parents=True, exist_ok=True)
        with output.open("wb") as raw_out:
            with gzip.GzipFile(filename="", mode="wb", fileobj=raw_out, mtime=0) as compressed:
                compressed.write(canonical(document) + b"\n")


if __name__ == "__main__":
    main()
