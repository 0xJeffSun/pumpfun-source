"""Isolated mixed-SDK search build with content-tracked local invalidation."""
from pathlib import Path
import fcntl, hashlib, json, os, shutil, subprocess, sys, time

W = Path(__file__).resolve().parent
label, source_label = sys.argv[1:]
assert Path(label).name == label and label.startswith(('fast-', 'layout-'))
assert Path(source_label).name == source_label and source_label not in ('.', '..')
target = Path(os.environ['MAYHEM_LINUX_TARGET']).resolve()
assert target.parent == W / 'parallel-targets' and target.name.startswith('fast-')
target.mkdir(exist_ok=True)
lock = (target.parent / (target.name + '.lock')).open('a')
fcntl.flock(lock, fcntl.LOCK_EX)
requested = W / source_label / 'programs/mayhem'
stable = W / 'fast-sources' / target.name / 'programs/mayhem'
output = W / (label + '-build'); output.mkdir()
sdk = W / 'layout-lane-linux-target2-sysroot'
sha = lambda p: hashlib.file_digest(p.open('rb'), 'sha256').hexdigest()
inventory = lambda p: {f.relative_to(p).as_posix(): sha(f) for f in p.rglob('*') if f.is_file()}
assert requested.is_dir() and not any(f.is_symlink() for f in requested.rglob('*'))
inputs = inventory(requested)
stable.mkdir(parents=True, exist_ok=True)
for name in list(inventory(stable)):
    if name not in inputs: (stable / name).unlink()
for name, digest in inputs.items():
    dest = stable / name
    if not dest.is_file() or sha(dest) != digest:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes((requested / name).read_bytes())
assert inventory(stable) == inputs

target_inputs = json.loads((W / 'layout-lane-linux-target2-inputs.json').read_bytes())
assert target_inputs['archive_sha256'] == 'fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
for name, digest in target_inputs['files'].items(): assert sha(sdk / name) == digest
strip = Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy')
clang = Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/clang')
ar = clang.parent / 'llvm-ar'
tools = {str(p): sha(p) for p in [sdk / 'bin/rustc', sdk / 'bin/rustdoc', sdk / 'bin/cargo', strip, clang, ar]}
flags = ['--remap-path-prefix=src/=programs/mayhem-program/src/']
flags += json.loads(os.environ.get('MAYHEM_ROOT_RUSTC_ARGS_JSON', '[]'))
assert '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs' in flags
identity = dict(source_inputs=inputs, flags=flags, checked_tools=tools, target_inputs=target_inputs)
state_path = target.parent / (target.name + '.source-state.json')
state = json.loads(state_path.read_bytes()) if state_path.exists() else {}
artifact = target / 'sbpf-solana-solana/release/mayhem_recovered.so'
valid = not state.get('dirty', True) and artifact.is_file() and sha(artifact) == state.get('artifact_sha256')
changed = sorted(name for name in inputs.keys() | state.get('source_inputs', {}).keys()
                 if inputs.get(name) != state.get('source_inputs', {}).get(name))
mode = os.environ.get('MAYHEM_FAST_CLEAN', 'auto')
assert mode in ('auto', 'root', 'all-local', 'full')
full = mode == 'full'
if mode == 'all-local' or not valid or state.get('checked_tools') != tools or state.get('target_inputs') != target_inputs:
    packages = ['mayhem-recovered', 'anchor-lang', 'curve-accounts']
elif mode == 'root': packages = ['mayhem-recovered']
elif any(name.endswith('Cargo.toml') or name.endswith('Cargo.lock') for name in changed):
    packages = []; full = True
elif any(name.startswith('vendor/anchor-lang/') for name in changed):
    packages = ['mayhem-recovered', 'anchor-lang', 'curve-accounts']
elif any(name.startswith('vendor/') for name in changed):
    packages = ['mayhem-recovered', 'curve-accounts']
elif changed or state.get('flags') != flags: packages = ['mayhem-recovered']
else: packages = []

env = os.environ.copy()
overrides = {'RUSTC': str(sdk / 'bin/rustc'), 'RUSTDOC': str(sdk / 'bin/rustdoc'),
             'CARGO_HOME': str(W / 'cargo-home'), 'CARGO_TARGET_DIR': str(target),
             'RUSTUP_HOME': str(W / 'rustup'), 'CARGO_NET_OFFLINE': 'true',
             'CC': str(clang), 'AR': str(ar), 'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix='}
env.update(overrides)
cmd = [str(sdk / 'bin/cargo'), 'rustc', '--manifest-path', str(stable / 'Cargo.toml'),
       '--release', '--target', 'sbpf-solana-solana', '--locked', '--offline', '--verbose', '--jobs', '2', '--', *flags]
record = dict(identity, command=cmd, cwd=str(stable.parent.parent), requested_source=str(requested),
              materialized_source=str(stable), environment_overrides=overrides,
              changed_source_paths=changed, cleaned_packages=packages, full_clean=full,
              controller_sha256=sha(Path(__file__)),
              scope='Search build: isolated stable source, content-driven local package cleaning, reused pinned dependency cache. Acceptance still requires original clean-controller agreement.')
(output / 'launch.json').write_text(json.dumps(record, indent=2) + '\n')
state_path.write_text(json.dumps(dict(identity, dirty=True), indent=2) + '\n')
start = time.monotonic()
with (output / 'stdout').open('wb') as out, (output / 'stderr').open('wb') as err:
    base = [str(sdk / 'bin/cargo'), 'clean', '--manifest-path', str(stable / 'Cargo.toml'), '--release', '--target', 'sbpf-solana-solana']
    if full: subprocess.run(base, cwd=stable.parent.parent, env=env, stdout=out, stderr=err, check=True)
    else:
        for package in packages:
            subprocess.run([*base, '-p', package], cwd=stable.parent.parent, env=env, stdout=out, stderr=err, check=True)
    result = subprocess.run(cmd, cwd=stable.parent.parent, env=env, stdout=out, stderr=err)
report = dict(returncode=result.returncode, seconds=time.monotonic() - start,
              source_unchanged=inputs == inventory(requested) == inventory(stable),
              tools_unchanged=all(sha(Path(p)) == h for p, h in tools.items()),
              target_libraries_unchanged=all(sha(sdk / p) == h for p, h in target_inputs['files'].items()),
              cleaned_packages=packages, full_clean=full,
              stdout_sha256=sha(output / 'stdout'), stderr_sha256=sha(output / 'stderr'),
              root_rustc_invocations=(output / 'stderr').read_text().count('--crate-name mayhem_recovered '))
if result.returncode == 0:
    shutil.copyfile(artifact, output / 'symbols.so')
    subprocess.run([str(strip), '--strip-all', str(output / 'symbols.so'), str(output / 'candidate.so')], check=True)
    report.update(candidate_sha256=sha(output / 'candidate.so'), symbols_sha256=sha(output / 'symbols.so'),
                  candidate_bytes=(output / 'candidate.so').stat().st_size)
(output / 'result.json').write_text(json.dumps(report, indent=2) + '\n')
ok = result.returncode == 0 and report['source_unchanged'] and report['tools_unchanged'] and report['target_libraries_unchanged']
if ok:
    state_path.write_text(json.dumps(dict(identity, dirty=False, artifact_sha256=sha(artifact)), indent=2) + '\n')
print(json.dumps(report, indent=2))
assert ok
