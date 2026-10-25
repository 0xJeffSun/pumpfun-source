#!/usr/bin/env python3
"""Portable read-only verification; no compiler, VM or network invocation."""
import argparse
import difflib
import hashlib
import json
from pathlib import Path
import subprocess
import sys

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent


def safe_path(base, relative):
    rel = Path(relative)
    assert not rel.is_absolute() and '..' not in rel.parts, relative
    # Exclude before opening/hash-reading a file, including a symlink target.
    assert not any(part.endswith('-keypair.json') for part in rel.parts), relative
    path = base / rel
    assert not path.is_symlink(), relative
    assert path.resolve().is_relative_to(base.resolve()), relative
    return path


def digest(path):
    assert not path.name.endswith('-keypair.json'), str(path)
    data = path.read_bytes()
    return {'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)}


def read_json(name):
    return json.loads(safe_path(ROOT, name).read_text())


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--current-source', type=Path)
    args = parser.parse_args()
    inputs = read_json('input-manifest.json')
    for relative, expected in inputs.items():
        assert digest(safe_path(ROOT / 'inputs', relative)) == expected, relative
    baseline = read_json('baseline-source-sha256.json')
    proposed = read_json('proposed-source-sha256.json')
    assert len(baseline) == len(proposed) == 18 and baseline.keys() == proposed.keys()
    changed = []
    for relative, expected in baseline.items():
        assert inputs[relative]['sha256'] == expected
        assert digest(safe_path(ROOT / 'source', relative))['sha256'] == proposed[relative]
        if proposed[relative] != expected:
            changed.append(relative)
        if args.current_source:
            assert digest(safe_path(args.current_source, relative))['sha256'] == expected, relative
    assert changed == ['programs/pump-amm/src/lib.rs'], changed
    report = read_json('inputs/repro/pump_amm/pool-serialization-thirty-seven/build-comparison.json')
    assert report['source_sha256'] == baseline
    relative = changed[0]
    before = safe_path(ROOT / 'inputs', relative).read_text()
    after = safe_path(ROOT / 'source', relative).read_text()
    expected_patch = ''.join(difflib.unified_diff(before.splitlines(True), after.splitlines(True), fromfile='a/'+relative, tofile='b/'+relative))
    assert safe_path(ROOT, 'scalar-guard-order.patch').read_text() == expected_patch
    # The only modified region is this ordinary update handler. All following
    # entrypoints, attributes, modules and layouts remain byte-identical.
    begin = '    pub fn update_fee_config('
    before_prefix, before_tail = before.split(begin, 1)
    after_prefix, after_tail = after.split(begin, 1)
    assert before_prefix == after_prefix
    end = '\n    pub fn '
    assert before_tail.split(end, 1)[1] == after_tail.split(end, 1)[1]
    anchor = 'work/fees-v144-cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f/anchor-lang-0.31.1/src/'
    macro = safe_path(ROOT / 'inputs', anchor+'lib.rs').read_text()
    assert 'if $value1 < $value2 {\n            return Err(error!($error_code).with_values(($value1, $value2)));' in macro
    error = safe_path(ROOT / 'inputs', anchor+'error.rs').read_text()
    assert 'pub fn with_values(mut self, values: (impl ToString, impl ToString)) -> Self' in error
    assert 'values.0.to_string(),\n                    values.1.to_string(),' in error
    lock = safe_path(ROOT / 'inputs', 'programs/pump-amm/Cargo.lock').read_text()
    assert 'name = "anchor-lang"\nversion = "0.31.1"' in lock
    plan = read_json('prebuild-plan.json')
    assert plan['build_executed'] is False and plan['runtime_executed'] is False
    assert plan['changed_files'] == changed and plan['parent_review_required_before_build'] is True
    evidence = read_json('evidence.json')
    assert evidence['no_build'] is True and evidence['no_runtime'] is True
    result = subprocess.run([sys.executable, '-B', str(ROOT / 'analyze.py'), '--verify'], capture_output=True, text=True)
    if result.returncode:
        sys.stderr.write(result.stderr)
        raise RuntimeError('Bundled read-only analyzer failed')
    analysis = json.loads(result.stdout)
    assert analysis['status'] == 'PASS' and analysis['helper_direct_call_checks'] == 94
    sealed = False
    count = None
    if (ROOT / 'manifest.json').exists():
        manifest = read_json('manifest.json')
        paths = set()
        for path in ROOT.rglob('*'):
            relative = path.relative_to(ROOT).as_posix()
            # No reads of excluded paths. Metadata enumeration alone suffices
            # to reject a generated deployment keypair in this source package.
            assert not path.name.endswith('-keypair.json'), relative
            assert not path.is_symlink(), relative
            if path.is_file() and relative != 'manifest.json':
                paths.add(relative)
        assert paths == set(manifest['files']), (paths ^ set(manifest['files']))
        for relative, expected in manifest['files'].items():
            assert digest(safe_path(ROOT, relative)) == expected, relative
        sealed = True
        count = len(paths)
    print(json.dumps({'status': 'PASS', 'input_files': len(inputs), 'compiler_inputs': len(baseline), 'changed_files': changed, 'bounded_analysis': analysis, 'seal_verified': sealed, 'sealed_payload_files': count, 'current_source_verified': bool(args.current_source), 'build_executed': False, 'runtime_executed': False}, indent=2))


if __name__ == '__main__':
    main()
