# Metaplex Utilize positive-guard candidate13: measured no improvement

**Candidate13 compiled successfully, then failed the required whole-payload comparison. Its complete output is byte-for-byte identical to rejected candidate12.** The explicit positive-guard spelling did not eliminate the extra unconditional jump. Candidate11 remains the accepted earlier candidate; this experiment supplies no basis to promote12 or13.

Only the single authorized pinned run [40190519595](https://github.com/lalalune/pumpfun-source/actions/runs/40190519595) was followed, at repository head `8435d7e576ca38e36c486038d7f26868992e818a`. No rerun, restart, additional source experiment, executable modification, VM transaction, deployment or candidate promotion occurred in this review.

## Hosted source/build evidence

The run is terminal `failure`; the distinction matters: source compilation completed, artifacts were emitted, and the build script intentionally exited1 because full byte equality was false. The saved `build13/build.log`, `comparison.json`, tool/image receipts, complete hosted job log and final run/job/artifact API records preserve both phases rather than reporting this as a setup/compiler failure.

The independent receipt verifier confirms:

- Public baseline `metaplex-foundation/mpl-token-metadata` commit `17e99434af5ead3e989c08f32af33609821d0bc0`.
- All18 changed source files match the expected manifest from pinned repository head8435d7e5. The17 files outside Utilize retain the prior hashes; no extra tracked file or lockfile changed.
- Exact proposed patch SHA-256 `c6256bf2977b5e9780ea499fb8cf198d4f63e468ade315d7075b2aa6da037f69`. Patched Utilize source SHA-256 `dfcfdabd16a2aba63ea76c9b25b096067c433454ec6908a299f56b1a6657aad5`.
- Same Linux/amd64 image `solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467` and exact locked source-build command as earlier candidates.
- Host Rust1.69.0 remains distinct from selected SBF platform-tools v1.37 / rustc1.68.0-dev / LLVM15.0.7. The selected compiler SHA-256 is `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`.
- Source manifest and build log hashes match the final comparison receipt, and the emitted payload is exactly the raw compiled output plus the disclosed zero allocation tail. Captured binary bytes were read only after compilation by the original builder; no captured binary was mounted as a compiler input.

`expected-source-inputs.json`, `expected-source.patch`, `pinned-build-script.py` and `pinned-workflow.yml` are captured from the exact dispatched head. `verify_receipts.py` checks source, patch, command, image, compiler and output receipts independently of the hosted job's status label.

## Four-artifact result

| Artifact | Raw compiled ELF bytes | Raw SHA-256 | Differing padded payload positions |
|---|---:|---|---:|
| Captured allocation |793,991|`31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`|0|
| Candidate11 |707,448|`3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec`|1,509|
| Candidate12 |707,448|`4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf`|196,601|
| Candidate13 |707,448|`4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf`|196,601|

Candidate12 and13 raw files are directly compared equal; this is actual full-file identity **between those two candidates**, not address-mapped equality. Their padded payload hash is also identical: `de3ebb1dd993e3aa80ec143e37bb7fa3ac0a197976ac26b555c322c0d0d5670f`. They differ from target starting at file offset24. The existing86,543-byte retained zero tail is kept explicit; it is not mistaken for unrecovered code.

The new source spelling changes source hashes but produces exactly the same generated executable. The compiler therefore canonicalizes both tested source forms to the same outcome under this pinned recipe. This negative result is stronger than a predicted CFG simplification and closes this **single** proposed experiment; it is not evidence that arbitrary alternate source/profile versions would behave identically.

## Complete body, calls, relocations and data outcome

Offsets are file byte offsets. Target and candidate11 Utilize windows are `[236632,241736)`,5,104 bytes,626 instructions,51 direct calls and91 branches. Candidate12 and13 windows are `[236632,241744)`,5,112 bytes,627 instructions,51 direct calls and92 branches.

Candidate13's complete Utilize body SHA-256 is `47d1a9032aabbfb551fa930a84a1b7e40ae1f28f632828c2fc3827dec477fe3b`, identical to12. Target body SHA-256 is `0b57c8b38b3b6395fe223e99d29c48258f481d496491cb13b7abe065a49fb70d`.

The same independent mapping method used for12 is freshly recomputed on13:

- Target at238832: `3d97070000000000`, unsigned `r7 >= r9` branches to238896 success.
- Candidate13 at238832: `2d79010000000000`, unsigned `r9 > r7` branches to238848 error.
- Candidate13 has extra `0500070000000000` at238840, unconditional jump to238904 success.

The target's positive edge and candidate's negative edge plus jump choose corresponding success/error paths. Every other instruction across the entire `.text` corresponds after the measured8-byte insertion and the resulting explicit branch/call/relocated-text-pointer address updates. No executable is rewritten by this analysis. The jump remains a real generated instruction, affects layout and possible compute cost, and prevents exact target-byte identity.

All2,749 relocation records correspond under this address map; all132 changed `.data.rel.ro` pointer slots map; all1,251 inferred function entries and the ELF entrypoint map. The residual30 diagnostic coordinate bytes are unchanged from11 and12. Raw `.rodata` remains identical, while the shifted instruction stream, relative calls, relocation locations, function pointer values, symbols and headers explain the large raw difference count. Mapped correspondence is **not** reported as raw identity or authentic historical source.

`complete-body-decode.json` contains full target/11/12/13 instruction records and operand-derived branch targets. `four-artifact-result.json` preserves raw body, section, call and relocation results. `mapped-result.json` and `mapped-body-decode.json` retain the separate full-text insertion analysis; it does not replace the raw comparison gate.

## Source hypothesis and acceptance conclusion

The proposal preserved the earlier zero/total guard and expressed remaining-use subtraction with an explicit positive `if remaining >= requested`. Its all-u64 local guard/subtraction equivalence proof remains valid and hash-bound here. A source-level equivalence proof did not predict compiler byte layout: the pinned build produced12's exact binary again.

No accepted source, artifact, default, status or CI acceptance gate was changed by this review. Candidate13 should be retained as a rejected/no-improvement experiment with its source and receipts. Candidate11's1,509 raw differences, including the30 diagnostic-coordinate bytes, remain the earlier accepted residual. Full target identity is still false. Any next action requires independently justified evidence; this review did not launch another spelling/profile/compiler experiment.

## Portable verification

Run `python <publication-folder>/verify.py`. Python's standard library suffices. The verifier checks manifest/external hashes, exact dispatched head, terminal hosted status and completed-build receipts; confirms the pinned source patch, image and compiler; directly compares12/13 complete output bytes; recomputes all four complete body decodes and the full-text/call/relocation/data mapping; and checks the unchanged30-byte coordinate residual. No build, runtime execution or network access is required. Existing target/11/12 files are read through hash-bound repository paths in `external-inputs.json`.
