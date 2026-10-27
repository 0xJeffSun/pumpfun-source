#!/usr/bin/env python3
"""Build one Token Metadata source variant in an isolated, network-disabled
Linux/amd64 container (pinned verifiable-build image + platform-tools v1.37),
then compare the stripped ELF with the captured original.

Every one of the 812 compiled source files is first reset to the owned-uses
checkpoint bytes (repro/pump/metaplex-owned-uses-20261026/source-manifest.json),
then the variant's replacement files (repo-relative paths) are written.  The
captured target is read only by the comparison after compilation.

Locks: sbf pool (6 slots) then podman pool (2 slots), per LANE-RULES.md.
"""
import argparse, hashlib, json, shutil, subprocess, sys, time
from pathlib import Path

H = lambda b: hashlib.sha256(b).hexdigest()
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad')
LANE = SP / 'lanes/deps-metaplex'
WT = LANE / 'wt'
REPO = Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source')
import os
_TREE = os.environ.get('MP_TREE', '1')
SRC = LANE / ('out/build/source' if _TREE == '1' else f'out/build{_TREE}/source')
CARGO = LANE / ('out/build/cargo' if _TREE == '1' else f'out/build{_TREE}/cargo')
TGT = LANE / ('target/linux' if _TREE == '1' else f'target/linux{_TREE}')
SDK = REPO / 'work/metaplex-linux-sdk'
REG = REPO / 'work/metaplex-linux-registry'
BASE_MANIFEST = WT / 'repro/pump/metaplex-owned-uses-20261026/source-manifest.json'
BASE_SNAPSHOT = LANE / 'out/build/base-source'  # pristine copy of the 812 owned-uses files
IMAGE = 'solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
PT = '/root/.cache/solana/v1.37/platform-tools'
LOCK = SP / 'sbf_lock.py'
OBJCOPY = Path.home() / '.cache/solana/v1.43/platform-tools/llvm/bin/llvm-objcopy'
sys.path.insert(0, str(LANE / 'out/tools'))
import compare  # noqa: E402


def container_cmd(name, extra_rustc=()):
    return ['podman', 'run', '--rm', '--name', name, '--cpus=2', '--memory=3g',
            '--platform', 'linux/amd64', '--network', 'none',
            '-v', f'{SRC}:/build:rw',
            '-v', f'{SDK}:{PT}:ro',
            '-v', f'{CARGO}:/usr/local/cargo:rw',
            '-v', f'{REG}:/usr/local/cargo/registry:ro',
            '-v', f'{TGT}:/build/programs/token-metadata/target:rw',
            '-e', 'CARGO_HOME=/usr/local/cargo',
            '-e', 'CARGO_TARGET_DIR=/build/programs/token-metadata/target',
            '-e', 'CARGO_NET_OFFLINE=true',
            '-e', 'CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse',
            '-e', f'RUSTC={PT}/rust/bin/rustc',
            '-e', 'CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix=',
            '-e', f'CC={PT}/llvm/bin/clang',
            '-e', f'AR={PT}/llvm/bin/llvm-ar',
            '-e', f'PATH={PT}/rust/bin:{PT}/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            '-w', '/build/programs/token-metadata', IMAGE,
            f'{PT}/rust/bin/cargo', 'rustc', '--package', 'token_metadata', '--lib', '--release',
            '--target', 'sbf-solana-solana', '--locked', '--offline',
            '--manifest-path', '/build/programs/token-metadata/Cargo.toml', '--', *(extra_rustc or ['--emit=link'])]


def reset_sources(manifest):
    for rel, digest in manifest.items():
        dst = SRC / rel
        if not dst.exists() or H(dst.read_bytes()) != digest:
            data = (BASE_SNAPSHOT / rel).read_bytes()
            assert H(data) == digest, rel
            dst.write_bytes(data)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('name')
    ap.add_argument('--variant', type=Path, help='directory of replacement files (repo-relative paths)')
    ap.add_argument('--note', default='')
    ap.add_argument('--emit-ir', action='store_true', help='also --emit=llvm-ir (diagnostic only)')
    ap.add_argument('--emit-mir', action='store_true', help='also --emit=mir,llvm-ir (diagnostic only)')
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--rustc-arg', action='append', default=[], help='extra diagnostic rustc arg')
    a = ap.parse_args()
    out = LANE / 'out/runs' / a.name
    if out.exists() and a.force:
        shutil.rmtree(out)
    out.mkdir(parents=True, exist_ok=False)
    manifest = json.loads(BASE_MANIFEST.read_text())
    assert len(manifest) == 812
    reset_sources(manifest)
    planned, changed = dict(manifest), {}
    if a.variant:
        for p in sorted(a.variant.rglob('*')):
            if p.is_file():
                rel = str(p.relative_to(a.variant))
                assert rel in manifest, rel
                data = p.read_bytes()
                (SRC / rel).write_bytes(data)
                planned[rel] = H(data)
                if planned[rel] != manifest[rel]:
                    changed[rel] = planned[rel]
                    dst = out / 'source' / rel
                    dst.parent.mkdir(parents=True, exist_ok=True)
                    dst.write_bytes(data)
    (out / 'source-manifest.json').write_text(json.dumps(planned, indent=1, sort_keys=True) + '\n')
    # Force cargo to recompile the token_metadata crate: copied sources keep old
    # mtimes, so its cached artifact would otherwise be reused (content untouched).
    now = time.time()
    for p in (SRC / 'programs/token-metadata/program/src').rglob('*.rs'):
        import os
        os.utime(p, (now, now))
    so = TGT / 'sbf-solana-solana/release/token_metadata.so'
    if so.exists():
        so.unlink()
    for stale in (TGT / 'sbf-solana-solana/release/deps').glob('token_metadata*'):
        stale.unlink()
    for stale in (TGT / 'sbf-solana-solana/release/deps').glob('libtoken_metadata*'):
        stale.unlink()
    cname = 'claude-deps-metaplex-' + a.name.replace('/', '-')[:60]
    rec_tree = _TREE
    extra = (['--emit=mir,llvm-ir,link'] if a.emit_mir else ['--emit=llvm-ir,link'] if a.emit_ir else ['--emit=link']) + a.rustc_arg
    a.emit_ir = a.emit_ir or a.emit_mir
    cmd = container_cmd(cname, extra)
    locked = ['python3', str(LOCK), '--slots', '6', '--name', 'sbf', '--',
              'python3', str(LOCK), '--slots', '2', '--name', 'podman', '--'] + cmd
    (out / 'command.json').write_text(json.dumps(cmd, indent=1) + '\n')
    t = time.time()
    with (out / 'build.log').open('wb') as log:
        rc = subprocess.run(locked, stdout=log, stderr=subprocess.STDOUT).returncode
    # make sure the container is gone even on failure
    subprocess.run(['podman', 'rm', '-f', cname], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    unchanged = all(H((SRC / n).read_bytes()) == d for n, d in planned.items())
    if (out / 'build.log').stat().st_size > 20_000_000:
        import gzip
        (out / 'build.log.gz').write_bytes(gzip.compress((out / 'build.log').read_bytes(), mtime=0))
        (out / 'build.log').write_bytes(b'(compressed to build.log.gz)\n')
    rec = dict(note=a.note, build_tree=rec_tree, returncode=rc, rustc_args=a.rustc_arg, elapsed_seconds=round(time.time() - t, 1),
               container=cname, image=IMAGE, network='none',
               source_manifest_sha256=H((out / 'source-manifest.json').read_bytes()),
               changed_vs_owned_uses=changed, all_planned_source_hashes_unchanged_after_build=unchanged,
               build_log_sha256=H((out / 'build.log').read_bytes()))
    if rc == 0 and so.exists():
        shutil.copyfile(so, out / 'compiler-output.so')
        subprocess.run([str(OBJCOPY), '--strip-all', str(out / 'compiler-output.so'), str(out / 'candidate.so')], check=True)
        rec['compiler_output_sha256'] = H((out / 'compiler-output.so').read_bytes())
        rec['candidate_sha256'] = H((out / 'candidate.so').read_bytes())
        rec['candidate_bytes'] = (out / 'candidate.so').stat().st_size
        r = compare.compare(out / 'candidate.so')
        (out / 'comparison.json').write_text(json.dumps(r, indent=1) + '\n')
        rec['summary'] = {k: r[k] for k in ['differing_payload_positions', 'by_section', 'raw_equal_windows',
                                             'unmatched_windows', 'normalized_matches', 'utilize_bytes',
                                             'utilize_diff_bytes', 'whole_file_equal']}
        if a.emit_ir:
            irs = sorted(list((TGT / 'sbf-solana-solana/release/deps').glob('token_metadata*.ll')) +
                         list((TGT / 'sbf-solana-solana/release').glob('token_metadata*.ll')), key=lambda p: p.stat().st_mtime)
            mirs = sorted(list((TGT / 'sbf-solana-solana/release/deps').glob('token_metadata*.mir')) +
                          list((TGT / 'sbf-solana-solana/release').glob('token_metadata*.mir')), key=lambda p: p.stat().st_mtime)
            if mirs:
                import gzip
                (out / 'token_metadata.mir.gz').write_bytes(gzip.compress(mirs[-1].read_bytes(), mtime=0))
                for q in mirs:
                    q.unlink()
            if irs:
                import gzip
                (out / 'token_metadata.ll.gz').write_bytes(gzip.compress(irs[-1].read_bytes(), mtime=0))
                for q in irs:
                    q.unlink()
    (out / 'result.json').write_text(json.dumps(rec, indent=1) + '\n')
    print(json.dumps({k: rec.get(k) for k in ['returncode', 'elapsed_seconds', 'candidate_sha256', 'summary']}, indent=1))


if __name__ == '__main__':
    main()
