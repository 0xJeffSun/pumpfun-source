#!/bin/zsh
# L34 = L33 + fz-P-crv2a-r2-01 (+0x18678, made on L32; create_v2.rs only, identical in L32 and L33).
# fz-P-mig1-r1-01 (+0x3e550) named in the fz2 task is already in L33.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l34/inputs; B=$W/base; C=$L/itools/compose3.py
python3 -B $C --base $B/L32/pump --start $B/L33/pump --out $L/l34/c1 --part crv2a=$I/fz-P-crv2a-r2-01/src
cd $L && python3 -B rtools/twopass.py l34/c1 l34/tp34 --baseline $B/L33/inventory.json
# 07:2x: c2 = c1 + merged contributor PR #492 (research/pump-l32-creator-log-parity-20261028/source.patch applied to L32 -> l34/inputs/pr492/src; 3 admin_cto notices)
#        + fz-P-raw-r2 raw-ready layer v3 (rawready-994.patch, made on L33; snapshot l34/inputs/fz-P-raw-r2-994/src)
python3 -B $C --base $B/L32/pump --start $L/l34/c1 --out $L/l34/c2 --part pr492=$I/pr492/src
python3 -B $C --base $B/L33/pump --start $L/l34/c2 --out $L/l34/c3 --part rawr2=$I/fz-P-raw-r2-994/src
# c3u = c3 + create_v2.rs:62 `require_gte!(remaining.len(),3usize,..)` (fz-P-raw-r2 integration note: crv2a's caller line with the
# usize literal like raw-r2's line 100; same windows/raw/raw-ready, one fewer i32 with_values instantiation, candidate 1,120 B smaller)
rm -rf $L/l34/c3u; cp -c -R $L/l34/c3 $L/l34/c3u
sed -i '' '62s/require_gte!(remaining.len(),3,PumpError::NotEnoughRemainingAccounts)/require_gte!(remaining.len(),3usize,PumpError::NotEnoughRemainingAccounts)/' $L/l34/c3u/src/create_v2.rs
cd $L && python3 -B rtools/twopass.py l34/c3u l34/tp34u --baseline $B/L33/inventory.json   # 1011/168, layout 1011/293, raw-ready 994, 0 losses
# 07:3x (fz3, fz-int-pump-L34): c4 = c3u + fz-P-crv2c-r2-01 (+0x138b20 v1 create, made on L32; lib.rs only).
# compose3 leaves one lib.rs conflict (tail: L33 replaced L32's TradeEvent struct with blank lines; crv2c appended 28 helper lines
# after it). scripts/resolve_crv2c.py takes ours + the 28 appended lines, then moves crv2c's 7 '// layout-pad' lines from after
# the legacy-buy prologue (where git placed them; that prologue is matched 0x14c038 in L33) to directly after create's closing
# brace, so every line after create keeps its L33 position.
[ -d $I/fz-P-crv2c-r2-01 ] || cp -c -R $W/deliveries/fz-P-crv2c-r2-01 $I/
python3 -B $C --base $B/L32/pump --start $L/l34/c3u --out $L/l34/c4 --part crv2c=$I/fz-P-crv2c-r2-01/src || true
python3 -B $L/l34/scripts/resolve_crv2c.py $L/l34/c4.conflicts/crv2c/src/lib.rs $I/fz-P-crv2c-r2-01/src/src/lib.rs $L/l34/c4/src/lib.rs
cd $L && python3 -B rtools/twopass.py l34/c4 l34/tp34v --baseline $B/L33/inventory.json   # 1012/168, layout 1012/293, raw-ready 994, 0 losses, unstripped 41b98b57
