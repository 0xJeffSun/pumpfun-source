# Native /following operations

Seven of the 67 documented operations now answer from a native handler instead of
the compatibility stub:

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/v1/following/single/{id}` | `{ follow: { following_id, user_id, timestamp } \| null }` |
| GET | `/v1/following/v3/followers/count/{userId}` | `{ count }` |
| GET | `/v1/following/v3/following/count/{userId}` | `{ count }` |
| GET | `/v1/following/v3/followers/search/{userId}` | full user rows |
| GET | `/v1/following/v3/following/search/{userId}` | full user rows |
| GET | `/v1/following/v3/followers/{userId}` | compact follow rows |
| GET | `/v1/following/v3/following/{userId}` | compact follow rows |

Files: `src/following-store.ts`, `src/following-routes.ts`, `src/following-seed.json`,
`test/following.test.ts`. Registration is in `src/app.ts` — the seven paths are added
to `NATIVE_ROUTES` so the fixture replay loop steps aside, and the handlers are
registered inside the same `native` scope that carries the API-key gate.

## Two row shapes, deliberately

A page of followers and a search over followers do **not** return the same object
shape, and the contract says so:

- `GET /following/v3/followers/{userId}` and `.../following/{userId}` return a
  compact follow row, required:
  `username`, `profile_image`, `resolved_avatar_decoration`, `address`, `userId`,
  `user_id`, `kind`, `timestamp`, `followers`. There is no `bio` and no `following`
  count, and `additionalProperties: false` forbids passing a full user row through.
- `GET /following/v3/followers/search/{userId}` and `.../search/{userId}` return the
  full user row, the same shape served by `GET /v1/users`.

The store therefore projects the compact shape explicitly (`toFollowRow`) rather than
returning the shared `User` object, and the conformance test fails if the two are ever
confused.

## Assumptions the contract does not settle

1. **Synthetic data.** Rows come from `following-seed.json` and the existing user
   seed. Every response carries `X-Reconstruction-Data-Source: synthetic-seed-play`.
2. **No 404 on an unknown user.** The contract documents no 404 schema for these
   operations, so an unknown `userId` answers an empty page, and a count of `0`.
3. **Paging is rejected, not clamped.** The documented descriptions say out-of-range
   values are "rejected with 400, not clamped", which differs from the `/users` slice.
   `limit` outside 1..1000 (1..100 on search), a negative or non-integer `offset`, and
   an unknown `sort` all answer 400. The error codes `INVALID_LIMIT`,
   `INVALID_OFFSET`, `INVALID_SORT` and `INVALID_SEARCH_TERM` are ours; the contract
   lists no code for a malformed query parameter.
4. **Search term bounds.** `searchTerm` has `minLength: 1` and `maxLength: 50`, so an
   empty value and anything longer than 50 characters answer 400. A term that is
   shorter than two characters *after trimming* answers `[]` without searching, as the
   description states.
5. **`mutuals` is omitted.** The contract marks it viewer-relative and present only on
   a signed-in read of a page of at most 100 rows, never on the API host. Absent means
   "signal not computed", which is the honest state here.
6. **Counts are edge counts.** `count` is the number of seeded edges, which can disagree
   with the `followers`/`following` numbers on a user row. The seed is small and the
   two are independent by construction; the count route is defined by the graph.
7. **`timestamp` is the edge timestamp**, and `user_id` duplicates `userId` because the
   schema requires both.
8. **`kind` defaults to `person`** when the underlying user row omits it, matching the
   documented enum.
9. **Ordering.** `sort=followers` (default) orders by the row's follower count; `recent`
   orders by edge timestamp, newest first. Ties break on username then `userId`, so
   consecutive pages cannot duplicate or skip a row.
10. **Search ranking** is exact username, then prefix, then substring, then address
    substring; ties break on username then `userId`.

## Verification

```
cd app/packages/backend
npx tsx --test test/*.test.ts   # 230 tests, 0 fail
../../node_modules/.bin/tsc --noEmit -p tsconfig.json
```

The seven operations were also probed live against a running server, with every 200
response validated against the published schema (including `$ref` and `anyOf`).
