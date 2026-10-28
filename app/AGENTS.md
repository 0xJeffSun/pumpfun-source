# Agent handoff: application reconstruction

Read `PRD.md`, `README.md`, `contracts/coverage.json`, `contracts/routes.json`, and `evidence/validation.json` before changing implementation.

## Boundaries

- Work in this `/app` tree. The repository's Rust source and existing dirty files belong to separate work.
- Target backend behavior, not original backend source identity. The original source, database engine and hosting topology are unknown unless new evidence establishes them.
- Excluded product surfaces: support, Padre terminal, mobile app/app promotion, individual coin/token detail and `$PUMP` token pages. Keep their dependencies and API evidence catalogued; do not implement them without a scope change. `/create` remains in scope.
- Perps and external microsites are deferred, with their integration boundaries documented. Do not silently expand scope to their full applications.
- Never treat static string presence, a stub response, a local test or one fixture as 100% API compatibility.
- Do not execute captured bundles during analysis. Use AST extraction; recovered factories depend on the original runtime/import IDs and cannot be imported as app source.
- `evidence/` is an immutable checkpoint except an explicit refresh. Preserve URL, timestamp, hash and deployment context when adding a new capture. Capture public data or use an authorized test account; don't probe admin routes or send mutations to production merely because a bundle names them.
- Do not put credentials in browser code, fixtures or committed evidence. Do not enable live trades or wallet signing implicitly.
- SDK `src/` bytes must remain equal to the npm archive until an intentional source-change task. Preserve both root and `/swap` API surfaces.

## Work units

1. Bind a feature to `contracts/routes.json` and its source factory IDs in `recovered/modules.json`.
2. Trace imports (`e.i`, `e.A`) to other captured factory variants; keep ambiguous mappings explicit.
3. Identify the service origin and method/path/query/body/auth schema. Literal route candidates alone are insufficient.
4. Add sanitized request/response or WebSocket fixtures, with their provenance and dynamic-field normalization policy. Keep body, headers, errors, pagination and auth behavior.
5. Implement in `packages/backend/src/` or `packages/frontend/src/`; update the coverage ledger with evidence and checks.
6. Run `pnpm build && pnpm test && pnpm typecheck && pnpm verify:evidence` from `/app`.
7. For UI work, capture desktop/mobile reference and local screenshots in the same viewport and state. Record differences; build success does not establish visual parity.

Use `501 COMPATIBILITY_NOT_IMPLEMENTED` for unknown local behavior. Keep fixture mode separate from future native mode. Any production proxy must be explicit and must never count as a reconstructed backend.

## Useful inputs

- `contracts/developer.openapi.json`: public developer API only (different from website APIs).
- `contracts/internal-operations.json`: strict static operation candidates; includes out-of-scope and privileged endpoints. No automatic probing.
- `contracts/internal-route-candidates.json`: broader regex leads, including prose false positives.
- `evidence/web/library-fingerprints.json`, `dependency-paths.json`, `hosts.json`: package/service discovery leads.
- `evidence/web/manifest.json`: original bytes and URL/hash mapping; retained response headers include CSP.
- `recovered/modules.json`: factory IDs, variants, ranges and source files. Ranges are UTF-16 code-unit offsets in decoded source, not byte offsets.
- `scripts/inventory.mjs`: reproducible extraction. A new build can reuse IDs for different code.

Open uncertainties and acceptance gates are in the PRD. No percentage-complete claim is meaningful until the in-scope operation/state denominator is reviewed.
