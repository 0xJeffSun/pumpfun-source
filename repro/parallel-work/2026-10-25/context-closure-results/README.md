# Context, settlement and donation continuations

All five CLI tasks completed; **51 independent CLI assignments are now complete**. Their original seals are retained. The [independent review](../../../ci/context-closure-review/README.md) runs every verifier and rebinds 211 slices / 36 full Git objects. These static packages make no source promotion, runtime or whole-program acceptance claim.

| Package | Result | Limits |
| --- | --- | --- |
| [Route context](pump_route_context_closure/REPORT.md) | Thirteen account slots, actual program/signature/PDA order, event bump flow | Imported readers and runtime semantics remain conditional |
| [Native settlement](pump_route_native_settlement/REPORT.md) | Native lamports, self-CPI/SyncNative interfaces and conditional rent top-up | Rent primitives, self-callee effects and full error semantics remain open |
| [Donation branches](fees_donation_missing_branches/REPORT.md) | Missing logs, reserve-selected curve/pool path, payer-before-revocation and explicit empty-sharing-data guard | No accepted handler patch; transitive decoder/CPI/errors unresolved |
| [AMM return contract](amm_fee_return_contract/REPORT.md) | Candidate getter sets return data after success, with no later field exit/CPI | Conditional candidate-source argument; captured-original F05 remains open |
| [Nested context](pump_nested_context_closure/REPORT.md) | Complete ordinary outer context/control flow and remaining-slice plumbing | Initialization CPI/decoder contracts remain partial |

**Composition caveat:** route context slot 7 / A+0x38 is a present writable raw AccountInfo. Native settlement's residual wording must not be read as proving local token owner/mint/recipient validation. Downstream token acceptance remains a separate obligation. No original package was edited to reconcile this wording.

The Fees branch report uses historical 8cce source; the subsequently accepted 8f89 AccountInfo correction leaves those business gaps unchanged. Global counts remain 140 bounded / 5 partial / 5 unrecovered, with 0/4 exact core binaries and an incomplete audit.
