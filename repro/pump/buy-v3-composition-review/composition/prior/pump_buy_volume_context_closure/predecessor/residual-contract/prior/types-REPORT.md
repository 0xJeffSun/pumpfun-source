# Pump predicate semantic keys and decoder continuation

The key identity prerequisite advances: the 32-byte predicate compares **the user signer's key with Global.whitelist_pda**. It is neither a quote-mint comparison nor a token-program comparison. `is_mayhem_mode` is independently the mode byte. Normal SOL denomination therefore does not remove the residual branch.

**Identity correction:** the supplied chain is `buy_v3`, not legacy `buy`. The original wrapper at 0x1286c8 loads the exact ELF literal `Instruction: BuyV3` at [0x1b7dd3,0x1b7de5). Its parser at 0x102578 has named base/quote mint and base/quote token program roles. The prior public report already described buy_v3 and its copied source entry explicitly calls `trade::buy` from `buy_v3`. This package does not relabel these bytes as legacy buy. It does not resume token-extension work.

No program source changes or partial-fill patch are supplied. No builds, fixtures, runtime probes, signatures, broadcasts, binary modifications, commits or parent edits occurred. All frozen inputs use checkpoint 517d77db988d8c63b6cf476f0be138c5a4f3128a. Original SHA256: 7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d. Full SHA256, Git blob ID, source path, full size, and exact half-open excerpt byte ranges are in provenance.json. Reviewed predecessor report, manifest and provenance are copied in prior/ with seals in reviewed-inputs.json; these pending-publication files have no asserted Git blob identity.

## Producers and decoded Global layout

All hexadecimal ranges are original virtual addresses, half-open. Branch annotations in the imported assembly are misleading: use encoded offsets. Windows delimit consumed evidence, not historical function names.

* Parser 0x1025b0 calls 0x13270, consuming the first 0x30-byte AccountInfo. Its call 0x13318 reaches 0x96d0. The latter borrows data and calls 0x15fdd0 at 0x9960. At [0x15fdf0,0x15fe10), the decoder checks a7e8e8b1c86c727f, independently equal to SHA256(`account:Global`)[:8]. It calls the decoded-type reader 0x1600a8 at 0x160098.
* [0x9a20,0x9a90) assembles the account: decoded words at account +8/+16, remaining decoded bytes copied with a +8 displacement. The 0x440-byte result is allocated/copied at [0x1025c8,0x102720); its pointer stays in r8 and is stored into accounts+0 at 0x105b68.
* The key reader called at 0x1608f8 is 0xfab0. It consumes 32 bytes and returns tag plus key; [0x160918,0x160978) stages those key bytes. [0x1610d0,0x161120) and [0x161450,0x161460) assemble decoded result +0x280..+0x2a0. Account wrapping shifts this to +0x288..+0x2a8.
* The discriminator-writing Global serializer [0x6e78,0x7890) independently fixes the field identity. It writes initialized, authority, fee_recipient, five u64 values, withdraw_authority, enable_migrate, two u64 values, seven fee recipient keys (array writer 0xefc8), set_creator_authority, admin_set_creator_authority, create_v2_enabled, then 32 bytes from account+0x288 at [0x7440,0x7478). This is full wire [451,483), named `whitelist_pda` by the bounded Global source declaration. The next key is reserved_fee_recipient. The conclusion does not assume Rust memory declaration order.
* Parser 0x102da0 calls 0x127a0, whose 0x12840 calls 0x19b4e0. This checks AccountInfo byte +0x28 (signer) and returns the AccountInfo pointer on success. The pointer is saved at parser stack -0x5e8 (0x102dc8), reloaded at 0x1059f0, then stored at accounts+0x40 (0x105af0). The buy body dereferences its +0 key pointer at [0x147c88,0x147cd8). The corresponding source role is user (buy-v3-accounts.rs); this is not one of the token-program slots.

## Imported comparison: resolved relocation, retained host obligation

The call at 0x147e30 reaches 0x1b3678. It receives r1=user key copy, r2=Global account+0x288, r3=32. [0x1b3678,0x1b36b8) initializes a 32-bit result, sets r4 to its address, calls the import at 0x1b3690, and returns the sign-extended result. The caller masks to low32 and tests zero/nonzero.

The original ELF `.rel.dyn` record at this exact PC has type 10 and resolves through its linked dynamic symbol table/string table to undefined **sol_memcmp_**. verify.py re-parses these tables; its external verification output gives exact relocation/symbol file-byte ranges. `call -1` is an import placeholder, not a relative self-call. Memory-copy sites similarly reach the sol_memcpy_ import wrapper, not an unknown program handler.

The semantic interpretation is the standard memory-comparison contract: zero iff the two 32-byte buffers are equal. The copied public SDK sol-string.h:23–34 corroborates that equality convention, but defines an inline three-argument `sol_memcmp`, **not** the four-register imported `sol_memcmp_` ABI. No historical runtime implementation or loader contract was located in the bounded inputs. Thus exact import identity, arguments, output width and branch behavior are closed; independently proving the deployed host implementation remains an explicit obligation. No runtime evidence is claimed.

## BondingCurve length dispatch and defaults

The discriminator-checked reader [0x9b148,0x9b430) subtracts eight before dispatch. Let N be that remaining payload length (total account data length minus 8). Below 41 bytes rejects. Success-path decoded memory +0x20..+0x40 is quote_mint, +0x9a is mode, +0x9b cashback; account wrapping shifts them to +0x28, +0xa2, +0xa3. Serializer [0x5a28,0x6158) and wrapper [0x8320,0x8710) ground the mapping.

| N | Called decoder | Fields absent from this layout and defaulted to zero |
|---|---|---|
| 41–72 | 0x9b6a0 | creator, quote key, all extension fields including mode |
| 73 | 0x9bc28 | quote key and all extension fields including mode |
| 74 | 0x9c240 | quote key, cashback and later fields; mode is read |
| 75–106 | 0x9c8f8 | quote key, creator fee configuration and later fields; mode/cashback read |
| 107–115 | 0x9d008 | creator fee configuration and later fields; quote key read |
| 116 | 0x9d850 | holder reward and later fields |
| 117–132 | 0x9e178 | accumulated creator/protocol fees, depth and later fields |
| 133–157 | 0x9eaf0 | depth, initial virtual quote reserve, post-completion counters |
| >=158 | 0x9f500 | none of the declared fields |

Concrete default stores: [0x9bb18,0x9bc20) zeros creator/quote and extensions; [0x9c1c8,0x9c238) zeros quote and extensions; [0x9c7d8,0x9c7f8) and [0x9cee0,0x9cf00) zero quote for the next two layouts. Later defaults are in the final success blocks of each copied decoder. The mode becomes wire byte 81 inclusive of discriminator once N>=74. The called bool reader [0xd068,0xd210) accepts 0/1 and takes its error branch for other bytes. Payloads between thresholds do not acquire partially present newer fields: they select the shorter decoder. This is a default/layout result, not a proof of all transitive decoder errors, account constraints or padding policy.

## SOL and ordinary token admission: bounded result

The parser's two token-program readers at 0x1029e8 and 0x102a30 both call 0x120, which consumes an AccountInfo and calls 0x9eb0. [0x9eb0,0xa090) checks its key against the two ELF constants at [0x1b9f34,0x1b9f74): TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA and TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb. It checks executable byte +0x2a before returning success. This is a two-ID interface, not an exclusive legacy Tokenkeg restriction. No extension body is followed.

[0x104330,0x104538) binds the supplied quote mint key to the decoded curve quote slot. Equality passes this relation. If unequal, the curve quote must be all-zero and the supplied mint must equal the literal at 0x1b5cc8, independently base58-decoded as So11111111111111111111111111111111111111112. Thus the ordinary zero-quote curve plus WSOL account passes this relation. Other parser constraints and body preflight still apply; this is not a sufficient success condition. The broad reconstructed check-quote.rs accepts additional combinations; it is source evidence, not authority for original admission.

The supplied chain cannot prove the separately named legacy-buy handler's admission. A legacy-buy result requires its own discriminator-to-parser identity first. This package neither asserts Token-2022 extension acceptance nor treats SOL denomination as legacy base-token ownership.

## Predicate for an admitted normal SOL buy_v3

Let A=requested amount, R=real_token_reserves, B=partial_fill, M=is_mayhem_mode, E=(user key equals Global.whitelist_pda under the comparison contract above). S is the first selected amount and D the residual.

| Condition | Result before downstream validation/effects |
|---|---|
| M, or A<=R, or E | D=0; S=min(A,R) when B, otherwise S=A |
| !M and A>R and !E | S=R; D=A-R; B is bypassed |

Exact branch evidence: [0x147c70,0x147d28), [0x147e10,0x147e78). The comparison is executed on M=false even when A<=R; the table describes its control-flow result, not syscall elision. S=0 and S>R enter later rejection paths. For a normal non-Mayhem SOL curve, both E and !E remain distinct cases. In particular, non-whitelisted above-reserve requests select residual processing even with B=false; this does not establish that residual processing ultimately succeeds. A zero/default whitelist key must not be silently treated as a different denomination predicate.

## Remaining prerequisite and delivery

The exact semantic keys and success-path layout defaults are now attributable. The next patch prerequisite is the **downstream residual-effects closure**, not another attempt to label the comparison as SOL: first/residual quote arithmetic, fee bases and rounding, combined max-cost, funding/transfers, reserve/post-completion writes, and ordered events through the direct targets enumerated in prior/REPORT.md. Retain the separate imported-host-contract obligation. If the task truly requires legacy buy, establish that separate instruction identity before consuming its body. All four whole-file comparisons remain false; no exhaustive semantics/security conclusion follows from these static checks.

Run `python3 verify.py` from any copied package. It verifies file inventory and hashes, full-input Git blob hashes, all copied instruction bytes against the original ELF, selected direct-call targets, discriminator/log/key literals and comparison relocation. Excerpt full-source hashes are provenance attestations; an offline copy cannot reconstruct omitted source bytes to rehash them. Verification is deliberately not an emulator or semantic test. Copied-directory outcome is retained outside this seal in verification.json; final.txt is the parent handoff.
