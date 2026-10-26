# Retained metadata-callsite-map author snapshot

The unchanged author JSON contains72 heuristic original-file/line rows. The
author reported a56/16/0 split for both/line-only/filename-only differences, but
the saved rows do not retain the candidate-origin or difference-subset fields
needed to verify that split. No rename experiment is retained. The earlier
claim that a module reorganization flips zero windows or regresses16 windows
is therefore an unverified author hypothesis, not an established result.

The extractor guesses a filename from a preceding pointer/store pattern and a
line from the first small store immediate. A small immediate can be ordinary
program data, and proximity does not establish call-site origin. These fields
must remain heuristic suggestions, not exact recovered source coordinates.
The revised filter requires differences in the store immediate bytes, matching
the stricter classification definition; retained JSON has not been regenerated.

## Preserved evidence and replay requirements

`history/REPORT.md` and `history/meta_map.py` retain the original report and script
unchanged. The published JSON remains byte-for-byte unchanged. No original body
was read/decoded during this review, no native package was imported, and no
build, VM probe or target execution occurred. Completion remains0/4.

The exact source commit, build hashes, original/catalog hashes and reader used
by the author are not bundled. The old script depended on private work paths
and an incorrect inferred repository root. The revised script requires every
input explicitly and rejects missing files/existing outputs before importing
a reader. An intentional future replay uses:

```sh
python3 -B meta_map.py --elf-reader /path/to/elf_reader.py \
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
