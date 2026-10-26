# Controlled Mayhem v1.53 compiler measurement

The previously unmeasured stock platform-toolsv1.53 release builds the same frozen accepted24-handler Mayhem source and lock using its supported genericV0 target. Its complete-helper matches are stronger than the retainedv1.52 baseline: Unicode and six hexadecimal formatter bodies now match the captured target under the stated relocation/call analysis. Several decimal, hashbrown and multiply bodies remain negative. **This closes one missing measurement; it does not identify a unique historical compiler, achieve whole-file identity or promote a candidate.** No source/lock/feature declaration, main/status/contract or global toolchain alias was changed. No target execution, VM, initializer, incentive or stopped-lane probe occurred.

## Official release integrity and target setup

The [officialv1.53 Darwinarm64 asset](https://github.com/anza-xyz/platform-tools/releases/tag/v1.53) is415,717,928bytes, SHA256 `239bc517f47320dd1b0a0d35511ca4b66f71679c79a0a6baf978c3b8389ad23b`, matching the saved official publisher digest. The complete archive was reacquired into scratch.38 selected cached compiler/Cargo/runtime dynamic-library/linker/backend/V0sysroot files were compared bytewise to its archive members; their hashes are retained. The415MB archive, installed toolchain and build/cache directories are excluded from this small packet. This is a selected executable/sysroot closure, not a claim that every other cached distribution file was compared.

The prior retained Mayhem sweep had failedv1.53 because the old build driver requests `sbf-solana-solana` while the release ships `sbpf-solana-solana`. Its summary is retained as historical evidence; its size/provenance conclusions are not adopted. A fresh minimal no_std legacy-name compilation likewise failedE0463 missingcore. That is a setup failure, not exclusion of this compiler family. It was not a frozen Mayhem program build.

Before adapting the invocation, immutable primary Rust sources were acquired for [v1.52 Rust790f153](https://github.com/anza-xyz/rust/tree/790f1537507dbdb0da320fbb3b1c1eca3b33c474) and [v1.53 Rust7a87f93](https://github.com/anza-xyz/rust/tree/7a87f939d96c478029873d3d43f3a4372f484c42). Both legacy and supported alias source files select `sbf_target("v0")`. The actualv1.53 rustc JSON target specifications for those aliases are exactly equal; CPU is generic. V0 linker-script strings are raw-identical between the releases. A stock backend generic sanity object has machine263/flags0. The recorded adaptation uses the selected official Cargo/rustc directly with `sbpf-solana-solana`, bypassing global rustup aliases.

There is a material stock release difference: v1.52's V0 target defaults include `+store-imm,+jmp-ext`; v1.53's V0 feature string is empty. The V3 linker script also changes, but is not selected. These release-defined differences are recorded explicitly and were **not overridden**. Thus alias equivalence is proved withinv1.53; the complete target specifications are not falsely called identical across releases. This experiment measures the stock distribution/target, not a hypothetical frontend-only change.

## Frozen inputs and one successful build

All14 Rust/Cargo inputs are byte-identical to the accepted Mayhem build receipt, including Cargo.lock SHA256 `03c991d636c42f72dda4e72e7aa5344ae8cba80aff672ec601d7176e596049b3`. The crate copy, registry cache, target directory and RUSTUP_HOME are isolated. The53-file observed baseline SDK map is checked; direct Cargo does not run the old driver's installer, alias mutation or post-build syscall check. The invocation retains default source features, release opt-level3, abort panic, overflow checks, noLTO, one codegen unit, locked/offline resolution and the recorded cwd-remap flag. It introduces no CLI CPU/feature override. The existingv1.52 postcompile strip executable is held constant and hash-bound.

The only frozen program build succeeded, returncode0,13.75seconds, with all inputs unchanged. Its verbose log retains actual host/target rustc commands. All142 registry source roots positively observed in those commands were checked against authentic crate archives whose SHA256 equals the frozen lock checksum:3,392 files match bytewise, with no extra source files except Cargo extraction markers. No dependencies were installed, updated or reselected from the network. Registry and host/compiler graphs remain distinct.

The stripped candidate is650,544bytes, SHA256 `ce6196743f747bb4710045cc90dd4dd96a458118fef6661e49fff64c3964ecc1`. The captured allocation is777,408bytes, SHA256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. Whole-file equality is false; first difference24. Those size/header statistics do not identify a compiler or quantify missing source. The isolated crate/cache paths and supported target name are additional explicit recipe inputs; different diagnostic/path data are not silently relabeled as compiler-only causes.

## Complete entry-bounded helper comparison

`match_helpers.py` uses the publishedv1.46.1 full-function method against the same original and both candidates. It verifies stripped/unstripped text identity, takes candidate function extents from symbols and target entries from calls/relocated code pointers, and requires the next inferred target entry to equal each matched window end. Normalization exists only in memory: mask relative internal-call destinations and loader-relocated immediate fields; retain every other byte, relocation offset/type/symbol and raw equality separately. Unique entry matches supply a further mapped-callee constraint. Ambiguous matches remain listed, and unresolved callees are not invented as matched.

| Complete helper | v1.52 | v1.53 |
| --- | --- | --- |
| core::fmt::write |1000bytes, raw-exact at original678096|same1000bytes, raw-exact|
| Unicode is_printable |816bytes, no complete match|768bytes, entry-bounded match at690080|
| Unicode check |648bytes, entry-bounded match at689432|same648bytes, entry-bounded match|
| Six hexadecimal formatters for u8/u32/usize |296/304/288bytes, no complete matches|280/288/264bytes, six entry-bounded matches|
| panic_fmt / panic_bounds_check |48/200bytes, matches after allowed masking|same sizes and matches; shared controls|
| Decimal internal u32 formatter |856bytes, no complete match|848bytes, no complete match|
| Decimal internal u64 formatter |688bytes, no complete match|688bytes, no complete match|
| hashbrown reserve_rehash |4360bytes, no complete match|4304bytes, no complete match|
| __multi3 |352bytes, no complete match|352bytes, no complete match|

“No complete match” means the entire named candidate body has no instruction/relocation-pattern match anywhere in captured text under this method. It does not falsely identify a nearest target body, prove source absence or exclude every other profile/LTO/custom-sysroot recipe.

Both scans include118 selected core/alloc/std/hashbrown/builtins functions. v1.52 has65 entry-bounded/call-consistent matches,11 entry-bounded raw-exact matches and32 unique entry matches. v1.53 has82,13 and49 respectively. These are descriptive counts over selected functions, with ambiguities and unresolved edges retained, not source-recovery percentages or statistical confidence. Equal body patterns after masked pointers alone do not establish complete data/behavior identity.

## Data evidence and limits

Every matched helper includes actual LDDW and loader-relocation records, referenced section and bounded64-byte data prefixes. Most such prefix comparisons are unequal and their object extents remain explicitly unproved; allocator/panic/location descriptors, vtables and recursive data closure are not asserted equivalent.

The principal Unicode positive was checked more strongly. Its six actual pointers resolve to all six arrays in the immutable Rust printable source: NORMAL0(297), SINGLETONS0U(80), SINGLETONS0L(290), NORMAL1(486), SINGLETONS1U(88), SINGLETONS1L(208). **All1,449 bytes match raw between original, v1.53 candidate and those authentic arrays.** Its call at helper offset256 maps to the same complete648-byte check helper. `unicode-data-proof.json` retains every extent/address/hash and source receipt. This supplies a concrete code-plus-consumed-table discriminator instead of relying on version strings or section sizes. It does not close every panic/drop/formatter edge inside the callee or authenticate a unique historical build.

The evidence makesv1.53 a stronger measured stock candidate thanv1.52 for the selected discriminators. Original application source, historical dependency/macro/module organization, compiler/sysroot lineage, complete transitive data/call closure and original whole-file identity remain unresolved. The acceptedv1.52 artifact and public status are unchanged. No second build or broad compiler sweep was performed.

## Verification

Run `python3 -B verify.py` within a repository copy retaining the hash-bound original andv1.52 baseline paths. The standard-library-only verifier checks the complete packet, frozen inputs, archive publisher digest receipt, alias/primary-linker equivalence, build/strip receipts, compiled-dependency checks, fresh artifact hashes, full-helper recomputation and all six original/candidate/source arrays. It requires no toolchain, archive, Cargo cache, network, solver or VM, and writes nothing.

`build_once.py` records the historical controlled invocation, not a turnkey installer. Scratch preparation failures (an omitted emptyfeatures JSON key and an incorrect assumption about vendor-style source-checksum files) are retained with their resolutions; neither triggered another program build. The legacy setup failure is separately preserved. Do not treat a passing evidence verifier as full runtime acceptance, historical compiler identification or permission to replace an accepted artifact.
