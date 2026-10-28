// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CollectibleEvent =
      t.CollectibleBasisJoin =
      t.CollectibleEventLeg =
      t.CollectibleProvider =
        void 0));
  let l = e.r(376244);
  (((s = r || (t.CollectibleProvider = r = {}))[(s.UNSPECIFIED = 0)] =
    "UNSPECIFIED"),
    (s[(s.COLLECTOR_CRYPT = 1)] = "COLLECTOR_CRYPT"),
    (s[(s.PHYGITALS = 2)] = "PHYGITALS"),
    l.proto3.util.setEnumType(r, "pumpfun.collectible.v1.CollectibleProvider", [
      { no: 0, name: "COLLECTIBLE_PROVIDER_UNSPECIFIED" },
      { no: 1, name: "COLLECTIBLE_PROVIDER_COLLECTOR_CRYPT" },
      { no: 2, name: "COLLECTIBLE_PROVIDER_PHYGITALS" },
    ]),
    ((i = o || (t.CollectibleEventLeg = o = {}))[(i.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (i[(i.OPEN = 1)] = "OPEN"),
    (i[(i.SEND = 2)] = "SEND"),
    (i[(i.BUYBACK = 3)] = "BUYBACK"),
    (i[(i.LIST = 4)] = "LIST"),
    (i[(i.DELIST = 5)] = "DELIST"),
    (i[(i.BUY = 6)] = "BUY"),
    (i[(i.OFFER_ACCEPT = 7)] = "OFFER_ACCEPT"),
    (i[(i.TRANSFER = 8)] = "TRANSFER"),
    (i[(i.BURN = 9)] = "BURN"),
    (i[(i.SHIP = 10)] = "SHIP"),
    (i[(i.UPDATE = 11)] = "UPDATE"),
    (i[(i.OFFER_CREATE = 12)] = "OFFER_CREATE"),
    (i[(i.OFFER_CANCEL = 13)] = "OFFER_CANCEL"),
    (i[(i.ESCROW_DEPOSIT = 14)] = "ESCROW_DEPOSIT"),
    (i[(i.ESCROW_WITHDRAW = 15)] = "ESCROW_WITHDRAW"),
    l.proto3.util.setEnumType(o, "pumpfun.collectible.v1.CollectibleEventLeg", [
      { no: 0, name: "COLLECTIBLE_EVENT_LEG_UNSPECIFIED" },
      { no: 1, name: "COLLECTIBLE_EVENT_LEG_OPEN" },
      { no: 2, name: "COLLECTIBLE_EVENT_LEG_SEND" },
      { no: 3, name: "COLLECTIBLE_EVENT_LEG_BUYBACK" },
      { no: 4, name: "COLLECTIBLE_EVENT_LEG_LIST" },
      { no: 5, name: "COLLECTIBLE_EVENT_LEG_DELIST" },
      { no: 6, name: "COLLECTIBLE_EVENT_LEG_BUY" },
      { no: 7, name: "COLLECTIBLE_EVENT_LEG_OFFER_ACCEPT" },
      { no: 8, name: "COLLECTIBLE_EVENT_LEG_TRANSFER" },
      { no: 9, name: "COLLECTIBLE_EVENT_LEG_BURN" },
      { no: 10, name: "COLLECTIBLE_EVENT_LEG_SHIP" },
      { no: 11, name: "COLLECTIBLE_EVENT_LEG_UPDATE" },
      { no: 12, name: "COLLECTIBLE_EVENT_LEG_OFFER_CREATE" },
      { no: 13, name: "COLLECTIBLE_EVENT_LEG_OFFER_CANCEL" },
      { no: 14, name: "COLLECTIBLE_EVENT_LEG_ESCROW_DEPOSIT" },
      { no: 15, name: "COLLECTIBLE_EVENT_LEG_ESCROW_WITHDRAW" },
    ]),
    ((m = a || (t.CollectibleBasisJoin = a = {}))[(m.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (m[(m.MEMO_UUID = 1)] = "MEMO_UUID"),
    (m[(m.WALLET_FIFO = 2)] = "WALLET_FIFO"),
    (m[(m.RECONCILED = 3)] = "RECONCILED"),
    l.proto3.util.setEnumType(
      a,
      "pumpfun.collectible.v1.CollectibleBasisJoin",
      [
        { no: 0, name: "COLLECTIBLE_BASIS_JOIN_UNSPECIFIED" },
        { no: 1, name: "COLLECTIBLE_BASIS_JOIN_MEMO_UUID" },
        { no: 2, name: "COLLECTIBLE_BASIS_JOIN_WALLET_FIFO" },
        { no: 3, name: "COLLECTIBLE_BASIS_JOIN_RECONCILED" },
      ],
    ));
  class u extends l.Message {
    constructor(e) {
      (super(),
        (this.slotIndexId = ""),
        (this.tx = ""),
        (this.slot = l.protoInt64.zero),
        (this.blockTime = l.protoInt64.zero),
        (this.provider = r.UNSPECIFIED),
        (this.leg = o.UNSPECIFIED),
        (this.wallet = ""),
        (this.counterparty = ""),
        (this.assetId = ""),
        (this.collection = ""),
        (this.usdcAmount = l.protoInt64.zero),
        (this.feeUsdc = l.protoInt64.zero),
        (this.basisUsdc = l.protoInt64.zero),
        (this.basisJoin = a.UNSPECIFIED),
        (this.channelSlug = ""),
        (this.openingId = ""),
        (this.nonce = ""),
        (this.memoRaw = ""),
        (this.isGift = !1),
        (this.authority = ""),
        (this.venueProgram = ""),
        (this.quoteId = ""),
        (this.expiresAt = l.protoInt64.zero),
        (this.feePayer = ""),
        (this.parserVersion = ""),
        (this.offerAccount = ""),
        (this.escrowAccount = ""),
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
  ((t.CollectibleEvent = u),
    (u.runtime = l.proto3),
    (u.typeName = "pumpfun.collectible.v1.CollectibleEvent"),
    (u.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "slot_index_id", kind: "scalar", T: 9 },
      { no: 2, name: "tx", kind: "scalar", T: 9 },
      { no: 3, name: "slot", kind: "scalar", T: 4 },
      { no: 4, name: "block_time", kind: "scalar", T: 3 },
      { no: 5, name: "provider", kind: "enum", T: l.proto3.getEnumType(r) },
      { no: 6, name: "leg", kind: "enum", T: l.proto3.getEnumType(o) },
      { no: 7, name: "wallet", kind: "scalar", T: 9 },
      { no: 8, name: "counterparty", kind: "scalar", T: 9 },
      { no: 9, name: "asset_id", kind: "scalar", T: 9 },
      { no: 10, name: "collection", kind: "scalar", T: 9 },
      { no: 11, name: "usdc_amount", kind: "scalar", T: 4 },
      { no: 12, name: "fee_usdc", kind: "scalar", T: 4 },
      { no: 13, name: "basis_usdc", kind: "scalar", T: 4 },
      { no: 14, name: "basis_join", kind: "enum", T: l.proto3.getEnumType(a) },
      { no: 15, name: "channel_slug", kind: "scalar", T: 9 },
      { no: 16, name: "opening_id", kind: "scalar", T: 9 },
      { no: 17, name: "nonce", kind: "scalar", T: 9 },
      { no: 18, name: "memo_raw", kind: "scalar", T: 9 },
      { no: 19, name: "is_gift", kind: "scalar", T: 8 },
      { no: 20, name: "authority", kind: "scalar", T: 9 },
      { no: 21, name: "venue_program", kind: "scalar", T: 9 },
      { no: 22, name: "quote_id", kind: "scalar", T: 9 },
      { no: 23, name: "expires_at", kind: "scalar", T: 3 },
      { no: 24, name: "fee_payer", kind: "scalar", T: 9 },
      { no: 25, name: "parser_version", kind: "scalar", T: 9 },
      { no: 26, name: "offer_account", kind: "scalar", T: 9 },
      { no: 27, name: "escrow_account", kind: "scalar", T: 9 },
      { no: 28, name: "bf", kind: "scalar", T: 9, opt: !0 },
    ])));
};
