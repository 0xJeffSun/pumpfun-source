# Metaplex Token Metadata: whole-artifact byte identity (lane deps-metaplex, 2026-10-27)

**The captured Metaplex Token Metadata program is now reproduced byte-for-byte from ordinary Rust
source.**  All 1,251 of 1,251 inferred function windows are raw-identical, and every
section matches. The raw 707,448-byte ELF equals the captured image's prefix. The captured image's
remaining 86,543 bytes are all zero, so appending 86,543 zeros gives the full 793,991-byte payload.
That padded image has SHA-256 `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`,
the original's own hash. No instruction, relocation, header or padding byte was patched.

Review qualification: the 707,448-byte stripped ELF is independently confirmed to
equal the captured prefix. The 86,543-byte zero extension is a separately generated
allocation image, not unchanged compiler output or a loader reproduction. The
packet retains repeat-build hashes, but not the unstripped compiler outputs;
this review verifies the stored artifact and source transformation, without a
fresh compiler run. Historical source spelling and selected promotion remain open.

| | frontier `metaplex-owned-uses-20261026` | this packet |
|---|---:|---:|
| raw-equal function windows | 1,250 / 1,251 | **1,251 / 1,251** |
| normalized-equal windows | 1,250 / 1,251 | **1,251 / 1,251** |
| unmatched windows | 346 (`process_utilize`) | **none** |
| differing allocation positions | 80 (79 `.text`, 1 `.rel.dyn`) | **0** |
| `.text` bytes inside raw-matched windows | 622,936 / 628,040 | **628,040 / 628,040** |
| equal `.text` byte positions | 627,961 / 628,040 | **628,040 / 628,040** |
| whole allocation equal | false | **true** |
| raw ELF SHA-256 | `0b9e2666…` | `99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff` |
| padded allocation SHA-256 | `1ee425d0…` | `31f0a627…` (= original) |

Newly matched window: ordinal 346, `process_utilize`, file/vaddr range `[236632, 241736)`
(`0x39c58..0x3b048`, 5,104 bytes). The single `.rel.dyn` byte was a consequence of that window:
the Location-load `lddw` sat one instruction earlier. It now matches with no separate change.

## The source change

`zero-use-guard.patch` (one hunk, `processor/uses/utilize.rs`). It is applied to public upstream
`metaplex-foundation/mpl-token-metadata@17e99434af5ead3e989c08f32af33609821d0bc0` after the frontier's
`base-source.patch` and `coordinate-only.patch`, and it replaces the frontier's `owned-uses.patch`:

```rust
    let mut metadata = Metadata::from_account_info(metadata_info)?;
    let metadata_uses = metadata.uses.unwrap();          // upstream line, moved value
    let must_burn = metadata_uses.use_method == UseMethod::Burn;
    if number_of_uses == 0 {                             // new: standalone zero-use check
        return Err(MetadataError::NotEnoughUses.into());
    }
    if number_of_uses > metadata_uses.total || number_of_uses > metadata_uses.remaining {
        return Err(MetadataError::NotEnoughUses.into()); // upstream guard, unchanged
    }
    let remaining_uses = metadata_uses                   // upstream checked subtraction, unchanged
        .remaining
        .checked_sub(number_of_uses)
        .ok_or(MetadataError::NotEnoughUses)?;
```

Against upstream, the complete Utilize delta is now only:
- the token-standard check and import (base patch);
- the four blank leading lines that place the unwrap diagnostic at line 85, column 39 (coordinate patch);
- this one added zero-use `if`.

See `utilize-vs-upstream.patch`. The frontier's `.clone()` and the `usage` rename are gone, and
upstream's own `metadata_uses` / moving `unwrap()` produce the inline 24-byte copy.

Semantics are unchanged from the frontier. For every u64 request, zero, above-total and
above-remaining requests return `NotEnoughUses` (custom 86) before any state change, and the
checked subtraction cannot fail after the guard. The same check style (`number_of_uses == 0 || …`)
already exists in the recovered `approve_use_authority`. These are source choices that reproduce
the bytes; they do not authenticate historical spelling. Upstream `main` (`024a6f45…`, checked
2026-10-27) and the `immutability` branch still carry the unpatched file `f495c338…`.

## Why it works, and why the earlier forms could not

Diagnosed with lane-local builds that emit MIR, named LLVM IR and per-pass dumps
(`diagnostics/`; none change the binary, as verified by hash):

1. **BPF cannot fix branch polarity after instruction selection.** LLVM 15's
   `BPFInstrInfo::analyzeBranch` returns "unanalyzable" for every conditional branch. Block placement
   and branch folding can delete a `JA` to the next block, but cannot invert a conditional.
   SelectionDAG inverts a branch only when its *true* target is the next block at ISel time.
2. **The original's `JGE remaining,n -> success` with the error block falling through** therefore needs
   one condition: when the remaining-use test is selected, its failure target must be the block that
   immediately follows it in IR order.
3. **Frontier (`.clone()`, two-disjunct guard + `checked_sub(..).ok_or(..)?`).** The `?` failure is
   a separate, identical error block `bb109` placed after the success block, while the block that
   follows the test is the guard's error block `bb101`. The result is `JUGT n,rem -> bb109 ; JA success`.
   Tail merging later fuses `bb109` into `bb101`, which leaves the extra jump (`diagnostics/*finalize-isel*`).
4. **Unified three-disjunct guard (candidates 11/14).** The whole `||` chain folds into a select chain
   inside the `from_account_info` continuation block, whose layout successor is the unrelated
   `assert_currently_holding(..)?` exit `bb87`. The error block lands after the success path.
5. **This form** (`diagnostics/zero-use-guard-*`, optimized IR):
   - **`exit91`** now ends with only `br (n == 0), bb97, bb99`.
   - **`bb99`**, the `total < n || remaining < n` select chain, is a separate block created after
     `bb87`. It branches `br %or, bb103, bb109`.
   - **`bb103`** is its error block and is `bb99`'s layout successor, followed by the drop tail
     `bb249` and then success `bb109`.
   - **The redundant `checked_sub`** was proven dead by the guard, and its block disappeared.

   ISel splits `bb99`. Its last test's true target is the next block, so it is inverted to
   `JGE remaining,n -> bb109`, with `bb103` falling through into the drop. The zero-check error block
   `bb97` is identical and tail-merges into `bb103`, the surviving fall-through predecessor of the drop.
   That reproduces the original
   `JEQ n,0 -> ERR; JUGT n,total -> ERR; JGE rem,n -> SUCC; ERR; drop; SUCC` exactly.
6. A second spelling, `v02` (zero/total failures and the `checked_sub` folded into one `Option`, consumed
   by `match`), compiles to the *identical* binary. Two different sources reproducing it supports
   reading this as a control-flow-shape result rather than an accident of one spelling.

## Builds

Recipe (identical to the frontier's recorded `command.json`):
- image `solanafoundation/solana-verifiable-build@sha256:43206149…467`, `--platform linux/amd64 --network none`;
- SBF platform-tools v1.37 (rustc 1.68.0-dev, LLVM 15.0.7), mounted read-only;
- registry mounted read-only;
- `cargo rustc --package token_metadata --lib --release --target sbf-solana-solana --locked --offline -- --emit=link`;
- then `llvm-objcopy --strip-all`.

Lane builds additionally ran with `--cpus=2 --memory=3g` under the shared sbf/podman slot locks.
The captured executable was never mounted into a build.

| build | tree | unstripped compiler output | stripped ELF |
|---|---|---|---|
| `build-1` (`v01-move-sepzero-upstream`) | 2 | `d38edf7b…` | `99ee61a5…` |
| `build-2` (`v01-repeat-tree1`) | 1 | `d38edf7b…` | `99ee61a5…` |
| diagnostic (`v01-mir-ir`, + `--emit=mir,llvm-ir`) | 2 | `d38edf7b…` | `99ee61a5…` |

The two exact-recipe builds ran from independent copies of the sources, target directory and cargo
home, and are byte-identical before and after stripping. `strip-receipt.json` records that stripping
inside the pinned image with the v1.37 `llvm-objcopy` (the frontier `build.py` step) yields the same
`99ee61a5…` as the lane's native strip. The local emulated Linux `cargo rustc` recipe had already
reproduced hosted candidate11 exactly (`repro/pump/metaplex-local-linux-research`). The pinned hosted
`cargo build-sbf` workflow was not dispatched; lanes cannot dispatch workflows.

`build-*/` hold the command, compressed log, 812-file source manifest, result and comparison.
`source-manifest.json` differs from the frontier's only in `utilize.rs`.
`source-snapshot.tar.gz` holds all 18 patched files.
`patch-source-inputs.json` binds upstream and patched hashes and the patch sequence.
That sequence (upstream → base → coordinate → zero-use) was re-applied to the upstream blob and
re-hashed (`6860d10e…`).

## Runtime differential (original vs candidate, LiteSVM, signed transactions)

All six existing suites pass with zero mismatches: 147 cases, 294 signature-verified transactions.
- edition: 53;
- uses: 35;
- burn: 21;
- context: 8;
- validation: 18;
- the frontier's 12 owner `utilize` cases (zero, above-total, above-remaining, exact, partial, empty,
  u64 maximum boundaries, Single, terminal and partial Burn).

`run_validation.py` re-runs them with hash-checked, unmodified harnesses. Raw logs and compute units
are excluded, as before. Behavioural equality is now implied anyway, because the padded candidate *is*
the captured program.

## Experiment ledger (lane-local, `SP/lanes/deps-metaplex/out/runs`)

| run | source | result |
|---|---|---|
| `00-baseline-owned-uses` | frontier, unchanged | `0b9e2666…` reproduced (80 differing) |
| `01-ir-baseline`, `03-mir-baseline` | frontier + `--emit=llvm-ir`/`mir` | identical binary; IR/MIR in `diagnostics/` |
| `02-printall-baseline` | frontier + `-print-after-all` (Utilize only) | identical binary; ISel dump in `diagnostics/` |
| `v01-move-sepzero-upstream` | **this packet** | **0 differing, 1251/1251** |
| `v02-move-option-match` | `Option` + `match` spelling | identical to v01 (`99ee61a5…`) |
| `v01-repeat-tree1` | this packet, other tree | identical (`99ee61a5…`, compiler output `d38edf7b…`) |
| `v01-mir-ir` | this packet + `--emit=mir,llvm-ir` | identical; IR/MIR in `diagnostics/zero-use-guard-*` |

Before this lane, prior `work/rea-metaplex-*` trials and hosted candidates 12–14 were measured
negative. They covered:
- `clone`, `as_ref`, `cloned`, `take`, field destructuring, manual clone and `Copy` derives;
- `let … else`, `likely`/`unlikely` hints, positive-`if` and tail-guard forms;
- unified guards and `must_burn` placement.

Every one either lost windows or kept the extra `JA`; the mechanism above explains all of them.
The 26 + 8 local Linux cases in `repro/pump/metaplex-local-linux-research/cases` also failed.
Every one of them rewrote upstream's `total || remaining` guard: zero folded into it, all three
checks split into separate returns (`cfg-separate-returns` → candidate12), reordered, eager `|`/`&`,
positive forms or hints. None kept that guard intact with the zero check as its own statement.
Also measured on the way: the first local rebuild silently reused a stale `token_metadata` artifact,
because the copied sources kept old mtimes (hash `d5c2968c…`). `tools/build_variant.py` now touches
the crate sources and deletes the cached artifacts before every build. Separately, earlier trials
had shared one target directory concurrently. This lane used two private trees.

## Reproduce

```sh
work/test-env/bin/python -B research/claude-deps-metaplex-20261027/verify.py        # offline check
work/test-env/bin/python -B research/claude-deps-metaplex-20261027/run_validation.py # runtime suites
```

To rebuild:
1. Apply `base-source.patch`, `coordinate-only.patch` (both in `repro/pump/metaplex-owned-uses-20261026/`)
   and then `zero-use-guard.patch` to upstream `17e99434…`.
2. Run the frontier's `build.py` recipe (`tools/build_variant.py` is the lane wrapper; it expects
   `REPO/work/metaplex-linux-{sdk,registry}` and a lane-private build tree).

## Not changed

`repro/pump/metaplex-current.json`, `repro/status.json`, scripts and other pinned files are untouched.
Promoting this packet to the current selection is left to the coordinator.

The stale container `lane-dma-metaplex` was only inspected with `podman inspect`, never exec'd,
stopped or modified. It belongs to an earlier session's `deps-metaplex-ata` lane, and its only
run rebuilt candidate11 (`3bbaf27f…`).
