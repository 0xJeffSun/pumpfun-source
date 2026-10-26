# mayhem candidate — reproduced byte-identically from committed main source

**Candidate:** `candidate.so` · sha256 `cbe8c8e71f0c256326cf639f303b3d939244320637531d79041585c9358020e2` · 691,128 B
**Program:** mayhem `MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e`
**Source:** `origin/main` @ `14ec9b5c` — `programs/mayhem` (committed)

## How it was produced
A pristine `git worktree` of `origin/main` was built with the recorded recipe:

```
CARGO_TARGET_DIR=<out>/target RUSTUP_HOME=<isolated> \
cargo build-sbf --manifest-path programs/mayhem/Cargo.toml \
  --tools-version v1.52 --offline --sbf-sdk <sdk> --sbf-out-dir <out>/artifacts -- --locked --offline
```

The resulting `.so` is **byte-identical** (same sha256) to the mayhem build the SDK Mayhem-create flow
ran against.

## What it proves
- **Dispatch 25/25.** All 25 mayhem handlers are present, including the recovered
  **`initialize_mayhem_state`** — the handler `pump::create_v2` CPIs into in Mayhem mode. The prior
  committed candidate (`sell-result-error-main-twentyfour`, 668,640 B) was **24/25 and lacked exactly
  this handler**, so it could not support the create-CPI flow.
- **Behaviorally validated:** `createV2(mayhemMode)` CPIs into this build and the `mayhem_state` PDA is
  created by the CPI (SDK Mayhem flow, 3/3).

## What it does NOT claim
Not byte-identical to the deployed original (777,408 B, sha `a87fa9f8…`); `full_byte_equality` stays
`false`. This promotion is about dispatch completeness + deterministic reproduction from main.
