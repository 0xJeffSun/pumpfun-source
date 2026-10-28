# fz-P-crv2a-r2-01: walk 0x18678 normalized-equal (base L32, 991/1035, raw 166, 0 losses)

Window 0x18678 = `create_v2::nested_create::walk` (5704 B; sites create_v2.rs:390/395/466/473). Built through
mg-P-int/tools/nbuild.py (identity recipe): gains [0x18678], losses [], raw_losses [], no stack warnings.

## Changes (all in programs/pump/src/create_v2.rs, line-neutral)
1. walk body = lane fz-P-crv2a-r1's rewrite (BEST-walk; decoded CFG of the original: control=&accounts[3] first, mint copy,
   tail=&accounts[4..], `[EMPTY_RECORD; 5]` const init, `for (position, slot) in records.iter_mut().enumerate().take(depth)`,
   `root = usize::from(curve.depth)` (== depth-1 since pump_quote::depth = curve.depth+1), curve branch before pool branch,
   reserve test order rq,vq,rt,vt). Same checks/errors/order as the original (function is now byte-equal after masking).
2. Line 390: `let mut curve = ancestor({ require!(!tail.is_empty(), PumpError::UnsupportedQuoteMint); &tail[0] }, &mint)?;`
   Evidence (IR, llx/e7 + e11 in the lane dir): the original frame needs `curve` and the first ancestor Result temp live before
   the 390 check and the ancestor temp to have a lower MIR local index than the 390 error temps. A `let` binding and a call's
   result temp are StorageLive before argument evaluation, so the check inside the argument gives exactly that.
3. record pool branch: pool_address() inlined as `let authority = ..; let pool_quote = ..; let expected = ..` on the same line
   (orig 32-byte stack-slot order: `expected` numbered between pool_quote and the find_program_address temps); the old
   pool_address fn lines became `// layout-pad(8)`.
4. record pool branch: `let [_, pool, base_vault, quote_vault, rest @ ..] = *tail else { return Err(error!(PumpError::QuotePoolAccountsRequired)) };`
   (same condition/error as `require!(tail.len() >= 4, ..)` on the same line 493) and `*tail = rest;`. Evidence: llc on the IR
   with the tail ptr GEP before the len sub matches (llx s1); slice patterns compute ptr first; let-else keeps the Ok-first
   block order of the pool_record `?` (split_at(4).1 / if-let pattern flipped it, 0.889).
5. CALLER execute (window 0x1e7c0, group P-crv2b, unmatched): line 52 `let remaining=ctx.remaining_accounts;`, used in
   `require_gte!(remaining.len(),3,..)` and `walk(remaining,&a.global)`. Pure binding, same values. Needed for the original's
   `panic_bounds_check(3, 3)` in walk: IPSCCP propagates the caller's len>=3 fact into walk's len argument (but not len>=4).
   Integrator: when composing with P-crv2b's execute rewrite, keep walk's argument an SSA slice whose len was checked >=3
   (require_gte) and not proven >=4 before the call, or walk's last insn becomes `mov r2, r8` (0.9985, 1 slot).
