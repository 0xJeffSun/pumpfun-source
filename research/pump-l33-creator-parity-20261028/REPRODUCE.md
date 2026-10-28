# Reproduction

Run from the repository root. No RPC or live Solana transaction is used.

## Complete retained-evidence verification

```sh
uv run --with-requirements requirements.txt \
  python research/pump-l33-creator-parity-20261028/verify.py
uv run --with-requirements requirements.txt \
  python -O research/pump-l33-creator-parity-20261028/verify.py
uv run --with-requirements requirements.txt \
  python -OO research/pump-l33-creator-parity-20261028/verify.py
```

These commands verify the manifest and source composition, retained build
records and ELFs, recomputed 1,035-window inventories, focused and full runtime
receipts, loader provenance, signatures, log classification, and mutation
controls.

Individual audits:

```sh
uv run --with-requirements requirements.txt \
  python research/pump-l33-creator-parity-20261028/measure.py
uv run --with-requirements requirements.txt \
  python research/pump-l33-creator-parity-20261028/audit_focused.py
uv run --with-requirements requirements.txt \
  python research/pump-l33-creator-parity-20261028/audit_full_runtime.py
uv run --with-requirements requirements.txt \
  python research/pump-l33-creator-parity-20261028/test_negative_controls.py
```

## Source reconstruction

Copy the immutable L33 source into an isolated directory and apply the combined
patch from the directory that contains `programs/pump`:

```sh
repo=$PWD
cp -R research/claude-pump-integration-20261027/r37-layout-33/source /tmp/l33-creator-parity
(cd /tmp/l33-creator-parity && \
  git apply "$repo/research/pump-l33-creator-parity-20261028/source.patch")
```

When using another checkout path, set `repo` to that checkout's absolute path.
`verify.py` also applies the #492 and #496 patches sequentially
and requires the resulting bytes to equal this combined patch.

## Rebuilding

The exact invocations, environment, source inventory, compiler/tool hashes,
target-library profile, and output hashes are in each
`builds/*/build-comparison.json`. Rebuild with:

```sh
uv run --python 3.12 scripts/pump_build_verified.py \
  --source-directory /tmp/l33-creator-parity/programs/pump \
  --build-directory /tmp/l33-creator-parity-build \
  --sdk "$AUTHENTICATED_V144_SDK" \
  --cargo-registry-source "$AUTHENTICATED_REGISTRY" \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-source "$AUTHENTICATED_LINUX_V144_TARGET_LIBS"
```

Use two distinct build directories and compare both stripped and unstripped
outputs. The authenticated SDK, registry, and Linux target libraries are local
prerequisites; the packet intentionally does not commit those large caches.

## Runtime replay

The retained executions were produced with `scripts/pump_validate_parallel.py`
and `--captured-loader`, using the final stripped ELF. The full packet preserves
the resulting 44-suite receipt and every suite's loader receipt. Re-execution
requires the existing offline fixture dependencies described by `docs/TOOLING.md`.
The verifier does not need network access and does not trust summary totals in
place of those receipts.
