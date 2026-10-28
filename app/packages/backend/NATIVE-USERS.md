# Native /users implementation

Status: seven of the 67 documented developer API operations are now served natively
(with six /posts operations also served natively; see [POSTS.md](./POSTS.md)).

| Operation | Path | Response |
| --- | --- | --- |
| `get_users` | `GET /v1/users` | 200, array of User |
| `get_users_by_id` | `GET /v1/users/{id}` | 200 User, 404 on miss |
| `post_users_batch` | `POST /v1/users/batch` | 201, array of User |
| `get_users_username_exists_by_username` | `GET /v1/users/username-exists/{username}` | 200 `{ "exists_flag": boolean }` |
| `get_users_search_v2` | `GET /v1/users/search-v2` | 200, array of User |
| `get_users_by_id_overview` | `GET /v1/users/{id}/overview` | 200 UserOverview, 404 on miss |
| `post_profiles_verified` | `POST /v1/profiles/verified` | 201 `{ [id: string]: boolean }` |

Everything else still falls through to fixture replay, and to `501` when no fixture
matches. That behavior is unchanged and covered by a regression test.

## Source layout

- `src/users-store.ts` - `UserStore`, a deterministic in-memory store with O(1)
  address / userId / username indexes, search filtering, and verified tracking.
  `defaultStore` is the singleton used by the app.
- `src/users-seed.json` - five seed rows, all satisfying the contract's required keys.
- `src/users-routes.ts` - the seven native Fastify handlers.
- `src/app.ts` - `buildApp()` registers native routes first and skips their OpenAPI
  paths in the generic replay loop, so native always wins over a captured fixture.
- `src/schema-validator.ts` - dependency-free JSON Schema validator for the subset the
  OpenAPI snapshot uses (type, nullable, enum, properties, required,
  additionalProperties, items, minItems/maxItems, minLength/maxLength, minimum/maximum,
  oneOf/anyOf). Usable by any operation, not just the seven here.
- `test/contract-conformance.test.ts` - validates every native response and every
  captured fixture against the published schema.

## Data source and its limits

The seed is hand-authored fixture data shaped to the contract. It is **not** captured
production traffic, and no real users exist behind these rows. This is a behavioral
implementation of the contract, not a replication of pump.fun's database.

`app/AGENTS.md` forbids fabricated domain responses, so this data is labelled wherever
it surfaces rather than left to look like evidence:

- `SYNTHETIC_SEED` and `DATA_SOURCE` in `src/users-store.ts` name the dataset for what
  it is.
- Every successful native response carries `X-Reconstruction-Data-Source:
  synthetic-seed-play`. Error responses carry no marker because they contain no domain
  data.
- A contract test asserts the header is present, so the label cannot be dropped without
  failing CI.

Replacing this store with fixture-backed or recorded data would not change any route,
test, or schema. Only `UserStore` would change.

## Documented assumptions

The contract does not specify these behaviors. Each was decided deliberately; changing
any of them is a contract decision, not a bug fix.

1. **Lookup miss on `GET /users/{id}`** returns `404 {"error":"NOT_FOUND"}`. The spec
   documents only 200 and transport-level errors, so 404 is an addition.
2. **`id` resolution order**: wallet address first, then `userId`. Addresses and userIds
   are namespaced by construction in the seed, so a collision cannot currently occur.
3. **Negative `offset`** clamps to 0. The contract's integer schema permits negatives
   (minimum `-9007199254740991`) but says nothing about their meaning.
4. **Negative `limit`** returns an empty array, for the same reason.
5. **Non-integer `offset`/`limit`** are ignored (treated as absent) rather than rejected.
6. **Unknown `sort` value** falls back to seed insertion order. The contract types `sort`
   as a plain string with no enum, so there is no documented set to reject against.
   Recognized keys are `followers`, `following`, `address`, `username`.
7. **`order`** is only honored alongside a recognized `sort`; anything other than
   `desc` is treated as `asc`.
8. **Null values sort last** in both directions. This affects rows whose `username` is
   null.
9. **`POST /users/batch` with more than 100 addresses** returns
   `400 {"error":"TOO_MANY_ADDRESSES","maxItems":100,"received":N}`. The contract declares
   `maxItems: 100`; rejecting is preferred over silently truncating.
10. **Missing addresses inside a batch** are omitted from the response rather than
    returned as null entries. The response schema is an array of User with no nullable
    element, so omission is the only conformant option.
11. **`username-exists`** compares case-insensitively and ignores viewer identity, matching
    the contract note that the check has no viewer.
12. **Error bodies use the documented `Error` component shape** (`statusCode` plus `error`,
    with route detail added alongside). The contract declares no schema for the 400 and
    `default` responses, so the envelope is a choice; using the component keeps error
    responses machine-checkable instead of free-form.
12. **`searchTerm` in `GET /users/search-v2`** performs a case-insensitive substring match
    against `username`, `address`, `userId`, `x_username`, and `wallet_label`. An omitted,
    empty, or whitespace-only `searchTerm` matches all eligible users.
13. **`includeLabelledWallets` in `GET /users/search-v2`** defaults to `false`. When false (or
    omitted), users with a non-empty `wallet_label` are excluded from search results; when
    `'true'` or `'1'`, they are included.
14. **Lookup miss on `GET /users/{id}/overview`** returns `404 {"error":"NOT_FOUND"}` when
    no user matches the requested `id`, consistent with `GET /users/{id}` and the OpenAPI spec
    note ("A user id with none is a 404").
15. **Overview `viewer` omitted**: Anonymous callers receive no `viewer` object, matching
    the OpenAPI spec description ("Absent on anonymous responses").
16. **Overview degraded services**: The local reconstruction backend operates entirely in-memory
    with no failing microservices, so `degraded` is returned as `[]`.
17. **`POST /profiles/verified` validation boundaries**: Rejects with `400` if `ids` is empty
    (`minItems: 1`), exceeds 200 items (`maxItems: 200`), or contains any non-string or id
    longer than 64 characters (`maxLength: 64`).
18. **Unregistered or unknown IDs in `POST /profiles/verified`** map to `false` in the response
    object, matching the spec note ("ids with no user... are false").
19. **Verified identification**: A user is verified if their address or userId is in the store's
    verified set. Default seed marks Alice (`user-001` / `7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`)
    as verified.

## Not implemented

- Authentication or authorization of any kind. All seven operations are open, which is
  only acceptable for a local reconstruction harness.
- Rate limiting and the documented 429/503 responses.
- Any persistence. The store is immutable in memory.
- The other 60 documented operations.

## Verification

```sh
cd app/packages/backend
npx tsx --test test/*.test.ts     # 86 tests, 12 suites
../../node_modules/.bin/tsc --noEmit -p tsconfig.json
```

Both pass as of 2026-10-28. The tests assert schema conformance for every 200 response
(required keys present, no keys outside the allowed set), pagination, sort direction and
null placement, address and userId lookup, batch omission behavior, the `maxItems`
boundary at 100 and 101, username existence true and false, search-v2 filtering and
pagination, overview fields and 404 handling, verified profile mapping and validation,
and that unimplemented routes still return 501.

`test/contract-conformance.test.ts` adds the reusable half: it validates each native
response against the documented schema for that operation and status code, and it
validates captured fixtures the same way. Captured routes outside the developer OpenAPI
(the `/services/...` internals) are reported rather than silently skipped.

## Provenance

Drafted by `claude-opus-4-6-thinking` through the Antigravity CLI, then reviewed,
corrected and completed under Hermes. Extended with search-v2, overview, and verified
endpoints under Antigravity.
