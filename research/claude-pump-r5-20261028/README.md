# Main Pump round 5: parallel lane deliveries on L12 (snapshot 2026-10-28)

Thirteen parallel lanes attacked every one of the 128 main-Pump windows left on base **L12**. L12 is `research/claude-pump-integration-20261027/wip-20261028/integ-layout-r37-12`: 907/1035 normalized, 165 raw, a layout composite on Codex Round37, merged in #401. The run is still in progress. This packet collects the **newest cumulative delivery from each lane that had delivered** when the snapshot was taken.

## Status: unverified research, not a promoted package

- Every delivery here was rebuilt with the identity recipe: macOS v1.44 rustc with the official Linux v1.44 `sbpf-solana-solana` target libraries.
- I re-scored each one independently against `L12-inventory` with `harness/score.py`. The results are in `deliveries/*/score-verified.json`. Every delivery has `losses == []` and `raw_losses == []`, and has no SBF stack-offset warnings. Runtime behavior is not qualified by that compiler check.
- **Not done yet:**
  - The deliveries have not been composed into one crate. Their gains cover **53 distinct windows**, so if they compose without conflicts the target is 907 → **960/1035**.
  - The 44-suite captured-loader regression.
  - The repository-builder control.
- Lanes marked "synthetic layout: yes" moved Source sites only through the existing `// layout-pad` blocks. That is the same labelled convention as #396.

## Per-lane deliveries (scored vs L12)

| delivery | normalized vs L12 (907) | raw | new windows | synthetic layout | windows | change |
|---|---|---|---|---|---|---|
| r5-coord-03 | 915 | 165 | +8 | no | 0x178e0 0x57c38 0x60670 0x60878 0x84970 0x84b78 0x857a8 0x14eec8 | all 8 coordinate-only error-closure windows; = r5-coord-02 + buy_v2.rs:983 placement on inlined creator ceil_fee (see README caveat) |
| r5-libinst-06 | 916 | 165 | +9 | no | 0x7890 0xd300 0x1a918 0x58bf0 0x7fde8 0x89b48 0x89ec8 0x94e28 0x95360 | +0x89ec8: get_fees restructured (calls in arms, is_sol_quote bool, use_exotic, let-if override, creator!=default) |
| r5-z00-03 | 910 | 165 | +3 | yes | 0x160d0 0x17cf0 0x19ec8 | +check_token_account 0x160d0 (outlined buy/sell quote-user token account check, named slice deserialize) on top of 0x17cf0/0x19ec8 |
| r5-z01-02 | 909 | 165 | +2 | no | 0x22498 0x2b490 | 0x22498 create_event builder + 0x2b490 collect(): native-first early return with inline signer seeds, require at collect_creator_fee.rs:198 |
| r5-z02-02 | 912 | 165 | +5 | yes | 0x311f8 0x32840 0x33c50 0x38fc0 0x3a7b8 | v1 distribute_creator_fees moved to creator/distribute_creator_fees.rs (3 windows) + set_creator set/sync: no event clone and explicit return Ok(()) in the metaplex branch (data-first emit_cpi error path) -> 0x38fc0, 0x3a7b8 |
| r5-z03-07 | 914 | 165 | +7 | no | 0x3d250 0x414c0 0x42618 0x43060 0x47e28 0x48128 0x48e10 | migrate v1 split + fund_bonding_curve_rent in extend_account.rs; +0x3d250 +0x414c0 +0x42618 +0x43060 +0x47e28 +0x48128 +0x48e10 |
| r5-z04-01 | 908 | 165 | +1 | no | 0x4e208 | 0x4e208 matched: migrate_v2 base-token transfer bonding_curve->pool_authority ATA extracted as #[inline(never)] transfer_base_to_pool_authority(a,bump) using anchor_spl::token_2022::transfer_checked via an #[inline(always)] seeded helper (seeds passed as call argument, typed &InterfaceAccount/&Accou |
| r5-z05-04 | 918 | 165 | +11 | no | 0x58668 0x60a80 0x61348 0x617e8 0x62170 0x63940 0x64358 0x645f8 0x64888 0x65238 0x65eb0 | r5-z05-03 plus vault_amount (0x64888): owner check via [&token::ID,&token_2022::ID].iter().any(/id/ owner == *id) and early return Ok(amount) when data.len()==165 before require_eq!(data[165], 2) at :378 |
| r5-z06-02 | 909 | 165 | +2 | no | 0x722d0 0x746a8 | 0x722d0 update_buyback_config (set_reserved_fee_recipients.rs) + 0x746a8 admin_update_token_incentives: mint key bound before Clock::get, explicit return Ok(()) after msg! |
| r5-z07-02 | 909 | 165 | +2 | no | 0x7b250 0x834c8 | cumulative: r5-z07-01 (exact_input_tokens 0x834c8) + sync_user_volume_accumulator handler (0x7b250) rewritten in the original's form (accounts bound before Clock::get, before/after around a reset helper, msg! when unchanged, single event for emit!/emit_cpi!) |
| r5-z08-03 | 911 | 165 | +4 | no | 0x8eda0 0x94908 0x94e28 0x95360 | multi-hop sell payout via transfer_quote_out (anchor token_2022::transfer_checked helper, 0x8eda0) |
| r5-z09-01 | 911 | 165 | +4 | no | 0x7890 0x82128 0x84970 0x84b78 | v3 buy decomposed into original helpers: +0x82128 +0x84970 +0x84b78 +0x7890 |

Each delivery contains:
- `patch.diff`: a `diff -ruN` against L12's `src`. Apply it to `integ-layout-r37-12/src` to rebuild.
- `unstripped.so`, `candidate.so`, `build.log`, `delivery.json` and the lane's `README.md`, which gives the binary evidence for each change.

## Other files

- `lanes/*-PROGRESS.md`: every window's status and diff, and every strategy each lane tried, including the negative results.
- `INSIGHTS-R5.md`: the shared insight log the lanes wrote while working.
- `L12-triage.json`: the categories of the 128 windows L12 started with.

## Reproduce a score

Run these from the claude-pump-work harness that #401 committed under `research/claude-pump-integration-20261027/wip-20261028/harness`:

```
python3 harness/score.py deliveries/<d>/unstripped.so --baseline <L12 inventory>
```

## Next

1. Compose all the deliveries onto L12 as `integ-layout-r37-13`.
2. Build that composite with the identity recipe.
3. Run the 44-suite regression and the builder control.
4. Promote it, following #396/#384.
