// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.CodeGeneratorResponse_File =
      t.CodeGeneratorResponse_Feature =
      t.CodeGeneratorResponse =
      t.CodeGeneratorRequest =
      t.Version =
        void 0));
  let a = e.r(934682),
    s = e.r(455843),
    i = e.r(953124);
  class m extends a.Message {
    constructor(e) {
      (super(), s.proto2.util.initPartial(e, this));
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
      return s.proto2.util.equals(m, e, n);
    }
  }
  ((t.Version = m),
    (m.runtime = s.proto2),
    (m.typeName = "google.protobuf.compiler.Version"),
    (m.fields = s.proto2.util.newFieldList(() => [
      { no: 1, name: "major", kind: "scalar", T: 5, opt: !0 },
      { no: 2, name: "minor", kind: "scalar", T: 5, opt: !0 },
      { no: 3, name: "patch", kind: "scalar", T: 5, opt: !0 },
      { no: 4, name: "suffix", kind: "scalar", T: 9, opt: !0 },
    ])));
  class l extends a.Message {
    constructor(e) {
      (super(),
        (this.fileToGenerate = []),
        (this.protoFile = []),
        (this.sourceFileDescriptors = []),
        s.proto2.util.initPartial(e, this));
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
      return s.proto2.util.equals(l, e, n);
    }
  }
  ((t.CodeGeneratorRequest = l),
    (l.runtime = s.proto2),
    (l.typeName = "google.protobuf.compiler.CodeGeneratorRequest"),
    (l.fields = s.proto2.util.newFieldList(() => [
      { no: 1, name: "file_to_generate", kind: "scalar", T: 9, repeated: !0 },
      { no: 2, name: "parameter", kind: "scalar", T: 9, opt: !0 },
      {
        no: 15,
        name: "proto_file",
        kind: "message",
        T: i.FileDescriptorProto,
        repeated: !0,
      },
      {
        no: 17,
        name: "source_file_descriptors",
        kind: "message",
        T: i.FileDescriptorProto,
        repeated: !0,
      },
      { no: 3, name: "compiler_version", kind: "message", T: m, opt: !0 },
    ])));
  class u extends a.Message {
    constructor(e) {
      (super(), (this.file = []), s.proto2.util.initPartial(e, this));
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
      return s.proto2.util.equals(u, e, n);
    }
  }
  ((t.CodeGeneratorResponse = u),
    (u.runtime = s.proto2),
    (u.typeName = "google.protobuf.compiler.CodeGeneratorResponse"),
    (u.fields = s.proto2.util.newFieldList(() => [
      { no: 1, name: "error", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "supported_features", kind: "scalar", T: 4, opt: !0 },
      { no: 3, name: "minimum_edition", kind: "scalar", T: 5, opt: !0 },
      { no: 4, name: "maximum_edition", kind: "scalar", T: 5, opt: !0 },
      { no: 15, name: "file", kind: "message", T: d, repeated: !0 },
    ])),
    ((o = r || (t.CodeGeneratorResponse_Feature = r = {}))[(o.NONE = 0)] =
      "NONE"),
    (o[(o.PROTO3_OPTIONAL = 1)] = "PROTO3_OPTIONAL"),
    (o[(o.SUPPORTS_EDITIONS = 2)] = "SUPPORTS_EDITIONS"),
    s.proto2.util.setEnumType(
      r,
      "google.protobuf.compiler.CodeGeneratorResponse.Feature",
      [
        { no: 0, name: "FEATURE_NONE" },
        { no: 1, name: "FEATURE_PROTO3_OPTIONAL" },
        { no: 2, name: "FEATURE_SUPPORTS_EDITIONS" },
      ],
    ));
  class d extends a.Message {
    constructor(e) {
      (super(), s.proto2.util.initPartial(e, this));
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
      return s.proto2.util.equals(d, e, n);
    }
  }
  ((t.CodeGeneratorResponse_File = d),
    (d.runtime = s.proto2),
    (d.typeName = "google.protobuf.compiler.CodeGeneratorResponse.File"),
    (d.fields = s.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "insertion_point", kind: "scalar", T: 9, opt: !0 },
      { no: 15, name: "content", kind: "scalar", T: 9, opt: !0 },
      {
        no: 16,
        name: "generated_code_info",
        kind: "message",
        T: i.GeneratedCodeInfo,
        opt: !0,
      },
    ])));
};
