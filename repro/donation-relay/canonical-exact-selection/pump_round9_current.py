"""Exact Pump Round9 successor; the P27 metadata remains a historical snapshot."""
from pathlib import Path
import hashlib
import json

HERE = Path(__file__).resolve().parent
PACKAGE = 'repro/pump/main-contract-round9-20261027'
TRANSITION_SHA256 = '20ff877533b83b629d1ff70e9d6eda7ae456f8e2692a32c2535f844e90ef4256'


def transition():
    raw = (HERE / 'pump-round9-transition.json').read_bytes()
    assert hashlib.sha256(raw).hexdigest() == TRANSITION_SHA256
    value = json.loads(raw)
    assert value['schema'] == 'PUMP_ROUND9_CURRENT_TRANSITION_V1'
    assert value['package'] == PACKAGE and value['historical_metadata_preserved'] is True
    return value


def admitted_path(root, name):
    from common import file_digest
    t = transition()
    assert name in t['reintroduced_paths'], ('unaccepted historical path', name)
    file_digest(root, name, t['reintroduced_paths'][name])


def verify_package(root, package_name, expected_manifest):
    from common import file_digest, J
    package = Path(root) / package_name
    manifest = file_digest(root, package_name + '/MANIFEST.json', expected_manifest)
    rows = J(manifest)
    names = {str(p.relative_to(package)) for p in package.rglob('*')
             if p.is_file() and '__pycache__' not in p.parts and p != manifest}
    assert names == set(rows)
    for name, digest in rows.items():
        file_digest(package, name, digest)
    return rows


def verify_surface(root, historical, source_names):
    """Check current mutable inputs against exact old and successor identities."""
    from common import file_digest, J
    root = Path(root).resolve()
    t = transition()
    assert historical['compiled']['pump']['source'] == t['pump_source_before']
    assert historical['status']['pump'] == t['pump_status_before']
    scripts = set(historical['script_set']) | set(t['added_scripts'])
    assert len(historical['script_set']) == 187 and len(scripts) == 212
    assert {str(p.relative_to(root)) for p in (root / 'scripts').glob('*.py')} == scripts
    assert sorted(str(p.relative_to(root)) for p in (root / '.github/workflows').rglob('*')
                  if p.is_file()) == historical['workflow_set']
    assert len(historical['workflow_set']) == 6
    governance = J(HERE / 'governance.json')['asset_changes']
    assert set(governance) == {'README.md', '.github/workflows/verify.yml', '.gitattributes'}
    for name, before in historical['assets'].items():
        expected = before
        if name in governance:
            assert before == governance[name]['pass27_sha256']
            expected = governance[name]['after_sha256']
        elif name in t['changed_assets']:
            assert before == t['changed_assets'][name]['before']
            expected = t['changed_assets'][name]['after']
        file_digest(root, name, expected)
    assert set(t['changed_assets']) <= set(historical['assets'])
    for name, digest in t['added_scripts'].items():
        assert name not in historical['script_set']
        file_digest(root, name, digest)
    status = J(root / 'repro/status.json')
    assert set(status) == set(historical['status'])
    for program, before in historical['status'].items():
        assert status[program] == (t['pump_status_after'] if program == 'pump' else before)
    assert source_names(root / 'programs/pump', root / 'programs/pump', root) == set(t['pump_source_after'])
    for name, digest in t['pump_source_after'].items():
        file_digest(root, name, digest)
    rules = J(root / 'repro/layered-passes/pass-26/current-guards/rules.json')
    for role, compiled in historical['compiled'].items():
        if role == 'pump':
            continue
        layout = rules['source_layout'][role]
        assert source_names(root / layout['crate'], root / layout['workspace'], root,
                            [root / n for n in layout.get('extra_inputs', [])]) == set(compiled['source'])
        for name, digest in compiled['source'].items():
            file_digest(root, name, digest)
    for name in t['reintroduced_paths']:
        admitted_path(root, name)
    return t


def verify_context(ctx):
    from common import (CONTROLLER, CONTROLLER_SEAL, H, HERE as canonical,
                        J, file_digest, source_names)
    from verify_selection import verify
    root, historical = ctx.root, ctx.F
    t = transition()
    file_digest(root, 'repro/layered-passes/pass-27/current-metadata/bindings.json',
                t['historical_bindings_sha256'])
    verify(root)
    ctx.history()
    ctx.attributes()
    ctx.sealed(CONTROLLER, CONTROLLER_SEAL)
    verify_surface(root, historical, source_names)
    rows = verify_package(root, PACKAGE, t['manifest_sha256'])
    checkpoint = J(root / PACKAGE / 'CHECKPOINT.json')
    assert checkpoint['primary_source_sha256'] == {
        name.removeprefix('programs/pump/'): digest
        for name, digest in t['pump_source_after'].items()}
    status = t['pump_status_after']
    assert status['candidate_sha256'] == checkpoint['candidate_sha256']
    assert status['symbols_sha256'] == checkpoint['unstripped_sha256']
    assert status['candidate_artifact'] == PACKAGE + '/candidate.so'
    assert H(root / status['candidate_artifact']) == checkpoint['candidate_sha256']
    assert H(root / PACKAGE / 'unstripped.so') == checkpoint['unstripped_sha256']
    assert checkpoint['goal_complete'] is False and checkpoint['whole_elf_equal'] is False
    for name in ['build.json', 'repeat-build.json', 'canonical-build.json', 'reproduced-build.json']:
        build = J(root / PACKAGE / name)
        assert build['returncode'] == 0 and build['source_unchanged']
        assert build['comparison']['candidate_sha256'] == checkpoint['candidate_sha256']
        assert build['unstripped_sha256'] == checkpoint['unstripped_sha256']
    # All prior program artifacts/reports remain authenticated, including old Pump.
    scanner_file = file_digest(root, ctx.R['source_scanner'], ctx.R['source_scanner_sha256'])
    import importlib.util
    spec = importlib.util.spec_from_file_location('round9_source_inventory', scanner_file)
    scanner = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(scanner)
    count = 0
    for role, compiled in historical['compiled'].items():
        file_digest(root, compiled['candidate'], compiled['candidate_sha256'])
        report = J(file_digest(root, compiled['report'], compiled['report_sha256']))
        assert report['source_sha256'] == compiled['source']
        assert report['comparison']['candidate_sha256'] == compiled['candidate_sha256']
        layout = ctx.R['source_layout'][role]
        actual = scanner.source_manifest(root / layout['crate'], root / layout['workspace'], root,
                                         extra_inputs=[root / n for n in layout.get('extra_inputs', [])])
        expected = t['pump_source_after'] if role == 'pump' else compiled['source']
        assert actual == expected
        count += len(actual)
    old_source = canonical / 'historical-source23'
    assert scanner.source_manifest(old_source, old_source, root) == {
        str(old_source.relative_to(root)) + '/' + n: h
        for n, h in historical['relay']['source23'].items()}
    file_digest(old_source, 'README.md', historical['relay']['canonical_readme_sha256'])
    file_digest(old_source, 'source-selected.json', historical['relay']['source_selected_sha256'])
    assert J(canonical / 'current.before.json') == historical['relay']['current']
    assert count == 112
    ctx.current_projection = {
        'transition': 'Pump Round9', 'historical_source_inputs': 107,
        'current_source_inputs': count, 'current_pump_source_inputs': 42,
        'scripts': 212, 'workflows': 6, 'historical_metadata_unchanged': True,
        'pump_normalized_windows': checkpoint['normalized_windows'],
        'pump_raw_windows': checkpoint['raw_windows'], 'pump_whole_elf_equal': False,
        'saved_pump_package_files': len(rows)}
    # This return value is used only to compare the immutable P27 metadata.
    return historical
