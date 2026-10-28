"""New Linux SDK experiment; never retags the published mixed-host receipts."""
from pathlib import Path
import fcntl
import hashlib
import json
import os
import shutil
import subprocess
import sys
import time

W = Path(__file__).resolve().parent
SDK = W.parent / 'mayhem-sdk/v1.54'
label, source_path = sys.argv[1:]
assert Path(label).name == label
profile = Path(source_path).resolve()
source = W / 'baseline-source/programs/mayhem'
out = W / (label + '-build')
out.mkdir()
target = W / 'native-target'
lock = (W / 'native-target.lock').open('a')
fcntl.flock(lock, fcntl.LOCK_EX)
digest = lambda p: hashlib.file_digest(p.open('rb'), 'sha256').hexdigest()
inventory = lambda p: {f.relative_to(p).as_posix(): digest(f)
                     for f in sorted(p.rglob('*')) if f.is_file()}
source_map = inventory(profile)
source.mkdir(parents=True, exist_ok=True)
for path in source.rglob('*'):
    if path.is_file():
        assert path.relative_to(source).as_posix() in source_map, 'unexpected active build input'
for path in profile.rglob('*'):
    if path.is_file():
        dest = source / path.relative_to(profile)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(path.read_bytes())
assert inventory(source) == source_map
tools = {k: SDK / v for k, v in dict(rustc='rust/bin/rustc', cargo='rust/bin/cargo',
    rustdoc='rust/bin/rustdoc', clang='llvm/bin/clang', ar='llvm/bin/llvm-ar',
    strip='llvm/bin/llvm-objcopy').items()}
tool_hashes = {str(p): digest(p) for p in tools.values()}
env = os.environ.copy()
overrides = {'RUSTC': str(tools['rustc']), 'RUSTDOC': str(tools['rustdoc']),
    'CARGO_HOME': str(W / 'cargo-home'), 'RUSTUP_HOME': str(W / 'rustup-home'),
    'CARGO_TARGET_DIR': str(target), 'CARGO_NET_OFFLINE': 'true',
    'CC': str(tools['clang']), 'AR': str(tools['ar']),
    'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix='}
env.update(overrides)
cmd = [str(tools['cargo']), 'rustc', '--manifest-path', str(source / 'Cargo.toml'),
    '--release', '--target', 'sbpf-solana-solana', '--locked', '--offline',
    '--verbose', '--jobs', '2', '--',
    '--remap-path-prefix=src/=programs/mayhem-program/src/',
    '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
record = dict(command=cmd, cwd=str(source.parents[1]), immutable_profile=str(profile), environment_overrides=overrides,
    source_inputs=source_map, checked_tools=tool_hashes, controller_sha256=digest(Path(__file__)),
    archive=json.loads((W.parent / 'mayhem-sdk/archive-receipt.json').read_bytes()),
    scope='New official Linux v1.54 native build, separate from all historical mixed/Darwin/Windows artifacts; originals are never build inputs')
(out / 'launch.json').write_text(json.dumps(record, indent=2) + '\n')
start = time.monotonic()
with (out / 'stdout').open('wb') as stdout, (out / 'stderr').open('wb') as stderr:
    run = subprocess.run(cmd, cwd=source.parents[1], env=env, stdout=stdout, stderr=stderr)
result = dict(returncode=run.returncode, seconds=time.monotonic() - start,
    source_unchanged=inventory(source) == inventory(profile) == source_map,
    tools_unchanged=all(digest(Path(p)) == h for p, h in tool_hashes.items()),
    stdout_sha256=digest(out / 'stdout'), stderr_sha256=digest(out / 'stderr'))
if run.returncode == 0:
    shutil.copyfile(target / 'sbpf-solana-solana/release/mayhem_recovered.so', out / 'symbols.so')
    subprocess.run([str(tools['strip']), '--strip-all', str(out / 'symbols.so'),
                    str(out / 'candidate.so')], check=True)
    result.update(symbols_sha256=digest(out / 'symbols.so'),
        candidate_sha256=digest(out / 'candidate.so'), candidate_bytes=(out / 'candidate.so').stat().st_size)
(out / 'result.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
assert run.returncode == 0 and result['source_unchanged'] and result['tools_unchanged']
