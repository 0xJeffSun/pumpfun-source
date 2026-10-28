// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "/perps",
    n = (e) => `${t}/${encodeURIComponent(e)}`,
    r = /^\/perps\/(?!position(?:\/|$))[^/]+\/?$/;
  e.s([
    "z",
    0,
    t,
    "L",
    0,
    (e) => "string" == typeof e && r.test(e),
    "o",
    0,
    n,
    "h",
    0,
    (e, t) => {
      let r = new URLSearchParams();
      for (let [e, n] of Object.entries(t))
        if (void 0 !== n)
          for (let t of Array.isArray(n) ? n : [n]) r.append(e, t);
      let o = r.toString();
      return o.length > 0 ? `${n(e)}?${o}` : n(e);
    },
    "t",
    0,
    (e) => ("long" === e || "short" === e ? e : null),
  ]);
};
