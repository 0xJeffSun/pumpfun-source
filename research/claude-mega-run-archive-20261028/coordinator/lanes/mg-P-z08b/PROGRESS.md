# mg-P-z08b progress (base L29 = 988/1035, 166 raw)
Lane work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08b (src/ = main tree, cloned from base/L29/pump)
Windows: 0x138b20 create (11928 B), 0x13b9b8 buy_v2 handler (15480 B).
Prior work: lane mg-P-z08 (create c5 form 0.2935 on L15; buy_v2 untouched 0.15).

## Log
- 03:5x started: read RULES/MECHANISMS/TASK/LANE-RULES/INSIGHTS-R5, mg-P-z08 PROGRESS. Cloned L29 into src/.
- 03:38 ported mg-P-z08's c5 create form onto L29 (lib.rs 335-348, line-neutral): 0.2935, no losses (v/c5). c5 also fixes
  create_metadata_accounts_v3 update_authority_is_signer=true (orig passes r4=0 is_mutable, stack arg 1) - L29 had false,false.
- Tools (lanes/mg-P-z08b/tools): mr.py (exact/offmask/offreg ratios for .so or llc .o), cseg.py (insns between calls),
  sidex.py (side-by-side around k-th call), frame.py (llc -stop-after=prologepilog frame objects by offset), amv.py
  (IR alloca reorder + llc), calldiff.py/onames.py (callee names via L29 inventory), gen/crm.py (multiplexed create copies).
- 03:55 create findings from the original disassembly:
  (1) mint-authority seeds are built THREE times (before metadata, mint_to, set_authority), bump byte reloaded from a spill
      each time => seeds inline per CPI call (`&[&[b"mint-authority",&[bump]]]`), not one `let seeds`.
  (2) the CreateEvent is built by an INLINED builder returning Result<CreateEvent> (niche check on name.cap ==
      0x8000000000000000 after the build), reading curve fields (vtr 0x48, vqr 0x50, rtr 0x58, tts 0x68, is_holder_reward
      0xa5, depth 0xa0, quote_mint 0x28) BEFORE the key copies and Clock::get = same body as create_v2's create_event (0x22498).
  (3) name/symbol/uri clones live in ONE 72-B object at -0x2d0 (symbol/uri addressed via saved GEP pointers), merged later
      with emit_cpi's AccountInfo array. Source construct for that still unknown.
