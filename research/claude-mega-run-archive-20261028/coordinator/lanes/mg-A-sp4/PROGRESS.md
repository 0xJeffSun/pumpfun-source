# mg-A-sp4 progress (AMM: creator-fee transfer legacy 0x26da8, v2 0x28dd0, extend_account 0x2e720)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-sp4 (src = union u754 copy, target = mg-base733 warm clone).
Base: union-754 native 754/150 (frontier matched-union-754n.json).
## Log
03:30 lane set up; reading prior work (mg-A-2 PROGRESS, findings, origlines).
03:40 baseline u754 build: 754/150; allmasked 0x26da8 203, 0x28dd0 432, 0x2e720 436. Orig anchors: transfer_creator_fees_to_pump.rs
  (instructions/coin_creator/) legacy Overflow@88, v2 Overflow@239; extend_account.rs (instructions/) 6027@91,@114.
03:45 xfer1: moved structs+legacy+v2 into instructions/coin_creator/transfer_creator_fees_to_pump.rs (errors at 88/239 via //PAD),
  lib.rs line 31 `pub use instructions::coin_creator::transfer_creator_fees_to_pump as transfer_creator;` (external handlers)
  -> 754/150 no loss; allmasked legacy 117 (mset 11), v2 93 (mset 4). Residual legacy: ctx.accounts load after Rent::get (orig before).
03:44 WIN 01 (wins/mg-A-sp4-01.patch/.json): +0x26da8 +0x28dd0 -> native 756/785 raw 150, 0 losses, no stack warn.
  Keys: external handlers in instructions/coin_creator/transfer_creator_fees_to_pump.rs (lib.rs:31 pub use ... as transfer_creator),
  `let a=&*ctx.accounts;` (IR: hoists ctx.accounts load before Rent::get: legacy all-masked 117->79),
  split `let min_balance = Rent::get()?.minimum_balance(165);` + `let minimum = min_balance.checked_add(deficit).ok_or(error!(Overflow))?;`
  (overflow arm first; legacy 79->0, v2 93->0). Error lines 88/239 via // pad lines. Snapshot tree: L/wins/src-01.
  Tools: tools/mux.py + tools/muxeval.sh (multiplex fn variants into one IR build), tools/irv.sh (IR+llc), irmove/irblk/irdenum/irren.py.
NEXT: extend_account 0x2e720 (orig instructions/extend_account.rs, 6027@91 and @114; cand allmasked 436 mset 123).
03:55 extend 0x2e720 analysis (from diff/call summaries): orig = external handler in instructions/extend_account.rs; current=data_len() first,
  then an inlined Result<usize> size helper: data_len()<8 -> err AccountTypeNotSupported@91, try_borrow_data()?, &data[..8] (bounds panic),
  if-chain GlobalConfig 949, Pool 301, UVA 137, GlobalVolumeAccumulator 600, else err AccountTypeNotSupported@114; then
  current==new -> msg!("Account already has the correct size") Ok; current>new -> msg!("Account already has more than {} bytes: {}", new, current) Ok;
  Rent::get()?; min(new) then min(current); if new_min>cur_min {transfer(diff)}; realloc; Clock event; emit!/emit_cpi!.
04:20 extend 0x2e720 partial (tree L/best-partial-src, patch L/best-partial.patch = win01 + extend rewrite; measured 756/150, 0 losses):
  instructions/extend_account.rs (external handler via lib.rs:29 `pub use instructions::extend_account as extend;`, `pub mod extend_account;`
  in instructions/mod.rs), private helper account_size(&AccountInfo)->Result<usize> with require!@91 + `let size = match &data[..8] {..}; Ok(size)`
  (else arm err!@114), msg! for equal/greater sizes, Rent once + 2 minimum_balance, `if new_min > cur_min {transfer}`, emit!(event) without clone.
  Window now 623 vs 617 instrs, all-masked diff 6. Remaining gap: the 2nd error's name String is built in a temp and copied
  instead of directly into the AnchorError (IR proof: writing it in place gives full match). Source form for that is the open lead.
STOPPED 04:20 per coordinator rule (a safety check halted a step). Not resumed.
