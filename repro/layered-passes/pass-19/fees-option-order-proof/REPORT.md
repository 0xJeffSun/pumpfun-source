# Sharing creation: later option and serialization order

## Exact proposal

The current c37 candidate checks both optional AMM accounts before pool validation and Pump calls, then unconditionally rewrites/serializes sharing state and uses three `unwrap()` calls on the graduated path. The original application checks pool again after both Pump calls, rewrites and serializes sharing state only on that graduated path, then checks program and event in order using fieldless enum19 conversions.

`proposal.patch` removes the early combined require; moves the existing second admin/shareholders/exit statement inside `if graduated` after an explicit pool `ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?`; and changes the following program and event unwraps to the same fieldless enum conversion. The first pool check and corrected all-four-reserves-zero predicate remain unchanged. CPI argument construction, targets, instruction bytes, initial state preparation, first state exit, pool validation and event construction are unchanged. No build, runtime case or main edit was performed.

## Input and field-role proof

All26 current source hashes and original/current/symbol hashes are in input-bindings.json. The original is4f2955d0..., current is c37bd3a19c3c57618f9239e0909c937c4f711492bc75b774fdaef7363453dcb7, symbols bf6aa79d53500b59b8ed645c620a10cd356094921c4acb745ba3dc6007c12fa3. Whole original/current applications and original parser/wrapper, complete option helpers, state exit and four direct CPI helpers are retained, with full function/call/data ledger entries and entire ELF files. Existing inventory classifications are unchanged.

Original wrapper639288 calls parser445160, then639544 calls application177720. Pool marker provenance to context1468 was established by the retained previous original parser proof; the same complete parser and app are included here. The program/event roles are independently linked as follows:

* Parser447952 calls11104; its error label803256 is `pump_amm_program`. Complete11104..11392 is normalized/relocation equal to current named Option::try_accounts9872..10160. The present branch calls74712 at11288; complete74712..75296 equals current named Program<T>::try_accounts86608..87192. It compares the key against literal806748, whose32 bytes equal AMM's actual ID, then requires executable. None returns result tag2 and pointer0. Parser447960 reads pointer result+8,447992 stores it atstack-3328,455680 reloads it and455688 stores context1504. Application187296 therefore reads the optional AMM Program pointer.
* Parser448032 calls complete10232..10760; diagnostic806312 is `pump_amm_event_authority`. This helper consumes an optional unchecked AccountInfo, with absent marker2 and failure marker3; present parses/clones the full48-byte AccountInfo. Parser448056 loads result+42,448424 stores it atstack-382. The final48-byte copy455400..455432 fromstack-424 tocontext1160 puts that marker atcontext1202. Application189288 reads precisely this marker. Subsequent PDA/account constraints remain in the complete parser; this proposal neither removes nor changes them.

## Whole application sequence

Both complete applications and all immediate call/data metadata are present; offsets below are original ELF offsets, not manufactured source coordinates.

1. Initial application checks sharing version, the accepted graduation predicate, creator/pool validity and payer authority. First state writes start181016; state exit19528 at181552 must return tag2 at181576.
2. The first direct CPI helper552776 is called at183904. Its result must be tag2 at183928 or application returns via186928. The second helper556488 is called at186640; its result must be tag2 at186664 or application returns. These are the two pre-AMM calls that current source makes to Pump. Both full helper bodies retain instruction discriminators (`ea66c2cb96483ee5` and `577c34bf3426d6e8`), AccountMeta/AccountInfo construction, invocation through724336, and cleanup before their returns. This packet does not re-prove recursive cross-program equivalence.
3. At186688/186696 the saved graduation flag is read/masked;186704 branches to186864 when true. False goes directly to Clock::get at186728, with its error conversion at186832; it never reaches the second sharing rewrite/exit. Hence the current unconditional second exit is unsupported on the nongraduated path.
4. Graduated path186864 reads pool marker1468. Missing marker2 calls enum19 converter289880 at186904, then returns186928. Present reaches186960, reads cached pool coin-creator words1408..1432 and writes sharing admin at187024..187080, then allocates its one-element shareholder vector187088..187200. It calls the same state exit19528 at187264;187288 returns any failure before reading the program pointer. The selected creator was already obtained from the same parsed pool in the initial graduated path; no reload is introduced.
5. Program pointer1504 is read187296. Null calls enum19 at187336 and returns; non-null jumps189288. Event marker1202 is read there. Missing marker2 calls enum19 at189328 and returns; present reaches189360. AccountInfo preparation then starts (clone63024 at189400 onward), followed by AMM helpers552776 at189704 and579040 at190064. Thus no AMM CPI/AccountInfo preparation happens before both option checks.
6. Each missing option uses the same full289880..290384 converter, constructing6019 with originNone; this was independently established in the prior accepted enum19 checkpoint and is retained here. Rust `.ok_or(FeeError::...)?` expresses that role without an eagerly allocated source-bearing Anchor error or panic.

Original state exit19528..20600 fully matches current named `Account<T>::exit_with_expected_owner`24920..25992 under the existing normalization/relocation method. Its owner comparison, borrow, discriminator and serialization error paths remain present; this proposal changes where that existing call is reached, as the original CFG requires, rather than changing its implementation.

## Current counterevidence and limits

Current early tests are515528/515536 (program pointer640) and515544/515552 (event pointer648), before current pool validation. Later current checks518848..518960 branch into unwrap-failure function745928. This changes error precedence: a missing AMM option can currently win over pool validation, the first state exit, either Pump call, or the graduated second state exit. Proposed ordering follows the original selected path instead.

The patch removes the nongraduated second state allocation/exit. On the graduated path it restores pool-before-state-exit-before-program-before-event order. It retains normal Rust account borrows and `?` propagation; no fabricated errors, layout controls or source coordinates are added. It does not claim exact allocator failure behavior, full cleanup byte identity, all recursive CPI equivalence or deployed vulnerability. Raw state-account/AccountInfo cleanup is available in full bodies and metadata; broader ownership equivalence remains bounded by the existing reconstruction. Current security observations are separate.

Run `python3 -B verify.py` for exact original call/field/branch assertions, complete normalized helper comparisons, input hashes and exact source substitution. No target is executed. No runtime evidence for this proposal has been generated.
