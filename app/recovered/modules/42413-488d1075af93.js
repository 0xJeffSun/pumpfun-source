// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(309265),
    l = e.i(526372),
    a = e.i(137949),
    s = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          c,
          u,
          d,
          m,
          f,
          h = (0, r.c)(23),
          {
            hasNextPage: p,
            isFetchingNextPage: g,
            onFetchNextPage: b,
            label: x,
            autoLoad: v,
            autoLoadHasMore: y,
            scrollRootRef: w,
            rootMargin: j,
            className: N,
          } = e,
          C = void 0 !== v && v,
          { t: _ } = (0, n.f)(),
          k = C && (y ?? p);
        h[0] !== g || h[1] !== b || h[2] !== j || h[3] !== w || h[4] !== k
          ? ((o = {
              hasMore: k,
              isLoading: g,
              onLoadMore: b,
              root: w,
              rootMargin: j,
            }),
            (h[0] = g),
            (h[1] = b),
            (h[2] = j),
            (h[3] = w),
            (h[4] = k),
            (h[5] = o))
          : (o = h[5]);
        let { sentinelRef: S } = (0, l.f)(o),
          A = (0, i.f)() ?? "comfortable";
        return p || g
          ? (h[6] !== N
              ? ((c = (0, s.c)("relative", N)), (h[6] = N), (h[7] = c))
              : (c = h[7]),
            h[8] !== C || h[9] !== S
              ? ((u = C
                  ? (0, t.jsx)("div", {
                      ref: S,
                      "aria-hidden": !0,
                      "data-testid": "feed-load-more-sentinel",
                      className: "absolute inset-x-0 top-0 h-px",
                    })
                  : null),
                (h[8] = C),
                (h[9] = S),
                (h[10] = u))
              : (u = h[10]),
            h[11] !== x || h[12] !== _
              ? ((d = x ?? _("web.feed.show_more_callouts")),
                (h[11] = x),
                (h[12] = _),
                (h[13] = d))
              : (d = h[13]),
            h[14] !== A || h[15] !== g || h[16] !== b || h[17] !== d
              ? ((m = (0, t.jsx)(a.r, {
                  kind: "loadMore",
                  density: A,
                  label: d,
                  busy: g,
                  onClick: b,
                })),
                (h[14] = A),
                (h[15] = g),
                (h[16] = b),
                (h[17] = d),
                (h[18] = m))
              : (m = h[18]),
            h[19] !== c || h[20] !== u || h[21] !== m
              ? ((f = (0, t.jsxs)("div", { className: c, children: [u, m] })),
                (h[19] = c),
                (h[20] = u),
                (h[21] = m),
                (h[22] = f))
              : (f = h[22]),
            f)
          : null;
      },
    ],
    42413,
  );
  var o = e.i(705313),
    c = e.i(953283),
    u = e.i(741084),
    d = e.i(116549);
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
    h = e.i(372550),
    p = e.i(606178),
    g = e.i(403352),
    b = e.i(897665),
    x = e.i(279602);
  function v() {
    let e,
      t,
      n = (0, r.c)(7),
      i = (0, d.k)(),
      l = (0, d.x)(),
      a = "none" !== i,
      o = a ? f.C : void 0;
    return (
      n[0] !== l || n[1] !== a
        ? ((e = a
            ? (function ({ density: e, insetClassName: t, className: r }) {
                return (0, s.c)(f.m[e], "gap-2", t ?? p.U[e], r);
              })({ density: l, insetClassName: m[l] })
            : y),
          (n[0] = l),
          (n[1] = a),
          (n[2] = e))
        : (e = n[2]),
      n[3] !== l || n[4] !== o || n[5] !== e
        ? ((t = { density: l, insetClassName: o, filterBarClassName: e }),
          (n[3] = l),
          (n[4] = o),
          (n[5] = e),
          (n[6] = t))
        : (t = n[6]),
      t
    );
  }
  let y = "flex items-center gap-2 px-5 pb-2 pt-3";
  e.s(
    [
      "c",
      0,
      function (e) {
        let n,
          i,
          l,
          a,
          d,
          m = (0, r.c)(16),
          {
            address: f,
            username: h,
            profileImage: p,
            density: v,
            shape: y,
            avatarDecoration: w,
          } = e,
          j = void 0 === y ? "round" : y,
          N = g.B[v],
          C = (0, x.f)(w),
          _ = "round" === j ? C : null,
          k = "round" === j ? "rounded-full" : "rounded-md",
          S = g.j[v];
        (m[0] !== k || m[1] !== S
          ? ((n = (0, s.c)("shrink-0 border border-border-secondary", k, S)),
            (m[0] = k),
            (m[1] = S),
            (m[2] = n))
          : (n = m[2]),
          m[3] !== h ? ((i = h?.trim()), (m[3] = h), (m[4] = i)) : (i = m[4]));
        let A = !i;
        return (
          m[5] !== p ? ((l = (0, u.f)(p)), (m[5] = p), (m[6] = l)) : (l = m[6]),
          m[7] !== f || m[8] !== N || m[9] !== n || m[10] !== A || m[11] !== l
            ? ((a = (0, t.jsx)(o.f, {
                address: f,
                alt: "",
                className: n,
                height: N,
                ipfsPrefix: b.f,
                isAnonymous: A,
                src: l,
                width: N,
              })),
              (m[7] = f),
              (m[8] = N),
              (m[9] = n),
              (m[10] = A),
              (m[11] = l),
              (m[12] = a))
            : (a = m[12]),
          m[13] !== _ || m[14] !== a
            ? ((d = (0, t.jsx)(c.f, {
                decoration: _,
                variant: "list",
                children: a,
              })),
              (m[13] = _),
              (m[14] = a),
              (m[15] = d))
            : (d = m[15]),
          d
        );
      },
      "E",
      0,
      function (e) {
        let i,
          l,
          a,
          s = (0, r.c)(14),
          { labelKey: o, value: c, options: u, onSelect: d } = e,
          { t: m } = (0, n.f)(),
          { density: f } = v();
        if (
          (s[0] !== o || s[1] !== m
            ? ((i = m(o)), (s[0] = o), (s[1] = m), (s[2] = i))
            : (i = s[2]),
          s[3] !== u || s[4] !== m)
        ) {
          let e;
          (s[6] !== m
            ? ((e = (e) => ({ value: e.value, label: m(e.labelKey) })),
              (s[6] = m),
              (s[7] = e))
            : (e = s[7]),
            (l = u.map(e)),
            (s[3] = u),
            (s[4] = m),
            (s[5] = l));
        } else l = s[5];
        return (
          s[8] !== f || s[9] !== d || s[10] !== i || s[11] !== l || s[12] !== c
            ? ((a = (0, t.jsx)(h.f, {
                density: f,
                "aria-label": i,
                value: c,
                onChange: d,
                options: l,
                "data-testid": "leaderboard-filter-trigger",
              })),
              (s[8] = f),
              (s[9] = d),
              (s[10] = i),
              (s[11] = l),
              (s[12] = c),
              (s[13] = a))
            : (a = s[13]),
          a
        );
      },
      "n",
      0,
      v,
    ],
    538661,
  );
};
