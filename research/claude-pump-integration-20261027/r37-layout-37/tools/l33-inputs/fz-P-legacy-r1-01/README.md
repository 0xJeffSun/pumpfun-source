# fz-P-legacy-r1-01

Base: L32 (868a868be78e). Result: 991/1035 normalized, 166 raw; gains ['0x14c038'], no losses, runtime_valid, no stack warnings.
synthetic_layout: true (inherited from the L32 layout composite; this delivery adds no layout pads, all edits line-neutral).

L32 + 0x14c038 legacy buy handler (lib.rs): z10b rewrite ported + tuple-bound token account refs + closure transfer (seeds before decimals) + check_bonding_curve_v2(mint:&Pubkey) with &mint.key() at the legacy-buy call site; line-neutral.

## Changes (all line-neutral; behaviour identical: same calls, same order, same errors/events)
1. lib.rs `buy` (legacy buy handler, window 0x14c038), ported from mg-P-z10b s8 (rewrite on the original control flow: in-place
   reserve updates, creator-fee branch, eager 747 Overflow, one Clock::get for both events, non-generic payment helpers in
   v2_token_transfers.rs / user payments; see mg-P-z10b PROGRESS).
2. Same line as `let bonding_curve=...`: `let (associated_bonding_curve,associated_user,token_program)=(&ctx.accounts.associated_bonding_curve,&ctx.accounts.associated_user,&ctx.accounts.token_program);`
   Separate `let x=&ctx.accounts.x;` bindings are folded back to their use by MIR ReferencePropagation; the tuple keeps the three
   field address computations at function entry, as in the original (IR: GEPs 272/488/1000 before system_program/user).
3. Token transfer through a closure: `let transfer=|signer_seeds:&[&[&[u8]];1]|transfer_curve_tokens_ref(token_program,associated_bonding_curve,associated_user,&bonding_curve,ctx.accounts.mint.decimals,ctx.accounts.mint.as_ref(),amount,signer_seeds);transfer(&[&[b"bonding-curve",ctx.accounts.mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;`
   The seeds are built before the mint.decimals load (original order).
4. sell.rs `check_bonding_curve_v2(remaining_accounts, mint: &Pubkey)` stays as in L32 (mg-P-z10b s8 had made it by-value; reverted,
   so sell.rs and the other two callers are unchanged vs L32). Legacy buy passes `&mint.key()` (copy of the staged mint).
   A `&Pubkey` parameter is not `nocapture`, so MemCpyOpt does not forward the argument copy to the mint account key pointer; the
   original copies the argument from the staged `mint` stack slot (r10-0x448) exactly like this.
Evidence: IR + llc single-function loop (tools/llone.sh, tools/lle.py) showed: L32+s8 0.9615 -> +2,3: 0.9917 -> +4: MATCH;
full build b02: 991/1035, 166 raw, gains [0x14c038], no losses, runtime_valid, no stack warnings.

