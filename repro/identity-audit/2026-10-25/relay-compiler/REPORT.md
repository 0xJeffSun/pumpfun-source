# DonationRelay retained compiler-family audit

DonationRelay has a previously unclosed core-library/codegen discrepancy: none of the seven retained stock recipes supplies a complete matching `core::fmt::write`, Unicode printable consumer or Unicode check body. The target nevertheless consumes all six authentic retained printable tables, all 1,449 bytes raw-identical. Its actual table consumer is 696 bytes and its direct callee 704 bytes, unlike every tested candidate pair. Shared data and a platform-tools source path therefore cannot establish the compiler.

A narrower positive closes the multiply chain: v1.45/v1.46/v1.46.1 share a complete 352-byte raw-exact internal multiply body in Relay. Their 72-byte `__multi3` wrapper has three apparent instruction-pattern matches, but only one survives the complete callee constraint. These facts distinguish selected helpers from the stronger v1.44 evidence for other programs; they do not identify a unique Relay compiler, recover complete Relay source or establish whole-file identity.

## Retained inputs and target witnesses

The target is the captured DonationRelay payload `evidence/dependencies/donation_relay/deployed.so`, 830,448 bytes, SHA-256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The capture receipt, program account and programdata bytes are separately hash-bound. The payload equals programdata after its 45-byte loader header. The ELF section table ends at818,280; all 12,168 following payload bytes are zero. That retained allocation tail is kept distinct from executable/source evidence.

Target header machine 263, flags 0 matches the genericV0 header generation of retained v1.44 onward; retained v1.43 has machine 247, flags 0. A compatible header is not a unique compiler signature. Seventeen exact embedded paths under `/home/runner/work/platform-tools/platform-tools/out/rust/library/` include alloc/string/raw_vec and core stable-sort quicksort sources. An application path says `programs/contracts/src/lib.rs`. These are source/build-path witnesses with exact file offsets in `input-bindings.json`; no version is inferred from their spelling or from output size.

All requested retained candidate and unstripped-symbol inputs are available. This audit checks their actual hashes against saved successful build receipts and checks stripped/unstripped `.text` equality before using symbol extents. The five Fees-family recipes share the identical 11-file frozen source/lock map for the earlier 16-handler graph; the Mayhem v1.52/v1.53 recipes share the identical 14-file source/lock map for its accepted 24-handler graph. Actual retained source bytes are also rehashed. Version labels refer to those existing measured recipes, including v1.46.1 and v1.53's already documented supported-target adaptations; no new toolchain is installed or invoked here.

`input-bindings.json` retains each command, selected compiler hash/version receipt where available, source hashes, graph identity, candidate/symbol hashes, headers and section extents. `external-inputs.json` pins every dependency used by the portable verifier. This audit reuses retained provenance and does not newly claim that it has downloaded or independently rehashed every compiler distribution.

## Method and descriptive counts

The copied full-helper method scans complete emitted candidate symbol bodies against all captured target text. Only internal relative-call destinations and loader-relocated immediate fields are masked, in memory. Every other instruction byte and relocation offset/type/symbol must match. A complete target match must start at an inferred entry and end exactly at the next inferred entry. Unique identified callees add a further constraint; unknown callees remain explicitly unresolved. Raw equality, ambiguity, failed callees and bounded data-prefix observations remain separate fields. No executable is edited or normalized on disk.

Target entries are inferred from direct calls, code pointers and the entrypoint. They are evidence for boundaries, not proof that no undiscovered entrypoint exists. Candidate names label candidate functions; target names are inferred from full-body correspondence or the separately documented six-table binding, not from stripped target symbols.

| Retained recipe | Graph | Selected library-named functions | Complete bounded/call-consistent matches | Bounded raw-exact matches | No full pattern match |
|---|---|---:|---:|---:|---:|
|v1.43|Fees16|109|23|3|86|
|v1.44|Fees16|109|41|8|68|
|v1.45|Fees16|125|60|16|65|
|v1.46|Fees16|125|60|16|65|
|v1.46.1|Fees16|125|60|16|65|
|v1.52|Mayhem24|118|39|5|79|
|v1.53|Mayhem24|118|39|5|79|

Counts include emitted core/alloc/std/hashbrown/builtins names and monomorphized wrappers, including graph dependent type specializations. They are descriptive inventories, not recovery percentages, a fair cross-graph ranking or statistical confidence. A wrapper with an unresolved callee can pass the subset of mapped-call checks; this does not close its complete behavior. `helper-results.json` retains all such unresolved edges and every negative/ambiguous match.

## Named complete-function discriminators

| Candidate helper | v1.43 | v1.44 | v1.45/1.46/1.46.1 | v1.52 | v1.53 |
|---|---:|---:|---:|---:|---:|
|`core::fmt::write`|1064,negative|1056,negative|1160,negative|1000,negative|1000,negative|
|Unicode printable consumer|992,negative|872,negative|752,negative|816,negative|768,negative|
|Unicode check|720,negative|712,negative|712,negative|648,negative|648,negative|
|`__multi3` ABI wrapper|352,negative|352,negative|72,one callee-consistent window|352,negative|352,negative|
|`panic_fmt`|88,negative|80,negative|80,negative|48,match|48,match|
|`panic_bounds_check`|216,negative|200,match with unresolved callee|200,match with unresolved callee|200,match to mapped panic_fmt|200,match to mapped panic_fmt|

Sizes are complete candidate bytes. A negative means no complete instruction/relocation-pattern match anywhere in target text under this method. It does not mean the named source operation is absent, that a nearby target function is equivalent, or that every other source/profile/LTO/custom-sysroot recipe is excluded. No profile or spelling search was performed.

The six Fees v1.45–v1.46.1 hex-formatting wrappers are 32 bytes each and have ambiguous target windows with unresolved formatting callees; they are not the closed hex formatter positives measured previously for Mayhem v1.53. The other retained hex-formatting bodies have no full Relay match. All exact names, sizes, addresses, raw/masked outcomes and rejected callee windows are in `named-discriminators.json`.

## Multiply code and callee closure

The v1.45/v1.46/v1.46.1 internal `compiler_builtins::int::mul::Mul::mul` body matches Relay `[751104,751456)` raw-exact,352 bytes, SHA-256 `077ab758edf585dda441884e96235f8753c331b5e88efb39ac5bf47db30d6707`. Candidate and target have no internal calls, global LDDW references or loader relocations in that complete body. Its global code/data-reference closure is therefore concrete; input/output memory and arithmetic still follow caller arguments.

The corresponding 72-byte `__multi3` instruction/relocation pattern appears at target 752152,752616 and752688. The first two are rejected: their calls at offset 24 target 752416 and 752224 respectively. Only `[752688,752760)` calls 751104, the independently raw-matched complete 352-byte callee. Its relative call bytes differ because of placement; executable bytes are never rewritten. Thus this ABI wrapper is resolved by actual callee identity rather than treating three normalized lookalikes as equivalent functions.

These three stock recipes share this multiply implementation and cannot be distinguished from one another by it. The v1.43/v1.44/v1.52/v1.53 complete ABI bodies remain negative. A library helper pair does not establish the application compiler or prove one uniform toolchain generated every target dependency.

## Unicode full arrays and the remaining code discrepancy

The retained immutable Rust printable source is commit `7a87f939d96c478029873d3d43f3a4372f484c42`, source SHA-256 `29836734466bfec58fd8735cc58659e8369814ffa2090c2239854d500439b59a`. It was already provenance-checked in the published v1.53 packet and is copied here verbatim. The table bytes are not assumed unique to that release.

| Complete constant | Bytes | Relay file offset |
|---|---:|---:|
|NORMAL0|297|771338|
|SINGLETONS0U|80|770968|
|SINGLETONS0L|290|771048|
|NORMAL1|486|770482|
|SINGLETONS1U|88|770186|
|SINGLETONS1L|208|770274|

Each full source-defined array has one exact occurrence in Relay. All six are consumed by actual type8-relocated LDDW operands in the single entry-bounded target window `[736464,737160)`, 696 bytes, SHA-256 `812449f589aa6133d5e34b46e6986da0e9825e3b62616ea2b2e54c73012b4296`. Its only direct call is at body offset 288 to 735760; that callee ends at 736464, 704 bytes, SHA-256 `13480629ff140cc2accf9685552f70eaddc650fed14be076b888e42796a53c18`. This actual table-and-callee binding supports identifying the target pair as the Unicode printable consumer/check, despite absent target symbols.

The same six complete arrays also bind to actual operands in retained v1.53's 768-byte consumer, yet that complete code and its 648-byte callee do not match Relay. The target pair's 696/704 sizes also differ from every other retained pair above. Full-table equality therefore closes those specific data extents while exposing, rather than masking, the core-library/codegen discrepancy.

The 704-byte target callee contains three further calls: 730608, 730600 and 715296. The first two are 8-byte call thunks to 742376/742176; the last corresponds to a 40-byte unwrap-failed helper and continues into panic handling. `closed-discriminators.json` retains the complete immediate edge records, calls and data references; that transitive panic/drop/formatter graph remains unclosed.

Two diagnostic references in that callee decode as 24-byte pointer/length/line/column-shaped records. Target pointers name the complete 29-byte `core/src/unicode/printable.rs` string at positions 10:43 and 26:54. Retained v1.53 records have the same positions but name 38 bytes, `library/core/src/unicode/printable.rs` followed by a NUL. The full descriptor and pointed path bytes are retained, including the NUL. Their raw data differs; filename ABI equivalence, whole descriptor identity and historical path remapping are not asserted or fabricated. The shared source positions support the Unicode inference but do not resolve the code/diagnostic representation discrepancy.

`complete-target-bodies.json` retains complete raw instructions for the 696/704-byte pair and multiply 72/352-byte pair, including operand-derived branch/call destinations and relocations.

## Limits and next discriminator

This audit establishes that assuming Relay shares the earlier four-core-program compiler fingerprint leaves real named library bodies unexplained. It also establishes that neither the Mayhem v1.53 Unicode code match nor its shared tables transfer wholesale to Relay. No single retained stock recipe closes Relay's fmt/Unicode/multiply/panic evidence together. That observation does not prove multiple compilers were used; original sysroot optimization, dependency/module organization and unmeasured compiler/source inputs remain unknown.

Any future proposal needs authentic source/compiler/sysroot/profile provenance that explains the complete 696/704-byte Unicode pair and fmt negative while respecting the closed multiply pair. This packet launches no additional version, compiler-flag, profile, formatting, source-coordinate or metadata experiment. There is no Relay source-completeness percentage, unique historical compiler claim, candidate promotion, whole-file identity claim or runtime acceptance.

Run `python3 -B <packet>/verify.py` from any directory inside this retained repository layout. It rehashes packet/external inputs, actual frozen sources and capture layout; recomputes all seven full helper scans, exact named negatives, actual six-table references and 1,449 full bytes, complete Unicode bounds/call, and the multiply wrapper's two rejected and one accepted callee windows. Python's standard library suffices; no compiler, network, cache installation or VM is used. No source, lockfile, global toolchain, accepted artifact, status or stopped lane was changed.
