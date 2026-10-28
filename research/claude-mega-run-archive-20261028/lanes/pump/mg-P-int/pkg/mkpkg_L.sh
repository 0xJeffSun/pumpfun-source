#!/bin/zsh
# mkpkg_L.sh <Lname e.g. L16> <title-count e.g. 974>  -- package base/<L> as r37-layout-<NN> in the lane worktree (no dependency cache: nested crate)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; N=$1; NN=${N#L}; C=$2
cd $W
PKG_WORKTREE=$L/wt python3 -B harness/mkpkg.py --name r37-layout-$NN --src base/$N/pump --base round37 \
  --title "Main Pump layout composite $N ($C/1035 in archived build; includes synthetic Source-line positioning)" \
  --lanes $L/pkg/$N-lanes.json --readme-extra $L/pkg/$N-extra.md --control --extra-dir=tools=$L/pkg/$N-tools --extra-dir=identity-run=$L/pkg/$N-identity \
  --builder-arg=--target-library-profile --builder-arg=linux-v1.44-sbf --builder-arg=--target-library-directory \
  --builder-arg=$HOME/.cache/solana/v1.44-linux-probe/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib
