// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CollectibleListing =
      t.CollectiblePrice =
      t.CollectibleAsset =
      t.CollectibleMarketplace =
      t.CollectibleStatus =
      t.CollectibleStandard =
        void 0));
  let l = e.r(376244),
    u = e.r(893548);
  (((s = r || (t.CollectibleStandard = r = {}))[(s.UNSPECIFIED = 0)] =
    "UNSPECIFIED"),
    (s[(s.MPL_CORE = 1)] = "MPL_CORE"),
    (s[(s.TOKEN_METADATA_PNFT = 2)] = "TOKEN_METADATA_PNFT"),
    l.proto3.util.setEnumType(r, "pumpfun.collectible.v1.CollectibleStandard", [
      { no: 0, name: "COLLECTIBLE_STANDARD_UNSPECIFIED" },
      { no: 1, name: "COLLECTIBLE_STANDARD_MPL_CORE" },
      { no: 2, name: "COLLECTIBLE_STANDARD_TOKEN_METADATA_PNFT" },
    ]),
    ((i = o || (t.CollectibleStatus = o = {}))[(i.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (i[(i.HELD = 1)] = "HELD"),
    (i[(i.LISTED = 2)] = "LISTED"),
    (i[(i.BOUGHT_BACK = 3)] = "BOUGHT_BACK"),
    (i[(i.SOLD = 4)] = "SOLD"),
    (i[(i.REDEEMED = 5)] = "REDEEMED"),
    (i[(i.SEIZED = 6)] = "SEIZED"),
    (i[(i.BURNED = 7)] = "BURNED"),
    (i[(i.INVENTORY = 8)] = "INVENTORY"),
    l.proto3.util.setEnumType(o, "pumpfun.collectible.v1.CollectibleStatus", [
      { no: 0, name: "COLLECTIBLE_STATUS_UNSPECIFIED" },
      { no: 1, name: "COLLECTIBLE_STATUS_HELD" },
      { no: 2, name: "COLLECTIBLE_STATUS_LISTED" },
      { no: 3, name: "COLLECTIBLE_STATUS_BOUGHT_BACK" },
      { no: 4, name: "COLLECTIBLE_STATUS_SOLD" },
      { no: 5, name: "COLLECTIBLE_STATUS_REDEEMED" },
      { no: 6, name: "COLLECTIBLE_STATUS_SEIZED" },
      { no: 7, name: "COLLECTIBLE_STATUS_BURNED" },
      { no: 8, name: "COLLECTIBLE_STATUS_INVENTORY" },
    ]),
    ((m = a || (t.CollectibleMarketplace = a = {}))[(m.UNSPECIFIED = 0)] =
      "UNSPECIFIED"),
    (m[(m.CC = 1)] = "CC"),
    (m[(m.MAGIC_EDEN = 2)] = "MAGIC_EDEN"),
    (m[(m.TENSOR = 3)] = "TENSOR"),
    (m[(m.PHYGITALS = 4)] = "PHYGITALS"),
    l.proto3.util.setEnumType(
      a,
      "pumpfun.collectible.v1.CollectibleMarketplace",
      [
        { no: 0, name: "COLLECTIBLE_MARKETPLACE_UNSPECIFIED" },
        { no: 1, name: "COLLECTIBLE_MARKETPLACE_CC" },
        { no: 2, name: "COLLECTIBLE_MARKETPLACE_MAGIC_EDEN" },
        { no: 3, name: "COLLECTIBLE_MARKETPLACE_TENSOR" },
        { no: 4, name: "COLLECTIBLE_MARKETPLACE_PHYGITALS" },
      ],
    ));
  class d extends l.Message {
    constructor(e) {
      (super(),
        (this.assetId = ""),
        (this.collection = ""),
        (this.provider = u.CollectibleProvider.UNSPECIFIED),
        (this.standard = r.UNSPECIFIED),
        (this.status = o.UNSPECIFIED),
        (this.owner = ""),
        (this.name = ""),
        (this.imageUrl = ""),
        (this.jsonUri = ""),
        (this.setName = ""),
        (this.cardName = ""),
        (this.grade = ""),
        (this.gradingCompany = ""),
        (this.gradingId = ""),
        (this.serial = ""),
        (this.year = ""),
        (this.category = ""),
        (this.vault = ""),
        (this.vaultId = ""),
        (this.providerCardId = ""),
        (this.updatedAt = l.protoInt64.zero),
        (this.prices = []),
        (this.pnlSource = ""),
        (this.markSid = ""),
        (this.trigger = ""),
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
  ((t.CollectibleAsset = d),
    (d.runtime = l.proto3),
    (d.typeName = "pumpfun.collectible.v1.CollectibleAsset"),
    (d.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "asset_id", kind: "scalar", T: 9 },
      { no: 2, name: "collection", kind: "scalar", T: 9 },
      {
        no: 3,
        name: "provider",
        kind: "enum",
        T: l.proto3.getEnumType(u.CollectibleProvider),
      },
      { no: 4, name: "standard", kind: "enum", T: l.proto3.getEnumType(r) },
      { no: 5, name: "status", kind: "enum", T: l.proto3.getEnumType(o) },
      { no: 6, name: "owner", kind: "scalar", T: 9 },
      { no: 7, name: "name", kind: "scalar", T: 9 },
      { no: 8, name: "image_url", kind: "scalar", T: 9 },
      { no: 9, name: "json_uri", kind: "scalar", T: 9 },
      { no: 10, name: "set_name", kind: "scalar", T: 9 },
      { no: 11, name: "card_name", kind: "scalar", T: 9 },
      { no: 12, name: "grade", kind: "scalar", T: 9 },
      { no: 13, name: "grading_company", kind: "scalar", T: 9 },
      { no: 14, name: "grading_id", kind: "scalar", T: 9 },
      { no: 15, name: "serial", kind: "scalar", T: 9 },
      { no: 16, name: "year", kind: "scalar", T: 9 },
      { no: 17, name: "category", kind: "scalar", T: 9 },
      { no: 18, name: "vault", kind: "scalar", T: 9 },
      { no: 19, name: "vault_id", kind: "scalar", T: 9 },
      { no: 20, name: "provider_card_id", kind: "scalar", T: 9 },
      { no: 21, name: "insured_value_usd", kind: "scalar", T: 9, opt: !0 },
      { no: 22, name: "insured_value_at", kind: "scalar", T: 3, opt: !0 },
      { no: 23, name: "listing", kind: "message", T: c },
      { no: 24, name: "last_pull_machine", kind: "scalar", T: 9, opt: !0 },
      { no: 25, name: "last_pull_at", kind: "scalar", T: 3, opt: !0 },
      { no: 26, name: "updated_at", kind: "scalar", T: 3 },
      { no: 27, name: "prices", kind: "message", T: p, repeated: !0 },
      { no: 28, name: "pnl_source", kind: "scalar", T: 9 },
      { no: 29, name: "mark_sid", kind: "scalar", T: 9 },
      { no: 30, name: "trigger", kind: "scalar", T: 9 },
    ])));
  class p extends l.Message {
    constructor(e) {
      (super(),
        (this.source = ""),
        (this.priceUsd = ""),
        (this.confidence = 0),
        (this.observedAt = l.protoInt64.zero),
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
  ((t.CollectiblePrice = p),
    (p.runtime = l.proto3),
    (p.typeName = "pumpfun.collectible.v1.CollectiblePrice"),
    (p.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "source", kind: "scalar", T: 9 },
      { no: 2, name: "price_usd", kind: "scalar", T: 9 },
      { no: 3, name: "confidence", kind: "scalar", T: 1 },
      { no: 4, name: "observed_at", kind: "scalar", T: 3 },
      { no: 5, name: "expires_at", kind: "scalar", T: 3, opt: !0 },
    ])));
  class c extends l.Message {
    constructor(e) {
      (super(),
        (this.priceUsd = ""),
        (this.marketplace = a.UNSPECIFIED),
        (this.listedAt = l.protoInt64.zero),
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
  ((t.CollectibleListing = c),
    (c.runtime = l.proto3),
    (c.typeName = "pumpfun.collectible.v1.CollectibleListing"),
    (c.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "price_usd", kind: "scalar", T: 9 },
      { no: 2, name: "marketplace", kind: "enum", T: l.proto3.getEnumType(a) },
      { no: 3, name: "listed_at", kind: "scalar", T: 3 },
    ])));
};
