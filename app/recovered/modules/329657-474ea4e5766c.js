// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => er], 329657);
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(292686),
    i = e.i(322315),
    a = e.i(254010),
    r = e.i(365089),
    s = e.i(545063),
    o = e.i(179736),
    d = e.i(458310),
    u = e.i(352386);
  e.i(12692);
  var c = e.i(398902),
    m = e.i(63289),
    f = e.i(609488),
    p = e.i(462860),
    h = e.i(782049),
    g = e.i(204478),
    x = e.i(662222),
    b = e.i(337689),
    y = e.i(875737),
    w = e.i(65484),
    v = e.i(745018),
    _ = e.i(815908),
    I = e.i(65407),
    N = e.i(713380),
    j = e.i(909318),
    k = e.i(56087),
    M = e.i(623288),
    C = e.i(214111),
    U = e.i(964626),
    S = e.i(79631),
    P = e.i(676271),
    A = e.i(850175),
    F = e.i(434644),
    T = e.i(12345),
    z = e.i(787639),
    W = e.i(662093),
    D = e.i(338319);
  function E(e) {
    let n,
      i,
      a,
      s,
      o,
      m,
      f,
      p,
      h,
      g,
      x,
      b,
      y,
      w,
      E,
      L,
      O,
      H,
      $,
      R,
      V,
      q,
      K = (0, l.c)(66),
      { t: Q } = (0, c.f)(),
      {
        mint: G,
        coin: J,
        positionWallet: X,
        calloutMarketCap: Y,
        calloutMultiple: Z,
        liveMarketCap: ee,
        onOpenCoin: et,
        hideCoinIdentity: el,
      } = e,
      en = void 0 !== el && el,
      [ei, ea] = (0, u.useState)(!1);
    (K[0] !== G ? ((n = [G]), (K[0] = G), (K[1] = n)) : (n = K[1]),
      K[2] !== X || K[3] !== n
        ? ((i = { userId: X, mints: n }), (K[2] = X), (K[3] = n), (K[4] = i))
        : (i = K[4]));
    let { summaryFor: er, positionFor: es, isLoading: eo } = (0, S._)(i);
    K[5] !== X
      ? ((a = [{ address: X, skipPnl: !1 }]), (K[5] = X), (K[6] = a))
      : (a = K[6]);
    let ed = a;
    K[7] !== ed || K[8] !== G
      ? ((s = { mint: G, holders: ed }), (K[7] = ed), (K[8] = G), (K[9] = s))
      : (s = K[9]);
    let eu = (0, P.f)(s);
    K[10] !== J || K[11] !== G
      ? ((o = J ?? (0, A.e)(G)), (K[10] = J), (K[11] = G), (K[12] = o))
      : (o = K[12]);
    let { prefetch: ec, hoverProps: em } = (0, A.W)(o);
    K[13] !== J?.symbol || K[14] !== G
      ? ((m = J?.symbol?.trim() || (0, r.d)(G, 4, 4)),
        (K[13] = J?.symbol),
        (K[14] = G),
        (K[15] = m))
      : (m = K[15]);
    let ef = m;
    K[16] !== J?.name
      ? ((f = J?.name?.trim() || ""), (K[16] = J?.name), (K[17] = f))
      : (f = K[17]);
    let ep = f,
      eh = J?.chain_id,
      eg = J?.usd_market_cap;
    K[18] !== J || K[19] !== G || K[20] !== eh || K[21] !== eg
      ? ((p = { mint: G, chainId: eh, fallbackMarketCap: eg, coin: J }),
        (K[18] = J),
        (K[19] = G),
        (K[20] = eh),
        (K[21] = eg),
        (K[22] = p))
      : (p = K[22]);
    let ex = (0, W.h)(p),
      eb = J?.chain_id;
    K[23] !== J || K[24] !== G || K[25] !== eb
      ? ((h = { mint: G, chainId: eb, coin: J }),
        (K[23] = J),
        (K[24] = G),
        (K[25] = eb),
        (K[26] = h))
      : (h = K[26]);
    let ey = (0, W.O)(h),
      ew = ee ?? ex ?? null;
    K[27] !== G || K[28] !== er
      ? ((g = er(G)), (K[27] = G), (K[28] = er), (K[29] = g))
      : (g = K[29]);
    let ev = g,
      e_ = ev?.positionUsd ?? null,
      eI = ev?.netPnlUsd ?? null,
      eN = ev?.displayPct ?? null,
      ej = ev?.isClosed ?? !1,
      ek = ev?.soldFraction ?? null,
      eM = es(G)?.amountHeld ?? null;
    K[30] !== eu || K[31] !== X
      ? ((x = eu.get(X)), (K[30] = eu), (K[31] = X), (K[32] = x))
      : (x = K[32]);
    let eC = x,
      eU = eC?.avgEntryUsdPerToken ?? null,
      eS = (0, W.b)(J);
    K[33] !== J || K[34] !== G
      ? ((b = J ?? { mint: G }), (K[33] = J), (K[34] = G), (K[35] = b))
      : (b = K[35]);
    let eP = b,
      eA = (0, F.f)(eP),
      eF = null != ev,
      eT = "number" == typeof Y && Y > 0 ? ey(Y) : null,
      ez =
        null != eT
          ? (0, U.f)(
              "number" == typeof ew && Number.isFinite(ew)
                ? ew / eT
                : (Z ?? null),
            )
          : null;
    (K[36] === Symbol.for("react.memo_cache_sentinel")
      ? ((y = (e) => {
          (e.stopPropagation(), ea(B));
        }),
        (K[36] = y))
      : (y = K[36]),
      K[37] !== Q
        ? ((w = Q("web.callouts.view_transactions")), (K[37] = Q), (K[38] = w))
        : (w = K[38]));
    let eW = ei && "rotate-180";
    (K[39] !== eW
      ? ((E = (0, D.c)(
          "size-4 shrink-0 text-text-tertiary transition-transform",
          eW,
        )),
        (K[39] = eW),
        (K[40] = E))
      : (E = K[40]),
      K[41] !== E
        ? ((L = (0, t.jsx)(v.vY, { "aria-hidden": !0, className: E })),
          (K[41] = E),
          (K[42] = L))
        : (L = K[42]),
      K[43] !== ei || K[44] !== w || K[45] !== L
        ? ((O = (0, t.jsxs)("button", {
            type: "button",
            "data-testid": "callout-detail-view-transactions",
            "aria-expanded": ei,
            onClick: y,
            className:
              "inline-flex w-full items-center justify-center gap-1 rounded-lg border border-border-tertiary bg-bg-tertiary px-3 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-border-tertiary hover:bg-bg-quaternary",
            children: [w, L],
          })),
          (K[43] = ei),
          (K[44] = w),
          (K[45] = L),
          (K[46] = O))
        : (O = K[46]),
      K[47] !== J || K[48] !== X || K[49] !== ei
        ? ((H =
            ei && J ? (0, t.jsx)(M.j, { coin: J, authorAddress: X }) : null),
          (K[47] = J),
          (K[48] = X),
          (K[49] = ei),
          (K[50] = H))
        : (H = K[50]),
      K[51] !== O || K[52] !== H
        ? (($ = (0, t.jsxs)(t.Fragment, { children: [O, H] })),
          (K[51] = O),
          (K[52] = H),
          (K[53] = $))
        : ($ = K[53]));
    let eD = $;
    K[54] !== J ||
    K[55] !== en ||
    K[56] !== em ||
    K[57] !== G ||
    K[58] !== ep ||
    K[59] !== et ||
    K[60] !== ec ||
    K[61] !== ef
      ? ((R = en
          ? null
          : (0, t.jsxs)(d.default, {
              href: `/coin/${G}`,
              prefetch: ec,
              ...em,
              onClick: et,
              className:
                "flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80 @[904px]:hidden",
              children: [
                (0, t.jsxs)("span", {
                  className: "relative block size-9 shrink-0",
                  children: [
                    (0, t.jsx)("span", {
                      className:
                        "block size-full overflow-hidden rounded-xl border border-border-primary bg-bg-primary",
                      children:
                        J && (0, T.X)({ ...J, mint: G })
                          ? (0, t.jsx)(j.f, {
                              alt: "",
                              className: "size-full object-cover",
                              height: 72,
                              imageType: k.d.COIN_IMAGE,
                              mint: G,
                              isBanned: J.is_banned,
                              sourceImageUrl: J.image_uri ?? void 0,
                              width: 72,
                            })
                          : null,
                    }),
                    (0, t.jsx)(N.f, {
                      mint: G,
                      chainId: J?.chain_id,
                      program: J?.program,
                      platform: J?.platform,
                      protocol: J?.protocol,
                      boardProgram: J?.board_program,
                      size: 14,
                      venueSize: (0, I.P)(36),
                      className: "absolute -bottom-0.5 -right-0.5",
                      chainClassName:
                        "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-bg-secondary",
                    }),
                  ],
                }),
                (0, t.jsxs)("span", {
                  className: "flex min-w-0 flex-col gap-0.5",
                  children: [
                    (0, t.jsx)("span", {
                      className:
                        "truncate text-xs font-semibold leading-4 text-white",
                      children: ep || ef,
                    }),
                    (0, t.jsx)("span", {
                      className:
                        "truncate text-xs leading-4 text-text-tertiary",
                      children: ef,
                    }),
                  ],
                }),
              ],
            })),
        (K[54] = J),
        (K[55] = en),
        (K[56] = em),
        (K[57] = G),
        (K[58] = ep),
        (K[59] = et),
        (K[60] = ec),
        (K[61] = ef),
        (K[62] = R))
      : (R = K[62]);
    let eE = eo
      ? (0, t.jsx)("div", {
          "aria-hidden": !0,
          className: "h-[76px] w-full animate-pulse rounded-xl bg-bg-tertiary",
        })
      : eF
        ? (0, t.jsx)(_.O, {
            positionUsd: e_,
            positionTokenAmount: eM,
            netPnlUsd: eI,
            displayPct: eN,
            spentUsd: eC?.costBasisUsd ?? null,
            avgEntryMcapUsd: null != eU && eS > 0 ? eU * eS : null,
            supplyShare: (0, z.f)(eM, eA),
            isClosed: ej,
            soldFraction: ek,
            className: "w-full",
            embeddedFooter: eD,
          })
        : null != eT && null != ez
          ? (0, t.jsxs)("div", {
              className:
                "flex w-full flex-col gap-3 rounded-xl border border-border-secondary bg-bg-secondary p-3",
              children: [
                (0, t.jsxs)("div", {
                  className: "flex w-full items-center justify-between",
                  children: [
                    (0, t.jsxs)("div", {
                      className: "flex flex-col gap-0.5",
                      children: [
                        (0, t.jsx)("span", {
                          className: "text-xs leading-4 text-text-tertiary",
                          children: Q("web.callouts.called_at"),
                        }),
                        (0, t.jsx)("span", {
                          className:
                            "text-sm font-semibold leading-4 tabular-nums text-text-primary",
                          children: (0, C.f)(eT),
                        }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex flex-col items-end gap-0.5",
                      children: [
                        (0, t.jsx)("span", {
                          className: "text-xs leading-4 text-text-tertiary",
                          children: Q("share.pnl.mode_multiple_label"),
                        }),
                        (0, t.jsx)("span", {
                          className: (0, D.c)(
                            "text-sm leading-4 tabular-nums",
                            "up" === (q = ez.tone)
                              ? "font-semibold text-gain"
                              : "down" === q
                                ? "font-semibold text-loss"
                                : "text-text-primary",
                          ),
                          children: ez.label,
                        }),
                      ],
                    }),
                  ],
                }),
                eD,
              ],
            })
          : null;
    return (
      K[63] !== R || K[64] !== eE
        ? ((V = (0, t.jsxs)("div", {
            className: "flex w-full flex-col gap-2",
            children: [R, eE],
          })),
          (K[63] = R),
          (K[64] = eE),
          (K[65] = V))
        : (V = K[65]),
      V
    );
  }
  function B(e) {
    return !e;
  }
  var L = e.i(229937),
    O = e.i(741084),
    H = e.i(481522),
    $ = e.i(627092),
    R = e.i(210529),
    V = e.i(737384),
    q = e.i(968185),
    K = e.i(598005),
    Q = e.i(860787),
    G = e.i(257004),
    J = e.i(917341),
    X = e.i(662986),
    Y = e.i(164289),
    Z = e.i(839931),
    ee = e.i(720772),
    et = e.i(193504),
    el = e.i(595673),
    en = e.i(198825);
  let ei = "callout_detail",
    ea = { mine: n.k9.CALLOUTS_CARD_MINE, other: n.k9.CALLOUTS_CARD_OTHER };
  function er(e) {
    let n,
      v,
      _,
      I,
      N,
      j,
      k,
      M,
      C,
      U,
      P,
      A,
      F,
      T,
      z,
      B,
      er,
      eo,
      ed,
      eu,
      ec,
      em,
      ef,
      ep,
      eh,
      eg,
      ex,
      eb,
      ey,
      ew,
      ev,
      e_ = (0, l.c)(173),
      {
        callout: eI,
        permalinkCalloutId: eN,
        coin: ej,
        user: ek,
        liveMarketCap: eM,
        hasCommunityThread: eC,
        viewerAddress: eU,
        isLoggedIn: eS,
        hideCoinIdentity: eP,
        hideReplayAction: eA,
        className: eF,
      } = e,
      eT = void 0 !== eP && eP,
      ez = void 0 !== eA && eA,
      { t: eW } = (0, c.f)(),
      eD = (0, s.$)();
    e_[0] !== eI
      ? ((n = (0, X.I)(eI)), (e_[0] = eI), (e_[1] = n))
      : (n = e_[1]);
    let eE = n,
      eB = (0, a.k)(i.D.WEB_PACKS, !1);
    e_[2] !== eI || e_[3] !== eB
      ? ((v = eB ? (0, J.r)(eI.coinMint, eI) : null),
        (e_[2] = eI),
        (e_[3] = eB),
        (e_[4] = v))
      : (v = e_[4]);
    let eL = v,
      eO = null !== eL,
      eH = (0, R.q)(),
      e$ = ej?.chain_id,
      eR = ej?.usd_market_cap;
    e_[5] !== eI.coinMint || e_[6] !== ej || e_[7] !== e$ || e_[8] !== eR
      ? ((_ = {
          mint: eI.coinMint,
          chainId: e$,
          fallbackMarketCap: eR,
          coin: ej,
        }),
        (e_[5] = eI.coinMint),
        (e_[6] = ej),
        (e_[7] = e$),
        (e_[8] = eR),
        (e_[9] = _))
      : (_ = e_[9]);
    let eV = (0, W.h)(_);
    e_[10] !== eI || e_[11] !== ej
      ? ((I = { surface: ei, callout: eI, position: 0, coin: ej }),
        (e_[10] = eI),
        (e_[11] = ej),
        (e_[12] = I))
      : (I = e_[12]);
    let eq = (0, K.f)(I);
    e_[13] !== eI.calloutId || e_[14] !== eI.coinMint || e_[15] !== eI.userId
      ? ((N = {
          mint: eI.coinMint,
          calloutId: eI.calloutId,
          authorAddress: eI.userId,
        }),
        (e_[13] = eI.calloutId),
        (e_[14] = eI.coinMint),
        (e_[15] = eI.userId),
        (e_[16] = N))
      : (N = e_[16]);
    let eK = (0, H.f)(N),
      eQ = eC ? eI.calloutId : void 0;
    e_[17] !== eI.coinMint ||
    e_[18] !== eI.userId ||
    e_[19] !== eC ||
    e_[20] !== eQ
      ? ((j = {
          mint: eI.coinMint,
          calloutId: eQ,
          authorAddress: eI.userId,
          enabled: eC,
        }),
        (e_[17] = eI.coinMint),
        (e_[18] = eI.userId),
        (e_[19] = eC),
        (e_[20] = eQ),
        (e_[21] = j))
      : (j = e_[21]);
    let { threadReplyCount: eG } = (0, $.f)(j),
      eJ = null != eI.replyCount ? Math.max(eI.replyCount, eG) : null,
      eX = (0, V.f)(),
      eY = (0, q.f)(),
      { setShowWallet: eZ } = (0, en.useConnectWallet)(),
      e0 = (0, o.s)(eI.authorCcUserId ?? eI.userId),
      e1 =
        ek?.username?.trim() ||
        eI.caller?.username?.trim() ||
        (0, r.d)(eI.userId, 4, 4),
      e2 = ek?.profile_image?.trim() || eI.caller?.avatarUrl || void 0;
    e_[22] !== eI.coinMint || e_[23] !== ej || e_[24] !== eE
      ? ((k = ej?.symbol
          ? `$${ej.symbol}`
          : eE
            ? `$${(0, X.j)(eI.coinMint)}`
            : (0, r.d)(eI.coinMint, 4, 4)),
        (e_[22] = eI.coinMint),
        (e_[23] = ej),
        (e_[24] = eE),
        (e_[25] = k))
      : (k = e_[25]);
    let e3 = k;
    e_[26] !== eI.userId || e_[27] !== eD
      ? ((M = eD(eI.userId)), (e_[26] = eI.userId), (e_[27] = eD), (e_[28] = M))
      : (M = e_[28]);
    let e4 = M;
    e_[29] !== eI.authorCcUserId || e_[30] !== e4 || e_[31] !== eD
      ? ((C = !e4 && !eD(eI.authorCcUserId)),
        (e_[29] = eI.authorCcUserId),
        (e_[30] = e4),
        (e_[31] = eD),
        (e_[32] = C))
      : (C = e_[32]);
    let e5 = C;
    e_[33] !== eI.coinMint
      ? ((U = [eI.coinMint]), (e_[33] = eI.coinMint), (e_[34] = U))
      : (U = e_[34]);
    let e6 = !eE && !eO;
    e_[35] !== eI.userId || e_[36] !== U || e_[37] !== e6
      ? ((P = { userId: eI.userId, mints: U, enabled: e6 }),
        (e_[35] = eI.userId),
        (e_[36] = U),
        (e_[37] = e6),
        (e_[38] = P))
      : (P = e_[38]);
    let { summaryFor: e7 } = (0, S._)(P),
      e8 = (0, et.D)({
        mint: eI.coinMint,
        coin: ej ?? null,
        coinName: ej?.name ?? null,
        coinSymbol: ej?.symbol ?? null,
        coinImageUri: ej?.image_uri ?? null,
        summary: e7(eI.coinMint),
        holder: {
          address: eI.userId,
          displayName: e1,
          avatarUrl:
            (0, Q.Z)({ sourceUrl: (0, O.f)(e2), width: Q.z.list }) ?? null,
          isVerified: e0,
          xUsername: ek?.x_username ?? null,
        },
        callout: eI,
      });
    e_[39] !== e8
      ? ((A = e8 ? { data: e8, sourceElement: ea } : null),
        (e_[39] = e8),
        (e_[40] = A))
      : (A = e_[40]);
    let e9 = A,
      te = eI.likedByViewer ?? !1;
    e_[41] !== eI.calloutId ||
    e_[42] !== eI.coinMint ||
    e_[43] !== eI.note ||
    e_[44] !== te ||
    e_[45] !== eN ||
    e_[46] !== eZ ||
    e_[47] !== eW ||
    e_[48] !== eX ||
    e_[49] !== eU
      ? ((F = () => {
          if (!eX.isPending) {
            if (!eU) return void eZ(!0);
            eX.mutate(
              {
                mint: eI.coinMint,
                calloutId: eI.calloutId,
                cacheCalloutId: eN,
                liked: !te,
              },
              {
                onSuccess: () => {
                  (0, el.Ui)({
                    mint: eI.coinMint,
                    calloutId: eI.calloutId,
                    isLiked: !te,
                    surface: ei,
                    thesisText: eI.note ?? void 0,
                  });
                },
                onError: () => {
                  m.c.error(eW("web.callouts.like_update_failed"));
                },
              },
            );
          }
        }),
        (e_[41] = eI.calloutId),
        (e_[42] = eI.coinMint),
        (e_[43] = eI.note),
        (e_[44] = te),
        (e_[45] = eN),
        (e_[46] = eZ),
        (e_[47] = eW),
        (e_[48] = eX),
        (e_[49] = eU),
        (e_[50] = F))
      : (F = e_[50]);
    let tt = F,
      tl = eI.repostedByViewer ?? !1,
      [tn, ti] = (0, u.useState)(!1);
    e_[51] !== eI.calloutId ||
    e_[52] !== eI.coinMint ||
    e_[53] !== tl ||
    e_[54] !== eN ||
    e_[55] !== eZ ||
    e_[56] !== eW ||
    e_[57] !== eY ||
    e_[58] !== eU
      ? ((T = () => {
          if (!eY.isPending) {
            if (!eU) return void eZ(!0);
            (tl ||
              (0, el.Sw)({
                mint: eI.coinMint,
                calloutId: eI.calloutId,
                isQuote: !1,
                surface: ei,
              }),
              eY.mutate(
                {
                  mint: eI.coinMint,
                  calloutId: eI.calloutId,
                  cacheCalloutId: eN,
                  reposted: !tl,
                },
                {
                  onError: (e) => {
                    m.c.error(eW((0, Y.Q)(e)));
                  },
                },
              ));
          }
        }),
        (e_[51] = eI.calloutId),
        (e_[52] = eI.coinMint),
        (e_[53] = tl),
        (e_[54] = eN),
        (e_[55] = eZ),
        (e_[56] = eW),
        (e_[57] = eY),
        (e_[58] = eU),
        (e_[59] = T))
      : (T = e_[59]);
    let ta = T;
    e_[60] !== eZ || e_[61] !== eU
      ? ((z = () => {
          eU ? ti(!0) : eZ(!0);
        }),
        (e_[60] = eZ),
        (e_[61] = eU),
        (e_[62] = z))
      : (z = e_[62]);
    let tr = z;
    e_[63] !== eI.authorCcUserId ||
    e_[64] !== eI.calloutId ||
    e_[65] !== eI.coinMint ||
    e_[66] !== eI.userId ||
    e_[67] !== ej?.usd_market_cap ||
    e_[68] !== eM ||
    e_[69] !== eH
      ? ((B = () => {
          eH({
            mint: eI.coinMint,
            calloutId: eI.calloutId,
            surface: ei,
            absolutePosition: 0,
            usdMarketCap: eM ?? ej?.usd_market_cap ?? void 0,
            authorId: (0, G.r)({
              authorId: eI.userId,
              authorCcUserId: eI.authorCcUserId,
            }),
          });
        }),
        (e_[63] = eI.authorCcUserId),
        (e_[64] = eI.calloutId),
        (e_[65] = eI.coinMint),
        (e_[66] = eI.userId),
        (e_[67] = ej?.usd_market_cap),
        (e_[68] = eM),
        (e_[69] = eH),
        (e_[70] = B))
      : (B = e_[70]);
    let ts = B,
      to = eI.userId,
      td = eI.authorCcUserId,
      tu = ek?.resolved_avatar_decoration ?? eI.caller?.avatarDecoration,
      tc = eI.createdAt,
      tm = eI.note,
      tf = eI.mediaUrl;
    (e_[71] !== eI.caller
      ? ((er = eI.caller?.twitterUrl
          ? (0, t.jsx)(y.f, { twitterUrl: eI.caller.twitterUrl })
          : void 0),
        (e_[71] = eI.caller),
        (e_[72] = er))
      : (er = e_[72]),
      e_[73] !== eI.coinMint ||
      e_[74] !== eI.userId ||
      e_[75] !== ej ||
      e_[76] !== eO ||
      e_[77] !== eS ||
      e_[78] !== eE
        ? ((eo =
            eE || eO
              ? null
              : (0, t.jsx)(b.$, {
                  mint: eI.coinMint,
                  isLoggedIn: eS,
                  excludeWalletAddress: eI.userId,
                  coin: ej,
                })),
          (e_[73] = eI.coinMint),
          (e_[74] = eI.userId),
          (e_[75] = ej),
          (e_[76] = eO),
          (e_[77] = eS),
          (e_[78] = eE),
          (e_[79] = eo))
        : (eo = e_[79]),
      e_[80] !== e1 || e_[81] !== eI.userId || e_[82] !== eS || e_[83] !== e4
        ? ((ed = e4
            ? null
            : (0, t.jsx)(L.f, {
                userAddress: eI.userId,
                displayName: e1,
                isLoggedIn: eS,
                size: "sm",
                variant: "icon",
              })),
          (e_[80] = e1),
          (e_[81] = eI.userId),
          (e_[82] = eS),
          (e_[83] = e4),
          (e_[84] = ed))
        : (ed = e_[84]),
      e_[85] !== e1 ||
      e_[86] !== eI.authorCcUserId ||
      e_[87] !== eI.calloutId ||
      e_[88] !== e5
        ? ((eu = e5
            ? (0, t.jsx)(f.f, {
                target: { kind: "callout", id: eI.calloutId },
                author: { userId: eI.authorCcUserId, name: e1 },
                density: "comfortable",
              })
            : null),
          (e_[85] = e1),
          (e_[86] = eI.authorCcUserId),
          (e_[87] = eI.calloutId),
          (e_[88] = e5),
          (e_[89] = eu))
        : (eu = e_[89]),
      e_[90] !== eo || e_[91] !== ed || e_[92] !== eu
        ? ((ec = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [eo, ed, eu],
          })),
          (e_[90] = eo),
          (e_[91] = ed),
          (e_[92] = eu),
          (e_[93] = ec))
        : (ec = e_[93]),
      e_[94] !== eF
        ? ((em = (0, D.c)("py-4", eF)), (e_[94] = eF), (e_[95] = em))
        : (em = e_[95]),
      e_[96] !== eI.calloutId ||
      e_[97] !== eI.coinMint ||
      e_[98] !== eI.marketCap ||
      e_[99] !== eI.multiple ||
      e_[100] !== eI.perp ||
      e_[101] !== eI.userId ||
      e_[102] !== ej ||
      e_[103] !== eL ||
      e_[104] !== ts ||
      e_[105] !== eT ||
      e_[106] !== eE ||
      e_[107] !== eM
        ? ((ef = eE
            ? (0, t.jsx)(w.f, {
                coin: eI.coinMint,
                perp: eI.perp ? (0, X.z)(eI.perp) : null,
                multiple: eI.multiple,
                onOpenMarket: ts,
                hideMarketIdentity: eT,
              })
            : eL
              ? (0, t.jsx)(d.default, {
                  href: (0, Z.h)(eI.coinMint, eI.calloutId),
                  onClick: ts,
                  "data-testid": "callout-detail-collectible-link",
                  className:
                    "block w-full rounded-xl transition-opacity hover:opacity-80",
                  children: (0, t.jsx)(x.f, {
                    embed: eL,
                    variant: "feed",
                    density: "comfortable",
                    className: "w-full",
                  }),
                })
              : (0, t.jsx)(E, {
                  mint: eI.coinMint,
                  coin: ej,
                  positionWallet: eI.userId,
                  calloutMarketCap: eI.marketCap,
                  calloutMultiple: eI.multiple,
                  liveMarketCap: eM,
                  onOpenCoin: ts,
                  hideCoinIdentity: eT,
                })),
          (e_[96] = eI.calloutId),
          (e_[97] = eI.coinMint),
          (e_[98] = eI.marketCap),
          (e_[99] = eI.multiple),
          (e_[100] = eI.perp),
          (e_[101] = eI.userId),
          (e_[102] = ej),
          (e_[103] = eL),
          (e_[104] = ts),
          (e_[105] = eT),
          (e_[106] = eE),
          (e_[107] = eM),
          (e_[108] = ef))
        : (ef = e_[108]),
      e_[109] !== e1 ||
      e_[110] !== eI.coinMint ||
      e_[111] !== eI.userId ||
      e_[112] !== ej ||
      e_[113] !== ez ||
      e_[114] !== eO ||
      e_[115] !== eE
        ? ((ep =
            !ez && !eE && !eO && (0, ee.B)(ej)
              ? { mint: eI.coinMint, walletAddress: eI.userId, ownerLabel: e1 }
              : void 0),
          (e_[109] = e1),
          (e_[110] = eI.coinMint),
          (e_[111] = eI.userId),
          (e_[112] = ej),
          (e_[113] = ez),
          (e_[114] = eO),
          (e_[115] = eE),
          (e_[116] = ep))
        : (ep = e_[116]));
    let tp = eO ? null : (eM ?? eV ?? null),
      th = eC ? eJ : null,
      tg = eI.viewCount ?? null,
      tx = eC ? (eI.likeCount ?? 0) : null;
    e_[117] !== eI.repostCount ||
    e_[118] !== tr ||
    e_[119] !== ta ||
    e_[120] !== eC ||
    e_[121] !== tl ||
    e_[122] !== eY
      ? ((eh = eC
          ? {
              count: eI.repostCount ?? 0,
              active: tl,
              busy: eY.isPending,
              onToggle: ta,
              onQuote: tr,
            }
          : void 0),
        (e_[117] = eI.repostCount),
        (e_[118] = tr),
        (e_[119] = ta),
        (e_[120] = eC),
        (e_[121] = tl),
        (e_[122] = eY),
        (e_[123] = eh))
      : (eh = e_[123]);
    let tb = `/callouts/${encodeURIComponent(eI.coinMint)}/${eI.calloutId}`,
      ty = `${e1} called ${e3} on pump.fun`,
      tw = eE || eO ? null : e9;
    return (
      e_[124] !== tt ||
      e_[125] !== te ||
      e_[126] !== ep ||
      e_[127] !== tp ||
      e_[128] !== th ||
      e_[129] !== tg ||
      e_[130] !== tx ||
      e_[131] !== eh ||
      e_[132] !== tb ||
      e_[133] !== ty ||
      e_[134] !== tw
        ? ((eg = (0, t.jsx)(h.f, {
            replay: ep,
            currentMarketCap: tp,
            replyCount: th,
            viewCount: tg,
            onOpenReplies: es,
            likeCount: tx,
            likedByViewer: te,
            onToggleLike: tt,
            repost: eh,
            shareUrl: tb,
            shareTitle: ty,
            sharePositionCard: tw,
          })),
          (e_[124] = tt),
          (e_[125] = te),
          (e_[126] = ep),
          (e_[127] = tp),
          (e_[128] = th),
          (e_[129] = tg),
          (e_[130] = tx),
          (e_[131] = eh),
          (e_[132] = tb),
          (e_[133] = ty),
          (e_[134] = tw),
          (e_[135] = eg))
        : (eg = e_[135]),
      e_[136] !== eK ||
      e_[137] !== e1 ||
      e_[138] !== eI.authorCcUserId ||
      e_[139] !== eI.createdAt ||
      e_[140] !== eI.mediaUrl ||
      e_[141] !== eI.note ||
      e_[142] !== eI.userId ||
      e_[143] !== e0 ||
      e_[144] !== e2 ||
      e_[145] !== tu ||
      e_[146] !== er ||
      e_[147] !== ec ||
      e_[148] !== em ||
      e_[149] !== ef ||
      e_[150] !== eg
        ? ((ex = (0, t.jsxs)(g.f, {
            authorAddress: to,
            authorUserId: td,
            authorName: e1,
            authorAvatarUrl: e2,
            authorAvatarDecoration: tu,
            authorVerified: e0,
            createdAt: tc,
            note: tm,
            mediaUrl: tf,
            updates: eK,
            updatesCollapsible: !1,
            updatesExpandableComments: !0,
            noteSize: "lg",
            contentGap: "md",
            nameAdornment: er,
            topRight: ec,
            testId: "callout-detail-card",
            noteTestId: "callout-detail-note",
            className: em,
            children: [ef, eg],
          })),
          (e_[136] = eK),
          (e_[137] = e1),
          (e_[138] = eI.authorCcUserId),
          (e_[139] = eI.createdAt),
          (e_[140] = eI.mediaUrl),
          (e_[141] = eI.note),
          (e_[142] = eI.userId),
          (e_[143] = e0),
          (e_[144] = e2),
          (e_[145] = tu),
          (e_[146] = er),
          (e_[147] = ec),
          (e_[148] = em),
          (e_[149] = ef),
          (e_[150] = eg),
          (e_[151] = ex))
        : (ex = e_[151]),
      e_[152] !== eI.coinMint || e_[153] !== ej?.symbol || e_[154] !== eE
        ? ((eb = ej?.symbol ?? (eE ? (0, X.j)(eI.coinMint) : void 0)),
          (e_[152] = eI.coinMint),
          (e_[153] = ej?.symbol),
          (e_[154] = eE),
          (e_[155] = eb))
        : (eb = e_[155]),
      e_[156] !== eI.calloutId || e_[157] !== eI.coinMint
        ? ((ey = () => {
            (0, el.Sw)({
              mint: eI.coinMint,
              calloutId: eI.calloutId,
              isQuote: !0,
              surface: ei,
            });
          }),
          (e_[156] = eI.calloutId),
          (e_[157] = eI.coinMint),
          (e_[158] = ey))
        : (ey = e_[158]),
      e_[159] !== e1 ||
      e_[160] !== eI.calloutId ||
      e_[161] !== eI.coinMint ||
      e_[162] !== eI.createdAt ||
      e_[163] !== eI.note ||
      e_[164] !== tn ||
      e_[165] !== eN ||
      e_[166] !== eb ||
      e_[167] !== ey
        ? ((ew = (0, t.jsx)(p.f, {
            isOpen: tn,
            onOpenChange: ti,
            mint: eI.coinMint,
            calloutId: eI.calloutId,
            cacheCalloutId: eN,
            quotedAuthorName: e1,
            quotedNote: eI.note,
            quotedSymbol: eb,
            quotedCreatedAt: eI.createdAt,
            onPosted: ey,
          })),
          (e_[159] = e1),
          (e_[160] = eI.calloutId),
          (e_[161] = eI.coinMint),
          (e_[162] = eI.createdAt),
          (e_[163] = eI.note),
          (e_[164] = tn),
          (e_[165] = eN),
          (e_[166] = eb),
          (e_[167] = ey),
          (e_[168] = ew))
        : (ew = e_[168]),
      e_[169] !== eq || e_[170] !== ex || e_[171] !== ew
        ? ((ev = (0, t.jsxs)("div", { ref: eq, children: [ex, ew] })),
          (e_[169] = eq),
          (e_[170] = ex),
          (e_[171] = ew),
          (e_[172] = ev))
        : (ev = e_[172]),
      ev
    );
  }
  function es() {
    let e = document.querySelector('[data-testid="callout-reply-input"]');
    if (e) {
      (e.focus({ preventScroll: !0 }),
        e.scrollIntoView({ block: "center", behavior: "smooth" }));
      return;
    }
    document
      .querySelector('[data-testid="callout-replies-section"]')
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }
};
