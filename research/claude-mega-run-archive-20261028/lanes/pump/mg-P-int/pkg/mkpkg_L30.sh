#!/bin/zsh
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; SBPF=$W/toolchains/hybrid144/rust/lib/rustlib/sbpf-solana-solana/lib
cd $W
PKG_WORKTREE=$L/wt python3 -B harness/mkpkg.py --name r37-layout-30 --src base/L30/pump --base round37 \
  --title "Main Pump layout composite L30 (989/1035 source-only, 204 raw with the generated link order; includes synthetic Source-line positioning)" \
  --lanes $L/pkg/L30-lanes.json --readme-extra $L/pkg/L30-extra.md --control --extra-dir=tools=$L/pkg/L30-tools --extra-dir=layout-run=$L/pkg/L30-layout \
  --builder-arg=--target-library-profile --builder-arg=linux-v1.44-sbpf --builder-arg=--target-library-directory --builder-arg=$SBPF
