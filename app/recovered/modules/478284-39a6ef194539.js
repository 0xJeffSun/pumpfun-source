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
    F;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.MayhemTopTrader =
      t.MayhemOverview =
      t.ListAggregates =
      t.ListFilters =
      t.TextQuery =
      t.ListArg =
      t.Sparkline =
      t.FollowedHolder =
      t.CoinCard =
      t.HoldersSummary =
      t.Window =
      t.MarketState =
      t.MayhemStats =
      t.MayhemVenueState =
      t.PerpState =
      t.AmmState =
      t.CurveState =
      t.Venue =
      t.MarketPhase =
      t.Socials =
      t.TokenLimits =
      t.OperatorCoinWarning =
      t.TrustAssessment =
      t.CoinFlags =
      t.Perpetual =
      t.TokenizedEquity =
      t.CurveProgress =
      t.CoinDetail =
      t.ListSort =
      t.ListKind =
      t.WindowKind =
      t.MayhemCompleteReason =
      t.MayhemPauseReason =
      t.MayhemMode =
      t.MayhemPhase =
      t.LifecyclePhase =
      t.VerdictSource =
      t.SecurityReason =
      t.TrustVerdict =
      t.OperatorCoinWarningSeverity =
      t.PerpCategory =
      t.ImageBackdrop =
      t.AssetClass =
      t.TokenProgram =
        void 0));
  let v = e.r(376244),
    M = e.r(391770),
    J = e.r(747729),
    b = e.r(933269),
    B = e.r(92622),
    q = e.r(480780),
    x = e.r(398072);
  (((S = r || (t.TokenProgram = r = {}))[(S.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (S[(S.SPL_TOKEN = 1)] = "SPL_TOKEN"),
    (S[(S.TOKEN_2022 = 2)] = "TOKEN_2022"),
    (S[(S.ERC20 = 3)] = "ERC20"),
    v.proto3.util.setEnumType(r, "pumpfun.trading.v1.TokenProgram", [
      { no: 0, name: "TOKEN_PROGRAM_UNSPECIFIED" },
      { no: 1, name: "TOKEN_PROGRAM_SPL_TOKEN" },
      { no: 2, name: "TOKEN_PROGRAM_TOKEN_2022" },
      { no: 3, name: "TOKEN_PROGRAM_ERC20" },
    ]),
    ((N = o || (t.AssetClass = o = {}))[(N.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (N[(N.TOKEN = 1)] = "TOKEN"),
    (N[(N.TOKENIZED_EQUITY = 2)] = "TOKENIZED_EQUITY"),
    (N[(N.NFT_LIKE = 3)] = "NFT_LIKE"),
    (N[(N.PERPETUAL = 4)] = "PERPETUAL"),
    v.proto3.util.setEnumType(o, "pumpfun.trading.v1.AssetClass", [
      { no: 0, name: "ASSET_CLASS_UNSPECIFIED" },
      { no: 1, name: "ASSET_CLASS_TOKEN" },
      { no: 2, name: "ASSET_CLASS_TOKENIZED_EQUITY" },
      { no: 3, name: "ASSET_CLASS_NFT_LIKE" },
      { no: 4, name: "ASSET_CLASS_PERPETUAL" },
    ]),
    ((I = a || (t.ImageBackdrop = a = {}))[(I.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (I[(I.LIGHT = 1)] = "LIGHT"),
    (I[(I.DARK = 2)] = "DARK"),
    v.proto3.util.setEnumType(a, "pumpfun.trading.v1.ImageBackdrop", [
      { no: 0, name: "IMAGE_BACKDROP_UNSPECIFIED" },
      { no: 1, name: "IMAGE_BACKDROP_LIGHT" },
      { no: 2, name: "IMAGE_BACKDROP_DARK" },
    ]),
    ((h = s || (t.PerpCategory = s = {}))[(h.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (h[(h.CRYPTO = 1)] = "CRYPTO"),
    (h[(h.STOCKS = 2)] = "STOCKS"),
    (h[(h.COMMODITIES = 3)] = "COMMODITIES"),
    v.proto3.util.setEnumType(s, "pumpfun.trading.v1.PerpCategory", [
      { no: 0, name: "PERP_CATEGORY_UNSPECIFIED" },
      { no: 1, name: "PERP_CATEGORY_CRYPTO" },
      { no: 2, name: "PERP_CATEGORY_STOCKS" },
      { no: 3, name: "PERP_CATEGORY_COMMODITIES" },
    ]),
    ((y = i || (t.OperatorCoinWarningSeverity = i = {}))[(y.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (y[(y.SOFT_SCAM = 1)] = "SOFT_SCAM"),
    (y[(y.HARD_SCAM = 2)] = "HARD_SCAM"),
    v.proto3.util.setEnumType(
      i,
      "pumpfun.trading.v1.OperatorCoinWarningSeverity",
      [
        { no: 0, name: "OPERATOR_COIN_WARNING_SEVERITY_UNSPECIFIED" },
        { no: 1, name: "OPERATOR_COIN_WARNING_SEVERITY_SOFT_SCAM" },
        { no: 2, name: "OPERATOR_COIN_WARNING_SEVERITY_HARD_SCAM" },
      ],
    ),
    ((k = m || (t.TrustVerdict = m = {}))[(k.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (k[(k.TRUSTED = 1)] = "TRUSTED"),
    (k[(k.UNKNOWN = 2)] = "UNKNOWN"),
    (k[(k.SUSPICIOUS = 3)] = "SUSPICIOUS"),
    (k[(k.SCAM = 4)] = "SCAM"),
    v.proto3.util.setEnumType(m, "pumpfun.trading.v1.TrustVerdict", [
      { no: 0, name: "TRUST_VERDICT_UNSPECIFIED" },
      { no: 1, name: "TRUST_VERDICT_TRUSTED" },
      { no: 2, name: "TRUST_VERDICT_UNKNOWN" },
      { no: 3, name: "TRUST_VERDICT_SUSPICIOUS" },
      { no: 4, name: "TRUST_VERDICT_SCAM" },
    ]),
    ((O = l || (t.SecurityReason = l = {}))[(O.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (O[(O.OPERATOR_BLACKLIST = 1)] = "OPERATOR_BLACKLIST"),
    (O[(O.OPERATOR_BYPASS = 2)] = "OPERATOR_BYPASS"),
    (O[(O.TRUSTED_LAUNCHPAD = 3)] = "TRUSTED_LAUNCHPAD"),
    (O[(O.VERIFIED_CALLOUT = 4)] = "VERIFIED_CALLOUT"),
    (O[(O.HONEYPOT = 5)] = "HONEYPOT"),
    (O[(O.RUGPULL = 6)] = "RUGPULL"),
    (O[(O.SELL_FEE = 7)] = "SELL_FEE"),
    (O[(O.BUY_FEE = 8)] = "BUY_FEE"),
    (O[(O.TRANSFER_PAUSABLE = 9)] = "TRANSFER_PAUSABLE"),
    (O[(O.HIDDEN_OWNER = 10)] = "HIDDEN_OWNER"),
    (O[(O.SELFDESTRUCT = 11)] = "SELFDESTRUCT"),
    (O[(O.CANNOT_SELL_ALL = 12)] = "CANNOT_SELL_ALL"),
    (O[(O.CANNOT_BUY = 13)] = "CANNOT_BUY"),
    (O[(O.UNVERIFIED_SOURCE = 14)] = "UNVERIFIED_SOURCE"),
    (O[(O.MODIFIABLE_TAX = 15)] = "MODIFIABLE_TAX"),
    (O[(O.HONEYPOT_CREATOR = 16)] = "HONEYPOT_CREATOR"),
    (O[(O.SLIPPAGE_MODIFIABLE = 17)] = "SLIPPAGE_MODIFIABLE"),
    (O[(O.SUSPICIOUS_WALLET_ACTIVITY = 18)] = "SUSPICIOUS_WALLET_ACTIVITY"),
    (O[(O.MALICIOUS_SCORE = 19)] = "MALICIOUS_SCORE"),
    (O[(O.SPAM = 20)] = "SPAM"),
    (O[(O.AIRDROP_SPAM = 21)] = "AIRDROP_SPAM"),
    (O[(O.FREEZE_AUTHORITY = 22)] = "FREEZE_AUTHORITY"),
    (O[(O.MINT_AUTHORITY = 23)] = "MINT_AUTHORITY"),
    (O[(O.TOKEN2022_EXTENSION = 24)] = "TOKEN2022_EXTENSION"),
    (O[(O.PERMANENT_DELEGATE = 25)] = "PERMANENT_DELEGATE"),
    (O[(O.EXCESSIVE_TRANSFER_FEE = 26)] = "EXCESSIVE_TRANSFER_FEE"),
    (O[(O.TRANSFER_FEE = 27)] = "TRANSFER_FEE"),
    (O[(O.TRANSFER_HOOK = 28)] = "TRANSFER_HOOK"),
    (O[(O.DEFAULT_FROZEN = 29)] = "DEFAULT_FROZEN"),
    (O[(O.NON_TRANSFERABLE = 30)] = "NON_TRANSFERABLE"),
    (O[(O.IMPERSONATOR = 31)] = "IMPERSONATOR"),
    (O[(O.KNOWN_MALICIOUS = 32)] = "KNOWN_MALICIOUS"),
    (O[(O.WASH_TRADING = 33)] = "WASH_TRADING"),
    (O[(O.CONCENTRATED_SUPPLY = 34)] = "CONCENTRATED_SUPPLY"),
    (O[(O.INSUFFICIENT_LIQUIDITY = 35)] = "INSUFFICIENT_LIQUIDITY"),
    (O[(O.UNSTABLE_PRICE = 36)] = "UNSTABLE_PRICE"),
    (O[(O.EXIT_SCAM_RISK = 37)] = "EXIT_SCAM_RISK"),
    (O[(O.SANCTIONED_CREATOR = 38)] = "SANCTIONED_CREATOR"),
    (O[(O.TOKEN_BACKDOOR = 39)] = "TOKEN_BACKDOOR"),
    (O[(O.LOW_REPUTATION_CREATOR = 40)] = "LOW_REPUTATION_CREATOR"),
    (O[(O.SUSPICIOUS_FUNDING = 41)] = "SUSPICIOUS_FUNDING"),
    (O[(O.BUNDLED_LAUNCH = 42)] = "BUNDLED_LAUNCH"),
    (O[(O.VENDOR_MALICIOUS = 43)] = "VENDOR_MALICIOUS"),
    (O[(O.VALIDATED_MINT = 44)] = "VALIDATED_MINT"),
    (O[(O.TOP_TOKEN = 45)] = "TOP_TOKEN"),
    (O[(O.VERIFIED_BUYERS = 46)] = "VERIFIED_BUYERS"),
    (O[(O.VENDOR_TRUST_LIST = 47)] = "VENDOR_TRUST_LIST"),
    (O[(O.VENDOR_WARNING = 48)] = "VENDOR_WARNING"),
    (O[(O.HONEYPOT_HEURISTIC = 49)] = "HONEYPOT_HEURISTIC"),
    (O[(O.SELL_RISK = 50)] = "SELL_RISK"),
    (O[(O.SELL_RISK_BLACKLIST_UNREPORTED = 51)] =
      "SELL_RISK_BLACKLIST_UNREPORTED"),
    (O[(O.PROMPT_INJECTION_METADATA = 52)] = "PROMPT_INJECTION_METADATA"),
    (O[(O.BENIGN = 53)] = "BENIGN"),
    (O[(O.NO_SIGNAL = 54)] = "NO_SIGNAL"),
    (O[(O.PROVIDER_ERROR = 55)] = "PROVIDER_ERROR"),
    (O[(O.PENDING = 56)] = "PENDING"),
    (O[(O.TRUST_UNAVAILABLE = 57)] = "TRUST_UNAVAILABLE"),
    (O[(O.VENDOR_DEFERRED = 58)] = "VENDOR_DEFERRED"),
    (O[(O.UNVERIFIED_LAUNCHER = 59)] = "UNVERIFIED_LAUNCHER"),
    v.proto3.util.setEnumType(l, "pumpfun.trading.v1.SecurityReason", [
      { no: 0, name: "SECURITY_REASON_UNSPECIFIED" },
      { no: 1, name: "SECURITY_REASON_OPERATOR_BLACKLIST" },
      { no: 2, name: "SECURITY_REASON_OPERATOR_BYPASS" },
      { no: 3, name: "SECURITY_REASON_TRUSTED_LAUNCHPAD" },
      { no: 4, name: "SECURITY_REASON_VERIFIED_CALLOUT" },
      { no: 5, name: "SECURITY_REASON_HONEYPOT" },
      { no: 6, name: "SECURITY_REASON_RUGPULL" },
      { no: 7, name: "SECURITY_REASON_SELL_FEE" },
      { no: 8, name: "SECURITY_REASON_BUY_FEE" },
      { no: 9, name: "SECURITY_REASON_TRANSFER_PAUSABLE" },
      { no: 10, name: "SECURITY_REASON_HIDDEN_OWNER" },
      { no: 11, name: "SECURITY_REASON_SELFDESTRUCT" },
      { no: 12, name: "SECURITY_REASON_CANNOT_SELL_ALL" },
      { no: 13, name: "SECURITY_REASON_CANNOT_BUY" },
      { no: 14, name: "SECURITY_REASON_UNVERIFIED_SOURCE" },
      { no: 15, name: "SECURITY_REASON_MODIFIABLE_TAX" },
      { no: 16, name: "SECURITY_REASON_HONEYPOT_CREATOR" },
      { no: 17, name: "SECURITY_REASON_SLIPPAGE_MODIFIABLE" },
      { no: 18, name: "SECURITY_REASON_SUSPICIOUS_WALLET_ACTIVITY" },
      { no: 19, name: "SECURITY_REASON_MALICIOUS_SCORE" },
      { no: 20, name: "SECURITY_REASON_SPAM" },
      { no: 21, name: "SECURITY_REASON_AIRDROP_SPAM" },
      { no: 22, name: "SECURITY_REASON_FREEZE_AUTHORITY" },
      { no: 23, name: "SECURITY_REASON_MINT_AUTHORITY" },
      { no: 24, name: "SECURITY_REASON_TOKEN2022_EXTENSION" },
      { no: 25, name: "SECURITY_REASON_PERMANENT_DELEGATE" },
      { no: 26, name: "SECURITY_REASON_EXCESSIVE_TRANSFER_FEE" },
      { no: 27, name: "SECURITY_REASON_TRANSFER_FEE" },
      { no: 28, name: "SECURITY_REASON_TRANSFER_HOOK" },
      { no: 29, name: "SECURITY_REASON_DEFAULT_FROZEN" },
      { no: 30, name: "SECURITY_REASON_NON_TRANSFERABLE" },
      { no: 31, name: "SECURITY_REASON_IMPERSONATOR" },
      { no: 32, name: "SECURITY_REASON_KNOWN_MALICIOUS" },
      { no: 33, name: "SECURITY_REASON_WASH_TRADING" },
      { no: 34, name: "SECURITY_REASON_CONCENTRATED_SUPPLY" },
      { no: 35, name: "SECURITY_REASON_INSUFFICIENT_LIQUIDITY" },
      { no: 36, name: "SECURITY_REASON_UNSTABLE_PRICE" },
      { no: 37, name: "SECURITY_REASON_EXIT_SCAM_RISK" },
      { no: 38, name: "SECURITY_REASON_SANCTIONED_CREATOR" },
      { no: 39, name: "SECURITY_REASON_TOKEN_BACKDOOR" },
      { no: 40, name: "SECURITY_REASON_LOW_REPUTATION_CREATOR" },
      { no: 41, name: "SECURITY_REASON_SUSPICIOUS_FUNDING" },
      { no: 42, name: "SECURITY_REASON_BUNDLED_LAUNCH" },
      { no: 43, name: "SECURITY_REASON_VENDOR_MALICIOUS" },
      { no: 44, name: "SECURITY_REASON_VALIDATED_MINT" },
      { no: 45, name: "SECURITY_REASON_TOP_TOKEN" },
      { no: 46, name: "SECURITY_REASON_VERIFIED_BUYERS" },
      { no: 47, name: "SECURITY_REASON_VENDOR_TRUST_LIST" },
      { no: 48, name: "SECURITY_REASON_VENDOR_WARNING" },
      { no: 49, name: "SECURITY_REASON_HONEYPOT_HEURISTIC" },
      { no: 50, name: "SECURITY_REASON_SELL_RISK" },
      { no: 51, name: "SECURITY_REASON_SELL_RISK_BLACKLIST_UNREPORTED" },
      { no: 52, name: "SECURITY_REASON_PROMPT_INJECTION_METADATA" },
      { no: 53, name: "SECURITY_REASON_BENIGN" },
      { no: 54, name: "SECURITY_REASON_NO_SIGNAL" },
      { no: 55, name: "SECURITY_REASON_PROVIDER_ERROR" },
      { no: 56, name: "SECURITY_REASON_PENDING" },
      { no: 57, name: "SECURITY_REASON_TRUST_UNAVAILABLE" },
      { no: 58, name: "SECURITY_REASON_VENDOR_DEFERRED" },
      { no: 59, name: "SECURITY_REASON_UNVERIFIED_LAUNCHER" },
    ]),
    ((R = u || (t.VerdictSource = u = {}))[(R.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (R[(R.BLOCKAID = 1)] = "BLOCKAID"),
    (R[(R.GOPLUS = 2)] = "GOPLUS"),
    (R[(R.SOLANA_RPC = 3)] = "SOLANA_RPC"),
    (R[(R.HEURISTIC = 4)] = "HEURISTIC"),
    (R[(R.CODEX = 5)] = "CODEX"),
    (R[(R.OPENAI = 6)] = "OPENAI"),
    (R[(R.ETH_CALL = 7)] = "ETH_CALL"),
    v.proto3.util.setEnumType(u, "pumpfun.trading.v1.VerdictSource", [
      { no: 0, name: "VERDICT_SOURCE_UNSPECIFIED" },
      { no: 1, name: "VERDICT_SOURCE_BLOCKAID" },
      { no: 2, name: "VERDICT_SOURCE_GOPLUS" },
      { no: 3, name: "VERDICT_SOURCE_SOLANA_RPC" },
      { no: 4, name: "VERDICT_SOURCE_HEURISTIC" },
      { no: 5, name: "VERDICT_SOURCE_CODEX" },
      { no: 6, name: "VERDICT_SOURCE_OPENAI" },
      { no: 7, name: "VERDICT_SOURCE_ETH_CALL" },
    ]),
    ((P = d || (t.LifecyclePhase = d = {}))[(P.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (P[(P.CREATED = 1)] = "CREATED"),
    (P[(P.BONDING = 2)] = "BONDING"),
    (P[(P.BONDING_COMPLETE = 3)] = "BONDING_COMPLETE"),
    (P[(P.GRADUATED = 4)] = "GRADUATED"),
    (P[(P.NON_LAUNCHPAD = 5)] = "NON_LAUNCHPAD"),
    (P[(P.BANNED = 6)] = "BANNED"),
    (P[(P.DELISTED = 7)] = "DELISTED"),
    v.proto3.util.setEnumType(d, "pumpfun.trading.v1.LifecyclePhase", [
      { no: 0, name: "LIFECYCLE_PHASE_UNSPECIFIED" },
      { no: 1, name: "LIFECYCLE_PHASE_CREATED" },
      { no: 2, name: "LIFECYCLE_PHASE_BONDING" },
      { no: 3, name: "LIFECYCLE_PHASE_BONDING_COMPLETE" },
      { no: 4, name: "LIFECYCLE_PHASE_GRADUATED" },
      { no: 5, name: "LIFECYCLE_PHASE_NON_LAUNCHPAD" },
      { no: 6, name: "LIFECYCLE_PHASE_BANNED" },
      { no: 7, name: "LIFECYCLE_PHASE_DELISTED" },
    ]),
    ((A = p || (t.MayhemPhase = p = {}))[(A.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (A[(A.ENABLED = 1)] = "ENABLED"),
    (A[(A.ACTIVE = 2)] = "ACTIVE"),
    (A[(A.PAUSED = 3)] = "PAUSED"),
    (A[(A.COMPLETED = 4)] = "COMPLETED"),
    v.proto3.util.setEnumType(p, "pumpfun.trading.v1.MayhemPhase", [
      { no: 0, name: "MAYHEM_PHASE_UNSPECIFIED" },
      { no: 1, name: "MAYHEM_PHASE_ENABLED" },
      { no: 2, name: "MAYHEM_PHASE_ACTIVE" },
      { no: 3, name: "MAYHEM_PHASE_PAUSED" },
      { no: 4, name: "MAYHEM_PHASE_COMPLETED" },
    ]),
    ((D = c || (t.MayhemMode = c = {}))[(D.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (D[(D.AUTO = 1)] = "AUTO"),
    (D[(D.MANUAL = 2)] = "MANUAL"),
    v.proto3.util.setEnumType(c, "pumpfun.trading.v1.MayhemMode", [
      { no: 0, name: "MAYHEM_MODE_UNSPECIFIED" },
      { no: 1, name: "MAYHEM_MODE_AUTO" },
      { no: 2, name: "MAYHEM_MODE_MANUAL" },
    ]),
    ((C = T || (t.MayhemPauseReason = T = {}))[(C.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (C[(C.MCAP_FLOOR = 1)] = "MCAP_FLOOR"),
    (C[(C.UNPROFITABLE = 2)] = "UNPROFITABLE"),
    (C[(C.LOW_RESERVES = 3)] = "LOW_RESERVES"),
    (C[(C.CREATOR_PAUSED = 4)] = "CREATOR_PAUSED"),
    v.proto3.util.setEnumType(T, "pumpfun.trading.v1.MayhemPauseReason", [
      { no: 0, name: "MAYHEM_PAUSE_REASON_UNSPECIFIED" },
      { no: 1, name: "MAYHEM_PAUSE_REASON_MCAP_FLOOR" },
      { no: 2, name: "MAYHEM_PAUSE_REASON_UNPROFITABLE" },
      { no: 3, name: "MAYHEM_PAUSE_REASON_LOW_RESERVES" },
      { no: 4, name: "MAYHEM_PAUSE_REASON_CREATOR_PAUSED" },
    ]),
    ((L = E || (t.MayhemCompleteReason = E = {}))[(L.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (L[(L.MAX_AGE_REACHED = 1)] = "MAX_AGE_REACHED"),
    (L[(L.SOL_RESERVE_ERRORS = 2)] = "SOL_RESERVE_ERRORS"),
    (L[(L.ZERO_BASE_AMOUNT = 3)] = "ZERO_BASE_AMOUNT"),
    (L[(L.SELL_ZERO_AMOUNT = 4)] = "SELL_ZERO_AMOUNT"),
    (L[(L.MAYHEM_MODE_ENDED = 5)] = "MAYHEM_MODE_ENDED"),
    (L[(L.OVERFLOW = 6)] = "OVERFLOW"),
    v.proto3.util.setEnumType(E, "pumpfun.trading.v1.MayhemCompleteReason", [
      { no: 0, name: "MAYHEM_COMPLETE_REASON_UNSPECIFIED" },
      { no: 1, name: "MAYHEM_COMPLETE_REASON_MAX_AGE_REACHED" },
      { no: 2, name: "MAYHEM_COMPLETE_REASON_SOL_RESERVE_ERRORS" },
      { no: 3, name: "MAYHEM_COMPLETE_REASON_ZERO_BASE_AMOUNT" },
      { no: 4, name: "MAYHEM_COMPLETE_REASON_SELL_ZERO_AMOUNT" },
      { no: 5, name: "MAYHEM_COMPLETE_REASON_MAYHEM_MODE_ENDED" },
      { no: 6, name: "MAYHEM_COMPLETE_REASON_OVERFLOW" },
    ]),
    ((w = f || (t.WindowKind = f = {}))[(w.WINDOW_KIND_UNSPECIFIED = 0)] =
      "WINDOW_KIND_UNSPECIFIED"),
    (w[(w.WINDOW_KIND_5M = 1)] = "WINDOW_KIND_5M"),
    (w[(w.WINDOW_KIND_1H = 2)] = "WINDOW_KIND_1H"),
    (w[(w.WINDOW_KIND_6H = 3)] = "WINDOW_KIND_6H"),
    (w[(w.WINDOW_KIND_24H = 4)] = "WINDOW_KIND_24H"),
    (w[(w.WINDOW_KIND_7D = 5)] = "WINDOW_KIND_7D"),
    v.proto3.util.setEnumType(f, "pumpfun.trading.v1.WindowKind", [
      { no: 0, name: "WINDOW_KIND_UNSPECIFIED" },
      { no: 1, name: "WINDOW_KIND_5M" },
      { no: 2, name: "WINDOW_KIND_1H" },
      { no: 3, name: "WINDOW_KIND_6H" },
      { no: 4, name: "WINDOW_KIND_24H" },
      { no: 5, name: "WINDOW_KIND_7D" },
    ]),
    ((U = _ || (t.ListKind = _ = {}))[(U.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (U[(U.BOARD_NEW = 1)] = "BOARD_NEW"),
    (U[(U.BOARD_GRADUATING = 2)] = "BOARD_GRADUATING"),
    (U[(U.BOARD_GRADUATED = 3)] = "BOARD_GRADUATED"),
    (U[(U.BOARD_MOVERS = 4)] = "BOARD_MOVERS"),
    (U[(U.BOARD_LIVE = 5)] = "BOARD_LIVE"),
    (U[(U.BOARD_KOL = 6)] = "BOARD_KOL"),
    (U[(U.BOARD_MAYHEM = 7)] = "BOARD_MAYHEM"),
    (U[(U.BOARD_CHARITY = 8)] = "BOARD_CHARITY"),
    (U[(U.TRENDING = 9)] = "TRENDING"),
    (U[(U.TOP_TOKENS = 10)] = "TOP_TOKENS"),
    (U[(U.SIMILAR = 11)] = "SIMILAR"),
    (U[(U.CREATED_BY = 12)] = "CREATED_BY"),
    (U[(U.CURRENTLY_LIVE = 13)] = "CURRENTLY_LIVE"),
    (U[(U.MAYHEM_OVERVIEW = 14)] = "MAYHEM_OVERVIEW"),
    (U[(U.FOLLOWED_HOLDERS_COINS = 15)] = "FOLLOWED_HOLDERS_COINS"),
    (U[(U.TEXT = 16)] = "TEXT"),
    (U[(U.PERPS = 17)] = "PERPS"),
    v.proto3.util.setEnumType(_, "pumpfun.trading.v1.ListKind", [
      { no: 0, name: "LIST_KIND_UNSPECIFIED" },
      { no: 1, name: "LIST_KIND_BOARD_NEW" },
      { no: 2, name: "LIST_KIND_BOARD_GRADUATING" },
      { no: 3, name: "LIST_KIND_BOARD_GRADUATED" },
      { no: 4, name: "LIST_KIND_BOARD_MOVERS" },
      { no: 5, name: "LIST_KIND_BOARD_LIVE" },
      { no: 6, name: "LIST_KIND_BOARD_KOL" },
      { no: 7, name: "LIST_KIND_BOARD_MAYHEM" },
      { no: 8, name: "LIST_KIND_BOARD_CHARITY" },
      { no: 9, name: "LIST_KIND_TRENDING" },
      { no: 10, name: "LIST_KIND_TOP_TOKENS" },
      { no: 11, name: "LIST_KIND_SIMILAR" },
      { no: 12, name: "LIST_KIND_CREATED_BY" },
      { no: 13, name: "LIST_KIND_CURRENTLY_LIVE" },
      { no: 14, name: "LIST_KIND_MAYHEM_OVERVIEW" },
      { no: 15, name: "LIST_KIND_FOLLOWED_HOLDERS_COINS" },
      { no: 16, name: "LIST_KIND_TEXT" },
      { no: 17, name: "LIST_KIND_PERPS" },
    ]),
    ((F = g || (t.ListSort = g = {}))[(F.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (F[(F.VOLUME_1H = 1)] = "VOLUME_1H"),
    (F[(F.MARKET_CAP = 2)] = "MARKET_CAP"),
    (F[(F.VOLUME_24H = 3)] = "VOLUME_24H"),
    (F[(F.OPEN_INTEREST = 4)] = "OPEN_INTEREST"),
    (F[(F.FUNDING_RATE = 5)] = "FUNDING_RATE"),
    (F[(F.CHANGE_24H = 6)] = "CHANGE_24H"),
    v.proto3.util.setEnumType(g, "pumpfun.trading.v1.ListSort", [
      { no: 0, name: "LIST_SORT_UNSPECIFIED" },
      { no: 1, name: "LIST_SORT_VOLUME_1H" },
      { no: 2, name: "LIST_SORT_MARKET_CAP" },
      { no: 3, name: "LIST_SORT_VOLUME_24H" },
      { no: 4, name: "LIST_SORT_OPEN_INTEREST" },
      { no: 5, name: "LIST_SORT_FUNDING_RATE" },
      { no: 6, name: "LIST_SORT_CHANGE_24H" },
    ]));
  class V extends v.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.symbol = ""),
        (this.description = ""),
        (this.imageUrl = ""),
        (this.bannerUrl = ""),
        (this.metadataUri = ""),
        (this.creator = ""),
        (this.ctoAddress = ""),
        (this.decimals = 0),
        (this.tokenProgram = r.UNSPECIFIED),
        (this.launchProtocol = J.Protocol.UNSPECIFIED),
        (this.assetClass = o.UNSPECIFIED),
        (this.version = v.protoInt64.zero),
        (this.depth = 0),
        (this.imageBackdrop = a.UNSPECIFIED),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new V().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new V().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new V().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(V, e, n);
    }
  }
  ((t.CoinDetail = V),
    (V.runtime = v.proto3),
    (V.typeName = "pumpfun.trading.v1.CoinDetail"),
    (V.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "id", kind: "message", T: M.CoinRef },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      { no: 3, name: "symbol", kind: "scalar", T: 9 },
      { no: 4, name: "description", kind: "scalar", T: 9 },
      { no: 5, name: "image_url", kind: "scalar", T: 9 },
      { no: 6, name: "banner_url", kind: "scalar", T: 9 },
      { no: 7, name: "metadata_uri", kind: "scalar", T: 9 },
      { no: 8, name: "socials", kind: "message", T: $ },
      { no: 9, name: "creator", kind: "scalar", T: 9 },
      { no: 10, name: "cto_address", kind: "scalar", T: 9 },
      { no: 11, name: "created_at", kind: "message", T: M.Ordinal },
      { no: 12, name: "decimals", kind: "scalar", T: 13 },
      { no: 13, name: "total_supply", kind: "message", T: M.Amount },
      { no: 14, name: "circulating_supply", kind: "message", T: M.Amount },
      { no: 15, name: "supply_as_of", kind: "message", T: M.Ordinal },
      {
        no: 16,
        name: "token_program",
        kind: "enum",
        T: v.proto3.getEnumType(r),
      },
      {
        no: 17,
        name: "launch_protocol",
        kind: "enum",
        T: v.proto3.getEnumType(J.Protocol),
      },
      { no: 18, name: "asset_class", kind: "enum", T: v.proto3.getEnumType(o) },
      { no: 19, name: "flags", kind: "message", T: H },
      { no: 20, name: "security", kind: "message", T: W },
      { no: 21, name: "version", kind: "scalar", T: 4 },
      { no: 22, name: "tokenized_equity", kind: "message", T: Y },
      { no: 23, name: "perpetual", kind: "message", T: G },
      { no: 24, name: "depth", kind: "scalar", T: 13 },
      {
        no: 25,
        name: "collectible",
        kind: "message",
        T: b.CollectibleAsset,
        opt: !0,
      },
      {
        no: 26,
        name: "image_backdrop",
        kind: "enum",
        T: v.proto3.getEnumType(a),
      },
      { no: 27, name: "curve", kind: "message", T: K },
      { no: 28, name: "operator_warning", kind: "message", T: j },
    ])));
  class K extends v.Message {
    constructor(e) {
      (super(), (this.progressBps = 0), v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new K().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new K().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new K().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(K, e, n);
    }
  }
  ((t.CurveProgress = K),
    (K.runtime = v.proto3),
    (K.typeName = "pumpfun.trading.v1.CurveProgress"),
    (K.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "progress_bps", kind: "scalar", T: 13 },
      { no: 2, name: "graduated_at", kind: "message", T: M.Ordinal },
    ])));
  class Y extends v.Message {
    constructor(e) {
      (super(),
        (this.issuer = ""),
        (this.underlying = ""),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Y().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Y().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Y().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(Y, e, n);
    }
  }
  ((t.TokenizedEquity = Y),
    (Y.runtime = v.proto3),
    (Y.typeName = "pumpfun.trading.v1.TokenizedEquity"),
    (Y.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "issuer", kind: "scalar", T: 9 },
      { no: 2, name: "underlying", kind: "scalar", T: 9 },
    ])));
  class G extends v.Message {
    constructor(e) {
      (super(),
        (this.dex = ""),
        (this.assetIndex = 0),
        (this.szDecimals = 0),
        (this.maxLeverage = 0),
        (this.onlyIsolated = !1),
        (this.isDelisted = !1),
        (this.underlying = ""),
        (this.deployer = ""),
        (this.marginTableId = 0),
        (this.category = s.UNSPECIFIED),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new G().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new G().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new G().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(G, e, n);
    }
  }
  ((t.Perpetual = G),
    (G.runtime = v.proto3),
    (G.typeName = "pumpfun.trading.v1.Perpetual"),
    (G.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "dex", kind: "scalar", T: 9 },
      { no: 2, name: "asset_index", kind: "scalar", T: 13 },
      { no: 3, name: "sz_decimals", kind: "scalar", T: 13 },
      { no: 4, name: "max_leverage", kind: "scalar", T: 13 },
      { no: 5, name: "only_isolated", kind: "scalar", T: 8 },
      { no: 6, name: "is_delisted", kind: "scalar", T: 8 },
      { no: 7, name: "underlying", kind: "scalar", T: 9 },
      { no: 8, name: "deployer", kind: "scalar", T: 9 },
      { no: 9, name: "collateral", kind: "message", T: M.AssetRef },
      { no: 10, name: "margin_table_id", kind: "scalar", T: 13 },
      { no: 11, name: "category", kind: "enum", T: v.proto3.getEnumType(s) },
    ])));
  class H extends v.Message {
    constructor(e) {
      (super(),
        (this.nsfw = !1),
        (this.hidden = !1),
        (this.banned = !1),
        (this.isCurrentlyLive = !1),
        (this.boostMode = !1),
        (this.tokenizedAgent = !1),
        (this.holderRewards = !1),
        (this.isCharity = !1),
        (this.isVerifiedTopToken = !1),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new H().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new H().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new H().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(H, e, n);
    }
  }
  ((t.CoinFlags = H),
    (H.runtime = v.proto3),
    (H.typeName = "pumpfun.trading.v1.CoinFlags"),
    (H.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "nsfw", kind: "scalar", T: 8 },
      { no: 2, name: "hidden", kind: "scalar", T: 8 },
      { no: 3, name: "banned", kind: "scalar", T: 8 },
      { no: 4, name: "is_currently_live", kind: "scalar", T: 8 },
      { no: 5, name: "boost_mode", kind: "scalar", T: 8 },
      { no: 6, name: "tokenized_agent", kind: "scalar", T: 8 },
      { no: 7, name: "holder_rewards", kind: "scalar", T: 8 },
      { no: 8, name: "is_charity", kind: "scalar", T: 8 },
      { no: 9, name: "is_verified_top_token", kind: "scalar", T: 8 },
    ])));
  class W extends v.Message {
    constructor(e) {
      (super(),
        (this.verdict = m.UNSPECIFIED),
        (this.reasons = []),
        (this.sources = []),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new W().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new W().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new W().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(W, e, n);
    }
  }
  ((t.TrustAssessment = W),
    (W.runtime = v.proto3),
    (W.typeName = "pumpfun.trading.v1.TrustAssessment"),
    (W.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "verdict", kind: "enum", T: v.proto3.getEnumType(m) },
      {
        no: 2,
        name: "reasons",
        kind: "enum",
        T: v.proto3.getEnumType(l),
        repeated: !0,
      },
      {
        no: 3,
        name: "sources",
        kind: "enum",
        T: v.proto3.getEnumType(u),
        repeated: !0,
      },
      { no: 4, name: "limits", kind: "message", T: X },
      { no: 5, name: "evaluated_at", kind: "message", T: M.Ordinal },
    ])));
  class j extends v.Message {
    constructor(e) {
      (super(),
        (this.severity = i.UNSPECIFIED),
        (this.message = ""),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new j().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new j().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new j().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(j, e, n);
    }
  }
  ((t.OperatorCoinWarning = j),
    (j.runtime = v.proto3),
    (j.typeName = "pumpfun.trading.v1.OperatorCoinWarning"),
    (j.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "severity", kind: "enum", T: v.proto3.getEnumType(i) },
      { no: 2, name: "message", kind: "scalar", T: 9 },
      { no: 3, name: "updated_at", kind: "message", T: v.Timestamp },
    ])));
  class X extends v.Message {
    constructor(e) {
      (super(), v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new X().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new X().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new X().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(X, e, n);
    }
  }
  ((t.TokenLimits = X),
    (X.runtime = v.proto3),
    (X.typeName = "pumpfun.trading.v1.TokenLimits"),
    (X.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "max_tx", kind: "message", T: M.Amount },
      { no: 2, name: "max_wallet", kind: "message", T: M.Amount },
      { no: 3, name: "limits_in_effect", kind: "scalar", T: 8, opt: !0 },
    ])));
  class $ extends v.Message {
    constructor(e) {
      (super(),
        (this.website = ""),
        (this.twitter = ""),
        (this.telegram = ""),
        (this.discord = ""),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new $().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new $().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new $().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals($, e, n);
    }
  }
  ((t.Socials = $),
    ($.runtime = v.proto3),
    ($.typeName = "pumpfun.trading.v1.Socials"),
    ($.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "website", kind: "scalar", T: 9 },
      { no: 2, name: "twitter", kind: "scalar", T: 9 },
      { no: 3, name: "telegram", kind: "scalar", T: 9 },
      { no: 4, name: "discord", kind: "scalar", T: 9 },
    ])));
  class z extends v.Message {
    constructor(e) {
      (super(),
        (this.phase = d.UNSPECIFIED),
        (this.progressBps = 0),
        (this.otherVenues = []),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new z().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new z().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new z().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(z, e, n);
    }
  }
  ((t.MarketPhase = z),
    (z.runtime = v.proto3),
    (z.typeName = "pumpfun.trading.v1.MarketPhase"),
    (z.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "phase", kind: "enum", T: v.proto3.getEnumType(d) },
      { no: 2, name: "progress_bps", kind: "scalar", T: 13 },
      { no: 3, name: "quote_to_graduate", kind: "message", T: M.Amount },
      { no: 4, name: "graduation_cap_usd", kind: "message", T: M.Usd },
      { no: 5, name: "bonding_curve", kind: "message", T: Q },
      { no: 6, name: "tradable", kind: "message", T: Q },
      { no: 7, name: "other_venues", kind: "message", T: Q, repeated: !0 },
      { no: 8, name: "quote", kind: "message", T: M.AssetRef },
      { no: 9, name: "completed_at", kind: "message", T: M.Ordinal },
      { no: 10, name: "graduated_at", kind: "message", T: M.Ordinal },
      { no: 12, name: "mayhem", kind: "message", T: et },
      { no: 13, name: "as_of", kind: "message", T: M.Ordinal },
    ])));
  class Q extends v.Message {
    constructor(e) {
      (super(),
        (this.protocol = J.Protocol.UNSPECIFIED),
        (this.isCanonical = !1),
        (this.isBondingCurve = !1),
        (this.state = { case: void 0 }),
        (this.feeBps = 0),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Q().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Q().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Q().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(Q, e, n);
    }
  }
  ((t.Venue = Q),
    (Q.runtime = v.proto3),
    (Q.typeName = "pumpfun.trading.v1.Venue"),
    (Q.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "pool", kind: "message", T: M.PoolRef },
      {
        no: 2,
        name: "protocol",
        kind: "enum",
        T: v.proto3.getEnumType(J.Protocol),
      },
      { no: 3, name: "base", kind: "message", T: M.AssetRef },
      { no: 4, name: "quote", kind: "message", T: M.AssetRef },
      { no: 5, name: "is_canonical", kind: "scalar", T: 8 },
      { no: 6, name: "is_bonding_curve", kind: "scalar", T: 8 },
      { no: 7, name: "curve", kind: "message", T: Z, oneof: "state" },
      { no: 8, name: "amm", kind: "message", T: ee, oneof: "state" },
      { no: 13, name: "perp", kind: "message", T: en, oneof: "state" },
      { no: 9, name: "liquidity_usd", kind: "message", T: M.Usd },
      { no: 10, name: "fee_bps", kind: "scalar", T: 13 },
      { no: 11, name: "created_at", kind: "message", T: M.Ordinal },
      { no: 12, name: "as_of", kind: "message", T: M.Ordinal },
    ])));
  class Z extends v.Message {
    constructor(e) {
      (super(), (this.complete = !1), v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Z().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Z().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Z().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(Z, e, n);
    }
  }
  ((t.CurveState = Z),
    (Z.runtime = v.proto3),
    (Z.typeName = "pumpfun.trading.v1.CurveState"),
    (Z.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "virtual_base", kind: "message", T: M.Amount },
      { no: 2, name: "virtual_quote", kind: "message", T: M.Amount },
      { no: 3, name: "real_base", kind: "message", T: M.Amount },
      { no: 4, name: "real_quote", kind: "message", T: M.Amount },
      { no: 5, name: "complete", kind: "scalar", T: 8 },
    ])));
  class ee extends v.Message {
    constructor(e) {
      (super(), v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ee().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ee().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ee().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(ee, e, n);
    }
  }
  ((t.AmmState = ee),
    (ee.runtime = v.proto3),
    (ee.typeName = "pumpfun.trading.v1.AmmState"),
    (ee.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "reserve_base", kind: "message", T: M.Amount },
      { no: 2, name: "reserve_quote", kind: "message", T: M.Amount },
      { no: 3, name: "lp_supply", kind: "message", T: M.Amount },
    ])));
  class en extends v.Message {
    constructor(e) {
      (super(),
        (this.fundingRateHourly = ""),
        (this.degraded = !1),
        v.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new en().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new en().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new en().fromJsonString(e, n);
    }
    static equals(e, n) {
      return v.proto3.util.equals(en, e, n);
    }
  }
  ((t.PerpState = en),
    (en.runtime = v.proto3),
    (en.typeName = "pumpfun.trading.v1.PerpState"),
    (en.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "mark_px", kind: "message", T: M.Usd },
      { no: 2, name: "oracle_px", kind: "message", T: M.Usd },
      { no: 3, name: "funding_rate_hourly", kind: "scalar", T: 9 },
      { no: 4, name: "open_interest", kind: "message", T: M.Amount },
      { no: 5, name: "open_interest_usd", kind: "message", T: M.Usd },
      { no: 6, name: "next_funding_at", kind: "message", T: v.Timestamp },
      { no: 7, name: "state_as_of", kind: "message", T: v.Timestamp },
      { no: 8, name: "degraded", kind: "scalar", T: 8 },
      { no: 9, name: "day_ntl_vlm_usd", kind: "message", T: M.Usd },
      { no: 10, name: "prev_day_px", kind: "message", T: M.Usd },
    ])));
  class et extends v.Message {
    constructor(e) {
      (super(),
        (this.phase = p.UNSPECIFIED),
        (this.mode = c.UNSPECIFIED),
        (this.pauseReason = T.UNSPECIFIED),
        (this.completeReason = E.UNSPECIFIED),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(et, e, n);
    }
  }
  ((t.MayhemVenueState = et),
    (et.runtime = v.proto3),
    (et.typeName = "pumpfun.trading.v1.MayhemVenueState"),
    (et.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "phase", kind: "enum", T: v.proto3.getEnumType(p) },
      { no: 2, name: "mode", kind: "enum", T: v.proto3.getEnumType(c) },
      { no: 3, name: "started_at", kind: "message", T: v.Timestamp },
      { no: 4, name: "phase_ends_at", kind: "message", T: v.Timestamp },
      { no: 5, name: "tokens_deployed", kind: "message", T: M.Amount },
      { no: 6, name: "stats", kind: "message", T: er },
      { no: 7, name: "pause_reason", kind: "enum", T: v.proto3.getEnumType(T) },
      {
        no: 8,
        name: "complete_reason",
        kind: "enum",
        T: v.proto3.getEnumType(E),
      },
    ])));
  class er extends v.Message {
    constructor(e) {
      (super(),
        (this.buys = 0),
        (this.sells = 0),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(er, e, n);
    }
  }
  ((t.MayhemStats = er),
    (er.runtime = v.proto3),
    (er.typeName = "pumpfun.trading.v1.MayhemStats"),
    (er.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "buys", kind: "scalar", T: 13 },
      { no: 2, name: "sells", kind: "scalar", T: 13 },
      { no: 3, name: "buy_volume", kind: "message", T: M.Money },
      { no: 4, name: "sell_volume", kind: "message", T: M.Money },
      { no: 5, name: "net_deployed", kind: "message", T: M.Money },
      { no: 6, name: "as_of", kind: "message", T: M.Ordinal },
    ])));
  class eo extends v.Message {
    constructor(e) {
      (super(),
        (this.priceQuote = ""),
        (this.decimals = 0),
        (this.phase = d.UNSPECIFIED),
        (this.progressBps = 0),
        (this.windows = []),
        (this.firstTradeIsDevBuy = !1),
        (this.lastSide = B.Side.UNSPECIFIED),
        (this.source = M.DataSource.UNSPECIFIED),
        (this.priceNative = ""),
        (this.marketCapNative = ""),
        (this.marketCapQuote = ""),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(eo, e, n);
    }
  }
  ((t.MarketState = eo),
    (eo.runtime = v.proto3),
    (eo.typeName = "pumpfun.trading.v1.MarketState"),
    (eo.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "id", kind: "message", T: M.CoinRef },
      { no: 2, name: "as_of", kind: "message", T: M.Ordinal },
      { no: 3, name: "price_usd", kind: "message", T: M.Usd },
      { no: 4, name: "price_quote", kind: "scalar", T: 9 },
      { no: 5, name: "quote", kind: "message", T: M.AssetRef },
      { no: 6, name: "quote_price_usd", kind: "message", T: M.Usd },
      { no: 7, name: "native_price_usd", kind: "message", T: M.Usd },
      { no: 8, name: "market_cap_usd", kind: "message", T: M.Usd },
      { no: 9, name: "fdv_usd", kind: "message", T: M.Usd },
      { no: 10, name: "circulating_supply", kind: "message", T: M.Amount },
      { no: 11, name: "supply_as_of", kind: "message", T: M.Ordinal },
      { no: 12, name: "decimals", kind: "scalar", T: 13 },
      { no: 13, name: "ath_market_cap_usd", kind: "message", T: M.Usd },
      { no: 14, name: "ath_at", kind: "message", T: M.Ordinal },
      { no: 15, name: "liquidity_usd", kind: "message", T: M.Usd },
      { no: 16, name: "active_pool", kind: "message", T: M.PoolRef },
      { no: 17, name: "phase", kind: "enum", T: v.proto3.getEnumType(d) },
      { no: 18, name: "progress_bps", kind: "scalar", T: 13 },
      { no: 19, name: "holder_count", kind: "scalar", T: 4, opt: !0 },
      { no: 20, name: "windows", kind: "message", T: ea, repeated: !0 },
      { no: 21, name: "all_time_volume_usd", kind: "message", T: M.Usd },
      { no: 22, name: "first_trade", kind: "message", T: M.Ordinal },
      { no: 23, name: "first_trade_is_dev_buy", kind: "scalar", T: 8 },
      { no: 24, name: "first_trade_price_usd", kind: "message", T: M.Usd },
      { no: 25, name: "last_trade_usd", kind: "message", T: M.Usd },
      {
        no: 26,
        name: "last_side",
        kind: "enum",
        T: v.proto3.getEnumType(B.Side),
      },
      { no: 28, name: "holders_summary", kind: "message", T: es },
      {
        no: 29,
        name: "source",
        kind: "enum",
        T: v.proto3.getEnumType(M.DataSource),
      },
      { no: 30, name: "price_native", kind: "scalar", T: 9 },
      { no: 31, name: "market_cap_native", kind: "scalar", T: 9 },
      { no: 32, name: "market_cap_quote", kind: "scalar", T: 9 },
      { no: 33, name: "open_interest_usd", kind: "message", T: M.Usd },
      { no: 34, name: "funding_rate_hourly", kind: "scalar", T: 9, opt: !0 },
    ])));
  class ea extends v.Message {
    constructor(e) {
      (super(),
        (this.kind = f.WINDOW_KIND_UNSPECIFIED),
        (this.buys = 0),
        (this.sells = 0),
        (this.priceChangeBps = 0),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(ea, e, n);
    }
  }
  ((t.Window = ea),
    (ea.runtime = v.proto3),
    (ea.typeName = "pumpfun.trading.v1.Window"),
    (ea.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "kind", kind: "enum", T: v.proto3.getEnumType(f) },
      { no: 2, name: "volume_usd", kind: "message", T: M.Usd },
      { no: 3, name: "buys", kind: "scalar", T: 13 },
      { no: 4, name: "sells", kind: "scalar", T: 13 },
      { no: 5, name: "buyers", kind: "scalar", T: 13, opt: !0 },
      { no: 6, name: "sellers", kind: "scalar", T: 13, opt: !0 },
      { no: 7, name: "price_change_bps", kind: "scalar", T: 5 },
      { no: 8, name: "buy_volume_usd", kind: "message", T: M.Usd },
      { no: 9, name: "sell_volume_usd", kind: "message", T: M.Usd },
      { no: 10, name: "traders", kind: "scalar", T: 13, opt: !0 },
    ])));
  class es extends v.Message {
    constructor(e) {
      (super(),
        (this.top10ShareBps = 0),
        (this.devShareBps = 0),
        (this.sniperShareBps = 0),
        (this.bundlerShareBps = 0),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(es, e, n);
    }
  }
  ((t.HoldersSummary = es),
    (es.runtime = v.proto3),
    (es.typeName = "pumpfun.trading.v1.HoldersSummary"),
    (es.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "top10_share_bps", kind: "scalar", T: 13 },
      { no: 2, name: "dev_share_bps", kind: "scalar", T: 13 },
      { no: 3, name: "sniper_share_bps", kind: "scalar", T: 13 },
      { no: 4, name: "bundler_share_bps", kind: "scalar", T: 13 },
      { no: 5, name: "as_of", kind: "message", T: M.Ordinal },
    ])));
  class ei extends v.Message {
    constructor(e) {
      (super(),
        (this.source = M.DataSource.UNSPECIFIED),
        (this.followedHolderCount = 0),
        (this.followedHolders = []),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(ei, e, n);
    }
  }
  ((t.CoinCard = ei),
    (ei.runtime = v.proto3),
    (ei.typeName = "pumpfun.trading.v1.CoinCard"),
    (ei.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: V },
      { no: 2, name: "market", kind: "message", T: eo },
      { no: 3, name: "phase", kind: "message", T: z },
      { no: 4, name: "sparkline_1h", kind: "message", T: el },
      {
        no: 5,
        name: "source",
        kind: "enum",
        T: v.proto3.getEnumType(M.DataSource),
      },
      { no: 6, name: "followed_holder_count", kind: "scalar", T: 13 },
      { no: 7, name: "followed_holders", kind: "message", T: em, repeated: !0 },
    ])));
  class em extends v.Message {
    constructor(e) {
      (super(),
        (this.userId = ""),
        (this.username = ""),
        (this.profileImageUrl = ""),
        (this.isVerified = !1),
        (this.verifiedBadgeVisible = !1),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(em, e, n);
    }
  }
  ((t.FollowedHolder = em),
    (em.runtime = v.proto3),
    (em.typeName = "pumpfun.trading.v1.FollowedHolder"),
    (em.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "user_id", kind: "scalar", T: 9 },
      { no: 2, name: "username", kind: "scalar", T: 9 },
      { no: 3, name: "profile_image_url", kind: "scalar", T: 9 },
      { no: 4, name: "is_verified", kind: "scalar", T: 8 },
      { no: 5, name: "verified_badge_visible", kind: "scalar", T: 8 },
      { no: 6, name: "wallet_address", kind: "scalar", T: 9, opt: !0 },
    ])));
  class el extends v.Message {
    constructor(e) {
      (super(),
        (this.res = q.Resolution.RESOLUTION_UNSPECIFIED),
        (this.closeUsd = []),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(el, e, n);
    }
  }
  ((t.Sparkline = el),
    (el.runtime = v.proto3),
    (el.typeName = "pumpfun.trading.v1.Sparkline"),
    (el.fields = v.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "res",
        kind: "enum",
        T: v.proto3.getEnumType(q.Resolution),
      },
      { no: 2, name: "close_usd", kind: "scalar", T: 9, repeated: !0 },
      { no: 3, name: "as_of", kind: "message", T: M.Ordinal },
    ])));
  class eu extends v.Message {
    constructor(e) {
      (super(),
        (this.arg = { case: void 0 }),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(eu, e, n);
    }
  }
  ((t.ListArg = eu),
    (eu.runtime = v.proto3),
    (eu.typeName = "pumpfun.trading.v1.ListArg"),
    (eu.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "ref", kind: "message", T: M.CoinRef, oneof: "arg" },
      { no: 2, name: "wallet", kind: "scalar", T: 9, oneof: "arg" },
      { no: 3, name: "text", kind: "message", T: ed, oneof: "arg" },
    ])));
  class ed extends v.Message {
    constructor(e) {
      (super(),
        (this.query = ""),
        (this.unrestricted = !1),
        (this.sort = ""),
        (this.order = x.SortDirection.UNSPECIFIED),
        (this.creator = ""),
        (this.launchpadOnly = !1),
        (this.quoteMints = []),
        (this.excludeQuoteMints = []),
        (this.boostModes = []),
        (this.program = ""),
        (this.platform = ""),
        (this.sessionId = ""),
        (this.deviceId = ""),
        (this.clientPlatform = ""),
        (this.clientOs = ""),
        (this.experimentFlag = ""),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(ed, e, n);
    }
  }
  ((t.TextQuery = ed),
    (ed.runtime = v.proto3),
    (ed.typeName = "pumpfun.trading.v1.TextQuery"),
    (ed.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "query", kind: "scalar", T: 9 },
      { no: 2, name: "unrestricted", kind: "scalar", T: 8 },
      { no: 3, name: "sort", kind: "scalar", T: 9 },
      {
        no: 4,
        name: "order",
        kind: "enum",
        T: v.proto3.getEnumType(x.SortDirection),
      },
      { no: 5, name: "creator", kind: "scalar", T: 9 },
      { no: 6, name: "complete", kind: "scalar", T: 8, opt: !0 },
      { no: 7, name: "min_age_seconds", kind: "scalar", T: 3, opt: !0 },
      { no: 8, name: "max_age_seconds", kind: "scalar", T: 3, opt: !0 },
      { no: 9, name: "min_market_cap_sol", kind: "scalar", T: 1, opt: !0 },
      { no: 10, name: "max_market_cap_sol", kind: "scalar", T: 1, opt: !0 },
      { no: 11, name: "max_market_cap_usd", kind: "scalar", T: 1, opt: !0 },
      { no: 12, name: "min_ath_market_cap_sol", kind: "scalar", T: 1, opt: !0 },
      { no: 13, name: "max_ath_market_cap_sol", kind: "scalar", T: 1, opt: !0 },
      {
        no: 14,
        name: "max_last_trade_age_seconds",
        kind: "scalar",
        T: 3,
        opt: !0,
      },
      { no: 15, name: "launchpad_only", kind: "scalar", T: 8 },
      { no: 16, name: "is_holder_reward", kind: "scalar", T: 8, opt: !0 },
      { no: 17, name: "tokenized_agent", kind: "scalar", T: 8, opt: !0 },
      { no: 18, name: "is_charity", kind: "scalar", T: 8, opt: !0 },
      { no: 19, name: "is_cashback_enabled", kind: "scalar", T: 8, opt: !0 },
      { no: 20, name: "quote_mints", kind: "scalar", T: 9, repeated: !0 },
      {
        no: 21,
        name: "exclude_quote_mints",
        kind: "scalar",
        T: 9,
        repeated: !0,
      },
      { no: 22, name: "boost_modes", kind: "scalar", T: 9, repeated: !0 },
      { no: 23, name: "program", kind: "scalar", T: 9 },
      { no: 24, name: "platform", kind: "scalar", T: 9 },
      { no: 25, name: "session_id", kind: "scalar", T: 9 },
      { no: 26, name: "device_id", kind: "scalar", T: 9 },
      { no: 27, name: "client_platform", kind: "scalar", T: 9 },
      { no: 28, name: "client_os", kind: "scalar", T: 9 },
      { no: 29, name: "active_viewer_count", kind: "scalar", T: 5, opt: !0 },
      { no: 30, name: "experiment_flag", kind: "scalar", T: 9 },
    ])));
  class ep extends v.Message {
    constructor(e) {
      (super(),
        (this.chains = []),
        (this.hideFlagged = !1),
        (this.mayhem = []),
        (this.includeModerated = !1),
        (this.assetClasses = []),
        (this.pumpSwapGraduatedOnly = !1),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(ep, e, n);
    }
  }
  ((t.ListFilters = ep),
    (ep.runtime = v.proto3),
    (ep.typeName = "pumpfun.trading.v1.ListFilters"),
    (ep.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "chains", kind: "scalar", T: 9, repeated: !0 },
      { no: 2, name: "min_market_cap_usd", kind: "message", T: M.Usd },
      { no: 3, name: "hide_flagged", kind: "scalar", T: 8 },
      {
        no: 4,
        name: "mayhem",
        kind: "enum",
        T: v.proto3.getEnumType(p),
        repeated: !0,
      },
      { no: 5, name: "include_moderated", kind: "scalar", T: 8 },
      {
        no: 6,
        name: "asset_classes",
        kind: "enum",
        T: v.proto3.getEnumType(o),
        repeated: !0,
      },
      { no: 7, name: "max_depth", kind: "scalar", T: 13, opt: !0 },
      { no: 8, name: "pump_swap_graduated_only", kind: "scalar", T: 8 },
    ])));
  class ec extends v.Message {
    constructor(e) {
      (super(), (this.degraded = !1), v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(ec, e, n);
    }
  }
  ((t.ListAggregates = ec),
    (ec.runtime = v.proto3),
    (ec.typeName = "pumpfun.trading.v1.ListAggregates"),
    (ec.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "mayhem", kind: "message", T: eT },
      { no: 2, name: "degraded", kind: "scalar", T: 8 },
      { no: 3, name: "total", kind: "scalar", T: 13, opt: !0 },
    ])));
  class eT extends v.Message {
    constructor(e) {
      (super(), (this.topTraders = []), v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(eT, e, n);
    }
  }
  ((t.MayhemOverview = eT),
    (eT.runtime = v.proto3),
    (eT.typeName = "pumpfun.trading.v1.MayhemOverview"),
    (eT.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "stats", kind: "message", T: er },
      { no: 2, name: "top_traders", kind: "message", T: eE, repeated: !0 },
    ])));
  class eE extends v.Message {
    constructor(e) {
      (super(),
        (this.rank = 0),
        (this.winRateBps = 0),
        (this.trades = 0),
        v.proto3.util.initPartial(e, this));
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
      return v.proto3.util.equals(eE, e, n);
    }
  }
  ((t.MayhemTopTrader = eE),
    (eE.runtime = v.proto3),
    (eE.typeName = "pumpfun.trading.v1.MayhemTopTrader"),
    (eE.fields = v.proto3.util.newFieldList(() => [
      { no: 1, name: "rank", kind: "scalar", T: 13 },
      { no: 2, name: "trader", kind: "message", T: B.TraderRef },
      { no: 3, name: "realized_pnl", kind: "message", T: M.Money },
      { no: 4, name: "win_rate_bps", kind: "scalar", T: 13 },
      { no: 5, name: "volume", kind: "message", T: M.Money },
      { no: 6, name: "trades", kind: "scalar", T: 13 },
    ])));
};
