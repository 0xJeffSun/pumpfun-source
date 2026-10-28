# Safe-Rust Mayhem initializer form (artifact-identical) — lane mayhem-a

**Headline: an ordinary safe-Rust source form of the O0193 initializer reproduces the
current 432-window Mayhem artifacts byte for byte.** It replaces the parent's
`#[repr(C)]` / `MaybeUninit` / `unsafe { assume_init_ref() }` construction with plain
Rust and changes no output byte: stripped `73dff97e65535ce7d2552ba6f29f94fe0e08ebd414a51871a81c6cba2d7d6168`
and symbols `440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903`, identical
to the parent's published `builds/current` ELFs. **No window count changes** (432/441
normalized, 100 raw-local, 9 unmatched / 107,952 B). Credit for recovering the O0193
window itself belongs to
[`mayhem-initializer-current-recovery-20261027`](../mayhem-initializer-current-recovery-20261027/README.md);
this packet contributes a more plausible source form for the same bytes.

Parent: [`research/mayhem-quotes-current-recovery-20261027`](../mayhem-quotes-current-recovery-20261027/README.md)
(rebuilt byte-for-byte in this lane from its 67 verified inputs: initializer-current
`source.tar.gz` + ownership-composition `sources/qualified.rs` + sell/quote `overrides/`).

## The exact source change (only `src/state.rs`; lines 531/532 unchanged)

```diff
--- a/src/state.rs
+++ b/src/state.rs
@@ -525,12 +525,12 @@
 
 
 #[inline(always)]
-fn initialize_state(mint_key:&Pubkey, params:&crate::GlobalParams, state:&mut MayhemState)->Result<()> {
+fn initialize_state(mint:&InterfaceAccount<'_, Mint>, params:&crate::GlobalParams, state:&mut MayhemState)->Result<()> { let mut mint_key=Pubkey::default(); let mint=mint.to_account_info(); mint_key=mint.key();
 
     let duration_hours=params.field_6 as i64;
     let now=                 Clock::get().unwrap().unix_timestamp; state.field_8=now as u64;
     state.end_timestamp=       now+duration_hours*3600;
-    state.mint=*mint_key;
+    state.mint=mint_key;
     state.field_56=0;
     state.field_89=now as u64;
     state.flag_88=false;
@@ -544,8 +544,8 @@
 }
 
 
-pub fn initialize(ctx:Context<crate::InitializeMayhemState>)->Result<()> { let mut snapshot=InitMint {key:std::mem::MaybeUninit::uninit(),info:ctx.accounts.mint.to_account_info()}; snapshot.key.write(snapshot.info.key()); initialize_state(unsafe { snapshot.key.assume_init_ref() }, &ctx.accounts.global_params, &mut ctx.accounts.mayhem_state) }
-#[repr(C)] struct InitMint<'info> { key:std::mem::MaybeUninit<Pubkey>, info:AccountInfo<'info> }
+pub fn initialize(ctx:Context<crate::InitializeMayhemState>)->Result<()> { initialize_state(&ctx.accounts.mint, &ctx.accounts.global_params, &mut ctx.accounts.mayhem_state) }
+
```

Full file: `layers/initializer-safe-form/source/src/state.rs`; all 67 input hashes:
`layers/initializer-safe-form/source-inputs.json` (only `src/state.rs` differs from the
parent).

## Why this is the more plausible original form

- It is ordinary, idiomatic safe Rust: a private `#[inline(always)]` helper that takes the
  mint account by reference, derives its `AccountInfo`, reads the key and fills the
  state. No `unsafe`, `MaybeUninit`, `#[repr(C)]` layout control or snapshot struct is
  needed; a 2025 Anchor program is far more likely to contain the former than the latter.
- The two codegen properties the parent forces through layout tricks follow from normal
  compiler behavior here (checked with MIR/IR dumps, `tools/mirdump.sh`/`irdump.sh`):
  * passing `&mut MayhemState` into the helper keeps the key copy's destination pointer
    in the pre-overflow-check block (InstCombine only sinks into an immediate successor),
    giving the original's unfolded `r3 = r7+0x160` descending copy and `xor; jeq X,1`
    overflow test;
  * rustc renumbers MIR locals by first use after copy propagation: an SSA key local is
    replaced by the later call temporary, but the non-SSA
    `let mut mint_key = Pubkey::default(); … mint_key = mint.key();` keeps the key as the
    lower-numbered local, so its alloca is laid out deepest (key, then AccountInfo, then
    Clock), as in the original. The dead default store is removed by the optimizer.
- Behavior is identical by construction (identical ELF), so the parent's runtime evidence
  (6,636 trade and 69 initializer comparisons on `73dff97e…`) applies unchanged.

## Verify (standard library only; no HOME, compiler, VM or network)

```sh
python3 -I -B research/claude-mayhem-a-20261027/verify.py
python3 -I -B research/claude-mayhem-a-20261027/test_verify.py   # 5 tamper cases must fail
```

It checks that the shipped `layers/initializer-safe-form/artifacts/*.so.gz` equal the
parent's `builds/current/*.so.gz` byte for byte, that applying `source.patch` to the
parent's `src/state.rs` reproduces the shipped `source/src/state.rs` exactly (and its
recorded hash), that the other 66 inputs are unchanged, and that the initializer region
contains no `unsafe`/`MaybeUninit`/`repr(C)`. It also checks that the recorded build
(`builds/recovered/launch.json`) used exactly these 67 safe-form inputs (`src/state.rs`
`26f586df…`). It checks that `result.json` records a clean build producing the stripped and
symbol hashes above, and that the packet's file inventory equals `manifest.json`. It
passes under `env -i HOME=<empty dir>`.
Build record: `layers/initializer-safe-form/builds/recovered/` (command, environment,
link map, compiler log; `tools/mbuild.py` qualified mixed-SDK recipe).

Controls on the way (ordinary source; none closes O0193 alone): A (early `mint.key()`
local) 960 B but frame/copy/overflow differ; B (key read before the clone) right frame,
wrong copy order; C/D (explicit `&mut *` deref) identical to A; E (field_89 between the
i128 zeroings — needed, otherwise MemCpyOpt merges them into one memset); F1/G/H
(deferred-init key forms) renumbered like A; K1 (non-SSA key without the helper) right
frame, copy-out/overflow differ; C1 (non-SSA key inside the parent control's
`AccountInfo`-taking helper) only the frame differs; C2 (key passed by value) reverts to
the control; C4 = this form (first measured on the sizing-panic parent at 430/441).

## Not included: allocator-context reproduction (Layer B)

The lane also measured a CONDITIONAL allocator compilation context on the 432 parent
(raw-local 100 -> 141, no losses). That context is a dead-code event parser that the
linker discards. Its 14-suite replay covered 6,636 comparisons with 0 mismatches. It is
an independent re-derivation of compositions already on main (78dfdbca8, 13c846906):
not recovered source and not a gain. It is not part of this packet. Its ~74 MB of
evidence and measurement tools stay on branch `claude/mayhem-a-20261027` at
`3b84764ed`.

## Build recipe

Same compiler/target/linker recipe as the parent: Mac v1.54 `rustc`/`cargo`
(`c58ec8ad…`/`dc5107a8…`) with the 26 official Linux v1.54 `sbpf-solana-solana`
rlibs (each verified against the official archive `fcc41631…` hashes recorded in
`research/mayhem-sell-quote-call-recovery/provenance/archive-check.json`), the
parent's unchanged qualified `ordered.ld` (rustc's default script is checked
byte-equal to the parent's `default.ld` before substitution), v1.52 `llvm-objcopy
--strip-all`. `tools/mbuild.py` is the driver; `builds/recovered/launch.json`
records the exact command and environment. Source = the parent's 67 inputs with `layers/initializer-safe-form/source.patch` applied
(`layers/initializer-safe-form/source-inputs.json` lists all 67 file hashes).
