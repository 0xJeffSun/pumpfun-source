// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m, l, u, d, p, c, T;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Wallets =
      t.UserWalletSet =
      t.HlAccount =
      t.WalletSummary =
      t.Position =
      t.PositionFilter =
      t.Balance =
      t.HlAccountState =
      t.PositionSortKey =
      t.BackfillState =
      t.PositionSource =
      t.PositionState =
      t.PositionVisibility =
        void 0));
  let E = e.r(376244),
    f = e.r(391770),
    _ = e.r(478284),
    g = e.r(804140);
  (((l = r || (t.PositionVisibility = r = {}))[(l.UNSPECIFIED = 0)] =
    "UNSPECIFIED"),
    (l[(l.VISIBLE = 1)] = "VISIBLE"),
    (l[(l.SPAM_SUSPECTED = 2)] = "SPAM_SUSPECTED"),
    (l[(l.USER_NON_SPAM = 3)] = "USER_NON_SPAM"),
    (l[(l.DUST = 4)] = "DUST"),
    E.proto3.util.setEnumType(r, "pumpfun.trading.v1.PositionVisibility", [
      { no: 0, name: "POSITION_VISIBILITY_UNSPECIFIED" },
      { no: 1, name: "POSITION_VISIBILITY_VISIBLE" },
      { no: 2, name: "POSITION_VISIBILITY_SPAM_SUSPECTED" },
      { no: 3, name: "POSITION_VISIBILITY_USER_NON_SPAM" },
      { no: 4, name: "POSITION_VISIBILITY_DUST" },
    ]),
    ((u = o || (t.PositionState = o = {}))[(u.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (u[(u.OPEN = 1)] = "OPEN"),
    (u[(u.CLOSED = 2)] = "CLOSED"),
    (u[(u.ALL = 3)] = "ALL"),
    E.proto3.util.setEnumType(o, "pumpfun.trading.v1.PositionState", [
      { no: 0, name: "POSITION_STATE_UNSPECIFIED" },
      { no: 1, name: "POSITION_STATE_OPEN" },
      { no: 2, name: "POSITION_STATE_CLOSED" },
      { no: 3, name: "POSITION_STATE_ALL" },
    ]),
    ((d = a || (t.PositionSource = a = {}))[(d.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (d[(d.LEDGER = 1)] = "LEDGER"),
    (d[(d.BALANCE_ONLY = 2)] = "BALANCE_ONLY"),
    (d[(d.VENDOR = 3)] = "VENDOR"),
    E.proto3.util.setEnumType(a, "pumpfun.trading.v1.PositionSource", [
      { no: 0, name: "POSITION_SOURCE_UNSPECIFIED" },
      { no: 1, name: "POSITION_SOURCE_LEDGER" },
      { no: 2, name: "POSITION_SOURCE_BALANCE_ONLY" },
      { no: 3, name: "POSITION_SOURCE_VENDOR" },
    ]),
    ((p = s || (t.BackfillState = s = {}))[(p.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (p[(p.NONE = 1)] = "NONE"),
    (p[(p.RUNNING = 2)] = "RUNNING"),
    E.proto3.util.setEnumType(s, "pumpfun.trading.v1.BackfillState", [
      { no: 0, name: "BACKFILL_STATE_UNSPECIFIED" },
      { no: 1, name: "BACKFILL_STATE_NONE" },
      { no: 2, name: "BACKFILL_STATE_RUNNING" },
    ]),
    ((c = i || (t.PositionSortKey = i = {}))[(c.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (c[(c.VALUE_DESC = 1)] = "VALUE_DESC"),
    E.proto3.util.setEnumType(i, "pumpfun.trading.v1.PositionSortKey", [
      { no: 0, name: "POSITION_SORT_KEY_UNSPECIFIED" },
      { no: 1, name: "POSITION_SORT_KEY_VALUE_DESC" },
    ]),
    ((T = m || (t.HlAccountState = m = {}))[(T.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (T[(T.UNKNOWN = 1)] = "UNKNOWN"),
    (T[(T.MISSING = 2)] = "MISSING"),
    (T[(T.ACTIVE = 3)] = "ACTIVE"),
    E.proto3.util.setEnumType(m, "pumpfun.trading.v1.HlAccountState", [
      { no: 0, name: "HL_ACCOUNT_STATE_UNSPECIFIED" },
      { no: 1, name: "HL_ACCOUNT_STATE_UNKNOWN" },
      { no: 2, name: "HL_ACCOUNT_STATE_MISSING" },
      { no: 3, name: "HL_ACCOUNT_STATE_ACTIVE" },
    ]));
  class S extends E.Message {
    constructor(e) {
      (super(),
        (this.source = f.DataSource.UNSPECIFIED),
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
  ((t.Balance = S),
    (S.runtime = E.proto3),
    (S.typeName = "pumpfun.trading.v1.Balance"),
    (S.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "asset", kind: "message", T: f.AssetRef },
      { no: 2, name: "amount", kind: "message", T: f.Amount },
      { no: 3, name: "value", kind: "message", T: f.Money },
      { no: 4, name: "as_of", kind: "message", T: f.Ordinal },
      {
        no: 5,
        name: "source",
        kind: "enum",
        T: E.proto3.getEnumType(f.DataSource),
      },
    ])));
  class N extends E.Message {
    constructor(e) {
      (super(),
        (this.status = o.UNSPECIFIED),
        (this.includeSpam = !1),
        (this.includeDust = !1),
        (this.assetClasses = []),
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
  ((t.PositionFilter = N),
    (N.runtime = E.proto3),
    (N.typeName = "pumpfun.trading.v1.PositionFilter"),
    (N.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "status", kind: "enum", T: E.proto3.getEnumType(o) },
      { no: 2, name: "include_spam", kind: "scalar", T: 8 },
      { no: 3, name: "include_dust", kind: "scalar", T: 8 },
      { no: 4, name: "dust_floor_usd", kind: "message", T: f.Usd },
      {
        no: 5,
        name: "asset_classes",
        kind: "enum",
        T: E.proto3.getEnumType(_.AssetClass),
        repeated: !0,
      },
    ])));
  class I extends E.Message {
    constructor(e) {
      (super(),
        (this.wallet = ""),
        (this.buys = 0),
        (this.sells = 0),
        (this.isExited = !1),
        (this.hasTransfers = !1),
        (this.source = a.UNSPECIFIED),
        (this.backfill = s.UNSPECIFIED),
        (this.visibility = r.UNSPECIFIED),
        E.proto3.util.initPartial(e, this));
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
  ((t.Position = I),
    (I.runtime = E.proto3),
    (I.typeName = "pumpfun.trading.v1.Position"),
    (I.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "card", kind: "message", T: _.CoinCard },
      { no: 2, name: "wallet", kind: "scalar", T: 9 },
      { no: 3, name: "balance", kind: "message", T: f.Amount },
      { no: 4, name: "value", kind: "message", T: f.Money },
      { no: 5, name: "cost_basis", kind: "message", T: f.Money },
      { no: 6, name: "realized_pnl", kind: "message", T: f.Money },
      { no: 7, name: "unrealized_pnl", kind: "message", T: f.Money },
      { no: 8, name: "max_unrealized_pnl", kind: "message", T: f.Money },
      { no: 9, name: "total_bought", kind: "message", T: f.Money },
      { no: 10, name: "total_sold", kind: "message", T: f.Money },
      { no: 11, name: "bought", kind: "message", T: f.Amount },
      { no: 12, name: "sold", kind: "message", T: f.Amount },
      { no: 13, name: "buys", kind: "scalar", T: 13 },
      { no: 14, name: "sells", kind: "scalar", T: 13 },
      { no: 15, name: "first_trade", kind: "message", T: f.Ordinal },
      { no: 16, name: "last_trade", kind: "message", T: f.Ordinal },
      { no: 17, name: "is_exited", kind: "scalar", T: 8 },
      { no: 18, name: "has_transfers", kind: "scalar", T: 8 },
      { no: 19, name: "source", kind: "enum", T: E.proto3.getEnumType(a) },
      { no: 20, name: "backfill", kind: "enum", T: E.proto3.getEnumType(s) },
      { no: 22, name: "visibility", kind: "enum", T: E.proto3.getEnumType(r) },
      { no: 23, name: "as_of", kind: "message", T: f.Ordinal },
      { no: 24, name: "pnl", kind: "message", T: f.Money },
      { no: 25, name: "pnl_percentage_bps", kind: "scalar", T: 5, opt: !0 },
      { no: 26, name: "perp", kind: "message", T: g.PerpPosition },
      { no: 27, name: "cc_callout", kind: "message", T: E.Any },
    ])));
  class h extends E.Message {
    constructor(e) {
      (super(),
        (this.native = []),
        (this.pnlPercentageBps = 0),
        (this.openPositions = 0),
        (this.unpriced = []),
        (this.period = f.Period.UNSPECIFIED),
        (this.cash = []),
        (this.withdrawable = []),
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
  ((t.WalletSummary = h),
    (h.runtime = E.proto3),
    (h.typeName = "pumpfun.trading.v1.WalletSummary"),
    (h.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "native", kind: "message", T: S, repeated: !0 },
      { no: 2, name: "total_value", kind: "message", T: f.Money },
      { no: 3, name: "realized_pnl", kind: "message", T: f.Money },
      { no: 4, name: "unrealized_pnl", kind: "message", T: f.Money },
      { no: 5, name: "pnl", kind: "message", T: f.Money },
      { no: 6, name: "pnl_percentage_bps", kind: "scalar", T: 5 },
      { no: 7, name: "total_buy_spend", kind: "message", T: f.Money },
      { no: 8, name: "held_open_value", kind: "message", T: f.Money },
      { no: 9, name: "max_capital_deployed", kind: "message", T: f.Money },
      { no: 10, name: "equity_at_window_start", kind: "message", T: f.Money },
      { no: 11, name: "cashback", kind: "message", T: f.Money },
      { no: 12, name: "open_positions", kind: "scalar", T: 13 },
      { no: 13, name: "unpriced", kind: "message", T: f.CoinRef, repeated: !0 },
      { no: 14, name: "dust_floor_usd", kind: "message", T: f.Usd },
      {
        no: 15,
        name: "period",
        kind: "enum",
        T: E.proto3.getEnumType(f.Period),
      },
      { no: 16, name: "as_of", kind: "message", T: f.Ordinal },
      { no: 17, name: "cash", kind: "message", T: S, repeated: !0 },
      { no: 18, name: "hl_account", kind: "message", T: y },
      { no: 19, name: "withdrawable", kind: "message", T: S, repeated: !0 },
    ])));
  class y extends E.Message {
    constructor(e) {
      (super(),
        (this.state = m.UNSPECIFIED),
        (this.checkedAt = 0),
        (this.nextAt = 0),
        E.proto3.util.initPartial(e, this));
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
      return E.proto3.util.equals(y, e, n);
    }
  }
  ((t.HlAccount = y),
    (y.runtime = E.proto3),
    (y.typeName = "pumpfun.trading.v1.HlAccount"),
    (y.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "state", kind: "enum", T: E.proto3.getEnumType(m) },
      { no: 2, name: "checked_at", kind: "scalar", T: 13 },
      { no: 3, name: "next_at", kind: "scalar", T: 13 },
    ])));
  class k extends E.Message {
    constructor(e) {
      (super(),
        (this.set = { case: void 0 }),
        E.proto3.util.initPartial(e, this));
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
      return E.proto3.util.equals(k, e, n);
    }
  }
  ((t.UserWalletSet = k),
    (k.runtime = E.proto3),
    (k.typeName = "pumpfun.trading.v1.UserWalletSet"),
    (k.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "user_id", kind: "scalar", T: 9, oneof: "set" },
      { no: 2, name: "wallets", kind: "message", T: O, oneof: "set" },
    ])));
  class O extends E.Message {
    constructor(e) {
      (super(), (this.addresses = []), E.proto3.util.initPartial(e, this));
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
      return E.proto3.util.equals(O, e, n);
    }
  }
  ((t.Wallets = O),
    (O.runtime = E.proto3),
    (O.typeName = "pumpfun.trading.v1.Wallets"),
    (O.fields = E.proto3.util.newFieldList(() => [
      { no: 1, name: "addresses", kind: "scalar", T: 9, repeated: !0 },
    ])));
};
