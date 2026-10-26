# Remaining CTO numeric-error ledger and five-guard source proposal

Baseline is the active PASS21 ffa0f3bab34b8cfca6d6aeef5e6b8dcabad0a16eccfeb3d22d5781e22ae3b193, symbols964c06b5bfa5611f7297a590e53edce44cd38372661ad3bd231e6bc1805496a4. current-source37.json matches the full37 current compile inputs. README is outside them. No main/source, Git, build, VM, new fixture or probe was changed/run.

Exact proposal replaces five `err(n)` expressions, in place, with existing named `error!(PumpError::...)`:6084 HolderRewardDisabled,6090 CtoNewCreatorNotAllowed,6089 CtoNewCreatorRequired,6077 CreatorFeeNotConfigurable,6078 CreatorFeeBpsOutOfRange. No predicate/order/borrow/mutation/clock/CPI or existing owned6088/6083/6080 expression changes. The exact11remaining source-return occurrences are exhaustively listed in guard-ledger.json, including both6092sites. The numeric helper definition is not a return guard.

## Complete evidence and shared ownership boundary

Retained complete original141840..169240 application and1235456..1237664 wrapper, current441928..467976 application and1118800..1120928 wrapper, full original1035/current780 function-call-data ledgers, complete name/Display/converter bodies and their recorded closure are included. Existing opaque rows remain opaque. Rendering and raw hashes are checked from exact retained original/current files; no partial normalized equality substitutes for byte identity.

All five proposed error aggregates are original owned AnchorError with code, name String, message String, Source and compared-values None. The constructor fields are at frame-720..-568: Source tag2 at-640; source filename at-712 and length38 at-704; historical line at-696; compared-values None tag0 at-720. The complete converter1686320 allocates160bytes/align8, copies the aggregate and returns outer Error tag0. Each changed error path loads the owned result and jumps directly to164472..164496 common result transfer, without an additional comparison decorator. Formatter/allocator failure branches remain retained. Current unchanged numeric helper instead creates ProgramError::Custom, calls1353752 and returns a128byte ProgramErrorWithOrigin box/outertag1, no name/message/source.

The complete original wrapper admits only success tag2 at1236952 to curve exit23080 at1237008. The owned-error path uses1237544 account cleanup and transfers error; current wrapper's matching source role admits only success at1120264 to serializer27824 at1120320. This proposal changes neither wrapper nor cleanup. It selects existing AnchorError construction so logging/lowering/drop receive the correct owned variant. Future emitted code must confirm this complete path; source-only proof cannot assert future instruction layout.

## Predicate/argument provenance and original position

The full original wrapper decodes holder None/false/true as2/0/1, passes r3 at1236912; app saves141856, masks143400. Typed BondingCurve old-holder native+165 is read142512. The admitted full BondingCurve serializer proves that field role. Global holder enable native+1087 is read142912; configurable native+1086 at142920; max fee native+1072 at142904. Fee Option tag arrives r4, saved141848; value is caller frame-4096 read142328 and saved frame-2352. New OptionPubkey tag comes from r7+0 at143080 and frame-2296, reconstructed by complete wrapper's option decoder into caller instruction frame. No field casts/padding are introduced.

6084: after owned6088 and downgrade6083 checks, oldholder=false and incoming holdertrue selects143648..143672→144136. Global holder-enablefalse selects145744. Name/Display calls145776/145920; selector literal1793464 index84. Aggregate code146064, originline296, converter146136, directreturn146160. Current predicate remains holder==Some(true)&&!oldholder&&!globalenabled.

6090: accepted incoming holdertrue path144144 reads newtag; nonzero144152 falls144160. Selector1793872 index90; name144192/Display144336. Code144480, origin298, converter144552, directreturn144576. Current predicate holder&&new.is_some() remains after6084 and before6089.

6089: nonholder143648..143680 reads newtag. Zero goes143712; Some goes144920. Selector1793660 index89; name143744/Display143888. Code145640, origin306, converter145712, directreturn145736. Current predicate !holder&&new.is_none() remains untouched. Holder/new interactions and the None/false distinction remain in the existing source.

6077: fee-presence saved141848 is tested before reaching fee-only validation (144648/147216). Configurable flag from Global+1086 is saved143376 frame-2368;147528..147536 branchesfalse to147776. Selector1793684 index77, name147808 and generic to_string wrapper43320 at147848. That complete wrapper calls PumpError Display1433224 at43464 and returns owned String triples; it is not a different error ABI. Code147912, origin334, converter147952, directreturn147976.

6078: after configurable succeeds,147544 loads feevalue,147552 subtracts1 and147560 accepts unsigned(f-1)<max. This is precisely rejection f==0||f>max over u64, including max0 and wrap atf0. Max is the r9 value retained from Global+1072 (142904 through r4, copied143432). Selector1793844 index78; name147600, same Display wrapper147640. Code147704, origin338, converter147744, directreturn147768. Current guard remains the exact existing ifletSome(f) predicate, after6077 and owned6080.

Exact selector name/message results for every Pump code are retained in guard-ledger.json, evaluated through the full original Display function and verified against current enum names/messages. New source origins will be truthful file!()/line!(), not historical line constants. No source padding/remap is proposed.

## Explicitly unchanged unresolved rows

6030: original zero-target compare145112..145136 selects146744; AnchorError conversion146920 is followed by loading actual/zero pubkey operands and compared-pubkeys decorator1687992 at147072. Plain error! loses compared values. Keep unchanged until operand/decorator ownership proof supports a complete natural expression; full decorator body retained.

6019: original two pubkey comparisons145184/145208 and145256/145280 share146536 owned error with None at construction. Current guard checks target==sharing_config only. The second account tuple identity is not independently closed here. Do not conflate numericcode with a complete corresponding source guard. Existing predicate remains unchanged.

6091: original owned code/name/message proven, but native/whitelist selector semantics feed shared paths144648..144720 and147216..147288. Exact account-list/quote closure not independently rederived in this packet. Preserve existing guard and unresolved closure rather than widening this patch.

6092 x2: original owned6092 terminal164504..164728 is known; the current source has an early wallet writable guard and a repeated wallet-branch writable guard. Which concrete original joins correspond to each, and effect/error precedence, need a dedicated wallet attribution. Neither changes here. Their metadata is not confused with proof of full predicate correspondence.

2006: framework ConstraintSeeds, not PumpError. Original framework name constructor1697584 at150632 precedes code150920, Source648, Anchor conversion150992;151016..151152 loads actual/expected pubkey operands, then1687992 at151192. Exact framework Display/name consumption and decoration/account order are unresolved here; a plain PumpError or plain error! replacement is inappropriate. Keep unchanged.

Original application also contains error6093/6095 and other failure paths without a matching current numeric-return occurrence. These are not new proposed guards or implicitly recovered source; no opaque expansion is performed.

## Review and future acceptance

Root must review exact five-substitution patch before any build. If separately approved, one fixed pinned build must gate the new baseline37/tools/dependencies and inspect all five complete emitted predicates, factory/message/source/compared-values construction, owned conversion, wrapper cleanup, existing owned6088/6083/6080 and all raw residuals. Runtime replay requires separate authorization and unchanged admitted corpus only. No new coverage is asserted here. Preserve prior orchestration helper transition proof and truthful source-origin mismatch; neither implies historical recipe recovery or whole original byte equality.

`python3 -B verify.py --current-main PATH` checks strict cache-free seal, current37input map, all1815raw function bodies, complete selected renderings, original code/factory/origin/None fields and calls, exhaustive currentnumeric-return occurrence ledger, and exact five-substitution source patch. It performs static file reads only.
