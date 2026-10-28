# Qualified Fees Sweep recovery

The recovered SweepBuyback Rust handler matches all **848 original instructions / 6,960 bytes** after the existing call/address normalization. Fees reaches **583 / 585 normalized windows (99.7%)**, retains all **200 raw-local matches**, and preserves every previous match. CrankDonationFeePda and CreateDonationFeePda are the two remaining original bodies. Matched windows cover **769,872 / 799,648 original text bytes (96.3%)**; 29,776 original bytes remain in those bodies.

The source reads the bump and borrows the vault/destination before the index guard. This reproduces the original four-instruction entry order while keeping the guard's source line and the exact remainder of the body. The source also retains the archived public state helper reconstruction. These are ordinary Rust ownership and evaluation choices, with no assembly, binary rewriting, modified SDK, scheduler override or padding. The discovery and negative source controls are published separately in [PR #299](https://github.com/lalalune/pumpfun-source/pull/299).

The accepted section-order recipe is rebound to actual compiler-emitted sections. Recursive direct-call colors distinguish generic instantiations whose symbol hashes changed. Relocated contents identify two renamed Anchor vtables; their old ordinal names alone selected the wrong objects. The final linker selects complete input sections, without changing their bytes. The original-relative comparison validates the resulting references independently of the selection heuristics.

The verifier checks **4,474 direct calls**, **63 code pointers**, **2,092 data pointers** in matched original functions, all **379 relocated data fields**, the exact **21,079 readonly bytes** and all **105 Source records**. It verifies every other compiled function and its references against the accepted Extend parent, including 4,550 calls and 2,196 pointers. No previous raw-local match is lost.

Two fresh normal locked offline Cargo builds with the pinned Linux v1.44 SDK produce identical complete artifacts. Symbol SHA-256: `c63bf0a47e0fba4a3845fde7c6f0056af1c592502432d7567e784eeb6de9dae3`. Stripped SHA-256: `e5c3d2982a262b2bdc798b3799808b9a397e4f2ca3e72289ad310550e96a58c0`. Each build confirms unchanged source and vendor inputs.

All **17,331 fresh original/candidate cases across 18 canonical runtime suites** pass against this exact stripped artifact, including 1,249 buyback cases. These are bounded synthetic/offline suites and retain their existing coverage limits.

```sh
python3 -B research/fees-sweep-integration-20261027/verify.py
python3 -B research/fees-sweep-integration-20261027/test_verify.py
python3 -O -B research/fees-sweep-integration-20261027/test_verify.py
```

The independent reference comparison uses explicit checks that remain active under Python optimization. Four negative tests reject entry reordering, readonly corruption, an altered data relocation and a changed Source scalar. `comparison-parent.py` preserves the prior comparison; `comparison.py` applies the Sweep-specific gain and retains its checks with assertions converted to explicit failures.

`source.tar.gz` and `macro-vendor.tar.gz` retain complete compiler inputs, authenticated against both launches. `layout/` retains the whole-section linker script, selector bindings and relocated-content proofs. Build scripts record actual `/workspace/fees-recovery` paths and are execution provenance, not a portable materializer; rebuilds elsewhere require consistent path adaptation. Toolchain archive identity and the two-file Rust source scope are recorded in `provenance.json`. The parent is the [qualified Extend checkpoint](../fees-extend-integration/README.md).

This publishes a research frontier, separate from the maintained selection. **Whole ELF and captured-payload equality remain false.** The final two bodies, absolute addresses, relocations and original build provenance still require work; a normalized match is not byte identity.
