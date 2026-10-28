# Fees residual scope, result layout, and formatter-location controls

Twenty-one normal SDK v1.44 builds test the remaining Crank/Create hypotheses. No complete residual body matches; whole ELF equality remains false. The independent verifier checks the retained qualified 583 signature multiplicities. No maintained source, checkpoint, or runtime evidence is changed.

Crank controls cover Rent error propagation, public account-info access and reload, inline/closure helper boundaries, and a generic event emitter. The first opcode-sequence divergence of the strongest prior candidate maps to Rent::get, not the subsequent CPI. Opcode-sequence agreement does not establish raw/register/stack agreement. Public AsRef and manually deserialized set_inner controls remove use of experimental APIs at those call sites, but do not establish original framework provenance or recover the handler. The existing experimental Anchor dependency is retained unchanged.

Create controls cover a shared public-API formatter, creator helper boundaries, temporary-result alignment and sharing return types. The original formatter panic Location decodes at address 821320 to /home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs, line 2559, column 14, matching the retained SDK implementation snippet. The canonical formatter control DELIBERATELY reconstructs that filename/line/column using a copied formatting body and compiler path remapping. It is not evidence that the historical main program contained this helper. This source-location experiment reduces the extra unwrap_failed direct-call multiplicity from one to zero, but the complete handler remains unequal. The initial absolute-only mapping does not match the compiler's relative source path and yields the same native artifacts as the local-path control. No SDK source, compiled object, or native output was patched.

Alignment changes remove or alter temporary copies but do not recover the body. Returning only the sharing creator removes a memcpy required by the original direct-callee multiset. Matching size, opcodes, block labels, callees, or location fields alone is not acceptance. No runtime results from another binary apply here.

| Control | Handler bytes | Instructions | Candidate windows |
| --- | ---: | ---: | ---: |
| crank583-boundary-closure | 15952 | 1947 | 586 |
| crank583-boundary-emitter-boundary | 15888 | 1939 | 586 |
| crank583-boundary-inline-helper | 15984 | 1951 | 586 |
| crank583-reload-public-as-ref | 15936 | 1945 | 586 |
| crank583-reload-public-manual-typed | 15912 | 1942 | 586 |
| crank583-rent-likely | 15904 | 1941 | 586 |
| crank583-rent-map | 15904 | 1941 | 586 |
| crank583-rent-match | 15904 | 1941 | 586 |
| crank583-rent-try | 15928 | 1944 | 586 |
| crank583-rent-unlikely | 15904 | 1941 | 586 |
| create583-creator-function | 13320 | 1583 | 585 |
| create583-pair-aligned-1 | 13880 | 1651 | 585 |
| create583-pair-aligned-2 | 13864 | 1649 | 585 |
| create583-pair-aligned-4 | 13880 | 1651 | 585 |
| create583-pair-aligned-8 | 13720 | 1631 | 585 |
| create583-pair-third-u64 | 13720 | 1631 | 585 |
| create583-sharing-creator-only | 13672 | 1625 | 585 |
| create583-sharing-creator-quote-reference | 13880 | 1651 | 585 |
| create583-stdlib-copy-canonical-source | 13880 | 1651 | 585 |
| create583-stdlib-copy-local-source | 13952 | 1657 | 585 |
| create583-stdlib-copy-shared-source | 13952 | 1657 | 585 |

Each native build retains complete source inputs, both native outputs, source/vendor/Anchor receipts, logs and link map. The manifest and verifier independently validate hashes, source archives against before-build inputs, unchanged dependencies, injective function counts, complete target equality and whole-file inequality. The block-comparison tool is a diagnostic that deliberately ignores registers and several operands; it is not an equivalence checker. Recorded scripts use their actual /workspace/fees-recovery paths. SDK v1.44 archive SHA-256: 6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9.

```sh
python3 -B research/fees-residual-scope-layout-20261027/verify.py
```

This packet closes the current experiments for handoff. Work moves to the maintained Pump Round37 checkpoint; Fees remains 583/585.
