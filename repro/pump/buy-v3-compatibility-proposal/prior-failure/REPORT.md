# BuyV3 preservation integration proposal

**The pre-parser seam is implemented as a concrete, uncompiled source proposal. It is not accepted code or a passing build.** `integration.patch` applies to the exact lib/trade inputs at immutable commit `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. The observed parent files had identical hashes when checked. Only root should apply/review/build this proposal. No parent source, dependency, macro, executable, transaction, fixture, signature control or completion count was modified.

The five-file overlay in `proposed/programs/pump/src` contains complete source for this delta: the current lib and trade files, the unchanged ordinary admission/fee implementations from the frozen composition, and the new composite context. Other current source and locked dependencies are prerequisites, not omitted replacement implementations. `integration.patch` is authoritative; do not stack the older composition or containment patches. No Rust compiler, typechecker, macro expansion, runtime harness or target binary was run.

## Integration and preservation

`BuyV3Dispatch` is an enum containing exactly one admitted `SellV3` or `BuyV3`. Its explicit `Accounts` implementation classifies the raw accounts before invoking either generated parser. Its `Bumps`, `ToAccountMetas`, `ToAccountInfos` and `AccountsExit` implementations preserve the selected context. The wrapper remains an ordinary Anchor instruction. Its name, discriminator generation, argument types/order, OptionBool deserialization, optional instruction log, remaining-account slice and return/error machinery stay with the locked program macro.

The single generated wrapper calls the composite parser, calls `buy_dispatch`, and exits only after success. The composite invokes one generated context parser with the original `ix_data`, mutable remaining slice and realloc set. The selected bumps enter that same context's existing body. `buy_dispatch` performs neither parsing nor exit. The generated wrapper subsequently calls the composite exit, which delegates to the same enum variant containing the body-mutated accounts. Parser or body errors propagate immediately. There is no retry, interception, custom entrypoint, stale second context, error override or exit on body failure.

The accepted `trade.rs` is an exact prefix of the proposed file. The existing `buy`, `SellV3`, quote helper, every other handler and their line positions are unchanged; new source is appended naturally. The lib change is one wrapper context/callee substitution. The ordinary body/context and its two helper files are unchanged from the frozen reviewed composition. This orchestration is compatibility source, **not recovered historical Rust identity**.

The public client module `__client_accounts_buy_v3_dispatch` reexports the existing generated `SellV3` Pubkey struct under the composite name. Its CPI counterpart does the same for the existing AccountInfo struct. Consequently the actual generated fields, order, signer/writable flags, constructors and trait implementations are reused rather than hand-recreated or replaced with empty accounts. Existing `accounts::SellV3` remains available to the other unchanged instructions. `account-abi.json` records the 15 explicit fields and the two event-CPI fields, 17 total. Runtime `ToAccountMetas/Infos` delegates to the admitted context; it does not invent a second account order.

The conditional `__anchor_private_gen_idl_accounts` method delegates to `SellV3` and returns its actual account metadata, PDA descriptions and referenced types. **The current Cargo manifest has no `idl-build` feature.** Default and CPI source paths are provided against the actual manifest; an enabled whole-crate IDL generation build is an unclosed gate, including the ordinary composition's custom FeeConfig type. This proposal does not silently add dependency features or claim to have executed an IDL generator. Existing public IDL files are untouched.

## Classifier policy and its limits

Classification uses only keys, owners, fallible immutable data-length borrows, and temporary existing owned Global/curve readers. Those read-only readers inspect policy fields; they are not a second generated Accounts parser. They do not validate the full account context, run constraints, initialize, exit, prepare rent, transfer, log or write. Both temporary decoded values are dropped before the selected parser runs. Global/curve are decoded again by that parser: this deliberate read-only observation cost is not claimed identical to the original call tree.

The first branch returns Accepted for a non-Tokenkeg base program or base mint owner, before any data borrow. Thus all **117 saved BuyV3 rows**, including all **105 successful original/candidate pairs**, reach unchanged `SellV3` parsing and `buy`. Every row is preserved in `preservation-ledger.json`; the unchanged source receipt and its original seals remain under `review/`. The successful subset comprises 37 SOL, 37 Tokenkeg USDC-quote and 31 Token2022 USDC-quote rows, including overlapping Mayhem/holder subsets. Only base ownership/recorded lengths are used for this preservation argument; extension content is not inspected or implemented.

The ordinary lane requires the reviewed ordinary Tokenkeg sizes/owners, a full curve allocation, permitted buyback rate, nonwhitelist signer and non-Mayhem/noncashback flags. Nonnative token quotes require the existing ordinary-vault domain. Holder mode alone is allowed. Short slices, failed borrows/decodes and unsupported shapes route to the accepted parser, not to a fabricated success. Stored WSOL additionally stays Accepted because the two bodies interpret that stored key differently. Supplied zero-key native forms fail typed mint shape selection and stay Accepted. This preserves the accepted native aliases without rewriting ordinary quote semantics.

Once Ordinary is selected, its real parser owns every failure; there is no fallback after parser mutation or rejection. Signer/PDA/mint/program/volume/FeeConfig/recipient checks remain intact. The existing body domain fence is retained as a defensive assertion of the same bounded source domain; no checks were removed to force a successful path.

This proves source routing for the saved ownership domain, **not preservation of every previously possible Tokenkeg success**, runtime resource equivalence, or original malformed-input precedence. The new ordinary lane intentionally changes some overlapping legacy behavior. A selector read can encounter borrow/decoding/allocation failures before the original parser; fallible observation retains Accepted, but allocator abort cannot be modeled as a successful fallback. No claim covers arbitrary aliases, corrupt lengths, simultaneous invalid accounts or all failures in linked allocators/formatters. Normal single-invocation account-data stability and the locked reader APIs are bounded premises.

A unified new parser is not a justified replacement at this snapshot: it makes the quote mint typed, adds native quote ATA seeds, initializes owned volume state, decodes foreign FeeConfig early, uses a stored bump and changes base-user constraints. Those changes precede the body and cannot preserve the accepted parser merely by deleting the Tokenkeg fence. The source-preserving composite is the concrete alternative supported by the current evidence.

## Locked generation and source/API evidence

The manifest pins Anchor lang/spl 0.31.1; the lock resolves Anchor syn 0.31.2. `inputs/anchor-*.crate` are SHA256-bound to that lock. `framework/` contains exact archive members, not edited macro source.

* `codegen/program/handlers.rs` logs, deserializes instruction arguments, creates bumps/reallocs, parses accounts, invokes the user handler with `?`, then exits. The composite fits this sequence rather than replacing it.
* `codegen/program/accounts.rs` and `cpi.rs` derive module names from the context name and glob-export those modules; CPI uses the corresponding named AccountInfo struct. Both new alias modules satisfy those exact lookups.
* `codegen/accounts/__client_accounts.rs` and `__cpi_client_accounts.rs` emit crate-visible modules containing public structs. The aliases reuse those legal visibility boundaries.
* `anchor-lang/src/lib.rs` defines `Accounts<'info, B>` with the original raw-slice lifetime and mutable realloc set; `Bumps::Bumps` requires Debug. Both selected generated bump types have Debug and Default and no account lifetime. Context permits a short reborrow of the selected accounts; the body consumes selected bumps, then the wrapper can exit its retained enum.
* `idl/accounts.rs` and `idl/program.rs` identify the real `__anchor_private_gen_idl_accounts` metadata seam. The implementation delegates through that seam without inventing empty metadata.

No definite type error was found by source inspection. Compiler acceptance, CPI-feature expansion, stack/code generation and any future enabled IDL build remain unverified. “Complete source proposal” is not a report of a successful build.

## Byte, body, call and data analysis

`analyze.py` is repeatable offline ELF64 analysis; it accepts optional original/candidate/symbol paths for root's next snapshot. It reads executable bytes and metadata without executing or patching them. `residual-ledger.json` retains complete headers, sections, program headers, symbol rows, relocations, byte mismatch intervals/tails, every inferred/symbol window, all decoded direct/indirect calls, branch edges, LDDW/relocation references and unresolved correspondence candidates. Matching is many-to-many: ambiguous alternatives are not dropped.

| Input | Bytes | SHA256 |
| --- | ---: | --- |
| Captured original | 10,485,715 | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |
| Frozen accepted candidate | 1,598,992 | `568546bcf038740d995325c1e742528f218f630840ac152f96dcf5c2147eabc2` |
| Frozen candidate symbols | 2,180,904 | `ca42ab7b4ba47c3ce16929abaf5a62e8a0740877906e9b653c517492c0150025` |

Whole-file equality is **false**. There are **9,779,698 positional byte mismatches including excess bytes**, with 222,748 differing runs in the common prefix and excess-original interval `[1598992,10485715)`. No allocation tail is trimmed to improve that result. The symbol ELF's text is verified identical to the candidate before using its function boundaries. Original and candidate retain 6,147 and 5,054 relocation records respectively. All section/header contents and structural differences remain available, including unmatched sections; no relocation or header is rewritten.

The final inventory contains **905 relocation-aware inferred original windows and 794 candidate function-symbol rows**. The initial 1,169 raw-operand intervals are retained as `provisional_raw_operand_intervals`, with links to corrected intervals. That initial count included relocated call placeholders, which must not be treated as runtime destinations. The final inventory gives relocation records priority: such calls retain their encoded operand and loader binding but no invented internal destination. This is why the corrected count differs from the preliminary progress update.

Raw window equality at changed placement, call-immediate-normalized instruction equality, actual call-target correspondence, referenced-data equality and semantic hypotheses are separate fields. Only **unrelocated** signed direct-call immediates are masked in a temporary comparison buffer. No binaries are modified. Immediate target-body equality is labeled boundary-conditional, not transitive semantic equality. Referenced-data extent often cannot be recovered from an immediate; section correspondence alone never closes that gate. Unknown or indirect targets remain unresolved. Empty mechanical uncovered-text lists mean the intervals cover text, **not that historical function boundaries or semantics are known**. All non-BuyV3 windows are inventory-only; excluded/stopped paths receive no semantic analysis.

`buy-window-analysis.json` compares four concrete current-candidate windows with the frozen original windows:

| Role | Original interval | Current candidate interval | Raw / normalized equal | Direct/relocated call sites (original / candidate) |
| --- | --- | --- | --- | --- |
| Wrapper | `[0x1286c8,0x128c28)` | `[0x117880,0x117e38)` | No / No | 9 / 8 |
| Parser | `[0x102578,0x105b78)` | `[0xfb158,0xfe230)` | No / No | 117 / 108 |
| Body | `[0x147ba0,0x1489f8)` | `[0x8d550,0x90df8)` | No / No | 29 / 130 |
| Exit | `[0x107b38,0x107f78)` | `[0xfe230,0xfe5f0)` | No / No | 14 / 12 |

Signed unrelocated operands establish original wrapper parser/body/exit calls at `0x128808→0x102578`, `0x128930→0x147ba0`, `0x128978→0x107b38`. The current candidate instead calls `0x117a88→0xfb158`, `0x117bd8→0x8d550`, `0x117c20→0xfe230`. The latter identities have candidate ELF symbol support. Original assembly annotation names are not used as authority. The original's successful body result gates exit; the locked wrapper's `?` preserves that sequencing in the source proposal.

Substantive ordinary body/data conclusions remain grounded in the unchanged frozen opcode evidence, rechecked by the inherited verifier:

* Original `0x147c08→0x3cd50→0x3d250` prepares rent before mode/amount checks even for a full-length curve. Native reserved funds include real quote and both retained fees with checked sums; the exact shortfall transfer is independent of max trade cost. This is a real application change from the accepted body, so legacy routing cannot be dismissed as redundant.
* Parser FeeConfig decode precedes volume initialization; its stored-bump address constraint follows init ordering. The proposal must neither move decode to pricing nor treat all fee validation as preceding init. Ordinary exit serializes body-mutated curve/volume only after all event work succeeds.
* First quantity is `min(request, real_base)`, with a second residual leg priced from actual vault balance and pretrade reserves. Both fee selections use actual mint supply and the same pretrade snapshot. Fee decode consumes both vectors and mandatory exotic tail; three exact quote-key literals are bound to original bytes by the retained verifier. No source-key name is invented for unknown data.
* Native funding sends total input to the curve, then directly debits buyback after releasing the source mutable borrow. Token settlement uses two real checked transfers. Volume user fill follows the base CPI. No CPI/borrow failure is replaced with success.
* Trade, Complete and residual PostComplete preserve their order, same timestamp and fee/volume fields. The late residual checks remain after Complete, and failure prevents the wrapper's successful exit. Trailing ordinary zero is retained without assigning a historical semantic field name.

The proposed composite has **no candidate binary**. These comparisons describe the accepted frozen candidate, not compiled evidence for the proposal. The current BondingCurve serializer's separate accepted match record is preserved under `inputs/binary/function-match.json`; it does not make the BuyV3 body or the whole file equal.

## Residual ownership and next actions

`integration-residuals.json` categorizes concrete application gaps, source organization, linked helpers, diagnostics/data, toolchain provenance, ambiguity and explicitly stopped work. The exhaustive binary ledger leaves unassigned windows ambiguous rather than promoting them to source fixes. Existing composition reports, rejected containment rationale, all receipt rows and prior seals remain unchanged under `review/`.

1. Root reviews the five-file delta, early classification domain, exact generated module aliases and same-context exit. If accepted, apply only this patch to hash-matching inputs and perform the separately authorized fixed-recipe build, including CPI-feature compatibility. This worker has not built it.
2. Retain every existing regression suite and all 105 successful cases. New source routing is finite preservation evidence, not a replacement for rerunning them against an eventual candidate. Root must separately close ordinary parser/volume/fee/rent/settlement/event acceptance.
3. Resolve malformed-account precedence and diagnostics with explicit retained failures, including dual-invalid inputs, stored bump, account-name replacement, native aliases, borrow failure and ordinary-versus-accepted domain boundaries. Do not change errors with a selector override to match a fixture.
4. Rerun the static inventory against any accepted new bytes. Whole-file equality, full calls/data, original historical source/build identity and broader ordinary account acceptance remain open. No stopped correction/extension lane is a prerequisite delegated by this proposal.

`verify.py` checks exact inventory/seals, baseline and archive bindings, source preservation/patch reconstruction, the 117-row early-owner argument, opcode/call evidence through the unchanged reviewer verifier, and independently recomputes the full static ledger and focused comparisons. It runs only Python static checks. Run `python3 -B verify.py` from a separate copied publication. The actual copied-run receipt and its manifest hash are outside the sealed publication in `portable-verification.json`.
