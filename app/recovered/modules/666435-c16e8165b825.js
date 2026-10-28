// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(346204),
    n = e.i(634661),
    l = e.i(542417),
    o = e.i(892544);
  let c = [],
    d = "flex w-full min-w-0 flex-1 flex-col";
  e.s([
    "PERPS_PAGE_COLUMN_CLASS",
    0,
    d,
    "PerpsPage",
    0,
    function () {
      let e,
        u,
        m,
        p,
        f,
        x,
        g,
        h,
        b,
        y = (0, r.c)(26),
        { t: v } = (0, a.f)(),
        [w, N] = (0, i.useState)("all");
      y[0] !== w ? ((e = { category: w }), (y[0] = w), (y[1] = e)) : (e = y[1]);
      let { data: j, isLoading: k, isError: C, refetch: P } = (0, l.f)(e),
        _ = j ?? c,
        S = _.length > 0 ? "ready" : k ? "loading" : C ? "error" : "empty";
      (y[2] !== v
        ? ((u = v("web.perps.tabs.home")), (y[2] = v), (y[3] = u))
        : (u = y[3]),
        y[4] !== w
          ? ((m = (0, t.jsx)(s.f, {
              density: "comfortable",
              value: w,
              onChange: N,
            })),
            (y[4] = w),
            (y[5] = m))
          : (m = y[5]),
        y[6] !== u || y[7] !== m
          ? ((p = (0, t.jsx)(n._, {
              density: "comfortable",
              title: u,
              titleAs: "h1",
              action: m,
            })),
            (y[6] = u),
            (y[7] = m),
            (y[8] = p))
          : (p = y[8]));
      let I =
        "all" === w
          ? "web.screeners.empty_board"
          : "web.screeners.perps_empty_category";
      return (
        y[9] !== v || y[10] !== I
          ? ((f = v(I)), (y[9] = v), (y[10] = I), (y[11] = f))
          : (f = y[11]),
        y[12] !== v
          ? ((x = v("web.screeners.error_perps")), (y[12] = v), (y[13] = x))
          : (x = y[13]),
        y[14] !== P
          ? ((g = () => void P()), (y[14] = P), (y[15] = g))
          : (g = y[15]),
        y[16] !== _ || y[17] !== S || y[18] !== f || y[19] !== x || y[20] !== g
          ? ((h = (0, t.jsx)("div", {
              className: "border-border-tertiary border-x border-b",
              "data-testid": "perps-markets-box",
              children: (0, t.jsx)(o.f, {
                markets: _,
                status: S,
                emptyLabel: f,
                errorLabel: x,
                onRetry: g,
              }),
            })),
            (y[16] = _),
            (y[17] = S),
            (y[18] = f),
            (y[19] = x),
            (y[20] = g),
            (y[21] = h))
          : (h = y[21]),
        y[22] !== w || y[23] !== p || y[24] !== h
          ? ((b = (0, t.jsxs)("div", {
              "data-wide-page": !0,
              className: d,
              "data-testid": "perps-page",
              "data-category": w,
              children: [p, h],
            })),
            (y[22] = w),
            (y[23] = p),
            (y[24] = h),
            (y[25] = b))
          : (b = y[25]),
        b
      );
    },
  ]);
};
