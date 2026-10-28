# Lane o0077-brute-r1 — O0077 BuyPumpSwap handler (orig 85600, 9736 B)
Base 436: cand 9016 B, ratio 0.2505, diffslots 1348 (base0 rebuild reproduces e93b60f1/49d70dc7).

## Orig structure observations (from orig.txt)
- 32 out-of-line AccountInfo::clone calls (NOT inlined, unlike O0079 sell), 19 memcpy.
- Buy literal evaluated in O0079 "orig order" + global/user_volume_accumulator after coin_creator_vault_authority;
  out-of-order fields cloned to temps then memcpy'd (12 memcpys) -> literal order matters.
- Inline signer seeds (bump read from ctx.bumps after literal) in transfer, cpi buy, close.
- native computed after buy_quote (as O79 g4n1); price check = O79 price_check helper shape (checked_div first, shared error block r8 code 2/12).
- bought_amounts INLINED (panic locs pump_amm_interface.rs:403:23 / 404:26 at window end); base calls it.
- event: quote_vault_balance local (lamports re-read in native), gqd uses `native` (no native_accounting).

## Generator
gen77.py (--show/--write), run.sh SLOT LABEL SPEC; results.txt log.

## Batch evaluation (batch77.py NAME SLOT spec...)
N variants as `pub fn handler_vK` in one build; dispatcher `handler` matches tolerance_bps&63 (eval only).
Validated: B1/v0 == port-r1 p1 exactly (428/51/33), B1/v4 == v03 (384). Results in batch_results.txt
(none = unmasked winreport-like slots, stack = stack-masked, regs = regs+stack masked).

## Results
- v03 (my gen, helpers pc3, ba=inline): 9744 B, unmasked 384.
- B1/v2 eq=closure,pc=closure (port-r1 p1 closures) + MY plain cpi (inline seeds, chained with_remaining_accounts) + p1 event:
  9736 B, unmasked 147, regs 33; byte-exact (incl. stack offsets) up to 7176. p1's {let bump;...cpi_ctx} block shifts the frame (428).
- B3: pure-expression event fields (no `let virtual_sol;let virtual_quote;` decl blocks) -> 9808-9832 B; decl blocks are needed.
- port-r1 p2 (phased let-bound event) = 2 masked slots but its frame comes from p1's cpi block -> B5 combines p2 event + my cpi.
