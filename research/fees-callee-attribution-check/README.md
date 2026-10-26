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
discriminator sites, and the corrected B/C store opcodes. It also re-checks
every saved REA receipt: each names a provider, a pinned subject digest, an
address and a length, and the bytes must match what that binary holds there.
Passes with `python3 -I` from another cwd. No execution, and no new claim
about parser equivalence; attribution evidence only.

## REA evidence

All binary bytes below were read through REA MCP (Ghidra 12.1.4 headless,
raw-binary import, `architecture=x86_64`, `entry_point=0x0`), one session per
binary, each read against the binary that owns the site.

| evidence_id | binary | read | shows |
| --- | --- | --- | --- |
| `ev_2e9537ce…` | original | `0x7eb70` 8B | query first CALL, imm −55972 |
| `ev_d3f0afd3…` | original | `0x11710` 8B | wrapper helper CALL → 36,072 |
| `ev_fbd3391a…` | original | `0x8ce8` 16B | original helper entry |
| `ev_7287fd7b…` | original | `0x8f58` 16B | FeeConfig discriminator lddw at 36,696 |
| `ev_d7278a47…` | original | `0x11648` 32B | original boundary site + fallthrough |
| `ev_8a53568f…` | candidate | `0x1f198` 8B | query first CALL, imm −5480 |
| `ev_411683f8…` | candidate | `0x144d0` 208B | wrapper A whole region |
| `ev_65d40552…` | candidate | `0x14508` 8B | wrapper A error-path CALL |
| `ev_0733f6d8…` | candidate | `0x14588` 8B | wrapper A helper CALL → 35,856 |
| `ev_01db52bf…` | candidate | `0x145d0` 8B | wrapper B error-path CALL |
| `ev_b3852530…` | candidate | `0x14650` 8B | wrapper B helper CALL → 30,752 |
| `ev_dfc7cd50…` | candidate | `0x14698` 8B | wrapper C error-path CALL |
| `ev_058da4b5…` | candidate | `0x14718` 8B | wrapper C helper CALL → 26,680 |
| `ev_29133724…` | candidate | `0x8c10` 32B | helper A entry, no discriminator lddw |
| `ev_8c2de45e…` | candidate | `0x7820` 32B | helper B entry, no discriminator lddw |
| `ev_0d28b400…` | candidate | `0x6838` 32B | helper C entry |
| `ev_259a5be2…` | candidate | `0x6ab8` 16B | FeeConfig discriminator lddw at 27,320 |
| `ev_3f60b3c4…` | linux-v144 | `0x14618` 8B | `7a06000000000000` = `stdw [r6+0],0` |
| `ev_3863850f…` | linux-v144 | `0x146d0` 8B | `7206040102000000` = `stb [r6+260],2` |

Full receipts, with parameters and subject digests, are in `rea-evidence/`.
Raw instruction decoding at these sites is unavailable in this provider build
(`inspect_native_instruction` reports `undecodable`/`data` for raw-binary
imports), so `verify.py` derives the encodings from the same bytes; the
opcode/mnemonic reading is asserted in the checker, not taken on trust.


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
