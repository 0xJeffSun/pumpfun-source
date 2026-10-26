# First-account boundary admission: original 71256 and candidate patterns 83152/83352/83552

This package addresses pass-36's own named next step for the Fees query parser: the unresolved
first owner/discriminator parser boundary. It reproduces and extends the bounded collection
evidence with independent byte reads through REA (Ghidra 12.1.4 raw-binary sessions), adding
exact call-site resolution for the three candidate patterns that pass-36 could not attribute.

## Inputs

- Captured original Fees payload `evidence/original/pump_fees/deployed.so`
  (948,944 bytes, SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`).
- Independent Linux current-source build from the upstream package
  `repro/pump_fees/linux-current-source-build` (863,800 bytes,
  SHA-256 `6c44d9f2ffe9b18c79a6344b256d8acd7a34c10e77b894c51f46512a447b8ce6`).
- Pass-36 owned collection manifest `118045a1` retained windows
  `original-518976-520760.bin` (raw `03dd4691…`) and
  `candidate-127336-129120.bin` (raw `492ae4b3…`); both re-hashed at extraction and matched.

## Findings

1. The original encoded boundary 71256 (`0x11658`) is not a free-standing entry: it is the
   `ldx r3, [r2+0]` continuation immediately after `call → exit` at file offset 71240
   (`0x11648`), where the `call` targets `0x102b1` (66,225). The pattern shape —
   `call → exit → ldx r3,[r2+0] → jeq r3,14 → mov r10,r2 → add r2,-16 …` — is byte-identical
   across all four sites; only the leading prelude and the call target differ.
2. Candidate patterns in the current build:
   - **83152** (`0x144d0`): two-instruction prelude (`stx r2…`/`mov r3,r2`) before the call at
     83168 targeting 0x12b51 (76,625).
   - **83352** (`0x14598`): same two-instruction prelude, call at 83368 targeting 0x12d78 (77,176).
   - **83552** (`0x14660`): bare `call` (no prelude) targeting 0x12e99 (77,465).
3. The shared continuation after the call/exit pair is
   `ldx r3,[r2+0] → jeq r3,<n> → mov r10,r2 → add r2,-16 → mov r17,r1 → mov r16? …` — the
   same instruction skeleton at all four sites. The original 71256 context and candidate A
   (83152) are byte-identical for the full observed tail including the `jeq r3,14` immediate.
   Candidate B (83352) shares the skeleton; candidate C (83552) differs only in the `jeq`
   immediate (`12` versus `14`). The sites additionally differ in what precedes the call:
   A and B carry a two-instruction `stx`/`mov` prelude that the original 71256 site and C
   lack.
4. The query parser window (127336..129120) is a different region: its own 13 CALL targets
   resolve to 0x1b735/0x1b8e0/0x1ba30/0x1bb1e/0x1dc38/0x30b68/0x30d9f/0x30ec5/0x31015/0x31df9/
   0x333cf/0x336fd/0x338ad — none overlap the 83152 cluster. The boundary 71256 belongs to a
   separate owner/discriminator admission, not to the 1784-byte query parser window.

## REA evidence

All binary reads and searches below were performed through REA MCP (Ghidra 12.1.4 headless,
raw-binary import, `architecture=x86_64`, `entry_point=0x0`), one session per binary. No
hand-decoded ad-hoc ELF reader was used for any read REA covers; the extraction of
pass-36 collection payload members used the repo's own `verify_stream.py`-compatible
`tarfile` reading (existing tooling, unchanged) and is not a binary read.

- `rea_binary_session` — session identity: REA server 6.8.0, server started
  2026-10-26T05:56:14.794Z; `open` state `false` before any open call.
- `open_binary(path=work/cand-fees-current.so, format=raw-binary, architecture=x86_64,
  entry_point=0x0)` — candidate binary bound, SHA-256 `6c44d9f2…` re-confirmed at open.
- `open_binary(path=evidence/original/pump_fees/deployed.so, format=raw-binary,
  architecture=x86_64, entry_point=0x0)` — original bound, SHA-256 `4f2955d0…` re-confirmed.
- `inspect_with_objdump(operation=file_headers, path=work/cand-fees-current.so)` —
  evidence `ev_6f9110a5…`: ELF64 little-endian, BFD architecture `UNKNOWN!` (machine 0x107 =
  sBPF), confirming the format REA's native providers reject for direct sBPF decoding.
- `inspect_with_objdump(operation=architectures)` — evidence `ev_3da08f6a…`: local objdump
  advertises no BFD BPF target; documents why byte-level comparison uses REA raw-binary reads.
- `read_bytes(address=0x14660, length=64)` on candidate — evidence `ev_3f1f2d01…`; bytes
  `8510000039e8ffff 9500000000000000 7923080000000000 55030c0000000000 …`: the bare
  `call`→`exit`→`ldx r3,[r2+0]` pattern at site 83552. Supports finding 3 (candidate C shape).
- `read_bytes(address=0x11648, length=48)` on original — evidence `ev_68d5ae20…`; bytes
  `8510000069ecffff 9500000000000000 7923080000000000 55030e0000000000 …`: the
  `call → exit → ldx r3,[r2+0]` sequence at 71240..71256. Supports finding 1 (boundary shape)
  and the continuation byte-identity claimed in finding 3.
- `search_bytes(pattern="07 04 00 00 30 00 00 00", bounds [0x0, 0xd2cd8))` on original —
  evidence `ev_49a86207…`, 26 matches at
  `0x1a8/0x258/0x310/0x3c8/0x10eb8/0x11408/0x114c0/0x11578/0x11630/0x116f8/0x117c0/0x11878/
  0x11930/0x119e8/0x11ab0/0x47788/0x4fc68/0x54b78/0x85bf0/0x86df8/0x87c78/0x88af8/0x8e290/
  0x8f390/0x90590/0xa4950`. Establishes the original site cluster that contains 71256
  (`0x11630` + 8 = the call at `0x11648`) and bounds how many original admission sites share
  the `add r4,48` prelude.

## Limits

- No call-target body inspection, no transitive callee following, no decompiler claims: the
  four `read_bytes`/`search_bytes` observations and the pass-36 retained raw windows are the
  complete admitted body evidence.
- Which of the three candidate admission sites the original 71256 maps to remains
  **unknown**. The prelude difference (sites A/B carry a two-instruction store/move prologue
  absent at C) is consistent with either direction: A/B could be textually-equal re-admissions
  of the same original caller in two current functions, or C could be the direct successor.
  Byte comparison alone does not attribute the original.
- sBPF-specific Ghidra processor module (`Ghidra/Processors/BPF`) was not used: REA's Ghidra
  bridge rejects machine-0x107 ELF directly and accepts only x86_64 raw-binary import, so all
  instruction reads here are raw bytes cross-checked against the pass-36 retained
  instruction lists, not Ghidra-decoded sBPF text.
- No target execution, no VM probe, no source patch, no whitelist addition. Original
  historical function extent remains unknown/inferred per pass-36.

Run `python3 -B verify.py` for manifest/hash/shape checks. Add `--repo /path/to/pumpfun-source`
to re-derive the byte contexts from the original and candidate files on disk. Neither mode
builds or executes the target.
