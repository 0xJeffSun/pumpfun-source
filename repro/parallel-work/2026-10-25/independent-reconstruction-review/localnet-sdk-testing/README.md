# Local SDK fixtures for reconstructed Pump programs

This starts a local validator using the four candidate paths in `repro/status.json`, five captured dependency programs (including donation relay), and three captured global configurations. It checks each candidate against its owning build-comparison hash and each dependency against its capture hash. Missing or inconsistent artifacts stop startup; an older binary is never selected as a fallback.

```sh
bash repro/parallel-work/2026-10-25/independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh --dry-run
bash repro/parallel-work/2026-10-25/independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh work/my-fresh-sdk-ledger
```

The ledger path must not exist, and its parent directory must exist. Existing ledgers and symlinks are preserved. The default is `work/sdk-localnet-ledger`. Use another fresh path for another run. `RPC_PORT` defaults to8899; validator ports bind to127.0.0.1. The dry run verifies and prints the exact program IDs, binary hashes, seed hashes and command without launching a validator or creating a ledger. Runtime requires an installed compatible `solana-test-validator`.

These are bounded reconstruction fixtures. Passing saved comparisons does not establish behavioral or ABI identity across every SDK action, historical byte identity, live deployment acceptance, or security completeness. The official IDLs and captured programs are revision-pinned evidence, not a guarantee of current network compatibility.

The three global configurations alone do not prepare user balances, mints, pools, ancestry, Mayhem state or donation relay epoch/debouncer/whitelist accounts. Each tested SDK flow needs its own valid lifecycle setup and target/candidate comparison. Loading the relay closes a missing executable dependency; it does not prove all donation flows work.

Current dispositions and known gaps belong to `repro/status.json` and `repro/completion.json`, reconciled with their owning build/receipt packages. Partial V3 routes, Mayhem creation/initialization, missing Pump incentive/Mayhem dispatches, the confirmed Pump sell_v2 quote-transfer-fee discrepancy and unobserved extension combinations remain outside broad acceptance. PumpSwap create_config has static source but lacks an authentic successful initializer replay. Existing tests for other instructions remain finite; consult their actual cases before treating a new SDK path as supported.
