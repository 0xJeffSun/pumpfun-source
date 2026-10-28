// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(938277),
    l = e.i(365089),
    a = e.i(465085),
    o = e.i(458310),
    s = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    c = e.i(337689),
    d = e.i(65407),
    m = e.i(713380),
    f = e.i(909318),
    p = e.i(56087),
    h = e.i(116549);
  e.i(12641);
  var g = e.i(34011),
    y = e.i(529841),
    v = e.i(787773),
    b = e.i(967694),
    w = e.i(248496),
    x = e.i(850175),
    k = e.i(425890),
    M = e.i(666863),
    C = e.i(95132),
    I = e.i(662093),
    S = e.i(595673),
    N = e.i(569526),
    A = e.i(653805),
    j = e.i(187611);
  function _(e, n) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex items-start gap-3",
        children: [
          (0, t.jsx)(w.l, { variant: "art", size: 100 }),
          (0, t.jsxs)("div", {
            className: "flex flex-1 flex-col gap-2 pt-1",
            children: [
              (0, t.jsx)(w.l, { height: 16, width: 112 }),
              (0, t.jsx)(w.l, { height: 14, width: 80 }),
              (0, t.jsx)(w.l, { height: 14, width: 96 }),
              (0, t.jsx)(w.l, { height: 16, width: 64 }),
            ],
          }),
        ],
      },
      n,
    );
  }
  e.s([
    "D",
    0,
    function (e) {
      let h,
        v,
        b,
        w,
        _,
        U,
        E,
        T,
        $,
        R,
        D,
        F,
        P,
        B,
        q,
        O,
        z,
        W,
        L,
        V,
        Q,
        G,
        H,
        K = (0, n.c)(80),
        Z = (0, k.f)(),
        {
          coin: X,
          isLoggedIn: J,
          servedPriceUsd: Y,
          index: ee,
          sourceElement: et,
          sourceScreen: en,
        } = e,
        { t: er } = (0, u.f)(),
        { prefetch: ei, hoverProps: el } = (0, x.W)(X),
        ea = ei || void 0,
        eo = void 0 !== Y,
        { figure: es, flash: eu } = (function (e, t) {
          let r,
            i,
            l,
            a,
            o,
            u = (0, n.c)(11),
            c =
              (0, I.h)({
                mint: e.mint,
                chainId: e.chain_id,
                fallbackMarketCap: e.usd_market_cap,
                coin: e,
              }) ?? null,
            d = (0, A.F)(e.mint)?.priceUsd;
          u[0] !== d || u[1] !== c || u[2] !== t
            ? ((r =
                void 0 === t
                  ? c
                  : "number" == typeof d && Number.isFinite(d) && d > 0
                    ? d
                    : t),
              (u[0] = d),
              (u[1] = c),
              (u[2] = t),
              (u[3] = r))
            : (r = u[3]);
          let m = r,
            f = (0, s.useRef)(null);
          u[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((i = { key: 0, direction: null }), (u[4] = i))
            : (i = u[4]);
          let [p, h] = (0, s.useState)(i);
          return (
            u[5] !== m
              ? ((l = () => {
                  if (null == m || !Number.isFinite(m)) return;
                  let e = f.current;
                  (null != e &&
                    e > 0 &&
                    m !== e &&
                    Math.abs((m - e) / e) > 0.001 &&
                    h((t) => ({
                      key: t.key + 1,
                      direction: m > e ? "up" : "down",
                    })),
                    (f.current = m));
                }),
                (a = [m]),
                (u[5] = m),
                (u[6] = l),
                (u[7] = a))
              : ((l = u[6]), (a = u[7])),
            (0, s.useEffect)(l, a),
            u[8] !== m || u[9] !== p
              ? ((o = { figure: m, flash: p }),
                (u[8] = m),
                (u[9] = p),
                (u[10] = o))
              : (o = u[10]),
            o
          );
        })(X, Y),
        ec = X.created_timestamp ?? null,
        ed = eo ? X.usd_market_cap : es;
      K[0] !== X.rec_id ||
      K[1] !== X.rec_rank ||
      K[2] !== ed ||
      K[3] !== ee ||
      K[4] !== et ||
      K[5] !== en
        ? ((h =
            void 0 !== et && void 0 !== en && void 0 !== ee
              ? {
                  itemPosition: ee,
                  marketCap: null != ed && Number.isFinite(ed) ? ed : 0,
                  sourceScreen: en,
                  rec_id: X.rec_id,
                  recommendationRank: X.rec_rank,
                  sourceElement: et,
                }
              : void 0),
          (K[0] = X.rec_id),
          (K[1] = X.rec_rank),
          (K[2] = ed),
          (K[3] = ee),
          (K[4] = et),
          (K[5] = en),
          (K[6] = h))
        : (h = K[6]);
      let em = h,
        ef = (0, N.G)(),
        ep = (0, M.f)(X.mint, em, void 0, et);
      K[7] !== X.mint ||
      K[8] !== X.rec_id ||
      K[9] !== X.rec_rank ||
      K[10] !== em ||
      K[11] !== ef
        ? ((v = () => {
            em &&
              (ef?.(X.mint, em),
              (0, S.iV)({
                coinId: X.mint,
                itemPosition: em.itemPosition,
                marketCap: em.marketCap,
                sourceScreen: em.sourceScreen,
                rec_id: X.rec_id,
                recommendationRank: X.rec_rank,
                sourceElement: em.sourceElement,
              }));
          }),
          (K[7] = X.mint),
          (K[8] = X.rec_id),
          (K[9] = X.rec_rank),
          (K[10] = em),
          (K[11] = ef),
          (K[12] = v))
        : (v = K[12]);
      let eh = v,
        eg = `/coin/${X.mint}`;
      (K[13] !== X.mint ||
      K[14] !== X.name ||
      K[15] !== X.symbol ||
      K[16] !== er
        ? ((b = er("web.market_rail.open_coin", {
            coin_name: (0, j.T)(
              X.name || X.symbol || (0, l.d)(X.mint, 4, 4),
              "coin-name",
            ),
          })),
          (K[13] = X.mint),
          (K[14] = X.name),
          (K[15] = X.symbol),
          (K[16] = er),
          (K[17] = b))
        : (b = K[17]),
        K[18] !== X || K[19] !== Z
          ? ((w = Z
              ? (0, t.jsx)(g.CoinAvatar, {
                  coin: X,
                  size: 100,
                  cornerSize: 24,
                  frameClassName: "rounded-[15px] border-0 bg-transparent",
                  imageClassName: "rounded-[15px]",
                  className: "size-full",
                })
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(f.f, {
                      sourceImageUrl: X.image_uri ?? "",
                      mint: X.mint,
                      isBanned: X.is_banned,
                      imageType: p.d.COIN_IMAGE,
                      alt: X.name ?? "",
                      width: 128,
                      height: 128,
                      className: "size-full rounded-[15px] object-cover",
                      loading: "lazy",
                    }),
                    (0, t.jsx)(m.f, {
                      mint: X.mint,
                      chainId: X.chain_id,
                      program: X.program,
                      platform: X.platform,
                      protocol: X.protocol,
                      boardProgram: X.board_program,
                      size: 24,
                      chainSize: 20,
                      venueSize: (0, d.P)(100),
                      className: "absolute -bottom-1.5 -right-1.5",
                      chainClassName:
                        "absolute -bottom-1 -right-1 rounded-full ring-2 ring-bg-primary",
                    }),
                  ],
                })),
            (K[18] = X),
            (K[19] = Z),
            (K[20] = w))
          : (w = K[20]),
        K[21] !== el ||
        K[22] !== ea ||
        K[23] !== eh ||
        K[24] !== eg ||
        K[25] !== b ||
        K[26] !== w
          ? ((_ = (0, t.jsx)(o.default, {
              href: eg,
              prefetch: ea,
              ...el,
              onClick: eh,
              "aria-label": b,
              className:
                "relative size-[100px] shrink-0 rounded-[15px] border-[0.62px] border-bg-primary bg-bg-secondary",
              children: w,
            })),
            (K[21] = el),
            (K[22] = ea),
            (K[23] = eh),
            (K[24] = eg),
            (K[25] = b),
            (K[26] = w),
            (K[27] = _))
          : (_ = K[27]));
      let ey = `/coin/${X.mint}`;
      (K[28] !== X.mint || K[29] !== X.name || K[30] !== X.symbol
        ? ((U = X.name || X.symbol || (0, l.d)(X.mint, 4, 4)),
          (K[28] = X.mint),
          (K[29] = X.name),
          (K[30] = X.symbol),
          (K[31] = U))
        : (U = K[31]),
        K[32] !== el ||
        K[33] !== ea ||
        K[34] !== eh ||
        K[35] !== ey ||
        K[36] !== U
          ? ((E = (0, t.jsx)(o.default, {
              href: ey,
              prefetch: ea,
              ...el,
              onClick: eh,
              className:
                "line-clamp-1 min-w-0 break-all text-base font-semibold leading-5 tracking-[-0.16px] text-text-primary hover:underline",
              children: U,
            })),
            (K[32] = el),
            (K[33] = ea),
            (K[34] = eh),
            (K[35] = ey),
            (K[36] = U),
            (K[37] = E))
          : (E = K[37]),
        K[38] !== X.symbol
          ? ((T = (X.symbol ?? "").replace(/^\$/, "") || "—"),
            (K[38] = X.symbol),
            (K[39] = T))
          : (T = K[39]),
        K[40] !== T
          ? (($ = (0, t.jsx)("p", {
              className:
                "whitespace-nowrap text-sm font-semibold leading-[18px] tracking-[-0.14px] text-text-tertiary",
              children: T,
            })),
            (K[40] = T),
            (K[41] = $))
          : ($ = K[41]),
        K[42] !== ec
          ? ((R = ec
              ? (0, t.jsxs)("span", {
                  className: "flex items-center gap-1",
                  children: [
                    (0, t.jsx)(r.i$, {
                      "aria-hidden": !0,
                      className: "size-4 text-text-tertiary",
                    }),
                    (0, t.jsx)(y.f, {
                      timestamp: ec,
                      suffix: !1,
                      className:
                        "whitespace-nowrap text-sm font-semibold leading-[18px] tracking-[-0.14px] text-text-tertiary",
                    }),
                  ],
                })
              : null),
            (K[42] = ec),
            (K[43] = R))
          : (R = K[43]),
        K[44] !== $ || K[45] !== R
          ? ((D = (0, t.jsxs)("div", {
              className: "flex items-center gap-[11px]",
              children: [$, R],
            })),
            (K[44] = $),
            (K[45] = R),
            (K[46] = D))
          : (D = K[46]),
        K[47] !== D || K[48] !== E
          ? ((F = (0, t.jsxs)("div", {
              className: "flex flex-col gap-1",
              children: [E, D],
            })),
            (K[47] = D),
            (K[48] = E),
            (K[49] = F))
          : (F = K[49]),
        K[50] !== eu.direction
          ? ((P = !!eu.direction && {
              color:
                "up" === eu.direction ? "rgb(134 239 172)" : "rgb(248 113 113)",
            }),
            (K[50] = eu.direction),
            (K[51] = P))
          : (P = K[51]),
        K[52] === Symbol.for("react.memo_cache_sentinel")
          ? ((B = { color: "rgb(161 161 170)" }),
            (q = { duration: 0.7, ease: "easeOut" }),
            (K[52] = B),
            (K[53] = q))
          : ((B = K[52]), (q = K[53])),
        K[54] !== es || K[55] !== eo
          ? ((O =
              null != es && Number.isFinite(es)
                ? eo
                  ? (0, C.j)(es)
                  : `$${(0, i.M)(es)}`
                : "—"),
            (K[54] = es),
            (K[55] = eo),
            (K[56] = O))
          : (O = K[56]),
        K[57] !== eu.key || K[58] !== P || K[59] !== O
          ? ((z = (0, t.jsx)(
              a.f.p,
              {
                initial: P,
                animate: B,
                transition: q,
                className:
                  "whitespace-nowrap text-base font-semibold leading-5 tracking-[-0.16px] tabular-nums text-text-tertiary",
                children: O,
              },
              eu.key,
            )),
            (K[57] = eu.key),
            (K[58] = P),
            (K[59] = O),
            (K[60] = z))
          : (z = K[60]));
      let ev = eo ? "coin_details.price" : "common.market_cap_short";
      return (
        K[61] !== er || K[62] !== ev
          ? ((W = er(ev)), (K[61] = er), (K[62] = ev), (K[63] = W))
          : (W = K[63]),
        K[64] !== W
          ? ((L = (0, t.jsx)("p", {
              className:
                "whitespace-nowrap text-sm font-semibold leading-[18px] tracking-[-0.14px] text-text-tertiary",
              children: W,
            })),
            (K[64] = W),
            (K[65] = L))
          : (L = K[65]),
        K[66] !== z || K[67] !== L
          ? ((V = (0, t.jsxs)("div", {
              className: "flex items-end gap-2 pb-1 pt-2",
              children: [z, L],
            })),
            (K[66] = z),
            (K[67] = L),
            (K[68] = V))
          : (V = K[68]),
        K[69] !== X || K[70] !== J
          ? ((Q = (0, t.jsx)(c.$, {
              mint: X.mint,
              isLoggedIn: J,
              coin: X,
              avatarSize: "sm",
              className: "pt-1",
            })),
            (K[69] = X),
            (K[70] = J),
            (K[71] = Q))
          : (Q = K[71]),
        K[72] !== ep || K[73] !== F || K[74] !== V || K[75] !== Q
          ? ((G = (0, t.jsxs)("div", {
              ref: ep,
              className: "flex min-w-0 flex-1 flex-col",
              children: [F, V, Q],
            })),
            (K[72] = ep),
            (K[73] = F),
            (K[74] = V),
            (K[75] = Q),
            (K[76] = G))
          : (G = K[76]),
        K[77] !== G || K[78] !== _
          ? ((H = (0, t.jsxs)("div", {
              "data-testid": "market-rail-card",
              className: "flex w-full items-start gap-3",
              children: [_, G],
            })),
            (K[77] = G),
            (K[78] = _),
            (K[79] = H))
          : (H = K[79]),
        H
      );
    },
    "c",
    0,
    function () {
      let e,
        r = (0, n.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className: "flex flex-col gap-4",
              children: Array.from({ length: 6 }).map(_),
            })),
            (r[0] = e))
          : (e = r[0]),
        e
      );
    },
    "M",
    0,
    function (e) {
      let r,
        i = (0, n.c)(5),
        { children: l, variant: a, onRetry: o } = e,
        s = void 0 === a ? "empty" : a,
        u = (0, h.x)();
      return (
        i[0] !== l || i[1] !== u || i[2] !== o || i[3] !== s
          ? ((r =
              "error" === s
                ? (0, t.jsx)(b.f, { density: u, onRetry: o, children: l })
                : (0, t.jsx)(v.L, { density: u, children: l })),
            (i[0] = l),
            (i[1] = u),
            (i[2] = o),
            (i[3] = s),
            (i[4] = r))
          : (r = i[4]),
        r
      );
    },
  ]);
};
