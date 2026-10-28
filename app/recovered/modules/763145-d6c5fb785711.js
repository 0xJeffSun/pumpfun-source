// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(292686),
    s = e.i(426091),
    l = e.i(458310),
    a = e.i(352386),
    n = e.i(146695),
    o = e.i(705313);
  e.i(12692);
  var c = e.i(398902),
    d = e.i(850175),
    m = e.i(369091),
    u = e.i(687505);
  let f = (e) => {
    let r,
      f,
      h,
      x,
      p,
      v,
      g,
      b,
      w,
      y,
      N,
      j,
      _,
      C,
      E = (0, i.c)(47),
      {
        title: I,
        avatarUri: S,
        creator: T,
        mint: L,
        symbol: k,
        children: R,
        linkUrl: A,
        onOpenCoin: z,
      } = e,
      { t: P } = (0, c.f)(),
      { ipfsPrefix: M } = (0, m.useIpfsPrefix)(),
      [F, O] = (0, a.useState)(!1),
      D = T.username || T.address.slice(0, 8);
    E[0] !== T.address
      ? ((r = (0, n.$)(T.address)), (E[0] = T.address), (E[1] = r))
      : (r = E[1]);
    let U = r,
      H = A || `/coin/${L}`,
      K = A ? void 0 : z;
    E[2] !== A || E[3] !== L
      ? ((f = (0, u.f)(L, A) ? (0, d.e)(L) : null),
        (E[2] = A),
        (E[3] = L),
        (E[4] = f))
      : (f = E[4]);
    let V = f,
      { prefetch: $, hoverProps: W } = (0, d.W)(V);
    E[5] !== V || E[6] !== W || E[7] !== $
      ? ((h = V ? { prefetch: $, ...W } : { prefetch: !1 }),
        (E[5] = V),
        (E[6] = W),
        (E[7] = $),
        (E[8] = h))
      : (h = E[8]);
    let G = h,
      q = l.default,
      B = o.f,
      Z = P("web.live.creator_avatar_alt", { name: k || D }),
      Q = T.address,
      X = F ? "opacity-100" : "opacity-0";
    return (
      E[9] !== X
        ? ((x = (0, s.c)("mt-0.5 size-8 transition-opacity duration-75", X)),
          (E[9] = X),
          (E[10] = x))
        : (x = E[10]),
      E[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = () => O(!0)), (v = () => O(!0)), (E[11] = p), (E[12] = v))
        : ((p = E[11]), (v = E[12])),
      E[13] !== B ||
      E[14] !== S ||
      E[15] !== T.address ||
      E[16] !== M ||
      E[17] !== x ||
      E[18] !== Z
        ? ((g = (0, t.jsx)(B, {
            ipfsPrefix: M,
            src: S,
            alt: Z,
            address: Q,
            className: x,
            height: 32,
            isAnonymous: !1,
            onLoad: p,
            onError: v,
            width: 32,
          })),
          (E[13] = B),
          (E[14] = S),
          (E[15] = T.address),
          (E[16] = M),
          (E[17] = x),
          (E[18] = Z),
          (E[19] = g))
        : (g = E[19]),
      E[20] !== q || E[21] !== U || E[22] !== g
        ? ((b = (0, t.jsx)(q, {
            href: U,
            className: "flex-shrink-0",
            prefetch: !1,
            children: g,
          })),
          (E[20] = q),
          (E[21] = U),
          (E[22] = g),
          (E[23] = b))
        : (b = E[23]),
      E[24] !== H || E[25] !== G || E[26] !== K || E[27] !== I
        ? ((w = (0, t.jsx)(l.default, {
            href: H,
            onClick: K,
            className:
              "min-w-0 truncate text-sm font-semibold leading-snug text-text-primary",
            ...G,
            children: I,
          })),
          (E[24] = H),
          (E[25] = G),
          (E[26] = K),
          (E[27] = I),
          (E[28] = w))
        : (w = E[28]),
      E[29] !== H || E[30] !== G || E[31] !== K || E[32] !== k
        ? ((y = k
            ? (0, t.jsx)(l.default, {
                href: H,
                onClick: K,
                className:
                  "shrink-0 rounded bg-bg-tertiary px-1.5 py-px text-[11px] font-medium leading-4 text-text-secondary",
                ...G,
                "data-testid": "live-card-ticker",
                children: k,
              })
            : null),
          (E[29] = H),
          (E[30] = G),
          (E[31] = K),
          (E[32] = k),
          (E[33] = y))
        : (y = E[33]),
      E[34] !== w || E[35] !== y
        ? ((N = (0, t.jsxs)("div", {
            className: "flex min-w-0 items-center gap-1.5",
            children: [w, y],
          })),
          (E[34] = w),
          (E[35] = y),
          (E[36] = N))
        : (N = E[36]),
      E[37] !== U || E[38] !== D
        ? ((j = (0, t.jsx)(l.default, {
            href: U,
            className:
              "mt-0.5 min-w-0 truncate text-xs leading-snug text-text-tertiary",
            prefetch: !1,
            children: D,
          })),
          (E[37] = U),
          (E[38] = D),
          (E[39] = j))
        : (j = E[39]),
      E[40] !== R || E[41] !== N || E[42] !== j
        ? ((_ = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col",
            children: [N, j, R],
          })),
          (E[40] = R),
          (E[41] = N),
          (E[42] = j),
          (E[43] = _))
        : (_ = E[43]),
      E[44] !== b || E[45] !== _
        ? ((C = (0, t.jsxs)("div", {
            className: "flex w-full gap-2",
            children: [b, _],
          })),
          (E[44] = b),
          (E[45] = _),
          (E[46] = C))
        : (C = E[46]),
      C
    );
  };
  var h = e.i(564861);
  let x = (e) => {
    let r,
      s,
      l,
      a,
      n = (0, i.c)(15),
      {
        title: o,
        creator: c,
        avatarUri: d,
        mint: m,
        tags: u,
        linkUrl: h,
        symbol: x,
        onOpenCoin: v,
      } = e;
    n[0] !== u
      ? ((r = void 0 === u ? [] : u), (n[0] = u), (n[1] = r))
      : (r = n[1]);
    let g = r;
    return (
      n[2] !== g ? ((s = g.map(p)), (n[2] = g), (n[3] = s)) : (s = n[3]),
      n[4] !== s
        ? ((l = (0, t.jsx)("div", { className: "flex gap-1", children: s })),
          (n[4] = s),
          (n[5] = l))
        : (l = n[5]),
      n[6] !== d ||
      n[7] !== c ||
      n[8] !== h ||
      n[9] !== m ||
      n[10] !== v ||
      n[11] !== x ||
      n[12] !== l ||
      n[13] !== o
        ? ((a = (0, t.jsx)(f, {
            title: o,
            avatarUri: d,
            creator: c,
            mint: m,
            linkUrl: h,
            symbol: x,
            onOpenCoin: v,
            children: l,
          })),
          (n[6] = d),
          (n[7] = c),
          (n[8] = h),
          (n[9] = m),
          (n[10] = v),
          (n[11] = x),
          (n[12] = l),
          (n[13] = o),
          (n[14] = a))
        : (a = n[14]),
      a
    );
  };
  function p(e) {
    return (0, t.jsx)(h.f, { text: e }, e);
  }
  var v = e.i(928196),
    g = e.i(277167),
    b = e.i(816882),
    w = e.i(41705),
    y = e.i(556120),
    N = e.i(898337),
    j = e.i(454430),
    _ = e.i(666863),
    C = e.i(595673),
    E = e.i(56999);
  let I = [];
  e.s(
    [
      "Card",
      0,
      (e) => {
        let n,
          o,
          c,
          m,
          f,
          h,
          p,
          S,
          T,
          L,
          k,
          R,
          A,
          z,
          P,
          M,
          F,
          O,
          D,
          U,
          H,
          K,
          V,
          $,
          W,
          G = (0, i.c)(97),
          {
            mint: q,
            coinCreatedTimestamp: B,
            title: Z,
            creator: Q,
            marketCap: X,
            thumbnail: Y,
            ipfsThumbnail: J,
            thumbnailUpdatedAt: ee,
            avatarUri: et,
            isLive: ei,
            tags: er,
            viewerCount: es,
            viewerCountLabel: el,
            playlistUrl: ea,
            linkUrl: en,
            symbol: eo,
            index: ec,
            coin: ed,
          } = e,
          em = void 0 !== ei && ei,
          eu = void 0 === er ? I : er,
          ef = void 0 === ec ? 0 : ec,
          [eh, ex] = (0, a.useState)(!1),
          { isMutedFor: ep, toggleMuteFor: ev, setMuteFor: eg } = (0, E.F)();
        G[0] !== ep
          ? ((n = ep(E.k.CARD)), (G[0] = ep), (G[1] = n))
          : (n = G[1]);
        let eb = n,
          ew = (0, a.useRef)(null);
        G[2] !== ed || G[3] !== en || G[4] !== q
          ? ((o = (0, u.f)(q, en) ? (ed ?? (0, d.e)(q)) : null),
            (G[2] = ed),
            (G[3] = en),
            (G[4] = q),
            (G[5] = o))
          : (o = G[5]);
        let ey = o,
          { prefetch: eN, hoverProps: ej } = (0, d.W)(ey);
        G[6] !== ey || G[7] !== ej || G[8] !== eN
          ? ((c = ey ? { prefetch: eN, ...ej } : { prefetch: !1 }),
            (G[6] = ey),
            (G[7] = ej),
            (G[8] = eN),
            (G[9] = c))
          : (c = G[9]);
        let e_ = c;
        (G[10] !== X
          ? ((m = X ? Number(X.toFixed(2)) : 0), (G[10] = X), (G[11] = m))
          : (m = G[11]),
          G[12] !== ef || G[13] !== m
            ? ((f = {
                itemPosition: ef,
                marketCap: m,
                sourceScreen: r.Ae.LIVESTREAM,
              }),
              (G[12] = ef),
              (G[13] = m),
              (G[14] = f))
            : (f = G[14]));
        let eC = f,
          eE = (0, _.f)(q, eC, void 0, r.k9.LIVESTREAM_VIDEO_FEED);
        G[15] !== ef || G[16] !== em || G[17] !== X || G[18] !== q
          ? ((h = () => {
              (0, C.iV)({
                coinId: q,
                itemPosition: ef,
                marketCap: X ? Number(X.toFixed(2)) : 0,
                sourceScreen: r.Ae.LIVESTREAM,
                sourceElement: r.k9.LIVESTREAM_VIDEO_FEED,
                isLivestreamActive: em,
              });
            }),
            (G[15] = ef),
            (G[16] = em),
            (G[17] = X),
            (G[18] = q),
            (G[19] = h))
          : (h = G[19]);
        let eI = h;
        (G[20] !== eb || G[21] !== ep || G[22] !== eg
          ? ((p = () => {
              (ex(!0),
                eb ||
                  ((ew.current = ep(E.k.HERO_SLIDE)), eg(E.k.HERO_SLIDE, !0)));
            }),
            (G[20] = eb),
            (G[21] = ep),
            (G[22] = eg),
            (G[23] = p))
          : (p = G[23]),
          G[24] !== eg
            ? ((S = () => {
                (ex(!1),
                  null !== ew.current &&
                    (eg(E.k.HERO_SLIDE, ew.current), (ew.current = null)));
              }),
              (G[24] = eg),
              (G[25] = S))
            : (S = G[25]));
        let eS = en || `/coin/${q}`,
          eT = en ? void 0 : eI;
        (G[26] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, t.jsx)("span", {
              className: "block size-full",
              "aria-hidden": !0,
            })),
            (G[26] = T))
          : (T = G[26]),
          G[27] !== e_ || G[28] !== eS || G[29] !== eT
            ? ((L = (0, t.jsx)(l.default, {
                href: eS,
                onClick: eT,
                className: "absolute inset-0 z-0",
                ...e_,
                children: T,
              })),
              (G[27] = e_),
              (G[28] = eS),
              (G[29] = eT),
              (G[30] = L))
            : (L = G[30]),
          G[31] !== ef
            ? ((k = ef < 6 ? { loading: "eager" } : void 0),
              (G[31] = ef),
              (G[32] = k))
            : (k = G[32]),
          G[33] !== Q.address ||
          G[34] !== J ||
          G[35] !== eh ||
          G[36] !== em ||
          G[37] !== eb ||
          G[38] !== q ||
          G[39] !== ea ||
          G[40] !== k ||
          G[41] !== Y ||
          G[42] !== ee ||
          G[43] !== Z
            ? ((R = (0, t.jsx)("div", {
                className: "absolute inset-0 z-0 pointer-events-none",
                children: (0, t.jsx)(w.f, {
                  mint: q,
                  title: Z,
                  thumbnail: Y,
                  ipfsThumbnail: J,
                  thumbnailUpdatedAt: ee,
                  playlistUrl: ea,
                  isHovering: eh,
                  isMuted: eb,
                  thumbnailProps: k,
                  creator: Q.address,
                  isLive: em,
                }),
              })),
              (G[33] = Q.address),
              (G[34] = J),
              (G[35] = eh),
              (G[36] = em),
              (G[37] = eb),
              (G[38] = q),
              (G[39] = ea),
              (G[40] = k),
              (G[41] = Y),
              (G[42] = ee),
              (G[43] = Z),
              (G[44] = R))
            : (R = G[44]),
          G[45] === Symbol.for("react.memo_cache_sentinel")
            ? ((A = (0, s.c)(
                "absolute inset-0 z-10 flex items-start p-1 md:p-2 pointer-events-none",
                "justify-between",
              )),
              (G[45] = A))
            : (A = G[45]),
          G[46] !== em
            ? ((z = em && (0, t.jsx)(v.f, {})), (G[46] = em), (G[47] = z))
            : (z = G[47]),
          G[48] !== eg || G[49] !== ev
            ? ((P = () => {
                (ev(E.k.CARD), eg(E.k.HERO_SLIDE, !0));
              }),
              (G[48] = eg),
              (G[49] = ev),
              (G[50] = P))
            : (P = G[50]));
        let eL = eh && "opacity-100";
        return (
          G[51] !== eL
            ? ((M = (0, s.c)("opacity-0 transition-opacity duration-300", eL)),
              (G[51] = eL),
              (G[52] = M))
            : (M = G[52]),
          G[53] !== eb || G[54] !== P || G[55] !== M
            ? ((F = (0, t.jsx)(b.f, {
                isMuted: eb,
                onMuteToggle: P,
                size: 16,
                className: M,
              })),
              (G[53] = eb),
              (G[54] = P),
              (G[55] = M),
              (G[56] = F))
            : (F = G[56]),
          G[57] !== z || G[58] !== F
            ? ((O = (0, t.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [z, F],
              })),
              (G[57] = z),
              (G[58] = F),
              (G[59] = O))
            : (O = G[59]),
          G[60] !== X
            ? ((D = X && (0, t.jsx)(g.f, { marketCap: X })),
              (G[60] = X),
              (G[61] = D))
            : (D = G[61]),
          G[62] !== O || G[63] !== D
            ? ((U = (0, t.jsxs)("div", { className: A, children: [O, D] })),
              (G[62] = O),
              (G[63] = D),
              (G[64] = U))
            : (U = G[64]),
          G[65] !== B ||
          G[66] !== em ||
          G[67] !== q ||
          G[68] !== es ||
          G[69] !== el
            ? ((H =
                (es || B) &&
                (0, t.jsxs)("div", {
                  className:
                    "absolute bottom-0 left-0 right-0 p-2 flex items-end justify-between pointer-events-none",
                  children: [
                    es
                      ? (0, t.jsx)(N.f, {
                          count: es,
                          label: el ?? (em ? "viewers" : "views"),
                        })
                      : (0, t.jsx)("div", {}),
                    B &&
                      (0, t.jsx)(j.f, {
                        coin: { mint: q, created_timestamp: B },
                      }),
                  ],
                })),
              (G[65] = B),
              (G[66] = em),
              (G[67] = q),
              (G[68] = es),
              (G[69] = el),
              (G[70] = H))
            : (H = G[70]),
          G[71] !== L || G[72] !== R || G[73] !== U || G[74] !== H
            ? ((K = (0, t.jsxs)("div", {
                className:
                  "relative rounded-lg overflow-hidden aspect-video isolate",
                children: [L, R, U, H],
              })),
              (G[71] = L),
              (G[72] = R),
              (G[73] = U),
              (G[74] = H),
              (G[75] = K))
            : (K = G[75]),
          G[76] !== et ||
          G[77] !== Q ||
          G[78] !== eI ||
          G[79] !== en ||
          G[80] !== q ||
          G[81] !== eo ||
          G[82] !== eu ||
          G[83] !== Z
            ? ((V = (0, t.jsx)(x, {
                title: Z,
                creator: Q,
                avatarUri: et,
                mint: q,
                tags: eu,
                linkUrl: en,
                symbol: eo,
                onOpenCoin: eI,
              })),
              (G[76] = et),
              (G[77] = Q),
              (G[78] = eI),
              (G[79] = en),
              (G[80] = q),
              (G[81] = eo),
              (G[82] = eu),
              (G[83] = Z),
              (G[84] = V))
            : (V = G[84]),
          G[85] !== ed || G[86] !== eI || G[87] !== ef || G[88] !== q
            ? (($ = ed
                ? (0, t.jsx)(y.f, {
                    coin: ed,
                    href: `/coin/${q}`,
                    index: ef,
                    onOpenCoin: eI,
                  })
                : null),
              (G[85] = ed),
              (G[86] = eI),
              (G[87] = ef),
              (G[88] = q),
              (G[89] = $))
            : ($ = G[89]),
          G[90] !== eE ||
          G[91] !== p ||
          G[92] !== S ||
          G[93] !== K ||
          G[94] !== V ||
          G[95] !== $
            ? ((W = (0, t.jsxs)("div", {
                ref: eE,
                className:
                  "w-full flex flex-col gap-2 cursor-pointer transition-transform duration-150 hover:scale-[1.025]",
                onMouseEnter: p,
                onMouseLeave: S,
                children: [K, V, $],
              })),
              (G[90] = eE),
              (G[91] = p),
              (G[92] = S),
              (G[93] = K),
              (G[94] = V),
              (G[95] = $),
              (G[96] = W))
            : (W = G[96]),
          W
        );
      },
    ],
    763145,
  );
};
