// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(426091),
    n = e.i(352386);
  e.i(12692);
  var l = e.i(398902);
  function s(e) {
    return (0, i.c)(
      "inline-flex h-9 min-w-9 items-center justify-center whitespace-nowrap rounded-md border text-sm font-medium transition-colors",
      e
        ? "border-border-secondary bg-bg-secondary text-text-primary shadow-sm"
        : "border-transparent text-text-tertiary hover:border-border-secondary hover:bg-bg-tertiary/60 hover:text-text-primary",
    );
  }
  function o(e) {
    return (0, i.c)(
      "inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors",
      e
        ? "pointer-events-none cursor-not-allowed text-text-tertiary/40"
        : "text-text-tertiary hover:bg-bg-tertiary/60 hover:text-text-primary",
    );
  }
  let c = (e) => {
    let a,
      n,
      l,
      s,
      o = (0, r.c)(8);
    return (
      o[0] !== e
        ? (({ className: a, ...n } = e), (o[0] = e), (o[1] = a), (o[2] = n))
        : ((a = o[1]), (n = o[2])),
      o[3] !== a
        ? ((l = (0, i.c)("mx-auto flex w-full justify-center", a)),
          (o[3] = a),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== n || o[6] !== l
        ? ((s = (0, t.jsx)("nav", {
            role: "navigation",
            "aria-label": "pagination",
            className: l,
            ...n,
          })),
          (o[5] = n),
          (o[6] = l),
          (o[7] = s))
        : (s = o[7]),
      s
    );
  };
  c.displayName = "Pagination";
  let d = n.forwardRef((e, a) => {
    let n,
      l,
      s,
      o,
      c = (0, r.c)(9);
    return (
      c[0] !== e
        ? (({ className: n, ...l } = e), (c[0] = e), (c[1] = n), (c[2] = l))
        : ((n = c[1]), (l = c[2])),
      c[3] !== n
        ? ((s = (0, i.c)("flex flex-row flex-wrap items-center gap-1", n)),
          (c[3] = n),
          (c[4] = s))
        : (s = c[4]),
      c[5] !== l || c[6] !== a || c[7] !== s
        ? ((o = (0, t.jsx)("ul", { ref: a, className: s, ...l })),
          (c[5] = l),
          (c[6] = a),
          (c[7] = s),
          (c[8] = o))
        : (o = c[8]),
      o
    );
  });
  d.displayName = "PaginationContent";
  let m = n.forwardRef((e, a) => {
    let n,
      l,
      s,
      o,
      c = (0, r.c)(9);
    return (
      c[0] !== e
        ? (({ className: n, ...l } = e), (c[0] = e), (c[1] = n), (c[2] = l))
        : ((n = c[1]), (l = c[2])),
      c[3] !== n ? ((s = (0, i.c)("", n)), (c[3] = n), (c[4] = s)) : (s = c[4]),
      c[5] !== l || c[6] !== a || c[7] !== s
        ? ((o = (0, t.jsx)("li", { ref: a, className: s, ...l })),
          (c[5] = l),
          (c[6] = a),
          (c[7] = s),
          (c[8] = o))
        : (o = c[8]),
      o
    );
  });
  m.displayName = "PaginationItem";
  let u = n.forwardRef((e, a) => {
    let n,
      l,
      o,
      c,
      d,
      m = (0, r.c)(12);
    m[0] !== e
      ? (({ className: n, isActive: l, ...o } = e),
        (m[0] = e),
        (m[1] = n),
        (m[2] = l),
        (m[3] = o))
      : ((n = m[1]), (l = m[2]), (o = m[3]));
    let u = l ? "page" : void 0;
    return (
      m[4] !== n || m[5] !== l
        ? ((c = (0, i.c)(s(l), n)), (m[4] = n), (m[5] = l), (m[6] = c))
        : (c = m[6]),
      m[7] !== o || m[8] !== a || m[9] !== u || m[10] !== c
        ? ((d = (0, t.jsx)("a", {
            ref: a,
            "aria-current": u,
            className: c,
            ...o,
          })),
          (m[7] = o),
          (m[8] = a),
          (m[9] = u),
          (m[10] = c),
          (m[11] = d))
        : (d = m[11]),
      d
    );
  });
  u.displayName = "PaginationLink";
  let f = n.forwardRef((e, n) => {
    let s,
      c,
      d,
      m,
      u,
      f,
      h,
      p,
      x = (0, r.c)(18);
    x[0] !== e
      ? (({ className: s, ...c } = e), (x[0] = e), (x[1] = s), (x[2] = c))
      : ((s = x[1]), (c = x[2]));
    let { t: g } = (0, l.f)();
    return (
      x[3] !== g
        ? ((d = g("web.pagination.go_to_previous_page")),
          (x[3] = g),
          (x[4] = d))
        : (d = x[4]),
      x[5] !== s
        ? ((m = (0, i.c)(o(!1), s)), (x[5] = s), (x[6] = m))
        : (m = x[6]),
      x[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(a.S, { className: "h-4 w-4 shrink-0" })), (x[7] = u))
        : (u = x[7]),
      x[8] !== g
        ? ((f = g("web.pagination.previous")), (x[8] = g), (x[9] = f))
        : (f = x[9]),
      x[10] !== f
        ? ((h = (0, t.jsx)("span", { children: f })), (x[10] = f), (x[11] = h))
        : (h = x[11]),
      x[12] !== c || x[13] !== n || x[14] !== d || x[15] !== m || x[16] !== h
        ? ((p = (0, t.jsxs)("a", {
            ref: n,
            "aria-label": d,
            className: m,
            ...c,
            children: [u, h],
          })),
          (x[12] = c),
          (x[13] = n),
          (x[14] = d),
          (x[15] = m),
          (x[16] = h),
          (x[17] = p))
        : (p = x[17]),
      p
    );
  });
  f.displayName = "PaginationPrevious";
  let h = n.forwardRef((e, n) => {
    let s,
      c,
      d,
      m,
      u,
      f,
      h,
      p,
      x = (0, r.c)(18);
    x[0] !== e
      ? (({ className: s, ...c } = e), (x[0] = e), (x[1] = s), (x[2] = c))
      : ((s = x[1]), (c = x[2]));
    let { t: g } = (0, l.f)();
    return (
      x[3] !== g
        ? ((d = g("web.pagination.go_to_next_page")), (x[3] = g), (x[4] = d))
        : (d = x[4]),
      x[5] !== s
        ? ((m = (0, i.c)(o(!1), s)), (x[5] = s), (x[6] = m))
        : (m = x[6]),
      x[7] !== g
        ? ((u = g("common.next")), (x[7] = g), (x[8] = u))
        : (u = x[8]),
      x[9] !== u
        ? ((f = (0, t.jsx)("span", { children: u })), (x[9] = u), (x[10] = f))
        : (f = x[10]),
      x[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (0, t.jsx)(a.kK, { className: "h-4 w-4 shrink-0" })),
          (x[11] = h))
        : (h = x[11]),
      x[12] !== c || x[13] !== n || x[14] !== d || x[15] !== m || x[16] !== f
        ? ((p = (0, t.jsxs)("a", {
            ref: n,
            "aria-label": d,
            className: m,
            ...c,
            children: [f, h],
          })),
          (x[12] = c),
          (x[13] = n),
          (x[14] = d),
          (x[15] = m),
          (x[16] = f),
          (x[17] = p))
        : (p = x[17]),
      p
    );
  });
  h.displayName = "PaginationNext";
  let p = (e) => {
    let a,
      n,
      s,
      o,
      c,
      d,
      m = (0, r.c)(13);
    m[0] !== e
      ? (({ className: a, ...n } = e), (m[0] = e), (m[1] = a), (m[2] = n))
      : ((a = m[1]), (n = m[2]));
    let { t: u } = (0, l.f)();
    return (
      m[3] !== a
        ? ((s = (0, i.c)(
            "flex h-9 min-w-9 items-center justify-center text-text-tertiary",
            a,
          )),
          (m[3] = a),
          (m[4] = s))
        : (s = m[4]),
      m[5] !== u
        ? ((o = u("web.pagination.more_pages")), (m[5] = u), (m[6] = o))
        : (o = m[6]),
      m[7] !== o
        ? ((c = (0, t.jsx)("span", { className: "sr-only", children: o })),
          (m[7] = o),
          (m[8] = c))
        : (c = m[8]),
      m[9] !== n || m[10] !== s || m[11] !== c
        ? ((d = (0, t.jsxs)("span", {
            "aria-hidden": !0,
            className: s,
            ...n,
            children: ["…", c],
          })),
          (m[9] = n),
          (m[10] = s),
          (m[11] = c),
          (m[12] = d))
        : (d = m[12]),
      d
    );
  };
  ((p.displayName = "PaginationEllipsis"),
    e.s([
      "B",
      0,
      c,
      "C",
      0,
      d,
      "z",
      0,
      p,
      "w",
      0,
      m,
      "c",
      0,
      u,
      "T",
      0,
      h,
      "x",
      0,
      f,
      "$",
      0,
      s,
      "A",
      0,
      o,
    ]));
};
