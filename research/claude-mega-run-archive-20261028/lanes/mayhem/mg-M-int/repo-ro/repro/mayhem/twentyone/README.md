# Mayhem twenty-one-handler checkpoint

This clean main-source candidate adds quote-aware `sell_v2` to the preserved
20-handler checkpoint. It is 502,192 bytes, SHA256
`7d09ec1f87583376c52f0b18a7d890429fa7ae761a94eb6d0c640f0a1f0e5a55`.
The entire file matches both independent scratch builds. The captured 777,408-byte
original first differs at byte 24, with 272,724 differences across the shared
length. This is bounded source recovery: historical source/build identity and
complete program equivalence remain unresolved. No executable bytes were patched
or embedded into the candidate. The older `../twenty/` package is preserved.

There are **5,260 instruction comparisons across twelve suite runs**, accounting
for **10,520 original/candidate signed transactions**. New sell_v2 coverage has
473 cases for each of three quote families:

| Quote family | Successes | Rejections | Comparisons |
| --- | ---: | ---: | ---: |
| Native SOL | 176 | 297 | 473 |
| Legacy SPL Token | 121 | 352 | 473 |
| Token-2022 | 121 | 352 | 473 |
| Total new coverage | 418 | 1,001 | 1,419 |

All 3,841 previous comparisons also pass on the same candidate bytes: 2,953
admin/recipient/extension/withdrawal/quote/sweep cases, 396 legacy sells, 486
legacy buys and six comparisons in three genuine captured burn sequences.
The three new families were rerun from final repository paths against the clean
main artifact, and the burn sequence was also rerun with the main artifact path.
The eight inherited suite receipts bind the same candidate hash. Six older
runners record the then-current main20 source hashes; the actual main21 source
closure is bound by `build-comparison.json` and `source-snapshot.tar.gz`.
The preserved main20 source snapshot is included for those recorded hashes.

`sell_v2` validates 31 outer accounts and executes the real 26-account Pump CPI
in outer-index order
`[12,3,4,10,11,5,15,16,29,30,13,17,14,8,6,7,18,19,20,23,24,25,26,9,21,22]`.
The writable trader must sign and match GlobalParams. Typed token/mint owners,
PDA/ATA relations, System, Token-2022 and Mayhem program constraints remain intact.
Mayhem itself signs its actual sol-vault PDA. Price, rate, deadline, reserve and
retained-budget guards precede CPI. Native and token quotes select distinct
GlobalParams cap/threshold/counter positions (16/129/113 versus 182/222/206).
Actual received lamports or quote tokens drive checked signed-i128 accounting.
Both quote families share the state's quote counter at 56 and token counter at
72. Token-quote events zero native-specific fields while retaining all generic
quote fields. Complete 303-byte log and event-self-CPI payloads agree.

Original and candidate VMs process byte-identical signed transactions with
signature and blockhash checks enabled. Trader/payer keys and stored authority
are explicitly test-owned; starting business states are synthetic. All watched
account bytes, balances and metadata, errors, return data, events and inner calls
agree. Only the deliberately different Mayhem executable account is excluded
from cross-binary equality; both binary hashes remain recorded. The independent
verifier checks every signature, each successful quote/CPI/state/event and each
failed rollback from saved starting bytes. No VM or RPC is used by that verifier.
No live authority, historical prestate, full historical replay, initializer
workaround or authorization weakening is claimed.

Four cases in each sell_v2 family retain explicit normalized diagnostic
differences: `interval_overflow`, `retained10001`, `retained65535`, and
`quote_extreme_1_0_1`. Errors and complete rollback agree; source locations,
compute usage and the additional Option-unwrapping panic text are not identical.
Existing buy/sell/burn diagnostic caveats remain. Invalid cached-executable
mutations were rejected during simulator fixture construction and excluded from
the runnable inventory. An initial short-data fixture exception was fixed by
explicitly extending synthetic malformed data. Both failed attempts and their
logs remain archived, and neither is counted as a program rejection.

`runtime-manifest.json`, `test-source-sha256.json` and their snapshots bind the
runner, verifier, input captures and build helpers, including
`build_source_manifest.py`. Static original-byte-checked excerpts and retained
research attempts are archived separately. `buy_v2`, `buy_pump_swap`,
`sell_pump_swap` and `initialize_mayhem_state` remain absent.

```sh
python3 scripts/mayhem_sell_v2_differential.py \
  --candidate repro/mayhem/twentyone/mayhem_recovered.so \
  --cases repro/mayhem/twentyone/sell-v2-cases.json --family native \
  --output work/mayhem21-native.json
python3 scripts/verify_mayhem_sell_v2.py \
  --candidate repro/mayhem/twentyone/mayhem_recovered.so \
  --receipts work/mayhem21-native.json --output work/mayhem21-native-verification.json
```

Repeat with `--family token` and `--family token22`. The verifier also accepts
saved `.json.gz` reports. Extract `captured-fixtures.tar.gz` into a new work
directory for the portable burn sequence/verification scripts as documented in
the preserved nineteen-handler package.
