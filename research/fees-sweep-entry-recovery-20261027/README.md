# Fees Sweep full-body recovery

SweepBuyback now matches the original **6,960-byte / 848-instruction** body under the existing call/address normalization. The captured normal Cargo builds contain **583 of 585 original normalized windows** (99.7%); the two remaining original bodies are CrankDonationFeePda at `147944` and CreateDonationFeePda at `163920`. All prior 582 normalized matches remain, including repeated signature multiplicities.

The winning ordinary Rust change reads the bump, borrows the vault, then borrows the destination **before** the index guard. The guard remains on its original source line. These accesses have no side effects. Unlike binding permutations after the guard, this order reproduces the original accounts-load/context-spill/bump-load/bump-spill sequence at offsets 40–64. The previous best archived source had four mismatching positions and an exact suffix from offset 72. The winning body has no differing normalized instruction or relocation annotation. The retained source uses public Anchor interfaces, with no assembly, binary patching, scheduler override or manufactured padding.

All **37 direct calls** in Sweep target full functions with the same normalized signatures as their original counterparts. This check does not establish recursive call closure or data-pointer identity.

Three normal locked offline Cargo builds with the pinned Linux v1.44 SDK produce identical full symbol and stripped artifacts. Each accepted execution receipt confirms unchanged workspace/vendor inputs. The capture linker forwards unchanged arguments to the SDK linker; its build is byte-identical to the ordinary build. Symbol SHA-256 is `eae3dcea73ab5efd3e96c4e47bf95613d3a113b6140b670a05ff3adfed333dc7`; stripped SHA-256 is `2fd821df1b05fbbebcd54cdd92279b6b434573211552d22f2dfa26442daf838a`.

All **17,331 original/candidate runtime cases across 18 canonical suites** pass, including 1,249 buyback cases. The runtime aggregate and execution receipts bind this exact stripped binary. These are the unchanged canonical suites and retain their individual coverage limits; this is bounded runtime evidence.

## Verification

```sh
python3 -B research/fees-sweep-entry-recovery-20261027/verify.py
python3 -B research/fees-sweep-entry-recovery-20261027/test_verify.py
```

The independent verifier recomputes full function signatures, signature multiplicity, the two remaining gaps, all Sweep direct-target signatures, complete repeat-artifact identity, strip text preservation, retained source-input hashes and runtime/artifact bindings. The negative checks reject the near-match entry ordering and an altered call immediate even though normalization masks call immediates.

`source.tar.gz` retains the full workspace, and `macro-vendor.tar.gz` retains the dependency used by these builds. `sweep.patch` is relative to the strongest archived 582-window candidate, whose exact buyback source is included as `baseline-buyback.rs`. Relative to the accepted Extend workspace, the Rust changes are confined to `state.rs` and buyback `mod.rs`; the root manifest also adapts the absolute vendor path. The captured build/probe scripts retain their actual `/workspace/fees-recovery` paths; they are execution provenance, not a relocatable materializer. `launch.json` records every compiler argument and source/vendor input hash. Rebuilding elsewhere requires adapting source/vendor/toolchain paths consistently.

`controls/` records successful and compile-rejected ordinary Rust alternatives. Source borrowing failures and negative comparisons remain visible. Two overlapping builds were excluded because their source-stability receipts failed; they are identified in `execution-limitations.json`. Stable independent builds subsequently reproduce the winner. Initial runtime setup failures involved missing sparse-checkout inputs; the final replay uses the unchanged tracked fixtures.

## Acceptance boundary

This is a **research body recovery**, not promotion of the canonical layout checkpoint. The SDK-default layout has 145 raw-local matches, versus the accepted checkpoint's 200, and its 21,071-byte readonly section differs from the original 21,079-byte section. Canonical section ordering, full readonly payload, all data/code reference bindings, Source records and raw-match preservation still need qualification. The root progress table therefore stays on the [accepted 582-window Extend checkpoint](../fees-extend-integration/README.md).

**Whole ELF and captured-payload equality remain false.** Recovering the final two normalized bodies will still not, by itself, establish byte identity.
