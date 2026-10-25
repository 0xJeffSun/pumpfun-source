# Mayhem non-initializer source-gap continuation

The selected mismatch is **Burn, C0094 ↔ O0071**. No authentic natural source correction is established, so `source_patch` is **null**. A new bounded finding explains a previously unseparated part of the mismatch: the original burn body's two early error paths include a shared **Display-formatting failure panic**, whereas the candidate calls a specialized message-construction helper that writes the two error strings directly. This is evidence of different emitted formatting structure, not proof that the recovered application source is wrong.

No source, build, runtime, fixture, transaction, compiler setting or main-repository artifact was changed. All new files are inside this assigned directory. The initializer and every other excluded lane remain opaque. Copying/hashing sealed predecessor files does not authorize or constitute semantic inspection of opaque contents.

## Exact input and acceptance boundary

The inherited layer binds the captured original `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` (777,408 bytes), accepted candidate `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b` (667,552 bytes), symbol ELF and fourteen candidate source/build hashes at frozen `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. Candidate `.text` equals the retained symbol `.text`. The original remains different: 361,719 common-prefix positional differences and a 109,856-byte original excess tail, totaling 471,575 positions including excess bytes.

Current `docs/COMPLETION.md` is bound separately under `policy/`. It retains 140/150 bounded implementations and 0/4 whole-original ELF matches. No accepted count changes. The 40 raw-equal candidate bodies and 172 normalized candidate bodies are inherited bounded results, not whole-file or transitive equality. Existing finite receipts remain unchanged; this study creates no additional comparison case.

`input-map.json` explicitly lists every copied input and its original public repository path, byte size and SHA-256. The five-field review's exact 275-file package, including its manifest, is retained under `prior/`; its corrected-crosswalk and layer-01 predecessors retain their original seals. Current completion policy is input 276. Nothing is collected from CLI logs, telemetry, caches or keypairs. `ownedmap.json` covers every delivered file, including the manifest; the manifest seals every other file. It cannot self-hash. Its external hash and actual separate-copy results are in the adjacent `verification.json`.

## Complete inventory and selection rationale

`selection-ledger.json/inventory` gives a disposition to all **409 candidate** and **441 original** rows. No unmatched row or ambiguous alternative is removed. The exact complete predecessor ledger remains at `prior/prior/layer01/residual-ledger.json`, including its original bounds, prior rows, call/data records, normalization rules, alternatives, coverage gaps, relocations and full-file mismatch ranges.

| Candidate selection class | Rows | Decision |
|---|---:|---|
| Explicitly attributed unmatched application bodies | 7 | Highest original-identity confidence; ranked by smaller candidate body to bound this review |
| Other unmatched source-owned rows | 88 | No full explicit original counterpart in this ledger; not promoted from symbol name alone |
| Unmatched dependency/helper rows | 131 | Historical identity and lowering provenance unresolved |
| Rows with normalized alternatives | 172 | Preserve all alternatives; no new concrete source defect implied |
| Opaque rows | 11 | Excluded metadata only |

The original side preserves **184 admitted** and **257 opaque** full rows. No new original whole-body admission is made. Original row bounds are inferred windows, not recovered historical function boundaries. A direct edge into an opaque target is recorded numerically and not followed.

The seven explicit candidates rank as follows. Smaller size is a review-cost tie-breaker after demonstrated identity, not a claim of greater semantic similarity.

| Rank | Candidate | Handler | Candidate bytes | Original bytes |
|---|---|---|---:|---:|
| 1 | C0094 | Burn | 6,016 | 5,752 |
| 2 | C0095 | Legacy sell | 9,504 | 12,992 |
| 3 | C0096 | Legacy buy | 10,792 | 13,848 |
| 4 | C0097 | Mayhem sell_v2 | 12,064 | 18,096 |
| 5 | C0098 | Mayhem buy_v2 | 13,136 | 18,648 |
| 6 | C0104 | PumpSwap sell | 13,648 | 17,312 |
| 7 | C0103 | PumpSwap buy | 16,856 | 9,736 |

Only Burn receives new body investigation. Other explicit rows are inventory metadata, not resumed trading work. The five unknown GlobalParams roles remain unchanged and are not renamed or re-surveyed. The corrected `field_8`/`field_89` crosswalk stays under its existing seal. Prior withdrawal ABI, macro and serializer results are preserved and verified as dependencies; they are not presented as new findings.

## Burn body, calls and limits

Candidate Burn occupies `[63776,69792)` and original Burn `[55448,61200)`. Both raw and normalized equality are false. Their body-relative overlap has 2,978 raw differing positions; the candidate's additional 264 bytes make 3,242 differences including the excess. Neither the size difference nor positional differences identify a missing check.

The selected machine ledger retains **all** 28 candidate and 26 original direct edges, one external abort edge on each side, no direct-body indirect calls, and 18 candidate/25 original relocated data references. Eight original direct edges land in opaque rows. Every selected direct target is re-derived with signed `PC + 8 + immediate * 8`. Candidate symbol names are joined only to their own actual targets; no original symbols are invented. All original target-pattern ambiguities remain in the inherited ledger.

Three Clock calls on each side remain identifiable: original `0xd8c0`, `0xe1f0`, `0xe608`; candidate `0xf950`, `0xffb8`, `0x103f8`. These do not explain the additional original panic call. The source explicitly reads Clock for the deadline and each event. This study does not collapse those reads or propose removing an event allocation.

The candidate burn helper call at `0xfee0` targets `495576`, whose symbol is the Token-2022 burn helper. The original call at `0xe120` targets `592832`, still opaque in this admission set. They must not be declared equivalent from the surrounding handler or from the common semantic purpose. Event invocation and ProgramError conversion also retain opaque original targets. No CPI payload, token-program policy, allocation failure or borrow-lifetime equivalence is newly proved.

## New formatting witness

Original callsites `0xd990` and `0xdaf0` both target **`0x2fdd8`**. Their immediately following `jne r0,0` branches at `0xd998` and `0xdaf8` both reach **`0xee00`**. The target body remains opaque; the caller's argument setup and result test are inside admitted Burn.

At the shared failure block, the original passes a pointer to `[708633,708688)` and length **55**, then calls `674280` at `0xee48`. The bounded message is:

> a Display implementation returned an error unexpectedly

The established candidate pattern correspondence for target 674280 is `core::result::unwrap_failed`; that correspondence is not transitive implementation equality. The shared block is distinct from the three Clock-result unwrap blocks at `0xedf8`, `0xeea8` and `0xef08`.

The failure call passes a location descriptor at `[725640,725664)`. Its pointer field has an actual type-8 relocation. Following the retained captured-ELF convention (pointer in the upper 32-bit word) gives path extent `[707880,707965)`, length 85, line **2830**, column **14**. The exact bytes name `/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs` with a trailing NUL in the recorded extent. This is a genuine saved diagnostic witness, not a proposed file location or an inference of build-host identity. Direct host-u64 interpretation was invalid; the exploration correction is recorded in `check-history.json`.

Candidate callsites `0x107a0` and `0x109a8` target **42160**, `alloc::string::SpecToString::spec_to_string`, and pass enum values **5** and **4**, respectively. The complete candidate helper `[42160,42584)` is already admitted, has no normalized original counterpart, and contains two direct calls to **50304**, `RawVecInner::reserve::do_reserve_and_handle`.

The helper tests value 4 and requests capacity for **17** or **21** bytes. The actual instruction immediates and destination stores reconstruct exactly `Mayhem mode ended` and `Mayhem mode not ended`. Its direct body has no indirect call, external call or relocated data load; the strings come from immediate stores. The reserve calls remain potentially allocating operations. This does **not** prove allocation-free behavior, successful allocation, the same heap traffic, or the absence of panics in the reserve helper.

The earlier sealed ABI report already recorded `alloc/src/string.rs:2830:14` for the general Anchor error constructor and identified the installed source's Display-to-string `.expect(...)`. That diagnostic and source-family observation are **not new** here. This continuation newly binds Burn's two caller result branches, their shared failure block and its bounded message, and compares the actual specialized BurnError message helper. It does not repeat the general constructor ABI analysis or claim that the installed source is authenticated historical program source.

These strings match the two public `#[msg]` declarations in the bound candidate `instructions/burn.rs`, with enum values 4/5. The original shared panic message and caller result branches establish generic formatting-failure structure in that body, while the candidate helper establishes direct literal construction. A compiler may specialize an infallible Display implementation without preserving a formatting-error branch. The evidence does not decide whether historical source spelling, dependency implementation or compiler optimization caused the difference.

## Source decision and falsifiable missing artifact

**No Rust patch is supplied.** Adding `expect`, replacing `require!`, constructing an artificial formatting failure, moving source lines, changing enum layout or hand-writing allocations solely to imitate these instructions would not recover authentic source. Removing candidate reserve calls or changing account clones/borrows is equally unsupported.

`missing-artifact.json` specifies the next admissible evidence: authenticated historical **non-initializer** Burn error Display/to_string source and dependency/lowering records tied to original ELF `a87fa9f8…`, the two identified caller PCs and the observed message/location object. The artifact must explain whether equivalent source was specialized differently or an actual source expression differs. A generic crate version suggestion, guessed path or newly tuned build does not satisfy it.

This requirement is falsifiable. If authenticated original definitions and the call expression equal the candidate's source, the application-source hypothesis is rejected and the mismatch stays in lowering/provenance. If a different expression is demonstrated, a minimal patch can be proposed for separately authorized validation; no byte improvement is claimed in advance. Any future admission of the original target's body must establish non-initializer ownership first. This report itself does not authorize decoding that opaque row.

## Verification

Run `python3 -B verify.py` from any copy of `publication/` with Python 3.11+ standard library. The verifier checks exact file set, symlinks, ownership, input hashes, all new instruction/data assertions, deterministic inventory regeneration and the entire unchanged predecessor verifier chain. It needs no repository, network, compiler or target runtime. It does not write sealed output. `analyze.py` writes JSON only to stdout when invoked explicitly.

The adjacent `verification.json` records actual execution from a separate directory copy, the publication-manifest digest and deliberate tamper checks. A passing result certifies these static assertions and package integrity, not historical source authenticity, security acceptance, unlimited behavior or whole-file identity. Prior seals, errors and the 26 retained finite diagnostic differences remain unchanged.
