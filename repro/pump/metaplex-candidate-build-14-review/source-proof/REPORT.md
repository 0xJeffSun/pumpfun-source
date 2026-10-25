# Single Utilize hypothesis: unified guard and dominated subtraction

**This is a justified single natural source hypothesis for measurement; it is not an accepted fix or a prediction of byte identity.** Start from candidate11, retain its entire ordered three-disjunct guard, and replace only the immediately following `checked_sub(...).ok_or(NotEnoughUses)?` with plain subtraction. No second guard, different guard spelling, metadata/padding/location adjustment or other source change is proposed. No compiler, build, target execution, VM, variant sweep or shared-source edit was performed.

`utilize11.rs` is reconstructed from sealed candidate12 source by restoring only candidate11's guard. Its SHA256 `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7` exactly matches accepted11's patched-source receipt. `single-change.patch`, `reviewed.fragment.rs` and `utilize-proposed.rs` contain the sole reviewed change. This avoids treating an approximately similar source file as the accepted11 input.

## All-u64 scalar and failure-order proof

Let n=number_of_uses, t=metadata_uses.total and r=metadata_uses.remaining, independently ranging over all u64 values. The source guard evaluates left-to-right:

1. If n==0, reject with NotEnoughUses without evaluating later disjuncts.
2. Otherwise if n>t, reject with that same error before the remaining comparison.
3. Otherwise if n>r, reject with that same error.
4. Otherwise continue, with 1<=n<=t and n<=r<=2^64−1.

In case4, 0<=r−n<=2^64−2. Plain Rust subtraction is safe with overflow checking either enabled or disabled; it cannot wrap or panic. The accepted11 `checked_sub` necessarily returns Some(r−n), so its following eager unit-enum `ok_or` creates an Ok containing that same u64 and its `?` never converts an error. Removing this redundant fallible operation changes neither the first failing predicate nor the returned ProgramError. This proof requires no unproved invariant r<=t: inconsistent stored remaining/total values are fully included. Boundary n=r succeeds with0; n=t is permitted when n<=r; n=0 rejects even when t/r are0; n=u64::MAX succeeds only when both t and r equal u64::MAX.

The guard's error conversion remains the same `MetadataError -> ProgramError::Custom(e as u32)`, with NotEnoughUses86. It has no logged message, allocation or account write in that conversion. The unreachable checked-sub error edge is the only removed fallible path; the source's earlier account reads/validations, metadata unwrap, must_burn calculation and guard stay exactly where they were.

`metadata.uses=Some(Uses{...remaining:remaining_uses})` still occurs only after successful subtraction. The entire suffix is byte-identical source: delegated-use account extraction, borrow and validation, owner/PDA/bump checks, independent record.allowed_uses checked subtraction, record serialization, invalid-user rejection, metadata serialization and conditional burn calls remain in their original source order. This review does not remove the independent delegated-record check. Error return before local metadata assignment preserves the same live metadata/local ownership scopes; the new binding owns only u64 and introduces no destructor-bearing value. Compiler destructor/cleanup generation is still an empirical obligation.

## Target body and cleanup evidence

All offsets below are **file offsets**, as used by the sealed review, not guessed objdump labels. The original target has:

- 238800: `n==0 ->238840` common error.
- 238816: `n>total ->238840` common error.
- 238832: `r>=n ->238896` success; fallthrough is238840 error.
- 238840: load86<<32;238856 stores that return representation;238880 calls cleanup12448;238888 jumps to shared cleanup continuation237920.
- 238928 copies r to r1;238936 subtracts n;238944 stores the result. The positive guard dominates subtraction and there is no second underflow-error conversion between it and that subtraction.

The original body `[236632,241736)` hash is `0b57c8b38b3b6395fe223e99d29c48258f481d496491cb13b7abe065a49fb70d`. The prior complete-body review records the same cleanup, delegated-use handling, serialization and burn continuation across candidate12 under its address correspondence. Its full decode/result/manifest are externally hash-bound here. This supports a shared-error guard followed by infallible dominated arithmetic as a natural source shape. It does not recover a unique historical spelling or prove this Rust expression generated those exact instructions.

## Reasons to reject an identity claim or a resulting build

There is no scalar/effect-order reason to reject this one transformation under the exact frozen source and u64 types. The main uncertainty is generated layout: LLVM may retain the same block ordering as11, emit the12/13 complementary JGT/JA pair again, retain an overflow branch it cannot eliminate, or change other function/cleanup/relocation placement. The target's positive JGE alone does not guarantee source branch polarity; the completed12/13 experiment already demonstrates that limitation.

Reject promotion if actual compiled instructions or full-artifact identity do not improve to the intended target correspondence, if any new arithmetic/panic/error or cleanup edge appears, or if unrelated body/data/relocation differences arise. No executable patch/remapping or matching section sizes can substitute for the original payload comparison. Existing diagnostic-coordinate residuals are separate and remain unaddressed. Even a better byte comparison is evidence for this recipe, not proof that the historical author used this source spelling.

The packet's verifier checks immutable input receipts, exact single source replacement, raw guard/cleanup anchors and whole original body hash. It invokes no compiler or solver and executes no target. `--repo` rehashes the existing original ELF and sealed upstream packets. The all-u64 argument above is a direct symbolic case proof; finite tests are unnecessary for that claim.
