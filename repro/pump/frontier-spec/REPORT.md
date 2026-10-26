# Retained frontier-spec author snapshot

The unchanged author JSON lists497 unmatched windows, reporting72 metadata
candidates,233 differing bodies and192 without a same-size candidate. Its
23/40/170 near/mid/far counts and symbol/origin lists are an author-reported
snapshot of an unbundled build/catalog, not current verified measurements.

The metadata category is a store-immediate similarity heuristic. The revised
classifier requires differences inside bytes4–7 of store instructions,
consistent with the stricter classification packet; previously it accepted any
byte in an instruction whose original opcode was a store. Retained JSON has
not been regenerated and is not asserted to match the revised script.

Filename/line fields are guesses from pointer proximity and the first small
store immediate. They do not prove source locations, call-site identity, body
semantics, dependency provenance or whole byte equality. Near or same-size
candidate selection alone does not attribute an original function.

## Preserved evidence and replay requirements

`history/REPORT.md` and `history/frontier_spec.py` retain the original report and script
unchanged. The published JSON remains byte-for-byte unchanged. No original body
was read/decoded during this review, no native package was imported, and no
build, VM probe or target execution occurred. Completion remains0/4.

The exact source commit, build hashes, original/catalog hashes and reader used
by the author are not bundled. The old script depended on private work paths
and an incorrect inferred repository root. The revised script requires every
input explicitly and rejects missing files/existing outputs before importing
a reader. An intentional future replay uses:

```sh
python3 -B frontier_spec.py --elf-reader /path/to/elf_reader.py \
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
