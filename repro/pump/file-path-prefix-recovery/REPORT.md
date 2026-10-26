# Pump: `file!()` workspace-prefix recovery (+5 normalized windows, 0 regressions)

An author-reported build-environment experiment. The retained scores lack an
immutable source revision/map and raw build outputs, so they are an unverified
snapshot rather than independently reproduced evidence. The reconstruction builds `programs/pump` as its
own crate (its `Cargo.toml` declares an empty `[workspace]`), so cargo roots the
crate at itself and `file!()` expands to `src/<module>.rs`. The original path strings are consistent with a monorepo workspace; the
historical workspace recipe has not been established. Its Anchor
error macros captured `programs/pump/src/<module>.rs`. That string, length and
all, is baked into every error site, so the reconstruction's `.text` differs
from the original at a scatter of single bytes across many functions.

Building pump as a workspace member (preserving pump's own `Cargo.lock`) makes
`file!()` emit the monorepo-relative path, flipping **5** instruction windows
from unmatched to normalized-match with **0 regressions**.

## Evidence of the mechanism

The smallest single near-miss, `toggle_mayhem_mode` (672 bytes), differs from
the original in exactly one normalized byte — the immediate of a
`stdw [r10-0x100], IMM` store:

```
original: 7a 0a 00ff 18000000   ; store u64 0x18 = 24
rebuild : 7a 0a 00ff 0a000000   ; store u64 0x0a = 10
```

The preceding `lddw r1, <addr>` loads a string pointer and this store writes its
length — i.e. an Anchor error `Source { filename, line }` `&str`. The original
filename is 24 bytes; the standalone rebuild's is 10:

- `programs/pump/src/lib.rs` → 24
- `src/lib.rs` → 10

Confirmed directly: the original binary contains `programs/pump/src/*.rs` path
strings; the standalone rebuild contains bare `src/*.rs`.

## Result (repo scorer `catalog.py`, vs `evidence/original/pump/deployed.so`)

| Metric | standalone | workspace-member | Δ |
| --- | ---: | ---: | ---: |
| normalized body match | 533 | **538** | +5 |
| direct-call-consistent match | 491 | **500** | +9 |
| without normalized match | 502 | **497** | −5 |
| matched body bytes | 401,032 | **405,304** | +4,272 |
| raw-exact body match | 106 | 106 | 0 |

Raw-exact is unchanged, as expected: raw identity additionally needs the global
function layout (absolute pointer values, call immediates) to line up, which a
local source/build change does not provide.

Flipped windows (all whose module path now matches the original):
`toggle_mayhem_mode` (`lib.rs`), and `QuoteControl::{space, remove_mint,
set_mint_reserves}` + `QuoteControl as AccountDeserialize::try_deserialize`
(`quote_control/state.rs`). See [`flipped-windows.json`](flipped-windows.json)
and [`window-match-before-after.json`](window-match-before-after.json).

## Reproduce

`bash build_prefix.sh <repo-root> <out-dir>` (WSL/Linux; needs the v1.44
platform-tools, auto-fetched by `cargo-build-sbf`). It builds pump in a throwaway
parent workspace with pump's own `Cargo.lock`, so only the `file!()` rooting
changes — deps are untouched.

## Why only 5, and the roadmap to more

Only functions whose **module file path** already matches the original flip once
the prefix is added. The original's module layout (recovered from its embedded
`file!()` strings) differs from the reconstruction's flat split. Paths present in
the original but not the reconstruction, each a cluster of error sites that would
match after the same rename + prefix:

```
buy.rs  sell.rs  trade_v3.rs  extend_account.rs  fee_recipient.rs
pump_quote.rs  multi_hop_curve_swap.rs  admin_set_idl_authority.rs
set_reserved_fee_recipients.rs  sweep_fees.rs
creator/{admin_cto, collect_creator_fee, distribute_creator_fees,
         distribute_creator_fee_v2, distribute_fee_to_holders,
         migrate_bonding_curve_creator, set_creator, set_metaplex_creator}.rs
token_incentives/{claim_token_incentives, init_user_volume_accumulator,
                  volume_accumulator}.rs
util/{constant_product, fee, transfer_fee}.rs
```

Reorganizing the reconstruction's source into this layout (a proposed module
structure suggested by retained path observations) is the follow-up that would flip the error
sites in those modules. This packet does not perform that reorganization.

## Scope and honesty

Build-environment recovery only. No source logic changed, no byte-identity
achieved, no original bytes used as a compiler input. The `file!()` prefix is one
necessary condition among many; the 497 remaining unmatched windows stand.

## Review and caller inputs

`build_prefix.sh` requires an existing repository root and a nonexistent output
path whose parent already exists. Relative output paths are resolved before
changing directories. The caller must record the exact source commit and source
hash map, local modifications, lockfile, selected compiler and strip tools before
claiming a reproduction; this packet does not pin a historical source revision.
The build helper is opt-in and was not run during review. The original report
and script are preserved unchanged in `history/`. The score JSON files remain
unchanged author-reported observations. No `file!()` or `line!()` source
coordinates are forced by this helper, and no source/artifact is selected.
