// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(906032),
    r = e.i(628127),
    i = e.i(605587);
  let s = ["watchlist", "positions", "following", "recents"],
    n = ["1d", "1w", "1m", "all"],
    o = (e) => (s.includes(e) ? e : "watchlist"),
    a = (e) => (n.includes(e) ? e : "1d"),
    l = (e) => ("string" == typeof e && "" !== e.trim() ? e : t.f),
    c = (e) => (0, i.c)(e.trim()),
    d = (e) =>
      "object" == typeof e &&
      null !== e &&
      "string" == typeof e.mint &&
      "" !== e.mint.trim(),
    u = (e) =>
      "object" == typeof e &&
      null !== e &&
      "string" == typeof e.address &&
      "" !== e.address.trim(),
    p = (e, t) => [...e].sort((e, t) => e.hiddenAt - t.hiddenAt).slice(-t),
    f = (e) =>
      "object" != typeof e || null === e
        ? {}
        : Object.fromEntries(
            p(
              Object.values(e)
                .filter(d)
                .map((e) => ({
                  mint: e.mint,
                  symbol: "string" == typeof e.symbol ? e.symbol : "",
                  hiddenAt: Number.isFinite(e.hiddenAt) ? e.hiddenAt : 0,
                })),
              200,
            ).map((e) => [(0, i.c)(e.mint), e]),
          ),
    m = (e) =>
      "object" != typeof e || null === e
        ? {}
        : Object.fromEntries(
            p(
              Object.values(e)
                .filter(u)
                .map((e) => ({
                  address: e.address,
                  username: "string" == typeof e.username ? e.username : "",
                  hiddenAt: Number.isFinite(e.hiddenAt) ? e.hiddenAt : 0,
                })),
              200,
            ).map((e) => [c(e.address), e]),
          ),
    b = (e) => !0 === e,
    h = (0, r.f)({
      name: "token-info-bar",
      version: 1,
      fields: {
        mode: { default: "watchlist", coerce: o },
        watchlistId: { default: t.f, coerce: l },
        pnlPeriod: { default: "1d", coerce: a },
        hiddenTokens: { default: {}, coerce: f },
        hiddenProfiles: { default: {}, coerce: m },
        hideStablecoins: { default: !1, coerce: b },
      },
      extra: (e) => ({
        setMode: (t) => e({ mode: o(t) }),
        setWatchlistId: (t) => e({ watchlistId: l(t) }),
        setPnlPeriod: (t) => e({ pnlPeriod: a(t) }),
        hideToken: ({ mint: t, symbol: r }) =>
          e((e) => ({
            hiddenTokens: f({
              ...e.hiddenTokens,
              [(0, i.c)(t)]: {
                mint: t,
                symbol: (r ?? "").trim().replace(/^\$/, ""),
                hiddenAt: Date.now(),
              },
            }),
          })),
        unhideToken: (t) =>
          e((e) => {
            let { [(0, i.c)(t)]: r, ...s } = e.hiddenTokens;
            return { hiddenTokens: s };
          }),
        unhideAllTokens: () => e({ hiddenTokens: {} }),
        hideProfile: ({ address: t, username: r }) =>
          e((e) => ({
            hiddenProfiles: m({
              ...e.hiddenProfiles,
              [c(t)]: {
                address: t,
                username: (r ?? "").trim().replace(/^@/, ""),
                hiddenAt: Date.now(),
              },
            }),
          })),
        unhideProfile: (t) =>
          e((e) => {
            let { [c(t)]: r, ...i } = e.hiddenProfiles;
            return { hiddenProfiles: i };
          }),
        unhideAllProfiles: () => e({ hiddenProfiles: {} }),
        setHideStablecoins: (t) => e({ hideStablecoins: b(t) }),
      }),
    });
  e.s([
    "u",
    0,
    n,
    "K",
    0,
    { "1d": "1D", "1w": "1W", "1m": "1M", all: "All" },
    "W",
    0,
    m,
    "j",
    0,
    f,
    "G",
    0,
    b,
    "Y",
    0,
    o,
    "C",
    0,
    a,
    "X",
    0,
    l,
    "M",
    0,
    c,
    "L",
    0,
    h,
  ]);
};
