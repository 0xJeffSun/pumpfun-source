# Fees extension admission: source-only proposal

This packet proposes the ordinary Rust admission checks for `extend_fee_config`:

- Own the raw `fee_config` account info instead of wrapping it as an unchecked account.
- Check the owner before borrowing data, with public-key compared values.
- Separate minimum-length and discriminator checks, preserving the length comparison values.
- Use the invocation's program ID for the PDA derivation and retain the compared PDA keys.
- Place those checks in `instructions/admin/extend_fee_config.rs` at the recovered error-origin lines.

The existing resize/event tail is unchanged. Other root source line coordinates are preserved. Padding recovers observed diagnostic coordinates; it does not claim historical whitespace or complete source recovery.

## Exact source scope

`manifest.json` pins the public repository revision
`dcb34a1a89bd11e454daee2ab862d929c5ed50ed` and the exact 36-input
`origins` variant from
[the public buyback-context-origin study](https://github.com/lalalune/pumpfun-source/tree/dcb34a1a89bd11e454daee2ab862d929c5ed50ed/research/fees-buyback-context-origin).
Every parent file has its repository source path and SHA-256. The after-map has
37 inputs. Only three ordinary source overrides are included; the readable patch
reverses to the exact pinned hashes of the two changed parent files and an empty
new file. No selected source or historical evidence is replaced.

## Verify or materialize source only

From this directory:

```sh
python3 -B verify.py
python3 -B test_scope.py
python3 -B materialize.py --parent-source /path/to/exact-parent-source --output /path/to/new-proposal-source
```

Assemble the parent source from the manifest's public revision/path map before
materialization. The materializer checks all 36 parent hashes, writes only the
37 ordinary source inputs into a new directory, and checks the complete result.
It never fetches, invokes a subprocess, compiles, executes a target or overwrites
an existing output. The default verifier checks the three overrides and reversible
patch without requiring an executor or external input.

## Separate native-build recipe

The canonical pinned Linux v1.44 recipe is the public
[recorded build driver](https://github.com/lalalune/pumpfun-source/blob/dcb34a1a89bd11e454daee2ab862d929c5ed50ed/research/fees-buyback-context-origin/recorded-build-driver.py)
for that exact `origins` baseline. Review it before any separate native execution;
it is not run by this packet. Use the complete materialized 37-input workspace,
not the selected repository source. Preserve its unchanged Cargo.lock and manifests:
Anza platform-tools v1.44, `sbpf-solana-solana`, locked/offline release `--lib`
build, panic abort, overflow checks enabled, LTO disabled and one codegen unit.
Keep the pinned math-path remapping and default feature selection unchanged;
do not enable `cpi`, `no-entrypoint` or additional program features. In particular,
Anchor lang/spl remain at 0.31.1 with the manifest's existing `event-cpi` and
`init-if-needed` lang features and token/token-2022/associated-token SPL features.
These are reproduction constraints, not proof that a native build has occurred.

## Evidence boundary

Local development observed 99 corrected application-log comparisons after this
change. **That runtime evidence is unpublished and is not independently verified
by this packet.** No replay cases, receipt excerpts, logs, ELF files, compressed
artifacts or encoded machine bytes are included.

All tools report `runtime_verified=false`, `native_build_verified=false` and
`whole_binary_identity_verified=false`. They verify source integrity only.
The extension business body and full original binary are not byte-identical.
Any native build, static ELF comparison or behavioral acceptance must be performed
separately using reviewed tooling and the pinned source/recipe; none is implied
by a successful default source check.
