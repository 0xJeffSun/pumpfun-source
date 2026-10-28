// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n;
  var a,
    o = e.i(753887),
    r = e.i(959719),
    i = e.i(971370),
    s = e.i(424509),
    u = e.i(575281),
    c = e.i(353110),
    m = e.i(824425),
    l = e.i(619290),
    d = e.i(47446),
    p = e.i(574941),
    _ = Object.create,
    y = Object.defineProperty,
    f = Object.getOwnPropertyDescriptor,
    b = Object.getOwnPropertyNames,
    g = Object.getPrototypeOf,
    h = Object.prototype.hasOwnProperty,
    k = (e, t) =>
      function () {
        return (
          t || (0, e[b(e)[0]])((t = { exports: {} }).exports, t),
          t.exports
        );
      },
    v = k({
      "node_modules/base64-js/index.js"(e) {
        ((e.byteLength = function (e) {
          var t = s(e),
            n = t[0],
            a = t[1];
          return ((n + a) * 3) / 4 - a;
        }),
          (e.toByteArray = function (e) {
            var t,
              n,
              a = s(e),
              i = a[0],
              u = a[1],
              c = new r(((i + u) * 3) / 4 - u),
              m = 0,
              l = u > 0 ? i - 4 : i;
            for (n = 0; n < l; n += 4)
              ((t =
                (o[e.charCodeAt(n)] << 18) |
                (o[e.charCodeAt(n + 1)] << 12) |
                (o[e.charCodeAt(n + 2)] << 6) |
                o[e.charCodeAt(n + 3)]),
                (c[m++] = (t >> 16) & 255),
                (c[m++] = (t >> 8) & 255),
                (c[m++] = 255 & t));
            return (
              2 === u &&
                ((t =
                  (o[e.charCodeAt(n)] << 2) | (o[e.charCodeAt(n + 1)] >> 4)),
                (c[m++] = 255 & t)),
              1 === u &&
                ((t =
                  (o[e.charCodeAt(n)] << 10) |
                  (o[e.charCodeAt(n + 1)] << 4) |
                  (o[e.charCodeAt(n + 2)] >> 2)),
                (c[m++] = (t >> 8) & 255),
                (c[m++] = 255 & t)),
              c
            );
          }),
          (e.fromByteArray = function (e) {
            for (
              var t, n = e.length, o = n % 3, r = [], i = 0, s = n - o;
              i < s;
              i += 16383
            )
              r.push(
                (function (e, t, n) {
                  for (var o, r = [], i = t; i < n; i += 3)
                    ((o =
                      ((e[i] << 16) & 0xff0000) +
                      ((e[i + 1] << 8) & 65280) +
                      (255 & e[i + 2])),
                      r.push(
                        a[(o >> 18) & 63] +
                          a[(o >> 12) & 63] +
                          a[(o >> 6) & 63] +
                          a[63 & o],
                      ));
                  return r.join("");
                })(e, i, i + 16383 > s ? s : i + 16383),
              );
            return (
              1 === o
                ? r.push(a[(t = e[n - 1]) >> 2] + a[(t << 4) & 63] + "==")
                : 2 === o &&
                  r.push(
                    a[(t = (e[n - 2] << 8) + e[n - 1]) >> 10] +
                      a[(t >> 4) & 63] +
                      a[(t << 2) & 63] +
                      "=",
                  ),
              r.join("")
            );
          }));
        var t,
          n,
          a = [],
          o = [],
          r = "u" > typeof Uint8Array ? Uint8Array : Array,
          i =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (t = 0, n = i.length; t < n; ++t)
          ((a[t] = i[t]), (o[i.charCodeAt(t)] = t));
        function s(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw Error("Invalid string. Length must be a multiple of 4");
          var n = e.indexOf("=");
          -1 === n && (n = t);
          var a = n === t ? 0 : 4 - (n % 4);
          return [n, a];
        }
        ((o[45] = 62), (o[95] = 63));
      },
    }),
    w = k({
      "node_modules/ieee754/index.js"(e) {
        ((e.read = function (e, t, n, a, o) {
          var r,
            i,
            s = 8 * o - a - 1,
            u = (1 << s) - 1,
            c = u >> 1,
            m = -7,
            l = n ? o - 1 : 0,
            d = n ? -1 : 1,
            p = e[t + l];
          for (
            l += d, r = p & ((1 << -m) - 1), p >>= -m, m += s;
            m > 0;
            r = 256 * r + e[t + l], l += d, m -= 8
          );
          for (
            i = r & ((1 << -m) - 1), r >>= -m, m += a;
            m > 0;
            i = 256 * i + e[t + l], l += d, m -= 8
          );
          if (0 === r) r = 1 - c;
          else {
            if (r === u) return i ? 0 / 0 : (p ? -1 : 1) * 2e308;
            ((i += Math.pow(2, a)), (r -= c));
          }
          return (p ? -1 : 1) * i * Math.pow(2, r - a);
        }),
          (e.write = function (e, t, n, a, o, r) {
            var i,
              s,
              u,
              c = 8 * r - o - 1,
              m = (1 << c) - 1,
              l = m >> 1,
              d = 5960464477539062e-23 * (23 === o),
              p = a ? 0 : r - 1,
              _ = a ? 1 : -1,
              y = +(t < 0 || (0 === t && 1 / t < 0));
            for (
              isNaN((t = Math.abs(t))) || 1 / 0 === t
                ? ((s = +!!isNaN(t)), (i = m))
                : ((i = Math.floor(Math.log(t) / Math.LN2)),
                  t * (u = Math.pow(2, -i)) < 1 && (i--, (u *= 2)),
                  i + l >= 1 ? (t += d / u) : (t += d * Math.pow(2, 1 - l)),
                  t * u >= 2 && (i++, (u /= 2)),
                  i + l >= m
                    ? ((s = 0), (i = m))
                    : i + l >= 1
                      ? ((s = (t * u - 1) * Math.pow(2, o)), (i += l))
                      : ((s = t * Math.pow(2, l - 1) * Math.pow(2, o)),
                        (i = 0)));
              o >= 8;
              e[n + p] = 255 & s, p += _, s /= 256, o -= 8
            );
            for (
              i = (i << o) | s, c += o;
              c > 0;
              e[n + p] = 255 & i, p += _, i /= 256, c -= 8
            );
            e[n + p - _] |= 128 * y;
          }));
      },
    }),
    A =
      ((n =
        null !=
        (t = k({
          "node_modules/buffer/index.js"(e) {
            var t = v(),
              n = w(),
              a =
                "function" == typeof Symbol && "function" == typeof Symbol.for
                  ? Symbol.for("nodejs.util.inspect.custom")
                  : null;
            function o(e) {
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
                return u(e);
              }
              return i(e, t, n);
            }
            function i(e, t, n) {
              if ("string" == typeof e) {
                var a = e,
                  i = t;
                if (
                  (("string" != typeof i || "" === i) && (i = "utf8"),
                  !r.isEncoding(i))
                )
                  throw TypeError("Unknown encoding: " + i);
                let n = 0 | d(a, i),
                  s = o(n),
                  u = s.write(a, i);
                return (u !== n && (s = s.slice(0, u)), s);
              }
              if (ArrayBuffer.isView(e)) {
                var s = e;
                if (V(s, Uint8Array)) {
                  let e = new Uint8Array(s);
                  return m(e.buffer, e.byteOffset, e.byteLength);
                }
                return c(s);
              }
              if (null == e)
                throw TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof e,
                );
              if (
                V(e, ArrayBuffer) ||
                (e && V(e.buffer, ArrayBuffer)) ||
                ("u" > typeof SharedArrayBuffer &&
                  (V(e, SharedArrayBuffer) ||
                    (e && V(e.buffer, SharedArrayBuffer))))
              )
                return m(e, t, n);
              if ("number" == typeof e)
                throw TypeError(
                  'The "value" argument must not be of type number. Received type number',
                );
              let u = e.valueOf && e.valueOf();
              if (null != u && u !== e) return r.from(u, t, n);
              let p = (function (e) {
                if (r.isBuffer(e)) {
                  let t = 0 | l(e.length),
                    n = o(t);
                  return (0 === n.length || e.copy(n, 0, 0, t), n);
                }
                return void 0 !== e.length
                  ? "number" != typeof e.length ||
                    (function (e) {
                      return e != e;
                    })(e.length)
                    ? o(0)
                    : c(e)
                  : "Buffer" === e.type && Array.isArray(e.data)
                    ? c(e.data)
                    : void 0;
              })(e);
              if (p) return p;
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
            function s(e) {
              if ("number" != typeof e)
                throw TypeError('"size" argument must be of type number');
              if (e < 0)
                throw RangeError(
                  'The value "' + e + '" is invalid for option "size"',
                );
            }
            function u(e) {
              return (s(e), o(e < 0 ? 0 : 0 | l(e)));
            }
            function c(e) {
              let t = e.length < 0 ? 0 : 0 | l(e.length),
                n = o(t);
              for (let a = 0; a < t; a += 1) n[a] = 255 & e[a];
              return n;
            }
            function m(e, t, n) {
              let a;
              if (t < 0 || e.byteLength < t)
                throw RangeError('"offset" is outside of buffer bounds');
              if (e.byteLength < t + (n || 0))
                throw RangeError('"length" is outside of buffer bounds');
              return (
                Object.setPrototypeOf(
                  (a =
                    void 0 === t && void 0 === n
                      ? new Uint8Array(e)
                      : void 0 === n
                        ? new Uint8Array(e, t)
                        : new Uint8Array(e, t, n)),
                  r.prototype,
                ),
                a
              );
            }
            function l(e) {
              if (e >= 0x7fffffff)
                throw RangeError(
                  "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes",
                );
              return 0 | e;
            }
            function d(e, t) {
              if (r.isBuffer(e)) return e.length;
              if (ArrayBuffer.isView(e) || V(e, ArrayBuffer))
                return e.byteLength;
              if ("string" != typeof e)
                throw TypeError(
                  'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                    typeof e,
                );
              let n = e.length,
                a = arguments.length > 2 && !0 === arguments[2];
              if (!a && 0 === n) return 0;
              let o = !1;
              for (;;)
                switch (t) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return n;
                  case "utf8":
                  case "utf-8":
                    return x(e).length;
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * n;
                  case "hex":
                    return n >>> 1;
                  case "base64":
                    return R(e).length;
                  default:
                    if (o) return a ? -1 : x(e).length;
                    ((t = ("" + t).toLowerCase()), (o = !0));
                }
            }
            function p(e, n, a) {
              let o = !1;
              if (
                ((void 0 === n || n < 0) && (n = 0),
                n > this.length ||
                  ((void 0 === a || a > this.length) && (a = this.length),
                  a <= 0 || (a >>>= 0) <= (n >>>= 0)))
              )
                return "";
              for (e || (e = "utf8"); ; )
                switch (e) {
                  case "hex":
                    return (function (e, t, n) {
                      let a = e.length;
                      ((!t || t < 0) && (t = 0),
                        (!n || n < 0 || n > a) && (n = a));
                      let o = "";
                      for (let a = t; a < n; ++a) o += N[e[a]];
                      return o;
                    })(this, n, a);
                  case "utf8":
                  case "utf-8":
                    return b(this, n, a);
                  case "ascii":
                    return (function (e, t, n) {
                      let a = "";
                      n = Math.min(e.length, n);
                      for (let o = t; o < n; ++o)
                        a += String.fromCharCode(127 & e[o]);
                      return a;
                    })(this, n, a);
                  case "latin1":
                  case "binary":
                    return (function (e, t, n) {
                      let a = "";
                      n = Math.min(e.length, n);
                      for (let o = t; o < n; ++o)
                        a += String.fromCharCode(e[o]);
                      return a;
                    })(this, n, a);
                  case "base64":
                    var r, i, s;
                    return (
                      (r = this),
                      (i = n),
                      (s = a),
                      0 === i && s === r.length
                        ? t.fromByteArray(r)
                        : t.fromByteArray(r.slice(i, s))
                    );
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return (function (e, t, n) {
                      let a = e.slice(t, n),
                        o = "";
                      for (let e = 0; e < a.length - 1; e += 2)
                        o += String.fromCharCode(a[e] + 256 * a[e + 1]);
                      return o;
                    })(this, n, a);
                  default:
                    if (o) throw TypeError("Unknown encoding: " + e);
                    ((e = (e + "").toLowerCase()), (o = !0));
                }
            }
            function _(e, t, n) {
              let a = e[t];
              ((e[t] = e[n]), (e[n] = a));
            }
            function y(e, t, n, a, o) {
              var i;
              if (0 === e.length) return -1;
              if (
                ("string" == typeof n
                  ? ((a = n), (n = 0))
                  : n > 0x7fffffff
                    ? (n = 0x7fffffff)
                    : n < -0x80000000 && (n = -0x80000000),
                (i = n *= 1) != i && (n = o ? 0 : e.length - 1),
                n < 0 && (n = e.length + n),
                n >= e.length)
              )
                if (o) return -1;
                else n = e.length - 1;
              else if (n < 0)
                if (!o) return -1;
                else n = 0;
              if (("string" == typeof t && (t = r.from(t, a)), r.isBuffer(t)))
                return 0 === t.length ? -1 : f(e, t, n, a, o);
              if ("number" == typeof t) {
                if (
                  ((t &= 255),
                  "function" == typeof Uint8Array.prototype.indexOf)
                )
                  if (o) return Uint8Array.prototype.indexOf.call(e, t, n);
                  else return Uint8Array.prototype.lastIndexOf.call(e, t, n);
                return f(e, [t], n, a, o);
              }
              throw TypeError("val must be string, number or Buffer");
            }
            function f(e, t, n, a, o) {
              let r,
                i = 1,
                s = e.length,
                u = t.length;
              if (
                void 0 !== a &&
                ("ucs2" === (a = String(a).toLowerCase()) ||
                  "ucs-2" === a ||
                  "utf16le" === a ||
                  "utf-16le" === a)
              ) {
                if (e.length < 2 || t.length < 2) return -1;
                ((i = 2), (s /= 2), (u /= 2), (n /= 2));
              }
              function c(e, t) {
                return 1 === i ? e[t] : e.readUInt16BE(t * i);
              }
              if (o) {
                let a = -1;
                for (r = n; r < s; r++)
                  if (c(e, r) === c(t, -1 === a ? 0 : r - a)) {
                    if ((-1 === a && (a = r), r - a + 1 === u)) return a * i;
                  } else (-1 !== a && (r -= r - a), (a = -1));
              } else
                for (n + u > s && (n = s - u), r = n; r >= 0; r--) {
                  let n = !0;
                  for (let a = 0; a < u; a++)
                    if (c(e, r + a) !== c(t, a)) {
                      n = !1;
                      break;
                    }
                  if (n) return r;
                }
              return -1;
            }
            function b(e, t, n) {
              n = Math.min(e.length, n);
              let a = [],
                o = t;
              for (; o < n; ) {
                let t = e[o],
                  r = null,
                  i = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
                if (o + i <= n) {
                  let n, a, s, u;
                  switch (i) {
                    case 1:
                      t < 128 && (r = t);
                      break;
                    case 2:
                      (192 & (n = e[o + 1])) == 128 &&
                        (u = ((31 & t) << 6) | (63 & n)) > 127 &&
                        (r = u);
                      break;
                    case 3:
                      ((n = e[o + 1]),
                        (a = e[o + 2]),
                        (192 & n) == 128 &&
                          (192 & a) == 128 &&
                          (u = ((15 & t) << 12) | ((63 & n) << 6) | (63 & a)) >
                            2047 &&
                          (u < 55296 || u > 57343) &&
                          (r = u));
                      break;
                    case 4:
                      ((n = e[o + 1]),
                        (a = e[o + 2]),
                        (s = e[o + 3]),
                        (192 & n) == 128 &&
                          (192 & a) == 128 &&
                          (192 & s) == 128 &&
                          (u =
                            ((15 & t) << 18) |
                            ((63 & n) << 12) |
                            ((63 & a) << 6) |
                            (63 & s)) > 65535 &&
                          u < 1114112 &&
                          (r = u));
                  }
                }
                (null === r
                  ? ((r = 65533), (i = 1))
                  : r > 65535 &&
                    ((r -= 65536),
                    a.push(((r >>> 10) & 1023) | 55296),
                    (r = 56320 | (1023 & r))),
                  a.push(r),
                  (o += i));
              }
              var r = a;
              let i = r.length;
              if (i <= 4096) return String.fromCharCode.apply(String, r);
              let s = "",
                u = 0;
              for (; u < i; )
                s += String.fromCharCode.apply(String, r.slice(u, (u += 4096)));
              return s;
            }
            function g(e, t, n) {
              if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint");
              if (e + t > n)
                throw RangeError("Trying to access beyond buffer length");
            }
            function h(e, t, n, a, o, i) {
              if (!r.isBuffer(e))
                throw TypeError('"buffer" argument must be a Buffer instance');
              if (t > o || t < i)
                throw RangeError('"value" argument is out of bounds');
              if (n + a > e.length) throw RangeError("Index out of range");
            }
            function k(e, t, n, a, o) {
              q(t, a, o, e, n, 7);
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
            function A(e, t, n, a, o) {
              q(t, a, o, e, n, 7);
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
            function C(e, t, n, a, o, r) {
              if (n + a > e.length || n < 0)
                throw RangeError("Index out of range");
            }
            function P(e, t, a, o, r) {
              return (
                (t *= 1),
                (a >>>= 0),
                r || C(e, t, a, 4, 34028234663852886e22, -34028234663852886e22),
                n.write(e, t, a, o, 23, 4),
                a + 4
              );
            }
            function B(e, t, a, o, r) {
              return (
                (t *= 1),
                (a >>>= 0),
                r ||
                  C(e, t, a, 8, 17976931348623157e292, -17976931348623157e292),
                n.write(e, t, a, o, 52, 8),
                a + 8
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
                return (s(e), e <= 0)
                  ? o(e)
                  : void 0 !== t
                    ? "string" == typeof n
                      ? o(e).fill(t, n)
                      : o(e).fill(t)
                    : o(e);
              }),
              (r.allocUnsafe = function (e) {
                return u(e);
              }),
              (r.allocUnsafeSlow = function (e) {
                return u(e);
              }),
              (r.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== r.prototype;
              }),
              (r.compare = function (e, t) {
                if (
                  (V(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)),
                  V(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)),
                  !r.isBuffer(e) || !r.isBuffer(t))
                )
                  throw TypeError(
                    'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
                  );
                if (e === t) return 0;
                let n = e.length,
                  a = t.length;
                for (let o = 0, r = Math.min(n, a); o < r; ++o)
                  if (e[o] !== t[o]) {
                    ((n = e[o]), (a = t[o]));
                    break;
                  }
                return n < a ? -1 : +(a < n);
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
                let a = r.allocUnsafe(t),
                  o = 0;
                for (n = 0; n < e.length; ++n) {
                  let t = e[n];
                  if (V(t, Uint8Array))
                    o + t.length > a.length
                      ? (r.isBuffer(t) || (t = r.from(t)), t.copy(a, o))
                      : Uint8Array.prototype.set.call(a, t, o);
                  else if (r.isBuffer(t)) t.copy(a, o);
                  else
                    throw TypeError(
                      '"list" argument must be an Array of Buffers',
                    );
                  o += t.length;
                }
                return a;
              }),
              (r.byteLength = d),
              (r.prototype._isBuffer = !0),
              (r.prototype.swap16 = function () {
                let e = this.length;
                if (e % 2 != 0)
                  throw RangeError("Buffer size must be a multiple of 16-bits");
                for (let t = 0; t < e; t += 2) _(this, t, t + 1);
                return this;
              }),
              (r.prototype.swap32 = function () {
                let e = this.length;
                if (e % 4 != 0)
                  throw RangeError("Buffer size must be a multiple of 32-bits");
                for (let t = 0; t < e; t += 4)
                  (_(this, t, t + 3), _(this, t + 1, t + 2));
                return this;
              }),
              (r.prototype.swap64 = function () {
                let e = this.length;
                if (e % 8 != 0)
                  throw RangeError("Buffer size must be a multiple of 64-bits");
                for (let t = 0; t < e; t += 8)
                  (_(this, t, t + 7),
                    _(this, t + 1, t + 6),
                    _(this, t + 2, t + 5),
                    _(this, t + 3, t + 4));
                return this;
              }),
              (r.prototype.toString = function () {
                let e = this.length;
                return 0 === e
                  ? ""
                  : 0 == arguments.length
                    ? b(this, 0, e)
                    : p.apply(this, arguments);
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
              a && (r.prototype[a] = r.prototype.inspect),
              (r.prototype.compare = function (e, t, n, a, o) {
                if (
                  (V(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)),
                  !r.isBuffer(e))
                )
                  throw TypeError(
                    'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                      typeof e,
                  );
                if (
                  (void 0 === t && (t = 0),
                  void 0 === n && (n = e ? e.length : 0),
                  void 0 === a && (a = 0),
                  void 0 === o && (o = this.length),
                  t < 0 || n > e.length || a < 0 || o > this.length)
                )
                  throw RangeError("out of range index");
                if (a >= o && t >= n) return 0;
                if (a >= o) return -1;
                if (t >= n) return 1;
                if (
                  ((t >>>= 0), (n >>>= 0), (a >>>= 0), (o >>>= 0), this === e)
                )
                  return 0;
                let i = o - a,
                  s = n - t,
                  u = Math.min(i, s),
                  c = this.slice(a, o),
                  m = e.slice(t, n);
                for (let e = 0; e < u; ++e)
                  if (c[e] !== m[e]) {
                    ((i = c[e]), (s = m[e]));
                    break;
                  }
                return i < s ? -1 : +(s < i);
              }),
              (r.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n);
              }),
              (r.prototype.indexOf = function (e, t, n) {
                return y(this, e, t, n, !0);
              }),
              (r.prototype.lastIndexOf = function (e, t, n) {
                return y(this, e, t, n, !1);
              }),
              (r.prototype.write = function (e, t, n, a) {
                var o, r, i, s, u, c, m, l;
                if (void 0 === t) ((a = "utf8"), (n = this.length), (t = 0));
                else if (void 0 === n && "string" == typeof t)
                  ((a = t), (n = this.length), (t = 0));
                else if (isFinite(t))
                  ((t >>>= 0),
                    isFinite(n)
                      ? ((n >>>= 0), void 0 === a && (a = "utf8"))
                      : ((a = n), (n = void 0)));
                else
                  throw Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported",
                  );
                let d = this.length - t;
                if (
                  ((void 0 === n || n > d) && (n = d),
                  (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
                )
                  throw RangeError("Attempt to write outside buffer bounds");
                a || (a = "utf8");
                let p = !1;
                for (;;)
                  switch (a) {
                    case "hex":
                      return (function (e, t, n, a) {
                        let o;
                        n = Number(n) || 0;
                        let r = e.length - n;
                        a ? (a = Number(a)) > r && (a = r) : (a = r);
                        let i = t.length;
                        for (a > i / 2 && (a = i / 2), o = 0; o < a; ++o) {
                          var s;
                          let a = parseInt(t.substr(2 * o, 2), 16);
                          if ((s = a) != s) break;
                          e[n + o] = a;
                        }
                        return o;
                      })(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                      return (
                        (o = t),
                        (r = n),
                        U(x(e, this.length - o), this, o, r)
                      );
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return (
                        (i = t),
                        (s = n),
                        U(
                          (function (e) {
                            let t = [];
                            for (let n = 0; n < e.length; ++n)
                              t.push(255 & e.charCodeAt(n));
                            return t;
                          })(e),
                          this,
                          i,
                          s,
                        )
                      );
                    case "base64":
                      return ((u = t), (c = n), U(R(e), this, u, c));
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return (
                        (m = t),
                        (l = n),
                        U(
                          (function (e, t) {
                            let n,
                              a,
                              o = [];
                            for (
                              let r = 0;
                              r < e.length && !((t -= 2) < 0);
                              ++r
                            )
                              ((a = (n = e.charCodeAt(r)) >> 8),
                                o.push(n % 256),
                                o.push(a));
                            return o;
                          })(e, this.length - m),
                          this,
                          m,
                          l,
                        )
                      );
                    default:
                      if (p) throw TypeError("Unknown encoding: " + a);
                      ((a = ("" + a).toLowerCase()), (p = !0));
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
                let a = this.subarray(e, t);
                return (Object.setPrototypeOf(a, r.prototype), a);
              }),
              (r.prototype.readUintLE = r.prototype.readUIntLE =
                function (e, t, n) {
                  ((e >>>= 0), (t >>>= 0), n || g(e, t, this.length));
                  let a = this[e],
                    o = 1,
                    r = 0;
                  for (; ++r < t && (o *= 256); ) a += this[e + r] * o;
                  return a;
                }),
              (r.prototype.readUintBE = r.prototype.readUIntBE =
                function (e, t, n) {
                  ((e >>>= 0), (t >>>= 0), n || g(e, t, this.length));
                  let a = this[e + --t],
                    o = 1;
                  for (; t > 0 && (o *= 256); ) a += this[e + --t] * o;
                  return a;
                }),
              (r.prototype.readUint8 = r.prototype.readUInt8 =
                function (e, t) {
                  return ((e >>>= 0), t || g(e, 1, this.length), this[e]);
                }),
              (r.prototype.readUint16LE = r.prototype.readUInt16LE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || g(e, 2, this.length),
                    this[e] | (this[e + 1] << 8)
                  );
                }),
              (r.prototype.readUint16BE = r.prototype.readUInt16BE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || g(e, 2, this.length),
                    (this[e] << 8) | this[e + 1]
                  );
                }),
              (r.prototype.readUint32LE = r.prototype.readUInt32LE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || g(e, 4, this.length),
                    (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                      0x1000000 * this[e + 3]
                  );
                }),
              (r.prototype.readUint32BE = r.prototype.readUInt32BE =
                function (e, t) {
                  return (
                    (e >>>= 0),
                    t || g(e, 4, this.length),
                    0x1000000 * this[e] +
                      ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                  );
                }),
              (r.prototype.readBigUInt64LE = L(function (e) {
                M((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                (void 0 === t || void 0 === n) && F(e, this.length - 8);
                let a =
                    t +
                    256 * this[++e] +
                    65536 * this[++e] +
                    0x1000000 * this[++e],
                  o =
                    this[++e] +
                    256 * this[++e] +
                    65536 * this[++e] +
                    0x1000000 * n;
                return BigInt(a) + (BigInt(o) << BigInt(32));
              })),
              (r.prototype.readBigUInt64BE = L(function (e) {
                M((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                (void 0 === t || void 0 === n) && F(e, this.length - 8);
                let a =
                    0x1000000 * t +
                    65536 * this[++e] +
                    256 * this[++e] +
                    this[++e],
                  o =
                    0x1000000 * this[++e] +
                    65536 * this[++e] +
                    256 * this[++e] +
                    n;
                return (BigInt(a) << BigInt(32)) + BigInt(o);
              })),
              (r.prototype.readIntLE = function (e, t, n) {
                ((e >>>= 0), (t >>>= 0), n || g(e, t, this.length));
                let a = this[e],
                  o = 1,
                  r = 0;
                for (; ++r < t && (o *= 256); ) a += this[e + r] * o;
                return (a >= (o *= 128) && (a -= Math.pow(2, 8 * t)), a);
              }),
              (r.prototype.readIntBE = function (e, t, n) {
                ((e >>>= 0), (t >>>= 0), n || g(e, t, this.length));
                let a = t,
                  o = 1,
                  r = this[e + --a];
                for (; a > 0 && (o *= 256); ) r += this[e + --a] * o;
                return (r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r);
              }),
              (r.prototype.readInt8 = function (e, t) {
                return ((e >>>= 0), t || g(e, 1, this.length), 128 & this[e])
                  ? -((255 - this[e] + 1) * 1)
                  : this[e];
              }),
              (r.prototype.readInt16LE = function (e, t) {
                ((e >>>= 0), t || g(e, 2, this.length));
                let n = this[e] | (this[e + 1] << 8);
                return 32768 & n ? 0xffff0000 | n : n;
              }),
              (r.prototype.readInt16BE = function (e, t) {
                ((e >>>= 0), t || g(e, 2, this.length));
                let n = this[e + 1] | (this[e] << 8);
                return 32768 & n ? 0xffff0000 | n : n;
              }),
              (r.prototype.readInt32LE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || g(e, 4, this.length),
                  this[e] |
                    (this[e + 1] << 8) |
                    (this[e + 2] << 16) |
                    (this[e + 3] << 24)
                );
              }),
              (r.prototype.readInt32BE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || g(e, 4, this.length),
                  (this[e] << 24) |
                    (this[e + 1] << 16) |
                    (this[e + 2] << 8) |
                    this[e + 3]
                );
              }),
              (r.prototype.readBigInt64LE = L(function (e) {
                M((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                return (
                  (void 0 === t || void 0 === n) && F(e, this.length - 8),
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
              (r.prototype.readBigInt64BE = L(function (e) {
                M((e >>>= 0), "offset");
                let t = this[e],
                  n = this[e + 7];
                return (
                  (void 0 === t || void 0 === n) && F(e, this.length - 8),
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
                  t || g(e, 4, this.length),
                  n.read(this, e, !0, 23, 4)
                );
              }),
              (r.prototype.readFloatBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || g(e, 4, this.length),
                  n.read(this, e, !1, 23, 4)
                );
              }),
              (r.prototype.readDoubleLE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || g(e, 8, this.length),
                  n.read(this, e, !0, 52, 8)
                );
              }),
              (r.prototype.readDoubleBE = function (e, t) {
                return (
                  (e >>>= 0),
                  t || g(e, 8, this.length),
                  n.read(this, e, !1, 52, 8)
                );
              }),
              (r.prototype.writeUintLE = r.prototype.writeUIntLE =
                function (e, t, n, a) {
                  if (((e *= 1), (t >>>= 0), (n >>>= 0), !a)) {
                    let a = Math.pow(2, 8 * n) - 1;
                    h(this, e, t, n, a, 0);
                  }
                  let o = 1,
                    r = 0;
                  for (this[t] = 255 & e; ++r < n && (o *= 256); )
                    this[t + r] = (e / o) & 255;
                  return t + n;
                }),
              (r.prototype.writeUintBE = r.prototype.writeUIntBE =
                function (e, t, n, a) {
                  if (((e *= 1), (t >>>= 0), (n >>>= 0), !a)) {
                    let a = Math.pow(2, 8 * n) - 1;
                    h(this, e, t, n, a, 0);
                  }
                  let o = n - 1,
                    r = 1;
                  for (this[t + o] = 255 & e; --o >= 0 && (r *= 256); )
                    this[t + o] = (e / r) & 255;
                  return t + n;
                }),
              (r.prototype.writeUint8 = r.prototype.writeUInt8 =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || h(this, e, t, 1, 255, 0),
                    (this[t] = 255 & e),
                    t + 1
                  );
                }),
              (r.prototype.writeUint16LE = r.prototype.writeUInt16LE =
                function (e, t, n) {
                  return (
                    (e *= 1),
                    (t >>>= 0),
                    n || h(this, e, t, 2, 65535, 0),
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
                    n || h(this, e, t, 2, 65535, 0),
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
                    n || h(this, e, t, 4, 0xffffffff, 0),
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
                    n || h(this, e, t, 4, 0xffffffff, 0),
                    (this[t] = e >>> 24),
                    (this[t + 1] = e >>> 16),
                    (this[t + 2] = e >>> 8),
                    (this[t + 3] = 255 & e),
                    t + 4
                  );
                }),
              (r.prototype.writeBigUInt64LE = L(function (e, t = 0) {
                return k(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
              })),
              (r.prototype.writeBigUInt64BE = L(function (e, t = 0) {
                return A(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
              })),
              (r.prototype.writeIntLE = function (e, t, n, a) {
                if (((e *= 1), (t >>>= 0), !a)) {
                  let a = Math.pow(2, 8 * n - 1);
                  h(this, e, t, n, a - 1, -a);
                }
                let o = 0,
                  r = 1,
                  i = 0;
                for (this[t] = 255 & e; ++o < n && (r *= 256); )
                  (e < 0 && 0 === i && 0 !== this[t + o - 1] && (i = 1),
                    (this[t + o] = (((e / r) | 0) - i) & 255));
                return t + n;
              }),
              (r.prototype.writeIntBE = function (e, t, n, a) {
                if (((e *= 1), (t >>>= 0), !a)) {
                  let a = Math.pow(2, 8 * n - 1);
                  h(this, e, t, n, a - 1, -a);
                }
                let o = n - 1,
                  r = 1,
                  i = 0;
                for (this[t + o] = 255 & e; --o >= 0 && (r *= 256); )
                  (e < 0 && 0 === i && 0 !== this[t + o + 1] && (i = 1),
                    (this[t + o] = (((e / r) | 0) - i) & 255));
                return t + n;
              }),
              (r.prototype.writeInt8 = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || h(this, e, t, 1, 127, -128),
                  e < 0 && (e = 255 + e + 1),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (r.prototype.writeInt16LE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || h(this, e, t, 2, 32767, -32768),
                  (this[t] = 255 & e),
                  (this[t + 1] = e >>> 8),
                  t + 2
                );
              }),
              (r.prototype.writeInt16BE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || h(this, e, t, 2, 32767, -32768),
                  (this[t] = e >>> 8),
                  (this[t + 1] = 255 & e),
                  t + 2
                );
              }),
              (r.prototype.writeInt32LE = function (e, t, n) {
                return (
                  (e *= 1),
                  (t >>>= 0),
                  n || h(this, e, t, 4, 0x7fffffff, -0x80000000),
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
                  n || h(this, e, t, 4, 0x7fffffff, -0x80000000),
                  e < 0 && (e = 0xffffffff + e + 1),
                  (this[t] = e >>> 24),
                  (this[t + 1] = e >>> 16),
                  (this[t + 2] = e >>> 8),
                  (this[t + 3] = 255 & e),
                  t + 4
                );
              }),
              (r.prototype.writeBigInt64LE = L(function (e, t = 0) {
                return k(
                  this,
                  e,
                  t,
                  -BigInt("0x8000000000000000"),
                  BigInt("0x7fffffffffffffff"),
                );
              })),
              (r.prototype.writeBigInt64BE = L(function (e, t = 0) {
                return A(
                  this,
                  e,
                  t,
                  -BigInt("0x8000000000000000"),
                  BigInt("0x7fffffffffffffff"),
                );
              })),
              (r.prototype.writeFloatLE = function (e, t, n) {
                return P(this, e, t, !0, n);
              }),
              (r.prototype.writeFloatBE = function (e, t, n) {
                return P(this, e, t, !1, n);
              }),
              (r.prototype.writeDoubleLE = function (e, t, n) {
                return B(this, e, t, !0, n);
              }),
              (r.prototype.writeDoubleBE = function (e, t, n) {
                return B(this, e, t, !1, n);
              }),
              (r.prototype.copy = function (e, t, n, a) {
                if (!r.isBuffer(e))
                  throw TypeError("argument should be a Buffer");
                if (
                  (n || (n = 0),
                  a || 0 === a || (a = this.length),
                  t >= e.length && (t = e.length),
                  t || (t = 0),
                  a > 0 && a < n && (a = n),
                  a === n || 0 === e.length || 0 === this.length)
                )
                  return 0;
                if (t < 0) throw RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length)
                  throw RangeError("Index out of range");
                if (a < 0) throw RangeError("sourceEnd out of bounds");
                (a > this.length && (a = this.length),
                  e.length - t < a - n && (a = e.length - t + n));
                let o = a - n;
                return (
                  this === e &&
                  "function" == typeof Uint8Array.prototype.copyWithin
                    ? this.copyWithin(t, n, a)
                    : Uint8Array.prototype.set.call(e, this.subarray(n, a), t),
                  o
                );
              }),
              (r.prototype.fill = function (e, t, n, a) {
                let o;
                if ("string" == typeof e) {
                  if (
                    ("string" == typeof t
                      ? ((a = t), (t = 0), (n = this.length))
                      : "string" == typeof n && ((a = n), (n = this.length)),
                    void 0 !== a && "string" != typeof a)
                  )
                    throw TypeError("encoding must be a string");
                  if ("string" == typeof a && !r.isEncoding(a))
                    throw TypeError("Unknown encoding: " + a);
                  if (1 === e.length) {
                    let t = e.charCodeAt(0);
                    (("utf8" === a && t < 128) || "latin1" === a) && (e = t);
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
                  for (o = t; o < n; ++o) this[o] = e;
                else {
                  let i = r.isBuffer(e) ? e : r.from(e, a),
                    s = i.length;
                  if (0 === s)
                    throw TypeError(
                      'The value "' + e + '" is invalid for argument "value"',
                    );
                  for (o = 0; o < n - t; ++o) this[o + t] = i[o % s];
                }
                return this;
              }));
            var S = {};
            function E(e, t, n) {
              S[e] = class extends n {
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
            function T(e) {
              let t = "",
                n = e.length,
                a = +("-" === e[0]);
              for (; n >= a + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
              return `${e.slice(0, n)}${t}`;
            }
            function q(e, t, n, a, o, r) {
              if (e > n || e < t) {
                let a,
                  o = "bigint" == typeof t ? "n" : "";
                throw (
                  (a =
                    r > 3
                      ? 0 === t || t === BigInt(0)
                        ? `>= 0${o} and < 2${o} ** ${(r + 1) * 8}${o}`
                        : `>= -(2${o} ** ${(r + 1) * 8 - 1}${o}) and < 2 ** ${(r + 1) * 8 - 1}${o}`
                      : `>= ${t}${o} and <= ${n}${o}`),
                  new S.ERR_OUT_OF_RANGE("value", a, e)
                );
              }
              (M(o, "offset"),
                (void 0 === a[o] || void 0 === a[o + r]) &&
                  F(o, a.length - (r + 1)));
            }
            function M(e, t) {
              if ("number" != typeof e)
                throw new S.ERR_INVALID_ARG_TYPE(t, "number", e);
            }
            function F(e, t, n) {
              if (Math.floor(e) !== e)
                throw (
                  M(e, n),
                  new S.ERR_OUT_OF_RANGE(n || "offset", "an integer", e)
                );
              if (t < 0) throw new S.ERR_BUFFER_OUT_OF_BOUNDS();
              throw new S.ERR_OUT_OF_RANGE(
                n || "offset",
                `>= ${+!!n} and <= ${t}`,
                e,
              );
            }
            (E(
              "ERR_BUFFER_OUT_OF_BOUNDS",
              function (e) {
                return e
                  ? `${e} is outside of buffer bounds`
                  : "Attempt to access memory outside buffer bounds";
              },
              RangeError,
            ),
              E(
                "ERR_INVALID_ARG_TYPE",
                function (e, t) {
                  return `The "${e}" argument must be of type number. Received type ${typeof t}`;
                },
                TypeError,
              ),
              E(
                "ERR_OUT_OF_RANGE",
                function (e, t, n) {
                  let a = `The value of "${e}" is out of range.`,
                    o = n;
                  return (
                    Number.isInteger(n) && Math.abs(n) > 0x100000000
                      ? (o = T(String(n)))
                      : "bigint" == typeof n &&
                        ((o = String(n)),
                        (n > BigInt(2) ** BigInt(32) ||
                          n < -(BigInt(2) ** BigInt(32))) &&
                          (o = T(o)),
                        (o += "n")),
                    (a += ` It must be ${t}. Received ${o}`)
                  );
                },
                RangeError,
              ));
            var I = /[^+/0-9A-Za-z-_]/g;
            function x(e, t) {
              let n;
              t = t || 1 / 0;
              let a = e.length,
                o = null,
                r = [];
              for (let i = 0; i < a; ++i) {
                if ((n = e.charCodeAt(i)) > 55295 && n < 57344) {
                  if (!o) {
                    if (n > 56319 || i + 1 === a) {
                      (t -= 3) > -1 && r.push(239, 191, 189);
                      continue;
                    }
                    o = n;
                    continue;
                  }
                  if (n < 56320) {
                    ((t -= 3) > -1 && r.push(239, 191, 189), (o = n));
                    continue;
                  }
                  n = (((o - 55296) << 10) | (n - 56320)) + 65536;
                } else o && (t -= 3) > -1 && r.push(239, 191, 189);
                if (((o = null), n < 128)) {
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
            function R(e) {
              return t.toByteArray(
                (function (e) {
                  if (
                    (e = (e = e.split("=")[0]).trim().replace(I, "")).length < 2
                  )
                    return "";
                  for (; e.length % 4 != 0; ) e += "=";
                  return e;
                })(e),
              );
            }
            function U(e, t, n, a) {
              let o;
              for (
                o = 0;
                o < a && !(o + n >= t.length) && !(o >= e.length);
                ++o
              )
                t[o + n] = e[o];
              return o;
            }
            function V(e, t) {
              return (
                e instanceof t ||
                (null != e &&
                  null != e.constructor &&
                  null != e.constructor.name &&
                  e.constructor.name === t.name)
              );
            }
            var N = (function () {
              let e = "0123456789abcdef",
                t = Array(256);
              for (let n = 0; n < 16; ++n) {
                let a = 16 * n;
                for (let o = 0; o < 16; ++o) t[a + o] = e[n] + e[o];
              }
              return t;
            })();
            function L(e) {
              return "u" < typeof BigInt ? D : e;
            }
            function D() {
              throw Error("BigInt not supported");
            }
          },
        })())
          ? _(g(t))
          : {}),
      ((e, t, n) => {
        if ((t && "object" == typeof t) || "function" == typeof t)
          for (let a of b(t))
            h.call(e, a) ||
              void 0 === a ||
              y(e, a, {
                get: () => t[a],
                enumerable: !(n = f(t, a)) || n.enumerable,
              });
        return e;
      })(
        t && t.__esModule ? n : y(n, "default", { value: t, enumerable: !0 }),
        t,
      )),
    C = new i.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"),
    P = new i.PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"),
    B = new i.PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"),
    S = new i.PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn");
  function E(e) {
    return i.PublicKey.findProgramAddressSync(e, C)[0];
  }
  function T(e) {
    return i.PublicKey.findProgramAddressSync(e, P)[0];
  }
  function q(e) {
    return i.PublicKey.findProgramAddressSync(e, B)[0];
  }
  var M = T([A.Buffer.from("global_config")]),
    F = T([A.Buffer.from("__event_authority")]),
    I = T([A.Buffer.from("global_volume_accumulator")]),
    x = q([A.Buffer.from("fee_config"), P.toBuffer()]);
  function R(e, t, n, a) {
    return T([
      A.Buffer.from("pool"),
      new s.default(e).toArrayLike(A.Buffer, "le", 2),
      t.toBuffer(),
      n.toBuffer(),
      a.toBuffer(),
    ]);
  }
  function U(e) {
    return E([A.Buffer.from("pool-authority"), e.toBuffer()]);
  }
  function V(e) {
    return T([A.Buffer.from("user_volume_accumulator"), e.toBuffer()]);
  }
  function N(e) {
    return T([A.Buffer.from("creator_vault"), e.toBuffer()]);
  }
  function L(e, t, n) {
    return (0, u.h)(t, e, !0, n);
  }
  function D(e) {
    return T([A.Buffer.from("pool-v2"), e.toBuffer()]);
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
  function z(e, t) {
    if (t.isZero()) throw Error("Cannot divide by zero.");
    return e.add(t).subn(1).div(t);
  }
  function G(e, t) {
    return z(e.mul(t), new s.default(1e4));
  }
  function W(e) {
    return new c.v(O, new c.F(e, null, {}));
  }
  var Q = class {
    constructor(e) {
      this.program = W(e);
    }
    fetchGlobalConfigAccount() {
      return this.program.account.globalConfig.fetch(M);
    }
    createConfig(e, t, n, a, o, r) {
      return this.program.methods
        .createConfig(e, t, n, a, r)
        .accountsPartial({ admin: o })
        .instruction();
    }
    disable(e, t, n, a, o, r) {
      return this.program.methods
        .disable(e, t, n, a, o)
        .accountsPartial({ admin: r, globalConfig: M })
        .instruction();
    }
    updateAdmin(e, t) {
      return this.program.methods
        .updateAdmin()
        .accountsPartial({ admin: e, newAdmin: t, globalConfig: M })
        .instruction();
    }
    updateFeeConfig(e, t, n, a, o, r) {
      return this.program.methods
        .updateFeeConfig(e, t, n, a, r)
        .accountsPartial({ admin: o, globalConfig: M })
        .instruction();
    }
    async adminSetCoinCreator(e, t) {
      let n = await this.fetchGlobalConfigAccount();
      return this.program.methods
        .adminSetCoinCreator(t)
        .accountsPartial({
          pool: R(0, U(e), e, r.w),
          adminSetCoinCreatorAuthority: n.adminSetCoinCreatorAuthority,
          globalConfig: M,
        })
        .instruction();
    }
    async adminUpdateTokenIncentives(
      e,
      t,
      n,
      a,
      o = new s.default(86400),
      i = S,
      u = r.S,
    ) {
      let { admin: c } = await this.fetchGlobalConfigAccount();
      return this.program.methods
        .adminUpdateTokenIncentives(e, t, o, n, a)
        .accountsPartial({ admin: c, mint: i, tokenProgram: u })
        .instruction();
    }
  };
  function K(e, t, n, a, o) {
    if (t < 0 || t > 100)
      throw Error("Slippage must be between 0 and 100 (0% to 100%)");
    let r = e.mul(a).div(n),
      i = new s.default((1 + t / 100) * 1e9),
      u = e.mul(i).div(new s.default(1e9)),
      c = r.mul(i).div(new s.default(1e9));
    return { token1: r, lpToken: e.mul(o).div(n), maxToken0: u, maxToken1: c };
  }
  function j(e, t) {
    return e.add(t).sub(new s.default(1)).div(t);
  }
  function H({
    globalConfig: e,
    feeConfig: t,
    creator: n,
    baseMintSupply: a,
    baseMint: o,
    baseReserve: r,
    quoteReserve: i,
    tradeSize: s,
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
      })({ baseMintSupply: a, baseReserve: r, quoteReserve: i });
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
        isPumpPool: U(o).equals(n),
        marketCap: e,
        tradeSize: s,
      });
    }
    return {
      lpFeeBps: e.lpFeeBasisPoints,
      protocolFeeBps: e.protocolFeeBasisPoints,
      creatorFeeBps: e.coinCreatorFeeBasisPoints,
    };
  }
  var Z = new s.default(1e4),
    $ = W(null),
    J = new (class {
      constructor() {
        this.offlineProgram = $;
      }
      decodeGlobalConfig(e) {
        return this.offlineProgram.coder.accounts.decode(
          "globalConfig",
          e.data,
        );
      }
      decodeFeeConfig(e) {
        return this.offlineProgram.coder.accounts.decode("feeConfig", e.data);
      }
      decodePool(e) {
        return this.offlineProgram.coder.accounts.decode("pool", e.data);
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
          index: a,
          creator: o,
          baseMint: r,
          quoteMint: s,
          poolKey: u,
          baseTokenProgram: c,
          quoteTokenProgram: m,
          userBaseTokenAccount: d,
          userQuoteTokenAccount: p,
          poolBaseTokenAccount: _,
          poolQuoteTokenAccount: y,
          userBaseAccountInfo: f,
          userQuoteAccountInfo: b,
          poolBaseAccountInfo: g,
          poolQuoteAccountInfo: h,
        } = e;
        return await this.withWsolAccounts(
          o,
          r,
          d,
          this.accountExists(f, c),
          t,
          s,
          p,
          this.accountExists(b, m),
          n,
          async () => {
            let e = [];
            return (
              this.accountExists(g, c) || e.push((0, l.f)(o, _, u, r, c)),
              this.accountExists(h, m) || e.push((0, l.f)(o, y, u, s, m)),
              e.push(
                await this.offlineProgram.methods
                  .createPool(a, t, n, i.SystemProgram.programId, !1, { 0: !1 })
                  .accountsPartial({
                    globalConfig: M,
                    baseMint: r,
                    quoteMint: s,
                    creator: o,
                    userBaseTokenAccount: d,
                    userQuoteTokenAccount: p,
                    baseTokenProgram: c,
                    quoteTokenProgram: m,
                  })
                  .instruction(),
              ),
              e
            );
          },
        );
      }
      async depositInstructionsInternal(e, t, n, a) {
        let {
            pool: o,
            user: i,
            userPoolAccountInfo: s,
            userBaseTokenAccount: u,
            userQuoteTokenAccount: c,
            userPoolTokenAccount: m,
            userBaseAccountInfo: d,
            userQuoteAccountInfo: p,
            baseTokenProgram: _,
            quoteTokenProgram: y,
          } = e,
          { baseMint: f, quoteMint: b, lpMint: g } = o,
          h = this.liquidityAccounts(e);
        return await this.withFixPoolInstructions(
          e,
          async () =>
            await this.withWsolAccounts(
              i,
              f,
              u,
              this.accountExists(d, _),
              n,
              b,
              c,
              this.accountExists(p, y),
              a,
              async () => {
                let e = [];
                return (
                  this.accountExists(s, r.S) ||
                    e.push((0, l.f)(i, m, i, g, r.S)),
                  e.push(
                    await this.offlineProgram.methods
                      .deposit(t, n, a)
                      .accounts(h)
                      .instruction(),
                  ),
                  e
                );
              },
            ),
        );
      }
      async withWsolAccounts(e, t, n, a, o, r, i, s, u, c) {
        return await this.withWsolAccount(e, e, t, n, a, o, async () =>
          this.withWsolAccount(e, e, r, i, s, u, c),
        );
      }
      async withWsolAccount(e, t, n, a, o, s, u, c = !0) {
        let m = [];
        return (
          n.equals(r.w) &&
            (o || m.push((0, l.f)(e, a, t, r.w)),
            s.gtn(0) &&
              m.push(
                i.SystemProgram.transfer({
                  fromPubkey: t,
                  toPubkey: a,
                  lamports: BigInt(s.toString()),
                }),
                (0, p.f)(a),
              )),
          m.push(...(await u())),
          n.equals(r.w) && c && m.push((0, d.f)(a, t, t, void 0, r.z)),
          m
        );
      }
      accountExists(e, t) {
        return null !== e && e.owner.equals(t);
      }
      depositBaseInput(e, t, n) {
        let { pool: a, poolBaseTokenAccount: o, poolQuoteTokenAccount: r } = e,
          {
            token1: i,
            lpToken: u,
            maxToken0: c,
            maxToken1: m,
          } = K(
            t,
            n,
            new s.default(o.amount.toString()),
            new s.default(r.amount.toString()),
            a.lpSupply,
          );
        return { quote: i, lpToken: u, maxBase: c, maxQuote: m };
      }
      depositQuoteInput(e, t, n) {
        let { pool: a, poolBaseTokenAccount: o, poolQuoteTokenAccount: r } = e,
          {
            token1: i,
            lpToken: u,
            maxToken0: c,
            maxToken1: m,
          } = K(
            t,
            n,
            new s.default(r.amount.toString()),
            new s.default(o.amount.toString()),
            a.lpSupply,
          );
        return { base: i, lpToken: u, maxBase: m, maxQuote: c };
      }
      async withdrawInstructionsInternal(e, t, n, a) {
        let {
            pool: o,
            baseTokenProgram: i,
            quoteTokenProgram: s,
            user: u,
            userBaseAccountInfo: c,
            userQuoteAccountInfo: m,
            userBaseTokenAccount: p,
            userQuoteTokenAccount: _,
          } = e,
          { baseMint: y, quoteMint: f } = o,
          b = this.liquidityAccounts(e);
        return await this.withFixPoolInstructions(e, async () => {
          let e = [],
            o = !1;
          !this.accountExists(c, i) &&
            (e.push((0, l.f)(u, p, u, y, i)), y.equals(r.w) && (o = !0));
          let g = !1;
          return (
            !this.accountExists(m, s) &&
              (e.push((0, l.f)(u, _, u, f, s)), f.equals(r.w) && (g = !0)),
            e.push(
              await this.offlineProgram.methods
                .withdraw(t, n, a)
                .accounts(b)
                .instruction(),
            ),
            o && e.push((0, d.f)(p, u, u, void 0, r.z)),
            g && e.push((0, d.f)(_, u, u, void 0, r.z)),
            e
          );
        });
      }
      withdrawInputs(e, t, n) {
        let { pool: a, poolBaseTokenAccount: o, poolQuoteTokenAccount: r } = e;
        return (function (e, t, n, a, o) {
          if (e.isZero() || o.isZero())
            throw Error("LP amount or total LP tokens cannot be zero.");
          let r = n.mul(e).div(o),
            i = a.mul(e).div(o),
            u = new s.default(1e9),
            c = new s.default((1 - t / 100) * 1e9),
            m = r.mul(c).div(u),
            l = i.mul(c).div(u);
          return { base: r, quote: i, minBase: m, minQuote: l };
        })(
          t,
          n,
          new s.default(o.amount.toString()),
          new s.default(r.amount.toString()),
          a.lpSupply,
        );
      }
      liquidityAccounts(e) {
        let {
            poolKey: t,
            pool: n,
            user: a,
            userBaseTokenAccount: o,
            userQuoteTokenAccount: i,
            userPoolTokenAccount: s,
          } = e,
          {
            baseMint: u,
            quoteMint: c,
            lpMint: m,
            poolBaseTokenAccount: l,
            poolQuoteTokenAccount: d,
          } = n;
        return {
          pool: t,
          globalConfig: M,
          user: a,
          baseMint: u,
          quoteMint: c,
          lpMint: m,
          userBaseTokenAccount: o,
          userQuoteTokenAccount: i,
          userPoolTokenAccount: s,
          poolBaseTokenAccount: l,
          poolQuoteTokenAccount: d,
          tokenProgram: r.z,
          token2022Program: r.S,
          eventAuthority: F,
          program: P,
        };
      }
      async buyInstructions(e, t, n) {
        return await this.withFixPoolInstructions(
          e,
          async () => await this.buyInstructionsNoPool(e, t, n),
        );
      }
      async buyInstructionsNoPool(e, t, n) {
        let { userBaseAccountInfo: a, userQuoteAccountInfo: o, pool: i } = e,
          s = this.swapAccounts(e),
          {
            user: c,
            baseMint: m,
            quoteMint: p,
            userBaseTokenAccount: _,
            userQuoteTokenAccount: y,
            baseTokenProgram: f,
            quoteTokenProgram: b,
          } = s,
          g = D(i.baseMint);
        return this.withWsolAccount(
          c,
          c,
          p,
          y,
          this.accountExists(o, b),
          n,
          async () => {
            let e = [];
            return (
              this.accountExists(a, f) || e.push((0, l.f)(c, _, c, m, f)),
              i.isCashbackCoin
                ? e.push(
                    await this.offlineProgram.methods
                      .buy(t, n, { 0: !0 })
                      .accounts(s)
                      .remainingAccounts([
                        {
                          pubkey: (0, u.h)(r.w, V(c), !0, b),
                          isWritable: !0,
                          isSigner: !1,
                        },
                        { pubkey: g, isWritable: !1, isSigner: !1 },
                      ])
                      .instruction(),
                  )
                : e.push(
                    await this.offlineProgram.methods
                      .buy(t, n, { 0: !0 })
                      .accounts(s)
                      .remainingAccounts([
                        { pubkey: g, isWritable: !1, isSigner: !1 },
                      ])
                      .instruction(),
                  ),
              m.equals(r.w) && e.push((0, d.f)(_, c, c, void 0, r.z)),
              e
            );
          },
        );
      }
      async buyBaseInput(e, t, n) {
        let {
            baseMint: a,
            baseMintAccount: o,
            feeConfig: r,
            globalConfig: u,
            pool: c,
            poolBaseAmount: m,
            poolQuoteAmount: l,
          } = e,
          { coinCreator: d, creator: p } = c,
          { maxQuote: _ } = (function ({
            base: e,
            slippage: t,
            baseReserve: n,
            quoteReserve: a,
            globalConfig: o,
            baseMintAccount: r,
            baseMint: u,
            coinCreator: c,
            creator: m,
            feeConfig: l,
          }) {
            if (n.isZero() || a.isZero())
              throw Error(
                "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
              );
            if (e.gt(n))
              throw Error(
                "Cannot buy more base tokens than the pool reserves.",
              );
            let d = a.mul(e),
              p = n.sub(e);
            if (p.isZero())
              throw Error("Pool would be depleted; denominator is zero.");
            let _ = z(d, p),
              {
                lpFeeBps: y,
                protocolFeeBps: f,
                creatorFeeBps: b,
              } = H({
                globalConfig: o,
                feeConfig: l,
                creator: m,
                baseMintSupply: new s.default(r.supply.toString()),
                baseMint: u,
                baseReserve: n,
                quoteReserve: a,
                tradeSize: _,
              }),
              g = G(_, y),
              h = G(_, f),
              k = i.PublicKey.default.equals(c) ? new s.default(0) : G(_, b),
              v = _.add(g).add(h).add(k),
              w = new s.default(1e9),
              A = new s.default(Math.floor((1 + t / 100) * 1e9)),
              C = v.mul(A).div(w);
            return { internalQuoteAmount: _, uiQuote: v, maxQuote: C };
          })({
            base: t,
            slippage: n,
            baseReserve: m,
            quoteReserve: l,
            baseMintAccount: o,
            baseMint: a,
            coinCreator: d,
            creator: p,
            feeConfig: r,
            globalConfig: u,
          });
        return this.buyInstructions(e, t, _);
      }
      async buyQuoteInput(e, t, n) {
        let {
            baseMint: a,
            baseMintAccount: o,
            feeConfig: r,
            globalConfig: u,
            pool: c,
            poolBaseAmount: m,
            poolQuoteAmount: l,
          } = e,
          { coinCreator: d, creator: p } = c,
          { base: _, maxQuote: y } = (function ({
            quote: e,
            slippage: t,
            baseReserve: n,
            quoteReserve: a,
            globalConfig: o,
            baseMintAccount: r,
            baseMint: u,
            coinCreator: c,
            creator: m,
            feeConfig: l,
          }) {
            if (n.isZero() || a.isZero())
              throw Error(
                "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
              );
            let {
                lpFeeBps: d,
                protocolFeeBps: p,
                creatorFeeBps: _,
              } = H({
                globalConfig: o,
                feeConfig: l,
                creator: m,
                baseMintSupply: new s.default(r.supply.toString()),
                baseMint: u,
                baseReserve: n,
                quoteReserve: a,
                tradeSize: e,
              }),
              y = d
                .add(p)
                .add(i.PublicKey.default.equals(c) ? new s.default(0) : _),
              f = new s.default(1e4).add(y),
              b = e.mul(new s.default(1e4)).div(f),
              g = n.mul(b),
              h = a.add(b);
            if (h.isZero())
              throw Error("Pool would be depleted; denominator is zero.");
            let k = g.div(h),
              v = new s.default(1e9),
              w = new s.default(Math.floor((1 + t / 100) * 1e9));
            return {
              base: k,
              internalQuoteWithoutFees: b,
              maxQuote: e.mul(w).div(v),
            };
          })({
            quote: t,
            slippage: n,
            baseReserve: m,
            quoteReserve: l,
            baseMintAccount: o,
            baseMint: a,
            coinCreator: d,
            creator: p,
            feeConfig: r,
            globalConfig: u,
          });
        return this.buyInstructions(e, _, y);
      }
      async sellInstructions(e, t, n) {
        return await this.withFixPoolInstructions(
          e,
          async () => await this.sellInstructionsNoPool(e, t, n),
        );
      }
      async withFixPoolInstructions(e, t) {
        let { poolAccountInfo: n, poolKey: a, user: o } = e,
          r = [];
        return (
          (null === n || n.data.length < 300) &&
            r.push(
              await this.offlineProgram.methods
                .extendAccount()
                .accountsPartial({ account: a, user: o })
                .instruction(),
            ),
          [...r, ...(await t())]
        );
      }
      async sellInstructionsNoPool(e, t, n) {
        let { userBaseAccountInfo: a, userQuoteAccountInfo: o, pool: i } = e,
          s = this.swapAccounts(e),
          c = D(i.baseMint),
          {
            user: m,
            baseMint: p,
            quoteMint: _,
            userBaseTokenAccount: y,
            userQuoteTokenAccount: f,
            baseTokenProgram: b,
            quoteTokenProgram: g,
          } = s;
        return this.withWsolAccount(
          m,
          m,
          p,
          y,
          this.accountExists(a, b),
          t,
          async () => {
            let e = [];
            return (
              this.accountExists(o, g) || e.push((0, l.f)(m, f, m, _, g)),
              i.isCashbackCoin
                ? e.push(
                    await this.offlineProgram.methods
                      .sell(t, n)
                      .accounts(s)
                      .remainingAccounts([
                        {
                          pubkey: (0, u.h)(_, V(m), !0, g),
                          isWritable: !0,
                          isSigner: !1,
                        },
                        { pubkey: V(m), isWritable: !0, isSigner: !1 },
                        { pubkey: c, isWritable: !1, isSigner: !1 },
                      ])
                      .instruction(),
                  )
                : e.push(
                    await this.offlineProgram.methods
                      .sell(t, n)
                      .accounts(s)
                      .remainingAccounts([
                        { pubkey: c, isWritable: !1, isSigner: !1 },
                      ])
                      .instruction(),
                  ),
              _.equals(r.w) && e.push((0, d.f)(f, m, m, void 0, r.z)),
              e
            );
          },
        );
      }
      async sellBaseInput(e, t, n) {
        let {
            baseMint: a,
            baseMintAccount: o,
            feeConfig: r,
            globalConfig: u,
            pool: c,
            poolBaseAmount: m,
            poolQuoteAmount: l,
          } = e,
          { coinCreator: d, creator: p } = c,
          { minQuote: _ } = (function ({
            base: e,
            slippage: t,
            baseReserve: n,
            quoteReserve: a,
            globalConfig: o,
            baseMintAccount: r,
            baseMint: u,
            coinCreator: c,
            creator: m,
            feeConfig: l,
          }) {
            if (n.isZero() || a.isZero())
              throw Error(
                "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
              );
            let d = a.mul(e).div(n.add(e)),
              {
                lpFeeBps: p,
                protocolFeeBps: _,
                creatorFeeBps: y,
              } = H({
                globalConfig: o,
                feeConfig: l,
                creator: m,
                baseMintSupply: new s.default(r.supply.toString()),
                baseMint: u,
                baseReserve: n,
                quoteReserve: a,
                tradeSize: d,
              }),
              f = G(d, p),
              b = G(d, _),
              g = i.PublicKey.default.equals(c) ? new s.default(0) : G(d, y),
              h = d.sub(f).sub(b).sub(g);
            if (h.isNeg())
              throw Error("Fees exceed total output; final quote is negative.");
            let k = new s.default(1e9),
              v = new s.default(Math.floor((1 - t / 100) * 1e9)),
              w = h.mul(v).div(k);
            return { uiQuote: h, minQuote: w, internalQuoteAmountOut: d };
          })({
            base: t,
            slippage: n,
            baseReserve: m,
            quoteReserve: l,
            baseMintAccount: o,
            baseMint: a,
            coinCreator: d,
            creator: p,
            feeConfig: r,
            globalConfig: u,
          });
        return this.sellInstructions(e, t, _);
      }
      async sellQuoteInput(e, t, n) {
        let {
            baseMint: a,
            baseMintAccount: o,
            feeConfig: r,
            globalConfig: u,
            pool: c,
            poolBaseAmount: m,
            poolQuoteAmount: l,
          } = e,
          { coinCreator: d, creator: p } = c,
          { base: _, minQuote: y } = (function ({
            quote: e,
            slippage: t,
            baseReserve: n,
            quoteReserve: a,
            globalConfig: o,
            baseMintAccount: r,
            baseMint: u,
            coinCreator: c,
            creator: m,
            feeConfig: l,
          }) {
            var d;
            let p, _;
            if (n.isZero() || a.isZero())
              throw Error(
                "Invalid input: 'baseReserve' or 'quoteReserve' cannot be zero.",
              );
            if (e.gt(a))
              throw Error(
                "Cannot receive more quote tokens than the pool quote reserves.",
              );
            let {
                lpFeeBps: y,
                protocolFeeBps: f,
                creatorFeeBps: b,
              } = H({
                globalConfig: o,
                feeConfig: l,
                creator: m,
                baseMintSupply: new s.default(r.supply.toString()),
                baseMint: u,
                baseReserve: n,
                quoteReserve: a,
                tradeSize: e,
              }),
              g =
                ((d = i.PublicKey.default.equals(c) ? new s.default(0) : b),
                (p = y.add(f).add(d)),
                (_ = Z.sub(p)),
                z(e.mul(Z), _));
            if (g.gte(a))
              throw Error(
                "Invalid input: Desired quote amount exceeds available reserve.",
              );
            let h = z(n.mul(g), a.sub(g)),
              k = new s.default(1e9),
              v = new s.default(Math.floor((1 - t / 100) * 1e9));
            return { internalRawQuote: g, base: h, minQuote: e.mul(v).div(k) };
          })({
            quote: t,
            slippage: n,
            baseReserve: m,
            quoteReserve: l,
            baseMintAccount: o,
            baseMint: a,
            coinCreator: d,
            creator: p,
            feeConfig: r,
            globalConfig: u,
          });
        return this.sellInstructions(e, _, y);
      }
      async extendAccount(e, t) {
        return this.offlineProgram.methods
          .extendAccount()
          .accountsPartial({ account: e, user: t })
          .instruction();
      }
      async collectCoinCreatorFee(e, t) {
        let {
            coinCreator: n,
            quoteMint: a,
            quoteTokenProgram: o,
            coinCreatorVaultAuthority: r,
            coinCreatorVaultAta: i,
            coinCreatorTokenAccount: u,
            coinCreatorVaultAtaAccountInfo: c,
            coinCreatorTokenAccountInfo: m,
          } = e,
          l = t ?? n,
          d = n.equals(l);
        return await this.withWsolAccount(
          l,
          r,
          a,
          i,
          this.accountExists(c, o),
          new s.default(0),
          async () =>
            await this.withWsolAccount(
              l,
              n,
              a,
              u,
              this.accountExists(m, o),
              new s.default(0),
              async () => [
                await this.offlineProgram.methods
                  .collectCoinCreatorFee()
                  .accountsPartial({
                    coinCreator: n,
                    coinCreatorTokenAccount: u,
                    quoteMint: a,
                    quoteTokenProgram: o,
                  })
                  .instruction(),
              ],
              d,
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
            pool: a,
            baseTokenProgram: o,
            quoteTokenProgram: s,
            user: c,
            userBaseTokenAccount: m,
            userQuoteTokenAccount: l,
          } = e,
          d = (function (e, t) {
            if (!t)
              return e.protocolFeeRecipients[
                Math.floor(Math.random() * e.protocolFeeRecipients.length)
              ];
            {
              let t = [e.reservedFeeRecipient, ...e.reservedFeeRecipients];
              return t[Math.floor(Math.random() * t.length)];
            }
          })(t, a.isMayhemMode),
          {
            baseMint: p,
            quoteMint: _,
            poolBaseTokenAccount: y,
            poolQuoteTokenAccount: f,
            coinCreator: b,
          } = a,
          g = N(b);
        return {
          pool: n,
          globalConfig: M,
          user: c,
          baseMint: p,
          quoteMint: _,
          userBaseTokenAccount: m,
          userQuoteTokenAccount: l,
          poolBaseTokenAccount: y,
          poolQuoteTokenAccount: f,
          protocolFeeRecipient: d,
          protocolFeeRecipientTokenAccount: (0, u.h)(_, d, !0, s),
          baseTokenProgram: o,
          quoteTokenProgram: s,
          systemProgram: i.SystemProgram.programId,
          associatedTokenProgram: r.x,
          eventAuthority: F,
          program: P,
          coinCreatorVaultAta: L(g, _, s),
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
        let { pool: a, poolBaseTokenAccount: o, poolQuoteTokenAccount: r } = e,
          { maxBase: i, maxQuote: u } = (function (e, t, n, a, o) {
            if (o.isZero())
              throw Error("Division by zero: totalLpTokens cannot be zero");
            let r = j(n.mul(e), o),
              i = j(a.mul(e), o),
              u = new s.default((1 + t / 100) * 1e9),
              c = new s.default(1e9);
            return { maxBase: r.mul(u).div(c), maxQuote: i.mul(u).div(c) };
          })(
            t,
            n,
            new s.default(o.amount.toString()),
            new s.default(r.amount.toString()),
            a.lpSupply,
          );
        return this.depositInstructionsInternal(e, t, i, u);
      }
      depositAutocompleteQuoteAndLpTokenFromBase(e, t, n) {
        let { quote: a, lpToken: o } = this.depositBaseInput(e, t, n);
        return { quote: a, lpToken: o };
      }
      depositAutocompleteBaseAndLpTokenFromQuote(e, t, n) {
        let { base: a, lpToken: o } = this.depositQuoteInput(e, t, n);
        return { base: a, lpToken: o };
      }
      async withdrawInstructions(e, t, n) {
        let { minBase: a, minQuote: o } = this.withdrawInputs(e, t, n);
        return this.withdrawInstructionsInternal(e, t, a, o);
      }
      withdrawAutoCompleteBaseAndQuoteFromLpToken(e, t, n) {
        let { base: a, quote: o } = this.withdrawInputs(e, t, n);
        return { base: a, quote: o };
      }
    })(),
    X = class {
      constructor(e) {
        ((this.connection = e), (this.program = W(e)));
      }
      fetchGlobalConfigAccount() {
        return this.program.account.globalConfig.fetch(M);
      }
      fetchFeeConfigAccount() {
        return this.program.account.feeConfig.fetch(x);
      }
      fetchPool(e) {
        return this.program.account.pool.fetch(e);
      }
      fetchGlobalVolumeAccumulator() {
        return this.program.account.globalVolumeAccumulator.fetch(I);
      }
      fetchUserVolumeAccumulator(e) {
        return this.program.account.userVolumeAccumulator.fetchNullable(V(e));
      }
      async createPoolSolanaState(e, t, n, a, o, r) {
        let [i, s, c] = await this.connection.getMultipleAccountsInfo([
          M,
          n,
          a,
        ]);
        if (null === i) throw Error("Global config account not found");
        if (null === s) throw Error(`baseMint=${n.toString()} not found`);
        if (null === c) throw Error(`quoteMint=${a.toString()} not found`);
        let m = J.decodeGlobalConfig(i),
          [l, d] = [s.owner, c.owner],
          p = R(e, t, n, a),
          _ = (0, u.h)(n, p, !0, l),
          y = (0, u.h)(a, p, !0, d),
          [f, b] = await this.connection.getMultipleAccountsInfo([_, y]);
        (void 0 === o && (o = (0, u.h)(n, t, !0, l)),
          void 0 === r && (r = (0, u.h)(a, t, !0, d)));
        let [g, h] = await this.connection.getMultipleAccountsInfo([o, r]);
        return {
          index: e,
          creator: t,
          baseMint: n,
          quoteMint: a,
          globalConfig: m,
          poolKey: p,
          poolBaseTokenAccount: _,
          poolQuoteTokenAccount: y,
          baseTokenProgram: l,
          quoteTokenProgram: d,
          userBaseTokenAccount: o,
          userQuoteTokenAccount: r,
          userBaseAccountInfo: g,
          userQuoteAccountInfo: h,
          poolBaseAccountInfo: f,
          poolQuoteAccountInfo: b,
        };
      }
      async swapSolanaState(e, t, n, a) {
        let [o, r, i] = await this.connection.getMultipleAccountsInfo([
          M,
          x,
          e,
        ]);
        if (null === o) throw Error("Global config account not found");
        if (null === i) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(o),
          l = r ? J.decodeFeeConfig(r) : null,
          d = J.decodePool(i),
          {
            baseMint: p,
            quoteMint: _,
            poolBaseTokenAccount: y,
            poolQuoteTokenAccount: f,
          } = d,
          [b, g, h, k] = await this.connection.getMultipleAccountsInfo([
            p,
            _,
            y,
            f,
          ]);
        if (null === b) throw Error(`baseMint=${p.toString()} not found`);
        let v = u.x.decode(b.data);
        if (null === g) throw Error(`quoteMint=${_.toString()} not found`);
        if (null === h)
          throw Error(`Pool base token account ${y.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${f.toString()} not found`);
        let [w, A] = [b.owner, g.owner],
          C = m.d.decode(h.data),
          P = m.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(p, t, !0, w)),
          void 0 === a && (a = (0, u.h)(_, t, !0, A)));
        let [B, S] = await this.connection.getMultipleAccountsInfo([n, a]);
        return {
          globalConfig: c,
          feeConfig: l,
          poolKey: e,
          poolAccountInfo: i,
          pool: d,
          poolBaseAmount: new s.default(C.amount.toString()),
          poolQuoteAmount: new s.default(P.amount.toString()),
          baseTokenProgram: w,
          quoteTokenProgram: A,
          baseMint: p,
          baseMintAccount: v,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: a,
          userBaseAccountInfo: B,
          userQuoteAccountInfo: S,
        };
      }
      async swapSolanaStateNoPool(e, t, n, a) {
        let [o, r, i] = await this.connection.getMultipleAccountsInfo([
          M,
          x,
          e,
        ]);
        if (null === o) throw Error("Global config account not found");
        if (null === i) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(o),
          l = r ? J.decodeFeeConfig(r) : null,
          d = J.decodePool(i),
          {
            baseMint: p,
            quoteMint: _,
            poolBaseTokenAccount: y,
            poolQuoteTokenAccount: f,
          } = d,
          [b, g, h, k] = await this.connection.getMultipleAccountsInfo([
            p,
            _,
            y,
            f,
          ]);
        if (null === b) throw Error(`baseMint=${p.toString()} not found`);
        let v = u.x.decode(b.data);
        if (null === g) throw Error(`quoteMint=${_.toString()} not found`);
        if (null === h)
          throw Error(`Pool base token account ${y.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${f.toString()} not found`);
        let [w, A] = [b.owner, g.owner],
          C = m.d.decode(h.data),
          P = m.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(p, t, !0, w)),
          void 0 === a && (a = (0, u.h)(_, t, !0, A)));
        let [B, S] = await this.connection.getMultipleAccountsInfo([n, a]);
        return {
          globalConfig: c,
          feeConfig: l,
          poolKey: e,
          poolAccountInfo: i,
          pool: d,
          poolBaseAmount: new s.default(C.amount.toString()),
          poolQuoteAmount: new s.default(P.amount.toString()),
          baseTokenProgram: w,
          quoteTokenProgram: A,
          baseMint: p,
          baseMintAccount: v,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: a,
          userBaseAccountInfo: B,
          userQuoteAccountInfo: S,
        };
      }
      async liquiditySolanaState(e, t, n, a, o) {
        let [i, s] = await this.connection.getMultipleAccountsInfo([M, e]);
        if (null === i) throw Error("Global config account not found");
        if (null === s) throw Error("Pool account not found");
        let c = J.decodeGlobalConfig(i),
          l = J.decodePool(s),
          {
            baseMint: d,
            quoteMint: p,
            lpMint: _,
            poolBaseTokenAccount: y,
            poolQuoteTokenAccount: f,
          } = l,
          [b, g, h, k] = await this.connection.getMultipleAccountsInfo([
            d,
            p,
            y,
            f,
          ]);
        if (null === b) throw Error(`baseMint=${d.toString()} not found`);
        if (null === g) throw Error(`quoteMint=${p.toString()} not found`);
        if (null === h)
          throw Error(`Pool base token account ${y.toString()} not found`);
        if (null === k)
          throw Error(`Pool quote token account ${f.toString()} not found`);
        let [v, w] = [b.owner, g.owner],
          A = m.d.decode(h.data),
          C = m.d.decode(k.data);
        (void 0 === n && (n = (0, u.h)(d, t, !0, v)),
          void 0 === a && (a = (0, u.h)(p, t, !0, w)),
          void 0 === o && (o = (0, u.h)(_, t, !0, r.S)));
        let [P, B, S] = await this.connection.getMultipleAccountsInfo([
          n,
          a,
          o,
        ]);
        return {
          globalConfig: c,
          poolKey: e,
          poolAccountInfo: s,
          pool: l,
          poolBaseTokenAccount: A,
          poolQuoteTokenAccount: C,
          baseTokenProgram: v,
          quoteTokenProgram: w,
          user: t,
          userBaseTokenAccount: n,
          userQuoteTokenAccount: a,
          userPoolTokenAccount: o,
          userBaseAccountInfo: P,
          userQuoteAccountInfo: B,
          userPoolAccountInfo: S,
        };
      }
      async collectCoinCreatorFeeSolanaState(e, t) {
        let n = r.w,
          a = r.z,
          o = N(e),
          i = L(o, n, a);
        void 0 === t && (t = (0, u.h)(n, e, !0, a));
        let [s, c] = await this.connection.getMultipleAccountsInfo([i, t]);
        return {
          coinCreator: e,
          quoteMint: n,
          quoteTokenProgram: a,
          coinCreatorVaultAuthority: o,
          coinCreatorVaultAta: i,
          coinCreatorTokenAccount: t,
          coinCreatorVaultAtaAccountInfo: s,
          coinCreatorTokenAccountInfo: c,
        };
      }
      async getCoinCreatorVaultBalance(e) {
        let t = r.w,
          n = r.z,
          a = L(N(e), t, n);
        try {
          let e = await (0, m.l)(this.connection, a, void 0, n);
          return new s.default(e.amount.toString());
        } catch (e) {
          return (
            console.warn(`Error fetching token account ${a}:`, e),
            new s.default(0)
          );
        }
      }
      async claimTokenIncentives(e, t) {
        let { mint: n } = await this.fetchGlobalVolumeAccumulator();
        if (n.equals(i.PublicKey.default)) return [];
        let [a, o] = await this.connection.getMultipleAccountsInfo([n, V(e)]);
        return a && o
          ? [
              await $.methods
                .claimTokenIncentives()
                .accountsPartial({
                  user: e,
                  payer: t,
                  mint: n,
                  tokenProgram: a.owner,
                })
                .instruction(),
            ]
          : [];
      }
      async getTotalUnclaimedTokens(e) {
        let [t, n] = await this.connection.getMultipleAccountsInfo([I, V(e)]);
        return t && n
          ? (function (e, t, n = Date.now() / 1e3) {
              let {
                  startTime: a,
                  endTime: o,
                  secondsInADay: r,
                  totalTokenSupply: i,
                  solVolumes: u,
                } = e,
                {
                  totalUnclaimedTokens: c,
                  currentSolVolume: m,
                  lastUpdateTimestamp: l,
                } = t;
              if (a.eqn(0) || o.eqn(0) || r.eqn(0)) return c;
              let d = new s.default(n);
              if (d.lt(a)) return c;
              let p = d.sub(a).div(r).toNumber();
              if (l.lt(a)) return c;
              let _ = l.sub(a).div(r).toNumber();
              if (o.lt(a)) return c;
              let y = o.sub(a).div(r).toNumber();
              if (p > _ && _ <= y) {
                let e = i[_],
                  t = u[_];
                return t.eqn(0) ? c : c.add(m.mul(e).div(t));
              }
              return c;
            })(
              J.decodeGlobalVolumeAccumulator(t),
              J.decodeUserVolumeAccumulator(n),
            )
          : new s.default(0);
      }
      async getCurrentDayTokens(e) {
        let [t, n] = await this.connection.getMultipleAccountsInfo([I, V(e)]);
        return t && n
          ? (function (e, t, n = Date.now() / 1e3) {
              let {
                  startTime: a,
                  endTime: o,
                  secondsInADay: r,
                  totalTokenSupply: i,
                  solVolumes: u,
                } = e,
                { currentSolVolume: c, lastUpdateTimestamp: m } = t;
              if (a.eqn(0) || o.eqn(0) || r.eqn(0)) return new s.default(0);
              let l = new s.default(n);
              if (l.lt(a) || l.gt(o)) return new s.default(0);
              let d = l.sub(a).div(r).toNumber();
              if (m.lt(a)) return new s.default(0);
              let p = m.sub(a).div(r).toNumber();
              if (o.lt(a) || d !== p) return new s.default(0);
              let _ = i[d],
                y = u[d];
              return y.eqn(0) ? new s.default(0) : c.mul(_).div(y);
            })(
              J.decodeGlobalVolumeAccumulator(t),
              J.decodeUserVolumeAccumulator(n),
            )
          : new s.default(0);
      }
    },
    Y = e.i(259390),
    ee = e.i(648470),
    et = {
      address: "pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4",
      metadata: {
        name: "pump_agent_payments",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
      },
      instructions: [
        {
          name: "agent_accept_payment",
          discriminator: [34, 157, 64, 220, 74, 32, 48, 225],
          accounts: [
            { name: "user", writable: !0, signer: !0 },
            { name: "user_token_account", writable: !0 },
            { name: "token_agent_payments" },
            {
              name: "token_agent_associated_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "token_agent_payments" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "invoice_id" },
            { name: "currency_mint" },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "amount", type: "u64" },
            { name: "memo", type: "u64" },
            { name: "start_time", type: "i64" },
            { name: "end_time", type: "i64" },
          ],
        },
        {
          name: "agent_buyback_trigger",
          discriminator: [95, 231, 193, 2, 245, 75, 125, 155],
          accounts: [
            { name: "global_buyback_authority", writable: !0, signer: !0 },
            { name: "mint", writable: !0 },
            {
              name: "token_agent_payments",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      116, 111, 107, 101, 110, 45, 97, 103, 101, 110, 116, 45,
                      112, 97, 121, 109, 101, 110, 116, 115,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            { name: "currency_mint" },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "swap_program_to_invoke" },
            {
              name: "burn_authority",
              docs: [
                "Intentionally called burn_authority",
                "TO avoid any confusion with the global buyback authority.",
              ],
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 117, 121, 98, 97, 99, 107, 45, 97, 117, 116, 104, 111,
                      114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "burn_mint_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "burn_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "swap_instruction_data", type: "bytes" }],
        },
        {
          name: "agent_distribute_payments",
          discriminator: [145, 44, 246, 47, 192, 204, 95, 32],
          accounts: [
            { name: "user", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "currency_mint" },
            { name: "token_agent_payments" },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            {
              name: "token_agent_associated_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "token_agent_payments" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "buyback_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 117, 121, 98, 97, 99, 107, 45, 97, 117, 116, 104, 111,
                      114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "withdraw_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      119, 105, 116, 104, 100, 114, 97, 119, 45, 97, 117, 116,
                      104, 111, 114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "buyback_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "withdraw_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "withdraw_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "agent_initialize",
          discriminator: [180, 248, 163, 8, 49, 94, 126, 96],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
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
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "mint" },
            {
              name: "token_agent_payments",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      116, 111, 107, 101, 110, 45, 97, 103, 101, 110, 116, 45,
                      112, 97, 121, 109, 101, 110, 116, 115,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "authority", type: "pubkey" },
            { name: "buyback_bps", type: "u16" },
          ],
        },
        {
          name: "agent_update_authority",
          discriminator: [237, 228, 227, 224, 226, 198, 167, 83],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "token_agent_payments", writable: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "new_authority", type: "pubkey" }],
        },
        {
          name: "agent_update_buyback_bps",
          discriminator: [41, 28, 118, 90, 53, 24, 63, 160],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            { name: "token_agent_payments", writable: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "buyback_bps", type: "u16" }],
        },
        {
          name: "agent_withdraw",
          discriminator: [13, 149, 99, 245, 171, 171, 185, 53],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            { name: "token_agent_payments" },
            { name: "currency_mint" },
            {
              name: "withdraw_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      119, 105, 116, 104, 100, 114, 97, 119, 45, 97, 117, 116,
                      104, 111, 114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "withdraw_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "withdraw_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "receiver_ata", writable: !0 },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "close_account",
          discriminator: [125, 255, 149, 14, 110, 34, 72, 24],
          accounts: [
            { name: "account", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "extend_account",
          discriminator: [234, 102, 194, 203, 150, 72, 62, 229],
          accounts: [
            { name: "account", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "global_add_new_currency",
          discriminator: [46, 135, 47, 120, 118, 204, 177, 224],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "mint" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "global_config_initialize",
          discriminator: [61, 23, 208, 192, 232, 52, 8, 66],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "protocol_authority", type: "pubkey" },
            { name: "buyback_authority", type: "pubkey" },
          ],
        },
        {
          name: "global_update_authorities",
          discriminator: [91, 137, 72, 77, 183, 184, 168, 125],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "protocol_authority", type: { option: "pubkey" } },
            { name: "buyback_authority", type: { option: "pubkey" } },
          ],
        },
      ],
      accounts: [
        {
          name: "BondingCurve",
          discriminator: [23, 183, 248, 55, 96, 216, 172, 96],
        },
        {
          name: "GlobalConfig",
          discriminator: [149, 8, 156, 202, 160, 252, 176, 217],
        },
        {
          name: "TokenAgentPaymentInCurrency",
          discriminator: [225, 195, 81, 227, 115, 43, 25, 177],
        },
        {
          name: "TokenAgentPayments",
          discriminator: [136, 241, 242, 217, 173, 77, 112, 186],
        },
      ],
      events: [
        {
          name: "AgentAcceptPaymentEvent",
          discriminator: [114, 190, 188, 192, 105, 79, 41, 147],
        },
        {
          name: "AgentBuybackTriggerEvent",
          discriminator: [139, 240, 9, 225, 214, 63, 232, 165],
        },
        {
          name: "AgentDistributePaymentsEvent",
          discriminator: [137, 116, 114, 140, 54, 111, 230, 26],
        },
        {
          name: "AgentInitializeEvent",
          discriminator: [192, 5, 183, 151, 0, 64, 100, 207],
        },
        {
          name: "AgentUpdateAuthorityEvent",
          discriminator: [36, 212, 117, 235, 74, 166, 60, 16],
        },
        {
          name: "AgentUpdateBuybackBpsEvent",
          discriminator: [165, 251, 40, 19, 114, 26, 128, 232],
        },
        {
          name: "AgentWithdrawEvent",
          discriminator: [174, 231, 201, 69, 254, 183, 49, 85],
        },
        {
          name: "ExtendAccountEvent",
          discriminator: [97, 97, 215, 144, 93, 146, 22, 124],
        },
        {
          name: "GlobalAddNewCurrencyEvent",
          discriminator: [130, 202, 37, 248, 241, 182, 233, 35],
        },
        {
          name: "GlobalConfigInitializeEvent",
          discriminator: [241, 51, 222, 190, 142, 245, 176, 53],
        },
        {
          name: "GlobalUpdateAuthoritiesEvent",
          discriminator: [82, 27, 22, 232, 53, 66, 35, 207],
        },
      ],
      errors: [
        {
          code: 6e3,
          name: "UnauthorizedSigner",
          msg: "The given account is not authorized to execute this instruction.",
        },
        {
          code: 6001,
          name: "CurrencyAlreadySupported",
          msg: "The given currency is already supported.",
        },
        {
          code: 6002,
          name: "MaxCurrenciesReached",
          msg: "The maximum number of currencies has been reached.",
        },
        {
          code: 6003,
          name: "InvalidBuybackBps",
          msg: "The buyback basis points is greater than 10000.",
        },
        {
          code: 6004,
          name: "CurrencyNotSupported",
          msg: "The given currency is not supported.",
        },
        { code: 6005, name: "MathOverflow", msg: "Math overflow." },
        {
          code: 6006,
          name: "InvalidRemainingAccountAddress",
          msg: "The given remaining account address is invalid.",
        },
        {
          code: 6007,
          name: "PaymentVaultNotEmpty",
          msg: "The payment vault is not empty. Distribute the payments first.",
        },
        {
          code: 6008,
          name: "InvalidInvoiceAccount",
          msg: "The invoice account does not match the expected PDA seeds",
        },
        {
          code: 6009,
          name: "InvalidProgramToInvoke",
          msg: "The program to invoke is not allowed.",
        },
        {
          code: 6010,
          name: "InvalidCallbackProgram",
          msg: "The callback program is invalid.",
        },
        {
          code: 6011,
          name: "SwapFailedAmountDidNotIncrease",
          msg: "The swap failed and the amount did not increase.",
        },
        {
          code: 6012,
          name: "AccountTypeNotSupported",
          msg: "The account type is not supported for extension.",
        },
      ],
      types: [
        {
          name: "AgentAcceptPaymentEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "user", type: "pubkey" },
              { name: "tokenized_agent_mint", type: "pubkey" },
              { name: "token_agent_payments", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "memo", type: "u64" },
              { name: "start_time", type: "i64" },
              { name: "end_time", type: "i64" },
              { name: "invoice_id", type: "pubkey" },
              { name: "agent_post_balance", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentBuybackTriggerEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "amount_burned", type: "u64" },
              { name: "swap_program", type: "pubkey" },
              {
                name: "new_tokens_bought_and_burned_for_currency",
                type: "u64",
              },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentDistributePaymentsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
              { name: "buyback_amount", type: "u64" },
              { name: "withdraw_amount", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentInitializeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
              { name: "timestamp", type: "i64" },
              { name: "tokenized_agent_sequence", type: "u64" },
            ],
          },
        },
        {
          name: "AgentUpdateAuthorityEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "old_authority", type: "pubkey" },
              { name: "new_authority", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentUpdateBuybackBpsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "old_buyback_bps", type: "u16" },
              { name: "new_buyback_bps", type: "u16" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentWithdrawEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "receiver", type: "pubkey" },
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
            ],
          },
        },
        {
          name: "ExtendAccountEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "account", type: "pubkey" },
              { name: "user", type: "pubkey" },
              { name: "current_size", type: "u64" },
              { name: "new_size", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalAddNewCurrencyEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalConfig",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "protocol_authority", type: "pubkey" },
              { name: "buyback_authority", type: "pubkey" },
              {
                name: "supported_currencies_mint",
                type: { array: ["pubkey", 10] },
              },
              { name: "tokenized_agent_sequence", type: "u64" },
            ],
          },
        },
        {
          name: "GlobalConfigInitializeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "protocol_authority", type: "pubkey" },
              { name: "buyback_authority", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalUpdateAuthoritiesEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "protocol_authority", type: { option: "pubkey" } },
              { name: "buyback_authority", type: { option: "pubkey" } },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "TokenAgentPaymentInCurrency",
          type: {
            kind: "struct",
            fields: [
              { name: "mint", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "total_invoice_payments_made", type: "u64" },
              { name: "total_buyback", type: "u64" },
              { name: "total_withdrawals", type: "u64" },
              { name: "tokens_bought_back_and_burned", type: "u64" },
            ],
          },
        },
        {
          name: "TokenAgentPayments",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "mint", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
            ],
          },
        },
      ],
    };
  function en(e) {
    let t = {
      publicKey: i.PublicKey.default,
      signTransaction: () => Promise.reject(),
      signAllTransactions: () => Promise.reject(),
    };
    return new c.v(et, new c.F(e, t, {}));
  }
  var ea = en(null),
    eo = new i.PublicKey("pUmPFn9WvfaN2WTVGnCEtJTd2ATTpvpsKRz6jVzu6u4"),
    er = new i.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"),
    ei = o.Buffer.from("global-config"),
    es = o.Buffer.from("token-agent-payments"),
    eu = o.Buffer.from("payment-in-currency"),
    ec = o.Buffer.from("invoice-id"),
    em = o.Buffer.from("buyback-authority"),
    el = o.Buffer.from("withdraw-authority"),
    ed = o.Buffer.from("bonding-curve");
  function ep() {
    return i.PublicKey.findProgramAddressSync([ei], eo);
  }
  function e_(e) {
    return i.PublicKey.findProgramAddressSync([es, e.toBuffer()], eo);
  }
  function ey(e, t) {
    return i.PublicKey.findProgramAddressSync(
      [eu, e.toBuffer(), t.toBuffer()],
      eo,
    );
  }
  function ef(e) {
    return i.PublicKey.findProgramAddressSync([em, e.toBuffer()], eo);
  }
  function eb(e) {
    return i.PublicKey.findProgramAddressSync([el, e.toBuffer()], eo);
  }
  function eg(e) {
    return new ee.BN(e.toString());
  }
  var eh = class e {
    constructor(e, t = ea) {
      ((this.mint = e), (this.program = t));
    }
    async create(e) {
      let { authority: t, mint: n, agentAuthority: a, buybackBps: o } = e,
        [r] = i.PublicKey.findProgramAddressSync([ed, n.toBuffer()], er),
        [s] = e_(n);
      return this.program.methods
        .agentInitialize(a, o)
        .accountsPartial({
          authority: t,
          bondingCurve: r,
          mint: n,
          tokenAgentPayments: s,
        })
        .instruction();
    }
    static load(t, n) {
      return new e(t, n ? en(n) : ea);
    }
    async withdraw(e) {
      let {
          authority: t,
          currencyMint: n,
          receiverAta: a,
          tokenProgram: o,
        } = e,
        [i] = e_(this.mint),
        [s] = eb(this.mint),
        c = (0, u.h)(n, s, !0);
      return this.program.methods
        .agentWithdraw()
        .accountsPartial({
          authority: t,
          tokenAgentPayments: i,
          currencyMint: n,
          withdrawAuthority: s,
          withdrawVault: c,
          receiverAta: a,
          tokenProgram: o ?? r.z,
        })
        .instruction();
    }
    async updateBuybackBps(e, t) {
      let { authority: n, buybackBps: a } = e,
        o = t?.supportedCurrenciesMint;
      if (!o)
        throw Error(
          "PumpAgentOffline.updateBuybackBps requires options.supportedCurrenciesMint.",
        );
      let [r] = e_(this.mint),
        [s] = ep(),
        c = [];
      for (let e of o) {
        if (e.equals(i.PublicKey.default)) continue;
        let t = (0, u.h)(e, r, !0);
        c.push({ pubkey: t, isWritable: !1, isSigner: !1 });
      }
      return this.program.methods
        .agentUpdateBuybackBps(a)
        .accountsPartial({
          authority: n,
          tokenAgentPayments: r,
          globalConfig: s,
        })
        .remainingAccounts(c)
        .instruction();
    }
    async acceptPayment(e) {
      var t;
      let {
          user: n,
          userTokenAccount: a,
          currencyMint: s,
          amount: c,
          memo: m,
          startTime: l,
          endTime: d,
          tokenProgram: p,
        } = e,
        [_] = e_(this.mint),
        [y] = ep(),
        [f] = ey(this.mint, s),
        [b] =
          ((t = this.mint),
          i.PublicKey.findProgramAddressSync(
            [
              ec,
              t.toBuffer(),
              s.toBuffer(),
              c.toArrayLike(o.Buffer, "le", 8),
              m.toArrayLike(o.Buffer, "le", 8),
              l.toArrayLike(o.Buffer, "le", 8),
              d.toArrayLike(o.Buffer, "le", 8),
            ],
            eo,
          )),
        g = (0, u.h)(s, _, !0);
      return this.program.methods
        .agentAcceptPayment(c, m, l, d)
        .accountsPartial({
          user: n,
          userTokenAccount: a,
          tokenAgentPayments: _,
          tokenAgentAssociatedAccount: g,
          tokenAgentPaymentInCurrency: f,
          globalConfig: y,
          invoiceId: b,
          currencyMint: s,
          tokenProgram: p ?? r.z,
        })
        .instruction();
    }
    async acceptPaymentSimple(e) {
      let { amount: t, memo: n, startTime: a, endTime: o, ...r } = e;
      return this.acceptPayment({
        ...r,
        amount: eg(t),
        memo: eg(n),
        startTime: eg(a),
        endTime: eg(o),
      });
    }
    async distributePayments(e) {
      let { user: t, currencyMint: n, tokenProgram: a } = e,
        [o] = e_(this.mint),
        [i] = ep(),
        [s] = ey(this.mint, n),
        [c] = ef(this.mint),
        [m] = eb(this.mint),
        l = (0, u.h)(n, o, !0),
        d = (0, u.h)(n, c, !0),
        p = (0, u.h)(n, m, !0);
      return this.program.methods
        .agentDistributePayments()
        .accountsPartial({
          user: t,
          globalConfig: i,
          currencyMint: n,
          tokenAgentPayments: o,
          tokenAgentPaymentInCurrency: s,
          tokenAgentAssociatedAccount: l,
          buybackAuthority: c,
          withdrawAuthority: m,
          buybackVault: d,
          withdrawVault: p,
          tokenProgram: a ?? r.z,
        })
        .instruction();
    }
    async buybackTrigger(e) {
      let {
          globalBuybackAuthority: t,
          currencyMint: n,
          swapProgramToInvoke: a,
          swapInstructionData: o,
          remainingAccounts: i,
          tokenProgram: s,
        } = e,
        [c] = e_(this.mint),
        [m] = ep(),
        [l] = ef(this.mint),
        [d] = ey(this.mint, n),
        p = (0, u.h)(this.mint, l, !0);
      return this.program.methods
        .agentBuybackTrigger(o)
        .accountsPartial({
          globalBuybackAuthority: t,
          mint: this.mint,
          tokenAgentPayments: c,
          tokenAgentPaymentInCurrency: d,
          currencyMint: n,
          globalConfig: m,
          swapProgramToInvoke: a,
          burnAuthority: l,
          burnMintVault: p,
          tokenProgram: s ?? r.z,
        })
        .remainingAccounts(i)
        .instruction();
    }
    async extendAccount(e) {
      let { account: t, user: n } = e;
      return this.program.methods
        .extendAccount()
        .accountsPartial({ account: t, user: n })
        .instruction();
    }
    async updateAuthority(e) {
      let { authority: t, newAuthority: n } = e,
        [a] = e_(this.mint);
      return this.program.methods
        .agentUpdateAuthority(n)
        .accountsPartial({ authority: t, tokenAgentPayments: a })
        .instruction();
    }
  };
  new i.PublicKey(et.address);
  var ek = {
      address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
      metadata: {
        name: "pump",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
      },
      instructions: [
        {
          name: "add_quote_control_mint",
          discriminator: [2, 14, 61, 138, 170, 142, 14, 95],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "quote_control",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      113, 117, 111, 116, 101, 45, 99, 111, 110, 116, 114, 111,
                      108,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "quote_mint", type: "pubkey" },
            { name: "initial_virtual_quote_reserves", type: "u64" },
          ],
        },
        {
          name: "add_quote_mint",
          discriminator: [111, 121, 21, 56, 40, 24, 94, 209],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "quote_mint", type: "pubkey" }],
        },
        {
          name: "admin_set_all_coin_creators",
          discriminator: [163, 243, 43, 228, 76, 81, 117, 83],
          accounts: [
            {
              name: "admin_set_creator_authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "mint" },
            { name: "quote_mint" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            { name: "current_creator", writable: !0 },
            {
              name: "current_creator_quote_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "current_creator" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "current_creator" },
                ],
              },
            },
            {
              name: "creator_vault_quote_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "pump_amm",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "amm_global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "pool_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 111, 111, 108, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "pool",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [112, 111, 111, 108] },
                  { kind: "const", value: [0, 0] },
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "mint" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "pump_amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "coin_creator_vault_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "current_creator" },
                ],
                program: { kind: "account", path: "pump_amm" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "creator", type: "pubkey" }],
        },
        {
          name: "admin_set_creator",
          docs: [
            "Allows Global::admin_set_creator_authority to override the bonding curve creator",
          ],
          discriminator: [69, 25, 171, 142, 57, 239, 13, 4],
          accounts: [
            {
              name: "admin_set_creator_authority",
              signer: !0,
              relations: ["global"],
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "creator", type: "pubkey" }],
        },
        {
          name: "admin_set_creator_fee_editable",
          discriminator: [166, 74, 27, 52, 158, 72, 24, 48],
          accounts: [
            {
              name: "admin_set_creator_authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "admin_set_idl_authority",
          discriminator: [8, 217, 96, 231, 144, 104, 192, 5],
          accounts: [
            { name: "authority", signer: !0, relations: ["global"] },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "idl_account", writable: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            { name: "program_signer", pda: { seeds: [] } },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "idl_authority", type: "pubkey" }],
        },
        {
          name: "admin_update_token_incentives",
          discriminator: [209, 11, 115, 87, 213, 23, 124, 204],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
            { name: "pump_token_supply_per_day", type: "u64" },
          ],
        },
        {
          name: "buy",
          docs: ["Buys tokens from a bonding curve."],
          discriminator: [102, 6, 61, 18, 1, 218, 235, 234],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "fee_recipient", writable: !0 },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "associated_user", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            { name: "token_program" },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "global_volume_accumulator",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
            { name: "amount", type: "u64" },
            { name: "max_sol_cost", type: "u64" },
            { name: "track_volume", type: { defined: { name: "OptionBool" } } },
          ],
        },
        {
          name: "buy_exact_quote_in_v2",
          discriminator: [194, 171, 28, 70, 104, 77, 91, 47],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "base_mint" },
            { name: "quote_mint" },
            { name: "base_token_program" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "fee_recipient", writable: !0 },
            {
              name: "associated_quote_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "buyback_fee_recipient", writable: !0 },
            {
              name: "associated_quote_buyback_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
            {
              name: "associated_base_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "base_token_program" },
                  { kind: "account", path: "base_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "associated_quote_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            { name: "associated_base_user", writable: !0 },
            {
              name: "associated_quote_user",
              docs: [
                "canonical SPL associated-token PDA. Validated in handlers via",
                "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades.",
              ],
              writable: !0,
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
                ],
              },
            },
            {
              name: "associated_creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "sharing_config",
              docs: [
                "seeds; the account is intentionally not deserialized here because it may be uninitialized",
                "for mints that have not created a fee sharing config. Handlers must check",
                "`data_is_empty()` / owner before reading.",
              ],
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
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
              name: "global_volume_accumulator",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
              name: "associated_user_volume_accumulator",
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
          ],
          args: [
            { name: "spendable_quote_in", type: "u64" },
            { name: "min_tokens_out", type: "u64" },
          ],
        },
        {
          name: "buy_exact_sol_in",
          docs: [
            "Given a budget of spendable SOL, buy at least min_tokens_out tokens.",
            "Fees are deducted from spendable_sol_in.",
            "",
            "# Quote formulas",
            "Where:",
            "- total_fee_bps = protocol_fee_bps + creator_fee_bps (creator_fee_bps is 0 if no creator)",
            "- floor(a/b) = a / b (integer division)",
            "- ceil(a/b) = (a + b - 1) / b",
            "",
            "SOL → tokens quote",
            "To calculate tokens_out for a given spendable_sol_in:",
            "1. net_sol = floor(spendable_sol_in * 10_000 / (10_000 + total_fee_bps))",
            "2. fees = ceil(net_sol * protocol_fee_bps / 10_000) + ceil(net_sol * creator_fee_bps / 10_000) (creator_fee_bps is 0 if no creator)",
            "3. if net_sol + fees > spendable_sol_in: net_sol = net_sol - (net_sol + fees - spendable_sol_in)",
            "4. tokens_out = floor((net_sol - 1) * virtual_token_reserves / (virtual_sol_reserves + net_sol - 1))",
            "",
            "Reverse quote (tokens → SOL)",
            "To calculate spendable_sol_in for a desired number of tokens:",
            "1. net_sol = ceil(tokens * virtual_sol_reserves / (virtual_token_reserves - tokens)) + 1",
            "2. spendable_sol_in = ceil(net_sol * (10_000 + total_fee_bps) / 10_000)",
            "",
            "Rent",
            "Separately make sure the instruction's payer has enough SOL to cover rent for:",
            "- creator_vault: rent.minimum_balance(0)",
            "- user_volume_accumulator: rent.minimum_balance(UserVolumeAccumulator::LEN)",
          ],
          discriminator: [56, 252, 116, 8, 158, 223, 205, 95],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "fee_recipient", writable: !0 },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "associated_user", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            { name: "token_program" },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "global_volume_accumulator",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
            { name: "spendable_sol_in", type: "u64" },
            { name: "min_tokens_out", type: "u64" },
            { name: "track_volume", type: { defined: { name: "OptionBool" } } },
          ],
        },
        {
          name: "buy_v2",
          discriminator: [184, 23, 238, 97, 103, 197, 211, 61],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "base_mint" },
            { name: "quote_mint" },
            { name: "base_token_program" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "fee_recipient", writable: !0 },
            {
              name: "associated_quote_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "buyback_fee_recipient", writable: !0 },
            {
              name: "associated_quote_buyback_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
            {
              name: "associated_base_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "base_token_program" },
                  { kind: "account", path: "base_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "associated_quote_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            { name: "associated_base_user", writable: !0 },
            {
              name: "associated_quote_user",
              docs: [
                "canonical SPL associated-token PDA. Validated in handlers via",
                "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades.",
              ],
              writable: !0,
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
                ],
              },
            },
            {
              name: "associated_creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "sharing_config",
              docs: [
                "seeds; the account is intentionally not deserialized here because it may be uninitialized",
                "for mints that have not created a fee sharing config. Handlers must check",
                "`data_is_empty()` / owner before reading.",
              ],
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
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
              name: "global_volume_accumulator",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 118, 111, 108, 117, 109,
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
              name: "associated_user_volume_accumulator",
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
          ],
          args: [
            { name: "amount", type: "u64" },
            { name: "max_sol_cost", type: "u64" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
          ],
          args: [],
        },
        {
          name: "claim_cashback_v2",
          docs: [
            "Pays out the user's accrued cashback. For a token quote, `associated_quote_user` may be",
            "any token account of `quote_mint` owned by `user`, not only the associated one.",
          ],
          discriminator: [122, 243, 204, 65, 94, 116, 29, 55],
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
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "associated_user_volume_accumulator",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "user_volume_accumulator" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "associated_quote_user", writable: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "collect_creator_fee",
          docs: [
            "Collects creator_fee from creator_vault to the coin creator account",
          ],
          discriminator: [20, 22, 86, 123, 198, 28, 219, 132],
          accounts: [
            { name: "creator", writable: !0 },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "creator" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "collect_creator_fee_v2",
          docs: [
            "Collects creator_fee from creator_vault to the coin creator account",
          ],
          discriminator: [207, 17, 138, 242, 4, 34, 19, 56],
          accounts: [
            { name: "creator", writable: !0 },
            {
              name: "creator_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "creator" },
                ],
              },
            },
            {
              name: "creator_vault_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "quote_mint" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "create",
          docs: ["Creates a new coin and bonding curve."],
          discriminator: [24, 30, 200, 40, 5, 28, 7, 119],
          accounts: [
            { name: "mint", writable: !0, signer: !0 },
            {
              name: "mint_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      109, 105, 110, 116, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "mpl_token_metadata",
              address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
            },
            {
              name: "metadata",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [109, 101, 116, 97, 100, 97, 116, 97],
                  },
                  {
                    kind: "const",
                    value: [
                      11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127,
                      107, 4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181,
                      73, 182, 209, 188, 3, 248, 41, 70,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: { kind: "account", path: "mpl_token_metadata" },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "name", type: "string" },
            { name: "symbol", type: "string" },
            { name: "uri", type: "string" },
            { name: "creator", type: "pubkey" },
          ],
        },
        {
          name: "create_v2",
          docs: [
            "Creates a new spl-22 coin and bonding curve.",
            "",
            "Remaining accounts select the quote mint (none = SOL): `quote_mint`,",
            "`associated_quote_bonding_curve`, `quote_token_program` (SPL Token or Token-2022; must own",
            "the mint), plus an optional fourth account, the `quote-control` PDA, read only when `Global`",
            "does not whitelist the mint. A mint admitted through quote-control seeds the curve's",
            "virtual quote reserves from its quote-control entry instead of `Global`, and cannot be",
            "used with `is_mayhem_mode` (`MayhemModeQuoteMintNotAllowed`). The Token-2022",
            "native mint is rejected, and a Token-2022 quote mint may only carry the xStock operable",
            "extension set (metadata pointer/metadata, permanent delegate, initialized default account",
            "state, scaled UI amount, pausable, confidential-transfer mint, and a transfer hook with no",
            "program). The trailing `creator_fee_bps` argument (EOF-tolerant; omitted or zero stores 0",
            "and the pump-fees schedule rate applies) sets the coin's own creator fee rate and requires",
            "`Global.creator_fee_configurable`, a non-cashback coin and a value in",
            "`1..=Global.max_configurable_creator_fee_bps`.",
          ],
          discriminator: [214, 144, 76, 236, 95, 139, 49, 180],
          accounts: [
            { name: "mint", writable: !0, signer: !0 },
            {
              name: "mint_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      109, 105, 110, 116, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_program",
              address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "mayhem_program_id",
              writable: !0,
              address: "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e",
            },
            {
              name: "global_params",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 112, 97, 114, 97, 109,
                      115,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            {
              name: "sol_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [115, 111, 108, 45, 118, 97, 117, 108, 116],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            {
              name: "mayhem_state",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      109, 97, 121, 104, 101, 109, 45, 115, 116, 97, 116, 101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            { name: "mayhem_token_vault", writable: !0 },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "name", type: "string" },
            { name: "symbol", type: "string" },
            { name: "uri", type: "string" },
            { name: "creator", type: "pubkey" },
            { name: "is_mayhem_mode", type: "bool" },
            {
              name: "is_cashback_enabled",
              type: { defined: { name: "OptionBool" } },
            },
            {
              name: "creator_fee_bps",
              type: { defined: { name: "OptionU64" } },
            },
          ],
        },
        {
          name: "create_v3",
          docs: [
            "Creates a new spl-22 coin and bonding curve, with an explicit game",
            "mode. Every argument is required — no lenient trailing args: callers",
            "must send every field, and truncated instruction data fails to decode.",
            "The five mayhem accounts are optional: mandatory when",
            "`is_mayhem_mode` is true (fails with `MissingMayhemAccounts`",
            "otherwise), and passable as `None` placeholders for non-mayhem coins",
            "to save transaction bytes. `game_mode` only takes effect for mayhem",
            "coins; for non-mayhem coins it is ignored (send the default `AUTO`)",
            "and the event reports no game mode. Behavior matches `create_v2`",
            "otherwise.",
          ],
          discriminator: [187, 141, 50, 115, 53, 212, 36, 40],
          accounts: [
            { name: "mint", writable: !0, signer: !0 },
            {
              name: "mint_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      109, 105, 110, 116, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_program",
              address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "mayhem_program_id",
              writable: !0,
              optional: !0,
              address: "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e",
            },
            {
              name: "global_params",
              optional: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 112, 97, 114, 97, 109,
                      115,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            {
              name: "sol_vault",
              writable: !0,
              optional: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [115, 111, 108, 45, 118, 97, 117, 108, 116],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            {
              name: "mayhem_state",
              writable: !0,
              optional: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      109, 97, 121, 104, 101, 109, 45, 115, 116, 97, 116, 101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            { name: "mayhem_token_vault", writable: !0, optional: !0 },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "name", type: "string" },
            { name: "symbol", type: "string" },
            { name: "uri", type: "string" },
            { name: "creator", type: "pubkey" },
            { name: "is_mayhem_mode", type: "bool" },
            { name: "is_cashback_enabled", type: "bool" },
            { name: "game_mode", type: { defined: { name: "GameMode" } } },
          ],
        },
        {
          name: "distribute_creator_fees",
          docs: [
            "Distributes creator fees to shareholders based on their share percentages",
            "The creator vault needs to have at least the minimum distributable amount to distribute fees",
            "This can be checked with the get_minimum_distributable_fee instruction",
          ],
          discriminator: [165, 114, 103, 0, 121, 206, 247, 81],
          accounts: [
            { name: "mint", relations: ["sharing_config"] },
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
                  { kind: "account", path: "mint" },
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
                  { kind: "account", path: "mint" },
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
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
          ],
          args: [],
          returns: { defined: { name: "DistributeCreatorFeesEvent" } },
        },
        {
          name: "distribute_creator_fees_v2",
          discriminator: [255, 203, 19, 79, 244, 68, 8, 159],
          accounts: [
            { name: "payer", writable: !0, signer: !0 },
            { name: "mint", relations: ["sharing_config"] },
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
                  { kind: "account", path: "mint" },
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
                  { kind: "account", path: "mint" },
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
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "creator_vault_quote_token_account",
              docs: [
                "Deserialized manually in the handler for non-legacy quote mints.",
              ],
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "quote_mint" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
          ],
          args: [{ name: "initialize_ata", type: "bool" }],
          returns: { defined: { name: "DistributeCreatorFeesEvent" } },
        },
        {
          name: "extend_account",
          docs: ["Extends the size of program-owned accounts"],
          discriminator: [234, 102, 194, 203, 150, 72, 62, 229],
          accounts: [
            { name: "account", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "get_minimum_distributable_fee",
          docs: [
            "Permissionless instruction to check the minimum required fees for distribution",
            "Returns the minimum required balance from the creator_vault and whether distribution can proceed",
          ],
          discriminator: [117, 225, 127, 202, 134, 95, 68, 35],
          accounts: [
            { name: "mint", relations: ["sharing_config"] },
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
                  { kind: "account", path: "mint" },
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
                  { kind: "account", path: "mint" },
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
              name: "creator_vault",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
                ],
              },
            },
          ],
          args: [],
          returns: { defined: { name: "MinimumDistributableFeeEvent" } },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "initialize",
          docs: ["Creates the global state."],
          discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "initialize_quote_control",
          discriminator: [239, 73, 245, 173, 209, 177, 84, 66],
          accounts: [
            {
              name: "quote_control",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      113, 117, 111, 116, 101, 45, 99, 111, 110, 116, 114, 111,
                      108,
                    ],
                  },
                ],
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "migrate",
          docs: [
            "Migrates liquidity to pump_amm if the bonding curve is complete",
          ],
          discriminator: [155, 234, 231, 146, 236, 158, 162, 30],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "withdraw_authority", writable: !0, relations: ["global"] },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "mint" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "pump_amm",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "pool",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [112, 111, 111, 108] },
                  { kind: "const", value: [0, 0] },
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "mint" },
                  { kind: "account", path: "wsol_mint" },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "pool_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 111, 111, 108, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "pool_authority_mint_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "mint" },
                  { kind: "account", path: "mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "pool_authority_wsol_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "wsol_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "amm_global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "wsol_mint",
              address: "So11111111111111111111111111111111111111112",
            },
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
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "user_pool_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "token_2022_program" },
                  { kind: "account", path: "lp_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "pool_base_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool" },
                  { kind: "account", path: "mint" },
                  { kind: "account", path: "mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "pool_quote_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "wsol_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "token_2022_program",
              address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "pump_amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "migrate_bonding_curve_creator",
          discriminator: [87, 124, 52, 191, 52, 38, 214, 232],
          accounts: [
            { name: "mint", relations: ["sharing_config"] },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "migrate_v2",
          docs: [
            "Migrates liquidity to pump_amm if the bonding curve is complete",
          ],
          discriminator: [187, 203, 18, 31, 206, 237, 254, 41],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "withdraw_authority", writable: !0, relations: ["global"] },
            { name: "base_mint" },
            { name: "quote_mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
            {
              name: "associated_base_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "base_token_program" },
                  { kind: "account", path: "base_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "associated_quote_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "pump_amm",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "pool",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "const", value: [112, 111, 111, 108] },
                  { kind: "const", value: [0, 0] },
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "base_mint" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "pool_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 111, 111, 108, 45, 97, 117, 116, 104, 111, 114, 105,
                      116, 121,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
            {
              name: "pool_authority_mint_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "base_token_program" },
                  { kind: "account", path: "base_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "pool_authority_quote_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "amm_global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
                program: { kind: "account", path: "pump_amm" },
              },
            },
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
                program: { kind: "account", path: "pump_amm" },
              },
            },
            {
              name: "user_pool_token_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "pool_authority" },
                  { kind: "account", path: "token_2022_program" },
                  { kind: "account", path: "lp_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
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
                program: { kind: "account", path: "associated_token_program" },
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
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "base_token_program" },
            { name: "quote_token_program" },
            {
              name: "token_2022_program",
              address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "pump_amm_event_authority" },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "remove_quote_control_mint",
          discriminator: [223, 7, 253, 26, 81, 165, 218, 166],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "quote_control",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      113, 117, 111, 116, 101, 45, 99, 111, 110, 116, 114, 111,
                      108,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "quote_mint", type: "pubkey" }],
        },
        {
          name: "remove_quote_mint",
          discriminator: [177, 65, 223, 38, 88, 209, 158, 155],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "quote_mint", type: "pubkey" }],
        },
        {
          name: "sell",
          docs: [
            "Sells tokens into a bonding curve.",
            "For cashback coins, pass as remaining_accounts: [0] user_volume_accumulator,",
            "[1] bonding_curve_v2. If provided and valid, creator_fee goes to user_volume_accumulator.",
            "Otherwise, falls back to transferring creator_fee to creator_vault.",
          ],
          discriminator: [51, 230, 133, 164, 1, 127, 131, 173],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "fee_recipient", writable: !0 },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "associated_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "associated_user", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
                ],
              },
            },
            { name: "token_program" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
            { name: "amount", type: "u64" },
            { name: "min_sol_output", type: "u64" },
          ],
        },
        {
          name: "sell_v2",
          discriminator: [93, 246, 130, 60, 231, 233, 64, 178],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "base_mint" },
            { name: "quote_mint" },
            { name: "base_token_program" },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "fee_recipient", writable: !0 },
            {
              name: "associated_quote_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "buyback_fee_recipient", writable: !0 },
            {
              name: "associated_quote_buyback_fee_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_fee_recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
            {
              name: "associated_base_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "base_token_program" },
                  { kind: "account", path: "base_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "associated_quote_bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "bonding_curve" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "user", writable: !0, signer: !0 },
            { name: "associated_base_user", writable: !0 },
            {
              name: "associated_quote_user",
              docs: [
                "canonical SPL associated-token PDA. Validated in `sell_v2_ix` via",
                "`validate_user_quote_token_account` for non-legacy mints; ignored for legacy (SOL) trades.",
              ],
              writable: !0,
            },
            {
              name: "creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "bonding_curve.creator",
                    account: "BondingCurve",
                  },
                ],
              },
            },
            {
              name: "associated_creator_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "creator_vault" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "sharing_config",
              docs: [
                "seeds; the account is intentionally not deserialized here because it may be uninitialized",
                "for mints that have not created a fee sharing config. Handlers must check",
                "`data_is_empty()` / owner before reading.",
              ],
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
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
              name: "associated_user_volume_accumulator",
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
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
                      1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                      23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101,
                      93, 43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
          ],
          args: [
            { name: "amount", type: "u64" },
            { name: "min_sol_output", type: "u64" },
          ],
        },
        {
          name: "set_creator",
          docs: [
            "Allows Global::set_creator_authority to set the bonding curve creator from Metaplex metadata or input argument",
          ],
          discriminator: [254, 148, 255, 112, 207, 142, 170, 165],
          accounts: [
            {
              name: "set_creator_authority",
              signer: !0,
              relations: ["global"],
            },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "mint" },
            {
              name: "metadata",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [109, 101, 116, 97, 100, 97, 116, 97],
                  },
                  {
                    kind: "const",
                    value: [
                      11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127,
                      107, 4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181,
                      73, 182, 209, 188, 3, 248, 41, 70,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "creator", type: "pubkey" }],
        },
        {
          name: "set_creator_fee_bps",
          discriminator: [156, 10, 151, 113, 17, 250, 177, 13],
          accounts: [
            { name: "creator", signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "mint" },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "creator_fee_bps", type: "u64" }],
        },
        {
          name: "set_mayhem_virtual_params",
          discriminator: [61, 169, 188, 191, 153, 149, 42, 97],
          accounts: [
            {
              name: "sol_vault_authority",
              writable: !0,
              signer: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [115, 111, 108, 45, 118, 97, 117, 108, 116],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    5, 42, 229, 215, 167, 218, 167, 36, 166, 234, 176, 167, 41,
                    84, 145, 133, 90, 212, 160, 103, 22, 96, 103, 76, 78, 3, 69,
                    89, 128, 61, 101, 163,
                  ],
                },
              },
            },
            {
              name: "mayhem_token_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "sol_vault_authority" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "mint" },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "token_program",
              address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "set_metaplex_creator",
          docs: [
            "Syncs the bonding curve creator with the Metaplex metadata creator if it exists",
          ],
          discriminator: [138, 96, 174, 217, 48, 85, 197, 246],
          accounts: [
            { name: "mint" },
            {
              name: "metadata",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [109, 101, 116, 97, 100, 97, 116, 97],
                  },
                  {
                    kind: "const",
                    value: [
                      11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127,
                      107, 4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181,
                      73, 182, 209, 188, 3, 248, 41, 70,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "set_params",
          docs: ["Sets the global state parameters."],
          discriminator: [27, 234, 178, 52, 147, 2, 187, 141],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "initial_virtual_token_reserves", type: "u64" },
            { name: "initial_virtual_sol_reserves", type: "u64" },
            { name: "initial_real_token_reserves", type: "u64" },
            { name: "token_total_supply", type: "u64" },
            { name: "fee_basis_points", type: "u64" },
            { name: "withdraw_authority", type: "pubkey" },
            { name: "enable_migrate", type: "bool" },
            { name: "pool_migration_fee", type: "u64" },
            { name: "creator_fee_basis_points", type: "u64" },
            { name: "set_creator_authority", type: "pubkey" },
            { name: "admin_set_creator_authority", type: "pubkey" },
          ],
        },
        {
          name: "set_quote_control_admin",
          discriminator: [62, 79, 161, 211, 165, 170, 214, 210],
          accounts: [
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "authority", signer: !0, relations: ["global"] },
            {
              name: "quote_control",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      113, 117, 111, 116, 101, 45, 99, 111, 110, 116, 114, 111,
                      108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "new_admin", type: "pubkey" }],
        },
        {
          name: "set_reserved_fee_recipients",
          discriminator: [111, 172, 162, 232, 114, 89, 213, 142],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "authority", signer: !0, relations: ["global"] },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "set_virtual_quote_reserves",
          discriminator: [101, 135, 191, 104, 9, 88, 20, 96],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "initial_virtual_quote_reserves", type: "u64" }],
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "toggle_cashback_enabled",
          discriminator: [115, 103, 224, 255, 189, 89, 86, 195],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "toggle_create_v2",
          discriminator: [28, 255, 230, 240, 172, 107, 203, 171],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "update_buyback_config",
          discriminator: [251, 224, 171, 146, 160, 26, 113, 233],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "update_creator_fee_config",
          discriminator: [61, 175, 160, 249, 66, 66, 136, 175],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "creator_fee_configurable", type: "bool" },
            { name: "max_configurable_creator_fee_bps", type: "u64" },
          ],
        },
        {
          name: "update_global_authority",
          discriminator: [227, 181, 74, 196, 208, 21, 97, 213],
          accounts: [
            {
              name: "global",
              writable: !0,
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
              },
            },
            { name: "authority", signer: !0, relations: ["global"] },
            { name: "new_authority" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [],
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
          name: "Global",
          discriminator: [167, 232, 232, 177, 200, 108, 114, 127],
        },
        {
          name: "GlobalVolumeAccumulator",
          discriminator: [202, 42, 246, 43, 142, 190, 30, 255],
        },
        {
          name: "QuoteControl",
          discriminator: [56, 244, 35, 238, 193, 213, 162, 201],
        },
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
          name: "AddQuoteControlMintEvent",
          discriminator: [164, 175, 87, 74, 88, 45, 33, 62],
        },
        {
          name: "AdminSetCreatorEvent",
          discriminator: [64, 69, 192, 104, 29, 30, 25, 107],
        },
        {
          name: "AdminSetCreatorFeeEditableEvent",
          discriminator: [151, 87, 255, 44, 145, 214, 64, 205],
        },
        {
          name: "AdminSetIdlAuthorityEvent",
          discriminator: [245, 59, 70, 34, 75, 185, 109, 92],
        },
        {
          name: "AdminUpdateTokenIncentivesEvent",
          discriminator: [147, 250, 108, 120, 247, 29, 67, 222],
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
          name: "CollectCreatorFeeEvent",
          discriminator: [122, 2, 127, 1, 14, 191, 12, 175],
        },
        {
          name: "CompleteEvent",
          discriminator: [95, 114, 97, 156, 212, 46, 152, 8],
        },
        {
          name: "CompletePumpAmmMigrationEvent",
          discriminator: [189, 233, 93, 185, 92, 148, 234, 148],
        },
        {
          name: "CreateEvent",
          discriminator: [27, 114, 169, 77, 222, 235, 99, 118],
        },
        {
          name: "DistributeCreatorFeesEvent",
          discriminator: [165, 55, 129, 112, 4, 179, 202, 40],
        },
        {
          name: "ExtendAccountEvent",
          discriminator: [97, 97, 215, 144, 93, 146, 22, 124],
        },
        {
          name: "InitUserVolumeAccumulatorEvent",
          discriminator: [134, 36, 13, 72, 232, 101, 130, 216],
        },
        {
          name: "MigrateBondingCurveCreatorEvent",
          discriminator: [155, 167, 104, 220, 213, 108, 243, 3],
        },
        {
          name: "MinimumDistributableFeeEvent",
          discriminator: [168, 216, 132, 239, 235, 182, 49, 52],
        },
        {
          name: "RemoveQuoteControlMintEvent",
          discriminator: [46, 33, 86, 134, 0, 213, 209, 48],
        },
        {
          name: "ReservedFeeRecipientsEvent",
          discriminator: [43, 188, 250, 18, 221, 75, 187, 95],
        },
        {
          name: "SetCreatorEvent",
          discriminator: [237, 52, 123, 37, 245, 251, 72, 210],
        },
        {
          name: "SetCreatorFeeBpsEvent",
          discriminator: [53, 161, 215, 177, 100, 118, 123, 45],
        },
        {
          name: "SetMetaplexCreatorEvent",
          discriminator: [142, 203, 6, 32, 127, 105, 191, 162],
        },
        {
          name: "SetParamsEvent",
          discriminator: [223, 195, 159, 246, 62, 48, 143, 131],
        },
        {
          name: "SetQuoteControlAdminEvent",
          discriminator: [74, 248, 141, 69, 202, 81, 30, 247],
        },
        {
          name: "SyncUserVolumeAccumulatorEvent",
          discriminator: [197, 122, 167, 124, 116, 81, 91, 255],
        },
        {
          name: "TradeEvent",
          discriminator: [189, 219, 127, 211, 78, 230, 97, 238],
        },
        {
          name: "UpdateCreatorFeeConfigEvent",
          discriminator: [152, 198, 124, 124, 106, 246, 127, 191],
        },
        {
          name: "UpdateGlobalAuthorityEvent",
          discriminator: [182, 195, 137, 42, 35, 206, 207, 247],
        },
        {
          name: "UpdateMayhemVirtualParamsEvent",
          discriminator: [117, 123, 228, 182, 161, 168, 220, 214],
        },
      ],
      errors: [
        {
          code: 6e3,
          name: "NotAuthorized",
          msg: "The given account is not authorized to execute this instruction.",
        },
        {
          code: 6001,
          name: "AlreadyInitialized",
          msg: "The program is already initialized.",
        },
        {
          code: 6002,
          name: "TooMuchSolRequired",
          msg: "slippage: Too much SOL required to buy the given amount of tokens.",
        },
        {
          code: 6003,
          name: "TooLittleSolReceived",
          msg: "slippage: Too little SOL received to sell the given amount of tokens.",
        },
        {
          code: 6004,
          name: "MintDoesNotMatchBondingCurve",
          msg: "The mint does not match the bonding curve.",
        },
        {
          code: 6005,
          name: "BondingCurveComplete",
          msg: "The bonding curve has completed and liquidity migrated to raydium.",
        },
        {
          code: 6006,
          name: "BondingCurveNotComplete",
          msg: "The bonding curve has not completed.",
        },
        {
          code: 6007,
          name: "NotInitialized",
          msg: "The program is not initialized.",
        },
        {
          code: 6008,
          name: "WithdrawTooFrequent",
          msg: "Withdraw too frequent",
        },
        {
          code: 6009,
          name: "NewSizeShouldBeGreaterThanCurrentSize",
          msg: "new_size should be > current_size",
        },
        {
          code: 6010,
          name: "AccountTypeNotSupported",
          msg: "Account type not supported",
        },
        {
          code: 6011,
          name: "InitialRealTokenReservesShouldBeLessThanTokenTotalSupply",
          msg: "initial_real_token_reserves should be less than token_total_supply",
        },
        {
          code: 6012,
          name: "InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves",
          msg: "initial_virtual_token_reserves should be greater than initial_real_token_reserves",
        },
        {
          code: 6013,
          name: "FeeBasisPointsGreaterThanMaximum",
          msg: "fee_basis_points greater than maximum",
        },
        {
          code: 6014,
          name: "AllZerosWithdrawAuthority",
          msg: "Withdraw authority cannot be set to System Program ID",
        },
        {
          code: 6015,
          name: "PoolMigrationFeeShouldBeLessThanFinalRealSolReserves",
          msg: "pool_migration_fee should be less than final_real_sol_reserves",
        },
        {
          code: 6016,
          name: "PoolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees",
          msg: "pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES",
        },
        {
          code: 6017,
          name: "DisabledWithdraw",
          msg: "Migrate instruction is disabled",
        },
        {
          code: 6018,
          name: "DisabledMigrate",
          msg: "Migrate instruction is disabled",
        },
        { code: 6019, name: "InvalidCreator", msg: "Invalid creator pubkey" },
        { code: 6020, name: "BuyZeroAmount", msg: "Buy zero amount" },
        {
          code: 6021,
          name: "NotEnoughTokensToBuy",
          msg: "Not enough tokens to buy",
        },
        { code: 6022, name: "SellZeroAmount", msg: "Sell zero amount" },
        {
          code: 6023,
          name: "NotEnoughTokensToSell",
          msg: "Not enough tokens to sell",
        },
        { code: 6024, name: "Overflow", msg: "Overflow" },
        { code: 6025, name: "Truncation", msg: "Truncation" },
        { code: 6026, name: "DivisionByZero", msg: "Division by zero" },
        {
          code: 6027,
          name: "NotEnoughRemainingAccounts",
          msg: "Not enough remaining accounts",
        },
        {
          code: 6028,
          name: "AllFeeRecipientsShouldBeNonZero",
          msg: "All fee recipients should be non-zero",
        },
        {
          code: 6029,
          name: "UnsortedNotUniqueFeeRecipients",
          msg: "Unsorted or not unique fee recipients",
        },
        {
          code: 6030,
          name: "CreatorShouldNotBeZero",
          msg: "Creator should not be zero",
        },
        { code: 6031, name: "StartTimeInThePast" },
        { code: 6032, name: "EndTimeInThePast" },
        { code: 6033, name: "EndTimeBeforeStartTime" },
        { code: 6034, name: "TimeRangeTooLarge" },
        { code: 6035, name: "EndTimeBeforeCurrentDay" },
        { code: 6036, name: "SupplyUpdateForFinishedRange" },
        { code: 6037, name: "DayIndexAfterEndIndex" },
        { code: 6038, name: "DayInActiveRange" },
        { code: 6039, name: "InvalidIncentiveMint" },
        {
          code: 6040,
          name: "BuyNotEnoughSolToCoverRent",
          msg: "Buy: Not enough SOL to cover for rent exemption.",
        },
        {
          code: 6041,
          name: "BuyNotEnoughSolToCoverFees",
          msg: "Buy: Not enough SOL to cover for fees.",
        },
        {
          code: 6042,
          name: "BuySlippageBelowMinTokensOut",
          msg: "Slippage: Would buy less tokens than expected min_tokens_out",
        },
        { code: 6043, name: "NameTooLong" },
        { code: 6044, name: "SymbolTooLong" },
        { code: 6045, name: "UriTooLong" },
        { code: 6046, name: "CreateV2Disabled" },
        { code: 6047, name: "CpitializeMayhemFailed" },
        { code: 6048, name: "MayhemModeDisabled" },
        {
          code: 6049,
          name: "CreatorMigratedToSharingConfig",
          msg: "creator has been migrated to sharing config, use pump_fees::reset_fee_sharing_config instead",
        },
        {
          code: 6050,
          name: "UnableToDistributeCreatorVaultMigratedToSharingConfig",
          msg: "creator_vault has been migrated to sharing config, use pump:distribute_creator_fees instead",
        },
        {
          code: 6051,
          name: "SharingConfigNotActive",
          msg: "Sharing config is not active",
        },
        {
          code: 6052,
          name: "UnableToDistributeCreatorFeesToExecutableRecipient",
          msg: "The recipient account is executable, so it cannot receive lamports, remove it from the team first",
        },
        {
          code: 6053,
          name: "BondingCurveAndSharingConfigCreatorMismatch",
          msg: "Bonding curve creator does not match sharing config",
        },
        {
          code: 6054,
          name: "ShareholdersAndRemainingAccountsMismatch",
          msg: "Remaining accounts do not match shareholders, make sure to pass exactly the same pubkeys in the same order",
        },
        {
          code: 6055,
          name: "InvalidShareBps",
          msg: "Share bps must be greater than 0",
        },
        {
          code: 6056,
          name: "CashbackNotEnabled",
          msg: "Cashback is not enabled",
        },
        {
          code: 6057,
          name: "BuybackFeeRecipientNotAuthorized",
          msg: "Buyback fee recipient not authorized",
        },
        { code: 6058, name: "AllBuybackFeeRecipientsShouldBeNonZero" },
        { code: 6059, name: "NotUniqueBuybackFeeRecipients" },
        {
          code: 6060,
          name: "BuybackBasisPointsOutOfRange",
          msg: "buyback_basis_points must be <= 10_000",
        },
        {
          code: 6061,
          name: "WrongBuybackFeeRecipientsCount",
          msg: "buyback fee recipients require exactly 8 remaining accounts (or none)",
        },
        { code: 6062, name: "BuybackFeeRecipientMissing" },
        {
          code: 6063,
          name: "UnsupportedQuoteMint",
          msg: "Unsupported quote mint",
        },
        {
          code: 6064,
          name: "InvalidQuoteTokenProgram",
          msg: "Create v2: quote token program must be SPL Token or Token-2022",
        },
        {
          code: 6065,
          name: "InvalidAssociatedQuoteBondingCurve",
          msg: "Create v2: associated quote bonding curve address does not match derivation",
        },
        {
          code: 6066,
          name: "QuoteMintWhitelistFull",
          msg: "Quote mint whitelist is full",
        },
        {
          code: 6067,
          name: "QuoteMintAlreadyWhitelisted",
          msg: "Quote mint is already whitelisted",
        },
        {
          code: 6068,
          name: "QuoteMintNotWhitelisted",
          msg: "Quote mint is not in the whitelist",
        },
        {
          code: 6069,
          name: "QuoteMintNotEligibleForWhitelist",
          msg: "Quote mint cannot be added or removed via whitelist (default or native SOL mint)",
        },
        {
          code: 6070,
          name: "UnableToDistributeCreatorFeesToUninitializedAccount",
          msg: "Unable to distribute creator fees to uninitialized account",
        },
        {
          code: 6071,
          name: "MayhemModeQuoteMintNotAllowed",
          msg: "Mayhem mode quote mint not allowed",
        },
        {
          code: 6072,
          name: "MissingCashbackAccounts",
          msg: "Cashback trade is missing the required remaining accounts",
        },
        {
          code: 6073,
          name: "InvalidCashbackAccumulator",
          msg: "Cashback user_volume_accumulator account is invalid",
        },
        {
          code: 6074,
          name: "InvalidBondingCurveV2",
          msg: "bonding_curve_v2 remaining account is missing or invalid",
        },
        {
          code: 6075,
          name: "InvalidQuoteControl",
          msg: "quote_control remaining account does not match derivation or is uninitialized",
        },
        {
          code: 6076,
          name: "InvalidCashbackRecipient",
          msg: "Cashback recipient token account is not owned by user",
        },
        {
          code: 6077,
          name: "CreatorFeeNotConfigurable",
          msg: "Configurable creator fees are disabled",
        },
        {
          code: 6078,
          name: "CreatorFeeBpsOutOfRange",
          msg: "Creator fee basis points must be between 1 and the configured maximum",
        },
        {
          code: 6079,
          name: "CreatorFeeNotEditable",
          msg: "Creator fee is not editable for this bonding curve",
        },
        {
          code: 6080,
          name: "CreatorFeeNotAllowedForCashbackCoin",
          msg: "Creator fee cannot be configured for a cashback coin",
        },
        {
          code: 6081,
          name: "BondingCurveAlreadyMigrated",
          msg: "Bonding curve has already migrated",
        },
      ],
      types: [
        {
          name: "AddQuoteControlMintEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "quote_control", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
              { name: "initial_virtual_quote_reserves", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AdminSetCreatorEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin_set_creator_authority", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "old_creator", type: "pubkey" },
              { name: "new_creator", type: "pubkey" },
            ],
          },
        },
        {
          name: "AdminSetCreatorFeeEditableEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin_set_creator_authority", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
            ],
          },
        },
        {
          name: "AdminSetIdlAuthorityEvent",
          type: {
            kind: "struct",
            fields: [{ name: "idl_authority", type: "pubkey" }],
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
              { name: "virtual_quote_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "real_quote_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "complete", type: "bool" },
              { name: "creator", type: "pubkey" },
              { name: "is_mayhem_mode", type: "bool" },
              { name: "is_cashback_coin", type: "bool" },
              { name: "quote_mint", type: "pubkey" },
              { name: "creator_fee_bps", type: "u64" },
              { name: "can_edit_creator_fee", type: "bool" },
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
          name: "CollectCreatorFeeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "creator", type: "pubkey" },
              { name: "creator_fee", type: "u64" },
              { name: "quote_mint", type: "pubkey" },
            ],
          },
        },
        {
          name: "CompleteEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "user", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "timestamp", type: "i64" },
              { name: "quote_mint", type: "pubkey" },
            ],
          },
        },
        {
          name: "CompletePumpAmmMigrationEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "user", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "mint_amount", type: "u64" },
              {
                name: "sol_amount",
                docs: [
                  "The variable is interpreted as `amount` in the offchain services",
                  "It is amount in terms of quoteMint for the bondingCurve",
                  "The rename is not done yet to avoid breaking changes in offchain services.",
                ],
                type: "u64",
              },
              { name: "pool_migration_fee", type: "u64" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "timestamp", type: "i64" },
              { name: "pool", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
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
          name: "CreateEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "name", type: "string" },
              { name: "symbol", type: "string" },
              { name: "uri", type: "string" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "user", type: "pubkey" },
              { name: "creator", type: "pubkey" },
              { name: "timestamp", type: "i64" },
              { name: "virtual_token_reserves", type: "u64" },
              { name: "virtual_sol_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "token_program", type: "pubkey" },
              { name: "is_mayhem_mode", type: "bool" },
              { name: "is_cashback_enabled", type: "bool" },
              { name: "quote_mint", type: "pubkey" },
              { name: "virtual_quote_reserves", type: "u64" },
              { name: "creator_fee_bps", type: "u64" },
              {
                name: "game_mode",
                docs: [
                  "Trailing optional so existing decoders of the old layout keep working.",
                  "`Some` only for mayhem coins (`AUTO` for `create_v2` mayhem coins, the",
                  "creator's choice for `create_v3`); `None` for non-mayhem coins, where",
                  "a game mode is meaningless.",
                ],
                type: { option: { defined: { name: "GameMode" } } },
              },
            ],
          },
        },
        {
          name: "DistributeCreatorFeesEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "sharing_config", type: "pubkey" },
              { name: "admin", type: "pubkey" },
              {
                name: "shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "distributed", type: "u64" },
              { name: "quote_mint", type: "pubkey" },
            ],
          },
        },
        {
          name: "ExtendAccountEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "account", type: "pubkey" },
              { name: "user", type: "pubkey" },
              { name: "current_size", type: "u64" },
              { name: "new_size", type: "u64" },
              { name: "timestamp", type: "i64" },
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
              { name: "exotic_flat_fees", type: { defined: { name: "Fees" } } },
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
          name: "GameMode",
          docs: [
            "Strict Borsh enum: only `create_v3` takes this on the wire, and every v3",
            "arg is required — truncated or invalid instruction data is an error.",
            "`create` / `create_v2` cannot express a game mode and always use AUTO.",
          ],
          type: {
            kind: "enum",
            variants: [{ name: "AUTO" }, { name: "MANUAL" }, { name: "CLIMB" }],
          },
        },
        {
          name: "Global",
          type: {
            kind: "struct",
            fields: [
              { name: "initialized", docs: ["Unused"], type: "bool" },
              { name: "authority", type: "pubkey" },
              { name: "fee_recipient", type: "pubkey" },
              { name: "initial_virtual_token_reserves", type: "u64" },
              { name: "initial_virtual_sol_reserves", type: "u64" },
              { name: "initial_real_token_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "fee_basis_points", type: "u64" },
              { name: "withdraw_authority", type: "pubkey" },
              { name: "enable_migrate", docs: ["Unused"], type: "bool" },
              { name: "pool_migration_fee", type: "u64" },
              { name: "creator_fee_basis_points", type: "u64" },
              { name: "fee_recipients", type: { array: ["pubkey", 7] } },
              { name: "set_creator_authority", type: "pubkey" },
              { name: "admin_set_creator_authority", type: "pubkey" },
              { name: "create_v2_enabled", type: "bool" },
              { name: "whitelist_pda", type: "pubkey" },
              { name: "reserved_fee_recipient", type: "pubkey" },
              { name: "mayhem_mode_enabled", type: "bool" },
              {
                name: "reserved_fee_recipients",
                type: { array: ["pubkey", 7] },
              },
              { name: "is_cashback_enabled", type: "bool" },
              {
                name: "buyback_fee_recipients",
                type: { array: ["pubkey", 8] },
              },
              { name: "buyback_basis_points", type: "u64" },
              { name: "initial_virtual_quote_reserves", type: "u64" },
              {
                name: "whitelisted_quote_mints",
                type: { array: ["pubkey", 1] },
              },
              { name: "creator_fee_configurable", type: "bool" },
              { name: "max_configurable_creator_fee_bps", type: "u64" },
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
          name: "MigrateBondingCurveCreatorEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "sharing_config", type: "pubkey" },
              { name: "old_creator", type: "pubkey" },
              { name: "new_creator", type: "pubkey" },
            ],
          },
        },
        {
          name: "MinimumDistributableFeeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "minimum_required", type: "u64" },
              { name: "distributable_fees", type: "u64" },
              { name: "can_distribute", type: "bool" },
            ],
          },
        },
        { name: "OptionBool", type: { kind: "struct", fields: ["bool"] } },
        { name: "OptionU64", type: { kind: "struct", fields: ["u64"] } },
        {
          name: "QuoteControl",
          type: {
            kind: "struct",
            fields: [
              { name: "admin", type: "pubkey" },
              { name: "_reserved", type: { array: ["u8", 64] } },
              {
                name: "mints",
                type: { vec: { defined: { name: "QuoteControlMint" } } },
              },
            ],
          },
        },
        {
          name: "QuoteControlMint",
          type: {
            kind: "struct",
            fields: [
              { name: "mint", type: "pubkey" },
              { name: "initial_virtual_quote_reserves", type: "u64" },
            ],
          },
        },
        {
          name: "RemoveQuoteControlMintEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "quote_control", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
              { name: "timestamp", type: "i64" },
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
              {
                name: "reserved_fee_recipients",
                type: { array: ["pubkey", 7] },
              },
            ],
          },
        },
        {
          name: "SetCreatorEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "creator", type: "pubkey" },
            ],
          },
        },
        {
          name: "SetCreatorFeeBpsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "authority", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "old_creator_fee_bps", type: "u64" },
              { name: "new_creator_fee_bps", type: "u64" },
            ],
          },
        },
        {
          name: "SetMetaplexCreatorEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "metadata", type: "pubkey" },
              { name: "creator", type: "pubkey" },
            ],
          },
        },
        {
          name: "SetParamsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "initial_virtual_token_reserves", type: "u64" },
              { name: "initial_virtual_sol_reserves", type: "u64" },
              { name: "initial_real_token_reserves", type: "u64" },
              { name: "final_real_sol_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "fee_basis_points", type: "u64" },
              { name: "withdraw_authority", type: "pubkey" },
              { name: "enable_migrate", type: "bool" },
              { name: "pool_migration_fee", type: "u64" },
              { name: "creator_fee_basis_points", type: "u64" },
              { name: "fee_recipients", type: { array: ["pubkey", 8] } },
              { name: "timestamp", type: "i64" },
              { name: "set_creator_authority", type: "pubkey" },
              { name: "admin_set_creator_authority", type: "pubkey" },
            ],
          },
        },
        {
          name: "SetQuoteControlAdminEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "quote_control", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "old_admin", type: "pubkey" },
              { name: "new_admin", type: "pubkey" },
              { name: "timestamp", type: "i64" },
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
          name: "TradeEvent",
          docs: ['ix_name: "buy" | "sell" | "buy_exact_sol_in"'],
          type: {
            kind: "struct",
            fields: [
              { name: "mint", type: "pubkey" },
              { name: "sol_amount", type: "u64" },
              { name: "token_amount", type: "u64" },
              { name: "is_buy", type: "bool" },
              { name: "user", type: "pubkey" },
              { name: "timestamp", type: "i64" },
              { name: "virtual_sol_reserves", type: "u64" },
              { name: "virtual_token_reserves", type: "u64" },
              { name: "real_sol_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "fee_recipient", type: "pubkey" },
              { name: "fee_basis_points", type: "u64" },
              { name: "fee", type: "u64" },
              { name: "creator", type: "pubkey" },
              { name: "creator_fee_basis_points", type: "u64" },
              { name: "creator_fee", type: "u64" },
              { name: "track_volume", type: "bool" },
              { name: "total_unclaimed_tokens", type: "u64" },
              { name: "total_claimed_tokens", type: "u64" },
              { name: "current_sol_volume", type: "u64" },
              { name: "last_update_timestamp", type: "i64" },
              { name: "ix_name", type: "string" },
              { name: "mayhem_mode", type: "bool" },
              { name: "cashback_fee_basis_points", type: "u64" },
              { name: "cashback", type: "u64" },
              { name: "buyback_fee_basis_points", type: "u64" },
              { name: "buyback_fee", type: "u64" },
              {
                name: "shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "quote_mint", type: "pubkey" },
              { name: "quote_amount", type: "u64" },
              { name: "virtual_quote_reserves", type: "u64" },
              { name: "real_quote_reserves", type: "u64" },
            ],
          },
        },
        {
          name: "UpdateCreatorFeeConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "authority", type: "pubkey" },
              { name: "creator_fee_configurable", type: "bool" },
              { name: "max_configurable_creator_fee_bps", type: "u64" },
            ],
          },
        },
        {
          name: "UpdateGlobalAuthorityEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "new_authority", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "UpdateMayhemVirtualParamsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "virtual_token_reserves", type: "u64" },
              { name: "virtual_sol_reserves", type: "u64" },
              { name: "new_virtual_token_reserves", type: "u64" },
              { name: "new_virtual_sol_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "real_sol_reserves", type: "u64" },
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
              { name: "stable_cashback_earned", type: "u64" },
              { name: "total_stable_cashback_claimed", type: "u64" },
            ],
          },
        },
      ],
    },
    ev = class extends Error {
      constructor() {
        (super("No shareholders provided"),
          (this.name = "NoShareholdersError"));
      }
    },
    ew = class extends Error {
      constructor(e, t) {
        (super(`Too many shareholders. Maximum allowed is ${t}, got ${e}`),
          (this.count = e),
          (this.max = t),
          (this.name = "TooManyShareholdersError"));
      }
    },
    eA = class extends Error {
      constructor(e) {
        (super(`Zero or negative share not allowed for address ${e}`),
          (this.address = e),
          (this.name = "ZeroShareError"));
      }
    },
    eC = class extends Error {
      constructor(e) {
        (super(
          `Invalid share total. Must equal 10,000 basis points (100%). Got ${e}`,
        ),
          (this.total = e),
          (this.name = "InvalidShareTotalError"));
      }
    },
    eP = class extends Error {
      constructor() {
        (super("Duplicate shareholder addresses not allowed"),
          (this.name = "DuplicateShareholderError"));
      }
    },
    eB = class extends Error {
      constructor(e) {
        (super(
          `Unsupported quote mint ${e.toBase58()}: not SOL, not whitelisted on Global and not listed in QuoteControl`,
        ),
          (this.quoteMint = e),
          (this.name = "UnsupportedQuoteMintError"));
      }
    },
    eS = class extends Error {
      constructor() {
        (super(
          "Configurable creator fees are disabled (Global.creatorFeeConfigurable is false)",
        ),
          (this.name = "CreatorFeeNotConfigurableError"));
      }
    },
    eE = class extends Error {
      constructor(e, t) {
        (super(
          `Creator fee of ${e.toString()} bps is outside 1..=${t.toString()} (Global.maxConfigurableCreatorFeeBps)`,
        ),
          (this.creatorFeeBps = e),
          (this.max = t),
          (this.name = "CreatorFeeBpsOutOfRangeError"));
      }
    },
    eT = class extends Error {
      constructor(e) {
        (super(
          `Creator fee cannot be configured for cashback coin ${e.toBase58()}`,
        ),
          (this.mint = e),
          (this.name = "CreatorFeeNotAllowedForCashbackCoinError"));
      }
    },
    eq = new s.default(1e15),
    eM = Object.freeze([i.PublicKey.default, r.w, r.Q]),
    eF = Object.freeze([
      new i.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    ]);
  function eI({
    global: e,
    feeConfig: t,
    mintSupply: n,
    bondingCurve: a,
    amount: o,
    isNewBondingCurve: r,
  }) {
    let {
        virtualQuoteReserves: u,
        virtualTokenReserves: c,
        isMayhemMode: m,
      } = a,
      { protocolFeeBps: l, creatorFeeBps: d } = ex({
        global: e,
        feeConfig: t,
        mintSupply: m ? n : eq,
        virtualQuoteReserves: u,
        virtualTokenReserves: c,
        quoteMint: a.quoteMint,
        creatorFeeBps: a.creatorFeeBps,
      });
    return eV(o, l).add(
      r || !i.PublicKey.default.equals(a.creator) ? eV(o, d) : new s.default(0),
    );
  }
  function ex({
    global: e,
    feeConfig: t,
    mintSupply: n,
    virtualQuoteReserves: a,
    virtualTokenReserves: o,
    quoteMint: r,
    creatorFeeBps: s,
  }) {
    let u = (function ({
      global: e,
      feeConfig: t,
      mintSupply: n,
      virtualQuoteReserves: a,
      virtualTokenReserves: o,
      quoteMint: r,
    }) {
      if (null != t) {
        let e = tD({
          mintSupply: n,
          virtualQuoteReserves: a,
          virtualTokenReserves: o,
        });
        return eR({
          feeConfig: t,
          quoteMint: r ?? i.PublicKey.default,
          marketCap: e,
        });
      }
      return {
        protocolFeeBps: e.feeBasisPoints,
        creatorFeeBps: e.creatorFeeBasisPoints,
      };
    })({
      global: e,
      feeConfig: t,
      mintSupply: n,
      virtualQuoteReserves: a,
      virtualTokenReserves: o,
      quoteMint: r,
    });
    return !e.creatorFeeConfigurable || null == s || s.isZero()
      ? u
      : { protocolFeeBps: u.protocolFeeBps, creatorFeeBps: s };
  }
  function eR({ feeConfig: e, quoteMint: t, marketCap: n }) {
    return eM.some((e) => e.equals(t))
      ? eU({ feeTiers: e.feeTiers, marketCap: n })
      : eF.some((e) => e.equals(t))
        ? eU({
            feeTiers:
              e.stableFeeTiers.length > 0 ? e.stableFeeTiers : e.feeTiers,
            marketCap: n,
          })
        : !(function ({ lpFeeBps: e, protocolFeeBps: t, creatorFeeBps: n }) {
              return e.isZero() && t.isZero() && n.isZero();
            })(e.exoticFlatFees)
          ? e.exoticFlatFees
          : e.flatFees;
  }
  function eU({ feeTiers: e, marketCap: t }) {
    if (0 === e.length) throw Error("Fee tiers cannot be empty");
    let n = e[0];
    if (t.lt(n.marketCapLamportsThreshold)) return n.fees;
    for (let n of e.slice().reverse())
      if (t.gte(n.marketCapLamportsThreshold)) return n.fees;
    return n.fees;
  }
  function eV(e, t) {
    var n, a;
    return ((n = e.mul(t)), (a = new s.default(1e4)), n.add(a.subn(1)).div(a));
  }
  function eN(e, t) {
    if (t) {
      let t = [e.reservedFeeRecipient, ...e.reservedFeeRecipients];
      return t[Math.floor(Math.random() * t.length)];
    }
    let n = [e.feeRecipient, ...e.feeRecipients];
    return n[Math.floor(Math.random() * n.length)];
  }
  var eL = {
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "admin_set_coin_creator_fee_editable",
          discriminator: [204, 65, 86, 207, 110, 84, 239, 104],
          accounts: [
            {
              name: "admin_set_coin_creator_authority",
              writable: !0,
              signer: !0,
              relations: ["global_config"],
            },
            { name: "global_config" },
            { name: "pool", writable: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "pool.coin_creator",
                    account: "Pool",
                  },
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212,
                      248, 9, 12, 24, 233, 168, 99,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "pool.coin_creator",
                    account: "Pool",
                  },
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212,
                      248, 9, 12, 24, 233, 168, 99,
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
          docs: [
            "Pays out the user's accrued cashback. `user_wsol_token_account` may be any token account",
            "of `quote_mint` owned by `user`, not only the associated one.",
          ],
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "user_wsol_token_account", writable: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
            {
              name: "creator_fee_bps",
              type: { defined: { name: "OptionU64" } },
            },
            {
              name: "can_edit_creator_fee",
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
            { name: "user", writable: !0, signer: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  {
                    kind: "account",
                    path: "pool.coin_creator",
                    account: "Pool",
                  },
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
                      101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212,
                      248, 9, 12, 24, 233, 168, 99,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                  {
                    kind: "const",
                    value: [109, 101, 116, 97, 100, 97, 116, 97],
                  },
                  {
                    kind: "const",
                    value: [
                      11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127,
                      107, 4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181,
                      73, 182, 209, 188, 3, 248, 41, 70,
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
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "set_coin_creator_fee_bps",
          discriminator: [66, 89, 202, 237, 8, 118, 158, 169],
          accounts: [
            { name: "coin_creator", signer: !0 },
            { name: "global_config" },
            { name: "pool", writable: !0 },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "creator_fee_bps", type: "u64" }],
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
                      103, 108, 111, 98, 97, 108, 95, 99, 111, 110, 102, 105,
                      103,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      101, 95, 97, 99, 99, 117, 109, 117, 108, 97, 116, 111,
                      114,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "coin_creator" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
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
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "coin_creator" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "update_creator_fee_config",
          discriminator: [61, 175, 160, 249, 66, 66, 136, 175],
          accounts: [
            {
              name: "admin",
              writable: !0,
              signer: !0,
              relations: ["global_config"],
            },
            { name: "global_config", writable: !0 },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "creator_fee_configurable", type: "bool" },
            { name: "max_configurable_creator_fee_bps", type: "u64" },
          ],
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "AdminSetCoinCreatorFeeEditableEvent",
          discriminator: [191, 198, 127, 188, 109, 174, 9, 105],
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
          name: "SetCoinCreatorFeeBpsEvent",
          discriminator: [230, 138, 241, 158, 28, 232, 228, 211],
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
          name: "UpdateCreatorFeeConfigEvent",
          discriminator: [152, 198, 124, 124, 106, 246, 127, 191],
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
          name: "MissingCashbackAccounts",
          msg: "Cashback trade is missing the required remaining accounts",
        },
        {
          code: 6060,
          name: "InvalidCashbackAccumulator",
          msg: "Cashback user_volume_accumulator account is invalid",
        },
        {
          code: 6061,
          name: "InvalidCashbackAccumulatorAta",
          msg: "Cashback user_volume_accumulator ATA is missing or invalid",
        },
        {
          code: 6062,
          name: "InvalidPoolV2",
          msg: "pool_v2 remaining account is missing or invalid",
        },
        {
          code: 6063,
          name: "InsufficientRealQuoteReserves",
          msg: "BOOST: sell output exceeds the real quote vault. effective = real + virtual is pricing-only; payout is capped at real_vault, so quote min(out, real_vault)",
        },
        {
          code: 6064,
          name: "BoostPoolLiquidityUnsupported",
          msg: "BOOST: deposit/withdraw don't apply to boost pools",
        },
        {
          code: 6065,
          name: "PoolCannotBoost",
          msg: "BOOST: pool cannot be boosted (no virtual reserves)",
        },
        { code: 6066, name: "BoostDisabled", msg: "BOOST: boost is disabled" },
        {
          code: 6067,
          name: "SeedLockViolation",
          msg: "BOOST: lp_supply must never drop below the circulating LP mint supply",
        },
        {
          code: 6068,
          name: "CreatorFeeNotConfigurable",
          msg: "Configurable creator fee is disabled",
        },
        {
          code: 6069,
          name: "CreatorFeeBpsOutOfRange",
          msg: "Creator fee basis points must be between 1 and the configured maximum",
        },
        {
          code: 6070,
          name: "CreatorFeeNotEditable",
          msg: "Creator fee is not editable for this pool",
        },
        {
          code: 6071,
          name: "CreatorFeeNotAllowedForCashbackCoin",
          msg: "Cashback coins cannot have a creator fee",
        },
        {
          code: 6072,
          name: "SharingConfigNotActive",
          msg: "Sharing config is not active",
        },
        { code: 6073, name: "NotAuthorized", msg: "Not authorized" },
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
          name: "AdminSetCoinCreatorFeeEditableEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin_set_coin_creator_authority", type: "pubkey" },
              { name: "base_mint", type: "pubkey" },
              { name: "pool", type: "pubkey" },
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
              { name: "base_supply", type: "u64" },
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
              {
                name: "protocol_fee_recipients",
                type: { array: ["pubkey", 8] },
              },
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
              { name: "creator_fee_bps", type: "u64" },
              { name: "can_edit_creator_fee", type: "bool" },
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
              { name: "exotic_flat_fees", type: { defined: { name: "Fees" } } },
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
              {
                name: "reserved_fee_recipients",
                type: { array: ["pubkey", 7] },
              },
              { name: "is_cashback_enabled", type: "bool" },
              {
                name: "buyback_fee_recipients",
                type: { array: ["pubkey", 8] },
              },
              { name: "buyback_basis_points", type: "u64" },
              { name: "boost_authority", type: "pubkey" },
              { name: "boost_enabled", type: "bool" },
              { name: "creator_fee_configurable", type: "bool" },
              { name: "max_configurable_creator_fee_bps", type: "u64" },
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
        { name: "OptionU64", type: { kind: "struct", fields: ["u64"] } },
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
              { name: "creator_fee_bps", type: "u64" },
              { name: "can_edit_creator_fee", type: "bool" },
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
              {
                name: "reserved_fee_recipients",
                type: { array: ["pubkey", 7] },
              },
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
              { name: "base_supply", type: "u64" },
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
          name: "SetCoinCreatorFeeBpsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "authority", type: "pubkey" },
              { name: "base_mint", type: "pubkey" },
              { name: "pool", type: "pubkey" },
              { name: "old_creator_fee_bps", type: "u64" },
              { name: "new_creator_fee_bps", type: "u64" },
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
          name: "UpdateCreatorFeeConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "creator_fee_configurable", type: "bool" },
              { name: "max_configurable_creator_fee_bps", type: "u64" },
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
              {
                name: "protocol_fee_recipients",
                type: { array: ["pubkey", 8] },
              },
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
    },
    eD = {
      address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
      metadata: {
        name: "pump_fees",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
      },
      instructions: [
        {
          name: "claim_social_fee_pda",
          discriminator: [225, 21, 251, 133, 161, 30, 199, 226],
          accounts: [
            { name: "recipient", writable: !0 },
            { name: "social_fee_pda", writable: !0 },
            {
              name: "fee_program_global",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            {
              name: "social_claim_authority",
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "user_id", type: "string" },
            { name: "platform", type: "u8" },
          ],
          returns: { option: { defined: { name: "SocialFeePdaClaimed" } } },
        },
        {
          name: "claim_social_fee_pda_v2",
          discriminator: [17, 77, 240, 134, 58, 188, 53, 149],
          accounts: [
            { name: "recipient", writable: !0 },
            { name: "social_fee_pda", writable: !0 },
            {
              name: "quote_mint",
              docs: ["Quote mint for claim"],
              writable: !0,
            },
            {
              name: "associated_social_fee_pda",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "social_fee_pda" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            {
              name: "associated_recipient",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "recipient" },
                  { kind: "account", path: "quote_token_program" },
                  { kind: "account", path: "quote_mint" },
                ],
                program: { kind: "account", path: "associated_token_program" },
              },
            },
            { name: "quote_token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "fee_program_global",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            {
              name: "social_claim_authority",
              signer: !0,
              relations: ["fee_program_global"],
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "user_id", type: "string" },
            { name: "platform", type: "u8" },
          ],
          returns: { option: { defined: { name: "SocialFeePdaClaimed" } } },
        },
        {
          name: "crank_donation_fee_pda",
          discriminator: [220, 10, 189, 167, 169, 17, 25, 69],
          accounts: [
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            {
              name: "payer",
              docs: [
                "Pays rent when [`temp_wsol_token_account`] is created (`init_if_needed`); receives rent when it is closed after the relay CPI.",
              ],
              writable: !0,
              signer: !0,
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "rent",
              address: "SysvarRent111111111111111111111111111111111",
            },
            {
              name: "fee_program_global",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            {
              name: "donation_fee_pda",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 111, 110, 97, 116, 105, 111, 110, 45, 102, 101, 101,
                      45, 112, 100, 97,
                    ],
                  },
                  {
                    kind: "account",
                    path: "donation_fee_pda.base_mint",
                    account: "DonationFeePda",
                  },
                  {
                    kind: "account",
                    path: "donation_fee_pda.config_id",
                    account: "DonationFeePda",
                  },
                ],
              },
            },
            {
              name: "quote_mint",
              docs: ["Quote mint from donation fee pda."],
              writable: !0,
            },
            {
              name: "donation_fee_pda_ata",
              docs: ["WSOL ATA owned by `donation_fee_pda`."],
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "donation_fee_pda" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "quote_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "donation_relay_program",
              address: "RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu",
            },
            { name: "donation_relay_event_authority" },
            { name: "mint_whitelist" },
            { name: "epoch_tracker", writable: !0 },
            { name: "debouncer", writable: !0 },
            { name: "debouncer_ata", writable: !0 },
          ],
          args: [],
        },
        {
          name: "create_donation_fee_pda",
          discriminator: [244, 139, 16, 88, 14, 255, 122, 26],
          accounts: [
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "payer", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "fee_program_global",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            {
              name: "donation_fee_pda",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      100, 111, 110, 97, 116, 105, 111, 110, 45, 102, 101, 101,
                      45, 112, 100, 97,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                  { kind: "account", path: "config_id" },
                ],
              },
            },
            {
              name: "config_id",
              docs: [
                "stored on the PDA, so distinct `config_id`s for the same `base_mint` derive distinct addresses.",
              ],
            },
            { name: "base_mint" },
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
                  { kind: "account", path: "base_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "pool" },
            {
              name: "sharing_config",
              docs: ["(derived from `[SHARING_CONFIG_SEED, base_mint]`)"],
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "base_mint" },
                ],
              },
            },
          ],
          args: [],
        },
        {
          name: "create_fee_sharing_config",
          docs: ["Create Fee Sharing Config"],
          discriminator: [195, 78, 86, 76, 111, 52, 251, 213],
          accounts: [
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "payer", writable: !0, signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "mint" },
            {
              name: "sharing_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "bonding_curve",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "pump_program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "pump_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "pool", writable: !0, optional: !0 },
            {
              name: "pump_amm_program",
              optional: !0,
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "pump_amm_event_authority",
              optional: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
          ],
          args: [],
        },
        {
          name: "create_social_fee_pda",
          discriminator: [144, 224, 59, 211, 78, 248, 202, 220],
          accounts: [
            { name: "payer", writable: !0, signer: !0 },
            { name: "social_fee_pda", writable: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "fee_program_global",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "user_id", type: "string" },
            { name: "platform", type: "u8" },
          ],
        },
        {
          name: "extend_fee_config",
          docs: [
            "Realloc the fee_config PDA to [`FeeConfig::CURRENT_SIZE`] (signer pays rent delta).",
          ],
          discriminator: [68, 179, 244, 90, 173, 56, 17, 217],
          accounts: [
            { name: "fee_config", writable: !0 },
            { name: "user", signer: !0 },
            { name: "config_program_id" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "get_fees",
          docs: ["Get Fees"],
          discriminator: [231, 37, 126, 85, 207, 91, 63, 52],
          accounts: [
            {
              name: "fee_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "config_program_id" },
          ],
          args: [
            { name: "is_pump_pool", type: "bool" },
            { name: "market_cap_lamports", type: "u128" },
            { name: "trade_size_lamports", type: "u64" },
            {
              name: "is_new_quote_mint",
              type: { defined: { name: "OptionBool" } },
            },
          ],
          returns: { defined: { name: "Fees" } },
        },
        {
          name: "get_fees_with_quote_mint",
          discriminator: [154, 237, 138, 92, 162, 2, 162, 187],
          accounts: [
            {
              name: "fee_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "config_program_id" },
          ],
          args: [
            { name: "is_pump_pool", type: "bool" },
            { name: "market_cap_lamports", type: "u128" },
            { name: "quote_mint", type: "pubkey" },
          ],
          returns: { defined: { name: "Fees" } },
        },
        {
          name: "initialize_buyback",
          discriminator: [250, 129, 236, 160, 227, 36, 103, 134],
          accounts: [
            { name: "payer", writable: !0, signer: !0 },
            { name: "buyback_vault", writable: !0 },
            {
              name: "buyback_vault_ata",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "mint" },
            { name: "token_program" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "index", type: "u8" }],
        },
        {
          name: "initialize_fee_config",
          docs: ["Initialize FeeConfig admin"],
          discriminator: [62, 162, 20, 133, 121, 65, 145, 27],
          accounts: [
            {
              name: "admin",
              writable: !0,
              signer: !0,
              address: "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8",
            },
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "initialize_fee_program_global",
          discriminator: [35, 215, 130, 84, 233, 56, 124, 167],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["pump_global"],
            },
            {
              name: "pump_global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "social_claim_authority", type: "pubkey" },
            { name: "disable_flags", type: "u8" },
            { name: "claim_rate_limit", type: "u64" },
          ],
        },
        {
          name: "reset_fee_sharing_config",
          docs: ["Reset Fee Sharing Config and distribute pending fees first"],
          discriminator: [10, 2, 182, 95, 16, 127, 129, 186],
          accounts: [
            { name: "new_admin" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "authority", signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "mint", relations: ["sharing_config"] },
            {
              name: "sharing_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
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
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "pump_program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "pump_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "pump_amm_program",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
            {
              name: "wsol_mint",
              address: "So11111111111111111111111111111111111111112",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "coin_creator_vault_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
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
                program: { kind: "account", path: "associated_token_program" },
              },
            },
          ],
          args: [],
        },
        {
          name: "reset_fee_sharing_config_v2",
          docs: ["Reset Fee Sharing Config and distribute pending fees first"],
          discriminator: [169, 245, 17, 209, 94, 91, 248, 128],
          accounts: [
            { name: "new_admin" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "mint", relations: ["sharing_config"] },
            {
              name: "sharing_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
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
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "pump_program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "pump_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "pump_amm_program",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
            { name: "quote_mint" },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "coin_creator_vault_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
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
                program: { kind: "account", path: "associated_token_program" },
              },
            },
          ],
          args: [],
        },
        {
          name: "revoke_fee_sharing_authority",
          docs: ["Revoke Fee Sharing Authority"],
          discriminator: [18, 233, 158, 39, 185, 207, 58, 104],
          accounts: [],
          args: [],
        },
        {
          name: "set_authority",
          discriminator: [133, 250, 37, 21, 110, 163, 26, 121],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "new_authority", type: "pubkey" }],
        },
        {
          name: "set_claim_rate_limit",
          discriminator: [185, 211, 159, 174, 212, 49, 88, 4],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "claim_rate_limit", type: "u64" }],
        },
        {
          name: "set_disable_flags",
          discriminator: [194, 217, 112, 35, 114, 222, 51, 190],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "disable_flags", type: "u8" }],
        },
        {
          name: "set_exotic_flat_fees",
          discriminator: [30, 234, 149, 138, 252, 230, 39, 73],
          accounts: [
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            {
              name: "admin",
              writable: !0,
              signer: !0,
              relations: ["fee_config"],
            },
            { name: "config_program_id" },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "exotic_flat_fees", type: { defined: { name: "Fees" } } },
          ],
        },
        {
          name: "set_social_claim_authority",
          discriminator: [147, 54, 184, 154, 136, 237, 185, 153],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
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
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "social_claim_authority", type: "pubkey" }],
        },
        {
          name: "sweep_buyback",
          discriminator: [138, 33, 204, 38, 207, 161, 159, 226],
          accounts: [
            { name: "destination", writable: !0 },
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["buyback_vault"],
            },
            { name: "buyback_vault", writable: !0 },
            {
              name: "buyback_vault_ata",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_vault" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "destination_ata",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "destination" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            { name: "mint" },
            { name: "token_program" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "index", type: "u8" }],
        },
        {
          name: "transfer_fee_sharing_authority",
          docs: ["Transfer Fee Sharing Authority"],
          discriminator: [202, 10, 75, 200, 164, 34, 210, 96],
          accounts: [],
          args: [],
        },
        {
          name: "update_admin",
          docs: ["Update admin (only callable by admin)"],
          discriminator: [161, 176, 40, 213, 60, 184, 179, 228],
          accounts: [
            { name: "admin", signer: !0, relations: ["fee_config"] },
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "new_admin" },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
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
          name: "update_buyback_authority",
          discriminator: [66, 98, 113, 202, 121, 37, 219, 107],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            { name: "buyback_vault", writable: !0 },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "index", type: "u8" },
            { name: "new_authority", type: "pubkey" },
          ],
        },
        {
          name: "update_buyback_claim_rate_limit",
          discriminator: [186, 95, 135, 190, 255, 199, 137, 170],
          accounts: [
            {
              name: "authority",
              writable: !0,
              signer: !0,
              relations: ["fee_program_global"],
            },
            {
              name: "fee_program_global",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45,
                      103, 108, 111, 98, 97, 108,
                    ],
                  },
                ],
              },
            },
            { name: "buyback_vault", writable: !0 },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "index", type: "u8" },
            { name: "claim_rate_limit", type: "i64" },
          ],
        },
        {
          name: "update_fee_config",
          docs: [
            "Set/Replace fee parameters entirely (only callable by admin)",
          ],
          discriminator: [104, 184, 103, 242, 88, 151, 107, 20],
          accounts: [
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "admin", signer: !0, relations: ["fee_config"] },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            {
              name: "fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
            { name: "flat_fees", type: { defined: { name: "Fees" } } },
          ],
        },
        {
          name: "update_fee_shares",
          docs: [
            "Update Fee Shares, make sure to distribute all the fees before calling this",
          ],
          discriminator: [189, 13, 136, 99, 187, 164, 237, 35],
          accounts: [
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "authority", signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "mint", relations: ["sharing_config"] },
            {
              name: "sharing_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
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
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "pump_program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "pump_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "pump_amm_program",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
            {
              name: "wsol_mint",
              address: "So11111111111111111111111111111111111111112",
            },
            {
              name: "token_program",
              address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "coin_creator_vault_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
            { name: "coin_creator_vault_ata", writable: !0 },
          ],
          args: [
            {
              name: "shareholders",
              type: { vec: { defined: { name: "Shareholder" } } },
            },
          ],
        },
        {
          name: "update_fee_shares_v2",
          docs: [
            "Update Fee Shares, make sure to distribute all the fees before calling this",
          ],
          discriminator: [111, 251, 49, 6, 78, 78, 106, 18],
          accounts: [
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            {
              name: "program",
              address: "pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ",
            },
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global",
              pda: {
                seeds: [{ kind: "const", value: [103, 108, 111, 98, 97, 108] }],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            { name: "mint", relations: ["sharing_config"] },
            {
              name: "sharing_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102,
                      105, 103,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
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
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
                      99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
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
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "pump_program",
              address: "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
            },
            {
              name: "pump_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "pump_amm_program",
              address: "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
            },
            {
              name: "amm_event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
              },
            },
            { name: "quote_mint" },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "coin_creator_vault_authority",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108,
                      116,
                    ],
                  },
                  { kind: "account", path: "sharing_config" },
                ],
                program: {
                  kind: "const",
                  value: [
                    12, 20, 222, 252, 130, 94, 198, 118, 148, 37, 8, 24, 187,
                    101, 64, 101, 244, 41, 141, 49, 86, 213, 113, 180, 212, 248,
                    9, 12, 24, 233, 168, 99,
                  ],
                },
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
                program: { kind: "account", path: "associated_token_program" },
              },
            },
          ],
          args: [
            {
              name: "shareholders",
              type: { vec: { defined: { name: "Shareholder" } } },
            },
          ],
        },
        {
          name: "update_stable_fee_config",
          docs: [
            "Set/Replace fee parameters entirely (only callable by admin)",
          ],
          discriminator: [107, 169, 100, 179, 134, 155, 146, 221],
          accounts: [
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "admin", signer: !0, relations: ["fee_config"] },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            {
              name: "fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
          ],
        },
        {
          name: "upsert_fee_tiers",
          docs: ["Update or expand fee tiers (only callable by admin)"],
          discriminator: [227, 23, 150, 12, 77, 86, 94, 4],
          accounts: [
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "admin", signer: !0, relations: ["fee_config"] },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            {
              name: "fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
            { name: "offset", type: "u8" },
          ],
        },
        {
          name: "upsert_stable_fee_tiers",
          docs: ["Update or expand fee tiers (only callable by admin)"],
          discriminator: [181, 160, 162, 252, 74, 76, 224, 221],
          accounts: [
            {
              name: "fee_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [102, 101, 101, 95, 99, 111, 110, 102, 105, 103],
                  },
                  { kind: "account", path: "config_program_id" },
                ],
              },
            },
            { name: "admin", signer: !0, relations: ["fee_config"] },
            { name: "config_program_id" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            {
              name: "fee_tiers",
              type: { vec: { defined: { name: "FeeTier" } } },
            },
            { name: "offset", type: "u8" },
          ],
        },
      ],
      accounts: [
        {
          name: "BondingCurve",
          discriminator: [23, 183, 248, 55, 96, 216, 172, 96],
        },
        {
          name: "BuybackVault",
          discriminator: [153, 166, 71, 144, 179, 189, 137, 251],
        },
        {
          name: "DonationFeePda",
          discriminator: [246, 197, 96, 9, 193, 30, 93, 115],
        },
        {
          name: "FeeConfig",
          discriminator: [143, 52, 146, 187, 219, 123, 76, 155],
        },
        {
          name: "FeeProgramGlobal",
          discriminator: [162, 165, 245, 49, 29, 37, 55, 242],
        },
        {
          name: "Global",
          discriminator: [167, 232, 232, 177, 200, 108, 114, 127],
        },
        { name: "Pool", discriminator: [241, 154, 109, 4, 17, 177, 109, 188] },
        {
          name: "SharingConfig",
          discriminator: [216, 74, 9, 0, 56, 140, 93, 75],
        },
        {
          name: "SocialFeePda",
          discriminator: [139, 96, 53, 17, 42, 169, 206, 150],
        },
      ],
      events: [
        {
          name: "CreateFeeSharingConfigEvent",
          discriminator: [133, 105, 170, 200, 184, 116, 251, 88],
        },
        {
          name: "DonationFeePdaCranked",
          discriminator: [30, 208, 107, 93, 177, 0, 223, 78],
        },
        {
          name: "DonationFeePdaCreated",
          discriminator: [94, 20, 137, 239, 35, 77, 225, 235],
        },
        {
          name: "ExtendFeeConfigEvent",
          discriminator: [226, 203, 224, 35, 153, 10, 88, 51],
        },
        {
          name: "InitializeFeeConfigEvent",
          discriminator: [89, 138, 244, 230, 10, 56, 226, 126],
        },
        {
          name: "InitializeFeeProgramGlobalEvent",
          discriminator: [40, 233, 156, 78, 95, 0, 8, 199],
        },
        {
          name: "ResetFeeSharingConfigEvent",
          discriminator: [203, 204, 151, 226, 120, 55, 214, 243],
        },
        {
          name: "SetAuthorityEvent",
          discriminator: [18, 175, 132, 66, 208, 201, 87, 242],
        },
        {
          name: "SetClaimRateLimitEvent",
          discriminator: [13, 143, 143, 235, 181, 19, 51, 40],
        },
        {
          name: "SetDisableFlagsEvent",
          discriminator: [5, 8, 179, 65, 49, 55, 145, 126],
        },
        {
          name: "SetExoticFlatFeesEvent",
          discriminator: [195, 138, 108, 15, 8, 77, 68, 9],
        },
        {
          name: "SetSocialClaimAuthorityEvent",
          discriminator: [60, 118, 127, 132, 239, 52, 254, 14],
        },
        {
          name: "SocialFeePdaClaimed",
          discriminator: [50, 18, 193, 65, 237, 210, 234, 236],
        },
        {
          name: "SocialFeePdaCreated",
          discriminator: [183, 183, 218, 147, 24, 124, 137, 169],
        },
        {
          name: "SweepBuybackEvent",
          discriminator: [43, 56, 42, 214, 153, 57, 166, 137],
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
          name: "UpdateFeeSharesEvent",
          discriminator: [21, 186, 196, 184, 91, 228, 225, 203],
        },
        {
          name: "UpdateStableFeeConfigEvent",
          discriminator: [94, 5, 43, 237, 103, 147, 232, 245],
        },
        {
          name: "UpsertFeeTiersEvent",
          discriminator: [171, 89, 169, 187, 122, 186, 33, 204],
        },
        {
          name: "UpsertStableFeeTiersEvent",
          discriminator: [232, 237, 237, 52, 98, 146, 73, 243],
        },
      ],
      errors: [
        {
          code: 6e3,
          name: "UnauthorizedProgram",
          msg: "Only Pump and PumpSwap programs can call this instruction",
        },
        { code: 6001, name: "InvalidAdmin", msg: "Invalid admin" },
        { code: 6002, name: "NoFeeTiers", msg: "No fee tiers provided" },
        { code: 6003, name: "TooManyFeeTiers", msg: "format" },
        {
          code: 6004,
          name: "OffsetNotContinuous",
          msg: "The offset should be <= fee_config.fee_tiers.len()",
        },
        {
          code: 6005,
          name: "FeeTiersNotSorted",
          msg: "Fee tiers must be sorted by market cap threshold (ascending)",
        },
        {
          code: 6006,
          name: "InvalidFeeTotal",
          msg: "Fee total must not exceed 10_000bps",
        },
        {
          code: 6007,
          name: "InvalidSharingConfig",
          msg: "Invalid Sharing Config",
        },
        { code: 6008, name: "InvalidPool", msg: "Invalid Pool" },
        {
          code: 6009,
          name: "SharingConfigAdminRevoked",
          msg: "Sharing config authority has been revoked - sharing config can only be updated once",
        },
        { code: 6010, name: "NoShareholders", msg: "No shareholders provided" },
        { code: 6011, name: "TooManyShareholders", msg: "format" },
        {
          code: 6012,
          name: "DuplicateShareholder",
          msg: "Duplicate shareholder address",
        },
        {
          code: 6013,
          name: "NotEnoughRemainingAccounts",
          msg: "Not enough remaining accounts",
        },
        {
          code: 6014,
          name: "InvalidShareTotal",
          msg: "Invalid share total - must equal 10_000 basis points",
        },
        {
          code: 6015,
          name: "ShareCalculationOverflow",
          msg: "Share calculation overflow",
        },
        {
          code: 6016,
          name: "NotAuthorized",
          msg: "The given account is not authorized to execute this instruction.",
        },
        {
          code: 6017,
          name: "ZeroShareNotAllowed",
          msg: "Shareholder cannot have zero share",
        },
        {
          code: 6018,
          name: "SharingConfigNotActive",
          msg: "Fee sharing config is not active",
        },
        {
          code: 6019,
          name: "AmmAccountsRequiredForGraduatedCoin",
          msg: "AMM accounts are required for graduated coins",
        },
        {
          code: 6020,
          name: "ShareholderAccountMismatch",
          msg: "Remaining account key doesn't match shareholder address",
        },
        {
          code: 6021,
          name: "FeatureDeactivated",
          msg: "Feature is currently deactivated",
        },
        {
          code: 6022,
          name: "UserIdTooLong",
          msg: "User ID exceeds maximum length",
        },
        {
          code: 6023,
          name: "DeprecatedInstruction",
          msg: "Instruction is deprecated",
        },
        {
          code: 6024,
          name: "FeeSharesAlreadyUpdated",
          msg: "Reward split can only be updated once",
        },
        { code: 6025, name: "MathOverflow", msg: "Math overflow" },
        {
          code: 6026,
          name: "InvalidBuybackIndex",
          msg: "Invalid buybackindex",
        },
        {
          code: 6027,
          name: "ClaimRateLimitExceeded",
          msg: "Claim rate limit exceeded",
        },
        {
          code: 6028,
          name: "InvalidFeeConfigAccount",
          msg: "Account is not a valid FeeConfig for this instruction",
        },
        {
          code: 6029,
          name: "AccountTypeNotSupported",
          msg: "Account type not supported",
        },
        {
          code: 6030,
          name: "InvalidMint",
          msg: "Mint does not match quote mint",
        },
        {
          code: 6031,
          name: "UnsupportedQuoteMint",
          msg: "Unsupported quote mint",
        },
        {
          code: 6032,
          name: "InvalidRemainingAccounts",
          msg: "Invalid remaining accounts",
        },
      ],
      types: [
        {
          name: "BondingCurve",
          type: {
            kind: "struct",
            fields: [
              { name: "virtual_token_reserves", type: "u64" },
              { name: "virtual_quote_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "real_quote_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "complete", type: "bool" },
              { name: "creator", type: "pubkey" },
              { name: "is_mayhem_mode", type: "bool" },
            ],
          },
        },
        {
          name: "BuybackVault",
          type: {
            kind: "struct",
            fields: [
              { name: "authority", type: "pubkey" },
              { name: "total_claimed", type: "u64" },
              { name: "total_claimed_token1", type: "u64" },
              { name: "total_claimed_token2", type: "u64" },
              { name: "last_claimed", type: "i64" },
              { name: "claim_rate_limit", type: "i64" },
              { name: "_reserved", type: { array: ["u8", 128] } },
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
          name: "CreateFeeSharingConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "bonding_curve", type: "pubkey" },
              { name: "pool", type: { option: "pubkey" } },
              { name: "sharing_config", type: "pubkey" },
              { name: "admin", type: "pubkey" },
              {
                name: "initial_shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "status", type: { defined: { name: "ConfigStatus" } } },
            ],
          },
        },
        {
          name: "DonationFeePda",
          docs: [
            "Escrow PDA for donation relay: one per (mint, donation campaign `config_id`).",
          ],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "version", type: "u8" },
              { name: "config_id", type: "pubkey" },
              { name: "base_mint", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
              { name: "creator", type: "pubkey" },
              { name: "total_donated", type: "u64" },
              { name: "last_crank_ts", type: "i64" },
              { name: "_reserved", type: { array: ["u8", 64] } },
            ],
          },
        },
        {
          name: "DonationFeePdaCranked",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "signer", type: "pubkey" },
              { name: "donation_fee_pda", type: "pubkey" },
              { name: "config_id", type: "pubkey" },
              { name: "base_mint", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
              { name: "creator", type: "pubkey" },
              { name: "amount", type: "u64" },
            ],
          },
        },
        {
          name: "DonationFeePdaCreated",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "created_by", type: "pubkey" },
              { name: "donation_fee_pda", type: "pubkey" },
              { name: "config_id", type: "pubkey" },
              { name: "base_mint", type: "pubkey" },
              { name: "quote_mint", type: "pubkey" },
              { name: "creator", type: "pubkey" },
            ],
          },
        },
        {
          name: "ExtendFeeConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "fee_config", type: "pubkey" },
              { name: "user", type: "pubkey" },
              { name: "current_size", type: "u64" },
              { name: "new_size", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "FeeConfig",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", docs: ["The bump for the PDA"], type: "u8" },
              {
                name: "admin",
                docs: ["The admin account that can update the fee config"],
                type: "pubkey",
              },
              {
                name: "flat_fees",
                docs: ["The flat fees for non-pump pools"],
                type: { defined: { name: "Fees" } },
              },
              {
                name: "fee_tiers",
                docs: ["The fee tiers"],
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              {
                name: "stable_fee_tiers",
                docs: ["The fee tiers"],
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              { name: "exotic_flat_fees", type: { defined: { name: "Fees" } } },
            ],
          },
        },
        {
          name: "FeeProgramGlobal",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "authority", type: "pubkey" },
              { name: "disable_flags", type: "u8" },
              { name: "social_claim_authority", type: "pubkey" },
              { name: "claim_rate_limit", type: "u64" },
              { name: "_reserved", type: { array: ["u8", 256] } },
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
          name: "Global",
          type: {
            kind: "struct",
            fields: [
              { name: "initialized", type: "bool" },
              { name: "authority", type: "pubkey" },
              { name: "fee_recipient", type: "pubkey" },
              { name: "initial_virtual_token_reserves", type: "u64" },
              { name: "initial_virtual_sol_reserves", type: "u64" },
              { name: "initial_real_token_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "fee_basis_points", type: "u64" },
              { name: "withdraw_authority", type: "pubkey" },
              { name: "enable_migrate", type: "bool" },
              { name: "pool_migration_fee", type: "u64" },
              { name: "creator_fee_basis_points", type: "u64" },
              { name: "fee_recipients", type: { array: ["pubkey", 7] } },
              { name: "set_creator_authority", type: "pubkey" },
              { name: "admin_set_creator_authority", type: "pubkey" },
              { name: "create_v2_enabled", type: "bool" },
              { name: "whitelist_pda", type: "pubkey" },
              { name: "reserved_fee_recipient", type: "pubkey" },
              { name: "mayhem_mode_enabled", type: "bool" },
              {
                name: "reserved_fee_recipients",
                type: { array: ["pubkey", 7] },
              },
            ],
          },
        },
        {
          name: "InitializeFeeConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "fee_config", type: "pubkey" },
            ],
          },
        },
        {
          name: "InitializeFeeProgramGlobalEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "authority", type: "pubkey" },
              { name: "social_claim_authority", type: "pubkey" },
              { name: "disable_flags", type: "u8" },
              { name: "claim_rate_limit", type: "u64" },
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
              { name: "lp_supply", type: "u64" },
              { name: "coin_creator", type: "pubkey" },
              { name: "is_mayhem_mode", type: "bool" },
              { name: "is_cashback_coin", type: "bool" },
              { name: "virtual_quote_reserves", type: "i128" },
            ],
          },
        },
        {
          name: "ResetFeeSharingConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "sharing_config", type: "pubkey" },
              { name: "old_admin", type: "pubkey" },
              {
                name: "old_shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "new_admin", type: "pubkey" },
              {
                name: "new_shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "old_version", type: "u8" },
              { name: "new_version", type: "u8" },
            ],
          },
        },
        {
          name: "SetAuthorityEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "old_authority", type: "pubkey" },
              { name: "new_authority", type: "pubkey" },
            ],
          },
        },
        {
          name: "SetClaimRateLimitEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "claim_rate_limit", type: "u64" },
            ],
          },
        },
        {
          name: "SetDisableFlagsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "disable_flags", type: "u8" },
            ],
          },
        },
        {
          name: "SetExoticFlatFeesEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "fee_config", type: "pubkey" },
              { name: "exotic_flat_fees", type: { defined: { name: "Fees" } } },
            ],
          },
        },
        {
          name: "SetSocialClaimAuthorityEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "social_claim_authority", type: "pubkey" },
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
          name: "SocialFeePda",
          docs: ["Platform identifier: 0=pump, 1=twitter, etc."],
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "version", type: "u8" },
              {
                name: "user_id",
                docs: [
                  "Max 20 characters to fit u64::MAX (18,446,744,073,709,551,615) as a string.",
                  "Actual storage: 4 bytes (length prefix) + 20 bytes (content) = 24 bytes.",
                ],
                type: "string",
              },
              { name: "platform", type: "u8" },
              { name: "total_claimed", type: "u64" },
              { name: "last_claimed", type: "u64" },
              { name: "total_stable_claimed", type: "u64" },
              { name: "_reserved", type: { array: ["u8", 120] } },
            ],
          },
        },
        {
          name: "SocialFeePdaClaimed",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "user_id", type: "string" },
              { name: "platform", type: "u8" },
              { name: "social_fee_pda", type: "pubkey" },
              { name: "recipient", type: "pubkey" },
              { name: "social_claim_authority", type: "pubkey" },
              { name: "amount_claimed", type: "u64" },
              { name: "claimable_before", type: "u64" },
              { name: "lifetime_claimed", type: "u64" },
              { name: "recipient_balance_before", type: "u64" },
              { name: "recipient_balance_after", type: "u64" },
              { name: "quote_mint", type: "pubkey" },
              { name: "lifetime_stable_claimed", type: "u64" },
            ],
          },
        },
        {
          name: "SocialFeePdaCreated",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "user_id", type: "string" },
              { name: "platform", type: "u8" },
              { name: "social_fee_pda", type: "pubkey" },
              { name: "created_by", type: "pubkey" },
            ],
          },
        },
        {
          name: "SweepBuybackEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "index", type: "u8" },
              { name: "sol_amount", type: "u64" },
              { name: "token_amount", type: "u64" },
              { name: "destination", type: "pubkey" },
              { name: "buyback_vault", type: "pubkey" },
              { name: "mint", type: "pubkey" },
            ],
          },
        },
        {
          name: "UpdateAdminEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "old_admin", type: "pubkey" },
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
              { name: "fee_config", type: "pubkey" },
              {
                name: "fee_tiers",
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              { name: "flat_fees", type: { defined: { name: "Fees" } } },
            ],
          },
        },
        {
          name: "UpdateFeeSharesEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "mint", type: "pubkey" },
              { name: "sharing_config", type: "pubkey" },
              { name: "admin", type: "pubkey" },
              {
                name: "new_shareholders",
                type: { vec: { defined: { name: "Shareholder" } } },
              },
              { name: "version", type: "u8" },
            ],
          },
        },
        {
          name: "UpdateStableFeeConfigEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "fee_config", type: "pubkey" },
              {
                name: "stable_fee_tiers",
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              { name: "flat_fees", type: { defined: { name: "Fees" } } },
            ],
          },
        },
        {
          name: "UpsertFeeTiersEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "fee_config", type: "pubkey" },
              {
                name: "fee_tiers",
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              { name: "offset", type: "u8" },
            ],
          },
        },
        {
          name: "UpsertStableFeeTiersEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "timestamp", type: "i64" },
              { name: "admin", type: "pubkey" },
              { name: "fee_config", type: "pubkey" },
              {
                name: "stable_fee_tiers",
                type: { vec: { defined: { name: "FeeTier" } } },
              },
              { name: "offset", type: "u8" },
            ],
          },
        },
      ],
      constants: [
        {
          name: "AMM_CREATOR_VAULT_AUTHORITY_SEED",
          type: { array: ["u8", 13] },
          value:
            "[99, 114, 101, 97, 116, 111, 114, 95, 118, 97, 117, 108, 116]",
        },
        {
          name: "BUYBACK_VAULT_SEED",
          type: { array: ["u8", 13] },
          value: "[98, 117, 121, 98, 97, 99, 107, 45, 118, 97, 117, 108, 116]",
        },
        {
          name: "DEBOUNCER_V1",
          type: "bytes",
          value: "[100, 101, 98, 111, 117, 110, 99, 101, 114, 95, 118, 49]",
        },
        {
          name: "DONATION_FEE_PDA_SEED",
          type: { array: ["u8", 16] },
          value:
            "[100, 111, 110, 97, 116, 105, 111, 110, 45, 102, 101, 101, 45, 112, 100, 97]",
        },
        {
          name: "EPOCH_TRACKER_V1",
          type: "bytes",
          value:
            "[101, 112, 111, 99, 104, 95, 116, 114, 97, 99, 107, 101, 114, 95, 118, 49]",
        },
        {
          name: "FEE_CONFIG_SEED",
          type: "bytes",
          value: "[102, 101, 101, 95, 99, 111, 110, 102, 105, 103]",
        },
        {
          name: "FEE_PROGRAM_GLOBAL_SEED",
          type: { array: ["u8", 18] },
          value:
            "[102, 101, 101, 45, 112, 114, 111, 103, 114, 97, 109, 45, 103, 108, 111, 98, 97, 108]",
        },
        {
          name: "IX_DONATE_PUBKEY_CONFIG_ID_WITH_PAYER_V1",
          type: { array: ["u8", 8] },
          value: "[120, 217, 57, 241, 135, 104, 139, 184]",
        },
        { name: "MAX_BUYBACK_INDEX", type: "u8", value: "8" },
        {
          name: "MINT_WHITELIST_V1",
          type: "bytes",
          value:
            "[109, 105, 110, 116, 95, 119, 104, 105, 116, 101, 108, 105, 115, 116, 95, 118, 49]",
        },
        {
          name: "PUMP_CREATOR_VAULT_SEED",
          type: { array: ["u8", 13] },
          value:
            "[99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]",
        },
        {
          name: "PUMP_GLOBAL_SEED",
          docs: ["Bonding Curve Program Global Seed"],
          type: { array: ["u8", 6] },
          value: "[103, 108, 111, 98, 97, 108]",
        },
        {
          name: "SHARING_CONFIG_SEED",
          type: { array: ["u8", 14] },
          value:
            "[115, 104, 97, 114, 105, 110, 103, 45, 99, 111, 110, 102, 105, 103]",
        },
        {
          name: "SOCIAL_FEE_PDA_SEED",
          type: { array: ["u8", 14] },
          value:
            "[115, 111, 99, 105, 97, 108, 45, 102, 101, 101, 45, 112, 100, 97]",
        },
      ],
    },
    eO = eZ(null);
  async function ez(e, t) {
    let n = Array.from({ length: Math.ceil(t.length / 100) }, (e, n) =>
      t.slice(100 * n, (n + 1) * 100),
    );
    return (
      await Promise.all(n.map((t) => e.getMultipleAccountsInfo(t)))
    ).flat();
  }
  function eG(e) {
    return e.equals(r.z) || e.equals(r.S);
  }
  function eW(e, t) {
    let { owner: n } = t;
    if (!eG(n))
      throw Error(
        `Quote mint ${e.toBase58()} is owned by ${n.toBase58()}, not by SPL Token or Token-2022`,
      );
    return n;
  }
  function eQ(e, t) {
    return null !== e && e.owner.equals(t);
  }
  function eK(e, t) {
    if (!e) throw Error(`Global account not found: ${to.toBase58()}`);
    let n = ta.decodeGlobal(e),
      a = t ? ta.decodeQuoteControl(t) : null,
      o = [
        {
          mint: r.w,
          source: "sol",
          initialVirtualQuoteReserves: n.initialVirtualSolReserves,
        },
        ...n.whitelistedQuoteMints
          .filter((e) => !tC(e))
          .map((e) => ({
            mint: e,
            source: "global",
            initialVirtualQuoteReserves: n.initialVirtualQuoteReserves,
          })),
      ];
    for (let e of a?.mints ?? [])
      o.some(({ mint: t }) => t.equals(e.mint)) ||
        o.push({
          mint: e.mint,
          source: "quoteControl",
          initialVirtualQuoteReserves: e.initialVirtualQuoteReserves,
        });
    return o;
  }
  function ej(e, t, n) {
    if (!eQ(t, n)) return new s.default(0);
    let { amount: a } = (0, m.V)(e, t, n);
    return new s.default(a.toString());
  }
  var eH = class {
    constructor(e) {
      ((this.connection = e),
        (this.pumpProgram = eZ(e)),
        (this.offlinePumpProgram = eO),
        (this.pumpAmmProgram = eJ(e)),
        (this.pumpAmmSdk = new X(e)),
        (this.pumpAmmAdminSdk = new Q(e)));
    }
    async fetchGlobal() {
      let e = await this.connection.getAccountInfo(to);
      if (!e) throw Error(`Global account not found: ${to.toBase58()}`);
      return ta.decodeGlobal(e);
    }
    async fetchFeeConfig() {
      let e = await this.connection.getAccountInfo(ti);
      if (!e) throw Error(`Fee config account not found: ${ti.toBase58()}`);
      return ta.decodeFeeConfig(e);
    }
    async fetchQuoteControl() {
      return await this.pumpProgram.account.quoteControl.fetchNullable(tr);
    }
    async fetchQuoteTokenProgram(e) {
      if (tC(e)) return r.z;
      let t = await this.connection.getAccountInfo(e);
      if (!t) throw Error(`Quote mint account not found: ${e.toBase58()}`);
      return eW(e, t);
    }
    async fetchSupportedQuoteMints() {
      let [e, t] = await this.connection.getMultipleAccountsInfo([to, tr]);
      return eK(e, t);
    }
    async resolveQuoteMint(e = r.w) {
      let t = tP(e),
        [n, a, o] = await this.connection.getMultipleAccountsInfo([to, tr, t]),
        i = eK(n, a).find((e) => e.mint.equals(t));
      if (!i) throw new eB(t);
      if (!o) throw Error(`Quote mint account not found: ${t.toBase58()}`);
      let s = eW(t, o),
        { decimals: c } = (0, u.g)(t, o, s);
      return { ...i, quoteTokenProgram: s, decimals: c };
    }
    async fetchBondingCurve(e) {
      let t = tl(e),
        n = await this.connection.getAccountInfo(t);
      if (!n) throw Error(`Bonding curve account not found: ${t.toBase58()}`);
      return ta.decodeBondingCurve(n);
    }
    async fetchBuyState(e, t, n = r.z, a) {
      let o = this.quoteMintHint(a),
        [i, s, c] = await this.connection.getMultipleAccountsInfo([
          tl(e),
          (0, u.h)(e, t, !0, n),
          ...(o ? [o] : []),
        ]);
      if (!i)
        throw Error(
          `Bonding curve account not found for mint: ${e.toBase58()}`,
        );
      let m = ta.decodeBondingCurve(i),
        l = await this.curveQuote(m, o, c);
      return {
        bondingCurveAccountInfo: i,
        bondingCurve: m,
        associatedUserAccountInfo: s,
        ...l,
      };
    }
    async fetchSellState(e, t, n = r.z, a) {
      let o = this.quoteMintHint(a),
        [i, s, c] = await this.connection.getMultipleAccountsInfo([
          tl(e),
          (0, u.h)(e, t, !0, n),
          ...(o ? [o] : []),
        ]);
      if (!i)
        throw Error(
          `Bonding curve account not found for mint: ${e.toBase58()}`,
        );
      if (!s)
        throw Error(
          `Associated token account not found for mint: ${e.toBase58()} and user: ${t.toBase58()}`,
        );
      let m = ta.decodeBondingCurve(i),
        l = await this.curveQuote(m, o, c);
      return { bondingCurveAccountInfo: i, bondingCurve: m, ...l };
    }
    quoteMintHint(e) {
      return e && !tC(e) ? e : null;
    }
    async curveQuote(e, t, n) {
      let a = tP(e.quoteMint);
      return a.equals(r.w)
        ? { quoteMint: a, quoteTokenProgram: r.z }
        : t?.equals(a) && n
          ? { quoteMint: a, quoteTokenProgram: eW(a, n) }
          : {
              quoteMint: a,
              quoteTokenProgram: await this.fetchQuoteTokenProgram(a),
            };
    }
    async fetchGlobalVolumeAccumulator() {
      return await this.pumpProgram.account.globalVolumeAccumulator.fetch(ts);
    }
    async fetchUserVolumeAccumulator(e) {
      return await this.pumpProgram.account.userVolumeAccumulator.fetchNullable(
        tg(e),
      );
    }
    async fetchUserVolumeAccumulatorTotalStats(e) {
      let t = (await this.fetchUserVolumeAccumulator(e)) ?? {
          totalUnclaimedTokens: new s.default(0),
          totalClaimedTokens: new s.default(0),
          currentSolVolume: new s.default(0),
        },
        n = (await this.pumpAmmSdk.fetchUserVolumeAccumulator(e)) ?? {
          totalUnclaimedTokens: new s.default(0),
          totalClaimedTokens: new s.default(0),
          currentSolVolume: new s.default(0),
        };
      return {
        totalUnclaimedTokens: t.totalUnclaimedTokens.add(
          n.totalUnclaimedTokens,
        ),
        totalClaimedTokens: t.totalClaimedTokens.add(n.totalClaimedTokens),
        currentSolVolume: t.currentSolVolume.add(n.currentSolVolume),
      };
    }
    async collectCoinCreatorFeeInstructions(e, t) {
      let n = r.w,
        a = r.z,
        o = N(e),
        i = L(o, n, a),
        s = (0, u.h)(n, e, !0, a),
        [c, m] = await this.connection.getMultipleAccountsInfo([i, s]);
      return [
        await this.offlinePumpProgram.methods
          .collectCreatorFee()
          .accountsPartial({ creator: e })
          .instruction(),
        ...(await J.collectCoinCreatorFee(
          {
            coinCreator: e,
            quoteMint: n,
            quoteTokenProgram: a,
            coinCreatorVaultAuthority: o,
            coinCreatorVaultAta: i,
            coinCreatorTokenAccount: s,
            coinCreatorVaultAtaAccountInfo: c,
            coinCreatorTokenAccountInfo: m,
          },
          t,
        )),
      ];
    }
    async collectCoinCreatorFeeV2Instructions(e, t, n, a) {
      let o = N(e),
        r = L(o, t, n),
        i = (0, u.h)(t, e, !0, n),
        [s, c] = await this.connection.getMultipleAccountsInfo([r, i]),
        m = s
          ? await J.collectCoinCreatorFee(
              {
                coinCreator: e,
                quoteMint: t,
                quoteTokenProgram: n,
                coinCreatorVaultAuthority: o,
                coinCreatorVaultAta: r,
                coinCreatorTokenAccount: i,
                coinCreatorVaultAtaAccountInfo: s,
                coinCreatorTokenAccountInfo: c,
              },
              a,
            )
          : [];
      return [
        await this.offlinePumpProgram.methods
          .collectCreatorFeeV2()
          .accountsPartial({
            creator: e,
            quoteMint: t,
            quoteTokenProgram: n,
            creatorVault: tp(e),
          })
          .instruction(),
        ...m,
      ];
    }
    async collectCoinCreatorFeeAllQuotesInstructions(e, t, n = []) {
      let a = t ?? e,
        o = await this.fetchSupportedQuoteMints(),
        i = n
          .map((e) => tP(e))
          .reduce(
            (e, t) => (e.some((e) => e.equals(t)) ? e : [...e, t]),
            o.map(({ mint: e }) => e),
          ),
        s = await this.fetchQuoteMintPrograms(i),
        c = N(e),
        m = tp(e),
        d = s.map(({ mint: t, quoteTokenProgram: n }) => ({
          pumpVaultAta: tB(m, t, n),
          ammVaultAta: L(c, t, n),
          creatorAta: (0, u.h)(t, e, !0, n),
        })),
        p = await ez(
          this.connection,
          d.flatMap(({ pumpVaultAta: e, ammVaultAta: t, creatorAta: n }) => [
            e,
            t,
            n,
          ]),
        ),
        _ = [];
      for (let [n, { mint: o, quoteTokenProgram: i }] of s.entries()) {
        let { ammVaultAta: s, creatorAta: u } = d[n],
          [y, f, b] = p.slice(3 * n, 3 * n + 3),
          g = o.equals(r.w),
          h = g || eQ(y, i),
          k = eQ(f, i);
        (h || k) &&
          (g || eQ(b, i) || _.push((0, l.f)(a, u, e, o, i)),
          h &&
            _.push(
              g
                ? await this.offlinePumpProgram.methods
                    .collectCreatorFee()
                    .accountsPartial({ creator: e })
                    .instruction()
                : await this.offlinePumpProgram.methods
                    .collectCreatorFeeV2()
                    .accountsPartial({
                      creator: e,
                      quoteMint: o,
                      quoteTokenProgram: i,
                      creatorVault: m,
                    })
                    .instruction(),
            ),
          k &&
            _.push(
              ...(await J.collectCoinCreatorFee(
                {
                  coinCreator: e,
                  quoteMint: o,
                  quoteTokenProgram: i,
                  coinCreatorVaultAuthority: c,
                  coinCreatorVaultAta: s,
                  coinCreatorTokenAccount: u,
                  coinCreatorVaultAtaAccountInfo: f,
                  coinCreatorTokenAccountInfo: b,
                },
                t,
              )),
            ));
      }
      return _;
    }
    async getCreatorVaultQuoteBalances(e) {
      let t = await this.fetchSupportedQuoteMintPrograms(),
        n = N(e),
        a = tp(e),
        o = t.map(({ mint: e, quoteTokenProgram: t }) => ({
          pumpVaultAta: tB(a, e, t),
          ammVaultAta: L(n, e, t),
        })),
        [i, ...s] = await ez(this.connection, [
          a,
          ...o.flatMap(({ pumpVaultAta: e, ammVaultAta: t }) => [e, t]),
        ]),
        u = await this.creatorVaultLamportsAboveRent(i);
      return t.map(({ mint: e, source: t, quoteTokenProgram: n }, a) => {
        let { pumpVaultAta: i, ammVaultAta: c } = o[a],
          [m, l] = s.slice(2 * a, 2 * a + 2),
          d = e.equals(r.w) ? u : ej(i, m, n),
          p = ej(c, l, n);
        return {
          mint: e,
          source: t,
          quoteTokenProgram: n,
          pumpVault: d,
          ammVault: p,
          total: d.add(p),
        };
      });
    }
    async fetchSupportedQuoteMintPrograms() {
      let e = await this.fetchSupportedQuoteMints();
      return (await this.fetchQuoteMintPrograms(e.map(({ mint: e }) => e))).map(
        ({ mint: t, quoteTokenProgram: n }) => ({
          ...e.find((e) => e.mint.equals(t)),
          quoteTokenProgram: n,
        }),
      );
    }
    async fetchQuoteMintPrograms(e) {
      let t = e.filter((e) => !e.equals(r.w)),
        n = await ez(this.connection, t),
        a = new Map(
          t.flatMap((e, t) => {
            let a = n[t]?.owner;
            return a && eG(a) ? [[e.toBase58(), a]] : [];
          }),
        );
      return e.flatMap((e) => {
        if (e.equals(r.w)) return [{ mint: e, quoteTokenProgram: r.z }];
        let t = a.get(e.toBase58());
        return t ? [{ mint: e, quoteTokenProgram: t }] : [];
      });
    }
    async creatorVaultLamportsAboveRent(e) {
      if (null === e) return new s.default(0);
      let t = await this.connection.getMinimumBalanceForRentExemption(
        e.data.length,
      );
      return new s.default(e.lamports < t ? 0 : e.lamports - t);
    }
    async adminSetCoinCreatorInstructions(e, t, n = r.w) {
      n = tP(n);
      let [a, o] = await Promise.all([
        this.fetchGlobal(),
        this.pumpAmmAdminSdk.fetchGlobalConfigAccount(),
      ]);
      return [
        await this.offlinePumpProgram.methods
          .adminSetCreator(e)
          .accountsPartial({
            adminSetCreatorAuthority: a.adminSetCreatorAuthority,
            mint: t,
          })
          .instruction(),
        await this.pumpAmmProgram.methods
          .adminSetCoinCreator(e)
          .accountsPartial({
            adminSetCoinCreatorAuthority: o.adminSetCoinCreatorAuthority,
            globalConfig: M,
            pool: tf(t, n),
          })
          .instruction(),
      ];
    }
    async adminSetQuoteControlAdminInstruction({ newAdmin: e, authority: t }) {
      return await ta.setQuoteControlAdminInstruction({
        authority: t ?? (await this.fetchGlobal()).authority,
        newAdmin: e,
      });
    }
    async adminAddQuoteControlMintInstruction({
      quoteMint: e,
      initialVirtualQuoteReserves: t,
      authority: n,
    }) {
      return await ta.addQuoteControlMintInstruction({
        authority: n ?? (await this.fetchGlobal()).authority,
        quoteMint: e,
        initialVirtualQuoteReserves: t,
      });
    }
    async adminRemoveQuoteControlMintInstruction({
      quoteMint: e,
      authority: t,
    }) {
      return await ta.removeQuoteControlMintInstruction({
        authority: t ?? (await this.fetchGlobal()).authority,
        quoteMint: e,
      });
    }
    async adminUpdateCreatorFeeConfigInstruction({
      creatorFeeConfigurable: e,
      maxConfigurableCreatorFeeBps: t,
      authority: n,
    }) {
      return await ta.updateCreatorFeeConfigInstruction({
        authority: n ?? (await this.fetchGlobal()).authority,
        creatorFeeConfigurable: e,
        maxConfigurableCreatorFeeBps: t,
      });
    }
    async adminSetCreatorFeeEditableInstructions(e, t) {
      return [
        await ta.adminSetCreatorFeeEditableInstruction({
          adminSetCreatorAuthority:
            t ?? (await this.fetchGlobal()).adminSetCreatorAuthority,
          mint: e,
        }),
      ];
    }
    async setCreatorFeeBpsInstructions(e, t, n) {
      let [a, o] = await this.connection.getMultipleAccountsInfo([to, tl(t)]);
      if (!a) throw Error(`Global account not found: ${to.toBase58()}`);
      if (!o)
        throw Error(
          `Bonding curve account not found for mint: ${t.toBase58()}`,
        );
      let r = ta.decodeGlobal(a),
        i = ta.decodeBondingCurve(o);
      if (!r.creatorFeeConfigurable) throw new eS();
      if (i.isCashbackCoin) throw new eT(t);
      if (n.ltn(1) || n.gt(r.maxConfigurableCreatorFeeBps))
        throw new eE(n, r.maxConfigurableCreatorFeeBps);
      let s = tA(t);
      return [
        await ta.setCreatorFeeBpsInstruction({
          creator: e,
          mint: t,
          creatorFeeBps: n,
          sharingConfig: i.creator.equals(s) ? s : void 0,
        }),
      ];
    }
    async adminSetExoticFlatFeesInstruction({ exoticFlatFees: e, admin: t }) {
      return await ta.setExoticFlatFeesInstruction({
        admin: t ?? (await this.fetchFeeConfig()).admin,
        exoticFlatFees: e,
      });
    }
    async getCreatorVaultBalance(e) {
      let t = tp(e),
        n = await this.connection.getAccountInfo(t);
      return await this.creatorVaultLamportsAboveRent(n);
    }
    async getCreatorVaultBalanceBothPrograms(e) {
      let t = await this.getCreatorVaultBalance(e),
        n = await this.pumpAmmSdk.getCoinCreatorVaultBalance(e);
      return t.add(n);
    }
    async adminUpdateTokenIncentives(
      e,
      t,
      n,
      a,
      o = new s.default(86400),
      i = e8,
      u = r.S,
    ) {
      let { authority: c } = await this.fetchGlobal();
      return await this.offlinePumpProgram.methods
        .adminUpdateTokenIncentives(e, t, o, n, a)
        .accountsPartial({ authority: c, mint: i, tokenProgram: u })
        .instruction();
    }
    async adminUpdateTokenIncentivesBothPrograms(
      e,
      t,
      n,
      a,
      o = new s.default(86400),
      i = e8,
      u = r.S,
    ) {
      return [
        await this.adminUpdateTokenIncentives(e, t, n, a, o, i, u),
        await this.pumpAmmAdminSdk.adminUpdateTokenIncentives(
          e,
          t,
          n,
          a,
          o,
          i,
          u,
        ),
      ];
    }
    async claimTokenIncentives(e, t) {
      let { mint: n } = await this.fetchGlobalVolumeAccumulator();
      if (n.equals(i.PublicKey.default)) return [];
      let [a, o] = await this.connection.getMultipleAccountsInfo([n, tg(e)]);
      return a && o
        ? [
            await this.offlinePumpProgram.methods
              .claimTokenIncentives()
              .accountsPartial({
                user: e,
                payer: t,
                mint: n,
                tokenProgram: a.owner,
              })
              .instruction(),
          ]
        : [];
    }
    async claimTokenIncentivesBothPrograms(e, t) {
      return [
        ...(await this.claimTokenIncentives(e, t)),
        ...(await this.pumpAmmSdk.claimTokenIncentives(e, t)),
      ];
    }
    async getTotalUnclaimedTokens(e) {
      let [t, n] = await this.connection.getMultipleAccountsInfo([ts, tg(e)]);
      return t && n
        ? (function (e, t, n = Date.now() / 1e3) {
            let {
                startTime: a,
                endTime: o,
                secondsInADay: r,
                totalTokenSupply: i,
                solVolumes: u,
              } = e,
              {
                totalUnclaimedTokens: c,
                currentSolVolume: m,
                lastUpdateTimestamp: l,
              } = t;
            if (a.eqn(0) || o.eqn(0) || r.eqn(0)) return c;
            let d = new s.default(n);
            if (d.lt(a)) return c;
            let p = d.sub(a).div(r).toNumber();
            if (l.lt(a)) return c;
            let _ = l.sub(a).div(r).toNumber();
            if (o.lt(a)) return c;
            let y = o.sub(a).div(r).toNumber();
            if (p > _ && _ <= y) {
              let e = i[_],
                t = u[_];
              return t.eqn(0) ? c : c.add(m.mul(e).div(t));
            }
            return c;
          })(
            ta.decodeGlobalVolumeAccumulator(t),
            ta.decodeUserVolumeAccumulator(n),
          )
        : new s.default(0);
    }
    async getTotalUnclaimedTokensBothPrograms(e) {
      return (await this.getTotalUnclaimedTokens(e)).add(
        await this.pumpAmmSdk.getTotalUnclaimedTokens(e),
      );
    }
    async getCurrentDayTokens(e) {
      let [t, n] = await this.connection.getMultipleAccountsInfo([ts, tg(e)]);
      return t && n
        ? (function (e, t, n = Date.now() / 1e3) {
            let {
                startTime: a,
                endTime: o,
                secondsInADay: r,
                totalTokenSupply: i,
                solVolumes: u,
              } = e,
              { currentSolVolume: c, lastUpdateTimestamp: m } = t;
            if (a.eqn(0) || o.eqn(0) || r.eqn(0)) return new s.default(0);
            let l = new s.default(n);
            if (l.lt(a) || l.gt(o)) return new s.default(0);
            let d = l.sub(a).div(r).toNumber();
            if (m.lt(a)) return new s.default(0);
            let p = m.sub(a).div(r).toNumber();
            if (o.lt(a) || d !== p) return new s.default(0);
            let _ = i[d],
              y = u[d];
            return y.eqn(0) ? new s.default(0) : c.mul(_).div(y);
          })(
            ta.decodeGlobalVolumeAccumulator(t),
            ta.decodeUserVolumeAccumulator(n),
          )
        : new s.default(0);
    }
    async getCurrentDayTokensBothPrograms(e) {
      return (await this.getCurrentDayTokens(e)).add(
        await this.pumpAmmSdk.getCurrentDayTokens(e),
      );
    }
    async syncUserVolumeAccumulatorBothPrograms(e) {
      return [
        await ta.syncUserVolumeAccumulator(e),
        await J.syncUserVolumeAccumulator(e),
      ];
    }
    async getMinimumDistributableFee(
      e,
      t = new i.PublicKey("UqN2p5bAzBqYdHXcgB6WLtuVrdvmy9JSAtgqZb3CMKw"),
      n = {},
    ) {
      let a = tP(n.quoteMint),
        u = a.equals(r.w),
        c =
          n.quoteTokenProgram ??
          (u ? r.z : await this.fetchQuoteTokenProgram(a)),
        m = n.payer ?? t,
        l = tA(e),
        d = tf(e, a),
        p = L(N(l), a, c),
        [_, y, f] = await this.connection.getMultipleAccountsInfo([l, d, p]);
      if (!_) throw Error(`Sharing config not found for mint: ${e.toBase58()}`);
      let b = ta.decodeSharingConfig(_),
        g = [],
        h = null !== y;
      if (h && f) {
        let t = u
          ? await this.pumpAmmProgram.methods
              .transferCreatorFeesToPump()
              .accountsPartial({
                wsolMint: r.w,
                tokenProgram: r.z,
                coinCreator: l,
              })
              .instruction()
          : await ta.transferCreatorFeesToPumpV2({
              payer: m,
              mint: e,
              quoteMint: a,
              quoteTokenProgram: c,
            });
        g.push(t);
      }
      let k = await ta.getMinimumDistributableFee({
        mint: e,
        sharingConfig: b,
        sharingConfigAddress: l,
      });
      g.push(k);
      let { blockhash: v } = await this.connection.getLatestBlockhash(),
        w = new i.VersionedTransaction(
          new i.TransactionMessage({
            payerKey: t,
            recentBlockhash: v,
            instructions: g,
          }).compileToV0Message(),
        ),
        A = await this.connection.simulateTransaction(w),
        C = {
          minimumRequired: new s.default(0),
          distributableFees: new s.default(0),
          canDistribute: !1,
        };
      if (!A.value.err) {
        let [e, t] = A.value.returnData?.data ?? [];
        if (e) {
          let n = o.Buffer.from(e, t);
          C = ta.decodeMinimumDistributableFee(n);
        }
      }
      return { ...C, isGraduated: h, feesQuoteMint: r.w };
    }
    async buildDistributeCreatorFeesInstructions(e, t = {}) {
      let { payer: n } = t,
        a = tP(t.quoteMint ?? r.w),
        o = a.equals(r.w);
      if (!o && !n)
        throw Error(
          "payer is required when quoteMint is not NATIVE_MINT (V2 instructions may initialize ATAs)",
        );
      let i =
          t.quoteTokenProgram ??
          (o ? r.z : await this.fetchQuoteTokenProgram(a)),
        s = tA(e),
        u = tf(e, a),
        c = L(N(s), a, i),
        [m, l, d] = await this.connection.getMultipleAccountsInfo([s, u, c]);
      if (!m) throw Error(`Sharing config not found for mint: ${e.toBase58()}`);
      let p = ta.decodeSharingConfig(m),
        _ = [],
        y = null !== l;
      if (y && d) {
        let t = o
          ? await this.pumpAmmProgram.methods
              .transferCreatorFeesToPump()
              .accountsPartial({
                wsolMint: r.w,
                tokenProgram: r.z,
                coinCreator: s,
              })
              .instruction()
          : await ta.transferCreatorFeesToPumpV2({
              payer: n,
              mint: e,
              quoteMint: a,
              quoteTokenProgram: i,
            });
        _.push(t);
      }
      let f = o
        ? await ta.distributeCreatorFees({
            mint: e,
            sharingConfig: p,
            sharingConfigAddress: s,
          })
        : await ta.distributeCreatorFeesV2({
            mint: e,
            sharingConfig: p,
            sharingConfigAddress: s,
            quoteMint: a,
            payer: n,
            shouldInitializeAta: !0,
            quoteTokenProgram: i,
          });
      return (_.push(f), { instructions: _, isGraduated: y });
    }
  };
  function eZ(e) {
    return new c.v(ek, new c.F(e, null, {}));
  }
  var e$ = new i.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
  function eJ(e) {
    return new c.v(eL, new c.F(e, null, {}));
  }
  var eX = new i.PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"),
    eY = new i.PublicKey("MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"),
    e1 = new i.PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ");
  function e0(e, t) {
    return e.length >= t
      ? e
      : o.Buffer.concat([e, o.Buffer.alloc(t - e.length)]);
  }
  var e2 = [0, 1, 9],
    e4 = [0, 9];
  function e6(e, t) {
    let n = e.readUInt32LE(t),
      a = t + 4 + 40 * n;
    if (n > 50 || a > e.length)
      throw Error(
        `Invalid FeeConfig account: ${n} fee tiers declared at offset ${t} in ${e.length} bytes`,
      );
    return a;
  }
  function e9(e, t, n) {
    let a;
    for (let r of t)
      try {
        return n(o.Buffer.concat([e, o.Buffer.alloc(r)]));
      } catch (e) {
        if ("object" != typeof e || null === e || "RangeError" !== e.name)
          throw e;
        a = e;
      }
    throw a;
  }
  function e5({ global: e, mint: t, cashback: n, creatorFeeBps: a }) {
    if (!(!a || a.isZero())) {
      if (!e.creatorFeeConfigurable) throw new eS();
      if (n) throw new eT(t);
      if (a.ltn(1) || a.gt(e.maxConfigurableCreatorFeeBps))
        throw new eE(a, e.maxConfigurableCreatorFeeBps);
    }
  }
  var e8 = new i.PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn");
  function e3(e, t, n, a) {
    let o = t + 2;
    if (e.keys.length !== o)
      throw Error(
        `migrate: expected ${o} accounts (${t} fixed + 2 boost), got ${e.keys.length}`,
      );
    if (!e.keys[t].pubkey.equals(n))
      throw Error(`migrate: boost_vault_authority expected at index ${t}`);
    if (!e.keys[t + 1].pubkey.equals(a))
      throw Error(`migrate: boost_vault expected at index ${t + 1}`);
  }
  var e7 = { auto: { auto: {} }, manual: { manual: {} }, climb: { climb: {} } };
  function te({ mint: e, quoteMint: t, quoteTokenProgram: n }) {
    return [
      { pubkey: t, isWritable: !1, isSigner: !1 },
      { pubkey: tB(tl(e), t, n), isWritable: !0, isSigner: !1 },
      { pubkey: n, isWritable: !1, isSigner: !1 },
      { pubkey: tr, isWritable: !1, isSigner: !1 },
    ];
  }
  function tt(e, t) {
    return e && !tC(e)
      ? { buyQuoteMint: e, buyQuoteTokenProgram: t }
      : { buyQuoteMint: r.w, buyQuoteTokenProgram: r.z };
  }
  var tn = Object.freeze([
      { mint: r.w, tokenProgram: r.z },
      {
        mint: new i.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        tokenProgram: r.z,
      },
      {
        mint: new i.PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
        tokenProgram: r.z,
      },
    ]),
    ta = new (class {
      constructor() {
        ((this.offlinePumpProgram = eO),
          (this.offlinePumpFeeProgram = new c.v(eD, new c.F(null, null, {}))),
          (this.offlinePumpAmmProgram = new c.v(eL, new c.F(null, null, {}))));
      }
      decodeGlobal(e) {
        return this.offlinePumpProgram.coder.accounts.decode(
          "global",
          e0(e.data, 1054),
        );
      }
      decodeFeeConfig(e) {
        let t,
          { data: n } = e;
        if (n.length < 2512)
          throw Error(
            `Invalid FeeConfig account: ${n.length} bytes, expected at least 2512`,
          );
        let a = e6(n, 65);
        if (n.length < 4073) t = a;
        else {
          let e = e6(n, a);
          t = n.length < 4097 ? e : e + 24;
        }
        return this.offlinePumpProgram.coder.accounts.decode(
          "feeConfig",
          o.Buffer.concat([n.subarray(0, t), o.Buffer.alloc(28)]),
        );
      }
      decodeBondingCurve(e) {
        let { data: t } = e;
        if (t.length < 49)
          throw Error(
            `Invalid BondingCurve account: ${t.length} bytes, expected at least 49`,
          );
        return this.offlinePumpProgram.coder.accounts.decode(
          "bondingCurve",
          e0(t, 124),
        );
      }
      getCoinCreatorVaultQuoteMint(e, t, n = tn) {
        let a = tS(e);
        for (let { mint: e, tokenProgram: o } of n)
          if ((0, u.h)(e, a, !0, o).equals(t)) return e;
        return null;
      }
      decodeBondingCurveNullable(e) {
        try {
          return this.decodeBondingCurve(e);
        } catch (e) {
          return (console.warn("Failed to decode bonding curve", e), null);
        }
      }
      decodeQuoteControl(e) {
        let { data: t } = e;
        if (t.length < 108)
          throw Error(
            `Invalid QuoteControl account: ${t.length} bytes, expected at least 108`,
          );
        let n = t.readUInt32LE(104);
        if (108 + 40 * n > t.length)
          throw Error(
            `Invalid QuoteControl account: ${n} entries declared in ${t.length} bytes`,
          );
        return this.offlinePumpProgram.coder.accounts.decode("quoteControl", t);
      }
      decodeQuoteControlNullable(e) {
        if (!e) return null;
        try {
          return this.decodeQuoteControl(e);
        } catch (e) {
          return (console.warn("Failed to decode quote control", e), null);
        }
      }
      decodeGlobalVolumeAccumulator(e) {
        return this.offlinePumpProgram.coder.accounts.decode(
          "globalVolumeAccumulator",
          e.data,
        );
      }
      decodeUserVolumeAccumulator(e) {
        return this.offlinePumpProgram.coder.accounts.decode(
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
      decodeSharingConfig(e) {
        return this.offlinePumpFeeProgram.coder.accounts.decode(
          "sharingConfig",
          e.data,
        );
      }
      decodeSocialFeePda(e) {
        return this.offlinePumpFeeProgram.coder.accounts.decode(
          "socialFeePda",
          e.data,
        );
      }
      decodeSocialFeePdaClaimedEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "socialFeePdaClaimed",
          e,
        );
      }
      decodeSocialFeePdaCreatedEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "socialFeePdaCreated",
          e,
        );
      }
      decodeCreateFeeSharingConfigEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "createFeeSharingConfigEvent",
          e,
        );
      }
      decodeUpdateFeeSharesEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "updateFeeSharesEvent",
          e,
        );
      }
      decodeUpdateAdminEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "updateAdminEvent",
          e,
        );
      }
      decodeSetAuthorityEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "setAuthorityEvent",
          e,
        );
      }
      decodeResetFeeSharingConfigEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "resetFeeSharingConfigEvent",
          e,
        );
      }
      decodeDonationFeePdaCreatedEvent(e) {
        return this.offlinePumpFeeProgram.coder.types.decode(
          "donationFeePdaCreated",
          e,
        );
      }
      decodeCollectCreatorFeeEventBc(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "collectCreatorFeeEvent",
          e,
        );
      }
      decodeCollectCoinCreatorFeeEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode(
          "collectCoinCreatorFeeEvent",
          e,
        );
      }
      decodeCreatePoolEventAmm(e) {
        return e9(e, e4, (e) =>
          this.offlinePumpAmmProgram.coder.types.decode("createPoolEvent", e),
        );
      }
      decodeDepositEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode("depositEvent", e);
      }
      decodeWithdrawEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode(
          "withdrawEvent",
          e,
        );
      }
      decodeBuyEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode("buyEvent", e);
      }
      decodeSellEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode("sellEvent", e);
      }
      decodeAdminSetCoinCreatorEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode(
          "adminSetCoinCreatorEvent",
          e,
        );
      }
      decodeCreateEventBc(e) {
        return e9(e, e2, (e) =>
          this.offlinePumpProgram.coder.types.decode("createEvent", e),
        );
      }
      decodeTradeEventBc(e) {
        return this.offlinePumpProgram.coder.types.decode("tradeEvent", e);
      }
      decodeCompleteEventBc(e) {
        return this.offlinePumpProgram.coder.types.decode("completeEvent", e);
      }
      decodeAdminSetCreatorEventBc(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "adminSetCreatorEvent",
          e,
        );
      }
      decodeSetQuoteControlAdminEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "setQuoteControlAdminEvent",
          e,
        );
      }
      decodeAddQuoteControlMintEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "addQuoteControlMintEvent",
          e,
        );
      }
      decodeRemoveQuoteControlMintEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "removeQuoteControlMintEvent",
          e,
        );
      }
      decodeUpdateCreatorFeeConfigEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "updateCreatorFeeConfigEvent",
          e,
        );
      }
      decodeSetCreatorFeeBpsEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "setCreatorFeeBpsEvent",
          e,
        );
      }
      decodeAdminSetCreatorFeeEditableEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "adminSetCreatorFeeEditableEvent",
          e,
        );
      }
      decodeClaimCashbackEventBc(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "claimCashbackEvent",
          e,
        );
      }
      decodeClaimCashbackEventAmm(e) {
        return this.offlinePumpAmmProgram.coder.types.decode(
          "claimCashbackEvent",
          e,
        );
      }
      decodeDonationFeePda(e) {
        return this.offlinePumpFeeProgram.coder.accounts.decode(
          "donationFeePda",
          e.data,
        );
      }
      async createInstruction({
        mint: e,
        name: t,
        symbol: n,
        uri: a,
        creator: o,
        user: i,
      }) {
        return await this.offlinePumpProgram.methods
          .create(t, n, a, o)
          .accountsPartial({ mint: e, user: i, tokenProgram: r.z })
          .instruction();
      }
      async createV2Instruction({
        mint: e,
        name: t,
        symbol: n,
        uri: a,
        creator: o,
        user: i,
        mayhemMode: u,
        cashback: c = !1,
        quoteMint: m,
        quoteTokenProgram: l = r.z,
        creatorFeeBps: d,
      }) {
        let p = this.offlinePumpProgram.methods
          .createV2(t, n, a, o, u, [c ?? !1], [new s.default(d ?? 0)])
          .accountsPartial({
            mint: e,
            user: i,
            tokenProgram: r.S,
            mayhemProgramId: eY,
            globalParams: th(),
            solVault: tv(),
            mayhemState: tk(e),
            mayhemTokenVault: tw(e),
          });
        return m && !tC(m)
          ? await p
              .remainingAccounts(
                te({ mint: e, quoteMint: m, quoteTokenProgram: l }),
              )
              .instruction()
          : await p.instruction();
      }
      async createV3Instruction({
        mint: e,
        name: t,
        symbol: n,
        uri: a,
        creator: o,
        user: i,
        mayhemMode: s,
        gameMode: u,
        cashback: c = !1,
        quoteMint: m,
        quoteTokenProgram: l = r.z,
      }) {
        let d = e7[u];
        if (!d)
          throw Error(
            `Invalid gameMode "${u}" — expected "auto", "manual" or "climb"`,
          );
        let p = this.offlinePumpProgram.methods
          .createV3(t, n, a, o, s, c ?? !1, d)
          .accountsPartial({
            mint: e,
            user: i,
            tokenProgram: r.S,
            mayhemProgramId: s ? eY : null,
            globalParams: s ? th() : null,
            solVault: s ? tv() : null,
            mayhemState: s ? tk(e) : null,
            mayhemTokenVault: s ? tw(e) : null,
          });
        return m && !tC(m)
          ? await p
              .remainingAccounts(
                te({ mint: e, quoteMint: m, quoteTokenProgram: l }),
              )
              .instruction()
          : await p.instruction();
      }
      async buyInstructions({
        global: e,
        bondingCurveAccountInfo: t,
        bondingCurve: n,
        associatedUserAccountInfo: a,
        mint: o,
        user: i,
        amount: s,
        solAmount: c,
        slippage: m,
        tokenProgram: d = r.z,
      }) {
        let p = [],
          _ = (0, u.h)(o, i, !0, d);
        return (
          a || p.push((0, l.f)(i, _, i, o, d)),
          p.push(
            await this.buyInstruction({
              global: e,
              mint: o,
              creator: n.creator,
              user: i,
              associatedUser: _,
              amount: s,
              solAmount: c,
              slippage: m,
              tokenProgram: d,
              mayhemMode: n.isMayhemMode,
            }),
          ),
          p
        );
      }
      async createV2AndBuyInstructions({
        global: e,
        mint: t,
        name: n,
        symbol: a,
        uri: o,
        creator: i,
        user: s,
        amount: c,
        solAmount: m,
        mayhemMode: d,
        cashback: p,
        isTokenizedAgent: _ = !1,
        buyBackBps: y = 0,
        creatorFeeBps: f,
      }) {
        e5({ global: e, mint: t, cashback: p, creatorFeeBps: f });
        let b = (0, u.h)(t, s, !0, r.S),
          g = await this.buyInstruction({
            global: e,
            mint: t,
            creator: i,
            user: s,
            associatedUser: b,
            amount: c,
            solAmount: m,
            slippage: 1,
            tokenProgram: r.S,
            mayhemMode: d,
          }),
          h = [
            await this.createV2Instruction({
              mint: t,
              name: n,
              symbol: a,
              uri: o,
              creator: i,
              user: s,
              mayhemMode: d,
              cashback: p,
              creatorFeeBps: f,
            }),
            (0, l.f)(s, b, s, t, r.S),
            g,
          ];
        if (_) {
          let e = eh.load(t),
            n = await e.create({
              authority: i,
              mint: t,
              agentAuthority: i,
              buybackBps: y,
            });
          h.push(n);
        }
        return h;
      }
      async createAndBuyInstructions({
        global: e,
        mint: t,
        name: n,
        symbol: a,
        uri: o,
        creator: i,
        user: s,
        amount: c,
        solAmount: m,
        isTokenizedAgent: d = !1,
        buyBackBps: p = 0,
      }) {
        let _ = (0, u.h)(t, s, !0),
          y = await this.buyInstruction({
            global: e,
            mint: t,
            creator: i,
            user: s,
            associatedUser: _,
            amount: c,
            solAmount: m,
            slippage: 1,
            tokenProgram: r.z,
            mayhemMode: !1,
          }),
          f = [
            await this.createInstruction({
              mint: t,
              name: n,
              symbol: a,
              uri: o,
              creator: i,
              user: s,
            }),
            (0, l.f)(s, _, s, t),
            y,
          ];
        if (d) {
          let e = eh.load(t),
            n = await e.create({
              authority: i,
              mint: t,
              agentAuthority: i,
              buybackBps: p,
            });
          f.push(n);
        }
        return f;
      }
      async buyInstruction({
        global: e,
        mint: t,
        creator: n,
        user: a,
        associatedUser: o,
        amount: i,
        solAmount: u,
        slippage: c,
        tokenProgram: m = r.z,
        mayhemMode: l = !1,
      }) {
        return await this.getBuyInstructionInternal({
          user: a,
          associatedUser: o,
          mint: t,
          creator: n,
          feeRecipient: eN(e, l),
          buybackFeeRecipient: tN(),
          amount: i,
          solAmount: u.add(
            u.mul(new s.default(Math.floor(10 * c))).div(new s.default(1e3)),
          ),
          tokenProgram: m,
        });
      }
      async sellInstructions({
        global: e,
        bondingCurveAccountInfo: t,
        bondingCurve: n,
        mint: a,
        user: o,
        amount: i,
        solAmount: u,
        slippage: c,
        tokenProgram: m = r.z,
        mayhemMode: l = !1,
        cashback: d = !1,
      }) {
        let p = [];
        return (
          p.push(
            await this.getSellInstructionInternal({
              user: o,
              mint: a,
              creator: n.creator,
              feeRecipient: eN(e, l),
              buybackFeeRecipient: tN(),
              amount: i,
              solAmount: u.sub(
                u
                  .mul(new s.default(Math.floor(10 * c)))
                  .div(new s.default(1e3)),
              ),
              tokenProgram: m,
              cashback: d,
            }),
          ),
          p
        );
      }
      async extendAccountInstruction({ account: e, user: t }) {
        return this.offlinePumpProgram.methods
          .extendAccount()
          .accountsPartial({ account: e, user: t })
          .instruction();
      }
      async migrateInstruction({
        withdrawAuthority: e,
        mint: t,
        user: n,
        tokenProgram: a = r.z,
      }) {
        let o = tl(t),
          i = (0, u.h)(t, o, !0, a),
          s = t_(t),
          c = (0, u.h)(t, s, !0, a),
          m = ty(t),
          l = (0, u.h)(t, m, !0, a),
          d = tb(m),
          p = (0, u.h)(r.w, d, !0, r.z),
          _ = await this.offlinePumpProgram.methods
            .migrate()
            .accountsPartial({
              mint: t,
              user: n,
              withdrawAuthority: e,
              associatedBondingCurve: i,
              poolAuthorityMintAccount: c,
              poolBaseTokenAccount: l,
            })
            .remainingAccounts([
              { pubkey: d, isWritable: !1, isSigner: !1 },
              { pubkey: p, isWritable: !0, isSigner: !1 },
            ])
            .instruction();
        return (e3(_, 25, d, p), _);
      }
      async migrateV2Instruction({
        withdrawAuthority: e,
        mint: t,
        user: n,
        quoteMint: a,
        baseTokenProgram: o = r.S,
        quoteTokenProgram: s = r.z,
      }) {
        let c = tP(a),
          m = tl(t),
          l = t_(t),
          d = (0, u.h)(t, l, !0, o),
          p = tf(t, c),
          _ = (0, u.h)(t, p, !0, o),
          y = (0, u.h)(t, m, !0, o),
          f = tB(m, c, s),
          b = tB(l, c, s),
          g = (0, u.h)(c, p, !0, s),
          h = tb(p),
          k = (0, u.h)(c, h, !0, s),
          v = await this.offlinePumpProgram.methods
            .migrateV2()
            .accountsPartial({
              baseMint: t,
              quoteMint: c,
              user: n,
              withdrawAuthority: e,
              bondingCurve: m,
              poolAuthorityMintAccount: d,
              poolBaseTokenAccount: _,
              pool: p,
              poolAuthority: l,
              systemProgram: i.SystemProgram.programId,
              pumpAmm: eX,
              pumpAmmEventAuthority: tm(eX),
              eventAuthority: tm(e$),
              program: e$,
              associatedBaseBondingCurve: y,
              associatedQuoteBondingCurve: f,
              poolAuthorityQuoteAccount: b,
              poolQuoteTokenAccount: g,
              baseTokenProgram: o,
              quoteTokenProgram: s,
            })
            .remainingAccounts([
              { pubkey: h, isWritable: !1, isSigner: !1 },
              { pubkey: k, isWritable: !0, isSigner: !1 },
            ])
            .instruction();
        return (e3(v, 27, h, k), v);
      }
      async syncUserVolumeAccumulator(e) {
        return await this.offlinePumpProgram.methods
          .syncUserVolumeAccumulator()
          .accountsPartial({ user: e })
          .instruction();
      }
      async setCreator({ mint: e, setCreatorAuthority: t, creator: n }) {
        return await this.offlinePumpProgram.methods
          .setCreator(n)
          .accountsPartial({ mint: e, setCreatorAuthority: t })
          .instruction();
      }
      async initUserVolumeAccumulator({ payer: e, user: t }) {
        return await this.offlinePumpProgram.methods
          .initUserVolumeAccumulator()
          .accountsPartial({ payer: e, user: t })
          .instruction();
      }
      async closeUserVolumeAccumulator(e) {
        return await this.offlinePumpProgram.methods
          .closeUserVolumeAccumulator()
          .accountsPartial({ user: e })
          .instruction();
      }
      async initializeQuoteControlInstruction({ user: e }) {
        return await this.offlinePumpProgram.methods
          .initializeQuoteControl()
          .accountsPartial({ user: e })
          .instruction();
      }
      async setQuoteControlAdminInstruction({ authority: e, newAdmin: t }) {
        return await this.offlinePumpProgram.methods
          .setQuoteControlAdmin(t)
          .accountsPartial({ authority: e })
          .instruction();
      }
      async addQuoteControlMintInstruction({
        authority: e,
        quoteMint: t,
        initialVirtualQuoteReserves: n,
      }) {
        return await this.offlinePumpProgram.methods
          .addQuoteControlMint(t, n)
          .accountsPartial({ authority: e })
          .instruction();
      }
      async removeQuoteControlMintInstruction({ authority: e, quoteMint: t }) {
        return await this.offlinePumpProgram.methods
          .removeQuoteControlMint(t)
          .accountsPartial({ authority: e })
          .instruction();
      }
      async updateCreatorFeeConfigInstruction({
        authority: e,
        creatorFeeConfigurable: t,
        maxConfigurableCreatorFeeBps: n,
      }) {
        return await this.offlinePumpProgram.methods
          .updateCreatorFeeConfig(t, n)
          .accountsPartial({ authority: e })
          .instruction();
      }
      async setCreatorFeeBpsInstruction({
        creator: e,
        mint: t,
        creatorFeeBps: n,
        sharingConfig: a,
      }) {
        let o = this.offlinePumpProgram.methods
          .setCreatorFeeBps(n)
          .accountsPartial({ creator: e, mint: t });
        return a
          ? await o
              .remainingAccounts([{ pubkey: a, isWritable: !1, isSigner: !1 }])
              .instruction()
          : await o.instruction();
      }
      async adminSetCreatorFeeEditableInstruction({
        adminSetCreatorAuthority: e,
        mint: t,
      }) {
        return await this.offlinePumpProgram.methods
          .adminSetCreatorFeeEditable()
          .accountsPartial({ adminSetCreatorAuthority: e, mint: t })
          .instruction();
      }
      async setExoticFlatFeesInstruction({ admin: e, exoticFlatFees: t }) {
        return await this.offlinePumpFeeProgram.methods
          .setExoticFlatFees(t)
          .accountsPartial({ admin: e, configProgramId: e$ })
          .instruction();
      }
      async getBuyInstructionRaw({
        user: e,
        mint: t,
        creator: n,
        amount: a,
        solAmount: o,
        feeRecipient: i = tU(),
        tokenProgram: s = r.z,
        buybackFeeRecipient: c = tN(),
      }) {
        return await this.getBuyInstructionInternal({
          user: e,
          associatedUser: (0, u.h)(t, e, !0, s),
          mint: t,
          creator: n,
          feeRecipient: i,
          buybackFeeRecipient: c,
          amount: a,
          solAmount: o,
          tokenProgram: s,
        });
      }
      async getBuyInstructionInternal({
        user: e,
        associatedUser: t,
        mint: n,
        creator: a,
        feeRecipient: o,
        buybackFeeRecipient: i,
        amount: s,
        solAmount: u,
        tokenProgram: c = r.z,
      }) {
        return await this.offlinePumpProgram.methods
          .buy(s, u, { 0: !0 })
          .accountsPartial({
            feeRecipient: o,
            mint: n,
            associatedUser: t,
            user: e,
            creatorVault: tp(a),
            tokenProgram: c,
          })
          .remainingAccounts([
            { pubkey: td(n), isWritable: !1, isSigner: !1 },
            { pubkey: i, isWritable: !0, isSigner: !1 },
          ])
          .instruction();
      }
      async getSellInstructionRaw({
        user: e,
        mint: t,
        creator: n,
        amount: a,
        solAmount: o,
        feeRecipient: i = tU(),
        buybackFeeRecipient: s = tN(),
        tokenProgram: u = r.z,
        cashback: c = !1,
      }) {
        return await this.getSellInstructionInternal({
          user: e,
          mint: t,
          creator: n,
          feeRecipient: i,
          buybackFeeRecipient: s,
          amount: a,
          solAmount: o,
          tokenProgram: u,
          cashback: c,
        });
      }
      async getSellInstructionInternal({
        user: e,
        mint: t,
        creator: n,
        feeRecipient: a,
        buybackFeeRecipient: o,
        amount: r,
        solAmount: i,
        tokenProgram: s,
        cashback: c,
      }) {
        let m = tg(e),
          l = [
            { pubkey: td(t), isWritable: !1, isSigner: !1 },
            { pubkey: o, isWritable: !0, isSigner: !1 },
          ];
        return await this.offlinePumpProgram.methods
          .sell(r, i)
          .accountsPartial({
            feeRecipient: a,
            mint: t,
            associatedUser: (0, u.h)(t, e, !0, s),
            user: e,
            creatorVault: tp(n),
            tokenProgram: s,
          })
          .remainingAccounts(
            c ? [{ pubkey: m, isWritable: !0, isSigner: !1 }, ...l] : l,
          )
          .instruction();
      }
      async buyV2Instructions({
        global: e,
        bondingCurveAccountInfo: t,
        bondingCurve: n,
        associatedUserAccountInfo: a,
        mint: o,
        user: i,
        amount: s,
        quoteAmount: c,
        slippage: m,
        tokenProgram: d = r.S,
        quoteTokenProgram: p = r.z,
      }) {
        let _ = [],
          y = (0, u.h)(o, i, !0, d);
        a || _.push((0, l.f)(i, y, i, o, d));
        let f = tC(n.quoteMint) ? r.w : n.quoteMint;
        return (
          _.push(
            await this.buyV2Instruction({
              global: e,
              mint: o,
              creator: n.creator,
              user: i,
              associatedUser: y,
              amount: s,
              quoteAmount: c,
              slippage: m,
              tokenProgram: d,
              quoteMint: f,
              quoteTokenProgram: p,
              mayhemMode: n.isMayhemMode,
            }),
          ),
          _
        );
      }
      async createV2AndBuyV2Instructions({
        global: e,
        mint: t,
        name: n,
        symbol: a,
        uri: o,
        creator: i,
        user: s,
        amount: c,
        quoteAmount: m,
        mayhemMode: d,
        cashback: p = !1,
        quoteMint: _,
        quoteTokenProgram: y = r.z,
        creatorFeeBps: f,
      }) {
        e5({ global: e, mint: t, cashback: p, creatorFeeBps: f });
        let b = (0, u.h)(t, s, !0, r.S),
          { buyQuoteMint: g, buyQuoteTokenProgram: h } = tt(_, y);
        return [
          await this.createV2Instruction({
            mint: t,
            name: n,
            symbol: a,
            uri: o,
            creator: i,
            user: s,
            mayhemMode: d,
            cashback: p,
            quoteMint: _,
            quoteTokenProgram: y,
            creatorFeeBps: f,
          }),
          (0, l.f)(s, b, s, t, r.S),
          await this.buyV2Instruction({
            global: e,
            mint: t,
            creator: i,
            user: s,
            associatedUser: b,
            amount: c,
            quoteAmount: m,
            slippage: 1,
            tokenProgram: r.S,
            quoteMint: g,
            quoteTokenProgram: h,
            mayhemMode: d,
          }),
        ];
      }
      async createV3AndBuyV2Instructions({
        global: e,
        mint: t,
        name: n,
        symbol: a,
        uri: o,
        creator: i,
        user: s,
        amount: c,
        quoteAmount: m,
        mayhemMode: d,
        gameMode: p,
        cashback: _ = !1,
        quoteMint: y,
        quoteTokenProgram: f = r.z,
      }) {
        let b = (0, u.h)(t, s, !0, r.S),
          { buyQuoteMint: g, buyQuoteTokenProgram: h } = tt(y, f);
        return [
          await this.createV3Instruction({
            mint: t,
            name: n,
            symbol: a,
            uri: o,
            creator: i,
            user: s,
            mayhemMode: d,
            gameMode: p,
            cashback: _,
            quoteMint: y,
            quoteTokenProgram: f,
          }),
          (0, l.f)(s, b, s, t, r.S),
          await this.buyV2Instruction({
            global: e,
            mint: t,
            creator: i,
            user: s,
            associatedUser: b,
            amount: c,
            quoteAmount: m,
            slippage: 1,
            tokenProgram: r.S,
            quoteMint: g,
            quoteTokenProgram: h,
            mayhemMode: d,
          }),
        ];
      }
      async buyV2Instruction({
        global: e,
        mint: t,
        creator: n,
        user: a,
        associatedUser: o,
        amount: i,
        quoteAmount: u,
        slippage: c,
        tokenProgram: m = r.S,
        quoteMint: l,
        quoteTokenProgram: d = r.z,
        mayhemMode: p = !1,
      }) {
        return await this.getBuyV2InstructionInternal({
          user: a,
          associatedUser: o,
          mint: t,
          creator: n,
          feeRecipient: eN(e, p),
          buybackFeeRecipient: tN(),
          amount: i,
          quoteAmount: u.add(
            u.mul(new s.default(Math.floor(10 * c))).div(new s.default(1e3)),
          ),
          tokenProgram: m,
          quoteMint: l,
          quoteTokenProgram: d,
        });
      }
      async sellV2Instructions({
        global: e,
        bondingCurveAccountInfo: t,
        bondingCurve: n,
        mint: a,
        user: o,
        amount: i,
        quoteAmount: u,
        slippage: c,
        tokenProgram: m = r.S,
        quoteTokenProgram: l = r.z,
      }) {
        let d = [],
          p = tC(n.quoteMint) ? r.w : n.quoteMint;
        return (
          d.push(
            await this.getSellV2InstructionInternal({
              user: o,
              mint: a,
              creator: n.creator,
              feeRecipient: eN(e, n.isMayhemMode),
              buybackFeeRecipient: tN(),
              amount: i,
              quoteAmount: u.sub(
                u
                  .mul(new s.default(Math.floor(10 * c)))
                  .div(new s.default(1e3)),
              ),
              tokenProgram: m,
              quoteMint: p,
              quoteTokenProgram: l,
            }),
          ),
          d
        );
      }
      async getBuyV2InstructionRaw({
        user: e,
        mint: t,
        creator: n,
        amount: a,
        quoteAmount: o,
        feeRecipient: i = tU(),
        buybackFeeRecipient: s = tN(),
        tokenProgram: c = r.S,
        quoteMint: m = r.w,
        quoteTokenProgram: l = r.z,
      }) {
        return await this.getBuyV2InstructionInternal({
          user: e,
          associatedUser: (0, u.h)(t, e, !0, c),
          mint: t,
          creator: n,
          feeRecipient: i,
          buybackFeeRecipient: s,
          amount: a,
          quoteAmount: o,
          tokenProgram: c,
          quoteMint: m,
          quoteTokenProgram: l,
        });
      }
      async getBuyV2InstructionInternal({
        user: e,
        associatedUser: t,
        mint: n,
        creator: a,
        feeRecipient: o,
        buybackFeeRecipient: r,
        amount: i,
        quoteAmount: s,
        tokenProgram: c,
        quoteMint: m,
        quoteTokenProgram: l,
      }) {
        let d = tl(n),
          p = tp(a),
          _ = tg(e);
        return await this.offlinePumpProgram.methods
          .buyV2(i, s)
          .accountsPartial({
            baseMint: n,
            quoteMint: m,
            baseTokenProgram: c,
            quoteTokenProgram: l,
            feeRecipient: o,
            associatedQuoteFeeRecipient: tB(o, m, l),
            buybackFeeRecipient: r,
            associatedQuoteBuybackFeeRecipient: tB(r, m, l),
            associatedBaseBondingCurve: (0, u.h)(n, d, !0, c),
            associatedQuoteBondingCurve: tB(d, m, l),
            user: e,
            associatedBaseUser: t,
            associatedQuoteUser: tB(e, m, l),
            creatorVault: p,
            associatedCreatorVault: tB(p, m, l),
            associatedUserVolumeAccumulator: tB(_, m, l),
          })
          .instruction();
      }
      async getSellV2InstructionRaw({
        user: e,
        mint: t,
        creator: n,
        amount: a,
        quoteAmount: o,
        feeRecipient: i = tU(),
        buybackFeeRecipient: s = tN(),
        tokenProgram: u = r.S,
        quoteMint: c = r.w,
        quoteTokenProgram: m = r.z,
      }) {
        return await this.getSellV2InstructionInternal({
          user: e,
          mint: t,
          creator: n,
          feeRecipient: i,
          buybackFeeRecipient: s,
          amount: a,
          quoteAmount: o,
          tokenProgram: u,
          quoteMint: c,
          quoteTokenProgram: m,
        });
      }
      async getSellV2InstructionInternal({
        user: e,
        mint: t,
        creator: n,
        feeRecipient: a,
        buybackFeeRecipient: o,
        amount: r,
        quoteAmount: i,
        tokenProgram: s,
        quoteMint: c,
        quoteTokenProgram: m,
      }) {
        let l = tl(t),
          d = tp(n),
          p = tg(e);
        return await this.offlinePumpProgram.methods
          .sellV2(r, i)
          .accountsPartial({
            baseMint: t,
            quoteMint: c,
            baseTokenProgram: s,
            quoteTokenProgram: m,
            feeRecipient: a,
            associatedQuoteFeeRecipient: tB(a, c, m),
            buybackFeeRecipient: o,
            associatedQuoteBuybackFeeRecipient: tB(o, c, m),
            associatedBaseBondingCurve: (0, u.h)(t, l, !0, s),
            associatedQuoteBondingCurve: tB(l, c, m),
            user: e,
            associatedBaseUser: (0, u.h)(t, e, !0, s),
            associatedQuoteUser: tB(e, c, m),
            creatorVault: d,
            associatedCreatorVault: tB(d, c, m),
            associatedUserVolumeAccumulator: tB(p, c, m),
          })
          .instruction();
      }
      async createFeeSharingConfig({ creator: e, mint: t, pool: n }) {
        return await this.offlinePumpFeeProgram.methods
          .createFeeSharingConfig()
          .accountsPartial({ payer: e, mint: t, pool: n })
          .instruction();
      }
      async updateFeeShares({
        authority: e,
        mint: t,
        currentShareholders: n,
        newShareholders: a,
      }) {
        if (0 === a.length) throw new ev();
        if (a.length > 10) throw new ew(a.length, 10);
        let o = 0,
          i = new Set();
        for (let e of a) {
          if (e.shareBps <= 0) throw new eA(e.address.toString());
          ((o += e.shareBps), i.add(e.address.toString()));
        }
        if (1e4 !== o) throw new eC(o);
        if (i.size !== a.length) throw new eP();
        let s = N(tA(t));
        return await this.offlinePumpFeeProgram.methods
          .updateFeeShares(
            a.map((e) => ({ address: e.address, shareBps: e.shareBps })),
          )
          .accountsPartial({
            authority: e,
            mint: t,
            coinCreatorVaultAta: L(s, r.w, r.z),
          })
          .remainingAccounts(
            n.map((e) => ({ pubkey: e, isWritable: !0, isSigner: !1 })),
          )
          .instruction();
      }
      async updateFeeSharesV2({
        authority: e,
        mint: t,
        currentShareholders: n,
        newShareholders: a,
        quoteMint: o,
        quoteTokenProgram: s = r.z,
      }) {
        if (0 === a.length) throw new ev();
        if (a.length > 10) throw new ew(a.length, 10);
        let c = 0,
          m = new Set();
        for (let e of a) {
          if (e.shareBps <= 0) throw new eA(e.address.toString());
          ((c += e.shareBps), m.add(e.address.toString()));
        }
        if (1e4 !== c) throw new eC(c);
        if (m.size !== a.length) throw new eP();
        let l = N(tA(t)),
          d = [
            ...n.map((e) => ({ pubkey: e, isWritable: !0, isSigner: !1 })),
            ...(o.equals(r.w)
              ? []
              : n.map((e) => ({
                  pubkey: (0, u.h)(o, e, !0, s),
                  isWritable: !0,
                  isSigner: !1,
                }))),
          ];
        return await this.offlinePumpFeeProgram.methods
          .updateFeeSharesV2(
            a.map((e) => ({ address: e.address, shareBps: e.shareBps })),
          )
          .accountsPartial({
            authority: e,
            mint: t,
            coinCreatorVaultAta: L(l, o, s),
            quoteMint: o,
            tokenProgram: s,
            associatedTokenProgram: r.x,
            systemProgram: i.SystemProgram.programId,
          })
          .remainingAccounts([...d])
          .instruction();
      }
      async transferCreatorFeesToPumpV2({
        payer: e,
        mint: t,
        quoteMint: n,
        quoteTokenProgram: a = r.z,
      }) {
        let o = tA(t);
        return await this.offlinePumpAmmProgram.methods
          .transferCreatorFeesToPumpV2()
          .accountsPartial({
            payer: e,
            quoteMint: n,
            tokenProgram: a,
            coinCreator: o,
          })
          .instruction();
      }
      decodeDistributeCreatorFeesEvent(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "distributeCreatorFeesEvent",
          e,
        );
      }
      async distributeCreatorFees({
        mint: e,
        sharingConfig: t,
        sharingConfigAddress: n,
      }) {
        return await this.offlinePumpProgram.methods
          .distributeCreatorFees()
          .accountsPartial({ mint: e, creatorVault: tp(n) })
          .remainingAccounts(
            t.shareholders.map((e) => ({
              pubkey: e.address,
              isWritable: !0,
              isSigner: !1,
            })),
          )
          .instruction();
      }
      async distributeCreatorFeesV2({
        mint: e,
        sharingConfig: t,
        sharingConfigAddress: n,
        quoteMint: a,
        payer: o,
        shouldInitializeAta: s = !0,
        quoteTokenProgram: c = r.z,
      }) {
        let m = t.shareholders.map((e) => ({
          pubkey: e.address,
          isWritable: !0,
          isSigner: !1,
        }));
        return (
          a.equals(r.w) ||
            m.push(
              ...t.shareholders.map((e) => ({
                pubkey: (0, u.h)(a, e.address, !0, c),
                isWritable: !0,
                isSigner: !1,
              })),
            ),
          await this.offlinePumpProgram.methods
            .distributeCreatorFeesV2(s)
            .accountsPartial({
              mint: e,
              creatorVault: tp(n),
              quoteMint: a,
              quoteTokenProgram: c,
              associatedTokenProgram: r.x,
              systemProgram: i.SystemProgram.programId,
              payer: o,
            })
            .remainingAccounts([...m])
            .instruction()
        );
      }
      decodeMinimumDistributableFee(e) {
        return this.offlinePumpProgram.coder.types.decode(
          "minimumDistributableFeeEvent",
          e,
        );
      }
      async getMinimumDistributableFee({
        mint: e,
        sharingConfig: t,
        sharingConfigAddress: n,
      }) {
        return await this.offlinePumpProgram.methods
          .getMinimumDistributableFee()
          .accountsPartial({ mint: e, creatorVault: tp(n) })
          .remainingAccounts(
            t.shareholders.map((e) => ({
              pubkey: e.address,
              isWritable: !0,
              isSigner: !1,
            })),
          )
          .instruction();
      }
      async createDonationFeePda({
        coinCreator: e,
        mint: t,
        configId: n,
        quoteMint: a,
      }) {
        return await this.offlinePumpFeeProgram.methods
          .createDonationFeePda()
          .accountsPartial({
            payer: e,
            configId: n,
            baseMint: t,
            pool: tf(t, tP(a)),
            donationFeePda: tT(t, n),
          })
          .instruction();
      }
      async crankDonationFeePda({
        payer: e,
        mint: t,
        configId: n,
        donationRelayProgramId: a,
        quoteMint: o = r.w,
      }) {
        let i = tT(t, n),
          s = tM(n, o, a),
          c = tF(n, o, a);
        return await this.offlinePumpFeeProgram.methods
          .crankDonationFeePda()
          .accountsPartial({
            payer: e,
            donationFeePda: i,
            quoteMint: o,
            donationFeePdaAta: (0, u.h)(o, i, !0, r.z),
            donationRelayProgram: a,
            donationRelayEventAuthority: tx(a),
            mintWhitelist: tI(a),
            epochTracker: s,
            debouncer: c,
            debouncerAta: (0, u.h)(o, c, !0, r.z),
          })
          .instruction();
      }
      async createSocialFeePda({ payer: e, userId: t, platform: n }) {
        return await this.offlinePumpFeeProgram.methods
          .createSocialFeePda(t, n)
          .accountsPartial({ payer: e, socialFeePda: tE(t, n) })
          .instruction();
      }
      async claimSocialFeePda({
        recipient: e,
        socialClaimAuthority: t,
        userId: n,
        platform: a,
      }) {
        return await this.offlinePumpFeeProgram.methods
          .claimSocialFeePda(n, a)
          .accountsPartial({
            recipient: e,
            socialFeePda: tE(n, a),
            socialClaimAuthority: t,
          })
          .instruction();
      }
      async claimCashbackInstruction({ user: e }) {
        return await this.offlinePumpProgram.methods
          .claimCashback()
          .accountsPartial({ user: e })
          .instruction();
      }
      async claimCashbackV2Instruction({
        user: e,
        quoteMint: t = r.w,
        quoteTokenProgram: n = r.z,
      }) {
        let a = tg(e);
        return await this.offlinePumpProgram.methods
          .claimCashbackV2()
          .accountsPartial({
            user: e,
            quoteMint: t,
            quoteTokenProgram: n,
            associatedUserVolumeAccumulator: tB(a, t, n),
            associatedQuoteUser: tB(e, t, n),
          })
          .instruction();
      }
    })(),
    to = E([Y.Buffer.from("global")]),
    tr = E([Y.Buffer.from("quote-control")]);
  (T([Y.Buffer.from("amm_global")]), q([Y.Buffer.from("fee-program-global")]));
  var ti = q([Y.Buffer.from("fee_config"), e$.toBuffer()]),
    ts = E([Y.Buffer.from("global_volume_accumulator")]);
  T([Y.Buffer.from("global_volume_accumulator")]);
  var tu = tm(e$),
    tc = tm(eX);
  function tm(e) {
    return i.PublicKey.findProgramAddressSync(
      [Y.Buffer.from("__event_authority")],
      e,
    )[0];
  }
  function tl(e) {
    return E([Y.Buffer.from("bonding-curve"), new i.PublicKey(e).toBuffer()]);
  }
  function td(e) {
    return E([
      Y.Buffer.from("bonding-curve-v2"),
      new i.PublicKey(e).toBuffer(),
    ]);
  }
  function tp(e) {
    return E([Y.Buffer.from("creator-vault"), e.toBuffer()]);
  }
  function t_(e) {
    return E([Y.Buffer.from("pool-authority"), e.toBuffer()]);
  }
  function ty(e) {
    return R(0, t_(e), e, r.w);
  }
  function tf(e, t) {
    return R(0, t_(e), e, t);
  }
  function tb(e) {
    return T([Y.Buffer.from("boost_vault"), e.toBuffer()]);
  }
  function tg(e, t = e$) {
    return t.equals(e$)
      ? E([Y.Buffer.from("user_volume_accumulator"), e.toBuffer()])
      : T([Y.Buffer.from("user_volume_accumulator"), e.toBuffer()]);
  }
  tm(e1);
  var th = () =>
      i.PublicKey.findProgramAddressSync(
        [Y.Buffer.from("global-params")],
        eY,
      )[0],
    tk = (e) =>
      i.PublicKey.findProgramAddressSync(
        [Y.Buffer.from("mayhem-state"), e.toBuffer()],
        eY,
      )[0],
    tv = () =>
      i.PublicKey.findProgramAddressSync([Y.Buffer.from("sol-vault")], eY)[0],
    tw = (e) => (0, u.h)(e, tv(), !0, r.S),
    tA = (e) => q([Y.Buffer.from("sharing-config"), e.toBuffer()]),
    tC = (e) => e.equals(r.w) || e.equals(i.PublicKey.default),
    tP = (e) => (!e || tC(e) ? r.w : e),
    tB = (e, t, n) => (0, u.h)(t, e, !0, n),
    tS = (e) =>
      i.PublicKey.findProgramAddressSync(
        [Y.Buffer.from("creator_vault"), e.toBuffer()],
        eX,
      )[0],
    tE = (e, t) =>
      q([
        Y.Buffer.from("social-fee-pda"),
        Y.Buffer.from(e),
        Y.Buffer.from([t]),
      ]),
    tT = (e, t) =>
      q([Y.Buffer.from("donation-fee-pda"), e.toBuffer(), t.toBuffer()]);
  (new i.PublicKey("RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu"),
    new i.PublicKey("DRLYxueWz6iymdsaRCER6iv6v9zL7gFWANwDL2V5VUx1"));
  var tq = (e, t) => i.PublicKey.findProgramAddressSync(e, t)[0],
    tM = (e, t, n) =>
      tq([Y.Buffer.from("epoch_tracker_v1"), e.toBuffer(), t.toBuffer()], n),
    tF = (e, t, n) =>
      tq([Y.Buffer.from("debouncer_v1"), e.toBuffer(), t.toBuffer()], n),
    tI = (e) => tq([Y.Buffer.from("mint_whitelist_v1")], e),
    tx = (e) => tm(e);
  function tR(e, t = i.PublicKey.default, n, a) {
    let o = t ?? i.PublicKey.default;
    return {
      virtualTokenReserves: e.initialVirtualTokenReserves,
      virtualQuoteReserves: (function (e, t, n) {
        if (tC(t)) return e.initialVirtualSolReserves;
        if (t.equals(r.Q)) throw new eB(t);
        if (e.whitelistedQuoteMints.some((e) => e.equals(t)))
          return e.initialVirtualQuoteReserves;
        let a = n?.mints.find((e) => e.mint.equals(t));
        if (a) return a.initialVirtualQuoteReserves;
        if (void 0 !== n) throw new eB(t);
        return e.initialVirtualQuoteReserves;
      })(e, o, n),
      realTokenReserves: e.initialRealTokenReserves,
      realQuoteReserves: new s.default(0),
      tokenTotalSupply: e.tokenTotalSupply,
      complete: !1,
      creator: i.PublicKey.default,
      isMayhemMode: e.mayhemModeEnabled,
      isCashbackCoin: !1,
      quoteMint: tC(o) ? i.PublicKey.default : o,
      creatorFeeBps: a ?? new s.default(0),
      canEditCreatorFee: !1,
    };
  }
  function tU() {
    let e = Math.floor(Math.random() * tV.length);
    return new i.PublicKey(tV[e]);
  }
  var tV = [
    "62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV",
    "7VtfL8fvgNfhz17qKRMjzQEXgbdpnHHHQRh54R9jP2RJ",
    "7hTckgnGnLQR6sdH7YkqFTAA7VwTfYFaZ6EhEsU3saCX",
    "9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz",
    "AVmoTthdrX6tKt4nDjco2D775W2YK3sDhxPcMmzUAmTY",
    "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM",
    "FWsW1xNtWscwNmKv6wVsU1iTzRN6wmmk3MjxRP5tT7hz",
    "G5UZAVbAf46s7cKWoyKu8kYTip9DGTpbLZ2qa9Aq69dP",
  ];
  function tN() {
    let e = Math.floor(Math.random() * tL.length);
    return new i.PublicKey(tL[e]);
  }
  var tL = [
    "5YxQFdt3Tr9zJLvkFccqXVUwhdTWJQc1fFg2YPbxvxeD",
    "9M4giFFMxmFGXtc3feFzRai56WbBqehoSeRE5GK7gf7",
    "GXPFM2caqTtQYC2cJ5yJRi9VDkpsYZXzYdwYpGnLmtDL",
    "3BpXnfJaUTiwXnJNe7Ej1rcbzqTTQUvLShZaWazebsVR",
    "5cjcW9wExnJJiqgLjq7DEG75Pm6JBgE1hNv4B2vHXUW6",
    "EHAAiTxcdDwQ3U4bU6YcMsQGaekdzLS3B5SmYo46kJtL",
    "5eHhjP8JaYkz83CWwvGU2uMUXefd3AazWGx4gpcuEEYD",
    "A7hAgCzFw14fejgCp387JUJRMNyz4j89JKnhtKU8piqW",
  ];
  function tD({
    mintSupply: e,
    virtualQuoteReserves: t,
    virtualTokenReserves: n,
  }) {
    if (n.isZero())
      throw Error("Division by zero: virtual token reserves cannot be zero");
    return t.mul(e).div(n);
  }
  var tO =
    (((a = tO || {})[(a.Pump = 0)] = "Pump"),
    (a[(a.X = 1)] = "X"),
    (a[(a.GitHub = 2)] = "GitHub"),
    a);
  e.s(
    [
      "s",
      0,
      151,
      "R",
      0,
      to,
      "j",
      0,
      eH,
      "B",
      0,
      tc,
      "y",
      0,
      eX,
      "H",
      0,
      tu,
      "C",
      0,
      ti,
      "n",
      0,
      e$,
      "A",
      0,
      ta,
      "o",
      0,
      tO,
      "Z",
      0,
      tS,
      "M",
      0,
      tD,
      "G",
      0,
      tl,
      "m",
      0,
      ty,
      "a",
      0,
      tf,
      "l",
      0,
      ex,
      "r",
      0,
      tp,
      "v",
      0,
      tT,
      "k",
      0,
      tA,
      "S",
      0,
      function ({
        global: e,
        feeConfig: t,
        mintSupply: n,
        bondingCurve: a,
        amount: o,
        quoteMint: r,
        quoteControl: i,
        creatorFeeBps: u,
      }) {
        if (o.eq(new s.default(0))) return new s.default(0);
        let c = !1;
        if (
          ((null === a || null === n) &&
            ((a = tR(e, r, i, u)), (n = e.tokenTotalSupply), (c = !0)),
          a.virtualTokenReserves.eq(new s.default(0)))
        )
          return new s.default(0);
        let m = (function ({
          minAmount: e,
          virtualTokenReserves: t,
          virtualQuoteReserves: n,
        }) {
          return e.mul(n).div(t.sub(e)).add(new s.default(1));
        })({
          minAmount: s.default.min(o, a.realTokenReserves),
          virtualTokenReserves: a.virtualTokenReserves,
          virtualQuoteReserves: a.virtualQuoteReserves,
        });
        return m.add(
          eI({
            global: e,
            feeConfig: t,
            mintSupply: n,
            bondingCurve: a,
            amount: m,
            isNewBondingCurve: c,
          }),
        );
      },
      "Y",
      0,
      function ({
        global: e,
        feeConfig: t,
        mintSupply: n,
        bondingCurve: a,
        amount: o,
        quoteMint: r,
        quoteControl: u,
        creatorFeeBps: c,
      }) {
        if (o.eq(new s.default(0))) return new s.default(0);
        let m = !1;
        if (
          ((null === a || null === n) &&
            ((a = tR(e, r, u, c)), (n = e.tokenTotalSupply), (m = !0)),
          a.virtualTokenReserves.eq(new s.default(0)))
        )
          return new s.default(0);
        let { virtualQuoteReserves: l, virtualTokenReserves: d } = a,
          { protocolFeeBps: p, creatorFeeBps: _ } = ex({
            global: e,
            feeConfig: t,
            mintSupply: n,
            virtualQuoteReserves: l,
            virtualTokenReserves: d,
            quoteMint: a.quoteMint,
            creatorFeeBps: a.creatorFeeBps,
          }),
          y = p.add(
            m || !i.PublicKey.default.equals(a.creator) ? _ : new s.default(0),
          ),
          f = (function ({
            inputAmount: e,
            virtualTokenReserves: t,
            virtualQuoteReserves: n,
          }) {
            return e.mul(t).div(n.add(e));
          })({
            inputAmount: o.subn(1).muln(1e4).div(y.addn(1e4)),
            virtualTokenReserves: a.virtualTokenReserves,
            virtualQuoteReserves: a.virtualQuoteReserves,
          });
        return s.default.min(f, a.realTokenReserves);
      },
      "p",
      0,
      eJ,
      "E",
      0,
      function (e) {
        return new c.v(eD, new c.F(e, null, {}));
      },
      "f",
      0,
      eZ,
      "b",
      0,
      function ({
        global: e,
        feeConfig: t,
        mintSupply: n,
        bondingCurve: a,
        amount: o,
      }) {
        if (
          o.eq(new s.default(0)) ||
          a.virtualTokenReserves.eq(new s.default(0))
        )
          return new s.default(0);
        let r = (function ({
          inputAmount: e,
          virtualTokenReserves: t,
          virtualQuoteReserves: n,
        }) {
          return e.mul(n).div(t.add(e));
        })({
          inputAmount: o,
          virtualTokenReserves: a.virtualTokenReserves,
          virtualQuoteReserves: a.virtualQuoteReserves,
        });
        return r.sub(
          eI({
            global: e,
            feeConfig: t,
            mintSupply: n,
            bondingCurve: a,
            amount: r,
            isNewBondingCurve: !1,
          }),
        );
      },
      "K",
      0,
      function ({ mint: e, creator: t }) {
        return tA(e).equals(t);
      },
      "x",
      0,
      function ({ sharingConfig: e }) {
        return 1 !== e.version && (2 !== e.version || !e.adminRevoked);
      },
      "g",
      0,
      tR,
      "e",
      0,
      (e) => {
        let t = tO[e];
        if (void 0 !== t) return t;
        throw Error(`Unknown platform value: ${e}`);
      },
      "d",
      0,
      ek,
      "z",
      0,
      t_,
      "F",
      0,
      eR,
      "h",
      0,
      tg,
    ],
    728141,
  );
};
