# Ordinary Tokenkeg quote-vault admission

Static caller-specialized closure of the local admission decisions, with explicit imported contracts and upstream residuals. No source patch. Fixed checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. This does not establish unconditional route acceptance, full transfer authorization, exhaustive semantics or security.

Original Pump SHA256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; Git blob: `85cb0059f2814c86224fdfea778c56df770dd920`. `windows.json` records exact half-open ELF offsets, full disassembly identity and inclusive disassembly line ranges. `provenance.json` records frozen Git/SHA256 provenance for copied prior conclusions and the bounded reconstructed-source excerpt. Window names and boundaries are inferred, not original Rust symbols. Encoded targets, not displaced LLVM annotations, govern the analysis.

## Admission and argument binding

The admitted `pump_route_accounts` report binds H[8] to quote mint, H[16] to curve wrapper and H[32] to raw quote-vault AccountInfo. The parser's fifth consumption at `0xddcd0..0xddd18` and success stores `0xde478..0xde4b0` independently retain that binding. Its quote-vault writable load is `0xde3e8..0xde3f8`; zero enters the numeric 2000 error path at `0xde400..0xde478`. This follows curve PDA/writable, quote relation and base-vault writable checks in the parser. The quote-vault check is before body execution.

Before reading the helper, the admitted caller establishes this ABI at `0x5bf10..0x5c0c0`:

| Input | Bound value |
|---|---|
| r1 | output at caller fp-0x878 |
| r2 | H[32], quote-vault AccountInfo |
| r3 | cloned curve AccountInfo at fp-0x260; original comes from H[16]+0 |
| r4 | quote-mint key copied from H[8]+0x58 -> AccountInfo+0, at fp-0x498 |
| r5 | caller frame pointer |
| outgoing -0x1000 | selected quote-token-program key copy, fp-0x340 |
| outgoing -0xff8 | cloned quote-mint AccountInfo, fp-0x6d0 |
| outgoing -0xff0 | selected program AccountInfo, fp-0x7c8 |
| outgoing -0xfe8 | **literal zero**, stored at 0x5c070 |
| outgoing -0xfe0 | dereferenced context+0x18 |
| outgoing -0xfd8 | dereferenced context+0x50 |

The last two values are not needed on the reachable no-creation path; assigning payer/system historical names solely from source declaration order would overstate their identity. AccountInfo clones use the already-admitted `0x10c78` contract. `0x5c0b8` decodes to target `0x14910`.

## Selected program

`0x5bb50..0x5bb88` supplies r2=context[0x40], r3=context[0x48], r4=quote-mint AccountInfo and r1=output to `0x58668`. The helper obtains AccountInfo.owner from +0x18 after reference-count bookkeeping (`0x58668..0x58788`). Its first comparison is against another program ID; that match is outside this Tokenkeg result. The next comparison at `0x587c8..0x58808` is against the 32 bytes at `0x1b5b28`, which encode `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`.

Equality goes to **0x58ae8**, clones the r2/context[0x40] AccountInfo, and returns at `0x58be8`. The key used for quote-vault derivation is the returned AccountInfo+0; it is not replaced with a hardcoded Tokenkeg key by this selector. Thus selecting the ordinary slot is established, while equality of that slot's actual key to Tokenkeg and its executable status depend on the upstream context parser. The bounded reconstructed declaration calls this `Program<Token>` (source lines 13–37), but source syntax is not independent evidence for the original parser's checks. Reference-count overflow trap paths and comparison implementation are imported operational contracts.

Only the common comparisons and ordinary selection arm are published. An exploratory display included the other program's clone arm; it is not interpreted or sealed. No token-extension decoding path was followed.

## Canonical address and local error order

For the admitted nonzero-curve-quote branch, selected program slot correctly validated upstream, and an ordinary 165-byte Tokenkeg vault:

1. Derive canonical associated address from **[curve account key, selected token-program key, quote mint key]**, each exactly 32 bytes. The caller-bound derivation edge is `0x149c8 -> 0x1991e0`. The three descriptors are assembled at `0x199308..0x1993a8`, under the embedded associated-token program ID `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL`. The PDA helper/syscall contract and bump search remain imported; this is not a new cryptographic proof. These are ATA address seeds, not the transfer wrapper's `bonding-curve` signer seeds.
2. Compare vault AccountInfo.key against derived address (`0x149d0..0x14a60`). Mismatch takes `0x14e90`, numeric **2006** at `0x15018`, then error construction/forwarding. This precedes owner and data checks.
3. Compare vault AccountInfo.owner against 32 zero bytes (`0x14ab8..0x14b08`, constant `0x1b5ba8`). Equality means System Program owner, not a native-mint sentinel. It branches to `0x14da0`; `0x14dc0` tests the outgoing creation control. This caller supplies zero, so the nonzero creation branch at `0x154a0` is unreachable. Zero selects numeric **3012** at `0x15650`, via `0x14dc8..0x14e88` and `0x155d8..0x156b8`. No lamport/empty-data test grants creation in this call.
4. Otherwise compare owner to the selected program key (`0x14b08..0x14b40`). Mismatch selects numeric **6010** at `0x14c80` and attaches the compared keys. Equality reaches `0x15158`.
5. Borrow data (`0x15170 -> 0x1a2ca8`). Borrow count must be at most 0x7ffffffffffffffe; it increments on success. Failure returns encoded 0x800000000000000b; local forwarding starts at `0x15fc8`. No state decode occurs first.
6. Decode data (`0x151f0 -> 0x185ed0`). For length exactly 165, the raw decoder call is `0x185f28 -> 0x194388`; after initialization checks the length gate `0x186130` goes directly to `0x1861e8`. Non-165 extension branches are excluded. Decoder error is tested at `0x15210`, before mint equality, and takes the cleanup/error path at `0x15478`.
7. Compare decoded mint with the caller's quote-mint key (`0x152b0..0x152f8`). Mismatch selects numeric **6004** at `0x15380`, followed by error construction and borrow release. Equality reaches `0x160a8`, releases the borrow, writes success tag **2** via `0x15138..0x15150`.

Numeric codes and local branch order are evidence; exact error object serialization, formatter allocation failures and historical variant names are not newly proved. Invalid pointers, reference-count overflow and imported PDA/comparison/memcpy faults are outside this application-error sequence. The byte-level verifier checks the decisive encoded edges/literals, not universal semantic execution.

## Ordinary data contract and authority boundary

Within raw `0x194388..0x194848`, the first option tag is the four bytes at wire +72; it must encode 0 or 1. State at +108 must be <3. Next, native-option tag at +109 and close-authority-option tag at +129 must each encode 0 or 1. This is the validation order; option payloads do not impose extra key equality. The adapter then rejects state zero (`0x186030..0x186068`); states 1 and 2 pass this local initialization test. In particular this is not a local unfrozen-account guarantee. Raw malformed-field errors carry 0x8000000000000003; uninitialized state carries 0x8000000000000009 into the opaque error conversion.

Raw mint wire bytes 0..32 and authority wire bytes 32..64 are copied into the first 64 decoded bytes (`0x194698..0x194798`). The adapter stages its first three words, copies the following 84-byte portion, and reconstructs the same leading key (`0x185f30..0x186138`, `0x1861e8..0x1862f0`). `0x152b0` compares that decoded **mint**, not authority.

There is **no direct decoded authority==curve-key comparison** on this helper's admitted existing-account path. Curve authority participates in the canonical address seeds. Neither that fact nor successful decoding alone establishes the token account's current authority. No local signer check or transfer authorization is inferred. The separately owned transfer-wrapper lane must establish any required downstream authority, signer-seed, frozen-state and balance semantics. No signer bypass is proposed.

The helper itself does not inspect the vault writable byte; that requirement is established earlier by the hop parser. It does not newly enforce rent exemption, positive balance, absent delegate/close authority, or a native-option value. Those are not quietly added to the admission contract.

## Zero/native handling

`0x5b770..0x5b808` compares the **serialized curve quote field** (wrapper+0x28) to zero, saving the result at fp-0xa90. After base-vault address validation, `0x5bee8..0x5bf10` enters `0x14910` only for a nonzero field. A zero curve quote goes to `0x5c300..0x5c478`, which checks the quote-vault canonical address through `0x58bf0` at `0x5c450`; it does not call this owner/data admission helper. The parser had already required that zero curve quote pair with WSOL quote mint (`0xde130..0xde218`). An explicitly stored WSOL key is nonzero and therefore follows the admission helper, not this sentinel shortcut. The serialized zero is not rewritten to WSOL.

System-owned vault zero in step 3, zero curve quote here, and a token account's native-option tag are three different values with different roles. No native lamport settlement or transfer CPI is analyzed here.

## Dependencies and precise residual obligations

The immutable prior reports and selected seals are retained in `prior/`. `pump_route_wide/CONTRACTS.md` is consumed only as a manually reasoned arithmetic contract with its stated domains, zero-divisor/runtime and opaque-error limitations; this package performs no arithmetic proof automation. Partial-types remains **buy_v3**, not legacy buy.

- Establish original context parser key/executable validation for context[0x40], without relying on reconstructed `Program<Token>` declaration order. Until then program selection is an exact slot-selection result conditional on upstream validation.
- Preserve the imported PDA, memcmp, memcpy and AccountInfo clone contracts. Complete error-object ABI requires separately admitted constructor evidence; local numeric order is closed here.
- The nonzero creation-control arm is unreachable from this admitted call. No transitive creation CPI is consumed or certified. Its construction/invocation interface and behavior would need a different admitted caller if later authorized; it is not a missing creation effect for this caller.
- Transfer wrappers remain the other worker's interface. No unconditional authority/transfer acceptance claim, native settlement claim or global alias guarantee follows.
- No conclusions extend to non-165 token data or Token2022 extensions. No source patch is justified by this conditional local result.

Exploratory display overshoots into adjacent common helper code were not used and are excluded from the sealed windows. No excluded instruction body, private review material, other worker scratch, runtime, fixtures, builds, network, chain action or source/binary patch was used. The four original whole-byte comparisons remain false; 140/150 bounded, five partial and five unrecovered is unchanged.

Run `python3 verify.py`. It checks exact inventory/SHA256, copied predecessor seal members, bounded instruction encodings, selected direct/branch edges, literal error/control values and constant identities. Full frozen ELF/disassembly hashes and bounded equality were checked at extraction; portable slices alone cannot independently rebind to an absent full ELF. Copied-directory verification outcome is retained **outside** the seal in `verification-outcome.json`.
