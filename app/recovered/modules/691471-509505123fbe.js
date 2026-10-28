// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(928529),
    a = e.i(34011);
  let s = "/perps/hyperliquid-mark.svg",
    n = "Hyperliquid";
  e.s(["$", 0, n, "A", 0, s], 404411);
  var l = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          c,
          d,
          u,
          m,
          p,
          f,
          x,
          g,
          h = (0, r.c)(29),
          {
            market: b,
            size: y,
            ringClassName: v,
            testIdPrefix: w,
            className: N,
          } = e,
          j = void 0 === v ? "ring-bg-primary" : v;
        h[0] !== y
          ? ((o = (0, a.coinChainCornerSize)(y)), (h[0] = y), (h[1] = o))
          : (o = h[1]);
        let k = o;
        (h[2] !== N
          ? ((c = (0, l.c)("relative block shrink-0", N)),
            (h[2] = N),
            (h[3] = c))
          : (c = h[3]),
          h[4] !== y
            ? ((d = { width: y, height: y }), (h[4] = y), (h[5] = d))
            : (d = h[5]),
          h[6] !== b.coin ||
          h[7] !== b.displayName ||
          h[8] !== b.imageUri ||
          h[9] !== b.ticker
            ? ((u = {
                mint: b.coin,
                name: b.displayName,
                symbol: b.ticker,
                image_uri: b.imageUri,
              }),
              (h[6] = b.coin),
              (h[7] = b.displayName),
              (h[8] = b.imageUri),
              (h[9] = b.ticker),
              (h[10] = u))
            : (u = h[10]));
        let C = b.imageBackdrop ?? null;
        h[11] !== y || h[12] !== u || h[13] !== C || h[14] !== w
          ? ((m = (0, t.jsx)(a.CoinAvatar, {
              coin: u,
              size: y,
              verified: !1,
              hideCorner: !0,
              backdrop: C,
              testIdPrefix: w,
            })),
            (h[11] = y),
            (h[12] = u),
            (h[13] = C),
            (h[14] = w),
            (h[15] = m))
          : (m = h[15]);
        let P = w ? `${w}-venue` : void 0;
        return (
          h[16] !== j
            ? ((p = (0, l.c)("rounded-full ring-2", j)),
              (h[16] = j),
              (h[17] = p))
            : (p = h[17]),
          h[18] !== k || h[19] !== p
            ? ((f = (0, t.jsx)(i.default, {
                src: s,
                alt: n,
                width: k,
                height: k,
                className: p,
              })),
              (h[18] = k),
              (h[19] = p),
              (h[20] = f))
            : (f = h[20]),
          h[21] !== f || h[22] !== P
            ? ((x = (0, t.jsx)("span", {
                "data-testid": P,
                "data-venue": "hyperliquid",
                className: "absolute -bottom-0.5 -right-0.5 flex",
                children: f,
              })),
              (h[21] = f),
              (h[22] = P),
              (h[23] = x))
            : (x = h[23]),
          h[24] !== x || h[25] !== c || h[26] !== d || h[27] !== m
            ? ((g = (0, t.jsxs)("span", {
                className: c,
                style: d,
                children: [m, x],
              })),
              (h[24] = x),
              (h[25] = c),
              (h[26] = d),
              (h[27] = m),
              (h[28] = g))
            : (g = h[28]),
          g
        );
      },
    ],
    691471,
  );
};
