# Current Mayhem historical macro and direct-call closure

The exact current Q source compiles with the complete historical Anchor program macro and its historical CreateEvent IDL. The result preserves **432/441 normalized original windows** and all 100 prior raw-local windows, reaching **141 raw-local windows**. It adds no normalized original function. The same ordered direct-call relation now retains **422 original windows**, up from 414.

The newly direct-closed windows are O0207, O0208, O0210, O0214, O0215, O0217, O0219 and O0222. The 640-byte reserve helper really calls the matching 328-byte `finish_grow` at offset 528. A complete-body normalized match masks address operands; direct-call closure separately checks their actual targets recursively. This is a relation, not an injective assignment, and it does not prove indirect calls, arbitrary data pointers or semantic equivalence.

Two independent curve compilations produce the same archive. Two qualified root compilations produce identical complete artifacts:

| Output | SHA-256 |
| --- | --- |
| Stripped candidate | `2ef6328d429dfe2cc99fec477398db59f386d81cd379584d4a41e151b65d90a5` |
| Symbols | `9fcdc1bb9a43a80b938a7e501357f0693ad140ea67525804cfd2abe88b02f948` |
| Curve archive | `416f3c6e880676286269bc305b46d74a06e91692f6324ae4b3a88666ed097590` |

All 447 linked function windows remain, including repeated symbol names. Of 556 unique names, 555 retain their complete normalized body multisets; only the curve `finish_grow` changes from 312 to 328 bytes. All 567 name occurrences and their Source-profile multisets are checked. The prior positive immediate-call observations grow from 4,314 to 4,315; all 456 positive Rust Source records remain. The partial Legacy Buy (13,784-byte), Legacy Sell (13,008-byte), SellV2 (17,936-byte) and current BuyV2 (7,688-byte) handlers keep their prior bodies and Source profiles; these are not newly perfect reconstructions.

The curve archive retains 27 of its 28 old executable sections byte-for-byte; the allocator helper is the sole changed old section. Ten generated event-parser sections are added to the archive and discarded at final link. The compiler-emitted helper is independently bound to the linked helper with only direct-call relocations resolved. The existing Token-2022 helper remains present.

The 67-file source archive differs from the [current Q parent](../mayhem-quotes-current-recovery-20261027/README.md) in only two files: the curve macro invocation and its IDL. The complete macro and CreateEvent content come from the [previously verified historical context](../mayhem-historical-macro-current-20261027/README.md). No synthetic allocator probe, executable edit, padding, assembly or new matcher mask is used. Original binaries are comparison inputs only and are absent from the recorded compiler/linker inputs.

These are native Mac-host builds using the pinned Linux target libraries from the mixed v1.54 recipe. The host macro is reused, not recompiled here. The curve and root are recompiled over a warm dependency cache, not a fresh full dependency build. Recorded dependency/tool hashes are retained; after-build dependency observations are explicitly labeled and are not presented as before/after attestations. Captured commands and controllers retain their actual workspace paths and require the recorded inputs to rebuild. The saved-evidence verifier itself is portable within a repository containing the hash-bound external inputs listed in `external-inputs.json`.

## Verification

```sh
python3 -B research/mayhem-current-macro-call-closure-20261027/verify.py
python3 -B research/mayhem-current-macro-call-closure-20261027/test_verify.py
```

The verifier recomputes source scope, archive section changes, all 441 original-window comparisons, raw preservation, actual immediate edges, Source profiles, all 447 linked function occurrences, the direct-call fixed point and both linker-map extents. It authenticates every packet file, rejects nested unlisted manifests and symlinks, and never launches a compiler, VM, shell, Git or network request. The test suite includes static and runtime corruption controls. Corruption tests update the reported image hashes and reseal temporary copies when needed, so structural checks are exercised beyond file hashes. The verifier also checks the stripped and symbol images against each other for execution headers, program headers, and every allocated section, including data.

## Fresh bounded runtime

Independent saved-evidence verification passes **6,636 trade pairs / 13,272 signed records** across all 14 families, plus **69 initializer pairs / 168 signed records**. The total is **6,705 comparisons / 13,440 records**. There are no checked state, event, CPI, return-data or normalized trade-log differences; initializer logs also agree exactly. The initializer matrix includes ten original-Pump CPI successes. Counts refer to recorded observations, not unique signatures or exhaustive behavior.

The exact producer JSON is retained losslessly as XZ for trades and the original gzip for initializer reports. The verifier checks full case objects against frozen vectors, every signature, report and harness hashes, executable Mayhem identities on both sides, and the original Pump identity for initializer CPI cases. It does not run a VM or submit transactions. Earlier artifacts' executions are not reused as this candidate's runtime proof.

Full verification requires an existing Python environment with Solders 0.27.1. `--require-runtime` requires all retained signed checks; `--static-only` explicitly skips them and claims no runtime qualification.

Whole-original ELF equality, original complete source/toolchain identity, general data/vtable closure and arbitrary-state equivalence remain unproved. Raw 141, normalized 432 and direct-closed 422 are distinct measurements. `inventory.json` and `inventory.tsv` list every original window with its actual counterparts and the separate equality/call status.
