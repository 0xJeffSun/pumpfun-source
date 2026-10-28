// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.makeJsonFormat = void 0));
  let r = e.r(740640),
    o = e.r(479723),
    a = e.r(955874),
    s = e.r(842572),
    i = e.r(955979),
    m = e.r(187081),
    l = e.r(577318),
    u = e.r(90281),
    d = e.r(90281),
    p = e.r(138614),
    c = e.r(503158),
    T = { ignoreUnknownFields: !1 },
    E = {
      emitDefaultValues: !1,
      enumAsInteger: !1,
      useProtoFieldName: !1,
      prettySpaces: 0,
    };
  function f(e) {
    return e ? Object.assign(Object.assign({}, T), e) : T;
  }
  function _(e) {
    return e ? Object.assign(Object.assign({}, E), e) : E;
  }
  let g = Symbol(),
    S = Symbol();
  function N(e) {
    if (null === e) return "null";
    switch (typeof e) {
      case "object":
        return Array.isArray(e) ? "array" : "object";
      case "string":
        return e.length > 100 ? "string" : `"${e.split('"').join('\\"')}"`;
      default:
        return String(e);
    }
  }
  function I(e, n, t, o, a) {
    let s = t.localName;
    if (t.repeated) {
      if (((0, r.assert)("map" != t.kind), null === n)) return;
      if (!Array.isArray(n))
        throw Error(
          `cannot decode field ${a.typeName}.${t.name} from JSON: ${N(n)}`,
        );
      let i = e[s];
      for (let e of n) {
        if (null === e)
          throw Error(
            `cannot decode field ${a.typeName}.${t.name} from JSON: ${N(e)}`,
          );
        switch (t.kind) {
          case "message":
            i.push(t.T.fromJson(e, o));
            break;
          case "enum":
            let n = y(t.T, e, o.ignoreUnknownFields, !0);
            n !== S && i.push(n);
            break;
          case "scalar":
            try {
              i.push(h(t.T, e, t.L, !0));
            } catch (r) {
              let n = `cannot decode field ${a.typeName}.${t.name} from JSON: ${N(e)}`;
              throw (
                r instanceof Error &&
                  r.message.length > 0 &&
                  (n += `: ${r.message}`),
                Error(n)
              );
            }
        }
      }
    } else if ("map" == t.kind) {
      if (null === n) return;
      if ("object" != typeof n || Array.isArray(n))
        throw Error(
          `cannot decode field ${a.typeName}.${t.name} from JSON: ${N(n)}`,
        );
      let r = e[s];
      for (let [e, s] of Object.entries(n)) {
        let i;
        if (null === s)
          throw Error(
            `cannot decode field ${a.typeName}.${t.name} from JSON: map value null`,
          );
        try {
          i = (function (e, n) {
            if (e === p.ScalarType.BOOL)
              switch (n) {
                case "true":
                  n = !0;
                  break;
                case "false":
                  n = !1;
              }
            return h(e, n, p.LongType.BIGINT, !0).toString();
          })(t.K, e);
        } catch (r) {
          let e = `cannot decode map key for field ${a.typeName}.${t.name} from JSON: ${N(n)}`;
          throw (
            r instanceof Error &&
              r.message.length > 0 &&
              (e += `: ${r.message}`),
            Error(e)
          );
        }
        switch (t.V.kind) {
          case "message":
            r[i] = t.V.T.fromJson(s, o);
            break;
          case "enum":
            let m = y(t.V.T, s, o.ignoreUnknownFields, !0);
            m !== S && (r[i] = m);
            break;
          case "scalar":
            try {
              r[i] = h(t.V.T, s, p.LongType.BIGINT, !0);
            } catch (r) {
              let e = `cannot decode map value for field ${a.typeName}.${t.name} from JSON: ${N(n)}`;
              throw (
                r instanceof Error &&
                  r.message.length > 0 &&
                  (e += `: ${r.message}`),
                Error(e)
              );
            }
        }
      }
    } else
      switch (
        (t.oneof && ((e = e[t.oneof.localName] = { case: s }), (s = "value")),
        t.kind)
      ) {
        case "message":
          let i = t.T;
          if (null === n && "google.protobuf.Value" != i.typeName) return;
          let l = e[s];
          (0, c.isMessage)(l)
            ? l.fromJson(n, o)
            : ((e[s] = l = i.fromJson(n, o)),
              i.fieldWrapper &&
                !t.oneof &&
                (e[s] = i.fieldWrapper.unwrapField(l)));
          break;
        case "enum":
          let u = y(t.T, n, o.ignoreUnknownFields, !1);
          switch (u) {
            case g:
              (0, m.clearField)(t, e);
              break;
            case S:
              break;
            default:
              e[s] = u;
          }
          break;
        case "scalar":
          try {
            let r = h(t.T, n, t.L, !1);
            r === g ? (0, m.clearField)(t, e) : (e[s] = r);
          } catch (r) {
            let e = `cannot decode field ${a.typeName}.${t.name} from JSON: ${N(n)}`;
            throw (
              r instanceof Error &&
                r.message.length > 0 &&
                (e += `: ${r.message}`),
              Error(e)
            );
          }
      }
  }
  function h(e, n, t, s) {
    if (null === n) return s ? (0, u.scalarZeroValue)(e, t) : g;
    switch (e) {
      case p.ScalarType.DOUBLE:
      case p.ScalarType.FLOAT:
        if ("NaN" === n) return 0 / 0;
        if ("Infinity" === n) return 1 / 0;
        if ("-Infinity" === n) return -1 / 0;
        if (
          "" === n ||
          ("string" == typeof n && n.trim().length !== n.length) ||
          ("string" != typeof n && "number" != typeof n)
        )
          break;
        let i = Number(n);
        if (Number.isNaN(i) || !Number.isFinite(i)) break;
        return (e == p.ScalarType.FLOAT && (0, r.assertFloat32)(i), i);
      case p.ScalarType.INT32:
      case p.ScalarType.FIXED32:
      case p.ScalarType.SFIXED32:
      case p.ScalarType.SINT32:
      case p.ScalarType.UINT32:
        let m;
        if (
          ("number" == typeof n
            ? (m = n)
            : "string" == typeof n &&
              n.length > 0 &&
              n.trim().length === n.length &&
              (m = Number(n)),
          void 0 === m)
        )
          break;
        return (
          e == p.ScalarType.UINT32 || e == p.ScalarType.FIXED32
            ? (0, r.assertUInt32)(m)
            : (0, r.assertInt32)(m),
          m
        );
      case p.ScalarType.INT64:
      case p.ScalarType.SFIXED64:
      case p.ScalarType.SINT64:
        if ("number" != typeof n && "string" != typeof n) break;
        let l = o.protoInt64.parse(n);
        return t ? l.toString() : l;
      case p.ScalarType.FIXED64:
      case p.ScalarType.UINT64:
        if ("number" != typeof n && "string" != typeof n) break;
        let d = o.protoInt64.uParse(n);
        return t ? d.toString() : d;
      case p.ScalarType.BOOL:
        if ("boolean" != typeof n) break;
        return n;
      case p.ScalarType.STRING:
        if ("string" != typeof n) break;
        try {
          encodeURIComponent(n);
        } catch (e) {
          throw Error("invalid UTF8");
        }
        return n;
      case p.ScalarType.BYTES:
        if ("" === n) return new Uint8Array(0);
        if ("string" != typeof n) break;
        return a.protoBase64.dec(n);
    }
    throw Error();
  }
  function y(e, n, t, r) {
    if (null === n)
      return "google.protobuf.NullValue" == e.typeName
        ? 0
        : r
          ? e.values[0].no
          : g;
    switch (typeof n) {
      case "number":
        if (Number.isInteger(n)) return n;
        break;
      case "string":
        let o = e.findName(n);
        if (void 0 !== o) return o.no;
        if (t) return S;
    }
    throw Error(`cannot decode enum ${e.typeName} from JSON: ${N(n)}`);
  }
  function k(e, n, t) {
    if ("map" == e.kind) {
      (0, r.assert)("object" == typeof n && null != n);
      let o = {},
        a = Object.entries(n);
      switch (e.V.kind) {
        case "scalar":
          for (let [n, t] of a) o[n.toString()] = R(e.V.T, t);
          break;
        case "message":
          for (let [e, n] of a) o[e.toString()] = n.toJson(t);
          break;
        case "enum":
          let s = e.V.T;
          for (let [e, n] of a) o[e.toString()] = O(s, n, t.enumAsInteger);
      }
      return t.emitDefaultValues || a.length > 0 ? o : void 0;
    }
    if (e.repeated) {
      (0, r.assert)(Array.isArray(n));
      let o = [];
      switch (e.kind) {
        case "scalar":
          for (let t = 0; t < n.length; t++) o.push(R(e.T, n[t]));
          break;
        case "enum":
          for (let r = 0; r < n.length; r++)
            o.push(O(e.T, n[r], t.enumAsInteger));
          break;
        case "message":
          for (let e = 0; e < n.length; e++) o.push(n[e].toJson(t));
      }
      return t.emitDefaultValues || o.length > 0 ? o : void 0;
    }
    switch (e.kind) {
      case "scalar":
        return R(e.T, n);
      case "enum":
        return O(e.T, n, t.enumAsInteger);
      case "message":
        return (0, l.wrapField)(e.T, n).toJson(t);
    }
  }
  function O(e, n, t) {
    var o;
    if (
      ((0, r.assert)("number" == typeof n),
      "google.protobuf.NullValue" == e.typeName)
    )
      return null;
    if (t) return n;
    let a = e.findNumber(n);
    return null != (o = null == a ? void 0 : a.name) ? o : n;
  }
  function R(e, n) {
    switch (e) {
      case p.ScalarType.INT32:
      case p.ScalarType.SFIXED32:
      case p.ScalarType.SINT32:
      case p.ScalarType.FIXED32:
      case p.ScalarType.UINT32:
        return ((0, r.assert)("number" == typeof n), n);
      case p.ScalarType.FLOAT:
      case p.ScalarType.DOUBLE:
        if (((0, r.assert)("number" == typeof n), Number.isNaN(n)))
          return "NaN";
        if (1 / 0 === n) return "Infinity";
        if (-1 / 0 === n) return "-Infinity";
        return n;
      case p.ScalarType.STRING:
        return ((0, r.assert)("string" == typeof n), n);
      case p.ScalarType.BOOL:
        return ((0, r.assert)("boolean" == typeof n), n);
      case p.ScalarType.UINT64:
      case p.ScalarType.FIXED64:
      case p.ScalarType.INT64:
      case p.ScalarType.SFIXED64:
      case p.ScalarType.SINT64:
        return (
          (0, r.assert)(
            "bigint" == typeof n ||
              "string" == typeof n ||
              "number" == typeof n,
          ),
          n.toString()
        );
      case p.ScalarType.BYTES:
        return ((0, r.assert)(n instanceof Uint8Array), a.protoBase64.enc(n));
    }
  }
  t.makeJsonFormat = function () {
    return {
      makeReadOptions: f,
      makeWriteOptions: _,
      readMessage(e, n, t, r) {
        if (null == n || Array.isArray(n) || "object" != typeof n)
          throw Error(`cannot decode message ${e.typeName} from JSON: ${N(n)}`);
        r = null != r ? r : new e();
        let o = new Map(),
          a = t.typeRegistry;
        for (let [m, l] of Object.entries(n)) {
          let n = e.fields.findJsonName(m);
          if (n) {
            if (n.oneof) {
              if (null === l && "scalar" == n.kind) continue;
              let t = o.get(n.oneof);
              if (void 0 !== t)
                throw Error(
                  `cannot decode message ${e.typeName} from JSON: multiple keys for oneof "${n.oneof.name}" present: "${t}", "${m}"`,
                );
              o.set(n.oneof, m);
            }
            I(r, l, n, t, e);
          } else {
            let n = !1;
            if (
              (null == a ? void 0 : a.findExtension) &&
              m.startsWith("[") &&
              m.endsWith("]")
            ) {
              let o = a.findExtension(m.substring(1, m.length - 1));
              if (o && o.extendee.typeName == e.typeName) {
                n = !0;
                let [e, a] = (0, s.createExtensionContainer)(o);
                (I(e, l, o.field, t, o), (0, i.setExtension)(r, o, a(), t));
              }
            }
            if (!n && !t.ignoreUnknownFields)
              throw Error(
                `cannot decode message ${e.typeName} from JSON: key "${m}" is unknown`,
              );
          }
        }
        return r;
      },
      writeMessage(e, n) {
        let t,
          r = e.getType(),
          o = {};
        try {
          for (t of r.fields.byNumber()) {
            if (!(0, m.isFieldSet)(t, e)) {
              var a;
              if (t.req) throw "required field not set";
              if (
                !n.emitDefaultValues ||
                !(
                  (a = t).repeated ||
                  "map" == a.kind ||
                  (!a.oneof && "message" != a.kind && !a.opt && !a.req)
                )
              )
                continue;
            }
            let r = t.oneof ? e[t.oneof.localName].value : e[t.localName],
              s = k(t, r, n);
            void 0 !== s && (o[n.useProtoFieldName ? t.name : t.jsonName] = s);
          }
          let s = n.typeRegistry;
          if (null == s ? void 0 : s.findExtensionFor)
            for (let t of r.runtime.bin.listUnknownFields(e)) {
              let a = s.findExtensionFor(r.typeName, t.no);
              if (a && (0, i.hasExtension)(e, a)) {
                let t = (0, i.getExtension)(e, a, n),
                  r = k(a.field, t, n);
                void 0 !== r && (o[a.field.jsonName] = r);
              }
            }
        } catch (o) {
          let e = t
              ? `cannot encode field ${r.typeName}.${t.name} to JSON`
              : `cannot encode message ${r.typeName} to JSON`,
            n = o instanceof Error ? o.message : String(o);
          throw Error(e + (n.length > 0 ? `: ${n}` : ""));
        }
        return o;
      },
      readScalar: (e, n, t) => h(e, n, null != t ? t : p.LongType.BIGINT, !0),
      writeScalar(e, n, t) {
        if (void 0 !== n && (t || (0, d.isScalarZeroValue)(e, n)))
          return R(e, n);
      },
      debug: N,
    };
  };
};
