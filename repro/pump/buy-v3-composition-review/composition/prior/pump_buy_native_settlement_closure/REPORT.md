# BuyV3 ordinary native settlement correction

**Static recovery and concrete conditional source correction. Not an accepted implementation.** Fixed checkpoint: `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. Existing extraction was retained and compared again with `git show` of that exact checkpoint. No parent source/configuration changes, builds, typechecks, target execution, probes, transactions, fixtures, or network access were performed. Completion/handler counts remain unchanged.

The predecessor proposal's two user-funded System transfers are not faithful to ordinary native BuyV3. The original first transfers **curve payment plus combined buyback from user to curve through System CPI**, then **directly subtracts combined buyback from the curve's actual lamports and credits the buyback recipient**. The supplied `minimal.diff` replaces only that native fragment in the completed partial proposal. The full reviewable result is `proposed/programs/pump/src/trade.rs`; `native_fragment.rs` is the exact replacement. No claim of historical Rust identity, compiled equality, full account acceptance, or whole-program equivalence follows.

## Identity, admission and ledger

The inherited BuyV3 literal and wrapper attribution are preserved in `prior/proposal`. Wrapper interval `[0x1286c8,0x128c28)`, parser entry `0x102578`, body interval `[0x147ba0,0x1489f8)`, shared body return `[0x148600,0x148620)`, and wrapper exit/serialization obligations remain distinct. `0x128930 -> 0x147ba0` and `0x1488c0 -> 0x83c00` are decoded from signed instruction operands. These intervals are inferred windows, not original symbol identities. Parser and complete serialization correctness are inherited application boundaries, not newly certified by reading a body.

Let A be the admitted context pointer (`body r9`, loaded at `0x147bc8`; settlement incoming r2); F is the settlement stack. Context bindings are imported from the preserved BuyV3 account/layout contract and corroborated by the following loads. Source names are natural labels for these admitted interfaces, not an inference from compiler field ordering alone.

| Offset / reaching definition | Identity and use |
| --- | --- |
| A+0x00 | Global wrapper; whitelist bytes at wrapper+0x288 |
| A+0x08 / A+0x18 | base mint / base token program |
| A+0x10 / A+0x20 | quote mint / quote token program; not System in the native arm |
| A+0x28 -> F-0x1c8 | curve wrapper; wrapper+0 holds its AccountInfo; wrapper+8 decoded state |
| A+0x30 -> F-0x1d8 | base curve token account wrapper, saved at 0x83eb8 |
| A+0x48 -> F-0x210 | base user token account wrapper, saved at 0x83ec8 |
| A+0x38 / A+0x50 | quote curve / quote user account handles; zeroed native dispatcher arguments bypass their token use |
| A+0x40 -> F-0x228 | user handle; its key compared with whitelist, and source handle passed to native funding |
| A+0x58 | decoded user-volume wrapper; initialization remains a predecessor application gap |
| A+0x68 | buyback recipient handle; cloned at 0x84730 |
| A+0x70 | System AccountInfo, loaded into r3 at 0x84648; forwarded to native helper r2 at 0x979a8 |

`caller-callee-ledger.json` records exact bytes and decoded targets, including error branches. `source-ledger.json` records the whole proposal hash, consumed source lines/bytes, and exact replacement boundaries. `inputs.json` records whole-input hashes, sizes and extracted disassembly byte/line intervals. `consumed-ranges.json` binds the corresponding original ELF offsets and hashes. Disassembler angle-bracket annotations are displaced and are never used as target authority.

## Order, amounts and account effects

The normal admitted domain is non-Mayhem, user unequal to whitelist, noncashback, ordinary Tokenkeg base and either native quote or ordinary Tokenkeg quote, with the prior valid quote/fee/account admission premises. This package corrects the native part. It does not expand native mint acceptance or implement token extensions.

The inherited arithmetic computes first/residual gross obligations G1/G2 and separate floor buybacks b1/b2. Let B=b1+b2 and P=G1+G2-B under ordinary identity amount adapters. The pretrade max-cost check already checks P+B. At settlement, first reserve writes and the base-token transfer occur before user-volume initialization/fee accrual. First and residual buybacks are summed with an explicit unsigned overflow check at `0x84160..0x84190`.

Native flag F-0x1e0 is nonzero. `0x841a8` selects `0x841b8`, then `0x841d8 -> 0x81848` checked-adds F-0x218=P and F-0x220=B. This helper stores tag 2 and sum on success; overflow enters the numeric 6024 error construction (`0x81a28`). `0x84218 -> 0x84628` passes the sum in r6. Dispatcher frame -0xff8 receives that amount at `0x84698`; -0x1000 receives the curve wrapper at `0x846a8`. r4 is A+0x40 (user handle), r3 is System AccountInfo, r2 is native flag. The call at `0x846d8 -> 0x97930` therefore has concrete native identities, not the route contract's formerly incomplete program-handle reaching definition.

At `0x97950`, nonzero r2 jumps directly to `0x97990`, avoiding token-only missing-account/panic checks. `0x979b8 -> 0x8df98` receives result, System AccountInfo, user handle, curve wrapper, and P+B. `0x8dfa8 -> 0x8e438` skips cloning and CPI for zero amount. Otherwise program, user, then curve AccountInfos are cloned; `0x8e418 -> 0x19e090` invokes the imported System transfer adapter. Its instruction is program ID zero, u32 variant 2 followed by u64 amount, source signer+writable and destination writable, two AccountInfos, empty signer seeds. Thus this is user authorization through System CPI, not a direct debit by Pump and not a curve-signed transfer. CPI error propagates before buyback (`0x846e8 -> 0x84790`). Allocation, reference-count overflow/abort, invoke preflight and external System behavior remain bounded framework/runtime premises.

On funding success the native branch clones `*(A+0x68)` at `0x84730`, then `0x84760 -> 0x965b8` receives result, **curve wrapper**, cloned recipient AccountInfo and **B in r9**. Success `0x84770 -> 0x84830` bypasses the token buyback transfer. There is no second System transfer, no native route helper `0x58f58`, no route self-invocation and no SyncNative in this BuyV3 branch.

The direct helper `[0x965b8,0x969f0)` is fully retained:

1. Zero B branches at `0x965d8 -> 0x96888`, returning tag 2 after destination reference cleanup. Caller cloning still precedes this zero gate. No lamport read, subtraction, mutable borrow or credit occurs.
2. Source AccountInfo is loaded through curve wrapper+0. `0x965f8 -> 0x1a29f0` reads its **actual current lamports**, after System CPI, not real/virtual reserves or token amount. The read temporarily increments a shared borrow counter and restores it. Counter outside the admitted shared-borrow range takes a terminal dependency, not a returned mutable-borrow error.
3. `0x96608` requires source balance >=B. Failure constructs raw `0x8000000000000017` and converts it at `0x96648`. Source mutable borrow at `0x96680 -> 0x1a2c30` requires counter zero; otherwise raw `0x800000000000000b` is returned. Success is sentinel `0x800000000000001a`.
4. Source subtraction is stored at `0x966c8`; borrow release is at `0x966e0`. Only then does `0x966f8 -> 0x1a29f0` read destination lamports. Addition overflow branches `0x96730 -> 0x967c0`, using the same raw arithmetic sentinel. Destination mutable borrow is at `0x96750`, destination store at `0x96798`, release at `0x967b0`. Conversion calls and destination cleanup precede result stores at `0x969d8/0x969e0`, exit `0x969e8`.

There is no local owner, signer, writable, rent-floor or equal-key check in this helper and no CPI. Those omissions describe the helper, not permission to relax upstream/runtime requirements. Shared aliases to the **same lamport cell** are locally supported by the sequential release/re-read: with sufficient source balance, debit then credit restores that cell. Equal keys alone are not proof of equal cells or of original parser acceptance. Outstanding shared source borrows allow the read but reject the mutable borrow; an outstanding mutable borrow can fail at the read. A destination failure occurs after source debit and is not locally compensated. Whole-transaction rollback is an external premise. The correction preserves release before the destination read; a simultaneous pair of mutable borrows or a destination balance cached before debit would change alias behavior.

Natural `ProgramError::ArithmeticOverflow` and `try_borrow_mut_lamports`/`lamports` are the proposed framework counterparts. The raw sentinels and conversion targets are evidence; their exact historical enum layout, Anchor error conversion, diagnostic source locations and exceptional ABI are not proven. No guessed custom insufficient-funds check is introduced. Source helper/refcount implementation and failure detail must be reviewed against the chosen framework before acceptance.

## Reload block and balance distinction

`0x83f00..0x83f88` compares the **user key** with Global whitelist bytes, length 32. Encoded `0x83fa0 -> 0x84468` is taken only on equality. The admitted ordinary user is unequal; it continues at `0x83fa8`. Both native and nonnative ordinary funding skip the reload block. It is not an unconditional post-transfer refresh and must not be added to the ordinary correction.

For the excluded equality alternative only, the retained interface is concrete: `0x84490 -> 0x7890` reloads base curve wrapper+0x20, then on tag-2 success `0x844d0 -> 0x7890` reloads base user wrapper+0x20. Errors forward their respective payloads before the next operation. `0x7890..0x7b40` borrows account data, deserializes through `0x185ed0` (call at 0x7930), copies decoded token fields back into the wrapper and releases the data borrow; borrow/deserialization errors do not become success. Parser internals are an interface premise, not new extension work.

`0x84538/0x84548` then read the reloaded token amounts at outer wrapper+0x68. The copied 32-byte curve field at wrapper+0x28 is the quote key, not lamports. `0x84578 -> 0xa23f0` receives decoded curve state, the two token amounts and that quote key. On success `0x84588 -> 0x83fa8`; failure forwards the error. Only its retained entry prefix is analyzed, not its general alternative-mode policy. Consequently full whitelist recovery is explicitly unresolved and unnecessary to the admitted ordinary source correction. The actual base-vault amount used earlier for residual pricing is an inherited pre-transfer token amount; it is distinct from these whitelist reloads and from direct native lamport reads.

## Amount adapters and reconciliation with the published route contract

The predecessor's tag-zero input adapter `0x95360` preserves P. Post-funding calls `0x84858` and `0x848a0` go to `0x950e0` on B and b2. This adapter calls `0x94e28`; tag zero returns removal zero (`0x94e40/0x94e48`, jump to 0x950d8). `0x95128 -> 0x95250` then subtracts zero. Therefore returned total and residual buyback remain B and b2, and first buyback is B-b2=b1. Nonzero adapter tags, their producer's full validation, and extension arithmetic are not newly implemented; admitted native/tag-zero production remains an explicit preflight premise.

The ordinary native-route publication supplies the same original `0x8df98`, `0x965b8`, balance/borrow helpers and System builder contract. Its ELF SHA256 equals this checkpoint's original ELF (`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`). Its disassembly file has a different whole hash; this does not substitute annotated names or assert text-file equality. The verifier compares retained instruction bytes to the shared ELF.

Route-specific buyback additionally invokes self then SyncNative, and route preparation conditionally tops up rent. Those effects belong to different callers and are **not imported into BuyV3**. Route native input preceding its reserve mutation likewise does not override the BuyV3 order established here. Prior route/proposal manifests and all their copied members remain byte-identical; their original reports are preserved, with supersession of the two-transfer hypothesis stated only in this new report.

## Application boundary and verification

This closes the native funding/direct-mutation/reload-reachability gap for the bounded ordinary proposal. Root still must resolve original user-volume parser, zero-key initialization and serialization, native mint/context acceptance, holder/event details and admitted alias relations from the predecessor. Initialized volume, valid accounts, identity amount adapters, normal allocation/reference counts, correct framework CPI/borrow interfaces and runtime rollback are explicit premises. The correction does not replace those missing checks with success. No acceptance counts change until root reviews and tests an actual implementation.

`verify.py` uses only Python standard library and no Git/network/runtime dependency. It checks the sealed inventory, preserved predecessor seals, whole input hashes/sizes, extracted instruction bytes against the original ELF, signed call/branch destinations, selected error/store ordering anchors, exact source replacement and reconstructed diff. It does not execute SBF, proposed Rust or transaction models and is not a semantic-equivalence proof. The full parent disassembly's hash/range provenance was refreshed with fixed-checkpoint `git show`; omitted parent text cannot be reconstructed by an offline verifier. Original ELF bytes outside named ranges are opaque hash input. `manifest.json` seals all publication members except itself and its detached `manifest.sha256`; the detached digest is the immutable handoff anchor. Verification was run from a separate copied publication inside the assigned directory; its receipt is outside publication. CLI telemetry and interrupted raw sessions are not published.
