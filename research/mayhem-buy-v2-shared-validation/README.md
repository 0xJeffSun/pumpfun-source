# Mayhem BuyV2: restore the shared trade-validation call

The original BuyV2 body O0083 calls the shared trade validator O0094. The
reconstruction instead duplicated its pause/Clock/rate-limit/state-update logic
inside `buy_v2.rs`, producing different source-bearing errors and panic logs.
This proposal replaces that six-line block with the existing
`a.mayhem_state.validate_trade(&a.global_params)?` call. The five following empty
lines preserve every later source coordinate; no location is invented or forged.

Only `src/instructions/buy_v2.rs` changes. The other fourteen compiler inputs,
including the shared validator, stay byte-identical to the pinned
[Sell-origin source](../mayhem-sell-origin-recovery/README.md) at
`50ac71d933f69fa38b185dbea27937c13c89e3b8`. Canonical program sources, selected
artifacts, original/dependency captures and existing fixtures are untouched.

## Actual call attribution

The complete matched wrapper O0189 binds the original BuyV2 body at 140512 to
the candidate handler. Its ordered direct-call entry identifies the handler;
function size or a nearby address is not used as a substitute.

- Original O0083 calls O0094 at original instruction 140592 (body offset 80).
- The control contains no direct call from its BuyV2 body to that validator.
- The proposal restores one such call, at candidate instruction 86944 (body
  offset 392), targeting the actual 1,192-byte validator at 49496.
- The validator matches the full original O0094 window under the unchanged
  normalization. All nine ordered immediate callee bodies also match in full.

This restores one missing original call relationship. It is **not** a new
complete original-body match or a full call/data closure claim. BuyV2 remains
unmatched: its candidate body changes 13,000→11,928 bytes versus original 18,648.
The differing call offsets remain explicit. All 188 previously examined matches
and the Linux control's 63 raw-local windows are preserved, by set comparison.
O0095 remains unmatched; failed quote-validator source controls were retained
locally and are not represented as recoveries in this packet.

## Fresh local comparisons

The focused 24-case replay covers ordinary success, pause, rate rejection,
equal deadline, future last-trade time, zero interval, interval overflow and
negative Clock time across native SOL, legacy SPL Token and Token-2022 quotes.
Errors, tracked accounts, return data, CPI, signed transaction bytes and all logs
except explicit compute-consumption lines are compared. **12 diagnostic
differences become zero**. Both original and candidate transactions retain normal
signature and blockhash verification; no signer, authority or CPI bypass is used.

The complete existing BuyV2 matrix is freshly run on **both actual Linux
control and proposal**, using the unchanged fixtures and predicates:

| Quote family | Cases per build | Original successes | Non-compute log differences, before→after |
| --- | ---: | ---: | ---: |
| Native SOL | 613 | 284 | 30→26 |
| SPL Token | 613 | 210 | 50→46 |
| Token-2022 | 613 | 210 | 50→46 |

All **1,839 comparisons per build** have equal compared errors, accounts,
events, return data, CPI and transaction bytes. The independent existing receipt
checker verifies **7,356 signature entries** across both builds and reconstructs
successful state/events/CPI and failed-transaction rollback. These are finite
synthetic cases, not exhaustive equivalence or live-chain execution.

There are still **118 non-compute log differences** in the proposal's broader
matrix, and 563 raw-log differences per quote family. The focused and corpus
corrections overlap and must not be added as unique recovered cases. The existing
matrix's normalized-log field has a looser predicate; `corpus-summary.json`
separately recomputes the stricter non-compute and raw-log counts from saved logs.

## Build and platform boundaries

The control and proposal use official Linux x86_64 SDK v1.54 with the stock target
library set and v1.52 stripping. Downloaded publisher archives are SHA-256 pinned
in `toolchains/`. No target libraries are substituted or executable bytes edited.
The public source parent used Darwin: its whole artifact hash is **not reproduced
by this Linux control**. Cross-platform differences are not attributed to this
source patch. The five extra raw-local matches already exist in the Linux
control and receive no new recovery credit here.

Control: `f1fe1103df8b5fa3c4349cfdb884fab89101e59fa1ed9ef843f426f98975c70b`.
Proposal: `6482b3bf2d33ec959fed409d2f6ab996dc4237c77fc81e1b6d8077d4c0ff4545`,
624,248 bytes. Symbols:
`0360cc32dc9f1f127cdff31ca093396905ba2cae77d53b1c2ce49b8facdda3c0`.
The initial builds recompile the root using verified dependencies. A separate
empty-dependency-target build and the published portable builder both reproduce
the proposal's two hashes. Containers have no network, mount source/SDK read-only,
and never mount the original. Source and locked registry bytes are checked around
each build. Full ELF/capture identity remains false.

The later 16-input AMM source-origin integration changes a different handler.
This 15-input proposal does not claim unmeasured composition with it or reuse its
AMM runtime results. The pinned 196-window examined scope remains 188 matched,
eight unmatched and 245 opaque; later scope expansions remain separately credited.

## Reproduce

The default verifier requires Python with `solders==0.27.1`. It checks hashes,
the exact one-file delta, decoded windows/calls and independent signed receipts.
It executes no compiler, VM, RPC or target program. Source materialization refuses
existing destinations; all parent source blobs are already in this repository.

```sh
P=research/mayhem-buy-v2-shared-validation
python3 -I -B "$P/verify.py"
python3 -I -B "$P/verify.py" --variant current --materialize /fresh/current-source
python3 -I -B "$P/verify.py" --materialize /fresh/buy-v2-shared-source
```

Prepare verified SDKs at `/fresh/sdk-1.54` and `/fresh/sdk-1.52` and the locked
registry cache at `/fresh/cargo-home`. Then:

```sh
python3 "$P/build.py" current --work /fresh --source /fresh/current-source --fresh
python3 "$P/build.py" buy-v2-shared --work /fresh --source /fresh/buy-v2-shared-source --fresh
python3 -I -B "$P/probe.py" current --work /fresh
python3 -I -B "$P/probe.py" buy-v2-shared --work /fresh
python3 -I -B "$P/static.py" --builds /fresh/builds --output /fresh/static.json
```

`validation/runtime-build-commands.json` records actual corpus/build commands;
`independent-commands.json` records the successful independent checks. A first
local controller omitted the checker's required `--candidate` argument; those
invocations performed no verification. They were rerun with the exact artifacts,
and only the successful `*-independent.*` receipts support the claims above.
Existing evidence and failed exploratory work remain preserved separately.
