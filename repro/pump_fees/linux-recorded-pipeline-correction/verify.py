#!/usr/bin/env python3
"""Read-only bundle verification. Never import or execute the build helper."""
import ast
import difflib
import hashlib
import json
from pathlib import Path
import re
import tarfile
import tomllib

ROOT = Path(__file__).resolve().parent


def read(name):
    path = ROOT / name
    assert not path.is_symlink() and path.resolve().is_relative_to(ROOT), name
    return path.read_bytes()


def load(name):
    return json.loads(read(name))


def sha(data):
    return hashlib.sha256(data).hexdigest()


def tar_bytes(name):
    result, modes = {}, {}
    with tarfile.open(ROOT / name, 'r:gz') as archive:
        for member in archive:
            path = Path(member.name)
            assert member.isfile() and not path.is_absolute() and '..' not in path.parts
            assert member.name not in result
            result[member.name] = archive.extractfile(member).read()
            modes[member.name] = member.mode
    return result, modes


def build_command(tree):
    build = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'build')
    return next(n.value for n in ast.walk(build) if isinstance(n, ast.Assign)
                and any(isinstance(t, ast.Name) and t.id == 'command' for t in n.targets))


def main():
    seal = load('manifest-sha256.json')
    paths = list(ROOT.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    files = {str(p.relative_to(ROOT)) for p in paths if p.is_file()
             and str(p.relative_to(ROOT)) != 'manifest-sha256.json'}
    assert files == set(seal)
    for path, expected in seal.items():
        assert sha(read(path)) == expected, path

    expected_bases = load('baseline-sha256.json')
    for name in ['core_linux_v144_build.py', 'core_linux_v144_inputs.json']:
        assert sha(read('baseline-proposal/' + name)) == expected_bases['proposed_' + name]
    assert sha(read('baseline-proposal/manifest.json')) == expected_bases['manifest.json']
    pins = load('core_linux_v144_inputs.json')
    prior_pins = load('integration-base/core_linux_v144_inputs.json')
    assert read('core_linux_v144_inputs.json') == read('baseline-proposal/core_linux_v144_inputs.json')
    assert pins['revision'] == prior_pins['revision'] == '4ffe8bd88761059693e481ae972443c10204f7af'
    assert pins['source_files_sha256'] == prior_pins['source_files_sha256']
    assert len(pins['source_files_sha256']) == 22
    source, _ = tar_bytes('frozen-source.tar.gz')
    assert set(source) == set(pins['source_files_sha256'])
    for name, expected in pins['source_files_sha256'].items():
        assert sha(source[name]) == expected, name
    lock = tomllib.loads(source['Cargo.lock'].decode())
    assert len([p for p in lock['package'] if p.get('source')]) == 252

    recipe = load('baseline-proposal/recipe.json')
    assert sha(read('recorded-sdk.tar.gz')) == recipe['recorded_sdk_archive_sha256']
    sdk, modes = tar_bytes('recorded-sdk.tar.gz')
    sdk_hashes = {name.removeprefix('recorded-sdk/'): sha(data) for name, data in sdk.items()}
    assert len(sdk) == 53 and sdk_hashes == pins['recorded_sdk_source_sha256']
    for name in ['dump', 'install', 'objcopy', 'package', 'strip']:
        assert modes['recorded-sdk/scripts/' + name + '.sh'] == 0o755
    phases = pins['pipeline_tools']
    assert (phases['compile_version'], phases['strip_version'], phases['criterion_version']) == ('v1.44', 'v1.52', 'v2.3.3')

    review, _ = tar_bytes('independent-review.tar.gz')
    review_manifest = read('independent-review-manifest-sha256.json')
    assert sha(review_manifest) == '3e96a9464d7e059f88614341f792b429e43aa3d251e3a0f2fe0b263a189a7fef'
    assert review['manifest-sha256.json'] == review_manifest
    review_seal = json.loads(review_manifest)
    assert set(review) - {'manifest-sha256.json'} == set(review_seal)
    for name, expected in review_seal.items():
        assert sha(review[name]) == expected, name

    for baseline, patch in [('baseline-proposal', 'corrections-to-proposal.patch'), ('integration-base', 'integration.patch')]:
        expected = ''
        for name in ['core_linux_v144_build.py', 'core_linux_v144_inputs.json']:
            expected += ''.join(difflib.unified_diff(read(baseline + '/' + name).decode().splitlines(True),
                                                   read(name).decode().splitlines(True),
                                                   fromfile='a/scripts/' + name, tofile='b/scripts/' + name))
        expected += ''.join(difflib.unified_diff([], read('test_core_linux_pipeline.py').decode().splitlines(True),
                                               fromfile='/dev/null', tofile='b/scripts/test_core_linux_pipeline.py'))
        assert expected == read(patch).decode(), patch
    assert read('test_core_linux_v144_retention.py') == read('integration-base/test_core_linux_v144_retention.py')
    new = ast.parse(read('core_linux_v144_build.py'))
    new_defs = {n.name: n for n in new.body if isinstance(n, ast.FunctionDef)}
    unchanged = ['generated_keypair_path', 'tree_hashes', 'excluded_keypair_paths', 'source_hashes',
                 'prepare_compile_inputs', 'retain_generated_outputs', 'seal_evidence', 'snapshot_source', 'compare_after_build']
    for baseline in ['baseline-proposal', 'integration-base']:
        old = ast.parse(read(baseline + '/core_linux_v144_build.py'))
        old_defs = {n.name: n for n in old.body if isinstance(n, ast.FunctionDef)}
        for name in unchanged:
            assert ast.dump(old_defs[name]) == ast.dump(new_defs[name]), name
        assert ast.dump(build_command(old)) == ast.dump(build_command(new))
    constants = {n.targets[0].id: ast.literal_eval(n.value) for n in new.body
                 if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name)
                 and isinstance(n.value, (ast.Constant, ast.Tuple))}
    assert constants['REGISTRY_PACKAGE_COUNT'] == 252
    assert constants['REGISTRY_NAMESPACES'] == ('index.crates.io-1949cf8c6b5b557f', 'index.crates.io-6f17d22bba15001f')
    assert {'fork', 'vfork', 'clone', 'clone3'} <= set(constants['TRACE_FILTER'].split('=')[1].split(','))

    tests = load('test-results.json')
    assert tests['returncode'] == 0 and tests['tests_total'] == 30
    assert tests['helper_sha256'] == sha(read('core_linux_v144_build.py'))
    for name, expected in tests['test_file_sha256'].items():
        assert sha(read(name)) == expected
    for stream in ['stdout', 'stderr']:
        assert sha(read('tests.' + stream)) == tests[stream + '_sha256']
    assert re.search(r'Ran 30 tests in [0-9.]+s\n\nOK\n$', read('tests.stderr').decode())
    assert 'FAILED (errors=3)' in read('tests-attempt-01.stderr').decode()
    assert tests['real_compiler_installer_tracer_network_executions'] == 0
    print(json.dumps({'verified': True, 'files': len(files), 'frozen_source_files': 22,
                      'selected_registry_packages': 252, 'recorded_sdk_files': 53,
                      'recorded_sdk_executable_scripts': 5, 'preserved_review_files': len(review_seal),
                      'unchanged_source_retention_gates': len(unchanged), 'unit_tests_recorded_passed': 30,
                      'helper_imported_or_executed': False, 'compiler_tracer_network_executions': 0,
                      'hosted_readiness': 'Unverified; native strace preflight and offline Cargo compatibility remain required.'}, indent=2))


if __name__ == '__main__':
    main()
