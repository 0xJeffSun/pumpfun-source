# Completion and remaining work

The instruction-implementation measure is **140 / 150 = 93.3%**, with five partial and five unrecovered handlers. The denominator uses 56 Pump, 38 PumpSwap and 31 Fees instructions from retained official IDLs, plus 25 currently identified Mayhem handlers. Implemented means bounded reconstruction with saved comparisons; it does not establish all input behavior. Two Fees dispatches are deprecated rejection paths.

The actual byte-for-byte acceptance measure is **0 / 4 core binaries (0%)**. No defensible single overall percentage combines that with handler coverage, unknown historical source, compiler/dependency attribution and the unfinished security audit. Saved cases include repeat inputs and do not measure exhaustive coverage.

| Program | Bounded implementations | Partial | Unrecovered | Whole original ELF equal |
| --- | ---: | ---: | ---: | --- |
| Pump | 48 / 56 | 5 | 3 | No |
| PumpSwap | 37 / 38 | 0 | 1 | No |
| Fees | 31 / 31 | 0 | 0 | No |
| Mayhem | 24 / 25 | 0 | 1 | No |

The current four candidates retain **53,715 differential comparison receipts**; Pump separately passes 1,024 Surfpool comparisons. Complete instruction dispositions are in [completion.json](../repro/completion.json). Every implemented instruction also remains subject to unmatched whole-binary, transitive data/call, diagnostic and exhaustive-input gaps.

## Instruction work still incomplete

- **pump.admin_update_token_incentives** — unrecovered.
- **pump.buy_exact_quote_in_v3** — partial. Bounded SOL and synthetic USDC Token/Token2022 quote paths, configured creator fee/gross-spend truncation, funded completion using actual base-vault balances, optional fills and Mayhem crossing. Nested routes, transfer-fee extensions and exhaustive account validation remain unresolved.
- **pump.buy_v3** — partial. SOL and USDC quote branches, Mayhem/holder fields and cashback rejection. Other quote routes and exhaustive extension/account validation remain incomplete; final event suffix uninterpreted.
- **pump.claim_token_incentives** — unrecovered.
- **pump.create_v2** — partial. Normal SOL and whitelisted token quote creation, holder creation, quote-control consumer admission/reserves, configured creator fee checks, and depth-one nested creation from a normal SOL-root quote coin. Mayhem, migrated-parent and deeper nested paths remain partial or unrecovered.
- **pump.multi_hop_curve_swap** — partial. One native curve per genuine AMM-signed Pump CPI, flag 3, legacy Tokenkeg 82/165-byte layouts and an ordinary 166-byte non-holder curve. Multi-curve runs, mixed endpoint flags, non-native/nested quotes, Token-2022, holder rewards and synthetic completion are unsupported. Of 56 comparisons, 50 reach Pump, six stop in AMM and only 11 succeed.
- **pump.sell_v3** — partial. SOL and USDC quote branches, Mayhem/holder fields and cashback rejection. Other quote routes and exhaustive extension/account validation remain incomplete; final event suffix uninterpreted.
- **pump.set_mayhem_virtual_params** — unrecovered.
- **pump_amm.create_config** — unrecovered.
- **mayhem.initialize_mayhem_state** — unrecovered.

The two Pump incentive handlers and Mayhem initializer remain stopped. The confirmed Pump `sell_v2` quote transfer-fee minimum-output/event mismatch remains unresolved; that corrective probe lane is also stopped. These tasks must not be reassigned to another worker as a workaround. Earlier unintegrated v3 token-extension work and the aborted extra Metaplex runtime probe are not resumed.

`set_mayhem_virtual_params` has static body/wrapper/parser attribution but lacks a valid genuine Mayhem PDA invocation. `pump_amm.create_config` has static/rejection evidence but no successful fixed-admin historical replay. No synthetic signer bypass is an acceptable substitute. The ordinary legacy-token two-curve Pump route is being traced separately; current acceptance remains one native curve only.

## Remaining binary and dependency work

- **All four core programs:** recover unmatched original functions/windows, full call targets and referenced data, historical source/module coordinates, dependency selections, compiler/SDK phases, section layout and relocation identity. Inferred disassembly windows are not verified historical function boundaries, and normalized matches are not whole-byte equality.
- **Pump:** resolve the final TradeEvent u64 meaning, partial creation/trading/routes and remaining original body/data attribution. The full BondingCurve serializer now matches under static normalization.
- **PumpSwap:** attribute unmatched windows, transitive data and admin source-location differences; current Pool and GlobalConfig serializers match under documented normalization. No fabricated source padding or diagnostic locations.
- **Fees:** all 31 bodies have bounded coverage; parser details, transitive helpers/data, source locations, compute use and full ELF identity remain unresolved. The current eight-package Solana-family recovery improves six helpers and the formatter but is not a unique historical dependency proof.
- **Mayhem:** non-initializer error-return ABI/code-generation differences, five unknown GlobalParams field roles (two additional withdrawal-interval roles are now statically attributed), compiler/stdlib provenance and diagnostic differences remain. Twenty-six panic diagnostic differences include eight unwrap-detail differences. The initializer lane remains stopped.
- **SPL Token:** exact captured 108,600-byte payload rebuilt.
- **Token-2022:** exact captured payload rebuilt, including separately regenerated zero allocation padding.
- **Associated Token Account:** authentic historical build recipe missing; 307 raw bytes differ (304 text, three relocation). All 159 inferred windows correspond under the recorded address mapping, which is not raw equality.
- **Metaplex:** 1,250 / 1,251 raw windows match. Utilize is the remaining 5,104-byte body; 1,509 total differing bytes include text/source-coordinate/relocation differences. The 86,543-byte captured allocation tail is verified zero. Existing 135 comparisons do not cover every zero-use boundary.
- **Donation relay:** no recovered source-built candidate; 492 inferred windows remain source-unattributed, and 11 IDL dispatch branches are mapped. The previously identified repository is unavailable. Missing source is not evidence of 492 proven mismatches.

## Build verification and audit work

Two fixed-source Linux Fees attempts stopped before compilation. The first exposed an SDK installer provenance difference; the second stopped at the fetch/empty-target guard without enough retained state to distinguish its cause. Local reproduction proves that fetch can create `.rustc_info.json`; the helper now separates fetch and compilation targets and retains both states. Ten retention/source-isolation tests pass.

The recorded Darwin pipeline compiles Pump/Fees with v1.44 but strips through SDK-selected v1.52. The official Linux SDK defaults to v1.43 at that stage. A corrected fixed-source Linux proposal pins both official tool distributions and the exact retained SDK, with a process trace and phase identities. It remains unexecuted pending review of the complete recipe and Linux tracer availability. No version/flag/path brute-force search or binary patching is authorized.

The security audit remains incomplete. Existing malformed-input/lifecycle checks and reconstruction regressions do not constitute a full review of every current handler, account relationship, CPI, arithmetic boundary or deployment configuration. Current source review and evidence applicability must be reconciled before any sign-off.

## Parallel ownership

Native workers own ordinary Tokenkeg multi-curve static reconstruction, portable function-inventory publication, and completed Fees dependency-family promotion. Nine additional CLI workers have started in separate scratch directories for Pump event attribution, Pump partial-path gap mapping, AMM residual functions, Fees residual functions, Mayhem non-initializer ABI, ATA recipe evidence, Metaplex Utilize attribution, donation-relay reconstruction and audit evidence coverage. They must preserve all stopped lanes, avoid duplicate compilation and return reviewable evidence before root integration.

A worker covers related functions as a dependency-aware group. Launching one process for every inferred disassembly window would duplicate helper analysis and would not establish completion. Each machine inventory retains every row, including unmatched and unresolved rows.

See [parallel ownership and configuration](PARALLEL_WORK.md) for the launched assignments and documented concurrency setting.

The [portable function inventories and follow-up studies](../repro/function-inventory/2026-10-24-374fcf0/README.md) preserve every row from the historical baseline, plus seven static studies/build proposals. Those baseline Pump/Fees tables are labeled separately from the current serializer and dependency-family candidates.

The [first parallel research pass](../repro/parallel-work/2026-10-24/results/README.md) now supplies refreshed Fees residuals, every AMM residual row, 74 Pump partial-path gap rows, all 492 relay window dispositions/codecs and detailed ATA/Metaplex provenance. Eight public packages pass portable verifiers. These new analyses add no accepted handlers or whole-byte matches; subsequent scratch proposals are tracked separately.

The [second parallel research pass](../repro/parallel-work/2026-10-24/wave2-results/README.md) adds seven verified static/source packages. It includes a source-supported Fees inline-account correction, uncompiled module reorganization, four relay wire parsers and arithmetic fragments, two newly attributed Mayhem fields and a public-source-only audit backlog. Neither scratch proposals nor original-only fixtures change accepted completion counts.
