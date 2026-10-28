# Reproduce the L32 creator-diagnostic result

Run the self-contained checks from a fresh repository checkout. The Python environment must provide the pinned packages in the repository `requirements.txt` (including `solders==0.27.1`):

```sh
uv run --with-requirements requirements.txt python \
  research/pump-l32-creator-log-parity-20261028/verify.py
uv run --with-requirements requirements.txt python \
  research/pump-l32-creator-log-parity-20261028/test_negative_controls.py
```

The verifier refuses optimized Python, rejects unlisted files and symlinks, applies the patch to a temporary copy, checks both repeated final ELFs, rechecks all six 1,035-window inventories, verifies every focused and full-corpus transaction signature, and independently audits ordered logs. Historical absolute paths in build and loader records are descriptive provenance; verification uses repository-relative inputs and content hashes.

## Rebuild

Copy the immutable L32 source to ignored storage and apply the patch from the copied source root:

```sh
mkdir -p work/pump-l32-creator-repro
cp -R research/claude-pump-integration-20261027/r37-layout-32/source \
  work/pump-l32-creator-repro/source
(cd work/pump-l32-creator-repro/source && \
  git apply ../../../research/pump-l32-creator-log-parity-20261028/source.patch)
```

Provide the authenticated v1.44 SDK, the verified dependency registry, and the Linux v1.44 SBPF target libraries. The profile specification must hash to `7e2461b5ec54416d6b64508af1e2677f63afd83d35e9a3eeae6ca877ae879f1e`, and its target-library manifest must hash to `a769d7293191d15f5610521fa86ac83dc267be964130369cff116f9ea933cbe8`.

```sh
python3 scripts/pump_build_verified.py \
  --source-directory work/pump-l32-creator-repro/source/programs/pump \
  --sdk /path/to/authenticated/v1.44/platform-tools \
  --registry-home /path/to/isolated/verified-registry \
  --output work/pump-l32-creator-repro/build-1 \
  --workspace-layout \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-directory /path/to/authenticated/linux-v1.44/rust/lib/rustlib/sbpf-solana-solana/lib

python3 scripts/pump_build_verified.py \
  --source-directory work/pump-l32-creator-repro/source/programs/pump \
  --sdk /path/to/authenticated/v1.44/platform-tools \
  --registry-home /path/to/isolated/verified-registry \
  --output work/pump-l32-creator-repro/build-2 \
  --workspace-layout \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-directory /path/to/authenticated/linux-v1.44/rust/lib/rustlib/sbpf-solana-solana/lib
```

Both builds must produce:

```text
stripped    3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36
unstripped  f3aae993141c81277d8a14ac66331dbd59f646bd03d7a371ef201475af19a219
```

## Runtime replay

The packet retains the newly executed reports. To rerun the full corpus against a rebuilt final candidate:

```sh
python3 scripts/pump_validate_parallel.py \
  --candidate work/pump-l32-creator-repro/build-1/candidate.so \
  --source-directory work/pump-l32-creator-repro/build-1/source/programs/pump \
  --build-comparison work/pump-l32-creator-repro/build-1/build-comparison.json \
  --output work/pump-l32-creator-repro/full.json.gz \
  --workers 4 --captured-loader
```

No RPC or live-chain interaction is used.
