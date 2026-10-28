# Current Mayhem 434-window composition

This composes the already recovered O0073 `validate_sweep` and O0075 SweepFeesAdmin bodies onto the [qualified source-origin parent](../mayhem-source-origin-recovery-20261027/README.md). It preserves every previous complete/raw match and the repaired allocator closure:

| Measure | Source-origin parent | This composition |
| --- | ---: | ---: |
| Complete normalized original windows | 432 / 441 | **434 / 441** |
| Raw-local equal windows | 141 | **141** |
| Normalized-only / unmatched | 291 / 9 | **293 / 7** |
| Original text in matched windows | 598,792 / 706,744 | **607,712 / 706,744** |
| Recursive ordered direct-call closure | 422 | **425** |
| Positive immediate-call observations | 4,315 | **4,371** |
| Matching Source observations | 458 | **472** |

No previous normalized/raw body, positive immediate call, matching Source or observed Source profile is lost. O0073, O0075 and the dependent O0170 window gain direct-call closure. This result is one measured artifact, not a sum of the separate 434/100 and 432/141 frontiers.

The normalized window coverage is **98.4127%**, leaving **1.5873%** unmatched. Matched original text coverage is **85.9876%**, leaving **14.0124%** unmatched. Raw equality covers **31.9728% of windows**. These measure bounded code coverage; they are not a percentage of total engineering completion. Whole-original ELF identity remains false.

## Source and build evidence

The O0075 and sweep diagnostic source work is credited to [the mayhem-b cp4 checkpoint](../claude-mayhem-b-20261027/README.md); O0073 is credited to [the final block-placement recovery](../claude-fees-final-mayhem-o0073/README.md). The composition changes only `src/instructions/fee_recipients.rs`, `src/lib.rs` and `src/state.rs` relative to the source-origin parent. The lib.rs edits are disjoint from the existing ExtendAccountEvent source-origin repair. All 67 source inputs, exact overrides, source patch and the deterministic composition are retained and checked.

An unchanged control build recompiles Anchor, Anchor SPL, curve accounts and the root, reproducing both complete source-origin parent outputs. Two subsequent root compilations over that same isolated dependency cache produce identical complete outputs:

| Artifact | SHA-256 |
| --- | --- |
| Stripped candidate | `66de019be880ca9997d4f37c5c521b8d9efa8ea8bebd31e969623290586b97c2` |
| Symbol-bearing compiler output | `deae63269e24093b477d35b72b62190e812f1d3ec62aa7a8db2f9f751fd2f08c` |

The qualified linker script is unchanged from the source-origin parent; it orders complete emitted sections. No binary patching, assembly substitution, synthetic operation, new matcher mask or original-binary compiler input is used. Each saved symbol output reproduces its candidate through a separately executed standard strip operation. The mixed v1.54 recipe, reused dependencies and after-build tool/library observations do not authenticate the original historical environment or establish a fresh complete dependency build.

The existing `sell_amounts` source change shifts the still-partial Legacy Sell and SellV2 instruction streams. Their original seven Source-value multisets and 50/48 callee-shape multisets remain; neither body is claimed complete. Both quote bodies, twenty quote data references, the initializer and four data references, and the selected nested integer-Debug route are rechecked.

## Fresh signed local qualification

| Retained scope | Inputs | Signed records | Result |
| --- | ---: | ---: | --- |
| Fourteen trade families | 6,636 pairs | 13,272 | Matching checked effects and complete non-compute logs |
| Initializer | 69 pairs | 168 | Matching checked fields/logs; ten original-Pump CPI successes |
| Existing sweep matrix | 692 three-way inputs | 2,076 | Original/candidate agree; 58 prior control diagnostics repaired |
| Existing rate matrix | 150 three-way inputs | 450 | All three agree |
| O0073 targeted rate matrix | 856 three-way inputs | 2,568 | All three agree; 417 successes, 219 rate failures, 220 overflow failures |

The exact compiled candidate was executed in local VMs. Independent saved-record verification checks transaction signatures, actual executable program-account hashes, account pre/post state, errors, events, CPI/return data and non-compute logs. The targeted driver is the existing 856-case generator augmented with a receipt recorder; its original source is retained. Inputs/scopes overlap and are not summed as unique cases. The 18,534 signed records are record observations, not unique transactions. No network transaction or deployment occurred.

The trade reports are losslessly compressed as XZ; other raw reports are retained as gzip. All case vectors and required helper inputs are hash-bound. The saved verifier never invokes the compiler, VM, Git or network.

## Remaining work and reproduction

Seven original windows / 99,032 text bytes still lack full matches: O0076 SweepFees, O0077 AMM Buy, O0079 AMM Sell, O0081 Legacy Buy, O0082 Legacy Sell, O0083 BuyV2 and O0084 SellV2. `inventory.json` and `inventory.tsv` list all 441 windows with actual candidate names/addresses. General data and indirect-call closure, full layout and original source/toolchain provenance remain open.

With Python 3.12 and `solders` 0.27.1:

```sh
python -B research/mayhem-current434-composition-20261027/verify.py
python -B research/mayhem-current434-composition-20261027/test_verify.py
```

`--static-only` explicitly omits runtime qualification. The retained controllers and launch records capture the actual executed build/runtime commands; their absolute prepared-SDK/cache paths require deliberate adaptation for rebuilding. Verification requires only the repository's hash-bound inputs. The mutation tests change actual instruction/data operands or source/build/receipt inputs; they do not only alter summary counts.

The saved packet passes nine checks covering source/image/metadata mutations and positive controls. Full runtime verification also rejects altered transaction signatures, executed-program hashes and target case inputs on in-memory receipt objects.
