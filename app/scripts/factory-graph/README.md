# Factory graph analyzer

This static analyzer ties recovered Turbopack factories back to authenticated capture objects, preserves factory variants, and builds deterministic route and API attribution reports. Captured JavaScript is parsed as inert text and is never evaluated.

## Commands

Run from `app/`:

```sh
pnpm graph:build
pnpm graph:verify
pnpm graph:summary
pnpm graph:route -- /go
pnpm graph:module -- 100281
pnpm graph:operations -- auth/admins
pnpm test:graph
```

`graph:build` transactionally replaces `research/turbopack-route-graph-20261028/`. `graph:verify` rejects missing, modified, extra, or symlinked generated records. Module lookup accepts an optional SHA-256 prefix and reports all matching identities so a colliding numeric ID cannot be presented as unique.

## Source authentication

For every recovered variant, the analyzer:

1. Requires the origin to exist in `evidence/web/manifest.json`.
2. rejects absolute paths, traversal, NUL bytes, and symlinks;
3. verifies captured byte length and SHA-256;
4. decodes UTF-8 with fatal error handling;
5. slices the decoded source using the recorded UTF-16 half-open offsets; and
6. verifies the factory content hash before parsing the formatted recovery.

The line census uses Babel token locations. It counts code lines once per unique factory content hash and excludes the recovery banner, blank lines, comment-only lines, and duplicate variants.

## Resolution model

Graph identity includes numeric module ID, factory hash, captured object, source range, and chunk URL. Calls through the actual top-level factory runtime parameter are recognized structurally:

- `runtime.i(literal)` is a direct import boundary.
- `runtime.A(literal)` is a dynamic import boundary.
- `runtime.s(...)` supplies observed export names.

An import is exact only when chunk context or the selected corpus leaves one identity. Multiple compatible identities remain `AMBIGUOUS`; missing selected targets remain `UNRESOLVED`; string runtime boundaries are `EXTERNAL`. The analyzer does not guess among collisions.

Route attribution requires an authenticated route HTML record to reference an authenticated captured JavaScript asset. Reachability then follows exact graph edges only. Static API attribution maps the repository's existing internal and developer ledgers into enclosing authenticated factory ranges. It does not claim endpoint reachability, authentication, or live compatibility.

## Reproducibility and limits

Outputs use stable ordering, deterministic JSON, deterministic gzip headers, and a content manifest. Publication happens in a temporary sibling directory and is renamed only after every output is written. On the reference macOS run, a complete build took 4.66 seconds and `/usr/bin/time -l` reported 615,972,864 bytes maximum resident size. The checked-in packet records no timestamps or machine-specific measurements, so repeat builds are byte-identical.

The selected corpus deliberately targets approximately 250,000 authenticated code lines rather than the entire recovered inventory. An unresolved edge may simply lead outside that selection. Exact route captures were not retained for `/profile/:id` or `/portfolio`; their reports fail closed with no attributed nodes. This is dependency evidence, not recovered original TypeScript and not proof of runtime behavior.
