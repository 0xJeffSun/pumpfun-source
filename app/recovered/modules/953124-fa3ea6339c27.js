// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r,
    o,
    a,
    s,
    i,
    m,
    l,
    u,
    d,
    p,
    c,
    T,
    E,
    f,
    _,
    g,
    S,
    N,
    I,
    h,
    y,
    k,
    O,
    R,
    P,
    A,
    D,
    C,
    L,
    w,
    U,
    F,
    v,
    M;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.GeneratedCodeInfo_Annotation_Semantic =
      t.GeneratedCodeInfo_Annotation =
      t.GeneratedCodeInfo =
      t.SourceCodeInfo_Location =
      t.SourceCodeInfo =
      t.FeatureSetDefaults_FeatureSetEditionDefault =
      t.FeatureSetDefaults =
      t.FeatureSet_JsonFormat =
      t.FeatureSet_MessageEncoding =
      t.FeatureSet_Utf8Validation =
      t.FeatureSet_RepeatedFieldEncoding =
      t.FeatureSet_EnumType =
      t.FeatureSet_FieldPresence =
      t.FeatureSet =
      t.UninterpretedOption_NamePart =
      t.UninterpretedOption =
      t.MethodOptions_IdempotencyLevel =
      t.MethodOptions =
      t.ServiceOptions =
      t.EnumValueOptions =
      t.EnumOptions =
      t.OneofOptions =
      t.FieldOptions_FeatureSupport =
      t.FieldOptions_EditionDefault =
      t.FieldOptions_OptionTargetType =
      t.FieldOptions_OptionRetention =
      t.FieldOptions_JSType =
      t.FieldOptions_CType =
      t.FieldOptions =
      t.MessageOptions =
      t.FileOptions_OptimizeMode =
      t.FileOptions =
      t.MethodDescriptorProto =
      t.ServiceDescriptorProto =
      t.EnumValueDescriptorProto =
      t.EnumDescriptorProto_EnumReservedRange =
      t.EnumDescriptorProto =
      t.OneofDescriptorProto =
      t.FieldDescriptorProto_Label =
      t.FieldDescriptorProto_Type =
      t.FieldDescriptorProto =
      t.ExtensionRangeOptions_Declaration =
      t.ExtensionRangeOptions_VerificationState =
      t.ExtensionRangeOptions =
      t.DescriptorProto_ReservedRange =
      t.DescriptorProto_ExtensionRange =
      t.DescriptorProto =
      t.FileDescriptorProto =
      t.FileDescriptorSet =
      t.Edition =
        void 0));
  let J = e.r(455843),
    b = e.r(934682);
  (((N = r || (t.Edition = r = {}))[(N.EDITION_UNKNOWN = 0)] =
    "EDITION_UNKNOWN"),
    (N[(N.EDITION_LEGACY = 900)] = "EDITION_LEGACY"),
    (N[(N.EDITION_PROTO2 = 998)] = "EDITION_PROTO2"),
    (N[(N.EDITION_PROTO3 = 999)] = "EDITION_PROTO3"),
    (N[(N.EDITION_2023 = 1e3)] = "EDITION_2023"),
    (N[(N.EDITION_2024 = 1001)] = "EDITION_2024"),
    (N[(N.EDITION_1_TEST_ONLY = 1)] = "EDITION_1_TEST_ONLY"),
    (N[(N.EDITION_2_TEST_ONLY = 2)] = "EDITION_2_TEST_ONLY"),
    (N[(N.EDITION_99997_TEST_ONLY = 99997)] = "EDITION_99997_TEST_ONLY"),
    (N[(N.EDITION_99998_TEST_ONLY = 99998)] = "EDITION_99998_TEST_ONLY"),
    (N[(N.EDITION_99999_TEST_ONLY = 99999)] = "EDITION_99999_TEST_ONLY"),
    (N[(N.EDITION_MAX = 0x7fffffff)] = "EDITION_MAX"),
    J.proto2.util.setEnumType(r, "google.protobuf.Edition", [
      { no: 0, name: "EDITION_UNKNOWN" },
      { no: 900, name: "EDITION_LEGACY" },
      { no: 998, name: "EDITION_PROTO2" },
      { no: 999, name: "EDITION_PROTO3" },
      { no: 1e3, name: "EDITION_2023" },
      { no: 1001, name: "EDITION_2024" },
      { no: 1, name: "EDITION_1_TEST_ONLY" },
      { no: 2, name: "EDITION_2_TEST_ONLY" },
      { no: 99997, name: "EDITION_99997_TEST_ONLY" },
      { no: 99998, name: "EDITION_99998_TEST_ONLY" },
      { no: 99999, name: "EDITION_99999_TEST_ONLY" },
      { no: 0x7fffffff, name: "EDITION_MAX" },
    ]));
  class B extends b.Message {
    constructor(e) {
      (super(), (this.file = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new B().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new B().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new B().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(B, e, n);
    }
  }
  ((t.FileDescriptorSet = B),
    (B.runtime = J.proto2),
    (B.typeName = "google.protobuf.FileDescriptorSet"),
    (B.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "file", kind: "message", T: q, repeated: !0 },
    ])));
  class q extends b.Message {
    constructor(e) {
      (super(),
        (this.dependency = []),
        (this.publicDependency = []),
        (this.weakDependency = []),
        (this.messageType = []),
        (this.enumType = []),
        (this.service = []),
        (this.extension = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new q().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new q().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new q().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(q, e, n);
    }
  }
  ((t.FileDescriptorProto = q),
    (q.runtime = J.proto2),
    (q.typeName = "google.protobuf.FileDescriptorProto"),
    (q.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "package", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "dependency", kind: "scalar", T: 9, repeated: !0 },
      { no: 10, name: "public_dependency", kind: "scalar", T: 5, repeated: !0 },
      { no: 11, name: "weak_dependency", kind: "scalar", T: 5, repeated: !0 },
      { no: 4, name: "message_type", kind: "message", T: x, repeated: !0 },
      { no: 5, name: "enum_type", kind: "message", T: j, repeated: !0 },
      { no: 6, name: "service", kind: "message", T: z, repeated: !0 },
      { no: 7, name: "extension", kind: "message", T: H, repeated: !0 },
      { no: 8, name: "options", kind: "message", T: Z, opt: !0 },
      { no: 9, name: "source_code_info", kind: "message", T: eT, opt: !0 },
      { no: 12, name: "syntax", kind: "scalar", T: 9, opt: !0 },
      {
        no: 14,
        name: "edition",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
    ])));
  class x extends b.Message {
    constructor(e) {
      (super(),
        (this.field = []),
        (this.extension = []),
        (this.nestedType = []),
        (this.enumType = []),
        (this.extensionRange = []),
        (this.oneofDecl = []),
        (this.reservedRange = []),
        (this.reservedName = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new x().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new x().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new x().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(x, e, n);
    }
  }
  ((t.DescriptorProto = x),
    (x.runtime = J.proto2),
    (x.typeName = "google.protobuf.DescriptorProto"),
    (x.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "field", kind: "message", T: H, repeated: !0 },
      { no: 6, name: "extension", kind: "message", T: H, repeated: !0 },
      { no: 3, name: "nested_type", kind: "message", T: x, repeated: !0 },
      { no: 4, name: "enum_type", kind: "message", T: j, repeated: !0 },
      { no: 5, name: "extension_range", kind: "message", T: V, repeated: !0 },
      { no: 8, name: "oneof_decl", kind: "message", T: W, repeated: !0 },
      { no: 7, name: "options", kind: "message", T: ee, opt: !0 },
      { no: 9, name: "reserved_range", kind: "message", T: K, repeated: !0 },
      { no: 10, name: "reserved_name", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class V extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new V().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new V().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new V().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(V, e, n);
    }
  }
  ((t.DescriptorProto_ExtensionRange = V),
    (V.runtime = J.proto2),
    (V.typeName = "google.protobuf.DescriptorProto.ExtensionRange"),
    (V.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
      { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 },
      { no: 3, name: "options", kind: "message", T: Y, opt: !0 },
    ])));
  class K extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new K().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new K().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new K().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(K, e, n);
    }
  }
  ((t.DescriptorProto_ReservedRange = K),
    (K.runtime = J.proto2),
    (K.typeName = "google.protobuf.DescriptorProto.ReservedRange"),
    (K.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
      { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 },
    ])));
  class Y extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        (this.declaration = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Y().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Y().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Y().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(Y, e, n);
    }
  }
  ((t.ExtensionRangeOptions = Y),
    (Y.runtime = J.proto2),
    (Y.typeName = "google.protobuf.ExtensionRangeOptions"),
    (Y.fields = J.proto2.util.newFieldList(() => [
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
      { no: 2, name: "declaration", kind: "message", T: G, repeated: !0 },
      { no: 50, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 3,
        name: "verification",
        kind: "enum",
        T: J.proto2.getEnumType(o),
        opt: !0,
        default: o.UNVERIFIED,
      },
    ])),
    ((I = o || (t.ExtensionRangeOptions_VerificationState = o = {}))[
      (I.DECLARATION = 0)
    ] = "DECLARATION"),
    (I[(I.UNVERIFIED = 1)] = "UNVERIFIED"),
    J.proto2.util.setEnumType(
      o,
      "google.protobuf.ExtensionRangeOptions.VerificationState",
      [
        { no: 0, name: "DECLARATION" },
        { no: 1, name: "UNVERIFIED" },
      ],
    ));
  class G extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new G().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new G().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new G().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(G, e, n);
    }
  }
  ((t.ExtensionRangeOptions_Declaration = G),
    (G.runtime = J.proto2),
    (G.typeName = "google.protobuf.ExtensionRangeOptions.Declaration"),
    (G.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "number", kind: "scalar", T: 5, opt: !0 },
      { no: 2, name: "full_name", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "type", kind: "scalar", T: 9, opt: !0 },
      { no: 5, name: "reserved", kind: "scalar", T: 8, opt: !0 },
      { no: 6, name: "repeated", kind: "scalar", T: 8, opt: !0 },
    ])));
  class H extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new H().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new H().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new H().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(H, e, n);
    }
  }
  ((t.FieldDescriptorProto = H),
    (H.runtime = J.proto2),
    (H.typeName = "google.protobuf.FieldDescriptorProto"),
    (H.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "number", kind: "scalar", T: 5, opt: !0 },
      {
        no: 4,
        name: "label",
        kind: "enum",
        T: J.proto2.getEnumType(s),
        opt: !0,
      },
      {
        no: 5,
        name: "type",
        kind: "enum",
        T: J.proto2.getEnumType(a),
        opt: !0,
      },
      { no: 6, name: "type_name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "extendee", kind: "scalar", T: 9, opt: !0 },
      { no: 7, name: "default_value", kind: "scalar", T: 9, opt: !0 },
      { no: 9, name: "oneof_index", kind: "scalar", T: 5, opt: !0 },
      { no: 10, name: "json_name", kind: "scalar", T: 9, opt: !0 },
      { no: 8, name: "options", kind: "message", T: en, opt: !0 },
      { no: 17, name: "proto3_optional", kind: "scalar", T: 8, opt: !0 },
    ])),
    ((h = a || (t.FieldDescriptorProto_Type = a = {}))[(h.DOUBLE = 1)] =
      "DOUBLE"),
    (h[(h.FLOAT = 2)] = "FLOAT"),
    (h[(h.INT64 = 3)] = "INT64"),
    (h[(h.UINT64 = 4)] = "UINT64"),
    (h[(h.INT32 = 5)] = "INT32"),
    (h[(h.FIXED64 = 6)] = "FIXED64"),
    (h[(h.FIXED32 = 7)] = "FIXED32"),
    (h[(h.BOOL = 8)] = "BOOL"),
    (h[(h.STRING = 9)] = "STRING"),
    (h[(h.GROUP = 10)] = "GROUP"),
    (h[(h.MESSAGE = 11)] = "MESSAGE"),
    (h[(h.BYTES = 12)] = "BYTES"),
    (h[(h.UINT32 = 13)] = "UINT32"),
    (h[(h.ENUM = 14)] = "ENUM"),
    (h[(h.SFIXED32 = 15)] = "SFIXED32"),
    (h[(h.SFIXED64 = 16)] = "SFIXED64"),
    (h[(h.SINT32 = 17)] = "SINT32"),
    (h[(h.SINT64 = 18)] = "SINT64"),
    J.proto2.util.setEnumType(a, "google.protobuf.FieldDescriptorProto.Type", [
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
    ((y = s || (t.FieldDescriptorProto_Label = s = {}))[(y.OPTIONAL = 1)] =
      "OPTIONAL"),
    (y[(y.REPEATED = 3)] = "REPEATED"),
    (y[(y.REQUIRED = 2)] = "REQUIRED"),
    J.proto2.util.setEnumType(s, "google.protobuf.FieldDescriptorProto.Label", [
      { no: 1, name: "LABEL_OPTIONAL" },
      { no: 3, name: "LABEL_REPEATED" },
      { no: 2, name: "LABEL_REQUIRED" },
    ]));
  class W extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new W().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new W().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new W().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(W, e, n);
    }
  }
  ((t.OneofDescriptorProto = W),
    (W.runtime = J.proto2),
    (W.typeName = "google.protobuf.OneofDescriptorProto"),
    (W.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "options", kind: "message", T: eo, opt: !0 },
    ])));
  class j extends b.Message {
    constructor(e) {
      (super(),
        (this.value = []),
        (this.reservedRange = []),
        (this.reservedName = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new j().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new j().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new j().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(j, e, n);
    }
  }
  ((t.EnumDescriptorProto = j),
    (j.runtime = J.proto2),
    (j.typeName = "google.protobuf.EnumDescriptorProto"),
    (j.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "value", kind: "message", T: $, repeated: !0 },
      { no: 3, name: "options", kind: "message", T: ea, opt: !0 },
      { no: 4, name: "reserved_range", kind: "message", T: X, repeated: !0 },
      { no: 5, name: "reserved_name", kind: "scalar", T: 9, repeated: !0 },
    ])));
  class X extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new X().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new X().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new X().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(X, e, n);
    }
  }
  ((t.EnumDescriptorProto_EnumReservedRange = X),
    (X.runtime = J.proto2),
    (X.typeName = "google.protobuf.EnumDescriptorProto.EnumReservedRange"),
    (X.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "start", kind: "scalar", T: 5, opt: !0 },
      { no: 2, name: "end", kind: "scalar", T: 5, opt: !0 },
    ])));
  class $ extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new $().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new $().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new $().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals($, e, n);
    }
  }
  ((t.EnumValueDescriptorProto = $),
    ($.runtime = J.proto2),
    ($.typeName = "google.protobuf.EnumValueDescriptorProto"),
    ($.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "number", kind: "scalar", T: 5, opt: !0 },
      { no: 3, name: "options", kind: "message", T: es, opt: !0 },
    ])));
  class z extends b.Message {
    constructor(e) {
      (super(), (this.method = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new z().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new z().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new z().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(z, e, n);
    }
  }
  ((t.ServiceDescriptorProto = z),
    (z.runtime = J.proto2),
    (z.typeName = "google.protobuf.ServiceDescriptorProto"),
    (z.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "method", kind: "message", T: Q, repeated: !0 },
      { no: 3, name: "options", kind: "message", T: ei, opt: !0 },
    ])));
  class Q extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Q().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Q().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Q().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(Q, e, n);
    }
  }
  ((t.MethodDescriptorProto = Q),
    (Q.runtime = J.proto2),
    (Q.typeName = "google.protobuf.MethodDescriptorProto"),
    (Q.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name", kind: "scalar", T: 9, opt: !0 },
      { no: 2, name: "input_type", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "output_type", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "options", kind: "message", T: em, opt: !0 },
      {
        no: 5,
        name: "client_streaming",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 6,
        name: "server_streaming",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
    ])));
  class Z extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new Z().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new Z().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new Z().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(Z, e, n);
    }
  }
  ((t.FileOptions = Z),
    (Z.runtime = J.proto2),
    (Z.typeName = "google.protobuf.FileOptions"),
    (Z.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "java_package", kind: "scalar", T: 9, opt: !0 },
      { no: 8, name: "java_outer_classname", kind: "scalar", T: 9, opt: !0 },
      {
        no: 10,
        name: "java_multiple_files",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 20,
        name: "java_generate_equals_and_hash",
        kind: "scalar",
        T: 8,
        opt: !0,
      },
      {
        no: 27,
        name: "java_string_check_utf8",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 9,
        name: "optimize_for",
        kind: "enum",
        T: J.proto2.getEnumType(i),
        opt: !0,
        default: i.SPEED,
      },
      { no: 11, name: "go_package", kind: "scalar", T: 9, opt: !0 },
      {
        no: 16,
        name: "cc_generic_services",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 17,
        name: "java_generic_services",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 18,
        name: "py_generic_services",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 23,
        name: "deprecated",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 31,
        name: "cc_enable_arenas",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !0,
      },
      { no: 36, name: "objc_class_prefix", kind: "scalar", T: 9, opt: !0 },
      { no: 37, name: "csharp_namespace", kind: "scalar", T: 9, opt: !0 },
      { no: 39, name: "swift_prefix", kind: "scalar", T: 9, opt: !0 },
      { no: 40, name: "php_class_prefix", kind: "scalar", T: 9, opt: !0 },
      { no: 41, name: "php_namespace", kind: "scalar", T: 9, opt: !0 },
      { no: 44, name: "php_metadata_namespace", kind: "scalar", T: 9, opt: !0 },
      { no: 45, name: "ruby_package", kind: "scalar", T: 9, opt: !0 },
      { no: 50, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])),
    ((k = i || (t.FileOptions_OptimizeMode = i = {}))[(k.SPEED = 1)] = "SPEED"),
    (k[(k.CODE_SIZE = 2)] = "CODE_SIZE"),
    (k[(k.LITE_RUNTIME = 3)] = "LITE_RUNTIME"),
    J.proto2.util.setEnumType(i, "google.protobuf.FileOptions.OptimizeMode", [
      { no: 1, name: "SPEED" },
      { no: 2, name: "CODE_SIZE" },
      { no: 3, name: "LITE_RUNTIME" },
    ]));
  class ee extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ee().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ee().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ee().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ee, e, n);
    }
  }
  ((t.MessageOptions = ee),
    (ee.runtime = J.proto2),
    (ee.typeName = "google.protobuf.MessageOptions"),
    (ee.fields = J.proto2.util.newFieldList(() => [
      {
        no: 1,
        name: "message_set_wire_format",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 2,
        name: "no_standard_descriptor_accessor",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
      { no: 7, name: "map_entry", kind: "scalar", T: 8, opt: !0 },
      {
        no: 11,
        name: "deprecated_legacy_json_field_conflicts",
        kind: "scalar",
        T: 8,
        opt: !0,
      },
      { no: 12, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])));
  class en extends b.Message {
    constructor(e) {
      (super(),
        (this.targets = []),
        (this.editionDefaults = []),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new en().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new en().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new en().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(en, e, n);
    }
  }
  ((t.FieldOptions = en),
    (en.runtime = J.proto2),
    (en.typeName = "google.protobuf.FieldOptions"),
    (en.fields = J.proto2.util.newFieldList(() => [
      {
        no: 1,
        name: "ctype",
        kind: "enum",
        T: J.proto2.getEnumType(m),
        opt: !0,
        default: m.STRING,
      },
      { no: 2, name: "packed", kind: "scalar", T: 8, opt: !0 },
      {
        no: 6,
        name: "jstype",
        kind: "enum",
        T: J.proto2.getEnumType(l),
        opt: !0,
        default: l.JS_NORMAL,
      },
      { no: 5, name: "lazy", kind: "scalar", T: 8, opt: !0, default: !1 },
      {
        no: 15,
        name: "unverified_lazy",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
      { no: 10, name: "weak", kind: "scalar", T: 8, opt: !0, default: !1 },
      {
        no: 16,
        name: "debug_redact",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 17,
        name: "retention",
        kind: "enum",
        T: J.proto2.getEnumType(u),
        opt: !0,
      },
      {
        no: 19,
        name: "targets",
        kind: "enum",
        T: J.proto2.getEnumType(d),
        repeated: !0,
      },
      {
        no: 20,
        name: "edition_defaults",
        kind: "message",
        T: et,
        repeated: !0,
      },
      { no: 21, name: "features", kind: "message", T: ed, opt: !0 },
      { no: 22, name: "feature_support", kind: "message", T: er, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])),
    ((O = m || (t.FieldOptions_CType = m = {}))[(O.STRING = 0)] = "STRING"),
    (O[(O.CORD = 1)] = "CORD"),
    (O[(O.STRING_PIECE = 2)] = "STRING_PIECE"),
    J.proto2.util.setEnumType(m, "google.protobuf.FieldOptions.CType", [
      { no: 0, name: "STRING" },
      { no: 1, name: "CORD" },
      { no: 2, name: "STRING_PIECE" },
    ]),
    ((R = l || (t.FieldOptions_JSType = l = {}))[(R.JS_NORMAL = 0)] =
      "JS_NORMAL"),
    (R[(R.JS_STRING = 1)] = "JS_STRING"),
    (R[(R.JS_NUMBER = 2)] = "JS_NUMBER"),
    J.proto2.util.setEnumType(l, "google.protobuf.FieldOptions.JSType", [
      { no: 0, name: "JS_NORMAL" },
      { no: 1, name: "JS_STRING" },
      { no: 2, name: "JS_NUMBER" },
    ]),
    ((P = u || (t.FieldOptions_OptionRetention = u = {}))[
      (P.RETENTION_UNKNOWN = 0)
    ] = "RETENTION_UNKNOWN"),
    (P[(P.RETENTION_RUNTIME = 1)] = "RETENTION_RUNTIME"),
    (P[(P.RETENTION_SOURCE = 2)] = "RETENTION_SOURCE"),
    J.proto2.util.setEnumType(
      u,
      "google.protobuf.FieldOptions.OptionRetention",
      [
        { no: 0, name: "RETENTION_UNKNOWN" },
        { no: 1, name: "RETENTION_RUNTIME" },
        { no: 2, name: "RETENTION_SOURCE" },
      ],
    ),
    ((A = d || (t.FieldOptions_OptionTargetType = d = {}))[
      (A.TARGET_TYPE_UNKNOWN = 0)
    ] = "TARGET_TYPE_UNKNOWN"),
    (A[(A.TARGET_TYPE_FILE = 1)] = "TARGET_TYPE_FILE"),
    (A[(A.TARGET_TYPE_EXTENSION_RANGE = 2)] = "TARGET_TYPE_EXTENSION_RANGE"),
    (A[(A.TARGET_TYPE_MESSAGE = 3)] = "TARGET_TYPE_MESSAGE"),
    (A[(A.TARGET_TYPE_FIELD = 4)] = "TARGET_TYPE_FIELD"),
    (A[(A.TARGET_TYPE_ONEOF = 5)] = "TARGET_TYPE_ONEOF"),
    (A[(A.TARGET_TYPE_ENUM = 6)] = "TARGET_TYPE_ENUM"),
    (A[(A.TARGET_TYPE_ENUM_ENTRY = 7)] = "TARGET_TYPE_ENUM_ENTRY"),
    (A[(A.TARGET_TYPE_SERVICE = 8)] = "TARGET_TYPE_SERVICE"),
    (A[(A.TARGET_TYPE_METHOD = 9)] = "TARGET_TYPE_METHOD"),
    J.proto2.util.setEnumType(
      d,
      "google.protobuf.FieldOptions.OptionTargetType",
      [
        { no: 0, name: "TARGET_TYPE_UNKNOWN" },
        { no: 1, name: "TARGET_TYPE_FILE" },
        { no: 2, name: "TARGET_TYPE_EXTENSION_RANGE" },
        { no: 3, name: "TARGET_TYPE_MESSAGE" },
        { no: 4, name: "TARGET_TYPE_FIELD" },
        { no: 5, name: "TARGET_TYPE_ONEOF" },
        { no: 6, name: "TARGET_TYPE_ENUM" },
        { no: 7, name: "TARGET_TYPE_ENUM_ENTRY" },
        { no: 8, name: "TARGET_TYPE_SERVICE" },
        { no: 9, name: "TARGET_TYPE_METHOD" },
      ],
    ));
  class et extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new et().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new et().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new et().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(et, e, n);
    }
  }
  ((t.FieldOptions_EditionDefault = et),
    (et.runtime = J.proto2),
    (et.typeName = "google.protobuf.FieldOptions.EditionDefault"),
    (et.fields = J.proto2.util.newFieldList(() => [
      {
        no: 3,
        name: "edition",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
      { no: 2, name: "value", kind: "scalar", T: 9, opt: !0 },
    ])));
  class er extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new er().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new er().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new er().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(er, e, n);
    }
  }
  ((t.FieldOptions_FeatureSupport = er),
    (er.runtime = J.proto2),
    (er.typeName = "google.protobuf.FieldOptions.FeatureSupport"),
    (er.fields = J.proto2.util.newFieldList(() => [
      {
        no: 1,
        name: "edition_introduced",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
      {
        no: 2,
        name: "edition_deprecated",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
      { no: 3, name: "deprecation_warning", kind: "scalar", T: 9, opt: !0 },
      {
        no: 4,
        name: "edition_removed",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
    ])));
  class eo extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eo().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eo().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eo().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(eo, e, n);
    }
  }
  ((t.OneofOptions = eo),
    (eo.runtime = J.proto2),
    (eo.typeName = "google.protobuf.OneofOptions"),
    (eo.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])));
  class ea extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ea().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ea().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ea().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ea, e, n);
    }
  }
  ((t.EnumOptions = ea),
    (ea.runtime = J.proto2),
    (ea.typeName = "google.protobuf.EnumOptions"),
    (ea.fields = J.proto2.util.newFieldList(() => [
      { no: 2, name: "allow_alias", kind: "scalar", T: 8, opt: !0 },
      { no: 3, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
      {
        no: 6,
        name: "deprecated_legacy_json_field_conflicts",
        kind: "scalar",
        T: 8,
        opt: !0,
      },
      { no: 7, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])));
  class es extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new es().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new es().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new es().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(es, e, n);
    }
  }
  ((t.EnumValueOptions = es),
    (es.runtime = J.proto2),
    (es.typeName = "google.protobuf.EnumValueOptions"),
    (es.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "deprecated", kind: "scalar", T: 8, opt: !0, default: !1 },
      { no: 2, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 3,
        name: "debug_redact",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      { no: 4, name: "feature_support", kind: "message", T: er, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])));
  class ei extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ei().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ei().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ei().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ei, e, n);
    }
  }
  ((t.ServiceOptions = ei),
    (ei.runtime = J.proto2),
    (ei.typeName = "google.protobuf.ServiceOptions"),
    (ei.fields = J.proto2.util.newFieldList(() => [
      { no: 34, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 33,
        name: "deprecated",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])));
  class em extends b.Message {
    constructor(e) {
      (super(),
        (this.uninterpretedOption = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new em().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new em().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new em().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(em, e, n);
    }
  }
  ((t.MethodOptions = em),
    (em.runtime = J.proto2),
    (em.typeName = "google.protobuf.MethodOptions"),
    (em.fields = J.proto2.util.newFieldList(() => [
      {
        no: 33,
        name: "deprecated",
        kind: "scalar",
        T: 8,
        opt: !0,
        default: !1,
      },
      {
        no: 34,
        name: "idempotency_level",
        kind: "enum",
        T: J.proto2.getEnumType(p),
        opt: !0,
        default: p.IDEMPOTENCY_UNKNOWN,
      },
      { no: 35, name: "features", kind: "message", T: ed, opt: !0 },
      {
        no: 999,
        name: "uninterpreted_option",
        kind: "message",
        T: el,
        repeated: !0,
      },
    ])),
    ((D = p || (t.MethodOptions_IdempotencyLevel = p = {}))[
      (D.IDEMPOTENCY_UNKNOWN = 0)
    ] = "IDEMPOTENCY_UNKNOWN"),
    (D[(D.NO_SIDE_EFFECTS = 1)] = "NO_SIDE_EFFECTS"),
    (D[(D.IDEMPOTENT = 2)] = "IDEMPOTENT"),
    J.proto2.util.setEnumType(
      p,
      "google.protobuf.MethodOptions.IdempotencyLevel",
      [
        { no: 0, name: "IDEMPOTENCY_UNKNOWN" },
        { no: 1, name: "NO_SIDE_EFFECTS" },
        { no: 2, name: "IDEMPOTENT" },
      ],
    ));
  class el extends b.Message {
    constructor(e) {
      (super(), (this.name = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new el().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new el().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new el().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(el, e, n);
    }
  }
  ((t.UninterpretedOption = el),
    (el.runtime = J.proto2),
    (el.typeName = "google.protobuf.UninterpretedOption"),
    (el.fields = J.proto2.util.newFieldList(() => [
      { no: 2, name: "name", kind: "message", T: eu, repeated: !0 },
      { no: 3, name: "identifier_value", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "positive_int_value", kind: "scalar", T: 4, opt: !0 },
      { no: 5, name: "negative_int_value", kind: "scalar", T: 3, opt: !0 },
      { no: 6, name: "double_value", kind: "scalar", T: 1, opt: !0 },
      { no: 7, name: "string_value", kind: "scalar", T: 12, opt: !0 },
      { no: 8, name: "aggregate_value", kind: "scalar", T: 9, opt: !0 },
    ])));
  class eu extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eu().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eu().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eu().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(eu, e, n);
    }
  }
  ((t.UninterpretedOption_NamePart = eu),
    (eu.runtime = J.proto2),
    (eu.typeName = "google.protobuf.UninterpretedOption.NamePart"),
    (eu.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "name_part", kind: "scalar", T: 9, req: !0 },
      { no: 2, name: "is_extension", kind: "scalar", T: 8, req: !0 },
    ])));
  class ed extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ed().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ed().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ed().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ed, e, n);
    }
  }
  ((t.FeatureSet = ed),
    (ed.runtime = J.proto2),
    (ed.typeName = "google.protobuf.FeatureSet"),
    (ed.fields = J.proto2.util.newFieldList(() => [
      {
        no: 1,
        name: "field_presence",
        kind: "enum",
        T: J.proto2.getEnumType(c),
        opt: !0,
      },
      {
        no: 2,
        name: "enum_type",
        kind: "enum",
        T: J.proto2.getEnumType(T),
        opt: !0,
      },
      {
        no: 3,
        name: "repeated_field_encoding",
        kind: "enum",
        T: J.proto2.getEnumType(E),
        opt: !0,
      },
      {
        no: 4,
        name: "utf8_validation",
        kind: "enum",
        T: J.proto2.getEnumType(f),
        opt: !0,
      },
      {
        no: 5,
        name: "message_encoding",
        kind: "enum",
        T: J.proto2.getEnumType(_),
        opt: !0,
      },
      {
        no: 6,
        name: "json_format",
        kind: "enum",
        T: J.proto2.getEnumType(g),
        opt: !0,
      },
    ])),
    ((C = c || (t.FeatureSet_FieldPresence = c = {}))[
      (C.FIELD_PRESENCE_UNKNOWN = 0)
    ] = "FIELD_PRESENCE_UNKNOWN"),
    (C[(C.EXPLICIT = 1)] = "EXPLICIT"),
    (C[(C.IMPLICIT = 2)] = "IMPLICIT"),
    (C[(C.LEGACY_REQUIRED = 3)] = "LEGACY_REQUIRED"),
    J.proto2.util.setEnumType(c, "google.protobuf.FeatureSet.FieldPresence", [
      { no: 0, name: "FIELD_PRESENCE_UNKNOWN" },
      { no: 1, name: "EXPLICIT" },
      { no: 2, name: "IMPLICIT" },
      { no: 3, name: "LEGACY_REQUIRED" },
    ]),
    ((L = T || (t.FeatureSet_EnumType = T = {}))[(L.ENUM_TYPE_UNKNOWN = 0)] =
      "ENUM_TYPE_UNKNOWN"),
    (L[(L.OPEN = 1)] = "OPEN"),
    (L[(L.CLOSED = 2)] = "CLOSED"),
    J.proto2.util.setEnumType(T, "google.protobuf.FeatureSet.EnumType", [
      { no: 0, name: "ENUM_TYPE_UNKNOWN" },
      { no: 1, name: "OPEN" },
      { no: 2, name: "CLOSED" },
    ]),
    ((w = E || (t.FeatureSet_RepeatedFieldEncoding = E = {}))[
      (w.REPEATED_FIELD_ENCODING_UNKNOWN = 0)
    ] = "REPEATED_FIELD_ENCODING_UNKNOWN"),
    (w[(w.PACKED = 1)] = "PACKED"),
    (w[(w.EXPANDED = 2)] = "EXPANDED"),
    J.proto2.util.setEnumType(
      E,
      "google.protobuf.FeatureSet.RepeatedFieldEncoding",
      [
        { no: 0, name: "REPEATED_FIELD_ENCODING_UNKNOWN" },
        { no: 1, name: "PACKED" },
        { no: 2, name: "EXPANDED" },
      ],
    ),
    ((U = f || (t.FeatureSet_Utf8Validation = f = {}))[
      (U.UTF8_VALIDATION_UNKNOWN = 0)
    ] = "UTF8_VALIDATION_UNKNOWN"),
    (U[(U.VERIFY = 2)] = "VERIFY"),
    (U[(U.NONE = 3)] = "NONE"),
    J.proto2.util.setEnumType(f, "google.protobuf.FeatureSet.Utf8Validation", [
      { no: 0, name: "UTF8_VALIDATION_UNKNOWN" },
      { no: 2, name: "VERIFY" },
      { no: 3, name: "NONE" },
    ]),
    ((F = _ || (t.FeatureSet_MessageEncoding = _ = {}))[
      (F.MESSAGE_ENCODING_UNKNOWN = 0)
    ] = "MESSAGE_ENCODING_UNKNOWN"),
    (F[(F.LENGTH_PREFIXED = 1)] = "LENGTH_PREFIXED"),
    (F[(F.DELIMITED = 2)] = "DELIMITED"),
    J.proto2.util.setEnumType(_, "google.protobuf.FeatureSet.MessageEncoding", [
      { no: 0, name: "MESSAGE_ENCODING_UNKNOWN" },
      { no: 1, name: "LENGTH_PREFIXED" },
      { no: 2, name: "DELIMITED" },
    ]),
    ((v = g || (t.FeatureSet_JsonFormat = g = {}))[
      (v.JSON_FORMAT_UNKNOWN = 0)
    ] = "JSON_FORMAT_UNKNOWN"),
    (v[(v.ALLOW = 1)] = "ALLOW"),
    (v[(v.LEGACY_BEST_EFFORT = 2)] = "LEGACY_BEST_EFFORT"),
    J.proto2.util.setEnumType(g, "google.protobuf.FeatureSet.JsonFormat", [
      { no: 0, name: "JSON_FORMAT_UNKNOWN" },
      { no: 1, name: "ALLOW" },
      { no: 2, name: "LEGACY_BEST_EFFORT" },
    ]));
  class ep extends b.Message {
    constructor(e) {
      (super(), (this.defaults = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ep().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ep().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ep().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ep, e, n);
    }
  }
  ((t.FeatureSetDefaults = ep),
    (ep.runtime = J.proto2),
    (ep.typeName = "google.protobuf.FeatureSetDefaults"),
    (ep.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "defaults", kind: "message", T: ec, repeated: !0 },
      {
        no: 4,
        name: "minimum_edition",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
      {
        no: 5,
        name: "maximum_edition",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
    ])));
  class ec extends b.Message {
    constructor(e) {
      (super(), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ec().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ec().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ec().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ec, e, n);
    }
  }
  ((t.FeatureSetDefaults_FeatureSetEditionDefault = ec),
    (ec.runtime = J.proto2),
    (ec.typeName =
      "google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"),
    (ec.fields = J.proto2.util.newFieldList(() => [
      {
        no: 3,
        name: "edition",
        kind: "enum",
        T: J.proto2.getEnumType(r),
        opt: !0,
      },
      { no: 4, name: "overridable_features", kind: "message", T: ed, opt: !0 },
      { no: 5, name: "fixed_features", kind: "message", T: ed, opt: !0 },
    ])));
  class eT extends b.Message {
    constructor(e) {
      (super(), (this.location = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eT().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eT().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eT().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(eT, e, n);
    }
  }
  ((t.SourceCodeInfo = eT),
    (eT.runtime = J.proto2),
    (eT.typeName = "google.protobuf.SourceCodeInfo"),
    (eT.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "location", kind: "message", T: eE, repeated: !0 },
    ])));
  class eE extends b.Message {
    constructor(e) {
      (super(),
        (this.path = []),
        (this.span = []),
        (this.leadingDetachedComments = []),
        J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new eE().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eE().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eE().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(eE, e, n);
    }
  }
  ((t.SourceCodeInfo_Location = eE),
    (eE.runtime = J.proto2),
    (eE.typeName = "google.protobuf.SourceCodeInfo.Location"),
    (eE.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "path", kind: "scalar", T: 5, repeated: !0, packed: !0 },
      { no: 2, name: "span", kind: "scalar", T: 5, repeated: !0, packed: !0 },
      { no: 3, name: "leading_comments", kind: "scalar", T: 9, opt: !0 },
      { no: 4, name: "trailing_comments", kind: "scalar", T: 9, opt: !0 },
      {
        no: 6,
        name: "leading_detached_comments",
        kind: "scalar",
        T: 9,
        repeated: !0,
      },
    ])));
  class ef extends b.Message {
    constructor(e) {
      (super(), (this.annotation = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new ef().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ef().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ef().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(ef, e, n);
    }
  }
  ((t.GeneratedCodeInfo = ef),
    (ef.runtime = J.proto2),
    (ef.typeName = "google.protobuf.GeneratedCodeInfo"),
    (ef.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "annotation", kind: "message", T: e_, repeated: !0 },
    ])));
  class e_ extends b.Message {
    constructor(e) {
      (super(), (this.path = []), J.proto2.util.initPartial(e, this));
    }
    static fromBinary(e, n) {
      return new e_().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new e_().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new e_().fromJsonString(e, n);
    }
    static equals(e, n) {
      return J.proto2.util.equals(e_, e, n);
    }
  }
  ((t.GeneratedCodeInfo_Annotation = e_),
    (e_.runtime = J.proto2),
    (e_.typeName = "google.protobuf.GeneratedCodeInfo.Annotation"),
    (e_.fields = J.proto2.util.newFieldList(() => [
      { no: 1, name: "path", kind: "scalar", T: 5, repeated: !0, packed: !0 },
      { no: 2, name: "source_file", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "begin", kind: "scalar", T: 5, opt: !0 },
      { no: 4, name: "end", kind: "scalar", T: 5, opt: !0 },
      {
        no: 5,
        name: "semantic",
        kind: "enum",
        T: J.proto2.getEnumType(S),
        opt: !0,
      },
    ])),
    ((M = S || (t.GeneratedCodeInfo_Annotation_Semantic = S = {}))[
      (M.NONE = 0)
    ] = "NONE"),
    (M[(M.SET = 1)] = "SET"),
    (M[(M.ALIAS = 2)] = "ALIAS"),
    J.proto2.util.setEnumType(
      S,
      "google.protobuf.GeneratedCodeInfo.Annotation.Semantic",
      [
        { no: 0, name: "NONE" },
        { no: 1, name: "SET" },
        { no: 2, name: "ALIAS" },
      ],
    ));
};
