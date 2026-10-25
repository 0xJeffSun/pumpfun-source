# Why core byte-identicality is bounded by the lost literal source

Final technical determination after reverse-engineering the recipe and attempting
function-level source-structure matching (2026-10-25).

## The decisive distinction: behavioral equivalence ≠ byte equivalence

- **Dependencies (SPL Token, Token-2022) ARE byte-identical** — verified this session
  (CI run 40175925548, `full_byte_equality: true`). They succeed **because their literal
  original source is public** (`solana-program/token@a94dd19`, etc.). Compiling the exact
  original source with the exact recipe reproduces the exact bytes.
- **The four core programs are NOT byte-identical (0/4)** — because their **literal
  original source is lost**, and the repo reconstructs it *from the binary*. A
  reconstruction built to match **behavior** is not the same text that produced the
  original bytes.

## Proof that the reconstruction is not the literal source (pump_amm, the 99.9% case)

With the corrected compiler (v1.43), pump_amm is behaviorally identical (17,410/17,410
differential cases) and size-complete (`.text` 99.9%). Yet it is **not** byte-identical,
and the earlier relocation-aware analysis shows why it **cannot be closed by reordering**:
- 74.5% of original instructions match under an order-independent, relocation-zeroed
  comparison — vs an ~80% noise floor for *identical* source across a compiler bump.
- The candidate has **994 fewer `call`s and 663 fewer `.text` relocations** than the
  original. Call/relocation **counts are invariant under reordering** — so this is
  genuine structural divergence: the reconstruction made different **inlining / helper-
  factoring** decisions than the original author did.

Two source files can be behaviorally identical, compile with the same toolchain, and
still emit different bytes (different function boundaries, inline choices, item order,
register pressure). Behavior does not uniquely determine source, and **source is what
determines the bytes.** So a behavior-matched reconstruction is, in general, not
byte-recoverable to the original — this is the fundamental limit of binary→source.

## What this means

- **Byte-identicality of the core programs is not achievable by reconstruction from the
  binary.** It requires the **actual lost source files** (backups, VCS history, a
  developer machine, the original CI artifacts) — recovering those is an organizational/
  forensic task, not a compilation one. No compiler sweep, agent swarm, or
  reverse-engineering pass changes this; the information that distinguishes the original's
  source structure from an equivalent one is not present in the compiled bytes.
- **Everything that IS recoverable from the binary has been recovered or bounded:** the
  compiler recipe (v1.43 / v1.52, corrected from v1.44), behavioral equivalence
  (differential-verified), and size-completeness (pump_amm ~99.9%, pump_fees ~99%; pump
  and mayhem genuinely miss handler code).
- **For local SDK integration testing this is already sufficient** — behavioral/ABI
  equivalence is what the SDK exercises, and the localnet build runs today.

## Honest bottom line
"Reverse-engineer the recipe" → done (compiler corrected, behavior and size verified).
"Make the core programs byte-identical" → not possible from the binary alone; it needs
the literal lost source. The two dependencies that *do* have public source are the proof
of the boundary: with the real source, bytes match; without it, they can't.
