# Admin CTO owned6083: one-guard source proposal

Propose exactly `err(6083)` → `error!(PumpError::HolderRewardCreatorImmutable)` at the existing holder downgrade guard. The predicate and guard order remain byte-for-byte unchanged in source. The already accepted owned6088/6080 construction, typed full BondingCurve, mutation/Clock/CPI order and borrow scopes remain unchanged. This packet performs no build, runtime, new fixture or main edit.

## Baseline and complete boundaries

Baseline is the PASS20 c261d215495a35aa59970546b87bd5fb74407d2bbd5d885d41a0d1a2677cc2f2 executable, symbols76a6afa5779b9a9e9ccfc34a1449d0f6829fef073bc4668d86d879bff4983dd1. Exact hashes and source binding are in binding.json. Original remains7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d. Full admitted1035original/780current function/call/data ledgers are unchanged and included; earlier opaque classifications remain opaque. Original/current complete application/wrapper/error-factory bodies, transitive factory callees and immediate wrapper/application callees are rendered under original/ and candidate/. No partial normalized match is called whole identity.

## Predicate and position

Original wrapper1235456..1237664 decodes holder Option<bool>: None → r8=2 at1235552; Some(value) → r8=value at1235640, rejecting bytes>=2 at1235656. It passes r8 in r3 at1236912, immediately before application call1236928→141840. Application saves r3 to frame-2328 at141856.

Original decoded context accounts is loaded at141880; typed box+56 at142160/142456; complete BondingCurve native+165 is_holder_reward is loaded142512, saved frame-2272 at142520 and loaded r0 at142944. No intervening call changes r0 before143408. The first mayhem guard at143344 selects its owned6088 error before the downgrade predicate. At143392..143400 holder option is loaded and masked&1: both None2 and Some(false)0 become0; Some(true)1 stays1. At143408..143416 the old holder flag is tested; false skips downgrade error. When oldholder=true,143440 permits only option-bit1; otherwise143448 enters6083 construction. This proves exactly `is_holder_reward && holder != Some(true)`. The next holder-enable guard is later; the full body retains those joins and errors.

Current application441928..467648 reads typed curve+165 at442016, branches at442024, masks the decoded holder option at442008/442032 and selects generic6083 at442048..442128. The preceding mayhem test441960 selects accepted owned6088 at442144 and returns; holder rejection is still logically second. The wrapper1118472..1120600 passes the same decoded argument and runs full account exit only on success. Source proof proposes no control-flow reordering.

## Original owned construction and ABI

143464 passes literal1793656, whose u32=83, to name factory1405824 at143480. Complete name dispatcher compares83 at1406240 and selects1413120:28byte name allocation/copy path. Actual literal1804640 is exactly `HolderRewardCreatorImmutable`. Complete Display1433224 receives the same selector at143624. Its83dispatch1433408 selects1435192 and slice descriptor1828192; the referenced string1808118 is exactly53bytes: `The creator of a holder-reward coin cannot be changed`.

The normal formatting result143912..144000 moves the owned name/message triples into the error aggregate.144008..144064 sets original filename `programs/pump/src/creator/admin_cto.rs`, code6083, Source discriminant2, actual historical line289, compared-values None.144104 calls full converter1686320..1686456: allocate160bytes/align8, copy aggregate, return outer Error tag0 plus box. Formatting panic and allocator failure branches remain in retained complete bodies.144112..144128 transfers the returned pair to the common return164472..164496; no premature string drop occurs.

Original wrapper1236952 admits only success tag2 to curve exit23080 at1237008. Error goes1237544 through account cleanup45648 without serializing the typed curve, preserving the owned Error for caller. Current wrapper retains the same ownership role and typed cleanup. All direct-call/data boundaries are included; this proposal changes neither wrapper nor parser.

## Current discrepancy and natural source correction

Current442048..442112 writes ProgramError::Custom6083 and calls1353424..1353584. That converter allocates128byte ProgramErrorWithOrigin, leaves origin absent and returns outer tag1. It never creates the name/message strings. This is a real error/ownership/diagnostic discrepancy despite identical eventual numeric6083.

Current PumpError already defines index83 `HolderRewardCreatorImmutable`, code6083, with the exact original53byte message. The retained framework error! macro constructs owned name/message, numeric code, Source(file!(),line!()), compared-values None and converts AnchorError. Current full AnchorError converter1353288..1353424 allocates160bytes and returns tag0. Reuse that existing natural expression, with actual recovered-source origin. Do not copy original filename/line289 or add padding. Historical framework/compiler provenance and whole executable identity remain unresolved; no ABI layout is manually constructed by the source patch.

## Acceptance and limits

Root must first review this exact patch. Any later build requires separate approval, unchanged pinned source/tool/dependency gates, one isolated attempt and complete emitted predicate/factory/wrapper/drop checks. A named source correction is not an original byte-identity claim. The later error6084 and other numeric guards remain unchanged/unproved by this packet.6080 is already owned;6081 is not the current numeric guard and is not modified.

No runtime coverage is claimed for this new proposal. Existing corpus could be replayed only under later authorization; no new holder/Mayhem fixtures or probes. Even a passing numeric result would not alone prove name/message/origin. Truthful new source origin will differ from original and must be retained as a mismatch.

Run `python3 -B verify.py --current-main /path/to/repository`. The verifier checks strict manifest, all1815full raw function hashes, retained complete renderings, exact original/current critical instruction/argument bindings and exactly one source substitution. It performs static file reads only.
