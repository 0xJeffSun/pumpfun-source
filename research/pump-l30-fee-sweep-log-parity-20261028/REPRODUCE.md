# Reproduce the L30 fee-sweep parity result

Run these commands from a fresh repository checkout with Python 3.11+ and `requirements.txt` installed:

```sh
python3 research/claude-pump-integration-20261027/r37-layout-30/verify.py
python3 research/pump-l30-fee-sweep-log-parity-20261028/verify.py
python3 research/pump-l30-fee-sweep-log-parity-20261028/test_negative_controls.py
```

The focused verifier recomputes the exact source diff, tool and source hashes, repeated ELF identity, unchanged 1,035-window census, all 84 affected rows, signed transactions, loader bindings, retained-to-fresh log delta, ordered-log families, and the 44-suite result. It also rejects unlisted packet files.

## Rebuild

Copy the immutable L30 Pump crate to an ignored workspace, then apply the patch from the copied crate root:

```sh
mkdir -p work/pump-l30-fee-sweep-repro
cp -R research/claude-pump-integration-20261027/r37-layout-30/source \
  work/pump-l30-fee-sweep-repro/source
git apply --directory=work/pump-l30-fee-sweep-repro/source \
  research/pump-l30-fee-sweep-log-parity-20261028/source.patch
```

Prepare independent registry, output, and target-library directories. The target libraries must match every hash in `scripts/pump_linux_v144_sbpf_libraries.json`; a substitute SDK profile is not accepted. Then run the repository builder twice with separate output directories:

```sh
python3 scripts/pump_build_verified.py \
  --source-directory work/pump-l30-fee-sweep-repro/source/programs/pump \
  --sdk /path/to/authenticated/v1.44/platform-tools \
  --registry-home /path/to/isolated/verified-registry \
  --output work/pump-l30-fee-sweep-repro/build-1 \
  --workspace-layout \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-directory /path/to/authenticated/linux-v1.44/rust/lib/rustlib/sbpf-solana-solana/lib

python3 scripts/pump_build_verified.py \
  --source-directory work/pump-l30-fee-sweep-repro/source/programs/pump \
  --sdk /path/to/authenticated/v1.44/platform-tools \
  --registry-home /path/to/isolated/verified-registry \
  --output work/pump-l30-fee-sweep-repro/build-2 \
  --workspace-layout \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-directory /path/to/authenticated/linux-v1.44/rust/lib/rustlib/sbpf-solana-solana/lib
```

Expected hashes for both corrected builds are:

```text
stripped    3b8588e551e30dde30fc41d39443a59753202d5af1b8b8e4cde44584ab3c2a27
unstripped  eb6b008a7b2d447067aaecb4c16b19e3c7e5dc4f5aaca387fbeadcee2d36a28f
```

The historical absolute paths retained in build and loader records are descriptive only. Verification remaps their repository-relative suffixes and requires the same content hashes.
