// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r, o;
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.createDescriptorSet = void 0));
  let a = e.r(953124),
    s = e.r(740640),
    i = e.r(532452),
    m = e.r(631268),
    l = e.r(777756),
    u = e.r(23857),
    d = e.r(138614),
    p = e.r(503158);
  function c(e, n, t) {
    switch (e.kind) {
      case "file":
        for (let r of e.proto.extension) {
          let o = _(r, e, void 0, n, t);
          (e.extensions.push(o), n.extensions.set(o.typeName, o));
        }
        break;
      case "message":
        for (let r of e.proto.extension) {
          let o = _(r, e.file, e, n, t);
          (e.nestedExtensions.push(o), n.extensions.set(o.typeName, o));
        }
        for (let r of e.nestedMessages) c(r, n, t);
    }
  }
  function T(e, n, t) {
    let o = e.proto.oneofDecl.map((n) => {
        var o, a, i;
        return (
          (o = n),
          (a = e),
          (i = t),
          (0, s.assert)(o.name, "invalid OneofDescriptorProto: missing name"),
          {
            kind: "oneof",
            proto: o,
            deprecated: !1,
            parent: a,
            fields: [],
            name: o.name,
            toString() {
              return `oneof ${a.typeName}.${this.name}`;
            },
            getComments() {
              let e = [
                ...this.parent.getComments().sourcePath,
                r.DescriptorProto_OneofDecl,
                this.parent.proto.oneofDecl.indexOf(this.proto),
              ];
              return h(a.file.proto.sourceCodeInfo, e);
            },
            getFeatures() {
              var e;
              return i(
                a.getFeatures(),
                null == (e = o.options) ? void 0 : e.features,
              );
            },
          }
        );
      }),
      a = new Set();
    for (let r of e.proto.field) {
      let i = (function (e, n) {
          var t;
          let r,
            o = e.oneofIndex;
          if (void 0 !== o)
            return (
              !0 !== e.proto3Optional &&
                ((r = n[o]),
                (0, s.assert)(
                  r,
                  `invalid FieldDescriptorProto: oneof #${o} for field #${null != (t = e.number) ? t : -1} not found`,
                )),
              r
            );
        })(r, o),
        m = f(r, e.file, e, i, n, t);
      (e.fields.push(m),
        void 0 === i
          ? e.members.push(m)
          : (i.fields.push(m), a.has(i) || (a.add(i), e.members.push(i))));
    }
    for (let n of o.filter((e) => a.has(e))) e.oneofs.push(n);
    for (let r of e.nestedMessages) T(r, n, t);
  }
  function E(e, n, t, o, a) {
    var i, l, u;
    (0, s.assert)(e.name, "invalid EnumDescriptorProto: missing name");
    let d = {
      kind: "enum",
      proto: e,
      deprecated:
        null != (l = null == (i = e.options) ? void 0 : i.deprecated) && l,
      file: n,
      parent: t,
      name: e.name,
      typeName: S(e, t, n),
      values: [],
      sharedPrefix: (0, m.findEnumSharedPrefix)(
        e.name,
        e.value.map((e) => {
          var n;
          return null != (n = e.name) ? n : "";
        }),
      ),
      toString() {
        return `enum ${this.typeName}`;
      },
      getComments() {
        let e = this.parent
          ? [
              ...this.parent.getComments().sourcePath,
              r.DescriptorProto_EnumType,
              this.parent.proto.enumType.indexOf(this.proto),
            ]
          : [
              r.FileDescriptorProto_EnumType,
              this.file.proto.enumType.indexOf(this.proto),
            ];
        return h(n.proto.sourceCodeInfo, e);
      },
      getFeatures() {
        var r, o;
        return a(
          null != (r = null == t ? void 0 : t.getFeatures())
            ? r
            : n.getFeatures(),
          null == (o = e.options) ? void 0 : o.features,
        );
      },
    };
    (o.enums.set(d.typeName, d),
      e.value.forEach((e) => {
        var t, o;
        ((0, s.assert)(
          e.name,
          "invalid EnumValueDescriptorProto: missing name",
        ),
          (0, s.assert)(
            void 0 !== e.number,
            "invalid EnumValueDescriptorProto: missing number",
          ),
          d.values.push({
            kind: "enum_value",
            proto: e,
            deprecated:
              null != (o = null == (t = e.options) ? void 0 : t.deprecated) &&
              o,
            parent: d,
            name: e.name,
            number: e.number,
            toString() {
              return `enum value ${d.typeName}.${this.name}`;
            },
            declarationString() {
              var e;
              let n = `${this.name} = ${this.number}`;
              return (
                (null == (e = this.proto.options) ? void 0 : e.deprecated) ===
                  !0 && (n += " [deprecated = true]"),
                n
              );
            },
            getComments() {
              let e = [
                ...this.parent.getComments().sourcePath,
                r.EnumDescriptorProto_Value,
                this.parent.proto.value.indexOf(this.proto),
              ];
              return h(n.proto.sourceCodeInfo, e);
            },
            getFeatures() {
              var n;
              return a(
                d.getFeatures(),
                null == (n = e.options) ? void 0 : n.features,
              );
            },
          }));
      }),
      (null != (u = null == t ? void 0 : t.nestedEnums) ? u : n.enums).push(d));
  }
  function f(e, n, t, o, i, l) {
    var u, p, c;
    ((0, s.assert)(e.name, "invalid FieldDescriptorProto: missing name"),
      (0, s.assert)(e.number, "invalid FieldDescriptorProto: missing number"),
      (0, s.assert)(e.type, "invalid FieldDescriptorProto: missing type"));
    let T = {
        proto: e,
        deprecated:
          null != (p = null == (u = e.options) ? void 0 : u.deprecated) && p,
        name: e.name,
        number: e.number,
        parent: t,
        oneof: o,
        optional: (function (e, n) {
          switch (n) {
            case "proto2":
              return (
                void 0 === e.oneofIndex &&
                e.label === a.FieldDescriptorProto_Label.OPTIONAL
              );
            case "proto3":
              return !0 === e.proto3Optional;
            case "editions":
              return !1;
          }
        })(e, n.syntax),
        packedByDefault: (function (e, n) {
          let { repeatedFieldEncoding: t } = n();
          if (t != a.FeatureSet_RepeatedFieldEncoding.PACKED) return !1;
          switch (e.type) {
            case a.FieldDescriptorProto_Type.STRING:
            case a.FieldDescriptorProto_Type.BYTES:
            case a.FieldDescriptorProto_Type.GROUP:
            case a.FieldDescriptorProto_Type.MESSAGE:
              return !1;
            default:
              return !0;
          }
        })(e, l),
        packed: (function (e, n, t, r) {
          var o, s, i, m, l, u;
          switch (t.type) {
            case a.FieldDescriptorProto_Type.STRING:
            case a.FieldDescriptorProto_Type.BYTES:
            case a.FieldDescriptorProto_Type.GROUP:
            case a.FieldDescriptorProto_Type.MESSAGE:
              return !1;
            default:
              switch (e.edition) {
                case a.Edition.EDITION_PROTO2:
                  return (
                    null != (s = null == (o = t.options) ? void 0 : o.packed) &&
                    s
                  );
                case a.Edition.EDITION_PROTO3:
                  return (
                    null == (m = null == (i = t.options) ? void 0 : i.packed) ||
                    m
                  );
                default: {
                  let { repeatedFieldEncoding: o } = r(
                    null != (l = null == n ? void 0 : n.getFeatures())
                      ? l
                      : e.getFeatures(),
                    null == (u = t.options) ? void 0 : u.features,
                  );
                  return o == a.FeatureSet_RepeatedFieldEncoding.PACKED;
                }
              }
          }
        })(n, t, e, l),
        jsonName:
          e.jsonName === (0, m.fieldJsonName)(e.name) ? void 0 : e.jsonName,
        scalar: void 0,
        longType: void 0,
        message: void 0,
        enum: void 0,
        mapKey: void 0,
        mapValue: void 0,
        declarationString: y,
        toString() {
          return `field ${this.parent.typeName}.${this.name}`;
        },
        getComments() {
          let e = [
            ...this.parent.getComments().sourcePath,
            r.DescriptorProto_Field,
            this.parent.proto.field.indexOf(this.proto),
          ];
          return h(n.proto.sourceCodeInfo, e);
        },
        getFeatures() {
          var n;
          return l(
            t.getFeatures(),
            null == (n = e.options) ? void 0 : n.features,
          );
        },
      },
      E = e.label === a.FieldDescriptorProto_Label.REPEATED;
    switch (e.type) {
      case a.FieldDescriptorProto_Type.MESSAGE:
      case a.FieldDescriptorProto_Type.GROUP: {
        (0, s.assert)(
          e.typeName,
          "invalid FieldDescriptorProto: missing type_name",
        );
        let n = i.mapEntries.get(N(e.typeName));
        if (void 0 !== n)
          return (
            (0, s.assert)(
              E,
              "invalid FieldDescriptorProto: expected map entry to be repeated",
            ),
            Object.assign(
              Object.assign(Object.assign({}, T), {
                kind: "field",
                fieldKind: "map",
                repeated: !1,
              }),
              (function (e) {
                var n, t;
                ((0, s.assert)(
                  null == (n = e.proto.options) ? void 0 : n.mapEntry,
                  `invalid DescriptorProto: expected ${e.toString()} to be a map entry`,
                ),
                  (0, s.assert)(
                    2 === e.fields.length,
                    `invalid DescriptorProto: map entry ${e.toString()} has ${e.fields.length} fields`,
                  ));
                let r = e.fields.find((e) => 1 === e.proto.number);
                (0, s.assert)(
                  r,
                  `invalid DescriptorProto: map entry ${e.toString()} is missing key field`,
                );
                let o = r.scalar;
                (0, s.assert)(
                  void 0 !== o &&
                    o !== d.ScalarType.BYTES &&
                    o !== d.ScalarType.FLOAT &&
                    o !== d.ScalarType.DOUBLE,
                  `invalid DescriptorProto: map entry ${e.toString()} has unexpected key type ${null != (t = r.proto.type) ? t : -1}`,
                );
                let a = e.fields.find((e) => 2 === e.proto.number);
                switch (
                  ((0, s.assert)(
                    a,
                    `invalid DescriptorProto: map entry ${e.toString()} is missing value field`,
                  ),
                  a.fieldKind)
                ) {
                  case "scalar":
                    return {
                      mapKey: o,
                      mapValue: Object.assign(Object.assign({}, a), {
                        kind: "scalar",
                      }),
                    };
                  case "message":
                    return {
                      mapKey: o,
                      mapValue: Object.assign(Object.assign({}, a), {
                        kind: "message",
                      }),
                    };
                  case "enum":
                    return {
                      mapKey: o,
                      mapValue: Object.assign(Object.assign({}, a), {
                        kind: "enum",
                      }),
                    };
                  default:
                    throw Error(
                      "invalid DescriptorProto: unsupported map entry value field",
                    );
                }
              })(n),
            )
          );
        let t = i.messages.get(N(e.typeName));
        return (
          (0, s.assert)(
            void 0 !== t,
            `invalid FieldDescriptorProto: type_name ${e.typeName} not found`,
          ),
          Object.assign(Object.assign({}, T), {
            kind: "field",
            fieldKind: "message",
            repeated: E,
            message: t,
          })
        );
      }
      case a.FieldDescriptorProto_Type.ENUM: {
        (0, s.assert)(
          e.typeName,
          "invalid FieldDescriptorProto: missing type_name",
        );
        let n = i.enums.get(N(e.typeName));
        return (
          (0, s.assert)(
            void 0 !== n,
            `invalid FieldDescriptorProto: type_name ${e.typeName} not found`,
          ),
          Object.assign(Object.assign({}, T), {
            kind: "field",
            fieldKind: "enum",
            getDefaultValue: k,
            repeated: E,
            enum: n,
          })
        );
      }
      default: {
        let n = I[e.type];
        return (
          (0, s.assert)(
            n,
            `invalid FieldDescriptorProto: unknown type ${e.type}`,
          ),
          Object.assign(Object.assign({}, T), {
            kind: "field",
            fieldKind: "scalar",
            getDefaultValue: k,
            repeated: E,
            scalar: n,
            longType:
              (null == (c = e.options) ? void 0 : c.jstype) ==
              a.FieldOptions_JSType.JS_STRING
                ? d.LongType.STRING
                : d.LongType.BIGINT,
          })
        );
      }
    }
  }
  function _(e, n, t, o, a) {
    (0, s.assert)(e.extendee, "invalid FieldDescriptorProto: missing extendee");
    let i = f(e, n, null, void 0, o, a),
      m = o.messages.get(N(e.extendee));
    return (
      (0, s.assert)(
        m,
        `invalid FieldDescriptorProto: extendee ${e.extendee} not found`,
      ),
      Object.assign(Object.assign({}, i), {
        kind: "extension",
        typeName: S(e, t, n),
        parent: t,
        file: n,
        extendee: m,
        toString() {
          return `extension ${this.typeName}`;
        },
        getComments() {
          let t = this.parent
            ? [
                ...this.parent.getComments().sourcePath,
                r.DescriptorProto_Extension,
                this.parent.proto.extension.indexOf(e),
              ]
            : [
                r.FileDescriptorProto_Extension,
                this.file.proto.extension.indexOf(e),
              ];
          return h(n.proto.sourceCodeInfo, t);
        },
        getFeatures() {
          var r;
          return a(
            (null != t ? t : n).getFeatures(),
            null == (r = e.options) ? void 0 : r.features,
          );
        },
      })
    );
  }
  function g(e, n) {
    let t, r;
    switch (e) {
      case void 0:
      case "proto2":
        ((r = "proto2"), (t = a.Edition.EDITION_PROTO2));
        break;
      case "proto3":
        ((r = "proto3"), (t = a.Edition.EDITION_PROTO3));
        break;
      case "editions":
        switch (((r = "editions"), n)) {
          case void 0:
          case a.Edition.EDITION_1_TEST_ONLY:
          case a.Edition.EDITION_2_TEST_ONLY:
          case a.Edition.EDITION_99997_TEST_ONLY:
          case a.Edition.EDITION_99998_TEST_ONLY:
          case a.Edition.EDITION_99999_TEST_ONLY:
          case a.Edition.EDITION_UNKNOWN:
            t = a.Edition.EDITION_UNKNOWN;
            break;
          default:
            t = n;
        }
        break;
      default:
        throw Error(`invalid FileDescriptorProto: unsupported syntax: ${e}`);
    }
    if ("editions" === e && n === a.Edition.EDITION_UNKNOWN)
      throw Error(
        `invalid FileDescriptorProto: syntax ${e} cannot have edition ${String(n)}`,
      );
    return { syntax: r, edition: t };
  }
  function S(e, n, t) {
    return (
      (0, s.assert)(e.name, `invalid ${e.getType().typeName}: missing name`),
      n
        ? `${n.typeName}.${e.name}`
        : void 0 !== t.proto.package
          ? `${t.proto.package}.${e.name}`
          : `${e.name}`
    );
  }
  function N(e) {
    return e.startsWith(".") ? e.substring(1) : e;
  }
  t.createDescriptorSet = function (e, n) {
    var t;
    let o = {
        files: [],
        enums: new Map(),
        messages: new Map(),
        services: new Map(),
        extensions: new Map(),
        mapEntries: new Map(),
      },
      m = (0, p.isMessage)(e, a.FileDescriptorSet)
        ? e.file
        : e instanceof Uint8Array
          ? a.FileDescriptorSet.fromBinary(e).file
          : e,
      l = new Map();
    for (let e of m) {
      let m = null != (t = e.edition) ? t : g(e.syntax, e.edition).edition,
        d = l.get(m);
      (void 0 === d &&
        ((d = (0, u.createFeatureResolver)(
          m,
          null == n ? void 0 : n.featureSetDefaults,
          null == n ? void 0 : n.serializationOptions,
        )),
        l.set(m, d)),
        (function (e, n, t) {
          var o, m;
          (0, s.assert)(e.name, "invalid FileDescriptorProto: missing name");
          let l = Object.assign(
            Object.assign(
              {
                kind: "file",
                proto: e,
                deprecated:
                  null !=
                    (m = null == (o = e.options) ? void 0 : o.deprecated) && m,
              },
              g(e.syntax, e.edition),
            ),
            {
              name: e.name.replace(/\.proto/, ""),
              dependencies: (function (e, n) {
                return e.dependency.map((e) => {
                  let t = n.files.find((n) => n.proto.name === e);
                  return ((0, s.assert)(t), t);
                });
              })(e, n),
              enums: [],
              messages: [],
              extensions: [],
              services: [],
              toString() {
                return `file ${this.proto.name}`;
              },
              getSyntaxComments() {
                return h(this.proto.sourceCodeInfo, [
                  r.FileDescriptorProto_Syntax,
                ]);
              },
              getPackageComments() {
                return h(this.proto.sourceCodeInfo, [
                  r.FileDescriptorProto_Package,
                ]);
              },
              getFeatures() {
                var n;
                return t(null == (n = e.options) ? void 0 : n.features);
              },
            },
          );
          for (let r of (n.mapEntries.clear(), e.enumType))
            E(r, l, void 0, n, t);
          for (let o of e.messageType)
            !(function e(n, t, o, a, i) {
              var m, l, u, d;
              (0, s.assert)(n.name, "invalid DescriptorProto: missing name");
              let p = {
                kind: "message",
                proto: n,
                deprecated:
                  null !=
                    (l = null == (m = n.options) ? void 0 : m.deprecated) && l,
                file: t,
                parent: o,
                name: n.name,
                typeName: S(n, o, t),
                fields: [],
                oneofs: [],
                members: [],
                nestedEnums: [],
                nestedMessages: [],
                nestedExtensions: [],
                toString() {
                  return `message ${this.typeName}`;
                },
                getComments() {
                  let e = this.parent
                    ? [
                        ...this.parent.getComments().sourcePath,
                        r.DescriptorProto_NestedType,
                        this.parent.proto.nestedType.indexOf(this.proto),
                      ]
                    : [
                        r.FileDescriptorProto_MessageType,
                        this.file.proto.messageType.indexOf(this.proto),
                      ];
                  return h(t.proto.sourceCodeInfo, e);
                },
                getFeatures() {
                  var e, r;
                  return i(
                    null != (e = null == o ? void 0 : o.getFeatures())
                      ? e
                      : t.getFeatures(),
                    null == (r = n.options) ? void 0 : r.features,
                  );
                },
              };
              for (let e of ((null == (u = n.options) ? void 0 : u.mapEntry) ===
              !0
                ? a.mapEntries.set(p.typeName, p)
                : ((null != (d = null == o ? void 0 : o.nestedMessages)
                    ? d
                    : t.messages
                  ).push(p),
                  a.messages.set(p.typeName, p)),
              n.enumType))
                E(e, t, p, a, i);
              for (let r of n.nestedType) e(r, t, p, a, i);
            })(o, l, void 0, n, t);
          for (let o of e.service)
            !(function (e, n, t, o) {
              var m, l;
              (0, s.assert)(
                e.name,
                "invalid ServiceDescriptorProto: missing name",
              );
              let u = {
                kind: "service",
                proto: e,
                deprecated:
                  null !=
                    (l = null == (m = e.options) ? void 0 : m.deprecated) && l,
                file: n,
                name: e.name,
                typeName: S(e, void 0, n),
                methods: [],
                toString() {
                  return `service ${this.typeName}`;
                },
                getComments() {
                  let e = [
                    r.FileDescriptorProto_Service,
                    this.file.proto.service.indexOf(this.proto),
                  ];
                  return h(n.proto.sourceCodeInfo, e);
                },
                getFeatures() {
                  var t;
                  return o(
                    n.getFeatures(),
                    null == (t = e.options) ? void 0 : t.features,
                  );
                },
              };
              for (let m of (n.services.push(u),
              t.services.set(u.typeName, u),
              e.method))
                u.methods.push(
                  (function (e, n, t, o) {
                    var m, l, u;
                    let d, p;
                    switch (
                      ((0, s.assert)(
                        e.name,
                        "invalid MethodDescriptorProto: missing name",
                      ),
                      (0, s.assert)(
                        e.inputType,
                        "invalid MethodDescriptorProto: missing input_type",
                      ),
                      (0, s.assert)(
                        e.outputType,
                        "invalid MethodDescriptorProto: missing output_type",
                      ),
                      (d =
                        !0 === e.clientStreaming && !0 === e.serverStreaming
                          ? i.MethodKind.BiDiStreaming
                          : !0 === e.clientStreaming
                            ? i.MethodKind.ClientStreaming
                            : !0 === e.serverStreaming
                              ? i.MethodKind.ServerStreaming
                              : i.MethodKind.Unary),
                      null == (m = e.options) ? void 0 : m.idempotencyLevel)
                    ) {
                      case a.MethodOptions_IdempotencyLevel.IDEMPOTENT:
                        p = i.MethodIdempotency.Idempotent;
                        break;
                      case a.MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS:
                        p = i.MethodIdempotency.NoSideEffects;
                        break;
                      case a.MethodOptions_IdempotencyLevel.IDEMPOTENCY_UNKNOWN:
                      case void 0:
                        p = void 0;
                    }
                    let c = t.messages.get(N(e.inputType)),
                      T = t.messages.get(N(e.outputType));
                    ((0, s.assert)(
                      c,
                      `invalid MethodDescriptorProto: input_type ${e.inputType} not found`,
                    ),
                      (0, s.assert)(
                        T,
                        `invalid MethodDescriptorProto: output_type ${e.inputType} not found`,
                      ));
                    let E = e.name;
                    return {
                      kind: "rpc",
                      proto: e,
                      deprecated:
                        null !=
                          (u =
                            null == (l = e.options) ? void 0 : l.deprecated) &&
                        u,
                      parent: n,
                      name: E,
                      methodKind: d,
                      input: c,
                      output: T,
                      idempotency: p,
                      toString: () => `rpc ${n.typeName}.${E}`,
                      getComments() {
                        let e = [
                          ...this.parent.getComments().sourcePath,
                          r.ServiceDescriptorProto_Method,
                          this.parent.proto.method.indexOf(this.proto),
                        ];
                        return h(n.file.proto.sourceCodeInfo, e);
                      },
                      getFeatures() {
                        var t;
                        return o(
                          n.getFeatures(),
                          null == (t = e.options) ? void 0 : t.features,
                        );
                      },
                    };
                  })(m, u, t, o),
                );
            })(o, l, n, t);
          for (let e of (c(l, n, t), n.mapEntries.values())) T(e, n, t);
          for (let e of l.messages) (T(e, n, t), c(e, n, t));
          (n.mapEntries.clear(), n.files.push(l));
        })(e, o, d));
    }
    return o;
  };
  let I = {
    [a.FieldDescriptorProto_Type.DOUBLE]: d.ScalarType.DOUBLE,
    [a.FieldDescriptorProto_Type.FLOAT]: d.ScalarType.FLOAT,
    [a.FieldDescriptorProto_Type.INT64]: d.ScalarType.INT64,
    [a.FieldDescriptorProto_Type.UINT64]: d.ScalarType.UINT64,
    [a.FieldDescriptorProto_Type.INT32]: d.ScalarType.INT32,
    [a.FieldDescriptorProto_Type.FIXED64]: d.ScalarType.FIXED64,
    [a.FieldDescriptorProto_Type.FIXED32]: d.ScalarType.FIXED32,
    [a.FieldDescriptorProto_Type.BOOL]: d.ScalarType.BOOL,
    [a.FieldDescriptorProto_Type.STRING]: d.ScalarType.STRING,
    [a.FieldDescriptorProto_Type.GROUP]: void 0,
    [a.FieldDescriptorProto_Type.MESSAGE]: void 0,
    [a.FieldDescriptorProto_Type.BYTES]: d.ScalarType.BYTES,
    [a.FieldDescriptorProto_Type.UINT32]: d.ScalarType.UINT32,
    [a.FieldDescriptorProto_Type.ENUM]: void 0,
    [a.FieldDescriptorProto_Type.SFIXED32]: d.ScalarType.SFIXED32,
    [a.FieldDescriptorProto_Type.SFIXED64]: d.ScalarType.SFIXED64,
    [a.FieldDescriptorProto_Type.SINT32]: d.ScalarType.SINT32,
    [a.FieldDescriptorProto_Type.SINT64]: d.ScalarType.SINT64,
  };
  function h(e, n) {
    if (!e) return { leadingDetached: [], sourcePath: n };
    for (let t of e.location)
      if (t.path.length === n.length && !t.path.some((e, t) => n[t] !== e))
        return {
          leadingDetached: t.leadingDetachedComments,
          leading: t.leadingComments,
          trailing: t.trailingComments,
          sourcePath: n,
        };
    return { leadingDetached: [], sourcePath: n };
  }
  function y() {
    var e, n, t;
    let r,
      o = [];
    switch (
      (this.repeated && o.push("repeated"),
      this.optional && o.push("optional"),
      "proto2" ==
        ("extension" === this.kind ? this.file : this.parent.file).syntax &&
        this.proto.label === a.FieldDescriptorProto_Label.REQUIRED &&
        o.push("required"),
      this.fieldKind)
    ) {
      case "scalar":
        r = d.ScalarType[this.scalar].toLowerCase();
        break;
      case "enum":
        r = this.enum.typeName;
        break;
      case "message":
        r = this.message.typeName;
        break;
      case "map": {
        let e,
          n = d.ScalarType[this.mapKey].toLowerCase();
        switch (this.mapValue.kind) {
          case "scalar":
            e = d.ScalarType[this.mapValue.scalar].toLowerCase();
            break;
          case "enum":
            e = this.mapValue.enum.typeName;
            break;
          case "message":
            e = this.mapValue.message.typeName;
        }
        r = `map<${n}, ${e}>`;
      }
    }
    o.push(`${r} ${this.name} = ${this.number}`);
    let s = [];
    (null == (e = this.proto.options) ? void 0 : e.packed) !== void 0 &&
      s.push(`packed = ${this.proto.options.packed.toString()}`);
    let i = this.proto.defaultValue;
    return (
      void 0 !== i &&
        ((this.proto.type == a.FieldDescriptorProto_Type.BYTES ||
          this.proto.type == a.FieldDescriptorProto_Type.STRING) &&
          (i = '"' + i.replace('"', '\\"') + '"'),
        s.push(`default = ${i}`)),
      void 0 !== this.jsonName && s.push(`json_name = "${this.jsonName}"`),
      (null == (n = this.proto.options) ? void 0 : n.jstype) !== void 0 &&
        s.push(`jstype = ${a.FieldOptions_JSType[this.proto.options.jstype]}`),
      (null == (t = this.proto.options) ? void 0 : t.deprecated) === !0 &&
        s.push("deprecated = true"),
      s.length > 0 && o.push("[" + s.join(", ") + "]"),
      o.join(" ")
    );
  }
  function k() {
    let e = this.proto.defaultValue;
    if (void 0 !== e)
      switch (this.fieldKind) {
        case "enum":
          return (0, l.parseTextFormatEnumValue)(this.enum, e);
        case "scalar":
          return (0, l.parseTextFormatScalarValue)(this.scalar, e);
        default:
          return;
      }
  }
  (((o = r || (r = {}))[(o.FileDescriptorProto_Package = 2)] =
    "FileDescriptorProto_Package"),
    (o[(o.FileDescriptorProto_MessageType = 4)] =
      "FileDescriptorProto_MessageType"),
    (o[(o.FileDescriptorProto_EnumType = 5)] = "FileDescriptorProto_EnumType"),
    (o[(o.FileDescriptorProto_Service = 6)] = "FileDescriptorProto_Service"),
    (o[(o.FileDescriptorProto_Extension = 7)] =
      "FileDescriptorProto_Extension"),
    (o[(o.FileDescriptorProto_Syntax = 12)] = "FileDescriptorProto_Syntax"),
    (o[(o.DescriptorProto_Field = 2)] = "DescriptorProto_Field"),
    (o[(o.DescriptorProto_NestedType = 3)] = "DescriptorProto_NestedType"),
    (o[(o.DescriptorProto_EnumType = 4)] = "DescriptorProto_EnumType"),
    (o[(o.DescriptorProto_Extension = 6)] = "DescriptorProto_Extension"),
    (o[(o.DescriptorProto_OneofDecl = 8)] = "DescriptorProto_OneofDecl"),
    (o[(o.EnumDescriptorProto_Value = 2)] = "EnumDescriptorProto_Value"),
    (o[(o.ServiceDescriptorProto_Method = 2)] =
      "ServiceDescriptorProto_Method"));
};
