# Settings and notification boundary

## Observed

This work is pinned to repository commit
`2fc654a20e9c7be2b9529f585942bb82c4c83ab2`. The machine-readable source and
operation binding is [`../../contracts/settings-notifications.json`](../../contracts/settings-notifications.json).
No captured factory is imported or executed by the reconstruction.

| Factory variant                              | Observed behavior                                                                                                                                                                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `443032-9460ff6fdae4`                        | Settings is a modal over the current page, controlled by `settings` and optional `setting` query keys. Updates use history replacement; close removes both keys. The upstream host is feature-flag gated. This is not evidence for a `/settings` page.              |
| `532757-034384d1b986`                        | Section identifiers: trading, chart, feed, notifications, account, display, privacy, admin. The privileged admin section is deliberately not implemented.                                                                                                           |
| `124884-dfcb487f79e6`                        | Search, section tabs, close/done controls, optional setting focus, empty search, scrollable content, and a 720px maximum-width modal. Account/notification/admin visibility is gated upstream. Search normalization lowercases and removes Unicode combining marks. |
| `917781-d1d7a6dcbad8`                        | Browser-push, chat, social, coin and trending-topic groups. Nine preference fields and three topic names are read. Includes settings/topic queries and mutation call sites; defaults in this UI are not observed server or account values.                          |
| `944410-eb97d7584306`, `944410-6e0b85a81829` | Two captured client-hook variants gate Hermes client creation on `hermesNotificationsAvailable`. The import renaming differs; neither variant establishes a backend implementation.                                                                                 |
| `30181-fbae4e508e6c`                         | Hermes client uses same-origin `/api/hermes` and a 60-second timeout, without an explicit credentials option or bearer hook. Backend origin, authentication and errors are unknown.                                                                                 |
| `528798-af69e8c3ce32`                        | `WEB_HERMES_NOTIFICATIONS` gate and viewer-keyed query-cache namespaces.                                                                                                                                                                                            |
| `956718-00b703deb875`, `654506-faac91fe2207` | Hide-personal-information, language and confirm-external-links definitions; device/account scopes and a local-storage adapter. These preference adapters are not connected or exercised locally.                                                                    |

The binding records full SHA-256 hashes and original UTF-16 ranges/URLs from
`recovered/modules.json`. `tests/settings-contract.test.mjs` checks each binding
against that index and hashes each original captured range without executing it.

### Captured English text

The common English resources are embedded in retained `/live` HTML, not a
standalone locale JSON file. The translation binding pins
`evidence/web/objects/c45d40b52df03727`, 785,309 bytes, SHA-256
`aeff704c15d99482fe6e6347a92db0170dffeceb940a70e61dcc10002b006355`, captured
`2026-10-28T10:48:45.546100+00:00`. The single Flight push is read as JSON;
Flight row `c6` contains `locale: "en"` and the `resources` object.

This supplies exact tab names, settings/search titles, and the label/description
pairs for hide-personal-information, language and external-link confirmation.
It does **not** contain the lazy `web.notification_settings` or
`notifications.settings` namespaces. No complete translation catalogue or
notification-label identity is claimed. Contract tests hash the source, check
manifest provenance and compare each recorded string to the inert JSON data;
model tests bind the rendered general-setting definitions to those strings.

## Local design

`src/components/settings/settings-control.tsx` exports one `SettingsControl`,
mounted once in the shared shell's sidebar footer. It contains its own Suspense boundary, a launcher, and a native
dialog portalled to `document.body` after hydration. This avoids hiding the dialog
under a mobile navigation ancestor's `aria-hidden`/`inert` state. Modal background
scroll is locked temporarily, with the previous body overflow restored on close.
Escape keydown stops propagation at the modal without preventing its default:
the current shell and Live listeners are window bubble listeners, while native
dialog cancellation still dispatches `cancel`. The cancel handler removes only
the settings query keys. This ordering has a combined sidebar/settings/Live
regression, but has not yet been exercised in a browser.

Supported local interactions are query-open, section selection, search/clear and
empty results, tab-key/arrow-key navigation, an exact known focus target,
Close/Escape/Done/backdrop dismissal and URL history replacement. Close drops all
occurrences of the two owned query keys and preserves unrelated repeated query
values and the fragment. Invalid/duplicate section values fail closed; invalid,
duplicate or cross-section focus targets are ignored. These malformed-input
policies are defensive local choices, not asserted upstream parity.

The launcher opens Notifications as the bounded implemented panel rather than
claiming the upstream default section. Seven public section names are retained;
trading/chart/feed report that their controls are not reconstructed. Account,
display and privacy expose only the three specifically mapped definitions, with
their adapters unavailable. Notification labels remain visible as a read-only
local reference regardless of upstream feature flags. The three general settings
and tab names use the exact English strings bound above. Notification wording and
local unavailable-state explanations remain analyst descriptions, not recovered
translation text.
Search includes these mapped notification definitions as a local convenience;
full upstream settings-search coverage is not claimed.

Every preference or subscription value is **unavailable**, not unchecked/off.
The UI does not render an enabled/disabled switch that could be mistaken for
actual account state. It never reads or writes local/session storage, fetches
preferences, subscribes, calls Notification/Push/ServiceWorker permission APIs,
changes cookies, sends messages, connects a wallet or signs anything. Reset and
Save actions are omitted because no corresponding local state is implemented.

## Backend contract boundary

The static bindings identify five website client operations beneath
`/api/hermes/v1`: GET and PUT `user-preferences/settings`, GET
`topic-subscriptions`, and POST `topic-subscriptions/subscribe` and
`topic-subscriptions/unsubscribe`. The PUT client merges current chat/social/coins
objects and partial changes and only submits when current data exists. Mutation
response bodies are ignored; cache updates/invalidation are observed client
behavior, not proof of server persistence.

These paths are not the existing 29 broad settings candidates and do not change
that unreviewed denominator. There are **zero new native handlers, fixture
responses or qualified operations**. Server schemas, error/status/auth/ownership
contracts, idempotency, ordering and production behavior remain unknown. No
synthetic success response or production proxy has been introduced. The existing
compatibility harness's unknown-operation 501 behavior is unchanged.

## Validation

- Passed: nine pure URL/search/model tests via
  `node --experimental-strip-types --test tests/settings_model.test.ts`, also
  run through the integrated `test:settings` script using pinned pnpm 10.24.0.
  The aggregate test command now includes this script.
- Passed: three source-binding/contract tests via
  `node --test tests/settings-contract.test.mjs`, including hashes of all ten
  captured factory ranges.
- Passed: Prettier 3.6.2 formatting for new TypeScript, TSX, CSS and JSON.
- Authored, **not run**: `tests/settings.spec.ts` (frontend Playwright suite).
  It covers malformed queries, deep links, close/history, search/empty states,
  keyboard/focus behavior, four desktop/mobile widths, storage preservation and
  blocked permission/service-worker hooks. Tests must be run after shell integration.
- **Not run**: full build, frontend typecheck, browser screenshots and aggregate
  evidence verification. The pinned frozen frontend install is blocked by the
  active package minimum-release-age policy for `electron-to-chromium@1.5.467`.
  No policy was relaxed and the lockfile was not changed.
- Pinned Next 16.4.1 bundled URL-hook, CSS-module and client-component docs were
  read from an integrity-verified official npm archive extracted as documentation
  only. No dependency-install restriction was bypassed for that read-only step.

Original authenticated screenshots were not supplied. No screenshot comparison,
pixel parity, live settings success, full settings source completion or native
notification compatibility is claimed. All completion milestones depending on
those results must remain pending.
