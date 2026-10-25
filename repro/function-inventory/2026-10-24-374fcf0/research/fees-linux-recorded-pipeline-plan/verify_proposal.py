#!/usr/bin/env python3
"""Static package verification only: never import or execute the build proposal."""
from pathlib import Path
import ast
import difflib
import hashlib
import json
import tarfile
import tomllib

ROOT = Path(__file__).resolve().parent


def read(path):
    file = ROOT / path
    assert not file.is_symlink() and file.resolve().is_relative_to(ROOT)
    return file.read_bytes()


def load(path):
    return json.loads(read(path))


def sha(data):
    return hashlib.sha256(data).hexdigest()


def main():
    seal = load('manifest.json')
    paths = list(ROOT.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    files = {str(p.relative_to(ROOT)) for p in paths if p.is_file() and p.name != 'manifest.json'}
    assert files == set(seal['files'])
    for path, digest in seal['files'].items():
        assert sha(read(path)) == digest, path
    recipe = load('recipe.json')
    pins = load('proposed_core_linux_v144_inputs.json')
    prior = load('prior-helper/core_linux_v144_inputs.json')
    darwin = load('provenance/darwin-build-comparison.json')
    assert recipe['build_attempts_authorized_here'] == 0
    assert recipe['intended_build_attempts_after_root_acceptance'] == 1
    assert pins['revision'] == prior['revision'] == recipe['source_revision'] == '4ffe8bd88761059693e481ae972443c10204f7af'
    assert pins['source_files_sha256'] == prior['source_files_sha256'] == darwin['source_sha256']
    assert darwin['comparison']['candidate_sha256'] == 'a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
    source = {str(p.relative_to(ROOT / 'source')) for p in (ROOT / 'source').rglob('*') if p.is_file()}
    assert len(source) == 22 and source == set(pins['source_files_sha256'])
    for path, digest in pins['source_files_sha256'].items():
        assert sha(read('source/' + path)) == digest, path
    lock = tomllib.loads(read('source/Cargo.lock').decode())
    assert len([p for p in lock['package'] if p.get('source')]) == 252
    sdk = {str(p.relative_to(ROOT / 'recorded-sdk')) for p in (ROOT / 'recorded-sdk').rglob('*') if p.is_file()}
    assert len(sdk) == 53 and sdk == set(pins['recorded_sdk_source_sha256'])
    assert pins['recorded_sdk_source_sha256'] == darwin['sdk_source_sha256']
    for path, digest in pins['recorded_sdk_source_sha256'].items():
        assert sha(read('recorded-sdk/' + path)) == digest, path
    assert pins['official_sdk_source_sha256'] == prior['sdk_source_sha256']
    differences = [n for n in sdk if pins['recorded_sdk_source_sha256'][n] != pins['official_sdk_source_sha256'][n]]
    assert differences == ['scripts/install.sh']
    official = read('provenance/official-install.sh')
    recorded = read('recorded-sdk/scripts/install.sh')
    assert sha(official) == pins['official_sdk_source_sha256']['scripts/install.sh']
    assert recorded == official.replace(b'version=v1.43\n', b'version=v1.52\n')
    assert b'if [[ $machine == "linux" ]]; then\n  version=v2.3.3\nelse\n  version=v2.3.2\nfi' in recorded
    assert sha(read('recorded-sdk.tar.gz')) == recipe['recorded_sdk_archive_sha256']
    with tarfile.open(ROOT / 'recorded-sdk.tar.gz', 'r:gz') as archive:
        members = archive.getmembers()
        assert len(members) == 53
        for member in members:
            assert member.isfile()
            assert member.name.startswith('recorded-sdk/')
            path = member.name[len('recorded-sdk/'):]
            assert sha(archive.extractfile(member).read()) == pins['recorded_sdk_source_sha256'][path]
    artifacts = load('provenance/criterion-artifacts.json')
    tag = load('provenance/criterion-tag.json')
    annotated = load('provenance/criterion-tag-object.json')
    release = load('provenance/criterion-release.json')
    assert artifacts['tag_object'] == tag['object']['sha'] == annotated['sha']
    assert artifacts['source_commit'] == annotated['object']['sha'] == pins['pipeline_tools']['criterion_source_commit']
    assert annotated['verification']['verified'] is True
    assert artifacts['release_id'] == release['id']
    for record in artifacts['artifacts']:
        assert record['executed'] is False
        asset = next(a for a in release['assets'] if a['id'] == record['asset_id'])
        assert asset['browser_download_url'] == record['url'] and asset['size'] == record['bytes']
        data = read('provenance/' + record['archive'])
        assert sha(data) == record['sha256'] and len(data) == record['bytes']
        members = []
        with tarfile.open(ROOT / 'provenance' / record['archive'], 'r:bz2') as archive:
            for member in archive:
                row = {'path': member.name, 'type': member.type.decode(), 'bytes': member.size}
                if member.isfile():
                    row['sha256'] = sha(archive.extractfile(member).read())
                if member.issym() or member.islnk():
                    row['link'] = member.linkname
                members.append(row)
        assert members == record['members']
    binary = next(r for r in artifacts['artifacts'] if r['asset_id'] == pins['pipeline_tools']['criterion_asset_id'])
    assert binary['sha256'] == pins['pipeline_tools']['criterion_sha256']
    assert binary['bytes'] == pins['pipeline_tools']['criterion_bytes']
    rechecks = load('provenance/archive-rechecks.json')
    stripper = next(r for r in rechecks['archives'] if r['role'] == 'stripper')
    assert stripper['sha256'] == pins['pipeline_tools']['strip_sha256']
    assert stripper['bytes'] == pins['pipeline_tools']['strip_bytes']
    for name, record in rechecks['stripper_selected'].items():
        assert record['sha256'] == pins['pipeline_tools']['strip_selected_sha256'][name]
    assert load('provenance/compiler-v144-archive-evidence.json')['download_sha256'] == next(r for r in rechecks['archives'] if r['role'] == 'compiler')['sha256']
    platform_release = load('provenance/stripper-v152-release.json')
    platform_asset = next(a for a in platform_release['assets'] if a['browser_download_url'] == pins['pipeline_tools']['strip_url'])
    assert platform_asset['digest'] == 'sha256:' + pins['pipeline_tools']['strip_sha256']
    assert platform_asset['size'] == pins['pipeline_tools']['strip_bytes']
    expected_diff = ''
    for name in ['core_linux_v144_build.py', 'core_linux_v144_inputs.json']:
        old = read('prior-helper/' + name).decode().splitlines(True)
        new = read('proposed_' + name).decode().splitlines(True)
        expected_diff += ''.join(difflib.unified_diff(old, new, fromfile='a/scripts/' + name, tofile='b/scripts/' + name))
    assert expected_diff == read('reviewable.patch').decode()
    helper = read('proposed_core_linux_v144_build.py')
    assert sha(helper) == recipe['helper_sha256']
    old_ast = ast.parse(read('prior-helper/core_linux_v144_build.py'))
    new_ast = ast.parse(helper)
    old_defs = {n.name: n for n in old_ast.body if isinstance(n, ast.FunctionDef)}
    new_defs = {n.name: n for n in new_ast.body if isinstance(n, ast.FunctionDef)}
    unchanged_gates = ['generated_keypair_path', 'tree_hashes', 'excluded_keypair_paths',
                       'source_hashes', 'prepare_compile_inputs', 'retain_generated_outputs',
                       'seal_evidence', 'snapshot_source', 'dependency_inventory', 'compare_after_build']
    for name in unchanged_gates:
        assert ast.dump(old_defs[name]) == ast.dump(new_defs[name]), name
    def build_command(tree):
        function = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'build')
        return next(n.value for n in ast.walk(function) if isinstance(n, ast.Assign)
                    and any(isinstance(t, ast.Name) and t.id == 'command' for t in n.targets))
    assert ast.dump(build_command(old_ast)) == ast.dump(build_command(new_ast))
    assert not any(isinstance(n, ast.Call) and isinstance(n.func, ast.Attribute) and n.func.attr == 'touch' for n in ast.walk(new_ast))
    print(json.dumps({'verified': True, 'files': len(files), 'source_inputs': 22, 'recorded_sdk_inputs': 53,
                      'existing_sdk_line_differences': 1, 'unchanged_source_retention_gates': len(unchanged_gates),
                      'unwrapped_build_command_unchanged': True, 'criterion_archives_verified': 2,
                      'proposed_helper_imported_or_executed': False, 'builds_dispatched': 0,
                      'execution_readiness': 'Pending root review and runner process-observer support'}, indent=2))


if __name__ == '__main__':
    main()
