# Mayhem twenty-two-handler checkpoint

This clean main-source candidate adds quote-aware `buy_v2` to the preserved
21-handler checkpoint. It is 547,048 bytes, SHA256
`eb5bef8c1aece35a528a4f833c29e2e831093996f9940122e13f8472697198cd`.
The entire file matches the independently built and tested scratch candidate.
The captured 777,408-byte original first differs at byte 24, with 297,071 differing
positions in the shared length. Historical source/build identity and complete
program equivalence remain unresolved. No executable bytes were patched or
embedded into the source build. The `../twentyone/` package is preserved.

There are **7,099 instruction comparisons across fifteen suite runs**, accounting
for **14,198 original/candidate signed transactions**. New buy_v2 coverage has
613 synthetic cases for each of three quote families:

| Quote family | Successes | Rejections | Comparisons |
| --- | ---: | ---: | ---: |
| Native SOL | 284 | 329 | 613 |
| Legacy SPL Token | 210 | 403 | 613 |
| Token-2022 | 210 | 403 | 613 |
| Total new coverage | 704 | 1,135 | 1,839 |

All 5,260 previous comparisons also pass on the same candidate bytes. The three
new families and genuine burn sequences were rerun from final repository paths.
Eleven inherited suite receipts bind the identical candidate hash. Six older
runners retain the then-current main21 source hashes; the predecessor source
snapshot is included. Actual main22 source inputs are bound by
`build-comparison.json` and `source-snapshot.tar.gz`.

`buy_v2` uses 32 outer accounts and the actual 27-account Pump buy CPI, in outer
index order `[12,3,4,10,11,5,15,16,30,31,13,17,14,8,6,7,18,19,20,23,24,25,26,27,9,21,22]`.
The writable trader must sign and match GlobalParams; typed ownership, PDA/ATA,
System, Token-2022 and self-program constraints remain active. The global-volume
account is unchecked and may be read-only. A first draft inherited an unnecessary
mut constraint; all three original/candidate matrices isolated that difference.
The corrected candidate was rebuilt from clean source and fully retested, while
the first build and complete negative receipts remain archived.

Reserve arithmetic sets a quote budget from current vault tokens, the configured
cap and retained real quote reserves. Desired tokens are capped by real token
reserves. Pump receives token output, maximum quote and a false trailing flag.
Actual quote spent and tokens acquired update checked signed-i128 counters.
Native global accounting/overall/per-coin positions are 113/32/40; token quote
positions are 206/190/198. State counters at 56/72 are shared. The original tests
signed positivity before comparing the low u64 limb against strict upper limits;
the same behavior is reproduced for explicitly synthetic extreme counters.
Risk rejection rolls back all Pump and Mayhem changes. Complete 303-byte events
zero native-only fields for token quotes and retain the generic quote tail.

The three new matrices compare full watched account bytes, metadata and balances,
errors, return data, event bytes and inner instructions. VMs process byte-identical
transactions signed by test-owned payer/trader keys, with signature and blockhash
checks enabled. Mayhem signs its real sol-vault PDA during actual Pump CPI. Only
the intentionally different Mayhem executable account is excluded from cross-
binary equality; both executable hashes remain recorded. Independent saved-receipt
checks validate all signatures, successful quote/CPI/state/event bytes, risk
limits and failed rollback without executing a VM or RPC.

Fixtures cover all outer account omissions, typed/ATA/owner/program constraints,
truncation, flags, curve prefixes, price/cap/reserve limits, real-token caps,
funding depletion, quote selection, volume state, strict risk limits, signed
counter boundaries and post-CPI failures. Stored authorities and starting business
states are synthetic and test-owned. No live authority, historical prestate,
full historical replay, foreign signature or initializer workaround is claimed.
Four panic diagnostics per new family remain recorded: rate-add overflow,
retained basis points 10001/65535 and zero virtual quote. Errors and full rollback
agree; compute usage, source locations and additional Option-unwrapping text do
not. Existing buy/sell/sell_v2/burn diagnostic caveats remain.

Runtime, source and test snapshots bind input captures, scripts, independent
verifiers and build helpers, including `build_source_manifest.py`. Static excerpts
are checked against original instruction bytes. Earlier invalid simulator fixture
constructions remain separate from program rejection counts. `buy_pump_swap`,
`sell_pump_swap` and `initialize_mayhem_state` remain absent.

```sh
python3 scripts/mayhem_buy_v2_differential.py \
  --candidate repro/mayhem/twentytwo/mayhem_recovered.so \
  --cases repro/mayhem/twentytwo/buy-v2-cases.json --family native \
  --output work/mayhem22-native.json
python3 scripts/verify_mayhem_buy_v2.py \
  --candidate repro/mayhem/twentytwo/mayhem_recovered.so \
  --receipts work/mayhem22-native.json --output work/mayhem22-native-verification.json
```

Repeat for `--family token` and `--family token22`. The verifier also accepts saved
compressed reports. Extract `captured-fixtures.tar.gz` into a new work directory
for the portable burn sequence and verification scripts.
