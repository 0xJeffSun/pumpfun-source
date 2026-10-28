# Live discovery evidence and limits

This note distinguishes captured product observations from local reconstruction
choices. Captured JavaScript was inspected only as inert text. It is never
executed by this application.

## Captured source provenance

The first-party `/live` document is the only archived listing source used by
the reconstruction.

| Field                  | Value                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| Original and final URL | `https://pump.fun/live`                                            |
| Capture timestamp      | `2026-10-28T10:48:45.546100+00:00`                                 |
| HTTP status            | `200`                                                              |
| Object                 | `evidence/web/objects/c45d40b52df03727`                            |
| Bytes                  | `785309`                                                           |
| SHA-256                | `aeff704c15d99482fe6e6347a92db0170dffeceb940a70e61dcc10002b006355` |
| Manifest               | `evidence/web/manifest.json`                                       |

The adapter requires the manifest URL, final URL, status, object path, byte
count and hash to match before parsing. It then extracts the first five of the 42
card objects in the captured `Most viewers` payload, in captured order (not the five
highest viewer counts), undoes React Flight string escaping (`$$` → `$`; any other
`$`-prefixed value fails closed) and validates their
identity, creator address, symbol, title, historical viewer count and captured
`isLive` flag. Playlist and thumbnail fields are deliberately discarded before
data crosses the Server/Client Component boundary.

The separate `https://livestream-api.pump.fun/health` observation is object
`evidence/web/objects/2f97956d4bb68473`, 191 bytes, SHA-256
`fcc3587e9bb0c61121f2189a097cb57e6af7e39cdfd0ce0c53a927f198aa002f`.
It proves only that a health request returned successfully at capture time. It
does not declare a listing, playback, authentication or realtime contract.

## Recovered factory map

Each range is a UTF-16 source range recorded in `recovered/modules.json`.
Hashes identify recovered factory text, not original source files.

| Module ID                      | Factory SHA-256                                                    | Source bundle                              |     UTF-16 range | Classification and finding                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------ | ------------------------------------------ | ---------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `369731`                       | `fc87a2c85f17569e3f50a0b0bd960e814109550629c9baef4200792008e6d9b3` | `evidence/web/objects/44a65b4313e51497.js` |    `8997..20378` | OBSERVED: six-slot hero carousel, selection, pagination and viewer-count rendering.                                                                                           |
| `763145`                       | `d6c5fb78571198cbdce125397e28ac5a9cda6f2fa2b71dca1836de1e13821064` | `evidence/web/objects/0ba78d0f42544445.js` |    `2766..11008` | OBSERVED: stream card title, ticker and creator identity presentation. Its default coin-detail link remains outside this route's allowed scope.                               |
| `944001` / `310766`            | `1c56dd013720ae62a9c8ec316ebf1921d9fb13dc436bd75f7eefacdaad40aecb` | `evidence/web/objects/0ba78d0f42544445.js` |   `13588..21847` | OBSERVED: discovery section registry and `Most viewers` section assembly.                                                                                                     |
| `788501`                       | `db885fc927427d144544ada8524614dc33547634693bc8824951e2a65c25f6f0` | `evidence/web/objects/44a65b4313e51497.js` |   `25697..25933` | OBSERVED: section identifiers `most-viewers`, `highest-market-cap`, `trending-clips`, `popular-recordings`, `new-creators`, and `for-you`.                                    |
| `859960` / `606706` / `539335` | `d97c7c9447e248dcaeef4b872bb869c9056d2979cdf53731913116fb8544e429` | `evidence/web/objects/44a65b4313e51497.js` |   `25955..30183` | OBSERVED: card mapping for mint, name, creator, username, symbol, thumbnail, live flag, playlist and participant count; observed listing and playlist-map request call sites. |
| `133244`                       | `248fcf72a5bbbd3cb39cd391e161c90c6d496a0828ec3e07c15e7df093aecd97` | `evidence/web/objects/44a65b4313e51497.js` |   `24553..25689` | OBSERVED: initial hero data mapping and six loading slots.                                                                                                                    |
| `137793`                       | `208b37abad878fd4231b6202163e20c8e8465676becf56035e6375aa9211e002` | `evidence/web/objects/49fea3547104f38d.js` |     `3154..3380` | DECLARED: production LiveKit URL constant. It is not initialized or contacted locally.                                                                                        |
| `845785` / `606706` / `539335` | `3be974636ce9d23cc25b6ade092f28934d7defd6b6aff3c9d4e9e0073fa24bef` | `evidence/web/objects/b7df9c4704b957ab.js` |   `26584..29109` | OBSERVED: LiveKit/Pump provider, livestream/VOD/clip and player-context enums.                                                                                                |
| `828496`                       | `3de590f475c2c64a53ffb2d8a156561077bc83abaee5473de15b44c1f592c157` | `evidence/web/objects/2b47dd0b38a1608f.js` | `161584..163756` | DECLARED: public developer `GET /feed/video-feed` read operation and `clip`/`live` union. No captured binding proves that `/live` uses this operation.                        |

## OBSERVED

- The captured document title is `Live streams | Pump` and contains an
  accessible `Live streams` heading.
- Captured structure includes a hero carousel and a `Most viewers` section.
- Cards expose coin title/ticker, creator identity and a viewer indicator.
- The five locally used card objects were marked live and reported historical
  participant counts of 42, 34, 26, 24 and 20 in the captured response.
- The captured response contains remote image and playlist URLs. Local code
  validates but never sends those fields to the browser.

## DECLARED

- Recovered client text names LiveKit/Pump providers and media/player types.
- The developer contract declares a read-only video-feed operation.
- These declarations are not evidence of authorized playback tokens, current
  broadcast availability or `/live` production endpoint equivalence.

## INFERRED

- Viewer numbers are interpreted only as values at capture time because the
  response and page were captured together.
- The captured array order of these five cards is retained for the default
  local order. The captured section is not strictly ordered by viewer count (a
  later card reports 40 viewers), so no ranking formula is inferred.

## LOCAL DESIGN

- Search covers captured title, ticker, creator address and mint locally.
- Sort controls offer captured viewer count and title. Query, sort, section and
  selected record are URL-backed for reload and browser history behavior.
- `Other sections` exposes an honest unavailable state instead of inventing
  unauthenticated card data.
- Selection opens a metadata panel whose only playable outcome is `Playback
unavailable`. Escape closes the detail and restores focus to its card.
- Remote thumbnails are replaced with text placeholders; coin-detail links are
  not exposed because `/coin/:mint` remains excluded.

## UNKNOWN

- Current listing endpoint authorization, request parameters, rate limits and
  response compatibility.
- Playback token acquisition and provider selection.
- Current livestream, viewer and presence state.
- Chat, broadcasting, recording, authenticated creator identity and wallet
  behavior.
- Original mobile detail-panel behavior and pixel-level visual parity.

## Verification

- `pnpm test:live` authenticates the capture, validates the five records and
  exercises mutation and invalid-schema controls.
- `pnpm --filter @pump-reconstruction/frontend test:browser -- live.spec.ts`
  exercises search, sort, empty and unavailable states, URL history, selection,
  Escape/focus restoration, keyboard tabs, safety boundaries and target
  viewport overflow.
- The complete app build, test, typecheck, evidence and progress checks remain
  the release gates. Local screenshots are structural qualification only;
  equivalent original interaction screenshots were not captured, so visual
  parity is not claimed.
