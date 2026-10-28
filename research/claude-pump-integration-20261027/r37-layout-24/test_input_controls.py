"""Reject corrupted verifier inputs before importing analysis helpers; no VM."""
from pathlib import Path
import importlib.util
import shutil
import tempfile
from unittest.mock import patch

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('l24_input_verifier', P / 'verify.py')
verifier = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verifier)
verifier.verify_inputs()
assert 'pump_compare_function_bytes' not in verifier.__dict__
rejected = 0

with tempfile.TemporaryDirectory(prefix='l24-input-controls-') as temp:
    copied = Path(temp) / 'packet'
    shutil.copytree(P, copied)
    extra = copied / '__pycache__/unlisted.txt'
    extra.parent.mkdir()
    extra.write_text('unlisted file')
    with patch.object(verifier, 'P', copied):
        try:
            verifier.verify_inputs()
        except AssertionError as error:
            assert '__pycache__/unlisted.txt' in str(error)
            rejected += 1
        else:
            raise AssertionError('unlisted cache-directory file accepted')
    extra.unlink()
    extra.parent.rmdir()
    root_manifest = copied / 'MANIFEST.json'
    saved_manifest = Path(temp) / 'manifest.json'
    root_manifest.rename(saved_manifest)
    root_manifest.symlink_to(saved_manifest)
    original_read = Path.read_text
    def reject_manifest_read(path, *args, **kwargs):
        if path == root_manifest:
            raise RuntimeError('symlink manifest read before filesystem checks')
        return original_read(path, *args, **kwargs)
    with patch.object(verifier, 'P', copied), patch.object(Path, 'read_text', reject_manifest_read):
        try:
            verifier.verify_inputs()
        except AssertionError:
            rejected += 1
        else:
            raise AssertionError('symlink root manifest accepted')

original_bytes = Path.read_bytes
for name in ('scripts/pump_compare_function_bytes.py',
             'scripts/pump_quote_control_function_match.py',
             'scripts/pump_diagnostic_audit.py',
             'repro/reconstruction-status-2026-10-26/functions.tsv'):
    target = verifier.ROOT / name
    def changed_input(path, target=target):
        value = original_bytes(path)
        return value + b'\nchanged input\n' if path == target else value
    with patch.object(Path, 'read_bytes', changed_input):
        try:
            verifier.verify_inputs()
        except AssertionError as error:
            assert str(error) == name
            rejected += 1
        else:
            raise AssertionError('modified verifier input accepted: ' + name)

assert rejected == 6
print('PASS: unlisted cache file, symlink manifest and four modified verifier inputs rejected before analysis imports; no VM')
