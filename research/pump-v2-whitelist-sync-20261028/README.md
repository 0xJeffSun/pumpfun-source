# Recover v2 whitelist reserve synchronization

The L38 ordinary `buy_v2` and `sell_v2` reconstructions omit the original
whitelist branch that reloads both base token accounts and synchronizes the
curve's virtual quote reserve. In an active mayhem curve, a normally signed
whitelisted trade therefore leaves the wrong curve state and emits the wrong
trade event. This package restores that branch and its surrounding typed trade
flow in both handlers.

The source is based on the complete 65-file L38 standalone primary from
[PR #527](https://github.com/lalalune/pumpfun-source/pull/527), head
`c48c33e7c4efd7c1b7a1c038323e4911b631fb20`, staged as an actual `programs/pump`
workspace. Only `src/buy_v2.rs` and `src/sell_v2.rs` change. The exact-quote v2
handler and shared helpers retain their L38 source. This is an isolated source
snapshot for integration, not an update to a stale maintained-source baseline.

## Observed correction

The focused harness runs 18 original/baseline/candidate triples using ordinary
owned-key signatures, signature verification enabled, genuine captured fee and
token dependencies, and the captured main-program upgradeable-loader accounts.
The synthetic Global explicitly grants the test signer the whitelist role;
this does not establish production reachability. Every original transaction
succeeds, every triple has identical signed transaction bytes, and all 54 outer
signatures are verified. No signature bypass or direct PDA signature is used.

Six active whitelist/mayhem cases differ in the L38 baseline and agree in the
candidate across account state, event bytes, and inner instructions. The 12
ordinary/non-mayhem controls continue to agree. Representative resulting
virtual quote reserves are:

| Trade and quote | Original | L38 baseline | Recovered |
|---|---:|---:|---:|
| Buy, native | 20,730,013,980 | 30,000,041,940 | 20,730,013,980 |
| Buy, Token or Token22 | 20,758,965 | 30,000,041,940 | 20,758,965 |
| Sell, native | 20,729,966,021 | 30,000,013,981 | 20,729,966,021 |
| Sell, Token or Token22 | 20,701,016 | 30,000,013,981 | 20,701,016 |

The existing 216-case buy/exact-quote and 206-case sell corpora also pass with
the captured loader. Raw transactions, logs, state, events, inner instructions,
input hashes, and loader receipts are retained in `evidence/`.

## Source and byte evidence

The original call sites establish `apply_buy` / `apply_sell`, the whitelist
reload/sync calls, individual ATA admissions, transfer-fee object helpers,
typed quote-payment helpers, and event reuse. Those actual operations replace
the older array loops and inline reserve arithmetic. Sell retains the original
buyback-first recipient order. Existing error sites retain their source lines;
the native-buy quote-mint check is placed at its observed line 369. Blank lines
preserve these actual source coordinates; no byte embedding or unused helper
is introduced. The patch against the L38 workspace is `evidence/l38-v2.patch.gz`.

| Native v1.44 source build | L38 control | Recovered |
|---|---:|---:|
| Normalized original windows | 1018 / 1035 | 1018 / 1035 |
| Raw original windows | 166 | 183 |
| Ordinary buy body | 17,960 B | 15,424 B |
| Ordinary sell body | 15,256 B | 14,104 B |

The normalized membership is identical: no gains and no losses. The 17 raw
gains are a consequence of the changed linked layout, not newly recovered
handler bodies. Original buy is 15,480 B and original sell is 13,976 B; both
handlers remain unmatched. Exact-quote v2 is also unmatched. Whole-ELF identity
is not established. Comparison uses the repository's unchanged narrow masking
of internal calls and actual ELF pointers.

Candidate SHA-256:
`b41306ead92b6e228cb41600a036a9d26442c2d3af9caf3f4c6876ccd29394eb`.
Unstripped SHA-256:
`ca17d1b8a7cb0a9e0b0af25ab5ee4e191e0f0ebaa5e232e42b202c7b17618701`.

## Reproduce

`build.py` requires the installed unmodified v1.44 SDK and a populated offline
registry. It verifies the compiler, Cargo, objcopy, and registry canonicalizer
hashes, records source and SDK-library hashes, and explicitly cleans the native
target before requiring fresh compilation of both local crates. An optional
dependency seed is copied into a new owned target; it is never modified.

```sh
python3 research/pump-v2-whitelist-sync-20261028/build.py \
  --repo . --sdk /path/to/v1.44 --cargo-home /path/to/cargo-home \
  --output /path/to/new-build
python3 research/pump-v2-whitelist-sync-20261028/verify.py \
  --repo . --candidate /path/to/new-build/unstripped.so
python3 research/pump-v2-whitelist-sync-20261028/qualify.py \
  --repo . --baseline /path/to/L38/candidate.so \
  --candidate /path/to/new-build/candidate.so --output /path/to/focused.json.gz
```

`verify.py` also runs without arguments to verify the retained source and
evidence. The source build does not read the original executable as compiler
input. ELF artifacts and disposable targets are not committed.
