"""Check source scope and prevent approximate matching from becoming recovery."""
from pathlib import Path
import gzip
import importlib.util
import json
import tempfile
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('result_shape_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class Controls(unittest.TestCase):
    def test_only_handlers_change(self):
        parent = v.module('result_test_parent', v.ROOT / 'repro/donation-relay/donation-close-order-controls/verify.py').sources()['after-close']
        for source in v.sources().values():
            self.assertEqual({n for n in parent if parent[n] != source[n]}, {'src/donation_handlers.rs'})

    def test_map_preserves_native_error_close_order(self):
        parent = v.module('result_native_parent', v.ROOT / 'repro/donation-relay/donation-close-order-controls/verify.py').sources()['after-close']['src/donation_handlers.rs']
        mapped = v.sources()['map-result']['src/donation_handlers.rs']
        # Everything before the first regular handler contains the two native handlers.
        boundary = b'pub fn donate_v1_handler'
        self.assertEqual(parent.split(boundary)[0], mapped.split(boundary)[0])
        self.assertEqual(mapped.count(b'result.map('), 3)

    def test_artifact_mutation_is_rejected(self):
        descriptors = json.loads((HERE / 'artifacts.json').read_bytes())
        with tempfile.TemporaryDirectory() as temp:
            folder = Path(temp)
            row = dict(descriptors['explicit-match']['candidate'])
            source = v.ROOT / row['path']
            raw = bytearray(gzip.decompress(source.read_bytes()))
            raw[70200] ^= 1
            output = folder / 'mutated.so.gz'
            output.write_bytes(gzip.compress(raw, mtime=0))
            row['path'] = str(output)
            descriptors['explicit-match']['candidate'] = row
            (folder / 'artifacts.json').write_text(json.dumps(descriptors))
            with patch.object(v, 'HERE', folder), self.assertRaises(AssertionError):
                v.derive()

    def test_near_size_is_not_a_match(self):
        rows = v.derive()
        for row in rows.values():
            self.assertTrue(all(w['original_normalized_sha256'] != w['candidate_normalized_sha256'] for w in row['wrappers']))
        self.assertEqual(rows['explicit-match']['wrappers'][2]['candidate_bytes'], 2560)
        self.assertEqual(rows['explicit-match']['wrappers'][2]['original_bytes'], 2568)
        self.assertEqual(rows['map-result']['summary']['original_raw_match_windows'], 140)


if __name__ == '__main__':
    unittest.main()
