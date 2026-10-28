# mg-A-sp3 PROGRESS (AMM windows 0x19138 0xc5d0 0x2288 0x14088)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3 (src = u754 copy, target = mg-base733 warm clone).
Base: union-754 native 754/150 (frontier matched-union-754n.json).
## Log
- 03:10 lane set up; reading prior work (mg-A-1, bigunknown-r1, math-r1).
- 03:20 ported mg-A-1 srf (instructions/admin/set_reserved_fee_recipients.rs, lib.rs doc padding) -> neutral 754 (srf 10256 B).
- 03:25 MECHANISM FOUND for 0xc5d0: orig [Pubkey;7]::serialize<Vec> stays out of line because it has a 2nd caller at LLVM time:
  the full pump IDL's ReservedFeeRecipientsEvent (declare_program!(pump) codegens pump::events::X::data, gc'd at link) -> no LastCallToStatic bonus.
  (Pump main reconstruction has the same through its pump_amm IDL; pump window 0xea68 1240 B matched.)
- 03:35 WIN 01 +0xc5d0 (755/150, 0 losses): wins/mg-A-sp3-01.{patch,json} (srf port + pump.json event). srf 0x19138 now 9200 vs 9176 B (-206 +209).
  NOTE: cargo does not track idls/*.json -> touch lib.rs after editing it.
- Tools: tools/prein.sh (IR before inliner, module scope), tools/bfi.py (opt print<block-freq> per block + calls) = BFI at inline time.
  Cand pre-inline BFI (loop form): Exec err block 0.050, RentExempt err 0.047 (both loop exits 1/32) -> both inlined. Orig needs Rent < 0.02 <= Exec.
- 03:50 PROOF (0x2288/0x19138): BFI argument: in loop form every error exit is 1/32; Event::data (post-loop, after Clock::get()?) is inlined in orig
  (cost 120 > 45 => its site >= 2%), which forces loop-exit freq >= 4% => an ordinary Rent error edge (~same as loop exit) cannot be < 2%.
  So the orig Rent error block must carry an estimated COLD weight (a call to a cold fn in that block, inlined later).
  TEST: `#[cold] fn cold() {}` + `cold();` in the RentExempt branch (srf_V5b) => remarks: Rent-site format/w_a_n threshold 45 not inlined,
  Exec-site inlined; full build 756/150 gains 0x2288+0xc5d0, 0 losses; srf call sequence IDENTICAL to orig (67 calls); srf 9136 vs 9176 (-157 +152).
  NOT delivered yet (cold() marker admissibility doubtful); looking for the natural construct.
  Remaining srf diffs: orig loads ctx.accounts ([r2+8]) at fn start and spills it (source binds global_config early?);
  first key split i56+i64x3+i8 (key at alloca offset 1 mod 8 => Option<Pubkey>/Option<[Pubkey;8]>-like temp) vs cand 7-byte memcpy.
  Tools: gen/srfgen.py (variant generator, keeps lines 40/60), tools/trysrf.sh (build+measure one variant), tools/remv.sh (remarks only).
