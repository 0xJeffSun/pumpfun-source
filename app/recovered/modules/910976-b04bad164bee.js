// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(292686),
    r = e.i(322315),
    a = e.i(254010),
    o = e.i(365089),
    n = e.i(545063),
    s = e.i(179736),
    d = e.i(599077),
    c = e.i(352386),
    u = e.i(609488),
    m = e.i(462860),
    p = e.i(335703),
    f = e.i(782049),
    h = e.i(204478),
    I = e.i(662222),
    x = e.i(386028),
    y = e.i(337689),
    b = e.i(985688),
    g = e.i(790658),
    v = e.i(691471),
    C = e.i(404411),
    w = e.i(257505),
    k = e.i(690877),
    M = e.i(361308),
    N = e.i(76991);
  let j = (e) =>
    null === e
      ? null
      : {
          coin: e.coin,
          displayName: e.displayName,
          ticker: e.ticker,
          imageUri: e.imageUri,
          szDecimals: e.szDecimals,
        };
  var _ = e.i(662986),
    U = e.i(338319);
  let S = ["web.perps"];
  function A(e) {
    let l,
      r,
      a,
      o,
      n,
      s,
      d,
      c,
      u,
      m,
      p,
      f,
      h,
      I,
      x,
      y = (0, i.c)(65),
      {
        coin: b,
        perp: A,
        multiple: E,
        variant: P,
        density: z,
        className: T,
      } = e;
    y[0] !== b ? ((l = { coin: b }), (y[0] = b), (y[1] = l)) : (l = y[1]);
    let { data: R } = ((e) => {
        let t,
          l,
          r,
          a = (0, i.c)(8),
          { coin: o, enabled: n } = e;
        (a[0] !== o
          ? ((t = M.f.market(o)), (a[0] = o), (a[1] = t))
          : (t = a[1]),
          a[2] !== o
            ? ((l = (e) => {
                let { signal: t } = e;
                return (0, N.w)({ coin: o, signal: t });
              }),
              (a[2] = o),
              (a[3] = l))
            : (l = a[3]));
        let s = (void 0 === n || n) && o.length > 0;
        return (
          a[4] !== t || a[5] !== l || a[6] !== s
            ? ((r = {
                queryKey: t,
                queryFn: l,
                enabled: s,
                staleTime: 6e4,
                refetchOnWindowFocus: !1,
                select: j,
              }),
              (a[4] = t),
              (a[5] = l),
              (a[6] = s),
              (a[7] = r))
            : (r = a[7]),
          (0, k.useQuery)(r)
        );
      })(l),
      D = (0, w.f)(S);
    y[2] !== b || y[3] !== R?.ticker
      ? ((r = R?.ticker ?? (0, _.j)(b)),
        (y[2] = b),
        (y[3] = R?.ticker),
        (y[4] = r))
      : (r = y[4]);
    let $ = r,
      q = R?.displayName ?? $,
      B = R?.imageUri ?? null;
    y[5] !== b || y[6] !== q || y[7] !== B || y[8] !== $
      ? ((a = { coin: b, displayName: q, ticker: $, imageUri: B }),
        (y[5] = b),
        (y[6] = q),
        (y[7] = B),
        (y[8] = $),
        (y[9] = a))
      : (a = y[9]);
    let F = a,
      O = R?.displayName && R.displayName !== $ ? R.displayName : null,
      H = O ? `${O} \xb7 ${C.$}` : C.$;
    y[10] !== D || y[11] !== R?.szDecimals || y[12] !== E || y[13] !== A
      ? ((o =
          A && D
            ? (0, t.jsx)(g.f, {
                perp: (0, _.z)(A),
                szDecimals: R?.szDecimals,
                multiple: E,
              })
            : null),
        (y[10] = D),
        (y[11] = R?.szDecimals),
        (y[12] = E),
        (y[13] = A),
        (y[14] = o))
      : (o = y[14]);
    let L = o;
    if ("strip" === (void 0 === P ? "feed" : P)) {
      let e, i, l, r, a, o;
      return (
        y[15] !== T
          ? ((e = (0, U.c)(
              "flex flex-col gap-1 rounded-md bg-bg-tertiary px-2 py-1.5 text-[12px] leading-4",
              T,
            )),
            (y[15] = T),
            (y[16] = e))
          : (e = y[16]),
        y[17] !== F
          ? ((i = (0, t.jsx)(v.f, {
              market: F,
              size: 20,
              ringClassName: "ring-bg-tertiary",
              testIdPrefix: "perp-callout-art",
            })),
            (y[17] = F),
            (y[18] = i))
          : (i = y[18]),
        y[19] !== $
          ? ((l = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-ticker",
              className: "shrink-0 font-medium text-text-primary",
              children: $,
            })),
            (y[19] = $),
            (y[20] = l))
          : (l = y[20]),
        y[21] !== H
          ? ((r = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-name",
              className:
                "min-w-0 flex-1 truncate text-[11px] text-text-quaternary",
              children: H,
            })),
            (y[21] = H),
            (y[22] = r))
          : (r = y[22]),
        y[23] !== i || y[24] !== l || y[25] !== r
          ? ((a = (0, t.jsxs)("div", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [i, l, r],
            })),
            (y[23] = i),
            (y[24] = l),
            (y[25] = r),
            (y[26] = a))
          : (a = y[26]),
        y[27] !== b || y[28] !== L || y[29] !== a || y[30] !== e
          ? ((o = (0, t.jsxs)("div", {
              "data-testid": "perp-callout-position-card",
              "data-variant": "strip",
              "data-coin": b,
              className: e,
              children: [a, L],
            })),
            (y[27] = b),
            (y[28] = L),
            (y[29] = a),
            (y[30] = e),
            (y[31] = o))
          : (o = y[31]),
        o
      );
    }
    let V = "comfortable" === (void 0 === z ? "terminal" : z),
      Q = !V && "rounded-xl border border-border-secondary bg-bg-secondary p-3";
    y[32] !== T || y[33] !== Q
      ? ((n = (0, U.c)(
          "flex w-full flex-wrap items-center gap-x-3 gap-y-1.5",
          Q,
          T,
        )),
        (y[32] = T),
        (y[33] = Q),
        (y[34] = n))
      : (n = y[34]);
    let W = V ? 40 : 36,
      K = V ? "ring-bg-primary" : "ring-bg-secondary";
    y[35] !== F || y[36] !== W || y[37] !== K
      ? ((s = (0, t.jsx)(v.f, {
          market: F,
          size: W,
          ringClassName: K,
          testIdPrefix: "perp-callout-art",
        })),
        (y[35] = F),
        (y[36] = W),
        (y[37] = K),
        (y[38] = s))
      : (s = y[38]);
    let G = V ? void 0 : "text-xs leading-4";
    y[39] !== G
      ? ((d = (0, U.c)("flex min-w-0 flex-1 flex-col gap-0.5", G)),
        (y[39] = G),
        (y[40] = d))
      : (d = y[40]);
    let Z = V && "text-sm";
    (y[41] !== Z
      ? ((c = (0, U.c)("w-full truncate font-medium text-text-primary", Z)),
        (y[41] = Z),
        (y[42] = c))
      : (c = y[42]),
      y[43] !== c || y[44] !== $
        ? ((u = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-ticker",
            className: c,
            children: $,
          })),
          (y[43] = c),
          (y[44] = $),
          (y[45] = u))
        : (u = y[45]));
    let J = V ? "text-[13px] text-text-tertiary" : "text-text-quaternary";
    return (
      y[46] !== J
        ? ((m = (0, U.c)("w-full truncate", J)), (y[46] = J), (y[47] = m))
        : (m = y[47]),
      y[48] !== m || y[49] !== H
        ? ((p = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-name",
            className: m,
            children: H,
          })),
          (y[48] = m),
          (y[49] = H),
          (y[50] = p))
        : (p = y[50]),
      y[51] !== d || y[52] !== u || y[53] !== p
        ? ((f = (0, t.jsxs)("div", { className: d, children: [u, p] })),
          (y[51] = d),
          (y[52] = u),
          (y[53] = p),
          (y[54] = f))
        : (f = y[54]),
      y[55] !== s || y[56] !== f
        ? ((h = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 basis-[12rem] items-center gap-2",
            children: [s, f],
          })),
          (y[55] = s),
          (y[56] = f),
          (y[57] = h))
        : (h = y[57]),
      y[58] !== L
        ? ((I = L
            ? (0, t.jsx)("div", {
                className: "flex min-w-0 flex-1 basis-[22rem] items-center",
                children: L,
              })
            : null),
          (y[58] = L),
          (y[59] = I))
        : (I = y[59]),
      y[60] !== b || y[61] !== n || y[62] !== h || y[63] !== I
        ? ((x = (0, t.jsxs)("div", {
            "data-testid": "perp-callout-position-card",
            "data-variant": "feed",
            "data-coin": b,
            className: n,
            children: [h, I],
          })),
          (y[60] = b),
          (y[61] = n),
          (y[62] = h),
          (y[63] = I),
          (y[64] = x))
        : (x = y[64]),
      x
    );
  }
  var E = e.i(875737),
    P = e.i(229937),
    z = e.i(701159),
    T = e.i(599066),
    R = e.i(741084),
    D = e.i(116549),
    $ = e.i(481522),
    q = e.i(217004),
    B = e.i(210529),
    F = e.i(986071),
    O = e.i(598005),
    H = e.i(860787),
    L = e.i(257004),
    V = e.i(917341),
    Q = e.i(889451),
    W = e.i(390767),
    K = e.i(137555),
    G = e.i(406288),
    Z = e.i(839931),
    J = e.i(338664),
    X = e.i(499141),
    Y = e.i(720772),
    ee = e.i(193504),
    et = e.i(595673),
    ei = e.i(198825),
    el = e.i(569526),
    er = e.i(634029);
  let ea = { mine: l.k9.CALLOUTS_FEED_MINE, other: l.k9.CALLOUTS_FEED_OTHER },
    eo = (0, c.memo)((e) => {
      let l,
        g,
        v,
        C,
        w,
        k,
        M,
        N,
        j,
        U,
        S,
        eo,
        en,
        es,
        ed,
        ec,
        eu,
        em,
        ep,
        ef,
        eh,
        eI,
        ex,
        ey,
        eb,
        eg,
        ev,
        eC,
        ew,
        ek,
        eM,
        eN,
        ej,
        e_,
        eU,
        eS,
        eA,
        eE,
        eP,
        ez,
        eT = (0, i.c)(250),
        {
          entry: eR,
          coin: eD,
          card: e$,
          user: eq,
          position: eB,
          viewerAddress: eF,
          isLoggedIn: eO,
          viewerFollowing: eH,
          className: eL,
          surface: eV,
          divider: eQ,
          mediaPriority: eW,
          attachmentsSlot: eK,
          hideFollowButton: eG,
          followedHoldersAvatarSize: eZ,
          hideXBadge: eJ,
          noteClassName: eX,
          noteClampLines: eY,
          timeAlign: e1,
          hrefOverride: e0,
        } = e,
        e2 = void 0 === eV ? "global_feed" : eV,
        e3 = void 0 === eQ ? "strong" : eQ,
        e4 = void 0 !== eW && eW,
        { push: e5 } = (0, d.useRouter)(),
        e6 = (0, n.$)(),
        e8 = (0, s.s)(eR.authorCcUserId ?? eR.userId);
      if (eT[0] !== eR)
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
          (eT[0] = eR),
          (eT[1] = l));
      else l = eT[1];
      let e9 = l,
        e7 = (0, a.k)(r.D.WEB_PERPS, !1),
        te = (0, a.k)(r.D.WEB_PERPS_CALLOUT_FEED, !1);
      eT[2] !== eR
        ? ((g = (0, _.o)(eR)), (eT[2] = eR), (eT[3] = g))
        : (g = eT[3]);
      let tt = g,
        ti = e7 && tt,
        tl = (0, a.k)(r.D.WEB_PACKS, !1)
          ? ((0, V.r)(eR.coinMint, eR) ?? (e$ ? (0, V.U)(e$, eR) : null))
          : null,
        tr = null !== tl,
        ta = ti ? encodeURIComponent(eR.coinMint) : eR.coinMint;
      eT[4] !== eR.coinMint || eT[5] !== ti
        ? ((v = ti ? (0, _.j)(eR.coinMint) : void 0),
          (eT[4] = eR.coinMint),
          (eT[5] = ti),
          (eT[6] = v))
        : (v = eT[6]);
      let to = v,
        tn = (0, B.q)(),
        { setLastClickImpression: ts } = (0, el.y)(),
        td = "home_feed" === e2;
      (eT[7] !== eR.positionId || eT[8] !== td
        ? ((C = td ? { positionId: eR.positionId } : {}),
          (eT[7] = eR.positionId),
          (eT[8] = td),
          (eT[9] = C))
        : (C = eT[9]),
        eT[10] !== eR.recommendationId ||
        eT[11] !== eR.recommendationRank ||
        eT[12] !== C
          ? ((w = {
              recommendationId: eR.recommendationId,
              recommendationRank: eR.recommendationRank,
              ...C,
            }),
            (eT[10] = eR.recommendationId),
            (eT[11] = eR.recommendationRank),
            (eT[12] = C),
            (eT[13] = w))
          : (w = eT[13]));
      let tc = w;
      eT[14] !== tc || eT[15] !== td
        ? ((k = td ? tc : {}), (eT[14] = tc), (eT[15] = td), (eT[16] = k))
        : (k = eT[16]);
      let tu = k;
      eT[17] !== eR.authorCcUserId || eT[18] !== eR.userId
        ? ((M = (0, L.r)({
            authorId: eR.userId,
            authorCcUserId: eR.authorCcUserId,
          })),
          (eT[17] = eR.authorCcUserId),
          (eT[18] = eR.userId),
          (eT[19] = M))
        : (M = eT[19]);
      let tm = M;
      eT[20] !== eR.coinChain || eT[21] !== td
        ? ((N = td ? (0, et.rc)(eR.coinChain) : void 0),
          (eT[20] = eR.coinChain),
          (eT[21] = td),
          (eT[22] = N))
        : (N = eT[22]);
      let tp = N;
      eT[23] !== e9 ||
      eT[24] !== tp ||
      eT[25] !== eD ||
      eT[26] !== eB ||
      eT[27] !== tc ||
      eT[28] !== e2
        ? ((j = {
            surface: e2,
            callout: e9,
            position: eB,
            coin: eD,
            chain: tp,
            ...tc,
          }),
          (eT[23] = e9),
          (eT[24] = tp),
          (eT[25] = eD),
          (eT[26] = eB),
          (eT[27] = tc),
          (eT[28] = e2),
          (eT[29] = j))
        : (j = eT[29]);
      let tf = (0, O.f)(j);
      eT[30] !== eR
        ? ((U = { mint: eR.coinMint, calloutId: eR.calloutId, embedded: eR }),
          (eT[30] = eR),
          (eT[31] = U))
        : (U = eT[31]);
      let th = (0, q.f)(U),
        tI = (th.replyCount ?? 0) > 0;
      eT[32] !== eR.coinMint ||
      eT[33] !== eR.updates ||
      eT[34] !== eR.userId ||
      eT[35] !== th.threadCalloutId ||
      eT[36] !== tI
        ? ((S = {
            mint: eR.coinMint,
            calloutId: th.threadCalloutId,
            authorAddress: eR.userId,
            enabled: tI,
            embedded: eR.updates,
          }),
          (eT[32] = eR.coinMint),
          (eT[33] = eR.updates),
          (eT[34] = eR.userId),
          (eT[35] = th.threadCalloutId),
          (eT[36] = tI),
          (eT[37] = S))
        : (S = eT[37]);
      let tx = (0, $.f)(S);
      eT[38] !== tu ||
      eT[39] !== tp ||
      eT[40] !== eR.calloutId ||
      eT[41] !== eR.coinMint ||
      eT[42] !== e2 ||
      eT[43] !== eF
        ? ((eo = {
            mint: eR.coinMint,
            calloutId: eR.calloutId,
            viewerAddress: eF,
            surface: e2,
            chain: tp,
            ...tu,
          }),
          (eT[38] = tu),
          (eT[39] = tp),
          (eT[40] = eR.calloutId),
          (eT[41] = eR.coinMint),
          (eT[42] = e2),
          (eT[43] = eF),
          (eT[44] = eo))
        : (eo = eT[44]);
      let ty = (0, z.f)(eo);
      eT[45] !== eR.calloutId || eT[46] !== eR.coinMint || eT[47] !== eF
        ? ((en = {
            mint: eR.coinMint,
            calloutId: eR.calloutId,
            viewerAddress: eF,
          }),
          (eT[45] = eR.calloutId),
          (eT[46] = eR.coinMint),
          (eT[47] = eF),
          (eT[48] = en))
        : (en = eT[48]);
      let tb = (0, T.f)(en),
        { setShowWallet: tg } = (0, ei.useConnectWallet)(),
        [tv, tC] = (0, c.useState)(null);
      eT[49] !== tb || eT[50] !== tC || eT[51] !== tg || eT[52] !== eF
        ? ((es = () => {
            eF
              ? tb.resolveQuoteTarget().then((e) => {
                  e && tC(e);
                })
              : tg(!0);
          }),
          (eT[49] = tb),
          (eT[50] = tC),
          (eT[51] = tg),
          (eT[52] = eF),
          (eT[53] = es))
        : (es = eT[53]);
      let tw = es;
      eT[54] !== tu ||
      eT[55] !== eR.calloutId ||
      eT[56] !== eR.coinMint ||
      eT[57] !== tb ||
      eT[58] !== e2
        ? ((ed = () => {
            (!tb.isReposted &&
              eR.calloutId &&
              (0, et.Sw)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                isQuote: !1,
                surface: e2,
                ...tu,
              }),
              tb.toggle());
          }),
          (eT[54] = tu),
          (eT[55] = eR.calloutId),
          (eT[56] = eR.coinMint),
          (eT[57] = tb),
          (eT[58] = e2),
          (eT[59] = ed))
        : (ed = eT[59]);
      let tk = ed;
      eT[60] !== tu ||
      eT[61] !== tp ||
      eT[62] !== eR.calloutId ||
      eT[63] !== eR.coinMint ||
      eT[64] !== eR.userId ||
      eT[65] !== td ||
      eT[66] !== e2
        ? ((ec = () => {
            td &&
              (0, et.D)({
                mint: eR.coinMint,
                profileUserId: eR.userId,
                calloutId: eR.calloutId,
                surface: e2,
                chain: tp,
                ...tu,
              });
          }),
          (eT[60] = tu),
          (eT[61] = tp),
          (eT[62] = eR.calloutId),
          (eT[63] = eR.coinMint),
          (eT[64] = eR.userId),
          (eT[65] = td),
          (eT[66] = e2),
          (eT[67] = ec))
        : (ec = eT[67]);
      let tM = ec;
      eT[68] !== tu ||
      eT[69] !== tp ||
      eT[70] !== eR.calloutId ||
      eT[71] !== eR.coinMint ||
      eT[72] !== td ||
      eT[73] !== e2
        ? ((eu = () => {
            td &&
              (0, et.t4)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                surface: e2,
                chain: tp,
                ...tu,
              });
          }),
          (eT[68] = tu),
          (eT[69] = tp),
          (eT[70] = eR.calloutId),
          (eT[71] = eR.coinMint),
          (eT[72] = td),
          (eT[73] = e2),
          (eT[74] = eu))
        : (eu = eT[74]);
      let tN = eu,
        tj = eq?.username?.trim() || eR.username || (0, o.d)(eR.userId, 4, 4),
        t_ = (0, H.Z)({
          sourceUrl: (0, R.f)(eq?.profile_image) ?? (0, R.f)(eR.profileImage),
          width: H.z.list,
        }),
        tU = eR.quote;
      eT[75] !== ta || eT[76] !== tU
        ? ((em =
            tU?.calloutId != null
              ? (0, W.f)({
                  coinMint: ta,
                  calloutId: tU.calloutId,
                  replyId: tU.replyId,
                })
              : void 0),
          (eT[75] = ta),
          (eT[76] = tU),
          (eT[77] = em))
        : (em = eT[77]);
      let tS = em;
      eT[78] !== ta ||
      eT[79] !== eR.calloutId ||
      eT[80] !== eR.coinMint ||
      eT[81] !== eR.userId ||
      eT[82] !== ti
        ? ((ep = eR.calloutId
            ? `/callouts/${ta}/${eR.calloutId}`
            : ti
              ? (0, X.h)(eR.coinMint, { caller: eR.userId })
              : `/coin/${eR.coinMint}`),
          (eT[78] = ta),
          (eT[79] = eR.calloutId),
          (eT[80] = eR.coinMint),
          (eT[81] = eR.userId),
          (eT[82] = ti),
          (eT[83] = ep))
        : (ep = eT[83]);
      let tA = ep,
        tE = (0, D.k)();
      eT[84] !== ta ||
      eT[85] !== eR.calloutId ||
      eT[86] !== eR.coinMint ||
      eT[87] !== eR.userId ||
      eT[88] !== ti ||
      eT[89] !== te
        ? ((ef = ti
            ? eR.calloutId
              ? te
                ? (0, X.h)(eR.coinMint, {
                    [F.f.COIN.HIGHLIGHT_CALLOUT]: eR.calloutId,
                  })
                : `/callouts/${ta}/${eR.calloutId}`
              : (0, X.h)(eR.coinMint, { caller: eR.userId })
            : eR.calloutId
              ? `/coin/${eR.coinMint}?highlight_callout=${eR.calloutId}`
              : `/coin/${eR.coinMint}`),
          (eT[84] = ta),
          (eT[85] = eR.calloutId),
          (eT[86] = eR.coinMint),
          (eT[87] = eR.userId),
          (eT[88] = ti),
          (eT[89] = te),
          (eT[90] = ef))
        : (ef = eT[90]);
      let tP = ef,
        tz = (0, G.W)(tl?.provider) ?? void 0,
        tT = eR.calloutId
          ? (0, Z.h)(eR.coinMint, eR.calloutId, tz)
          : (0, Z.o)(eR.coinMint, void 0, tz),
        tR =
          e0 ?? tS ?? (tr ? tT : "home" === tE || "coin-rail" === tE ? tP : tA);
      eT[91] !== tf
        ? ((eh = { ref: tf }), (eT[91] = tf), (eT[92] = eh))
        : (eh = eT[92]);
      let tD = (0, b.f)(eh),
        t$ = null !== tD,
        tq = "terminal" === tD,
        tB = "comfortable" === tD,
        tF = "coin-rail" === tE,
        tO = tF || !(void 0 !== eJ && eJ),
        tH = tF || !(void 0 !== eG && eG),
        tL = eZ ?? (tq ? "rail" : "md");
      eT[93] !== eR.isViewer || eT[94] !== eR.userId || eT[95] !== e6
        ? ((eI = !0 === eR.isViewer || e6(eR.userId)),
          (eT[93] = eR.isViewer),
          (eT[94] = eR.userId),
          (eT[95] = e6),
          (eT[96] = eI))
        : (eI = eT[96]);
      let tV = eI,
        tQ = tV || e6(eR.authorCcUserId) ? void 0 : eR.calloutId,
        tW = eq?.address,
        tK = eq?.userId;
      if (
        eT[97] !== eR.userId ||
        eT[98] !== tW ||
        eT[99] !== tK ||
        eT[100] !== eH
      ) {
        let e = [eR.userId, tW, tK];
        ((ex = eH.ready
          ? e.some((e) => e && !0 === eH.isFollowing(e))
          : void 0),
          (eT[97] = eR.userId),
          (eT[98] = tW),
          (eT[99] = tK),
          (eT[100] = eH),
          (eT[101] = ex));
      } else ex = eT[101];
      let tG = ex;
      e: {
        if (!eO) {
          ey = void 0;
          break e;
        }
        if (void 0 !== tG) {
          ey = tG || (eR.viewerFollows ?? !1);
          break e;
        }
        if (null != eR.viewerFollows) {
          ey = eR.viewerFollows;
          break e;
        }
        ey = !!eH.isError && void 0;
      }
      let tZ = ey,
        tJ =
          !ti && !tr && (0, Y.B)(eD)
            ? {
                mint: eR.coinMint,
                walletAddress: eR.userId,
                coin: eD,
                ownerLabel: tj,
              }
            : void 0;
      eT[102] !== tm ||
      eT[103] !== tp ||
      eT[104] !== eD?.usd_market_cap ||
      eT[105] !== tl ||
      eT[106] !== eR.calloutId ||
      eT[107] !== eR.coinMint ||
      eT[108] !== eR.marketCapUsd ||
      eT[109] !== eB ||
      eT[110] !== tc ||
      eT[111] !== e2 ||
      eT[112] !== tn
        ? ((eb = () => {
            (tl && (0, er.C)((0, J.A)(tl)),
              tn({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                surface: e2,
                absolutePosition: eB,
                usdMarketCap: eD?.usd_market_cap ?? eR.marketCapUsd ?? void 0,
                chain: tp,
                ...tc,
                authorId: tm,
              }));
          }),
          (eT[102] = tm),
          (eT[103] = tp),
          (eT[104] = eD?.usd_market_cap),
          (eT[105] = tl),
          (eT[106] = eR.calloutId),
          (eT[107] = eR.coinMint),
          (eT[108] = eR.marketCapUsd),
          (eT[109] = eB),
          (eT[110] = tc),
          (eT[111] = e2),
          (eT[112] = tn),
          (eT[113] = eb))
        : (eb = eT[113]);
      let tX = eb,
        tY = th.likeCount ?? 0,
        t1 = th.likedByViewer,
        t0 = (0, ee.D)({
          mint: eR.coinMint,
          coin: eD ?? null,
          coinName: eD?.name ?? eR.coinName ?? null,
          coinSymbol: eD?.symbol ?? eR.coinSymbol ?? null,
          coinImageUri: eD?.image_uri ?? eR.coinImage ?? null,
          summary: (0, Q.y)(eR.positionPnl),
          holder: {
            address: eR.userId,
            displayName: tj,
            avatarUrl: t_ ?? null,
            isVerified: e8,
            xUsername: eq?.x_username ?? eR.xUsername ?? null,
          },
          callout: e9,
        });
      eT[114] !== t0
        ? ((eg = t0 ? { data: t0, sourceElement: ea } : null),
          (eT[114] = t0),
          (eT[115] = eg))
        : (eg = eT[115]);
      let t2 = eg;
      eT[116] !== eD ||
      eT[117] !== eR.coinMint ||
      eT[118] !== tr ||
      eT[119] !== ti
        ? ((ev =
            ti || tr
              ? null
              : {
                  mint: eR.coinMint,
                  chainId: eD?.chain_id,
                  fallbackMarketCap: eD?.usd_market_cap,
                  coin: eD,
                }),
          (eT[116] = eD),
          (eT[117] = eR.coinMint),
          (eT[118] = tr),
          (eT[119] = ti),
          (eT[120] = ev))
        : (ev = eT[120]);
      let t3 = ev;
      if (tt && !e7) return null;
      let t4 = eR.userId,
        t5 = eR.authorCcUserId,
        t6 = eq?.resolved_avatar_decoration ?? eR.resolvedAvatarDecoration,
        t8 = (tU && tU.createdAt) || eR.createdAt,
        t9 = tU ? tU.content : eR.note,
        t7 = tU ? void 0 : (eR.mediaUrl ?? th.mediaUrl),
        ie = tU ? void 0 : tx,
        it = tq ? "dense" : tB ? "comfortable" : "compact";
      (eT[121] !== eR.xUsername || eT[122] !== th.twitterUrl || eT[123] !== tO
        ? ((eC =
            tO && (eR.xUsername || th.twitterUrl)
              ? (0, t.jsx)(E.f, {
                  xUsername: eR.xUsername,
                  twitterUrl: th.twitterUrl,
                  iconOnly: !0,
                  className: "text-text-quaternary",
                })
              : void 0),
          (eT[121] = eR.xUsername),
          (eT[122] = th.twitterUrl),
          (eT[123] = tO),
          (eT[124] = eC))
        : (eC = eT[124]),
        eT[125] !== tu ||
        eT[126] !== tj ||
        eT[127] !== tp ||
        eT[128] !== eD ||
        eT[129] !== tB ||
        eT[130] !== eR.authorCcUserId ||
        eT[131] !== eR.calloutId ||
        eT[132] !== eR.coinMint ||
        eT[133] !== eR.followedHolders ||
        eT[134] !== eR.userId ||
        eT[135] !== tL ||
        eT[136] !== tZ ||
        eT[137] !== eO ||
        eT[138] !== tV ||
        eT[139] !== tQ ||
        eT[140] !== t$ ||
        eT[141] !== td ||
        eT[142] !== tH
          ? ((ew =
              eR.followedHolders?.holders.length || (!tV && tH) || tQ
                ? (0, t.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      eR.followedHolders?.holders.length
                        ? (0, t.jsx)(y.E, {
                            mint: eR.coinMint,
                            followedHolders: eR.followedHolders,
                            coin: eD,
                            avatarSize: tL,
                          })
                        : null,
                      tV || !tH
                        ? null
                        : (0, t.jsx)(P.f, {
                            userAddress: eR.userId,
                            displayName: tj,
                            isLoggedIn: eO,
                            initialIsFollowing: tZ,
                            variant: "icon",
                            size: "sm",
                            rounded: t$ ? "md" : "full",
                            idle: t$ ? "ghost" : "filled",
                            className: t$ ? "[&_svg]:size-3.5" : void 0,
                            attribution: td
                              ? {
                                  mint: eR.coinMint,
                                  calloutId: eR.calloutId,
                                  chain: tp,
                                  ...tu,
                                }
                              : void 0,
                          }),
                      tQ
                        ? (0, t.jsx)(u.f, {
                            target: { kind: "callout", id: tQ },
                            author: { userId: eR.authorCcUserId, name: tj },
                            density: tB ? "comfortable" : "terminal",
                          })
                        : null,
                    ],
                  })
                : void 0),
            (eT[125] = tu),
            (eT[126] = tj),
            (eT[127] = tp),
            (eT[128] = eD),
            (eT[129] = tB),
            (eT[130] = eR.authorCcUserId),
            (eT[131] = eR.calloutId),
            (eT[132] = eR.coinMint),
            (eT[133] = eR.followedHolders),
            (eT[134] = eR.userId),
            (eT[135] = tL),
            (eT[136] = tZ),
            (eT[137] = eO),
            (eT[138] = tV),
            (eT[139] = tQ),
            (eT[140] = t$),
            (eT[141] = td),
            (eT[142] = tH),
            (eT[143] = ew))
          : (ew = eT[143]),
        eT[144] !== tq || eT[145] !== tU
          ? ((ek = tU
              ? (0, t.jsx)(x.f, { quoted: tU.quoted, dense: tq })
              : null),
            (eT[144] = tq),
            (eT[145] = tU),
            (eT[146] = ek))
          : (ek = eT[146]),
        eT[147] !== eD?.chain_id ||
        eT[148] !== eD?.image_uri ||
        eT[149] !== eD?.name ||
        eT[150] !== eD?.symbol ||
        eT[151] !== tl ||
        eT[152] !== tB ||
        eT[153] !== tq ||
        eT[154] !== eR.coinImage ||
        eT[155] !== eR.coinMint ||
        eT[156] !== eR.coinName ||
        eT[157] !== eR.coinSymbol ||
        eT[158] !== eR.multiple ||
        eT[159] !== eR.perp ||
        eT[160] !== eR.positionPnl ||
        eT[161] !== eR.userId ||
        eT[162] !== ti
          ? ((eM = ti
              ? (0, t.jsx)(A, {
                  coin: eR.coinMint,
                  perp: eR.perp ?? null,
                  multiple: eR.multiple,
                  variant: tq ? "strip" : "feed",
                  density: tB ? "comfortable" : "terminal",
                  className: "w-full",
                })
              : tl
                ? (0, t.jsx)(I.f, {
                    embed: tl,
                    variant: tq ? "strip" : "feed",
                    density: tB ? "comfortable" : "terminal",
                    className: "w-full",
                  })
                : (0, t.jsx)(p.f, {
                    mint: eR.coinMint,
                    authorAddress: eR.userId,
                    positionPnl: eR.positionPnl,
                    symbol: eD?.symbol ?? eR.coinSymbol,
                    name: eD?.name ?? eR.coinName,
                    imageUri: eD?.image_uri ?? eR.coinImage,
                    chainId: eD?.chain_id,
                    variant: tq ? "strip" : "feed",
                    density: tB ? "comfortable" : "terminal",
                    className: "w-full",
                  })),
            (eT[147] = eD?.chain_id),
            (eT[148] = eD?.image_uri),
            (eT[149] = eD?.name),
            (eT[150] = eD?.symbol),
            (eT[151] = tl),
            (eT[152] = tB),
            (eT[153] = tq),
            (eT[154] = eR.coinImage),
            (eT[155] = eR.coinMint),
            (eT[156] = eR.coinName),
            (eT[157] = eR.coinSymbol),
            (eT[158] = eR.multiple),
            (eT[159] = eR.perp),
            (eT[160] = eR.positionPnl),
            (eT[161] = eR.userId),
            (eT[162] = ti),
            (eT[163] = eM))
          : (eM = eT[163]));
      let ii = tD ?? void 0,
        il = th.replyCount,
        ir = th.viewCount;
      eT[164] !== eD?.usd_market_cap ||
      eT[165] !== tA ||
      eT[166] !== eR.calloutId ||
      eT[167] !== eR.coinMint ||
      eT[168] !== eR.marketCapUsd ||
      eT[169] !== eB ||
      eT[170] !== e5 ||
      eT[171] !== tc ||
      eT[172] !== td ||
      eT[173] !== ts ||
      eT[174] !== e2
        ? ((eN = eR.calloutId
            ? () => {
                if (td) {
                  let { sourceScreen: e, sourceElement: t } = (0, et.oj)(e2);
                  ts(eR.coinMint, {
                    itemPosition: eB,
                    marketCap: eD?.usd_market_cap ?? eR.marketCapUsd ?? 0,
                    sourceScreen: e,
                    sourceElement: t,
                    calloutId: eR.calloutId,
                    ...(tc.recommendationId
                      ? { rec_id: tc.recommendationId }
                      : {}),
                    ...(tc.positionId ? { positionId: tc.positionId } : {}),
                  });
                }
                e5(`${tA}?reply=1`);
              }
            : void 0),
          (eT[164] = eD?.usd_market_cap),
          (eT[165] = tA),
          (eT[166] = eR.calloutId),
          (eT[167] = eR.coinMint),
          (eT[168] = eR.marketCapUsd),
          (eT[169] = eB),
          (eT[170] = e5),
          (eT[171] = tc),
          (eT[172] = td),
          (eT[173] = ts),
          (eT[174] = e2),
          (eT[175] = eN))
        : (eN = eT[175]);
      let ia = ty.toggle;
      eT[176] !== eR.calloutId ||
      eT[177] !== tw ||
      eT[178] !== tk ||
      eT[179] !== tb ||
      eT[180] !== th.repostCount ||
      eT[181] !== th.repostedByViewer
        ? ((ej = eR.calloutId
            ? {
                count: th.repostCount ?? 0,
                active: th.repostedByViewer,
                busy: tb.isBusy,
                onToggle: tk,
                onQuote: tw,
              }
            : void 0),
          (eT[176] = eR.calloutId),
          (eT[177] = tw),
          (eT[178] = tk),
          (eT[179] = tb),
          (eT[180] = th.repostCount),
          (eT[181] = th.repostedByViewer),
          (eT[182] = ej))
        : (ej = eT[182]);
      let io = to ?? eD?.symbol ?? eR.coinSymbol;
      (eT[183] !== tj || eT[184] !== io
        ? ((e_ = (0, K.f)(tj, io)),
          (eT[183] = tj),
          (eT[184] = io),
          (eT[185] = e_))
        : (e_ = eT[185]),
        eT[186] !== tA ||
        eT[187] !== tN ||
        eT[188] !== ty.toggle ||
        eT[189] !== tY ||
        eT[190] !== t1 ||
        eT[191] !== t3 ||
        eT[192] !== tJ ||
        eT[193] !== th.replyCount ||
        eT[194] !== th.viewCount ||
        eT[195] !== t2 ||
        eT[196] !== ii ||
        eT[197] !== eN ||
        eT[198] !== ej ||
        eT[199] !== e_
          ? ((eU = (0, t.jsx)(f.f, {
              density: ii,
              liveMarketCap: t3,
              replay: tJ,
              replyCount: il,
              viewCount: ir,
              onOpenReplies: eN,
              likeCount: tY,
              likedByViewer: t1,
              onToggleLike: ia,
              repost: ej,
              shareUrl: tA,
              onShareOpen: tN,
              sharePositionCard: t2,
              shareTitle: e_,
            })),
            (eT[186] = tA),
            (eT[187] = tN),
            (eT[188] = ty.toggle),
            (eT[189] = tY),
            (eT[190] = t1),
            (eT[191] = t3),
            (eT[192] = tJ),
            (eT[193] = th.replyCount),
            (eT[194] = th.viewCount),
            (eT[195] = t2),
            (eT[196] = ii),
            (eT[197] = eN),
            (eT[198] = ej),
            (eT[199] = e_),
            (eT[200] = eU))
          : (eU = eT[200]),
        eT[201] !== eK ||
        eT[202] !== t_ ||
        eT[203] !== tj ||
        eT[204] !== tR ||
        eT[205] !== eL ||
        eT[206] !== e3 ||
        eT[207] !== eR.authorCcUserId ||
        eT[208] !== eR.userId ||
        eT[209] !== tM ||
        eT[210] !== tX ||
        eT[211] !== e8 ||
        eT[212] !== e4 ||
        eT[213] !== eY ||
        eT[214] !== eX ||
        eT[215] !== t6 ||
        eT[216] !== t8 ||
        eT[217] !== t9 ||
        eT[218] !== t7 ||
        eT[219] !== ie ||
        eT[220] !== it ||
        eT[221] !== eC ||
        eT[222] !== ew ||
        eT[223] !== ek ||
        eT[224] !== eM ||
        eT[225] !== eU ||
        eT[226] !== e1
          ? ((eS = (0, t.jsxs)(h.f, {
              className: eL,
              authorAddress: t4,
              authorUserId: t5,
              authorName: tj,
              authorAvatarUrl: t_,
              authorAvatarDecoration: t6,
              authorVerified: e8,
              createdAt: t8,
              note: t9,
              mediaUrl: t7,
              mediaPriority: e4,
              noteClassName: eX,
              noteClampLines: eY,
              timeAlign: e1,
              updates: ie,
              noteSize: "md",
              href: tR,
              onAuthorClick: tM,
              density: it,
              divider: e3,
              nameAdornment: eC,
              topRight: ew,
              onClick: tX,
              testId: "feed-callout-card",
              children: [ek, eM, eK, eU],
            })),
            (eT[201] = eK),
            (eT[202] = t_),
            (eT[203] = tj),
            (eT[204] = tR),
            (eT[205] = eL),
            (eT[206] = e3),
            (eT[207] = eR.authorCcUserId),
            (eT[208] = eR.userId),
            (eT[209] = tM),
            (eT[210] = tX),
            (eT[211] = e8),
            (eT[212] = e4),
            (eT[213] = eY),
            (eT[214] = eX),
            (eT[215] = t6),
            (eT[216] = t8),
            (eT[217] = t9),
            (eT[218] = t7),
            (eT[219] = ie),
            (eT[220] = it),
            (eT[221] = eC),
            (eT[222] = ew),
            (eT[223] = ek),
            (eT[224] = eM),
            (eT[225] = eU),
            (eT[226] = e1),
            (eT[227] = eS))
          : (eS = eT[227]));
      let is = null !== tv;
      eT[228] !== tC
        ? ((eA = (e) => {
            e || tC(null);
          }),
          (eT[228] = tC),
          (eT[229] = eA))
        : (eA = eT[229]);
      let id = to ?? eD?.symbol ?? eR.coinSymbol;
      return (
        eT[230] !== tu ||
        eT[231] !== eR.calloutId ||
        eT[232] !== eR.coinMint ||
        eT[233] !== e2
          ? ((eE = () => {
              (0, et.Sw)({
                mint: eR.coinMint,
                calloutId: eR.calloutId,
                isQuote: !0,
                surface: e2,
                ...tu,
              });
            }),
            (eT[230] = tu),
            (eT[231] = eR.calloutId),
            (eT[232] = eR.coinMint),
            (eT[233] = e2),
            (eT[234] = eE))
          : (eE = eT[234]),
        eT[235] !== tj ||
        eT[236] !== eR.calloutId ||
        eT[237] !== eR.coinMint ||
        eT[238] !== eR.createdAt ||
        eT[239] !== eR.note ||
        eT[240] !== tv ||
        eT[241] !== is ||
        eT[242] !== eA ||
        eT[243] !== id ||
        eT[244] !== eE
          ? ((eP = (0, t.jsx)(m.f, {
              isOpen: is,
              onOpenChange: eA,
              mint: eR.coinMint,
              calloutId: tv,
              cacheCalloutId: eR.calloutId,
              quotedAuthorName: tj,
              quotedNote: eR.note,
              quotedSymbol: id,
              quotedCreatedAt: eR.createdAt,
              onPosted: eE,
            })),
            (eT[235] = tj),
            (eT[236] = eR.calloutId),
            (eT[237] = eR.coinMint),
            (eT[238] = eR.createdAt),
            (eT[239] = eR.note),
            (eT[240] = tv),
            (eT[241] = is),
            (eT[242] = eA),
            (eT[243] = id),
            (eT[244] = eE),
            (eT[245] = eP))
          : (eP = eT[245]),
        eT[246] !== tf || eT[247] !== eS || eT[248] !== eP
          ? ((ez = (0, t.jsxs)("div", { ref: tf, children: [eS, eP] })),
            (eT[246] = tf),
            (eT[247] = eS),
            (eT[248] = eP),
            (eT[249] = ez))
          : (ez = eT[249]),
        ez
      );
    });
  e.s(["f", 0, eo], 910976);
};
