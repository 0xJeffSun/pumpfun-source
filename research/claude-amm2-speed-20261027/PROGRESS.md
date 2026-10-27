# speed lane (amm2) — PROGRESS

Base: origin/main 0cc61d636, AMM frontier repro/pump_amm/event-decoder-recovery-20261027
(Linux candidate 0881a95d…, unstripped 16ddd88d…; 647 normalized / 148 raw / 138 unmatched).

## Done
- 11:55 FIXED shared build break on the 647 frontier: its recipe pins solana-program-entrypoint 2.2.1, absent from every lane
  cargo-home (offline "failed to download"). New SP/shared/tools/sync_registry.py (checksum-verified copy from the shared pool
  SP/shared/registry) is called by native_build.sh and linux_build.py after staging. linux_build.py accepts priming builds
  (new dependency artifacts only) and records dependency_artifacts_added/changed.
- Toolchain clone SP/lanes/speed/toolchain/v144x = Darwin v1.44 rustc/cargo + the authenticated Linux v1.44 sbpf target rlibs
  (sha256 list out/linux-sbpf-rlibs.sha256 == SDK) + rustc shim that reports host x86_64-unknown-linux-gnu to cargo
  (cargo hashes the host line into every -C metadata on a dev-channel rustc).
- Loop timings (647 frontier, load avg ~80): recipe stage 0.24 s; measure.py 5.2 s; native root-crate build 30 s–2 min,
  Linux root-crate build 2.5–4 min (cargo "Finished" lines across lanes); first build after a dependency change rebuilds 16 crates.

- x3 (12:05): Darwin rustc + Linux sbpf rlibs + `-vV` host shim on the 647 source = 647/147 (Linux 647/148; raw 0xfd098 lost),
  candidate 0ff291b7…, unstripped ee7c9e55…. .rodata now identical (the /Users/runner vs /home/runner sysroot panic paths are gone),
  all section sizes equal, but 4,611 .text words differ: the ROOT crate StableCrateId differs (CGU name
  pump_amm_recovered.e901fc0e3e998284-cgu.0 on Linux vs .b66ad465a077ae9 natively) -> different symbol hashes -> function order.
  Cause: cargo evaluates platform-conditional host deps with the host `--print=cfg`: on aarch64-apple-darwin cpufeatures gains
  libc, which changes -C metadata of cpufeatures, sha2, anchor-syn, anchor-lang-idl, spl-discriminator-syn, all Anchor/SPL proc
  macros (16 host crates) and then anchor-lang, anchor-spl and 9 spl-* target crates (11) and the root crate.
- shim v2 (12:08): also splices the host probe's cfg section from `--print=cfg --target x86_64-unknown-linux-gnu` and gives the
  host-only cpufeatures build `--extern libc` (prebuilt host rlib in v144x/hostdeps). cargo build plan: all 193 crates' -C metadata
  == the Linux build's artifact hashes (frontier build-repeat.json dependency cache).
- Shared build cache (SP/shared/buildcache): multihop nb-base647 and v2 nb647 built the SAME staged workspace (key 9968f7fa…) in
  separate target caches and got identical bytes (c4ab6fdd…/420714b2…): deterministic, so identical builds can be shared.
- fnllc.py: fixed unnamed-global extraction bug; validate on amm-mid cum3.ll + its linked .so: 460/460 root-crate functions equal.
- Lock contention dominates: x3 waited 636 s for an sbf slot (6 slots, ~12 waiters, load ~80) before a 1m49s cargo build.

- x4 (12:19) EXACT: shim v2 + Linux rlibs on the 647 source -> candidate 0881a95d…, unstripped 16ddd88d… == authenticated Linux
  (elfdiff IDENTICAL), 647/148/138; cargo 2m02s natively (deps+root). lin1 (patched linux_build.py, priming 30 added/0 changed)
  reproduced 0881a95d…/16ddd88d… too.
- Published (12:20-12:25): SP/shared/toolchain/v144x (shim v2 + hostdeps), SP/shared/caches/xnative-v144 (primed deps),
  shared tools native_build.sh v2 (cache, EXACT=1, timing.txt), native_exact_build.sh, buildcache.py, rustc_replay.py (build-plan
  based), variants.py, fnllc.py (vs-orig/validate/check), sync_registry.py; README READY-v1; findings note. Plain-native 647 cache
  entry seeded from multihop's build (== v2's).
- Packet g01-exact-native-loop committed.

## In progress
- x5: exact build of the 651 frontier (optional-context-recovery) through the SHARED tools/toolchain (expect 97bd5553…/0142baee…);
  seeds the exact cache for every lane's 651 baseline.
- exp2: one slot, x4 workspace: direct rustc replay (identical bytes?), --emit=llvm-ir only, -Ztime-passes, -Zthreads=4.

## Next
- fnllc vs-orig on the exact IR (rp-d); variants.py smoke test (comment-only patch twice: build + cache hit);
  update g01 evidence + PR.
