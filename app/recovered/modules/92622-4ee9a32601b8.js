// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m, l, u, d, p, c, T;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.TradeAggregates =
      t.TradeRevoked =
      t.PerpFill =
      t.TradeRow =
      t.TraderRef =
      t.SurfaceFilter =
      t.Attribution =
      t.TradeKind =
      t.PerpDirection =
      t.PerpSide =
      t.Side =
        void 0));
  let E = e.r(376244),
    f = e.r(391770),
    _ = e.r(747729);
  (((l = r || (t.Side = r = {}))[(l.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (l[(l.BUY = 1)] = "BUY"),
    (l[(l.SELL = 2)] = "SELL"),
    E.proto3.util.setEnumType(r, "pumpfun.trading.v1.Side", [
      { no: 0, name: "SIDE_UNSPECIFIED" },
      { no: 1, name: "SIDE_BUY" },
      { no: 2, name: "SIDE_SELL" },
    ]),
    ((u = o || (t.PerpSide = o = {}))[(u.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (u[(u.LONG = 1)] = "LONG"),
    (u[(u.SHORT = 2)] = "SHORT"),
    E.proto3.util.setEnumType(o, "pumpfun.trading.v1.PerpSide", [
      { no: 0, name: "PERP_SIDE_UNSPECIFIED" },
      { no: 1, name: "PERP_SIDE_LONG" },
      { no: 2, name: "PERP_SIDE_SHORT" },
    ]),
    ((d = a || (t.PerpDirection = a = {}))[(d.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (d[(d.OPEN_LONG = 1)] = "OPEN_LONG"),
    (d[(d.CLOSE_LONG = 2)] = "CLOSE_LONG"),
    (d[(d.OPEN_SHORT = 3)] = "OPEN_SHORT"),
    (d[(d.CLOSE_SHORT = 4)] = "CLOSE_SHORT"),
    (d[(d.FLIP_TO_SHORT = 5)] = "FLIP_TO_SHORT"),
    (d[(d.FLIP_TO_LONG = 6)] = "FLIP_TO_LONG"),
    E.proto3.util.setEnumType(a, "pumpfun.trading.v1.PerpDirection", [
      { no: 0, name: "PERP_DIRECTION_UNSPECIFIED" },
      { no: 1, name: "PERP_DIRECTION_OPEN_LONG" },
      { no: 2, name: "PERP_DIRECTION_CLOSE_LONG" },
      { no: 3, name: "PERP_DIRECTION_OPEN_SHORT" },
      { no: 4, name: "PERP_DIRECTION_CLOSE_SHORT" },
      { no: 5, name: "PERP_DIRECTION_FLIP_TO_SHORT" },
      { no: 6, name: "PERP_DIRECTION_FLIP_TO_LONG" },
    ]),
    ((p = s || (t.TradeKind = s = {}))[(p.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (p[(p.SWAP = 1)] = "SWAP"),
    (p[(p.RELAY_FILL = 2)] = "RELAY_FILL"),
    (p[(p.BRIDGE_FILL = 3)] = "BRIDGE_FILL"),
    (p[(p.LIQUIDITY_ADD = 4)] = "LIQUIDITY_ADD"),
    (p[(p.LIQUIDITY_REMOVE = 5)] = "LIQUIDITY_REMOVE"),
    (p[(p.TRANSFER = 6)] = "TRANSFER"),
    (p[(p.MINT = 7)] = "MINT"),
    (p[(p.BURN = 8)] = "BURN"),
    (p[(p.CREATE = 9)] = "CREATE"),
    (p[(p.MAYHEM_AGENT = 10)] = "MAYHEM_AGENT"),
    (p[(p.PERP_FILL = 11)] = "PERP_FILL"),
    (p[(p.PERP_FUNDING = 12)] = "PERP_FUNDING"),
    (p[(p.PERP_TRANSFER = 13)] = "PERP_TRANSFER"),
    E.proto3.util.setEnumType(s, "pumpfun.trading.v1.TradeKind", [
      { no: 0, name: "TRADE_KIND_UNSPECIFIED" },
      { no: 1, name: "TRADE_KIND_SWAP" },
      { no: 2, name: "TRADE_KIND_RELAY_FILL" },
      { no: 3, name: "TRADE_KIND_BRIDGE_FILL" },
      { no: 4, name: "TRADE_KIND_LIQUIDITY_ADD" },
      { no: 5, name: "TRADE_KIND_LIQUIDITY_REMOVE" },
      { no: 6, name: "TRADE_KIND_TRANSFER" },
      { no: 7, name: "TRADE_KIND_MINT" },
      { no: 8, name: "TRADE_KIND_BURN" },
      { no: 9, name: "TRADE_KIND_CREATE" },
      { no: 10, name: "TRADE_KIND_MAYHEM_AGENT" },
      { no: 11, name: "TRADE_KIND_PERP_FILL" },
      { no: 12, name: "TRADE_KIND_PERP_FUNDING" },
      { no: 13, name: "TRADE_KIND_PERP_TRANSFER" },
    ]),
    ((c = i || (t.Attribution = i = {}))[(c.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (c[(c.DIRECT = 1)] = "DIRECT"),
    (c[(c.JUPITER = 2)] = "JUPITER"),
    (c[(c.RELAY = 3)] = "RELAY"),
    (c[(c.AXIOM = 4)] = "AXIOM"),
    (c[(c.OKX = 5)] = "OKX"),
    (c[(c.LIFI = 6)] = "LIFI"),
    (c[(c.INTERNAL_BRIDGE = 7)] = "INTERNAL_BRIDGE"),
    (c[(c.OTHER_ROUTER = 8)] = "OTHER_ROUTER"),
    E.proto3.util.setEnumType(i, "pumpfun.trading.v1.Attribution", [
      { no: 0, name: "ATTRIBUTION_UNSPECIFIED" },
      { no: 1, name: "ATTRIBUTION_DIRECT" },
      { no: 2, name: "ATTRIBUTION_JUPITER" },
      { no: 3, name: "ATTRIBUTION_RELAY" },
      { no: 4, name: "ATTRIBUTION_AXIOM" },
      { no: 5, name: "ATTRIBUTION_OKX" },
      { no: 6, name: "ATTRIBUTION_LIFI" },
      { no: 7, name: "ATTRIBUTION_INTERNAL_BRIDGE" },
      { no: 8, name: "ATTRIBUTION_OTHER_ROUTER" },
    ]),
    ((T = m || (t.SurfaceFilter = m = {}))[(T.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (T[(T.ALL = 1)] = "ALL"),
    (T[(T.PUMP = 2)] = "PUMP"),
    E.proto3.util.setEnumType(m, "pumpfun.trading.v1.SurfaceFilter", [
      { no: 0, name: "SURFACE_FILTER_UNSPECIFIED" },
      { no: 1, name: "SURFACE_FILTER_ALL" },
      { no: 2, name: "SURFACE_FILTER_PUMP" },
    ]));
  class g extends E.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.userId = ""),
        (this.username = ""),
        (this.verified = !1),
        (this.followedByViewer = !1),
        (this.isKol = !1),
        (this.isDev = !1),
        (this.isSniper = !1),
        (this.isBundler = !1),
        (this.label = ""),
        E.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new g().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new g().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new g().fromJsonString(e, n);
    }
    static equals(e, n) {
      return E.proto3.util.equals(g, e, n);
    }
  }
  ((t.TraderRef = g),
    (g.runtime = E.proto3),
    (g.typeName = "pumpfun.trading.v1.TraderRef"),
    (g.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "address", kind: "scalar", T: 9 },
      { no: 2, name: "user_id", kind: "scalar", T: 9 },
      { no: 3, name: "username", kind: "scalar", T: 9 },
      { no: 4, name: "verified", kind: "scalar", T: 8 },
      { no: 5, name: "followed_by_viewer", kind: "scalar", T: 8 },
      { no: 6, name: "is_kol", kind: "scalar", T: 8 },
      { no: 7, name: "is_dev", kind: "scalar", T: 8 },
      { no: 8, name: "is_sniper", kind: "scalar", T: 8 },
      { no: 9, name: "is_bundler", kind: "scalar", T: 8 },
      { no: 10, name: "label", kind: "scalar", T: 9 },
    ])));
  class S extends E.Message {
    constructor(e) {
      (super(),
        (this.venue = _.Protocol.UNSPECIFIED),
        (this.txId = ""),
        (this.legIndex = 0),
        (this.late = !1),
        (this.isBackfill = !1),
        (this.side = r.UNSPECIFIED),
        (this.kind = s.UNSPECIFIED),
        (this.priceQuote = ""),
        (this.attribution = i.UNSPECIFIED),
        (this.counterparty = ""),
        (this.surface = ""),
        E.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new S().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new S().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new S().fromJsonString(e, n);
    }
    static equals(e, n) {
      return E.proto3.util.equals(S, e, n);
    }
  }
  ((t.TradeRow = S),
    (S.runtime = E.proto3),
    (S.typeName = "pumpfun.trading.v1.TradeRow"),
    (S.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: f.CoinRef },
      { no: 2, name: "pool", kind: "message", T: f.PoolRef },
      {
        no: 3,
        name: "venue",
        kind: "enum",
        T: E.proto3.getEnumType(_.Protocol),
      },
      { no: 4, name: "ordinal", kind: "message", T: f.Ordinal },
      { no: 5, name: "tx_id", kind: "scalar", T: 9 },
      { no: 6, name: "leg_index", kind: "scalar", T: 13 },
      { no: 7, name: "late", kind: "scalar", T: 8 },
      { no: 8, name: "is_backfill", kind: "scalar", T: 8 },
      { no: 9, name: "side", kind: "enum", T: E.proto3.getEnumType(r) },
      { no: 10, name: "kind", kind: "enum", T: E.proto3.getEnumType(s) },
      { no: 11, name: "trader", kind: "message", T: g },
      { no: 12, name: "base_amount", kind: "message", T: f.Amount },
      { no: 13, name: "quote_amount", kind: "message", T: f.Amount },
      { no: 14, name: "quote", kind: "message", T: f.AssetRef },
      { no: 15, name: "price_usd", kind: "message", T: f.Usd },
      { no: 16, name: "price_quote", kind: "scalar", T: 9 },
      { no: 17, name: "value", kind: "message", T: f.Money },
      { no: 18, name: "quote_price_usd", kind: "message", T: f.Usd },
      { no: 19, name: "market_cap_after_usd", kind: "message", T: f.Usd },
      { no: 20, name: "protocol_fee", kind: "message", T: f.Amount },
      { no: 21, name: "creator_fee", kind: "message", T: f.Amount },
      { no: 22, name: "attribution", kind: "enum", T: E.proto3.getEnumType(i) },
      { no: 24, name: "base", kind: "message", T: f.AssetRef },
      { no: 25, name: "counterparty", kind: "scalar", T: 9 },
      { no: 26, name: "perp", kind: "message", T: N },
      { no: 27, name: "surface", kind: "scalar", T: 9 },
    ])));
  class N extends E.Message {
    constructor(e) {
      (super(),
        (this.dir = a.UNSPECIFIED),
        (this.startShort = !1),
        (this.isLiquidation = !1),
        (this.twapId = E.protoInt64.zero),
        (this.isTaker = !1),
        (this.oid = E.protoInt64.zero),
        (this.dex = ""),
        E.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new N().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new N().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new N().fromJsonString(e, n);
    }
    static equals(e, n) {
      return E.proto3.util.equals(N, e, n);
    }
  }
  ((t.PerpFill = N),
    (N.runtime = E.proto3),
    (N.typeName = "pumpfun.trading.v1.PerpFill"),
    (N.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "dir", kind: "enum", T: E.proto3.getEnumType(a) },
      { no: 2, name: "closed_pnl", kind: "message", T: f.Money },
      { no: 3, name: "fee", kind: "message", T: f.Money },
      { no: 4, name: "start_position", kind: "message", T: f.Amount },
      { no: 5, name: "start_short", kind: "scalar", T: 8 },
      { no: 6, name: "is_liquidation", kind: "scalar", T: 8 },
      { no: 7, name: "liquidation_mark_px", kind: "message", T: f.Usd },
      { no: 8, name: "twap_id", kind: "scalar", T: 4 },
      { no: 9, name: "builder_fee", kind: "message", T: f.Money },
      { no: 10, name: "is_taker", kind: "scalar", T: 8 },
      { no: 11, name: "oid", kind: "scalar", T: 4 },
      { no: 12, name: "dex", kind: "scalar", T: 9 },
    ])));
  class I extends E.Message {
    constructor(e) {
      (super(), (this.txId = ""), E.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new I().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new I().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new I().fromJsonString(e, n);
    }
    static equals(e, n) {
      return E.proto3.util.equals(I, e, n);
    }
  }
  ((t.TradeRevoked = I),
    (I.runtime = E.proto3),
    (I.typeName = "pumpfun.trading.v1.TradeRevoked"),
    (I.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: f.CoinRef },
      { no: 2, name: "ordinal", kind: "message", T: f.Ordinal },
      { no: 3, name: "tx_id", kind: "scalar", T: 9 },
    ])));
  class h extends E.Message {
    constructor(e) {
      (super(),
        (this.buys = 0),
        (this.sells = 0),
        E.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new h().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new h().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new h().fromJsonString(e, n);
    }
    static equals(e, n) {
      return E.proto3.util.equals(h, e, n);
    }
  }
  ((t.TradeAggregates = h),
    (h.runtime = E.proto3),
    (h.typeName = "pumpfun.trading.v1.TradeAggregates"),
    (h.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "buys", kind: "scalar", T: 13 },
      { no: 2, name: "sells", kind: "scalar", T: 13 },
      { no: 3, name: "buy_volume_usd", kind: "message", T: f.Usd },
      { no: 4, name: "sell_volume_usd", kind: "message", T: f.Usd },
      { no: 5, name: "net_base", kind: "message", T: f.Amount },
      { no: 6, name: "as_of", kind: "message", T: f.Ordinal },
    ])));
};
