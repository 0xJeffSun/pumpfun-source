// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t, n;
  var o,
    a = e.i(753887),
    r = e.i(971370),
    i = e.i(424509),
    u = e.i(575281),
    s = e.i(959719),
    c = e.i(353110),
    l = e.i(824425),
    m = e.i(619290),
    p = e.i(47446),
    d = e.i(574941),
    f = Object.create,
    _ = Object.defineProperty,
    y = Object.getOwnPropertyDescriptor,
    h = Object.getOwnPropertyNames,
    b = Object.getPrototypeOf,
    g = Object.prototype.hasOwnProperty,
    k = (e, t) =>
      function () {
        return (
          t || (0, e[h(e)[0]])((t = { exports: {} }).exports, t),
          t.exports
        );
      },
    v = k({
      "node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(e) {
        ((e.byteLength = function (e) {
          var t = u(e),
            n = t[0],
            o = t[1];
          return ((n + o) * 3) / 4 - o;
        }),
          (e.toByteArray = function (e) {
            var t,
              n,
              o = u(e),
              i = o[0],
              s = o[1],
              c = new r(((i + s) * 3) / 4 - s),
              l = 0,
              m = s > 0 ? i - 4 : i;
            for (n = 0; n < m; n += 4)
              ((t =
                (a[e.charCodeAt(n)] << 18) |
                (a[e.charCodeAt(n + 1)] << 12) |
                (a[e.charCodeAt(n + 2)] << 6) |
                a[e.charCodeAt(n + 3)]),
                (c[l++] = (t >> 16) & 255),
                (c[l++] = (t >> 8) & 255),
                (c[l++] = 255 & t));
            return (
              2 === s &&
                ((t =
                  (a[e.charCodeAt(n)] << 2) | (a[e.charCodeAt(n + 1)] >> 4)),
                (c[l++] = 255 & t)),
              1 === s &&
                ((t =
                  (a[e.charCodeAt(n)] << 10) |
                  (a[e.charCodeAt(n + 1)] << 4) |
                  (a[e.charCodeAt(n + 2)] >> 2)),
                (c[l++] = (t >> 8) & 255),
                (c[l++] = 255 & t)),
              c
            );
          }),
          (e.fromByteArray = function (e) {
            for (
              var t, n = e.length, a = n % 3, r = [], i = 0, u = n - a;
              i < u;
              i += 16383
            )
              r.push(
                (function (e, t, n) {
                  for (var a, r = [], i = t; i < n; i += 3)
                    ((a =
                      ((e[i] << 16) & 0xff0000) +
                      ((e[i + 1] << 8) & 65280) +
                      (255 & e[i + 2])),
                      r.push(
                        o[(a >> 18) & 63] +
                          o[(a >> 12) & 63] +
                          o[(a >> 6) & 63] +
                          o[63 & a],
                      ));
                  return r.join("");
                })(e, i, i + 16383 > u ? u : i + 16383),
              );
            return (
              1 === a
                ? r.push(o[(t = e[n - 1]) >> 2] + o[(t << 4) & 63] + "==")
                : 2 === a &&
                  r.push(
                    o[(t = (e[n - 2] << 8) + e[n - 1]) >> 10] +
                      o[(t >> 4) & 63] +
                      o[(t << 2) & 63] +
                      "=",
                  ),
              r.join("")
            );
          }));
        var t,
          n,
          o = [],
          a = [],
          r = "u" > typeof Uint8Array ? Uint8Array : Array,
          i =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (t = 0, n = i.length; t < n; ++t)
          ((o[t] = i[t]), (a[i.charCodeAt(t)] = t));
        function u(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw Error("Invalid string. Length must be a multiple of 4");
          var n = e.indexOf("=");
          -1 === n && (n = t);
          var o = n === t ? 0 : 4 - (n % 4);
          return [n, o];
        }
        ((a[45] = 62), (a[95] = 63));
      },
    }),
    w = k({
      "node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js"(e) {
        ((e.read = function (e, t, n, o, a) {
          var r,
            i,
            u = 8 * a - o - 1,
            s = (1 << u) - 1,
            c = s >> 1,
            l = -7,
            m = n ? a - 1 : 0,
            p = n ? -1 : 1,
            d = e[t + m];
          for (
            m += p, r = d & ((1 << -l) - 1), d >>= -l, l += u;
            l > 0;
            r = 256 * r + e[t + m], m += p, l -= 8
          );
          for (
            i = r & ((1 << -l) - 1), r >>= -l, l += o;
            l > 0;
            i = 256 * i + e[t + m], m += p, l -= 8
          );
          if (0 === r) r = 1 - c;
          else {
            if (r === s) return i ? 0 / 0 : (d ? -1 : 1) * 2e308;
            ((i += Math.pow(2, o)), (r -= c));
          }
          return (d ? -1 : 1) * i * Math.pow(2, r - o);
        }),
          (e.write = function (e, t, n, o, a, r) {
            var i,
              u,
              s,
              c = 8 * r - a - 1,
              l = (1 << c) - 1,
              m = l >> 1,
              p = 5960464477539062e-23 * (23 === a),
              d = o ? 0 : r - 1,
              f = o ? 1 : -1,
              _ = +(t < 0 || (0 === t && 1 / t < 0));
            for (
              isNaN((t = Math.abs(t))) || 1 / 0 === t
                ? ((u = +!!isNaN(t)), (i = l))
                : ((i = Math.floor(Math.log(t) / Math.LN2)),
                  t * (s = Math.pow(2, -i)) < 1 && (i--, (s *= 2)),
                  i + m >= 1 ? (t += p / s) : (t += p * Math.pow(2, 1 - m)),
                  t * s >= 2 && (i++, (s /= 2)),
                  i + m >= l
                    ? ((u = 0), (i = l))
                    : i + m >= 1
                      ? ((u = (t * s - 1) * Math.pow(2, a)), (i += m))
                      : ((u = t * Math.pow(2, m - 1) * Math.pow(2, a)),
                        (i = 0)));
              a >= 8;
              e[n + d] = 255 & u, d += f, u /= 256, a -= 8
            );
            for (
              i = (i << a) | u, c += a;
              c > 0;
              e[n + d] = 255 & i, d += f, i /= 256, c -= 8
            );
            e[n + d - f] |= 128 * _;
          }));
      },
    }),
    A =
      ((n =
        null !=
        (t = k({
          "node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js"(e) {
            var t = v(),
              n = w(),
              o =
                "function" == typeof Symbol && "function" == typeof Symbol.for
                  ? Symbol.for("nodejs.util.inspect.custom")
                  : null;
            function a(e) {
              if (e > 0x7fffffff)
                throw RangeError(
                  'The value "' + e + '" is invalid for option "size"',
                );
              let t = new Uint8Array(e);
              return (Object.setPrototypeOf(t, r.prototype), t);
            }
            function r(e, t, n) {
              if ("number" == typeof e) {
                if ("string" == typeof t)
                  throw TypeError(
                    'The "string" argument must be of type string. Received type number',
                  );
                return s(e);
              }
              return i(e, t, n);
            }
            function i(e, t, n) {
              if ("string" == typeof e) {
                var o = e,
                  i = t;
                if (
                  (("string" != typeof i || "" === i) && (i = "utf8"),
                  !r.isEncoding(i))
                )
                  throw TypeError("Unknown encoding: " + i);
                let n = 0 | p(o, i),
                  u = a(n),
                  s = u.write(o, i);
                return (s !== n && (u = u.slice(0, s)), u);
              }
              if (ArrayBuffer.isView(e)) {
                var u = e;
                if (L(u, Uint8Array)) {
                  let e = new Uint8Array(u);
                  return l(e.buffer, e.byteOffset, e.byteLength);
                }
                return c(u);
              }
              if (null == e)
                throw TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof e,
                );
              if (
                L(e, ArrayBuffer) ||
                (e && L(e.buffer, ArrayBuffer)) ||
                ("u" > typeof SharedArrayBuffer &&
                  (L(e, SharedArrayBuffer) ||
                    (e && L(e.buffer, SharedArrayBuffer))))
              )
                return l(e, t, n);
              if ("number" == typeof e)
                throw TypeError(
                  'The "value" argument must not be of type number. Received type number',
                );
              let s = e.valueOf && e.valueOf();
              if (null != s && s !== e) return r.from(s, t, n);
              let d = (function (e) {
                if (r.isBuffer(e)) {
                  let t = 0 | m(e.length),
                    n = a(t);
                  return (0 === n.length || e.copy(n, 0, 0, t), n);
                }
                return void 0 !== e.length
                  ? "number" != typeof e.length ||
                    (function (e) {
                      return e != e;
                    })(e.length)
                    ? a(0)
                    : c(e)
                  : "Buffer" === e.type && Array.isArray(e.data)
                    ? c(e.data)
                    : void 0;
              })(e);
              if (d) return d;
              if (
                "u" > typeof Symbol &&
                null != Symbol.toPrimitive &&
                "function" == typeof e[Symbol.toPrimitive]
              )
                return r.from(e[Symbol.toPrimitive]("string"), t, n);
              throw TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof e,
              );
            }
            function u(e) {
              if ("number" != typeof e)
                throw TypeError('"size" argument must be of type number');
              if (e < 0)
                throw RangeError(
                  'The value "' + e + '" is invalid for option "size"',
                );
            }
            function s(e) {
              return (u(e), a(e < 0 ? 0 : 0 | m(e)));
            }
            function c(e) {
              let t = e.length < 0 ? 0 : 0 | m(e.length),
                n = a(t);
              for (let o = 0; o < t; o += 1) n[o] = 255 & e[o];
              return n;
            }
            function l(e, t, n) {
              let o;
              if (t < 0 || e.byteLength < t)
                throw RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < t + (n || 0))
                throw RangeError('"length" is outside of buffer bounds');
              return (
                Object.setPrototypeOf(
                  (o =
                    void 0 === t && void 0 === n
                      ? new Uint8Array(e)
                      : void 0 === n
                        ? new Uint8Array(e, t)
                        : new Uint8Array(e, t, n)),
                  r.prototype,
                ),
                o
              );
            }
            function m(e) {
              if (e >= 0x7fffffff)
                throw RangeError(
                  "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes",
                );
              return 0 | e;
            }
            function p(e, t) {
              if (r.isBuffer(e)) return e.length;
              if (ArrayBuffer.isView(e) || L(e, ArrayBuffer))
                return e.byteLength;
              if ("string" != typeof e)
                throw TypeError(
                  'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                    typeof e,
                );
              let n = e.length,
                o = arguments.length > 2 && !0 === arguments[2];
              if (!o && 0 === n) return 0;
              let a = !1;
              for (;;)
                switch (t) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return n;
                  case "utf8":
                  case "utf-8":
                    return R(e).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * n;
                  case "hex":
                    return n >>> 1;
                  case "base64":
                    return U(e).length;
                  default:
                    if (a) return o ? -1 : R(e).length;
                    ((t = ("" + t).toLowerCase()), (a = !0));
                }
            }
            function d(e, n, o) {
              let a = !1;
              if (
                ((void 0 === n || n < 0) && (n = 0),
                n > this.length ||
                  ((void 0 === o || o > this.length) && (o = this.length),
                  o <= 0 || (o >>>= 0) <= (n >>>= 0)))
              )
                return "";
              for (e || (e = "utf8"); ; )
                switch (e) {
                  case "hex":
                    return (function (e, t, n) {
                      let o = e.length;
                      ((!t || t < 0) && (t = 0),
                        (!n || n < 0 || n > o) && (n = o));
                      let a = "";
                      for (let o = t; o < n; ++o) a += O[e[o]];
                      return a;
                    })(this, n, o);
                  case "utf8":
                  case "utf-8":
                    return h(this, n, o);
                  case "ascii":
                    return (function (e, t, n) {
                      let o = "";
                      n = Math.min(e.length, n);
                      for (let a = t; a < n; ++a)
                        o += String.fromCharCode(127 & e[a]);
                      return o;
                    })(this, n, o);
                  case "latin1":
                  case "binary":
                    return (function (e, t, n) {
                      let o = "";
                      n = Math.min(e.length, n);
                      for (let a = t; a < n; ++a)
                        o += String.fromCharCode(e[a]);
                      return o;
                    })(this, n, o);
                  case "base64":
                    var r, i, u;
                    return (
                      (r = this),
                      (i = n),
                      (u = o),
                      0 === i && u === r.length
                        ? t.fromByteArray(r)
                        : t.fromByteArray(r.slice(i, u))
                    );
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return (function (e, t, n) {
                      let o = e.slice(t, n),
                        a = "";
                      for (let e = 0; e < o.length - 1; e += 2)
                        a += String.fromCharCode(o[e] + 256 * o[e + 1]);
                      return a;
                    })(this, n, o);
                  default:
                    if (a) throw TypeError("Unknown encoding: " + e);
                    ((e = (e + "").toLowerCase()), (a = !0));
                }
            }
            function f(e, t, n) {
              let o = e[t];
              ((e[t] = e[n]), (e[n] = o));
            }
            function _(e, t, n, o, a) {
              var i;
              if (0 === e.length) return -1;
              if (
                ("string" == typeof n
                  ? ((o = n), (n = 0))
                  : n > 0x7fffffff
                    ? (n = 0x7fffffff)
                    : n < -0x80000000 && (n = -0x80000000),
                (i = n *= 1) != i && (n = a ? 0 : e.length - 1),
                n < 0 && (n = e.length + n),
                n >= e.length)
              )
                if (a) return -1;
                else n = e.length - 1;
              else if (n < 0)
                if (!a) return -1;
                else n = 0;
              if (("string" == typeof t && (t = r.from(t, o)), r.isBuffer(t)))
                return 0 === t.length ? -1 : y(e, t, n, o, a);
              if ("number" == typeof t) {
                if (
                  ((t &= 255),
                  "function" == typeof Uint8Array.prototype.indexOf)
                )
                  if (a) return Uint8Array.prototype.indexOf.call(e, t, n);
                  else return Uint8Array.prototype.lastIndexOf.call(e, t, n);
                return y(e, [t], n, o, a);
              }
              throw TypeError("val must be string, number or Buffer");
            }
            function y(e, t, n, o, a) {
              let r,
                i = 1,
                u = e.length,
                s = t.length;
              if (
                void 0 !== o &&
                ("ucs2" === (o = String(o).toLowerCase()) ||
                  "ucs-2" === o ||
                  "utf16le" === o ||
                  "utf-16le" === o)
              ) {
                if (e.length < 2 || t.length < 2) return -1;
                ((i = 2), (u /= 2), (s /= 2), (n /= 2));
              }
              function c(e, t) {
                return 1 === i ? e[t] : e.readUInt16BE(t * i);
              }
              if (a) {
                let o = -1;
                for (r = n; r < u; r++)
                  if (c(e, r) === c(t, -1 === o ? 0 : r - o)) {
                    if ((-1 === o && (o = r), r - o + 1 === s)) return o * i;
                  } else (-1 !== o && (r -= r - o), (o = -1));
              } else
                for (n + s > u && (n = u - s), r = n; r >= 0; r--) {
                  let n = !0;
                  for (let o = 0; o < s; o++)
                    if (c(e, r + o) !== c(t, o)) {
                      n = !1;
                      break;
                    }
                  if (n) return r;
                }
              return -1;
            }
            function h(e, t, n) {
              n = Math.min(e.length, n);
              let o = [],
                a = t;
              for (; a < n; ) {
                let t = e[a],
                  r = null,
                  i = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                if (a + i <= n) {
                  let n, o, u, s;
                  switch (i) {
                    case 1:
                      t < 128 && (r = t);
                      break;
                    case 2:
                      (192 & (n = e[a + 1])) == 128 &&
                        (s = ((31 & t) << 6) | (63 & n)) > 127 &&
                        (r = s);
                      break;
                    case 3:
                      ((n = e[a + 1]),
                        (o = e[a + 2]),
                        (192 & n) == 128 &&
                          (192 & o) == 128 &&
                          (s = ((15 & t) << 12) | ((63 & n) << 6) | (63 & o)) >
                            2047 &&
                          (s < 55296 || s > 57343) &&
                          (r = s));
                      break;
                    case 4:
                      ((n = e[a + 1]),
                        (o = e[a + 2]),
                        (u = e[a + 3]),
                        (192 & n) == 128 &&
                          (192 & o) == 128 &&
                          (192 & u) == 128 &&
                          (s =
                            ((15 & t) << 18) |
                            ((63 & n) << 12) |
                            ((63 & o) << 6) |
                            (63 & u)) > 65535 &&
                          s < 1114112 &&
                          (r = s));
                  }
                }
                (null === r
                  ? ((r = 65533), (i = 1))
                  : r > 65535 &&
                    ((r -= 65536),
                    o.push(((r >>> 10) & 1023) | 55296),
                    (r = 56320 | (1023 & r))),
                  o.push(r),
                  (a += i));
              }
              var r = o;
              let i = r.length;
              if (i <= 4096) return String.fromCharCode.apply(String, r);
              let u = "",
                s = 0;
              for (; s < i; )
                u += String.fromCharCode.apply(String, r.slice(s, (s += 4096)));
              return u;
            }
            function b(e, t, n) {
              if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint");
              if (e + t > n)
                throw RangeError("Trying to access beyond buffer length");
            }
            function g(e, t, n, o, a, i) {
              if (!r.isBuffer(e))
                throw TypeError('"buffer" argument must be a Buffer instance');
              if (t > a || t < i)
                throw RangeError('"value" argument is out of bounds');
              if (n + o > e.length) throw RangeError("Index out of range");
            }
            function k(e, t, n, o, a) {
              S(t, o, a, e, n, 7);
              let r = Number(t & BigInt(0xffffffff));
              ((e[n++] = r),
                (r >>= 8),
                (e[n++] = r),
                (r >>= 8),
                (e[n++] = r),
                (r >>= 8),
                (e[n++] = r));
              let i = Number((t >> BigInt(32)) & BigInt(0xffffffff));
              return (
                (e[n++] = i),
                (i >>= 8),
                (e[n++] = i),
                (i >>= 8),
                (e[n++] = i),
                (i >>= 8),
                (e[n++] = i),
                n
              );
            }
            function A(e, t, n, o, a) {
              S(t, o, a, e, n, 7);
              let r = Number(t & BigInt(0xffffffff));
              ((e[n + 7] = r),
                (r >>= 8),
                (e[n + 6] = r),
                (r >>= 8),
                (e[n + 5] = r),
                (r >>= 8),
                (e[n + 4] = r));
              let i = Number((t >> BigInt(32)) & BigInt(0xffffffff));
              return (
                (e[n + 3] = i),
                (i >>= 8),
                (e[n + 2] = i),
                (i >>= 8),
                (e[n + 1] = i),
                (i >>= 8),
                (e[n] = i),
                n + 8
              );
            }
            function E(e, t, n, o, a, r) {
              if (n + o > e.length || n < 0)
                throw RangeError("Index out of range");
            }
            function B(e, t, o, a, r) {
              return (
                (t *= 1),
                (o >>>= 0),
                r || E(e, t, o, 4, 34028234663852886e22, -34028234663852886e22),
                n.write(e, t, o, a, 23, 4),
                o + 4
              );
            }
            function P(e, t, o, a, r) {
              return (
                (t *= 1),
                (o >>>= 0),
                r ||
                  E(e, t, o, 8, 17976931348623157e292, -17976931348623157e292),
                n.write(e, t, o, a, 52, 8),
                o + 8
              );
            }
            ((e.Buffer = r),
              (e.SlowBuffer = function (e) {
                return (+e != e && (e = 0), r.alloc(+e));
              }),
              (e.INSPECT_MAX_BYTES = 50),
              (e.kMaxLength = 0x7fffffff),
              (r.TYPED_ARRAY_SUPPORT = (function () {
                try {
                  let e = new Uint8Array(1),
                    t = {
                      foo: function () {
                        return 42;
                      },
                    };
                  return (
                    Object.setPrototypeOf(t, Uint8Array.prototype),
                    Object.setPrototypeOf(e, t),
                    42 === e.foo()
                  );
                } catch (e) {
                  return !1;
                }
              })()),
              !r.TYPED_ARRAY_SUPPORT &&
                "u" > typeof console &&
                "function" == typeof console.error &&
                console.error(
                  "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
                ),
              Object.defineProperty(r.prototype, "parent", {
                enumerable: !0,
                get: function () {
                  if (r.isBuffer(this)) return this.buffer;
                },
              }),
              Object.defineProperty(r.prototype, "offset", {
                enumerable: !0,
                get: function () {
                  if (r.isBuffer(this)) return this.byteOffset;
                },
              }),
              (r.poolSize = 8192),
              (r.from = function (e, t, n) {
                return i(e, t, n);
              }),
              Object.setPrototypeOf(r.prototype, Uint8Array.prototype),
              Object.setPrototypeOf(r, Uint8Array),
              (r.alloc = function (e, t, n) {
                return (u(e), e <= 0)
                  ? a(e)
                  : void 0 !== t
                    ? "string" == typeof n
                      ? a(e).fill(t, n)
                      : a(e).fill(t)
                    : a(e);
              }),
              (r.allocUnsafe = function (e) {
                return s(e);
              }),
              (r.allocUnsafeSlow = function (e) {
                return s(e);
              }),
              (r.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== r.prototype;
              }),
              (r.compare = function (e, t) {
                if (
                  (L(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)),
                  L(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)),
                  !r.isBuffer(e) || !r.isBuffer(t))
                )
                  throw TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
                  );
                if (e === t) return 0;
                let n = e.length,
                  o = t.length;
                for (let a = 0, r = Math.min(n, o); a < r; ++a)
                  if (e[a] !== t[a]) {
                    ((n = e[a]), (o = t[a]));
                    break;
                  }
                return n < o ? -1 : +(o < n);
              }),
              (r.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;
                  default:
                    return !1;
                }
              }),
              (r.concat = function (e, t) {
                let n;
                if (!Array.isArray(e))
                  throw TypeError(
                    '"list" argument must be an Array of Buffers',
                  );
                if (0 === e.length) return r.alloc(0);
                if (void 0 === t)
                  for (n = 0, t = 0; n < e.length; ++n) t += e[n].length;
                let o = r.allocUnsafe(t),
                  a = 0;
                for (n = 0; n < e.length; ++n) {
                  let t = e[n];
                  if (L(t, Uint8Array))
                    a + t.length > o.length
                      ? (r.isBuffer(t) || (t = r.from(t)), t.copy(o, a))
                      : Uint8Array.prototype.set.call(o, t, a);
                  else if (r.isBuffer(t)) t.copy(o, a);
                  else
                    throw TypeError(
                      '"list" argument must be an Array of Buffers',
                    );
                  a += t.length;
                }
                return o;
              }),
              (r.byteLength = p),
              (r.prototype._isBuffer = !0),
              (r.prototype.swap16 = function () {
                let e = this.length;
                if (e % 2 != 0)
                  throw RangeError("Buffer size must be a multiple of 16-bits");
                for (let t = 0; t < e; t += 2) f(this, t, t + 1);
                return this;
              }),
              (r.prototype.swap32 = function () {
                let e = this.length;
                if (e % 4 != 0)
                  throw RangeError("Buffer size must be a multiple of 32-bits");
                for (let t = 0; t < e; t += 4)
                  (f(this, t, t + 3), f(this, t + 1, t + 2));
                return this;
              }),
              (r.prototype.swap64 = function () {
                let e = this.length;
                if (e % 8 != 0)
                  throw RangeError("Buffer size must be a multiple of 64-bits");
                for (let t = 0; t < e; t += 8)
                  (f(this, t, t + 7),
                    f(this, t + 1, t + 6),
                    f(this, t + 2, t + 5),
                    f(this, t + 3, t + 4));
                return this;
              }),
              (r.prototype.toString = function () {
                let e = this.length;
                return 0 === e
                  ? ""
                  : 0 == arguments.length
                    ? h(this, 0, e)
                    : d.apply(this, arguments);
              }),
              (r.prototype.toLocaleString = r.prototype.toString),
              (r.prototype.equals = function (e) {
                if (!r.isBuffer(e))
                  throw TypeError("Argument must be a Buffer");
                return this === e || 0 === r.compare(this, e);
              }),
              (r.prototype.inspect = function () {
                let t = "",
                  n = e.INSPECT_MAX_BYTES;
                return (
                  (t = this.toString("hex", 0, n)
                    .replace(/(.{2})/g, "$1 ")
                    .trim()),
                  this.length > n && (t += " ... "),
                  "<Buffer " + t + ">"
                );
              }),
              o && (r.prototype[o] = r.prototype.inspect),
              (r.prototype.compare = function (e, t, n, o, a) {
                if (
                  (L(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)),
                  !r.isBuffer(e))
                )
                  throw TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                      typeof e,
                  );
                if (
                  (void 0 === t && (t = 0),
                  void 0 === n && (n = e ? e.length : 0),
                  void 0 === o && (o = 0),
                  void 0 === a && (a = this.length),
                  t < 0 || n > e.length || o < 0 || a > this.length)
                )
                  throw RangeError("out of range index");
                if (o >= a && t >= n) return 0;
                if (o >= a) return -1;
                if (t >= n) return 1;
                if (
                  ((t >>>= 0), (n >>>= 0), (o >>>= 0), (a >>>= 0), this === e)
                )
                  return 0;
                let i = a - o,
                  u = n - t,
                  s = Math.min(i, u),
                  c = this.slice(o, a),
                  l = e.slice(t, n);
                for (let e = 0; e < s; ++e)
                  if (c[e] !== l[e]) {
                    ((i = c[e]), (u = l[e]));
                    break;
                  }
                return i < u ? -1 : +(u < i);
              }),
              (r.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n);
              }),
              (r.prototype.indexOf = function (e, t, n) {
                return _(this, e, t, n, !0);
              }),
              (r.prototype.lastIndexOf = function (e, t, n) {
                return _(this, e, t, n, !1);
              }),
              (r.prototype.write = function (e, t, n, o) {
                var a, r, i, u, s, c, l, m;
                if (void 0 === t) ((o = "utf8"), (n = this.length), (t = 0));
                else if (void 0 === n && "string" == typeof t)
                  ((o = t), (n = this.length), (t = 0));
                else if (isFinite(t))
                  ((t >>>= 0),
                    isFinite(n)
                      ? ((n >>>= 0), void 0 === o && (o = "utf8"))
                      : ((o = n), (n = void 0)));
                else
                  throw Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported",
                  );
                let p = this.length - t;
                if (
                  ((void 0 === n || n > p) && (n = p),
                  (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
                )
                  throw RangeError("Attempt to write outside buffer bounds");
                o || (o = "utf8");
                let d = !1;
                for (;;)
                  switch (o) {
                    case "hex":
                      return (function (e, t, n, o) {
                        let a;
                        n = Number(n) || 0;
                        let r = e.length - n;
                        o ? (o = Number(o)) > r && (o = r) : (o = r);
                        let i = t.length;
                        for (o > i / 2 && (o = i / 2), a = 0; a < o; ++a) {
                          var u;
                          let o = parseInt(t.substr(2 * a, 2), 16);
                          if ((u = o) != u) break;
                          e[n + a] = o;
                        }
                        return a;
                      })(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                      return (
                        (a = t),
                        (r = n),
                        F(R(e, this.length - a), this, a, r)
                      );
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return (
                        (i = t),
                        (u = n),
                        F(
                          (function (e) {
                            let t = [];
                            for (let n = 0; n < e.length; ++n)
                              t.push(255 & e.charCodeAt(n));
                            return t;
                          })(e),
                          this,
                          i,
                          u,
                        )
                      );
                    case "base64":
                      return ((s = t), (c = n), F(U(e), this, s, c));
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return (
                        (l = t),
                        (m = n),
                        F(
                          (function (e, t) {
                            let n,
                              o,
                              a = [];
                            for (
                              let r = 0;
                              r < e.length && !((t -= 2) < 0);
                              ++r
                            )
                              ((o = (n = e.charCodeAt(r)) >> 8),
                                a.push(n % 256),
                                a.push(o));
                            return a;
                          })(e, this.length - l),
                          this,
                          l,
                          m,
                        )
                      );
                    default:
                      if (d) throw TypeError("Unknown encoding: " + o);
                      ((o = ("" + o).toLowerCase()), (d = !0));
                  }
              }),
              (r.prototype.toJSON = function () {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0),
                };
              }),
              (r.prototype.slice = function (e, t) {
                let n = this.length;
                ((e = ~~e),
                  (t = void 0 === t ? n : ~~t),
                  e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                  t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                  t < e && (t = e));
                let o = this.subarray(e, t);
                return (Object.setPrototypeOf(o, r.prototype), o);
              }),
              (r.prototype.readUintLE = r.prototype.readUIntLE =
                function (e, t, n) {
                  ((e >>>= 0), (t >>>= 0), n || b(e, t, this.length));
                  let o = this[e],
                    a = 1,
                    r = 0;
                  for (; ++r < t && (a *= 256); ) o += this[e + r] * a;
                  return o;
                }),
              (r.prototype.readUintBE = r.prototype.readUIntBE =
                function (e, t, n) {
                  ((e >>>= 0), (t >>>= 0), n || b(e, t, this.length));
                  let o = this[e + --t],
                    a = 1;
                  for (; t > 0 && (a *= 256); ) o += this[e + --t] * a;
                  return o;
                }),
              (r.prototype.readUint8 = r.prototype.readUInt8 =
                function (e, t) {
                  return ((e >>>= 0), t || b(e, 1, this.length), this[e]);
                }),
              (r.prototype.readUint16LE = r.prototype.readUInt16LE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || b(e, 2, this.length),
                    this[e] | (this[e + 1] << 8)
                  );
                }),
              (r.prototype.readUint16BE = r.prototype.readUInt16BE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || b(e, 2, this.length),
                    (this[e] << 8) | this[e + 1]
                  );
                }),
              (r.prototype.readUint32LE = r.prototype.readUInt32LE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || b(e, 4, this.length),
                    (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                      0x1000000 * this[e + 3]
                  );
                }),
              (r.prototype.readUint32BE = r.prototype.readUInt32BE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || b(e, 4, this.length),
                    0x1000000 * this[e] +
                      ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                  );
                }),
              (r.prototype.readBigUInt64LE = N(function (e) {
                x((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                (void 0 === t || void 0 === n) && T(e, this.length - 8);
                let o =
                    t +
                    256 * this[++e] +
                    65536 * this[++e] +
                    0x1000000 * this[++e],
                  a =
                    this[++e] +
                    256 * this[++e] +
                    65536 * this[++e] +
                    0x1000000 * n;
                return BigInt(o) + (BigInt(a) << BigInt(32));
              })),
              (r.prototype.readBigUInt64BE = N(function (e) {
                x((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                (void 0 === t || void 0 === n) && T(e, this.length - 8);
                let o =
                    0x1000000 * t +
                    65536 * this[++e] +
                    256 * this[++e] +
                    this[++e],
                  a =
                    0x1000000 * this[++e] +
                    65536 * this[++e] +
                    256 * this[++e] +
                    n;
                return (BigInt(o) << BigInt(32)) + BigInt(a);
              })),
              (r.prototype.readIntLE = function (e, t, n) {
                ((e >>>= 0), (t >>>= 0), n || b(e, t, this.length));
                let o = this[e],
                  a = 1,
                  r = 0;
                for (; ++r < t && (a *= 256); ) o += this[e + r] * a;
                return (o >= (a *= 128) && (o -= Math.pow(2, 8 * t)), o);
              }),
              (r.prototype.readIntBE = function (e, t, n) {
                ((e >>>= 0), (t >>>= 0), n || b(e, t, this.length));
                let o = t,
                  a = 1,
                  r = this[e + --o];
                for (; o > 0 && (a *= 256); ) r += this[e + --o] * a;
                return (r >= (a *= 128) && (r -= Math.pow(2, 8 * t)), r);
              }),
              (r.prototype.readInt8 = function (e, t) {
                return ((e >>>= 0), t || b(e, 1, this.length), 128 & this[e])
                  ? -((255 - this[e] + 1) * 1)
                  : this[e];
              }),
              (r.prototype.readInt16LE = function (e, t) {
                ((e >>>= 0), t || b(e, 2, this.length));
                let n = this[e] | (this[e + 1] << 8);
                return 32768 & n ? 0xffff0000 | n : n;
              }),
              (r.prototype.readInt16BE = function (e, t) {
                ((e >>>= 0), t || b(e, 2, this.length));
                let n = this[e + 1] | (this[e] << 8);
                return 32768 & n ? 0xffff0000 | n : n;
              }),
              (r.prototype.readInt32LE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 4, this.length),
                  this[e] |
                    (this[e + 1] << 8) |
                    (this[e + 2] << 16) |
                    (this[e + 3] << 24)
                );
              }),
              (r.prototype.readInt32BE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 4, this.length),
                  (this[e] << 24) |
                    (this[e + 1] << 16) |
                    (this[e + 2] << 8) |
                    this[e + 3]
                );
              }),
              (r.prototype.readBigInt64LE = N(function (e) {
                x((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                return (
                  (void 0 === t || void 0 === n) && T(e, this.length - 8),
                  (BigInt(
                    this[e + 4] +
                      256 * this[e + 5] +
                      65536 * this[e + 6] +
                      (n << 24),
                  ) <<
                    BigInt(32)) +
                    BigInt(
                      t +
                        256 * this[++e] +
                        65536 * this[++e] +
                        0x1000000 * this[++e],
                    )
                );
              })),
              (r.prototype.readBigInt64BE = N(function (e) {
                x((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                return (
                  (void 0 === t || void 0 === n) && T(e, this.length - 8),
                  (BigInt(
                    (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e],
                  ) <<
                    BigInt(32)) +
                    BigInt(
                      0x1000000 * this[++e] +
                        65536 * this[++e] +
                        256 * this[++e] +
                        n,
                    )
                );
              })),
              (r.prototype.readFloatLE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 4, this.length),
                  n.read(this, e, !0, 23, 4)
                );
              }),
              (r.prototype.readFloatBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 4, this.length),
                  n.read(this, e, !1, 23, 4)
                );
              }),
              (r.prototype.readDoubleLE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 8, this.length),
                  n.read(this, e, !0, 52, 8)
                );
              }),
              (r.prototype.readDoubleBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || b(e, 8, this.length),
                  n.read(this, e, !1, 52, 8)
                );
              }),
              (r.prototype.writeUintLE = r.prototype.writeUIntLE =
                function (e, t, n, o) {
                  if (((e *= 1), (t >>>= 0), (n >>>= 0), !o)) {
                    let o = Math.pow(2, 8 * n) - 1;
                    g(this, e, t, n, o, 0);
                  }
                  let a = 1,
                    r = 0;
                  for (this[t] = 255 & e; ++r < n && (a *= 256); )
                    this[t + r] = (e / a) & 255;
                  return t + n;
                }),
              (r.prototype.writeUintBE = r.prototype.writeUIntBE =
                function (e, t, n, o) {
                  if (((e *= 1), (t >>>= 0), (n >>>= 0), !o)) {
                    let o = Math.pow(2, 8 * n) - 1;
                    g(this, e, t, n, o, 0);
                  }
                  let a = n - 1,
                    r = 1;
                  for (this[t + a] = 255 & e; --a >= 0 && (r *= 256); )
                    this[t + a] = (e / r) & 255;
                  return t + n;
                }),
              (r.prototype.writeUint8 = r.prototype.writeUInt8 =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || g(this, e, t, 1, 255, 0),
                    (this[t] = 255 & e),
                    t + 1
                  );
                }),
              (r.prototype.writeUint16LE = r.prototype.writeUInt16LE =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || g(this, e, t, 2, 65535, 0),
                    (this[t] = 255 & e),
                    (this[t + 1] = e >>> 8),
                    t + 2
                  );
                }),
              (r.prototype.writeUint16BE = r.prototype.writeUInt16BE =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || g(this, e, t, 2, 65535, 0),
                    (this[t] = e >>> 8),
                    (this[t + 1] = 255 & e),
                    t + 2
                  );
                }),
              (r.prototype.writeUint32LE = r.prototype.writeUInt32LE =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || g(this, e, t, 4, 0xffffffff, 0),
                    (this[t + 3] = e >>> 24),
                    (this[t + 2] = e >>> 16),
                    (this[t + 1] = e >>> 8),
                    (this[t] = 255 & e),
                    t + 4
                  );
                }),
              (r.prototype.writeUint32BE = r.prototype.writeUInt32BE =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || g(this, e, t, 4, 0xffffffff, 0),
                    (this[t] = e >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e),
                    t + 4
                  );
                }),
              (r.prototype.writeBigUInt64LE = N(function (e, t = 0) {
                return k(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
              })),
              (r.prototype.writeBigUInt64BE = N(function (e, t = 0) {
                return A(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
              })),
              (r.prototype.writeIntLE = function (e, t, n, o) {
                if (((e *= 1), (t >>>= 0), !o)) {
                  let o = Math.pow(2, 8 * n - 1);
                  g(this, e, t, n, o - 1, -o);
                }
                let a = 0,
                  r = 1,
                  i = 0;
                for (this[t] = 255 & e; ++a < n && (r *= 256); )
                  (e < 0 && 0 === i && 0 !== this[t + a - 1] && (i = 1),
                    (this[t + a] = (((e / r) | 0) - i) & 255));
                return t + n;
              }),
              (r.prototype.writeIntBE = function (e, t, n, o) {
                if (((e *= 1), (t >>>= 0), !o)) {
                  let o = Math.pow(2, 8 * n - 1);
                  g(this, e, t, n, o - 1, -o);
                }
                let a = n - 1,
                  r = 1,
                  i = 0;
                for (this[t + a] = 255 & e; --a >= 0 && (r *= 256); )
                  (e < 0 && 0 === i && 0 !== this[t + a + 1] && (i = 1),
                    (this[t + a] = (((e / r) | 0) - i) & 255));
                return t + n;
              }),
              (r.prototype.writeInt8 = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || g(this, e, t, 1, 127, -128),
                  e < 0 && (e = 255 + e + 1),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (r.prototype.writeInt16LE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || g(this, e, t, 2, 32767, -32768),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (r.prototype.writeInt16BE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || g(this, e, t, 2, 32767, -32768),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (r.prototype.writeInt32LE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || g(this, e, t, 4, 0x7fffffff, -0x80000000),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  (this[t + 2] = e >>> 16),
                  (this[t + 3] = e >>> 24),
                  t + 4
                );
              }),
              (r.prototype.writeInt32BE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || g(this, e, t, 4, 0x7fffffff, -0x80000000),
                  e < 0 && (e = 0xffffffff + e + 1),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (r.prototype.writeBigInt64LE = N(function (e, t = 0) {
                return k(
                  this,
                  e,
                  t,
                  -BigInt("0x8000000000000000"),
                  BigInt("0x7fffffffffffffff"),
                );
              })),
              (r.prototype.writeBigInt64BE = N(function (e, t = 0) {
                return A(
                  this,
                  e,
                  t,
                  -BigInt("0x8000000000000000"),
                  BigInt("0x7fffffffffffffff"),
                );
              })),
              (r.prototype.writeFloatLE = function (e, t, n) {
                return B(this, e, t, !0, n);
              }),
              (r.prototype.writeFloatBE = function (e, t, n) {
                return B(this, e, t, !1, n);
              }),
              (r.prototype.writeDoubleLE = function (e, t, n) {
                return P(this, e, t, !0, n);
              }),
              (r.prototype.writeDoubleBE = function (e, t, n) {
                return P(this, e, t, !1, n);
              }),
              (r.prototype.copy = function (e, t, n, o) {
                if (!r.isBuffer(e))
                  throw TypeError("argument should be a Buffer");
                if (
                  (n || (n = 0),
                  o || 0 === o || (o = this.length),
                  t >= e.length && (t = e.length),
                  t || (t = 0),
                  o > 0 && o < n && (o = n),
                  o === n || 0 === e.length || 0 === this.length)
                )
                  return 0;
                if (t < 0) throw RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length)
                  throw RangeError("Index out of range");
                if (o < 0) throw RangeError("sourceEnd out of bounds");
                (o > this.length && (o = this.length),
                  e.length - t < o - n && (o = e.length - t + n));
                let a = o - n;
                return (
                  this === e &&
                  "function" == typeof Uint8Array.prototype.copyWithin
                    ? this.copyWithin(t, n, o)
                    : Uint8Array.prototype.set.call(e, this.subarray(n, o), t),
                  a
                );
              }),
              (r.prototype.fill = function (e, t, n, o) {
                let a;
                if ("string" == typeof e) {
                  if (
                    ("string" == typeof t
                      ? ((o = t), (t = 0), (n = this.length))
                      : "string" == typeof n && ((o = n), (n = this.length)),
                    void 0 !== o && "string" != typeof o)
                  )
                    throw TypeError("encoding must be a string");
                  if ("string" == typeof o && !r.isEncoding(o))
                    throw TypeError("Unknown encoding: " + o);
                  if (1 === e.length) {
                    let t = e.charCodeAt(0);
                    (("utf8" === o && t < 128) || "latin1" === o) && (e = t);
                  }
                } else
                  "number" == typeof e
                    ? (e &= 255)
                    : "boolean" == typeof e && (e = Number(e));
                if (t < 0 || this.length < t || this.length < n)
                  throw RangeError("Out of range index");
                if (n <= t) return this;
                if (
                  ((t >>>= 0),
                  (n = void 0 === n ? this.length : n >>> 0),
                  e || (e = 0),
                  "number" == typeof e)
                )
                  for (a = t; a < n; ++a) this[a] = e;
                else {
                  let i = r.isBuffer(e) ? e : r.from(e, o),
                    u = i.length;
                  if (0 === u)
                    throw TypeError(
                      'The value "' + e + '" is invalid for argument "value"',
                    );
                  for (a = 0; a < n - t; ++a) this[a + t] = i[a % u];
                }
                return this;
              }));
            var q = {};
            function I(e, t, n) {
              q[e] = class extends n {
                constructor() {
                  (super(),
                    Object.defineProperty(this, "message", {
                      value: t.apply(this, arguments),
                      writable: !0,
                      configurable: !0,
                    }),
                    (this.name = `${this.name} [${e}]`),
                    this.stack,
                    delete this.name);
                }
                get code() {
                  return e;
                }
                set code(e) {
                  Object.defineProperty(this, "code", {
                    configurable: !0,
                    enumerable: !0,
                    value: e,
                    writable: !0,
                  });
                }
                toString() {
                  return `${this.name} [${e}]: ${this.message}`;
                }
              };
            }
            function C(e) {
              let t = "",
                n = e.length,
                o = +("-" === e[0]);
              for (; n >= o + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
              return `${e.slice(0, n)}${t}`;
            }
            function S(e, t, n, o, a, r) {
              if (e > n || e < t) {
                let o,
                  a = "bigint" == typeof t ? "n" : "";
                throw (
                  (o =
                    r > 3
                      ? 0 === t || t === BigInt(0)
                        ? `>= 0${a} and < 2${a} ** ${(r + 1) * 8}${a}`
                        : `>= -(2${a} ** ${(r + 1) * 8 - 1}${a}) and < 2 ** ${(r + 1) * 8 - 1}${a}`
                      : `>= ${t}${a} and <= ${n}${a}`),
                  new q.ERR_OUT_OF_RANGE("value", o, e)
                );
              }
              (x(a, "offset"),
                (void 0 === o[a] || void 0 === o[a + r]) &&
                  T(a, o.length - (r + 1)));
            }
            function x(e, t) {
              if ("number" != typeof e)
                throw new q.ERR_INVALID_ARG_TYPE(t, "number", e);
            }
            function T(e, t, n) {
              if (Math.floor(e) !== e)
                throw (
                  x(e, n),
                  new q.ERR_OUT_OF_RANGE(n || "offset", "an integer", e)
                );
              if (t < 0) throw new q.ERR_BUFFER_OUT_OF_BOUNDS();
              throw new q.ERR_OUT_OF_RANGE(
                n || "offset",
                `>= ${+!!n} and <= ${t}`,
                e,
              );
            }
            (I(
              "ERR_BUFFER_OUT_OF_BOUNDS",
              function (e) {
                return e
                  ? `${e} is outside of buffer bounds`
                  : "Attempt to access memory outside buffer bounds";
              },
              RangeError,
            ),
              I(
                "ERR_INVALID_ARG_TYPE",
                function (e, t) {
                  return `The "${e}" argument must be of type number. Received type ${typeof t}`;
                },
                TypeError,
              ),
              I(
                "ERR_OUT_OF_RANGE",
                function (e, t, n) {
                  let o = `The value of "${e}" is out of range.`,
                    a = n;
                  return (
                    Number.isInteger(n) && Math.abs(n) > 0x100000000
                      ? (a = C(String(n)))
                      : "bigint" == typeof n &&
                        ((a = String(n)),
                        (n > BigInt(2) ** BigInt(32) ||
                          n < -(BigInt(2) ** BigInt(32))) &&
                          (a = C(a)),
                        (a += "n")),
                    (o += ` It must be ${t}. Received ${a}`)
                  );
                },
                RangeError,
              ));
            var M = /[^+/0-9A-Za-z-_]/g;
            function R(e, t) {
              let n;
              t = t || 1 / 0;
              let o = e.length,
                a = null,
                r = [];
              for (let i = 0; i < o; ++i) {
                if ((n = e.charCodeAt(i)) > 55295 && n < 57344) {
                  if (!a) {
                    if (n > 56319 || i + 1 === o) {
                      (t -= 3) > -1 && r.push(239, 191, 189);
                      continue;
                    }
                    a = n;
                    continue;
                  }
                  if (n < 56320) {
                    ((t -= 3) > -1 && r.push(239, 191, 189), (a = n));
                    continue;
                  }
                  n = (((a - 55296) << 10) | (n - 56320)) + 65536;
                } else a && (t -= 3) > -1 && r.push(239, 191, 189);
                if (((a = null), n < 128)) {
                  if ((t -= 1) < 0) break;
                  r.push(n);
                } else if (n < 2048) {
                  if ((t -= 2) < 0) break;
                  r.push((n >> 6) | 192, (63 & n) | 128);
                } else if (n < 65536) {
                  if ((t -= 3) < 0) break;
                  r.push(
                    (n >> 12) | 224,
                    ((n >> 6) & 63) | 128,
                    (63 & n) | 128,
                  );
                } else if (n < 1114112) {
                  if ((t -= 4) < 0) break;
                  r.push(
                    (n >> 18) | 240,
                    ((n >> 12) & 63) | 128,
                    ((n >> 6) & 63) | 128,
                    (63 & n) | 128,
                  );
                } else throw Error("Invalid code point");
              }
              return r;
            }
            function U(e) {
              return t.toByteArray(
                (function (e) {
                  if (
                    (e = (e = e.split("=")[0]).trim().replace(M, "")).length < 2
                  )
                    return "";
                  for (; e.length % 4 != 0; ) e += "=";
                  return e;
                })(e),
              );
            }
            function F(e, t, n, o) {
              let a;
              for (
                a = 0;
                a < o && !(a + n >= t.length) && !(a >= e.length);
                ++a
              )
                t[a + n] = e[a];
              return a;
            }
            function L(e, t) {
              return (
                e instanceof t ||
                (null != e &&
                  null != e.constructor &&
                  null != e.constructor.name &&
                  e.constructor.name === t.name)
              );
            }
            var O = (function () {
              let e = "0123456789abcdef",
                t = Array(256);
              for (let n = 0; n < 16; ++n) {
                let o = 16 * n;
                for (let a = 0; a < 16; ++a) t[o + a] = e[n] + e[a];
              }
              return t;
            })();
            function N(e) {
              return "u" < typeof BigInt ? V : e;
            }
            function V() {
              throw Error("BigInt not supported");
            }
          },
        })())
          ? f(b(t))
          : {}),
      ((e, t, n) => {
        if ((t && "object" == typeof t) || "function" == typeof t)
          for (let o of h(t))
            g.call(e, o) ||
              void 0 === o ||
              _(e, o, {
                get: () => t[o],
                enumerable: !(n = y(t, o)) || n.enumerable,
              });
        return e;
      })(
        t && t.__esModule ? n : _(n, "default", { value: t, enumerable: !0 }),
        t,
      )),
    E = new r.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"),
    B = new r.PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"),
    P = new r.PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
  function q(e) {
    return r.PublicKey.findProgramAddressSync(e, B)[0];
  }
  new r.PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn");
  var I = q([A.Buffer.from("global_config")]),
    C = q([A.Buffer.from("__event_authority")]),
    S = q([A.Buffer.from("global_volume_accumulator")]),
    x =
      ((o = [A.Buffer.from("fee_config"), B.toBuffer()]),
      r.PublicKey.findProgramAddressSync(o, P)[0]);
  function T(e, t, n, o) {
    return q([
      A.Buffer.from("pool"),
      new i.default(e).toArrayLike(A.Buffer, "le", 2),
      t.toBuffer(),
      n.toBuffer(),
      o.toBuffer(),
    ]);
  }
  function M(e) {
    var t;
    return (
      (t = [A.Buffer.from("pool-authority"), e.toBuffer()]),
      r.PublicKey.findProgramAddressSync(t, E)[0]
    );
  }
  function R(e) {
    return q([A.Buffer.from("user_volume_accumulator"), e.toBuffer()]);
  }
  function U(e) {
    return q([A.Buffer.from("creator_vault"), e.toBuffer()]);
  }
  function F(e, t, n) {
    return (0, u.h)(t, e, !0, n);
  }
  function L(e) {
    return q([A.Buffer.from("pool-v2"), e.toBuffer()]);
  }
  var O = {
    address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
    metadata: {
      name: "pump_amm",
      version: "0.1.0",
      spec: "0.1.0",
      description: "Created with Anchor",
    },
    instructions: [
      {
        name: "admin_set_coin_creator",
        docs: ["Overrides the coin creator for a canonical pump pool"],
        discriminator: [242, 40, 117, 145, 73, 96, 105, 104],
        accounts: [
          {
            name: "admin_set_coin_creator_authority",
            signer: !0,
            relations: ["global_config"],
          },
          { name: "global_config" },
          { name: "pool", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [{ name: "coin_creator", type: "pubkey" }],
      },
      {
        name: "admin_update_token_incentives",
        discriminator: [209, 11, 115, 87, 213, 23, 124, 204],
        accounts: [
          {
            name: "admin",
            writable: !0,
            signer: !0,
            relations: ["global_config"],
          },
          {
            name: "global_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105, 103,
                  ],
                },
              ],
            },
          },
          {
            name: "global_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                    101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
              ],
            },
          },
          { name: "mint" },
          {
            name: "global_incentive_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "global_volume_accumulator" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          { name: "token_program" },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "start_time", type: "i64" },
          { name: "end_time", type: "i64" },
          { name: "seconds_in_a_day", type: "i64" },
          { name: "day_number", type: "u64" },
          { name: "token_supply_per_day", type: "u64" },
        ],
      },
      {
        name: "boost_buy_and_burn",
        discriminator: [105, 68, 6, 175, 0, 7, 35, 162],
        accounts: [
          { name: "pool" },
          { name: "authority", signer: !0 },
          {
            name: "global_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105, 103,
                  ],
                },
              ],
            },
          },
          { name: "base_mint", writable: !0, relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "boost_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [98, 111, 111, 115, 116, 95, 118, 97, 117, 108, 116],
                },
                { kind: "account", path: "pool" },
              ],
            },
          },
          {
            name: "boost_vault",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "boost_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "base_token_program" },
          { name: "quote_token_program" },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "quote_amount_in", type: "u64" },
          { name: "min_base_amount_burned", type: "u64" },
        ],
      },
      {
        name: "buy",
        docs: [
          "For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].",
          "If provided and valid, the ATA will be initialized if needed.",
        ],
        discriminator: [102, 6, 61, 18, 1, 218, 235, 234],
        accounts: [
          { name: "pool", writable: !0 },
          { name: "user", writable: !0, signer: !0 },
          { name: "global_config" },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          { name: "protocol_fee_recipient" },
          {
            name: "protocol_fee_recipient_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "protocol_fee_recipient" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "base_token_program" },
          { name: "quote_token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          {
            name: "program",
            address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "coin_creator_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "pool.coin_creator", account: "Pool" },
              ],
            },
          },
          {
            name: "global_volume_accumulator",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                    101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
              ],
            },
          },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          {
            name: "fee_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                },
                {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              ],
              program: { kind: "account", path: "fee_program" },
            },
          },
          {
            name: "fee_program",
            address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
          },
        ],
        args: [
          { name: "base_amount_out", type: "u64" },
          { name: "max_quote_amount_in", type: "u64" },
          { name: "track_volume", type: { defined: { name: "OptionBool" } } },
        ],
      },
      {
        name: "buy_exact_quote_in",
        docs: [
          "Given a budget of spendable_quote_in, buy at least min_base_amount_out",
          "Fees will be deducted from spendable_quote_in",
          "",
          "f(quote) = tokens, where tokens >= min_base_amount_out",
          "",
          "Make sure the payer has enough SOL to cover creation of the following accounts (unless already created):",
          "- protocol_fee_recipient_token_account: rent.minimum_balance(TokenAccount::LEN)",
          "- coin_creator_vault_ata: rent.minimum_balance(TokenAccount::LEN)",
          "- user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)",
          "",
          "For cashback coins, optionally pass user_volume_accumulator_wsol_ata as remaining_accounts[0].",
          "If provided and valid, the ATA will be initialized if needed.",
        ],
        discriminator: [198, 46, 21, 82, 180, 217, 232, 112],
        accounts: [
          { name: "pool", writable: !0 },
          { name: "user", writable: !0, signer: !0 },
          { name: "global_config" },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          { name: "protocol_fee_recipient" },
          {
            name: "protocol_fee_recipient_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "protocol_fee_recipient" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "base_token_program" },
          { name: "quote_token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          {
            name: "program",
            address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "coin_creator_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "pool.coin_creator", account: "Pool" },
              ],
            },
          },
          {
            name: "global_volume_accumulator",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                    101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
              ],
            },
          },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          {
            name: "fee_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                },
                {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              ],
              program: { kind: "account", path: "fee_program" },
            },
          },
          {
            name: "fee_program",
            address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
          },
        ],
        args: [
          { name: "spendable_quote_in", type: "u64" },
          { name: "min_base_amount_out", type: "u64" },
          { name: "track_volume", type: { defined: { name: "OptionBool" } } },
        ],
      },
      {
        name: "claim_cashback",
        discriminator: [37, 58, 35, 126, 190, 53, 228, 197],
        accounts: [
          { name: "user", writable: !0 },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          { name: "quote_mint" },
          { name: "quote_token_program" },
          {
            name: "user_volume_accumulator_wsol_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "user_volume_accumulator" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "user_wsol_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "user" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          {
            name: "program",
            address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
          },
        ],
        args: [],
      },
      {
        name: "claim_token_incentives",
        discriminator: [16, 4, 71, 28, 204, 1, 40, 27],
        accounts: [
          { name: "user" },
          {
            name: "user_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "user" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "global_volume_accumulator",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                    101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
              ],
            },
          },
          {
            name: "global_incentive_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "global_volume_accumulator" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          { name: "mint", relations: ["global_volume_accumulator"] },
          { name: "token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          {
            name: "program",
            address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
          },
          { name: "payer", writable: !0, signer: !0 },
        ],
        args: [],
      },
      {
        name: "close_user_volume_accumulator",
        discriminator: [249, 69, 164, 218, 150, 103, 84, 138],
        accounts: [
          { name: "user", writable: !0, signer: !0 },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "collect_coin_creator_fee",
        discriminator: [160, 57, 89, 42, 181, 139, 43, 66],
        accounts: [
          { name: "quote_mint" },
          { name: "quote_token_program" },
          { name: "coin_creator" },
          {
            name: "coin_creator_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "coin_creator" },
              ],
            },
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "coin_creator_token_account", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "create_config",
        discriminator: [201, 207, 243, 114, 75, 111, 47, 189],
        accounts: [
          {
            name: "admin",
            writable: !0,
            signer: !0,
            address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8",
          },
          {
            name: "global_config",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105, 103,
                  ],
                },
              ],
            },
          },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "lp_fee_basis_points", type: "u64" },
          { name: "protocol_fee_basis_points", type: "u64" },
          { name: "protocol_fee_recipients", type: { array: ["pubkey", 8] } },
          { name: "coin_creator_fee_basis_points", type: "u64" },
          { name: "admin_set_coin_creator_authority", type: "pubkey" },
        ],
      },
      {
        name: "create_pool",
        discriminator: [233, 146, 209, 142, 207, 104, 64, 188],
        accounts: [
          {
            name: "pool",
            writable: !0,
            pda: {
              seeds: [
                { kind: "const", value: [112, 111, 111, 108] },
                { kind: "arg", path: "index" },
                { kind: "account", path: "creator" },
                { kind: "account", path: "base_mint" },
                { kind: "account", path: "quote_mint" },
              ],
            },
          },
          { name: "global_config" },
          { name: "creator", writable: !0, signer: !0 },
          { name: "base_mint" },
          { name: "quote_mint" },
          {
            name: "lp_mint",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    112, 111, 111, 108, 95, 108, 112, 95, 109, 105, 110, 116,
                  ],
                },
                { kind: "account", path: "pool" },
              ],
            },
          },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          {
            name: "user_pool_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "creator" },
                { kind: "account", path: "token_2022_program" },
                { kind: "account", path: "lp_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "pool_base_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "pool" },
                { kind: "account", path: "base_token_program" },
                { kind: "account", path: "base_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "pool" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "token_2022_program",
            address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          },
          { name: "base_token_program" },
          { name: "quote_token_program" },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "index", type: "u16" },
          { name: "base_amount_in", type: "u64" },
          { name: "quote_amount_in", type: "u64" },
          { name: "coin_creator", type: "pubkey" },
          { name: "is_mayhem_mode", type: "bool" },
          {
            name: "is_cashback_coin",
            type: { defined: { name: "OptionBool" } },
          },
        ],
      },
      {
        name: "deposit",
        discriminator: [242, 35, 198, 137, 82, 225, 242, 182],
        accounts: [
          { name: "pool", writable: !0 },
          { name: "global_config" },
          { name: "user", signer: !0 },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "lp_mint", writable: !0, relations: ["pool"] },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          { name: "user_pool_token_account", writable: !0 },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "token_program",
            address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            name: "token_2022_program",
            address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "lp_token_amount_out", type: "u64" },
          { name: "max_base_amount_in", type: "u64" },
          { name: "max_quote_amount_in", type: "u64" },
        ],
      },
      {
        name: "disable",
        discriminator: [185, 173, 187, 90, 216, 15, 238, 233],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "disable_create_pool", type: "bool" },
          { name: "disable_deposit", type: "bool" },
          { name: "disable_withdraw", type: "bool" },
          { name: "disable_buy", type: "bool" },
          { name: "disable_sell", type: "bool" },
        ],
      },
      {
        name: "extend_account",
        discriminator: [234, 102, 194, 203, 150, 72, 62, 229],
        accounts: [
          { name: "account", writable: !0 },
          { name: "user", signer: !0 },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "init_boost",
        discriminator: [140, 233, 33, 94, 132, 90, 194, 143],
        accounts: [
          { name: "pool", writable: !0 },
          {
            name: "global_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105, 103,
                  ],
                },
              ],
            },
          },
          { name: "creator", writable: !0, signer: !0 },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "pool_base_token_account", relations: ["pool"] },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "boost_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [98, 111, 111, 115, 116, 95, 118, 97, 117, 108, 116],
                },
                { kind: "account", path: "pool" },
              ],
            },
          },
          {
            name: "boost_vault",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "boost_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "quote_token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "init_user_volume_accumulator",
        discriminator: [94, 6, 202, 115, 255, 96, 232, 183],
        accounts: [
          { name: "payer", writable: !0, signer: !0 },
          { name: "user" },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "migrate_pool_coin_creator",
        docs: ["Migrate Pool Coin Creator to Sharing Config"],
        discriminator: [208, 8, 159, 4, 74, 175, 16, 58],
        accounts: [
          {
            name: "pool",
            writable: !0,
            pda: {
              seeds: [
                { kind: "const", value: [112, 111, 111, 108] },
                { kind: "account", path: "pool.index", account: "Pool" },
                { kind: "account", path: "pool.creator", account: "Pool" },
                { kind: "account", path: "pool.base_mint", account: "Pool" },
                { kind: "account", path: "pool.quote_mint", account: "Pool" },
              ],
            },
          },
          {
            name: "sharing_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                    105, 103,
                  ],
                },
                { kind: "account", path: "pool.base_mint", account: "Pool" },
              ],
              program: {
                kind: "const",
                value: [
                  12, 53, 255, 169, 5, 90, 142, 86, 141, 168, 247, 188, 7, 86,
                  21, 39, 76, 241, 201, 44, 164, 31, 64, 0, 156, 81, 106, 164,
                  20, 194, 124, 112,
                ],
              },
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "sell",
        discriminator: [51, 230, 133, 164, 1, 127, 131, 173],
        accounts: [
          { name: "pool", writable: !0 },
          { name: "user", writable: !0, signer: !0 },
          { name: "global_config" },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          { name: "protocol_fee_recipient" },
          {
            name: "protocol_fee_recipient_token_account",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "protocol_fee_recipient" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          { name: "base_token_program" },
          { name: "quote_token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          {
            name: "program",
            address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "quote_token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "coin_creator_vault_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "pool.coin_creator", account: "Pool" },
              ],
            },
          },
          {
            name: "fee_config",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                },
                {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              ],
              program: { kind: "account", path: "fee_program" },
            },
          },
          {
            name: "fee_program",
            address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
          },
        ],
        args: [
          { name: "base_amount_in", type: "u64" },
          { name: "min_quote_amount_out", type: "u64" },
        ],
      },
      {
        name: "set_boost_authority",
        discriminator: [227, 149, 76, 42, 130, 39, 234, 205],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          { name: "boost_authority" },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "set_coin_creator",
        docs: [
          "Sets Pool::coin_creator from Metaplex metadata creator or BondingCurve::creator",
        ],
        discriminator: [210, 149, 128, 45, 188, 58, 78, 175],
        accounts: [
          { name: "pool", writable: !0 },
          {
            name: "metadata",
            pda: {
              seeds: [
                { kind: "const", value: [109, 101, 116, 97, 100, 97, 116, 97] },
                {
                  kind: "const",
                  value: [
                    11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107,
                    4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182,
                    209, 188, 3, 248, 41, 70,
                  ],
                },
                { kind: "account", path: "pool.base_mint", account: "Pool" },
              ],
              program: {
                kind: "const",
                value: [
                  11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107,
                  4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182,
                  209, 188, 3, 248, 41, 70,
                ],
              },
            },
          },
          {
            name: "bonding_curve",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                    101,
                  ],
                },
                { kind: "account", path: "pool.base_mint", account: "Pool" },
              ],
              program: {
                kind: "const",
                value: [
                  1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191, 23,
                  91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93, 43,
                  182, 253, 109, 24, 176,
                ],
              },
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "set_reserved_fee_recipients",
        discriminator: [111, 172, 162, 232, 114, 89, 213, 142],
        accounts: [
          {
            name: "global_config",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105, 103,
                  ],
                },
              ],
            },
          },
          { name: "admin", signer: !0, relations: ["global_config"] },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [{ name: "whitelist_pda", type: "pubkey" }],
      },
      {
        name: "sync_user_volume_accumulator",
        discriminator: [86, 31, 192, 87, 163, 87, 79, 238],
        accounts: [
          { name: "user" },
          {
            name: "global_volume_accumulator",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                    101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
              ],
            },
          },
          {
            name: "user_volume_accumulator",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    117, 115, 101, 114, 95, 118, 111, 108, 117, 109, 101, 95,
                    97, 99, 99, 117, 109, 117, 108, 97, 116, 111, 114,
                  ],
                },
                { kind: "account", path: "user" },
              ],
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "toggle_boost",
        discriminator: [117, 161, 160, 74, 223, 137, 118, 99],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
        ],
        args: [{ name: "enabled", type: "bool" }],
      },
      {
        name: "toggle_cashback_enabled",
        discriminator: [115, 103, 224, 255, 189, 89, 86, 195],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [{ name: "enabled", type: "bool" }],
      },
      {
        name: "toggle_mayhem_mode",
        discriminator: [1, 9, 111, 208, 100, 31, 255, 163],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [{ name: "enabled", type: "bool" }],
      },
      {
        name: "transfer_creator_fees_to_pump",
        docs: [
          "Transfer creator fees to pump creator vault",
          "If coin creator fees are currently below rent.minimum_balance(TokenAccount::LEN)",
          "The transfer will be skipped",
        ],
        discriminator: [139, 52, 134, 85, 228, 229, 108, 241],
        accounts: [
          {
            name: "wsol_mint",
            docs: ["Pump Canonical Pool are quoted in wSOL"],
          },
          { name: "token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          { name: "coin_creator" },
          {
            name: "coin_creator_vault_authority",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "coin_creator" },
              ],
            },
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "wsol_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "pump_creator_vault",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "coin_creator" },
              ],
              program: {
                kind: "const",
                value: [
                  1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191, 23,
                  91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93, 43,
                  182, 253, 109, 24, 176,
                ],
              },
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "transfer_creator_fees_to_pump_v2",
        discriminator: [1, 33, 78, 185, 33, 67, 44, 92],
        accounts: [
          { name: "payer", writable: !0, signer: !0 },
          { name: "quote_mint" },
          { name: "token_program" },
          {
            name: "system_program",
            address: "11111111111111111111111111111111",
          },
          {
            name: "associated_token_program",
            address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          },
          { name: "coin_creator" },
          {
            name: "coin_creator_vault_authority",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "coin_creator" },
              ],
            },
          },
          {
            name: "coin_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "coin_creator_vault_authority" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: {
                kind: "const",
                value: [
                  140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                  13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                  219, 233, 248, 89,
                ],
              },
            },
          },
          {
            name: "pump_creator_vault",
            writable: !0,
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116,
                  ],
                },
                { kind: "account", path: "coin_creator" },
              ],
              program: {
                kind: "const",
                value: [
                  1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191, 23,
                  91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93, 43,
                  182, 253, 109, 24, 176,
                ],
              },
            },
          },
          {
            name: "pump_creator_vault_ata",
            writable: !0,
            pda: {
              seeds: [
                { kind: "account", path: "pump_creator_vault" },
                { kind: "account", path: "token_program" },
                { kind: "account", path: "quote_mint" },
              ],
              program: { kind: "account", path: "associated_token_program" },
            },
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "update_admin",
        discriminator: [161, 176, 40, 213, 60, 184, 179, 228],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          { name: "new_admin" },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [],
      },
      {
        name: "update_buyback_config",
        discriminator: [251, 224, 171, 146, 160, 26, 113, 233],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [{ name: "buyback_basis_points", type: { option: "u64" } }],
      },
      {
        name: "update_fee_config",
        discriminator: [104, 184, 103, 242, 88, 151, 107, 20],
        accounts: [
          { name: "admin", signer: !0, relations: ["global_config"] },
          { name: "global_config", writable: !0 },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "lp_fee_basis_points", type: "u64" },
          { name: "protocol_fee_basis_points", type: "u64" },
          { name: "protocol_fee_recipients", type: { array: ["pubkey", 8] } },
          { name: "coin_creator_fee_basis_points", type: "u64" },
          { name: "admin_set_coin_creator_authority", type: "pubkey" },
        ],
      },
      {
        name: "withdraw",
        discriminator: [183, 18, 70, 156, 148, 109, 161, 34],
        accounts: [
          { name: "pool", writable: !0 },
          { name: "global_config" },
          { name: "user", signer: !0 },
          { name: "base_mint", relations: ["pool"] },
          { name: "quote_mint", relations: ["pool"] },
          { name: "lp_mint", writable: !0, relations: ["pool"] },
          { name: "user_base_token_account", writable: !0 },
          { name: "user_quote_token_account", writable: !0 },
          { name: "user_pool_token_account", writable: !0 },
          {
            name: "pool_base_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "pool_quote_token_account",
            writable: !0,
            relations: ["pool"],
          },
          {
            name: "token_program",
            address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          },
          {
            name: "token_2022_program",
            address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
          },
          {
            name: "event_authority",
            pda: {
              seeds: [
                {
                  kind: "const",
                  value: [
                    95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111,
                    114, 105, 116, 121,
                  ],
                },
              ],
            },
          },
          { name: "program" },
        ],
        args: [
          { name: "lp_token_amount_in", type: "u64" },
          { name: "min_base_amount_out", type: "u64" },
          { name: "min_quote_amount_out", type: "u64" },
        ],
      },
    ],
    accounts: [
      {
        name: "BondingCurve",
        discriminator: [23, 183, 248, 55, 96, 216, 172, 96],
      },
      {
        name: "FeeConfig",
        discriminator: [143, 52, 146, 187, 219, 123, 76, 155],
      },
      {
        name: "GlobalConfig",
        discriminator: [149, 8, 156, 202, 160, 252, 176, 217],
      },
      {
        name: "GlobalVolumeAccumulator",
        discriminator: [202, 42, 246, 43, 142, 190, 30, 255],
      },
      { name: "Pool", discriminator: [241, 154, 109, 4, 17, 177, 109, 188] },
      {
        name: "SharingConfig",
        discriminator: [216, 74, 9, 0, 56, 140, 93, 75],
      },
      {
        name: "UserVolumeAccumulator",
        discriminator: [86, 255, 112, 14, 102, 53, 154, 250],
      },
    ],
    events: [
      {
        name: "AdminSetCoinCreatorEvent",
        discriminator: [45, 220, 93, 24, 25, 97, 172, 104],
      },
      {
        name: "AdminUpdateTokenIncentivesEvent",
        discriminator: [147, 250, 108, 120, 247, 29, 67, 222],
      },
      {
        name: "BoostBuyAndBurnEvent",
        discriminator: [63, 69, 28, 22, 48, 92, 194, 185],
      },
      {
        name: "BuyEvent",
        discriminator: [103, 244, 82, 31, 44, 245, 119, 119],
      },
      {
        name: "ClaimCashbackEvent",
        discriminator: [226, 214, 246, 33, 7, 242, 147, 229],
      },
      {
        name: "ClaimTokenIncentivesEvent",
        discriminator: [79, 172, 246, 49, 205, 91, 206, 232],
      },
      {
        name: "CloseUserVolumeAccumulatorEvent",
        discriminator: [146, 159, 189, 172, 146, 88, 56, 244],
      },
      {
        name: "CollectCoinCreatorFeeEvent",
        discriminator: [232, 245, 194, 238, 234, 218, 58, 89],
      },
      {
        name: "CreateConfigEvent",
        discriminator: [107, 52, 89, 129, 55, 226, 81, 22],
      },
      {
        name: "CreatePoolEvent",
        discriminator: [177, 49, 12, 210, 160, 118, 167, 116],
      },
      {
        name: "DepositEvent",
        discriminator: [120, 248, 61, 83, 31, 142, 107, 144],
      },
      {
        name: "DisableEvent",
        discriminator: [107, 253, 193, 76, 228, 202, 27, 104],
      },
      {
        name: "ExtendAccountEvent",
        discriminator: [97, 97, 215, 144, 93, 146, 22, 124],
      },
      {
        name: "InitBoostEvent",
        discriminator: [174, 124, 74, 249, 4, 81, 246, 17],
      },
      {
        name: "InitUserVolumeAccumulatorEvent",
        discriminator: [134, 36, 13, 72, 232, 101, 130, 216],
      },
      {
        name: "MigratePoolCoinCreatorEvent",
        discriminator: [170, 221, 82, 199, 147, 165, 247, 46],
      },
      {
        name: "ReservedFeeRecipientsEvent",
        discriminator: [43, 188, 250, 18, 221, 75, 187, 95],
      },
      { name: "SellEvent", discriminator: [62, 47, 55, 10, 165, 3, 220, 42] },
      {
        name: "SetBondingCurveCoinCreatorEvent",
        discriminator: [242, 231, 235, 102, 65, 99, 189, 211],
      },
      {
        name: "SetBoostAuthorityEvent",
        discriminator: [89, 128, 240, 141, 91, 202, 71, 105],
      },
      {
        name: "SetMetaplexCoinCreatorEvent",
        discriminator: [150, 107, 199, 123, 124, 207, 102, 228],
      },
      {
        name: "SyncUserVolumeAccumulatorEvent",
        discriminator: [197, 122, 167, 124, 116, 81, 91, 255],
      },
      {
        name: "UpdateAdminEvent",
        discriminator: [225, 152, 171, 87, 246, 63, 66, 234],
      },
      {
        name: "UpdateFeeConfigEvent",
        discriminator: [90, 23, 65, 35, 62, 244, 188, 208],
      },
      {
        name: "WithdrawEvent",
        discriminator: [22, 9, 133, 26, 160, 44, 71, 192],
      },
    ],
    errors: [
      { code: 6e3, name: "FeeBasisPointsExceedsMaximum" },
      { code: 6001, name: "ZeroBaseAmount" },
      { code: 6002, name: "ZeroQuoteAmount" },
      { code: 6003, name: "TooLittlePoolTokenLiquidity" },
      { code: 6004, name: "ExceededSlippage" },
      { code: 6005, name: "InvalidAdmin" },
      { code: 6006, name: "UnsupportedBaseMint" },
      { code: 6007, name: "UnsupportedQuoteMint" },
      { code: 6008, name: "InvalidBaseMint" },
      { code: 6009, name: "InvalidQuoteMint" },
      { code: 6010, name: "InvalidLpMint" },
      { code: 6011, name: "AllProtocolFeeRecipientsShouldBeNonZero" },
      { code: 6012, name: "UnsortedNotUniqueProtocolFeeRecipients" },
      { code: 6013, name: "InvalidProtocolFeeRecipient" },
      { code: 6014, name: "InvalidPoolBaseTokenAccount" },
      { code: 6015, name: "InvalidPoolQuoteTokenAccount" },
      { code: 6016, name: "BuyMoreBaseAmountThanPoolReserves" },
      { code: 6017, name: "DisabledCreatePool" },
      { code: 6018, name: "DisabledDeposit" },
      { code: 6019, name: "DisabledWithdraw" },
      { code: 6020, name: "DisabledBuy" },
      { code: 6021, name: "DisabledSell" },
      { code: 6022, name: "SameMint" },
      { code: 6023, name: "Overflow" },
      { code: 6024, name: "Truncation" },
      { code: 6025, name: "DivisionByZero" },
      { code: 6026, name: "NewSizeLessThanCurrentSize" },
      { code: 6027, name: "AccountTypeNotSupported" },
      { code: 6028, name: "OnlyCanonicalPumpPoolsCanHaveCoinCreator" },
      { code: 6029, name: "InvalidAdminSetCoinCreatorAuthority" },
      { code: 6030, name: "StartTimeInThePast" },
      { code: 6031, name: "EndTimeInThePast" },
      { code: 6032, name: "EndTimeBeforeStartTime" },
      { code: 6033, name: "TimeRangeTooLarge" },
      { code: 6034, name: "EndTimeBeforeCurrentDay" },
      { code: 6035, name: "SupplyUpdateForFinishedRange" },
      { code: 6036, name: "DayIndexAfterEndIndex" },
      { code: 6037, name: "DayInActiveRange" },
      { code: 6038, name: "InvalidIncentiveMint" },
      {
        code: 6039,
        name: "BuyNotEnoughQuoteTokensToCoverFees",
        msg: "buy: Not enough quote tokens to cover for fees.",
      },
      {
        code: 6040,
        name: "BuySlippageBelowMinBaseAmountOut",
        msg: "buy: slippage - would buy less tokens than expected min_base_amount_out",
      },
      { code: 6041, name: "MayhemModeDisabled" },
      { code: 6042, name: "OnlyPumpPoolsMayhemMode" },
      { code: 6043, name: "MayhemModeInDesiredState" },
      { code: 6044, name: "NotEnoughRemainingAccounts" },
      { code: 6045, name: "InvalidSharingConfigBaseMint" },
      { code: 6046, name: "InvalidSharingConfigCoinCreator" },
      {
        code: 6047,
        name: "CoinCreatorMigratedToSharingConfig",
        msg: "coin creator has been migrated to sharing config, use pump_fees::reset_fee_sharing_config instead",
      },
      {
        code: 6048,
        name: "CreatorVaultMigratedToSharingConfig",
        msg: "creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead",
      },
      { code: 6049, name: "CashbackNotEnabled", msg: "Cashback is disabled" },
      { code: 6050, name: "OnlyPumpPoolsCashback" },
      { code: 6051, name: "CashbackNotInDesiredState" },
      { code: 6052, name: "TokensInVaultLessThanCashbackEarned" },
      {
        code: 6053,
        name: "BuybackFeeRecipientNotAuthorized",
        msg: "Buyback fee recipient not authorized",
      },
      { code: 6054, name: "AllBuybackFeeRecipientsShouldBeNonZero" },
      { code: 6055, name: "NotUniqueBuybackFeeRecipients" },
      {
        code: 6056,
        name: "BuybackBasisPointsOutOfRange",
        msg: "buyback_basis_points must be <= 10_000",
      },
      {
        code: 6057,
        name: "WrongBuybackFeeRecipientsCount",
        msg: "buyback fee recipients require exactly 8 remaining accounts (or none)",
      },
      { code: 6058, name: "BuybackFeeRecipientMissing" },
      {
        code: 6059,
        name: "InsufficientRealQuoteReserves",
        msg: "BOOST: sell output exceeds the real quote vault. effective = real + virtual is pricing-only; payout is capped at real_vault, so quote min(out, real_vault)",
      },
      {
        code: 6060,
        name: "BoostPoolLiquidityUnsupported",
        msg: "BOOST: deposit/withdraw don't apply to boost pools",
      },
      {
        code: 6061,
        name: "PoolCannotBoost",
        msg: "BOOST: pool cannot be boosted (no virtual reserves)",
      },
      { code: 6062, name: "BoostDisabled", msg: "BOOST: boost is disabled" },
    ],
    types: [
      {
        name: "AdminSetCoinCreatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin_set_coin_creator_authority", type: "pubkey" },
            { name: "base_mint", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "old_coin_creator", type: "pubkey" },
            { name: "new_coin_creator", type: "pubkey" },
          ],
        },
      },
      {
        name: "AdminUpdateTokenIncentivesEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "start_time", type: "i64" },
            { name: "end_time", type: "i64" },
            { name: "day_number", type: "u64" },
            { name: "token_supply_per_day", type: "u64" },
            { name: "mint", type: "pubkey" },
            { name: "seconds_in_a_day", type: "i64" },
            { name: "timestamp", type: "i64" },
          ],
        },
      },
      {
        name: "BondingCurve",
        type: {
          kind: "struct",
          fields: [
            { name: "virtual_token_reserves", type: "u64" },
            { name: "virtual_sol_reserves", type: "u64" },
            { name: "real_token_reserves", type: "u64" },
            { name: "real_sol_reserves", type: "u64" },
            { name: "token_total_supply", type: "u64" },
            { name: "complete", type: "bool" },
            { name: "creator", type: "pubkey" },
            { name: "is_mayhem_mode", type: "bool" },
            { name: "is_cashback_coin", type: "bool" },
          ],
        },
      },
      {
        name: "BoostBuyAndBurnEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "mint", type: "pubkey" },
            { name: "bonding_curve", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "authority", type: "pubkey" },
            { name: "quote_amount_in_requested", type: "u64" },
            { name: "quote_amount_in_used", type: "u64" },
            { name: "base_amount_burned", type: "u64" },
            { name: "virtual_quote_reserves", type: "i128" },
            { name: "real_quote_reserves_after", type: "u64" },
            { name: "base_reserves_after", type: "u64" },
            { name: "boost_vault_remaining", type: "u64" },
          ],
        },
      },
      {
        name: "BuyEvent",
        docs: ['ix_name: "buy" | "buy_exact_quote_in"'],
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "base_amount_out", type: "u64" },
            { name: "max_quote_amount_in", type: "u64" },
            { name: "user_base_token_reserves", type: "u64" },
            { name: "user_quote_token_reserves", type: "u64" },
            { name: "pool_base_token_reserves", type: "u64" },
            { name: "pool_quote_token_reserves", type: "u64" },
            { name: "quote_amount_in", type: "u64" },
            { name: "lp_fee_basis_points", type: "u64" },
            { name: "lp_fee", type: "u64" },
            { name: "protocol_fee_basis_points", type: "u64" },
            { name: "protocol_fee", type: "u64" },
            { name: "quote_amount_in_with_lp_fee", type: "u64" },
            { name: "user_quote_amount_in", type: "u64" },
            { name: "pool", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "user_base_token_account", type: "pubkey" },
            { name: "user_quote_token_account", type: "pubkey" },
            { name: "protocol_fee_recipient", type: "pubkey" },
            { name: "protocol_fee_recipient_token_account", type: "pubkey" },
            { name: "coin_creator", type: "pubkey" },
            { name: "coin_creator_fee_basis_points", type: "u64" },
            { name: "coin_creator_fee", type: "u64" },
            { name: "track_volume", type: "bool" },
            { name: "total_unclaimed_tokens", type: "u64" },
            { name: "total_claimed_tokens", type: "u64" },
            { name: "current_sol_volume", type: "u64" },
            { name: "last_update_timestamp", type: "i64" },
            { name: "min_base_amount_out", type: "u64" },
            { name: "ix_name", type: "string" },
            { name: "cashback_fee_basis_points", type: "u64" },
            { name: "cashback", type: "u64" },
            { name: "buyback_fee_basis_points", type: "u64" },
            { name: "buyback_fee", type: "u64" },
            { name: "virtual_quote_reserves", type: "i128" },
            { name: "can_boost", type: "bool" },
          ],
        },
      },
      {
        name: "ClaimCashbackEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "user", type: "pubkey" },
            { name: "amount", type: "u64" },
            { name: "timestamp", type: "i64" },
            { name: "total_claimed", type: "u64" },
            { name: "total_cashback_earned", type: "u64" },
          ],
        },
      },
      {
        name: "ClaimTokenIncentivesEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "user", type: "pubkey" },
            { name: "mint", type: "pubkey" },
            { name: "amount", type: "u64" },
            { name: "timestamp", type: "i64" },
            { name: "total_claimed_tokens", type: "u64" },
            { name: "current_sol_volume", type: "u64" },
          ],
        },
      },
      {
        name: "CloseUserVolumeAccumulatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "user", type: "pubkey" },
            { name: "timestamp", type: "i64" },
            { name: "total_unclaimed_tokens", type: "u64" },
            { name: "total_claimed_tokens", type: "u64" },
            { name: "current_sol_volume", type: "u64" },
            { name: "last_update_timestamp", type: "i64" },
          ],
        },
      },
      {
        name: "CollectCoinCreatorFeeEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "coin_creator", type: "pubkey" },
            { name: "coin_creator_fee", type: "u64" },
            { name: "coin_creator_vault_ata", type: "pubkey" },
            { name: "coin_creator_token_account", type: "pubkey" },
          ],
        },
      },
      {
        name: "ConfigStatus",
        type: {
          kind: "enum",
          variants: [{ name: "Paused" }, { name: "Active" }],
        },
      },
      {
        name: "CreateConfigEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin", type: "pubkey" },
            { name: "lp_fee_basis_points", type: "u64" },
            { name: "protocol_fee_basis_points", type: "u64" },
            { name: "protocol_fee_recipients", type: { array: ["pubkey", 8] } },
            { name: "coin_creator_fee_basis_points", type: "u64" },
            { name: "admin_set_coin_creator_authority", type: "pubkey" },
          ],
        },
      },
      {
        name: "CreatePoolEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "index", type: "u16" },
            { name: "creator", type: "pubkey" },
            { name: "base_mint", type: "pubkey" },
            { name: "quote_mint", type: "pubkey" },
            { name: "base_mint_decimals", type: "u8" },
            { name: "quote_mint_decimals", type: "u8" },
            { name: "base_amount_in", type: "u64" },
            { name: "quote_amount_in", type: "u64" },
            { name: "pool_base_amount", type: "u64" },
            { name: "pool_quote_amount", type: "u64" },
            { name: "minimum_liquidity", type: "u64" },
            { name: "initial_liquidity", type: "u64" },
            { name: "lp_token_amount_out", type: "u64" },
            { name: "pool_bump", type: "u8" },
            { name: "pool", type: "pubkey" },
            { name: "lp_mint", type: "pubkey" },
            { name: "user_base_token_account", type: "pubkey" },
            { name: "user_quote_token_account", type: "pubkey" },
            { name: "coin_creator", type: "pubkey" },
            { name: "is_mayhem_mode", type: "bool" },
          ],
        },
      },
      {
        name: "DepositEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "lp_token_amount_out", type: "u64" },
            { name: "max_base_amount_in", type: "u64" },
            { name: "max_quote_amount_in", type: "u64" },
            { name: "user_base_token_reserves", type: "u64" },
            { name: "user_quote_token_reserves", type: "u64" },
            { name: "pool_base_token_reserves", type: "u64" },
            { name: "pool_quote_token_reserves", type: "u64" },
            { name: "base_amount_in", type: "u64" },
            { name: "quote_amount_in", type: "u64" },
            { name: "lp_mint_supply", type: "u64" },
            { name: "pool", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "user_base_token_account", type: "pubkey" },
            { name: "user_quote_token_account", type: "pubkey" },
            { name: "user_pool_token_account", type: "pubkey" },
          ],
        },
      },
      {
        name: "DisableEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin", type: "pubkey" },
            { name: "disable_create_pool", type: "bool" },
            { name: "disable_deposit", type: "bool" },
            { name: "disable_withdraw", type: "bool" },
            { name: "disable_buy", type: "bool" },
            { name: "disable_sell", type: "bool" },
          ],
        },
      },
      {
        name: "ExtendAccountEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "account", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "current_size", type: "u64" },
            { name: "new_size", type: "u64" },
          ],
        },
      },
      {
        name: "FeeConfig",
        type: {
          kind: "struct",
          fields: [
            { name: "bump", type: "u8" },
            { name: "admin", type: "pubkey" },
            { name: "flat_fees", type: { defined: { name: "Fees" } } },
            {
              name: "fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
            {
              name: "stable_fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
          ],
        },
      },
      {
        name: "FeeTier",
        type: {
          kind: "struct",
          fields: [
            { name: "market_cap_lamports_threshold", type: "u128" },
            { name: "fees", type: { defined: { name: "Fees" } } },
          ],
        },
      },
      {
        name: "Fees",
        type: {
          kind: "struct",
          fields: [
            { name: "lp_fee_bps", type: "u64" },
            { name: "protocol_fee_bps", type: "u64" },
            { name: "creator_fee_bps", type: "u64" },
          ],
        },
      },
      {
        name: "GlobalConfig",
        type: {
          kind: "struct",
          fields: [
            { name: "admin", docs: ["The admin pubkey"], type: "pubkey" },
            { name: "lp_fee_basis_points", type: "u64" },
            { name: "protocol_fee_basis_points", type: "u64" },
            {
              name: "disable_flags",
              docs: [
                "Flags to disable certain functionality",
                "bit 0 - Disable create pool",
                "bit 1 - Disable deposit",
                "bit 2 - Disable withdraw",
                "bit 3 - Disable buy",
                "bit 4 - Disable sell",
              ],
              type: "u8",
            },
            {
              name: "protocol_fee_recipients",
              docs: ["Addresses of the protocol fee recipients"],
              type: { array: ["pubkey", 8] },
            },
            { name: "coin_creator_fee_basis_points", type: "u64" },
            {
              name: "admin_set_coin_creator_authority",
              docs: ["The admin authority for setting coin creators"],
              type: "pubkey",
            },
            { name: "whitelist_pda", type: "pubkey" },
            { name: "reserved_fee_recipient", type: "pubkey" },
            { name: "mayhem_mode_enabled", type: "bool" },
            { name: "reserved_fee_recipients", type: { array: ["pubkey", 7] } },
            { name: "is_cashback_enabled", type: "bool" },
            { name: "buyback_fee_recipients", type: { array: ["pubkey", 8] } },
            { name: "buyback_basis_points", type: "u64" },
            { name: "boost_authority", type: "pubkey" },
            { name: "boost_enabled", type: "bool" },
          ],
        },
      },
      {
        name: "GlobalVolumeAccumulator",
        type: {
          kind: "struct",
          fields: [
            { name: "start_time", type: "i64" },
            { name: "end_time", type: "i64" },
            { name: "seconds_in_a_day", type: "i64" },
            { name: "mint", type: "pubkey" },
            { name: "total_token_supply", type: { array: ["u64", 30] } },
            { name: "sol_volumes", type: { array: ["u64", 30] } },
          ],
        },
      },
      {
        name: "InitBoostEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "mint", type: "pubkey" },
            { name: "bonding_curve", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "virtual_quote_reserves", type: "i128" },
            { name: "real_quote_reserves_after", type: "u64" },
          ],
        },
      },
      {
        name: "InitUserVolumeAccumulatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "payer", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "timestamp", type: "i64" },
          ],
        },
      },
      {
        name: "MigratePoolCoinCreatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "base_mint", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "sharing_config", type: "pubkey" },
            { name: "old_coin_creator", type: "pubkey" },
            { name: "new_coin_creator", type: "pubkey" },
          ],
        },
      },
      { name: "OptionBool", type: { kind: "struct", fields: ["bool"] } },
      {
        name: "Pool",
        type: {
          kind: "struct",
          fields: [
            { name: "pool_bump", type: "u8" },
            { name: "index", type: "u16" },
            { name: "creator", type: "pubkey" },
            { name: "base_mint", type: "pubkey" },
            { name: "quote_mint", type: "pubkey" },
            { name: "lp_mint", type: "pubkey" },
            { name: "pool_base_token_account", type: "pubkey" },
            { name: "pool_quote_token_account", type: "pubkey" },
            {
              name: "lp_supply",
              docs: ["True circulating supply without burns and lock-ups"],
              type: "u64",
            },
            { name: "coin_creator", type: "pubkey" },
            { name: "is_mayhem_mode", type: "bool" },
            { name: "is_cashback_coin", type: "bool" },
            {
              name: "virtual_quote_reserves",
              docs: [
                "For non-boost pools, value is 0, so the behavior is identical to legacy pools.",
              ],
              type: "i128",
            },
          ],
        },
      },
      {
        name: "ReservedFeeRecipientsEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "reserved_fee_recipient", type: "pubkey" },
            { name: "reserved_fee_recipients", type: { array: ["pubkey", 7] } },
          ],
        },
      },
      {
        name: "SellEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "base_amount_in", type: "u64" },
            { name: "min_quote_amount_out", type: "u64" },
            { name: "user_base_token_reserves", type: "u64" },
            { name: "user_quote_token_reserves", type: "u64" },
            { name: "pool_base_token_reserves", type: "u64" },
            { name: "pool_quote_token_reserves", type: "u64" },
            { name: "quote_amount_out", type: "u64" },
            { name: "lp_fee_basis_points", type: "u64" },
            { name: "lp_fee", type: "u64" },
            { name: "protocol_fee_basis_points", type: "u64" },
            { name: "protocol_fee", type: "u64" },
            { name: "quote_amount_out_without_lp_fee", type: "u64" },
            { name: "user_quote_amount_out", type: "u64" },
            { name: "pool", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "user_base_token_account", type: "pubkey" },
            { name: "user_quote_token_account", type: "pubkey" },
            { name: "protocol_fee_recipient", type: "pubkey" },
            { name: "protocol_fee_recipient_token_account", type: "pubkey" },
            { name: "coin_creator", type: "pubkey" },
            { name: "coin_creator_fee_basis_points", type: "u64" },
            { name: "coin_creator_fee", type: "u64" },
            { name: "cashback_fee_basis_points", type: "u64" },
            { name: "cashback", type: "u64" },
            { name: "buyback_fee_basis_points", type: "u64" },
            { name: "buyback_fee", type: "u64" },
            { name: "virtual_quote_reserves", type: "i128" },
            { name: "can_boost", type: "bool" },
          ],
        },
      },
      {
        name: "SetBondingCurveCoinCreatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "base_mint", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "bonding_curve", type: "pubkey" },
            { name: "coin_creator", type: "pubkey" },
          ],
        },
      },
      {
        name: "SetBoostAuthorityEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin", type: "pubkey" },
            { name: "old_boost_authority", type: "pubkey" },
            { name: "new_boost_authority", type: "pubkey" },
          ],
        },
      },
      {
        name: "SetMetaplexCoinCreatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "base_mint", type: "pubkey" },
            { name: "pool", type: "pubkey" },
            { name: "metadata", type: "pubkey" },
            { name: "coin_creator", type: "pubkey" },
          ],
        },
      },
      {
        name: "Shareholder",
        type: {
          kind: "struct",
          fields: [
            { name: "address", type: "pubkey" },
            { name: "share_bps", type: "u16" },
          ],
        },
      },
      {
        name: "SharingConfig",
        type: {
          kind: "struct",
          fields: [
            { name: "bump", type: "u8" },
            { name: "version", type: "u8" },
            { name: "status", type: { defined: { name: "ConfigStatus" } } },
            { name: "mint", type: "pubkey" },
            { name: "admin", type: "pubkey" },
            { name: "admin_revoked", type: "bool" },
            {
              name: "shareholders",
              type: { vec: { defined: { name: "Shareholder" } } },
            },
          ],
        },
      },
      {
        name: "SyncUserVolumeAccumulatorEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "user", type: "pubkey" },
            { name: "total_claimed_tokens_before", type: "u64" },
            { name: "total_claimed_tokens_after", type: "u64" },
            { name: "timestamp", type: "i64" },
          ],
        },
      },
      {
        name: "UpdateAdminEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin", type: "pubkey" },
            { name: "new_admin", type: "pubkey" },
          ],
        },
      },
      {
        name: "UpdateFeeConfigEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "admin", type: "pubkey" },
            { name: "lp_fee_basis_points", type: "u64" },
            { name: "protocol_fee_basis_points", type: "u64" },
            { name: "protocol_fee_recipients", type: { array: ["pubkey", 8] } },
            { name: "coin_creator_fee_basis_points", type: "u64" },
            { name: "admin_set_coin_creator_authority", type: "pubkey" },
          ],
        },
      },
      {
        name: "UserVolumeAccumulator",
        type: {
          kind: "struct",
          fields: [
            { name: "user", type: "pubkey" },
            { name: "needs_claim", type: "bool" },
            { name: "total_unclaimed_tokens", type: "u64" },
            { name: "total_claimed_tokens", type: "u64" },
            { name: "current_sol_volume", type: "u64" },
            { name: "last_update_timestamp", type: "i64" },
            { name: "has_total_claimed_tokens", type: "bool" },
            { name: "cashback_earned", type: "u64" },
            { name: "total_cashback_claimed", type: "u64" },
          ],
        },
      },
      {
        name: "WithdrawEvent",
        type: {
          kind: "struct",
          fields: [
            { name: "timestamp", type: "i64" },
            { name: "lp_token_amount_in", type: "u64" },
            { name: "min_base_amount_out", type: "u64" },
            { name: "min_quote_amount_out", type: "u64" },
            { name: "user_base_token_reserves", type: "u64" },
            { name: "user_quote_token_reserves", type: "u64" },
            { name: "pool_base_token_reserves", type: "u64" },
            { name: "pool_quote_token_reserves", type: "u64" },
            { name: "base_amount_out", type: "u64" },
            { name: "quote_amount_out", type: "u64" },
            { name: "lp_mint_supply", type: "u64" },
            { name: "pool", type: "pubkey" },
            { name: "user", type: "pubkey" },
            { name: "user_base_token_account", type: "pubkey" },
            { name: "user_quote_token_account", type: "pubkey" },
            { name: "user_pool_token_account", type: "pubkey" },
          ],
        },
      },
    ],
  };
  function N(e, t) {
    if (t.isZero()) throw Error("Cannot divide by zero.");
    return e.add(t).subn(1).div(t);
  }
  function V(e, t) {
    return N(e.mul(t), new i.default(1e4));
  }
  function G(e) {
    return new c.v(O, new c.F(e, null, {}));
  }
  function D(e, t, n, o, a) {
    if (t < 0 || t > 100)
      throw Error("Slippage must be between 0 and 100 (0% to 100%)");
    let r = e.mul(o).div(n),
      u = new i.default((1 + t / 100) * 1e9),
      s = e.mul(u).div(new i.default(1e9)),
      c = r.mul(u).div(new i.default(1e9));
    return { token1: r, lpToken: e.mul(a).div(n), maxToken0: s, maxToken1: c };
  }
  function W(e, t) {
    return e.add(t).sub(new i.default(1)).div(t);
  }
  function z({
    globalConfig: e,
    feeConfig: t,
    creator: n,
    baseMintSupply: o,
    baseMint: a,
    baseReserve: r,
    quoteReserve: i,
    tradeSize: u,
  }) {
    if (null != t) {
      let e = (function ({
        baseMintSupply: e,
        baseReserve: t,
        quoteReserve: n,
      }) {
        if (t.isZero())
          throw Error(
            "Division by zero: pool base token reserves cannot be zero",
          );
        return n.mul(e).div(t);
      })({ baseMintSupply: o, baseReserve: r, quoteReserve: i });
      return (function ({ feeConfig: e, isPumpPool: t, marketCap: n }) {
        return t
          ? (function ({ feeTiers: e, marketCap: t }) {
              let n = e[0];
              if (t.lt(n.marketCapLamportsThreshold)) return n.fees;
              for (let n of e.slice().reverse())
                if (t.gte(n.marketCapLamportsThreshold)) return n.fees;
              return n.fees;
            })({ feeTiers: e.feeTiers, marketCap: n })
          : e.flatFees;
      })({
        feeConfig: t,
        isPumpPool: M(a).equals(n),
        marketCap: e,
        tradeSize: u,
      });
    }
    return {
      lpFeeBps: e.lpFeeBasisPoints,
      protocolFeeBps: e.protocolFeeBasisPoints,
      creatorFeeBps: e.coinCreatorFeeBasisPoints,
    };
  }
  function $({
    base: e,
    slippage: t,
    baseReserve: n,
    quoteReserve: o,
    virtualQuoteReserves: a = new i.default(0),
    globalConfig: u,
    baseMintAccount: s,
    baseMint: c,
    coinCreator: l,
    creator: m,
    feeConfig: p,
  }) {
    if (n.isZero() || o.isZero())
      throw Error(
        "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
      );
    if (e.gt(n))
      throw Error("Cannot buy more base tokens than the pool reserves.");
    let d = o.add(a),
      f = d.mul(e),
      _ = n.sub(e);
    if (_.isZero()) throw Error("Pool would be depleted; denominator is zero.");
    let y = N(f, _),
      {
        lpFeeBps: h,
        protocolFeeBps: b,
        creatorFeeBps: g,
      } = z({
        globalConfig: u,
        feeConfig: p,
        creator: m,
        baseMintSupply: new i.default(s.supply.toString()),
        baseMint: c,
        baseReserve: n,
        quoteReserve: d,
        tradeSize: y,
      }),
      k = V(y, h),
      v = V(y, b),
      w = r.PublicKey.default.equals(l) ? new i.default(0) : V(y, g),
      A = y.add(k).add(v).add(w),
      E = new i.default(1e9),
      B = new i.default(Math.floor((1 + t / 100) * 1e9)),
      P = A.mul(B).div(E);
    return { internalQuoteAmount: y, uiQuote: A, maxQuote: P };
  }
  function Q({
    quote: e,
    slippage: t,
    baseReserve: n,
    quoteReserve: o,
    virtualQuoteReserves: a = new i.default(0),
    globalConfig: u,
    baseMintAccount: s,
    baseMint: c,
    coinCreator: l,
    creator: m,
    feeConfig: p,
  }) {
    if (n.isZero() || o.isZero())
      throw Error(
        "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
      );
    let d = o.add(a),
      {
        lpFeeBps: f,
        protocolFeeBps: _,
        creatorFeeBps: y,
      } = z({
        globalConfig: u,
        feeConfig: p,
        creator: m,
        baseMintSupply: new i.default(s.supply.toString()),
        baseMint: c,
        baseReserve: n,
        quoteReserve: d,
        tradeSize: e,
      }),
      h = f.add(_).add(r.PublicKey.default.equals(l) ? new i.default(0) : y),
      b = new i.default(1e4).add(h),
      g = e.mul(new i.default(1e4)).div(b),
      k = V(g, f),
      v = V(g, _),
      w = r.PublicKey.default.equals(l) ? new i.default(0) : V(g, y),
      A = g.add(k).add(v).add(w);
    A.gt(e) && (g = g.sub(A.sub(e)));
    let E = g.subn(1),
      B = n.mul(E),
      P = d.add(E);
    if (P.isZero()) throw Error("Pool would be depleted; denominator is zero.");
    let q = B.div(P),
      I = new i.default(1e9),
      C = new i.default(Math.floor((1 + t / 100) * 1e9));
    return { base: q, internalQuoteWithoutFees: g, maxQuote: e.mul(C).div(I) };
  }
  function j({
    base: e,
    slippage: t,
    baseReserve: n,
    quoteReserve: o,
    virtualQuoteReserves: a = new i.default(0),
    globalConfig: u,
    baseMintAccount: s,
    baseMint: c,
    coinCreator: l,
    creator: m,
    feeConfig: p,
  }) {
    if (n.isZero() || o.isZero())
      throw Error(
        "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
      );
    let d = o.add(a),
      f = d.mul(e).div(n.add(e)),
      {
        lpFeeBps: _,
        protocolFeeBps: y,
        creatorFeeBps: h,
      } = z({
        globalConfig: u,
        feeConfig: p,
        creator: m,
        baseMintSupply: new i.default(s.supply.toString()),
        baseMint: c,
        baseReserve: n,
        quoteReserve: d,
        tradeSize: f,
      }),
      b = V(f, _),
      g = V(f, y),
      k = r.PublicKey.default.equals(l) ? new i.default(0) : V(f, h);
    if (o.lt(f.sub(b)))
      throw Error("Insufficient real quote reserves to cover the sell output.");
    let v = f.sub(b).sub(g).sub(k);
    if (v.isNeg())
      throw Error("Fees exceed total output; final quote is negative.");
    let w = new i.default(1e9),
      A = new i.default(Math.floor((1 - t / 100) * 1e9)),
      E = v.mul(A).div(w);
    return { uiQuote: v, minQuote: E, internalQuoteAmountOut: f };
  }
  var Z = new i.default(1e4);
  function H(e, t) {
    return e.length >= t
      ? e
      : a.Buffer.concat([e, a.Buffer.alloc(t - e.length)]);
  }
  var K = G(null),
    J = new (class {
      constructor() {
        this.offlineProgram = K;
      }
      decodeGlobalConfig(e) {
        return this.offlineProgram.coder.accounts.decode(
          "globalConfig",
          H(e.data, this.offlineProgram.account.globalConfig.size),
        );
      }
      decodeFeeConfig(e) {
        return this.offlineProgram.coder.accounts.decode(
          "feeConfig",
          H(e.data, this.offlineProgram.account.feeConfig.size),
        );
      }
      decodePool(e) {
        return this.offlineProgram.coder.accounts.decode(
          "pool",
          H(e.data, this.offlineProgram.account.pool.size),
        );
      }
      decodePoolNullable(e) {
        try {
          return this.decodePool(e);
        } catch (e) {
          return (console.warn("Failed to decode pool account", e), null);
        }
      }
      decodeGlobalVolumeAccumulator(e) {
        return this.offlineProgram.coder.accounts.decode(
          "globalVolumeAccumulator",
          e.data,
        );
      }
      decodeUserVolumeAccumulator(e) {
        return this.offlineProgram.coder.accounts.decode(
          "userVolumeAccumulator",
          e.data,
        );
      }
      decodeUserVolumeAccumulatorNullable(e) {
        try {
          return this.decodeUserVolumeAccumulator(e);
        } catch (e) {
          return (
            console.warn("Failed to decode user volume accumulator", e),
            null
          );
        }
      }
      async createPoolInstructions(e, t, n) {
        let {
          index: o,
          creator: a,
          baseMint: i,
          quoteMint: u,
          poolKey: s,
          baseTokenProgram: c,
          quoteTokenProgram: l,
          userBaseTokenAccount: p,
          userQuoteTokenAccount: d,
          poolBaseTokenAccount: f,
          poolQuoteTokenAccount: _,
          userBaseAccountInfo: y,
          userQuoteAccountInfo: h,
          poolBaseAccountInfo: b,
          poolQuoteAccountInfo: g,
        } = e;
        return await this.withWsolAccounts(
          a,
          i,
          p,
          this.accountExists(y, c),
          t,
          u,
          d,
          this.accountExists(h, l),
          n,
          async () => {
            let e = [];
            return (
              this.accountExists(b, c) || e.push((0, m.f)(a, f, s, i, c)),
              this.accountExists(g, l) || e.push((0, m.f)(a, _, s, u, l)),
              e.push(
                await this.offlineProgram.methods
                  .createPool(o, t, n, r.SystemProgram.programId, !1, { 0: !1 })
                  .accountsPartial({
                    globalConfig: I,
                    baseMint: i,
                    quoteMint: u,
                    creator: a,
                    userBaseTokenAccount: p,
                    userQuoteTokenAccount: d,
                    baseTokenProgram: c,
                    quoteTokenProgram: l,
                  })
                  .instruction(),
              ),
              e
            );
          },
        );
      }
      async depositInstructionsInternal(e, t, n, o) {
        let {
            pool: a,
            user: r,
            userPoolAccountInfo: i,
            userBaseTokenAccount: u,
            userQuoteTokenAccount: c,
            userPoolTokenAccount: l,
            userBaseAccountInfo: p,
            userQuoteAccountInfo: d,
            baseTokenProgram: f,
            quoteTokenProgram: _,
          } = e,
          { baseMint: y, quoteMint: h, lpMint: b } = a,
          g = this.liquidityAccounts(e);
        return await this.withFixPoolInstructions(
          e,
          async () =>
            await this.withWsolAccounts(
              r,
              y,
              u,
              this.accountExists(p, f),
              n,
              h,
              c,
              this.accountExists(d, _),
              o,
              async () => {
                let e = [];
                return (
                  this.accountExists(i, s.S) ||
                    e.push((0, m.f)(r, l, r, b, s.S)),
                  e.push(
                    await this.offlineProgram.methods
                      .deposit(t, n, o)
                      .accounts(g)
                      .instruction(),
                  ),
                  e
                );
              },
            ),
        );
      }
      async withWsolAccounts(e, t, n, o, a, r, i, u, s, c) {
        return await this.withWsolAccount(e, e, t, n, o, a, async () =>
          this.withWsolAccount(e, e, r, i, u, s, c),
        );
      }
      async withWsolAccount(e, t, n, o, a, i, u, c = !0) {
        let l = [];
        return (
          n.equals(s.w) &&
            (a || l.push((0, m.f)(e, o, t, s.w)),
            i.gtn(0) &&
              l.push(
                r.SystemProgram.transfer({
                  fromPubkey: t,
                  toPubkey: o,
                  lamports: BigInt(i.toString()),
                }),
                (0, d.f)(o),
              )),
          l.push(...(await u())),
          n.equals(s.w) && c && l.push((0, p.f)(o, t, t, void 0, s.z)),
          l
        );
      }
      accountExists(e, t) {
        return null !== e && e.owner.equals(t);
      }
      depositBaseInput(e, t, n) {
        let { pool: o, poolBaseTokenAccount: a, poolQuoteTokenAccount: r } = e,
          {
            token1: u,
            lpToken: s,
            maxToken0: c,
            maxToken1: l,
          } = D(
            t,
            n,
            new i.default(a.amount.toString()),
            new i.default(r.amount.toString()),
            o.lpSupply,
          );
        return { quote: u, lpToken: s, maxBase: c, maxQuote: l };
      }
      depositQuoteInput(e, t, n) {
        let { pool: o, poolBaseTokenAccount: a, poolQuoteTokenAccount: r } = e,
          {
            token1: u,
            lpToken: s,
            maxToken0: c,
            maxToken1: l,
          } = D(
            t,
            n,
            new i.default(r.amount.toString()),
            new i.default(a.amount.toString()),
            o.lpSupply,
          );
        return { base: u, lpToken: s, maxBase: l, maxQuote: c };
      }
      async withdrawInstructionsInternal(e, t, n, o) {
        let {
            pool: a,
            baseTokenProgram: r,
            quoteTokenProgram: i,
            user: u,
            userBaseAccountInfo: c,
            userQuoteAccountInfo: l,
            userBaseTokenAccount: d,
            userQuoteTokenAccount: f,
          } = e,
          { baseMint: _, quoteMint: y } = a,
          h = this.liquidityAccounts(e);
        return await this.withFixPoolInstructions(e, async () => {
          let e = [],
            a = !1;
          !this.accountExists(c, r) &&
            (e.push((0, m.f)(u, d, u, _, r)), _.equals(s.w) && (a = !0));
          let b = !1;
          return (
            !this.accountExists(l, i) &&
              (e.push((0, m.f)(u, f, u, y, i)), y.equals(s.w) && (b = !0)),
            e.push(
              await this.offlineProgram.methods
                .withdraw(t, n, o)
                .accounts(h)
                .instruction(),
            ),
            a && e.push((0, p.f)(d, u, u, void 0, s.z)),
            b && e.push((0, p.f)(f, u, u, void 0, s.z)),
            e
          );
        });
      }
      withdrawInputs(e, t, n) {
        let { pool: o, poolBaseTokenAccount: a, poolQuoteTokenAccount: r } = e;
        return (function (e, t, n, o, a) {
          if (e.isZero() || a.isZero())
            throw Error("LP amount or total LP tokens cannot be zero.");
          let r = n.mul(e).div(a),
            u = o.mul(e).div(a),
            s = new i.default(1e9),
            c = new i.default((1 - t / 100) * 1e9),
            l = r.mul(c).div(s),
            m = u.mul(c).div(s);
          return { base: r, quote: u, minBase: l, minQuote: m };
        })(
          t,
          n,
          new i.default(a.amount.toString()),
          new i.default(r.amount.toString()),
          o.lpSupply,
        );
      }
      liquidityAccounts(e) {
        let {
            poolKey: t,
            pool: n,
            user: o,
            userBaseTokenAccount: a,
            userQuoteTokenAccount: r,
            userPoolTokenAccount: i,
          } = e,
          {
            baseMint: u,
            quoteMint: c,
            lpMint: l,
            poolBaseTokenAccount: m,
            poolQuoteTokenAccount: p,
          } = n;
        return {
          pool: t,
          globalConfig: I,
          user: o,
          baseMint: u,
          quoteMint: c,
          lpMint: l,
          userBaseTokenAccount: a,
          userQuoteTokenAccount: r,
          userPoolTokenAccount: i,
          poolBaseTokenAccount: m,
          poolQuoteTokenAccount: p,
          tokenProgram: s.z,
          token2022Program: s.S,
          eventAuthority: C,
          program: B,
        };
      }
      async buyInstructions(e, t, n) {
        return await this.withFixPoolInstructions(
          e,
          async () => await this.buyInstructionsNoPool(e, t, n),
        );
      }
      async buyInstructionsNoPool(e, t, n) {
        let { userBaseAccountInfo: o, userQuoteAccountInfo: a, pool: i } = e,
          c = this.swapAccounts(e),
          {
            user: l,
            baseMint: d,
            quoteMint: f,
            userBaseTokenAccount: _,
            userQuoteTokenAccount: y,
            baseTokenProgram: h,
            quoteTokenProgram: b,
            buybackFeeRecipient: g,
            buybackFeeRecipientTokenAccount: k,
          } = c,
          v = L(i.baseMint);
        return this.withWsolAccount(
          l,
          l,
          f,
          y,
          this.accountExists(a, b),
          n,
          async () => {
            let e = [];
            this.accountExists(o, h) || e.push((0, m.f)(l, _, l, d, h));
            let a = [];
            return (
              i.isCashbackCoin &&
                a.push({
                  pubkey: (0, u.h)(f, R(l), !0, b),
                  isWritable: !0,
                  isSigner: !1,
                }),
              i.coinCreator.equals(r.PublicKey.default) ||
                a.push({ pubkey: v, isWritable: !1, isSigner: !1 }),
              a.push(
                { pubkey: g, isWritable: !1, isSigner: !1 },
                { pubkey: k, isWritable: !0, isSigner: !1 },
              ),
              e.push(
                await this.offlineProgram.methods
                  .buy(t, n, { 0: !0 })
                  .accounts(c)
                  .remainingAccounts([...a])
                  .instruction(),
              ),
              d.equals(s.w) && e.push((0, p.f)(_, l, l, void 0, s.z)),
              e
            );
          },
        );
      }
      async buyBaseInput(e, t, n) {
        let {
            baseMint: o,
            baseMintAccount: a,
            feeConfig: r,
            globalConfig: i,
            pool: u,
            poolBaseAmount: s,
            poolQuoteAmount: c,
          } = e,
          { coinCreator: l, creator: m } = u,
          { maxQuote: p } = $({
            base: t,
            slippage: n,
            baseReserve: s,
            quoteReserve: c,
            virtualQuoteReserves: u.virtualQuoteReserves,
            baseMintAccount: a,
            baseMint: o,
            coinCreator: l,
            creator: m,
            feeConfig: r,
            globalConfig: i,
          });
        return this.buyInstructions(e, t, p);
      }
      async buyQuoteInput(e, t, n) {
        let {
            baseMint: o,
            baseMintAccount: a,
            feeConfig: r,
            globalConfig: i,
            pool: u,
            poolBaseAmount: s,
            poolQuoteAmount: c,
          } = e,
          { coinCreator: l, creator: m } = u,
          { base: p, maxQuote: d } = Q({
            quote: t,
            slippage: n,
            baseReserve: s,
            quoteReserve: c,
            virtualQuoteReserves: u.virtualQuoteReserves,
            baseMintAccount: a,
            baseMint: o,
            coinCreator: l,
            creator: m,
            feeConfig: r,
            globalConfig: i,
          });
        return this.buyInstructions(e, p, d);
      }
      async sellInstructions(e, t, n) {
        return await this.withFixPoolInstructions(
          e,
          async () => await this.sellInstructionsNoPool(e, t, n),
        );
      }
      async withFixPoolInstructions(e, t) {
        let { poolAccountInfo: n, poolKey: o, user: a } = e,
          r = [];
        return (
          (null === n || n.data.length < 300) &&
            r.push(
              await this.offlineProgram.methods
                .extendAccount()
                .accountsPartial({ account: o, user: a })
                .instruction(),
            ),
          [...r, ...(await t())]
        );
      }
      async sellInstructionsNoPool(e, t, n) {
        let { userBaseAccountInfo: o, userQuoteAccountInfo: a, pool: i } = e,
          c = this.swapAccounts(e),
          l = L(i.baseMint),
          {
            user: d,
            baseMint: f,
            quoteMint: _,
            userBaseTokenAccount: y,
            userQuoteTokenAccount: h,
            baseTokenProgram: b,
            quoteTokenProgram: g,
            buybackFeeRecipient: k,
            buybackFeeRecipientTokenAccount: v,
          } = c;
        return this.withWsolAccount(
          d,
          d,
          f,
          y,
          this.accountExists(o, b),
          t,
          async () => {
            let e = [];
            this.accountExists(a, g) || e.push((0, m.f)(d, h, d, _, g));
            let o = [];
            return (
              i.isCashbackCoin &&
                o.push(
                  {
                    pubkey: (0, u.h)(_, R(d), !0, g),
                    isWritable: !0,
                    isSigner: !1,
                  },
                  { pubkey: R(d), isWritable: !0, isSigner: !1 },
                ),
              i.coinCreator.equals(r.PublicKey.default) ||
                o.push({ pubkey: l, isWritable: !1, isSigner: !1 }),
              o.push(
                { pubkey: k, isWritable: !1, isSigner: !1 },
                { pubkey: v, isWritable: !0, isSigner: !1 },
              ),
              e.push(
                await this.offlineProgram.methods
                  .sell(t, n)
                  .accounts(c)
                  .remainingAccounts([...o])
                  .instruction(),
              ),
              _.equals(s.w) && e.push((0, p.f)(h, d, d, void 0, s.z)),
              e
            );
          },
        );
      }
      async sellBaseInput(e, t, n) {
        let {
            baseMint: o,
            baseMintAccount: a,
            feeConfig: r,
            globalConfig: i,
            pool: u,
            poolBaseAmount: s,
            poolQuoteAmount: c,
          } = e,
          { coinCreator: l, creator: m } = u,
          { minQuote: p } = j({
            base: t,
            slippage: n,
            baseReserve: s,
            quoteReserve: c,
            virtualQuoteReserves: u.virtualQuoteReserves,
            baseMintAccount: a,
            baseMint: o,
            coinCreator: l,
            creator: m,
            feeConfig: r,
            globalConfig: i,
          });
        return this.sellInstructions(e, t, p);
      }
      async sellQuoteInput(e, t, n) {
        let {
            baseMint: o,
            baseMintAccount: a,
            feeConfig: u,
            globalConfig: s,
            pool: c,
            poolBaseAmount: l,
            poolQuoteAmount: m,
          } = e,
          { coinCreator: p, creator: d } = c,
          { base: f, minQuote: _ } = (function ({
            quote: e,
            slippage: t,
            baseReserve: n,
            quoteReserve: o,
            virtualQuoteReserves: a = new i.default(0),
            globalConfig: u,
            baseMintAccount: s,
            baseMint: c,
            coinCreator: l,
            creator: m,
            feeConfig: p,
          }) {
            var d;
            let f, _;
            if (n.isZero() || o.isZero())
              throw Error(
                "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
              );
            if (e.gt(o))
              throw Error(
                "Cannot receive more quote tokens than the pool quote reserves.",
              );
            let y = o.add(a),
              {
                lpFeeBps: h,
                protocolFeeBps: b,
                creatorFeeBps: g,
              } = z({
                globalConfig: u,
                feeConfig: p,
                creator: m,
                baseMintSupply: new i.default(s.supply.toString()),
                baseMint: c,
                baseReserve: n,
                quoteReserve: y,
                tradeSize: e,
              }),
              k =
                ((d = r.PublicKey.default.equals(l) ? new i.default(0) : g),
                (f = h.add(b).add(d)),
                (_ = Z.sub(f)),
                N(e.mul(Z), _));
            if (k.gte(y))
              throw Error(
                "Invalid input: Desired quote amount exceeds available reserve.",
              );
            let v = N(n.mul(k), y.sub(k)),
              w = new i.default(1e9),
              A = new i.default(Math.floor((1 - t / 100) * 1e9));
            return { internalRawQuote: k, base: v, minQuote: e.mul(A).div(w) };
          })({
            quote: t,
            slippage: n,
            baseReserve: l,
            quoteReserve: m,
            virtualQuoteReserves: c.virtualQuoteReserves,
            baseMintAccount: a,
            baseMint: o,
            coinCreator: p,
            creator: d,
            feeConfig: u,
            globalConfig: s,
          });
        return this.sellInstructions(e, f, _);
      }
      async extendAccount(e, t) {
        return this.offlineProgram.methods
          .extendAccount()
          .accountsPartial({ account: e, user: t })
          .instruction();
      }
      async boostBuyAndBurnInstruction(e, t, n, o, a, r, i) {
        var s;
        let c = q([A.Buffer.from("boost_vault"), e.toBuffer()]);
        return this.offlineProgram.methods
          .boostBuyAndBurn(o, a)
          .accountsPartial({
            pool: e,
            authority: n,
            globalConfig: I,
            baseMint: t.baseMint,
            quoteMint: t.quoteMint,
            poolBaseTokenAccount: t.poolBaseTokenAccount,
            poolQuoteTokenAccount: t.poolQuoteTokenAccount,
            boostVaultAuthority: c,
            boostVault: ((s = t.quoteMint), (0, u.h)(s, c, !0, i)),
            baseTokenProgram: r,
            quoteTokenProgram: i,
          })
          .instruction();
      }
      async collectCoinCreatorFee(e, t) {
        let {
            coinCreator: n,
            quoteMint: o,
            quoteTokenProgram: a,
            coinCreatorVaultAuthority: r,
            coinCreatorVaultAta: u,
            coinCreatorTokenAccount: s,
            coinCreatorVaultAtaAccountInfo: c,
            coinCreatorTokenAccountInfo: l,
          } = e,
          m = t ?? n,
          p = n.equals(m);
        return await this.withWsolAccount(
          m,
          r,
          o,
          u,
          this.accountExists(c, a),
          new i.default(0),
          async () =>
            await this.withWsolAccount(
              m,
              n,
              o,
              s,
              this.accountExists(l, a),
              new i.default(0),
              async () => [
                await this.offlineProgram.methods
                  .collectCoinCreatorFee()
                  .accountsPartial({
                    coinCreator: n,
                    coinCreatorTokenAccount: s,
                    quoteMint: o,
                    quoteTokenProgram: a,
                  })
                  .instruction(),
              ],
              p,
            ),
          !1,
        );
      }
      async setCoinCreator(e) {
        return this.offlineProgram.methods
          .setCoinCreator()
          .accountsPartial({ pool: e })
          .instruction();
      }
      swapAccounts(e) {
        let {
            globalConfig: t,
            poolKey: n,
            pool: o,
            baseTokenProgram: a,
            quoteTokenProgram: i,
            user: c,
            userBaseTokenAccount: l,
            userQuoteTokenAccount: m,
          } = e,
          p = (function (e, t) {
            if (!t)
              return e.protocolFeeRecipients[
                Math.floor(Math.random() * e.protocolFeeRecipients.length)
              ];
            {
              let t = [e.reservedFeeRecipient, ...e.reservedFeeRecipients];
              return t[Math.floor(Math.random() * t.length)];
            }
          })(t, o.isMayhemMode),
          d =
            t.buybackFeeRecipients[
              Math.floor(Math.random() * t.buybackFeeRecipients.length)
            ],
          {
            baseMint: f,
            quoteMint: _,
            poolBaseTokenAccount: y,
            poolQuoteTokenAccount: h,
            coinCreator: b,
          } = o,
          g = U(b);
        return {
          pool: n,
          globalConfig: I,
          user: c,
          baseMint: f,
          quoteMint: _,
          userBaseTokenAccount: l,
          userQuoteTokenAccount: m,
          poolBaseTokenAccount: y,
          poolQuoteTokenAccount: h,
          protocolFeeRecipient: p,
          protocolFeeRecipientTokenAccount: (0, u.h)(_, p, !0, i),
          buybackFeeRecipient: d,
          buybackFeeRecipientTokenAccount: (0, u.h)(_, d, !0, i),
          baseTokenProgram: a,
          quoteTokenProgram: i,
          systemProgram: r.SystemProgram.programId,
          associatedTokenProgram: s.x,
          eventAuthority: C,
          program: B,
          coinCreatorVaultAta: F(g, _, i),
          coinCreatorVaultAuthority: g,
        };
      }
      async syncUserVolumeAccumulator(e) {
        return await this.offlineProgram.methods
          .syncUserVolumeAccumulator()
          .accountsPartial({ user: e })
          .instruction();
      }
      async initUserVolumeAccumulator({ payer: e, user: t }) {
        return await this.offlineProgram.methods
          .initUserVolumeAccumulator()
          .accountsPartial({ payer: e, user: t })
          .instruction();
      }
      async closeUserVolumeAccumulator(e) {
        return await this.offlineProgram.methods
          .closeUserVolumeAccumulator()
          .accountsPartial({ user: e })
          .instruction();
      }
      async createAutocompleteInitialPoolPrice(e, t) {
        return t.div(e);
      }
      async depositInstructions(e, t, n) {
        let { pool: o, poolBaseTokenAccount: a, poolQuoteTokenAccount: r } = e,
          { maxBase: u, maxQuote: s } = (function (e, t, n, o, a) {
            if (a.isZero())
              throw Error("Division by zero: totalLpTokens cannot be zero");
            let r = W(n.mul(e), a),
              u = W(o.mul(e), a),
              s = new i.default((1 + t / 100) * 1e9),
              c = new i.default(1e9);
            return { maxBase: r.mul(s).div(c), maxQuote: u.mul(s).div(c) };
          })(
            t,
            n,
            new i.default(a.amount.toString()),
            new i.default(r.amount.toString()),
            o.lpSupply,
          );
        return this.depositInstructionsInternal(e, t, u, s);
      }
      depositAutocompleteQuoteAndLpTokenFromBase(e, t, n) {
        let { quote: o, lpToken: a } = this.depositBaseInput(e, t, n);
        return { quote: o, lpToken: a };
      }
      depositAutocompleteBaseAndLpTokenFromQuote(e, t, n) {
        let { base: o, lpToken: a } = this.depositQuoteInput(e, t, n);
        return { base: o, lpToken: a };
      }
      async withdrawInstructions(e, t, n) {
        let { minBase: o, minQuote: a } = this.withdrawInputs(e, t, n);
        return this.withdrawInstructionsInternal(e, t, o, a);
      }
      withdrawAutoCompleteBaseAndQuoteFromLpToken(e, t, n) {
        let { base: o, quote: a } = this.withdrawInputs(e, t, n);
        return { base: o, quote: a };
      }
    })(),
    X = class {
      constructor(e) {
        ((this.connection = e), (this.program = G(e)));
      }
      async fetchGlobalConfigAccount() {
        let e = await this.connection.getAccountInfo(I);
        if (null === e) throw Error("Global config account not found");
        return J.decodeGlobalConfig(e);
      }
      async fetchFeeConfigAccount() {
        let e = await this.connection.getAccountInfo(x);
        if (null === e) throw Error("Fee config account not found");
        return J.decodeFeeConfig(e);
      }
      async fetchPool(e) {
        let t = await this.connection.getAccountInfo(e);
        if (null === t) throw Error("Pool account not found");
        return J.decodePool(t);
      }
      fetchGlobalVolumeAccumulator() {
        return this.program.account.globalVolumeAccumulator.fetch(S);
      }
      fetchUserVolumeAccumulator(e) {
        return this.program.account.userVolumeAccumulator.fetchNullable(R(e));
      }
      async createPoolSolanaState(e, t, n, o, a, r) {
        let [i, s, c] = await this.connection.getMultipleAccountsInfo([
          I,
          n,
          o,
        ]);
        if (null === i) throw Error("Global config account not found");
        if (null === s) throw Error(`baseMint=${n.toString()} not found`);
        if (null === c) throw Error(`quoteMint=${o.toString()} not found`);
        let l = J.decodeGlobalConfig(i),
          [m, p] = [s.owner, c.owner],
          d = T(e, t, n, o),
          f = (0, u.h)(n, d, !0, m),
          _ = (0, u.h)(o, d, !0, p),
          [y, h] = await this.connection.getMultipleAccountsInfo([f, _]);
        (void 0 === a && (a = (0, u.h)(n, t, !0, m)),
          void 0 === r && (r = (0, u.h)(o, t, !0, p)));
        let [b, g] = await this.connection.getMultipleAccountsInfo([a, r]);
        return {
          index: e,
          creator: t,
          baseMint: n,
          quoteMint: o,
          globalConfig: l,
          poolKey: d,
          poolBaseTokenAccount: f,
          poolQuoteTokenAccount: _,
          baseTokenProgram: m,
          quoteTokenProgram: p,
          userBaseTokenAccount: a,
          userQuoteTokenAccount: r,
          userBaseAccountInfo: b,
          userQuoteAccountInfo: g,
          poolBaseAccountInfo: y,
          poolQuoteAccountInfo: h,
        };
      }
      async swapSolanaState(e, t, n, o) {
        let [a, r, s] = await this.connection.getMultipleAccountsInfo([
          I,
          x,
          e,
        ]);
        if (null === a) throw Error("Global config account not found");
        if (null === s) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(a),
          m = r ? J.decodeFeeConfig(r) : null,
          p = J.decodePool(s),
          {
            baseMint: d,
            quoteMint: f,
            poolBaseTokenAccount: _,
            poolQuoteTokenAccount: y,
          } = p,
          [h, b, g, k] = await this.connection.getMultipleAccountsInfo([
            d,
            f,
            _,
            y,
          ]);
        if (null === h) throw Error(`baseMint=${d.toString()} not found`);
        let v = u.x.decode(h.data);
        if (null === b) throw Error(`quoteMint=${f.toString()} not found`);
        if (null === g)
          throw Error(`Pool base token account ${_.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${y.toString()} not found`);
        let [w, A] = [h.owner, b.owner],
          E = l.d.decode(g.data),
          B = l.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(d, t, !0, w)),
          void 0 === o && (o = (0, u.h)(f, t, !0, A)));
        let [P, q] = await this.connection.getMultipleAccountsInfo([n, o]);
        return {
          globalConfig: c,
          feeConfig: m,
          poolKey: e,
          poolAccountInfo: s,
          pool: p,
          poolBaseAmount: new i.default(E.amount.toString()),
          poolQuoteAmount: new i.default(B.amount.toString()),
          baseTokenProgram: w,
          quoteTokenProgram: A,
          baseMint: d,
          baseMintAccount: v,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: o,
          userBaseAccountInfo: P,
          userQuoteAccountInfo: q,
        };
      }
      async swapSolanaStateNoPool(e, t, n, o) {
        let [a, r, s] = await this.connection.getMultipleAccountsInfo([
          I,
          x,
          e,
        ]);
        if (null === a) throw Error("Global config account not found");
        if (null === s) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(a),
          m = r ? J.decodeFeeConfig(r) : null,
          p = J.decodePool(s),
          {
            baseMint: d,
            quoteMint: f,
            poolBaseTokenAccount: _,
            poolQuoteTokenAccount: y,
          } = p,
          [h, b, g, k] = await this.connection.getMultipleAccountsInfo([
            d,
            f,
            _,
            y,
          ]);
        if (null === h) throw Error(`baseMint=${d.toString()} not found`);
        let v = u.x.decode(h.data);
        if (null === b) throw Error(`quoteMint=${f.toString()} not found`);
        if (null === g)
          throw Error(`Pool base token account ${_.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${y.toString()} not found`);
        let [w, A] = [h.owner, b.owner],
          E = l.d.decode(g.data),
          B = l.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(d, t, !0, w)),
          void 0 === o && (o = (0, u.h)(f, t, !0, A)));
        let [P, q] = await this.connection.getMultipleAccountsInfo([n, o]);
        return {
          globalConfig: c,
          feeConfig: m,
          poolKey: e,
          poolAccountInfo: s,
          pool: p,
          poolBaseAmount: new i.default(E.amount.toString()),
          poolQuoteAmount: new i.default(B.amount.toString()),
          baseTokenProgram: w,
          quoteTokenProgram: A,
          baseMint: d,
          baseMintAccount: v,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: o,
          userBaseAccountInfo: P,
          userQuoteAccountInfo: q,
        };
      }
      async liquiditySolanaState(e, t, n, o, a) {
        let [r, i] = await this.connection.getMultipleAccountsInfo([I, e]);
        if (null === r) throw Error("Global config account not found");
        if (null === i) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(r),
          m = J.decodePool(i),
          {
            baseMint: p,
            quoteMint: d,
            lpMint: f,
            poolBaseTokenAccount: _,
            poolQuoteTokenAccount: y,
          } = m,
          [h, b, g, k] = await this.connection.getMultipleAccountsInfo([
            p,
            d,
            _,
            y,
          ]);
        if (null === h) throw Error(`baseMint=${p.toString()} not found`);
        if (null === b) throw Error(`quoteMint=${d.toString()} not found`);
        if (null === g)
          throw Error(`Pool base token account ${_.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${y.toString()} not found`);
        let [v, w] = [h.owner, b.owner],
          A = l.d.decode(g.data),
          E = l.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(p, t, !0, v)),
          void 0 === o && (o = (0, u.h)(d, t, !0, w)),
          void 0 === a && (a = (0, u.h)(f, t, !0, s.S)));
        let [B, P, q] = await this.connection.getMultipleAccountsInfo([
          n,
          o,
          a,
        ]);
        return {
          globalConfig: c,
          poolKey: e,
          poolAccountInfo: i,
          pool: m,
          poolBaseTokenAccount: A,
          poolQuoteTokenAccount: E,
          baseTokenProgram: v,
          quoteTokenProgram: w,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: o,
          userPoolTokenAccount: a,
          userBaseAccountInfo: B,
          userQuoteAccountInfo: P,
          userPoolAccountInfo: q,
        };
      }
      async collectCoinCreatorFeeSolanaState(e, t) {
        let n = s.w,
          o = s.z,
          a = U(e),
          r = F(a, n, o);
        void 0 === t && (t = (0, u.h)(n, e, !0, o));
        let [i, c] = await this.connection.getMultipleAccountsInfo([r, t]);
        return {
          coinCreator: e,
          quoteMint: n,
          quoteTokenProgram: o,
          coinCreatorVaultAuthority: a,
          coinCreatorVaultAta: r,
          coinCreatorTokenAccount: t,
          coinCreatorVaultAtaAccountInfo: i,
          coinCreatorTokenAccountInfo: c,
        };
      }
      async getCoinCreatorVaultBalance(e) {
        let t = s.w,
          n = s.z,
          o = F(U(e), t, n);
        try {
          let e = await (0, l.l)(this.connection, o, void 0, n);
          return new i.default(e.amount.toString());
        } catch (e) {
          return (
            console.warn(`Error fetching token account ${o}:`, e),
            new i.default(0)
          );
        }
      }
      async boostBuyAndBurnInstruction(e, t, n, o) {
        let a = await this.connection.getAccountInfo(e);
        if (null === a) throw Error("Pool account not found");
        let r = J.decodePool(a),
          [i, u] = await this.connection.getMultipleAccountsInfo([
            r.baseMint,
            r.quoteMint,
          ]);
        if (null === i)
          throw Error(`baseMint=${r.baseMint.toString()} not found`);
        if (null === u)
          throw Error(`quoteMint=${r.quoteMint.toString()} not found`);
        return J.boostBuyAndBurnInstruction(e, r, t, n, o, i.owner, u.owner);
      }
      async claimTokenIncentives(e, t) {
        let { mint: n } = await this.fetchGlobalVolumeAccumulator();
        if (n.equals(r.PublicKey.default)) return [];
        let [o, a] = await this.connection.getMultipleAccountsInfo([n, R(e)]);
        return o && a
          ? [
              await K.methods
                .claimTokenIncentives()
                .accountsPartial({
                  user: e,
                  payer: t,
                  mint: n,
                  tokenProgram: o.owner,
                })
                .instruction(),
            ]
          : [];
      }
      async getTotalUnclaimedTokens(e) {
        let [t, n] = await this.connection.getMultipleAccountsInfo([S, R(e)]);
        return t && n
          ? (function (e, t, n = Date.now() / 1e3) {
              let {
                  startTime: o,
                  endTime: a,
                  secondsInADay: r,
                  totalTokenSupply: u,
                  solVolumes: s,
                } = e,
                {
                  totalUnclaimedTokens: c,
                  currentSolVolume: l,
                  lastUpdateTimestamp: m,
                } = t;
              if (o.eqn(0) || a.eqn(0) || r.eqn(0)) return c;
              let p = new i.default(n);
              if (p.lt(o)) return c;
              let d = p.sub(o).div(r).toNumber();
              if (m.lt(o)) return c;
              let f = m.sub(o).div(r).toNumber();
              if (a.lt(o)) return c;
              let _ = a.sub(o).div(r).toNumber();
              if (d > f && f <= _) {
                let e = u[f],
                  t = s[f];
                return t.eqn(0) ? c : c.add(l.mul(e).div(t));
              }
              return c;
            })(
              J.decodeGlobalVolumeAccumulator(t),
              J.decodeUserVolumeAccumulator(n),
            )
          : new i.default(0);
      }
      async getCurrentDayTokens(e) {
        let [t, n] = await this.connection.getMultipleAccountsInfo([S, R(e)]);
        return t && n
          ? (function (e, t, n = Date.now() / 1e3) {
              let {
                  startTime: o,
                  endTime: a,
                  secondsInADay: r,
                  totalTokenSupply: u,
                  solVolumes: s,
                } = e,
                { currentSolVolume: c, lastUpdateTimestamp: l } = t;
              if (o.eqn(0) || a.eqn(0) || r.eqn(0)) return new i.default(0);
              let m = new i.default(n);
              if (m.lt(o) || m.gt(a)) return new i.default(0);
              let p = m.sub(o).div(r).toNumber();
              if (l.lt(o)) return new i.default(0);
              let d = l.sub(o).div(r).toNumber();
              if (a.lt(o) || p !== d) return new i.default(0);
              let f = u[p],
                _ = s[p];
              return _.eqn(0) ? new i.default(0) : c.mul(f).div(_);
            })(
              J.decodeGlobalVolumeAccumulator(t),
              J.decodeUserVolumeAccumulator(n),
            )
          : new i.default(0);
      }
    };
  e.s([
    "Z",
    0,
    I,
    "Y",
    0,
    K,
    "h",
    0,
    X,
    "S",
    0,
    x,
    "y",
    0,
    B,
    "q",
    0,
    J,
    "u",
    0,
    $,
    "m",
    0,
    Q,
    "n",
    0,
    function (e, t = s.w) {
      return T(0, M(e), e, t);
    },
    "P",
    0,
    F,
    "E",
    0,
    U,
    "s",
    0,
    O,
    "g",
    0,
    q,
    "N",
    0,
    j,
    "i",
    0,
    R,
  ]);
};
