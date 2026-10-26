# Pump: classifying the remaining unmatched windows (layout vs logic)

Reframes the recovery frontier by measuring *why* each unmatched `.text` window
is unmatched. The committed counts are the author's measurement against the
Linux (WSL) workspace-member build from
[`../file-path-prefix-recovery`](../file-path-prefix-recovery/REPORT.md)
(538/1035 normalized). Of the 497 still unmatched:

| Category | Count | Body bytes | Meaning |
| --- | ---: | ---: | --- |
| `metadata_only` | **72** | 96,720 | Differs from the closest same-size reconstruction function only in store-immediate fields; for these 72 those fields are the Anchor error `Source { filename, line }` (one window also has a different error code, see below). |
| `body_diff` | 233 | — | Same size, genuinely different body — real logic/codegen recovery. |
| `no_same_size_candidate` | 192 | — | No reconstruction function of that size — missing, or compiled to a different size. |

## Method

For each unmatched original window, find the closest same-size function in the
unstripped reconstruction build (minimum normalized Hamming distance) and
compare normalized bytes (ELF relocations and direct-call immediates already
masked). A window is `metadata_only` iff **every** differing byte lies in the
immediate field of a `stw` (0x62) / `stdw` (0x7a) store-immediate instruction.
Anchor writes an error's `Source { filename, line }` with exactly those
instructions: `line!()` as a `u32`, and the `file!()` `&str` length as a `u64`
(the string pointer itself is relocation-masked). See
[`classify_frontier.py`](classify_frontier.py).

The opcode test alone is a heuristic, because any program constant can sit in
those immediate fields. Review therefore checked the 72 windows slot by slot.
Every differing `stw` is the `line!()` slot paired with a `file!()`-length
store (same base register, length slot + 8), and every differing `stdw` is a
file-length store. One window, `0x60260`, additionally differs in its program
error code (6025 vs 6109). So for 71 of the 72 the logic is byte-identical
and only the error origin differs; per-window detail is in
[`../metadata-callsite-map`](../metadata-callsite-map/REPORT.md).

All 72 have Hamming distance <= 3 (11 at 1, 9 at 2, 52 at 3), the shape of a
`line!()` difference (1–2 bytes) plus an optional filename-length byte. Two
were disassembled (and re-checked in review):

- `toggle_create_v2` (ham 1): `stw [r10-0xf8], 114` vs `144` — `line!()` only.
- `set_params::execute::{closure}` (ham 3): `stw` line `465` vs `22`
  (2 bytes) + `stdw` filename length `27` vs `31`.

## What this means for recovery effort

- **72 windows (about 96 KB of logic that already matches)** need no logic
  work, only the source *layout* the original compiler saw: each error site at
  its original file path **and** original line number. The file paths are known
  (they are embedded in the original); the lines require source laid out
  line-for-line like the original. A full flip needs both.
- **233 `body_diff`** are the true logic/codegen frontier — same function size,
  different body.
- **192 `no_same_size_candidate`** are the largest gaps. A missing size is not
  by itself proof of a missing source function; it can also be a function
  compiled to a different size.

So of the 497, only about 14% are "logic already correct, layout wrong"; the
remaining 86% (425 windows) need genuine function recovery. This bounds how far
source-layout fixes alone can go and points the hard work at the 425.

## Reproduce

```sh
python3 -B classify_frontier.py \
  --elf-reader repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/elf_reader.py \
  --original evidence/original/pump/deployed.so \
  --symbols <build>/target/sbf-solana-solana/release/pump_recovered.so \
  --catalog <score-dir>/pump-bodies.json --output <fresh>.json
```

`pump-bodies.json` comes from
[`../independent-head-reproduction/score_pump.py`](../independent-head-reproduction/score_pump.py)
run on the build from
[`../file-path-prefix-recovery/build_prefix.sh`](../file-path-prefix-recovery/build_prefix.sh).
The script refuses missing inputs or an existing output before it imports the
reader (`test_cli_inputs.py`). The reader is executable Python: use the
repository's copy shown above.

Review check: a macOS rebuild of the same source (canonical pipeline,
`cargo-build-sbf` 2.1.21, v1.44) scores 533/1035. This script classifies its
502 unmatched windows as 72 `metadata_only` (the identical list, offsets and
Hamming distances as the committed JSON), 192 `no_same_size_candidate`, and 238
`body_diff`. The 238 are the same 233 plus five 56-byte
`core::error::Error::type_id` windows whose 16-byte `TypeId` constants depend
on the build host (see the head-reproduction packet). The committed JSON is
unchanged.

## Scope

Read-only analysis. No bytes written, no source changed, no byte-identity
claim; normalized matching does not establish transitive behavior or final
link layout. The original report and script are preserved unchanged in
`history/`. These observations do not by themselves authorize forcing source
paths or lines, or promoting any source or artifact.
