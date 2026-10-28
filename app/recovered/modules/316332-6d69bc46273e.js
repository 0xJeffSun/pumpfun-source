// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m, l, u, d, p;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Frame =
      t.ListFrame =
      t.ListPrices =
      t.ListPatch =
      t.ListSnapshot =
      t.ListMove =
      t.ListAdd =
      t.ListOp =
      t.WalletFrame =
      t.CoinFrame =
      t.HoldersUpdate =
      t.BlockAggregates =
      t.BlockTrades =
      t.Mark =
      t.End =
      t.Gap =
      t.Heartbeat =
      t.Subscription =
      t.WatchRequest =
      t.WalletFrameKind =
      t.FrameKind =
      t.EndReason =
      t.Lane =
      t.Part =
        void 0));
  let c = e.r(376244),
    T = e.r(790066),
    E = e.r(480780),
    f = e.r(391770),
    _ = e.r(478284),
    g = e.r(92622),
    S = e.r(804140);
  (((m = r || (t.Part = r = {}))[(m.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (m[(m.MARKET = 1)] = "MARKET"),
    (m[(m.TRADES = 2)] = "TRADES"),
    (m[(m.PHASE = 3)] = "PHASE"),
    (m[(m.META = 4)] = "META"),
    (m[(m.HOLDERS = 5)] = "HOLDERS"),
    (m[(m.POSITION = 6)] = "POSITION"),
    (m[(m.MARKS = 7)] = "MARKS"),
    (m[(m.CANDLES = 8)] = "CANDLES"),
    (m[(m.BALANCES = 9)] = "BALANCES"),
    (m[(m.POSITIONS = 10)] = "POSITIONS"),
    (m[(m.SUMMARY = 11)] = "SUMMARY"),
    c.proto3.util.setEnumType(r, "pumpfun.trading.v1.Part", [
      { no: 0, name: "PART_UNSPECIFIED" },
      { no: 1, name: "PART_MARKET" },
      { no: 2, name: "PART_TRADES" },
      { no: 3, name: "PART_PHASE" },
      { no: 4, name: "PART_META" },
      { no: 5, name: "PART_HOLDERS" },
      { no: 6, name: "PART_POSITION" },
      { no: 7, name: "PART_MARKS" },
      { no: 8, name: "PART_CANDLES" },
      { no: 9, name: "PART_BALANCES" },
      { no: 10, name: "PART_POSITIONS" },
      { no: 11, name: "PART_SUMMARY" },
    ]),
    ((l = o || (t.Lane = o = {}))[(l.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (l[(l.PROCESSED_TAPE = 1)] = "PROCESSED_TAPE"),
    (l[(l.CONFIRMED_TAPE = 2)] = "CONFIRMED_TAPE"),
    (l[(l.LIFECYCLE = 3)] = "LIFECYCLE"),
    (l[(l.MARKS = 4)] = "MARKS"),
    (l[(l.BALANCES = 5)] = "BALANCES"),
    (l[(l.HOLDERS = 6)] = "HOLDERS"),
    (l[(l.LEDGER = 7)] = "LEDGER"),
    (l[(l.TSDB = 8)] = "TSDB"),
    (l[(l.HYPERCORE = 9)] = "HYPERCORE"),
    (l[(l.TON = 10)] = "TON"),
    (l[(l.NEAR = 11)] = "NEAR"),
    (l[(l.STARKNET = 12)] = "STARKNET"),
    c.proto3.util.setEnumType(o, "pumpfun.trading.v1.Lane", [
      { no: 0, name: "LANE_UNSPECIFIED" },
      { no: 1, name: "LANE_PROCESSED_TAPE" },
      { no: 2, name: "LANE_CONFIRMED_TAPE" },
      { no: 3, name: "LANE_LIFECYCLE" },
      { no: 4, name: "LANE_MARKS" },
      { no: 5, name: "LANE_BALANCES" },
      { no: 6, name: "LANE_HOLDERS" },
      { no: 7, name: "LANE_LEDGER" },
      { no: 8, name: "LANE_TSDB" },
      { no: 9, name: "LANE_HYPERCORE" },
      { no: 10, name: "LANE_TON" },
      { no: 11, name: "LANE_NEAR" },
      { no: 12, name: "LANE_STARKNET" },
    ]),
    ((u = a || (t.EndReason = a = {}))[(u.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (u[(u.UNSUBSCRIBED = 1)] = "UNSUBSCRIBED"),
    (u[(u.UNAVAILABLE = 3)] = "UNAVAILABLE"),
    (u[(u.NOT_FOUND = 4)] = "NOT_FOUND"),
    (u[(u.PERMISSION_DENIED = 5)] = "PERMISSION_DENIED"),
    c.proto3.util.setEnumType(a, "pumpfun.trading.v1.EndReason", [
      { no: 0, name: "END_REASON_UNSPECIFIED" },
      { no: 1, name: "END_REASON_UNSUBSCRIBED" },
      { no: 3, name: "END_REASON_UNAVAILABLE" },
      { no: 4, name: "END_REASON_NOT_FOUND" },
      { no: 5, name: "END_REASON_PERMISSION_DENIED" },
    ]),
    ((d = s || (t.FrameKind = s = {}))[(d.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (d[(d.SNAPSHOT = 1)] = "SNAPSHOT"),
    (d[(d.LIVE = 2)] = "LIVE"),
    (d[(d.COMMITMENT = 3)] = "COMMITMENT"),
    (d[(d.CORRECTION = 4)] = "CORRECTION"),
    (d[(d.REVALUE = 5)] = "REVALUE"),
    c.proto3.util.setEnumType(s, "pumpfun.trading.v1.FrameKind", [
      { no: 0, name: "FRAME_KIND_UNSPECIFIED" },
      { no: 1, name: "FRAME_KIND_SNAPSHOT" },
      { no: 2, name: "FRAME_KIND_LIVE" },
      { no: 3, name: "FRAME_KIND_COMMITMENT" },
      { no: 4, name: "FRAME_KIND_CORRECTION" },
      { no: 5, name: "FRAME_KIND_REVALUE" },
    ]),
    ((p = i || (t.WalletFrameKind = i = {}))[(p.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (p[(p.SNAPSHOT = 1)] = "SNAPSHOT"),
    (p[(p.LEDGER = 2)] = "LEDGER"),
    (p[(p.REVALUE = 3)] = "REVALUE"),
    c.proto3.util.setEnumType(i, "pumpfun.trading.v1.WalletFrameKind", [
      { no: 0, name: "WALLET_FRAME_KIND_UNSPECIFIED" },
      { no: 1, name: "WALLET_FRAME_KIND_SNAPSHOT" },
      { no: 2, name: "WALLET_FRAME_KIND_LEDGER" },
      { no: 3, name: "WALLET_FRAME_KIND_REVALUE" },
    ]));
  class N extends c.Message {
    constructor(e) {
      (super(),
        (this.subscribe = []),
        (this.unsubscribe = []),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(N, e, n);
    }
  }
  ((t.WatchRequest = N),
    (N.runtime = c.proto3),
    (N.typeName = "pumpfun.trading.v1.WatchRequest"),
    (N.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "subscribe", kind: "message", T: I, repeated: !0 },
      { no: 2, name: "unsubscribe", kind: "scalar", T: 9, repeated: !0 },
      { no: 3, name: "viewer", kind: "message", T: T.UserWalletSet },
    ])));
  class I extends c.Message {
    constructor(e) {
      (super(),
        (this.topic = ""),
        (this.parts = []),
        (this.candles = []),
        (this.commitment = f.Commitment.UNSPECIFIED),
        (this.filters = { case: void 0 }),
        (this.lastVersion = c.protoInt64.zero),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(I, e, n);
    }
  }
  ((t.Subscription = I),
    (I.runtime = c.proto3),
    (I.typeName = "pumpfun.trading.v1.Subscription"),
    (I.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "topic", kind: "scalar", T: 9 },
      {
        no: 2,
        name: "parts",
        kind: "enum",
        T: c.proto3.getEnumType(r),
        repeated: !0,
      },
      {
        no: 3,
        name: "candles",
        kind: "message",
        T: E.CandleSpec,
        repeated: !0,
      },
      {
        no: 4,
        name: "commitment",
        kind: "enum",
        T: c.proto3.getEnumType(f.Commitment),
      },
      { no: 5, name: "since", kind: "message", T: f.Ordinal },
      {
        no: 6,
        name: "list",
        kind: "message",
        T: _.ListFilters,
        oneof: "filters",
      },
      {
        no: 8,
        name: "position",
        kind: "message",
        T: T.PositionFilter,
        oneof: "filters",
      },
      { no: 7, name: "last_version", kind: "scalar", T: 4 },
    ])));
  class h extends c.Message {
    constructor(e) {
      (super(),
        (this.chainId = ""),
        (this.lagMs = 0),
        (this.degraded = !1),
        (this.degradedLanes = []),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(h, e, n);
    }
  }
  ((t.Heartbeat = h),
    (h.runtime = c.proto3),
    (h.typeName = "pumpfun.trading.v1.Heartbeat"),
    (h.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "chain_id", kind: "scalar", T: 9 },
      { no: 2, name: "head", kind: "message", T: f.Ordinal },
      { no: 3, name: "lag_ms", kind: "scalar", T: 13 },
      { no: 4, name: "degraded", kind: "scalar", T: 8 },
      {
        no: 5,
        name: "degraded_lanes",
        kind: "enum",
        T: c.proto3.getEnumType(o),
        repeated: !0,
      },
    ])));
  class y extends c.Message {
    constructor(e) {
      (super(), c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new y().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new y().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new y().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(y, e, n);
    }
  }
  ((t.Gap = y),
    (y.runtime = c.proto3),
    (y.typeName = "pumpfun.trading.v1.Gap"),
    (y.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "last_delivered", kind: "message", T: f.Ordinal },
      { no: 2, name: "ring_floor", kind: "message", T: f.Ordinal },
    ])));
  class k extends c.Message {
    constructor(e) {
      (super(),
        (this.reason = a.UNSPECIFIED),
        (this.detail = ""),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new k().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new k().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new k().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(k, e, n);
    }
  }
  ((t.End = k),
    (k.runtime = c.proto3),
    (k.typeName = "pumpfun.trading.v1.End"),
    (k.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "reason", kind: "enum", T: c.proto3.getEnumType(a) },
      { no: 2, name: "last", kind: "message", T: f.Ordinal },
      { no: 3, name: "detail", kind: "scalar", T: 9 },
    ])));
  class O extends c.Message {
    constructor(e) {
      (super(), (this.degraded = !1), c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new O().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new O().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new O().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(O, e, n);
    }
  }
  ((t.Mark = O),
    (O.runtime = c.proto3),
    (O.typeName = "pumpfun.trading.v1.Mark"),
    (O.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "asset", kind: "message", T: f.AssetRef },
      { no: 2, name: "price_usd", kind: "message", T: f.Usd },
      { no: 3, name: "at", kind: "message", T: c.Timestamp },
      { no: 4, name: "degraded", kind: "scalar", T: 8 },
    ])));
  class R extends c.Message {
    constructor(e) {
      (super(),
        (this.rows = []),
        (this.revoked = []),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new R().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new R().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new R().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(R, e, n);
    }
  }
  ((t.BlockTrades = R),
    (R.runtime = c.proto3),
    (R.typeName = "pumpfun.trading.v1.BlockTrades"),
    (R.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "rows", kind: "message", T: g.TradeRow, repeated: !0 },
      {
        no: 2,
        name: "revoked",
        kind: "message",
        T: g.TradeRevoked,
        repeated: !0,
      },
    ])));
  class P extends c.Message {
    constructor(e) {
      (super(),
        (this.trades = 0),
        (this.buys = 0),
        (this.sells = 0),
        (this.traders = 0),
        (this.droppedRows = 0),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new P().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new P().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new P().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(P, e, n);
    }
  }
  ((t.BlockAggregates = P),
    (P.runtime = c.proto3),
    (P.typeName = "pumpfun.trading.v1.BlockAggregates"),
    (P.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "trades", kind: "scalar", T: 13 },
      { no: 2, name: "buys", kind: "scalar", T: 13 },
      { no: 3, name: "sells", kind: "scalar", T: 13 },
      { no: 4, name: "buy_volume_usd", kind: "message", T: f.Usd },
      { no: 5, name: "sell_volume_usd", kind: "message", T: f.Usd },
      { no: 6, name: "traders", kind: "scalar", T: 13 },
      { no: 7, name: "dropped_rows", kind: "scalar", T: 13 },
      { no: 8, name: "net_base", kind: "message", T: f.Amount },
    ])));
  class A extends c.Message {
    constructor(e) {
      (super(), c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new A().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new A().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new A().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(A, e, n);
    }
  }
  ((t.HoldersUpdate = A),
    (A.runtime = c.proto3),
    (A.typeName = "pumpfun.trading.v1.HoldersUpdate"),
    (A.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "summary", kind: "message", T: _.HoldersSummary },
      { no: 2, name: "delta", kind: "message", T: S.HolderDelta },
    ])));
  class D extends c.Message {
    constructor(e) {
      (super(),
        (this.kind = s.UNSPECIFIED),
        (this.replayed = !1),
        (this.source = f.DataSource.UNSPECIFIED),
        (this.followed = []),
        (this.marks = []),
        (this.candles = []),
        (this.unavailable = []),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new D().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new D().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new D().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(D, e, n);
    }
  }
  ((t.CoinFrame = D),
    (D.runtime = c.proto3),
    (D.typeName = "pumpfun.trading.v1.CoinFrame"),
    (D.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "id", kind: "message", T: f.CoinRef },
      { no: 2, name: "block", kind: "message", T: f.Ordinal },
      { no: 3, name: "kind", kind: "enum", T: c.proto3.getEnumType(s) },
      { no: 4, name: "replayed", kind: "scalar", T: 8 },
      {
        no: 5,
        name: "source",
        kind: "enum",
        T: c.proto3.getEnumType(f.DataSource),
      },
      { no: 6, name: "market", kind: "message", T: _.MarketState },
      { no: 7, name: "trades", kind: "message", T: R },
      { no: 8, name: "aggregates", kind: "message", T: P },
      { no: 9, name: "phase", kind: "message", T: _.MarketPhase },
      { no: 10, name: "coin", kind: "message", T: _.CoinDetail },
      { no: 11, name: "holders", kind: "message", T: A },
      { no: 12, name: "position", kind: "message", T: T.Position },
      {
        no: 13,
        name: "followed",
        kind: "message",
        T: T.Position,
        repeated: !0,
      },
      { no: 14, name: "marks", kind: "message", T: O, repeated: !0 },
      { no: 15, name: "candles", kind: "message", T: E.Candle, repeated: !0 },
      {
        no: 16,
        name: "unavailable",
        kind: "enum",
        T: c.proto3.getEnumType(r),
        repeated: !0,
      },
    ])));
  class C extends c.Message {
    constructor(e) {
      (super(),
        (this.kind = i.UNSPECIFIED),
        (this.replayed = !1),
        (this.balances = []),
        (this.positions = []),
        (this.trades = []),
        (this.marks = []),
        (this.unavailable = []),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new C().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new C().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new C().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(C, e, n);
    }
  }
  ((t.WalletFrame = C),
    (C.runtime = c.proto3),
    (C.typeName = "pumpfun.trading.v1.WalletFrame"),
    (C.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "wallet", kind: "message", T: T.UserWalletSet },
      { no: 2, name: "as_of", kind: "message", T: f.Ordinal },
      { no: 3, name: "kind", kind: "enum", T: c.proto3.getEnumType(i) },
      { no: 4, name: "replayed", kind: "scalar", T: 8 },
      { no: 5, name: "balances", kind: "message", T: T.Balance, repeated: !0 },
      {
        no: 6,
        name: "positions",
        kind: "message",
        T: T.Position,
        repeated: !0,
      },
      { no: 7, name: "trades", kind: "message", T: g.TradeRow, repeated: !0 },
      { no: 8, name: "summary", kind: "message", T: T.WalletSummary },
      { no: 9, name: "marks", kind: "message", T: O, repeated: !0 },
      {
        no: 10,
        name: "unavailable",
        kind: "enum",
        T: c.proto3.getEnumType(r),
        repeated: !0,
      },
    ])));
  class L extends c.Message {
    constructor(e) {
      (super(),
        (this.op = { case: void 0 }),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new L().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new L().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new L().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(L, e, n);
    }
  }
  ((t.ListOp = L),
    (L.runtime = c.proto3),
    (L.typeName = "pumpfun.trading.v1.ListOp"),
    (L.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "add", kind: "message", T: w, oneof: "op" },
      { no: 2, name: "remove", kind: "message", T: f.CoinRef, oneof: "op" },
      { no: 3, name: "move", kind: "message", T: U, oneof: "op" },
    ])));
  class w extends c.Message {
    constructor(e) {
      (super(), (this.rank = 0), c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new w().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new w().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new w().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(w, e, n);
    }
  }
  ((t.ListAdd = w),
    (w.runtime = c.proto3),
    (w.typeName = "pumpfun.trading.v1.ListAdd"),
    (w.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "card", kind: "message", T: _.CoinCard },
      { no: 2, name: "rank", kind: "scalar", T: 13 },
    ])));
  class U extends c.Message {
    constructor(e) {
      (super(), (this.rank = 0), c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new U().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new U().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new U().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(U, e, n);
    }
  }
  ((t.ListMove = U),
    (U.runtime = c.proto3),
    (U.typeName = "pumpfun.trading.v1.ListMove"),
    (U.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "ref", kind: "message", T: f.CoinRef },
      { no: 2, name: "rank", kind: "scalar", T: 13 },
    ])));
  class F extends c.Message {
    constructor(e) {
      (super(),
        (this.cards = []),
        (this.marks = []),
        c.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new F().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new F().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new F().fromJsonString(e, n);
    }
    static equals(e, n) {
      return c.proto3.util.equals(F, e, n);
    }
  }
  ((t.ListSnapshot = F),
    (F.runtime = c.proto3),
    (F.typeName = "pumpfun.trading.v1.ListSnapshot"),
    (F.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "cards", kind: "message", T: _.CoinCard, repeated: !0 },
      { no: 2, name: "aggregates", kind: "message", T: _.ListAggregates },
      { no: 3, name: "marks", kind: "message", T: O, repeated: !0 },
    ])));
  class v extends c.Message {
    constructor(e) {
      (super(),
        (this.ops = []),
        (this.marks = []),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(v, e, n);
    }
  }
  ((t.ListPatch = v),
    (v.runtime = c.proto3),
    (v.typeName = "pumpfun.trading.v1.ListPatch"),
    (v.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "ops", kind: "message", T: L, repeated: !0 },
      { no: 2, name: "aggregates", kind: "message", T: _.ListAggregates },
      { no: 3, name: "marks", kind: "message", T: O, repeated: !0 },
    ])));
  class M extends c.Message {
    constructor(e) {
      (super(),
        (this.coin = []),
        (this.markPx = []),
        (this.changeBps = []),
        (this.full = !1),
        (this.stale = []),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(M, e, n);
    }
  }
  ((t.ListPrices = M),
    (M.runtime = c.proto3),
    (M.typeName = "pumpfun.trading.v1.ListPrices"),
    (M.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "scalar", T: 9, repeated: !0 },
      { no: 2, name: "mark_px", kind: "scalar", T: 1, repeated: !0 },
      { no: 3, name: "change_bps", kind: "scalar", T: 17, repeated: !0 },
      { no: 4, name: "full", kind: "scalar", T: 8 },
      { no: 5, name: "stale", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class J extends c.Message {
    constructor(e) {
      (super(),
        (this.kind = _.ListKind.UNSPECIFIED),
        (this.version = c.protoInt64.zero),
        (this.replayed = !1),
        (this.body = { case: void 0 }),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(J, e, n);
    }
  }
  ((t.ListFrame = J),
    (J.runtime = c.proto3),
    (J.typeName = "pumpfun.trading.v1.ListFrame"),
    (J.fields = c.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "kind",
        kind: "enum",
        T: c.proto3.getEnumType(_.ListKind),
      },
      { no: 2, name: "arg", kind: "message", T: _.ListArg },
      { no: 3, name: "version", kind: "scalar", T: 4 },
      { no: 4, name: "as_of", kind: "message", T: f.Ordinal },
      { no: 5, name: "replayed", kind: "scalar", T: 8 },
      { no: 6, name: "snapshot", kind: "message", T: F, oneof: "body" },
      { no: 7, name: "patch", kind: "message", T: v, oneof: "body" },
      { no: 8, name: "member", kind: "message", T: D, oneof: "body" },
      { no: 9, name: "prices", kind: "message", T: M, oneof: "body" },
    ])));
  class b extends c.Message {
    constructor(e) {
      (super(),
        (this.topic = ""),
        (this.seq = c.protoInt64.zero),
        (this.payload = { case: void 0 }),
        c.proto3.util.initPartial(e, this));
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
      return c.proto3.util.equals(b, e, n);
    }
  }
  ((t.Frame = b),
    (b.runtime = c.proto3),
    (b.typeName = "pumpfun.trading.v1.Frame"),
    (b.fields = c.proto3.util.newFieldList(() => [
      { no: 1, name: "topic", kind: "scalar", T: 9 },
      { no: 2, name: "seq", kind: "scalar", T: 4 },
      { no: 3, name: "coin", kind: "message", T: D, oneof: "payload" },
      { no: 4, name: "wallet", kind: "message", T: C, oneof: "payload" },
      { no: 5, name: "list", kind: "message", T: J, oneof: "payload" },
      { no: 8, name: "heartbeat", kind: "message", T: h, oneof: "payload" },
      { no: 9, name: "gap", kind: "message", T: y, oneof: "payload" },
      { no: 10, name: "end", kind: "message", T: k, oneof: "payload" },
    ])));
};
