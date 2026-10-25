# Independent static review: fee-update event copy

The current fee-update handler contains a redundant second event materialization, corresponding to its explicit `emit!(event.clone())`. The original uses one event buffer for both the log and event-CPI serialization. The pinned macros borrow their event expressions, so cloning is unnecessary to preserve ownership for the second call. This is a source-operation finding, not a prediction of future compiler output or proof of exact original Rust spelling.

No source/main files were edited. No build, runtime probe, signed-message alteration or initializer fixture was performed. All inputs are copied by hash from frozen package `repro/pump_amm/create-config-shared-methods-v144`, seal `af3d4992a4a9f4b01375d1fec610fb902bab321b5dce418f315e6a8bd6716dd8`. The candidate is `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2`.

## Exact buffers and calls

| Property | Original | Current candidate |
|---|---|---|
| Handler | `0x1d8a0`, 2,912 bytes | `0xc8340`, 3,160 bytes |
| Event recipients copy | `0x1dbe0`, 256 bytes to `r10−584` | `0xc8688`, 256 bytes to `r10−856` |
| Extra event recipients copy | None | `0xc8758`, 256 bytes to `r10−504` |
| Log-event serializer | `0x1dc58`, argument `r10−584` | `0xc87f0`, argument `r10−504` |
| Log-data call | `0x1dca0` | `0xc8838` |
| Event-CPI serializer | `0x1ddc0`, argument `r10−584` | `0xc8958`, argument `r10−856` |
| Serializer target | `0x89148`, 744 bytes | `0x44878`, 744 bytes; complete normalized match |
| Instruction construction | `0x1e0e8` | `0xc8c80` |
| Signed self-CPI | `0x1e220` | `0xc8db8` |

The candidate therefore serializes its temporary cloned event for the log, then the retained event for CPI. The original passes the same event address to both serializers. The two serializers' complete 744-byte instruction bodies and relocation shapes match; the event memory field offsets are unchanged.

The in-memory event is **352 bytes**, excluding the serializer-added discriminator. It contains recipients at +0 (256 bytes), admin at +256 (32), authority at +288 (32), timestamp at +320 (8), LP fee at +328 (8), protocol fee at +336 (8), and creator fee at +344 (8). Serialized event data is a separate 360-byte representation.

`evidence.json` records and asserts both candidate copies' complete field provenance:

- Both recipient copies read `r6`, with explicit length 256.
- Both admin copies read the same account-key pointer, saved at `r10−1000` for the second copy.
- Both authority copies read the same argument pointer saved at `r10−984`.
- Timestamp is the same successful Clock scalar, retained at `r10−992` for the second copy.
- LP and protocol values come from the same preserved `r9` and `r8` registers.
- Creator fee comes from the same argument saved at `r10−976`.

The second copy has twelve explicit eight-byte field stores (96 bytes) plus the additional 256-byte recipients memcpy, accounting for the full second 352-byte value. Exact load/store addresses and operands are retained and checked.

## Instruction and call accounting

The original has sixteen direct calls; the candidate has seventeen. Removing only candidate call `0xc8758` from the comparison aligns the semantic call sequence: the four setters, Clock, error conversion, first event construction copy, event serialization/log, second serialization, allocation/instruction/CPI/error/panic helpers. Of those sixteen paired targets, twelve match completely. The three scalar targets and recipient setter retain their separately documented mismatches. No generic helper is substituted for an actual target.

The complete function sizes partition as follows:

| Partition | Original | Candidate | Difference |
|---|---|---|---:|
| Prefix | `0x1d8a0..0x1db48`, 680 bytes | `0xc8340..0xc85e8`, 680 bytes | 0 |
| Event construction through first serializer | `0x1db48..0x1dc60`, 280 bytes | `0xc85e8..0xc87f8`, 528 bytes | +248 |
| Suffix | `0x1dc60..0x1e400`, 1,952 bytes | `0xc87f8..0xc8f98`, 1,952 bytes | 0 |

Thus the net **248-byte handler increase** is localized to the event construction/first-serialization partition. Equal prefix/suffix instruction counts do not mean byte equality: their stack offsets, register assignments and branch displacements remain recorded differences. This analysis does not mask those differences or promise a 248-byte reduction in another build.

## Source and dependency evidence

The frozen source has `emit!(event.clone());` followed by `emit_cpi!(event);` in `update_fee_config`. The event type has derived Clone and only public-key, array and scalar fields. The exact locked `anchor-attribute-event 0.31.2` macro expands the first expression as:

```rust
anchor_lang::Event::data(&event.clone())
```

The second macro similarly borrows `&event`. `Event::data` takes `&self`. Neither macro consumes the event value. Consequently the clone is not required for Rust ownership; it explicitly requests a second value that is observed in the current executable. The current creation handler already uses the ordinary borrowed event expression, but no initializer execution is used as evidence here.

The dataflow supports treating this clone as a concrete source-level difference from the original's one-buffer operation. Exact original tokens remain non-unique: a compiler could optimize equivalent source differently, including eliding a clone. Removing an unnecessary source operation is distinguishable from choosing flags, padding, inline attributes or artificial callers to force assembly. This report neither builds a proposed change nor predicts its exact code generation.

The scalar 608/616-byte residuals, actual `with_values` specialization, other update-handler register/frame choices, unresolved metadata and full binary identity remain outside this narrow finding. Fixed-admin initializer coverage stays static-only, and no stopped lane is resumed.

Run `python3 -B verify.py` from this directory, or use its absolute path from another directory. Verification reads only the retained artifacts and exact static assertions; it executes no Solana program.
