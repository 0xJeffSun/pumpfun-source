#!/usr/bin/env python3
"""Fail-closed controls for the cashback parity verifier."""
from pathlib import Path
import base64, copy, importlib.util, unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("cashback_parity_verify", HERE / "verify.py")
verify = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify)


class NegativeControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.focused = verify.read(HERE / "runtime/cashback-focused.json.gz")
        cls.expected = verify.expected_message_paths()

    def rejected(self, data):
        with self.assertRaises(AssertionError):
            verify.validate_focused(data, self.expected)

    def test_removing_restored_notice_is_rejected(self):
        data = copy.deepcopy(self.focused)
        row = data["cases"][5]
        row["candidate"]["logs"].remove(verify.NEEDLE)
        self.rejected(data)

    def test_emitting_notice_on_nonzero_claim_is_rejected(self):
        data = copy.deepcopy(self.focused)
        row = data["cases"][0]
        row["candidate"]["logs"].insert(2, verify.NEEDLE)
        row["original"]["logs"].insert(2, verify.NEEDLE)
        self.rejected(data)

    def test_changed_return_behavior_is_rejected(self):
        data = copy.deepcopy(self.focused)
        data["cases"][0]["candidate"]["return_data"] = None
        self.rejected(data)

    def test_changed_event_is_rejected(self):
        data = copy.deepcopy(self.focused)
        data["cases"][0]["candidate"]["events"] = []
        self.rejected(data)

    def test_changed_cpi_is_rejected(self):
        data = copy.deepcopy(self.focused)
        data["cases"][0]["candidate"]["inner"] = []
        self.rejected(data)

    def test_corrupted_transaction_signature_is_rejected(self):
        encoded = self.focused["cases"][0]["candidate"]["transaction_base64"]
        raw = bytearray(base64.b64decode(encoded))
        raw[1] ^= 1
        with self.assertRaises(Exception):
            verify.verify_signed_transaction(base64.b64encode(raw).decode())

    def test_changed_executable_hash_is_rejected(self):
        blob = bytearray((HERE / "builds/build-1/candidate.so").read_bytes())
        blob[-1] ^= 1
        with self.assertRaises(AssertionError):
            verify.assert_digest(bytes(blob), verify.CANDIDATE_SHA)

    def test_tampered_expected_log_is_rejected(self):
        data = copy.deepcopy(self.focused)
        row = data["cases"][5]
        at = row["original"]["logs"].index(verify.NEEDLE)
        row["original"]["logs"][at] = "Program log: tampered"
        self.rejected(data)

    def test_source_without_either_notice_is_rejected(self):
        base = verify.BASE_SOURCE.read_text()
        with self.assertRaises(AssertionError):
            verify.validate_source(base, base)


if __name__ == "__main__":
    unittest.main(verbosity=2)
