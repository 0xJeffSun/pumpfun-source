# Contracts and compatibility evidence

`developer.openapi.json` is the original public specification. Generated TS types live in `packages/backend/src/generated/`. The 67 public developer operations do not cover the website API.

`internal-operations.json` contains 330 strict static operation candidates with provenance; `internal-route-candidates.json` retains broader regex leads and false positives. Neither is a runtime capture or complete API specification. Many operations are privileged, excluded or shared. Do not probe them automatically.

`public-fixtures.json` contains a dated public price response for an explicit local test path (`/services/frontend/sol-price`). It is historical data, not a live quote. Replay supports GET/HEAD with unique string query keys only; duplicate keys and unmatched requests return 501. It does not yet match headers/auth/body or implement writes.

`routes.json` defines product scope; `coverage.json` records implementation status. Native API operations and visual/behavior-qualified frontend routes remain zero.
