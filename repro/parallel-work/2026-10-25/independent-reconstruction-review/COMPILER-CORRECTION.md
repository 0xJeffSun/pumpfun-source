# CORRECTION / RETRACTION: the compiler is v1.44, not v1.43 (ELF e_machine proof)

**This retracts the v1.43 conclusion in RECIPE-REVERSE-ENGINEERING.md, FULL-GAP-REPORT.md,
the v1.43-recipe-switch/ package, and any other doc in this folder that pins
pump/pump_amm/pump_fees to platform-tools v1.43.** Those are wrong. The correct compiler
for the three older programs is **v1.44** (mayhem stays v1.52), which is what `status.json`
and `build_reconstruction_candidate.py` already use.

## The error
I favored **v1.43** on a section-size argument (a v1.43 build's `.text` size was closest to
the original's). That argument is invalid because it ignored the **ELF header**.

## The definitive discriminator (ELF `e_machine`, offset 18)
Built the *same* source with each toolchain and read the ELF header machine type:

| Binary | `e_machine` | meaning |
| --- | ---: | --- |
| **Original (all 4 core programs)** | **263** | EM_SBF — the newer Solana SBF format |
| v1.43 build | **247** | EM_BPF — the OLD Linux-BPF format |
| v1.44 build | **263** | EM_SBF — **matches the original** |
| v1.45 / v1.46 build | 263 | EM_SBF |

platform-tools **v1.43 emits EM_BPF (247)**; **v1.44+ emits EM_SBF (263)**. The captured
originals are **263**, so they **cannot** have been built with v1.43 — its header is
incompatible regardless of `.text` size. The size closeness at v1.43 was a coincidence of
the older codegen emitting more code for the same (still-incomplete) source; it is not
evidence of the compiler. This matches docs/RECOVERY.md ("the stock v1.43 ELF header
contradicts the full capture") and the repo's `test_default_does_not_select_header_
incompatible_older_family` guard.

## Consequences (what was wrong and is now corrected)
- **`build_partial_candidate.py` v1.43 default** — wrong; the siblings correctly reverted it.
  Do NOT re-apply v1.43. The correct per-program default (already in
  `build_reconstruction_candidate.py`) is v1.44 for pump/pump_amm/pump_fees, v1.52 for mayhem.
- **`v1.43-recipe-switch/` candidates** — the three `.so` files were built with v1.43 and
  carry `e_machine=247`; they are header-incompatible with the originals and must not be
  used. They are removed; see that folder's RETRACTED.md.
- **The byte-identicality analysis stands in substance** (it is still bounded by the lost
  literal source; pump_fees still isn't byte-equal even with the correct v1.44 compiler),
  but any specific per-section delta I attributed to a v1.43 build is void — re-derive
  deltas against v1.44 (pump_fees .text ~752 KB vs original 799 KB → ~47 KB short at the
  correct compiler, i.e. the reconstruction is less complete than the v1.43 size implied).

## What remains TRUE from the research pass (unaffected by this error)
- SDK coverage findings and the **token-incentive handler recovery** (pump
  claim_token_incentives + admin_update_token_incentives, oracle-verified, on main
  `294c9186`) — these are compiler-independent and stand.
- Version forensics boundaries (RawVec@1.87, slice-sort@1.81; Anchor 0.31.1 vs 1.0.0; the
  mayhem hashbrown 0.15.4 vs 0.17.1 discrepancy) — these stand.
- The decompiled handler logic — stands.
- The fundamental byte-identicality limit (lost literal source) — stands, and is in fact
  reinforced: even the correct v1.44 compiler does not make pump_fees byte-identical.
