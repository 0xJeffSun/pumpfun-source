# Frozen 795-window macOS qualification

Workflow rebuilds the archived 795-window source with the actual Apple Silicon macOS SDK v1.44 and the pinned Linux SBF target libraries. It separately reproduces maintained Round37, repeats the candidate, verifies canonical Round37 ELF hashes, and replays the exact native artifact through the unchanged 44-suite runtime corpus plus separate 42 recipient cases. No source promotion or original-binary equality claim is made.

Status is pending execution. The primary source archive and toolchain hashes are pinned in inputs.json. GitHub-hosted jobs can continue without a local computer connection; that does not guarantee continued autonomous source-recovery work after an agent session ends.

The dependent replay additionally gates the separate 20-case legacy and 40-case migration-v2 post-completion quote probes. Their controls can overlap the unchanged corpus; counts are reported separately.

Native macOS qualification passed: 795 matches, all 744 baseline matches retained, identical candidate/repeat artifacts, both canonical Round37 hashes reproduced. Downloaded artifact ZIP digest and all 57 payload hashes independently verified. Runtime qualification remains in progress.
