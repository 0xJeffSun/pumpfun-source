# AMM initializer/closer context review

Recommendation: change only `InitUserVolumeAccumulator.user` from `UncheckedAccount<'info>` to `AccountInfo<'info>` (proposal.patch). This restores observed account ownership, not a requested offset. No closer change is justified. No build, runtime, main-source edit, or new fixture was performed.

## Bound evidence

`inputs.json` binds the current c96 executable with symbols, complete admitted residual ledger, original executable, and current lib.rs. `rows.json` preserves 31 original and 31 candidate complete rows: both parsers/wrappers/handlers, close exit, and their immediate callees with calls, branches, relocations, and wide-immediate data. Disassembly files preserve full root windows and both init helper windows. Original function boundaries retain the ledger's inferred-entry limitation; candidate symbols supply attribution. Instruction log strings bind original init wrapper e6710 (11e899, 38 bytes) and close wrapper e6c98 (11e8bf, 39 bytes).

## Init ownership evidence

Original wrapper e6710 calls parser cfa98 at e67b0, handler 5d090 at e68c8 and Account exit 48b8 at e6918. Current corresponding roots are 9bff0, d9990, c34c8. Original/current sizes: wrapper 1416/1160, parser 6136/5576, handler 2960/2976. These are residuals, not evidence of byte equivalence after the proposed change.

The second input account is the user: payer is first, then user, then the PDA account and system program. Original parser consumes that second account at cfb00..cfb48. It loads user lamports Rc at cfb50 and increments its strong count at cfb90; loads user data Rc at cfbf0 and increments at cfc30. It copies key, owner, rent epoch and three flags at cfc48..cfcc0. This is the six-word/48-byte AccountInfo representation, not an Account<T> deserialization or an AccountLoader. Current second-account path d9ad0..d9b08 stores only the user AccountInfo reference at stack -180, without those Rc increments.

Original parser explicitly copies 48 bytes of this retained user from stack -1a8 to aggregate +70 at d0f68..d0f90. Original wrapper later loads that user's data and lamports Rc from stack -180/-188 at e6980/e6988 and decrements both through e69f8. That pair belongs to user because wrapper aggregate base is -200 and user starts +70. The current borrowed user has no corresponding owned pair; generated event/program AccountInfo cleanup remains.

The complete successful context member layout follows constructors, final stores and consumer loads:

| Member | Original byte range | Current byte range | Type evidence |
|---|---|---|---|
| payer | 00..08 | 00..08 | Signer constructor and reference |
| system_program | 08..10 | 10..18 | Program<System> constructor/reference |
| user_volume_accumulator | 10..70 | 18..78 | Account<UVA>; info reference plus deserialized state |
| user | 70..a0 | 08..10 | owned AccountInfo versus borrowed UncheckedAccount |
| event_authority | a0..d0 | 78..a8 | event_cpi generated AccountInfo |
| program | d0..100 | a8..d8 | event_cpi generated AccountInfo |

Original aggregate size256 versus current216 differs by exactly48-8. Original wrapper's tail memcpy length ea at e6800 and current c2 at 9c0d8 differ by40. Leading16 and trailing6 bytes explain their full aggregates. This corroborates ownership; size alone was not the basis of the proposal. Original final system/account leading stores are d10f8..d1110; user copy is d0f68..d0f90. Current corresponding final stores dada0..dade0 and user reference input d9b08 establish the alternate placement.

The handler confirms the same provenance: original user key is loaded through context+70 at5d1f0, current through the user reference at context+08. Original writes initialized state user at context+18; current at+20. Both retain the accepted Clock-before-user-state-store order: original Clock call5d150 precedes stores5d218..5d230; current Clock callc3590 precedes state stores. The proposal changes no handler statement, seed, space137, init_if_needed, payer, system program, event, signature constraint, or macro. The whole init_if_needed helpers d1290/daf58 are retained; their remaining control/data/diagnostic differences are not claimed solved by this declaration.

## Close negative result

Original parser ce7f8/current dcdf8:4056 bytes; wrapper e6c98/current9c478:1056; exit cf7d0/current dddd0:712. Each complete pair has identical normalized instructions and relocation patterns. The verifier checks these directly from both executables; raw bytes may differ at relocations/calls. This supports existing Signer user, Account<UVA>, generated AccountInfo members and close/refund ownership. It does not imply all target bodies or relocation data are equal.

Close handler remains2816/2768 bytes (5c590/c4068). Original snapshots state fields before Clock: context+48,+40,+38,+30 at5c5a8..5c5d0, then user key at5c5d8..5c620, Clock5c638. Current obtains key then Clockc40e0, then reads state. No intervening state write, CPI or recoverable mutation is established; changing evaluation order only to reproduce scheduling is unsupported. Complete bodies/call/data rows remain available rather than inferring equivalence from event names or instruction size.

## Limits and next gate

This is a one-declaration source proposal, not tested candidate success. A future separately authorized pinned build must verify parser/wrapper/member drops, full inventories, backend stack and the unchanged corpus. Existing corpus cannot establish stopped initializer-success paths or universal equivalence. No fixed-admin workaround or new initializer-success fixture is proposed. Remaining init helper/handler and close handler differences remain open. Existing unrelated Claim diagnostic line147→149 remains explicit; this proposal does not fix or hide it and future source-line changes must be recorded honestly.

Run: `python3 -B work/amm-init-close-context-review/verify.py --repo .`.
