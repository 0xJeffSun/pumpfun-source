# Proposed owned errors at Relay generated exits

This uncompiled proposal replaces the generated-exit `Cause`/borrowed-name adapter with the observed owned framework error model. It is justified by complete original allocation, account-name decoration, logging and consuming-conversion bodies. It does not change the matching writer or allocator. One unchanged-recipe build would test the proposed source hypothesis; no build or runtime execution is included here.

The exact patch changes three existing sources (`generated_exit.rs`, `solana_runtime.rs`, `error_report.rs`) and adds `exit_error.rs`. The22 frozen build06 inputs become23. All19 other inputs, including Cargo manifest/lock, are identical. Full before/after source maps, patch, original/candidate ELFs and actual original function ledgers are included. The independent prior diagnostic remains sealed as `65860d26…`; its allocation/inlining observations are not revised.

## Concrete source change

The new module preserves the authenticated Anchor0.31.1 declarations for `Error`, `AnchorError`, `ProgramErrorWithOrigin`, `ErrorOrigin`, `ComparedValues` and `Source`. It reuses their ordinary owned conversion, account-name, logging and consuming-conversion implementations. The import prefix changes to the already selected `solana_program`; unused Borsh-I/O and integer-conversion adapters are omitted. This is reference-source reuse, not a new Anchor dependency or proof that0.31.1 uniquely identifies the captured program.

A narrow `SerializationErrorCode` supplies the observed code3004 name and Display message. Its factory constructs `name()` first, `to_string()` message next, then the boxed AnchorError with no origin or compared values. The existing fixed serializers still drop the I/O error before invoking this factory inside the mutable-borrow closure. `named()` adds `AccountName(String)` after the closure returns and the guard is released. The runtime converts a real SDK ProgramError into the other owned variant. Reporting borrows that error once; the existing lower step consumes it and returns the real SDK ProgramError.

There is no representation attribute, padding, compiler attribute, binary edit, artificial source location or changed dependency. This proposal recovers ownership operations; exact generated sizes, instructions and compiler optimizations are future observations, not acceptance assumptions.

## Original evidence

| Boundary | Complete original evidence | Supported source operation |
| --- | --- | --- |
| Four fixed serialization failures | Windows17/18/20/153; calls14848/15816/17624/466592 | Drop I/O error, construct3004, then release RefMut |
| Error-name construction | Window296 at662256,3056B;3004 branch663328→664008 | Copy22-byte `AccountDidNotSerialize` to an owned String |
| Message formatting | Window298 at665904;3004 branch666832→667384 | Display the31-byte message through a formatter |
| Anchor conversion | Window297 at665312,592B | Name, message,160-byte alignment8 box; origin/compared None; code at+152 |
| Program-error conversion | Window285 at652528,160B |128-byte alignment8 box; move SDK error to+32; origin/compared None |
| Account-name decoration | Complete windows125/130/141/145/153/158 | Allocate account-name String; replace origin on either error variant |
| Logging | Window286 dispatches to288/289 | Borrow enum, log the selected variant and origin; retain owned error |
| Consuming conversion | Window290 at657016,632B | Extract custom code or move ProgramError; destroy name/message/origin/compared values and box |

`allocation-witnesses.json`, `serializer-error-order.json`, `observed-original-layout.json` and complete disassemblies bind these statements to raw bytes. The producer initializes original origin tag2 and compared-values tag2. The account decorator changes origin to tag1 and stores String capacity/pointer/length. Original source origin is tag0; the proposal introduces no source-origin value at any call site.

Window125 gives a concrete two-variant witness: Tracker failure jumps to202888 and constructs the13-byte `epoch_tracker`; Debouncer failure jumps to203184 and constructs the9-byte `debouncer`. Both Anchor and Program branches join the same account-name stores. Returned tag/pointer flow through the wrapper unchanged. Other generated-exit callers are retained in full rather than inferred from nearby window sizes.

The original lower path drops the Anchor error name, then message, then any owned account-name origin and compared strings, then the160-byte box. The Program path first moves its SDK error out, then drops origin/compared data and the128-byte box. These orders match the preserved natural field declarations and consuming `From<Error>` implementation. The selected bump deallocator is a no-op; preserving ownership operations is still a source-fidelity concern and is not replaced with manual pointer operations.

`format-piece-ledger.json` decodes all six main log template arrays (Anchor/Program × no origin/source/account) from their actual relocation-backed pointer/length descriptors. The source retains those templates and compared-values branches. The full format/log allocator closure and new compiler layout remain unproved. The common message/name literals are complete objects, not arbitrary64-byte previews.

## Shared-boundary scope, explicitly included for review

The existing ExitError is shared. A coherent replacement also changes ownership on the whitelist serializer's existing3004 errors and interface/close ProgramError errors; it cannot honestly be described as affecting only four functions. This proposal changes **no** whitelist field writes, length decisions, interface checks, close operations, account ordering or error selection.

That coupling has direct support: original whitelist window158 calls the same3004 producer at504544 before its borrow release at504584 and then decorates either error with `mint_whitelist`. Interface borrow failures in window125 call the same owned ProgramError producer285. The full close helper282 and its generated-exit callers147/149/155 are retained; its failure propagation uses the same owned Program variant. This is the scope root must accept for a build. The whitelist's other writer/error-construction fidelity gaps remain; this patch does not claim to fix its entire serialization path.

Framework/Body/IDL errors elsewhere in the candidate remain their existing adapters. The outer `Failure` enum is unchanged. All currently retained routes still use the same dispatch, owner gates, AccountInfo handling, RefMut lifetime, signer controls and actual operation sequence. Ownership and error-log construction for generated exits are the only intended behavioral change.

## Limits and next gate

The proposal is technically self-contained in the existing dependencies: all call sites of the old `Cause`, `ExitError.cause` and borrowed account field are accounted for; the public `ExitError` alias and `X<T>` retain their roles. Existing `Failure` derives remain supported by the copied owned types. This is a static API review, not a successful compiler result.

If root accepts the shared-boundary scope, the next step is one isolated build on these23 exact source inputs with the same recorded v1.44 compilation/v1.52 stripping recipe. Compare all492 original and actual new candidate windows, the complete fixed serializers, error producer/layout, name decoration, logger/lower targets and writer/drop closure. Preserve failed comparisons. Retain and rerun only the unchanged12 ordinary cases after the static gate; no new fixture matrix is proposed. Those cases do not cover all allocation, short-buffer, fixed-authority or close-failure paths.

The full executable remains unequal at the reviewed baseline. The writer's type-id, OOM/formatting and inlining differences remain. The known strict6009 source-origin mismatch, six unavailable fixed-authority successes and broader account/context/error models remain explicit gaps. This proposal makes no all-input, full-Anchor or all-original equivalence claim.

## Verification

`python3 -B /path/to/package/verify.py` checks the portable package without a compiler or VM. `--repo /path/to/repository` additionally binds the published build06 and ordinary12 package. The verifier rechecks the raw original bodies, exact allocation and borrow-order witnesses, descriptor-backed literals, full before/after source maps, unchanged lock/profile inputs and preserved upstream field declarations. Copied-package and missing/source/derived-evidence negatives are in `verification-tests.json`; no binary bytes are mutated.
