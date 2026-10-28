# Pump application reconstruction

An evidence-backed starting point for reconstructing the Pump website and APIs. This is separate from the Rust/on-chain reconstruction at the repository root.

- `packages/sdk`: unchanged TypeScript sources from the official `@pump-fun/pump-sdk@4.3.1` npm archive, with a reconstructed tsup build.
- `packages/frontend`: Next.js **16.4.1**, React **19.2.3**, Turbopack; local route shell, captured color tokens and Geist fonts. Product interactions are not implemented yet.
- `packages/backend`: independent Fastify compatibility harness. Documents 67 developer API operations, supports explicit read-only fixture replay, and returns **501** for unimplemented behavior.
- `evidence`: original public bundles, HTML, styles, fonts, HTTP/DNS evidence, SDK archive and provenance.
- `recovered/modules`: readable Turbopack factories, with module IDs, content hashes and exact source ranges in `recovered/modules.json`. These are not standalone original source files.
- `contracts`: official OpenAPI snapshot, internal operation candidates, fixture format and coverage ledger.

Start with [PRD.md](PRD.md) and [AGENTS.md](AGENTS.md). Every coverage claim must distinguish captured, reconstructed, implemented and qualified.

## Run

From this directory, using Node >=22 and pnpm 10.24.0:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm typecheck
pnpm verify:evidence
pnpm dev
```

Frontend: `http://localhost:3000`. Backend: `http://localhost:3001`. The frontend forwards `/api/compat/*` to the local backend. No credentials, wallet connection or production API proxy is enabled.

Replay the captured price snapshot (historical evidence, never a live price):

```sh
FIXTURES_FILE="$PWD/contracts/public-fixtures.json" pnpm --filter @pump-reconstruction/backend dev
curl http://localhost:3001/services/frontend/sol-price
```

Build commands intentionally run the SDK first. Tests compare both rebuilt entrypoints against the published SDK, verify fee-math samples, check recovery provenance and exercise the backend's failure/replay behavior. Pure-JS bigint fallback is allowed; native crypto performance is not qualified.

## Refresh / inspect

```sh
# Preserve existing HTTP bytes and fetch only missing discovered assets:
python3 scripts/capture.py --resume
# A fresh live snapshot replaces the capture manifest; review deployment drift:
pnpm capture
pnpm inventory
pnpm contracts
# Optional full-chunk formatting in ignored recovered/pretty/:
pnpm recover
```

`capture.py` acquires only public read-only URLs with a recorded user agent. It crawls the listed in-scope pages and their static asset graph, with explicit wave limits and a remaining-URL report. It is not an authenticated crawl. No source map was declared in captured JS; three explicit `.map` probes returned 404. Original frontend TypeScript, source filenames, server actions and backend source remain unavailable.

`pnpm inventory` extracts literal Turbopack factory boundaries with Babel without executing the bundles. It emits all module variants, not just one arbitrary version of each module ID, and strict API-string candidates. A candidate can come from unused, privileged or excluded code; it is not proof of a reachable API.

See `evidence/validation.json` for this checkpoint's actual results. Lockfile changes and source recaptures require renewed validation. Docker examples in `infra/` are development scaffolding, not a claim about upstream deployment.

## Source and feature completion

See [generated progress tables](PROGRESS.md) and the [feature ledger](contracts/feature-progress.json). From the repository root run `python3 app/scripts/progress.py` to refresh both the root README tables and the standalone report. Run `pnpm --dir app check:progress` to check freshness and scoring rules. Accepted milestones require checked-in evidence; excluded/deferred surfaces are N/A. Captured JavaScript and extracted factories are not counted as completed product features.
