# Recover the complete AMM exact-base buy quote helper

This source change recovers original AMM `quote_for_base` at `0x119c8`, used by
ordinary `buy` and `trade_v2::execute_buy`. Review [source.patch](source.patch)
and [proposed/constant_product.rs](proposed/constant_product.rs).

| Same native Linux v1.44 / SBPF build | Baseline | Candidate |
| --- | ---: | ---: |
| Injective normalized original bodies / 785 | 727 | **728** |
| Raw-equal bodies | 148 | **148** |
| Lost normalized / raw matches | — | **0 / 0** |
| Quote helper bytes (original 1,192) | 1,168 | **1,192** |
| Full helper instruction count | 135 | **138** |

The complete 138-instruction body now matches after relocating call and data
operands. Its **nine direct calls and eleven typed data references** also
match independently, in `.rodata`/`.data.rel.ro`, including both error origins (`constant_product.rs:21/24`),
`ceil_div`, the multiplication runtime, and vtable targets. The two actual
incoming calls are traced in `static.json`. This does not claim raw equality of
the helper, transitive whole-program call closure, full buy-handler equality,
or whole-ELF identity.

## Source and compiler cause

The baseline subtracts two `u64` reserves, then widens the denominator to `u128`.
Original machine code retains the high-word borrow calculation for a **128-bit
subtraction**. LLVM IR confirms the baseline `sub nuw i64` followed by extension.
Casting before `checked_sub` restores the original arithmetic and function size,
but initially leaves fourteen stack operands displaced by 24 bytes.

The remaining difference comes from temporary lifetime, not padding. When the
checked denominator is calculated before `ceil_div`, LLVM merges the call's
24-byte Result slot into a disjoint AnchorError slot. Calculating the checked
denominator **as a call argument** starts that Result's lifetime before the
underflow-error path, preventing that merge. The final frame puts it at `SP-304`,
the multiplication result at `SP-320`, and the two error returns at `SP-336/-352`,
matching the original. The patch also restores the observed error-source lines.

`compiler/` retains qualified diagnostic invocations, full filtered compiler
logs, and selected frontend/optimized LLVM and machine passes. Each diagnostic
build reproduces its corresponding normal **stripped** ELF; extra IR/MIR emits
change the unstripped artifact. The selected passes cover stack coloring and
frame finalization. No synthetic padding, inline assembly, unsafe storage,
compiler flag changes, or binary patching were used.

`experiments.json` preserves the unsuccessful controls: width only, nested
conversion, `and_then`, named Result, and separate extraction. The last two
produce identical stripped bytes; they were not counted as separate gains.
Naming the Result prevents stack merging but changes load/branch scheduling.
The final argument placement restores both lifetime and scheduling. The prior
compressed math-and-decoder archive was read before these experiments; its
relevant eleven source variants retained the old `u64` subtraction.

## Baseline and scope

The baseline is the actual 727-body source/artifact from
[PR #374](https://github.com/lalalune/pumpfun-source/pull/374), pinned at
`31b09a5f4067d20dbaf2d19dde13419acb338318`, composed on
[PR #319](https://github.com/lalalune/pumpfun-source/pull/319) at
`63d108022f6be295d9e8e7f697f3024f4aa44fea`. Both 52-input source workspaces are
included here; **only `curve/constant_product.rs` changes**. This packet is
self-contained for verification and source materialization. It does not change
the maintained 651-body selection or rewrite earlier sealed evidence.

The retained baseline normal build is from #374, not a newly claimed execution.
Two fresh candidate normal root builds produce identical stripped and unstripped
ELFs, with all 393 dependency artifacts unchanged and the same tool hashes and
root `--extern` paths. Existing backend frame-overwrite diagnostics for unrelated
`admin_update_token_incentives` remain in all normal logs; Cargo exits zero. This
change does not establish safety or correctness of that unrelated handler.

Latest public scope review is saved in `overlap-review.json`. The source-coordinate
lane had already recovered `base_for_buy`; this patch addresses the distinct
`quote_for_base` arithmetic and lifetime. The layout lane changes link order.
No same-source patch appeared in the reviewed open/recent AMM PRs.

## Local execution

All executions load the captured original, the exact 727 baseline and the exact
728 candidate, with independent signature verification and loaded-program hashes.

- **1,011 legacy buy/exact-quote case triples:** equal signed transaction input,
  result/error, pre/post account state, events, CPI records and return data.
  Non-compute-log mismatches fall **82 to 78**, four new matches and no losses.
  This uses the existing resettable VM harness.
- **24 focused case triples, fresh VM for every execution:** twelve boundaries
  through each of `buy` and `buy_v2`, including reserve underflow, denominator
  zero/one, rounding, wide products, u64 limits and truncation. Full transaction,
  before/after state and return data are observed for v2 as well. No functional
  mismatch. Non-compute-log differences fall **6 to 2**: underflow and truncation
  origins are fixed in both paths. The two residuals are pre-existing zero-amount
  guard source coordinates. Some otherwise valid legacy fixtures reach the
  later buyback-recipient authorization error; they are not claimed as successful
  trades. Successful v2 cases and the full legacy corpus cover success paths.

There are 3,033 full-suite and 72 focused signed executions. The corpora overlap;
these are not claimed as 1,035 distinct scenarios. The complete 17,462-case AMM
corpus was not run for this candidate. All execution is local; no chain writes.

| Artifact | SHA-256 |
| --- | --- |
| Captured original | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| 727 baseline stripped | `c7b988c890217da33f0b77a83c7dfe833b7243ca4727df0041bac23d4163e635` |
| 728 candidate stripped | `37f3fdbace558971111418e34d539c0786724e9288dfec5f17e18e5452a3a497` |
| 728 candidate symbols | `dcc05791c1cdcca1f71485b16af5c436da4d7a81a234f1b645454bf333978570` |

## Reproduction

```sh
python -I -B research/amm-quote-base-recovery/verify.py
python research/amm-quote-base-recovery/materialize.py /tmp/amm-quote-source
python research/amm-quote-base-recovery/rebuild.py \
  --source /tmp/amm-quote-source --sdk /path/to/captured-v144-sdk \
  --cargo-home /path/to/qualified-cargo-home \
  --target-dir /path/to/qualified-build-target --output /tmp/amm-quote-build
```

The exact offline Docker commands, image digest, source/tool/dependency hashes
and compiler output are retained in `builds/`. The rebuild helper requires the
already qualified local SDK and Cargo inputs. `controllers/` preserves the
actual local build, compiler and runtime drivers; their absolute scratch paths
are evidence of the executed commands. The runtime drivers were run through
`repro/pump_amm/owner6048-v144/runtime/observe_suite.py`; `runtime/inputs.json`
binds the harness sources. `verify.py` recomputes source/body/call/data findings
and audits saved runtime receipts. It does not claim to perform a fresh build
or execute the runtime suite.
