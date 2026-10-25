#!/usr/bin/env python3
"""Test only saved-byte binding gates in an isolated staged fixture."""
from pathlib import Path
import hashlib
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
W = Path(__file__).resolve().parent
R = next(p for p in W.parents if (p / 'repro/status.json').is_file())
relative = 'repro/pump/tokenkeg-two-curve-fortyeight'
spec = importlib.util.spec_from_file_location('review_binding', R / 'scripts/verify_current_bindings.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
groups = module.current_pump_groups(R / relative)
assert sum(map(len, groups.values())) == 168
results = []
with tempfile.TemporaryDirectory(prefix='binding-fixture-', dir=W) as directory:
    root = Path(directory)
    shutil.copytree(R / relative, root / relative)
    for entries in groups.values():
        for origin in entries:
            name = module.HISTORICAL_COPIES.get(origin, origin)
            destination = root / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(R / name, destination)
    for name in ['scripts/verify_current_bindings.py', 'repro/status.json']:
        destination = root / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(R / name, destination)
    subprocess.run(['git', 'init', '-q', str(root)], check=True)
    subprocess.run(['git', '-C', str(root), 'add', '.'], check=True)

    def check(label, expected):
        result = subprocess.run([sys.executable, '-B', str(root / 'scripts/verify_current_bindings.py'), 'pump'], cwd=root, capture_output=True, text=True)
        assert (result.returncode == 0) == expected, (label, result.stdout, result.stderr)
        row = {'case': label, 'returncode': result.returncode, 'expected_acceptance': expected}
        if not expected:
            row['last_error_line'] = result.stderr.strip().splitlines()[-1]
        else:
            (W / (label + '.stdout')).write_text(result.stdout)
            (W / (label + '.stderr')).write_text(result.stderr)
        results.append(row)

    check('clean-fixture', True)
    cases = {
        'harness': 'scripts/pump_validate_buy.py',
        'runtime': 'evidence/upstream/pump.json',
        'build_helper': 'scripts/build_source_manifest.py',
        'historical_alias': module.HISTORICAL_COPIES['work/pump-multi-hop-curve-recovery/differential.py'],
        'canonical_harness': relative + '/harness/pump_tokenkeg_two_curve_differential.py',
    }
    for category, name in cases.items():
        path = root / name
        raw = path.read_bytes()
        path.unlink()
        check(category + '-missing', False)
        path.write_bytes(raw + b'\nREVIEW TAMPER\n')
        check(category + '-tampered', False)
        path.write_bytes(raw)
        subprocess.run(['git', '-C', str(root), 'update-index', '--force-remove', name], check=True)
        check(category + '-untracked-exact-copy', False)
        subprocess.run(['git', '-C', str(root), 'add', name], check=True)
    check('restored-fixture', True)
    # Preserve an actual reproduction of the pre-fix omission: its gate passes
    # despite the missing current buy harness. The immutable package is intact.
    shutil.copy2(W / 'inputs/scripts/verify_current_bindings.py', root / 'scripts/verify_current_bindings.py')
    (root / 'scripts/pump_validate_buy.py').unlink()
    check('pre-fix-missing-harness-accepted', True)
out = {'status': 'PASS', 'tracked_bindings': 168, 'group_counts': {k: len(v) for k, v in groups.items()},
       'negative_tests': 15, 'results': results, 'real_repository_staging_changed': False,
       'runtime_replays': 0, 'builds': 0, 'fixture_removed': True}
(W / 'binding-tests.json').write_text(json.dumps(out, indent=2) + '\n')
print(json.dumps({'status': 'PASS', 'negative_tests': 15, 'tracked_bindings': 168}, indent=2))
