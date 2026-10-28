# Optional chain805 source stage

This local, original-backed source change follows `nextfronts804`; all ten earlier stages and the default `curvehop745` remain available. It changes only `create_v2.rs` and `nested_create.rs` among the 60 source inputs. It does not include the unsuccessful decoder-expression experiment.

## Source ownership and measured boundary

The original 520-byte error constructor at 105664 stores error 6109 (`QuoteChainAccountsRequired`) with `programs/pump/src/create_v2.rs`, line 412. The prior current constructor had the same normalized body except the Source line and path length, coming from `nested_create.rs`, line 112.

The reconstruction appends a private, zero-argument owned-Error producer at the original-backed parent coordinate and uses it as the existing `ok_or_else` function item. Existing parent lines and the child's line count remain unchanged. The inferred helper name and module ownership are not a claim of uniquely recovered historical source. No inline attributes, compiler flags, special spans or layout forcing are introduced.

The measured implementation naturally appears as a 520-byte `FnOnce::call_once` adapter at 53080, not as a guaranteed named helper. Its complete normalized body, four immediate callee bodies, seven bounded data uses and three records match the original, including error 6109 and Source line 412.

The current typed walk remains a complete normalized match to its preceding implementation: the remaining-account count's zero branch alone invokes the constructor; its owned Error return pair and stack output slot are unchanged; the encoded local error path cannot reach the subsequent ancestor parser. All other immediate caller targets retain their complete normalized bodies. The broader original walk and ancestor remain unequal, so this does not claim whole-walk semantic equivalence.

## Preserved scope

The actual static census is 805 / 1,035 injective normalized windows and 133 raw windows, retaining all 804 / 133 preceding matches. A separate same-source root compilation reproduced both complete generated ELF files byte-for-byte. This is the accepted bounded static-plus-repeat checkpoint; prior source/artifact preservation and all 355 compiled dependencies were retained. The inactive historical SBF and both retired Relay caches were explicitly verified as archived, not assumed live.

The other 973 function windows retain their complete normalized bodies and typed paths. The observed bijection checks 10,890 direct targets, 5,086 data pointers, per-function imports, all old read-only literals and 645 record relocations; all 32,027 read-only data bytes remain identical. Duplicate equal implementations are not assigned unique historical identities by this observation.

The two previously unequal typed trade-handler edges and two unresolved trade panic-origin identities remain open. Existing FeeConfig and BondingCurve decoder differences, bounded PDA consumer extents, duplicate TypeId instance ambiguity, original clamp Source 57 versus current 2911, and the unmatched third split-record consumer at 527864 remain limitations. No universal recursive callee/data proof or complete original byte identity is asserted.

The source-only materializer has 81 passing pure tests across eleven stages. These tests do not compile or execute the program. Runtime remains **NOT RUN**, including held Mayhem and Pump runtime fixtures. Full original binary identity remains false. No binary, IR, SDK, archive or raw build/runtime receipt is included in this source packet.
