// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(309265),
    a = e.i(526372),
    n = e.i(137949),
    o = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          d,
          u,
          c,
          m,
          p,
          f = (0, i.c)(23),
          {
            hasNextPage: I,
            isFetchingNextPage: h,
            onFetchNextPage: y,
            label: g,
            autoLoad: x,
            autoLoadHasMore: v,
            scrollRootRef: b,
            rootMargin: C,
            className: w,
          } = e,
          M = void 0 !== x && x,
          { t: k } = (0, l.f)(),
          U = M && (v ?? I);
        f[0] !== h || f[1] !== y || f[2] !== C || f[3] !== b || f[4] !== U
          ? ((s = {
              hasMore: U,
              isLoading: h,
              onLoadMore: y,
              root: b,
              rootMargin: C,
            }),
            (f[0] = h),
            (f[1] = y),
            (f[2] = C),
            (f[3] = b),
            (f[4] = U),
            (f[5] = s))
          : (s = f[5]);
        let { sentinelRef: _ } = (0, a.f)(s),
          j = (0, r.f)() ?? "comfortable";
        return I || h
          ? (f[6] !== w
              ? ((d = (0, o.c)("relative", w)), (f[6] = w), (f[7] = d))
              : (d = f[7]),
            f[8] !== M || f[9] !== _
              ? ((u = M
                  ? (0, t.jsx)("div", {
                      ref: _,
                      "aria-hidden": !0,
                      "data-testid": "feed-load-more-sentinel",
                      className: "absolute inset-x-0 top-0 h-px",
                    })
                  : null),
                (f[8] = M),
                (f[9] = _),
                (f[10] = u))
              : (u = f[10]),
            f[11] !== g || f[12] !== k
              ? ((c = g ?? k("web.feed.show_more_callouts")),
                (f[11] = g),
                (f[12] = k),
                (f[13] = c))
              : (c = f[13]),
            f[14] !== j || f[15] !== h || f[16] !== y || f[17] !== c
              ? ((m = (0, t.jsx)(n.r, {
                  kind: "loadMore",
                  density: j,
                  label: c,
                  busy: h,
                  onClick: y,
                })),
                (f[14] = j),
                (f[15] = h),
                (f[16] = y),
                (f[17] = c),
                (f[18] = m))
              : (m = f[18]),
            f[19] !== d || f[20] !== u || f[21] !== m
              ? ((p = (0, t.jsxs)("div", { className: d, children: [u, m] })),
                (f[19] = d),
                (f[20] = u),
                (f[21] = m),
                (f[22] = p))
              : (p = f[22]),
            p)
          : null;
      },
    ],
    42413,
  );
  var s = e.i(705313),
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
  var p = e.i(844510),
    f = e.i(372550),
    I = e.i(606178),
    h = e.i(403352),
    y = e.i(897665),
    g = e.i(279602);
  function x() {
    let e,
      t,
      l = (0, i.c)(7),
      r = (0, c.k)(),
      a = (0, c.x)(),
      n = "none" !== r,
      s = n ? p.C : void 0;
    return (
      l[0] !== a || l[1] !== n
        ? ((e = n
            ? (function ({ density: e, insetClassName: t, className: i }) {
                return (0, o.c)(p.m[e], "gap-2", t ?? I.U[e], i);
              })({ density: a, insetClassName: m[a] })
            : v),
          (l[0] = a),
          (l[1] = n),
          (l[2] = e))
        : (e = l[2]),
      l[3] !== a || l[4] !== s || l[5] !== e
        ? ((t = { density: a, insetClassName: s, filterBarClassName: e }),
          (l[3] = a),
          (l[4] = s),
          (l[5] = e),
          (l[6] = t))
        : (t = l[6]),
      t
    );
  }
  let v = "flex items-center gap-2 px-5 pb-2 pt-3";
  e.s(
    [
      "c",
      0,
      function (e) {
        let l,
          r,
          a,
          n,
          c,
          m = (0, i.c)(16),
          {
            address: p,
            username: f,
            profileImage: I,
            density: x,
            shape: v,
            avatarDecoration: b,
          } = e,
          C = void 0 === v ? "round" : v,
          w = h.B[x],
          M = (0, g.f)(b),
          k = "round" === C ? M : null,
          U = "round" === C ? "rounded-full" : "rounded-md",
          _ = h.j[x];
        (m[0] !== U || m[1] !== _
          ? ((l = (0, o.c)("shrink-0 border border-border-secondary", U, _)),
            (m[0] = U),
            (m[1] = _),
            (m[2] = l))
          : (l = m[2]),
          m[3] !== f ? ((r = f?.trim()), (m[3] = f), (m[4] = r)) : (r = m[4]));
        let j = !r;
        return (
          m[5] !== I ? ((a = (0, u.f)(I)), (m[5] = I), (m[6] = a)) : (a = m[6]),
          m[7] !== p || m[8] !== w || m[9] !== l || m[10] !== j || m[11] !== a
            ? ((n = (0, t.jsx)(s.f, {
                address: p,
                alt: "",
                className: l,
                height: w,
                ipfsPrefix: y.f,
                isAnonymous: j,
                src: a,
                width: w,
              })),
              (m[7] = p),
              (m[8] = w),
              (m[9] = l),
              (m[10] = j),
              (m[11] = a),
              (m[12] = n))
            : (n = m[12]),
          m[13] !== k || m[14] !== n
            ? ((c = (0, t.jsx)(d.f, {
                decoration: k,
                variant: "list",
                children: n,
              })),
              (m[13] = k),
              (m[14] = n),
              (m[15] = c))
            : (c = m[15]),
          c
        );
      },
      "E",
      0,
      function (e) {
        let r,
          a,
          n,
          o = (0, i.c)(14),
          { labelKey: s, value: d, options: u, onSelect: c } = e,
          { t: m } = (0, l.f)(),
          { density: p } = x();
        if (
          (o[0] !== s || o[1] !== m
            ? ((r = m(s)), (o[0] = s), (o[1] = m), (o[2] = r))
            : (r = o[2]),
          o[3] !== u || o[4] !== m)
        ) {
          let e;
          (o[6] !== m
            ? ((e = (e) => ({ value: e.value, label: m(e.labelKey) })),
              (o[6] = m),
              (o[7] = e))
            : (e = o[7]),
            (a = u.map(e)),
            (o[3] = u),
            (o[4] = m),
            (o[5] = a));
        } else a = o[5];
        return (
          o[8] !== p || o[9] !== c || o[10] !== r || o[11] !== a || o[12] !== d
            ? ((n = (0, t.jsx)(f.f, {
                density: p,
                "aria-label": r,
                value: d,
                onChange: c,
                options: a,
                "data-testid": "leaderboard-filter-trigger",
              })),
              (o[8] = p),
              (o[9] = c),
              (o[10] = r),
              (o[11] = a),
              (o[12] = d),
              (o[13] = n))
            : (n = o[13]),
          n
        );
      },
      "n",
      0,
      x,
    ],
    538661,
  );
};
