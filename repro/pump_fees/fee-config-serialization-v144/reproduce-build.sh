#!/bin/sh
set -eu
# Run from repository root with a NEW repository-local directory.
build_root=${1:?pass a new repository-local output directory}
export CARGO_HOME="${CARGO_HOME:-$PWD/work/fees-v144-cargo-home}"
python3 - "$build_root" <<'PY'
from pathlib import Path
import hashlib,json,sys,tarfile
root=Path.cwd().resolve();pub=root/'repro/pump_fees/fee-config-serialization-v144';dest=Path(sys.argv[1]).resolve()
assert dest.is_relative_to(root) and not dest.exists(), 'Use a new repository-local directory'
hashes=json.loads((pub/'harness-source-sha256.json').read_text())
for n in ['scripts/build_partial_candidate.py','scripts/build_source_manifest.py','scripts/compare.py']:
 assert hashlib.sha256((root/n).read_bytes()).hexdigest()==hashes[n],f'Restore recorded helper in a separate checkout before reproducing: {n}'
expected=json.loads((pub/'source-sha256.json').read_text());dest.mkdir(parents=True)
with tarfile.open(pub/'source-snapshot.tar.gz','r:gz') as archive:
 actual={m.name:hashlib.sha256(archive.extractfile(m).read()).hexdigest() for m in archive if m.isfile()}
 assert actual==expected
 archive.extractall(dest/'source',filter='data')
PY
python3 scripts/build_partial_candidate.py \
  --manifest "$build_root/source/programs/pump-fees/Cargo.toml" \
  --program pump_fees --artifact-name pump_fees_candidate.so --tools-version v1.44 \
  --output "$build_root/build" --extra-input "$build_root/source/programs/pump-fees/README.md"
python3 - "$build_root" <<'PY'
from pathlib import Path
import hashlib,sys
binary=Path(sys.argv[1])/'build/artifacts/pump_fees_candidate.so'
expected=Path('repro/pump_fees/fee-config-serialization-v144/pump_fees_candidate.so')
assert binary.read_bytes()==expected.read_bytes(), 'Fresh ELF differs; retain and inspect the new build records'
print(hashlib.sha256(binary.read_bytes()).hexdigest())
PY
