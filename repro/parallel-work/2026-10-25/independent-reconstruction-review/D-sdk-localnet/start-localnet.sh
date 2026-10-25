#!/usr/bin/env bash
# Local-only pump.fun candidate localnet for SDK integration testing.
# Loads the 4 reconstructed candidate programs + 4 captured dependencies at their
# canonical mainnet program IDs, and seeds the 3 captured global-config accounts.
# OFFLINE ONLY. This points an SDK at http://127.0.0.1:8899 / ws://127.0.0.1:8900.
# It never broadcasts to any real cluster.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
P="$HERE/programs"
A="$HERE/seed-accounts"
LEDGER="${1:-$HERE/ledger}"
RPC_PORT="${RPC_PORT:-8899}"

rm -rf "$LEDGER"
exec solana-test-validator \
  --ledger "$LEDGER" --reset --quiet --rpc-port "$RPC_PORT" \
  --bpf-program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P "$P/pump.so" \
  --bpf-program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA "$P/pump_amm.so" \
  --bpf-program pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ "$P/pump_fees.so" \
  --bpf-program MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e "$P/mayhem.so" \
  --bpf-program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA "$P/spl_token.so" \
  --bpf-program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb "$P/spl_token_2022.so" \
  --bpf-program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL "$P/associated_token.so" \
  --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s "$P/token_metadata.so" \
  --account 4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf "$A/pump_global.json" \
  --account ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw "$A/pump_amm_global.json" \
  --account CHqnuTkj6sXDFknM652aEFPECZh9qVsBXWkhPohmV9dA "$A/pump_fees_global.json"
