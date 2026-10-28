// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(309265),
    l = e.i(526372),
    i = e.i(137949),
    n = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          d,
          u,
          c,
          m,
          f,
          p = (0, t.c)(23),
          {
            hasNextPage: h,
            isFetchingNextPage: g,
            onFetchNextPage: x,
            label: v,
            autoLoad: w,
            autoLoadHasMore: y,
            scrollRootRef: b,
            rootMargin: j,
            className: N,
          } = e,
          _ = void 0 !== w && w,
          { t: A } = (0, r.f)(),
          k = _ && (y ?? h);
        p[0] !== g || p[1] !== x || p[2] !== j || p[3] !== b || p[4] !== k
          ? ((o = {
              hasMore: k,
              isLoading: g,
              onLoadMore: x,
              root: b,
              rootMargin: j,
            }),
            (p[0] = g),
            (p[1] = x),
            (p[2] = j),
            (p[3] = b),
            (p[4] = k),
            (p[5] = o))
          : (o = p[5]);
        let { sentinelRef: I } = (0, l.f)(o),
          C = (0, s.f)() ?? "comfortable";
        return h || g
          ? (p[6] !== N
              ? ((d = (0, n.c)("relative", N)), (p[6] = N), (p[7] = d))
              : (d = p[7]),
            p[8] !== _ || p[9] !== I
              ? ((u = _
                  ? (0, a.jsx)("div", {
                      ref: I,
                      "aria-hidden": !0,
                      "data-testid": "feed-load-more-sentinel",
                      className: "absolute inset-x-0 top-0 h-px",
                    })
                  : null),
                (p[8] = _),
                (p[9] = I),
                (p[10] = u))
              : (u = p[10]),
            p[11] !== v || p[12] !== A
              ? ((c = v ?? A("web.feed.show_more_callouts")),
                (p[11] = v),
                (p[12] = A),
                (p[13] = c))
              : (c = p[13]),
            p[14] !== C || p[15] !== g || p[16] !== x || p[17] !== c
              ? ((m = (0, a.jsx)(i.r, {
                  kind: "loadMore",
                  density: C,
                  label: c,
                  busy: g,
                  onClick: x,
                })),
                (p[14] = C),
                (p[15] = g),
                (p[16] = x),
                (p[17] = c),
                (p[18] = m))
              : (m = p[18]),
            p[19] !== d || p[20] !== u || p[21] !== m
              ? ((f = (0, a.jsxs)("div", { className: d, children: [u, m] })),
                (p[19] = d),
                (p[20] = u),
                (p[21] = m),
                (p[22] = f))
              : (f = p[22]),
            f)
          : null;
      },
    ],
    42413,
  );
  var o = e.i(705313),
    d = e.i(953283),
    u = e.i(741084),
    c = e.i(116549);
  let m = { terminal: "px-1", comfortable: "px-1.5" };
  e.s(
    [
      "V",
      0,
      {
        terminal: "-mx-[var(--screeners-pad,0px)] px-1",
        comfortable: "-mx-[var(--screeners-pad,0px)] px-1.5",
      },
      "j",
      0,
      m,
      "r",
      0,
      {
        terminal: "h-auto min-h-8 flex-wrap gap-y-[7px] py-[3.5px]",
        comfortable: "h-auto min-h-10 flex-wrap gap-y-[11px] py-[5.5px]",
      },
    ],
    124498,
  );
  var f = e.i(844510),
    p = e.i(372550),
    h = e.i(606178),
    g = e.i(403352),
    x = e.i(897665),
    v = e.i(279602);
  function w() {
    let e,
      a,
      r = (0, t.c)(7),
      s = (0, c.k)(),
      l = (0, c.x)(),
      i = "none" !== s,
      o = i ? f.C : void 0;
    return (
      r[0] !== l || r[1] !== i
        ? ((e = i
            ? (function ({ density: e, insetClassName: a, className: t }) {
                return (0, n.c)(f.m[e], "gap-2", a ?? h.U[e], t);
              })({ density: l, insetClassName: m[l] })
            : y),
          (r[0] = l),
          (r[1] = i),
          (r[2] = e))
        : (e = r[2]),
      r[3] !== l || r[4] !== o || r[5] !== e
        ? ((a = { density: l, insetClassName: o, filterBarClassName: e }),
          (r[3] = l),
          (r[4] = o),
          (r[5] = e),
          (r[6] = a))
        : (a = r[6]),
      a
    );
  }
  let y = "flex items-center gap-2 px-5 pb-2 pt-3";
  e.s(
    [
      "c",
      0,
      function (e) {
        let r,
          s,
          l,
          i,
          c,
          m = (0, t.c)(16),
          {
            address: f,
            username: p,
            profileImage: h,
            density: w,
            shape: y,
            avatarDecoration: b,
          } = e,
          j = void 0 === y ? "round" : y,
          N = g.B[w],
          _ = (0, v.f)(b),
          A = "round" === j ? _ : null,
          k = "round" === j ? "rounded-full" : "rounded-md",
          I = g.j[w];
        (m[0] !== k || m[1] !== I
          ? ((r = (0, n.c)("shrink-0 border border-border-secondary", k, I)),
            (m[0] = k),
            (m[1] = I),
            (m[2] = r))
          : (r = m[2]),
          m[3] !== p ? ((s = p?.trim()), (m[3] = p), (m[4] = s)) : (s = m[4]));
        let C = !s;
        return (
          m[5] !== h ? ((l = (0, u.f)(h)), (m[5] = h), (m[6] = l)) : (l = m[6]),
          m[7] !== f || m[8] !== N || m[9] !== r || m[10] !== C || m[11] !== l
            ? ((i = (0, a.jsx)(o.f, {
                address: f,
                alt: "",
                className: r,
                height: N,
                ipfsPrefix: x.f,
                isAnonymous: C,
                src: l,
                width: N,
              })),
              (m[7] = f),
              (m[8] = N),
              (m[9] = r),
              (m[10] = C),
              (m[11] = l),
              (m[12] = i))
            : (i = m[12]),
          m[13] !== A || m[14] !== i
            ? ((c = (0, a.jsx)(d.f, {
                decoration: A,
                variant: "list",
                children: i,
              })),
              (m[13] = A),
              (m[14] = i),
              (m[15] = c))
            : (c = m[15]),
          c
        );
      },
      "E",
      0,
      function (e) {
        let s,
          l,
          i,
          n = (0, t.c)(14),
          { labelKey: o, value: d, options: u, onSelect: c } = e,
          { t: m } = (0, r.f)(),
          { density: f } = w();
        if (
          (n[0] !== o || n[1] !== m
            ? ((s = m(o)), (n[0] = o), (n[1] = m), (n[2] = s))
            : (s = n[2]),
          n[3] !== u || n[4] !== m)
        ) {
          let e;
          (n[6] !== m
            ? ((e = (e) => ({ value: e.value, label: m(e.labelKey) })),
              (n[6] = m),
              (n[7] = e))
            : (e = n[7]),
            (l = u.map(e)),
            (n[3] = u),
            (n[4] = m),
            (n[5] = l));
        } else l = n[5];
        return (
          n[8] !== f || n[9] !== c || n[10] !== s || n[11] !== l || n[12] !== d
            ? ((i = (0, a.jsx)(p.f, {
                density: f,
                "aria-label": s,
                value: d,
                onChange: c,
                options: l,
                "data-testid": "leaderboard-filter-trigger",
              })),
              (n[8] = f),
              (n[9] = c),
              (n[10] = s),
              (n[11] = l),
              (n[12] = d),
              (n[13] = i))
            : (i = n[13]),
          i
        );
      },
      "n",
      0,
      w,
    ],
    538661,
  );
};
