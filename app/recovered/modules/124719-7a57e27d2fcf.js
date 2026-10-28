// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n = e.i(149502),
    i = e.r(353188),
    o = function () {},
    a = e.g.Bare ? queueMicrotask : n.default.nextTick.bind(n.default),
    s = function (e, t, r) {
      if ("function" == typeof t) return s(e, null, t);
      (t || (t = {}), (r = i(r || o)));
      var n = e._writableState,
        l = e._readableState,
        u = t.readable || (!1 !== t.readable && e.readable),
        d = t.writable || (!1 !== t.writable && e.writable),
        c = !1,
        f = function () {
          e.writable || h();
        },
        h = function () {
          ((d = !1), u || r.call(e));
        },
        p = function () {
          ((u = !1), d || r.call(e));
        },
        g = function (t) {
          r.call(e, t ? Error("exited with error code: " + t) : null);
        },
        b = function (t) {
          r.call(e, t);
        },
        m = function () {
          a(y);
        },
        y = function () {
          if (
            !c &&
            ((u && !(l && l.ended && !l.destroyed)) ||
              (d && !(n && n.ended && !n.destroyed)))
          )
            return r.call(e, Error("premature close"));
        },
        w = function () {
          e.req.on("finish", h);
        };
      return (
        e.setHeader && "function" == typeof e.abort
          ? (e.on("complete", h),
            e.on("abort", m),
            e.req ? w() : e.on("request", w))
          : d && !n && (e.on("end", f), e.on("close", f)),
        e.stdio &&
          Array.isArray(e.stdio) &&
          3 === e.stdio.length &&
          e.on("exit", g),
        e.on("end", p),
        e.on("finish", h),
        !1 !== t.error && e.on("error", b),
        e.on("close", m),
        function () {
          ((c = !0),
            e.removeListener("complete", h),
            e.removeListener("abort", m),
            e.removeListener("request", w),
            e.req && e.req.removeListener("finish", h),
            e.removeListener("end", f),
            e.removeListener("close", f),
            e.removeListener("finish", h),
            e.removeListener("exit", g),
            e.removeListener("end", p),
            e.removeListener("error", b),
            e.removeListener("close", m));
        }
      );
    };
  t.exports = s;
};
