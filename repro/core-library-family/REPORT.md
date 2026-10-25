# Direct Pump and PumpSwap library-family comparison

Both captured core programs directly reproduce the measured v1.44 Fees-graph distribution's complete `core::fmt::write` and 352-byte `__multi3` bodies, raw-exact. Both also reproduce its complete Unicode printable/check instruction and relocation patterns, with actual consumer-to-check calls and all six full referenced arrays (1,403 bytes) verified. This supplies direct evidence for each core capture, replacing inference from Fees or ELF headers alone. It does not establish a unique historical compiler, complete application source, whole-program identity or a uniform toolchain for every dependency.

## Complete named witnesses

| Target | fmt::write raw-exact | __multi3 raw-exact | Unicode consumer | Unicode check |
|---|---|---|---|---|
|pump|[1762144,1763200) 1056B|[1791432,1791784) 352B|[1777440,1778312) 872B|[1776728,1777440) 712B|
|pump_amm|[1131744,1132800) 1056B|[1161264,1161616) 352B|[1147040,1147912) 872B|[1146328,1147040) 712B|

The fmt body SHA256 is `7a5339492369c3813ea033c29cf8313288cf8efa07b2da552321cebc9c9f13c1`; multiply is `face056642083fcc15c6737f1910030a4b59b6a78a4fa523f142dc0f28635762` in v1.44, Pump and PumpSwap. Neither body contains internal direct calls, loader relocations or global LDDW references. fmt includes indirect formatting dispatch; raw identity does not identify the runtime-supplied formatter implementations or data.

| Retained frozen recipe | fmt bytes / outcome in both | Unicode consumer/check bytes / outcome | multiply body / outcome |
|---|---|---|---|
|v1.43|1064 / negative|992/720 / negative|352 exported leaf / negative|
|v1.44|1056 / raw-exact|872/712 / complete pattern + actual call match|352 exported leaf / raw-exact|
|v1.45|1160 / negative|752/712 / negative|352 internal leaf and72 wrapper / both negative|
|v1.46|1160 / negative|752/712 / negative|352 internal leaf and72 wrapper / both negative|
|v1.46.1|1160 / negative|752/712 / negative|352 internal leaf and72 wrapper / both negative|

A negative means no complete candidate-body instruction/relocation pattern exists anywhere in target text with this method. It does not establish source absence or exclude every profile/LTO/custom-sysroot recipe for a release. No72-byte wrapper pattern appears in either target, so there is no surviving wrapper/callee attribution for these later candidates. Relay's separate three-lookalike/one-callee result must not be transferred to Pump or PumpSwap.

The352-byte multiply negatives retain exact instruction differences against each target: v1.43 at function offsets160/216; v1.45/1.46/1.46.1 internal leaf at328/336. Complete bodies and all differences are saved, rather than identifying a leaf from size or a wrapper name.

## Unicode code, actual calls and complete data

The872-byte consumer's only direct call, at offset288, reaches the independently matched712-byte check in each capture. Full caller/callee instruction bodies, relocation patterns, branch displacements and registers agree after masking address-bearing fields only. Six actual type8-relocated LDDW operands bind the complete source-defined arrays: NORMAL0 301B, NORMAL1 450B, SINGLETONS0U 80B, SINGLETONS0L 288B, SINGLETONS1U 88B and SINGLETONS1L196B. Each complete array matches the corresponding candidate bytes, not just a prefix. They differ from Relay/Mayhem's separately measured1,449-byte arrays.

`closed-helpers.json` records actual caller length stores and passed registers for both banks: normal301/450, lower288/196, upper tuple counts40/44 with stride2 (80/88bytes). Check anchors independently confirm frame arguments, tuple stride2 and byte-sized lower loads. These are static extent/argument checks; no claim that every byte is read for one input or any instruction was executed.

The check's offset624 call reaches the complete40-byte unwrap_failed correspondence. The generic matcher excludes8-byte functions, leaving offsets664/704 as unresolved in that inventory. Explicit follow-up follows their actual8-byte thunks into complete200-byte slice panic implementations, whose actual call at192 reaches mapped panic_fmt. Each200-byte pattern has three global lookalikes, all preserved: actual thunk edges choose the reached windows; the bodies' constant/global data remains only prefix-recorded. This does not close the transitive panic/formatter graph or justify identifying all lookalikes as equivalent.

At all three check operands, full24-byte pointer/length/line/column-shaped records and pointed37-byte `library/core/src/unicode/printable.rs` paths are retained. Target/candidate decoded path and10:43/26:54 positions agree; raw descriptors differ in relocated pointers. No blanket descriptor ABI identity or transitive data closure is claimed.

## Inputs, provenance and limits

- `pump` captured payload: 10485715bytes, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Programdata suffix after45-byte loader header and both saved account hashes revalidated against capture receipt.
- `pump_amm` captured payload: 10485715bytes, SHA256 `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`. Programdata suffix after45-byte loader header and both saved account hashes revalidated against capture receipt.

All five retained recipes use the identical eleven-file frozen Fees16 source/lock map and successful source-unchanged receipts. The lock SHA256 is `7e895a83d26940404a7fc0769d7c7115e3a44bdca5aaf3cfda156b23f2bf13fc`; profile is lto=false, overflow-checks=true, codegen-units=1. The input binder rehashes actual source bytes, both stripped and unstripped artifacts, successful command receipts, saved toolchain provenance and capture receipts. Unstripped `.text` must equal stripped output before using symbol extents. v1.46.1 uses its already published supported-target adaptation; no adaptation or build is introduced here.

Version labels identify these measured recipes. Existing official asset/compiler integrity receipts are hash-bound, without newly downloading or rehashing compiler distributions. The copied printable source came from the existing v1.44 cache, SHA256 `7b3e63aa9934e241f512732941c643295cd17e61508e26f8e802f83b86a2f576`, equal to the earlier recorded v1.43 source hash. Full array/code matches identify the relevant data directly; no uniqueness of that source file to v1.44 or fresh distribution-authentication claim is made.

`helper-results.json.gz` retains all emitted selected Rust/LLVM library-named functions, positive/negative/ambiguous windows, callee checks and explicitly limited64-byte data prefixes. These include graph-dependent monomorphizations, so inventory counts are not source-recovery percentages or statistical confidence. `named-discriminators.json` extracts the requested named cases. The underlying method is copied verbatim in `reference-relay-matcher.py`; active changes parameterize the target and restrict retained recipes to the requested five.

The scanner masks only internal relative-call immediates and loader-relocated immediate fields in memory, requires identical relocation offsets/types/symbols, and retains raw equality separately. Entry and next-entry bounds come from direct calls, relocated code pointers and ELF entrypoints; they are inferred bounds rather than original target debug symbols. An unresolved or ambiguous call/data record remains visible. No executable is patched or emitted.

Run `python3 -B <packet>/verify.py` from any directory with this packet inside the retained repository layout. It rehashes all external inputs, recomputes both five-recipe scans, full arrays, argument anchors, explicit thunk chains and exact positive/negative assertions using Python's standard library. No compiler, flags/version/path experiment, network, VM, SDK execution, source/lock change, status mutation, commit or push occurred. All changes are confined to this untracked packet. An isolated copied packet also verifies with `PUMP_AMM_REPOSITORY_ROOT` naming the retained repository. A copied named-result mutation is rejected by the manifest gate. This environment option only locates static input files; it does not invoke a compiler or change a measured recipe.
