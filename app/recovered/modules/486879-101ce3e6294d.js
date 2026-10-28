// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  var r =
      (e.e && e.e.__asyncValues) ||
      function (e) {
        if (!Symbol.asyncIterator)
          throw TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e =
              "function" == typeof __values
                ? __values(e)
                : e[Symbol.iterator]()),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(t) {
          n[t] =
            e[t] &&
            function (n) {
              return new Promise(function (r, o) {
                var a, s, i;
                ((a = r),
                  (s = o),
                  (i = (n = e[t](n)).done),
                  Promise.resolve(n.value).then(function (e) {
                    a({ value: e, done: i });
                  }, s));
              });
            };
        }
      },
    o =
      (e.e && e.e.__await) ||
      function (e) {
        return this instanceof o ? ((this.v = e), this) : new o(e);
      },
    a =
      (e.e && e.e.__asyncGenerator) ||
      function (e, n, t) {
        if (!Symbol.asyncIterator)
          throw TypeError("Symbol.asyncIterator is not defined.");
        var r,
          a = t.apply(e, n || []),
          s = [];
        return (
          (r = {}),
          i("next"),
          i("throw"),
          i("return", function (e) {
            return function (n) {
              return Promise.resolve(n).then(e, u);
            };
          }),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function i(e, n) {
          a[e] &&
            ((r[e] = function (n) {
              return new Promise(function (t, r) {
                s.push([e, n, t, r]) > 1 || m(e, n);
              });
            }),
            n && (r[e] = n(r[e])));
        }
        function m(e, n) {
          try {
            var t;
            (t = a[e](n)).value instanceof o
              ? Promise.resolve(t.value.v).then(l, u)
              : d(s[0][2], t);
          } catch (e) {
            d(s[0][3], e);
          }
        }
        function l(e) {
          m("next", e);
        }
        function u(e) {
          m("throw", e);
        }
        function d(e, n) {
          (e(n), s.shift(), s.length && m(s[0][0], s[0][1]));
        }
      };
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.protoDelimited = void 0));
  let s = e.r(792060);
  t.protoDelimited = {
    enc(e, n) {
      let t = e.getType().runtime.bin.makeWriteOptions(n);
      return t.writerFactory().bytes(e.toBinary(t)).finish();
    },
    dec(e, n, t) {
      let r = e.runtime.bin.makeReadOptions(t);
      return e.fromBinary(r.readerFactory(n).bytes(), r);
    },
    decStream(e, n) {
      return a(this, arguments, function* () {
        var a, s, i, m;
        let l = new Uint8Array(0);
        try {
          for (
            var u, d = !0, p = r(n);
            !(a = (u = yield o(p.next())).done);
            d = !0
          )
            for (
              m = u.value,
                d = !1,
                l = (function (e, n) {
                  let t = new Uint8Array(e.byteLength + n.byteLength);
                  return (t.set(e), t.set(n, e.length), t);
                })(l, m);
              ;

            ) {
              let n = t.protoDelimited.peekSize(l);
              if (n.eof || n.offset + n.size > l.byteLength) break;
              (yield yield o(t.protoDelimited.dec(e, l)),
                (l = l.subarray(n.offset + n.size)));
            }
        } catch (e) {
          s = { error: e };
        } finally {
          try {
            !d && !a && (i = p.return) && (yield o(i.call(p)));
          } finally {
            if (s) throw s.error;
          }
        }
        if (l.byteLength > 0) throw Error("incomplete data");
      });
    },
    peekSize(e) {
      let n = { eof: !0, size: null, offset: null };
      for (let t = 0; t < 10; t++) {
        if (t > e.byteLength) return n;
        if ((128 & e[t]) == 0) {
          let t,
            r = new s.BinaryReader(e);
          try {
            t = r.uint32();
          } catch (e) {
            if (e instanceof RangeError) return n;
            throw e;
          }
          return { eof: !1, size: t, offset: r.pos };
        }
      }
      throw Error("invalid varint");
    },
  };
};
