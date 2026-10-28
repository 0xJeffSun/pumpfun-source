// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.HolderDelta =
      t.HolderSet =
      t.Holder =
      t.PerpPosition =
      t.PerpCallout =
      t.HolderCallout =
      t.HolderPnl =
      t.HolderTags =
        void 0));
  let r = e.r(376244),
    o = e.r(391770),
    a = e.r(92622);
  class s extends r.Message {
    constructor(e) {
      (super(),
        (this.isDev = !1),
        (this.isSniper = !1),
        (this.isBundler = !1),
        (this.isBondingCurve = !1),
        (this.isPool = !1),
        (this.isKol = !1),
        (this.label = ""),
        r.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new s().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new s().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new s().fromJsonString(e, n);
    }
    static equals(e, n) {
      return r.proto3.util.equals(s, e, n);
    }
  }
  ((t.HolderTags = s),
    (s.runtime = r.proto3),
    (s.typeName = "pumpfun.trading.v1.HolderTags"),
    (s.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "is_dev", kind: "scalar", T: 8 },
      { no: 2, name: "is_sniper", kind: "scalar", T: 8 },
      { no: 3, name: "is_bundler", kind: "scalar", T: 8 },
      { no: 4, name: "is_bonding_curve", kind: "scalar", T: 8 },
      { no: 5, name: "is_pool", kind: "scalar", T: 8 },
      { no: 6, name: "is_kol", kind: "scalar", T: 8 },
      { no: 8, name: "label", kind: "scalar", T: 9 },
    ])));
  class i extends r.Message {
    constructor(e) {
      (super(), (this.multipleBps = 0), r.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new i().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new i().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new i().fromJsonString(e, n);
    }
    static equals(e, n) {
      return r.proto3.util.equals(i, e, n);
    }
  }
  ((t.HolderPnl = i),
    (i.runtime = r.proto3),
    (i.typeName = "pumpfun.trading.v1.HolderPnl"),
    (i.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "cost_basis", kind: "message", T: o.Money },
      { no: 2, name: "bought", kind: "message", T: o.Money },
      { no: 3, name: "sold", kind: "message", T: o.Money },
      { no: 4, name: "realized", kind: "message", T: o.Money },
      { no: 5, name: "unrealized", kind: "message", T: o.Money },
      { no: 6, name: "multiple_bps", kind: "scalar", T: 13 },
      { no: 7, name: "as_of", kind: "message", T: o.Ordinal },
    ])));
  class m extends r.Message {
    constructor(e) {
      (super(),
        (this.calloutId = ""),
        (this.authorUserId = ""),
        (this.multipleBps = 0),
        (this.thesis = ""),
        r.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new m().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new m().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new m().fromJsonString(e, n);
    }
    static equals(e, n) {
      return r.proto3.util.equals(m, e, n);
    }
  }
  ((t.HolderCallout = m),
    (m.runtime = r.proto3),
    (m.typeName = "pumpfun.trading.v1.HolderCallout"),
    (m.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "callout_id", kind: "scalar", T: 9 },
      { no: 2, name: "author_user_id", kind: "scalar", T: 9 },
      { no: 3, name: "created_at", kind: "message", T: r.Timestamp },
      { no: 4, name: "callout_price_usd", kind: "message", T: o.Usd },
      { no: 5, name: "called_out_at_mcap_usd", kind: "message", T: o.Usd },
      { no: 6, name: "multiple_bps", kind: "scalar", T: 13 },
      { no: 7, name: "thesis", kind: "scalar", T: 9 },
      { no: 8, name: "cost_basis_at_callout", kind: "message", T: o.Money },
      { no: 9, name: "perp", kind: "message", T: l },
    ])));
  class l extends r.Message {
    constructor(e) {
      (super(),
        (this.side = a.PerpSide.UNSPECIFIED),
        (this.leverageBps = 0),
        r.proto3.util.initPartial(e, this));
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
      return r.proto3.util.equals(l, e, n);
    }
  }
  ((t.PerpCallout = l),
    (l.runtime = r.proto3),
    (l.typeName = "pumpfun.trading.v1.PerpCallout"),
    (l.fields = r.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "side",
        kind: "enum",
        T: r.proto3.getEnumType(a.PerpSide),
      },
      { no: 2, name: "leverage_bps", kind: "scalar", T: 5 },
      { no: 3, name: "entry_px", kind: "message", T: o.Usd },
      { no: 4, name: "close_px", kind: "message", T: o.Usd },
      { no: 5, name: "closed_at", kind: "message", T: r.Timestamp },
    ])));
  class u extends r.Message {
    constructor(e) {
      (super(),
        (this.side = a.PerpSide.UNSPECIFIED),
        (this.leverageBps = 0),
        (this.isCross = !1),
        (this.roeBps = 0),
        (this.maxLeverage = 0),
        (this.dex = ""),
        r.proto3.util.initPartial(e, this));
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
      return r.proto3.util.equals(u, e, n);
    }
  }
  ((t.PerpPosition = u),
    (u.runtime = r.proto3),
    (u.typeName = "pumpfun.trading.v1.PerpPosition"),
    (u.fields = r.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "side",
        kind: "enum",
        T: r.proto3.getEnumType(a.PerpSide),
      },
      { no: 2, name: "entry_px", kind: "message", T: o.Usd },
      { no: 3, name: "mark_px", kind: "message", T: o.Usd },
      { no: 4, name: "liquidation_px", kind: "message", T: o.Usd },
      { no: 5, name: "leverage_bps", kind: "scalar", T: 5 },
      { no: 6, name: "is_cross", kind: "scalar", T: 8 },
      { no: 7, name: "margin_used", kind: "message", T: o.Money },
      { no: 8, name: "equity", kind: "message", T: o.Money },
      { no: 9, name: "notional", kind: "message", T: o.Money },
      { no: 10, name: "funding_since_open", kind: "message", T: o.Money },
      { no: 11, name: "funding_all_time", kind: "message", T: o.Money },
      { no: 12, name: "roe_bps", kind: "scalar", T: 5 },
      { no: 13, name: "max_leverage", kind: "scalar", T: 13 },
      { no: 14, name: "dex", kind: "scalar", T: 9 },
      { no: 15, name: "state_as_of", kind: "message", T: r.Timestamp },
    ])));
  class d extends r.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.shareBps = 0),
        r.proto3.util.initPartial(e, this));
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
      return r.proto3.util.equals(d, e, n);
    }
  }
  ((t.Holder = d),
    (d.runtime = r.proto3),
    (d.typeName = "pumpfun.trading.v1.Holder"),
    (d.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "address", kind: "scalar", T: 9 },
      { no: 2, name: "balance", kind: "message", T: o.Amount },
      { no: 3, name: "share_bps", kind: "scalar", T: 13 },
      { no: 4, name: "tags", kind: "message", T: s },
      { no: 5, name: "profile", kind: "message", T: a.TraderRef },
      { no: 6, name: "pnl", kind: "message", T: i },
      { no: 7, name: "callout", kind: "message", T: m },
      { no: 8, name: "as_of", kind: "message", T: o.Ordinal },
      { no: 9, name: "perp", kind: "message", T: u, opt: !0 },
      { no: 10, name: "entered_at", kind: "message", T: r.Timestamp },
    ])));
  class p extends r.Message {
    constructor(e) {
      (super(),
        (this.holders = []),
        (this.source = o.DataSource.UNSPECIFIED),
        r.proto3.util.initPartial(e, this));
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
      return r.proto3.util.equals(p, e, n);
    }
  }
  ((t.HolderSet = p),
    (p.runtime = r.proto3),
    (p.typeName = "pumpfun.trading.v1.HolderSet"),
    (p.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "holders", kind: "message", T: d, repeated: !0 },
      { no: 2, name: "holder_count", kind: "scalar", T: 4, opt: !0 },
      { no: 3, name: "next", kind: "message", T: o.PageToken },
      { no: 4, name: "as_of", kind: "message", T: o.Ordinal },
      {
        no: 5,
        name: "source",
        kind: "enum",
        T: r.proto3.getEnumType(o.DataSource),
      },
      { no: 6, name: "filtered_count", kind: "scalar", T: 4, opt: !0 },
    ])));
  class c extends r.Message {
    constructor(e) {
      (super(),
        (this.upserts = []),
        (this.removed = []),
        r.proto3.util.initPartial(e, this));
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
      return r.proto3.util.equals(c, e, n);
    }
  }
  ((t.HolderDelta = c),
    (c.runtime = r.proto3),
    (c.typeName = "pumpfun.trading.v1.HolderDelta"),
    (c.fields = r.proto3.util.newFieldList(() => [
      { no: 1, name: "upserts", kind: "message", T: d, repeated: !0 },
      { no: 2, name: "removed", kind: "scalar", T: 9, repeated: !0 },
      { no: 3, name: "holder_count", kind: "scalar", T: 4, opt: !0 },
      { no: 4, name: "as_of", kind: "message", T: o.Ordinal },
    ])));
};
