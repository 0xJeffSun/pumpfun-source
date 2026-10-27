# Remote Fees formatter experiment

This CI runner reconstructs the incomplete experiment in [PR #322](https://github.com/lalalune/pumpfun-source/pull/322) from the immutable source archives in [PR #304](https://github.com/lalalune/pumpfun-source/pull/304). It does not depend on the disconnected execution workspace.

It verifies the v1.44 SDK archive digest, checks the source archive manifest, audits the two local dependency additions, and runs normal locked offline Cargo builds. MIR inlining applies only to the small renderer crate. The first build discovers the actual main-object callback symbols and resolves them through hidden linker aliases. The second names those definitions directly and uses the default SDK linker, testing whether LLVM's knowledge of their bodies resolves Create's remaining differences.

Each build retains source/vendor hashes, logs, native artifacts, complete source inputs and independent instruction-window measurements. The reader checks prior signature multiplicities against the qualified [583-window Sweep artifact](https://github.com/lalalune/pumpfun-source/pull/301), rather than relying only on signature membership. If Create matches completely, the runner requires identical repeat artifacts and runs the 18 canonical runtime suites on that exact candidate.

Outputs are uploaded as the `fees-renderer-research` Actions artifact. A full normalized match alone does not establish data/reference/Source bindings, raw-match preservation, original build provenance, or whole ELF identity. This research workflow changes no maintained selection or progress table. Until a run completes, it provides a build recipe rather than new execution evidence.
