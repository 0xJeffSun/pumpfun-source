// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(928529),
    i = e.i(34011);
  let a = "/perps/hyperliquid-mark.svg",
    s = "Hyperliquid";
  e.s(["$", 0, s, "A", 0, a], 404411);
  var n = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          d,
          c,
          u,
          m,
          p,
          f,
          x,
          h,
          g = (0, l.c)(29),
          {
            market: y,
            size: v,
            ringClassName: b,
            testIdPrefix: w,
            className: j,
          } = e,
          N = void 0 === b ? "ring-bg-primary" : b;
        g[0] !== v
          ? ((o = (0, i.coinChainCornerSize)(v)), (g[0] = v), (g[1] = o))
          : (o = g[1]);
        let I = o;
        (g[2] !== j
          ? ((d = (0, n.c)("relative block shrink-0", j)),
            (g[2] = j),
            (g[3] = d))
          : (d = g[3]),
          g[4] !== v
            ? ((c = { width: v, height: v }), (g[4] = v), (g[5] = c))
            : (c = g[5]),
          g[6] !== y.coin ||
          g[7] !== y.displayName ||
          g[8] !== y.imageUri ||
          g[9] !== y.ticker
            ? ((u = {
                mint: y.coin,
                name: y.displayName,
                symbol: y.ticker,
                image_uri: y.imageUri,
              }),
              (g[6] = y.coin),
              (g[7] = y.displayName),
              (g[8] = y.imageUri),
              (g[9] = y.ticker),
              (g[10] = u))
            : (u = g[10]));
        let _ = y.imageBackdrop ?? null;
        g[11] !== v || g[12] !== u || g[13] !== _ || g[14] !== w
          ? ((m = (0, t.jsx)(i.CoinAvatar, {
              coin: u,
              size: v,
              verified: !1,
              hideCorner: !0,
              backdrop: _,
              testIdPrefix: w,
            })),
            (g[11] = v),
            (g[12] = u),
            (g[13] = _),
            (g[14] = w),
            (g[15] = m))
          : (m = g[15]);
        let k = w ? `${w}-venue` : void 0;
        return (
          g[16] !== N
            ? ((p = (0, n.c)("rounded-full ring-2", N)),
              (g[16] = N),
              (g[17] = p))
            : (p = g[17]),
          g[18] !== I || g[19] !== p
            ? ((f = (0, t.jsx)(r.default, {
                src: a,
                alt: s,
                width: I,
                height: I,
                className: p,
              })),
              (g[18] = I),
              (g[19] = p),
              (g[20] = f))
            : (f = g[20]),
          g[21] !== f || g[22] !== k
            ? ((x = (0, t.jsx)("span", {
                "data-testid": k,
                "data-venue": "hyperliquid",
                className: "absolute -bottom-0.5 -right-0.5 flex",
                children: f,
              })),
              (g[21] = f),
              (g[22] = k),
              (g[23] = x))
            : (x = g[23]),
          g[24] !== x || g[25] !== d || g[26] !== c || g[27] !== m
            ? ((h = (0, t.jsxs)("span", {
                className: d,
                style: c,
                children: [m, x],
              })),
              (g[24] = x),
              (g[25] = d),
              (g[26] = c),
              (g[27] = m),
              (g[28] = h))
            : (h = g[28]),
          h
        );
      },
    ],
    691471,
  );
};
