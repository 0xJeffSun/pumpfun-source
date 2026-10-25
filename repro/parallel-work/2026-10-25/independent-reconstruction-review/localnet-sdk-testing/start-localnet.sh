#!/usr/bin/env bash
# Turnkey local pump.fun validator for SDK integration testing.
# Loads the 4 reconstructed candidate programs + 4 captured dependencies at their
# canonical mainnet program IDs and seeds the 3 captured global-config accounts, all
# from files already tracked in this repo. OFFLINE ONLY: point your SDK at
# http://127.0.0.1:${RPC_PORT:-8899}. It never broadcasts to a real cluster.
#
# The candidates are BEHAVIORALLY identical to mainnet (differential-verified) but NOT
# byte-identical (see BYTE-IDENTICALITY-FUNDAMENTAL-LIMIT.md); behavior is what the SDK
# exercises. See the safe-flow matrix in this folder's README.md for which flows are
# fully covered vs partial vs unavailable.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"   # repo root
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LEDGER="${1:-$HERE/ledger}"; RPC_PORT="${RPC_PORT:-8899}"
rm -rf "$LEDGER"
exec solana-test-validator \
  --ledger "$LEDGER" --reset --quiet --rpc-port "$RPC_PORT" \
  --bpf-program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P "$ROOT/repro/pump/tokenkeg-two-curve-fortyeight/candidate.so" \
  --bpf-program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA "$ROOT/repro/pump_amm/update-event-borrow-v144/candidate.so" \
  --bpf-program pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ "$ROOT/repro/pump_fees/donation-event-account-v144/pump_fees_candidate.so" \
  --bpf-program MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e "$ROOT/repro/mayhem/twentyfour/mayhem_recovered.so" \
  --bpf-program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA "$ROOT/evidence/dependencies/spl_token/deployed.so" \
  --bpf-program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb "$ROOT/evidence/dependencies/spl_token_2022/deployed.so" \
  --bpf-program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL "$ROOT/evidence/dependencies/associated_token/deployed.so" \
  --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s "$ROOT/evidence/dependencies/token_metadata/deployed.so" \
  --account 4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf "$HERE/seed-accounts/pump_global.json" \
  --account ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw "$HERE/seed-accounts/pump_amm_global.json" \
  --account CHqnuTkj6sXDFknM652aEFPECZh9qVsBXWkhPohmV9dA "$HERE/seed-accounts/pump_fees_global.json"
