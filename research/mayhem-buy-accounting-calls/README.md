# Mayhem shared post-buy accounting calls

Original Legacy Buy (O0081) and BuyV2 (O0083) call the same post-CPI accounting
and risk-check function O0090 as BuyPumpSwap (O0077). The pinned reconstruction
used that shared function only for BuyPumpSwap and duplicated its logic in the
other two handlers. This patch connects both handlers to the existing
`state::record_amm_buy`, using the zero mint for legacy SOL and the actual quote
mint for BuyV2. It retains signed i128 accounting, positive-only risk checks,
low-u64 truncation and strict upper bounds. Later source coordinates are retained.

This is **two restored direct calls and 116 corrected diagnostic cases**,
not a new complete-body match. O0090 itself remains 2,536 candidate bytes against
2,544 original bytes. Its source is unchanged. Credit for recovering that shared
source belongs to the earlier [AMM source-origin work](../mayhem-amm-source-origins/README.md).
The original captures, canonical source/checkpoints and existing harnesses are unchanged.

## Exact source and static evidence

The parent is the native Program plus BuyV2 validation composition at
`6fc97b8a` (full revision and all paths/hashes in `parent.json`). All 54 inputs
are authenticated: 16 root inputs and 38 inherited vendor files. Only two
handler blocks change; `source.patch` and `override/` contain the complete delta.
The earlier native Program vendor change is inherited without alteration.

The complete matched wrappers O0187/O0189/O0191 independently identify the three
handler entries. The original O0081/O0083/O0077 each calls O0090 once. Before this
patch only the candidate AMM handler calls its counterpart; after it all three do.
All twelve ordered immediate callees of the accounting helper have complete
matching normalized bodies. This does not prove transitive calls or data closure.
`static.py` recomputes every window with the unchanged, pinned parser, compares
allocated sections of stripped/symbol artifacts and preserves exact match-ID sets.
All **343 Linux-control matches and 63 raw-local windows** remain. The public
Darwin parent has 341 matches and 58 raw-local windows; the additional Linux
matches already occur in the control and are not credited to this source patch.
No handler, O0090, full ELF or complete capture becomes equal.
The later `fa9dae66` full-curve recovery changes only `sell.rs`, leaving these two
handler inputs unchanged. Its distinct source delta is not duplicated here; a
combined curve/accounting artifact is not claimed tested in this packet.

## Reproduction and local validation

`OverallRiskExceeded` reproduced at original `state.rs:243` versus baseline
`buy.rs:97` / `buy_v2.rs:114`; the coin risk error similarly used the handler's
local location instead of original `state.rs:250`. In each corrected case the
proposal now retains the original non-compute logs, including compared values.
Only exact compute-consumption lines are removed for these counts. The existing
harness's broader log normalization is not used to claim this improvement.

| Corpus | Cases per build | Control non-compute differences | Proposal differences |
| --- | ---: | ---: | ---: |
| legacy | 486 | 30 | 10 |
| native | 613 | 26 | 6 |
| token | 613 | 46 | 8 |
| token22 | 613 | 46 | 8 |

Both control and proposal replay all **2,325** changed-handler cases against the
original. A further **1,257** proposal AMM cases retain zero non-compute differences.
Together these are **5,907 fresh pair comparisons and 11,814 verified signature
entries**. All compared errors, signed transactions, tracked before/after accounts
(except the different executable), CPI instructions, return data and events agree.
The three existing independent receipt checkers recompute quote/CPI, complete
successful account/event outcomes and failed-transaction rollback. Cases include
negative/zero/positive signed counters, u64-limb truncation, risk equality and both
limits failing, overflow, ordinary successes and admission failures. Token-2022
AMM cases cover rejection, not successful swaps.

Non-compute differences fall **148 to 32**, with no newly differing case.
Remaining source/panic and raw compute differences are preserved in the full
records. Original records are compared byte-for-byte as JSON values across the
two replay runs. The initial Python `-I` runtime launch failed during fixture
imports, before target execution; its logs remain in local work storage. Successful
runtime commands use `-B`, and independent offline checkers use `-I -B`.

The Linux v1.54 compiler and v1.52 stripper are verified against pinned tool hashes
and release-archive digests in `toolchains/`. Compilation uses the pinned Docker
image with network disabled, a private authenticated Cargo cache, read-only source
and SDK mounts, and no original binary mount. Root, all-dependency-clean and
portable-controller builds reproduce the proposal:

- Candidate: `10c241ed2daf82f575fb5cccbab5a8619d3d75ca5ab81485332c2a27f957cad9` (620,864 bytes).
- Symbols: `30ba4ddeaa9c3b2ac69948245150b877cff77b89c8f80b6afacdb2ad83880440`.

## Commands

The default verifier is offline and does not execute a compiler, VM or RPC:

```sh
python -I -B research/mayhem-buy-accounting-calls/verify.py
python -I -B research/mayhem-buy-accounting-calls/verify.py --materialize /scratch/accounting-source
```

For a new local build, prepare the two pinned Linux SDK directories and a private
Cargo cache matching Cargo.lock, as in the retained launches. A pinned Docker image
must already be available. Then use a new output label:

```sh
python research/mayhem-buy-accounting-calls/build.py --work /scratch/accounting-work rebuilt --source /scratch/accounting-source --fresh
```

The default verifier refuses to overwrite a source destination. The builder refuses
to overwrite a build label. `validation/commands.json` records every successful
replay/check command; `builds/*/launch.json` records the complete actual build argv,
environment, source map and dependency checksums. JSON and compressed receipts retain
full before/after evidence. Saved launch paths are historical; portable arguments
allow independent paths. Local synthetic accounts use ordinary signer/blockhash
verification and the genuine Mayhem PDA for the Pump CPI. No live transactions,
privileged signer substitutions or executable byte patching were used.
