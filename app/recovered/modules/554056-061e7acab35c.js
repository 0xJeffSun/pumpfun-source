// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(157633),
    i = e.i(412826),
    a = e.i(439587),
    l = e.i(867013),
    s = e.i(574472),
    o = e.i(928529),
    c = e.i(458310);
  e.i(12692);
  var u = e.i(398902),
    d = e.i(39065),
    f = e.i(425444),
    m = e.i(182119),
    p = e.i(352386);
  let h =
    "absolute left-0 right-0 z-10 h-3 pointer-events-none transition-opacity duration-200";
  function g(e) {
    let n,
      i,
      a,
      l,
      s,
      o,
      c,
      u = (0, r.c)(14),
      { children: d, className: f } = e,
      m = (0, p.useRef)(null),
      [g, x] = (0, p.useState)(!1),
      [v, y] = (0, p.useState)(!1);
    u[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((n = () => {
          let e = m.current;
          if (!e) return;
          let { scrollTop: t, scrollHeight: r, clientHeight: n } = e;
          (x(0 !== t), y(!(t + n >= r - 1)));
        }),
        (u[0] = n))
      : (n = u[0]);
    let b = n;
    (u[1] === Symbol.for("react.memo_cache_sentinel")
      ? ((i = () => {
          let e = m.current;
          if (!e) return;
          let { scrollHeight: t, clientHeight: r } = e;
          y(t > r);
        }),
        (a = []),
        (u[1] = i),
        (u[2] = a))
      : ((i = u[1]), (a = u[2])),
      (0, p.useEffect)(i, a));
    let w = `${h} top-0 bg-gradient-to-b from-bg-muted to-transparent ${g ? "opacity-100" : "opacity-0"}`;
    (u[3] !== w
      ? ((l = (0, t.jsx)("div", { className: w })), (u[3] = w), (u[4] = l))
      : (l = u[4]),
      u[5] !== d || u[6] !== f
        ? ((s = (0, t.jsx)("div", {
            ref: m,
            onScroll: b,
            className: f,
            children: d,
          })),
          (u[5] = d),
          (u[6] = f),
          (u[7] = s))
        : (s = u[7]));
    let _ = `${h} bottom-0 bg-gradient-to-t from-bg-muted to-transparent ${v ? "opacity-100" : "opacity-0"}`;
    return (
      u[8] !== _
        ? ((o = (0, t.jsx)("div", { className: _ })), (u[8] = _), (u[9] = o))
        : (o = u[9]),
      u[10] !== l || u[11] !== s || u[12] !== o
        ? ((c = (0, t.jsxs)("div", {
            className: "relative",
            children: [l, s, o],
          })),
          (u[10] = l),
          (u[11] = s),
          (u[12] = o),
          (u[13] = c))
        : (c = u[13]),
      c
    );
  }
  var x = e.i(70527);
  function v() {
    let e,
      n = (0, r.c)(1);
    return (
      n[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            className: "flex items-center justify-center py-16",
            children: (0, t.jsx)(i.f, {}),
          })),
          (n[0] = e))
        : (e = n[0]),
      e
    );
  }
  function y(e) {
    let n,
      i,
      l,
      s,
      d,
      f,
      m,
      p,
      h,
      g,
      x,
      v,
      y,
      b = (0, r.c)(32),
      { onCancel: w } = e,
      { t: _ } = (0, u.f)();
    return (
      b[0] !== _
        ? ((n = _("web.livestream.empty_state_alt")), (b[0] = _), (b[1] = n))
        : (n = b[1]),
      b[2] !== n
        ? ((i = (0, t.jsx)("div", {
            className: "text-center flex items-center justify-center w-full",
            children: (0, t.jsx)(o.default, {
              src: "/livestreams/start-livestream-no-coins.svg",
              alt: n,
              width: 600,
              height: 400,
              className: "w-full h-auto",
            }),
          })),
          (b[2] = n),
          (b[3] = i))
        : (i = b[3]),
      b[4] !== _
        ? ((l = _("web.livestream.create_coin_to_go_live")),
          (b[4] = _),
          (b[5] = l))
        : (l = b[5]),
      b[6] !== l
        ? ((s = (0, t.jsx)("p", {
            className: "text-xl text-text-on-muted font-semibold",
            children: l,
          })),
          (b[6] = l),
          (b[7] = s))
        : (s = b[7]),
      b[8] !== _
        ? ((d = _("web.livestream.create_coin_to_go_live_description")),
          (b[8] = _),
          (b[9] = d))
        : (d = b[9]),
      b[10] !== d
        ? ((f = (0, t.jsx)("p", {
            className: "text-sm text-text-secondary max-w-lg",
            children: d,
          })),
          (b[10] = d),
          (b[11] = f))
        : (f = b[11]),
      b[12] !== s || b[13] !== f
        ? ((m = (0, t.jsxs)("div", {
            className: "text-center flex flex-col gap-2",
            children: [s, f],
          })),
          (b[12] = s),
          (b[13] = f),
          (b[14] = m))
        : (m = b[14]),
      b[15] !== _
        ? ((p = _("common.cancel")), (b[15] = _), (b[16] = p))
        : (p = b[16]),
      b[17] !== w || b[18] !== p
        ? ((h = (0, t.jsx)(a.K, {
            variant: "secondary",
            onClick: w,
            children: p,
          })),
          (b[17] = w),
          (b[18] = p),
          (b[19] = h))
        : (h = b[19]),
      b[20] !== _
        ? ((g = _("web.nav.create_coin")), (b[20] = _), (b[21] = g))
        : (g = b[21]),
      b[22] !== w || b[23] !== g
        ? ((x = (0, t.jsx)(c.default, {
            href: "/create",
            children: (0, t.jsx)(a.K, {
              onClick: w,
              variant: "primary",
              children: g,
            }),
          })),
          (b[22] = w),
          (b[23] = g),
          (b[24] = x))
        : (x = b[24]),
      b[25] !== x || b[26] !== h
        ? ((v = (0, t.jsxs)("div", {
            className: "flex justify-between w-full items-center",
            children: [h, x],
          })),
          (b[25] = x),
          (b[26] = h),
          (b[27] = v))
        : (v = b[27]),
      b[28] !== v || b[29] !== i || b[30] !== m
        ? ((y = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-8 items-center justify-center text-center px-6",
            children: [i, m, v],
          })),
          (b[28] = v),
          (b[29] = i),
          (b[30] = m),
          (b[31] = y))
        : (y = b[31]),
      y
    );
  }
  function b(e) {
    let i,
      a,
      l,
      s,
      o,
      u,
      m,
      p,
      h = (0, r.c)(22),
      { coin: g, fallbackCoinImage: x, onSelect: v } = e,
      y = g?.mint ? `/coin/${g.mint}?startLivestream=true` : "/create",
      b = `select-coin-button-${g?.mint ?? "create-new-coin"}`;
    h[0] !== g || h[1] !== x
      ? ((i = (0, t.jsx)("div", {
          className: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-full",
          children:
            g?.image_uri && g.symbol
              ? (0, t.jsx)(f.default, {
                  src: g.image_uri,
                  alt: g.symbol ?? g.mint,
                  width: 48,
                  height: 48,
                  className: "h-full w-full object-cover",
                })
              : (0, t.jsx)("div", {
                  className:
                    "flex h-full w-full items-center justify-center bg-bg-secondary text-lg font-semibold text-white",
                  children: x,
                }),
        })),
        (h[0] = g),
        (h[1] = x),
        (h[2] = i))
      : (i = h[2]);
    let w = g?.symbol;
    (h[3] !== w
      ? ((a = (0, t.jsx)("span", {
          className: "font-semibold text-text-primary",
          children: w,
        })),
        (h[3] = w),
        (h[4] = a))
      : (a = h[4]),
      h[5] !== g?.is_currently_live
        ? ((l = g?.is_currently_live && (0, t.jsx)(d.f, {})),
          (h[5] = g?.is_currently_live),
          (h[6] = l))
        : (l = h[6]),
      h[7] !== a || h[8] !== l
        ? ((s = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [a, l],
          })),
          (h[7] = a),
          (h[8] = l),
          (h[9] = s))
        : (s = h[9]));
    let _ = g?.name;
    return (
      h[10] !== _
        ? ((o = (0, t.jsx)("p", {
            className: "text-sm text-text-primary/60",
            children: _,
          })),
          (h[10] = _),
          (h[11] = o))
        : (o = h[11]),
      h[12] !== s || h[13] !== o
        ? ((u = (0, t.jsxs)("div", {
            className: "flex-1 text-left",
            children: [s, o],
          })),
          (h[12] = s),
          (h[13] = o),
          (h[14] = u))
        : (u = h[14]),
      h[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = (0, t.jsx)("div", {
            className: "flex-shrink-0",
            children: (0, t.jsx)(n.kK, {
              className:
                "text-text-primary/60 group-hover:text-text-primary transition-all duration-200",
            }),
          })),
          (h[15] = m))
        : (m = h[15]),
      h[16] !== v || h[17] !== y || h[18] !== b || h[19] !== i || h[20] !== u
        ? ((p = (0, t.jsxs)(c.default, {
            className:
              "flex w-full items-center gap-4 rounded-2xl border border-border-tertiary bg-bg-muted p-4 transition-all hover:border-border-inverse/40 group duration-200 hover:cursor-pointer",
            href: y,
            onClick: v,
            "data-testid": b,
            children: [i, u, m],
          })),
          (h[16] = v),
          (h[17] = y),
          (h[18] = b),
          (h[19] = i),
          (h[20] = u),
          (h[21] = p))
        : (p = h[21]),
      p
    );
  }
  function w(e) {
    let i,
      a,
      l,
      s,
      o = (0, r.c)(5),
      { onSelect: c } = e;
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("p", {
            className: "text-sm text-text-on-muted/60",
            children: "...or create a new one",
          })),
          (o[0] = i))
        : (i = o[0]),
      o[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(n.YC, {})),
          (l = {
            symbol: "Create new coin",
            name: "Create a new coin to stream through",
          }),
          (o[1] = a),
          (o[2] = l))
        : ((a = o[1]), (l = o[2])),
      o[3] !== c
        ? ((s = (0, t.jsxs)("div", {
            className: "flex flex-col pt-4 gap-2",
            children: [
              i,
              (0, t.jsx)("div", {
                className: "flex justify-center",
                children: (0, t.jsx)(b, {
                  fallbackCoinImage: a,
                  coin: l,
                  onSelect: c,
                }),
              }),
            ],
          })),
          (o[3] = c),
          (o[4] = s))
        : (s = o[4]),
      s
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          a,
          o,
          c,
          d,
          f,
          p,
          h = (0, r.c)(21),
          { t: _ } = (0, u.f)(),
          { isOpen: C, onOpenChange: S } = e,
          { address: k } = (0, s.F)(),
          j = k || "";
        h[0] !== j
          ? ((i = { userAddress: j, limit: 50, offset: 0 }),
            (h[0] = j),
            (h[1] = i))
          : (i = h[1]);
        let { data: N, isLoading: I } = (0, x.f)(i);
        h[2] !== N?.coins
          ? ((a = N?.coins ?? []), (h[2] = N?.coins), (h[3] = a))
          : (a = h[3]);
        let E = a;
        h[4] !== S
          ? ((o = function () {
              S(!1);
            }),
            (h[4] = S),
            (h[5] = o))
          : (o = h[5]);
        let R = o;
        return (
          h[6] !== E.length || h[7] !== I || h[8] !== _
            ? ((c =
                E.length > 0 || I
                  ? (0, t.jsxs)(m.s, {
                      className: "pl-6",
                      children: [
                        (0, t.jsx)(m.F, {
                          children: _("web.livestream.start_livestream"),
                        }),
                        (0, t.jsx)(m.C, {
                          className: "text-text-secondary",
                          children: _("web.livestream.select_coin_description"),
                        }),
                        (0, t.jsx)(l.t, {
                          className:
                            "absolute right-3.5 top-2 hover:cursor-pointer p-1 text-text-secondary hover:text-text-on-muted transition-all duration-200",
                          children: (0, t.jsx)(n.x6, { className: "h-4 w-4" }),
                        }),
                      ],
                    })
                  : null),
              (h[6] = E.length),
              (h[7] = I),
              (h[8] = _),
              (h[9] = c))
            : (c = h[9]),
          h[10] !== E || h[11] !== R || h[12] !== I
            ? ((d = (0, t.jsx)("div", {
                className: "overflow-y-auto",
                children: I
                  ? (0, t.jsx)(v, {})
                  : 0 === E.length
                    ? (0, t.jsx)(y, { onCancel: R })
                    : (0, t.jsxs)(g, {
                        className: "space-y-2 max-h-96 overflow-y-auto px-6",
                        children: [
                          E.map((e) =>
                            (0, t.jsx)(
                              b,
                              {
                                fallbackCoinImage: (e.symbol ?? e.mint).slice(
                                  0,
                                  2,
                                ),
                                coin: e,
                                onSelect: R,
                              },
                              `select-coin-button-${e.mint}`,
                            ),
                          ),
                          (0, t.jsx)(w, { onSelect: R }),
                        ],
                      }),
              })),
              (h[10] = E),
              (h[11] = R),
              (h[12] = I),
              (h[13] = d))
            : (d = h[13]),
          h[14] !== c || h[15] !== d
            ? ((f = (0, t.jsxs)(m.d, {
                className:
                  "max-h-[80vh] overflow-hidden sm:max-w-[600px] bg-tokens-bg-low-em border border-border-tertiary px-0",
                "data-testid": "select-created-coin-dialog",
                children: [c, d],
              })),
              (h[14] = c),
              (h[15] = d),
              (h[16] = f))
            : (f = h[16]),
          h[17] !== C || h[18] !== S || h[19] !== f
            ? ((p = (0, t.jsx)(m.N, { open: C, onOpenChange: S, children: f })),
              (h[17] = C),
              (h[18] = S),
              (h[19] = f),
              (h[20] = p))
            : (p = h[20]),
          p
        );
      },
    ],
    554056,
  );
};
