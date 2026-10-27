"""Negative controls for rejected-candidate evidence and call attribution."""
from pathlib import Path
import gzip
import importlib.util
import json
import tempfile
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('close_order_verify', HERE / 'verify.py')
verify = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify)


class Controls(unittest.TestCase):
    def test_modified_artifact_is_rejected(self):
        descriptors = json.loads((HERE / 'artifacts.json').read_bytes())
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'artifacts').mkdir()
            (root / 'artifacts.json').write_text(json.dumps(descriptors))
            for kind, row in descriptors.items():
                raw = bytearray(gzip.decompress((HERE / row['path']).read_bytes()))
                if kind == 'candidate':
                    raw[70200] ^= 1
                (root / row['path']).write_bytes(gzip.compress(raw, mtime=0))
            with patch.object(verify, 'HERE', root), self.assertRaises(AssertionError):
                verify.derive()

    def test_shared_clone_body_is_not_unique_attribution(self):
        report = verify.derive()
        row = report['after-close']['wrappers'][0]
        matches = row['candidate_calls'][2]['matching_target_ordinals']
        self.assertIn(389, matches)
        self.assertGreater(len(matches), 1)
        self.assertNotEqual(row['candidate_normalized_sha256'], row['original_normalized_sha256'])

    def test_source_controls_do_not_touch_worker_body(self):
        sources = verify.sources()
        before = sources['baseline']
        after = sources['after-close']
        borrowed = sources['borrowed-key']
        self.assertEqual({n for n in before if before[n] != after[n]}, {'src/donation_handlers.rs'})
        worker = 'src/tools/donate/shared.rs'
        # The second control adds a constructor above the worker; its body is preserved.
        self.assertEqual(before[worker].split(b'pub fn donate_shared', 1)[1], borrowed[worker].split(b'pub fn donate_shared', 1)[1])


if __name__ == '__main__':
    unittest.main()
