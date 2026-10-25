> **⚠ RETRACTED (compiler): this document pins v1.43 for pump/pump_amm/pump_fees — that is WRONG.** The ELF `e_machine` header proves v1.44 (original=263 EM_SBF; v1.43 build=247 EM_BPF; v1.44 build=263). See COMPILER-CORRECTION.md. The non-compiler findings (SDK coverage, token-incentive recovery, version boundaries, the lost-source byte-identicality limit) still stand.

# Reverse-engineering the build recipe from binary evidence

User directive (2026-10-25): no stored recipe exists; reverse-engineer it from the
captured binaries. This documents the toolchain fingerprints extracted directly from
`evidence/original/<prog>/deployed.so` and what they pin. Evidence-driven inference +
build verification — not blind brute-force or patching.

## Fingerprints extracted (embedded strings in the original ELFs)

| Signal | pump | pump_amm | pump_fees | mayhem |
|---|---|---|---|---|
| platform-tools build path | `/home/runner/work/platform-tools/platform-tools/out/rust/...` | same | same | same |
| std `RawVec` layout | `alloc/src/raw_vec.rs` (single file) | `raw_vec.rs` | `raw_vec.rs` | `alloc/src/raw_vec/mod.rs` (module) |
| hashbrown dep path | — | — | — | `registry/src/index.crates.io-…/hashbrown-0.15.4/src/raw/mod.rs` |

Interpretation:
- **All four were built with the official Anza `platform-tools`** (the `/home/runner/work/platform-tools/...` path is that project's CI build path baked into its std).
- The **`raw_vec.rs` → `raw_vec/mod.rs` split** is a hard rustc-version boundary (the
  `RawVec` module refactor). pump/pump_amm/pump_fees predate it; **mayhem is a newer
  rustc**. This cleanly separates the four into two toolchain generations.
- mayhem's embedded **`hashbrown-0.15.4`** is a concrete lockfile datum for the newer
  generation.

## Recipe pinned (compiler half)

Combining the fingerprints above with the repo's prior **compiler-family** result
(two complete runtime-helper bodies in Fees match **v1.44** byte-for-byte — a near-
definitive match, stronger than aggregate diff counts):

| Program | platform-tools | rust era evidence |
|---|---|---|
| pump | **v1.44** | `raw_vec.rs` (older) |
| pump_amm | **v1.44** | `raw_vec.rs` (older) |
| pump_fees | **v1.44** | `raw_vec.rs` + exact helper-body match |
| mayhem | **v1.52** | `raw_vec/mod.rs` + hashbrown-0.15.4 (newer) |

**The current candidates already compile with exactly these versions.** So the compiler
half of the recipe is already recovered and in use — it is *not* the thing standing
between the candidates and byte-identicality.

Build flags are also already pinned by the workspace `Cargo.toml`:
`panic = "abort"`, `overflow-checks = true`, `lto = false`, `codegen-units = 1` —
consistent with the originals' pervasive overflow-check panic strings.

## What this means for byte-identicality (the honest reframe)

The ~55% byte gap (84–98% of it in `.text`) is therefore **not** a wrong-compiler
problem. With the compiler and flags already correct, the residual is dominated by:

1. **Incomplete source** — e.g. pump's candidate `.text` is ~19% smaller than the
   original: whole functions (unrecovered/partial handlers and their helpers) are
   simply absent. Absent code can't match.
2. **Function ordering / source organization** — SBF `.text` is laid out in source/
   codegen order. If functions are defined in a different order or the module structure
   differs, nearly every subsequent byte shifts, inflating the raw diff far beyond the
   true semantic difference.

So "reverse-engineering the recipe" resolves the compiler question (done), but
**byte-identicality of the core programs now reduces to completing and correctly
ordering the source**, then rebuilding with the already-known v1.44/v1.52 recipe.
That is the large remaining reconstruction — not a missing compiler flag.

## CORRECTION: the Fees compiler is v1.43, not v1.44 (size sweep)

Building the **same** Fees source with each neighboring platform-tools (only the
compiler changed) gives section sizes vs the original (`.text` 799,648):

| Compiler | ELF extent (orig 873,256) | `.text` (orig 799,648) | raw diff % |
|---|---:|---:|---:|
| **v1.43** | **864,600 (−8,656)** | **791,680 (−7,968, 99.0%)** | 53.4% |
| v1.44 (committed) | 768,848 (−104,408) | 696,856 (−102,792, 87%) | 54.6% |
| v1.45 | 825,064 (−48,192) | 750,536 (−49,112) | 55.9% |
| v1.46 | 825,064 | 750,536 | 55.9% |

**v1.43 matches the original's code size to within ~1% in every section.** The prior
v1.44 selection (based on two exact std-helper-body matches) is a local optimum: those
helpers are evidently identical across v1.43/v1.44, but v1.44 emits ~13% less code
overall, which made the Fees reconstruction look ~104 KB incomplete. Under **v1.43**
the source is ~99% complete (only ~8 KB of `.text` missing — consistent with the known
donation-handler reserve branch + two log messages).

**Consequence:** the dominant residual (~53% raw) is now **function ordering/layout**,
not missing source — because the function *bodies* already match under normalization
(that is the 93%+ handler coverage). Matching the original's function order should
collapse the raw diff toward the small genuine-missing-code remainder. This is the
corrected, tractable path to Fees byte-identicality:
1. compiler **v1.43** (corrected), 2. match function ordering, 3. recover the last ~8 KB.

## Corrected recipe + completeness across the v1.43-era programs

Same size-sweep applied to pump and pump_amm (identical source, compiler varied):

| Program | compiler | `.text` vs original | source completeness |
|---|---|---:|---|
| pump_amm | **v1.43** | 1,160,920 vs 1,162,040 (**−1,120, 99.9%**) | essentially complete |
| pump_fees | **v1.43** | 791,680 vs 799,648 (−7,968, 99.0%) | ~99% complete |
| pump | **v1.43** (best of tested) | 1,546,496 vs 1,792,208 (−245,712, 86.3%) | ~245 KB genuinely missing (its 5 partial + 3 unrecovered handlers) |
| mayhem | v1.52 (era-correct; neighbors untested — only v1.52 installed in that era) | — | — |

(v1.45 is worse for all: pump −331,544; pump_amm −59,928; pump_fees −49,112.)

**Headline:** the committed **v1.44** recipe is wrong for all three older programs; the
real compiler is **v1.43**. Under v1.43, **pump_amm (99.9%) and pump_fees (99%) are
nearly source-complete** — the earlier "~55% different / ~100 KB missing" picture was
largely a wrong-compiler artifact. pump is the one genuinely-incomplete core program
(~245 KB of missing handler code), consistent with its known partial/unrecovered set.

## Full corrected recipe + behavioral confirmation (all 4 programs)

A parallel analysis built each program with the corrected compiler, ran the differential
suites against that build, and measured the true residual:

| Program | corrected compiler | committed was | `.text` vs original | behavior vs original | source completeness |
|---|---|---|---|---|---|
| pump | **v1.43** | v1.44 | 86.3% (−245,712) | 7,921 cases, 0 mismatches* | ~86% — ~245 KB genuinely missing (5 partial + 3 stopped handlers) |
| pump_amm | **v1.43** | v1.44 | 99.90% (−1,120) | **17,410 cases, 0 mismatches** | ~99.9% (size) |
| pump_fees | **v1.43** | v1.44 | 99.00% (−7,968) | **6,147 cases, 0 mismatches** | ~99% (size) |
| mayhem | **v1.52** (confirmed) | v1.52 | 85.74% (−100,816) | 280 cases, 0 mismatches | ~86% — ~100 KB missing (stopped `initialize_mayhem_state` + others) |

\* pump's only behavioral divergence is the Token-2022 transfer-fee extension paths
(`pump_v3_token_extensions`, 92/126) — **compiler-independent** (identical on the v1.44
build), i.e. the known partial-handler gap, not a codegen issue.

mayhem's **v1.52 is now positively confirmed** (not just era-consistent): v1.48/1.50/1.51
fail because the locked `indexmap 2.14.2` needs Cargo's `edition2024` (Rust ≥1.85), and
v1.53/1.54 dropped the `sbf-solana-solana` rustlib target the installed build driver
needs — so v1.52 is the unique buildable match, corroborated by `hashbrown-0.15.4`,
`raw_vec/mod.rs`, and the crate's `rust-version = 1.89`.

## The honest limit: byte-identicality is NOT just ordering (important correction)

My earlier framing ("the residual is just function ordering") was too optimistic. A
rigorous, relocation-aware instruction-multiset analysis of pump_amm@v1.43 (the most
complete) shows:
- 45.9% of `.text` bytes match in place; **74.5%** of original instructions match under
  an order-independent, relocation-zeroed comparison — the ~28-point lift is content
  that is merely **reordered**.
- **But it is not pure ordering:** the candidate has **994 fewer calls** and **663 fewer
  `.text` relocations** than the original — counts a reorder pass cannot change. That is
  genuine **source-structure divergence** (different inlining / helper factoring).
- Calibration: identical source across a v1.43↔v1.44 compiler bump matches only ~80%
  under the same metric (the metric's noise floor); original-vs-v1.43 at 74.5% sits only
  ~6 points below that floor — **"close, but not the literal original source."**

**Conclusion.** The corrected recipe (v1.43 / v1.52) is a real, verified recovery, and it
proves the reconstructions are **behaviorally faithful and ~99–100% size-complete for
pump_amm/pump_fees** (and genuinely incomplete for pump/mayhem). But achieving raw
**byte-identicality still requires recovering the *literal* original source structure**
(exact inlining/factoring and function order) for every function — plus the missing
handler code for pump/mayhem. That is a different, harder goal than behavioral/size
reconstruction, and it remains open: **byte-identicality is still 0/4.** The compiler
correction removes a large false "incompleteness" signal (the v1.44 undersizing) but
does not by itself close the byte gap.

## Actionable recipe fix for the repo
Switch the pinned compiler for pump / pump_amm / pump_fees from **v1.44 → v1.43** (keep
mayhem at v1.52). The v1.43 builds are behaviorally identical to the committed v1.44
builds on every exercised path and are materially closer to the originals in size. This
ripples through the checkpoints' receipt hashes, so it is a team-level change to apply
deliberately, not an in-place edit made under concurrent sibling sessions.
