# r5-z02-02  (base L12 907/165 -> 912/165; gains 0x311f8 0x32840 0x33c50 0x38fc0 0x3a7b8; no losses; runtime_valid, no stack warnings)

Cumulative over r5-z02-01 (see that README for the creator/distribute_creator_fees.rs move = 0x311f8/0x32840/0x33c50).

## New in -02: set_creator.rs (set = 0x38fc0, sync/set_metaplex_creator = 0x3a7b8), single-line edits (line-neutral)
- Both handlers now emit without cloning (`emit!(e); emit_cpi!(e);`) and, in the metaplex-creators branch, end with an explicit
  `return Ok(());` inside the event's scope:
  - set:  `match &a.metadata.creators { Some(cs) => { ...; emit!(e); emit_cpi!(e); return Ok(()); } None => { ...; emit!(e); emit_cpi!(e); } } Ok(())`
  - sync: `match &a.metadata.creators { Some(cs) => { ...; emit!(e); emit_cpi!(e); return Ok(()); } None => { msg!("Missing metaplex creators"); } } Ok(())`
    (the `if let .. else` form with the same return gives a different stack-colouring of the Clock temp: 0.976.)
- Binary evidence: in both original windows the emit_cpi! invoke-error block loads the event-authority AccountInfo data Rc
  (`ldxdw r3,[r10-0x58/-0x70]`) BEFORE the From<ProgramError> result words ("data-first"). Without an Ok return through the
  event's drop join, InstCombine folds the error phis into one `phi {i64,ptr}` and the result loads come first (1-insn
  residual, 0.998). The explicit `return Ok(())` keeps the phis scalar (= peer insight "data-first error path").
- set(): mint / bonding_curve keys hoisted after the "already set" check (as in the original's load order).
Behaviour unchanged (same checks, same events, same order).
