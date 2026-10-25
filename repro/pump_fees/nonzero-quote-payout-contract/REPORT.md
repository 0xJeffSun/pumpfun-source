# Nonzero-quote payout preparation: static ownership contract

Disposition: the owned original window `[219376,225920)` is decoded in full. It prepares owned vectors and does not execute a payout. The account pairing, filtering, return variants, cleanup and ordinary error order are recoverable. No Rust replacement is proposed: exact comparison-error source/diagnostic correspondence and transitive call/data identity remain unresolved. The candidate contains no complete normalized match for this window. No build, target execution, new fixture, main modification or receipt transfer occurred.

## Frozen basis and scope

The original SHA-256 is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. The precise Fees8ff12 candidate is `8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`; symbols are `ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b`. Its source is the frozen `inputs/sharing_update.rs`, not moving main. The predecessor full report, manifest, build handoff README and historical seals are copied unchanged. `docs/COMPLETION.md` and its donation-borrow checkpoint were read: that 5cf8 checkpoint and the separate later 8ff12 handoff must not be conflated.

All current **17,461 cases**, plus the separate ten-step sequence described in the handoff, remain preservation requirements. They were not run here. Previous preparation failures, unmatched bodies, source-location differences and zero whole-original ELF matches remain in force. Existing whole-program completion measures do not change.

`proof.json` records all 786 decoded instructions covering the 6,544 bytes, 24 actual direct-call sites targeting 13 distinct windows, the `abort` relocation, ten distinct directly referenced data objects at all 18 root relocation sites, and the caller argument slice. It also contains 20 complete supporting original windows and 48 candidate normalized alternatives with actual symbols, raw equality booleans and outgoing edges/data. Alternative matches, including identical empty functions and arithmetic panic bodies, remain ambiguous. The full prior 585/547-row inventory is retained without reclassification. Original window boundaries are inferred, not recovered source function boundaries.

## Inputs and account pairing

The caller at 218984 loads the shareholder vector pointer/length into r4/r5; 219024/219032 load the prepared account slice pointer/length into r2/r3; r1 is return storage. The slice's preparation remains opaque. This contract starts with those inputs; it makes no claim that they equal raw `ctx.remaining_accounts`, nor that the second block is a particular token-account type.

Let `n` be the current shareholder count, `m` the supplied account count, and `i` the zero-based shareholder index. Each iteration performs this order:

1. Enumeration checks its increment for overflow (220536–220600). Then require `i < m` at 220608; failure is 6013 at original source line 234.
2. Compute `j = n + i` with overflow panic (220240–220288, 225824–225840). Require `j < m` at 220296; failure is 6013 at source line 237.
3. Compare **account[i].key** with **shareholders[i].address**, exactly 32 bytes through `220432 -> 796464`. Mismatch is 6020 at source line 239 with compared values described below.
4. Only after equality, read **account[i].executable** (byte 42, 220480). If true, skip the shareholder and both accounts. If false, retain the shareholder and both accounts.

The pairing is `accounts[i]` with `accounts[n+i]`, not adjacent pairs and not `accounts[2*i]`. Even a pair that will be filtered must first satisfy both availability checks and the first key comparison. There is no second-account key comparison or executable test, and no root check of account owners, balances, signer/writable admission, account data, mint, token program or extensions. Such checks may exist outside this ownership scope; this is not permission to remove them.

Unlike a single up-front `m >= 2*n` check, this loop can report an earlier key mismatch before encountering a later missing partner. A missing partner for the current index precedes that index's key mismatch. Allocation failures can precede all these ordinary errors.

## Allocation, filtering and rescaling

For nonempty shareholders, the prologue allocates two AccountInfo buffers with initial capacity `n`, then a Shareholder buffer with initial capacity `n` (219432–220096). Their strides are 48 and 34 bytes. Empty inputs use dangling aligned sentinel pointers and zero capacities. Initial AccountInfo size overflow and bump allocator exhaustion go through 765304, not an Anchor business error. Growth fallbacks remain present: shareholder push at 220672, first-account push at 221168, partner push at 221616, and final append reserve at 225552.

For a retained pair, the helper copies the 32-byte shareholder address and u16 weight (220704–220840), clones the first account (220848–221336), then clones the partner (221344–221832). Each clone increments both strong Rc counts, aborting on wraparound at 222528, and copies the original key, owner, rent epoch and signer/writable/executable flags. No privilege is synthesized. Both account clones precede the sum/maximum updates.

The helper tracks the first strictly greatest original retained weight. Comparison is strict (221872/221912), so equal maxima keep the earlier retained index. The default index is zero, including all-zero weights. It accumulates retained u16 weights with saturation at 65535 (221928–221984).

Let `k` be the retained shareholder count. If `k != n` and `k > 0`, it rescales at 224912–225448:

- For positive saturated sum `S`, set each weight to `min(floor(original_weight * 10000 / S), 10000)` using a wide intermediate. Saturate the accumulated normalized total at 65535.
- For `S == 0`, set all retained weights to zero without division.
- Compute residual `max(10000 - normalized_total, 0)`. Add it, with u16 saturation, to the first greatest-original-weight entry. An all-zero nonempty retained set therefore assigns 10000 to its first entry.

The correction index has its own bounds panic at 225288–225312. Saturation means that arbitrary invalid weights are not guaranteed to end with a total of 10000. Do not replace the denominator with an unsaturated wider sum or turn this helper into share validation. Unchanged shareholders are not rescaled at all.

## Return storage and ownership

A natural *descriptive* success type is `(Vec<Shareholder>, bool, Vec<AccountInfo<'info>>)`. This is not a stable ABI or proof of original Rust declaration order. Machine observations are shareholder capacity/pointer/length at offsets 0/8/16, changed byte at 24, and account capacity/pointer/length at 32/40/48. Other padding bytes are not defined contract data. Borrowed input storage is not consumed.

| Case | Returned shareholders | Changed | Returned accounts | Temporary ownership |
| --- | --- | --- | --- | --- |
| `k == n` | Copied original shareholders, weights unchanged | false | Clone **all m supplied accounts**, preserving order and trailing entries | Drop retained partner clones first, then first-account clones |
| `k != n && k == 0` | Empty vector | true | Empty vector, even if trailing accounts exist | No retained account clones; common cleanup handles zero lengths |
| `0 < k < n` | Retained shareholders with corrected weights | true | All retained first accounts in order, then all corresponding partners in order | Move both vectors' account elements into result; no final Rc decrement |
| Ordinary error | Error ownership only | not readable as success | No account vector result | Drop accumulated partner clones first, then first-account clones |

For `n == 0`, the unchanged branch applies: it returns false and clones the complete supplied slice, which may be nonempty. Treating an empty current-shareholder input as unconditionally empty payout preparation would differ.

The unchanged branch allocates/clones the entire account slice at 222096–222824 **before** dropping temporary retained clones. Removing the temporary vectors could change allocation/overflow behavior even when the normal output is identical. Result writes are at 222832–222928.

The changed nonempty branch appends the partner buffer to the first buffer: reserve if needed, then `225616 -> memcpy`, with byte length `48*k`. These are already-owned cloned AccountInfos; there is no second clone. It increases first-buffer length and moves the resulting vector plus retained shareholders into return storage (225624–225808). It exits without passing through temporary account cleanup. Replacing append with clone/extend is not the same ownership behavior.

Ordinary failures write error tag/payload to offsets 8/16 and niche sentinel `0x8000000000000000` to offset 0 (224464–224504), then enter common cleanup. This observed niche is not a public enum-layout guarantee. Error construction itself can allocate/panic. On normal cleanup, each partner's lamports Rc is decremented, then its data Rc; zero strong count decrements the implicit weak count. Partners are processed before first accounts (224512–224904). There is no emitted deallocation call in this root; inferred vector disposal must not be represented as an observed allocator free. Abort/panic paths do not return an ordinary business error or prove unwinding cleanup.

The predecessor's outer caller consumes these variants: it may serialize changed shareholders before its separate Pump CPI and bypass that CPI for an empty prepared vector. That context is inherited, not re-owned here.

## Actual call and data contract

| Actual original target | Root sites | Attribution and limit |
| --- | --- | --- |
| 796464 | 220432 | memcmp wrapper; actual syscall `sol_memcmp_` at 796488 |
| 791384 | 220600, 225840 | Arithmetic-overflow panic; identical normalized add/sub/mul alternatives must not be uniquely named from shape alone |
| 57008 | 220672 | RawVec grow for 34-byte shareholder elements |
| 56648 | 221168, 221616 | RawVec grow for 48-byte accounts |
| 280976 | 222976, 223400, 223600 | FeeError name, selected tags 13 and 20 |
| 290384 | 223120, 223544, 223744 | FeeError Display; actual indirect writer through supplied vtable |
| 709232 | 223336, 224032, 224256 | AnchorError into Error; allocates a 160-byte error object |
| 771648 | 223832 | Unexpected Display failure panic |
| 1008 | 224440 | Compared-value augmentation; **no normalized candidate match** |
| 771448 | 225312 | Bounds panic for correction index |
| 55560 | 225552 | RawVec reserve for append |
| 796360 | 225616 | memcpy wrapper; actual syscall `sol_memcpy_` at 796368 |
| 765304 | 225856, 225880, 225896, 225912 | Allocation/capacity failure handler |

The only root external-call relocation is `abort` at 222528. There is no root CPI, transfer syscall, invoke, clock or account data borrow.

Root relocated objects are captured at exact consumed extents in `proof.json`, not arbitrary previews:

- Tags at 802452 and 802364 are four-byte values 13 and 20. Stored business codes are separately 6013 and 6020. The selected Display strings are `Not enough remaining accounts` (29 bytes at 804630) and `Remaining account key doesn't match shareholder address` (55 bytes at 804880); pointer and length are verified from the selected Display arms.
- Filename at 803958 is 71 bytes: `programs/pump-fees/src/instructions/fee_sharing/update_fee_shares_v2.rs`. Ordinary lines are 234, 237 and 239. These are observations, never invented source coordinates to insert into a proposal.
- Location objects at 821016, 821320, 822024 and 822048 are 24 bytes each. Their relocated filename pointers and complete filenames are included. They identify enumerate.rs 50:9, alloc/string.rs 2559:14, and the original V2 file 278:55 and 236:18.
- The 55-byte unexpected-Display message at 800893 is retained. The 48-byte fmt::Write vtable at 821240 has relocated targets 39312 (drop), 52400 (write_str), 52376 (write_char), 39248 (write_fmt), size 24 and alignment 8. The 32-byte Debug vtable at 821288 has targets 39304 and 52328, size zero and alignment one. Their full target windows and all candidate alternatives are retained.

For the selected error Display arms, 291848 is an actual indirect call via the formatter's vtable; the root passes the String writer above. The comparison helper calls 754592 four times along two error-tag paths and uses the same writer. That target has Pubkey formatting attribution via actual symbol comparisons. It formats first the supplied account key and then the expected shareholder address. It copies two owned formatted strings into compared-value storage; this must not silently become a raw-Pubkey compared-value variant merely because a `require_keys_eq!` macro looks plausible. The actual invocation follows Error::from(AnchorError), whose observed tag is zero. The helper's other error-tag branch remains decoded without being asserted reachable here.

There is no unique original name recovered for 1008. Its lack of a normalized match is not repaired by finding a semantically similar macro in the current source. Supporting-window outgoing direct edges and data references appear in `recursive_frontier`; those references have deliberately labeled bounded previews, not full recursive data closure. Raw equality and normalized equality are separate fields, and neither alone proves that callers use matching targets.

## Comparison with zero-quote and exact obligations

The predecessor's zero-quote `[199072,204080)` contract is used as a frozen comparison, not duplicated or patched. Both branches retain non-executable first accounts, preserve all supplied trailing accounts when unchanged, use saturated rescaling and move owned vectors on changed success. Nonzero quote adds the second block's per-iteration availability check, paired clone buffer and ordered append. Zero-quote's diagnostic lines 186/188 do not apply here. No evidence supports replacing the difference with a loop stride or adding inferred token-extension semantics.

Before a source replacement can be certified:

1. Recover the source/error API responsible for 1008, including exact formatted-string compared values, historical diagnostic provenance and full formatter/helper call/data correspondence. The frozen candidate uses `require_keys_eq!` in generic validation and has no body match for 1008.
2. Bind RawVec/allocator/panic implementations and their transitive data to the historical source/dependency graph; normalized target bodies alone leave relocation and many-to-one alternatives unresolved. Preserve three initial allocations, clone-before-cleanup behavior, append moves and abnormal paths.
3. Obtain the separately owned preprocessing and caller contracts through frozen reports. Do not infer second-account identity, relax parser/PDA/signature checks or replace the supplied prepared slice with raw remaining accounts.
4. An eventual natural typed proposal must preserve all return cases above, ordinary error precedence, no new business validation, original flag propagation and all 17,461 existing requirements. Source compilation, runtime acceptance and whole ELF equality remain later, separately authorized gates. No build/runtime/main work is proposed in this packet.

`HANDOFF.md` is the compact integration boundary; `ownedmap.json` and `manifest.json` define ownership and exact publication files. Run `python3 -B verify.py` from any separate copy. It checks pinned binary/source identity, predecessor seals, exact file set, the complete prior inventory's hash and row counts, regenerates this proof, and checks its anchors. This is static evidence verification, not 17,461 runtime results or proof of historical source identity.

## Verification execution note

The verifier passed from a separate package copy and rejected an unexpected file and a re-sealed modified proof. One integrity check also changed one byte in a temporary candidate copy, observed rejection, and restored the exact original bytes; this was a binary edit outside the requested no-edit discipline, not a reconstruction technique or proposed binary. That restored verification copy was moved into `verification-copy` under the assigned directory. No main or packaged input binary was changed, and no further binary mutation is performed. `verification.json` preserves this check rather than concealing it.
