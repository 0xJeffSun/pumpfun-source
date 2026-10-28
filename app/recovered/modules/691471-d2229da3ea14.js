// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(928529),
    r = e.i(34011);
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
          m,
          c,
          u,
          f,
          x,
          h,
          p,
          v = (0, l.c)(29),
          {
            market: b,
            size: g,
            ringClassName: w,
            testIdPrefix: y,
            className: j,
          } = e,
          N = void 0 === w ? "ring-bg-primary" : w;
        v[0] !== g
          ? ((o = (0, r.coinChainCornerSize)(g)), (v[0] = g), (v[1] = o))
          : (o = v[1]);
        let k = o;
        (v[2] !== j
          ? ((d = (0, n.c)("relative block shrink-0", j)),
            (v[2] = j),
            (v[3] = d))
          : (d = v[3]),
          v[4] !== g
            ? ((m = { width: g, height: g }), (v[4] = g), (v[5] = m))
            : (m = v[5]),
          v[6] !== b.coin ||
          v[7] !== b.displayName ||
          v[8] !== b.imageUri ||
          v[9] !== b.ticker
            ? ((c = {
                mint: b.coin,
                name: b.displayName,
                symbol: b.ticker,
                image_uri: b.imageUri,
              }),
              (v[6] = b.coin),
              (v[7] = b.displayName),
              (v[8] = b.imageUri),
              (v[9] = b.ticker),
              (v[10] = c))
            : (c = v[10]));
        let S = b.imageBackdrop ?? null;
        v[11] !== g || v[12] !== c || v[13] !== S || v[14] !== y
          ? ((u = (0, t.jsx)(r.CoinAvatar, {
              coin: c,
              size: g,
              verified: !1,
              hideCorner: !0,
              backdrop: S,
              testIdPrefix: y,
            })),
            (v[11] = g),
            (v[12] = c),
            (v[13] = S),
            (v[14] = y),
            (v[15] = u))
          : (u = v[15]);
        let _ = y ? `${y}-venue` : void 0;
        return (
          v[16] !== N
            ? ((f = (0, n.c)("rounded-full ring-2", N)),
              (v[16] = N),
              (v[17] = f))
            : (f = v[17]),
          v[18] !== k || v[19] !== f
            ? ((x = (0, t.jsx)(i.default, {
                src: a,
                alt: s,
                width: k,
                height: k,
                className: f,
              })),
              (v[18] = k),
              (v[19] = f),
              (v[20] = x))
            : (x = v[20]),
          v[21] !== x || v[22] !== _
            ? ((h = (0, t.jsx)("span", {
                "data-testid": _,
                "data-venue": "hyperliquid",
                className: "absolute -bottom-0.5 -right-0.5 flex",
                children: x,
              })),
              (v[21] = x),
              (v[22] = _),
              (v[23] = h))
            : (h = v[23]),
          v[24] !== h || v[25] !== d || v[26] !== m || v[27] !== u
            ? ((p = (0, t.jsxs)("span", {
                className: d,
                style: m,
                children: [u, h],
              })),
              (v[24] = h),
              (v[25] = d),
              (v[26] = m),
              (v[27] = u),
              (v[28] = p))
            : (p = v[28]),
          p
        );
      },
    ],
    691471,
  );
};
