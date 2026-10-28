# Frozen 793-window macOS qualification

Workflow rebuilds the archived 793-window source with the actual Apple Silicon macOS SDK v1.44 and the pinned Linux SBF target libraries. It separately reproduces maintained Round37, repeats the candidate, verifies canonical Round37 ELF hashes, and replays the exact native artifact through the unchanged 44-suite runtime corpus plus separate 42 recipient cases. No source promotion or original-binary equality claim is made.

Status is pending execution. The primary source archive and toolchain hashes are pinned in inputs.json. GitHub-hosted jobs can continue without a local computer connection; that does not guarantee continued autonomous source-recovery work after an agent session ends.

Run: https://github.com/shawkkkkk/pumpfun-source/actions/runs/40619682069 ; frozen revision `5adb09b3ecb94682d89b15e5bff5064dd0761d8b`. Native and dependent runtime jobs are in progress; no result has yet been admitted.
