// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(338319);
  let n = "animate-pulse bg-bg-tertiary";
  function a(e) {
    return void 0 !== e && e >= 40 ? "rounded-xl" : "rounded-md";
  }
  e.s([
    "e",
    0,
    n,
    "l",
    0,
    function (e) {
      let o,
        l,
        s,
        d,
        c,
        u,
        m,
        h,
        p,
        f,
        b,
        g,
        x = (0, r.c)(28);
      x[0] !== e
        ? (({
            variant: u,
            size: d,
            width: m,
            height: l,
            className: o,
            style: c,
            ...s
          } = e),
          (x[0] = e),
          (x[1] = o),
          (x[2] = l),
          (x[3] = s),
          (x[4] = d),
          (x[5] = c),
          (x[6] = u),
          (x[7] = m))
        : ((o = x[1]),
          (l = x[2]),
          (s = x[3]),
          (d = x[4]),
          (c = x[5]),
          (u = x[6]),
          (m = x[7]));
      let v = void 0 === u ? "bar" : u;
      if (
        x[8] !== o ||
        x[9] !== l ||
        x[10] !== d ||
        x[11] !== c ||
        x[12] !== v ||
        x[13] !== m
      ) {
        let e,
          t =
            "circle" === v ? "rounded-full" : "art" === v ? a(d) : "rounded-md",
          r = d ?? m,
          s = d ?? l;
        (x[18] !== c || x[19] !== r || x[20] !== s
          ? ((e = { width: r, height: s, ...c }),
            (x[18] = c),
            (x[19] = r),
            (x[20] = s),
            (x[21] = e))
          : (e = x[21]),
          (h = e),
          (p = !0),
          (f = v),
          (b = (0, i.c)(n, t, "shrink-0", o)),
          (x[8] = o),
          (x[9] = l),
          (x[10] = d),
          (x[11] = c),
          (x[12] = v),
          (x[13] = m),
          (x[14] = h),
          (x[15] = p),
          (x[16] = f),
          (x[17] = b));
      } else ((h = x[14]), (p = x[15]), (f = x[16]), (b = x[17]));
      return (
        x[22] !== h || x[23] !== s || x[24] !== p || x[25] !== f || x[26] !== b
          ? ((g = (0, t.jsx)("div", {
              "aria-hidden": p,
              "data-skeleton": f,
              className: b,
              style: h,
              ...s,
            })),
            (x[22] = h),
            (x[23] = s),
            (x[24] = p),
            (x[25] = f),
            (x[26] = b),
            (x[27] = g))
          : (g = x[27]),
        g
      );
    },
    "R",
    0,
    a,
  ]);
};
