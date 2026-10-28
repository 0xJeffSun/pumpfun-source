// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CacheFreshness = t.SortDirection = void 0));
  let a = e.r(376244);
  (((o = r || (t.SortDirection = r = {}))[(o.UNSPECIFIED = 0)] = "UNSPECIFIED"),
    (o[(o.ASC = 1)] = "ASC"),
    (o[(o.DESC = 2)] = "DESC"),
    a.proto3.util.setEnumType(r, "pumpfun.common.v1.SortDirection", [
      { no: 0, name: "SORT_DIRECTION_UNSPECIFIED" },
      { no: 1, name: "SORT_DIRECTION_ASC" },
      { no: 2, name: "SORT_DIRECTION_DESC" },
    ]));
  class s extends a.Message {
    constructor(e) {
      (super(),
        (this.filledAtMs = a.protoInt64.zero),
        (this.maxAgeSeconds = 0),
        a.proto3.util.initPartial(e, this));
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
      return a.proto3.util.equals(s, e, n);
    }
  }
  ((t.CacheFreshness = s),
    (s.runtime = a.proto3),
    (s.typeName = "pumpfun.common.v1.CacheFreshness"),
    (s.fields = a.proto3.util.newFieldList(() => [
      { no: 1, name: "filled_at_ms", kind: "scalar", T: 3 },
      { no: 2, name: "max_age_seconds", kind: "scalar", T: 13 },
    ])));
};
