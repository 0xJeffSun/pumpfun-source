// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(114450),
    r = e.i(848869),
    a = e.i(668487);
  e.s([
    "C",
    0,
    (e, i = {}) => {
      let {
          shorthand: n = !1,
          strict: l = !1,
          removeAgo: s = !1,
          removeIn: o = !1,
        } = i,
        d = new Date(e);
      if (isNaN(d.getTime())) return "";
      let u = l
        ? (0, r.f)(d, (0, a.t)(), { addSuffix: !0 })
        : (0, t.f)(d, (0, a.t)(), { addSuffix: !0 });
      if (!n) return s ? u.replace(/ ago$/, "") : u;
      let c = u
          .replace(/(\d+) years?/, "$1y")
          .replace(/(\d+) months?/, "$1mo")
          .replace(/(\d+) weeks?/, "$1w")
          .replace(/(\d+) days?/, "$1d")
          .replace(/(\d+) hours?/, "$1h")
          .replace(/(\d+) minutes?/, "$1m")
          .replace(/(\d+) seconds?/, "$1s"),
        m = s ? c.replace(/ ago$/, "") : c;
      return o ? m.replace(/^in /, "") : m;
    },
    "M",
    0,
    (e, t) => (0, a.t)() - e < t,
  ]);
};
