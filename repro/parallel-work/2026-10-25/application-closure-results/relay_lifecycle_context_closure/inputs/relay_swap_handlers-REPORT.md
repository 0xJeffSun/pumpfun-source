# Relay swap handler source hypotheses

Static handoff at fixed published checkpoint `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. This recovers concrete normal-resource body fragments for `just_swap_v1` and `swap_then_distribute_v1`, plus a precise caller boundary to shared108. It is **not** a source-built candidate, historical source attribution, exhaustive account-context reconstruction, or whole-program equivalence claim. No handler/completion count changes. Root must review and test an actual implementation before acceptance.

`hypothesis.rs` contains implementable semantic fragments behind explicitly abstract runtime interfaces. `argument_fragment.py` contains a normal-resource argument parser. These files were not compiled or exercised against a runtime. Runtime methods are obligations, not permissive stubs: an implementation must supply the exact specified contracts or keep the fragment unintegrated. No omitted account check is replaced by a guessed check.

## Inputs, ranges, and reproducibility

All repository inputs were read with `git show CHECKPOINT:path`, never from moving source. `provenance.json` gives exact whole-input SHA256, Git blob identity, byte sizes, source line ranges and paths. Binary: 830448 bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. Full IDL SHA256 `b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c`.

`static-evidence.json` records every consumed code window, whole-window hash, direct/indirect call operands, branch destination and consumed data range. All ELF offsets in this package are decimal, half-open file-byte ranges, with PCs in the same coordinate system. Disassembly is regenerated directly from bytes using the retained public decoder. Local targets are `PC + 8 + signed_imm32 * 8` with source nibble 1. External relocation sites are retained separately; neither annotated call names nor a `-1` relocation placeholder is used as a local target. Window ordinals are inventory conveniences, not historical function identities.

The immutable manifest covers every deliverable including the verifier and ledger; `manifest.sha256` seals its bytes. Run `python3 verify.py` from any copy. It checks the artifact set, all hashes, regenerated instruction/CFG/call ledgers, prior window hashes and independently specified operand anchors. This is integrity and static-evidence verification, **not** proof of the handwritten source's semantics. No transaction/signature fixtures, build, target execution, emulation, network contact or parent edits occurred. Prior seals are unchanged. CLI telemetry is excluded.

## Real boundaries and execution order

| Role | Just swap | Swap then distribute |
|---|---|---|
| IDL discriminator hex | cc9f84758456df49 | da55edb218ae6629 |
| Argument/parser/exit wrapper | 185 [545792,547224) | 184 [544128,545792) |
| Generated account parser | 150 [436696,455264) | 154 [469568,486200) |
| Access-control and event adapter | 202 [573360,576456) | 203 [576456,579576) |
| Business body | 99 [102792,107240) | 100 [107240,112568) |
| Generated exit | 153 [465512,469568) | 155 [486200,490024) |

Wrappers log the instruction, deserialize arguments, parse accounts, invoke adapter, serialize/set return data, run account exit, then drop context. Parse errors precede admission. Adapter calls shared105 [114568,115456) on signer before body: compare signer key to fixed bytes [752896,752928), failure **6015 SignerIsNotRelayer**, carrying compared keys. The IDL names that key `RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc`. This is real admission evidence, not an inference from documentation. Parser-side signer and address checks also remain; they are not redundant permission to omit generated validation.

Argument decode77 [56440,58688) reads LE u32 byte-vector length then exactly that many opaque bytes. Empty vector is valid at this layer. Initial allocation is capped at 1048576 bytes, then growth is possible; that is **not** a maximum accepted Jupiter length. Decode78 [58688,60320) follows only for combined: LE u32 share count, each wire record is **35 bytes**: tag u8 (<3), address[32], LE u16 BPS. In-memory records stride 36, BPS at +32 and tag +34; do not copy that memory layout to the wire. Initial share allocation caps at 113 elements then grows; it is not a share-count policy. A bad tag is checked before remaining address/BPS bytes. Argument failure is mapped by wrappers to **102 InstructionDidNotDeserialize**, after error cleanup. Neither wrapper checks final exhaustion; trailing instruction bytes are ignored. The fragment abstracts allocation/growth/cleanup failures and cursor mutation on failure.

## Generated contexts: concrete facts and retained boundary

`contexts.json` retains exact ordered IDL field specifications, types/events and constructor/exit boundaries. Just swap consumes 16 fixed accounts; combined consumes the same 15 after removing swap_receipt. Order is epoch_tracker, debouncer, distribution, [swap_receipt], input vault, output vault, mint, output_mint, output_mint_program, signer, token_program, jupiter_program, associated_token_program, system_program, event_authority, program. The remainder is preserved as an ordered slice.

The known seed contracts are:

- epoch tracker: `epoch_tracker_v1`, distribution.config_id[32], distribution.mint[32]; supplied stored bump used in validation.
- debouncer: `debouncer_v1`, the same config/mint, stored bump.
- distribution: `distribution_v1`, config[32], mint[32], epoch.to_le_bytes()[16], stored bump.
- just-swap receipt: `swap_receipt_v1`, distribution.key[32], generated bump.
- both vault ATAs: distribution.key, corresponding token-program key, corresponding mint key, under the associated-token program.
- event authority: `__event_authority`, generated bump under relay program.

The input/output mint interfaces are mutable. Output mint is fixed to `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`; Jupiter is fixed to `JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4`. System and ATA programs are typed/fixed programs; token interfaces admit the supported token program identities. Jupiter remains an address-constrained account, not an invented generated Jupiter context. The opaque CPI data is not parsed as a Jupiter route in these bodies.

Parser150 invokes constructor151 [455264,461928) for a **49-byte** receipt (rent calculation and zero/funded-lamport branches, signed creation/allocate/assign paths, unchecked receipt decoding), then constructor152 [461928,465512) for the output ATA. Parser154 uses the same output-ATA constructor. Receipt creation is in context parsing, before the relayer access-control adapter and before Jupiter; field initialization is in body99. Existing account/creation failures must follow constructor151, not a guessed `init_if_needed` or unconditional overwrite policy. The full constructor operands are retained, but all transitive system/ATA failure precedence is an open integration obligation.

`static-evidence.json.context_error_sites` ties each directly constructed generated-context error to its PC and, where present, actual account-name literal. Examples: 2006 seed errors for receipt/epoch/debouncer/distribution/event authority; 2000 mutable errors; 2005 rent errors for receipt/output ATA; 2015 input-vault owner and 2009 associated-address errors; 2012 address errors for mint/output mint/Jupiter/signer; 2022 mint-program and 2023 token-program relationship errors. Combined additionally constructs **2011** for distribution close destination alias at 480104 (equality branch 479664); do not omit that distinct close constraint. Type decoders and typed program/signer helpers can fail before these constraints; this table is not an exhaustive list of all propagated errors.

Selected generated-layout bindings used in body recovery (offsets relative to parsed context, not serialized wire):

| Field | Just | Combined |
|---|---:|---:|
| current epoch low/high | 72/80 | 72/80 |
| Jupiter AccountInfo | 96 | 96 |
| distribution AccountInfo pointer | 440 | 384 |
| config/mint byte arrays | 448/480 | 392/424 |
| distribution epoch low/high | 512/520 | 456/464 |
| total_amount, bump, state | 528/536/537 | 472/480/481 |
| input token interface start, amount | 544/648 | 488/592 |
| output token interface start | 760 | 704 |
| signer AccountInfo pointer | 320 | 264 |
| receipt AccountInfo pointer, decoded distribution/amount/bump | 240,248/280/288 | absent |

Just comparison at 103512 compares ctx+392 (debouncer decoded mint) to ctx+480 (distribution mint). The wrapper copies parser output into the context, preserving these offsets. The published fixed-codec report supplies checked-account wire interpretation and allowed state tags 0/1; error-codec report supplies normal discriminator/body error interpretation. Their historical checkpoint prose is not substituted for the current fixed checkpoint.

## Swap body and common Jupiter helper

Just body99 rejects in this order: distribution.epoch >= epoch_tracker.current_epoch (**6028**); distribution.state == 0 (**6007**); debouncer.mint != distribution.mint (**6006**, compared keys); distribution.mint == fixed settlement mint (**6006**, compared keys). Epoch compare is full unsigned u128, high word first when unequal. It constructs one five-seed signer group with lengths 15,32,32,16,1 and invokes helper91 at 105400, expected input amount = distribution.total_amount.

Combined body100 rejects epoch not closed first, then sums BPS in a checked **u32** (overflow **6008**, PC107976), requires sum ==10000 (**6022**, including empty shares), then requires remaining.len >= shares.len (**6030**). It splits at shares.len: recipient prefix goes only to shared108; Jupiter suffix goes only to helper91. There is no independent per-share <=10000 test in this body, nor a copy of just body's state/debouncer-mint/non-settlement checks. Do not insert those guessed checks; the generated-context contract must be reconciled separately.

Helper91 [67320,70200) implements the concrete balance contract:

1. Snapshot cached input.amount at input-interface+104 and output.amount at output-interface+104.
2. Call CPI builder90 [64824,67320); propagate its error unchanged.
3. Reload input via21 [17712,18400), then output via21; propagate either failure before comparisons.
4. Checked `input_before - input_after`; increase is **6008 ArithmeticOverflow**.
5. Require consumed amount == expected distribution.total_amount; mismatch **6021**, observed and expected values attached.
6. Checked `output_after - output_before`; decrease is **6008**.
7. Require positive delta; equality yields **6023 OutputAmountMustBeGreaterThanZero**. Return delta, not final balance.

There is no observed minimum-output argument/check here, no requirement that input_before equal expected, and no requirement that input_after be zero. External Jupiter may reject malformed route data or enforce slippage; this package does not invent that contract.

Builder90 copies the Jupiter program key and opaque decoded byte vector into an Instruction. For **each ordered Jupiter account**, it builds a 34-byte meta: pubkey[32], signer bool = (key == distribution.key), writable bool copied from AccountInfo+41. It does **not** preserve other accounts' incoming signer flag in instruction metas. It clones the same account slice into an AccountInfo vector without prepending fixed context accounts. Seed count zero would use the unsigned adapter; these two callers provide exactly one group and reach signed adapter300 [668496,669520). Account aliasing, privileges, borrow checks, executable program behavior and seed runtime validation remain external contracts. Supplying a signer meta does not itself grant a signature.

## Receipt, cleanup and events

On helper91 success just writes receipt.distribution = distribution.key, receipt.swap_output_amount = delta, receipt.bump = generated receipt bump (105440–105544). It then reloads the input again and calls helper109 with its current residual amount, input account, input mint, distribution authority, relayer destination and token program, using the same signer seeds.

**Helper109 burns residual input before closing.** A nonzero amount takes 128336 onward, calls227 at129680, then rejoins close at127992. Zero goes directly to close229 at128272. Builder246 chooses token enum tag8 with amount; packer244 emits byte8 plus LE amount. Builder247 selects enum9 from [759376,759380); packer244 emits byte9. Under the explicitly bounded SPL token instruction contract these are Burn and CloseAccount, not a refund transfer. This means the swap's exact consumption check can coexist with a nonzero residue which is subsequently destroyed. Burn/close CPI failures propagate. No new zero-residue precondition is added.

Just then constructs DonationEpochJustSwappedV1Event with config_id, input mint, epoch, distribution key, receipt key, output vault key, delta and settlement mint; event enum tag3. No distribution close occurs in body99. Adapter202 logs serialized event with the event discriminator `c8d8bb2523cece7f`, then performs event self-CPI with outer bytes `e445a52e51cb9a1d` and signer seeds `__event_authority` + bump. Wrapper185 serializes the return value separately (no event discriminator prefix), sets return data, then exit153 serializes distribution and receipt. Receipt write order is discriminator, bump1, distribution32, amount8 (465776–466432). The receipt remains live; closing it in the later distribution transaction is outside this assignment, not an operation performed here.

Combined calls shared108 **before** input finalization. On success it reloads input, burns any residual and closes input through109, then closes output via229 at112032. It constructs DonationEpochProcessedV1Event (tag2): config_id, input mint, epoch, settled_amount=delta, settlement_mint, transfers returned by108. Adapter203 logs and event-CPI emits it; wrapper184 sets return data and only then exit155 closes the distribution to signer. Exit155 calls282 [651352,652280), which checked-adds lamports to destination, zeros source lamports, assigns system owner, and reallocates data to zero; subsequent generated account-exit checks remain. Event/log/return-data operations occurring before a later failure are not proof of transaction success; visibility and rollback are runtime obligations.

## Exact shared108 caller interface (no arithmetic duplication)

Call PC111288 targets119440 by signed operand. r1 is return pointer; r2 points to caller frame-384; r3 to frame-144. Frame is caller100's r10:

| Relative to r2 | Supplied value |
|---|---|
| +0,+8 | recipient AccountInfo slice pointer, shares.len |
| +16..63 | output vault cloned AccountInfo |
| +64..111 | output mint AccountInfo |
| +112..159 | output token program AccountInfo |
| +160..207 | distribution AccountInfo |

| Relative to r3 | Supplied value |
|---|---|
| +0,+8 | share-record slice pointer, count (memory stride36) |
| +16,+24 | distribution signer-group pointer, group count1 |
| +32 | measured output delta from91 |
| +40..71 | output-token-program key copied from its AccountInfo |
| +72 | output-mint decimals |

108 returns a three-word vector-shaped success or a first-word `0x8000000000000000` error sentinel, with the next two words propagated. Caller retains the success triple as event transfers; it does not reinterpret it as an amount. Root's distribution worker owns ordering, per-recipient validation, fair arithmetic, token transfers and receipt construction within108. No sort/math closure claims are imported here, so later sort/callback/math packages are not required premises for these caller facts.

## Remaining-obligation ledger

| ID | Obligation / evidence boundary | Integration consequence |
|---|---|---|
| O1 | Generated context150/154 is preserved completely as opcodes; typed-account helper internals and every alias/owner/executable/borrow failure are not translated to natural source. IDL alone omits constraints. | Supply exact generated parser contract before using fragments as handlers. Do not replace with account-name validation. |
| O2 | Constructor151 receipt49 and constructor152 output ATA have bounded local flow, but transitive rent/create/funded-account/ATA init behavior is not fully closed. | Keep receipt init mode unresolved rather than invent init_if_needed. |
| O3 | Cached/reloaded token interfaces assume helper21 reload updates +104 from actual data. Token/Token2022 extensions and adversarial alias cases are not established. | Runtime contract must support these exact observation points and failure ordering. |
| O4 | Jupiter byte data/account/meta/signing flow is recovered; external Jupiter implementation/slippage/route semantics are unavailable. | Explicit external CPI premise; no new caller policy inferred. |
| O5 | Burn8/close9 packing and call flow recovered; token runtime acceptance, extension restrictions, cleanup CPI rollback unproved. | Implement genuine token operations; do not refund residual or silently skip failed burn. |
| O6 | Shared108 caller interface recovered, owned elsewhere. | Root must integrate actual distribution implementation and reconcile amount/receipts without duplicated arithmetic. |
| O7 | Scalar error codes/order recovered for body, rich framework errors and formatter/allocator/destructor/diagnostic identity are bounded by prior error report. | `u32` fragment errors are semantic shorthand, not binary-compatible error objects. |
| O8 | Event ordering/fields, log/self-CPI/return-data and exits are traced; full transitive serializer/resource/borrow failure equivalence unproved. | Retain separate event, return-data and account-exit phases; do not commit receipt early. |
| O9 | Compiler/source revision/dependencies and historical function boundaries unknown; no candidate built. | No historical identity or normalized/raw match claim for hypothesis source. |
| O10 | No runtime acceptance, malformed-input probes or transaction fixtures were authorized/performed. | Root review and legitimate separately authorized tests remain required; counts unchanged. |

The substantive recovered behaviors are exact input consumption, positive measured output delta, PDA-only CPI signer metas, combined account partition and BPS ordering, receipt persistence, residual burn/close, event phases and the shared108 argument layout. Remaining obligations limit integration; they do not erase these local control-flow facts.
