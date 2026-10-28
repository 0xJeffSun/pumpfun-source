# Frozen 798-window macOS qualification

Workflow rebuilds the archived 798-window source with the actual Apple Silicon macOS SDK v1.44 and the pinned Linux SBF target libraries. It separately reproduces maintained Round37, repeats the candidate, verifies canonical Round37 ELF hashes, and replays the exact native artifact through the unchanged 44-suite runtime corpus plus separate 42 recipient cases. No source promotion or original-binary equality claim is made.

Status is pending execution. The primary source archive and toolchain hashes are pinned in inputs.json. GitHub-hosted jobs can continue without a local computer connection; that does not guarantee continued autonomous source-recovery work after an agent session ends.

The dependent replay additionally gates the separate 20-case legacy and 40-case migration-v2 post-completion quote probes. Their controls can overlap the unchanged corpus; counts are reported separately.

Dispatched run: https://github.com/shawkkkkk/pumpfun-source/actions/runs/40624066569 at frozen revision `8857de1b7f0564d6223557ae731a5f0ea26a836d`. It is queued behind the existing 795 qualification; no native or full-runtime result is yet admitted.
