# Reproducing the cashback witness

Run from a full checkout of the repository. The verifier requires Python 3
with the version of `solders` used by the maintained LiteSVM scripts.

```bash
python3 research/amm-cashback-signed-verification-20261028/verify.py
python3 research/amm-cashback-signed-verification-20261028/test_producer_guards.py
python3 research/amm-cashback-signed-verification-20261028/test_negative_controls.py
python3 -O research/amm-cashback-signed-verification-20261028/test_producer_guards.py
python3 -O research/amm-cashback-signed-verification-20261028/test_negative_controls.py
```

To regenerate the receipt, decompress the authenticated Union10 source-only
candidate and execute the maintained producer:

```bash
gzip -dc research/claude-amm-union10-20261028/builds/a/candidate.so.gz > /tmp/union10-candidate.so
python3 research/amm-cashback-signed-verification-20261028/produce_cashback_receipt.py \
  --candidate /tmp/union10-candidate.so \
  --output /tmp/cashback-union10.json
```

The expected uncompressed JSON SHA-256 is
`a3f2502875b21e1a46a6e180d01a12ac6504bf6e3101125db66b8e5c03c658f9`.
The checked-in deterministic gzip has SHA-256
`4f0a90e6edada0b5f46a80d1cec43da80a3c5dd1ae63ca19378e8f6f27a3e720`.

The packet-local producer performs local LiteSVM execution only. It does not use RPC or
send transactions to a live cluster.
