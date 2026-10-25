# ATA + Metaplex commit search — results (bounded, exhausted)

_2026-10-25. Executed the user-approved search for the exact deployed upstream commits of the
two public-source dependencies, built in their official solana-verifiable-build images on CI and
compared byte-for-byte against the captured mainnet binaries. Two passes, 14 build attempts.
Outcome: no byte-identical commit found; both deployed binaries are proven NOT to be plain
public release builds._

## ATA (associated_token) — deployed version pinned to v1.1.1; residual is sub-version
CI run 40226320502. Image `ee9ad780` (Rust 1.59, `cargo build-bpf`), original 105,032 B.

| commit | version | result |
|---|---|---|
| f5ce86d4 (current pin) | v1.1.0 | built, `diff@28601` |
| **1420b559** | **v1.1.1** | built, **`diff@5404`** (= the known best residual) |
| 979fdc8b | v1.1.2 | BUILD-FAIL (workspace manifest incompatible with the image) |
| 73673b6b | v1.1.3 | BUILD-FAIL (same) |

Conclusion: the deployed ATA is **v1.1.1** (it alone reproduces the known `diff@5404`), and
v1.1.2/v1.1.3 cannot be built in the mainnet verifiable image, so the deployed program is ≤ v1.1.1.
The remaining 1,506 B is a sub-version difference — a build-config or `Cargo.lock` dependency pin
(ATA links `spl-token-2022`), not a version mismatch. Not closable without the deployed lockfile.

## Metaplex (token_metadata) — no public release or feature reproduces it
CI runs 40226320502 (clean) + 40227368437 (features). Image `43206149` (Rust 1.69, `build-sbf`),
original 793,991 B (content ≈ 707,448 B).

| commit | version | clean | `--features resize` | `--features resize,padded` |
|---|---|---|---|---|
| 17e99434 (current pin) | immutability merge | 705,640 B, `diff@24` | — | — |
| 7c95f994 | proposal v1.15.0 | 706,136 B, `diff@24` | 706,136 B, `diff@24` | 706,136 B, `diff@24` |
| 7c1c905f | proposal v1.14.1 | 705,400 B, `diff@24` | 705,400 B, `diff@24` | 705,400 B, `diff@24` |
| 4e5bcca4 | proposal v1.14.0 | 667,096 B, `diff@24` | no `resize` feature | no feature |
| 5cd48b4a | proposal v1.13.3 | 630,728 B, `diff@24` | no `resize` feature | — |
| 5beae6c8 | proposal v1.13.2 | 630,728 B, `diff@24` | no `resize` feature | — |

Conclusions:
- **Every clean/feature build is smaller than the deployed binary** (max 706,136 B vs 707,448 B
  content) and diffs at byte 24 — none matches size, let alone bytes.
- The pinned `17e99434` is an **arbitrary "immutability" merge commit, not a release** (its crate
  version is still `1.14.0`); v1.15.0 is the newest mainnet-beta proposal and it does not match.
- The `resize` instruction is a **red herring**: in v1.15.0 it is **always compiled**
  (`processor/mod.rs` dispatches `MetadataInstruction::Resize` unconditionally; the `resize`/`padded`
  Cargo features are empty `[]` no-ops), and `programs/token-metadata/Cargo.toml` is a `[workspace]`
  that resolves to the same build as the `program/` crate. So `--features resize` changes nothing,
  and the deployed program's extra ~1.3 KB is **not** a feature toggle. Given the deployed binary
  links spl-token-2022 with its full extension set, the residual is a **dependency/inter-release
  provenance** delta (a different pinned spl-token-2022 / mpl-utils / auth-rules in the deployed
  `Cargo.lock`, or an inter-release commit), which `--locked` against the public lockfile cannot
  reproduce.
- The only build that reaches the deployed *size* (707,448 B) is `17e99434` + the team's
  behaviorally-recovered **source patch** (a hypothesis), which lands `diff@238802` (1,509 B off) —
  closer than any clean release but still not byte-equal.

**The deployed Metaplex program is not a plain build of any public release tag or feature
combination.** It carries code beyond any clean public build; reproducing it needs the exact
deployment source/recipe (a specific commit on a non-release branch, a private modification, or
the authentic `Cargo.lock`), which is not in the public release tags, the verified-build
registries (OtterSec has no record), or the obvious feature flags.

## Net
Bounded search exhausted. Byte-identicality still 2/6 artifacts. ATA is one sub-version build-config
away (deployed = v1.1.1); Metaplex needs its non-public exact source. Both remain provenance-bounded
— the method works (SPL Token/Token-2022), but only with the exact deployment inputs.
