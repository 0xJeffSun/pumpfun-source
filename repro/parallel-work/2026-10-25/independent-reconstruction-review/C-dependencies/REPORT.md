# Dependency byte-level closure review — Metaplex `Utilize` and ATA

Read-only against captured originals; no binary editing, no brute-force over compiler/flags/paths, no source padding. Disassembly via recorded platform-tools v1.52 `llvm-objdump` (matches `evidence/disassembly-manifest.json`). Every number independently re-derived.

## Summary verdict

| Dependency | Ledger | Independently measured | Root cause | Reachable cleanly? |
|---|---|---|---|---|
| Metaplex `Utilize` | 1,509 (1,477 text + 30 src-coord + 2 reloc) | **1,509 — confirmed** | ONE branch-polarity/block-placement difference from a redundant source disjunct; +30 B panic line-number records | 1,479 B (text+reloc): concrete source fix in hand, **build-verification blocked** (docker down). ~30 B src-coord: **no** |
| ATA | 307 (304 text + 3 reloc) | **307 — confirmed** | Compiler-snapshot mismatch: candidate bpf-tools v1.27 vs deployed Solana 1.10.33 CI; 100% of gap in the single `custom_panic` fn | **Only** with exact 1.10.33 bpf-tools — unavailable offline. No source edit closes it |

Both residuals are compiler-codegen artifacts, not missing/incorrect program logic.

## 1. Metaplex `Utilize` (ordinal 346)

**(a) Measured diff.** Original `deployed.so` (793,991 B, `31f0a627…`) vs candidate-11 (`2c26e081…`): **1,509** differing positions (first 0x3a4d2). Section split confirms ledger: `.text` **1,477** (all inside Utilize window 0x39c58+0x13f0), `.data.rel.ro` **30**, `.rel.dyn` **2**.

**(b) Root cause.** Multiset comparison of the two Utilize dumps (626 instructions / 5,104 B each): identical **except exactly one** instruction —
- orig `JGE if r7 >= r9` (remaining >= n → success)
- cand `JGT if r9 > r7` (n > remaining → error)

Everything else differing is branch/call displacement from the consequent block reorder (same callees). Original first-checks: `n==0`→err, `n>total`→err, then `remaining>=n`→success with error86 inline. Candidate-11: `n==0`→err, `n>total`→err, `n>remaining`→err (all to one sunk block). Maps to candidate-11's redundant guard disjunct `|| number_of_uses > metadata_uses.remaining`, which makes rust 1.69 emit three forward branches and kill the `checked_sub` comparison as dead. The original has only two forward error branches plus the `checked_sub` lowering — i.e. the historical guard had **no** explicit `n > remaining` disjunct. High confidence: the same rust 1.69 toolchain reproduces 1,250/1,251 windows byte-for-byte, so the lone divergent function is a source difference. The 2 relocations and 30 `.data.rel.ro` bytes (panic `Location` line numbers, columns match) are consequent/formatting.

**(c) Progress.** Minimal behaviour-preserving source change: **drop `|| number_of_uses > metadata_uses.remaining`**, letting `checked_sub(...).ok_or(NotEnoughUses)?` enforce the bound. Artifacts: `utilize.candidate11.rs`, `utilize.proposed.rs`, `utilize.proposed.patch`. Predicted to close 1,477 text + 2 reloc = **1,479** bytes.

**(d) Remaining.** The 1,479-B fix is a specific, testable, non-brute-force hypothesis, **unverified** — the faithful build needs `solana-verifiable-build` + `RUSTUP_TOOLCHAIN=1.69.0` and the **docker daemon is down** here; the local v1.52/rust-1.89 toolchain canonicalizes both guard forms so cannot verify. The ~30 source-coordinate bytes are **not reachable** without fabricating source whitespace (forbidden).

## 2. Associated Token Account

**(a) Measured diff.** Original `deployed.so` (105,032 B, `6804554e…`; = official `associated-token-account-v1.1.0` release, CI Solana 1.10.33) vs best candidate build-2 (commit `f5ce86d4`, `ba8dd8a4…`): **307** diffs — `.text` **304**, `.rel.dyn` **3**. Confirms ledger.

**(b) Root cause.** All 304 text bytes lie inside the single `custom_panic` function (0x59f8; diff range 0x6fb9–0x9ce4): register allocation, branch displacements, relative call displacements to the same callees — no logic change. `custom_panic` is the entrypoint-macro panic handler + `core::fmt` helpers; its codegen is fixed by the bpf-tools snapshot. The 3 relocations point into reordered `custom_panic` blocks (consequent). ATA **program logic is byte-identical** (first diff 0x6fb9 is above entrypoint/processor). Candidate-1 (`c00194d2`) differs 1,199 B starting inside program logic → wrong source; `f5ce86d4` is correct source. Signature = compiler-snapshot mismatch: candidate built in 2024 `solana-verifiable-build` → bpf-tools v1.27 (rustc 1.59.0-dev, LLVM 13); deployed built by SPL CI on Solana 1.10.33 (earlier bpf-tools).

**(c) Progress.** Isolated 100% of the ATA gap to `custom_panic`; proved program logic byte-identical under `f5ce86d4`; named the responsible recipe element (bpf-tools v1.27 vs Solana 1.10.33).

**(d) Remaining.** Needs the exact Solana 1.10.33 bpf-tools (evidence-directed, since the deployed binary *is* the 1.10.33 release) — **blocked**: not cached here (only v1.43/v1.52), docker down, exact version needs network. No source edit closes these 307 bytes.

## Artifacts (in this folder)
`bytediff.py`, `elf_classify.py`, `utilize_multiset.py`; `metaplex-bytediff.txt`, `metaplex-section-classify.txt`, `metaplex-utilize-multiset.txt`; `utilize.candidate11.rs`, `utilize.proposed.rs`, `utilize.proposed.patch`; `reduction/` (guards.rs/.o/.objdump.txt); `ata-section-classify.txt`, `ata-objdump.diff`, `ata-original.objdump.txt`, `ata-candidate2.objdump.txt`; `key-decoded-evidence.txt`.

_Report body authored by the parent session from agent C's returned text (the harness blocked the subagent from writing `.md`); all evidence artifacts were written by the agent directly._
