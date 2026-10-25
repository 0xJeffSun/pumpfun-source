# BuyV3 B4: Global buyback-recipient admission

The missing ordinary admission interface now has a concrete source-only implementation in `source/buyback_admission.rs`. Original helper0x98438 rejects a zero key with6062 **before** searching exactly eight configured keys; a nonzero key absent from that array returns6057. Native admission uses the recipient account key. Token admission uses the decoded token authority, releases its shared data borrow before Global authorization, and only then checks the recipient's ATA address. No build, typecheck, transaction, fixture or main-source change occurred. All117 saved BuyV3 rows remain obligations, not new coverage.

The source fragment is not an integrated or equivalent candidate. It fills the `BuybackAdmission` trait in the frozen B4 proposal for native and ordinary165-byte token accounts, while leaving other token layouts explicitly unresolved. B5/preparation and B7/event/exit remain separate work. No excluded token-extension implementation is inferred or followed.

## Frozen input and field identity

`prior/b4/` is a byte-preserved copy of the completed `pass04_buy_quote_vaults/public` package, including its original manifest, full original/candidate/symbol inputs, source fragments, earlier failures and all117 preservation rows. Its verifier still passes:117 rows,105 successful-row requirements, zero proposal executions. The original allocation is10,485,715 bytes, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Candidate2aa18c73 and its symbol file remain historical comparison inputs; no new candidate exists.

The captured IDL names `Global.buyback_fee_recipients` as `[Pubkey;8]`. Recomputing its wire order gives offset741 and length256. This is **not** the original runtime layout. Original Global serializer0x6e78 calls0xf6c0 at0x7590 with the runtime wrapper+8 array; that writer serializes eight consecutive32-byte keys at the field's wire position, after the cashback flag and before buyback basis points. Preflight0x7f010 loads Global from context+0, adds8 at0x7f8e8, and passes that pointer to0x7e490. The authorization helper compares offsets0,32,...,224 from the same pointer. Together these bind the array's role without assuming Rust declaration order or mistaking serialized741 for runtime8.

The source proposal obtains a typed `&global.buyback_fee_recipients`, rather than casting original offsets. `inputs/current-lib.rs` is a hash-bound candidate declaration/error-enum reference, not proof of the original Rust source. The unrelated earlier `global_eight_keys` name is not used as an authorization proof:0xf6c0 is the serializer's eight-key writer, whereas0x98438 performs admission.

## Exact original contract and order

All addresses are original virtual addresses, with exclusive interval ends. Boundaries are inferred from actual unrelocated signed direct-call targets, not claimed historical symbols.

| Unit | Original interval | Role |
| --- | --- | --- |
| Quote preflight | 0x7f010..0x7fde8 | Select native/token path, then call buyback admission |
| Buyback recipient admission | 0x7e490..0x7f010 | Owner/decode/mint/Global/ATA ordering |
| Configured recipient check | 0x98438..0x98af0 | Nonzero guard then eight-key membership |

At0x7f908, preflight calls0x7e490 with result storage r1, Global's array pointer r2, recipient AccountInfo r3, native flag r4, and frame r5. Frame-0x1000 points to the copied quote mint, frame-0xff8 to its token-program key. Native means stored quote key is zero, as independently established by B4; it is not an arbitrary supplied-WSOL shortcut.

For native=true,0x7e490 reads the recipient key from its AccountInfo, copies its32 bytes and calls0x98438 at0x7e680. No owner test, data borrow, token decode or ATA derivation precedes or follows this native admission. It adds no signer, writable, executable, balance or whitelist rule; those are separate enclosing obligations.

For native=false (the token path), the sequence is:

1. Compare recipient account program owner with the supplied token-program key. On mismatch,6010, source evidence `programs/pump/src/trade_v3.rs:172`, compared keys actual owner then expected program.
2. Acquire a fallible shared data borrow at0x7e850→0x1a2ca8 and decode at0x7e8e0→0x185ed0. Borrow/decode errors return before mint or Global membership tests. Only B4's ordinary165-byte decoder contract is used by the proposal; all extended layouts stay opaque.
3. Compare decoded mint with the supplied quote mint. Failure6004, origin line180, compared keys actual mint then expected mint. The shared Ref is live through decode, comparison and error construction, and released on return.
4. Copy the decoded token authority, then release the Ref at0x7ed30..0x7ed48. Call Global authorization at0x7ed78→0x98438 using that copied authority. Global failure occurs without a live token-data borrow.
5. Derive the ATA at0x7ee18→0x1991e0 from decoded authority, supplied mint and token-program key. The helper uses authority/token-program/mint as32-byte seeds under the ATA program. Compare the supplied recipient address with that result. On mismatch,2006 ConstraintSeeds, origin line188, actual address on the left and expected ATA on the right. The original calls the derivation **again** at0x7ef98 to form those compared keys. This is not an ATA creation path and contains no CPI.

The configured-key helper first compares the supplied key with32 stack-zero bytes. Equal goes to the6062 branch (origin `programs/pump/src/lib.rs:1879`) and attaches supplied key then zero key. Only a nonzero key proceeds to the eight ordered comparisons. Any match succeeds immediately (tag2); exhaustion returns6057 (origin line1884) with no compared-key attachment. A configured zero entry cannot authorize a zero supplied key because the nonzero guard runs first. No uniqueness validation or nonzero validation of every configured entry occurs here.

## Natural source decisions

`GlobalBuybackAdmission::authorize` uses `require_keys_neq!(key, Pubkey::default(), BuybackFeeRecipientMissing)` followed by `require!(recipients.contains(key), BuybackFeeRecipientNotAuthorized)`. The wrapper checks owner, decodes and checks mint within a lexical borrow scope; then it authorizes the copied token authority and checks the ATA. It uses the actual library APIs already selected by B4, and adds no dummy successful framework callback.

The unchanged current lock selects anchor-lang0.31.1. Its public crate archive is retained and its relevant source extracted. That exact `require_keys_eq!` macro evaluates the expected expression once in its condition and again on failure in `.with_pubkeys`. Therefore the ATA derivation deliberately remains an expression in the macro rather than a cached local: this naturally preserves the observed second derivation on mismatch. `require_keys_neq!` supplies the zero-error key pair, while plain `require!` supplies no key pair for nonmembership. These source-family facts do not uniquely identify historical dependencies or prove generated code.

All error macros use their natural new source location. Observed original source paths/line numbers are retained only in evidence; the proposal does not manufacture those origins. Original log/error representation, formatting allocation and drop behavior may still differ. `Recovery::Unresolved` remains the predecessor's analysis-only marker, never a ProgramError, on-chain success, original-body fallback or passed transaction.

## Actual callees, data and lifetime limits

`function-ledger.json` retains27 complete windows: the selected application/serializer roots and every immediate direct callee, with all250 outgoing direct-call sites,261 relocation-backed data references, one indirect-call site, and26 further direct targets at the explicit frontier. Every branch/call inspected is computed from its raw operand. Relocated calls are classified before relative-call interpretation. The original memcmp wrapper's type10 relocation at0x1b3690 resolves to `sol_memcmp_`; its zero-result equality behavior is an explicit runtime primitive premise, not proof of a historical host implementation.

No immediate application helper is replaced with an unnamed success stub. Deeper allocator, formatting, panic, destructor, PDA-host and decoder internals remain a bounded framework/runtime frontier. Full original ELF bytes are preserved. At-most64-byte data samples do not establish object extents or vtable identity; only the explicit24/29-byte origin strings and declared key slices have lengths justified here. The opaque decoder and quote metadata bodies are retained as evidence boundaries, without recovering or executing their extension branches.

The fragment holds no Ref across Global membership or ATA derivation, performs no account mutation, transfers, state exit, event emission or return-data write, and does not clone AccountInfos. AccountInfo aliasing and genuine borrowed storage are premises supplied by the real enclosing parser. Full source/layout/ABI identity, rich diagnostics and the117 behavioral obligations remain open. This is ordinary source reconstruction, not a security sign-off.

## Portable verification

Run `python3 -B /path/to/package/verify.py` from any directory. Optional `--repo /path/to/pumpfun-source` additionally checks public repository input hashes. The verifier preserves and reruns the unchanged B4 saved-evidence verifier, checks all117 obligations, recreates the new raw ledger and contracts, verifies disassembly and official macro extraction, and checks the one-file proposal's source contract. It never builds, typechecks, executes target code, creates signatures or calls the network. Copied-package positives and corruption/missing-evidence negatives are retained in `verification-tests.json`; no caches are sealed.
