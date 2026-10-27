"""Rebuild from pinned public source, verified caches and an empty target (Linux)."""
from pathlib import Path, PurePosixPath
import argparse, hashlib, json, os, shutil, subprocess, tarfile, time, tomllib

HERE = Path(__file__).resolve().parent
IMAGE = 'solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
SDK_ARCHIVE = '8d5153589dbe19635affe937663cf4555a7e69a62d91ab4a1df064aaa8d5f066'
EXPECTED = '99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
UPSTREAM = '17e99434af5ead3e989c08f32af33609821d0bc0'


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def save(path, value):
    path.write_text(json.dumps(value, indent=2) + '\n')


def safe_name(name):
    p = PurePosixPath(name)
    assert not p.is_absolute() and '..' not in p.parts, name
    return str(p)


def checked_dependencies(cache, lock):
    packages = tomllib.loads(lock.read_text())['package']
    expected = {p['name']+'-'+p['version']: p['checksum'] for p in packages
                if p.get('source', '').startswith('registry+')}
    archives, source_files, seen = {}, 0, set()
    for archive in sorted((cache/'registry/cache').glob('*/*.crate')):
        name = archive.name[:-6]
        assert name in expected and digest(archive) == expected[name], archive
        assert name not in seen, name
        seen.add(name)
        archives[str(archive.relative_to(cache))] = expected[name]
        src = cache/'registry/src'/archive.parent.name/name
        actual = {str(p.relative_to(src)) for p in src.rglob('*') if p.is_file()}
        members = set()
        with tarfile.open(archive) as tf:
            for m in tf:
                assert m.isdir() or m.isfile(), m.name
                if not m.isfile():
                    continue
                parts = PurePosixPath(safe_name(m.name)).parts
                assert parts[0] == name
                relative = str(PurePosixPath(*parts[1:]))
                assert relative not in members
                members.add(relative)
                assert not (src/relative).is_symlink()
                assert (src/relative).read_bytes() == tf.extractfile(m).read(), (name, relative)
                source_files += 1
        assert actual - {'.cargo-ok'} == members, name
    assert seen == set(expected), 'missing registry archives'
    commits = {p['source'].split('#')[1] for p in packages if p.get('source', '').startswith('git+')}
    git = []
    for checkout in sorted((cache/'git/checkouts').glob('*/*')):
        if not (checkout/'.git').exists():
            continue
        cmd = ['git', '-c', 'safe.directory='+str(checkout), '-C', str(checkout)]
        head = subprocess.check_output(cmd+['rev-parse', 'HEAD'], text=True).strip()
        assert head in commits
        status = subprocess.check_output(cmd+['status', '--porcelain', '--untracked-files=all'], text=True)
        assert all(line == '?? .cargo-ok' for line in status.splitlines()), status
        git.append({'commit': head, 'path': str(checkout)})
    assert {row['commit'] for row in git} == commits
    return {'registry_archives': archives, 'extracted_packages_verified': len(seen),
            'extracted_source_files_verified': source_files, 'git_checkouts': git}


def checked_sdk(sdk, archive):
    assert digest(archive) == SDK_ARCHIVE
    files, links = {}, {}
    with tarfile.open(archive, 'r|bz2') as tf:
        for member in tf:
            name = safe_name(member.name)
            local = sdk/name
            if member.isfile():
                with tf.extractfile(member) as stream:
                    expected = hashlib.file_digest(stream, 'sha256').hexdigest()
                assert not local.is_symlink() and digest(local) == expected, name
                files[name] = expected
            elif member.issym():
                assert local.is_symlink() and os.readlink(local) == member.linkname, name
                links[name] = member.linkname
            else:
                assert member.isdir(), name
    actual = {str(p.relative_to(sdk)) for p in sdk.rglob('*') if p.is_file() or p.is_symlink()}
    assert actual == set(files) | set(links), 'SDK file inventory differs'
    return {'archive_sha256': SDK_ARCHIVE, 'files': files, 'symlinks': links}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    for name in ['upstream', 'sdk', 'sdk-archive', 'cargo-cache', 'output']:
        ap.add_argument('--'+name, required=True, type=Path)
    args = ap.parse_args()
    upstream, sdk, archive, cache, out = [p.resolve() for p in
        [args.upstream, args.sdk, args.sdk_archive, args.cargo_cache, args.output]]
    out.mkdir(parents=True, exist_ok=False)
    source, target, cargo = out/'source', out/'target', out/'cargo'
    source.mkdir(); target.mkdir(); cargo.mkdir()
    expected = json.loads((HERE/'upstream-source-manifest.json').read_text())
    head = subprocess.check_output(['git', '-c', 'safe.directory='+str(upstream), '-C', str(upstream), 'rev-parse', 'HEAD'], text=True).strip()
    assert head == UPSTREAM
    for name, sha in expected.items():
        assert digest(upstream/name) == sha, name
        path = source/name
        path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(upstream/name, path)
    with tarfile.open(HERE/'source-snapshot.tar.gz') as tf:
        for m in tf:
            name = safe_name(m.name)
            assert m.isfile() and name in expected
            (source/name).write_bytes(tf.extractfile(m).read())
    planned = json.loads((HERE/'source-manifest.json').read_text())
    assert set(planned) == set(expected) and len(planned) == 812
    assert all(digest(source/n) == sha for n, sha in planned.items())
    save(out/'source-manifest.json', planned)
    print('Checking SDK archive and all extracted dependencies...', flush=True)
    save(out/'sdk-verification.json', checked_sdk(sdk, archive))
    save(out/'dependencies.json', checked_dependencies(cache, source/'programs/token-metadata/Cargo.lock'))
    (source/'programs/token-metadata/target').mkdir()
    sdk_path = '/root/.cache/solana/v1.37/platform-tools'
    cmd = ['docker', 'run', '--rm', '--platform', 'linux/amd64', '--network', 'none']
    for host, guest, mode in [(source, '/build', 'ro'), (sdk, sdk_path, 'ro'),
          (cargo, '/usr/local/cargo', 'rw'), (target, '/build/programs/token-metadata/target', 'rw'),
          (cache/'registry', '/usr/local/cargo/registry', 'ro'), (cache/'git', '/usr/local/cargo/git', 'ro')]:
        cmd += ['-v', str(host)+':'+guest+':'+mode]
    env = {'CARGO_HOME': '/usr/local/cargo', 'CARGO_TARGET_DIR': '/build/programs/token-metadata/target',
           'CARGO_REGISTRIES_CRATES_IO_PROTOCOL': 'sparse', 'RUSTC': sdk_path+'/rust/bin/rustc',
           'CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix=',
           'CC': sdk_path+'/llvm/bin/clang', 'AR': sdk_path+'/llvm/bin/llvm-ar',
           'PATH': sdk_path+'/rust/bin:'+sdk_path+'/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
           'CARGO_BUILD_JOBS': '4', 'CARGO_NET_OFFLINE': 'true'}
    for name, value in env.items():
        cmd += ['-e', name+'='+value]
    cmd += ['-w', '/build/programs/token-metadata', IMAGE, sdk_path+'/rust/bin/cargo', 'rustc',
            '--package', 'token_metadata', '--lib', '--release', '--target', 'sbf-solana-solana',
            '--locked', '--offline', '--manifest-path', '/build/programs/token-metadata/Cargo.toml', '--', '--emit=link']
    save(out/'command.json', cmd)
    print('Building with empty target, read-only inputs, network disabled...', flush=True)
    start = time.time()
    with (out/'build.log').open('wb') as stream:
        result = subprocess.run(cmd, stdout=stream, stderr=subprocess.STDOUT)
    record = {'returncode': result.returncode, 'seconds': time.time()-start,
              'source_unchanged': all(digest(source/n) == sha for n, sha in planned.items()),
              'target_initially_empty': True, 'source_mount_readonly': True,
              'registry_and_git_readonly': True, 'build_network': 'none'}
    save(out/'result.json', record)
    assert result.returncode == 0 and record['source_unchanged'], out/'build.log'
    shutil.copyfile(target/'sbf-solana-solana/release/token_metadata.so', out/'compiler-output.so')
    strip = ['docker', 'run', '--rm', '--network', 'none', '-v', str(sdk)+':/sdk:ro',
             '-v', str(out)+':/out:rw', IMAGE, '/sdk/llvm/bin/llvm-objcopy', '--strip-all',
             '/out/compiler-output.so', '/out/candidate.so']
    save(out/'strip-command.json', strip)
    subprocess.run(strip, check=True)
    record.update(sha256=digest(out/'candidate.so'), compiler_output_sha256=digest(out/'compiler-output.so'))
    record['exact_selected_candidate'] = record['sha256'] == EXPECTED
    save(out/'result.json', record)
    assert record['exact_selected_candidate']
    print(json.dumps(record, indent=2))


if __name__ == '__main__':
    main()
