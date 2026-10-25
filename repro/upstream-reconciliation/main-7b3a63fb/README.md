# Preserve incoming trade source without changing the selected checkpoint

While PR8's branch evidence check passed, its combined GitHub preview incorporated main7b3a63fb's active `trade.rs` edit. The selected Pump build's37-input map did not include that source; the preview therefore correctly failed source binding. This reconciliation preserves the complete incoming file as an opaque snapshot outside active compiler discovery and restores the exact source bytes bound to the selected `3ae5bb44` candidate.

The incoming commit and source bytes remain available in Git history and `excluded-source-snapshots/`. No implementation judgment, semantic review, target execution or acceptance is asserted for that source. Existing stopped V3-extension research remains excluded; no case, flag, fixture, signer or source-coordinate experiment was resumed. The selected candidate, compiler inputs, status and frozen regressions are unchanged.

`preservation.json` binds the incoming commit/parent, original Git blob ID, both source SHA-256 values, active source revision, selected build report and candidate. `verify.py --repo REPO` checks exact preservation, its location outside the crate, every actual current Pump source input and the strict current checkpoint. It does not execute the preserved source, a compiler or a VM. Older reconciliation packets remain immutable scoped evidence.
