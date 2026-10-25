# AMM F05: candidate Fees return-data contract

**Classification: conditional nonissue for the frozen candidate composition.** The legacy AMM producer-key omission is real, but this source does not demonstrate stale or nested-program bytes reaching the fee decoder after a successful Fees CPI. Every successful candidate getter invocation reaches Anchor's return-data setter. There is no subsequent nested invocation on the reviewed return path before AMM reads the buffer. This is a manual source-level argument, conditional on the deployment and syscall assumptions below, not a captured-original vulnerability finding or full audit sign-off.

Source checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. Only frozen Git blobs were used. [results.json](results.json) records the classification, branches, assumptions, residual obligations and exact line/byte spans. [provenance.json](provenance.json) records complete input SHA256, Git blob IDs and archive-member provenance. Byte ranges are zero-based and end-exclusive; line ranges are one-based and inclusive. The publication includes the finite source files needed to independently rebind those spans, retained dependency archives, selected dependency members, and prior report subsets.

## Caller and instruction admission

The admitted callers are candidate legacy AMM buy and sell, not the Pump partial-types `buy_v3` chain. In `inputs/programs/pump-amm/src/legacy_buy.rs:45–54` and `legacy_sell.rs:41–50`, `Program<T>` uses `trade::FEE_OWNER`. `trade.rs:90–100` binds it to `pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ`. Retained Anchor lang `src/accounts/program.rs:127–139` checks the supplied program's exact key and executable flag. This pins the target address, not its deployed code or upgrade state.

Buy `213–232` and sell `163–183` construct the same eight-byte discriminator `[154,237,138,92,162,2,162,187]`, followed by bool, u128 little-endian cap and quote pubkey. Their CPI metas are readonly fee_config and AMM program ID. The public retained IDL `inputs/evidence/upstream/pump_fees.json`, named entry `get_fees_with_quote_mint`, agrees on target, discriminator, two-account order, argument order/types and `Fees` return. The discriminator also equals SHA256(`global:get_fees_with_quote_mint`)[0:8]. The frozen Fees source declares the same program ID (`lib.rs:27`) and matching handler (`103–115`). No mismatch was found in this candidate/public-IDL contract.

The CPI uses `invoke(...)?`, immediately followed by `let (_, returned) = get_return_data()...` and `TradeFees::deserialize`. There is no intervening call that could invoke another program. Three u64 fields occur in the same order in `trade.rs:90–91` and Fees `types.rs:10–15`; ordinary Anchor/Borsh serialization is 24 bytes, without an account discriminator. The consumer does not independently enforce producer or exact buffer length. The conclusion does not depend on assuming that it does.

No original getter, wrapper, dispatch, log or executable bytes were opened or assigned a function identity. Public IDL agreement and generated candidate dispatch/log naming are not complete captured-original instruction admission. No historical function symbol or inferred original code boundary is asserted here. Comments in the separate recovered helper sources retain their prior tentative ranges; this package does not promote those comments to an original identity proof.

## Complete successful getter path

The actual getter is `inputs/programs/pump-fees/src/lib.rs:103–115`, with its actual selector at `305–314`:

| Branch | Returned value |
|---|---|
| Non-Pump pool | clone of flat fees |
| Pump pool; zero, wrapped SOL or OTHER_NORMAL_QUOTE | normal-tier selector |
| Pump pool; USDC | stable-tier selector |
| Other quote; all exotic fee fields zero | clone of flat fees |
| Other quote; any exotic fee field nonzero | clone of exotic fees |

The selector returns the first tier when cap is below its threshold, otherwise the first qualifying tier in reverse traversal, falling back to the first tier. It performs no sorting or validation. Empty selected tiers panic at the first indexing operation; that is not a successful getter invocation. Flat-fee branches need no nonempty-tier assumption. All branches use only fields, comparisons, clones and iteration: no CPI, event CPI, explicit return-data setter or opaque external selector call occurs. The separate `recovered/fee_selection.rs:1–34` and `recovered/quote_fees.rs:1–48` describe analogous pure selection, but are not the linked handler's implementation and are not needed to bridge an original wrapper.

The getter context `contexts.rs:26–32` has exactly two direct fields: `Account<FeeConfig>` and `UncheckedAccount`. Neither carries `mut`, `close`, init or event-CPI annotation; neither is a composite Accounts context. The explicit comment that the deployed config-program constraint is unrecovered remains intact. That uncertainty does not add a candidate post-return call. Config decoding (`types.rs:37–78`) precedes the handler and cannot bypass the successful wrapper's later setter.

## Locked Anchor generation and post-setter closure

Both retained lockfiles resolve anchor-lang **0.31.1** and anchor-syn **0.31.2**. The verifier binds both retained crate archives to their lock checksums. Relevant source paths below are under `dependencies/anchor-syn-0.31.2/`.

1. `src/parser/program/instructions.rs:122–153` extracts `Fees` from `Result<Fees>`. It is non-unit.
2. `src/codegen/program/handlers.rs:108–114` generates serialization of the returned value and `set_return_data(&return_data)` for a non-unit return.
3. In `handlers.rs:147–162`, the generated user-handler call is followed by `?`, then the generated setter, then account exit. An early `return Ok(...)` inside the user getter returns into this wrapper; it does not skip the setter. Serialization panic/allocation failure or a failed handler is outside successful CPI execution.
4. `src/codegen/accounts/exit.rs:16–74` emits close for close fields, exit for mutable fields, and no action for non-mutable direct fields. Instantiating it with the complete getter context produces an exit body containing only `Ok(())`. Readonly instruction metas corroborate the contract, but it is the source constraints—not caller-supplied writable flags—that select generated exit actions. No field serializer, close or event CPI is scheduled after the setter.
5. `src/codegen/program/dispatch.rs:7–27` returns the matching handler result directly. `src/codegen/program/entry.rs:39–56` returns dispatch success, with error logging only on error. There is no success-side epilogue CPI. The retained account/context wrappers and owned Fees/config fields introduce no custom drop-time invocation in this source; ordinary destruction/runtime behavior remains an explicit assumption.

Thus, on full CPI success: handler value → serialize → Fees setter → empty exit → dispatch/entry success → AMM immediate read. Even hypothetical older return data from work before this setter would be replaced; no assertion that all earlier account setup avoids CPI is needed. Subsequent AMM token/event CPIs happen after the bytes have already been consumed and do not retroactively change that value.

## Assumptions and residual obligations

- The fixed Fees address must execute this candidate's getter and this locked generated behavior. A fixed key does not establish captured-original equivalence, deployed executable identity or immutability. A different/upgraded implementation can invalidate this conclusion.
- Standard Solana return-data semantics must hold: the setter replaces the buffer and associates it with executing Fees; successful CPI preserves the most recent buffer until the caller's immediate read. No runtime, loader or syscall implementation was executed or independently certified here.
- Compilation, standard Anchor/Borsh serialization, ordinary Rust destruction and syscall bindings must behave as represented. Failed validation, empty-tier panic, serialization/allocation/runtime failure or exhausted compute cannot be reclassified as successful CPI. This establishes success implies a setter, not that all inputs succeed or select correct fees.
- To close the corresponding captured-original obligation, first establish complete instruction identity from public IDL plus original dispatch and log; then review its complete wrapper/final setter and every post-setter path, preserving mismatches. That original-body work was unnecessary for the assigned candidate prerequisite and was not undertaken.
- Fee policy correctness, configuration history/authenticity, general dependency security and other audit findings remain separate. No patch is proposed; no source build, fixture, probe, execution, network request, transaction, staging, commit or push was performed.

The prior `audit_amm` F05 explicitly left this getter prerequisite open. Its copied report and seal remain byte-for-byte unchanged. The copied `audit_fees` report is context, not a claim of transitive security. `pump_route_wide`'s report and arithmetic contracts were consumed with their stated manual-proof limitations: positive-denominator division and modulo multiplication contracts do not prove this return producer, and their verifier is not an automated semantic proof. Only included prior files are checked against inherited seals; this package does not reverify the entire prior publications. None of the additional pending-publication packages was needed or reattributed to this checkpoint.

All four original whole-byte comparisons remain false; the inherited status remains 140/150 bounded implementations, five partial and five unrecovered. No recovery count, security-completeness claim or whole-program acceptance changes.

## Offline verification

Run `python3 verify.py` from this directory or pass its absolute path from anywhere. It checks the exact sealed file set, SHA256, complete copied Git-blob hashes, bounded source span hashes/coordinates, retained archive membership and lock checksums, inherited subset seals, and IDL/caller discriminator agreement. It neither proves the prose nor verifies source-to-binary correspondence or Git commit membership without the external repository. The reviewed checkpoint-to-blob mapping is recorded provenance; copied bytes independently reproduce each blob ID.

`manifest-sha256.json` covers every publication file except itself. Verification is run from a copied directory and its outcome retained outside this seal. Parent review/integration remains separate.
