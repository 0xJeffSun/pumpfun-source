# Completion and remaining work

The instruction-implementation measure is **140 / 150 = 93.3%**, with five partial and five unrecovered handlers. The denominator uses 56 Pump, 38 PumpSwap and 31 Fees instructions from retained official IDLs, plus 25 currently identified Mayhem handlers. Implemented means bounded reconstruction with saved comparisons; it does not establish all input behavior. Two Fees dispatches are deprecated rejection paths.

The actual byte-for-byte acceptance measure is **0 / 4 core binaries (0%)**. No defensible single overall percentage combines that with handler coverage, unknown historical source, compiler/dependency attribution and the unfinished security audit. Saved cases include repeat inputs and do not measure exhaustive coverage.

| Program | Bounded implementations | Partial | Unrecovered | Whole original ELF equal |
| --- | ---: | ---: | ---: | --- |
| Pump | 48 / 56 | 5 | 3 | No |
| PumpSwap | 37 / 38 | 0 | 1 | No |
| Fees | 31 / 31 | 0 | 0 | No |
| Mayhem | 24 / 25 | 0 | 1 | No |

The current four candidates retain **53,735 differential comparison receipts**; Pump contributes 9,237 across 38 suites and separately passes 1,024 Surfpool comparisons. Complete instruction dispositions are in [completion.json](../repro/completion.json). Every implemented instruction also remains subject to unmatched whole-binary, transitive data/call, diagnostic and exhaustive-input gaps.

Current candidates are bound to the [Pump two-curve checkpoint](../repro/pump/tokenkeg-two-curve-fortyeight/README.md) (`5c1c1c2d…`, 1,576,744 bytes) and the [Fees inline-initializer checkpoint](../repro/pump_fees/initializer-inline-v144/README.md) (`01fedce5…`, 767,992 bytes). Both clean main builds are whole-file identical to their freshly tested scratch builds. The Fees correction retains 17,441 comparison receipts and its separate ten-step donation sequence; it adds no handlers or unique cases. Neither checkpoint changes the 140/150 instruction measure or 0/4 original-binary equality measure.

## Instruction work still incomplete

- **pump.admin_update_token_incentives** — unrecovered.
- **pump.buy_exact_quote_in_v3** — partial. Bounded SOL and synthetic USDC Token/Token2022 quote paths, configured creator fee/gross-spend truncation, funded completion using actual base-vault balances, optional fills and Mayhem crossing. Nested routes, transfer-fee extensions and exhaustive account validation remain unresolved.
- **pump.buy_v3** — partial. SOL and USDC quote branches, Mayhem/holder fields and cashback rejection. Other quote routes and exhaustive extension/account validation remain incomplete; final event suffix uninterpreted.
- **pump.claim_token_incentives** — unrecovered.
- **pump.create_v2** — partial. Normal SOL and whitelisted token quote creation, holder creation, quote-control consumer admission/reserves, configured creator fee checks, and depth-one nested creation from a normal SOL-root quote coin. Mayhem, migrated-parent and deeper nested paths remain partial or unrecovered.
- **pump.multi_hop_curve_swap** — partial. One native curve per genuine AMM-signed Pump CPI with flag 3, plus exactly SOL→A→B and B→A→SOL using ordinary Tokenkeg accounts and flags [1,2]/[2,1]. The two-curve paths require canonical pre-existing vaults, a native root storing quote zero, ordinary 166-byte curves and strictly non-completing buys. Broader routes, other quote currencies, arbitrary hop counts, Token-2022/extensions, holder/cashback/Mayhem modes and completion remain unsupported. The retained 56-case one-curve subset has 50 Pump CPI comparisons and 11 successes; the new 20-case subset has 18 Pump CPI comparisons and 16 successes.
- **pump.sell_v3** — partial. SOL and USDC quote branches, Mayhem/holder fields and cashback rejection. Other quote routes and exhaustive extension/account validation remain incomplete; final event suffix uninterpreted.
- **pump.set_mayhem_virtual_params** — unrecovered.
- **pump_amm.create_config** — unrecovered.
- **mayhem.initialize_mayhem_state** — unrecovered.

The two Pump incentive handlers and Mayhem initializer remain stopped. The confirmed Pump `sell_v2` quote transfer-fee minimum-output/event mismatch remains unresolved; that corrective probe lane is also stopped. These tasks must not be reassigned to another worker as a workaround. Earlier unintegrated v3 token-extension work and the aborted extra Metaplex runtime probe are not resumed.

`set_mayhem_virtual_params` has static body/wrapper/parser attribution but lacks a valid genuine Mayhem PDA invocation. `pump_amm.create_config` has static/rejection evidence but no successful fixed-admin historical replay. No synthetic signer bypass is an acceptable substitute. The ordinary Tokenkeg two-curve extension has 20 passing comparisons: 16 successes, two AMM zero-input rejections before Pump, and two final AMM slippage rollbacks after successful Pump execution. Its genuine caller/PDA signing covers only the two directions above. The earlier one-curve-only restriction remains historical; broader routing is still unrecovered.

## Remaining binary and dependency work

- **All four core programs:** recover unmatched original functions/windows, full call targets and referenced data, historical source/module coordinates, dependency selections, compiler/SDK phases, section layout and relocation identity. Inferred disassembly windows are not verified historical function boundaries, and normalized matches are not whole-byte equality.
- **Pump:** resolve the final TradeEvent u64 meaning, partial creation/trading/routes and remaining original body/data attribution. The current `5c1c1c2d…` candidate freshly matches the complete 1,840-byte BondingCurve serializer exit, all 25 direct call targets and its discriminator under the documented normalization; prior candidate offsets are not reused.
- **PumpSwap:** attribute unmatched windows, transitive data and admin source-location differences; current Pool and GlobalConfig serializers match under documented normalization. No fabricated source padding or diagnostic locations.
- **Fees:** all 31 bodies have bounded coverage; parser details, transitive helpers/data, source locations, compute use and full ELF identity remain unresolved. The retained eight-package Solana-family recovery improves six helpers and the formatter. The current inline-initializer correction additionally matches the complete 2,992-byte handler, 6,824-byte parser and 1,608-byte wrapper, nine immediate handler call-target bodies and two bounded literals. These matches do not establish unlimited transitive closure or a unique historical source/dependency graph.
- **Mayhem:** non-initializer error-return ABI/code-generation differences, five unknown GlobalParams field roles (two additional withdrawal-interval roles are now statically attributed), compiler/stdlib provenance and diagnostic differences remain. Twenty-six panic diagnostic differences include eight unwrap-detail differences. The initializer lane remains stopped.
- **SPL Token:** exact captured 108,600-byte payload rebuilt.
- **Token-2022:** exact captured payload rebuilt, including separately regenerated zero allocation padding.
- **Associated Token Account:** authentic historical build recipe missing; 307 raw bytes differ (304 text, three relocation). All 159 inferred windows correspond under the recorded address mapping, which is not raw equality.
- **Metaplex:** 1,250 / 1,251 raw windows match. Utilize is the remaining 5,104-byte body; 1,509 total differing bytes include text/source-coordinate/relocation differences. The 86,543-byte captured allocation tail is verified zero. Existing 135 comparisons do not cover every zero-use boundary.
- **Donation relay:** no recovered source-built candidate; 492 inferred windows remain source-unattributed, and 11 IDL dispatch branches are mapped. The previously identified repository is unavailable. Missing source is not evidence of 492 proven mismatches.

## Build verification and audit work

Two fixed-source Linux Fees attempts stopped before compilation. The first exposed an SDK installer provenance difference; the second stopped at the fetch/empty-target guard without enough retained state to distinguish its cause. Local reproduction proves that fetch can create `.rustc_info.json`; the helper now separates fetch and compilation targets and retains both states. The corrected pipeline passes 30 preparation and retention tests.

The recorded Darwin pipeline compiles Pump/Fees with v1.44 but strips through SDK-selected v1.52. The official Linux SDK defaults to v1.43 at that stage. The corrected fixed-source Linux pipeline pins both official tool distributions and the exact retained SDK, with a process trace and phase identities. [Hosted run 40166255149](https://github.com/lalalune/pumpfun-source/actions/runs/40166255149) completed one source build at frozen revision `4ffe8bd88761059693e481ae972443c10204f7af`. Its 768,984-byte candidate `7e823e605097cdba7a3d782a2f20edaee9980d7d5a29822ac7d1a43400620133` differs from both the captured original and the earlier Darwin build; no runtime validation or receipt transfer is claimed. The [bounded hosted evidence](../repro/pump_fees/linux-v144-hosted-comparison/README.md) includes the candidate and actual compiler-entry traces. This establishes an executable controlled comparison, not the original historical recipe or binary equality. No version/flag/path brute-force search or binary patching is authorized.

The security audit remains incomplete. Existing malformed-input/lifecycle checks and reconstruction regressions do not constitute a full review of every current handler, account relationship, CPI, arithmetic boundary or deployment configuration. Current source review and evidence applicability must be reconciled before any sign-off.

## Parallel ownership

The ordinary Tokenkeg two-curve extension and Fees inline-initializer correction now have validated main-path checkpoints; broader routing and whole-binary reconstruction remain open. Native workers also maintain portable function inventories. The first additional CLI pass assigned nine workers in separate scratch directories for Pump event attribution, Pump partial-path gap mapping, AMM residual functions, Fees residual functions, Mayhem non-initializer ABI, ATA recipe evidence, Metaplex Utilize attribution, donation-relay reconstruction and audit evidence coverage. They must preserve all stopped lanes, avoid duplicate compilation and return reviewable evidence before root integration.

A worker covers related functions as a dependency-aware group. Launching one process for every inferred disassembly window would duplicate helper analysis and would not establish completion. Each machine inventory retains every row, including unmatched and unresolved rows.

See [parallel ownership and configuration](PARALLEL_WORK.md) for the launched assignments and documented concurrency setting.

The [portable function inventories and follow-up studies](../repro/function-inventory/2026-10-24-374fcf0/README.md) preserve every row from the historical baseline, plus seven static studies/build proposals. Those baseline Pump/Fees tables are historical and remain distinct from the current two-curve and inline-initializer candidates.

The [first parallel research pass](../repro/parallel-work/2026-10-24/results/README.md) now supplies refreshed Fees residuals, every AMM residual row, 74 Pump partial-path gap rows, all 492 relay window dispositions/codecs and detailed ATA/Metaplex provenance. Eight public packages pass portable verifiers. These new analyses add no accepted handlers or whole-byte matches; subsequent scratch proposals are tracked separately.

The [second parallel research pass](../repro/parallel-work/2026-10-24/wave2-results/README.md) adds seven verified static/source packages. It includes the static source evidence for the Fees inline-account correction subsequently built and validated in the current checkpoint, uncompiled module reorganization, four relay wire parsers and arithmetic fragments, two newly attributed Mayhem fields and a public-source-only audit backlog. The correction adds no handler or unique comparison case. Scratch proposals and original-only fixtures do not change accepted completion counts.
