// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n,
    i = e.i(149502),
    o = e.r(353188),
    a = e.r(124719);
  try {
    n = {};
  } catch (e) {}
  var s = function () {},
    l = void 0 !== i.default && /^v?\.0/.test(i.default.version),
    u = function (e) {
      return "function" == typeof e;
    },
    d = function (e, t, r, i) {
      i = o(i);
      var d = !1;
      (e.on("close", function () {
        d = !0;
      }),
        a(e, { readable: t, writable: r }, function (e) {
          if (e) return i(e);
          ((d = !0), i());
        }));
      var c = !1;
      return function (t) {
        if (!d && !c) {
          if (
            ((c = !0),
            l &&
              n &&
              (e instanceof (n.ReadStream || s) ||
                e instanceof (n.WriteStream || s)) &&
              u(e.close))
          )
            return e.close(s);
          if (e.setHeader && u(e.abort)) return e.abort();
          if (u(e.destroy)) return e.destroy();
          i(t || Error("stream was destroyed"));
        }
      };
    },
    c = function (e) {
      e();
    },
    f = function (e, t) {
      return e.pipe(t);
    };
  t.exports = function () {
    var e,
      t = Array.prototype.slice.call(arguments),
      r = (u(t[t.length - 1] || s) && t.pop()) || s;
    if ((Array.isArray(t[0]) && (t = t[0]), t.length < 2))
      throw Error("pump requires two streams per minimum");
    var n = t.map(function (i, o) {
      var a = o < t.length - 1;
      return d(i, a, o > 0, function (t) {
        (e || (e = t), t && n.forEach(c), a || (n.forEach(c), r(e)));
      });
    });
    return t.reduce(f);
  };
};
