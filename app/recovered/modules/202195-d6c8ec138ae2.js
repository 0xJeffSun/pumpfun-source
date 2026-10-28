// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(439587),
    a = e.i(254667),
    r = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    l = e.i(167958),
    o = e.i(724423),
    u = e.i(607122),
    d = e.i(248496),
    c = e.i(901665),
    m = e.i(102824),
    g = e.i(363250),
    p = e.i(505102),
    f = e.i(331043),
    h = e.i(292686),
    _ = e.i(574472),
    b = e.i(690877),
    y = e.i(606933),
    v = e.i(63289),
    w = e.i(263965),
    x = e.i(515529),
    z = e.i(97326),
    A = e.i(895492),
    S = e.i(584229),
    k = e.i(670550),
    I = e.i(913719),
    q = e.i(399015),
    $ = e.i(778396),
    B = e.i(460261),
    N = e.i(396364),
    M = e.i(167156),
    T = e.i(84976),
    j = e.i(431004),
    U = e.i(656846),
    P = e.i(690230),
    E = e.i(299092);
  let W = { usdc: "1", sol: "0.01" },
    D = { sol: "SOL", usdc: U.f.symbol },
    C = { usdc: 2, sol: 4 },
    R = BigInt(0),
    F = (e, t) => {
      if (!Number.isFinite(e) || e <= 0) return "";
      let n = ((e) => {
          let t = /^(\d+)(?:\.(\d+))?e([+-]?\d+)$/i.exec(e);
          if (!t) return e;
          let [, n = "", i = "", a = "0"] = t,
            r = `${n}${i}`,
            s = n.length + Number(a);
          return s <= 0
            ? `0.${"0".repeat(-s)}${r}`
            : s >= r.length
              ? `${r}${"0".repeat(s - r.length)}`
              : `${r.slice(0, s)}.${r.slice(s)}`;
        })(String(e)),
        i = n.indexOf(".");
      if (-1 === i) return n;
      let a = n.slice(0, i + 1 + t);
      if (!(Number(a) > 0)) {
        let e = n.slice(i + 1).search(/[1-9]/);
        a = n.slice(0, i + 1 + e + 4);
      }
      return a.replace(/0+$/, "").replace(/\.$/, "");
    },
    O = (e, t) => (0, I.v)(F(e, (0, T.q)(t)), (0, T.q)(t)) ?? R,
    L = ({ payAsset: e, solUsd: t, suggestedAmount: n }) => {
      if ("sol" === e && !(t > 0)) return null;
      let i = O("usdc" === e ? 100 : 100 / t, e),
        a = i * BigInt(2),
        r = (0, I.v)(n, (0, T.q)(e)) ?? R;
      return r <= i ? i : r < a ? r : a;
    };
  var K = e.i(159060),
    Q = e.i(362895),
    G = e.i(61687);
  let V = BigInt(0),
    X = { sourceElement: h.k9.WITHDRAW_FORM, screen: h.Ae.ACCOUNT };
  var Z = e.i(367310);
  let J = "comfortable",
    H = /^\d*(?:\.\d*)?$/,
    Y = BigInt(0);
  function ee(e) {
    let h,
      U,
      ee,
      et,
      en,
      ei,
      ea,
      er,
      es,
      el,
      eo,
      eu,
      ed,
      ec,
      em,
      eg,
      ep,
      ef,
      eh,
      e_,
      eb,
      ey,
      ev,
      ew,
      ex,
      ez,
      eA,
      eS,
      ek,
      eI,
      eq,
      e$,
      eB = (0, n.c)(106),
      {
        request: eN,
        amountRef: eM,
        isSubmitting: eT,
        onSubmittingChange: ej,
        onCancel: eU,
        onToppedUp: eP,
      } = e,
      { t: eE } = (0, s.f)(),
      eW = (0, r.useId)(),
      eD = (0, Z.k)();
    eB[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((h = {}), (eB[0] = h))
      : (h = eB[0]);
    let { data: eC } = (0, g.f)(h),
      eR = void 0 === eC ? 0 : eC,
      [eF, eO] = (0, r.useState)(eD ? "usdc" : "sol"),
      [eL, eK] = (0, r.useState)(null),
      eQ = (0, r.useRef)(!1),
      eG = eR > 0,
      eV = eG ? eF : "usdc";
    eB[1] !== eV || eB[2] !== eN
      ? ((U = { request: eN, payAsset: eV }),
        (eB[1] = eV),
        (eB[2] = eN),
        (eB[3] = U))
      : (U = eB[3]);
    let eX = (function (e) {
      let t,
        i,
        r,
        l,
        o,
        u,
        d,
        c,
        m,
        p,
        f = (0, n.c)(50),
        { request: h, payAsset: U } = e,
        { t: P } = (0, s.f)(),
        { address: E } = (0, _.F)(),
        { evmWalletAddress: R } = (0, G.f)(),
        { slippage: O } = (0, z.f)(),
        Z = Math.min(Math.max(Math.round(100 * O) || 1, 1), 5e3);
      f[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((t = {}), (f[0] = t))
        : (t = f[0]);
      let { data: J } = (0, g.f)(t),
        H = void 0 === J ? 0 : J,
        Y = (0, y.useQueryClient)(),
        ee = (0, x.f)(),
        et = String(h.chainId);
      f[1] !== U ? ((i = (0, T.q)(U)), (f[1] = U), (f[2] = i)) : (i = f[2]);
      let en = i,
        ei = (e) => ({
          direction: "buy",
          mint: q.W,
          chainId: et,
          atomicAmount: e,
          solanaAsset: U,
          solanaWalletAddress: h.solanaWalletAddress,
          evmWalletAddress: h.evmWalletAddress,
          slippageBps: Z,
        });
      f[3] !== et ? ((r = (0, B.L)(et)), (f[3] = et), (f[4] = r)) : (r = f[4]);
      let ea = null !== r,
        er = (({
          chainId: e,
          payAsset: t,
          solanaWalletAddress: n,
          evmWalletAddress: i,
          slippageBps: a,
        }) => ["evmGasTopupRate", e, t, n, i.toLowerCase(), a])({
          chainId: h.chainId,
          payAsset: U,
          solanaWalletAddress: h.solanaWalletAddress,
          evmWalletAddress: h.evmWalletAddress,
          slippageBps: Z,
        });
      (f[5] !== U ||
      f[6] !== en ||
      f[7] !== ei ||
      f[8] !== h.chainId ||
      f[9] !== h.nativeDecimals
        ? ((l = async () => {
            let e = W[U],
              t = (0, I.v)(e, en);
            if (null === t) return 0;
            let n = await (0, N.f)(ei(t));
            if ("ok" !== n.kind)
              return (
                a.y.warn("[useEvmGasTopup] gas_topup_probe_unpriced", {
                  evm_chain: h.chainId,
                  pay_asset: U,
                  reason: n.reason,
                  status: n.status,
                }),
                0
              );
            let i =
              Number((0, w.f)(BigInt(n.data.toAmount), h.nativeDecimals)) /
              Number(e);
            return Number.isFinite(i) && i > 0 ? i : 0;
          }),
          (f[5] = U),
          (f[6] = en),
          (f[7] = ei),
          (f[8] = h.chainId),
          (f[9] = h.nativeDecimals),
          (f[10] = l))
        : (l = f[10]),
        f[11] !== ea || f[12] !== er || f[13] !== l
          ? ((o = {
              queryKey: er,
              enabled: ea,
              staleTime: 6e4,
              retry: !1,
              refetchOnWindowFocus: !1,
              queryFn: l,
            }),
            (f[11] = ea),
            (f[12] = er),
            (f[13] = l),
            (f[14] = o))
          : (o = f[14]));
      let es = (0, b.useQuery)(o),
        el = ea && es.isPending;
      f[15] !== el ||
      f[16] !== U ||
      f[17] !== es ||
      f[18] !== h.nativeDecimals ||
      f[19] !== h.shortfallWei ||
      f[20] !== H
        ? ((u = el
            ? ""
            : (({
                shortfallNative: e,
                nativePerPayUnit: t,
                payAsset: n,
                solUsd: i,
              }) => {
                if ("sol" === n && !(i > 0)) return "";
                let a = "usdc" === n ? 2 : 2 / i,
                  r = t > 0 && e > 0 ? (1.5 * e) / t : 0;
                return F(Number.isFinite(r) ? Math.max(r, a) : a, C[n]);
              })({
                shortfallNative: Number(
                  (0, w.f)(h.shortfallWei, h.nativeDecimals),
                ),
                nativePerPayUnit: es.data ?? 0,
                payAsset: U,
                solUsd: H,
              })),
          (f[15] = el),
          (f[16] = U),
          (f[17] = es),
          (f[18] = h.nativeDecimals),
          (f[19] = h.shortfallWei),
          (f[20] = H),
          (f[21] = u))
        : (u = f[21]);
      let eo = u;
      f[22] !== Y || f[23] !== h.evmWalletAddress
        ? ((d = () => {
            (Y.invalidateQueries({ queryKey: (0, Q.n)(h.evmWalletAddress) }),
              Y.invalidateQueries({ queryKey: [K.y] }));
          }),
          (f[22] = Y),
          (f[23] = h.evmWalletAddress),
          (f[24] = d))
        : (d = f[24]);
      let eu = d;
      f[25] !== U || f[26] !== h.chainId
        ? ((c = (e, t) => (
            a.y.warn("[useEvmGasTopup] gas_topup_refused", {
              evm_chain: h.chainId,
              pay_asset: U,
              reason: e,
            }),
            v.c.error(t),
            "failed"
          )),
          (f[25] = U),
          (f[26] = h.chainId),
          (f[27] = c))
        : (c = f[27]);
      let ed = c;
      f[28] !== E ||
      f[29] !== R ||
      f[30] !== U ||
      f[31] !== en ||
      f[32] !== ei ||
      f[33] !== eu ||
      f[34] !== ed ||
      f[35] !== h.chainId ||
      f[36] !== h.evmWalletAddress ||
      f[37] !== h.nativeDecimals ||
      f[38] !== h.nativeSymbol ||
      f[39] !== h.solanaWalletAddress ||
      f[40] !== H ||
      f[41] !== ee ||
      f[42] !== eo ||
      f[43] !== P
        ? ((m = async (e) => {
            let { atomicAmount: t } = e;
            if (
              E !== h.solanaWalletAddress ||
              R?.toLowerCase() !== h.evmWalletAddress.toLowerCase()
            )
              return ed(
                "wallet_changed",
                P("trade.errors.wallet_state_changed"),
              );
            if (t <= V)
              return ed(
                "empty_amount",
                P("trade.enter_amount_in_currency", { symbol: D[U] }),
              );
            let n = L({ payAsset: U, solUsd: H, suggestedAmount: eo });
            if (null === n)
              return ed("unpriced", P("web.trade.relay_error_unavailable"));
            if (t > n)
              return ed(
                "over_cap",
                P("funding.providers.maximum_amount", {
                  amount: P("common.amount_with_symbol", {
                    amount: (0, I.N)(n, en, C[U]),
                    symbol: D[U],
                  }),
                }),
              );
            let i = (0, k.A)(h.chainId),
              r = {
                mint: q.W,
                symbol: h.nativeSymbol,
                name: i?.name ?? h.nativeSymbol,
                image_uri: i?.imageUri ?? null,
                chain_id: h.chainId,
              },
              s = { evm_chain: h.chainId, mint: q.W };
            try {
              return (
                await ee.mutateAsync({
                  quoteRequest: ei(t),
                  coinSymbol: h.nativeSymbol,
                  coin: r,
                  tokenDecimals: h.nativeDecimals,
                  spotReference: null,
                  analytics: X,
                }),
                a.y.warn("evm_gas_swap_success", s),
                eu(),
                "funded"
              );
            } catch (e) {
              if (
                e instanceof $.l ||
                (0, S.S)(e) ||
                (e instanceof A.p && (0, S.S)(e.cause))
              )
                return "declined";
              if (
                (a.y.warn("evm_gas_swap_error", { ...s, reason: (0, M.h)(e) }),
                e instanceof j.P || (e instanceof A.p && e.pending))
              )
                return (eu(), "pending");
              return "failed";
            }
          }),
          (f[28] = E),
          (f[29] = R),
          (f[30] = U),
          (f[31] = en),
          (f[32] = ei),
          (f[33] = eu),
          (f[34] = ed),
          (f[35] = h.chainId),
          (f[36] = h.evmWalletAddress),
          (f[37] = h.nativeDecimals),
          (f[38] = h.nativeSymbol),
          (f[39] = h.solanaWalletAddress),
          (f[40] = H),
          (f[41] = ee),
          (f[42] = eo),
          (f[43] = P),
          (f[44] = m))
        : (m = f[44]);
      let ec = m;
      return (
        f[45] !== el || f[46] !== Z || f[47] !== ec || f[48] !== eo
          ? ((p = {
              suggestedAmount: eo,
              isSizing: el,
              slippageBps: Z,
              submit: ec,
            }),
            (f[45] = el),
            (f[46] = Z),
            (f[47] = ec),
            (f[48] = eo),
            (f[49] = p))
          : (p = f[49]),
        p
      );
    })(U);
    eB[4] !== eV || eB[5] !== eN.solanaWalletAddress
      ? ((ee = { payAsset: eV, wallet: eN.solanaWalletAddress }),
        (eB[4] = eV),
        (eB[5] = eN.solanaWalletAddress),
        (eB[6] = ee))
      : (ee = eB[6]);
    let eZ = (function (e) {
        let t,
          i,
          a = (0, n.c)(6),
          { payAsset: r, wallet: s } = e,
          { solBalance: l, solBalanceLoaded: o, usdcBalance: u } = (0, m.f)(),
          d = null === u;
        a[0] !== d || a[1] !== s
          ? ((t = { wallet: s, enabled: d, refetchIntervalMs: c.O }),
            (a[0] = d),
            (a[1] = s),
            (a[2] = t))
          : (t = a[2]);
        let g = (0, p.G)(t);
        return "usdc" === r
          ? null !== u
            ? u.balanceRaw
            : (g.data?.atomicAmount ?? null)
          : (a[3] !== l || a[4] !== o
              ? ((i = o ? BigInt(Math.trunc(l)) : null),
                (a[3] = l),
                (a[4] = o),
                (a[5] = i))
              : (i = a[5]),
            i);
      })(ee),
      eJ = (0, T.q)(eV),
      eH = D[eV],
      eY = (e) => (0, I.N)(e, eJ, C[eV]),
      e0 = eL?.asset === eV,
      e1 = e0 ? eL.amount : eX.suggestedAmount,
      e2 = (0, I.v)(e1, eJ),
      e3 = (({ payAsset: e, balanceAtomic: t, chainId: n }) => {
        if (null === t) return null;
        let i =
          t - ("sol" === e ? O(E.D, e) : R) - O((0, P.f)(String(n), e), e);
        return i > R ? i : R;
      })({ payAsset: eV, balanceAtomic: eZ, chainId: eN.chainId }),
      e4 = L({ payAsset: eV, solUsd: eR, suggestedAmount: eX.suggestedAmount }),
      e6 = eT
        ? null
        : (({ amountAtomic: e, spendableAtomic: t, maxPayAtomic: n }) =>
            null === e || e <= R
              ? null
              : null !== t && e > t
                ? "insufficient"
                : null === n
                  ? "unpriced"
                  : e > n
                    ? "over_cap"
                    : null)({
            amountAtomic: e2,
            spendableAtomic: e3,
            maxPayAtomic: e4,
          }),
      e5 = null !== e2 && e2 > Y && null === e6,
      e9 = e5 && null !== e3 && !eX.isSizing && !eT,
      e7 = eX.isSizing && !e0,
      e8 = (0, f.f)({
        mint: q.W,
        chainId: String(eN.chainId),
        direction: "buy",
        atomicAmount: e5 ? e2 : null,
        solanaAsset: eV,
        solanaWalletAddress: eN.solanaWalletAddress,
        evmWalletAddress: eN.evmWalletAddress,
        slippageBps: eX.slippageBps,
        solUsdPrice: eR,
        enabled: e5,
        pausePreview: eT,
      }),
      te = e5 && e8.isInputSettled && e8.quote ? e8.quote.toAmount : null,
      tt = e7 || (e5 && null === te && !e8.errorMessage),
      tn = eT || !eG;
    (eB[7] !== eG || eB[8] !== eE
      ? ((et = eG ? void 0 : eE("web.trade.quote_unavailable")),
        (eB[7] = eG),
        (eB[8] = eE),
        (eB[9] = et))
      : (et = eB[9]),
      eB[10] !== tn || eB[11] !== et
        ? ((en = {
            value: "sol",
            label: D.sol,
            disabled: tn,
            disabledReason: et,
          }),
          (eB[10] = tn),
          (eB[11] = et),
          (eB[12] = en))
        : (en = eB[12]),
      eB[13] !== eT
        ? ((ei = { value: "usdc", label: D.usdc, disabled: eT }),
          (eB[13] = eT),
          (eB[14] = ei))
        : (ei = eB[14]),
      eB[15] !== en || eB[16] !== ei
        ? ((ea = [en, ei]), (eB[15] = en), (eB[16] = ei), (eB[17] = ea))
        : (ea = eB[17]));
    let ti = ea;
    eB[18] === Symbol.for("react.memo_cache_sentinel")
      ? ((er = (e) => {
          (eO(e), eK(null));
        }),
        (eB[18] = er))
      : (er = eB[18]);
    let ta = er;
    eB[19] !== eV
      ? ((es = (e) => {
          !(e.length > 20) && H.test(e) && eK({ asset: eV, amount: e });
        }),
        (eB[19] = eV),
        (eB[20] = es))
      : (es = eB[20]);
    let tr = es,
      ts = async () => {
        if (!e9 || null === e2 || eQ.current) return;
        ((eQ.current = !0), ej(!0));
        let e = await eX
          .submit({ atomicAmount: e2 })
          .catch(
            (e) => (
              a.y.error("[EvmGasTopupDialog] gas_topup_submit_threw", {
                evm_chain: eN.chainId,
                error: e instanceof Error ? e.message : String(e),
              }),
              "failed"
            ),
          );
        ((eQ.current = !1),
          ej(!1),
          ("funded" === e || "pending" === e) && eP(e));
      },
      tl = l.K;
    (eB[21] !== eN.chainName ||
    eB[22] !== eN.nativeDecimals ||
    eB[23] !== eN.nativeSymbol ||
    eB[24] !== eN.shortfallWei ||
    eB[25] !== eN.ticker ||
    eB[26] !== eE
      ? ((el = eE("profile.wallet_send.gas_topup.description", {
          ticker: eN.ticker,
          chain: eN.chainName,
          symbol: eN.nativeSymbol,
          amount: (0, I.N)(eN.shortfallWei, eN.nativeDecimals, 8),
        })),
        (eB[21] = eN.chainName),
        (eB[22] = eN.nativeDecimals),
        (eB[23] = eN.nativeSymbol),
        (eB[24] = eN.shortfallWei),
        (eB[25] = eN.ticker),
        (eB[26] = eE),
        (eB[27] = el))
      : (el = eB[27]),
      eB[28] !== el
        ? ((eo = (0, t.jsx)("p", {
            className: "text-sm leading-5 text-text-secondary",
            children: el,
          })),
          (eB[28] = el),
          (eB[29] = eo))
        : (eo = eB[29]),
      eB[30] !== eE
        ? ((eu = eE("common.pay_with")), (eB[30] = eE), (eB[31] = eu))
        : (eu = eB[31]),
      eB[32] !== eW || eB[33] !== eu
        ? ((ed = (0, t.jsx)("span", {
            id: eW,
            className: "text-xs leading-4 text-text-tertiary",
            children: eu,
          })),
          (eB[32] = eW),
          (eB[33] = eu),
          (eB[34] = ed))
        : (ed = eB[34]),
      eB[35] !== eV || eB[36] !== eW || eB[37] !== ti
        ? ((ec = (0, t.jsx)(u.X, {
            density: J,
            "aria-labelledby": eW,
            value: eV,
            onValueChange: ta,
            options: ti,
          })),
          (eB[35] = eV),
          (eB[36] = eW),
          (eB[37] = ti),
          (eB[38] = ec))
        : (ec = eB[38]),
      eB[39] !== ed || eB[40] !== ec
        ? ((em = (0, t.jsxs)("div", {
            className: "flex items-center justify-between gap-3",
            children: [ed, ec],
          })),
          (eB[39] = ed),
          (eB[40] = ec),
          (eB[41] = em))
        : (em = eB[41]));
    let to = o.N,
      tu = e7 || void 0;
    eB[42] !== eH || eB[43] !== eE
      ? ((eg = eE("trade.enter_amount_in_currency", { symbol: eH })),
        (eB[42] = eH),
        (eB[43] = eE),
        (eB[44] = eg))
      : (eg = eB[44]);
    let td = null !== e6,
      tc =
        "insufficient" === e6
          ? eE("trade.errors.insufficient_funds")
          : "over_cap" === e6 && null !== e4
            ? eE("funding.providers.maximum_amount", {
                amount: eE("common.amount_with_symbol", {
                  amount: eY(e4),
                  symbol: eH,
                }),
              })
            : "unpriced" === e6
              ? eE("web.trade.relay_error_unavailable")
              : null === eZ
                ? null
                : eE("common.balance_with_amount", {
                    amount: eY(eZ),
                    symbol: eH,
                  });
    (eB[45] !== eH
      ? ((ep = (0, t.jsx)("span", {
          "aria-hidden": !0,
          className: "text-xs font-medium leading-4 text-text-tertiary",
          children: eH,
        })),
        (eB[45] = eH),
        (eB[46] = ep))
      : (ep = eB[46]),
      eB[47] !== to ||
      eB[48] !== e1 ||
      eB[49] !== eM ||
      eB[50] !== eT ||
      eB[51] !== tr ||
      eB[52] !== J ||
      20 !== eB[53] ||
      eB[54] !== tu ||
      eB[55] !== eg ||
      eB[56] !== td ||
      eB[57] !== tc ||
      eB[58] !== ep
        ? ((ef = (0, t.jsx)(to, {
            ref: eM,
            density: J,
            "data-testid": "gas-topup-amount",
            type: "text",
            inputMode: "decimal",
            autoComplete: "off",
            spellCheck: !1,
            maxLength: 20,
            value: e1,
            onValueChange: tr,
            disabled: eT,
            placeholder: "0",
            "aria-busy": tu,
            "aria-label": eg,
            invalid: td,
            helper: tc,
            inputClassName: "font-medium caret-text-primary",
            trailing: ep,
          })),
          (eB[47] = to),
          (eB[48] = e1),
          (eB[49] = eM),
          (eB[50] = eT),
          (eB[51] = tr),
          (eB[52] = J),
          (eB[53] = 20),
          (eB[54] = tu),
          (eB[55] = eg),
          (eB[56] = td),
          (eB[57] = tc),
          (eB[58] = ep),
          (eB[59] = ef))
        : (ef = eB[59]),
      eB[60] === Symbol.for("react.memo_cache_sentinel")
        ? ((eh = (0, t.jsx)(l.a, { className: "my-1" })), (eB[60] = eh))
        : (eh = eB[60]),
      eB[61] !== eE
        ? ((e_ = eE("trade.price_impact_override.you_receive")),
          (eB[61] = eE),
          (eB[62] = e_))
        : (e_ = eB[62]),
      eB[63] !== e_
        ? ((eb = (0, t.jsx)("span", {
            className: "text-sm leading-5 text-text-secondary",
            children: e_,
          })),
          (eB[63] = e_),
          (eB[64] = eb))
        : (eb = eB[64]),
      eB[65] !== tt ||
      eB[66] !== te ||
      eB[67] !== eN.nativeDecimals ||
      eB[68] !== eN.nativeSymbol ||
      eB[69] !== eE
        ? ((ey = tt
            ? (0, t.jsx)(d.l, {
                height: 20,
                width: 112,
                "data-testid": "gas-topup-receive-pricing",
              })
            : (0, t.jsx)("span", {
                "data-testid": "gas-topup-receive-amount",
                className:
                  "text-xl font-medium leading-7 tabular-nums text-text-primary",
                children:
                  null !== te
                    ? `≈ ${eE("common.amount_with_symbol", { amount: (0, I.N)(te, eN.nativeDecimals, 6), symbol: eN.nativeSymbol })}`
                    : `— ${eN.nativeSymbol}`,
              })),
          (eB[65] = tt),
          (eB[66] = te),
          (eB[67] = eN.nativeDecimals),
          (eB[68] = eN.nativeSymbol),
          (eB[69] = eE),
          (eB[70] = ey))
        : (ey = eB[70]),
      eB[71] !== eb || eB[72] !== ey
        ? ((ev = (0, t.jsxs)("div", {
            className: "flex h-11 items-center justify-between gap-3",
            "data-testid": "gas-topup-receive",
            "aria-live": "polite",
            children: [eb, ey],
          })),
          (eB[71] = eb),
          (eB[72] = ey),
          (eB[73] = ev))
        : (ev = eB[73]),
      eB[74] !== e5 || eB[75] !== e8
        ? ((ew =
            e5 && e8.errorMessage
              ? (0, t.jsx)("p", {
                  role: "alert",
                  "data-testid": "gas-topup-quote-error",
                  className: "text-xs leading-4 text-loss",
                  children: e8.errorMessage,
                })
              : null),
          (eB[74] = e5),
          (eB[75] = e8),
          (eB[76] = ew))
        : (ew = eB[76]),
      eB[77] !== tl ||
      eB[78] !== eo ||
      eB[79] !== em ||
      eB[80] !== ef ||
      eB[81] !== ev ||
      eB[82] !== ew
        ? ((ex = (0, t.jsxs)(tl, {
            className: "flex flex-col gap-3",
            children: [eo, em, ef, eh, ev, ew],
          })),
          (eB[77] = tl),
          (eB[78] = eo),
          (eB[79] = em),
          (eB[80] = ef),
          (eB[81] = ev),
          (eB[82] = ew),
          (eB[83] = ex))
        : (ex = eB[83]),
      eB[84] !== eE
        ? ((ez = eE("common.cancel")), (eB[84] = eE), (eB[85] = ez))
        : (ez = eB[85]),
      eB[86] !== eT || eB[87] !== eU || eB[88] !== ez
        ? ((eA = (0, t.jsx)(i.K, {
            variant: "secondary",
            size: l.Z,
            "data-testid": "gas-topup-cancel",
            onClick: eU,
            isDisabled: eT,
            children: ez,
          })),
          (eB[86] = eT),
          (eB[87] = eU),
          (eB[88] = ez),
          (eB[89] = eA))
        : (eA = eB[89]),
      eB[90] !== ts
        ? ((eS = () => void ts()), (eB[90] = ts), (eB[91] = eS))
        : (eS = eB[91]));
    let tm = !e9;
    return (
      eB[92] !== eN.nativeSymbol || eB[93] !== eE
        ? ((ek = eE("profile.spending_power.convert_to", {
            symbol: eN.nativeSymbol,
          })),
          (eB[92] = eN.nativeSymbol),
          (eB[93] = eE),
          (eB[94] = ek))
        : (ek = eB[94]),
      eB[95] !== eT || eB[96] !== eS || eB[97] !== tm || eB[98] !== ek
        ? ((eI = (0, t.jsx)(i.K, {
            variant: "primary",
            size: l.$,
            "data-testid": "gas-topup-submit",
            onClick: eS,
            isDisabled: tm,
            isLoading: eT,
            children: ek,
          })),
          (eB[95] = eT),
          (eB[96] = eS),
          (eB[97] = tm),
          (eB[98] = ek),
          (eB[99] = eI))
        : (eI = eB[99]),
      eB[100] !== eA || eB[101] !== eI
        ? ((eq = (0, t.jsxs)(l.c, { children: [eA, eI] })),
          (eB[100] = eA),
          (eB[101] = eI),
          (eB[102] = eq))
        : (eq = eB[102]),
      eB[103] !== ex || eB[104] !== eq
        ? ((e$ = (0, t.jsxs)(t.Fragment, { children: [ex, eq] })),
          (eB[103] = ex),
          (eB[104] = eq),
          (eB[105] = e$))
        : (e$ = eB[105]),
      e$
    );
  }
  e.s(
    [
      "EvmGasTopupDialog",
      0,
      function (e) {
        let i,
          a,
          o,
          u,
          d = (0, n.c)(18),
          { open: c, onOpenChange: m, request: g, onToppedUp: p } = e,
          { t: f } = (0, s.f)(),
          h = (0, r.useRef)(null),
          [_, b] = (0, r.useState)(!1);
        return (
          !c && _ && b(!1),
          d[0] !== _ || d[1] !== m
            ? ((i = (e) => {
                (e || !_) && m(e);
              }),
              (d[0] = _),
              (d[1] = m),
              (d[2] = i))
            : (i = d[2]),
          d[3] !== g.nativeSymbol || d[4] !== f
            ? ((a = f("profile.wallet_send.gas_topup.title", {
                symbol: g.nativeSymbol,
              })),
              (d[3] = g.nativeSymbol),
              (d[4] = f),
              (d[5] = a))
            : (a = d[5]),
          d[6] !== _ || d[7] !== m || d[8] !== p || d[9] !== c || d[10] !== g
            ? ((o = c
                ? (0, t.jsx)(ee, {
                    request: g,
                    amountRef: h,
                    isSubmitting: _,
                    onSubmittingChange: b,
                    onCancel: () => m(!1),
                    onToppedUp: (e) => {
                      (p(e), m(!1));
                    },
                  })
                : null),
              (d[6] = _),
              (d[7] = m),
              (d[8] = p),
              (d[9] = c),
              (d[10] = g),
              (d[11] = o))
            : (o = d[11]),
          d[12] !== _ ||
          d[13] !== c ||
          d[14] !== i ||
          d[15] !== a ||
          d[16] !== o
            ? ((u = (0, t.jsx)(l.N, {
                open: c,
                onOpenChange: i,
                density: J,
                size: "sm",
                title: a,
                hideClose: _,
                initialFocus: h,
                "data-testid": "evm-gas-topup-dialog",
                children: o,
              })),
              (d[12] = _),
              (d[13] = c),
              (d[14] = i),
              (d[15] = a),
              (d[16] = o),
              (d[17] = u))
            : (u = d[17]),
          u
        );
      },
    ],
    202195,
  );
};
