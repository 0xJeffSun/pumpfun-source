# Complete admitted-source coverage ledger

All line ranges below are inclusive and relative to the named frozen source. Byte ranges and SHA-256 digests are in inventory.json and coverage.json. A reviewed row is not a vulnerability clearance. The seven named dimensions resolve through each function’s assessment group below. Closures are covered in their enclosing body; generated defaults and macro bodies remain unresolved.

## Per-file inventory

| File | Explicit functions | Structs/enums | Status |
|---|---:|---:|---|
| `programs/mayhem/Cargo.lock` | 0 | 0 | documentation or dependency declaration review; dependency implementation not audited |
| `programs/mayhem/Cargo.toml` | 0 | 0 | documentation or dependency declaration review; dependency implementation not audited |
| `programs/mayhem/README.md` | 0 | 0 | documentation or dependency declaration review; dependency implementation not audited |
| `programs/mayhem/src/checked_program.rs` | 11 | 4 | manual source review |
| `programs/mayhem/src/instructions/burn.rs` | 1 | 3 | manual source review |
| `programs/mayhem/src/instructions/buy.rs` | 2 | 2 | manual source review |
| `programs/mayhem/src/instructions/buy_pump_swap.rs` | 2 | 1 | manual source review |
| `programs/mayhem/src/instructions/buy_v2.rs` | 2 | 1 | manual source review |
| `programs/mayhem/src/instructions/mod.rs` | 0 | 0 | manual source review |
| `programs/mayhem/src/instructions/pump_swap_types.rs` | 8 | 3 | manual source review |
| `programs/mayhem/src/instructions/sell.rs` | 5 | 4 | manual source review |
| `programs/mayhem/src/instructions/sell_pump_swap.rs` | 2 | 1 | manual source review |
| `programs/mayhem/src/instructions/sell_v2.rs` | 2 | 1 | manual source review |
| `programs/mayhem/src/lib.rs` | 25 | 15 | manual source review |
| `programs/mayhem/src/state.rs` | 1 | 3 | manual source review |

## programs/mayhem/src/checked_program.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 18–23 | `try_from` | framework / not applicable | Checks System ID first with account-name error then delegates executable/type validation. |
| 27–37 | `try_accounts` | framework / not applicable | split_first reports missing key; advances slice then invokes checked conversion; no persistent mutation. |
| 41–43 | `to_account_metas` | framework / not applicable | Delegates optional signer override meta conversion to underlying Program. |
| 46–46 | `to_account_infos` | framework / not applicable | Delegates account infos; same underlying program account. |
| 49–49 | `as_ref` | framework / not applicable | Borrowed reference to same program account; no mutation. |
| 53–53 | `deref` | framework / not applicable | Deref exposes same AccountInfo; wrapper does not create a signer. |
| 57–57 | `key` | framework / not applicable | Returns underlying program pubkey without transformation. |
| 66–68 | `to_account_metas` | framework / not applicable | Client shape emits exactly one readonly nonsigner System account; ignores override. |
| 75–77 | `to_account_metas` | framework / not applicable | CPI client shape emits exactly one readonly nonsigner account; ignores override. |
| 80–80 | `to_account_infos` | framework / not applicable | CPI client clones exactly one AccountInfo. |
| 85–85 | `duplicate_mutable_account_keys` | framework / not applicable | Reports no duplicate mutable keys for readonly program wrapper; no claim for other contexts. |

## programs/mayhem/src/instructions/burn.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 38–65 | `handler` | burn / BurnTokens | Deadline then status guard, burns complete vault, stores amount, logs and self-emits, then sets Ended; no pause or signer check in body. |

## programs/mayhem/src/instructions/buy.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 52–52 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 53–101 | `handler` | trade / LegacyBuy | 18-account Pump buy; u64 desired input capped to real tokens, quote budget output; trailing zero option. Maps Pump errors to 6008; actual SOL spent measured before/after; positive low limb risk tests after CPI. |

## programs/mayhem/src/instructions/buy_pump_swap.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 72–72 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 73–129 | `handler` | trade / BuyPumpSwap | 25-account AMM buy; effective quote checked i128 then u64 conversion; no real-token cap. Native funding, SyncNative opcode17, AMM CPI, CloseAccount opcode9; buyback pair preserves outer flags; rent can reverse measured unsigned spend. |

## programs/mayhem/src/instructions/buy_v2.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 68–68 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 69–118 | `handler` | trade / BuyV2 | 27-account Pump buy-v2; native balance branch only for WSOL, native risk branch also includes zero Pubkey. Reload quote vault only for nonnative; maps CPI error 6008; real token cap and strict post-CPI risk. |

## programs/mayhem/src/instructions/pump_swap_types.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 29–29 | `owner` | codec / not applicable | Owner returns fixed AMM_ID for SwapPool. |
| 32–38 | `try_deserialize` | codec / not applicable | Pads any short input to287 before discriminator check; Borsh body enforces bools; bytes beyond struct allowed; cursor local. |
| 39–42 | `try_deserialize_unchecked` | codec / not applicable | Pads to287 and skips discriminator comparison deliberately; callers must use correct checked/unchecked entry. No outer cursor advance. |
| 45–45 | `try_serialize` | codec / not applicable | Writes Pool discriminator then Borsh fields; maps I/O failures to AccountDidNotSerialize. External owner means no assumed Mayhem writeback. |
| 62–62 | `owner` | codec / not applicable | Owner returns fixed AMM_ID for SwapGlobalConfig. |
| 65–69 | `try_deserialize` | codec / not applicable | Fewer than8 gives DiscriminatorNotFound, wrong discriminator gives mismatch with GlobalConfig account name, then delegates. |
| 70–73 | `try_deserialize_unchecked` | codec / not applicable | Rejects fewer than8, decodes strict old418-byte total struct via local body cursor; no padding, trailing bytes tolerated. |
| 76–76 | `try_serialize` | codec / not applicable | Writes GlobalConfig discriminator then Borsh fields; I/O errors mapped, does not establish original serializer body equivalence. |

## programs/mayhem/src/instructions/sell.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 54–54 | `owner` | codec / not applicable | Owner returns fixed PUMP_ID; no address check inside decoder. |
| 57–57 | `try_deserialize` | codec / not applicable | Checked entry delegates to unchecked entry, which itself checks discriminator and booleans; outer cursor not advanced. |
| 58–64 | `try_deserialize_unchecked` | codec / not applicable | Copies min(len,141) into zero buffer; discriminator at0..8, bool offsets48/81/82/123/124, only four reserve u64s returned. Extra bytes ignored; no outer cursor advance. |
| 66–66 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 67–109 | `handler` | trade / LegacySell | 16-account Pump sell; input solves output with vs-output denominator; minimum=output.saturating_sub(1). CPI error propagates directly; measured SOL receipt lowers counters; no buy risk predicate. |

## programs/mayhem/src/instructions/sell_pump_swap.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 68–68 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 69–115 | `handler` | trade / SellPumpSwap | 23-account AMM sell; effective quote checked i128 then u64; minimum output-1. Closes native quote ATA to vault after CPI so rent/preexisting WSOL count as receipt; tail pair forwards flags; no buy risk check. |

## programs/mayhem/src/instructions/sell_v2.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 66–66 | `math` | error / not applicable | Pure MayhemError::MathOverflow.into() shared locally by price/counter failure paths. |
| 67–112 | `handler` | trade / SellV2 | 26-account Pump sell-v2; WSOL branch vs native-accounting zero-key split retained. Maps CPI error to 6008, unlike legacy sell; minimum output-1 and measured receipt. Excluded Pump implementation not reviewed. |

## programs/mayhem/src/lib.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 24–24 | `buy_pump_swap` | trade / BuyPumpSwap | Entry delegates unchanged Context/reference/u16 arguments to instructions::buy_pump_swap::handler; 25-account AMM buy; effective quote checked i128 then u64 conversion; no real-token cap. Native funding, SyncNative opcode17, AMM CPI, CloseAccount opcode9; buyback pair preserves outer flags; rent can reverse measured unsigned spend. |
| 25–25 | `sell_pump_swap` | trade / SellPumpSwap | Entry delegates unchanged Context/reference/u16 arguments to instructions::sell_pump_swap::handler; 23-account AMM sell; effective quote checked i128 then u64; minimum output-1. Closes native quote ATA to vault after CPI so rent/preexisting WSOL count as receipt; tail pair forwards flags; no buy risk check. |
| 26–26 | `buy_v2` | trade / BuyV2 | Entry delegates unchanged Context/reference/u16 arguments to instructions::buy_v2::handler; 27-account Pump buy-v2; native balance branch only for WSOL, native risk branch also includes zero Pubkey. Reload quote vault only for nonnative; maps CPI error 6008; real token cap and strict post-CPI risk. |
| 27–27 | `sell_v2` | trade / SellV2 | Entry delegates unchanged Context/reference/u16 arguments to instructions::sell_v2::handler; 26-account Pump sell-v2; WSOL branch vs native-accounting zero-key split retained. Maps CPI error to 6008, unlike legacy sell; minimum output-1 and measured receipt. Excluded Pump implementation not reviewed. |
| 28–28 | `buy` | trade / LegacyBuy | Entry delegates unchanged Context/reference/u16 arguments to instructions::buy::handler; 18-account Pump buy; u64 desired input capped to real tokens, quote budget output; trailing zero option. Maps Pump errors to 6008; actual SOL spent measured before/after; positive low limb risk tests after CPI. |
| 29–31 | `sell` | trade / LegacySell | Entry delegates unchanged Context/reference/u16 arguments to instructions::sell::handler; 16-account Pump sell; input solves output with vs-output denominator; minimum=output.saturating_sub(1). CPI error propagates directly; measured SOL receipt lowers counters; no buy risk predicate. |
| 32–34 | `burn_tokens` | burn / BurnTokens | Entry delegates Context unchanged to burn::handler; no additional body check. |
| 35–39 | `sweep_fees` | sweep / SweepFees | Chooses native vs stable aggregate cap from quote key; helper destination trader/ATA, admin=false; Clock and both events after helper. |
| 40–43 | `sweep_fees_admin` | sweep / SweepFeesAdmin | Helper destination admin/ATA, u64::MAX cap, admin=true; preserves recipient timestamps; events after all pairs. |
| 44–59 | `withdraw_quote_admin` | withdraw / WithdrawQuoteAdmin | Reads signed offsets 238/230; writes timestamp then calls legacy token transfer helper. Interface type alone does not establish Token2022 support. |
| 60–78 | `withdraw_admin` | withdraw / WithdrawAdmin | Reads signed offsets 138/154, writes current time before System transfer from sol-vault to admin; no pause, rent reserve, or deployment-counter adjustment. |
| 79–116 | `extend_account` | extend / ExtendAccount | Discriminator dispatch chooses 318/74/170; no-op when already large; funds rent shortfall, resizes, emits. No full decode or canonical key test. |
| 117–122 | `initialize_fee_recipient` | bootstrap / InitializeFeeRecipient | Body checks index<8 then stores canonical bump and index; does not write caller beneficiary. Pre-body init effects roll back on rejection. |
| 123–126 | `initialize_global_params` | bootstrap / InitializeGlobalParams | Assigns payer key to admin only. Canonical PDA creation via framework, live first-initialization ownership not established. |
| 127–168 | `update_global_params` | admin / Admin | Sixteen bounded optional writes; all-None still increments checked u32 version; event reads resulting full field set and emits both forms. Last+interval signedness belongs to consumers. |
| 169–172 | `update_admin` | admin / Admin | Stores arbitrary new_admin; no new key signature, zero-key rejection, event or version increment. Authorized rotation policy unresolved. |
| 173–176 | `update_trader` | admin / Admin | Stores arbitrary new_trader; no acceptance or counter reset. New configured signer controls trades and trader sweeps. |
| 177–180 | `update_max_sol_per_sweep` | admin / Admin | Writes full u64 native per-invocation sweep cap; admin sweep deliberately ignores this cap. |
| 181–184 | `update_max_stable_per_sweep` | admin / Admin | Writes full u64 shared nonnative per-invocation cap; no decimal normalization. |
| 185–188 | `reset_sol_deployed` | admin / Admin | Sets global i128 SOL counter to zero only; per-coin counters and assets unchanged. |
| 189–192 | `reset_stable_deployed` | admin / Admin | Sets global i128 nonnative counter to zero only; later sells can make it negative. |
| 193–203 | `reset_state` | admin / Admin | Zeros four byte regions and both counters and unpauses; preserves roles/version, preserved_middle_a, field_10, sweep caps and every per-mint state. |
| 204–208 | `stop_trading` | admin / Admin | Requires active state then sets paused; protects six trades, not all asset movements. |
| 209–214 | `resume_trading` | admin / Admin | Requires paused then clears; repeated resume uses TradingPaused 6000, retained original-observed naming. |
| 401–430 | `sweep_remaining` | sweep / not applicable | 16 exact entries, sequential typed decode then transfer/native/counter/exit. cap invariant excludes total overflow but not previous+total intermediate overflow. Repeated aliases re-read committed-in-instruction data. |

## programs/mayhem/src/state.rs

| Lines | Function | Group / Context | Manual conclusion |
|---|---|---|---|
| 35–35 | `owner` | codec / not applicable | BondingCurve owner fixed PUMP_ID; strict derived82-byte total codec separate from padded SellCurve. |

## Account context and field coverage

Each table records every explicit context field and its written account attributes. Type wrappers supply additional declared framework contracts; they are not expanded here. Missing explicit attributes are shown as none, not inferred absent owner/type behavior.

### BurnTokens — programs/mayhem/src/instructions/burn.rs:6–36

No signer role. Mint-seeded state/vault/curve custody; strict curve decoder; deadline and status body checks.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 9 | `mayhem_state` | `Account<'info` | `mut, seeds = [b"mayhem-state", mint.key().as_ref(` |
| 11 | `mint` | `InterfaceAccount<'info` | `mut` |
| 16 | `mayhem_token_vault` | `InterfaceAccount<'info` | `mut, associated_token::mint = mint, associated_token::authority = sol_vault, associated_token::token_program = mint.to_account_info().owner` |
| 19 | `sol_vault` | `UncheckedAccount<'info>` | `mut, seeds = [b"sol-vault"], bump` |
| 21 | `bonding_curve` | `Box<Account<'info` | `mut, seeds = [b"bonding-curve", mint.key().as_ref(` |
| 23 | `global` | `UncheckedAccount<'info>` | `none` |
| 26 | `pump_program` | `UncheckedAccount<'info>` | `address = PUMP_ID` |
| 28 | `pump_event_authority` | `UncheckedAccount<'info>` | `none` |
| 29 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 30 | `token_program` | `Interface<'info` | `none` |
| 33 | `event_authority` | `UncheckedAccount<'info>` | `seeds = [b"__event_authority"], bump` |
| 35 | `program` | `UncheckedAccount<'info>` | `none` |

### LegacyBuy — programs/mayhem/src/instructions/buy.rs:13–51

23 outer accounts; Pump PDA and ATA relationships; readonly Mayhem-derived bonding_curve_v2; volume accounts mutable; 18-account CPI.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 15 | `trader` | `Signer<'info>` | `mut` |
| 16 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 17 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 18 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 19 | `mayhem_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 21 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 22 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 23 | `token_program` | `Program<'info` | `none` |
| 25 | `global` | `UncheckedAccount<'info>` | `none` |
| 26 | `bonding_curve` | `Box<Account<'info` | `mut,seeds=[b"bonding-curve",mint.key().as_ref(` |
| 28 | `fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 29 | `associated_bonding_curve` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=mint.to_account_info().owner` |
| 31 | `creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 33 | `pump_event_authority` | `UncheckedAccount<'info>` | `none` |
| 35 | `pump_program` | `UncheckedAccount<'info>` | `address=PUMP_ID` |
| 37 | `global_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 39 | `user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 41 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 43 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 45 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 46 | `program` | `Program<'info` | `none` |
| 48 | `bonding_curve_v2` | `UncheckedAccount<'info>` | `seeds=[b"bonding-curve-v2",mint.key().as_ref(` |
| 50 | `buyback_recipient` | `UncheckedAccount<'info>` | `mut` |

### BuyPumpSwap — programs/mayhem/src/instructions/buy_pump_swap.rs:17–70

31 outer accounts; pool/config owner+codec only, pool token relationships not locally linked; quote legacy, base Token2022; 25-account CPI; extra pool_v2 checked but not forwarded.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 19 | `trader` | `Signer<'info>` | `mut` |
| 20 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 21 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 22 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 24 | `mayhem_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 26 | `mayhem_quote_vault` | `Box<InterfaceAccount<'info` | `init_if_needed,payer=trader,associated_token::mint=quote_mint,associated_token::authority=sol_vault,associated_token::token_program=quote_token_program` |
| 28 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 29 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 31 | `quote_token_program` | `Interface<'info` | `address=SPL_TOKEN_ID` |
| 32 | `base_token_program` | `Program<'info` | `none` |
| 33 | `associated_token_program` | `Program<'info` | `none` |
| 35 | `pool` | `Box<Account<'info` | `mut` |
| 36 | `global_config` | `Box<Account<'info` | `none` |
| 38 | `quote_mint` | `UncheckedAccount<'info>` | `none` |
| 39 | `pool_base_token_account` | `Box<InterfaceAccount<'info` | `mut` |
| 40 | `pool_quote_token_account` | `Box<InterfaceAccount<'info` | `mut` |
| 42 | `protocol_fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 44 | `protocol_fee_recipient_token_account` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=protocol_fee_recipient,associated_token::token_program=quote_token_program` |
| 46 | `pump_swap_event_authority` | `UncheckedAccount<'info>` | `none` |
| 48 | `pump_swap_program` | `UncheckedAccount<'info>` | `address=AMM_ID` |
| 50 | `coin_creator_vault_ata` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=coin_creator_vault_authority,associated_token::token_program=quote_token_program` |
| 52 | `coin_creator_vault_authority` | `UncheckedAccount<'info>` | `none` |
| 54 | `global_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 56 | `user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 58 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 60 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 62 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 63 | `program` | `Program<'info` | `none` |
| 65 | `pool_v2` | `UncheckedAccount<'info>` | `seeds=[b"pool-v2",mint.key().as_ref(` |
| 67 | `buyback_recipient` | `UncheckedAccount<'info>` | `none` |
| 69 | `buyback_recipient_ata` | `UncheckedAccount<'info>` | `mut` |

### BuyV2 — programs/mayhem/src/instructions/buy_v2.rs:14–67

32 outer accounts; quote mint unchecked, own ATAs linked using mint owners; readonly global volume retained; 27-account CPI.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 16 | `trader` | `Signer<'info>` | `mut` |
| 17 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 18 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 19 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 21 | `quote_mint` | `UncheckedAccount<'info>` | `none` |
| 22 | `associated_token_program` | `Program<'info` | `none` |
| 23 | `mayhem_base_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 24 | `mayhem_quote_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=sol_vault,associated_token::token_program=quote_mint.to_account_info().owner` |
| 26 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 27 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 28 | `token_program` | `Program<'info` | `none` |
| 29 | `quote_token_program` | `Interface<'info` | `none` |
| 31 | `global` | `UncheckedAccount<'info>` | `none` |
| 32 | `bonding_curve` | `Box<Account<'info` | `mut,seeds=[b"bonding-curve",mint.key().as_ref(` |
| 34 | `associated_quote_bonding_curve` | `UncheckedAccount<'info>` | `mut` |
| 36 | `fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 38 | `fee_recipient_ata` | `UncheckedAccount<'info>` | `mut` |
| 39 | `associated_base_bonding_curve` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=mint.to_account_info().owner` |
| 41 | `creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 43 | `associated_creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 45 | `sharing_config` | `UncheckedAccount<'info>` | `none` |
| 47 | `pump_event_authority` | `UncheckedAccount<'info>` | `none` |
| 49 | `pump_program` | `UncheckedAccount<'info>` | `address=PUMP_ID` |
| 51 | `global_volume_accumulator` | `UncheckedAccount<'info>` | `none` |
| 53 | `user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 55 | `associated_user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 57 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 59 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 61 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 62 | `program` | `Program<'info` | `none` |
| 64 | `buyback_recipient` | `UncheckedAccount<'info>` | `mut` |
| 66 | `buyback_recipient_ata` | `UncheckedAccount<'info>` | `mut` |

### LegacySell — programs/mayhem/src/instructions/sell.rs:10–44

21 outer accounts; shared trade controls; 16-account CPI, no volume accounts; Pump CPI error propagates.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 12 | `trader` | `Signer<'info>` | `mut` |
| 13 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 14 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 16 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 17 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 18 | `mayhem_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 19 | `token_program` | `Program<'info` | `none` |
| 20 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 22 | `global` | `UncheckedAccount<'info>` | `none` |
| 23 | `bonding_curve` | `Box<Account<'info` | `mut,seeds=[b"bonding-curve",mint.key().as_ref(` |
| 25 | `fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 26 | `associated_bonding_curve` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=mint.to_account_info().owner` |
| 28 | `creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 30 | `pump_event_authority` | `UncheckedAccount<'info>` | `none` |
| 32 | `pump_program` | `UncheckedAccount<'info>` | `address=PUMP_ID` |
| 34 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 36 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 38 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 39 | `program` | `Program<'info` | `none` |
| 41 | `bonding_curve_v2` | `UncheckedAccount<'info>` | `seeds=[b"bonding-curve-v2",mint.key().as_ref(` |
| 43 | `buyback_recipient` | `UncheckedAccount<'info>` | `mut` |

### SellPumpSwap — programs/mayhem/src/instructions/sell_pump_swap.rs:17–66

29 outer accounts; same AMM relation boundary; 23-account CPI; pool_v2 checked but omitted; final buyback pair flags forwarded.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 19 | `trader` | `Signer<'info>` | `mut` |
| 20 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 21 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 22 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 24 | `mayhem_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 26 | `mayhem_quote_vault` | `Box<InterfaceAccount<'info` | `init_if_needed,payer=trader,associated_token::mint=quote_mint,associated_token::authority=sol_vault,associated_token::token_program=quote_token_program` |
| 28 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 29 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 31 | `quote_token_program` | `Interface<'info` | `address=SPL_TOKEN_ID` |
| 32 | `base_token_program` | `Program<'info` | `none` |
| 33 | `associated_token_program` | `Program<'info` | `none` |
| 35 | `pool` | `Box<Account<'info` | `mut` |
| 36 | `global_config` | `Box<Account<'info` | `none` |
| 38 | `quote_mint` | `UncheckedAccount<'info>` | `none` |
| 39 | `pool_base_token_account` | `Box<InterfaceAccount<'info` | `mut` |
| 40 | `pool_quote_token_account` | `Box<InterfaceAccount<'info` | `mut` |
| 42 | `protocol_fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 44 | `protocol_fee_recipient_token_account` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=protocol_fee_recipient,associated_token::token_program=quote_token_program` |
| 46 | `pump_swap_event_authority` | `UncheckedAccount<'info>` | `none` |
| 48 | `pump_swap_program` | `UncheckedAccount<'info>` | `address=AMM_ID` |
| 50 | `coin_creator_vault_ata` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=coin_creator_vault_authority,associated_token::token_program=quote_token_program` |
| 52 | `coin_creator_vault_authority` | `UncheckedAccount<'info>` | `none` |
| 54 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 56 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 58 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 59 | `program` | `Program<'info` | `none` |
| 61 | `pool_v2` | `UncheckedAccount<'info>` | `seeds=[b"pool-v2",mint.key().as_ref(` |
| 63 | `buyback_recipient` | `UncheckedAccount<'info>` | `none` |
| 65 | `buyback_recipient_ata` | `UncheckedAccount<'info>` | `mut` |

### SellV2 — programs/mayhem/src/instructions/sell_v2.rs:14–65

31 outer accounts; unchecked quote mint and downstream fee/creator links; 26-account CPI with mapped 6008 errors.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 16 | `trader` | `Signer<'info>` | `mut` |
| 17 | `global_params` | `Box<Account<'info` | `mut,seeds=[b"global-params"],bump,has_one=trader` |
| 18 | `mayhem_state` | `Box<Account<'info` | `mut,seeds=[b"mayhem-state",mint.key().as_ref(` |
| 19 | `mint` | `Box<InterfaceAccount<'info` | `none` |
| 21 | `quote_mint` | `UncheckedAccount<'info>` | `none` |
| 22 | `associated_token_program` | `Program<'info` | `none` |
| 23 | `mayhem_base_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=sol_vault,associated_token::token_program=mint.to_account_info().owner` |
| 24 | `mayhem_quote_token_vault` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=quote_mint,associated_token::authority=sol_vault,associated_token::token_program=quote_mint.to_account_info().owner` |
| 26 | `sol_vault` | `UncheckedAccount<'info>` | `mut,seeds=[b"sol-vault"],bump` |
| 27 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 28 | `token_program` | `Program<'info` | `none` |
| 29 | `quote_token_program` | `Interface<'info` | `none` |
| 31 | `global` | `UncheckedAccount<'info>` | `none` |
| 32 | `bonding_curve` | `Box<Account<'info` | `mut,seeds=[b"bonding-curve",mint.key().as_ref(` |
| 34 | `associated_quote_bonding_curve` | `UncheckedAccount<'info>` | `mut` |
| 36 | `fee_recipient` | `UncheckedAccount<'info>` | `mut` |
| 38 | `fee_recipient_ata` | `UncheckedAccount<'info>` | `mut` |
| 39 | `associated_base_bonding_curve` | `Box<InterfaceAccount<'info` | `mut,associated_token::mint=mint,associated_token::authority=bonding_curve,associated_token::token_program=mint.to_account_info().owner` |
| 41 | `creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 43 | `associated_creator_vault` | `UncheckedAccount<'info>` | `mut` |
| 45 | `sharing_config` | `UncheckedAccount<'info>` | `none` |
| 47 | `pump_event_authority` | `UncheckedAccount<'info>` | `none` |
| 49 | `pump_program` | `UncheckedAccount<'info>` | `address=PUMP_ID` |
| 51 | `user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 53 | `associated_user_volume_accumulator` | `UncheckedAccount<'info>` | `mut` |
| 55 | `fee_config` | `UncheckedAccount<'info>` | `none` |
| 57 | `fee_program` | `UncheckedAccount<'info>` | `none` |
| 59 | `event_authority` | `UncheckedAccount<'info>` | `seeds=[b"__event_authority"],bump` |
| 60 | `program` | `Program<'info` | `none` |
| 62 | `buyback_recipient` | `UncheckedAccount<'info>` | `mut` |
| 64 | `buyback_recipient_ata` | `UncheckedAccount<'info>` | `mut` |

### Admin — programs/mayhem/src/lib.rs:217–229

Ten existing-state admin instructions share the exact context at lib.rs:217-229. Event program unchecked; nine bodies do not use it, update_global_params does.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 220 | `admin` | `Signer<'info>` | `mut` |
| 222 | `global_params` | `Account<'info` | `mut, seeds = [b"global-params"], bump, has_one = admin` |
| 223 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 226 | `event_authority` | `UncheckedAccount<'info>` | `seeds = [b"__event_authority"], bump` |
| 228 | `program` | `UncheckedAccount<'info>` | `none` |

### InitializeGlobalParams — programs/mayhem/src/lib.rs:312–319

Signer becomes admin at canonical global-params PDA. No hardcoded bootstrap identity; public deployment state not established.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 315 | `admin` | `Signer<'info>` | `mut` |
| 317 | `global_params` | `Account<'info` | `init, payer = admin, space = 254, seeds = [b"global-params"], bump` |
| 318 | `system_program` | `CheckedSystemProgram<'info>` | `none` |

### InitializeFeeRecipient — programs/mayhem/src/lib.rs:328–345

No admin relation; index derives PDA before body index check. Native ATA authority is recipient, no payer beneficiary.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 332 | `admin` | `Signer<'info>` | `mut` |
| 334 | `wsol_mint` | `InterfaceAccount<'info` | `address = anchor_spl::token::spl_token::native_mint::ID` |
| 336 | `fee_recipient` | `Account<'info` | `init, payer = admin, space = 42, seeds = [b"fee-recipient".as_ref(), &[index]], bump` |
| 338 | `fee_recipient_ata` | `InterfaceAccount<'info` | `init, payer = admin, associated_token::mint = wsol_mint, associated_token::authority = fee_recipient, associated_token::token_program = token_program` |
| 340 | `global_params` | `Account<'info` | `mut, seeds = [b"global-params"], bump` |
| 341 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 343 | `token_program` | `Interface<'info` | `address = anchor_spl::token::ID` |
| 344 | `associated_token_program` | `Program<'info` | `none` |

### ExtendAccount — programs/mayhem/src/lib.rs:347–359

Owner/discriminator only, not full state or seeds. Signer lacks explicit mut; rent funding depends on actual writable privilege.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 351 | `account` | `UncheckedAccount<'info>` | `mut, owner = ID` |
| 352 | `user` | `Signer<'info>` | `none` |
| 353 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 356 | `event_authority` | `UncheckedAccount<'info>` | `seeds = [b"__event_authority"], bump` |
| 358 | `program` | `UncheckedAccount<'info>` | `none` |

### WithdrawAdmin — programs/mayhem/src/lib.rs:370–380

Stored admin destination, checked system program, unchecked owner on PDA delegated to System transfer.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 373 | `admin` | `Signer<'info>` | `mut` |
| 375 | `global_params` | `Account<'info` | `mut, seeds = [b"global-params"], bump, has_one = admin` |
| 378 | `sol_vault` | `UncheckedAccount<'info>` | `mut, seeds = [b"sol-vault"], bump` |
| 379 | `system_program` | `CheckedSystemProgram<'info>` | `none` |

### WithdrawQuoteAdmin — programs/mayhem/src/lib.rs:382–397

Stored admin destination; init_if_needed admin ATA; accepts token interface but legacy transfer helper evidence constrains actual success.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 384 | `admin` | `Signer<'info>` | `mut` |
| 386 | `global_params` | `Account<'info` | `mut, seeds = [b"global-params"], bump, has_one = admin` |
| 388 | `sol_vault` | `UncheckedAccount<'info>` | `mut, seeds = [b"sol-vault"], bump` |
| 389 | `quote_mint` | `InterfaceAccount<'info` | `none` |
| 391 | `vault_quote_ata` | `InterfaceAccount<'info` | `mut, associated_token::mint = quote_mint, associated_token::authority = sol_vault, associated_token::token_program = token_program` |
| 393 | `admin_quote_ata` | `InterfaceAccount<'info` | `init_if_needed, payer = admin, associated_token::mint = quote_mint, associated_token::authority = admin, associated_token::token_program = token_program` |
| 394 | `token_program` | `Interface<'info` | `none` |
| 395 | `associated_token_program` | `Program<'info` | `none` |
| 396 | `system_program` | `CheckedSystemProgram<'info>` | `none` |

### SweepFees — programs/mayhem/src/lib.rs:432–446

Stored trader, fixed legacy token, recipient list dynamic; cap from mint native identity, not decimals.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 434 | `trader` | `Signer<'info>` | `mut` |
| 435 | `global_params` | `Account<'info` | `mut, seeds=[b"global-params"], bump, has_one=trader` |
| 436 | `quote_mint` | `InterfaceAccount<'info` | `none` |
| 437 | `trader_quote_ata` | `InterfaceAccount<'info` | `mut, associated_token::mint=quote_mint, associated_token::authority=trader, associated_token::token_program=token_program` |
| 438 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 439 | `token_program` | `Interface<'info` | `address=anchor_spl::token::ID` |
| 440 | `associated_token_program` | `Program<'info` | `none` |
| 443 | `event_authority` | `UncheckedAccount<'info>` | `seeds = [b"__event_authority"], bump` |
| 445 | `program` | `UncheckedAccount<'info>` | `none` |

### SweepFeesAdmin — programs/mayhem/src/lib.rs:448–462

Stored admin, same dynamic pairs, u64::MAX cap and timestamps preserved.

| Line | Field | Type | Explicit account attributes |
|---|---|---|---|
| 450 | `admin` | `Signer<'info>` | `mut` |
| 451 | `global_params` | `Account<'info` | `mut, seeds=[b"global-params"], bump, has_one=admin` |
| 452 | `quote_mint` | `InterfaceAccount<'info` | `none` |
| 453 | `admin_quote_ata` | `InterfaceAccount<'info` | `mut, associated_token::mint=quote_mint, associated_token::authority=admin, associated_token::token_program=token_program` |
| 454 | `system_program` | `CheckedSystemProgram<'info>` | `none` |
| 455 | `token_program` | `Interface<'info` | `address=anchor_spl::token::ID` |
| 456 | `associated_token_program` | `Program<'info` | `none` |
| 459 | `event_authority` | `UncheckedAccount<'info>` | `seeds = [b"__event_authority"], bump` |
| 461 | `program` | `UncheckedAccount<'info>` | `none` |

## Non-context declarations

| Source / lines | Name | Review |
|---|---|---|
| programs/mayhem/src/checked_program.rs:12–12 | `CheckedSystemProgram` | System wrapper/client shape; Program delegation and readonly meta methods reviewed; empty default exit implementation remains dependency behavior. |
| programs/mayhem/src/checked_program.rs:14–14 | `CheckedSystemProgramBumps` | System wrapper/client shape; Program delegation and readonly meta methods reviewed; empty default exit implementation remains dependency behavior. |
| programs/mayhem/src/checked_program.rs:64–64 | `CheckedSystemProgram` | System wrapper/client shape; Program delegation and readonly meta methods reviewed; empty default exit implementation remains dependency behavior. |
| programs/mayhem/src/checked_program.rs:73–73 | `CheckedSystemProgram` | System wrapper/client shape; Program delegation and readonly meta methods reviewed; empty default exit implementation remains dependency behavior. |
| programs/mayhem/src/instructions/burn.rs:68–73 | `BurnEvent` | Field order and explicit discriminator where present reviewed; logs/self-CPI are attempted before final success. Derived serializer/transitive equality unproved. |
| programs/mayhem/src/instructions/burn.rs:76–81 | `BurnError` | Explicit offsets/messages reviewed; framework adds error offset; no full original ABI or diagnostic equivalence. |
| programs/mayhem/src/instructions/buy.rs:103–107 | `BuyError` | Explicit offsets/messages reviewed; framework adds error offset; no full original ABI or diagnostic equivalence. |
| programs/mayhem/src/instructions/pump_swap_types.rs:9–28 | `SwapPool` | 287-byte total Borsh layout including signed i128 virtual quote reserves; owner AMM, short-prefix zero padding. |
| programs/mayhem/src/instructions/pump_swap_types.rs:50–61 | `SwapGlobalConfig` | 418-byte strict old prefix including Mayhem boolean; owner AMM; extra trailing fields not interpreted. |
| programs/mayhem/src/instructions/pump_swap_types.rs:80–82 | `PumpSwapError` | Explicit offsets/messages reviewed; framework adds error offset; no full original ABI or diagnostic equivalence. |
| programs/mayhem/src/instructions/sell.rs:50–53 | `SellCurve` | Four returned reserve fields from padded141-byte foreign codec; it is not a complete historical type. |
| programs/mayhem/src/instructions/sell.rs:111–118 | `SellEvent` | Field order and explicit discriminator where present reviewed; logs/self-CPI are attempted before final success. Derived serializer/transitive equality unproved. |
| programs/mayhem/src/instructions/sell.rs:120–125 | `SellError` | Explicit offsets/messages reviewed; framework adds error offset; no full original ABI or diagnostic equivalence. |
| programs/mayhem/src/lib.rs:234–249 | `GlobalParams` | 254-byte Borsh account incl discriminator; five unresolved argument roles. Arrays interpreted by explicit slices; not Rust layout. |
| programs/mayhem/src/lib.rs:252–265 | `MayhemError` | Explicit offsets/messages reviewed; framework adds error offset; no full original ABI or diagnostic equivalence. |
| programs/mayhem/src/lib.rs:269–286 | `UpdateGlobalParamsArgs` | 16 Borsh options in explicit widths/order; no global value validation apart from checked version increment in body. |
| programs/mayhem/src/lib.rs:291–310 | `GlobalParamsUpdateEvent` | Field order and explicit discriminator where present reviewed; logs/self-CPI are attempted before final success. Derived serializer/transitive equality unproved. |
| programs/mayhem/src/lib.rs:322–326 | `FeeRecipient` | 42-byte account: discriminator8,bump1,index1,opaque32; extension74 is extra capacity only. |
| programs/mayhem/src/lib.rs:362–368 | `ExtendAccountEvent` | Field order and explicit discriminator where present reviewed; logs/self-CPI are attempted before final success. Derived serializer/transitive equality unproved. |
| programs/mayhem/src/lib.rs:400–400 | `SweepEvent` | Field order and explicit discriminator where present reviewed; logs/self-CPI are attempted before final success. Derived serializer/transitive equality unproved. |
| programs/mayhem/src/state.rs:7–17 | `MayhemState` | 106-byte Borsh account incl discriminator; neutral fields retained; no initializer/lifecycle inference from declaration. |
| programs/mayhem/src/state.rs:20–20 | `MayhemStatus` | Three Borsh variants; trade status transition does not independently reject Ended; deadline premise matters. |
| programs/mayhem/src/state.rs:25–34 | `BondingCurve` | Strict82-byte total derived Pump account; explicit foreign owner; no padded trade behavior inferred. |

## Shared assessment dimensions

These statements apply to every function referencing the group, together with its individual conclusion. A wrapper references its delegated handler as well. Pure helpers explicitly identify non-applicable account and CPI dimensions.

### admin

- **arithmetic**: Version checked_add occurs after optional byte writes; simple role/cap/reset assignments have no arithmetic. Intervals are u64 wire fields interpreted as signed i64 by consumers.
- **authority**: Stored admin Signer through Admin; no second-party acceptance signature for role changes.
- **cpi_identity_forwarding**: Only update_global_params emits log/self-CPI; otherwise unused unchecked program account is not a spending target.
- **error_rollback_order**: Context parsing precedes body; update failure after writes requires transaction rollback. Event CPI can fail after log emission. Failed logs do not prove committed state.
- **pda_owner_signer_writable_alias**: Writable admin and typed GlobalParams; global-params PDA and has_one admin; event PDA; CheckedSystemProgram. No universal alias prohibition is inferred from derive.
- **reconstruction_fence**: Five GlobalParams roles unknown; permission policy and historical macro expansion unproved; no original equivalence from candidate declarations.
- **serialization**: Fixed-length slices and Borsh options; account exit is framework-owned. Actual serialized ranges reviewed; no native Rust layout inference.

### bootstrap

- **arithmetic**: FeeRecipient index<8 is a body check after context init CPIs. No amount arithmetic in either body.
- **authority**: A signing payer chooses GlobalParams.admin only at init. Fee-recipient payer has no has_one admin restriction.
- **cpi_identity_forwarding**: System/ATA init CPIs are generated; CheckedSystemProgram and Program<AssociatedToken>; no caller-selected beneficiary stored in FeeRecipient.
- **error_rollback_order**: FeeRecipient out-of-range index fails after allocation attempts; atomic rollback needed. Existing initialized PDA must be rejected by framework.
- **pda_owner_signer_writable_alias**: Canonical init PDA, fixed space and typed owner via framework. FeeRecipient also requires existing global PDA, native mint and legacy token ID. Alias checks delegated to init framework.
- **reconstruction_fence**: These two allowed initializers are distinct from excluded initialize_mayhem_state. Live bootstrap state/policy and init macro implementation remain unclosed.
- **serialization**: 254-byte GlobalParams / 42-byte FeeRecipient initial allocation; body stores only admin or bump/index; zero-init premise is framework-owned.

### burn

- **arithmetic**: Reads full u64 token balance, stores it as burned_amount; no cumulative arithmetic; Clock unwrap can panic.
- **authority**: Permissionless, guarded by end_timestamp<=Clock and status!=Ended; no global pause or administrator requirement.
- **cpi_identity_forwarding**: Interface token burn of full vault amount signed by sol-vault. Pump/global accounts are consumed but no Pump CPI in body; event program unchecked.
- **error_rollback_order**: Deadline before repeated-burn guard; token CPI then burned amount, two separate Clock reads/log and self-event, status Ended last. Atomic failure premise retained.
- **pda_owner_signer_writable_alias**: Typed MayhemState mint-seeded PDA, mutable mint/vault and Pump curve PDA/owner; sol-vault PDA. Stored state.mint not independently compared; canonical seed binds supplied mint.
- **reconstruction_fence**: Six saved genuine-snapshot comparisons are finite inherited evidence; excluded initializer/lifecycle never assumed proved.
- **serialization**: Strict BondingCurve codec differs from trade padded SellCurve. MayhemStatus discriminant and bool validity delegated to Borsh.

### codec

- **arithmetic**: Fixed buffer sizes and offsets safe; short data padded only for selected codecs; defaulted reserves may later hit arithmetic rejection.
- **authority**: Pure codec/owner helper; no user authority or transfers. Calling typed account must enforce owner separately.
- **cpi_identity_forwarding**: No CPI; no external account forwarding.
- **error_rollback_order**: Returns deserialization/serialization errors before callers operate; partial writer failure is not a successful complete account write.
- **pda_owner_signer_writable_alias**: Owner constants fixed to Pump/AMM. Decode checks content only; no PDA, writable or uniqueness checks inside codec.
- **reconstruction_fence**: Codec convenience is retained reconstruction behavior, not proof of valid historical account state or whole layout identity.
- **serialization**: Explicit discriminator/boolean/trailing-data and cursor behavior described per function. Macro-derived Borsh internals and error provenance unclosed.

### error

- **arithmetic**: Converts MathOverflow enum only; no arithmetic.
- **authority**: Pure error construction; no authority.
- **cpi_identity_forwarding**: No CPI or forwarding.
- **error_rollback_order**: Caller selects timing and rollback; this helper simply returns the error value.
- **pda_owner_signer_writable_alias**: No account access or alias effect.
- **reconstruction_fence**: Non-initializer error ABI differs in retained study; same source-level error is not raw body/data identity.
- **serialization**: Framework Error representation delegated to Into conversion.

### extend

- **arithmetic**: Rent minimum(new_size).saturating_sub(balance); equal/larger sizes return without funding. No shrink.
- **authority**: Any user Signer; not admin-gated.
- **cpi_identity_forwarding**: Checked System transfer only when rent shortfall>0; fixed event PDA but unchecked program account for self-event framework.
- **error_rollback_order**: Transfer precedes resize, then Clock and log/self-event; later failure must roll back earlier changes.
- **pda_owner_signer_writable_alias**: Target mutable and Mayhem-owned plus recognized discriminator; no PDA or full state decode. User is not explicitly mut, so funding additionally relies on actual writable privilege and CPI runtime checks.
- **reconstruction_fence**: Permissionless extension of owned recognized accounts is observed; no invented source restriction or initializer review.
- **serialization**: Capacities 318/74/170, not proof of additional fields. Resize behavior/zero-fill delegated to AccountInfo/runtime.

### framework

- **arithmetic**: Only split_first length check and vector construction; no financial arithmetic.
- **authority**: System wrapper itself grants no authority.
- **cpi_identity_forwarding**: No invocation; helper returns the same account/info/key or meta with requested/fixed flags as specified.
- **error_rollback_order**: Missing keys errors; wrong ID InvalidProgramId with account_name before underlying executable validation; allocation or caller failures remain external.
- **pda_owner_signer_writable_alias**: ID equality precedes Program::try_from executable check; readonly flattened meta shapes. Empty duplicate list is for this program wrapper only, not a global alias guarantee.
- **reconstruction_fence**: Delegated Program traits and AccountsExit default not expanded. Compatibility adapter does not prove historical dependency identity.
- **serialization**: try_accounts consumes exactly one account before validation; no data decoding, persistent state or account serialization body.

### sweep

- **arithmetic**: Aggregate cap inductively maintained when arithmetic succeeds. Native rent subtraction and destination addition can overflow/underflow. previous+total-before_total can overflow at intermediate addition even if final mathematical result fits.
- **authority**: Caller wrapper chooses stored trader or admin and its destination; helper is private and trusts those callers.
- **cpi_identity_forwarding**: Token transfer uses stored fee-recipient index/bump signing. Fixed legacy token target in wrappers; token program validates authority/mint for nonzero amount. Native lamports move directly from owned account to authorized destination.
- **error_rollback_order**: Sequential token transfer, native movement, counter update, optional timestamp, exit. Zero token amount skips CPI validation. Later errors need transaction rollback across earlier pairs.
- **pda_owner_signer_writable_alias**: Exactly 16 remaining entries, eight typed recipient/token pairs; no per-pair PDA/ATA/unique/writable preflight. Runtime checks and nonzero transfer authority enforce only the paths reached. Duplicate pairs re-decode after explicit exit.
- **reconstruction_fence**: No claim that arbitrary matching owned accounts are creatable; alias/reachability/dependency and cumulative counter bounds unresolved. Sixteen accounts is not eight distinct canonical recipients.
- **serialization**: Opaque 32 bytes contain native timestamp/counter at offsets 0/8, stable counter/timestamp at 16/24; explicit recipient.exit each iteration.

### trade

- **arithmetic**: u64 reserve products fit u128; reference*tolerance checked; zero vt rejected. bps complement can panic above 10000; zero effective quote can reach divide unwrap. Actual balance deltas unsigned and signed counters checked. Buy compares positive i128 low-u64 limbs strictly.
- **authority**: Configured mutable trader Signer via global has_one; all six bodies check pause, interval, deadline, then threshold on status transition.
- **cpi_identity_forwarding**: Fixed PUMP_ID or AMM_ID; exact vectors and flags in cpi-contracts.json, sol-vault seeds. Unchecked fee/global/creator accounts are forwarded, not locally authenticated. No ctx.remaining_accounts forwarding.
- **error_rollback_order**: Timestamp/status writes precede price and CPI. Post-CPI reload/counter/risk/event failure requires atomic rollback. Legacy sell propagates CPI error; other trade CPIs map to 6008/6010; successful nested logs can survive rejected transaction.
- **pda_owner_signer_writable_alias**: Global/state/vault PDAs and typed owners; base vault ATA. External curve PDA on Pump routes; AMM pool/config typed but local pool/mint/vault relationships delegated to AMM. No universal disjointness from declarations.
- **reconstruction_fence**: Synthetic trade states do not prove live quote policy, all extensions, lifecycle, cross-program constraints or original whole-file equality. Mayhem sell_v2 review does not inspect excluded Pump sell_v2 body.
- **serialization**: Padded SellCurve or SwapPool with strict GlobalConfig; reloads after CPI for balances. Fixed SellEvent contains side and native/generic quote fields; derived serializer not independently expanded.

### withdraw

- **arithmetic**: Signed last+interval with release overflow checks; zero last or interval bypasses rate predicate. Zero amount still updates timestamp.
- **authority**: Writable stored admin Signer via has_one; no pause gate and no trader access.
- **cpi_identity_forwarding**: Native uses checked System and sol-vault seeds; quote calls anchor_spl::token::transfer with interface key. Retained evidence says legacy-token helper target; interface acceptance is not Token2022 withdrawal success proof.
- **error_rollback_order**: Timestamp written before transfer, so failed CPI relies on rollback. Quote ATA may initialize during parsing before rate check.
- **pda_owner_signer_writable_alias**: GlobalParams typed/PDA/mutable; sol-vault PDA/mutable unchecked owner. System CPI enforces native source ownership; quote ATAs constrain mint/authority/program via framework.
- **reconstruction_fence**: Source comments and retained evidence support these oddities as observed behavior; no new live reachability or complete original ABI proof.
- **serialization**: Timestamp writes into exact 8-byte ranges, no deployment-counter reconciliation. Framework exit and token decoder not expanded.

## Unresolved coverage

- **U1 Historical identity — open**: Whole ELF differs; no normalized body comparison performed here. Retained ABI return convention, source coordinates, panic/OOM, compiler and dependency graph gaps persist.
- **U2 Framework and token dependencies — open**: Account/Interface/ATA ownership, executable, duplicate handling, event target, exit and legacy token helper identities delegated or reported by public evidence; no fresh macro expansion/dependency audit.
- **U3 Lifecycle and deployment — open**: Live bootstrap status, authorized roles, reachable account balances/versions and mint-state consistency not obtained. Excluded initialize_mayhem_state stays opaque.
- **U4 External routing and aliases — open**: Pool-to-mint/vault/fee relationships delegated to fixed targets; full CPI graph/extensions/privilege unions and duplicate account combinations not proved. No excluded Pump body inspected.
- **U5 Configuration policy — open**: Supported quote assets/decimals, reset/pause/rotation policy, cumulative counter bounds and retained-bps policy not established.
- **U6 Rollback and diagnostics — open**: All-or-nothing persistent state depends on normal runtime; logs are not rolled back. Saved finite comparisons and panic-detail mismatches retained, no fresh runtime claims.
- **U7 Inventory boundary — open**: 61 explicit functions and15 contexts cover admitted handwritten source, not macro functions, original441 inferred windows or every dependency; no overall security percentage.

Excluded function: `mayhem.initialize_mayhem_state` — metadata-only, absent from admitted source. No body inspected; no inherited exclusion is promoted to reviewed status.
