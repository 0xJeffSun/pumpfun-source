# Fees frame and inlining research checkpoint

This incremental checkpoint preserves **1,675 new or updated files**, 0 versions superseded during capture, and 10,284,021 compressed bytes in 1 parts. The inventory began at **2026-10-27T16:44:36.564497+00:00** and finished at **2026-10-27T16:45:33.315509+00:00**. It extends the [previous source checkpoint](../fees-residual-source-checkpoint-20261027/README.md); the complete five-checkpoint chain remains authenticated. The current inventory contains 88,263 regular files.

The independently qualified Rust frontier is [582/585 normalized functions and 200 raw functions](../fees-extend-integration/README.md). **Whole-ELF identity remains false.** SweepBuyback, CrankDonationFeePda and CreateDonationFeePda remain open. This archive preserves source variants, disassembly, compiler diagnostics, native-screening receipts, failed and interrupted experiments, and coordination notes. Archiving a file does not certify its result. Files captured while a process was active retain their observed state; later work is outside this inventory.

The new evidence includes a normal Cargo build of the strongest Crank source on the current 582-function parent. It preserves all 582 normalized matches and repeats the old Crank mismatch, ruling out stale source context. Frame analysis accounts for the 296-byte excess; a direct receiver control removes 192 bytes of that excess. Create source controls recover the expected formatter call edges and isolate an extra returned-pair copy. Sweep source controls reduce the remaining ordering difference. These are diagnostic advances, not newly accepted functions. A read-only memory gate distinguishes reclaimable cache from active memory so the independent lanes can continue without clearing caches.

SDKs, dependency caches, copied standard-library toolchains, and redundant compiler output directories are excluded; completed native artifacts copied into lane evidence are retained. Exact exclusions and 0 paths removed from the prior current inventory are indexed. Exclusion removes a path only from the current reconstructed inventory, not from historical archives. Symlinks remain inactive. No archived scripts run during restoration.

Python 3.9+ without optimization and the zstd command are required. The verifier authenticates every archive and decoded blob in the five-checkpoint chain, even when restoring one prefix. Use a new destination directory:

```sh
python3 -B research/fees-frame-inline-research-20261027/restore_combined.py
python3 -B research/fees-frame-inline-research-20261027/test_restore.py
python3 -B research/fees-frame-inline-research-20261027/restore_combined.py --prefix fees-next-trial/next652/crank582-current-context/ --output /absolute/new/recovery
```

Source acceptance packages and their own normal Cargo, source, code, data and runtime proofs remain authoritative. Direct-rustc controls accelerate private screening; every newly accepted reconstruction still requires normal Rust builds and complete ELF checks.

The compact [current-source comparison](provenance/current-crank-context-proof.json) and [unchanged-function audit](provenance/current-crank-unchanged-functions.json) show that all 585 other compiled functions retain their normalized signatures. The 57 lost raw matches come from the unqualified absolute layout; no raw or whole-file acceptance is claimed.
