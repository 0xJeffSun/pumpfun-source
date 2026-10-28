// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(292686),
    a = e.i(574472),
    s = e.i(352386),
    n = e.i(595673),
    r = e.i(745018),
    o = e.i(439587);
  e.i(12692);
  var c = e.i(398902),
    d = e.i(63289),
    u = e.i(263889),
    m = e.i(279378),
    p = e.i(434935),
    h = e.i(441315),
    f = e.i(167958),
    g = e.i(116458),
    x = e.i(355330),
    y = e.i(505266),
    b = e.i(911134),
    v = e.i(541710),
    _ = e.i(646908),
    j = e.i(662093),
    N = e.i(466931),
    w = e.i(140550),
    k = e.i(666617),
    C = e.i(188291),
    S = e.i(538794),
    U = e.i(282177),
    $ = e.i(193504),
    I = e.i(390421),
    A = e.i(98642),
    M = e.i(779106),
    P = e.i(90832),
    E = e.i(361284),
    F = e.i(365089),
    T = e.i(45459),
    z = e.i(890088),
    L = e.i(282578),
    B = e.i(338319),
    q = e.i(422642),
    O = e.i(446640);
  function D(e) {
    let l,
      a,
      s,
      n,
      r,
      o,
      d,
      u,
      m,
      p,
      h,
      f,
      g,
      x,
      y,
      b,
      v,
      _,
      j,
      N,
      w,
      k,
      C,
      U,
      $,
      I,
      A,
      M,
      E,
      D,
      R = (0, i.c)(82),
      {
        mint: V,
        coinName: W,
        coinSymbol: H,
        coinImageUri: Y,
        isCoinBanned: G,
        marketCapUsd: Z,
        callout: Q,
        holder: J,
        background: X,
        transparentCapture: ee,
        showChart: et,
        chart: ei,
        nowMs: el,
        ref: ea,
      } = e,
      es = void 0 !== ee && ee,
      { t: en } = (0, c.f)(),
      er = S.l.small_win;
    R[0] !== H
      ? ((l = H?.replace(/^\$/, "") ?? ""), (R[0] = H), (R[1] = l))
      : (l = R[1]);
    let eo = l;
    R[2] !== Q.createdAtMs || R[3] !== ei
      ? ((a =
          ei && !ei.isLoading
            ? (0, L.Y)(ei.times.map(K), Q.createdAtMs)
            : void 0),
        (R[2] = Q.createdAtMs),
        (R[3] = ei),
        (R[4] = a))
      : (a = R[4]);
    let ec = a;
    R[5] !== Q.createdAtMs
      ? ((s = Number.isFinite(Q.createdAtMs)),
        (R[5] = Q.createdAtMs),
        (R[6] = s))
      : (s = R[6]);
    let ed = s,
      eu = (void 0 === et || et) && null != ei,
      em = `callout-share-card${es ? "-foreground" : ""}`;
    R[7] === Symbol.for("react.memo_cache_sentinel")
      ? ((n = (0, O.A)(11)), (R[7] = n))
      : (n = R[7]);
    let ep = +!eu;
    return (
      R[8] !== ep
        ? ((r = { gap: n, flexGrow: ep }), (R[8] = ep), (R[9] = r))
        : (r = R[9]),
      R[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = { gap: (0, O.A)(20) }), (R[10] = o))
        : (o = R[10]),
      R[11] !== Y || R[12] !== eo || R[13] !== G || R[14] !== V
        ? ((d = (0, t.jsx)(O.T, {
            mint: V,
            imageUri: Y,
            isBanned: G,
            symbol: eo,
          })),
          (R[11] = Y),
          (R[12] = eo),
          (R[13] = G),
          (R[14] = V),
          (R[15] = d))
        : (d = R[15]),
      R[16] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, B.c)(O.d.headline, "truncate")), (R[16] = u))
        : (u = R[16]),
      R[17] !== W || R[18] !== eo || R[19] !== V
        ? ((m = W || eo || (0, F.d)(V, 4, 4)),
          (R[17] = W),
          (R[18] = eo),
          (R[19] = V),
          (R[20] = m))
        : (m = R[20]),
      R[21] !== m
        ? ((p = (0, t.jsx)("p", { className: u, children: m })),
          (R[21] = m),
          (R[22] = p))
        : (p = R[22]),
      R[23] !== eo
        ? ((h = eo
            ? (0, t.jsxs)("p", {
                className: (0, B.c)(
                  O.d.labelSm,
                  "truncate uppercase tracking-[0.04em] text-white/60",
                ),
                children: ["$", eo],
              })
            : null),
          (R[23] = eo),
          (R[24] = h))
        : (h = R[24]),
      R[25] !== p || R[26] !== h
        ? ((f = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col",
            children: [p, h],
          })),
          (R[25] = p),
          (R[26] = h),
          (R[27] = f))
        : (f = R[27]),
      R[28] !== Z
        ? ((g =
            null != Z && Z > 0
              ? (0, t.jsx)("span", {
                  className: (0, B.c)(
                    O.d.headline,
                    O.Y,
                    "shrink-0 tabular-nums",
                  ),
                  children: (0, P.N)(Z),
                })
              : null),
          (R[28] = Z),
          (R[29] = g))
        : (g = R[29]),
      R[30] !== d || R[31] !== f || R[32] !== g
        ? ((x = (0, t.jsxs)("div", {
            className: "flex items-center",
            style: o,
            children: [d, f, g],
          })),
          (R[30] = d),
          (R[31] = f),
          (R[32] = g),
          (R[33] = x))
        : (x = R[33]),
      R[34] !== ec || R[35] !== ei || R[36] !== eu
        ? ((y = eu
            ? (0, t.jsx)("div", {
                style: { height: O.z },
                children: (0, t.jsx)(q.f, {
                  prices: ei.isLoading ? [] : ei.prices,
                  markers: ei.isLoading ? [] : ei.markers,
                  width: O.U,
                  height: O.z,
                  palette: er,
                  scale: O.h,
                  calloutMarkerIndex: ec,
                }),
              })
            : (0, t.jsx)("div", { className: "flex-1" })),
          (R[34] = ec),
          (R[35] = ei),
          (R[36] = eu),
          (R[37] = y))
        : (y = R[37]),
      R[38] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = { gap: (0, O.A)(10) }), (R[38] = b))
        : (b = R[38]),
      R[39] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = { gap: (0, O.A)(10) }), (R[39] = v))
        : (v = R[39]),
      R[40] !== J
        ? ((_ = (0, t.jsx)(O.K, { holder: J, sizeClass: "size-[19px]" })),
          (R[40] = J),
          (R[41] = _))
        : (_ = R[41]),
      R[42] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, B.c)(O.d.labelMd, "min-w-0 truncate")), (R[42] = j))
        : (j = R[42]),
      R[43] !== J.displayName
        ? ((N = (0, t.jsx)("span", { className: j, children: J.displayName })),
          (R[43] = J.displayName),
          (R[44] = N))
        : (N = R[44]),
      R[45] !== J.isVerified
        ? ((w = J.isVerified
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "flex size-3 shrink-0 items-center justify-center rounded-full bg-[#86EFAC] text-[8px] font-bold text-[#0A0A0F]",
                children: "✓",
              })
            : null),
          (R[45] = J.isVerified),
          (R[46] = w))
        : (w = R[46]),
      R[47] !== J.xUsername
        ? ((k = J.xUsername
            ? (0, t.jsx)("span", {
                className:
                  "flex size-[18px] shrink-0 items-center justify-center rounded-md bg-white/10",
                children: (0, t.jsx)(T.f, { className: "size-2.5" }),
              })
            : null),
          (R[47] = J.xUsername),
          (R[48] = k))
        : (k = R[48]),
      R[49] !== N || R[50] !== w || R[51] !== k
        ? ((C = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 items-center gap-1.5",
            children: [N, w, k],
          })),
          (R[49] = N),
          (R[50] = w),
          (R[51] = k),
          (R[52] = C))
        : (C = R[52]),
      R[53] !== Q.createdAtMs || R[54] !== ed || R[55] !== el || R[56] !== en
        ? ((U = ed
            ? (0, t.jsx)("span", {
                className: (0, B.c)(
                  O.d.labelSm,
                  "shrink-0 font-normal text-white/60",
                ),
                children: (0, z.f)({ t: en, elapsedMs: el - Q.createdAtMs }),
              })
            : null),
          (R[53] = Q.createdAtMs),
          (R[54] = ed),
          (R[55] = el),
          (R[56] = en),
          (R[57] = U))
        : (U = R[57]),
      R[58] !== _ || R[59] !== C || R[60] !== U
        ? (($ = (0, t.jsxs)("div", {
            className: "flex items-center",
            style: v,
            children: [_, C, U],
          })),
          (R[58] = _),
          (R[59] = C),
          (R[60] = U),
          (R[61] = $))
        : ($ = R[61]),
      R[62] !== Q.thesis || R[63] !== eu || R[64] !== en || R[65] !== es
        ? ((I = Q.thesis
            ? (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [
                  (0, t.jsx)("p", {
                    "data-testid": `callout-share-card-thesis${es ? "-foreground" : ""}`,
                    className: (0, B.c)(
                      O.d.body,
                      "overflow-hidden text-white/90",
                    ),
                    style: {
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: eu ? 3 : 8,
                    },
                    children: Q.thesis,
                  }),
                  (0, t.jsx)("span", {
                    className: (0, B.c)(O.d.labelSm, "text-[#86EFAC]"),
                    children: en("share.pnl.view_more_in_app"),
                  }),
                ],
              })
            : null),
          (R[62] = Q.thesis),
          (R[63] = eu),
          (R[64] = en),
          (R[65] = es),
          (R[66] = I))
        : (I = R[66]),
      R[67] !== $ || R[68] !== I
        ? ((A = (0, t.jsxs)("div", {
            className: "flex flex-col",
            style: b,
            children: [$, I],
          })),
          (R[67] = $),
          (R[68] = I),
          (R[69] = A))
        : (A = R[69]),
      R[70] !== x || R[71] !== y || R[72] !== A || R[73] !== r
        ? ((M = (0, t.jsxs)("div", {
            className: "flex min-h-0 shrink flex-col overflow-hidden",
            style: r,
            children: [x, y, A],
          })),
          (R[70] = x),
          (R[71] = y),
          (R[72] = A),
          (R[73] = r),
          (R[74] = M))
        : (M = R[74]),
      R[75] === Symbol.for("react.memo_cache_sentinel")
        ? ((E = (0, t.jsx)("div", {
            className: "flex items-center justify-end",
            children: (0, t.jsx)(O.n, {}),
          })),
          (R[75] = E))
        : (E = R[75]),
      R[76] !== X || R[77] !== ea || R[78] !== M || R[79] !== em || R[80] !== es
        ? ((D = (0, t.jsxs)(O.V, {
            ref: ea,
            background: X,
            transparentCapture: es,
            testId: em,
            children: [M, E],
          })),
          (R[76] = X),
          (R[77] = ea),
          (R[78] = M),
          (R[79] = em),
          (R[80] = es),
          (R[81] = D))
        : (D = R[81]),
      D
    );
  }
  function K(e) {
    return { time: e };
  }
  var R = e.i(743477);
  function V(e) {
    let l,
      a,
      s,
      n,
      o,
      d,
      u,
      m,
      p,
      h,
      f = (0, i.c)(44),
      {
        selection: g,
        customBackgrounds: x,
        isMayhemCoin: y,
        holderLoop: b,
        isHolderVerified: v,
        onSelectTier: _,
        onSelectLoop: j,
        onSelectPreset: N,
        onSelectCustom: w,
        onUpload: k,
        onRemoveCustom: U,
      } = e,
      $ = void 0 !== v && v,
      { t: I } = (0, c.f)();
    if (
      f[0] !== b ||
      f[1] !== $ ||
      f[2] !== y ||
      f[3] !== j ||
      f[4] !== _ ||
      f[5] !== g ||
      f[6] !== I
    ) {
      let e = [...C.Y.filter((e) => e.id !== C.U || y), ...(b ? [b] : [])],
        i = W;
      ((l = "grid w-full grid-cols-7 gap-2"),
        (a = "position-pnl-share-backgrounds"),
        f[11] !== _ || f[12] !== g || f[13] !== I
          ? ((s = S.d.map((e) =>
              (0, t.jsxs)(
                R.a,
                {
                  testId: `bg-tier-${e}`,
                  isSelected: "tier" === g.type && g.tier === e,
                  label: I("share.profile.bg_preset_a11y"),
                  onClick: () => _(e),
                  children: [
                    (0, t.jsx)("div", {
                      className: "absolute inset-0",
                      style: i(C.z[e].gradient),
                    }),
                    (0, t.jsx)("img", {
                      src: C.z[e].posterUrl,
                      alt: "",
                      className: "relative size-full object-cover",
                    }),
                  ],
                },
                e,
              ),
            )),
            (f[11] = _),
            (f[12] = g),
            (f[13] = I),
            (f[14] = s))
          : (s = f[14]),
        (n = e.map((e) =>
          (0, t.jsxs)(
            R.a,
            {
              testId: `bg-loop-${e.id}`,
              isSelected: "loop" === g.type && g.loopId === e.id,
              label: I("share.profile.bg_preset_a11y"),
              onClick: () => j(e.id),
              children: [
                (0, t.jsx)("div", {
                  className: "absolute inset-0",
                  style: i(e.gradient),
                }),
                (0, t.jsx)("img", {
                  src: e.posterUrl,
                  alt: "",
                  className: "relative size-full object-cover",
                }),
                e.id === C.I && $
                  ? (0, t.jsx)("span", {
                      "aria-hidden": !0,
                      className:
                        "absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-[#86EFAC] text-[8px] font-bold text-[#0A0A0F] ring-1 ring-bg-primary",
                      children: "✓",
                    })
                  : null,
              ],
            },
            e.id,
          ),
        )),
        (f[0] = b),
        (f[1] = $),
        (f[2] = y),
        (f[3] = j),
        (f[4] = _),
        (f[5] = g),
        (f[6] = I),
        (f[7] = l),
        (f[8] = a),
        (f[9] = s),
        (f[10] = n));
    } else ((l = f[7]), (a = f[8]), (s = f[9]), (n = f[10]));
    if (
      (f[15] !== N || f[16] !== g || f[17] !== I
        ? ((o = C.t.map((e) =>
            (0, t.jsxs)(
              R.a,
              {
                testId: `bg-preset-${e.id}`,
                isSelected: "preset" === g.type && g.presetId === e.id,
                label: I("share.profile.bg_preset_a11y"),
                onClick: () => N(e.id),
                children: [
                  (0, t.jsx)("img", {
                    src: e.uri,
                    alt: "",
                    className: "size-full object-cover",
                  }),
                  "image" !== e.kind ? (0, t.jsx)(R.g, {}) : null,
                ],
              },
              e.id,
            ),
          )),
          (f[15] = N),
          (f[16] = g),
          (f[17] = I),
          (f[18] = o))
        : (o = f[18]),
      f[19] !== x || f[20] !== U || f[21] !== w || f[22] !== g || f[23] !== I)
    ) {
      let e;
      (f[25] !== U || f[26] !== w || f[27] !== g || f[28] !== I
        ? ((e = (e) =>
            (0, t.jsxs)(
              "div",
              {
                className: "relative",
                children: [
                  (0, t.jsxs)(R.a, {
                    testId: "bg-custom",
                    isSelected: "custom" === g.type && g.uri === e.uri,
                    label: I("share.profile.bg_custom_a11y"),
                    onClick: () => w(e.uri),
                    children: [
                      "video" === e.kind
                        ? (0, t.jsx)("video", {
                            src: e.uri,
                            muted: !0,
                            playsInline: !0,
                            preload: "metadata",
                            className: "size-full object-cover",
                          })
                        : (0, t.jsx)("img", {
                            src: e.uri,
                            alt: "",
                            className: "size-full object-cover",
                          }),
                      "image" !== e.kind ? (0, t.jsx)(R.g, {}) : null,
                    ],
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    "aria-label": I("share.profile.bg_remove"),
                    onClick: () => U(e.uri),
                    className:
                      "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-bg-primary text-text-secondary ring-1 ring-border-secondary hover:text-text-primary",
                    children: (0, t.jsx)(r.x6, { className: "size-2.5" }),
                  }),
                ],
              },
              e.uri,
            )),
          (f[25] = U),
          (f[26] = w),
          (f[27] = g),
          (f[28] = I),
          (f[29] = e))
        : (e = f[29]),
        (d = x.map(e)),
        (f[19] = x),
        (f[20] = U),
        (f[21] = w),
        (f[22] = g),
        (f[23] = I),
        (f[24] = d));
    } else d = f[24];
    return (
      f[30] !== I
        ? ((u = I("share.profile.bg_upload_a11y")), (f[30] = I), (f[31] = u))
        : (u = f[31]),
      f[32] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = (0, t.jsx)("div", {
            className:
              "flex size-full items-center justify-center bg-bg-tertiary text-text-tertiary",
            children: (0, t.jsx)(r.YC, { className: "size-4" }),
          })),
          (f[32] = m))
        : (m = f[32]),
      f[33] !== k || f[34] !== u
        ? ((p = (0, t.jsx)(R.a, {
            testId: "bg-upload",
            isSelected: !1,
            label: u,
            onClick: k,
            children: m,
          })),
          (f[33] = k),
          (f[34] = u),
          (f[35] = p))
        : (p = f[35]),
      f[36] !== l ||
      f[37] !== a ||
      f[38] !== s ||
      f[39] !== n ||
      f[40] !== o ||
      f[41] !== d ||
      f[42] !== p
        ? ((h = (0, t.jsxs)("div", {
            className: l,
            "data-testid": a,
            children: [s, n, o, d, p],
          })),
          (f[36] = l),
          (f[37] = a),
          (f[38] = s),
          (f[39] = n),
          (f[40] = o),
          (f[41] = d),
          (f[42] = p),
          (f[43] = h))
        : (h = f[43]),
      h
    );
  }
  function W(e) {
    return { background: `linear-gradient(135deg, ${e[0]}, ${e[1]}, ${e[2]})` };
  }
  var H = e.i(690877),
    Y = e.i(532470),
    G = e.i(529653),
    Z = e.i(975982),
    Q = e.i(213618),
    J = e.i(349942),
    X = e.i(795663),
    ee = e.i(503630),
    et = e.i(880783);
  let ei = async ({ mint: e, actor: t, program: i, createdTs: l }) => {
    let a = await fetch(`${(0, ee.V)()}/coins/${e}/trades/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAddresses: [t],
        program: (0, et.X)(i),
        createdTs: l ?? void 0,
      }),
    });
    if (!a.ok) throw Error(`Failed to fetch holder trades: ${a.status}`);
    return (await a.json())[t] ?? [];
  };
  function el(e) {
    return e.price;
  }
  function ea(e) {
    return new Date(e.timestamp).getTime();
  }
  function es() {
    return Date.now();
  }
  let en = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null,
    er = () =>
      "u" > typeof navigator &&
      "u" > typeof ClipboardItem &&
      "function" == typeof navigator.clipboard?.write;
  function eo(e) {
    let { data: a, shareType: F = l.qp.PNL, open: T, onOpenChange: z } = e,
      { t: B } = (0, c.f)(),
      q = (0, s.useRef)(null),
      K = (0, s.useRef)(null),
      R = (0, s.useRef)(null),
      [W, ee] = (0, s.useState)(null),
      [et] = (0, s.useState)(() => Date.now()),
      eo = (0, p.f)({ closeHost: () => z(!1) }),
      ec = eo.onCloseAutoFocus,
      ed = (0, s.useRef)(ec);
    ((0, s.useEffect)(() => {
      ed.current = ec;
    }, [ec]),
      (0, s.useEffect)(
        () => () => {
          let e = ed.current;
          window.setTimeout(() => e(new Event("close")), 0);
        },
        [],
      ));
    let eu = F === l.qp.PNL,
      em = (0, M.f)("own-mint-callout"),
      ep = (0, v.l)(),
      eh = a.chainId ?? a.coin?.chain_id,
      { callout: ef } = (0, g.W)({
        mint: a.mint,
        chain: (0, _.L)(eh) ? _.J : (0, _.B)(eh) && (0, v.M)(ep) ? _.d : void 0,
        accountKey: em,
        enabled: T && eu && null == a.callout,
      }),
      eg = a.callout ?? (eu && ef ? (0, $.Z)(ef) : null),
      ex = a.coin ? { ...a.coin, mint: a.mint } : null,
      ey = (0, j.h)({
        mint: a.mint,
        chainId: eh,
        fallbackMarketCap: a.coin?.usd_market_cap,
        coin: ex,
      }),
      eb = (0, j.O)({ mint: a.mint, chainId: eh, coin: ex }),
      ev =
        en(a.avgEntryMcapUsd) ??
        eb(
          (0, y.f)({
            avgEntryPriceUsd: a.avgEntryPriceUsd,
            coin: a.coin,
            mint: a.mint,
          }),
        ),
      e_ = en(ey),
      ej = en(a.investedUsd),
      eN = !!eg,
      ew = eg?.peakMultiple ?? null,
      ek = null !== ew,
      eC = (0, E.f)(a.pnlPct),
      [eS, eU] = (0, s.useState)(null),
      e$ = (0, S.f)({
        requestedMode:
          eS ??
          (eN ? (0, S.s)({ isClosed: a.isClosed, pnlPct: eC ?? 0 }) : "pnl"),
        hasCalloutCard: eN,
        hasMultipleCard: ek,
      }),
      eI = "multiple" === e$ && null !== ew ? ew : void 0,
      [eA, eM] = (0, s.useState)(!0),
      eP = a.coin?.mayhem_state != null,
      { athMarketCap: eE } = (0, u.f)({
        mint: a.mint,
        program: a.coin?.program ?? void 0,
        chain_id: a.coin?.chain_id ?? void 0,
        protocol: a.coin?.protocol ?? void 0,
        ath_market_cap: a.coin?.ath_market_cap ?? void 0,
      }),
      eF = (0, U.f)({
        isClosedPosition: a.isClosed,
        pnlPct: eC ?? 0,
        costBasisUsd: ej ?? 0,
        avgEntryMcapUsd: ev ?? 0,
        athMarketCapUsd: eE,
      }),
      eT = (function (e) {
        let t,
          l,
          a,
          s,
          n,
          r = (0, i.c)(12),
          { holderAddress: o, enabled: c } = e;
        r[0] !== o
          ? ((t = ["holderGeneratedMedia", o]),
            (l = async () => {
              let e = await fetch("/api/profiles/generated-media", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: [o] }),
              });
              if (!e.ok) throw Error(`generated media ${e.status}`);
              return (await e.json())[o] ?? null;
            }),
            (r[0] = o),
            (r[1] = t),
            (r[2] = l))
          : ((t = r[1]), (l = r[2]));
        let d = c && o.length > 0;
        r[3] !== t || r[4] !== l || r[5] !== d
          ? ((a = {
              queryKey: t,
              queryFn: l,
              enabled: d,
              staleTime: 18e5,
              retry: !1,
            }),
            (r[3] = t),
            (r[4] = l),
            (r[5] = d),
            (r[6] = a))
          : (a = r[6]);
        let { data: u } = (0, H.useQuery)(a),
          m = u?.pnlLoop;
        r[7] !== m ? ((s = (0, C.$)(m)), (r[7] = m), (r[8] = s)) : (s = r[8]);
        let p = u?.isVerified === !0 && !1 !== u.verifiedBadgeVisible;
        return (
          r[9] !== s || r[10] !== p
            ? ((n = { loop: s, isVerified: p }),
              (r[9] = s),
              (r[10] = p),
              (r[11] = n))
            : (n = r[11]),
          n
        );
      })({ holderAddress: a.holder.address, enabled: T }),
      ez = (function (e) {
        let t,
          l,
          a,
          n,
          r,
          o,
          c,
          d,
          u,
          m = (0, i.c)(19),
          { autoSelection: p, enabled: h } = e,
          [f, g] = (0, s.useState)(null);
        m[0] !== h
          ? ((t = { scope: "pnl", enabled: h }), (m[0] = h), (m[1] = t))
          : (t = m[1]);
        let x = (0, Y.f)(t),
          y = f ?? p;
        m[2] !== x
          ? ((l = (e) => {
              (x.removeUpload(e),
                g((t) => (t?.type === "custom" && t.uri === e ? null : t)));
            }),
            (m[2] = x),
            (m[3] = l))
          : (l = m[3]);
        let b = l;
        return (
          m[4] !== y ? ((a = (0, C.v)(y)), (m[4] = y), (m[5] = a)) : (a = m[5]),
          m[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (e) => g({ type: "tier", tier: e })),
              (r = (e) => g({ type: "loop", loopId: e })),
              (o = (e) => g({ type: "preset", presetId: e })),
              (c = (e) => g({ type: "custom", uri: e })),
              (m[6] = n),
              (m[7] = r),
              (m[8] = o),
              (m[9] = c))
            : ((n = m[6]), (r = m[7]), (o = m[8]), (c = m[9])),
          m[10] !== x
            ? ((d = (e) => {
                e &&
                  x.addUpload(e).then((e) => {
                    e && g({ type: "custom", uri: e.uri });
                  });
              }),
              (m[10] = x),
              (m[11] = d))
            : (d = m[11]),
          m[12] !== b ||
          m[13] !== y ||
          m[14] !== a ||
          m[15] !== d ||
          m[16] !== x.customBackgrounds ||
          m[17] !== x.isPicking
            ? ((u = {
                selection: y,
                selectionKey: a,
                customBackgrounds: x.customBackgrounds,
                isPicking: x.isPicking,
                selectTier: n,
                selectLoop: r,
                selectPreset: o,
                selectCustom: c,
                onFilePicked: d,
                removeCustom: b,
              }),
              (m[12] = b),
              (m[13] = y),
              (m[14] = a),
              (m[15] = d),
              (m[16] = x.customBackgrounds),
              (m[17] = x.isPicking),
              (m[18] = u))
            : (u = m[18]),
          u
        );
      })({
        autoSelection: eT.loop
          ? { type: "loop", loopId: C.I }
          : eP
            ? { type: "loop", loopId: C.U }
            : eF.qualifies
              ? { type: "loop", loopId: C.N }
              : {
                  type: "tier",
                  tier: (0, S.t)(eC ?? (a.pnlUsd >= 0 ? 0 : -1)),
                },
        enabled: T,
      }),
      eL = (0, C.a)(ez.selection, ez.customBackgrounds, eT.loop),
      eB = "loop" === ez.selection.type && ez.selection.loopId === C.N,
      eq = (function (e) {
        let t,
          l,
          a,
          n = (0, i.c)(13),
          {
            mint: r,
            holderAddress: o,
            coin: c,
            isClosed: d,
            chartWidth: u,
            markerWidth: m,
            enabled: p,
            extendToNow: h,
          } = e,
          f = void 0 !== h && h,
          [g] = (0, s.useState)(es),
          x = /^0x[0-9a-f]{40}$/i.test(r),
          y = p && (x || (0, Z.k)(r)),
          b = x && !/^0x[0-9a-f]{40}$/i.test(o),
          v = b && (0, Z.k)(o);
        n[0] !== o
          ? ((t = () => (0, X.a)({ solAddress: o })), (n[0] = o), (n[1] = t))
          : (t = n[1]);
        let _ = (0, H.useQuery)({
            queryKey: ["positionShareEvmActor", o],
            queryFn: t,
            enabled: y && v,
            staleTime: 6e4,
          }),
          j = b ? (v ? (_.data ?? null) : null) : o,
          N = !v || _.isSuccess || _.isError;
        n[2] !== j ||
        n[3] !== c?.created_timestamp ||
        n[4] !== c?.program ||
        n[5] !== r
          ? ((l = () =>
              ei({
                mint: r,
                actor: j,
                program: c?.program,
                createdTs: c?.created_timestamp,
              })),
            (n[2] = j),
            (n[3] = c?.created_timestamp),
            (n[4] = c?.program),
            (n[5] = r),
            (n[6] = l))
          : (l = n[6]);
        let w = (0, H.useQuery)({
            queryKey: ["positionShareTrades", r, j],
            queryFn: l,
            enabled: y && null !== j,
            staleTime: 6e4,
          }),
          k = w.data ?? [],
          C = N && (null === j || w.isSuccess || w.isError),
          S = k.length > 0 ? (0, L.S)(k, g) : 0,
          U = k.length > 0 ? Math.max(...k.map(ea)) : 0,
          $ = (0, L.x)({
            firstTradeTime: S,
            lastTradeTime: U,
            isClosed: d,
            now: g,
            extendToNow: f,
          }),
          I = (0, H.useQuery)({
            queryKey: [
              "positionShareCandles",
              r,
              $.resolution,
              $.limit,
              $.to ?? null,
              c?.chain_id ?? null,
            ],
            queryFn: () =>
              (0, J.f)({
                coinAddress: r,
                coinCreatedTimestamp: c?.created_timestamp ?? 0,
                chainId: c?.chain_id,
                interval: $.resolution,
                limit: $.limit,
                to: $.to,
              }),
            enabled: y && C,
            staleTime: 6e4,
            placeholderData: Q.y,
          }),
          A = y && (!C || I.isPending),
          M = k.filter((e) => new Date(e.timestamp).getTime() >= S),
          P = (0, L.W)({
            candles: I.data ?? [],
            window: $,
            trades: M,
            isClosed: d && !f,
          }),
          { points: E, markers: F } = (0, L.u)({
            series: P,
            trades: M,
            chartWidth: u,
            markerWidth: m,
          }),
          T = E.map(el),
          z = !y || (!A && E.length < 2);
        return (
          n[7] !== A || n[8] !== F || n[9] !== E || n[10] !== T || n[11] !== z
            ? ((a = {
                prices: T,
                points: E,
                markers: F,
                isLoading: A,
                isUnavailable: z,
              }),
              (n[7] = A),
              (n[8] = F),
              (n[9] = E),
              (n[10] = T),
              (n[11] = z),
              (n[12] = a))
            : (a = n[12]),
          a
        );
      })({
        mint: a.mint,
        holderAddress: a.holder.address,
        coin: a.coin,
        isClosed: a.isClosed,
        chartWidth: O.U,
        markerWidth: O.g,
        enabled: T,
        extendToNow: eB && eF.qualifies,
      }),
      eO = eq.isUnavailable && !eq.isLoading ? null : eq,
      eD = eq.markers.reduce(
        (e, t) => (t.hasSell ? Math.max(e, t.index) : e),
        -1,
      ),
      eK =
        eD >= 0
          ? (eq.points[Math.min(eD, eq.points.length - 1)]?.price ?? null)
          : null,
      eR = eb((0, y.f)({ avgEntryPriceUsd: eK, coin: a.coin, mint: a.mint })),
      eV =
        eF.qualifies && !eq.isLoading
          ? {
              entryLabel:
                null === ev
                  ? B("activity_feed.aped")
                  : B("web.share.pnl_aped_at", { market_cap: (0, P.N)(ev) }),
              exitLabel:
                null !== eR && eR > 0
                  ? B("web.share.pnl_exited_at", { market_cap: (0, P.N)(eR) })
                  : B("activity_feed.exited"),
              nowLabel:
                null !== e_
                  ? B("web.share.pnl_mcap_now", { market_cap: (0, P.N)(e_) })
                  : void 0,
            }
          : void 0,
      eW = "video" === eL.exportKind,
      eH = (0, G.f)(),
      eY = (0, x.f)({
        path: eg ? `/callouts/${a.mint}/${eg.calloutId}` : `/coin/${a.mint}`,
        enabled: T,
      }),
      eG = () =>
        eY ??
        (0, I.M)(
          `${window.location.origin}${eg ? `/callouts/${a.mint}/${eg.calloutId}` : `/coin/${a.mint}`}`,
        ),
      eZ = (e) =>
        (0, n.fG)({
          shareType: F,
          shareMethod: e,
          mint: a.mint,
          shareUrl: eG(),
        }),
      eQ = (0, S.u)(a.coinSymbol),
      eJ = (e, t) =>
        (0, N.l)({
          error: e,
          feature: "share",
          operation: "pnl-card-download",
          context: { mint: a.mint, mode: e$, exportKind: eL.exportKind, ...t },
        }),
      eX = async (e, t) => {
        let { blob: i, failedImages: l } = await (0, w.f)({
          root: e,
          width: O.f,
          height: O.u,
        });
        return (
          l.length > 0 &&
            eJ(Error("share card image could not be inlined"), {
              stage: `${t}-image`,
              failedImages: l,
            }),
          i
        );
      },
      e0 = async () => {
        let e = q.current;
        if (e && er()) {
          (ee("copy"), eZ(l.hF.COPY_IMAGE));
          try {
            (await navigator.clipboard.write([
              new ClipboardItem({ "image/png": eX(e, "card") }),
            ]),
              d.c.success(B("web.share.image_copied")));
          } catch (e) {
            ((0, N.l)({
              error: e,
              feature: "share",
              operation: "pnl-card-copy",
              context: { mint: a.mint, mode: e$ },
            }),
              d.c.error(B("web.share.image_copy_failed")));
          }
          ee(null);
        }
      },
      e1 = async () => {
        let e = q.current;
        if (!e) return;
        (ee("download"), eZ(l.hF.DOWNLOAD));
        let t = "capture";
        try {
          let i = await eX(e, "card");
          ((t = "save"), (0, k.f)({ blob: i, fileName: eQ }));
        } catch (e) {
          (eJ(e, { stage: t }),
            d.c.error(B("web.share.download_image_failed")));
        }
        ee(null);
      },
      e2 = async () => {
        let e = K.current;
        if (!e || !eL.compose) return;
        (ee("download"), eZ(l.hF.DOWNLOAD));
        let t = eQ.replace(/\.png$/, ".mp4"),
          i = null;
        try {
          let l = await eX(e, "foreground").catch(
            (e) => (eJ(e, { stage: "capture" }), null),
          );
          l && (i = `${e$}:${eA}:${ez.selectionKey}:${l.size}`);
          let a =
            l && i
              ? await eH.render({
                  foregroundPng: l,
                  compose: eL.compose,
                  width: 2 * O.f,
                  height: 2 * O.u,
                  cacheKey: i,
                })
              : { status: "error", reason: "capture" };
          if ("busy" === a.status) return void ee(null);
          if ("error" === a.status) {
            (d.c.error(
              B(
                "unauthorized" === a.reason
                  ? "web.wallets.manage.sign_in_required"
                  : "share.profile.gif_render_error",
              ),
            ),
              ee(null));
            return;
          }
          let s = await (0, A.f)(a.videoUrl, t);
          ((0, k.f)({ blob: s, fileName: t }),
            d.c.success(B("share.pnl.video_saved")));
        } catch (e) {
          (i && eH.forget(i),
            eJ(e, { stage: "video-download" }),
            d.c.error(B("share.pnl.verified_bg_save_error")));
        }
        ee(null);
      },
      e3 = async () => {
        let e = eG();
        eZ(l.hF.COPY_LINK);
        try {
          (await navigator.clipboard.writeText(e),
            d.c.success(
              B(
                eg
                  ? "share.pnl.callout_link_copied"
                  : "callouts.reply.link_copied",
              ),
            ));
        } catch {
          d.c.error(B("web.coin.copy_link_failed"));
        }
      },
      e4 = eL.cardDesign,
      e6 = eF.qualifies ? eF.couldHaveMadeUsd : null,
      e5 = ({ transparentCapture: e, ref: i }) =>
        "callout" === e$ && eg
          ? (0, t.jsx)(D, {
              ref: i,
              mint: a.mint,
              coinName: a.coinName,
              coinSymbol: a.coinSymbol,
              coinImageUri: a.coinImageUri,
              isCoinBanned: a.coin?.is_banned,
              marketCapUsd: e_,
              callout: eg,
              holder: a.holder,
              background: eL.aura,
              transparentCapture: e,
              showChart: eA,
              chart: eO ? { ...eO, times: eq.points.map((e) => e.time) } : null,
              nowMs: et,
            })
          : (0, t.jsx)(O.L, {
              ref: i,
              mint: a.mint,
              coinName: a.coinName,
              coinSymbol: a.coinSymbol,
              coinImageUri: a.coinImageUri,
              isCoinBanned: a.coin?.is_banned,
              pnlUsd: a.pnlUsd,
              pnlPct: eC,
              investedUsd: ej,
              avgEntryMcapUsd: ev,
              marketCapUsd: e_,
              isClosed: a.isClosed,
              holder: a.holder,
              background: eL.aura,
              transparentCapture: e,
              showChart: eA,
              chart: eO,
              chartAnnotations: eV,
              cardDesign: e4,
              fumbleCouldHaveMadeUsd: e6,
              heroMultiple: eI,
              calloutMarketCapUsd: eg?.marketCapUsd ?? null,
            }),
      e7 = null !== W || eH.isRendering,
      e8 = eA ? B("web.share.coin.hide_chart") : B("web.share.coin.show_chart");
    return (0, t.jsx)(f.N, {
      open: T,
      onOpenChange: z,
      "aria-label": B("common.share"),
      size: "sm",
      className: "!max-w-[372px]",
      onOpenChangeComplete: (e) => {
        e || window.setTimeout(() => ec(new Event("close")), 0);
      },
      "data-testid": "position-pnl-share-dialog",
      children: (0, t.jsxs)(f.K, {
        className: "flex flex-col gap-3 p-4",
        children: [
          (0, t.jsxs)("div", {
            className: "flex items-center justify-between gap-2",
            children: [
              eN || ek
                ? (0, t.jsxs)("div", {
                    role: "group",
                    className: "flex gap-1",
                    children: [
                      eN
                        ? (0, t.jsx)(h.p, {
                            density: "comfortable",
                            pressed: "callout" === e$,
                            "aria-label": B("share.pnl.toggle_callout_a11y"),
                            onClick: () => eU("callout"),
                            children: B("share.pnl.mode_callout_label"),
                          })
                        : null,
                      (0, t.jsx)(h.p, {
                        density: "comfortable",
                        pressed: "pnl" === e$,
                        "aria-label": B("share.pnl.toggle_pnl_a11y"),
                        onClick: () => eU("pnl"),
                        children: B("share.pnl.mode_pnl_label"),
                      }),
                      ek
                        ? (0, t.jsx)(h.p, {
                            density: "comfortable",
                            pressed: "multiple" === e$,
                            "aria-label": B("share.pnl.toggle_multiple_a11y"),
                            onClick: () => eU("multiple"),
                            children: B("share.pnl.mode_multiple_label"),
                          })
                        : null,
                    ],
                  })
                : (0, t.jsx)("span", {}),
              (0, t.jsx)(h.p, {
                density: "comfortable",
                variant: "outlined",
                "aria-pressed": eA,
                onClick: () => eM((e) => !e),
                leading: eA ? (0, t.jsx)(r.a6, {}) : (0, t.jsx)(r.sI, {}),
                children: e8,
              }),
            ],
          }),
          (0, t.jsxs)("div", {
            className: "relative flex justify-center",
            children: [
              e5({ transparentCapture: !1, ref: q }),
              eH.isRendering
                ? (0, t.jsxs)("div", {
                    className:
                      "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[18px] bg-bg-primary/90 px-8 text-center",
                    children: [
                      (0, t.jsx)("span", {
                        className:
                          "size-6 animate-spin rounded-full border-2 border-primary-green border-t-transparent",
                      }),
                      (0, t.jsx)("span", {
                        className: "text-xs font-medium text-text-primary",
                        children: B("share.profile.gif_generating"),
                      }),
                    ],
                  })
                : null,
            ],
          }),
          (0, t.jsx)("div", {
            className: "mx-auto",
            style: { width: O.f },
            children: (0, t.jsx)(V, {
              selection: ez.selection,
              customBackgrounds: ez.customBackgrounds,
              isMayhemCoin: eP,
              holderLoop: eT.loop,
              isHolderVerified: eT.isVerified,
              onSelectTier: ez.selectTier,
              onSelectLoop: ez.selectLoop,
              onSelectPreset: ez.selectPreset,
              onSelectCustom: ez.selectCustom,
              onUpload: () => R.current?.click(),
              onRemoveCustom: ez.removeCustom,
            }),
          }),
          (0, t.jsx)("input", {
            ref: R,
            type: "file",
            accept: "image/*,video/*,.gif",
            className: "hidden",
            "data-testid": "position-pnl-share-upload",
            onChange: (e) => {
              (ez.onFilePicked(e.target.files?.[0]), (e.target.value = ""));
            },
          }),
          eW
            ? (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "pointer-events-none absolute -left-[9999px] top-0",
                children: e5({ transparentCapture: !0, ref: K }),
              })
            : null,
          (0, t.jsx)(m.f, {
            onDismissHost: () => z(!1),
            onSeeMore: eo.handOff,
            url: (0, b.F)({
              mint: a.mint,
              calloutId: eg?.calloutId,
              holderAddress: a.holder.address,
            }),
          }),
          (0, t.jsxs)("div", {
            className: "flex gap-2",
            children: [
              eW
                ? null
                : er()
                  ? (0, t.jsx)("div", {
                      className: "min-w-0 flex-1",
                      children: (0, t.jsx)(o.K, {
                        variant: "secondary",
                        size: f.Z,
                        isFullWidth: !0,
                        onClick: e0,
                        isDisabled: e7,
                        "aria-label": B("common.copy"),
                        iconStart: (0, t.jsx)(r.CC, {}),
                        children: B("common.copy"),
                      }),
                    })
                  : null,
              (0, t.jsx)("div", {
                className: "min-w-0 flex-1",
                children: (0, t.jsx)(o.K, {
                  variant: "secondary",
                  size: f.Z,
                  isFullWidth: !0,
                  onClick: eW ? e2 : e1,
                  isDisabled: e7,
                  "aria-label": B("common.save"),
                  iconStart: (0, t.jsx)(r.qY, {}),
                  children: B("common.save"),
                }),
              }),
              (0, t.jsx)("div", {
                className: "min-w-0 flex-1",
                children: (0, t.jsx)(o.K, {
                  variant: "secondary",
                  size: f.Z,
                  isFullWidth: !0,
                  onClick: e3,
                  "aria-label": B("common.copy_link"),
                  iconStart: (0, t.jsx)(r.HU, {}),
                  children:
                    eW || !er() ? B("common.copy_link") : B("common.link"),
                }),
              }),
            ],
          }),
        ],
      }),
    });
  }
  function ec(e, t) {
    let s,
      n,
      r,
      o = (0, i.c)(9),
      { address: c } = (0, a.F)();
    o[0] !== e || o[1] !== c
      ? ((s =
          void 0 !== c && void 0 !== e && c.toLowerCase() === e.toLowerCase()),
        (o[0] = e),
        (o[1] = c),
        (o[2] = s))
      : (s = o[2]);
    let d = s,
      u = d ? l.qp.PNL : l.qp.PNL_OTHER_USER;
    return (
      o[3] !== d || o[4] !== t
        ? ((n = t ? { sourceElement: d ? t.mine : t.other } : void 0),
          (o[3] = d),
          (o[4] = t),
          (o[5] = n))
        : (n = o[5]),
      o[6] !== u || o[7] !== n
        ? ((r = { shareType: u, openSource: n }),
          (o[6] = u),
          (o[7] = n),
          (o[8] = r))
        : (r = o[8]),
      r
    );
  }
  (e.s(["f", 0, eo], 616299),
    e.s(
      [
        "I",
        0,
        function (e) {
          let l,
            a,
            r,
            o = (0, i.c)(12),
            [c, d] = (0, s.useState)(!1),
            { shareType: u, openSource: m } = ec(
              e?.data.holder.address,
              e?.sourceElement,
            );
          o[0] !== m || o[1] !== e || o[2] !== u
            ? ((l = () => {
                e &&
                  ((0, n.EN)({ shareType: u, mint: e.data.mint, source: m }),
                  d(!0));
              }),
              (o[0] = m),
              (o[1] = e),
              (o[2] = u),
              (o[3] = l))
            : (l = o[3]);
          let p = l;
          o[4] !== c || o[5] !== e || o[6] !== u
            ? ((a =
                c && e
                  ? (0, t.jsx)(eo, {
                      data: e.data,
                      shareType: u,
                      open: c,
                      onOpenChange: d,
                    })
                  : null),
              (o[4] = c),
              (o[5] = e),
              (o[6] = u),
              (o[7] = a))
            : (a = o[7]);
          let h = a;
          return (
            o[8] !== h || o[9] !== p || o[10] !== u
              ? ((r = { open: p, shareType: u, dialog: h }),
                (o[8] = h),
                (o[9] = p),
                (o[10] = u),
                (o[11] = r))
              : (r = o[11]),
            r
          );
        },
        "p",
        0,
        ec,
      ],
      711454,
    ));
};
