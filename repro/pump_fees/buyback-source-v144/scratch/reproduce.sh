#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
output_root="${1:?Pass a NEW repository-local output directory}"
export CARGO_HOME="${CARGO_HOME:-$PWD/work/fees-v144-cargo-home}"
python3 - <<'PY'
import hashlib,json,pathlib
root=pathlib.Path('work/fees-body-followup')
record=json.loads((root/'trial-provenance.json').read_text())
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py']:
 saved=root/'harness'/name
 actual=pathlib.Path('scripts')/name
 assert hashlib.sha256(saved.read_bytes()).hexdigest()==record['harness_sha256'][str(saved)]
 assert saved.read_bytes()==actual.read_bytes(),f'Historical helper changed: {actual}; reproduce in a separate checkout with recorded helper before continuing'
for trial in ['macro','macro-box','typed-macro-box']:
 attempt=json.loads((root/(trial+'-build')/'build-attempt.json').read_text())
 for p,digest in attempt['source_sha256'].items():
  assert hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()==digest,p
PY
for trial in macro macro-box typed-macro-box; do
  python3 scripts/build_partial_candidate.py \
    --manifest "work/fees-body-followup/${trial}-workspace/programs/pump-fees/Cargo.toml" \
    --program pump_fees --artifact-name pump_fees_candidate.so --tools-version v1.44 \
    --output "$output_root/$trial" \
    --extra-input "work/fees-body-followup/${trial}-workspace/programs/pump-fees/README.md"
done
