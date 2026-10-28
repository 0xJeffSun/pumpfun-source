#!/usr/bin/env python3
"""Negative controls for the L30 empty-fee-sweep parity checks."""
from pathlib import Path
import base64
import copy
import importlib.util
import json
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("parity_checks", HERE / "parity_checks.py")
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


def outcome(logs, *, error=None, events=None, inner=None, return_data=None):
    return {"error": error, "accounts": [{"lamports": 1}], "events": events or [],
            "inner": inner or [], "return_data": return_data, "logs": logs}


def fixture():
    cases = [
        {"op": "sweep_creator_fee", "creator_fee": 9, "protocol_fee": 0},
        {"op": "sweep_creator_fee", "creator_fee": 0, "protocol_fee": 0},
        {"op": "sweep_protocol_fee", "creator_fee": 0, "protocol_fee": 0},
        {"op": "sweep_protocol_fee", "protocol_fee": 0, "invalid_recipient": True},
    ]
    logs = [
        ["Program log: sweep complete"],
        ["Program log: validated", checks.MESSAGE.format(1)],
        ["Program log: validated", checks.MESSAGE.format(0)],
        ["Program log: AnchorError caused by account: recipient"],
    ]
    errors = [None, None, None, "ConstraintAddress"]
    fresh, baseline = [], []
    for index, case in enumerate(cases):
        original = outcome(logs[index], error=errors[index])
        candidate = copy.deepcopy(original)
        old = copy.deepcopy(original)
        if index in (1, 2):
            old["logs"].pop()
        fresh.append({"case": case, "original": original, "candidate": candidate,
                      "different_fields": []})
        baseline.append({"case": copy.deepcopy(case), "original": copy.deepcopy(original),
                         "candidate": old, "different_fields": []})
    wrap = lambda rows: {"case_count": len(rows), "mismatches": [], "cases": rows}
    return wrap(fresh), wrap(baseline), {1, 2}


class NegativeControls(unittest.TestCase):
    def setUp(self):
        self.fresh, self.baseline, self.expected = fixture()

    def rejected(self, fresh=None, baseline=None, expected=None):
        with self.assertRaises(AssertionError):
            checks.validate_focused(fresh or self.fresh, baseline or self.baseline,
                                    self.expected if expected is None else expected)

    def test_missing_protocol_zero_fee_message(self):
        self.fresh["cases"][2]["candidate"]["logs"].pop()
        self.rejected()

    def test_missing_creator_zero_fee_message(self):
        self.fresh["cases"][1]["candidate"]["logs"].pop()
        self.rejected()

    def test_wrong_bucket_number(self):
        logs = self.fresh["cases"][1]["candidate"]["logs"]
        logs[-1] = checks.MESSAGE.format(0)
        self.rejected()

    def test_message_on_nonzero_fee(self):
        self.fresh["cases"][0]["original"]["logs"].append(checks.MESSAGE.format(1))
        self.fresh["cases"][0]["candidate"]["logs"].append(checks.MESSAGE.format(1))
        self.rejected()

    def test_message_before_recipient_validation(self):
        self.fresh["cases"][3]["original"]["logs"].insert(0, checks.MESSAGE.format(0))
        self.fresh["cases"][3]["candidate"]["logs"].insert(0, checks.MESSAGE.format(0))
        self.rejected()

    def test_changed_return_behavior(self):
        self.fresh["cases"][1]["candidate"]["return_data"] = [1]
        self.rejected()

    def test_changed_event(self):
        self.fresh["cases"][1]["candidate"]["events"] = ["unexpected"]
        self.rejected()

    def test_changed_cpi_result(self):
        self.fresh["cases"][1]["candidate"]["inner"] = ["unexpected"]
        self.rejected()

    def test_altered_executable_hash(self):
        with self.assertRaises(AssertionError):
            checks.assert_digest(b"candidate-tampered", checks.sha256(__file__))

    def test_corrupted_transaction_signature(self):
        parent = HERE.parent / "claude-pump-integration-20261027/r37-layout-30/full.json.gz"
        import gzip
        data = json.loads(gzip.decompress(parent.read_bytes()))
        encoded = next(row[side]["transaction_base64"]
                       for row in data["suites"].values() for row in row["cases"]
                       for side in ("original", "candidate")
                       if row[side].get("transaction_base64"))
        raw = bytearray(base64.b64decode(encoded)); raw[1] ^= 1
        with self.assertRaises(Exception):
            checks.verify_signed_transaction(base64.b64encode(raw).decode())

    def test_swapped_original_candidate_outcome(self):
        self.fresh, self.baseline = self.baseline, self.fresh
        self.rejected()

    def test_tampered_expected_log(self):
        self.fresh["cases"][2]["original"]["logs"][-1] = "Program log: tampered"
        self.rejected()

    def test_missing_or_duplicate_case_identity(self):
        rows = [{"path": f"fee_sweeps/cases/{i}", "index": i,
                 "bucket": checks.bucket_for(self.fresh["cases"][i]["case"]),
                 "case": self.fresh["cases"][i]["case"],
                 "case_sha256": checks.case_digest(self.fresh["cases"][i]["case"])} for i in (1, 2)]
        rows[1] = copy.deepcopy(rows[0])
        with self.assertRaises(AssertionError):
            checks.validate_affected_rows(rows, {1, 2})

    def test_extra_unlisted_evidence_file(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            (folder / "listed").write_text("ok")
            manifest = {"listed": checks.sha256(folder / "listed")}
            (folder / "extra").write_text("reject")
            with self.assertRaises(AssertionError):
                checks.verify_manifest(folder, manifest)


if __name__ == "__main__":
    unittest.main(verbosity=2)
