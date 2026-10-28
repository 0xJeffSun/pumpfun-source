# mg-A-1 PROGRESS (AMM windows 0x2288 0xc5d0 0xfb08 0x14088 0x14920 0x16128 0x19138)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-1 (src from mg-base733, warm target). tools: L/tools/dis.py (dis2 + base733 rows names), L/tools/xref.py (callers).
## Window map (orig xrefs)
- 0x2288 = anchor Error::with_account_name::<String>, only caller 0x19138 (set_reserved_fee_recipients handler)
- 0xc5d0 = <[Pubkey;7]>::serialize::<Vec>?, 2 callers both in 0x19138
- 0xfb08 = helper called once from 0x3dbc0
- 0x14088 = curve::fees::select_and_apply_v2 (callers 0x44ab0, 0x4fba0)
- 0x14920 = admin_cto_pool handler (orig file instructions/admin/admin_cto_pool.rs)
- 0x16128 = admin_update_token_incentives handler
- 0x19138 = set_reserved_fee_recipients handler (orig instructions/admin/set_reserved_fee_recipients.rs)
Prior: bigunknown-r1 (cto best 27-line diff cto_v2.rs; inc 27/25; srf: orig keeps 3 helpers out-of-line), math-r1 (v2 114 diffs, needs single merged Err block).
## Log
- 01:53 lane set up; reading prior work.
- 02:20 REBASED onto u744 (744/150 native, no losses). Ported (no win yet): instructions/admin/{admin_cto_pool,admin_update_token_incentives,set_reserved_fee_recipients}.rs
  from bigunknown-r1 (cto_v2.rs, inc_h1.rs, srf_t1.rs); lib.rs line-count kept (srf body -> doc padding; positioning device). Snapshot L/snap/s2-u744ports.
  Status: cto 6152=6152 25/25 diff (RA r2<->r3 swap of pool ptr after find_program_address); inc 3152 vs 3168 26/24 (shared exit block placed mid-fn + tag/payload r1/r2 swap);
  srf 10256 vs 9176 (orig keeps format/with_account_name<String> out-of-line at RentExempt err + [Pubkey;7]::serialize<Vec> out-of-line x2).
- MECHANISM (inline remarks via L/tools/remarks.sh + rem.py): LLVM marks a call site COLD when BFI freq < 2% of entry -> threshold 45 and NO LastCallToStatic bonus.
  e.g. GlobalConfig::serialize array calls (threshold 45). orig srf RentExempt err site must be cold; Executable err site not cold.
- 03:00 v2 (0x14088): math-r1 V9 on u744 = 1688B, 67/71 diff (best); X1/X2/Y1/Y2 helper forms 92-105 diff. Residual = orig has ONE Err-store
  block (tail shared by market_cap/FeeConfigTooShort/tier errors; FeeConfigTooShort path loads ptr->r1, tag->r2), cand stores separately.
- cto variants (gen/cto_gen.py: holder_rewards .0 vs tuple, is_cashback_coin forms, global_config binding): all 25/25 or worse; RA pool-ptr r2/r3 swap persists.

## 02:40 status (rebased on u744, clean 744/150, ZERO wins yet)
Partial tree: L/snap/s3-partial (= u744 + ports + v2 V9). Patch: L/gen/mg-A-1-partial-vs-u744.patch (559 lines). Build clean, no losses.
Best per window (normalized insn -removed/+added vs orig):
- 0x14920 cto  : 25/25, SAME SIZE 6152. Pure RA: pool ptr r2(orig) vs r3(cand) from the holder-rewards find_program_address onward,
    persists to prepare_pool. Tried ~28 forms (bigunknown 20 + my A/B/D/C1-4 + holder .0/tuple + gc binding pos/drop + is_cashback forms). Unmoved.
- 0x16128 inc  : best 23/24 (gen/inc/I3.rs = `if let Err(e)=update(..){return Err(e)}`). Residual = shared Ok/err exit block placed MID-fn
    (cand) vs END (orig); late msg! path jumps back vs orig jumps forward. IR return-phi swap (ir/inc_x1.ll) no change. I1/I4 (match clock) 31/24.
- 0x19138 srf  : 10256 vs 9176 (+546). orig keeps 3 helpers OUT-OF-LINE that cand inlines: with_account_name::<String>(=win 0x2288),
    [Pubkey;7]::serialize::<Vec>(=win 0xc5d0, called 2x by emit!/emit_cpi!), alloc::fmt::format. Needs those call sites COLD (threshold 45) or
    serialize unrolled+2-call-site too-costly. srf_t1 body is structurally right (collect+try_into, rent loop, lines 40/60 placed).
- 0x14088 v2   : best 66/71 (V9). IR proof (tools/irmerge_v2.py end) = orig has ONE merged error-return block (market_cap/FeeConfigTooShort/tier
    all funnel to a single store+exit at fn END); cand emits 2-3 separate stores. llc on merged IR -> -71/+66. No source form found to force the merge.
- 0x2288 / 0xc5d0 : unlock iff srf out-of-lines its helpers (same callers). 0xfb08 = multi-hop `flags` from_iter (caller 0x3dbc0, mg-A-4 territory).
TOOLS built: tools/remarks.sh + rem.py (inline cost/threshold per call site; threshold 45 == BFI-cold), tools/ir.sh + llcfn.sh + ofn.py + irfn.py
  (3s IR->llc->normalized-diff loop, no build slot), tools/cfg.py (branch/call/target summary), tools/tryf.sh/tryv.sh (whole-file/one-fn variant sweep).
NEXT IDEAS (most promising first):
 1. srf: make the Executable/RentExempt error returns provably cold so with_account_name/format stay out-of-line -> could net 0x2288+0xc5d0+shrink 0x19138.
    Try `#[cold] #[inline(never)] fn recipient_constraint_err(i, code)->Error` called from both sites (idiomatic; orig authors could write it),
    and verify via remarks.sh whether the array serialize goes cold too.
 2. v2: hunt the source form that yields a single merged error block (IR-confirmed as orig shape); try computing cap/tier into `let` Results and one
    tail `match`/`?` so all error returns share a store (test fast via llcfn on hand-merged IR first, then map to source).
 3. inc: force the shared exit block to fn end (block placement) -- try msg! BEFORE building the event, or `return Ok(())` tail vs implicit.

## 02:50 FINAL (this session): 0 wins. All 7 windows confirmed backend-hard (reproduces bigunknown-r1 + math-r1 conclusions).
- srf cold-helper experiment: #[cold]#[inline(never)] error builder drops 10256->9672 (lever works) but structurally wrong (orig calls
  with_account_name/format DIRECT from srf cold + keeps [Pubkey;7]::serialize out-of-line called 2x). ok_or_else/plain-if still inline. gen/srf_S1..S3.
- inc ordering variants J1/J2/J3 all worse than I3 (23/24). Best partial tree restored to L/src (= u744 + ports + v2 V9), clean 744/150, 0 losses.
- Nothing delivered to shared/wins or EVENTS.log (no win). Partial patch: L/gen/mg-A-1-partial-vs-u744.patch. Snapshot: L/snap/s3-partial.
