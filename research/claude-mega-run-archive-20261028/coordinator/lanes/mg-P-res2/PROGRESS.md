# mg-P-res2 PROGRESS (main Pump near-miss windows, 2nd try; start = base/L27 986/1035 raw 166, unstripped 2e1e1d20)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-res2 (src/ = L27 copy, work/, out/, tools/ (from res1), v/)
Windows: 0x3cd50 prepare_bonding_curve (0.9937), 0x298b0 collect_creator_fee (0.905), 0x3fb70 migrate::execute (0.867),
0x2bf18 get_token_distribution_amounts (0.89), 0x152888 (needs 0x6cd78 from z06b), 0x14a8a8 (needs 0x8bbd0 from z08).

## Log
- 03:24 setup: src = cp -c -R base/L27/pump; tools copied from lanes/mg-P-res1/tools.
- 03:26 baseline IR build out/b0 = L27 exactly (stripped sha d9452905 = base/L27/candidate.so; 986/166). llc single-fn loop
  (tools/xfn.py + llf.sh/lle.py + new irx.py) reproduces 0x3cd50 at 0.9937 (2 slots: ldxdw payload vs data-Rc order).
- 0x3cd50 NEW IR FINDINGS (llc): the export order in the realloc-error block is decided by isel vreg/IROrder of the
  From-payload. MATCH shapes: payload extract after the `_14.val1` load, at the end of the error drop-exit block (exit95),
  or in exit.i39; AND (key) an intermediate ERROR-JOIN block J: `%aggJ = phi {i64,ptr} [%21 fund-err], [%41 realloc-err]`,
  `%tJ = phi i64 [%22..],[%_29.0..]` (tag stays scalar/early), `%pJ = extractvalue %aggJ,1; br bb12` = MATCH (exp/jblk.py
  TAGJ=early). Size path through J = 0.83 (must go straight to return); tag via aggregate = 0.9937; whole-return aggregate
  phi = 0.9874; separate ret for error path = 0.88.
  => Mechanism: InstCombine foldPHIArgExtractValueInstructionIntoPHI in a join that only the two `?` error exits reach
  (all incomings extractvalue, one use each; fund tag has a 2nd use (the compare) so the tag phi is NOT folded). a2 lacks
  it because its join (bb11 = lifetime.end(funding)) is merged into the return block by SimplifyCFG before InstCombine
  (funding escapes into drop_in_place<Result> until inlining), so the realloc-OK undef reaches the phi.
  Pre-opt IR loop: build with IRWRAP_EXTRA="--emit=llvm-ir,mir -C save-temps" -> *.no-opt.bc; `clang -target sbf -O3
  -S -emit-llvm no-opt.bc` reproduces prepare_bonding_curve exactly (0.9937). (out/b0s/ir)
- 03:50 WIN 0x3cd50: multiplex batch mx/v1.py (12 forms, one build): variant P (`needs_realloc` bound before `new_size =
  current_size.max(166)`; natural `?` on fund; `if needs_realloc {realloc?}`; Ok(())) = 1.0000 MATCH (aggphi=1 in IR).
  Natural `?` forms without the early bool (A,B?,C,E,F,H) = 1288 B 0.915 (B had needs before but max not last use? B: max is
  NOT last use because ... see mx1); J (a2+`funding?`) = 0.9937; K (realloc(new_size)) 0.46; M/O worse.
  Clean build out/w1: 987/166, gains [0x3cd50], 0 losses, runtime_valid. Delivered deliveries/mg-P-res2-01 + EVENTS WIN.
