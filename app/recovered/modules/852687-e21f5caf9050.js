// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function n(e, n) {
    if (!e) throw Error(n);
  }
  function t(e) {
    if ("number" != typeof e) throw Error("invalid int 32: " + typeof e);
    if (!Number.isInteger(e) || e > 0x7fffffff || e < -0x80000000)
      throw Error("invalid int 32: " + e);
  }
  function a(e) {
    if ("number" != typeof e) throw Error("invalid uint 32: " + typeof e);
    if (!Number.isInteger(e) || e > 0xffffffff || e < 0)
      throw Error("invalid uint 32: " + e);
  }
  function r(e) {
    if ("number" != typeof e) throw Error("invalid float 32: " + typeof e);
    if (
      Number.isFinite(e) &&
      (e > 34028234663852886e22 || e < -34028234663852886e22)
    )
      throw Error("invalid float 32: " + e);
  }
  let i = Symbol("@bufbuild/protobuf/enum-type");
  function o(e, n, t, a) {
    e[i] = s(
      n,
      t.map((n) => ({ no: n.no, name: n.name, localName: e[n.no] })),
      a,
    );
  }
  function s(e, n, t) {
    let a = Object.create(null),
      r = Object.create(null),
      i = [];
    for (let e of n) {
      let n = l(e);
      (i.push(n), (a[e.name] = n), (r[e.no] = n));
    }
    return {
      typeName: e,
      values: i,
      findName: (e) => a[e],
      findNumber: (e) => r[e],
    };
  }
  function l(e) {
    return "localName" in e
      ? e
      : Object.assign(Object.assign({}, e), { localName: e.name });
  }
  class c {
    equals(e) {
      return this.getType().runtime.util.equals(this.getType(), this, e);
    }
    clone() {
      return this.getType().runtime.util.clone(this);
    }
    fromBinary(e, n) {
      let t = this.getType().runtime.bin,
        a = t.makeReadOptions(n);
      return (t.readMessage(this, a.readerFactory(e), e.byteLength, a), this);
    }
    fromJson(e, n) {
      let t = this.getType(),
        a = t.runtime.json,
        r = a.makeReadOptions(n);
      return (a.readMessage(t, e, r, this), this);
    }
    fromJsonString(e, n) {
      let t;
      try {
        t = JSON.parse(e);
      } catch (e) {
        throw Error(
          `cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
      return this.fromJson(t, n);
    }
    toBinary(e) {
      let n = this.getType().runtime.bin,
        t = n.makeWriteOptions(e),
        a = t.writerFactory();
      return (n.writeMessage(this, a, t), a.finish());
    }
    toJson(e) {
      let n = this.getType().runtime.json,
        t = n.makeWriteOptions(e);
      return n.writeMessage(this, t);
    }
    toJsonString(e) {
      var n;
      return JSON.stringify(
        this.toJson(e),
        null,
        null != (n = null == e ? void 0 : e.prettySpaces) ? n : 0,
      );
    }
    toJSON() {
      return this.toJson({ emitDefaultValues: !0 });
    }
    getType() {
      return Object.getPrototypeOf(this).constructor;
    }
  }
  var u,
    d,
    m,
    p,
    f,
    h,
    g,
    k,
    T = e.i(149502);
  function v() {
    let e = 0,
      n = 0;
    for (let t = 0; t < 28; t += 7) {
      let a = this.buf[this.pos++];
      if (((e |= (127 & a) << t), (128 & a) == 0))
        return (this.assertBounds(), [e, n]);
    }
    let t = this.buf[this.pos++];
    if (((e |= (15 & t) << 28), (n = (112 & t) >> 4), (128 & t) == 0))
      return (this.assertBounds(), [e, n]);
    for (let t = 3; t <= 31; t += 7) {
      let a = this.buf[this.pos++];
      if (((n |= (127 & a) << t), (128 & a) == 0))
        return (this.assertBounds(), [e, n]);
    }
    throw Error("invalid varint");
  }
  function y(e, n, t) {
    for (let a = 0; a < 28; a += 7) {
      let r = e >>> a,
        i = r >>> 7 != 0 || 0 != n,
        o = (i ? 128 | r : r) & 255;
      if ((t.push(o), !i)) return;
    }
    let a = ((e >>> 28) & 15) | ((7 & n) << 4),
      r = n >> 3 != 0;
    if ((t.push((r ? 128 | a : a) & 255), r)) {
      for (let e = 3; e < 31; e += 7) {
        let a = n >>> e,
          r = a >>> 7 != 0,
          i = (r ? 128 | a : a) & 255;
        if ((t.push(i), !r)) return;
      }
      t.push((n >>> 31) & 1);
    }
  }
  function b(e) {
    let n = "-" === e[0];
    n && (e = e.slice(1));
    let t = 0,
      a = 0;
    function r(n, r) {
      let i = Number(e.slice(n, r));
      ((a *= 1e6),
        (t = 1e6 * t + i) >= 0x100000000 &&
          ((a += (t / 0x100000000) | 0), (t %= 0x100000000)));
    }
    return (r(-24, -18), r(-18, -12), r(-12, -6), r(-6), n ? S(t, a) : _(t, a));
  }
  function E(e, n) {
    if ((({ lo: e, hi: n } = { lo: e >>> 0, hi: n >>> 0 }), n <= 2097151))
      return String(0x100000000 * n + e);
    let t = 0xffffff & e,
      a = ((e >>> 24) | (n << 8)) & 0xffffff,
      r = (n >> 16) & 65535,
      i = t + 6777216 * a + 6710656 * r,
      o = a + 8147497 * r,
      s = 2 * r;
    return (
      i >= 1e7 && ((o += Math.floor(i / 1e7)), (i %= 1e7)),
      o >= 1e7 && ((s += Math.floor(o / 1e7)), (o %= 1e7)),
      s.toString() + w(o) + w(i)
    );
  }
  function _(e, n) {
    return { lo: 0 | e, hi: 0 | n };
  }
  function S(e, n) {
    return ((n = ~n), e ? (e = ~e + 1) : (n += 1), _(e, n));
  }
  let w = (e) => {
    let n = String(e);
    return "0000000".slice(n.length) + n;
  };
  function I(e, n) {
    if (e >= 0) {
      for (; e > 127; ) (n.push((127 & e) | 128), (e >>>= 7));
      n.push(e);
    } else {
      for (let t = 0; t < 9; t++) (n.push((127 & e) | 128), (e >>= 7));
      n.push(1);
    }
  }
  function A() {
    let e = this.buf[this.pos++],
      n = 127 & e;
    if (
      (128 & e) == 0 ||
      ((n |= (127 & (e = this.buf[this.pos++])) << 7), (128 & e) == 0) ||
      ((n |= (127 & (e = this.buf[this.pos++])) << 14), (128 & e) == 0) ||
      ((n |= (127 & (e = this.buf[this.pos++])) << 21), (128 & e) == 0)
    )
      return (this.assertBounds(), n);
    n |= (15 & (e = this.buf[this.pos++])) << 28;
    for (let n = 5; (128 & e) != 0 && n < 10; n++) e = this.buf[this.pos++];
    if ((128 & e) != 0) throw Error("invalid varint");
    return (this.assertBounds(), n >>> 0);
  }
  let N = (function () {
    let e = new DataView(new ArrayBuffer(8));
    if (
      "function" == typeof BigInt &&
      "function" == typeof e.getBigInt64 &&
      "function" == typeof e.getBigUint64 &&
      "function" == typeof e.setBigInt64 &&
      "function" == typeof e.setBigUint64 &&
      ("object" != typeof T.default ||
        "object" != typeof T.default.env ||
        "1" !== T.default.env.BUF_BIGINT_DISABLE)
    ) {
      let n = BigInt("-9223372036854775808"),
        t = BigInt("9223372036854775807"),
        a = BigInt("0"),
        r = BigInt("18446744073709551615");
      return {
        zero: BigInt(0),
        supported: !0,
        parse(e) {
          let a = "bigint" == typeof e ? e : BigInt(e);
          if (a > t || a < n) throw Error(`int64 invalid: ${e}`);
          return a;
        },
        uParse(e) {
          let n = "bigint" == typeof e ? e : BigInt(e);
          if (n > r || n < a) throw Error(`uint64 invalid: ${e}`);
          return n;
        },
        enc(n) {
          return (
            e.setBigInt64(0, this.parse(n), !0),
            { lo: e.getInt32(0, !0), hi: e.getInt32(4, !0) }
          );
        },
        uEnc(n) {
          return (
            e.setBigInt64(0, this.uParse(n), !0),
            { lo: e.getInt32(0, !0), hi: e.getInt32(4, !0) }
          );
        },
        dec: (n, t) => (
          e.setInt32(0, n, !0),
          e.setInt32(4, t, !0),
          e.getBigInt64(0, !0)
        ),
        uDec: (n, t) => (
          e.setInt32(0, n, !0),
          e.setInt32(4, t, !0),
          e.getBigUint64(0, !0)
        ),
      };
    }
    let t = (e) => n(/^-?[0-9]+$/.test(e), `int64 invalid: ${e}`),
      a = (e) => n(/^[0-9]+$/.test(e), `uint64 invalid: ${e}`);
    return {
      zero: "0",
      supported: !1,
      parse: (e) => ("string" != typeof e && (e = e.toString()), t(e), e),
      uParse: (e) => ("string" != typeof e && (e = e.toString()), a(e), e),
      enc: (e) => ("string" != typeof e && (e = e.toString()), t(e), b(e)),
      uEnc: (e) => ("string" != typeof e && (e = e.toString()), a(e), b(e)),
      dec: (e, n) => {
        let t, a, r;
        return (
          (a = 0x80000000 & (t = _(e, n)).hi) && (t = S(t.lo, t.hi)),
          (r = E(t.lo, t.hi)),
          a ? "-" + r : r
        );
      },
      uDec: (e, n) => E(e, n),
    };
  })();
  function R(e, n, t) {
    if (n === t) return !0;
    if (e == h.BYTES) {
      if (
        !(n instanceof Uint8Array) ||
        !(t instanceof Uint8Array) ||
        n.length !== t.length
      )
        return !1;
      for (let e = 0; e < n.length; e++) if (n[e] !== t[e]) return !1;
      return !0;
    }
    switch (e) {
      case h.UINT64:
      case h.FIXED64:
      case h.INT64:
      case h.SFIXED64:
      case h.SINT64:
        return n == t;
    }
    return !1;
  }
  function P(e, n) {
    switch (e) {
      case h.BOOL:
        return !1;
      case h.UINT64:
      case h.FIXED64:
      case h.INT64:
      case h.SFIXED64:
      case h.SINT64:
        return 0 == n ? N.zero : "0";
      case h.DOUBLE:
      case h.FLOAT:
        return 0;
      case h.BYTES:
        return new Uint8Array(0);
      case h.STRING:
        return "";
      default:
        return 0;
    }
  }
  function O(e, n) {
    switch (e) {
      case h.BOOL:
        return !1 === n;
      case h.STRING:
        return "" === n;
      case h.BYTES:
        return n instanceof Uint8Array && !n.byteLength;
      default:
        return 0 == n;
    }
  }
  function x(e) {
    let n = e.field.localName,
      t = Object.create(null);
    return (
      (t[n] = (function (e) {
        let n = e.field;
        if (n.repeated) return [];
        if (void 0 !== n.default) return n.default;
        switch (n.kind) {
          case "enum":
            return n.T.values[0].no;
          case "scalar":
            return P(n.T, n.L);
          case "message":
            let t = n.T,
              a = new t();
            return t.fieldWrapper ? t.fieldWrapper.unwrapField(a) : a;
          case "map":
            throw "map fields are not allowed to be extensions";
        }
      })(e)),
      [t, () => t[n]]
    );
  }
  (((u = h || (h = {}))[(u.DOUBLE = 1)] = "DOUBLE"),
    (u[(u.FLOAT = 2)] = "FLOAT"),
    (u[(u.INT64 = 3)] = "INT64"),
    (u[(u.UINT64 = 4)] = "UINT64"),
    (u[(u.INT32 = 5)] = "INT32"),
    (u[(u.FIXED64 = 6)] = "FIXED64"),
    (u[(u.FIXED32 = 7)] = "FIXED32"),
    (u[(u.BOOL = 8)] = "BOOL"),
    (u[(u.STRING = 9)] = "STRING"),
    (u[(u.BYTES = 12)] = "BYTES"),
    (u[(u.UINT32 = 13)] = "UINT32"),
    (u[(u.SFIXED32 = 15)] = "SFIXED32"),
    (u[(u.SFIXED64 = 16)] = "SFIXED64"),
    (u[(u.SINT32 = 17)] = "SINT32"),
    (u[(u.SINT64 = 18)] = "SINT64"),
    ((d = g || (g = {}))[(d.BIGINT = 0)] = "BIGINT"),
    (d[(d.STRING = 1)] = "STRING"));
  let C =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
        "",
      ),
    M = [];
  for (let e = 0; e < C.length; e++) M[C[e].charCodeAt(0)] = e;
  ((M[45] = C.indexOf("+")), (M[95] = C.indexOf("/")));
  let D = {
    dec(e) {
      let n = (3 * e.length) / 4;
      "=" == e[e.length - 2] ? (n -= 2) : "=" == e[e.length - 1] && (n -= 1);
      let t = new Uint8Array(n),
        a = 0,
        r = 0,
        i,
        o = 0;
      for (let n = 0; n < e.length; n++) {
        if (void 0 === (i = M[e.charCodeAt(n)]))
          switch (e[n]) {
            case "=":
              r = 0;
            case "\n":
            case "\r":
            case "	":
            case " ":
              continue;
            default:
              throw Error("invalid base64 string.");
          }
        switch (r) {
          case 0:
            ((o = i), (r = 1));
            break;
          case 1:
            ((t[a++] = (o << 2) | ((48 & i) >> 4)), (o = i), (r = 2));
            break;
          case 2:
            ((t[a++] = ((15 & o) << 4) | ((60 & i) >> 2)), (o = i), (r = 3));
            break;
          case 3:
            ((t[a++] = ((3 & o) << 6) | i), (r = 0));
        }
      }
      if (1 == r) throw Error("invalid base64 string.");
      return t.subarray(0, a);
    },
    enc(e) {
      let n = "",
        t = 0,
        a,
        r = 0;
      for (let i = 0; i < e.length; i++)
        switch (((a = e[i]), t)) {
          case 0:
            ((n += C[a >> 2]), (r = (3 & a) << 4), (t = 1));
            break;
          case 1:
            ((n += C[r | (a >> 4)]), (r = (15 & a) << 2), (t = 2));
            break;
          case 2:
            ((n += C[r | (a >> 6)]), (n += C[63 & a]), (t = 0));
        }
      return (t && ((n += C[r]), (n += "="), 1 == t && (n += "=")), n);
    },
  };
  function L(e, n) {
    let t = e.getType();
    return (
      n.extendee.typeName === t.typeName &&
      !!t.runtime.bin.listUnknownFields(e).find((e) => e.no == n.field.no)
    );
  }
  function U(e, t) {
    n(
      e.extendee.typeName == t.getType().typeName,
      `extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`,
    );
  }
  function F(e, n) {
    let t = e.localName;
    if (e.repeated) return n[t].length > 0;
    if (e.oneof) return n[e.oneof.localName].case === t;
    switch (e.kind) {
      case "enum":
      case "scalar":
        if (e.opt || e.req) return void 0 !== n[t];
        if ("enum" == e.kind) return n[t] !== e.T.values[0].no;
        return !O(e.T, n[t]);
      case "message":
        return void 0 !== n[t];
      case "map":
        return Object.keys(n[t]).length > 0;
    }
  }
  function j(e, n) {
    let t = e.localName,
      a = !e.opt && !e.req;
    if (e.repeated) n[t] = [];
    else if (e.oneof) n[e.oneof.localName] = { case: void 0 };
    else
      switch (e.kind) {
        case "map":
          n[t] = {};
          break;
        case "enum":
          n[t] = a ? e.T.values[0].no : void 0;
          break;
        case "scalar":
          n[t] = a ? P(e.T, e.L) : void 0;
          break;
        case "message":
          n[t] = void 0;
      }
  }
  function V(e, n) {
    if (
      null === e ||
      "object" != typeof e ||
      !Object.getOwnPropertyNames(c.prototype).every(
        (n) => n in e && "function" == typeof e[n],
      )
    )
      return !1;
    let t = e.getType();
    return (
      null !== t &&
      "function" == typeof t &&
      "typeName" in t &&
      "string" == typeof t.typeName &&
      (void 0 === n || t.typeName == n.typeName)
    );
  }
  function H(e, n) {
    return V(n) || !e.fieldWrapper ? n : e.fieldWrapper.wrapField(n);
  }
  (h.DOUBLE,
    h.FLOAT,
    h.INT64,
    h.UINT64,
    h.INT32,
    h.UINT32,
    h.BOOL,
    h.STRING,
    h.BYTES);
  let B = { ignoreUnknownFields: !1 },
    $ = {
      emitDefaultValues: !1,
      enumAsInteger: !1,
      useProtoFieldName: !1,
      prettySpaces: 0,
    },
    G = Symbol(),
    W = Symbol();
  function J(e) {
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
  function z(e, t, a, r, i) {
    let o = a.localName;
    if (a.repeated) {
      if ((n("map" != a.kind), null === t)) return;
      if (!Array.isArray(t))
        throw Error(
          `cannot decode field ${i.typeName}.${a.name} from JSON: ${J(t)}`,
        );
      let s = e[o];
      for (let e of t) {
        if (null === e)
          throw Error(
            `cannot decode field ${i.typeName}.${a.name} from JSON: ${J(e)}`,
          );
        switch (a.kind) {
          case "message":
            s.push(a.T.fromJson(e, r));
            break;
          case "enum":
            let n = Y(a.T, e, r.ignoreUnknownFields, !0);
            n !== W && s.push(n);
            break;
          case "scalar":
            try {
              s.push(q(a.T, e, a.L, !0));
            } catch (t) {
              let n = `cannot decode field ${i.typeName}.${a.name} from JSON: ${J(e)}`;
              throw (
                t instanceof Error &&
                  t.message.length > 0 &&
                  (n += `: ${t.message}`),
                Error(n)
              );
            }
        }
      }
    } else if ("map" == a.kind) {
      if (null === t) return;
      if ("object" != typeof t || Array.isArray(t))
        throw Error(
          `cannot decode field ${i.typeName}.${a.name} from JSON: ${J(t)}`,
        );
      let n = e[o];
      for (let [e, o] of Object.entries(t)) {
        let s;
        if (null === o)
          throw Error(
            `cannot decode field ${i.typeName}.${a.name} from JSON: map value null`,
          );
        try {
          s = (function (e, n) {
            if (e === h.BOOL)
              switch (n) {
                case "true":
                  n = !0;
                  break;
                case "false":
                  n = !1;
              }
            return q(e, n, g.BIGINT, !0).toString();
          })(a.K, e);
        } catch (n) {
          let e = `cannot decode map key for field ${i.typeName}.${a.name} from JSON: ${J(t)}`;
          throw (
            n instanceof Error &&
              n.message.length > 0 &&
              (e += `: ${n.message}`),
            Error(e)
          );
        }
        switch (a.V.kind) {
          case "message":
            n[s] = a.V.T.fromJson(o, r);
            break;
          case "enum":
            let l = Y(a.V.T, o, r.ignoreUnknownFields, !0);
            l !== W && (n[s] = l);
            break;
          case "scalar":
            try {
              n[s] = q(a.V.T, o, g.BIGINT, !0);
            } catch (n) {
              let e = `cannot decode map value for field ${i.typeName}.${a.name} from JSON: ${J(t)}`;
              throw (
                n instanceof Error &&
                  n.message.length > 0 &&
                  (e += `: ${n.message}`),
                Error(e)
              );
            }
        }
      }
    } else
      switch (
        (a.oneof && ((e = e[a.oneof.localName] = { case: o }), (o = "value")),
        a.kind)
      ) {
        case "message":
          let s = a.T;
          if (null === t && "google.protobuf.Value" != s.typeName) return;
          let l = e[o];
          V(l)
            ? l.fromJson(t, r)
            : ((e[o] = l = s.fromJson(t, r)),
              s.fieldWrapper &&
                !a.oneof &&
                (e[o] = s.fieldWrapper.unwrapField(l)));
          break;
        case "enum":
          let c = Y(a.T, t, r.ignoreUnknownFields, !1);
          switch (c) {
            case G:
              j(a, e);
              break;
            case W:
              break;
            default:
              e[o] = c;
          }
          break;
        case "scalar":
          try {
            let n = q(a.T, t, a.L, !1);
            n === G ? j(a, e) : (e[o] = n);
          } catch (n) {
            let e = `cannot decode field ${i.typeName}.${a.name} from JSON: ${J(t)}`;
            throw (
              n instanceof Error &&
                n.message.length > 0 &&
                (e += `: ${n.message}`),
              Error(e)
            );
          }
      }
  }
  function q(e, n, i, o) {
    if (null === n) return o ? P(e, i) : G;
    switch (e) {
      case h.DOUBLE:
      case h.FLOAT:
        if ("NaN" === n) return 0 / 0;
        if ("Infinity" === n) return 1 / 0;
        if ("-Infinity" === n) return -1 / 0;
        if (
          "" === n ||
          ("string" == typeof n && n.trim().length !== n.length) ||
          ("string" != typeof n && "number" != typeof n)
        )
          break;
        let s = Number(n);
        if (Number.isNaN(s) || !Number.isFinite(s)) break;
        return (e == h.FLOAT && r(s), s);
      case h.INT32:
      case h.FIXED32:
      case h.SFIXED32:
      case h.SINT32:
      case h.UINT32:
        let l;
        if (
          ("number" == typeof n
            ? (l = n)
            : "string" == typeof n &&
              n.length > 0 &&
              n.trim().length === n.length &&
              (l = Number(n)),
          void 0 === l)
        )
          break;
        return (e == h.UINT32 || e == h.FIXED32 ? a(l) : t(l), l);
      case h.INT64:
      case h.SFIXED64:
      case h.SINT64:
        if ("number" != typeof n && "string" != typeof n) break;
        let c = N.parse(n);
        return i ? c.toString() : c;
      case h.FIXED64:
      case h.UINT64:
        if ("number" != typeof n && "string" != typeof n) break;
        let u = N.uParse(n);
        return i ? u.toString() : u;
      case h.BOOL:
        if ("boolean" != typeof n) break;
        return n;
      case h.STRING:
        if ("string" != typeof n) break;
        try {
          encodeURIComponent(n);
        } catch (e) {
          throw Error("invalid UTF8");
        }
        return n;
      case h.BYTES:
        if ("" === n) return new Uint8Array(0);
        if ("string" != typeof n) break;
        return D.dec(n);
    }
    throw Error();
  }
  function Y(e, n, t, a) {
    if (null === n)
      return "google.protobuf.NullValue" == e.typeName
        ? 0
        : a
          ? e.values[0].no
          : G;
    switch (typeof n) {
      case "number":
        if (Number.isInteger(n)) return n;
        break;
      case "string":
        let r = e.findName(n);
        if (void 0 !== r) return r.no;
        if (t) return W;
    }
    throw Error(`cannot decode enum ${e.typeName} from JSON: ${J(n)}`);
  }
  function K(e, t, a) {
    if ("map" == e.kind) {
      n("object" == typeof t && null != t);
      let r = {},
        i = Object.entries(t);
      switch (e.V.kind) {
        case "scalar":
          for (let [n, t] of i) r[n.toString()] = Z(e.V.T, t);
          break;
        case "message":
          for (let [e, n] of i) r[e.toString()] = n.toJson(a);
          break;
        case "enum":
          let o = e.V.T;
          for (let [e, n] of i) r[e.toString()] = X(o, n, a.enumAsInteger);
      }
      return a.emitDefaultValues || i.length > 0 ? r : void 0;
    }
    if (e.repeated) {
      n(Array.isArray(t));
      let r = [];
      switch (e.kind) {
        case "scalar":
          for (let n = 0; n < t.length; n++) r.push(Z(e.T, t[n]));
          break;
        case "enum":
          for (let n = 0; n < t.length; n++)
            r.push(X(e.T, t[n], a.enumAsInteger));
          break;
        case "message":
          for (let e = 0; e < t.length; e++) r.push(t[e].toJson(a));
      }
      return a.emitDefaultValues || r.length > 0 ? r : void 0;
    }
    switch (e.kind) {
      case "scalar":
        return Z(e.T, t);
      case "enum":
        return X(e.T, t, a.enumAsInteger);
      case "message":
        return H(e.T, t).toJson(a);
    }
  }
  function X(e, t, a) {
    var r;
    if ((n("number" == typeof t), "google.protobuf.NullValue" == e.typeName))
      return null;
    if (a) return t;
    let i = e.findNumber(t);
    return null != (r = null == i ? void 0 : i.name) ? r : t;
  }
  function Z(e, t) {
    switch (e) {
      case h.INT32:
      case h.SFIXED32:
      case h.SINT32:
      case h.FIXED32:
      case h.UINT32:
        return (n("number" == typeof t), t);
      case h.FLOAT:
      case h.DOUBLE:
        if ((n("number" == typeof t), Number.isNaN(t))) return "NaN";
        if (1 / 0 === t) return "Infinity";
        if (-1 / 0 === t) return "-Infinity";
        return t;
      case h.STRING:
        return (n("string" == typeof t), t);
      case h.BOOL:
        return (n("boolean" == typeof t), t);
      case h.UINT64:
      case h.FIXED64:
      case h.INT64:
      case h.SFIXED64:
      case h.SINT64:
        return (
          n(
            "bigint" == typeof t ||
              "string" == typeof t ||
              "number" == typeof t,
          ),
          t.toString()
        );
      case h.BYTES:
        return (n(t instanceof Uint8Array), D.enc(t));
    }
  }
  (((m = k || (k = {}))[(m.Varint = 0)] = "Varint"),
    (m[(m.Bit64 = 1)] = "Bit64"),
    (m[(m.LengthDelimited = 2)] = "LengthDelimited"),
    (m[(m.StartGroup = 3)] = "StartGroup"),
    (m[(m.EndGroup = 4)] = "EndGroup"),
    (m[(m.Bit32 = 5)] = "Bit32"));
  class Q {
    constructor(e) {
      ((this.stack = []),
        (this.textEncoder = null != e ? e : new TextEncoder()),
        (this.chunks = []),
        (this.buf = []));
    }
    finish() {
      this.chunks.push(new Uint8Array(this.buf));
      let e = 0;
      for (let n = 0; n < this.chunks.length; n++) e += this.chunks[n].length;
      let n = new Uint8Array(e),
        t = 0;
      for (let e = 0; e < this.chunks.length; e++)
        (n.set(this.chunks[e], t), (t += this.chunks[e].length));
      return ((this.chunks = []), n);
    }
    fork() {
      return (
        this.stack.push({ chunks: this.chunks, buf: this.buf }),
        (this.chunks = []),
        (this.buf = []),
        this
      );
    }
    join() {
      let e = this.finish(),
        n = this.stack.pop();
      if (!n) throw Error("invalid state, fork stack empty");
      return (
        (this.chunks = n.chunks),
        (this.buf = n.buf),
        this.uint32(e.byteLength),
        this.raw(e)
      );
    }
    tag(e, n) {
      return this.uint32(((e << 3) | n) >>> 0);
    }
    raw(e) {
      return (
        this.buf.length &&
          (this.chunks.push(new Uint8Array(this.buf)), (this.buf = [])),
        this.chunks.push(e),
        this
      );
    }
    uint32(e) {
      for (a(e); e > 127; ) (this.buf.push((127 & e) | 128), (e >>>= 7));
      return (this.buf.push(e), this);
    }
    int32(e) {
      return (t(e), I(e, this.buf), this);
    }
    bool(e) {
      return (this.buf.push(+!!e), this);
    }
    bytes(e) {
      return (this.uint32(e.byteLength), this.raw(e));
    }
    string(e) {
      let n = this.textEncoder.encode(e);
      return (this.uint32(n.byteLength), this.raw(n));
    }
    float(e) {
      r(e);
      let n = new Uint8Array(4);
      return (new DataView(n.buffer).setFloat32(0, e, !0), this.raw(n));
    }
    double(e) {
      let n = new Uint8Array(8);
      return (new DataView(n.buffer).setFloat64(0, e, !0), this.raw(n));
    }
    fixed32(e) {
      a(e);
      let n = new Uint8Array(4);
      return (new DataView(n.buffer).setUint32(0, e, !0), this.raw(n));
    }
    sfixed32(e) {
      t(e);
      let n = new Uint8Array(4);
      return (new DataView(n.buffer).setInt32(0, e, !0), this.raw(n));
    }
    sint32(e) {
      return (t(e), I((e = ((e << 1) ^ (e >> 31)) >>> 0), this.buf), this);
    }
    sfixed64(e) {
      let n = new Uint8Array(8),
        t = new DataView(n.buffer),
        a = N.enc(e);
      return (t.setInt32(0, a.lo, !0), t.setInt32(4, a.hi, !0), this.raw(n));
    }
    fixed64(e) {
      let n = new Uint8Array(8),
        t = new DataView(n.buffer),
        a = N.uEnc(e);
      return (t.setInt32(0, a.lo, !0), t.setInt32(4, a.hi, !0), this.raw(n));
    }
    int64(e) {
      let n = N.enc(e);
      return (y(n.lo, n.hi, this.buf), this);
    }
    sint64(e) {
      let n = N.enc(e),
        t = n.hi >> 31;
      return (
        y((n.lo << 1) ^ t, ((n.hi << 1) | (n.lo >>> 31)) ^ t, this.buf),
        this
      );
    }
    uint64(e) {
      let n = N.uEnc(e);
      return (y(n.lo, n.hi, this.buf), this);
    }
  }
  class ee {
    constructor(e, n) {
      ((this.varint64 = v),
        (this.uint32 = A),
        (this.buf = e),
        (this.len = e.length),
        (this.pos = 0),
        (this.view = new DataView(e.buffer, e.byteOffset, e.byteLength)),
        (this.textDecoder = null != n ? n : new TextDecoder()));
    }
    tag() {
      let e = this.uint32(),
        n = e >>> 3,
        t = 7 & e;
      if (n <= 0 || t < 0 || t > 5)
        throw Error("illegal tag: field no " + n + " wire type " + t);
      return [n, t];
    }
    skip(e, n) {
      let t = this.pos;
      switch (e) {
        case k.Varint:
          for (; 128 & this.buf[this.pos++]; );
          break;
        case k.Bit64:
          this.pos += 4;
        case k.Bit32:
          this.pos += 4;
          break;
        case k.LengthDelimited:
          let a = this.uint32();
          this.pos += a;
          break;
        case k.StartGroup:
          for (;;) {
            let [e, t] = this.tag();
            if (t === k.EndGroup) {
              if (void 0 !== n && e !== n) throw Error("invalid end group tag");
              break;
            }
            this.skip(t, e);
          }
          break;
        default:
          throw Error("cant skip wire type " + e);
      }
      return (this.assertBounds(), this.buf.subarray(t, this.pos));
    }
    assertBounds() {
      if (this.pos > this.len) throw RangeError("premature EOF");
    }
    int32() {
      return 0 | this.uint32();
    }
    sint32() {
      let e = this.uint32();
      return (e >>> 1) ^ -(1 & e);
    }
    int64() {
      return N.dec(...this.varint64());
    }
    uint64() {
      return N.uDec(...this.varint64());
    }
    sint64() {
      let [e, n] = this.varint64(),
        t = -(1 & e);
      return (
        (e = ((e >>> 1) | ((1 & n) << 31)) ^ t),
        (n = (n >>> 1) ^ t),
        N.dec(e, n)
      );
    }
    bool() {
      let [e, n] = this.varint64();
      return 0 !== e || 0 !== n;
    }
    fixed32() {
      return this.view.getUint32((this.pos += 4) - 4, !0);
    }
    sfixed32() {
      return this.view.getInt32((this.pos += 4) - 4, !0);
    }
    fixed64() {
      return N.uDec(this.sfixed32(), this.sfixed32());
    }
    sfixed64() {
      return N.dec(this.sfixed32(), this.sfixed32());
    }
    float() {
      return this.view.getFloat32((this.pos += 4) - 4, !0);
    }
    double() {
      return this.view.getFloat64((this.pos += 8) - 8, !0);
    }
    bytes() {
      let e = this.uint32(),
        n = this.pos;
      return (
        (this.pos += e),
        this.assertBounds(),
        this.buf.subarray(n, n + e)
      );
    }
    string() {
      return this.textDecoder.decode(this.bytes());
    }
  }
  let en = Symbol("@bufbuild/protobuf/unknown-fields"),
    et = { readUnknownFields: !0, readerFactory: (e) => new ee(e) },
    ea = { writeUnknownFields: !0, writerFactory: () => new Q() };
  function er(e, n, t, a, r) {
    let { repeated: i, localName: o } = t;
    switch (
      (t.oneof &&
        ((e = e[t.oneof.localName]).case != o && delete e.value,
        (e.case = o),
        (o = "value")),
      t.kind)
    ) {
      case "scalar":
      case "enum":
        let s = "enum" == t.kind ? h.INT32 : t.T,
          l = es;
        if (("scalar" == t.kind && t.L > 0 && (l = eo), i)) {
          let t = e[o];
          if (a == k.LengthDelimited && s != h.STRING && s != h.BYTES) {
            let e = n.uint32() + n.pos;
            for (; n.pos < e; ) t.push(l(n, s));
          } else t.push(l(n, s));
        } else e[o] = l(n, s);
        break;
      case "message":
        let c = t.T;
        i
          ? e[o].push(ei(n, new c(), r, t))
          : V(e[o])
            ? ei(n, e[o], r, t)
            : ((e[o] = ei(n, new c(), r, t)),
              !c.fieldWrapper ||
                t.oneof ||
                t.repeated ||
                (e[o] = c.fieldWrapper.unwrapField(e[o])));
        break;
      case "map":
        let [u, d] = (function (e, n, t) {
          let a,
            r,
            i = n.uint32(),
            o = n.pos + i;
          for (; n.pos < o; ) {
            let [i] = n.tag();
            switch (i) {
              case 1:
                a = es(n, e.K);
                break;
              case 2:
                switch (e.V.kind) {
                  case "scalar":
                    r = es(n, e.V.T);
                    break;
                  case "enum":
                    r = n.int32();
                    break;
                  case "message":
                    r = ei(n, new e.V.T(), t, void 0);
                }
            }
          }
          if (
            (void 0 === a && (a = P(e.K, g.BIGINT)),
            "string" != typeof a && "number" != typeof a && (a = a.toString()),
            void 0 === r)
          )
            switch (e.V.kind) {
              case "scalar":
                r = P(e.V.T, g.BIGINT);
                break;
              case "enum":
                r = e.V.T.values[0].no;
                break;
              case "message":
                r = new e.V.T();
            }
          return [a, r];
        })(t, n, r);
        e[o][u] = d;
    }
  }
  function ei(e, n, t, a) {
    let r = n.getType().runtime.bin,
      i = null == a ? void 0 : a.delimited;
    return (r.readMessage(n, e, i ? a.no : e.uint32(), t, i), n);
  }
  function eo(e, n) {
    let t = es(e, n);
    return "bigint" == typeof t ? t.toString() : t;
  }
  function es(e, n) {
    switch (n) {
      case h.STRING:
        return e.string();
      case h.BOOL:
        return e.bool();
      case h.DOUBLE:
        return e.double();
      case h.FLOAT:
        return e.float();
      case h.INT32:
        return e.int32();
      case h.INT64:
        return e.int64();
      case h.UINT64:
        return e.uint64();
      case h.FIXED64:
        return e.fixed64();
      case h.BYTES:
        return e.bytes();
      case h.FIXED32:
        return e.fixed32();
      case h.SFIXED32:
        return e.sfixed32();
      case h.SFIXED64:
        return e.sfixed64();
      case h.SINT64:
        return e.sint64();
      case h.UINT32:
        return e.uint32();
      case h.SINT32:
        return e.sint32();
    }
  }
  function el(e, t, a, r) {
    n(void 0 !== t);
    let i = e.repeated;
    switch (e.kind) {
      case "scalar":
      case "enum":
        let o = "enum" == e.kind ? h.INT32 : e.T;
        if (i)
          if ((n(Array.isArray(t)), e.packed))
            !(function (e, n, t, a) {
              if (!a.length) return;
              e.tag(t, k.LengthDelimited).fork();
              let [, r] = ed(n);
              for (let n = 0; n < a.length; n++) e[r](a[n]);
              e.join();
            })(a, o, e.no, t);
          else for (let n of t) eu(a, o, e.no, n);
        else eu(a, o, e.no, t);
        break;
      case "message":
        if (i) for (let i of (n(Array.isArray(t)), t)) ec(a, r, e, i);
        else ec(a, r, e, t);
        break;
      case "map":
        for (let [i, o] of (n("object" == typeof t && null != t),
        Object.entries(t)))
          !(function (e, t, a, r, i) {
            (e.tag(a.no, k.LengthDelimited), e.fork());
            let o = r;
            switch (a.K) {
              case h.INT32:
              case h.FIXED32:
              case h.UINT32:
              case h.SFIXED32:
              case h.SINT32:
                o = Number.parseInt(r);
                break;
              case h.BOOL:
                (n("true" == r || "false" == r), (o = "true" == r));
            }
            switch ((eu(e, a.K, 1, o), a.V.kind)) {
              case "scalar":
                eu(e, a.V.T, 2, i);
                break;
              case "enum":
                eu(e, h.INT32, 2, i);
                break;
              case "message":
                (n(void 0 !== i),
                  e.tag(2, k.LengthDelimited).bytes(i.toBinary(t)));
            }
            e.join();
          })(a, r, e, i, o);
    }
  }
  function ec(e, n, t, a) {
    let r = H(t.T, a);
    t.delimited
      ? e.tag(t.no, k.StartGroup).raw(r.toBinary(n)).tag(t.no, k.EndGroup)
      : e.tag(t.no, k.LengthDelimited).bytes(r.toBinary(n));
  }
  function eu(e, t, a, r) {
    n(void 0 !== r);
    let [i, o] = ed(t);
    e.tag(a, i)[o](r);
  }
  function ed(e) {
    let n = k.Varint;
    switch (e) {
      case h.BYTES:
      case h.STRING:
        n = k.LengthDelimited;
        break;
      case h.DOUBLE:
      case h.FIXED64:
      case h.SFIXED64:
        n = k.Bit64;
        break;
      case h.FIXED32:
      case h.SFIXED32:
      case h.FLOAT:
        n = k.Bit32;
    }
    return [n, h[e].toLowerCase()];
  }
  function em(e) {
    if (void 0 === e) return e;
    if (V(e)) return e.clone();
    if (e instanceof Uint8Array) {
      let n = new Uint8Array(e.byteLength);
      return (n.set(e), n);
    }
    return e;
  }
  function ep(e) {
    return e instanceof Uint8Array ? e : new Uint8Array(e);
  }
  class ef {
    constructor(e, n) {
      ((this._fields = e), (this._normalizer = n));
    }
    findJsonName(e) {
      if (!this.jsonNames) {
        let e = {};
        for (let n of this.list()) e[n.jsonName] = e[n.name] = n;
        this.jsonNames = e;
      }
      return this.jsonNames[e];
    }
    find(e) {
      if (!this.numbers) {
        let e = {};
        for (let n of this.list()) e[n.no] = n;
        this.numbers = e;
      }
      return this.numbers[e];
    }
    list() {
      return (
        this.all || (this.all = this._normalizer(this._fields)),
        this.all
      );
    }
    byNumber() {
      return (
        this.numbersAsc ||
          (this.numbersAsc = this.list()
            .concat()
            .sort((e, n) => e.no - n.no)),
        this.numbersAsc
      );
    }
    byMember() {
      if (!this.members) {
        let e;
        this.members = [];
        let n = this.members;
        for (let t of this.list())
          t.oneof ? t.oneof !== e && ((e = t.oneof), n.push(e)) : n.push(t);
      }
      return this.members;
    }
  }
  function eh(e, n) {
    let t = ek(e);
    return n ? t : eE(eb(t));
  }
  let eg = ek;
  function ek(e) {
    let n = !1,
      t = [];
    for (let a = 0; a < e.length; a++) {
      let r = e.charAt(a);
      switch (r) {
        case "_":
          n = !0;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          (t.push(r), (n = !1));
          break;
        default:
          (n && ((n = !1), (r = r.toUpperCase())), t.push(r));
      }
    }
    return t.join("");
  }
  let eT = new Set(["constructor", "toString", "toJSON", "valueOf"]),
    ev = new Set([
      "getType",
      "clone",
      "equals",
      "fromBinary",
      "fromJson",
      "fromJsonString",
      "toBinary",
      "toJson",
      "toJsonString",
      "toObject",
    ]),
    ey = (e) => `${e}$`,
    eb = (e) => (ev.has(e) ? ey(e) : e),
    eE = (e) => (eT.has(e) ? ey(e) : e);
  class e_ {
    constructor(e) {
      ((this.kind = "oneof"),
        (this.repeated = !1),
        (this.packed = !1),
        (this.opt = !1),
        (this.req = !1),
        (this.default = void 0),
        (this.fields = []),
        (this.name = e),
        (this.localName = eh(e, !1)));
    }
    addField(e) {
      (n(e.oneof === this, `field ${e.name} not one of ${this.name}`),
        this.fields.push(e));
    }
    findField(e) {
      if (!this._lookup) {
        this._lookup = Object.create(null);
        for (let e = 0; e < this.fields.length; e++)
          this._lookup[this.fields[e].localName] = this.fields[e];
      }
      return this._lookup[e];
    }
  }
  let eS =
    ((p = (e) =>
      new ef(e, (e) =>
        (function (e, n) {
          var t, a, r, i, o, s;
          let l,
            c = [];
          for (let u of "function" == typeof e ? e() : e) {
            if (
              ((u.localName = eh(u.name, void 0 !== u.oneof)),
              (u.jsonName = null != (t = u.jsonName) ? t : eg(u.name)),
              (u.repeated = null != (a = u.repeated) && a),
              "scalar" == u.kind && (u.L = null != (r = u.L) ? r : g.BIGINT),
              (u.delimited = null != (i = u.delimited) && i),
              (u.req = null != (o = u.req) && o),
              (u.opt = null != (s = u.opt) && s),
              void 0 === u.packed &&
                (n
                  ? (u.packed =
                      "enum" == u.kind ||
                      ("scalar" == u.kind && u.T != h.BYTES && u.T != h.STRING))
                  : (u.packed = !1)),
              void 0 !== u.oneof)
            ) {
              let e = "string" == typeof u.oneof ? u.oneof : u.oneof.name;
              ((l && l.name == e) || (l = new e_(e)),
                (u.oneof = l),
                l.addField(u));
            }
            c.push(u);
          }
          return c;
        })(e, !0),
      )),
    (f = (e) => {
      for (let n of e.getType().fields.byMember()) {
        if (n.opt) continue;
        let t = n.localName;
        if (n.repeated) {
          e[t] = [];
          continue;
        }
        switch (n.kind) {
          case "oneof":
            e[t] = { case: void 0 };
            break;
          case "enum":
            e[t] = 0;
            break;
          case "map":
            e[t] = {};
            break;
          case "scalar":
            e[t] = P(n.T, n.L);
        }
      }
    }),
    {
      syntax: "proto3",
      json: {
        makeReadOptions: function (e) {
          return e ? Object.assign(Object.assign({}, B), e) : B;
        },
        makeWriteOptions: function (e) {
          return e ? Object.assign(Object.assign({}, $), e) : $;
        },
        readMessage(e, n, t, a) {
          if (null == n || Array.isArray(n) || "object" != typeof n)
            throw Error(
              `cannot decode message ${e.typeName} from JSON: ${J(n)}`,
            );
          a = null != a ? a : new e();
          let r = new Map(),
            i = t.typeRegistry;
          for (let [o, s] of Object.entries(n)) {
            let n = e.fields.findJsonName(o);
            if (n) {
              if (n.oneof) {
                if (null === s && "scalar" == n.kind) continue;
                let t = r.get(n.oneof);
                if (void 0 !== t)
                  throw Error(
                    `cannot decode message ${e.typeName} from JSON: multiple keys for oneof "${n.oneof.name}" present: "${t}", "${o}"`,
                  );
                r.set(n.oneof, o);
              }
              z(a, s, n, t, e);
            } else {
              let n = !1;
              if (
                (null == i ? void 0 : i.findExtension) &&
                o.startsWith("[") &&
                o.endsWith("]")
              ) {
                let r = i.findExtension(o.substring(1, o.length - 1));
                if (r && r.extendee.typeName == e.typeName) {
                  n = !0;
                  let [e, i] = x(r);
                  (z(e, s, r.field, t, r),
                    (function (e, n, t, a) {
                      U(n, e);
                      let r = n.runtime.bin.makeReadOptions(a),
                        i = n.runtime.bin.makeWriteOptions(a);
                      if (L(e, n)) {
                        let t = e
                          .getType()
                          .runtime.bin.listUnknownFields(e)
                          .filter((e) => e.no != n.field.no);
                        for (let n of (e
                          .getType()
                          .runtime.bin.discardUnknownFields(e),
                        t))
                          e.getType().runtime.bin.onUnknownField(
                            e,
                            n.no,
                            n.wireType,
                            n.data,
                          );
                      }
                      let o = i.writerFactory(),
                        s = n.field;
                      (s.opt ||
                        s.repeated ||
                        ("enum" != s.kind && "scalar" != s.kind) ||
                        (s = Object.assign(Object.assign({}, n.field), {
                          opt: !0,
                        })),
                        n.runtime.bin.writeField(s, t, o, i));
                      let l = r.readerFactory(o.finish());
                      for (; l.pos < l.len; ) {
                        let [n, t] = l.tag(),
                          a = l.skip(t, n);
                        e.getType().runtime.bin.onUnknownField(e, n, t, a);
                      }
                    })(a, r, i(), t));
                }
              }
              if (!n && !t.ignoreUnknownFields)
                throw Error(
                  `cannot decode message ${e.typeName} from JSON: key "${o}" is unknown`,
                );
            }
          }
          return a;
        },
        writeMessage(e, n) {
          let t,
            a = e.getType(),
            r = {};
          try {
            for (t of a.fields.byNumber()) {
              if (!F(t, e)) {
                var i;
                if (t.req) throw "required field not set";
                if (
                  !n.emitDefaultValues ||
                  !(
                    (i = t).repeated ||
                    "map" == i.kind ||
                    (!i.oneof && "message" != i.kind && !i.opt && !i.req)
                  )
                )
                  continue;
              }
              let a = t.oneof ? e[t.oneof.localName].value : e[t.localName],
                o = K(t, a, n);
              void 0 !== o &&
                (r[n.useProtoFieldName ? t.name : t.jsonName] = o);
            }
            let o = n.typeRegistry;
            if (null == o ? void 0 : o.findExtensionFor)
              for (let t of a.runtime.bin.listUnknownFields(e)) {
                let i = o.findExtensionFor(a.typeName, t.no);
                if (i && L(e, i)) {
                  let t = (function (e, n, t) {
                      U(n, e);
                      let a = n.runtime.bin.makeReadOptions(t),
                        r = (function (e, n) {
                          if (
                            !n.repeated &&
                            ("enum" == n.kind || "scalar" == n.kind)
                          ) {
                            for (let t = e.length - 1; t >= 0; --t)
                              if (e[t].no == n.no) return [e[t]];
                            return [];
                          }
                          return e.filter((e) => e.no === n.no);
                        })(
                          e.getType().runtime.bin.listUnknownFields(e),
                          n.field,
                        ),
                        [i, o] = x(n);
                      for (let e of r)
                        n.runtime.bin.readField(
                          i,
                          a.readerFactory(e.data),
                          n.field,
                          e.wireType,
                          a,
                        );
                      return o();
                    })(e, i, n),
                    a = K(i.field, t, n);
                  void 0 !== a && (r[i.field.jsonName] = a);
                }
              }
          } catch (r) {
            let e = t
                ? `cannot encode field ${a.typeName}.${t.name} to JSON`
                : `cannot encode message ${a.typeName} to JSON`,
              n = r instanceof Error ? r.message : String(r);
            throw Error(e + (n.length > 0 ? `: ${n}` : ""));
          }
          return r;
        },
        readScalar: (e, n, t) => q(e, n, null != t ? t : g.BIGINT, !0),
        writeScalar(e, n, t) {
          if (void 0 !== n && (t || O(e, n))) return Z(e, n);
        },
        debug: J,
      },
      bin: {
        makeReadOptions: function (e) {
          return e ? Object.assign(Object.assign({}, et), e) : et;
        },
        makeWriteOptions: function (e) {
          return e ? Object.assign(Object.assign({}, ea), e) : ea;
        },
        listUnknownFields(e) {
          var n;
          return null != (n = e[en]) ? n : [];
        },
        discardUnknownFields(e) {
          delete e[en];
        },
        writeUnknownFields(e, n) {
          let t = e[en];
          if (t) for (let e of t) n.tag(e.no, e.wireType).raw(e.data);
        },
        onUnknownField(e, n, t, a) {
          (Array.isArray(e[en]) || (e[en] = []),
            e[en].push({ no: n, wireType: t, data: a }));
        },
        readMessage(e, n, t, a, r) {
          let i,
            o,
            s = e.getType(),
            l = r ? n.len : n.pos + t;
          for (
            ;
            n.pos < l && (([i, o] = n.tag()), !0 !== r || o != k.EndGroup);

          ) {
            let t = s.fields.find(i);
            if (!t) {
              let t = n.skip(o, i);
              a.readUnknownFields && this.onUnknownField(e, i, o, t);
              continue;
            }
            er(e, n, t, o, a);
          }
          if (r && (o != k.EndGroup || i !== t))
            throw Error("invalid end group tag");
        },
        readField: er,
        writeMessage(e, n, t) {
          let a = e.getType();
          for (let r of a.fields.byNumber()) {
            if (!F(r, e)) {
              if (r.req)
                throw Error(
                  `cannot encode field ${a.typeName}.${r.name} to binary: required field not set`,
                );
              continue;
            }
            let i = r.oneof ? e[r.oneof.localName].value : e[r.localName];
            el(r, i, n, t);
          }
          return (t.writeUnknownFields && this.writeUnknownFields(e, n), n);
        },
        writeField(e, n, t, a) {
          void 0 !== n && el(e, n, t, a);
        },
      },
      util: Object.assign(
        Object.assign(
          {},
          {
            setEnumType: o,
            initPartial(e, n) {
              if (void 0 !== e)
                for (let t of n.getType().fields.byMember()) {
                  let a = t.localName;
                  if (null != e[a])
                    switch (t.kind) {
                      case "oneof":
                        let r = e[a].case;
                        if (void 0 === r) continue;
                        let i = t.findField(r),
                          o = e[a].value;
                        (i && "message" == i.kind && !V(o, i.T)
                          ? (o = new i.T(o))
                          : i &&
                            "scalar" === i.kind &&
                            i.T === h.BYTES &&
                            (o = ep(o)),
                          (n[a] = { case: r, value: o }));
                        break;
                      case "scalar":
                      case "enum":
                        let s = e[a];
                        (t.T === h.BYTES &&
                          (s = t.repeated ? s.map(ep) : ep(s)),
                          (n[a] = s));
                        break;
                      case "map":
                        switch (t.V.kind) {
                          case "scalar":
                          case "enum":
                            if (t.V.T === h.BYTES)
                              for (let [t, r] of Object.entries(e[a]))
                                n[a][t] = ep(r);
                            else Object.assign(n[a], e[a]);
                            break;
                          case "message":
                            let l = t.V.T;
                            for (let t of Object.keys(e[a])) {
                              let r = e[a][t];
                              (l.fieldWrapper || (r = new l(r)), (n[a][t] = r));
                            }
                        }
                        break;
                      case "message":
                        let c = t.T;
                        if (t.repeated)
                          n[a] = e[a].map((e) => (V(e, c) ? e : new c(e)));
                        else {
                          let t = e[a];
                          c.fieldWrapper
                            ? "google.protobuf.BytesValue" === c.typeName
                              ? (n[a] = ep(t))
                              : (n[a] = t)
                            : (n[a] = V(t, c) ? t : new c(t));
                        }
                    }
                }
            },
            equals: (e, n, t) =>
              n === t ||
              (!!n &&
                !!t &&
                e.fields.byMember().every((e) => {
                  let a = n[e.localName],
                    r = t[e.localName];
                  if (e.repeated) {
                    if (a.length !== r.length) return !1;
                    switch (e.kind) {
                      case "message":
                        return a.every((n, t) => e.T.equals(n, r[t]));
                      case "scalar":
                        return a.every((n, t) => R(e.T, n, r[t]));
                      case "enum":
                        return a.every((e, n) => R(h.INT32, e, r[n]));
                    }
                    throw Error(`repeated cannot contain ${e.kind}`);
                  }
                  switch (e.kind) {
                    case "message":
                      let i = a,
                        o = r;
                      return (
                        e.T.fieldWrapper &&
                          (void 0 === i ||
                            V(i) ||
                            (i = e.T.fieldWrapper.wrapField(i)),
                          void 0 === o ||
                            V(o) ||
                            (o = e.T.fieldWrapper.wrapField(o))),
                        e.T.equals(i, o)
                      );
                    case "enum":
                      return R(h.INT32, a, r);
                    case "scalar":
                      return R(e.T, a, r);
                    case "oneof":
                      if (a.case !== r.case) return !1;
                      let s = e.findField(a.case);
                      if (void 0 === s) return !0;
                      switch (s.kind) {
                        case "message":
                          return s.T.equals(a.value, r.value);
                        case "enum":
                          return R(h.INT32, a.value, r.value);
                        case "scalar":
                          return R(s.T, a.value, r.value);
                      }
                      throw Error(`oneof cannot contain ${s.kind}`);
                    case "map":
                      let l = Object.keys(a).concat(Object.keys(r));
                      switch (e.V.kind) {
                        case "message":
                          let c = e.V.T;
                          return l.every((e) => c.equals(a[e], r[e]));
                        case "enum":
                          return l.every((e) => R(h.INT32, a[e], r[e]));
                        case "scalar":
                          let u = e.V.T;
                          return l.every((e) => R(u, a[e], r[e]));
                      }
                  }
                })),
            clone(e) {
              let n = e.getType(),
                t = new n();
              for (let a of n.fields.byMember()) {
                let n,
                  r = e[a.localName];
                if (a.repeated) n = r.map(em);
                else if ("map" == a.kind)
                  for (let [e, i] of ((n = t[a.localName]), Object.entries(r)))
                    n[e] = em(i);
                else
                  n =
                    "oneof" == a.kind
                      ? a.findField(r.case)
                        ? { case: r.case, value: em(r.value) }
                        : { case: void 0 }
                      : em(r);
                t[a.localName] = n;
              }
              for (let a of n.runtime.bin.listUnknownFields(e))
                n.runtime.bin.onUnknownField(t, a.no, a.wireType, a.data);
              return t;
            },
          },
        ),
        { newFieldList: p, initFields: f },
      ),
      makeMessageType(e, n, t) {
        var a, r;
        let i, o;
        return (
          (a = this),
          Object.setPrototypeOf(
            (o = {
              [(i =
                null != (r = null == t ? void 0 : t.localName)
                  ? r
                  : e.substring(e.lastIndexOf(".") + 1))]: function (e) {
                (a.util.initFields(this), a.util.initPartial(e, this));
              },
            }[i]).prototype,
            new c(),
          ),
          Object.assign(o, {
            runtime: a,
            typeName: e,
            fields: a.util.newFieldList(n),
            fromBinary: (e, n) => new o().fromBinary(e, n),
            fromJson: (e, n) => new o().fromJson(e, n),
            fromJsonString: (e, n) => new o().fromJsonString(e, n),
            equals: (e, n) => a.util.equals(o, e, n),
          }),
          o
        );
      },
      makeEnum: function (e, n, t) {
        let a = {};
        for (let e of n) {
          let n = l(e);
          ((a[n.localName] = n.no), (a[n.no] = n.localName));
        }
        return (o(a, e, n, t), a);
      },
      makeEnumType: s,
      getEnumType: function (e) {
        let t = e[i];
        return (n(t, "missing enum type on enum object"), t);
      },
      makeExtension(e, n, t) {
        var a;
        let r;
        return (
          (a = this),
          {
            typeName: e,
            extendee: n,
            get field() {
              if (!r) {
                let n = "function" == typeof t ? t() : t;
                ((n.name = e.split(".").pop()),
                  (n.jsonName = `[${e}]`),
                  (r = a.util.newFieldList([n]).list()[0]));
              }
              return r;
            },
            runtime: a,
          }
        );
      },
    });
  class ew extends c {
    constructor(e) {
      (super(),
        (this.seconds = N.zero),
        (this.nanos = 0),
        eS.util.initPartial(e, this));
    }
    fromJson(e, n) {
      if ("string" != typeof e)
        throw Error(
          `cannot decode google.protobuf.Timestamp from JSON: ${eS.json.debug(e)}`,
        );
      let t = e.match(
        /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/,
      );
      if (!t)
        throw Error(
          "cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string",
        );
      let a = Date.parse(
        t[1] +
          "-" +
          t[2] +
          "-" +
          t[3] +
          "T" +
          t[4] +
          ":" +
          t[5] +
          ":" +
          t[6] +
          (t[8] ? t[8] : "Z"),
      );
      if (Number.isNaN(a))
        throw Error(
          "cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string",
        );
      if (
        a < Date.parse("0001-01-01T00:00:00Z") ||
        a > Date.parse("9999-12-31T23:59:59Z")
      )
        throw Error(
          "cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive",
        );
      return (
        (this.seconds = N.parse(a / 1e3)),
        (this.nanos = 0),
        t[7] &&
          (this.nanos =
            parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9),
        this
      );
    }
    toJson(e) {
      let n = 1e3 * Number(this.seconds);
      if (
        n < Date.parse("0001-01-01T00:00:00Z") ||
        n > Date.parse("9999-12-31T23:59:59Z")
      )
        throw Error(
          "cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive",
        );
      if (this.nanos < 0)
        throw Error(
          "cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative",
        );
      let t = "Z";
      if (this.nanos > 0) {
        let e = (this.nanos + 1e9).toString().substring(1);
        t =
          "000000" === e.substring(3)
            ? "." + e.substring(0, 3) + "Z"
            : "000" === e.substring(6)
              ? "." + e.substring(0, 6) + "Z"
              : "." + e + "Z";
      }
      return new Date(n).toISOString().replace(".000Z", t);
    }
    toDate() {
      return new Date(1e3 * Number(this.seconds) + Math.ceil(this.nanos / 1e6));
    }
    static now() {
      return ew.fromDate(new Date());
    }
    static fromDate(e) {
      let n = e.getTime();
      return new ew({
        seconds: N.parse(Math.floor(n / 1e3)),
        nanos: (n % 1e3) * 1e6,
      });
    }
    static fromBinary(e, n) {
      return new ew().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new ew().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new ew().fromJsonString(e, n);
    }
    static equals(e, n) {
      return eS.util.equals(ew, e, n);
    }
  }
  ((ew.runtime = eS),
    (ew.typeName = "google.protobuf.Timestamp"),
    (ew.fields = eS.util.newFieldList(() => [
      { no: 1, name: "seconds", kind: "scalar", T: 3 },
      { no: 2, name: "nanos", kind: "scalar", T: 5 },
    ])));
  class eI extends c {
    constructor(e) {
      (super(),
        (this.seconds = N.zero),
        (this.nanos = 0),
        eS.util.initPartial(e, this));
    }
    fromJson(e, n) {
      if ("string" != typeof e)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${eS.json.debug(e)}`,
        );
      let t = e.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
      if (null === t)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${eS.json.debug(e)}`,
        );
      let a = Number(t[1]);
      if (a > 315576e6 || a < -315576e6)
        throw Error(
          `cannot decode google.protobuf.Duration from JSON: ${eS.json.debug(e)}`,
        );
      if (((this.seconds = N.parse(a)), "string" == typeof t[2])) {
        let e = t[2] + "0".repeat(9 - t[2].length);
        ((this.nanos = parseInt(e)),
          (a < 0 || Object.is(a, -0)) && (this.nanos = -this.nanos));
      }
      return this;
    }
    toJson(e) {
      if (Number(this.seconds) > 315576e6 || -315576e6 > Number(this.seconds))
        throw Error(
          "cannot encode google.protobuf.Duration to JSON: value out of range",
        );
      let n = this.seconds.toString();
      if (0 !== this.nanos) {
        let e = Math.abs(this.nanos).toString();
        ("000000" === (e = "0".repeat(9 - e.length) + e).substring(3)
          ? (e = e.substring(0, 3))
          : "000" === e.substring(6) && (e = e.substring(0, 6)),
          (n += "." + e),
          this.nanos < 0 && 0 == Number(this.seconds) && (n = "-" + n));
      }
      return n + "s";
    }
    static fromBinary(e, n) {
      return new eI().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eI().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eI().fromJsonString(e, n);
    }
    static equals(e, n) {
      return eS.util.equals(eI, e, n);
    }
  }
  ((eI.runtime = eS),
    (eI.typeName = "google.protobuf.Duration"),
    (eI.fields = eS.util.newFieldList(() => [
      { no: 1, name: "seconds", kind: "scalar", T: 3 },
      { no: 2, name: "nanos", kind: "scalar", T: 5 },
    ])));
  class eA extends c {
    constructor(e) {
      (super(),
        (this.typeUrl = ""),
        (this.value = new Uint8Array(0)),
        eS.util.initPartial(e, this));
    }
    toJson(e) {
      var n;
      if ("" === this.typeUrl) return {};
      let t = this.typeUrlToName(this.typeUrl),
        a =
          null == (n = null == e ? void 0 : e.typeRegistry)
            ? void 0
            : n.findMessage(t);
      if (!a)
        throw Error(
          `cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`,
        );
      let r = a.fromBinary(this.value).toJson(e);
      return (
        (t.startsWith("google.protobuf.") ||
          null === r ||
          Array.isArray(r) ||
          "object" != typeof r) &&
          (r = { value: r }),
        (r["@type"] = this.typeUrl),
        r
      );
    }
    fromJson(e, n) {
      var t;
      let a;
      if (null === e || Array.isArray(e) || "object" != typeof e)
        throw Error(
          `cannot decode message google.protobuf.Any from JSON: expected object but got ${null === e ? "null" : Array.isArray(e) ? "array" : typeof e}`,
        );
      if (0 == Object.keys(e).length) return this;
      let r = e["@type"];
      if ("string" != typeof r || "" == r)
        throw Error(
          'cannot decode message google.protobuf.Any from JSON: "@type" is empty',
        );
      let i = this.typeUrlToName(r),
        o =
          null == (t = null == n ? void 0 : n.typeRegistry)
            ? void 0
            : t.findMessage(i);
      if (!o)
        throw Error(
          `cannot decode message google.protobuf.Any from JSON: ${r} is not in the type registry`,
        );
      if (
        i.startsWith("google.protobuf.") &&
        Object.prototype.hasOwnProperty.call(e, "value")
      )
        a = o.fromJson(e.value, n);
      else {
        let t = Object.assign({}, e);
        (delete t["@type"], (a = o.fromJson(t, n)));
      }
      return (this.packFrom(a), this);
    }
    packFrom(e) {
      ((this.value = e.toBinary()),
        (this.typeUrl = this.typeNameToUrl(e.getType().typeName)));
    }
    unpackTo(e) {
      return !!this.is(e.getType()) && (e.fromBinary(this.value), !0);
    }
    unpack(e) {
      if ("" === this.typeUrl) return;
      let n = e.findMessage(this.typeUrlToName(this.typeUrl));
      if (n) return n.fromBinary(this.value);
    }
    is(e) {
      if ("" === this.typeUrl) return !1;
      let n = this.typeUrlToName(this.typeUrl);
      return n === ("string" == typeof e ? e : e.typeName);
    }
    typeNameToUrl(e) {
      return `type.googleapis.com/${e}`;
    }
    typeUrlToName(e) {
      if (!e.length) throw Error(`invalid type url: ${e}`);
      let n = e.lastIndexOf("/"),
        t = n >= 0 ? e.substring(n + 1) : e;
      if (!t.length) throw Error(`invalid type url: ${e}`);
      return t;
    }
    static pack(e) {
      let n = new eA();
      return (n.packFrom(e), n);
    }
    static fromBinary(e, n) {
      return new eA().fromBinary(e, n);
    }
    static fromJson(e, n) {
      return new eA().fromJson(e, n);
    }
    static fromJsonString(e, n) {
      return new eA().fromJsonString(e, n);
    }
    static equals(e, n) {
      return eS.util.equals(eA, e, n);
    }
  }
  ((eA.runtime = eS),
    (eA.typeName = "google.protobuf.Any"),
    (eA.fields = eS.util.newFieldList(() => [
      { no: 1, name: "type_url", kind: "scalar", T: 9 },
      { no: 2, name: "value", kind: "scalar", T: 12 },
    ])));
  let eN = eS.makeEnum("livekit.agent.ChatRole", [
      { no: 0, name: "DEVELOPER" },
      { no: 1, name: "SYSTEM" },
      { no: 2, name: "USER" },
      { no: 3, name: "ASSISTANT" },
    ]),
    eR = eS.makeMessageType("livekit.agent.MetricsReport", () => [
      { no: 1, name: "started_speaking_at", kind: "message", T: ew },
      { no: 2, name: "stopped_speaking_at", kind: "message", T: ew },
      { no: 3, name: "transcription_delay", kind: "scalar", T: 1, opt: !0 },
      { no: 4, name: "end_of_turn_delay", kind: "scalar", T: 1, opt: !0 },
      {
        no: 5,
        name: "on_user_turn_completed_delay",
        kind: "scalar",
        T: 1,
        opt: !0,
      },
      { no: 6, name: "llm_node_ttft", kind: "scalar", T: 1, opt: !0 },
      { no: 7, name: "tts_node_ttfb", kind: "scalar", T: 1, opt: !0 },
      { no: 8, name: "e2e_latency", kind: "scalar", T: 1, opt: !0 },
    ]),
    eP = eS.makeMessageType("livekit.agent.ChatMessage", () => [
      { no: 1, name: "id", kind: "scalar", T: 9 },
      { no: 2, name: "role", kind: "enum", T: eS.getEnumType(eN) },
      { no: 3, name: "content", kind: "message", T: eO, repeated: !0 },
      { no: 4, name: "interrupted", kind: "scalar", T: 8 },
      { no: 5, name: "transcript_confidence", kind: "scalar", T: 1, opt: !0 },
      { no: 6, name: "extra", kind: "map", K: 9, V: { kind: "scalar", T: 9 } },
      { no: 7, name: "metrics", kind: "message", T: eR },
      { no: 8, name: "created_at", kind: "message", T: ew },
    ]),
    eO = eS.makeMessageType(
      "livekit.agent.ChatMessage.ChatContent",
      () => [{ no: 1, name: "text", kind: "scalar", T: 9, oneof: "payload" }],
      { localName: "ChatMessage_ChatContent" },
    ),
    ex = eS.makeMessageType("livekit.agent.FunctionCall", () => [
      { no: 1, name: "id", kind: "scalar", T: 9 },
      { no: 2, name: "call_id", kind: "scalar", T: 9 },
      { no: 3, name: "arguments", kind: "scalar", T: 9 },
      { no: 4, name: "name", kind: "scalar", T: 9 },
      { no: 5, name: "created_at", kind: "message", T: ew },
    ]),
    eC = eS.makeMessageType("livekit.agent.FunctionCallOutput", () => [
      { no: 1, name: "id", kind: "scalar", T: 9 },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      { no: 3, name: "call_id", kind: "scalar", T: 9 },
      { no: 4, name: "output", kind: "scalar", T: 9 },
      { no: 5, name: "is_error", kind: "scalar", T: 8 },
      { no: 6, name: "created_at", kind: "message", T: ew },
    ]),
    eM = eS.makeMessageType("livekit.agent.AgentHandoff", () => [
      { no: 1, name: "id", kind: "scalar", T: 9 },
      { no: 2, name: "old_agent_id", kind: "scalar", T: 9, opt: !0 },
      { no: 3, name: "new_agent_id", kind: "scalar", T: 9 },
      { no: 4, name: "created_at", kind: "message", T: ew },
    ]),
    eD =
      (() => [
        { no: 1, name: "message", kind: "message", T: eP, oneof: "item" },
        { no: 2, name: "function_call", kind: "message", T: ex, oneof: "item" },
        {
          no: 3,
          name: "function_call_output",
          kind: "message",
          T: eC,
          oneof: "item",
        },
        { no: 4, name: "agent_handoff", kind: "message", T: eM, oneof: "item" },
      ],
      eS.makeMessageType("livekit.TimeSeriesMetric", () => [
        { no: 1, name: "label", kind: "scalar", T: 13 },
        { no: 2, name: "participant_identity", kind: "scalar", T: 13 },
        { no: 3, name: "track_sid", kind: "scalar", T: 13 },
        { no: 4, name: "samples", kind: "message", T: eL, repeated: !0 },
        { no: 5, name: "rid", kind: "scalar", T: 13 },
      ])),
    eL = eS.makeMessageType("livekit.MetricSample", () => [
      { no: 1, name: "timestamp_ms", kind: "scalar", T: 3 },
      { no: 2, name: "normalized_timestamp", kind: "message", T: ew },
      { no: 3, name: "value", kind: "scalar", T: 2 },
    ]),
    eU = eS.makeMessageType("livekit.EventMetric", () => [
      { no: 1, name: "label", kind: "scalar", T: 13 },
      { no: 2, name: "participant_identity", kind: "scalar", T: 13 },
      { no: 3, name: "track_sid", kind: "scalar", T: 13 },
      { no: 4, name: "start_timestamp_ms", kind: "scalar", T: 3 },
      { no: 5, name: "end_timestamp_ms", kind: "scalar", T: 3, opt: !0 },
      { no: 6, name: "normalized_start_timestamp", kind: "message", T: ew },
      {
        no: 7,
        name: "normalized_end_timestamp",
        kind: "message",
        T: ew,
        opt: !0,
      },
      { no: 8, name: "metadata", kind: "scalar", T: 9 },
      { no: 9, name: "rid", kind: "scalar", T: 13 },
    ]),
    eF = eS.makeEnum("livekit.AudioCodec", [
      { no: 0, name: "DEFAULT_AC" },
      { no: 1, name: "OPUS" },
      { no: 2, name: "AAC" },
      { no: 3, name: "AC_MP3" },
    ]),
    ej = eS.makeEnum("livekit.VideoCodec", [
      { no: 0, name: "DEFAULT_VC" },
      { no: 1, name: "H264_BASELINE" },
      { no: 2, name: "H264_MAIN" },
      { no: 3, name: "H264_HIGH" },
      { no: 4, name: "VP8" },
    ]),
    eV = eS.makeEnum("livekit.ImageCodec", [
      { no: 0, name: "IC_DEFAULT" },
      { no: 1, name: "IC_JPEG" },
    ]),
    eH = eS.makeEnum("livekit.BackupCodecPolicy", [
      { no: 0, name: "PREFER_REGRESSION" },
      { no: 1, name: "SIMULCAST" },
      { no: 2, name: "REGRESSION" },
    ]),
    eB = eS.makeEnum("livekit.TrackType", [
      { no: 0, name: "AUDIO" },
      { no: 1, name: "VIDEO" },
      { no: 2, name: "DATA" },
    ]),
    e$ = eS.makeEnum("livekit.TrackSource", [
      { no: 0, name: "UNKNOWN" },
      { no: 1, name: "CAMERA" },
      { no: 2, name: "MICROPHONE" },
      { no: 3, name: "SCREEN_SHARE" },
      { no: 4, name: "SCREEN_SHARE_AUDIO" },
    ]),
    eG = eS.makeEnum("livekit.VideoQuality", [
      { no: 0, name: "LOW" },
      { no: 1, name: "MEDIUM" },
      { no: 2, name: "HIGH" },
      { no: 3, name: "OFF" },
    ]),
    eW = eS.makeEnum("livekit.ConnectionQuality", [
      { no: 0, name: "POOR" },
      { no: 1, name: "GOOD" },
      { no: 2, name: "EXCELLENT" },
      { no: 3, name: "LOST" },
    ]),
    eJ = eS.makeEnum("livekit.ClientConfigSetting", [
      { no: 0, name: "UNSET" },
      { no: 1, name: "DISABLED" },
      { no: 2, name: "ENABLED" },
    ]),
    ez = eS.makeEnum("livekit.DisconnectReason", [
      { no: 0, name: "UNKNOWN_REASON" },
      { no: 1, name: "CLIENT_INITIATED" },
      { no: 2, name: "DUPLICATE_IDENTITY" },
      { no: 3, name: "SERVER_SHUTDOWN" },
      { no: 4, name: "PARTICIPANT_REMOVED" },
      { no: 5, name: "ROOM_DELETED" },
      { no: 6, name: "STATE_MISMATCH" },
      { no: 7, name: "JOIN_FAILURE" },
      { no: 8, name: "MIGRATION" },
      { no: 9, name: "SIGNAL_CLOSE" },
      { no: 10, name: "ROOM_CLOSED" },
      { no: 11, name: "USER_UNAVAILABLE" },
      { no: 12, name: "USER_REJECTED" },
      { no: 13, name: "SIP_TRUNK_FAILURE" },
      { no: 14, name: "CONNECTION_TIMEOUT" },
      { no: 15, name: "MEDIA_FAILURE" },
    ]),
    eq = eS.makeEnum("livekit.SubscriptionError", [
      { no: 0, name: "SE_UNKNOWN" },
      { no: 1, name: "SE_CODEC_UNSUPPORTED" },
      { no: 2, name: "SE_TRACK_NOTFOUND" },
    ]),
    eY = eS.makeEnum("livekit.AudioTrackFeature", [
      { no: 0, name: "TF_STEREO" },
      { no: 1, name: "TF_NO_DTX" },
      { no: 2, name: "TF_AUTO_GAIN_CONTROL" },
      { no: 3, name: "TF_ECHO_CANCELLATION" },
      { no: 4, name: "TF_NOISE_SUPPRESSION" },
      { no: 5, name: "TF_ENHANCED_NOISE_CANCELLATION" },
      { no: 6, name: "TF_PRECONNECT_BUFFER" },
    ]),
    eK =
      (() => [
        { no: 1, name: "after_id", kind: "scalar", T: 9 },
        { no: 2, name: "limit", kind: "scalar", T: 5 },
      ],
      eS.makeMessageType("livekit.ListUpdate", () => [
        { no: 1, name: "set", kind: "scalar", T: 9, repeated: !0 },
        { no: 2, name: "add", kind: "scalar", T: 9, repeated: !0 },
        { no: 3, name: "remove", kind: "scalar", T: 9, repeated: !0 },
        { no: 4, name: "clear", kind: "scalar", T: 8 },
      ])),
    eX = eS.makeMessageType("livekit.Room", () => [
      { no: 1, name: "sid", kind: "scalar", T: 9 },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      { no: 3, name: "empty_timeout", kind: "scalar", T: 13 },
      { no: 14, name: "departure_timeout", kind: "scalar", T: 13 },
      { no: 4, name: "max_participants", kind: "scalar", T: 13 },
      { no: 5, name: "creation_time", kind: "scalar", T: 3 },
      { no: 15, name: "creation_time_ms", kind: "scalar", T: 3 },
      { no: 6, name: "turn_password", kind: "scalar", T: 9 },
      { no: 7, name: "enabled_codecs", kind: "message", T: eZ, repeated: !0 },
      { no: 8, name: "metadata", kind: "scalar", T: 9 },
      { no: 9, name: "num_participants", kind: "scalar", T: 13 },
      { no: 11, name: "num_publishers", kind: "scalar", T: 13 },
      { no: 10, name: "active_recording", kind: "scalar", T: 8 },
      { no: 13, name: "version", kind: "message", T: nd },
    ]),
    eZ = eS.makeMessageType("livekit.Codec", () => [
      { no: 1, name: "mime", kind: "scalar", T: 9 },
      { no: 2, name: "fmtp_line", kind: "scalar", T: 9 },
    ]),
    eQ = eS.makeMessageType("livekit.ParticipantPermission", () => [
      { no: 1, name: "can_subscribe", kind: "scalar", T: 8 },
      { no: 2, name: "can_publish", kind: "scalar", T: 8 },
      { no: 3, name: "can_publish_data", kind: "scalar", T: 8 },
      {
        no: 9,
        name: "can_publish_sources",
        kind: "enum",
        T: eS.getEnumType(e$),
        repeated: !0,
      },
      { no: 7, name: "hidden", kind: "scalar", T: 8 },
      { no: 8, name: "recorder", kind: "scalar", T: 8 },
      { no: 10, name: "can_update_metadata", kind: "scalar", T: 8 },
      { no: 11, name: "agent", kind: "scalar", T: 8 },
      { no: 12, name: "can_subscribe_metrics", kind: "scalar", T: 8 },
    ]),
    e0 = eS.makeMessageType("livekit.ParticipantInfo", () => [
      { no: 1, name: "sid", kind: "scalar", T: 9 },
      { no: 2, name: "identity", kind: "scalar", T: 9 },
      { no: 3, name: "state", kind: "enum", T: eS.getEnumType(e1) },
      { no: 4, name: "tracks", kind: "message", T: e4, repeated: !0 },
      { no: 5, name: "metadata", kind: "scalar", T: 9 },
      { no: 6, name: "joined_at", kind: "scalar", T: 3 },
      { no: 17, name: "joined_at_ms", kind: "scalar", T: 3 },
      { no: 9, name: "name", kind: "scalar", T: 9 },
      { no: 10, name: "version", kind: "scalar", T: 13 },
      { no: 11, name: "permission", kind: "message", T: eQ },
      { no: 12, name: "region", kind: "scalar", T: 9 },
      { no: 13, name: "is_publisher", kind: "scalar", T: 8 },
      { no: 14, name: "kind", kind: "enum", T: eS.getEnumType(e5) },
      {
        no: 15,
        name: "attributes",
        kind: "map",
        K: 9,
        V: { kind: "scalar", T: 9 },
      },
      {
        no: 16,
        name: "disconnect_reason",
        kind: "enum",
        T: eS.getEnumType(ez),
      },
      {
        no: 18,
        name: "kind_details",
        kind: "enum",
        T: eS.getEnumType(e2),
        repeated: !0,
      },
      { no: 19, name: "data_tracks", kind: "message", T: e6, repeated: !0 },
    ]),
    e1 = eS.makeEnum("livekit.ParticipantInfo.State", [
      { no: 0, name: "JOINING" },
      { no: 1, name: "JOINED" },
      { no: 2, name: "ACTIVE" },
      { no: 3, name: "DISCONNECTED" },
    ]),
    e5 = eS.makeEnum("livekit.ParticipantInfo.Kind", [
      { no: 0, name: "STANDARD" },
      { no: 1, name: "INGRESS" },
      { no: 2, name: "EGRESS" },
      { no: 3, name: "SIP" },
      { no: 4, name: "AGENT" },
      { no: 7, name: "CONNECTOR" },
    ]),
    e2 = eS.makeEnum("livekit.ParticipantInfo.KindDetail", [
      { no: 0, name: "CLOUD_AGENT" },
      { no: 1, name: "FORWARDED" },
      { no: 2, name: "CONNECTOR_WHATSAPP" },
      { no: 3, name: "CONNECTOR_TWILIO" },
    ]),
    e3 = eS.makeEnum("livekit.Encryption.Type", [
      { no: 0, name: "NONE" },
      { no: 1, name: "GCM" },
      { no: 2, name: "CUSTOM" },
    ]),
    e9 = eS.makeMessageType("livekit.SimulcastCodecInfo", () => [
      { no: 1, name: "mime_type", kind: "scalar", T: 9 },
      { no: 2, name: "mid", kind: "scalar", T: 9 },
      { no: 3, name: "cid", kind: "scalar", T: 9 },
      { no: 4, name: "layers", kind: "message", T: e8, repeated: !0 },
      { no: 5, name: "video_layer_mode", kind: "enum", T: eS.getEnumType(ne) },
      { no: 6, name: "sdp_cid", kind: "scalar", T: 9 },
    ]),
    e4 = eS.makeMessageType("livekit.TrackInfo", () => [
      { no: 1, name: "sid", kind: "scalar", T: 9 },
      { no: 2, name: "type", kind: "enum", T: eS.getEnumType(eB) },
      { no: 3, name: "name", kind: "scalar", T: 9 },
      { no: 4, name: "muted", kind: "scalar", T: 8 },
      { no: 5, name: "width", kind: "scalar", T: 13 },
      { no: 6, name: "height", kind: "scalar", T: 13 },
      { no: 7, name: "simulcast", kind: "scalar", T: 8 },
      { no: 8, name: "disable_dtx", kind: "scalar", T: 8 },
      { no: 9, name: "source", kind: "enum", T: eS.getEnumType(e$) },
      { no: 10, name: "layers", kind: "message", T: e8, repeated: !0 },
      { no: 11, name: "mime_type", kind: "scalar", T: 9 },
      { no: 12, name: "mid", kind: "scalar", T: 9 },
      { no: 13, name: "codecs", kind: "message", T: e9, repeated: !0 },
      { no: 14, name: "stereo", kind: "scalar", T: 8 },
      { no: 15, name: "disable_red", kind: "scalar", T: 8 },
      { no: 16, name: "encryption", kind: "enum", T: eS.getEnumType(e3) },
      { no: 17, name: "stream", kind: "scalar", T: 9 },
      { no: 18, name: "version", kind: "message", T: nd },
      {
        no: 19,
        name: "audio_features",
        kind: "enum",
        T: eS.getEnumType(eY),
        repeated: !0,
      },
      {
        no: 20,
        name: "backup_codec_policy",
        kind: "enum",
        T: eS.getEnumType(eH),
      },
    ]),
    e6 = eS.makeMessageType("livekit.DataTrackInfo", () => [
      { no: 1, name: "pub_handle", kind: "scalar", T: 13 },
      { no: 2, name: "sid", kind: "scalar", T: 9 },
      { no: 3, name: "name", kind: "scalar", T: 9 },
      { no: 4, name: "encryption", kind: "enum", T: eS.getEnumType(e3) },
    ]),
    e7 = eS.makeMessageType("livekit.DataTrackSubscriptionOptions", () => [
      { no: 1, name: "target_fps", kind: "scalar", T: 13, opt: !0 },
    ]),
    e8 = eS.makeMessageType("livekit.VideoLayer", () => [
      { no: 1, name: "quality", kind: "enum", T: eS.getEnumType(eG) },
      { no: 2, name: "width", kind: "scalar", T: 13 },
      { no: 3, name: "height", kind: "scalar", T: 13 },
      { no: 4, name: "bitrate", kind: "scalar", T: 13 },
      { no: 5, name: "ssrc", kind: "scalar", T: 13 },
      { no: 6, name: "spatial_layer", kind: "scalar", T: 5 },
      { no: 7, name: "rid", kind: "scalar", T: 9 },
    ]),
    ne = eS.makeEnum("livekit.VideoLayer.Mode", [
      { no: 0, name: "MODE_UNUSED" },
      { no: 1, name: "ONE_SPATIAL_LAYER_PER_STREAM" },
      { no: 2, name: "MULTIPLE_SPATIAL_LAYERS_PER_STREAM" },
      { no: 3, name: "ONE_SPATIAL_LAYER_PER_STREAM_INCOMPLETE_RTCP_SR" },
    ]),
    nn =
      (() => [
        { no: 1, name: "encryption_type", kind: "enum", T: eS.getEnumType(e3) },
        { no: 2, name: "iv", kind: "scalar", T: 12 },
        { no: 3, name: "key_index", kind: "scalar", T: 13 },
        { no: 4, name: "encrypted_value", kind: "scalar", T: 12 },
      ],
      eS.makeMessageType("livekit.SpeakerInfo", () => [
        { no: 1, name: "sid", kind: "scalar", T: 9 },
        { no: 2, name: "level", kind: "scalar", T: 2 },
        { no: 3, name: "active", kind: "scalar", T: 8 },
      ])),
    nt =
      (() => [
        { no: 1, name: "participant_sid", kind: "scalar", T: 9 },
        { no: 5, name: "participant_identity", kind: "scalar", T: 9 },
        { no: 2, name: "payload", kind: "scalar", T: 12 },
        { no: 3, name: "destination_sids", kind: "scalar", T: 9, repeated: !0 },
        {
          no: 6,
          name: "destination_identities",
          kind: "scalar",
          T: 9,
          repeated: !0,
        },
        { no: 4, name: "topic", kind: "scalar", T: 9, opt: !0 },
        { no: 8, name: "id", kind: "scalar", T: 9, opt: !0 },
        { no: 9, name: "start_time", kind: "scalar", T: 4, opt: !0 },
        { no: 10, name: "end_time", kind: "scalar", T: 4, opt: !0 },
        { no: 11, name: "nonce", kind: "scalar", T: 12 },
      ],
      eS.makeMessageType("livekit.TranscriptionSegment", () => [
        { no: 1, name: "id", kind: "scalar", T: 9 },
        { no: 2, name: "text", kind: "scalar", T: 9 },
        { no: 3, name: "start_time", kind: "scalar", T: 4 },
        { no: 4, name: "end_time", kind: "scalar", T: 4 },
        { no: 5, name: "final", kind: "scalar", T: 8 },
        { no: 6, name: "language", kind: "scalar", T: 9 },
      ])),
    na =
      (() => [
        { no: 1, name: "id", kind: "scalar", T: 9 },
        { no: 2, name: "timestamp", kind: "scalar", T: 3 },
        { no: 3, name: "edit_timestamp", kind: "scalar", T: 3, opt: !0 },
        { no: 4, name: "message", kind: "scalar", T: 9 },
        { no: 5, name: "deleted", kind: "scalar", T: 8 },
        { no: 6, name: "generated", kind: "scalar", T: 8 },
      ],
      eS.makeMessageType("livekit.RpcError", () => [
        { no: 1, name: "code", kind: "scalar", T: 13 },
        { no: 2, name: "message", kind: "scalar", T: 9 },
        { no: 3, name: "data", kind: "scalar", T: 9 },
      ])),
    nr = eS.makeMessageType("livekit.ParticipantTracks", () => [
      { no: 1, name: "participant_sid", kind: "scalar", T: 9 },
      { no: 2, name: "track_sids", kind: "scalar", T: 9, repeated: !0 },
    ]),
    ni = eS.makeMessageType("livekit.ServerInfo", () => [
      { no: 1, name: "edition", kind: "enum", T: eS.getEnumType(no) },
      { no: 2, name: "version", kind: "scalar", T: 9 },
      { no: 3, name: "protocol", kind: "scalar", T: 5 },
      { no: 4, name: "region", kind: "scalar", T: 9 },
      { no: 5, name: "node_id", kind: "scalar", T: 9 },
      { no: 6, name: "debug_info", kind: "scalar", T: 9 },
      { no: 7, name: "agent_protocol", kind: "scalar", T: 5 },
    ]),
    no = eS.makeEnum("livekit.ServerInfo.Edition", [
      { no: 0, name: "Standard" },
      { no: 1, name: "Cloud" },
    ]),
    ns =
      (() => [
        { no: 1, name: "sdk", kind: "enum", T: eS.getEnumType(ns) },
        { no: 2, name: "version", kind: "scalar", T: 9 },
        { no: 3, name: "protocol", kind: "scalar", T: 5 },
        { no: 4, name: "os", kind: "scalar", T: 9 },
        { no: 5, name: "os_version", kind: "scalar", T: 9 },
        { no: 6, name: "device_model", kind: "scalar", T: 9 },
        { no: 7, name: "browser", kind: "scalar", T: 9 },
        { no: 8, name: "browser_version", kind: "scalar", T: 9 },
        { no: 9, name: "address", kind: "scalar", T: 9 },
        { no: 10, name: "network", kind: "scalar", T: 9 },
        { no: 11, name: "other_sdks", kind: "scalar", T: 9 },
      ],
      eS.makeEnum("livekit.ClientInfo.SDK", [
        { no: 0, name: "UNKNOWN" },
        { no: 1, name: "JS" },
        { no: 2, name: "SWIFT" },
        { no: 3, name: "ANDROID" },
        { no: 4, name: "FLUTTER" },
        { no: 5, name: "GO" },
        { no: 6, name: "UNITY" },
        { no: 7, name: "REACT_NATIVE" },
        { no: 8, name: "RUST" },
        { no: 9, name: "PYTHON" },
        { no: 10, name: "CPP" },
        { no: 11, name: "UNITY_WEB" },
        { no: 12, name: "NODE" },
        { no: 13, name: "UNREAL" },
        { no: 14, name: "ESP32" },
      ])),
    nl = eS.makeMessageType("livekit.ClientConfiguration", () => [
      { no: 1, name: "video", kind: "message", T: nc },
      { no: 2, name: "screen", kind: "message", T: nc },
      { no: 3, name: "resume_connection", kind: "enum", T: eS.getEnumType(eJ) },
      { no: 4, name: "disabled_codecs", kind: "message", T: nu },
      { no: 5, name: "force_relay", kind: "enum", T: eS.getEnumType(eJ) },
    ]),
    nc = eS.makeMessageType("livekit.VideoConfiguration", () => [
      { no: 1, name: "hardware_encoder", kind: "enum", T: eS.getEnumType(eJ) },
    ]),
    nu = eS.makeMessageType("livekit.DisabledCodecs", () => [
      { no: 1, name: "codecs", kind: "message", T: eZ, repeated: !0 },
      { no: 2, name: "publish", kind: "message", T: eZ, repeated: !0 },
    ]),
    nd =
      (() => [
        { no: 1, name: "start_time", kind: "message", T: ew },
        { no: 2, name: "end_time", kind: "message", T: ew },
        { no: 3, name: "duration", kind: "scalar", T: 1 },
        { no: 4, name: "start_timestamp", kind: "scalar", T: 4 },
        { no: 5, name: "end_timestamp", kind: "scalar", T: 4 },
        { no: 6, name: "rtp_clock_ticks", kind: "scalar", T: 4 },
        { no: 7, name: "drift_samples", kind: "scalar", T: 3 },
        { no: 8, name: "drift_ms", kind: "scalar", T: 1 },
        { no: 9, name: "clock_rate", kind: "scalar", T: 1 },
      ],
      eS.makeMessageType("livekit.TimedVersion", () => [
        { no: 1, name: "unix_micro", kind: "scalar", T: 3 },
        { no: 2, name: "ticks", kind: "scalar", T: 5 },
      ])),
    nm = eS.makeEnum("livekit.DataStream.OperationType", [
      { no: 0, name: "CREATE" },
      { no: 1, name: "UPDATE" },
      { no: 2, name: "DELETE" },
      { no: 3, name: "REACTION" },
    ]),
    np = eS.makeMessageType(
      "livekit.DataStream.TextHeader",
      () => [
        { no: 1, name: "operation_type", kind: "enum", T: eS.getEnumType(nm) },
        { no: 2, name: "version", kind: "scalar", T: 5 },
        { no: 3, name: "reply_to_stream_id", kind: "scalar", T: 9 },
        {
          no: 4,
          name: "attached_stream_ids",
          kind: "scalar",
          T: 9,
          repeated: !0,
        },
        { no: 5, name: "generated", kind: "scalar", T: 8 },
      ],
      { localName: "DataStream_TextHeader" },
    ),
    nf = eS.makeMessageType(
      "livekit.DataStream.ByteHeader",
      () => [{ no: 1, name: "name", kind: "scalar", T: 9 }],
      { localName: "DataStream_ByteHeader" },
    ),
    nh =
      (() => [
        { no: 1, name: "stream_id", kind: "scalar", T: 9 },
        { no: 2, name: "timestamp", kind: "scalar", T: 3 },
        { no: 3, name: "topic", kind: "scalar", T: 9 },
        { no: 4, name: "mime_type", kind: "scalar", T: 9 },
        { no: 5, name: "total_length", kind: "scalar", T: 4, opt: !0 },
        { no: 7, name: "encryption_type", kind: "enum", T: eS.getEnumType(e3) },
        {
          no: 8,
          name: "attributes",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
        {
          no: 9,
          name: "text_header",
          kind: "message",
          T: np,
          oneof: "content_header",
        },
        {
          no: 10,
          name: "byte_header",
          kind: "message",
          T: nf,
          oneof: "content_header",
        },
      ],
      eS.makeMessageType("livekit.FilterParams", () => [
        { no: 1, name: "include_events", kind: "scalar", T: 9, repeated: !0 },
        { no: 2, name: "exclude_events", kind: "scalar", T: 9, repeated: !0 },
      ])),
    ng = eS.makeMessageType("livekit.WebhookConfig", () => [
      { no: 1, name: "url", kind: "scalar", T: 9 },
      { no: 2, name: "signing_key", kind: "scalar", T: 9 },
      { no: 3, name: "filter_params", kind: "message", T: nh },
    ]),
    nk = eS.makeMessageType("livekit.SubscribedAudioCodec", () => [
      { no: 1, name: "codec", kind: "scalar", T: 9 },
      { no: 2, name: "enabled", kind: "scalar", T: 8 },
    ]),
    nT = eS.makeEnum("livekit.JobType", [
      { no: 0, name: "JT_ROOM" },
      { no: 1, name: "JT_PUBLISHER" },
      { no: 2, name: "JT_PARTICIPANT" },
    ]),
    nv = eS.makeEnum("livekit.WorkerStatus", [
      { no: 0, name: "WS_AVAILABLE" },
      { no: 1, name: "WS_FULL" },
    ]),
    ny = eS.makeEnum("livekit.JobStatus", [
      { no: 0, name: "JS_PENDING" },
      { no: 1, name: "JS_RUNNING" },
      { no: 2, name: "JS_SUCCESS" },
      { no: 3, name: "JS_FAILED" },
    ]),
    nb = eS.makeMessageType("livekit.Job", () => [
      { no: 1, name: "id", kind: "scalar", T: 9 },
      { no: 9, name: "dispatch_id", kind: "scalar", T: 9 },
      { no: 2, name: "type", kind: "enum", T: eS.getEnumType(nT) },
      { no: 3, name: "room", kind: "message", T: eX },
      { no: 4, name: "participant", kind: "message", T: e0, opt: !0 },
      { no: 5, name: "namespace", kind: "scalar", T: 9 },
      { no: 6, name: "metadata", kind: "scalar", T: 9 },
      { no: 7, name: "agent_name", kind: "scalar", T: 9 },
      { no: 8, name: "state", kind: "message", T: nE },
      { no: 10, name: "enable_recording", kind: "scalar", T: 8 },
    ]),
    nE = eS.makeMessageType("livekit.JobState", () => [
      { no: 1, name: "status", kind: "enum", T: eS.getEnumType(ny) },
      { no: 2, name: "error", kind: "scalar", T: 9 },
      { no: 3, name: "started_at", kind: "scalar", T: 3 },
      { no: 4, name: "ended_at", kind: "scalar", T: 3 },
      { no: 5, name: "updated_at", kind: "scalar", T: 3 },
      { no: 6, name: "participant_identity", kind: "scalar", T: 9 },
      { no: 7, name: "worker_id", kind: "scalar", T: 9 },
      { no: 8, name: "agent_id", kind: "scalar", T: 9 },
    ]),
    n_ =
      (() => [
        { no: 1, name: "type", kind: "enum", T: eS.getEnumType(nT) },
        { no: 2, name: "room", kind: "message", T: eX },
        { no: 3, name: "participant", kind: "message", T: e0 },
      ],
      eS.makeMessageType("livekit.RoomAgentDispatch", () => [
        { no: 1, name: "agent_name", kind: "scalar", T: 9 },
        { no: 2, name: "metadata", kind: "scalar", T: 9 },
      ])),
    nS =
      (() => [
        { no: 1, name: "id", kind: "scalar", T: 9 },
        { no: 2, name: "agent_name", kind: "scalar", T: 9 },
        { no: 3, name: "room", kind: "scalar", T: 9 },
        { no: 4, name: "metadata", kind: "scalar", T: 9 },
        { no: 5, name: "state", kind: "message", T: nS },
      ],
      eS.makeMessageType("livekit.AgentDispatchState", () => [
        { no: 1, name: "jobs", kind: "message", T: nb, repeated: !0 },
        { no: 2, name: "created_at", kind: "scalar", T: 3 },
        { no: 3, name: "deleted_at", kind: "scalar", T: 3 },
      ])),
    nw = eS.makeEnum("livekit.SignalTarget", [
      { no: 0, name: "PUBLISHER" },
      { no: 1, name: "SUBSCRIBER" },
    ]),
    nI = eS.makeEnum("livekit.StreamState", [
      { no: 0, name: "ACTIVE" },
      { no: 1, name: "PAUSED" },
    ]),
    nA = eS.makeEnum("livekit.CandidateProtocol", [
      { no: 0, name: "UDP" },
      { no: 1, name: "TCP" },
      { no: 2, name: "TLS" },
    ]),
    nN = eS.makeMessageType("livekit.SimulcastCodec", () => [
      { no: 1, name: "codec", kind: "scalar", T: 9 },
      { no: 2, name: "cid", kind: "scalar", T: 9 },
      { no: 4, name: "layers", kind: "message", T: e8, repeated: !0 },
      { no: 5, name: "video_layer_mode", kind: "enum", T: eS.getEnumType(ne) },
    ]),
    nR = eS.makeMessageType("livekit.AddTrackRequest", () => [
      { no: 1, name: "cid", kind: "scalar", T: 9 },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      { no: 3, name: "type", kind: "enum", T: eS.getEnumType(eB) },
      { no: 4, name: "width", kind: "scalar", T: 13 },
      { no: 5, name: "height", kind: "scalar", T: 13 },
      { no: 6, name: "muted", kind: "scalar", T: 8 },
      { no: 7, name: "disable_dtx", kind: "scalar", T: 8 },
      { no: 8, name: "source", kind: "enum", T: eS.getEnumType(e$) },
      { no: 9, name: "layers", kind: "message", T: e8, repeated: !0 },
      {
        no: 10,
        name: "simulcast_codecs",
        kind: "message",
        T: nN,
        repeated: !0,
      },
      { no: 11, name: "sid", kind: "scalar", T: 9 },
      { no: 12, name: "stereo", kind: "scalar", T: 8 },
      { no: 13, name: "disable_red", kind: "scalar", T: 8 },
      { no: 14, name: "encryption", kind: "enum", T: eS.getEnumType(e3) },
      { no: 15, name: "stream", kind: "scalar", T: 9 },
      {
        no: 16,
        name: "backup_codec_policy",
        kind: "enum",
        T: eS.getEnumType(eH),
      },
      {
        no: 17,
        name: "audio_features",
        kind: "enum",
        T: eS.getEnumType(eY),
        repeated: !0,
      },
    ]),
    nP = eS.makeMessageType("livekit.PublishDataTrackRequest", () => [
      { no: 1, name: "pub_handle", kind: "scalar", T: 13 },
      { no: 2, name: "name", kind: "scalar", T: 9 },
      { no: 3, name: "encryption", kind: "enum", T: eS.getEnumType(e3) },
    ]),
    nO = eS.makeMessageType("livekit.PublishDataTrackResponse", () => [
      { no: 1, name: "info", kind: "message", T: e6 },
    ]),
    nx = eS.makeMessageType("livekit.UnpublishDataTrackRequest", () => [
      { no: 1, name: "pub_handle", kind: "scalar", T: 13 },
    ]),
    nC =
      (() => [{ no: 1, name: "info", kind: "message", T: e6 }],
      eS.makeMessageType(
        "livekit.DataTrackSubscriberHandles.PublishedDataTrack",
        () => [
          { no: 1, name: "publisher_identity", kind: "scalar", T: 9 },
          { no: 2, name: "publisher_sid", kind: "scalar", T: 9 },
          { no: 3, name: "track_sid", kind: "scalar", T: 9 },
        ],
        { localName: "DataTrackSubscriberHandles_PublishedDataTrack" },
      )),
    nM = eS.makeMessageType("livekit.TrickleRequest", () => [
      { no: 1, name: "candidateInit", kind: "scalar", T: 9 },
      { no: 2, name: "target", kind: "enum", T: eS.getEnumType(nw) },
      { no: 3, name: "final", kind: "scalar", T: 8 },
    ]),
    nD = eS.makeMessageType("livekit.MuteTrackRequest", () => [
      { no: 1, name: "sid", kind: "scalar", T: 9 },
      { no: 2, name: "muted", kind: "scalar", T: 8 },
    ]),
    nL =
      (() => [
        { no: 1, name: "room", kind: "message", T: eX },
        { no: 2, name: "participant", kind: "message", T: e0 },
        {
          no: 3,
          name: "other_participants",
          kind: "message",
          T: e0,
          repeated: !0,
        },
        { no: 4, name: "server_version", kind: "scalar", T: 9 },
        { no: 5, name: "ice_servers", kind: "message", T: nG, repeated: !0 },
        { no: 6, name: "subscriber_primary", kind: "scalar", T: 8 },
        { no: 7, name: "alternative_url", kind: "scalar", T: 9 },
        { no: 8, name: "client_configuration", kind: "message", T: nl },
        { no: 9, name: "server_region", kind: "scalar", T: 9 },
        { no: 10, name: "ping_timeout", kind: "scalar", T: 5 },
        { no: 11, name: "ping_interval", kind: "scalar", T: 5 },
        { no: 12, name: "server_info", kind: "message", T: ni },
        { no: 13, name: "sif_trailer", kind: "scalar", T: 12 },
        {
          no: 14,
          name: "enabled_publish_codecs",
          kind: "message",
          T: eZ,
          repeated: !0,
        },
        { no: 15, name: "fast_publish", kind: "scalar", T: 8 },
      ],
      eS.makeMessageType("livekit.TrackPublishedResponse", () => [
        { no: 1, name: "cid", kind: "scalar", T: 9 },
        { no: 2, name: "track", kind: "message", T: e4 },
      ])),
    nU =
      (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }],
      eS.makeMessageType("livekit.SessionDescription", () => [
        { no: 1, name: "type", kind: "scalar", T: 9 },
        { no: 2, name: "sdp", kind: "scalar", T: 9 },
        { no: 3, name: "id", kind: "scalar", T: 13 },
        {
          no: 4,
          name: "mid_to_track_id",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
      ])),
    nF =
      (() => [
        { no: 1, name: "participants", kind: "message", T: e0, repeated: !0 },
      ],
      eS.makeMessageType("livekit.UpdateSubscription", () => [
        { no: 1, name: "track_sids", kind: "scalar", T: 9, repeated: !0 },
        { no: 2, name: "subscribe", kind: "scalar", T: 8 },
        {
          no: 3,
          name: "participant_tracks",
          kind: "message",
          T: nr,
          repeated: !0,
        },
      ])),
    nj =
      (() => [{ no: 1, name: "updates", kind: "message", T: nj, repeated: !0 }],
      eS.makeMessageType(
        "livekit.UpdateDataSubscription.Update",
        () => [
          { no: 1, name: "track_sid", kind: "scalar", T: 9 },
          { no: 2, name: "subscribe", kind: "scalar", T: 8 },
          { no: 3, name: "options", kind: "message", T: e7 },
        ],
        { localName: "UpdateDataSubscription_Update" },
      )),
    nV =
      (() => [
        { no: 1, name: "track_sids", kind: "scalar", T: 9, repeated: !0 },
        { no: 3, name: "disabled", kind: "scalar", T: 8 },
        { no: 4, name: "quality", kind: "enum", T: eS.getEnumType(eG) },
        { no: 5, name: "width", kind: "scalar", T: 13 },
        { no: 6, name: "height", kind: "scalar", T: 13 },
        { no: 7, name: "fps", kind: "scalar", T: 13 },
        { no: 8, name: "priority", kind: "scalar", T: 13 },
      ],
      eS.makeMessageType("livekit.UpdateLocalAudioTrack", () => [
        { no: 1, name: "track_sid", kind: "scalar", T: 9 },
        {
          no: 2,
          name: "features",
          kind: "enum",
          T: eS.getEnumType(eY),
          repeated: !0,
        },
      ])),
    nH = eS.makeMessageType("livekit.UpdateLocalVideoTrack", () => [
      { no: 1, name: "track_sid", kind: "scalar", T: 9 },
      { no: 2, name: "width", kind: "scalar", T: 13 },
      { no: 3, name: "height", kind: "scalar", T: 13 },
    ]),
    nB =
      (() => [
        { no: 1, name: "can_reconnect", kind: "scalar", T: 8 },
        { no: 2, name: "reason", kind: "enum", T: eS.getEnumType(ez) },
        { no: 3, name: "action", kind: "enum", T: eS.getEnumType(nB) },
        { no: 4, name: "regions", kind: "message", T: nZ },
      ],
      eS.makeEnum("livekit.LeaveRequest.Action", [
        { no: 0, name: "DISCONNECT" },
        { no: 1, name: "RESUME" },
        { no: 2, name: "RECONNECT" },
      ])),
    n$ =
      (() => [
        { no: 1, name: "track_sid", kind: "scalar", T: 9 },
        { no: 2, name: "layers", kind: "message", T: e8, repeated: !0 },
      ],
      eS.makeMessageType("livekit.UpdateParticipantMetadata", () => [
        { no: 1, name: "metadata", kind: "scalar", T: 9 },
        { no: 2, name: "name", kind: "scalar", T: 9 },
        {
          no: 3,
          name: "attributes",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
        { no: 4, name: "request_id", kind: "scalar", T: 13 },
      ])),
    nG = eS.makeMessageType("livekit.ICEServer", () => [
      { no: 1, name: "urls", kind: "scalar", T: 9, repeated: !0 },
      { no: 2, name: "username", kind: "scalar", T: 9 },
      { no: 3, name: "credential", kind: "scalar", T: 9 },
    ]),
    nW =
      (() => [
        { no: 1, name: "speakers", kind: "message", T: nn, repeated: !0 },
      ],
      eS.makeMessageType("livekit.ConnectionQualityInfo", () => [
        { no: 1, name: "participant_sid", kind: "scalar", T: 9 },
        { no: 2, name: "quality", kind: "enum", T: eS.getEnumType(eW) },
        { no: 3, name: "score", kind: "scalar", T: 2 },
      ])),
    nJ =
      (() => [{ no: 1, name: "updates", kind: "message", T: nW, repeated: !0 }],
      eS.makeMessageType("livekit.StreamStateInfo", () => [
        { no: 1, name: "participant_sid", kind: "scalar", T: 9 },
        { no: 2, name: "track_sid", kind: "scalar", T: 9 },
        { no: 3, name: "state", kind: "enum", T: eS.getEnumType(nI) },
      ])),
    nz =
      (() => [
        { no: 1, name: "stream_states", kind: "message", T: nJ, repeated: !0 },
      ],
      eS.makeMessageType("livekit.SubscribedQuality", () => [
        { no: 1, name: "quality", kind: "enum", T: eS.getEnumType(eG) },
        { no: 2, name: "enabled", kind: "scalar", T: 8 },
      ])),
    nq = eS.makeMessageType("livekit.SubscribedCodec", () => [
      { no: 1, name: "codec", kind: "scalar", T: 9 },
      { no: 2, name: "qualities", kind: "message", T: nz, repeated: !0 },
    ]),
    nY =
      (() => [
        { no: 1, name: "track_sid", kind: "scalar", T: 9 },
        {
          no: 2,
          name: "subscribed_qualities",
          kind: "message",
          T: nz,
          repeated: !0,
        },
        {
          no: 3,
          name: "subscribed_codecs",
          kind: "message",
          T: nq,
          repeated: !0,
        },
      ],
      eS.makeMessageType("livekit.TrackPermission", () => [
        { no: 1, name: "participant_sid", kind: "scalar", T: 9 },
        { no: 2, name: "all_tracks", kind: "scalar", T: 8 },
        { no: 3, name: "track_sids", kind: "scalar", T: 9, repeated: !0 },
        { no: 4, name: "participant_identity", kind: "scalar", T: 9 },
      ])),
    nK =
      (() => [
        { no: 1, name: "all_participants", kind: "scalar", T: 8 },
        {
          no: 2,
          name: "track_permissions",
          kind: "message",
          T: nY,
          repeated: !0,
        },
      ],
      eS.makeMessageType("livekit.DataChannelReceiveState", () => [
        { no: 1, name: "publisher_sid", kind: "scalar", T: 9 },
        { no: 2, name: "last_seq", kind: "scalar", T: 13 },
      ])),
    nX = eS.makeMessageType("livekit.DataChannelInfo", () => [
      { no: 1, name: "label", kind: "scalar", T: 9 },
      { no: 2, name: "id", kind: "scalar", T: 13 },
      { no: 3, name: "target", kind: "enum", T: eS.getEnumType(nw) },
    ]),
    nZ =
      (() => [
        {
          no: 1,
          name: "speaker_update",
          kind: "scalar",
          T: 5,
          oneof: "scenario",
        },
        {
          no: 2,
          name: "node_failure",
          kind: "scalar",
          T: 8,
          oneof: "scenario",
        },
        { no: 3, name: "migration", kind: "scalar", T: 8, oneof: "scenario" },
        {
          no: 4,
          name: "server_leave",
          kind: "scalar",
          T: 8,
          oneof: "scenario",
        },
        {
          no: 5,
          name: "switch_candidate_protocol",
          kind: "enum",
          T: eS.getEnumType(nA),
          oneof: "scenario",
        },
        {
          no: 6,
          name: "subscriber_bandwidth",
          kind: "scalar",
          T: 3,
          oneof: "scenario",
        },
        {
          no: 7,
          name: "disconnect_signal_on_resume",
          kind: "scalar",
          T: 8,
          oneof: "scenario",
        },
        {
          no: 8,
          name: "disconnect_signal_on_resume_no_messages",
          kind: "scalar",
          T: 8,
          oneof: "scenario",
        },
        {
          no: 9,
          name: "leave_request_full_reconnect",
          kind: "scalar",
          T: 8,
          oneof: "scenario",
        },
      ],
      eS.makeMessageType("livekit.RegionSettings", () => [
        { no: 1, name: "regions", kind: "message", T: nQ, repeated: !0 },
      ])),
    nQ = eS.makeMessageType("livekit.RegionInfo", () => [
      { no: 1, name: "region", kind: "scalar", T: 9 },
      { no: 2, name: "url", kind: "scalar", T: 9 },
      { no: 3, name: "distance", kind: "scalar", T: 3 },
    ]),
    n0 =
      (() => [
        { no: 1, name: "track_sid", kind: "scalar", T: 9 },
        { no: 2, name: "err", kind: "enum", T: eS.getEnumType(eq) },
      ],
      eS.makeEnum("livekit.RequestResponse.Reason", [
        { no: 0, name: "OK" },
        { no: 1, name: "NOT_FOUND" },
        { no: 2, name: "NOT_ALLOWED" },
        { no: 3, name: "LIMIT_EXCEEDED" },
        { no: 4, name: "QUEUED" },
        { no: 5, name: "UNSUPPORTED_TYPE" },
        { no: 6, name: "UNCLASSIFIED_ERROR" },
        { no: 7, name: "INVALID_HANDLE" },
        { no: 8, name: "INVALID_NAME" },
        { no: 9, name: "DUPLICATE_HANDLE" },
        { no: 10, name: "DUPLICATE_NAME" },
      ])),
    n1 =
      (() => [{ no: 1, name: "track_sid", kind: "scalar", T: 9 }],
      eS.makeEnum("livekit.EncodedFileType", [
        { no: 0, name: "DEFAULT_FILETYPE" },
        { no: 1, name: "MP4" },
        { no: 2, name: "OGG" },
        { no: 3, name: "MP3" },
      ])),
    n5 = eS.makeEnum("livekit.SegmentedFileProtocol", [
      { no: 0, name: "DEFAULT_SEGMENTED_FILE_PROTOCOL" },
      { no: 1, name: "HLS_PROTOCOL" },
    ]),
    n2 = eS.makeEnum("livekit.SegmentedFileSuffix", [
      { no: 0, name: "INDEX" },
      { no: 1, name: "TIMESTAMP" },
    ]),
    n3 = eS.makeEnum("livekit.ImageFileSuffix", [
      { no: 0, name: "IMAGE_SUFFIX_INDEX" },
      { no: 1, name: "IMAGE_SUFFIX_TIMESTAMP" },
      { no: 2, name: "IMAGE_SUFFIX_NONE_OVERWRITE" },
    ]),
    n9 = eS.makeEnum("livekit.StreamProtocol", [
      { no: 0, name: "DEFAULT_PROTOCOL" },
      { no: 1, name: "RTMP" },
      { no: 2, name: "SRT" },
    ]),
    n4 = eS.makeEnum("livekit.AudioMixing", [
      { no: 0, name: "DEFAULT_MIXING" },
      { no: 1, name: "DUAL_CHANNEL_AGENT" },
      { no: 2, name: "DUAL_CHANNEL_ALTERNATE" },
    ]),
    n6 = eS.makeEnum("livekit.EncodingOptionsPreset", [
      { no: 0, name: "H264_720P_30" },
      { no: 1, name: "H264_720P_60" },
      { no: 2, name: "H264_1080P_30" },
      { no: 3, name: "H264_1080P_60" },
      { no: 4, name: "PORTRAIT_H264_720P_30" },
      { no: 5, name: "PORTRAIT_H264_720P_60" },
      { no: 6, name: "PORTRAIT_H264_1080P_30" },
      { no: 7, name: "PORTRAIT_H264_1080P_60" },
    ]),
    n7 = eS.makeEnum("livekit.EgressStatus", [
      { no: 0, name: "EGRESS_STARTING" },
      { no: 1, name: "EGRESS_ACTIVE" },
      { no: 2, name: "EGRESS_ENDING" },
      { no: 3, name: "EGRESS_COMPLETE" },
      { no: 4, name: "EGRESS_FAILED" },
      { no: 5, name: "EGRESS_ABORTED" },
      { no: 6, name: "EGRESS_LIMIT_REACHED" },
    ]),
    n8 = eS.makeEnum("livekit.EgressSourceType", [
      { no: 0, name: "EGRESS_SOURCE_TYPE_WEB", localName: "WEB" },
      { no: 1, name: "EGRESS_SOURCE_TYPE_SDK", localName: "SDK" },
    ]),
    te = eS.makeMessageType("livekit.RoomCompositeEgressRequest", () => [
      { no: 1, name: "room_name", kind: "scalar", T: 9 },
      { no: 2, name: "layout", kind: "scalar", T: 9 },
      { no: 3, name: "audio_only", kind: "scalar", T: 8 },
      { no: 15, name: "audio_mixing", kind: "enum", T: eS.getEnumType(n4) },
      { no: 4, name: "video_only", kind: "scalar", T: 8 },
      { no: 5, name: "custom_base_url", kind: "scalar", T: 9 },
      { no: 6, name: "file", kind: "message", T: ti, oneof: "output" },
      { no: 7, name: "stream", kind: "message", T: tf, oneof: "output" },
      { no: 10, name: "segments", kind: "message", T: to, oneof: "output" },
      {
        no: 8,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(n6),
        oneof: "options",
      },
      { no: 9, name: "advanced", kind: "message", T: th, oneof: "options" },
      { no: 11, name: "file_outputs", kind: "message", T: ti, repeated: !0 },
      { no: 12, name: "stream_outputs", kind: "message", T: tf, repeated: !0 },
      { no: 13, name: "segment_outputs", kind: "message", T: to, repeated: !0 },
      { no: 14, name: "image_outputs", kind: "message", T: tl, repeated: !0 },
      { no: 16, name: "webhooks", kind: "message", T: ng, repeated: !0 },
    ]),
    tn = eS.makeMessageType("livekit.WebEgressRequest", () => [
      { no: 1, name: "url", kind: "scalar", T: 9 },
      { no: 2, name: "audio_only", kind: "scalar", T: 8 },
      { no: 3, name: "video_only", kind: "scalar", T: 8 },
      { no: 12, name: "await_start_signal", kind: "scalar", T: 8 },
      { no: 4, name: "file", kind: "message", T: ti, oneof: "output" },
      { no: 5, name: "stream", kind: "message", T: tf, oneof: "output" },
      { no: 6, name: "segments", kind: "message", T: to, oneof: "output" },
      {
        no: 7,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(n6),
        oneof: "options",
      },
      { no: 8, name: "advanced", kind: "message", T: th, oneof: "options" },
      { no: 9, name: "file_outputs", kind: "message", T: ti, repeated: !0 },
      { no: 10, name: "stream_outputs", kind: "message", T: tf, repeated: !0 },
      { no: 11, name: "segment_outputs", kind: "message", T: to, repeated: !0 },
      { no: 13, name: "image_outputs", kind: "message", T: tl, repeated: !0 },
      { no: 14, name: "webhooks", kind: "message", T: ng, repeated: !0 },
    ]),
    tt = eS.makeMessageType("livekit.ParticipantEgressRequest", () => [
      { no: 1, name: "room_name", kind: "scalar", T: 9 },
      { no: 2, name: "identity", kind: "scalar", T: 9 },
      { no: 3, name: "screen_share", kind: "scalar", T: 8 },
      {
        no: 4,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(n6),
        oneof: "options",
      },
      { no: 5, name: "advanced", kind: "message", T: th, oneof: "options" },
      { no: 6, name: "file_outputs", kind: "message", T: ti, repeated: !0 },
      { no: 7, name: "stream_outputs", kind: "message", T: tf, repeated: !0 },
      { no: 8, name: "segment_outputs", kind: "message", T: to, repeated: !0 },
      { no: 9, name: "image_outputs", kind: "message", T: tl, repeated: !0 },
      { no: 10, name: "webhooks", kind: "message", T: ng, repeated: !0 },
    ]),
    ta = eS.makeMessageType("livekit.TrackCompositeEgressRequest", () => [
      { no: 1, name: "room_name", kind: "scalar", T: 9 },
      { no: 2, name: "audio_track_id", kind: "scalar", T: 9 },
      { no: 3, name: "video_track_id", kind: "scalar", T: 9 },
      { no: 4, name: "file", kind: "message", T: ti, oneof: "output" },
      { no: 5, name: "stream", kind: "message", T: tf, oneof: "output" },
      { no: 8, name: "segments", kind: "message", T: to, oneof: "output" },
      {
        no: 6,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(n6),
        oneof: "options",
      },
      { no: 7, name: "advanced", kind: "message", T: th, oneof: "options" },
      { no: 11, name: "file_outputs", kind: "message", T: ti, repeated: !0 },
      { no: 12, name: "stream_outputs", kind: "message", T: tf, repeated: !0 },
      { no: 13, name: "segment_outputs", kind: "message", T: to, repeated: !0 },
      { no: 14, name: "image_outputs", kind: "message", T: tl, repeated: !0 },
      { no: 15, name: "webhooks", kind: "message", T: ng, repeated: !0 },
    ]),
    tr = eS.makeMessageType("livekit.TrackEgressRequest", () => [
      { no: 1, name: "room_name", kind: "scalar", T: 9 },
      { no: 2, name: "track_id", kind: "scalar", T: 9 },
      { no: 3, name: "file", kind: "message", T: ts, oneof: "output" },
      { no: 4, name: "websocket_url", kind: "scalar", T: 9, oneof: "output" },
      { no: 5, name: "webhooks", kind: "message", T: ng, repeated: !0 },
    ]),
    ti = eS.makeMessageType("livekit.EncodedFileOutput", () => [
      { no: 1, name: "file_type", kind: "enum", T: eS.getEnumType(n1) },
      { no: 2, name: "filepath", kind: "scalar", T: 9 },
      { no: 6, name: "disable_manifest", kind: "scalar", T: 8 },
      { no: 3, name: "s3", kind: "message", T: tc, oneof: "output" },
      { no: 4, name: "gcp", kind: "message", T: tu, oneof: "output" },
      { no: 5, name: "azure", kind: "message", T: td, oneof: "output" },
      { no: 7, name: "aliOSS", kind: "message", T: tm, oneof: "output" },
    ]),
    to = eS.makeMessageType("livekit.SegmentedFileOutput", () => [
      { no: 1, name: "protocol", kind: "enum", T: eS.getEnumType(n5) },
      { no: 2, name: "filename_prefix", kind: "scalar", T: 9 },
      { no: 3, name: "playlist_name", kind: "scalar", T: 9 },
      { no: 11, name: "live_playlist_name", kind: "scalar", T: 9 },
      { no: 4, name: "segment_duration", kind: "scalar", T: 13 },
      { no: 10, name: "filename_suffix", kind: "enum", T: eS.getEnumType(n2) },
      { no: 8, name: "disable_manifest", kind: "scalar", T: 8 },
      { no: 5, name: "s3", kind: "message", T: tc, oneof: "output" },
      { no: 6, name: "gcp", kind: "message", T: tu, oneof: "output" },
      { no: 7, name: "azure", kind: "message", T: td, oneof: "output" },
      { no: 9, name: "aliOSS", kind: "message", T: tm, oneof: "output" },
    ]),
    ts = eS.makeMessageType("livekit.DirectFileOutput", () => [
      { no: 1, name: "filepath", kind: "scalar", T: 9 },
      { no: 5, name: "disable_manifest", kind: "scalar", T: 8 },
      { no: 2, name: "s3", kind: "message", T: tc, oneof: "output" },
      { no: 3, name: "gcp", kind: "message", T: tu, oneof: "output" },
      { no: 4, name: "azure", kind: "message", T: td, oneof: "output" },
      { no: 6, name: "aliOSS", kind: "message", T: tm, oneof: "output" },
    ]),
    tl = eS.makeMessageType("livekit.ImageOutput", () => [
      { no: 1, name: "capture_interval", kind: "scalar", T: 13 },
      { no: 2, name: "width", kind: "scalar", T: 5 },
      { no: 3, name: "height", kind: "scalar", T: 5 },
      { no: 4, name: "filename_prefix", kind: "scalar", T: 9 },
      { no: 5, name: "filename_suffix", kind: "enum", T: eS.getEnumType(n3) },
      { no: 6, name: "image_codec", kind: "enum", T: eS.getEnumType(eV) },
      { no: 7, name: "disable_manifest", kind: "scalar", T: 8 },
      { no: 8, name: "s3", kind: "message", T: tc, oneof: "output" },
      { no: 9, name: "gcp", kind: "message", T: tu, oneof: "output" },
      { no: 10, name: "azure", kind: "message", T: td, oneof: "output" },
      { no: 11, name: "aliOSS", kind: "message", T: tm, oneof: "output" },
    ]),
    tc = eS.makeMessageType("livekit.S3Upload", () => [
      { no: 1, name: "access_key", kind: "scalar", T: 9 },
      { no: 2, name: "secret", kind: "scalar", T: 9 },
      { no: 11, name: "session_token", kind: "scalar", T: 9 },
      { no: 12, name: "assume_role_arn", kind: "scalar", T: 9 },
      { no: 13, name: "assume_role_external_id", kind: "scalar", T: 9 },
      { no: 3, name: "region", kind: "scalar", T: 9 },
      { no: 4, name: "endpoint", kind: "scalar", T: 9 },
      { no: 5, name: "bucket", kind: "scalar", T: 9 },
      { no: 6, name: "force_path_style", kind: "scalar", T: 8 },
      {
        no: 7,
        name: "metadata",
        kind: "map",
        K: 9,
        V: { kind: "scalar", T: 9 },
      },
      { no: 8, name: "tagging", kind: "scalar", T: 9 },
      { no: 9, name: "content_disposition", kind: "scalar", T: 9 },
      { no: 10, name: "proxy", kind: "message", T: tp },
    ]),
    tu = eS.makeMessageType("livekit.GCPUpload", () => [
      { no: 1, name: "credentials", kind: "scalar", T: 9 },
      { no: 2, name: "bucket", kind: "scalar", T: 9 },
      { no: 3, name: "proxy", kind: "message", T: tp },
    ]),
    td = eS.makeMessageType("livekit.AzureBlobUpload", () => [
      { no: 1, name: "account_name", kind: "scalar", T: 9 },
      { no: 2, name: "account_key", kind: "scalar", T: 9 },
      { no: 3, name: "container_name", kind: "scalar", T: 9 },
    ]),
    tm = eS.makeMessageType("livekit.AliOSSUpload", () => [
      { no: 1, name: "access_key", kind: "scalar", T: 9 },
      { no: 2, name: "secret", kind: "scalar", T: 9 },
      { no: 3, name: "region", kind: "scalar", T: 9 },
      { no: 4, name: "endpoint", kind: "scalar", T: 9 },
      { no: 5, name: "bucket", kind: "scalar", T: 9 },
    ]),
    tp = eS.makeMessageType("livekit.ProxyConfig", () => [
      { no: 1, name: "url", kind: "scalar", T: 9 },
      { no: 2, name: "username", kind: "scalar", T: 9 },
      { no: 3, name: "password", kind: "scalar", T: 9 },
    ]),
    tf = eS.makeMessageType("livekit.StreamOutput", () => [
      { no: 1, name: "protocol", kind: "enum", T: eS.getEnumType(n9) },
      { no: 2, name: "urls", kind: "scalar", T: 9, repeated: !0 },
    ]),
    th = eS.makeMessageType("livekit.EncodingOptions", () => [
      { no: 1, name: "width", kind: "scalar", T: 5 },
      { no: 2, name: "height", kind: "scalar", T: 5 },
      { no: 3, name: "depth", kind: "scalar", T: 5 },
      { no: 4, name: "framerate", kind: "scalar", T: 5 },
      { no: 5, name: "audio_codec", kind: "enum", T: eS.getEnumType(eF) },
      { no: 6, name: "audio_bitrate", kind: "scalar", T: 5 },
      { no: 11, name: "audio_quality", kind: "scalar", T: 5 },
      { no: 7, name: "audio_frequency", kind: "scalar", T: 5 },
      { no: 8, name: "video_codec", kind: "enum", T: eS.getEnumType(ej) },
      { no: 9, name: "video_bitrate", kind: "scalar", T: 5 },
      { no: 12, name: "video_quality", kind: "scalar", T: 5 },
      { no: 10, name: "key_frame_interval", kind: "scalar", T: 1 },
    ]),
    tg =
      (() => [
        { no: 1, name: "egress_id", kind: "scalar", T: 9 },
        { no: 2, name: "room_id", kind: "scalar", T: 9 },
        { no: 13, name: "room_name", kind: "scalar", T: 9 },
        { no: 26, name: "source_type", kind: "enum", T: eS.getEnumType(n8) },
        { no: 3, name: "status", kind: "enum", T: eS.getEnumType(n7) },
        { no: 10, name: "started_at", kind: "scalar", T: 3 },
        { no: 11, name: "ended_at", kind: "scalar", T: 3 },
        { no: 18, name: "updated_at", kind: "scalar", T: 3 },
        { no: 21, name: "details", kind: "scalar", T: 9 },
        { no: 9, name: "error", kind: "scalar", T: 9 },
        { no: 22, name: "error_code", kind: "scalar", T: 5 },
        {
          no: 4,
          name: "room_composite",
          kind: "message",
          T: te,
          oneof: "request",
        },
        { no: 14, name: "web", kind: "message", T: tn, oneof: "request" },
        {
          no: 19,
          name: "participant",
          kind: "message",
          T: tt,
          oneof: "request",
        },
        {
          no: 5,
          name: "track_composite",
          kind: "message",
          T: ta,
          oneof: "request",
        },
        { no: 6, name: "track", kind: "message", T: tr, oneof: "request" },
        { no: 7, name: "stream", kind: "message", T: tg, oneof: "result" },
        { no: 8, name: "file", kind: "message", T: tv, oneof: "result" },
        { no: 12, name: "segments", kind: "message", T: ty, oneof: "result" },
        {
          no: 15,
          name: "stream_results",
          kind: "message",
          T: tk,
          repeated: !0,
        },
        { no: 16, name: "file_results", kind: "message", T: tv, repeated: !0 },
        {
          no: 17,
          name: "segment_results",
          kind: "message",
          T: ty,
          repeated: !0,
        },
        { no: 20, name: "image_results", kind: "message", T: tb, repeated: !0 },
        { no: 23, name: "manifest_location", kind: "scalar", T: 9 },
        { no: 25, name: "backup_storage_used", kind: "scalar", T: 8 },
      ],
      eS.makeMessageType("livekit.StreamInfoList", () => [
        { no: 1, name: "info", kind: "message", T: tk, repeated: !0 },
      ])),
    tk = eS.makeMessageType("livekit.StreamInfo", () => [
      { no: 1, name: "url", kind: "scalar", T: 9 },
      { no: 2, name: "started_at", kind: "scalar", T: 3 },
      { no: 3, name: "ended_at", kind: "scalar", T: 3 },
      { no: 4, name: "duration", kind: "scalar", T: 3 },
      { no: 5, name: "status", kind: "enum", T: eS.getEnumType(tT) },
      { no: 6, name: "error", kind: "scalar", T: 9 },
      { no: 7, name: "last_retry_at", kind: "scalar", T: 3 },
      { no: 8, name: "retries", kind: "scalar", T: 13 },
    ]),
    tT = eS.makeEnum("livekit.StreamInfo.Status", [
      { no: 0, name: "ACTIVE" },
      { no: 1, name: "FINISHED" },
      { no: 2, name: "FAILED" },
    ]),
    tv = eS.makeMessageType("livekit.FileInfo", () => [
      { no: 1, name: "filename", kind: "scalar", T: 9 },
      { no: 2, name: "started_at", kind: "scalar", T: 3 },
      { no: 3, name: "ended_at", kind: "scalar", T: 3 },
      { no: 6, name: "duration", kind: "scalar", T: 3 },
      { no: 4, name: "size", kind: "scalar", T: 3 },
      { no: 5, name: "location", kind: "scalar", T: 9 },
    ]),
    ty = eS.makeMessageType("livekit.SegmentsInfo", () => [
      { no: 1, name: "playlist_name", kind: "scalar", T: 9 },
      { no: 8, name: "live_playlist_name", kind: "scalar", T: 9 },
      { no: 2, name: "duration", kind: "scalar", T: 3 },
      { no: 3, name: "size", kind: "scalar", T: 3 },
      { no: 4, name: "playlist_location", kind: "scalar", T: 9 },
      { no: 9, name: "live_playlist_location", kind: "scalar", T: 9 },
      { no: 5, name: "segment_count", kind: "scalar", T: 3 },
      { no: 6, name: "started_at", kind: "scalar", T: 3 },
      { no: 7, name: "ended_at", kind: "scalar", T: 3 },
    ]),
    tb = eS.makeMessageType("livekit.ImagesInfo", () => [
      { no: 4, name: "filename_prefix", kind: "scalar", T: 9 },
      { no: 1, name: "image_count", kind: "scalar", T: 3 },
      { no: 2, name: "started_at", kind: "scalar", T: 3 },
      { no: 3, name: "ended_at", kind: "scalar", T: 3 },
    ]),
    tE = eS.makeMessageType("livekit.AutoParticipantEgress", () => [
      {
        no: 1,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(n6),
        oneof: "options",
      },
      { no: 2, name: "advanced", kind: "message", T: th, oneof: "options" },
      { no: 3, name: "file_outputs", kind: "message", T: ti, repeated: !0 },
      { no: 4, name: "segment_outputs", kind: "message", T: to, repeated: !0 },
    ]),
    t_ = eS.makeMessageType("livekit.AutoTrackEgress", () => [
      { no: 1, name: "filepath", kind: "scalar", T: 9 },
      { no: 5, name: "disable_manifest", kind: "scalar", T: 8 },
      { no: 2, name: "s3", kind: "message", T: tc, oneof: "output" },
      { no: 3, name: "gcp", kind: "message", T: tu, oneof: "output" },
      { no: 4, name: "azure", kind: "message", T: td, oneof: "output" },
      { no: 6, name: "aliOSS", kind: "message", T: tm, oneof: "output" },
    ]),
    tS = eS.makeEnum("livekit.IngressInput", [
      { no: 0, name: "RTMP_INPUT" },
      { no: 1, name: "WHIP_INPUT" },
      { no: 2, name: "URL_INPUT" },
    ]),
    tw = eS.makeEnum("livekit.IngressAudioEncodingPreset", [
      { no: 0, name: "OPUS_STEREO_96KBPS" },
      { no: 1, name: "OPUS_MONO_64KBS" },
    ]),
    tI = eS.makeEnum("livekit.IngressVideoEncodingPreset", [
      { no: 0, name: "H264_720P_30FPS_3_LAYERS" },
      { no: 1, name: "H264_1080P_30FPS_3_LAYERS" },
      { no: 2, name: "H264_540P_25FPS_2_LAYERS" },
      { no: 3, name: "H264_720P_30FPS_1_LAYER" },
      { no: 4, name: "H264_1080P_30FPS_1_LAYER" },
      { no: 5, name: "H264_720P_30FPS_3_LAYERS_HIGH_MOTION" },
      { no: 6, name: "H264_1080P_30FPS_3_LAYERS_HIGH_MOTION" },
      { no: 7, name: "H264_540P_25FPS_2_LAYERS_HIGH_MOTION" },
      { no: 8, name: "H264_720P_30FPS_1_LAYER_HIGH_MOTION" },
      { no: 9, name: "H264_1080P_30FPS_1_LAYER_HIGH_MOTION" },
    ]),
    tA = eS.makeMessageType("livekit.IngressAudioOptions", () => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "source", kind: "enum", T: eS.getEnumType(e$) },
      {
        no: 3,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(tw),
        oneof: "encoding_options",
      },
      {
        no: 4,
        name: "options",
        kind: "message",
        T: tR,
        oneof: "encoding_options",
      },
    ]),
    tN = eS.makeMessageType("livekit.IngressVideoOptions", () => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "source", kind: "enum", T: eS.getEnumType(e$) },
      {
        no: 3,
        name: "preset",
        kind: "enum",
        T: eS.getEnumType(tI),
        oneof: "encoding_options",
      },
      {
        no: 4,
        name: "options",
        kind: "message",
        T: tP,
        oneof: "encoding_options",
      },
    ]),
    tR = eS.makeMessageType("livekit.IngressAudioEncodingOptions", () => [
      { no: 1, name: "audio_codec", kind: "enum", T: eS.getEnumType(eF) },
      { no: 2, name: "bitrate", kind: "scalar", T: 13 },
      { no: 3, name: "disable_dtx", kind: "scalar", T: 8 },
      { no: 4, name: "channels", kind: "scalar", T: 13 },
    ]),
    tP = eS.makeMessageType("livekit.IngressVideoEncodingOptions", () => [
      { no: 1, name: "video_codec", kind: "enum", T: eS.getEnumType(ej) },
      { no: 2, name: "frame_rate", kind: "scalar", T: 1 },
      { no: 3, name: "layers", kind: "message", T: e8, repeated: !0 },
    ]),
    tO =
      (() => [
        { no: 1, name: "ingress_id", kind: "scalar", T: 9 },
        { no: 2, name: "name", kind: "scalar", T: 9 },
        { no: 3, name: "stream_key", kind: "scalar", T: 9 },
        { no: 4, name: "url", kind: "scalar", T: 9 },
        { no: 5, name: "input_type", kind: "enum", T: eS.getEnumType(tS) },
        { no: 13, name: "bypass_transcoding", kind: "scalar", T: 8 },
        { no: 15, name: "enable_transcoding", kind: "scalar", T: 8, opt: !0 },
        { no: 6, name: "audio", kind: "message", T: tA },
        { no: 7, name: "video", kind: "message", T: tN },
        { no: 8, name: "room_name", kind: "scalar", T: 9 },
        { no: 9, name: "participant_identity", kind: "scalar", T: 9 },
        { no: 10, name: "participant_name", kind: "scalar", T: 9 },
        { no: 14, name: "participant_metadata", kind: "scalar", T: 9 },
        { no: 11, name: "reusable", kind: "scalar", T: 8 },
        { no: 12, name: "state", kind: "message", T: tO },
        { no: 16, name: "enabled", kind: "scalar", T: 8, opt: !0 },
      ],
      eS.makeMessageType("livekit.IngressState", () => [
        { no: 1, name: "status", kind: "enum", T: eS.getEnumType(tx) },
        { no: 2, name: "error", kind: "scalar", T: 9 },
        { no: 3, name: "video", kind: "message", T: tC },
        { no: 4, name: "audio", kind: "message", T: tM },
        { no: 5, name: "room_id", kind: "scalar", T: 9 },
        { no: 7, name: "started_at", kind: "scalar", T: 3 },
        { no: 8, name: "ended_at", kind: "scalar", T: 3 },
        { no: 10, name: "updated_at", kind: "scalar", T: 3 },
        { no: 9, name: "resource_id", kind: "scalar", T: 9 },
        { no: 6, name: "tracks", kind: "message", T: e4, repeated: !0 },
      ])),
    tx = eS.makeEnum("livekit.IngressState.Status", [
      { no: 0, name: "ENDPOINT_INACTIVE" },
      { no: 1, name: "ENDPOINT_BUFFERING" },
      { no: 2, name: "ENDPOINT_PUBLISHING" },
      { no: 3, name: "ENDPOINT_ERROR" },
      { no: 4, name: "ENDPOINT_COMPLETE" },
    ]),
    tC = eS.makeMessageType("livekit.InputVideoState", () => [
      { no: 1, name: "mime_type", kind: "scalar", T: 9 },
      { no: 2, name: "average_bitrate", kind: "scalar", T: 13 },
      { no: 3, name: "width", kind: "scalar", T: 13 },
      { no: 4, name: "height", kind: "scalar", T: 13 },
      { no: 5, name: "framerate", kind: "scalar", T: 1 },
    ]),
    tM = eS.makeMessageType("livekit.InputAudioState", () => [
      { no: 1, name: "mime_type", kind: "scalar", T: 9 },
      { no: 2, name: "average_bitrate", kind: "scalar", T: 13 },
      { no: 3, name: "channels", kind: "scalar", T: 13 },
      { no: 4, name: "sample_rate", kind: "scalar", T: 13 },
    ]),
    tD = eS.makeMessageType("livekit.RoomEgress", () => [
      { no: 1, name: "room", kind: "message", T: te },
      { no: 3, name: "participant", kind: "message", T: tE },
      { no: 2, name: "tracks", kind: "message", T: t_ },
    ]),
    tL = eS.makeMessageType("livekit.RoomConfiguration", () => [
      { no: 1, name: "name", kind: "scalar", T: 9 },
      { no: 2, name: "empty_timeout", kind: "scalar", T: 13 },
      { no: 3, name: "departure_timeout", kind: "scalar", T: 13 },
      { no: 4, name: "max_participants", kind: "scalar", T: 13 },
      { no: 11, name: "metadata", kind: "scalar", T: 9 },
      { no: 5, name: "egress", kind: "message", T: tD },
      { no: 7, name: "min_playout_delay", kind: "scalar", T: 13 },
      { no: 8, name: "max_playout_delay", kind: "scalar", T: 13 },
      { no: 9, name: "sync_streams", kind: "scalar", T: 8 },
      { no: 10, name: "agents", kind: "message", T: n_, repeated: !0 },
    ]),
    tU = eS.makeEnum("livekit.SIPStatusCode", [
      { no: 0, name: "SIP_STATUS_UNKNOWN" },
      { no: 100, name: "SIP_STATUS_TRYING" },
      { no: 180, name: "SIP_STATUS_RINGING" },
      { no: 181, name: "SIP_STATUS_CALL_IS_FORWARDED" },
      { no: 182, name: "SIP_STATUS_QUEUED" },
      { no: 183, name: "SIP_STATUS_SESSION_PROGRESS" },
      { no: 199, name: "SIP_STATUS_EARLY_DIALOG_TERMINATED" },
      { no: 200, name: "SIP_STATUS_OK" },
      { no: 202, name: "SIP_STATUS_ACCEPTED" },
      { no: 204, name: "SIP_STATUS_NO_NOTIFICATION" },
      { no: 300, name: "SIP_STATUS_MULTIPLE_CHOICES" },
      { no: 301, name: "SIP_STATUS_MOVED_PERMANENTLY" },
      { no: 302, name: "SIP_STATUS_MOVED_TEMPORARILY" },
      { no: 305, name: "SIP_STATUS_USE_PROXY" },
      { no: 380, name: "SIP_STATUS_ALTERNATIVE_SERVICE" },
      { no: 400, name: "SIP_STATUS_BAD_REQUEST" },
      { no: 401, name: "SIP_STATUS_UNAUTHORIZED" },
      { no: 402, name: "SIP_STATUS_PAYMENT_REQUIRED" },
      { no: 403, name: "SIP_STATUS_FORBIDDEN" },
      { no: 404, name: "SIP_STATUS_NOTFOUND" },
      { no: 405, name: "SIP_STATUS_METHOD_NOT_ALLOWED" },
      { no: 406, name: "SIP_STATUS_NOT_ACCEPTABLE" },
      { no: 407, name: "SIP_STATUS_PROXY_AUTH_REQUIRED" },
      { no: 408, name: "SIP_STATUS_REQUEST_TIMEOUT" },
      { no: 409, name: "SIP_STATUS_CONFLICT" },
      { no: 410, name: "SIP_STATUS_GONE" },
      { no: 411, name: "SIP_STATUS_LENGTH_REQUIRED" },
      { no: 412, name: "SIP_STATUS_CONDITIONAL_REQUEST_FAILED" },
      { no: 413, name: "SIP_STATUS_REQUEST_ENTITY_TOO_LARGE" },
      { no: 414, name: "SIP_STATUS_REQUEST_URI_TOO_LONG" },
      { no: 415, name: "SIP_STATUS_UNSUPPORTED_MEDIA_TYPE" },
      { no: 416, name: "SIP_STATUS_REQUESTED_RANGE_NOT_SATISFIABLE" },
      { no: 417, name: "SIP_STATUS_UNKNOWN_RESOURCE_PRIORITY" },
      { no: 420, name: "SIP_STATUS_BAD_EXTENSION" },
      { no: 421, name: "SIP_STATUS_EXTENSION_REQUIRED" },
      { no: 422, name: "SIP_STATUS_SESSION_INTERVAL_TOO_SMALL" },
      { no: 423, name: "SIP_STATUS_INTERVAL_TOO_BRIEF" },
      { no: 424, name: "SIP_STATUS_BAD_LOCATION_INFORMATION" },
      { no: 425, name: "SIP_STATUS_BAD_ALERT_MESSAGE" },
      { no: 428, name: "SIP_STATUS_USE_IDENTITY_HEADER" },
      { no: 429, name: "SIP_STATUS_PROVIDE_REFERRER_IDENTITY" },
      { no: 430, name: "SIP_STATUS_FLOW_FAILED" },
      { no: 433, name: "SIP_STATUS_ANONYMITY_DISALLOWED" },
      { no: 436, name: "SIP_STATUS_BAD_IDENTITY_INFO" },
      { no: 437, name: "SIP_STATUS_UNSUPPORTED_CERTIFICATE" },
      { no: 438, name: "SIP_STATUS_INVALID_IDENTITY_HEADER" },
      { no: 439, name: "SIP_STATUS_FIRST_HOP_LACKS_OUTBOUND_SUPPORT" },
      { no: 440, name: "SIP_STATUS_MAX_BREADTH_EXCEEDED" },
      { no: 469, name: "SIP_STATUS_BAD_INFO_PACKAGE" },
      { no: 470, name: "SIP_STATUS_CONSENT_NEEDED" },
      { no: 480, name: "SIP_STATUS_TEMPORARILY_UNAVAILABLE" },
      { no: 481, name: "SIP_STATUS_CALL_TRANSACTION_DOES_NOT_EXISTS" },
      { no: 482, name: "SIP_STATUS_LOOP_DETECTED" },
      { no: 483, name: "SIP_STATUS_TOO_MANY_HOPS" },
      { no: 484, name: "SIP_STATUS_ADDRESS_INCOMPLETE" },
      { no: 485, name: "SIP_STATUS_AMBIGUOUS" },
      { no: 486, name: "SIP_STATUS_BUSY_HERE" },
      { no: 487, name: "SIP_STATUS_REQUEST_TERMINATED" },
      { no: 488, name: "SIP_STATUS_NOT_ACCEPTABLE_HERE" },
      { no: 489, name: "SIP_STATUS_BAD_EVENT" },
      { no: 491, name: "SIP_STATUS_REQUEST_PENDING" },
      { no: 493, name: "SIP_STATUS_UNDECIPHERABLE" },
      { no: 494, name: "SIP_STATUS_SECURITY_AGREEMENT_REQUIRED" },
      { no: 500, name: "SIP_STATUS_INTERNAL_SERVER_ERROR" },
      { no: 501, name: "SIP_STATUS_NOT_IMPLEMENTED" },
      { no: 502, name: "SIP_STATUS_BAD_GATEWAY" },
      { no: 503, name: "SIP_STATUS_SERVICE_UNAVAILABLE" },
      { no: 504, name: "SIP_STATUS_GATEWAY_TIMEOUT" },
      { no: 505, name: "SIP_STATUS_VERSION_NOT_SUPPORTED" },
      { no: 513, name: "SIP_STATUS_MESSAGE_TOO_LARGE" },
      { no: 600, name: "SIP_STATUS_GLOBAL_BUSY_EVERYWHERE" },
      { no: 603, name: "SIP_STATUS_GLOBAL_DECLINE" },
      { no: 604, name: "SIP_STATUS_GLOBAL_DOES_NOT_EXIST_ANYWHERE" },
      { no: 606, name: "SIP_STATUS_GLOBAL_NOT_ACCEPTABLE" },
      { no: 607, name: "SIP_STATUS_GLOBAL_UNWANTED" },
      { no: 608, name: "SIP_STATUS_GLOBAL_REJECTED" },
    ]),
    tF = eS.makeEnum("livekit.SIPTransport", [
      { no: 0, name: "SIP_TRANSPORT_AUTO" },
      { no: 1, name: "SIP_TRANSPORT_UDP" },
      { no: 2, name: "SIP_TRANSPORT_TCP" },
      { no: 3, name: "SIP_TRANSPORT_TLS" },
    ]),
    tj = eS.makeEnum("livekit.SIPHeaderOptions", [
      { no: 0, name: "SIP_NO_HEADERS" },
      { no: 1, name: "SIP_X_HEADERS" },
      { no: 2, name: "SIP_ALL_HEADERS" },
    ]),
    tV = eS.makeEnum("livekit.SIPMediaEncryption", [
      { no: 0, name: "SIP_MEDIA_ENCRYPT_DISABLE" },
      { no: 1, name: "SIP_MEDIA_ENCRYPT_ALLOW" },
      { no: 2, name: "SIP_MEDIA_ENCRYPT_REQUIRE" },
    ]),
    tH = eS.makeEnum("livekit.ProviderType", [
      { no: 0, name: "PROVIDER_TYPE_UNKNOWN", localName: "UNKNOWN" },
      { no: 1, name: "PROVIDER_TYPE_INTERNAL", localName: "INTERNAL" },
      { no: 2, name: "PROVIDER_TYPE_EXTERNAL", localName: "EXTERNAL" },
    ]),
    tB =
      (() => [
        { no: 1, name: "code", kind: "enum", T: eS.getEnumType(tU) },
        { no: 2, name: "status", kind: "scalar", T: 9 },
      ],
      eS.makeEnum("livekit.SIPTrunkInfo.TrunkKind", [
        { no: 0, name: "TRUNK_LEGACY" },
        { no: 1, name: "TRUNK_INBOUND" },
        { no: 2, name: "TRUNK_OUTBOUND" },
      ])),
    t$ =
      (() => [
        { no: 1, name: "sip_trunk_id", kind: "scalar", T: 9 },
        { no: 2, name: "name", kind: "scalar", T: 9 },
        { no: 3, name: "metadata", kind: "scalar", T: 9 },
        { no: 4, name: "numbers", kind: "scalar", T: 9, repeated: !0 },
        {
          no: 5,
          name: "allowed_addresses",
          kind: "scalar",
          T: 9,
          repeated: !0,
        },
        { no: 6, name: "allowed_numbers", kind: "scalar", T: 9, repeated: !0 },
        { no: 7, name: "auth_username", kind: "scalar", T: 9 },
        { no: 8, name: "auth_password", kind: "scalar", T: 9 },
        {
          no: 9,
          name: "headers",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
        {
          no: 10,
          name: "headers_to_attributes",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
        {
          no: 14,
          name: "attributes_to_headers",
          kind: "map",
          K: 9,
          V: { kind: "scalar", T: 9 },
        },
        {
          no: 15,
          name: "include_headers",
          kind: "enum",
          T: eS.getEnumType(tj),
        },
        { no: 11, name: "ringing_timeout", kind: "message", T: eI },
        { no: 12, name: "max_call_duration", kind: "message", T: eI },
        { no: 13, name: "krisp_enabled", kind: "scalar", T: 8 },
        {
          no: 16,
          name: "media_encryption",
          kind: "enum",
          T: eS.getEnumType(tV),
        },
      ],
      eS.makeMessageType("livekit.SIPDispatchRuleDirect", () => [
        { no: 1, name: "room_name", kind: "scalar", T: 9 },
        { no: 2, name: "pin", kind: "scalar", T: 9 },
      ])),
    tG = eS.makeMessageType("livekit.SIPDispatchRuleIndividual", () => [
      { no: 1, name: "room_prefix", kind: "scalar", T: 9 },
      { no: 2, name: "pin", kind: "scalar", T: 9 },
    ]),
    tW = eS.makeMessageType("livekit.SIPDispatchRuleCallee", () => [
      { no: 1, name: "room_prefix", kind: "scalar", T: 9 },
      { no: 2, name: "pin", kind: "scalar", T: 9 },
      { no: 3, name: "randomize", kind: "scalar", T: 8 },
    ]),
    tJ = eS.makeMessageType("livekit.SIPDispatchRule", () => [
      {
        no: 1,
        name: "dispatch_rule_direct",
        kind: "message",
        T: t$,
        oneof: "rule",
      },
      {
        no: 2,
        name: "dispatch_rule_individual",
        kind: "message",
        T: tG,
        oneof: "rule",
      },
      {
        no: 3,
        name: "dispatch_rule_callee",
        kind: "message",
        T: tW,
        oneof: "rule",
      },
    ]);
  (() => [
    { no: 1, name: "sip_dispatch_rule_id", kind: "scalar", T: 9 },
    { no: 2, name: "rule", kind: "message", T: tJ },
    { no: 3, name: "trunk_ids", kind: "scalar", T: 9, repeated: !0 },
    { no: 4, name: "hide_phone_number", kind: "scalar", T: 8 },
    { no: 7, name: "inbound_numbers", kind: "scalar", T: 9, repeated: !0 },
    { no: 5, name: "name", kind: "scalar", T: 9 },
    { no: 6, name: "metadata", kind: "scalar", T: 9 },
    {
      no: 8,
      name: "attributes",
      kind: "map",
      K: 9,
      V: { kind: "scalar", T: 9 },
    },
    { no: 9, name: "room_preset", kind: "scalar", T: 9 },
    { no: 10, name: "room_config", kind: "message", T: tL },
    { no: 11, name: "krisp_enabled", kind: "scalar", T: 8 },
    { no: 12, name: "media_encryption", kind: "enum", T: eS.getEnumType(tV) },
  ],
    e.s(["w", 0, e5, "l", 0, e$], 852687));
};
