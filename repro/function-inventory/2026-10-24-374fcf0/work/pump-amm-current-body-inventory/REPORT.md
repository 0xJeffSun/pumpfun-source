# Current Pump and PumpSwap body inventory

This is a read-only inventory of captured originals and the current published candidate bytes. It performs no build, transaction, runtime probe, source change, executable edit, optimizer search or signer workaround. The Pump candidate is `6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe`; PumpSwap is `5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`. Both whole-file comparisons remain false. Their unstripped counterparts have exactly identical `.text` bytes and relocation maps and supply candidate function names.

`input-manifest.json` binds 78 inputs, including both original/candidate/symbol-bearing executables, all 36 Pump and 18 AMM compiler inputs, current IDLs/status and supporting evidence. Current source hashes were checked against each published package. `input-text-snapshots.tar.gz` preserves the 72 non-ELF inputs. The observed repository revision is recorded separately in `source-bindings.json`; the candidate hashes are the identity anchors, not the mutable HEAD or a historical catalog.

## Denominator beyond IDL handlers

| Current code inventory | Pump | PumpSwap |
| --- | ---: | ---: |
| Original inferred instruction windows | 1,035 | 785 |
| Original `.text` bytes represented | 1,792,208 | 1,162,040 |
| Candidate named function ranges | 765 | 641 |
| Original windows with raw complete-body match | 97 | 92 |
| Original windows with normalized complete-body match | 522 | 466 |
| Original windows with matching direct-call body pairs | 479 | 442 |
| Original windows without a normalized complete-body match | 513 | 319 |
| Bytes in unmatched original windows | 1,426,664 | 790,024 |
| Windows with unresolved relocated-data consumption | 609 | 462 |
| Windows with indirect calls | 90 | 69 |

These are inferred machine-code windows, **not historical source-function totals or percentages of semantic recovery**. Boundaries come from dynamic symbols, the ELF entry, real relocations, direct-call targets and the section start. Indirect-only entries may be absent, a source function may be split/inlined, and an inferred boundary may truncate or combine source functions. Every original text byte falls in exactly one row, but this does not prove every source function has been identified.

`pump-bodies.json` and `pump_amm-bodies.json` each contain a row for every original window: exact start/end/size and raw/normalized hashes; all corresponding current candidate addresses and symbol names; raw and normalized status; direct targets and whether each target has a complete matching body; actual ELF relocation references, external-call symbols and unresolved indirect calls. Candidate function rows provide the reverse mapping. In-memory normalization masks only actual relocation and internal relative-call immediates; it preserves other instruction bytes and requires identical complete lengths and relocation patterns. No normalized executable bytes are saved.

A body match does not establish recursive-call or consumed-rodata equality. Every data reference carries its actual original pointer/section and leaves the consumed extent explicitly unresolved. A matched body with an unmatched callee remains distinguishable from a body whose direct target pairs match. The focused Pool/GlobalConfig report proves additional discriminator and direct-target facts for those two AMM exits; it is not a transitive proof of the whole program.

## Handler disposition

`instruction-inventory.json` records all 56 Pump and 38 AMM IDL instructions, exact discriminators/arguments/account order, current status and retained limits. Pump has 48 bounded implemented handlers plus five partial paths; its remaining three are `admin_update_token_incentives`, `claim_token_incentives` and `set_mayhem_virtual_params`. The first two remain stopped and are not re-investigated. The third has a static-only body at `0x137fc0..0x138b20` (2,912 bytes), wrapper `0x1255a8` and parser `0xcd3d8`; genuine Mayhem PDA invocation remains unavailable. No caller workaround is proposed.

AMM has 37 bounded implemented handlers; only fixed-admin `create_config` is absent. Its existing body is `0x16d88..0x17960` (3,032 bytes), wrapper `0xe0bf8` and parser `0x80fb8`. Existing static packages already preserve substantial source/body matching, but zero successful fixed-admin replay cases exist. Ordinary rejection receipts do not justify marking this handler fully implemented. This inventory adds no initializer experiment.

The stopped Pump sell-v2 quote-transfer-fee repair, incentives, Mayhem initializer and unintegrated v3 extension work remain excluded. The current sell-v2 limitation stays explicit. Missing/partial instructions are not automatically new independent assignments.

## Prioritized evidence-backed work

1. **Pump BondingCurve serializer error propagation.** Original exit `0x5a28..0x6158` is 1,840 bytes; current candidate `0x7110..0x78c8` is 1,976 bytes. Both use discriminator `17b7f83760d8ac60` and twenty `BpfWriter::write_all` calls. The original error tail calls `From<std::io::Error>` at `0x19bc58` from `0x6100`; the current candidate loads Anchor error **3004** at `0x7868`, calls `From<ErrorCode>` at `0x7870 -> 0x142cc8`, and includes an indirect drop. This is a concrete source-fidelity difference, not a claimed new runtime defect. `pump-bondingcurve-exit-difference.json` retains every raw instruction, exact calls and symbol/body correspondence. The existing Mayhem-virtual static package independently binds the same original serializer bytes. Root has authorized a separate isolated serializer-only build after this inventory, preserving layout, dependencies, profile and the existing corpus; no source change belongs to this inventory.

2. **Further ordinary native curve routing, if separately scoped.** The original route body `0x567d8..0x57c38` (5,216 bytes) loops over five-account groups and calls per-curve execution `0x5b3b0..0x5fc48` (18,584 bytes). Current combined execution is `0x18960` (23,704 bytes) and intentionally accepts only one native curve with flag 3. Inputs are the 13 fixed IDL accounts, five accounts per hop, `amount_in: u64` and `hop_fees: Vec<u8>`; signing must come from the genuine captured AMM caller. The existing 56-case receipt set supplies only 11 successful comparisons and cannot establish multi-curve or mixed-flag behavior. A future scope could examine ordinary native Tokenkeg routes while excluding every extension/v3/Mayhem/holder/nested branch. No implementation or new test was started here.

3. **TradeEvent final-u64 meaning.** The complete event-data serializer already matches from original `0x1624b0` to candidate `0xea260` (5,432 bytes), including all direct target pairs. Current `trade_types.rs` retains `unparsed_trailing_field`; the captured IDL does not name that final u64. This is a source/dataflow attribution opportunity using existing ordinary legacy-trade evidence. Do not guess a historical name or promote zero-valued bounded examples into a general invariant. No new trade or fee probes are proposed.

4. **Explained AMM diagnostic differences, not speculative fixes.** `toggle_mayhem_mode` (`0x1bb00`, 688 bytes), `toggle_cashback_enabled` (`0x1b510`, 688 bytes) and `toggle_boost` (`0x1b7c0`, 832 bytes) have current counterparts of identical lengths and relocation patterns. Apart from the already excluded relocation/call operands, exactly two instructions differ in each: source line and source-path length. Their original source paths are the specific `programs/pump-amm/src/instructions/admin/...rs` files; current paths are `src/lib.rs`, at lines 199, 204 and 209. `amm-admin-diagnostic-differences.json` records exact offsets and consumed filename bytes. Strict matches remain false. No padding, remapping, fake source-location substitution or behavioral change is recommended.

## Historical records and limits

- `work/remaining-source-gaps-49e4-static` describes Pump42 and pending quote-control/multi-hop work. Its suggested AMM Pool codec task is already completed in current `5a68…`; do not reassign it.
- `work/pump-multi-hop-curve-static` binds an old Pump42 candidate but unchanged original windows. Its original dispatch/parser/body evidence remains useful; its candidate absence/count is historical.
- `repro/pump/mayhem-virtual-params-static` likewise binds historical Pump42 and uncompiled source. It adds no active implemented handler.
- `repro/pump_amm/create-config-static` and `create-config-serialization-static` contain earlier scratch candidates and rejection evidence, not the current main ELF. Later GlobalConfig and Pool serializer promotions are already reflected in current AMM.
- Old administrative checkpoint prose and compiler-family candidates are historical observations. Neither this catalog nor current bounded receipts establish the historical compiler, complete dependency graph or a finished audit.

`catalog.py` and `annotate.py` retain the exact read-only generation logic. The copied ELF reader is bound to its immutable published source. `verification.json` records recomputed body/hash/coverage checks and the stale-catalog classification. No main file or frozen earlier package was edited.
