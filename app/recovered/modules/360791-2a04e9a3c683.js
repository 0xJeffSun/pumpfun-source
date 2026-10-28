// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m, l, u;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.HolderRewardsEarnings =
      t.HolderRewardsTotals =
      t.HolderRewardsCoin =
      t.HolderRewardsPayouts =
      t.HolderRewardsQuoteTotals =
      t.HolderRewardsPageQuery =
      t.ShareholderEarnings =
      t.Totals =
      t.ShareholderCoin =
      t.CreatorUnsweptFees =
      t.CreatorUnsweptCoin =
      t.UnsweptBucket =
      t.ReferralEarnings =
      t.ReferralWithdrawal =
      t.CreatorEarnings =
      t.EarningsPoint =
      t.EarningsByQuote =
      t.CoinFees =
      t.FeeEvent =
      t.FeeDistribution =
      t.FeeSharingConfig =
      t.FeeShareholder =
      t.HolderRewardsSort =
      t.UnsweptVenue =
      t.FeeEventKind =
      t.Interval =
        void 0));
  let d = e.r(376244),
    p = e.r(391770);
  (((i = r || (t.Interval = r = {}))[(i.INTERVAL_UNSPECIFIED = 0)] =
    "INTERVAL_UNSPECIFIED"),
    (i[(i.INTERVAL_5M = 1)] = "INTERVAL_5M"),
    (i[(i.INTERVAL_30M = 2)] = "INTERVAL_30M"),
    (i[(i.INTERVAL_1D = 3)] = "INTERVAL_1D"),
    d.proto3.util.setEnumType(r, "pumpfun.trading.v1.Interval", [
      { no: 0, name: "INTERVAL_UNSPECIFIED" },
      { no: 1, name: "INTERVAL_5M" },
      { no: 2, name: "INTERVAL_30M" },
      { no: 3, name: "INTERVAL_1D" },
    ]),
    ((m = o || (t.FeeEventKind = o = {}))[(m.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (m[(m.COIN_CREATED = 1)] = "COIN_CREATED"),
    (m[(m.CONFIG_CREATED = 2)] = "CONFIG_CREATED"),
    (m[(m.CONFIG_UPDATED = 3)] = "CONFIG_UPDATED"),
    (m[(m.ADMIN_TRANSFERRED = 4)] = "ADMIN_TRANSFERRED"),
    (m[(m.ADMIN_REVOKED = 5)] = "ADMIN_REVOKED"),
    (m[(m.CONFIG_RESET = 6)] = "CONFIG_RESET"),
    (m[(m.DISTRIBUTION = 7)] = "DISTRIBUTION"),
    d.proto3.util.setEnumType(o, "pumpfun.trading.v1.FeeEventKind", [
      { no: 0, name: "FEE_EVENT_KIND_UNSPECIFIED" },
      { no: 1, name: "FEE_EVENT_KIND_COIN_CREATED" },
      { no: 2, name: "FEE_EVENT_KIND_CONFIG_CREATED" },
      { no: 3, name: "FEE_EVENT_KIND_CONFIG_UPDATED" },
      { no: 4, name: "FEE_EVENT_KIND_ADMIN_TRANSFERRED" },
      { no: 5, name: "FEE_EVENT_KIND_ADMIN_REVOKED" },
      { no: 6, name: "FEE_EVENT_KIND_CONFIG_RESET" },
      { no: 7, name: "FEE_EVENT_KIND_DISTRIBUTION" },
    ]),
    ((l = a || (t.UnsweptVenue = a = {}))[(l.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (l[(l.BONDING_CURVE = 1)] = "BONDING_CURVE"),
    (l[(l.POOL = 2)] = "POOL"),
    d.proto3.util.setEnumType(a, "pumpfun.trading.v1.UnsweptVenue", [
      { no: 0, name: "UNSWEPT_VENUE_UNSPECIFIED" },
      { no: 1, name: "UNSWEPT_VENUE_BONDING_CURVE" },
      { no: 2, name: "UNSWEPT_VENUE_POOL" },
    ]),
    ((u = s || (t.HolderRewardsSort = s = {}))[(u.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (u[(u.ACCRUED_USD = 1)] = "ACCRUED_USD"),
    (u[(u.ACCRUED_NOW_USD = 2)] = "ACCRUED_NOW_USD"),
    (u[(u.PAID = 3)] = "PAID"),
    (u[(u.LAST_PAYOUT = 4)] = "LAST_PAYOUT"),
    (u[(u.RECIPIENTS = 5)] = "RECIPIENTS"),
    (u[(u.TRADES = 6)] = "TRADES"),
    (u[(u.LAST_TRADE = 7)] = "LAST_TRADE"),
    d.proto3.util.setEnumType(s, "pumpfun.trading.v1.HolderRewardsSort", [
      { no: 0, name: "HOLDER_REWARDS_SORT_UNSPECIFIED" },
      { no: 1, name: "HOLDER_REWARDS_SORT_ACCRUED_USD" },
      { no: 2, name: "HOLDER_REWARDS_SORT_ACCRUED_NOW_USD" },
      { no: 3, name: "HOLDER_REWARDS_SORT_PAID" },
      { no: 4, name: "HOLDER_REWARDS_SORT_LAST_PAYOUT" },
      { no: 5, name: "HOLDER_REWARDS_SORT_RECIPIENTS" },
      { no: 6, name: "HOLDER_REWARDS_SORT_TRADES" },
      { no: 7, name: "HOLDER_REWARDS_SORT_LAST_TRADE" },
    ]));
  class c extends d.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.shareBps = 0),
        (this.isAdmin = !1),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(c, e, n);
    }
  }
  ((t.FeeShareholder = c),
    (c.runtime = d.proto3),
    (c.typeName = "pumpfun.trading.v1.FeeShareholder"),
    (c.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "address", kind: "scalar", T: 9 },
      { no: 2, name: "share_bps", kind: "scalar", T: 13 },
      { no: 3, name: "is_admin", kind: "scalar", T: 8 },
    ])));
  class T extends d.Message {
    constructor(e) {
      (super(),
        (this.configAddress = ""),
        (this.admin = ""),
        (this.adminRevoked = !1),
        (this.shareholders = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(T, e, n);
    }
  }
  ((t.FeeSharingConfig = T),
    (T.runtime = d.proto3),
    (T.typeName = "pumpfun.trading.v1.FeeSharingConfig"),
    (T.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "config_address", kind: "scalar", T: 9 },
      { no: 2, name: "admin", kind: "scalar", T: 9 },
      { no: 3, name: "admin_revoked", kind: "scalar", T: 8 },
      { no: 4, name: "shareholders", kind: "message", T: c, repeated: !0 },
      { no: 5, name: "as_of", kind: "message", T: p.Ordinal },
    ])));
  class E extends d.Message {
    constructor(e) {
      (super(),
        (this.address = ""),
        (this.shareBps = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(E, e, n);
    }
  }
  ((t.FeeDistribution = E),
    (E.runtime = d.proto3),
    (E.typeName = "pumpfun.trading.v1.FeeDistribution"),
    (E.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "address", kind: "scalar", T: 9 },
      { no: 2, name: "share_bps", kind: "scalar", T: 13 },
      { no: 3, name: "amount", kind: "message", T: g },
    ])));
  class f extends d.Message {
    constructor(e) {
      (super(),
        (this.kind = o.UNSPECIFIED),
        (this.txId = ""),
        (this.shareholders = []),
        (this.oldAdmin = ""),
        (this.newAdmin = ""),
        (this.recipients = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(f, e, n);
    }
  }
  ((t.FeeEvent = f),
    (f.runtime = d.proto3),
    (f.typeName = "pumpfun.trading.v1.FeeEvent"),
    (f.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "kind", kind: "enum", T: d.proto3.getEnumType(o) },
      { no: 2, name: "ordinal", kind: "message", T: p.Ordinal },
      { no: 3, name: "tx_id", kind: "scalar", T: 9 },
      { no: 4, name: "shareholders", kind: "message", T: c, repeated: !0 },
      { no: 5, name: "old_admin", kind: "scalar", T: 9 },
      { no: 6, name: "new_admin", kind: "scalar", T: 9 },
      { no: 7, name: "distributed", kind: "message", T: g },
      { no: 8, name: "recipients", kind: "message", T: E, repeated: !0 },
    ])));
  class _ extends d.Message {
    constructor(e) {
      (super(),
        (this.events = []),
        (this.collected = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(_, e, n);
    }
  }
  ((t.CoinFees = _),
    (_.runtime = d.proto3),
    (_.typeName = "pumpfun.trading.v1.CoinFees"),
    (_.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: p.CoinRef },
      { no: 2, name: "sharing", kind: "message", T: T },
      { no: 3, name: "events", kind: "message", T: f, repeated: !0 },
      { no: 4, name: "next", kind: "message", T: p.PageToken },
      { no: 5, name: "collected", kind: "message", T: g, repeated: !0 },
    ])));
  class g extends d.Message {
    constructor(e) {
      (super(), d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(g, e, n);
    }
  }
  ((t.EarningsByQuote = g),
    (g.runtime = d.proto3),
    (g.typeName = "pumpfun.trading.v1.EarningsByQuote"),
    (g.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "quote", kind: "message", T: p.AssetRef },
      { no: 2, name: "amount", kind: "message", T: p.Amount },
      { no: 3, name: "usd", kind: "message", T: p.Usd },
    ])));
  class S extends d.Message {
    constructor(e) {
      (super(), (this.byQuote = []), d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(S, e, n);
    }
  }
  ((t.EarningsPoint = S),
    (S.runtime = d.proto3),
    (S.typeName = "pumpfun.trading.v1.EarningsPoint"),
    (S.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "bucket_start", kind: "message", T: d.Timestamp },
      { no: 2, name: "earned", kind: "message", T: p.Money },
      { no: 3, name: "by_quote", kind: "message", T: g, repeated: !0 },
    ])));
  class N extends d.Message {
    constructor(e) {
      (super(),
        (this.creator = ""),
        (this.earned = []),
        (this.isClaimable = !1),
        (this.series = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(N, e, n);
    }
  }
  ((t.CreatorEarnings = N),
    (N.runtime = d.proto3),
    (N.typeName = "pumpfun.trading.v1.CreatorEarnings"),
    (N.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "creator", kind: "scalar", T: 9 },
      { no: 2, name: "earned", kind: "message", T: g, repeated: !0 },
      { no: 3, name: "claimable", kind: "message", T: p.Money },
      { no: 4, name: "is_claimable", kind: "scalar", T: 8 },
      { no: 5, name: "series", kind: "message", T: S, repeated: !0 },
      { no: 6, name: "as_of", kind: "message", T: p.Ordinal },
    ])));
  class I extends d.Message {
    constructor(e) {
      (super(), (this.txId = ""), d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(I, e, n);
    }
  }
  ((t.ReferralWithdrawal = I),
    (I.runtime = d.proto3),
    (I.typeName = "pumpfun.trading.v1.ReferralWithdrawal"),
    (I.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "ordinal", kind: "message", T: p.Ordinal },
      { no: 2, name: "tx_id", kind: "scalar", T: 9 },
      { no: 3, name: "block_time", kind: "message", T: d.Timestamp },
      { no: 4, name: "amount", kind: "message", T: g },
    ])));
  class h extends d.Message {
    constructor(e) {
      (super(),
        (this.referrer = ""),
        (this.withdrawn = []),
        (this.withdrawals = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(h, e, n);
    }
  }
  ((t.ReferralEarnings = h),
    (h.runtime = d.proto3),
    (h.typeName = "pumpfun.trading.v1.ReferralEarnings"),
    (h.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "referrer", kind: "scalar", T: 9 },
      { no: 2, name: "withdrawn", kind: "message", T: g, repeated: !0 },
      { no: 3, name: "withdrawn_usd", kind: "message", T: p.Usd },
      { no: 4, name: "withdrawals", kind: "message", T: I, repeated: !0 },
      { no: 5, name: "next", kind: "message", T: p.PageToken },
      { no: 6, name: "as_of", kind: "message", T: p.Ordinal },
    ])));
  class y extends d.Message {
    constructor(e) {
      (super(),
        (this.venue = a.UNSPECIFIED),
        (this.account = ""),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(y, e, n);
    }
  }
  ((t.UnsweptBucket = y),
    (y.runtime = d.proto3),
    (y.typeName = "pumpfun.trading.v1.UnsweptBucket"),
    (y.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "venue", kind: "enum", T: d.proto3.getEnumType(a) },
      { no: 2, name: "account", kind: "scalar", T: 9 },
      { no: 3, name: "quote", kind: "message", T: p.AssetRef },
      { no: 4, name: "amount", kind: "message", T: p.Amount },
      { no: 5, name: "usd", kind: "message", T: p.Usd },
    ])));
  class k extends d.Message {
    constructor(e) {
      (super(),
        (this.buckets = []),
        (this.bondingCurveSweepRequired = !1),
        (this.poolSweepRequired = !1),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(k, e, n);
    }
  }
  ((t.CreatorUnsweptCoin = k),
    (k.runtime = d.proto3),
    (k.typeName = "pumpfun.trading.v1.CreatorUnsweptCoin"),
    (k.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: p.CoinRef },
      { no: 2, name: "buckets", kind: "message", T: y, repeated: !0 },
      { no: 3, name: "total_usd", kind: "message", T: p.Usd },
      { no: 4, name: "bonding_curve_sweep_required", kind: "scalar", T: 8 },
      { no: 5, name: "pool_sweep_required", kind: "scalar", T: 8 },
    ])));
  class O extends d.Message {
    constructor(e) {
      (super(),
        (this.creator = ""),
        (this.coins = []),
        (this.examined = 0),
        (this.truncated = !1),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(O, e, n);
    }
  }
  ((t.CreatorUnsweptFees = O),
    (O.runtime = d.proto3),
    (O.typeName = "pumpfun.trading.v1.CreatorUnsweptFees"),
    (O.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "creator", kind: "scalar", T: 9 },
      { no: 2, name: "coins", kind: "message", T: k, repeated: !0 },
      { no: 3, name: "examined", kind: "scalar", T: 13 },
      { no: 4, name: "truncated", kind: "scalar", T: 8 },
    ])));
  class R extends d.Message {
    constructor(e) {
      (super(),
        (this.configAddress = ""),
        (this.shareBps = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(R, e, n);
    }
  }
  ((t.ShareholderCoin = R),
    (R.runtime = d.proto3),
    (R.typeName = "pumpfun.trading.v1.ShareholderCoin"),
    (R.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: p.CoinRef },
      { no: 2, name: "config_address", kind: "scalar", T: 9 },
      { no: 3, name: "total_earned", kind: "message", T: g },
      { no: 4, name: "total_claimed", kind: "message", T: g },
      { no: 5, name: "total_unclaimed", kind: "message", T: g },
      { no: 6, name: "shareholder_earned", kind: "message", T: g },
      { no: 7, name: "shareholder_claimed", kind: "message", T: g },
      { no: 8, name: "shareholder_unclaimed", kind: "message", T: g },
      { no: 9, name: "share_bps", kind: "scalar", T: 13 },
    ])));
  class P extends d.Message {
    constructor(e) {
      (super(),
        (this.earned = []),
        (this.claimed = []),
        (this.unclaimed = []),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(P, e, n);
    }
  }
  ((t.Totals = P),
    (P.runtime = d.proto3),
    (P.typeName = "pumpfun.trading.v1.Totals"),
    (P.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "earned", kind: "message", T: g, repeated: !0 },
      { no: 2, name: "claimed", kind: "message", T: g, repeated: !0 },
      { no: 3, name: "unclaimed", kind: "message", T: g, repeated: !0 },
    ])));
  class A extends d.Message {
    constructor(e) {
      (super(), (this.coins = []), d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(A, e, n);
    }
  }
  ((t.ShareholderEarnings = A),
    (A.runtime = d.proto3),
    (A.typeName = "pumpfun.trading.v1.ShareholderEarnings"),
    (A.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coins", kind: "message", T: R, repeated: !0 },
      { no: 2, name: "totals", kind: "message", T: P },
      { no: 3, name: "next", kind: "message", T: p.PageToken },
    ])));
  class D extends d.Message {
    constructor(e) {
      (super(),
        (this.sort = s.UNSPECIFIED),
        (this.ascending = !1),
        (this.quoteMintAddress = ""),
        (this.payingOnly = !1),
        (this.offset = 0),
        (this.limit = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(D, e, n);
    }
  }
  ((t.HolderRewardsPageQuery = D),
    (D.runtime = d.proto3),
    (D.typeName = "pumpfun.trading.v1.HolderRewardsPageQuery"),
    (D.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "sort", kind: "enum", T: d.proto3.getEnumType(s) },
      { no: 2, name: "ascending", kind: "scalar", T: 8 },
      { no: 3, name: "quote_mint_address", kind: "scalar", T: 9 },
      { no: 4, name: "paying_only", kind: "scalar", T: 8 },
      { no: 5, name: "offset", kind: "scalar", T: 13 },
      { no: 6, name: "limit", kind: "scalar", T: 13 },
    ])));
  class C extends d.Message {
    constructor(e) {
      (super(),
        (this.quoteMintAddress = ""),
        (this.coinCount = 0),
        (this.payingCount = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(C, e, n);
    }
  }
  ((t.HolderRewardsQuoteTotals = C),
    (C.runtime = d.proto3),
    (C.typeName = "pumpfun.trading.v1.HolderRewardsQuoteTotals"),
    (C.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "quote_mint_address", kind: "scalar", T: 9 },
      { no: 2, name: "coin_count", kind: "scalar", T: 13 },
      { no: 3, name: "paying_count", kind: "scalar", T: 13 },
      { no: 4, name: "accrued", kind: "message", T: p.Amount },
      { no: 5, name: "accrued_usd_at_trade", kind: "message", T: p.Usd },
      { no: 6, name: "paid", kind: "message", T: p.Amount },
    ])));
  class L extends d.Message {
    constructor(e) {
      (super(),
        (this.payoutCount = 0),
        (this.recipientCount = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(L, e, n);
    }
  }
  ((t.HolderRewardsPayouts = L),
    (L.runtime = d.proto3),
    (L.typeName = "pumpfun.trading.v1.HolderRewardsPayouts"),
    (L.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "paid", kind: "message", T: g },
      { no: 2, name: "ops_charge", kind: "message", T: p.Amount },
      { no: 3, name: "payout_count", kind: "scalar", T: 13 },
      { no: 4, name: "recipient_count", kind: "scalar", T: 13 },
      { no: 5, name: "last_payout_at", kind: "message", T: d.Timestamp },
    ])));
  class w extends d.Message {
    constructor(e) {
      (super(),
        (this.vault = ""),
        (this.numTrades = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(w, e, n);
    }
  }
  ((t.HolderRewardsCoin = w),
    (w.runtime = d.proto3),
    (w.typeName = "pumpfun.trading.v1.HolderRewardsCoin"),
    (w.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coin", kind: "message", T: p.CoinRef },
      { no: 2, name: "vault", kind: "scalar", T: 9 },
      { no: 3, name: "accrued", kind: "message", T: g },
      { no: 4, name: "accrued_now_usd", kind: "message", T: p.Usd },
      { no: 5, name: "num_trades", kind: "scalar", T: 13 },
      { no: 6, name: "first_trade", kind: "message", T: d.Timestamp },
      { no: 7, name: "last_trade", kind: "message", T: d.Timestamp },
      { no: 8, name: "payouts", kind: "message", T: L },
      { no: 9, name: "quote_price_usd", kind: "message", T: p.Usd },
    ])));
  class U extends d.Message {
    constructor(e) {
      (super(),
        (this.coinCount = 0),
        (this.payingCount = 0),
        (this.unpricedCoinCount = 0),
        (this.walletsRewarded = 0),
        (this.walletsRewardedDistinct = 0),
        (this.payoutCount = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(U, e, n);
    }
  }
  ((t.HolderRewardsTotals = U),
    (U.runtime = d.proto3),
    (U.typeName = "pumpfun.trading.v1.HolderRewardsTotals"),
    (U.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coin_count", kind: "scalar", T: 13 },
      { no: 2, name: "paying_count", kind: "scalar", T: 13 },
      { no: 3, name: "accrued_usd_at_trade", kind: "message", T: p.Usd },
      { no: 4, name: "accrued_usd_now", kind: "message", T: p.Usd },
      { no: 5, name: "unpriced_coin_count", kind: "scalar", T: 13 },
      { no: 6, name: "wallets_rewarded", kind: "scalar", T: 13 },
      { no: 7, name: "wallets_rewarded_distinct", kind: "scalar", T: 13 },
      { no: 8, name: "payout_count", kind: "scalar", T: 13 },
    ])));
  class F extends d.Message {
    constructor(e) {
      (super(),
        (this.coins = []),
        (this.matchingCount = 0),
        (this.byQuote = []),
        (this.offset = 0),
        d.proto3.util.initPartial(e, this));
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
      return d.proto3.util.equals(F, e, n);
    }
  }
  ((t.HolderRewardsEarnings = F),
    (F.runtime = d.proto3),
    (F.typeName = "pumpfun.trading.v1.HolderRewardsEarnings"),
    (F.fields = d.proto3.util.newFieldList(() => [
      { no: 1, name: "coins", kind: "message", T: w, repeated: !0 },
      { no: 2, name: "totals", kind: "message", T: U },
      { no: 3, name: "next", kind: "message", T: p.PageToken },
      { no: 4, name: "generated_at", kind: "message", T: d.Timestamp },
      { no: 5, name: "matching_count", kind: "scalar", T: 13 },
      { no: 6, name: "by_quote", kind: "message", T: C, repeated: !0 },
      { no: 7, name: "offset", kind: "scalar", T: 13 },
    ])));
};
