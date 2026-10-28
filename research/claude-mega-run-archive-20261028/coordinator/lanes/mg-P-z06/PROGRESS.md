# mg-P-z06 progress
Start: deliveries/r5-z06-02 (909, L12) -> switched to L13 (962) at 02:05 per coordinator -> L14 (965) at 02:20.
Work dir: W/lanes/mg-P-z06: src = L14 + my wins (current best), src-l13 / src-r5 = older trees, var/ variants, res/ results.
Tools (W/lanes/mg-P-z06/tools): bs.sh <src> <name> [slot a|b|c] (nbuild + score vs L14), irb.sh <src> <name> <fnregex>
(build with IR emission -> ir/<name>.ll + ir/<name>.x.ll), xfn.py (keep one fn, others -> declares), llv.py / llgrid.py /
blkperm.py (IR edits, branch-weight grid, block moves; llc + sacmp in 0.1 s), odiff.py <o|so> <orig> <sym> (short diff),
deliver.sh NN RES SRC "summary", calls.py / ccalls.py (call lists orig / candidate).

## WIN 0x6a1e0 control_entry -> deliveries/mg-P-z06-01 (L13 963; L14 port verified 966)
- residual (r5-z06): sret reload placement. IR proof: phi-join of space()? error + 158 error => MATCH.
- source: 145 header get+ok_or_else, 146 require on header, 158 one statement `data.get(108..QuoteControl::space(count)?)
  .ok_or_else(|| error!(..))?`. and_then form: frame +0x10 (1744 B); match form 1712 B.

## Next: 0x75308 claim_token_incentives (orig 5920 B; L13 claim 5624 B ratio .18; r5-z06 cl_c10 5944 B .53 on L12)

NOTE (02:25): never modify a delivery dir after writing it (I re-wrote -01 at 02:14 and appended to its README at 02:20; coordinator flagged it). Next deliveries: -02, -03... L15 (972) exists; staying on L14-based src for now (integrator composes).

## 0x6a8a8 add_quote_control_mint (02:30-)
- var/aq2 (r5-z06 aq2 on L14: ok_or_else at 71 + saturating_sub): 5848 B ratio .653.
- Diagnostic build with -Cllvm-args=-cold-callsite-rel-freq=0 (NOT deliverable): clones inline, 6344 B (orig 6328), .675.
  IR: moving `usub.sat(required, lamports)` from the transfer block to BEFORE the `required > lamports` branch (as in the
  original: saturation computed, then `jle required, lamports`) -> .768; remaining = stack-slot order only (hunks of 6).
- BFI (print-bfi): transfer block = 1.56% (pre-inline) / 1.17% of entry -> cold (<2%) -> clone cost 60 > 45.
  Path branches: validate(.5) checked_add Option(.5, not hinted at inline time) space(.5) new_space>len(.5)
  Rent::get (.375 zero-heuristic later) required>lamports(.5). Original must have >=2%: one fewer 50/50 on the path.
- BREAKTHROUGH aqh7a (var/aqh7a): `let lamports_diff = Rent::get()?.minimum_balance(new_space).saturating_sub(info.lamports());`
  + private helper `fn pay_rent(system_program:&AccountInfo, payer:&AccountInfo, to:&AccountInfo, lamports:u64)->Result<()>
  { if lamports > 0 { transfer(CpiContext::new(system_program.clone(), Transfer{from: payer.clone(), to: to.clone()}), lamports)?; } Ok(()) }`
  (end of file) -> 6336 B (orig 6328) ratio .9456: clones inlined inside the helper (hot there), helper inlined (6.25% site),
  usub.sat stays before the branch (its use is no longer in the immediate successor). Residual 27 lines: space() result slot
  -0xb8 vs orig -0xe0, clone-sequence spill slots.
- aqh8a: helper takes `ctx: &Context<'_,'_,'_,'_,UpdateQuoteControlMints<'info>>` (accounts read through the non-noalias
  ctx.accounts pointer -> authority AccountInfo ptr loaded after the system_program clone, like the original) and the
  main fn re-borrows `quote_control` after the if (blank line 91) -> 6328 B (= orig) ratio .9948; residual: only the
  space() Result slot (-0xb8 vs orig -0xe0; 4 insns). Stack-colouring question (16-B temp merged into the 184-B CpiContext slot).
- WIN 0x6a8a8 -> deliveries/mg-P-z06-02 (L14 base, cumulative: 967 = +0x6a1e0 +0x6a8a8). aqh9a = aqh8a + nested
  `QuoteControl::space(len.checked_add(1).ok_or_else(..)?)?` (one statement) fixed the space-result slot.

## 0x6fef8 set_reserved_fee_recipients (02:40)
- var/srfC (srf12 module form on L14 + `let recipients: [Pubkey; 8] = <Vec>.try_into().unwrap();` first=recipients[0],
  rest=recipients[1..].try_into().unwrap()) -> 9080 B (orig 9176) ratio .793 (srf12 .719). srfA (map_err(error!)?) 7688 .53;
  srfB (to_bytes().try_into().map_err) = srf12. Residual: first key [0..7) piece handled as w+w stack copy vs orig b+h stack + w reg.

## 0x75308 claim_token_incentives (02:50-)
- cl_c10 (r5-z06) on L14: 5944 B .532. Frame: orig Clock temp at -0x118 = top of the 280-B CpiContext<TransferChecked>
  slot -> CpiContext lives in an inlined helper (spliced to frame top).
- clh2: private `fn transfer_incentive_tokens(accounts:&ClaimTokenIncentives, bump:u8, amount:u64)->Result<()>`
  (let authority first, transfer_checked(CpiContext::new_with_signer(..)) tail) at end of file -> 5512 B .608; call list now
  identical to orig. clh2b (authority.clone()) .560; clh1 (&Context) .608. Orig builds the signer seeds BEFORE the
  token_program clone (after the authority clone) -> testing clh3/4/5 (seeds let-bound first; bump array; let cpi_context).
- clh3/4/5 (helper + seeds let-bound) .56-.57; clh7/clh9 (authority cloned in claim, helper with &authority) .568.
- IR: cl10 IR with the 280-B CpiContext alloca moved to the top of the alloca list -> .6676 (best so far; frame fixed).
  Orig order in the transfer block: authority clone -> seeds (bump loaded from ctx+0x20 late) -> token_program clone ->
  from/mint/to (field loads hoisted = noalias accounts). Testing clh15/16 (no helper, seeds let-bound after authority,
  authority.clone()/moved) and clh17 (pub fn helper(&Context) -> no ArgPromotion, bump loaded inside).
- srf: probe (lanes/mg-P-z06/probe, standalone rustc) shows map_err(PErr/AErr)? both give the w+w split; the orig's
  2/1/4/8/8/8/1 split = payload at +1 with an overlapping u32 at [4,8) and nothing at 16/24 (an 8-byte Err {u8 tag, u32});
  real ProgramError 2.2.2 has BorshIoError(String) -> not it. srfD/E (ProgramError map_err ?) .53 / .14.
- clh15/16 (no helper, seeds let-bound after authority) .526/.469; clh17 (pub helper) not inlined .485. Claim parked at
  best source .608 (clh2) / IR .668 (cl10 + CpiContext alloca first).
- srfC IR: the first key is copied with a 7-byte memcpy into an SROA slice alloca (reserved_fee_recipient.sroa.0) + the
  rest 224-B memcpy; orig keeps [0,3) in a 3-byte stack piece and [3,7) in a register. Next idea: find the source whose
  temp makes SROA cut the payload at alloca offsets 4 and 8 (an overlapping 4-byte field), then compare.
- srfG (array pattern `let [first, rest @ ..] = recipients;`) / srfH (split_first) = srfC (.7927); srfI (from_fn) .39.
- claim closures (transfer as a closure inside claim, inlined by LLVM): clh18 (authority moved) .541, clh19
  (authority.clone()) .600, clh20 (seeds let-bound inside closure, authority moved) .612 = best source form so far.
  All helper/closure forms are ~400 B shorter than the original (5520 vs 5920); cl10 (no helper, authority.clone()) is
  24 B longer. The size gap is worth decoding next (segs.py per-call segment counts: orig seg7 72 = cl10, helpers 56-57).

## STATE AT STOP (03:40)
- Deliveries: mg-P-z06-01 (L13, +0x6a1e0, 963), mg-P-z06-02 (L14 cumulative, +0x6a1e0 +0x6a8a8, 967). Lane src = -02 tree.
- Best partials: 0x6fef8 var/srfC (.793), 0x75308 var/clh20 (.612; IR .668 with CpiContext alloca first),
  0x6cd78 / 0x72810 not attempted (structural rewrites; sweep orig logs msg!("Nothing to sweep for fee bucket {}", bucket)
  when amount == 0 - missing in the candidate - and calls prepare_bonding_curve, validate_fee_recipient, admit x2,
  native_payments::transfer, transfer_to_owned).
- Next ideas: srf = find the temp whose layout cuts the first key at payload offsets 3/7 (8-byte Err {u8 tag, u32});
  claim = combine closure/helper frame-top with cl10's post-transfer code (no scoped-noalias CSE).
