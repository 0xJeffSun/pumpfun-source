# L39 v3 sell behavior and call-order recovery

`sell_v3` now returns insufficient-token error 6023 before validating a bad buyback account, reloads and synchronizes the whitelist token-account reserves, and puts the user's existing volume totals into both trade-event emissions. These behaviors match the deployed program in the signed cases preserved here. This extends the same logical recovery as [the frozen L33 packet](../pump-l33-v3sell-progress-20261028/README.md) in PR #524; that packet remains unchanged.

This is a one-body patch on [L39, PR #559](https://github.com/lalalune/pumpfun-source/pull/559), commit `44697701d734c93a2e2321e850d62d368627c328`. L39 already supplies the `v3_trade_fees`/`get_fees` routing and original validation Source lines; those are credited to that checkpoint. `source.patch` changes only `trade_v3::sell`. The existing `TradeFees` type, tuple-typed shared event builder, buy handlers and other source files are unchanged.

The original's real helper boundaries also replace the candidate's inline reserve/payment calculations: `post_fee_amount`, `apply_sell`, `accrue_fees`, and the existing quote-transfer helpers execute in the observed order. Quote-mint decimals are read at each payout argument preparation. The volume user's initialization follows the base-token transfer. Event argument evaluation captures the curve, global, volume and key values before computing the net buyback and reading the clock. No unsafe casts, embedded machine code or unused matching helpers are added.

| Evidence | Unchanged native L39 | This candidate |
|---|---:|---:|
| Normalized windows | 1018/1035 | 1018/1035 |
| Raw windows | 166/1035 | 166/1035 |
| Matched text bytes | 1,602,600 | 1,602,600 |
| Sell body, original 6032 B | 6696 B | 6056 B |

There are **zero normalized or raw membership gains or losses** across all 1035 windows. The sell body remains unmatched (651 differing instruction slots); **no new exact window and no whole-ELF identity are claimed**. Native raw counts are compared within this Linux host cohort; L39's published Mac cohort has 168 raw windows.

`call-order.json` authenticates the actual incoming matched `sell_v3` wrapper, whose call at offset 544 reaches the reconstructed body, and all 47 direct outgoing call pairs. Every actual callee body is equal under the repository's existing narrow normalization. The parent body's unmatched status is retained. Normalization masks only existing relocation operands, as implemented in `scripts/pump_compare_function_bytes.py`.

`runtime.json.gz` contains **128 signed paired cases with zero structured mismatches**: all 117 configured-fee sell cases, eight SOL/Token-2022 × whitelist/ordinary × mayhem/normal cases, and three additional baseline witnesses. The two volume witnesses set the serialized user volume fields to 123456, 789012, 345678 and timestamp 2468. Unchanged L39 emits zero volume fields; this candidate matches both original event channels. The compound invalid case requests `2^63` tokens and supplies a bad buyback account: unchanged L39 returns 6057, while the original and candidate return 6023. Both use normal verified transaction signatures and the genuine captured dependency programs. Error, accounts, inner instructions, event payloads and return data are compared. The root coordinator separately handles combined full44 qualification; this packet claims the focused corpus only.

## Verify and reproduce

```sh
python research/pump-l39-v3sell-recovery-20261028/verify.py
python research/pump-l39-v3sell-recovery-20261028/replay.py \
  --candidate research/pump-l39-v3sell-recovery-20261028/candidate.so \
  --baseline research/pump-l39-v3sell-recovery-20261028/control/candidate.so \
  --output /tmp/l39-sell-replay.json.gz
python research/pump-l39-v3sell-recovery-20261028/rebuild.py \
  --base-source research/claude-pump-integration-20261027/r37-layout-39/source/programs/pump \
  --sdk /workspace/toolchains/v1.44 \
  --registry-home /workspace/pumpfun-source-latest/work/pump-l31/baseline-repeat/cargo-home \
  --output /tmp/l39-sell-build
```

`BASE-MANIFEST.json` is the authenticated upstream L39 manifest. The changed source, original control file, exact patch, both ELFs for each build, all-window inventories, comparison, build logs and before/after source receipts are included. `rebuild.py` verifies every base input against that manifest before invoking the repository builder. `build-controller.py` preserves the exact local probe controller and its recorded staging paths; its directory name contains `l38` because the same private target was reused after rebasing to authenticated L39. The receipts and manifest identify the actual L39 inputs.

Both `pump-recovered` and nested `pump-token-ext` were explicitly cleaned and freshly compiled before **each** native linked build, using `--release --target sbpf-solana-solana --manifest-path --offline`, locked offline dependencies, and both `cdylib` and `lib` crate types. Only private generated targets were reused; SDK, registry, original binaries and shared targets were untouched. `target-libraries.json` records a post-build verification of all 25 official SDK target libraries against the independently bound L38 native-control inventory; it is not presented as a pre-build measurement.

## Inherited synthetic source positioning

L39's synthetic Source layout remains explicit. The same real insufficient-token and minimum-output checks occupy original lines 1127 and 1148; the real Overflow closure remains at 1155. The file stays 1295 lines by balancing the existing blank lines. These are disclosed source coordinates, not evidence that the original source text has been recovered verbatim. The shared named/tuple fee-type experiments are excluded from this packet.
