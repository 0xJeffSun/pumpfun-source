// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(114450),
    a = e.i(848869),
    i = e.i(668487);
  e.s([
    "C",
    0,
    (e, l = {}) => {
      let {
          shorthand: r = !1,
          strict: n = !1,
          removeAgo: o = !1,
          removeIn: s = !1,
        } = l,
        d = new Date(e);
      if (isNaN(d.getTime())) return "";
      let c = n
        ? (0, a.f)(d, (0, i.t)(), { addSuffix: !0 })
        : (0, t.f)(d, (0, i.t)(), { addSuffix: !0 });
      if (!r) return o ? c.replace(/ ago$/, "") : c;
      let u = c
          .replace(/(\d+) years?/, "$1y")
          .replace(/(\d+) months?/, "$1mo")
          .replace(/(\d+) weeks?/, "$1w")
          .replace(/(\d+) days?/, "$1d")
          .replace(/(\d+) hours?/, "$1h")
          .replace(/(\d+) minutes?/, "$1m")
          .replace(/(\d+) seconds?/, "$1s"),
        m = o ? u.replace(/ ago$/, "") : u;
      return s ? m.replace(/^in /, "") : m;
    },
    "M",
    0,
    (e, t) => (0, i.t)() - e < t,
  ]);
};
