# Optional refund817: migration refund seed lifetime

## Source and attribution

The `refund817` stage follows `buytruncation816`. All sixteen earlier source stages, their attribution, and the default `curvehop745` remain selectable. This stage isolates only the two-line refund change from [upstream PR #384](https://github.com/lalalune/pumpfun-source/pull/384), g7 source at immutable commit `69d8ad524607952e4ebe36ede44539502927061c`. No other cumulative patch changes, public counts or runtime claims are transferred.

Only existing lines 349 and 350 of `migrate_v2.rs` change. Named mint/bump/signer-seed locals become an immediate ordinary closure call with nested temporary seed arrays. The existing function signature, inline-never attribute, zero guard and physical source coordinates remain unchanged. The qualified harvest implementation, buy/sell conversion callbacks and all 60 other inputs remain exact. The inventory is still 61 source files. No attribute, SDK, optimization flag, custom pass or numeric layout manipulation is added.

## Accepted bounded static-plus-repeat result

The accepted checkpoint has **817 / 1,035 injective normalized windows and 133 raw windows**, retaining every prior 816 normalized and 133 raw match. The sole gain is the complete 384-byte original refund body at address 353880, bound to the existing migration-v2 refund helper. No function was added. Its sole immediate native-transfer target also matches its complete 1,256-byte original boundary, including resolved imports.

A separate compilation of exactly the same source reproduced both complete generated ELF files byte-for-byte. Independent preservation and backend-diagnostic checks passed. This is static-plus-repeat evidence, not runtime validation or proof of the historical source spelling.

## Seed and caller interfaces

Actual instructions bind the ordered `pool-authority` literal (14 bytes), copied mint key (32 bytes), and bump (one byte), in one group containing three seed leaves. The zero-amount branch returns before key or seed construction. The nonzero branch preserves account roles and propagates the owned Result returned by the synchronous native call. No new error or Source record is introduced.

Source inspection and the pinned call interface establish that the local temporary backing storage remains live throughout the synchronous transfer statement; no seed reference escapes in the owned Result. This reasoning is bounded by the typed account and borrow/lifetime interface, not arbitrary aliasing or an executed CPI.

The complete migration caller bytes remain unchanged. Both actual refund invocations are independently bound to the same Context/accounts, bump, pool-authority and destinations. The first retains the existing balance-difference amount and user destination; the second retains the final pool-authority balance and withdrawal destination. The distinct legacy refund receiver layout is not conflated with this migration-v2 helper.

Complete graph transport preserves the other 983 function bodies, 10,936 direct-call occurrences, 5,160 data operands, all 645 readonly-record relocations, old readonly literals and all 32,059 rodata bytes. Prior qualified roots, conversion/ownership interfaces, dispatcher routes and records are retained through actual mappings, not a blanket whole-migration equivalence claim.

## Limits and reproducibility

The migration business handler remains original-unmatched. All earlier limits remain explicit: BondingCurve's 624-versus-600-byte dispatcher; fee calculator/inverse wrapper body identity; bounded PDA extents; specialized handlers and unresolved trade panic origins; the third original split-record consumer; broader chain traversal; historical identity of duplicate compiler-generated instances; and the prior clamp Source difference. The complete 1,176-byte FeeConfig qualification remains intact. No arbitrary indirect-flow, account-alias or recursive semantic closure is claimed.

There are 123 pure source tests across seventeen stages, checking exact inventories, strict patches, unchanged source coordinates and rejection cases. They do not execute the target or held fixtures. **Runtime is NOT RUN. Full original binary identity is false.** Original binaries remain comparison-only, never compiler inputs or output patches. Only reviewed UTF-8 source, pure tests and technical reports are published; no binary, IR, SDK, raw build/runtime receipt or archive is included.
