#!/usr/bin/env bash
# Optional local validator with current, hash-checked candidate artifacts.
# Finite regression evidence does not establish full behavioral equivalence.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(git -C "$HERE" rev-parse --show-toplevel)"
PROGRAM_FILES="$(python3 - "$ROOT" <<'PYCODE'
from pathlib import Path
import hashlib, json, sys
root=Path(sys.argv[1]).resolve()
status=json.loads((root/'repro/status.json').read_text())
for name in ['pump','pump_amm','pump_fees','mayhem']:
    row=status[name];relative=Path(row['candidate_artifact'])
    assert not relative.is_absolute() and '..' not in relative.parts
    path=root/relative;report=json.loads((root/row['comparison_report']).read_text())
    assert hashlib.sha256(path.read_bytes()).hexdigest()==report['comparison']['candidate_sha256'],name
    for file,digest in report['source_sha256'].items():
        assert hashlib.sha256((root/file).read_bytes()).hexdigest()==digest,file
    assert '\n' not in str(path)
    print(path)
PYCODE
)"
PROGRAMS=()
while IFS= read -r line; do PROGRAMS+=("$line"); done <<<"$PROGRAM_FILES"
[[ ${#PROGRAMS[@]} -eq 4 ]]
for dependency in spl_token spl_token_2022 associated_token token_metadata; do
  [[ -f "$ROOT/evidence/dependencies/$dependency/deployed.so" ]]
done
for account in pump_global pump_amm_global pump_fees_global; do
  [[ -f "$HERE/seed-accounts/$account.json" ]]
done
if [[ ${1:-} == --check ]]; then
  printf '%s\n' 'Current artifacts, source hashes and retained input files passed preflight; no validator started.'
  exit 0
fi
LEDGER="${1:-$ROOT/work/localnet-sdk-testing}"
RPC_PORT="${RPC_PORT:-8899}"
if [[ -e "$LEDGER" ]]; then
  printf 'Refusing existing ledger path: %s\nChoose a new path.\n' "$LEDGER" >&2
  exit 1
fi
mkdir -p "$(dirname "$LEDGER")"
exec solana-test-validator \
  --ledger "$LEDGER" --quiet --rpc-port "$RPC_PORT" \
  --bpf-program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P "${PROGRAMS[0]}" \
  --bpf-program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA "${PROGRAMS[1]}" \
  --bpf-program pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ "${PROGRAMS[2]}" \
  --bpf-program MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e "${PROGRAMS[3]}" \
  --bpf-program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA "$ROOT/evidence/dependencies/spl_token/deployed.so" \
  --bpf-program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb "$ROOT/evidence/dependencies/spl_token_2022/deployed.so" \
  --bpf-program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL "$ROOT/evidence/dependencies/associated_token/deployed.so" \
  --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s "$ROOT/evidence/dependencies/token_metadata/deployed.so" \
  --account 4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf "$HERE/seed-accounts/pump_global.json" \
  --account ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw "$HERE/seed-accounts/pump_amm_global.json" \
  --account CHqnuTkj6sXDFknM652aEFPECZh9qVsBXWkhPohmV9dA "$HERE/seed-accounts/pump_fees_global.json"
