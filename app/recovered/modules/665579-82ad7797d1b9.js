// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    n = e.i(439587),
    a = e.i(574472),
    i = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    u = e.i(763236),
    o = e.i(642282),
    c = e.i(174251),
    d = e.i(34011),
    f = e.i(924631),
    p = e.i(529841),
    m = e.i(167958),
    h = e.i(724423),
    b = e.i(51206),
    g = e.i(63289),
    y = e.i(675874),
    v = e.i(149757),
    S = e.i(236315),
    x = e.i(640068),
    w = e.i(819757),
    N = e.i(466931),
    E = e.i(464154),
    M = e.i(595673),
    I = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let O,
          T,
          _,
          j,
          R,
          k,
          A,
          C,
          D,
          q,
          U,
          z,
          L,
          P,
          F,
          B,
          $,
          H,
          V,
          G,
          W,
          K,
          X,
          J,
          Q,
          Y,
          Z,
          ee,
          et,
          er,
          el,
          en,
          ea,
          ei,
          es,
          eu,
          eo,
          ec,
          ed,
          ef,
          ep,
          em,
          eh,
          eb,
          eg,
          ey,
          ev,
          eS = (0, r.c)(145),
          {
            isOpen: ex,
            onOpenChange: ew,
            coin: eN,
            calloutId: eE,
            note: eM,
            createdAt: eI,
            entryPoint: eO,
          } = e,
          { t: eT } = (0, s.f)(),
          { address: e_ } = (0, a.F)();
        (eS[0] !== eE ||
        eS[1] !== eN.chain_id ||
        eS[2] !== eN.mint ||
        eS[3] !== eO ||
        eS[4] !== ex
          ? ((O = () => {
              ex &&
                (0, M.H0)({
                  mint: eN.mint,
                  calloutId: eE,
                  entryPoint: eO,
                  chain: (0, M.i9)(eN.mint, eN.chain_id),
                });
            }),
            (T = [ex, eN.mint, eN.chain_id, eE, eO]),
            (eS[0] = eE),
            (eS[1] = eN.chain_id),
            (eS[2] = eN.mint),
            (eS[3] = eO),
            (eS[4] = ex),
            (eS[5] = O),
            (eS[6] = T))
          : ((O = eS[5]), (T = eS[6])),
          (0, i.useEffect)(O, T),
          eS[7] !== eE || eS[8] !== eN.mint || eS[9] !== ex
            ? ((_ = { mint: eN.mint, calloutId: eE, enabled: ex }),
              (eS[7] = eE),
              (eS[8] = eN.mint),
              (eS[9] = ex),
              (eS[10] = _))
            : (_ = eS[10]));
        let { hasCommunityThread: ej, isLoading: eR } = (0, E.u)(_),
          ek = ex && !eR && !ej;
        (eS[11] !== ew
          ? ((j = () => ew(!1)), (eS[11] = ew), (eS[12] = j))
          : (j = eS[12]),
          eS[13] !== e_ || eS[14] !== eE || eS[15] !== eN || eS[16] !== j
            ? ((R = { coin: eN, calloutId: eE, address: e_, onUpdated: j }),
              (eS[13] = e_),
              (eS[14] = eE),
              (eS[15] = eN),
              (eS[16] = j),
              (eS[17] = R))
            : (R = eS[17]));
        let {
            content: eA,
            contentMaxLength: eC,
            contentLength: eD,
            attachment: eq,
            attachmentError: eU,
            attachImage: ez,
            attachFromDataTransfer: eL,
            removeImage: eP,
            canSubmit: eF,
            isSubmitting: eB,
            submit: e$,
            mentions: eH,
          } = (function (e) {
            let t,
              l,
              n,
              a,
              u,
              o = (0, r.c)(30),
              { t: c } = (0, s.f)(),
              { coin: d, calloutId: f, address: p, onUpdated: m } = e,
              [h, b] = (0, i.useState)(""),
              E = (0, i.useRef)(!1);
            o[0] !== h
              ? ((t = { content: h, setContent: b }), (o[0] = h), (o[1] = t))
              : (t = o[1]);
            let M = (0, v.f)(t),
              {
                attachment: I,
                attachmentError: O,
                attachMedia: T,
                attachFromDataTransfer: _,
                removeMedia: j,
              } = (0, y.f)(),
              R = (0, S.f)();
            o[2] !== h ? ((l = h.trim()), (o[2] = h), (o[3] = l)) : (l = o[3]);
            let k = l;
            o[4] !== h || o[5] !== M
              ? ((n = M.serialize(h)), (o[4] = h), (o[5] = M), (o[6] = n))
              : (n = o[6]);
            let A = n.length,
              C = A <= 2e3,
              D = R.isPending,
              q = !!p && !!d && !!f && !D && k.length > 0 && C;
            o[7] !== p ||
            o[8] !== I ||
            o[9] !== f ||
            o[10] !== d ||
            o[11] !== k ||
            o[12] !== R ||
            o[13] !== M ||
            o[14] !== m ||
            o[15] !== j ||
            o[16] !== c
              ? ((a = async () => {
                  if (!d || !f || !p || E.current) return !1;
                  E.current = !0;
                  let e = {
                      mint: d.mint,
                      calloutId: f,
                      content: M.serialize(k),
                      image: I?.file,
                      viewerAddress: p,
                      isAuthorReply: !0,
                    },
                    t = null;
                  try {
                    await R.mutateAsync(e);
                  } catch (e) {
                    t = e;
                  }
                  return t
                    ? (g.c.error(c((0, x.s)(t, "update"))),
                      (0, x.X)(t) ||
                        (0, N.l)({
                          error: t,
                          feature: "callout",
                          operation: "update",
                          context: {
                            mint: d.mint,
                            calloutId: f,
                            hasImage: null !== I,
                            ...(0, w.M)(t),
                          },
                        }),
                      (E.current = !1),
                      !1)
                    : (g.c.success(c("web.callouts.updated")),
                      b(""),
                      j(),
                      m?.(),
                      (E.current = !1),
                      !0);
                }),
                (o[7] = p),
                (o[8] = I),
                (o[9] = f),
                (o[10] = d),
                (o[11] = k),
                (o[12] = R),
                (o[13] = M),
                (o[14] = m),
                (o[15] = j),
                (o[16] = c),
                (o[17] = a))
              : (a = o[17]);
            let U = a;
            return (
              o[18] !== _ ||
              o[19] !== T ||
              o[20] !== I ||
              o[21] !== O ||
              o[22] !== q ||
              o[23] !== h ||
              o[24] !== A ||
              o[25] !== D ||
              o[26] !== M ||
              o[27] !== j ||
              o[28] !== U
                ? ((u = {
                    content: h,
                    setContent: b,
                    contentMaxLength: 2e3,
                    contentLength: A,
                    attachment: I,
                    attachmentError: O,
                    attachImage: T,
                    attachFromDataTransfer: _,
                    removeImage: j,
                    canSubmit: q,
                    isSubmitting: D,
                    submit: U,
                    mentions: M,
                  }),
                  (o[18] = _),
                  (o[19] = T),
                  (o[20] = I),
                  (o[21] = O),
                  (o[22] = q),
                  (o[23] = h),
                  (o[24] = A),
                  (o[25] = D),
                  (o[26] = M),
                  (o[27] = j),
                  (o[28] = U),
                  (o[29] = u))
                : (u = o[29]),
              u
            );
          })(R),
          eV = null !== eq;
        eS[18] !== ez
          ? ((k = (e) => {
              ez(e) && (0, M.hH)({ surface: "update" });
            }),
            (eS[18] = ez),
            (eS[19] = k))
          : (k = eS[19]);
        let eG = k;
        eS[20] !== eL
          ? ((A = (e) => {
              let t = eL(e);
              return (t && (0, M.hH)({ surface: "update" }), t);
            }),
            (eS[20] = eL),
            (eS[21] = A))
          : (A = eS[21]);
        let eW = A,
          eK = eB || eV;
        eS[22] !== eW || eS[23] !== eK
          ? ((C = { onDrop: eW, disabled: eK }),
            (eS[22] = eW),
            (eS[23] = eK),
            (eS[24] = C))
          : (C = eS[24]);
        let { isDragging: eX, dropProps: eJ } = (0, u.O)(C);
        eS[25] !== eT || eS[26] !== ek
          ? ((D = ek ? eT("web.callouts.update_thread_syncing") : null),
            (eS[25] = eT),
            (eS[26] = ek),
            (eS[27] = D))
          : (D = eS[27]);
        let eQ = D;
        eS[28] !== eF || eS[29] !== e$ || eS[30] !== ek
          ? ((q = () => {
              !ek && eF && e$();
            }),
            (eS[28] = eF),
            (eS[29] = e$),
            (eS[30] = ek),
            (eS[31] = q))
          : (q = eS[31]);
        let eY = q;
        eS[32] !== eM
          ? ((U = eM?.trim()), (eS[32] = eM), (eS[33] = U))
          : (U = eS[33]);
        let eZ = U,
          e0 = eD > eC;
        (eS[34] !== eT
          ? ((z = eT("callouts.update.title")), (eS[34] = eT), (eS[35] = z))
          : (z = eS[35]),
          eS[36] !== eT
            ? ((L = eT("common.close")), (eS[36] = eT), (eS[37] = L))
            : (L = eS[37]),
          eS[38] !== ew
            ? ((P = () => ew(!1)), (eS[38] = ew), (eS[39] = P))
            : (P = eS[39]),
          eS[40] === Symbol.for("react.memo_cache_sentinel")
            ? ((F = (0, t.jsx)(l.x6, {})), (eS[40] = F))
            : (F = eS[40]),
          eS[41] !== L || eS[42] !== P
            ? ((B = (0, t.jsx)(b._, {
                density: "comfortable",
                "aria-label": L,
                className: "absolute top-3 right-3 z-10",
                "data-slot": "dialog-close",
                onClick: P,
                children: F,
              })),
              (eS[41] = L),
              (eS[42] = P),
              (eS[43] = B))
            : (B = eS[43]),
          eS[44] !== eN
            ? (($ = (0, t.jsx)(d.CoinAvatar, {
                coin: eN,
                size: 40,
                seal: "corner",
              })),
              (eS[44] = eN),
              (eS[45] = $))
            : ($ = eS[45]),
          eS[46] !== eN.mint || eS[47] !== eN.symbol
            ? ((H = null != eN.symbol ? `$${eN.symbol}` : (0, f.e)(eN.mint)),
              (eS[46] = eN.mint),
              (eS[47] = eN.symbol),
              (eS[48] = H))
            : (H = eS[48]),
          eS[49] !== H
            ? ((V = (0, t.jsx)("p", {
                className:
                  "truncate text-sm font-medium leading-5 text-text-primary",
                children: H,
              })),
              (eS[49] = H),
              (eS[50] = V))
            : (V = eS[50]),
          eS[51] !== eN.name
            ? ((G =
                null != eN.name
                  ? (0, t.jsx)("p", {
                      className:
                        "truncate text-xs leading-4 text-text-tertiary",
                      children: eN.name,
                    })
                  : null),
              (eS[51] = eN.name),
              (eS[52] = G))
            : (G = eS[52]),
          eS[53] !== V || eS[54] !== G
            ? ((W = (0, t.jsxs)("div", {
                className: "flex items-baseline gap-1.5",
                children: [V, G],
              })),
              (eS[53] = V),
              (eS[54] = G),
              (eS[55] = W))
            : (W = eS[55]),
          eS[56] !== eI || eS[57] !== eT
            ? ((K =
                null != eI
                  ? (0, t.jsxs)("p", {
                      className: "text-xs leading-4 text-text-tertiary",
                      children: [
                        eT("share.coin.called"),
                        " ",
                        (0, t.jsx)(p.f, {
                          timestamp: eI,
                          density: "comfortable",
                        }),
                      ],
                    })
                  : null),
              (eS[56] = eI),
              (eS[57] = eT),
              (eS[58] = K))
            : (K = eS[58]),
          eS[59] !== W || eS[60] !== K
            ? ((X = (0, t.jsxs)("div", {
                className: "min-w-0 flex-1",
                children: [W, K],
              })),
              (eS[59] = W),
              (eS[60] = K),
              (eS[61] = X))
            : (X = eS[61]),
          eS[62] !== $ || eS[63] !== X
            ? ((J = (0, t.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [$, X],
              })),
              (eS[62] = $),
              (eS[63] = X),
              (eS[64] = J))
            : (J = eS[64]),
          eS[65] !== eZ
            ? ((Q = eZ
                ? (0, t.jsx)("blockquote", {
                    "data-testid": "update-callout-original",
                    className:
                      "w-full rounded-md border border-border-tertiary p-3",
                    children: (0, t.jsx)("p", {
                      className:
                        "w-full whitespace-pre-wrap break-words text-xs leading-4 text-text-primary",
                      children: (0, t.jsx)(c.f, {
                        content: eZ,
                        density: "comfortable",
                      }),
                    }),
                  })
                : null),
              (eS[65] = eZ),
              (eS[66] = Q))
            : (Q = eS[66]));
        let e1 = e0 && h.m.invalid;
        (eS[67] !== e1
          ? ((Y = (0, I.c)("tabular-nums", e1)), (eS[67] = e1), (eS[68] = Y))
          : (Y = eS[68]),
          eS[69] !== eD || eS[70] !== eC || eS[71] !== Y
            ? ((Z = (0, t.jsx)("div", {
                className:
                  "flex items-center justify-end text-xs leading-4 text-text-quaternary",
                children: (0, t.jsxs)("span", {
                  className: Y,
                  "data-testid": "update-callout-counter",
                  children: [eD, "/", eC],
                }),
              })),
              (eS[69] = eD),
              (eS[70] = eC),
              (eS[71] = Y),
              (eS[72] = Z))
            : (Z = eS[72]));
        let e2 = eX ? "" : void 0,
          e3 = eX
            ? "border-text-accent focus-within:border-text-accent"
            : h.D.valid;
        eS[73] !== e3
          ? ((ee = (0, I.c)(h.F, e3, "h-auto items-stretch p-0")),
            (eS[73] = e3),
            (eS[74] = ee))
          : (ee = eS[74]);
        let e4 = eH.handleChange,
          e5 = eH.handleSelect;
        (eS[75] !== eW || eS[76] !== eV || eS[77] !== eB
          ? ((et = (e) => {
              eV || eB || (eW(e.clipboardData) && e.preventDefault());
            }),
            (eS[75] = eW),
            (eS[76] = eV),
            (eS[77] = eB),
            (eS[78] = et))
          : (et = eS[78]),
          eS[79] !== eT
            ? ((er = eT("web.callouts.update_placeholder")),
              (eS[79] = eT),
              (eS[80] = er))
            : (er = eS[80]),
          eS[81] !== eT
            ? ((el = eT("web.callouts.update_placeholder")),
              (eS[81] = eT),
              (eS[82] = el))
            : (el = eS[82]));
        let e6 = 2 * eC;
        (eS[83] !== eA ||
        eS[84] !== eH.handleChange ||
        eS[85] !== eH.handleSelect ||
        eS[86] !== et ||
        eS[87] !== er ||
        eS[88] !== el ||
        eS[89] !== e6
          ? ((en = (0, t.jsx)("textarea", {
              id: "callout-update",
              value: eA,
              onChange: e4,
              onSelect: e5,
              onPaste: et,
              placeholder: er,
              "aria-label": el,
              rows: 4,
              maxLength: e6,
              className:
                "block min-h-24 w-full resize-none bg-transparent p-3 text-sm leading-5 text-text-primary outline-none placeholder:text-text-quaternary",
              autoFocus: !0,
            })),
            (eS[83] = eA),
            (eS[84] = eH.handleChange),
            (eS[85] = eH.handleSelect),
            (eS[86] = et),
            (eS[87] = er),
            (eS[88] = el),
            (eS[89] = e6),
            (eS[90] = en))
          : (en = eS[90]),
          eS[91] !== e2 || eS[92] !== ee || eS[93] !== en
            ? ((ea = (0, t.jsx)("div", {
                "data-dragging": e2,
                className: ee,
                children: en,
              })),
              (eS[91] = e2),
              (eS[92] = ee),
              (eS[93] = en),
              (eS[94] = ea))
            : (ea = eS[94]),
          eS[95] !== eH.selectSuggestion || eS[96] !== eH.suggestions
            ? ((ei = (0, t.jsx)(o.f, {
                suggestions: eH.suggestions,
                onSelect: eH.selectSuggestion,
                testId: "update-callout-mentions",
              })),
              (eS[95] = eH.selectSuggestion),
              (eS[96] = eH.suggestions),
              (eS[97] = ei))
            : (ei = eS[97]),
          eS[98] !== eq || eS[99] !== eU || eS[100] !== eP
            ? ((es = (0, t.jsx)(u.e, {
                attachment: eq,
                error: eU,
                onRemove: eP,
                testId: "update-callout-attachment",
              })),
              (eS[98] = eq),
              (eS[99] = eU),
              (eS[100] = eP),
              (eS[101] = es))
            : (es = eS[101]),
          eS[102] !== eQ
            ? ((eu = eQ
                ? (0, t.jsx)("p", {
                    role: "status",
                    "data-testid": "update-callout-thread-syncing",
                    className: (0, I.c)("text-xs leading-4", h.m.invalid),
                    children: eQ,
                  })
                : null),
              (eS[102] = eQ),
              (eS[103] = eu))
            : (eu = eS[103]),
          eS[104] !== Z ||
          eS[105] !== ea ||
          eS[106] !== ei ||
          eS[107] !== es ||
          eS[108] !== eu
            ? ((eo = (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [Z, ea, ei, es, eu],
              })),
              (eS[104] = Z),
              (eS[105] = ea),
              (eS[106] = ei),
              (eS[107] = es),
              (eS[108] = eu),
              (eS[109] = eo))
            : (eo = eS[109]),
          eS[110] !== eJ || eS[111] !== J || eS[112] !== Q || eS[113] !== eo
            ? ((ec = (0, t.jsxs)(m.K, {
                className: "flex flex-col gap-4 pr-14",
                "data-testid": "update-callout-body",
                ...eJ,
                children: [J, Q, eo],
              })),
              (eS[110] = eJ),
              (eS[111] = J),
              (eS[112] = Q),
              (eS[113] = eo),
              (eS[114] = ec))
            : (ec = eS[114]));
        let e9 = eB || eV;
        (eS[115] !== eG || eS[116] !== e9
          ? ((ed = (0, t.jsx)("div", {
              className: "mr-auto flex items-center",
              children: (0, t.jsx)(u.S, {
                onPick: eG,
                disabled: e9,
                testId: "update-callout-attach",
              }),
            })),
            (eS[115] = eG),
            (eS[116] = e9),
            (eS[117] = ed))
          : (ed = eS[117]),
          eS[118] !== ew
            ? ((ef = () => ew(!1)), (eS[118] = ew), (eS[119] = ef))
            : (ef = eS[119]),
          eS[120] !== eT
            ? ((ep = eT("common.cancel")), (eS[120] = eT), (eS[121] = ep))
            : (ep = eS[121]),
          eS[122] !== ef || eS[123] !== ep
            ? ((em = (0, t.jsx)(n.K, {
                size: m.Z,
                variant: "secondary",
                onClick: ef,
                children: ep,
              })),
              (eS[122] = ef),
              (eS[123] = ep),
              (eS[124] = em))
            : (em = eS[124]));
        let e8 = ek || !eF;
        return (
          eS[125] === Symbol.for("react.memo_cache_sentinel")
            ? ((eh = (0, t.jsx)(l.wh, {})), (eS[125] = eh))
            : (eh = eS[125]),
          eS[126] !== eB || eS[127] !== eT
            ? ((eb = eT(eB ? "web.callouts.updating" : "callouts.update.cta")),
              (eS[126] = eB),
              (eS[127] = eT),
              (eS[128] = eb))
            : (eb = eS[128]),
          eS[129] !== eY || eS[130] !== eB || eS[131] !== e8 || eS[132] !== eb
            ? ((eg = (0, t.jsx)(n.K, {
                size: m.$,
                variant: "primary",
                onClick: eY,
                isDisabled: e8,
                isLoading: eB,
                iconStart: eh,
                "data-testid": "update-callout-submit",
                children: eb,
              })),
              (eS[129] = eY),
              (eS[130] = eB),
              (eS[131] = e8),
              (eS[132] = eb),
              (eS[133] = eg))
            : (eg = eS[133]),
          eS[134] !== ed || eS[135] !== em || eS[136] !== eg
            ? ((ey = (0, t.jsxs)(m.c, { children: [ed, em, eg] })),
              (eS[134] = ed),
              (eS[135] = em),
              (eS[136] = eg),
              (eS[137] = ey))
            : (ey = eS[137]),
          eS[138] !== ex ||
          eS[139] !== ew ||
          eS[140] !== z ||
          eS[141] !== B ||
          eS[142] !== ec ||
          eS[143] !== ey
            ? ((ev = (0, t.jsxs)(m.N, {
                open: ex,
                onOpenChange: ew,
                density: "comfortable",
                size: "md",
                "aria-label": z,
                className: "relative",
                "data-testid": "update-callout-dialog",
                children: [B, ec, ey],
              })),
              (eS[138] = ex),
              (eS[139] = ew),
              (eS[140] = z),
              (eS[141] = B),
              (eS[142] = ec),
              (eS[143] = ey),
              (eS[144] = ev))
            : (ev = eS[144]),
          ev
        );
      },
    ],
    665579,
  );
};
