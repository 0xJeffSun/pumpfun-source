# Fees source and compiler research checkpoint

This incremental checkpoint preserves **7,680 new or updated files**, 2 versions superseded during capture, and 18,463,539 compressed bytes in 1 parts. The inventory began at **2026-10-27T16:24:33.971545+00:00** and finished at **2026-10-27T16:25:30.693526+00:00**. It extends the [previous parallel checkpoint](../fees-residual-parallel-checkpoint-20261027/README.md); the complete four-checkpoint chain remains authenticated. The current inventory contains 86,598 regular files.

The independently qualified Rust frontier is [582/585 normalized functions and 200 raw functions](../fees-extend-integration/README.md). **Whole-ELF identity remains false.** SweepBuyback, CrankDonationFeePda and CreateDonationFeePda remain open. This archive preserves source variants, disassembly, compiler diagnostics, native-screening receipts, failed and interrupted experiments, and coordination notes. Archiving a file does not certify its result. Files captured while a process was active retain their observed state; later work is outside this inventory.

The new evidence includes the current-parent Sweep candidate with only four instruction rows reordered; Crank ownership and temporary-lifetime controls; Create public error-conversion controls; the rejected pristine standard-library rebuild; and a verified faster guest-local build cache. The scheduler-policy diagnostic is rejected after broad regressions. The ordinary Rust compiler configuration remains authoritative.

SDKs, dependency caches, copied standard-library toolchains, and redundant compiler output directories are excluded; completed native artifacts copied into lane evidence are retained. Exact exclusions and 0 paths removed from the prior current inventory are indexed. Exclusion removes a path only from the current reconstructed inventory, not from historical archives. Symlinks remain inactive. No archived scripts run during restoration.

Python 3.9+ without optimization and the zstd command are required. The verifier authenticates every archive and decoded blob in the four-checkpoint chain, even when restoring one prefix. Use a new destination directory:

```sh
python3 -B research/fees-residual-source-checkpoint-20261027/restore_combined.py
python3 -B research/fees-residual-source-checkpoint-20261027/test_restore.py
python3 -B research/fees-residual-source-checkpoint-20261027/restore_combined.py --prefix fees-next-trial/next649/extend-qualified/ --output /absolute/new/recovery
```

Source acceptance packages and their own normal Cargo, source, code, data and runtime proofs remain authoritative. Direct-rustc controls accelerate private screening; every newly accepted reconstruction still requires normal Rust builds and complete ELF checks.
