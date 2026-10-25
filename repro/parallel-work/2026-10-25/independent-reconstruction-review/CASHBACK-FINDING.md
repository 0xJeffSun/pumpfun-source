# Finding: v3 cashback-accept is NOT a gap — the original rejects it (correction)

Earlier reports listed a missing "cashback-accept branch" in buy_v3/sell_v3. That was a
misattribution. Driving the captured original (evidence/original/pump/deployed.so) with a
cashback coin (bonding-curve byte 82 `is_cashback_coin`=1) shows the **original itself
rejects** cashback in all three v3 handlers:
- buy_v3 / sell_v3 / buy_exact_quote_in_v3, on both SOL and USDC/Token-2022 quote paths,
  return `CashbackCoinNotSupported` (error 6094, at trade_v3.rs:150). Non-cashback v3 trades succeed.

The current reconstruction already rejects identically, so there is **nothing to recover** —
adding an accept branch would be a fabricated divergence that fails the oracle.

The genuine cashback-accrual feature (helper `0x6cd78`, errors 6072/6073/6076) belongs to the
**v2/legacy** handlers (its rodata strings are `sell_v2.rs`/`sell.rs`), and is **already
implemented and validated** there (buy_v2.rs/sell_v2.rs/legacy_buy.rs/legacy_sell.rs route the
creator fee to the user_volume_accumulator and increment cashback_earned, consistent with
claim_cashback/claim_cashback_v2).

New oracle `scripts/pump_cashback_accept_differential.py` (18 cases, 0 mismatches vs the
original) validates the v3 reject behavior and the v2 accrual. This resolves the "cashback"
item: not a gap.
