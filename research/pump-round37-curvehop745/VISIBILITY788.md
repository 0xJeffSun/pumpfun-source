# Optional native-payment visibility stage: 788

Select `--stage visibility788` to apply exactly three visibility changes on `clamp786`, then use the ordinary SBPF recipe. The default `curvehop745` and all five previous source stages remain unchanged. The earlier SBF780, unchanged-source SBPF785 and clamp786 checkpoints remain separately documented; no SBF result is asserted for this stage.

Credit [PR #323](https://github.com/lalalune/pumpfun-source/pull/323), exact head `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`, for the three source hunks: make the legacy buy `native_payments` module public, make its `ensure_rent_exempt` helper public, and make its `transfer` helper public. Only `buy.rs` line 2945 and `legacy_native_payments.rs` lines 4 and 18 change. All 60 source paths and line counts remain; the other 58 files and all function bodies, prior clamp correction, dependencies, SDK and flags are unchanged. The full upstream patch was not applied. See `visibility.patch` and `visibility-pins.json` for the exact change and complete parent/output inventories. Earlier contributor attribution remains in the prior reports.

## Independently qualified result

The selected ordinary Linux SBPF composition has **788 / 1,035 injective normalized windows and 131 raw windows**, retaining every clamp786 normalized and raw match. Two additional complete normalized bodies match: legacy rent at original `0x3b738` (416 bytes) and legacy transfer at `0x8cc58` (1,200 bytes). Neither is a new raw match. A separate root recompilation reproduced both complete generated ELF files byte-for-byte, with all 355 compiled dependencies unchanged and earlier source/artifacts preserved. No upstream count or runtime qualification is transferred.

All six direct callee bodies of those two helpers are same-sized and normalized-equal; neither helper has direct ELF-data operands. The matched rent helper retains the `&Program` wrapper and dereferences its account-info field before calling transfer; the matched transfer dereferences `&Signer` rather than receiving a compiler-promoted inner account pointer. The complete helper bodies retain their guards, rent/lamport operations, error conversion, cloned account/CPI construction and return behavior. No CPI was executed.

Four actual incoming rent call sites and the one public-transfer call site were inspected. Unchanged typed source calls and explicit wrapper-address/spill/reload instructions support the argument roles. These are bounded witnesses, not a proof of global reaching definitions, general indirect control flow, whole unmatched caller equivalence or historical caller identity.

## Contract routes and separate v2 scope

All four selected entry/IDL/event/entrypoint complete normalized bodies remain equal, including selectors and local control flow. Their 113 direct targets retain symbol identities and equal complete body shapes; 20 immediate data references retain their roles. Entire `.rodata` bytes and the interpreted graph of 644 `.data.rel.ro` relocations are preserved. The same 56 generated Anchor global handler symbols remain. No new Anchor instruction routes were observed: expanding Rust module/helper visibility outside `#[program]` is not instruction registration. This is not exhaustive transitive handler semantics.

The v2 rent helper is still unmatched. Its complete body and all five immediate callee bodies remain unchanged from clamp786, including a separate private 1,192-byte transfer instance. No v2 unused-argument or minimum-balance edit is included; the new public legacy transfer does not turn that v2 residual into a match.

All earlier qualified boundaries were rebound to the actual output. The pure source suite has **45 passing tests**, including exact six-stage inventories, the three changed lines, unchanged dispatcher/v2/clamp inputs and invalid-parent rejection. Materialization and tests neither compile nor execute the program.

**Runtime: NOT RUN. Whole-original binary identity: false.** Existing FeeConfig (1,176 versus 408 bytes) and BondingCurve dispatcher (624 versus 600 bytes) gaps remain. The 27 PDA seed uses across four categories retain open consumer extents/dominance. Duplicate TypeId constructor historical identity remains ambiguous, and the clamp's original cited Source line 57 remains distinct from current line 2911. No universal immediate-data, recursive-callee, allocator, whole-program semantic or historical-build equivalence is claimed. This packet contains no binaries, IR, SDK/archive payloads, raw build/runtime receipts or runtime fixtures.
