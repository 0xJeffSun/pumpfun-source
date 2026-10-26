# Retained frontier-classification author snapshot

The unchanged author JSON classifies497 unmatched windows as72
`metadata_only`,233 `body_diff` and192 `no_same_size_candidate`. These are
reported observations from an unbundled workspace-member build, not verified
measurements of the current selected candidate. The historical 538/1035 score
and nearest-function correspondence are not independently reproduced here.

`metadata_only` means the script found differences confined to immediate bytes
of store instructions with opcodes0x62/0x7a. Arbitrary program values can occupy
those fields. This heuristic does not establish correct body logic or identify
`file!()`/`line!()`. Normalized comparison also masks relocation/call fields,
so transitive behavior and linked byte identity remain unknown.

## Preserved evidence and replay requirements

`history/REPORT.md` and `history/classify_frontier.py` retain the original report and script
unchanged. The published JSON remains byte-for-byte unchanged. No original body
was read/decoded during this review, no native package was imported, and no
build, VM probe or target execution occurred. Completion remains0/4.

The exact source commit, build hashes, original/catalog hashes and reader used
by the author are not bundled. The old script depended on private work paths
and an incorrect inferred repository root. The revised script requires every
input explicitly and rejects missing files/existing outputs before importing
a reader. An intentional future replay uses:

```sh
python3 -B classify_frontier.py --elf-reader /path/to/elf_reader.py \
  --original /path/to/original.so --symbols /path/to/symbols.so \
  --catalog /path/to/pump-bodies.json --output /existing/parent/new-result.json
```

Authenticate and record all four inputs and their common build/scorer
provenance before interpreting results. The supplied reader is executable
Python and must be reviewed separately. This command inspects the original
only on deliberate invocation; it was not run for this review. It writes a
fresh result rather than replacing this historical JSON.

The retained observations do not authorize forced source paths/lines, new
original-body research, source/artifact promotion or identity completion.
