# PumpSwap dependency and liquidity recovery

This checkpoint reconstructs the token-burn wrapper, the liquidity boost predicate,
Pool helper interfaces, and deposit error precedence. Its candidate is
`5cd7879af0d9733d1f7d3847be46aa4c5ff214fca2250d1c69d03c49cbc85d1a`.

It matches **586/785 normalized original windows (74.6%)**, including two new
complete bodies: the 1,616-byte burn wrapper and the 224-byte boost predicate.
There are **123 raw-equal bodies, 463 normalized-only matches and 199 unmatched
windows**. Matched original text totals **644,456/1,162,040 bytes**. Complete ELF
identity and original source/build provenance remain unproved.

## Recovered behavior and source structure

- The burn wrapper clones the original CPI accounts and invokes token-interface
  burn, including for zero amounts. Withdraw updates LP supply before the boost
  predicate and preserves the original quote-account clone/decode order.
- Deposit checks the base amount limit before quote transfer-fee decoding. Four
  retained signed counterexamples previously returned overflow instead of the
  original slippage error; this candidate matches the original.
- The boost predicate uses the original result-to-default/nonzero operation.
  Its complete 224-byte normalized body matches.
- Pool fee totals, available quote, market cap, and virtual quote totals use the
  recovered method interfaces and arithmetic order. Deposit again passes the
  Pool reference and quote amount directly, removing promoted fee-field loads.
  These Pool bodies still differ in real source path/line immediates; they are
  not counted as complete matches.
- Eight coherent Solana dependency versions use authentic registry archives.
  Three actual Pubkey panic/formatter descriptors now match the original source
  locations. The dependency proof binds 161 archive files and eight Cargo
  metadata files, alongside all 41 local source inputs. The exact historical
  dependency lock is still unknown.

Raw-equal count decreases by one from the preceding checkpoint: eleven call
operands in one transfer-fee packing body now address a relocated, independently
normalized-identical `RawVec::grow_one`. The caller remains a complete normalized
match. The saved comparison reports every changed operand; no binary padding,
executable patches, invented diagnostics, or relaxed normalization are used.

## Verification

Two strict offline Linux v1.44 SBPF builds produce identical stripped and
unstripped artifacts. All **210 recorded source inputs** and **732 cached
dependency artifacts** remain unchanged during each build.

Fresh execution passes all **17,462 corpus cases**, with **35,074 executions**,
**35,418 verified signature fields**, and **17,537 identical signed-message
pairs**. Every previously retained supplemental suite was rerun against this
candidate, including 1,485 error-order cases, 1,996 fee/curve boundary cases,
account validation, CPI, transfer, mint, Pool decoder and event cases.

Another 1,350 focused cases bind complete recorded logs to 2,700 signed
transactions. Seventy-six additional virtual-reserve/boost cases bind 152 signed
transactions, including full account snapshots where recorded. These counts
overlap the corpus and each other and must not be added as unique coverage.
The four failing deposit baseline cases remain independently authenticated.

The verifiers compare all recorded result fields. Log normalization removes only
source coordinates and compute-consumption lines. Older corpus fixtures that
omitted complete logs retain that limitation. The new static Pool ABI report
checks the exact selected candidate independently of runtime probes.

```sh
work/test-env/bin/python -B repro/pump_amm/dependency-liquidity-recovery-20261027/verify_saved.py
```

Add `--current-source` to require the maintained source inventory to equal this
build. The result manifest SHA-256 is `4b015b381eba19ea7a627b3d0e7e8e78fae7d12522e195e264cfa7176b04deb6`.

Remaining work includes 199 original windows, full referenced-data and indirect
call identity, source layout and historical toolchain provenance, and authentic
fixed-admin `create_config` success. This is an intermediate reconstruction.
