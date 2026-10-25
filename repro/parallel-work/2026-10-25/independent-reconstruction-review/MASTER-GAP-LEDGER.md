# Historical gap-ledger draft and reconciliation

This merged draft combines per-component reports made against different candidates and contains incompatible conclusions. Retain its104-item inventory as historical hypotheses, not as a verified current verdict. The [pass16 remaining-work report](../../../layered-passes/pass-16/REMAINING.md), [full current ledger index](../../../layered-passes/pass-16/current-analysis-index.json), and [source security reviews](../../../security-reviews/pass-16/README.md) bind current claims to exact artifacts.

**Reconciliation:** the original compiler is unresolved; the accepted recipe remains pinned v1.44 with its separately recorded v1.52 strip phase. Do not adopt the v1.43 promotion recommendations below: the cross-cutting review in this same draft rejects them. ATA's307 differing positions comprise304 text and3 relocation bytes; attributing them to `custom_panic` is not accepted. Relay has a compiled source reconstruction and369 unmatched original windows at its published09 checkpoint. Finite passing cases do not establish behavior-complete SDK acceptance. No proof here establishes that exact reconstruction is impossible without the original literal source; such categorical statements below are unaccepted conjectures. Diagnostic coordinates and historical recipe remain unresolved evidence obligations.

## Rollup — what is not 100% (104 items across 6 components)

**Whole-binary byte-identicality: 0/4 core programs.** Source, function/call/data, diagnostics and historical-build gaps remain. The item-level recoverability predictions require their own evidence; absence of original source does not prove impossibility.

| Area | Bounded/done | Not 100% — headline gaps |
| --- | --- | --- |
| **Pump** | 48/56 handlers | 5 partial (`buy_v3`, `sell_v3`, `buy_exact_quote_in_v3`, `create_v2`, `multi_hop_curve_swap` — missing quote routes, Token-2022 extensions, exhaustive validation, deeper nesting/hops); 3 unrecovered/**stopped** (`admin_update_token_incentives`, `claim_token_incentives`, `set_mayhem_virtual_params`); confirmed `sell_v2` transfer-fee min-output/event defect; ~316 KB `.text` genuinely missing; TradeEvent trailing 8 bytes uninterpreted |
| **PumpSwap** | 37/38 handlers | `create_config` static-only (no authentic positive initializer replay); 37 bodies have bounded finite runtime checks but **not byte-identical** (structural: ~994 fewer calls / ~663 fewer relocations = different inlining/factoring); `transfer_creator_fees_to_pump` rent-sized-destination bug reported resolved in the current shipped candidate (re-verify) |
| **Pump Fees** | 31/31 handlers | ~8 KB `.text` still absent (handler-body/diagnostic/transitive closure); source-line/coordinate diffs; whole-binary non-identity |
| **Mayhem** | 24/25 handlers | `initialize_mayhem_state` unrecovered/**stopped**; ~100 KB `.text` missing (other unreconstructed handlers); non-initializer error-return ABI/codegen diffs; 26 panic-diagnostic diffs; 5 unknown `GlobalParams` field roles |
| **Dependencies** | SPL Token and retained Token-2022 capture comparisons exact | Metaplex:1,477 text,30 diagnostic and2 relocation positions differ. ATA:304 text and3 relocation positions differ; original recipe remains unresolved. Relay:compiled source and bounded ordinary cases,369/492 original windows unmatched at published09. Allocation-image and raw compiler comparisons remain separate. |
| **Recipe / build / audit** | Pinned v1.44 compilation and separately observed v1.52 strip provenance | Original compiler, dependency graph, flags and source remain unresolved. Preserve accepted pins; size similarity does not establish v1.43. Fresh permitted-source security reviews now cover all four core programs with exclusions and conditional findings; exhaustive security/runtime equivalence remains incomplete. |

Original source/build records could close important gaps, but their absence does not justify a mathematical impossibility claim. Continue source-supported reconstruction and exact comparisons. The historical per-item text below is preserved so the conflicting hypotheses remain reviewable; current counts and acceptance decisions come from pass16.

The per-item detail (all 104) follows.

## Pump

_Fresh gap audit of the pump program, re-derived from the live repo (repro/completion.json, repro/status.json, programs/pump/src, docs/COMPLETION.md, scripts/analyze.py elf_layout, the full-before-after window ledger, audit/pump/*, evidence/original/pump/deployed.so). Verified disposition: 56 instructions = 48 bounded + 5 partial + 3 unrecovered/stopped (matches counts). Validation base = 9,269 differential comparisons across 40 suites + 1,024 Surfpool; whole-file byte equality FALSE (candidate repro/pump/buy-mode-order-main-fortyeight/main/candidate.so sha bc677505..., 1,588,408 B vs original sha 7a19aff..., first diff at byte 24, 883,574 differing shared positions). MEASURED .text: original 1,792,208 B, candidate 1,468,680 B -> deficit 323,528 B (~316 KB); candidate .text is 81.9% of original. IMPORTANT DISCREPANCY: the established-context figures 'pump 86.3% complete / ~245 KB missing' are NOT reproducible from committed ledgers. Raw .text deficit is ~316 KB (not 245 KB); the strict normalized+call-consistent window ledger (repro/pump/curve-preparation-fortyeight/full-before-after-inventory.json.gz) confirms only 454/1035 original windows (309,344 B = 17.3% of .text) as call-consistent matches and 617 raw-equal pairs, and the ledger itself states these counts 'must not be combined into a percentage'. The ~316 KB missing .text maps to (a) the un-reconstructed branches of the 5 partial trade/create handlers (the largest functions in the binary: all non-SOL/non-bounded-USDC quote routes, every Token-2022 extension combination, exhaustive account/aliasing validation, Mayhem/holder/cashback variants, nested ancestry, arbitrary hop counts, completion/migration, short-account resizing), (b) the 3 absent stopped handler bodies, and (c) pervasive compiler/monomorphization/layout differences from the lost original source. Provenance inconsistency found live: the current candidate's build-comparison.json still records selected_toolchain 'v1.44' though established context says v1.43 is the real compiler. Integrity preserved: originals used only as comparison inputs; the 3 stopped handlers and the sell_v2 probe were NOT executed, only their recorded status read. Whole-binary byte-identicality remains 0/4 and is fundamentally bounded by the lost literal source. Per-item gaps below._

### buy_v3 — **PARTIAL**
- **Missing:** Only the SOL quote branch and a bounded synthetic-USDC quote branch (Tokenkeg + Token-2022 base, per repro/pump/nested-ancestry-fortyeight differential: 37 SOL + 37 USDC/Tokenkeg + 31 USDC/Token2022 of 105 verified success rows) are reconstructed, plus Mayhem/holder field population and V3 cashback-coin rejection (error 6094). Missing: all other quote-currency routes, every Token-2022 extension combination (transfer-fee, hooks, etc.), missing-ATA creation behavior, exhaustive malformed-account/aliasing/constraint validation, and the partial_fill argument is explicitly discarded (lib.rs:100 `let _ = partial_fill`). The final 8-byte TradeEvent trailing field is set to 0 and remains uninterpreted (valid only for tested paths).
- **Why:** buy_v3 (dispatched via trade::buy over Context<SellV3>) is one of the largest handlers; its full branch set (quote-route x token-program x extension x mode matrix) was never fully observed on-chain, and the authentic Token-2022 extension decode/settlement paths were not reconstructed. The independent BuyV3 composition review (repro/pump/buy-v3-composition-review/REPORT.md) rejected the proposed general-route overlay because its domain fence would have regressed the 105 existing passing success rows, so broader routing stays unintegrated. No original source exists to copy exact branch logic.
- **Recoverable:** Partially. More quote/extension branches are recoverable incrementally by building+validating against captured execution (the composition review supplies an implementable one-exit lane-mux seam), but exact instruction-byte identity is NOT recoverable without the lost original source; the uninterpreted trailing event field needs its semantics determined first.

### sell_v3 — **PARTIAL**
- **Missing:** Same envelope as buy_v3: SOL and bounded synthetic-USDC quote branches, Mayhem/holder fields, cashback rejection, allocation-aware FeeConfig parsing (3001/3002/3003/6097, legacy 2,512 / stable 4,073 / exotic 4,097 byte accounts), balance pre-check (6023), empty-fee-tier reject (6096), FeeConfig ownership (3007), checked-subtraction rollback (6024). Missing: other quote routes, missing-ATA creation, every token-extension combination, exhaustive malformed-account/aliasing cases; last 8 TradeEvent bytes uninterpreted (zero only matches tested paths).
- **Why:** Reconstructed from bounded behavioral agreement (334 buy / 301 sell / 93 admin + 130 USDC cases, audit/pump/partial-sell-review.md), not from source. Non-bounded quote/extension/account-shape combinations were never exhaustively observed, and Token-2022 extension settlement math (e.g. transfer-fee adjustment) is not implemented. Original source is lost.
- **Recoverable:** Partially; additional branches recoverable via further differential capture, but byte-identicality unrecoverable (no original source). Shares helpers with the stopped v3 token-extension/incentive lanes, so full instruction independence is not established.

### buy_exact_quote_in_v3 — **PARTIAL**
- **Missing:** Bounded SOL and synthetic-USDC Token/Token-2022 quote paths, configured creator-fee / gross-spend truncation, funded completion using real base-vault balances, optional fills and Mayhem crossing are reconstructed. Missing: nested routes, transfer-fee extensions, and exhaustive account validation.
- **Why:** Dispatched via trade::buy_exact_quote over Context<SellV3> (lib.rs:83). Only the directly observed exact-quote-in flows were reconstructed; nested/multi-route and transfer-fee-extension variants and the complete account-validation matrix were never fully observed, and no original source is available to supply the remaining branches.
- **Recoverable:** Partially; more paths recoverable by bounded reconstruction+validation. Byte-identicality not recoverable.

### create_v2 — **PARTIAL**
- **Missing:** Normal SOL and admitted-quote creation, holder / quote-control / configured-fee paths, and ordinary Tokenkeg Curve/Pool ancestry with finite depth-1..5 validation are reconstructed (nested-ancestry-fortyeight: 16 new cases = 15 success + 1 depth-6105 rollback, with synthetic pre-existing canonical ancestry). Missing: Mayhem creation mode, exhaustive ancestry/error/input coverage, arbitrary ancestry depth beyond 5, and all new Token-2022 ancestry/extension creation modes.
- **Why:** The ancestry walk and wide pricing were recovered only to depth 5 and only over synthetic (not historically reachable) canonical ancestry; initializer/migration reachability for pre-existing ancestry is not established. Token-2022 ancestry/extension creation and Mayhem creation were never fully observed. No original source for exact logic/bounds.
- **Recoverable:** Partially; deeper ancestry, Mayhem and Token-2022 creation modes recoverable with further captured-execution validation. Exact byte identity and proof of real-world ancestry reachability are not recoverable from current evidence.

### multi_hop_curve_swap — **PARTIAL**
- **Missing:** Reconstructed: one/two-curve ordinary Tokenkeg routes plus 16 successful three-hop cases via genuine AMM PDA-signed CPI (flags [1,0,2]/[2,0,1], 4 fee modes, 2 amounts, 2 directions) and one native-curve-per-CPI fee-flag-3 legacy path. Missing: arbitrary hop counts/capacity, native/WSOL variants, other quote currencies, completion/migration within swaps, short-account resizing, Token-2022/extensions, and holder/cashback/Mayhem modes. Source domain fences are explicitly NOT claimed as original rejection behavior; the TradeEvent trailing field has no general meaning established.
- **Why:** Only a narrow, genuinely-signed route subset was validated against the captured AMM program (audit/pump/MULTI_HOP_CURVE_RECOVERY.md); the handler shares v3/transfer-fee helpers with stopped lanes so full instruction independence is unproven. Broader routing (arbitrary lengths, non-native quotes, completion) was never exhaustively observed and no original source supplies it.
- **Recoverable:** Partially; broader routes recoverable incrementally with genuine-CPI differential validation (no synthesized PDA signatures). Byte-identicality and a proven general rejection model are not recoverable from current evidence.

### admin_update_token_incentives — **UNRECOVERED (STOPPED)**
- **Missing:** Entire pump-program handler body is ABSENT from programs/pump/src (confirmed by grep: no admin_update_token_incentives / AdminUpdateTokenIncentives in source). No dispatch in lib.rs, no bounded runtime acceptance, no differential suite. completion.json marks it unrecovered with no limitation text; only a local-validation missing-accounts log entry exists.
- **Why:** Explicitly declared a STOPPED lane in docs/COMPLETION.md ('The two Pump incentive handlers ... remain stopped. These tasks must not be reassigned to another worker as a workaround'). No pump-specific recovery was attempted (QUOTE_CONTROL/HOLDER_NESTED/MULTI_HOP recovery reports each confirm 'no work performed on Pump incentives'). Note: the same-named handler in PumpSwap/pump_amm IS recovered (audit/pump_amm/INCENTIVES_RECOVERY.md), so behavior is largely known, but the Pump-program instance is frozen by directive.
- **Recoverable:** Behaviorally recoverable in principle (IDL + captured binary + the recovered pump_amm twin supply layouts/arithmetic/event sequence), but it is a deliberately STOPPED lane and must not be reassigned as a workaround; exact byte identity still unrecoverable without original source. Did not execute it (status read-only).

### claim_token_incentives — **UNRECOVERED (STOPPED)**
- **Missing:** Entire pump-program handler body ABSENT from programs/pump/src (grep-confirmed). No lib.rs dispatch, no runtime acceptance, no differential coverage; completion.json unrecovered, only a missing-accounts local-validation log entry.
- **Why:** Same STOPPED-lane directive as admin_update_token_incentives; no pump-specific recovery attempted. The PumpSwap/pump_amm same-named claim handler is recovered (shared claim updater, time-index conversion, proportional accrual, eligibility by day-quotient), so logic is largely understood, but the Pump instance is frozen.
- **Recoverable:** Behaviorally recoverable in principle via the recovered pump_amm twin + IDL + captured binary, but STOPPED by directive and must not be reassigned; byte-identicality unrecoverable without original source. Not executed (status read-only).

### set_mayhem_virtual_params — **UNRECOVERED (STOPPED)**
- **Missing:** No compiled/dispatched handler in programs/pump/src (grep-confirmed absent). Static-only package exists (repro/pump/mayhem-virtual-params-static) with recovered dispatch, account constraints, reserve arithmetic, event sequence and 22 raw-byte-checked windows, but the Rust hypothesis is uncompiled and there is ZERO bounded runtime acceptance and zero receipts.
- **Why:** A genuine authorized Mayhem invocation cannot be established: the handler requires Mayhem's off-curve `sol-vault` PDA (sol_vault_authority) to sign, which an ordinary keypair cannot satisfy, and no signer bypass/caller workaround is permitted. The initializer lane it depends on is itself stopped. So static attribution exists but no valid positive runtime path.
- **Recoverable:** Static body is recovered; runtime acceptance is recoverable ONLY if a genuine PDA-signed Mayhem invocation path is established (not via signer injection), which currently does not exist. Byte-identicality unrecoverable without original source. Not executed (status read-only).

### sell_v2 transfer-fee minimum-output / fee-event defect — **BOUNDED (COUNTED) BUT DEFECTIVE**
- **Missing:** sell_v2 is in the 48 'bounded' set, but on a quote mint with a Token-2022 transfer-fee extension it diverges from the original: in sell_v2.rs the non-native path computes gross `output` and transfers it via transfer_checked (which deducts the transfer fee so the user receives less), while require!(output>=minimum,...) checks the PRE-fee gross amount and the TradeEvent records gross quote_amount/fee fields. Minimum-output checking and fee-event fields therefore differ from the captured original. Saved suites do not cover this boundary.
- **Why:** The reconstruction never implemented transfer-fee-aware settlement (e.g. transfer_checked_with_fee or post-fee min comparison); the defect is confirmed in status.json coverage_limitations and docs/COMPLETION.md and reaffirmed across audit/pump/*RECOVERY.md. The corrective probe lane is explicitly STOPPED. Candidate is therefore not a deployable replacement for this boundary.
- **Recoverable:** Behaviorally recoverable (fix is understood: compute/verify minimum against post-transfer-fee amount and record net fee-event fields), but the corrective probe lane is STOPPED and must not be reassigned; was not executed. Byte-identicality still unrecoverable without original source.

### TradeEvent trailing 8-byte field (uninterpreted) — **PARTIAL / CROSS-CUTTING**
- **Missing:** The final 8-byte suffix of TradeEvent (unparsed_trailing_field, emitted as 0 in sell_v2.rs and across the v3 trade paths) has no recovered semantic meaning; zero matches only the tested paths. Affects buy_v3, sell_v3, buy_exact_quote_in_v3 and sell_v2.
- **Why:** The byte range was observed as zero in all captured fixtures, so no non-zero case exists to decode its meaning; multiple reviews explicitly decline to invent a name/semantics for the trailing ordinary zero (buy-v3-composition-review, MULTI_HOP_CURVE_RECOVERY). No original source/IDL field definition recovered.
- **Recoverable:** Recoverable only if a transaction exercising a non-zero value for the field is captured and decoded; currently uninterpreted with low confidence. Not independently byte-recoverable.

### Whole-binary byte-identicality / ~316 KB missing .text — **STRUCTURAL GAP (0/4 WHOLE-BINARY)**
- **Missing:** MEASURED: original .text 1,792,208 B vs current main candidate .text 1,468,680 B = 323,528 B (~316 KB) absent; whole-file equality False (first diff byte 24; 883,574 differing shared positions). Only 454/1035 original windows (17.3% of .text) are call-consistent matches; 617 raw-equal pairs. The missing .text maps to: the un-reconstructed branches of the 5 partial trade/create handlers (largest functions), the 3 absent stopped handler bodies, and compiler monomorphization/inlining/layout differences. NOTE: the context figures '86.3% complete / ~245 KB' are NOT reproducible from committed ledgers (raw deficit is ~316 KB).
- **Why:** Behavioral equivalence is not byte equivalence; the reconstruction is structurally different from the original (smaller, different call/relocation counts) because the literal original source, module layout, and exact dependency/compiler graph are lost. The window ledger itself states its counts must not be turned into a completion percentage.
- **Recoverable:** Fundamentally NOT recoverable to byte-identicality given the lost literal source (consistent with SPL Token/Token-2022 being byte-identical only because their source is public). Handler-coverage gaps within the deficit are partially recoverable behaviorally as noted per-item.

### 48 'bounded' handlers are bounded, not exhaustive or byte-identical — **BOUNDED (NOT 100%)**
- **Missing:** All 48 bounded handlers have full_byte_equality=false and only bounded comparison receipts (repeat inputs included), NOT exhaustive input coverage, not whole-binary equality, and not proven semantic equivalence. Transitive data/call closure, diagnostic/source-location identity, and exhaustive malformed-input coverage remain open for every one.
- **Why:** Completion.json scope statement: 'bounded status is not exhaustive semantic equivalence.' Saved suites include repeated inputs and finite fixtures; normalized matching closes none of the global gaps. No original source to prove identity.
- **Recoverable:** Coverage can be strengthened with more differential/Surfpool cases, but exhaustive semantic equivalence and byte identity are not recoverable without the original source. These remain 'bounded', never 100%.

### Compiler / toolchain / dependency / build-provenance unresolved — **STRUCTURAL GAP**
- **Missing:** Exact historical compiler, SDK phase, dependency selection, section layout and relocation identity are unresolved for pump. LIVE INCONSISTENCY FOUND: the current main candidate's build-comparison.json records selected_toolchain 'v1.44' (platform-tools v1.43, rustc 1.79.0) although the established context says v1.43 is the real compiler and v1.44 was wrong — the committed artifact was not reconciled to that conclusion.
- **Why:** The original build host/recipe is not established; evidence only narrows (e.g. Linux-distributed sysroot path family) without proving a unique build. The toolchain field in the committed comparison report reflects an earlier (now-contradicted) selection, so provenance metadata is internally inconsistent.
- **Recoverable:** Partially recoverable (toolchain narrowed to v1.43; provenance fields can be reconciled to the v1.43 finding), but the exact historical build recipe and byte-identical output are not recoverable without the original source/build environment. No version/flag brute-force or binary patching is authorized.

## PumpSwap (pump_amm)

_pump_amm (PumpSwap), 38 IDL instructions: 37 bounded_implementation + create_config unrecovered (static-only); 0/38 byte-identical. Re-derived fresh from live repo (programs/pump-amm/src, status.json, completion.json, scripts/analyze.py elf_layout on live .so, and a re-run of scripts/pump_amm_transfer_creator_differential.py). Behavior is matched on bounded differential suites (v1.43 rebuild: 23 suites, 17,410 cases incl. incentives families, 0 mismatches; v1.44 shipped identical behavior). The whole binary is NOT byte-identical. The best compiler is v1.43 (independently re-confirmed: .text 1,160,920/1,162,040 = 99.904%, -994 calls, -663 .text-targeting relocs, 74.5% instruction-multiset match, 54% raw diff of overlap) but the committed/CI/status candidates are all WORSE v1.44 builds (.text ~94.7%) and status.json still records compiler='unresolved'/toolchain='v1.44'. IMPORTANT CORRECTION to the task's framing: the transfer_creator_fees_to_pump rent-destination bug (8/267, authority drained via 7 inner CPIs) was CONFIRMED only on the pre-fix candidate update-event-borrow-v144 (d27be7e9); commit 0cbb40c7 applied the one-line fix (minimum_balance(0) -> minimum_balance(destination.data_len())), and I re-verified this audit that the CI-gated candidate (claim-context-main-v144) and the status candidate (formatter-restoration-main-v144) now both pass 0/267 — so it is fixed in shipped artifacts, with only a bounded/non-byte-identical residual. Four different candidate .so artifacts are referenced across status.json / completion.json / COMPLETION.md / CI (candidate drift). Overarching reason nothing is 100%: the literal historical source + exact build recipe are lost, so behavioral equivalence is achievable and largely achieved, but byte-identicality is not. Evidence: work/reconstruction-review-2026-10-25/gap-audit/pump_amm/gap-audit.json. NOTE: did not run any STOPPED handlers; transfer_creator (allowed, not stopped) was the only suite re-executed._

### WHOLE-BINARY byte-identicality (structural gap) — **STRUCTURAL-GAP / NOT BYTE-IDENTICAL**
- **Missing:** Full-ELF byte equality to evidence/original/pump_amm/deployed.so. Best v1.43 build: .text 99.904% of orig (-1,120 bytes), but -994 calls (7223->6229), -663 .text-targeting relocs (3904->3241), only 74.5% instruction-multiset match and 45.9% in-place position match; 54% of the overlapping .text bytes differ. .rodata 93.2%, .rel.dyn 84.6%.
- **Why:** Different inlining/factoring and call/relocation structure vs the original = a different (reconstructed) source structure, not the lost literal source. Raw diff is dominated by instruction ordering/relink plus genuine codegen/source-structure divergence (~0.1% net-missing .text). Behavioral equivalence != byte equivalence.
- **Recoverable:** Partially. Net-missing ~1,120 .text bytes and ordering are in principle recoverable only by matching the exact original source structure + historical toolchain+lockfile+flags; repo forbids brute-force. Open research; not recoverable from current evidence.

### Compiler provenance v1.43 not promoted into shipped artifacts — **PROVENANCE GAP**
- **Missing:** status.json records compiler='unresolved', candidate_toolchain='v1.44'; all committed candidates (CI claim-context, status formatter-restoration, completion destination-rent) are v1.44 builds with .text ~94.7% (1,100,752/1,162,040). The v1.43 rebuild that reaches .text 99.9% exists only under work/ and is never promoted.
- **Why:** Session established v1.43 as the real compiler (committed v1.44 was wrong) after the candidates were built; the committed metadata/artifacts lag behind that finding.
- **Recoverable:** Yes (low effort). Rebuild+promote the v1.43 candidate (already behaviorally validated: 0 mismatches across 23 suites) and update status.json/completion.json/CI. Improves size match from ~94.7% to 99.9%. Exact historical toolchain identity still open.

### Candidate drift across status.json / completion.json / COMPLETION.md / CI — **CONSISTENCY GAP**
- **Missing:** Four different candidate .so are referenced: CI verify.yml -> claim-context-main-v144 (6f258948); status.json -> formatter-restoration-main-v144 (d3dacf1b); completion.json -> destination-rent-v144 (2a8a69f1); COMPLETION.md -> accumulator-order (8ce5f958). No single authoritative candidate.
- **Why:** Iterative checkpoints were committed without re-pointing all metadata/CI to one head, so the documents disagree about which artifact is current.
- **Recoverable:** Yes (low effort). Pick one head candidate and make status.json, completion.json, COMPLETION.md and CI all reference it with matching sha.

### create_config — **UNRECOVERED (STATIC-ONLY)**
- **Missing:** No authentic successful initializer replay (create_config_runtime_successes=0). Only a static source implementation + compiled body/context/event comparison exist; transitive targets/data and full ELF remain unmatched. Not counted among the 37 bounded runtime handlers.
- **Why:** Its fixed administrator authority cannot be manufactured as a transaction signer in the harness; a legitimate positive replay needs a real historical signed init transaction, which is not available.
- **Recoverable:** Only with a captured legitimate historical create_config transaction (signer cannot be faked; signature/PDA bypass is forbidden). Not recoverable from current evidence.

### update_fee_config — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Body + wrapper + event serializer match under normalization, but only 12/16 immediate handler targets match; recursive/transitive data closure incomplete and four metadata references remain unclosed (update_fee_config_recursive_data_complete=false). Differential suite fee_config=356 cases, 0 mismatch.
- **Why:** Normalized codegen match does not extend to full transitive target+data identity; lost source structure for the 4 unmatched callees/metadata.
- **Recoverable:** Behavioral: already matched on 356 bounded cases. Byte/transitive-data identity: open; needs exact original source for the 4 targets.

### transfer_creator_fees_to_pump (+ _v2) — **FIXED-BOUNDED (BUG RESOLVED IN SHIPPED CANDIDATES)**
- **Missing:** Historically CONFIRMED divergence on rent-sized data destinations (8/267: indices 194,197,200,203,256,259,262,265): original does nothing (0 inner CPI) while pre-fix candidate ran 7 inner CPIs (close_account + create ATA + system transfer) draining authority 1e9->0. Residual: fix is bounded/behavioral on 267 cases (124 rent), not byte-identical; exact original minimum-threshold formula is inferred.
- **Why:** Pre-fix source used minimum_balance(0); it under-counted the destination-rent threshold so the vault>=minimum guard passed when the original's didn't. Bug lived in update-event-borrow-v144 (d27be7e9).
- **Recoverable:** Behaviorally RESOLVED: commit 0cbb40c7 switched to minimum_balance(destination.data_len()); I re-verified this audit that claim-context (CI) and formatter-restoration (status) both pass 0/267 while update-event-borrow still shows 8/267. Byte-identicality of the handler still open.

### 306 unmatched original .text windows — **STRUCTURAL-GAP**
- **Missing:** In the current status candidate (formatter-restoration, d3dacf1b) 306 original disassembly windows remain unmatched to candidate functions (COMPLETION.md cites 310 for an earlier checkpoint).
- **Why:** These original code regions have no byte/normalized counterpart in the reconstruction = functions/factoring the lost source produced that the reconstruction does not reproduce.
- **Recoverable:** Open research; each window needs original source/module coordinates. Not recoverable from current evidence; not a completion percentage.

### Scalar methods / recipient setter / init helper residual instruction diffs — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Scalar methods 608 vs 616 bytes with ~10 shared-extent instruction differences each; recipient setter 4 instruction diffs; 5,896-byte initialization helper 2 instruction diffs (per destination-rent static-comparison). 191 scalar + 78 recipient stricter diagnostic assertions pass but bodies are not byte-equal.
- **Why:** Normalized/behavioral matches, not literal source; small codegen/source-order differences remain in these helper bodies.
- **Recoverable:** Behavioral: covered. Byte identity: open; needs exact original helper source.

### .rodata / .rel.dyn / .dynsym deficits — **STRUCTURAL-GAP**
- **Missing:** v1.43: .rodata 93.2% (-1,740 B), .rel.dyn 84.6% (-10,848 B), .dynsym 94.1%, .dynstr 89.4% of original; .data.rel.ro +1.0%.
- **Why:** Fewer relocations/relro entries follow directly from the fewer calls and different codegen factoring; read-only data differs because literal/string/const layout differs from the lost source.
- **Recoverable:** Open; tied to recovering exact source structure + toolchain. Not recoverable from current evidence.

### deposit — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Liquidity suite (deposit+withdraw) = 680 cases, 0 mismatch incl. Token-2022 quote transfer fees (zero/capped/100%). Deposit/withdraw events OMIT the final quote-transfer-fee field that appears in the original event; not every Token-2022 extension combination is exercised.
- **Why:** Bounded synthetic fixtures; event-field and extension-combination coverage is finite; lost source structure.
- **Recoverable:** Behavioral: covered for tested extensions. Event-field + full-extension + byte identity: open.

### withdraw — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity; same as deposit — covered in 680-case liquidity suite with Token-2022 transfer fees, but event omits final quote-transfer-fee field and not all Token-2022 extension combos tested.
- **Why:** Bounded synthetic fixtures; lost source structure.
- **Recoverable:** Behavioral: covered. Byte/event-field/full-extension: open.

### buy_v2 — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. trade_v2 suite (buy_v2/sell_v2/buy_exact_quote_in_v2) = 870 cases, 0 mismatch, runs the exact captured SPL Token + Token-2022 binaries.
- **Why:** Bounded (repeat-inclusive) input coverage, not exhaustive; lost source structure means no byte equality.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### sell_v2 — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered in 870-case trade_v2 suite (0 mismatch). Flagged 'exercise with care' for a Token-2022 transfer-fee quote mint; transfer-fee event fields retain original meaning even where they differ from the final transferred amount.
- **Why:** Bounded fixtures; Token-2022 transfer-fee quote-mint edge surface is finite; lost source.
- **Recoverable:** Behavioral: covered for tested cases. Byte identity + exhaustive transfer-fee quote-mint coverage: open.

### buy_exact_quote_in_v2 — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered in 870-case trade_v2 suite, 0 mismatch (gross-spend truncation, available-remainder limiting).
- **Why:** Bounded coverage; lost source structure.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### create_pool — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. create=246 + migration_create=37 cases, 0 mismatch. Token-2022 extension acceptance is bounded (metadata-pointer + token-metadata accepted; transfer-fee/mint-close etc. not proven across all extensions); Mayhem/cashback creation creator-gated; fixtures synthetic.
- **Why:** Synthetic bounded fixtures cannot cover every Token-2022 extension or Mayhem/nested ancestry; lost source.
- **Recoverable:** Behavioral: covered for tested modes. Full extension/Mayhem/byte identity: open.

### multi_hop_swap — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. multi_hop suite = 735 cases, 0 mismatch covering 1/2/3 AMM legs, AMM<->curve transitions both directions, Token-2022 transfer fees, malformed-leg/route-continuity. Arbitrary route lengths, capacity, adversarial/economic and live-network equivalence NOT covered.
- **Why:** Route-length/capacity space is unbounded; evidence is bounded synthetic differential; lost source.
- **Recoverable:** Behavioral: covered for <=3 legs. Arbitrary-length/byte identity: open.

### boost_buy_and_burn — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. boost_burn suite = 506 cases, 0 mismatch, but requires a non-Mayhem migration executed through the original Pump caller + candidate AMM; not every Token-2022 extension / malformed input exercised.
- **Why:** Partial program reconstruction; depends on original Pump caller CPI; bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered for tested migration path. Byte identity + full extension coverage: open.

### admin_update_token_incentives — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. pump_amm incentives[admin] = 668 cases, 0 mismatch (NOT the pump-program STOPPED namesake). Synthetic configs deliberately assign admin; source locations differ; status NOT re-run this audit (relied on existing evidence).
- **Why:** Synthetic admin fixtures; normalized not literal source.
- **Recoverable:** Behavioral: covered on 668 bounded cases. Byte identity: open.

### claim_token_incentives — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. pump_amm incentives[claim] = 807 cases, 0 mismatch (NOT the pump-program STOPPED namesake). Synthetic configs; status not re-run this audit.
- **Why:** Bounded synthetic fixtures; lost source.
- **Recoverable:** Behavioral: covered on 807 bounded cases. Byte identity: open.

### sync_user_volume_accumulator — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. incentives[sync] = 222 cases + accumulator suite (76) 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### init_user_volume_accumulator — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. accumulator suite = 76 cases, 0 mismatch; user assignment ordered after Clock retrieval to match original.
- **Why:** Bounded fixtures; lost source structure.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### close_user_volume_accumulator — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered in 76-case accumulator suite, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### collect_coin_creator_fee — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. collect suite = 148 cases, 0 mismatch incl. Token-2022 transfer fee reducing received amount, account substitution, Fee-owned creator data.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### transfer_creator_fees_to_pump_v2 — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered in 267-case transfer_creator suite (0 mismatch on current candidates). Non-native quote path creates the pump_creator_vault ATA then transfer_checked; shares the same rent-threshold logic as legacy variant (now fixed).
- **Why:** Bounded fixtures; lost source; shares fixed minimum formula.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### migrate_pool_coin_creator — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. creator_reassignment_cto suite = 159 cases (145 reach AMM) + migration_create, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### set_coin_creator — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. creator_reassignment suite = 327 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### admin_cto_pool — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered via admin (8,331) and creator_reassignment_cto (159) suites, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### disable — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Admin suite (8,331 cases) 0 mismatch.
- **Why:** Bounded, repeat-inclusive admin coverage; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### update_admin — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Admin suite (8,331) 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### toggle_mayhem_mode — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Admin suite (8,331) 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### toggle_cashback_enabled — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Admin + cashback (146) suites, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### toggle_boost — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. boost suite = 100 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### update_buyback_config — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. buyback suite = 369 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### set_boost_authority — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered via admin/boost suites, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### update_creator_fee_config — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered via admin/fee_config suites, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### set_reserved_fee_recipients — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. reserved suite = 157 cases (plus 78 stricter recipient-error assertions), 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### init_boost — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. boost suite = 100 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### sweep_protocol_fee — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. sweep suite = 254 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### sweep_creator_fee — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Covered in 254-case sweep suite, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### extend_account — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. extend (317) + resize (46-98) suites, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### claim_cashback — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. cashback suite = 146 cases, 0 mismatch (normal-signature fixtures, full state/inner/events/errors compared).
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### sell (legacy) — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. legacy_sell suite = 575 cases, 0 mismatch (includes a prior sell-event-field correction).
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### buy (legacy) — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. legacy_buy suite = 1,011 cases, 0 mismatch.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

### buy_exact_quote_in (legacy) — **BOUNDED (NOT BYTE-IDENTICAL)**
- **Missing:** Byte identity. Exercised within legacy_buy / trade coverage, 0 mismatch; narrower bounded coverage than the v2 variant.
- **Why:** Bounded fixtures; lost source.
- **Recoverable:** Behavioral: covered. Byte identity: open.

## Pump Fees

_Fresh gap audit for pump_fees, re-derived from the LIVE repo (status.json, completion.json, build-comparison.json, full-function-inventory.json, scripts/analyze.py elf_layout on evidence/original/pump_fees/deployed.so vs the current candidate, and programs/pump-fees/src). NO stopped handlers exist in pump_fees (the stopped lanes are all in pump/mayhem); I ran nothing and only read.

STATE: All 31/31 Fees handler bodies are bounded-implemented (0 partial, 0 unrecovered at handler granularity); all 17,461 differential comparisons + the ten-step donation sequence pass; 2 dispatches (revoke_fee_sharing_authority, transfer_fee_sharing_authority) are deprecated rejection paths. Current canonical candidate per status.json is repro/pump_fees/withdraw-owned-error-main-v144/main/candidate.so (sha 76b027c2, 850,600 B). full_byte_equality=false; whole-core binaries 0/4.

KEY CORRECTION vs the task's established context: the "~8 KB missing .text / 99.0% complete" figure is NOT reproducible from the live inventory. Re-derived: candidate .text = 775,800 B vs original 799,648 B = 23,848 B (3.0%) short — ~24 KB, not ~8 KB. Strict window attribution is 453/585 original windows mapped (77.4% by count; only ~45.5% / 363,576 B by bytes); only 101/575 candidate windows are raw-byte-equal; transitive_data_equivalence_proven=False for ALL 585 windows. Machine/flags now MATCH the capture (263/0), contradicting the old compiler_candidates note; build used platform-tools v1.43 (build-sbf) tagged v1.44, stripped with v1.52, and status.json still records compiler="unresolved"/preferred="v1.44". completion.json is STALE (names legacy-social-admission-v144/8ff12f9c) and the tree is moving (3 different "current" candidates observed within this session). Nothing here reaches byte-identity; behavioral bounding != byte equivalence, and the residual is fundamentally bounded by the lost literal source + unresolved historical build recipe._

### .text byte deficit (~23.8 KB, not ~8 KB) — **NOT 100% - BYTE-LEVEL**
- **Missing:** Candidate .text = 775,800 B vs original 799,648 B = 23,848 B (3.0%) short. 130 of 585 original inferred windows (436,072 B) are not strictly attributable; only 101/575 candidate windows are raw-byte-equal; strict byte-level attribution is ~45.5% (363,576 B). The established-context figure of ~8 KB / 99.0% is not derivable from the live full-function-inventory.json by any metric (window-count = 77.4%, byte-count ~45.5%, size-ratio 97.0%).
- **Why:** The literal original source is lost, so register allocation, inlining/outlining, spill layout and call ordering differ from the original compiler output even where behavior is equivalent; several large handler bodies are reconstructed from captured behavior, not source.
- **Recoverable:** Partial. Behavioral bounding is done; closing the byte deficit requires the exact original source + toolchain, which are lost -> not recoverable to 100%.

### Largest unmatched handler bodies (bulk of .text deficit) — **NOT 100% - UNATTRIBUTED WINDOWS**
- **Missing:** Top unattributed original windows have candidate_matches=[] (no strict candidate): 16,880 @502096, 16,112 @484816, 15,976 @147944, 13,800 @163920 (donation create), 12,384 @177720, 11,016 @445160, 10,872 @408640, 10,664 @137280, 9,280 @370640, etc. These composite handlers (donation create, social-claim-v2 closure, legacy/V2 sharing-update caller, fee-selection/quote bodies) are the main contributors to the deficit.
- **Why:** Reconstructed behaviorally; codegen shape (basic-block order, inline decisions, helper outlining) diverges from the original, so strict normalized+relocation matching fails on the whole window.
- **Recoverable:** No to byte-identity for these windows; yes to continued behavioral bounding/fixtures.

### create_donation_fee_pda handler body — **NOT 100% - HANDLER UNMATCHED**
- **Missing:** Handler body 12,864 B (candidate) vs original inferred 13,800 B window, strictly unmatched (candidate_matches=[]); handler+parser-init closure unmatched; 2 of 76 direct call targets unmatched. donation.rs header explicitly states 'Partial donation behavior integrated from the independently validated local draft.' Uncompiled improvement proposals (donation-business-source-proposal, donation-borrow-source-proposal, remaining-preprocess-source-proposal) remain un-integrated.
- **Why:** The reserve-dependent Curve/Pool-selection + sharing-authorization logic and exact error-metadata/compared-key ordering were reconstructed from behavior; original handler source/codegen is unknown, and the relay CPI target is an external program.
- **Recoverable:** Partial (more behavioral bounding / proposal integration); full byte identity not recoverable.

### Donation parser/wrapper transitive + data closure — **NOT 100% - NORMALIZED-ONLY**
- **Missing:** CreateDonationFeePda parser (8,984 B) and wrapper (928 B) match only NORMALIZED (call immediates/relocations masked); 21 consumed log/account-name literals match but complete transitive callee + data closure is unproven; transitive_data_equivalence_proven=False.
- **Why:** Normalization masks relocated call targets, so a match proves local body shape but not that every callee and every data referent is identical; recursive closure was never established.
- **Recoverable:** Partial via deeper closure proofs; never 100% without the original source.

### crank_donation_fee_pda exhaustive coverage — **NOT 100% - BOUNDED ONLY**
- **Missing:** Bounded only via the ten-step donation sequence + 20 focused cases (12 typed combos were new historically; the current borrow checkpoint repeats all 20 with 0 new unique cases). The donation relay program (RLAYHr9...) executes only as an external test dependency; its internal behavior is not reproduced; no exhaustive input coverage.
- **Why:** The relay is a separate program outside reconstruction scope; focused cases strengthen diagnostics rather than add input variety.
- **Recoverable:** Partial (more fixtures for the crank path); relay-internal behavior is out of scope.

### claim_social_fee_pda_v2 full closure — **NOT 100% - NORMALIZED-ONLY**
- **Missing:** 560-byte exit, 7 direct-call targets and 3 bounded literals match; complete parser + transitive-data closure and whole-window identity unproven. Social associated-token admission: all 17 immediate helper targets normalized-match but complete helper/body and recursive data closure remain unequal/unproven.
- **Why:** Lost source; matching is at the normalized-body level only, so helper/body and recursive data equivalence are not established.
- **Recoverable:** Partial; not to byte-identity.

### Legacy/V2 sharing-update caller (update_fee_shares / _v2) — **NOT 100% - COMPOSITION OPEN**
- **Missing:** V2 CPI/meta/info roots + 96 legacy CPI/meta/info/exit/event targets + 176 social targets match normalized; FULL legacy and V2 caller/parser/cleanup/data identity is OPEN. Independent review notes straight-line composition does not evaluate branches and the AccountInfo-clone abstraction does not establish padding bytes. Multiple uncompiled proposals (v2-caller-source-proposal, legacy-caller-interrupted/reviewed-proposal, legacy-quote-admission-source-proposal) are un-integrated.
- **Why:** The handler is a reconstructed composition of version/authorization/quote/preprocess/payout/CPI steps; source-level parser/error/borrow/cleanup semantics and full data flow are not proven.
- **Recoverable:** Partial; not to identity.

### Source-line / coordinate differences (pervasive) — **NOT 100% - UNRECOVERABLE**
- **Missing:** Every matched window matches ONLY after masking source-location constants; compute-unit consumption differs on matched handlers. Examples: create_fee_sharing_config.rs recorded line 5 vs original 37; buyback require_gt!, set_authority guard, and update-admin bodies match structure but source-location immediates differ; linux-darwin attribution improves 14 source-location tuples without proving the build host.
- **Why:** Original source file paths and line numbers are lost; panic/log/error call sites embed file:line literals in .rodata/.text that cannot be reconstructed exactly.
- **Recoverable:** No (literal source coordinates are unrecoverable).

### Whole-binary byte non-identity — **NOT 100% - 0/4 CORE**
- **Missing:** Original 948,944 B vs candidate 850,600 B (length_difference -98,344; -22,656 on ELF extent since original has 75,688 B of verified-zero trailing padding). first_difference at byte 24; 465,113 differing positions across the shared length. full_byte_equality=false; whole_core_binaries_equal=0/4.
- **Why:** Structural reconstruction differences span every section; behavioral equivalence does not imply byte equivalence, and the residual is fundamentally bounded by the lost literal source.
- **Recoverable:** No. Not recoverable to byte-identity with the source/toolchain lost.

### Relocation / data-section structural divergence — **NOT 100% - STRUCTURAL**
- **Missing:** Despite a SMALLER .text, the candidate emits MORE relocations than the original: .rel.dyn 45,120 vs 43,968 B (+1,152); relocated targets 2,283 vs 2,214 (+69); .data.rel.ro 7,400 vs 6,744 B (+656); candidate_indirect_calls 122 vs original 121.
- **Why:** Different relocation/codegen strategy (more GOT/relative relocations, different data placement) from the reconstruction's compiler/source vs the original's.
- **Recoverable:** No to identity; indicative of a genuinely different build graph.

### .rodata deficit (-580 B) — **NOT 100% - CONSTANT POOL**
- **Missing:** Candidate .rodata 20,499 B vs original 21,079 B (-580 B); the constant-pool / string-literal set (error messages, embedded source-path strings) differs.
- **Why:** Reconstructed error/log strings and source-path literals do not match the original's exact literal set and ordering.
- **Recoverable:** Partial (some strings recoverable from behavior); not to identity.

### Immediate-call residuals / transitive-call closure — **NOT 100% - CLOSURE UNPROVEN**
- **Missing:** 273 immediate-call residuals: 179 unique-target-pattern-points-elsewhere, 92 immediate-target-window-unresolved, 2 terminal-boundary-only. 27 'consistent' candidate ranges still lack all immediate targets. transitive_data_equivalence_proven=False for ALL 585 original windows.
- **Why:** Normalized matching masks call immediates, so even mapped windows do not prove the full recursive call/data graph; closure was explicitly not attempted to completion.
- **Recoverable:** Partial; not to 100% without source.

### Compiler / historical build recipe unresolved — **UNRESOLVED**
- **Missing:** status.json records compiler='unresolved', build_flags='unresolved', preferred_compiler_candidate='v1.44', while the actual build used platform-tools v1.43 (cargo build-sbf) tagged v1.44 and stripped with v1.52 objcopy. No process-level invocation-hash trace or unique tool pipeline is established. The hosted Linux run (40166255149) produced a 768,984 B candidate differing from both the original and the Darwin build.
- **Why:** No captured build logs or toolchain provenance survive from the original author; only a controlled executable comparison was reconstructed, not the historical recipe.
- **Recoverable:** No (exact historical recipe/flags lost). The v1.43-vs-v1.44 question is still recorded as unresolved in the committed metadata.

### No historical source recovered; semantic equivalence not claimed — **NOT 100% - BOUNDED SCOPE**
- **Missing:** historical_source_recovered=false. Scope is explicitly 'bounded status is not exhaustive semantic equivalence.' The 17,461 receipts include non-unique repeats (e.g. 56 transfer repeats + 1 serialization repeat add retained signatures, not new input cases); exhaustive input coverage and whole-program equivalence are absent.
- **Why:** Reconstruction is behavior-bounded from captured I/O, not derived from recovered source.
- **Recoverable:** No to full semantic/source equivalence; yes to incremental bounding.

### withdraw missing-token-program error path: static-only — **STATIC-ONLY**
- **Missing:** Per the current checkpoint README, the final missing-token-program application error has STATIC support only; existing runtime cases hit earlier checks or parser constraints, so no differential fixture actually exercises that branch. (Missing-vault and missing-user errors DO have direct runtime coverage.)
- **Why:** No existing fixture reaches that specific branch at runtime.
- **Recoverable:** Yes - a targeted fixture reaching the missing-token-program branch would convert this to runtime-covered.

### Doc/state inconsistency + active candidate churn — **INCONSISTENCY (REPO HYGIENE)**
- **Missing:** completion.json names legacy-social-admission-v144 (sha 8ff12f9c) as current while status.json names withdraw-owned-error-main-v144 (sha 76b027c2); within this session the 'current' candidate moved v2-caller-v144 -> withdraw-owned-error-main-v144 (new dirs written 02:32-02:33). completion.json's bounded_handler_percent (93.33%, =140/150) is a cross-program figure, not a pump_fees measure.
- **Why:** A parallel active session is adding checkpoints and updating status.json faster than completion.json/docs are regenerated.
- **Recoverable:** Yes - regenerate completion.json/docs from the current status.json candidate to remove the stale pointer.

## Mayhem

_Fresh gap audit of the mayhem reconstruction, re-derived from the live repo (programs/mayhem/src, repro/status.json, repro/completion.json, docs/COMPLETION.md, repro/mayhem differential + static evidence, evidence/original/mayhem/deployed.so via scripts/analyze.py elf_layout). VERIFIED STATE: the original binary embeds exactly 25 Instruction log names; 24 handlers are behaviorally bounded (9,595 functional differential comparisons pass with 0 functional mismatches), and 1 (initialize_mayhem_state) is unrecovered and deliberately STOPPED. Compiled with platform-tools v1.52 (confirmed in build-comparison.json selected_toolchain). Main candidate .text = 606,776 B vs original 706,744 B = 85.9% (the twentyfour checkpoint is 605,928 B = 85.7%). Whole-binary byte identity is FALSE and fundamentally bounded: the global-params review counts 471,575 differing byte positions; the reconstruction has 312 fewer relocations and is independently written, not the lost original source. Nothing missing is a hidden or extra handler -- the handler set is complete at 25. The not-100% items are: the stopped initializer, ~100 KB of .text dominated by codegen/structural divergence (only ~12 KB is the unrecovered initializer), the non-initializer error-return ABI/codegen path, 61 panic/diagnostic source-location rows (incl. 8 unwrap-detail), 5 unknown GlobalParams field roles, residual neutral MayhemState fields, and unresolved compiler/stdlib/framework provenance. INTEGRITY: originals used only as comparison inputs; no STOPPED handler executed; no fabrication; no commit/push performed._

### initialize_mayhem_state handler (25th handler) unrecovered / STOPPED — **UNRECOVERED_STOPPED**
- **Missing:** The entire 25th handler: the InitializeMayhemState dispatch wrapper (orig .text 528112-528568, 456 B) plus its unique body/parser targets (430840-439624 = 8,784 B; 447984-449536 = 1,552 B; 534840-535800 = 960 B), ~11,752 B of unique original .text. The MayhemState account (state.rs) is only partially characterized because the code that writes its fields at init is this handler. No handler body, account-context validation, or MayhemState initialization logic is reconstructed.
- **Why:** Deliberately stopped lane (docs/COMPLETION.md line 33/35: 'mayhem.initialize_mayhem_state -- unrecovered'; 'must not be reassigned as a workaround'). set-up has static router metadata only and lacks a valid genuine Mayhem PDA invocation to validate against; the authentic historical source is lost and no synthetic signer bypass is accepted. This pass did not run it per task integrity rules.
- **Recoverable:** No under current constraints. Only conditionally recoverable if the lane is un-stopped AND a genuine historical PDA-signed init transaction (or authentic source) becomes available; cannot be closed with synthetic fixtures.

### ~100 KB missing .text / whole-binary byte non-identity — **NOT_BYTE_IDENTICAL_FUNDAMENTAL_LIMIT**
- **Missing:** Main candidate .text = 606,776 B vs original 706,744 B = 99,968 B (~100 KB, 85.9%) missing; .rodata -1,808 B; .rel.dyn 2,548->2,236 entries (-312 relocations). Whole-file identity false (global-params review: 471,575 differing byte positions; 40 raw-equal and 172 normalized-equal candidate bodies out of ~410 -- most bodies are NOT byte-identical).
- **Why:** Two distinct causes. (a) ~12 KB is the genuinely unrecovered initializer code. (b) The remaining ~88 KB is structural codegen divergence across the 24 bounded handlers: the reconstruction is behaviorally equivalent but independently written and compiled with an unresolved exact compiler/stdlib/Anchor revision, so it emits fewer calls, instructions and relocations than the original. Behavioral equivalence != byte equivalence; the original's literal source is lost.
- **Recoverable:** No for byte identity (fundamental limit, same class as pump_amm). The ~12 KB initializer slice is conditionally recoverable only via the stopped initializer lane; the ~88 KB codegen delta is not recoverable without the exact original source + toolchain.

### Non-initializer error-return ABI / codegen differences — **PARTIAL**
- **Missing:** Exact original failure-construction ABI is matched only for the vs==0 equality case. The original BuyPumpSwap/SellPumpSwap sizing guard is strict 'effective_quote > output', constructing typed error discriminant 11 (PumpSwapCpiMathOverflow, Display 'Math Overflow in Pump Swap CPI call', via core::result::unwrap_failed with 'called `Result::unwrap()` on an `Err` value') for BOTH equality and effective_quote<output. The candidate evaluates 'vs-output' directly, so the effective_quote<output case still generates a subtract-with-overflow panic (a different failure path). Register allocation, ABI and raw byte identity of all error paths are not matched.
- **Why:** The strict-guard order and failure-construction differ from the independently-written source; the typed-error checkpoint (sell-result-error-twentyfour) intentionally fixed only checked_div's None/equality case and left the subtraction-underflow branch intact pending a separately reviewed source/effect-order contract. Lost source prevents exact instruction-order/ABI replication.
- **Recoverable:** Partial. The effective_quote<output typed-error branch is conditionally recoverable with a reviewed source/effect-order contract (source proposal exists in source-review.md); exact register/ABI/raw-byte identity of error paths is not recoverable.

### Panic / AnchorError diagnostic source-location differences — **UNRESOLVED**
- **Missing:** 61 diagnostic rows differ in the current checkpoint (20 distinct original->candidate signatures). Originals cite 'programs/mayhem-program/src/state.rs' (52 rows, e.g. 562:32 add-overflow, 321:26 sub-overflow, 378:89 / 398:90 / 463:14 / 490:14), 'programs/mayhem-program/src/instructions/pump_amm_interface.rs' (6 rows, e.g. 403:23), and a burn.rs AnchorError (MayhemModeEnded 6004 at burn.rs:82) plus 3 second-burn source-location rows. Candidate cites src/instructions/*.rs with different line:col.
- **Why:** The original literal source file paths, line numbers and column numbers are baked into the stripped binary's panic/AnchorError machinery and are lost. The reconstruction's module layout differs structurally: it has no central state.rs math module and no pump_amm_interface.rs module (math is inlined per-handler), so paths and offsets can never coincide. docs/COMPLETION.md line 46 still says '26 panic diagnostic differences' -- that is a narrower/older figure than the current 61 rows (line 104 agrees on 61).
- **Recoverable:** No. Requires the original source tree (exact file names, line and column layout); cannot be recovered or faked (fabricating source locations is barred).

### Unwrap-detail diagnostic differences (subset, called out per task) — **UNRESOLVED**
- **Missing:** 8 rows (4 distinct signatures) where the ORIGINAL emits a bare panic (e.g. state.rs 378:89 and 398:90) with NO 'Program log:' message line, while the candidate emits 'called `Option::unwrap()` on a `None` value' before panicking. Affects buy, sell and the sell_v2/buy_v2 native/token/token22 families.
- **Why:** At those sites the original codegen did not print the Option::unwrap message (different construct or stripped/omitted formatting), whereas the reconstruction's standard .unwrap() emits the panic message. Matching requires reproducing the exact original construct/codegen, which the lost source precludes.
- **Recoverable:** No without the exact original construct/compiler behavior; part of the same lost-source limit as the broader diagnostic rows.

### Five unknown GlobalParams field roles — **UNRESOLVED**
- **Missing:** Business semantics and historical names of 5 of the 16 update_global_params fields: field_0 (u32, acct[8,12)), field_1 (u32, acct[12,16)), field_3 (u64, acct[24,32)), field_6 (u8, acct[137,138), unrestricted byte not proven bool/enum), field_10 (u64, acct[166,174), preserved across reset_state). Kept as neutral names in lib.rs / UpdateGlobalParamsArgs.
- **Why:** No admitted trade-body or other consumer reads these five; only optional-store, reset-partition and update-event transport behavior is statically proven. A 339-hit load/store offset survey is entirely 'owner unresolved' (offsets are not pointer provenance). field_8 and field_15 are now attributed (withdrawal interval/last-timestamp used by withdraw_admin / withdraw_quote_admin), which is why 7 crosswalk-unresolved args reduce to 5 truly unknown.
- **Recoverable:** No from current corpus. Would need resolved pointer/call provenance (an identified consumer) or authentic historical source; the review explicitly declines to guess names like duration/threshold/mode.

### Residual neutral MayhemState fields — **UNRESOLVED**
- **Missing:** MayhemState.field_8 (u64, offset 8) and flag_88 (bool, offset 88) have no role established by the six recovered trade bodies; field_56/field_72 (i128) signedness is inferred from trade behavior, not proven by type; mint/status/burned_amount only partially characterized (burned_amount named only from the burn path). The decoder constraints (status accepts 0/1/2; flag_88 accepts 0/1) are observed, not semantically named.
- **Why:** Only the six trade bodies plus the burn path were examined; the code that fully exercises/writes these fields is the STOPPED initialize_mayhem_state handler, so their init-time semantics cannot be observed without un-stopping that lane.
- **Recoverable:** Partial. field_8/flag_88/status semantics are largely gated on the stopped initializer; absent that, closure needs additional consumers or authentic source.

### Compiler / stdlib / Anchor framework provenance — **UNRESOLVED**
- **Missing:** Exact original toolchain and framework revision. status.json records compiler/dependencies/build_flags 'unresolved'; the candidate is built with platform-tools v1.52 (build-comparison.json selected_toolchain=v1.52, cargo-build-sbf 2.1.21, build rustc 1.89.0-dev/LLVM 20.1.7). Compiler family candidates are v1.52-v1.56; framework is 'Anchor 1.0.0 ... exact historical revision unresolved'. The original's rustc/stdlib hashes are unknown.
- **Why:** The deployed .so is stripped (no debug/build-id metadata); compiler fingerprinting narrows the family but cannot pin the exact platform-tools/rustc/stdlib/Anchor revision used to produce the original.
- **Recoverable:** No (family-bounded only). Exact identity is unlikely to be recoverable from the stripped artifact; it would require build-id/metadata or the original build environment.

## External dependencies

_Fresh re-derivation of the external-dependency gap, verified by independent shasum/byte-diff of evidence/dependencies/* against rebuilt candidate ELFs (no builds launched, no stopped handlers run, originals used only as comparison inputs). Dependency byte-exactness is 2/5. CONFIRMED byte-identical: spl_token (sha 8190d3f7..., full match) and spl_token_2022 (sha 15a2e615..., full match incl. 770,960 regenerated zero-padding bytes). NOT byte-identical, each independently re-measured: token_metadata = exactly 1,509 differing positions (1,250/1,251 function windows identical; remainder is the 5,104-byte Utilize body's branch/block ordering = 1,477 text + 2 reloc bytes, plus 30 data.rel.ro bytes = 29 Rust source-coordinate records); associated_token best candidate = exactly 307 differing bytes (304 .text + 3 .rel.dyn, same 105,032-byte size) from two swapped RawVec::reserve_for_push specializations — NOT 'custom_panic' as the task note stated; donation_relay has no recovered original source at all (embedded daas repo 404s), best behavioral candidate build-09 is 469,016 vs original 830,448 bytes with 369/492 windows unmatched. All four non-SPL/non-2022 security audits are marked incomplete. Key correction vs task context: ATA's 307 bytes are RawVec specialization ordering, not custom_panic; and donation_relay DOES have reconstructed source candidates (build-02..09), but none attributed to the lost original._

### spl_token — **DONE — BYTE-IDENTICAL (FULL_BYTE_EQUALITY TRUE)**
- **Missing:** Nothing for byte identity. Only the security audit is marked incomplete in repro/dependency-status.json.
- **Why:** Public source exists and reproduces exactly. Independent shasum confirms evidence/dependencies/spl_token/deployed.so == repro/pump/verified-spl-token/pinocchio_token_program.so (8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697). Rebuilt from solana-program/token @ a94dd197, solana-verifiable-build image, linux/amd64, cargo build-sbf --tools-version v1.54, host 1.86.0; CI run 40145016333 success.
- **Recoverable:** n/a — complete. (Only outstanding item is the incomplete security audit, which is orthogonal to byte identity.)

### spl_token_2022 — **DONE — BYTE-IDENTICAL (FULL_BYTE_EQUALITY TRUE)**
- **Missing:** Nothing for byte identity. Security audit marked incomplete.
- **Why:** Public source reproduces exactly. Independent shasum confirms evidence/dependencies/spl_token_2022/deployed.so == repro/pump/verified-token-2022/rebuilt.deployed.so (15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d), including the 770,960-byte zero allocation tail regenerated and separately checked. Source-program/token-2022 @ 8867f751, cargo build-sbf, host 1.93.1; CI run 40145370873 (token-2022 job) success.
- **Recoverable:** n/a — complete. (Security audit incomplete, orthogonal.)

### token_metadata (Metaplex) — **NOT 100% — 1,509 DIFFERING BYTES (INDEPENDENTLY RE-MEASURED, FIRST 238802, LAST 671632)**
- **Missing:** (1) A verified x86 build whose Utilize body (ordinal 346, 5,104 bytes) matches the original's conditional-branch and block ordering — 1,477 differing .text bytes + 2 relocation bytes = 1,479. The zero-use 'reject-zero-with-NotEnoughUses' single-branch correction plus the edition-conversion data-length-read reordering is a STATIC HYPOTHESIS only: candidate-build-11 did not realize it and hosted job 40157796106 failed full-byte equality. (2) 30 bytes in data.rel.ro = 29 decoded Rust source-coordinate records. 1,250/1,251 function windows are already raw-identical; the 86,543-byte allocation tail is verified zero.
- **Why:** Lost literal historical source. The exact predicate/statement ordering of the Utilize/ApproveUseAuthority zero-use path is not uniquely determined by the stripped binary, and the 29 source-coordinate records encode the original build's absolute source file paths and line/column numbers, which cannot be reproduced from a binary. The 135 retained regression comparisons pass but do not exercise the zero-use boundaries, so they cannot certify the Utilize branch either.
- **Recoverable:** PARTIAL. ~1,479 text+relocation bytes recoverable in principle via a correct source patch verified by a rust-1.69.0 x86 verifiable build (toolchain and CI already in place) — but not yet achieved. ~30 source-coordinate bytes (29 records) are fundamentally unrecoverable (lost source paths). Security audit incomplete.

### associated_token (ATA) — **NOT 100% — BEST CANDIDATE 307 DIFFERING BYTES (INDEPENDENTLY RE-MEASURED; SAME 105,032-BYTE SIZE, FIRST DIFF 28601)**
- **Missing:** The authentic historical build recipe for the f5ce86d4 source: exact resolved lockfile, feature graph, host Cargo / BPF-Cargo versions, and the full rustc invocation — specifically the spl_token_2022 package-metadata argument that determines Rust 1.59 mono-item/symbol ordering. The 307 bytes are 304 in .text + 3 in .rel.dyn, attributed to two swapped RawVec<T,A>::reserve_for_push specializations (u8 vs solana_program AccountMeta). NOTE: this is RawVec specialization ordering, NOT 'custom_panic' as the task context stated. All inferred windows correspond only under address mapping, which is not raw equality.
- **Why:** Rust 1.59 sorts specializations of the same generic by definition index then mangled symbol name; package metadata is a plausible ordering input but the original build's metadata inputs were never recorded. The official release names only Solana 1.10.33 / Ubuntu 20.04 / Anchor 0.24.2 — an incomplete spec. Present-day GitHub release/Actions/PR-3427 queries all return zero binding records. status.json's 'latest tested' points to build-5 (1,506 diffs); the genuine best checkpoint is build-2/build-4 at 307 diffs.
- **Recoverable:** Only with NEW external evidence: an archived release-upload or build manifest tying the asset hash to source revision + lockfile + feature graph + exact rustc invocation (or a retained original intermediate libspl_token_2022 to fix specialization order). Not recoverable from currently available public records — exhausted; preserved at the 307-byte checkpoint rather than an unprincipled flag/path/version search. Security audit incomplete.

### donation_relay — **NOT 100% — NO ORIGINAL SOURCE RECOVERED; WHOLE-FILE EQUALITY FALSE, 369/492 WINDOWS UNMATCHED**
- **Missing:** The original source itself and its build recipe. The embedded security.txt source URL (github.com/CherryDevelopmentOrg/daas) returns HTTP 404. Best behavioral candidate build-09 (pass-14) is 469,016 bytes vs the original's 830,448 (~44% smaller; a 380,400-byte original-only tail plus 246,774 differing common-position bytes in the build-03 full inventory). Of 492 original inferred windows: 33 raw-matching + 123 normalized-shape = 156 matched, 369 unmatched. The candidate's recipe (v1.44 compile + v1.52 strip) is candidate provenance, not recovered original provenance. 12 ordinary runtime cases pass.
- **Why:** No public source candidate exists anywhere. Software Heritage, Wayback, the CherryDevelopmentOrg public repo inventory (only two unrelated forks), Halborn's public report catalog, official donate.gg docs, and the verify.osec.io registry all lack an artifact-linked source or assessed commit — the daas repo is private, deleted, or renamed. Without original source there is no basis for byte identity, only behavioral reconstruction. NOTE: contrary to the task context ('no recovered source candidate'), reconstructed source candidates build-02..09 DO exist — but none is attributed to the lost original.
- **Recoverable:** Not currently recoverable: requires a publisher-owned source revision or an archived build/release manifest tied to this program ID; none is publicly available. Behavioral reconstruction is advancing but far from whole-file identity (369/492 windows unmatched). This is the least complete dependency. Security audit incomplete.

## Recipe / build / audit (cross-cutting)

_Fresh gap audit re-derived from the live repo (repro/status.json, completion.json, docs/COMPLETION.md + RECOVERY.md + TOOLING.md, audit/AUDIT.md, .github/workflows/*, scripts/core_linux_v144_build.py, scripts/pump_build_token_dependency.py, scripts/*surfpool*.py, analyze.py elf_layout, pass-10 CONCURRENT-CLAIMS-REVIEW). CRITICAL INTEGRITY FINDING: the task's 'ESTABLISHED CONTEXT' (real compiler = v1.43, v1.44 'wrong'; pump_amm .text 99.9% / pump_fees 99.0% / pump 86.3% / mayhem 85.7%; byte-identicality fundamentally impossible) is taken from repro/parallel-work/2026-10-25/independent-reconstruction-review/BYTE-IDENTICALITY-FUNDAMENTAL-LIMIT.md, a doc that commit d66a28a4 annotated as 'not accepted' and that is DELETED in the working tree; pass-10/CONCURRENT-CLAIMS-REVIEW.md explicitly declines to adopt its compiler identity, completeness percentages, and impossibility claim. The verified accepted repo state is the OPPOSITE on compiler: compiler='unresolved', v1.44 is the preferred header-matching stock candidate, and stock v1.43 is EXCLUDED on ELF-header grounds. The .text percentages do not appear anywhere in the committed repo. I did not adopt the task premises; every item below is grounded in committed evidence. The only hard numbers the repo stands behind are 140/150 (93.3%) bounded handlers and 0/4 core (2/5 dependency) whole-binary equality; security_audit_complete=false. Not committed/pushed; read-only plus evidence.json under work/reconstruction-review-2026-10-25/gap-audit/recipe-build-audit/._

### Compiler identity for pump/pump_amm/pump_fees is UNRESOLVED (not v1.43) — **NOT-100% / UNRESOLVED**
- **Missing:** No uniquely established historical compiler. repro/status.json has compiler='unresolved' with shortlist v1.44/v1.45/v1.46/v1.46.1. v1.46.1 was never even built. Only header compatibility (ELF e_machine=263, e_flags=0) and a couple of matched runtime helper bodies distinguish candidates; nothing uniquely selects one.
- **Why:** Binary-only recovery: the header pair (263,0) is produced by v1.44's unconditional machine-263 writer with flags 0, and v1.45/v1.46/v1.46.1 share that behavior, so header evidence cannot discriminate among them. Full-binary differs under all four, so no candidate is confirmed. IMPORTANT: stock v1.43 is affirmatively EXCLUDED here (its SBF writer only emits machine 263 for CPU sbfv2, which also sets EF_SBF_V2=0x20, contradicting the captured flags=0) — directly contradicting the task's 'v1.43 is the real compiler' premise. v1.43 appears only as (a) a relocation-excluded fee-selector fragment match and (b) the default llvm-objcopy STRIP tool in the unmodified Linux SDK, never as the compile tool.
- **Recoverable:** Partial. Narrowing to one of v1.45/v1.46/v1.46.1 is possible by building the frozen source under each and comparing selected-helper bodies (repo recommends this). A unique, proven historical compiler likely is NOT recoverable from the binary alone — it needs the original build records.

### Compiler identity for mayhem is UNRESOLVED (v1.52-v1.56 family) — **NOT-100% / UNRESOLVED**
- **Missing:** mayhem compiler='unresolved', shortlist v1.52/v1.53/v1.54/v1.55/v1.56; only the family (newer than the core trio) is bounded, not a specific version.
- **Why:** Same binary-only limitation; the committed candidate (sell-result-error-main-twentyfour, 668,640 bytes) differs from the captured original, so no version is confirmed. v1.52 is the family lead candidate (and the Darwin strip tool), consistent with the task's 'v1.52 for mayhem', but still unproven.
- **Recoverable:** Partial by differential build comparison across the family; exact version not guaranteed recoverable from the binary.

### Task 'established context' rests on a repudiated/deleted document — **NOT-100% / CONTRADICTED PREMISE (PROCESS-INTEGRITY GAP)**
- **Missing:** The premise fed to this audit (v1.43 corrected / v1.44 wrong; .text 99.9/99.0/86.3/85.7; 994 fewer calls, 663 fewer relocations; byte-identicality fundamentally impossible) is not substantiated by the accepted repo and partly contradicted by it. The .text percentages appear nowhere in the committed tree.
- **Why:** That text is verbatim from BYTE-IDENTICALITY-FUNDAMENTAL-LIMIT.md, which commit d66a28a4 banner-marked 'its compiler, completeness, exhaustive-equivalence and impossibility claims are not accepted' and which is deleted in the working tree. pass-10/CONCURRENT-CLAIMS-REVIEW.md: 'No historical compiler identity, exhaustive behavioral equivalence, complete recovery or SDK-wide acceptance is adopted from the concurrent report' and 'The absence of the original source does not prove that producing the same machine code is impossible.' Acting on the premise (e.g. switching candidates from v1.44 to v1.43) would REGRESS the verified header match.
- **Recoverable:** Yes — resolve by treating the accepted record (status.json/pass-10) as authoritative and reconciling or removing the historical doc's claims wherever they still leak into prose; do NOT re-pin to v1.43.

### Historical build FLAGS are unresolved — **NOT-100% / UNRESOLVED**
- **Missing:** build_flags='unresolved' for all four programs. The only flags in play are the reconstruction's own workspace profile (panic=abort, overflow-checks=true, lto=false, codegen-units=1 in Cargo.toml) plus cargo build-sbf defaults; the original author's exact flag set (opt-level, codegen-units, LTO mode, target-cpu, strip settings, any RUSTFLAGS) is not established.
- **Why:** Flags are not fully encoded in the binary; multiple flag combinations can map to the same or near-same output, and the current candidates differ from the captured original anyway, so no flag set is confirmed as historical.
- **Recoverable:** Partial. Some flags are constrained by section/layout and overflow-check presence; a fully proven historical flag set is not recoverable from the binary without the original build config.

### Dependency graph / lockfile exactness is unresolved — **NOT-100% / UNRESOLVED**
- **Missing:** dependencies='unresolved'. The build uses a scratch Cargo.lock with a handful of audited pins (blake3 1.8.2, proc-macro-crate 3.3.0, indexmap 2.11.4, unicode-segmentation 1.12.0) layered onto an inherited lock; the complete, uniquely-correct historical dependency selection graph is not established. Rust source family is bounded to the 1.79 line only.
- **Why:** The exact transitive crate versions the original was built against are not derivable from the stripped binary; selected-helper body matches narrow but do not uniquely identify the graph (status.json coverage_limitations say so explicitly).
- **Recoverable:** Partial via helper-body differential narrowing; a unique historical lockfile is not binary-recoverable.

### Committed candidates and CI recipe are pinned to v1.44 ('v144') / mayhem 'twentyfour' — **NOT-100% (BY DESIGN, BUT SINGLE-VERSION PIN)**
- **Missing:** candidate_artifact paths and workflow (.github/workflows/core-linux-v144.yml) pin the v1.44 recipe (formatter-restoration-main-v144, v2-caller-v144, buy-mode-order-main-fortyeight; mayhem sell-result-error-main-twentyfour). The alternative header-compatible compilers (v1.45/v1.46/v1.46.1) are not pinned or, for v1.46.1, not built.
- **Why:** v1.44 is the correctly chosen preferred candidate per accepted header evidence (NOT 'wrong' as the task states), but it is still only one of four header-compatible versions, so the pin reflects a bounded hypothesis, not a proven recipe.
- **Recoverable:** Partial. The pin is defensible and should stay on v1.44; closing it to a single proven version requires the cross-version helper-body study (and ideally original build records). Do not switch the pin to v1.43.

### Darwin-vs-Linux strip-phase provenance is incomplete — **NOT-100% / PARTIAL TRACE**
- **Missing:** No complete historical process-invocation trace. The recorded Darwin pipeline compiles pump/fees with v1.44 but strips via SDK-selected v1.52 llvm-objcopy; the unmodified official Linux SDK instead defaults to v1.43 strip. Which host/strip path the original used is not established.
- **Why:** Only before/after files and SDK selection were recorded, not the original toolchain's actual invocation; two early hosted attempts stopped before compilation.
- **Recoverable:** Partial. Linux/Darwin attribution (repro/pump_fees/linux-darwin-v144-attribution) favors a Linux-distributed sysroot family via 14 source-location tuples but does not prove a unique build host; full proof needs original CI/build logs.

### Whole-binary byte-identicality: 0/4 core programs — **0/4 (CONFIRMED)**
- **Missing:** No core program (pump, pump_amm, pump_fees, mayhem) byte-matches its captured original. Representative residual: pump_amm has 306-310 unmatched original function windows after the formatter restoration; recursive data and truthful source-location differences remain across all four.
- **Why:** The literal original source is lost and the repo reconstructs behavior from the binary; a behavior-matched reconstruction makes different inlining/helper-factoring/item-order choices than the original author, which the stripped bytes do not uniquely pin down. (Note: the repo's ACCEPTED position, pass-10, is that this is an open gap, NOT a proven impossibility — the stronger 'fundamental limit' framing in the task is explicitly not accepted.)
- **Recoverable:** No from the binary alone for exact identity; would require the actual lost source/build records (organizational/forensic recovery). Further reconstruction can keep shrinking unmatched windows but is not guaranteed to reach 0.

### Dependency byte-identicality: 2/5 captures (ATA, Metaplex, Donation relay not identical) — **2/5 (CONFIRMED)**
- **Missing:** Only SPL Token (108,600 bytes) and Token-2022 (with regenerated zero padding) byte-match. Associated Token Account differs by 307 raw bytes (304 text, 3 relocation); Metaplex token-metadata differs by 1,509 bytes with the 5,104-byte Utilize body unmatched (1,250/1,251 windows); Donation relay has 369 unmatched windows.
- **Why:** SPL Token / Token-2022 succeed because their literal source is public and pinned (solana-program/token@a94dd19, token-2022@8867f751). ATA's authentic historical build recipe is missing; Metaplex's registry source pointer resolves to a failed/mismatching Phoenix build that is rejected as attribution; relay source/build provenance is open.
- **Recoverable:** Partial. ATA/Metaplex could close if the correct upstream source+recipe is identified (currently unavailable/rejected); relay needs full source/build provenance. None is guaranteed.

### Offline reproducibility requires a pre-warmed cargo cache — **NOT-100% / ENVIRONMENTAL PRECONDITION**
- **Missing:** The core build is not self-contained offline: it needs an isolated CARGO_HOME pre-populated by prepare_cache.py (201 verified crate archives for the Fees case) before cargo --locked --offline will resolve; a cold/un-warmed environment fails (the first v1.43 attempt failed only because old cargo could not find ahash 0.8.12 in its older registry-cache namespace).
- **Why:** Older platform-tools cargo uses legacy registry-cache namespaces and cannot fetch while offline; the warm cache is a manual preparation step, not an automatic part of the build.
- **Recoverable:** Yes — fully scriptable (prepare_cache.py already exists); it is a packaging/documentation gap, not a fundamental limit.

### Verifiable dependency builds require x86 (linux/amd64) Docker — **NOT-100% / ENVIRONMENTAL PRECONDITION**
- **Missing:** Reproducing the token dependencies (scripts/pump_build_token_dependency.py) requires `docker run --platform linux/amd64` against pinned solanafoundation/solana-verifiable-build@sha256 images; on Apple-silicon/non-x86 hosts this runs under emulation and depends on Docker being present. No native-arm path exists.
- **Why:** The verified-build images are x86 and the original toolchain targets linux-x86_64; the platform-tools archives downloaded by core_linux_v144_build.py are also linux-x86_64.
- **Recoverable:** Yes operationally (provide x86 Docker / CI runner — CI uses ubuntu-24.04), but it is a hard environmental dependency, not removable.

### Core Linux hosted build is a controlled comparison, not the historical recipe or a byte match — **NOT-100% / CONTROLLED COMPARISON ONLY**
- **Missing:** The one completed hosted run (40166255149, frozen rev 4ffe8bd8) produced candidate 7e823e60... that differs from BOTH the captured original and the earlier Darwin build; no runtime validation or receipt transfer is claimed for it.
- **Why:** It fixes source+lock+SDK to demonstrate an executable, reproducible pipeline — it does not establish the original historical recipe or binary equality (and no version/flag/path brute-force or binary patching is authorized).
- **Recoverable:** Partial. Can be strengthened with more controlled runs; exact-original identity is bounded by the same lost-source limit as item 8.

### Security audit is incomplete (no sign-off) — **INCOMPLETE (SECURITY_AUDIT_COMPLETE=FALSE)**
- **Missing:** Not reviewed to completion: every current handler, every account relationship, every CPI, every arithmetic boundary, and deployment configuration. Also unreviewed/uncertified: macro-generated code, transitive dependencies, lifecycle/alias premises, valid-state economic invariants, rate limits, migrations, token-extension edge cases, and all incompletely reconstructed/stopped paths. AUDIT.md reports 0 confirmed findings at every severity, which it states does not establish security.
- **Why:** Reconstruction is incomplete (10 handlers not fully recovered), source reviews are frozen on older candidates, and local validation only exercises bounded malformed-input rejection plus 30 signed lifecycle txns — not valid-state safety across the surface.
- **Recoverable:** Partial/ongoing. Each reviewed area is closeable with effort, but a full sign-off is blocked until the reconstruction and reviews reach the current candidates and cover valid-state behavior; some depends on resolving the recovery gaps first.

### Security/source reviews are frozen on stale candidate revisions — **NOT-100% / STALE APPLICABILITY**
- **Missing:** The published source reviews are pinned to older commits (e.g. 329fc44, aa98fb45f3f756..., 517d77d, 7a9cf01) and do not automatically extend to the current checkpoints; the current Fees legacy-caller change, AMM formatter/accumulator changes and Pump buy-order/decoder changes postdate them.
- **Why:** Candidates advanced pass-by-pass (through pass-14) while reviews were snapshotted earlier; applicability is explicitly not transferred across later source changes.
- **Recoverable:** Yes — re-run the frozen reviews against the current HEAD candidates and reconcile deltas (this is called out as required before any sign-off).

### Mayhem is excluded from the malformed-input validation corpus — **NOT-100% / COVERAGE HOLE**
- **Missing:** The 393-case deterministic LiteSVM corpus (123 Pump, 105 PumpSwap, 98 Fees, 67 Mayhem cases but no recognized-instruction coverage) does not exercise recognized Mayhem instruction paths, because the capture has no official Mayhem IDL. Mayhem has 24/25 bounded handlers but no IDL-driven dispatch validation here.
- **Why:** No official Mayhem IDL was captured, so discriminators/argument layouts for Mayhem are inferred, not authoritative.
- **Recoverable:** Partial. Mayhem paths are covered by separate bounded differential suites; closing the IDL-level gap needs an authoritative Mayhem IDL, which is not in the capture.

### Surfpool runtime harness is hard-pinned to exactly surfpool 1.6.1 — **NOT-100% / GATED, NON-PORTABLE**
- **Missing:** Every surfpool harness (scripts/pump_*_surfpool.py, verify_imported_lab.py) asserts `--version == 'surfpool 1.6.1'` and raises/aborts otherwise. The 1.6.1 binary is NOT in the repo, so the entire signed/runtime re-validation lane cannot be re-run without separately obtaining that exact build, and it will not run against any newer surfpool.
- **Why:** The runtime receipts were captured against 1.6.1 and the harness enforces determinism by refusing any other version rather than adapting to surfpool 1.6.1+ API/behavior changes.
- **Recoverable:** Yes operationally (pin/ship the 1.6.1 binary or re-validate and re-pin to a newer surfpool), but currently a stale hard dependency that blocks runtime reproduction out-of-the-box.

### Exhaustive-input / all-state equivalence is not established — **NOT-100% / BOUNDED ONLY**
- **Missing:** 53,787 saved comparison receipts include repeat inputs and do NOT measure exhaustive coverage. 5 handlers remain partial (pump buy_v3, sell_v3, buy_exact_quote_in_v3, create_v2, multi_hop_curve_swap) with explicit unresolved routes (other quote currencies, transfer-fee/Token-2022 extensions, Mayhem/holder/cashback modes, arbitrary hop counts, completion/migration, exhaustive account validation, uninterpreted final event suffix). pump_amm.create_config has no authentic positive initializer replay.
- **Why:** Behavioral differential testing over finite fixtures proves only the exercised cases; full input-space equivalence is intractable to enumerate and the originals' edge behavior for unexercised branches is unverified.
- **Recoverable:** Partial. Each named branch is closeable with more fixtures/recovery work; literal all-input equivalence is not provable by testing.

### Five stopped lanes remain status-only (cannot be closed without running prohibited handlers) — **STOPPED / UNRECOVERED**
- **Missing:** pump admin_update_token_incentives, pump claim_token_incentives, pump set_mayhem_virtual_params, mayhem initialize_mayhem_state (all unrecovered), and the pump sell_v2 quote transfer-fee minimum-output/event mismatch corrective probe. set_mayhem_virtual_params and pump_amm.create_config have static body attribution but no valid genuine PDA-signed replay; sell_v2 transfer-fee boundary is a confirmed divergence with no corrected executable published.
- **Why:** These lanes were halted by automated safety review (privileged-PDA initialization) or remain confirmed reconstruction limits; the task itself forbids executing them, so their status cannot be advanced in this audit. The candidate is therefore not a deployable replacement.
- **Recoverable:** Blocked under current constraints. Recoverable only via authorized genuine-authority/PDA-signed replay (not synthetic signer bypass) plus source correction for sell_v2 transfer-fee — explicitly out of scope / stopped here.
