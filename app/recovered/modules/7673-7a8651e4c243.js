// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(574472),
    i = e.i(352386),
    n = e.i(665579),
    l = e.i(171840),
    s = e.i(116458),
    o = e.i(79395),
    c = e.i(541710),
    d = e.i(646908),
    u = e.i(595673),
    m = e.i(779106),
    f = e.i(198825),
    p = e.i(237687);
  function h(e) {
    return e + 1;
  }
  e.s([
    "CreateCalloutDialogHost",
    0,
    function () {
      let e,
        b,
        x,
        g,
        y,
        v,
        w,
        _,
        j,
        C,
        N,
        S,
        k,
        E,
        A,
        I,
        T,
        R = (0, r.c)(47),
        { address: L } = (0, a.F)(),
        O = (0, m.f)("own-mint-callout"),
        { setShowWallet: M } = (0, f.useConnectWallet)(),
        [D, F] = (0, i.useState)(!1),
        [P, z] = (0, i.useState)(null),
        [K, B] = (0, i.useState)(0),
        [H, q] = (0, i.useState)(null),
        [W, U] = (0, i.useState)(null),
        [V, G] = (0, i.useState)("create_callout_dialog"),
        $ = P && "coin" in P ? P.coin : null,
        Q = P && "mint" in P ? P.mint : null,
        Z = !$ && !!Q,
        Y = Q ?? "",
        X = Z && D;
      (R[0] !== X ? ((e = { enabled: X }), (R[0] = X), (R[1] = e)) : (e = R[1]),
        R[2] !== Y || R[3] !== e
          ? ((b = { coinAddress: Y, queryOptions: e }),
            (R[2] = Y),
            (R[3] = e),
            (R[4] = b))
          : (b = R[4]));
      let { data: J, isError: ee } = (0, o.f)(b),
        et = $ ?? J ?? null,
        er = D && (!Z || null != et || ee);
      R[5] !== L || R[6] !== M
        ? ((x = (e, t) => {
            L
              ? ((0, u.bh)(
                  t?.screen != null || t?.sourceElement != null
                    ? { screen: t.screen, sourceElement: t.sourceElement }
                    : void 0,
                ),
                q(null),
                z(e ?? null),
                F(!0),
                B(h))
              : M(!0);
          }),
          (R[5] = L),
          (R[6] = M),
          (R[7] = x))
        : (x = R[7]);
      let ea = x;
      R[8] !== L || R[9] !== M
        ? ((g = (e) => {
            L
              ? (F(!1),
                z(null),
                q(e.mint),
                U(e.chainId ?? null),
                G(e.entryPoint))
              : M(!0);
          }),
          (R[8] = L),
          (R[9] = M),
          (R[10] = g))
        : (g = R[10]);
      let ei = g;
      (R[11] !== ea
        ? ((y = () => (0, p.m)(ea)),
          (v = [ea]),
          (R[11] = ea),
          (R[12] = y),
          (R[13] = v))
        : ((y = R[12]), (v = R[13])),
        (0, i.useEffect)(y, v),
        R[14] !== ei
          ? ((w = () => (0, p.J)(ei)),
            (_ = [ei]),
            (R[14] = ei),
            (R[15] = w),
            (R[16] = _))
          : ((w = R[15]), (_ = R[16])),
        (0, i.useEffect)(w, _),
        R[17] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = (e) => {
              (F(e), e || z(null));
            }),
            (R[17] = j))
          : (j = R[17]));
      let en = j;
      R[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((C = (e) => {
            e || q(null);
          }),
          (R[18] = C))
        : (C = R[18]);
      let el = C,
        es = H ?? "";
      R[19] !== W
        ? ((N = (0, d.C)(W) ? W : void 0), (R[19] = W), (R[20] = N))
        : (N = R[20]);
      let eo = !!H;
      (R[21] !== eo
        ? ((S = { enabled: eo }), (R[21] = eo), (R[22] = S))
        : (S = R[22]),
        R[23] !== es || R[24] !== N || R[25] !== S
          ? ((k = { coinAddress: es, chainId: N, queryOptions: S }),
            (R[23] = es),
            (R[24] = N),
            (R[25] = S),
            (R[26] = k))
          : (k = R[26]));
      let { data: ec, isError: ed } = (0, o.f)(k),
        eu = ec ?? null,
        em = (0, c.l)(),
        ef = W ?? eu?.chain_id,
        ep = (0, d.L)(ef) ? d.J : (0, d.B)(ef) && (0, c.M)(em) ? d.d : void 0,
        eh = !!(H && O);
      R[27] !== ep || R[28] !== eh || R[29] !== H || R[30] !== O
        ? ((E = { mint: H, chain: ep, accountKey: O, enabled: eh }),
          (R[27] = ep),
          (R[28] = eh),
          (R[29] = H),
          (R[30] = O),
          (R[31] = E))
        : (E = R[31]);
      let { callout: eb, isError: ex } = (0, s.W)(E),
        eg = !!(H && eu && eb),
        ey = !!H && !eg && (ed || (null != eu && (null === eb || ex)));
      return (
        R[32] !== er || R[33] !== K || R[34] !== et
          ? ((A =
              K > 0 && er
                ? (0, t.jsx)(
                    l.f,
                    { isOpen: er, onOpenChange: en, prefilledCoin: et },
                    K,
                  )
                : null),
            (R[32] = er),
            (R[33] = K),
            (R[34] = et),
            (R[35] = A))
          : (A = R[35]),
        R[36] !== eb ||
        R[37] !== eu ||
        R[38] !== ed ||
        R[39] !== V ||
        R[40] !== ey ||
        R[41] !== H ||
        R[42] !== eg
          ? ((I =
              eg && H && eu && eb
                ? (0, t.jsx)(
                    n.f,
                    {
                      isOpen: !0,
                      onOpenChange: el,
                      coin: eu,
                      calloutId: eb.calloutId,
                      note: eb.note,
                      createdAt: eb.createdAt,
                      entryPoint: V,
                    },
                    `update-${H}`,
                  )
                : ey
                  ? (0, t.jsx)(
                      l.f,
                      {
                        isOpen: !0,
                        onOpenChange: el,
                        prefilledCoin: ed ? null : eu,
                      },
                      `update-fallback-${H}`,
                    )
                  : null),
            (R[36] = eb),
            (R[37] = eu),
            (R[38] = ed),
            (R[39] = V),
            (R[40] = ey),
            (R[41] = H),
            (R[42] = eg),
            (R[43] = I))
          : (I = R[43]),
        R[44] !== A || R[45] !== I
          ? ((T = (0, t.jsxs)(t.Fragment, { children: [A, I] })),
            (R[44] = A),
            (R[45] = I),
            (R[46] = T))
          : (T = R[46]),
        T
      );
    },
  ]);
};
