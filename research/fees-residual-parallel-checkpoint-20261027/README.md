# Fees residual parallel research checkpoint

This incremental checkpoint preserves **13,511 new or updated files**, 3 versions superseded during capture, and 90,566,046 compressed bytes in three parts. Its inventory began at **2026-10-27T15:07:12.286998+00:00** and finished at **2026-10-27T15:08:04.960647+00:00**. It extends the [previous continuation](../fees-work-continuation-20261027/README.md), which authenticates the original full checkpoint. The current inventory contains 78,926 regular files.

The independently qualified Rust frontier is [581/585 normalized functions and 200 raw functions](../fees-ata-prefix-integration/README.md). **Whole-ELF identity remains false.** The four active lanes are ExtendFeeConfig, SweepBuyback, CrankDonationFeePda and CreateDonationFeePda. This archive preserves their source variants, disassembly, compiler diagnostics, native-screening receipts, failed and interrupted experiments, and coordination notes. Archiving a file does not certify its result. Files captured while a process was active retain their observed state; later work is outside this inventory.

SDKs, dependency caches, and compiler output directories are excluded; completed native artifacts copied into lane evidence are retained. Exact exclusions and 33 paths removed from the prior current inventory are indexed. A first capture failed when a compiler removed a temporary object; its failure receipt is preserved and its incomplete archive is excluded. Symlinks remain inactive. No archived scripts run during restoration.

Python 3.9+ without optimization and the zstd command are required. The verifier authenticates every archive and decoded blob in the three-checkpoint chain, even when restoring one prefix. Use a new destination directory:

```sh
python3 -B research/fees-residual-parallel-checkpoint-20261027/restore_combined.py
python3 -B research/fees-residual-parallel-checkpoint-20261027/test_restore.py
python3 -B research/fees-residual-parallel-checkpoint-20261027/restore_combined.py --prefix fees-next-trial/next647/ata-prefix-qualified/ --output /absolute/new/recovery
```

The source acceptance packages and their own normal Cargo, source, code, data and runtime proofs remain authoritative. Direct-rustc controls accelerate private screening; every new accepted reconstruction still requires a normal Rust build and complete ELF checks.
