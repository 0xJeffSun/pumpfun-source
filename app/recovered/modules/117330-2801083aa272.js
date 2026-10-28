// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(745018),
    s = e.i(497968),
    n = e.i(732486),
    l = e.i(445242),
    r = e.i(292686),
    i = e.i(322315),
    a = e.i(254010),
    o = e.i(574472),
    c = e.i(352386);
  e.i(12692);
  var d = e.i(398902),
    m = e.i(42413),
    u = e.i(951425),
    f = e.i(157633),
    h = e.i(458310),
    x = e.i(337689),
    p = e.i(116549);
  e.i(12641);
  var g = e.i(34011),
    b = e.i(116830),
    v = e.i(924631);
  e.i(84455);
  var y = e.i(392968),
    w = e.i(908163),
    j = e.i(51206),
    _ = e.i(338319),
    N = e.i(960107),
    k = e.i(170450),
    S = e.i(300157),
    M = e.i(595673);
  let C = (0, c.createContext)(null);
  function I(e) {
    let t,
      s,
      n,
      i,
      a,
      o,
      d = (0, l.c)(16),
      { onValue: m } = e,
      {
        bookmarks: u,
        addToBookmark: f,
        removeFromBookmark: h,
      } = (0, N.j)(!1, !0);
    d[0] !== u ? ((t = u.find(P) ?? N.b), (d[0] = u), (d[1] = t)) : (t = d[1]);
    let x = t,
      p = x.bookmark_items;
    (d[2] !== p
      ? ((s = (e) => (0, N.w)(p, (0, S.y)(e))), (d[2] = p), (d[3] = s))
      : (s = d[3]),
      d[4] !== f || d[5] !== x.id || d[6] !== p || d[7] !== h
        ? ((n = (e) => {
            let t = (0, S.y)(e);
            (0, N.w)(p, t)
              ? h((0, N.T)(p, t), x.id)
              : (f(t, x.id),
                (0, M.Op)({ mint: e.mint, screen: r.Ae.COIN_SCREENERS }));
          }),
          (d[4] = f),
          (d[5] = x.id),
          (d[6] = p),
          (d[7] = h),
          (d[8] = n))
        : (n = d[8]),
      d[9] !== s || d[10] !== n
        ? ((i = { isStarred: s, toggle: n }),
          (d[9] = s),
          (d[10] = n),
          (d[11] = i))
        : (i = d[11]));
    let g = i;
    return (
      d[12] !== m || d[13] !== g
        ? ((a = () => (m(g), () => m(null))),
          (o = [m, g]),
          (d[12] = m),
          (d[13] = g),
          (d[14] = a),
          (d[15] = o))
        : ((a = d[14]), (o = d[15])),
      (0, c.useEffect)(a, o),
      null
    );
  }
  function P(e) {
    return "default" === e.name;
  }
  let U = () => (0, c.use)(C);
  e.s(
    [
      "m",
      0,
      function (e) {
        let t,
          s,
          r = (0, l.c)(6),
          { children: i } = e,
          { decodedJwt: a } = (0, o.F)(),
          d = (0, k.f)() && !!a?.address,
          [m, u] = (0, c.useState)(null),
          f = d ? m : null;
        return (
          r[0] !== d
            ? ((t = d ? (0, n.jsx)(I, { onValue: u }) : null),
              (r[0] = d),
              (r[1] = t))
            : (t = r[1]),
          r[2] !== i || r[3] !== f || r[4] !== t
            ? ((s = (0, n.jsxs)(C.Provider, { value: f, children: [t, i] })),
              (r[2] = i),
              (r[3] = f),
              (r[4] = t),
              (r[5] = s))
            : (s = r[5]),
          s
        );
      },
      "Y",
      0,
      U,
    ],
    99844,
  );
  let E = { terminal: "-mr-1.5", comfortable: "-mr-1" },
    T = { terminal: "w-7", comfortable: "w-9" },
    A = {
      terminal:
        "group-hover/coin-row:w-7 group-has-[:focus-visible]/coin-row:w-7 [@media(hover:none)]:w-7",
      comfortable:
        "group-hover/coin-row:w-9 group-has-[:focus-visible]/coin-row:w-9 [@media(hover:none)]:w-9",
    },
    R = { terminal: 20, comfortable: 24 };
  function F(e) {
    let s,
      r,
      i,
      a,
      o,
      c,
      m,
      u,
      h = (0, l.c)(30),
      { mint: x, chainId: g, className: b } = e,
      v = U(),
      { t: y } = (0, d.f)(),
      w = (0, p.x)();
    if (!v) return null;
    h[0] !== g || h[1] !== x || h[2] !== v
      ? ((s = v.isStarred({ mint: x, chainId: g })),
        (h[0] = g),
        (h[1] = x),
        (h[2] = v),
        (h[3] = s))
      : (s = h[3]);
    let N = s;
    h[4] !== g || h[5] !== x || h[6] !== v
      ? ((r = (e) => {
          (e.preventDefault(),
            e.stopPropagation(),
            v.toggle({ mint: x, chainId: g }));
        }),
        (h[4] = g),
        (h[5] = x),
        (h[6] = v),
        (h[7] = r))
      : (r = h[7]);
    let k = r,
      S = N ? "" : void 0,
      M = N ? T[w] : A[w];
    h[8] !== M
      ? ((i = (0, _.c)(
          "relative z-[2] flex w-0 shrink-0 items-center overflow-hidden transition-[width] duration-200 ease-out motion-reduce:transition-none",
          M,
        )),
        (h[8] = M),
        (h[9] = i))
      : (i = h[9]);
    let C = R[w],
      I = N ? "" : void 0;
    return (
      h[10] !== N || h[11] !== y
        ? ((a = y(
            N ? "web.coin.remove_from_watchlist" : "web.coin.add_to_watchlist",
          )),
          (h[10] = N),
          (h[11] = y),
          (h[12] = a))
        : (a = h[12]),
      h[13] !== b || h[14] !== N
        ? ((o = (0, _.c)(
            "focus-visible:ring-inset transition-[opacity,transform,visibility,color,background-color] duration-200 ease-out motion-reduce:transition-none",
            N
              ? "visible translate-x-0 opacity-100"
              : (0, _.c)(
                  "invisible -translate-x-1 opacity-0",
                  "group-hover/coin-row:visible group-hover/coin-row:translate-x-0 group-hover/coin-row:opacity-100 group-has-[:focus-visible]/coin-row:visible group-has-[:focus-visible]/coin-row:translate-x-0 group-has-[:focus-visible]/coin-row:opacity-100 [@media(hover:none)]:visible [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100",
                ),
            "hover:bg-bg-quaternary",
            b,
          )),
          (h[13] = b),
          (h[14] = N),
          (h[15] = o))
        : (o = h[15]),
      h[16] !== N
        ? ((c = N
            ? (0, n.jsx)(f.G3, { className: "text-text-primary" })
            : (0, n.jsx)(t.G3, {})),
          (h[16] = N),
          (h[17] = c))
        : (c = h[17]),
      h[18] !== w ||
      h[19] !== k ||
      h[20] !== c ||
      h[21] !== C ||
      h[22] !== I ||
      h[23] !== a ||
      h[24] !== o
        ? ((m = (0, n.jsx)(j._, {
            density: w,
            size: C,
            "data-testid": "coin-row-watchlist-star",
            "data-starred": I,
            "aria-label": a,
            onClick: k,
            className: o,
            children: c,
          })),
          (h[18] = w),
          (h[19] = k),
          (h[20] = c),
          (h[21] = C),
          (h[22] = I),
          (h[23] = a),
          (h[24] = o),
          (h[25] = m))
        : (m = h[25]),
      h[26] !== m || h[27] !== S || h[28] !== i
        ? ((u = (0, n.jsx)("span", {
            "data-testid": "coin-row-watchlist-slot",
            "data-resting": S,
            className: i,
            children: m,
          })),
          (h[26] = m),
          (h[27] = S),
          (h[28] = i),
          (h[29] = u))
        : (u = h[29]),
      u
    );
  }
  function $(e) {
    let t,
      s,
      r,
      i = (0, l.c)(10),
      { mint: a, chainId: o, testId: c, children: d, className: m } = e;
    return (
      i[0] !== m
        ? ((t = (0, _.c)("flex shrink-0 items-center", m)),
          (i[0] = m),
          (i[1] = t))
        : (t = i[1]),
      i[2] !== o || i[3] !== a
        ? ((s = (0, n.jsx)(F, { mint: a, chainId: o })),
          (i[2] = o),
          (i[3] = a),
          (i[4] = s))
        : (s = i[4]),
      i[5] !== d || i[6] !== t || i[7] !== s || i[8] !== c
        ? ((r = (0, n.jsxs)("div", {
            "data-testid": c,
            className: t,
            children: [s, d],
          })),
          (i[5] = d),
          (i[6] = t),
          (i[7] = s),
          (i[8] = c),
          (i[9] = r))
        : (r = i[9]),
      r
    );
  }
  e.s(["P", 0, E, "W", 0, $], 290204);
  var z = e.i(850175),
    D = e.i(666863),
    O = e.i(555501),
    B = e.i(872522),
    L = e.i(267146),
    q = e.i(540805),
    W = e.i(789793),
    K = e.i(95132),
    H = e.i(78436),
    V = e.i(634103),
    G = e.i(759257);
  let Q = (0, H.$)()(
      (0, V.u)((e) => ({
        byMint: {},
        register: (t, s) =>
          e((e) => {
            let n = e.byMint[t];
            return n &&
              n.totalSupply === s.totalSupply &&
              n.baseDecimals === s.baseDecimals
              ? e
              : { byMint: { ...e.byMint, [t]: s } };
          }),
      })),
    ),
    J = (e) => {
      if (null == e || "" === e) return;
      let t = Number(e);
      return Number.isFinite(t) && t > 0 ? String(e) : void 0;
    },
    X = (e) => {
      let t =
        J(e.circulating_supply_str) ??
        J(e.total_supply_str) ??
        J(e.total_supply);
      if (void 0 !== t)
        return { totalSupply: t, baseDecimals: e.base_decimals ?? 6 };
    },
    Y = (e, t) => {
      e && t && Q.getState().register(e, t);
    },
    Z = new Set(),
    ee = new Set(),
    et = new Map(),
    es = null,
    en = async (e) =>
      (0, G.j)()("POST /coins-v2/mints", {
        body: { mints: e },
        credentials: "include",
        hooks: {
          afterResponse: [
            (e, t, s) => {
              if (!s.ok) throw Error(`coins-v2/mints ${s.status}`);
            },
          ],
        },
      }),
    el = async (e) => {
      for (let t of e) ee.add(t);
      try {
        let t = await en(e),
          s = new Set();
        for (let e of t) {
          let t = X(e);
          t && (Y(e.mint, t), s.add(e.mint));
        }
        let n = Date.now() + 6e5;
        for (let t of e) s.has(t) || et.set(t, n);
      } catch {
        let t = Date.now() + 6e4;
        for (let s of e) et.set(s, t);
      } finally {
        for (let t of e) ee.delete(t);
      }
    },
    er = () => {
      es = null;
      let e = [...Z];
      Z.clear();
      for (let t = 0; t < e.length; t += 50) el(e.slice(t, t + 50));
    };
  var ei = e.i(662093),
    ea = e.i(653805);
  let eo = (e) => {
      var t;
      let s,
        n,
        r,
        i,
        a,
        o,
        d,
        m,
        u,
        f,
        h,
        x,
        p = (0, l.c)(3),
        { coin: g, servedPriceUsd: b } = e,
        v = (0, ei.m)(g),
        y =
          ((t = (0, K.K)(b) ? null : g),
          (a = (0, l.c)(8)),
          (o = t?.mint ?? ""),
          (d = t?.chain_id),
          (m = t?.board_program),
          a[0] !== t
            ? ((n = !!t && (0, K.D)(t)), (a[0] = t), (a[1] = n))
            : (n = a[1]),
          (u = n),
          (h = (0, l.c)(2))[0] !== o
            ? ((f = (e) => e.byMint[o]), (h[0] = o), (h[1] = f))
            : (f = h[1]),
          (x = Q(f)),
          a[2] !== m || a[3] !== d || a[4] !== o || a[5] !== u
            ? ((r = () => {
                u &&
                  o &&
                  ((e) => {
                    let t = Q.getState().byMint,
                      s = Date.now();
                    for (let n of e) {
                      if (
                        !n.mint ||
                        !(0, K.D)(n) ||
                        t[n.mint] ||
                        ee.has(n.mint) ||
                        Z.has(n.mint)
                      )
                        continue;
                      let e = et.get(n.mint);
                      (void 0 !== e && e > s) || Z.add(n.mint);
                    }
                    Z.size > 0 && null === es && (es = setTimeout(er, 25));
                  })([{ mint: o, chain_id: d, board_program: m }]);
              }),
              (i = [u, o, d, m]),
              (a[2] = m),
              (a[3] = d),
              (a[4] = o),
              (a[5] = u),
              (a[6] = r),
              (a[7] = i))
            : ((r = a[6]), (i = a[7])),
          (0, c.useEffect)(r, i),
          x);
      return (
        p[0] !== v || p[1] !== y
          ? ((s = { basis: v, supply: y }), (p[0] = v), (p[1] = y), (p[2] = s))
          : (s = p[2]),
        s
      );
    },
    ec = ({ coin: e, row: t, servedPriceUsd: s, ...n }) =>
      (e && (0, K.W)({ coin: e, row: t, ...n })) ?? ((0, K.K)(s) ? s : null),
    ed = (e) => {
      let t,
        s,
        n = (0, l.c)(7),
        { coin: r, servedPriceUsd: i } = e,
        a = void 0 === i ? null : i;
      n[0] !== r || n[1] !== a
        ? ((t = { coin: r, servedPriceUsd: a }),
          (n[0] = r),
          (n[1] = a),
          (n[2] = t))
        : (t = n[2]);
      let o = eo(t);
      return (
        n[3] !== r || n[4] !== a || n[5] !== o
          ? ((s = (e) => {
              if (!r) return null;
              let t = ec({
                coin: r,
                row: e.coins[r.mint],
                servedPriceUsd: a,
                ...o,
              });
              return null === t ? null : (0, K.r)(t);
            }),
            (n[3] = r),
            (n[4] = a),
            (n[5] = o),
            (n[6] = s))
          : (s = n[6]),
        (0, ea.x)(s)
      );
    };
  var em = e.i(569526),
    eu = e.i(962773),
    ef = e.i(634557),
    eh = e.i(689943),
    ex = e.i(516579),
    ep = e.i(947187);
  function eg(e) {
    let t,
      s,
      i,
      a,
      o,
      d,
      m,
      u = (0, l.c)(23),
      { coin: h, rowIntent: x, glyphClassName: p, testId: g } = e,
      [b, v] = (0, c.useState)(!1),
      [y, w] = (0, c.useState)(!1);
    u[0] !== h.mint
      ? ((t = [h.mint]), (u[0] = h.mint), (u[1] = t))
      : (t = u[1]);
    let j = t,
      _ = !!h.twitter || !(x || y);
    u[2] !== _ ? ((s = { disabled: _ }), (u[2] = _), (u[3] = s)) : (s = u[3]);
    let { data: N } = (0, eh.V)(j, s),
      k = N[0],
      S = h.twitter || k?.twitter || null,
      C = S ? (0, ep._)(S) : null,
      I = C ? (0, ex.h)(C) : null,
      P = (0, eu.y)(I);
    u[4] !== p
      ? ((i = (0, n.jsx)(f.Tc, { "aria-hidden": !0, className: p })),
        (u[4] = p),
        (u[5] = i))
      : (i = u[5]);
    let U = i,
      E = eu.D,
      T = C ? (0, eu.X)({ href: C, coinName: h.name }) : "";
    return (
      u[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (e) => {
            (v(e), e && w(!0));
          }),
          (u[6] = a))
        : (a = u[6]),
      u[7] !== h.mint || u[8] !== U || u[9] !== C || u[10] !== P || u[11] !== g
        ? ((o = C
            ? (0, n.jsx)(ef.f, {
                "aria-label": P,
                className:
                  "inline-flex rounded-sm transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent",
                "data-testid": `${g}-link`,
                href: C,
                onClick: () =>
                  (0, M.Vh)({ mint: h.mint, target: r.mg.TWITTER }),
                onPointerDown: eb,
                children: U,
              })
            : U),
          (u[7] = h.mint),
          (u[8] = U),
          (u[9] = C),
          (u[10] = P),
          (u[11] = g),
          (u[12] = o))
        : (o = u[12]),
      u[13] !== E ||
      u[14] !== b ||
      u[15] !== C ||
      u[16] !== I ||
      u[17] !== T ||
      u[18] !== o
        ? ((d = (0, n.jsx)(E, {
            communityLabel: T,
            href: C,
            link: I,
            onOpenChange: a,
            open: b,
            children: o,
          })),
          (u[13] = E),
          (u[14] = b),
          (u[15] = C),
          (u[16] = I),
          (u[17] = T),
          (u[18] = o),
          (u[19] = d))
        : (d = u[19]),
      u[20] !== d || u[21] !== g
        ? ((m = (0, n.jsx)("span", {
            className: "relative z-[2] inline-flex",
            "data-testid": g,
            children: d,
          })),
          (u[20] = d),
          (u[21] = g),
          (u[22] = m))
        : (m = u[22]),
      m
    );
  }
  function eb(e) {
    return e.stopPropagation();
  }
  let ev = { terminal: "size-3", comfortable: "size-3.5" },
    ey = (0, c.memo)(function (e) {
      let t,
        s,
        r,
        i = (0, l.c)(8),
        { coin: a, servedPriceUsd: o, className: c } = e;
      i[0] !== a || i[1] !== o
        ? ((t = { coin: a, servedPriceUsd: o }),
          (i[0] = a),
          (i[1] = o),
          (i[2] = t))
        : (t = i[2]);
      let d = ed(t);
      return null === d
        ? null
        : (i[3] !== d
            ? ((s = (0, K.j)(d)), (i[3] = d), (i[4] = s))
            : (s = i[4]),
          i[5] !== c || i[6] !== s
            ? ((r = (0, n.jsx)("span", {
                "data-testid": "trending-coin-row-price",
                className: c,
                children: s,
              })),
              (i[5] = c),
              (i[6] = s),
              (i[7] = r))
            : (r = i[7]),
          r);
    }),
    ew = (0, c.memo)(function (e) {
      let t,
        s,
        r,
        i = (0, l.c)(9),
        { coin: a, flashes: o, className: c } = e,
        d =
          (0, ei.I)({
            mint: a.mint,
            chainId: a.chain_id,
            fallbackMarketCap: a.usd_market_cap,
            coin: a,
            significantDigits: L.k,
          }) ?? null,
        m = (0, B.v)(o ? d : null),
        u = m.tone ?? void 0;
      return (
        i[0] !== c || i[1] !== m
          ? ((t = (0, _.c)(c, (0, B.a)(m), "motion-reduce:animate-none")),
            (i[0] = c),
            (i[1] = m),
            (i[2] = t))
          : (t = i[2]),
        i[3] !== d
          ? ((s = null !== d && d > 0 ? (0, q.l)(d) : "—"),
            (i[3] = d),
            (i[4] = s))
          : (s = i[4]),
        i[5] !== u || i[6] !== t || i[7] !== s
          ? ((r = (0, n.jsx)("span", {
              "data-testid": "trending-coin-row-mc",
              "data-figure": "market-cap",
              "data-flash": u,
              className: t,
              children: s,
            })),
            (i[5] = u),
            (i[6] = t),
            (i[7] = s),
            (i[8] = r))
          : (r = i[8]),
        r
      );
    }),
    ej = (0, c.memo)((e) => {
      let t,
        s,
        i,
        a,
        o,
        c,
        m,
        j,
        N,
        k,
        S,
        C,
        I,
        P,
        U,
        E,
        T,
        A,
        R,
        F,
        q,
        H,
        V,
        G,
        Q,
        J,
        X,
        Y = (0, l.c)(118),
        {
          coin: Z,
          index: ee,
          priceChange24h: et,
          tickerFirst: es,
          stats: en,
          hotRule: el,
          servedPriceUsd: er,
          figure: eu,
          sourceElement: ef,
        } = e,
        eh = void 0 !== es && es,
        ex = void 0 === ef ? r.k9.TRENDING : ef,
        { t: ep } = (0, d.f)(),
        eb = (0, p.x)(),
        { prefetch: ej, hoverProps: e_ } = (0, z.W)(Z);
      Y[0] !== Z ? ((t = (0, v.D)(Z)), (Y[0] = Z), (Y[1] = t)) : (t = Y[1]);
      let eN = t;
      ((0, ei.m)(Z),
        Y[2] !== Z
          ? ((s = () => {
              let e = (0, ei.y)({
                mint: Z.mint,
                chainId: Z.chain_id,
                fallbackMarketCap: Z.usd_market_cap,
                coin: Z,
              });
              return void 0 === e ? 0 : (0, W.f)(e, L.k);
            }),
            (Y[2] = Z),
            (Y[3] = s))
          : (s = Y[3]));
      let ek = s,
        eS = (0, O.v)(Z.mint, Z.chain_id),
        eM =
          "pin" === (el ?? (eh ? "pin" : "index")) ? en?.isHot === !0 : ee < 5;
      Y[4] !== et
        ? ((i = "number" == typeof et && Number.isFinite(et) && 0 !== et),
          (Y[4] = et),
          (Y[5] = i))
        : (i = Y[5]);
      let eC = i,
        eI = eC && et < 0,
        eP = Z.symbol ?? "";
      if (Y[6] !== eP) {
        let e;
        (Y[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /^\$/), (Y[8] = e))
          : (e = Y[8]),
          (a = eP.replace(e, "")),
          (Y[6] = eP),
          (Y[7] = a));
      } else a = Y[7];
      let eU = a,
        eE = eh && eU && eU !== eN ? `${eU} — ${eN}` : eN,
        eT = eh && "price" === (void 0 === eu ? "marketCap" : eu),
        eA = eT ? Z : null;
      Y[9] !== er || Y[10] !== eA
        ? ((o = { coin: eA, servedPriceUsd: er }),
          (Y[9] = er),
          (Y[10] = eA),
          (Y[11] = o))
        : (o = Y[11]);
      let eR = ed(o),
        eF = eh && !eT ? Z : null;
      Y[12] !== er || Y[13] !== eF
        ? ((c = { coin: eF, servedPriceUsd: er }),
          (Y[12] = er),
          (Y[13] = eF),
          (Y[14] = c))
        : (c = Y[14]);
      let e$ = ((e) => {
        let t,
          s,
          n = (0, l.c)(7),
          { coin: r, servedPriceUsd: i } = e,
          a = void 0 === i ? null : i;
        n[0] !== r || n[1] !== a
          ? ((t = { coin: r, servedPriceUsd: a }),
            (n[0] = r),
            (n[1] = a),
            (n[2] = t))
          : (t = n[2]);
        let o = eo(t);
        return (
          n[3] !== r || n[4] !== a || n[5] !== o
            ? ((s = (e) =>
                null !== r &&
                null !==
                  ec({
                    coin: r,
                    row: e.coins[r.mint],
                    servedPriceUsd: a,
                    ...o,
                  })),
              (n[3] = r),
              (n[4] = a),
              (n[5] = o),
              (n[6] = s))
            : (s = n[6]),
          (0, ea.x)(s)
        );
      })(c);
      Y[15] !== eR
        ? ((m = null === eR ? null : (0, K.j)(eR)), (Y[15] = eR), (Y[16] = m))
        : (m = Y[16]);
      let ez = m,
        eD = (0, B.v)(eh && eT ? eR : null);
      Y[17] !== Z ||
      Y[18] !== eb ||
      Y[19] !== ej ||
      Y[20] !== en?.hasTelegram ||
      Y[21] !== en?.hasTwitter ||
      Y[22] !== en?.hasWebsite ||
      Y[23] !== eh
        ? ((j =
            eh && (en?.hasTwitter || en?.hasWebsite || en?.hasTelegram)
              ? (0, n.jsxs)("span", {
                  "data-testid": "trending-coin-row-socials",
                  className:
                    "flex shrink-0 items-center gap-1 text-text-quaternary",
                  children: [
                    en?.hasTwitter
                      ? (0, n.jsx)(eg, {
                          coin: Z,
                          glyphClassName: ev[eb],
                          rowIntent: ej,
                          testId: "trending-coin-row-x",
                        })
                      : null,
                    en?.hasWebsite
                      ? (0, n.jsx)(f.DZ, {
                          "aria-hidden": !0,
                          className: ev[eb],
                        })
                      : null,
                    en?.hasTelegram
                      ? (0, n.jsx)(f.$$, {
                          "aria-hidden": !0,
                          className: ev[eb],
                        })
                      : null,
                  ],
                })
              : null),
          (Y[17] = Z),
          (Y[18] = eb),
          (Y[19] = ej),
          (Y[20] = en?.hasTelegram),
          (Y[21] = en?.hasTwitter),
          (Y[22] = en?.hasWebsite),
          (Y[23] = eh),
          (Y[24] = j))
        : (j = Y[24]);
      let eO = j;
      (Y[25] !== ek ? ((N = ek()), (Y[25] = ek), (Y[26] = N)) : (N = Y[26]),
        Y[27] !== Z.rec_id ||
        Y[28] !== Z.rec_rank ||
        Y[29] !== ee ||
        Y[30] !== ex ||
        Y[31] !== N
          ? ((k = {
              itemPosition: ee,
              marketCap: N,
              sourceScreen: r.Ae.COIN_SCREENERS,
              rec_id: Z.rec_id,
              recommendationRank: Z.rec_rank,
              sourceElement: ex,
            }),
            (Y[27] = Z.rec_id),
            (Y[28] = Z.rec_rank),
            (Y[29] = ee),
            (Y[30] = ex),
            (Y[31] = N),
            (Y[32] = k))
          : (k = Y[32]));
      let eB = k,
        eL = (0, em.G)(),
        eq = (0, D.f)(Z.mint, eB, void 0, ex);
      Y[33] !== eC || Y[34] !== eI || Y[35] !== et
        ? ((S =
            eC || 0 === et
              ? (0, n.jsx)("span", {
                  "aria-hidden": !0,
                  "data-testid": "trending-coin-row-wash",
                  "data-tone": eI ? "loss" : "gain",
                  className: (0, _.c)(
                    "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35%",
                    eI ? "to-loss/[0.12]" : "to-gain/[0.12]",
                  ),
                })
              : null),
          (Y[33] = eC),
          (Y[34] = eI),
          (Y[35] = et),
          (Y[36] = S))
        : (S = Y[36]);
      let eW = S,
        eK = `/coin/${Z.mint}`;
      (Y[37] !== Z.mint ||
      Y[38] !== Z.rec_id ||
      Y[39] !== Z.rec_rank ||
      Y[40] !== eB ||
      Y[41] !== ee ||
      Y[42] !== ek ||
      Y[43] !== eL ||
      Y[44] !== ex
        ? ((C = () => {
            let e = { ...eB, marketCap: ek() };
            (eL?.(Z.mint, e),
              (0, M.iV)({
                coinId: Z.mint,
                itemPosition: ee,
                marketCap: e.marketCap,
                sourceScreen: r.Ae.COIN_SCREENERS,
                rec_id: Z.rec_id,
                recommendationRank: Z.rec_rank,
                sourceElement: ex,
              }));
          }),
          (Y[37] = Z.mint),
          (Y[38] = Z.rec_id),
          (Y[39] = Z.rec_rank),
          (Y[40] = eB),
          (Y[41] = ee),
          (Y[42] = ek),
          (Y[43] = eL),
          (Y[44] = ex),
          (Y[45] = C))
        : (C = Y[45]),
        Y[46] !== e_ ||
        Y[47] !== eE ||
        Y[48] !== ej ||
        Y[49] !== eK ||
        Y[50] !== C
          ? ((I = (0, n.jsx)(h.default, {
              href: eK,
              prefetch: ej,
              ...e_,
              "aria-label": eE,
              onClick: C,
              className: "absolute inset-0 z-[1] focus-inset",
            })),
            (Y[46] = e_),
            (Y[47] = eE),
            (Y[48] = ej),
            (Y[49] = eK),
            (Y[50] = C),
            (Y[51] = I))
          : (I = Y[51]));
      let eH = I,
        eV = !!(e$ || (eT && eN && eN !== eU) || eO || (Z.symbol && !eh));
      Y[52] !== Z || Y[53] !== eb || Y[54] !== eV
        ? ((P =
            Z.followed_holders && Z.followed_holders.holders.length > 0
              ? (0, n.jsx)(x.E, {
                  mint: Z.mint,
                  coin: Z,
                  followedHolders: Z.followed_holders,
                  avatarSize: "terminal" === eb ? "sm" : "rail",
                  popoverAlign: "center",
                  className: (0, _.c)("relative z-[2]", eV && u.o[eb]),
                })
              : null),
          (Y[52] = Z),
          (Y[53] = eb),
          (Y[54] = eV),
          (Y[55] = P))
        : (P = Y[55]);
      let eG = P,
        eQ = !!(Z.symbol || eG || eO || e$ || ez),
        eJ = u.w[eb],
        eX = u.s[eb];
      (Y[56] !== Z || Y[57] !== eX
        ? ((U = (0, n.jsx)(g.CoinAvatar, {
            optimisticImage: !0,
            coin: Z,
            size: eX,
            verified: !1,
            testIdPrefix: "trending-coin-row",
          })),
          (Y[56] = Z),
          (Y[57] = eX),
          (Y[58] = U))
        : (U = Y[58]),
        Y[59] !== Z.chain_id || Y[60] !== Z.mint || Y[61] !== U
          ? ((E = (0, n.jsx)($, {
              mint: Z.mint,
              chainId: Z.chain_id,
              testId: "trending-coin-row-lead",
              children: U,
            })),
            (Y[59] = Z.chain_id),
            (Y[60] = Z.mint),
            (Y[61] = U),
            (Y[62] = E))
          : (E = Y[62]));
      let eY = u.x[eb],
        eZ = u.n[eb],
        e0 = eh && "font-bold";
      (Y[63] !== eZ || Y[64] !== e0
        ? ((T = (0, _.c)(eZ, e0)), (Y[63] = eZ), (Y[64] = e0), (Y[65] = T))
        : (T = Y[65]),
        Y[66] !== eb || Y[67] !== eM || Y[68] !== ep
          ? ((A = eM
              ? (0, n.jsx)(w.E, {
                  density: eb,
                  tone: "hot",
                  "data-testid": "trending-coin-row-hot",
                  children: ep("common.hot"),
                })
              : void 0),
            (Y[66] = eb),
            (Y[67] = eM),
            (Y[68] = ep),
            (Y[69] = A))
          : (A = Y[69]));
      let e1 = eh ? eU || eN : void 0;
      return (
        Y[70] !== Z ||
        Y[71] !== eS ||
        Y[72] !== T ||
        Y[73] !== A ||
        Y[74] !== e1
          ? ((R = (0, n.jsx)(b.f, {
              coin: Z,
              verified: eS,
              sealSize: 14,
              nameClassName: T,
              testIdPrefix: "trending-coin-row",
              trailing: A,
              children: e1,
            })),
            (Y[70] = Z),
            (Y[71] = eS),
            (Y[72] = T),
            (Y[73] = A),
            (Y[74] = e1),
            (Y[75] = R))
          : (R = Y[75]),
        Y[76] !== eY || Y[77] !== R
          ? ((F = (0, n.jsx)("div", {
              "data-testid": "trending-coin-row-name-line",
              className: eY,
              children: R,
            })),
            (Y[76] = eY),
            (Y[77] = R),
            (Y[78] = F))
          : (F = Y[78]),
        Y[79] !== Z ||
        Y[80] !== eN ||
        Y[81] !== eb ||
        Y[82] !== eG ||
        Y[83] !== eQ ||
        Y[84] !== er ||
        Y[85] !== eT ||
        Y[86] !== eO ||
        Y[87] !== eU ||
        Y[88] !== eh
          ? ((q = eQ
              ? (0, n.jsxs)("div", {
                  "data-testid": "trending-coin-row-meta-row",
                  className: u.A,
                  children: [
                    (0, n.jsxs)("div", {
                      "data-testid": "trending-coin-row-meta-line",
                      className: (0, _.c)(u.z, u.Y[eb]),
                      children: [
                        (0, n.jsx)("span", {
                          "aria-hidden": !0,
                          className: u.G[eb],
                        }),
                        eh && !eT
                          ? (0, n.jsx)(ey, {
                              coin: Z,
                              servedPriceUsd: er,
                              className: (0, _.c)(
                                "shrink-0 tabular-nums",
                                u.B[eb],
                                "text-text-tertiary",
                              ),
                            })
                          : null,
                        eT && eN && eN !== eU
                          ? (0, n.jsx)("span", {
                              "data-testid": "trending-coin-row-company",
                              className: (0, _.c)(
                                u.X,
                                u.B[eb],
                                "text-text-tertiary",
                              ),
                              children: eN,
                            })
                          : null,
                        eO,
                        Z.symbol && !eh
                          ? (0, n.jsx)("span", {
                              className: (0, _.c)(u.X, u.B[eb]),
                              children: Z.symbol.replace(/^\$/, ""),
                            })
                          : null,
                      ],
                    }),
                    eG,
                  ],
                })
              : null),
            (Y[79] = Z),
            (Y[80] = eN),
            (Y[81] = eb),
            (Y[82] = eG),
            (Y[83] = eQ),
            (Y[84] = er),
            (Y[85] = eT),
            (Y[86] = eO),
            (Y[87] = eU),
            (Y[88] = eh),
            (Y[89] = q))
          : (q = Y[89]),
        Y[90] !== eq || Y[91] !== F || Y[92] !== q
          ? ((H = (0, n.jsxs)("div", {
              ref: eq,
              className: "flex min-w-0 flex-1 flex-col",
              children: [F, q],
            })),
            (Y[90] = eq),
            (Y[91] = F),
            (Y[92] = q),
            (Y[93] = H))
          : (H = Y[93]),
        Y[94] !== Z ||
        Y[95] !== eb ||
        Y[96] !== eD ||
        Y[97] !== ez ||
        Y[98] !== eT ||
        Y[99] !== eh
          ? ((V = eT
              ? (0, n.jsx)("span", {
                  "data-testid": "trending-coin-row-mc",
                  "data-figure": "price",
                  "data-flash": eD.tone ?? void 0,
                  className: (0, _.c)(
                    u.e[eb],
                    eh && "font-bold",
                    (0, B.a)(eD),
                    "motion-reduce:animate-none",
                  ),
                  children: ez ?? "—",
                })
              : (0, n.jsx)(ew, {
                  coin: Z,
                  flashes: eh,
                  className: (0, _.c)(u.e[eb], eh && "font-bold"),
                })),
            (Y[94] = Z),
            (Y[95] = eb),
            (Y[96] = eD),
            (Y[97] = ez),
            (Y[98] = eT),
            (Y[99] = eh),
            (Y[100] = V))
          : (V = Y[100]),
        Y[101] !== eb || Y[102] !== eC || Y[103] !== et
          ? ((G = eC
              ? (0, n.jsx)(y.f, {
                  changePercent: et,
                  variant: "text",
                  density: eb,
                  "data-testid": "trending-coin-row-change",
                })
              : null),
            (Y[101] = eb),
            (Y[102] = eC),
            (Y[103] = et),
            (Y[104] = G))
          : (G = Y[104]),
        Y[105] !== G
          ? ((Q = (0, n.jsx)("span", {
              "data-testid": "trending-coin-row-change-slot",
              className: u.N,
              children: G,
            })),
            (Y[105] = G),
            (Y[106] = Q))
          : (Q = Y[106]),
        Y[107] !== V || Y[108] !== Q
          ? ((J = (0, n.jsxs)("div", {
              "data-testid": "trending-coin-row-figures",
              className: "flex shrink-0 flex-col items-end",
              children: [V, Q],
            })),
            (Y[107] = V),
            (Y[108] = Q),
            (Y[109] = J))
          : (J = Y[109]),
        Y[110] !== eH ||
        Y[111] !== eb ||
        Y[112] !== eJ ||
        Y[113] !== E ||
        Y[114] !== H ||
        Y[115] !== J ||
        Y[116] !== eW
          ? ((X = (0, n.jsxs)("div", {
              role: "listitem",
              "data-testid": "trending-coin-row",
              "data-density": eb,
              className: eJ,
              children: [eW, eH, E, H, J],
            })),
            (Y[110] = eH),
            (Y[111] = eb),
            (Y[112] = eJ),
            (Y[113] = E),
            (Y[114] = H),
            (Y[115] = J),
            (Y[116] = eW),
            (Y[117] = X))
          : (X = Y[117]),
        X
      );
    });
  var e_ = e.i(387726),
    eN = e.i(401134),
    ek = e.i(365089),
    eS = e.i(928529),
    eM = e.i(464649),
    eC = e.i(529841),
    eI = e.i(813792),
    eP = e.i(386017),
    eU = e.i(632817),
    eE = e.i(187611),
    eT = e.i(605587);
  let eA = (e) => `${Math.round(Math.min(100, Math.max(0, e)))}%`,
    eR = {
      terminal: "text-[11px] leading-4 text-text-quaternary",
      comfortable: "text-xs leading-4 text-text-quaternary",
    },
    eF = {
      terminal:
        "text-[11px] font-medium leading-4 tabular-nums text-text-primary",
      comfortable:
        "text-xs font-medium leading-4 tabular-nums text-text-primary",
    },
    e$ = {
      terminal: "text-[11px] font-medium leading-4 tabular-nums",
      comfortable: "text-xs font-medium leading-4 tabular-nums",
    },
    ez = {
      terminal: "text-[13px] font-medium leading-4",
      comfortable: "text-sm font-medium leading-5",
    },
    eD = { terminal: "size-3", comfortable: "size-3.5" };
  function eO(e) {
    let t,
      s,
      r,
      i,
      a,
      o = (0, l.c)(18),
      { icon: c, value: d, alarm: m, testId: u, unavailableLabel: f } = e,
      h = (0, p.x)(),
      x = null != f ? `${u}-unavailable` : u,
      g =
        null != f
          ? "relative z-[2] cursor-default text-text-tertiary"
          : m
            ? "text-loss"
            : "text-gain";
    o[0] !== g
      ? ((t = (0, _.c)("flex items-center gap-0.5 pr-1.5", g)),
        (o[0] = g),
        (o[1] = t))
      : (t = o[1]);
    let b = null != f || void 0,
      v = e$[h],
      y = null != f ? "—" : d;
    (o[2] !== b || o[3] !== v || o[4] !== y
      ? ((s = (0, n.jsx)("span", {
          "aria-hidden": b,
          className: v,
          children: y,
        })),
        (o[2] = b),
        (o[3] = v),
        (o[4] = y),
        (o[5] = s))
      : (s = o[5]),
      o[6] !== f
        ? ((r =
            null != f
              ? (0, n.jsx)("span", { className: "sr-only", children: f })
              : null),
          (o[6] = f),
          (o[7] = r))
        : (r = o[7]),
      o[8] !== c || o[9] !== x || o[10] !== t || o[11] !== s || o[12] !== r
        ? ((i = (0, n.jsxs)("span", {
            "data-testid": x,
            className: t,
            children: [c, s, r],
          })),
          (o[8] = c),
          (o[9] = x),
          (o[10] = t),
          (o[11] = s),
          (o[12] = r),
          (o[13] = i))
        : (i = o[13]));
    let w = i;
    return null == f
      ? w
      : (o[14] !== w || o[15] !== h || o[16] !== f
          ? ((a = (0, n.jsx)(eI.f, { content: f, density: h, children: w })),
            (o[14] = w),
            (o[15] = h),
            (o[16] = f),
            (o[17] = a))
          : (a = o[17]),
        a);
  }
  let eB = { terminal: "size-8", comfortable: "size-10" },
    eL = { terminal: "size-3.5", comfortable: "size-4" },
    eq = { terminal: 10, comfortable: 12 };
  function eW(e) {
    let s,
      r,
      i,
      a,
      o,
      c = (0, l.c)(19),
      { coin: d, progress: m, density: f } = e,
      h = null != m ? Math.min(100, Math.max(0, m)) : null,
      x = "active" === d.mayhem_state || "enabled" === d.mayhem_state,
      p = u.y[f],
      b = eB[f];
    (c[0] !== b
      ? ((s = (0, _.c)("relative shrink-0", b)), (c[0] = b), (c[1] = s))
      : (s = c[1]),
      c[2] !== h || c[3] !== p
        ? ((r =
            null != h
              ? (0, n.jsxs)("svg", {
                  "aria-hidden": !0,
                  viewBox: `0 0 ${p} ${p}`,
                  className: "absolute inset-0 size-full text-gain",
                  children: [
                    (0, n.jsx)("rect", {
                      x: "1",
                      y: "1",
                      width: p - 2,
                      height: p - 2,
                      rx: 8,
                      fill: "none",
                      stroke: "var(--color-border-tertiary)",
                      strokeWidth: "2",
                    }),
                    (0, n.jsx)("rect", {
                      x: "1",
                      y: "1",
                      width: p - 2,
                      height: p - 2,
                      rx: 8,
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      pathLength: 100,
                      strokeDasharray: 100,
                      strokeDashoffset: 100 - h,
                    }),
                  ],
                })
              : null),
          (c[2] = h),
          (c[3] = p),
          (c[4] = r))
        : (r = c[4]));
    let v = null != h ? p - 6 : p,
      y = null != h ? p : void 0,
      w = null != h ? "absolute inset-[3px]" : void 0;
    return (
      c[5] !== d || c[6] !== v || c[7] !== y || c[8] !== w
        ? ((i = (0, n.jsx)(g.CoinAvatar, {
            optimisticImage: !0,
            coin: d,
            size: v,
            cornerFrameSize: y,
            className: w,
          })),
          (c[5] = d),
          (c[6] = v),
          (c[7] = y),
          (c[8] = w),
          (c[9] = i))
        : (i = c[9]),
      c[10] !== d.mayhem_is_multiplayer || c[11] !== f || c[12] !== x
        ? ((a = x
            ? (0, n.jsx)("span", {
                "aria-hidden": !0,
                className: (0, _.c)(
                  "absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full bg-hot p-px",
                  eL[f],
                ),
                children: (0, n.jsx)("span", {
                  className:
                    "flex size-full items-center justify-center rounded-full bg-bg-primary text-hot",
                  children:
                    !0 === d.mayhem_is_multiplayer
                      ? (0, n.jsx)(t.xI, { size: eq[f] })
                      : (0, n.jsx)(t.Sg, { size: eq[f] }),
                }),
              })
            : null),
          (c[10] = d.mayhem_is_multiplayer),
          (c[11] = f),
          (c[12] = x),
          (c[13] = a))
        : (a = c[13]),
      c[14] !== s || c[15] !== r || c[16] !== i || c[17] !== a
        ? ((o = (0, n.jsxs)("span", { className: s, children: [r, i, a] })),
          (c[14] = s),
          (c[15] = r),
          (c[16] = i),
          (c[17] = a),
          (c[18] = o))
        : (o = c[18]),
      o
    );
  }
  let eK = (0, c.memo)(function (e) {
    let s,
      i,
      a,
      o,
      m,
      g,
      b,
      v,
      y,
      j,
      N,
      k,
      S,
      C,
      I,
      P,
      U,
      E,
      T,
      A,
      R,
      F,
      O,
      W,
      K,
      H,
      V,
      G,
      Q,
      J,
      X,
      Y,
      Z,
      ee,
      et,
      es,
      en,
      el,
      er,
      ea,
      eo,
      ec,
      ed,
      eu,
      ef,
      eh,
      ex,
      ep,
      eb,
      ev,
      ey,
      ew,
      ej,
      e_,
      eN,
      eI = (0, l.c)(185),
      {
        coin: e$,
        stats: eB,
        isLoggedIn: eL,
        className: eq,
        tickerOnly: eK,
        index: eH,
        sourceElement: eV,
        sourceScreen: eG,
      } = e,
      eQ = void 0 !== eK && eK,
      eJ = void 0 === eG ? r.Ae.COIN_SCREENERS : eG,
      { t: eX } = (0, d.f)(),
      eY = (0, p.x)(),
      { prefetch: eZ, hoverProps: e0 } = (0, z.W)(e$),
      e1 = (0, c.useRef)(null),
      e2 = (0, eP.f)(e1),
      e3 =
        (0, ei.I)({
          mint: e$.mint,
          chainId: e$.chain_id,
          fallbackMarketCap: e$.usd_market_cap,
          coin: e$,
          significantDigits: L.k,
        }) ?? null,
      e4 = (0, B.v)(eQ ? e3 : null),
      e5 = e$.created_timestamp ?? null;
    eI[0] !== e5
      ? ((s = (e) => null != e5 && e !== eU.Y && e - e5 < 36e5),
        (eI[0] = e5),
        (eI[1] = s))
      : (s = eI[1]);
    let e6 = (0, eU.H)(s),
      e7 = (e$.symbol ?? "").replace(/^\$/, ""),
      e9 = eQ
        ? e7 || e$.name || (0, ek.d)(e$.mint, 4, 4)
        : e$.name || e$.symbol || (0, ek.d)(e$.mint, 4, 4),
      e8 = eB?.totalFeesSol,
      te = "active" === e$.mayhem_state;
    eI[2] !== e$.chain_id || eI[3] !== e$.mint || eI[4] !== eX
      ? ((i = (0, eT.N)({ mint: e$.mint, chainId: e$.chain_id })
          ? eX("web.screeners.metric_unavailable_on_chain", {
              chain: (0, eE.T)((0, eT.n)(e$.chain_id) ?? "EVM", "brand-name"),
            })
          : void 0),
        (eI[2] = e$.chain_id),
        (eI[3] = e$.mint),
        (eI[4] = eX),
        (eI[5] = i))
      : (i = eI[5]);
    let tt = i;
    eI[6] !== e$.rec_id ||
    eI[7] !== e$.rec_rank ||
    eI[8] !== eH ||
    eI[9] !== e3 ||
    eI[10] !== eV ||
    eI[11] !== eJ
      ? ((a =
          void 0 !== eV && void 0 !== eH
            ? {
                itemPosition: eH,
                marketCap: e3 ?? 0,
                sourceScreen: eJ,
                rec_id: e$.rec_id,
                recommendationRank: e$.rec_rank,
                sourceElement: eV,
              }
            : void 0),
        (eI[6] = e$.rec_id),
        (eI[7] = e$.rec_rank),
        (eI[8] = eH),
        (eI[9] = e3),
        (eI[10] = eV),
        (eI[11] = eJ),
        (eI[12] = a))
      : (a = eI[12]);
    let ts = a,
      tn = (0, em.G)(),
      tl = (0, D.f)(e$.mint, ts, void 0, eV),
      tr = eR[eY],
      ti = eF[eY];
    eI[13] !== tt
      ? ((o = (e, t) =>
          tt
            ? (0, n.jsx)(eO, {
                testId: e,
                icon: t,
                value: "",
                alarm: !1,
                unavailableLabel: tt,
              })
            : null),
        (eI[13] = tt),
        (eI[14] = o))
      : (o = eI[14]);
    let ta = o;
    eI[15] !== eq
      ? ((m = (0, _.c)("relative flex w-full items-start", u.q, eq)),
        (eI[15] = eq),
        (eI[16] = m))
      : (m = eI[16]);
    let to = h.default,
      tc = `/coin/${e$.mint}`,
      td = eX("web.market_rail.open_coin", {
        coin_name: (0, eE.T)(e9, "coin-name"),
      });
    (eI[17] !== e$.mint ||
    eI[18] !== e$.rec_id ||
    eI[19] !== e$.rec_rank ||
    eI[20] !== ts ||
    eI[21] !== tn
      ? ((g = () => {
          ts &&
            (tn?.(e$.mint, ts),
            (0, M.iV)({
              coinId: e$.mint,
              itemPosition: ts.itemPosition,
              marketCap: ts.marketCap,
              sourceScreen: ts.sourceScreen,
              rec_id: e$.rec_id,
              recommendationRank: e$.rec_rank,
              sourceElement: ts.sourceElement,
            }));
        }),
        (eI[17] = e$.mint),
        (eI[18] = e$.rec_id),
        (eI[19] = e$.rec_rank),
        (eI[20] = ts),
        (eI[21] = tn),
        (eI[22] = g))
      : (g = eI[22]),
      eI[23] !== to ||
      eI[24] !== e0 ||
      eI[25] !== eZ ||
      eI[26] !== td ||
      eI[27] !== g ||
      eI[28] !== tc
        ? ((b = (0, n.jsx)(to, {
            href: tc,
            prefetch: eZ,
            ...e0,
            "aria-label": td,
            onClick: g,
            className: "absolute inset-0 z-[1] focus-inset",
          })),
          (eI[23] = to),
          (eI[24] = e0),
          (eI[25] = eZ),
          (eI[26] = td),
          (eI[27] = g),
          (eI[28] = tc),
          (eI[29] = b))
        : (b = eI[29]));
    let tm = eB?.bondingCurveProgress;
    (eI[30] !== e$ || eI[31] !== eY || eI[32] !== tm
      ? ((v = (0, n.jsx)(eW, { coin: e$, progress: tm, density: eY })),
        (eI[30] = e$),
        (eI[31] = eY),
        (eI[32] = tm),
        (eI[33] = v))
      : (v = eI[33]),
      eI[34] !== e$.chain_id || eI[35] !== e$.mint || eI[36] !== v
        ? ((y = (0, n.jsx)($, {
            mint: e$.mint,
            chainId: e$.chain_id,
            testId: "movers-pro-lead",
            children: v,
          })),
          (eI[34] = e$.chain_id),
          (eI[35] = e$.mint),
          (eI[36] = v),
          (eI[37] = y))
        : (y = eI[37]));
    let tu = u.$[eY];
    eI[38] !== tu
      ? ((j = (0, _.c)("min-w-0 flex-1", tu)), (eI[38] = tu), (eI[39] = j))
      : (j = eI[39]);
    let tf = ez[eY],
      th = eQ && "font-bold";
    (eI[40] !== tf || eI[41] !== th
      ? ((N = (0, _.c)("min-w-0 truncate text-text-primary", tf, th)),
        (eI[40] = tf),
        (eI[41] = th),
        (eI[42] = N))
      : (N = eI[42]),
      eI[43] !== e9 || eI[44] !== N
        ? ((k = (0, n.jsx)("span", { className: N, children: e9 })),
          (eI[43] = e9),
          (eI[44] = N),
          (eI[45] = k))
        : (k = eI[45]),
      eI[46] !== eY || eI[47] !== eB?.isHot || eI[48] !== eX
        ? ((S = eB?.isHot
            ? (0, n.jsx)(w.E, {
                density: eY,
                tone: "hot",
                "data-testid": "movers-pro-hot-badge",
                children: eX("common.hot"),
              })
            : null),
          (eI[46] = eY),
          (eI[47] = eB?.isHot),
          (eI[48] = eX),
          (eI[49] = S))
        : (S = eI[49]),
      eI[50] !== k || eI[51] !== S
        ? ((C = (0, n.jsxs)("div", {
            className: "flex items-center gap-1",
            children: [k, S],
          })),
          (eI[50] = k),
          (eI[51] = S),
          (eI[52] = C))
        : (C = eI[52]),
      eI[53] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = (0, _.c)("mt-0.5", u.A)), (eI[53] = I))
        : (I = eI[53]),
      eI[54] !== tr || eI[55] !== e7 || eI[56] !== eQ
        ? ((P = eQ
            ? null
            : (0, n.jsx)("span", {
                className: (0, _.c)("mr-2 min-w-0 truncate", tr),
                children: e7 || "—",
              })),
          (eI[54] = tr),
          (eI[55] = e7),
          (eI[56] = eQ),
          (eI[57] = P))
        : (P = eI[57]),
      eI[58] !== e5 || eI[59] !== eY || eI[60] !== e6
        ? ((U = e5
            ? (0, n.jsxs)("span", {
                className: (0, _.c)(
                  "flex shrink-0 items-center gap-0.5",
                  e6 ? "text-text-primary" : "text-text-quaternary",
                ),
                children: [
                  (0, n.jsx)(t.i$, { "aria-hidden": !0, className: "size-3" }),
                  (0, n.jsx)(eC.f, {
                    timestamp: e5,
                    suffix: !1,
                    className: (0, _.c)(
                      "whitespace-nowrap",
                      "terminal" === eY
                        ? "text-[11px] leading-4"
                        : "text-xs leading-4",
                    ),
                  }),
                ],
              })
            : null),
          (eI[58] = e5),
          (eI[59] = eY),
          (eI[60] = e6),
          (eI[61] = U))
        : (U = eI[61]),
      eI[62] !== e$.is_charity || eI[63] !== eY
        ? ((E = e$.is_charity
            ? (0, n.jsx)(f.cJ, {
                "aria-hidden": !0,
                className: (0, _.c)(eD[eY], "text-hot"),
              })
            : null),
          (eI[62] = e$.is_charity),
          (eI[63] = eY),
          (eI[64] = E))
        : (E = eI[64]),
      eI[65] !== e$ ||
      eI[66] !== eY ||
      eI[67] !== eZ ||
      eI[68] !== eB?.hasTwitter
        ? ((T = eB?.hasTwitter
            ? (0, n.jsx)(eg, {
                coin: e$,
                glyphClassName: eD[eY],
                rowIntent: eZ,
                testId: "movers-pro-x",
              })
            : null),
          (eI[65] = e$),
          (eI[66] = eY),
          (eI[67] = eZ),
          (eI[68] = eB?.hasTwitter),
          (eI[69] = T))
        : (T = eI[69]),
      eI[70] !== eY || eI[71] !== eB?.hasWebsite
        ? ((A = eB?.hasWebsite
            ? (0, n.jsx)(f.DZ, { "aria-hidden": !0, className: eD[eY] })
            : null),
          (eI[70] = eY),
          (eI[71] = eB?.hasWebsite),
          (eI[72] = A))
        : (A = eI[72]),
      eI[73] !== eY || eI[74] !== eB?.hasTelegram
        ? ((R = eB?.hasTelegram
            ? (0, n.jsx)(f.$$, { "aria-hidden": !0, className: eD[eY] })
            : null),
          (eI[73] = eY),
          (eI[74] = eB?.hasTelegram),
          (eI[75] = R))
        : (R = eI[75]),
      eI[76] !== E || eI[77] !== T || eI[78] !== A || eI[79] !== R
        ? ((F = (0, n.jsxs)("span", {
            className:
              "ml-2 flex shrink-0 items-center gap-1 text-text-secondary",
            children: [E, T, A, R],
          })),
          (eI[76] = E),
          (eI[77] = T),
          (eI[78] = A),
          (eI[79] = R),
          (eI[80] = F))
        : (F = eI[80]),
      eI[81] !== P || eI[82] !== U || eI[83] !== F
        ? ((O = (0, n.jsxs)("div", {
            className: "flex h-4 min-w-0 flex-1 items-center overflow-hidden",
            children: [P, U, F],
          })),
          (eI[81] = P),
          (eI[82] = U),
          (eI[83] = F),
          (eI[84] = O))
        : (O = eI[84]),
      eI[85] !== e$ || eI[86] !== e2 || eI[87] !== eL
        ? ((W = e2
            ? (0, n.jsx)(x.$, {
                mint: e$.mint,
                isLoggedIn: eL,
                coin: e$,
                avatarSize: "sm",
                className: "relative z-[2] ml-2",
              })
            : null),
          (eI[85] = e$),
          (eI[86] = e2),
          (eI[87] = eL),
          (eI[88] = W))
        : (W = eI[88]),
      eI[89] !== W
        ? ((K = (0, n.jsx)("div", {
            "data-testid": "movers-pro-trailing",
            className: u.D,
            children: W,
          })),
          (eI[89] = W),
          (eI[90] = K))
        : (K = eI[90]),
      eI[91] !== O || eI[92] !== K
        ? ((H = (0, n.jsxs)("div", { className: I, children: [O, K] })),
          (eI[91] = O),
          (eI[92] = K),
          (eI[93] = H))
        : (H = eI[93]),
      eI[94] !== j || eI[95] !== C || eI[96] !== H
        ? ((V = (0, n.jsxs)("div", { className: j, children: [C, H] })),
          (eI[94] = j),
          (eI[95] = C),
          (eI[96] = H),
          (eI[97] = V))
        : (V = eI[97]),
      eI[98] !== tr
        ? ((G = (0, n.jsxs)("span", { className: tr, children: ["V", " "] })),
          (eI[98] = tr),
          (eI[99] = G))
        : (G = eI[99]),
      eI[100] !== eB
        ? ((Q = eB?.volumeUsd24h != null ? (0, q.l)(eB.volumeUsd24h) : "—"),
          (eI[100] = eB),
          (eI[101] = Q))
        : (Q = eI[101]),
      eI[102] !== ti || eI[103] !== Q
        ? ((J = (0, n.jsx)("span", { className: ti, children: Q })),
          (eI[102] = ti),
          (eI[103] = Q),
          (eI[104] = J))
        : (J = eI[104]),
      eI[105] !== tr
        ? ((X = (0, n.jsxs)("span", { className: tr, children: ["MC", " "] })),
          (eI[105] = tr),
          (eI[106] = X))
        : (X = eI[106]));
    let tx = e4.tone ?? void 0,
      tp = eQ && "font-bold";
    (eI[107] !== e4 || eI[108] !== ti || eI[109] !== tp
      ? ((Y = (0, _.c)(ti, tp, (0, B.a)(e4), "motion-reduce:animate-none")),
        (eI[107] = e4),
        (eI[108] = ti),
        (eI[109] = tp),
        (eI[110] = Y))
      : (Y = eI[110]),
      eI[111] !== e3
        ? ((Z = null != e3 && Number.isFinite(e3) ? (0, q.l)(e3) : "—"),
          (eI[111] = e3),
          (eI[112] = Z))
        : (Z = eI[112]),
      eI[113] !== tx || eI[114] !== Y || eI[115] !== Z
        ? ((ee = (0, n.jsx)("span", {
            "data-testid": "movers-pro-mc",
            "data-flash": tx,
            className: Y,
            children: Z,
          })),
          (eI[113] = tx),
          (eI[114] = Y),
          (eI[115] = Z),
          (eI[116] = ee))
        : (ee = eI[116]),
      eI[117] !== G || eI[118] !== J || eI[119] !== X || eI[120] !== ee
        ? ((et = (0, n.jsxs)("div", {
            className: "flex h-4 items-baseline gap-1",
            children: [G, J, X, ee],
          })),
          (eI[117] = G),
          (eI[118] = J),
          (eI[119] = X),
          (eI[120] = ee),
          (eI[121] = et))
        : (et = eI[121]));
    let tg = null != e8 ? "movers-pro-fees" : "movers-pro-fees-unavailable";
    (eI[122] !== tr
      ? ((es = (0, n.jsx)("span", { className: tr, children: "F" })),
        (eI[122] = tr),
        (eI[123] = es))
      : (es = eI[123]),
      eI[124] !== e8 || eI[125] !== ti
        ? ((en =
            null != e8
              ? (0, n.jsxs)(n.Fragment, {
                  children: [
                    (0, n.jsx)(eS.default, {
                      src: eM.U,
                      alt: "",
                      width: 12,
                      height: 12,
                      className: "size-3 object-contain",
                    }),
                    (0, n.jsx)("span", {
                      className: ti,
                      children: e8.toFixed(e8 < 1 ? 3 : 2),
                    }),
                  ],
                })
              : (0, n.jsx)("span", { className: ti, children: "—" })),
          (eI[124] = e8),
          (eI[125] = ti),
          (eI[126] = en))
        : (en = eI[126]),
      eI[127] !== tg || eI[128] !== es || eI[129] !== en
        ? ((el = (0, n.jsxs)("span", {
            "data-testid": tg,
            className: "flex h-4 items-center gap-1",
            children: [es, en],
          })),
          (eI[127] = tg),
          (eI[128] = es),
          (eI[129] = en),
          (eI[130] = el))
        : (el = eI[130]),
      eI[131] !== et || eI[132] !== el
        ? ((er = (0, n.jsxs)("div", {
            className: "flex w-28 shrink-0 flex-col items-end gap-1.5 pl-2",
            children: [et, el],
          })),
          (eI[131] = et),
          (eI[132] = el),
          (eI[133] = er))
        : (er = eI[133]),
      eI[134] !== V || eI[135] !== er
        ? ((ea = (0, n.jsxs)("div", {
            className: "flex items-start",
            children: [V, er],
          })),
          (eI[134] = V),
          (eI[135] = er),
          (eI[136] = ea))
        : (ea = eI[136]));
    let tb = u.j[eY];
    return (
      eI[137] !== tb
        ? ((eo = (0, _.c)(
            "flex h-4 min-w-0 flex-wrap content-start items-center overflow-hidden",
            tb,
          )),
          (eI[137] = tb),
          (eI[138] = eo))
        : (eo = eI[138]),
      eI[139] !== eB || eI[140] !== ta
        ? ((ec =
            eB?.numHolders != null
              ? (0, n.jsx)(eO, {
                  testId: "movers-pro-holders",
                  icon: (0, n.jsx)(f._3, {
                    "aria-hidden": !0,
                    className: "size-3",
                  }),
                  value: (0, q.O)(eB.numHolders),
                  alarm: eB.numHolders <= 10,
                })
              : ta(
                  "movers-pro-holders",
                  (0, n.jsx)(f._3, { "aria-hidden": !0, className: "size-3" }),
                )),
          (eI[139] = eB),
          (eI[140] = ta),
          (eI[141] = ec))
        : (ec = eI[141]),
      eI[142] !== eB
        ? ((ed =
            eB?.sniperPct != null
              ? (0, n.jsx)(eO, {
                  testId: "movers-pro-sniper",
                  icon: (0, n.jsx)(t.WW, {
                    "aria-hidden": !0,
                    className: "size-3",
                  }),
                  value: eA(eB.sniperPct),
                  alarm: eB.sniperPct > 10,
                })
              : null),
          (eI[142] = eB),
          (eI[143] = ed))
        : (ed = eI[143]),
      eI[144] !== eB
        ? ((eu =
            eB?.bundlerPct != null
              ? (0, n.jsx)(eO, {
                  testId: "movers-pro-bundler",
                  icon: (0, n.jsx)(t.qh, {
                    "aria-hidden": !0,
                    className: "size-3",
                  }),
                  value: eA(eB.bundlerPct),
                  alarm: eB.bundlerPct > 10,
                })
              : null),
          (eI[144] = eB),
          (eI[145] = eu))
        : (eu = eI[145]),
      eI[146] !== eB || eI[147] !== ta
        ? ((ef =
            eB?.creatorAllocationPct != null
              ? (0, n.jsx)(eO, {
                  testId: "movers-pro-creator",
                  icon: (0, n.jsx)(f.Go, {
                    "aria-hidden": !0,
                    className: "size-3",
                  }),
                  value: eA(eB.creatorAllocationPct),
                  alarm: eB.creatorAllocationPct >= 20,
                })
              : ta(
                  "movers-pro-creator",
                  (0, n.jsx)(f.Go, { "aria-hidden": !0, className: "size-3" }),
                )),
          (eI[146] = eB),
          (eI[147] = ta),
          (eI[148] = ef))
        : (ef = eI[148]),
      eI[149] !== te || eI[150] !== eB || eI[151] !== ta
        ? ((eh = te
            ? null
            : eB?.topTenHoldersPct != null
              ? (0, n.jsx)(eO, {
                  testId: "movers-pro-top-holders",
                  icon: (0, n.jsx)(f.zN, {
                    "aria-hidden": !0,
                    className: "size-3",
                  }),
                  value: eA(eB.topTenHoldersPct),
                  alarm: eB.topTenHoldersPct >= 20,
                })
              : ta(
                  "movers-pro-top-holders",
                  (0, n.jsx)(f.zN, { "aria-hidden": !0, className: "size-3" }),
                )),
          (eI[149] = te),
          (eI[150] = eB),
          (eI[151] = ta),
          (eI[152] = eh))
        : (eh = eI[152]),
      eI[153] !== eo ||
      eI[154] !== ec ||
      eI[155] !== ed ||
      eI[156] !== eu ||
      eI[157] !== ef ||
      eI[158] !== eh
        ? ((ex = (0, n.jsxs)("div", {
            className: eo,
            children: [ec, ed, eu, ef, eh],
          })),
          (eI[153] = eo),
          (eI[154] = ec),
          (eI[155] = ed),
          (eI[156] = eu),
          (eI[157] = ef),
          (eI[158] = eh),
          (eI[159] = ex))
        : (ex = eI[159]),
      eI[160] !== tr
        ? ((ep = (0, _.c)("shrink-0", tr)), (eI[160] = tr), (eI[161] = ep))
        : (ep = eI[161]),
      eI[162] !== eX
        ? ((eb = eX("common.trades")), (eI[162] = eX), (eI[163] = eb))
        : (eb = eI[163]),
      eI[164] !== eB
        ? ((ev = eB?.totalTxCount != null ? (0, q.O)(eB.totalTxCount) : "—"),
          (eI[164] = eB),
          (eI[165] = ev))
        : (ev = eI[165]),
      eI[166] !== ev
        ? ((ey = (0, n.jsx)("span", {
            className: "font-medium tabular-nums text-text-primary",
            children: ev,
          })),
          (eI[166] = ev),
          (eI[167] = ey))
        : (ey = eI[167]),
      eI[168] !== ep || eI[169] !== eb || eI[170] !== ey
        ? ((ew = (0, n.jsxs)("span", {
            className: ep,
            children: [eb, " ", ey],
          })),
          (eI[168] = ep),
          (eI[169] = eb),
          (eI[170] = ey),
          (eI[171] = ew))
        : (ew = eI[171]),
      eI[172] !== ex || eI[173] !== ew
        ? ((ej = (0, n.jsxs)("div", {
            className: "mt-0.5 flex items-center justify-between",
            children: [ex, ew],
          })),
          (eI[172] = ex),
          (eI[173] = ew),
          (eI[174] = ej))
        : (ej = eI[174]),
      eI[175] !== tl || eI[176] !== ea || eI[177] !== ej
        ? ((e_ = (0, n.jsxs)("div", {
            ref: tl,
            className: "flex min-w-0 flex-1 flex-col",
            children: [ea, ej],
          })),
          (eI[175] = tl),
          (eI[176] = ea),
          (eI[177] = ej),
          (eI[178] = e_))
        : (e_ = eI[178]),
      eI[179] !== eY ||
      eI[180] !== b ||
      eI[181] !== y ||
      eI[182] !== e_ ||
      eI[183] !== m
        ? ((eN = (0, n.jsxs)("div", {
            ref: e1,
            role: "listitem",
            "data-testid": "movers-pro-row",
            "data-density": eY,
            className: m,
            children: [b, y, e_],
          })),
          (eI[179] = eY),
          (eI[180] = b),
          (eI[181] = y),
          (eI[182] = e_),
          (eI[183] = m),
          (eI[184] = eN))
        : (eN = eI[184]),
      eN
    );
  });
  e.s(["F", 0, eO, "$", 0, eK], 786446);
  var eH = e.i(56651),
    eV = e.i(124498),
    eG = e.i(844510),
    eQ = e.i(441315),
    eJ = e.i(894327);
  function eX(e) {
    let t,
      s,
      r = (0, l.c)(12),
      { active: i, tabs: a, onSelect: o, testId: c, density: d } = e,
      m = void 0 === d ? "terminal" : d;
    if (r[0] !== i || r[1] !== m || r[2] !== o || r[3] !== a) {
      let e;
      (r[5] !== i || r[6] !== m || r[7] !== o
        ? ((e = (e) => {
            let t = e.value === i;
            return (0, n.jsx)(
              eQ.p,
              {
                density: m,
                role: "tab",
                "aria-selected": t,
                variant: t ? "pressed" : "outlined",
                onClick: () => o(e.value),
                children: e.label,
              },
              e.value,
            );
          }),
          (r[5] = i),
          (r[6] = m),
          (r[7] = o),
          (r[8] = e))
        : (e = r[8]),
        (t = a.map(e)),
        (r[0] = i),
        (r[1] = m),
        (r[2] = o),
        (r[3] = a),
        (r[4] = t));
    } else t = r[4];
    return (
      r[9] !== t || r[10] !== c
        ? ((s = (0, n.jsx)("div", {
            role: "tablist",
            "data-testid": c,
            className:
              "flex min-w-0 items-center gap-1 overflow-x-auto py-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            children: t,
          })),
          (r[9] = t),
          (r[10] = c),
          (r[11] = s))
        : (s = r[11]),
      s
    );
  }
  function eY(e) {
    let t,
      s,
      r,
      i,
      a = (0, l.c)(16),
      { value: o, onChange: c, boards: m } = e,
      u = void 0 === m ? eJ.M : m,
      { t: f } = (0, d.f)(),
      h = (0, p.x)();
    if (a[0] !== u || a[1] !== f) {
      let e;
      (a[3] !== f
        ? ((e = (e) => ({ value: e, label: f(eJ.N[e]) })),
          (a[3] = f),
          (a[4] = e))
        : (e = a[4]),
        (t = u.map(e)),
        (a[0] = u),
        (a[1] = f),
        (a[2] = t));
    } else t = a[2];
    let x = t,
      g = eG.m[h],
      b = eV.V[h];
    return (
      a[5] !== g || a[6] !== b
        ? ((s = (0, _.c)(g, b)), (a[5] = g), (a[6] = b), (a[7] = s))
        : (s = a[7]),
      a[8] !== h || a[9] !== c || a[10] !== x || a[11] !== o
        ? ((r = (0, n.jsx)(eX, {
            active: o,
            tabs: x,
            onSelect: c,
            density: h,
          })),
          (a[8] = h),
          (a[9] = c),
          (a[10] = x),
          (a[11] = o),
          (a[12] = r))
        : (r = a[12]),
      a[13] !== s || a[14] !== r
        ? ((i = (0, n.jsx)("div", {
            className: s,
            "data-testid": "pro-screener-board-tabs",
            children: r,
          })),
          (a[13] = s),
          (a[14] = r),
          (a[15] = i))
        : (i = a[15]),
      i
    );
  }
  var eZ = e.i(522906),
    e0 = e.i(542417),
    e1 = e.i(27847);
  let e2 = new Set([
      "trending",
      "movers",
      "global-callouts",
      "my-alerts",
      "user-callouts",
      "user-trades",
      "coin-trades",
      "coin-callouts",
    ]),
    e3 = null,
    e4 = !1,
    e5 = (e) => {
      try {
        let t = (() => {
          let e = window.AudioContext ?? window.webkitAudioContext;
          if (!e) return null;
          if ((e3 || (e3 = new e()), !e4)) {
            e4 = !0;
            let e = () => {
              e3?.resume().catch(() => {});
            };
            (window.addEventListener("pointerdown", e, { passive: !0 }),
              window.addEventListener("keydown", e, { passive: !0 }));
          }
          return e3;
        })();
        if (
          !t ||
          ("suspended" === t.state && t.resume().catch(() => {}),
          "running" !== t.state)
        )
          return;
        let s = t.currentTime;
        for (let n of e1.n[e]) {
          let e = t.createOscillator(),
            l = t.createGain(),
            r = s + n.at,
            i = r + n.duration;
          ((e.type = n.type),
            e.frequency.setValueAtTime(n.from, r),
            e.frequency.exponentialRampToValueAtTime(Math.max(n.to, 1), i),
            l.gain.setValueAtTime(1e-4, r),
            l.gain.exponentialRampToValueAtTime(n.gain, r + 0.01),
            l.gain.exponentialRampToValueAtTime(1e-4, i),
            e.connect(l),
            l.connect(t.destination),
            e.start(r),
            e.stop(i + 0.02));
        }
      } catch {}
    };
  function e6(e) {
    let t,
      s,
      n = (0, l.c)(5),
      { sound: r, newnessKey: i, scopeKey: a } = e,
      o = (0, c.useRef)(null),
      d = (0, c.useRef)(a),
      m = (0, c.useRef)(0);
    (n[0] !== i || n[1] !== a || n[2] !== r
      ? ((t = () => {
          let e = o.current,
            t = d.current !== a;
          if (
            ((o.current = i),
            (d.current = a),
            !r ||
              t ||
              null === e ||
              e === i ||
              window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
          )
            return;
          let s = Date.now();
          s - m.current < e1._ || ((m.current = s), e5(r));
        }),
        (s = [r, i, a]),
        (n[0] = i),
        (n[1] = a),
        (n[2] = r),
        (n[3] = t),
        (n[4] = s))
      : ((t = n[3]), (s = n[4])),
      (0, c.useEffect)(t, s));
  }
  e.s(["G", 0, e2, "p", 0, e5, "A", 0, e6], 126126);
  var e7 = e.i(101181);
  let e9 = [];
  function e8(e) {
    let t,
      s,
      r,
      i,
      a,
      o,
      m,
      f = (0, l.c)(25),
      { column: h, category: x } = e,
      { t: g } = (0, d.f)(),
      b = (0, p.x)(),
      { paused: v, targetProps: y } = (0, e7.f)();
    f[0] !== x ? ((t = { category: x }), (f[0] = x), (f[1] = t)) : (t = f[1]);
    let { data: w, isLoading: j, isError: _ } = (0, e0.f)(t),
      N = w ?? e9;
    f[2] !== x || f[3] !== N
      ? ((s = { category: x, rows: N }), (f[2] = x), (f[3] = N), (f[4] = s))
      : (s = f[4]);
    let [k, S] = (0, c.useState)(s),
      M = v && k.category === x;
    M || (k.rows === N && k.category === x) || S({ category: x, rows: N });
    let C = M && k.rows.length > 0 ? k.rows : N,
      I = C[0]?.coin ?? "";
    (f[5] !== x || f[6] !== h.sound || f[7] !== I
      ? ((r = { sound: h.sound, newnessKey: I, scopeKey: x }),
        (f[5] = x),
        (f[6] = h.sound),
        (f[7] = I),
        (f[8] = r))
      : (r = f[8]),
      e6(r));
    let P = (0, c.useRef)(null);
    return (
      f[9] !== v
        ? ((i = (0, n.jsx)(e_.q, { paused: v })), (f[9] = v), (f[10] = i))
        : (i = f[10]),
      f[11] !== x ||
      f[12] !== b ||
      f[13] !== _ ||
      f[14] !== j ||
      f[15] !== C ||
      f[16] !== g
        ? ((a =
            j && 0 === C.length
              ? (0, n.jsx)(u.t, { density: b, bleed: !1 })
              : _ && 0 === C.length
                ? (0, n.jsx)(eN.M, {
                    variant: "error",
                    children: g("web.screeners.error_perps"),
                  })
                : 0 === C.length
                  ? (0, n.jsx)(eN.M, {
                      children: g(
                        "all" === x
                          ? "web.screeners.empty_board"
                          : "web.screeners.perps_empty_category",
                      ),
                    })
                  : (0, n.jsx)("div", {
                      role: "list",
                      className: "flex flex-col",
                      children: C.map((e, t) =>
                        (0, n.jsx)(
                          eZ.f,
                          { market: e, density: b, index: t },
                          e.coin,
                        ),
                      ),
                    })),
          (f[11] = x),
          (f[12] = b),
          (f[13] = _),
          (f[14] = j),
          (f[15] = C),
          (f[16] = g),
          (f[17] = a))
        : (a = f[17]),
      f[18] !== x || f[19] !== y || f[20] !== a
        ? ((o = (0, n.jsx)("div", {
            ref: P,
            ...y,
            "data-testid": "screeners-coin-board-scroll",
            "data-mode": "perps",
            "data-rows": "board",
            "data-category": x,
            className: eG.b,
            children: a,
          })),
          (f[18] = x),
          (f[19] = y),
          (f[20] = a),
          (f[21] = o))
        : (o = f[21]),
      f[22] !== i || f[23] !== o
        ? ((m = (0, n.jsx)("div", {
            className: "flex min-h-0 w-full flex-1 flex-col",
            children: (0, n.jsxs)("div", {
              className: "relative flex min-h-0 flex-1 flex-col",
              children: [i, o],
            }),
          })),
          (f[22] = i),
          (f[23] = o),
          (f[24] = m))
        : (m = f[24]),
      m
    );
  }
  var te = e.i(697638),
    tt = e.i(915631),
    ts = e.i(828424);
  function tn(e) {
    let t,
      s,
      r,
      i,
      a,
      o,
      m,
      f,
      h,
      x = (0, l.c)(28),
      { column: g } = e,
      { t: b } = (0, d.f)(),
      v = (0, p.x)(),
      { paused: y, targetProps: w } = (0, e7.f)();
    x[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((t = { enabled: !0, live: !0 }), (x[0] = t))
      : (t = x[0]);
    let { rows: j, isLoading: _, isError: N } = (0, te.a)(t),
      [k, S] = (0, c.useState)(j);
    y || k === j || S(j);
    let M = y && k.length > 0 ? k : j;
    x[1] !== M ? ((s = M.map(tr)), (x[1] = M), (x[2] = s)) : (s = x[2]);
    let C = s;
    ((0, tt.f)(C, C.length > 0),
      x[3] !== g.filters
        ? ((r = (0, ts.r)(g.filters)), (x[3] = g.filters), (x[4] = r))
        : (r = x[4]));
    let I = r;
    if (x[5] !== I || x[6] !== M) {
      let e;
      (x[8] !== I
        ? ((e = (e) => (0, ts.E)(e.coin, I)), (x[8] = I), (x[9] = e))
        : (e = x[9]),
        (i = M.filter(e)),
        (x[5] = I),
        (x[6] = M),
        (x[7] = i));
    } else i = x[7];
    let P = i,
      U = P[0]?.coin.mint ?? "";
    (x[10] !== g.sound || x[11] !== U
      ? ((a = { sound: g.sound, newnessKey: U }),
        (x[10] = g.sound),
        (x[11] = U),
        (x[12] = a))
      : (a = x[12]),
      e6(a));
    let E = (0, c.useRef)(null);
    return (
      x[13] !== y
        ? ((o = (0, n.jsx)(e_.q, { paused: y })), (x[13] = y), (x[14] = o))
        : (o = x[14]),
      x[15] !== v ||
      x[16] !== N ||
      x[17] !== _ ||
      x[18] !== M.length ||
      x[19] !== b ||
      x[20] !== P
        ? ((m =
            _ && 0 === M.length
              ? (0, n.jsx)(u.t, { density: v, bleed: !1 })
              : N
                ? (0, n.jsx)(eN.M, {
                    variant: "error",
                    children: b("web.screeners.error_stocks"),
                  })
                : 0 === M.length
                  ? (0, n.jsx)(eN.M, {
                      children: b("web.screeners.empty_board"),
                    })
                  : 0 === P.length
                    ? (0, n.jsx)(eN.M, {
                        children: b("web.screeners.no_coins_match"),
                      })
                    : (0, n.jsx)("div", {
                        role: "list",
                        className: "flex flex-col",
                        children: P.map(tl),
                      })),
          (x[15] = v),
          (x[16] = N),
          (x[17] = _),
          (x[18] = M.length),
          (x[19] = b),
          (x[20] = P),
          (x[21] = m))
        : (m = x[21]),
      x[22] !== w || x[23] !== m
        ? ((f = (0, n.jsx)("div", {
            ref: E,
            ...w,
            "data-testid": "screeners-coin-board-scroll",
            "data-mode": "stocks",
            "data-rows": "board",
            className: eG.b,
            children: m,
          })),
          (x[22] = w),
          (x[23] = m),
          (x[24] = f))
        : (f = x[24]),
      x[25] !== o || x[26] !== f
        ? ((h = (0, n.jsx)("div", {
            className: "flex min-h-0 w-full flex-1 flex-col",
            children: (0, n.jsxs)("div", {
              className: "relative flex min-h-0 flex-1 flex-col",
              children: [o, f],
            }),
          })),
          (x[25] = o),
          (x[26] = f),
          (x[27] = h))
        : (h = x[27]),
      h
    );
  }
  function tl(e, t) {
    return (0, n.jsx)(
      ej,
      {
        coin: e.coin,
        tickerFirst: !0,
        index: t,
        priceChange24h: e.priceChange24hPct,
        servedPriceUsd: e.priceUsd,
        figure: "price",
      },
      e.coin.mint,
    );
  }
  function tr(e) {
    return e.coin.mint;
  }
  var ti = e.i(453706),
    ta = e.i(238442),
    to = e.i(94136),
    tc = e.i(10824),
    td = e.i(994533);
  function tm(e) {
    let t,
      s,
      r,
      o,
      c,
      d,
      m = (0, l.c)(25),
      { controls: u, trailing: f } = e,
      h = (0, p.x)(),
      x = (0, a.k)(i.D.WEB_PERPS),
      { window: g, setBoard: b, setWindow: v } = u;
    m[0] !== u.board || m[1] !== x
      ? ((t = (0, td.Z)({ board: u.board, perpsEnabled: x })),
        (m[0] = u.board),
        (m[1] = x),
        (m[2] = t))
      : (t = m[2]);
    let y = t,
      w = eG.m[h],
      j = eV.V[h],
      N = eV.r[h];
    return (
      m[3] !== w || m[4] !== j || m[5] !== N
        ? ((s = (0, _.c)(w, j, N, "justify-between gap-x-2")),
          (m[3] = w),
          (m[4] = j),
          (m[5] = N),
          (m[6] = s))
        : (s = m[6]),
      m[7] !== x
        ? ((r = (0, td.H)({ perpsEnabled: x })), (m[7] = x), (m[8] = r))
        : (r = m[8]),
      m[9] !== y || m[10] !== h || m[11] !== b || m[12] !== r
        ? ((o = (0, n.jsx)(to.f, {
            density: h,
            value: y,
            onChange: b,
            boards: r,
          })),
          (m[9] = y),
          (m[10] = h),
          (m[11] = b),
          (m[12] = r),
          (m[13] = o))
        : (o = m[13]),
      m[14] !== y || m[15] !== h || m[16] !== v || m[17] !== f || m[18] !== g
        ? ((c =
            "memes" === y
              ? (0, n.jsx)(tc.f, {
                  density: h,
                  align: "end",
                  value: g,
                  onChange: v,
                })
              : f
                ? (0, n.jsx)("div", {
                    className:
                      "flex min-w-0 flex-auto items-center justify-end",
                    "data-testid": "trending-trailing-slot",
                    children: f,
                  })
                : null),
          (m[14] = y),
          (m[15] = h),
          (m[16] = v),
          (m[17] = f),
          (m[18] = g),
          (m[19] = c))
        : (c = m[19]),
      m[20] !== y || m[21] !== s || m[22] !== o || m[23] !== c
        ? ((d = (0, n.jsxs)("div", {
            className: s,
            "data-testid": "trending-window-bar",
            "data-board": y,
            children: [o, c],
          })),
          (m[20] = y),
          (m[21] = s),
          (m[22] = o),
          (m[23] = c),
          (m[24] = d))
        : (d = m[24]),
      d
    );
  }
  var tu = e.i(346204),
    tf = e.i(839739),
    th = e.i(21193),
    tx = e.i(690877),
    tp = e.i(606933),
    tg = e.i(301179),
    tb = e.i(541710),
    tv = e.i(50969),
    ty = e.i(503630),
    tw = e.i(902178),
    tj = e.i(239453);
  let t_ = (e, t, s) => {
      void 0 !== s && e.set(t, String(s));
    },
    tN = (e, t, s) => {
      s && s.length > 0 && e.set(t, s.join(","));
    };
  async function tk(e) {
    let t,
      {
        board: s,
        filter: n,
        pagination: l,
        identity: r,
        window: i,
        signal: a,
      } = e,
      o =
        ((t = new URLSearchParams()).set("tier", "web"),
        tN(t, "chains", n.chains),
        tN(t, "pairs", n.pairs),
        tN(t, "launchpads", n.launchpads),
        tN(t, "searchKeywords", n.searchKeywords),
        tN(t, "excludeKeywords", n.excludeKeywords),
        t_(t, "pMin", n.pMin),
        t_(t, "pMax", n.pMax),
        t_(t, "vol24hUsdMin", n.vol24hUsdMin),
        t_(t, "vol24hUsdMax", n.vol24hUsdMax),
        t_(t, "mcMin", n.mcMin),
        t_(t, "mcMax", n.mcMax),
        t_(t, "buyTxMin", n.buyTxMin),
        t_(t, "buyTxMax", n.buyTxMax),
        t_(t, "sellTxMin", n.sellTxMin),
        t_(t, "sellTxMax", n.sellTxMax),
        t_(t, "totalTxMin", n.totalTxMin),
        t_(t, "totalTxMax", n.totalTxMax),
        t_(t, "totalFeeMin", n.totalFeeMin),
        t_(t, "totalFeeMax", n.totalFeeMax),
        t_(t, "holdersMin", n.holdersMin),
        t_(t, "holdersMax", n.holdersMax),
        t_(t, "ageMin", n.ageMin),
        t_(t, "ageMax", n.ageMax),
        t_(t, "top10Min", n.top10Min),
        t_(t, "top10Max", n.top10Max),
        t_(t, "devHoldMin", n.devHoldMin),
        t_(t, "devHoldMax", n.devHoldMax),
        t_(t, "snipersOwnedMin", n.snipersOwnedMin),
        t_(t, "snipersOwnedMax", n.snipersOwnedMax),
        t_(t, "bundlerOwnedMin", n.bundlerOwnedMin),
        t_(t, "bundlerOwnedMax", n.bundlerOwnedMax),
        tN(t, "devBlacklist", n.devBlacklist),
        !0 === n.hasTwitter && t.set("hasTwitter", "true"),
        !0 === n.hasWebsite && t.set("hasWebsite", "true"),
        !0 === n.hasTelegram && t.set("hasTelegram", "true"),
        !0 === n.hasAnySocial && t.set("hasAnySocial", "true"),
        !0 === n.includeMayhem && t.set("includeMayhem", "true"),
        t);
    for (let [e, t] of (r?.userId && o.set("userId", r.userId),
    r?.pumpUserId && o.set("pumpUserId", r.pumpUserId),
    r?.sessionId && o.set("session_id", r.sessionId),
    r?.deviceId && o.set("device_id", r.deviceId),
    r?.sessionStartTimestampMs !== void 0 &&
      o.set("session_start_timestamp_ms", String(r.sessionStartTimestampMs)),
    r?.platform && o.set("platform", r.platform),
    r?.surface && o.set("surface", r.surface),
    void 0 !== l &&
      (o.set("offset", String(l.offset)), o.set("limit", String(l.limit))),
    Object.entries({ ...(0, tj._)({ board: s, window: i }), ...(0, tj.j)(s) })))
      o.set(e, t);
    return (0, tw.f)({
      url: `${(0, tv.f)()}/boards/${s}?${o.toString()}`,
      init: { method: "GET", signal: a },
    });
  }
  let tS = (e, t) => {
      let s = [...e];
      for (let e of t) {
        let t = s.findIndex((t) => t.m === e.mint);
        switch (e.op) {
          case "add": {
            let n =
              t >= 0
                ? { ...s[t], ...e.fields, m: e.mint }
                : { ...e.fields, m: e.mint };
            t >= 0 && s.splice(t, 1);
            let l = tM(e.idx, s.length);
            s.splice(l, 0, n);
            break;
          }
          case "remove":
            t >= 0 && s.splice(t, 1);
            break;
          case "update":
            t >= 0 && (s[t] = { ...s[t], ...e.fields, m: e.mint });
            break;
          case "move":
            if (t >= 0) {
              let [n] = s.splice(t, 1);
              n && s.splice(tM(e.idx, s.length), 0, n);
            }
        }
      }
      return s;
    },
    tM = (e, t) =>
      void 0 === e || Number.isNaN(e) ? 0 : Math.max(0, Math.min(e, t));
  var tC = e.i(344005),
    tI = e.i(569438),
    tP = e.i(491208),
    tU = tj;
  let tE = new WeakMap(),
    tT = (e, t) => {
      if (e.fh === t) return e;
      let s = tE.get(e);
      if (s && s.fh === t) return s.entry;
      let n = { ...e, fh: t };
      return (tE.set(e, { fh: t, entry: n }), n);
    },
    tA = 30;
  var tR = e.i(243134),
    tF = e.i(599077),
    t$ = e.i(499141);
  function tz() {
    let e = (0, tF.usePathname)();
    return (0, a.k)(i.D.WEB_PERPS) && (0, t$.L)(e) ? "perps" : void 0;
  }
  var tD = e.i(440276),
    tO = e.i(849812),
    tB = e.i(231824),
    tL = e.i(369091),
    tq = e.i(503774),
    tW = e.i(493025);
  let tK = {
      new: r.k9.NEW_COINS_SCREENER_FEED,
      graduating: r.k9.ABOUT_TO_GRADUATE_COINS_SCREENER_FEED,
      graduated: r.k9.GRADUATED_COINS_SCREENER_FEED,
      movers: r.k9.MOVERS_FEED,
      [eJ.c]: r.k9.TRENDING,
    },
    tH = [],
    tV = (0, ti.default)(() => e.A(557146).then((e) => e.UapiBoardFeed), {
      loadableGenerated: { modules: [180502] },
      ssr: !1,
    }),
    tG = new WeakMap(),
    tQ = new WeakMap(),
    tJ = (e, t) => {
      if (null != e.stats.volumeUsd24h || null == t) return e.stats;
      let s = tQ.get(e);
      if (s && s.fallback === t) return s.stats;
      let n = { ...e.stats, volumeUsd24h: t };
      return (tQ.set(e, { fallback: t, stats: n }), n);
    };
  function tX(e) {
    let t,
      s,
      r,
      f,
      h,
      x,
      g,
      b,
      v,
      y,
      w,
      j,
      N,
      k,
      S,
      M,
      C,
      I,
      P,
      U,
      E,
      T,
      A,
      R,
      F,
      $,
      z,
      D,
      O = (0, l.c)(115),
      {
        column: B,
        board: L,
        onSetTrending: q,
        routePick: W,
        onRoutePick: K,
      } = e,
      { t: H } = (0, d.f)(),
      { address: V, userId: G } = (0, o.F)(),
      Q = !!V,
      { ipfsPrefix: J } = (0, tL.useIpfsPrefix)(),
      X = (0, p.x)(),
      Y = (0, a.k)(i.D.UAPI_STREAM_BOARDS),
      Z = L === eJ.c,
      ee = tz();
    O[0] !== K || O[1] !== ee || O[2] !== W
      ? ((t = { routeBoard: ee, routePick: W, onRoutePick: K }),
        (O[0] = K),
        (O[1] = ee),
        (O[2] = W),
        (O[3] = t))
      : (t = O[3]);
    let et = (0, tR.f)(B.trending, q, t),
      es = et.window,
      en = (0, a.k)(i.D.WEB_PERPS);
    O[4] !== en || O[5] !== et.board
      ? ((s = (0, td.Z)({ board: et.board, perpsEnabled: en })),
        (O[4] = en),
        (O[5] = et.board),
        (O[6] = s))
      : (s = O[6]);
    let el = s,
      er = Z && "stocks" === el,
      ei = Z && "perps" === el,
      ea = er || ei,
      [eo, ec] = (0, c.useState)("all"),
      ed = Z ? tj.X : L;
    O[7] !== V || O[8] !== Z || O[9] !== G
      ? ((r = Z
          ? {
              userId: V || void 0,
              pumpUserId: G || void 0,
              ...(0, tB.f)(),
              platform: "WEB",
              surface: "TRENDING",
            }
          : void 0),
        (O[7] = V),
        (O[8] = Z),
        (O[9] = G),
        (O[10] = r))
      : (r = O[10]);
    let em = r,
      { paused: eu, targetProps: ef } = (0, e7.f)(),
      [eh, ex] = (0, c.useState)(!1),
      ep = B.filters?.minMcapUsd,
      eg = B.filters?.maxMcapUsd,
      eb = "new" === L || "movers" === L || Z ? B.filters?.chains : void 0,
      ev = B.filters?.launchpads;
    O[11] !== L || O[12] !== eb || O[13] !== ev || O[14] !== eg || O[15] !== ep
      ? ((f = (0, ts.S)(
          { minMcapUsd: ep, maxMcapUsd: eg, chains: eb, launchpads: ev },
          L,
        )),
        (O[11] = L),
        (O[12] = eb),
        (O[13] = ev),
        (O[14] = eg),
        (O[15] = ep),
        (O[16] = f))
      : (f = O[16]);
    let ey = f,
      ew = B.filters?.chains,
      ej = "new" === L || "movers" === L ? ew : void 0,
      ek =
        void 0 !== ep ||
        void 0 !== eg ||
        (ey.chains?.length ?? 0) > 0 ||
        (ey.platforms?.length ?? 0) > 0 ||
        (Y && (ej?.length ?? 0) > 0),
      [eS, eM] = (0, c.useState)(!1),
      eC = Y && !Z && !ev?.length,
      eI = eC && !eS,
      eP = Q && ("movers" === L || Z),
      eU = !eI && !ea;
    O[17] !== em || O[18] !== Z || O[19] !== es
      ? ((h = Z
          ? {
              identity: em,
              pinEntrants: !1,
              holdSnapshots: !0,
              pageSize: 150,
              window: es,
            }
          : {}),
        (O[17] = em),
        (O[18] = Z),
        (O[19] = es),
        (O[20] = h))
      : (h = O[20]);
    let eT = eu || eh;
    O[21] !== eU || O[22] !== ey || O[23] !== h || O[24] !== eT || O[25] !== ed
      ? ((x = {
          board: ed,
          filters: ey,
          ...h,
          enabled: eU,
          holdStructural: eT,
        }),
        (O[21] = eU),
        (O[22] = ey),
        (O[23] = h),
        (O[24] = eT),
        (O[25] = ed),
        (O[26] = x))
      : (x = O[26]);
    let {
      entries: eA,
      isLoading: eR,
      isError: eF,
      heldCount: e$,
      flushHeld: ez,
      hasNextPage: eD,
      isFetchingNextPage: eO,
      fetchNextPage: eB,
    } = (({
      board: e = tU.s,
      filters: t,
      identity: s,
      pinEntrants: n,
      holdSnapshots: l = !1,
      pageSize: r = tA,
      window: i,
      followedHoldersByMint: a,
      enabled: o,
      holdStructural: d,
    }) => {
      let m = e === tU.X ? (i ?? tP.L) : void 0,
        u = n ?? e === tU.s,
        f = (0, tb.l)(),
        h = (0, c.useMemo)(() => {
          let s = (0, tI.O)(t, (0, tI.B)(e, f));
          if (e === tU.s || e === tU.X || "new" === e) return s;
          let { chains: n, ...l } = s;
          return l;
        }, [t, e, f]),
        x = (0, tI.E)(h),
        p = [
          s?.userId ?? "",
          s?.pumpUserId ?? "",
          s?.platform ?? "",
          s?.surface ?? "",
        ].join(":"),
        g = m ? `|${m}` : "",
        b = `${e}|${x}|${p}${g}`,
        [v, y] = (0, c.useState)(null),
        [w, j] = (0, c.useState)(null),
        [_, N] = (0, c.useState)(!1),
        [k, S] = (0, c.useState)(0),
        [M, C] = (0, c.useState)(!1),
        [I, P] = (0, c.useState)(0),
        U = (0, c.useRef)(v);
      U.current = v;
      let E = (0, c.useRef)(w);
      E.current = w;
      let T = (0, c.useRef)(d);
      T.current = d;
      let A = (0, c.useRef)([]),
        R = (0, c.useRef)(l);
      R.current = l;
      let F = (0, c.useRef)(null),
        $ = (0, c.useRef)(0),
        z = (0, c.useRef)(null),
        D = (0, c.useRef)(null),
        O = (0, c.useRef)(new Map()),
        [B, L] = (0, c.useState)(b);
      B !== b &&
        (L(b),
        y(null),
        j(null),
        (A.current = []),
        (F.current = null),
        ($.current = 0),
        (z.current = null),
        S(0),
        (D.current = null),
        (O.current = new Map()));
      let q = (0, c.useCallback)(
          (e) => {
            if (!u) return e;
            let t = Date.now(),
              s = O.current,
              n = D.current;
            if (n) for (let l of e) n.has(l.m) || s.has(l.m) || s.set(l.m, t);
            for (let [n, l] of ((D.current = new Set(e.map((e) => e.m))), s))
              t - l > 9e4 && s.delete(n);
            for (; s.size > 12; ) {
              let e = s.keys().next().value;
              if (void 0 === e) break;
              s.delete(e);
            }
            if (0 === s.size) return e;
            let l = e
              .filter((e) => s.has(e.m))
              .sort((e, t) => (s.get(t.m) ?? 0) - (s.get(e.m) ?? 0));
            return 0 === l.length ? e : [...l, ...e.filter((e) => !s.has(e.m))];
          },
          [u],
        ),
        W = (0, c.useCallback)(() => {
          let e = U.current?.identity === b ? U.current.entries : [],
            t = E.current?.identity === b ? E.current.entries : [];
          return t.length > 0 ? [...e, ...t] : e;
        }, [b]),
        K = (0, c.useCallback)(
          (e) => {
            let t = new Set(W().map((e) => e.m));
            return e.filter((e) => !t.has(e.m)).length;
          },
          [W],
        ),
        H = (0, tp.useQueryClient)(),
        V = (0, tx.useQuery)({
          queryKey: ["trenches", "board", e, x, p, r, m ?? null],
          queryFn: ({ signal: t }) =>
            tk({
              board: e,
              filter: h,
              pagination: { offset: 0, limit: r },
              identity: s,
              window: m,
              signal: t,
            }),
          enabled: o,
          staleTime: 5e3,
          refetchOnWindowFocus: !1,
          retry: (0, tC.f)(H),
        }),
        G = V.data?.entries;
      (0, c.useEffect)(() => {
        if (!G) return;
        let e = U.current;
        (R.current &&
        T.current &&
        e?.identity === b &&
        "ws" !== e.source &&
        e.entries.length > 0
          ? ((z.current = G),
            F.current ||
              (($.current = K(G)),
              (0, c.startTransition)(() => {
                S($.current + A.current.length);
              })))
          : ((z.current = null),
            y((e) =>
              e?.identity === b && "ws" === e.source
                ? e
                : { identity: b, entries: G, source: "rest" },
            )),
          null === D.current && (D.current = new Set(G.map((e) => e.m))));
      }, [G, b, K]);
      let Q = (0, c.useCallback)(
          (e) => {
            let t = U.current;
            if (!t || t.identity !== b) return;
            let s = [],
              n = !1;
            for (let t of e)
              if ("update" !== t.op && T.current) {
                if (A.current.length >= 400) {
                  n = !0;
                  break;
                }
                A.current.push(t);
              } else s.push(t);
            if (n) {
              ((A.current = []),
                (F.current = null),
                ($.current = 0),
                (z.current = null),
                S(0),
                y(null),
                j(null),
                P((e) => e + 1));
              return;
            }
            let l = F.current;
            (l && s.length > 0 && (F.current = tS(l, s)),
              (0, c.startTransition)(() => {
                (S($.current + A.current.length),
                  s.length > 0 &&
                    y((e) =>
                      e && e.identity === b
                        ? { ...e, entries: tS(e.entries, s) }
                        : e,
                    ));
              }));
          },
          [b],
        ),
        J = (0, c.useCallback)(() => {
          let e = A.current,
            t = F.current,
            s = z.current;
          if (0 === e.length && !t && !s) return;
          ((A.current = []),
            (F.current = null),
            ($.current = 0),
            (z.current = null));
          let n = t ? q(t) : null;
          (0, c.startTransition)(() => {
            (S(0),
              n && j(null),
              y((t) =>
                t && t.identity === b
                  ? {
                      identity: b,
                      entries: tS(
                        n ?? (s && "ws" !== t.source ? s : t.entries),
                        e,
                      ),
                      source: n ? "ws" : t.source,
                    }
                  : t,
              ));
          });
        }, [b, q]),
        X = (0, c.useCallback)(
          (e) => {
            A.current = [];
            let t = U.current;
            if (
              R.current &&
              T.current &&
              t?.identity === b &&
              t.entries.length > 0
            ) {
              ((F.current = e),
                ($.current = K(e)),
                (0, c.startTransition)(() => {
                  S($.current);
                }));
              return;
            }
            ((F.current = null), ($.current = 0), (z.current = null));
            let s = q(e);
            (0, c.startTransition)(() => {
              (S(0), j(null), y({ identity: b, entries: s, source: "ws" }));
            });
          },
          [b, q, K],
        );
      (0, c.useEffect)(() => {
        d || J();
      }, [d, J]);
      let Y = (0, c.useCallback)(() => {
        if (!o || _) return;
        let t = w?.identity === b ? w : null,
          n = t?.nextOffset ?? r;
        t?.exhausted ||
          n > 120 ||
          (N(!0),
          tk({
            board: e,
            filter: h,
            pagination: { offset: n, limit: r },
            identity: s,
            window: m,
          })
            .then((e) => {
              j((t) => {
                let s = t?.identity === b ? t.entries : [];
                return {
                  identity: b,
                  entries: [...s, ...e.entries],
                  nextOffset: n + r,
                  exhausted: e.entries.length < r,
                };
              });
            })
            .catch(() => {})
            .finally(() => N(!1)));
      }, [o, _, w, b, e, h, s, r, m]);
      (0, c.useEffect)(() => {
        if (!o) return;
        let t = !1,
          n = null,
          l = null,
          i = null,
          a = 0,
          c = [],
          d = e === tU.X ? [tU.X, tU.s] : [e],
          u = () => {
            if (!t) {
              var i;
              let o, d;
              (((n = new WebSocket(
                ((i = `${x}|${p}${g}`),
                (o = (0, ty.U)().replace(/^http/, "ws")),
                (d = encodeURIComponent(
                  JSON.stringify({ board: e, tier: "web", filterKey: i }),
                )),
                `${o}/ws/trenches?subscription=${d}`),
              )).onopen = () => {
                var t;
                let l;
                ((a = 0), C(!0));
                let i = {
                  ...(r === tA ? {} : { limit: r }),
                  ...(m ? { window: m } : {}),
                };
                n?.send(
                  ((t = Object.keys(i).length > 0 ? i : void 0),
                  (l = Object.values(h).some((e) => void 0 !== e)),
                  JSON.stringify({
                    event: "subscribe",
                    data: {
                      board: e,
                      tier: "web",
                      ...(t?.limit !== void 0 ? { limit: t.limit } : {}),
                      ...(0, tj._)({ board: e, window: t?.window }),
                      ...(0, tj.j)(e),
                      ...(l ? { filters: h } : {}),
                      ...(s?.userId ? { userId: s.userId } : {}),
                      ...(s?.pumpUserId ? { pumpUserId: s.pumpUserId } : {}),
                      ...(s?.sessionId ? { sessionId: s.sessionId } : {}),
                      ...(s?.deviceId ? { deviceId: s.deviceId } : {}),
                      ...(s?.sessionStartTimestampMs !== void 0
                        ? {
                            sessionStartTimestampMs: String(
                              s.sessionStartTimestampMs,
                            ),
                          }
                        : {}),
                      platform: s?.platform ?? "WEB",
                      surface: s?.surface ?? "WEB",
                    },
                  })),
                );
              }),
                (n.onmessage = (e) => {
                  try {
                    c.push(JSON.parse(String(e.data)));
                  } catch {}
                }),
                (n.onclose = () => {
                  if ((C(!1), t)) return;
                  let e = Math.min(1e3 * 2 ** a, 3e4);
                  ((a += 1), (l = setTimeout(u, e)));
                }),
                (n.onerror = () => {}));
            }
          };
        return (
          u(),
          (i = setInterval(() => {
            if (0 === c.length) return;
            let e = c;
            c = [];
            let t = -1;
            for (let s = e.length - 1; s >= 0; s -= 1)
              if ((0, tU.f)(e[s])) {
                t = s;
                break;
              }
            if (t >= 0) {
              let s,
                n = e[t];
              (0, tU.f)(n) && ((s = n.board), d.includes(s)) && X(n.entries);
            }
            let s = e
              .slice(t + 1)
              .filter(tU.h)
              .filter((e) => {
                let t;
                return ((t = e.board), d.includes(t));
              })
              .flatMap((e) => e.patches);
            s.length > 0 && Q(s);
          }, 1e3)),
          () => {
            ((t = !0),
              null !== l && clearTimeout(l),
              null !== i && clearInterval(i),
              C(!1),
              n &&
                ((n.onopen = null),
                (n.onmessage = null),
                (n.onclose = null),
                (n.onerror = null),
                n.close()));
          }
        );
      }, [o, e, x, p, g, I, r]);
      let Z = (0, c.useMemo)(() => {
          if (!v || v.identity !== b) return [];
          let e = v.entries,
            s = w?.identity === b ? w.entries : [],
            n = new Set(e.map((e) => e.m)),
            l = [...e];
          for (let e of s) n.has(e.m) || (n.add(e.m), l.push(e));
          let r = (0, tI.K)(l, t);
          return a ? r.map((e) => tT(e, (0, tg.k)(a, e.m))) : r;
        }, [v, w, b, t, a]),
        ee = w?.identity === b ? w : null,
        et =
          null !== v &&
          v.entries.length >= r &&
          !ee?.exhausted &&
          (ee?.nextOffset ?? r) <= 120;
      return {
        entries: Z,
        isLoading: o && null === v && V.isPending,
        isError: null === v && V.isError,
        heldCount: k,
        flushHeld: J,
        isLive: M,
        hasNextPage: et,
        isFetchingNextPage: _,
        fetchNextPage: Y,
      };
    })(x);
    O[27] !== eA ? ((g = eA.map(t0)), (O[27] = eA), (O[28] = g)) : (g = O[28]);
    let eL = g,
      eq = eP && eU;
    O[29] !== eL || O[30] !== eq
      ? ((b = { enabled: eq, mints: eL }),
        (O[29] = eL),
        (O[30] = eq),
        (O[31] = b))
      : (b = O[31]);
    let { facepilesByMint: eW } = (0, tf.f)(b);
    O[32] !== eA || O[33] !== eW
      ? ((v = eW ? eA.map((e) => tT(e, (0, tg.k)(eW, e.m))) : eA),
        (O[32] = eA),
        (O[33] = eW),
        (O[34] = v))
      : (v = O[34]);
    let eH = v,
      [eV, eQ] = (0, c.useState)();
    if (O[35] !== eH || O[36] !== J || O[37] !== Z) {
      let e;
      (O[39] !== J || O[40] !== Z
        ? ((e = (e, t) =>
            ((e, t, s) => {
              let n = tG.get(e);
              if (n && n.ipfsPrefix === t && n.servedRank === s) return n.row;
              let l = (0, tq.J)(e, { servedRank: s });
              return (
                (0, tW.f)([l.coin], t),
                tG.set(e, { ipfsPrefix: t, servedRank: s, row: l }),
                l
              );
            })(e, J, Z ? t + 1 : void 0)),
          (O[39] = J),
          (O[40] = Z),
          (O[41] = e))
        : (e = O[41]),
        (y = eH.map(e)),
        (O[35] = eH),
        (O[36] = J),
        (O[37] = Z),
        (O[38] = y));
    } else y = O[38];
    let eX = y;
    e: {
      let e;
      if (!eI) {
        w = void 0;
        break e;
      }
      if (O[42] !== eg || O[43] !== ep || O[44] !== eV || O[45] !== ej) {
        let t = { chains: ej, minMcapUsd: ep, maxMcapUsd: eg };
        ((e = (eV ?? []).filter((e) => (0, ts.E)(e.coin, t))),
          (O[42] = eg),
          (O[43] = ep),
          (O[44] = eV),
          (O[45] = ej),
          (O[46] = e));
      } else e = O[46];
      w = e;
    }
    let eY = w ?? eX,
      [eZ, e0] = (0, c.useState)(!1);
    (O[47] === Symbol.for("react.memo_cache_sentinel")
      ? ((j = () => {
          let e = setTimeout(() => e0(!0), 6e3);
          return () => clearTimeout(e);
        }),
        (N = []),
        (O[47] = j),
        (O[48] = N))
      : ((j = O[47]), (N = O[48])),
      (0, c.useEffect)(j, N));
    let e1 = eI ? void 0 === eV : eR || (eF && !eZ),
      e2 = !eI && eF && eZ;
    O[49] !== eY ? ((k = eY.map(tZ)), (O[49] = eY), (O[50] = k)) : (k = O[50]);
    let e3 = k,
      e4 = Z && !ea && eU;
    (O[51] !== e3 || O[52] !== e4 || O[53] !== es
      ? ((S = { coins: e3, window: es, enabled: e4 }),
        (O[51] = e3),
        (O[52] = e4),
        (O[53] = es),
        (O[54] = S))
      : (S = O[54]),
      (0, tD.f)(S),
      O[55] !== e3
        ? ((M = e3.map(tY)), (O[55] = e3), (O[56] = M))
        : (M = O[56]));
    let e5 = M;
    if (((0, tt.f)(eI ? tH : e5, !eI && e5.length > 0), O[57] !== eY)) {
      for (let e of ((C = []), eY)) (0, tq.t)(e.stats) && C.push(e.coin.mint);
      ((O[57] = eY), (O[58] = C));
    } else C = O[58];
    let e9 = C,
      te = e9.length > 0;
    O[59] !== te
      ? ((I = { shouldFetch: te }), (O[59] = te), (O[60] = I))
      : (I = O[60]);
    let { marketActivity: tl } = (0, tO.b)(e9, I);
    if (O[61] !== tl || O[62] !== eY) {
      for (let e of ((P = {}), eY))
        P[e.coin.mint] = tJ(e, tl[e.coin.mint]?.["24h"]?.volumeUSD);
      ((O[61] = tl), (O[62] = eY), (O[63] = P));
    } else P = O[63];
    let tr = P,
      ti = (0, th.C)(e5),
      to = `${e5[0] ?? ""}|${e$}`;
    (O[64] !== B.sound || O[65] !== to
      ? ((U = { sound: B.sound, newnessKey: to }),
        (O[64] = B.sound),
        (O[65] = to),
        (O[66] = U))
      : (U = O[66]),
      e6(U));
    let tc = (0, c.useRef)(null);
    O[67] === Symbol.for("react.memo_cache_sentinel")
      ? ((E = () => {
          let e = tc.current;
          e && ex(e.scrollTop > 8);
        }),
        (O[67] = E))
      : (E = O[67]);
    let tv = E;
    O[68] !== ez
      ? ((T = () => {
          (ez(), tc.current?.scrollTo({ top: 0, behavior: "smooth" }));
        }),
        (O[68] = ez),
        (O[69] = T))
      : (T = O[69]);
    let tw = T;
    return (
      O[70] !== X || O[71] !== Z || O[72] !== eo || O[73] !== ei || O[74] !== et
        ? ((A = Z
            ? (0, n.jsx)(tm, {
                controls: et,
                trailing: ei
                  ? (0, n.jsx)(tu.f, { density: X, value: eo, onChange: ec })
                  : void 0,
              })
            : null),
          (O[70] = X),
          (O[71] = Z),
          (O[72] = eo),
          (O[73] = ei),
          (O[74] = et),
          (O[75] = A))
        : (A = O[75]),
      O[76] !== B || O[77] !== er
        ? ((R = er
            ? (0, n.jsx)(tn, { column: B }, "pro-trending-stocks")
            : null),
          (O[76] = B),
          (O[77] = er),
          (O[78] = R))
        : (R = O[78]),
      O[79] !== B || O[80] !== eo || O[81] !== ei
        ? ((F = ei
            ? (0, n.jsx)(e8, { column: B, category: eo }, "pro-trending-perps")
            : null),
          (O[79] = B),
          (O[80] = eo),
          (O[81] = ei),
          (O[82] = F))
        : (F = O[82]),
      O[83] !== L || O[84] !== J || O[85] !== eC
        ? (($ = eC
            ? (0, n.jsx)(tV, {
                board: L,
                ipfsPrefix: J,
                onRows: eQ,
                onDown: eM,
              })
            : null),
          (O[83] = L),
          (O[84] = J),
          (O[85] = eC),
          (O[86] = $))
        : ($ = O[86]),
      O[87] !== L ||
      O[88] !== e3 ||
      O[89] !== X ||
      O[90] !== e2 ||
      O[91] !== eB ||
      O[92] !== ti ||
      O[93] !== tw ||
      O[94] !== eD ||
      O[95] !== ek ||
      O[96] !== e$ ||
      O[97] !== eO ||
      O[98] !== Q ||
      O[99] !== Z ||
      O[100] !== e1 ||
      O[101] !== ef ||
      O[102] !== eu ||
      O[103] !== eY ||
      O[104] !== ea ||
      O[105] !== tr ||
      O[106] !== eI ||
      O[107] !== H
        ? ((z = ea
            ? null
            : (0, n.jsxs)(n.Fragment, {
                children: [
                  (0, n.jsx)(ta.f, {
                    count: e$,
                    label: H("web.feed.show_new_coins", {
                      count: e$,
                      shown: (0, eE.T)(
                        e$ > 99 ? "99+" : String(e$),
                        "number-format",
                      ),
                    }),
                    tail: H("web.feed.new_coins", { count: e$ }),
                    onClick: tw,
                    placement: "inline",
                    className: "py-2",
                  }),
                  (0, n.jsxs)("div", {
                    className: "relative flex min-h-0 flex-1 flex-col",
                    children: [
                      (0, n.jsx)(e_.q, { paused: eu }),
                      (0, n.jsxs)("div", {
                        ref: tc,
                        onScroll: tv,
                        ...ef,
                        "data-testid": "screeners-trenches-board-scroll",
                        "data-board": L,
                        className: eG.b,
                        children: [
                          e1 && 0 === eY.length
                            ? (0, n.jsx)(u.E, { density: X, bleed: !1 })
                            : e2
                              ? (0, n.jsx)(eN.M, {
                                  variant: "error",
                                  children: H("common.something_went_wrong"),
                                })
                              : 0 === eY.length
                                ? (0, n.jsx)(eN.M, {
                                    children: H(
                                      ek
                                        ? "web.screeners.no_coins_match"
                                        : "web.screeners.empty_board",
                                    ),
                                  })
                                : (0, n.jsx)("div", {
                                    role: "list",
                                    className: (0, _.c)("flex flex-col", eG.c),
                                    children: e3.map((e, t) =>
                                      (0, n.jsx)(
                                        eK,
                                        {
                                          coin: e,
                                          stats: tr[e.mint],
                                          isLoggedIn: Q,
                                          tickerOnly: Z,
                                          index: t,
                                          sourceElement: tK[L],
                                          className: (0, _.c)(
                                            eG.Q,
                                            u._[X],
                                            ti.has(e.mint) && th.l,
                                          ),
                                        },
                                        e.mint,
                                      ),
                                    ),
                                  }),
                          (0, n.jsx)(m.f, {
                            hasNextPage: !eI && eD,
                            isFetchingNextPage: eO,
                            onFetchNextPage: eB,
                            autoLoad: !0,
                            scrollRootRef: tc,
                            rootMargin: "200px 0px",
                            label: (0, eE.G)("Show more coins"),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })),
          (O[87] = L),
          (O[88] = e3),
          (O[89] = X),
          (O[90] = e2),
          (O[91] = eB),
          (O[92] = ti),
          (O[93] = tw),
          (O[94] = eD),
          (O[95] = ek),
          (O[96] = e$),
          (O[97] = eO),
          (O[98] = Q),
          (O[99] = Z),
          (O[100] = e1),
          (O[101] = ef),
          (O[102] = eu),
          (O[103] = eY),
          (O[104] = ea),
          (O[105] = tr),
          (O[106] = eI),
          (O[107] = H),
          (O[108] = z))
        : (z = O[108]),
      O[109] !== A ||
      O[110] !== R ||
      O[111] !== F ||
      O[112] !== $ ||
      O[113] !== z
        ? ((D = (0, n.jsxs)("div", {
            className: "flex min-h-0 w-full flex-1 flex-col",
            children: [A, R, F, $, z],
          })),
          (O[109] = A),
          (O[110] = R),
          (O[111] = F),
          (O[112] = $),
          (O[113] = z),
          (O[114] = D))
        : (D = O[114]),
      D
    );
  }
  function tY(e) {
    return e.mint;
  }
  function tZ(e) {
    return e.coin;
  }
  function t0(e) {
    return e.m;
  }
  var t1 = e.i(852190),
    t2 = e.i(201629),
    t3 = e.i(637172),
    t4 = e.i(646908);
  let t5 = [];
  function t6() {
    return new Map();
  }
  function t7(e) {
    let t,
      s = (0, l.c)(7),
      { column: r, onSetBoard: i, onSetTrending: a } = e;
    if ("movers" !== r.type) {
      let e;
      return (
        s[0] !== r || s[1] !== a
          ? ((e = (0, n.jsx)(t9, { column: r, onSetTrending: a })),
            (s[0] = r),
            (s[1] = a),
            (s[2] = e))
          : (e = s[2]),
        e
      );
    }
    return (
      s[3] !== r || s[4] !== i || s[5] !== a
        ? ((t = (0, n.jsx)(t8, { column: r, onSetBoard: i, onSetTrending: a })),
          (s[3] = r),
          (s[4] = i),
          (s[5] = a),
          (s[6] = t))
        : (t = s[6]),
      t
    );
  }
  function t9(e) {
    let t,
      s,
      r,
      o,
      d,
      m,
      u = (0, l.c)(21),
      { column: f, onSetTrending: h } = e,
      x = (0, p.x)(),
      g = tz();
    u[0] !== g ? ((t = { routeBoard: g }), (u[0] = g), (u[1] = t)) : (t = u[1]);
    let b = (0, tR.f)(f.trending, h, t),
      v = (0, a.k)(i.D.WEB_PERPS);
    u[2] !== b.board || u[3] !== v
      ? ((s = (0, td.Z)({ board: b.board, perpsEnabled: v })),
        (u[2] = b.board),
        (u[3] = v),
        (u[4] = s))
      : (s = u[4]);
    let y = s,
      { window: w } = b,
      [j, _] = (0, c.useState)("all");
    return (
      u[5] !== y || u[6] !== x || u[7] !== j
        ? ((r =
            "perps" === y
              ? (0, n.jsx)(tu.f, { density: x, value: j, onChange: _ })
              : void 0),
          (u[5] = y),
          (u[6] = x),
          (u[7] = j),
          (u[8] = r))
        : (r = u[8]),
      u[9] !== b || u[10] !== r
        ? ((o = (0, n.jsx)(tm, { controls: b, trailing: r })),
          (u[9] = b),
          (u[10] = r),
          (u[11] = o))
        : (o = u[11]),
      u[12] !== y || u[13] !== f || u[14] !== j || u[15] !== w
        ? ((d =
            "stocks" === y
              ? (0, n.jsx)(tn, { column: f }, "deck-trending-stocks")
              : "perps" === y
                ? (0, n.jsx)(
                    e8,
                    { column: f, category: j },
                    "deck-trending-perps",
                  )
                : (0, n.jsx)(
                    sn,
                    { column: f, mode: "trending", window: w },
                    "deck-trending-board",
                  )),
          (u[12] = y),
          (u[13] = f),
          (u[14] = j),
          (u[15] = w),
          (u[16] = d))
        : (d = u[16]),
      u[17] !== y || u[18] !== o || u[19] !== d
        ? ((m = (0, n.jsxs)("div", {
            className: "flex h-full min-h-0 w-full flex-col",
            "data-testid": "deck-trending",
            "data-board": y,
            children: [o, d],
          })),
          (u[17] = y),
          (u[18] = o),
          (u[19] = d),
          (u[20] = m))
        : (m = u[20]),
      m
    );
  }
  function t8(e) {
    let t,
      s,
      r,
      o,
      d,
      m,
      u = (0, l.c)(27),
      { column: f, onSetBoard: h, onSetTrending: x } = e,
      p = (0, a.k)(i.D.UAPI_STREAM_BOARDS),
      [g, b] = (0, c.useState)(),
      v = (0, a.k)(i.D.WEB_TRENDING_BOARD),
      y = (0, t1.f)(i.D.WEB_TRENDING_BOARD),
      w = (0, eJ.y)(f.board) ? f.board : eJ.b,
      [j, _] = (0, c.useState)(w),
      N = h ? w : j,
      k = !v && !y && N === eJ.c,
      S = v || k || N !== eJ.c ? N : eJ.b;
    u[0] !== S || u[1] !== h
      ? ((t = (e) => {
          e !== S && (h ? h(e) : _(e));
        }),
        (u[0] = S),
        (u[1] = h),
        (u[2] = t))
      : (t = u[2]);
    let M = t,
      C = (0, tb.l)();
    if (u[3] !== S || u[4] !== C || u[5] !== f) {
      let e = (0, ts.x)(
        f.filters,
        (0, ts.M)({
          view: f.type,
          board: S,
          chains: f.filters?.chains,
          exposure: C,
        }),
      );
      ((s = e === f.filters ? f : { ...f, filters: e }),
        (r = (e?.launchpads ?? []).join(",")),
        (u[3] = S),
        (u[4] = C),
        (u[5] = f),
        (u[6] = s),
        (u[7] = r));
    } else ((s = u[6]), (r = u[7]));
    let I = r,
      P = v ? eJ.B : eJ.M;
    return (
      u[8] !== S || u[9] !== M || u[10] !== P
        ? ((o = (0, n.jsx)(eY, { value: S, onChange: M, boards: P })),
          (u[8] = S),
          (u[9] = M),
          (u[10] = P),
          (u[11] = o))
        : (o = u[11]),
      u[12] !== k ||
      u[13] !== S ||
      u[14] !== s ||
      u[15] !== f.filters?.chains ||
      u[16] !== f.filters?.maxMcapUsd ||
      u[17] !== f.filters?.minMcapUsd ||
      u[18] !== I ||
      u[19] !== x ||
      u[20] !== g ||
      u[21] !== p
        ? ((d = k
            ? (0, n.jsx)("div", {
                className: eG.b,
                "data-testid": "pro-screener-settling",
                children: (0, n.jsx)(eN.c, {}),
              })
            : "movers" !== S || p
              ? S === eJ.c
                ? (0, n.jsx)(
                    tX,
                    {
                      column: s,
                      board: S,
                      onSetTrending: x,
                      routePick: g,
                      onRoutePick: b,
                    },
                    `trending|${f.filters?.minMcapUsd ?? ""}|${f.filters?.maxMcapUsd ?? ""}|${(f.filters?.chains ?? []).toSorted().join(",")}|${I}`,
                  )
                : (0, n.jsx)(
                    tX,
                    { column: s, board: S },
                    `${S}|${f.filters?.minMcapUsd ?? ""}|${f.filters?.maxMcapUsd ?? ""}|${"new" === S || "movers" === S ? (f.filters?.chains ?? []).toSorted().join(",") : ""}|${I}`,
                  )
              : (0, n.jsx)(sn, { column: s, mode: "movers" }, "movers")),
          (u[12] = k),
          (u[13] = S),
          (u[14] = s),
          (u[15] = f.filters?.chains),
          (u[16] = f.filters?.maxMcapUsd),
          (u[17] = f.filters?.minMcapUsd),
          (u[18] = I),
          (u[19] = x),
          (u[20] = g),
          (u[21] = p),
          (u[22] = d))
        : (d = u[22]),
      u[23] !== S || u[24] !== o || u[25] !== d
        ? ((m = (0, n.jsxs)("div", {
            className: "flex h-full min-h-0 w-full flex-col",
            "data-testid": "pro-screener",
            "data-board": S,
            children: [o, d],
          })),
          (u[23] = S),
          (u[24] = o),
          (u[25] = d),
          (u[26] = m))
        : (m = u[26]),
      m
    );
  }
  let se = ({ chain_id: e }) => !(0, t4.L)(e) && !(0, t4.B)(e) && !(0, t4._)(e),
    st = (e) => se(e) && !(0, eT.N)({ mint: e.mint, chainId: e.chain_id }),
    ss = { movers: "pro", trending: "board" };
  function sn(e) {
    let t,
      s,
      i,
      a,
      f,
      h,
      x,
      g,
      b,
      v,
      y,
      w,
      j,
      N,
      k,
      S,
      M,
      C,
      I,
      P = (0, l.c)(72),
      { column: U, mode: E, window: T } = e,
      { t: A } = (0, d.f)(),
      R = ss[E],
      F = "pro" === R,
      { address: $ } = (0, o.F)(),
      z = !!$,
      D = (0, p.x)(),
      { paused: O, targetProps: B } = (0, e7.f)();
    P[0] !== U.filters?.chains
      ? ((t = U.filters?.chains?.filter(t3.e)),
        (P[0] = U.filters?.chains),
        (P[1] = t))
      : (t = P[1]);
    let L = t;
    (P[2] !== T
      ? ((s = T ? { window: T } : {}), (P[2] = T), (P[3] = s))
      : (s = P[3]),
      P[4] !== L
        ? ((i = L?.length ? { chains: L } : {}), (P[4] = L), (P[5] = i))
        : (i = P[5]),
      P[6] !== E || P[7] !== O || P[8] !== s || P[9] !== i
        ? ((a = { mode: E, paused: O, ...s, ...i }),
          (P[6] = E),
          (P[7] = O),
          (P[8] = s),
          (P[9] = i),
          (P[10] = a))
        : (a = P[10]));
    let {
      coins: q,
      proStatsByMint: W,
      isLoading: K,
      isError: H,
      hasNextPage: V,
      isFetchingNextPage: G,
      fetchNextPage: Q,
    } = (0, eH.f)(a);
    P[11] !== q
      ? ((f = q.filter(st).map(si)), (P[11] = q), (P[12] = f))
      : (f = P[12]);
    let J = f;
    ((0, tt.f)(J, J.length > 0),
      P[13] !== q
        ? ((h = q.filter(se).map(sr)), (P[13] = q), (P[14] = h))
        : (h = P[14]));
    let X = h,
      Y = "trending" === E;
    (P[15] !== q || P[16] !== Y || P[17] !== T
      ? ((x = { coins: q, window: T, enabled: Y }),
        (P[15] = q),
        (P[16] = Y),
        (P[17] = T),
        (P[18] = x))
      : (x = P[18]),
      (0, tD.f)(x),
      P[19] !== X || P[20] !== F || P[21] !== W
        ? ((g = F ? X.filter((e) => (0, tq.t)(W[e])) : X),
          (P[19] = X),
          (P[20] = F),
          (P[21] = W),
          (P[22] = g))
        : (g = P[22]));
    let Z = g,
      ee = Z.length > 0;
    P[23] !== ee
      ? ((b = { shouldFetch: ee }), (P[23] = ee), (P[24] = b))
      : (b = P[24]);
    let { marketActivity: et } = (0, t2.f)(Z, b),
      es = (function (e, t) {
        let s,
          n = (0, l.c)(4),
          [r, i] = (0, c.useState)(t6);
        if (n[0] !== r || n[1] !== t || n[2] !== e) {
          for (let n of ((s = null), e)) {
            let e = t[n]?.["24h"]?.priceChangePercent;
            "number" == typeof e &&
              r.get(n) !== e &&
              (null === s && (s = new Map(r)), s.set(n, e));
          }
          ((n[0] = r), (n[1] = t), (n[2] = e), (n[3] = s));
        } else s = n[3];
        return (s && i(s), s ?? r);
      })(Z, et);
    if (P[25] !== et || P[26] !== W) {
      let e;
      for (let [t, s] of ((v = {}),
      P[28] !== W
        ? ((e = Object.entries(W)), (P[28] = W), (P[29] = e))
        : (e = P[29]),
      e)) {
        let e = et[t]?.["24h"]?.volumeUSD;
        v[t] =
          null != s.volumeUsd24h || null == e ? s : { ...s, volumeUsd24h: e };
      }
      ((P[25] = et), (P[26] = W), (P[27] = v));
    } else v = P[27];
    let en = v,
      el = U.filters;
    if (P[30] !== q || P[31] !== el) {
      let e;
      (P[33] !== el
        ? ((e = (e) => (0, ts.E)(e, el)), (P[33] = el), (P[34] = e))
        : (e = P[34]),
        (y = q.filter(e)),
        (P[30] = q),
        (P[31] = el),
        (P[32] = y));
    } else y = P[32];
    let er = y;
    P[35] !== F || P[36] !== er
      ? ((w = F ? er.map(sl) : t5), (P[35] = F), (P[36] = er), (P[37] = w))
      : (w = P[37]);
    let ei = (0, th.C)(w),
      ea = er[0]?.mint ?? "";
    (P[38] !== U.sound || P[39] !== ea
      ? ((j = { sound: U.sound, newnessKey: ea }),
        (P[38] = U.sound),
        (P[39] = ea),
        (P[40] = j))
      : (j = P[40]),
      e6(j));
    let eo = (0, c.useRef)(null);
    return (
      P[41] !== O
        ? ((N = (0, n.jsx)(e_.q, { paused: O })), (P[41] = O), (P[42] = N))
        : (N = P[42]),
      P[43] !== q.length ||
      P[44] !== D ||
      P[45] !== ei ||
      P[46] !== es ||
      P[47] !== H ||
      P[48] !== K ||
      P[49] !== z ||
      P[50] !== E ||
      P[51] !== F ||
      P[52] !== en ||
      P[53] !== A ||
      P[54] !== er
        ? ((k =
            K && 0 === q.length
              ? F
                ? (0, n.jsx)(u.E, { density: D, bleed: !1 })
                : (0, n.jsx)(u.t, { density: D, bleed: !1 })
              : H
                ? (0, n.jsx)(eN.M, {
                    variant: "error",
                    children: A(
                      "movers" === E
                        ? "web.screeners.error_movers"
                        : "web.screeners.error_trending",
                    ),
                  })
                : 0 === q.length
                  ? (0, n.jsx)(eN.M, {
                      children: A("web.screeners.empty_board"),
                    })
                  : 0 === er.length
                    ? (0, n.jsx)(eN.M, {
                        children: A("web.screeners.no_coins_match"),
                      })
                    : F
                      ? (0, n.jsx)("div", {
                          role: "list",
                          className: (0, _.c)("flex flex-col", eG.c),
                          children: er.map((e, t) =>
                            (0, n.jsx)(
                              eK,
                              {
                                coin: e,
                                stats: en[e.mint],
                                isLoggedIn: z,
                                index: t,
                                sourceElement: r.k9.MOVERS_FEED,
                                className: (0, _.c)(
                                  eG.Q,
                                  u._[D],
                                  ei.has(e.mint) && th.l,
                                ),
                              },
                              e.mint,
                            ),
                          ),
                        })
                      : (0, n.jsx)("div", {
                          role: "list",
                          className: "flex flex-col",
                          children: er.map((e, t) =>
                            (0, n.jsx)(
                              ej,
                              {
                                coin: e,
                                tickerFirst: !0,
                                stats: en[e.mint],
                                index: t,
                                priceChange24h: es.get(e.mint) ?? null,
                              },
                              e.mint,
                            ),
                          ),
                        })),
          (P[43] = q.length),
          (P[44] = D),
          (P[45] = ei),
          (P[46] = es),
          (P[47] = H),
          (P[48] = K),
          (P[49] = z),
          (P[50] = E),
          (P[51] = F),
          (P[52] = en),
          (P[53] = A),
          (P[54] = er),
          (P[55] = k))
        : (k = P[55]),
      P[56] !== E
        ? ((S =
            "movers" === E
              ? (0, eE.G)("Show more movers")
              : (0, eE.G)("Show more coins")),
          (P[56] = E),
          (P[57] = S))
        : (S = P[57]),
      P[58] !== Q || P[59] !== V || P[60] !== G || P[61] !== S
        ? ((M = (0, n.jsx)(m.f, {
            hasNextPage: V,
            isFetchingNextPage: G,
            onFetchNextPage: Q,
            autoLoad: !0,
            scrollRootRef: eo,
            rootMargin: "200px 0px",
            label: S,
          })),
          (P[58] = Q),
          (P[59] = V),
          (P[60] = G),
          (P[61] = S),
          (P[62] = M))
        : (M = P[62]),
      P[63] !== E || P[64] !== B || P[65] !== R || P[66] !== k || P[67] !== M
        ? ((C = (0, n.jsxs)("div", {
            ref: eo,
            ...B,
            "data-testid": "screeners-coin-board-scroll",
            "data-mode": E,
            "data-rows": R,
            className: eG.b,
            children: [k, M],
          })),
          (P[63] = E),
          (P[64] = B),
          (P[65] = R),
          (P[66] = k),
          (P[67] = M),
          (P[68] = C))
        : (C = P[68]),
      P[69] !== N || P[70] !== C
        ? ((I = (0, n.jsx)("div", {
            className: "flex min-h-0 w-full flex-1 flex-col",
            children: (0, n.jsxs)("div", {
              className: "relative flex min-h-0 flex-1 flex-col",
              children: [N, C],
            }),
          })),
          (P[69] = N),
          (P[70] = C),
          (P[71] = I))
        : (I = P[71]),
      I
    );
  }
  function sl(e) {
    return e.mint;
  }
  function sr(e) {
    return e.mint;
  }
  function si(e) {
    return e.mint;
  }
  var sa = e.i(213618),
    so = e.i(901423),
    sc = e.i(910976),
    sd = e.i(426091),
    sm = e.i(179736),
    su = e.i(117466),
    sf = e.i(569911),
    sh = e.i(214111),
    sx = e.i(248496);
  let sp = (e, t = !1) =>
      (0, _.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && eG.c,
      ),
    sg = (e) => Array.from({ length: e }, (e, t) => t),
    sb = {
      terminal: { body: 12, meta: 10 },
      comfortable: { body: 14, meta: 12 },
    };
  function sv(e) {
    let t,
      s,
      r,
      i = (0, l.c)(12),
      { rows: a, bleed: o } = e,
      c = void 0 === a ? 4 : a,
      d = void 0 === o || o,
      m = (0, p.x)(),
      u = sb[m],
      f = "terminal" === m;
    if (
      (i[0] !== d ? ((t = sp(d, !0)), (i[0] = d), (i[1] = t)) : (t = i[1]),
      i[2] !== u || i[3] !== c || i[4] !== f)
    ) {
      let e;
      (i[6] !== u || i[7] !== f
        ? ((e = (e) =>
            (0, n.jsxs)(
              "div",
              {
                className: (0, _.c)(
                  eG.C,
                  f ? "flex gap-2 py-2" : "flex gap-3 py-4",
                ),
                children: [
                  (0, n.jsx)(sx.l, { variant: "circle", size: f ? 24 : 36 }),
                  (0, n.jsxs)("div", {
                    className: "flex min-w-0 flex-1 flex-col gap-1",
                    children: [
                      (0, n.jsxs)("div", {
                        className: (0, _.c)(
                          "flex items-center",
                          f ? "h-6 gap-1.5" : "h-7 gap-2",
                        ),
                        children: [
                          (0, n.jsx)(sx.l, {
                            height: u.body,
                            width: f ? 96 : 112,
                          }),
                          (0, n.jsx)(sx.l, { height: u.meta, width: 40 }),
                        ],
                      }),
                      (0, n.jsx)(sx.l, { height: u.body, className: "w-4/5" }),
                      (0, n.jsx)("div", {
                        className: "pt-1",
                        children: (0, n.jsx)(sx.l, {
                          height: f ? 48 : 56,
                          className: "w-full",
                        }),
                      }),
                      (0, n.jsxs)("div", {
                        className: (0, _.c)(
                          "flex items-center",
                          f ? "h-6 gap-2.5 pt-1.5" : "h-7 gap-3 pt-2",
                        ),
                        children: [
                          (0, n.jsx)(sx.l, { size: f ? 14 : 16 }),
                          (0, n.jsx)(sx.l, { size: f ? 14 : 16 }),
                          (0, n.jsx)(sx.l, { size: f ? 14 : 16 }),
                          (0, n.jsx)(sx.l, { size: f ? 14 : 16 }),
                          (0, n.jsx)(sx.l, {
                            height: u.meta,
                            width: f ? 56 : 64,
                            className: "ml-auto",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              e,
            )),
          (i[6] = u),
          (i[7] = f),
          (i[8] = e))
        : (e = i[8]),
        (s = sg(c).map(e)),
        (i[2] = u),
        (i[3] = c),
        (i[4] = f),
        (i[5] = s));
    } else s = i[5];
    return (
      i[9] !== t || i[10] !== s
        ? ((r = (0, n.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "rail-post-skeleton",
            className: t,
            children: s,
          })),
          (i[9] = t),
          (i[10] = s),
          (i[11] = r))
        : (r = i[11]),
      r
    );
  }
  let sy = {
    terminal: `${eG.N} gap-1.5 hover:bg-transparent`,
    comfortable: `${eG.Q} relative flex h-14 items-center gap-3 py-2 text-sm leading-5 hover:bg-transparent`,
  };
  function sw(e) {
    let t,
      s,
      r,
      i = (0, l.c)(12),
      { rows: a, bleed: o } = e,
      c = void 0 === a ? 10 : a,
      d = void 0 === o || o,
      m = (0, p.x)(),
      u = sb[m],
      f = "terminal" === m;
    if (
      (i[0] !== d ? ((t = sp(d, !0)), (i[0] = d), (i[1] = t)) : (t = i[1]),
      i[2] !== u || i[3] !== c || i[4] !== f)
    ) {
      let e;
      (i[6] !== u || i[7] !== f
        ? ((e = (e) =>
            (0, n.jsx)(
              "div",
              {
                children: f
                  ? (0, n.jsxs)("div", {
                      className: sy.terminal,
                      children: [
                        (0, n.jsx)(sx.l, { variant: "circle", size: 16 }),
                        (0, n.jsx)(sx.l, { height: u.body, width: 64 }),
                        (0, n.jsx)(sx.l, { height: u.body, width: 56 }),
                        (0, n.jsx)(sx.l, { variant: "art", size: 16 }),
                        (0, n.jsx)(sx.l, { height: u.body, width: 48 }),
                        (0, n.jsx)(sx.l, {
                          height: u.meta,
                          width: 24,
                          className: "ml-auto",
                        }),
                      ],
                    })
                  : (0, n.jsxs)("div", {
                      className: sy.comfortable,
                      children: [
                        (0, n.jsx)(sx.l, { variant: "circle", size: 28 }),
                        (0, n.jsxs)("div", {
                          className: "flex min-w-0 flex-1 flex-col",
                          children: [
                            (0, n.jsxs)("div", {
                              className:
                                "flex h-5 items-center justify-between gap-3",
                              children: [
                                (0, n.jsx)(sx.l, {
                                  height: u.body,
                                  width: 112,
                                }),
                                (0, n.jsx)(sx.l, { height: u.meta, width: 40 }),
                              ],
                            }),
                            (0, n.jsxs)("div", {
                              className: "flex h-5 items-center gap-3",
                              children: [
                                (0, n.jsx)(sx.l, { height: u.body, width: 96 }),
                                (0, n.jsxs)("span", {
                                  className: "flex items-center gap-1.5",
                                  children: [
                                    (0, n.jsx)(sx.l, {
                                      variant: "art",
                                      size: 20,
                                    }),
                                    (0, n.jsx)(sx.l, {
                                      height: u.body,
                                      width: 48,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
              },
              e,
            )),
          (i[6] = u),
          (i[7] = f),
          (i[8] = e))
        : (e = i[8]),
        (s = sg(c).map(e)),
        (i[2] = u),
        (i[3] = c),
        (i[4] = f),
        (i[5] = s));
    } else s = i[5];
    return (
      i[9] !== t || i[10] !== s
        ? ((r = (0, n.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "rail-tape-row-skeleton",
            className: t,
            children: s,
          })),
          (i[9] = t),
          (i[10] = s),
          (i[11] = r))
        : (r = i[11]),
      r
    );
  }
  var sj = e.i(678730),
    s_ = e.i(693124),
    sN = e.i(936947),
    sk = e.i(210940),
    sS = e.i(592209),
    sM = e.i(674801);
  let sC = (e) => {
      let t = "string" == typeof e ? Number(e) : e;
      return "number" == typeof t && Number.isFinite(t) ? t : null;
    },
    sI = (e) => {
      if (e instanceof Date) return e.getTime();
      if ("number" == typeof e && Number.isFinite(e))
        return e < 1e12 ? 1e3 * e : e;
      if ("string" == typeof e && "" !== e.trim()) {
        let t = Number(e);
        if (Number.isFinite(t)) return t < 1e12 ? 1e3 * t : t;
        let s = Date.parse(e);
        if (Number.isFinite(s)) return s;
      }
      return 0;
    },
    sP = (e) => (e > 0 ? new Date(e).toISOString() : null),
    sU = (e) => (e.slotIndexId ? `${e.tx}:${e.slotIndexId}` : e.tx),
    sE = (e) => "SWAP" === e.type,
    sT = ({ txn: e, author: t }) => {
      let s = "BUY" === e.transaction_type,
        n = s ? e.token_out : e.token_in,
        l = sI(e.block_time);
      return {
        type: "trade",
        key: `tx:${e.tx_hash}`,
        createdAtMs: l,
        trade: {
          tx: e.tx_hash,
          isBuy: s,
          timestamp: sP(l),
          amountUsd: null,
          baseAmount: sC(n.amount),
          groupId: null,
          priceUsd: null,
          fillMarketCapUsd: null,
        },
        author: t,
        coin: {
          mint: n.mint,
          chainId: sM.S,
          name: n.metadata?.name ?? null,
          symbol: n.metadata?.symbol ?? null,
          image: n.metadata?.icon ?? null,
        },
      };
    },
    sA = [
      { minUsd: 1e4, gain: "to-gain/[0.16]", loss: "to-loss/[0.16]" },
      { minUsd: 1e3, gain: "to-gain/[0.10]", loss: "to-loss/[0.10]" },
      { minUsd: 100, gain: "to-gain/[0.05]", loss: "to-loss/[0.05]" },
    ],
    sR = {
      terminal: `${eG.N} @container gap-1.5`,
      comfortable: `${eG.Q} @container relative flex h-14 items-center gap-3 py-2 text-sm leading-5`,
    },
    sF = {
      terminal: `${sR.terminal} cursor-pointer`,
      comfortable: `${sR.comfortable} cursor-pointer`,
    },
    s$ =
      "pointer-events-none relative z-[1] flex min-w-0 flex-1 items-center [&_a]:pointer-events-auto [&_button]:pointer-events-auto",
    sz = {
      terminal:
        "shrink-0 text-[11px] leading-4 tabular-nums text-text-quaternary",
      comfortable:
        "shrink-0 text-xs leading-4 tabular-nums text-text-quaternary",
    },
    sD = {
      terminal: "hidden @[26rem]:inline",
      comfortable: "hidden @[22rem]:inline",
    },
    sO = {
      terminal: "hidden @[28rem]:inline text-[11px] leading-4",
      comfortable: "ml-auto text-xs leading-4",
    },
    sB = (e) => (null != e && Number.isFinite(e) && e > 0 ? e : null),
    sL = { terminal: 16, comfortable: 20 },
    sq = {
      pull: "web.coin.card_pulled",
      buyback: "web.coin.card_cashed_out",
      market_buy: "web.coin.card_got",
      market_sale: "web.coin.card_taken",
      gift: "web.coin.card_gifted",
      transfer: "web.coin.card_transferred",
      redeem: "web.coin.card_redeemed",
      seize: "web.coin.card_seized",
      burn: "web.coin.card_burned",
    };
  function sW(e) {
    let t,
      s,
      r,
      i,
      a,
      o,
      c,
      m,
      u,
      f,
      x,
      b,
      v,
      y,
      w,
      j,
      _,
      N,
      k,
      S,
      M,
      C,
      I,
      P,
      U,
      E,
      T,
      A,
      R,
      F,
      $,
      D,
      O = (0, l.c)(159),
      { item: B } = e,
      { trade: L, author: W, coin: K, createdAtMs: H } = B,
      { t: V, i18n: G } = (0, d.f)(),
      Q = (0, sS.v)(G.language) ?? sS.T,
      J = (0, sm.s)(W.userId ?? W.address),
      X = (0, p.x)(),
      Y = "coin-rail" !== (0, p.k)(),
      Z = B.card ?? null,
      ee =
        L.collectibleLeg || Z
          ? {
              leg: L.collectibleLeg ?? null,
              name: Z?.name ?? L.collectible?.name ?? K.name,
              image: Z?.image ?? L.collectible?.imageUrl ?? K.image,
              grade: Z?.grade ?? L.collectible?.grade ?? null,
            }
          : null,
      { prefetch: et, hoverProps: es } = (0, z.W)(ee ? null : (0, z.e)(K.mint));
    if (
      O[0] !== W.address ||
      O[1] !== K.mint ||
      O[2] !== K.name ||
      O[3] !== K.symbol ||
      O[4] !== V
    ) {
      ((s = K.symbol?.replace(/^\$/, "")),
        (t = W.address
          ? `/coin/${K.mint}?highlight_holder=${W.address}`
          : `/coin/${K.mint}`));
      let e = K.name ?? s;
      ((r = e
        ? V("web.market_rail.open_coin", { coin_name: e })
        : V("web.toasts.open_coin")),
        (O[0] = W.address),
        (O[1] = K.mint),
        (O[2] = K.name),
        (O[3] = K.symbol),
        (O[4] = V),
        (O[5] = t),
        (O[6] = s),
        (O[7] = r));
    } else ((t = O[5]), (s = O[6]), (r = O[7]));
    let en = r;
    O[8] !== V || O[9] !== L.isBuy
      ? ((i = V(L.isBuy ? "web.coin.holders_bought" : "web.coin.holders_sold")),
        (O[8] = V),
        (O[9] = L.isBuy),
        (O[10] = i))
      : (i = O[10]);
    let el = i,
      er =
        ee && null !== ee.leg && Object.hasOwn(sq, ee.leg) ? V(sq[ee.leg]) : el,
      ei =
        null != L.amountUsd
          ? ` ${(0, q.w)(L.amountUsd)}`
          : null != L.baseAmount
            ? ` ${(0, sk.f)({ value: Number(L.baseAmount), locale: Q, t: V })}`
            : null;
    if (
      O[11] !== ei ||
      O[12] !== W.address ||
      O[13] !== W.avatarDecoration ||
      O[14] !== W.avatarUrl ||
      O[15] !== W.name ||
      O[16] !== W.userId ||
      O[17] !== ee ||
      O[18] !== K.marketCapUsd ||
      O[19] !== en ||
      O[20] !== t ||
      O[21] !== X ||
      O[22] !== es ||
      O[23] !== et ||
      O[24] !== V ||
      O[25] !== L.amountUsd ||
      O[26] !== L.fillMarketCapUsd ||
      O[27] !== L.isBuy ||
      O[28] !== er
    ) {
      let e,
        s,
        l,
        r,
        i = ((e, t) => {
          if (null == t || !Number.isFinite(t)) return null;
          let s = sA.find((e) => t >= e.minUsd);
          return s ? (e ? s.gain : s.loss) : null;
        })(L.isBuy, L.amountUsd),
        d = ee ? null : sB(L.fillMarketCapUsd);
      ((u = ee ? null : sB(K.marketCapUsd)),
        O[38] !== W.address ||
        O[39] !== W.avatarDecoration ||
        O[40] !== W.avatarUrl ||
        O[41] !== W.name ||
        O[42] !== W.userId
          ? ((e = {
              address: W.address,
              userId: W.userId,
              username: W.name,
              profileImage: W.avatarUrl,
              avatarDecoration: W.avatarDecoration,
            }),
            (O[38] = W.address),
            (O[39] = W.avatarDecoration),
            (O[40] = W.avatarUrl),
            (O[41] = W.name),
            (O[42] = W.userId),
            (O[43] = e))
          : (e = O[43]),
        (m = e),
        O[44] !== ee ||
        O[45] !== en ||
        O[46] !== t ||
        O[47] !== es ||
        O[48] !== et
          ? ((s = ee
              ? null
              : (0, n.jsx)(h.default, {
                  href: t,
                  "aria-label": en,
                  prefetch: et,
                  ...es,
                  className: "absolute inset-0 z-0 focus-inset",
                  [sN.A]: "",
                })),
            (O[44] = ee),
            (O[45] = en),
            (O[46] = t),
            (O[47] = es),
            (O[48] = et),
            (O[49] = s))
          : (s = O[49]),
        (a = s),
        (x = ee ? sR : sF),
        (f = ee ? void 0 : sN.N),
        (v = i
          ? (0, n.jsx)("span", {
              "aria-hidden": !0,
              "data-testid": "alerts-trade-wash",
              "data-tone": L.isBuy ? "gain" : "loss",
              className: (0, sd.c)(
                "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35%",
                i,
              ),
            })
          : null),
        O[50] !== L.isBuy
          ? ((l = (0, sd.c)(
              "shrink-0 whitespace-nowrap font-medium tabular-nums",
              (0, sj.F)(L.isBuy ? "buy" : "sell"),
            )),
            (O[50] = L.isBuy),
            (O[51] = l))
          : (l = O[51]),
        O[52] !== ei || O[53] !== l || O[54] !== er
          ? ((r = (0, n.jsxs)("span", { className: l, children: [er, ei] })),
            (O[52] = ei),
            (O[53] = l),
            (O[54] = er),
            (O[55] = r))
          : (r = O[55]),
        (o = r),
        (c =
          null !== d
            ? (0, n.jsx)("span", {
                "data-testid": "alerts-trade-fill-cap",
                className: (0, sd.c)(
                  "shrink-0 whitespace-nowrap font-medium tabular-nums text-text-tertiary",
                  sD[X],
                ),
                children: (0, n.jsx)(su.f, {
                  t: V,
                  i18nKey: "web.coin.trade_at_market_cap",
                  values: { market_cap: (0, q.l)(d) },
                  components: {
                    value: (0, n.jsx)("span", {
                      className: "text-text-secondary",
                    }),
                  },
                }),
              })
            : null),
        (b =
          null !== u
            ? (0, n.jsxs)("span", {
                "data-testid": "alerts-trade-market-cap",
                className: (0, sd.c)(
                  "shrink-0 whitespace-nowrap tabular-nums text-text-quaternary",
                  sO[X],
                ),
                children: [
                  (0, n.jsx)("span", {
                    "data-testid": "alerts-trade-market-cap-value",
                    children: (0, sh.f)(u),
                  }),
                  " ",
                  V("common.market_cap_short"),
                ],
              })
            : null),
        (O[11] = ei),
        (O[12] = W.address),
        (O[13] = W.avatarDecoration),
        (O[14] = W.avatarUrl),
        (O[15] = W.name),
        (O[16] = W.userId),
        (O[17] = ee),
        (O[18] = K.marketCapUsd),
        (O[19] = en),
        (O[20] = t),
        (O[21] = X),
        (O[22] = es),
        (O[23] = et),
        (O[24] = V),
        (O[25] = L.amountUsd),
        (O[26] = L.fillMarketCapUsd),
        (O[27] = L.isBuy),
        (O[28] = er),
        (O[29] = a),
        (O[30] = o),
        (O[31] = c),
        (O[32] = m),
        (O[33] = u),
        (O[34] = f),
        (O[35] = x),
        (O[36] = b),
        (O[37] = v));
    } else
      ((a = O[29]),
        (o = O[30]),
        (c = O[31]),
        (m = O[32]),
        (u = O[33]),
        (f = O[34]),
        (x = O[35]),
        (b = O[36]),
        (v = O[37]));
    let ea = b;
    if (O[56] !== K.chain || O[57] !== K.chainId) {
      var eo, ec;
      ((eo = K.chainId),
        (ec = K.chain),
        (y = (0, t4.C)(ec)
          ? ec
          : eo === sM.S || !Number.isInteger(eo) || eo <= 0
            ? void 0
            : `eip155:${eo}`),
        (O[56] = K.chain),
        (O[57] = K.chainId),
        (O[58] = y));
    } else y = O[58];
    let ed = y,
      em = "terminal" === X ? "gap-1" : "gap-1.5",
      eu = null === ee && "pointer-events-auto";
    O[59] !== em || O[60] !== eu
      ? ((w = (0, sd.c)(
          "flex min-w-5 items-center text-text-secondary",
          em,
          eu,
        )),
        (O[59] = em),
        (O[60] = eu),
        (O[61] = w))
      : (w = O[61]);
    let ef = ee ? ee.name : K.name,
      eh = ee ? null : K.symbol,
      ex = ee ? ee.image : K.image;
    O[62] !== K.mint ||
    O[63] !== K.platform ||
    O[64] !== K.program ||
    O[65] !== K.protocol ||
    O[66] !== ed ||
    O[67] !== ex ||
    O[68] !== ef ||
    O[69] !== eh
      ? ((j = {
          mint: K.mint,
          name: ef,
          symbol: eh,
          image_uri: ex,
          chain_id: ed,
          program: K.program,
          platform: K.platform,
          protocol: K.protocol,
        }),
        (O[62] = K.mint),
        (O[63] = K.platform),
        (O[64] = K.program),
        (O[65] = K.protocol),
        (O[66] = ed),
        (O[67] = ex),
        (O[68] = ef),
        (O[69] = eh),
        (O[70] = j))
      : (j = O[70]);
    let ep = sL[X],
      eg = null !== ee;
    (O[71] !== j || O[72] !== ep || O[73] !== eg
      ? ((_ = (0, n.jsx)(g.CoinAvatar, {
          optimisticImage: !0,
          coin: j,
          size: ep,
          verified: !1,
          hideCorner: eg,
        })),
        (O[71] = j),
        (O[72] = ep),
        (O[73] = eg),
        (O[74] = _))
      : (_ = O[74]),
      O[75] !== ee || O[76] !== K.mint || O[77] !== s
        ? ((N = ee
            ? ee.name || (0, ek.d)(K.mint, 4, 4)
            : s || (0, ek.d)(K.mint, 4, 4)),
          (O[75] = ee),
          (O[76] = K.mint),
          (O[77] = s),
          (O[78] = N))
        : (N = O[78]),
      O[79] !== N
        ? ((k = (0, n.jsx)("span", { className: "truncate", children: N })),
          (O[79] = N),
          (O[80] = k))
        : (k = O[80]),
      O[81] !== ee
        ? ((S = ee?.grade
            ? (0, n.jsx)("span", {
                className: "shrink-0 text-text-tertiary",
                children: ee.grade,
              })
            : null),
          (O[81] = ee),
          (O[82] = S))
        : (S = O[82]),
      O[83] !== _ || O[84] !== k || O[85] !== S || O[86] !== w
        ? ((M = (0, n.jsxs)("span", {
            "data-testid": "alerts-trade-coin",
            className: w,
            children: [_, k, S],
          })),
          (O[83] = _),
          (O[84] = k),
          (O[85] = S),
          (O[86] = w),
          (O[87] = M))
        : (M = O[87]));
    let eb = M;
    O[88] !== ee ||
    O[89] !== K.image ||
    O[90] !== K.mint ||
    O[91] !== K.name ||
    O[92] !== K.platform ||
    O[93] !== K.program ||
    O[94] !== K.protocol ||
    O[95] !== K.symbol ||
    O[96] !== ed ||
    O[97] !== t ||
    O[98] !== eb ||
    O[99] !== u
      ? ((C = ee
          ? eb
          : (0, n.jsx)(sf.f, {
              coin: {
                mint: K.mint,
                name: K.name,
                symbol: K.symbol,
                image_uri: K.image,
                usd_market_cap: u,
                chain_id: ed,
                program: K.program,
                platform: K.platform,
                protocol: K.protocol,
              },
              liveMarketCap: u,
              href: t,
              align: "start",
              children: eb,
            })),
        (O[88] = ee),
        (O[89] = K.image),
        (O[90] = K.mint),
        (O[91] = K.name),
        (O[92] = K.platform),
        (O[93] = K.program),
        (O[94] = K.protocol),
        (O[95] = K.symbol),
        (O[96] = ed),
        (O[97] = t),
        (O[98] = eb),
        (O[99] = u),
        (O[100] = C))
      : (C = O[100]);
    let ev = C;
    O[101] !== H || O[102] !== X
      ? ((I =
          H > 0
            ? (0, n.jsx)(eC.f, { timestamp: H, density: X, className: sz[X] })
            : null),
        (O[101] = H),
        (O[102] = X),
        (O[103] = I))
      : (I = O[103]);
    let ey = I;
    if ("terminal" === X) {
      let e,
        t,
        s,
        l,
        r,
        i = ee ? "" : void 0,
        d = ee?.leg ?? void 0,
        u = x.terminal;
      return (
        O[104] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, sd.c)(s$, "gap-1.5")), (O[104] = e))
          : (e = O[104]),
        O[105] !== W.xUsername || O[106] !== Y || O[107] !== m || O[108] !== J
          ? ((t = (0, n.jsx)(s_.S, {
              ...m,
              size: 16,
              framed: !1,
              verified: J,
              xUsername: W.xUsername,
              linkAvatar: Y,
              nameClassName: "text-[12px] leading-4",
              className: "max-w-[9.5rem]",
            })),
            (O[105] = W.xUsername),
            (O[106] = Y),
            (O[107] = m),
            (O[108] = J),
            (O[109] = t))
          : (t = O[109]),
        O[110] !== ey || O[111] !== ea
          ? ((s = (0, n.jsxs)("span", {
              className: "ml-auto flex shrink-0 items-center gap-1.5",
              children: [ea, ey],
            })),
            (O[110] = ey),
            (O[111] = ea),
            (O[112] = s))
          : (s = O[112]),
        O[113] !== ev ||
        O[114] !== o ||
        O[115] !== c ||
        O[116] !== t ||
        O[117] !== s
          ? ((l = (0, n.jsxs)("div", {
              className: e,
              children: [t, o, c, ev, s],
            })),
            (O[113] = ev),
            (O[114] = o),
            (O[115] = c),
            (O[116] = t),
            (O[117] = s),
            (O[118] = l))
          : (l = O[118]),
        O[119] !== a ||
        O[120] !== f ||
        O[121] !== x.terminal ||
        O[122] !== i ||
        O[123] !== d ||
        O[124] !== l ||
        O[125] !== v
          ? ((r = (0, n.jsxs)("article", {
              "data-testid": "alerts-trade-card",
              "data-density": "terminal",
              "data-card": i,
              "data-collectible-leg": d,
              className: u,
              onClick: f,
              children: [a, v, l],
            })),
            (O[119] = a),
            (O[120] = f),
            (O[121] = x.terminal),
            (O[122] = i),
            (O[123] = d),
            (O[124] = l),
            (O[125] = v),
            (O[126] = r))
          : (r = O[126]),
        r
      );
    }
    let ew = ee ? "" : void 0,
      ej = ee?.leg ?? void 0,
      e_ = x.comfortable;
    return (
      O[127] === Symbol.for("react.memo_cache_sentinel")
        ? ((P = (0, sd.c)(s$, "gap-3")), (O[127] = P))
        : (P = O[127]),
      O[128] !== Y || O[129] !== m
        ? ((U = (0, n.jsx)(s_.S, {
            ...m,
            size: 28,
            showName: !1,
            framed: !1,
            link: Y,
            hoverCard: !1,
          })),
          (O[128] = Y),
          (O[129] = m),
          (O[130] = U))
        : (U = O[130]),
      O[131] !== W.xUsername || O[132] !== m || O[133] !== J
        ? ((E = (0, n.jsx)(s_.S, {
            ...m,
            size: 28,
            density: "comfortable",
            showAvatar: !1,
            verified: J,
            xUsername: W.xUsername,
            className: "relative z-10 min-w-0",
          })),
          (O[131] = W.xUsername),
          (O[132] = m),
          (O[133] = J),
          (O[134] = E))
        : (E = O[134]),
      O[135] !== ey || O[136] !== ea || O[137] !== E
        ? ((T = (0, n.jsxs)("div", {
            className: "flex min-w-0 items-center gap-2",
            children: [E, ey, ea],
          })),
          (O[135] = ey),
          (O[136] = ea),
          (O[137] = E),
          (O[138] = T))
        : (T = O[138]),
      O[139] !== o || O[140] !== c
        ? ((A = (0, n.jsxs)("span", {
            className: "flex shrink-0 items-center gap-1 whitespace-nowrap",
            children: [o, c],
          })),
          (O[139] = o),
          (O[140] = c),
          (O[141] = A))
        : (A = O[141]),
      O[142] !== ev || O[143] !== A
        ? ((R = (0, n.jsxs)("div", {
            className: "flex min-w-0 items-center gap-3",
            children: [A, ev],
          })),
          (O[142] = ev),
          (O[143] = A),
          (O[144] = R))
        : (R = O[144]),
      O[145] !== T || O[146] !== R
        ? ((F = (0, n.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col",
            children: [T, R],
          })),
          (O[145] = T),
          (O[146] = R),
          (O[147] = F))
        : (F = O[147]),
      O[148] !== U || O[149] !== F
        ? (($ = (0, n.jsxs)("div", { className: P, children: [U, F] })),
          (O[148] = U),
          (O[149] = F),
          (O[150] = $))
        : ($ = O[150]),
      O[151] !== a ||
      O[152] !== f ||
      O[153] !== x.comfortable ||
      O[154] !== ew ||
      O[155] !== ej ||
      O[156] !== $ ||
      O[157] !== v
        ? ((D = (0, n.jsxs)("article", {
            "data-testid": "alerts-trade-card",
            "data-density": "comfortable",
            "data-card": ew,
            "data-collectible-leg": ej,
            className: e_,
            onClick: f,
            children: [a, v, $],
          })),
          (O[151] = a),
          (O[152] = f),
          (O[153] = x.comfortable),
          (O[154] = ew),
          (O[155] = ej),
          (O[156] = $),
          (O[157] = v),
          (O[158] = D))
        : (D = O[158]),
      D
    );
  }
  function sK(e) {
    let t,
      s,
      r,
      i = (0, l.c)(10),
      { density: a, rows: o, bleed: c } = e,
      d = void 0 === o ? 10 : o,
      m = void 0 === c || c;
    if ("terminal" === a) {
      let e;
      return (
        i[0] !== m || i[1] !== d
          ? ((e = (0, n.jsx)(sw, { rows: d, bleed: m })),
            (i[0] = m),
            (i[1] = d),
            (i[2] = e))
          : (e = i[2]),
        e
      );
    }
    let u = m && "-mx-[var(--screeners-pad,0px)]";
    return (
      i[3] !== u
        ? ((t = (0, sd.c)(u, "flex flex-col", eG.c)), (i[3] = u), (i[4] = t))
        : (t = i[4]),
      i[5] !== d
        ? ((s = Array.from({ length: d }, sH)), (i[5] = d), (i[6] = s))
        : (s = i[6]),
      i[7] !== t || i[8] !== s
        ? ((r = (0, n.jsx)("div", {
            "aria-hidden": !0,
            "data-testid": "trade-row-skeleton",
            className: t,
            children: s,
          })),
          (i[7] = t),
          (i[8] = s),
          (i[9] = r))
        : (r = i[9]),
      r
    );
  }
  function sH(e, t) {
    return (0, n.jsx)(
      "div",
      {
        children: (0, n.jsxs)("div", {
          className: (0, sd.c)(sR.comfortable, "hover:bg-transparent"),
          children: [
            (0, n.jsx)(sx.l, { variant: "circle", size: 28 }),
            (0, n.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [
                (0, n.jsxs)("div", {
                  className: "flex h-5 items-center justify-between gap-3",
                  children: [
                    (0, n.jsx)(sx.l, { height: 14, width: 112 }),
                    (0, n.jsx)(sx.l, { height: 12, width: 40 }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  className: "flex h-5 items-center gap-3",
                  children: [
                    (0, n.jsx)(sx.l, { height: 14, width: 96 }),
                    (0, n.jsxs)("span", {
                      className: "flex items-center gap-1.5",
                      children: [
                        (0, n.jsx)(sx.l, { variant: "art", size: 20 }),
                        (0, n.jsx)(sx.l, { height: 14, width: 48 }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      },
      t,
    );
  }
  var sV = e.i(787773),
    sG = e.i(996699),
    sQ = e.i(576766),
    sJ = e.i(785212),
    sX = e.i(303599),
    sY = e.i(265129),
    sZ = e.i(917341),
    s0 = e.i(662986),
    s1 = e.i(246307);
  function s2(e) {
    let t,
      s,
      r,
      o,
      u,
      f,
      h,
      x,
      g,
      b,
      v,
      y,
      w,
      j,
      N,
      k,
      S,
      M,
      C,
      I,
      P,
      U,
      E,
      T,
      A,
      R,
      F,
      $,
      z,
      D = (0, l.c)(118),
      { t: O } = (0, d.f)(),
      {
        feed: B,
        pause: L,
        viewerAddress: q,
        isLoggedIn: W,
        viewerFollowing: K,
        surface: H,
        scrollClassName: V,
        calloutRowClassName: G,
        testIdPrefix: Q,
        emptyState: J,
      } = e,
      X = void 0 === Q ? "coin-alerts-rail" : Q,
      { paused: Y, targetProps: Z } = L,
      ee = (0, p.x)(),
      {
        items: et,
        isLoadingHistory: es,
        pendingNewCount: en,
        pendingPreview: el,
        showNewCallouts: er,
        hasNextPage: ei,
        isFetchingNextPage: ea,
        fetchNextPage: eo,
      } = B,
      ec = (0, a.k)(i.D.WEB_PERPS, !1);
    D[0] !== et || D[1] !== ec
      ? ((t = ec ? et : et.filter(s6)), (D[0] = et), (D[1] = ec), (D[2] = t))
      : (t = D[2]);
    let ed = t;
    if (D[3] !== et || D[4] !== el) {
      let e,
        t = [...et.flatMap(s5), ...el.map(s4)];
      (D[6] !== t ? ((e = new Set(t)), (D[6] = t), (D[7] = e)) : (e = D[7]),
        (s = Array.from(e)),
        (D[3] = et),
        (D[4] = el),
        (D[5] = s));
    } else s = D[5];
    let em = s,
      eu = 0 === em.length;
    D[8] !== em || D[9] !== eu
      ? ((r = { mints: em, disabled: eu }),
        (D[8] = em),
        (D[9] = eu),
        (D[10] = r))
      : (r = D[10]);
    let { coins: ef, primaryMisses: eh } = (0, sJ.f)(r);
    if (D[11] !== ef) {
      for (let e of ((o = new Map()), ef)) e?.mint && o.set(e.mint, e);
      ((D[11] = ef), (D[12] = o));
    } else o = D[12];
    let ex = o,
      ep = (0, a.k)(i.D.WEB_PACKS, !1);
    D[13] !== eh ? ((u = new Set(eh)), (D[13] = eh), (D[14] = u)) : (u = D[14]);
    let eg = u;
    if (D[15] !== et || D[16] !== eg || D[17] !== ep) {
      let e;
      (D[19] !== eg || D[20] !== ep
        ? ((e = (e) =>
            "callout" === e.type
              ? ep && !(0, sZ.Q)(e.entry) && eg.has(e.entry.coinMint)
                ? [e.entry.coinMint]
                : []
              : "trade" !== e.type || e.card
                ? []
                : (0, sY.Q)(e.trade) || eg.has(e.coin.mint)
                  ? [e.coin.mint]
                  : []),
          (D[19] = eg),
          (D[20] = ep),
          (D[21] = e))
        : (e = D[21]),
        (f = Array.from(new Set(et.flatMap(e)))),
        (D[15] = et),
        (D[16] = eg),
        (D[17] = ep),
        (D[18] = f));
    } else f = D[18];
    let eb = f,
      { cardByMint: ev } = (0, sG.f)(eb);
    D[22] !== ev || D[23] !== eb
      ? ((h = new Set(eb.filter((e) => !ev.has(e)))),
        (D[22] = ev),
        (D[23] = eb),
        (D[24] = h))
      : (h = D[24]);
    let ey = h;
    D[25] !== et
      ? ((x = Array.from(new Set(et.flatMap(s3)))), (D[25] = et), (D[26] = x))
      : (x = D[26]);
    let ew = x;
    D[27] !== ew
      ? ((g = { userAddresses: ew }), (D[27] = ew), (D[28] = g))
      : (g = D[28]);
    let { data: ej } = (0, sQ.f)(g);
    D[29] !== ej
      ? ((b = void 0 === ej ? [] : ej), (D[29] = ej), (D[30] = b))
      : (b = D[30]);
    let eN = b;
    if (D[31] !== eN) {
      for (let e of ((v = new Map()), eN)) e?.address && v.set(e.address, e);
      ((D[31] = eN), (D[32] = v));
    } else v = D[32];
    let ek = v;
    if (D[33] !== ex || D[34] !== el) {
      let e;
      (D[36] !== ex
        ? ((e = (e) => ({
            key: e.key,
            mint: e.coinMint,
            imageUrl: ex.get(e.coinMint)?.image_uri,
          })),
          (D[36] = ex),
          (D[37] = e))
        : (e = D[37]),
        (y = el.map(e)),
        (D[33] = ex),
        (D[34] = el),
        (D[35] = y));
    } else y = D[35];
    let eS = y;
    if (D[38] !== et) {
      for (let e of ((w = new Map()), et))
        "callout" === e.type && w.set(e.key, w.size);
      ((D[38] = et), (D[39] = w));
    } else w = D[39];
    let eM = w,
      eC = (0, c.useRef)(null);
    D[40] !== er
      ? ((j = () => {
          let e = eC.current;
          e && !(e.scrollTop > 8) && er({ trigger: "auto" });
        }),
        (D[40] = er),
        (D[41] = j))
      : (j = D[41]);
    let eI = j,
      eP = !Y && en > 0;
    D[42] !== eP || D[43] !== eI
      ? ((N = () => {
          eP && eI();
        }),
        (D[42] = eP),
        (D[43] = eI),
        (D[44] = N))
      : (N = D[44]);
    let eU = N;
    D[45] !== er
      ? ((k = () => {
          (er({ trigger: "tap" }),
            eC.current?.scrollTo({ top: 0, behavior: "smooth" }));
        }),
        (D[45] = er),
        (D[46] = k))
      : (k = D[46]);
    let eE = k;
    if (
      (D[47] !== eP || D[48] !== eI
        ? ((S = () => {
            eP && eI();
          }),
          (D[47] = eP),
          (D[48] = eI),
          (D[49] = S))
        : (S = D[49]),
      (0, c.useEffect)(S),
      es && 0 === et.length)
    ) {
      let e,
        t,
        s = `${X}-skeleton`;
      return (
        D[50] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, n.jsx)(sv, { bleed: !1 })), (D[50] = e))
          : (e = D[50]),
        D[51] !== V || D[52] !== s
          ? ((t = (0, n.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": s,
              className: V,
              children: e,
            })),
            (D[51] = V),
            (D[52] = s),
            (D[53] = t))
          : (t = D[53]),
        t
      );
    }
    (D[54] !== eE || D[55] !== eS || D[56] !== en
      ? ((M = (0, n.jsx)(so.f, {
          count: en,
          avatars: eS,
          onClick: eE,
          placement: "inline",
        })),
        (D[54] = eE),
        (D[55] = eS),
        (D[56] = en),
        (D[57] = M))
      : (M = D[57]),
      D[58] !== Y
        ? ((C = (0, n.jsx)(e_.q, { paused: Y })), (D[58] = Y), (D[59] = C))
        : (C = D[59]));
    let eT = `${X}-scroll`;
    if (
      (D[60] !== ee ||
      D[61] !== J ||
      D[62] !== en ||
      D[63] !== O ||
      D[64] !== X ||
      D[65] !== ed.length
        ? ((I =
            0 === ed.length && 0 === en
              ? (0, n.jsx)("div", {
                  "data-testid": `${X}-empty`,
                  className: "contents",
                  children:
                    J ??
                    (0, n.jsx)(sV.L, {
                      density: ee,
                      title: O("web.coin.alerts_empty_title"),
                      children: O("web.coin.alerts_empty_description"),
                    }),
                })
              : null),
          (D[60] = ee),
          (D[61] = J),
          (D[62] = en),
          (D[63] = O),
          (D[64] = X),
          (D[65] = ed.length),
          (D[66] = I))
        : (I = D[66]),
      D[67] === Symbol.for("react.memo_cache_sentinel")
        ? ((P = (0, _.c)("flex w-full flex-col", eG.c)), (D[67] = P))
        : (P = D[67]),
      D[68] !== O
        ? ((U = O("web.coin.alerts_list")), (D[68] = O), (D[69] = U))
        : (U = D[69]),
      D[70] !== eM ||
        D[71] !== G ||
        D[72] !== ev ||
        D[73] !== ex ||
        D[74] !== W ||
        D[75] !== ey ||
        D[76] !== H ||
        D[77] !== ek ||
        D[78] !== q ||
        D[79] !== K ||
        D[80] !== ed)
    ) {
      let e;
      (D[82] !== eM ||
      D[83] !== G ||
      D[84] !== ev ||
      D[85] !== ex ||
      D[86] !== W ||
      D[87] !== ey ||
      D[88] !== H ||
      D[89] !== ek ||
      D[90] !== q ||
      D[91] !== K
        ? ((e = (e) =>
            "trade" === e.type
              ? (0, n.jsx)(
                  "li",
                  {
                    children: (0, n.jsx)(sW, {
                      item: (function (e, t, s, n) {
                        if (e.card) return e;
                        let l = s.get(e.coin.mint);
                        if (l) return { ...e, card: (0, sY.B)(l) };
                        if ((0, sY.Q)(e.trade) || n.has(e.coin.mint)) return e;
                        let r = t.get(e.coin.mint),
                          i = r ? (0, sY.M)(r) : null;
                        return i
                          ? { ...e, card: i }
                          : (function (e, t) {
                              let { coin: s } = e;
                              if (
                                (s.symbol && s.name && s.image) ||
                                (0, sY.Q)(e.trade)
                              )
                                return e;
                              let n = t.get(s.mint);
                              return n
                                ? {
                                    ...e,
                                    coin: {
                                      ...s,
                                      name: s.name ?? (0, s1.m)(n.name),
                                      symbol: s.symbol ?? (0, s1.m)(n.symbol),
                                      image: s.image ?? n.image_uri ?? null,
                                    },
                                  }
                                : e;
                            })(e, t);
                      })(e, ex, ev, ey),
                    }),
                  },
                  e.key,
                )
              : "callout" !== e.type
                ? null
                : (0, n.jsx)(
                    "li",
                    {
                      children: (0, n.jsx)(sc.f, {
                        entry: e.entry,
                        coin: ex.get(e.entry.coinMint),
                        card: ev.get(e.entry.coinMint) ?? null,
                        user: ek.get(e.entry.userId),
                        position: eM.get(e.key) ?? 0,
                        viewerAddress: q,
                        isLoggedIn: W,
                        viewerFollowing: K,
                        surface: H,
                        divider: "none",
                        className: G,
                        hideFollowButton: !0,
                        hideXBadge: !0,
                        noteClampLines: 3,
                      }),
                    },
                    e.key,
                  )),
          (D[82] = eM),
          (D[83] = G),
          (D[84] = ev),
          (D[85] = ex),
          (D[86] = W),
          (D[87] = ey),
          (D[88] = H),
          (D[89] = ek),
          (D[90] = q),
          (D[91] = K),
          (D[92] = e))
        : (e = D[92]),
        (E = ed.map(e)),
        (D[70] = eM),
        (D[71] = G),
        (D[72] = ev),
        (D[73] = ex),
        (D[74] = W),
        (D[75] = ey),
        (D[76] = H),
        (D[77] = ek),
        (D[78] = q),
        (D[79] = K),
        (D[80] = ed),
        (D[81] = E));
    } else E = D[81];
    D[93] !== U || D[94] !== E
      ? ((T = (0, n.jsx)("ul", { className: P, "aria-label": U, children: E })),
        (D[93] = U),
        (D[94] = E),
        (D[95] = T))
      : (T = D[95]);
    let eA = !(et.length > 0 && 0 === ed.length);
    return (
      D[96] !== O
        ? ((A = O("web.coin.show_more_alerts")), (D[96] = O), (D[97] = A))
        : (A = D[97]),
      D[98] !== eo ||
      D[99] !== ei ||
      D[100] !== ea ||
      D[101] !== eA ||
      D[102] !== A
        ? ((R = (0, n.jsx)(m.f, {
            hasNextPage: ei,
            isFetchingNextPage: ea,
            onFetchNextPage: eo,
            autoLoad: eA,
            scrollRootRef: eC,
            rootMargin: "200px 0px",
            label: A,
          })),
          (D[98] = eo),
          (D[99] = ei),
          (D[100] = ea),
          (D[101] = eA),
          (D[102] = A),
          (D[103] = R))
        : (R = D[103]),
      D[104] !== eU ||
      D[105] !== Z ||
      D[106] !== V ||
      D[107] !== eT ||
      D[108] !== I ||
      D[109] !== T ||
      D[110] !== R
        ? ((F = (0, n.jsxs)("div", {
            ref: eC,
            onScroll: eU,
            ...Z,
            "data-testid": eT,
            className: V,
            children: [I, T, R],
          })),
          (D[104] = eU),
          (D[105] = Z),
          (D[106] = V),
          (D[107] = eT),
          (D[108] = I),
          (D[109] = T),
          (D[110] = R),
          (D[111] = F))
        : (F = D[111]),
      D[112] !== C || D[113] !== F
        ? (($ = (0, n.jsxs)("div", {
            className: "relative flex min-h-0 flex-1 flex-col",
            children: [C, F],
          })),
          (D[112] = C),
          (D[113] = F),
          (D[114] = $))
        : ($ = D[114]),
      D[115] !== M || D[116] !== $
        ? ((z = (0, n.jsxs)(n.Fragment, { children: [M, $] })),
          (D[115] = M),
          (D[116] = $),
          (D[117] = z))
        : (z = D[117]),
      z
    );
  }
  function s3(e) {
    return "callout" === e.type ? [e.entry.userId] : [];
  }
  function s4(e) {
    return e.coinMint;
  }
  function s5(e) {
    return "callout" === e.type
      ? [e.entry.coinMint]
      : "trade" !== e.type ||
          (0, sY.Q)(e.trade) ||
          (e.coin.symbol && e.coin.name && e.coin.image)
        ? []
        : [e.coin.mint];
  }
  function s6(e) {
    return "callout" !== e.type || !(0, s0.o)(e.entry);
  }
  function s7() {
    let e,
      t = (0, l.c)(4),
      { address: s } = (0, o.F)(),
      n = !!s,
      r = (0, sX.o)();
    return (
      t[0] !== s || t[1] !== n || t[2] !== r
        ? ((e = { address: s, isLoggedIn: n, viewerFollowing: r }),
          (t[0] = s),
          (t[1] = n),
          (t[2] = r),
          (t[3] = e))
        : (e = t[3]),
      e
    );
  }
  var s9 = e.i(186434),
    s8 = e.i(967694);
  function ne(e) {
    let t,
      s = (0, l.c)(3),
      { testId: r, children: i } = e;
    return r
      ? (s[0] !== i || s[1] !== r
          ? ((t = (0, n.jsx)("div", {
              "data-testid": r,
              className: "contents",
              children: i,
            })),
            (s[0] = i),
            (s[1] = r),
            (s[2] = t))
          : (t = s[2]),
        t)
      : i;
  }
  function nt(e) {
    let t,
      s,
      r = (0, l.c)(8),
      { children: i, testId: a, variant: o, onRetry: c } = e,
      d = void 0 === o ? "empty" : o,
      m = (0, p.x)();
    return (
      r[0] !== i || r[1] !== m || r[2] !== c || r[3] !== d
        ? ((t =
            "error" === d
              ? (0, n.jsx)(s8.f, { density: m, onRetry: c, children: i })
              : (0, n.jsx)(sV.L, { density: m, children: i })),
          (r[0] = i),
          (r[1] = m),
          (r[2] = c),
          (r[3] = d),
          (r[4] = t))
        : (t = r[4]),
      r[5] !== t || r[6] !== a
        ? ((s = (0, n.jsx)(ne, { testId: a, children: t })),
          (r[5] = t),
          (r[6] = a),
          (r[7] = s))
        : (s = r[7]),
      s
    );
  }
  function ns(e) {
    let t,
      s,
      r = (0, l.c)(8),
      { title: i, children: a, testId: o, action: c } = e,
      d = (0, p.x)();
    return (
      r[0] !== c || r[1] !== a || r[2] !== d || r[3] !== i
        ? ((t = (0, n.jsx)(sV.L, {
            density: d,
            title: i,
            action: c,
            children: a,
          })),
          (r[0] = c),
          (r[1] = a),
          (r[2] = d),
          (r[3] = i),
          (r[4] = t))
        : (t = r[4]),
      r[5] !== t || r[6] !== o
        ? ((s = (0, n.jsx)(ne, { testId: o, children: t })),
          (r[5] = t),
          (r[6] = o),
          (r[7] = s))
        : (s = r[7]),
      s
    );
  }
  var nn = e.i(609252);
  let nl = (e) => e.key;
  function nr(e) {
    let t,
      s,
      n,
      r,
      i = (0, l.c)(22),
      { items: a, paused: o, keyOf: d } = e,
      [m, u] = (0, c.useState)(null);
    i[0] !== a || i[1] !== d
      ? ((t = () => new Set(a.map(d))), (i[0] = a), (i[1] = d), (i[2] = t))
      : (t = i[2]);
    let f = t;
    i[3] !== m || i[4] !== f || i[5] !== o
      ? ((s = null),
        o ? ((s = m ?? f()), null === m && u(s)) : null !== m && u(null),
        (i[3] = m),
        (i[4] = f),
        (i[5] = o),
        (i[6] = s))
      : (s = i[6]);
    e: {
      let e;
      if (!s) {
        n = 0;
        break e;
      }
      let t = s;
      if (i[7] !== a || i[8] !== d || i[9] !== t) {
        let s;
        (i[11] !== d || i[12] !== t
          ? ((s = (e) => t.has(d(e))), (i[11] = d), (i[12] = t), (i[13] = s))
          : (s = i[13]),
          (e = a.findIndex(s)),
          (i[7] = a),
          (i[8] = d),
          (i[9] = t),
          (i[10] = e));
      } else e = i[10];
      n = e;
    }
    let h = n;
    o && null !== m && -1 === h && a.length > 0 && u(f());
    t: {
      let e, t;
      if (h <= 0) {
        let e;
        (i[14] !== a
          ? ((e = { items: a, heldCount: 0 }), (i[14] = a), (i[15] = e))
          : (e = i[15]),
          (r = e));
        break t;
      }
      (i[16] !== h || i[17] !== a
        ? ((e = a.slice(h)), (i[16] = h), (i[17] = a), (i[18] = e))
        : (e = i[18]),
        i[19] !== h || i[20] !== e
          ? ((t = { items: e, heldCount: h }),
            (i[19] = h),
            (i[20] = e),
            (i[21] = t))
          : (t = i[21]),
        (r = t));
    }
    return r;
  }
  let ni = (e) => "object" == typeof e && null !== e && !Array.isArray(e),
    na = (e, t) => {
      if (Object.is(e, t)) return !0;
      if (Array.isArray(e) || Array.isArray(t))
        return (
          Array.isArray(e) &&
          Array.isArray(t) &&
          e.length === t.length &&
          e.every((e, s) => na(e, t[s]))
        );
      if (!ni(e) || !ni(t)) return !1;
      let s = Object.keys(e);
      return (
        s.length === Object.keys(t).length &&
        s.every((s) => s in t && na(e[s], t[s]))
      );
    },
    no = (e, t) => {
      let s = (0, c.useRef)(new Map()),
        n = new Map();
      for (let l of e) {
        if (!l) continue;
        let e = t(l);
        if (!e) continue;
        let r = s.current.get(e);
        n.set(e, r && na(r, l) ? r : l);
      }
      return ((s.current = n), n);
    },
    nc = (e) => e.address;
  function nd(e) {
    let t,
      s,
      r,
      o,
      u,
      f,
      h,
      x,
      g,
      b,
      v,
      y,
      w,
      j,
      N,
      k,
      S,
      M,
      C = (0, l.c)(65),
      {
        entries: I,
        isLoading: P,
        isError: U,
        emptyText: E,
        errorText: T,
        listAriaLabel: A,
        hasNextPage: R,
        isFetchingNextPage: F,
        fetchNextPage: $,
        scrollBoxTestId: z,
        filters: D,
      } = e,
      { address: O, isLoggedIn: B, viewerFollowing: L } = s7(),
      { t: q } = (0, d.f)(),
      { paused: W, targetProps: K } = (0, e7.f)(),
      H = (0, p.x)();
    if (C[0] !== I) {
      for (let e of ((t = new Set()), I)) (0, s0.o)(e) || t.add(e.coinMint);
      ((C[0] = I), (C[1] = t));
    } else t = C[1];
    C[2] !== t ? ((s = Array.from(t)), (C[2] = t), (C[3] = s)) : (s = C[3]);
    let V = s,
      G = 0 === V.length;
    C[4] !== V || C[5] !== G
      ? ((r = {
          mints: V,
          disabled: G,
          refetchInterval: 3e4,
          refetchIntervalInBackground: !1,
        }),
        (C[4] = V),
        (C[5] = G),
        (C[6] = r))
      : (r = C[6]);
    let { coins: Q } = (0, nn.f)(r);
    if (C[7] !== Q) {
      for (let e of ((o = new Map()), Q))
        e?.mint && o.set((0, eT.c)(e.mint), e);
      ((C[7] = Q), (C[8] = o));
    } else o = C[8];
    let J = o;
    C[9] !== I
      ? ((u = Array.from(new Set(I.map(nu)))), (C[9] = I), (C[10] = u))
      : (u = C[10]);
    let X = u;
    (C[11] === Symbol.for("react.memo_cache_sentinel")
      ? ((f = { placeholderData: sa.y }), (C[11] = f))
      : (f = C[11]),
      C[12] !== X
        ? ((h = { userAddresses: X, queryOptions: f }),
          (C[12] = X),
          (C[13] = h))
        : (h = C[13]));
    let { data: Y } = (0, sQ.f)(h);
    C[14] !== Y
      ? ((x = void 0 === Y ? [] : Y), (C[14] = Y), (C[15] = x))
      : (x = C[15]);
    let Z = no(x, nc),
      ee = (0, a.k)(i.D.WEB_PERPS, !1);
    if (
      C[16] !== J ||
      C[17] !== I ||
      C[18] !== D ||
      C[19] !== ee ||
      C[20] !== Z
    ) {
      let e;
      (C[22] !== J || C[23] !== D || C[24] !== ee || C[25] !== Z
        ? ((e = (e) =>
            (ee || !(0, s0.o)(e)) &&
            (0, ts.o)(
              {
                coinMint: e.coinMint,
                chainId: J.get((0, eT.c)(e.coinMint))?.chain_id,
                userId: e.userId,
                username: e.username ?? Z.get(e.userId)?.username,
                mcapUsd: (0, s0.o)(e)
                  ? void 0
                  : (J.get((0, eT.c)(e.coinMint))?.usd_market_cap ??
                    e.marketCapUsd),
              },
              D,
            )),
          (C[22] = J),
          (C[23] = D),
          (C[24] = ee),
          (C[25] = Z),
          (C[26] = e))
        : (e = C[26]),
        (g = I.filter(e)),
        (C[16] = J),
        (C[17] = I),
        (C[18] = D),
        (C[19] = ee),
        (C[20] = Z),
        (C[21] = g));
    } else g = C[21];
    let et = g;
    C[27] !== W || C[28] !== et
      ? ((b = { items: et, paused: W, keyOf: nl }),
        (C[27] = W),
        (C[28] = et),
        (C[29] = b))
      : (b = C[29]);
    let { items: es } = nr(b);
    C[30] !== es ? ((v = es.map(nm)), (C[30] = es), (C[31] = v)) : (v = C[31]);
    let en = (0, th.C)(v),
      el = new Set(
        es
          .filter((e) => !!e.mediaUrl)
          .slice(0, 2)
          .map((e) => e.key),
      ),
      er = (0, c.useRef)(null);
    if (P && 0 === I.length) {
      let e,
        t,
        s = `${z}-skeleton`;
      return (
        C[32] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, _.c)("-mx-[var(--screeners-pad,0px)]", eG.c)),
            (C[32] = e))
          : (e = C[32]),
        C[33] !== H || C[34] !== s
          ? ((t = (0, n.jsx)(s9.F, {
              density: H,
              "data-testid": s,
              className: e,
              rowClassName: eG.C,
            })),
            (C[33] = H),
            (C[34] = s),
            (C[35] = t))
          : (t = C[35]),
        t
      );
    }
    if (U && 0 === I.length) {
      let e;
      return (
        C[36] !== T
          ? ((e = (0, n.jsx)("div", {
              className: "-mx-[var(--screeners-pad,0px)]",
              children: (0, n.jsx)(nt, { variant: "error", children: T }),
            })),
            (C[36] = T),
            (C[37] = e))
          : (e = C[37]),
        e
      );
    }
    C[38] !== W
      ? ((y = (0, n.jsx)(e_.q, { paused: W })), (C[38] = W), (C[39] = y))
      : (y = C[39]);
    let ei = eG.b;
    (C[40] !== E || C[41] !== I.length || C[42] !== q || C[43] !== et
      ? ((w =
          0 === I.length
            ? (0, n.jsx)(nt, { children: E })
            : 0 === et.length
              ? (0, n.jsx)(nt, {
                  children: q("web.screeners.no_callouts_match"),
                })
              : null),
        (C[40] = E),
        (C[41] = I.length),
        (C[42] = q),
        (C[43] = et),
        (C[44] = w))
      : (w = C[44]),
      C[45] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, _.c)("flex w-full flex-col", eG.c)), (C[45] = j))
        : (j = C[45]));
    let ea = es.map((e, t) =>
      (0, n.jsx)(
        "li",
        {
          className: en.has(e.key) ? th.l : void 0,
          children: (0, n.jsx)(sc.f, {
            entry: e,
            coin: J.get((0, eT.c)(e.coinMint)),
            user: Z.get(e.userId),
            position: t,
            mediaPriority: el.has(e.key),
            viewerAddress: O ?? void 0,
            isLoggedIn: B,
            viewerFollowing: L,
            surface: "screeners",
            divider: "none",
            className: eG.C,
            hideXBadge: !0,
            noteClampLines: 3,
          }),
        },
        e.key,
      ),
    );
    C[46] !== A || C[47] !== j || C[48] !== ea
      ? ((N = (0, n.jsx)("ul", {
          className: j,
          "aria-label": A,
          children: ea,
        })),
        (C[46] = A),
        (C[47] = j),
        (C[48] = ea),
        (C[49] = N))
      : (N = C[49]);
    let eo = !(I.length > 0 && 0 === et.length);
    return (
      C[50] !== $ || C[51] !== R || C[52] !== F || C[53] !== eo
        ? ((k = (0, n.jsx)(m.f, {
            hasNextPage: R,
            isFetchingNextPage: F,
            onFetchNextPage: $,
            autoLoad: eo,
            scrollRootRef: er,
            rootMargin: "200px 0px",
          })),
          (C[50] = $),
          (C[51] = R),
          (C[52] = F),
          (C[53] = eo),
          (C[54] = k))
        : (k = C[54]),
      C[55] !== K ||
      C[56] !== z ||
      C[57] !== ei ||
      C[58] !== w ||
      C[59] !== N ||
      C[60] !== k
        ? ((S = (0, n.jsxs)("div", {
            ref: er,
            ...K,
            "data-testid": z,
            className: ei,
            children: [w, N, k],
          })),
          (C[55] = K),
          (C[56] = z),
          (C[57] = ei),
          (C[58] = w),
          (C[59] = N),
          (C[60] = k),
          (C[61] = S))
        : (S = C[61]),
      C[62] !== y || C[63] !== S
        ? ((M = (0, n.jsxs)("div", {
            className: "relative flex min-h-0 flex-1 flex-col",
            children: [y, S],
          })),
          (C[62] = y),
          (C[63] = S),
          (C[64] = M))
        : (M = C[64]),
      M
    );
  }
  function nm(e) {
    return e.key;
  }
  function nu(e) {
    return e.userId;
  }
  var nf = e.i(757630);
  let nh = [];
  function nx() {}
  var np = e.i(163401),
    ng = e.i(761459),
    nb = e.i(342e3),
    nv = e.i(406920),
    ny = e.i(987425);
  let nw = (e, t) => {
      let s = [];
      for (let n of e) {
        let e = sU(n);
        t.has(e) || (t.add(e), s.push(n));
      }
      return s;
    },
    nj = async ({ mint: e, chainId: t, cursor: s, signal: n }) => {
      let l = await (0, G.j)()("GET /trades/{chainId}/{address}", {
        params: { chainId: t, address: e },
        query: { limit: 30, cursor: s },
        signal: n,
      });
      if (!Array.isArray(l?.trades) || void 0 === l.cursor)
        throw Error("Malformed trades response");
      return {
        trades: l.trades.map((e) => (0, nv.c)(e, { chainId: t })),
        cursor: l.cursor,
      };
    };
  function n_(e) {
    return e.pages.flatMap(nN);
  }
  function nN(e) {
    return e.trades;
  }
  function nk(e) {
    return e.cursor ?? void 0;
  }
  function nS(e) {
    return e.key;
  }
  let nM = (e) => e.address;
  function nC(e) {
    let t,
      s,
      r,
      u,
      f,
      h,
      x,
      g,
      b,
      v,
      y,
      w,
      j,
      N,
      k,
      S,
      M,
      C,
      I,
      P,
      U,
      E,
      T,
      A,
      R = (0, l.c)(99),
      {
        column: F,
        feed: $,
        listAriaLabel: z,
        testIdPrefix: D,
        feedManagesReveal: O,
        surface: B,
      } = e,
      L = void 0 === B ? "screeners" : B,
      { address: q } = (0, o.F)(),
      { t: W } = (0, d.f)(),
      K = !!q,
      H = (0, sX.o)(),
      { paused: V, targetProps: G } = (0, e7.f)(),
      Q = (0, p.x)(),
      {
        callouts: J,
        isLoadingHistory: X,
        error: Y,
        pendingNewCount: Z,
        pendingPreview: ee,
        showNewCallouts: et,
        hasNextPage: es,
        hasUnseen: en,
        isFetchingNextPage: el,
        fetchNextPage: er,
      } = $;
    if (R[0] !== J || R[1] !== ee) {
      let e,
        s = [...J.map(nT), ...ee.map(nE)];
      (R[3] !== s ? ((e = new Set(s)), (R[3] = s), (R[4] = e)) : (e = R[4]),
        (t = Array.from(e)),
        (R[0] = J),
        (R[1] = ee),
        (R[2] = t));
    } else t = R[2];
    let ei = t;
    if (R[5] !== J) {
      for (let e of ((s = new Map()), J))
        null == e.coinMarketCapUsd ||
          s.has(e.coinMint) ||
          s.set(e.coinMint, e.coinMarketCapUsd);
      ((R[5] = J), (R[6] = s));
    } else s = R[6];
    let ea = s,
      eo = 0 === ei.length;
    R[7] !== ei || R[8] !== ea || R[9] !== eo
      ? ((r = {
          mints: ei,
          disabled: eo,
          refetchInterval: 3e4,
          refetchIntervalInBackground: !1,
          marketCapByMint: ea,
        }),
        (R[7] = ei),
        (R[8] = ea),
        (R[9] = eo),
        (R[10] = r))
      : (r = R[10]);
    let { coins: ec } = (0, sJ.f)(r);
    if (R[11] !== ec) {
      for (let e of ((u = new Map()), ec))
        e?.mint && u.set((0, eT.c)(e.mint), e);
      ((R[11] = ec), (R[12] = u));
    } else u = R[12];
    let ed = u;
    R[13] !== J
      ? ((f = Array.from(new Set(J.map(nU)))), (R[13] = J), (R[14] = f))
      : (f = R[14]);
    let em = f;
    (R[15] === Symbol.for("react.memo_cache_sentinel")
      ? ((h = { placeholderData: sa.y }), (R[15] = h))
      : (h = R[15]),
      R[16] !== em
        ? ((x = { userAddresses: em, queryOptions: h }),
          (R[16] = em),
          (R[17] = x))
        : (x = R[17]));
    let { data: eu } = (0, sQ.f)(x);
    R[18] !== eu
      ? ((g = void 0 === eu ? [] : eu), (R[18] = eu), (R[19] = g))
      : (g = R[19]);
    let ef = no(g, nM),
      eh = F.filters,
      ex = (0, a.k)(i.D.WEB_PERPS, !1);
    R[20] !== J || R[21] !== ex
      ? ((b = ex ? J : J.filter(nP)), (R[20] = J), (R[21] = ex), (R[22] = b))
      : (b = R[22]);
    let ep = b;
    if (R[23] !== ed || R[24] !== ep || R[25] !== eh || R[26] !== ef) {
      let e;
      (R[28] !== ed || R[29] !== eh || R[30] !== ef
        ? ((e = (e) =>
            (0, ts.o)(
              {
                coinMint: e.coinMint,
                chainSlug: e.coinChain,
                chainId: ed.get((0, eT.c)(e.coinMint))?.chain_id,
                userId: e.userId,
                username: e.username ?? ef.get(e.userId)?.username,
                mcapUsd:
                  ed.get((0, eT.c)(e.coinMint))?.usd_market_cap ??
                  e.marketCapUsd,
              },
              eh,
            )),
          (R[28] = ed),
          (R[29] = eh),
          (R[30] = ef),
          (R[31] = e))
        : (e = R[31]),
        (v = ep.filter(e)),
        (R[23] = ed),
        (R[24] = ep),
        (R[25] = eh),
        (R[26] = ef),
        (R[27] = v));
    } else v = R[27];
    let eg = v;
    R[32] !== V || R[33] !== eg
      ? ((y = { items: eg, paused: V, keyOf: nl }),
        (R[32] = V),
        (R[33] = eg),
        (R[34] = y))
      : (y = R[34]);
    let { items: eb } = nr(y);
    R[35] !== eb ? ((w = eb.map(nI)), (R[35] = eb), (R[36] = w)) : (w = R[36]);
    let ev = (0, th.C)(w),
      ey = `${eg[0]?.key ?? ""}|${ee[0]?.key ?? ""}`;
    (R[37] !== F.sound || R[38] !== ey
      ? ((j = { sound: F.sound, newnessKey: ey }),
        (R[37] = F.sound),
        (R[38] = ey),
        (R[39] = j))
      : (j = R[39]),
      e6(j));
    let ew = (0, c.useRef)(null);
    R[40] !== et
      ? ((N = () => {
          let e = ew.current;
          e && !(e.scrollTop > 8) && et();
        }),
        (R[40] = et),
        (R[41] = N))
      : (N = R[41]);
    let ej = N,
      eN = !(void 0 !== O && O) && !V && Z > 0;
    R[42] !== eN || R[43] !== ej
      ? ((k = () => {
          eN && ej();
        }),
        (R[42] = eN),
        (R[43] = ej),
        (R[44] = k))
      : (k = R[44]);
    let ek = k;
    if (
      (R[45] !== eN || R[46] !== ej
        ? ((S = () => {
            eN && ej();
          }),
          (R[45] = eN),
          (R[46] = ej),
          (R[47] = S))
        : (S = R[47]),
      (0, c.useEffect)(S),
      X && 0 === J.length)
    ) {
      let e,
        t = `${D}-skeleton`;
      return (
        R[48] !== Q || R[49] !== t
          ? ((e = (0, n.jsx)(
              "div",
              {
                "aria-hidden": !0,
                className: eG.b,
                children: (0, n.jsx)(s9.F, {
                  density: Q,
                  "data-testid": t,
                  className: eG.c,
                  rowClassName: eG.C,
                }),
              },
              "loading",
            )),
            (R[48] = Q),
            (R[49] = t),
            (R[50] = e))
          : (e = R[50]),
        e
      );
    }
    if (Y && 0 === J.length) {
      let e, t;
      return (
        R[51] !== W
          ? ((e = W("web.screeners.error_recent_callouts")),
            (R[51] = W),
            (R[52] = e))
          : (e = R[52]),
        R[53] !== e
          ? ((t = (0, n.jsx)(
              "div",
              {
                className: "-mx-[var(--screeners-pad,0px)]",
                children: (0, n.jsx)(nt, { variant: "error", children: e }),
              },
              "error",
            )),
            (R[53] = e),
            (R[54] = t))
          : (t = R[54]),
        t
      );
    }
    R[55] !== V
      ? ((M = (0, n.jsx)(e_.q, { paused: V })), (R[55] = V), (R[56] = M))
      : (M = R[56]);
    let eS = `${D}-scroll`;
    if (
      (R[57] !== ep.length || R[58] !== Z || R[59] !== W || R[60] !== eg.length
        ? ((C =
            0 === ep.length && 0 === Z
              ? (0, n.jsx)(nt, { children: W("web.screeners.empty_callouts") })
              : ep.length > 0 && 0 === eg.length
                ? (0, n.jsx)(nt, {
                    children: W("web.screeners.no_callouts_match"),
                  })
                : null),
          (R[57] = ep.length),
          (R[58] = Z),
          (R[59] = W),
          (R[60] = eg.length),
          (R[61] = C))
        : (C = R[61]),
      R[62] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = (0, _.c)("flex w-full flex-col", eG.c)), (R[62] = I))
        : (I = R[62]),
      R[63] !== q ||
        R[64] !== ed ||
        R[65] !== ev ||
        R[66] !== K ||
        R[67] !== eb ||
        R[68] !== L ||
        R[69] !== ef ||
        R[70] !== H)
    ) {
      let e;
      (R[72] !== q ||
      R[73] !== ed ||
      R[74] !== ev ||
      R[75] !== K ||
      R[76] !== L ||
      R[77] !== ef ||
      R[78] !== H
        ? ((e = (e, t) =>
            (0, n.jsx)(
              "li",
              {
                className: ev.has(e.key) ? th.l : void 0,
                children: (0, n.jsx)(sc.f, {
                  entry: e,
                  coin: ed.get((0, eT.c)(e.coinMint)),
                  user: ef.get(e.userId),
                  position: t,
                  viewerAddress: q ?? void 0,
                  isLoggedIn: K,
                  viewerFollowing: H,
                  surface: L,
                  divider: "none",
                  className: eG.C,
                  noteClampLines: 3,
                }),
              },
              e.key,
            )),
          (R[72] = q),
          (R[73] = ed),
          (R[74] = ev),
          (R[75] = K),
          (R[76] = L),
          (R[77] = ef),
          (R[78] = H),
          (R[79] = e))
        : (e = R[79]),
        (P = eb.map(e)),
        (R[63] = q),
        (R[64] = ed),
        (R[65] = ev),
        (R[66] = K),
        (R[67] = eb),
        (R[68] = L),
        (R[69] = ef),
        (R[70] = H),
        (R[71] = P));
    } else P = R[71];
    R[80] !== z || R[81] !== P
      ? ((U = (0, n.jsx)("ul", { className: I, "aria-label": z, children: P })),
        (R[80] = z),
        (R[81] = P),
        (R[82] = U))
      : (U = R[82]);
    let eM = !(J.length > 0 && 0 === eg.length);
    return (
      R[83] !== er ||
      R[84] !== es ||
      R[85] !== en ||
      R[86] !== el ||
      R[87] !== eM
        ? ((E = (0, n.jsx)(m.f, {
            hasNextPage: es,
            autoLoadHasMore: en,
            isFetchingNextPage: el,
            onFetchNextPage: er,
            autoLoad: eM,
            scrollRootRef: ew,
            rootMargin: "200px 0px",
          })),
          (R[83] = er),
          (R[84] = es),
          (R[85] = en),
          (R[86] = el),
          (R[87] = eM),
          (R[88] = E))
        : (E = R[88]),
      R[89] !== ek ||
      R[90] !== G ||
      R[91] !== eS ||
      R[92] !== C ||
      R[93] !== U ||
      R[94] !== E
        ? ((T = (0, n.jsxs)("div", {
            ref: ew,
            onScroll: ek,
            ...G,
            "data-testid": eS,
            className: eG.b,
            children: [C, U, E],
          })),
          (R[89] = ek),
          (R[90] = G),
          (R[91] = eS),
          (R[92] = C),
          (R[93] = U),
          (R[94] = E),
          (R[95] = T))
        : (T = R[95]),
      R[96] !== M || R[97] !== T
        ? ((A = (0, n.jsxs)(
            "div",
            {
              className: "relative flex h-full min-h-0 w-full flex-col gap-2",
              children: [M, T],
            },
            "ready",
          )),
          (R[96] = M),
          (R[97] = T),
          (R[98] = A))
        : (A = R[98]),
      A
    );
  }
  function nI(e) {
    return e.key;
  }
  function nP(e) {
    return !(0, s0.o)(e);
  }
  function nU(e) {
    return e.userId;
  }
  function nE(e) {
    return e.coinMint;
  }
  function nT(e) {
    return e.coinMint;
  }
  var nA = e.i(99859),
    nR = e.i(985526),
    nF = e.i(390065),
    n$ = e.i(349879),
    nz = e.i(573525),
    nD = e.i(735821),
    nO = e.i(154703);
  let nB = (e) => Number(e.split(":")[0]),
    nL = (e, t) => {
      let s = nB(e),
        n = nB(t);
      return Number.isFinite(s) && Number.isFinite(n) && s > n;
    },
    nq = (e, t) =>
      !e.flagged &&
      null != e.costBasisUsd &&
      !(e.costBasisUsd < t.minCostBasisUsd) &&
      null != e.calledOutAtMcap &&
      !(e.calledOutAtMcap < t.minCalloutMarketCapUsd) &&
      (void 0 === t.maxCostBasisUsd || !(e.costBasisUsd > t.maxCostBasisUsd)) &&
      (void 0 === t.maxCalloutMarketCapUsd ||
        !(e.calledOutAtMcap > t.maxCalloutMarketCapUsd)) &&
      !0,
    nW = (e) => {
      let t,
        s,
        n = (0, l.c)(7),
        { subject: r, enabled: i, onHead: a } = e;
      n[0] !== a || n[1] !== r
        ? ((t = (e) => {
            r && a(r, e);
          }),
          (n[0] = a),
          (n[1] = r),
          (n[2] = t))
        : (t = n[2]);
      let o = t,
        c = r ?? "",
        d = i && !!r;
      (n[3] !== o || n[4] !== c || n[5] !== d
        ? ((s = { type: nR.N.Core, subject: c, enabled: d, onEvent: o }),
          (n[3] = o),
          (n[4] = c),
          (n[5] = d),
          (n[6] = s))
        : (s = n[6]),
        (0, nz.f)(s));
    };
  function nK(e) {
    return e.nextPageToken || void 0;
  }
  function nH(e) {
    return e.calloutId;
  }
  function nV(e, t) {
    return nB(t.token) - nB(e.token);
  }
  function nG(e) {
    return {
      key: `cid:${e.calloutId}`,
      coinMint: e.coinMint,
      coinSymbol: void 0,
    };
  }
  function nQ(e) {
    return { ...e, revealRequestedAt: Date.now() };
  }
  var nJ = e.i(66397),
    nX = e.i(633216),
    nY = e.i(996005),
    nZ = e.i(363281),
    n0 = e.i(662610),
    n1 = e.i(956683),
    n2 = e.i(372550),
    n3 = e.i(607122),
    n4 = e.i(699738);
  let n5 = {
      traders: function (e) {
        let t,
          s = (0, l.c)(5),
          { filterBarLeading: r } = e,
          { address: i } = (0, o.F)(),
          a = (0, sX.o)(),
          c = "coin-rail" === (0, p.k)() ? 50 : void 0;
        return (
          s[0] !== i || s[1] !== r || s[2] !== c || s[3] !== a
            ? ((t = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)("div", {
                  "data-testid": "screeners-pnl-scroll",
                  className: eG.b,
                  children: (0, n.jsx)(nY.f, {
                    enabled: !0,
                    viewerAddress: i,
                    viewerFollowing: a,
                    refetchIntervalMs: nX.f,
                    pageSize: c,
                    filterBarLeading: r,
                  }),
                }),
              })),
              (s[0] = i),
              (s[1] = r),
              (s[2] = c),
              (s[3] = a),
              (s[4] = t))
            : (t = s[4]),
          t
        );
      },
      earners: function (e) {
        let t,
          s = (0, l.c)(3),
          { filterBarLeading: r } = e,
          { address: i } = (0, o.F)();
        return (
          s[0] !== i || s[1] !== r
            ? ((t = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)("div", {
                  "data-testid": "screeners-earners-scroll",
                  className: eG.b,
                  children: (0, n.jsx)(nJ.f, {
                    viewerAddress: i,
                    refetchIntervalMs: nX.f,
                    filterBarLeading: r,
                  }),
                }),
              })),
              (s[0] = i),
              (s[1] = r),
              (s[2] = t))
            : (t = s[2]),
          t
        );
      },
      squads: function (e) {
        let t,
          s = (0, l.c)(4),
          { filterBarLeading: r } = e,
          { t: i } = (0, d.f)(),
          a = (0, n0.f)();
        return (
          s[0] !== r || s[1] !== a || s[2] !== i
            ? ((t = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)("div", {
                  "data-testid": "screeners-squads-scroll",
                  className: eG.b,
                  children: a
                    ? (0, n.jsx)(nZ.f, {
                        showHeader: !1,
                        refetchIntervalMs: n1.Y,
                        filterBarLeading: r,
                      })
                    : (0, n.jsx)(nt, {
                        testId: "screeners-squads-unavailable",
                        children: i("web.screeners.empty_board"),
                      }),
                }),
              })),
              (s[0] = r),
              (s[1] = a),
              (s[2] = i),
              (s[3] = t))
            : (t = s[3]),
          t
        );
      },
    },
    n6 = {
      terminal: {
        ownRow: "@[221px]/leaderboard:hidden",
        inline: "hidden @[221px]/leaderboard:flex",
        chip: "flex @[330px]/leaderboard:hidden",
        segment: "hidden @[330px]/leaderboard:flex",
      },
      comfortable: {
        ownRow: "@[227px]/leaderboard:hidden",
        inline: "hidden @[227px]/leaderboard:flex",
        chip: "flex @[342px]/leaderboard:hidden",
        segment: "hidden @[342px]/leaderboard:flex",
      },
    };
  var n7 = e.i(935258),
    n9 = e.i(726692),
    n8 = e.i(45329);
  function le() {}
  function lt(e) {
    return e.isError;
  }
  function ls(e) {
    return e.data;
  }
  function ln(e, t) {
    return t.createdAt - e.createdAt;
  }
  function ll(e) {
    return e.data ?? [];
  }
  function lr(e) {
    let t,
      s,
      r,
      i = (0, l.c)(8),
      { what: a } = e,
      { t: o } = (0, d.f)();
    return (
      i[0] !== o || i[1] !== a
        ? ((t = o("web.screeners.sign_in_title", { what: a })),
          (i[0] = o),
          (i[1] = a),
          (i[2] = t))
        : (t = i[2]),
      i[3] !== o
        ? ((s = o("web.screeners.sign_in_description")), (i[3] = o), (i[4] = s))
        : (s = i[4]),
      i[5] !== t || i[6] !== s
        ? ((r = (0, n.jsx)(ns, {
            testId: "screeners-sign-in-prompt",
            title: t,
            children: s,
          })),
          (i[5] = t),
          (i[6] = s),
          (i[7] = r))
        : (r = i[7]),
      r
    );
  }
  var li = e.i(935302),
    la = e.i(390146),
    lo = e.i(106009),
    lc = e.i(16503),
    ld = e.i(572128),
    lm = e.i(79402);
  let lu = new Set(["my-alerts"]),
    lf = (e) => e?.trim() || null,
    lh = (e) => {
      switch (e.type) {
        case "trade":
          return {
            name: lf(e.author.name),
            xUsername: lf(e.author.xUsername),
            address: lf(e.author.address),
            userId: lf(e.author.userId),
            avatarUrl: lf(e.author.avatarUrl),
          };
        case "callout":
          return {
            name: lf(e.entry.username),
            xUsername: lf(e.entry.xUsername),
            address: lf(e.entry.userId),
            userId: lf(e.entry.authorCcUserId),
            avatarUrl: lf(e.entry.profileImage),
          };
        case "repost":
          return {
            name: lf(e.reposter.name),
            xUsername: lf(e.reposter.xUsername),
            address: lf(e.reposter.address),
            userId: null,
            avatarUrl: lf(e.reposter.avatarUrl),
          };
        case "reply":
        case "quote": {
          let { reply: t } = e.row;
          return {
            name: lf(t.caller?.username ?? t.caller?.displayName),
            xUsername: lf(e.xUsername),
            address: lf(t.caller?.walletAddress ?? t.userId),
            userId: lf(t.authorCcUserId),
            avatarUrl: lf(t.caller?.avatarUrl),
          };
        }
      }
    },
    lx = (e) => e.trim().replace(/^@+/, "").toLowerCase(),
    lp = (e) => e?.toLowerCase() ?? null,
    lg = (e, t) => {
      let s = lx(t);
      return (
        "" !== s &&
        [e.name, e.xUsername, e.address, e.userId]
          .flatMap((e) => (e ? [e.toLowerCase()] : []))
          .includes(s)
      );
    },
    lb = (e, t) => !!t?.some((t) => lg(e, t)),
    lv = (e, t) => {
      let s = lx(t.query ?? ""),
        n = t.excludeUsers ?? [];
      return s || 0 !== n.length
        ? e.filter((e) => {
            let t = lh(e);
            return (
              !lb(t, n) &&
              (!s ||
                !!lp(t.name)?.includes(s) ||
                !!lp(t.xUsername)?.includes(s) ||
                !!lp(t.address)?.startsWith(s) ||
                !!lp(t.userId)?.startsWith(s))
            );
          })
        : e;
    },
    ly = 24,
    lw = (e, t = ly) => {
      let s = new Set(),
        n = [];
      for (let l of e) {
        if (n.length >= t) break;
        let e = lh(l),
          r = (e.address ?? e.userId ?? e.name)?.toLowerCase();
        !r || s.has(r) || (s.add(r), n.push({ ...e, key: r }));
      }
      return n;
    };
  e.s(
    [
      "D",
      0,
      (e) => e.address ?? e.name ?? e.userId ?? "",
      "w",
      0,
      lw,
      "d",
      0,
      lv,
      "k",
      0,
      lb,
      "p",
      0,
      lg,
      "R",
      0,
      (e) => lu.has(e),
    ],
    261848,
  );
  var lj = e.i(779106),
    l_ = e.i(399346),
    lN = e.i(574654);
  function lk(e) {
    return e.pagination.has_more
      ? (e.pagination.next_cursor ?? void 0)
      : void 0;
  }
  function lS(e) {
    return e.key;
  }
  function lM(e) {
    return e.transactions;
  }
  var lC = e.i(411315);
  let lI = (0, c.memo)((e) => {
    let t,
      s,
      i,
      a,
      o,
      c,
      d,
      m,
      f,
      x,
      y,
      w,
      j,
      N,
      k,
      S,
      C,
      I,
      P,
      U = (0, l.c)(68),
      { entry: E, index: T, isHydrated: A, trailing: R } = e,
      F = (0, p.x)();
    U[0] !== E.m || U[1] !== E.n || U[2] !== E.t
      ? ((t = (0, v.D)({ mint: E.m, name: E.n, symbol: E.t })),
        (U[0] = E.m),
        (U[1] = E.n),
        (U[2] = E.t),
        (U[3] = t))
      : (t = U[3]);
    let $ = t;
    if (U[4] !== E.age || U[5] !== A) {
      let e;
      ((s = "number" == typeof (e = E.age) ? Date.now() - 1e3 * e : null),
        (i = A && null !== s && (0, lC.M)(s, 36e5)),
        (U[4] = E.age),
        (U[5] = A),
        (U[6] = s),
        (U[7] = i));
    } else ((s = U[6]), (i = U[7]));
    let B = i;
    U[8] !== E.mc
      ? ((a = Number.isFinite(E.mc) && E.mc > 0 ? (0, q.l)(E.mc) : "—"),
        (U[8] = E.mc),
        (U[9] = a))
      : (a = U[9]);
    let L = a,
      W = (0, O.v)(E.m, E.c);
    U[10] !== E.m
      ? ((o = (0, z.e)(E.m)), (U[10] = E.m), (U[11] = o))
      : (o = U[11]);
    let { prefetch: K, hoverProps: H } = (0, z.W)(o),
      V = Number.isFinite(E.mc) ? E.mc : 0;
    U[12] !== T || U[13] !== V
      ? ((c = {
          itemPosition: T,
          marketCap: V,
          sourceScreen: r.Ae.COIN_SCREENERS,
        }),
        (U[12] = T),
        (U[13] = V),
        (U[14] = c))
      : (c = U[14]);
    let G = c,
      Q = (0, D.f)(E.m, G, void 0, r.k9.MOVERS_FEED),
      J = `/coin/${E.m}`;
    (U[15] !== E.m || U[16] !== G.marketCap || U[17] !== T
      ? ((d = () =>
          (0, M.iV)({
            coinId: E.m,
            itemPosition: T,
            marketCap: G.marketCap,
            sourceScreen: r.Ae.COIN_SCREENERS,
            sourceElement: r.k9.MOVERS_FEED,
          })),
        (U[15] = E.m),
        (U[16] = G.marketCap),
        (U[17] = T),
        (U[18] = d))
      : (d = U[18]),
      U[19] !== $ || U[20] !== H || U[21] !== K || U[22] !== J || U[23] !== d
        ? ((m = (0, n.jsx)(h.default, {
            href: J,
            prefetch: K,
            ...H,
            "aria-label": $,
            onClick: d,
            className: "absolute inset-0 z-[1] focus-inset",
          })),
          (U[19] = $),
          (U[20] = H),
          (U[21] = K),
          (U[22] = J),
          (U[23] = d),
          (U[24] = m))
        : (m = U[24]));
    let X = m,
      Y = E.m,
      Z = E.n,
      ee = E.t,
      et = E.i || void 0,
      es = E.c && !E.c.startsWith("solana") ? E.c : null;
    (U[25] !== E ? ((f = (0, tq.H)(E)), (U[25] = E), (U[26] = f)) : (f = U[26]),
      U[27] !== E.m ||
      U[28] !== E.n ||
      U[29] !== E.t ||
      U[30] !== et ||
      U[31] !== es ||
      U[32] !== f
        ? ((x = {
            mint: Y,
            name: Z,
            symbol: ee,
            image_uri: et,
            chain_id: es,
            ...f,
          }),
          (U[27] = E.m),
          (U[28] = E.n),
          (U[29] = E.t),
          (U[30] = et),
          (U[31] = es),
          (U[32] = f),
          (U[33] = x))
        : (x = U[33]));
    let en = x,
      el = u.w[F],
      er = u.s[F];
    U[34] !== en || U[35] !== er
      ? ((y = (0, n.jsx)(g.CoinAvatar, {
          optimisticImage: !0,
          coin: en,
          size: er,
          verified: !1,
          testIdPrefix: "movers-coin-row",
        })),
        (U[34] = en),
        (U[35] = er),
        (U[36] = y))
      : (y = U[36]);
    let ei = u.n[F];
    (U[37] !== en || U[38] !== W || U[39] !== ei
      ? ((w = (0, n.jsx)("div", {
          "data-testid": "movers-coin-row-name-line",
          className: "flex min-w-0 items-center gap-1",
          children: (0, n.jsx)(b.f, {
            coin: en,
            verified: W,
            sealSize: 14,
            nameClassName: ei,
            testIdPrefix: "movers-coin-row",
          }),
        })),
        (U[37] = en),
        (U[38] = W),
        (U[39] = ei),
        (U[40] = w))
      : (w = U[40]),
      U[41] !== F || U[42] !== E.t
        ? ((j = E.t
            ? (0, n.jsx)("span", {
                className: (0, _.c)("min-w-0 truncate", u.B[F]),
                children: E.t.replace(/^\$/, ""),
              })
            : null),
          (U[41] = F),
          (U[42] = E.t),
          (U[43] = j))
        : (j = U[43]),
      U[44] !== Q || U[45] !== w || U[46] !== j
        ? ((N = (0, n.jsxs)("div", {
            ref: Q,
            className: "flex min-w-0 flex-1 flex-col",
            children: [w, j],
          })),
          (U[44] = Q),
          (U[45] = w),
          (U[46] = j),
          (U[47] = N))
        : (N = U[47]));
    let ea = u.e[F];
    return (
      U[48] !== L || U[49] !== ea
        ? ((k = (0, n.jsx)("span", { className: ea, children: L })),
          (U[48] = L),
          (U[49] = ea),
          (U[50] = k))
        : (k = U[50]),
      U[51] !== s || U[52] !== F || U[53] !== B
        ? ((S =
            null !== s
              ? (0, n.jsx)(eC.f, {
                  timestamp: s,
                  density: F,
                  className: (0, _.c)(
                    u.C[F],
                    B ? "text-text-primary" : "text-text-quaternary",
                  ),
                })
              : null),
          (U[51] = s),
          (U[52] = F),
          (U[53] = B),
          (U[54] = S))
        : (S = U[54]),
      U[55] !== k || U[56] !== S
        ? ((C = (0, n.jsxs)("div", {
            "data-testid": "movers-coin-row-figures",
            className: "flex shrink-0 flex-col items-end",
            children: [k, S],
          })),
          (U[55] = k),
          (U[56] = S),
          (U[57] = C))
        : (C = U[57]),
      U[58] !== R
        ? ((I = R
            ? (0, n.jsx)("span", {
                className: "relative z-[2] flex shrink-0 items-center",
                children: R,
              })
            : null),
          (U[58] = R),
          (U[59] = I))
        : (I = U[59]),
      U[60] !== X ||
      U[61] !== F ||
      U[62] !== el ||
      U[63] !== y ||
      U[64] !== N ||
      U[65] !== C ||
      U[66] !== I
        ? ((P = (0, n.jsxs)("div", {
            role: "listitem",
            "data-testid": "movers-coin-row",
            "data-density": F,
            className: el,
            children: [X, y, N, C, I],
          })),
          (U[60] = X),
          (U[61] = F),
          (U[62] = el),
          (U[63] = y),
          (U[64] = N),
          (U[65] = C),
          (U[66] = I),
          (U[67] = P))
        : (P = U[67]),
      P
    );
  });
  var lP = e.i(997887),
    lU = e.i(48485),
    lE = e.i(562606),
    lT = e.i(181254),
    lA = e.i(333757),
    lR = e.i(21617);
  function lF(e) {
    let t,
      s,
      r,
      i = (0, l.c)(12),
      { entry: a, index: o, isHydrated: c, trailing: d } = e;
    i[0] !== a.c || i[1] !== a.m || i[2] !== a.mc
      ? ((t = { mint: a.m, chainId: a.c, fallbackMarketCap: a.mc }),
        (i[0] = a.c),
        (i[1] = a.m),
        (i[2] = a.mc),
        (i[3] = t))
      : (t = i[3]);
    let m = (0, ei.h)(t);
    i[4] !== a || i[5] !== m
      ? ((s =
          void 0 !== m && Number.isFinite(m) && m > 0 && m !== a.mc
            ? { ...a, mc: m }
            : a),
        (i[4] = a),
        (i[5] = m),
        (i[6] = s))
      : (s = i[6]);
    let u = s;
    return (
      i[7] !== o || i[8] !== c || i[9] !== u || i[10] !== d
        ? ((r = (0, n.jsx)(lI, {
            entry: u,
            index: o,
            isHydrated: c,
            trailing: d,
          })),
          (i[7] = o),
          (i[8] = c),
          (i[9] = u),
          (i[10] = d),
          (i[11] = r))
        : (r = i[11]),
      r
    );
  }
  function l$(e) {
    let t,
      s,
      r,
      o,
      c,
      m,
      h,
      x,
      g = (0, l.c)(48),
      { enabled: b, scrollableClassName: v, filterCoin: y } = e,
      { t: w } = (0, d.f)(),
      M = (0, k.f)(),
      C = (0, p.x)(),
      {
        bookmarkedCoins: I,
        bookmarkedCoinsLoading: P,
        bookmarkedCoinsIsError: U,
        bookmarkedCoinsUpdatedAt: T,
        removeFromBookmark: A,
      } = (0, N.j)(b, !1);
    (0, ei._)(I);
    let R = (0, a.k)(i.D.WEB_PERPS, !1);
    if (g[0] !== I || g[1] !== R) {
      let e;
      (g[3] !== R
        ? ((e = (e) =>
            e?.mint && (!(0, lR.x)(e) || (R && null !== (0, lA.K)(e)))),
          (g[3] = R),
          (g[4] = e))
        : (e = g[4]),
        (t = I.filter(e)),
        (g[0] = I),
        (g[1] = R),
        (g[2] = t));
    } else t = g[2];
    let F = t.length;
    if (g[5] !== I || g[6] !== y || g[7] !== R) {
      let e;
      (g[9] !== y || g[10] !== R
        ? ((e = (e) => {
            let t, s;
            if (!e?.mint) return [];
            if ((0, lR.x)(e)) {
              if (!R) return [];
              let t = (0, lA.K)(e);
              return t ? [{ kind: "perp", market: t }] : [];
            }
            return (y?.(e) ?? !0)
              ? [
                  {
                    kind: "coin",
                    entry:
                      ((t = (0, lP.i)(e.created_timestamp)),
                      (s = Date.now()),
                      {
                        m: e.mint,
                        n: e.name ?? "",
                        t: e.symbol ?? "",
                        i: e.image_uri ?? "",
                        mc:
                          "number" == typeof e.usd_market_cap
                            ? e.usd_market_cap
                            : 0,
                        age: t ? Math.max(0, (s - t) / 1e3) : 0,
                        c: e.chain_id,
                        p: 0,
                        mh: !1,
                        pg:
                          ((0, eT.N)({ mint: e.mint, chainId: e.chain_id })
                            ? e.protocol
                            : (e.board_program ?? e.program)) ?? "",
                        pl: e.platform ?? "",
                        gd: 0,
                        bc: 0,
                        sc: 0,
                        txc: 0,
                        nh: 0,
                        t10: 0,
                        dh: 0,
                        tw: !1,
                        ws: !1,
                        tg: !1,
                      }),
                  },
                ]
              : [];
          }),
          (g[9] = y),
          (g[10] = R),
          (g[11] = e))
        : (e = g[11]),
        (s = I.flatMap(e)),
        (g[5] = I),
        (g[6] = y),
        (g[7] = R),
        (g[8] = s));
    } else s = g[8];
    let $ = s;
    (g[12] !== T || g[13] !== $
      ? ((r = (e) =>
          $.map((t) =>
            "perp" === t.kind &&
            (0, lT.U)({ markAsOf: t.market.markAsOf, fetchedAt: T }, e)
              ? "1"
              : "0",
          ).join("")),
        (g[12] = T),
        (g[13] = $),
        (g[14] = r))
      : (r = g[14]),
      g[15] !== b || g[16] !== $
        ? ((o = b && $.some(lz)), (g[15] = b), (g[16] = $), (g[17] = o))
        : (o = g[17]));
    let z = (0, eU.H)(r, o);
    if (g[18] !== $) {
      let e = [],
        t = [],
        s = [];
      for (let n of $) {
        if ("coin" !== n.kind) continue;
        let { entry: l } = n;
        (0, t4.B)(l.c)
          ? s.push({ mint: l.m, chain_id: l.c })
          : (0, eT.N)({ mint: l.m, chainId: l.c })
            ? t.push({ mint: l.m, chainId: l.c })
            : (0, t4.L)(l.c) || (0, t4._)(l.c) || e.push(l.m);
      }
      ((c = { solanaMints: e, evmCoins: t, nearCoins: s }),
        (g[18] = $),
        (g[19] = c));
    } else c = g[19];
    let { solanaMints: D, evmCoins: O, nearCoins: B } = c;
    ((0, tt.f)(D, b && D.length > 0),
      (0, lE.f)(O, b && O.length > 0),
      (0, lU.f)(B, b && B.length > 0),
      g[20] !== C || g[21] !== A || g[22] !== w
        ? ((m = (e) =>
            (0, n.jsx)(j._, {
              density: C,
              size: 24,
              "data-testid": "watchlist-rail-remove",
              "aria-label": w("web.coin.remove_from_watchlist"),
              onClick: (t) => {
                (t.preventDefault(), t.stopPropagation(), A(e, "default"));
              },
              className: (0, _.c)(E[C], "hover:bg-bg-quaternary"),
              children: (0, n.jsx)(f.G3, { className: "text-text-accent" }),
            })),
          (g[20] = C),
          (g[21] = A),
          (g[22] = w),
          (g[23] = m))
        : (m = g[23]));
    let L = m;
    if (P) {
      let e, t;
      return (
        g[24] !== C
          ? ((e = (0, n.jsx)(u.t, { density: C, bleed: !1 })),
            (g[24] = C),
            (g[25] = e))
          : (e = g[25]),
        g[26] !== v || g[27] !== e
          ? ((t = (0, n.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "watchlist-rail-skeleton",
              className: v,
              children: e,
            })),
            (g[26] = v),
            (g[27] = e),
            (g[28] = t))
          : (t = g[28]),
        t
      );
    }
    if (U) {
      let e, t, s;
      return (
        g[29] !== w
          ? ((e = w("web.market_rail.unable_to_get_coins")),
            (g[29] = w),
            (g[30] = e))
          : (e = g[30]),
        g[31] !== C || g[32] !== e
          ? ((t = (0, n.jsx)(s8.f, { density: C, children: e })),
            (g[31] = C),
            (g[32] = e),
            (g[33] = t))
          : (t = g[33]),
        g[34] !== v || g[35] !== t
          ? ((s = (0, n.jsx)("div", { className: v, children: t })),
            (g[34] = v),
            (g[35] = t),
            (g[36] = s))
          : (s = g[36]),
        s
      );
    }
    return (
      g[37] !== C ||
      g[38] !== M ||
      g[39] !== z ||
      g[40] !== $ ||
      g[41] !== F ||
      g[42] !== w ||
      g[43] !== L
        ? ((h =
            0 === $.length && F > 0
              ? (0, n.jsx)(sV.L, {
                  density: C,
                  children: w("web.screeners.no_coins_match"),
                })
              : 0 === $.length
                ? (0, n.jsx)("div", {
                    "data-testid": "watchlist-rail-empty",
                    className: "contents",
                    children: (0, n.jsx)(sV.L, {
                      density: C,
                      title: w("web.watchlist.empty_title"),
                      children: w("web.market_rail.empty_watchlist"),
                    }),
                  })
                : (0, n.jsx)("div", {
                    role: "list",
                    className: "flex w-full flex-col",
                    "aria-label": w("home.tabs.watchlist"),
                    children: $.map((e, t) =>
                      "perp" === e.kind
                        ? (0, n.jsx)(
                            eZ.f,
                            {
                              market: e.market,
                              density: C,
                              index: t,
                              markStale: "1" === z[t],
                              trailing: L((0, lR.v)(e.market.coin)),
                            },
                            (0, lR.v)(e.market.coin),
                          )
                        : (0, n.jsx)(
                            lF,
                            {
                              entry: e.entry,
                              index: t,
                              isHydrated: M,
                              trailing: L(
                                (0, S.y)({
                                  mint: e.entry.m,
                                  chainId: e.entry.c,
                                }),
                              ),
                            },
                            `${e.entry.c ?? ""}:${e.entry.m}`,
                          ),
                    ),
                  })),
          (g[37] = C),
          (g[38] = M),
          (g[39] = z),
          (g[40] = $),
          (g[41] = F),
          (g[42] = w),
          (g[43] = L),
          (g[44] = h))
        : (h = g[44]),
      g[45] !== v || g[46] !== h
        ? ((x = (0, n.jsx)("div", {
            "data-testid": "watchlist-rail-scroll",
            className: v,
            children: h,
          })),
          (g[45] = v),
          (g[46] = h),
          (g[47] = x))
        : (x = g[47]),
      x
    );
  }
  function lz(e) {
    return "perp" === e.kind;
  }
  var lD = e.i(150430);
  let lO = {
    trending: { icon: s.a, Component: t7 },
    movers: { icon: t.tZ, Component: t7 },
    "global-callouts": {
      icon: t.EX,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a = (0, l.c)(12),
          { column: c } = e,
          { address: m } = (0, o.F)(),
          { t: u } = (0, d.f)(),
          f = c.filters,
          h = (0, tb.l)(),
          x = f?.chains;
        a[0] !== h || a[1] !== x
          ? ((t = (0, t3.G)(x, h)), (a[0] = h), (a[1] = x), (a[2] = t))
          : (t = a[2]);
        let p = t;
        a[3] !== m || a[4] !== p
          ? ((s = { viewerAddress: m, chain: p }),
            (a[3] = m),
            (a[4] = p),
            (a[5] = s))
          : (s = a[5]);
        let g = (0, nA.r)(s);
        return (
          a[6] !== u
            ? ((r = u("web.screeners.list_callouts_global")),
              (a[6] = u),
              (a[7] = r))
            : (r = a[7]),
          a[8] !== c || a[9] !== g || a[10] !== r
            ? ((i = (0, n.jsx)(nC, {
                column: c,
                feed: g,
                surface: "home_feed",
                listAriaLabel: r,
                testIdPrefix: "screeners-global-callouts",
              })),
              (a[8] = c),
              (a[9] = g),
              (a[10] = r),
              (a[11] = i))
            : (i = a[11]),
          i
        );
      },
    },
    "latest-callouts": {
      icon: t.E$,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o = (0, l.c)(14),
          { column: m } = e,
          { t: u } = (0, d.f)(),
          f = m.filters;
        o[0] !== f ? ((t = (0, ts.B)(f)), (o[0] = f), (o[1] = t)) : (t = o[1]);
        let h = t,
          x = (0, tb.l)(),
          p = f?.chains;
        o[2] !== x || o[3] !== p
          ? ((s = (0, t3.G)(p, x)), (o[2] = x), (o[3] = p), (o[4] = s))
          : (s = o[4]);
        let g = s;
        o[5] !== h || o[6] !== g
          ? ((r = { bounds: h, chain: g }), (o[5] = h), (o[6] = g), (o[7] = r))
          : (r = o[7]);
        let b = ((e) => {
          let t,
            s,
            n,
            r,
            i,
            a,
            o,
            d,
            m,
            u,
            f,
            h,
            x,
            p,
            g,
            b,
            v,
            y,
            w,
            j,
            _,
            N,
            k,
            S,
            M,
            C,
            I,
            P,
            U,
            E,
            T,
            A = (0, l.c)(101),
            { enabled: R, chain: F, bounds: $, autoReveal: z } = e,
            D = void 0 === R || R,
            O = void 0 === F ? "all" : F,
            B = void 0 === z || z;
          if (A[0] !== $ || A[1] !== O)
            ((s = JSON.stringify(
              (t = [
                "callouts",
                "home-feed",
                "recent",
                O,
                25,
                $.minCostBasisUsd,
                $.minCalloutMarketCapUsd,
                $.maxCostBasisUsd ?? null,
                $.maxCalloutMarketCapUsd ?? null,
              ]),
            )),
              (A[0] = $),
              (A[1] = O),
              (A[2] = t),
              (A[3] = s));
          else ((t = A[2]), (s = A[3]));
          let L = s;
          (A[4] !== $ || A[5] !== O
            ? ((n = (e) => {
                let { pageParam: t, signal: s } = e;
                return (0, nD.f)({
                  pageSize: 25,
                  chain: O,
                  bounds: $,
                  pageToken: t,
                  signal: s,
                });
              }),
              (A[4] = $),
              (A[5] = O),
              (A[6] = n))
            : (n = A[6]),
            A[7] !== D || A[8] !== t || A[9] !== n
              ? ((r = {
                  queryKey: t,
                  queryFn: n,
                  initialPageParam: void 0,
                  getNextPageParam: nK,
                  staleTime: n$.t,
                  retry: 3,
                  enabled: D,
                  refetchOnWindowFocus: !1,
                }),
                (A[7] = D),
                (A[8] = t),
                (A[9] = n),
                (A[10] = r))
              : (r = A[10]));
          let q = (0, ng.useInfiniteQuery)(r);
          if (A[11] !== q.data?.pages) {
            let e = new Set();
            for (let t of ((i = []), q.data?.pages ?? []))
              for (let s of t.coins ?? []) {
                let t = (0, nO.y)(s);
                !t || e.has(t.key) || (e.add(t.key), i.push(t));
              }
            ((A[11] = q.data?.pages), (A[12] = i));
          } else i = A[12];
          let W = i,
            K = q.data?.pages[0];
          if (A[13] !== K)
            ((a = K?.liveSubjects?.length
              ? K.liveSubjects
              : K?.liveSubject
                ? [K.liveSubject]
                : []),
              (A[13] = K),
              (A[14] = a));
          else a = A[14];
          let H = a;
          A[15] !== L
            ? ((o = { identity: L, since: null, revealRequestedAt: null }),
              (A[15] = L),
              (A[16] = o))
            : (o = A[16]);
          let [V, G] = (0, c.useState)(o);
          A[17] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = {}), (A[17] = d))
            : (d = A[17]);
          let [Q, J] = (0, c.useState)(d),
            [X, Y] = (0, c.useState)(null),
            [Z, ee] = (0, c.useState)(null);
          V.identity !== L
            ? (G({ identity: L, since: null, revealRequestedAt: null }),
              J({}),
              Y(null))
            : K?.headToken && null === V.since && null === V.revealRequestedAt
              ? G({ identity: L, since: K.headToken, revealRequestedAt: null })
              : null !== V.revealRequestedAt &&
                K?.headToken &&
                q.dataUpdatedAt >= V.revealRequestedAt &&
                (G({
                  identity: L,
                  since: K.headToken,
                  revealRequestedAt: null,
                }),
                Y(null));
          let et = V.since;
          A[18] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (e, t) => {
                let s;
                if (
                  !(
                    t &&
                    "object" == typeof t &&
                    1 === t.v &&
                    "head" === t.kind &&
                    Array.isArray(t.head)
                  )
                )
                  return;
                let n = "number" == typeof (s = t.asOf) ? s : Date.parse(s);
                (J((s) => {
                  let l = s[e];
                  return l && Number.isFinite(n) && n <= l.asOfMs
                    ? s
                    : { ...s, [e]: { asOfMs: n, rows: t.head } };
                }),
                  Y(null),
                  ee(Date.now()));
              }),
              (A[18] = m))
            : (m = A[18]);
          let es = m;
          (A[19] !== D || A[20] !== H[0]
            ? ((u = { subject: H[0], enabled: D, onHead: es }),
              (A[19] = D),
              (A[20] = H[0]),
              (A[21] = u))
            : (u = A[21]),
            nW(u),
            A[22] !== D || A[23] !== H[1]
              ? ((f = { subject: H[1], enabled: D, onHead: es }),
                (A[22] = D),
                (A[23] = H[1]),
                (A[24] = f))
              : (f = A[24]),
            nW(f),
            A[25] !== D || A[26] !== H[2]
              ? ((h = { subject: H[2], enabled: D, onHead: es }),
                (A[25] = D),
                (A[26] = H[2]),
                (A[27] = h))
              : (h = A[27]),
            nW(h),
            A[28] !== D || A[29] !== H[3]
              ? ((x = { subject: H[3], enabled: D, onHead: es }),
                (A[28] = D),
                (A[29] = H[3]),
                (A[30] = x))
              : (x = A[30]),
            nW(x),
            A[31] !== D || A[32] !== H[4]
              ? ((p = { subject: H[4], enabled: D, onHead: es }),
                (A[31] = D),
                (A[32] = H[4]),
                (A[33] = p))
              : (p = A[33]),
            nW(p),
            A[34] !== D || A[35] !== H[5]
              ? ((g = { subject: H[5], enabled: D, onHead: es }),
                (A[34] = D),
                (A[35] = H[5]),
                (A[36] = g))
              : (g = A[36]),
            nW(g),
            A[37] !== $ || A[38] !== O || A[39] !== D || A[40] !== et
              ? ((b = async () => {
                  if (D && et)
                    try {
                      let e = await (0, nD.x)({
                        since: et,
                        chain: O,
                        bounds: $,
                      });
                      Y(e.newCount);
                    } catch {}
                }),
                (A[37] = $),
                (A[38] = O),
                (A[39] = D),
                (A[40] = et),
                (A[41] = b))
              : (b = A[41]));
          let en = b,
            { connectionStates: el } = (0, nF.N)(),
            er = el[nR.N.Core] ?? !1,
            ei = (0, c.useRef)(er);
          (A[42] !== er || A[43] !== en
            ? ((v = () => {
                let e = er && !ei.current;
                ((ei.current = er), e && en());
              }),
              (y = [er, en]),
              (A[42] = er),
              (A[43] = en),
              (A[44] = v),
              (A[45] = y))
            : ((v = A[44]), (y = A[45])),
            (0, c.useEffect)(v, y),
            A[46] !== D || A[47] !== en || A[48] !== et
              ? ((w = () => {
                  if (!D || !et) return;
                  let e = setTimeout(() => {
                    en();
                  }, 9e4);
                  return () => clearTimeout(e);
                }),
                (A[46] = D),
                (A[47] = en),
                (A[48] = et),
                (A[49] = w))
              : (w = A[49]),
            A[50] !== D || A[51] !== Z || A[52] !== en || A[53] !== et
              ? ((j = [D, et, Z, en]),
                (A[50] = D),
                (A[51] = Z),
                (A[52] = en),
                (A[53] = et),
                (A[54] = j))
              : (j = A[54]),
            (0, c.useEffect)(w, j),
            A[55] !== W
              ? ((_ = new Set(W.map(nH))), (A[55] = W), (A[56] = _))
              : (_ = A[56]));
          let ea = _;
          e: {
            let e;
            if (!et) {
              let e;
              (A[57] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = []), (A[57] = e))
                : (e = A[57]),
                (N = e));
              break e;
            }
            if (
              A[58] !== $ ||
              A[59] !== ea ||
              A[60] !== H ||
              A[61] !== et ||
              A[62] !== Q
            ) {
              let t = new Set(),
                s = [];
              for (let e of H)
                for (let n of Q[e]?.rows ?? [])
                  !t.has(n.calloutId) &&
                    (t.add(n.calloutId),
                    nL(n.token, et) &&
                      nq(n, $) &&
                      !ea.has(n.calloutId) &&
                      s.push(n));
              ((e = s.sort(nV)),
                (A[58] = $),
                (A[59] = ea),
                (A[60] = H),
                (A[61] = et),
                (A[62] = Q),
                (A[63] = e));
            } else e = A[63];
            N = e;
          }
          let eo = N;
          if (A[64] !== H || A[65] !== Q) {
            let e;
            (A[67] !== Q
              ? ((e = (e) => e in Q), (A[67] = Q), (A[68] = e))
              : (e = A[68]),
              (k = H.some(e)),
              (A[64] = H),
              (A[65] = Q),
              (A[66] = k));
          } else k = A[66];
          let ec = k,
            ed = ec ? eo.length : (X ?? 0);
          A[69] !== eo
            ? ((S = eo.slice(0, n$.I).map(nG)), (A[69] = eo), (A[70] = S))
            : (S = A[70]);
          let em = S,
            { refetch: eu, fetchNextPage: ef, isFetching: eh } = q;
          A[71] !== eu
            ? ((M = () => {
                (G(nQ), eu());
              }),
              (A[71] = eu),
              (A[72] = M))
            : (M = A[72]);
          let ex = M;
          A[73] !== ef
            ? ((C = () => {
                ef();
              }),
              (A[73] = ef),
              (A[74] = C))
            : (C = A[74]);
          let ep = C,
            eg = (0, c.useRef)(null),
            eb = ed > 0;
          A[75] !== ec || A[76] !== H || A[77] !== Q || A[78] !== X
            ? ((I = ec
                ? `head:${H.map((e) => Q[e]?.asOfMs ?? 0).join(",")}`
                : `count:${X ?? 0}`),
              (A[75] = ec),
              (A[76] = H),
              (A[77] = Q),
              (A[78] = X),
              (A[79] = I))
            : (I = A[79]);
          let ev = I;
          (A[80] !== B ||
          A[81] !== D ||
          A[82] !== eb ||
          A[83] !== eh ||
          A[84] !== ev ||
          A[85] !== ex
            ? ((P = () => {
                B &&
                  D &&
                  eb &&
                  !eh &&
                  eg.current !== ev &&
                  ((eg.current = ev), ex());
              }),
              (U = [B, D, eb, eh, ev, ex]),
              (A[80] = B),
              (A[81] = D),
              (A[82] = eb),
              (A[83] = eh),
              (A[84] = ev),
              (A[85] = ex),
              (A[86] = P),
              (A[87] = U))
            : ((P = A[86]), (U = A[87])),
            (0, c.useEffect)(P, U));
          let ey = D && q.isPending,
            ew =
              q.isError && 0 === W.length
                ? "Could not load the latest callouts"
                : null,
            ej = B ? 0 : ed;
          A[88] !== B || A[89] !== em
            ? ((E = B ? [] : em), (A[88] = B), (A[89] = em), (A[90] = E))
            : (E = A[90]);
          let e_ = !!q.hasNextPage;
          return (
            A[91] !== W ||
            A[92] !== ep ||
            A[93] !== q.isFetchingNextPage ||
            A[94] !== ex ||
            A[95] !== ey ||
            A[96] !== ew ||
            A[97] !== ej ||
            A[98] !== E ||
            A[99] !== e_
              ? ((T = {
                  callouts: W,
                  isLoadingHistory: ey,
                  error: ew,
                  pendingNewCount: ej,
                  pendingPreview: E,
                  showNewCallouts: ex,
                  hasNextPage: e_,
                  isFetchingNextPage: q.isFetchingNextPage,
                  fetchNextPage: ep,
                }),
                (A[91] = W),
                (A[92] = ep),
                (A[93] = q.isFetchingNextPage),
                (A[94] = ex),
                (A[95] = ey),
                (A[96] = ew),
                (A[97] = ej),
                (A[98] = E),
                (A[99] = e_),
                (A[100] = T))
              : (T = A[100]),
            T
          );
        })(r);
        return (
          o[8] !== u
            ? ((i = u("web.screeners.list_callouts_latest")),
              (o[8] = u),
              (o[9] = i))
            : (i = o[9]),
          o[10] !== m || o[11] !== b || o[12] !== i
            ? ((a = (0, n.jsx)(nC, {
                column: m,
                feed: b,
                listAriaLabel: i,
                testIdPrefix: "screeners-latest-callouts",
                feedManagesReveal: !0,
              })),
              (o[10] = m),
              (o[11] = b),
              (o[12] = i),
              (o[13] = a))
            : (a = o[13]),
          a
        );
      },
    },
    watchlist: {
      icon: t.G3,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a = (0, l.c)(12),
          { column: m } = e,
          { t: u } = (0, d.f)(),
          { address: f } = (0, o.F)(),
          h = !!f,
          x = (0, tp.useQueryClient)();
        (a[0] !== x
          ? ((t = () => {
              let e = setInterval(() => {
                x.invalidateQueries({ queryKey: ["bookmarkedCoins"] });
              }, 3e4);
              return () => clearInterval(e);
            }),
            (s = [x]),
            (a[0] = x),
            (a[1] = t),
            (a[2] = s))
          : ((t = a[1]), (s = a[2])),
          (0, c.useEffect)(t, s));
        let p = m.filters;
        a[3] !== p
          ? ((r = (e) => (0, ts.E)(e, p)), (a[3] = p), (a[4] = r))
          : (r = a[4]);
        let g = r;
        if (!h) {
          let e, t;
          return (
            a[5] !== u
              ? ((e = u("web.screeners.what_watchlist")),
                (a[5] = u),
                (a[6] = e))
              : (e = a[6]),
            a[7] !== e
              ? ((t = (0, n.jsx)(lr, { what: e })), (a[7] = e), (a[8] = t))
              : (t = a[8]),
            t
          );
        }
        return (
          a[9] !== g || a[10] !== h
            ? ((i = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)(l$, {
                  enabled: h,
                  filterCoin: g,
                  scrollableClassName: eG.b,
                }),
              })),
              (a[9] = g),
              (a[10] = h),
              (a[11] = i))
            : (i = a[11]),
          i
        );
      },
    },
    leaderboard: {
      icon: t.WV,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          m,
          u,
          f,
          h,
          x,
          g,
          b,
          v,
          y,
          w,
          j,
          N = (0, l.c)(62),
          { column: k, onSetBoard: S } = e,
          { t: M } = (0, d.f)(),
          C = (0, p.x)(),
          I = (0, n0.f)();
        N[0] !== k.board
          ? ((t = () => ((0, n4.K)(k.board) ? k.board : n4.p)),
            (N[0] = k.board),
            (N[1] = t))
          : (t = N[1]);
        let [P, U] = (0, c.useState)(t);
        N[2] !== k.board || N[3] !== P || N[4] !== S
          ? ((s = S ? ((0, n4.K)(k.board) ? k.board : n4.p) : P),
            (N[2] = k.board),
            (N[3] = P),
            (N[4] = S),
            (N[5] = s))
          : (s = N[5]);
        let E = s,
          T = "squads" !== E || I ? E : n4.p;
        N[6] !== T || N[7] !== S
          ? ((r = (e) => {
              e !== T && (S ? S(e) : U(e));
            }),
            (N[6] = T),
            (N[7] = S),
            (N[8] = r))
          : (r = N[8]);
        let A = r;
        if (N[9] !== I || N[10] !== M) {
          let e, t;
          (N[12] !== I
            ? ((e = (e) => "squads" !== e || I), (N[12] = I), (N[13] = e))
            : (e = N[13]),
            N[14] !== M
              ? ((t = (e) => ({ value: e, label: M(n4.q[e]) })),
                (N[14] = M),
                (N[15] = t))
              : (t = N[15]),
            (i = n4.z.filter(e).map(t)),
            (N[9] = I),
            (N[10] = M),
            (N[11] = i));
        } else i = N[11];
        let R = i,
          F = n5[T],
          $ = n6[C];
        N[16] !== M
          ? ((a = M("web.screeners.leaderboard_boards_a11y")),
            (N[16] = M),
            (N[17] = a))
          : (a = N[17]);
        let z = a;
        N[18] !== T || N[19] !== C || N[20] !== R || N[21] !== A || N[22] !== z
          ? ((o = (0, n.jsx)(n3.X, {
              density: C,
              value: T,
              onValueChange: A,
              options: R,
              "aria-label": z,
            })),
            (N[18] = T),
            (N[19] = C),
            (N[20] = R),
            (N[21] = A),
            (N[22] = z),
            (N[23] = o))
          : (o = N[23]);
        let D = o;
        N[24] !== T || N[25] !== C || N[26] !== R || N[27] !== A || N[28] !== z
          ? ((m = (0, n.jsx)(n2.f, {
              density: C,
              value: T,
              onChange: A,
              options: R,
              "aria-label": z,
              "data-testid": "screeners-leaderboard-boards-chip",
            })),
            (N[24] = T),
            (N[25] = C),
            (N[26] = R),
            (N[27] = A),
            (N[28] = z),
            (N[29] = m))
          : (m = N[29]);
        let O = m,
          B = eG.m[C],
          L = eV.V[C];
        return (
          N[30] !== $.ownRow || N[31] !== B || N[32] !== L
            ? ((u = (0, _.c)(B, L, $.ownRow)),
              (N[30] = $.ownRow),
              (N[31] = B),
              (N[32] = L),
              (N[33] = u))
            : (u = N[33]),
          N[34] !== D || N[35] !== u
            ? ((f = (0, n.jsx)("div", {
                className: u,
                "data-testid": "screeners-leaderboard-boards-own-row",
                children: D,
              })),
              (N[34] = D),
              (N[35] = u),
              (N[36] = f))
            : (f = N[36]),
          N[37] !== $.inline
            ? ((h = (0, _.c)("shrink-0 items-center", $.inline)),
              (N[37] = $.inline),
              (N[38] = h))
            : (h = N[38]),
          N[39] !== $.chip
            ? ((x = (0, _.c)("items-center", $.chip)),
              (N[39] = $.chip),
              (N[40] = x))
            : (x = N[40]),
          N[41] !== O || N[42] !== x
            ? ((g = (0, n.jsx)("div", {
                className: x,
                "data-testid": "screeners-leaderboard-boards-chip-slot",
                children: O,
              })),
              (N[41] = O),
              (N[42] = x),
              (N[43] = g))
            : (g = N[43]),
          N[44] !== $.segment
            ? ((b = (0, _.c)("items-center", $.segment)),
              (N[44] = $.segment),
              (N[45] = b))
            : (b = N[45]),
          N[46] !== D || N[47] !== b
            ? ((v = (0, n.jsx)("div", {
                className: b,
                "data-testid": "screeners-leaderboard-boards-segment",
                children: D,
              })),
              (N[46] = D),
              (N[47] = b),
              (N[48] = v))
            : (v = N[48]),
          N[49] !== h || N[50] !== g || N[51] !== v
            ? ((y = (0, n.jsxs)("div", {
                className: h,
                "data-testid": "screeners-leaderboard-boards-inline",
                children: [g, v],
              })),
              (N[49] = h),
              (N[50] = g),
              (N[51] = v),
              (N[52] = y))
            : (y = N[52]),
          N[53] !== F || N[54] !== T || N[55] !== k || N[56] !== y
            ? ((w = (0, n.jsx)("div", {
                className: "flex min-h-0 flex-1 flex-col",
                children: (0, n.jsx)(F, { column: k, filterBarLeading: y }, T),
              })),
              (N[53] = F),
              (N[54] = T),
              (N[55] = k),
              (N[56] = y),
              (N[57] = w))
            : (w = N[57]),
          N[58] !== T || N[59] !== f || N[60] !== w
            ? ((j = (0, n.jsxs)("div", {
                className:
                  "@container/leaderboard flex h-full min-h-0 w-full flex-col",
                "data-testid": "screeners-leaderboard",
                "data-board": T,
                children: [f, w],
              })),
              (N[58] = T),
              (N[59] = f),
              (N[60] = w),
              (N[61] = j))
            : (j = N[61]),
          j
        );
      },
    },
    "my-alerts": {
      icon: t.YM,
      Component: function (e) {
        let t,
          s,
          r,
          o,
          m,
          u,
          f,
          h,
          x,
          g,
          b,
          v,
          y,
          w,
          j,
          _,
          N,
          k = (0, l.c)(77),
          { column: S } = e,
          { t: M } = (0, d.f)(),
          { address: C, isLoggedIn: I, viewerFollowing: P } = s7(),
          U = (0, lj.f)("alerts-rail"),
          E = (0, e7.f)(),
          T = "coin-rail" === (0, p.k)() ? "coin-rail" : "deck-column",
          A = (0, p.x)(),
          R = (0, a.k)(i.D.WEB_PERPS, !1),
          F = S.filters?.chains;
        k[0] !== R || k[1] !== F
          ? ((t = (0, ts.O)(F, R)), (k[0] = R), (k[1] = F), (k[2] = t))
          : (t = k[2]);
        let $ = t,
          z = S.filters?.alertKinds,
          D = S.filters?.minTradeUsd,
          O = S.filters?.minMcapUsd,
          B = S.filters?.maxMcapUsd,
          L = z?.length ? z : lm.E,
          q = D ?? nD.O,
          W = O ?? null,
          K = B ?? null;
        (k[3] !== q || k[4] !== W || k[5] !== K
          ? ((s = {
              minTradeAmountUsd: q,
              minMarketCapUsd: W,
              maxMarketCapUsd: K,
            }),
            (k[3] = q),
            (k[4] = W),
            (k[5] = K),
            (k[6] = s))
          : (s = k[6]),
          k[7] !== $ || k[8] !== L || k[9] !== s
            ? ((r = { kinds: L, filters: s, chains: $ }),
              (k[7] = $),
              (k[8] = L),
              (k[9] = s),
              (k[10] = r))
            : (r = k[10]));
        let V = r;
        k[11] !== I ||
        k[12] !== E.paused ||
        k[13] !== V ||
        k[14] !== T ||
        k[15] !== U
          ? ((o = {
              viewer: U,
              enabled: I,
              selection: V,
              paused: E.paused,
              surface: T,
            }),
            (k[11] = I),
            (k[12] = E.paused),
            (k[13] = V),
            (k[14] = T),
            (k[15] = U),
            (k[16] = o))
          : (o = k[16]);
        let G = ((e) => {
            let {
                viewer: t,
                enabled: s = !0,
                pageSize: n = nD.T,
                selection: l,
                filtersStore: r = lm.r,
                paused: i = !1,
                surface: a = "coin-rail",
              } = e,
              o = s && null !== t,
              d = (0, H.f)(r, (e) => (0, lm.y)(e.enabled)),
              m = (0, H.f)(r, (e) => e.filters),
              u = l ? lm.E.filter((e) => l.kinds.includes(e)).join(",") : d,
              f = l ? l.filters : m,
              h = l?.chains,
              x = u.split(",").includes("trade"),
              p = (0, c.useMemo)(() => (0, t3.a)(h, { hype: !x }), [h, x]),
              g = (0, t3.R)(p),
              b = [
                "callouts",
                "alerts-feed-rail",
                t,
                n,
                u,
                f.minTradeAmountUsd,
                f.minMarketCapUsd,
                f.maxMarketCapUsd,
                g,
              ],
              v = (0, c.useCallback)(
                (e, t) =>
                  (0, nD.r)({
                    pageSize: n,
                    kinds: u,
                    minTradeAmountUsd: f.minTradeAmountUsd,
                    minMarketCapUsd: f.minMarketCapUsd,
                    maxMarketCapUsd: f.maxMarketCapUsd,
                    ...p,
                    cursor: e,
                    signal: t,
                  }),
                [n, u, f, p],
              ),
              y = (0, ng.useInfiniteQuery)({
                queryKey: b,
                initialPageParam: void 0,
                queryFn: ({ pageParam: e, signal: t }) => v(e, t),
                getNextPageParam: (e, t, s) => {
                  let n = e.nextCursor ?? null;
                  if (null !== n && n !== s) return n;
                },
                enabled: o,
                staleTime: 6e4,
                retry: 3,
              }),
              w = (0, tp.useQueryClient)(),
              j = `${t ?? ""}|${u}|${f.minTradeAmountUsd}|${f.minMarketCapUsd}|${f.maxMarketCapUsd}|${g}`,
              [_, N] = (0, c.useState)([]),
              k = (0, c.useMemo)(() => {
                let e = new Set(),
                  t = [],
                  s = new Set(),
                  n = 0;
                for (let l of y.data?.pages ?? [])
                  for (let r of l.items) {
                    let l = (0, lc.o)(r);
                    !l ||
                      e.has(l.key) ||
                      (e.add(l.key),
                      t.push(l),
                      "trade" === l.type &&
                        (s.add(l.key), (n = Math.max(n, l.createdAtMs))));
                  }
                let l = _.filter((e) => !s.has(e.key) && e.createdAtMs > n);
                if (0 === l.length) return t;
                let r = [],
                  i = 0,
                  a = 0;
                for (; i < l.length && a < t.length; ) {
                  let e = l[i],
                    s = t[a];
                  if (!e || !s) break;
                  e.createdAtMs >= s.createdAtMs
                    ? (r.push(e), (i += 1))
                    : (r.push(s), (a += 1));
                }
                return (r.push(...l.slice(i), ...t.slice(a)), r);
              }, [y.data, _]);
            (0, la.f)({
              surface: a,
              enabled: o,
              identity: j,
              hasData: void 0 !== y.data,
              itemCount: k.length,
              queryClient: w,
              queryKey: b,
            });
            let [S, M] = (0, c.useState)([]),
              C = (0, c.useCallback)((e) => {
                M((t) => (t.some((t) => t.id === e.id) ? t : [...t, e]));
              }, []),
              I = (0, c.useCallback)((e, { deferred: t = !0 } = {}) => {
                let s = (t) => {
                  let s = new Set(t.map((e) => e.key)),
                    n = [];
                  for (let t of e) s.has(t.key) || (s.add(t.key), n.push(t));
                  return 0 === n.length ? t : [...n, ...t].slice(0, 50);
                };
                t
                  ? (0, c.startTransition)(() => {
                      N(s);
                    })
                  : N(s);
              }, []),
              P = (0, c.useRef)({ identity: j, rows: [] }),
              U = (0, c.useRef)(i);
            (0, c.useLayoutEffect)(() => {
              U.current = i;
            }, [i]);
            let E = (0, c.useCallback)(
              (e) => {
                let t = e.map(lc.o).filter((e) => e?.type === "trade");
                if (0 !== t.length) {
                  if (U.current) {
                    let e = P.current;
                    P.current = {
                      identity: j,
                      rows: [...t, ...(e.identity === j ? e.rows : [])].slice(
                        0,
                        50,
                      ),
                    };
                    return;
                  }
                  I(t);
                }
              },
              [j, I],
            );
            ((0, c.useEffect)(() => {
              if (i) return;
              let e = P.current;
              0 !== e.rows.length &&
                ((P.current = { identity: j, rows: [] }),
                e.identity === j && I(e.rows, { deferred: !1 }));
            }, [i, j, I]),
              (0, lo.f)({
                enabled: o,
                viewer: t,
                queryKey: b,
                kinds: u,
                filters: f,
                surface: a,
                onNewContent: C,
                onTradeItems: E,
              }));
            let [T, A] = (0, c.useState)(j);
            T !== j && (A(j), S.length > 0 && M([]), _.length > 0 && N([]));
            let R = (0, c.useMemo)(
                () =>
                  S.flatMap((e) =>
                    null === e.coinMint
                      ? []
                      : [{ key: `evt:${e.id}`, coinMint: e.coinMint }],
                  ).slice(0, n$.I),
                [S],
              ),
              F = (0, c.useCallback)(
                (e) => {
                  if (0 === S.length) return;
                  let t = e?.trigger ?? "tap",
                    s = Date.now(),
                    n = S.reduce((e, t) => Math.min(e, t.receivedAtMs ?? s), s);
                  M([]);
                  let l = w.getQueryData(b);
                  l &&
                    l.pages.length > 1 &&
                    w.setQueryData(b, {
                      pages: l.pages.slice(0, 1),
                      pageParams: l.pageParams.slice(0, 1),
                    });
                  let r = S.length;
                  w.invalidateQueries({ queryKey: b, exact: !0 }).then(() => {
                    (0, ld.Q)({
                      surface: a,
                      path: "auto" === t ? "auto-revealed" : "tap-revealed",
                      receiptToPaintMs: Date.now() - n,
                      pagesRefetched: 1,
                      count: r,
                    });
                  });
                },
                [S, w, b, a],
              ),
              $ = (0, c.useCallback)(() => {
                y.hasNextPage && !y.isFetchingNextPage && y.fetchNextPage();
              }, [y]);
            return {
              items: k,
              isLoadingHistory: o && y.isPending,
              error:
                y.isError && void 0 === y.data
                  ? "Could not load your alerts feed"
                  : null,
              pendingNewCount: S.length,
              pendingPreview: R,
              showNewCallouts: F,
              hasNextPage: y.hasNextPage ?? !1,
              isFetchingNextPage: y.isFetchingNextPage,
              fetchNextPage: $,
            };
          })(o),
          Q = (0, p.F)(),
          J = Q?.open ?? !1,
          X = Q?.query ?? "",
          Y = Q?.setQuery,
          Z = Q?.setOpen,
          ee = Q?.setAccounts,
          et = S.filters?.excludeUsers,
          es = G.items;
        k[17] !== $ || k[18] !== et || k[19] !== es || k[20] !== X
          ? ((m = lv(
              $?.length ? es.filter((e) => (0, ts.v)((0, lc.D)(e), $)) : es,
              { query: X, excludeUsers: et },
            )),
            (k[17] = $),
            (k[18] = et),
            (k[19] = es),
            (k[20] = X),
            (k[21] = m))
          : (m = k[21]);
        let en = m;
        k[22] !== G || k[23] !== en
          ? ((u = { ...G, items: en }), (k[22] = G), (k[23] = en), (k[24] = u))
          : (u = k[24]);
        let el = u;
        k[25] !== es ? ((f = lw(es)), (k[25] = es), (k[26] = f)) : (f = k[26]);
        let er = f;
        (k[27] !== er || k[28] !== ee
          ? ((h = () => {
              ee?.(er);
            }),
            (x = [ee, er]),
            (k[27] = er),
            (k[28] = ee),
            (k[29] = h),
            (k[30] = x))
          : ((h = k[29]), (x = k[30])),
          (0, c.useEffect)(h, x),
          k[31] !== ee || k[32] !== Z
            ? ((g = () => () => {
                (ee?.([]), Z?.(!1));
              }),
              (b = [ee, Z]),
              (k[31] = ee),
              (k[32] = Z),
              (k[33] = g),
              (k[34] = b))
            : ((g = k[33]), (b = k[34])),
          (0, c.useEffect)(g, b));
        let ei = `${G.items[0]?.key ?? ""}|${G.pendingPreview[0]?.key ?? ""}`;
        (k[35] !== S.sound || k[36] !== ei
          ? ((v = { sound: S.sound, newnessKey: ei }),
            (k[35] = S.sound),
            (k[36] = ei),
            (k[37] = v))
          : (v = k[37]),
          e6(v),
          k[38] !== A ||
          k[39] !== X ||
          k[40] !== J ||
          k[41] !== Z ||
          k[42] !== Y ||
          k[43] !== M
            ? ((y =
                J && Y && Z
                  ? (0, n.jsx)(li.o, {
                      density: A,
                      value: X,
                      onValueChange: Y,
                      label: M("web.screeners.search_traders"),
                      autoFocus: !0,
                      "data-testid": "screeners-my-alerts-search",
                      onKeyDown: (e) => {
                        "Escape" === e.key && (e.preventDefault(), Z(!1));
                      },
                    })
                  : null),
              (k[38] = A),
              (k[39] = X),
              (k[40] = J),
              (k[41] = Z),
              (k[42] = Y),
              (k[43] = M),
              (k[44] = y))
            : (y = k[44]));
        let ea = y;
        k[45] !== ea
          ? ((w = (e) =>
              ea
                ? (0, n.jsxs)("div", {
                    className: "flex h-full min-h-0 w-full flex-col gap-2",
                    children: [
                      ea,
                      (0, n.jsx)("div", {
                        className: "min-h-0 flex-1",
                        children: e,
                      }),
                    ],
                  })
                : e),
            (k[45] = ea),
            (k[46] = w))
          : (w = k[46]);
        let eo = w;
        if (!I) {
          let e, t, s;
          return (
            k[47] !== M
              ? ((e = M("web.screeners.what_alerts")), (k[47] = M), (k[48] = e))
              : (e = k[48]),
            k[49] !== e
              ? ((t = (0, n.jsx)(lr, { what: e })), (k[49] = e), (k[50] = t))
              : (t = k[50]),
            k[51] !== t || k[52] !== eo
              ? ((s = eo(t)), (k[51] = t), (k[52] = eo), (k[53] = s))
              : (s = k[53]),
            s
          );
        }
        if (!G.isLoadingHistory && G.error) {
          let e, t, s;
          return (
            k[54] !== M
              ? ((e = M("web.screeners.error_my_alerts")),
                (k[54] = M),
                (k[55] = e))
              : (e = k[55]),
            k[56] !== A || k[57] !== e
              ? ((t = (0, n.jsx)("div", {
                  className: eG.b,
                  children: (0, n.jsx)(s8.f, { density: A, children: e }),
                })),
                (k[56] = A),
                (k[57] = e),
                (k[58] = t))
              : (t = k[58]),
            k[59] !== t || k[60] !== eo
              ? ((s = eo(t)), (k[59] = t), (k[60] = eo), (k[61] = s))
              : (s = k[61]),
            s
          );
        }
        k[62] !== A || k[63] !== es.length || k[64] !== M || k[65] !== en
          ? ((j =
              es.length > 0 && 0 === en.length
                ? (0, n.jsx)(sV.L, {
                    density: A,
                    title: M("web.screeners.filtered_empty_title"),
                    children: M("web.screeners.filtered_empty_description"),
                  })
                : void 0),
            (k[62] = A),
            (k[63] = es.length),
            (k[64] = M),
            (k[65] = en),
            (k[66] = j))
          : (j = k[66]);
        let ec = j,
          ed = C ?? void 0;
        return (
          k[67] !== ec ||
          k[68] !== I ||
          k[69] !== E ||
          k[70] !== ed ||
          k[71] !== P ||
          k[72] !== el
            ? ((_ = (0, n.jsx)(s2, {
                feed: el,
                pause: E,
                viewerAddress: ed,
                isLoggedIn: I,
                viewerFollowing: P,
                surface: "screeners",
                scrollClassName: eG.b,
                calloutRowClassName: eG.C,
                testIdPrefix: "screeners-my-alerts",
                emptyState: ec,
              })),
              (k[67] = ec),
              (k[68] = I),
              (k[69] = E),
              (k[70] = ed),
              (k[71] = P),
              (k[72] = el),
              (k[73] = _))
            : (_ = k[73]),
          k[74] !== ea || k[75] !== _
            ? ((N = (0, n.jsxs)("div", {
                className: "flex h-full min-h-0 w-full flex-col gap-2",
                children: [ea, _],
              })),
              (k[74] = ea),
              (k[75] = _),
              (k[76] = N))
            : (N = k[76]),
          N
        );
      },
    },
    "your-positions": {
      icon: t.Of,
      Component: function () {
        let e,
          t,
          s,
          r,
          i,
          a,
          m,
          u,
          f,
          h,
          x,
          g,
          b = (0, l.c)(42),
          { t: v } = (0, d.f)(),
          { address: y, user: w } = (0, o.F)(),
          j = (0, p.x)(),
          [_, N] = (0, c.useState)("open"),
          [k, S] = (0, c.useState)("POSITION_SIZE"),
          [M, C] = (0, c.useState)("PNL");
        if (!y) {
          let e, t;
          return (
            b[0] !== v
              ? ((e = v("web.screeners.what_positions")),
                (b[0] = v),
                (b[1] = e))
              : (e = b[1]),
            b[2] !== e
              ? ((t = (0, n.jsx)(lr, { what: e })), (b[2] = e), (b[3] = t))
              : (t = b[3]),
            t
          );
        }
        let I = "closed" === _,
          P = I ? M : k,
          U = I ? C : S;
        (b[4] !== v
          ? ((e = v("profile.positions_card.open_tab")), (b[4] = v), (b[5] = e))
          : (e = b[5]),
          b[6] !== e
            ? ((t = { value: "open", label: e }), (b[6] = e), (b[7] = t))
            : (t = b[7]),
          b[8] !== v
            ? ((s = v("profile.positions_card.closed_tab")),
              (b[8] = v),
              (b[9] = s))
            : (s = b[9]),
          b[10] !== s
            ? ((r = { value: "closed", label: s }), (b[10] = s), (b[11] = r))
            : (r = b[11]),
          b[12] !== t || b[13] !== r
            ? ((i = [t, r]), (b[12] = t), (b[13] = r), (b[14] = i))
            : (i = b[14]));
        let E = i,
          T = eG.m[j],
          A = eV.V[j];
        return (
          b[15] !== T || b[16] !== A
            ? ((a = (0, sd.c)(T, A, "justify-between gap-2")),
              (b[15] = T),
              (b[16] = A),
              (b[17] = a))
            : (a = b[17]),
          b[18] !== _ || b[19] !== j || b[20] !== E
            ? ((m = (0, n.jsx)(eX, {
                density: j,
                active: _,
                tabs: E,
                onSelect: N,
              })),
              (b[18] = _),
              (b[19] = j),
              (b[20] = E),
              (b[21] = m))
            : (m = b[21]),
          b[22] !== _ || b[23] !== j || b[24] !== U || b[25] !== P
            ? ((u = (0, n.jsx)(lD.ProfilePositionsSortSelect, {
                filter: _,
                value: P,
                onChange: U,
                density: j,
                align: "end",
              })),
              (b[22] = _),
              (b[23] = j),
              (b[24] = U),
              (b[25] = P),
              (b[26] = u))
            : (u = b[26]),
          b[27] !== a || b[28] !== m || b[29] !== u
            ? ((f = (0, n.jsxs)("div", {
                "data-testid": "board-filter-bar",
                className: a,
                children: [m, u],
              })),
              (b[27] = a),
              (b[28] = m),
              (b[29] = u),
              (b[30] = f))
            : (f = b[30]),
          b[31] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, sd.c)(
                eG.b,
                "[--position-row-pad:var(--screeners-pad,1rem)]",
              )),
              (b[31] = h))
            : (h = b[31]),
          b[32] !== y ||
          b[33] !== _ ||
          b[34] !== j ||
          b[35] !== U ||
          b[36] !== P ||
          b[37] !== w
            ? ((x = (0, n.jsx)("div", {
                className: h,
                "data-testid": "screeners-your-positions-scroll",
                children: (0, n.jsx)(
                  lD.ProfilePositionsCallouts,
                  {
                    address: y,
                    user: w,
                    isOwner: !0,
                    filter: _,
                    sortBy: P,
                    onSortByChange: U,
                    viewMode: "compressed",
                    rowAppearance: "list",
                    density: j,
                    hideShare: !0,
                  },
                  _,
                ),
              })),
              (b[32] = y),
              (b[33] = _),
              (b[34] = j),
              (b[35] = U),
              (b[36] = P),
              (b[37] = w),
              (b[38] = x))
            : (x = b[38]),
          b[39] !== f || b[40] !== x
            ? ((g = (0, n.jsxs)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                "data-testid": "screeners-your-positions",
                children: [f, x],
              })),
              (b[39] = f),
              (b[40] = x),
              (b[41] = g))
            : (g = b[41]),
          g
        );
      },
    },
    "user-callouts": {
      icon: t.UY,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          c,
          m,
          u,
          f,
          h,
          x = (0, l.c)(35),
          { column: p } = e,
          { t: g } = (0, d.f)(),
          b = p.params?.user;
        x[0] !== b ? ((t = { userId: b }), (x[0] = b), (x[1] = t)) : (t = x[1]);
        let {
            callouts: v,
            isLoading: y,
            isError: w,
            hasNextPage: j,
            isFetchingNextPage: _,
            fetchNextPage: N,
          } = (0, l_.f)(t),
          k = !!b,
          S = b ?? null;
        x[2] !== S
          ? ((s = ["screeners", "user-callouts-head", S]),
            (x[2] = S),
            (x[3] = s))
          : (s = x[3]);
        let M = s;
        (x[4] !== b
          ? ((r = (e) => {
              let { signal: t } = e;
              if (!b) throw Error("userId is required");
              return (0, nD.H)({ userId: b, signal: t });
            }),
            (x[4] = b),
            (x[5] = r))
          : (r = x[5]),
          x[6] !== k || x[7] !== M || x[8] !== r
            ? ((i = {
                enabled: k,
                queryKey: M,
                queryFn: r,
                refetchInterval: 15e3,
                refetchIntervalInBackground: !1,
                staleTime: 0,
              }),
              (x[6] = k),
              (x[7] = M),
              (x[8] = r),
              (x[9] = i))
            : (i = x[9]));
        let C = (0, tx.useQuery)(i);
        if (x[10] !== v || x[11] !== C.data?.callouts) {
          var I;
          let e;
          ((a = ((I = [...(C.data?.callouts ?? []), ...v]),
          (e = new Set()),
          I.filter((t) => !e.has(t.calloutId) && (e.add(t.calloutId), !0))).map(
            n9.f,
          )),
            (x[10] = v),
            (x[11] = C.data?.callouts),
            (x[12] = a));
        } else a = x[12];
        let P = a,
          U = P[0]?.key ?? "";
        return (
          x[13] !== p.sound || x[14] !== U
            ? ((o = { sound: p.sound, newnessKey: U }),
              (x[13] = p.sound),
              (x[14] = U),
              (x[15] = o))
            : (o = x[15]),
          e6(o),
          x[16] !== g
            ? ((c = g("web.screeners.empty_user_callouts")),
              (x[16] = g),
              (x[17] = c))
            : (c = x[17]),
          x[18] !== g
            ? ((m = g("web.screeners.error_user_callouts")),
              (x[18] = g),
              (x[19] = m))
            : (m = x[19]),
          x[20] !== g
            ? ((u = g("web.screeners.list_callouts_user")),
              (x[20] = g),
              (x[21] = u))
            : (u = x[21]),
          x[22] !== N
            ? ((f = () => void N()), (x[22] = N), (x[23] = f))
            : (f = x[23]),
          x[24] !== p.filters ||
          x[25] !== P ||
          x[26] !== j ||
          x[27] !== w ||
          x[28] !== _ ||
          x[29] !== y ||
          x[30] !== c ||
          x[31] !== m ||
          x[32] !== u ||
          x[33] !== f
            ? ((h = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)(nd, {
                  entries: P,
                  isLoading: y,
                  isError: w,
                  emptyText: c,
                  errorText: m,
                  listAriaLabel: u,
                  hasNextPage: j,
                  isFetchingNextPage: _,
                  fetchNextPage: f,
                  scrollBoxTestId: "screeners-user-callouts-scroll",
                  filters: p.filters,
                }),
              })),
              (x[24] = p.filters),
              (x[25] = P),
              (x[26] = j),
              (x[27] = w),
              (x[28] = _),
              (x[29] = y),
              (x[30] = c),
              (x[31] = m),
              (x[32] = u),
              (x[33] = f),
              (x[34] = h))
            : (h = x[34]),
          h
        );
      },
    },
    "list-callouts": {
      icon: t.cb,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          c,
          m,
          u,
          f,
          h,
          x,
          p = (0, l.c)(36),
          { column: g } = e,
          b = g.params?.list,
          { t: v } = (0, d.f)();
        p[0] !== b
          ? ((t = (e) => e.lists.find((e) => e.id === b)),
            (p[0] = b),
            (p[1] = t))
          : (t = p[1]);
        let y = (0, n8.V)(t);
        p[2] !== y?.members
          ? ((s = y?.members ?? []), (p[2] = y?.members), (p[3] = s))
          : (s = p[3]);
        let w = s,
          j = y?.kind ?? "users";
        if (p[4] !== j || p[5] !== w) {
          let e;
          (p[7] !== j
            ? ((e = (e) => ({
                queryKey: ["screeners", "list-callouts", j, e],
                queryFn: async (t) => {
                  let { signal: s } = t;
                  if ("coins" === j) return (0, nf.J)({ mint: e, signal: s });
                  let { callouts: n } = await (0, nD.H)({
                    userId: e,
                    limit: 30,
                    signal: s,
                  });
                  return n.map(n9.f);
                },
                refetchInterval: 2e4,
                refetchIntervalInBackground: !1,
                staleTime: 0,
              })),
              (p[7] = j),
              (p[8] = e))
            : (e = p[8]),
            (r = w.map(e)),
            (p[4] = j),
            (p[5] = w),
            (p[6] = r));
        } else r = p[6];
        p[9] !== r
          ? ((i = { queries: r }), (p[9] = r), (p[10] = i))
          : (i = p[10]);
        let _ = (0, n7.f)(i);
        if (p[11] !== _) {
          let e = _.flatMap(ll);
          e.sort(ln);
          let t = new Set();
          ((a = e
            .filter((e) => !t.has(e.key) && (t.add(e.key), !0))
            .slice(0, 100)),
            (p[11] = _),
            (p[12] = a));
        } else a = p[12];
        let N = a,
          k = N[0]?.key ?? "";
        (p[13] !== g.sound || p[14] !== k
          ? ((o = { sound: g.sound, newnessKey: k }),
            (p[13] = g.sound),
            (p[14] = k),
            (p[15] = o))
          : (o = p[15]),
          e6(o),
          p[16] !== _
            ? ((c = _.some(ls)), (p[16] = _), (p[17] = c))
            : (c = p[17]));
        let S = c;
        p[18] !== _
          ? ((m = _.length > 0 && _.every(lt)), (p[18] = _), (p[19] = m))
          : (m = p[19]);
        let M = m;
        p[20] !== y || p[21] !== w.length || p[22] !== v
          ? ((u = v(
              y
                ? 0 === w.length
                  ? "web.screeners.list_no_members"
                  : "web.screeners.empty_list_feed"
                : "web.screeners.list_deleted",
            )),
            (p[20] = y),
            (p[21] = w.length),
            (p[22] = v),
            (p[23] = u))
          : (u = p[23]);
        let C = u,
          I = w.length > 0 && !S && !M;
        return (
          p[24] !== v
            ? ((f = v("web.screeners.error_list_feed")),
              (p[24] = v),
              (p[25] = f))
            : (f = p[25]),
          p[26] !== v
            ? ((h = v("web.screeners.list_feed_aria")),
              (p[26] = v),
              (p[27] = h))
            : (h = p[27]),
          p[28] !== M ||
          p[29] !== g.filters ||
          p[30] !== C ||
          p[31] !== N ||
          p[32] !== I ||
          p[33] !== f ||
          p[34] !== h
            ? ((x = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)(nd, {
                  entries: N,
                  isLoading: I,
                  isError: M,
                  emptyText: C,
                  errorText: f,
                  listAriaLabel: h,
                  hasNextPage: !1,
                  isFetchingNextPage: !1,
                  fetchNextPage: le,
                  scrollBoxTestId: "screeners-list-callouts-scroll",
                  filters: g.filters,
                }),
              })),
              (p[28] = M),
              (p[29] = g.filters),
              (p[30] = C),
              (p[31] = N),
              (p[32] = I),
              (p[33] = f),
              (p[34] = h),
              (p[35] = x))
            : (x = p[35]),
          x
        );
      },
    },
    "user-trades": {
      icon: t.$9,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          u,
          f,
          h,
          x,
          g,
          b,
          v,
          y,
          w,
          j,
          N,
          k,
          S,
          M,
          C,
          I,
          P,
          U,
          E = (0, l.c)(78),
          { column: T } = e,
          A = T.params?.user ?? "",
          { t: R } = (0, d.f)();
        E[0] !== A
          ? ((t = { walletAddress: A }), (E[0] = A), (E[1] = t))
          : (t = E[1]);
        let F = (function (e) {
            let t,
              s,
              n,
              r = (0, l.c)(12),
              { walletAddress: i, dustFilter: a, includeEvm: o } = e,
              c = void 0 === a || a,
              d = void 0 === o || o,
              m = !!i;
            r[0] !== c || r[1] !== d || r[2] !== i
              ? ((t = ["users", "history", i, c, d]),
                (r[0] = c),
                (r[1] = d),
                (r[2] = i),
                (r[3] = t))
              : (t = r[3]);
            let u = t;
            return (
              r[4] !== c || r[5] !== d || r[6] !== i
                ? ((s = (e) => {
                    let { pageParam: t } = e;
                    return (0, lN.f)({
                      walletAddress: i,
                      cursor: t,
                      dustFilter: c,
                      includeEvm: d,
                    });
                  }),
                  (r[4] = c),
                  (r[5] = d),
                  (r[6] = i),
                  (r[7] = s))
                : (s = r[7]),
              r[8] !== m || r[9] !== u || r[10] !== s
                ? ((n = {
                    enabled: m,
                    queryKey: u,
                    initialPageParam: void 0,
                    queryFn: s,
                    getNextPageParam: lk,
                    staleTime: 12e4,
                  }),
                  (r[8] = m),
                  (r[9] = u),
                  (r[10] = s),
                  (r[11] = n))
                : (n = r[11]),
              (0, ng.useInfiniteQuery)(n)
            );
          })(t),
          $ = !!A;
        E[2] !== A
          ? ((s = ["screeners", "user-trades-head", A]), (E[2] = A), (E[3] = s))
          : (s = E[3]);
        let z = s;
        (E[4] !== A
          ? ((r = (e) => {
              let { signal: t } = e;
              return (0, lN.f)({
                walletAddress: A,
                fetchOptions: { signal: t },
              });
            }),
            (E[4] = A),
            (E[5] = r))
          : (r = E[5]),
          E[6] !== $ || E[7] !== z || E[8] !== r
            ? ((i = {
                enabled: $,
                queryKey: z,
                queryFn: r,
                refetchInterval: 15e3,
                refetchIntervalInBackground: !1,
                staleTime: 0,
              }),
              (E[6] = $),
              (E[7] = z),
              (E[8] = r),
              (E[9] = i))
            : (i = E[9]));
        let D = (0, tx.useQuery)(i);
        E[10] !== A
          ? ((a = { userAddresses: A ? [A] : [] }), (E[10] = A), (E[11] = a))
          : (a = E[11]);
        let { data: O } = (0, sQ.f)(a);
        E[12] !== O
          ? ((o = void 0 === O ? [] : O), (E[12] = O), (E[13] = o))
          : (o = E[13]);
        let B = o;
        if (E[14] !== B || E[15] !== A) {
          let e;
          (E[17] !== A
            ? ((e = (e) => e?.address?.toLowerCase() === A.toLowerCase()),
              (E[17] = A),
              (E[18] = e))
            : (e = E[18]),
            (u = B.find(e)),
            (E[14] = B),
            (E[15] = A),
            (E[16] = u));
        } else u = E[16];
        let L = u,
          q = L?.username ?? null,
          W = L?.profile_image ?? null,
          K = A || null,
          H = L?.x_username ?? null;
        E[19] !== q || E[20] !== W || E[21] !== K || E[22] !== H
          ? ((f = { name: q, avatarUrl: W, address: K, xUsername: H }),
            (E[19] = q),
            (E[20] = W),
            (E[21] = K),
            (E[22] = H),
            (E[23] = f))
          : (f = E[23]);
        let V = f;
        if (
          E[24] !== V ||
          E[25] !== D.data?.transactions ||
          E[26] !== F.data?.pages
        ) {
          let e = [
              ...(D.data?.transactions ?? []),
              ...(F.data?.pages.flatMap(lM) ?? []),
            ],
            t = new Set();
          for (let s of ((h = []), e)) {
            if (!sE(s)) continue;
            let e = sT({ txn: s, author: V });
            t.has(e.key) || (t.add(e.key), h.push(e));
          }
          ((E[24] = V),
            (E[25] = D.data?.transactions),
            (E[26] = F.data?.pages),
            (E[27] = h));
        } else h = E[27];
        let G = h,
          Q = (0, c.useRef)(null),
          { paused: J, targetProps: X } = (0, e7.f)(),
          Y = T.filters;
        E[28] !== Y || E[29] !== G
          ? ((x = G.filter((e) => (0, ts.t)(e.trade, Y))),
            (E[28] = Y),
            (E[29] = G),
            (E[30] = x))
          : (x = E[30]);
        let Z = x;
        E[31] !== J || E[32] !== Z
          ? ((g = { items: Z, paused: J, keyOf: nl }),
            (E[31] = J),
            (E[32] = Z),
            (E[33] = g))
          : (g = E[33]);
        let { items: ee } = nr(g),
          et = Z[0]?.key ?? "";
        (E[34] !== T.sound || E[35] !== et
          ? ((b = { sound: T.sound, newnessKey: et }),
            (E[34] = T.sound),
            (E[35] = et),
            (E[36] = b))
          : (b = E[36]),
          e6(b),
          E[37] !== ee
            ? ((v = ee.map(lS)), (E[37] = ee), (E[38] = v))
            : (v = E[38]));
        let es = (0, th.C)(v),
          en = (0, p.x)();
        if (F.isPending) {
          let e;
          return (
            E[39] !== en
              ? ((e = (0, n.jsx)("div", {
                  className: "relative flex h-full min-h-0 w-full flex-col",
                  children: (0, n.jsx)("div", {
                    "aria-hidden": !0,
                    "data-testid": "screeners-user-trades-skeleton",
                    className: eG.b,
                    children: (0, n.jsx)(sK, { density: en, bleed: !1 }),
                  }),
                })),
                (E[39] = en),
                (E[40] = e))
              : (e = E[40]),
            e
          );
        }
        if (F.isError && 0 === G.length) {
          let e, t;
          return (
            E[41] !== R
              ? ((e = R("web.screeners.error_user_trades")),
                (E[41] = R),
                (E[42] = e))
              : (e = E[42]),
            E[43] !== e
              ? ((t = (0, n.jsx)("div", {
                  className: "relative flex h-full min-h-0 w-full flex-col",
                  children: (0, n.jsx)("div", {
                    className: eG.b,
                    children: (0, n.jsx)(nt, { variant: "error", children: e }),
                  }),
                })),
                (E[43] = e),
                (E[44] = t))
              : (t = E[44]),
            t
          );
        }
        if (
          (E[45] !== J
            ? ((y = (0, n.jsx)(e_.q, { paused: J })), (E[45] = J), (E[46] = y))
            : (y = E[46]),
          E[47] !== G.length || E[48] !== R || E[49] !== Z.length
            ? ((w =
                0 === G.length
                  ? (0, n.jsx)(nt, {
                      children: R("web.screeners.empty_user_trades"),
                    })
                  : 0 === Z.length
                    ? (0, n.jsx)(nt, {
                        children: R("web.screeners.no_trades_match"),
                      })
                    : null),
              (E[47] = G.length),
              (E[48] = R),
              (E[49] = Z.length),
              (E[50] = w))
            : (w = E[50]),
          E[51] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = (0, _.c)("flex w-full flex-col", eG.c)), (E[51] = j))
            : (j = E[51]),
          E[52] !== R
            ? ((N = R("web.screeners.list_trades_user")),
              (E[52] = R),
              (E[53] = N))
            : (N = E[53]),
          E[54] !== es || E[55] !== ee)
        ) {
          let e;
          (E[57] !== es
            ? ((e = (e) =>
                (0, n.jsx)(
                  "li",
                  {
                    className: es.has(e.key) ? th.l : void 0,
                    children: (0, n.jsx)(sW, { item: e }),
                  },
                  e.key,
                )),
              (E[57] = es),
              (E[58] = e))
            : (e = E[58]),
            (k = ee.map(e)),
            (E[54] = es),
            (E[55] = ee),
            (E[56] = k));
        } else k = E[56];
        E[59] !== N || E[60] !== k
          ? ((S = (0, n.jsx)("ul", {
              className: j,
              "aria-label": N,
              children: k,
            })),
            (E[59] = N),
            (E[60] = k),
            (E[61] = S))
          : (S = E[61]);
        let el = !!F.hasNextPage,
          er = F.isFetchingNextPage;
        E[62] !== F
          ? ((M = () => void F.fetchNextPage()), (E[62] = F), (E[63] = M))
          : (M = E[63]);
        let ei = !!F.hasNextPage && ee.length > 0;
        return (
          E[64] === Symbol.for("react.memo_cache_sentinel")
            ? ((C = (0, eE.G)("Show more trades")), (E[64] = C))
            : (C = E[64]),
          E[65] !== F.isFetchingNextPage ||
          E[66] !== el ||
          E[67] !== M ||
          E[68] !== ei
            ? ((I = (0, n.jsx)(m.f, {
                hasNextPage: el,
                isFetchingNextPage: er,
                onFetchNextPage: M,
                autoLoad: !0,
                autoLoadHasMore: ei,
                scrollRootRef: Q,
                rootMargin: "200px 0px",
                label: C,
              })),
              (E[65] = F.isFetchingNextPage),
              (E[66] = el),
              (E[67] = M),
              (E[68] = ei),
              (E[69] = I))
            : (I = E[69]),
          E[70] !== X || E[71] !== w || E[72] !== S || E[73] !== I
            ? ((P = (0, n.jsxs)("div", {
                ref: Q,
                ...X,
                "data-testid": "screeners-user-trades-scroll",
                className: eG.b,
                children: [w, S, I],
              })),
              (E[70] = X),
              (E[71] = w),
              (E[72] = S),
              (E[73] = I),
              (E[74] = P))
            : (P = E[74]),
          E[75] !== y || E[76] !== P
            ? ((U = (0, n.jsxs)("div", {
                className: "relative flex h-full min-h-0 w-full flex-col",
                children: [y, P],
              })),
              (E[75] = y),
              (E[76] = P),
              (E[77] = U))
            : (U = E[77]),
          U
        );
      },
    },
    "coin-trades": {
      icon: t.lm,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          u,
          f,
          h,
          x,
          g,
          b,
          v,
          y,
          w,
          j,
          N,
          k,
          S = (0, l.c)(64),
          { column: M } = e,
          C = M.params?.mint,
          { t: I } = (0, d.f)();
        S[0] !== C ? ((t = C ? [C] : []), (S[0] = C), (S[1] = t)) : (t = S[1]);
        let P = t,
          U = 0 === P.length;
        S[2] !== P || S[3] !== U
          ? ((s = {
              mints: P,
              disabled: U,
              refetchInterval: 3e4,
              refetchIntervalInBackground: !1,
            }),
            (S[2] = P),
            (S[3] = U),
            (S[4] = s))
          : (s = S[4]);
        let { coins: E } = (0, nn.f)(s);
        if (S[5] !== E || S[6] !== C) {
          let e;
          (S[8] !== C
            ? ((e = (e) => e?.mint === C), (S[8] = C), (S[9] = e))
            : (e = S[9]),
            (r = E.find(e)),
            (S[5] = E),
            (S[6] = C),
            (S[7] = r));
        } else r = S[7];
        let T = r,
          A = !!C;
        S[10] !== T || S[11] !== C || S[12] !== A
          ? ((i = { mint: C, coin: T, enabled: A }),
            (S[10] = T),
            (S[11] = C),
            (S[12] = A),
            (S[13] = i))
          : (i = S[13]);
        let {
            items: R,
            isLoading: F,
            isError: $,
            hasNextPage: z,
            isFetchingNextPage: D,
            fetchNextPage: O,
          } = (function (e) {
            let t,
              s,
              n,
              r,
              i,
              a,
              o,
              d,
              m,
              u,
              f,
              h,
              x,
              p,
              g,
              b,
              v,
              y,
              w = (0, l.c)(53),
              { mint: j, coin: _, enabled: N } = e;
            if (w[0] !== _ || w[1] !== j)
              ((t = (0, eT.N)({ mint: j, chainId: _?.chain_id })
                ? (0, ny.f)(_?.chain_id)
                : np.SOLANA_CHAIN_ID),
                (w[0] = _),
                (w[1] = j),
                (w[2] = t));
            else t = w[2];
            let k = t,
              S = N && !!j && !!k,
              M = N && !!j && void 0 !== _ && !k,
              C = j ?? null;
            w[3] !== k || w[4] !== C
              ? ((s = ["screeners", "coin-trades", C, k]),
                (w[3] = k),
                (w[4] = C),
                (w[5] = s))
              : (s = w[5]);
            let I = s;
            (w[6] !== k || w[7] !== j
              ? ((n = (e) => {
                  let { pageParam: t, signal: s } = e;
                  if (!j || !k) throw Error("mint and chain are required");
                  return nj({ mint: j, chainId: k, cursor: t, signal: s });
                }),
                (w[6] = k),
                (w[7] = j),
                (w[8] = n))
              : (n = w[8]),
              w[9] !== S || w[10] !== I || w[11] !== n
                ? ((r = {
                    enabled: S,
                    queryKey: I,
                    queryFn: n,
                    initialPageParam: void 0,
                    getNextPageParam: nk,
                    staleTime: 15e3,
                    refetchOnWindowFocus: !1,
                    select: n_,
                  }),
                  (w[9] = S),
                  (w[10] = I),
                  (w[11] = n),
                  (w[12] = r))
                : (r = w[12]));
            let P = (0, ng.useInfiniteQuery)(r),
              U = j ?? null;
            w[13] !== k || w[14] !== U
              ? ((i = ["screeners", "coin-trades-head", U, k]),
                (w[13] = k),
                (w[14] = U),
                (w[15] = i))
              : (i = w[15]);
            let E = i;
            (w[16] !== k || w[17] !== j
              ? ((a = (e) => {
                  let { signal: t } = e;
                  if (!j || !k) throw Error("mint and chain are required");
                  return nj({ mint: j, chainId: k, cursor: void 0, signal: t });
                }),
                (w[16] = k),
                (w[17] = j),
                (w[18] = a))
              : (a = w[18]),
              w[19] !== S || w[20] !== E || w[21] !== a
                ? ((o = {
                    enabled: S,
                    queryKey: E,
                    queryFn: a,
                    refetchInterval: 1e4,
                    refetchIntervalInBackground: !1,
                    staleTime: 0,
                  }),
                  (w[19] = S),
                  (w[20] = E),
                  (w[21] = a),
                  (w[22] = o))
                : (o = w[22]));
            let T = (0, tx.useQuery)(o),
              A = T.data?.trades;
            w[23] === Symbol.for("react.memo_cache_sentinel")
              ? ((d = []), (w[23] = d))
              : (d = w[23]);
            let [R, F] = (0, c.useState)(d);
            w[24] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = []), (w[24] = m))
              : (m = w[24]);
            let $ = (0, c.useRef)(m);
            w[25] === Symbol.for("react.memo_cache_sentinel")
              ? ((u = (e) => {
                  $.current.push(e);
                }),
                (w[25] = u))
              : (u = w[25]);
            let z = u,
              D = j ?? "",
              O = N && !!j;
            (w[26] !== D || w[27] !== O
              ? ((f = { mint: D, onTrade: z, isEnabled: O }),
                (w[26] = D),
                (w[27] = O),
                (w[28] = f))
              : (f = w[28]),
              (0, nb.f)(f),
              w[29] !== N
                ? ((h = () => {
                    if (!N) return;
                    let e = setInterval(() => {
                      if (0 === $.current.length) return;
                      let e = $.current;
                      (($.current = []),
                        (0, c.startTransition)(() => {
                          F((t) => {
                            let s = nw(e, new Set(t.map(sU)));
                            return 0 === s.length
                              ? t
                              : [...s.reverse(), ...t].slice(0, 50);
                          });
                        }));
                    }, 1e3);
                    return () => clearInterval(e);
                  }),
                  (x = [N]),
                  (w[29] = N),
                  (w[30] = h),
                  (w[31] = x))
                : ((h = w[30]), (x = w[31])),
              (0, c.useEffect)(h, x));
            let B = (0, c.useRef)(j);
            (w[32] !== j
              ? ((p = () => {
                  B.current !== j && ((B.current = j), ($.current = []), F([]));
                }),
                (g = [j]),
                (w[32] = j),
                (w[33] = p),
                (w[34] = g))
              : ((p = w[33]), (g = w[34])),
              (0, c.useEffect)(p, g));
            e: {
              let e;
              if (!j) {
                let e;
                (w[35] === Symbol.for("react.memo_cache_sentinel")
                  ? ((e = []), (w[35] = e))
                  : (e = w[35]),
                  (b = e));
                break e;
              }
              if (
                w[36] !== _ ||
                w[37] !== A ||
                w[38] !== R ||
                w[39] !== j ||
                w[40] !== P.data
              ) {
                let t,
                  s = {
                    mint: j,
                    chainId: (t = (0, tb.T)(_?.chain_id))
                      ? 0
                      : (sC((0, eT.w)(_?.chain_id) ?? _?.chain_id) ?? sM.S),
                    ...(t ? { chain: t } : {}),
                    name: _?.name ?? null,
                    symbol: _?.symbol ?? null,
                    image: _?.image_uri ?? null,
                    program: _?.program,
                    platform: _?.platform,
                    protocol: _?.protocol,
                  },
                  n = new Set(),
                  l = nw(P.data ?? [], n),
                  r = nw(A ?? [], n);
                ((e = [...nw(R, n), ...r, ...l].map((e) =>
                  (({ trade: e, coin: t }) => {
                    let s = sI(e.timestamp);
                    return {
                      type: "trade",
                      key: `tx:${sU(e)}`,
                      createdAtMs: s,
                      trade: {
                        tx: e.tx,
                        isBuy: "buy" === e.type,
                        timestamp: sP(s),
                        amountUsd: sC(e.amountUsd),
                        baseAmount: sC(e.baseAmount),
                        priceUsd: sC(e.priceUsd),
                        fillMarketCapUsd: null,
                        groupId: null,
                      },
                      author: {
                        name: null,
                        avatarUrl: null,
                        address: e.userAddress || null,
                        xUsername: null,
                      },
                      coin: t,
                    };
                  })({ trade: e, coin: s }),
                )),
                  (w[36] = _),
                  (w[37] = A),
                  (w[38] = R),
                  (w[39] = j),
                  (w[40] = P.data),
                  (w[41] = e));
              } else e = w[41];
              b = e;
            }
            let L = b,
              { hasNextPage: q, isFetchingNextPage: W, fetchNextPage: K } = P;
            w[42] !== q || w[43] !== W || w[44] !== K
              ? ((v = () => {
                  q && !W && K();
                }),
                (w[42] = q),
                (w[43] = W),
                (w[44] = K),
                (w[45] = v))
              : (v = w[45]);
            let H = v,
              V = S && P.isPending,
              G = M || (P.isError && 0 === L.length),
              Q = !!q;
            return (
              w[46] !== H ||
              w[47] !== W ||
              w[48] !== L ||
              w[49] !== V ||
              w[50] !== G ||
              w[51] !== Q
                ? ((y = {
                    items: L,
                    isLoading: V,
                    isError: G,
                    hasNextPage: Q,
                    isFetchingNextPage: W,
                    fetchNextPage: H,
                  }),
                  (w[46] = H),
                  (w[47] = W),
                  (w[48] = L),
                  (w[49] = V),
                  (w[50] = G),
                  (w[51] = Q),
                  (w[52] = y))
                : (y = w[52]),
              y
            );
          })(i),
          B = (0, c.useRef)(null),
          { paused: L, targetProps: q } = (0, e7.f)(),
          W = M.filters;
        if (S[14] !== W || S[15] !== R) {
          let e;
          (S[17] !== W
            ? ((e = (e) => (0, ts.t)(e.trade, W)), (S[17] = W), (S[18] = e))
            : (e = S[18]),
            (a = R.filter(e)),
            (S[14] = W),
            (S[15] = R),
            (S[16] = a));
        } else a = S[16];
        let K = a;
        S[19] !== L || S[20] !== K
          ? ((o = { items: K, paused: L, keyOf: nl }),
            (S[19] = L),
            (S[20] = K),
            (S[21] = o))
          : (o = S[21]);
        let { items: H } = nr(o),
          V = K[0]?.key ?? "";
        (S[22] !== M.sound || S[23] !== V
          ? ((u = { sound: M.sound, newnessKey: V }),
            (S[22] = M.sound),
            (S[23] = V),
            (S[24] = u))
          : (u = S[24]),
          e6(u),
          S[25] !== H
            ? ((f = H.map(nS)), (S[25] = H), (S[26] = f))
            : (f = S[26]));
        let G = (0, th.C)(f),
          Q = (0, p.x)();
        if (F && 0 === R.length) {
          let e;
          return (
            S[27] !== Q
              ? ((e = (0, n.jsx)("div", {
                  className: "relative flex h-full min-h-0 w-full flex-col",
                  children: (0, n.jsx)("div", {
                    "aria-hidden": !0,
                    "data-testid": "screeners-coin-trades-skeleton",
                    className: eG.b,
                    children: (0, n.jsx)(sK, { density: Q, bleed: !1 }),
                  }),
                })),
                (S[27] = Q),
                (S[28] = e))
              : (e = S[28]),
            e
          );
        }
        if ($) {
          let e, t;
          return (
            S[29] !== I
              ? ((e = I("web.screeners.error_coin_trades")),
                (S[29] = I),
                (S[30] = e))
              : (e = S[30]),
            S[31] !== e
              ? ((t = (0, n.jsx)("div", {
                  className: "relative flex h-full min-h-0 w-full flex-col",
                  children: (0, n.jsx)("div", {
                    className: eG.b,
                    children: (0, n.jsx)(nt, { variant: "error", children: e }),
                  }),
                })),
                (S[31] = e),
                (S[32] = t))
              : (t = S[32]),
            t
          );
        }
        if (
          (S[33] !== L
            ? ((h = (0, n.jsx)(e_.q, { paused: L })), (S[33] = L), (S[34] = h))
            : (h = S[34]),
          S[35] !== R.length || S[36] !== I || S[37] !== K.length
            ? ((x =
                0 === R.length
                  ? (0, n.jsx)(nt, {
                      children: I("web.screeners.empty_coin_trades"),
                    })
                  : 0 === K.length
                    ? (0, n.jsx)(nt, {
                        children: I("web.screeners.no_trades_match"),
                      })
                    : null),
              (S[35] = R.length),
              (S[36] = I),
              (S[37] = K.length),
              (S[38] = x))
            : (x = S[38]),
          S[39] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (0, _.c)("flex w-full flex-col", eG.c)), (S[39] = g))
            : (g = S[39]),
          S[40] !== I
            ? ((b = I("web.screeners.list_trades_coin")),
              (S[40] = I),
              (S[41] = b))
            : (b = S[41]),
          S[42] !== G || S[43] !== H)
        ) {
          let e;
          (S[45] !== G
            ? ((e = (e) =>
                (0, n.jsx)(
                  "li",
                  {
                    className: G.has(e.key) ? th.l : void 0,
                    children: (0, n.jsx)(sW, { item: e }),
                  },
                  e.key,
                )),
              (S[45] = G),
              (S[46] = e))
            : (e = S[46]),
            (v = H.map(e)),
            (S[42] = G),
            (S[43] = H),
            (S[44] = v));
        } else v = S[44];
        S[47] !== b || S[48] !== v
          ? ((y = (0, n.jsx)("ul", {
              className: g,
              "aria-label": b,
              children: v,
            })),
            (S[47] = b),
            (S[48] = v),
            (S[49] = y))
          : (y = S[49]);
        let J = z && H.length > 0;
        return (
          S[50] === Symbol.for("react.memo_cache_sentinel")
            ? ((w = (0, eE.G)("Show more trades")), (S[50] = w))
            : (w = S[50]),
          S[51] !== O || S[52] !== z || S[53] !== D || S[54] !== J
            ? ((j = (0, n.jsx)(m.f, {
                hasNextPage: z,
                isFetchingNextPage: D,
                onFetchNextPage: O,
                autoLoad: !0,
                autoLoadHasMore: J,
                scrollRootRef: B,
                rootMargin: "200px 0px",
                label: w,
              })),
              (S[51] = O),
              (S[52] = z),
              (S[53] = D),
              (S[54] = J),
              (S[55] = j))
            : (j = S[55]),
          S[56] !== q || S[57] !== x || S[58] !== y || S[59] !== j
            ? ((N = (0, n.jsxs)("div", {
                ref: B,
                ...q,
                "data-testid": "screeners-coin-trades-scroll",
                className: eG.b,
                children: [x, y, j],
              })),
              (S[56] = q),
              (S[57] = x),
              (S[58] = y),
              (S[59] = j),
              (S[60] = N))
            : (N = S[60]),
          S[61] !== h || S[62] !== N
            ? ((k = (0, n.jsxs)("div", {
                className: "relative flex h-full min-h-0 w-full flex-col",
                children: [h, N],
              })),
              (S[61] = h),
              (S[62] = N),
              (S[63] = k))
            : (k = S[63]),
          k
        );
      },
    },
    "coin-callouts": {
      icon: t.Jd,
      Component: function (e) {
        let t,
          s,
          r,
          i,
          a,
          o,
          c,
          m,
          u = (0, l.c)(25),
          { column: f } = e,
          h = f.params?.mint,
          { t: x } = (0, d.f)(),
          p = !!h,
          g = h ?? null;
        u[0] !== g
          ? ((t = ["screeners", "coin-callouts", g]), (u[0] = g), (u[1] = t))
          : (t = u[1]);
        let b = t;
        (u[2] !== h
          ? ((s = (e) => {
              let { signal: t } = e;
              if (!h) throw Error("mint is required");
              return (0, nf.J)({ mint: h, signal: t });
            }),
            (u[2] = h),
            (u[3] = s))
          : (s = u[3]),
          u[4] !== p || u[5] !== b || u[6] !== s
            ? ((r = {
                enabled: p,
                queryKey: b,
                queryFn: s,
                refetchInterval: 15e3,
                refetchIntervalInBackground: !1,
                staleTime: 0,
              }),
              (u[4] = p),
              (u[5] = b),
              (u[6] = s),
              (u[7] = r))
            : (r = u[7]));
        let v = (0, tx.useQuery)(r),
          y = v.data ?? nh,
          w = y[0]?.key ?? "";
        (u[8] !== f.sound || u[9] !== w
          ? ((i = { sound: f.sound, newnessKey: w }),
            (u[8] = f.sound),
            (u[9] = w),
            (u[10] = i))
          : (i = u[10]),
          e6(i));
        let j = v.isPending && !!h,
          _ = v.isError;
        return (
          u[11] !== x
            ? ((a = x("web.screeners.empty_coin_callouts")),
              (u[11] = x),
              (u[12] = a))
            : (a = u[12]),
          u[13] !== x
            ? ((o = x("web.screeners.error_coin_callouts")),
              (u[13] = x),
              (u[14] = o))
            : (o = u[14]),
          u[15] !== x
            ? ((c = x("web.screeners.list_callouts_coin")),
              (u[15] = x),
              (u[16] = c))
            : (c = u[16]),
          u[17] !== f.filters ||
          u[18] !== y ||
          u[19] !== v.isError ||
          u[20] !== a ||
          u[21] !== o ||
          u[22] !== c ||
          u[23] !== j
            ? ((m = (0, n.jsx)("div", {
                className: "flex h-full min-h-0 w-full flex-col",
                children: (0, n.jsx)(nd, {
                  entries: y,
                  isLoading: j,
                  isError: _,
                  emptyText: a,
                  errorText: o,
                  listAriaLabel: c,
                  hasNextPage: !1,
                  isFetchingNextPage: !1,
                  fetchNextPage: nx,
                  scrollBoxTestId: "screeners-coin-callouts-scroll",
                  filters: f.filters,
                }),
              })),
              (u[17] = f.filters),
              (u[18] = y),
              (u[19] = v.isError),
              (u[20] = a),
              (u[21] = o),
              (u[22] = c),
              (u[23] = j),
              (u[24] = m))
            : (m = u[24]),
          m
        );
      },
    },
  };
  e.s(["Y", 0, lO, "r", 0, (e) => e in lO], 117330);
};
