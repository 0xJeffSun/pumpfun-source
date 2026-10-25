# FeeConfig serialization error conversion

`FeeConfig::try_serialize` now propagates discriminator-write and field-serialization errors through Anchor's direct I/O-error conversion. The captured original sends both paths through that conversion. Replacing the previous explicit `ProgramError` mappings reproduces the entire 992-byte exit body and resolves the update-admin dispatcher's previously unmatched direct exit target.

The clean main v1.44 ELF is **769,000 bytes**, SHA-256 **a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa**. It is byte-identical to the independently built and tested scratch ELF. All 22 source/workspace/IDL inputs match after workspace-prefix removal. Only `programs/pump-fees/src/types.rs` changed from the preceding checkpoint. The main program README is retained as earlier authority-checkpoint documentation and is bound honestly in both source manifests.

Captured original remains 948,944 bytes, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. **Full original byte equality remains false.**

| Body | Candidate → original entry | Bytes | Direct-call evidence |
|---|---|---:|---|
| FeeConfig exit | 23280 → 24192 | 992 | All 14 targets supported |
| Update-admin handler | 493504 → 94072 | 2824 | All 9 targets supported |
| Update-admin parser | 124104 → 326272 | 5664 | All 32 targets supported |
| Update-admin dispatcher | 373808 → 634776 | 1384 | All 5 targets supported |

Each full body has an identical entry-bounded instruction sequence after address/call-immediate normalization, and an identical relocation pattern. Every direct internal call is enumerated. The exit's sole rodata relocation also references the same eight-byte discriminator. The prior 1568-byte candidate exit is now 992 bytes. This evidence resolves that particular direct callee; it does not recursively prove the complete call graph, arbitrary rodata, unique original Rust spelling, or historical compiler identity. No source padding, output edits, or flag search was used.

All **17,440 prior comparison receipts** pass. One additional repeat of an existing serialization-failure case retains two ordinary signed transactions and asserts the exact `BorshIoError("failed to write whole buffer")` log plus FeeConfig rollback. That yields **17,441 total comparison receipts**. The 56 transfer repeats and this new failure repeat add **zero new unique input cases**. The separate ten-step donation sequence also passes with 20 ordinary signed transactions.

Errors, state, balances, events and inner instructions match within the fixture scopes. The focused serializer error log matches exactly; other raw logs and compute units are retained without whole-log equality claims. Authentic historical initializer messages and signatures remain unchanged, with only historical blockhash freshness adapted. This is not a complete historical bank. Other cases use test-owned signatures and synthetic local state. No live submission occurred.

This package binds the clean main and scratch builds, all 22 inputs, 42 harness files, registry source/archive hashes, tool hashes, runtime dependencies, static evidence and all receipts. Prior packages remain immutable. Main receipts are reused solely through exact whole-ELF identity.

From repository root:

```sh
work/test-env/bin/python repro/pump_fees/fee-config-serialization-v144/verify_publication.py
sh repro/pump_fees/fee-config-serialization-v144/reproduce-build.sh work/new-fee-config-build
sh repro/pump_fees/fee-config-serialization-v144/reproduce-validation.sh \
  repro/pump_fees/fee-config-serialization-v144/pump_fees_candidate.so work/new-fee-config-validation
```

The build script verifies the recorded helpers, restores the complete source snapshot to a new workspace, performs a locked offline build, and checks exact ELF identity. Supply the recorded compiler/dependency cache first if absent. Runtime harness and captured-input hashes are retained; restore their recorded versions in a separate checkout before reproducing if the live files differ. Historical scratch scripts preserve the actual execution paths; restore those snapshots at the recorded paths to rerun them. The publication verifier uses portable package paths.
