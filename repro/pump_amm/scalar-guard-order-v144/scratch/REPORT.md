# AMM scalar guard correction: single-build handoff

The approved one-file correction compiles and passes all **25 unchanged AMM suites / 17,462 comparisons**. Stricter checks on **191 existing scalar-fee rejection cases** now reproduce the original `Left: 1000` and supplied `Right` values, including 1001 and `u64::MAX`. No new case or handler was added. This is a demonstrated source-behavior correction, **not an exact compiler reconstruction**.

The candidate is **1,177,512 bytes**, SHA256 `a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f`. The original remains `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`; full-file equality is false. Main source, central status, maintained harnesses and published packages were untouched. No staging, commit, broadcast or deployment occurred.

## Source and build

`prebuild/` is the unchanged 65-file approved package, sealed by manifest SHA256 `082e7ed00f538ea2ba0967badd284912d2bf213ff88621be8a330b9427b21fac`. Its patch changes only `programs/pump-amm/src/lib.rs`: explicit unsigned scalar compared-value guards and immediate successful stores in original LP → protocol → recipients → creator order. Recipient logic is unchanged. The corrected source SHA256 is `3044e5c4e5184cdb1fb41503905e7369f23bacb441cdece612edd64bcf69aa91`. All 18 compiler inputs match the reviewed proposal and remained unchanged before/after the single clean build.

`build-attempt.json`, `build-comparison.json`, the complete build log, source snapshot, helpers and dependency-cache records retain the exact recipe. Compilation used pinned v1.44 with rustc SHA256 `1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a`. The unchanged installed SDK's separate strip phase selected v1.52 `llvm-objcopy`, SHA256 `12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be`. `toolchain-phases.json` distinguishes those phases. Cargo's retained `.rustc_info.json` identifies the actual compile sysroot; the final isolated rustup alias was relinked during stripping and must not be used as compilation evidence. No version, flag, source-path, inline-attribute, padding or binary variant was attempted.

Generated deployment keypairs were enumerated by filename only and excluded before reading or hashing. The target tree is not packaged. Actual source/build provenance is separate from the older checkout-source maps embedded by some unchanged test scripts; those maps remain labeled as checkout snapshots, not the compiled candidate source.

## Static result and residuals

Fresh symbols locate the wrapper at `0x98110` (2,296 bytes) and handler at `0xc2638` (6,096 bytes). The whole wrapper still matches the original after relocation normalization. The original handler is 2,912 bytes; the prior current handler was 5,832 bytes. **The handler remains unmatched and this change does not claim byte convergence.** No standalone 616-byte original scalar setter has a complete candidate match.

The three new scalar error paths call specialized `Error::with_values` at `0x340` (1,336 bytes). The complete body has four normalized instruction differences at offsets 24, 32, 40 and 48: the compiler places constant 1000 inside this helper and passes the supplied fee separately. All eight direct targets are checked independently. The original generic helper still has an unused complete counterpart at `0xdd0`; substituting that match for the actually called specialized helper would overstate fidelity.

`static-comparison.json` retains full handler/wrapper instruction windows and fresh direct-target findings, all three scalar match failures, five complete generic helper matches with 94 direct-call target checks, and exact bounded data. The instruction-log literal remains equal. Candidate source diagnostics truthfully use `src/lib.rs` (10 bytes), while the original uses its 44-byte historical state path and original lines. Full formatting/panic-table data equality and original source spelling remain unresolved. Historical coordinates are not imitated.

## Runtime and signatures

The existing 17,462 comparisons ran once against this exact candidate. An isolated observational runner verified each existing transaction cryptographically, recorded its signed bytes and loaded program hashes, then forwarded the same object without changing fixtures or instruction data. It rejects any attempted signature-verification disable. Maintained suite sources are byte-identical to the prior checkpoint.

There are **35,074 observed transactions / 35,418 verified signatures**: 34,924 comparison transactions plus **150 existing original-program `create_pool` fixture-setup transactions** in the boost suite. Those setup calls are not new comparisons or handler coverage. `receipt-bindings.json` maps every comparison to exact original/candidate transaction ordinals, source/build hashes and receipt hashes, and separately lists setup ordinals. The existing corpus includes unchanged historical signed migration messages with synthetic pre-account variations and historical blockhash freshness disabled as documented by those harnesses. Signed payloads were not altered. Ordinary fixtures use labeled test-owned signing identities; no private keys are stored in the sidecars.

`scalar-diagnostics.json` checks only cases already in the saved 356-case fee-config corpus, whose payloads/mutations remain identical. It adds comparison of scalar Left/Right logs to the existing error/state/event/rollback assertions. Exact source-coordinate/CU log equality is not claimed. Mixed-invalid recipient/creator precedence remains a static prediction and was not executed. No stopped Pump transfer-fee/incentive/v3/extension or Mayhem-initializer lane was resumed.

## Preserved diagnostics and verification

The single build succeeded. Two evidence-accounting mistakes are retained: the first phase audit incorrectly assumed the final rustup alias was the compiler, and the first runtime aggregator assumed exactly two transactions per case, overlooking existing boost setup calls. Both were corrected by read-only inspection of saved artifacts; there was no rebuild, suite rerun, source correction or extra fixture. Original orchestration scripts and failure logs remain intact.

Run `python3 verify.py` in this package using Python with `solders==0.27.1`. The verifier checks the seal, approved prebuild, all 18 compiled source inputs, helper/harness/runtime snapshots, whole candidate identity, complete bounded static evidence, every stored transaction signature and receipt binding, and 191 stricter scalar assertions. It does not compile, replay transactions, require Surfpool or contact a network. The frozen runtime extension/tool identities record the environment used; the verifier does not require a platform-identical executable to verify signed bytes.

No implemented count, comparison count or security/audit-completion claim changes here. Parent owns review and any future main promotion.

Dependency integrity was checked after compilation: all 254 locked registry archives match their recorded checksums; 5,567 source files in the observed compiler registry match exact public archive members. This postbuild check is not a prebuild observation or proof of the deployed historical graph. Preserved helper diagnostics record duplicate registry-directory and missing checksum-file assumptions; the final check compares archive members directly and identifies locked packages not extracted in that registry. A verifier-only variable-shadowing error during compressed-receipt support is also retained. None of these checks rebuilt or replayed the program.
