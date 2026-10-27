# g01 — exact native AMM builds (native bytes == authenticated Linux bytes) + a faster edit→build→measure loop

Speed lane, amm2 workflow, 2026-10-27. Tooling only: no maintained source, scripts, repro packets or CI inputs change.

Base: origin/main 0cc61d636 (rebased onto 5f295723a), AMM frontier `repro/pump_amm/event-decoder-recovery-20261027`
(authenticated Linux candidate `0881a95dafe465623c7220fb3da84b3f9c7d9b0094d572f62487f05cbd80a07c`, unstripped
`16ddd88d35140ffce422dac700a1bc2eb5b505b7c0eccef3d363b8d306a520e3`; 647 normalized / 148 raw / 138 unmatched of 785).
Counts are unchanged by design: this packet changes how fast and how exactly lanes measure, not what is measured.

## 1. Exact native build (the main result)
`tools/native_exact_build.sh <lane> <source-root> <new-out>` (= `EXACT=1 tools/native_build.sh …`) on the 647 canonical source:

| build | candidate.so | unstripped.so | normalized/raw/unmatched |
|---|---|---|---|
| authenticated Linux v1.44 (frontier packet, and our `linux_build.py` rerun `evidence/lin1-*`) | 0881a95d… | 16ddd88d… | 647/148/138 |
| plain native (Darwin sysroot; lanes' old baseline) | c4ab6fdd… | 420714b2… | 642/139/143 |
| native + Linux sbpf rlibs + `-vV` host shim (x3, shim v1) | 0ff291b7… | ee7c9e55… | 647/147/138 (raw 0xfd098 lost) |
| **native exact (x4, shim v2)** | **0881a95d…** | **16ddd88d…** | **647/148/138** |

`evidence/x4-exact-vs-linux.elfdiff.txt`: IDENTICAL. Native cargo time 2m02s (all 181 deps + root, JOBS=6) vs 6m39s for the Linux
priming build of the same tree (2 CPUs); the root crate alone takes ~1–2 min natively under load.

How the gap closed:
1. Sysroot: `SP/shared/toolchain/v144x` = Darwin v1.44 rustc/cargo/rustdoc/LLVM files (1,800 files byte-equal to
   `~/.cache/solana/v1.44/platform-tools`) + the official Linux v1.44 `sbpf-solana-solana` target rlibs (25 files byte-equal to the
   authenticated SDK) — removes the `/Users/runner` vs `/home/runner` panic-path rodata and the sysroot-owned TypeId bodies
   (`evidence/toolchain-manifest.json`).
2. Cargo metadata: cargo mixes the `host:` line of `rustc -vV` into every `-C metadata` (dev-channel rustc) — the shim reports
   `x86_64-unknown-linux-gnu` (byte-identical to the container's `-vV`, recorded in the frontier build-repeat.json).
3. Host dependency graph (found here): cargo evaluates platform-conditional host dependencies with the host `--print=cfg`. On
   aarch64-apple-darwin `cpufeatures` gains `libc`, which changes the metadata of cpufeatures, sha2, anchor-syn, anchor-lang-idl,
   spl-discriminator-syn, every Anchor/SPL proc macro, then anchor-lang, anchor-spl and nine spl-* target crates and the root crate
   (x3: 145/171 crates equal to Linux; root StableCrateId shows in the CGU name `pump_amm_recovered.e901fc0e3e998284-cgu.0` (Linux)
   vs `.b66ad465a077ae9`) → different symbol hashes → different function order (4,611 .text words). Shim v2 splices the cfg section
   of the host probe from `--print=cfg --target x86_64-unknown-linux-gnu` and gives the host-only cpufeatures compile
   `--extern libc=<hostdeps rlib>`; cargo's build plan then has 171/171 crates with the Linux `-C metadata`
   (`evidence/metadata-vs-linux.json`). Nothing host-only reaches the SBPF program; equality is proven by the sha256s above.

## 2. Build break fixed (every lane, 11:55)
The 647 recipe pins solana-program-entrypoint 2.2.1 (and, for older cargo homes, 11 more archives); every lane build failed
offline. `tools/sync_registry.py` (run by native_build.sh and linux_build.py after staging) copies missing archives from the shared
pool, the packet archive dirs or the Codex frontier cargo home, only if sha256 == the Cargo.lock checksum. `linux_build.py` accepts a
priming build (new dependency artifacts only; `dependency_artifacts_added`), still refusing changes to existing ones
(`tools/linux_build.py.diff`; `evidence/lin1-linux-build-record.json`: priming, 30 added, 0 changed, sha 0881a95d…/16ddd88d…).

## 3. Loop time
Measured on the 647 tree under load average ~80 (16 cores; 6 shared sbf slots, 12–20 waiters):

| step | before | now |
|---|---|---|
| recipe stage | 0.24 s | 0.24 s |
| registry sync | (build failed) | 0.1 s |
| lock wait (sbf slot) | 546–636 s observed | 0 s on a cache hit |
| native cargo build | 27 s–2 m (root only), 1m49s–2m02s (deps+root) | identical staged workspaces: 0 s (shared result cache) |
| Linux build (confirmation) | 2.5–4 min root only; 6m39s priming | iterate natively with exact bytes; Linux only to confirm |
| strip + measure.py | 5–6 s | 5–6 s |

- Shared result cache `SP/shared/buildcache/<flavor>/<key>` (`tools/buildcache.py`, used by native_build.sh v2): key = per-file
  sha256 of the staged workspace + toolchain id (+ shim). Builds are deterministic: lanes multihop and v2 built the same staged 647
  workspace in separate target caches and got identical bytes (c4ab6fdd…/420714b2…); four lanes had built that same workspace. A hit
  returns in ~6 s (`timing.txt`: `result=cache`). NOCACHE=1 forces a build.
- Every build writes `timing.txt` (stage / lock wait / build / measure) and a `cargo -v` log.
- `tools/variants.py`: N patch files → N parallel builds in APFS-cloned target dirs (exact mode clones the immutable primed cache
  `SP/shared/caches/xnative-v144`) → ranked gained/lost table (`table.json`).
- `tools/rustc_replay.py`: root-crate rustc without cargo, using cargo's build plan (exact args/env/cwd); `--emit=llvm-ir` for the
  function-level loop.
- `tools/fnllc.py` (function-level loop, extends amm-mid's irexp/objcmp): extract one function from root-crate IR, run llc with the
  sbpf target's codegen options, compare with an original window under measure.py's normalization (< 1 s). Fixed an extraction bug
  (unnamed globals). Validation: amm-mid's cum3 IR vs its own linked .so — 460/460 root-crate functions equal
  (`evidence/fnllc-validate-ammmid-cum3.json`).

## Rebuild
```
SP=<scratchpad>; native_exact_build.sh <lane> repro/pump_amm/event-decoder-recovery-20261027/results/canonical-source <out>
# expect candidate 0881a95d…, unstripped 16ddd88d…, 647/148/138
```
Toolchain from scratch: clone `~/.cache/solana/v1.44/platform-tools/rust` to `v144x/rust`, replace
`rust/lib/rustlib/sbpf-solana-solana/lib/*` with the SDK's (sha256 list in the manifest), install `tools/rustc-shim.sh` as
`v144x/bin/rustc`, and put a host build of the locked libc crate in `v144x/hostdeps/` (any cargo build of the workspace with shim v1
produces `target/release/deps/liblibc-<hash>.rlib`).
