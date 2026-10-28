// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    i = e.i(445242);
  e.i(353110);
  var o = e.i(648470),
    n = e.i(745018),
    u = e.i(574472),
    r = e.i(928529),
    a = e.i(599077),
    s = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    c = e.i(887009),
    d = e.i(328242),
    m = e.i(988801),
    f = e.i(996567),
    p = e.i(790431),
    b = e.i(595673),
    g = e.i(338319),
    v = e.i(198825),
    y = e.i(51954),
    h = e.i(538459),
    _ = e.i(367310),
    S = e.i(102250),
    q = e.i(187611),
    x = e.i(655397),
    w = e.i(449597),
    A = e.i(709481);
  let L = (0, x.p)().toBase58();
  function k(e) {
    (e.preventDefault(),
      e.stopPropagation(),
      e.nativeEvent.stopImmediatePropagation());
  }
  let M =
      "flex h-7 min-w-16 items-center justify-center gap-1 rounded-lg border border-gain/40 px-2 text-xs font-semibold leading-4 tabular-nums text-gain transition-colors hover:bg-gain hover:text-bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent disabled:cursor-not-allowed disabled:opacity-70",
    B = {
      solid:
        "flex items-center justify-center gap-1.5 rounded-full bg-bg-accent px-4 py-2 text-sm font-semibold text-bg-primary shadow-lg shadow-black/30 transition-[transform,filter] hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
      feed: "flex h-8 items-center justify-center gap-2 rounded-lg border border-border-tertiary bg-white/[0.05] px-3 text-xs font-medium leading-4 text-[#86EFAC] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-70",
      row: M,
      rail: M,
    },
    E = (e) => {
      let t,
        o = (0, i.c)(4),
        { variant: n, coinName: u, amountLabel: r, isStateLabel: a } = e,
        { t: s } = (0, l.f)();
      if ("solid" !== n && "feed" !== n && !a)
        return (
          o[0] !== r || o[1] !== u || o[2] !== s
            ? ((t = s("web.home.row_quick_buy_aria", {
                amount: (0, q.T)(r, "number-format"),
                coin_name: (0, q.T)(u, "coin-name"),
              })),
              (o[0] = r),
              (o[1] = u),
              (o[2] = s),
              (o[3] = t))
            : (t = o[3]),
          t
        );
    };
  function N(e) {
    let o,
      u,
      a,
      l,
      c,
      d,
      m,
      f,
      p = (0, i.c)(23),
      {
        label: b,
        disabled: v,
        onClick: y,
        onEngage: h,
        className: _,
        iconSrc: S,
        variant: q,
        ariaLabel: x,
        focusOnMount: w,
      } = e,
      A = void 0 === q ? "solid" : q,
      L = void 0 !== w && w,
      k = (0, s.useRef)(null);
    (p[0] !== L
      ? ((o = () => {
          if (!L) return;
          let e = document.activeElement;
          (null === e || e === document.body) && k.current?.focus();
        }),
        (u = [L]),
        (p[0] = L),
        (p[1] = o),
        (p[2] = u))
      : ((o = p[1]), (u = p[2])),
      (0, s.useLayoutEffect)(o, u),
      p[3] !== h
        ? ((a = () => h?.("pointer")),
          (l = () => h?.("focus")),
          (p[3] = h),
          (p[4] = a),
          (p[5] = l))
        : ((a = p[4]), (l = p[5])));
    let M = B[A];
    return (
      (p[6] !== _ || p[7] !== M
        ? ((c = (0, g.c)(M, _)), (p[6] = _), (p[7] = M), (p[8] = c))
        : (c = p[8]),
      p[9] !== S || p[10] !== A)
        ? ((d =
            "solid" !== A
              ? (0, t.jsx)(n.$U, {
                  "aria-hidden": !0,
                  className:
                    "feed" === A ? "size-4 shrink-0" : "size-3 shrink-0",
                })
              : S &&
                (0, t.jsx)(r.default, {
                  src: S,
                  alt: "",
                  width: 16,
                  height: 16,
                  "aria-hidden": !0,
                  className: "size-4 shrink-0 rounded-full",
                })),
          (p[9] = S),
          (p[10] = A),
          (p[11] = d))
        : (d = p[11]),
      p[12] !== b
        ? ((m = (0, t.jsx)("span", {
            className: "whitespace-nowrap",
            children: b,
          })),
          (p[12] = b),
          (p[13] = m))
        : (m = p[13]),
      p[14] !== x ||
      p[15] !== v ||
      p[16] !== y ||
      p[17] !== m ||
      p[18] !== a ||
      p[19] !== l ||
      p[20] !== c ||
      p[21] !== d
        ? ((f = (0, t.jsxs)("button", {
            ref: k,
            type: "button",
            "aria-label": x,
            onClick: y,
            onPointerEnter: a,
            onFocus: l,
            disabled: v,
            className: c,
            children: [d, m],
          })),
          (p[14] = x),
          (p[15] = v),
          (p[16] = y),
          (p[17] = m),
          (p[18] = a),
          (p[19] = l),
          (p[20] = c),
          (p[21] = d),
          (p[22] = f))
        : (f = p[22]),
      f
    );
  }
  function O(e, t, o) {
    let n,
      r,
      s,
      l,
      c,
      d,
      m,
      f = (0, i.c)(39),
      b = void 0 !== t && t,
      g = o ?? e.quote_mint,
      q = (0, h.r)(),
      x = (0, h.E)(),
      { address: k } = (0, u.F)(),
      { setShowDeposit: M } = (0, v.useConnectWallet)(),
      B = (0, a.useRouter)(),
      E = (0, y.f)(U),
      N = (0, y.f)(R),
      O = (0, _.k)(),
      P = (0, S.o)(),
      F = !1 !== e.initialized;
    if (
      f[0] !== e.mint ||
      f[1] !== e.program ||
      f[2] !== e.raydium_pool ||
      f[3] !== F ||
      f[4] !== b ||
      f[5] !== O ||
      f[6] !== g ||
      f[7] !== P
    ) {
      let t,
        i = (0, w.Y)(g);
      (f[9] !== e.program || f[10] !== e.raydium_pool
        ? ((t = (0, p.d)({ program: e.program, raydium_pool: e.raydium_pool })),
          (f[9] = e.program),
          (f[10] = e.raydium_pool),
          (f[11] = t))
        : (t = f[11]),
        (n = (0, p.r)({
          prefersUsdc: O,
          isUsdcQuote: i,
          isPumpVenue: "pump" === t,
          isEstablished: F,
          isMigration: b,
          paymentRoutingDisabled: !1,
          walletFailsSponsoredSigning: P,
          selfAsset: (0, p.T)(e.mint),
        })),
        (f[0] = e.mint),
        (f[1] = e.program),
        (f[2] = e.raydium_pool),
        (f[3] = F),
        (f[4] = b),
        (f[5] = O),
        (f[6] = g),
        (f[7] = P),
        (f[8] = n));
    } else n = f[8];
    let Q = n,
      j = F && !b ? Q : null;
    f[12] !== j || f[13] !== g || f[14] !== q || f[15] !== x
      ? ((r = (0, A.o)({
          quoteMintAddress: g,
          solAmount: q,
          usdcAmount: x,
          paymentOverride: j,
        })),
        (f[12] = j),
        (f[13] = g),
        (f[14] = q),
        (f[15] = x),
        (f[16] = r))
      : (r = f[16]);
    let C = r;
    f[17] !== C.quoteAmount
      ? ((s = Number.isFinite(C.quoteAmount) && C.quoteAmount > 0),
        (f[17] = C.quoteAmount),
        (f[18] = s))
      : (s = f[18]);
    let T = s;
    f[19] !== k ||
    f[20] !== C.isUsdcQuote ||
    f[21] !== C.quoteDecimals ||
    f[22] !== E ||
    f[23] !== N
      ? ((l = (e) =>
          !!k &&
          Number.isFinite(e) &&
          e > 0 &&
          (0, A.Q)({
            isUsdcQuote: C.isUsdcQuote,
            quoteAmount: e,
            quoteDecimals: C.quoteDecimals,
            solBalanceLamports: E,
            usdcBalanceRaw: N,
          })),
        (f[19] = k),
        (f[20] = C.isUsdcQuote),
        (f[21] = C.quoteDecimals),
        (f[22] = E),
        (f[23] = N),
        (f[24] = l))
      : (l = f[24]);
    let D = l;
    f[25] !== C.quoteAmount || f[26] !== D || f[27] !== T
      ? ((c = T && D(C.quoteAmount)),
        (f[25] = C.quoteAmount),
        (f[26] = D),
        (f[27] = T),
        (f[28] = c))
      : (c = f[28]);
    let $ = c;
    f[29] !== C.isUsdcQuote || f[30] !== B || f[31] !== M
      ? ((d = () => {
          C.isUsdcQuote ? B.push(`/coin/${L}`) : M(!0);
        }),
        (f[29] = C.isUsdcQuote),
        (f[30] = B),
        (f[31] = M),
        (f[32] = d))
      : (d = f[32]);
    let z = d;
    return (
      f[33] !== z || f[34] !== C || f[35] !== $ || f[36] !== D || f[37] !== T
        ? ((m = {
            ...C,
            isValidAmount: T,
            insufficient: $,
            isInsufficientFor: D,
            addFunds: z,
          }),
          (f[33] = z),
          (f[34] = C),
          (f[35] = $),
          (f[36] = D),
          (f[37] = T),
          (f[38] = m))
        : (m = f[38]),
      m
    );
  }
  function R(e) {
    return e.tokenBalanceByMint[L]?.balanceRaw ?? null;
  }
  function U(e) {
    return e.user?.solBalanceLoaded ? (e.user.solBalance ?? 0) : null;
  }
  function P(e) {
    let n,
      r,
      a,
      l,
      p,
      b,
      g,
      v,
      y,
      h,
      _,
      S,
      q,
      w = (0, i.c)(71),
      {
        coin: L,
        autoFire: M,
        onAutoFired: B,
        onBuyAttempt: R,
        onActiveChange: U,
        className: P,
        variant: j,
        focusOnMount: C,
        sourceScreen: T,
        sourceElement: D,
        absolutePosition: $,
        recommendationId: z,
      } = e,
      I = void 0 === j ? "solid" : j,
      K = void 0 !== C && C,
      [G, H] = (0, s.useState)(!0),
      {
        slippage: V,
        priorityFee: W,
        tipAmount: X,
        frontRunningProtection: Y,
        holdToConfirm: J,
      } = (0, f.f)(),
      { bondingCurve: Z, pool: ee } = (0, d.G)(
        L.mint,
        L.token_program,
        L.quote_mint,
        L.pool_address,
      ),
      et = !!Z?.complete && !ee && !(L.raydium_pool && !L.pump_swap_pool);
    w[0] !== Z || w[1] !== L.quote_mint
      ? ((n = Z?.quoteMint ? (0, x.k)(Z.quoteMint).toBase58() : L.quote_mint),
        (w[0] = Z),
        (w[1] = L.quote_mint),
        (w[2] = n))
      : (n = w[2]);
    let ei = n;
    (w[3] !== Y || w[4] !== J || w[5] !== W || w[6] !== V || w[7] !== X
      ? ((r = {
          slippage: V,
          priorityFee: W,
          tipAmount: X,
          frontRunningProtection: Y,
          holdToConfirm: J,
        }),
        (w[3] = Y),
        (w[4] = J),
        (w[5] = W),
        (w[6] = V),
        (w[7] = X),
        (w[8] = r))
      : (r = w[8]),
      w[9] !== et || w[10] !== ei || w[11] !== r
        ? ((a = {
            showOpenCoinToast: !0,
            isMigrationTrade: et,
            resolvedQuoteMint: ei,
            tradeSettings: r,
          }),
          (w[9] = et),
          (w[10] = ei),
          (w[11] = r),
          (w[12] = a))
        : (a = w[12]));
    let {
        handlePlaceTradeWithInputs: eo,
        enqueueQuickTrade: en,
        isTradeLoading: eu,
        isPaymentRouted: er,
      } = (0, m.f)(L, G, H, a),
      ea = er || !!(Z || ee),
      { address: es, wallet: el } = (0, u.F)(),
      { autoApprove: ec } = (0, c.f)(),
      ed = !!es && !!el && ec,
      {
        isSupported: em,
        quoteAmount: ef,
        isUsdcQuote: ep,
        isValidAmount: eb,
        insufficient: eg,
        isInsufficientFor: ev,
        addFunds: ey,
        buyLabel: eh,
        compactBuyLabel: e_,
        addFundsLabel: eS,
        iconSrc: eq,
      } = O(L, et, ei),
      [ex, ew] = (0, s.useState)(M && eb && !eg),
      eA = (0, s.useRef)(!1),
      eL = (0, s.useRef)(!1);
    w[13] !== M || w[14] !== eg || w[15] !== eb || w[16] !== ef || w[17] !== ep
      ? ((l = M && eb && !eg ? { amount: ef, spendsUsdc: ep } : null),
        (w[13] = M),
        (w[14] = eg),
        (w[15] = eb),
        (w[16] = ef),
        (w[17] = ep),
        (w[18] = l))
      : (l = w[18]);
    let ek = (0, s.useRef)(l);
    w[19] !== ef || w[20] !== ep
      ? ((p = () => {
          let e = ek.current;
          return e && e.spendsUsdc === ep ? e.amount : ef;
        }),
        (w[19] = ef),
        (w[20] = ep),
        (w[21] = p))
      : (p = w[21]);
    let eM = p,
      [eB, eE] = (0, s.useState)(0);
    w[22] !== $ ||
    w[23] !== ey ||
    w[24] !== en ||
    w[25] !== eo ||
    w[26] !== ev ||
    w[27] !== z ||
    w[28] !== eM ||
    w[29] !== D ||
    w[30] !== T ||
    w[31] !== ed ||
    w[32] !== I
      ? ((b = () => {
          if (eA.current) return;
          ((eA.current = !0),
            queueMicrotask(() => {
              eA.current = !1;
            }),
            ew(!1));
          let e = eM();
          if (ev(e)) {
            ("row" === I || "rail" === I) && ey();
            return;
          }
          let t = new o.BN((0, A.d)(e));
          eE(Q);
          let i = {
            sourceScreen: T,
            sourceElement: D,
            absolutePosition: $,
            recommendationId: z,
          };
          return Promise.resolve(
            ed ? en(t, !0, !0, i) : eo(t, !0, !0, i),
          ).finally(() => eE(F));
        }),
        (w[22] = $),
        (w[23] = ey),
        (w[24] = en),
        (w[25] = eo),
        (w[26] = ev),
        (w[27] = z),
        (w[28] = eM),
        (w[29] = D),
        (w[30] = T),
        (w[31] = ed),
        (w[32] = I),
        (w[33] = b))
      : (b = w[33]);
    let eN = b;
    (w[34] !== eu ||
    w[35] !== ea ||
    w[36] !== em ||
    w[37] !== eb ||
    w[38] !== B ||
    w[39] !== ex ||
    w[40] !== eN
      ? ((v = () => {
          if (eL.current || !ex || eu) return;
          let e = !em;
          (e || (ea && eb)) &&
            ((eL.current = !0),
            B(),
            queueMicrotask(() => {
              e ? ew(!1) : eN();
            }));
        }),
        (g = [ex, ea, eb, eu, em, eN, B]),
        (w[34] = eu),
        (w[35] = ea),
        (w[36] = em),
        (w[37] = eb),
        (w[38] = B),
        (w[39] = ex),
        (w[40] = eN),
        (w[41] = g),
        (w[42] = v))
      : ((g = w[41]), (v = w[42])),
      (0, s.useEffect)(v, g));
    let eO = eu || ex || eB > 0;
    (w[43] !== eO || w[44] !== U
      ? ((y = () => (U(eO), () => U(!1))),
        (h = [eO, U]),
        (w[43] = eO),
        (w[44] = U),
        (w[45] = y),
        (w[46] = h))
      : ((y = w[45]), (h = w[46])),
      (0, s.useEffect)(y, h),
      w[47] !== ey ||
      w[48] !== eg ||
      w[49] !== eu ||
      w[50] !== ea ||
      w[51] !== eb ||
      w[52] !== R ||
      w[53] !== eN ||
      w[54] !== ef ||
      w[55] !== ep
        ? ((_ = (e) => {
            if ((k(e), eb && !eu && !eA.current)) {
              if (eg) return void ey();
              if ((R(), (ek.current = { amount: ef, spendsUsdc: ep }), ea))
                return void eN();
              ew(!0);
            }
          }),
          (w[47] = ey),
          (w[48] = eg),
          (w[49] = eu),
          (w[50] = ea),
          (w[51] = eb),
          (w[52] = R),
          (w[53] = eN),
          (w[54] = ef),
          (w[55] = ep),
          (w[56] = _))
        : (_ = w[56]));
    let eR = _,
      eU = "solid" !== I,
      eP = eu || eg || (ex && !ea),
      eF = eu
        ? "Buying…"
        : eg
          ? eS
          : ex && !ea
            ? eU
              ? "…"
              : "Preparing…"
            : eU
              ? e_
              : eh,
      eQ = L.name ?? L.mint,
      ej = ep ? e_ : `${e_} SOL`;
    w[57] !== eP || w[58] !== eQ || w[59] !== ej || w[60] !== I
      ? ((S = { variant: I, coinName: eQ, amountLabel: ej, isStateLabel: eP }),
        (w[57] = eP),
        (w[58] = eQ),
        (w[59] = ej),
        (w[60] = I),
        (w[61] = S))
      : (S = w[61]);
    let eC = E(S);
    if (!em) return null;
    let eT = !eb || eu;
    return (
      w[62] !== eC ||
      w[63] !== P ||
      w[64] !== K ||
      w[65] !== eR ||
      w[66] !== eq ||
      w[67] !== eF ||
      w[68] !== eT ||
      w[69] !== I
        ? ((q = (0, t.jsx)(N, {
            label: eF,
            ariaLabel: eC,
            focusOnMount: K,
            iconSrc: eq,
            variant: I,
            disabled: eT,
            onClick: eR,
            className: P,
          })),
          (w[62] = eC),
          (w[63] = P),
          (w[64] = K),
          (w[65] = eR),
          (w[66] = eq),
          (w[67] = eF),
          (w[68] = eT),
          (w[69] = I),
          (w[70] = q))
        : (q = w[70]),
      q
    );
  }
  function F(e) {
    return Math.max(0, e - 1);
  }
  function Q(e) {
    return e + 1;
  }
  function j(e) {
    return "idle" === e ? "warm" : e;
  }
  e.s([
    "default",
    0,
    function (e) {
      let o,
        n,
        u,
        r,
        a,
        l,
        c,
        d,
        m,
        f,
        p = (0, i.c)(54),
        {
          coin: g,
          className: v,
          variant: y,
          focusOnMount: h,
          onActiveChange: _,
          triggerOnMount: S,
          onTriggerConsumed: q,
          sourceScreen: x,
          sourceElement: w,
          absolutePosition: A,
          recommendationId: L,
        } = e,
        M = void 0 === y ? "solid" : y,
        B = void 0 !== h && h,
        R = void 0 !== S && S,
        {
          isSupported: U,
          insufficient: F,
          isUsdcQuote: Q,
          addFunds: C,
          buyLabel: T,
          compactBuyLabel: D,
          addFundsLabel: $,
          iconSrc: z,
        } = O(g);
      p[0] !== F || p[1] !== U || p[2] !== R
        ? ((o = () => (R && U && !F ? "fire" : "idle")),
          (p[0] = F),
          (p[1] = U),
          (p[2] = R),
          (p[3] = o))
        : (o = p[3]);
      let [I, K] = (0, s.useState)(o),
        [G, H] = (0, s.useState)(!1),
        V = (0, s.useRef)(!1),
        W = "solid" !== M,
        X = g.name ?? g.mint,
        Y = Q ? D : `${D} SOL`;
      p[4] !== F || p[5] !== X || p[6] !== Y || p[7] !== M
        ? ((n = { variant: M, coinName: X, amountLabel: Y, isStateLabel: F }),
          (p[4] = F),
          (p[5] = X),
          (p[6] = Y),
          (p[7] = M),
          (p[8] = n))
        : (n = p[8]);
      let J = E(n);
      p[9] !== g.mint ||
      p[10] !== g.program ||
      p[11] !== g.usd_market_cap ||
      p[12] !== w ||
      p[13] !== x
        ? ((u = () => {
            V.current ||
              ((V.current = !0),
              (0, b.Ie)({
                mint: g.mint,
                usdMarketCap: g.usd_market_cap ?? void 0,
                program: g.program,
                sourceScreen: x,
                sourceElement: w,
              }));
          }),
          (p[9] = g.mint),
          (p[10] = g.program),
          (p[11] = g.usd_market_cap),
          (p[12] = w),
          (p[13] = x),
          (p[14] = u))
        : (u = p[14]);
      let Z = u;
      p[15] !== _
        ? ((r = (e) => _?.(e)), (p[15] = _), (p[16] = r))
        : (r = p[16]);
      let ee = r;
      p[17] !== C || p[18] !== F || p[19] !== U || p[20] !== q || p[21] !== Z
        ? ((a = () => {
            if ((q?.(), U)) {
              if (F) return void C();
              Z();
            }
          }),
          (p[17] = C),
          (p[18] = F),
          (p[19] = U),
          (p[20] = q),
          (p[21] = Z),
          (p[22] = a))
        : (a = p[22]);
      let et = (0, s.useEffectEvent)(a),
        ei = (0, s.useRef)(!1);
      if (
        (p[23] !== et || p[24] !== R
          ? ((l = () => {
              R && !ei.current && ((ei.current = !0), et());
            }),
            (p[23] = et),
            (p[24] = R),
            (p[25] = l))
          : (l = p[25]),
        p[26] !== R ? ((c = [R]), (p[26] = R), (p[27] = c)) : (c = p[27]),
        (0, s.useEffect)(l, c),
        !U)
      )
        return null;
      if ("idle" !== I) {
        let e,
          i,
          o = "fire" === I;
        p[28] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () => K("warm")), (p[28] = e))
          : (e = p[28]);
        let n = B || G;
        return (
          p[29] !== A ||
          p[30] !== v ||
          p[31] !== g ||
          p[32] !== ee ||
          p[33] !== L ||
          p[34] !== w ||
          p[35] !== x ||
          p[36] !== o ||
          p[37] !== n ||
          p[38] !== Z ||
          p[39] !== M
            ? ((i = (0, t.jsx)(P, {
                coin: g,
                autoFire: o,
                onAutoFired: e,
                onBuyAttempt: Z,
                onActiveChange: ee,
                className: v,
                variant: M,
                focusOnMount: n,
                sourceScreen: x,
                sourceElement: w,
                absolutePosition: A,
                recommendationId: L,
              })),
              (p[29] = A),
              (p[30] = v),
              (p[31] = g),
              (p[32] = ee),
              (p[33] = L),
              (p[34] = w),
              (p[35] = x),
              (p[36] = o),
              (p[37] = n),
              (p[38] = Z),
              (p[39] = M),
              (p[40] = i))
            : (i = p[40]),
          i
        );
      }
      let eo = F ? $ : W ? D : T;
      return (
        p[41] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (e) => {
              ("focus" === e && H(!0), K(j));
            }),
            (p[41] = d))
          : (d = p[41]),
        p[42] !== C || p[43] !== F || p[44] !== Z
          ? ((m = (e) => {
              (k(e), F) ? C() : (Z(), K("fire"));
            }),
            (p[42] = C),
            (p[43] = F),
            (p[44] = Z),
            (p[45] = m))
          : (m = p[45]),
        p[46] !== v ||
        p[47] !== B ||
        p[48] !== z ||
        p[49] !== J ||
        p[50] !== eo ||
        p[51] !== m ||
        p[52] !== M
          ? ((f = (0, t.jsx)(N, {
              label: eo,
              ariaLabel: J,
              focusOnMount: B,
              iconSrc: z,
              variant: M,
              onEngage: d,
              onClick: m,
              className: v,
            })),
            (p[46] = v),
            (p[47] = B),
            (p[48] = z),
            (p[49] = J),
            (p[50] = eo),
            (p[51] = m),
            (p[52] = M),
            (p[53] = f))
          : (f = p[53]),
        f
      );
    },
    "suppressCardNavigation",
    0,
    k,
  ]);
};
