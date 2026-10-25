# Dependency byte-identicality — final verdict (CI-proven + locally measured)

_2026-10-25. Closes the open question from FULL-GAP-REPORT §4 ("can ATA / Metaplex be made
byte-identical?") with hard evidence: the verifiable-build CI pipeline
(`.github/workflows/dependency-build.yml`) plus a local byte-diff of every captured original
against its freshest candidate. No assertion here is a size/behavior inference — each row is a
whole-file comparison against `evidence/dependencies/<dep>/deployed.so`._

## Result table

| Dependency | recipe (image / toolchain) | total size | size match | byte-identical | residual | residual shape |
|---|---|---:|:--:|:--:|---:|---|
| **SPL Token** | solana-verifiable-build, pinned CLI image | — | ✅ | **✅ 100%** | 0 B | — (CI `full_byte_equality: true`, run 40175925548) |
| **Token-2022** | solana-verifiable-build, CLI4.0.1 image | — | ✅ | **✅ 100%** | 0 B | — (CI `full_byte_equality: true`, run 40175925548) |
| **ATA** | verifiable-build `ee9ad780`, rust 1.59.0, `cargo build-bpf`, SPL commit `abc63ad9` | 105,032 | ✅ (exact) | ❌ 98.57% | **1,506 B** | 516 scattered runs, largest 14 B |
| **Metaplex** | verifiable-build `43206149`, rust 1.69.0, `cargo build-sbf`, mpl commit `17e99434` + Utilize-guard hypothesis patch | 793,991 | ✅ (exact) | ❌ 99.81% | **1,509 B** | 431 scattered runs, largest 18 B |

(SPL/Token-2022 totals omitted — both reproduce the full capture including zero padding.)

## What the numbers mean

**The two byte-identical dependencies are exactly the two whose authentic source + lockfile are
public and uniquely determined.** SPL Token and Token-2022 build byte-for-byte from their pinned
verifiable-build images — proven in CI run `40175925548` (both `full_byte_equality: true`).

**ATA and Metaplex are now _size-exact_ but not _byte-exact_.** The correct verifiable-build
recipe (exact image, toolchain, and SBF/BPF build mode) reproduces the original's total length
to the byte — Metaplex 793,991 == 793,991, ATA 105,032 == 105,032 — which means the toolchain is
no longer the variable. What remains is **pure address/relocation drift**:

- Metaplex: 1,509 differing bytes = **0.19%**, spread over a 432,831-byte span in **431 tiny
  contiguous runs**, none larger than 18 bytes.
- ATA: 1,506 differing bytes = **1.43%**, spread over a 97,413-byte span in **516 tiny
  contiguous runs**, none larger than 14 bytes.

Hundreds of ≤18-byte diffs scattered across nearly the whole binary, with every large block
identical, is the unmistakable fingerprint of **relocation/address shift from a small upstream
source-ordering difference** — not missing code, not a wrong compiler. One slightly different
item/monomorphization order upstream shifts call targets and relocation values throughout,
producing exactly this speckle pattern. It cannot be closed without the **authentic release
source** (the exact commit + item order the deployed binary was built from).

## Why we cannot just "find the right commit"

This was pursued, not assumed:
- **ATA**: at least 7 distinct source-commit / recipe permutations were built and compared
  (repo history: `199aa74b`, `08e47fb8`, `e948288e`, `49135e81`, `a9090129`, `d6a15d41`,
  `542b1ae1`). The freshest (`abc63ad9`, rust 1.59, `build-bpf`) gets the size exact but still
  leaves the 1,506-byte speckle. No tried commit reproduces the relocations.
- **Metaplex**: commit `17e99434` + the `--metaplex-utilize-positive-guard-recovery` patch
  (CI runs `40188763483`, `40191551052` on `research/metaplex-utilize-guard-20261025`). The
  patch's own manifest scope admits it: _"Reviewed unified-guard dominated-subtraction source
  hypothesis; unaccepted and not historically attributed."_ It is a **plausibility hypothesis**,
  not recovered source — it moved the size to exact but not the bytes.

The search space is the set of authentic-source orderings, which is lost. Each CI attempt is a
guess; the obvious candidates are exhausted. **Continuing to brute-force commit/patch
permutations in CI is not a path to byte-identicality** — it burns compute on a combinatorial
search with no authentic oracle to converge on.

## Verdict

- **Closable and closed:** SPL Token, Token-2022 (public source → byte-identical, CI-proven).
- **Bounded by lost authentic source:** ATA (1,506 B), Metaplex (1,509 B) — toolchain/size now
  exact; residual is relocation drift from source item-ordering that is not recoverable from the
  binary. Same category (b)/(d) wall as the four core programs.
- **The durable fix is external:** the exact release-source commit + `Cargo.lock` for the ATA
  and Metaplex builds Pump.fun deployed. With those, both close to zero the same way SPL did;
  without them, 0.19% / 1.43% is the floor this reconstruction can reach.

## Artifacts backing this report
- CI: `gh run view 40175925548` (SPL+Token-2022 success), `40191551052` / `40188763483`
  (Metaplex), `40149599637` (ATA).
- Local diffs computed against `evidence/dependencies/{associated_token,token_metadata}/deployed.so`.
- Downloaded candidate ELFs + `comparison.json` + `source.patch` retained from each run's
  uploaded artifact.
