// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Mixin = t.Method = t.Api = void 0));
  let r = e.r(934682),
    o = e.r(6606),
    a = e.r(38235),
    s = e.r(962748);
  class i extends r.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.methods = []),
        (this.options = []),
        (this.version = ""),
        (this.mixins = []),
        (this.syntax = o.Syntax.PROTO2),
        s.proto3.util.initPartial(e, this));
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
      return s.proto3.util.equals(i, e, n);
    }
  }
  ((t.Api = i),
    (i.runtime = s.proto3),
    (i.typeName = "google.protobuf.Api"),
    (i.fields = s.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "methods", kind: "message", T: m, repeated: !0 },
      { no: 3, name: "options", kind: "message", T: o.Option, repeated: !0 },
      { no: 4, name: "version", kind: "scalar", T: 9 },
      { no: 5, name: "source_context", kind: "message", T: a.SourceContext },
      { no: 6, name: "mixins", kind: "message", T: l, repeated: !0 },
      {
        no: 7,
        name: "syntax",
        kind: "enum",
        T: s.proto3.getEnumType(o.Syntax),
      },
    ])));
  class m extends r.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.requestTypeUrl = ""),
        (this.requestStreaming = !1),
        (this.responseTypeUrl = ""),
        (this.responseStreaming = !1),
        (this.options = []),
        (this.syntax = o.Syntax.PROTO2),
        s.proto3.util.initPartial(e, this));
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
      return s.proto3.util.equals(m, e, n);
    }
  }
  ((t.Method = m),
    (m.runtime = s.proto3),
    (m.typeName = "google.protobuf.Method"),
    (m.fields = s.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "request_type_url", kind: "scalar", T: 9 },
      { no: 3, name: "request_streaming", kind: "scalar", T: 8 },
      { no: 4, name: "response_type_url", kind: "scalar", T: 9 },
      { no: 5, name: "response_streaming", kind: "scalar", T: 8 },
      { no: 6, name: "options", kind: "message", T: o.Option, repeated: !0 },
      {
        no: 7,
        name: "syntax",
        kind: "enum",
        T: s.proto3.getEnumType(o.Syntax),
      },
    ])));
  class l extends r.Message {
    constructor(e) {
      (super(),
        (this.name = ""),
        (this.root = ""),
        s.proto3.util.initPartial(e, this));
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
      return s.proto3.util.equals(l, e, n);
    }
  }
  ((t.Mixin = l),
    (l.runtime = s.proto3),
    (l.typeName = "google.protobuf.Mixin"),
    (l.fields = s.proto3.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "root", kind: "scalar", T: 9 },
    ])));
};
