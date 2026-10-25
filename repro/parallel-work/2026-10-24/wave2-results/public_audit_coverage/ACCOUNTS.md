# Declared account review obligations

Included public source only. Each field requires review of its complete declaration/constraints and the handler uses, aliases, authority, owner, PDA, writable/executable and mint/program relationships. An account name is not a validated relationship. Remaining accounts, nested custom context fields and macro-added accounts need manual expansion; event_cpi is flagged below. Full declaration spans and hashes are in coverage.json.

## BurnTokens — programs/mayhem/src/instructions/burn.rs

[programs/mayhem/src/instructions/burn.rs:7-36](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L7); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.burn_tokens.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mayhem_state | [programs/mayhem/src/instructions/burn.rs:7-9](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L7) |
| mint | [programs/mayhem/src/instructions/burn.rs:9-11](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L9) |
| mayhem_token_vault | [programs/mayhem/src/instructions/burn.rs:11-16](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L11) |
| sol_vault | [programs/mayhem/src/instructions/burn.rs:16-19](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L16) |
| bonding_curve | [programs/mayhem/src/instructions/burn.rs:19-21](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L19) |
| global | [programs/mayhem/src/instructions/burn.rs:21-23](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L21) |
| pump_program | [programs/mayhem/src/instructions/burn.rs:23-26](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L23) |
| pump_event_authority | [programs/mayhem/src/instructions/burn.rs:26-28](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L26) |
| system_program | [programs/mayhem/src/instructions/burn.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L28) |
| token_program | [programs/mayhem/src/instructions/burn.rs:29-30](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L29) |
| event_authority | [programs/mayhem/src/instructions/burn.rs:30-33](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L30) |
| program | [programs/mayhem/src/instructions/burn.rs:33-35](evidence/accepted/programs/mayhem/src/instructions/burn.rs#L33) |

## LegacyBuy — programs/mayhem/src/instructions/buy.rs

[programs/mayhem/src/instructions/buy.rs:14-51](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L14); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.buy.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/buy.rs:14-15](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L14) |
| global_params | [programs/mayhem/src/instructions/buy.rs:15-16](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L15) |
| mayhem_state | [programs/mayhem/src/instructions/buy.rs:16-17](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L16) |
| mint | [programs/mayhem/src/instructions/buy.rs:17-18](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L17) |
| mayhem_token_vault | [programs/mayhem/src/instructions/buy.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L18) |
| sol_vault | [programs/mayhem/src/instructions/buy.rs:19-21](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L19) |
| system_program | [programs/mayhem/src/instructions/buy.rs:21-22](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L21) |
| token_program | [programs/mayhem/src/instructions/buy.rs:22-23](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L22) |
| global | [programs/mayhem/src/instructions/buy.rs:23-25](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L23) |
| bonding_curve | [programs/mayhem/src/instructions/buy.rs:25-26](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L25) |
| fee_recipient | [programs/mayhem/src/instructions/buy.rs:26-28](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L26) |
| associated_bonding_curve | [programs/mayhem/src/instructions/buy.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L28) |
| creator_vault | [programs/mayhem/src/instructions/buy.rs:29-31](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L29) |
| pump_event_authority | [programs/mayhem/src/instructions/buy.rs:31-33](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L31) |
| pump_program | [programs/mayhem/src/instructions/buy.rs:33-35](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L33) |
| global_volume_accumulator | [programs/mayhem/src/instructions/buy.rs:35-37](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L35) |
| user_volume_accumulator | [programs/mayhem/src/instructions/buy.rs:37-39](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L37) |
| fee_config | [programs/mayhem/src/instructions/buy.rs:39-41](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L39) |
| fee_program | [programs/mayhem/src/instructions/buy.rs:41-43](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L41) |
| event_authority | [programs/mayhem/src/instructions/buy.rs:43-45](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L43) |
| program | [programs/mayhem/src/instructions/buy.rs:45-46](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L45) |
| bonding_curve_v2 | [programs/mayhem/src/instructions/buy.rs:46-48](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L46) |
| buyback_recipient | [programs/mayhem/src/instructions/buy.rs:48-50](evidence/accepted/programs/mayhem/src/instructions/buy.rs#L48) |

## BuyPumpSwap — programs/mayhem/src/instructions/buy_pump_swap.rs

[programs/mayhem/src/instructions/buy_pump_swap.rs:18-70](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L18); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.buy_pump_swap.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/buy_pump_swap.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L18) |
| global_params | [programs/mayhem/src/instructions/buy_pump_swap.rs:19-20](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L19) |
| mayhem_state | [programs/mayhem/src/instructions/buy_pump_swap.rs:20-21](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L20) |
| mint | [programs/mayhem/src/instructions/buy_pump_swap.rs:21-22](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L21) |
| mayhem_token_vault | [programs/mayhem/src/instructions/buy_pump_swap.rs:22-24](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L22) |
| mayhem_quote_vault | [programs/mayhem/src/instructions/buy_pump_swap.rs:24-26](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L24) |
| sol_vault | [programs/mayhem/src/instructions/buy_pump_swap.rs:26-28](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L26) |
| system_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L28) |
| quote_token_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:29-31](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L29) |
| base_token_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:31-32](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L31) |
| associated_token_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:32-33](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L32) |
| pool | [programs/mayhem/src/instructions/buy_pump_swap.rs:33-35](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L33) |
| global_config | [programs/mayhem/src/instructions/buy_pump_swap.rs:35-36](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L35) |
| quote_mint | [programs/mayhem/src/instructions/buy_pump_swap.rs:36-38](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L36) |
| pool_base_token_account | [programs/mayhem/src/instructions/buy_pump_swap.rs:38-39](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L38) |
| pool_quote_token_account | [programs/mayhem/src/instructions/buy_pump_swap.rs:39-40](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L39) |
| protocol_fee_recipient | [programs/mayhem/src/instructions/buy_pump_swap.rs:40-42](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L40) |
| protocol_fee_recipient_token_account | [programs/mayhem/src/instructions/buy_pump_swap.rs:42-44](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L42) |
| pump_swap_event_authority | [programs/mayhem/src/instructions/buy_pump_swap.rs:44-46](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L44) |
| pump_swap_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:46-48](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L46) |
| coin_creator_vault_ata | [programs/mayhem/src/instructions/buy_pump_swap.rs:48-50](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L48) |
| coin_creator_vault_authority | [programs/mayhem/src/instructions/buy_pump_swap.rs:50-52](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L50) |
| global_volume_accumulator | [programs/mayhem/src/instructions/buy_pump_swap.rs:52-54](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L52) |
| user_volume_accumulator | [programs/mayhem/src/instructions/buy_pump_swap.rs:54-56](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L54) |
| fee_config | [programs/mayhem/src/instructions/buy_pump_swap.rs:56-58](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L56) |
| fee_program | [programs/mayhem/src/instructions/buy_pump_swap.rs:58-60](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L58) |
| event_authority | [programs/mayhem/src/instructions/buy_pump_swap.rs:60-62](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L60) |
| program | [programs/mayhem/src/instructions/buy_pump_swap.rs:62-63](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L62) |
| pool_v2 | [programs/mayhem/src/instructions/buy_pump_swap.rs:63-65](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L63) |
| buyback_recipient | [programs/mayhem/src/instructions/buy_pump_swap.rs:65-67](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L65) |
| buyback_recipient_ata | [programs/mayhem/src/instructions/buy_pump_swap.rs:67-69](evidence/accepted/programs/mayhem/src/instructions/buy_pump_swap.rs#L67) |

## BuyV2 — programs/mayhem/src/instructions/buy_v2.rs

[programs/mayhem/src/instructions/buy_v2.rs:15-67](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L15); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.buy_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/buy_v2.rs:15-16](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L15) |
| global_params | [programs/mayhem/src/instructions/buy_v2.rs:16-17](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L16) |
| mayhem_state | [programs/mayhem/src/instructions/buy_v2.rs:17-18](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L17) |
| mint | [programs/mayhem/src/instructions/buy_v2.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L18) |
| quote_mint | [programs/mayhem/src/instructions/buy_v2.rs:19-21](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L19) |
| associated_token_program | [programs/mayhem/src/instructions/buy_v2.rs:21-22](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L21) |
| mayhem_base_token_vault | [programs/mayhem/src/instructions/buy_v2.rs:22-23](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L22) |
| mayhem_quote_token_vault | [programs/mayhem/src/instructions/buy_v2.rs:23-24](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L23) |
| sol_vault | [programs/mayhem/src/instructions/buy_v2.rs:24-26](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L24) |
| system_program | [programs/mayhem/src/instructions/buy_v2.rs:26-27](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L26) |
| token_program | [programs/mayhem/src/instructions/buy_v2.rs:27-28](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L27) |
| quote_token_program | [programs/mayhem/src/instructions/buy_v2.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L28) |
| global | [programs/mayhem/src/instructions/buy_v2.rs:29-31](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L29) |
| bonding_curve | [programs/mayhem/src/instructions/buy_v2.rs:31-32](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L31) |
| associated_quote_bonding_curve | [programs/mayhem/src/instructions/buy_v2.rs:32-34](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L32) |
| fee_recipient | [programs/mayhem/src/instructions/buy_v2.rs:34-36](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L34) |
| fee_recipient_ata | [programs/mayhem/src/instructions/buy_v2.rs:36-38](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L36) |
| associated_base_bonding_curve | [programs/mayhem/src/instructions/buy_v2.rs:38-39](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L38) |
| creator_vault | [programs/mayhem/src/instructions/buy_v2.rs:39-41](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L39) |
| associated_creator_vault | [programs/mayhem/src/instructions/buy_v2.rs:41-43](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L41) |
| sharing_config | [programs/mayhem/src/instructions/buy_v2.rs:43-45](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L43) |
| pump_event_authority | [programs/mayhem/src/instructions/buy_v2.rs:45-47](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L45) |
| pump_program | [programs/mayhem/src/instructions/buy_v2.rs:47-49](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L47) |
| global_volume_accumulator | [programs/mayhem/src/instructions/buy_v2.rs:49-51](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L49) |
| user_volume_accumulator | [programs/mayhem/src/instructions/buy_v2.rs:51-53](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L51) |
| associated_user_volume_accumulator | [programs/mayhem/src/instructions/buy_v2.rs:53-55](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L53) |
| fee_config | [programs/mayhem/src/instructions/buy_v2.rs:55-57](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L55) |
| fee_program | [programs/mayhem/src/instructions/buy_v2.rs:57-59](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L57) |
| event_authority | [programs/mayhem/src/instructions/buy_v2.rs:59-61](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L59) |
| program | [programs/mayhem/src/instructions/buy_v2.rs:61-62](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L61) |
| buyback_recipient | [programs/mayhem/src/instructions/buy_v2.rs:62-64](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L62) |
| buyback_recipient_ata | [programs/mayhem/src/instructions/buy_v2.rs:64-66](evidence/accepted/programs/mayhem/src/instructions/buy_v2.rs#L64) |

## LegacySell — programs/mayhem/src/instructions/sell.rs

[programs/mayhem/src/instructions/sell.rs:11-44](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L11); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.sell.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/sell.rs:11-12](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L11) |
| global_params | [programs/mayhem/src/instructions/sell.rs:12-13](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L12) |
| mayhem_state | [programs/mayhem/src/instructions/sell.rs:13-14](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L13) |
| sol_vault | [programs/mayhem/src/instructions/sell.rs:14-16](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L14) |
| mint | [programs/mayhem/src/instructions/sell.rs:16-17](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L16) |
| mayhem_token_vault | [programs/mayhem/src/instructions/sell.rs:17-18](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L17) |
| token_program | [programs/mayhem/src/instructions/sell.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L18) |
| system_program | [programs/mayhem/src/instructions/sell.rs:19-20](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L19) |
| global | [programs/mayhem/src/instructions/sell.rs:20-22](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L20) |
| bonding_curve | [programs/mayhem/src/instructions/sell.rs:22-23](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L22) |
| fee_recipient | [programs/mayhem/src/instructions/sell.rs:23-25](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L23) |
| associated_bonding_curve | [programs/mayhem/src/instructions/sell.rs:25-26](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L25) |
| creator_vault | [programs/mayhem/src/instructions/sell.rs:26-28](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L26) |
| pump_event_authority | [programs/mayhem/src/instructions/sell.rs:28-30](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L28) |
| pump_program | [programs/mayhem/src/instructions/sell.rs:30-32](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L30) |
| fee_config | [programs/mayhem/src/instructions/sell.rs:32-34](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L32) |
| fee_program | [programs/mayhem/src/instructions/sell.rs:34-36](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L34) |
| event_authority | [programs/mayhem/src/instructions/sell.rs:36-38](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L36) |
| program | [programs/mayhem/src/instructions/sell.rs:38-39](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L38) |
| bonding_curve_v2 | [programs/mayhem/src/instructions/sell.rs:39-41](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L39) |
| buyback_recipient | [programs/mayhem/src/instructions/sell.rs:41-43](evidence/accepted/programs/mayhem/src/instructions/sell.rs#L41) |

## SellPumpSwap — programs/mayhem/src/instructions/sell_pump_swap.rs

[programs/mayhem/src/instructions/sell_pump_swap.rs:18-66](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L18); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.sell_pump_swap.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/sell_pump_swap.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L18) |
| global_params | [programs/mayhem/src/instructions/sell_pump_swap.rs:19-20](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L19) |
| mayhem_state | [programs/mayhem/src/instructions/sell_pump_swap.rs:20-21](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L20) |
| mint | [programs/mayhem/src/instructions/sell_pump_swap.rs:21-22](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L21) |
| mayhem_token_vault | [programs/mayhem/src/instructions/sell_pump_swap.rs:22-24](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L22) |
| mayhem_quote_vault | [programs/mayhem/src/instructions/sell_pump_swap.rs:24-26](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L24) |
| sol_vault | [programs/mayhem/src/instructions/sell_pump_swap.rs:26-28](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L26) |
| system_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L28) |
| quote_token_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:29-31](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L29) |
| base_token_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:31-32](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L31) |
| associated_token_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:32-33](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L32) |
| pool | [programs/mayhem/src/instructions/sell_pump_swap.rs:33-35](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L33) |
| global_config | [programs/mayhem/src/instructions/sell_pump_swap.rs:35-36](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L35) |
| quote_mint | [programs/mayhem/src/instructions/sell_pump_swap.rs:36-38](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L36) |
| pool_base_token_account | [programs/mayhem/src/instructions/sell_pump_swap.rs:38-39](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L38) |
| pool_quote_token_account | [programs/mayhem/src/instructions/sell_pump_swap.rs:39-40](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L39) |
| protocol_fee_recipient | [programs/mayhem/src/instructions/sell_pump_swap.rs:40-42](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L40) |
| protocol_fee_recipient_token_account | [programs/mayhem/src/instructions/sell_pump_swap.rs:42-44](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L42) |
| pump_swap_event_authority | [programs/mayhem/src/instructions/sell_pump_swap.rs:44-46](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L44) |
| pump_swap_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:46-48](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L46) |
| coin_creator_vault_ata | [programs/mayhem/src/instructions/sell_pump_swap.rs:48-50](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L48) |
| coin_creator_vault_authority | [programs/mayhem/src/instructions/sell_pump_swap.rs:50-52](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L50) |
| fee_config | [programs/mayhem/src/instructions/sell_pump_swap.rs:52-54](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L52) |
| fee_program | [programs/mayhem/src/instructions/sell_pump_swap.rs:54-56](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L54) |
| event_authority | [programs/mayhem/src/instructions/sell_pump_swap.rs:56-58](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L56) |
| program | [programs/mayhem/src/instructions/sell_pump_swap.rs:58-59](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L58) |
| pool_v2 | [programs/mayhem/src/instructions/sell_pump_swap.rs:59-61](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L59) |
| buyback_recipient | [programs/mayhem/src/instructions/sell_pump_swap.rs:61-63](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L61) |
| buyback_recipient_ata | [programs/mayhem/src/instructions/sell_pump_swap.rs:63-65](evidence/accepted/programs/mayhem/src/instructions/sell_pump_swap.rs#L63) |

## SellV2 — programs/mayhem/src/instructions/sell_v2.rs

[programs/mayhem/src/instructions/sell_v2.rs:15-65](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L15); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: mayhem.sell_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/instructions/sell_v2.rs:15-16](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L15) |
| global_params | [programs/mayhem/src/instructions/sell_v2.rs:16-17](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L16) |
| mayhem_state | [programs/mayhem/src/instructions/sell_v2.rs:17-18](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L17) |
| mint | [programs/mayhem/src/instructions/sell_v2.rs:18-19](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L18) |
| quote_mint | [programs/mayhem/src/instructions/sell_v2.rs:19-21](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L19) |
| associated_token_program | [programs/mayhem/src/instructions/sell_v2.rs:21-22](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L21) |
| mayhem_base_token_vault | [programs/mayhem/src/instructions/sell_v2.rs:22-23](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L22) |
| mayhem_quote_token_vault | [programs/mayhem/src/instructions/sell_v2.rs:23-24](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L23) |
| sol_vault | [programs/mayhem/src/instructions/sell_v2.rs:24-26](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L24) |
| system_program | [programs/mayhem/src/instructions/sell_v2.rs:26-27](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L26) |
| token_program | [programs/mayhem/src/instructions/sell_v2.rs:27-28](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L27) |
| quote_token_program | [programs/mayhem/src/instructions/sell_v2.rs:28-29](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L28) |
| global | [programs/mayhem/src/instructions/sell_v2.rs:29-31](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L29) |
| bonding_curve | [programs/mayhem/src/instructions/sell_v2.rs:31-32](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L31) |
| associated_quote_bonding_curve | [programs/mayhem/src/instructions/sell_v2.rs:32-34](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L32) |
| fee_recipient | [programs/mayhem/src/instructions/sell_v2.rs:34-36](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L34) |
| fee_recipient_ata | [programs/mayhem/src/instructions/sell_v2.rs:36-38](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L36) |
| associated_base_bonding_curve | [programs/mayhem/src/instructions/sell_v2.rs:38-39](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L38) |
| creator_vault | [programs/mayhem/src/instructions/sell_v2.rs:39-41](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L39) |
| associated_creator_vault | [programs/mayhem/src/instructions/sell_v2.rs:41-43](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L41) |
| sharing_config | [programs/mayhem/src/instructions/sell_v2.rs:43-45](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L43) |
| pump_event_authority | [programs/mayhem/src/instructions/sell_v2.rs:45-47](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L45) |
| pump_program | [programs/mayhem/src/instructions/sell_v2.rs:47-49](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L47) |
| user_volume_accumulator | [programs/mayhem/src/instructions/sell_v2.rs:49-51](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L49) |
| associated_user_volume_accumulator | [programs/mayhem/src/instructions/sell_v2.rs:51-53](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L51) |
| fee_config | [programs/mayhem/src/instructions/sell_v2.rs:53-55](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L53) |
| fee_program | [programs/mayhem/src/instructions/sell_v2.rs:55-57](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L55) |
| event_authority | [programs/mayhem/src/instructions/sell_v2.rs:57-59](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L57) |
| program | [programs/mayhem/src/instructions/sell_v2.rs:59-60](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L59) |
| buyback_recipient | [programs/mayhem/src/instructions/sell_v2.rs:60-62](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L60) |
| buyback_recipient_ata | [programs/mayhem/src/instructions/sell_v2.rs:62-64](evidence/accepted/programs/mayhem/src/instructions/sell_v2.rs#L62) |

## Admin — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:218-229](evidence/accepted/programs/mayhem/src/lib.rs#L218); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.update_global_params, mayhem.update_admin, mayhem.update_trader, mayhem.update_max_sol_per_sweep, mayhem.update_max_stable_per_sweep, mayhem.reset_sol_deployed, mayhem.reset_stable_deployed, mayhem.reset_state, mayhem.stop_trading, mayhem.resume_trading.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:218-220](evidence/accepted/programs/mayhem/src/lib.rs#L218) |
| global_params | [programs/mayhem/src/lib.rs:220-222](evidence/accepted/programs/mayhem/src/lib.rs#L220) |
| system_program | [programs/mayhem/src/lib.rs:222-223](evidence/accepted/programs/mayhem/src/lib.rs#L222) |
| event_authority | [programs/mayhem/src/lib.rs:223-226](evidence/accepted/programs/mayhem/src/lib.rs#L223) |
| program | [programs/mayhem/src/lib.rs:226-228](evidence/accepted/programs/mayhem/src/lib.rs#L226) |

## InitializeGlobalParams — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:313-319](evidence/accepted/programs/mayhem/src/lib.rs#L313); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.initialize_global_params.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:313-315](evidence/accepted/programs/mayhem/src/lib.rs#L313) |
| global_params | [programs/mayhem/src/lib.rs:315-317](evidence/accepted/programs/mayhem/src/lib.rs#L315) |
| system_program | [programs/mayhem/src/lib.rs:317-318](evidence/accepted/programs/mayhem/src/lib.rs#L317) |

## InitializeFeeRecipient — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:330-345](evidence/accepted/programs/mayhem/src/lib.rs#L330); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.initialize_fee_recipient.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:330-332](evidence/accepted/programs/mayhem/src/lib.rs#L330) |
| wsol_mint | [programs/mayhem/src/lib.rs:332-334](evidence/accepted/programs/mayhem/src/lib.rs#L332) |
| fee_recipient | [programs/mayhem/src/lib.rs:334-336](evidence/accepted/programs/mayhem/src/lib.rs#L334) |
| fee_recipient_ata | [programs/mayhem/src/lib.rs:336-338](evidence/accepted/programs/mayhem/src/lib.rs#L336) |
| global_params | [programs/mayhem/src/lib.rs:338-340](evidence/accepted/programs/mayhem/src/lib.rs#L338) |
| system_program | [programs/mayhem/src/lib.rs:340-341](evidence/accepted/programs/mayhem/src/lib.rs#L340) |
| token_program | [programs/mayhem/src/lib.rs:341-343](evidence/accepted/programs/mayhem/src/lib.rs#L341) |
| associated_token_program | [programs/mayhem/src/lib.rs:343-344](evidence/accepted/programs/mayhem/src/lib.rs#L343) |

## ExtendAccount — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:348-359](evidence/accepted/programs/mayhem/src/lib.rs#L348); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.extend_account.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| account | [programs/mayhem/src/lib.rs:348-351](evidence/accepted/programs/mayhem/src/lib.rs#L348) |
| user | [programs/mayhem/src/lib.rs:351-352](evidence/accepted/programs/mayhem/src/lib.rs#L351) |
| system_program | [programs/mayhem/src/lib.rs:352-353](evidence/accepted/programs/mayhem/src/lib.rs#L352) |
| event_authority | [programs/mayhem/src/lib.rs:353-356](evidence/accepted/programs/mayhem/src/lib.rs#L353) |
| program | [programs/mayhem/src/lib.rs:356-358](evidence/accepted/programs/mayhem/src/lib.rs#L356) |

## WithdrawAdmin — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:371-380](evidence/accepted/programs/mayhem/src/lib.rs#L371); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.withdraw_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:371-373](evidence/accepted/programs/mayhem/src/lib.rs#L371) |
| global_params | [programs/mayhem/src/lib.rs:373-375](evidence/accepted/programs/mayhem/src/lib.rs#L373) |
| sol_vault | [programs/mayhem/src/lib.rs:375-378](evidence/accepted/programs/mayhem/src/lib.rs#L375) |
| system_program | [programs/mayhem/src/lib.rs:378-379](evidence/accepted/programs/mayhem/src/lib.rs#L378) |

## WithdrawQuoteAdmin — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:383-397](evidence/accepted/programs/mayhem/src/lib.rs#L383); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.withdraw_quote_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:383-384](evidence/accepted/programs/mayhem/src/lib.rs#L383) |
| global_params | [programs/mayhem/src/lib.rs:384-386](evidence/accepted/programs/mayhem/src/lib.rs#L384) |
| sol_vault | [programs/mayhem/src/lib.rs:386-388](evidence/accepted/programs/mayhem/src/lib.rs#L386) |
| quote_mint | [programs/mayhem/src/lib.rs:388-389](evidence/accepted/programs/mayhem/src/lib.rs#L388) |
| vault_quote_ata | [programs/mayhem/src/lib.rs:389-391](evidence/accepted/programs/mayhem/src/lib.rs#L389) |
| admin_quote_ata | [programs/mayhem/src/lib.rs:391-393](evidence/accepted/programs/mayhem/src/lib.rs#L391) |
| token_program | [programs/mayhem/src/lib.rs:393-394](evidence/accepted/programs/mayhem/src/lib.rs#L393) |
| associated_token_program | [programs/mayhem/src/lib.rs:394-395](evidence/accepted/programs/mayhem/src/lib.rs#L394) |
| system_program | [programs/mayhem/src/lib.rs:395-396](evidence/accepted/programs/mayhem/src/lib.rs#L395) |

## SweepFees — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:433-446](evidence/accepted/programs/mayhem/src/lib.rs#L433); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.sweep_fees.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| trader | [programs/mayhem/src/lib.rs:433-434](evidence/accepted/programs/mayhem/src/lib.rs#L433) |
| global_params | [programs/mayhem/src/lib.rs:434-435](evidence/accepted/programs/mayhem/src/lib.rs#L434) |
| quote_mint | [programs/mayhem/src/lib.rs:435-436](evidence/accepted/programs/mayhem/src/lib.rs#L435) |
| trader_quote_ata | [programs/mayhem/src/lib.rs:436-437](evidence/accepted/programs/mayhem/src/lib.rs#L436) |
| system_program | [programs/mayhem/src/lib.rs:437-438](evidence/accepted/programs/mayhem/src/lib.rs#L437) |
| token_program | [programs/mayhem/src/lib.rs:438-439](evidence/accepted/programs/mayhem/src/lib.rs#L438) |
| associated_token_program | [programs/mayhem/src/lib.rs:439-440](evidence/accepted/programs/mayhem/src/lib.rs#L439) |
| event_authority | [programs/mayhem/src/lib.rs:440-443](evidence/accepted/programs/mayhem/src/lib.rs#L440) |
| program | [programs/mayhem/src/lib.rs:443-445](evidence/accepted/programs/mayhem/src/lib.rs#L443) |

## SweepFeesAdmin — programs/mayhem/src/lib.rs

[programs/mayhem/src/lib.rs:449-462](evidence/accepted/programs/mayhem/src/lib.rs#L449); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: mayhem.sweep_fees_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/mayhem/src/lib.rs:449-450](evidence/accepted/programs/mayhem/src/lib.rs#L449) |
| global_params | [programs/mayhem/src/lib.rs:450-451](evidence/accepted/programs/mayhem/src/lib.rs#L450) |
| quote_mint | [programs/mayhem/src/lib.rs:451-452](evidence/accepted/programs/mayhem/src/lib.rs#L451) |
| admin_quote_ata | [programs/mayhem/src/lib.rs:452-453](evidence/accepted/programs/mayhem/src/lib.rs#L452) |
| system_program | [programs/mayhem/src/lib.rs:453-454](evidence/accepted/programs/mayhem/src/lib.rs#L453) |
| token_program | [programs/mayhem/src/lib.rs:454-455](evidence/accepted/programs/mayhem/src/lib.rs#L454) |
| associated_token_program | [programs/mayhem/src/lib.rs:455-456](evidence/accepted/programs/mayhem/src/lib.rs#L455) |
| event_authority | [programs/mayhem/src/lib.rs:456-459](evidence/accepted/programs/mayhem/src/lib.rs#L456) |
| program | [programs/mayhem/src/lib.rs:459-461](evidence/accepted/programs/mayhem/src/lib.rs#L459) |

## AdminCto — programs/pump/src/admin_cto.rs

[programs/pump/src/admin_cto.rs:9-81](evidence/accepted/programs/pump/src/admin_cto.rs#L9); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.admin_cto.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin_set_creator_authority | [programs/pump/src/admin_cto.rs:9-12](evidence/accepted/programs/pump/src/admin_cto.rs#L9) |
| global | [programs/pump/src/admin_cto.rs:12-15](evidence/accepted/programs/pump/src/admin_cto.rs#L12) |
| mint | [programs/pump/src/admin_cto.rs:15-17](evidence/accepted/programs/pump/src/admin_cto.rs#L15) |
| quote_mint | [programs/pump/src/admin_cto.rs:17-20](evidence/accepted/programs/pump/src/admin_cto.rs#L17) |
| quote_token_program | [programs/pump/src/admin_cto.rs:20-22](evidence/accepted/programs/pump/src/admin_cto.rs#L20) |
| associated_token_program | [programs/pump/src/admin_cto.rs:22-24](evidence/accepted/programs/pump/src/admin_cto.rs#L22) |
| system_program | [programs/pump/src/admin_cto.rs:24-26](evidence/accepted/programs/pump/src/admin_cto.rs#L24) |
| bonding_curve | [programs/pump/src/admin_cto.rs:26-29](evidence/accepted/programs/pump/src/admin_cto.rs#L26) |
| current_creator | [programs/pump/src/admin_cto.rs:29-32](evidence/accepted/programs/pump/src/admin_cto.rs#L29) |
| current_creator_quote_token_account | [programs/pump/src/admin_cto.rs:32-35](evidence/accepted/programs/pump/src/admin_cto.rs#L32) |
| creator_vault | [programs/pump/src/admin_cto.rs:35-38](evidence/accepted/programs/pump/src/admin_cto.rs#L35) |
| creator_vault_quote_token_account | [programs/pump/src/admin_cto.rs:38-41](evidence/accepted/programs/pump/src/admin_cto.rs#L38) |
| holder_creator_vault | [programs/pump/src/admin_cto.rs:41-44](evidence/accepted/programs/pump/src/admin_cto.rs#L41) |
| holder_creator_vault_quote_token_account | [programs/pump/src/admin_cto.rs:44-47](evidence/accepted/programs/pump/src/admin_cto.rs#L44) |
| pump_amm | [programs/pump/src/admin_cto.rs:47-49](evidence/accepted/programs/pump/src/admin_cto.rs#L47) |
| amm_global_config | [programs/pump/src/admin_cto.rs:49-52](evidence/accepted/programs/pump/src/admin_cto.rs#L49) |
| pool_authority | [programs/pump/src/admin_cto.rs:52-55](evidence/accepted/programs/pump/src/admin_cto.rs#L52) |
| pool | [programs/pump/src/admin_cto.rs:55-58](evidence/accepted/programs/pump/src/admin_cto.rs#L55) |
| pump_amm_event_authority | [programs/pump/src/admin_cto.rs:58-61](evidence/accepted/programs/pump/src/admin_cto.rs#L58) |
| coin_creator_vault_authority | [programs/pump/src/admin_cto.rs:61-64](evidence/accepted/programs/pump/src/admin_cto.rs#L61) |
| coin_creator_vault_ata | [programs/pump/src/admin_cto.rs:64-67](evidence/accepted/programs/pump/src/admin_cto.rs#L64) |
| sharing_config | [programs/pump/src/admin_cto.rs:67-70](evidence/accepted/programs/pump/src/admin_cto.rs#L67) |
| pump_fees | [programs/pump/src/admin_cto.rs:70-72](evidence/accepted/programs/pump/src/admin_cto.rs#L70) |
| pump_fees_event_authority | [programs/pump/src/admin_cto.rs:72-75](evidence/accepted/programs/pump/src/admin_cto.rs#L72) |
| event_authority | [programs/pump/src/admin_cto.rs:75-78](evidence/accepted/programs/pump/src/admin_cto.rs#L75) |
| program | [programs/pump/src/admin_cto.rs:78-80](evidence/accepted/programs/pump/src/admin_cto.rs#L78) |

## BuyV2 — programs/pump/src/buy_v2.rs

[programs/pump/src/buy_v2.rs:9-49](evidence/accepted/programs/pump/src/buy_v2.rs#L9); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.buy_exact_quote_in_v2, pump.buy_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/buy_v2.rs:9-10](evidence/accepted/programs/pump/src/buy_v2.rs#L9) |
| base_mint | [programs/pump/src/buy_v2.rs:10-11](evidence/accepted/programs/pump/src/buy_v2.rs#L10) |
| quote_mint | [programs/pump/src/buy_v2.rs:11-12](evidence/accepted/programs/pump/src/buy_v2.rs#L11) |
| base_token_program | [programs/pump/src/buy_v2.rs:12-13](evidence/accepted/programs/pump/src/buy_v2.rs#L12) |
| quote_token_program | [programs/pump/src/buy_v2.rs:13-14](evidence/accepted/programs/pump/src/buy_v2.rs#L13) |
| associated_token_program | [programs/pump/src/buy_v2.rs:14-15](evidence/accepted/programs/pump/src/buy_v2.rs#L14) |
| fee_recipient | [programs/pump/src/buy_v2.rs:15-17](evidence/accepted/programs/pump/src/buy_v2.rs#L15) |
| associated_quote_fee_recipient | [programs/pump/src/buy_v2.rs:17-19](evidence/accepted/programs/pump/src/buy_v2.rs#L17) |
| buyback_fee_recipient | [programs/pump/src/buy_v2.rs:19-21](evidence/accepted/programs/pump/src/buy_v2.rs#L19) |
| associated_quote_buyback_fee_recipient | [programs/pump/src/buy_v2.rs:21-23](evidence/accepted/programs/pump/src/buy_v2.rs#L21) |
| bonding_curve | [programs/pump/src/buy_v2.rs:23-24](evidence/accepted/programs/pump/src/buy_v2.rs#L23) |
| associated_base_bonding_curve | [programs/pump/src/buy_v2.rs:24-25](evidence/accepted/programs/pump/src/buy_v2.rs#L24) |
| associated_quote_bonding_curve | [programs/pump/src/buy_v2.rs:25-27](evidence/accepted/programs/pump/src/buy_v2.rs#L25) |
| user | [programs/pump/src/buy_v2.rs:27-28](evidence/accepted/programs/pump/src/buy_v2.rs#L27) |
| associated_base_user | [programs/pump/src/buy_v2.rs:28-29](evidence/accepted/programs/pump/src/buy_v2.rs#L28) |
| associated_quote_user | [programs/pump/src/buy_v2.rs:29-31](evidence/accepted/programs/pump/src/buy_v2.rs#L29) |
| creator_vault | [programs/pump/src/buy_v2.rs:31-33](evidence/accepted/programs/pump/src/buy_v2.rs#L31) |
| associated_creator_vault | [programs/pump/src/buy_v2.rs:33-35](evidence/accepted/programs/pump/src/buy_v2.rs#L33) |
| sharing_config | [programs/pump/src/buy_v2.rs:35-37](evidence/accepted/programs/pump/src/buy_v2.rs#L35) |
| global_volume_accumulator | [programs/pump/src/buy_v2.rs:37-38](evidence/accepted/programs/pump/src/buy_v2.rs#L37) |
| user_volume_accumulator | [programs/pump/src/buy_v2.rs:38-40](evidence/accepted/programs/pump/src/buy_v2.rs#L38) |
| associated_user_volume_accumulator | [programs/pump/src/buy_v2.rs:40-42](evidence/accepted/programs/pump/src/buy_v2.rs#L40) |
| fee_config | [programs/pump/src/buy_v2.rs:42-43](evidence/accepted/programs/pump/src/buy_v2.rs#L42) |
| fee_program | [programs/pump/src/buy_v2.rs:43-44](evidence/accepted/programs/pump/src/buy_v2.rs#L43) |
| system_program | [programs/pump/src/buy_v2.rs:44-45](evidence/accepted/programs/pump/src/buy_v2.rs#L44) |
| event_authority | [programs/pump/src/buy_v2.rs:45-47](evidence/accepted/programs/pump/src/buy_v2.rs#L45) |
| program | [programs/pump/src/buy_v2.rs:47-48](evidence/accepted/programs/pump/src/buy_v2.rs#L47) |

## ClaimCashback — programs/pump/src/cashback.rs

[programs/pump/src/cashback.rs:6-11](evidence/accepted/programs/pump/src/cashback.rs#L6); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.claim_cashback.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump/src/cashback.rs:6-8](evidence/accepted/programs/pump/src/cashback.rs#L6) |
| user_volume_accumulator | [programs/pump/src/cashback.rs:8-9](evidence/accepted/programs/pump/src/cashback.rs#L8) |
| system_program | [programs/pump/src/cashback.rs:9-10](evidence/accepted/programs/pump/src/cashback.rs#L9) |

## ClaimCashbackV2 — programs/pump/src/cashback.rs

[programs/pump/src/cashback.rs:14-28](evidence/accepted/programs/pump/src/cashback.rs#L14); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.claim_cashback_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump/src/cashback.rs:14-16](evidence/accepted/programs/pump/src/cashback.rs#L14) |
| user_volume_accumulator | [programs/pump/src/cashback.rs:16-17](evidence/accepted/programs/pump/src/cashback.rs#L16) |
| quote_mint | [programs/pump/src/cashback.rs:17-19](evidence/accepted/programs/pump/src/cashback.rs#L17) |
| quote_token_program | [programs/pump/src/cashback.rs:19-21](evidence/accepted/programs/pump/src/cashback.rs#L19) |
| associated_token_program | [programs/pump/src/cashback.rs:21-22](evidence/accepted/programs/pump/src/cashback.rs#L21) |
| associated_user_volume_accumulator | [programs/pump/src/cashback.rs:22-24](evidence/accepted/programs/pump/src/cashback.rs#L22) |
| associated_quote_user | [programs/pump/src/cashback.rs:24-26](evidence/accepted/programs/pump/src/cashback.rs#L24) |
| system_program | [programs/pump/src/cashback.rs:26-27](evidence/accepted/programs/pump/src/cashback.rs#L26) |

## CollectCreatorFeeV2 — programs/pump/src/collect_v2.rs

[programs/pump/src/collect_v2.rs:5-18](evidence/accepted/programs/pump/src/collect_v2.rs#L5); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.collect_creator_fee_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| creator | [programs/pump/src/collect_v2.rs:5-7](evidence/accepted/programs/pump/src/collect_v2.rs#L5) |
| creator_token_account | [programs/pump/src/collect_v2.rs:7-9](evidence/accepted/programs/pump/src/collect_v2.rs#L7) |
| creator_vault | [programs/pump/src/collect_v2.rs:9-11](evidence/accepted/programs/pump/src/collect_v2.rs#L9) |
| creator_vault_token_account | [programs/pump/src/collect_v2.rs:11-13](evidence/accepted/programs/pump/src/collect_v2.rs#L11) |
| quote_mint | [programs/pump/src/collect_v2.rs:13-14](evidence/accepted/programs/pump/src/collect_v2.rs#L13) |
| quote_token_program | [programs/pump/src/collect_v2.rs:14-15](evidence/accepted/programs/pump/src/collect_v2.rs#L14) |
| associated_token_program | [programs/pump/src/collect_v2.rs:15-16](evidence/accepted/programs/pump/src/collect_v2.rs#L15) |
| system_program | [programs/pump/src/collect_v2.rs:16-17](evidence/accepted/programs/pump/src/collect_v2.rs#L16) |

## Create — programs/pump/src/create.rs

[programs/pump/src/create.rs:9-30](evidence/accepted/programs/pump/src/create.rs#L9); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.create.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/create.rs:9-11](evidence/accepted/programs/pump/src/create.rs#L9) |
| mint_authority | [programs/pump/src/create.rs:11-14](evidence/accepted/programs/pump/src/create.rs#L11) |
| bonding_curve | [programs/pump/src/create.rs:14-16](evidence/accepted/programs/pump/src/create.rs#L14) |
| associated_bonding_curve | [programs/pump/src/create.rs:16-18](evidence/accepted/programs/pump/src/create.rs#L16) |
| global | [programs/pump/src/create.rs:18-20](evidence/accepted/programs/pump/src/create.rs#L18) |
| mpl_token_metadata | [programs/pump/src/create.rs:20-21](evidence/accepted/programs/pump/src/create.rs#L20) |
| metadata | [programs/pump/src/create.rs:21-24](evidence/accepted/programs/pump/src/create.rs#L21) |
| user | [programs/pump/src/create.rs:24-25](evidence/accepted/programs/pump/src/create.rs#L24) |
| system_program | [programs/pump/src/create.rs:25-26](evidence/accepted/programs/pump/src/create.rs#L25) |
| token_program | [programs/pump/src/create.rs:26-27](evidence/accepted/programs/pump/src/create.rs#L26) |
| associated_token_program | [programs/pump/src/create.rs:27-28](evidence/accepted/programs/pump/src/create.rs#L27) |
| rent | [programs/pump/src/create.rs:28-29](evidence/accepted/programs/pump/src/create.rs#L28) |

## CreateV2 — programs/pump/src/create_v2.rs

[programs/pump/src/create_v2.rs:12-34](evidence/accepted/programs/pump/src/create_v2.rs#L12); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.create_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/create_v2.rs:12-14](evidence/accepted/programs/pump/src/create_v2.rs#L12) |
| mint_authority | [programs/pump/src/create_v2.rs:14-16](evidence/accepted/programs/pump/src/create_v2.rs#L14) |
| bonding_curve | [programs/pump/src/create_v2.rs:16-17](evidence/accepted/programs/pump/src/create_v2.rs#L16) |
| associated_bonding_curve | [programs/pump/src/create_v2.rs:17-18](evidence/accepted/programs/pump/src/create_v2.rs#L17) |
| global | [programs/pump/src/create_v2.rs:18-19](evidence/accepted/programs/pump/src/create_v2.rs#L18) |
| user | [programs/pump/src/create_v2.rs:19-20](evidence/accepted/programs/pump/src/create_v2.rs#L19) |
| system_program | [programs/pump/src/create_v2.rs:20-21](evidence/accepted/programs/pump/src/create_v2.rs#L20) |
| token_program | [programs/pump/src/create_v2.rs:21-22](evidence/accepted/programs/pump/src/create_v2.rs#L21) |
| associated_token_program | [programs/pump/src/create_v2.rs:22-23](evidence/accepted/programs/pump/src/create_v2.rs#L22) |
| mayhem_program_id | [programs/pump/src/create_v2.rs:23-25](evidence/accepted/programs/pump/src/create_v2.rs#L23) |
| global_params | [programs/pump/src/create_v2.rs:25-27](evidence/accepted/programs/pump/src/create_v2.rs#L25) |
| sol_vault | [programs/pump/src/create_v2.rs:27-29](evidence/accepted/programs/pump/src/create_v2.rs#L27) |
| mayhem_state | [programs/pump/src/create_v2.rs:29-31](evidence/accepted/programs/pump/src/create_v2.rs#L29) |
| mayhem_token_vault | [programs/pump/src/create_v2.rs:31-33](evidence/accepted/programs/pump/src/create_v2.rs#L31) |

## MigrateBondingCurveCreator — programs/pump/src/creator_migration.rs

[programs/pump/src/creator_migration.rs:15-23](evidence/accepted/programs/pump/src/creator_migration.rs#L15); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.migrate_bonding_curve_creator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/creator_migration.rs:15-16](evidence/accepted/programs/pump/src/creator_migration.rs#L15) |
| bonding_curve | [programs/pump/src/creator_migration.rs:16-17](evidence/accepted/programs/pump/src/creator_migration.rs#L16) |
| sharing_config | [programs/pump/src/creator_migration.rs:17-18](evidence/accepted/programs/pump/src/creator_migration.rs#L17) |
| event_authority | [programs/pump/src/creator_migration.rs:18-20](evidence/accepted/programs/pump/src/creator_migration.rs#L18) |
| program | [programs/pump/src/creator_migration.rs:20-22](evidence/accepted/programs/pump/src/creator_migration.rs#L20) |

## DistributeCreatorFees — programs/pump/src/distribution.rs

[programs/pump/src/distribution.rs:30-39](evidence/accepted/programs/pump/src/distribution.rs#L30); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.distribute_creator_fees.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/distribution.rs:30-31](evidence/accepted/programs/pump/src/distribution.rs#L30) |
| bonding_curve | [programs/pump/src/distribution.rs:31-32](evidence/accepted/programs/pump/src/distribution.rs#L31) |
| sharing_config | [programs/pump/src/distribution.rs:32-33](evidence/accepted/programs/pump/src/distribution.rs#L32) |
| creator_vault | [programs/pump/src/distribution.rs:33-34](evidence/accepted/programs/pump/src/distribution.rs#L33) |
| system_program | [programs/pump/src/distribution.rs:34-35](evidence/accepted/programs/pump/src/distribution.rs#L34) |
| event_authority | [programs/pump/src/distribution.rs:35-37](evidence/accepted/programs/pump/src/distribution.rs#L35) |
| program | [programs/pump/src/distribution.rs:37-38](evidence/accepted/programs/pump/src/distribution.rs#L37) |

## DistributeCreatorFeesV2 — programs/pump/src/distribution.rs

[programs/pump/src/distribution.rs:59-75](evidence/accepted/programs/pump/src/distribution.rs#L59); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.distribute_creator_fees_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump/src/distribution.rs:59-60](evidence/accepted/programs/pump/src/distribution.rs#L59) |
| mint | [programs/pump/src/distribution.rs:60-61](evidence/accepted/programs/pump/src/distribution.rs#L60) |
| bonding_curve | [programs/pump/src/distribution.rs:61-62](evidence/accepted/programs/pump/src/distribution.rs#L61) |
| sharing_config | [programs/pump/src/distribution.rs:62-63](evidence/accepted/programs/pump/src/distribution.rs#L62) |
| creator_vault | [programs/pump/src/distribution.rs:63-65](evidence/accepted/programs/pump/src/distribution.rs#L63) |
| system_program | [programs/pump/src/distribution.rs:65-66](evidence/accepted/programs/pump/src/distribution.rs#L65) |
| event_authority | [programs/pump/src/distribution.rs:66-68](evidence/accepted/programs/pump/src/distribution.rs#L66) |
| program | [programs/pump/src/distribution.rs:68-69](evidence/accepted/programs/pump/src/distribution.rs#L68) |
| creator_vault_quote_token_account | [programs/pump/src/distribution.rs:69-71](evidence/accepted/programs/pump/src/distribution.rs#L69) |
| quote_mint | [programs/pump/src/distribution.rs:71-72](evidence/accepted/programs/pump/src/distribution.rs#L71) |
| quote_token_program | [programs/pump/src/distribution.rs:72-73](evidence/accepted/programs/pump/src/distribution.rs#L72) |
| associated_token_program | [programs/pump/src/distribution.rs:73-74](evidence/accepted/programs/pump/src/distribution.rs#L73) |

## ExtendAccount — programs/pump/src/extend.rs

[programs/pump/src/extend.rs:4-11](evidence/accepted/programs/pump/src/extend.rs#L4); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.extend_account.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| account | [programs/pump/src/extend.rs:4-7](evidence/accepted/programs/pump/src/extend.rs#L4) |
| user | [programs/pump/src/extend.rs:7-9](evidence/accepted/programs/pump/src/extend.rs#L7) |
| system_program | [programs/pump/src/extend.rs:9-10](evidence/accepted/programs/pump/src/extend.rs#L9) |

## Initialize — programs/pump/src/global_init.rs

[programs/pump/src/global_init.rs:4-9](evidence/accepted/programs/pump/src/global_init.rs#L4); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.initialize.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/global_init.rs:4-6](evidence/accepted/programs/pump/src/global_init.rs#L4) |
| user | [programs/pump/src/global_init.rs:6-7](evidence/accepted/programs/pump/src/global_init.rs#L6) |
| system_program | [programs/pump/src/global_init.rs:7-8](evidence/accepted/programs/pump/src/global_init.rs#L7) |

## DistributeFeeToHolders — programs/pump/src/holder_distribution.rs

[programs/pump/src/holder_distribution.rs:7-19](evidence/accepted/programs/pump/src/holder_distribution.rs#L7); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.distribute_fee_to_holders.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/holder_distribution.rs:7-8](evidence/accepted/programs/pump/src/holder_distribution.rs#L7) |
| holder_reward_claim_authority | [programs/pump/src/holder_distribution.rs:8-9](evidence/accepted/programs/pump/src/holder_distribution.rs#L8) |
| mint | [programs/pump/src/holder_distribution.rs:9-11](evidence/accepted/programs/pump/src/holder_distribution.rs#L9) |
| holder_rewards | [programs/pump/src/holder_distribution.rs:11-13](evidence/accepted/programs/pump/src/holder_distribution.rs#L11) |
| holder_rewards_token_account | [programs/pump/src/holder_distribution.rs:13-14](evidence/accepted/programs/pump/src/holder_distribution.rs#L13) |
| quote_mint | [programs/pump/src/holder_distribution.rs:14-15](evidence/accepted/programs/pump/src/holder_distribution.rs#L14) |
| quote_token_program | [programs/pump/src/holder_distribution.rs:15-16](evidence/accepted/programs/pump/src/holder_distribution.rs#L15) |
| associated_token_program | [programs/pump/src/holder_distribution.rs:16-17](evidence/accepted/programs/pump/src/holder_distribution.rs#L16) |
| system_program | [programs/pump/src/holder_distribution.rs:17-18](evidence/accepted/programs/pump/src/holder_distribution.rs#L17) |

## AdminSetIdlAuthority — programs/pump/src/idl_authority.rs

[programs/pump/src/idl_authority.rs:4-15](evidence/accepted/programs/pump/src/idl_authority.rs#L4); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.admin_set_idl_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump/src/idl_authority.rs:4-5](evidence/accepted/programs/pump/src/idl_authority.rs#L4) |
| global | [programs/pump/src/idl_authority.rs:5-7](evidence/accepted/programs/pump/src/idl_authority.rs#L5) |
| idl_account | [programs/pump/src/idl_authority.rs:7-10](evidence/accepted/programs/pump/src/idl_authority.rs#L7) |
| system_program | [programs/pump/src/idl_authority.rs:10-11](evidence/accepted/programs/pump/src/idl_authority.rs#L10) |
| program_signer | [programs/pump/src/idl_authority.rs:11-14](evidence/accepted/programs/pump/src/idl_authority.rs#L11) |

## LegacyBuy — programs/pump/src/legacy_buy.rs

[programs/pump/src/legacy_buy.rs:9-33](evidence/accepted/programs/pump/src/legacy_buy.rs#L9); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.buy, pump.buy_exact_sol_in.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/legacy_buy.rs:9-10](evidence/accepted/programs/pump/src/legacy_buy.rs#L9) |
| fee_recipient | [programs/pump/src/legacy_buy.rs:10-12](evidence/accepted/programs/pump/src/legacy_buy.rs#L10) |
| mint | [programs/pump/src/legacy_buy.rs:12-13](evidence/accepted/programs/pump/src/legacy_buy.rs#L12) |
| bonding_curve | [programs/pump/src/legacy_buy.rs:13-14](evidence/accepted/programs/pump/src/legacy_buy.rs#L13) |
| associated_bonding_curve | [programs/pump/src/legacy_buy.rs:14-15](evidence/accepted/programs/pump/src/legacy_buy.rs#L14) |
| associated_user | [programs/pump/src/legacy_buy.rs:15-16](evidence/accepted/programs/pump/src/legacy_buy.rs#L15) |
| user | [programs/pump/src/legacy_buy.rs:16-17](evidence/accepted/programs/pump/src/legacy_buy.rs#L16) |
| system_program | [programs/pump/src/legacy_buy.rs:17-18](evidence/accepted/programs/pump/src/legacy_buy.rs#L17) |
| token_program | [programs/pump/src/legacy_buy.rs:18-19](evidence/accepted/programs/pump/src/legacy_buy.rs#L18) |
| creator_vault | [programs/pump/src/legacy_buy.rs:19-21](evidence/accepted/programs/pump/src/legacy_buy.rs#L19) |
| event_authority | [programs/pump/src/legacy_buy.rs:21-23](evidence/accepted/programs/pump/src/legacy_buy.rs#L21) |
| program | [programs/pump/src/legacy_buy.rs:23-25](evidence/accepted/programs/pump/src/legacy_buy.rs#L23) |
| global_volume_accumulator | [programs/pump/src/legacy_buy.rs:25-26](evidence/accepted/programs/pump/src/legacy_buy.rs#L25) |
| user_volume_accumulator | [programs/pump/src/legacy_buy.rs:26-27](evidence/accepted/programs/pump/src/legacy_buy.rs#L26) |
| fee_config | [programs/pump/src/legacy_buy.rs:27-30](evidence/accepted/programs/pump/src/legacy_buy.rs#L27) |
| fee_program | [programs/pump/src/legacy_buy.rs:30-32](evidence/accepted/programs/pump/src/legacy_buy.rs#L30) |

## LegacySell — programs/pump/src/legacy_sell.rs

[programs/pump/src/legacy_sell.rs:21-43](evidence/accepted/programs/pump/src/legacy_sell.rs#L21); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.sell.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/legacy_sell.rs:21-22](evidence/accepted/programs/pump/src/legacy_sell.rs#L21) |
| fee_recipient | [programs/pump/src/legacy_sell.rs:22-24](evidence/accepted/programs/pump/src/legacy_sell.rs#L22) |
| mint | [programs/pump/src/legacy_sell.rs:24-25](evidence/accepted/programs/pump/src/legacy_sell.rs#L24) |
| bonding_curve | [programs/pump/src/legacy_sell.rs:25-26](evidence/accepted/programs/pump/src/legacy_sell.rs#L25) |
| associated_bonding_curve | [programs/pump/src/legacy_sell.rs:26-27](evidence/accepted/programs/pump/src/legacy_sell.rs#L26) |
| associated_user | [programs/pump/src/legacy_sell.rs:27-28](evidence/accepted/programs/pump/src/legacy_sell.rs#L27) |
| user | [programs/pump/src/legacy_sell.rs:28-29](evidence/accepted/programs/pump/src/legacy_sell.rs#L28) |
| system_program | [programs/pump/src/legacy_sell.rs:29-30](evidence/accepted/programs/pump/src/legacy_sell.rs#L29) |
| creator_vault | [programs/pump/src/legacy_sell.rs:30-32](evidence/accepted/programs/pump/src/legacy_sell.rs#L30) |
| token_program | [programs/pump/src/legacy_sell.rs:32-33](evidence/accepted/programs/pump/src/legacy_sell.rs#L32) |
| event_authority | [programs/pump/src/legacy_sell.rs:33-35](evidence/accepted/programs/pump/src/legacy_sell.rs#L33) |
| program | [programs/pump/src/legacy_sell.rs:35-37](evidence/accepted/programs/pump/src/legacy_sell.rs#L35) |
| fee_config | [programs/pump/src/legacy_sell.rs:37-40](evidence/accepted/programs/pump/src/legacy_sell.rs#L37) |
| fee_program | [programs/pump/src/legacy_sell.rs:40-42](evidence/accepted/programs/pump/src/legacy_sell.rs#L40) |

## AdminGlobal — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:166-171](evidence/accepted/programs/pump/src/lib.rs#L166); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.add_quote_mint, pump.remove_quote_mint, pump.set_max_curve_depth, pump.set_virtual_quote_reserves, pump.toggle_cashback_enabled, pump.toggle_create_v2, pump.toggle_mayhem_mode, pump.update_buyback_config, pump.update_creator_fee_config, pump.update_holder_reward_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/lib.rs:166-168](evidence/accepted/programs/pump/src/lib.rs#L166) |
| authority | [programs/pump/src/lib.rs:168-170](evidence/accepted/programs/pump/src/lib.rs#L168) |

## AdminReadonly — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:429-433](evidence/accepted/programs/pump/src/lib.rs#L429); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.set_reserved_fee_recipients.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/lib.rs:429-431](evidence/accepted/programs/pump/src/lib.rs#L429) |
| authority | [programs/pump/src/lib.rs:431-432](evidence/accepted/programs/pump/src/lib.rs#L431) |

## UpdateGlobalAuthority — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:436-442](evidence/accepted/programs/pump/src/lib.rs#L436); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.update_global_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/lib.rs:436-438](evidence/accepted/programs/pump/src/lib.rs#L436) |
| authority | [programs/pump/src/lib.rs:438-439](evidence/accepted/programs/pump/src/lib.rs#L438) |
| new_authority | [programs/pump/src/lib.rs:439-441](evidence/accepted/programs/pump/src/lib.rs#L439) |

## InitUserVolume — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:455-462](evidence/accepted/programs/pump/src/lib.rs#L455); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.init_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump/src/lib.rs:455-456](evidence/accepted/programs/pump/src/lib.rs#L455) |
| user | [programs/pump/src/lib.rs:456-458](evidence/accepted/programs/pump/src/lib.rs#L456) |
| user_volume_accumulator | [programs/pump/src/lib.rs:458-460](evidence/accepted/programs/pump/src/lib.rs#L458) |
| system_program | [programs/pump/src/lib.rs:460-461](evidence/accepted/programs/pump/src/lib.rs#L460) |

## CloseUserVolume — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:465-469](evidence/accepted/programs/pump/src/lib.rs#L465); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.close_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump/src/lib.rs:465-466](evidence/accepted/programs/pump/src/lib.rs#L465) |
| user_volume_accumulator | [programs/pump/src/lib.rs:466-468](evidence/accepted/programs/pump/src/lib.rs#L466) |

## CollectCreatorFee — programs/pump/src/lib.rs

[programs/pump/src/lib.rs:479-485](evidence/accepted/programs/pump/src/lib.rs#L479); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.collect_creator_fee.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| creator | [programs/pump/src/lib.rs:479-481](evidence/accepted/programs/pump/src/lib.rs#L479) |
| creator_vault | [programs/pump/src/lib.rs:481-483](evidence/accepted/programs/pump/src/lib.rs#L481) |
| system_program | [programs/pump/src/lib.rs:483-484](evidence/accepted/programs/pump/src/lib.rs#L483) |

## Migrate — programs/pump/src/migrate.rs

[programs/pump/src/migrate.rs:6-42](evidence/accepted/programs/pump/src/migrate.rs#L6); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.migrate.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/migrate.rs:6-7](evidence/accepted/programs/pump/src/migrate.rs#L6) |
| withdraw_authority | [programs/pump/src/migrate.rs:7-9](evidence/accepted/programs/pump/src/migrate.rs#L7) |
| mint | [programs/pump/src/migrate.rs:9-10](evidence/accepted/programs/pump/src/migrate.rs#L9) |
| bonding_curve | [programs/pump/src/migrate.rs:10-11](evidence/accepted/programs/pump/src/migrate.rs#L10) |
| associated_bonding_curve | [programs/pump/src/migrate.rs:11-12](evidence/accepted/programs/pump/src/migrate.rs#L11) |
| user | [programs/pump/src/migrate.rs:12-13](evidence/accepted/programs/pump/src/migrate.rs#L12) |
| system_program | [programs/pump/src/migrate.rs:13-14](evidence/accepted/programs/pump/src/migrate.rs#L13) |
| token_program | [programs/pump/src/migrate.rs:14-14](evidence/accepted/programs/pump/src/migrate.rs#L14) |
| pump_amm | [programs/pump/src/migrate.rs:14-14](evidence/accepted/programs/pump/src/migrate.rs#L14) |
| pool | [programs/pump/src/migrate.rs:14-16](evidence/accepted/programs/pump/src/migrate.rs#L14) |
| pool_authority | [programs/pump/src/migrate.rs:16-18](evidence/accepted/programs/pump/src/migrate.rs#L16) |
| pool_authority_mint_account | [programs/pump/src/migrate.rs:18-20](evidence/accepted/programs/pump/src/migrate.rs#L18) |
| pool_authority_wsol_account | [programs/pump/src/migrate.rs:20-22](evidence/accepted/programs/pump/src/migrate.rs#L20) |
| amm_global_config | [programs/pump/src/migrate.rs:22-24](evidence/accepted/programs/pump/src/migrate.rs#L22) |
| wsol_mint | [programs/pump/src/migrate.rs:24-25](evidence/accepted/programs/pump/src/migrate.rs#L24) |
| lp_mint | [programs/pump/src/migrate.rs:25-27](evidence/accepted/programs/pump/src/migrate.rs#L25) |
| user_pool_token_account | [programs/pump/src/migrate.rs:27-29](evidence/accepted/programs/pump/src/migrate.rs#L27) |
| pool_base_token_account | [programs/pump/src/migrate.rs:29-31](evidence/accepted/programs/pump/src/migrate.rs#L29) |
| pool_quote_token_account | [programs/pump/src/migrate.rs:31-33](evidence/accepted/programs/pump/src/migrate.rs#L31) |
| token_2022_program | [programs/pump/src/migrate.rs:33-34](evidence/accepted/programs/pump/src/migrate.rs#L33) |
| associated_token_program | [programs/pump/src/migrate.rs:34-34](evidence/accepted/programs/pump/src/migrate.rs#L34) |
| pump_amm_event_authority | [programs/pump/src/migrate.rs:34-36](evidence/accepted/programs/pump/src/migrate.rs#L34) |
| event_authority | [programs/pump/src/migrate.rs:36-38](evidence/accepted/programs/pump/src/migrate.rs#L36) |
| program | [programs/pump/src/migrate.rs:38-39](evidence/accepted/programs/pump/src/migrate.rs#L38) |
| rent | [programs/pump/src/migrate.rs:39-41](evidence/accepted/programs/pump/src/migrate.rs#L39) |

## MigrateV2 — programs/pump/src/migrate_v2.rs

[programs/pump/src/migrate_v2.rs:6-47](evidence/accepted/programs/pump/src/migrate_v2.rs#L6); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.migrate_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/migrate_v2.rs:6-7](evidence/accepted/programs/pump/src/migrate_v2.rs#L6) |
| withdraw_authority | [programs/pump/src/migrate_v2.rs:7-9](evidence/accepted/programs/pump/src/migrate_v2.rs#L7) |
| base_mint | [programs/pump/src/migrate_v2.rs:9-10](evidence/accepted/programs/pump/src/migrate_v2.rs#L9) |
| quote_mint | [programs/pump/src/migrate_v2.rs:10-11](evidence/accepted/programs/pump/src/migrate_v2.rs#L10) |
| bonding_curve | [programs/pump/src/migrate_v2.rs:11-12](evidence/accepted/programs/pump/src/migrate_v2.rs#L11) |
| associated_base_bonding_curve | [programs/pump/src/migrate_v2.rs:12-13](evidence/accepted/programs/pump/src/migrate_v2.rs#L12) |
| associated_quote_bonding_curve | [programs/pump/src/migrate_v2.rs:13-15](evidence/accepted/programs/pump/src/migrate_v2.rs#L13) |
| user | [programs/pump/src/migrate_v2.rs:15-16](evidence/accepted/programs/pump/src/migrate_v2.rs#L15) |
| system_program | [programs/pump/src/migrate_v2.rs:16-17](evidence/accepted/programs/pump/src/migrate_v2.rs#L16) |
| pump_amm | [programs/pump/src/migrate_v2.rs:17-17](evidence/accepted/programs/pump/src/migrate_v2.rs#L17) |
| pool | [programs/pump/src/migrate_v2.rs:17-19](evidence/accepted/programs/pump/src/migrate_v2.rs#L17) |
| pool_authority | [programs/pump/src/migrate_v2.rs:19-21](evidence/accepted/programs/pump/src/migrate_v2.rs#L19) |
| pool_authority_mint_account | [programs/pump/src/migrate_v2.rs:21-23](evidence/accepted/programs/pump/src/migrate_v2.rs#L21) |
| pool_authority_quote_account | [programs/pump/src/migrate_v2.rs:23-25](evidence/accepted/programs/pump/src/migrate_v2.rs#L23) |
| amm_global_config | [programs/pump/src/migrate_v2.rs:25-27](evidence/accepted/programs/pump/src/migrate_v2.rs#L25) |
| lp_mint | [programs/pump/src/migrate_v2.rs:27-30](evidence/accepted/programs/pump/src/migrate_v2.rs#L27) |
| user_pool_token_account | [programs/pump/src/migrate_v2.rs:30-32](evidence/accepted/programs/pump/src/migrate_v2.rs#L30) |
| pool_base_token_account | [programs/pump/src/migrate_v2.rs:32-34](evidence/accepted/programs/pump/src/migrate_v2.rs#L32) |
| pool_quote_token_account | [programs/pump/src/migrate_v2.rs:34-36](evidence/accepted/programs/pump/src/migrate_v2.rs#L34) |
| base_token_program | [programs/pump/src/migrate_v2.rs:36-37](evidence/accepted/programs/pump/src/migrate_v2.rs#L36) |
| quote_token_program | [programs/pump/src/migrate_v2.rs:37-37](evidence/accepted/programs/pump/src/migrate_v2.rs#L37) |
| token_2022_program | [programs/pump/src/migrate_v2.rs:37-38](evidence/accepted/programs/pump/src/migrate_v2.rs#L37) |
| associated_token_program | [programs/pump/src/migrate_v2.rs:38-38](evidence/accepted/programs/pump/src/migrate_v2.rs#L38) |
| pump_amm_event_authority | [programs/pump/src/migrate_v2.rs:38-40](evidence/accepted/programs/pump/src/migrate_v2.rs#L38) |
| rent | [programs/pump/src/migrate_v2.rs:40-42](evidence/accepted/programs/pump/src/migrate_v2.rs#L40) |
| event_authority | [programs/pump/src/migrate_v2.rs:42-44](evidence/accepted/programs/pump/src/migrate_v2.rs#L42) |
| program | [programs/pump/src/migrate_v2.rs:44-46](evidence/accepted/programs/pump/src/migrate_v2.rs#L44) |

## GetMinimumDistributableFee — programs/pump/src/minimum.rs

[programs/pump/src/minimum.rs:4-10](evidence/accepted/programs/pump/src/minimum.rs#L4); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.get_minimum_distributable_fee.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/minimum.rs:4-5](evidence/accepted/programs/pump/src/minimum.rs#L4) |
| bonding_curve | [programs/pump/src/minimum.rs:5-6](evidence/accepted/programs/pump/src/minimum.rs#L5) |
| sharing_config | [programs/pump/src/minimum.rs:6-7](evidence/accepted/programs/pump/src/minimum.rs#L6) |
| creator_vault | [programs/pump/src/minimum.rs:7-9](evidence/accepted/programs/pump/src/minimum.rs#L7) |

## MultiHopCurve — programs/pump/src/multi_hop_curve.rs

[programs/pump/src/multi_hop_curve.rs:14-27](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L14); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.multi_hop_curve_swap.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/multi_hop_curve.rs:14-15](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L14) |
| fee_config | [programs/pump/src/multi_hop_curve.rs:15-16](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L15) |
| pump_amm_global_config | [programs/pump/src/multi_hop_curve.rs:16-17](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L16) |
| user | [programs/pump/src/multi_hop_curve.rs:17-18](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L17) |
| source_authority | [programs/pump/src/multi_hop_curve.rs:18-19](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L18) |
| source | [programs/pump/src/multi_hop_curve.rs:19-20](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L19) |
| destination | [programs/pump/src/multi_hop_curve.rs:20-21](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L20) |
| buyback_fee_recipient | [programs/pump/src/multi_hop_curve.rs:21-23](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L21) |
| token_program | [programs/pump/src/multi_hop_curve.rs:23-24](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L23) |
| token_2022_program | [programs/pump/src/multi_hop_curve.rs:24-25](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L24) |
| system_program | [programs/pump/src/multi_hop_curve.rs:25-26](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L25) |

## CurveHop — programs/pump/src/multi_hop_curve.rs

[programs/pump/src/multi_hop_curve.rs:29-38](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L29); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: No direct entry match; nested/helper context remains to resolve.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| base_mint | [programs/pump/src/multi_hop_curve.rs:29-30](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L29) |
| quote_mint | [programs/pump/src/multi_hop_curve.rs:30-31](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L30) |
| bonding_curve | [programs/pump/src/multi_hop_curve.rs:31-34](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L31) |
| base_vault | [programs/pump/src/multi_hop_curve.rs:34-35](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L34) |
| quote_vault | [programs/pump/src/multi_hop_curve.rs:35-37](evidence/accepted/programs/pump/src/multi_hop_curve.rs#L35) |

## InitializeQuoteControl — programs/pump/src/quote_control/initialize_quote_control.rs

[programs/pump/src/quote_control/initialize_quote_control.rs:6-20](evidence/accepted/programs/pump/src/quote_control/initialize_quote_control.rs#L6); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump.initialize_quote_control.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| quote_control | [programs/pump/src/quote_control/initialize_quote_control.rs:6-14](evidence/accepted/programs/pump/src/quote_control/initialize_quote_control.rs#L6) |
| user | [programs/pump/src/quote_control/initialize_quote_control.rs:14-17](evidence/accepted/programs/pump/src/quote_control/initialize_quote_control.rs#L14) |
| system_program | [programs/pump/src/quote_control/initialize_quote_control.rs:17-19](evidence/accepted/programs/pump/src/quote_control/initialize_quote_control.rs#L17) |

## UpdateQuoteControlMints — programs/pump/src/quote_control/update_quote_control_mints.rs

[programs/pump/src/quote_control/update_quote_control_mints.rs:9-24](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L9); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.add_quote_control_mint, pump.remove_quote_control_mint.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump/src/quote_control/update_quote_control_mints.rs:9-15](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L9) |
| global | [programs/pump/src/quote_control/update_quote_control_mints.rs:15-18](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L15) |
| quote_control | [programs/pump/src/quote_control/update_quote_control_mints.rs:18-21](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L18) |
| system_program | [programs/pump/src/quote_control/update_quote_control_mints.rs:21-23](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L21) |

## SetQuoteControlMintReserves — programs/pump/src/quote_control/update_quote_control_mints.rs

[programs/pump/src/quote_control/update_quote_control_mints.rs:125-138](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L125); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_quote_control_mint_reserves.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump/src/quote_control/update_quote_control_mints.rs:125-131](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L125) |
| global | [programs/pump/src/quote_control/update_quote_control_mints.rs:131-134](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L131) |
| quote_control | [programs/pump/src/quote_control/update_quote_control_mints.rs:134-137](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L134) |

## SetQuoteControlAdmin — programs/pump/src/quote_control/update_quote_control_mints.rs

[programs/pump/src/quote_control/update_quote_control_mints.rs:162-170](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L162); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_quote_control_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/quote_control/update_quote_control_mints.rs:162-164](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L162) |
| authority | [programs/pump/src/quote_control/update_quote_control_mints.rs:164-166](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L164) |
| quote_control | [programs/pump/src/quote_control/update_quote_control_mints.rs:166-169](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L166) |

## SetQuoteControlReservesAdmin — programs/pump/src/quote_control/update_quote_control_mints.rs

[programs/pump/src/quote_control/update_quote_control_mints.rs:200-212](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L200); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_quote_control_reserves_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump/src/quote_control/update_quote_control_mints.rs:200-205](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L200) |
| global | [programs/pump/src/quote_control/update_quote_control_mints.rs:205-208](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L205) |
| quote_control | [programs/pump/src/quote_control/update_quote_control_mints.rs:208-211](evidence/accepted/programs/pump/src/quote_control/update_quote_control_mints.rs#L208) |

## SetCreator — programs/pump/src/set_creator.rs

[programs/pump/src/set_creator.rs:21-27](evidence/accepted/programs/pump/src/set_creator.rs#L21); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_creator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| set_creator_authority | [programs/pump/src/set_creator.rs:21-22](evidence/accepted/programs/pump/src/set_creator.rs#L21) |
| global | [programs/pump/src/set_creator.rs:22-23](evidence/accepted/programs/pump/src/set_creator.rs#L22) |
| mint | [programs/pump/src/set_creator.rs:23-24](evidence/accepted/programs/pump/src/set_creator.rs#L23) |
| metadata | [programs/pump/src/set_creator.rs:24-25](evidence/accepted/programs/pump/src/set_creator.rs#L24) |
| bonding_curve | [programs/pump/src/set_creator.rs:25-26](evidence/accepted/programs/pump/src/set_creator.rs#L25) |

## SetMetaplexCreator — programs/pump/src/set_creator.rs

[programs/pump/src/set_creator.rs:29-33](evidence/accepted/programs/pump/src/set_creator.rs#L29); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_metaplex_creator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| mint | [programs/pump/src/set_creator.rs:29-30](evidence/accepted/programs/pump/src/set_creator.rs#L29) |
| metadata | [programs/pump/src/set_creator.rs:30-31](evidence/accepted/programs/pump/src/set_creator.rs#L30) |
| bonding_curve | [programs/pump/src/set_creator.rs:31-32](evidence/accepted/programs/pump/src/set_creator.rs#L31) |

## SetParams — programs/pump/src/set_params.rs

[programs/pump/src/set_params.rs:5-8](evidence/accepted/programs/pump/src/set_params.rs#L5); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.set_params.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/set_params.rs:5-6](evidence/accepted/programs/pump/src/set_params.rs#L5) |
| authority | [programs/pump/src/set_params.rs:6-7](evidence/accepted/programs/pump/src/set_params.rs#L6) |

## SweepFees — programs/pump/src/sweep.rs

[programs/pump/src/sweep.rs:22-37](evidence/accepted/programs/pump/src/sweep.rs#L22); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.sweep_creator_fee, pump.sweep_protocol_fee.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump/src/sweep.rs:22-23](evidence/accepted/programs/pump/src/sweep.rs#L22) |
| global | [programs/pump/src/sweep.rs:23-24](evidence/accepted/programs/pump/src/sweep.rs#L23) |
| base_mint | [programs/pump/src/sweep.rs:24-25](evidence/accepted/programs/pump/src/sweep.rs#L24) |
| quote_mint | [programs/pump/src/sweep.rs:25-26](evidence/accepted/programs/pump/src/sweep.rs#L25) |
| quote_token_program | [programs/pump/src/sweep.rs:26-27](evidence/accepted/programs/pump/src/sweep.rs#L26) |
| associated_token_program | [programs/pump/src/sweep.rs:27-28](evidence/accepted/programs/pump/src/sweep.rs#L27) |
| system_program | [programs/pump/src/sweep.rs:28-29](evidence/accepted/programs/pump/src/sweep.rs#L28) |
| bonding_curve | [programs/pump/src/sweep.rs:29-30](evidence/accepted/programs/pump/src/sweep.rs#L29) |
| associated_quote_bonding_curve | [programs/pump/src/sweep.rs:30-32](evidence/accepted/programs/pump/src/sweep.rs#L30) |
| recipient | [programs/pump/src/sweep.rs:32-34](evidence/accepted/programs/pump/src/sweep.rs#L32) |
| associated_quote_recipient | [programs/pump/src/sweep.rs:34-36](evidence/accepted/programs/pump/src/sweep.rs#L34) |

## SellV3 — programs/pump/src/trade.rs

[programs/pump/src/trade.rs:9-41](evidence/accepted/programs/pump/src/trade.rs#L9); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump.buy_exact_quote_in_v3, pump.buy_v3, pump.sell_v3.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global | [programs/pump/src/trade.rs:9-11](evidence/accepted/programs/pump/src/trade.rs#L9) |
| base_mint | [programs/pump/src/trade.rs:11-12](evidence/accepted/programs/pump/src/trade.rs#L11) |
| quote_mint | [programs/pump/src/trade.rs:12-14](evidence/accepted/programs/pump/src/trade.rs#L12) |
| base_token_program | [programs/pump/src/trade.rs:14-15](evidence/accepted/programs/pump/src/trade.rs#L14) |
| quote_token_program | [programs/pump/src/trade.rs:15-16](evidence/accepted/programs/pump/src/trade.rs#L15) |
| bonding_curve | [programs/pump/src/trade.rs:16-18](evidence/accepted/programs/pump/src/trade.rs#L16) |
| associated_base_bonding_curve | [programs/pump/src/trade.rs:18-20](evidence/accepted/programs/pump/src/trade.rs#L18) |
| associated_quote_bonding_curve | [programs/pump/src/trade.rs:20-23](evidence/accepted/programs/pump/src/trade.rs#L20) |
| user | [programs/pump/src/trade.rs:23-25](evidence/accepted/programs/pump/src/trade.rs#L23) |
| associated_base_user | [programs/pump/src/trade.rs:25-27](evidence/accepted/programs/pump/src/trade.rs#L25) |
| associated_quote_user | [programs/pump/src/trade.rs:27-30](evidence/accepted/programs/pump/src/trade.rs#L27) |
| user_volume_accumulator | [programs/pump/src/trade.rs:30-33](evidence/accepted/programs/pump/src/trade.rs#L30) |
| fee_config | [programs/pump/src/trade.rs:33-36](evidence/accepted/programs/pump/src/trade.rs#L33) |
| buyback_fee_recipient | [programs/pump/src/trade.rs:36-39](evidence/accepted/programs/pump/src/trade.rs#L36) |
| system_program | [programs/pump/src/trade.rs:39-40](evidence/accepted/programs/pump/src/trade.rs#L39) |

## SyncUserVolumeAccumulator — programs/pump/src/volume_sync.rs

[programs/pump/src/volume_sync.rs:13-20](evidence/accepted/programs/pump/src/volume_sync.rs#L13); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump.sync_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump/src/volume_sync.rs:13-15](evidence/accepted/programs/pump/src/volume_sync.rs#L13) |
| global_volume_accumulator | [programs/pump/src/volume_sync.rs:15-17](evidence/accepted/programs/pump/src/volume_sync.rs#L15) |
| user_volume_accumulator | [programs/pump/src/volume_sync.rs:17-19](evidence/accepted/programs/pump/src/volume_sync.rs#L17) |

## InitBoost — programs/pump-amm/src/boost.rs

[programs/pump-amm/src/boost.rs:5-25](evidence/accepted/programs/pump-amm/src/boost.rs#L5); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.init_boost.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/boost.rs:5-7](evidence/accepted/programs/pump-amm/src/boost.rs#L5) |
| global_config | [programs/pump-amm/src/boost.rs:7-9](evidence/accepted/programs/pump-amm/src/boost.rs#L7) |
| creator | [programs/pump-amm/src/boost.rs:9-11](evidence/accepted/programs/pump-amm/src/boost.rs#L9) |
| base_mint | [programs/pump-amm/src/boost.rs:11-12](evidence/accepted/programs/pump-amm/src/boost.rs#L11) |
| quote_mint | [programs/pump-amm/src/boost.rs:12-13](evidence/accepted/programs/pump-amm/src/boost.rs#L12) |
| pool_base_token_account | [programs/pump-amm/src/boost.rs:13-14](evidence/accepted/programs/pump-amm/src/boost.rs#L13) |
| pool_quote_token_account | [programs/pump-amm/src/boost.rs:14-16](evidence/accepted/programs/pump-amm/src/boost.rs#L14) |
| boost_vault_authority | [programs/pump-amm/src/boost.rs:16-19](evidence/accepted/programs/pump-amm/src/boost.rs#L16) |
| boost_vault | [programs/pump-amm/src/boost.rs:19-21](evidence/accepted/programs/pump-amm/src/boost.rs#L19) |
| quote_token_program | [programs/pump-amm/src/boost.rs:21-22](evidence/accepted/programs/pump-amm/src/boost.rs#L21) |
| system_program | [programs/pump-amm/src/boost.rs:22-23](evidence/accepted/programs/pump-amm/src/boost.rs#L22) |
| associated_token_program | [programs/pump-amm/src/boost.rs:23-24](evidence/accepted/programs/pump-amm/src/boost.rs#L23) |

## BoostBuyAndBurn — programs/pump-amm/src/boost_burn.rs

[programs/pump-amm/src/boost_burn.rs:7-28](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L7); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.boost_buy_and_burn.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/boost_burn.rs:7-9](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L7) |
| authority | [programs/pump-amm/src/boost_burn.rs:9-11](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L9) |
| global_config | [programs/pump-amm/src/boost_burn.rs:11-13](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L11) |
| base_mint | [programs/pump-amm/src/boost_burn.rs:13-15](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L13) |
| quote_mint | [programs/pump-amm/src/boost_burn.rs:15-16](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L15) |
| pool_base_token_account | [programs/pump-amm/src/boost_burn.rs:16-18](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L16) |
| pool_quote_token_account | [programs/pump-amm/src/boost_burn.rs:18-20](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L18) |
| boost_vault_authority | [programs/pump-amm/src/boost_burn.rs:20-23](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L20) |
| boost_vault | [programs/pump-amm/src/boost_burn.rs:23-25](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L23) |
| base_token_program | [programs/pump-amm/src/boost_burn.rs:25-26](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L25) |
| quote_token_program | [programs/pump-amm/src/boost_burn.rs:26-27](evidence/accepted/programs/pump-amm/src/boost_burn.rs#L26) |

## ClaimCashback — programs/pump-amm/src/cashback.rs

[programs/pump-amm/src/cashback.rs:4-20](evidence/accepted/programs/pump-amm/src/cashback.rs#L4); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_amm.claim_cashback.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-amm/src/cashback.rs:4-6](evidence/accepted/programs/pump-amm/src/cashback.rs#L4) |
| user_volume_accumulator | [programs/pump-amm/src/cashback.rs:6-8](evidence/accepted/programs/pump-amm/src/cashback.rs#L6) |
| quote_mint | [programs/pump-amm/src/cashback.rs:8-9](evidence/accepted/programs/pump-amm/src/cashback.rs#L8) |
| quote_token_program | [programs/pump-amm/src/cashback.rs:9-10](evidence/accepted/programs/pump-amm/src/cashback.rs#L9) |
| user_volume_accumulator_wsol_token_account | [programs/pump-amm/src/cashback.rs:10-12](evidence/accepted/programs/pump-amm/src/cashback.rs#L10) |
| user_wsol_token_account | [programs/pump-amm/src/cashback.rs:12-14](evidence/accepted/programs/pump-amm/src/cashback.rs#L12) |
| system_program | [programs/pump-amm/src/cashback.rs:14-15](evidence/accepted/programs/pump-amm/src/cashback.rs#L14) |
| event_authority | [programs/pump-amm/src/cashback.rs:15-18](evidence/accepted/programs/pump-amm/src/cashback.rs#L15) |
| program | [programs/pump-amm/src/cashback.rs:18-19](evidence/accepted/programs/pump-amm/src/cashback.rs#L18) |

## CollectCoinCreatorFee — programs/pump-amm/src/collect.rs

[programs/pump-amm/src/collect.rs:5-17](evidence/accepted/programs/pump-amm/src/collect.rs#L5); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.collect_coin_creator_fee.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| quote_mint | [programs/pump-amm/src/collect.rs:5-6](evidence/accepted/programs/pump-amm/src/collect.rs#L5) |
| quote_token_program | [programs/pump-amm/src/collect.rs:6-7](evidence/accepted/programs/pump-amm/src/collect.rs#L6) |
| coin_creator | [programs/pump-amm/src/collect.rs:7-9](evidence/accepted/programs/pump-amm/src/collect.rs#L7) |
| coin_creator_vault_authority | [programs/pump-amm/src/collect.rs:9-12](evidence/accepted/programs/pump-amm/src/collect.rs#L9) |
| coin_creator_vault_ata | [programs/pump-amm/src/collect.rs:12-14](evidence/accepted/programs/pump-amm/src/collect.rs#L12) |
| coin_creator_token_account | [programs/pump-amm/src/collect.rs:14-16](evidence/accepted/programs/pump-amm/src/collect.rs#L14) |

## CreatePool — programs/pump-amm/src/create.rs

[programs/pump-amm/src/create.rs:53-78](evidence/accepted/programs/pump-amm/src/create.rs#L53); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.create_pool.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/create.rs:53-55](evidence/accepted/programs/pump-amm/src/create.rs#L53) |
| global_config | [programs/pump-amm/src/create.rs:55-56](evidence/accepted/programs/pump-amm/src/create.rs#L55) |
| creator | [programs/pump-amm/src/create.rs:56-58](evidence/accepted/programs/pump-amm/src/create.rs#L56) |
| base_mint | [programs/pump-amm/src/create.rs:58-59](evidence/accepted/programs/pump-amm/src/create.rs#L58) |
| quote_mint | [programs/pump-amm/src/create.rs:59-60](evidence/accepted/programs/pump-amm/src/create.rs#L59) |
| lp_mint | [programs/pump-amm/src/create.rs:60-62](evidence/accepted/programs/pump-amm/src/create.rs#L60) |
| user_base_token_account | [programs/pump-amm/src/create.rs:62-64](evidence/accepted/programs/pump-amm/src/create.rs#L62) |
| user_quote_token_account | [programs/pump-amm/src/create.rs:64-66](evidence/accepted/programs/pump-amm/src/create.rs#L64) |
| user_pool_token_account | [programs/pump-amm/src/create.rs:66-68](evidence/accepted/programs/pump-amm/src/create.rs#L66) |
| pool_base_token_account | [programs/pump-amm/src/create.rs:68-70](evidence/accepted/programs/pump-amm/src/create.rs#L68) |
| pool_quote_token_account | [programs/pump-amm/src/create.rs:70-72](evidence/accepted/programs/pump-amm/src/create.rs#L70) |
| system_program | [programs/pump-amm/src/create.rs:72-73](evidence/accepted/programs/pump-amm/src/create.rs#L72) |
| token_2022_program | [programs/pump-amm/src/create.rs:73-74](evidence/accepted/programs/pump-amm/src/create.rs#L73) |
| base_token_program | [programs/pump-amm/src/create.rs:74-75](evidence/accepted/programs/pump-amm/src/create.rs#L74) |
| quote_token_program | [programs/pump-amm/src/create.rs:75-76](evidence/accepted/programs/pump-amm/src/create.rs#L75) |
| associated_token_program | [programs/pump-amm/src/create.rs:76-77](evidence/accepted/programs/pump-amm/src/create.rs#L76) |

## MigratePoolCoinCreator — programs/pump-amm/src/creator_reassignment.rs

[programs/pump-amm/src/creator_reassignment.rs:25-28](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L25); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.migrate_pool_coin_creator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/creator_reassignment.rs:25-26](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L25) |
| sharing_config | [programs/pump-amm/src/creator_reassignment.rs:26-27](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L26) |

## SetCoinCreator — programs/pump-amm/src/creator_reassignment.rs

[programs/pump-amm/src/creator_reassignment.rs:38-42](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L38); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.set_coin_creator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/creator_reassignment.rs:38-39](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L38) |
| metadata | [programs/pump-amm/src/creator_reassignment.rs:39-40](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L39) |
| bonding_curve | [programs/pump-amm/src/creator_reassignment.rs:40-41](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L40) |

## AdminCtoPool — programs/pump-amm/src/creator_reassignment.rs

[programs/pump-amm/src/creator_reassignment.rs:62-68](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L62); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.admin_cto_pool.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-amm/src/creator_reassignment.rs:62-63](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L62) |
| global_config | [programs/pump-amm/src/creator_reassignment.rs:63-64](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L63) |
| pool | [programs/pump-amm/src/creator_reassignment.rs:64-65](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L64) |
| pool_authority | [programs/pump-amm/src/creator_reassignment.rs:65-66](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L65) |
| system_program | [programs/pump-amm/src/creator_reassignment.rs:66-67](evidence/accepted/programs/pump-amm/src/creator_reassignment.rs#L66) |

## ExtendAccount — programs/pump-amm/src/extend.rs

[programs/pump-amm/src/extend.rs:4-11](evidence/accepted/programs/pump-amm/src/extend.rs#L4); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.extend_account.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| account | [programs/pump-amm/src/extend.rs:4-7](evidence/accepted/programs/pump-amm/src/extend.rs#L4) |
| user | [programs/pump-amm/src/extend.rs:7-9](evidence/accepted/programs/pump-amm/src/extend.rs#L7) |
| system_program | [programs/pump-amm/src/extend.rs:9-10](evidence/accepted/programs/pump-amm/src/extend.rs#L9) |

## SyncUserVolumeAccumulator — programs/pump-amm/src/incentives.rs

[programs/pump-amm/src/incentives.rs:16-23](evidence/accepted/programs/pump-amm/src/incentives.rs#L16); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.sync_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-amm/src/incentives.rs:16-18](evidence/accepted/programs/pump-amm/src/incentives.rs#L16) |
| global_volume_accumulator | [programs/pump-amm/src/incentives.rs:18-20](evidence/accepted/programs/pump-amm/src/incentives.rs#L18) |
| user_volume_accumulator | [programs/pump-amm/src/incentives.rs:20-22](evidence/accepted/programs/pump-amm/src/incentives.rs#L20) |

## AdminUpdateTokenIncentives — programs/pump-amm/src/incentives.rs

[programs/pump-amm/src/incentives.rs:43-55](evidence/accepted/programs/pump-amm/src/incentives.rs#L43); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.admin_update_token_incentives.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/incentives.rs:43-44](evidence/accepted/programs/pump-amm/src/incentives.rs#L43) |
| global_config | [programs/pump-amm/src/incentives.rs:44-46](evidence/accepted/programs/pump-amm/src/incentives.rs#L44) |
| global_volume_accumulator | [programs/pump-amm/src/incentives.rs:46-48](evidence/accepted/programs/pump-amm/src/incentives.rs#L46) |
| mint | [programs/pump-amm/src/incentives.rs:48-49](evidence/accepted/programs/pump-amm/src/incentives.rs#L48) |
| global_incentive_token_account | [programs/pump-amm/src/incentives.rs:49-51](evidence/accepted/programs/pump-amm/src/incentives.rs#L49) |
| associated_token_program | [programs/pump-amm/src/incentives.rs:51-52](evidence/accepted/programs/pump-amm/src/incentives.rs#L51) |
| system_program | [programs/pump-amm/src/incentives.rs:52-53](evidence/accepted/programs/pump-amm/src/incentives.rs#L52) |
| token_program | [programs/pump-amm/src/incentives.rs:53-54](evidence/accepted/programs/pump-amm/src/incentives.rs#L53) |

## ClaimTokenIncentives — programs/pump-amm/src/incentives.rs

[programs/pump-amm/src/incentives.rs:91-111](evidence/accepted/programs/pump-amm/src/incentives.rs#L91); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_amm.claim_token_incentives.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-amm/src/incentives.rs:91-93](evidence/accepted/programs/pump-amm/src/incentives.rs#L91) |
| user_ata | [programs/pump-amm/src/incentives.rs:93-95](evidence/accepted/programs/pump-amm/src/incentives.rs#L93) |
| global_volume_accumulator | [programs/pump-amm/src/incentives.rs:95-97](evidence/accepted/programs/pump-amm/src/incentives.rs#L95) |
| global_incentive_token_account | [programs/pump-amm/src/incentives.rs:97-99](evidence/accepted/programs/pump-amm/src/incentives.rs#L97) |
| user_volume_accumulator | [programs/pump-amm/src/incentives.rs:99-101](evidence/accepted/programs/pump-amm/src/incentives.rs#L99) |
| mint | [programs/pump-amm/src/incentives.rs:101-102](evidence/accepted/programs/pump-amm/src/incentives.rs#L101) |
| token_program | [programs/pump-amm/src/incentives.rs:102-103](evidence/accepted/programs/pump-amm/src/incentives.rs#L102) |
| system_program | [programs/pump-amm/src/incentives.rs:103-104](evidence/accepted/programs/pump-amm/src/incentives.rs#L103) |
| associated_token_program | [programs/pump-amm/src/incentives.rs:104-105](evidence/accepted/programs/pump-amm/src/incentives.rs#L104) |
| event_authority | [programs/pump-amm/src/incentives.rs:105-108](evidence/accepted/programs/pump-amm/src/incentives.rs#L105) |
| program | [programs/pump-amm/src/incentives.rs:108-109](evidence/accepted/programs/pump-amm/src/incentives.rs#L108) |
| payer | [programs/pump-amm/src/incentives.rs:109-110](evidence/accepted/programs/pump-amm/src/incentives.rs#L109) |

## LegacyBuy — programs/pump-amm/src/legacy_buy.rs

[programs/pump-amm/src/legacy_buy.rs:8-48](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L8); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_amm.buy, pump_amm.buy_exact_quote_in.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/legacy_buy.rs:8-10](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L8) |
| user | [programs/pump-amm/src/legacy_buy.rs:10-12](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L10) |
| global_config | [programs/pump-amm/src/legacy_buy.rs:12-13](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L12) |
| base_mint | [programs/pump-amm/src/legacy_buy.rs:13-14](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L13) |
| quote_mint | [programs/pump-amm/src/legacy_buy.rs:14-15](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L14) |
| user_base_token_account | [programs/pump-amm/src/legacy_buy.rs:15-17](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L15) |
| user_quote_token_account | [programs/pump-amm/src/legacy_buy.rs:17-19](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L17) |
| pool_base_token_account | [programs/pump-amm/src/legacy_buy.rs:19-21](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L19) |
| pool_quote_token_account | [programs/pump-amm/src/legacy_buy.rs:21-23](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L21) |
| protocol_fee_recipient | [programs/pump-amm/src/legacy_buy.rs:23-25](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L23) |
| protocol_fee_recipient_token_account | [programs/pump-amm/src/legacy_buy.rs:25-27](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L25) |
| base_token_program | [programs/pump-amm/src/legacy_buy.rs:27-28](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L27) |
| quote_token_program | [programs/pump-amm/src/legacy_buy.rs:28-29](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L28) |
| system_program | [programs/pump-amm/src/legacy_buy.rs:29-30](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L29) |
| associated_token_program | [programs/pump-amm/src/legacy_buy.rs:30-31](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L30) |
| event_authority | [programs/pump-amm/src/legacy_buy.rs:31-34](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L31) |
| program | [programs/pump-amm/src/legacy_buy.rs:34-35](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L34) |
| coin_creator_vault_ata | [programs/pump-amm/src/legacy_buy.rs:35-37](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L35) |
| coin_creator_vault_authority | [programs/pump-amm/src/legacy_buy.rs:37-40](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L37) |
| global_volume_accumulator | [programs/pump-amm/src/legacy_buy.rs:40-42](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L40) |
| user_volume_accumulator | [programs/pump-amm/src/legacy_buy.rs:42-44](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L42) |
| fee_config | [programs/pump-amm/src/legacy_buy.rs:44-46](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L44) |
| fee_program | [programs/pump-amm/src/legacy_buy.rs:46-47](evidence/accepted/programs/pump-amm/src/legacy_buy.rs#L46) |

## LegacySell — programs/pump-amm/src/legacy_sell.rs

[programs/pump-amm/src/legacy_sell.rs:8-44](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L8); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_amm.sell.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/legacy_sell.rs:8-10](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L8) |
| user | [programs/pump-amm/src/legacy_sell.rs:10-12](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L10) |
| global_config | [programs/pump-amm/src/legacy_sell.rs:12-13](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L12) |
| base_mint | [programs/pump-amm/src/legacy_sell.rs:13-14](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L13) |
| quote_mint | [programs/pump-amm/src/legacy_sell.rs:14-15](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L14) |
| user_base_token_account | [programs/pump-amm/src/legacy_sell.rs:15-17](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L15) |
| user_quote_token_account | [programs/pump-amm/src/legacy_sell.rs:17-19](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L17) |
| pool_base_token_account | [programs/pump-amm/src/legacy_sell.rs:19-21](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L19) |
| pool_quote_token_account | [programs/pump-amm/src/legacy_sell.rs:21-23](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L21) |
| protocol_fee_recipient | [programs/pump-amm/src/legacy_sell.rs:23-25](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L23) |
| protocol_fee_recipient_token_account | [programs/pump-amm/src/legacy_sell.rs:25-27](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L25) |
| base_token_program | [programs/pump-amm/src/legacy_sell.rs:27-28](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L27) |
| quote_token_program | [programs/pump-amm/src/legacy_sell.rs:28-29](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L28) |
| system_program | [programs/pump-amm/src/legacy_sell.rs:29-30](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L29) |
| associated_token_program | [programs/pump-amm/src/legacy_sell.rs:30-31](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L30) |
| event_authority | [programs/pump-amm/src/legacy_sell.rs:31-34](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L31) |
| program | [programs/pump-amm/src/legacy_sell.rs:34-35](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L34) |
| coin_creator_vault_ata | [programs/pump-amm/src/legacy_sell.rs:35-37](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L35) |
| coin_creator_vault_authority | [programs/pump-amm/src/legacy_sell.rs:37-40](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L37) |
| fee_config | [programs/pump-amm/src/legacy_sell.rs:40-42](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L40) |
| fee_program | [programs/pump-amm/src/legacy_sell.rs:42-43](evidence/accepted/programs/pump-amm/src/legacy_sell.rs#L42) |

## AdminGlobal — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:244-248](evidence/accepted/programs/pump-amm/src/lib.rs#L244); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.disable, pump_amm.toggle_cashback_enabled, pump_amm.toggle_mayhem_mode, pump_amm.update_buyback_config, pump_amm.update_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/lib.rs:244-245](evidence/accepted/programs/pump-amm/src/lib.rs#L244) |
| global_config | [programs/pump-amm/src/lib.rs:245-247](evidence/accepted/programs/pump-amm/src/lib.rs#L245) |

## UpdateAdmin — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:383-389](evidence/accepted/programs/pump-amm/src/lib.rs#L383); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.update_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/lib.rs:383-384](evidence/accepted/programs/pump-amm/src/lib.rs#L383) |
| global_config | [programs/pump-amm/src/lib.rs:384-386](evidence/accepted/programs/pump-amm/src/lib.rs#L384) |
| new_admin | [programs/pump-amm/src/lib.rs:386-388](evidence/accepted/programs/pump-amm/src/lib.rs#L386) |

## AdminGlobalNoEvent — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:392-396](evidence/accepted/programs/pump-amm/src/lib.rs#L392); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_amm.toggle_boost.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/lib.rs:392-393](evidence/accepted/programs/pump-amm/src/lib.rs#L392) |
| global_config | [programs/pump-amm/src/lib.rs:393-395](evidence/accepted/programs/pump-amm/src/lib.rs#L393) |

## SetBoostAuthority — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:400-407](evidence/accepted/programs/pump-amm/src/lib.rs#L400); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.set_boost_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/lib.rs:400-401](evidence/accepted/programs/pump-amm/src/lib.rs#L400) |
| global_config | [programs/pump-amm/src/lib.rs:401-403](evidence/accepted/programs/pump-amm/src/lib.rs#L401) |
| boost_authority | [programs/pump-amm/src/lib.rs:403-405](evidence/accepted/programs/pump-amm/src/lib.rs#L403) |
| system_program | [programs/pump-amm/src/lib.rs:405-406](evidence/accepted/programs/pump-amm/src/lib.rs#L405) |

## UpdateCreatorFeeConfig — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:411-417](evidence/accepted/programs/pump-amm/src/lib.rs#L411); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.update_creator_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-amm/src/lib.rs:411-413](evidence/accepted/programs/pump-amm/src/lib.rs#L411) |
| global_config | [programs/pump-amm/src/lib.rs:413-415](evidence/accepted/programs/pump-amm/src/lib.rs#L413) |
| system_program | [programs/pump-amm/src/lib.rs:415-416](evidence/accepted/programs/pump-amm/src/lib.rs#L415) |

## SetReservedFeeRecipients — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:421-425](evidence/accepted/programs/pump-amm/src/lib.rs#L421); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.set_reserved_fee_recipients.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| global_config | [programs/pump-amm/src/lib.rs:421-423](evidence/accepted/programs/pump-amm/src/lib.rs#L421) |
| admin | [programs/pump-amm/src/lib.rs:423-424](evidence/accepted/programs/pump-amm/src/lib.rs#L423) |

## InitUserVolumeAccumulator — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:429-437](evidence/accepted/programs/pump-amm/src/lib.rs#L429); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.init_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-amm/src/lib.rs:429-431](evidence/accepted/programs/pump-amm/src/lib.rs#L429) |
| user | [programs/pump-amm/src/lib.rs:431-433](evidence/accepted/programs/pump-amm/src/lib.rs#L431) |
| user_volume_accumulator | [programs/pump-amm/src/lib.rs:433-435](evidence/accepted/programs/pump-amm/src/lib.rs#L433) |
| system_program | [programs/pump-amm/src/lib.rs:435-436](evidence/accepted/programs/pump-amm/src/lib.rs#L435) |

## CloseUserVolumeAccumulator — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:440-445](evidence/accepted/programs/pump-amm/src/lib.rs#L440); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.close_user_volume_accumulator.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-amm/src/lib.rs:440-442](evidence/accepted/programs/pump-amm/src/lib.rs#L440) |
| user_volume_accumulator | [programs/pump-amm/src/lib.rs:442-444](evidence/accepted/programs/pump-amm/src/lib.rs#L442) |

## Liquidity — programs/pump-amm/src/lib.rs

[programs/pump-amm/src/lib.rs:449-470](evidence/accepted/programs/pump-amm/src/lib.rs#L449); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.deposit, pump_amm.withdraw.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/lib.rs:449-451](evidence/accepted/programs/pump-amm/src/lib.rs#L449) |
| global_config | [programs/pump-amm/src/lib.rs:451-452](evidence/accepted/programs/pump-amm/src/lib.rs#L451) |
| user | [programs/pump-amm/src/lib.rs:452-453](evidence/accepted/programs/pump-amm/src/lib.rs#L452) |
| base_mint | [programs/pump-amm/src/lib.rs:453-454](evidence/accepted/programs/pump-amm/src/lib.rs#L453) |
| quote_mint | [programs/pump-amm/src/lib.rs:454-455](evidence/accepted/programs/pump-amm/src/lib.rs#L454) |
| lp_mint | [programs/pump-amm/src/lib.rs:455-457](evidence/accepted/programs/pump-amm/src/lib.rs#L455) |
| user_base_token_account | [programs/pump-amm/src/lib.rs:457-459](evidence/accepted/programs/pump-amm/src/lib.rs#L457) |
| user_quote_token_account | [programs/pump-amm/src/lib.rs:459-461](evidence/accepted/programs/pump-amm/src/lib.rs#L459) |
| user_pool_token_account | [programs/pump-amm/src/lib.rs:461-463](evidence/accepted/programs/pump-amm/src/lib.rs#L461) |
| pool_base_token_account | [programs/pump-amm/src/lib.rs:463-465](evidence/accepted/programs/pump-amm/src/lib.rs#L463) |
| pool_quote_token_account | [programs/pump-amm/src/lib.rs:465-467](evidence/accepted/programs/pump-amm/src/lib.rs#L465) |
| token_program | [programs/pump-amm/src/lib.rs:467-468](evidence/accepted/programs/pump-amm/src/lib.rs#L467) |
| token_2022_program | [programs/pump-amm/src/lib.rs:468-469](evidence/accepted/programs/pump-amm/src/lib.rs#L468) |

## MultiHop — programs/pump-amm/src/multi_hop.rs

[programs/pump-amm/src/multi_hop.rs:11-41](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L11); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_amm.multi_hop_swap.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-amm/src/multi_hop.rs:11-13](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L11) |
| user_in_token_account | [programs/pump-amm/src/multi_hop.rs:13-15](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L13) |
| user_out_token_account | [programs/pump-amm/src/multi_hop.rs:15-17](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L15) |
| global_config | [programs/pump-amm/src/multi_hop.rs:17-19](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L17) |
| fee_config | [programs/pump-amm/src/multi_hop.rs:19-21](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L19) |
| user_volume_accumulator | [programs/pump-amm/src/multi_hop.rs:21-23](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L21) |
| buyback_fee_recipient | [programs/pump-amm/src/multi_hop.rs:23-26](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L23) |
| token_program | [programs/pump-amm/src/multi_hop.rs:26-27](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L26) |
| token_2022_program | [programs/pump-amm/src/multi_hop.rs:27-28](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L27) |
| system_program | [programs/pump-amm/src/multi_hop.rs:28-29](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L28) |
| event_authority | [programs/pump-amm/src/multi_hop.rs:29-32](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L29) |
| program | [programs/pump-amm/src/multi_hop.rs:32-33](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L32) |
| pump_program | [programs/pump-amm/src/multi_hop.rs:33-34](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L33) |
| pump_global | [programs/pump-amm/src/multi_hop.rs:34-36](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L34) |
| pump_fee_config | [programs/pump-amm/src/multi_hop.rs:36-38](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L36) |
| pump_event_authority | [programs/pump-amm/src/multi_hop.rs:38-40](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L38) |

## AmmHop — programs/pump-amm/src/multi_hop.rs

[programs/pump-amm/src/multi_hop.rs:49-58](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L49); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: No direct entry match; nested/helper context remains to resolve.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| base_mint | [programs/pump-amm/src/multi_hop.rs:49-50](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L49) |
| quote_mint | [programs/pump-amm/src/multi_hop.rs:50-51](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L50) |
| pool | [programs/pump-amm/src/multi_hop.rs:51-53](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L51) |
| pool_base_token_account | [programs/pump-amm/src/multi_hop.rs:53-55](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L53) |
| pool_quote_token_account | [programs/pump-amm/src/multi_hop.rs:55-57](evidence/accepted/programs/pump-amm/src/multi_hop.rs#L55) |

## SweepFees — programs/pump-amm/src/sweep.rs

[programs/pump-amm/src/sweep.rs:8-25](evidence/accepted/programs/pump-amm/src/sweep.rs#L8); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_amm.sweep_creator_fee, pump_amm.sweep_protocol_fee.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-amm/src/sweep.rs:8-10](evidence/accepted/programs/pump-amm/src/sweep.rs#L8) |
| global_config | [programs/pump-amm/src/sweep.rs:10-11](evidence/accepted/programs/pump-amm/src/sweep.rs#L10) |
| pool | [programs/pump-amm/src/sweep.rs:11-13](evidence/accepted/programs/pump-amm/src/sweep.rs#L11) |
| quote_mint | [programs/pump-amm/src/sweep.rs:13-14](evidence/accepted/programs/pump-amm/src/sweep.rs#L13) |
| quote_token_program | [programs/pump-amm/src/sweep.rs:14-15](evidence/accepted/programs/pump-amm/src/sweep.rs#L14) |
| pool_quote_token_account | [programs/pump-amm/src/sweep.rs:15-17](evidence/accepted/programs/pump-amm/src/sweep.rs#L15) |
| recipient | [programs/pump-amm/src/sweep.rs:17-19](evidence/accepted/programs/pump-amm/src/sweep.rs#L17) |
| recipient_token_account | [programs/pump-amm/src/sweep.rs:19-22](evidence/accepted/programs/pump-amm/src/sweep.rs#L19) |
| system_program | [programs/pump-amm/src/sweep.rs:22-23](evidence/accepted/programs/pump-amm/src/sweep.rs#L22) |
| associated_token_program | [programs/pump-amm/src/sweep.rs:23-24](evidence/accepted/programs/pump-amm/src/sweep.rs#L23) |

## TradeV2 — programs/pump-amm/src/trade.rs

[programs/pump-amm/src/trade.rs:116-139](evidence/accepted/programs/pump-amm/src/trade.rs#L116); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_amm.buy_exact_quote_in_v2, pump_amm.buy_v2, pump_amm.sell_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool | [programs/pump-amm/src/trade.rs:116-118](evidence/accepted/programs/pump-amm/src/trade.rs#L116) |
| user | [programs/pump-amm/src/trade.rs:118-119](evidence/accepted/programs/pump-amm/src/trade.rs#L118) |
| global_config | [programs/pump-amm/src/trade.rs:119-120](evidence/accepted/programs/pump-amm/src/trade.rs#L119) |
| base_mint | [programs/pump-amm/src/trade.rs:120-121](evidence/accepted/programs/pump-amm/src/trade.rs#L120) |
| quote_mint | [programs/pump-amm/src/trade.rs:121-122](evidence/accepted/programs/pump-amm/src/trade.rs#L121) |
| user_base_token_account | [programs/pump-amm/src/trade.rs:122-123](evidence/accepted/programs/pump-amm/src/trade.rs#L122) |
| user_quote_token_account | [programs/pump-amm/src/trade.rs:123-124](evidence/accepted/programs/pump-amm/src/trade.rs#L123) |
| pool_base_token_account | [programs/pump-amm/src/trade.rs:124-125](evidence/accepted/programs/pump-amm/src/trade.rs#L124) |
| pool_quote_token_account | [programs/pump-amm/src/trade.rs:125-126](evidence/accepted/programs/pump-amm/src/trade.rs#L125) |
| base_token_program | [programs/pump-amm/src/trade.rs:126-127](evidence/accepted/programs/pump-amm/src/trade.rs#L126) |
| quote_token_program | [programs/pump-amm/src/trade.rs:127-128](evidence/accepted/programs/pump-amm/src/trade.rs#L127) |
| system_program | [programs/pump-amm/src/trade.rs:128-129](evidence/accepted/programs/pump-amm/src/trade.rs#L128) |
| user_volume_accumulator | [programs/pump-amm/src/trade.rs:129-131](evidence/accepted/programs/pump-amm/src/trade.rs#L129) |
| fee_config | [programs/pump-amm/src/trade.rs:131-133](evidence/accepted/programs/pump-amm/src/trade.rs#L131) |
| buyback_fee_recipient | [programs/pump-amm/src/trade.rs:133-135](evidence/accepted/programs/pump-amm/src/trade.rs#L133) |
| event_authority | [programs/pump-amm/src/trade.rs:135-137](evidence/accepted/programs/pump-amm/src/trade.rs#L135) |
| program | [programs/pump-amm/src/trade.rs:137-138](evidence/accepted/programs/pump-amm/src/trade.rs#L137) |

## TransferCreatorFeesToPump — programs/pump-amm/src/transfer_creator.rs

[programs/pump-amm/src/transfer_creator.rs:5-21](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L5); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.transfer_creator_fees_to_pump.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| wsol_mint | [programs/pump-amm/src/transfer_creator.rs:5-7](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L5) |
| token_program | [programs/pump-amm/src/transfer_creator.rs:7-8](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L7) |
| system_program | [programs/pump-amm/src/transfer_creator.rs:8-9](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L8) |
| associated_token_program | [programs/pump-amm/src/transfer_creator.rs:9-10](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L9) |
| coin_creator | [programs/pump-amm/src/transfer_creator.rs:10-12](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L10) |
| coin_creator_vault_authority | [programs/pump-amm/src/transfer_creator.rs:12-15](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L12) |
| coin_creator_vault_ata | [programs/pump-amm/src/transfer_creator.rs:15-17](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L15) |
| pump_creator_vault | [programs/pump-amm/src/transfer_creator.rs:17-20](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L17) |

## TransferCreatorFeesToPumpV2 — programs/pump-amm/src/transfer_creator.rs

[programs/pump-amm/src/transfer_creator.rs:24-43](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L24); baseline: absent_at_baseline; event_cpi attribute: True.

Direct entry-context users: pump_amm.transfer_creator_fees_to_pump_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-amm/src/transfer_creator.rs:24-25](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L24) |
| quote_mint | [programs/pump-amm/src/transfer_creator.rs:25-26](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L25) |
| token_program | [programs/pump-amm/src/transfer_creator.rs:26-27](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L26) |
| system_program | [programs/pump-amm/src/transfer_creator.rs:27-28](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L27) |
| associated_token_program | [programs/pump-amm/src/transfer_creator.rs:28-29](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L28) |
| coin_creator | [programs/pump-amm/src/transfer_creator.rs:29-31](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L29) |
| coin_creator_vault_authority | [programs/pump-amm/src/transfer_creator.rs:31-34](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L31) |
| coin_creator_vault_ata | [programs/pump-amm/src/transfer_creator.rs:34-36](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L34) |
| pump_creator_vault | [programs/pump-amm/src/transfer_creator.rs:36-39](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L36) |
| pump_creator_vault_ata | [programs/pump-amm/src/transfer_creator.rs:39-42](evidence/accepted/programs/pump-amm/src/transfer_creator.rs#L39) |

## InitializeBuyback — programs/pump-fees/src/buyback.rs

[programs/pump-fees/src/buyback.rs:24-34](evidence/accepted/programs/pump-fees/src/buyback.rs#L24); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.initialize_buyback.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-fees/src/buyback.rs:24-25](evidence/accepted/programs/pump-fees/src/buyback.rs#L24) |
| buyback_vault | [programs/pump-fees/src/buyback.rs:25-26](evidence/accepted/programs/pump-fees/src/buyback.rs#L25) |
| buyback_vault_ata | [programs/pump-fees/src/buyback.rs:26-27](evidence/accepted/programs/pump-fees/src/buyback.rs#L26) |
| system_program | [programs/pump-fees/src/buyback.rs:27-28](evidence/accepted/programs/pump-fees/src/buyback.rs#L27) |
| associated_token_program | [programs/pump-fees/src/buyback.rs:28-28](evidence/accepted/programs/pump-fees/src/buyback.rs#L28) |
| mint | [programs/pump-fees/src/buyback.rs:28-29](evidence/accepted/programs/pump-fees/src/buyback.rs#L28) |
| token_program | [programs/pump-fees/src/buyback.rs:29-29](evidence/accepted/programs/pump-fees/src/buyback.rs#L29) |
| event_authority | [programs/pump-fees/src/buyback.rs:29-31](evidence/accepted/programs/pump-fees/src/buyback.rs#L29) |
| program | [programs/pump-fees/src/buyback.rs:31-33](evidence/accepted/programs/pump-fees/src/buyback.rs#L31) |

## UpdateBuyback — programs/pump-fees/src/buyback.rs

[programs/pump-fees/src/buyback.rs:37-45](evidence/accepted/programs/pump-fees/src/buyback.rs#L37); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: pump_fees.update_buyback_authority, pump_fees.update_buyback_claim_rate_limit.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/buyback.rs:37-38](evidence/accepted/programs/pump-fees/src/buyback.rs#L37) |
| fee_program_global | [programs/pump-fees/src/buyback.rs:38-39](evidence/accepted/programs/pump-fees/src/buyback.rs#L38) |
| buyback_vault | [programs/pump-fees/src/buyback.rs:39-40](evidence/accepted/programs/pump-fees/src/buyback.rs#L39) |
| event_authority | [programs/pump-fees/src/buyback.rs:40-42](evidence/accepted/programs/pump-fees/src/buyback.rs#L40) |
| program | [programs/pump-fees/src/buyback.rs:42-44](evidence/accepted/programs/pump-fees/src/buyback.rs#L42) |

## SweepBuyback — programs/pump-fees/src/buyback.rs

[programs/pump-fees/src/buyback.rs:48-61](evidence/accepted/programs/pump-fees/src/buyback.rs#L48); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.sweep_buyback.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| destination | [programs/pump-fees/src/buyback.rs:48-50](evidence/accepted/programs/pump-fees/src/buyback.rs#L48) |
| authority | [programs/pump-fees/src/buyback.rs:50-51](evidence/accepted/programs/pump-fees/src/buyback.rs#L50) |
| buyback_vault | [programs/pump-fees/src/buyback.rs:51-52](evidence/accepted/programs/pump-fees/src/buyback.rs#L51) |
| buyback_vault_ata | [programs/pump-fees/src/buyback.rs:52-53](evidence/accepted/programs/pump-fees/src/buyback.rs#L52) |
| destination_ata | [programs/pump-fees/src/buyback.rs:53-54](evidence/accepted/programs/pump-fees/src/buyback.rs#L53) |
| system_program | [programs/pump-fees/src/buyback.rs:54-55](evidence/accepted/programs/pump-fees/src/buyback.rs#L54) |
| associated_token_program | [programs/pump-fees/src/buyback.rs:55-55](evidence/accepted/programs/pump-fees/src/buyback.rs#L55) |
| mint | [programs/pump-fees/src/buyback.rs:55-56](evidence/accepted/programs/pump-fees/src/buyback.rs#L55) |
| token_program | [programs/pump-fees/src/buyback.rs:56-56](evidence/accepted/programs/pump-fees/src/buyback.rs#L56) |
| event_authority | [programs/pump-fees/src/buyback.rs:56-58](evidence/accepted/programs/pump-fees/src/buyback.rs#L56) |
| program | [programs/pump-fees/src/buyback.rs:58-60](evidence/accepted/programs/pump-fees/src/buyback.rs#L58) |

## ExtendFeeConfig — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:8-16](evidence/accepted/programs/pump-fees/src/contexts.rs#L8); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.extend_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:8-11](evidence/accepted/programs/pump-fees/src/contexts.rs#L8) |
| user | [programs/pump-fees/src/contexts.rs:11-12](evidence/accepted/programs/pump-fees/src/contexts.rs#L11) |
| config_program_id | [programs/pump-fees/src/contexts.rs:12-14](evidence/accepted/programs/pump-fees/src/contexts.rs#L12) |
| system_program | [programs/pump-fees/src/contexts.rs:14-15](evidence/accepted/programs/pump-fees/src/contexts.rs#L14) |

## GetFees — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:19-24](evidence/accepted/programs/pump-fees/src/contexts.rs#L19); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.get_fees.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:19-21](evidence/accepted/programs/pump-fees/src/contexts.rs#L19) |
| config_program_id | [programs/pump-fees/src/contexts.rs:21-23](evidence/accepted/programs/pump-fees/src/contexts.rs#L21) |

## GetFeesWithQuoteMint — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:27-32](evidence/accepted/programs/pump-fees/src/contexts.rs#L27); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.get_fees_with_quote_mint.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:27-29](evidence/accepted/programs/pump-fees/src/contexts.rs#L27) |
| config_program_id | [programs/pump-fees/src/contexts.rs:29-31](evidence/accepted/programs/pump-fees/src/contexts.rs#L29) |

## InitializeFeeConfig — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:36-45](evidence/accepted/programs/pump-fees/src/contexts.rs#L36); baseline: text_changed; event_cpi attribute: True.

Direct entry-context users: pump_fees.initialize_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-fees/src/contexts.rs:36-38](evidence/accepted/programs/pump-fees/src/contexts.rs#L36) |
| fee_config | [programs/pump-fees/src/contexts.rs:38-41](evidence/accepted/programs/pump-fees/src/contexts.rs#L38) |
| system_program | [programs/pump-fees/src/contexts.rs:41-42](evidence/accepted/programs/pump-fees/src/contexts.rs#L41) |
| config_program_id | [programs/pump-fees/src/contexts.rs:42-44](evidence/accepted/programs/pump-fees/src/contexts.rs#L42) |

## InitializeFeeProgramGlobal — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:49-58](evidence/accepted/programs/pump-fees/src/contexts.rs#L49); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.initialize_fee_program_global.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/contexts.rs:49-51](evidence/accepted/programs/pump-fees/src/contexts.rs#L49) |
| pump_global | [programs/pump-fees/src/contexts.rs:51-54](evidence/accepted/programs/pump-fees/src/contexts.rs#L51) |
| fee_program_global | [programs/pump-fees/src/contexts.rs:54-56](evidence/accepted/programs/pump-fees/src/contexts.rs#L54) |
| system_program | [programs/pump-fees/src/contexts.rs:56-57](evidence/accepted/programs/pump-fees/src/contexts.rs#L56) |

## RevokeFeeSharingAuthority — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:61-61](evidence/accepted/programs/pump-fees/src/contexts.rs#L61); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.revoke_fee_sharing_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |

## SetAuthority — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:65-71](evidence/accepted/programs/pump-fees/src/contexts.rs#L65); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.set_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/contexts.rs:65-67](evidence/accepted/programs/pump-fees/src/contexts.rs#L65) |
| fee_program_global | [programs/pump-fees/src/contexts.rs:67-70](evidence/accepted/programs/pump-fees/src/contexts.rs#L67) |

## SetClaimRateLimit — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:75-81](evidence/accepted/programs/pump-fees/src/contexts.rs#L75); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.set_claim_rate_limit.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/contexts.rs:75-77](evidence/accepted/programs/pump-fees/src/contexts.rs#L75) |
| fee_program_global | [programs/pump-fees/src/contexts.rs:77-80](evidence/accepted/programs/pump-fees/src/contexts.rs#L77) |

## SetDisableFlags — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:85-91](evidence/accepted/programs/pump-fees/src/contexts.rs#L85); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.set_disable_flags.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/contexts.rs:85-87](evidence/accepted/programs/pump-fees/src/contexts.rs#L85) |
| fee_program_global | [programs/pump-fees/src/contexts.rs:87-90](evidence/accepted/programs/pump-fees/src/contexts.rs#L87) |

## SetExoticFlatFees — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:95-104](evidence/accepted/programs/pump-fees/src/contexts.rs#L95); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.set_exotic_flat_fees.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:95-98](evidence/accepted/programs/pump-fees/src/contexts.rs#L95) |
| admin | [programs/pump-fees/src/contexts.rs:98-100](evidence/accepted/programs/pump-fees/src/contexts.rs#L98) |
| config_program_id | [programs/pump-fees/src/contexts.rs:100-102](evidence/accepted/programs/pump-fees/src/contexts.rs#L100) |
| system_program | [programs/pump-fees/src/contexts.rs:102-103](evidence/accepted/programs/pump-fees/src/contexts.rs#L102) |

## SetSocialClaimAuthority — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:108-114](evidence/accepted/programs/pump-fees/src/contexts.rs#L108); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.set_social_claim_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| authority | [programs/pump-fees/src/contexts.rs:108-110](evidence/accepted/programs/pump-fees/src/contexts.rs#L108) |
| fee_program_global | [programs/pump-fees/src/contexts.rs:110-113](evidence/accepted/programs/pump-fees/src/contexts.rs#L110) |

## TransferFeeSharingAuthority — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:117-117](evidence/accepted/programs/pump-fees/src/contexts.rs#L117); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.transfer_fee_sharing_authority.

| Declared field | Complete field and preceding constraint span |
| --- | --- |

## UpdateAdmin — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:121-130](evidence/accepted/programs/pump-fees/src/contexts.rs#L121); baseline: text_changed; event_cpi attribute: True.

Direct entry-context users: pump_fees.update_admin.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| admin | [programs/pump-fees/src/contexts.rs:121-122](evidence/accepted/programs/pump-fees/src/contexts.rs#L121) |
| fee_config | [programs/pump-fees/src/contexts.rs:122-125](evidence/accepted/programs/pump-fees/src/contexts.rs#L122) |
| new_admin | [programs/pump-fees/src/contexts.rs:125-127](evidence/accepted/programs/pump-fees/src/contexts.rs#L125) |
| config_program_id | [programs/pump-fees/src/contexts.rs:127-129](evidence/accepted/programs/pump-fees/src/contexts.rs#L127) |

## UpdateFeeConfig — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:134-141](evidence/accepted/programs/pump-fees/src/contexts.rs#L134); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.update_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:134-137](evidence/accepted/programs/pump-fees/src/contexts.rs#L134) |
| admin | [programs/pump-fees/src/contexts.rs:137-138](evidence/accepted/programs/pump-fees/src/contexts.rs#L137) |
| config_program_id | [programs/pump-fees/src/contexts.rs:138-140](evidence/accepted/programs/pump-fees/src/contexts.rs#L138) |

## UpdateStableFeeConfig — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:145-152](evidence/accepted/programs/pump-fees/src/contexts.rs#L145); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.update_stable_fee_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:145-148](evidence/accepted/programs/pump-fees/src/contexts.rs#L145) |
| admin | [programs/pump-fees/src/contexts.rs:148-149](evidence/accepted/programs/pump-fees/src/contexts.rs#L148) |
| config_program_id | [programs/pump-fees/src/contexts.rs:149-151](evidence/accepted/programs/pump-fees/src/contexts.rs#L149) |

## UpsertFeeTiers — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:156-163](evidence/accepted/programs/pump-fees/src/contexts.rs#L156); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.upsert_fee_tiers.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:156-159](evidence/accepted/programs/pump-fees/src/contexts.rs#L156) |
| admin | [programs/pump-fees/src/contexts.rs:159-160](evidence/accepted/programs/pump-fees/src/contexts.rs#L159) |
| config_program_id | [programs/pump-fees/src/contexts.rs:160-162](evidence/accepted/programs/pump-fees/src/contexts.rs#L160) |

## UpsertStableFeeTiers — programs/pump-fees/src/contexts.rs

[programs/pump-fees/src/contexts.rs:167-174](evidence/accepted/programs/pump-fees/src/contexts.rs#L167); baseline: text_identical; event_cpi attribute: True.

Direct entry-context users: pump_fees.upsert_stable_fee_tiers.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| fee_config | [programs/pump-fees/src/contexts.rs:167-170](evidence/accepted/programs/pump-fees/src/contexts.rs#L167) |
| admin | [programs/pump-fees/src/contexts.rs:170-171](evidence/accepted/programs/pump-fees/src/contexts.rs#L170) |
| config_program_id | [programs/pump-fees/src/contexts.rs:171-173](evidence/accepted/programs/pump-fees/src/contexts.rs#L171) |

## CreateDonationFeePda — programs/pump-fees/src/donation.rs

[programs/pump-fees/src/donation.rs:82-98](evidence/accepted/programs/pump-fees/src/donation.rs#L82); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.create_donation_fee_pda.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| event_authority | [programs/pump-fees/src/donation.rs:82-84](evidence/accepted/programs/pump-fees/src/donation.rs#L82) |
| program | [programs/pump-fees/src/donation.rs:84-85](evidence/accepted/programs/pump-fees/src/donation.rs#L84) |
| payer | [programs/pump-fees/src/donation.rs:85-86](evidence/accepted/programs/pump-fees/src/donation.rs#L85) |
| system_program | [programs/pump-fees/src/donation.rs:86-87](evidence/accepted/programs/pump-fees/src/donation.rs#L86) |
| fee_program_global | [programs/pump-fees/src/donation.rs:87-88](evidence/accepted/programs/pump-fees/src/donation.rs#L87) |
| donation_fee_pda | [programs/pump-fees/src/donation.rs:88-89](evidence/accepted/programs/pump-fees/src/donation.rs#L88) |
| config_id | [programs/pump-fees/src/donation.rs:89-91](evidence/accepted/programs/pump-fees/src/donation.rs#L89) |
| base_mint | [programs/pump-fees/src/donation.rs:91-92](evidence/accepted/programs/pump-fees/src/donation.rs#L91) |
| bonding_curve | [programs/pump-fees/src/donation.rs:92-93](evidence/accepted/programs/pump-fees/src/donation.rs#L92) |
| pool | [programs/pump-fees/src/donation.rs:93-95](evidence/accepted/programs/pump-fees/src/donation.rs#L93) |
| sharing_config | [programs/pump-fees/src/donation.rs:95-97](evidence/accepted/programs/pump-fees/src/donation.rs#L95) |

## CrankDonationFeePda — programs/pump-fees/src/donation.rs

[programs/pump-fees/src/donation.rs:112-138](evidence/accepted/programs/pump-fees/src/donation.rs#L112); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.crank_donation_fee_pda.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| event_authority | [programs/pump-fees/src/donation.rs:112-114](evidence/accepted/programs/pump-fees/src/donation.rs#L112) |
| program | [programs/pump-fees/src/donation.rs:114-115](evidence/accepted/programs/pump-fees/src/donation.rs#L114) |
| payer | [programs/pump-fees/src/donation.rs:115-116](evidence/accepted/programs/pump-fees/src/donation.rs#L115) |
| system_program | [programs/pump-fees/src/donation.rs:116-117](evidence/accepted/programs/pump-fees/src/donation.rs#L116) |
| token_program | [programs/pump-fees/src/donation.rs:117-118](evidence/accepted/programs/pump-fees/src/donation.rs#L117) |
| associated_token_program | [programs/pump-fees/src/donation.rs:118-119](evidence/accepted/programs/pump-fees/src/donation.rs#L118) |
| rent | [programs/pump-fees/src/donation.rs:119-121](evidence/accepted/programs/pump-fees/src/donation.rs#L119) |
| fee_program_global | [programs/pump-fees/src/donation.rs:121-122](evidence/accepted/programs/pump-fees/src/donation.rs#L121) |
| donation_fee_pda | [programs/pump-fees/src/donation.rs:122-123](evidence/accepted/programs/pump-fees/src/donation.rs#L122) |
| quote_mint | [programs/pump-fees/src/donation.rs:123-124](evidence/accepted/programs/pump-fees/src/donation.rs#L123) |
| donation_fee_pda_ata | [programs/pump-fees/src/donation.rs:124-125](evidence/accepted/programs/pump-fees/src/donation.rs#L124) |
| donation_relay_program | [programs/pump-fees/src/donation.rs:125-127](evidence/accepted/programs/pump-fees/src/donation.rs#L125) |
| donation_relay_event_authority | [programs/pump-fees/src/donation.rs:127-129](evidence/accepted/programs/pump-fees/src/donation.rs#L127) |
| mint_whitelist | [programs/pump-fees/src/donation.rs:129-131](evidence/accepted/programs/pump-fees/src/donation.rs#L129) |
| epoch_tracker | [programs/pump-fees/src/donation.rs:131-133](evidence/accepted/programs/pump-fees/src/donation.rs#L131) |
| debouncer | [programs/pump-fees/src/donation.rs:133-135](evidence/accepted/programs/pump-fees/src/donation.rs#L133) |
| debouncer_ata | [programs/pump-fees/src/donation.rs:135-137](evidence/accepted/programs/pump-fees/src/donation.rs#L135) |

## CreateFeeSharingConfig — programs/pump-fees/src/sharing.rs

[programs/pump-fees/src/sharing.rs:38-56](evidence/accepted/programs/pump-fees/src/sharing.rs#L38); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.create_fee_sharing_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| event_authority | [programs/pump-fees/src/sharing.rs:38-40](evidence/accepted/programs/pump-fees/src/sharing.rs#L38) |
| program | [programs/pump-fees/src/sharing.rs:40-41](evidence/accepted/programs/pump-fees/src/sharing.rs#L40) |
| payer | [programs/pump-fees/src/sharing.rs:41-42](evidence/accepted/programs/pump-fees/src/sharing.rs#L41) |
| global | [programs/pump-fees/src/sharing.rs:42-43](evidence/accepted/programs/pump-fees/src/sharing.rs#L42) |
| mint | [programs/pump-fees/src/sharing.rs:43-44](evidence/accepted/programs/pump-fees/src/sharing.rs#L43) |
| sharing_config | [programs/pump-fees/src/sharing.rs:44-45](evidence/accepted/programs/pump-fees/src/sharing.rs#L44) |
| system_program | [programs/pump-fees/src/sharing.rs:45-46](evidence/accepted/programs/pump-fees/src/sharing.rs#L45) |
| bonding_curve | [programs/pump-fees/src/sharing.rs:46-47](evidence/accepted/programs/pump-fees/src/sharing.rs#L46) |
| pump_program | [programs/pump-fees/src/sharing.rs:47-48](evidence/accepted/programs/pump-fees/src/sharing.rs#L47) |
| pump_event_authority | [programs/pump-fees/src/sharing.rs:48-50](evidence/accepted/programs/pump-fees/src/sharing.rs#L48) |
| pool | [programs/pump-fees/src/sharing.rs:50-52](evidence/accepted/programs/pump-fees/src/sharing.rs#L50) |
| pump_amm_program | [programs/pump-fees/src/sharing.rs:52-53](evidence/accepted/programs/pump-fees/src/sharing.rs#L52) |
| pump_amm_event_authority | [programs/pump-fees/src/sharing.rs:53-55](evidence/accepted/programs/pump-fees/src/sharing.rs#L53) |

## AdminCtoSharingConfig — programs/pump-fees/src/sharing_admin.rs

[programs/pump-fees/src/sharing_admin.rs:19-29](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L19); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_fees.admin_cto_sharing_config.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| pool_authority | [programs/pump-fees/src/sharing_admin.rs:19-20](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L19) |
| authority | [programs/pump-fees/src/sharing_admin.rs:20-21](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L20) |
| global | [programs/pump-fees/src/sharing_admin.rs:21-22](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L21) |
| mint | [programs/pump-fees/src/sharing_admin.rs:22-23](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L22) |
| sharing_config | [programs/pump-fees/src/sharing_admin.rs:23-24](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L23) |
| event_authority | [programs/pump-fees/src/sharing_admin.rs:24-26](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L24) |
| program | [programs/pump-fees/src/sharing_admin.rs:26-28](evidence/accepted/programs/pump-fees/src/sharing_admin.rs#L26) |

## UpdateFeeShares — programs/pump-fees/src/sharing_update.rs

[programs/pump-fees/src/sharing_update.rs:60-85](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L60); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_fees.update_fee_shares.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| event_authority | [programs/pump-fees/src/sharing_update.rs:60-62](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L60) |
| program | [programs/pump-fees/src/sharing_update.rs:62-63](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L62) |
| authority | [programs/pump-fees/src/sharing_update.rs:63-64](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L63) |
| global | [programs/pump-fees/src/sharing_update.rs:64-65](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L64) |
| mint | [programs/pump-fees/src/sharing_update.rs:65-66](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L65) |
| sharing_config | [programs/pump-fees/src/sharing_update.rs:66-67](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L66) |
| bonding_curve | [programs/pump-fees/src/sharing_update.rs:67-68](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L67) |
| pump_creator_vault | [programs/pump-fees/src/sharing_update.rs:68-70](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L68) |
| system_program | [programs/pump-fees/src/sharing_update.rs:70-71](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L70) |
| pump_program | [programs/pump-fees/src/sharing_update.rs:71-72](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L71) |
| pump_event_authority | [programs/pump-fees/src/sharing_update.rs:72-74](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L72) |
| pump_amm_program | [programs/pump-fees/src/sharing_update.rs:74-75](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L74) |
| amm_event_authority | [programs/pump-fees/src/sharing_update.rs:75-77](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L75) |
| wsol_mint | [programs/pump-fees/src/sharing_update.rs:77-78](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L77) |
| token_program | [programs/pump-fees/src/sharing_update.rs:78-79](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L78) |
| associated_token_program | [programs/pump-fees/src/sharing_update.rs:79-80](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L79) |
| coin_creator_vault_authority | [programs/pump-fees/src/sharing_update.rs:80-82](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L80) |
| coin_creator_vault_ata | [programs/pump-fees/src/sharing_update.rs:82-84](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L82) |

## UpdateFeeSharesV2 — programs/pump-fees/src/sharing_update.rs

[programs/pump-fees/src/sharing_update.rs:87-114](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L87); baseline: absent_at_baseline; event_cpi attribute: False.

Direct entry-context users: pump_fees.update_fee_shares_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| event_authority | [programs/pump-fees/src/sharing_update.rs:87-89](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L87) |
| program | [programs/pump-fees/src/sharing_update.rs:89-90](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L89) |
| authority | [programs/pump-fees/src/sharing_update.rs:90-91](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L90) |
| global | [programs/pump-fees/src/sharing_update.rs:91-92](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L91) |
| mint | [programs/pump-fees/src/sharing_update.rs:92-93](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L92) |
| sharing_config | [programs/pump-fees/src/sharing_update.rs:93-94](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L93) |
| bonding_curve | [programs/pump-fees/src/sharing_update.rs:94-95](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L94) |
| pump_creator_vault | [programs/pump-fees/src/sharing_update.rs:95-97](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L95) |
| pump_creator_vault_ata | [programs/pump-fees/src/sharing_update.rs:97-99](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L97) |
| system_program | [programs/pump-fees/src/sharing_update.rs:99-100](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L99) |
| pump_program | [programs/pump-fees/src/sharing_update.rs:100-101](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L100) |
| pump_event_authority | [programs/pump-fees/src/sharing_update.rs:101-103](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L101) |
| pump_amm_program | [programs/pump-fees/src/sharing_update.rs:103-104](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L103) |
| amm_event_authority | [programs/pump-fees/src/sharing_update.rs:104-106](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L104) |
| quote_mint | [programs/pump-fees/src/sharing_update.rs:106-107](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L106) |
| token_program | [programs/pump-fees/src/sharing_update.rs:107-108](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L107) |
| associated_token_program | [programs/pump-fees/src/sharing_update.rs:108-109](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L108) |
| coin_creator_vault_authority | [programs/pump-fees/src/sharing_update.rs:109-111](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L109) |
| coin_creator_vault_ata | [programs/pump-fees/src/sharing_update.rs:111-113](evidence/accepted/programs/pump-fees/src/sharing_update.rs#L111) |

## CreateSocialFeePda — programs/pump-fees/src/social.rs

[programs/pump-fees/src/social.rs:60-69](evidence/accepted/programs/pump-fees/src/social.rs#L60); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.create_social_fee_pda.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| payer | [programs/pump-fees/src/social.rs:60-61](evidence/accepted/programs/pump-fees/src/social.rs#L60) |
| social_fee_pda | [programs/pump-fees/src/social.rs:61-62](evidence/accepted/programs/pump-fees/src/social.rs#L61) |
| system_program | [programs/pump-fees/src/social.rs:62-63](evidence/accepted/programs/pump-fees/src/social.rs#L62) |
| fee_program_global | [programs/pump-fees/src/social.rs:63-64](evidence/accepted/programs/pump-fees/src/social.rs#L63) |
| event_authority | [programs/pump-fees/src/social.rs:64-66](evidence/accepted/programs/pump-fees/src/social.rs#L64) |
| program | [programs/pump-fees/src/social.rs:66-68](evidence/accepted/programs/pump-fees/src/social.rs#L66) |

## ClaimSocialFeePda — programs/pump-fees/src/social.rs

[programs/pump-fees/src/social.rs:77-87](evidence/accepted/programs/pump-fees/src/social.rs#L77); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.claim_social_fee_pda.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| recipient | [programs/pump-fees/src/social.rs:77-79](evidence/accepted/programs/pump-fees/src/social.rs#L77) |
| social_fee_pda | [programs/pump-fees/src/social.rs:79-80](evidence/accepted/programs/pump-fees/src/social.rs#L79) |
| fee_program_global | [programs/pump-fees/src/social.rs:80-81](evidence/accepted/programs/pump-fees/src/social.rs#L80) |
| social_claim_authority | [programs/pump-fees/src/social.rs:81-82](evidence/accepted/programs/pump-fees/src/social.rs#L81) |
| event_authority | [programs/pump-fees/src/social.rs:82-84](evidence/accepted/programs/pump-fees/src/social.rs#L82) |
| program | [programs/pump-fees/src/social.rs:84-86](evidence/accepted/programs/pump-fees/src/social.rs#L84) |

## ClaimSocialFeePdaV2 — programs/pump-fees/src/social.rs

[programs/pump-fees/src/social.rs:101-119](evidence/accepted/programs/pump-fees/src/social.rs#L101); baseline: text_changed; event_cpi attribute: False.

Direct entry-context users: pump_fees.claim_social_fee_pda_v2.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| recipient | [programs/pump-fees/src/social.rs:101-103](evidence/accepted/programs/pump-fees/src/social.rs#L101) |
| social_fee_pda | [programs/pump-fees/src/social.rs:103-104](evidence/accepted/programs/pump-fees/src/social.rs#L103) |
| quote_mint | [programs/pump-fees/src/social.rs:104-105](evidence/accepted/programs/pump-fees/src/social.rs#L104) |
| associated_social_fee_pda | [programs/pump-fees/src/social.rs:105-107](evidence/accepted/programs/pump-fees/src/social.rs#L105) |
| associated_recipient | [programs/pump-fees/src/social.rs:107-109](evidence/accepted/programs/pump-fees/src/social.rs#L107) |
| quote_token_program | [programs/pump-fees/src/social.rs:109-110](evidence/accepted/programs/pump-fees/src/social.rs#L109) |
| associated_token_program | [programs/pump-fees/src/social.rs:110-111](evidence/accepted/programs/pump-fees/src/social.rs#L110) |
| fee_program_global | [programs/pump-fees/src/social.rs:111-112](evidence/accepted/programs/pump-fees/src/social.rs#L111) |
| social_claim_authority | [programs/pump-fees/src/social.rs:112-113](evidence/accepted/programs/pump-fees/src/social.rs#L112) |
| system_program | [programs/pump-fees/src/social.rs:113-114](evidence/accepted/programs/pump-fees/src/social.rs#L113) |
| event_authority | [programs/pump-fees/src/social.rs:114-116](evidence/accepted/programs/pump-fees/src/social.rs#L114) |
| program | [programs/pump-fees/src/social.rs:116-118](evidence/accepted/programs/pump-fees/src/social.rs#L116) |

## Withdraw — programs/pump-fees/src/withdrawal.rs

[programs/pump-fees/src/withdrawal.rs:24-36](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L24); baseline: text_identical; event_cpi attribute: False.

Direct entry-context users: pump_fees.withdraw.

| Declared field | Complete field and preceding constraint span |
| --- | --- |
| user | [programs/pump-fees/src/withdrawal.rs:24-25](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L24) |
| referral_vault | [programs/pump-fees/src/withdrawal.rs:25-26](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L25) |
| quote_mint | [programs/pump-fees/src/withdrawal.rs:26-27](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L26) |
| vault_ata | [programs/pump-fees/src/withdrawal.rs:27-28](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L27) |
| user_ata | [programs/pump-fees/src/withdrawal.rs:28-29](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L28) |
| token_program | [programs/pump-fees/src/withdrawal.rs:29-30](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L29) |
| system_program | [programs/pump-fees/src/withdrawal.rs:30-31](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L30) |
| event_authority | [programs/pump-fees/src/withdrawal.rs:31-33](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L31) |
| program | [programs/pump-fees/src/withdrawal.rs:33-35](evidence/accepted/programs/pump-fees/src/withdrawal.rs#L33) |
