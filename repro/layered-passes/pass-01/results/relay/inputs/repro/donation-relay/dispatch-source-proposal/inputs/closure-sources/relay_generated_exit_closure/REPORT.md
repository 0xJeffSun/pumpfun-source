# Relay generated account exits: concrete conditional source adapters

Baseline: `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. Static recovery only. This continuation preserves the interrupted extraction and every retained predecessor file/seal. It supplies all nine assigned exit adapters in `source/generated_exit.rs`, plus an eleven-wrapper phase ledger. No build, typecheck, SBF execution, transaction fixture, network access, parent-source change or completion-count change was performed. Root review and separately authorized implementation tests remain necessary.

The original ELF is 830,448 bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The six checkpoint inputs were compared directly with `git show` at the fixed revision, not read from the moving parent working tree. `input-manifest.json` binds whole inputs and retained predecessor extracts. `consumed-code.json` records complete consumed window extents, bytes, calls and branches; `consumed-data.json` records literal ranges; `source-ranges.json` records exact source spans. Byte ranges are half-open file offsets; source lines are one-based inclusive. Window ordinals are inventory labels, not proven historical function identities.

## Recovered exit operations

Every row stops on its first fallible error. `S` means the concrete account serializer with the gates below; `I` means the checked zero-byte interface serialization; `C` means helper282's alias-preserving close. Read-only, signer, program and unchecked fields do not acquire additional invented exit checks.

| Exit | Ordered operations after successful body and return phase |
|---|---|
| 125 | S epoch_tracker; S debouncer; I debouncer_token_account; I mint; I from_token_account |
| 130 | S epoch_tracker; S debouncer; I debouncer_token_account; I mint; I temp_wsol_token_account |
| 141 | S epoch_tracker; S debouncer; I debouncer_token_account; I mint; I from_token_account |
| 145 | S distribution; I distribution_token_account; S epoch_tracker; S debouncer; I debouncer_token_account; I mint |
| 147 | C distribution to signer; C swap_receipt to signer; I output_distribution_token_account; I output_mint |
| 149 | C distribution to signer; I distribution_token_account; I mint |
| 153 | S distribution; S swap_receipt; I distribution_token_account; I output_distribution_token_account; I mint; I output_mint |
| 155 | C distribution to signer; I distribution_token_account; I output_distribution_token_account; I mint; I output_mint |
| 158 | S mint_whitelist; no event-return phase |

This is not a close-only adapter. Just-swap preserves and serializes both live state accounts. Epoch close serializes its new distribution; it does not close that account here. Native donation's temporary token-account interface exit is distinct from any token-program cleanup already performed in its body. These adapters do not repeat body CPIs.

The operand anchors for each row are in `phase-ledger.json`. Donation125 starts with calls at 201840→14936 (tracker18), 201920→13984 (debouncer17). Epoch145 starts 398768→16672 (distribution20), checks the distribution token account at 398832, then 399048→14936 and 399832→13984. Just-swap153 starts 465584→16672, followed by the inline receipt serializer beginning at 465608. Its first token-interface continuation is out of address order: 466728 branches to 468040; closed or unborrowed success returns to 466736, before the output token account. Reading linearly would incorrectly place the input-token check last. All corresponding branches are retained.

## Owner, closed and borrow decisions

For relay state, the serializer compares the type's declared owner with the supplied program id. In 125, `r3` is loaded with literal 758342 and `r4` receives the caller program id before calls18/17. Helpers17/18/20 compare those arguments, not the live AccountInfo owner. Inline receipt153 and whitelist158 compare the same relay literal directly. A mismatch skips serialization successfully; it is not a newly introduced incorrect-owner error. Context admission is an earlier, still separate parser responsibility.

If that comparison passes, helper283 checks live owner against the 32 zero bytes at 753088 and, only for System owner, calls329 to inspect whether data length is zero. Thus closed means **System owner AND empty data**, not zero lamports. Non-System owners short-circuit without the immutable borrow. System-owned data inspection panics on an incompatible RefCell borrow (329, 689752–689856); it is not a returned mutable-borrow error. For a valid nonclosed state, the serializer checks the data RefCell flag, acquires exclusive access, serializes, and releases the guard even on writer failure.

Interface accounts compare their **cached owner**, retained in the parsed interface wrapper, with the supplied program id; they then perform the same live closed check. For example125 loads cached owner from context+40 and AccountInfo from context+72, at 201952–202064. Mint uses its nested wrapper's cached owner at +96 and AccountInfo at +88. This distinction matters after body owner mutations and with aliasing. A matching, nonclosed interface has a fallible mutable-borrow check even though its serializer writes zero bytes. In the machine code the unused acquire/release is optimized to a flag test: zero succeeds; nonzero constructs the error. `interface()` expresses that same behavior via a scoped mutable-borrow primitive, with no intervening observable operation and no data write.

The conflict value is the internal ProgramError representation `0x800000000000000b`, visible at202072,14304,466168,504608. Helper285 wraps it; it is not a relay custom code or a claim about a final syscall return ABI. Account-name origin is attached at the caller. The Rust `Cause::Program(u64)` preserves this representation as an analysis value; runtime integration must map the actual ProgramError consistently.

## Concrete serializers and writer behavior

The retained integrated codec is reused, not replaced by a generic serialization callback. It has these exact layouts:

| State | Wire prefix, in order | Bytes |
|---|---|---:|
| Tracker | discriminator; bump u8; state u8; config_id[32]; mint[32]; current_epoch LE u128 | 90 |
| Debouncer | discriminator; bump; state; config_id; mint; total_amount LE u64 | 82 |
| Distribution | discriminator; bump; state; config_id; mint; epoch LE u128; total_amount LE u64 | 98 |
| SwapReceipt | discriminator; bump; distribution[32]; output_amount LE u64 | 49 |
| Whitelist | discriminator; bump; vector length LE u32; ordered mint keys[32] | 13 + 32n |

Helpers18/17/20 supply the first three sequences;153 inlines receipt stores/writes at465792–466432. The exact discriminators and relay id are retained as original-byte slices, with codec constants independently bound by the predecessor manifest. No trailing-byte wipe is performed. Writer281 copies the available prefix (`min(remaining, requested)` at651176–651224), advances the cursor, and returns a short-write error if the request was incomplete. Earlier writes therefore remain locally observable until enclosing transaction rollback. A whole-prefix copy of the fixed codec output has the same resulting partial bytes as the field-by-field writer under the stated allocation/slice premises.

Whitelist158 requires streaming rather than constructing its complete vector first: discriminator write at504040, bump at504192, then the u32 length limit at504248, length write at504320 and one 32-byte key at a time at504400. An overlarge length fails **after** discriminator and bump writes. The adapter preserves that ordering, even though an earlier successful body ordinarily bounds the whitelist length. It does not silently rely on that body bound to remove the serializer branch.

Writer errors become Anchor `AccountDidNotSerialize` (3004) at14840/15808/17616,466584 and504536. They release the mutable borrow before attaching the account origin and returning. The wrapper does not replace these with success. Error origins are exactly the field names shown in the operations table. Most names are assembled from immediate byte stores in the exit window; helper6 at4192 handles the shared account-name attachment for the mint in145 and output_mint in153 (401024/467992). It copies the supplied name and retains the original error variant; it is not another application serializer. Error allocation, formatting/vtables and panic diagnostic strings are bounded framework behavior, not claimed historical source equivalence.

## Helper282 and alias-sensitive close order

Caller147 clones destination signer first (context+264) and then source distribution (context+376); the stack source goes in `r2`, destination in `r3` at418112. Its second call418960 uses the same destination and the receipt source. Calls434880 in149 and486808 in155 use the distribution source and signer destination. The helpers' names alone were not used to infer argument direction. Rc count increments, overflow-to-abort branches and by-value cloned AccountInfo fields are retained in each caller. The adapter requires genuine aliased AccountInfo handles, not value copies of balances or owner/data buffers.

282 executes this exact application-visible sequence:

1. Read destination balance via326 at651384, then source balance at651408, releasing each immutable borrow.
2. Checked-add the balances. Unsigned overflow at651440–651464 branches to652208 and calls the panic helper at652224. This is a framework panic, not relay6008. No balance writes precede this check.
3. Exclusively borrow destination lamports; write sum at651528; release at651552. Borrow conflict panics via652248.
4. Separately borrow source lamports; write zero at651608; release at651632. Borrow conflict panics via652272.
5. Assign source owner to System via333 at651664. The helper writes the four owner words in descending offsets24,16,8,0.
6. Resize source data to zero via332 at651704. This is fallible even after balance and owner changes. Its mutable-borrow conflict returns the ProgramError. With valid AccountInfo ABI, zero is not a growth request, so the growth-limit branch cannot fail here. If length is already zero, it succeeds after the borrow check; otherwise it sets the serialized length at data−8 and visible slice length to zero (690384/690392). Shrinking does not invoke memset or wipe the old data tail.
7. Drop destination cloned Rc handles, then source cloned handles (651904–652160), on ordinary success or returned failure; propagate result. Panic/abort termination is a separate runtime premise.

There is no key-inequality, owner, zero-lamport or already-closed check in282. None is added by the adapter. If source and destination share lamports, the sum is based on two reads of the same value; destination is first written with the checked doubled balance, then source writes zero into that same storage. If this overflows, it panics before writes. Deduplicating the operation, taking simultaneous mutable borrows, transferring a cached source balance, or skipping self-close would all change behavior. If distribution/receipt alias each other, their sequential closes and any shared owner/data mutations likewise remain visible. Whether such aliases pass the earlier parser is outside this exit contract; the adapter does not invent admission rules.

## Wrapper phase and failure propagation

`phase-ledger.json` contains all eleven wrapper names, exact wrapper/exit ranges, inherited parser/body/event boundaries and actual call PCs. The five donation wrappers use125/130/141; close_donation_epoch uses145; distribute_after_just_swapping uses147; distribute_non_swap_output_mint uses149; just_swap uses153; swap_then_distribute uses155; upsert_mint_whitelist uses158.

After successful parse and body/adapter (including existing event log and signed event CPI), ten wrappers serialize a bare return event, call302 (`sol_set_return_data`), then run exit. For donate_v1 this is531584→159032,531624→669720,531672→201768. The data setter is a void syscall wrapper; it does not certify successful exit. A later serialization/borrow/close error propagates through the generated wrapper's return and cleanup. Emitted logs or return data are not proof of transaction commitment.

Variable return serialization failure is an **unwrap/panic** branch, not a returned3004. The interrupted source draft incorrectly accepted a fallible return callback and propagated its error; this continuation replaces it with concrete `codec::event_bytes(event).expect(...)` and then sets only the bare payload. For example531592–531600 jumps to531960 and panic helper716352 on nonzero serializer result;545576 goes to545704 for the processed event. The fixed Closed/Swapped payloads have no variable-length error branch at these wrapper sites. Allocation failure remains a runtime/framework termination premise. The retained prior `phases.rs` is unchanged evidence; its return-error model is not silently adopted by this new adapter.

Whitelist188 calls its body at551936, checks result at551952, and calls158 at552016 only on success. It has no return-event setter. Parser/body/access/CPI failures bypass the successful exit adapters. Wrapper context/argument drops remain the responsibility of the owning integration layer; the source fragment borrows the parsed context and explicitly owns only helper282's cloned handles. No fresh synthetic account contexts or success stubs are supplied.

## Integration and remaining assumptions

Add the new exit module to the integrated source hypothesis, using its existing `Key`, state types and `codec` module. For each wrapper choose the typed exit context listed above from the **same successfully parsed context and live handles used by the body**. After the existing body/log/signed-CPI phase, call `return_then_exit(rt, event, |rt| account_exitNNN(...))`. Do not first call the old `emit_and_set_return` as a combined operation, which would duplicate return-data and retain its differing error model. Its log/CPI work must be retained before the new return/exit sequence. Whitelist directly invokes158 after its successful body.

This provides concrete serialization and cleanup decisions, with no `Incomplete` exit path. It is an implementable source fragment rather than a standalone crate or a deployed implementation. Its bounded premises are valid admitted AccountInfo layout and backing allocation, faithful alias/Rc/borrow primitives, valid typed enum state, adequate host/framework allocation, byte comparison/copy, genuine syscall behavior and enclosing transaction rollback. Framework error heap representation, source locations, destructors under allocation failure, abort/panic diagnostic identity and original compiler/SDK/Anchor versions remain unresolved. Exact owner word-store observability is encapsulated by `assign_system`; no concurrent observer is assumed within that primitive.

The original context parsers, account creation/receipt constructors, relay mint-policy106 and unrelated body gaps are not solved by this exit recovery. Existing incomplete admission checks must remain incomplete, never be changed to success to use this adapter. This report makes no original-source identity, whole-program equivalence, byte-equality or exhaustive runtime claim. Counts remain unchanged.

## Portable integrity verification

Run `python3 -B verify.py` in a separate copy of this directory. Only standard-library Python is used. The verifier checks complete inventory and manifest seal; all whole-input hashes; retained predecessor artifacts against their unchanged manifests; all selected bytes and disassembly; signed relative-call operands; actual ELF relocation record/symbol identities; literal and source spans; independent close/store/branch anchors; and static CFG dominance of parse/body/return phases before exit. It checks that153 has no close282 and147 has two in order. It does not execute the target or a model, generate transactions, parse/typecheck Rust or prove the handwritten source semantics. CLI telemetry and verification receipts stay outside publication.

Prior directories are selective verbatim extracts, not claims to contain every predecessor artifact. The integrated predecessor's manifest and separate seal are retained unchanged. The donation tooling predecessor provides a manifest but no separate manifest.sha256 file; its original manifest and selected disassembler are retained unchanged and bound by this package's seal. The adapted local disassembler classifies calls using source nibble and actual relocation evidence, never annotated inferred function names. Future changes require a new publication rather than rewriting this seal.
