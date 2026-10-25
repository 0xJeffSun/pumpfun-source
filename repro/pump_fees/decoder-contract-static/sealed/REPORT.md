# FeeConfig decoder contract review

The discriminator handoff does **not** support a new behavioral decode-contract correction. Both compiled paths begin field decoding at the same account byte and select the same allocation ranges. The original retains a shared, cursor-mutating field helper and three separate allocation branches; current source keeps a private local cursor inside its unchecked trait method and shares the common prefix. These are real structural fidelity differences, but the reviewed callers do not expose the residual cursor. No source change, build or runtime probe is justified by this review alone.

The review freezes the unchanged 769,000-byte candidate `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`, original `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, symbol source, current `types.rs`, current 22-input source manifest, and relevant dependency text. The earlier 44-file closure and its publication remain unchanged. All newly written files are in this work directory.

## Exact boundaries and callers

| Function | Original byte range | Current candidate byte range |
| --- | --- | --- |
| Field decoder / unchecked trait method | 257264–259912 (2,648 bytes) | 78104–79656 (1,552 bytes) |
| Checked `Account<FeeConfig>::try_from` | 36072–37320 (1,248 bytes) | 30000–31144 (1,144 bytes) |
| Unchecked generic account wrapper | 18384–19528 (1,144 bytes) | 13584–14608 (1,024 bytes) |

Candidate bounds are confirmed by the matching unstripped symbol source; original bounds use the next known direct-call/relocation entry. The original decoder has exactly two raw direct-call sites in the captured text: 19280 and 37152. Candidate 78104 likewise has direct calls at 14240 and 30976. Every target in `analysis.json` is recomputed from the signed call operand, not an objdump label. This inventory does not rule out indirect calls. Inspection ends at these two generic wrappers; no upstream initializer handler was inspected.

The original checked wrapper subtracts eight from length at 37088 and advances the pointer at 37104 before its call at 37152. The unchecked wrapper performs the same operation at 19216/19232 before 19280. Both pass a stack-local slice at `r10 - 0xb0`. Candidate wrappers instead pass the full account slice; its named unchecked method loads the bump at account offset eight and builds its own local cursor. Neither original wrapper reads the residual input slice after the decoder returns. The mutable cursor is therefore internal to these observed calls, rather than an observed account-data mutation or an external parsing result.

## Allocation and field dataflow

Let `L` be the complete account length and `B = L - 8` after a successful discriminator-length check.

| Field path | Original guard on B | Candidate guard on L | Reviewed behavior |
| --- | --- | --- | --- |
| Minimum accepted allocation | B ≥ 2504 | L ≥ 2512 | Same threshold |
| Stable fee vector present | B ≥ 4065 | L > 4072 | Same threshold |
| Exotic fee fields present | B ≥ 4089 | L > 4096 | Same threshold |

Original reads the common 57-byte prefix at body offsets 0–56, then advances the input cursor by 57 before the first vector reader. Candidate reads that prefix at account offsets 8–64 and constructs its local cursor at account offset 65. Both therefore hand the first vector reader the same pointer and remaining length. The original repeats this common-prefix block in three allocation branches; candidate shares it and then conditionally reads the stable vector and exotic fields. The legacy and stable-only original branches store empty stable/default exotic fields where appropriate; the current source expresses those same defaults. These observations explain the allocation conventions without asserting a proof for every malformed vector, allocation failure or runtime execution.

The original helper writes directly to its mutable slice argument, including three successive eight-byte cursor advances for the full branch's exotic fields. Candidate's corresponding final reads are consolidated behind a 24-byte availability test and omit cursor stores that would be dead after returning. The original helper's shared externally supplied cursor and candidate's private local cursor are consistent with this difference in generated code. The machine code does not establish a unique Rust source spelling. In particular, changing the public trait implementation to consume its caller's slice would be an unsupported extrapolation from an internal original helper whose outer trait boundary is inlined.

## Errors, dependencies and remaining uncertainty

Four relevant direct callees have equal complete normalized bodies and relocation patterns: the vector reader (candidate 56024 / original 64680), Anchor conversion from ProgramError (599576 / 709368), Anchor conversion from I/O error (599736 / 709528), and Borsh's EOF adapter (649840 / 756288). This is a bounded direct-body check; their full transitive code/data closure is not proved here.

Short allocations and short/bad discriminators use the InvalidAccountData representation in both reviewed paths. Original field I/O failures call Anchor's I/O conversion directly. Candidate performs explicit `ProgramError::BorshIoError(e.to_string()).into()` and consequently retains formatting/drop code in its decoder. Frozen Anchor 0.31.1 `error.rs:305–308` routes I/O errors through `ProgramError::from`; the pinned Solana program-error 2.2.2 implementation at lines 377–380 constructs `BorshIoError(format!("{error}"))`. Both source expressions obtain the error text from Display; no different error class or required error-conversion fix was established. Full formatting/allocation equivalence remains outside this bounded comparison.

The Anchor trait text describes checked versus unchecked discriminator handling; it does not require a particular cursor postcondition. The frozen generic account wrapper owns a local slice and discards it after `try_deserialize`/`try_deserialize_unchecked`. Borsh's distinct `deserialize` trait does specify cursor advancement, and the current implementation honors that on its own local `data` cursor. Conflating these two trait contracts would produce an unjustified correction.

Previously published negative trials already tried separate allocation branches, shared helper callers, explicit final integer reads and changing `deserialize` to `deserialize_reader`. Their retained reports record no exact original decoder match; the last spelling change was whole-ELF identical to its prior trial. This review preserves those reports as historical evidence and does not rerun or promote any trial. The exact source organization that produces the original helper, cursor visibility and final inlining remains unresolved. The defensible outcome is to retain current source and these explicit limits, not to claim whole-function, transitive or full-executable equivalence.

Run `PYTHONDONTWRITEBYTECODE=1 python3 work/fees-decoder-contract-review/verify.py` for a read-only check of saved hashes, exact raw disassembly, all direct caller operands, the four callee comparisons, and the threshold arithmetic. The verifier executes no program instructions. Zero runtime cases and zero program-source changes were added.
