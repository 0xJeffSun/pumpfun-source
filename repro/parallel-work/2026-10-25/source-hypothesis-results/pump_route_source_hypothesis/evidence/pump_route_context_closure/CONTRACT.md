# Source-level context contract

This is a transcription for review, not a replacement implementation. `read_*_original` means the caller-bound original reader identified in results.json, with its original returned error and decoded layout. It is not permission to inject an arbitrary decoded value. All reads use the same advancing AccountInfo cursor. Numeric errors below mean constructor arguments, not a newly established serialized error ABI. Evaluation order is significant.

```text
admit_multi_hop_context(program_id, cursor, bump_record):
    global = read_global_original(cursor)             # 0x13270 -> 0x96d0
    allocate_and_copy(global, 0x440)
    fee = read_fee_config_original(cursor)            # 0x133e0 -> 0x92d0
    allocate_and_copy(fee, 0x90)
    amm_global = read_signer_original(cursor)         # 0x127a0 -> 0x19b4e0
    user = read_signer_original(cursor)
    source_authority = read_signer_original(cursor)
    source = read_token_account_original(cursor)     # 0x1d0 -> 0x2e48
    allocate_and_copy(source, 0xd8)
    destination = read_boxed_token_original(cursor)   # 0x38a8 -> 0x1d0
    buyback = consume_raw_account(cursor)             # missing -> 3005
    token = read_program(cursor, TOKENKEG)            # 0x146c8
    token2022 = read_program(cursor, TOKEN2022)        # 0x13ff0; key only
    system = read_program(cursor, ZERO_KEY)          # 0x13b80
    event = consume_and_clone_account(cursor)        # 0x2ca8
    self_program = read_program(cursor, PUMP_ID)      # 0x136f0

    (key, bump) = find_pda([b"global"], program_id)
    bump_record[0] = bump
    require global.account.key == key else 2006("global")

    # Uses decoded/wrapper +0x80, bound to wire byte 8 by fee_decode.
    key = create_pda([b"fee_config", PUMP_ID, [fee.bump]], FEES_ID)
    require create_pda success else 2006("fee_config")
    require fee.account.key == key else 2006("fee_config")

    (key, bump) = find_pda([b"global_config"], AMM_ID)
    bump_record[1] = bump
    require amm_global.key == key else 2006("pump_amm_global_config")

    require user.is_writable else 2000("user")
    require source.account.is_writable else 2000("source")
    require destination.account.is_writable else 2000("destination")
    require buyback.is_writable else 2000("buyback_fee_recipient")

    (key, bump) = find_pda([b"__event_authority"], program_id)
    bump_record[2] = bump
    require event.key == key else 2006("event_authority")
    return context_layout_in_results_json
```

`read_program` first rejects exhausted cursor with 3005, consumes exactly one 48-byte AccountInfo, compares its **key** to the specified constant (3008 on mismatch), then tests executable byte +42 (3009 on zero). Successful return preserves that same AccountInfo pointer. It imposes no program-owner check. Token2022's mandatory program slot is validated even on an ordinary Tokenkeg route; its processor and extensions are not executed or interpreted here.

`read_signer_original` first checks count (3005), advances the cursor, then tests byte +40 (3010 on zero). The AMM global PDA must arrive as a signer before its PDA comparison; a valid address alone cannot satisfy this contract. No signer substitution or bypass is allowed.

For ordinary source/destination data, require actual Tokenkeg owner and 165-byte wire data as the scope domain, then execute the admitted original account reader. The original owner policy itself admits two program IDs; do not replace it by a claim of exclusive Tokenkeg admission on all inputs. System ownership takes a lamports predicate first: zero lamports -> 3012; nonzero goes on to fail owner membership with 3007. Other nonmember owners -> 3007. Shared data borrowing precedes decoding. The imported raw decoder checks delegate-option tag, state<3, native-option tag, close-authority-option tag, in that order. The adapter then rejects state zero. States 1 and 2 pass this initialization test. Success wraps the original account and releases the shared borrow. Full decoded mint starts at wrapper+0x28, and the original AccountInfo pointer is wrapper+0x20. These reads do not enforce token authority==source_authority, unfrozen state, available balances, source/destination distinctness, or buyback membership; those would be downstream predicates, not omissions to silently fill in.

Global uses its original owner/data/discriminator/payload reader: System with zero lamports -> 3012, then Pump owner check ->3007, shared borrow, checked Global decoder, success wrapper and release. This preserves the exact reader rather than replacing it with a fabricated object. The full Global payload decoder's all-input policy is an explicit imported/unclosed type obligation. FeeConfig decoding, its wire bump and variable vectors are imported from fee_decode with its stated allocation/error limitations.

No context account balance, token amount or serialized state is written by this contract. Cursor advance, heap allocation/copies, borrow/refcount bookkeeping, bump-record writes and result construction are real local stores. Bump writes occur before their key equality checks: a failed parse may have modified the scratch bump record, but the wrapper never invokes the handler on that failed result. No persistence/rollback assertion is made.

For an admitted result, the wrapper preserves the 0x90-byte context representation and constructs the outer Context with bumps at +0x20..+0x23. Byte +0x22 is the event bump. The outer handler saves it at fp-0x2d8, passes it as hop r3, and the hop saves it at fp-0xa58. Event-wire's one-byte signer seed therefore comes from the successfully compared event PDA, not from instruction amount_in or a caller-selected unchecked bump. Destination and buyback transfers use exactly slot 6's AccountInfo and slot 7, respectively; their effects remain external contracts.
