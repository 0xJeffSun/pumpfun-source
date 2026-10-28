# Cross-contract mechanism catalogue (coordinator-maintained, from all lanes' findings, 2026-10-28)

Residues that look like "pure scheduling / register allocation / block placement" have closed repeatedly through source
form. Before declaring a window source-bound, test the levers below (IR first: every contract has an llc loop that
reproduces its build byte-exactly, so one IR edit costs seconds). Sources: WM/r436/FINDINGS.md, WP/shared/INSIGHTS-R5.md,
WA/shared/findings.md, and the lanes' PROGRESS.md files.

## Alias metadata and reference types (drive scheduling and register allocation)
- Fees, last window (PR #392): rent passed as Anchor `&UncheckedAccount` instead of a `noalias` `&AccountInfo` removed
  scoped-noalias reuse (GVN reused rent.key across a CPI) and reproduced the original register allocation exactly.
- Pump z07: `validate_buyback_fee_recipient(&Pubkey)` (by reference) instead of by value removed an extra 32-byte copy.
- Pump z08: a callee in a separate path crate has no inferred `nocapture`, so `memcpy(tmp); call f(&tmp)` is not elided.
- `pub` (external) helpers block ArgumentPromotion; `pub(crate)`/private helpers get by-reference params rewritten.

## Locals, lifetimes and the stack frame
- A plain `let k = acct.key();` Pubkey local loses its StorageLive/StorageDead markers (MIR copy propagation): no
  lifetime markers, so StackColoring cannot merge its slot (frame grows 32 B). The same value as an inline temp in the
  struct literal keeps them. Use this in both directions (Mayhem O0077/O0079; AMM 0x23e40 needs the removal direction).
- A let-bound Copy local used in a struct literal AFTER an operand containing `?` gets a MIR temp right before the
  aggregate, so MemCpyOpt moves its memcpy first (Mayhem O0079 quote_mint).
- Nesting a call + `?` inside a larger statement keeps its Result temp alive to statement end (stack coloring and
  error-block order); an inner block `{ ... }` ends temporaries before the next `?` (AMM liquidity, A-6, boost).
- Struct-literal field order and per-field scalar lets in a fixed order decide event store order (Mayhem O0079 order).
- MIR local declaration order drives same-size stack-slot permutations (AMM admin: `match len { 0 => {}, 8 => {...} }`).

## Inlining, linkage, and which function owns the code
- Handlers inside a private `mod` are internal and get inlined into the `#[program]` fn; re-export them
  (`pub use instructions::{...}` / `pub use x::execute as ...` on an existing lib.rs line) to keep them standalone
  (AMM liquidity, multi-hop execute).
- `#[inline(always)]` on a per-instruction handler called from the `#[program]` fn reproduces MIR-inliner shape (AMM
  creatorfees); forwarding `fn h(ctx) { m::f(ctx) }` moves Context by value and SROA hoists loads (AMM incentives).
- A shared generic helper gives one monomorph per type argument; a trait with early/late hooks lets two callers share
  source but get different code (Mayhem TradeCap). A separate non-generic helper decouples their schedules entirely.
- Coldness: an error path routed through a `#[cold]` helper changes inline cost thresholds and block frequency, which
  decides out-of-lining (closure kept as its own window) and block placement (AMM A-1 0x19138; Pump lib 0x80df8 needs a
  <2%-frequency edge). `chunks_exact(5)` kept a slice-error closure out of line (AMM multi-hop).

## Control-flow shape
- `if let Err(e) = x { return Err(e); }` instead of `?` reorders block creation and flips branch polarity (AMM A-6).
- An explicit `return Ok(())` inside the event's scope gives the original's data-first error edge; apply per window
  only, where the original is data-first (Pump; a sweep lost 9 windows).
- O0076: a branch survives only if an arm contains a non-speculatable op; in source that was a helper call in the arm.
- `require_*!` evaluates operands twice: bind with `let` first. `u8` vs `bool` params show as `and64 rN, 0xff` (AMM).
- `const NONE: Option<T> = None` stores zeros for the whole payload, unlike `Ok(None)` (AMM utilmath, Pump z07).

## Whole-ELF layout (after every window matches normalized)
- Mayhem 03:24 (lane mg-M-raw, `claude-mayhem-work/mega/mg-M-raw/`): once all 441 windows were size-equal, a generated
  `ordered.ld` covering `.text`, `.rodata` and `.data.rel.ro` (tools/gen_ordered.py, two-pass build tools/rbuild_raw.py: build,
  read the original's object order, relink) plus 3 line-neutral source edits (lib.rs `mod` order, one handler moved above a
  helper, one inverted `if`) took raw from 223 to 441/441 with zero losses; the whole meaningful ELF then differed in 30 bytes
  (dynamic-symbol order of two syscall imports). Before all windows match, prepare the same recipe and check that every
  already-matched window is "raw-ready" (equal once addresses line up). Fees used the same approach (PR #392).
- Data order follows source item order: `mod` declaration order, item order inside files and which function first emits a
  constant/string decide `.rodata` placement.

## Fast loops
- `clang -O3` on rustc's PRE-optimization IR reproduces the full LLVM pipeline byte-exactly, including the inliner, so
  inline-threshold and coldness hypotheses need no build slot (Pump lane mg-P-sp1: `claude-pump-work/lanes/mg-P-sp1/clo.sh`).
  The post-opt `llc` loops reproduce the backend only.

## Coordinates (part of the normalized bytes)
- `error!`/`require!` record the macro's first line and the file path length; `#[derive(Accounts)]` and `#[account]`
  lines are baked into try_accounts/try_deserialize windows. Lay files out so these land on the original lines
  (Pump uses `// layout-pad` balance; AMM allows comment/doc positioning devices; Mayhem allows no padding).
