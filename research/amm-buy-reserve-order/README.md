# AMM buy reserve validation and fee order recovery

This source follow-up to [PR #319](https://github.com/lalalune/pumpfun-source/pull/319)
restores the actual Pool reserve calls in both legacy buy paths, puts ordinary-buy
fee overflow checks on the correct calculations, and recovers the missing
520-byte slippage-total overflow body. It fixes the reserve-origin differences
previously reported by [PR #328](https://github.com/lalalune/pumpfun-source/pull/328).

Review [source.patch](source.patch) or [the proposed buy.rs](proposed/buy.rs).
The proposal changes one of 52 source inputs. It is composed on the pinned,
unmerged 726-window research source; it does not replace the maintained 651
selection or modify its sealed evidence.

| Same native Linux v1.44 / SBPF recipe | Before | After |
| --- | ---: | ---: |
| Injective normalized original windows / 785 | 726 | **727** |
| Raw-equal local bodies | 148 | **148** |
| Lost normalized / raw matches | — | **0 / 0** |
| Ordinary buy bytes (original 9,936) | 10,864 | 10,048 |
| Exact-quote buy bytes (original 12,936) | 13,512 | 13,176 |

The size gaps narrow from 928 to 112 bytes and 576 to 240 bytes respectively;
size alone is not an identity measure. **Both full handlers and the whole ELF
remain unmatched.** The new normalized body is original `0xb3460`, 520 bytes /
58 instructions. Its four immediate callees and seven typed readonly operands
are checked separately, including the `buy.rs:409` Source origin and vtable
function targets. This is not a claim of whole-program data or call closure.

## What was wrong

The original ordinary-buy wrapper at `0xe7648 + 600` calls `0x376b0`.
That handler calls `Pool::available_quote_reserves` at offset 400 and
`Pool::effective_quote_reserves` at 480, before pricing. The exact-quote wrapper
calls `0x3a5a0`, whose corresponding calls are at 2600 and 2680, after transfer
fee adjustment. Neither call was present in either public-726 handler.

Instead, the source performed inline reserve arithmetic whose error closures
had been placed at `buy.rs:387/391/395/404`. Those original closures belong to
later **fee** calculations: quote plus LP fee, then creator fee, then protocol
fee, and gross transfer amount minus pool quote. Signed boundary cases confirm
that creator overflow precedes protocol overflow. The patch restores that
order and the original early reserve validation. `can_boost()` is evaluated
for the event, with its existing non-propagating sum behavior.

The inline fee helper preserves the original error bodies while keeping their
actual callers in the handler. Source placement follows the repository's
coordinate-recovery convention; it does not assert historical whitespace,
comments, helper organization, or exact original Rust. No executable is patched.
`static.json` and `analyze.py` trace wrappers, actual direct targets, and typed
references. Cold block ordering still differs in the unmatched handler.

## Local validation

- The baseline build reproduced both public #319 binaries byte for byte.
- Two normal candidate root compilations produce identical complete stripped
  and unstripped outputs, using unchanged dependency artifacts and source bytes.
  The initial baseline build populated 30 additional dependency artifacts;
  none of the 363 pre-existing ones changed. Both candidate builds preserve
  all 393, and all three root invocations use the same `--extern` paths.
- The final candidate passes all **1,011 legacy buy/exact-quote cases** against
  the original: error/result, signed input, pre/post state, events, inner CPI
  records and return data agree. This run uses the maintained resettable harness.
- Full non-compute-log differences fall **98 → 82**, with **16 newly equal cases
  and zero losses**. Original source coordinates are not removed for this count.
- **25 focused case triples** use a fresh VM for every execution. They include
  reserve overflows, conflicting errors, successful virtual-reserve trades,
  early guards and individual LP/creator/protocol fee overflows. Log differences
  fall **17 → 4**; the four remaining cases are existing zero/disabled guard
  Source-coordinate differences. No functional mismatch or log-match loss.
- The observer independently checks signatures and records the actual loaded
  AMM/dependency hashes: **3,033 full-suite plus 75 focused executions**. These
  are overlapping corpora, not 1,036 claimed unique scenarios.

An earlier 727-window prototype also received a 1,011-case fresh-VM run, but
still reversed creator/protocol overflow origins. Its results are preserved
outside this packet and are **not** attributed to this final candidate.
`experiments.json` records the discarded intermediate builds. The first helper
replacement lost four matching closures; a nested closure lost three by
inlining their constructors. The inline Rust helper retained all four.

All three retained build logs contain inherited backend frame-overwrite
diagnostics for `admin_update_token_incentives`, also present in the byte-exact
public baseline. Cargo exits successfully; this packet does not certify that
unrelated handler. The full 17,462-case AMM corpus was not rerun on this candidate.
There were no live-chain transactions, main-selection edits or external messages.

## Artifact bindings and reproduction

| Artifact | SHA-256 |
| --- | --- |
| Captured original AMM | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Public-726 baseline stripped | `4e58c47139798d743c325c8ee9c3a98f4fd7cc4ceba2d6a5763e66899c4efd25` |
| Final stripped | `c7b988c890217da33f0b77a83c7dfe833b7243ca4727df0041bac23d4163e635` |
| Final symbols | `21526ec16aa17af2b309fa78c5c8c35c9dff5d616540d44d3f3d59edb9406be1` |

Public parent: `63d108022f6be295d9e8e7f697f3024f4aa44fea`,
`research/claude-amm2-integrate-20261027/g02-c726`. `public-parent.patch` and
`public-source.json` bind its source bytes. The retained baseline workspace uses
the existing qualified workspace manifest/lockfile conversion; no source
composition gain is attributed to that conversion.

```sh
python -I -B research/amm-buy-reserve-order/verify.py
python research/amm-buy-reserve-order/materialize.py /tmp/amm-buy-source
python research/amm-buy-reserve-order/rebuild.py \
  --source /tmp/amm-buy-source --sdk /path/to/captured-v144-sdk \
  --cargo-home /path/to/qualified-cargo-home \
  --target-dir /path/to/qualified-build-target --output /tmp/amm-buy-build
```

The Docker image, complete command, source hashes, tools and dependency hashes
are in `builds/*/launch.json`; compiler output is in `build.log.gz`. The replay
retains the original container paths, forces a real root compilation, works
offline and checks both final hashes. It requires the existing qualified local
SDK and Cargo inputs. The inherited `hypothesis` prose in candidate launch
records predates the final fee-order correction; source inventories, logs and
the artifact hashes above bind what was actually compiled.

`controllers/full_final.py` and `controllers/focused_fee_order.py` preserve the
exact local runtime commands/fixtures and paths. They were invoked through
`repro/pump_amm/owner6048-v144/runtime/observe_suite.py`; the corresponding raw
outputs, summaries, observer records and harness-input hashes are under
`runtime/`. `verify.py` reads these receipts, checks their artifact bindings and
recomputes the binary/source findings; it does not claim a fresh compilation or
execution. `overlap-review.json` records the public scope review. Further work
should target the remaining handler body/dataflow differences, not count this
small error helper as full buy recovery.
