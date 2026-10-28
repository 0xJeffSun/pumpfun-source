// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(618860),
    i = e.i(205073),
    r = e.i(338319),
    l = e.i(90832);
  function m(e) {
    return null == e ? "—" : e.toLocaleString("en-US");
  }
  function c(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: (0, r.c)(
          "flex flex-col gap-2 px-5 py-5 lg:px-7",
          s.N,
          "max-lg:[&:nth-child(n+3)]:border-t max-lg:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l",
        ),
        children: [
          (0, t.jsx)("span", { className: s.r, children: e.label }),
          (0, t.jsx)("span", {
            className:
              "font-medium text-[32px] text-text-primary leading-10 tracking-[-0.03em] tabular-nums md:text-[38px]",
            children: e.value,
          }),
        ],
      },
      e.label,
    );
  }
  function o() {
    let e,
      a = (0, n.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            className: (0, r.c)(s.O, "h-[211px] animate-pulse lg:h-[106px]"),
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  }
  e.s([
    "MayhemStatsRow",
    0,
    function () {
      let e,
        d,
        u,
        h,
        x,
        f,
        p,
        b,
        y,
        _,
        g,
        v,
        w,
        j,
        N,
        k,
        S = (0, n.c)(42),
        { t: E } = (0, a.f)();
      S[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = { queryOptions: { refetchInterval: 3e4 } }), (S[0] = e))
        : (e = S[0]);
      let { data: M, isLoading: C, isError: A } = (0, i.f)(e);
      if (C) {
        let e;
        return (
          S[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(o, {})), (S[1] = e))
            : (e = S[1]),
          e
        );
      }
      if (A || !M) {
        let e, n;
        return (
          S[2] !== E
            ? ((e = E("web.mayhem.stats_unavailable")), (S[2] = E), (S[3] = e))
            : (e = S[3]),
          S[4] !== e
            ? ((n = (0, t.jsx)("p", {
                className: "text-sm text-text-tertiary",
                children: e,
              })),
              (S[4] = e),
              (S[5] = n))
            : (n = S[5]),
          n
        );
      }
      let { agentVolumeUsd: R, distinctTraders: O, coinsCreated: I } = M;
      (S[6] !== E
        ? ((d = E("web.mayhem.stat_active_coins")), (S[6] = E), (S[7] = d))
        : (d = S[7]),
        S[8] !== M.activeCoins
          ? ((u = m(M.activeCoins)), (S[8] = M.activeCoins), (S[9] = u))
          : (u = S[9]),
        S[10] !== d || S[11] !== u
          ? ((h = { label: d, value: u }),
            (S[10] = d),
            (S[11] = u),
            (S[12] = h))
          : (h = S[12]),
        S[13] !== E
          ? ((x = E("web.mayhem.stat_agent_vol_24h")), (S[13] = E), (S[14] = x))
          : (x = S[14]));
      let T = R?.["24h"];
      if (S[15] !== T)
        ((f = null == T ? "—" : (0, l.v)(T)), (S[15] = T), (S[16] = f));
      else f = S[16];
      (S[17] !== x || S[18] !== f
        ? ((p = { label: x, value: f }), (S[17] = x), (S[18] = f), (S[19] = p))
        : (p = S[19]),
        S[20] !== E
          ? ((b = E("web.mayhem.stat_launched_24h")), (S[20] = E), (S[21] = b))
          : (b = S[21]));
      let U = I?.["24h"];
      (S[22] !== U ? ((y = m(U)), (S[22] = U), (S[23] = y)) : (y = S[23]),
        S[24] !== y || S[25] !== b
          ? ((_ = { label: b, value: y }),
            (S[24] = y),
            (S[25] = b),
            (S[26] = _))
          : (_ = S[26]),
        S[27] !== E
          ? ((g = E("web.mayhem.stat_traders_24h")), (S[27] = E), (S[28] = g))
          : (g = S[28]));
      let F = O?.["24h"];
      (S[29] !== F ? ((v = m(F)), (S[29] = F), (S[30] = v)) : (v = S[30]),
        S[31] !== g || S[32] !== v
          ? ((w = { label: g, value: v }),
            (S[31] = g),
            (S[32] = v),
            (S[33] = w))
          : (w = S[33]),
        S[34] !== _ || S[35] !== w || S[36] !== h || S[37] !== p
          ? ((j = [h, p, _, w]),
            (S[34] = _),
            (S[35] = w),
            (S[36] = h),
            (S[37] = p),
            (S[38] = j))
          : (j = S[38]));
      let $ = j;
      return (
        S[39] === Symbol.for("react.memo_cache_sentinel")
          ? ((N = (0, r.c)(
              s.O,
              s.z,
              "grid grid-cols-2 overflow-hidden lg:grid-cols-4",
            )),
            (S[39] = N))
          : (N = S[39]),
        S[40] !== $
          ? ((k = (0, t.jsx)("div", { className: N, children: $.map(c) })),
            (S[40] = $),
            (S[41] = k))
          : (k = S[41]),
        k
      );
    },
    "MayhemStatsRowSkeleton",
    0,
    o,
  ]);
};
