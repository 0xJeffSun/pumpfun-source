# Fees ATA validator without `#![feature(try_blocks)]`

The accepted ATA recovery ([fees-ata-prefix-integration](../fees-ata-prefix-integration/README.md), carried into
[fees-extend-integration](../fees-extend-integration/README.md)) reproduces the 6,080-byte associated-token validator
(original window 243184) with a typed `try` block. That form needs the nightly `try_blocks` language feature.

This packet replaces the `try` block with stable Rust and keeps the same validator body:

```rust
'create: { let true = associated_account.owner == &anchor_lang::system_program::ID else { break 'create };
    ...   // unchanged require!/create/invoke body
}         // the original `if` closing brace now closes the labeled block
```

The change touches two files and is otherwise exactly the accepted 582-function source:
- `instructions/fee_sharing/mod.rs` removes the `try` wrapper and `creation_result?` and turns the creation `if` into the
  labeled block. No line moves, so every Source line/column record is unchanged.
- `lib.rs` drops `try_blocks` from the crate feature list.

**Result: the stripped Linux ELF is byte-identical to the accepted parent** (`research/fees-extend-integration`
`builds/candidate/candidate.so`, SHA-256 in `claims.json`), so all 582/585 normalized and 200 raw-local matches, the
21,079 readonly bytes, the 105 Source records and the parent's 17,331-case runtime result carry over unchanged. A
second fresh build repeats both outputs. The unstripped symbol-bearing ELF is identical as well
(SHA-256 `ca9e6a93…`), so not even a symbol hash changes. No new window is claimed, and whole-ELF equality remains false.

Why the stable form works: the only difference the `try` block fixed is the invoke-result test (original
`jeq; ja` vs `jne`). With `if cond { .. }` the condition temporary stays live across the body. As a result, the
`require!` error path's first exit block is an empty `StorageDead`, and SimplifyCFG removes it. With
`let true = cond else { break }` the temporary dies before the body, so the error exits reach the non-empty
`StorageDead(expected)` join. That join survives to instruction selection, which emits the original `jeq; ja` placement.
The labeled block plays the same role as the `try` scope. This was found by the parallel Claude lane
`claude/fees-final-20261027` (commit `5c7386c2a`, proved with `llc` on edited IR on the 580-function source). It
also holds on the 583-function Sweep frontier of PR #301, where both forms compile to identical binaries.

Build: canonical Linux v1.44 SDK in the frontier's container recipe (`cargo rustc --release --target
sbpf-solana-solana --locked --offline`, the parent's `ordered.ld` through a linker wrapper, pinned v1.52
`llvm-objcopy --strip-all`); vendored macro at the parent's `/work/next637/vendor/used-public` path.

```sh
python3 -B research/claude-fees100-ata-stable-rust-20261027/verify.py
```

The verifier rejects extra, symlinked or special files and optimized Python. It decompresses the included ELFs and
checks both build receipts. It then checks the stripped artifact against the parent's committed
`candidate.so.gz`, and checks that the overrides contain the labeled block and no `try_blocks` feature.
`core_intrinsics` remains enabled exactly as in the parent.
