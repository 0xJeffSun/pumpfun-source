# Authenticated Turbopack route graph

This packet is a deterministic static analysis of retained Pump.fun frontend evidence. It does not execute captured JavaScript and does not claim recovery of original TypeScript or runtime/API compatibility.

## Measured scope

- Analyzed code lines: 250325
- Unique factory content hashes: 909
- Provenance-qualified identities: 1425
- Authenticated captured JavaScript objects: 161
- Import boundaries: 8276
- Exact / ambiguous / unresolved: 3132 / 369 / 4775
- Exact cross-chunk edges: 2359
- Authenticated route captures: 8
- Internal / developer operations attributed: 250 / 36

## Reproduction

From `app/` run:

```sh
pnpm install --frozen-lockfile
pnpm graph:build
pnpm graph:verify
pnpm test:graph
```

The builder authenticates manifest hashes and byte lengths, decodes UTF-8 strictly, checks every recovered factory's UTF-16 half-open source range, parses factories without evaluating them, and publishes through a temporary directory. `MANIFEST.json` binds every generated record.

## Interpretation boundaries

`EXACT` means the selected captured chunk context has one supported target, or the selected corpus contains one target identity. `AMBIGUOUS` preserves multiple compatible variants. `UNRESOLVED` means no target is present in the selected authenticated corpus; it is not evidence that the original application failed to resolve it. Route attribution requires captured HTML to reference an authenticated asset that contains the factory. API attribution links existing ledgers to enclosing factory ranges and remains static evidence, not a live-service qualification. Exact captures were unavailable for `/profile/:id` and `/portfolio`; those entries are deliberately empty.
