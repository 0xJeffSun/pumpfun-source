# sbpf round-trip test: can an sBPF assembler re-emit a byte-identical LLVM program?

_2026-10-25. Question (from the user): the ATA reconstruction is size-exact (105,032 B) but
differs from the deployed original by ~1,506 scattered bytes (relocation drift). Could an sBPF
**assembler** like `blueshift-gg/sbpf` re-emit the program byte-identically from its disassembly,
sidestepping the LLVM/linker toolchain?_

**Short answer: No.** sbpf writes its own ELF container with its own minimal linker. Its default
mode isn't even the same ABI (SBPFv3, section-less). Its `--arch v0` mode emits the same ABI
*family* as LLVM (DYN/EM_BPF, sections, `.dynamic`, `.rel.dyn`, page-aligned LOADs) but the
container still diverges field-by-field. Opcodes can match; the container cannot. And re-assembling
the original's own disassembly would be **copying the artifact, not reconstructing source**.

## Tooling
`blueshift-gg/sbpf` @ `a161bf149e2265b2db79a443afc5c42fcfacc0a0` (crate v0.3.2), built in an
isolated scratch dir with `cargo build --release --bin sbpf` (pure-Rust assembler + its own ELF
writer; no LLVM/lld). Sample via `sbpf init demo` → `sbpf build` (v3, 232 B) and
`sbpf build --arch v0` (v0, 1,160 B). ELF inspection via platform-tools `llvm-readelf`/`llvm-objdump`.

## The ATA original container (target), 105,032 B, built by rustc/LLVM/lld
`Type DYN · Machine EM_BPF (0x00f7 = 247) · Flags 0x0 (SBPFv1) · Entry 0x54c8 · 4 phdrs · 9 sections`
Sections: `.text`(Al 8), `.rodata`(AM, Al 8), `.data.rel.ro`(0x520), `.dynamic`(11 entries),
`.dynsym`(12 symbols), `.dynstr`, `.rel.dyn`(346 REL, 231 R_BPF_64_RELATIVE), `.shstrtab`. It is a
fully dynamically-linked PIC object: `.text` holds link-time addresses patched at load via
`.rel.dyn`. ~59% of the file is alignment/structure zero-padding — which is why "size-exact but
~1,506 bytes different" is even possible: the drift is relocation/padding drift *inside* the fixed
LLVM container.

### e_machine correction (note for the broader reports)
The deployed **ATA is `e_machine` 247 (EM_BPF)**, not 263 — verified by raw header + `llvm-readelf`.
It was built with the old `build-bpf` toolchain (rust 1.59, Solana 1.10.x era). The **263 / EM_SBF**
finding is correct for the **four core programs** (verified: `evidence/original/pump` = 263); it does
not apply to the old-toolchain dependencies. This does not change any conclusion — it refines the
per-artifact toolchain record.

## sbpf output vs LLVM (measured)
| field | ATA (LLVM/lld) | sbpf v3 default | sbpf v0 (closest) |
|---|---|---|---|
| size | 105032 | 232 | 1160 |
| e_flags | 0x0 (v1) | 0x3 (v3) | 0x0 |
| e_entry | 0x54c8 | 0x1_0000_0000 | 0xe8 |
| e_shnum | 9 | 0 | 8 |
| e_shstrndx | 8 | 0 | 7 |
| phdrs | 4 | 2 | 3 |

- **v3 (default):** `e_flags=0x3`, code based at the 4 GiB SBPFv2 window, **0 sections**, no
  dynamic-linking metadata — a different ABI entirely.
- **v0 (closest):** same ABI *family* as LLVM, but still not byte-identical: 8 vs 9 sections (no
  `.data.rel.ro`), section-string table named **`.s`** not `.shstrtab`, `.text` `Al 4` vs `8`,
  3 vs 4 phdrs with different segment grouping, entry at `.text` start vs `0x54c8` (sbpf can't
  reproduce lld's function ordering), 3 vs 12 dynsyms, a minimal reloc set.

## Answers
- **Does sbpf emit the same container as LLVM?** No — v3 is a stripped section-less blob; v0 is the
  right family but diverges in `e_flags`/`e_entry`/`e_shoff`/`e_phnum`/`e_shnum`/`e_shstrndx`,
  section naming/count/alignment, segment grouping, and the symbol/reloc set.
- **Could the ATA's disassembly be fed into sbpf for a byte-identical 105,032 B `.so`?** No. (1) The
  container is written by sbpf's own linker, not lld. (2) The ATA is PIC — address-bearing `.text`
  immediates are link-time values patched by `.rel.dyn`; sbpf resolves addresses statically, so even
  the instruction bytes differ. (3) sbpf can't reproduce LLVM's function ordering, `.data.rel.ro`,
  exact `.dynsym`, merge flags, or lld padding. (4) Methodologically, re-assembling the original's
  own disassembly is transcribing the artifact, not recovering source — a match would validate a
  copier, not a reconstruction. The byte-identical exercise exists to validate reconstructed *source*
  through the *same* LLVM toolchain; sbpf is neither.

**Bottom line:** the sBPF ISA (opcodes) round-trips; the LLVM container does not. The ATA's ~1,506-byte
drift lives *inside* the correct lld container — sbpf cannot produce that container, so it cannot
close or even meaningfully attack the gap.
