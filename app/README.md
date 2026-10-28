# Pump application reconstruction

An evidence-backed starting point for reconstructing the Pump website and APIs. This is separate from the Rust/on-chain reconstruction at the repository root.

- `packages/sdk`: unchanged TypeScript sources from the official `@pump-fun/pump-sdk@4.3.1` npm archive, with a reconstructed tsup build.
- `packages/frontend`: Next.js **16.4.1**, React **19.2.3**, Turbopack; evidence-mapped responsive shell, a hash-bound offline example feed, an offline historical Explore search, a live read-only Solana portfolio, and URL-backed navigation using captured color tokens and Geist fonts. Native feed, market-search and proprietary portfolio compatibility remain unimplemented.
- `packages/backend`: independent Fastify compatibility harness. Documents 67 developer API operations, supports explicit read-only fixture replay, and returns **501** for unimplemented behavior.
- `evidence`: original public bundles, HTML, styles, fonts, HTTP/DNS evidence, SDK archive and provenance.
- `recovered/modules`: readable Turbopack factories, with module IDs, content hashes and exact source ranges in `recovered/modules.json`. These are not standalone original source files.
- `contracts`: official OpenAPI snapshot, internal operation candidates, fixture format and coverage ledger.

The developer contract ledger binds all 67 documented operations to the checked-in first-party `publicRead` contract, including exact method/path, scope, bearer-auth declaration, error-code contract, captured UTF-16 range, and any independently inventoried client literal. One additional captured route is recorded separately because it is absent from OpenAPI 0.294.0. These are offline contract bindings only: native implementation and compatibility qualification remain 0/67, and website request origins remain unresolved.

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

`pnpm test` also runs the frontend's Chromium interaction suite. On a fresh host, install its pinned browser once with `pnpm --filter @pump-reconstruction/frontend test:browser:install`. The suite starts an isolated local Next development server and verifies the shared routes, active navigation, mobile dismissal, search/history semantics, 404 boundaries, requested viewport widths and absence of production mutations.

## Offline Home Feed

`/` hashes and validates the checked-in backend post and user seeds before
rendering three visible root examples. Those seeds are hand-authored synthetic
test data, not captured Pump users or activity, so the page labels the dataset
and every card accordingly. Replies are not promoted, deleted and hidden rows
are omitted, equal timestamps have a stable order, and missing authors receive
an explicit unresolved identity. External avatar and media URLs are never sent
to the browser.

The Following tab is URL-backed but intentionally unavailable: no authenticated
viewer or follow graph is invented. This feature performs no production API
request or mutation and does not qualify the native feed service. See
[`packages/frontend/HOME-FEED-EVIDENCE.md`](packages/frontend/HOME-FEED-EVIDENCE.md)
for factory provenance and the local design boundary.

## Offline Explore snapshot

`/explore` hashes and validates the checked-in one-record response from
`GET https://frontend-api-v3.pump.fun/coins?offset=0&limit=1` on the server, then
supports local name, symbol and mint searching through `?q=`. The page performs
no production request, does not load the captured external image, and labels the
market-cap field and result as historical. If the captured bytes, API probe,
manifest timestamp or response shape fail validation, the page displays no coin
data and does not fall back to synthetic or live results.

This is not native market-search compatibility. The snapshot contains one coin,
does not establish production ranking or pagination, and a missing local result
says nothing about the current Pump market. See
[`packages/frontend/EXPLORE-EVIDENCE.md`](packages/frontend/EXPLORE-EVIDENCE.md)
for the exact provenance and unknowns.

## Offline profiles

`/profile/[id]` resolves the hash-bound synthetic backend users by exact user id
or wallet address and renders their visible authored root posts. The route keeps
the synthetic classification visible, uses local avatar/media fallbacks, excludes
deleted and hidden posts, distinguishes group and banned examples, and leaves
follow/authenticated actions disabled. Unknown, username-only, and malformed
identifiers return the application's 404 boundary.

This is not live profile compatibility or proof of wallet ownership. No native
profile API, follow graph, authenticated viewer state, remote image, or social
mutation is used. See
[`packages/frontend/PROFILE-EVIDENCE.md`](packages/frontend/PROFILE-EVIDENCE.md)
for source provenance and the local-data contract.

## Live Solana portfolio

`/portfolio` accepts a public Solana address and reads current mainnet account
data through a server-owned JSON-RPC endpoint. It reports SOL lamports, separate
SPL Token and Token-2022 accounts, exact integer-derived quantities, independent
context slots, confirmed commitment, observation time, and cluster identity. It
does not request a private key, sign or submit transactions, infer prices, or
fall back to snapshots or synthetic holdings.

Live reads are disabled unless the server sets `SOLANA_RPC_URL` to a public HTTPS
mainnet provider (for example `https://api.mainnet.solana.com`); without it the
route returns 503 `RPC_CONFIGURATION_INVALID`. The value and any provider key are
not shipped to the browser, and users cannot override it. The
adapter rejects private/local destinations and verifies the mainnet genesis
hash. Public endpoints may return rate limits, which the UI reports without
inventing results.

This is direct Solana account inventory, not native Pump portfolio compatibility:
positions, PnL, cost basis, price/metadata enrichment, spam classification, and
history are not implemented. See
[`packages/frontend/PORTFOLIO-RPC.md`](packages/frontend/PORTFOLIO-RPC.md) for the
contract, precision rules, live qualification, and limitations.

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

`pnpm recover` exits nonzero when any selected bundle cannot be read or formatted. It still attempts the remaining bundles and writes per-source diagnostics to `recovered/pretty/manifest.json`; successful outputs from an incomplete run remain available. This optional formatter does not publish an atomic snapshot or establish runtime equivalence.

`capture.py` acquires only public read-only URLs with a recorded user agent. It crawls the listed in-scope pages and their static asset graph, with explicit wave limits and a remaining-URL report. It is not an authenticated crawl. No source map was declared in captured JS; three explicit `.map` probes returned 404. Original frontend TypeScript, source filenames, server actions and backend source remain unavailable.

Resume accepts retained object paths only as canonical repository-relative POSIX paths below `evidence/web/objects/`. Real nested directories are allowed; absolute or drive-qualified paths, backslashes, empty/`.`/`..` segments, symlink components, missing targets and non-regular files fail before network workers start. Reused bytes must still match the recorded length and SHA-256.

New captures name objects with both the URL hash and the full response SHA-256. A changed response therefore preserves bytes referenced by an earlier manifest. Objects and the final manifest are published by same-directory atomic replacement; an exception during discovery or manifest publication keeps the previous manifest and its objects valid. A failed run may leave unreferenced complete objects. Historical object paths remain readable with `--resume`; no existing capture is renamed or rewritten by this change. Concurrent fresh captures and whole-run power-loss durability are not qualified.

`pnpm inventory` extracts literal Turbopack factory boundaries with Babel without executing the bundles. It emits all module variants, not just one arbitrary version of each module ID, and strict API-string candidates. A candidate can come from unused, privileged or excluded code; it is not proof of a reachable API.

Inventory regeneration is fail-closed: every eligible captured JavaScript input must exist and parse before any generated report is published. Factory files and the module, operation and dependency reports are staged first, then replaced with rollback on a caught publication error. Obsolete files carrying the generator's filename pattern and exact ownership banner are removed; unrelated files are preserved, and a destination collision with one is rejected. The replacement is atomic per output target, not across all four targets or across a process/host crash, so concurrent inventory runs are unsupported. Tests can use `node scripts/inventory.mjs --root <workspace>` with an isolated synthetic workspace; ordinary `pnpm inventory` retains the application root and output schemas.

See `evidence/validation.json` for this checkpoint's actual results. Lockfile changes and source recaptures require renewed validation. Docker examples in `infra/` are development scaffolding, not a claim about upstream deployment.

## Source and feature completion

See [generated progress tables](PROGRESS.md) and the [feature ledger](contracts/feature-progress.json). From the repository root run `python3 app/scripts/progress.py` to refresh both the root README tables and the standalone report. Run `pnpm --dir app check:progress` to check freshness and scoring rules. Accepted milestones require checked-in evidence; excluded/deferred surfaces are N/A. Captured JavaScript and extracted factories are not counted as completed product features.
