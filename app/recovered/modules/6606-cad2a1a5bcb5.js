// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o, a, s, i, m;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Option =
      t.EnumValue =
      t.Enum =
      t.Field_Cardinality =
      t.Field_Kind =
      t.Field =
      t.Type =
      t.Syntax =
        void 0));
  let l = e.r(962748),
    u = e.r(934682),
    d = e.r(38235),
    p = e.r(416420);
  (((s = r || (t.Syntax = r = {}))[(s.PROTO2 = 0)] = "PROTO2"),
    (s[(s.PROTO3 = 1)] = "PROTO3"),
    (s[(s.EDITIONS = 2)] = "EDITIONS"),
    l.proto3.util.setEnumType(r, "google.protobuf.Syntax", [
      { no: 0, name: "SYNTAX_PROTO2" },
      { no: 1, name: "SYNTAX_PROTO3" },
      { no: 2, name: "SYNTAX_EDITIONS" },
    ]));
  class c extends u.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.fields = []),
        (this.oneofs = []),
        (this.options = []),
        (this.syntax = r.PROTO2),
        (this.edition = ""),
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
  ((t.Type = c),
    (c.runtime = l.proto3),
    (c.typeName = "google.protobuf.Type"),
    (c.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "fields", kind: "message", T: T, repeated: !0 },
      { no: 3, name: "oneofs", kind: "scalar", T: 9, repeated: !0 },
      { no: 4, name: "options", kind: "message", T: _, repeated: !0 },
      { no: 5, name: "source_context", kind: "message", T: d.SourceContext },
      { no: 6, name: "syntax", kind: "enum", T: l.proto3.getEnumType(r) },
      { no: 7, name: "edition", kind: "scalar", T: 9 },
    ])));
  class T extends u.Message {
    constructor(e) {
      (super(),
        (this.kind = o.TYPE_UNKNOWN),
        (this.cardinality = a.UNKNOWN),
        (this.number = 0),
        (this.name = ""),
        (this.typeUrl = ""),
        (this.oneofIndex = 0),
        (this.packed = !1),
        (this.options = []),
        (this.jsonName = ""),
        (this.defaultValue = ""),
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
  ((t.Field = T),
    (T.runtime = l.proto3),
    (T.typeName = "google.protobuf.Field"),
    (T.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "kind", kind: "enum", T: l.proto3.getEnumType(o) },
      { no: 2, name: "cardinality", kind: "enum", T: l.proto3.getEnumType(a) },
      { no: 3, name: "number", kind: "scalar", T: 5 },
      { no: 4, name: "name", kind: "scalar", T: 9 },
      { no: 6, name: "type_url", kind: "scalar", T: 9 },
      { no: 7, name: "oneof_index", kind: "scalar", T: 5 },
      { no: 8, name: "packed", kind: "scalar", T: 8 },
      { no: 9, name: "options", kind: "message", T: _, repeated: !0 },
      { no: 10, name: "json_name", kind: "scalar", T: 9 },
      { no: 11, name: "default_value", kind: "scalar", T: 9 },
    ])),
    ((i = o || (t.Field_Kind = o = {}))[(i.TYPE_UNKNOWN = 0)] = "TYPE_UNKNOWN"),
    (i[(i.TYPE_DOUBLE = 1)] = "TYPE_DOUBLE"),
    (i[(i.TYPE_FLOAT = 2)] = "TYPE_FLOAT"),
    (i[(i.TYPE_INT64 = 3)] = "TYPE_INT64"),
    (i[(i.TYPE_UINT64 = 4)] = "TYPE_UINT64"),
    (i[(i.TYPE_INT32 = 5)] = "TYPE_INT32"),
    (i[(i.TYPE_FIXED64 = 6)] = "TYPE_FIXED64"),
    (i[(i.TYPE_FIXED32 = 7)] = "TYPE_FIXED32"),
    (i[(i.TYPE_BOOL = 8)] = "TYPE_BOOL"),
    (i[(i.TYPE_STRING = 9)] = "TYPE_STRING"),
    (i[(i.TYPE_GROUP = 10)] = "TYPE_GROUP"),
    (i[(i.TYPE_MESSAGE = 11)] = "TYPE_MESSAGE"),
    (i[(i.TYPE_BYTES = 12)] = "TYPE_BYTES"),
    (i[(i.TYPE_UINT32 = 13)] = "TYPE_UINT32"),
    (i[(i.TYPE_ENUM = 14)] = "TYPE_ENUM"),
    (i[(i.TYPE_SFIXED32 = 15)] = "TYPE_SFIXED32"),
    (i[(i.TYPE_SFIXED64 = 16)] = "TYPE_SFIXED64"),
    (i[(i.TYPE_SINT32 = 17)] = "TYPE_SINT32"),
    (i[(i.TYPE_SINT64 = 18)] = "TYPE_SINT64"),
    l.proto3.util.setEnumType(o, "google.protobuf.Field.Kind", [
      { no: 0, name: "TYPE_UNKNOWN" },
      { no: 1, name: "TYPE_DOUBLE" },
      { no: 2, name: "TYPE_FLOAT" },
      { no: 3, name: "TYPE_INT64" },
      { no: 4, name: "TYPE_UINT64" },
      { no: 5, name: "TYPE_INT32" },
      { no: 6, name: "TYPE_FIXED64" },
      { no: 7, name: "TYPE_FIXED32" },
      { no: 8, name: "TYPE_BOOL" },
      { no: 9, name: "TYPE_STRING" },
      { no: 10, name: "TYPE_GROUP" },
      { no: 11, name: "TYPE_MESSAGE" },
      { no: 12, name: "TYPE_BYTES" },
      { no: 13, name: "TYPE_UINT32" },
      { no: 14, name: "TYPE_ENUM" },
      { no: 15, name: "TYPE_SFIXED32" },
      { no: 16, name: "TYPE_SFIXED64" },
      { no: 17, name: "TYPE_SINT32" },
      { no: 18, name: "TYPE_SINT64" },
    ]),
    ((m = a || (t.Field_Cardinality = a = {}))[(m.UNKNOWN = 0)] = "UNKNOWN"),
    (m[(m.OPTIONAL = 1)] = "OPTIONAL"),
    (m[(m.REQUIRED = 2)] = "REQUIRED"),
    (m[(m.REPEATED = 3)] = "REPEATED"),
    l.proto3.util.setEnumType(a, "google.protobuf.Field.Cardinality", [
      { no: 0, name: "CARDINALITY_UNKNOWN" },
      { no: 1, name: "CARDINALITY_OPTIONAL" },
      { no: 2, name: "CARDINALITY_REQUIRED" },
      { no: 3, name: "CARDINALITY_REPEATED" },
    ]));
  class E extends u.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.enumvalue = []),
        (this.options = []),
        (this.syntax = r.PROTO2),
        (this.edition = ""),
        l.proto3.util.initPartial(e, this));
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
  ((t.Enum = E),
    (E.runtime = l.proto3),
    (E.typeName = "google.protobuf.Enum"),
    (E.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "enumvalue", kind: "message", T: f, repeated: !0 },
      { no: 3, name: "options", kind: "message", T: _, repeated: !0 },
      { no: 4, name: "source_context", kind: "message", T: d.SourceContext },
      { no: 5, name: "syntax", kind: "enum", T: l.proto3.getEnumType(r) },
      { no: 6, name: "edition", kind: "scalar", T: 9 },
    ])));
  class f extends u.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.number = 0),
        (this.options = []),
        l.proto3.util.initPartial(e, this));
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
  ((t.EnumValue = f),
    (f.runtime = l.proto3),
    (f.typeName = "google.protobuf.EnumValue"),
    (f.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "number", kind: "scalar", T: 5 },
      { no: 3, name: "options", kind: "message", T: _, repeated: !0 },
    ])));
  class _ extends u.Message {
    constructor(e) {
      (super(), (this.name = ""), l.proto3.util.initPartial(e, this));
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
  ((t.Option = _),
    (_.runtime = l.proto3),
    (_.typeName = "google.protobuf.Option"),
    (_.fields = l.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "value", kind: "message", T: p.Any },
    ])));
};
