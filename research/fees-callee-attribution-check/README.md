# Fees first-account callee-identity check (reconciling #42 layout with #74 callee)

This packet independently re-derives, from the pinned ELF bytes alone, the callee
claim of [PR #74](https://github.com/lalalune/pumpfun-source/pull/74)
(`research/fees-account-parser`, by shawkkkkk) and reconciles it with the merged
first-account-boundary report (#42): the two reports answer different questions and
do not conflict once each is read at its own site.

## What #42 and #74 each established

- **#42 (layout):** at the linux-current-source v144 candidate, the original
  boundary site and candidate A share the niche-constant Err construction
  (`lddw r1,0x8000000000000000` then `stx [r6],r1`), while B and C differ. The
  corrected shapes (superseding the earlier `stx [r6+0],r0` / `stw [r6+0x104],r2`
  wording, which misread two store-immediate opcodes):
  - **B stores `stdw [r6+0],0`** — opcode `0x7a`, a compile-time **immediate**
    dword zero, not the constructor's returned `r0`.
  - **C stores `stb [r6+260],2`** — opcode `0x72`, a store-immediate **byte** 2
    at offset `0x104` (260), not a 4-byte register store. An explicit
    1-byte discriminant/tag.
- **#74 (callee identity):** after masking CALL immediates all three candidate
  wrappers equal the original wrapper; their **encoded callees** distinguish
  them. Only the wrapper the candidate query's first CALL reaches (site 83,552,
  helper CALL target 26,680) has a callee carrying the `FeeConfig` account
  discriminator `8f3492bbdb7b4c9b` (lddw immediate at 27,320), as the original
  helper (CALL target 36,072, literal at 36,696) does. Candidate A (35,856) and
  B (30,752) helpers lack the literal.

## Reconciliation

Layout (#42) points at A; callee identity (#74) points at C. **Attribution
follows the callee.** The wrapper-level byte layout after masking CALL
immediates is identical across all three candidates, so layout alone cannot
identify which wrapper the candidate query actually calls. The encoded callee,
read with the corrected local-CALL arithmetic (`target = call + 8 + 8·imm32`,
per Anza `sbpf` `elf.rs`/`ebpf.rs`, the same fix #42's review applies), selects
candidate C unambiguously: it is the only candidate whose callee shares the
original's FeeConfig discriminator. The B/C Err-construction differences #42
records are real but describe *which* wrapper each candidate pairs with its
layout story, not which wrapper the original calls; #74's callee-identity
evidence resolves that question.

## Verification

```sh
python3 -B verify.py
```

Recomputes every claim from the three pinned inputs (hashes below), using only
the standard library and the repo's pinned `scripts/analyze.py` ELF layout
reader: query first-CALL targets, wrapper helper CALL targets, lddw
discriminator sites, and the corrected B/C store opcodes. Passes with
`python3 -I` from another cwd. No REA session, execution, or new claims about
parser equivalence; attribution evidence only.

Pins (sha256):

| Input | sha256 |
| --- | --- |
| `evidence/original/pump_fees/deployed.so` | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| `repro/pump_fees/sharing-authorize-main-v144/main/candidate.so` | `2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af` |
| `repro/pump_fees/linux-current-source-build/fees-current-linux-v144.so` | `6c44d9f2ffe9b18c79a6344b256d8acd7a34c10e77b894c51f46512a447b8ce6` |

`saved-raw-reads.json` records the raw bytes at each proof site (CALL immediates,
lddw discriminator loads, B/C store instructions) with the input hashes; the
checker re-derives every value from the binaries, so the JSON is a receipt, not
an input.

Credit: callee-identity observation and candidate-numbering scheme are from
PR #74 (shawkkkkk). The corrected CALL encoding and B/C store opcodes follow
the maintainer's review corrections on the merged boundary packet.
