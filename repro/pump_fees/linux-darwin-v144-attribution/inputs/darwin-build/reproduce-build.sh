#!/bin/sh
set -eu
# Run from repository root with a NEW repository-local output directory.
build_root=${1:?pass a new repository-local output directory}
export CARGO_HOME="${CARGO_HOME:-$PWD/work/fees-v144-cargo-home}"
python3 - "$build_root" <<'PY'
from pathlib import Path
import hashlib,json,sys,tarfile
root=Path.cwd().resolve();pub=root/'repro/pump_fees/readme-provenance-v144';dest=Path(sys.argv[1]).resolve()
assert dest.is_relative_to(root) and not dest.exists(), 'Use a new repository-local directory'
sha=lambda b:hashlib.sha256(b).hexdigest()
for n,h in json.loads((pub/'build-helper-sha256.json').read_text()).items():
 assert sha((root/n).read_bytes())==h, f'Restore the recorded helper in a separate checkout: {n}'
expected=json.loads((pub/'source-sha256.json').read_text());dest.mkdir(parents=True)
with tarfile.open(pub/'source-snapshot.tar.gz','r:gz') as archive:
 actual={m.name:sha(archive.extractfile(m).read()) for m in archive if m.isfile()}
 assert actual==expected and len(actual)==22
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
expected=Path('repro/pump_fees/readme-provenance-v144/pump_fees_candidate.so')
assert binary.read_bytes()==expected.read_bytes(), 'Fresh ELF differs; preserve the new build records'
print(hashlib.sha256(binary.read_bytes()).hexdigest())
PY
