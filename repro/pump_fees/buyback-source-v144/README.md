# Fees typed buyback guards and boxed update account

The main Fees source now uses `require_gt!(8u8, index, FeeError::InvalidBuybackIndex)` in initialize/update-authority/update-rate and `Box<Account<BuybackVault>>` in the shared update context. These four source edits follow original instructions, relocation patterns, error-value formatting, account pointer loads, and retained original logs. No functions were moved and no lines were padded to force a source location.

The clean v1.44 main build is **768,976 bytes**, SHA-256 **f7697d83d22f2fa812bcdc5667399fb4c859d866f24d01c583f2b87c311ecbfb**, exactly equal to the independently built and tested scratch ELF. The captured original is 948,944 bytes, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. Whole-file equality remains false. This is a bounded reconstruction, not recovered historical source or a deployable substitute.

The retained regression passed 17,331 comparisons, two unchanged authentic historical initializer messages, 28 initializer rejections, two literal errors, and nine external-codec rejections: **17,372 comparisons**. Nine additional normally signed comparisons assert exact `Left: 8` / `Right: index` logs for indices 8 and 255, and their absence for successful index 7, across the three buyback handlers. These nine repeat index cases from the full regression with stronger log assertions, for **17,381 comparison receipts** total. The persistent donation sequence passed ten steps and twenty normally signed transactions.

The nine focused comparisons explicitly enable signature verification and blockhash freshness checking. The separate historical initializer lane preserves authentic signed messages/signatures; only their stale blockhash freshness check is disabled. It does not reconstruct a full historical bank. All execution was offline.

The final three buyback bodies have original lengths 600/696/640 bytes and exact relocation patterns. After normalizing addresses and direct calls, only source line and filename length instructions differ. All five direct callees map to the corresponding original entries, including an exact normalized 1,864-byte error-value formatter. The two deprecated 520-byte handlers differ only by line immediates under the same normalization. See `static/REPORT.md` and the per-phase JSON for precise mappings and limitations. Referenced rodata is not recursively equated; raw bodies, source locations, compute-unit use, and complete executables still differ.

`scratch/` retains three controlled source builds: untyped compared-value macro, boxed update account, then typed u8 bound. The untyped helper's mismatch is preserved. Each trial retains its 22 source/workspace/IDL input hashes, complete source snapshot, compiler/build identity, log, stripped/unstripped outputs, and function matcher result. Main's actual root workspace files, lock, and source are bound independently in `source-sha256.json` and its archive. The prior `declared-programs-v144` package remains unchanged.

From the repository root, verify saved evidence with:

```sh
work/test-env/bin/python repro/pump_fees/buyback-source-v144/verify_publication.py
```

To rerun runtime comparisons against a selected ELF into a new output directory:

```sh
sh repro/pump_fees/buyback-source-v144/reproduce-validation.sh \
  repro/pump_fees/buyback-source-v144/pump_fees_candidate.so work/new-buyback-validation
```

Rebuild the recorded main source in an isolated workspace with:

```sh
sh repro/pump_fees/buyback-source-v144/reproduce-build.sh work/new-buyback-build
```

This checks the current helper against its recorded snapshot, extracts all 22 source/workspace/IDL inputs, and compares the fresh ELF byte for byte. Registry archives/source files and compiler hash are recorded; missing toolchain/dependency cache assets must be supplied before the locked offline build. The historical scratch scripts retain their actual paths; restore their source archives at the recorded workspace paths to replay those controls. No binary patch is part of reproduction.
