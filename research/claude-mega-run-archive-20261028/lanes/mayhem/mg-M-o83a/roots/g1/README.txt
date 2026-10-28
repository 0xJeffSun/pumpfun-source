Mayhem parent-439 = Codex qualified438 (REPO research/mayhem-current438-composition-20261028, 67 files, all sha256 checked)
 + Claude O0077 (r436/o0077-ir-r1/BEST: buy_pump_swap.rs handler + #[inline(always)] pump_amm_interface::bought_amounts).
439/441 normalized, 141 raw-local, unmatched O0083 (BuyV2) + O0084 (SellV2). Composed by lane mg-M-int (02:0x 2026-10-28).

BUILD: mayhem-b/build/build_lane.py CANNOT compile this tree (curve-accounts uses historical_anchor_program::declare_program!,
an extern macro crate that Codex passes by hand; Cargo.toml has a profile-rustflags anchor-lang remap). Use the Codex root recipe:
  python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B WM/mayhem-env/tools/rbuild.py LABEL ROOT
(ROOT contains programs/mayhem; output WM/mayhem-b/out/builds/LABEL/{candidate.so,symbols.so,stderr,result.json}; ~20 s.)
It compiles only programs/mayhem/src/** + idls/** against the qualified434 dependency rlibs (mayhem-env/tools/cache-q434);
all other files must equal this tree (the tool refuses otherwise). It reproduces Codex's codex438 bytes exactly (b69ee99d/a4e4768d).

Builds (3 identical: first, clean copy + fresh cache clone, shared tool):
  stripped e899e096d903ffe0b6e475bc00d6015dc38f1caed13a85952e4cf83e229f6b08 (765,856 B)
  symbols  5d18b89a1c76fbc85a90ae46dde2d06a7d0157b94e4bb41050f68b48ff1963f4
  WM/mayhem-b/out/builds/mgMint-p439-clean/{candidate.so,symbols.so}   <- measure baseline for new work
measure.py vs codex438 symbols: 438 -> 439, gains [O0077], no_losses, raw 141 -> 141, edges 4573 -> 4670, Source 502 -> 505.
measure.py vs Claude parent-438 (o0077-ir-r1-v1): +O0076, raw 100 -> 141, Source 490 -> 505; 2 'profile_losses' (O0112, O0270)
  are corrections toward the original (extend_account.rs:27, src/bpf_writer.rs:33), not Source losses.
Read-only: copy it (cp -R) and never edit in place.
