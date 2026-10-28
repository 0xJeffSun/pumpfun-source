# Contracts and compatibility evidence

`developer.openapi.json` is the original public specification. Generated TS types live in `packages/backend/src/generated/`. The 67 public developer operations do not cover the website API.

`internal-operations.json` contains 330 strict static operation candidates with provenance; `internal-route-candidates.json` retains broader regex leads and false positives. Neither is a runtime capture or complete API specification. Many operations are privileged, excluded or shared. Do not probe them automatically.

`public-fixtures.json` contains a dated public price response for an explicit local test path (`/services/frontend/sol-price`). It is historical data, not a live quote. Registration accepts GET/HEAD records with a local absolute path, a separate plain query object containing only string values, an HTTP status from 100 through 599, a non-empty provenance source and an optional plain response-header object containing valid HTTP field names and string values. Invalid records and duplicate canonical method/path/query keys fail before the server is constructed. Replay preserves valid headers and JSON scalar bodies; duplicate incoming query keys and unmatched requests return 501. This fixture mode does not implement authentication or writes and is not native API compatibility.

Every fixture must explicitly provide `body`; use `null` for a JSON null body. Missing or `undefined` bodies fail registration instead of silently replaying an empty successful response.

`routes.json` defines product scope; `coverage.json` records implementation status. Native API operations and visual/behavior-qualified frontend routes remain zero.
