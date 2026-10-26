# sol-azy decompilation review of the four original pump.fun binaries

Date: 2026-10-25
Author: automated review (Claude Opus 4.8), independent of the reconstruction authors
Scope: decompiler-backed, honest map of what remains in `evidence/original/{pump,pump_amm,pump_fees,mayhem}/deployed.so`.
This file is advisory only. It does NOT modify the reconstruction, does NOT commit, and makes NO byte-identity claim.

---

## 1. Tool: sol-azy (FuzzingLabs)

- Source: https://github.com/FuzzingLabs/sol-azy
- Commit built: `362327a798e5dad6e12aa9abf3ed9ed52c17ef6a` (2026-03-02, `docs: update readme`; latest `master` at review time)
- Crate version: `sol-azy 0.1` (`Cargo.toml` `version = "0.1.0"`)
- Disassembly/VM backend: `solana-sbpf` pinned to anza-xyz `sbpf` tag `v0.14.2` (sol-azy `Cargo.toml`)
- Built and run entirely OUTSIDE the repo, in an isolated scratchpad dir:
  `.../scratchpad/sol-azy-work/sol-azy` (clone), outputs in `.../scratchpad/sol-azy-work/out/`
- Host toolchain: cargo/rustc 1.94.0, macOS arm64, `cargo build --release`.

### 1.1 Build fix that was required (dependency skew, not a source change to sol-azy)
A clean `cargo build --release` FAILED with:
`error[E0277]: the trait bound RawTable<(K, V)>: Allocative is not satisfied` in `starlark_map-0.13.0`.

Root cause (version skew in the committed `Cargo.lock`): `starlark 0.13.0` and `starlark_map 0.13.0`
both require `allocative = "^0.3.4"` and derive `Allocative` on a `hashbrown 0.14` `RawTable`.
The lock resolved `allocative` to `0.3.6`, which dropped the `RawTable` impl and moved to
`hashbrown 0.16`'s `HashTable`, so the derived impl no longer matched. `allocative 0.3.4/0.3.5`
still use `hashbrown ^0.14.3` and compile.

Fix applied to the throwaway clone only (no sol-azy source edited):
`cargo update -p allocative --precise 0.3.5` (pulls `allocative_derive 0.3.3`, `hashbrown 0.14.5`).
After the pin, `cargo build --release` succeeds; binary `target/release/sol-azy`.

### 1.2 How each binary was run
Disassembly + immediate-value decoding + per-instruction Rust-equivalence annotation:
```
sol-azy reverse --mode disass --out-dir <out>/<prog> \
    --bytecodes-file evidence/original/<prog>/deployed.so --labeling
```
Control-flow graph (demonstrated on mayhem; reduced to post-entrypoint functions):
```
sol-azy reverse --mode cfg --out-dir <out>/mayhem_cfg \
    --bytecodes-file evidence/original/mayhem/deployed.so --labeling --reduced
```
All four binaries load and disassemble cleanly (ELF e_machine 263, SBPFv1). sol-azy resolves
functions, basic blocks, syscalls (e.g. `sol_log_`), and decodes `lddw` 64-bit immediates with
the rodata string they point at.

Note on the other subcommands:
- `reverse --mode decompiler` does NOT exist. sol-azy's "decompilation" is the `rusteq` engine
  (`src/reverse/rusteq.rs`, `translate_to_rust`), which emits a per-INSTRUCTION Rust-equivalent
  string shown inline as a `///` comment (e.g. `r2 = r2.wrapping_add(-16_i32 as i64 as u64)`).
  It is instruction-level semantic annotation, not function-level or compilable source.
- `sast` analyzes Rust SOURCE via `syn` AST + Starlark rules; it does not operate on `.so`
  bytecode, so it is not a decompiler of the originals and was not used to map the binaries.

---

## 2. What sol-azy recovered, per program

Original `.text` sizes (via the on-machine `llvm-objdump v1.52`) and sol-azy disassembly volume:

| Program   | `.text` bytes | file bytes  | disasm lines | immediate-table entries |
|-----------|--------------:|------------:|-------------:|------------------------:|
| pump      | 1,792,208     | 10,485,715  | 233,607      | ~6.6 MB table           |
| pump_amm  | 1,162,040     | 10,485,715  | 151,610      | 1,010                   |
| pump_fees |   799,648     |    948,944  | 104,739      |   767                   |
| mayhem    |   706,744     |    777,408  |  92,223      |   620                   |

The 10,485,715-byte file size of pump and pump_amm is overwhelmingly trailing zero padding of the
on-chain program buffer; the real ELF content (`.text`+`.rodata`+`.data.rel.ro`+dynsym/dynstr) is
~1.8 MB for pump. "Binary size gap" discussions should use `.text`, not file size.

sol-azy's disassembly is complete and well-formed for all four: every function body, basic block,
syscall, and discriminator constant is recovered. CFG export works (mayhem reduced CFG:
`cfg.dot` 3.5 MB, ~9.7k edges/clusters).

---

## 3. Dispatch-reachability: is there handler logic in the originals NOT in the reconstruction?

Method. Anchor dispatch compares the instruction's 8-byte discriminator (loaded with `ldxdw`)
against per-handler constants emitted as `lddw` 64-bit immediates. These constants are NOT
contiguous in the file (the `lddw` encoding splits the immediate across two instruction slots), so
a raw byte search finds 0/56 — but sol-azy DECODES the immediates, so they are directly searchable
in `disassembly.out`. The canonical discriminators were taken from the repo IDL
`work/pump-admin-cto-owned6083-build/pump-idl.json` (56 instructions) and independently verified to
equal `sha256("global:<name>")[:8]` for all 56.

### 3.1 pump  — dispatcher `function_145095` (single function, 1,092 disasm lines)
- All **56/56** IDL discriminators are present as decoded `lddw` immediates, all inside this one
  Anchor dispatcher. No discriminator appears elsewhere.
- Two additional dispatch arms, both Anchor framework built-ins (exact `sha256` sentinels),
  compared with the same `ldxdw [ix]; lddw; jeq` idiom:
  - `anchor:idl`   (bytes `0a 69 e9 a7 78 bc f4 40`) — the Anchor IDL account-instruction family.
  - `anchor:event` (bytes `1d 9a cb 51 2e a5 45 e4`) — the `emit_cpi!` event self-CPI handler.
  The reconstruction is Anchor (`#[program]`, `declare_id!`) and uses `emit_cpi!` across many
  handlers, so both arms are auto-generated by the Anchor macro — accounted for structurally.
- One non-dispatch constant in the function, `0x800000000000001a`, is an error/sentinel value
  stored into a struct field (not compared against instruction data). Same value appears in
  pump_amm/pump_fees dispatchers for the same reason.

So the original pump dispatches **58 arms = 56 IDL + anchor:idl + anchor:event**. No 57th
application handler exists. The ~249 KB `.text` gap is therefore NOT a missing dispatch target.

### 3.2 The one real gap: `set_mayhem_virtual_params` is recovered but NOT wired in the current tree
- `set_mayhem_virtual_params` (disc `3d a9 bc bf 99 95 2a 61`, u64le `0x612a9599bfbca93d`) IS one
  of the 56 and IS dispatched by the original pump.
- Its full handler is recovered in `programs/pump/src/mayhem_virtual_params.rs` — an **untracked
  (`??`) file** with `#[event_cpi] #[derive(Accounts)] struct SetMayhemVirtualParams` and
  `pub fn execute(...)`, keyed on the mayhem `["sol-vault"]` PDA signer.
- BUT neither `HEAD:programs/pump/src/lib.rs` nor the working-tree `lib.rs` declares
  `pub mod mayhem_virtual_params` or wires `set_mayhem_virtual_params` into the `#[program]`
  module. The current `#[program]` block wires **55** handlers; this one is absent.
- Consequence: a build from the CURRENT working tree would dispatch 55/56 IDL instructions and
  would be missing this dispatch arm. This is a WIRING gap, not missing recovered logic.
- Evidence it has been wired/compiled before: a scratchpad candidate
  `.../scratchpad/rc-pump/pump_recovered.so` (and `.../scratchpad/smvp-out/pump_recovered.so`)
  disassembles with all 56 IDL discriminators INCLUDING `0x612a9599bfbca93d`, plus anchor:idl and
  anchor:event. So the reconstruction *can* dispatch all 58 arms; the current branch tree just
  does not include the wiring. (Consistent with the repo's own
  `RECONCILIATION-DROPPED-RECOVERIES-RESTORED.md` and `SET-MAYHEM-VIRTUAL-PARAMS-RECOVERY.md`.)

Recommendation: re-wire `mod mayhem_virtual_params;` + the `set_mayhem_virtual_params` handler into
`programs/pump/src/lib.rs` so the committed tree matches the original's 58-arm dispatch.

### 3.3 pump_amm — dispatcher `function_112495`
- **38/38** reconstruction `#[program]` handlers match a dispatch immediate in the original;
  0 reconstruction handlers are absent from the binary.
- anchor:idl + anchor:event present. No unexplained discriminator-shaped dispatch constant.

### 3.4 pump_fees — dispatcher `function_74730`
- **31/31** reconstruction handlers match; 0 absent.
- anchor:idl + anchor:event present. No unexplained dispatch constant.

### 3.5 mayhem — dispatcher `function_64226` (binary-search dispatch)
- **25/25** reconstruction handlers match; 0 absent. `anchor:event` present.
- mayhem does NOT use a linear `jeq` chain; it uses a BINARY SEARCH over sorted discriminators
  with signed compares (`jsgt`/`jsle`). The "extra" constants sol-azy surfaces are explained:
  - pivot values equal to a real discriminator ±1 (e.g. `...e3` = anchor:event−1,
    `...17b7` = buy_v2−1, `...e632` = sell−1, `buy_pump_swap−1`, `stop_trading−1`,
    `update_admin−1`, `sweep_fees_admin−1`, `reset_stable_deployed−1`,
    `update_max_stable_per_sweep±1`) — these are search bounds, not handlers.
  - four constants (`0x24a7daa7d7e52a05`, `0x85915429a7b0eaa6`, `0x4c67601667a0d45a`,
    `0xa3653d805945034e`) are the four little-endian u64 words of a single 32-byte key compared via
    `jne` BEFORE the search. Reassembled =
    `052ae5d7a7daa724a6eab0a7295491855ad4a0671660674c4e034559803d65a3` =
    base58 `MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e` — the Mayhem program's own vanity
    program ID (a self/CPI key guard). Not an instruction handler.
- No hidden dispatch-reachable handler in mayhem.

### 3.6 Summary table

| Program   | IDL/handler arms | matched in original | Anchor built-ins | unexplained handler arms |
|-----------|-----------------:|--------------------:|------------------|-------------------------:|
| pump      | 56               | 56                  | idl + event      | 0 (but `set_mayhem_virtual_params` not wired in current `lib.rs`) |
| pump_amm  | 38               | 38                  | idl + event      | 0 |
| pump_fees | 31               | 31                  | idl + event      | 0 |
| mayhem    | 25               | 25                  | event            | 0 (binary-search pivots + a `MAyh…` program-ID guard, all explained) |

Conclusion for Task item 3: With the single exception of the UN-WIRED (but already recovered)
`set_mayhem_virtual_params` in pump's current working tree, sol-azy surfaces NO dispatch-reachable
handler/logic in any of the four originals that the reconstruction lacks. The large pump `.text`
delta is confirmed to be structure/inlining/monomorphization, not missing dispatch targets.

---

## 4. Byte-identicality assessment (honest): NO

sol-azy's output CANNOT be recompiled into a byte-identical `.so`, for two independent reasons:

1. sol-azy emits no compilable source. `reverse` produces `disassembly.out`,
   `immediate_data_table.out`, and `cfg.dot`. The `rusteq` "Rust equivalence" is a per-instruction
   annotation string (e.g. `r2 = r2.wrapping_add(-16_i32 as i64 as u64)`) attached as a `///`
   comment to each sBPF instruction — there is no function/type reconstruction and nothing a
   compiler can consume. There is literally no "decompiler output" to feed back to a compiler.

2. Even hand-written Rust recovered from these semantics would not reproduce the bytes. Byte
   identity is fixed by details a semantic decompiler does not recover: exact compiler/LLVM version
   and codegen flags, crate versions and feature unification, monomorphization/instantiation order,
   inlining and basic-block layout, symbol/section ordering, rodata deduplication and ordering, and
   relocation order. sol-azy recovers behavior, not that structure.

Concrete demonstration from this very repo: the behaviorally-complete candidate
`.../scratchpad/rc-pump/pump_recovered.so` reproduces the exact same 58-arm dispatch (56 + idl +
event) yet still differs from the original by `.text` 1,792,208 vs 1,543,240 bytes (~248,968 bytes,
~14%) and by `.rodata`/`.data.rel.ro` sizes and overall layout. Semantic/dispatch equivalence is
demonstrably NOT byte identity. A decompiler, which recovers strictly less structure than a working
recompile, cannot do better.

This is consistent with the repo's own status (`memory/MEMORY.md`: "0/4 byte-identical reality").
sol-azy is useful here as an independent oracle that the reconstruction's dispatch surface is
complete and that no instruction logic is missing — not as a path to byte identity.

---

## 5. Reproduction pointers (artifacts live in scratchpad, not committed)
- sol-azy clone + release binary: `.../scratchpad/sol-azy-work/sol-azy/target/release/sol-azy`
- Disassemblies: `.../scratchpad/sol-azy-work/out/{pump,pump_amm,pump_fees,mayhem}/disassembly.out`
- Candidate disasm: `.../scratchpad/sol-azy-work/out/pump_candidate/disassembly.out`
- mayhem CFG: `.../scratchpad/sol-azy-work/out/mayhem_cfg/cfg.dot`
- Canonical 56-instruction IDL used: `work/pump-admin-cto-owned6083-build/pump-idl.json`
