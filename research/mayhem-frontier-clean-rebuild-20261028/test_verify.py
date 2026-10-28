"""Regression checks for the complete archived inventory comparison."""
import gzip
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent
ROOT = next(p for p in P.parents if (p / "evidence/original/mayhem/deployed.so").is_file())
spec = importlib.util.spec_from_file_location("clean_rebuild_verify", P / "verify.py")
verify = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify)
verify.ROOT = ROOT
verify.INVENTORY_TOOL = ROOT / "research/mayhem-window-inventory-tool-20261028/window_inventory.py"


class ArchivedInventory(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tool = verify.load_inventory_tool()
        cls.reader = cls.tool.load_reader()

    def test_both_archived_inventories_match(self):
        for name, expected in verify.EXPECTED.items():
            with self.subTest(recipe=name):
                _, failures = verify.check_archived(name, expected, self.tool, self.reader)
                self.assertEqual(failures, [])

    def test_changed_row_is_rejected_without_changed_totals(self):
        with tempfile.TemporaryDirectory() as td:
            packet = Path(td)
            shutil.copytree(P / "builds", packet / "builds")
            path = packet / "builds/default/inventory.json.gz"
            data = json.loads(gzip.decompress(path.read_bytes()))
            data["rows"][0]["classification"] = "forged"
            path.write_bytes(gzip.compress(json.dumps(data).encode(), mtime=0))
            with patch.object(verify, "P", packet):
                _, failures = verify.check_archived("default", verify.EXPECTED["default"], self.tool, self.reader)
            self.assertIn("archived inventory.json.gz disagrees with recomputed inventory", failures)

    def test_changed_text_total_is_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            packet = Path(td)
            shutil.copytree(P / "builds", packet / "builds")
            path = packet / "builds/default/inventory.json.gz"
            data = json.loads(gzip.decompress(path.read_bytes()))
            data["matched_text_bytes"] = 0
            path.write_bytes(gzip.compress(json.dumps(data).encode(), mtime=0))
            with patch.object(verify, "P", packet):
                _, failures = verify.check_archived("default", verify.EXPECTED["default"], self.tool, self.reader)
            self.assertIn("archived inventory.json.gz disagrees with recomputed inventory", failures)


if __name__ == "__main__":
    unittest.main(verbosity=2)
