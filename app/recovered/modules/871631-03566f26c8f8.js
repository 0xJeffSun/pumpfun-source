// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.BytesValue =
      t.StringValue =
      t.BoolValue =
      t.UInt32Value =
      t.Int32Value =
      t.UInt64Value =
      t.Int64Value =
      t.FloatValue =
      t.DoubleValue =
        void 0));
  let r = e.r(934682),
    o = e.r(962748),
    a = e.r(138614),
    s = e.r(479723);
  class i extends r.Message {
    constructor(e) {
      (super(), (this.value = 0), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.DOUBLE, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.DOUBLE, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.DoubleValue from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(i, e, n);
    }
  }
  ((t.DoubleValue = i),
    (i.runtime = o.proto3),
    (i.typeName = "google.protobuf.DoubleValue"),
    (i.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 1 },
    ])),
    (i.fieldWrapper = {
      wrapField: (e) => new i({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class m extends r.Message {
    constructor(e) {
      (super(), (this.value = 0), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.FLOAT, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.FLOAT, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.FloatValue from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(m, e, n);
    }
  }
  ((t.FloatValue = m),
    (m.runtime = o.proto3),
    (m.typeName = "google.protobuf.FloatValue"),
    (m.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 2 },
    ])),
    (m.fieldWrapper = {
      wrapField: (e) => new m({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class l extends r.Message {
    constructor(e) {
      (super(),
        (this.value = s.protoInt64.zero),
        o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.INT64, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.INT64, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.Int64Value from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(l, e, n);
    }
  }
  ((t.Int64Value = l),
    (l.runtime = o.proto3),
    (l.typeName = "google.protobuf.Int64Value"),
    (l.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 3 },
    ])),
    (l.fieldWrapper = {
      wrapField: (e) => new l({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class u extends r.Message {
    constructor(e) {
      (super(),
        (this.value = s.protoInt64.zero),
        o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.UINT64, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.UINT64, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.UInt64Value from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(u, e, n);
    }
  }
  ((t.UInt64Value = u),
    (u.runtime = o.proto3),
    (u.typeName = "google.protobuf.UInt64Value"),
    (u.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 4 },
    ])),
    (u.fieldWrapper = {
      wrapField: (e) => new u({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class d extends r.Message {
    constructor(e) {
      (super(), (this.value = 0), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.INT32, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.INT32, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.Int32Value from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(d, e, n);
    }
  }
  ((t.Int32Value = d),
    (d.runtime = o.proto3),
    (d.typeName = "google.protobuf.Int32Value"),
    (d.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 5 },
    ])),
    (d.fieldWrapper = {
      wrapField: (e) => new d({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class p extends r.Message {
    constructor(e) {
      (super(), (this.value = 0), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.UINT32, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.UINT32, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.UInt32Value from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(p, e, n);
    }
  }
  ((t.UInt32Value = p),
    (p.runtime = o.proto3),
    (p.typeName = "google.protobuf.UInt32Value"),
    (p.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 13 },
    ])),
    (p.fieldWrapper = {
      wrapField: (e) => new p({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class c extends r.Message {
    constructor(e) {
      (super(), (this.value = !1), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.BOOL, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.BOOL, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.BoolValue from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(c, e, n);
    }
  }
  ((t.BoolValue = c),
    (c.runtime = o.proto3),
    (c.typeName = "google.protobuf.BoolValue"),
    (c.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 8 },
    ])),
    (c.fieldWrapper = {
      wrapField: (e) => new c({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class T extends r.Message {
    constructor(e) {
      (super(), (this.value = ""), o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.STRING, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.STRING, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.StringValue from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(T, e, n);
    }
  }
  ((t.StringValue = T),
    (T.runtime = o.proto3),
    (T.typeName = "google.protobuf.StringValue"),
    (T.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 9 },
    ])),
    (T.fieldWrapper = {
      wrapField: (e) => new T({ value: e }),
      unwrapField: (e) => e.value,
    }));
  class E extends r.Message {
    constructor(e) {
      (super(),
        (this.value = new Uint8Array(0)),
        o.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return o.proto3.json.writeScalar(a.ScalarType.BYTES, this.value, !0);
    }
    fromJson(e, n) {
      try {
        this.value = o.proto3.json.readScalar(a.ScalarType.BYTES, e);
      } catch (n) {
        let e = 'cannot decode message google.protobuf.BytesValue from JSON"';
        throw (
          n instanceof Error && n.message.length > 0 && (e += `: ${n.message}`),
          Error(e)
        );
      }
      return this;
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
      return o.proto3.util.equals(E, e, n);
    }
  }
  ((t.BytesValue = E),
    (E.runtime = o.proto3),
    (E.typeName = "google.protobuf.BytesValue"),
    (E.fields = o.proto3.util.newFieldList(() => [
      { no: 1, name: "value", kind: "scalar", T: 12 },
    ])),
    (E.fieldWrapper = {
      wrapField: (e) => new E({ value: e }),
      unwrapField: (e) => e.value,
    }));
};
