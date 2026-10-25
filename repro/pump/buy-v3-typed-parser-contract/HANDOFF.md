# Handoff

Static-only package; no main edits or integration. Full report: `REPORT.md`. Proposal: `source/buy_v3_context.rs` and `source/fee_account.rs`.

Two corrections to the preserved prior review: both base token accounts are boxed by original reader38a8; final program reader136f0 requires Pump ID and executable status. Explicit Program<Pump> replaces the plain event-CPI-injected field. Keep these checks before volume init.

Locked macro sources support the typed seventeen-field admission and init-before-other-constraints ordering. Volume remains owned137-byte init_if_needed with success-only exit; fee decode is early and stored-bump validation late. No body, dispatcher, compatibility mux or SellV3 edits.

NOT COMPLETE: historical parser identity, transitive decoders/data/errors and source/build provenance remain open. Natural fee wire type is uncompiled; memory-layout/codegen correspondence is not established. All117 saved Buy rows (105 successes,12 failures) remain mandatory obligations for the unresolved body. No new execution evidence.

Run `python3 -B verify.py` from any directory using the script's path. It checks inventory, original byte anchors, selected dependency bindings and retained receipts, not semantic equivalence. Separate-copy and negative integrity tests are recorded beside the package in `verification-results.json`. Exact ownership: `owned-map.json`; seal: `manifest.sha256`.
