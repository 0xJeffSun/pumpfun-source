// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.createRegistryFromDescriptors = void 0));
  let r = e.r(740640),
    o = e.r(962748),
    a = e.r(455843),
    s = e.r(631268),
    i = e.r(385472),
    m = e.r(836320),
    l = e.r(416420),
    u = e.r(305318),
    d = e.r(876699),
    p = e.r(670691),
    c = e.r(698002),
    T = e.r(871631),
    E = e.r(953124),
    f = e.r(62277),
    _ = e.r(503158),
    g = [
      l.Any,
      m.Duration,
      u.Empty,
      d.FieldMask,
      p.Struct,
      p.Value,
      p.ListValue,
      i.Timestamp,
      m.Duration,
      T.DoubleValue,
      T.FloatValue,
      T.Int64Value,
      T.Int32Value,
      T.UInt32Value,
      T.UInt64Value,
      T.BoolValue,
      T.StringValue,
      T.BytesValue,
    ],
    S = [(0, c.getEnumType)(p.NullValue)];
  function N(e, n) {
    var t;
    let o = {
      kind: e.fieldKind,
      no: e.number,
      name: e.name,
      jsonName: e.jsonName,
      delimited: e.proto.type == E.FieldDescriptorProto_Type.GROUP,
      repeated: e.repeated,
      packed: e.packed,
      oneof: null == (t = e.oneof) ? void 0 : t.name,
      opt: e.optional,
      req: e.proto.label === E.FieldDescriptorProto_Label.REQUIRED,
    };
    switch (e.fieldKind) {
      case "map": {
        let t;
        switch (((0, r.assert)("field" == e.kind), e.mapValue.kind)) {
          case "scalar":
            t = e.mapValue.scalar;
            break;
          case "enum":
            t = I(e.mapValue.enum, n, e);
            break;
          case "message":
            t = I(e.mapValue.message, n, e);
        }
        ((o.K = e.mapKey), (o.V = { kind: e.mapValue.kind, T: t }));
        break;
      }
      case "message":
        o.T = I(e.message, n, e);
        break;
      case "enum":
        ((o.T = I(e.enum, n, e)), (o.default = e.getDefaultValue()));
        break;
      case "scalar":
        ((o.L = e.longType),
          (o.T = e.scalar),
          (o.default = e.getDefaultValue()));
    }
    return o;
  }
  function I(e, n, t) {
    let o =
      "message" == e.kind ? n.findMessage(e.typeName) : n.findEnum(e.typeName);
    return (
      (0, r.assert)(o, `${e.toString()}" for ${t.toString()} not found`),
      o
    );
  }
  t.createRegistryFromDescriptors = function (e, n = !0) {
    let t =
        e instanceof Uint8Array || (0, _.isMessage)(e, E.FileDescriptorSet)
          ? (0, f.createDescriptorSet)(e)
          : e,
      r = new Map(),
      i = new Map(),
      m = new Map(),
      l = new Map(),
      u = {};
    if (n) {
      for (let e of g) i.set(e.typeName, e);
      for (let e of S) r.set(e.typeName, e);
    }
    return {
      findEnum(e) {
        let n = r.get(e);
        if (n) return n;
        let i = t.enums.get(e);
        if (!i) return;
        let m = ("proto3" == i.file.syntax ? o.proto3 : a.proto2).makeEnumType(
          e,
          i.values.map((e) => ({
            no: e.number,
            name: e.name,
            localName: (0, s.localName)(e),
          })),
          {},
        );
        return (r.set(e, m), m);
      },
      findMessage(e) {
        let n = i.get(e);
        if (n) return n;
        let r = t.messages.get(e);
        if (!r) return;
        let m = "proto3" == r.file.syntax ? o.proto3 : a.proto2,
          l = [],
          u = m.makeMessageType(e, () => l, { localName: (0, s.localName)(r) });
        for (let n of (i.set(e, u), r.fields)) l.push(N(n, this));
        return u;
      },
      findService(e) {
        let n = u[e];
        if (n) return n;
        let r = t.services.get(e);
        if (!r) return;
        let o = {};
        for (let e of r.methods) {
          let n = I(e.input, this, e),
            t = I(e.output, this, e);
          o[(0, s.localName)(e)] = {
            name: e.name,
            I: n,
            O: t,
            kind: e.methodKind,
            idempotency: e.idempotency,
          };
        }
        return (u[e] = { typeName: r.typeName, methods: o });
      },
      findExtensionFor(e, n) {
        var r;
        if (!t.messages.has(e)) return;
        let o = l.get(e);
        if (!o)
          for (let n of ((o = new Map()), l.set(e, o), t.extensions.values()))
            n.extendee.typeName == e && o.set(n.number, n);
        let a = null == (r = l.get(e)) ? void 0 : r.get(n);
        return a ? this.findExtension(a.typeName) : void 0;
      },
      findExtension(e) {
        let n = m.get(e);
        if (n) return n;
        let r = t.extensions.get(e);
        if (!r) return;
        let s = I(r.extendee, this, r),
          i = ("proto3" == r.file.syntax ? o.proto3 : a.proto2).makeExtension(
            e,
            s,
            N(r, this),
          );
        return (m.set(e, i), i);
      },
    };
  };
};
