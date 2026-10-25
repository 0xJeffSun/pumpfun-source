# Mayhem withdrawal timestamps: admitted original role closure

The two neutral slots at serialized account138..146 and238..246 have demonstrated non-initializer roles: last SOL-admin withdrawal timestamp and last quote-admin withdrawal timestamp. This corrects the narrow serializer-only ambiguity in the earlier GlobalParams representation review; that review's frozen report remains unchanged. It does not recover historical names or uniquely establish original Rust declaration types, and no source patch/build is proposed here.

## Full retained evidence, not offset coincidence

The earlier authenticated mayhem_state_roles packet explicitly retains six complete admitted windows: both withdrawal wrappers, handlers and rate helpers. This packet copies those exact raw windows and row provenance, binds full original ELF and current7d416f84 artifact, and extracts only the two allowed source bodies. No initializer or other opaque code is opened.

SOL wrapper7ec80..7ef10 calls handlerc138 at7eed8. The handler passes context member+32 to rate helper2b468 atc160. Within that complete helper, rate-check2b4b8..2b530 reads native+88hex(last) and+98hex(interval), gates on both zero, adds signed values and performs signed Clock comparison. Timestamp store2b6a8 writes last. Quote wrapper7ef10..7f1a8 callsc560 at7f170; handler passes member+568 to helper2b768 atc588. Rate block2b7b8..2b830 uses native+d8(last),+d0(interval); timestamp store2b9a8 updates last. The complete success,6014 failure and overflow paths remain in retained windows; snippets alone are not treated as whole-body evidence.

The independently admitted original serializer maps native136 to wire138, native152 to wire154, native216 to wire238 and native208 to wire230. Its field order/width map corroborates the original pointer-owner chain rather than merely matching displacements. Current withdraw_admin reads reset_middle[1..9] as i64, compares against reset_middle[17..25], then writes current Clock timestamp into the first range before transfer. Current withdraw_quote_admin does the corresponding reset_stable_suffix[16..24] and[8..16] operations. Both preserve zero gating, signed addition with overflow panic,>= comparison and write-before-transfer. Existing transaction rollback semantics are not newly tested.

## Source decision

Current behavior already represents those roles correctly. No missing check, incorrect ownership or different operation order is established. A separately reviewed descriptive field split could now use neutral role names for these two ranges without guessing policy, but original wire type and precise Rust field declaration remain distinct questions. Serialization and signed reads do not uniquely distinguish an i64 declaration from u64 storage cast at use or an8-byte array. Replacing them with typed fields solely to influence layout would still be unsupported. Initializer/reset semantics must not be expanded to fill that gap.

The five unresolved GlobalParams business fields0/1/3/6/10 remain unresolved; this timestamp role proof does not rename them. Field8 and15 are withdrawal intervals already supported in the same retained proof. Generic boxed Anchor error ABI and formatter-allocation differences remain unclosed; no manualError representation or compiler/version sweep is justified.

Exact next step: incorporate these two already-proven timestamp roles into the GlobalParams representation evidence ledger, then seek independently admitted constructor/decoder or typed-consumer evidence that uniquely selects a natural declaration. If none exists, preserve source arrays and do not build a guessed layout. No further runtime or initializer probe is needed or authorized by this report.

No source/main/branch/index changes, build/runtime/newcase, fakecoordinate or private-security inspection. Current source and complete original windows bind the bounded finding; no full security or semantic/whole-ELF equivalence claim. verify.py --repo . is static-only.
