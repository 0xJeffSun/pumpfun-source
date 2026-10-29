# Native local Home Feed frontend integration

This note documents the opt-in, read-only connection between the existing
offline Home Feed and the local Home Feed backend proposed by PR #700. It does
not establish production Pump.fun compatibility.

## Dependency and provenance

- Existing offline frontend: PR #556. Its hash-bound synthetic posts remain the
  default `/` view.
- Local backend contract: PR #700 at reviewed head
  `c0b3b57c031ddfca88792be56634e577abc23c39`. The backend defines the three
  local reads, response projections, opaque cursors, synthetic seed, provenance
  headers, and `local-unqualified` compatibility label.
- Captured website contract attribution: PR #686. It establishes the original
  request chain and `frontend-api-v3.pump.fun` origin, but does not make this
  local backend production-compatible.
- Captured UI evidence and the original offline design boundary remain in
  [`HOME-FEED-EVIDENCE.md`](HOME-FEED-EVIDENCE.md).

The backend records are deliberately synthetic. The frontend always displays
“Synthetic local callout data” and “Not live Pump.fun activity.” It does not
combine callout records with the separate synthetic post model.

## Opt-in and transport boundary

The local callout tab is present only when the **server process** has:

```sh
PUMP_LOCAL_HOME_FEED=enabled
```

No `NEXT_PUBLIC_` variable is used. The destination is the fixed loopback URL
`http://127.0.0.1:3001`; an environment variable, browser query parameter, or
request header cannot replace it. The browser requests only the local Next
server. Next performs bounded server-side GET requests with a two-second
timeout, `cache: no-store`, omitted credentials, and no caller headers.

The adapter never falls back to Pump.fun, another origin, or invented rows. A
missing backend, non-200 response, invalid cursor, malformed JSON, wrong content
type, wrong provenance header, wrong compatibility header, or invalid response
shape produces an explicit unavailable state.

## Accepted local response surface

The adapter consumes only:

- `GET /services/frontend/home-feed?pageSize=3[&pageToken=…]`
- `GET /services/frontend/home-feed/new?pageSize=3[&pageToken=…]`
- `GET /services/frontend/home-feed/new/count?since=…`

A successful response must include:

- `X-Reconstruction-Data-Source: synthetic-home-feed-local-v1`
- `X-Reconstruction-Compatibility: local-unqualified`
- JSON content type
- HTTP 200

Validation bounds arrays, safe strings, canonical timestamps, finite
non-negative numbers, supported chains and asset classes, null image/wallet
fields, unverified author state, unique callout identities, local unavailable
realtime subject, cursor shape, and the 25-row count cap. React performs normal
text escaping; captured HTML is never rendered.

The UI displays the backend-supplied coin name, symbol, chain, projected asset
class, author, thesis, callout timestamp, local market-cap values, local cost
basis, and local multiple. It does not display a remote image, live price,
volume, liquidity, wallet balance, follower count, verified identity, or
production rank.

## Pagination and snapshot behavior

Ranked and newest pages use separate URL-backed views. Cursors remain opaque:
the frontend bounds and forwards them but does not decode or manufacture their
contents. A maximum 20-page local trail supports Previous and browser
Back/Forward navigation without an unbounded request loop. Switching ordering
resets the cursor namespace.

The first newest page supplies a local `headToken`. That exact token is passed
to `/new/count`; the resulting value is labelled as a local snapshot count.
`liveSubject` is validated only as the backend's explicit realtime-unavailable
sentinel. No WebSocket, polling loop, or realtime claim is implemented.

## Verification

Unit and bounded loopback tests:

```sh
pnpm test:feed
pnpm --filter @pump-reconstruction/frontend test:browser:native-feed
```

The browser suite starts an isolated loopback server and verifies the success,
empty, unavailable, malformed JSON, wrong content type, wrong provenance,
wrong compatibility, duplicate identity, cursor, pagination, history,
new-count, keyboard, network, and six responsive viewport cases.

PR #700 integration is tested separately so its commits are not copied into
this frontend branch. In a worktree containing PR #700 plus this frontend diff:

```sh
pnpm --filter @pump-reconstruction/backend build
pnpm --filter @pump-reconstruction/backend start
PUMP_LOCAL_HOME_FEED=enabled pnpm --filter @pump-reconstruction/frontend \
  exec next dev --turbopack --hostname 127.0.0.1 --port 3012
pnpm --filter @pump-reconstruction/frontend test:browser:native-feed-real
```

The reviewed PR #700 head passed both real-backend browser cases: ranked pages
contained 3, 3, and 2 visible records; newest pagination and the pinned zero
count matched the backend; browser traffic stayed on the Next origin.

## Unqualified behavior

- Production Pump.fun data, ranking, cursor bytes, request compatibility, and
  authenticated personalization.
- Current prices, markets, balances, users, follow graph, realtime delivery,
  mutations, wallet access, signing, or trading.
- Original visual parity and production error wording.

The Home/feed ledger remains at its existing 3/3 source and 3/4 completion
milestones. This integration adds a tested local read path but does not satisfy
the pending original-visual-consistency milestone or qualify a production API.
