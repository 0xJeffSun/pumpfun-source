# Independent sBPF disassembly cross-check

Independent, dependency-free reverse-engineering of the local Solana binaries in
`lalalune/pumpfun-source`, with a focus on re-deriving the Associated-Token-Account
(ATA) `reserve_for_push` ordering finding from first principles.

Nothing here claims byte identity or modifies any binary. It adds independent
evidence using a second, from-scratch toolchain and validates that toolchain
against the mainstream engine (Ghidra).

## Why a new tool

The requested RE front-end (REA 6.4.0) refuses these files. Its ELF admission
(`rea/src/domain/binaryTarget.ts`, `elfArchitecture`) accepts only machines
3/62/8/40/183 (x86, x86_64, MIPS, ARM, ARM64). Solana programs are:

- **EM_BPF (247)** — the dependency programs (SPL Token, ATA, Metaplex, …)
- **EM_SBF (263)** — the four core programs (pump, pump_amm, pump_fees, mayhem)

REA rejects both before any provider runs, so "open it in REA" is not possible
on this target without modifying REA itself. The engine REA wraps (Ghidra) *does*
handle these via its stock `eBPF:LE:64` processor, and the sBPF instruction set
is simple enough to decode directly. So this toolkit:

- `sbpf.py` — a from-scratch ELF reader + sBPF disassembler.
- `verify_ata_order.py` — the ATA ordering cross-check.
- `inventory.py` — a function/instruction inventory over every local binary.
- `ghidra_scripts/DumpText.java` — a read-only Ghidra post-script used as an
  independent oracle.

## Headline result: the ATA residual, re-derived independently

The repo's conclusion is that its closest ATA candidate differs from the deployed
binary only by the **order** of two `RawVec::reserve_for_push` monomorphizations
(element types `u8` and `AccountMeta`), fixed by Rust's `-C metadata` hash.

Using only the local `evidence/dependencies/associated_token/deployed.so`
(105,032 B, sha256 `6804554e…`) and our own decoder, we independently confirm:

| window | .text file offset | size | insns | our raw sha256 | matches recorded witness |
|---|---|---|---|---|---|
| AccountMeta | 28592–29032 | 440 B | 55 | `8e46c99e…` | yes |
| u8 | 29032–29384 | 352 B | 44 | `37b37fdc…` | yes |

- **Call-immediate-masked** hashes also match (`dc100a37…`, `170c4b5d…`),
  independently reproducing the repo's body-normalization (zeroing the 4-byte
  immediate of every `0x85` CALL).
- The **element width is recovered from the code, not from symbol names**: the
  AccountMeta body uses the immediate `34` twice (`repr(C)` `Pubkey + 2 bools`);
  the u8 body never does. This independently corroborates the type attribution.
- **Order in the deployed binary: AccountMeta (28592) then u8 (29032).** The
  closest candidate (`ba8dd8a4…`) swaps them; the first whole-file difference is
  at offset ~28601, inside the first window — matching the README's 307
  differing positions.

**Oracle validation.** Ghidra 12.1.4's eBPF processor, run headless on the same
binary, decodes these windows as **55 and 44 instructions with zero
address-stream mismatches** against our decoder, and identical operands
(`mov r6,r1` / `add r1,1` / `jgt r2,r1,→0x6fe0` …). Our tool agrees with the
mainstream engine.

**What this means.** The ordering is a compiler monomorphization artifact driven
by the `-C metadata` hash of the *original build's* Cargo unit graph. It is not
present as a symbol or metadata record in the stripped binary and is not
reproducible without those historical build inputs. This cross-check strengthens
the evidence for *why* ATA cannot be made identical; it does not reduce the 307
differing positions.

## Local binary inventory

From `inventory.py` (linear decode; `fns~` = heuristic function count from local
call targets + entry). Ghidra reachable-instruction counts are shown where run.

| binary | machine | file B | .text B | insns (linear) | fns~ | local calls | syscalls |
|---|---|---|---|---|---|---|---|
| pump | EM_SBF 263 | 10,485,715 | 1,792,208 | 215,873 | 1,170 | 10,861 | 144 |
| pump_amm | EM_SBF 263 | 10,485,715 | 1,162,040 | 139,524 | 832 | 7,397 | 123 |
| pump_fees | EM_SBF 263 | 948,944 | 799,648 | 96,083 | 638 | 4,741 | 121 |
| mayhem | EM_SBF 263 | 777,408 | 706,744 | 83,947 | 503 | 4,902 | 93 |
| spl_token | EM_SBF 263 | 108,600 | 102,608 | 12,061 | 46 | 158 | 8 |
| spl_token_2022 | EM_SBF 263 | 1,382,016 | 531,640 | 64,164 | 681 | 3,224 | 74 |
| associated_token | EM_BPF 247 | 105,032 | 92,056 | 11,219 | 240 | 696 | 35 |
| token_metadata | EM_BPF 247 | 793,991 | 628,040 | 76,037 | 1,457 | 6,036 | 81 |
| donation_relay | EM_SBF 263 | 830,448 | 752,488 | 89,394 | 512 | 4,419 | 89 |

- Ghidra headless (eBPF processor) opened `associated_token` (247) → 6,552
  reachable instructions and `pump_fees` (263, processor forced) → 90,081. Both
  machine types import cleanly.

## Byte-identity status (honest)

Full byte-identity is **not reachable** here, consistent with the repo's own
exhaustive evidence:

- **pump / pump_amm / pump_fees / mayhem** — no public source; reconstructed
  handler-by-handler. Not byte-identical (pump differs at ~9.78M positions).
- **ATA** — 307 bytes, the monomorphization order above; needs the original
  build's unit-graph inputs. Builds 1–5 exhausted.
- **token_metadata (Metaplex)** — 1,509 bytes, confined to one function
  (`Utilize`) plus 29 Rust source-coordinate records; needs the exact non-public
  source revision. Candidates 1–14 did not close it.
- **spl_token** — already a whole-file exact rebuild (the 1/5 success).

The repo additionally forbids the only shortcuts that would force identity
(flag/path brute-force, binary patching). This cross-check respects that: it only
reads and decodes.

## Reproduce

```bash
cd sbpf-toolkit
python3 verify_ata_order.py     # independent ATA ordering check (+ hash asserts)
python3 inventory.py            # inventory over all local binaries

# Optional Ghidra oracle (needs GHIDRA_INSTALL_DIR + JDK 21):
export JAVA_HOME=/path/to/jdk-21 GHIDRA_HEADLESS_MAXMEM=8G
GHIDRA/support/analyzeHeadless /tmp/p ata -import evidence/.../deployed.so \
  -processor eBPF:LE:64:default -loader ElfLoader -loader-applyRelocations false \
  -scriptPath sbpf-toolkit/ghidra_scripts -postScript DumpText.java -deleteProject
```

Inputs are read-only. `verify_ata_order.py` exits non-zero if any window hash or
the deployed order fails to match.
