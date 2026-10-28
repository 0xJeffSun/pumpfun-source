# Independent reproduction of the selected Mayhem v1.54 candidate (28 Oct 2026)

**Result.** On a second, independent Darwin arm64 host, the pinned v1.54 recipe
rebuilds the selected Mayhem candidate **byte-for-byte**:

```
built stripped artifact : 8dac1ff7575e3aa74ffa1ab4c4db2152781f0c644665dbf1c278e284751b19cb
repro/status.json mayhem: 8dac1ff7575e3aa74ffa1ab4c4db2152781f0c644665dbf1c278e284751b19cb   (candidate_sha256)
```

The original selected build (`repro/mayhem/initializer-current-20261027/`) was
produced by a different user/host. This packet records that an unrelated host
reproduces the identical artifact sha from the same pinned inputs. This supports
**build reproducibility of the selected candidate**; it does not establish the
original historical compiler, nor change any function-window match, nor claim
whole-file identity to the capture.

## Verified pinned inputs

| Input | Value |
| --- | --- |
| platform-tools v1.54 archive | `platform-tools-osx-aarch64.tar.bz2`, 415,708,909 bytes, sha256 `1c8b3af5e8614e1c459393a95c5b19bfbcc8ed13822a1cb539fae68471f9bfbb` (= policy `release_asset_sha256`) |
| v1.54 selected files | 41/41 match `scripts/supported_sbpf_policies/v1.54.json` (`selected_files` + `extra_environment_tools`) |
| v1.52 strip tool | `llvm/bin/llvm-objcopy` sha256 `12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be` (= policy `strip_sha256`) |
| measured host | Darwin arm64 (required by policy `measured_host`) |
| toolchain | cargo 1.89.0, rustc 1.89.0-dev (bundled) |

## Whole-file comparison to capture (unchanged conclusion)

The selected candidate is a partial implementation and is **not** byte-equal to
the deployed capture:

| | value |
| --- | --- |
| candidate bytes | 620,168 |
| capture bytes (`evidence/original/mayhem/deployed.so`) | 777,408 |
| differing positions in shared length | 334,284 |

This matches the recorded `DIFFERS_PARTIAL_IMPLEMENTATION` status. Per-window
raw/normalized match counts are **not** recomputed here; that inventory needs
the separately pinned sBPF disassembler and is out of scope for this packet.

## Reproduce

Prerequisites placed under `~/.cache/solana/`:
- `v1.54/platform-tools/` — extracted from the sha-pinned `osx-aarch64` archive above.
- `v1.52/platform-tools/llvm/bin/llvm-objcopy` — the pinned strip tool.
- Offline crate cache populated once: `cargo fetch --manifest-path programs/mayhem/Cargo.toml --locked`.

```sh
env -i HOME="$HOME" PATH="/usr/bin:/bin:/usr/sbin:/sbin" \
  .venv/bin/python scripts/build_reconstruction_candidate.py \
  --program mayhem --tools-version v1.54 \
  --manifest programs/mayhem/Cargo.toml \
  --artifact-name mayhem_recovered.so \
  --output <new-output-dir>
# then: shasum -a 256 <new-output-dir>/artifacts/mayhem_recovered.so
```

The adapter re-verifies the pinned tool/sysroot hashes, copies the offline
registry, builds `--locked --offline` for `sbpf-solana-solana`, strips with the
pinned v1.52 `llvm-objcopy`, and compares to the capture. Build outputs are not
committed (they live under the git-ignored `work/`).

## Scope and limitations

- Confirms the selected candidate rebuilds reproducibly on an independent host.
- Does **not** prove the original historical compiler, SDK or flags.
- Does **not** add or change any matched function window, and makes no
  whole-file identity claim against the capture.
