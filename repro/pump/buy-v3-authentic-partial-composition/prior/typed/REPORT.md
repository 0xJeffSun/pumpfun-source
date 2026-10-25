# BuyV3 typed parser contract — static continuation

**Result: a corrected, uncompiled dedicated Accounts proposal and a bounded macro/reader contract; complete authentic parser identity remains unresolved. Do not integrate this packet into a dispatcher or body.** Two source-shape corrections were found beyond the prior sealed review: both base token accounts are boxed, and the final `program` account has Pump-ID and executable validation. The old report and seal are retained verbatim; its plain final AccountInfo claim is superseded only by the byte evidence described below.

No compiler, macro expansion, target execution, new runtime fixture, network request, chain transaction, main edit or other-handler implementation was used. The assignment does not establish another accepted instruction or change the 0/4 core-original identity measure. The original allocation remains complete and unmodified, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.

## Evidence and scope

Read `docs/COMPLETION.md` and the specifically assigned `buy_authentic_parser_review/publication/REPORT.md`; selected public evidence was copied from that sealed package. `input-bindings.json` binds every selected prior input and public dependency source. No neighboring worker output was consulted. The package contains no CLI logs, credentials, caches, target builds or private review material.

`analysis.json` retains every instruction byte across parser `102578..105b78` (13,824 bytes), init `105b78..107b38` (8,128 bytes), exit `107b38..107f78` (1,088 bytes), and the selected actually called reader/serializer windows. Bounds are inferred, not historical symbols. Direct call targets are computed from signed encoded operands, with relocations taking precedence. Indirect targets remain unresolved. Branch operands and LDDW values are retained. Hashes normalized by zeroing only unrelocated direct-call immediates are inventories, **not comparisons or equivalence proofs**. No proposed binary exists for raw or normalized comparison; referenced-data and transitive closure remain open.

Public dependency files came from local Anchor lang/SPL 0.31.1 and syn/account-attribute 0.31.2 packages named by the retained Cargo.lock. At collection, each selected source was byte-compared to its package archive, whose checksum matched Cargo.lock. Only source and extraction/hash records are published, not local registry/cache metadata or archives. The standalone verifier checks the published bindings and locked package checksums; it cannot independently re-prove archive extraction without those deliberately omitted archives. Matching the reconstruction lock is not proof of the original historical dependency graph.

## Corrected seventeen-field context

`contracts.json` retains all seventeen indices, mutability/signer bits, original anchors, prior hypotheses and explicit corrections. External order is:

| Index | Field | Proposed type/constraint |
|---|---|---|
| 0 | global | Box<Account<Global>>, canonical global PDA |
| 1 | base_mint | Box<InterfaceAccount<Mint>> |
| 2 | quote_mint | Box<InterfaceAccount<Mint>> |
| 3 | base_token_program | Interface<TokenInterface> |
| 4 | quote_token_program | Interface<TokenInterface> |
| 5 | bonding_curve | Box<Account<BondingCurve>>, PDA, mut, asymmetric quote constraint |
| 6 | associated_base_bonding_curve | **Box**<InterfaceAccount<TokenAccount>>, program/authority/ATA/mut |
| 7 | associated_quote_bonding_curve | UncheckedAccount, unconditional ATA seeds, mut |
| 8 | user | Signer, mut |
| 9 | associated_base_user | **Box**<InterfaceAccount<TokenAccount>>, mut, mint-only generated constraint |
| 10 | associated_quote_user | UncheckedAccount, mut |
| 11 | user_volume_accumulator | Box<Account<UserVolumeAccumulator>>, init_if_needed, payer user, space137, canonical seeds |
| 12 | fee_config | Box<Account<FeeConfig>>, foreign owner, stored bump seeds |
| 13 | buyback_fee_recipient | UncheckedAccount, mut |
| 14 | system_program | Program<System> |
| 15 | event_authority | AccountInfo, canonical event PDA |
| 16 | program | **Program<Pump>**, explicit field |

At `102c80` and `102de8`, the parser calls `38a8`. That wrapper calls `1d0`, then allocates/copies 216 bytes (`3978` and `39e0`) on success. This is the boxed typed-token wrapper, not just its unboxed inner reader. `3cc8` similarly boxes the foreign fee account with 144-byte allocation/copy. Allocation/error cleanup identity is not proven merely by choosing Box.

At `103300`, the parser calls `136f0`. That function consumes an account (missing-key 3005), compares its **key** at `13798` to the exact Pump bytes at `1b79df`, then reads executable byte `+42` at `137b8`. Its wrong-key and nonexecutable branches construct 3008 at `137f0` and 3009 at `13910`. The key bytes equal the prior data-contract's Pump owner literal. Program::try_from in the locked source implements precisely this key-then-executable contract. It does not imply a loader-owner check or a fresh program-data authority check.

The locked event-CPI attribute injects a plain final AccountInfo. Applying it to the prior declaration loses the original check, and adding another final field duplicates the ABI. The proposal instead explicitly declares both event fields and uses Program<Pump>. It does not guess a historical macro version or append a late constraint: admission must fail before Rent and volume initialization. The original event reader `2ca8` performs AccountInfo cloning; its relocation-bound overflow path is retained, not mistaken for a recursive call.

## Source-generated order and errors

This is a **manual static lowering audit** of locked Rust macro code, not execution of rustc or a macro-expansion test. `try_accounts.rs` emits all field admissions first, defers the init field's typed decode, emits init constraints before non-init constraints, and then preserves non-init field order. `constraints::linearize` puts seeds and associated-token checks before mut, raw constraints after mut, and token-account constraints late. Parser construction of init constraints supplies mut and rent automatically. These rules produce the success-path ordering recorded in `contracts.json`:

1. Admit all seventeen positions. Global, both mints, both token programs, curve, boxed base vault, signer, boxed base user, foreign FeeConfig, System, event AccountInfo and **Pump program** are checked before init. Raw positions still consume an account; init's missing-account extraction lacks the normal field-name wrapper.
2. Fetch Rent; derive the volume PDA; run its init closure; then outer volume mut and rent checks.
3. Global PDA; curve PDA/mut/raw relation; base-vault program/authority/ATA/mut; quote-vault ATA/mut; user mut; base-user mut/mint; quote-user mut; FeeConfig stored-bump PDA; recipient mut; event PDA.

Thus early foreign decoding and late fee seeds are intentional. Base vault token-program mismatch is the associated-token error, before authority and address checks. Mint-only base-user constraint emits 2014 without inventing an authority comparison. Preserve actual transfer authority/program checks and body quote-account admission; this packet neither removes them nor supplies a replacement body.

Quote relation is `supplied == stored || (stored == zero && supplied == WSOL)`. Both supplied mints first undergo the same interface reader. The relation is not symmetric: stored WSOL/supplied zero does not acquire a native shortcut. Interface owner/key membership remains Tokenkeg **or** Token2022. Interface membership does not itself equate a mint's owner with the supplied token program. The proposal delegates to the locked SPL reader; no new token-extension semantics are implemented or inferred here.

Reader chains are machine-recorded: Global `13270→96d0`, curve `13048→8320`, mint `288→32d8`, boxed token `38a8→1d0→2e48`, foreign fee `3cc8→133e0→92d0`, signer `127a0→19b4e0`, programs `120→9eb0`, System `13b80`, and Pump `136f0`. Owned/interface readers distinguish zero-lamport System uninitialized (3012), wrong owner (3007), fallible borrow, then decode. Account field decoration occurs in the generated parser; it must not be replaced with an arbitrary numeric ProgramError. Full Global/curve decoder and error-object/source-coordinate correspondence is still a dependency, not claimed closed.

## Volume init and exit

Volume canonical seeds are `user_volume_accumulator` and the signer key. Wrong PDA is 2006 before initialization. The init closure distinguishes System-owned accounts from existing owned state. Existing-state checked reader `9ab0→101c20→101ef8` precedes size2019, explicit owner2004 and rent2005 constraints; reader owner3007 may therefore win before explicit owner2004. Do not flatten these into one ownership rejection.

For System ownership, zero lamports use create-account; funded accounts check payer != target (4101), top up by `max(rent,1).saturating_sub(current)`, allocate137 and assign, using genuine PDA signing. The payer inequality is in the funded branch, not an invented unconditional precheck. After the CPI path, unchecked reader `5628→101ef8` omits discriminator comparison but retains owned-reader uninitialized/owner/borrow checks. Space, explicit owner and rent assertions then run, followed by outer mut/rent. CPI errors remain errors; no retry parser or signing bypass is proposed. A later constraint failure does not erase the ordering fact that init was attempted first.

Volume wire prefix is 106 bytes: discriminator8, user32, needs_claim1, four 8-byte values, has_total_claimed_tokens1, four more 8-byte values. Allocation is137; trailing31 bytes are preserved by prefix serialization. Checked decode distinguishes discriminator-not-found3001, mismatch3002 and malformed data3003. Standard bool decoding and all historical decoder diagnostic objects remain delegated/partially attributed, not replaced with raw offset casts.

Locked exit generation walks mutable fields only, in account order. Original `107b80→5a28` writes curve before `107d80→6158` writes volume; intervening interface exits use captured expected owners. Account exit first compares expected owner to executing program and checks closed state (System owner and empty data), then takes a fallible mutable borrow and writes. Short writes map to3004; borrow errors propagate. Interface token accounts normally skip persistence under Pump. Read-only foreign FeeConfig has no generated serialization call; its trait writer is not invoked by this context. Wrapper body-success gating remains required; no exit-after-failed-body behavior is introduced.

## Fee type and unresolved body dependency

`source/fee_account.rs` is a natural foreign typed-account hypothesis with the exact discriminator, bump/admin prefix, flat three-u64 tuple, two length-prefixed vectors of u128-plus-three-u64 tiers, and mandatory final exotic tuple. Minimum wire size is `97 + 40*(n+m)`, with trailing bytes allowed. No sorting, count cap, rate policy or canonical bump is added. Decoder `1156f0→1159d8` and its two vector-reader calls are retained. The prior manual numeric adapter is retained as evidence but is not wired into this proposal. The new source follows locked checked/unchecked account-deserialization and serialization-error conventions; no fabricated diagnostic coordinates are supplied.

This is not a completed helper identity result. Derive-generated vector allocation, combined bump/admin read code generation, historical diagnostic location, exact in-memory bump placement (`+0x80` in the original decoded value), and full nested vector/error destructor correspondence have not been source-built or proven. `97+40*(n+m)` is a wire-length contract, not a memory-layout or unlimited-allocation guarantee.

The context requires host Global/BondingCurve/UserVolumeAccumulator definitions, Pump error enum, program marker and constants; those dependencies are not reconstructed by silently copying unrelated handlers. It must receive one reconciled body that consumes optional fill, preserves mode/whitelist amount selection, quote vault/user admission, real CPI authority checks, fees, volume effects and success-only exit. Existing ordinary-only fences and compatibility selectors do not meet that requirement. No body, wrapper, mux, dispatcher or SellV3 changes are included.

All **117** saved BuyV3 rows remain mandatory: **105 successes, 12 failures**. The verifier reselects BuyV3 only from the retained current receipt and compares the prior ledger, including owned137-byte volume poststate. These are existing finite tests, not tests of this proposal. They do not prove init timing, zero-user mutation, parser error precedence, unlimited token modes or whole-file equality.

## Verification and remaining work

`python3 -B verify.py` checks exact inventory/hashes, prior manifest seal and copied-file bindings, all selected original instruction bytes, recomputed call/branch/data ledger, precise correction anchors, dependency lock checksums, all seventeen fields, retained117-row evidence and the unchanged whole-original hash. It checks source shape; it does not execute macros or prove Rust behavior. `owned-map.json` enumerates exact owned files and no main destinations. Test from a separate copy as recorded in the adjacent `verification-results.json`; tamper and extra-file rejection are tested there too.

Preserved failures: prior report/seals remain unchanged. During collection, assuming local `.cargo-checksum.json` existed caused a FileNotFoundError before dependency publication; recovery verified selected source against checksum-bound package archives instead. A scratch comparison initially constructed Pump words in reversed order and returned false; the correction uses the exact prior data-contract literal, not a hand-reassembled key. Neither observation is hidden as successful verification. No build or target failure was retried.

Closure still requires complete nested reader/data/diagnostic attribution, demonstrated lowering and source-built comparison under separately granted compilation authority, and a reconciled body preserving every existing row under separately granted runtime authority. Current static evidence supports the corrected declaration and ordered contracts, **not an authentic complete source recovery or safe replacement**.
