// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(322315),
    i = e.i(254010),
    a = e.i(458310),
    r = e.i(790658),
    s = e.i(691471),
    o = e.i(702470),
    d = e.i(662986),
    u = e.i(499141);
  e.s([
    "f",
    0,
    function (e) {
      let c,
        m,
        f,
        p,
        h = (0, l.c)(17),
        {
          coin: g,
          perp: x,
          multiple: b,
          onOpenMarket: y,
          hideMarketIdentity: w,
        } = e,
        v = void 0 !== w && w,
        _ = (0, o.f)({ coin: g }).data ?? null,
        I = (0, i.k)(n.D.WEB_PERPS, !1);
      h[0] !== g || h[1] !== _
        ? ((c = _ ?? {
            coin: g,
            displayName: (0, d.j)(g),
            ticker: (0, d.j)(g),
            imageUri: null,
          }),
          (h[0] = g),
          (h[1] = _),
          (h[2] = c))
        : (c = h[2]);
      let N = c;
      return (
        h[3] !== g || h[4] !== v || h[5] !== N || h[6] !== y || h[7] !== I
          ? ((m = v
              ? null
              : I
                ? (0, t.jsxs)(a.default, {
                    href: (0, u.o)(g),
                    onClick: y,
                    "data-testid": "callout-detail-perp-identity",
                    className:
                      "flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80 @[904px]:hidden",
                    children: [
                      (0, t.jsx)(s.f, { market: N, size: 36 }),
                      (0, t.jsxs)("span", {
                        className: "flex min-w-0 flex-col",
                        children: [
                          (0, t.jsx)("span", {
                            className:
                              "truncate text-sm font-semibold leading-5 text-text-primary",
                            children: N.ticker,
                          }),
                          N.displayName !== N.ticker
                            ? (0, t.jsx)("span", {
                                className:
                                  "truncate text-xs leading-4 text-text-tertiary",
                                children: N.displayName,
                              })
                            : null,
                        ],
                      }),
                    ],
                  })
                : (0, t.jsxs)("div", {
                    "data-testid": "callout-detail-perp-identity",
                    className:
                      "flex min-w-0 items-center gap-2 @[904px]:hidden",
                    children: [
                      (0, t.jsx)(s.f, { market: N, size: 36 }),
                      (0, t.jsxs)("span", {
                        className: "flex min-w-0 flex-col",
                        children: [
                          (0, t.jsx)("span", {
                            className:
                              "truncate text-sm font-semibold leading-5 text-text-primary",
                            children: N.ticker,
                          }),
                          N.displayName !== N.ticker
                            ? (0, t.jsx)("span", {
                                className:
                                  "truncate text-xs leading-4 text-text-tertiary",
                                children: N.displayName,
                              })
                            : null,
                        ],
                      }),
                    ],
                  })),
            (h[3] = g),
            (h[4] = v),
            (h[5] = N),
            (h[6] = y),
            (h[7] = I),
            (h[8] = m))
          : (m = h[8]),
        h[9] !== _?.szDecimals || h[10] !== b || h[11] !== x
          ? ((f = x
              ? (0, t.jsx)(r.f, {
                  perp: x,
                  szDecimals: _?.szDecimals,
                  multiple: b,
                })
              : null),
            (h[9] = _?.szDecimals),
            (h[10] = b),
            (h[11] = x),
            (h[12] = f))
          : (f = h[12]),
        h[13] !== g || h[14] !== m || h[15] !== f
          ? ((p = (0, t.jsxs)("div", {
              className: "flex w-full flex-col gap-2",
              "data-testid": "callout-detail-perp-position",
              "data-coin": g,
              children: [m, f],
            })),
            (h[13] = g),
            (h[14] = m),
            (h[15] = f),
            (h[16] = p))
          : (p = h[16]),
        p
      );
    },
  ]);
};
