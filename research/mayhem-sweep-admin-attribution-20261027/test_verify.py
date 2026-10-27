"""Evidence corruption must fail closed, including when Python uses -O."""
import copy
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import verify


class AttributionTests(unittest.TestCase):
    def test_retained_report(self):
        self.assertEqual(verify.derive(), json.loads((verify.HERE / 'report.json').read_text()))

    def test_corrupted_inputs(self):
        for name in verify.INPUTS:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temp:
                root = Path(temp)
                for input_name in verify.INPUTS:
                    dest = root / input_name
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_bytes((verify.ROOT / input_name).read_bytes())
                dest = root / name
                data = bytearray(dest.read_bytes())
                data[len(data) // 2] ^= 1
                dest.write_bytes(data)
                with self.assertRaisesRegex(ValueError, 'input hash mismatch'):
                    verify.derive(root)

    def test_saved_inventory_cannot_invent_caller(self):
        actual = json.loads
        def altered(data, *args, **kwargs):
            value = actual(data, *args, **kwargs)
            if isinstance(value, dict) and 'rows' in value:
                value = copy.deepcopy(value)
                row = next(r for r in value['rows'] if r['id'] == 'O0170')
                row['counterparts'][0]['start'] += 8
            return value
        with patch.object(verify.json, 'loads', side_effect=altered):
            with self.assertRaisesRegex(ValueError, 'complete caller normalized body differs'):
                verify.derive()


if __name__ == '__main__':
    unittest.main()
