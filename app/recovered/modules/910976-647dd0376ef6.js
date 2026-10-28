// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(292686),
    r = e.i(322315),
    a = e.i(254010),
    n = e.i(365089),
    o = e.i(545063),
    s = e.i(179736),
    d = e.i(599077),
    u = e.i(352386),
    c = e.i(609488),
    m = e.i(462860),
    p = e.i(335703),
    f = e.i(782049),
    I = e.i(204478),
    h = e.i(662222),
    y = e.i(386028),
    g = e.i(337689),
    x = e.i(985688),
    v = e.i(790658),
    b = e.i(691471),
    C = e.i(404411),
    w = e.i(257505),
    M = e.i(690877),
    k = e.i(361308),
    U = e.i(76991);
  let _ = (e) =>
    null === e
      ? null
      : {
          coin: e.coin,
          displayName: e.displayName,
          ticker: e.ticker,
          imageUri: e.imageUri,
          szDecimals: e.szDecimals,
        };
  var j = e.i(662986),
    N = e.i(338319);
  let A = ["web.perps"];
  function P(e) {
    let l,
      r,
      a,
      n,
      o,
      s,
      d,
      u,
      c,
      m,
      p,
      f,
      I,
      h,
      y,
      g = (0, i.c)(65),
      {
        coin: x,
        perp: P,
        multiple: E,
        variant: q,
        density: T,
        className: B,
      } = e;
    g[0] !== x ? ((l = { coin: x }), (g[0] = x), (g[1] = l)) : (l = g[1]);
    let { data: R } = ((e) => {
        let t,
          l,
          r,
          a = (0, i.c)(8),
          { coin: n, enabled: o } = e;
        (a[0] !== n
          ? ((t = k.f.market(n)), (a[0] = n), (a[1] = t))
          : (t = a[1]),
          a[2] !== n
            ? ((l = (e) => {
                let { signal: t } = e;
                return (0, U.w)({ coin: n, signal: t });
              }),
              (a[2] = n),
              (a[3] = l))
            : (l = a[3]));
        let s = (void 0 === o || o) && n.length > 0;
        return (
          a[4] !== t || a[5] !== l || a[6] !== s
            ? ((r = {
                queryKey: t,
                queryFn: l,
                enabled: s,
                staleTime: 6e4,
                refetchOnWindowFocus: !1,
                select: _,
              }),
              (a[4] = t),
              (a[5] = l),
              (a[6] = s),
              (a[7] = r))
            : (r = a[7]),
          (0, M.useQuery)(r)
        );
      })(l),
      S = (0, w.f)(A);
    g[2] !== x || g[3] !== R?.ticker
      ? ((r = R?.ticker ?? (0, j.j)(x)),
        (g[2] = x),
        (g[3] = R?.ticker),
        (g[4] = r))
      : (r = g[4]);
    let z = r,
      F = R?.displayName ?? z,
      L = R?.imageUri ?? null;
    g[5] !== x || g[6] !== F || g[7] !== L || g[8] !== z
      ? ((a = { coin: x, displayName: F, ticker: z, imageUri: L }),
        (g[5] = x),
        (g[6] = F),
        (g[7] = L),
        (g[8] = z),
        (g[9] = a))
      : (a = g[9]);
    let $ = a,
      V = R?.displayName && R.displayName !== z ? R.displayName : null,
      D = V ? `${V} \xb7 ${C.$}` : C.$;
    g[10] !== S || g[11] !== R?.szDecimals || g[12] !== E || g[13] !== P
      ? ((n =
          P && S
            ? (0, t.jsx)(v.f, {
                perp: (0, j.z)(P),
                szDecimals: R?.szDecimals,
                multiple: E,
              })
            : null),
        (g[10] = S),
        (g[11] = R?.szDecimals),
        (g[12] = E),
        (g[13] = P),
        (g[14] = n))
      : (n = g[14]);
    let O = n;
    if ("strip" === (void 0 === q ? "feed" : q)) {
      let e, i, l, r, a, n;
      return (
        g[15] !== B
          ? ((e = (0, N.c)(
              "flex flex-col gap-1 rounded-md bg-bg-tertiary px-2 py-1.5 text-[12px] leading-4",
              B,
            )),
            (g[15] = B),
            (g[16] = e))
          : (e = g[16]),
        g[17] !== $
          ? ((i = (0, t.jsx)(b.f, {
              market: $,
              size: 20,
              ringClassName: "ring-bg-tertiary",
              testIdPrefix: "perp-callout-art",
            })),
            (g[17] = $),
            (g[18] = i))
          : (i = g[18]),
        g[19] !== z
          ? ((l = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-ticker",
              className: "shrink-0 font-medium text-text-primary",
              children: z,
            })),
            (g[19] = z),
            (g[20] = l))
          : (l = g[20]),
        g[21] !== D
          ? ((r = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-name",
              className:
                "min-w-0 flex-1 truncate text-[11px] text-text-quaternary",
              children: D,
            })),
            (g[21] = D),
            (g[22] = r))
          : (r = g[22]),
        g[23] !== i || g[24] !== l || g[25] !== r
          ? ((a = (0, t.jsxs)("div", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [i, l, r],
            })),
            (g[23] = i),
            (g[24] = l),
            (g[25] = r),
            (g[26] = a))
          : (a = g[26]),
        g[27] !== x || g[28] !== O || g[29] !== a || g[30] !== e
          ? ((n = (0, t.jsxs)("div", {
              "data-testid": "perp-callout-position-card",
              "data-variant": "strip",
              "data-coin": x,
              className: e,
              children: [a, O],
            })),
            (g[27] = x),
            (g[28] = O),
            (g[29] = a),
            (g[30] = e),
            (g[31] = n))
          : (n = g[31]),
        n
      );
    }
    let Q = "comfortable" === (void 0 === T ? "terminal" : T),
      H = !Q && "rounded-xl border border-border-secondary bg-bg-secondary p-3";
    g[32] !== B || g[33] !== H
      ? ((o = (0, N.c)(
          "flex w-full flex-wrap items-center gap-x-3 gap-y-1.5",
          H,
          B,
        )),
        (g[32] = B),
        (g[33] = H),
        (g[34] = o))
      : (o = g[34]);
    let K = Q ? 40 : 36,
      W = Q ? "ring-bg-primary" : "ring-bg-secondary";
    g[35] !== $ || g[36] !== K || g[37] !== W
      ? ((s = (0, t.jsx)(b.f, {
          market: $,
          size: K,
          ringClassName: W,
          testIdPrefix: "perp-callout-art",
        })),
        (g[35] = $),
        (g[36] = K),
        (g[37] = W),
        (g[38] = s))
      : (s = g[38]);
    let G = Q ? void 0 : "text-xs leading-4";
    g[39] !== G
      ? ((d = (0, N.c)("flex min-w-0 flex-1 flex-col gap-0.5", G)),
        (g[39] = G),
        (g[40] = d))
      : (d = g[40]);
    let X = Q && "text-sm";
    (g[41] !== X
      ? ((u = (0, N.c)("w-full truncate font-medium text-text-primary", X)),
        (g[41] = X),
        (g[42] = u))
      : (u = g[42]),
      g[43] !== u || g[44] !== z
        ? ((c = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-ticker",
            className: u,
            children: z,
          })),
          (g[43] = u),
          (g[44] = z),
          (g[45] = c))
        : (c = g[45]));
    let Z = Q ? "text-[13px] text-text-tertiary" : "text-text-quaternary";
    return (
      g[46] !== Z
        ? ((m = (0, N.c)("w-full truncate", Z)), (g[46] = Z), (g[47] = m))
        : (m = g[47]),
      g[48] !== m || g[49] !== D
        ? ((p = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-name",
            className: m,
            children: D,
          })),
          (g[48] = m),
          (g[49] = D),
          (g[50] = p))
        : (p = g[50]),
      g[51] !== d || g[52] !== c || g[53] !== p
        ? ((f = (0, t.jsxs)("div", { className: d, children: [c, p] })),
          (g[51] = d),
          (g[52] = c),
          (g[53] = p),
          (g[54] = f))
        : (f = g[54]),
      g[55] !== s || g[56] !== f
        ? ((I = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 basis-[12rem] items-center gap-2",
            children: [s, f],
          })),
          (g[55] = s),
          (g[56] = f),
          (g[57] = I))
        : (I = g[57]),
      g[58] !== O
        ? ((h = O
            ? (0, t.jsx)("div", {
                className: "flex min-w-0 flex-1 basis-[22rem] items-center",
                children: O,
              })
            : null),
          (g[58] = O),
          (g[59] = h))
        : (h = g[59]),
      g[60] !== x || g[61] !== o || g[62] !== I || g[63] !== h
        ? ((y = (0, t.jsxs)("div", {
            "data-testid": "perp-callout-position-card",
            "data-variant": "feed",
            "data-coin": x,
            className: o,
            children: [I, h],
          })),
          (g[60] = x),
          (g[61] = o),
          (g[62] = I),
          (g[63] = h),
          (g[64] = y))
        : (y = g[64]),
      y
    );
  }
  var E = e.i(875737),
    q = e.i(229937),
    T = e.i(701159),
    B = e.i(599066),
    R = e.i(741084),
    S = e.i(116549),
    z = e.i(481522),
    F = e.i(217004),
    L = e.i(210529),
    $ = e.i(986071),
    V = e.i(598005),
    D = e.i(860787),
    O = e.i(257004),
    Q = e.i(917341),
    H = e.i(889451),
    K = e.i(390767),
    W = e.i(137555),
    G = e.i(406288),
    X = e.i(839931),
    Z = e.i(338664),
    J = e.i(499141),
    Y = e.i(720772),
    ee = e.i(193504),
    et = e.i(595673),
    ei = e.i(198825),
    el = e.i(569526),
    er = e.i(634029);
  let ea = { mine: l.k9.CALLOUTS_FEED_MINE, other: l.k9.CALLOUTS_FEED_OTHER },
    en = (0, u.memo)((e) => {
      let l,
        v,
        b,
        C,
        w,
        M,
        k,
        U,
        _,
        N,
        A,
        en,
        eo,
        es,
        ed,
        eu,
        ec,
        em,
        ep,
        ef,
        eI,
        eh,
        ey,
        eg,
        ex,
        ev,
        eb,
        eC,
        ew,
        eM,
        ek,
        eU,
        e_,
        ej,
        eN,
        eA,
        eP,
        eE,
        eq,
        eT,
        eB = (0, i.c)(250),
        {
          entry: eR,
          coin: eS,
          card: ez,
          user: eF,
          position: eL,
          viewerAddress: e$,
          isLoggedIn: eV,
          viewerFollowing: eD,
          className: eO,
          surface: eQ,
          divider: eH,
          mediaPriority: eK,
          attachmentsSlot: eW,
          hideFollowButton: eG,
          followedHoldersAvatarSize: eX,
          hideXBadge: eZ,
          noteClassName: eJ,
          noteClampLines: eY,
          timeAlign: e1,
          hrefOverride: e0,
        } = e,
        e2 = void 0 === eQ ? "global_feed" : eQ,
        e4 = void 0 === eH ? "strong" : eH,
        e3 = void 0 !== eK && eK,
        { push: e5 } = (0, d.useRouter)(),
        e6 = (0, o.$)(),
        e9 = (0, s.s)(eR.authorCcUserId ?? eR.userId);
      if (eB[0] !== eR)
        ((l = {
          calloutId: eR.calloutId ?? eR.key,
          userId: eR.userId,
          authorCcUserId: eR.authorCcUserId,
          coinMint: eR.coinMint,
          marketCap: eR.marketCapUsd ?? 0,
          calloutPrice: 0,
          multiple: eR.multiple,
          createdAt: eR.createdAt,
          maxPriceSol: 0,
          note: eR.note,
          ...(null != eR.chain ? { chain: eR.chain } : {}),
          ...(eR.perp ? { perp: eR.perp } : {}),
          ...(null != eR.assetClass ? { assetClass: eR.assetClass } : {}),
          ...(eR.collectible ? { collectible: eR.collectible } : {}),
        }),
          (eB[0] = eR),
          (eB[1] = l));
      else l = eB[1];
      let e7 = l,
        e8 = (0, a.k)(r.D.WEB_PERPS, !1),
        te = (0, a.k)(r.D.WEB_PERPS_CALLOUT_FEED, !1);
      eB[2] !== eR
        ? ((v = (0, j.o)(eR)), (eB[2] = eR), (eB[3] = v))
        : (v = eB[3]);
      let tt = v,
        ti = e8 && tt,
        tl = (0, a.k)(r.D.WEB_PACKS, !1)
          ? ((0, Q.r)(eR.coinMint, eR) ?? (ez ? (0, Q.U)(ez, eR) : null))
          : null,
        tr = null !== tl,
        ta = ti ? encodeURIComponent(eR.coinMint) : eR.coinMint;
      eB[4] !== eR.coinMint || eB[5] !== ti
        ? ((b = ti ? (0, j.j)(eR.coinMint) : void 0),
          (eB[4] = eR.coinMint),
          (eB[5] = ti),
          (eB[6] = b))
        : (b = eB[6]);
      let tn = b,
        to = (0, L.q)(),
        { setLastClickImpression: ts } = (0, el.y)(),
        td = "home_feed" === e2;
      (eB[7] !== eR.positionId || eB[8] !== td
        ? ((C = td ? { positionId: eR.positionId } : {}),
          (eB[7] = eR.positionId),
          (eB[8] = td),
          (eB[9] = C))
        : (C = eB[9]),
        eB[10] !== eR.recommendationId ||
        eB[11] !== eR.recommendationRank ||
        eB[12] !== C
          ? ((w = {
              recommendationId: eR.recommendationId,
              recommendationRank: eR.recommendationRank,
              ...C,
            }),
            (eB[10] = eR.recommendationId),
            (eB[11] = eR.recommendationRank),
            (eB[12] = C),
            (eB[13] = w))
          : (w = eB[13]));
      let tu = w;
      eB[14] !== tu || eB[15] !== td
        ? ((M = td ? tu : {}), (eB[14] = tu), (eB[15] = td), (eB[16] = M))
        : (M = eB[16]);
      let tc = M;
      eB[17] !== eR.authorCcUserId || eB[18] !== eR.userId
        ? ((k = (0, O.r)({
            authorId: eR.userId,
            authorCcUserId: eR.authorCcUserId,
          })),
          (eB[17] = eR.authorCcUserId),
          (eB[18] = eR.userId),
          (eB[19] = k))
        : (k = eB[19]);
      let tm = k;
      eB[20] !== eR.coinChain || eB[21] !== td
        ? ((U = td ? (0, et.rc)(eR.coinChain) : void 0),
          (eB[20] = eR.coinChain),
          (eB[21] = td),
          (eB[22] = U))
        : (U = eB[22]);
      let tp = U;
      eB[23] !== e7 ||
      eB[24] !== tp ||
      eB[25] !== eS ||
      eB[26] !== eL ||
      eB[27] !== tu ||
      eB[28] !== e2
        ? ((_ = {
            surface: e2,
            callout: e7,
            position: eL,
            coin: eS,
            chain: tp,
            ...tu,
          }),
          (eB[23] = e7),
          (eB[24] = tp),
          (eB[25] = eS),
          (eB[26] = eL),
          (eB[27] = tu),
          (eB[28] = e2),
          (eB[29] = _))
        : (_ = eB[29]);
      let tf = (0, V.f)(_);
      eB[30] !== eR
        ? ((N = { mint: eR.coinMint, calloutId: eR.calloutId, embedded: eR }),
          (eB[30] = eR),
          (eB[31] = N))
        : (N = eB[31]);
      let tI = (0, F.f)(N),
        th = (tI.replyCount ?? 0) > 0;
      eB[32] !== eR.coinMint ||
      eB[33] !== eR.updates ||
      eB[34] !== eR.userId ||
      eB[35] !== tI.threadCalloutId ||
      eB[36] !== th
        ? ((A = {
            mint: eR.coinMint,
            calloutId: tI.threadCalloutId,
            authorAddress: eR.userId,
            enabled: th,
            embedded: eR.updates,
          }),
          (eB[32] = eR.coinMint),
          (eB[33] = eR.updates),
          (eB[34] = eR.userId),
          (eB[35] = tI.threadCalloutId),
          (eB[36] = th),
          (eB[37] = A))
        : (A = eB[37]);
      let ty = (0, z.f)(A);
      eB[38] !== tc ||
      eB[39] !== tp ||
      eB[40] !== eR.calloutId ||
      eB[41] !== eR.coinMint ||
      eB[42] !== e2 ||
      eB[43] !== e$
        ? ((en = {
            mint: eR.coinMint,
            calloutId: eR.calloutId,
            viewerAddress: e$,
            surface: e2,
            chain: tp,
            ...tc,
          }),
          (eB[38] = tc),
          (eB[39] = tp),
          (eB[40] = eR.calloutId),
          (eB[41] = eR.coinMint),
          (eB[42] = e2),
          (eB[43] = e$),
          (eB[44] = en))
        : (en = eB[44]);
      let tg = (0, T.f)(en);
      eB[45] !== eR.calloutId || eB[46] !== eR.coinMint || eB[47] !== e$
        ? ((eo = {
            mint: eR.coinMint,
            calloutId: eR.calloutId,
            viewerAddress: e$,
          }),
          (eB[45] = eR.calloutId),
          (eB[46] = eR.coinMint),
          (eB[47] = e$),
          (eB[48] = eo))
        : (eo = eB[48]);
      let tx = (0, B.f)(eo),
        { setShowWallet: tv } = (0, ei.useConnectWallet)(),
        [tb, tC] = (0, u.useState)(null);
      eB[49] !== tx || eB[50] !== tC || eB[51] !== tv || eB[52] !== e$
        ? ((es = () => {
            e$
              ? tx.resolveQuoteTarget().then((e) => {
                  e && tC(e);
                })
              : tv(!0);
          }),
          (eB[49] = tx),
          (eB[50] = tC),
          (eB[51] = tv),
          (eB[52] = e$),
          (eB[53] = es))
        : (es = eB[53]);
      let tw = es;
      eB[54] !== tc ||
      eB[55] !== eR.calloutId ||
      eB[56] !== eR.coinMint ||
      eB[57] !== tx ||
      eB[58] !== e2
        ? ((ed = () => {
            (!tx.isReposted &&
              eR.calloutId &&
              (0, et.Sw)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                isQuote: !1,
                surface: e2,
                ...tc,
              }),
              tx.toggle());
          }),
          (eB[54] = tc),
          (eB[55] = eR.calloutId),
          (eB[56] = eR.coinMint),
          (eB[57] = tx),
          (eB[58] = e2),
          (eB[59] = ed))
        : (ed = eB[59]);
      let tM = ed;
      eB[60] !== tc ||
      eB[61] !== tp ||
      eB[62] !== eR.calloutId ||
      eB[63] !== eR.coinMint ||
      eB[64] !== eR.userId ||
      eB[65] !== td ||
      eB[66] !== e2
        ? ((eu = () => {
            td &&
              (0, et.D)({
                mint: eR.coinMint,
                profileUserId: eR.userId,
                calloutId: eR.calloutId,
                surface: e2,
                chain: tp,
                ...tc,
              });
          }),
          (eB[60] = tc),
          (eB[61] = tp),
          (eB[62] = eR.calloutId),
          (eB[63] = eR.coinMint),
          (eB[64] = eR.userId),
          (eB[65] = td),
          (eB[66] = e2),
          (eB[67] = eu))
        : (eu = eB[67]);
      let tk = eu;
      eB[68] !== tc ||
      eB[69] !== tp ||
      eB[70] !== eR.calloutId ||
      eB[71] !== eR.coinMint ||
      eB[72] !== td ||
      eB[73] !== e2
        ? ((ec = () => {
            td &&
              (0, et.t4)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                surface: e2,
                chain: tp,
                ...tc,
              });
          }),
          (eB[68] = tc),
          (eB[69] = tp),
          (eB[70] = eR.calloutId),
          (eB[71] = eR.coinMint),
          (eB[72] = td),
          (eB[73] = e2),
          (eB[74] = ec))
        : (ec = eB[74]);
      let tU = ec,
        t_ = eF?.username?.trim() || eR.username || (0, n.d)(eR.userId, 4, 4),
        tj = (0, D.Z)({
          sourceUrl: (0, R.f)(eF?.profile_image) ?? (0, R.f)(eR.profileImage),
          width: D.z.list,
        }),
        tN = eR.quote;
      eB[75] !== ta || eB[76] !== tN
        ? ((em =
            tN?.calloutId != null
              ? (0, K.f)({
                  coinMint: ta,
                  calloutId: tN.calloutId,
                  replyId: tN.replyId,
                })
              : void 0),
          (eB[75] = ta),
          (eB[76] = tN),
          (eB[77] = em))
        : (em = eB[77]);
      let tA = em;
      eB[78] !== ta ||
      eB[79] !== eR.calloutId ||
      eB[80] !== eR.coinMint ||
      eB[81] !== eR.userId ||
      eB[82] !== ti
        ? ((ep = eR.calloutId
            ? `/callouts/${ta}/${eR.calloutId}`
            : ti
              ? (0, J.h)(eR.coinMint, { caller: eR.userId })
              : `/coin/${eR.coinMint}`),
          (eB[78] = ta),
          (eB[79] = eR.calloutId),
          (eB[80] = eR.coinMint),
          (eB[81] = eR.userId),
          (eB[82] = ti),
          (eB[83] = ep))
        : (ep = eB[83]);
      let tP = ep,
        tE = (0, S.k)();
      eB[84] !== ta ||
      eB[85] !== eR.calloutId ||
      eB[86] !== eR.coinMint ||
      eB[87] !== eR.userId ||
      eB[88] !== ti ||
      eB[89] !== te
        ? ((ef = ti
            ? eR.calloutId
              ? te
                ? (0, J.h)(eR.coinMint, {
                    [$.f.COIN.HIGHLIGHT_CALLOUT]: eR.calloutId,
                  })
                : `/callouts/${ta}/${eR.calloutId}`
              : (0, J.h)(eR.coinMint, { caller: eR.userId })
            : eR.calloutId
              ? `/coin/${eR.coinMint}?highlight_callout=${eR.calloutId}`
              : `/coin/${eR.coinMint}`),
          (eB[84] = ta),
          (eB[85] = eR.calloutId),
          (eB[86] = eR.coinMint),
          (eB[87] = eR.userId),
          (eB[88] = ti),
          (eB[89] = te),
          (eB[90] = ef))
        : (ef = eB[90]);
      let tq = ef,
        tT = (0, G.W)(tl?.provider) ?? void 0,
        tB = eR.calloutId
          ? (0, X.h)(eR.coinMint, eR.calloutId, tT)
          : (0, X.o)(eR.coinMint, void 0, tT),
        tR =
          e0 ?? tA ?? (tr ? tB : "home" === tE || "coin-rail" === tE ? tq : tP);
      eB[91] !== tf
        ? ((eI = { ref: tf }), (eB[91] = tf), (eB[92] = eI))
        : (eI = eB[92]);
      let tS = (0, x.f)(eI),
        tz = null !== tS,
        tF = "terminal" === tS,
        tL = "comfortable" === tS,
        t$ = "coin-rail" === tE,
        tV = t$ || !(void 0 !== eZ && eZ),
        tD = t$ || !(void 0 !== eG && eG),
        tO = eX ?? (tF ? "rail" : "md");
      eB[93] !== eR.isViewer || eB[94] !== eR.userId || eB[95] !== e6
        ? ((eh = !0 === eR.isViewer || e6(eR.userId)),
          (eB[93] = eR.isViewer),
          (eB[94] = eR.userId),
          (eB[95] = e6),
          (eB[96] = eh))
        : (eh = eB[96]);
      let tQ = eh,
        tH = tQ || e6(eR.authorCcUserId) ? void 0 : eR.calloutId,
        tK = eF?.address,
        tW = eF?.userId;
      if (
        eB[97] !== eR.userId ||
        eB[98] !== tK ||
        eB[99] !== tW ||
        eB[100] !== eD
      ) {
        let e = [eR.userId, tK, tW];
        ((ey = eD.ready
          ? e.some((e) => e && !0 === eD.isFollowing(e))
          : void 0),
          (eB[97] = eR.userId),
          (eB[98] = tK),
          (eB[99] = tW),
          (eB[100] = eD),
          (eB[101] = ey));
      } else ey = eB[101];
      let tG = ey;
      e: {
        if (!eV) {
          eg = void 0;
          break e;
        }
        if (void 0 !== tG) {
          eg = tG || (eR.viewerFollows ?? !1);
          break e;
        }
        if (null != eR.viewerFollows) {
          eg = eR.viewerFollows;
          break e;
        }
        eg = !!eD.isError && void 0;
      }
      let tX = eg,
        tZ =
          !ti && !tr && (0, Y.B)(eS)
            ? {
                mint: eR.coinMint,
                walletAddress: eR.userId,
                coin: eS,
                ownerLabel: t_,
              }
            : void 0;
      eB[102] !== tm ||
      eB[103] !== tp ||
      eB[104] !== eS?.usd_market_cap ||
      eB[105] !== tl ||
      eB[106] !== eR.calloutId ||
      eB[107] !== eR.coinMint ||
      eB[108] !== eR.marketCapUsd ||
      eB[109] !== eL ||
      eB[110] !== tu ||
      eB[111] !== e2 ||
      eB[112] !== to
        ? ((ex = () => {
            (tl && (0, er.C)((0, Z.A)(tl)),
              to({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                surface: e2,
                absolutePosition: eL,
                usdMarketCap: eS?.usd_market_cap ?? eR.marketCapUsd ?? void 0,
                chain: tp,
                ...tu,
                authorId: tm,
              }));
          }),
          (eB[102] = tm),
          (eB[103] = tp),
          (eB[104] = eS?.usd_market_cap),
          (eB[105] = tl),
          (eB[106] = eR.calloutId),
          (eB[107] = eR.coinMint),
          (eB[108] = eR.marketCapUsd),
          (eB[109] = eL),
          (eB[110] = tu),
          (eB[111] = e2),
          (eB[112] = to),
          (eB[113] = ex))
        : (ex = eB[113]);
      let tJ = ex,
        tY = tI.likeCount ?? 0,
        t1 = tI.likedByViewer,
        t0 = (0, ee.D)({
          mint: eR.coinMint,
          coin: eS ?? null,
          coinName: eS?.name ?? eR.coinName ?? null,
          coinSymbol: eS?.symbol ?? eR.coinSymbol ?? null,
          coinImageUri: eS?.image_uri ?? eR.coinImage ?? null,
          summary: (0, H.y)(eR.positionPnl),
          holder: {
            address: eR.userId,
            displayName: t_,
            avatarUrl: tj ?? null,
            isVerified: e9,
            xUsername: eF?.x_username ?? eR.xUsername ?? null,
          },
          callout: e7,
        });
      eB[114] !== t0
        ? ((ev = t0 ? { data: t0, sourceElement: ea } : null),
          (eB[114] = t0),
          (eB[115] = ev))
        : (ev = eB[115]);
      let t2 = ev;
      eB[116] !== eS ||
      eB[117] !== eR.coinMint ||
      eB[118] !== tr ||
      eB[119] !== ti
        ? ((eb =
            ti || tr
              ? null
              : {
                  mint: eR.coinMint,
                  chainId: eS?.chain_id,
                  fallbackMarketCap: eS?.usd_market_cap,
                  coin: eS,
                }),
          (eB[116] = eS),
          (eB[117] = eR.coinMint),
          (eB[118] = tr),
          (eB[119] = ti),
          (eB[120] = eb))
        : (eb = eB[120]);
      let t4 = eb;
      if (tt && !e8) return null;
      let t3 = eR.userId,
        t5 = eR.authorCcUserId,
        t6 = eF?.resolved_avatar_decoration ?? eR.resolvedAvatarDecoration,
        t9 = (tN && tN.createdAt) || eR.createdAt,
        t7 = tN ? tN.content : eR.note,
        t8 = tN ? void 0 : (eR.mediaUrl ?? tI.mediaUrl),
        ie = tN ? void 0 : ty,
        it = tF ? "dense" : tL ? "comfortable" : "compact";
      (eB[121] !== eR.xUsername || eB[122] !== tI.twitterUrl || eB[123] !== tV
        ? ((eC =
            tV && (eR.xUsername || tI.twitterUrl)
              ? (0, t.jsx)(E.f, {
                  xUsername: eR.xUsername,
                  twitterUrl: tI.twitterUrl,
                  iconOnly: !0,
                  className: "text-text-quaternary",
                })
              : void 0),
          (eB[121] = eR.xUsername),
          (eB[122] = tI.twitterUrl),
          (eB[123] = tV),
          (eB[124] = eC))
        : (eC = eB[124]),
        eB[125] !== tc ||
        eB[126] !== t_ ||
        eB[127] !== tp ||
        eB[128] !== eS ||
        eB[129] !== tL ||
        eB[130] !== eR.authorCcUserId ||
        eB[131] !== eR.calloutId ||
        eB[132] !== eR.coinMint ||
        eB[133] !== eR.followedHolders ||
        eB[134] !== eR.userId ||
        eB[135] !== tO ||
        eB[136] !== tX ||
        eB[137] !== eV ||
        eB[138] !== tQ ||
        eB[139] !== tH ||
        eB[140] !== tz ||
        eB[141] !== td ||
        eB[142] !== tD
          ? ((ew =
              eR.followedHolders?.holders.length || (!tQ && tD) || tH
                ? (0, t.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      eR.followedHolders?.holders.length
                        ? (0, t.jsx)(g.E, {
                            mint: eR.coinMint,
                            followedHolders: eR.followedHolders,
                            coin: eS,
                            avatarSize: tO,
                          })
                        : null,
                      tQ || !tD
                        ? null
                        : (0, t.jsx)(q.f, {
                            userAddress: eR.userId,
                            displayName: t_,
                            isLoggedIn: eV,
                            initialIsFollowing: tX,
                            variant: "icon",
                            size: "sm",
                            rounded: tz ? "md" : "full",
                            idle: tz ? "ghost" : "filled",
                            className: tz ? "[&_svg]:size-3.5" : void 0,
                            attribution: td
                              ? {
                                  mint: eR.coinMint,
                                  calloutId: eR.calloutId,
                                  chain: tp,
                                  ...tc,
                                }
                              : void 0,
                          }),
                      tH
                        ? (0, t.jsx)(c.f, {
                            target: { kind: "callout", id: tH },
                            author: { userId: eR.authorCcUserId, name: t_ },
                            density: tL ? "comfortable" : "terminal",
                          })
                        : null,
                    ],
                  })
                : void 0),
            (eB[125] = tc),
            (eB[126] = t_),
            (eB[127] = tp),
            (eB[128] = eS),
            (eB[129] = tL),
            (eB[130] = eR.authorCcUserId),
            (eB[131] = eR.calloutId),
            (eB[132] = eR.coinMint),
            (eB[133] = eR.followedHolders),
            (eB[134] = eR.userId),
            (eB[135] = tO),
            (eB[136] = tX),
            (eB[137] = eV),
            (eB[138] = tQ),
            (eB[139] = tH),
            (eB[140] = tz),
            (eB[141] = td),
            (eB[142] = tD),
            (eB[143] = ew))
          : (ew = eB[143]),
        eB[144] !== tF || eB[145] !== tN
          ? ((eM = tN
              ? (0, t.jsx)(y.f, { quoted: tN.quoted, dense: tF })
              : null),
            (eB[144] = tF),
            (eB[145] = tN),
            (eB[146] = eM))
          : (eM = eB[146]),
        eB[147] !== eS?.chain_id ||
        eB[148] !== eS?.image_uri ||
        eB[149] !== eS?.name ||
        eB[150] !== eS?.symbol ||
        eB[151] !== tl ||
        eB[152] !== tL ||
        eB[153] !== tF ||
        eB[154] !== eR.coinImage ||
        eB[155] !== eR.coinMint ||
        eB[156] !== eR.coinName ||
        eB[157] !== eR.coinSymbol ||
        eB[158] !== eR.multiple ||
        eB[159] !== eR.perp ||
        eB[160] !== eR.positionPnl ||
        eB[161] !== eR.userId ||
        eB[162] !== ti
          ? ((ek = ti
              ? (0, t.jsx)(P, {
                  coin: eR.coinMint,
                  perp: eR.perp ?? null,
                  multiple: eR.multiple,
                  variant: tF ? "strip" : "feed",
                  density: tL ? "comfortable" : "terminal",
                  className: "w-full",
                })
              : tl
                ? (0, t.jsx)(h.f, {
                    embed: tl,
                    variant: tF ? "strip" : "feed",
                    density: tL ? "comfortable" : "terminal",
                    className: "w-full",
                  })
                : (0, t.jsx)(p.f, {
                    mint: eR.coinMint,
                    authorAddress: eR.userId,
                    positionPnl: eR.positionPnl,
                    symbol: eS?.symbol ?? eR.coinSymbol,
                    name: eS?.name ?? eR.coinName,
                    imageUri: eS?.image_uri ?? eR.coinImage,
                    chainId: eS?.chain_id,
                    variant: tF ? "strip" : "feed",
                    density: tL ? "comfortable" : "terminal",
                    className: "w-full",
                  })),
            (eB[147] = eS?.chain_id),
            (eB[148] = eS?.image_uri),
            (eB[149] = eS?.name),
            (eB[150] = eS?.symbol),
            (eB[151] = tl),
            (eB[152] = tL),
            (eB[153] = tF),
            (eB[154] = eR.coinImage),
            (eB[155] = eR.coinMint),
            (eB[156] = eR.coinName),
            (eB[157] = eR.coinSymbol),
            (eB[158] = eR.multiple),
            (eB[159] = eR.perp),
            (eB[160] = eR.positionPnl),
            (eB[161] = eR.userId),
            (eB[162] = ti),
            (eB[163] = ek))
          : (ek = eB[163]));
      let ii = tS ?? void 0,
        il = tI.replyCount,
        ir = tI.viewCount;
      eB[164] !== eS?.usd_market_cap ||
      eB[165] !== tP ||
      eB[166] !== eR.calloutId ||
      eB[167] !== eR.coinMint ||
      eB[168] !== eR.marketCapUsd ||
      eB[169] !== eL ||
      eB[170] !== e5 ||
      eB[171] !== tu ||
      eB[172] !== td ||
      eB[173] !== ts ||
      eB[174] !== e2
        ? ((eU = eR.calloutId
            ? () => {
                if (td) {
                  let { sourceScreen: e, sourceElement: t } = (0, et.oj)(e2);
                  ts(eR.coinMint, {
                    itemPosition: eL,
                    marketCap: eS?.usd_market_cap ?? eR.marketCapUsd ?? 0,
                    sourceScreen: e,
                    sourceElement: t,
                    calloutId: eR.calloutId,
                    ...(tu.recommendationId
                      ? { rec_id: tu.recommendationId }
                      : {}),
                    ...(tu.positionId ? { positionId: tu.positionId } : {}),
                  });
                }
                e5(`${tP}?reply=1`);
              }
            : void 0),
          (eB[164] = eS?.usd_market_cap),
          (eB[165] = tP),
          (eB[166] = eR.calloutId),
          (eB[167] = eR.coinMint),
          (eB[168] = eR.marketCapUsd),
          (eB[169] = eL),
          (eB[170] = e5),
          (eB[171] = tu),
          (eB[172] = td),
          (eB[173] = ts),
          (eB[174] = e2),
          (eB[175] = eU))
        : (eU = eB[175]);
      let ia = tg.toggle;
      eB[176] !== eR.calloutId ||
      eB[177] !== tw ||
      eB[178] !== tM ||
      eB[179] !== tx ||
      eB[180] !== tI.repostCount ||
      eB[181] !== tI.repostedByViewer
        ? ((e_ = eR.calloutId
            ? {
                count: tI.repostCount ?? 0,
                active: tI.repostedByViewer,
                busy: tx.isBusy,
                onToggle: tM,
                onQuote: tw,
              }
            : void 0),
          (eB[176] = eR.calloutId),
          (eB[177] = tw),
          (eB[178] = tM),
          (eB[179] = tx),
          (eB[180] = tI.repostCount),
          (eB[181] = tI.repostedByViewer),
          (eB[182] = e_))
        : (e_ = eB[182]);
      let io = tn ?? eS?.symbol ?? eR.coinSymbol;
      (eB[183] !== t_ || eB[184] !== io
        ? ((ej = (0, W.f)(t_, io)),
          (eB[183] = t_),
          (eB[184] = io),
          (eB[185] = ej))
        : (ej = eB[185]),
        eB[186] !== tP ||
        eB[187] !== tU ||
        eB[188] !== tg.toggle ||
        eB[189] !== tY ||
        eB[190] !== t1 ||
        eB[191] !== t4 ||
        eB[192] !== tZ ||
        eB[193] !== tI.replyCount ||
        eB[194] !== tI.viewCount ||
        eB[195] !== t2 ||
        eB[196] !== ii ||
        eB[197] !== eU ||
        eB[198] !== e_ ||
        eB[199] !== ej
          ? ((eN = (0, t.jsx)(f.f, {
              density: ii,
              liveMarketCap: t4,
              replay: tZ,
              replyCount: il,
              viewCount: ir,
              onOpenReplies: eU,
              likeCount: tY,
              likedByViewer: t1,
              onToggleLike: ia,
              repost: e_,
              shareUrl: tP,
              onShareOpen: tU,
              sharePositionCard: t2,
              shareTitle: ej,
            })),
            (eB[186] = tP),
            (eB[187] = tU),
            (eB[188] = tg.toggle),
            (eB[189] = tY),
            (eB[190] = t1),
            (eB[191] = t4),
            (eB[192] = tZ),
            (eB[193] = tI.replyCount),
            (eB[194] = tI.viewCount),
            (eB[195] = t2),
            (eB[196] = ii),
            (eB[197] = eU),
            (eB[198] = e_),
            (eB[199] = ej),
            (eB[200] = eN))
          : (eN = eB[200]),
        eB[201] !== eW ||
        eB[202] !== tj ||
        eB[203] !== t_ ||
        eB[204] !== tR ||
        eB[205] !== eO ||
        eB[206] !== e4 ||
        eB[207] !== eR.authorCcUserId ||
        eB[208] !== eR.userId ||
        eB[209] !== tk ||
        eB[210] !== tJ ||
        eB[211] !== e9 ||
        eB[212] !== e3 ||
        eB[213] !== eY ||
        eB[214] !== eJ ||
        eB[215] !== t6 ||
        eB[216] !== t9 ||
        eB[217] !== t7 ||
        eB[218] !== t8 ||
        eB[219] !== ie ||
        eB[220] !== it ||
        eB[221] !== eC ||
        eB[222] !== ew ||
        eB[223] !== eM ||
        eB[224] !== ek ||
        eB[225] !== eN ||
        eB[226] !== e1
          ? ((eA = (0, t.jsxs)(I.f, {
              className: eO,
              authorAddress: t3,
              authorUserId: t5,
              authorName: t_,
              authorAvatarUrl: tj,
              authorAvatarDecoration: t6,
              authorVerified: e9,
              createdAt: t9,
              note: t7,
              mediaUrl: t8,
              mediaPriority: e3,
              noteClassName: eJ,
              noteClampLines: eY,
              timeAlign: e1,
              updates: ie,
              noteSize: "md",
              href: tR,
              onAuthorClick: tk,
              density: it,
              divider: e4,
              nameAdornment: eC,
              topRight: ew,
              onClick: tJ,
              testId: "feed-callout-card",
              children: [eM, ek, eW, eN],
            })),
            (eB[201] = eW),
            (eB[202] = tj),
            (eB[203] = t_),
            (eB[204] = tR),
            (eB[205] = eO),
            (eB[206] = e4),
            (eB[207] = eR.authorCcUserId),
            (eB[208] = eR.userId),
            (eB[209] = tk),
            (eB[210] = tJ),
            (eB[211] = e9),
            (eB[212] = e3),
            (eB[213] = eY),
            (eB[214] = eJ),
            (eB[215] = t6),
            (eB[216] = t9),
            (eB[217] = t7),
            (eB[218] = t8),
            (eB[219] = ie),
            (eB[220] = it),
            (eB[221] = eC),
            (eB[222] = ew),
            (eB[223] = eM),
            (eB[224] = ek),
            (eB[225] = eN),
            (eB[226] = e1),
            (eB[227] = eA))
          : (eA = eB[227]));
      let is = null !== tb;
      eB[228] !== tC
        ? ((eP = (e) => {
            e || tC(null);
          }),
          (eB[228] = tC),
          (eB[229] = eP))
        : (eP = eB[229]);
      let id = tn ?? eS?.symbol ?? eR.coinSymbol;
      return (
        eB[230] !== tc ||
        eB[231] !== eR.calloutId ||
        eB[232] !== eR.coinMint ||
        eB[233] !== e2
          ? ((eE = () => {
              (0, et.Sw)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                isQuote: !0,
                surface: e2,
                ...tc,
              });
            }),
            (eB[230] = tc),
            (eB[231] = eR.calloutId),
            (eB[232] = eR.coinMint),
            (eB[233] = e2),
            (eB[234] = eE))
          : (eE = eB[234]),
        eB[235] !== t_ ||
        eB[236] !== eR.calloutId ||
        eB[237] !== eR.coinMint ||
        eB[238] !== eR.createdAt ||
        eB[239] !== eR.note ||
        eB[240] !== tb ||
        eB[241] !== is ||
        eB[242] !== eP ||
        eB[243] !== id ||
        eB[244] !== eE
          ? ((eq = (0, t.jsx)(m.f, {
              isOpen: is,
              onOpenChange: eP,
              mint: eR.coinMint,
              calloutId: tb,
              cacheCalloutId: eR.calloutId,
              quotedAuthorName: t_,
              quotedNote: eR.note,
              quotedSymbol: id,
              quotedCreatedAt: eR.createdAt,
              onPosted: eE,
            })),
            (eB[235] = t_),
            (eB[236] = eR.calloutId),
            (eB[237] = eR.coinMint),
            (eB[238] = eR.createdAt),
            (eB[239] = eR.note),
            (eB[240] = tb),
            (eB[241] = is),
            (eB[242] = eP),
            (eB[243] = id),
            (eB[244] = eE),
            (eB[245] = eq))
          : (eq = eB[245]),
        eB[246] !== tf || eB[247] !== eA || eB[248] !== eq
          ? ((eT = (0, t.jsxs)("div", { ref: tf, children: [eA, eq] })),
            (eB[246] = tf),
            (eB[247] = eA),
            (eB[248] = eq),
            (eB[249] = eT))
          : (eT = eB[249]),
        eT
      );
    });
  e.s(["f", 0, en], 910976);
};
