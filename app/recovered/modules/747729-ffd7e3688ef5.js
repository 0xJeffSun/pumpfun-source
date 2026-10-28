// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r,
    o,
    a,
    s,
    i,
    m,
    l,
    u,
    d,
    p,
    c,
    T,
    E,
    f,
    _,
    g,
    S,
    N,
    I,
    h,
    y,
    k,
    O,
    R,
    P,
    A,
    D,
    C,
    L,
    w,
    U,
    F,
    v,
    M,
    J,
    b,
    B,
    q,
    x,
    V,
    K,
    Y,
    G,
    H,
    W,
    j,
    X,
    $,
    z,
    Q,
    Z,
    ee;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.MultiChainTonTradeEvent =
      t.TonCurveState =
      t.TonIdentity =
      t.TonUsd =
      t.TonAmount =
      t.TonAddress =
      t.MultiChainPerpFillEvent_Liquidation =
      t.MultiChainPerpFillEvent_Direction =
      t.MultiChainPerpFillEvent =
      t.MultiChainSwapRevertEvent =
      t.MultiChainTransferEvent =
      t.MultiChainLiquidityEvent =
      t.MultiChainTradeEvent =
      t.MultiChainPoolCreationEvent =
      t.EvmCoinCreationData =
      t.SvmCoinCreationData =
      t.MultiChainCoinCreationEvent =
      t.MultiChainEvent =
      t.EvmTradeData =
      t.PoolLiquidity =
      t.BondingCurveState =
      t.EventIdentity =
      t.TraderBalances =
      t.BalanceChange =
      t.Fees =
      t.StarknetLaunchPhase =
      t.StarknetTransferKind =
      t.StarknetAttribution =
      t.StarknetQuoteKind =
      t.StarknetVenueKind =
      t.StarknetVenue =
      t.StarknetTxType =
      t.NearTransferKind =
      t.NearLiquidityKind =
      t.NearCurveKind =
      t.NearAttribution =
      t.NearFailReason =
      t.NearQuoteKind =
      t.NearVenueKind =
      t.NearVenue =
      t.TonFailReason =
      t.TonMetadataKind =
      t.TonQuoteKind =
      t.TonVenueKind =
      t.TonVenue =
      t.LiquidityAction =
      t.LiquidityType =
      t.TradeType =
      t.Protocol =
      t.ChainFamily =
        void 0),
    (t.MultiChainStarknetGraduationEvent =
      t.MultiChainStarknetRevokeEvent =
      t.MultiChainStarknetTransferEvent =
      t.MultiChainStarknetLiquidityEvent =
      t.MultiChainStarknetLaunchEvent =
      t.MultiChainStarknetPoolEvent =
      t.MultiChainStarknetTradeEvent =
      t.StarknetCurveState =
      t.StarknetTokenMetadata =
      t.StarknetIdentity =
      t.StarknetUsd =
      t.StarknetAmount =
      t.MultiChainNearTraceFailedEvent =
      t.MultiChainNearTransferEvent =
      t.MultiChainNearLiquidityEvent =
      t.MultiChainNearLaunchEvent =
      t.MultiChainNearPoolCreatedEvent =
      t.MultiChainNearTradeEvent =
      t.NearTokenMetadata =
      t.NearIdentity =
      t.NearUsd =
      t.NearAmount =
      t.MultiChainTonTraceFailedEvent =
      t.MultiChainTonGraduationEvent =
      t.MultiChainTonLaunchEvent =
      t.MultiChainTonJettonMetadataEvent =
      t.MultiChainTonPoolEvent =
        void 0));
  let en = e.r(376244);
  (((D = r || (t.ChainFamily = r = {}))[(D.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (D[(D.SVM = 1)] = "SVM"),
    (D[(D.EVM = 2)] = "EVM"),
    (D[(D.TON = 3)] = "TON"),
    (D[(D.HYPERCORE = 4)] = "HYPERCORE"),
    (D[(D.NEAR = 5)] = "NEAR"),
    (D[(D.STARKNET = 6)] = "STARKNET"),
    en.proto3.util.setEnumType(r, "multichain.events.v1.ChainFamily", [
      { no: 0, name: "CHAIN_FAMILY_UNSPECIFIED" },
      { no: 1, name: "CHAIN_FAMILY_SVM" },
      { no: 2, name: "CHAIN_FAMILY_EVM" },
      { no: 3, name: "CHAIN_FAMILY_TON" },
      { no: 4, name: "CHAIN_FAMILY_HYPERCORE" },
      { no: 5, name: "CHAIN_FAMILY_NEAR" },
      { no: 6, name: "CHAIN_FAMILY_STARKNET" },
    ]),
    ((C = o || (t.Protocol = o = {}))[(C.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (C[(C.PUMP = 1)] = "PUMP"),
    (C[(C.PUMP_AMM = 2)] = "PUMP_AMM"),
    (C[(C.RAYDIUM_CPMM = 3)] = "RAYDIUM_CPMM"),
    (C[(C.RAYDIUM_CLMM = 4)] = "RAYDIUM_CLMM"),
    (C[(C.RAYDIUM_AMM_V4 = 5)] = "RAYDIUM_AMM_V4"),
    (C[(C.RAYDIUM_LAUNCHPAD = 6)] = "RAYDIUM_LAUNCHPAD"),
    (C[(C.METEORA_DLMM = 7)] = "METEORA_DLMM"),
    (C[(C.METEORA_DAMM_V2 = 8)] = "METEORA_DAMM_V2"),
    (C[(C.METEORA_DBC = 9)] = "METEORA_DBC"),
    (C[(C.ORCA_WHIRLPOOL = 10)] = "ORCA_WHIRLPOOL"),
    (C[(C.METEORA_DAMM_V1 = 11)] = "METEORA_DAMM_V1"),
    (C[(C.LOADOUT = 12)] = "LOADOUT"),
    (C[(C.UNISWAP_V2 = 100)] = "UNISWAP_V2"),
    (C[(C.UNISWAP_V3 = 101)] = "UNISWAP_V3"),
    (C[(C.UNISWAP_V4 = 102)] = "UNISWAP_V4"),
    (C[(C.AERODROME = 103)] = "AERODROME"),
    (C[(C.AERODROME_SLIPSTREAM = 104)] = "AERODROME_SLIPSTREAM"),
    (C[(C.PANCAKESWAP_V2 = 105)] = "PANCAKESWAP_V2"),
    (C[(C.PANCAKESWAP_V3 = 106)] = "PANCAKESWAP_V3"),
    (C[(C.FOUR_MEME = 107)] = "FOUR_MEME"),
    (C[(C.ROBINHOOD_LAUNCHPAD = 108)] = "ROBINHOOD_LAUNCHPAD"),
    (C[(C.ROOKET = 109)] = "ROOKET"),
    (C[(C.RELAY_ROUTE = 110)] = "RELAY_ROUTE"),
    (C[(C.ROBINDEX = 111)] = "ROBINDEX"),
    (C[(C.HYPERSWAP_V2 = 112)] = "HYPERSWAP_V2"),
    (C[(C.HYPERSWAP_V3 = 113)] = "HYPERSWAP_V3"),
    (C[(C.PROJECTX = 114)] = "PROJECTX"),
    (C[(C.RAMSES = 115)] = "RAMSES"),
    (C[(C.ALGEBRA_INTEGRAL = 116)] = "ALGEBRA_INTEGRAL"),
    (C[(C.HYBRA = 117)] = "HYBRA"),
    (C[(C.LIQUID_LAUNCH = 118)] = "LIQUID_LAUNCH"),
    (C[(C.ULTRASOLID = 119)] = "ULTRASOLID"),
    (C[(C.NEST = 120)] = "NEST"),
    (C[(C.GLIQUID = 121)] = "GLIQUID"),
    (C[(C.KITTENSWAP = 122)] = "KITTENSWAP"),
    (C[(C.FLAP = 123)] = "FLAP"),
    (C[(C.VELODROME_SLIPSTREAM = 124)] = "VELODROME_SLIPSTREAM"),
    (C[(C.VELODROME = 125)] = "VELODROME"),
    (C[(C.DYORSWAP = 126)] = "DYORSWAP"),
    (C[(C.INKYSWAP = 127)] = "INKYSWAP"),
    (C[(C.SQUIDSWAP = 128)] = "SQUIDSWAP"),
    (C[(C.BLOTSWAP = 129)] = "BLOTSWAP"),
    (C[(C.DYORPUMP = 130)] = "DYORPUMP"),
    (C[(C.PONS = 131)] = "PONS"),
    (C[(C.STOCK_FACTORY = 132)] = "STOCK_FACTORY"),
    (C[(C.WARPDEX = 133)] = "WARPDEX"),
    (C[(C.WARP_LAUNCHPAD = 134)] = "WARP_LAUNCHPAD"),
    (C[(C.SHARC_LAUNCHPAD = 135)] = "SHARC_LAUNCHPAD"),
    (C[(C.LOTUS_LAUNCHPAD = 136)] = "LOTUS_LAUNCHPAD"),
    (C[(C.OPEN_FOUR = 137)] = "OPEN_FOUR"),
    (C[(C.O1_LAUNCHPAD = 138)] = "O1_LAUNCHPAD"),
    (C[(C.TIDEPOOL = 139)] = "TIDEPOOL"),
    (C[(C.CALAMARI = 140)] = "CALAMARI"),
    (C[(C.INKYPUMP = 141)] = "INKYPUMP"),
    (C[(C.TOLLY_LAUNCHPAD = 142)] = "TOLLY_LAUNCHPAD"),
    (C[(C.ARGUS_LAUNCHPAD = 143)] = "ARGUS_LAUNCHPAD"),
    (C[(C.LIFT_LAUNCHPAD = 144)] = "LIFT_LAUNCHPAD"),
    (C[(C.MINARA_LAUNCHPAD = 145)] = "MINARA_LAUNCHPAD"),
    (C[(C.UNISWAP_LIQUIDITY_LAUNCHER = 146)] = "UNISWAP_LIQUIDITY_LAUNCHER"),
    (C[(C.UNISWAP_CCA = 147)] = "UNISWAP_CCA"),
    (C[(C.DOPPLER = 148)] = "DOPPLER"),
    (C[(C.HYPERLIQUID_PERP = 149)] = "HYPERLIQUID_PERP"),
    (C[(C.KUMBAYA_FIRE = 150)] = "KUMBAYA_FIRE"),
    (C[(C.ABYSS = 151)] = "ABYSS"),
    (C[(C.ABYSS_LAUNCHPAD = 152)] = "ABYSS_LAUNCHPAD"),
    (C[(C.STONFI_V1 = 153)] = "STONFI_V1"),
    (C[(C.STONFI_V2 = 154)] = "STONFI_V2"),
    (C[(C.DEDUST_V2 = 155)] = "DEDUST_V2"),
    (C[(C.DEDUST_CPMM = 156)] = "DEDUST_CPMM"),
    (C[(C.TONCO_V1 = 157)] = "TONCO_V1"),
    (C[(C.TONCO_V2 = 158)] = "TONCO_V2"),
    (C[(C.URANUS = 159)] = "URANUS"),
    (C[(C.BLUM = 160)] = "BLUM"),
    (C[(C.BCL = 161)] = "BCL"),
    (C[(C.SWAP_COFFEE = 162)] = "SWAP_COFFEE"),
    (C[(C.BIDASK_DAMM = 163)] = "BIDASK_DAMM"),
    (C[(C.GASPUMP = 164)] = "GASPUMP"),
    (C[(C.MEMESLAB = 165)] = "MEMESLAB"),
    (C[(C.MOON = 166)] = "MOON"),
    (C[(C.IGNIX = 167)] = "IGNIX"),
    (C[(C.NADFUN = 169)] = "NADFUN"),
    (C[(C.NADSWAP = 170)] = "NADSWAP"),
    (C[(C.RHEA_V1 = 171)] = "RHEA_V1"),
    (C[(C.RHEA_DCL = 172)] = "RHEA_DCL"),
    (C[(C.NEARLY_TRADE = 173)] = "NEARLY_TRADE"),
    (C[(C.MEME_COOKING = 174)] = "MEME_COOKING"),
    (C[(C.NEAR_INTENTS = 175)] = "NEAR_INTENTS"),
    (C[(C.JUSTHOOT = 176)] = "JUSTHOOT"),
    (C[(C.COREPAD = 177)] = "COREPAD"),
    (C[(C.SIGNAL = 178)] = "SIGNAL"),
    (C[(C.EKUBO = 179)] = "EKUBO"),
    (C[(C.NOSTRA = 180)] = "NOSTRA"),
    (C[(C.AVNU = 181)] = "AVNU"),
    (C[(C.ZERO_D_AMM = 182)] = "ZERO_D_AMM"),
    (C[(C.LAUNCHY = 183)] = "LAUNCHY"),
    (C[(C.ASCEND = 184)] = "ASCEND"),
    (C[(C.STARKOVIA = 185)] = "STARKOVIA"),
    (C[(C.STARK_INDUSTRY = 186)] = "STARK_INDUSTRY"),
    (C[(C.STRKPUMP = 187)] = "STRKPUMP"),
    (C[(C.STRK_LAUNCH = 188)] = "STRK_LAUNCH"),
    (C[(C.SLAY = 189)] = "SLAY"),
    (C[(C.UNRUGGABLE = 190)] = "UNRUGGABLE"),
    (C[(C.PRINTR = 200)] = "PRINTR"),
    en.proto3.util.setEnumType(o, "multichain.events.v1.Protocol", [
      { no: 0, name: "PROTOCOL_UNSPECIFIED" },
      { no: 1, name: "PROTOCOL_PUMP" },
      { no: 2, name: "PROTOCOL_PUMP_AMM" },
      { no: 3, name: "PROTOCOL_RAYDIUM_CPMM" },
      { no: 4, name: "PROTOCOL_RAYDIUM_CLMM" },
      { no: 5, name: "PROTOCOL_RAYDIUM_AMM_V4" },
      { no: 6, name: "PROTOCOL_RAYDIUM_LAUNCHPAD" },
      { no: 7, name: "PROTOCOL_METEORA_DLMM" },
      { no: 8, name: "PROTOCOL_METEORA_DAMM_V2" },
      { no: 9, name: "PROTOCOL_METEORA_DBC" },
      { no: 10, name: "PROTOCOL_ORCA_WHIRLPOOL" },
      { no: 11, name: "PROTOCOL_METEORA_DAMM_V1" },
      { no: 12, name: "PROTOCOL_LOADOUT" },
      { no: 100, name: "PROTOCOL_UNISWAP_V2" },
      { no: 101, name: "PROTOCOL_UNISWAP_V3" },
      { no: 102, name: "PROTOCOL_UNISWAP_V4" },
      { no: 103, name: "PROTOCOL_AERODROME" },
      { no: 104, name: "PROTOCOL_AERODROME_SLIPSTREAM" },
      { no: 105, name: "PROTOCOL_PANCAKESWAP_V2" },
      { no: 106, name: "PROTOCOL_PANCAKESWAP_V3" },
      { no: 107, name: "PROTOCOL_FOUR_MEME" },
      { no: 108, name: "PROTOCOL_ROBINHOOD_LAUNCHPAD" },
      { no: 109, name: "PROTOCOL_ROOKET" },
      { no: 110, name: "PROTOCOL_RELAY_ROUTE" },
      { no: 111, name: "PROTOCOL_ROBINDEX" },
      { no: 112, name: "PROTOCOL_HYPERSWAP_V2" },
      { no: 113, name: "PROTOCOL_HYPERSWAP_V3" },
      { no: 114, name: "PROTOCOL_PROJECTX" },
      { no: 115, name: "PROTOCOL_RAMSES" },
      { no: 116, name: "PROTOCOL_ALGEBRA_INTEGRAL" },
      { no: 117, name: "PROTOCOL_HYBRA" },
      { no: 118, name: "PROTOCOL_LIQUID_LAUNCH" },
      { no: 119, name: "PROTOCOL_ULTRASOLID" },
      { no: 120, name: "PROTOCOL_NEST" },
      { no: 121, name: "PROTOCOL_GLIQUID" },
      { no: 122, name: "PROTOCOL_KITTENSWAP" },
      { no: 123, name: "PROTOCOL_FLAP" },
      { no: 124, name: "PROTOCOL_VELODROME_SLIPSTREAM" },
      { no: 125, name: "PROTOCOL_VELODROME" },
      { no: 126, name: "PROTOCOL_DYORSWAP" },
      { no: 127, name: "PROTOCOL_INKYSWAP" },
      { no: 128, name: "PROTOCOL_SQUIDSWAP" },
      { no: 129, name: "PROTOCOL_BLOTSWAP" },
      { no: 130, name: "PROTOCOL_DYORPUMP" },
      { no: 131, name: "PROTOCOL_PONS" },
      { no: 132, name: "PROTOCOL_STOCK_FACTORY" },
      { no: 133, name: "PROTOCOL_WARPDEX" },
      { no: 134, name: "PROTOCOL_WARP_LAUNCHPAD" },
      { no: 135, name: "PROTOCOL_SHARC_LAUNCHPAD" },
      { no: 136, name: "PROTOCOL_LOTUS_LAUNCHPAD" },
      { no: 137, name: "PROTOCOL_OPEN_FOUR" },
      { no: 138, name: "PROTOCOL_O1_LAUNCHPAD" },
      { no: 139, name: "PROTOCOL_TIDEPOOL" },
      { no: 140, name: "PROTOCOL_CALAMARI" },
      { no: 141, name: "PROTOCOL_INKYPUMP" },
      { no: 142, name: "PROTOCOL_TOLLY_LAUNCHPAD" },
      { no: 143, name: "PROTOCOL_ARGUS_LAUNCHPAD" },
      { no: 144, name: "PROTOCOL_LIFT_LAUNCHPAD" },
      { no: 145, name: "PROTOCOL_MINARA_LAUNCHPAD" },
      { no: 146, name: "PROTOCOL_UNISWAP_LIQUIDITY_LAUNCHER" },
      { no: 147, name: "PROTOCOL_UNISWAP_CCA" },
      { no: 148, name: "PROTOCOL_DOPPLER" },
      { no: 149, name: "PROTOCOL_HYPERLIQUID_PERP" },
      { no: 150, name: "PROTOCOL_KUMBAYA_FIRE" },
      { no: 151, name: "PROTOCOL_ABYSS" },
      { no: 152, name: "PROTOCOL_ABYSS_LAUNCHPAD" },
      { no: 153, name: "PROTOCOL_STONFI_V1" },
      { no: 154, name: "PROTOCOL_STONFI_V2" },
      { no: 155, name: "PROTOCOL_DEDUST_V2" },
      { no: 156, name: "PROTOCOL_DEDUST_CPMM" },
      { no: 157, name: "PROTOCOL_TONCO_V1" },
      { no: 158, name: "PROTOCOL_TONCO_V2" },
      { no: 159, name: "PROTOCOL_URANUS" },
      { no: 160, name: "PROTOCOL_BLUM" },
      { no: 161, name: "PROTOCOL_BCL" },
      { no: 162, name: "PROTOCOL_SWAP_COFFEE" },
      { no: 163, name: "PROTOCOL_BIDASK_DAMM" },
      { no: 164, name: "PROTOCOL_GASPUMP" },
      { no: 165, name: "PROTOCOL_MEMESLAB" },
      { no: 166, name: "PROTOCOL_MOON" },
      { no: 167, name: "PROTOCOL_IGNIX" },
      { no: 169, name: "PROTOCOL_NADFUN" },
      { no: 170, name: "PROTOCOL_NADSWAP" },
      { no: 171, name: "PROTOCOL_RHEA_V1" },
      { no: 172, name: "PROTOCOL_RHEA_DCL" },
      { no: 173, name: "PROTOCOL_NEARLY_TRADE" },
      { no: 174, name: "PROTOCOL_MEME_COOKING" },
      { no: 175, name: "PROTOCOL_NEAR_INTENTS" },
      { no: 176, name: "PROTOCOL_JUSTHOOT" },
      { no: 177, name: "PROTOCOL_COREPAD" },
      { no: 178, name: "PROTOCOL_SIGNAL" },
      { no: 179, name: "PROTOCOL_EKUBO" },
      { no: 180, name: "PROTOCOL_NOSTRA" },
      { no: 181, name: "PROTOCOL_AVNU" },
      { no: 182, name: "PROTOCOL_ZERO_D_AMM" },
      { no: 183, name: "PROTOCOL_LAUNCHY" },
      { no: 184, name: "PROTOCOL_ASCEND" },
      { no: 185, name: "PROTOCOL_STARKOVIA" },
      { no: 186, name: "PROTOCOL_STARK_INDUSTRY" },
      { no: 187, name: "PROTOCOL_STRKPUMP" },
      { no: 188, name: "PROTOCOL_STRK_LAUNCH" },
      { no: 189, name: "PROTOCOL_SLAY" },
      { no: 190, name: "PROTOCOL_UNRUGGABLE" },
      { no: 200, name: "PROTOCOL_PRINTR" },
    ]),
    ((L = a || (t.TradeType = a = {}))[(L.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (L[(L.BUY = 1)] = "BUY"),
    (L[(L.SELL = 2)] = "SELL"),
    en.proto3.util.setEnumType(a, "multichain.events.v1.TradeType", [
      { no: 0, name: "TRADE_TYPE_UNSPECIFIED" },
      { no: 1, name: "TRADE_TYPE_BUY" },
      { no: 2, name: "TRADE_TYPE_SELL" },
    ]),
    ((w = s || (t.LiquidityType = s = {}))[(w.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (w[(w.ACTUAL = 1)] = "ACTUAL"),
    (w[(w.VIRTUAL = 2)] = "VIRTUAL"),
    en.proto3.util.setEnumType(s, "multichain.events.v1.LiquidityType", [
      { no: 0, name: "LIQUIDITY_TYPE_UNSPECIFIED" },
      { no: 1, name: "LIQUIDITY_TYPE_ACTUAL" },
      { no: 2, name: "LIQUIDITY_TYPE_VIRTUAL" },
    ]),
    ((U = i || (t.LiquidityAction = i = {}))[(U.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (U[(U.ADD = 1)] = "ADD"),
    (U[(U.REMOVE = 2)] = "REMOVE"),
    en.proto3.util.setEnumType(i, "multichain.events.v1.LiquidityAction", [
      { no: 0, name: "LIQUIDITY_ACTION_UNSPECIFIED" },
      { no: 1, name: "LIQUIDITY_ACTION_ADD" },
      { no: 2, name: "LIQUIDITY_ACTION_REMOVE" },
    ]),
    ((F = m || (t.TonVenue = m = {}))[(F.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (F[(F.STONFI_V1 = 1)] = "STONFI_V1"),
    (F[(F.STONFI_V2 = 2)] = "STONFI_V2"),
    (F[(F.DEDUST_V2 = 3)] = "DEDUST_V2"),
    (F[(F.DEDUST_CPMM = 4)] = "DEDUST_CPMM"),
    (F[(F.TONCO_V1 = 5)] = "TONCO_V1"),
    (F[(F.TONCO_V2 = 6)] = "TONCO_V2"),
    (F[(F.URANUS = 7)] = "URANUS"),
    (F[(F.BLUM = 8)] = "BLUM"),
    (F[(F.BCL = 9)] = "BCL"),
    (F[(F.SWAP_COFFEE = 10)] = "SWAP_COFFEE"),
    (F[(F.BIDASK_DAMM = 11)] = "BIDASK_DAMM"),
    (F[(F.GASPUMP = 12)] = "GASPUMP"),
    (F[(F.MEMESLAB = 13)] = "MEMESLAB"),
    (F[(F.MOON = 14)] = "MOON"),
    en.proto3.util.setEnumType(m, "multichain.events.v1.TonVenue", [
      { no: 0, name: "TON_VENUE_UNSPECIFIED" },
      { no: 1, name: "TON_VENUE_STONFI_V1" },
      { no: 2, name: "TON_VENUE_STONFI_V2" },
      { no: 3, name: "TON_VENUE_DEDUST_V2" },
      { no: 4, name: "TON_VENUE_DEDUST_CPMM" },
      { no: 5, name: "TON_VENUE_TONCO_V1" },
      { no: 6, name: "TON_VENUE_TONCO_V2" },
      { no: 7, name: "TON_VENUE_URANUS" },
      { no: 8, name: "TON_VENUE_BLUM" },
      { no: 9, name: "TON_VENUE_BCL" },
      { no: 10, name: "TON_VENUE_SWAP_COFFEE" },
      { no: 11, name: "TON_VENUE_BIDASK_DAMM" },
      { no: 12, name: "TON_VENUE_GASPUMP" },
      { no: 13, name: "TON_VENUE_MEMESLAB" },
      { no: 14, name: "TON_VENUE_MOON" },
    ]),
    ((v = l || (t.TonVenueKind = l = {}))[(v.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (v[(v.AMM = 1)] = "AMM"),
    (v[(v.CLMM = 2)] = "CLMM"),
    (v[(v.CURVE = 3)] = "CURVE"),
    en.proto3.util.setEnumType(l, "multichain.events.v1.TonVenueKind", [
      { no: 0, name: "TON_VENUE_KIND_UNSPECIFIED" },
      { no: 1, name: "TON_VENUE_KIND_AMM" },
      { no: 2, name: "TON_VENUE_KIND_CLMM" },
      { no: 3, name: "TON_VENUE_KIND_CURVE" },
    ]),
    ((M = u || (t.TonQuoteKind = u = {}))[(M.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (M[(M.NATIVE = 1)] = "NATIVE"),
    (M[(M.PTON = 2)] = "PTON"),
    (M[(M.USD_STABLE = 3)] = "USD_STABLE"),
    (M[(M.LSD = 4)] = "LSD"),
    (M[(M.OTHER = 5)] = "OTHER"),
    en.proto3.util.setEnumType(u, "multichain.events.v1.TonQuoteKind", [
      { no: 0, name: "TON_QUOTE_KIND_UNSPECIFIED" },
      { no: 1, name: "TON_QUOTE_KIND_NATIVE" },
      { no: 2, name: "TON_QUOTE_KIND_PTON" },
      { no: 3, name: "TON_QUOTE_KIND_USD_STABLE" },
      { no: 4, name: "TON_QUOTE_KIND_LSD" },
      { no: 5, name: "TON_QUOTE_KIND_OTHER" },
    ]),
    ((J = d || (t.TonMetadataKind = d = {}))[(J.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (J[(J.ONCHAIN = 1)] = "ONCHAIN"),
    (J[(J.OFFCHAIN = 2)] = "OFFCHAIN"),
    (J[(J.SEMICHAIN = 3)] = "SEMICHAIN"),
    en.proto3.util.setEnumType(d, "multichain.events.v1.TonMetadataKind", [
      { no: 0, name: "TON_METADATA_KIND_UNSPECIFIED" },
      { no: 1, name: "TON_METADATA_KIND_ONCHAIN" },
      { no: 2, name: "TON_METADATA_KIND_OFFCHAIN" },
      { no: 3, name: "TON_METADATA_KIND_SEMICHAIN" },
    ]),
    ((b = p || (t.TonFailReason = p = {}))[(b.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (b[(b.REFUND = 1)] = "REFUND"),
    (b[(b.BOUNCE = 2)] = "BOUNCE"),
    (b[(b.ABORTED = 3)] = "ABORTED"),
    (b[(b.INCOMPLETE_TIMEOUT = 4)] = "INCOMPLETE_TIMEOUT"),
    (b[(b.UNVERIFIED_SOURCE = 5)] = "UNVERIFIED_SOURCE"),
    en.proto3.util.setEnumType(p, "multichain.events.v1.TonFailReason", [
      { no: 0, name: "TON_FAIL_REASON_UNSPECIFIED" },
      { no: 1, name: "TON_FAIL_REASON_REFUND" },
      { no: 2, name: "TON_FAIL_REASON_BOUNCE" },
      { no: 3, name: "TON_FAIL_REASON_ABORTED" },
      { no: 4, name: "TON_FAIL_REASON_INCOMPLETE_TIMEOUT" },
      { no: 5, name: "TON_FAIL_REASON_UNVERIFIED_SOURCE" },
    ]),
    ((B = c || (t.NearVenue = c = {}))[(B.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (B[(B.RHEA_V1 = 1)] = "RHEA_V1"),
    (B[(B.RHEA_DCL = 2)] = "RHEA_DCL"),
    (B[(B.NEARLY_TRADE = 3)] = "NEARLY_TRADE"),
    (B[(B.MEME_COOKING = 4)] = "MEME_COOKING"),
    (B[(B.NEAR_INTENTS = 5)] = "NEAR_INTENTS"),
    (B[(B.JUSTHOOT = 6)] = "JUSTHOOT"),
    en.proto3.util.setEnumType(c, "multichain.events.v1.NearVenue", [
      { no: 0, name: "NEAR_VENUE_UNSPECIFIED" },
      { no: 1, name: "NEAR_VENUE_RHEA_V1" },
      { no: 2, name: "NEAR_VENUE_RHEA_DCL" },
      { no: 3, name: "NEAR_VENUE_NEARLY_TRADE" },
      { no: 4, name: "NEAR_VENUE_MEME_COOKING" },
      { no: 5, name: "NEAR_VENUE_NEAR_INTENTS" },
      { no: 6, name: "NEAR_VENUE_JUSTHOOT" },
    ]),
    ((q = T || (t.NearVenueKind = T = {}))[(q.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (q[(q.AMM = 1)] = "AMM"),
    (q[(q.CLMM = 2)] = "CLMM"),
    (q[(q.CURVE = 3)] = "CURVE"),
    (q[(q.LEDGER = 4)] = "LEDGER"),
    en.proto3.util.setEnumType(T, "multichain.events.v1.NearVenueKind", [
      { no: 0, name: "NEAR_VENUE_KIND_UNSPECIFIED" },
      { no: 1, name: "NEAR_VENUE_KIND_AMM" },
      { no: 2, name: "NEAR_VENUE_KIND_CLMM" },
      { no: 3, name: "NEAR_VENUE_KIND_CURVE" },
      { no: 4, name: "NEAR_VENUE_KIND_LEDGER" },
    ]),
    ((x = E || (t.NearQuoteKind = E = {}))[(x.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (x[(x.NATIVE = 1)] = "NATIVE"),
    (x[(x.USD_STABLE = 2)] = "USD_STABLE"),
    (x[(x.OTHER = 3)] = "OTHER"),
    en.proto3.util.setEnumType(E, "multichain.events.v1.NearQuoteKind", [
      { no: 0, name: "NEAR_QUOTE_KIND_UNSPECIFIED" },
      { no: 1, name: "NEAR_QUOTE_KIND_NATIVE" },
      { no: 2, name: "NEAR_QUOTE_KIND_USD_STABLE" },
      { no: 3, name: "NEAR_QUOTE_KIND_OTHER" },
    ]),
    ((V = f || (t.NearFailReason = f = {}))[(V.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (V[(V.RECEIPT_FAILED = 1)] = "RECEIPT_FAILED"),
    (V[(V.REFUNDED = 2)] = "REFUNDED"),
    (V[(V.INCOMPLETE_TIMEOUT = 3)] = "INCOMPLETE_TIMEOUT"),
    (V[(V.UNVERIFIED = 4)] = "UNVERIFIED"),
    en.proto3.util.setEnumType(f, "multichain.events.v1.NearFailReason", [
      { no: 0, name: "NEAR_FAIL_REASON_UNSPECIFIED" },
      { no: 1, name: "NEAR_FAIL_REASON_RECEIPT_FAILED" },
      { no: 2, name: "NEAR_FAIL_REASON_REFUNDED" },
      { no: 3, name: "NEAR_FAIL_REASON_INCOMPLETE_TIMEOUT" },
      { no: 4, name: "NEAR_FAIL_REASON_UNVERIFIED" },
    ]),
    ((K = _ || (t.NearAttribution = _ = {}))[(K.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (K[(K.DIRECT = 1)] = "DIRECT"),
    (K[(K.DEPOSIT_SENDER = 2)] = "DEPOSIT_SENDER"),
    (K[(K.PROXY = 3)] = "PROXY"),
    (K[(K.FALLBACK = 4)] = "FALLBACK"),
    en.proto3.util.setEnumType(_, "multichain.events.v1.NearAttribution", [
      { no: 0, name: "NEAR_ATTRIBUTION_UNSPECIFIED" },
      { no: 1, name: "NEAR_ATTRIBUTION_DIRECT" },
      { no: 2, name: "NEAR_ATTRIBUTION_DEPOSIT_SENDER" },
      { no: 3, name: "NEAR_ATTRIBUTION_PROXY" },
      { no: 4, name: "NEAR_ATTRIBUTION_FALLBACK" },
    ]),
    ((Y = g || (t.NearCurveKind = g = {}))[(Y.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (Y[(Y.NONE = 1)] = "NONE"),
    (Y[(Y.DEPOSIT_AUCTION = 2)] = "DEPOSIT_AUCTION"),
    en.proto3.util.setEnumType(g, "multichain.events.v1.NearCurveKind", [
      { no: 0, name: "NEAR_CURVE_KIND_UNSPECIFIED" },
      { no: 1, name: "NEAR_CURVE_KIND_NONE" },
      { no: 2, name: "NEAR_CURVE_KIND_DEPOSIT_AUCTION" },
    ]),
    ((G = S || (t.NearLiquidityKind = S = {}))[(G.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (G[(G.ADD = 1)] = "ADD"),
    (G[(G.REMOVE = 2)] = "REMOVE"),
    en.proto3.util.setEnumType(S, "multichain.events.v1.NearLiquidityKind", [
      { no: 0, name: "NEAR_LIQUIDITY_KIND_UNSPECIFIED" },
      { no: 1, name: "NEAR_LIQUIDITY_KIND_ADD" },
      { no: 2, name: "NEAR_LIQUIDITY_KIND_REMOVE" },
    ]),
    ((H = N || (t.NearTransferKind = N = {}))[(H.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (H[(H.TRANSFER = 1)] = "TRANSFER"),
    (H[(H.MINT = 2)] = "MINT"),
    (H[(H.BURN = 3)] = "BURN"),
    (H[(H.STATE_RECONCILE = 4)] = "STATE_RECONCILE"),
    en.proto3.util.setEnumType(N, "multichain.events.v1.NearTransferKind", [
      { no: 0, name: "NEAR_TRANSFER_KIND_UNSPECIFIED" },
      { no: 1, name: "NEAR_TRANSFER_KIND_TRANSFER" },
      { no: 2, name: "NEAR_TRANSFER_KIND_MINT" },
      { no: 3, name: "NEAR_TRANSFER_KIND_BURN" },
      { no: 4, name: "NEAR_TRANSFER_KIND_STATE_RECONCILE" },
    ]),
    ((W = I || (t.StarknetTxType = I = {}))[(W.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (W[(W.INVOKE = 1)] = "INVOKE"),
    (W[(W.DEPLOY_ACCOUNT = 2)] = "DEPLOY_ACCOUNT"),
    (W[(W.L1_HANDLER = 3)] = "L1_HANDLER"),
    (W[(W.DECLARE = 4)] = "DECLARE"),
    (W[(W.DEPLOY = 5)] = "DEPLOY"),
    en.proto3.util.setEnumType(I, "multichain.events.v1.StarknetTxType", [
      { no: 0, name: "STARKNET_TX_TYPE_UNSPECIFIED" },
      { no: 1, name: "STARKNET_TX_TYPE_INVOKE" },
      { no: 2, name: "STARKNET_TX_TYPE_DEPLOY_ACCOUNT" },
      { no: 3, name: "STARKNET_TX_TYPE_L1_HANDLER" },
      { no: 4, name: "STARKNET_TX_TYPE_DECLARE" },
      { no: 5, name: "STARKNET_TX_TYPE_DEPLOY" },
    ]),
    ((j = h || (t.StarknetVenue = h = {}))[(j.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (j[(j.EKUBO = 1)] = "EKUBO"),
    (j[(j.NOSTRA = 2)] = "NOSTRA"),
    (j[(j.AVNU = 3)] = "AVNU"),
    (j[(j.ZERO_D_AMM = 4)] = "ZERO_D_AMM"),
    (j[(j.LAUNCHY = 5)] = "LAUNCHY"),
    (j[(j.ASCEND = 6)] = "ASCEND"),
    (j[(j.STARKOVIA = 7)] = "STARKOVIA"),
    (j[(j.STARK_INDUSTRY = 8)] = "STARK_INDUSTRY"),
    (j[(j.STRKPUMP = 9)] = "STRKPUMP"),
    (j[(j.STRK_LAUNCH = 10)] = "STRK_LAUNCH"),
    (j[(j.SLAY = 11)] = "SLAY"),
    (j[(j.UNRUGGABLE = 12)] = "UNRUGGABLE"),
    en.proto3.util.setEnumType(h, "multichain.events.v1.StarknetVenue", [
      { no: 0, name: "STARKNET_VENUE_UNSPECIFIED" },
      { no: 1, name: "STARKNET_VENUE_EKUBO" },
      { no: 2, name: "STARKNET_VENUE_NOSTRA" },
      { no: 3, name: "STARKNET_VENUE_AVNU" },
      { no: 4, name: "STARKNET_VENUE_ZERO_D_AMM" },
      { no: 5, name: "STARKNET_VENUE_LAUNCHY" },
      { no: 6, name: "STARKNET_VENUE_ASCEND" },
      { no: 7, name: "STARKNET_VENUE_STARKOVIA" },
      { no: 8, name: "STARKNET_VENUE_STARK_INDUSTRY" },
      { no: 9, name: "STARKNET_VENUE_STRKPUMP" },
      { no: 10, name: "STARKNET_VENUE_STRK_LAUNCH" },
      { no: 11, name: "STARKNET_VENUE_SLAY" },
      { no: 12, name: "STARKNET_VENUE_UNRUGGABLE" },
    ]),
    ((X = y || (t.StarknetVenueKind = y = {}))[(X.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (X[(X.CLMM = 1)] = "CLMM"),
    (X[(X.AMM = 2)] = "AMM"),
    (X[(X.AGGREGATOR = 3)] = "AGGREGATOR"),
    (X[(X.CURVE = 4)] = "CURVE"),
    (X[(X.FACTORY = 5)] = "FACTORY"),
    en.proto3.util.setEnumType(y, "multichain.events.v1.StarknetVenueKind", [
      { no: 0, name: "STARKNET_VENUE_KIND_UNSPECIFIED" },
      { no: 1, name: "STARKNET_VENUE_KIND_CLMM" },
      { no: 2, name: "STARKNET_VENUE_KIND_AMM" },
      { no: 3, name: "STARKNET_VENUE_KIND_AGGREGATOR" },
      { no: 4, name: "STARKNET_VENUE_KIND_CURVE" },
      { no: 5, name: "STARKNET_VENUE_KIND_FACTORY" },
    ]),
    (($ = k || (t.StarknetQuoteKind = k = {}))[($.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    ($[($.NATIVE_ETH = 1)] = "NATIVE_ETH"),
    ($[($.NATIVE_STRK = 2)] = "NATIVE_STRK"),
    ($[($.STABLE = 3)] = "STABLE"),
    ($[($.OTHER = 4)] = "OTHER"),
    en.proto3.util.setEnumType(k, "multichain.events.v1.StarknetQuoteKind", [
      { no: 0, name: "STARKNET_QUOTE_KIND_UNSPECIFIED" },
      { no: 1, name: "STARKNET_QUOTE_KIND_NATIVE_ETH" },
      { no: 2, name: "STARKNET_QUOTE_KIND_NATIVE_STRK" },
      { no: 3, name: "STARKNET_QUOTE_KIND_STABLE" },
      { no: 4, name: "STARKNET_QUOTE_KIND_OTHER" },
    ]),
    ((z = O || (t.StarknetAttribution = O = {}))[(z.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (z[(z.SENDER = 1)] = "SENDER"),
    (z[(z.OUTSIDE_EXECUTION = 2)] = "OUTSIDE_EXECUTION"),
    (z[(z.PAYMASTER = 3)] = "PAYMASTER"),
    (z[(z.AGGREGATOR_TAKER = 4)] = "AGGREGATOR_TAKER"),
    en.proto3.util.setEnumType(O, "multichain.events.v1.StarknetAttribution", [
      { no: 0, name: "STARKNET_ATTRIBUTION_UNSPECIFIED" },
      { no: 1, name: "STARKNET_ATTRIBUTION_SENDER" },
      { no: 2, name: "STARKNET_ATTRIBUTION_OUTSIDE_EXECUTION" },
      { no: 3, name: "STARKNET_ATTRIBUTION_PAYMASTER" },
      { no: 4, name: "STARKNET_ATTRIBUTION_AGGREGATOR_TAKER" },
    ]),
    ((Q = R || (t.StarknetTransferKind = R = {}))[(Q.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (Q[(Q.TRANSFER = 1)] = "TRANSFER"),
    (Q[(Q.MINT = 2)] = "MINT"),
    (Q[(Q.BURN = 3)] = "BURN"),
    (Q[(Q.FEE = 4)] = "FEE"),
    en.proto3.util.setEnumType(R, "multichain.events.v1.StarknetTransferKind", [
      { no: 0, name: "STARKNET_TRANSFER_KIND_UNSPECIFIED" },
      { no: 1, name: "STARKNET_TRANSFER_KIND_TRANSFER" },
      { no: 2, name: "STARKNET_TRANSFER_KIND_MINT" },
      { no: 3, name: "STARKNET_TRANSFER_KIND_BURN" },
      { no: 4, name: "STARKNET_TRANSFER_KIND_FEE" },
    ]),
    ((Z = P || (t.StarknetLaunchPhase = P = {}))[(Z.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (Z[(Z.CREATED = 1)] = "CREATED"),
    (Z[(Z.LAUNCHED = 2)] = "LAUNCHED"),
    (Z[(Z.FINALIZED = 3)] = "FINALIZED"),
    (Z[(Z.COMPLETED = 4)] = "COMPLETED"),
    (Z[(Z.GRADUATED = 5)] = "GRADUATED"),
    en.proto3.util.setEnumType(P, "multichain.events.v1.StarknetLaunchPhase", [
      { no: 0, name: "STARKNET_LAUNCH_PHASE_UNSPECIFIED" },
      { no: 1, name: "STARKNET_LAUNCH_PHASE_CREATED" },
      { no: 2, name: "STARKNET_LAUNCH_PHASE_LAUNCHED" },
      { no: 3, name: "STARKNET_LAUNCH_PHASE_FINALIZED" },
      { no: 4, name: "STARKNET_LAUNCH_PHASE_COMPLETED" },
      { no: 5, name: "STARKNET_LAUNCH_PHASE_GRADUATED" },
    ]));
  class et extends en.Message {
    constructor(e) {
      (super(), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new et().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new et().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new et().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(et, e, n);
    }
  }
  ((t.Fees = et),
    (et.runtime = en.proto3),
    (et.typeName = "multichain.events.v1.Fees"),
    (et.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "lp_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "protocol_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "creator_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "platform_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 5, name: "tx_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 6, name: "priority_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 7, name: "relayer_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 8, name: "cashback", kind: "scalar", T: 9, opt: !0 },
      { no: 9, name: "quote_transfer_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 10, name: "base_transfer_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 11, name: "base_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 12, name: "app_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 100, name: "lp_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 101, name: "protocol_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 102, name: "creator_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 103, name: "platform_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 104, name: "tx_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 105, name: "priority_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 106, name: "relayer_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 107, name: "cashback_usd", kind: "scalar", T: 9, opt: !0 },
      {
        no: 108,
        name: "quote_transfer_fee_usd",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 109, name: "base_transfer_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 110, name: "base_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 111, name: "app_fee_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "lp_fee_bps", kind: "scalar", T: 13, opt: !0 },
      { no: 201, name: "protocol_fee_bps", kind: "scalar", T: 13, opt: !0 },
      { no: 202, name: "creator_fee_bps", kind: "scalar", T: 13, opt: !0 },
      { no: 203, name: "cashback_fee_bps", kind: "scalar", T: 13, opt: !0 },
      {
        no: 204,
        name: "base_transfer_fee_bps",
        kind: "scalar",
        T: 13,
        opt: !0,
      },
      {
        no: 205,
        name: "base_transfer_fee_sink",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      {
        no: 206,
        name: "base_transfer_fee_recipient",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      {
        no: 207,
        name: "quote_transfer_fee_bps",
        kind: "scalar",
        T: 13,
        opt: !0,
      },
      { no: 208, name: "app_fee_bps", kind: "scalar", T: 13, opt: !0 },
    ])));
  class er extends en.Message {
    constructor(e) {
      (super(),
        (this.tokenAddress = ""),
        (this.preBalance = ""),
        (this.postBalance = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new er().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new er().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new er().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(er, e, n);
    }
  }
  ((t.BalanceChange = er),
    (er.runtime = en.proto3),
    (er.typeName = "multichain.events.v1.BalanceChange"),
    (er.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "token_address", kind: "scalar", T: 9 },
      { no: 2, name: "pre_balance", kind: "scalar", T: 9 },
      { no: 3, name: "post_balance", kind: "scalar", T: 9 },
    ])));
  class eo extends en.Message {
    constructor(e) {
      (super(), (this.balances = []), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eo().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eo().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eo().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eo, e, n);
    }
  }
  ((t.TraderBalances = eo),
    (eo.runtime = en.proto3),
    (eo.typeName = "multichain.events.v1.TraderBalances"),
    (eo.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "balances", kind: "message", T: er, repeated: !0 },
    ])));
  class ea extends en.Message {
    constructor(e) {
      (super(),
        (this.blockEventId = ""),
        (this.txHash = ""),
        (this.blockId = en.protoInt64.zero),
        (this.txIndex = 0),
        (this.eventIndex = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ea().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ea().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ea().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ea, e, n);
    }
  }
  ((t.EventIdentity = ea),
    (ea.runtime = en.proto3),
    (ea.typeName = "multichain.events.v1.EventIdentity"),
    (ea.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "block_event_id", kind: "scalar", T: 9 },
      { no: 2, name: "tx_hash", kind: "scalar", T: 9 },
      { no: 3, name: "block_id", kind: "scalar", T: 4 },
      { no: 4, name: "tx_index", kind: "scalar", T: 13 },
      { no: 5, name: "event_index", kind: "scalar", T: 13 },
      { no: 6, name: "source", kind: "scalar", T: 9, opt: !0 },
    ])));
  class es extends en.Message {
    constructor(e) {
      (super(),
        (this.bondingCurveAddress = ""),
        (this.virtualQuoteReserves = en.protoInt64.zero),
        (this.virtualBaseReserves = en.protoInt64.zero),
        (this.realQuoteReserves = en.protoInt64.zero),
        (this.realBaseReserves = en.protoInt64.zero),
        (this.virtualQuoteReservesRaw = ""),
        (this.virtualBaseReservesRaw = ""),
        (this.progressBps = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new es().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new es().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new es().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(es, e, n);
    }
  }
  ((t.BondingCurveState = es),
    (es.runtime = en.proto3),
    (es.typeName = "multichain.events.v1.BondingCurveState"),
    (es.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "bonding_curve_address", kind: "scalar", T: 9 },
      { no: 2, name: "virtual_quote_reserves", kind: "scalar", T: 4 },
      { no: 3, name: "virtual_base_reserves", kind: "scalar", T: 4 },
      { no: 4, name: "real_quote_reserves", kind: "scalar", T: 4 },
      { no: 5, name: "real_base_reserves", kind: "scalar", T: 4 },
      { no: 6, name: "virtual_quote_reserves_raw", kind: "scalar", T: 9 },
      { no: 7, name: "virtual_base_reserves_raw", kind: "scalar", T: 9 },
      { no: 8, name: "progress_bps", kind: "scalar", T: 13 },
    ])));
  class ei extends en.Message {
    constructor(e) {
      (super(),
        (this.reserveBase = ""),
        (this.reserveQuote = ""),
        (this.liquidityType = s.UNSPECIFIED),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ei().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ei().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ei().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ei, e, n);
    }
  }
  ((t.PoolLiquidity = ei),
    (ei.runtime = en.proto3),
    (ei.typeName = "multichain.events.v1.PoolLiquidity"),
    (ei.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "reserve_base", kind: "scalar", T: 9 },
      { no: 2, name: "reserve_quote", kind: "scalar", T: 9 },
      { no: 3, name: "reserve_base_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "reserve_quote_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 5, name: "liquidity_usd", kind: "scalar", T: 9, opt: !0 },
      {
        no: 6,
        name: "liquidity_type",
        kind: "enum",
        T: en.proto3.getEnumType(s),
      },
    ])));
  class em extends en.Message {
    constructor(e) {
      (super(), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new em().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new em().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new em().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(em, e, n);
    }
  }
  ((t.EvmTradeData = em),
    (em.runtime = en.proto3),
    (em.typeName = "multichain.events.v1.EvmTradeData"),
    (em.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "gas_used", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "gas_price", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "effective_gas_price", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "tx_sender", kind: "scalar", T: 9, opt: !0 },
      { no: 5, name: "tx_to", kind: "scalar", T: 9, opt: !0 },
      { no: 6, name: "pool_caller", kind: "scalar", T: 9, opt: !0 },
      { no: 7, name: "via_relay", kind: "scalar", T: 8, opt: !0 },
    ])));
  class el extends en.Message {
    constructor(e) {
      (super(),
        (this.tokenAddress = ""),
        (this.chainFamily = r.UNSPECIFIED),
        (this.chainId = ""),
        (this.event = { case: void 0 }),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new el().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new el().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new el().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(el, e, n);
    }
  }
  ((t.MultiChainEvent = el),
    (el.runtime = en.proto3),
    (el.typeName = "multichain.events.v1.MultiChainEvent"),
    (el.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "token_address", kind: "scalar", T: 9 },
      {
        no: 2,
        name: "chain_family",
        kind: "enum",
        T: en.proto3.getEnumType(r),
      },
      { no: 3, name: "chain_id", kind: "scalar", T: 9 },
      { no: 4, name: "block_timestamp", kind: "message", T: en.Timestamp },
      { no: 5, name: "produced_at", kind: "message", T: en.Timestamp },
      { no: 6, name: "identity", kind: "message", T: ea },
      { no: 7, name: "surface", kind: "scalar", T: 9, opt: !0 },
      { no: 8, name: "surface_attribution", kind: "scalar", T: 9, opt: !0 },
      {
        no: 100,
        name: "coin_creation",
        kind: "message",
        T: eu,
        oneof: "event",
      },
      { no: 101, name: "trade", kind: "message", T: eT, oneof: "event" },
      {
        no: 102,
        name: "pool_creation",
        kind: "message",
        T: ec,
        oneof: "event",
      },
      { no: 103, name: "liquidity", kind: "message", T: eE, oneof: "event" },
      { no: 104, name: "transfer", kind: "message", T: ef, oneof: "event" },
      { no: 105, name: "swap_revert", kind: "message", T: e_, oneof: "event" },
      { no: 106, name: "perp_fill", kind: "message", T: eg, oneof: "event" },
      { no: 107, name: "ton_trade", kind: "message", T: eO, oneof: "event" },
      { no: 108, name: "ton_pool", kind: "message", T: eR, oneof: "event" },
      { no: 109, name: "ton_launch", kind: "message", T: eA, oneof: "event" },
      {
        no: 110,
        name: "ton_graduation",
        kind: "message",
        T: eD,
        oneof: "event",
      },
      {
        no: 111,
        name: "ton_jetton_metadata",
        kind: "message",
        T: eP,
        oneof: "event",
      },
      {
        no: 112,
        name: "ton_trace_failed",
        kind: "message",
        T: eC,
        oneof: "event",
      },
      { no: 113, name: "near_trade", kind: "message", T: ev, oneof: "event" },
      {
        no: 114,
        name: "near_pool_created",
        kind: "message",
        T: eM,
        oneof: "event",
      },
      { no: 115, name: "near_launch", kind: "message", T: eJ, oneof: "event" },
      {
        no: 116,
        name: "near_liquidity",
        kind: "message",
        T: eb,
        oneof: "event",
      },
      {
        no: 117,
        name: "near_transfer",
        kind: "message",
        T: eB,
        oneof: "event",
      },
      {
        no: 118,
        name: "near_trace_failed",
        kind: "message",
        T: eq,
        oneof: "event",
      },
      {
        no: 120,
        name: "starknet_trade",
        kind: "message",
        T: eH,
        oneof: "event",
      },
      {
        no: 121,
        name: "starknet_pool",
        kind: "message",
        T: eW,
        oneof: "event",
      },
      {
        no: 122,
        name: "starknet_launch",
        kind: "message",
        T: ej,
        oneof: "event",
      },
      {
        no: 123,
        name: "starknet_liquidity",
        kind: "message",
        T: eX,
        oneof: "event",
      },
      {
        no: 124,
        name: "starknet_transfer",
        kind: "message",
        T: e$,
        oneof: "event",
      },
      {
        no: 125,
        name: "starknet_revoke",
        kind: "message",
        T: ez,
        oneof: "event",
      },
      {
        no: 126,
        name: "starknet_graduation",
        kind: "message",
        T: eQ,
        oneof: "event",
      },
    ])));
  class eu extends en.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.protocol = o.UNSPECIFIED),
        (this.chainData = { case: void 0 }),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eu().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eu().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eu().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eu, e, n);
    }
  }
  ((t.MultiChainCoinCreationEvent = eu),
    (eu.runtime = en.proto3),
    (eu.typeName = "multichain.events.v1.MultiChainCoinCreationEvent"),
    (eu.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "address", kind: "scalar", T: 9 },
      { no: 101, name: "protocol", kind: "enum", T: en.proto3.getEnumType(o) },
      { no: 102, name: "platform", kind: "scalar", T: 9, opt: !0 },
      { no: 103, name: "program", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 201, name: "symbol", kind: "scalar", T: 9, opt: !0 },
      { no: 202, name: "description", kind: "scalar", T: 9, opt: !0 },
      { no: 203, name: "metadata_uri", kind: "scalar", T: 9, opt: !0 },
      { no: 204, name: "image_uri", kind: "scalar", T: 9, opt: !0 },
      { no: 205, name: "creator_address", kind: "scalar", T: 9, opt: !0 },
      { no: 206, name: "token_standard", kind: "scalar", T: 9, opt: !0 },
      { no: 300, name: "base_decimals", kind: "scalar", T: 13, opt: !0 },
      {
        no: 301,
        name: "initial_supply_total_raw",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 310, name: "quote_address", kind: "scalar", T: 9, opt: !0 },
      { no: 311, name: "quote_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 320, name: "market_cap_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 321, name: "initial_liquidity_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 400, name: "initialized", kind: "scalar", T: 8, opt: !0 },
      { no: 401, name: "complete", kind: "scalar", T: 8, opt: !0 },
      { no: 402, name: "signer", kind: "scalar", T: 9, opt: !0 },
      { no: 500, name: "mint_authority", kind: "scalar", T: 9, opt: !0 },
      { no: 501, name: "freeze_authority", kind: "scalar", T: 9, opt: !0 },
      { no: 502, name: "mintable", kind: "scalar", T: 8, opt: !0 },
      { no: 600, name: "is_cashback_enabled", kind: "scalar", T: 8, opt: !0 },
      { no: 601, name: "tokenized_agent", kind: "scalar", T: 8, opt: !0 },
      { no: 602, name: "mayhem_state", kind: "scalar", T: 9, opt: !0 },
      { no: 603, name: "is_holder_reward", kind: "scalar", T: 8, opt: !0 },
      { no: 700, name: "bonding_curve", kind: "message", T: es, opt: !0 },
      { no: 800, name: "svm", kind: "message", T: ed, oneof: "chain_data" },
      { no: 801, name: "evm", kind: "message", T: ep, oneof: "chain_data" },
      { no: 802, name: "owner_address", kind: "scalar", T: 9, opt: !0 },
      { no: 900, name: "is_backfill", kind: "scalar", T: 8, opt: !0 },
    ])));
  class ed extends en.Message {
    constructor(e) {
      (super(), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ed().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ed().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ed().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ed, e, n);
    }
  }
  ((t.SvmCoinCreationData = ed),
    (ed.runtime = en.proto3),
    (ed.typeName = "multichain.events.v1.SvmCoinCreationData"),
    (ed.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "token_program", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "quote_token_program", kind: "scalar", T: 9, opt: !0 },
    ])));
  class ep extends en.Message {
    constructor(e) {
      (super(), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ep().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ep().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ep().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ep, e, n);
    }
  }
  ((t.EvmCoinCreationData = ep),
    (ep.runtime = en.proto3),
    (ep.typeName = "multichain.events.v1.EvmCoinCreationData"),
    (ep.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "tax_fee_bps", kind: "scalar", T: 13, opt: !0 },
    ])));
  class ec extends en.Message {
    constructor(e) {
      (super(),
        (this.poolAddress = ""),
        (this.tokenAddress = ""),
        (this.protocol = o.UNSPECIFIED),
        (this.quoteAddress = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ec().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ec().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ec().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ec, e, n);
    }
  }
  ((t.MultiChainPoolCreationEvent = ec),
    (ec.runtime = en.proto3),
    (ec.typeName = "multichain.events.v1.MultiChainPoolCreationEvent"),
    (ec.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "pool_address", kind: "scalar", T: 9 },
      { no: 101, name: "token_address", kind: "scalar", T: 9 },
      { no: 102, name: "protocol", kind: "enum", T: en.proto3.getEnumType(o) },
      { no: 103, name: "platform", kind: "scalar", T: 9, opt: !0 },
      { no: 104, name: "program", kind: "scalar", T: 9, opt: !0 },
      { no: 105, name: "creator", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "base_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 201, name: "quote_address", kind: "scalar", T: 9 },
      { no: 202, name: "quote_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 203, name: "quote_token_program", kind: "scalar", T: 9, opt: !0 },
      { no: 300, name: "is_canonical", kind: "scalar", T: 8, opt: !0 },
      { no: 301, name: "is_bonding_curve", kind: "scalar", T: 8, opt: !0 },
      { no: 302, name: "is_holder_reward", kind: "scalar", T: 8, opt: !0 },
      { no: 400, name: "pair_fee_bps", kind: "scalar", T: 13, opt: !0 },
      { no: 401, name: "tick_spacing", kind: "scalar", T: 5, opt: !0 },
      { no: 500, name: "base_reserves", kind: "scalar", T: 9, opt: !0 },
      { no: 501, name: "quote_reserves", kind: "scalar", T: 9, opt: !0 },
      { no: 502, name: "liquidity_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 600, name: "bonding_curve", kind: "message", T: es, opt: !0 },
      {
        no: 700,
        name: "associated_bonding_curve",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 701, name: "pool_bump", kind: "scalar", T: 13, opt: !0 },
      { no: 702, name: "pool_index", kind: "scalar", T: 13, opt: !0 },
      { no: 800, name: "fee", kind: "scalar", T: 13, opt: !0 },
      { no: 801, name: "hook_address", kind: "scalar", T: 9, opt: !0 },
      { no: 802, name: "currency0", kind: "scalar", T: 9, opt: !0 },
      { no: 803, name: "currency1", kind: "scalar", T: 9, opt: !0 },
      { no: 804, name: "pool_id", kind: "scalar", T: 9, opt: !0 },
      { no: 805, name: "pool_manager", kind: "scalar", T: 9, opt: !0 },
    ])));
  class eT extends en.Message {
    constructor(e) {
      (super(),
        (this.type = a.UNSPECIFIED),
        (this.protocol = o.UNSPECIFIED),
        (this.baseAddress = ""),
        (this.quoteAddress = ""),
        (this.poolAddress = ""),
        (this.userAddress = ""),
        (this.baseAmount = ""),
        (this.quoteAmount = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eT().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eT().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eT().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eT, e, n);
    }
  }
  ((t.MultiChainTradeEvent = eT),
    (eT.runtime = en.proto3),
    (eT.typeName = "multichain.events.v1.MultiChainTradeEvent"),
    (eT.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "type", kind: "enum", T: en.proto3.getEnumType(a) },
      { no: 101, name: "protocol", kind: "enum", T: en.proto3.getEnumType(o) },
      { no: 102, name: "platform", kind: "scalar", T: 9, opt: !0 },
      { no: 103, name: "is_bundle", kind: "scalar", T: 8, opt: !0 },
      { no: 104, name: "relayer", kind: "scalar", T: 9, opt: !0 },
      { no: 105, name: "relay_order_id", kind: "scalar", T: 9, opt: !0 },
      { no: 106, name: "tx_close", kind: "scalar", T: 8, opt: !0 },
      { no: 200, name: "base_address", kind: "scalar", T: 9 },
      { no: 201, name: "quote_address", kind: "scalar", T: 9 },
      { no: 202, name: "pool_address", kind: "scalar", T: 9 },
      { no: 203, name: "user_address", kind: "scalar", T: 9 },
      { no: 204, name: "creator_address", kind: "scalar", T: 9, opt: !0 },
      { no: 205, name: "trader_address", kind: "scalar", T: 9, opt: !0 },
      { no: 300, name: "base_amount", kind: "scalar", T: 9 },
      { no: 301, name: "quote_amount", kind: "scalar", T: 9 },
      { no: 302, name: "base_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 303, name: "quote_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 304, name: "quote_token_program", kind: "scalar", T: 9, opt: !0 },
      { no: 400, name: "price_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 401, name: "price_native", kind: "scalar", T: 9, opt: !0 },
      { no: 402, name: "price_base_per_quote", kind: "scalar", T: 9, opt: !0 },
      { no: 403, name: "price_quote_per_base", kind: "scalar", T: 9, opt: !0 },
      { no: 404, name: "native_price_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 405, name: "amount_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 406, name: "amount_native", kind: "scalar", T: 9, opt: !0 },
      { no: 407, name: "market_cap_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 408, name: "market_cap_native", kind: "scalar", T: 9, opt: !0 },
      { no: 409, name: "pool_price_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 410, name: "mark_parked", kind: "scalar", T: 8, opt: !0 },
      { no: 411, name: "total_supply_raw", kind: "scalar", T: 9, opt: !0 },
      {
        no: 412,
        name: "circulating_supply_raw",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      {
        no: 413,
        name: "supply_last_changed_at_ms",
        kind: "scalar",
        T: 3,
        opt: !0,
      },
      { no: 500, name: "fees", kind: "message", T: et, opt: !0 },
      { no: 600, name: "balances", kind: "message", T: eo, opt: !0 },
      { no: 702, name: "pool", kind: "message", T: ei, opt: !0 },
      { no: 710, name: "is_bonding_curve", kind: "scalar", T: 8, opt: !0 },
      { no: 711, name: "bonding_curve", kind: "message", T: es, opt: !0 },
      { no: 712, name: "canonical_class", kind: "scalar", T: 9, opt: !0 },
      { no: 713, name: "app", kind: "scalar", T: 9, opt: !0 },
      { no: 714, name: "app_attribution", kind: "scalar", T: 9, opt: !0 },
      { no: 800, name: "evm", kind: "message", T: em, opt: !0 },
    ])));
  class eE extends en.Message {
    constructor(e) {
      (super(),
        (this.type = i.UNSPECIFIED),
        (this.protocol = o.UNSPECIFIED),
        (this.baseAddress = ""),
        (this.quoteAddress = ""),
        (this.poolAddress = ""),
        (this.baseAmount = ""),
        (this.quoteAmount = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eE().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eE().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eE().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eE, e, n);
    }
  }
  ((t.MultiChainLiquidityEvent = eE),
    (eE.runtime = en.proto3),
    (eE.typeName = "multichain.events.v1.MultiChainLiquidityEvent"),
    (eE.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "type", kind: "enum", T: en.proto3.getEnumType(i) },
      { no: 101, name: "protocol", kind: "enum", T: en.proto3.getEnumType(o) },
      { no: 102, name: "platform", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "base_address", kind: "scalar", T: 9 },
      { no: 201, name: "quote_address", kind: "scalar", T: 9 },
      { no: 202, name: "pool_address", kind: "scalar", T: 9 },
      { no: 203, name: "provider_address", kind: "scalar", T: 9, opt: !0 },
      { no: 300, name: "base_amount", kind: "scalar", T: 9 },
      { no: 301, name: "quote_amount", kind: "scalar", T: 9 },
      { no: 302, name: "base_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 303, name: "quote_decimals", kind: "scalar", T: 13, opt: !0 },
      { no: 400, name: "amount_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 401, name: "native_price_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 402, name: "price_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 403, name: "price_native", kind: "scalar", T: 9, opt: !0 },
      { no: 404, name: "market_cap_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 405, name: "market_cap_native", kind: "scalar", T: 9, opt: !0 },
      { no: 406, name: "mark_parked", kind: "scalar", T: 8, opt: !0 },
      { no: 407, name: "total_supply_raw", kind: "scalar", T: 9, opt: !0 },
      {
        no: 408,
        name: "circulating_supply_raw",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 700, name: "pool", kind: "message", T: ei, opt: !0 },
      { no: 800, name: "evm", kind: "message", T: em, opt: !0 },
    ])));
  class ef extends en.Message {
    constructor(e) {
      (super(),
        (this.senderWallet = ""),
        (this.receiverWallet = ""),
        (this.transferAmount = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ef().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ef().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ef().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ef, e, n);
    }
  }
  ((t.MultiChainTransferEvent = ef),
    (ef.runtime = en.proto3),
    (ef.typeName = "multichain.events.v1.MultiChainTransferEvent"),
    (ef.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "sender_wallet", kind: "scalar", T: 9 },
      {
        no: 101,
        name: "sender_wallet_sol_balance",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 102, name: "sender_balance_prior", kind: "scalar", T: 9, opt: !0 },
      { no: 103, name: "sender_balance_after", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "receiver_wallet", kind: "scalar", T: 9 },
      {
        no: 201,
        name: "receiver_wallet_sol_balance",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      {
        no: 202,
        name: "receiver_balance_prior",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      {
        no: 203,
        name: "receiver_balance_after",
        kind: "scalar",
        T: 9,
        opt: !0,
      },
      { no: 300, name: "transfer_amount", kind: "scalar", T: 9 },
    ])));
  class e_ extends en.Message {
    constructor(e) {
      (super(),
        (this.txSender = ""),
        (this.txTo = ""),
        (this.tokenAddresses = []),
        (this.poolAddresses = []),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new e_().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new e_().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new e_().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(e_, e, n);
    }
  }
  ((t.MultiChainSwapRevertEvent = e_),
    (e_.runtime = en.proto3),
    (e_.typeName = "multichain.events.v1.MultiChainSwapRevertEvent"),
    (e_.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "tx_sender", kind: "scalar", T: 9 },
      { no: 101, name: "tx_to", kind: "scalar", T: 9 },
      { no: 102, name: "tx_value", kind: "scalar", T: 9, opt: !0 },
      { no: 103, name: "call_selector", kind: "scalar", T: 9, opt: !0 },
      { no: 104, name: "gas_used", kind: "scalar", T: 9, opt: !0 },
      { no: 105, name: "call_data", kind: "scalar", T: 9, opt: !0 },
      { no: 200, name: "token_addresses", kind: "scalar", T: 9, repeated: !0 },
      { no: 201, name: "pool_addresses", kind: "scalar", T: 9, repeated: !0 },
      { no: 300, name: "revert_source", kind: "scalar", T: 9, opt: !0 },
      { no: 301, name: "replay_block", kind: "scalar", T: 4, opt: !0 },
      { no: 302, name: "replay_outcome", kind: "scalar", T: 9, opt: !0 },
      { no: 303, name: "revert_selector", kind: "scalar", T: 9, opt: !0 },
      { no: 304, name: "revert_data", kind: "scalar", T: 9, opt: !0 },
      { no: 305, name: "revert_reason", kind: "scalar", T: 9, opt: !0 },
    ])));
  class eg extends en.Message {
    constructor(e) {
      (super(),
        (this.type = a.UNSPECIFIED),
        (this.protocol = o.UNSPECIFIED),
        (this.direction = A.UNSPECIFIED),
        (this.coin = ""),
        (this.crossed = !1),
        (this.userAddress = ""),
        (this.size = ""),
        (this.startPosition = ""),
        (this.closedPnl = ""),
        (this.fee = ""),
        (this.feeToken = ""),
        (this.price = ""),
        (this.tid = en.protoInt64.zero),
        (this.oid = en.protoInt64.zero),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eg().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eg().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eg().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eg, e, n);
    }
  }
  ((t.MultiChainPerpFillEvent = eg),
    (eg.runtime = en.proto3),
    (eg.typeName = "multichain.events.v1.MultiChainPerpFillEvent"),
    (eg.fields = en.proto3.util.newFieldList(() => [
      { no: 100, name: "type", kind: "enum", T: en.proto3.getEnumType(a) },
      { no: 101, name: "protocol", kind: "enum", T: en.proto3.getEnumType(o) },
      { no: 102, name: "direction", kind: "enum", T: en.proto3.getEnumType(A) },
      { no: 103, name: "coin", kind: "scalar", T: 9 },
      { no: 104, name: "dex", kind: "scalar", T: 9, opt: !0 },
      { no: 105, name: "crossed", kind: "scalar", T: 8 },
      { no: 106, name: "image_url", kind: "scalar", T: 9, opt: !0 },
      { no: 107, name: "leverage", kind: "scalar", T: 9, opt: !0 },
      { no: 108, name: "entry_px", kind: "scalar", T: 9, opt: !0 },
      { no: 109, name: "is_cross", kind: "scalar", T: 8, opt: !0 },
      { no: 200, name: "user_address", kind: "scalar", T: 9 },
      { no: 201, name: "builder_address", kind: "scalar", T: 9, opt: !0 },
      { no: 202, name: "pump_origin", kind: "scalar", T: 8, opt: !0 },
      { no: 300, name: "size", kind: "scalar", T: 9 },
      { no: 301, name: "start_position", kind: "scalar", T: 9 },
      { no: 302, name: "closed_pnl", kind: "scalar", T: 9 },
      { no: 303, name: "fee", kind: "scalar", T: 9 },
      { no: 304, name: "fee_token", kind: "scalar", T: 9 },
      { no: 305, name: "builder_fee", kind: "scalar", T: 9, opt: !0 },
      { no: 400, name: "price", kind: "scalar", T: 9 },
      { no: 401, name: "notional_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 500, name: "tid", kind: "scalar", T: 4 },
      { no: 501, name: "oid", kind: "scalar", T: 4 },
      { no: 502, name: "cloid", kind: "scalar", T: 9, opt: !0 },
      { no: 503, name: "twap_id", kind: "scalar", T: 4, opt: !0 },
      { no: 600, name: "liquidation", kind: "message", T: eS, opt: !0 },
    ])),
    ((ee = A || (t.MultiChainPerpFillEvent_Direction = A = {}))[
      (ee.UNSPECIFIED = 0)
    ] = "UNSPECIFIED"),
    (ee[(ee.OPEN_LONG = 1)] = "OPEN_LONG"),
    (ee[(ee.CLOSE_LONG = 2)] = "CLOSE_LONG"),
    (ee[(ee.OPEN_SHORT = 3)] = "OPEN_SHORT"),
    (ee[(ee.CLOSE_SHORT = 4)] = "CLOSE_SHORT"),
    (ee[(ee.FLIP_TO_SHORT = 5)] = "FLIP_TO_SHORT"),
    (ee[(ee.FLIP_TO_LONG = 6)] = "FLIP_TO_LONG"),
    en.proto3.util.setEnumType(
      A,
      "multichain.events.v1.MultiChainPerpFillEvent.Direction",
      [
        { no: 0, name: "DIRECTION_UNSPECIFIED" },
        { no: 1, name: "DIRECTION_OPEN_LONG" },
        { no: 2, name: "DIRECTION_CLOSE_LONG" },
        { no: 3, name: "DIRECTION_OPEN_SHORT" },
        { no: 4, name: "DIRECTION_CLOSE_SHORT" },
        { no: 5, name: "DIRECTION_FLIP_TO_SHORT" },
        { no: 6, name: "DIRECTION_FLIP_TO_LONG" },
      ],
    ));
  class eS extends en.Message {
    constructor(e) {
      (super(),
        (this.liquidatedUser = ""),
        (this.markPx = ""),
        (this.method = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eS().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eS().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eS().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eS, e, n);
    }
  }
  ((t.MultiChainPerpFillEvent_Liquidation = eS),
    (eS.runtime = en.proto3),
    (eS.typeName = "multichain.events.v1.MultiChainPerpFillEvent.Liquidation"),
    (eS.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "liquidated_user", kind: "scalar", T: 9 },
      { no: 2, name: "mark_px", kind: "scalar", T: 9 },
      { no: 3, name: "method", kind: "scalar", T: 9 },
    ])));
  class eN extends en.Message {
    constructor(e) {
      (super(),
        (this.workchain = 0),
        (this.account = new Uint8Array(0)),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eN().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eN().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eN().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eN, e, n);
    }
  }
  ((t.TonAddress = eN),
    (eN.runtime = en.proto3),
    (eN.typeName = "multichain.events.v1.TonAddress"),
    (eN.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "workchain", kind: "scalar", T: 5 },
      { no: 2, name: "account", kind: "scalar", T: 12 },
    ])));
  class eI extends en.Message {
    constructor(e) {
      (super(),
        (this.raw = ""),
        (this.decimals = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eI().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eI().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eI().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eI, e, n);
    }
  }
  ((t.TonAmount = eI),
    (eI.runtime = en.proto3),
    (eI.typeName = "multichain.events.v1.TonAmount"),
    (eI.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "raw", kind: "scalar", T: 9 },
      { no: 2, name: "decimals", kind: "scalar", T: 13 },
    ])));
  class eh extends en.Message {
    constructor(e) {
      (super(), (this.value = ""), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eh().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eh().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eh().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eh, e, n);
    }
  }
  ((t.TonUsd = eh),
    (eh.runtime = en.proto3),
    (eh.typeName = "multichain.events.v1.TonUsd"),
    (eh.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 9 },
    ])));
  class ey extends en.Message {
    constructor(e) {
      (super(),
        (this.lt = en.protoInt64.zero),
        (this.outIdx = 0),
        (this.txHash = new Uint8Array(0)),
        (this.traceId = new Uint8Array(0)),
        (this.mcSeqno = 0),
        (this.workchain = 0),
        (this.shard = en.protoInt64.zero),
        (this.seqno = 0),
        (this.hop = 0),
        (this.source = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ey().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ey().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ey().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ey, e, n);
    }
  }
  ((t.TonIdentity = ey),
    (ey.runtime = en.proto3),
    (ey.typeName = "multichain.events.v1.TonIdentity"),
    (ey.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "pool", kind: "message", T: eN },
      { no: 2, name: "lt", kind: "scalar", T: 4 },
      { no: 3, name: "out_idx", kind: "scalar", T: 13 },
      { no: 4, name: "tx_hash", kind: "scalar", T: 12 },
      { no: 5, name: "trace_id", kind: "scalar", T: 12 },
      { no: 6, name: "mc_seqno", kind: "scalar", T: 13 },
      { no: 7, name: "workchain", kind: "scalar", T: 5 },
      { no: 8, name: "shard", kind: "scalar", T: 16 },
      { no: 9, name: "seqno", kind: "scalar", T: 13 },
      { no: 10, name: "block_time", kind: "message", T: en.Timestamp },
      { no: 11, name: "hop", kind: "scalar", T: 13 },
      { no: 12, name: "source", kind: "scalar", T: 9 },
    ])));
  class ek extends en.Message {
    constructor(e) {
      (super(), (this.progressBps = 0), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ek().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ek().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ek().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ek, e, n);
    }
  }
  ((t.TonCurveState = ek),
    (ek.runtime = en.proto3),
    (ek.typeName = "multichain.events.v1.TonCurveState"),
    (ek.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "current_supply", kind: "message", T: eI },
      { no: 2, name: "raised_native", kind: "message", T: eI },
      { no: 3, name: "target_native", kind: "message", T: eI },
      { no: 4, name: "progress_bps", kind: "scalar", T: 13 },
    ])));
  class eO extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = m.UNSPECIFIED),
        (this.side = a.UNSPECIFIED),
        (this.quoteKind = u.UNSPECIFIED),
        (this.priceNative = ""),
        (this.feeNanoton = en.protoInt64.zero),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eO().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eO().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eO().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eO, e, n);
    }
  }
  ((t.MultiChainTonTradeEvent = eO),
    (eO.runtime = en.proto3),
    (eO.typeName = "multichain.events.v1.MultiChainTonTradeEvent"),
    (eO.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: ey },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 3, name: "jetton", kind: "message", T: eN },
      { no: 4, name: "user", kind: "message", T: eN },
      { no: 5, name: "side", kind: "enum", T: en.proto3.getEnumType(a) },
      { no: 6, name: "base_amount", kind: "message", T: eI },
      { no: 7, name: "quote_amount", kind: "message", T: eI },
      { no: 8, name: "quote_kind", kind: "enum", T: en.proto3.getEnumType(u) },
      { no: 9, name: "quote_jetton", kind: "message", T: eN },
      { no: 10, name: "price_native", kind: "scalar", T: 9 },
      { no: 11, name: "price_usd", kind: "message", T: eh },
      { no: 12, name: "reserve_base", kind: "message", T: eI },
      { no: 13, name: "reserve_quote", kind: "message", T: eI },
      { no: 14, name: "fee_nanoton", kind: "scalar", T: 4 },
      { no: 15, name: "aggregator", kind: "message", T: eN },
      { no: 16, name: "referral", kind: "message", T: eN },
      { no: 17, name: "curve", kind: "message", T: ek },
    ])));
  class eR extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = m.UNSPECIFIED),
        (this.kind = l.UNSPECIFIED),
        (this.quoteKind = u.UNSPECIFIED),
        (this.codeHash = new Uint8Array(0)),
        (this.feeBps = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eR().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eR().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eR().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eR, e, n);
    }
  }
  ((t.MultiChainTonPoolEvent = eR),
    (eR.runtime = en.proto3),
    (eR.typeName = "multichain.events.v1.MultiChainTonPoolEvent"),
    (eR.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: ey },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 3, name: "pool", kind: "message", T: eN },
      { no: 4, name: "kind", kind: "enum", T: en.proto3.getEnumType(l) },
      { no: 5, name: "base_jetton", kind: "message", T: eN },
      { no: 6, name: "quote_jetton", kind: "message", T: eN },
      { no: 7, name: "quote_kind", kind: "enum", T: en.proto3.getEnumType(u) },
      { no: 8, name: "code_hash", kind: "scalar", T: 12 },
      { no: 9, name: "parent", kind: "message", T: eN },
      { no: 10, name: "fee_bps", kind: "scalar", T: 13 },
      { no: 11, name: "graduated_from", kind: "message", T: eN },
    ])));
  class eP extends en.Message {
    constructor(e) {
      (super(),
        (this.codeHash = new Uint8Array(0)),
        (this.decimals = 0),
        (this.symbol = ""),
        (this.name = ""),
        (this.imageUri = ""),
        (this.description = ""),
        (this.kind = d.UNSPECIFIED),
        (this.metadataUri = ""),
        (this.totalSupply = ""),
        (this.mintable = !1),
        (this.mintless = !1),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eP().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eP().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eP().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eP, e, n);
    }
  }
  ((t.MultiChainTonJettonMetadataEvent = eP),
    (eP.runtime = en.proto3),
    (eP.typeName = "multichain.events.v1.MultiChainTonJettonMetadataEvent"),
    (eP.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "jetton", kind: "message", T: eN },
      { no: 2, name: "code_hash", kind: "scalar", T: 12 },
      { no: 3, name: "decimals", kind: "scalar", T: 13 },
      { no: 4, name: "symbol", kind: "scalar", T: 9 },
      { no: 5, name: "name", kind: "scalar", T: 9 },
      { no: 6, name: "image_uri", kind: "scalar", T: 9 },
      { no: 7, name: "description", kind: "scalar", T: 9 },
      { no: 8, name: "kind", kind: "enum", T: en.proto3.getEnumType(d) },
      { no: 9, name: "metadata_uri", kind: "scalar", T: 9 },
      { no: 10, name: "total_supply", kind: "scalar", T: 9 },
      { no: 11, name: "mintable", kind: "scalar", T: 8 },
      { no: 12, name: "mintless", kind: "scalar", T: 8 },
      { no: 13, name: "admin", kind: "message", T: eN },
      { no: 14, name: "fetched_at", kind: "message", T: en.Timestamp },
    ])));
  class eA extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = m.UNSPECIFIED),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eA().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eA().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eA().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eA, e, n);
    }
  }
  ((t.MultiChainTonLaunchEvent = eA),
    (eA.runtime = en.proto3),
    (eA.typeName = "multichain.events.v1.MultiChainTonLaunchEvent"),
    (eA.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: ey },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 3, name: "jetton", kind: "message", T: eN },
      { no: 4, name: "creator", kind: "message", T: eN },
      { no: 5, name: "curve", kind: "message", T: eN },
      { no: 6, name: "metadata", kind: "message", T: eP },
      { no: 7, name: "curve_state", kind: "message", T: ek },
    ])));
  class eD extends en.Message {
    constructor(e) {
      (super(),
        (this.fromVenue = m.UNSPECIFIED),
        (this.toVenue = m.UNSPECIFIED),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eD().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eD().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eD().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eD, e, n);
    }
  }
  ((t.MultiChainTonGraduationEvent = eD),
    (eD.runtime = en.proto3),
    (eD.typeName = "multichain.events.v1.MultiChainTonGraduationEvent"),
    (eD.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: ey },
      { no: 2, name: "from_venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 3, name: "to_venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 4, name: "jetton", kind: "message", T: eN },
      { no: 5, name: "curve", kind: "message", T: eN },
      { no: 6, name: "pool", kind: "message", T: eN },
      { no: 7, name: "raised_native", kind: "message", T: eI },
    ])));
  class eC extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = m.UNSPECIFIED),
        (this.reason = p.UNSPECIFIED),
        (this.detail = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eC().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eC().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eC().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eC, e, n);
    }
  }
  ((t.MultiChainTonTraceFailedEvent = eC),
    (eC.runtime = en.proto3),
    (eC.typeName = "multichain.events.v1.MultiChainTonTraceFailedEvent"),
    (eC.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: ey },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(m) },
      { no: 3, name: "jetton", kind: "message", T: eN },
      { no: 4, name: "user", kind: "message", T: eN },
      { no: 5, name: "reason", kind: "enum", T: en.proto3.getEnumType(p) },
      { no: 6, name: "detail", kind: "scalar", T: 9 },
    ])));
  class eL extends en.Message {
    constructor(e) {
      (super(),
        (this.raw = ""),
        (this.decimals = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eL().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eL().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eL().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eL, e, n);
    }
  }
  ((t.NearAmount = eL),
    (eL.runtime = en.proto3),
    (eL.typeName = "multichain.events.v1.NearAmount"),
    (eL.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "raw", kind: "scalar", T: 9 },
      { no: 2, name: "decimals", kind: "scalar", T: 13 },
    ])));
  class ew extends en.Message {
    constructor(e) {
      (super(), (this.value = ""), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ew().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ew().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ew().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ew, e, n);
    }
  }
  ((t.NearUsd = ew),
    (ew.runtime = en.proto3),
    (ew.typeName = "multichain.events.v1.NearUsd"),
    (ew.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 9 },
    ])));
  class eU extends en.Message {
    constructor(e) {
      (super(),
        (this.txHash = ""),
        (this.receiptId = new Uint8Array(0)),
        (this.blockHeight = en.protoInt64.zero),
        (this.blockHash = new Uint8Array(0)),
        (this.shardId = en.protoInt64.zero),
        (this.outcomeIndex = 0),
        (this.logIndex = 0),
        (this.signerId = ""),
        (this.predecessorId = ""),
        (this.hop = 0),
        (this.source = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eU().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eU().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eU().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eU, e, n);
    }
  }
  ((t.NearIdentity = eU),
    (eU.runtime = en.proto3),
    (eU.typeName = "multichain.events.v1.NearIdentity"),
    (eU.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "tx_hash", kind: "scalar", T: 9 },
      { no: 2, name: "receipt_id", kind: "scalar", T: 12 },
      { no: 3, name: "block_height", kind: "scalar", T: 4 },
      { no: 4, name: "block_hash", kind: "scalar", T: 12 },
      { no: 5, name: "shard_id", kind: "scalar", T: 4 },
      { no: 6, name: "outcome_index", kind: "scalar", T: 13 },
      { no: 7, name: "log_index", kind: "scalar", T: 13 },
      { no: 8, name: "block_time", kind: "message", T: en.Timestamp },
      { no: 9, name: "signer_id", kind: "scalar", T: 9 },
      { no: 10, name: "predecessor_id", kind: "scalar", T: 9 },
      { no: 11, name: "hop", kind: "scalar", T: 13 },
      { no: 12, name: "source", kind: "scalar", T: 9 },
    ])));
  class eF extends en.Message {
    constructor(e) {
      (super(), (this.account = ""), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eF().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eF().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eF().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eF, e, n);
    }
  }
  ((t.NearTokenMetadata = eF),
    (eF.runtime = en.proto3),
    (eF.typeName = "multichain.events.v1.NearTokenMetadata"),
    (eF.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "account", kind: "scalar", T: 9 },
      { no: 8, name: "fetched_at", kind: "message", T: en.Timestamp },
      { no: 9, name: "description", kind: "scalar", T: 9, opt: !0 },
      { no: 10, name: "twitter", kind: "scalar", T: 9, opt: !0 },
      { no: 11, name: "telegram", kind: "scalar", T: 9, opt: !0 },
      { no: 12, name: "website", kind: "scalar", T: 9, opt: !0 },
    ])));
  class ev extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = c.UNSPECIFIED),
        (this.pool = ""),
        (this.token = ""),
        (this.user = ""),
        (this.side = a.UNSPECIFIED),
        (this.quoteKind = E.UNSPECIFIED),
        (this.quoteToken = ""),
        (this.priceNative = ""),
        (this.feeToken = ""),
        (this.aggregator = ""),
        (this.referral = ""),
        (this.attribution = _.UNSPECIFIED),
        (this.proxy = ""),
        (this.proxyDepth = 0),
        (this.platformFlow = !1),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ev().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ev().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ev().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ev, e, n);
    }
  }
  ((t.MultiChainNearTradeEvent = ev),
    (ev.runtime = en.proto3),
    (ev.typeName = "multichain.events.v1.MultiChainNearTradeEvent"),
    (ev.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(c) },
      { no: 3, name: "pool", kind: "scalar", T: 9 },
      { no: 4, name: "token", kind: "scalar", T: 9 },
      { no: 5, name: "user", kind: "scalar", T: 9 },
      { no: 6, name: "side", kind: "enum", T: en.proto3.getEnumType(a) },
      { no: 7, name: "base_amount", kind: "message", T: eL },
      { no: 8, name: "quote_amount", kind: "message", T: eL },
      { no: 9, name: "quote_kind", kind: "enum", T: en.proto3.getEnumType(E) },
      { no: 10, name: "quote_token", kind: "scalar", T: 9 },
      { no: 11, name: "price_native", kind: "scalar", T: 9 },
      { no: 12, name: "price_usd", kind: "message", T: ew },
      { no: 13, name: "reserve_base", kind: "message", T: eL },
      { no: 14, name: "reserve_quote", kind: "message", T: eL },
      { no: 15, name: "fee", kind: "message", T: eL },
      { no: 16, name: "fee_token", kind: "scalar", T: 9 },
      { no: 17, name: "refund", kind: "message", T: eL },
      { no: 18, name: "aggregator", kind: "scalar", T: 9 },
      { no: 19, name: "referral", kind: "scalar", T: 9 },
      {
        no: 20,
        name: "attribution",
        kind: "enum",
        T: en.proto3.getEnumType(_),
      },
      { no: 21, name: "proxy", kind: "scalar", T: 9 },
      { no: 22, name: "proxy_depth", kind: "scalar", T: 13 },
      { no: 23, name: "platform_flow", kind: "scalar", T: 8 },
    ])));
  class eM extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = c.UNSPECIFIED),
        (this.pool = ""),
        (this.kind = T.UNSPECIFIED),
        (this.baseToken = ""),
        (this.quoteToken = ""),
        (this.quoteKind = E.UNSPECIFIED),
        (this.feeBps = 0),
        (this.creator = ""),
        (this.tokenAccountIds = []),
        (this.poolIndex = en.protoInt64.zero),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eM().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eM().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eM().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eM, e, n);
    }
  }
  ((t.MultiChainNearPoolCreatedEvent = eM),
    (eM.runtime = en.proto3),
    (eM.typeName = "multichain.events.v1.MultiChainNearPoolCreatedEvent"),
    (eM.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(c) },
      { no: 3, name: "pool", kind: "scalar", T: 9 },
      { no: 4, name: "kind", kind: "enum", T: en.proto3.getEnumType(T) },
      { no: 5, name: "base_token", kind: "scalar", T: 9 },
      { no: 6, name: "quote_token", kind: "scalar", T: 9 },
      { no: 7, name: "quote_kind", kind: "enum", T: en.proto3.getEnumType(E) },
      { no: 8, name: "fee_bps", kind: "scalar", T: 13 },
      { no: 9, name: "creator", kind: "scalar", T: 9 },
      { no: 10, name: "token_account_ids", kind: "scalar", T: 9, repeated: !0 },
      { no: 11, name: "pool_index", kind: "scalar", T: 4 },
      { no: 12, name: "base_metadata", kind: "message", T: eF },
      { no: 13, name: "quote_metadata", kind: "message", T: eF },
    ])));
  class eJ extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = c.UNSPECIFIED),
        (this.token = ""),
        (this.creator = ""),
        (this.factory = ""),
        (this.locker = ""),
        (this.pool = ""),
        (this.decimals = 0),
        (this.symbol = ""),
        (this.name = ""),
        (this.icon = ""),
        (this.reference = ""),
        (this.curve = g.UNSPECIFIED),
        (this.paramsJson = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eJ().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eJ().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eJ().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eJ, e, n);
    }
  }
  ((t.MultiChainNearLaunchEvent = eJ),
    (eJ.runtime = en.proto3),
    (eJ.typeName = "multichain.events.v1.MultiChainNearLaunchEvent"),
    (eJ.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(c) },
      { no: 3, name: "token", kind: "scalar", T: 9 },
      { no: 4, name: "creator", kind: "scalar", T: 9 },
      { no: 5, name: "factory", kind: "scalar", T: 9 },
      { no: 6, name: "locker", kind: "scalar", T: 9 },
      { no: 7, name: "pool", kind: "scalar", T: 9 },
      { no: 8, name: "total_supply", kind: "message", T: eL },
      { no: 9, name: "decimals", kind: "scalar", T: 13 },
      { no: 10, name: "symbol", kind: "scalar", T: 9 },
      { no: 11, name: "name", kind: "scalar", T: 9 },
      { no: 12, name: "icon", kind: "scalar", T: 9 },
      { no: 13, name: "reference", kind: "scalar", T: 9 },
      { no: 14, name: "curve", kind: "enum", T: en.proto3.getEnumType(g) },
      { no: 15, name: "params_json", kind: "scalar", T: 9 },
      { no: 16, name: "metadata", kind: "message", T: eF },
    ])));
  class eb extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = c.UNSPECIFIED),
        (this.pool = ""),
        (this.provider = ""),
        (this.kind = S.UNSPECIFIED),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eb().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eb().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eb().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eb, e, n);
    }
  }
  ((t.MultiChainNearLiquidityEvent = eb),
    (eb.runtime = en.proto3),
    (eb.typeName = "multichain.events.v1.MultiChainNearLiquidityEvent"),
    (eb.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(c) },
      { no: 3, name: "pool", kind: "scalar", T: 9 },
      { no: 4, name: "provider", kind: "scalar", T: 9 },
      { no: 5, name: "kind", kind: "enum", T: en.proto3.getEnumType(S) },
      { no: 6, name: "base_amount", kind: "message", T: eL },
      { no: 7, name: "quote_amount", kind: "message", T: eL },
      { no: 8, name: "reserve_base", kind: "message", T: eL },
      { no: 9, name: "reserve_quote", kind: "message", T: eL },
      { no: 10, name: "lp_shares", kind: "message", T: eL },
    ])));
  class eB extends en.Message {
    constructor(e) {
      (super(),
        (this.token = ""),
        (this.from = ""),
        (this.to = ""),
        (this.kind = N.UNSPECIFIED),
        (this.memo = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eB().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eB().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eB().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eB, e, n);
    }
  }
  ((t.MultiChainNearTransferEvent = eB),
    (eB.runtime = en.proto3),
    (eB.typeName = "multichain.events.v1.MultiChainNearTransferEvent"),
    (eB.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "token", kind: "scalar", T: 9 },
      { no: 3, name: "from", kind: "scalar", T: 9 },
      { no: 4, name: "to", kind: "scalar", T: 9 },
      { no: 5, name: "amount", kind: "message", T: eL },
      { no: 6, name: "kind", kind: "enum", T: en.proto3.getEnumType(N) },
      { no: 7, name: "memo", kind: "scalar", T: 9 },
    ])));
  class eq extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = c.UNSPECIFIED),
        (this.reason = f.UNSPECIFIED),
        (this.token = ""),
        (this.user = ""),
        (this.pool = ""),
        (this.detail = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eq().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eq().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eq().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eq, e, n);
    }
  }
  ((t.MultiChainNearTraceFailedEvent = eq),
    (eq.runtime = en.proto3),
    (eq.typeName = "multichain.events.v1.MultiChainNearTraceFailedEvent"),
    (eq.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eU },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(c) },
      { no: 3, name: "reason", kind: "enum", T: en.proto3.getEnumType(f) },
      { no: 4, name: "token", kind: "scalar", T: 9 },
      { no: 5, name: "user", kind: "scalar", T: 9 },
      { no: 6, name: "pool", kind: "scalar", T: 9 },
      { no: 7, name: "detail", kind: "scalar", T: 9 },
    ])));
  class ex extends en.Message {
    constructor(e) {
      (super(),
        (this.raw = ""),
        (this.decimals = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ex().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ex().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ex().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ex, e, n);
    }
  }
  ((t.StarknetAmount = ex),
    (ex.runtime = en.proto3),
    (ex.typeName = "multichain.events.v1.StarknetAmount"),
    (ex.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "raw", kind: "scalar", T: 9 },
      { no: 2, name: "decimals", kind: "scalar", T: 13 },
    ])));
  class eV extends en.Message {
    constructor(e) {
      (super(), (this.value = ""), en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eV().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eV().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eV().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eV, e, n);
    }
  }
  ((t.StarknetUsd = eV),
    (eV.runtime = en.proto3),
    (eV.typeName = "multichain.events.v1.StarknetUsd"),
    (eV.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 9 },
    ])));
  class eK extends en.Message {
    constructor(e) {
      (super(),
        (this.txHash = new Uint8Array(0)),
        (this.blockNumber = en.protoInt64.zero),
        (this.blockHash = new Uint8Array(0)),
        (this.txIndex = 0),
        (this.eventIndex = 0),
        (this.emitter = new Uint8Array(0)),
        (this.sender = new Uint8Array(0)),
        (this.user = new Uint8Array(0)),
        (this.hop = 0),
        (this.txType = I.UNSPECIFIED),
        (this.source = ""),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eK().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eK().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eK().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eK, e, n);
    }
  }
  ((t.StarknetIdentity = eK),
    (eK.runtime = en.proto3),
    (eK.typeName = "multichain.events.v1.StarknetIdentity"),
    (eK.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "tx_hash", kind: "scalar", T: 12 },
      { no: 2, name: "block_number", kind: "scalar", T: 4 },
      { no: 3, name: "block_hash", kind: "scalar", T: 12 },
      { no: 4, name: "tx_index", kind: "scalar", T: 13 },
      { no: 5, name: "event_index", kind: "scalar", T: 13 },
      { no: 6, name: "emitter", kind: "scalar", T: 12 },
      { no: 7, name: "sender", kind: "scalar", T: 12 },
      { no: 8, name: "user", kind: "scalar", T: 12 },
      { no: 9, name: "hop", kind: "scalar", T: 13 },
      { no: 10, name: "tx_type", kind: "enum", T: en.proto3.getEnumType(I) },
      { no: 11, name: "block_time", kind: "message", T: en.Timestamp },
      { no: 12, name: "source", kind: "scalar", T: 9 },
    ])));
  class eY extends en.Message {
    constructor(e) {
      (super(),
        (this.account = new Uint8Array(0)),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eY().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eY().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eY().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eY, e, n);
    }
  }
  ((t.StarknetTokenMetadata = eY),
    (eY.runtime = en.proto3),
    (eY.typeName = "multichain.events.v1.StarknetTokenMetadata"),
    (eY.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "account", kind: "scalar", T: 12 },
      { no: 8, name: "fetched_at", kind: "message", T: en.Timestamp },
      { no: 9, name: "description", kind: "scalar", T: 9, opt: !0 },
      { no: 10, name: "twitter", kind: "scalar", T: 9, opt: !0 },
      { no: 11, name: "telegram", kind: "scalar", T: 9, opt: !0 },
      { no: 12, name: "website", kind: "scalar", T: 9, opt: !0 },
    ])));
  class eG extends en.Message {
    constructor(e) {
      (super(),
        (this.curvePool = new Uint8Array(0)),
        (this.progressBps = 0),
        (this.phase = P.UNSPECIFIED),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eG().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eG().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eG().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eG, e, n);
    }
  }
  ((t.StarknetCurveState = eG),
    (eG.runtime = en.proto3),
    (eG.typeName = "multichain.events.v1.StarknetCurveState"),
    (eG.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "curve_pool", kind: "scalar", T: 12 },
      { no: 2, name: "virtual_quote", kind: "message", T: ex },
      { no: 3, name: "real_quote", kind: "message", T: ex },
      { no: 4, name: "token_reserve", kind: "message", T: ex },
      { no: 5, name: "graduation_threshold", kind: "message", T: ex },
      { no: 6, name: "progress_bps", kind: "scalar", T: 13 },
      { no: 7, name: "phase", kind: "enum", T: en.proto3.getEnumType(P) },
    ])));
  class eH extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = h.UNSPECIFIED),
        (this.pool = new Uint8Array(0)),
        (this.token = new Uint8Array(0)),
        (this.user = new Uint8Array(0)),
        (this.side = a.UNSPECIFIED),
        (this.quoteKind = k.UNSPECIFIED),
        (this.quoteToken = new Uint8Array(0)),
        (this.price = ""),
        (this.sqrtRatioAfter = ""),
        (this.tickAfter = en.protoInt64.zero),
        (this.liquidityAfter = ""),
        (this.feeToken = new Uint8Array(0)),
        (this.aggregator = h.UNSPECIFIED),
        (this.recipient = new Uint8Array(0)),
        (this.attribution = O.UNSPECIFIED),
        (this.platformFlow = !1),
        (this.parked = !1),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eH().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eH().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eH().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eH, e, n);
    }
  }
  ((t.MultiChainStarknetTradeEvent = eH),
    (eH.runtime = en.proto3),
    (eH.typeName = "multichain.events.v1.MultiChainStarknetTradeEvent"),
    (eH.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 3, name: "pool", kind: "scalar", T: 12 },
      { no: 4, name: "token", kind: "scalar", T: 12 },
      { no: 5, name: "user", kind: "scalar", T: 12 },
      { no: 6, name: "side", kind: "enum", T: en.proto3.getEnumType(a) },
      { no: 7, name: "base_amount", kind: "message", T: ex },
      { no: 8, name: "quote_amount", kind: "message", T: ex },
      { no: 9, name: "quote_kind", kind: "enum", T: en.proto3.getEnumType(k) },
      { no: 10, name: "quote_token", kind: "scalar", T: 12 },
      { no: 11, name: "price", kind: "scalar", T: 9 },
      { no: 12, name: "price_usd", kind: "message", T: eV },
      { no: 13, name: "sqrt_ratio_after", kind: "scalar", T: 9 },
      { no: 14, name: "tick_after", kind: "scalar", T: 18 },
      { no: 15, name: "liquidity_after", kind: "scalar", T: 9 },
      { no: 16, name: "reserve_base", kind: "message", T: ex },
      { no: 17, name: "reserve_quote", kind: "message", T: ex },
      { no: 18, name: "fee", kind: "message", T: ex },
      { no: 19, name: "fee_token", kind: "scalar", T: 12 },
      { no: 20, name: "aggregator", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 21, name: "recipient", kind: "scalar", T: 12 },
      {
        no: 22,
        name: "attribution",
        kind: "enum",
        T: en.proto3.getEnumType(O),
      },
      { no: 23, name: "platform_flow", kind: "scalar", T: 8 },
      { no: 24, name: "parked", kind: "scalar", T: 8 },
      { no: 25, name: "fees", kind: "message", T: et },
      { no: 26, name: "curve", kind: "message", T: eG },
    ])));
  class eW extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = h.UNSPECIFIED),
        (this.pool = new Uint8Array(0)),
        (this.poolText = ""),
        (this.kind = y.UNSPECIFIED),
        (this.token0 = new Uint8Array(0)),
        (this.token1 = new Uint8Array(0)),
        (this.baseIsX = !1),
        (this.fee = ""),
        (this.tickSpacing = en.protoInt64.zero),
        (this.extension = new Uint8Array(0)),
        (this.classHash = new Uint8Array(0)),
        (this.verified = !1),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eW().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eW().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eW().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eW, e, n);
    }
  }
  ((t.MultiChainStarknetPoolEvent = eW),
    (eW.runtime = en.proto3),
    (eW.typeName = "multichain.events.v1.MultiChainStarknetPoolEvent"),
    (eW.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 3, name: "pool", kind: "scalar", T: 12 },
      { no: 4, name: "pool_text", kind: "scalar", T: 9 },
      { no: 5, name: "kind", kind: "enum", T: en.proto3.getEnumType(y) },
      { no: 6, name: "token0", kind: "scalar", T: 12 },
      { no: 7, name: "token1", kind: "scalar", T: 12 },
      { no: 8, name: "base_is_x", kind: "scalar", T: 8 },
      { no: 9, name: "fee", kind: "scalar", T: 9 },
      { no: 10, name: "tick_spacing", kind: "scalar", T: 4 },
      { no: 11, name: "extension", kind: "scalar", T: 12 },
      { no: 12, name: "class_hash", kind: "scalar", T: 12 },
      { no: 13, name: "verified", kind: "scalar", T: 8 },
    ])));
  class ej extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = h.UNSPECIFIED),
        (this.token = new Uint8Array(0)),
        (this.factory = new Uint8Array(0)),
        (this.creator = new Uint8Array(0)),
        (this.pool = new Uint8Array(0)),
        (this.name = ""),
        (this.symbol = ""),
        (this.decimals = 0),
        (this.classHash = new Uint8Array(0)),
        (this.imageUri = ""),
        (this.description = ""),
        (this.phase = P.UNSPECIFIED),
        (this.hadCurve = !1),
        (this.factoryVersion = ""),
        (this.progressBps = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ej().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ej().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ej().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ej, e, n);
    }
  }
  ((t.MultiChainStarknetLaunchEvent = ej),
    (ej.runtime = en.proto3),
    (ej.typeName = "multichain.events.v1.MultiChainStarknetLaunchEvent"),
    (ej.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 3, name: "token", kind: "scalar", T: 12 },
      { no: 4, name: "factory", kind: "scalar", T: 12 },
      { no: 5, name: "creator", kind: "scalar", T: 12 },
      { no: 6, name: "pool", kind: "scalar", T: 12 },
      { no: 7, name: "name", kind: "scalar", T: 9 },
      { no: 8, name: "symbol", kind: "scalar", T: 9 },
      { no: 9, name: "decimals", kind: "scalar", T: 13 },
      { no: 10, name: "total_supply", kind: "message", T: ex },
      { no: 11, name: "class_hash", kind: "scalar", T: 12 },
      { no: 12, name: "metadata", kind: "message", T: eY },
      { no: 13, name: "image_uri", kind: "scalar", T: 9 },
      { no: 14, name: "description", kind: "scalar", T: 9 },
      { no: 15, name: "phase", kind: "enum", T: en.proto3.getEnumType(P) },
      { no: 16, name: "had_curve", kind: "scalar", T: 8 },
      { no: 17, name: "factory_version", kind: "scalar", T: 9 },
      { no: 18, name: "graduation_threshold", kind: "message", T: ex },
      { no: 19, name: "virtual_quote", kind: "message", T: ex },
      { no: 20, name: "progress_bps", kind: "scalar", T: 13 },
    ])));
  class eX extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = h.UNSPECIFIED),
        (this.pool = new Uint8Array(0)),
        (this.token = new Uint8Array(0)),
        (this.provider = new Uint8Array(0)),
        (this.side = i.UNSPECIFIED),
        (this.liquidityDelta = ""),
        (this.lowerTick = en.protoInt64.zero),
        (this.upperTick = en.protoInt64.zero),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eX().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eX().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eX().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eX, e, n);
    }
  }
  ((t.MultiChainStarknetLiquidityEvent = eX),
    (eX.runtime = en.proto3),
    (eX.typeName = "multichain.events.v1.MultiChainStarknetLiquidityEvent"),
    (eX.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 3, name: "pool", kind: "scalar", T: 12 },
      { no: 4, name: "token", kind: "scalar", T: 12 },
      { no: 5, name: "provider", kind: "scalar", T: 12 },
      { no: 6, name: "side", kind: "enum", T: en.proto3.getEnumType(i) },
      { no: 7, name: "base_amount", kind: "message", T: ex },
      { no: 8, name: "quote_amount", kind: "message", T: ex },
      { no: 9, name: "liquidity_delta", kind: "scalar", T: 9 },
      { no: 10, name: "lower_tick", kind: "scalar", T: 18 },
      { no: 11, name: "upper_tick", kind: "scalar", T: 18 },
    ])));
  class e$ extends en.Message {
    constructor(e) {
      (super(),
        (this.token = new Uint8Array(0)),
        (this.from = new Uint8Array(0)),
        (this.to = new Uint8Array(0)),
        (this.kind = R.UNSPECIFIED),
        (this.layout = 0),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new e$().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new e$().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new e$().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(e$, e, n);
    }
  }
  ((t.MultiChainStarknetTransferEvent = e$),
    (e$.runtime = en.proto3),
    (e$.typeName = "multichain.events.v1.MultiChainStarknetTransferEvent"),
    (e$.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "token", kind: "scalar", T: 12 },
      { no: 3, name: "from", kind: "scalar", T: 12 },
      { no: 4, name: "to", kind: "scalar", T: 12 },
      { no: 5, name: "amount", kind: "message", T: ex },
      { no: 6, name: "kind", kind: "enum", T: en.proto3.getEnumType(R) },
      { no: 7, name: "layout", kind: "scalar", T: 13 },
    ])));
  class ez extends en.Message {
    constructor(e) {
      (super(),
        (this.reorgEpoch = en.protoInt64.zero),
        (this.fromBlock = en.protoInt64.zero),
        (this.toBlock = en.protoInt64.zero),
        (this.orphanedHashes = []),
        (this.revokedTrades = 0),
        (this.revokedTransfers = 0),
        (this.revokedLiquidity = 0),
        (this.token = new Uint8Array(0)),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ez().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ez().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ez().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(ez, e, n);
    }
  }
  ((t.MultiChainStarknetRevokeEvent = ez),
    (ez.runtime = en.proto3),
    (ez.typeName = "multichain.events.v1.MultiChainStarknetRevokeEvent"),
    (ez.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "reorg_epoch", kind: "scalar", T: 4 },
      { no: 3, name: "from_block", kind: "scalar", T: 4 },
      { no: 4, name: "to_block", kind: "scalar", T: 4 },
      { no: 5, name: "orphaned_hashes", kind: "scalar", T: 12, repeated: !0 },
      { no: 6, name: "revoked_trades", kind: "scalar", T: 13 },
      { no: 7, name: "revoked_transfers", kind: "scalar", T: 13 },
      { no: 8, name: "revoked_liquidity", kind: "scalar", T: 13 },
      { no: 9, name: "token", kind: "scalar", T: 12 },
    ])));
  class eQ extends en.Message {
    constructor(e) {
      (super(),
        (this.venue = h.UNSPECIFIED),
        (this.token = new Uint8Array(0)),
        (this.curvePool = new Uint8Array(0)),
        (this.pool = new Uint8Array(0)),
        (this.positionId = new Uint8Array(0)),
        (this.extension = new Uint8Array(0)),
        en.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eQ().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eQ().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eQ().fromJsonString(e, n);
    }
    static equals(e, n) {
      return en.proto3.util.equals(eQ, e, n);
    }
  }
  ((t.MultiChainStarknetGraduationEvent = eQ),
    (eQ.runtime = en.proto3),
    (eQ.typeName = "multichain.events.v1.MultiChainStarknetGraduationEvent"),
    (eQ.fields = en.proto3.util.newFieldList(() => [
      { no: 1, name: "identity", kind: "message", T: eK },
      { no: 2, name: "venue", kind: "enum", T: en.proto3.getEnumType(h) },
      { no: 3, name: "token", kind: "scalar", T: 12 },
      { no: 4, name: "curve_pool", kind: "scalar", T: 12 },
      { no: 5, name: "pool", kind: "scalar", T: 12 },
      { no: 6, name: "position_id", kind: "scalar", T: 12 },
      { no: 7, name: "quote_deposited", kind: "message", T: ex },
      { no: 8, name: "tokens_deposited", kind: "message", T: ex },
      { no: 9, name: "tokens_burned", kind: "message", T: ex },
      { no: 10, name: "graduation_fee", kind: "message", T: ex },
      { no: 11, name: "extension", kind: "scalar", T: 12 },
    ])));
};
