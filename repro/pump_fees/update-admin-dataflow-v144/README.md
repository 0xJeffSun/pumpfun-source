# Fees update-admin dataflow and account representation

`update_admin` now reads the old administrator from FeeConfig state, assigns the new account key, and reads the updated state for its event. Its `new_admin` context field is `AccountInfo`. Two controlled builds isolate the state-dataflow change from the account representation change. They reproduce the original handler and account-parser instructions without source padding, metadata searches, or executable edits.

The clean main v1.44 ELF is **769,640 bytes**, SHA-256 **b56d1852f9eed1ee1ad423d8724d5254f1e167ff7e76ca7d52ae7829c5e1b309**. It is byte-identical to the independently built and tested scratch ELF. All 22 main source/workspace/IDL inputs are identical to the final scratch inputs after removing workspace prefixes. The main program README is preserved as the preceding authority-checkpoint document; this package describes the new artifact. Captured original SHA-256 is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes. **Full original byte equality remains false.**

| Component | Candidate → original entry | Bytes | Direct-call evidence |
|---|---|---:|---|
| Handler | 494080 → 94072 | 2824 | All 9 targets supported |
| Account parser | 124680 → 326272 | 5664 | All 32 targets supported |
| Dispatcher | 374384 → 634776 | 1384 | 4 of 5 targets supported |

Each body has an exact entry-bounded instruction pattern after address/call normalization and an identical relocation pattern. The dispatcher still calls a different `Account<FeeConfig>::exit_with_expected_owner`: candidate 23280/1568 bytes, original 24192/992 bytes. This serialization/exit gap is explicit in `static/body-analysis.json`; the generic matcher's consistency flag only checks already mapped callees. No fully equivalent dispatcher call graph or recursively identical rodata is claimed. Original Rust spelling, source tree and compiler identity remain unresolved.

All **17,384 prior comparison receipts** pass, along with the ten-step donation sequence (20 signed transactions). A separate rerun of all 56 existing update-admin cases explicitly enables signature/fresh-blockhash checking and retains all 112 ordinary signed transactions. This gives **17,440 comparison receipts**, with **zero new unique cases** added by those 56 repeats. Errors, state, balances, events and inner instructions agree. Raw logs and compute-unit consumption are retained without claiming full equality.

The two historical initializer messages retain authentic signatures and signed bytes; only historical blockhash freshness is adapted. They do not reconstruct a complete historical bank. Other fixtures use ordinary test-owned signatures and synthetic local state. No live submission occurred. This is a bounded reconstruction and evidence checkpoint, not complete historical source recovery or a deployable substitute.

Main and scratch build records, source snapshots, 37 runtime harness files, dependencies/input hashes, static evidence and every receipt are retained here. Previous packages remain unchanged. Main runtime receipts are reused solely by exact whole-ELF identity.

From repository root:

```sh
work/test-env/bin/python repro/pump_fees/update-admin-dataflow-v144/verify_publication.py
sh repro/pump_fees/update-admin-dataflow-v144/reproduce-build.sh work/new-update-admin-build
sh repro/pump_fees/update-admin-dataflow-v144/reproduce-validation.sh \
  repro/pump_fees/update-admin-dataflow-v144/pump_fees_candidate.so work/new-update-admin-validation
```

The build script verifies recorded helpers, extracts all source inputs into a new workspace, performs the locked offline build, and checks full ELF identity. Supply the recorded compiler/dependency cache before running if absent. Historical scratch scripts retain the actual recorded paths and require restoring their snapshots at those paths.
