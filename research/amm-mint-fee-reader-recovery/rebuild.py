"""Rebuild the archived source offline using explicit existing SDK and Cargo mounts."""
from pathlib import Path, PurePosixPath
from io import BytesIO
import argparse, gzip, hashlib, json, subprocess, tarfile, time, tomllib
if not __debug__: raise SystemExit('Rebuild requires Python without -O')
HERE = Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
p = argparse.ArgumentParser(description=__doc__)
for name in ('sdk', 'cargo-home', 'target-dir', 'strip-tool', 'output'):
    p.add_argument('--' + name, type=Path, required=True)
p.add_argument('--variant', choices=('parent', 'proposal'), default='proposal')
a = p.parse_args()
evidence = json.loads((HERE / 'evidence.json').read_text())
spec = evidence['builds'][a.variant]
launch = json.loads(gzip.decompress((HERE / spec['launch']).read_bytes()))
expected = json.loads(gzip.decompress((HERE / spec['result']).read_bytes()))
record = json.loads(gzip.decompress((HERE / 'builds/recorded-build.json.gz').read_bytes()))
env = record['environment']
a.output.mkdir(parents=True, exist_ok=False)
source = a.output.resolve() / 'source'; source.mkdir()
with tarfile.open(fileobj=BytesIO((HERE / evidence['archives'][a.variant]['path']).read_bytes()), mode='r:gz') as stream:
    for m in stream.getmembers():
        name = PurePosixPath(m.name)
        assert m.isfile() and not name.is_absolute() and '..' not in name.parts
        target = source / m.name; target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(stream.extractfile(m).read())
inputs = {str(f.relative_to(source)): sha(f) for f in source.rglob('*') if f.is_file()}
assert inputs == launch['inputs']
for name, value in launch['tool_sha256'].items(): assert sha(a.sdk / name) == value, name
assert sha(a.strip_tool) == expected['strip_sha256']
# Verify all locked registry archives before invoking Cargo.
packages = tomllib.loads((source / 'Cargo.lock').read_text())['package']
for package in packages:
    if not package.get('source', '').startswith('registry+'): continue
    name = f"{package['name']}-{package['version']}.crate"
    matches = list((a.cargo_home / 'registry/cache').glob('*/' + name))
    assert matches and all(sha(f) == package['checksum'] for f in matches), name
command = list(launch['command'])
mounts = [i + 1 for i, item in enumerate(command) if item == '--mount']
assert len(mounts) == 4
for i, path in zip(mounts, (source, a.sdk, a.cargo_home, a.target_dir)):
    parts = command[i].split(',')
    assert parts[0] == 'type=bind' and parts[1].startswith('source=')
    parts[1] = 'source=' + str(path.resolve()); command[i] = ','.join(parts)
(a.output / 'command.json').write_text(json.dumps(command, indent=2) + '\n')
start = time.monotonic()
with (a.output / 'build.log').open('wb') as log:
    result = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT)
result.check_returncode()
log = (a.output / 'build.log').read_bytes()
assert log.count(b'--crate-name pump_amm_recovered ') == 1, 'Root crate was not really recompiled'
symbols = a.output / 'symbols.so'
symbols.write_bytes((a.target_dir / 'sbpf-solana-solana/release/pump_amm_recovered.so').read_bytes())
candidate = a.output / 'candidate.so'
subprocess.run([str(a.strip_tool.resolve()), '--strip-all', str(symbols), str(candidate)], check=True)
assert {str(f.relative_to(source)): sha(f) for f in source.rglob('*') if f.is_file()} == inputs
hashes = {kind + '_sha256': sha(path) for kind, path in [('candidate', candidate), ('symbols', symbols)]}
assert all(expected[key] == value for key, value in hashes.items()), hashes
(a.output / 'result.json').write_text(json.dumps(dict(**hashes, elapsed_seconds=time.monotonic()-start, source_unchanged=True, compiled_root=True), indent=2) + '\n')
print(json.dumps(hashes))
