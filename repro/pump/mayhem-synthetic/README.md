# Pump `set_mayhem_virtual_params`: synthetic local CPI differential

This package adds a bounded Rust candidate for Pump's previously missing
`set_mayhem_virtual_params` handler. A local-only SBF caller is installed at the
Mayhem program ID inside an in-process LiteSVM. That caller signs the real
off-curve Mayhem `sol-vault` PDA and invokes the captured Pump program. **The
caller is synthetic; no invocation path through deployed Mayhem is proven.**
Nothing here was sent to mainnet or moved real funds.

The saved candidate and receipts were produced from the earlier public Pump48
source. Main now contains a partial native curve path and a serializer change;
the merged source has not been rebuilt or replayed with those additions. The hashes and case counts
below refer to the retained pre-merge candidate.

The [captured IDL excerpt](idl-excerpt.json) specifies selector
`3da9bcbf99952a61`, no arguments, and eight accounts. Account 0 is Mayhem's
writable `sol-vault` PDA signer; account 1 is its token vault; accounts 2–7 are
the mint, Pump Global, Pump BondingCurve, Token-2022 program, event authority,
and Pump program. An independently sealed static disassembly package was
verified before this work: 22 original-ELF windows, 3,927 instructions, 376
branch targets, and 231 direct-call targets. It identifies the handler wrapper
at `0x1255a8`, body at `0x137fc0`, and reserve helper at `0xa23f0`. Its archive
hash is pinned in [build provenance](build-provenance.json); the direct local
execution here tests the relevant arithmetic and event behavior.

The saved [direct-call signer boundary](direct-signer-boundary.json) uses the
same snapshot and a normally signed outer transaction. It fails with
`ConstraintSigner` (2002) and leaves watched accounts unchanged. The synthetic
caller is the only reason the successful body cases become reachable here.

The [signed differential](differential.json.gz) contains 25 target/candidate
transactions. One uses a captured finalized public account snapshot as-is;
the other 24 apply explicit local byte mutations to it. All 25 reach
the Pump handler; 13 succeed. Target and candidate match exactly on transaction
error, watched account bytes/lamports/owners, event log data, inner instructions,
and return data. Cases cover SOL and nonzero-quote thresholds, no-op branches,
reserve caps, checked arithmetic failures (6024), the u128-to-u64 conversion
failure (4102), and selected typed-account/parser failures. The malformed
token-mint bytes in one case are a synthetic state mutation, not a feasible
Token-2022 account-owner mutation on mainnet. Compute-unit logs and source
locations differ; they are outside the equality claim.

The exact candidate also passed [9,161 inherited Pump regression cases](regression/summary.json)
across prior Pump, quote-control, holder-distribution, and nested-create suites,
with zero mismatches. Their compressed executed receipts are retained under
`regression/`. Those older suites require public fixture caches that were
temporarily linked from a sibling checkout; the new 25-case suite and its
snapshot are self-contained in this package.

Two clean v1.44 source builds produced identical candidate SHA-256
`e6f1bf88f45b0bcf834e49fd192247d00431428d28baec7b35e15ae474d0a96a`
(1,497,416 bytes). The deployed Pump ProgramData capture has SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`
(10,485,715 bytes); the first differing byte is offset 24. This is **bounded
behavioral reconstruction, not byte-identical source or full behavior**. The
custom curve deserializer and explicit 4102 error are evidence-based ways to
match observed behavior, not assertions about the historical Rust source.

Verify the saved binaries, source manifest, signed transactions, event values,
and 25-case comparison with the project's Python environment:

```sh
python3 scripts/verify_pump_set_mayhem_params_synthetic.py
```

To reproduce the local execution, build the synthetic caller and Pump candidate
with Solana platform tools v1.44, then run:

```sh
cargo build-sbf --manifest-path research/synthetic-mayhem-cpi/Cargo.toml --tools-version v1.44 -- --locked
cargo build-sbf --manifest-path programs/pump/Cargo.toml --tools-version v1.44 -- --locked
python3 scripts/pump_set_mayhem_params_synthetic_cpi.py \
  --caller research/synthetic-mayhem-cpi/target/deploy/synthetic_mayhem_cpi.so \
  --candidate programs/pump/target/deploy/pump_recovered.so \
  --output /tmp/pump-set-mayhem-synthetic-replay.json
```

The transaction signatures are made by a deterministic test-only payer in the
in-process VM. The synthetic Mayhem caller is kept as source and a pinned ELF
to make the signer boundary explicit. The actual deployed Mayhem initializer
traces previously inspected did not invoke this Pump handler; those two traces
do not establish that no other deployed route exists. Neither this package nor
the static report establishes an exploitable live path, a fund-safety finding,
or a deployable substitute for Pump.
