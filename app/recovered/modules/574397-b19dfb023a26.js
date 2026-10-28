// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(292686),
    s = e.i(365089),
    l = e.i(574472),
    r = e.i(179736),
    a = e.i(599077),
    o = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    d = e.i(63289),
    c = e.i(773942),
    m = e.i(665579),
    _ = e.i(782049),
    h = e.i(204478),
    g = e.i(875737),
    p = e.i(741084),
    b = e.i(481522),
    f = e.i(116458),
    z = e.i(464154),
    w = e.i(737384),
    y = e.i(860787),
    v = e.i(137555),
    x = e.i(541710),
    k = e.i(646908),
    j = e.i(720772),
    S = e.i(779106);
  function T(e) {
    let T,
      I,
      A,
      E,
      L,
      C,
      N,
      q,
      P,
      M,
      U,
      O,
      $,
      R,
      F,
      D = (0, i.c)(73),
      { coin: B } = e,
      { t: K } = (0, u.f)(),
      { address: W, user: H, userId: X } = (0, l.F)(),
      Q = (0, S.f)("own-mint-callout"),
      G = (0, r.s)(Q),
      V = (0, a.useRouter)(),
      [Y, J] = (0, o.useState)(!1),
      Z = (0, x.l)(),
      ee = (0, k.L)(B.chain_id)
        ? k.J
        : (0, k.B)(B.chain_id) && (0, x.M)(Z)
          ? k.d
          : void 0,
      et = null !== Q;
    D[0] !== B.mint || D[1] !== ee || D[2] !== et || D[3] !== Q
      ? ((T = { mint: B.mint, chain: ee, accountKey: Q, enabled: et }),
        (D[0] = B.mint),
        (D[1] = ee),
        (D[2] = et),
        (D[3] = Q),
        (D[4] = T))
      : (T = D[4]);
    let { callout: ei } = (0, f.W)(T),
      en = B.mint,
      es = ei?.calloutId,
      el = !!ei?.calloutId;
    D[5] !== B.mint || D[6] !== es || D[7] !== el
      ? ((I = { mint: en, calloutId: es, enabled: el }),
        (D[5] = B.mint),
        (D[6] = es),
        (D[7] = el),
        (D[8] = I))
      : (I = D[8]);
    let { callout: er } = (0, z.u)(I),
      ea = (0, w.f)(),
      eo = B.mint,
      eu = ei?.calloutId,
      ed = !!ei?.calloutId;
    D[9] !== W || D[10] !== B.mint || D[11] !== eu || D[12] !== ed
      ? ((A = { mint: eo, calloutId: eu, authorAddress: W, enabled: ed }),
        (D[9] = W),
        (D[10] = B.mint),
        (D[11] = eu),
        (D[12] = ed),
        (D[13] = A))
      : (A = D[13]);
    let ec = (0, b.f)(A);
    if (!W || void 0 === ei) return null;
    if (null === ei) {
      let e;
      return (
        D[14] !== B
          ? ((e = (0, t.jsx)(c.f, {
              variant: "card",
              coin: B,
              screen: n.Ae.COIN_DETAILS,
            })),
            (D[14] = B),
            (D[15] = e))
          : (e = D[15]),
        e
      );
    }
    let em = `/callouts/${B.mint}/${ei.calloutId}`;
    D[16] !== K || D[17] !== H?.username
      ? ((E = H?.username?.trim() || K("common.you")),
        (D[16] = K),
        (D[17] = H?.username),
        (D[18] = E))
      : (E = D[18]);
    let e_ = E;
    D[19] !== H?.profile_image
      ? ((L = (0, y.Z)({
          sourceUrl: (0, p.f)(H?.profile_image),
          width: y.z.list,
        })),
        (D[19] = H?.profile_image),
        (D[20] = L))
      : (L = D[20]);
    let eh = L,
      eg = er?.likeCount ?? 0,
      ep = er?.replyCount ?? 0,
      eb = er?.likedByViewer ?? !1;
    D[21] !== B.mint ||
    D[22] !== eb ||
    D[23] !== K ||
    D[24] !== ea ||
    D[25] !== ei.calloutId
      ? ((C = () => {
          ei.calloutId &&
            ea.mutate(
              { mint: B.mint, calloutId: ei.calloutId, liked: !eb },
              { onError: () => d.c.error(K("web.coin.like_update_error")) },
            );
        }),
        (D[21] = B.mint),
        (D[22] = eb),
        (D[23] = K),
        (D[24] = ea),
        (D[25] = ei.calloutId),
        (D[26] = C))
      : (C = D[26]);
    let ef = C,
      ez = H?.resolved_avatar_decoration,
      ew = ei.createdAt,
      ey = ei.note,
      ev = ei.mediaUrl ?? er?.mediaUrl;
    (D[27] !== er
      ? ((N = er?.caller?.twitterUrl
          ? (0, t.jsx)(g.f, { twitterUrl: er.caller.twitterUrl })
          : void 0),
        (D[27] = er),
        (D[28] = N))
      : (N = D[28]),
      D[29] === Symbol.for("react.memo_cache_sentinel")
        ? ((q = () => J(!0)), (D[29] = q))
        : (q = D[29]),
      D[30] !== W || D[31] !== B || D[32] !== H?.username
        ? ((P = (0, j.B)(B)
            ? {
                mint: B.mint,
                walletAddress: W,
                ownerLabel: H?.username?.trim() || (0, s.d)(W, 4, 4),
              }
            : void 0),
          (D[30] = W),
          (D[31] = B),
          (D[32] = H?.username),
          (D[33] = P))
        : (P = D[33]));
    let ex = er?.viewCount ?? null;
    return (
      D[34] !== em || D[35] !== V
        ? ((M = () => V.push(`${em}?reply=1`)),
          (D[34] = em),
          (D[35] = V),
          (D[36] = M))
        : (M = D[36]),
      D[37] !== W || D[38] !== B.symbol || D[39] !== H?.username
        ? ((U = (0, v.f)(H?.username?.trim() || (0, s.d)(W, 4, 4), B.symbol)),
          (D[37] = W),
          (D[38] = B.symbol),
          (D[39] = H?.username),
          (D[40] = U))
        : (U = D[40]),
      D[41] !== em ||
      D[42] !== ef ||
      D[43] !== eg ||
      D[44] !== eb ||
      D[45] !== ep ||
      D[46] !== P ||
      D[47] !== ex ||
      D[48] !== M ||
      D[49] !== U
        ? ((O = (0, t.jsx)(_.f, {
            onUpdateCallout: q,
            replay: P,
            replyCount: ep,
            viewCount: ex,
            onOpenReplies: M,
            likeCount: eg,
            likedByViewer: eb,
            onToggleLike: ef,
            shareUrl: em,
            shareTitle: U,
            className: "pl-0",
          })),
          (D[41] = em),
          (D[42] = ef),
          (D[43] = eg),
          (D[44] = eb),
          (D[45] = ep),
          (D[46] = P),
          (D[47] = ex),
          (D[48] = M),
          (D[49] = U),
          (D[50] = O))
        : (O = D[50]),
      D[51] !== W ||
      D[52] !== e_ ||
      D[53] !== eh ||
      D[54] !== G ||
      D[55] !== ez ||
      D[56] !== ev ||
      D[57] !== N ||
      D[58] !== O ||
      D[59] !== X ||
      D[60] !== ei.createdAt ||
      D[61] !== ei.note ||
      D[62] !== ec
        ? (($ = (0, t.jsx)(h.f, {
            authorAddress: W,
            authorUserId: X,
            authorName: e_,
            authorAvatarUrl: eh,
            authorAvatarDecoration: ez,
            authorVerified: G,
            createdAt: ew,
            note: ey,
            mediaUrl: ev,
            updates: ec,
            noteSize: "md",
            nameAdornment: N,
            className: "border-b-0 py-0 pt-1",
            testId: "pnl-viewer-callout",
            children: O,
          })),
          (D[51] = W),
          (D[52] = e_),
          (D[53] = eh),
          (D[54] = G),
          (D[55] = ez),
          (D[56] = ev),
          (D[57] = N),
          (D[58] = O),
          (D[59] = X),
          (D[60] = ei.createdAt),
          (D[61] = ei.note),
          (D[62] = ec),
          (D[63] = $))
        : ($ = D[63]),
      D[64] !== B ||
      D[65] !== Y ||
      D[66] !== ei.calloutId ||
      D[67] !== ei.createdAt ||
      D[68] !== ei.note
        ? ((R = (0, t.jsx)(m.f, {
            isOpen: Y,
            onOpenChange: J,
            coin: B,
            calloutId: ei.calloutId,
            note: ei.note,
            createdAt: ei.createdAt,
            entryPoint: "position_card",
          })),
          (D[64] = B),
          (D[65] = Y),
          (D[66] = ei.calloutId),
          (D[67] = ei.createdAt),
          (D[68] = ei.note),
          (D[69] = R))
        : (R = D[69]),
      D[70] !== $ || D[71] !== R
        ? ((F = (0, t.jsxs)(t.Fragment, { children: [$, R] })),
          (D[70] = $),
          (D[71] = R),
          (D[72] = F))
        : (F = D[72]),
      F
    );
  }
  e.s(["f", 0, T], 377920);
  var I = e.i(815908),
    A = e.i(256272);
  e.s(
    [
      "a",
      0,
      5e3,
      "J",
      0,
      function (e) {
        let n,
          s,
          l,
          r,
          a = (0, i.c)(21),
          {
            coin: o,
            positionUsd: u,
            positionTokenAmount: d,
            netPnlUsd: c,
            displayPct: m,
            spentUsd: _,
            isClosed: h,
            soldFraction: g,
            supplyShare: p,
            onRefresh: b,
            embeddedFooter: f,
            tpSlSlot: z,
          } = e,
          w = void 0 === g ? null : g,
          y = void 0 === p ? null : p,
          v = "panel" === (0, A.u)();
        return (
          a[0] !== b
            ? ((n = { intervalMs: 5e3, onRefresh: b }), (a[0] = b), (a[1] = n))
            : (n = a[1]),
          a[2] !== m ||
          a[3] !== f ||
          a[4] !== v ||
          a[5] !== h ||
          a[6] !== c ||
          a[7] !== d ||
          a[8] !== u ||
          a[9] !== w ||
          a[10] !== _ ||
          a[11] !== y ||
          a[12] !== n
            ? ((s = (0, t.jsx)(I.O, {
                flat: v,
                positionUsd: u,
                positionTokenAmount: d,
                netPnlUsd: c,
                displayPct: m,
                spentUsd: _,
                isClosed: h,
                soldFraction: w,
                supplyShare: y,
                refresh: n,
                embeddedFooter: f,
              })),
              (a[2] = m),
              (a[3] = f),
              (a[4] = v),
              (a[5] = h),
              (a[6] = c),
              (a[7] = d),
              (a[8] = u),
              (a[9] = w),
              (a[10] = _),
              (a[11] = y),
              (a[12] = n),
              (a[13] = s))
            : (s = a[13]),
          a[14] !== o || a[15] !== h
            ? ((l = h ? null : (0, t.jsx)(T, { coin: o })),
              (a[14] = o),
              (a[15] = h),
              (a[16] = l))
            : (l = a[16]),
          a[17] !== s || a[18] !== l || a[19] !== z
            ? ((r = (0, t.jsxs)("div", {
                className: "flex flex-col gap-3",
                children: [s, z, l],
              })),
              (a[17] = s),
              (a[18] = l),
              (a[19] = z),
              (a[20] = r))
            : (r = a[20]),
          r
        );
      },
    ],
    574397,
  );
  var E = e.i(745018),
    L = e.i(439587),
    C = e.i(426091),
    N = e.i(352247),
    q = e.i(453706),
    P = e.i(266300),
    M = e.i(248208);
  let U = (0, q.default)(() => e.A(455681).then((e) => e.AddEvmTpSlDialog), {
      loadableGenerated: { modules: [237375] },
      ssr: !1,
    }),
    O = (e) => {
      let n,
        s = (0, i.c)(2),
        [l, r] = (0, o.useState)(!1);
      e.open && !l && r(!0);
      let a = (0, o.useSyncExternalStore)(P.$, P.c, $);
      return l && a
        ? (s[0] !== e
            ? ((n = (0, t.jsx)(M.R, { children: (0, t.jsx)(U, { ...e }) })),
              (s[0] = e),
              (s[1] = n))
            : (n = s[1]),
          n)
        : null;
    };
  function $() {
    return !1;
  }
  e.s(["f", 0, O], 740803);
  var R = e.i(167958);
  let F = "pump.limitOrdersDisclosureSeen",
    D = () => {
      try {
        return "1" === window.localStorage.getItem(F);
      } catch {
        return !1;
      }
    },
    B = () => {
      try {
        window.localStorage.setItem(F, "1");
      } catch {}
    };
  e.s(["w", 0, D, "S", 0, B], 493729);
  let K = (e) => {
    let n,
      s,
      l,
      r,
      a,
      o,
      d,
      c,
      m = (0, i.c)(21),
      { open: _, onOpenChange: h, onContinue: g } = e,
      { t: p } = (0, u.f)();
    m[0] !== h
      ? ((n = (e) => {
          (e || B(), h(e));
        }),
        (m[0] = h),
        (m[1] = n))
      : (n = m[1]);
    let b = n;
    return (
      m[2] !== p
        ? ((s = p("coin_details.limit_orders_disclosure_title")),
          (m[2] = p),
          (m[3] = s))
        : (s = m[3]),
      m[4] !== p
        ? ((l = p("coin_details.limit_orders_disclosure_body")),
          (m[4] = p),
          (m[5] = l))
        : (l = m[5]),
      m[6] !== l
        ? ((r = (0, t.jsx)(R.K, {
            children: (0, t.jsx)("p", {
              className: "text-[12px] leading-4 text-text-secondary",
              children: l,
            }),
          })),
          (m[6] = l),
          (m[7] = r))
        : (r = m[7]),
      m[8] !== g
        ? ((a = () => {
            (B(), g());
          }),
          (m[8] = g),
          (m[9] = a))
        : (a = m[9]),
      m[10] !== p
        ? ((o = p("common.continue")), (m[10] = p), (m[11] = o))
        : (o = m[11]),
      m[12] !== a || m[13] !== o
        ? ((d = (0, t.jsx)(R.c, {
            children: (0, t.jsx)(L.K, {
              size: R.$,
              isFullWidth: !0,
              onClick: a,
              children: o,
            }),
          })),
          (m[12] = a),
          (m[13] = o),
          (m[14] = d))
        : (d = m[14]),
      m[15] !== b || m[16] !== _ || m[17] !== s || m[18] !== r || m[19] !== d
        ? ((c = (0, t.jsxs)(R.N, {
            open: _,
            onOpenChange: b,
            density: "terminal",
            size: "sm",
            title: s,
            "data-testid": "disclosure-dialog",
            children: [r, d],
          })),
          (m[15] = b),
          (m[16] = _),
          (m[17] = s),
          (m[18] = r),
          (m[19] = d),
          (m[20] = c))
        : (c = m[20]),
      c
    );
  };
  e.s(["f", 0, K], 949672);
  var W = e.i(216374),
    H = e.i(51206),
    X = e.i(86913),
    Q = e.i(549791),
    G = e.i(98993),
    V = e.i(295855),
    Y = e.i(695705),
    J = e.i(339179),
    Z = e.i(159709),
    ee = e.i(605587),
    et = e.i(90832),
    ei = e.i(987425);
  let en = (e) => {
    let n,
      s,
      r,
      a,
      d,
      c,
      m,
      _,
      h,
      g,
      p,
      b,
      f,
      z,
      w,
      y,
      v,
      x,
      k = (0, i.c)(49),
      {
        coin: j,
        hasPosition: S,
        positionUsd: T,
        positionTokens: I,
        className: A,
      } = e,
      q = void 0 === I ? null : I,
      { t: P } = (0, u.f)(),
      { address: M } = (0, l.F)(),
      [U, $] = (0, o.useState)(!1),
      [R, F] = (0, o.useState)("create"),
      [B, V] = (0, o.useState)(!1);
    k[0] !== j.chain_id
      ? ((n = (0, ei.f)(j.chain_id) ?? void 0), (k[0] = j.chain_id), (k[1] = n))
      : (n = k[1]);
    let en = n;
    k[2] !== j.chain_id
      ? ((s = (0, ee.w)(j.chain_id)), (k[2] = j.chain_id), (k[3] = s))
      : (s = k[3]);
    let es = Number(s);
    k[4] !== M || k[5] !== en || k[6] !== j.mint
      ? ((r = { owner: M, chainId: en, token: j.mint }),
        (k[4] = M),
        (k[5] = en),
        (k[6] = j.mint),
        (k[7] = r))
      : (r = k[7]);
    let el = (0, G.f)(r),
      { takeProfitMcapUsd: er, stopLossMcapUsd: ea } = (0, Y.$)(el.data ?? []),
      eo = null != er || null != ea;
    k[8] !== j.chain_id || k[9] !== j.mint
      ? ((a = { mint: j.mint, chainId: j.chain_id }),
        (k[8] = j.chain_id),
        (k[9] = j.mint),
        (k[10] = a))
      : (a = k[10]);
    let eu = (0, X.Q)(a),
      ed = !1 === eu.tradable,
      ec = S && !eu.isLoading && !ed;
    k[11] !== M || k[12] !== en || k[13] !== j.mint || k[14] !== ec
      ? ((d = { owner: M, chainId: en, token: j.mint, enabled: ec }),
        (k[11] = M),
        (k[12] = en),
        (k[13] = j.mint),
        (k[14] = ec),
        (k[15] = d))
      : (d = k[15]);
    let em = (0, Q.f)(d);
    k[16] === Symbol.for("react.memo_cache_sentinel")
      ? ((c = (e) => {
          (F(e), $(!0));
        }),
        (k[16] = c))
      : (c = k[16]);
    let e_ = c;
    k[17] !== eo
      ? ((m = () => {
          eo ? e_("edit") : D() ? e_("create") : V(!0);
        }),
        (k[17] = eo),
        (k[18] = m))
      : (m = k[18]);
    let eh = m;
    (k[19] !== j.mint
      ? ((_ = () => {
          let e = (e) => {
            let t = e.detail;
            (0, ee.I)(t?.mint, j.mint) &&
              (e.stopImmediatePropagation(), F("edit"), $(!0));
          };
          return (
            window.addEventListener(N.X, e),
            () => {
              window.removeEventListener(N.X, e);
            }
          );
        }),
        (h = [j.mint]),
        (k[19] = j.mint),
        (k[20] = _),
        (k[21] = h))
      : ((_ = k[20]), (h = k[21])),
      (0, o.useEffect)(_, h),
      k[22] !== A
        ? ((g = (0, C.c)(W.s, "tabular-nums", A)), (k[22] = A), (k[23] = g))
        : (g = k[23]));
    let eg = g;
    (k[24] === Symbol.for("react.memo_cache_sentinel")
      ? ((p = () => {
          (V(!1), e_("create"));
        }),
        (k[24] = p))
      : (p = k[24]),
      k[25] !== B
        ? ((b = (0, t.jsx)(K, { open: B, onOpenChange: V, onContinue: p })),
          (k[25] = B),
          (k[26] = b))
        : (b = k[26]),
      k[27] !== j ||
      k[28] !== R ||
      k[29] !== U ||
      k[30] !== es ||
      k[31] !== q ||
      k[32] !== T
        ? ((f = (0, t.jsx)(O, {
            coin: j,
            chainId: es,
            positionTokens: q,
            positionUsd: T,
            initialMode: R,
            open: U,
            onOpenChange: $,
          })),
          (k[27] = j),
          (k[28] = R),
          (k[29] = U),
          (k[30] = es),
          (k[31] = q),
          (k[32] = T),
          (k[33] = f))
        : (f = k[33]),
      k[34] !== b || k[35] !== f
        ? ((z = (0, t.jsxs)(t.Fragment, { children: [b, f] })),
          (k[34] = b),
          (k[35] = f),
          (k[36] = z))
        : (z = k[36]));
    let ep = z;
    k[37] !== eg || k[38] !== eh || k[39] !== P
      ? ((w = (e) =>
          (0, t.jsx)(L.K, {
            variant: "secondary",
            size: 32,
            isFullWidth: !0,
            isDisabled: e,
            className: eg,
            iconStart: (0, t.jsx)(E.YC, { className: "size-3.5" }),
            onClick: eh,
            "data-testid": "limit-orders-add-button",
            children: P("coin_details.position_add_limit_orders"),
          })),
        (k[37] = eg),
        (k[38] = eh),
        (k[39] = P),
        (k[40] = w))
      : (w = k[40]);
    let eb = w;
    k[41] !== A || k[42] !== P
      ? ((y = (e) =>
          (0, t.jsxs)(W.l, {
            className: A,
            "data-testid": "limit-orders-entry-note",
            children: [
              P("web.coin.limit_orders_check_failed"),
              (0, t.jsx)(H._, {
                density: "terminal",
                size: 24,
                variant: "ghost",
                "aria-label": P("common.retry"),
                onClick: e,
                children: (0, t.jsx)(E.k8, { "aria-hidden": !0 }),
              }),
            ],
          })),
        (k[41] = A),
        (k[42] = P),
        (k[43] = y))
      : (y = k[43]);
    let ef = y;
    k[44] !== A
      ? ((v = (e) =>
          (0, t.jsx)(W.l, {
            className: A,
            "data-testid": "limit-orders-entry-note",
            children: e,
          })),
        (k[44] = A),
        (k[45] = v))
      : (v = k[45]);
    let ez = v,
      ew = (() => {
        if (eo) {
          let e = [
            null != er
              ? P("coin_details.position_tp_sl_tp_leg_no_percent", {
                  mcap: (0, et.v)(er),
                })
              : null,
            null != ea
              ? P("coin_details.position_tp_sl_sl_leg_no_percent", {
                  mcap: (0, et.v)(ea),
                })
              : null,
          ]
            .filter(Boolean)
            .join(" | ");
          return (0, t.jsx)(L.K, {
            variant: "secondary",
            size: 32,
            isFullWidth: !0,
            className: eg,
            iconStart: (0, t.jsx)(E._o, { className: "size-3.5" }),
            onClick: eh,
            "data-testid": "limit-orders-manage-button",
            children: e,
          });
        }
        if (!S || ed) return null;
        if (el.isError && void 0 === el.data)
          return ef(() => {
            (el.refetch(), em.refetch());
          });
        if (void 0 === el.data) return eb(!0);
        if (em.isError)
          return (0, J.f)({ error: em.error, reason: J.Y.unsupportedChain })
            ? null
            : (0, J.s)(em.error)
              ? ez(P("web.coin.limit_orders.evm.unavailable_for_coin"))
              : (0, J.o)(em.error)
                ? ez(P("web.coin.limit_orders.evm.sign_in_again"))
                : ef(() => void em.refetch());
        let e = em.data;
        return void 0 === e
          ? eb(!0)
          : e.eligible
            ? null === T
              ? eb(!0)
              : T < Z.m
                ? (0, t.jsx)(W.l, {
                    className: A,
                    "data-testid": "limit-orders-entry-note",
                    children: P(
                      "coin_details.position_tp_sl_min_position_required",
                      { min_amount: `$${Z.m}` },
                    ),
                  })
                : eb(!1)
            : ez(
                P(
                  (e.reasons ?? []).includes("quote_currency")
                    ? "web.coin.limit_orders.evm.quote_currency"
                    : "web.coin.limit_orders.evm.unavailable_for_coin",
                ),
              );
      })();
    return (
      k[46] !== ep || k[47] !== ew
        ? ((x = (0, t.jsxs)(t.Fragment, { children: [ew, ep] })),
          (k[46] = ep),
          (k[47] = ew),
          (k[48] = x))
        : (x = k[48]),
      x
    );
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          s = (0, i.c)(15),
          { t: l } = (0, u.f)();
        s[0] !== e.coin.chain_id || s[1] !== e.coin.mint
          ? ((n = { mint: e.coin.mint, chainId: e.coin.chain_id }),
            (s[0] = e.coin.chain_id),
            (s[1] = e.coin.mint),
            (s[2] = n))
          : (n = s[2]);
        let r = (0, V.H)(n);
        if ("evm" !== r.chain) return null;
        if ("enabled" === r.state) {
          let i;
          return (
            s[3] !== e
              ? ((i = (0, t.jsx)(en, { ...e })), (s[3] = e), (s[4] = i))
              : (i = s[4]),
            i
          );
        }
        if (!e.hasPosition) return null;
        if ("needs_privy" === r.state) {
          let i,
            n,
            r = e.className;
          return (
            s[5] !== l
              ? ((i = l("web.coin.limit_orders.evm.needs_privy")),
                (s[5] = l),
                (s[6] = i))
              : (i = s[6]),
            s[7] !== e.className || s[8] !== i
              ? ((n = (0, t.jsx)(W.l, {
                  className: r,
                  "data-testid": "limit-orders-entry-note",
                  children: i,
                })),
                (s[7] = e.className),
                (s[8] = i),
                (s[9] = n))
              : (n = s[9]),
            n
          );
        }
        if ("needs_user_id" === r.state) {
          let i,
            n,
            r = e.className;
          return (
            s[10] !== l
              ? ((i = l("web.coin.limit_orders.evm.sign_in_again")),
                (s[10] = l),
                (s[11] = i))
              : (i = s[11]),
            s[12] !== e.className || s[13] !== i
              ? ((n = (0, t.jsx)(W.l, {
                  className: r,
                  "data-testid": "limit-orders-entry-note",
                  children: i,
                })),
                (s[12] = e.className),
                (s[13] = i),
                (s[14] = n))
              : (n = s[14]),
            n
          );
        }
        return null;
      },
    ],
    778836,
  );
};
