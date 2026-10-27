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

## In progress
- x3-frontier: exact native build (v144x) of the 647 canonical source; compare with Linux 0881a95d/16ddd88d.

## Next
- native_exact_build.sh publish if bytes equal; direct-rustc fast path; variants.py; fnllc.py validation (trap-unreachable flags).
