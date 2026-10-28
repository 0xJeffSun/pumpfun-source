// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(292686),
    l = e.i(322315),
    r = e.i(254010),
    n = e.i(365089),
    o = e.i(545063),
    s = e.i(179736),
    d = e.i(599077),
    c = e.i(352386),
    u = e.i(609488),
    m = e.i(462860),
    p = e.i(335703),
    h = e.i(782049),
    f = e.i(204478),
    g = e.i(662222),
    y = e.i(386028),
    v = e.i(337689),
    b = e.i(985688),
    I = e.i(790658),
    w = e.i(691471),
    C = e.i(404411),
    k = e.i(257505),
    x = e.i(690877),
    T = e.i(361308),
    _ = e.i(76991);
  let E = (e) =>
    null === e
      ? null
      : {
          coin: e.coin,
          displayName: e.displayName,
          ticker: e.ticker,
          imageUri: e.imageUri,
          szDecimals: e.szDecimals,
        };
  var N = e.i(662986),
    S = e.i(338319);
  let M = ["web.perps"];
  function P(e) {
    let i,
      l,
      r,
      n,
      o,
      s,
      d,
      c,
      u,
      m,
      p,
      h,
      f,
      g,
      y,
      v = (0, a.c)(65),
      {
        coin: b,
        perp: P,
        multiple: U,
        variant: A,
        density: j,
        className: V,
      } = e;
    v[0] !== b ? ((i = { coin: b }), (v[0] = b), (v[1] = i)) : (i = v[1]);
    let { data: L } = ((e) => {
        let t,
          i,
          l,
          r = (0, a.c)(8),
          { coin: n, enabled: o } = e;
        (r[0] !== n
          ? ((t = T.f.market(n)), (r[0] = n), (r[1] = t))
          : (t = r[1]),
          r[2] !== n
            ? ((i = (e) => {
                let { signal: t } = e;
                return (0, _.w)({ coin: n, signal: t });
              }),
              (r[2] = n),
              (r[3] = i))
            : (i = r[3]));
        let s = (void 0 === o || o) && n.length > 0;
        return (
          r[4] !== t || r[5] !== i || r[6] !== s
            ? ((l = {
                queryKey: t,
                queryFn: i,
                enabled: s,
                staleTime: 6e4,
                refetchOnWindowFocus: !1,
                select: E,
              }),
              (r[4] = t),
              (r[5] = i),
              (r[6] = s),
              (r[7] = l))
            : (l = r[7]),
          (0, x.useQuery)(l)
        );
      })(i),
      $ = (0, k.f)(M);
    v[2] !== b || v[3] !== L?.ticker
      ? ((l = L?.ticker ?? (0, N.j)(b)),
        (v[2] = b),
        (v[3] = L?.ticker),
        (v[4] = l))
      : (l = v[4]);
    let O = l,
      q = L?.displayName ?? O,
      F = L?.imageUri ?? null;
    v[5] !== b || v[6] !== q || v[7] !== F || v[8] !== O
      ? ((r = { coin: b, displayName: q, ticker: O, imageUri: F }),
        (v[5] = b),
        (v[6] = q),
        (v[7] = F),
        (v[8] = O),
        (v[9] = r))
      : (r = v[9]);
    let D = r,
      B = L?.displayName && L.displayName !== O ? L.displayName : null,
      R = B ? `${B} \xb7 ${C.$}` : C.$;
    v[10] !== $ || v[11] !== L?.szDecimals || v[12] !== U || v[13] !== P
      ? ((n =
          P && $
            ? (0, t.jsx)(I.f, {
                perp: (0, N.z)(P),
                szDecimals: L?.szDecimals,
                multiple: U,
              })
            : null),
        (v[10] = $),
        (v[11] = L?.szDecimals),
        (v[12] = U),
        (v[13] = P),
        (v[14] = n))
      : (n = v[14]);
    let z = n;
    if ("strip" === (void 0 === A ? "feed" : A)) {
      let e, a, i, l, r, n;
      return (
        v[15] !== V
          ? ((e = (0, S.c)(
              "flex flex-col gap-1 rounded-md bg-bg-tertiary px-2 py-1.5 text-[12px] leading-4",
              V,
            )),
            (v[15] = V),
            (v[16] = e))
          : (e = v[16]),
        v[17] !== D
          ? ((a = (0, t.jsx)(w.f, {
              market: D,
              size: 20,
              ringClassName: "ring-bg-tertiary",
              testIdPrefix: "perp-callout-art",
            })),
            (v[17] = D),
            (v[18] = a))
          : (a = v[18]),
        v[19] !== O
          ? ((i = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-ticker",
              className: "shrink-0 font-medium text-text-primary",
              children: O,
            })),
            (v[19] = O),
            (v[20] = i))
          : (i = v[20]),
        v[21] !== R
          ? ((l = (0, t.jsx)("span", {
              "data-testid": "perp-callout-position-card-name",
              className:
                "min-w-0 flex-1 truncate text-[11px] text-text-quaternary",
              children: R,
            })),
            (v[21] = R),
            (v[22] = l))
          : (l = v[22]),
        v[23] !== a || v[24] !== i || v[25] !== l
          ? ((r = (0, t.jsxs)("div", {
              className: "flex min-w-0 items-center gap-1.5",
              children: [a, i, l],
            })),
            (v[23] = a),
            (v[24] = i),
            (v[25] = l),
            (v[26] = r))
          : (r = v[26]),
        v[27] !== b || v[28] !== z || v[29] !== r || v[30] !== e
          ? ((n = (0, t.jsxs)("div", {
              "data-testid": "perp-callout-position-card",
              "data-variant": "strip",
              "data-coin": b,
              className: e,
              children: [r, z],
            })),
            (v[27] = b),
            (v[28] = z),
            (v[29] = r),
            (v[30] = e),
            (v[31] = n))
          : (n = v[31]),
        n
      );
    }
    let G = "comfortable" === (void 0 === j ? "terminal" : j),
      Q = !G && "rounded-xl border border-border-secondary bg-bg-secondary p-3";
    v[32] !== V || v[33] !== Q
      ? ((o = (0, S.c)(
          "flex w-full flex-wrap items-center gap-x-3 gap-y-1.5",
          Q,
          V,
        )),
        (v[32] = V),
        (v[33] = Q),
        (v[34] = o))
      : (o = v[34]);
    let W = G ? 40 : 36,
      K = G ? "ring-bg-primary" : "ring-bg-secondary";
    v[35] !== D || v[36] !== W || v[37] !== K
      ? ((s = (0, t.jsx)(w.f, {
          market: D,
          size: W,
          ringClassName: K,
          testIdPrefix: "perp-callout-art",
        })),
        (v[35] = D),
        (v[36] = W),
        (v[37] = K),
        (v[38] = s))
      : (s = v[38]);
    let H = G ? void 0 : "text-xs leading-4";
    v[39] !== H
      ? ((d = (0, S.c)("flex min-w-0 flex-1 flex-col gap-0.5", H)),
        (v[39] = H),
        (v[40] = d))
      : (d = v[40]);
    let J = G && "text-sm";
    (v[41] !== J
      ? ((c = (0, S.c)("w-full truncate font-medium text-text-primary", J)),
        (v[41] = J),
        (v[42] = c))
      : (c = v[42]),
      v[43] !== c || v[44] !== O
        ? ((u = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-ticker",
            className: c,
            children: O,
          })),
          (v[43] = c),
          (v[44] = O),
          (v[45] = u))
        : (u = v[45]));
    let Y = G ? "text-[13px] text-text-tertiary" : "text-text-quaternary";
    return (
      v[46] !== Y
        ? ((m = (0, S.c)("w-full truncate", Y)), (v[46] = Y), (v[47] = m))
        : (m = v[47]),
      v[48] !== m || v[49] !== R
        ? ((p = (0, t.jsx)("p", {
            "data-testid": "perp-callout-position-card-name",
            className: m,
            children: R,
          })),
          (v[48] = m),
          (v[49] = R),
          (v[50] = p))
        : (p = v[50]),
      v[51] !== d || v[52] !== u || v[53] !== p
        ? ((h = (0, t.jsxs)("div", { className: d, children: [u, p] })),
          (v[51] = d),
          (v[52] = u),
          (v[53] = p),
          (v[54] = h))
        : (h = v[54]),
      v[55] !== s || v[56] !== h
        ? ((f = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 basis-[12rem] items-center gap-2",
            children: [s, h],
          })),
          (v[55] = s),
          (v[56] = h),
          (v[57] = f))
        : (f = v[57]),
      v[58] !== z
        ? ((g = z
            ? (0, t.jsx)("div", {
                className: "flex min-w-0 flex-1 basis-[22rem] items-center",
                children: z,
              })
            : null),
          (v[58] = z),
          (v[59] = g))
        : (g = v[59]),
      v[60] !== b || v[61] !== o || v[62] !== f || v[63] !== g
        ? ((y = (0, t.jsxs)("div", {
            "data-testid": "perp-callout-position-card",
            "data-variant": "feed",
            "data-coin": b,
            className: o,
            children: [f, g],
          })),
          (v[60] = b),
          (v[61] = o),
          (v[62] = f),
          (v[63] = g),
          (v[64] = y))
        : (y = v[64]),
      y
    );
  }
  var U = e.i(875737),
    A = e.i(229937),
    j = e.i(701159),
    V = e.i(599066),
    L = e.i(741084),
    $ = e.i(116549),
    O = e.i(481522),
    q = e.i(217004),
    F = e.i(210529),
    D = e.i(986071),
    B = e.i(598005),
    R = e.i(860787),
    z = e.i(257004),
    G = e.i(917341),
    Q = e.i(889451),
    W = e.i(390767),
    K = e.i(137555),
    H = e.i(406288),
    J = e.i(839931),
    Y = e.i(338664),
    Z = e.i(499141),
    X = e.i(720772),
    ee = e.i(193504),
    et = e.i(595673),
    ea = e.i(198825),
    ei = e.i(569526),
    el = e.i(634029);
  let er = { mine: i.k9.CALLOUTS_FEED_MINE, other: i.k9.CALLOUTS_FEED_OTHER },
    en = (0, c.memo)((e) => {
      let i,
        I,
        w,
        C,
        k,
        x,
        T,
        _,
        E,
        S,
        M,
        en,
        eo,
        es,
        ed,
        ec,
        eu,
        em,
        ep,
        eh,
        ef,
        eg,
        ey,
        ev,
        eb,
        eI,
        ew,
        eC,
        ek,
        ex,
        eT,
        e_,
        eE,
        eN,
        eS,
        eM,
        eP,
        eU,
        eA,
        ej,
        eV = (0, a.c)(250),
        {
          entry: eL,
          coin: e$,
          card: eO,
          user: eq,
          position: eF,
          viewerAddress: eD,
          isLoggedIn: eB,
          viewerFollowing: eR,
          className: ez,
          surface: eG,
          divider: eQ,
          mediaPriority: eW,
          attachmentsSlot: eK,
          hideFollowButton: eH,
          followedHoldersAvatarSize: eJ,
          hideXBadge: eY,
          noteClassName: eZ,
          noteClampLines: eX,
          timeAlign: e0,
          hrefOverride: e1,
        } = e,
        e2 = void 0 === eG ? "global_feed" : eG,
        e3 = void 0 === eQ ? "strong" : eQ,
        e4 = void 0 !== eW && eW,
        { push: e6 } = (0, d.useRouter)(),
        e5 = (0, o.$)(),
        e9 = (0, s.s)(eL.authorCcUserId ?? eL.userId);
      if (eV[0] !== eL)
        ((i = {
          calloutId: eL.calloutId ?? eL.key,
          userId: eL.userId,
          authorCcUserId: eL.authorCcUserId,
          coinMint: eL.coinMint,
          marketCap: eL.marketCapUsd ?? 0,
          calloutPrice: 0,
          multiple: eL.multiple,
          createdAt: eL.createdAt,
          maxPriceSol: 0,
          note: eL.note,
          ...(null != eL.chain ? { chain: eL.chain } : {}),
          ...(eL.perp ? { perp: eL.perp } : {}),
          ...(null != eL.assetClass ? { assetClass: eL.assetClass } : {}),
          ...(eL.collectible ? { collectible: eL.collectible } : {}),
        }),
          (eV[0] = eL),
          (eV[1] = i));
      else i = eV[1];
      let e8 = i,
        e7 = (0, r.k)(l.D.WEB_PERPS, !1),
        te = (0, r.k)(l.D.WEB_PERPS_CALLOUT_FEED, !1);
      eV[2] !== eL
        ? ((I = (0, N.o)(eL)), (eV[2] = eL), (eV[3] = I))
        : (I = eV[3]);
      let tt = I,
        ta = e7 && tt,
        ti = (0, r.k)(l.D.WEB_PACKS, !1)
          ? ((0, G.r)(eL.coinMint, eL) ?? (eO ? (0, G.U)(eO, eL) : null))
          : null,
        tl = null !== ti,
        tr = ta ? encodeURIComponent(eL.coinMint) : eL.coinMint;
      eV[4] !== eL.coinMint || eV[5] !== ta
        ? ((w = ta ? (0, N.j)(eL.coinMint) : void 0),
          (eV[4] = eL.coinMint),
          (eV[5] = ta),
          (eV[6] = w))
        : (w = eV[6]);
      let tn = w,
        to = (0, F.q)(),
        { setLastClickImpression: ts } = (0, ei.y)(),
        td = "home_feed" === e2;
      (eV[7] !== eL.positionId || eV[8] !== td
        ? ((C = td ? { positionId: eL.positionId } : {}),
          (eV[7] = eL.positionId),
          (eV[8] = td),
          (eV[9] = C))
        : (C = eV[9]),
        eV[10] !== eL.recommendationId ||
        eV[11] !== eL.recommendationRank ||
        eV[12] !== C
          ? ((k = {
              recommendationId: eL.recommendationId,
              recommendationRank: eL.recommendationRank,
              ...C,
            }),
            (eV[10] = eL.recommendationId),
            (eV[11] = eL.recommendationRank),
            (eV[12] = C),
            (eV[13] = k))
          : (k = eV[13]));
      let tc = k;
      eV[14] !== tc || eV[15] !== td
        ? ((x = td ? tc : {}), (eV[14] = tc), (eV[15] = td), (eV[16] = x))
        : (x = eV[16]);
      let tu = x;
      eV[17] !== eL.authorCcUserId || eV[18] !== eL.userId
        ? ((T = (0, z.r)({
            authorId: eL.userId,
            authorCcUserId: eL.authorCcUserId,
          })),
          (eV[17] = eL.authorCcUserId),
          (eV[18] = eL.userId),
          (eV[19] = T))
        : (T = eV[19]);
      let tm = T;
      eV[20] !== eL.coinChain || eV[21] !== td
        ? ((_ = td ? (0, et.rc)(eL.coinChain) : void 0),
          (eV[20] = eL.coinChain),
          (eV[21] = td),
          (eV[22] = _))
        : (_ = eV[22]);
      let tp = _;
      eV[23] !== e8 ||
      eV[24] !== tp ||
      eV[25] !== e$ ||
      eV[26] !== eF ||
      eV[27] !== tc ||
      eV[28] !== e2
        ? ((E = {
            surface: e2,
            callout: e8,
            position: eF,
            coin: e$,
            chain: tp,
            ...tc,
          }),
          (eV[23] = e8),
          (eV[24] = tp),
          (eV[25] = e$),
          (eV[26] = eF),
          (eV[27] = tc),
          (eV[28] = e2),
          (eV[29] = E))
        : (E = eV[29]);
      let th = (0, B.f)(E);
      eV[30] !== eL
        ? ((S = { mint: eL.coinMint, calloutId: eL.calloutId, embedded: eL }),
          (eV[30] = eL),
          (eV[31] = S))
        : (S = eV[31]);
      let tf = (0, q.f)(S),
        tg = (tf.replyCount ?? 0) > 0;
      eV[32] !== eL.coinMint ||
      eV[33] !== eL.updates ||
      eV[34] !== eL.userId ||
      eV[35] !== tf.threadCalloutId ||
      eV[36] !== tg
        ? ((M = {
            mint: eL.coinMint,
            calloutId: tf.threadCalloutId,
            authorAddress: eL.userId,
            enabled: tg,
            embedded: eL.updates,
          }),
          (eV[32] = eL.coinMint),
          (eV[33] = eL.updates),
          (eV[34] = eL.userId),
          (eV[35] = tf.threadCalloutId),
          (eV[36] = tg),
          (eV[37] = M))
        : (M = eV[37]);
      let ty = (0, O.f)(M);
      eV[38] !== tu ||
      eV[39] !== tp ||
      eV[40] !== eL.calloutId ||
      eV[41] !== eL.coinMint ||
      eV[42] !== e2 ||
      eV[43] !== eD
        ? ((en = {
            mint: eL.coinMint,
            calloutId: eL.calloutId,
            viewerAddress: eD,
            surface: e2,
            chain: tp,
            ...tu,
          }),
          (eV[38] = tu),
          (eV[39] = tp),
          (eV[40] = eL.calloutId),
          (eV[41] = eL.coinMint),
          (eV[42] = e2),
          (eV[43] = eD),
          (eV[44] = en))
        : (en = eV[44]);
      let tv = (0, j.f)(en);
      eV[45] !== eL.calloutId || eV[46] !== eL.coinMint || eV[47] !== eD
        ? ((eo = {
            mint: eL.coinMint,
            calloutId: eL.calloutId,
            viewerAddress: eD,
          }),
          (eV[45] = eL.calloutId),
          (eV[46] = eL.coinMint),
          (eV[47] = eD),
          (eV[48] = eo))
        : (eo = eV[48]);
      let tb = (0, V.f)(eo),
        { setShowWallet: tI } = (0, ea.useConnectWallet)(),
        [tw, tC] = (0, c.useState)(null);
      eV[49] !== tb || eV[50] !== tC || eV[51] !== tI || eV[52] !== eD
        ? ((es = () => {
            eD
              ? tb.resolveQuoteTarget().then((e) => {
                  e && tC(e);
                })
              : tI(!0);
          }),
          (eV[49] = tb),
          (eV[50] = tC),
          (eV[51] = tI),
          (eV[52] = eD),
          (eV[53] = es))
        : (es = eV[53]);
      let tk = es;
      eV[54] !== tu ||
      eV[55] !== eL.calloutId ||
      eV[56] !== eL.coinMint ||
      eV[57] !== tb ||
      eV[58] !== e2
        ? ((ed = () => {
            (!tb.isReposted &&
              eL.calloutId &&
              (0, et.Sw)({
                mint: eL.coinMint,
                calloutId: eL.calloutId,
                isQuote: !1,
                surface: e2,
                ...tu,
              }),
              tb.toggle());
          }),
          (eV[54] = tu),
          (eV[55] = eL.calloutId),
          (eV[56] = eL.coinMint),
          (eV[57] = tb),
          (eV[58] = e2),
          (eV[59] = ed))
        : (ed = eV[59]);
      let tx = ed;
      eV[60] !== tu ||
      eV[61] !== tp ||
      eV[62] !== eL.calloutId ||
      eV[63] !== eL.coinMint ||
      eV[64] !== eL.userId ||
      eV[65] !== td ||
      eV[66] !== e2
        ? ((ec = () => {
            td &&
              (0, et.D)({
                mint: eL.coinMint,
                profileUserId: eL.userId,
                calloutId: eL.calloutId,
                surface: e2,
                chain: tp,
                ...tu,
              });
          }),
          (eV[60] = tu),
          (eV[61] = tp),
          (eV[62] = eL.calloutId),
          (eV[63] = eL.coinMint),
          (eV[64] = eL.userId),
          (eV[65] = td),
          (eV[66] = e2),
          (eV[67] = ec))
        : (ec = eV[67]);
      let tT = ec;
      eV[68] !== tu ||
      eV[69] !== tp ||
      eV[70] !== eL.calloutId ||
      eV[71] !== eL.coinMint ||
      eV[72] !== td ||
      eV[73] !== e2
        ? ((eu = () => {
            td &&
              (0, et.t4)({
                mint: eL.coinMint,
                calloutId: eL.calloutId,
                surface: e2,
                chain: tp,
                ...tu,
              });
          }),
          (eV[68] = tu),
          (eV[69] = tp),
          (eV[70] = eL.calloutId),
          (eV[71] = eL.coinMint),
          (eV[72] = td),
          (eV[73] = e2),
          (eV[74] = eu))
        : (eu = eV[74]);
      let t_ = eu,
        tE = eq?.username?.trim() || eL.username || (0, n.d)(eL.userId, 4, 4),
        tN = (0, R.Z)({
          sourceUrl: (0, L.f)(eq?.profile_image) ?? (0, L.f)(eL.profileImage),
          width: R.z.list,
        }),
        tS = eL.quote;
      eV[75] !== tr || eV[76] !== tS
        ? ((em =
            tS?.calloutId != null
              ? (0, W.f)({
                  coinMint: tr,
                  calloutId: tS.calloutId,
                  replyId: tS.replyId,
                })
              : void 0),
          (eV[75] = tr),
          (eV[76] = tS),
          (eV[77] = em))
        : (em = eV[77]);
      let tM = em;
      eV[78] !== tr ||
      eV[79] !== eL.calloutId ||
      eV[80] !== eL.coinMint ||
      eV[81] !== eL.userId ||
      eV[82] !== ta
        ? ((ep = eL.calloutId
            ? `/callouts/${tr}/${eL.calloutId}`
            : ta
              ? (0, Z.h)(eL.coinMint, { caller: eL.userId })
              : `/coin/${eL.coinMint}`),
          (eV[78] = tr),
          (eV[79] = eL.calloutId),
          (eV[80] = eL.coinMint),
          (eV[81] = eL.userId),
          (eV[82] = ta),
          (eV[83] = ep))
        : (ep = eV[83]);
      let tP = ep,
        tU = (0, $.k)();
      eV[84] !== tr ||
      eV[85] !== eL.calloutId ||
      eV[86] !== eL.coinMint ||
      eV[87] !== eL.userId ||
      eV[88] !== ta ||
      eV[89] !== te
        ? ((eh = ta
            ? eL.calloutId
              ? te
                ? (0, Z.h)(eL.coinMint, {
                    [D.f.COIN.HIGHLIGHT_CALLOUT]: eL.calloutId,
                  })
                : `/callouts/${tr}/${eL.calloutId}`
              : (0, Z.h)(eL.coinMint, { caller: eL.userId })
            : eL.calloutId
              ? `/coin/${eL.coinMint}?highlight_callout=${eL.calloutId}`
              : `/coin/${eL.coinMint}`),
          (eV[84] = tr),
          (eV[85] = eL.calloutId),
          (eV[86] = eL.coinMint),
          (eV[87] = eL.userId),
          (eV[88] = ta),
          (eV[89] = te),
          (eV[90] = eh))
        : (eh = eV[90]);
      let tA = eh,
        tj = (0, H.W)(ti?.provider) ?? void 0,
        tV = eL.calloutId
          ? (0, J.h)(eL.coinMint, eL.calloutId, tj)
          : (0, J.o)(eL.coinMint, void 0, tj),
        tL =
          e1 ?? tM ?? (tl ? tV : "home" === tU || "coin-rail" === tU ? tA : tP);
      eV[91] !== th
        ? ((ef = { ref: th }), (eV[91] = th), (eV[92] = ef))
        : (ef = eV[92]);
      let t$ = (0, b.f)(ef),
        tO = null !== t$,
        tq = "terminal" === t$,
        tF = "comfortable" === t$,
        tD = "coin-rail" === tU,
        tB = tD || !(void 0 !== eY && eY),
        tR = tD || !(void 0 !== eH && eH),
        tz = eJ ?? (tq ? "rail" : "md");
      eV[93] !== eL.isViewer || eV[94] !== eL.userId || eV[95] !== e5
        ? ((eg = !0 === eL.isViewer || e5(eL.userId)),
          (eV[93] = eL.isViewer),
          (eV[94] = eL.userId),
          (eV[95] = e5),
          (eV[96] = eg))
        : (eg = eV[96]);
      let tG = eg,
        tQ = tG || e5(eL.authorCcUserId) ? void 0 : eL.calloutId,
        tW = eq?.address,
        tK = eq?.userId;
      if (
        eV[97] !== eL.userId ||
        eV[98] !== tW ||
        eV[99] !== tK ||
        eV[100] !== eR
      ) {
        let e = [eL.userId, tW, tK];
        ((ey = eR.ready
          ? e.some((e) => e && !0 === eR.isFollowing(e))
          : void 0),
          (eV[97] = eL.userId),
          (eV[98] = tW),
          (eV[99] = tK),
          (eV[100] = eR),
          (eV[101] = ey));
      } else ey = eV[101];
      let tH = ey;
      e: {
        if (!eB) {
          ev = void 0;
          break e;
        }
        if (void 0 !== tH) {
          ev = tH || (eL.viewerFollows ?? !1);
          break e;
        }
        if (null != eL.viewerFollows) {
          ev = eL.viewerFollows;
          break e;
        }
        ev = !!eR.isError && void 0;
      }
      let tJ = ev,
        tY =
          !ta && !tl && (0, X.B)(e$)
            ? {
                mint: eL.coinMint,
                walletAddress: eL.userId,
                coin: e$,
                ownerLabel: tE,
              }
            : void 0;
      eV[102] !== tm ||
      eV[103] !== tp ||
      eV[104] !== e$?.usd_market_cap ||
      eV[105] !== ti ||
      eV[106] !== eL.calloutId ||
      eV[107] !== eL.coinMint ||
      eV[108] !== eL.marketCapUsd ||
      eV[109] !== eF ||
      eV[110] !== tc ||
      eV[111] !== e2 ||
      eV[112] !== to
        ? ((eb = () => {
            (ti && (0, el.C)((0, Y.A)(ti)),
              to({
                mint: eL.coinMint,
                calloutId: eL.calloutId,
                surface: e2,
                absolutePosition: eF,
                usdMarketCap: e$?.usd_market_cap ?? eL.marketCapUsd ?? void 0,
                chain: tp,
                ...tc,
                authorId: tm,
              }));
          }),
          (eV[102] = tm),
          (eV[103] = tp),
          (eV[104] = e$?.usd_market_cap),
          (eV[105] = ti),
          (eV[106] = eL.calloutId),
          (eV[107] = eL.coinMint),
          (eV[108] = eL.marketCapUsd),
          (eV[109] = eF),
          (eV[110] = tc),
          (eV[111] = e2),
          (eV[112] = to),
          (eV[113] = eb))
        : (eb = eV[113]);
      let tZ = eb,
        tX = tf.likeCount ?? 0,
        t0 = tf.likedByViewer,
        t1 = (0, ee.D)({
          mint: eL.coinMint,
          coin: e$ ?? null,
          coinName: e$?.name ?? eL.coinName ?? null,
          coinSymbol: e$?.symbol ?? eL.coinSymbol ?? null,
          coinImageUri: e$?.image_uri ?? eL.coinImage ?? null,
          summary: (0, Q.y)(eL.positionPnl),
          holder: {
            address: eL.userId,
            displayName: tE,
            avatarUrl: tN ?? null,
            isVerified: e9,
            xUsername: eq?.x_username ?? eL.xUsername ?? null,
          },
          callout: e8,
        });
      eV[114] !== t1
        ? ((eI = t1 ? { data: t1, sourceElement: er } : null),
          (eV[114] = t1),
          (eV[115] = eI))
        : (eI = eV[115]);
      let t2 = eI;
      eV[116] !== e$ ||
      eV[117] !== eL.coinMint ||
      eV[118] !== tl ||
      eV[119] !== ta
        ? ((ew =
            ta || tl
              ? null
              : {
                  mint: eL.coinMint,
                  chainId: e$?.chain_id,
                  fallbackMarketCap: e$?.usd_market_cap,
                  coin: e$,
                }),
          (eV[116] = e$),
          (eV[117] = eL.coinMint),
          (eV[118] = tl),
          (eV[119] = ta),
          (eV[120] = ew))
        : (ew = eV[120]);
      let t3 = ew;
      if (tt && !e7) return null;
      let t4 = eL.userId,
        t6 = eL.authorCcUserId,
        t5 = eq?.resolved_avatar_decoration ?? eL.resolvedAvatarDecoration,
        t9 = (tS && tS.createdAt) || eL.createdAt,
        t8 = tS ? tS.content : eL.note,
        t7 = tS ? void 0 : (eL.mediaUrl ?? tf.mediaUrl),
        ae = tS ? void 0 : ty,
        at = tq ? "dense" : tF ? "comfortable" : "compact";
      (eV[121] !== eL.xUsername || eV[122] !== tf.twitterUrl || eV[123] !== tB
        ? ((eC =
            tB && (eL.xUsername || tf.twitterUrl)
              ? (0, t.jsx)(U.f, {
                  xUsername: eL.xUsername,
                  twitterUrl: tf.twitterUrl,
                  iconOnly: !0,
                  className: "text-text-quaternary",
                })
              : void 0),
          (eV[121] = eL.xUsername),
          (eV[122] = tf.twitterUrl),
          (eV[123] = tB),
          (eV[124] = eC))
        : (eC = eV[124]),
        eV[125] !== tu ||
        eV[126] !== tE ||
        eV[127] !== tp ||
        eV[128] !== e$ ||
        eV[129] !== tF ||
        eV[130] !== eL.authorCcUserId ||
        eV[131] !== eL.calloutId ||
        eV[132] !== eL.coinMint ||
        eV[133] !== eL.followedHolders ||
        eV[134] !== eL.userId ||
        eV[135] !== tz ||
        eV[136] !== tJ ||
        eV[137] !== eB ||
        eV[138] !== tG ||
        eV[139] !== tQ ||
        eV[140] !== tO ||
        eV[141] !== td ||
        eV[142] !== tR
          ? ((ek =
              eL.followedHolders?.holders.length || (!tG && tR) || tQ
                ? (0, t.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      eL.followedHolders?.holders.length
                        ? (0, t.jsx)(v.E, {
                            mint: eL.coinMint,
                            followedHolders: eL.followedHolders,
                            coin: e$,
                            avatarSize: tz,
                          })
                        : null,
                      tG || !tR
                        ? null
                        : (0, t.jsx)(A.f, {
                            userAddress: eL.userId,
                            displayName: tE,
                            isLoggedIn: eB,
                            initialIsFollowing: tJ,
                            variant: "icon",
                            size: "sm",
                            rounded: tO ? "md" : "full",
                            idle: tO ? "ghost" : "filled",
                            className: tO ? "[&_svg]:size-3.5" : void 0,
                            attribution: td
                              ? {
                                  mint: eL.coinMint,
                                  calloutId: eL.calloutId,
                                  chain: tp,
                                  ...tu,
                                }
                              : void 0,
                          }),
                      tQ
                        ? (0, t.jsx)(u.f, {
                            target: { kind: "callout", id: tQ },
                            author: { userId: eL.authorCcUserId, name: tE },
                            density: tF ? "comfortable" : "terminal",
                          })
                        : null,
                    ],
                  })
                : void 0),
            (eV[125] = tu),
            (eV[126] = tE),
            (eV[127] = tp),
            (eV[128] = e$),
            (eV[129] = tF),
            (eV[130] = eL.authorCcUserId),
            (eV[131] = eL.calloutId),
            (eV[132] = eL.coinMint),
            (eV[133] = eL.followedHolders),
            (eV[134] = eL.userId),
            (eV[135] = tz),
            (eV[136] = tJ),
            (eV[137] = eB),
            (eV[138] = tG),
            (eV[139] = tQ),
            (eV[140] = tO),
            (eV[141] = td),
            (eV[142] = tR),
            (eV[143] = ek))
          : (ek = eV[143]),
        eV[144] !== tq || eV[145] !== tS
          ? ((ex = tS
              ? (0, t.jsx)(y.f, { quoted: tS.quoted, dense: tq })
              : null),
            (eV[144] = tq),
            (eV[145] = tS),
            (eV[146] = ex))
          : (ex = eV[146]),
        eV[147] !== e$?.chain_id ||
        eV[148] !== e$?.image_uri ||
        eV[149] !== e$?.name ||
        eV[150] !== e$?.symbol ||
        eV[151] !== ti ||
        eV[152] !== tF ||
        eV[153] !== tq ||
        eV[154] !== eL.coinImage ||
        eV[155] !== eL.coinMint ||
        eV[156] !== eL.coinName ||
        eV[157] !== eL.coinSymbol ||
        eV[158] !== eL.multiple ||
        eV[159] !== eL.perp ||
        eV[160] !== eL.positionPnl ||
        eV[161] !== eL.userId ||
        eV[162] !== ta
          ? ((eT = ta
              ? (0, t.jsx)(P, {
                  coin: eL.coinMint,
                  perp: eL.perp ?? null,
                  multiple: eL.multiple,
                  variant: tq ? "strip" : "feed",
                  density: tF ? "comfortable" : "terminal",
                  className: "w-full",
                })
              : ti
                ? (0, t.jsx)(g.f, {
                    embed: ti,
                    variant: tq ? "strip" : "feed",
                    density: tF ? "comfortable" : "terminal",
                    className: "w-full",
                  })
                : (0, t.jsx)(p.f, {
                    mint: eL.coinMint,
                    authorAddress: eL.userId,
                    positionPnl: eL.positionPnl,
                    symbol: e$?.symbol ?? eL.coinSymbol,
                    name: e$?.name ?? eL.coinName,
                    imageUri: e$?.image_uri ?? eL.coinImage,
                    chainId: e$?.chain_id,
                    variant: tq ? "strip" : "feed",
                    density: tF ? "comfortable" : "terminal",
                    className: "w-full",
                  })),
            (eV[147] = e$?.chain_id),
            (eV[148] = e$?.image_uri),
            (eV[149] = e$?.name),
            (eV[150] = e$?.symbol),
            (eV[151] = ti),
            (eV[152] = tF),
            (eV[153] = tq),
            (eV[154] = eL.coinImage),
            (eV[155] = eL.coinMint),
            (eV[156] = eL.coinName),
            (eV[157] = eL.coinSymbol),
            (eV[158] = eL.multiple),
            (eV[159] = eL.perp),
            (eV[160] = eL.positionPnl),
            (eV[161] = eL.userId),
            (eV[162] = ta),
            (eV[163] = eT))
          : (eT = eV[163]));
      let aa = t$ ?? void 0,
        ai = tf.replyCount,
        al = tf.viewCount;
      eV[164] !== e$?.usd_market_cap ||
      eV[165] !== tP ||
      eV[166] !== eL.calloutId ||
      eV[167] !== eL.coinMint ||
      eV[168] !== eL.marketCapUsd ||
      eV[169] !== eF ||
      eV[170] !== e6 ||
      eV[171] !== tc ||
      eV[172] !== td ||
      eV[173] !== ts ||
      eV[174] !== e2
        ? ((e_ = eL.calloutId
            ? () => {
                if (td) {
                  let { sourceScreen: e, sourceElement: t } = (0, et.oj)(e2);
                  ts(eL.coinMint, {
                    itemPosition: eF,
                    marketCap: e$?.usd_market_cap ?? eL.marketCapUsd ?? 0,
                    sourceScreen: e,
                    sourceElement: t,
                    calloutId: eL.calloutId,
                    ...(tc.recommendationId
                      ? { rec_id: tc.recommendationId }
                      : {}),
                    ...(tc.positionId ? { positionId: tc.positionId } : {}),
                  });
                }
                e6(`${tP}?reply=1`);
              }
            : void 0),
          (eV[164] = e$?.usd_market_cap),
          (eV[165] = tP),
          (eV[166] = eL.calloutId),
          (eV[167] = eL.coinMint),
          (eV[168] = eL.marketCapUsd),
          (eV[169] = eF),
          (eV[170] = e6),
          (eV[171] = tc),
          (eV[172] = td),
          (eV[173] = ts),
          (eV[174] = e2),
          (eV[175] = e_))
        : (e_ = eV[175]);
      let ar = tv.toggle;
      eV[176] !== eL.calloutId ||
      eV[177] !== tk ||
      eV[178] !== tx ||
      eV[179] !== tb ||
      eV[180] !== tf.repostCount ||
      eV[181] !== tf.repostedByViewer
        ? ((eE = eL.calloutId
            ? {
                count: tf.repostCount ?? 0,
                active: tf.repostedByViewer,
                busy: tb.isBusy,
                onToggle: tx,
                onQuote: tk,
              }
            : void 0),
          (eV[176] = eL.calloutId),
          (eV[177] = tk),
          (eV[178] = tx),
          (eV[179] = tb),
          (eV[180] = tf.repostCount),
          (eV[181] = tf.repostedByViewer),
          (eV[182] = eE))
        : (eE = eV[182]);
      let an = tn ?? e$?.symbol ?? eL.coinSymbol;
      (eV[183] !== tE || eV[184] !== an
        ? ((eN = (0, K.f)(tE, an)),
          (eV[183] = tE),
          (eV[184] = an),
          (eV[185] = eN))
        : (eN = eV[185]),
        eV[186] !== tP ||
        eV[187] !== t_ ||
        eV[188] !== tv.toggle ||
        eV[189] !== tX ||
        eV[190] !== t0 ||
        eV[191] !== t3 ||
        eV[192] !== tY ||
        eV[193] !== tf.replyCount ||
        eV[194] !== tf.viewCount ||
        eV[195] !== t2 ||
        eV[196] !== aa ||
        eV[197] !== e_ ||
        eV[198] !== eE ||
        eV[199] !== eN
          ? ((eS = (0, t.jsx)(h.f, {
              density: aa,
              liveMarketCap: t3,
              replay: tY,
              replyCount: ai,
              viewCount: al,
              onOpenReplies: e_,
              likeCount: tX,
              likedByViewer: t0,
              onToggleLike: ar,
              repost: eE,
              shareUrl: tP,
              onShareOpen: t_,
              sharePositionCard: t2,
              shareTitle: eN,
            })),
            (eV[186] = tP),
            (eV[187] = t_),
            (eV[188] = tv.toggle),
            (eV[189] = tX),
            (eV[190] = t0),
            (eV[191] = t3),
            (eV[192] = tY),
            (eV[193] = tf.replyCount),
            (eV[194] = tf.viewCount),
            (eV[195] = t2),
            (eV[196] = aa),
            (eV[197] = e_),
            (eV[198] = eE),
            (eV[199] = eN),
            (eV[200] = eS))
          : (eS = eV[200]),
        eV[201] !== eK ||
        eV[202] !== tN ||
        eV[203] !== tE ||
        eV[204] !== tL ||
        eV[205] !== ez ||
        eV[206] !== e3 ||
        eV[207] !== eL.authorCcUserId ||
        eV[208] !== eL.userId ||
        eV[209] !== tT ||
        eV[210] !== tZ ||
        eV[211] !== e9 ||
        eV[212] !== e4 ||
        eV[213] !== eX ||
        eV[214] !== eZ ||
        eV[215] !== t5 ||
        eV[216] !== t9 ||
        eV[217] !== t8 ||
        eV[218] !== t7 ||
        eV[219] !== ae ||
        eV[220] !== at ||
        eV[221] !== eC ||
        eV[222] !== ek ||
        eV[223] !== ex ||
        eV[224] !== eT ||
        eV[225] !== eS ||
        eV[226] !== e0
          ? ((eM = (0, t.jsxs)(f.f, {
              className: ez,
              authorAddress: t4,
              authorUserId: t6,
              authorName: tE,
              authorAvatarUrl: tN,
              authorAvatarDecoration: t5,
              authorVerified: e9,
              createdAt: t9,
              note: t8,
              mediaUrl: t7,
              mediaPriority: e4,
              noteClassName: eZ,
              noteClampLines: eX,
              timeAlign: e0,
              updates: ae,
              noteSize: "md",
              href: tL,
              onAuthorClick: tT,
              density: at,
              divider: e3,
              nameAdornment: eC,
              topRight: ek,
              onClick: tZ,
              testId: "feed-callout-card",
              children: [ex, eT, eK, eS],
            })),
            (eV[201] = eK),
            (eV[202] = tN),
            (eV[203] = tE),
            (eV[204] = tL),
            (eV[205] = ez),
            (eV[206] = e3),
            (eV[207] = eL.authorCcUserId),
            (eV[208] = eL.userId),
            (eV[209] = tT),
            (eV[210] = tZ),
            (eV[211] = e9),
            (eV[212] = e4),
            (eV[213] = eX),
            (eV[214] = eZ),
            (eV[215] = t5),
            (eV[216] = t9),
            (eV[217] = t8),
            (eV[218] = t7),
            (eV[219] = ae),
            (eV[220] = at),
            (eV[221] = eC),
            (eV[222] = ek),
            (eV[223] = ex),
            (eV[224] = eT),
            (eV[225] = eS),
            (eV[226] = e0),
            (eV[227] = eM))
          : (eM = eV[227]));
      let ao = null !== tw;
      eV[228] !== tC
        ? ((eP = (e) => {
            e || tC(null);
          }),
          (eV[228] = tC),
          (eV[229] = eP))
        : (eP = eV[229]);
      let as = tn ?? e$?.symbol ?? eL.coinSymbol;
      return (
        eV[230] !== tu ||
        eV[231] !== eL.calloutId ||
        eV[232] !== eL.coinMint ||
        eV[233] !== e2
          ? ((eU = () => {
              (0, et.Sw)({
                mint: eL.coinMint,
                calloutId: eL.calloutId,
                isQuote: !0,
                surface: e2,
                ...tu,
              });
            }),
            (eV[230] = tu),
            (eV[231] = eL.calloutId),
            (eV[232] = eL.coinMint),
            (eV[233] = e2),
            (eV[234] = eU))
          : (eU = eV[234]),
        eV[235] !== tE ||
        eV[236] !== eL.calloutId ||
        eV[237] !== eL.coinMint ||
        eV[238] !== eL.createdAt ||
        eV[239] !== eL.note ||
        eV[240] !== tw ||
        eV[241] !== ao ||
        eV[242] !== eP ||
        eV[243] !== as ||
        eV[244] !== eU
          ? ((eA = (0, t.jsx)(m.f, {
              isOpen: ao,
              onOpenChange: eP,
              mint: eL.coinMint,
              calloutId: tw,
              cacheCalloutId: eL.calloutId,
              quotedAuthorName: tE,
              quotedNote: eL.note,
              quotedSymbol: as,
              quotedCreatedAt: eL.createdAt,
              onPosted: eU,
            })),
            (eV[235] = tE),
            (eV[236] = eL.calloutId),
            (eV[237] = eL.coinMint),
            (eV[238] = eL.createdAt),
            (eV[239] = eL.note),
            (eV[240] = tw),
            (eV[241] = ao),
            (eV[242] = eP),
            (eV[243] = as),
            (eV[244] = eU),
            (eV[245] = eA))
          : (eA = eV[245]),
        eV[246] !== th || eV[247] !== eM || eV[248] !== eA
          ? ((ej = (0, t.jsxs)("div", { ref: th, children: [eM, eA] })),
            (eV[246] = th),
            (eV[247] = eM),
            (eV[248] = eA),
            (eV[249] = ej))
          : (ej = eV[249]),
        ej
      );
    });
  e.s(["f", 0, en], 910976);
};
