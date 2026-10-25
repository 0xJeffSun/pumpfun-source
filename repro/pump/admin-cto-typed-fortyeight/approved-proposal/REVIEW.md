# Admin CTO: coherent full-curve source proposal

This one-file source-only proposal replaces AdminCto's partial read-only DistributionCurve with the already recovered full BondingCurve and changes only the state operations necessary to use that type correctly. It removes the extra raw data Vec snapshot, applies decoded field mutations before the pool-update CPI, clears cashback when selecting holder mode, and restores the missing6080 configurable-fee/cashback rejection. No main source, frozen prior package, build, runtime or excluded lane was changed.

## Type and field provenance

The preceding bd9f4e21 source proof is retained by reference in bindings.json. Original admin_cto dispatcher1162376→1167320 calls wrapper1235456, which calls parser746872, app141840, then shared full curve serializer23080 on success. Parser748200→15208→77896→33568→635208 is exactly the full checked BondingCurve reader already admitted for creator handlers. Its boxed account pointer is the parser's output+56. The app receives that account context through Context.accounts, loaded at141880 and saved frame-2264 at142480; app loads the boxed curve at142160/142456 and160976 using context+56. Its first word is AccountInfo, not curve data.

The full23080 serializer binds account-memory fields to wire fields independently of native struct layout. Relevant mappings are:

| Meaning | Boxed-account memory | Wire account offset | Original serializer evidence |
|---|---:|---:|---|
| creator | +8..39 |49..80|23800..23840,32byte write|
| quote_mint |+40..71|83..114|24000..24040,32byte write|
| creator_fee_bps |+112|115..122|24056..24112,8byte write|
| is_mayhem_mode |+162|81|23856..23912,1byte write|
| is_cashback_coin |+163|82|23928..23984,1byte write|
| can_edit_creator_fee |+164|123|24128..24184,1byte write|
| is_holder_reward |+165|124|24200..24256,1byte write|

These are proof coordinates, not Rust field casts. The patch accesses named fields only. Full reader/serializer historical-layout behavior is reused verbatim. In particular the fee/can-edit pair is decoded as a layout group; the old raw snapshot's isolated123byte fee read was not equivalent to that full decoder. All existing account order, signer, seed, owner and mutability declarations remain unchanged except the curve's concrete type. Shared DistributionCurve and its other callers are untouched.

## Selection, rejection and effective cashback

The wrapper decodes holder Option<bool> at1235592..1235656 (None→2, Some(false)→0, Some(true)→1). Fee presence is0/1 at1236000..1236352; its value is frame-1016, passed through the call stack. These are actual argument roles, not inferred from register number alone. The app saves holder at entry fromr3 and fee presence fromr4.

Existing is_mayhem_mode, holder immutability, holder enablement, new-creator requirements and quote-mint constraints remain in their current source order. The full original mode-selection branches make effective holder true only for the explicit true request; the enabling path146168..146248 assigns r6=1 and r5=0. These values reach frame-2384 (effective holder) and frame-2392 (effective cashback), respectively. Ordinary nonholder branches preserve the original cashback byte:145288..145352 derives0/1 from the initial boxed+163 snapshot. The final stores use those exact slots. Thus `cashback = !holder && bonding_curve.is_cashback_coin` is the source-level result; preserving the old cashback while enabling holder was a current source gap.

When fee is present, quote restrictions are checked first. For an allowed quote and nonholder cashback coin,147304 checks the initial cashback flag and147456 sets error6080 before147528's global configurability check or147544's amount range check. On the holder path effective cashback is0 and the6080 rejection is bypassed. The patch inserts `fee.is_some() && cashback` between the existing quote guard6091 and configurable guard6077, using the existing PumpError::CreatorFeeNotAllowedForCashbackCoin declaration (6080). The natural error! constructor supplies owned error/source metadata from the new actual source location. It does not fabricate historical filename/line330. Existing unrelated numeric error adapters and their known provenance gaps remain unchanged.

## Writes, CPIs, events and Clock order

The application snapshots old creator from decoded account+8..39 at160984..161040, then copies selected target into those fields at161056/161072/161088/161104. It snapshots old fee from+112 at161112. It stores effective holder at161144, effective cashback at161160, optionally overwrites creator_fee_bps at161208, then clears can_edit_creator_fee at161224. The patch implements this same field sequence. Its old_fee capture is earlier in source but refers to the same unchanged decoded field: prior operations use AccountInfo for rent/CPI and do not reload or mutate this decoded fee. Current_creator is constrained equal to decoded creator by the unchanged parser; the event's old=current_creator is therefore the same value.

The intraprocedural CFG proof treats calls as returning and includes every instruction and both branch edges. It establishes that all unconditional decoded writes dominate pool-update call161848 and AdminCto Clock161904, even in this conservative graph. Conditional fee store161208 lies on the fee-present arm before the same join. The patch moves decoded writes to the join immediately after the existing sharing-config reset block and before pool_updated. This is necessary: retaining current raw writes after the pool CPI would be the wrong original operation order, while changing only the account type would let the later serializer overwrite those raw writes.

Full helper bodies and actual instruction discriminators bind the optional cross-program operations:

- transfer creator fees into the Pump vault: app157056→1108280; discriminator01214eb921432c5c at1108464;
- reset sharing config: app160904→1140504; discriminator3c64909c408ab625 at1140688;
- set pool creator: app161848→1089760; discriminator2d3da597680031bd at1089968;
- collect AMM creator fees: app169008→1093816; discriminatora039592ab58b2b42 at1094000;
- token transfer/payout helpers and rent/reallocation helpers retain their full selected bodies and call/data boundaries. No token-extension leaf is analyzed or rewritten.

The physical order of the27KB app is not its execution order. CFG reachability proves that after final decoded store161224 none of rent/preparation148632, transfer157056, sharing-reset160904, token-transfer165944/166408, collect-AMM169008, or CollectCreatorFee Clock167008 is reachable. Those optional branches execute before the mutation join and their source code is left byte-for-byte unchanged. The pool-set CPI is after the join. Full outgoing calls/data are retained; these scheduling claims do not purport to prove external program internals.

Clock167008 belongs to the conditional CollectCreatorFee event: it feeds serializer783976 at167568, logging1705208 at167632, second serialization167736 and event CPI168376. The AdminCto event instead uses Clock161904, builds its fields from the newly mutated decoded curve at162128..162312, calls serializer770312 at162480, logs162544, serializes again162640 and emits event CPI163264. The event serializers'8byte discriminators match their declared event names. Existing source already uses one Clock per event pair; the patch preserves those calls and conditional branches and changes AdminCtoEvent.is_cashback_coin to the effective, stored value.

After the app returns success, wrapper1237008 performs full typed serialization23080; app failure skips it. The patch does not add a premature whole-account write or bypass this success gate. Normal transaction rollback and CPI semantics remain existing runtime premises.

## Acceptance and residual limits

The exact proposal modifies only programs/pump/src/admin_cto.rs. No compiler/ABI/inline/dependency/layout changes occur. Source effects in payout helpers, rent/realloc, external CPI instruction/meta construction, event code, and all other programs remain intact. The verifier authenticates all selected whole bodies, key direct calls, typed stores/field bindings, exact instruction discriminators, proposed source delta and CFG scheduling claims.

Before any build, root should review the effective-cashback decision and6080 guard as well as the context replacement. An authorized build must pass Rust borrow/type/stack checks, inspect full emitted admin parser/application/serializer/error paths and preserve full original/candidate ledgers. Only existing unchanged permitted regressions are proposed afterwards. Existing tests are not claimed to cover holder+cashback, exact123byte legacy accounts, all fee guards or every CPI failure. No new fixture/probe is requested.

Full source/byte equivalence, all original error source coordinates, external CPI internals, indirect calls and data extents remain unresolved. This proposal addresses a proved local state/type/control contract, not all admin_cto residuals. Original and candidate whole bodies remain unequal. Stopped incentive/sell/token-extension/initializer/Metaplex/private lanes were not inspected or reopened.
