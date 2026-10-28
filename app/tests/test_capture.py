"""Resume must not accept corrupted captured bytes or silently fetch replacements."""
import hashlib
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('capture', Path(__file__).resolve().parents[1] / 'scripts/capture.py')
capture = importlib.util.module_from_spec(spec)
spec.loader.exec_module(capture)


class CaptureResumeTests(unittest.TestCase):
    def test_resume_verifies_retained_bytes_before_reuse(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            target = root / 'saved.js'
            body = b'original capture'
            target.write_bytes(body)
            url = 'https://pump.fun/saved.js'
            record = {'url': url, 'path': 'saved.js', 'status': 200,
                      'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()}
            with patch.object(capture, 'ROOT', root), patch.object(capture, 'REUSE', {url: record}), patch.object(capture, 'capture') as fetch:
                self.assertEqual(capture.pool([url]), [(record, body)])
                target.write_bytes(b'corrupt capture')
                with self.assertRaisesRegex(ValueError, 'saved.js'):
                    capture.pool([url])
                fetch.assert_not_called()
                self.assertEqual(target.read_bytes(), b'corrupt capture')


if __name__ == '__main__':
    unittest.main()
