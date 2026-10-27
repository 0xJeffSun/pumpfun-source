# Main Pump workspace geometry checkpoint

This bounded checkpoint gains four normalized QuoteControl windows over the sealed round3 source build: **572/1035 normalized, 111 raw**; 450,656/1,792,208 text bytes. Every one of the 40 Rust source files is unchanged. The recipe stages the crate at an actual `programs/pump` Cargo workspace path, moves the unchanged release profile and lockfile to that workspace root, and does not inject bytes or source coordinates. Whole-ELF identity is **not achieved**.

The manual, portable, and fresh archived-input reproducer builds have identical stripped and unstripped ELF hashes. The standalone build default remains unchanged to reproduce the earlier568-window checkpoint. `primary/` preserves that standalone input; `source/` preserves the actual staged workspace input. The compiler is the installed v1.44 SDK. Registry contents and this repository's captured original remain required; this is not a hermetic toolchain closure.

The captured-upgradeable-loader validation passed44 suites/10,468 cases and a separate32-suite/2,657-case focused corpus. Their13,121 paired log cases have no diagnostic mismatches; the corpora overlap. Diagnostics exclude source coordinates and compute costs. The full result reuses38 independently verified passing suites from the first attempt and executes6 previously failed/canceled suites. The original failure occurred before two-curve execution because the binding code assumed the lockfile lived at the crate root. The narrow workspace-binding correction, prior hashes, failed receipt and per-suite loader records are archived. This is local fixture evidence, not live-chain acceptance.

Module-only, package-only and combined rename experiments all remain572/111 and have the same multiset of857 normalized candidate functions. The IDL names the program `pump`; the Cargo package name is unresolved. Neither rename is promoted.

Verify from repository root:

```sh
work/test-env/bin/python repro/pump/workspace-layout-20261027/verify.py
```

Rebuild into a fresh output directory:

```sh
work/test-env/bin/python repro/pump/workspace-layout-20261027/reproduce.py \
  --registry-home work/parallel-main-integration/cargo-home \
  --output work/parallel-main-workspace/reproduced-from-checkpoint
```

The reproducer checks the archived source and required repository wrapper, invokes the archived builder, and requires both output ELF hashes to equal this checkpoint. The source, build records and full fixture limits remain visible; this checkpoint does not claim source completeness or Rust-built original-byte identity.
