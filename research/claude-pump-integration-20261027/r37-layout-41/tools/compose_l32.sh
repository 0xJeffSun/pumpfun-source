#!/bin/zsh
# L32 = L31 + the two merged log-parity source corrections (line-neutral msg! notices on existing zero-amount exits).
# l32-inputs/*.patch are the source.patch files of research/pump-l30-fee-sweep-log-parity-20261028 (#460) and
# research/pump-l24-cashback-log-parity-20261028 as published on origin/main.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump
rm -rf $L/l32/pump; cp -c -R $W/base/L31/pump $L/l32/pump; cd $L/l32/pump
patch -p3 < $L/l32/inputs/pump-l30-fee-sweep-log-parity-20261028.patch           # sweep_fees.rs:147 (applies cleanly)
# cashback packet hunk 1 (V1 claim, line 152) is already in L31 (mg-P-cash-01 restored it); apply hunk 2 (V2, line 312) only:
sed -i '' '312s/  if amount==0{return Ok(());}/  if amount==0{msg!("No cashback to claim");return Ok(());}/' src/token_incentives/claim_token_incentives.rs
grep -c 'No cashback to claim' src/token_incentives/claim_token_incentives.rs   # 2
cd $L && python3 -B rtools/twopass.py l32/pump tp32 --baseline $W/base/L31/inventory.json
