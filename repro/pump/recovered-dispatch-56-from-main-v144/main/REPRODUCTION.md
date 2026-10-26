# pump candidate — reproduced byte-identically from committed main source

**Candidate:** `candidate.so` · sha256 `5392c9a953db572bf5b1096aa6e3888b4bfaf318a6621fabb525c7dd9174d366` · 1,671,184 B
**Program:** pump `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P`
**Source:** `origin/main` @ `14ec9b5c` — `programs/pump` (committed)

## How it was produced
A pristine `git worktree` of `origin/main` was built with the recorded recipe:

```
CARGO_TARGET_DIR=<out>/target RUSTUP_HOME=<isolated> \
cargo build-sbf --manifest-path programs/pump/Cargo.toml \
  --tools-version v1.44 --offline --sbf-sdk <sdk> --sbf-out-dir <out>/artifacts -- --locked
```

`pump` is its own `[workspace]` root with its own `Cargo.lock` (anchor-lang / anchor-spl `=0.31.1`), so it
builds standalone. The resulting `.so` is **byte-identical** (same sha256) to the build the `@pump-fun`
SDK localnet integration ran against — i.e. the promoted candidate is deterministically regenerated from
the committed source, not a one-off artifact.

## What it proves
- **Dispatch 56/56.** All 56 pump IDL discriminators are present, including the three recovered handlers
  that the prior committed candidate (53/56) lacked: `claim_token_incentives`,
  `admin_update_token_incentives`, `set_mayhem_virtual_params`. (Scanner validated against
  `evidence/original/pump/deployed.so`, which reads 56/56.)
- **Behaviorally validated** by the committed SDK harnesses (v2 6/6, v3 SOL, incentives admin/claim,
  Mayhem create, AMM) on `solana-test-validator`.

## What it does NOT claim
Not byte-identical to the deployed original (10,485,715 B, sha `7a19affa…`). Lost source
structure/inlining cannot be recovered from the stripped binary; `full_byte_equality` stays `false`.
This promotion is about **dispatch completeness + deterministic reproduction from main**, not byte equality.
