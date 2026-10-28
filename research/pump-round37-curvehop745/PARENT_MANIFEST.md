# Preserve both authenticated parent manifest forms

## Current baseline and attribution

This change is based on `research/pump-round37-curvehop745` at immutable main commit [`345f43b93ae2c944bfd04252c79636f3c197ea76`](https://github.com/lalalune/pumpfun-source/tree/345f43b93ae2c944bfd04252c79636f3c197ea76/research/pump-round37-curvehop745). That upstream version already contains the `member_manifest` exact-suffix conversion for the public standalone archive. It also resolves test temporary directories before passing them to the path guards. Both fixes are preserved and are not claimed as new work here.

Fresh baseline tests confirm that current main already handles the unmodified public parent. The remaining compatibility gap is a previously prepared workspace-member manifest. The earlier accepted packet at `fe014b408166f07f99761164c3041a57cecd0188` accepted that representation; current main requires the standalone suffix instead.

## Exact inputs

The parent is `repro/pump/main-contract-round37-20261027` at immutable commit `b855ede024ac3bac603405db1d874ee58e651b38`. Both manifest hashes are already recorded in its authenticated `CHECKPOINT.json`:

| Parent representation | Bytes | Checkpoint field | SHA256 |
|---|---:|---|---|
| Public `primary/Cargo.toml`, standalone | 637 | `primary_source_sha256["Cargo.toml"]` | `7a1d296cd7b25bb0f6ea89a5fc7616f43a94fb75027fdc329e27f99305ae2dad` |
| Workspace member | 538 | `source_sha256["programs/pump/Cargo.toml"]` | `93dd3a2873fbd8dce980b09bce1946f1d0e6b24c8f00db696fe3a3cd5de191fe` |

The materializer still requires checkpoint SHA256 `58a87eb3e297a2ab67070b8a27997c2a7ed83de907139490a3a6c541c0ad838b` and its unchanged workspace source map. Test preparation used a separate copy whose sole changed file was `primary/Cargo.toml`, containing the exact pinned workspace-member bytes; the original archived parent was preserved.

## Narrow compatibility change

`member_manifest` first accepts an already prepared workspace-member manifest only if its complete digest matches the existing source pin. Otherwise it checks the complete standalone digest against the authenticated checkpoint and preserves upstream's exact suffix and single-section-count checks. It then removes the same 99-byte suffix in memory and rechecks the unchanged workspace-member pin.

The explicit standalone digest is a defense-in-depth provenance check, **not** a correction for arbitrary manifest acceptance: upstream's exact suffix together with the final workspace digest already constrained the accepted standalone content. No generic TOML normalization, dependency rewrite or relaxed output pin is introduced.

The root workspace manifest, lockfile, compiler/library pins, all seventeen stages and every final source inventory remain unchanged. The path/symlink checks and upstream test `Path(...).resolve()` behavior are retained. No archived input is overwritten.

## Verification

| Tested packet | Unmodified public standalone parent | Exact prepared workspace parent |
|---|---|---|
| Earlier accepted packet, `fe014b40` | Historical preparation issue; not the current baseline | 123 tests pass |
| Fresh main, `345f43b9` | 123 tests pass | 123 tests run, 92 errors rejecting the missing standalone suffix |
| This compatibility change | **131 tests pass** | **131 tests pass** |

The added eight tests cover both manifest forms, unchanged archived bytes, five altered dependency/profile/suffix/trailing-byte subcases, incorrect standalone authentication, exact-suffix enforcement, output-pin enforcement and symlink rejection. Existing tests retain exact source-map checks across all seventeen stages.

```sh
python3 -B research/pump-round37-curvehop745/test_materialize.py \
  --parent repro/pump/main-contract-round37-20261027
```

Only pure source tests were run. No compiler, ELF, VM, CPI, Pump runtime fixture, Mayhem execution, RPC or wallet was used. No new normalized/raw count, compiled-output repeat, historical source identity or whole-binary identity is claimed. Runtime is **NOT RUN** for this change.
