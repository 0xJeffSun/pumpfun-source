// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(453706),
    a = e.i(352386),
    n = e.i(338319);
  let s = (0, i.default)(() => e.A(179843).then((e) => e.LineChartCellChart), {
      loadableGenerated: { modules: [708937] },
      ssr: !1,
    }),
    l = (e) => {
      let i,
        a,
        s,
        l = (0, r.c)(5),
        { className: o } = e;
      return (
        l[0] !== o
          ? ((i = (0, n.c)("flex h-8 w-16 items-center justify-center", o)),
            (l[0] = o),
            (l[1] = i))
          : (i = l[1]),
        l[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("div", {
              className: "h-6 w-14 animate-pulse rounded bg-muted/60",
            })),
            (l[2] = a))
          : (a = l[2]),
        l[3] !== i
          ? ((s = (0, t.jsx)("div", { className: i, children: a })),
            (l[3] = i),
            (l[4] = s))
          : (s = l[4]),
        s
      );
    },
    o = (e) => {
      let i,
        a,
        s = (0, r.c)(4),
        { className: l } = e;
      return (
        s[0] !== l
          ? ((i = (0, n.c)(
              "flex h-8 w-16 items-center justify-center text-xs text-text-tertiary",
              l,
            )),
            (s[0] = l),
            (s[1] = i))
          : (i = s[1]),
        s[2] !== i
          ? ((a = (0, t.jsx)("div", { className: i, children: "-" })),
            (s[2] = i),
            (s[3] = a))
          : (a = s[3]),
        a
      );
    },
    c = a.default.memo(
      (e) => {
        let i,
          a,
          c,
          m = (0, r.c)(11),
          { data: d, isLoading: u, error: h, className: x } = e;
        if (void 0 !== u && u) {
          let e;
          return (
            m[0] !== x
              ? ((e = (0, t.jsx)(l, { className: x })), (m[0] = x), (m[1] = e))
              : (e = m[1]),
            e
          );
        }
        if ((void 0 === h ? null : h) || !d || d.length <= 1) {
          let e;
          return (
            m[2] !== x
              ? ((e = (0, t.jsx)(o, { className: x })), (m[2] = x), (m[3] = e))
              : (e = m[3]),
            e
          );
        }
        return (
          m[4] !== x
            ? ((i = (0, n.c)(
                "relative flex h-8 w-16 items-center justify-self-center transition-all duration-200 hover:scale-110 hover:brightness-110",
                x,
              )),
              (m[4] = x),
              (m[5] = i))
            : (i = m[5]),
          m[6] !== d
            ? ((a = (0, t.jsx)(s, { data: d })), (m[6] = d), (m[7] = a))
            : (a = m[7]),
          m[8] !== i || m[9] !== a
            ? ((c = (0, t.jsx)("div", { className: i, children: a })),
              (m[8] = i),
              (m[9] = a),
              (m[10] = c))
            : (c = m[10]),
          c
        );
      },
      (e, t) =>
        e.isLoading === t.isLoading &&
        e.error === t.error &&
        e.className === t.className &&
        (e.data && t.data
          ? e.data.length === t.data.length &&
            e.data[e.data.length - 1]?.close ===
              t.data[t.data.length - 1]?.close
          : e.data === t.data),
    );
  e.s(["f", 0, c]);
};
