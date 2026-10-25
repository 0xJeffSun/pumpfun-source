# CTO remaining-error static recovery

These exact records were prepared against the 37-input Pump source at main `2508c2be79bc5e66956dcd979e5d2f2a780fd851`. Their outside-checkout statements describe the recording phase. Publication applies no patch, performs no build/runtime probe and changes no source, status or selected artifact. Proposed patches remain unapplied and unselected.

## 6019: predicate and ownership omission

The original nonholder/Some path checks zero first (6030), then compares the target with the actual holder-rewards PDA and the sharing-config key, in that order. Both equality branches reach the same owned `InvalidCreator` constructor. Successful parser-slot packing and wrapper copies prove the sharing-config AccountInfo.key role separately from the reused missing-account error transport. The original retains Source312, the exact 38-byte `programs/pump/src/creator/admin_cto.rs` path, no compared values and no pubkeys/account-name decorator.

Current source checks only the sharing-config key and returns numeric ProgramError. The exact one-guard proposal adds the holder-PDA comparison and the named Anchor constructor. Independent raw-byte review supports this bounded change. The prior zero-key/holder/later-fee order remains unchanged. Emitted code, original source formatting, transitive allocation/OOM/destructors and callable preservation remain later gates.

## 6092: one original constructor, two current sites

The original full application contains one 6092 constructor and one direct failure edge, before quote-account empty/borrow/decode/frozen handling. Actual AccountInfo reading and parser packing map current_creator owner, writable and executable fields. The owned enum/name/full message, Source556, empty compared fields and common return are verified. Current source contains two numeric returns; the later return is dominated by the first under the ordinary immutable AccountInfo contract. No second original Source origin is invented.

The eligibility continuation closes the old holder flag through all nine historical reader layouts. The original cached eligibility is `!shared && !old_is_holder_reward && old_creator != zero` before System-owner/non-executable/writable checks. Current wallet lacks the old-holder and explicit shared exclusions. Original shared evaluation is key→owner→nonempty; current source evaluates owner→nonempty→key, leaving a borrow/panic-order difference. A separate constructor-only proposal uniformly changes both numeric return expressions while preserving predicates and line count; that narrow proposal does not fix the complete eligibility or payout flow.

Downstream amount, payout, CPI, event, borrow/error and cleanup composition is still being traced separately. No whole-wallet/whole-handler predicate or runtime acceptance is claimed here. Correcting only an early check must not be represented as a complete fix while later payout decisions retain a different wallet definition.

## Historical reproduction

```sh
python3 -B repro/pump/cto-remaining-errors-static-20261025/verify_baseline.py --repo .
```

This explicitly checks the recorded 37-input historical source, all child seals, original bytes/bodies/fields and the independent 6019 review. After a future source correction, use the named baseline checkout; this is not a current-selection verifier. Copies of the earlier 6091 owning/reader controls retain their exact original sibling names and manifests, with no old verifier rewrite or overlay.

Source-path bytes do not prove the original Rust logical module graph or justify hardcoded coordinates/line padding. Full data, indirect calls, allocator/OOM, transitive cleanup, historical build recipe and original-byte equality remain open. No compiler, network, VM, signer fixture, transaction or on-chain action is performed by these static checks.
