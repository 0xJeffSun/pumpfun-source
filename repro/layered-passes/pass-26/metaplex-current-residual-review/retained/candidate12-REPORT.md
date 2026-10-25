# Independent review of Metaplex Utilize candidate 12

**Candidate12 does not achieve the predicted 1,479-byte repair and must not replace accepted candidate11.** Its compiled binary has196,601 differing payload positions versus candidate11's1,509. The new evidence nevertheless narrows the exact executable discrepancy: target and candidate12 differ by one complementary branch plus one extra unconditional jump, with the resulting8-byte address shifts. Every other instruction across the entire `.text` maps field-for-field after accounting for those shifts. This is explanatory static alignment, not byte equality.

No executable bytes were modified, no source was built or changed, and no VM/transaction was executed in this review. Every offset below is a **file byte offset**, not the misleading section-relative label printed by some versions of llvm-objdump. Disassembly is supplementary; the proof recomputes opcode/register/offset/immediate fields directly from captured bytes.

## Three-artifact comparison

| Artifact | Raw ELF bytes | SHA-256 | Zero-extended payload differences |
|---|---:|---|---:|
| Captured target allocation |793,991|`31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`|0|
| Accepted candidate11 |707,448|`3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec`|1,509|
| Experimental candidate12 |707,448|`4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf`|196,601|

The target's retained86,543-byte allocation tail is all-zero. Candidate12's padded hash is `de3ebb1dd993e3aa80ec143e37bb7fa3ac0a197976ac26b555c322c0d0d5670f`; first differing position24 is the ELF entry point. `.text` grows from628,040 to628,048 bytes. This consumes the prior8-byte gap before `.rodata`; the total ELF size, `.rodata` offset and subsequent section offsets do not move.

Raw differences by original section:

| Section | Candidate11 | Candidate12 |
|---|---:|---:|
| `.text` |1,477|194,923|
| `.rodata` |0|0|
| `.data.rel.ro` |30|171|
| `.dynsym` |0|3|
| `.rel.dyn` |2|1,498|

Additional candidate12 ELF header/section-header differences account for six positions; they are recorded through exact whole-file comparison. The larger count is principally the8-byte instruction shift, not evidence of196,601 newly missing or semantically changed source bytes.

## Complete Utilize body and boundary evidence

Original and candidate11 inferred entry-bounded window: `[236632,241736)`,5,104 bytes,638 slots,626 instructions,51 direct calls and91 branches. Candidate12: `[236632,241744)`,5,112 bytes,639 slots,627 instructions,51 direct calls and92 branches. All1,251 inferred function entries correspond under the measured address map. Existing external calls identify the same Utilize entry and next entry; these are call-derived bounds, not recovered historical debug symbols.

Body hashes:

- Target: `0b57c8b38b3b6395fe223e99d29c48258f481d496491cb13b7abe065a49fb70d`.
- Candidate11: `e4c0a6ac6741fdcdafb381eeff0f1626bf9a0ae8f650c8b44beb1176c69ca4d5`.
- Candidate12: `47d1a9032aabbfb551fa930a84a1b7e40ae1f28f632828c2fc3827dec477fe3b`.

`complete-body-decode.json` contains all three complete bodies, including raw bytes, decoded operands, signed branch targets, direct-call targets and attached loader relocations. Full disassemblies are also saved.

## Exact remaining instruction difference

`r9` holds `number_of_uses`, `r1` is loaded from the total-use slot, and `r7` from remaining uses. The earlier zero and over-total guards are retained on both sides.

| File offset | Target | Candidate12 |
|---|---|---|
|238800 (`0x3a4d0`)|`r9 == 0` →238840 error|`r9 == 0` →238848 error|
|238816 (`0x3a4e0`)|`r9 > r1` →238840 error|`r9 > r1` →238848 error|
|238832 (`0x3a4f0`)|`3d97070000000000`: `r7 >= r9` →238896 success|`2d79010000000000`: `r9 > r7` →238848 error|
|238840|error86 load starts|extra `0500070000000000`: unconditional jump →238904 success|

On failure, both load `86 <<32`, store the same error, call the same cleanup body at12448, and jump to the same shared cleanup continuation at237920. On success, the same preparatory stores and `r1 = r7; r1 -= r9` follow, displaced by8 bytes in candidate12. Original success subtraction is at238936; candidate12 at238944. The complete-body comparison finds no other changed instruction after address correspondence, including cleanup, delegated-use handling, serialization and burn continuation.

The positive unsigned comparison and its complementary greater-than test choose the same error/success edges. The extra JA is still an observable generated instruction: it changes instruction count, possible compute consumption and every affected relative encoding. Algebraic branch equivalence does not satisfy the user's byte-identity requirement.

## Whole-text, calls and data/relocation proof

The measured map is `f(a)=a+8` for original text addresses in `[238840,628328)`, identity otherwise. `analyze.py` compares every original decoded instruction with the candidate instruction at `f(a)`. It preserves opcode, registers, constants, memory displacements and wide-immediate values, except:

- Internal-call destinations and branch targets must equal the mapped original target.
- A loader-relocated text-address immediate may equal its mapped original address; arbitrary constants are never masked.
- Loader relocation type and dynamic symbol must remain identical.

The comparison returns **one** changed original instruction (the branch above) and **one** inserted candidate instruction (the JA above). It does not rewrite, reorder, normalize or save a synthesized executable. All51 Utilize call targets match as a multiset under the measured map, and their aligned call sites/destinations are individually checked by the whole-text comparison.

All2,749 loader relocation entries correspond exactly after mapping affected text relocation locations. All132 changed `.data.rel.ro` pointer slots are shifted text pointers and agree with the same map. The30 remaining coordinate bytes are exactly unchanged from candidate11. Thus the old diagnostic-source residual remains; candidate12 does not solve it. `.rodata` is raw-identical. The entry point and all inferred function entries map as expected.

This proof shows that candidate12's failed byte comparison is now attributable to this precise compiler control-flow spelling and address propagation, plus the existing diagnostic coordinates. It does not authenticate a historical source spelling, prove unobserved behavioral cases or authorize modifying the executable to remove the jump.

## Single candidate13 source hypothesis reviewed

The parent proposed preserving the initial zero/total guard and replacing only the following `checked_sub(number_of_uses).ok_or(NotEnoughUses)?` with:

```rust
let remaining_uses = if metadata_uses.remaining >= number_of_uses {
    metadata_uses.remaining - number_of_uses
} else {
    return Err(MetadataError::NotEnoughUses.into());
};
```

**This is a justified single source experiment**, not an accepted fix or promise of exact code generation. It expresses the target's positive JGE and dominated subtraction directly; all other source order remains intact. On all unsigned64-bit triples `(number_of_uses,remaining,total)`, both forms reject zero/over-total first, then reject iff remaining<requested; success produces the same subtraction. The comparison dominates `-`, so no underflow is possible even with overflow checking enabled. `metadata.uses` assignment and all later effects remain after success. The bound error conversion is `ProgramError::Custom(e as u32)`; explicit `.into()` and the prior `?` conversion produce the same error86 without a new side effect.

`prove_guard.py` and `guard-equivalence.smt2` encode the all-u64 guard disagreement and underflow counterexample query. Z3 4.15.4 returned **unsat**, as did the complementary-branch query. This is a local arithmetic/control proof, not compiled SBF identity or full instruction equivalence. The reviewed fragment is saved in `guard13.fragment.rs`; no shared source was edited. One pinned build is required to determine whether the compiler emits the target's single JGE rather than a JGT/JA pair. It is possible that the new source produces further codegen changes; reject it if measured identity worsens.

## Portable verification

`python <review-folder>/verify.py` checks all saved files and external input hashes, recomputes the complete three-artifact decode, full-text comparison, call/relocation/pointer correspondence, exact remaining guard/JA bytes and whole-payload difference counts. It requires only Python's standard library and the hash-bound target/candidate11 repository files. The saved solver transcript and SMT2 are hash-bound; independently rerun the solver with `z3 guard-equivalence.smt2` or `python prove_guard.py` if Z3 is installed. No compiler, SBF execution or network is required for static verification.
