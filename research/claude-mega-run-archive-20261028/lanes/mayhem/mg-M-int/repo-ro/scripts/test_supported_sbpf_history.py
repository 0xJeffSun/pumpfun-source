"""Fail-closed controls for the historical SBPF tooling view."""
from pathlib import Path
import tempfile
import unittest

import verify_supported_sbpf_history as bridge


class HistoricalViewTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / 'input'
        self.root.mkdir()
        bridge.stage_historical_view(bridge.ROOT, self.root)

    def rejected(self):
        output = Path(self.temp.name) / 'output'
        output.mkdir()
        with self.assertRaises(AssertionError):
            bridge.stage_historical_view(self.root, output)

    def test_changed_old_verifier_is_rejected(self):
        (self.root / bridge.HISTORY / 'verify.py').write_text('pass\n')
        self.rejected()

    def test_changed_historical_source_is_rejected(self):
        (self.root / bridge.HISTORY / 'source/programs/mayhem/src/lib.rs').write_text('changed\n')
        self.rejected()

    def test_changed_installed_helper_is_rejected(self):
        (self.root / 'scripts/build_source_manifest.py').write_text('changed\n')
        self.rejected()

    def test_unlisted_packet_file_is_rejected(self):
        (self.root / bridge.HISTORY / 'unlisted.txt').write_text('extra\n')
        self.rejected()

    def test_unsafe_relative_paths_are_rejected(self):
        for name in ['/tmp/absolute', '../escape', 'inside/../../escape']:
            with self.subTest(name=name), self.assertRaises(AssertionError):
                bridge.relative(name)


if __name__ == '__main__':
    unittest.main()
