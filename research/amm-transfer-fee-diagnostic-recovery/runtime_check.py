"""Audit the retained 216-case fresh-VM diagnostic replay."""
from collections import Counter
from pathlib import Path
import base64
import gzip
import hashlib
import json
import re

from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
AMM = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
IMAGES = {
    "original": "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7",
    "control": "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3",
    "candidate": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}
MALFORMED = {
    "partial-header-two", "partial-header-three", "value-overrun",
    "short-fee-config", "duplicate-fee-config", "fee-before-malformed-header",
}
INVERSE = {
    "fee-10000-max-18446744073709551615-amount-1",
    "fee-10000-max-18446744073709551615-amount-1000000",
}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def without_compute(logs):
    return [line for line in logs if not re.fullmatch(
        r"Program \S+ consumed \d+ of \d+ compute units", line)]


def comparable(receipt):
    metadata = dict(receipt["metadata"])
    metadata.pop("compute_units_consumed")
    metadata["logs"] = without_compute(metadata["logs"])
    return {key: receipt[key] for key in ("before", "after", "transaction_sha256", "clock", "error")} | {
        "metadata": metadata,
    }


def anchor_diagnostic(logs):
    values = [line for line in logs if "AnchorError thrown in programs/pump-amm/src/utils/transfer_fee.rs:" in line]
    assert len(values) == 1
    return values[0]


def expected_diagnostics(case):
    if case["label"] in MALFORMED:
        assert case["mint"] == "quote"
        return 32, 13, "UnsupportedQuoteMint", 6007
    assert case["instruction"] == "deposit" and case["label"] in INVERSE
    return 67, 35, "Overflow", 6023


def audit(report=None, receipt_data=None):
    if report is None:
        report = json.loads(gzip.decompress((HERE / "runtime/report.json.gz").read_bytes()))
    if receipt_data is None:
        receipt_data = (HERE / "runtime/raw-transactions.jsonl.gz").read_bytes()
    receipts = [json.loads(line) for line in gzip.decompress(receipt_data).splitlines()]
    assert report["image_sha256"] == IMAGES
    assert report["fresh_vm_environment"] == "1"
    assert report["transaction_receipts"] == {
        "path": "raw-transactions.jsonl.gz", "sha256": sha(receipt_data),
    }
    assert report["counts"] == {"vms": 648, "transactions": 648, "signature_fields": 648}
    assert report["case_count"] == len(report["cases"]) == 216
    assert len(receipts) == 648 and [row["vm"] for row in receipts] == list(range(648))
    assert report["mismatches"] == [41, 42, 43, 44, 45, 46, 89, 90, 91, 92, 93, 94, 154, 155]
    for name, digest in report["input_sha256"].items():
        assert sha((ROOT / name).read_bytes()) == digest, name

    seen = Counter()
    failures = 0
    for index, receipt in enumerate(receipts):
        case_index, image_index = divmod(index, 3)
        image = ("original", "control", "candidate")[image_index]
        case = report["cases"][case_index]["case"]
        assert receipt["sequence"] == index
        assert receipt["context"] == {
            "index": case_index, "image": image, "instruction": case["instruction"],
            "mint": case["mint"], "label": case["label"],
        }
        raw = base64.b64decode(receipt["transaction_base64"], validate=True)
        transaction = Transaction.from_bytes(raw)
        checks = transaction.verify_with_results()
        assert bytes(transaction) == raw and checks and all(checks)
        assert receipt["all_signatures_verified"] and receipt["signature_fields"] == len(checks) == 1
        assert sha(raw) == receipt["transaction_sha256"]
        assert [str(value) for value in transaction.signatures] == receipt["signatures"]
        assert receipt["loaded_programs"][AMM]["sha256"] == IMAGES[image]
        for key, program in receipt["loaded_programs"].items():
            if key != AMM:
                name = "evidence/" + program["path"].split("/evidence/", 1)[1]
                assert sha((ROOT / name).read_bytes()) == program["sha256"]
        value = report["cases"][case_index][image]
        assert value["error"] == receipt["error"] and value["logs"] == receipt["metadata"]["logs"]
        assert value["inner_instructions"] == receipt["metadata"]["inner_instructions"]
        if receipt["error"] is not None:
            failures += 1
            payer = str(transaction.message.account_keys[0])
            assert all(receipt["before"][key] == receipt["after"][key]
                       for key in receipt["before"] if key != payer)
            before, after = dict(receipt["before"][payer]), dict(receipt["after"][payer])
            assert before.pop("lamports") - after.pop("lamports") == receipt["payer_fee_lamports"] == 5000
            assert before == after and receipt["rollback_except_payer_fee"] is True
        seen[image] += 1
    assert seen == Counter({name: 216 for name in IMAGES}) and failures == 102

    diagnostic_rows = []
    differences = []
    for index, row in enumerate(report["cases"]):
        original, control, candidate = receipts[index * 3:index * 3 + 3]
        assert comparable(original) == comparable(candidate), index
        changed = comparable(control) != comparable(candidate)
        assert row["original_candidate_equal"]
        assert row["control_candidate_equal"] == (not changed)
        if changed:
            differences.append(index)
            old_line, control_line, code, number = expected_diagnostics(row["case"])
            pattern = ("Program log: AnchorError thrown in programs/pump-amm/src/utils/transfer_fee.rs:{}. "
                       "Error Code: {}. Error Number: {}. Error Message: {}.")
            original_log = anchor_diagnostic(original["metadata"]["logs"])
            control_log = anchor_diagnostic(control["metadata"]["logs"])
            candidate_log = anchor_diagnostic(candidate["metadata"]["logs"])
            assert original_log == candidate_log == pattern.format(old_line, code, number, code)
            assert control_log == pattern.format(control_line, code, number, code)
            diagnostic_rows.append({
                "case_index": index, "instruction": row["case"]["instruction"],
                "mint": row["case"]["mint"], "fixture": row["case"]["label"],
                "original": original_log, "control": control_log, "candidate": candidate_log,
                "filename": "programs/pump-amm/src/utils/transfer_fee.rs",
                "original_line": old_line, "control_line": control_line,
                "candidate_line": old_line, "column": None,
            })
    assert differences == report["mismatches"] and len(diagnostic_rows) == 14
    assert Counter(row["classification"] for row in report["cases"]) == Counter(report["classifications"])
    return diagnostic_rows


if __name__ == "__main__":
    rows = audit()
    print(json.dumps({"case_count": 216, "signed_executions": 648,
                      "diagnostic_differences_before": 14,
                      "diagnostic_differences_after": 0,
                      "rows": rows}, indent=2))
