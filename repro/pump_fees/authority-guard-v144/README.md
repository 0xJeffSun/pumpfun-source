# Fees authority guard reconstruction

`set_authority` now uses `require!(new_authority != Pubkey::default(), FeeError::InvalidAdmin)`. The previous `require_keys_neq!` attached compared public keys that the original error path and retained logs do not contain. This is one Rust expression change; no functions or source lines were moved to force location constants.

The clean v1.44 main build is **768,824 bytes**, SHA-256 **952a96cdb974517ec85ebeff3e2b5ec690029aaf3f822dfc22501e95bc3dba66**, byte-identical to the independently built and tested scratch ELF. Main also updates the program README; both its actual bytes and all other source/workspace/IDL inputs are bound in the 22-file main manifest. The scratch snapshot retains the earlier documentation. Captured original SHA-256 remains `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes; **whole-file equality is false**.

Original dispatcher wrapper 624368 directly calls body 103408. The corrected candidate body at 465144 has the original length of 3,320 bytes, exact relocation pattern (including the R10 abort syscall), and fourteen internal callees mapped to observed original targets through bounded normalized bodies. Only source line and filename-length instructions differ after address/call normalization: candidate `lib.rs:158`, original `instructions/admin/update_fee_program_global.rs:47`. The exact spelling of the original guard is not uniquely established. Referenced rodata is not recursively equated. See `static/body-analysis.json` and the retained scratch report.

The exact scratch ELF passed all **17,381 prior comparisons**: 17,331 full regression cases, two unchanged authentic historical messages, 28 initializer rejections, two literal errors, nine codecs, and nine focused buyback log comparisons. Three additional ordinary signed zero/same/different authority-key comparisons assert the absence of compared-key logs, giving **17,384 comparison receipts**. The twelve focused comparisons repeat earlier cases with stronger log assertions. The persistent donation sequence passed ten steps and twenty signed transactions.

Focused comparisons explicitly enable runtime signature verification and blockhash freshness. The historical initializer lane keeps authentic signed messages/signatures unchanged, adapting only stale blockhash freshness; it is not a complete historical bank. Source-location logs and compute-unit use still differ. All execution was local, with no live submission. This is a bounded reconstruction, not complete historical source recovery or a deployable substitute.

The previous `buyback-source-v144` package is retained unchanged. This package includes exact main and scratch sources, actual compiler/build environment and logs, runtime harness snapshots, dependency/input manifests, signed receipts, and source evidence. Main receipts are reused solely by whole-ELF byte identity.

From repository root:

```sh
work/test-env/bin/python repro/pump_fees/authority-guard-v144/verify_publication.py
sh repro/pump_fees/authority-guard-v144/reproduce-build.sh work/new-authority-build
sh repro/pump_fees/authority-guard-v144/reproduce-validation.sh \
  repro/pump_fees/authority-guard-v144/pump_fees_candidate.so work/new-authority-validation
```

The build script checks the recorded helpers, extracts the 22-input snapshot into a new workspace, runs a locked offline v1.44 build, and checks whole-ELF identity. Supply the recorded toolchain/dependency cache if absent. Historical scratch scripts preserve their original paths and can be replayed by restoring the scratch source archive at the recorded path. No executable patch is part of reproduction.
