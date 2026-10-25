# Next Metaplex source trial

The current public candidate7 remains unchanged. This isolated twelve-file trial extends the context patch with two behaviorally observed validations. Collection approval compares its system-program key before account allocation; eight ordinary-signed tests have two successes and six missing-check differences against candidate7. SetTokenStandard checks mint ownership against the two SPL token IDs after metadata ownership and before metadata deserialization; ten ordinary-signed tests have four agreeing controls and six owner-rejection differences. Token2022 cases stop at the existing global legacy-incompatibility check with153. All tests use test-owned update authorities and synthetic local accounts.

Read-only original offsets98320–98416 and190312–190392 support the validation order and direct helper calls. The prior inferred name for ordinal301 was corrected to collection-approval by its account order and matching runtime behavior; rodata-adjacent names alone were insufficient to identify it.

One additional source-only hypothesis changes Burn Uses comparison spelling to remaining>total. Candidate7's360-byte helper has identical branch structure but swapped remaining/total registers versus the original. This bounded operand-order hypothesis is not yet compiled and is not claimed as historical source.

Compilation, all prior regressions and final runtime replays remain pending. No binary edits or production vulnerability claim are made.
