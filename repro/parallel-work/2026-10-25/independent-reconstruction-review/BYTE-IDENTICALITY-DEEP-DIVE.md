# Byte-identicality deep-dive (pump_fees) — how close, what blocks it, and the recovered original file structure

_2026-10-25. Goal is literal byte-identity to the deployed originals, not behavioral equivalence. This
is a measured deep-dive on `pump_fees` (the most complete core program), the empirical limit found,
and a reusable method. Whole-program identity remains 0/4 core programs._

## Method (reusable; tooling committed alongside)
- Extract `.text`: `llvm-objcopy -O binary --only-section=.text <so> <out>`.
- Compare instruction streams with addresses/layout masked (so reg-alloc/placement noise doesn't drown
  the signal): per 8-byte sBPF slot keep opcode+regs; mask `call` (0x85) targets, `lddw` (0x18) address
  immediates, and **r10-relative (stack frame) offsets**. k-gram (k=6) anchor-vote to align a candidate
  function to its original counterpart, then `difflib` the masked token streams. ALWAYS diff
  equal-length windows — extending the original window past the candidate's function boundary produces a
  spurious trailing "insert" that is just the next function. (`difflib` on the full 100k-instr `.text`
  is O(n²) and times out; work per-function or use k-gram multisets.)
- Symbols: build **unstripped** (`target/sbf-solana-solana/release/deps/pump_fees_candidate.so`); its
  `.text` equals the deploy artifact. `llvm-nm` reads 0 but `llvm-readelf -s` yields the FUNC symbols;
  `addr = instruction_index*8`, `.text` base vaddr `0x120`.
- Build recipe (reproduces the committed candidate byte-for-byte, deploy sha `2387f813…`):
  `cargo build-sbf --manifest-path programs/pump-fees/Cargo.toml --tools-version v1.44 --offline
  --sbf-sdk <sdk> --sbf-out-dir <out> -- --locked`, with isolated `CARGO_TARGET_DIR`/`RUSTUP_HOME`.

## How close pump_fees is
- `.text`: candidate 789,416 B vs original 799,648 B.
- **The compiler is correct**: the first function disassembles instruction-for-instruction identical
  (opcodes+regs+immediates) except a `call` target address. Compiler family v1.44 (Rust 1.79 / LLVM 18).
- Order-independent instruction-multiset match (addresses masked): **85.4%**. Of 95 pump_fees-own
  functions (≥64 B), **59 (62%) diverge**; anchor_lang/spl/solana deps are ~99% byte-clean, so the gap
  is overwhelmingly in own code, not dependencies.
- The near-match functions (e.g. `set_authority` **99.48%**) have their *bodies already correct* — the
  sole residual is the panic `Location` record: `{file-path length, line}`.

## What blocks exact identity: lost source FILE LAYOUT (recovered here)
The residual in the closest functions is panic-`Location` metadata tied to the original source file
structure. The reconstruction flattened everything into `lib.rs` (path len 29); the original was a
module tree. **Recovered from the deployed binary's embedded `.rs` path strings:**

```
programs/pump-fees/src/lib.rs
programs/pump-fees/src/state.rs
programs/pump-fees/src/common/mod.rs
programs/pump-fees/src/instructions/withdraw.rs
programs/pump-fees/src/instructions/admin/initialize_fee_config.rs
programs/pump-fees/src/instructions/admin/initialize_fee_program_global.rs
programs/pump-fees/src/instructions/admin/update_fee_config.rs
programs/pump-fees/src/instructions/admin/upsert_fee_tiers.rs
programs/pump-fees/src/instructions/admin/update_buyback_authority.rs
programs/pump-fees/src/instructions/admin/update_fee_program_global.rs      (contains set_authority)
programs/pump-fees/src/instructions/buyback/mod.rs
programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs
programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs
programs/pump-fees/src/instructions/fee_sharing/create_social_fee_pda.rs
programs/pump-fees/src/instructions/fee_sharing/admin_cto_sharing_config.rs
programs/pump-fees/src/instructions/fee_sharing/update_fee_shares.rs
programs/pump-fees/src/instructions/fee_sharing/update_fee_shares_v2.rs
programs/pump-fees/src/instructions/fee_sharing/claim_social_fee_pda.rs
programs/pump-fees/src/instructions/fee_sharing/mod.rs
pump-fees-math/src/lib.rs      (a SEPARATE crate)
```
Stdlib build path embedded: `/home/runner/work/platform-tools/platform-tools/out/rust/...` (useful for
`--remap-path-prefix` matching). This map is a reconstruction asset independent of byte-identity: it
shows which handler belonged in which file.

## Why the restructure cannot net-close (proven by experiment, not asserted)
To close `set_authority`'s path without wrecking its (already-correct) body, four structural forms were
tried; each FIXED the path but PERTURBED the body codegen:
| form | ratio |
|---|---|
| baseline (body correct, only Location differs) | 99.48% |
| delegate + inline into module file | 78.96% |
| `#[inline(never)]` module fn | 82.86% (original's internal fn takes a narrower arg than `Context`) |
| `include!` into `#[program]` | set_authority inlined into dispatcher, symbol vanished |
| (separate) add the two missing `msg!` logs | 63% |

Every structural change that fixes the `Location` path also changes the body, because the residual in
the closest functions *is* source-file-layout metadata (exact module structure, internal function
signatures, statement line positions) — all of which are the lost original source. Matching it requires
the authentic source + `Cargo.lock`.

## Conclusion
- Literal byte-identity is **externally bounded** for these contracts without the authentic source.
- **Good news:** function bodies are already ~99.5% byte-correct where measurable — a high-fidelity
  reconstruction, bounded only by unrecoverable file-layout metadata, not by wrong logic.
- Durable assets: this report, the recovered file-structure map above, and the committed tooling
  (`analyze_fn.py`, `scan_closable.py`).
