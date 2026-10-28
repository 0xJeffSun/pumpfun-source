// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(928529);
  e.i(12692);
  var n = e.i(398902),
    a = e.i(116549),
    o = e.i(813792),
    l = e.i(338319),
    s = e.i(187611);
  let d = (0, s.T)("Solana", "brand-name");
  function c(e) {
    let n,
      a,
      o,
      s,
      d = (0, r.c)(12),
      { venue: c, size: u } = e,
      m = c.iconSrc;
    if (d[0] !== c)
      ((n = "dex" === c.kind ? `${c.label} exchange` : `${c.label} launchpad`),
        (d[0] = c),
        (d[1] = n));
    else n = d[1];
    let h = c.isTile && "rounded-full";
    return (
      d[2] !== h
        ? ((a = (0, l.c)("shrink-0 object-contain", h)), (d[2] = h), (d[3] = a))
        : (a = d[3]),
      d[4] !== u
        ? ((o = { width: u, height: u }), (d[4] = u), (d[5] = o))
        : (o = d[5]),
      d[6] !== u ||
      d[7] !== n ||
      d[8] !== a ||
      d[9] !== o ||
      d[10] !== c.iconSrc
        ? ((s = (0, t.jsx)(i.default, {
            src: m,
            alt: n,
            width: u,
            height: u,
            className: a,
            style: o,
          })),
          (d[6] = u),
          (d[7] = n),
          (d[8] = a),
          (d[9] = o),
          (d[10] = c.iconSrc),
          (d[11] = s))
        : (s = d[11]),
      s
    );
  }
  function u(e) {
    let i,
      n,
      a,
      o,
      s = (0, r.c)(12),
      { venue: d, size: u, className: m } = e;
    (s[0] !== m
      ? ((i = (0, l.c)(
          "flex shrink-0 items-center justify-center rounded-full border bg-bg-primary",
          m,
        )),
        (s[0] = m),
        (s[1] = i))
      : (i = s[1]),
      s[2] !== u || s[3] !== d.color
        ? ((n = { width: u, height: u, borderColor: d.color }),
          (s[2] = u),
          (s[3] = d.color),
          (s[4] = n))
        : (n = s[4]));
    let h = u - 2;
    return (
      s[5] !== h || s[6] !== d
        ? ((a = (0, t.jsx)(c, { venue: d, size: h })),
          (s[5] = h),
          (s[6] = d),
          (s[7] = a))
        : (a = s[7]),
      s[8] !== i || s[9] !== n || s[10] !== a
        ? ((o = (0, t.jsx)("span", { className: i, style: n, children: a })),
          (s[8] = i),
          (s[9] = n),
          (s[10] = a),
          (s[11] = o))
        : (o = s[11]),
      o
    );
  }
  e.s([
    "z",
    0,
    24,
    "e",
    0,
    function (e) {
      let m,
        h,
        p,
        f,
        b,
        g,
        x,
        v,
        y,
        w,
        _ = (0, r.c)(52),
        { venue: k, chain: j, size: C, className: z, testId: S } = e,
        { t: N } = (0, n.f)(),
        $ = (0, a.x)();
      if (_[0] !== j || _[1] !== N || _[2] !== k.kind || _[3] !== k.label) {
        let e = (0, s.T)(k.label, "brand-name"),
          t = j ? (0, s.T)(j.name, "brand-name") : d;
        ((m =
          "dex" === k.kind
            ? N("web.coin.origin_venue_tooltip", { venue: e, chain: t })
            : N("web.coin.origin_launchpad_tooltip", {
                launchpad: e,
                chain: t,
              })),
          (_[0] = j),
          (_[1] = N),
          (_[2] = k.kind),
          (_[3] = k.label),
          (_[4] = m));
      } else m = _[4];
      let M = m;
      if (!j) {
        let e,
          r,
          i,
          n,
          a = k.label,
          s = k.kind;
        return (
          _[5] !== z
            ? ((e = (0, l.c)("flex", z)), (_[5] = z), (_[6] = e))
            : (e = _[6]),
          _[7] !== C || _[8] !== k
            ? ((r = (0, t.jsx)(u, { venue: k, size: C })),
              (_[7] = C),
              (_[8] = k),
              (_[9] = r))
            : (r = _[9]),
          _[10] !== e ||
          _[11] !== r ||
          _[12] !== S ||
          _[13] !== k.kind ||
          _[14] !== k.label
            ? ((i = (0, t.jsx)("span", {
                "data-testid": S,
                "data-venue": a,
                "data-venue-kind": s,
                className: e,
                children: r,
              })),
              (_[10] = e),
              (_[11] = r),
              (_[12] = S),
              (_[13] = k.kind),
              (_[14] = k.label),
              (_[15] = i))
            : (i = _[15]),
          _[16] !== $ || _[17] !== i || _[18] !== M
            ? ((n = (0, t.jsx)(o.f, { content: M, density: $, children: i })),
              (_[16] = $),
              (_[17] = i),
              (_[18] = M),
              (_[19] = n))
            : (n = _[19]),
          n
        );
      }
      let I = `${j.name} chain logo`;
      (_[20] !== C
        ? ((h = { width: C, height: C }), (_[20] = C), (_[21] = h))
        : (h = _[21]),
        _[22] !== j.src || _[23] !== C || _[24] !== I || _[25] !== h
          ? ((p = (0, t.jsx)(i.default, {
              src: j.src,
              alt: I,
              width: C,
              height: C,
              className: "shrink-0 rounded-full",
              style: h,
            })),
            (_[22] = j.src),
            (_[23] = C),
            (_[24] = I),
            (_[25] = h),
            (_[26] = p))
          : (p = _[26]));
      let A = p,
        T = j.slug,
        O = k.label,
        P = k.kind;
      return (
        _[27] !== z
          ? ((f = (0, l.c)(
              "inline-flex items-center gap-px rounded-full border bg-bg-primary p-px",
              z,
            )),
            (_[27] = z),
            (_[28] = f))
          : (f = _[28]),
        _[29] !== k.color
          ? ((b = { borderColor: k.color }), (_[29] = k.color), (_[30] = b))
          : (b = _[30]),
        _[31] !== C
          ? ((g = { width: C, height: C }), (_[31] = C), (_[32] = g))
          : (g = _[32]),
        _[33] !== C || _[34] !== k
          ? ((x = (0, t.jsx)(c, { venue: k, size: C })),
            (_[33] = C),
            (_[34] = k),
            (_[35] = x))
          : (x = _[35]),
        _[36] !== g || _[37] !== x
          ? ((v = (0, t.jsx)("span", {
              className: "flex shrink-0 items-center justify-center",
              style: g,
              children: x,
            })),
            (_[36] = g),
            (_[37] = x),
            (_[38] = v))
          : (v = _[38]),
        _[39] !== j.slug ||
        _[40] !== A ||
        _[41] !== v ||
        _[42] !== f ||
        _[43] !== b ||
        _[44] !== S ||
        _[45] !== k.kind ||
        _[46] !== k.label
          ? ((y = (0, t.jsxs)("span", {
              "data-testid": S,
              "data-chain": T,
              "data-venue": O,
              "data-venue-kind": P,
              "data-layout": "capsule",
              className: f,
              style: b,
              children: [A, v],
            })),
            (_[39] = j.slug),
            (_[40] = A),
            (_[41] = v),
            (_[42] = f),
            (_[43] = b),
            (_[44] = S),
            (_[45] = k.kind),
            (_[46] = k.label),
            (_[47] = y))
          : (y = _[47]),
        _[48] !== $ || _[49] !== y || _[50] !== M
          ? ((w = (0, t.jsx)(o.f, { content: M, density: $, children: y })),
            (_[48] = $),
            (_[49] = y),
            (_[50] = M),
            (_[51] = w))
          : (w = _[51]),
        w
      );
    },
    "P",
    0,
    (e) =>
      e >= 36
        ? Math.min(14, Math.max(10, Math.round(0.25 * e)))
        : Math.max(6, Math.round((10 * e) / 36)),
  ]);
};
