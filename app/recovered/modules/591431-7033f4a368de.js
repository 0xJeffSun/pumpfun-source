// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386),
    a = e.i(773755),
    n = e.i(600656),
    i = e.i(689794),
    s = e.i(929360),
    o = e.i(493367),
    c = e.i(741430);
  let d = o.W;
  function u(e) {
    let l,
      a = (0, r.c)(7),
      {
        view: o,
        variant: u,
        window: f,
        rail: h,
        railLabelKey: p,
        columnIds: x,
      } = e,
      b = void 0 === u ? c.f : u,
      g = void 0 !== h && h;
    if ("table" === o) {
      let e;
      return (
        a[0] !== x || a[1] !== g || a[2] !== p || a[3] !== b || a[4] !== f
          ? ((e = (0, t.jsx)("div", {
              className: "min-w-0 w-full",
              children:
                "social-terminal" === b
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        g
                          ? (0, t.jsx)(s.MoversCardSkeleton, { labelKey: p })
                          : null,
                        (0, t.jsx)(i.ExploreTableSkeleton, {
                          columnIds: x,
                          window: f,
                        }),
                      ],
                    })
                  : (0, t.jsx)(n.TableSkeleton, {}),
            })),
            (a[0] = x),
            (a[1] = g),
            (a[2] = p),
            (a[3] = b),
            (a[4] = f),
            (a[5] = e))
          : (e = a[5]),
        e
      );
    }
    return (
      a[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)("div", {
            className:
              "mb-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:gap-x-4 sm:gap-y-6",
            children: Array.from({ length: d }).map(m),
          })),
          (a[6] = l))
        : (l = a[6]),
      l
    );
  }
  function m(e, r) {
    return (0, t.jsx)(a.f, {}, r);
  }
  var f = e.i(751275),
    h = e.i(678700),
    p = e.i(946129),
    x = e.i(524517),
    b = e.i(530501),
    g = e.i(84121),
    v = e.i(294707),
    y = e.i(709119),
    w = e.i(947427),
    j = e.i(346431),
    _ = e.i(810680);
  let C = () => () => {},
    N = () => (0, _.i)() ?? _.x;
  function k() {
    return _.x;
  }
  e.s(
    [
      "HomeFeedSuspenseFallback",
      0,
      function () {
        let e,
          a,
          n,
          i = (0, r.c)(13),
          s = (0, l.useSyncExternalStore)(C, N, k),
          o = (0, f.y)(),
          { urlWindow: c } = (0, y.f)(),
          d = (() => {
            let e,
              t = (0, r.c)(6),
              l = (0, f.y)(),
              { homeSort: a } = (0, p.f)(),
              { homeFeed: n } = (0, h.N)(),
              { homeOffset: i } = (0, g.f)(),
              [s] = (0, x.f)();
            return (
              t[0] !== n || t[1] !== i || t[2] !== a || t[3] !== s || t[4] !== l
                ? ((e = (0, v.H)({
                    variant: l,
                    homeLayout: "table",
                    homeFeed: n,
                    sort: a,
                    offset: i,
                    searchTerm: s,
                    hasActiveFilters: !1,
                  })),
                  (t[0] = n),
                  (t[1] = i),
                  (t[2] = a),
                  (t[3] = s),
                  (t[4] = l),
                  (t[5] = e))
                : (e = t[5]),
              e
            );
          })(),
          { homeSort: m } = (0, p.f)(),
          [_] = (0, x.f)(),
          S = (() => {
            let e,
              t,
              l = (0, r.c)(6),
              { homeSort: a } = (0, p.f)(),
              { homeFeed: n } = (0, h.N)(),
              [i] = (0, x.f)(),
              s = n === h.z.WATCHLIST;
            l[0] !== i ? ((e = i.trim()), (l[0] = i), (l[1] = e)) : (e = l[1]);
            let o = "" !== e;
            return (
              l[2] !== a || l[3] !== s || l[4] !== o
                ? ((t = (0, b.R)({
                    sort: a,
                    isWatchlistView: s,
                    hasSearchTerm: o,
                  })),
                  (l[2] = a),
                  (l[3] = s),
                  (l[4] = o),
                  (l[5] = t))
                : (t = l[5]),
              t
            );
          })();
        return (
          i[0] !== m ? ((e = (0, w.p)(m)), (i[0] = m), (i[1] = e)) : (e = i[1]),
          i[2] !== m || i[3] !== _ || i[4] !== c
            ? ((a = c
                ? (0, j.u)({
                    sort: m,
                    window: c,
                    hasSearchTerm: "" !== _.trim(),
                  })
                : void 0),
              (i[2] = m),
              (i[3] = _),
              (i[4] = c),
              (i[5] = a))
            : (a = i[5]),
          i[6] !== S ||
          i[7] !== d ||
          i[8] !== e ||
          i[9] !== a ||
          i[10] !== o ||
          i[11] !== s
            ? ((n = (0, t.jsx)(u, {
                columnIds: S,
                rail: d,
                railLabelKey: e,
                variant: o,
                view: s,
                window: a,
              })),
              (i[6] = S),
              (i[7] = d),
              (i[8] = e),
              (i[9] = a),
              (i[10] = o),
              (i[11] = s),
              (i[12] = n))
            : (n = i[12]),
          n
        );
      },
    ],
    591431,
  );
};
