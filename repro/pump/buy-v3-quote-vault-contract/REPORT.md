# BuyV3 B4: static quote preflight and vault helper proposal

Partial source recovery, not an integration candidate. No build, runtime, new fixture, network request, main mutation or git mutation was performed. All 117 historical BuyV3 rows remain requirements (105 successes, 12 failures); this proposal has not executed any of them. Original whole-file identity is not achieved. B4 remains open for typed residuals and transitive closure.

## Inputs and resolution

The complete original allocation is 10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The current candidate is the 1,582,168-byte `2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`; its symbol ELF is `78cbc62e21a5df9f16ee346f0609441168f52088157bc601851d10e7e3cf757d`. The verifier rechecks whole-file hashes and identical candidate/symbol `.text`. It does not transfer a historical receipt to this source proposal.

`input-bindings.json` records exact read sources, sizes and hashes. Original partial-composition reports, obligations, failure record, manifest and seal are preserved under `prior/`. The current checkpoint report, manifest and seal are also preserved. Only `public/` is deliverable; the enclosing worker files are not part of the package.

Fresh signed relative-call decoding gives:

| Callsite | Encoded signed immediate | Actual target |
| --- | ---: | --- |
| `1480b8` | -102934 | `7f010` |
| `7f600` | -54687 | `14910` |
| `7f868` | -54004 | `160d0` |

None of these sites has a relocation. Addresses here are original ELF virtual addresses. Windows `7f010..7fde8` (3544 bytes), `14910..160d0` (6080 bytes), and `160d0..16bb8` (2792 bytes) end at the next statically called entry; they are not asserted historical symbols. The current candidate's `trade::check_quote` resolves afresh to `94938`, length8200. It is not original `94908`, and its different source behavior must not be used as original evidence.

`byte-ledger.json` retains every instruction, encoded branch destination, direct call, relocation and LDDW for nine selected windows, including the two immediate preflight dependencies. Shape candidates mask call immediates and both LDDW immediate halves; this intentionally weak comparison does not prove data equality, call-target equality or source identity. Every matching alternative is retained, including memcpy/memmove and two ToString candidates. Full original/candidate ELF bytes differ. No proposal binary exists, so neither raw nor normalized proposal-body equality is claimed.

## Preflight contract: 7f010

The stored quote key is compared with 32 zero bytes at `7f070`. The `7f150` zero branch goes to `7f888`, skipping both vault and user helpers. Therefore **native means stored quote == zero**, not supplied mint == WSOL. The earlier typed asymmetric relation is supplied==stored OR (stored-zero AND supplied-WSOL). A stored WSOL key remains a token branch. The proposal neither adds a quote whitelist nor checks base-token ownership.

The token branch copies quote mint/program keys, clones the curve, mint and token-program AccountInfos, then calls the vault helper. At `7f5c0`, caller stack slot `-0xfe8` is explicitly zero. In the callee it is loaded at `14a90` and tested at `14dc0`: this is the creation-enable input. **BuyV3 disables creation at this callsite.** A generic creation arm exists in the shared helper; it is not evidence that this BuyV3 call allocates a missing vault. This distinguishes a real call parameter from the old legacy-only domain fence, which is not original behavior.

Vault success (tag2) is followed by releasing its temporary AccountInfo clones, then user validation at `7f868`. Only then is `7e490` called at `7f908`, for both native and token paths. It receives global state at context+0 plus8, recipient at context+0x68, native bool, and copied mint/program keys. On token paths it checks recipient program owner, borrows/decodes the token account, checks mint, releases the data borrow, invokes recipient authorization at `98438`, then checks the ATA address derived from the decoded token authority. The native arm authorizes the recipient key directly through `98438`. Full Global layout/authorization semantics at that callee remain a typed dependency; there is no success stub.

After successful buyback admission, native returns no token metadata. Non-native invokes `94908` at `7fc40`, with a cloned quote-mint AccountInfo. `94908` compares the mint account owner to the literal Token2022 program at `1b5ca8`. A non-Token2022 owner returns four zero words at `94b00..94b18` without a data borrow. The Token2022 arm is opaque here; its extension extraction, Clock/epoch behavior and metadata payload are not reimplemented. The outer output has native byte at+0 and metadata/error tagged storage at+8,+16,+24,+32. Logical `Option<()>` represents only the absent ordinary payload, not the full original ABI. No decimals read belongs to this ordinary metadata arm.

## Vault contract: 14910

Logical arguments recovered from registers and extra stack inputs:

| Location | Meaning |
| --- | --- |
| r1 | result storage |
| r2 | quote vault AccountInfo |
| r3 | curve authority AccountInfo |
| r4 | quote mint key |
| r5-0x1000 | quote token-program key |
| r5-0xff8 | quote mint AccountInfo |
| r5-0xff0 | quote token-program AccountInfo |
| r5-0xfe8 | allow-create value (false in this BuyV3 caller) |
| r5-0xfe0 | payer/user AccountInfo |
| r5-0xfd8 | system-program AccountInfo |

The order is observable and must not be rearranged:

1. Derive ATA via `149c8 -> 1991e0` using authority key, mint and token-program key. That callee constructs three32-byte seeds in order authority, token-program, mint under the ATA program. Compare supplied vault key at `14a40`. Mismatch builds ConstraintSeeds2006 at `15018`, attaching supplied key then derived key. This precedes owner checks and any allocation or data borrow.
2. Compare vault program owner to32 zero bytes (SystemProgram) at `14ae0`. System-owned and create-disabled reaches AccountNotInitialized3012 (`15650`). There is no lamport/data-length test replacing this owner predicate. A non-system owner must equal the supplied token program at `14b20`, otherwise AccountTypeNotSupported6010 (`14c80`), with actual/expected owner keys.
3. The generic create-enabled arm calls `15578 -> 199918`, the idempotent ATA instruction builder. Its shim sets instruction discriminator1 and calls **1993f0**, resolved from the actual encoded operand at199930. The six instruction roles are payer, ATA, authority, mint, system and token program. `15f70 -> 1a0508` invokes with six cloned AccountInfos in that order, no signer seeds. Funding, rent, allocation and token initialization are delegated to the ATA program; no local 165-byte allocation or fixed rent constant is evidenced here. CPI failures are converted and returned after cleanup. On success `15fc0` jumps to **14b08**, rechecking the now-current owner against the token program before decoding.
4. `15170 -> 1a2ca8` obtains a fallible shared data borrow; `151f0 -> 185ed0` decodes the token interface account. Decode failure precedes mint comparison. `152d8` compares decoded mint with supplied mint; mismatch is6004 at`15380`, with actual/expected mint keys. Success releases the borrow at`160a8..160b8` and returns tag2. There is **no separate internal token-authority equality check** in this vault helper. Do not add one as a claimed source recovery.

## User contract: 160d0

Arguments are result r1, user token AccountInfo r2, user authority AccountInfo r3, mint-key pointer r4, token-program-key pointer r5. Order: owner equality (`16118`;6010 at`16898`), fallible data borrow (`16160`), token decode (`161e8`), mint equality (`162d0`;6004 at`16488`), internal authority equality (`16628`;6010 at`16a30`). Both mint/authority failures attach actual then expected keys. Success goes to`16b88`, releases the borrow, then returns tag2. There is no ATA derivation, creation, separate writable/signer validation or balance requirement here. Those must not be invented from the parameter's name; enclosing parser and later CPI obligations are separate.

## Data, callee and lifetime closure

`185ed0` has a shape candidate at current`13fd28`, the Anchor token-interface unchecked decoder. For exactly165 bytes it calls original`194388` to unpack the fixed account and checks initialized state before success. The proposal uses SPL Token2022's ordinary Account::unpack for this admitted fixed layout; frozen is an initialized state. It does not substitute unchecked indexing or ignore borrow errors. Other lengths (including the decoder's355 rejection and extension-tail paths) are deliberately unresolved in source; no claim is made that they all reject. This keeps extension-specific residuals opaque.

Both vault/user helpers keep their shared `Ref` alive through field comparisons and error construction. On every decode/comparison success or failure that acquired the borrow, the borrow guard is released exactly once before returning. AccountInfo Rc increments/decrements and strong/weak cleanup in the preflight are distinct from the shared data borrow. CPI AccountInfo clones remain live for invocation; instruction vectors and clones are destroyed on either CPI result. `baf8` is the actual cleanup target. Its full destructor/deallocation graph and allocator/panic behavior remain unresolved, so a lexical Rust lifetime proposal is not a byte-identity claim.

Actual direct targets include ATA derivation`1991e0`, instruction shim`199918`, invoke`1a0508`, borrow`1a2ca8`, decoder`185ed0`, errors`19bb30`/`19bbb8`, key attachment`19c1b8`, formatting/name paths`157380`/`15de88`/`19e730`/`19f570`, panic`1ace18`, memory helpers`1b3610`/`1b3678`, cleanup`baf8` and ToString`a938`. Relocated abort calls are reported as abort, never as self-calls from immediate-1. `byte-ledger.json` enumerates all sites, not just this selected list.

The literal at`1b6847` is the27-byte path `programs/pump/src/buy_v2.rs`; its appearance does not authorize resuming the excluded sell_v2 lane. Observed line constants are retained as evidence only, not pasted as invented origins into Rust macros. LDDW table pointers and formatting vtables have32-byte previews in the ledger, expressly not full object extents. The original ELF preserves the exact underlying data, but recursive object typing, relocation semantics, full formatting allocation/destruction and historical source/dependency provenance remain open. ATA program execution itself is not proven by Pump disassembly.

## Proposal, preservation and remaining work

`source/quote_helpers.rs` proposes the ordinary fixed-layout helpers and generic ATA-create flow; `source/preflight_contract.rs` proposes ordered orchestration with a required buyback-admission interface. `Recovery::Unresolved` is an explicit analysis-only type, not an on-chain error, accepted execution or dispatch to the old implementation. There is no dispatcher mux, parser retry, old-body fallback, arbitrary owner whitelist or unconditional success. These files have not been typechecked; host paths, generated parser integration, errors and original ABI remain unclosed.

The creation flow is more general than the actual BuyV3 false flag; it is included to expose the shared helper's real contract, not to enable creation in BuyV3. Ordinary helper admission does not depend on the base mint owner, so it avoids the old fence's reasoning error. This does not establish that all117 rows execute:31 saved successes involve Token2022 quote metadata, all117 have Token2022 base owners, and B1/B2/B5/B6/B7/B8 remain separately open. Preparation at3cd50/3d250 is left entirely to the native worker. No prior excluded implementation/probe was used to fill a gap.

The verifier compares every retained Buy row's canonical full-row hash, case, original error and volume poststate against the fixed saved receipt and preserved ledger. These remain historical comparisons for candidate73100357..., not tests of this proposal. The earlier worker interruption, manifest repair history and failed fence-preservation premise remain in the unmodified prior report/failures. New analysis mistakes and their corrections are recorded in`failures.json`.

## Verification

Run `python3 -B verify.py` from a separate copy of this directory. It uses only Python's standard library and included public files. It checks exact inventory/hash seals, selected predecessor membership, ELF identities, reproducible ledger, all assembly instruction bytes, decisive branch/call targets, caller create=false, and all117 preservation obligations. Integrity failures are fatal. Hashes are not signatures. It does not compile Rust, emulate SBF, issue transactions, validate original provenance cryptographically or certify transitive semantic equivalence. The adjacent worker-level `verification-results.json` records the separate-copy and tamper checks and is explicitly public evidence; no other adjacent file is allowlisted.
