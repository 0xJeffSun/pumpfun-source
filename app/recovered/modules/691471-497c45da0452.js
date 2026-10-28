// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(928529),
    l = e.i(34011);
  let a = "/perps/hyperliquid-mark.svg",
    n = "Hyperliquid";
  e.s(["$", 0, n, "A", 0, a], 404411);
  var s = e.i(338319);
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
          f,
          p,
          h,
          x,
          b = (0, i.c)(29),
          {
            market: v,
            size: y,
            ringClassName: g,
            testIdPrefix: w,
            className: j,
          } = e,
          k = void 0 === g ? "ring-bg-primary" : g;
        b[0] !== y
          ? ((o = (0, l.coinChainCornerSize)(y)), (b[0] = y), (b[1] = o))
          : (o = b[1]);
        let N = o;
        (b[2] !== j
          ? ((d = (0, s.c)("relative block shrink-0", j)),
            (b[2] = j),
            (b[3] = d))
          : (d = b[3]),
          b[4] !== y
            ? ((c = { width: y, height: y }), (b[4] = y), (b[5] = c))
            : (c = b[5]),
          b[6] !== v.coin ||
          b[7] !== v.displayName ||
          b[8] !== v.imageUri ||
          b[9] !== v.ticker
            ? ((u = {
                mint: v.coin,
                name: v.displayName,
                symbol: v.ticker,
                image_uri: v.imageUri,
              }),
              (b[6] = v.coin),
              (b[7] = v.displayName),
              (b[8] = v.imageUri),
              (b[9] = v.ticker),
              (b[10] = u))
            : (u = b[10]));
        let _ = v.imageBackdrop ?? null;
        b[11] !== y || b[12] !== u || b[13] !== _ || b[14] !== w
          ? ((m = (0, t.jsx)(l.CoinAvatar, {
              coin: u,
              size: y,
              verified: !1,
              hideCorner: !0,
              backdrop: _,
              testIdPrefix: w,
            })),
            (b[11] = y),
            (b[12] = u),
            (b[13] = _),
            (b[14] = w),
            (b[15] = m))
          : (m = b[15]);
        let S = w ? `${w}-venue` : void 0;
        return (
          b[16] !== k
            ? ((f = (0, s.c)("rounded-full ring-2", k)),
              (b[16] = k),
              (b[17] = f))
            : (f = b[17]),
          b[18] !== N || b[19] !== f
            ? ((p = (0, t.jsx)(r.default, {
                src: a,
                alt: n,
                width: N,
                height: N,
                className: f,
              })),
              (b[18] = N),
              (b[19] = f),
              (b[20] = p))
            : (p = b[20]),
          b[21] !== p || b[22] !== S
            ? ((h = (0, t.jsx)("span", {
                "data-testid": S,
                "data-venue": "hyperliquid",
                className: "absolute -bottom-0.5 -right-0.5 flex",
                children: p,
              })),
              (b[21] = p),
              (b[22] = S),
              (b[23] = h))
            : (h = b[23]),
          b[24] !== h || b[25] !== d || b[26] !== c || b[27] !== m
            ? ((x = (0, t.jsxs)("span", {
                className: d,
                style: c,
                children: [m, h],
              })),
              (b[24] = h),
              (b[25] = d),
              (b[26] = c),
              (b[27] = m),
              (b[28] = x))
            : (x = b[28]),
          x
        );
      },
    ],
    691471,
  );
};
