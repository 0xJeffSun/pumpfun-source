# mg-A-res1 progress (AMM near-miss windows 0x23e40 0x24fd8 0x2ba60 0x50f00)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-res1 (src = u752 copy, warm target from mg-base733). Base u752 native = 752/150 (verified 02:47, 0 gains/losses vs matched-union-752n).
Tools: L/tools (copied from mg-A-2: nd.py, ndo.py, ir.sh, mir.sh, ...), L/ir (llc.sh, nolife.py, ...).
## Log
02:47 INCIDENT (fixed): `patch -p0` of mg-A-2/best-partial.patch followed its absolute `---` u744 paths and rewrote 3 files in
  lanes/mg-union/u744 (creator_reassignment.rs, instructions/coin_creator/mod.rs, instructions/create_pool.rs). Restored at 02:48 with
  `cp -p` from u752 (those files were byte-identical in u744/u752 before; mtimes match u752 = original clone mtimes). u744 vs u752
  diff is back to the same 8 files as before. Then applied a path-rewritten copy (L/mgA2-partial-rel.patch) inside L/src only.
02:48 L/src = u752 + mg-A-2 best partial (migrate/set ported into instructions/coin_creator/*.rs, create_pool field-by-field port).
02:50 mg-A-2 partial on u752: 752/150 no losses; 0x23e40 1 instr off (as handed over), 0x24fd8 280 plain/19 all-masked, 0x2ba60 97/53, 0x50f00 121/57.
02:55 0x23e40 analysis: migrate was NOT MIR-inlined (rustc 1.79 applies cost threshold even to #[inline(always)]); LLVM inlined it and gave
  old_coin_creator.i whole-body lifetime markers (its MIR StorageLive/Dead were removed by GVN, which replaced the struct-field temp
  `_42 = copy _30` with _30 -> reused local -> StorageRemover). Frame tables (llc -print-after=prologepilog) identical with/without markers;
  only the ZST fi#0 merge target differs: SP-400 (= old_coin_creator fi#16, live only from first use) vs orig SP-56 (fi#8).
  IR: drop markers -> diff 0; duplicate lifetime.end (conservative slot) -> diff 0.
  inline(never) (internal) -> ArgumentPromotion (fastcc, accounts ptr + bump i8) -> 136 diff, wrapper 0xec738 differs.
03:01 WIN 01 +0x23e40: external linkage via lib.rs line-26 `pub use instructions::{boost, liquidity, swap::trade_v2, coin_creator::migrate_pool_coin_creator};`
  + no inline attr -> migrate standalone, unmarked slot -> 0x23e40 exact, 0xec738 unchanged. Minimal tree (only migrate move; set/create_pool
  partial removed) = native 753/150, gains [0x23e40], losses []. Saved shared/wins/mg-A-res1-01.{patch,json} (diff -ruN), EVENTS logged.
  Snapshots: L/snap/w01-src (win tree), L/snap/e1-full-src (win + mg-A-2 set/create_pool partial).
NEXT: 0x24fd8 set_coin_creator (try the same external-fn treatment for set), then 0x2ba60, 0x50f00.
03:10-03:40 0x24fd8 set_coin_creator (tree = win01 + mg-A-2 set port in instructions/coin_creator/set_coin_creator.rs):
  - external fn via lib.rs line 26 `coin_creator::{migrate_pool_coin_creator, set_coin_creator}` (no inline attr): plain diff 280 -> 49,
    cand 930 vs 898 instr. Residual = 2 dead 32B stores per arm: memcpy(event+32 <- pool_key), memcpy(event+96 <- coin_creator)
    (serializer reads were forwarded to the locals by MemCpyOpt; DSE failed). IR proof: deleting those 4 memcpys -> 898 instr.
  - DSE fails ONLY because of dse-memoryssa-scanlimit=150: -C llvm-args=-dse-memoryssa-scanlimit=151 already removes them
    (diagnosis only). The scan from each dead store reaches exactly 150 MemorySSA accesses -> original had >=1 fewer.
    The two event-field temps (_87 base_mint, _88 metadata key) leave lifetime.end markers right after the stores.
  - Source fix (gen/setgen.py kl=blk2, file gen/set_coin_creator.blk2.rs): per arm
      let event = { let timestamp = Clock::get()?.unix_timestamp; let base_mint = base_mint; let metadata = ctx.accounts.metadata.key();
                    SetMetaplexCoinCreatorEvent { timestamp, base_mint, pool: pool_key, metadata, coin_creator } };
    -> dead stores gone, 898 instr, plain diff 2, all-masked 0. Real build: 753/150, gains [0x23e40], 0 losses (snap/blk2-src).
    (kl=ts = separate lets before `let event` moves event StorageLive after Clock::get -> slot recolor, 64 diff; kl=blk without the
    base_mint rebind loads the key before the base_mint copy, 56 diff; &{base_mint} seeds copy adds code.)
  - Remaining 2: metadata-arm (Some) emit_cpi! invoke_signed error path: orig loads the [AccountInfo;1] data-Rc ptr (r3,[r10-0x58])
    BEFORE the Error::from sret words (r1,r2); cand after. Orig's bonding-curve arm has the cand order, so the orig arms differ.
    IR block edits (swap loads, move before lifetime.ends, drop lifetime.ends) do NOT reproduce it -> cause is outside the block.
03:55-04:15 0x24fd8 residual (metadata-arm emit_cpi! Error::from block): post-ISel order in BOTH cand arms = [sret+8, sret, data-Rc ptr,
  LIFETIME_END x3, lam-Rc ptr]; machine-scheduler and post-RA-sched do not change it (post-RA-sched is a no-op here). Orig bonding arm =
  cand order; orig metadata arm has the data-Rc load first. Cand arms are identical after ISel, so the orig metadata-arm IR must differ.
  Tried (IR, no effect): swap lam/data loads, data/both loads right after call, drop/move lifetime.ends, null-check icmp+assume into block,
  !nonnull metadata changes. Tried (source, tools/vsetx.sh + gen/setx.py on blk2): borrow creator first, None arm first (swaps arm slots,
  residual stays), match on place with `ref`, .clone() of address: all still diff 2 (or worse). PARKED at blk2 (898 instr, diff 2).
03:45-03:54 WIN 02 +0x24fd8 (cumulative with win01): key IR finding = splitting the metadata arm's aggregate {i64,ptr} error-return phi
  into scalar phis reproduces the orig post-Error::from load order (and arm X split flips arm X). Source: Some(creators) arm ends with
  `return Ok(());` (gen/setx.py z1) -> diff 0 in IR loop; real build 754/150 gains [0x23e40,0x24fd8], 0 losses, clean. Arms reindented
  (whitespace only, re-measured identical counts). create_pool port removed from the win tree (kept at gen/create_pool.mgA2port.rs).
  Saved shared/wins/mg-A-res1-02.{patch,json} (diff -ruN, cumulative), EVENTS logged, snapshot L/snap/w02-src.
  (z2 None-arm return: d4; z3 tail-expression Ok per arm: d2; z4 both arms: d6.)
NEXT: 0x2ba60 create_pool (mg-A-2 port at gen/create_pool.mgA2port.rs: 97 plain / 53 all-masked; needs canonical arm LIKELY at quote
  supported_mint split + liquidity ult-100 err-first + Clock err-first), then 0x50f00 estimate_buy_quote (mg-A-6 groundwork).
