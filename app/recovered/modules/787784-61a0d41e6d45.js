// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.writeMapEntry = t.makeBinaryFormat = void 0));
  let r = e.r(792060),
    o = e.r(577318),
    a = e.r(90281),
    s = e.r(740640),
    i = e.r(187081),
    m = e.r(138614),
    l = e.r(503158),
    u = Symbol("@bufbuild/protobuf/unknown-fields"),
    d = { readUnknownFields: !0, readerFactory: (e) => new r.BinaryReader(e) },
    p = { writeUnknownFields: !0, writerFactory: () => new r.BinaryWriter() };
  function c(e) {
    return e ? Object.assign(Object.assign({}, d), e) : d;
  }
  function T(e) {
    return e ? Object.assign(Object.assign({}, p), e) : p;
  }
  function E(e, n, t, o, s) {
    let { repeated: i, localName: u } = t;
    switch (
      (t.oneof &&
        ((e = e[t.oneof.localName]).case != u && delete e.value,
        (e.case = u),
        (u = "value")),
      t.kind)
    ) {
      case "scalar":
      case "enum":
        let d = "enum" == t.kind ? m.ScalarType.INT32 : t.T,
          p = g;
        if (("scalar" == t.kind && t.L > 0 && (p = _), i)) {
          let t = e[u];
          if (
            o == r.WireType.LengthDelimited &&
            d != m.ScalarType.STRING &&
            d != m.ScalarType.BYTES
          ) {
            let e = n.uint32() + n.pos;
            for (; n.pos < e; ) t.push(p(n, d));
          } else t.push(p(n, d));
        } else e[u] = p(n, d);
        break;
      case "message":
        let c = t.T;
        i
          ? e[u].push(f(n, new c(), s, t))
          : (0, l.isMessage)(e[u])
            ? f(n, e[u], s, t)
            : ((e[u] = f(n, new c(), s, t)),
              !c.fieldWrapper ||
                t.oneof ||
                t.repeated ||
                (e[u] = c.fieldWrapper.unwrapField(e[u])));
        break;
      case "map":
        let [T, E] = (function (e, n, t) {
          let r,
            o,
            s = n.uint32(),
            i = n.pos + s;
          for (; n.pos < i; ) {
            let [a] = n.tag();
            switch (a) {
              case 1:
                r = g(n, e.K);
                break;
              case 2:
                switch (e.V.kind) {
                  case "scalar":
                    o = g(n, e.V.T);
                    break;
                  case "enum":
                    o = n.int32();
                    break;
                  case "message":
                    o = f(n, new e.V.T(), t, void 0);
                }
            }
          }
          if (
            (void 0 === r &&
              (r = (0, a.scalarZeroValue)(e.K, m.LongType.BIGINT)),
            "string" != typeof r && "number" != typeof r && (r = r.toString()),
            void 0 === o)
          )
            switch (e.V.kind) {
              case "scalar":
                o = (0, a.scalarZeroValue)(e.V.T, m.LongType.BIGINT);
                break;
              case "enum":
                o = e.V.T.values[0].no;
                break;
              case "message":
                o = new e.V.T();
            }
          return [r, o];
        })(t, n, s);
        e[u][T] = E;
    }
  }
  function f(e, n, t, r) {
    let o = n.getType().runtime.bin,
      a = null == r ? void 0 : r.delimited;
    return (o.readMessage(n, e, a ? r.no : e.uint32(), t, a), n);
  }
  function _(e, n) {
    let t = g(e, n);
    return "bigint" == typeof t ? t.toString() : t;
  }
  function g(e, n) {
    switch (n) {
      case m.ScalarType.STRING:
        return e.string();
      case m.ScalarType.BOOL:
        return e.bool();
      case m.ScalarType.DOUBLE:
        return e.double();
      case m.ScalarType.FLOAT:
        return e.float();
      case m.ScalarType.INT32:
        return e.int32();
      case m.ScalarType.INT64:
        return e.int64();
      case m.ScalarType.UINT64:
        return e.uint64();
      case m.ScalarType.FIXED64:
        return e.fixed64();
      case m.ScalarType.BYTES:
        return e.bytes();
      case m.ScalarType.FIXED32:
        return e.fixed32();
      case m.ScalarType.SFIXED32:
        return e.sfixed32();
      case m.ScalarType.SFIXED64:
        return e.sfixed64();
      case m.ScalarType.SINT64:
        return e.sint64();
      case m.ScalarType.UINT32:
        return e.uint32();
      case m.ScalarType.SINT32:
        return e.sint32();
    }
  }
  function S(e, n, t, o) {
    (0, s.assert)(void 0 !== n);
    let a = e.repeated;
    switch (e.kind) {
      case "scalar":
      case "enum":
        let i = "enum" == e.kind ? m.ScalarType.INT32 : e.T;
        if (a)
          if (((0, s.assert)(Array.isArray(n)), e.packed))
            !(function (e, n, t, o) {
              if (!o.length) return;
              e.tag(t, r.WireType.LengthDelimited).fork();
              let [, a] = y(n);
              for (let n = 0; n < o.length; n++) e[a](o[n]);
              e.join();
            })(t, i, e.no, n);
          else for (let r of n) h(t, i, e.no, r);
        else h(t, i, e.no, n);
        break;
      case "message":
        if (a)
          for (let r of ((0, s.assert)(Array.isArray(n)), n)) I(t, o, e, r);
        else I(t, o, e, n);
        break;
      case "map":
        for (let [r, a] of ((0, s.assert)("object" == typeof n && null != n),
        Object.entries(n)))
          N(t, o, e, r, a);
    }
  }
  function N(e, n, t, o, a) {
    (e.tag(t.no, r.WireType.LengthDelimited), e.fork());
    let i = o;
    switch (t.K) {
      case m.ScalarType.INT32:
      case m.ScalarType.FIXED32:
      case m.ScalarType.UINT32:
      case m.ScalarType.SFIXED32:
      case m.ScalarType.SINT32:
        i = Number.parseInt(o);
        break;
      case m.ScalarType.BOOL:
        ((0, s.assert)("true" == o || "false" == o), (i = "true" == o));
    }
    switch ((h(e, t.K, 1, i), t.V.kind)) {
      case "scalar":
        h(e, t.V.T, 2, a);
        break;
      case "enum":
        h(e, m.ScalarType.INT32, 2, a);
        break;
      case "message":
        ((0, s.assert)(void 0 !== a),
          e.tag(2, r.WireType.LengthDelimited).bytes(a.toBinary(n)));
    }
    e.join();
  }
  function I(e, n, t, a) {
    let s = (0, o.wrapField)(t.T, a);
    t.delimited
      ? e
          .tag(t.no, r.WireType.StartGroup)
          .raw(s.toBinary(n))
          .tag(t.no, r.WireType.EndGroup)
      : e.tag(t.no, r.WireType.LengthDelimited).bytes(s.toBinary(n));
  }
  function h(e, n, t, r) {
    (0, s.assert)(void 0 !== r);
    let [o, a] = y(n);
    e.tag(t, o)[a](r);
  }
  function y(e) {
    let n = r.WireType.Varint;
    switch (e) {
      case m.ScalarType.BYTES:
      case m.ScalarType.STRING:
        n = r.WireType.LengthDelimited;
        break;
      case m.ScalarType.DOUBLE:
      case m.ScalarType.FIXED64:
      case m.ScalarType.SFIXED64:
        n = r.WireType.Bit64;
        break;
      case m.ScalarType.FIXED32:
      case m.ScalarType.SFIXED32:
      case m.ScalarType.FLOAT:
        n = r.WireType.Bit32;
    }
    return [n, m.ScalarType[e].toLowerCase()];
  }
  ((t.makeBinaryFormat = function () {
    return {
      makeReadOptions: c,
      makeWriteOptions: T,
      listUnknownFields(e) {
        var n;
        return null != (n = e[u]) ? n : [];
      },
      discardUnknownFields(e) {
        delete e[u];
      },
      writeUnknownFields(e, n) {
        let t = e[u];
        if (t) for (let e of t) n.tag(e.no, e.wireType).raw(e.data);
      },
      onUnknownField(e, n, t, r) {
        (Array.isArray(e[u]) || (e[u] = []),
          e[u].push({ no: n, wireType: t, data: r }));
      },
      readMessage(e, n, t, o, a) {
        let s,
          i,
          m = e.getType(),
          l = a ? n.len : n.pos + t;
        for (
          ;
          n.pos < l &&
          (([s, i] = n.tag()), !0 !== a || i != r.WireType.EndGroup);

        ) {
          let t = m.fields.find(s);
          if (!t) {
            let t = n.skip(i, s);
            o.readUnknownFields && this.onUnknownField(e, s, i, t);
            continue;
          }
          E(e, n, t, i, o);
        }
        if (a && (i != r.WireType.EndGroup || s !== t))
          throw Error("invalid end group tag");
      },
      readField: E,
      writeMessage(e, n, t) {
        let r = e.getType();
        for (let o of r.fields.byNumber()) {
          if (!(0, i.isFieldSet)(o, e)) {
            if (o.req)
              throw Error(
                `cannot encode field ${r.typeName}.${o.name} to binary: required field not set`,
              );
            continue;
          }
          let a = o.oneof ? e[o.oneof.localName].value : e[o.localName];
          S(o, a, n, t);
        }
        return (t.writeUnknownFields && this.writeUnknownFields(e, n), n);
      },
      writeField(e, n, t, r) {
        void 0 !== n && S(e, n, t, r);
      },
    };
  }),
    (t.writeMapEntry = N));
};
