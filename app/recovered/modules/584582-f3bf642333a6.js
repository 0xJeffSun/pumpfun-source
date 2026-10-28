// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(250954),
    r = e.i(114450),
    n = e.i(848869);
  e.s(
    [
      "O",
      0,
      function (e, t) {
        let r = new Date(e);
        return new Intl.DateTimeFormat(
          "en-GB",
          t || { dateStyle: "short", timeStyle: "short" },
        ).format(r);
      },
      "j",
      0,
      function () {
        let e = Date.now();
        return { soft: e + 144e5, normal: e + 432e6, perma: e + 864e9 };
      },
      "C",
      0,
      (e, a = {}) => {
        var i, l;
        let { shorthand: o = !1, strict: s = !1, removeAgo: u = !1 } = a,
          d = new Date(e);
        if (isNaN(d.getTime())) return "";
        if (u) {
          let t = Date.now() - (e < 1e10 ? 1e3 * e : e);
          if (t < 0) return "0s";
          let r = Math.floor(t / 1e3),
            n = Math.floor(r / 60),
            a = Math.floor(n / 60),
            i = Math.floor(a / 24),
            l = Math.floor(i / 30),
            o = Math.floor(l / 12);
          return o > 0
            ? `${o}y`
            : l > 0
              ? `${l}mo`
              : i > 0
                ? `${i}d`
                : a > 0
                  ? `${a}h`
                  : n > 0
                    ? `${n}m`
                    : `${r}s`;
        }
        let c = s
          ? ((i = { addSuffix: !0 }), (0, n.f)(d, (0, t.f)(d), i))
          : ((l = { addSuffix: !0 }), (0, r.f)(d, (0, t.f)(d), l));
        return o
          ? c
              .replace(/(\d+) years?/, "$1y")
              .replace(/(\d+) months?/, "$1mo")
              .replace(/(\d+) days?/, "$1d")
              .replace(/(\d+) hours?/, "$1h")
              .replace(/(\d+) minutes?/, "$1m")
              .replace(/(\d+) seconds?/, "$1s")
          : c;
      },
    ],
    584582,
  );
};
