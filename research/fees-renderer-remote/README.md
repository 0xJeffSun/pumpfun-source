# Remote Fees formatter experiment

This CI runner reconstructs the incomplete experiment in [PR #322](https://github.com/lalalune/pumpfun-source/pull/322) from the immutable source archives in [PR #304](https://github.com/lalalune/pumpfun-source/pull/304). It does not depend on the disconnected execution workspace.

It verifies the v1.44 SDK archive digest, checks the source archive manifest, audits the two local dependency additions, and runs normal locked offline Cargo builds. MIR inlining applies only to the small renderer crate. The first build discovers the actual main-object callback symbols and resolves them through hidden linker aliases. The second names those definitions directly and uses the default SDK linker, testing whether LLVM's knowledge of their bodies resolves Create's remaining differences.

Each build retains source/vendor hashes, logs, native artifacts, complete source inputs and independent instruction-window measurements. The reader checks prior signature multiplicities against the qualified [583-window Sweep artifact](https://github.com/lalalune/pumpfun-source/pull/301), rather than relying only on signature membership. If Create matches completely, the runner requires identical repeat artifacts and runs the 18 canonical runtime suites on that exact candidate.

Outputs are uploaded as the `fees-renderer-research` Actions artifact. A full normalized match alone does not establish data/reference/Source bindings, raw-match preservation, original build provenance, or whole ELF identity. This research workflow changes no maintained selection or progress table. The first remote run completed successfully; results follow.

## Executed reconstruction

[Run 40575128714](https://github.com/lalalune/pumpfun-source/actions/runs/40575128714/job/122439397675) independently rebuilt both callback arrangements with the verified official SDK. Both retained all 583 qualified signature multiplicities across 585 candidate windows. Create remained 13,880 bytes / 1,651 decoded instructions versus the original 13,800 bytes / 1,641 instructions. Its direct callee signature multiset matched, but its complete normalized body did not. Direct symbol names therefore did not resolve the gap.

The candidate readonly section was 21,075 bytes versus 21,079 original; its byte bag lacked four zero bytes. This does not qualify readonly ordering or reference bindings. No runtime results were produced because Create did not match. Whole ELF equality remains false; the maintained frontier remains unchanged.

[Source and native artifact](https://github.com/lalalune/pumpfun-source/actions/runs/40575128714/artifacts/12766033446): ZIP SHA-256 `b0c6412a62a3eb1e64c6cdc0c99c015d53c4ab0cd130b3d34634d8fa6df1a98b`, 1,484,178 bytes. This preserves the reconstructed experiment independently of the interrupted workspace. Actions retention is 30 days; this link is not permanent archival storage.

The next run tests eight local source controls around return/residual propagation, captured key operands, formatter references, and error-field evaluation. Every control is measured independently; none is accepted from instruction count alone.
