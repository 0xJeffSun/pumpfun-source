#!/bin/zsh
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int
cd $W
PKG_WORKTREE=$L/wt python3 -B harness/mkpkg.py --name r37-layout-15 --src base/L15/pump --base round37 \
  --title "Main Pump layout composite L15 (972/1035 with the original toolchain; includes SYNTHETIC Source-line positioning)" \
  --lanes $L/pkg/L15-lanes.json --readme-extra $L/pkg/L15-extra.md --control --extra-dir=tools=$L/pkg/L15-tools \
  --builder-arg=--target-library-profile --builder-arg=linux-v1.44-sbf --builder-arg=--target-library-directory \
  --builder-arg=$HOME/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib
