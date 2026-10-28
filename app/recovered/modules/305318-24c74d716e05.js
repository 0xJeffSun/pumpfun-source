// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }), (t.Empty = void 0));
  let r = e.r(934682),
    o = e.r(962748);
  class a extends r.Message {
    constructor(e) {
      (super(), o.proto3.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new a().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new a().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new a().fromJsonString(e, n);
    }
    static equals(e, n) {
      return o.proto3.util.equals(a, e, n);
    }
  }
  ((t.Empty = a),
    (a.runtime = o.proto3),
    (a.typeName = "google.protobuf.Empty"),
    (a.fields = o.proto3.util.newFieldList(() => [])));
};
