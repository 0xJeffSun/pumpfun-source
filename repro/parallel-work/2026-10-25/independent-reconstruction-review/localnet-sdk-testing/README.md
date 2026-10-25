# Local pump.fun validator for SDK integration testing

Turnkey offline localnet for exercising an SDK against the reconstructed programs.
All inputs are tracked in this repo; a clean clone can run it.

```sh
bash repro/parallel-work/2026-10-25/independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh
# then point your SDK at http://127.0.0.1:8899  (RPC_PORT=NNNN to change)
```

Loads at canonical mainnet IDs: pump, pump_amm (PumpSwap), pump_fees, mayhem (reconstructed
candidates) + spl_token, spl_token_2022, associated_token, token_metadata (captured
originals). Seeds the captured pump/pump_amm/pump_fees global configs.

**These candidates are behaviorally/ABI identical to mainnet (differential-verified across
tens of thousands of cases) but NOT byte-identical** — see ../BYTE-IDENTICALITY-FUNDAMENTAL-LIMIT.md.
Behavior is what an SDK exercises, so this is valid for integration testing.

## Safe-flow matrix (which flows are drop-in)
- **Fully covered** (bounded differential-verified): create, buy/buy_v2, sell/sell_v2,
  migrate/migrate_v2, all PumpSwap trading + pool-create + liquidity + AMM multi-hop,
  all 31 Fees handlers (collection/sharing/social/buyback/withdraw), quote-control,
  cashback claims, holder-reward distribution.
- **Partial — exercise with care** (specific edge paths diverge): buy_v3/sell_v3 (SOL+USDC
  branch only), create_v2 (Mayhem mode / migrated-parent / deep-nested diverge),
  native multi_hop_curve_swap (two Tokenkeg routes only), sell_v2 with a Token-2022
  transfer-fee quote mint, and pump_amm transfer_creator_fees_to_pump on rent-sized
  destinations (a known candidate bug).
- **Unavailable** (unrecovered/stopped handlers): pump admin_update_token_incentives,
  claim_token_incentives, set_mayhem_virtual_params; mayhem initialize_mayhem_state.
