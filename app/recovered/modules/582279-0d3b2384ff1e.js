// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m, l, u, d, p, c, T, E, f, _, g, S, N, I, h, y, k;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.QuoteVenue =
      t.QuoteAsset =
      t.TradeApiListQuoteAssetsResponse =
      t.TradeApiListQuoteAssetsRequest =
      t.TradeApiGetFeesResponse =
      t.TradeApiGetFeesRequest =
      t.TradeApiGetReplayResponse =
      t.TradeApiGetReplayRequest =
      t.ReplayWindow =
      t.TradeApiGetRealizedPnlResponse =
      t.RealizedRow =
      t.RealizedPerp =
      t.TradeApiGetRealizedPnlRequest =
      t.TimeRange =
      t.PortfolioChartUnanswered =
      t.PortfolioChartMeta =
      t.TradeApiGetPortfolioChartResponse =
      t.Point =
      t.TradeApiGetPortfolioChartRequest =
      t.PerpOrder =
      t.TradeApiGetOpenOrdersResponse =
      t.TradeApiGetOpenOrdersRequest =
      t.TradeApiGetPositionsResponse =
      t.TradeApiGetPositionsRequest =
      t.TradePage =
      t.TradeApiListTradesRequest =
      t.CoinWallets =
      t.TradeScope =
      t.TradeApiGetCandlesRequest =
      t.TradeApiGetMarksResponse =
      t.TradeApiGetMarksRequest =
      t.TradeApiGetHoldersRequest =
      t.TradeApiListCoinsResponse =
      t.TradeApiListCoinsRequest =
      t.TradeApiGetCoinsResponse =
      t.AddressResolution =
      t.TradeApiGetCoinsRequest =
      t.CoinLookup =
      t.FeeScope =
      t.ChartKind =
      t.PerpOrderKind =
      t.TraderFilter =
      t.PositionInclude =
      t.HolderInclude =
      t.HolderFilter =
      t.RankBy =
      t.ChainArbitration =
      t.AddressKind =
      t.Include =
        void 0));
  let O = e.r(376244),
    R = e.r(391770),
    P = e.r(790066),
    A = e.r(478284),
    D = e.r(755857),
    C = e.r(316332),
    L = e.r(480780),
    w = e.r(92622),
    U = e.r(360791),
    F = e.r(747729);
  (((T = r || (t.Include = r = {}))[(T.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (T[(T.HOLDERS_SUMMARY = 1)] = "HOLDERS_SUMMARY"),
    (T[(T.SPARKLINE = 2)] = "SPARKLINE"),
    (T[(T.OTHER_VENUES = 3)] = "OTHER_VENUES"),
    O.proto3.util.setEnumType(r, "pumpfun.trading.v1.Include", [
      { no: 0, name: "INCLUDE_UNSPECIFIED" },
      { no: 1, name: "INCLUDE_HOLDERS_SUMMARY" },
      { no: 2, name: "INCLUDE_SPARKLINE" },
      { no: 3, name: "INCLUDE_OTHER_VENUES" },
    ]),
    ((E = o || (t.AddressKind = o = {}))[(E.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (E[(E.COIN = 1)] = "COIN"),
    (E[(E.POOL = 2)] = "POOL"),
    (E[(E.WALLET = 3)] = "WALLET"),
    (E[(E.UNKNOWN = 4)] = "UNKNOWN"),
    O.proto3.util.setEnumType(o, "pumpfun.trading.v1.AddressKind", [
      { no: 0, name: "ADDRESS_KIND_UNSPECIFIED" },
      { no: 1, name: "ADDRESS_KIND_COIN" },
      { no: 2, name: "ADDRESS_KIND_POOL" },
      { no: 3, name: "ADDRESS_KIND_WALLET" },
      { no: 4, name: "ADDRESS_KIND_UNKNOWN" },
    ]),
    ((f = a || (t.ChainArbitration = a = {}))[(f.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (f[(f.NONE = 1)] = "NONE"),
    (f[(f.REGISTRY = 2)] = "REGISTRY"),
    (f[(f.LIQUIDITY = 3)] = "LIQUIDITY"),
    (f[(f.CHAIN_ORDER = 4)] = "CHAIN_ORDER"),
    O.proto3.util.setEnumType(a, "pumpfun.trading.v1.ChainArbitration", [
      { no: 0, name: "CHAIN_ARBITRATION_UNSPECIFIED" },
      { no: 1, name: "CHAIN_ARBITRATION_NONE" },
      { no: 2, name: "CHAIN_ARBITRATION_REGISTRY" },
      { no: 3, name: "CHAIN_ARBITRATION_LIQUIDITY" },
      { no: 4, name: "CHAIN_ARBITRATION_CHAIN_ORDER" },
    ]),
    ((_ = s || (t.RankBy = s = {}))[(_.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (_[(_.BALANCE = 1)] = "BALANCE"),
    (_[(_.REALIZED_PNL = 2)] = "REALIZED_PNL"),
    (_[(_.LATEST_CALLOUT = 3)] = "LATEST_CALLOUT"),
    O.proto3.util.setEnumType(s, "pumpfun.trading.v1.RankBy", [
      { no: 0, name: "RANK_BY_UNSPECIFIED" },
      { no: 1, name: "RANK_BY_BALANCE" },
      { no: 2, name: "RANK_BY_REALIZED_PNL" },
      { no: 3, name: "RANK_BY_LATEST_CALLOUT" },
    ]),
    ((g = i || (t.HolderFilter = i = {}))[(g.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (g[(g.ALL = 1)] = "ALL"),
    (g[(g.FOLLOWED_BY_VIEWER = 2)] = "FOLLOWED_BY_VIEWER"),
    (g[(g.WITH_THESIS = 3)] = "WITH_THESIS"),
    O.proto3.util.setEnumType(i, "pumpfun.trading.v1.HolderFilter", [
      { no: 0, name: "HOLDER_FILTER_UNSPECIFIED" },
      { no: 1, name: "HOLDER_FILTER_ALL" },
      { no: 2, name: "HOLDER_FILTER_FOLLOWED_BY_VIEWER" },
      { no: 3, name: "HOLDER_FILTER_WITH_THESIS" },
    ]),
    ((S = m || (t.HolderInclude = m = {}))[(S.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (S[(S.PNL = 1)] = "PNL"),
    (S[(S.CALLOUT = 2)] = "CALLOUT"),
    (S[(S.PROFILE = 3)] = "PROFILE"),
    O.proto3.util.setEnumType(m, "pumpfun.trading.v1.HolderInclude", [
      { no: 0, name: "HOLDER_INCLUDE_UNSPECIFIED" },
      { no: 1, name: "HOLDER_INCLUDE_PNL" },
      { no: 2, name: "HOLDER_INCLUDE_CALLOUT" },
      { no: 3, name: "HOLDER_INCLUDE_PROFILE" },
    ]),
    ((N = l || (t.PositionInclude = l = {}))[(N.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (N[(N.CALLOUT = 1)] = "CALLOUT"),
    O.proto3.util.setEnumType(l, "pumpfun.trading.v1.PositionInclude", [
      { no: 0, name: "POSITION_INCLUDE_UNSPECIFIED" },
      { no: 1, name: "POSITION_INCLUDE_CALLOUT" },
    ]),
    ((I = u || (t.TraderFilter = u = {}))[(I.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (I[(I.ALL = 1)] = "ALL"),
    (I[(I.FOLLOWED_BY_VIEWER = 2)] = "FOLLOWED_BY_VIEWER"),
    (I[(I.VERIFIED = 3)] = "VERIFIED"),
    O.proto3.util.setEnumType(u, "pumpfun.trading.v1.TraderFilter", [
      { no: 0, name: "TRADER_FILTER_UNSPECIFIED" },
      { no: 1, name: "TRADER_FILTER_ALL" },
      { no: 2, name: "TRADER_FILTER_FOLLOWED_BY_VIEWER" },
      { no: 3, name: "TRADER_FILTER_VERIFIED" },
    ]),
    ((h = d || (t.PerpOrderKind = d = {}))[(h.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (h[(h.TAKE_PROFIT = 1)] = "TAKE_PROFIT"),
    (h[(h.STOP_LOSS = 2)] = "STOP_LOSS"),
    (h[(h.LIMIT = 3)] = "LIMIT"),
    O.proto3.util.setEnumType(d, "pumpfun.trading.v1.PerpOrderKind", [
      { no: 0, name: "PERP_ORDER_KIND_UNSPECIFIED" },
      { no: 1, name: "PERP_ORDER_KIND_TAKE_PROFIT" },
      { no: 2, name: "PERP_ORDER_KIND_STOP_LOSS" },
      { no: 3, name: "PERP_ORDER_KIND_LIMIT" },
    ]),
    ((y = p || (t.ChartKind = p = {}))[(y.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (y[(y.PNL = 1)] = "PNL"),
    (y[(y.VALUE = 2)] = "VALUE"),
    O.proto3.util.setEnumType(p, "pumpfun.trading.v1.ChartKind", [
      { no: 0, name: "CHART_KIND_UNSPECIFIED" },
      { no: 1, name: "CHART_KIND_PNL" },
      { no: 2, name: "CHART_KIND_VALUE" },
    ]),
    ((k = c || (t.FeeScope = c = {}))[(k.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (k[(k.COIN = 1)] = "COIN"),
    (k[(k.CREATOR = 2)] = "CREATOR"),
    (k[(k.SHAREHOLDER = 3)] = "SHAREHOLDER"),
    (k[(k.HOLDER_REWARDS = 4)] = "HOLDER_REWARDS"),
    (k[(k.CREATOR_UNSWEPT = 5)] = "CREATOR_UNSWEPT"),
    (k[(k.REFERRAL = 6)] = "REFERRAL"),
    O.proto3.util.setEnumType(c, "pumpfun.trading.v1.FeeScope", [
      { no: 0, name: "FEE_SCOPE_UNSPECIFIED" },
      { no: 1, name: "FEE_SCOPE_COIN" },
      { no: 2, name: "FEE_SCOPE_CREATOR" },
      { no: 3, name: "FEE_SCOPE_SHAREHOLDER" },
      { no: 4, name: "FEE_SCOPE_HOLDER_REWARDS" },
      { no: 5, name: "FEE_SCOPE_CREATOR_UNSWEPT" },
      { no: 6, name: "FEE_SCOPE_REFERRAL" },
    ]));
  class v extends O.Message {
    constructor(e) {
      (super(),
        (this.key = { case: void 0 }),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new v().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new v().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new v().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(v, e, n);
    }
  }
  ((t.CoinLookup = v),
    (v.runtime = O.proto3),
    (v.typeName = "pumpfun.trading.v1.CoinLookup"),
    (v.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "ref", kind: "message", T: R.CoinRef, oneof: "key" },
      { no: 2, name: "address", kind: "scalar", T: 9, oneof: "key" },
    ])));
  class M extends O.Message {
    constructor(e) {
      (super(),
        (this.refs = []),
        (this.include = []),
        (this.commitment = R.Commitment.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new M().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new M().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new M().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(M, e, n);
    }
  }
  ((t.TradeApiGetCoinsRequest = M),
    (M.runtime = O.proto3),
    (M.typeName = "pumpfun.trading.v1.TradeApiGetCoinsRequest"),
    (M.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "refs", kind: "message", T: v, repeated: !0 },
      {
        no: 2,
        name: "include",
        kind: "enum",
        T: O.proto3.getEnumType(r),
        repeated: !0,
      },
      {
        no: 3,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      { no: 4, name: "viewer", kind: "message", T: P.UserWalletSet },
    ])));
  class J extends O.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.kind = o.UNSPECIFIED),
        (this.target = { case: void 0 }),
        (this.arbitration = a.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new J().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new J().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new J().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(J, e, n);
    }
  }
  ((t.AddressResolution = J),
    (J.runtime = O.proto3),
    (J.typeName = "pumpfun.trading.v1.AddressResolution"),
    (J.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "address", kind: "scalar", T: 9 },
      { no: 2, name: "kind", kind: "enum", T: O.proto3.getEnumType(o) },
      { no: 3, name: "coin", kind: "message", T: R.CoinRef, oneof: "target" },
      { no: 4, name: "pool", kind: "message", T: R.PoolRef, oneof: "target" },
      { no: 5, name: "wallet", kind: "scalar", T: 9, oneof: "target" },
      { no: 6, name: "card_index", kind: "scalar", T: 13, opt: !0 },
      { no: 7, name: "arbitration", kind: "enum", T: O.proto3.getEnumType(a) },
    ])));
  class b extends O.Message {
    constructor(e) {
      (super(),
        (this.cards = []),
        (this.resolved = []),
        (this.missing = []),
        (this.rebuilding = []),
        (this.absent = []),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new b().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new b().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new b().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(b, e, n);
    }
  }
  ((t.TradeApiGetCoinsResponse = b),
    (b.runtime = O.proto3),
    (b.typeName = "pumpfun.trading.v1.TradeApiGetCoinsResponse"),
    (b.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "cards", kind: "message", T: A.CoinCard, repeated: !0 },
      { no: 2, name: "resolved", kind: "message", T: J, repeated: !0 },
      { no: 3, name: "missing", kind: "message", T: v, repeated: !0 },
      { no: 4, name: "as_of", kind: "message", T: R.Ordinal },
      {
        no: 5,
        name: "rebuilding",
        kind: "message",
        T: R.CoinRef,
        repeated: !0,
      },
      { no: 6, name: "absent", kind: "message", T: v, repeated: !0 },
    ])));
  class B extends O.Message {
    constructor(e) {
      (super(),
        (this.kind = A.ListKind.UNSPECIFIED),
        (this.sort = A.ListSort.UNSPECIFIED),
        (this.include = []),
        (this.commitment = R.Commitment.UNSPECIFIED),
        (this.pageSize = 0),
        (this.holdersPerCoin = 0),
        (this.start = 0),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new B().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new B().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new B().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(B, e, n);
    }
  }
  ((t.TradeApiListCoinsRequest = B),
    (B.runtime = O.proto3),
    (B.typeName = "pumpfun.trading.v1.TradeApiListCoinsRequest"),
    (B.fields = O.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "kind",
        kind: "enum",
        T: O.proto3.getEnumType(A.ListKind),
      },
      { no: 2, name: "arg", kind: "message", T: A.ListArg },
      { no: 3, name: "filters", kind: "message", T: A.ListFilters },
      {
        no: 4,
        name: "sort",
        kind: "enum",
        T: O.proto3.getEnumType(A.ListSort),
      },
      { no: 5, name: "page", kind: "message", T: R.PageToken },
      {
        no: 6,
        name: "include",
        kind: "enum",
        T: O.proto3.getEnumType(r),
        repeated: !0,
      },
      { no: 7, name: "viewer", kind: "message", T: P.UserWalletSet },
      {
        no: 8,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      { no: 9, name: "page_size", kind: "scalar", T: 13 },
      { no: 10, name: "holders_per_coin", kind: "scalar", T: 13 },
      { no: 11, name: "start", kind: "scalar", T: 13 },
    ])));
  class q extends O.Message {
    constructor(e) {
      (super(),
        (this.cards = []),
        (this.version = O.protoInt64.zero),
        (this.rankingId = ""),
        (this.exactHeadCards = []),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new q().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new q().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new q().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(q, e, n);
    }
  }
  ((t.TradeApiListCoinsResponse = q),
    (q.runtime = O.proto3),
    (q.typeName = "pumpfun.trading.v1.TradeApiListCoinsResponse"),
    (q.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "cards", kind: "message", T: A.CoinCard, repeated: !0 },
      { no: 2, name: "aggregates", kind: "message", T: A.ListAggregates },
      { no: 3, name: "next", kind: "message", T: R.PageToken },
      { no: 4, name: "version", kind: "scalar", T: 4 },
      { no: 5, name: "as_of", kind: "message", T: R.Ordinal },
      { no: 6, name: "ranking_id", kind: "scalar", T: 9 },
      { no: 7, name: "exact_head", kind: "message", T: D.ExactHead },
      {
        no: 8,
        name: "exact_head_cards",
        kind: "message",
        T: A.CoinCard,
        repeated: !0,
      },
      { no: 9, name: "slate_layout", kind: "message", T: D.SearchSlateLayout },
    ])));
  class x extends O.Message {
    constructor(e) {
      (super(),
        (this.rankBy = s.UNSPECIFIED),
        (this.filter = i.UNSPECIFIED),
        (this.include = []),
        (this.withThesis = !1),
        (this.pageSize = 0),
        (this.commitment = R.Commitment.UNSPECIFIED),
        (this.wallets = []),
        (this.countOnly = !1),
        O.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new x().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new x().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new x().fromJsonString(e, n);
    }
    static equals(e, n) {
      return O.proto3.util.equals(x, e, n);
    }
  }
  ((t.TradeApiGetHoldersRequest = x),
    (x.runtime = O.proto3),
    (x.typeName = "pumpfun.trading.v1.TradeApiGetHoldersRequest"),
    (x.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "ref", kind: "message", T: R.CoinRef },
      { no: 2, name: "rank_by", kind: "enum", T: O.proto3.getEnumType(s) },
      { no: 3, name: "filter", kind: "enum", T: O.proto3.getEnumType(i) },
      {
        no: 4,
        name: "include",
        kind: "enum",
        T: O.proto3.getEnumType(m),
        repeated: !0,
      },
      { no: 5, name: "with_thesis", kind: "scalar", T: 8 },
      { no: 6, name: "dust_floor_usd", kind: "message", T: R.Usd },
      { no: 7, name: "page_size", kind: "scalar", T: 13 },
      { no: 8, name: "page", kind: "message", T: R.PageToken },
      { no: 9, name: "viewer", kind: "message", T: P.UserWalletSet },
      {
        no: 10,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      { no: 11, name: "wallets", kind: "scalar", T: 9, repeated: !0 },
      { no: 12, name: "offset", kind: "scalar", T: 13, opt: !0 },
      { no: 13, name: "count_only", kind: "scalar", T: 8 },
    ])));
  class V extends O.Message {
    constructor(e) {
      (super(), (this.chains = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(V, e, n);
    }
  }
  ((t.TradeApiGetMarksRequest = V),
    (V.runtime = O.proto3),
    (V.typeName = "pumpfun.trading.v1.TradeApiGetMarksRequest"),
    (V.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "chains", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class K extends O.Message {
    constructor(e) {
      (super(), (this.marks = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(K, e, n);
    }
  }
  ((t.TradeApiGetMarksResponse = K),
    (K.runtime = O.proto3),
    (K.typeName = "pumpfun.trading.v1.TradeApiGetMarksResponse"),
    (K.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "marks", kind: "message", T: C.Mark, repeated: !0 },
    ])));
  class Y extends O.Message {
    constructor(e) {
      (super(),
        (this.res = L.Resolution.RESOLUTION_UNSPECIFIED),
        (this.measure = L.Measure.UNSPECIFIED),
        (this.toMs = O.protoInt64.zero),
        (this.count = 0),
        (this.maxPoints = 0),
        (this.commitment = R.Commitment.UNSPECIFIED),
        (this.targetBars = 0),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(Y, e, n);
    }
  }
  ((t.TradeApiGetCandlesRequest = Y),
    (Y.runtime = O.proto3),
    (Y.typeName = "pumpfun.trading.v1.TradeApiGetCandlesRequest"),
    (Y.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "ref", kind: "message", T: R.CoinRef },
      {
        no: 2,
        name: "res",
        kind: "enum",
        T: O.proto3.getEnumType(L.Resolution),
      },
      {
        no: 3,
        name: "measure",
        kind: "enum",
        T: O.proto3.getEnumType(L.Measure),
      },
      { no: 4, name: "to_ms", kind: "scalar", T: 3 },
      { no: 5, name: "count", kind: "scalar", T: 13 },
      { no: 6, name: "max_points", kind: "scalar", T: 13 },
      { no: 7, name: "pool", kind: "message", T: R.PoolRef },
      {
        no: 8,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      { no: 9, name: "target_bars", kind: "scalar", T: 13 },
    ])));
  class G extends O.Message {
    constructor(e) {
      (super(),
        (this.scope = { case: void 0 }),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(G, e, n);
    }
  }
  ((t.TradeScope = G),
    (G.runtime = O.proto3),
    (G.typeName = "pumpfun.trading.v1.TradeScope"),
    (G.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: R.CoinRef, oneof: "scope" },
      { no: 2, name: "coin_wallets", kind: "message", T: H, oneof: "scope" },
      {
        no: 3,
        name: "wallet",
        kind: "message",
        T: P.UserWalletSet,
        oneof: "scope",
      },
    ])));
  class H extends O.Message {
    constructor(e) {
      (super(), (this.wallets = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(H, e, n);
    }
  }
  ((t.CoinWallets = H),
    (H.runtime = O.proto3),
    (H.typeName = "pumpfun.trading.v1.CoinWallets"),
    (H.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: R.CoinRef },
      {
        no: 2,
        name: "wallets",
        kind: "message",
        T: P.UserWalletSet,
        repeated: !0,
      },
    ])));
  class W extends O.Message {
    constructor(e) {
      (super(),
        (this.kinds = []),
        (this.traderFilter = u.UNSPECIFIED),
        (this.chains = []),
        (this.commitment = R.Commitment.UNSPECIFIED),
        (this.pageSize = 0),
        (this.surfaceFilter = w.SurfaceFilter.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(W, e, n);
    }
  }
  ((t.TradeApiListTradesRequest = W),
    (W.runtime = O.proto3),
    (W.typeName = "pumpfun.trading.v1.TradeApiListTradesRequest"),
    (W.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "scope", kind: "message", T: G },
      {
        no: 2,
        name: "kinds",
        kind: "enum",
        T: O.proto3.getEnumType(w.TradeKind),
        repeated: !0,
      },
      {
        no: 3,
        name: "trader_filter",
        kind: "enum",
        T: O.proto3.getEnumType(u),
      },
      { no: 4, name: "pool", kind: "message", T: R.PoolRef },
      { no: 5, name: "min_usd", kind: "message", T: R.Usd },
      { no: 6, name: "before", kind: "message", T: R.Ordinal },
      { no: 7, name: "after", kind: "message", T: R.Ordinal },
      { no: 8, name: "chains", kind: "scalar", T: 9, repeated: !0 },
      { no: 9, name: "page", kind: "message", T: R.PageToken },
      {
        no: 10,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      { no: 11, name: "viewer", kind: "message", T: P.UserWalletSet },
      { no: 12, name: "page_size", kind: "scalar", T: 13 },
      {
        no: 13,
        name: "surface_filter",
        kind: "enum",
        T: O.proto3.getEnumType(w.SurfaceFilter),
      },
    ])));
  class j extends O.Message {
    constructor(e) {
      (super(),
        (this.trades = []),
        (this.source = R.DataSource.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(j, e, n);
    }
  }
  ((t.TradePage = j),
    (j.runtime = O.proto3),
    (j.typeName = "pumpfun.trading.v1.TradePage"),
    (j.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "trades", kind: "message", T: w.TradeRow, repeated: !0 },
      { no: 2, name: "aggregates", kind: "message", T: w.TradeAggregates },
      { no: 3, name: "next", kind: "message", T: R.PageToken },
      {
        no: 4,
        name: "source",
        kind: "enum",
        T: O.proto3.getEnumType(R.DataSource),
      },
      { no: 5, name: "revoked_from_block", kind: "scalar", T: 4, opt: !0 },
    ])));
  class X extends O.Message {
    constructor(e) {
      (super(),
        (this.refs = []),
        (this.sort = P.PositionSortKey.UNSPECIFIED),
        (this.pageSize = 0),
        (this.summaryOnly = !1),
        (this.period = R.Period.UNSPECIFIED),
        (this.commitment = R.Commitment.UNSPECIFIED),
        (this.include = []),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(X, e, n);
    }
  }
  ((t.TradeApiGetPositionsRequest = X),
    (X.runtime = O.proto3),
    (X.typeName = "pumpfun.trading.v1.TradeApiGetPositionsRequest"),
    (X.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "message", T: P.UserWalletSet },
      { no: 2, name: "refs", kind: "message", T: R.CoinRef, repeated: !0 },
      { no: 3, name: "filter", kind: "message", T: P.PositionFilter },
      {
        no: 4,
        name: "sort",
        kind: "enum",
        T: O.proto3.getEnumType(P.PositionSortKey),
      },
      { no: 5, name: "page_size", kind: "scalar", T: 13 },
      { no: 6, name: "page", kind: "message", T: R.PageToken },
      { no: 7, name: "summary_only", kind: "scalar", T: 8 },
      {
        no: 8,
        name: "period",
        kind: "enum",
        T: O.proto3.getEnumType(R.Period),
      },
      {
        no: 9,
        name: "commitment",
        kind: "enum",
        T: O.proto3.getEnumType(R.Commitment),
      },
      {
        no: 10,
        name: "include",
        kind: "enum",
        T: O.proto3.getEnumType(l),
        repeated: !0,
      },
      { no: 11, name: "callout_updates_limit", kind: "scalar", T: 13, opt: !0 },
    ])));
  class $ extends O.Message {
    constructor(e) {
      (super(), (this.positions = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals($, e, n);
    }
  }
  ((t.TradeApiGetPositionsResponse = $),
    ($.runtime = O.proto3),
    ($.typeName = "pumpfun.trading.v1.TradeApiGetPositionsResponse"),
    ($.fields = O.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "positions",
        kind: "message",
        T: P.Position,
        repeated: !0,
      },
      { no: 2, name: "summary", kind: "message", T: P.WalletSummary },
      { no: 3, name: "next", kind: "message", T: R.PageToken },
      { no: 4, name: "as_of", kind: "message", T: R.Ordinal },
    ])));
  class z extends O.Message {
    constructor(e) {
      (super(), (this.dexes = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(z, e, n);
    }
  }
  ((t.TradeApiGetOpenOrdersRequest = z),
    (z.runtime = O.proto3),
    (z.typeName = "pumpfun.trading.v1.TradeApiGetOpenOrdersRequest"),
    (z.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "message", T: P.UserWalletSet },
      { no: 2, name: "dexes", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class Q extends O.Message {
    constructor(e) {
      (super(), (this.orders = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(Q, e, n);
    }
  }
  ((t.TradeApiGetOpenOrdersResponse = Q),
    (Q.runtime = O.proto3),
    (Q.typeName = "pumpfun.trading.v1.TradeApiGetOpenOrdersResponse"),
    (Q.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "orders", kind: "message", T: Z, repeated: !0 },
      { no: 2, name: "state_as_of", kind: "message", T: O.Timestamp },
    ])));
  class Z extends O.Message {
    constructor(e) {
      (super(),
        (this.coin = ""),
        (this.dex = ""),
        (this.oid = O.protoInt64.zero),
        (this.kind = d.UNSPECIFIED),
        (this.side = w.Side.UNSPECIFIED),
        (this.reduceOnly = !1),
        (this.tif = ""),
        (this.isPositionTpsl = !1),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(Z, e, n);
    }
  }
  ((t.PerpOrder = Z),
    (Z.runtime = O.proto3),
    (Z.typeName = "pumpfun.trading.v1.PerpOrder"),
    (Z.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "scalar", T: 9 },
      { no: 2, name: "dex", kind: "scalar", T: 9 },
      { no: 3, name: "oid", kind: "scalar", T: 4 },
      { no: 4, name: "kind", kind: "enum", T: O.proto3.getEnumType(d) },
      { no: 5, name: "side", kind: "enum", T: O.proto3.getEnumType(w.Side) },
      { no: 6, name: "trigger_px", kind: "message", T: R.Usd },
      { no: 7, name: "limit_px", kind: "message", T: R.Usd },
      { no: 8, name: "size", kind: "message", T: R.Amount },
      { no: 9, name: "orig_size", kind: "message", T: R.Amount },
      { no: 10, name: "reduce_only", kind: "scalar", T: 8 },
      { no: 11, name: "tif", kind: "scalar", T: 9 },
      { no: 12, name: "is_position_tpsl", kind: "scalar", T: 8 },
      { no: 13, name: "created_at", kind: "message", T: O.Timestamp },
      { no: 14, name: "state_as_of", kind: "message", T: O.Timestamp },
    ])));
  class ee extends O.Message {
    constructor(e) {
      (super(),
        (this.period = R.Period.UNSPECIFIED),
        (this.kind = p.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ee, e, n);
    }
  }
  ((t.TradeApiGetPortfolioChartRequest = ee),
    (ee.runtime = O.proto3),
    (ee.typeName = "pumpfun.trading.v1.TradeApiGetPortfolioChartRequest"),
    (ee.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "message", T: P.UserWalletSet },
      {
        no: 2,
        name: "period",
        kind: "enum",
        T: O.proto3.getEnumType(R.Period),
      },
      { no: 3, name: "kind", kind: "enum", T: O.proto3.getEnumType(p) },
    ])));
  class en extends O.Message {
    constructor(e) {
      (super(), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(en, e, n);
    }
  }
  ((t.Point = en),
    (en.runtime = O.proto3),
    (en.typeName = "pumpfun.trading.v1.Point"),
    (en.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "time", kind: "message", T: O.Timestamp },
      { no: 2, name: "value", kind: "message", T: R.Money },
    ])));
  class et extends O.Message {
    constructor(e) {
      (super(),
        (this.points = []),
        (this.resolutionSec = O.protoInt64.zero),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(et, e, n);
    }
  }
  ((t.TradeApiGetPortfolioChartResponse = et),
    (et.runtime = O.proto3),
    (et.typeName = "pumpfun.trading.v1.TradeApiGetPortfolioChartResponse"),
    (et.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "points", kind: "message", T: en, repeated: !0 },
      { no: 2, name: "as_of", kind: "message", T: R.Ordinal },
      { no: 3, name: "equity_from", kind: "scalar", T: 3, opt: !0 },
      { no: 4, name: "resolution_sec", kind: "scalar", T: 3 },
      { no: 5, name: "meta", kind: "message", T: er },
    ])));
  class er extends O.Message {
    constructor(e) {
      (super(),
        (this.walletsRequested = 0),
        (this.walletsAnswered = 0),
        (this.walletsUnanswered = []),
        (this.walletsDegraded = []),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(er, e, n);
    }
  }
  ((t.PortfolioChartMeta = er),
    (er.runtime = O.proto3),
    (er.typeName = "pumpfun.trading.v1.PortfolioChartMeta"),
    (er.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallets_requested", kind: "scalar", T: 13 },
      { no: 2, name: "wallets_answered", kind: "scalar", T: 13 },
      {
        no: 3,
        name: "wallets_unanswered",
        kind: "message",
        T: eo,
        repeated: !0,
      },
      { no: 4, name: "wallets_degraded", kind: "scalar", T: 9, repeated: !0 },
      { no: 5, name: "coverage_from", kind: "scalar", T: 3, opt: !0 },
    ])));
  class eo extends O.Message {
    constructor(e) {
      (super(),
        (this.wallet = ""),
        (this.reason = ""),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(eo, e, n);
    }
  }
  ((t.PortfolioChartUnanswered = eo),
    (eo.runtime = O.proto3),
    (eo.typeName = "pumpfun.trading.v1.PortfolioChartUnanswered"),
    (eo.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "scalar", T: 9 },
      { no: 2, name: "reason", kind: "scalar", T: 9 },
    ])));
  class ea extends O.Message {
    constructor(e) {
      (super(), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ea, e, n);
    }
  }
  ((t.TimeRange = ea),
    (ea.runtime = O.proto3),
    (ea.typeName = "pumpfun.trading.v1.TimeRange"),
    (ea.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "from", kind: "message", T: O.Timestamp },
      { no: 2, name: "to", kind: "message", T: O.Timestamp },
    ])));
  class es extends O.Message {
    constructor(e) {
      (super(),
        (this.chainId = ""),
        (this.wallets = []),
        (this.window = { case: void 0 }),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(es, e, n);
    }
  }
  ((t.TradeApiGetRealizedPnlRequest = es),
    (es.runtime = O.proto3),
    (es.typeName = "pumpfun.trading.v1.TradeApiGetRealizedPnlRequest"),
    (es.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "chain_id", kind: "scalar", T: 9 },
      { no: 2, name: "wallets", kind: "scalar", T: 9, repeated: !0 },
      {
        no: 3,
        name: "period",
        kind: "enum",
        T: O.proto3.getEnumType(R.Period),
        oneof: "window",
      },
      { no: 4, name: "range", kind: "message", T: ea, oneof: "window" },
    ])));
  class ei extends O.Message {
    constructor(e) {
      (super(), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ei, e, n);
    }
  }
  ((t.RealizedPerp = ei),
    (ei.runtime = O.proto3),
    (ei.typeName = "pumpfun.trading.v1.RealizedPerp"),
    (ei.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "funding", kind: "message", T: R.Money },
    ])));
  class em extends O.Message {
    constructor(e) {
      (super(),
        (this.wallet = ""),
        (this.assetClass = A.AssetClass.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(em, e, n);
    }
  }
  ((t.RealizedRow = em),
    (em.runtime = O.proto3),
    (em.typeName = "pumpfun.trading.v1.RealizedRow"),
    (em.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "scalar", T: 9 },
      {
        no: 2,
        name: "asset_class",
        kind: "enum",
        T: O.proto3.getEnumType(A.AssetClass),
      },
      { no: 3, name: "gross", kind: "message", T: R.Money },
      { no: 4, name: "fees", kind: "message", T: R.Money },
      { no: 5, name: "net", kind: "message", T: R.Money },
      { no: 6, name: "perp", kind: "message", T: ei, opt: !0 },
    ])));
  class el extends O.Message {
    constructor(e) {
      (super(),
        (this.rows = []),
        (this.unserved = []),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(el, e, n);
    }
  }
  ((t.TradeApiGetRealizedPnlResponse = el),
    (el.runtime = O.proto3),
    (el.typeName = "pumpfun.trading.v1.TradeApiGetRealizedPnlResponse"),
    (el.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "rows", kind: "message", T: em, repeated: !0 },
      { no: 2, name: "range", kind: "message", T: ea },
      { no: 3, name: "as_of", kind: "message", T: R.Ordinal },
      { no: 4, name: "unserved", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class eu extends O.Message {
    constructor(e) {
      (super(), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(eu, e, n);
    }
  }
  ((t.ReplayWindow = eu),
    (eu.runtime = O.proto3),
    (eu.typeName = "pumpfun.trading.v1.ReplayWindow"),
    (eu.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "from", kind: "message", T: O.Timestamp },
      { no: 2, name: "to", kind: "message", T: O.Timestamp },
    ])));
  class ed extends O.Message {
    constructor(e) {
      (super(), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ed, e, n);
    }
  }
  ((t.TradeApiGetReplayRequest = ed),
    (ed.runtime = O.proto3),
    (ed.typeName = "pumpfun.trading.v1.TradeApiGetReplayRequest"),
    (ed.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "message", T: P.UserWalletSet },
      { no: 2, name: "coin", kind: "message", T: R.CoinRef },
      { no: 3, name: "window", kind: "message", T: eu },
    ])));
  class ep extends O.Message {
    constructor(e) {
      (super(), (this.walletTrades = []), O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ep, e, n);
    }
  }
  ((t.TradeApiGetReplayResponse = ep),
    (ep.runtime = O.proto3),
    (ep.typeName = "pumpfun.trading.v1.TradeApiGetReplayResponse"),
    (ep.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "card", kind: "message", T: A.CoinCard },
      { no: 2, name: "candles", kind: "message", T: L.CandleSeries },
      {
        no: 3,
        name: "wallet_trades",
        kind: "message",
        T: w.TradeRow,
        repeated: !0,
      },
      { no: 4, name: "position", kind: "message", T: P.Position },
    ])));
  class ec extends O.Message {
    constructor(e) {
      (super(),
        (this.scope = c.UNSPECIFIED),
        (this.subject = { case: void 0 }),
        (this.period = R.Period.UNSPECIFIED),
        (this.interval = U.Interval.INTERVAL_UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ec, e, n);
    }
  }
  ((t.TradeApiGetFeesRequest = ec),
    (ec.runtime = O.proto3),
    (ec.typeName = "pumpfun.trading.v1.TradeApiGetFeesRequest"),
    (ec.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "scope", kind: "enum", T: O.proto3.getEnumType(c) },
      { no: 2, name: "coin", kind: "message", T: R.CoinRef, oneof: "subject" },
      { no: 3, name: "creator", kind: "scalar", T: 9, oneof: "subject" },
      {
        no: 4,
        name: "shareholder",
        kind: "message",
        T: P.UserWalletSet,
        oneof: "subject",
      },
      { no: 10, name: "referrer", kind: "scalar", T: 9, oneof: "subject" },
      {
        no: 5,
        name: "period",
        kind: "enum",
        T: O.proto3.getEnumType(R.Period),
      },
      {
        no: 6,
        name: "interval",
        kind: "enum",
        T: O.proto3.getEnumType(U.Interval),
      },
      { no: 7, name: "mint", kind: "message", T: R.CoinRef },
      { no: 8, name: "page", kind: "message", T: R.PageToken },
      {
        no: 9,
        name: "holder_rewards",
        kind: "message",
        T: U.HolderRewardsPageQuery,
      },
    ])));
  class eT extends O.Message {
    constructor(e) {
      (super(),
        (this.fees = { case: void 0 }),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(eT, e, n);
    }
  }
  ((t.TradeApiGetFeesResponse = eT),
    (eT.runtime = O.proto3),
    (eT.typeName = "pumpfun.trading.v1.TradeApiGetFeesResponse"),
    (eT.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: U.CoinFees, oneof: "fees" },
      {
        no: 2,
        name: "creator",
        kind: "message",
        T: U.CreatorEarnings,
        oneof: "fees",
      },
      {
        no: 3,
        name: "shareholder",
        kind: "message",
        T: U.ShareholderEarnings,
        oneof: "fees",
      },
      {
        no: 5,
        name: "holder_rewards",
        kind: "message",
        T: U.HolderRewardsEarnings,
        oneof: "fees",
      },
      {
        no: 6,
        name: "creator_unswept",
        kind: "message",
        T: U.CreatorUnsweptFees,
        oneof: "fees",
      },
      {
        no: 7,
        name: "referral",
        kind: "message",
        T: U.ReferralEarnings,
        oneof: "fees",
      },
      { no: 4, name: "as_of", kind: "message", T: R.Ordinal },
    ])));
  class eE extends O.Message {
    constructor(e) {
      (super(),
        (this.chainFamily = F.ChainFamily.UNSPECIFIED),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(eE, e, n);
    }
  }
  ((t.TradeApiListQuoteAssetsRequest = eE),
    (eE.runtime = O.proto3),
    (eE.typeName = "pumpfun.trading.v1.TradeApiListQuoteAssetsRequest"),
    (eE.fields = O.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "chain_family",
        kind: "enum",
        T: O.proto3.getEnumType(F.ChainFamily),
      },
      { no: 2, name: "include_delisted", kind: "scalar", T: 8, opt: !0 },
    ])));
  class ef extends O.Message {
    constructor(e) {
      (super(),
        (this.quoteAssets = []),
        (this.version = O.protoInt64.zero),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(ef, e, n);
    }
  }
  ((t.TradeApiListQuoteAssetsResponse = ef),
    (ef.runtime = O.proto3),
    (ef.typeName = "pumpfun.trading.v1.TradeApiListQuoteAssetsResponse"),
    (ef.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "quote_assets", kind: "message", T: e_, repeated: !0 },
      { no: 2, name: "version", kind: "scalar", T: 4 },
    ])));
  class e_ extends O.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.assetClass = A.AssetClass.UNSPECIFIED),
        (this.tokenProgram = A.TokenProgram.UNSPECIFIED),
        (this.venues = []),
        (this.admittedBy = ""),
        (this.creatable = !1),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(e_, e, n);
    }
  }
  ((t.QuoteAsset = e_),
    (e_.runtime = O.proto3),
    (e_.typeName = "pumpfun.trading.v1.QuoteAsset"),
    (e_.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "asset", kind: "message", T: R.AssetRef },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      {
        no: 3,
        name: "asset_class",
        kind: "enum",
        T: O.proto3.getEnumType(A.AssetClass),
      },
      {
        no: 4,
        name: "token_program",
        kind: "enum",
        T: O.proto3.getEnumType(A.TokenProgram),
      },
      { no: 5, name: "venues", kind: "message", T: eg, repeated: !0 },
      { no: 6, name: "admitted_by", kind: "scalar", T: 9 },
      { no: 7, name: "creatable", kind: "scalar", T: 8 },
    ])));
  class eg extends O.Message {
    constructor(e) {
      (super(),
        (this.venue = ""),
        (this.listedAt = O.protoInt64.zero),
        O.proto3.util.initPartial(e, this));
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
      return O.proto3.util.equals(eg, e, n);
    }
  }
  ((t.QuoteVenue = eg),
    (eg.runtime = O.proto3),
    (eg.typeName = "pumpfun.trading.v1.QuoteVenue"),
    (eg.fields = O.proto3.util.newFieldList(() => [
      { no: 1, name: "venue", kind: "scalar", T: 9 },
      { no: 2, name: "listed_at", kind: "scalar", T: 3 },
      { no: 3, name: "delisted_at", kind: "scalar", T: 3, opt: !0 },
    ])));
};
