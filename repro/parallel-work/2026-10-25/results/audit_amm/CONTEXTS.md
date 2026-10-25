# Account context matrix

Exact field spans and SHA256 are in result.json. These judgments include handler checks; annotations alone are not exhaustive security evidence.

| Context | Source | Constraints and boundary |
|---|---|---|
| InitBoost | [boost.rs:5-25](inputs/programs/pump-amm/src/boost.rs#L5) bytes [137,1518) | Canonical config, seeded boost vault authority/ATA, creator signer; pool relationships via has_one, handler checks external Pump PDA signer. |
| BoostBuyAndBurn | [boost_burn.rs:7-28](inputs/programs/pump-amm/src/boost_burn.rs#L7) bytes [310,1667) | Pool readonly, base mint/vaults mutable, quote mint conditional runtime writable; authority role checked in body, boost ATA constrained. |
| ClaimCashback | [cashback.rs:4-20](inputs/programs/pump-amm/src/cashback.rs#L4) bytes [87,1212) | User need not sign because destination token authority fixed to user and source seeded accumulator; quote generic, counters not per-mint. |
| CollectCoinCreatorFee | [collect.rs:5-17](inputs/programs/pump-amm/src/collect.rs#L5) bytes [100,989) | Creator identity key controls both seeded source and receiver authority; handler rejects Fees owner. No signer/rent required. |
| CreatePool | [create.rs:53-78](inputs/programs/pump-amm/src/create.rs#L53) bytes [1574,3448) | Initial PDA, LP mint and token-program-specific vault ATAs originate here; payer signer; config address not constrained. |
| MigratePoolCoinCreator | [creator_reassignment.rs:25-28](inputs/programs/pump-amm/src/creator_reassignment.rs#L25) bytes [2399,2955) | Pool canonical derivation plus Fees sharing PDA, owner/discriminator and admin/mint equality; no signer or Active predicate. |
| SetCoinCreator | [creator_reassignment.rs:38-42](inputs/programs/pump-amm/src/creator_reassignment.rs#L38) bytes [3600,4012) | Pool mutable typed, Metaplex metadata PDA and typed owner, Pump curve PDA/typed owner. No proof metadata creators nonempty/verified. |
| AdminCtoPool | [creator_reassignment.rs:62-68](inputs/programs/pump-amm/src/creator_reassignment.rs#L62) bytes [5618,5963) | Payer signer funds resize, Pump PDA signer authorizes; config no seeds/admin signer. Pool.creator equality in handler is essential. |
| ExtendAccount | [extend.rs:4-11](inputs/programs/pump-amm/src/extend.rs#L4) bytes [51,335) | Raw writable AMM owner plus user mutable signer; handler gates supported discriminator. No state deserialize. |
| SyncUserVolumeAccumulator | [incentives.rs:16-23](inputs/programs/pump-amm/src/incentives.rs#L16) bytes [388,808) | Both global/user PDA contexts typed; only user accumulator mutable; user is seed, not required signer. |
| AdminUpdateTokenIncentives | [incentives.rs:43-55](inputs/programs/pump-amm/src/incentives.rs#L43) bytes [1683,2514) | Canonical config/admin signer and global accumulator; vault ATA may init via admin; no global init here. |
| ClaimTokenIncentives | [incentives.rs:91-111](inputs/programs/pump-amm/src/incentives.rs#L91) bytes [4652,6019) | Global mint relationship, seeded user/global accumulators, recipient user ATA and payer signer; event self fixed. |
| LegacyBuy | [legacy_buy.rs:8-48](inputs/programs/pump-amm/src/legacy_buy.rs#L8) bytes [247,2987) | All pool relationships and recipient ATAs declared; user accumulator/init/global accumulator and external fee PDA; dynamic cashback/buyback in body. |
| LegacySell | [legacy_sell.rs:8-44](inputs/programs/pump-amm/src/legacy_sell.rs#L8) bytes [247,2651) | Same trade relationships minus volume accounts; dynamic cashback must authenticate raw accounts itself. |
| AdminGlobal | [lib.rs:244-248](inputs/programs/pump-amm/src/lib.rs#L244) bytes [14478,14661) | Signer+has_one admin, mutable typed config, no seeds; only authenticated existing state, not singleton. |
| UpdateAdmin | [lib.rs:383-389](inputs/programs/pump-amm/src/lib.rs#L383) bytes [20594,20895) | Admin gate, mutable config, new_admin unchecked key only; no consent/nonzero gate. |
| AdminGlobalNoEvent | [lib.rs:392-396](inputs/programs/pump-amm/src/lib.rs#L392) bytes [20921,21111) | Same admin gate without event accounts; no seeds. |
| SetBoostAuthority | [lib.rs:400-407](inputs/programs/pump-amm/src/lib.rs#L400) bytes [21150,21496) | Admin gate, typed System, unchecked destination authority; admin lacks mut for rent funding branch. |
| UpdateCreatorFeeConfig | [lib.rs:411-417](inputs/programs/pump-amm/src/lib.rs#L411) bytes [21535,21797) | Admin mutable signer funds expansion; config mutable/has_one, no canonical seeds. |
| SetReservedFeeRecipients | [lib.rs:421-425](inputs/programs/pump-amm/src/lib.rs#L421) bytes [21836,22066) | Adds canonical global_config seeds to admin has_one gate. |
| InitUserVolumeAccumulator | [lib.rs:429-437](inputs/programs/pump-amm/src/lib.rs#L429) bytes [22105,22561) | Payer mutable signer; unchecked user seed; init_if_needed137 and System prevent arbitrary state account. |
| CloseUserVolumeAccumulator | [lib.rs:440-445](inputs/programs/pump-amm/src/lib.rs#L440) bytes [22599,22863) | User mutable signer; close destination same user; canonical accumulator seeds; no pending entitlement guard. |
| Liquidity | [lib.rs:449-470](inputs/programs/pump-amm/src/lib.rs#L449) bytes [22902,24191) | Pool has_one binds five identities; typed mint/vault owners; user LP authority; CPI enforces other token relationships; config not canonical. |
| MultiHop | [multi_hop.rs:11-41](inputs/programs/pump-amm/src/multi_hop.rs#L11) bytes [443,2053) | Canonical config PDA eligible as CPI signer, fee PDA, fixed programs, user signer; Pump globals intentionally unchecked forwarded trust boundary. |
| AmmHop | [multi_hop.rs:49-58](inputs/programs/pump-amm/src/multi_hop.rs#L49) bytes [2173,2820) | Each5 dynamic accounts parsed with owner/discriminator/mut and has_one; pool PDA enforced indirectly by outgoing token authority signing, not context seeds. |
| SweepFees | [sweep.rs:8-25](inputs/programs/pump-amm/src/sweep.rs#L8) bytes [156,1260) | Payer signer, pool quote has_one; destination ATA address constrained but initialized token contents checked at CPI; role membership in body. |
| TradeV2 | [trade.rs:116-139](inputs/programs/pump-amm/src/trade.rs#L116) bytes [4521,6332) | Pool has_one/owner/discriminator plus user signer; fee and accumulator seeded; unchecked buyback must pass body owner/mint/ATA tests; config no seeds. |
| TransferCreatorFeesToPump | [transfer_creator.rs:5-21](inputs/programs/pump-amm/src/transfer_creator.rs#L5) bytes [143,1228) | Native mint pinned, source ATA canonical, destination Pump PDA, vault authority mutable for close funding. No signer required. |
| TransferCreatorFeesToPumpV2 | [transfer_creator.rs:24-43](inputs/programs/pump-amm/src/transfer_creator.rs#L24) bytes [1266,2588) | Payer mutable signer for generic ATA creation; both authority PDAs plus destination ATA seeds, mint generic; native branch uses same unwrap. |
