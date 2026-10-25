# Exact-token Mayhem field crosswalk

The twelve historical `MayhemState.field_8` references are false substring matches. All twelve cite the distinct identifier `field_89`. The corrected view removes those references from `field_8`; the existing twelve `field_89` references remain unchanged. No program edit or semantic renaming is justified. This is a pending documentation proposal, not an accepted source change.

`corrected-crosswalk.json` is the new view. `documentation-proposal.json` is an exact RFC 6902 test/replace patch for deriving it from the historical JSON in memory or a new destination. Do not apply it to immutable historical tables. `residual-ledger.json/corrections` preserves each old row, JSON pointer, full-source hash, line, absolute UTF-8 byte interval, one-based byte-column interval and adjacent delimiter bytes. All intervals are half-open except explicitly inclusive source-line admission ranges.

## Source and field coverage

The ledger partitions the GlobalParams payload [8,254) into 26 logical fields and MayhemState [8,106) into nine fields. [0,8) is the discriminator, not a recovered field. Account extension capacities 318 and 170 do not establish additional field definitions: [254,318) and [106,170) remain unmodeled capacity, not invented padding or attributed fields. Candidate Borsh account positions are distinct from native Rust memory offsets and ELF file offsets.

Every admitted exact identifier occurrence is retained: 245 source access/framework constraint occurrences and 221 other mentions (declarations, event labels, arguments, unrelated receivers or unresolved context). Six trade bodies each read and write `field_89` once. `field_8`, `flag_88` and stored `mint` have no explicit field access in these admitted source spans. That is not proof of deadness or absence of initializer, codec or other binary uses. Burn reads deadline/status and writes burned amount/status; those accesses are separate from the historical six-trade crosswalk.

The lexer masks comments and strings while retaining byte coordinates, then compares complete ASCII identifier tokens. Owner qualification distinguishes `MayhemState.field_8` from `GlobalParams` update argument `field_8` and from event labels. It follows the admitted lib.rs `state` alias only within the selected frozen source. Fixed slices map to their exact account interval. The two dynamic setter loops retain bounded argument/offset maps; their writes are not attributed to every field sharing the array. Reads and writes on the same line remain separate token occurrences. Eleven `has_one` occurrences are labeled framework constraint reads under the retained normal Anchor premise, not original-binary validation proofs.

The tool is deliberately a bounded source lexer/attributor, not a Rust type checker, macro expander or universal def-use proof. Raw token contexts and all unclassified mentions are retained for review. Normal framework serialization/deserialization touches the declared stored fields; no per-call execution or original-byte equality is inferred from the derive declaration. The predecessor's complete macro contracts, codec evidence, call mappings and outstanding obligations remain sealed alongside this view.

lib.rs admission uses lines 1–116, 127–310 and 348–462 from the prior bounded source study. Lines 117–126 and 311–347 remain conservatively unexamined. Their exclusion does not assert initializer identity. All other bundled current Mayhem Rust files are scanned lexically; no initializer or mixed-entry binary window is decoded. Initializer-named and mixed-entry windows retain the exact predecessor opaque status. No missing source span or binary window is silently counted as matched.

## Every serialized field

Counts below are token access occurrences, including bounded loop attribution and framework constraints, not execution counts. Whole-array resets can contribute one occurrence to multiple logical fields. Historical semantic names remain unrecovered.

| Owner | Field | Account byte interval | Occurrences | Role evidence |
|---|---|---|---:|---|
| GlobalParams | field_0 | [8,12) | 3 | unresolved |
| GlobalParams | field_1 | [12,16) | 3 | unresolved |
| GlobalParams | field_2 | [16,24) | 9 | Optional per-trade quote budget cap in native accounting; zero leaves this cap inactive. |
| GlobalParams | field_3 | [24,32) | 3 | unresolved |
| GlobalParams | field_4 | [32,40) | 6 | Strict overall native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| GlobalParams | field_5 | [40,48) | 6 | Strict per-coin native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| GlobalParams | field_6 | [137,138) | 3 | unresolved |
| GlobalParams | field_7 | [146,154) | 9 | Trade interval, decoded as i64 in the six recovered trade bodies; skipped when interval or last timestamp is zero. |
| GlobalParams | field_8 | [154,162) | 4 | SOL administrator withdrawal interval in seconds, interpreted as signed i64 |
| GlobalParams | field_9 | [129,137) | 8 | Minimum native quote reserves on transition from a state other than Variant1; real reserves for Pump, effective reserves for PumpSwap. |
| GlobalParams | field_10 | [166,174) | 2 | unresolved |
| GlobalParams | field_11 | [182,190) | 7 | Optional per-trade quote budget cap for non-native accounting; zero leaves this cap inactive. |
| GlobalParams | field_12 | [190,198) | 5 | Strict overall non-native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| GlobalParams | field_13 | [198,206) | 5 | Strict per-coin non-native quote-deployment limit on buys with a positive counter; compares the low u64 limb. |
| GlobalParams | field_14 | [222,230) | 7 | Minimum non-native quote reserves on transition from a state other than Variant1. |
| GlobalParams | field_15 | [230,238) | 4 | quote-token administrator withdrawal interval in seconds, interpreted as signed i64 |
| GlobalParams | paused | [48,49) | 11 | candidate named storage; source uses recorded separately |
| GlobalParams | admin | [49,81) | 5 | candidate named storage; source uses recorded separately |
| GlobalParams | trader | [81,113) | 8 | candidate named storage; source uses recorded separately |
| GlobalParams | sol_deployed | [113,129) | 30 | candidate named storage; source uses recorded separately |
| GlobalParams | version | [162,166) | 10 | candidate named storage; source uses recorded separately |
| GlobalParams | max_sol_per_sweep | [174,182) | 2 | candidate named storage; source uses recorded separately |
| GlobalParams | stable_deployed | [206,222) | 16 | candidate named storage; source uses recorded separately |
| GlobalParams | max_stable_per_sweep | [246,254) | 2 | candidate named storage; source uses recorded separately |
| GlobalParams | last_sol_withdraw_timestamp | [138,146) | 3 | signed i64 withdrawal timestamp; candidate read/write and retained rate witnesses |
| GlobalParams | last_quote_withdraw_timestamp | [238,246) | 3 | signed i64 withdrawal timestamp; candidate read/write and retained rate witnesses |
| MayhemState | field_8 | [8,16) | 0 | No role established in the six trade bodies. |
| MayhemState | end_timestamp | [16,24) | 13 | Signed timestamp upper bound for trading. |
| MayhemState | mint | [24,56) | 0 | Serialized mint field; this crosswalk does not infer all validation or initializer behavior. |
| MayhemState | field_56 | [56,72) | 30 | Per-coin signed net quote deployment: buy adds the measured quote/SOL-vault balance decrease; sell subtracts the measured balance increase. |
| MayhemState | field_72 | [72,88) | 18 | Signed base-token net accounting: buy subtracts actual tokens received; sell adds actual tokens sent. |
| MayhemState | flag_88 | [88,89) | 0 | No role established in the six trade bodies. |
| MayhemState | field_89 | [89,97) | 12 | Last trade timestamp written from Clock; read as i64 for interval checking. |
| MayhemState | status | [97,98) | 14 | Three-variant decoder; trade bodies check Variant1 and set it after the minimum-reserve check. No full lifecycle inferred. |
| MayhemState | burned_amount | [98,106) | 1 | Not read in the six trade bodies; the name comes from the separately recovered burn path. |

Five GlobalParams roles remain unknown: field_0, field_1, field_3, field_6 and field_10. Setter, event, reset and codec observations do not supply trading meaning. Field_10 is preserved by reset and is distinct from max_sol_per_sweep. GlobalParams field_8 [154,162) and field_15 [230,238) have the retained SOL/quote withdrawal interval interpretation, read as signed i64 despite public u64 option/event widths. They are unrelated to MayhemState field_8 [8,16).

## Actual bytes and inherited residuals

Thirty-one original instruction witnesses are freshly rebound to the deployed bytes with exact file offsets, raw hex, opcode, register byte, signed displacement and immediate. They cover setters, event loads, serializers, resets, interval loads and timestamp stores from the prior allowed field study. Each is required to lie inside an already admitted original window. The source-to-machine semantic interpretation remains the prior bounded witness, not a fabricated one-to-one compiler source map. No new call target is inferred from assembly labels.

`layer01/residual-ledger.json` is the complete, unmodified machine-readable binary residual ledger. It retains all 409 candidate and 441 inferred original rows, all alternatives, uncovered intervals, branches, 2,548 original and 2,226 candidate relocations, headers, sections, direct signed-call targets, indirect unresolved calls and data references. Its portable static verifier is rerun, including the complete body/call/data analysis. The new field ledger references this exact sealed ledger instead of discarding or simplifying its rows. Original inferred boundaries remain uncertain.

Original: 777,408 bytes, SHA-256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
Candidate: 667,552 bytes, SHA-256 `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`.
There are 361,719 differing common-prefix positions in 98,294 maximal ranges plus original tail [667552,777408), totaling 471,575 differing positions. All exact ranges are retained. Full-file equality is false. The inherited 40 candidate bodies having a raw-equal counterpart at changed placement and 172 having a normalized counterpart are distinct observations; neither closes actual target implementation equality, referenced-data equality, semantic equality or whole-file equality. Every null equality claim remains null.

Residual classification is preserved in the binary ledger: source organization/ownership for this documentation correction, linked dependency/helper, diagnostic/data metadata, toolchain/build provenance, ambiguous/unattributed and explicitly stopped. This pass establishes no new concrete application-source gap. Saved comparisons remain finite evidence; they are not exactness or security proof, and no allocator-failure exhaustiveness is claimed.

## Provenance, repetition and next actions

All 248 predecessor repository inputs were rebound using `git show c1ffdd0667608d4755227e68aab9f27a7e9a0d37:path`. `input-binding.json` records their Git blob IDs, sizes and SHA-256 values, plus the predecessor manifest hash. The whole predecessor publication and original manifest remain unchanged under `layer01/`. Current program sources bind to the accepted build through the preserved predecessor source-binding checks. No moving branch is an input.

Run `python3 -B verify.py` from any copy of this publication. It verifies the exact sealed file set, regenerates the field ledger in memory, checks the minimal JSON patch, asserts the six-read/six-write result, and reruns the predecessor's static verifier. Python 3.11+ standard library suffices. No Git checkout, network, compiler or target execution is needed for portable verification. `python3 -B analyze.py` regenerates the two derived JSON files locally; changing a sealed input requires a new manifest and root-reviewed snapshot. `layer01/rebind_inputs.py --repo PATH` optionally rechecks the frozen Git inputs. The outer manifest excludes only itself; its external SHA-256 and separate-copy receipt accompany the handoff.

1. Root can publish this corrected view alongside the historical crosswalk; keep the old twelve rows immutable and explicitly superseded. No program patch is proposed.
2. Continue using owner-qualified exact tokens and byte-bounded slices. On a newly accepted snapshot, refresh source admission, hashes and loop maps before accepting a regenerated ledger; frozen verification intentionally rejects input drift.
3. Preserve the five unknown GlobalParams roles, neutral MayhemState fields, unmodeled capacity, unclassified references, opaque windows, indirect branches and transitive data gaps. Obtain independently authorized evidence before broadening any boundary.
4. Whole-file identity remains the acceptance gate. This documentation repair adds no accepted handler, build, transaction, fixture, runtime receipt, security clearance or identical binary.
