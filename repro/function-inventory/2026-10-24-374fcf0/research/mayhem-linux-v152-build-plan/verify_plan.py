#!/usr/bin/env python3
"""Verify the frozen proposal without downloads, compiler execution or external inputs."""
from pathlib import Path
import hashlib
import json
import tomllib

ROOT = Path(__file__).resolve().parent


def read(rel):
    path = ROOT / rel
    assert not path.is_symlink(), rel
    assert path.resolve().is_relative_to(ROOT), rel
    return path.read_bytes()


def load(rel):
    return json.loads(read(rel))


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify():
    seal = load('manifest.json')
    paths = list(ROOT.rglob('*'))
    assert not any(p.is_symlink() for p in paths), 'symlinks are not package inputs'
    files = {str(p.relative_to(ROOT)) for p in paths if p.is_file() and p.name != 'manifest.json'}
    assert files == set(seal['files']), 'package file set drift'
    for path, digest in seal['files'].items():
        assert sha(read(path)) == digest, path
    plan = load('plan.json')
    inputs = load('source-inputs.json')
    accepted = load('provenance/accepted-darwin-build.json')
    assert plan['execution_ready'] is False
    assert plan['max_build_attempts'] == 1
    assert plan['comparison']['no_runtime'] and plan['comparison']['no_auto_promotion']
    assert plan['source_revision'] == inputs['revision']
    source = inputs['source_files_sha256']
    assert len(source) == plan['source_count'] == inputs['count'] == 14
    assert source == accepted['source_sha256'] == accepted['source_after_sha256']
    actual_source = {str(p.relative_to(ROOT / 'source')) for p in (ROOT / 'source').rglob('*') if p.is_file()}
    assert actual_source == set(source)
    for path, digest in source.items():
        assert sha(read('source/' + path)) == digest, path
    cargo = tomllib.loads(read('source/programs/mayhem/Cargo.toml').decode())
    assert cargo['profile']['release'] == plan['profile']
    assert cargo['dependencies']['anchor-lang']['version'] == '=1.0.0'
    assert cargo['dependencies']['anchor-spl']['version'] == '=1.0.0'
    lock = tomllib.loads(read(plan['lock']).decode())
    dependencies = load('locked-dependencies.json')
    reduced = [{k: row[k] for k in ('name', 'version', 'source', 'checksum') if k in row} for row in lock['package']]
    assert reduced == dependencies
    assert len(dependencies) == plan['locked_package_count'] == 216
    release = load('provenance/platform-release.json')
    platform = plan['platform']
    assert release['id'] == platform['release_id']
    assert release['tag_name'] == platform['version'] == 'v1.52'
    assert release['target_commitish'] == platform['release_commit']
    asset = next(a for a in release['assets'] if a['id'] == platform['asset_id'])
    assert asset['browser_download_url'] == platform['url']
    assert asset['size'] == platform['bytes']
    assert asset['digest'] == platform['publisher_digest'] == 'sha256:' + platform['sha256']
    download = load('provenance/platform-download.json')
    for key in ('url', 'asset_id', 'bytes', 'sha256', 'publisher_digest'):
        assert download[key] == platform[key], key
    members = load('provenance/platform-selected-members.json')
    assert members['archive_sha256'] == platform['sha256']
    assert len(members['selected_members']) == 9
    assert {m['relative_path']: m['sha256'] for m in members['selected_members']} == platform['selected_members_sha256']
    bundled = 0
    for member in members['selected_members']:
        assert member['executed'] is False
        if 'proposal_copy' in member:
            data = read(member['proposal_copy'])
            assert len(data) == member['bytes'] and sha(data) == member['sha256']
            bundled += 1
    assert bundled == 3
    alloc_source = read('selected-tool-source/rust/lib/rustlib/src/rust/library/alloc/src/string.rs').decode().splitlines()
    assert alloc_source[2829].strip() == '.expect("a Display implementation returned an error unexpectedly");'
    cli = plan['cli']
    sdk = load('provenance/official-sdk-evidence.json')
    assert sdk['archive_sha256'] == cli['sha256']
    assert sdk['cargo_build_sbf']['sha256'] == cli['cargo_build_sbf_sha256']
    assert sdk['sdk_source_sha256'] == cli['sdk_source_sha256']
    assert len(cli['sdk_source_sha256']) == 53
    for path, digest in cli['sdk_source_sha256'].items():
        assert sha(read('official-sdk/' + path)) == digest, path
    actual_sdk = {str(p.relative_to(ROOT / 'official-sdk')) for p in (ROOT / 'official-sdk').rglob('*') if p.is_file()}
    assert actual_sdk == set(cli['sdk_source_sha256'])
    agave = load('provenance/agave-release.json')
    agave_asset = next(a for a in agave['assets'] if a['id'] == cli['asset_id'])
    assert agave_asset['size'] == cli['bytes'] and agave_asset['browser_download_url'] == cli['url']
    assert load('provenance/agave-tag.json')['object']['sha'] == cli['source_commit']
    host = plan['host_bootstrap']
    assert sha(read('provenance/host-rust-channel.toml')) == host['host_channel_sha256']
    assert read('provenance/host-rust-channel.sha256').decode().split()[0] == host['host_channel_sha256']
    assert read('provenance/rustup-init.sha256').decode().split()[0] == host['rustup_sha256']
    blocker = load(plan['blocking_evidence'])
    for name in ('driver', 'strip_script', 'environment_script', 'installer'):
        section = blocker[name]
        lines = read(section['path']).decode().splitlines()
        if 'sha256' in section:
            assert sha(read(section['path'])) == section['sha256']
        for value in section.values():
            if isinstance(value, list):
                for line in value:
                    assert lines[line['line'] - 1] == line['text'], (name, line['line'])
    installer = read('official-sdk/scripts/install.sh').decode()
    assert 'version=v1.43' in installer
    assert 'if [[ ! -e platform-tools-$version.md || ! -e platform-tools ]]; then' in installer
    assert 'rm -rf platform-tools*' in installer
    assert 'source "$sbf_sdk"/env.sh' in read('official-sdk/scripts/strip.sh').decode()
    assert '"$sbf_sdk"/scripts/install.sh' in read('official-sdk/env.sh').decode()
    driver = read('provenance/cargo-build-sbf-main.rs').decode()
    assert '&config.sbf_sdk.join("scripts").join("strip.sh")' in driver
    assert 'format!("{} -Zremap-cwd-prefix=", &target_rustflags)' in driver
    assert plan['layout']['preflight_target'] != plan['layout']['build_target']
    command = [s.replace('<attempt>/source', '<repo>').replace('<attempt>', '<output>') for s in plan['compile_command']]
    assert command == accepted['command']
    assert plan['comparison']['darwin_sha256'] == inputs['accepted_darwin_sha256']
    assert plan['comparison']['original_sha256'] == inputs['original_sha256']
    return {'verified': True, 'files': len(files), 'source_inputs': 14, 'locked_packages': 216,
            'official_sdk_files': 53, 'selected_platform_member_pins': 9,
            'bundled_platform_members': 3, 'archive_hashes_rechecked_by_this_verifier': False,
            'execution_ready': False, 'blocker': 'official SDK post-processing selects v1.43',
            'compiler_invocations': 0, 'runtime_probes': 0}


if __name__ == '__main__':
    print(json.dumps(verify(), indent=2))
