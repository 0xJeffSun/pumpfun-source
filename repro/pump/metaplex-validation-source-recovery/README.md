# Metaplex collection and mint-owner validation source trial

This twelve-file trial extends the [context source trial](../metaplex-context-source-recovery/README.md) with two independently observed account checks. Collection approval rejects the wrong system-program account before allocation. SetTokenStandard rejects a mint whose owner is outside the two SPL token IDs, after metadata ownership but before decoding metadata. Eighteen normally signed offline comparisons against candidate7 retain twelve differences and six controls; they use synthetic accounts and test-owned update authorities. Token2022 controls stop at the existing global legacy-incompatibility guard. The original capture has these checks; this is a reconstruction correction, not a deployed vulnerability claim.

The source trial also changes one equivalent Burn Uses comparison to remaining>total, following the original register/load order. That source-spelling hypothesis is uncompiled and unproved. REPORT.md retains exact static offsets, observations and limits. The preceding ten source changes remain explicitly included, with all twelve baseline and patched hashes. Compilation and complete post-build regression are pending. No executable editing or optimizer-attribute changes occur.

The original probe scripts retain their historical path behavior and hashes. After a fresh build, use the portable runner with an explicit candidate:

```sh
python3 repro/pump/metaplex-validation-source-recovery/validation.py --candidate PATH_TO_FRESH_BUILD --output work/metaplex-validation-checks.json.gz
```

The preceding edition, Uses, burn and metadata-context runners must also pass before claiming bounded combined parity. Exact historical source and full byte identity remain unresolved.
