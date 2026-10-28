# mg-P-cto2 PROGRESS (mega run fleet B, main Pump, window 0x22a10 admin_cto::execute, 27400 B)
Start: base L27 (986/1035, 166 raw). Work dir: claude-pump-work/lanes/mg-P-cto2 (src/, work/, out/, tools/).
Prior lane decode: mega-run/lanes/mg-P-cto/PROGRESS.md, claude-pump-work/lanes/mg-P-cto/tools/orig_c.txt.

## Log
- setup: src = L27/pump (cp -c -R).

## Baseline (b0) on L27
- nbuild b0: 986/1035, 166 raw, clean, 20s. Window 0x22a10 cand admin_cto::execute @0x7e840 = 20048 B, ratio 0.0870 (unchanged from mg-P-cto on L19). sha 2e1e1d20.
- sumcmp (tools/sumcmp.py) orig vs cand:
  size 27400 vs 20048 (-7352); blocks 378 vs 239 (-139); jumps 309 vs 192; frame both 4096.
  calls 157 vs 187 (cand has MORE calls, SMALLER body => cand factors helpers the orig inlines). callee seqratio 0.51.
  callee diffs (orig cand): SYSCALL 3/0 (orig emits 3 msg! log lines); create 2/0 & create_idempotent 0/2 (orig INLINES
    create_idempotent leaving inner `create`); pay_token 0/1 (orig inlines pay_token body); clone 33/61; to_string 7/11;
    fmt 9/5; data_is_empty 6/9; memcpy 6/8. (prepare_bonding_curve / ?3cd50 is a naming artifact, same call.)
  sites 16/16 but seqratio 0.4375; missing in cand [289,298,330,338,660,719]; extra [284,284,312,331,413,557]
    => cand COLLAPSES multiple error!s onto one source line (284 twice) and the wallet/pool checks are boolean exprs
       with no msg! branches, so error-line coordinates are off.
- Confirms mg-P-cto: same logic, different SOURCE FORM. To converge need: (1) inline pay_token + create_idempotent,
  (2) restructure wallet-check (556-557) and pool-check (686-691) into orig's `if cond {..} else {msg!}` branches that
  emit the 3 SYSCALL msgs, (3) put each error! on its own original line. All-or-nothing 27400B/378-block window.

## v1 gross-structure rewrite (src_v1, out/v1) — NEW DATAPOINT, confirms wall
Combined rewrite prior lane did NOT try as one piece: (a) 3 wallet msg! branches ("Creator is a program..."/"...not a
system-owned wallet..."/"...quote token account is frozen...") + (b) pool-else msg! ("No canonical pump pool for this
mint; curve only") + (c) inlined pay_token body at the holder-sweep token branch + removed the pay_token fn.
- Build clean (runtime_valid true, no stack warnings, 27s), 986/1035 166 raw, ZERO losses (so pay_token/token_frozen/
  token_raw_amount are NOT separate matched windows — inlining/removing them is free elsewhere).
- Window 0x22a10 byte ratio 0.0870 -> **0.0763 (WORSE)**. SYSCALL now 3/3 (msgs present, behavior-correct: 3 emitted),
  but callee seqratio 0.51->0.35 and create_idempotent 0/3 vs orig create 2/0.
- WHY it regresses (root cause, two independent confirmations now):
  1. create_idempotent-vs-create is a COMPILER inline decision (orig inlines create_idempotent down to its inner
     `associated_token::create`; the candidate's call context keeps the lib call). Inlining pay_token in SOURCE only
     ADDED a 3rd create_idempotent call site -- it cannot force LLVM to inline create_idempotent to the primitive.
  2. The 378-block / scattered-cold-msg layout has no monotonic source-level gradient from 0.08; correct additions
     move bytes the wrong way (matches prior lane m1: 0.087->0.076).

## CONCLUSION (matches mg-P-cto; now with L27 + combined-rewrite evidence)
0x22a10 admin_cto::execute is an all-or-nothing 27,400 B / 378-block monolith at 0.087, ~10x larger than any matched
window in the whole corpus; it has no same-length candidate and no swap (best cand IS admin_cto::execute). The scorer
gives ZERO partial credit, and both the msg-only (prior) and the combined gross-structure (this lane) rewrites LOWER the
byte ratio. MECHANISMS levers target small residues (one movable block / reversed memcpy at ~0.95+), not a from-0.087
378-block reconstruction. No scorer win is reachable in a shared build budget. Not fabricating a win.

## Lane state / for a future dedicated multi-build effort
- Lane src/ = clean L27 baseline (986/166, ratio 0.0870) -- the best partial. src_v1/ = the v1 dead-end (0.0763, kept
  for reference). out/b0 = baseline evidence, out/v1 = rewrite evidence. tools/sumcmp.py = summary-only orig-vs-cand
  (size/blocks/frame/jumps/callee-count-diffs/site-seqratio), tools/skel.py + orig_skel.txt = original 378-block skeleton
  with error codes. Full decode: mg-P-cto/tools/orig_c.txt (2424-line annotated listing), orig_blk.txt.
- Only viable path to a win: a FROM-SCRATCH execute that reproduces orig_c.txt's exact 378-block CFG AND the compiler's
  inline decisions (create_idempotent->inner create; pay_token fully inlined twice; cold msg blocks placed where the
  binary has them at +932/+1244/+2436). Must get gross structure byte-close BEFORE the IR loop (irbuild.py) can help;
  the IR loop only polishes small residues. Expect many builds; near-zero probability by hand. STOPPED per RULES s5
  (no new win reachable) rather than burn shared fleet budget.

## Resume (coordinator request) — step 1 result, then paused
- Step 1 (callee identity) RESOLVED, no behavior correction needed: orig ATA callee 0x17e428 is a normalized match for
  BOTH anchor_spl associated_token::create and ::create_idempotent (they differ only in a masked call imm); it calls
  0x199918 = create_associated_token_account_idempotent (40 B, normalized+raw match). => orig uses CreateIdempotent,
  same as ours. The earlier "create 2/0 vs create_idempotent 0/2" diff was a naming artifact.
- tools/sumcmp.py fixed: L27 inventory + alias table (create->create_idempotent, ?3cd50->prepare_bonding_curve).
  Corrected summaries: b0 callee seqratio 0.5174, diffs SYSCALL 3/0, clone 33/61, data_is_empty 6/9, fmt 9/5,
  memcpy 6/8, to_string 7/11, pay_token 0/1, transfer_vault_tokens 1/0. v1 seqratio 0.3606 (SYSCALL now 3/3,
  create_idempotent 2/3, clone 33/67).
- tools/ctargets.py: distinct call targets of a window/fn with L27 names (summary only).
- Step 2 (from-scratch rebuild) NOT continued in this session: my attempts to proceed were stopped by the
  assistant's safety system twice, so I paused and handed the decision back to the coordinator. Lane src/ = clean L27
  (best partial, 0.0870); no delivery, no WIN.
