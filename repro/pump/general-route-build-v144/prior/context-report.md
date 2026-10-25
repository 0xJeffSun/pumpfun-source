# Ordinary multi_hop_curve_swap context admission

The entire admitted context parser **0xdb958..0xdd400**, including every fixed account consumption, post-read constraint, success store and local error continuation, is now traced. This closes the specific Tokenkeg-slot, destination/buyback-slot and event-authority/bump dependencies in the reviewed route packages. It is **context-local closure under the named reader, allocation and runtime contracts**, not unconditional end-to-end route acceptance. No source patch is proposed. CONTRACT.md is a source-level transcription; results.json supplies the machine-readable ledger.

Frozen source checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. Original Pump ELF Git blob `85cb0059f2814c86224fdfea778c56df770dd920`, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Disassembly Git blob `5b5e301459060ae51ddca1594584f7f470e92e48`, SHA256 `b77243c4614b2d03761480f1ed52faab7be906650fcdb706590e5585c89ac360`. Ranges below are half-open original ELF offsets; windows.json records inclusive full-disassembly line ranges and caller admission for each bounded excerpt. Helper names and boundaries are inferred interfaces, not historical Rust symbols. Encoded offsets govern, not displaced LLVM annotations.

The root-reviewed fee_decode, vault_admission, event_wire and transfer-interface packages are copied as unchanged conclusions plus original seals. They are additional pending-publication evidence, **not frozen source at this checkpoint**; provenance.json explicitly records null commit/blob for them. Frozen route_accounts, route_wide and route_depth conclusions retain their original checkpoints in their text and exact Git identities for the accepted checkpoint's copies. Only copied members are recertified, not uncopied packages. The wide arithmetic ledger remains a manual instruction/algebra argument; this package neither automates nor strengthens its proof. The partial-types chain remains buy_v3.

## Admission before interpretation

The retained route_depth/fee_decode identity is discriminator `e19a7516d756f667`, dispatch `0x11ca08 -> 0x1295c0`, wrapper parser call `0x129728 -> 0xdb958`, handler call `0x129888 -> 0x567d8`. The exact frozen IDL instruction excerpt names thirteen accounts and corroborates reader roles. Its source byte/line ranges and whole-object hashes are in provenance.json. Each new reader was identified from that parser's consumption position and IDL role before its body was interpreted. The source declaration excerpt is frozen `programs/pump/src/multi_hop_curve.rs:1-37`; it corroborates names but does not supply binary layout or historical-source identity.

## Exact slot binding and success construction

All input indices below are zero-based. Cursor increments are 0x30 bytes and count decrements one at each successful consumption. A later reader failure precedes all post-read PDA/writable checks. No fixed-slot optional-account substitution exists here.

| Input slot | Identity | Parser call/consumption | Successful context offset |
|---:|---|---|---:|
| 0 | Global wrapper | 0xdb990 -> 0x13270 | 0x00 |
| 1 | FeeConfig wrapper | 0xdbb20 -> 0x133e0 | 0x08 |
| 2 | AMM global signer | 0xdbc98 -> 0x127a0 | 0x10 |
| 3 | user signer | 0xdbce0 -> 0x127a0 | 0x18 |
| 4 | source_authority signer | 0xdbd28 -> 0x127a0 | 0x20 |
| 5 | source token wrapper | 0xdbd70 -> 0x1d0 | 0x28 |
| 6 | destination token wrapper | 0xdbfc0 -> 0x38a8 | 0x30 |
| 7 | raw buyback recipient | 0xdbff0..0xdc030 | 0x38 |
| 8 | Tokenkeg Program | 0xdc0e0 -> 0x146c8 | 0x40 |
| 9 | Token2022 Program key | 0xdc128 -> 0x13ff0 | 0x48 |
| 10 | System Program | 0xdc170 -> 0x13b80 | 0x50 |
| 11 | event authority clone | 0xdc1b8 -> 0x2ca8 | inline 0x60..0x90 |
| 12 | Pump Program | 0xdc3f8 -> 0x136f0 | 0x58 |

Success stores are all retained at **0xdd188..0xdd2c8**. Event authority is an inline AccountInfo clone, not a pointer at +0x60; +0x60 holds its key pointer, +0x68/+0x70 its reference cells, and its flags are at +0x88..+0x8b. The executable byte +0x8a doubles as the error niche: error paths write 2 at 0xdc358 or 0xdc6e0. The wrapper tests that exact byte at 0x129740..0x129758; success is not a newly synthesized tag zero. Clone padding is not promised initialized. The error cleanup at 0xdc6e8..0xdc770 decrements the two cloned reference counts, including weak-count decrement when strong reaches zero. Earlier failures return before that clone exists.

Source and destination wrappers both pass through **0x1d0 -> 0x2e48**. Destination adds a box at 0x38a8..0x3a08. The common wrapper places AccountInfo at +0x20 (0x3288) and decoded mint at +0x28..+0x48 (0x31c0,0x3270,0x3280). Ordinary decode call 0x3078 ->0x185ed0 is the same exact helper already admitted by vault_admission. Its 165-byte gate 0x186130 jumps to0x1861e8; raw decoding and common error/return blocks are sealed without the extension arm. This grounds transfer-interface's selectors: destination `*(*(A+0x30)+0x20)` is slot6; buyback `*(A+0x38)` is slot7; initial source `*(*(A+0x28)+0x20)` and authority `*(A+0x20)` are slots5/4. Context parsing only requires buyback be present and writable; no mint/owner/recipient-membership rule is invented for that raw slot.

## Program keys, signers and local error order

Signer reader 0x127a0..0x12850 checks count (3005), consumes, then calls0x19b4e0. The latter tests AccountInfo+0x28 and returns3010 if zero. Thus slot2 must already carry signer privilege; PDA equality later does not manufacture it. The user and source_authority follow the same reader, in that order.

Tokenkeg reader **0x146c8..0x14910** checks count3005, consumes, compares key against the exact32 bytes at0x1b5b28 using0x14770, and tests the comparison at0x14788. Mismatch selects3008 at0x147c8. Only matching key reaches executable byte+0x2a at0x14790; zero selects3009 at0x148e8. Success returns tag2 and the same pointer at0x147a0..0x147b0. Therefore the context[0x40] selected by vault_admission is an executable account with the Tokenkeg key. This is not a program-owner or external-processor proof.

The mandatory Token2022 slot has the same sequence at0x14098/0x140b8 with its distinct key constant; no extension decoder is involved. System compares the32-byte zero key at0x13c48 before executable; Pump compares the constant0x1b79df at0x13798 before executable. Their key/executable errors remain3008 then3009. These four reader checks run before Global PDA constraints, even for an ordinary Tokenkeg route.

Source/destination owner, borrow, raw-option/state and initialization order is explicit in CONTRACT.md. The common account reader first handles zero-owner accounts via a lamports read: 0x30d0 ->0x1a29f0 reads the shared lamports cell, temporarily increments/decrements its borrow count; zero returns3012, nonzero resumes owner membership and fails3007. The ordinary Tokenkeg member reaches shared data borrow before decoding. A frozen state passes the local initialization test; downstream Tokenkeg acceptance is not claimed. Global's analogous owner/borrow wrapper is sealed at0x96d0..0x9ab0; its full payload-decoder acceptance/error policy remains an explicitly imported type obligation, not a fabricated decoded-value precondition.

## Complete post-read constraint order

After all thirteen readers succeed, the exact local order is:

1. **Global PDA:** one seed `global`, incoming program ID; find call0xdc450, bump store0xdc4a8 to bumps[0], key comparison0xdc528/0xdc540. Mismatch constructor2006 at0xdc558.
2. **FeeConfig PDA:** three seeds `fee_config`(10), Pump ID(32), decoded bump(1), under embedded Fees ID. Descriptor assembly0xdc770..0xdc878; create call0xdc878. A failed create result takes2006 at0xdc8a0. Success key mismatch at0xdca00 takes2006 at0xdca18. The bump is wrapper+0x80, bound by fee_decode to wire byte8. It is supplied to create-address, not replaced by a new bump search.
3. **AMM global PDA:** one `global_config` seed under embedded AMM ID, call0xdcbe0; bump stored to bumps[1] at0xdcc38, equality test0xdccd8. Mismatch2006 at0xdccf0. Signer validation already happened in input slot2's account reader, before any PDA constraints.
4. **Writable checks:** user at0xdce20/0xdce28; source via wrapper+0x20 at0xdce30..0xdce48; destination via wrapper+0x20 at0xdce50..0xdce68; buyback at0xdcf60..0xdcf70. Each zero yields2000 with its own account label. This is user, source, destination, buyback order regardless of textual placement of error blocks.
5. **Event authority PDA:** one `__event_authority` seed(17), incoming program ID, find call0xdd098. Bump store0xdd0f0 to bumps[2] precedes the key comparison0xdd168/0xdd180. Mismatch2006 at0xdd2d8. Equality alone reaches all context success stores.

These are numeric constructor arguments and exact caller-local precedence. Error-name attachment/comparison detail construction, allocation failure, terminal formatting and complete serialized error objects retain their opaque contracts. This is the entire context tail, not an isolated prefix. No extra initialized flag, source-authority equality, rent-exemption, recipient-membership, alias or balance constraint is inserted.

PDA wrapper0x1a7eb8 returns key[32] and bump at+32 after imported `sol_try_find_program_address`; nonzero return enters its terminal formatting dependency at0x1a7f90.0x1a7ff0 checks seed count<=16 and each length<=32 before imported `sol_create_program_address`; this caller's lengths10/32/1 satisfy those guards. The successful result is tag0 then key at+1. Raw import relocation/symbol/string records are in data-ranges.json/imports.json. Static seed descriptors carry type8 relocations and the address in the high32 raw bits; both descriptor and relocation bytes plus exact seed text are retained. Runtime loading/PDA semantics are imported, not executed or cryptographically reproved.

## Validated event bump flow

The wrapper initializes its three-byte scratch bumps to255 at0x1296c0..0x1296d0 and supplies their address via outgoing-0xff8. After context success it copies bump bytes to its outer Context: the halfword at0x1297c0..0x1297d0 covers Global/AMM; the byte at0x1297d0..0x1297e0 covers event authority at Context+0x22. Failure skips handler invocation. The outer route loads that byte at0x56f70, saves it at fp-0x2d8 (0x56f78), loads it into r3 at0x57430 and calls the hop at0x57438. The hop saves r3 at fp-0xa58 (0x5b3b8). This is the event-wire package's exact one-byte seed source at0x5e920..0x5e9e0. The canonical event key is context's inline clone at+0x60, already compared to the same derivation. No numerical bump was guessed and no signature was supplied or bypassed.

This also distinguishes the per-hop curve bump, passed separately through outgoing-0x1000 after0x572c8 ->0xdd700, from the context's event bump in r3. The outer final-leg boolean is computed at0x57330..0x57348 from loop index==hop_count-1 and stored outgoing-0xfe0 at0x573b8; it is the inherited transfer-enable value, independent of fee flags. After successful hops the final carried mint is compared to destination.wrapper+0x28 at0x57030..0x57078. This adds a mint relation in the outer handler, not an earlier fixed-context constraint or guaranteed transfer authorization.

## Limits, source review and verification

The source declaration's account order, signer types and PDA/writable constraints correspond to this local ledger. A source patch still needs the exact original Global payload-reader policy, existing source-order reconciliation and the separate native/Tokenkeg-effect work. This package does not turn declarations or an arbitrary decoded struct into complete admission evidence. The concrete remaining type boundary is0x96d0 ->0x15fdd0 ->0x1600a8 (Global payload), whose full malformed-input/default behavior is not newly proved here. FeeConfig and ordinary token wire contracts are consumed with their stated limitations. Refcount/allocator/memory faults and error-object internals remain operational boundaries; this is not an all-input no-panic or exact error-ABI theorem.

All four original whole-byte comparisons remain false; the baseline is140/150 bounded implementations, five partial and five unrecovered. Saved tests, hashes and this static contract do not prove exhaustive semantics or security. No runtime, new fixture, network, chain action, source build, binary/source patch, staging, commit, push, signer bypass or parent mutation occurred. Native settlement and external Tokenkeg processor effects were left to other workers. No stopped lane was resumed. A few display bounds/one mistyped offset exposed adjacent code; it was not interpreted or retained. Sealed windows exclude those exploratory tails and extension branches.

Run `python3 verify.py`. It checks exact inventory/SHA256, unchanged predecessor subset seals, bounded instructions against original byte slices, selected calls/branches/literals, all context-internal direct branch destinations, slot/success-store metadata, descriptor/import bytes and source excerpt hashes. It executes no SBF, simulates no accounts, and does not prove prose or imported algebra. Full-object identities and slice equality were checked during frozen extraction; bounded portable slices cannot independently establish membership in an absent full ELF/Git object. A copied-directory verification result is recorded at sibling `verification-outcome.json`, outside the seal.
