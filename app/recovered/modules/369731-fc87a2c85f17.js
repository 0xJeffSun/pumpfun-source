// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(157633),
    l = e.i(426091),
    r = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    n = e.i(798394),
    c = e.i(70678),
    o = e.i(65769),
    d = e.i(187807);
  let m = (e) => {
    let i,
      r,
      s,
      n = (0, a.c)(9),
      { children: c, onClick: o, label: d, className: m } = e;
    return (
      n[0] !== m
        ? ((i = (0, l.c)("flex h-full items-center justify-center", m)),
          (n[0] = m),
          (n[1] = i))
        : (i = n[1]),
      n[2] !== c || n[3] !== d || n[4] !== o
        ? ((r = (0, t.jsx)("button", {
            type: "button",
            "aria-label": d,
            className:
              "flex items-center justify-center rounded-full bg-bg-tertiary p-3 text-text-primary transition-colors hover:bg-bg-quaternary",
            onClick: o,
            children: c,
          })),
          (n[2] = c),
          (n[3] = d),
          (n[4] = o),
          (n[5] = r))
        : (r = n[5]),
      n[6] !== i || n[7] !== r
        ? ((s = (0, t.jsx)("div", { className: i, children: r })),
          (n[6] = i),
          (n[7] = r),
          (n[8] = s))
        : (s = n[8]),
      s
    );
  };
  var u = e.i(218921),
    f = e.i(292686),
    h = e.i(458310),
    x = e.i(816882),
    p = e.i(41705),
    v = e.i(146695),
    g = e.i(705313),
    b = e.i(928196),
    y = e.i(277167),
    _ = e.i(564861),
    j = e.i(556120),
    w = e.i(898337),
    N = e.i(454430),
    E = e.i(850175),
    S = e.i(369091);
  let k = [],
    P = (e) => {
      let i,
        l,
        r,
        n,
        c,
        o,
        d,
        m,
        u,
        f,
        x,
        p,
        _,
        P,
        L,
        R,
        T,
        A,
        I = (0, a.c)(66),
        {
          title: U,
          mint: M,
          creator: O,
          symbol: D,
          marketCap: F,
          avatarUri: z,
          tags: V,
          isLive: W,
          viewerCount: H,
          viewerCountLabel: q,
          coinCreatedTimestamp: B,
          onOpenCoin: G,
          coin: $,
        } = e,
        K = void 0 === V ? k : V,
        Q = void 0 !== W && W,
        { t: J } = (0, s.f)(),
        { ipfsPrefix: Y } = (0, S.useIpfsPrefix)(),
        X = O.username || O.address.slice(0, 8),
        Z = `/coin/${M}`;
      I[0] !== O.address
        ? ((i = (0, v.$)(O.address)), (I[0] = O.address), (I[1] = i))
        : (i = I[1]);
      let ee = i;
      I[2] !== $ || I[3] !== M
        ? ((l = $ ?? (0, E.e)(M)), (I[2] = $), (I[3] = M), (I[4] = l))
        : (l = I[4]);
      let { prefetch: et, hoverProps: ea } = (0, E.W)(l);
      (I[5] !== Q
        ? ((r = Q && (0, t.jsx)(b.f, {})), (I[5] = Q), (I[6] = r))
        : (r = I[6]),
        I[7] !== Q || I[8] !== H || I[9] !== q
          ? ((n =
              H && H > 0
                ? (0, t.jsx)(w.f, {
                    count: H,
                    className: "bg-bg-tertiary",
                    label: q ?? (Q ? "viewers" : "views"),
                  })
                : null),
            (I[7] = Q),
            (I[8] = H),
            (I[9] = q),
            (I[10] = n))
          : (n = I[10]),
        I[11] !== r || I[12] !== n
          ? ((c = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [r, n],
            })),
            (I[11] = r),
            (I[12] = n),
            (I[13] = c))
          : (c = I[13]),
        I[14] !== Z ||
        I[15] !== ea ||
        I[16] !== G ||
        I[17] !== et ||
        I[18] !== U
          ? ((o = (0, t.jsx)(h.default, {
              href: Z,
              onClick: G,
              className:
                "line-clamp-2 text-xl font-bold leading-tight text-text-hero hover:text-text-accent lg:text-2xl",
              prefetch: et,
              ...ea,
              children: U,
            })),
            (I[14] = Z),
            (I[15] = ea),
            (I[16] = G),
            (I[17] = et),
            (I[18] = U),
            (I[19] = o))
          : (o = I[19]));
      let ei = h.default,
        el = g.f,
        er = J("web.live.creator_avatar_alt", { name: D || X });
      return (
        I[20] !== el ||
        I[21] !== z ||
        I[22] !== O.address ||
        I[23] !== Y ||
        I[24] !== er
          ? ((d = (0, t.jsx)(el, {
              ipfsPrefix: Y,
              src: z,
              alt: er,
              address: O.address,
              className: "size-10",
              height: 40,
              width: 40,
              isAnonymous: !1,
            })),
            (I[20] = el),
            (I[21] = z),
            (I[22] = O.address),
            (I[23] = Y),
            (I[24] = er),
            (I[25] = d))
          : (d = I[25]),
        I[26] !== ei || I[27] !== ee || I[28] !== d
          ? ((m = (0, t.jsx)(ei, {
              href: ee,
              className: "shrink-0",
              prefetch: !1,
              children: d,
            })),
            (I[26] = ei),
            (I[27] = ee),
            (I[28] = d),
            (I[29] = m))
          : (m = I[29]),
        I[30] !== Z ||
        I[31] !== ea ||
        I[32] !== G ||
        I[33] !== et ||
        I[34] !== D
          ? ((u = D
              ? (0, t.jsx)(h.default, {
                  href: Z,
                  onClick: G,
                  className: "truncate text-sm font-semibold text-text-primary",
                  prefetch: et,
                  ...ea,
                  children: D,
                })
              : null),
            (I[30] = Z),
            (I[31] = ea),
            (I[32] = G),
            (I[33] = et),
            (I[34] = D),
            (I[35] = u))
          : (u = I[35]),
        I[36] !== F
          ? ((f = (0, t.jsx)(y.f, { marketCap: F })), (I[36] = F), (I[37] = f))
          : (f = I[37]),
        I[38] !== u || I[39] !== f
          ? ((x = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [u, f],
            })),
            (I[38] = u),
            (I[39] = f),
            (I[40] = x))
          : (x = I[40]),
        I[41] !== ee || I[42] !== X
          ? ((p = (0, t.jsx)(h.default, {
              href: ee,
              className: "truncate text-sm text-text-tertiary",
              prefetch: !1,
              children: X,
            })),
            (I[41] = ee),
            (I[42] = X),
            (I[43] = p))
          : (p = I[43]),
        I[44] !== x || I[45] !== p
          ? ((_ = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [x, p],
            })),
            (I[44] = x),
            (I[45] = p),
            (I[46] = _))
          : (_ = I[46]),
        I[47] !== m || I[48] !== _
          ? ((P = (0, t.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [m, _],
            })),
            (I[47] = m),
            (I[48] = _),
            (I[49] = P))
          : (P = I[49]),
        I[50] !== B || I[51] !== M
          ? ((L = B
              ? (0, t.jsx)(N.f, {
                  coin: { mint: M, created_timestamp: B },
                  className: "hidden h-24 w-full hover:scale-100 xl:flex",
                })
              : null),
            (I[50] = B),
            (I[51] = M),
            (I[52] = L))
          : (L = I[52]),
        I[53] !== K
          ? ((R =
              K.length > 0
                ? (0, t.jsx)("div", {
                    className: "flex flex-wrap gap-1",
                    children: K.map(C),
                  })
                : null),
            (I[53] = K),
            (I[54] = R))
          : (R = I[54]),
        I[55] !== $ || I[56] !== Z || I[57] !== G
          ? ((T = $
              ? (0, t.jsx)(j.f, {
                  coin: $,
                  href: Z,
                  index: 0,
                  onOpenCoin: G,
                  placement: "hero",
                  className: "max-w-xs",
                })
              : null),
            (I[55] = $),
            (I[56] = Z),
            (I[57] = G),
            (I[58] = T))
          : (T = I[58]),
        I[59] !== P ||
        I[60] !== L ||
        I[61] !== R ||
        I[62] !== T ||
        I[63] !== c ||
        I[64] !== o
          ? ((A = (0, t.jsxs)("div", {
              className: "flex w-full flex-col gap-3",
              children: [c, o, P, L, R, T],
            })),
            (I[59] = P),
            (I[60] = L),
            (I[61] = R),
            (I[62] = T),
            (I[63] = c),
            (I[64] = o),
            (I[65] = A))
          : (A = I[65]),
        A
      );
    };
  function C(e) {
    return (0, t.jsx)(_.f, { text: e }, e);
  }
  var L = e.i(829010),
    R = e.i(595673),
    T = e.i(56999);
  let A = [],
    I = (e) => {
      let i,
        n,
        c,
        o,
        d,
        m,
        u,
        v,
        g,
        b,
        y,
        _,
        j,
        w,
        N,
        S,
        k = (0, a.c)(65),
        {
          mint: C,
          title: I,
          creator: U,
          symbol: M,
          marketCap: O,
          thumbnail: D,
          ipfsThumbnail: F,
          thumbnailUpdatedAt: z,
          avatarUri: V,
          tags: W,
          isLive: H,
          viewerCount: q,
          viewerCountLabel: B,
          playlistUrl: G,
          coinCreatedTimestamp: $,
          isSelected: K,
          coin: Q,
        } = e,
        J = void 0 === W ? A : W,
        Y = void 0 !== H && H,
        { t: X } = (0, s.f)(),
        { isMutedFor: Z, toggleMuteFor: ee } = (0, T.F)();
      k[0] !== Z
        ? ((i = Z(T.k.HERO_SLIDE)), (k[0] = Z), (k[1] = i))
        : (i = k[1]);
      let et = i,
        [ea, ei] = ((e) => {
          let t,
            i,
            l,
            s = (0, a.c)(5),
            [n, c] = (0, r.useState)(void 0 !== e && e);
          return (
            s[0] !== n
              ? ((t = () => {
                  if (n) return;
                  let e = () => c(!0);
                  return (
                    document.addEventListener("click", e),
                    document.addEventListener("keydown", e),
                    () => {
                      (document.removeEventListener("click", e),
                        document.removeEventListener("keydown", e));
                    }
                  );
                }),
                (i = [n]),
                (s[0] = n),
                (s[1] = t),
                (s[2] = i))
              : ((t = s[1]), (i = s[2])),
            (0, r.useEffect)(t, i),
            s[3] !== n ? ((l = [n, c]), (s[3] = n), (s[4] = l)) : (l = s[4]),
            l
          );
        })(!0);
      k[2] !== Q || k[3] !== C
        ? ((n = Q ?? (0, E.e)(C)), (k[2] = Q), (k[3] = C), (k[4] = n))
        : (n = k[4]);
      let { prefetch: el, hoverProps: er } = (0, E.W)(n);
      k[5] !== Y || k[6] !== O || k[7] !== C
        ? ((c = () => {
            (0, R.iV)({
              coinId: C,
              itemPosition: 0,
              marketCap: Number(O.toFixed(2)),
              sourceScreen: f.Ae.LIVESTREAM,
              sourceElement: f.k9.LIVESTREAM_VIDEO_FEED,
              isLivestreamActive: Y,
            });
          }),
          (k[5] = Y),
          (k[6] = O),
          (k[7] = C),
          (k[8] = c))
        : (c = k[8]);
      let es = c,
        en = `/coin/${C}`;
      return (
        k[9] !== M || k[10] !== X || k[11] !== I
          ? ((o = M
              ? X("web.live.open_stream_symbol_aria", { title: I, symbol: M })
              : X("web.live.open_stream_aria", { title: I })),
            (k[9] = M),
            (k[10] = X),
            (k[11] = I),
            (k[12] = o))
          : (o = k[12]),
        k[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)("span", {
              className: "block size-full",
              "aria-hidden": !0,
            })),
            (k[13] = d))
          : (d = k[13]),
        k[14] !== es ||
        k[15] !== er ||
        k[16] !== el ||
        k[17] !== en ||
        k[18] !== o
          ? ((m = (0, t.jsx)(h.default, {
              href: en,
              onClick: es,
              prefetch: el,
              ...er,
              "aria-label": o,
              className: "absolute inset-0 z-[15]",
              children: d,
            })),
            (k[14] = es),
            (k[15] = er),
            (k[16] = el),
            (k[17] = en),
            (k[18] = o),
            (k[19] = m))
          : (m = k[19]),
        k[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, l.c)("pointer-events-none relative z-20", L.B)),
            (v = (0, l.c)("pointer-events-auto group relative", L.h)),
            (k[20] = u),
            (k[21] = v))
          : ((u = k[20]), (v = k[21])),
        k[22] !== ei
          ? ((g = () => {
              ei(!1);
            }),
            (k[22] = ei),
            (k[23] = g))
          : (g = k[23]),
        k[24] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = { loading: "eager" }), (k[24] = b))
          : (b = k[24]),
        k[25] !== ea || k[26] !== et || k[27] !== ee
          ? ((y =
              ea &&
              (0, t.jsx)("div", {
                className: "absolute inset-0 flex items-center justify-center",
                children: (0, t.jsx)(x.f, {
                  size: 22,
                  className: (0, l.c)(
                    "z-10 transition-opacity duration-300 group-hover:opacity-100",
                    et ? "opacity-100" : "opacity-0",
                  ),
                  isMuted: et,
                  onMuteToggle: () => ee(T.k.HERO_SLIDE),
                }),
              })),
            (k[25] = ea),
            (k[26] = et),
            (k[27] = ee),
            (k[28] = y))
          : (y = k[28]),
        k[29] !== U.address ||
        k[30] !== F ||
        k[31] !== Y ||
        k[32] !== et ||
        k[33] !== K ||
        k[34] !== C ||
        k[35] !== G ||
        k[36] !== g ||
        k[37] !== y ||
        k[38] !== D ||
        k[39] !== z ||
        k[40] !== I
          ? ((_ = (0, t.jsx)("div", {
              className: v,
              children: (0, t.jsx)(p.f, {
                className: "w-full",
                mint: C,
                title: I,
                thumbnail: D,
                ipfsThumbnail: F,
                thumbnailUpdatedAt: z,
                playlistUrl: G,
                isHovering: K,
                isMuted: et,
                onAutoPlayFail: g,
                thumbnailProps: b,
                creator: U.address,
                isLive: Y,
                children: y,
              }),
            })),
            (k[29] = U.address),
            (k[30] = F),
            (k[31] = Y),
            (k[32] = et),
            (k[33] = K),
            (k[34] = C),
            (k[35] = G),
            (k[36] = g),
            (k[37] = y),
            (k[38] = D),
            (k[39] = z),
            (k[40] = I),
            (k[41] = _))
          : (_ = k[41]),
        k[42] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = (0, l.c)(
              "pointer-events-auto flex min-w-0 flex-col justify-center p-4 xl:p-5",
              L.s,
            )),
            (k[42] = j))
          : (j = k[42]),
        k[43] !== V ||
        k[44] !== Q ||
        k[45] !== $ ||
        k[46] !== U ||
        k[47] !== es ||
        k[48] !== Y ||
        k[49] !== O ||
        k[50] !== C ||
        k[51] !== M ||
        k[52] !== J ||
        k[53] !== D ||
        k[54] !== z ||
        k[55] !== I ||
        k[56] !== q ||
        k[57] !== B
          ? ((w = (0, t.jsx)("div", {
              className: j,
              children: (0, t.jsx)(P, {
                title: I,
                mint: C,
                creator: U,
                symbol: M,
                marketCap: O,
                avatarUri: V,
                thumbnail: D,
                thumbnailUpdatedAt: z,
                tags: J,
                isLive: Y,
                viewerCount: q,
                viewerCountLabel: B,
                coinCreatedTimestamp: $,
                onOpenCoin: es,
                coin: Q,
              }),
            })),
            (k[43] = V),
            (k[44] = Q),
            (k[45] = $),
            (k[46] = U),
            (k[47] = es),
            (k[48] = Y),
            (k[49] = O),
            (k[50] = C),
            (k[51] = M),
            (k[52] = J),
            (k[53] = D),
            (k[54] = z),
            (k[55] = I),
            (k[56] = q),
            (k[57] = B),
            (k[58] = w))
          : (w = k[58]),
        k[59] !== _ || k[60] !== w
          ? ((N = (0, t.jsxs)("div", { className: u, children: [_, w] })),
            (k[59] = _),
            (k[60] = w),
            (k[61] = N))
          : (N = k[61]),
        k[62] !== N || k[63] !== m
          ? ((S = (0, t.jsxs)("div", {
              className:
                "relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-bg-secondary",
              children: [m, N],
            })),
            (k[62] = N),
            (k[63] = m),
            (k[64] = S))
          : (S = k[64]),
        S
      );
    };
  e.s(
    [
      "HeroCarousel",
      0,
      (e) => {
        let f,
          h,
          x,
          p,
          v,
          g,
          b,
          y,
          _,
          j,
          w,
          N,
          E = (0, a.c)(39),
          { livestreams: S } = e,
          { t: k } = (0, s.f)();
        E[0] !== S.length
          ? ((f = { itemCount: S.length, isLooping: !0 }),
            (E[0] = S.length),
            (E[1] = f))
          : (f = E[1]);
        let {
          selectedIndex: P,
          nextIndex: C,
          previousIndex: R,
          hasPrevious: T,
          hasNext: A,
          setSelectedIndex: U,
        } = ((e) => {
          let t,
            i,
            l,
            s,
            n,
            c,
            o = (0, a.c)(19),
            { itemCount: d, isLooping: m } = e,
            u = void 0 !== m && m,
            [f, h] = (0, r.useState)(0);
          o[0] !== d
            ? ((t = (e) => {
                h((t) => Math.max(0, Math.min(t + e, d - 1)));
              }),
              (o[0] = d),
              (o[1] = t))
            : (t = o[1]);
          let x = t;
          o[2] !== u || o[3] !== d || o[4] !== x
            ? ((i = () => {
                u ? h((e) => (e + 1) % d) : x(1);
              }),
              (o[2] = u),
              (o[3] = d),
              (o[4] = x),
              (o[5] = i))
            : (i = o[5]);
          let p = i;
          o[6] !== u || o[7] !== d || o[8] !== x
            ? ((l = () => {
                u ? h((e) => (e - 1 + d) % d) : x(-1);
              }),
              (o[6] = u),
              (o[7] = d),
              (o[8] = x),
              (o[9] = l))
            : (l = o[9]);
          let v = l,
            g = (d > 1 && u) || f > 0,
            b = (d > 1 && u) || f < d - 1;
          return (
            o[10] !== d
              ? ((s = () => {
                  h((e) => Math.min(e, Math.max(0, d - 1)));
                }),
                (n = [d]),
                (o[10] = d),
                (o[11] = s),
                (o[12] = n))
              : ((s = o[11]), (n = o[12])),
            (0, r.useEffect)(s, n),
            o[13] !== b ||
            o[14] !== g ||
            o[15] !== p ||
            o[16] !== v ||
            o[17] !== f
              ? ((c = {
                  selectedIndex: f,
                  nextIndex: p,
                  previousIndex: v,
                  hasPrevious: g,
                  hasNext: b,
                  setSelectedIndex: h,
                }),
                (o[13] = b),
                (o[14] = g),
                (o[15] = p),
                (o[16] = v),
                (o[17] = f),
                (o[18] = c))
              : (c = o[18]),
            c
          );
        })(f);
        E[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = { gapPx: L.c }), (E[2] = h))
          : (h = E[2]);
        let { containerRef: M, scrollRef: O, cardWidth: D } = (0, n.f)(h),
          F = (0, r.useRef)(!1),
          z = S.length - 1;
        (E[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = (e, t) => F.current || Math.abs(t - e) > 1), (E[3] = x))
          : (x = E[3]),
          E[4] !== D || E[5] !== O || E[6] !== P
            ? ((p = {
                selectedIndex: P,
                scrollRef: O,
                cardWidth: D,
                skipBehavior: "instant",
                isSkip: x,
              }),
              (E[4] = D),
              (E[5] = O),
              (E[6] = P),
              (E[7] = p))
            : (p = E[7]),
          (0, c.f)(p));
        let V = (e) => {
          ((F.current = !1), U(e));
        };
        E[8] !== z || E[9] !== C || E[10] !== P
          ? ((v = () => {
              ((F.current = P === z), C());
            }),
            (E[8] = z),
            (E[9] = C),
            (E[10] = P),
            (E[11] = v))
          : (v = E[11]);
        let W = v;
        E[12] !== R || E[13] !== P
          ? ((g = () => {
              ((F.current = 0 === P), R());
            }),
            (E[12] = R),
            (E[13] = P),
            (E[14] = g))
          : (g = E[14]);
        let H = g;
        (0, o.f)({ scrollRef: O, cardWidth: D, onSnapIndexChange: V });
        let q = d.HeroStage;
        (E[15] !== H || E[16] !== T || E[17] !== k
          ? ((b =
              T &&
              (0, t.jsx)(m, {
                className:
                  "absolute inset-y-0 left-0 z-20 hidden w-12 lg:flex xl:w-16",
                onClick: H,
                label: k("web.pagination.go_to_previous_page"),
                children: (0, t.jsx)(i.S, { size: 16 }),
              })),
            (E[15] = H),
            (E[16] = T),
            (E[17] = k),
            (E[18] = b))
          : (b = E[18]),
          E[19] !== W || E[20] !== A || E[21] !== k
            ? ((y =
                A &&
                (0, t.jsx)(m, {
                  className:
                    "absolute inset-y-0 right-0 z-20 hidden w-12 lg:flex xl:w-16",
                  onClick: W,
                  label: k("web.pagination.go_to_next_page"),
                  children: (0, t.jsx)(i.v$, { size: 16 }),
                })),
              (E[19] = W),
              (E[20] = A),
              (E[21] = k),
              (E[22] = y))
            : (y = E[22]),
          E[23] !== b || E[24] !== y
            ? ((_ = (0, t.jsxs)(t.Fragment, { children: [b, y] })),
              (E[23] = b),
              (E[24] = y),
              (E[25] = _))
            : (_ = E[25]));
        let B = S.map((e, a) => {
          let i = P === a;
          return (0, t.jsx)(
            "div",
            {
              className: (0, l.c)(
                L.F,
                "transition-[transform,opacity] duration-300 ease-out",
                i ? "opacity-100" : "scale-[0.94] opacity-50",
              ),
              "data-testid": "live-hero-slot",
              "data-selected": i,
              onClickCapture: (e) => {
                a !== P && (e.preventDefault(), e.stopPropagation(), V(a));
              },
              children: (0, t.jsx)(I, { isSelected: i, ...e }),
            },
            e.mint,
          );
        });
        return (
          E[26] !== q ||
          E[27] !== M ||
          E[28] !== O ||
          E[29] !== _ ||
          E[30] !== B
            ? ((j = (0, t.jsx)(q, {
                containerRef: M,
                scrollRef: O,
                overlay: _,
                children: B,
              })),
              (E[26] = q),
              (E[27] = M),
              (E[28] = O),
              (E[29] = _),
              (E[30] = B),
              (E[31] = j))
            : (j = E[31]),
          E[32] !== S.length || E[33] !== V || E[34] !== P
            ? ((w = (0, t.jsx)(u.PaginationDots, {
                count: S.length,
                selectedIndex: P,
                onSelect: V,
              })),
              (E[32] = S.length),
              (E[33] = V),
              (E[34] = P),
              (E[35] = w))
            : (w = E[35]),
          E[36] !== j || E[37] !== w
            ? ((N = (0, t.jsxs)("div", {
                className: "flex flex-col gap-3 isolate",
                children: [j, w],
              })),
              (E[36] = j),
              (E[37] = w),
              (E[38] = N))
            : (N = E[38]),
          N
        );
      },
    ],
    369731,
  );
};
