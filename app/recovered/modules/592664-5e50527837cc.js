// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(254667),
    n = e.i(574472),
    i = e.i(453706),
    a = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(831231),
    c = e.i(811433),
    d = e.i(427081),
    u = e.i(256272),
    m = e.i(21384),
    f = e.i(236810),
    x = e.i(356647),
    h = e.i(595673),
    p = e.i(198825),
    g = e.i(248208),
    b = e.i(605587);
  let v = (0, i.default)(() => e.A(961100).then((e) => e.RelayTradeBox), {
    loadableGenerated: { modules: [32332] },
    ssr: !1,
    loading: () => (0, t.jsx)(u.g, { className: "min-h-[238px]" }),
  });
  e.s([
    "EvmTradeGate",
    0,
    function (e) {
      let i,
        y,
        _,
        j,
        w,
        N,
        k,
        S,
        C,
        M,
        I,
        P,
        E,
        A,
        $,
        T,
        R,
        U = (0, l.c)(96),
        { coin: D, onClose: F } = e,
        { t: L } = (0, s.f)(),
        { address: B, shouldUsePrivy: O, logout: q } = (0, n.F)(),
        { setShowWallet: z, setShowLinkLogin: K } = (0, p.useConnectWallet)(),
        { method: V, reader: Q } = (0, m.f)(),
        { trackConnectWalletPress: H } = (0, c.R)();
      (U[0] !== V ? ((i = (0, x.l)(V)), (U[0] = V), (U[1] = i)) : (i = U[1]),
        U[2] !== B || U[3] !== i
          ? ((y = { address: B, enabled: i }),
            (U[2] = B),
            (U[3] = i),
            (U[4] = y))
          : (y = U[4]));
      let { data: W } = (0, f.f)(y);
      U[5] !== B || U[6] !== W || U[7] !== V || U[8] !== O
        ? ((_ = !!B && !O && (0, x.h)({ method: V, linkStatus: W })),
          (U[5] = B),
          (U[6] = W),
          (U[7] = V),
          (U[8] = O),
          (U[9] = _))
        : (_ = U[9]);
      let Y = _;
      if (
        (U[10] !== Y
          ? ((j = () => {
              Y &&
                r.y.warn("Privy session lapsed under a live pump session", {
                  surface: "evm_trade_gate",
                });
            }),
            (w = [Y]),
            (U[10] = Y),
            (U[11] = j),
            (U[12] = w))
          : ((j = U[11]), (w = U[12])),
        (0, a.useEffect)(j, w),
        U[13] !== B ||
          U[14] !== D ||
          U[15] !== Q ||
          U[16] !== q ||
          U[17] !== V ||
          U[18] !== F ||
          U[19] !== Y ||
          U[20] !== z ||
          U[21] !== O ||
          U[22] !== L ||
          U[23] !== H)
      ) {
        C = Symbol.for("react.early_return_sentinel");
        e: {
          let e,
            l,
            r = (0, b.n)(D.chain_id) ?? "EVM";
          if (
            (U[28] !== L
              ? ((e = L("web.trade.evm_needs_social_login_title")),
                (U[28] = L),
                (U[29] = e))
              : (e = U[29]),
            (k = e),
            U[30] !== L
              ? ((l = L("account.privy_link.settings_row")),
                (U[30] = L),
                (U[31] = l))
              : (l = U[31]),
            (N = l),
            !B)
          ) {
            let e, l, n;
            (U[32] !== L
              ? ((e = L("web.auth.log_in")), (U[32] = L), (U[33] = e))
              : (e = U[33]),
              U[34] !== D || U[35] !== z || U[36] !== H
                ? ((l = () => {
                    (H({ coin: D }), z(!0));
                  }),
                  (U[34] = D),
                  (U[35] = z),
                  (U[36] = H),
                  (U[37] = l))
                : (l = U[37]),
              U[38] !== e || U[39] !== l
                ? ((n = { label: e, onClick: l }),
                  (U[38] = e),
                  (U[39] = l),
                  (U[40] = n))
                : (n = U[40]),
              (C = (0, t.jsx)(d.f, {
                coin: D,
                reason: k,
                explanation: [
                  L("web.trade.evm_login_description", { chain_name: r }),
                ],
                primaryAction: n,
                onClose: F,
                chain: "evm",
              })));
            break e;
          }
          if (O) {
            let e, l;
            (U[41] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)(u.g, { className: "min-h-[238px]" })),
                (U[41] = e))
              : (e = U[41]),
              U[42] !== D || U[43] !== F
                ? ((l = (0, t.jsx)(g.R, {
                    fallback: e,
                    children: (0, t.jsx)(v, { coin: D, onClose: F }),
                  })),
                  (U[42] = D),
                  (U[43] = F),
                  (U[44] = l))
                : (l = U[44]),
              (C = l));
            break e;
          }
          if ("external" !== V.kind) {
            let e, l;
            (U[45] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)(o.CardBoxSkeleton, {
                  heightClassName: "h-[214px]",
                })),
                (U[45] = e))
              : (e = U[45]),
              U[46] !== Q
                ? ((l = (0, t.jsxs)(t.Fragment, { children: [Q, e] })),
                  (U[46] = Q),
                  (U[47] = l))
                : (l = U[47]),
              (C = l));
            break e;
          }
          if (Y) {
            let e, l, r, n, i, a, s, o;
            (U[48] !== L
              ? ((e = L("web.trade.swap_session_expired_title")),
                (U[48] = L),
                (U[49] = e))
              : (e = U[49]),
              U[50] !== L
                ? ((l = L("web.trade.swap_session_expired_description")),
                  (U[50] = L),
                  (U[51] = l))
                : (l = U[51]),
              U[52] !== l ? ((r = [l]), (U[52] = l), (U[53] = r)) : (r = U[53]),
              U[54] !== L
                ? ((n = L("web.auth.log_in")), (U[54] = L), (U[55] = n))
                : (n = U[55]),
              U[56] !== q || U[57] !== z
                ? ((i = async () => {
                    (await q(), z(!0));
                  }),
                  (U[56] = q),
                  (U[57] = z),
                  (U[58] = i))
                : (i = U[58]),
              U[59] !== n || U[60] !== i
                ? ((a = {
                    label: n,
                    testId: "evm-trade-gate-sign-in-again",
                    onClick: i,
                  }),
                  (U[59] = n),
                  (U[60] = i),
                  (U[61] = a))
                : (a = U[61]),
              U[62] !== D ||
              U[63] !== F ||
              U[64] !== e ||
              U[65] !== r ||
              U[66] !== a
                ? ((s = (0, t.jsx)(d.f, {
                    coin: D,
                    reason: e,
                    explanation: r,
                    primaryAction: a,
                    onClose: F,
                    chain: "evm",
                  })),
                  (U[62] = D),
                  (U[63] = F),
                  (U[64] = e),
                  (U[65] = r),
                  (U[66] = a),
                  (U[67] = s))
                : (s = U[67]),
              U[68] !== Q || U[69] !== s
                ? ((o = (0, t.jsxs)(t.Fragment, { children: [Q, s] })),
                  (U[68] = Q),
                  (U[69] = s),
                  (U[70] = o))
                : (o = U[70]),
              (C = o));
            break e;
          }
          S = L("web.trade.evm_needs_social_login_description", {
            chain_name: r,
          });
        }
        ((U[13] = B),
          (U[14] = D),
          (U[15] = Q),
          (U[16] = q),
          (U[17] = V),
          (U[18] = F),
          (U[19] = Y),
          (U[20] = z),
          (U[21] = O),
          (U[22] = L),
          (U[23] = H),
          (U[24] = N),
          (U[25] = k),
          (U[26] = S),
          (U[27] = C));
      } else ((N = U[24]), (k = U[25]), (S = U[26]), (C = U[27]));
      if (C !== Symbol.for("react.early_return_sentinel")) return C;
      let X = S;
      (U[71] !== L
        ? ((M = L("web.trade.evm_switch_login")), (U[71] = L), (U[72] = M))
        : (M = U[72]),
        U[73] !== q || U[74] !== z
          ? ((I = async () => {
              (await q(), z(!0));
            }),
            (U[73] = q),
            (U[74] = z),
            (U[75] = I))
          : (I = U[75]),
        U[76] !== M || U[77] !== I
          ? ((P = { label: M, onClick: I }),
            (U[76] = M),
            (U[77] = I),
            (U[78] = P))
          : (P = U[78]));
      let G = P;
      (U[79] !== K
        ? ((E = () => {
            ((0, h.yt)({
              surface: "evm_trade_gate",
              interactionType: "cta",
              cta: "link",
            }),
              K(!0));
          }),
          (U[79] = K),
          (U[80] = E))
        : (E = U[80]),
        U[81] !== N || U[82] !== E
          ? ((A = {
              label: N,
              testId: "evm-trade-gate-link-login",
              onClick: E,
            }),
            (U[81] = N),
            (U[82] = E),
            (U[83] = A))
          : (A = U[83]));
      let J = A;
      return (
        U[84] !== X ? (($ = [X]), (U[84] = X), (U[85] = $)) : ($ = U[85]),
        U[86] !== D ||
        U[87] !== J ||
        U[88] !== F ||
        U[89] !== k ||
        U[90] !== G ||
        U[91] !== $
          ? ((T = (0, t.jsx)(d.f, {
              coin: D,
              reason: k,
              explanation: $,
              primaryAction: J,
              secondaryAction: G,
              onClose: F,
              chain: "evm",
            })),
            (U[86] = D),
            (U[87] = J),
            (U[88] = F),
            (U[89] = k),
            (U[90] = G),
            (U[91] = $),
            (U[92] = T))
          : (T = U[92]),
        U[93] !== Q || U[94] !== T
          ? ((R = (0, t.jsxs)(t.Fragment, { children: [Q, T] })),
            (U[93] = Q),
            (U[94] = T),
            (U[95] = R))
          : (R = U[95]),
        R
      );
    },
  ]);
};
