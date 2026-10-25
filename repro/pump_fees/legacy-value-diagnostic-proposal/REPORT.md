# Legacy payout comparison payload: next source correction

The accepted legacy payout code uses `require_keys_eq!`, which decorates the
error with raw public keys. The original shared payout window calls the complete
helper at 1008 through instruction 203080. That helper has two error-variant arms
and formats both compared keys into owned string values. The retained Anchor
`Error::with_values` API provides that behavior; `with_pubkeys` does not.

This one-check proposal preserves account availability, key equality, error code,
executable filtering, vector ownership and payout order. It changes the mismatch
payload to `error!(...).with_values((actual, expected))`. The full before/after
module, exact patch, original windows and Anchor source/crate are retained.

The V2 composition review exposed this remaining gap in the preceding legacy
checkpoint; its earlier passes do not prove this diagnostic/ownership boundary.
This packet does not change main, compile, execute a program or add fixtures.
The precise historical syntax, source coordinates, full formatting call/data
closure and byte identity remain unproven. One isolated pinned build, fresh
complete inventories and all existing 17,461 comparisons are required before
promotion. Do not copy historical line numbers or modify compiled bytes.
