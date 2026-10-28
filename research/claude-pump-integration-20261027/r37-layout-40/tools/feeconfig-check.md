# L40 fee_config account check (SellV3 / MultiHopCurve), fz-int-pump-L34

Change (fz-P-data-r1-03): `fee_config: Box<Account<'info, RouteFeeConfig>>` (candidate-only wrapper type) ->
`Box<Account<'info, crate::legacy_sell::LegacyFeeConfig>>` (= `crate::pump_fees::accounts::FeeConfig`, generated from
`idls/pump_fees.json`, the type BuyV2 / SellV2 / legacy buy / legacy sell already use) in `trade_v3.rs:66` (SellV3) and
`multi_hop_curve_swap.rs:14` (MultiHopCurve). Constraint attribute unchanged except the bump path:
`#[account(seeds=[b"fee_config", crate::ID.as_ref()], bump=fee_config.bump, seeds::program=<pfee...>)]` (was `fee_config.0.bump`, the same field).

Source-level equivalence (L39 RouteFeeConfig vs the generated FeeConfig):
- owner: RouteFeeConfig::owner() = FEES = pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ = pump_fees IDL address (owner of the generated type).
- discriminator: RouteFeeConfig checked [143,52,146,187,219,123,76,155] = the IDL's FeeConfig discriminator.
- errors: AccountDiscriminatorNotFound (< 8 bytes), AccountDiscriminatorMismatch, AccountDidNotDeserialize (Borsh FeeConfig after the 8 bytes), AccountOwnedByWrongProgram (Account::try_from), ConstraintSeeds: same codes in both.

Binary evidence (harness score + raw-ready on L40):
- 0xdb958 `MultiHopCurve::try_accounts` (6824 B) and 0x3cc8 `Box<T>::try_accounts` (368 B): normalized-equal to the original in L39 and L40; their one raw-ready blocker in L39 was `wrong_call` (they called the candidate-only RouteFeeConfig path); in L40 both are raw-ready, i.e. they call the same callee as the original.
- 0x102578 / 0x105b78 `SellV3::try_accounts` (13824 B / 8128 B), 0x1156f0 `pump_fees::FeeConfig::try_deserialize` (744 B), 0x1159d8 `try_deserialize_unchecked` (1176 B): normalized-equal to the original in L40.
=> The fee_config validation path of SellV3 and MultiHopCurve is the original's code (same owner, discriminator, deserialization, seeds and bump checks, same error codes).

Runtime evidence (44-suite corpus on the exact L40 candidate, `feecases.py r37-layout-40` -> `feeconfig-cases.txt`):
- 37 corpus cases in which the ORIGINAL rejects `fee_config` with an Anchor account error (AccountOwnedByWrongProgram, AccountDiscriminatorNotFound,
  AccountDiscriminatorMismatch, AccountDidNotDeserialize, ConstraintSeeds, InvalidAccountData) across exact_quote_v3 (9), buy (7), sell (7),
  sell_v2 (3), legacy_sell (9) and multi_hop_curve_partial (2): the L40 candidate's logs are identical to the original's in all 37
  (and the structured comparison of the whole corpus has 0 mismatches, 0 state differences).
