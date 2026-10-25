# Ordinary zero-quote native route settlement

**Substantive static interface recovery; partial closure. No source patch.** Native input, direct output, buyback's direct lamport move/self invocation/Tokenkeg SyncNative sequence, and the route's conditional rent top-up are now tied to admitted caller arguments. Runtime conservation, rollback, external processors, rent floating-point primitives, upstream context acceptance, and complete exceptional-path ABI remain obligations.

Accepted source checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. Original Pump ELF: Git blob `85cb0059f2814c86224fdfea778c56df770dd920`, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Original disassembly: blob `5b5e301459060ae51ddca1594584f7f470e92e48`, SHA256 `b77243c4614b2d03761480f1ed52faab7be906650fcdb706590e5585c89ac360`. `provenance.json` records exact end-exclusive ELF file offsets and original disassembly line ranges. Labels are inferred interfaces/excerpts, not original Rust symbols or asserted historical function extents. Encoded relative targets control, not displaced LLVM annotations.

## Admission and dependency limits

Immutable settlement/accounts reports admit the route at `0x5b3b0`, native buyback `0x5eb68 -> 0x58f58`, and native output caller branch. The root-reviewed Tokenkeg package supplies AccountInfo layout, common invoke/borrow interfaces, and its original relocation binding. The vault report supplies the zero serialized quote distinction: wrapper+0x28 equals zero; the quote mint is normalized to WSOL upstream. Stored WSOL, zero System Program owner, and zero quote sentinel are not interchangeable.

Before reading each new helper, its caller establishes:

| Caller → callee | Admitted arguments and role |
|---|---|
| `0x5e030 → 0x8df98` | result; AccountInfo loaded through caller r7; user handle `F-0xa50`; curve wrapper `F-0xab0`; input amount `F-0xa78`. Native input transfer adapter. |
| `0x5e2b0 → 0x965b8` | result; curve wrapper; cloned AccountInfo from `*(F-0xa50)`; net output `F-0xa70`. Direct native output. |
| `0x5eb68 → 0x58f58` | result; route context A; incoming route r3 saved at F-0xa58; curve wrapper C; adapted buyback r7. Native buyback adapter. |
| `0x592a8 → 0x965b8` | same curve wrapper, cloned `*(A+0x38)` destination, buyback amount. Reuses direct native output interface. |
| `0x8e418 → 0x19e090` | record with program/source/destination AccountInfos, empty seed slice, input amount. System-style transfer CPI. |
| `0x19e0d0 → 0x1a73f0` | output instruction; source/destination keys; amount. Two-meta builder; then `0x1a7548 → 0x1a46a8` admitted only for encoded variant 2. |
| `0x59c80 → 0x195dc8` | instruction output, literal Tokenkeg key, buyback destination key. Single-account builder; `0x195f00 → 0x194c40` admitted only for constant variant 17. |
| `0x5b428 → 0x3cd50` | result; H[16] curve wrapper; A+0x50 program handle; A+0x18 payer handle. Preparation before trade/account/fee processing. |
| `0x3cf48 → 0x3d250` | same handles; size=max(curve AccountInfo data length,166). Conditional rent funding preparation. |

F denotes the route frame, A=`*(F-0xa48)`, C=`*(F-0xab0)`, H the admitted five-account record. `0x5b3d8..0x5b420` establishes A+0x50 and F-0xa50=A+0x18. Context labels user/system/event authority follow the frozen declarations, while offsets remain authoritative. Full original context-parser signer/executable validation and a complete all-path reaching-definition proof of native-input caller r7 remain residual; the CPI builder itself fixes the program ID to zero regardless of that program AccountInfo. No source declaration is used as proof of original parser behavior.

`prior/wide/CONTRACTS.md` is consumed as a manual instruction-ledger/algebra contract, **not automated proof**. It supports the imported buyback floor formula and unchanged amount selection; these are not re-proved here. The partial-types trade chain is buy_v3, not legacy buy. Root-reviewed pending-publication packages are explicitly labeled in `prior-inputs.json`; they are not reattributed to the frozen commit. Only copied members are checked against preserved seals.

## Direct native output and buyback lamports

`0x965b8..0x969f0` has the following local order, for valid admitted pointers and successful opaque error/cleanup dependencies:

1. Amount zero branches `0x965d8 → 0x96888`, skipping all balance and mutable-borrow work; destination reference cleanup still occurs. Return tag is 2.
2. Read source AccountInfo from curve wrapper +0 (`0x965e8`), then its lamports through `0x1a29f0`. That read checks the unsigned borrow counter <= `0x7ffffffffffffffe`, temporarily increments, reads the underlying u64, and restores the counter (`0x1a29f0..0x1a2a48`). Read failure calls the terminal dependency at `0x1a2a60`; it is not the tagged mutable-borrow failure path.
3. Require source balance >= amount (`0x96608`). Insufficiency produces raw sentinel `0x8000000000000017` before opaque conversion, not a newly assigned Anchor variant.
4. Mutable source lamport borrow `0x96680 → 0x1a2c30`: require zero borrow counter, set -1, return value/counter pointers. Failure returns sentinel `0x800000000000000b` through conversion before a balance store. This interface is imported from the Tokenkeg package.
5. Store source balance minus amount at `0x966c8`; release borrow by incrementing its counter at `0x966e0`.
6. Only now read destination lamports (`0x966f8 → 0x1a29f0`), add amount, check unsigned overflow (`0x96708..0x96730`). Overflow uses the same raw `...0017` sentinel. Then borrow destination mutably (`0x96750 → 0x1a2c30`), store destination sum at `0x96798`, release at `0x967b0`, and clean up the cloned destination.

The helper has no local signer, writable-byte, owner, rent-floor, or equal-key check, and no invocation. That is not permission to bypass those requirements: upstream acceptance and runtime privilege/ownership enforcement are separate dependencies. Distinct successful balances change by (-amount,+amount). This arithmetic conservation statement does not certify arbitrary aliases. If destination read/overflow/borrow fails, the source store has already executed in local memory. No local compensating source store is present. Transaction rollback and eventual committed conservation are runtime assumptions, not consequences of the stores alone.

Caller gates `0x5e208..0x5e258` require zero quote comparison, nonzero direction comparison (ordinary sell), and nonzero final-transfer control before output. Amount is F-0xa70. Native buyback is selected by fee flag and zero quote at `0x5e1f8..0x5e208`, `0x5e2d8..0x5e2f8`; success of buyback returns to the native-output gates (`0x5eb78 → 0x5e208`). Thus native sell output follows fee accrual and buyback, unlike the earlier nonnative output CPI. Flag zero skips buyback but still permits native sell output.

## Native input and System transfer interface

`0x8df98..0x8e450` skips on amount zero before cloning. Otherwise it clones program, user/source, and curve/destination AccountInfos in that order, incrementing lamport/data reference counts. Wrap checks follow the stored increments; relocation `0x8dff8` is `abort`. These are reference-count effects, not lamport credits.

The record passed to `0x19e090` has 48-byte AccountInfos at +0x18 program, +0x48 source, +0x78 destination; +0xa8/+0xb0 signer pointer/count. Count is zero (`0x8e3c8`), remaining-account vector empty. The builder consumes source/destination keys and amount (`0x19e0a8..0x19e0d8`).

`0x1a73f0..0x1a7558` emits two 34-byte metas: source `(signer=1,writable=1)` and destination `(0,1)` at `0x1a7488`, `0x1a74d0`. Program key is the 32 zero bytes at `0x1b5ba8`. The tag-2 serializer path sets allocation length 12; `0x1a4900` writes u32 little-endian 2 and `0x1a4978` writes u64 amount at offset 4; `0x1a5fb8..0x1a6078` returns instruction vectors and program key. Allocation-failure paths remain opaque.

`0x19e0d8..0x19e198` copies AccountInfos in source,destination order, count two, forwarding the empty seed slice to `0x1a0530`. The imported common invoke contract checks matched lamport borrow before data borrow for each meta; writable metas use mutable checks. It reaches `sol_invoke_signed_rust` at `0x1a2068` with instruction, two infos and zero seed groups. Program AccountInfo is not a third entry. Signer privilege, source ownership/balance, external System execution and its error ABI are not implemented by these local builder bytes. No local input-lamport mutation is claimed.

The native input call result is checked at `0x5e048` before buy reserve mutation at `0x5e078`. Frozen source lines 257-259 corroborate user→curve intent; its own amount-zero/exceptional order must not replace the original interface.

## Native buyback sequence and conditional invocations

`0x58f70` skips all buyback effects for zero amount. Nonzero first clones destination `*(A+0x38)` and curve AccountInfo (`0x58f78..0x592a8`), then calls the direct lamport helper. Its non-success result skips the later invocations. Success constructs:

- Program ID bytes from four literal words at `0x59658..0x596b8` (the source's Pump ID is a corroborating label).
- Eight data bytes `e4 45 a5 2e 51 cb 9a 1d` at `0x59640..0x59658`; no amount serialized into this self-invocation payload.
- Metas in order: key at A+0x60 `(signer=1,writable=0)`; curve key `(0,1)`; buyback destination key `(0,1)` (`0x59410..0x59580`).
- AccountInfos in the same order: inline A+0x60, curve, destination; count three (`0x596e8..0x59980`, `0x59a48`). No fourth program AccountInfo is supplied by these bytes.
- One signer group with two seeds: literal `__event_authority` length 17 at `0x1b6807`; low byte of original route r3, saved through helper frame -0x1f0. Descriptor construction `0x59980..0x59a10`. The bump's validity/derivation is an upstream obligation, not recomputed here.

`0x59a50 → 0x1a0530` invokes; success sentinel `0x800000000000001a` is checked at `0x59a70`. Readonly event-authority meta uses shared lamports then shared data checks; curve and destination use mutable lamports then mutable data checks. These ordered preflight checks and syscall interface are imported unchanged. Runtime PDA signing, callee dispatch/body, writable enforcement, and the source comment that this 'flushes' balances are **not proved** by construction of the invocation. No self-handler body was followed.

After success and cleanup, `0x59bf8..0x59c80` constructs the exact Tokenkeg program key and invokes the single-account builder `0x195dc8`. It compares that program with bytes at `0x1b5b28`, builds one destination meta `(signer=0,writable=1)`, and packs constant variant 17 from `0x1ba2d0`. The admitted pack arm writes byte `0x11`, length one (`0x194ed8..0x194ee8`, `0x1952a0..0x1952d8`). This binds the SyncNative interface without inspecting token execution.

`0x5a0b8 → 0x1a0508` receives instruction and one destination AccountInfo. That wrapper supplies zero signer groups to `0x1a0530`; success is checked at `0x5a0e0`. Hence direct lamport credit precedes self CPI, which precedes Tokenkeg SyncNative. Any downstream failure occurs after the local move; rollback is external. Token amount/rent-reserve synchronization semantics belong to Tokenkeg, not these original Pump bytes.

## Rent preparation and balance distinction

The admitted `0x5b428` preparation call precedes route transfer/account/fee work. `0x3ce88` reads curve data length through the already identified AccountInfo length helper `0x1a2a68`. `0x3cf18..0x3cf48` passes max(length,166) into `0x3d250`. After successful funding preparation, length >=166 skips resizing (`0x3cf70`); shorter-account resize is recorded at `0x3d0a8` but its body is not followed or closed.

For zero quote, `0x3d298..0x3d2e0` compares wrapper+0x28 with zero. `0x3d318 → 0xa2188` receives decoded state wrapper+8 and checks the sum of its +0x70 and +0x78 fee counters; sum overflow enters numeric code 6024 (`0xa2378`) and opaque error conversion. The caller adds wrapper+0x60 (decoded state real quote reserve +0x58) with its own overflow check (`0x3d338..0x3d378`). Call this protected recorded amount R. Nonzero quote paths are not generalized here.

Next `0x3d4c8 → 0x1a0a20` obtains rent; its imported relocation at `0x1a0a60` is **sol_get_rent_sysvar**. Nonzero syscall result is converted and forwarded before balance checks. Default-looking initialized fields (3480, float bits 0x4000000000000000, byte 50) are not assumed to survive a successful syscall. `0x3d598 → 0x1a0ae8` receives that record and max(length,166). Call its returned word M. The retained helper checks size+128, uses the imported wide multiplication and checks high word zero, then calls floating conversion/multiplication/comparison helpers. Their full semantics are unclosed; **M is an exact returned-word interface, not an automatically proved rent formula or fixed network rent value**.

`0x3d6c8 → 0x1a29f0` reads curve lamports L. `0x3d6d0..0x3d708` computes `available = max(L-R,0)` using unsigned underflow detection. `0x3d798` skips top-up if M<=available. Otherwise `0x3d7a8..0x3d7e8` computes M-available (the subtraction is dominated by M>available), copies program/payer/curve infos, passes zero seeds, and calls the same System transfer adapter at `0x3dc50 → 0x19e090`. Source is the incoming payer handle A+0x18; destination curve. Result check precedes return/possible resize.

This is a conditional funding effect, not just `L>=rent(166)`. If L<R, the top-up is M rather than M+(R-L); this report does not infer an invariant L>=R without upstream evidence. Neither direct output nor buyback rechecks this preparation bound after debiting.

## Frozen source discrepancy and residual obligations

`source-provenance.json` gives the frozen source blob and exact original line ranges. Source lines 56-59 precompute both resulting balances and then borrow/store. The original reads/checks/debits/releases source before destination read/add/borrow. This is an exceptional-order discrepancy, not a new runtime mismatch or security finding. Source line 67 supplies four self-CPI AccountInfos versus the original three; instruction metas/data are independently bound above. Source line 211 is a fixed 166-byte rent guard, while original preparation can conditionally top up against recorded liabilities and current size. These are review prerequisites; no implementation change is safe to promote from this package alone.

Precise remaining work:

1. Original context acceptance must bind A+0x18 user signer/writable, A+0x38 accepted buyback token account, A+0x50 program key/executable and A+0x60 event authority/bump to the upstream parser. Close the full native-input r7 reaching definition and final-transfer predicate at outer caller stack -0xfe0. Offset-local interfaces here remain valid without pretending those parser proofs exist.
2. Close `0x1a0ae8` floating primitives and terminal behavior before replacing M with an unconditional rent formula. Short-account resize at `0x3d0a8` remains outside this normal length>=166 contract; no account-resize effect is certified.
3. Complete allocator, clone/drop, panic and serialized error-conversion contracts if byte-for-byte exceptional semantics are required. The supplied borrow/sentinel/order contracts do not identify all outer error variants. System-transfer adapter cleanup/error paths beyond the retained successful invocation interface remain opaque.
4. External System and Tokenkeg execution, self-CPI callee semantics, runtime signer derivation, rent/ownership/writability validation, rollback and alias handling remain external assumptions. No new runtime fixture, signature or probe is evidence for these.
5. Reconcile the frozen source ordering and self-CPI AccountInfo count only after those acceptance/dependency contracts; no scratch source patch is supplied.

All four whole-byte comparisons remain false. 140/150 bounded implementations, five partial and five unrecovered are unchanged. No exhaustive semantics/security claim follows. No stopped handlers, extension implementation, Mayhem handler, private review, arbitrary parent scratch, network, runtime, new fixtures, build, binary patch, global setting, stage/commit/push or parent write was used. Exploratory displays of adjacent common helper instructions were trimmed from the final windows and are not semantic premises.

## Portable verification

Run `python3 verify.py`. It checks exact inventory/SHA256 seal (excluding only the manifest itself), predecessor subset seals, raw instruction/disassembly agreement, selected decoded call/branch edges and decisive opcode bytes, source excerpt hashes, constant bytes and new ELF relocation linkage. It does not execute SBF, generate fixtures, prove prose, or automate the imported arithmetic derivations. Full ELF/Git identities were checked at extraction; bounded slices alone cannot independently rebind to an absent whole ELF. Copied-directory verification is retained outside this seal.
