# AMM scalar setters and actual error helper

The 616-byte original / 608-byte current discrepancy is an actual caller-ABI specialization difference. It is not evidence that the scalar limit or its inequality is wrong. The existing scalar source already expresses the natural observed error condition and value order. No source patch is justified by this static evidence. Original source recovery, actual called-body identity, transitive error-data identity and whole-file identity remain open.

## Locked scope and inputs

This study uses the accepted `repro/pump_amm/destination-rent-v144` executable `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706`, symbol ELF `3208594d62e12b12399a3a574491cc86893021547dae475d584dba49087d560c`, original `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`, and all 22 source inputs. The 22 main inputs matched the accepted map at packaging. Main was read-only. `inputs/static-comparison.json` is the full unchanged accepted comparison, not an abbreviated match list. Its introductory scope sentence describes an earlier source change; its hashes and source22 map bind the actual accepted input used here.

The earlier complete 785-original/653-candidate inventory is reused by immutable hash in `inventory-reference.json`. Four relevant original rows are carried forward and rechecked against the identical original; no historical candidate address is substituted for the current candidate. The full historical archive is not duplicated. All new results are a focused continuation, not a replacement global inventory.

`input-provenance.json` enumerates precisely copied public artifacts. Six public dependency source members were read and matched against their exact local crate archive members after verifying the archives against Cargo.lock. No archive, cache directory, keypair or CLI telemetry is published. The portable verifier rechecks the retained members and lock checksums; archive/member equality at collection is recorded evidence, not a claim to re-read absent archives.

## Complete functions and real calls

| Setter | Original start / bytes | Current start / bytes | Original origin line | Current origin line |
|---|---|---|---|---|
| LP fee | `0x61630` / 616 | `0xf758` / 608 | 220 | 7 |
| Protocol fee | `0x61898` / 616 | `0xf9b8` / 608 | 230 | 13 |
| Coin creator fee | `0x61b00` / 616 | `0xfc18` / 608 | 243 | 19 |

All three functions retain unsigned `fee > 1000` rejection and the success-path field store. Their field offsets are unchanged. Each has two real incoming create/update handler calls. The full accepted comparison retains the complete create and update roots and those actual edges; `analysis.json` independently enumerates incoming edges.

For each complete setter, the first 552 bytes differ under normalization only at offsets `0x28`, `0x1c8`, `0x1d0`: the success jump displacement, source line and filename length. At `0x228`, the original executes `r4 = 1000`; at `0x230`, `r5 = r7` (fee); at `0x238`, it calls `0x1840`. The current body instead executes `r4 = r7` at `0x228` and calls `0x340` at `0x230`. The remaining 48 bytes align exactly under normalization at original `+0x238` / current `+0x230`, including the call opcode and the complete shifted return suffix. All bytes in both complete bodies are accounted for; the shifted call destination is checked separately and is not equal.

Each setter's five direct calls are paired in call order, not at fictitious identical offsets. The complete name, Display, unwrap-failure and AnchorError-to-Error conversion targets match under the accepted normalization. The fifth target, actual `with_values`, does not. This is four of five immediate target bodies, not five of five and not transitive closure.

## Actual helper and its error object

Original `0x1840` and actual current `0x340` are both 1,336 bytes. Their complete normalized bodies differ only at `+0x18`, `+0x20`, `+0x28`, `+0x30`. Original entry stores incoming r5 to stack `-288`, then r4 to `-296`. Current entry stores incoming r4 to `-288` and writes immediate 1000 to `-296`; the intervening r9 stack-address setup moves. Under their actual scalar-call arguments, both construct stack values `[-296]=1000`, `[-288]=fee`. Their normalized bodies from `+0x38` through the end match, and their full relocation patterns match.

All eight direct helper callsites align and their complete immediate target bodies match under normalization: four unsigned numeric formatting calls, one unwrap-failure call, and three memcpy calls. The formatter is aliased by current symbols as both u64 and usize Display. This proves unsigned 64-bit-formatting correspondence on this target, not a unique historical Rust type. `analysis.json` includes the complete immediate target instruction streams, not just a selected successful prefix.

The complete helper references and all scalar relocated references are retained with explicitly bounded previews. Previews are not inferred string/object extents. Actual scalar error-object evidence is narrower and exact: enum discriminant 0; error number 6000; source filename original `programs/pump-amm/src/state/global_config.rs` (44 bytes), current `src/state/global_config.rs` (26 bytes); the source lines shown above. The source `#[error_code]` assigns variant zero to `FeeBasisPointsExceedsMaximum`, with no custom message. Name/Debug formatting, owned strings, source-origin construction, boxed AnchorError conversion and compared-value strings remain part of the error path. Different origins mean the error objects are not identical, even when the numerical compared values agree. Allocator/panic/format metadata and indirect behavior are not closed by normalized code equality.

The helper's source takes `self` and `(impl ToString, impl ToString)`. It writes `Some(ComparedValues::Values((values.0.to_string(), values.1.to_string())))` for both AnchorError and ProgramError and returns self. This explains the observed tuple conversion without replacing the real specialized target with another body.

## Natural caller, type and condition

Exact locked sources are retained under `inputs/anchor`:

- anchor-lang 0.31.1 `src/lib.rs:705–717`: `require_gte!(a,b,error)` expands to `if a < b { return Err(error!(error).with_values((a,b))); }`.
- anchor-lang 0.31.1 `src/error.rs:294–297,370–386,479–496`: boxing, two independent ToString types, compared-value order and error fields.
- anchor-attribute-error 0.31.2 `src/lib.rs:85–116`: `error!` captures real `file!()` / `line!()` and constructs name, number, message, origin and initially absent compared values.
- anchor-syn 0.31.2 `src/codegen/error.rs`: generated enum/name/Display and error-number offset behavior.
- anchor-syn 0.31.2 `src/codegen/accounts/constraints.rs:1109–1110` and `src/codegen/program/idl.rs:279–288,315–319`: real usize-based compared values in account-size and IDL operations.

The current natural scalar expression is already `require_gte!(1000u64, fee, PumpAmmError::FeeBasisPointsExceedsMaximum)`. Its expanded rejection condition is `1000u64 < fee`, and its error tuple is `(1000u64, fee)`, both u64. This agrees with the observed scalar branch and stack tuple. Macro token expansion duplicates the operands into distinct type-inference contexts. Removing the `u64` suffix would allow the separate tuple literal to default to i32; it is not a justified recovery of the original unsigned helper. Inverting operands would change the comparison and/or diagnostic tuple order. Casting to usize solely to share an existing body would be a code-shape maneuver without original source evidence. No such edit was made.

The original exact spelling remains ambiguous: the macro and an equivalent explicit error construction, typed constants and other expressions can yield the observed behavior. The original unsigned formatter alone cannot distinguish u64 from target-width usize. The accepted dependency graph is verified current-source evidence, not proof of the original historical dependency graph.

## Why helper sharing matters, and why there is no patch

A fresh scan of signed call displacements finds **24 original calls** into `0x1840`, including the three setters and 21 non-scalar calls. The current specialized `0x340` has exactly the three setter calls. A different current helper at `0x1308` completely matches the original under normalization, but none of the setters calls it. That other body is not globally unused: it has six actual callers (four account-parser closures and the two IDL handlers). The locked size/IDL sources provide a natural usize-based sharing explanation for those callers; symbol/code equality does not establish that they share the scalar u64 monomorphization.

Thus the machine-code evidence is consistent with whole-program constant propagation after the reconstruction lost other dynamic callers of the scalar helper's generic instantiation. It establishes the specialized ABI and the loss of original call sharing; it does **not** identify a unique original source edit that will restore the 616-byte callers. Restoring a genuinely missing numerical validation macro elsewhere might change sharing, but the 21 outside callers have not been given complete historical source/condition/error-object attribution by this scalar study. Choosing one arbitrarily would violate the evidence gate. A local binding or typed constant with the same value/type does not provide evidence that specialization will stop. Attributes, artificial wrappers, opaque arithmetic, source-coordinate spoofing and compiler/flag trials are excluded.

The next defensible source step is full attribution of a specific original dynamic numerical-error caller against its current implementation, including condition, types, tuple order, error code, complete containing function and data. Only an independently justified correction there could support a later authorized fixed-source build. This is an evidence requirement, not a request to run a variant search or broaden this worker's scope.

## Validation and boundaries

`python3 -B verify.py` uses only Python 3.11+ standard library from a separate copied publication directory. It checks the exact file set and hashes, all 22 source bindings, six dependency members against their lock package checksums, regenerates this focused analysis, rechecks every full root/helper body against the retained comparison, checks actual call targets, full immediate callee bodies and the original inventory row bindings. It does not compile, typecheck, run the programs, download anything, replay transactions or validate new signatures.

The separate verification receipt records successful verification from a copied package and rejection of a deliberately modified copied source file. Only the copied file is mutated for this integrity check. The original evidence, failures, seals and main source remain unchanged. Existing 17,462 comparisons / 35,418 signature checks are historical checkpoint evidence, not newly performed work. AMM 37/38, total 140/150 and whole-original identity 0/4 remain unchanged. No initializer success, security completion or new runtime acceptance is claimed.
