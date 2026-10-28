# Mayhem window 188864–190160 — static structural inventory (28 Oct 2026)

**Scope.** Analyst evidence only. This packet decodes one sBPF text window from
the *unmodified captured* Mayhem program and records its control flow, calls,
loaded constants and memory accesses. It does **not** rebuild source, compare
against any candidate, or claim byte or semantic identity. There is no SBF
toolchain in the environment this was produced in, so no `cargo build-sbf`
comparison was run. Treat every interpretation below as a hypothesis to be
checked by a real rebuild-and-compare on the canonical Linux v1.54 recipe.

## Target

| Field | Value |
| --- | --- |
| Binary | `evidence/original/mayhem/deployed.so` (`sha256 a87fa9f8…`, matches `capture.json` `payload_sha256`) |
| `.text` | file offset 288, 706,744 bytes |
| Window | text offset **188864–190160**, 1,296 bytes, 162 slots |
| Window bytes | `sha256 e0e2f20f8357fbd6…` (see `report.json`) |
| Selected disposition | `opaque_unassessed` / `ambiguous/unattributed` (per `repro/reconstruction-status-2026-10-26/functions.tsv`) |
| Decoded | 139 instructions, 37 basic blocks, 1 `exit`, 7 calls |

This window is referenced in the research cohort as the "quote-aware state /
reserve validation" body (`docs/MAYHEM-RECONSTRUCTION-PLAN.md`, step 2). The
observed operations do not obviously support that label (see Reading), so this
note keeps the objective byte coordinates as the identifier and treats the
cohort label as an open hypothesis.

## Reproduce

```sh
.venv/bin/python research/mayhem-o0095-static-analysis-20261028/analyze_window.py
```

Decoding follows the same rules as `scripts/sbpf_disassembly_inventory.py`
(ELF64 section parse; 8-byte instructions, `lddw` = 16; branch target
`pc+8+off*8`; relative call `pc+8+imm*8`; SHT_REL relocations mapped into
`.text`). The script enforces exact window coverage and `lddw` second-slot
validity as self-checks, so the recorded raw fields are faithful to the capture
regardless of mnemonic naming.

## Call graph (verified)

| Site (text off) | Kind | Target | Target window | Disposition | Candidate |
| ---: | --- | ---: | --- | --- | --- |
| 188976 | rel_call | 195768 | 190160–196056 | opaque_unassessed | — |
| 189168 | rel_call | 620424 | 620336–620616 | normalized_body_only | `BpfWriter::write_all` |
| 189344 | rel_call | 189872 | 188864–190160 | opaque_unassessed | — (in-window entry) |
| 189480 | rel_call | 195768 | 190160–196056 | opaque_unassessed | — |
| 189784 | rel_call | 673992 | 673976–674080 | raw_body_equal | `core::panicking::panic` |
| 189864 | rel_call | 673992 | 673976–674080 | raw_body_equal | `core::panicking::panic` |
| 189888 | rel_call | 537808 | 537584–537888 | normalized_body_only | `__rust_alloc_zeroed` |

## Findings (facts from the capture)

1. **The inferred window groups two call-connected routines.** The call at
   `@189344` targets `189872`, which begins `mov64 r6, r1` (a fresh entry).
   So `188864–190160` is a caller body `[188864, 189872)` plus an outlined
   callee `[189872, 190160)` (288 bytes) that allocates a zeroed buffer and
   panics. This is boundary evidence: a future per-function recovery should
   split this window at **189872**.

2. **Serialization + allocation.** The caller calls `BpfWriter::write_all`
   (`@189168`) and the inner callee calls `__rust_alloc_zeroed` (`@189888`).
   Together with the single `exit`, this is the shape of allocating a buffer
   and writing a serialized payload (Anchor account/event writeback), not a
   pure arithmetic validator.

3. **Two panic sites** (`@189784`, `@189864`) into `core::panicking::panic`,
   each preceded by `lddw` loads of `.rodata` pointers — formatted error/assert
   paths.

4. **Tight coupling to the next opaque body** `190160–196056`, called twice
   (`@188976`, `@189480`). Recovering this window and its neighbour are linked.

5. **Loaded constants** (`report.json → loaded_constants`):
   - A cluster of `.rodata` pointers in `0x000ad0xx` and `0x000b1xxx`
     (above `.text` end `≈0xaca58`) — string bytes and, at `0x000b1xxx`,
     fixed-size records consistent with `core::panic::Location` / `&str`
     (ptr,len) pairs for the error paths.
   - A recurring tail quartet of the form `(3 << 32) | x`
     (`0x0000000300000000`, `…00007fef`, `…00000007`, `…00007fed`) near the
     panic sites — consistent with packed line/column `Location` metadata or
     bounds constants. Not resolved here.
   - A candidate embedded multi-word constant at `@189184/189216/189240`
     (`8481abfe57889b06`, `35c01846637f68fb`, `553beb1adc39c4da`) stored to
     adjacent stack slots — possibly a Pubkey/discriminator being materialised.
     **Worth resolving against known Mayhem constants** before forming a source
     shape.

6. **Stack frame ≈ 248 bytes.** Input is read through `r1`/`r2` at small
   offsets (`ldxdw/ldxw [0]`); values are assembled into `r10`-relative slots
   (`stxdw` at −16 … −232), with one `stb [r_x+96]` writeback into a
   pointed-to struct.

## Reading (hypothesis — not verified)

The caller `[188864, 189872)` assembles a small structure on the stack, loads
error-message/`Location` rodata, and serializes a payload via
`BpfWriter::write_all`, delegating buffer allocation to the outlined callee at
`189872` and taking formatted panic paths on failure. This looks like an
**event-emit / account-writeback routine with error formatting**, calling the
adjacent opaque body `190160–196056` (twice) for the bulk of its logic.

This tension with the cohort's "quote-aware reserve validation" label is itself
a useful signal: either the label spans a wider region than this byte range, or
the range is mis-attributed. The objective coordinates and call graph above
stand regardless.

## Limitations

- Original-only. No candidate was built or compared; **no byte/normalized match
  is claimed or implied.** Disposition stays `opaque_unassessed`.
- The window boundary is inferred; this note adds evidence for an internal
  boundary at 189872 but does not re-cut the official inventory.
- Constant and `Location` interpretations are leads from byte patterns, not
  proofs. Syscall/relocation semantics are not resolved here.

## Suggested next steps (for a real recovery, on a Linux SBF host)

1. Split the window at 189872 and treat `[189872, 190160)` as an allocation
   helper when attributing bodies.
2. Resolve the `@189184…` embedded constant against known program keys /
   Anchor discriminators.
3. Map the twin-called body `190160–196056`; recover the two together.
4. Draft an Anchor serialize/writeback source shape and verify by
   `cargo build-sbf --tools-version v1.54` + `scripts/compare.py` against this
   exact window. Only a passing comparison changes the disposition.
