// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CandleSeries =
      t.Candle =
      t.CandleSpec =
      t.Measure =
      t.Resolution =
        void 0));
  let i = e.r(376244),
    m = e.r(391770);
  (((a = r || (t.Resolution = r = {}))[(a.RESOLUTION_UNSPECIFIED = 0)] =
    "RESOLUTION_UNSPECIFIED"),
    (a[(a.RESOLUTION_1S = 1)] = "RESOLUTION_1S"),
    (a[(a.RESOLUTION_15S = 2)] = "RESOLUTION_15S"),
    (a[(a.RESOLUTION_30S = 3)] = "RESOLUTION_30S"),
    (a[(a.RESOLUTION_1M = 4)] = "RESOLUTION_1M"),
    (a[(a.RESOLUTION_5M = 5)] = "RESOLUTION_5M"),
    (a[(a.RESOLUTION_15M = 6)] = "RESOLUTION_15M"),
    (a[(a.RESOLUTION_1H = 7)] = "RESOLUTION_1H"),
    (a[(a.RESOLUTION_4H = 8)] = "RESOLUTION_4H"),
    (a[(a.RESOLUTION_1D = 9)] = "RESOLUTION_1D"),
    i.proto3.util.setEnumType(r, "pumpfun.trading.v1.Resolution", [
      { no: 0, name: "RESOLUTION_UNSPECIFIED" },
      { no: 1, name: "RESOLUTION_1S" },
      { no: 2, name: "RESOLUTION_15S" },
      { no: 3, name: "RESOLUTION_30S" },
      { no: 4, name: "RESOLUTION_1M" },
      { no: 5, name: "RESOLUTION_5M" },
      { no: 6, name: "RESOLUTION_15M" },
      { no: 7, name: "RESOLUTION_1H" },
      { no: 8, name: "RESOLUTION_4H" },
      { no: 9, name: "RESOLUTION_1D" },
    ]),
    ((s = o || (t.Measure = o = {}))[(s.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (s[(s.PRICE_USD = 1)] = "PRICE_USD"),
    (s[(s.PRICE_QUOTE = 2)] = "PRICE_QUOTE"),
    (s[(s.PRICE_NATIVE = 3)] = "PRICE_NATIVE"),
    (s[(s.MARKET_CAP_USD = 4)] = "MARKET_CAP_USD"),
    i.proto3.util.setEnumType(o, "pumpfun.trading.v1.Measure", [
      { no: 0, name: "MEASURE_UNSPECIFIED" },
      { no: 1, name: "MEASURE_PRICE_USD" },
      { no: 2, name: "MEASURE_PRICE_QUOTE" },
      { no: 3, name: "MEASURE_PRICE_NATIVE" },
      { no: 4, name: "MEASURE_MARKET_CAP_USD" },
    ]));
  class l extends i.Message {
    constructor(e) {
      (super(),
        (this.res = r.RESOLUTION_UNSPECIFIED),
        (this.measure = o.UNSPECIFIED),
        i.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new l().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new l().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new l().fromJsonString(e, n);
    }
    static equals(e, n) {
      return i.proto3.util.equals(l, e, n);
    }
  }
  ((t.CandleSpec = l),
    (l.runtime = i.proto3),
    (l.typeName = "pumpfun.trading.v1.CandleSpec"),
    (l.fields = i.proto3.util.newFieldList(() => [
      { no: 1, name: "res", kind: "enum", T: i.proto3.getEnumType(r) },
      { no: 2, name: "measure", kind: "enum", T: i.proto3.getEnumType(o) },
    ])));
  class u extends i.Message {
    constructor(e) {
      (super(),
        (this.openTimeMs = i.protoInt64.zero),
        (this.res = r.RESOLUTION_UNSPECIFIED),
        (this.measure = o.UNSPECIFIED),
        (this.open = ""),
        (this.high = ""),
        (this.low = ""),
        (this.close = ""),
        (this.trades = 0),
        (this.final = !1),
        (this.isCorrection = !1),
        i.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new u().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new u().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new u().fromJsonString(e, n);
    }
    static equals(e, n) {
      return i.proto3.util.equals(u, e, n);
    }
  }
  ((t.Candle = u),
    (u.runtime = i.proto3),
    (u.typeName = "pumpfun.trading.v1.Candle"),
    (u.fields = i.proto3.util.newFieldList(() => [
      { no: 1, name: "open_time_ms", kind: "scalar", T: 3 },
      { no: 2, name: "res", kind: "enum", T: i.proto3.getEnumType(r) },
      { no: 3, name: "measure", kind: "enum", T: i.proto3.getEnumType(o) },
      { no: 4, name: "open", kind: "scalar", T: 9 },
      { no: 5, name: "high", kind: "scalar", T: 9 },
      { no: 6, name: "low", kind: "scalar", T: 9 },
      { no: 7, name: "close", kind: "scalar", T: 9 },
      { no: 8, name: "volume_usd", kind: "message", T: m.Usd },
      { no: 9, name: "trades", kind: "scalar", T: 13 },
      { no: 10, name: "final", kind: "scalar", T: 8 },
      { no: 11, name: "is_correction", kind: "scalar", T: 8 },
      { no: 12, name: "pool", kind: "message", T: m.PoolRef },
      { no: 13, name: "as_of", kind: "message", T: m.Ordinal },
    ])));
  class d extends i.Message {
    constructor(e) {
      (super(),
        (this.candles = []),
        (this.hasOlder = !1),
        (this.source = m.DataSource.UNSPECIFIED),
        (this.createdMs = i.protoInt64.zero),
        i.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new d().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new d().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new d().fromJsonString(e, n);
    }
    static equals(e, n) {
      return i.proto3.util.equals(d, e, n);
    }
  }
  ((t.CandleSeries = d),
    (d.runtime = i.proto3),
    (d.typeName = "pumpfun.trading.v1.CandleSeries"),
    (d.fields = i.proto3.util.newFieldList(() => [
      { no: 1, name: "candles", kind: "message", T: u, repeated: !0 },
      { no: 2, name: "has_older", kind: "scalar", T: 8 },
      { no: 3, name: "cagg_watermark", kind: "message", T: m.Ordinal },
      { no: 4, name: "graduated_at", kind: "message", T: m.Ordinal },
      { no: 5, name: "supply_used", kind: "message", T: m.Amount },
      {
        no: 6,
        name: "source",
        kind: "enum",
        T: i.proto3.getEnumType(m.DataSource),
      },
      { no: 7, name: "served", kind: "message", T: l },
      { no: 8, name: "created_ms", kind: "scalar", T: 3 },
    ])));
};
