# Reproduce

From a fresh checkout with `requirements.txt` installed:

```sh
python3 research/pump-l32-admin-cto-log-order-20261028/verify.py
python3 research/pump-l32-admin-cto-log-order-20261028/test_negative_controls.py
```

To rebuild, copy L32 source, apply the merged #492 patch and then this packet's patch, and use two isolated output directories:

```sh
cp -R research/claude-pump-integration-20261027/r37-layout-32/source work/l32-order/source
(cd work/l32-order/source && git apply ../../../research/pump-l32-creator-log-parity-20261028/source.patch)
(cd work/l32-order/source && git apply ../../../research/pump-l32-admin-cto-log-order-20261028/source.patch)

python3 scripts/pump_build_verified.py \
  --source-directory work/l32-order/source/programs/pump \
  --sdk /path/to/authenticated/v1.44/platform-tools \
  --registry-home /path/to/verified-registry \
  --output work/l32-order/build-1 --workspace-layout \
  --target-library-profile linux-v1.44-sbpf \
  --target-library-directory /path/to/linux-v1.44-sbpf/lib
```

Repeat with `build-2`. Both outputs must match the hashes in the README. Full replay uses `scripts/pump_validate_parallel.py --captured-loader` with the corrected candidate and its build report. No network or live-chain execution is involved.
