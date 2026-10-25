# AMM collect owner6048: remove unsupported compared-key decoration

A natural one-line source correction is supported: replace `require_keys_neq!(owner,FEE_OWNER,CreatorVaultMigratedToSharingConfig)` with `require!(owner != FEE_OWNER,CreatorVaultMigratedToSharingConfig)`. The predicate, admission order and error6048 stay the same; this removes only the current extra `ComparedValues::Pubkeys` decoration that the full original error path lacks. No active source, build, runtime or metadata was changed. This source proposal requires root review before any build.

## Exact admission and handler role

This is a NEW explicitly root-admitted static inspection of original142984..147008/4024B and wrapper960744..961392/648B, not a retroactive claim that generic ledger metadata had admitted their semantics. Exact scopec581, root-collected complete bodies and unchanged metadata predecessorf762 are retained. No original callee body was decoded. Original wholeELF6a7ad and current6dc symbols/whole current ledger are bound.

Original wrapper logs exact34-byte `Instruction: CollectCoinCreatorFee`, calls parser592104, copies736bytes of parsed context, invokes142984 at961184 and invokes exit600312 only on handler success tag2; handler error skips exit and both arms converge on context drop35280 at961352. Parser failure is separate961304. Current named wrapper638912..639976 logs the identical instruction and invokes current named collect handler781856..788224. Its different parser/context representation is not fixed by this proposal.

Original143008 loads an owner pointer at context+584, compares32bytes with1172956 at143040, and branches143064 on NOT equal to the ordinary path143344. The exact32bytes equal currentFEE_OWNER constant1104960 and source `trade::FEE_OWNER` (base58pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ). The same inline AccountInfo has keypointer+560, loaded143408 and used in32-byte creator-vault signer seed and event creator field. Thus owner+584 is paired with that creator key, not an unrelated guessed member. Current UncheckedAccount coin_creator pointer is context+16; its owner+24 is compared at781920, key+0 is used in identical creator_vault seed and event creator. No parser layout or context type is inferred from this pairing.

## Entire error path

Original equal-owner arm143072 invokes name480248 then Display502688 (format failure143336 remains distinct). On success144240..144392 constructs error6048 at144360, source origin authentic75-byte `programs/pump-amm/src/instructions/coin_creator/collect_coin_creator_fee.rs`, line68, and comparedNone tag2 at144368. The whole error record is passed directly to existing owned AnchorError conversion1060792 at144432. Its two-word result144440/144448 goes straight144456→146968→return. There is NO later owner/FEE_OWNER copying, compared-value decoration or other call on this error return arm.

Current equal-owner arm784904 similarly invokes name860216 then Display882656. It constructs6048 at785296, current authentic14-byte `src/collect.rs`, line20, comparedNone at785304, converts at785368→1002256, THEN reloads all32owner bytes785408..785432, materializes all32FEE_OWNER bytes785440..785528, and calls `anchor_lang::error::Error::with_pubkeys`1002792 at785600. Only its newly decorated result785608/785616 returns. This is a concrete error-payload/logging ownership discrepancy, independent of byte-size resemblance.

Existing complete ledger metadata proves original/current memcmp, PumpAmmError::name, Display and owned converter windows are normalized equal; their exact rows/calls/data metadata are retained. No transitive body/data equivalence is asserted merely from that fact. The actual6048 literal, comparedNone construction and complete caller CFG establish the narrow discrepancy. Pinned anchor-lang0.31.1 archive matches Cargo.lock checksum; complete upstreamlib/error source is included. Its require_keys_neq adds `.with_pubkeys(($value1,$value2))`; require returns the same error without that decoration. Error::with_pubkeys sets Some(ComparedValues::Pubkeys). This is the natural existing macro API, not manual error ABI/source coordinates.

Current file/line remains truthful. Proposal stays on existing line20 and preserves its actual `src/collect.rs` origin; it does not fabricate original75-byte path/line68 or move modules to force it. Original source organization remains evidence, not compiler steering.

## Zero, transfer, event, cleanup order

Both handlers reject migrated owner BEFORE loading amount/no-op. Original amount143344 context+232, no-fee branch143360 logs exact30bytes and returnsOk2 at143392→146968. Current amount781960 via boxed vault+104, zero→785632 logs identical30bytes and returnsOk2. Thus the patch does not reorder failure precedence relative to zero balances.

Positive original amount: seed creator_vault13 + creator32 + bump1 is assembled143408..143712; transfer call143768→468920 occurs beforeClock143816. Transfer error143792 returns immediately, skippingClock/events. Current assembled seeds are the same13/32/1, transfer_checked784216→943456 precedesClock784272; its failure784248 skips events. Original transfer callee itself is NOT newly inspected, so no claim of full transitive CPI equivalence is made. Other context/layout/CPI implementation differences remain unresolved and excluded from this one-line change.

Clock failure becomes existing ProgramError original144544/current785760. Successful event serialization carries discriminator0x593adaeaeec2f5e8, timestamp, creator32, amountu64, vault32 and destination32, total120bytes. Original timestamp143904 and current784360 are loaded from successfulClock result; corresponding event stores original144640..144880/current785856..786080 retain that field sequence. Both log_data calls original144928/current786136 precede event-CPI invoke original146600/current787808. Event-CPI data starts with the same128-byte construction (8-byte event-CPI prefix +120 payload); original145816 prefix0x1d9acb512ea545e4 and byte-copy145848..145912 bind it. Current full body retains corresponding prefix/copy loop. Original event signer seed1164870 consumed17bytes is recorded exactly; no extra call body is opened.

Original event-CPI success/error both decrement temporary accountRc owners before common return146968 (success146624..146760; failure146840..146960). Current equivalent local cleanup remains in full body787856..788168. These observations establish ordering and local ownership only, not complete transitive failure equivalence. Source proposal changes only the pre-transfer6048 error decoration; all zero/transfer/event/context/source declarations stay byte-identical.

## Scope and next step

No new runtime fixture/probe exists. Dynamic6048 owner-rejection coverage is UNKNOWN until existing receipts are inspected; no successful suite is claimed here. No fixedauthority bypass, live transaction or signer/PDA/history change. Current297unmatched AMM original windows remain unchanged; no compiled candidate exists for this proposal. No full original byte/security/recursive equivalence is claimed.

After root review, one isolated pinned v1.44 compiler/v1.52 strip build from current6dc plus ONLY this one-line macro change can test the emitted plain6048 return and full inventory. Preserve full vendor/source30/dependency/tool gates and existing unchanged25-suite corpus; no new6048 fixture or initializer probe. Build authorization is separate. Account-context unboxing, CPI helper extraction and other unknowns are not part of this patch.

Portable verifier: `python3 -B verify.py`; optional `--repo ROOT` checks all30 current accepted inputs plus current collect/trade source bytes before any proposal is applied. It decodes no new original body and runs no compiler/VM/network.
