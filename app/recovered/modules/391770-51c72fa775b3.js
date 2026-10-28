// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.PageToken =
      t.Money =
      t.Usd =
      t.Amount =
      t.Ordinal =
      t.AssetRef =
      t.PoolRef =
      t.CoinRef =
      t.Period =
      t.DataSource =
      t.Commitment =
        void 0));
  let l = e.r(376244);
  (((s = r || (t.Commitment = r = {}))[(s.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (s[(s.PROCESSED = 1)] = "PROCESSED"),
    (s[(s.CONFIRMED = 2)] = "CONFIRMED"),
    (s[(s.FINALIZED = 3)] = "FINALIZED"),
    l.proto3.util.setEnumType(r, "pumpfun.trading.v1.Commitment", [
      { no: 0, name: "COMMITMENT_UNSPECIFIED" },
      { no: 1, name: "COMMITMENT_PROCESSED" },
      { no: 2, name: "COMMITMENT_CONFIRMED" },
      { no: 3, name: "COMMITMENT_FINALIZED" },
    ]),
    ((i = o || (t.DataSource = o = {}))[(i.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (i[(i.INDEXED = 1)] = "INDEXED"),
    (i[(i.VENDOR = 2)] = "VENDOR"),
    l.proto3.util.setEnumType(o, "pumpfun.trading.v1.DataSource", [
      { no: 0, name: "DATA_SOURCE_UNSPECIFIED" },
      { no: 1, name: "DATA_SOURCE_INDEXED" },
      { no: 2, name: "DATA_SOURCE_VENDOR" },
    ]),
    ((m = a || (t.Period = a = {}))[(m.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (m[(m.D1 = 1)] = "D1"),
    (m[(m.D7 = 2)] = "D7"),
    (m[(m.D30 = 3)] = "D30"),
    l.proto3.util.setEnumType(a, "pumpfun.trading.v1.Period", [
      { no: 0, name: "PERIOD_UNSPECIFIED" },
      { no: 1, name: "PERIOD_D1" },
      { no: 2, name: "PERIOD_D7" },
      { no: 3, name: "PERIOD_D30" },
    ]));
  class u extends l.Message {
    constructor(e) {
      (super(),
        (this.chainId = ""),
        (this.address = ""),
        l.proto3.util.initPartial(e, this));
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
      return l.proto3.util.equals(u, e, n);
    }
  }
  ((t.CoinRef = u),
    (u.runtime = l.proto3),
    (u.typeName = "pumpfun.trading.v1.CoinRef"),
    (u.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "chain_id", kind: "scalar", T: 9 },
      { no: 2, name: "address", kind: "scalar", T: 9 },
    ])));
  class d extends l.Message {
    constructor(e) {
      (super(),
        (this.chainId = ""),
        (this.address = ""),
        l.proto3.util.initPartial(e, this));
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
      return l.proto3.util.equals(d, e, n);
    }
  }
  ((t.PoolRef = d),
    (d.runtime = l.proto3),
    (d.typeName = "pumpfun.trading.v1.PoolRef"),
    (d.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "chain_id", kind: "scalar", T: 9 },
      { no: 2, name: "address", kind: "scalar", T: 9 },
    ])));
  class p extends l.Message {
    constructor(e) {
      (super(),
        (this.symbol = ""),
        (this.decimals = 0),
        (this.imageUrl = ""),
        l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new p().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new p().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new p().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(p, e, n);
    }
  }
  ((t.AssetRef = p),
    (p.runtime = l.proto3),
    (p.typeName = "pumpfun.trading.v1.AssetRef"),
    (p.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "id", kind: "message", T: u },
      { no: 2, name: "symbol", kind: "scalar", T: 9 },
      { no: 3, name: "decimals", kind: "scalar", T: 13 },
      { no: 4, name: "image_url", kind: "scalar", T: 9 },
    ])));
  class c extends l.Message {
    constructor(e) {
      (super(),
        (this.blockId = l.protoInt64.zero),
        (this.txIndex = 0),
        (this.eventIndex = 0),
        (this.commitment = r.UNSPECIFIED),
        l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new c().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new c().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new c().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(c, e, n);
    }
  }
  ((t.Ordinal = c),
    (c.runtime = l.proto3),
    (c.typeName = "pumpfun.trading.v1.Ordinal"),
    (c.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "block_id", kind: "scalar", T: 4 },
      { no: 2, name: "tx_index", kind: "scalar", T: 13 },
      { no: 3, name: "event_index", kind: "scalar", T: 13 },
      { no: 4, name: "block_time", kind: "message", T: l.Timestamp },
      { no: 5, name: "commitment", kind: "enum", T: l.proto3.getEnumType(r) },
    ])));
  class T extends l.Message {
    constructor(e) {
      (super(),
        (this.raw = ""),
        (this.decimals = 0),
        l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new T().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new T().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new T().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(T, e, n);
    }
  }
  ((t.Amount = T),
    (T.runtime = l.proto3),
    (T.typeName = "pumpfun.trading.v1.Amount"),
    (T.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "raw", kind: "scalar", T: 9 },
      { no: 2, name: "decimals", kind: "scalar", T: 13 },
    ])));
  class E extends l.Message {
    constructor(e) {
      (super(), (this.value = ""), l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new E().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new E().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new E().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(E, e, n);
    }
  }
  ((t.Usd = E),
    (E.runtime = l.proto3),
    (E.typeName = "pumpfun.trading.v1.Usd"),
    (E.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 9 },
    ])));
  class f extends l.Message {
    constructor(e) {
      (super(), (this.native = ""), l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new f().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new f().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new f().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(f, e, n);
    }
  }
  ((t.Money = f),
    (f.runtime = l.proto3),
    (f.typeName = "pumpfun.trading.v1.Money"),
    (f.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "usd", kind: "message", T: E },
      { no: 2, name: "native", kind: "scalar", T: 9 },
      { no: 3, name: "native_asset", kind: "message", T: p },
    ])));
  class _ extends l.Message {
    constructor(e) {
      (super(),
        (this.opaque = new Uint8Array(0)),
        l.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new _().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new _().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new _().fromJsonString(e, n);
    }
    static equals(e, n) {
      return l.proto3.util.equals(_, e, n);
    }
  }
  ((t.PageToken = _),
    (_.runtime = l.proto3),
    (_.typeName = "pumpfun.trading.v1.PageToken"),
    (_.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "opaque", kind: "scalar", T: 12 },
    ])));
};
