// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    i = e.i(465085),
    a = e.i(983737),
    n = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(338319);
  function d(e, r) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "flex items-center gap-3 border-t border-border-secondary px-4 py-3 first:border-t-0",
        children: [
          (0, t.jsx)("div", {
            className: "h-3 w-5 animate-pulse rounded bg-bg-quaternary",
          }),
          (0, t.jsx)("div", {
            className: "size-10 animate-pulse rounded-full bg-bg-quaternary",
          }),
          (0, t.jsx)("div", {
            className: "h-3.5 w-32 animate-pulse rounded bg-bg-quaternary",
          }),
          (0, t.jsx)("div", {
            className:
              "ml-auto h-3.5 w-20 animate-pulse rounded bg-bg-tertiary",
          }),
        ],
      },
      r,
    );
  }
  e.s([
    "B",
    0,
    (e) => {
      let l,
        n,
        s,
        o,
        d = (0, r.c)(9),
        { children: u, ariaLabel: c, testId: m } = e,
        p = (0, a.f)() ?? !1;
      return (
        d[0] !== p
          ? ((l = !p && { opacity: 0, y: 64 }), (d[0] = p), (d[1] = l))
          : (l = d[1]),
        d[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = { opacity: 1, y: 0 }), (d[2] = n))
          : (n = d[2]),
        d[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = { delay: 0.25, duration: 0.55, ease: [0.33, 1, 0.68, 1] }),
            (d[3] = s))
          : (s = d[3]),
        d[4] !== c || d[5] !== u || d[6] !== l || d[7] !== m
          ? ((o = (0, t.jsx)(i.f.section, {
              "aria-label": c,
              "data-testid": m,
              initial: l,
              animate: n,
              transition: s,
              className:
                "overflow-hidden rounded-3xl border border-border-tertiary bg-bg-primary",
              children: u,
            })),
            (d[4] = c),
            (d[5] = u),
            (d[6] = l),
            (d[7] = m),
            (d[8] = o))
          : (o = d[8]),
        o
      );
    },
    "D",
    0,
    (e) => {
      let l,
        i,
        a,
        n = (0, r.c)(8),
        { title: s, description: o, children: d } = e;
      return (
        n[0] !== s
          ? ((l = (0, t.jsx)("p", {
              className: "text-base font-semibold text-text-primary",
              children: s,
            })),
            (n[0] = s),
            (n[1] = l))
          : (l = n[1]),
        n[2] !== o
          ? ((i = o
              ? (0, t.jsx)("p", {
                  className: "text-sm text-text-tertiary",
                  children: o,
                })
              : null),
            (n[2] = o),
            (n[3] = i))
          : (i = n[3]),
        n[4] !== d || n[5] !== l || n[6] !== i
          ? ((a = (0, t.jsxs)("div", {
              "data-testid": "leaderboard-board-empty",
              className:
                "flex flex-col items-center gap-1 rounded-3xl border border-border-tertiary px-6 py-12 text-center",
              children: [l, i, d],
            })),
            (n[4] = d),
            (n[5] = l),
            (n[6] = i),
            (n[7] = a))
          : (a = n[7]),
        a
      );
    },
    "C",
    0,
    (e) => {
      let l,
        i,
        a,
        n,
        o = (0, r.c)(10),
        { message: d, onRetry: u } = e,
        { t: c } = (0, s.f)();
      return (
        o[0] !== d
          ? ((l = (0, t.jsx)("p", {
              className: "text-sm text-text-tertiary",
              children: d,
            })),
            (o[0] = d),
            (o[1] = l))
          : (l = o[1]),
        o[2] !== c
          ? ((i = c("web.common.try_again")), (o[2] = c), (o[3] = i))
          : (i = o[3]),
        o[4] !== u || o[5] !== i
          ? ((a = (0, t.jsx)("button", {
              type: "button",
              onClick: u,
              className:
                "mt-3 rounded-full border border-border-tertiary px-4 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-tertiary",
              children: i,
            })),
            (o[4] = u),
            (o[5] = i),
            (o[6] = a))
          : (a = o[6]),
        o[7] !== l || o[8] !== a
          ? ((n = (0, t.jsxs)("div", {
              "data-testid": "leaderboard-board-error",
              className:
                "flex flex-col items-center rounded-3xl border border-border-tertiary px-6 py-12 text-center",
              children: [l, a],
            })),
            (o[7] = l),
            (o[8] = a),
            (o[9] = n))
          : (n = o[9]),
        n
      );
    },
    "R",
    0,
    (e) => {
      let l,
        i,
        a = (0, r.c)(5),
        { rows: n, testId: s } = e,
        o = void 0 === n ? 8 : n,
        u = void 0 === s ? "leaderboard-board-skeleton" : s;
      return (
        a[0] !== o
          ? ((l = Array.from({ length: o }).map(d)), (a[0] = o), (a[1] = l))
          : (l = a[1]),
        a[2] !== l || a[3] !== u
          ? ((i = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": u,
              className:
                "overflow-hidden rounded-3xl border border-border-tertiary",
              children: l,
            })),
            (a[2] = l),
            (a[3] = u),
            (a[4] = i))
          : (i = a[4]),
        i
      );
    },
    "S",
    0,
    { 1: "text-[#FFD700]", 2: "text-[#C0C0C0]", 3: "text-[#CD7F32]" },
    "Y",
    0,
    () => {
      let e,
        i,
        d,
        u,
        c,
        m,
        p,
        h = (0, r.c)(15),
        { t: f } = (0, s.f)(),
        [g, y] = (0, n.useState)(!1),
        b = (0, a.f)() ?? !1;
      (h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            let e = () => {
              y(window.scrollY > 700);
            };
            return (
              e(),
              window.addEventListener("scroll", e, { passive: !0 }),
              () => window.removeEventListener("scroll", e)
            );
          }),
          (i = []),
          (h[0] = e),
          (h[1] = i))
        : ((e = h[0]), (i = h[1])),
        (0, n.useEffect)(e, i),
        h[2] !== f
          ? ((d = f("web.common.scroll_to_top")), (h[2] = f), (h[3] = d))
          : (d = h[3]));
      let v = !g,
        w = g ? 0 : -1;
      h[4] !== b
        ? ((u = () =>
            window.scrollTo({ top: 0, behavior: b ? "auto" : "smooth" })),
          (h[4] = b),
          (h[5] = u))
        : (u = h[5]);
      let x = g
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-3 opacity-0";
      return (
        h[6] !== x
          ? ((c = (0, o.c)(
              "fixed bottom-6 right-6 z-40 rounded-full border border-border-tertiary bg-bg-secondary p-3 text-text-primary shadow-lg transition-all",
              x,
            )),
            (h[6] = x),
            (h[7] = c))
          : (c = h[7]),
        h[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, t.jsx)(l.DD, { className: "size-4" })), (h[8] = m))
          : (m = h[8]),
        h[9] !== d || h[10] !== v || h[11] !== w || h[12] !== u || h[13] !== c
          ? ((p = (0, t.jsx)("button", {
              type: "button",
              "aria-label": d,
              "aria-hidden": v,
              tabIndex: w,
              onClick: u,
              className: c,
              children: m,
            })),
            (h[9] = d),
            (h[10] = v),
            (h[11] = w),
            (h[12] = u),
            (h[13] = c),
            (h[14] = p))
          : (p = h[14]),
        p
      );
    },
  ]);
};
