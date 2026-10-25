# Relay13 saved-evidence portability composition

The historical `ordinary.verify(runtime=True)` enters its frozen proposal verifier, which compares installed solders native bytes with the originating Darwin `solders.abi3.so`. That host-specific provenance assertion cannot pass on Linux. All original packages/manifests/verifiers remain unchanged. This new checker separates current saved-signature verification from original runtime provenance.

Supported environment: **Python 3.12 with pinned solders 0.27.1**, across operating systems. Other Python major/minor versions are rejected before AST reconstruction or cryptographic-engine imports. The frozen AST serialization gate is intentionally not relaxed or generalized.

Interface: `verify.py:check_selected(root)` accepts the actual repository root and returns a detailed report. CLI:

```sh
python3.12 -B repro/layered-passes/pass-24/ci-relay-signature-portability/verify.py --repo .
python3.12 -B repro/layered-passes/pass-24/ci-relay-signature-portability/test_portability.py
```

It checks its own strict manifest and all original typed13/evidence/selection manifests, source23/candidate/symbol paths, actual current.json and README selection, plan/static proof, control exits, adapter/verifier identity, canonical-before/after records and selection counts. It invokes the unchanged ordinary verifier with **runtime=False**, preserving its complete frozen proposal/manifest, fixture/transaction privilege, raw account-state/hash/lamport, metadata, effect/event/CPI, source and candidate checks. Its result must equal the historical saved result in every field except the explicitly reported `runtime_signature_reverification` flag (false now, true in the historical saved result). No old runtime=True result is manufactured.

Separately, current pinned **solders 0.27.1** verifies every one of the **50 encoded signature fields across all24 original/candidate rows**, using the exact saved wire-message bytes and required signer keys:12 unique transactions,25 unique signatures. `verification_engine` records current Python/platform and solders file hashes; `originating_runtime_provenance` preserves the authenticated saved map. These are distinct records; the checker does not assert original runtime native-byte identity. Current verification engine output is informational provenance, not a newly pinned historical runtime or new execution claim.

## Pure reconstruction closure

The frozen `inventory.py` loader imports the full harness and patches its LiteSVM global. This checker does not call that loader. `frozen_inventory.py` instead admits only the authenticated harness's named `prepare` helpers/constants and the original inventory's pure `saved_messages` decoder. `pure-reconstruction-policy.json` records full saved-file hashes, each exact source span hash, complete selected AST hash, exact lexical Name set, and allowed imports. Source/AST/name/import drift is rejected before compilation of those declarations. No original module globals, sources, return values or manifests are patched or overlaid.

Fixture reconstruction admits only Pubkey, Rent, AccountMeta, Instruction and reproducible fixture Keypair helpers. These produce account bytes, PDA metadata and instruction metadata; they create no transaction, signer substitution or VM. The saved-message decoder imports only Transaction/VersionedTransaction for `from_bytes` and signature verification of retained transactions. It does not construct or sign a new transaction. VM/full-harness imports, execute/send/simulate/sign operations are excluded. All15 frozen fixture-blueprint records and all22 saved-message-inventory records must match exactly, including account/PDA/fixture data and saved verification fields. Optional/rejection rows are reconstructed as static metadata only, with no target execution or semantic probe.

Thirteen tests include real positive saved signature verification and reject altered signatures/messages, manifest payload bytes, package expectations, source bytes, selected status, provenance/version, old-result fields and pure reconstruction source hashes, and unsupported Python versions. Tests mutate only memory or temporary copies, never the repository. `local-validation.json` records an actual local verification using the current engine plus the complete test result. Linux hosted acceptance remains separate until CI runs.

No VM, target program, RPC, build, transaction submission, old package mutation or selection change occurs. New checked-borrow-failure runtime coverage remains zero; finite evidence and static helper matches do not establish whole-original byte or security identity. The only owned change is this new directory. Root separately owns integration and the current workflow/source-applicability call transition.
