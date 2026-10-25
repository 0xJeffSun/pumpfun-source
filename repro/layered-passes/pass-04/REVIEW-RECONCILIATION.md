# Reconciliation of the independent reconstruction review

Commit `347aec7b953a49ad21aa481e29174ec8a2215029` added an independent review without changing the accepted source. This pass preserves that package exactly. Its build and differential records refer to earlier candidates; its narrative is not the current completion ledger.

The [input comparison](independent-review-reconciliation.json) hashes each recorded source input against the current tree and retains each original build comparison. Pump has four changed inputs, AMM one, and Fees four. Mayhem's fourteen inputs still agree. The current candidates are:

| Program | Independent build record | Current accepted candidate |
| --- | --- | --- |
| Pump | `5c1c1c2d…` | `2aa18c73…` |
| AMM | `d27be7e9…` | `2a8a69f1…` |
| Fees | `8f89dbeb…` | `8ff12f9c…` |
| Mayhem | `9e4e19df…` | `9e4e19df…` |

The AMM destination-rent correction and Fees legacy admission corrections were already integrated in `0cbb40c702d662922573bf9382cd4e05d0e9aa6b`. Their preserved regressions belong to those new candidate hashes. Earlier failing receipts remain useful evidence of the old defects; they do not establish that the defects persist in the current binaries. Likewise, historical successful build reproduction is not reproduction of a later candidate.

The current accepted corpus has **53,787 saved comparisons** (Pump 9,269; AMM 17,462; Fees 17,461; Mayhem 9,595), plus the separately recorded Pump Surfpool corpus. Counts are bounded validation, not whole-program equivalence. The complete fresh [byte comparison](before-corrections/summary.json) still finds **0/4 exact core programs and 2/5 exact dependency capture comparisons**. Raw compiler outputs and retained allocation images remain separate.

The independent dependency review proposes a Metaplex guard removal. That is an unbuilt source hypothesis. An instruction multiset or common callee list cannot establish control-flow, allocation, diagnostic or whole-binary identity. Its prediction of an exact number of bytes repaired requires an actual reviewed build and comparison.

The [new independent reconciliation](dependency-claims/REPORT.md) verifies a stronger local result: all 580 non-unconditional-jump Utilize instructions correspond in control flow after following jumps and reversing one complementary comparison, including actual direct-call targets. Referenced diagnostic data still differ. This does not identify the historical source spelling or establish that the proposed edit would improve raw bytes; no new source correction or build is selected.

The same review disproves the ATA attribution: the actual `custom_panic` extent contains **zero** differing bytes. Two moved helper bodies, four callers and three relocation bytes account for the differences. Captured Solana 1.10.33 SDK source already selects bpf-tools v1.27, so those version names do not establish a toolchain mismatch. Metaplex's recorded target compiler is 1.68.0-dev; 1.69.0 is its host compiler. These corrections preserve both historical reports and all failed candidate artifacts.

The historical build recipes remain unresolved. That uncertainty does not erase the known source gaps or establish that every remaining mismatch is a compiler issue. This pass continues source recovery from the captured evidence. No compiler search, synthetic source coordinates, binary patch or padding is used to force equality.

The objective here remains faithful reconstruction and complete byte comparison. Local dispatch or a finite integration corpus does not certify all SDK flows, all token modes, economic behavior or security. The independent package's broader readiness language is not adopted as an acceptance claim. Previously stopped scopes remain excluded, and the security assessment remains incomplete.
