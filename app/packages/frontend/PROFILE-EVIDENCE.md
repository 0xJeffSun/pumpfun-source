# Offline profile reconstruction evidence

This note records the static evidence and local-data contract used to implement
`/profile/[id]`. Captured factories are inert research inputs that require the
original Turbopack runtime and import graph; they are never executed here.
Factory ranges are UTF-16 code-unit offsets over decoded JavaScript, as defined
by `recovered/modules.json`.

## Capture checkpoint

- Web manifest checkpoint: `2026-10-28T10:48:45.546100+00:00`
- Captured user-contract object:
  `evidence/web/objects/2b47dd0b38a1608f.js`
- Captured object SHA-256:
  `e78d2f38b06f971847c18dd05457c75afc85208135f50d6e4022a5f197e8839d`
- Local users seed SHA-256:
  `56259663a146236df2f0e6e1d931df7cc2dda4d39ed7a090c18505434155b20d`
- Local posts seed SHA-256:
  `f4d12a7812b07be6dcef4b966430a086cba9e867ff89de669a95a74bdd73d705`
- Local-data classification: `synthetic-seed-play`

The web capture scope did not include a concrete `/profile/:id` page response.
Consequently this work maps the captured contract, route construction, identity
presentation primitives, and profile translation namespace, but does not claim
an equivalent original profile screenshot or full original page composition.

## Observed

| Concern                         |  Factory | Factory SHA-256                                                    | Captured source and SHA-256                                                                                    |     UTF-16 range | Observation                                                                                                                                                                                                                           |
| ------------------------------- | -------: | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile route construction      | `146695` | `bb995bc856796eb404e21763f5a72275af2b0efa06b46f0d12507e1c6a3d90a1` | `evidence/web/objects/fd402d4185b44ce9.js`, `1dc5d2351887b14932acbddf37ea653566df106b41c56ddc19ae70158e43f806` |   `29806..30355` | Constructs `/profile/${encodeURIComponent(identity)}` from an address or user id. It also contains username-related routing branches that are not adopted locally because the checked-in store resolves only user id and address.     |
| User row schema                 | `896727` | `c6d26c3befe1f767147fcfcf6c16016bbaa9870548c96bd0ad5fa391ace658b6` | `evidence/web/objects/2b47dd0b38a1608f.js`, `e78d2f38b06f971847c18dd05457c75afc85208135f50d6e4022a5f197e8839d` | `490565..493848` | Declares address, optional user id, nullable username/avatar/bio, person/group kind, member count, group badges, followers/following, Pump-user and ban flags, and canonical wallets.                                                 |
| Identity presentation primitive | `107240` | `4b94aa99e04cf92a4e2a79379d9c2336e2ea9f81d3ba90ff5433452a04e30a4d` | `evidence/web/objects/eb0b23ee6feb7543.js`, `8ff9a060d8b1c540a04bb505094eb61ce0c2b2c5d83579af3e3976bf49a16d54` |   `11466..21254` | Composes address/user id/username, avatar fallback, verified lookup, profile link, subline, and follow-slot boundaries. The local implementation retains identity/fallback structure but does not perform verified or follow lookups. |
| Profile route namespace         | `532843` | `07e45ce65eee481055c678c52eac4c0ccb904c6cfd463d1a79c72c0c7367a7b0` | `evidence/web/objects/c96cd69e95f3f01a.js`, `8899083b932ccf201b417e6382eba3a88412f599356c00a4f0c67883e0dd7ecc` |     `1060..8099` | Associates the profile route with profile, feed, callout, transaction, wallet, auth, trade, and report namespaces. This establishes a broad dependency surface, not local qualification of those features.                            |

The static operation inventory additionally records `GET /users/{id}` from
`evidence/web/objects/27a1ee00eb5909ec.js` (SHA-256
`4f15372b7572090fd27f1c612bafee0a0a3672127d5187b66e05b6ddd0d21452`)
at UTF-16 range `29840..29857`, and `GET /users/{id}/overview` from the
captured contract object at `342803..342829`. The checked-in OpenAPI declares both under
`profiles.read`, with bearer authentication for the developer API. This offline
page reads files directly on the server and does not call or qualify either API.

Home post-card evidence is recorded separately in
`HOME-FEED-EVIDENCE.md`. This page reuses the same local `FeedList` and
`FeedItem` presentation and visibility rules.

## Declared local input

The backend explicitly classifies `users-seed.json` and `posts-seed.json` as
hand-authored synthetic data. They are not captured Pump users or activity. The
profile loader authenticates the exact bytes before parsing. It rejects duplicate
user or post identities, unknown author references, unsupported account kinds,
invalid counters, malformed timestamps, and inconsistent canonical wallets.

External avatar, header, group-badge, and post-media URLs are shape-validated
but never passed into browser markup. A deterministic initial and local media
placeholder preserve the offline/network boundary.

## Local design

- Exact `userId` and wallet-address matches resolve; username lookup is not
  implemented because the local store does not define it as an identity key.
- Unknown and malformed identifiers render the application's 404 boundary.
- Person/group classification, member count, bio, and follower/following counts
  are shown only when supported by the authenticated seed.
- Banned examples are explicitly marked, and follow remains disabled for every
  profile because authentication and social writes are unavailable.
- Authored posts include only validated visible roots. Replies, quotes, reposts,
  hidden rows, and deleted rows are not promoted into the Posts view.
- All visible data carries synthetic-data disclosure. No ownership, live
  activity, relationship, verified status, or native API compatibility is
  inferred.

## Qualification

- Pure adapter tests cover exact hashes, id/address resolution, duplicates,
  malformed JSON, invalid kinds/counts/timestamps, author consistency, field
  fallbacks, post visibility, stable ordering, banned/group classification, and
  identifier boundaries.
- Browser tests cover deep links, 404s, history, person/group/empty/banned
  states, disabled writes, accessibility, external-request rejection, and five
  responsive viewports from 320 to 1440 CSS pixels.
- Local screenshots and limitations are recorded in
  `visual/profile-20261028/README.md`.

## Unknown and unsupported

- Live users, current follower/following counts, follow relationships, mutuals,
  authenticated viewer state, and account ownership.
- Profile writes, follows, messages, wallet connection, verified lookups, live
  post queries, pagination, and realtime updates.
- Full original profile layout, localized copy, transition behavior, and pixel
  parity in an equivalent captured state.
- Username route resolution, which appears in some captured route helpers but is
  not established by the local store contract used here.
