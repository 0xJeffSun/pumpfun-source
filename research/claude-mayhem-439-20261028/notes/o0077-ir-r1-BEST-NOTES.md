# O0077 (buy_pump_swap handler, original 85600 / 9736 B) — CLOSED by lane o0077-ir-r1

Build: `mayhem-b/out/builds/o0077-ir-r1-v1` (incremental, target r436-o0077-ir-r1, --emit=llvm-ir,link)
- winreport O0077: cand 9736, norm_eq=True, diffslots 0; no stack-offset warning.
- measure vs 437 base (o0079-brute-r1-best-clean): matched 438, gains [O0077], no_losses true (measure-vs437.json).
- measure vs 436 base (pl-o82-final2-434): gains [O0077, O0079], no_losses true (measure-vs436.json).
- Clean rebuild (fresh target r436-o0077-ir-r1-clean, anchor cleaned, no extra rustc args): see clean-build.txt.

## Source (root = parent-437 + 2 files; source-vs437.patch, source.patch vs parent-436 also carries O0079)
- instructions/buy_pump_swap.rs: handler = o0077-port-r1 r3 (effective_quote + price_check closures, native after
  buy_quote, plain CPIs with inline signer seeds `&[&[b"sol-vault",&[ctx.bumps.sol_vault]]]`, Buy literal in
  original order + `.with_remaining_accounts(vec![..])`) + the O0079 BEST event statement verbatim with side:false.
- instructions/pump_amm_interface.rs: `#[inline(always)]` on bought_amounts (original inlines it; panic locs 403:23/404:26).

## Mechanism (IR-first; proof files in ../ir/, recipes ../tools/p2base.py, r3base.py)
llc (v1.54) on the reduced rustc IR reproduces builds exactly; posdiff = positional normalized compare.
From port-r1 p2 IR, 6 IR edits gave posdiff 0 (ir/exact-e10b.ll):
 1 bump alloca after authority_info; 2 lifetime markers on sol_vault/mint key temps ending after the last event
 store; 3 _132 (buy() by-value CpiContext copy) alloca after cpi_ctx; 4 seeds/signer_seeds lifetime.start after
 the Buy literal clone temps die; 5 lifetime.start(event) at the start of both native arms; 6 phi order = O0079.
port-r1 r3 (plain CPI) already satisfies 1,3,4 (inline seed temporaries); its remaining frame diff was only the
plain `let sol_vault=a.sol_vault.key(); let mint=a.mint.key();` locals (copy-propagated -> no markers -> own 32 B
slots, frame shifted 64 B) plus phi order. The O0079 event statement (keys inline in the literal, conditional fields
let-bound in O0079 order, quote_mint let last / literal last) fixes both -> exact.
