# Optional next-front stage: 804, with repaired split metadata

Select `--stage nextfronts804` on the ordinary SBPF profile. The default `curvehop745` and all nine preceding source stages remain selectable. SBF780 and unchanged-source SBPF785 remain distinct profiles; no SBF result is asserted for this stage.

## Attribution and source scope

This stage strictly combines four authenticated incremental source fronts:

- [PR #356](https://github.com/lalalune/pumpfun-source/pull/356), head `01118cad05e79cb0e0e75c07483ad564df63ec7e`: market-cap helper and original-backed Source position.
- [PR #357](https://github.com/lalalune/pumpfun-source/pull/357), head `2996d029d8e160bb83e8e8b5c630ef4f3e6029b9`: curve buy/sell mutation helpers.
- [PR #358](https://github.com/lalalune/pumpfun-source/pull/358), head `04dd365c4ee47c7eb74218248cb299b1efd3cdc8`: per-fill fee-accrual helper.
- [PR #360](https://github.com/lalalune/pumpfun-source/pull/360), head `53ecd1e9746c407de755231adec1a3bc926fc3df`: buyback-recipient compared-value diagnostics.

The four patch identities were authenticated from cumulative #360. The stage also includes a separately reviewed **local inferred private split-helper reconstruction**, described below. This is credited as local work, not attributed to an upstream patch or asserted to be the unique historical source. `nextfronts-pins.json` binds both the upstream patch identities and local repair identity, plus complete before/after inventories. `nextfronts.patch` is the combined delta from harvest799; it does not expose the earlier unaccepted intermediate as a selectable stage. No upstream count or runtime result is transferred.

Only `lib.rs` and `trade_v3.rs` change; all 60 input paths, the other 58 files and physical file line counts remain. Prior clamp, visibility, v2 and harvest changes are preserved. Public instruction signatures and route membership do not change. No SDK, dependency, compiler profile or optimization flags change.

## Arithmetic, mutation and diagnostic scope

Market-cap arithmetic selects the same supply branch and computes the same widened product and truncating division. A product of two `u64` values fits in `u128`; moving the zero-divisor check after those pure reads/product introduces no new arithmetic failure. The zero-divisor error remains, with original-backed Source line 2481 rather than baseline diagnostic identity.

The curve helpers reproduce original sequential field-update order: virtual tokens, real tokens, virtual quote, real quote. The fee helper updates protocol fees before creator fees and retains separate first-fill/post-fill calculations; amounts are never combined before flooring the buyback division. These are **not unrestricted equivalences between sequential mutators and atomic precompute/assignment APIs**: a helper can partially update fields before a later failure.

The source callers retain their prior fallible `next_*` checks and unchanged scalar expressions, transfers and events. In sell, reserve/creator checks precede user transfers, while the protocol check remains after user-token/user-quote transfers and before the buyback transfer. Both buy paths retain all six checks before their transfers. No source-visible cached curve/global field writes or explicit reload intervene before the final helper calls. Pinned Anchor `Account<T>` dereferences its owned deserialized field; CPI/lamport AccountInfo effects are not implicit reloads of that field. This supports a restricted prevalidated success domain, not a claim about arbitrary external callee behavior or transaction rollback.

Actual encoded control flow retains all **18 fallible prechecks**, including the three now-unused `next_protocol` values. Each check dominates the final mutation calls, and its failure edge cannot reach them. Three apply calls and five accrual calls use verified receiver/global fields and scalar frame slots without explicit intervening slot overwrites. Five earlier split calls dominate the corresponding accrual calls with the same per-fill protocol inputs. All eight existing sum-three and one subtract-three incoming sites remain. These are bounded actual/source interface proofs, not whole trade-handler or general indirect-flow equivalence.

The buyback-recipient change keeps the nonzero guard, first-duplicate traversal order and success-only final write. It deliberately changes `require_keys_neq!` to `require_neq!`, restoring original string compared-values formatting instead of the old Pubkey diagnostic representation. Original Source lines 1895/1905 and formatting callees support this repair; diagnostic allocation/compute identity with the prior source is not claimed.

Mode-dependent branches were reviewed statically only. No Mayhem branch, helper/host fixture, VM or CPI was executed.

## Private split repair and measured result

The first four-front control reached 804 normalized matches but introduced two original-unequal accrual panic locations. Those were not silently accepted or normalized away. Original records at `lib.rs:1936:45` and `1939:14` are shared by the standalone split helper and accrual body. A minimal ordinary private helper was placed in existing blank source lines, preserving the outer helper's visibility/signature/`inline(never)` boundary and mode guard, and accrual error Sources 2550/2554. It performs the same widening, multiply/divide, checked conversion, first panic, checked subtraction, second panic and owned tuple return. No forced inlining, span directives, output patching or original machine bytes were used.

The repaired output has **804 / 1,035 injective normalized windows and 133 raw windows**, retaining every harvest799 match. Five new normalized complete bodies are market-cap (760 bytes), apply-buy (2,032), apply-sell (2,040), fee-accrual (1,456) and buyback recipients (5,464). Their 94 immediate callee occurrences, 76 bounded data references and six records are qualified. No new raw match beyond harvest799 is claimed.

The local repair adds no body-count gain: it closes both new panic metadata mismatches. The standalone 328-byte split and 1,456-byte accrual bodies remain original-normalized, with exact original panic records and qualified immediate callees. Ordinary inlining occurred in this measured build; it is not guaranteed or evidence of the unique historical helper name. A third original shared-record consumer at 527864 (2,120 bytes) remains unmatched, with current mapping unresolved.

Compared with the preceding unrepaired control, all 1,735,648 text bytes are normalized-identical, all 10,894 direct targets and 5,093 text pointers are transported, and 224 imports remain equal. All 32,027 readonly-data bytes remain equal. Four coordinate literals intentionally become original-equal, while two duplicate 24-byte records coalesce with the outer pair; all 647 old relocation edges are explicitly checked under that correspondence. This is an observed comparison mapping, not a numeric layout prescription or blanket whole-original identity.

Six existing outer-split caller sites and the three trade callers retain their bounded typed-input/precheck/order qualification. All earlier qualified roots and named residuals were rebound; dispatchers, selectors and route membership remain preserved.

A separate root recompilation of this exact repaired source reproduced both complete generated ELF files byte-for-byte. All 355 compiled dependencies and prior source/artifact preservation checks passed; the inactive historical SBF cache was explicitly verified as archived. This is the accepted bounded static-plus-repeat checkpoint. The earlier uncorrected four-front control was not separately repeated or accepted.

The pure source suite has **74 passing tests**, including all ten selectable stages, exact inventories, prior-fix preservation, repaired Source coordinates and invalid-parent rejection. Materialization and these tests neither compile nor execute the program. The three unused-variable warnings were not suppressed or used as a reason to remove fallible checks. Absence of emitted stack/frame diagnostics does not establish runtime stack safety.

**Runtime: NOT RUN. Whole-original binary identity: false.** The existing two unequal business-handler edges and two unresolved original panic-origin identities from fourfronts795 remain. FeeConfig 1,176-versus-408 and BondingCurve dispatcher 624-versus-600 gaps, 27 PDA seed consumer extent/dominance limits, duplicate TypeId historical ambiguity and original clamp Source 57 versus current 2911 remain. No universal recursive-data/callee, allocator, whole-program semantic or historical-build identity is claimed. No binaries, IR, SDK/archive payloads, raw build/runtime receipts or runtime fixtures are included. No merge or deployment.
