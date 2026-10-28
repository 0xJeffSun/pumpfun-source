# AMM100 lane rules (PumpSwap / pump_amm whole-program reconstruction)

Goal: make the recovered PumpSwap AMM source compile to the original deployed program.
Original: ~/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so (785 .text windows).
Frontier (Linux v1.44 packet, main): 656/785 normalized, 148 raw. Native mac v1.44 build of the same source: 651
(5 windows differ only by sysroot TypeId on native: 0xa9b0 0xf8ca0 0x1016a8 0x10efd8 0x111b38 — ignore those).

## Your lane
- Lane dir: ~/amm100-run/lanes/<lane>-r<round>/ . Set up once:
  `mkdir -p $L && cp -c -R <BASE>/. $L/src && cp -c -R ~/amm100-run/target-test $L/target`
  (`cp -c` is an instant APFS clone. BASE is given in your prompt.)
- Edit ONLY `$L/src/programs/pump-amm/src/**` (and, if truly needed, that crate's Cargo.toml features — say so).
  Never edit the cargo-home registry, dependencies, or anything in the git repo checkout.
- Build+measure: `~/amm100-run/shared/tools/nbuild.sh $L` (native, ~40 s, shared 6-slot build lock; may queue).
  Output JSON: normalized/raw counts and `gains`/`losses` vs the native frontier set (651).
- Disassembly: `python3 -I ~/amm100-run/shared/tools/dis.py orig 0xADDR` (original window),
  `... cand $L/out/cand.so NAME_SUBSTR`, `... diff $L/out/cand.so 0xADDR NAME_SUBSTR` (normalized unified diff).
  Remaining window list with source hints: ~/amm100-run/shared/remaining-work.json. Current per-window
  match table: ~/amm100-run/shared/frontier/rows.json. Prior Codex research (read-only!): 
  ~/Documents/Codex/2026-10-24/pumpfun-source/work/amm-* and repro/pump_amm/*/README.md.
- Run python tools with `python3 -I`. Keep tool outputs short (pipe through head/grep) — token budget is shared.
- Never use backticks inside unquoted heredocs (zsh). Use `<<'EOF'`.

## What counts
- A WIN = a source change that gains ≥1 normalized window (or raw window) with ZERO losses.
  Save each win immediately: `cd $L/src && diff -ru <BASE>/programs/pump-amm/src programs/pump-amm/src > ~/amm100-run/shared/wins/<lane>-r<round>-NN.patch`
  plus `~/amm100-run/shared/wins/<lane>-r<round>-NN.json` = the nbuild measure JSON + one-line description.
  Patches must be cumulative within your lane (each NN contains everything before it).
- Keep source plausible, idiomatic Anchor 0.31.1 / Rust the original authors could have written. No inline asm,
  no `#[export_name]` tricks, no dead-code padding, no behavior changes (business semantics, error codes,
  account checks, events must stay the same; an independent runtime suite of 17,462 cases will be re-run).
  Compiler-shape changes are fine: statement/field order, borrow vs move, `&` vs owned, helper extraction or
  inlining, `#[inline]`/`#[inline(never)]`, checked-math style, `?` vs match, `require!` variants, closure
  shape, iterator vs loop, integer types, struct field order (only if ABI/layout of accounts is unaffected), etc.
- Brute force is encouraged: script many variants (sed/python generators) and build them one after another.
- Log findings (what was tried, what moved bytes, dead ends) in `$L/PROGRESS.md` every ~20 min so a restart can resume.
- Append one line to ~/amm100-run/shared/findings.md for any reusable trick (e.g. "520-byte closures = X").

## Stop
Stop when your windows all match, or after you have made no new win in ~2 hours of real attempts.
Return a short structured result (wins, remaining windows, best leads).
