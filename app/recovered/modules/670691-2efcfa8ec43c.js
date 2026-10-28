// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.ListValue = t.Value = t.Struct = t.NullValue = void 0));
  let a = e.r(962748),
    s = e.r(934682);
  (((o = r || (t.NullValue = r = {}))[(o.NULL_VALUE = 0)] = "NULL_VALUE"),
    a.proto3.util.setEnumType(r, "google.protobuf.NullValue", [
      { no: 0, name: "NULL_VALUE" },
    ]));
  class i extends s.Message {
    constructor(e) {
      (super(), (this.fields = {}), a.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      let n = {};
      for (let [t, r] of Object.entries(this.fields)) n[t] = r.toJson(e);
      return n;
    }
    fromJson(e, n) {
      if ("object" != typeof e || null == e || Array.isArray(e))
        throw Error(
          "cannot decode google.protobuf.Struct from JSON " +
            a.proto3.json.debug(e),
        );
      for (let [n, t] of Object.entries(e)) this.fields[n] = m.fromJson(t);
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
      return a.proto3.util.equals(i, e, n);
    }
  }
  ((t.Struct = i),
    (i.runtime = a.proto3),
    (i.typeName = "google.protobuf.Struct"),
    (i.fields = a.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "fields",
        kind: "map",
        K: 9,
        V: { kind: "message", T: m },
      },
    ])));
  class m extends s.Message {
    constructor(e) {
      (super(),
        (this.kind = { case: void 0 }),
        a.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      switch (this.kind.case) {
        case "nullValue":
          return null;
        case "numberValue":
          if (!Number.isFinite(this.kind.value))
            throw Error("google.protobuf.Value cannot be NaN or Infinity");
          return this.kind.value;
        case "boolValue":
        case "stringValue":
          return this.kind.value;
        case "structValue":
        case "listValue":
          return this.kind.value.toJson(
            Object.assign(Object.assign({}, e), { emitDefaultValues: !0 }),
          );
      }
      throw Error("google.protobuf.Value must have a value");
    }
    fromJson(e, n) {
      switch (typeof e) {
        case "number":
          this.kind = { case: "numberValue", value: e };
          break;
        case "string":
          this.kind = { case: "stringValue", value: e };
          break;
        case "boolean":
          this.kind = { case: "boolValue", value: e };
          break;
        case "object":
          null === e
            ? (this.kind = { case: "nullValue", value: r.NULL_VALUE })
            : Array.isArray(e)
              ? (this.kind = { case: "listValue", value: l.fromJson(e) })
              : (this.kind = { case: "structValue", value: i.fromJson(e) });
          break;
        default:
          throw Error(
            "cannot decode google.protobuf.Value from JSON " +
              a.proto3.json.debug(e),
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
      return a.proto3.util.equals(m, e, n);
    }
  }
  ((t.Value = m),
    (m.runtime = a.proto3),
    (m.typeName = "google.protobuf.Value"),
    (m.fields = a.proto3.util.newFieldList(() => [
      {
        no: 1,
        name: "null_value",
        kind: "enum",
        T: a.proto3.getEnumType(r),
        oneof: "kind",
      },
      { no: 2, name: "number_value", kind: "scalar", T: 1, oneof: "kind" },
      { no: 3, name: "string_value", kind: "scalar", T: 9, oneof: "kind" },
      { no: 4, name: "bool_value", kind: "scalar", T: 8, oneof: "kind" },
      { no: 5, name: "struct_value", kind: "message", T: i, oneof: "kind" },
      { no: 6, name: "list_value", kind: "message", T: l, oneof: "kind" },
    ])));
  class l extends s.Message {
    constructor(e) {
      (super(), (this.values = []), a.proto3.util.initPartial(e, this));
    }
    toJson(e) {
      return this.values.map((e) => e.toJson());
    }
    fromJson(e, n) {
      if (!Array.isArray(e))
        throw Error(
          "cannot decode google.protobuf.ListValue from JSON " +
            a.proto3.json.debug(e),
        );
      for (let n of e) this.values.push(m.fromJson(n));
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
      return a.proto3.util.equals(l, e, n);
    }
  }
  ((t.ListValue = l),
    (l.runtime = a.proto3),
    (l.typeName = "google.protobuf.ListValue"),
    (l.fields = a.proto3.util.newFieldList(() => [
      { no: 1, name: "values", kind: "message", T: m, repeated: !0 },
    ])));
};
