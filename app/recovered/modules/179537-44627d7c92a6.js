// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(465085),
    a = e.i(983737),
    o = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    l = e.i(338319);
  function c(e, r) {
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
      let n,
        o,
        s,
        l,
        c = (0, r.c)(9),
        { children: d, ariaLabel: m, testId: u } = e,
        b = (0, a.f)() ?? !1;
      return (
        c[0] !== b
          ? ((n = !b && { opacity: 0, y: 64 }), (c[0] = b), (c[1] = n))
          : (n = c[1]),
        c[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = { opacity: 1, y: 0 }), (c[2] = o))
          : (o = c[2]),
        c[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = { delay: 0.25, duration: 0.55, ease: [0.33, 1, 0.68, 1] }),
            (c[3] = s))
          : (s = c[3]),
        c[4] !== m || c[5] !== d || c[6] !== n || c[7] !== u
          ? ((l = (0, t.jsx)(i.f.section, {
              "aria-label": m,
              "data-testid": u,
              initial: n,
              animate: o,
              transition: s,
              className:
                "overflow-hidden rounded-3xl border border-border-tertiary bg-bg-primary",
              children: d,
            })),
            (c[4] = m),
            (c[5] = d),
            (c[6] = n),
            (c[7] = u),
            (c[8] = l))
          : (l = c[8]),
        l
      );
    },
    "D",
    0,
    (e) => {
      let n,
        i,
        a,
        o = (0, r.c)(8),
        { title: s, description: l, children: c } = e;
      return (
        o[0] !== s
          ? ((n = (0, t.jsx)("p", {
              className: "text-base font-semibold text-text-primary",
              children: s,
            })),
            (o[0] = s),
            (o[1] = n))
          : (n = o[1]),
        o[2] !== l
          ? ((i = l
              ? (0, t.jsx)("p", {
                  className: "text-sm text-text-tertiary",
                  children: l,
                })
              : null),
            (o[2] = l),
            (o[3] = i))
          : (i = o[3]),
        o[4] !== c || o[5] !== n || o[6] !== i
          ? ((a = (0, t.jsxs)("div", {
              "data-testid": "leaderboard-board-empty",
              className:
                "flex flex-col items-center gap-1 rounded-3xl border border-border-tertiary px-6 py-12 text-center",
              children: [n, i, c],
            })),
            (o[4] = c),
            (o[5] = n),
            (o[6] = i),
            (o[7] = a))
          : (a = o[7]),
        a
      );
    },
    "C",
    0,
    (e) => {
      let n,
        i,
        a,
        o,
        l = (0, r.c)(10),
        { message: c, onRetry: d } = e,
        { t: m } = (0, s.f)();
      return (
        l[0] !== c
          ? ((n = (0, t.jsx)("p", {
              className: "text-sm text-text-tertiary",
              children: c,
            })),
            (l[0] = c),
            (l[1] = n))
          : (n = l[1]),
        l[2] !== m
          ? ((i = m("web.common.try_again")), (l[2] = m), (l[3] = i))
          : (i = l[3]),
        l[4] !== d || l[5] !== i
          ? ((a = (0, t.jsx)("button", {
              type: "button",
              onClick: d,
              className:
                "mt-3 rounded-full border border-border-tertiary px-4 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-tertiary",
              children: i,
            })),
            (l[4] = d),
            (l[5] = i),
            (l[6] = a))
          : (a = l[6]),
        l[7] !== n || l[8] !== a
          ? ((o = (0, t.jsxs)("div", {
              "data-testid": "leaderboard-board-error",
              className:
                "flex flex-col items-center rounded-3xl border border-border-tertiary px-6 py-12 text-center",
              children: [n, a],
            })),
            (l[7] = n),
            (l[8] = a),
            (l[9] = o))
          : (o = l[9]),
        o
      );
    },
    "R",
    0,
    (e) => {
      let n,
        i,
        a = (0, r.c)(5),
        { rows: o, testId: s } = e,
        l = void 0 === o ? 8 : o,
        d = void 0 === s ? "leaderboard-board-skeleton" : s;
      return (
        a[0] !== l
          ? ((n = Array.from({ length: l }).map(c)), (a[0] = l), (a[1] = n))
          : (n = a[1]),
        a[2] !== n || a[3] !== d
          ? ((i = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": d,
              className:
                "overflow-hidden rounded-3xl border border-border-tertiary",
              children: n,
            })),
            (a[2] = n),
            (a[3] = d),
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
        c,
        d,
        m,
        u,
        b,
        h = (0, r.c)(15),
        { t: f } = (0, s.f)(),
        [x, p] = (0, o.useState)(!1),
        y = (0, a.f)() ?? !1;
      (h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = () => {
            let e = () => {
              p(window.scrollY > 700);
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
        (0, o.useEffect)(e, i),
        h[2] !== f
          ? ((c = f("web.common.scroll_to_top")), (h[2] = f), (h[3] = c))
          : (c = h[3]));
      let g = !x,
        w = x ? 0 : -1;
      h[4] !== y
        ? ((d = () =>
            window.scrollTo({ top: 0, behavior: y ? "auto" : "smooth" })),
          (h[4] = y),
          (h[5] = d))
        : (d = h[5]);
      let v = x
        ? "translate-y-0 opacity-100"
        : "pointer-events-none translate-y-3 opacity-0";
      return (
        h[6] !== v
          ? ((m = (0, l.c)(
              "fixed bottom-6 right-6 z-40 rounded-full border border-border-tertiary bg-bg-secondary p-3 text-text-primary shadow-lg transition-all",
              v,
            )),
            (h[6] = v),
            (h[7] = m))
          : (m = h[7]),
        h[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(n.DD, { className: "size-4" })), (h[8] = u))
          : (u = h[8]),
        h[9] !== c || h[10] !== g || h[11] !== w || h[12] !== d || h[13] !== m
          ? ((b = (0, t.jsx)("button", {
              type: "button",
              "aria-label": c,
              "aria-hidden": g,
              tabIndex: w,
              onClick: d,
              className: m,
              children: u,
            })),
            (h[9] = c),
            (h[10] = g),
            (h[11] = w),
            (h[12] = d),
            (h[13] = m),
            (h[14] = b))
          : (b = h[14]),
        b
      );
    },
  ]);
};
