# AMM accumulator ordering: accepted main rebuild

The root-owned main build completed with exit zero. Its complete executable and symbol ELF are byte-identical to the independently tested [accumulator-order candidate](../accumulator-order-v144/README.md). The executable is 1,199,072 bytes, SHA-256 `8ce5f9588bdf7ca3d357a542518ad47aa1376fd8f3d242c37f18f55cef766a0e`; symbol SHA-256 is `0c301087d7531271589e192c0e2db01dc3a9d5d08643fde80ddd3bcddf10e92a`.

The source changes only the accumulator user-field assignment order: it follows successful Clock retrieval. All 22 compiled source inputs, the README, build helpers, tools, SDK and locked dependency witnesses are bound in this package. The unchanged tested corpus contributes 17,462 comparisons and 35,418 verified signatures. Exact executable equality supports reuse of that evidence; no additional main runtime execution is claimed. The original program still differs.

Run `python3 -B verify.py` from a copied package to check the portable main acceptance. Add `--current-main /path/to/repo` to check the live 22 inputs, README and helpers. The verifier checks complete executable/symbol equality, source and comparison manifests, zero build/dependency/outer-runner exits, tool/SDK observations and retained dependency witnesses. The full saved-signature and complete-inventory verifier remains in the tested package. Both are checked by the layered-pass verifier.

The frozen template's original README is preserved as `template-README.md`; `template-manifest.json` describes that pre-population template and its README hash maps to this preserved file. This package's current `manifest.json` is the authoritative populated payload seal. `status-proposal.json` records the metadata proposal used by the root integration. The template's procedure is historical; this package is already populated and accepted.

Successful reproduction of this candidate does not establish historical source, toolchain provenance, full semantic equivalence, exhaustive security coverage or whole-original byte equality. The [pass09 remaining-work report](../../layered-passes/pass-09/REMAINING.md) preserves those gaps.
