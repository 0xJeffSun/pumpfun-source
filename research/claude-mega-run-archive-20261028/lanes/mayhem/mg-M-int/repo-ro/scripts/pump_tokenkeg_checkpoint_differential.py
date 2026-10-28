#!/usr/bin/env python3
"""Run unchanged two-curve cases with an authenticated portable source binding."""
import json
from pathlib import Path

import pump_tokenkeg_two_curve_differential as base
from build_source_manifest import source_manifest
from verify_pump_main_checkpoint import MANIFEST_SHA256, PACKAGE, ROOT, sha

original_binding = base.compiled_binding


def portable_binding(candidate, build_report):
    report = json.loads(build_report.read_text())
    binding = report.get('portable_source_binding')
    if binding is None:
        return original_binding(candidate, build_report)
    package = ROOT / PACKAGE
    assert sha(package / 'MANIFEST.json') == MANIFEST_SHA256
    manifest = json.loads((package / 'MANIFEST.json').read_text())
    assert binding['kind'] == 'verified-equal-canonical-primary-source'
    assert binding['origin_build_record'] == PACKAGE + '/canonical-build.json'
    origin_path = package / 'canonical-build.json'
    assert sha(origin_path) == manifest['canonical-build.json'] == binding['origin_build_record_sha256']
    assert sha(package / 'CHECKPOINT.json') == manifest['CHECKPOINT.json']
    checkpoint = json.loads((package / 'CHECKPOINT.json').read_text())
    origin = json.loads(origin_path.read_text())
    assert origin['returncode'] == 0 and origin['source_unchanged']
    assert binding['original_compiled_source_sha256'] == origin['source_sha256']
    assert report['comparison'] == origin['comparison']
    assert sha(candidate) == checkpoint['candidate_sha256'] == origin['comparison']['candidate_sha256']
    expected = {'programs/pump/' + name: digest
                for name, digest in checkpoint['primary_source_sha256'].items()}
    assert report['source_sha256'] == expected
    assert base.SOURCE_DIRECTORY == ROOT / 'programs/pump'
    assert source_manifest(base.SOURCE_DIRECTORY, base.SOURCE_DIRECTORY, ROOT,
                           cwd=base.SOURCE_DIRECTORY) == expected
    return {'binding_kind': binding['kind'],
            'report': str(build_report.relative_to(ROOT)),
            'report_sha256': sha(build_report),
            'origin_build_record': binding['origin_build_record'],
            'origin_build_record_sha256': sha(origin_path),
            'candidate_sha256': sha(candidate), 'actual_source_sha256': expected}


base.compiled_binding = portable_binding
base.fixture.compiled_binding = portable_binding
original_bindings = base.bindings


def bindings(candidate, report):
    result = original_bindings(candidate, report)
    result['repository_inputs'][str(Path(__file__).relative_to(ROOT))] = sha(Path(__file__))
    return result


base.bindings = bindings

if __name__ == '__main__':
    base.main()
