// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(574472),
    i = e.i(606933),
    l = e.i(352386),
    a = e.i(38279),
    s = e.i(289515),
    o = e.i(674121),
    u = e.i(119452);
  async function c(t) {
    let { startTokenAccountPoll: n } = await e.A(632242);
    return n(t);
  }
  let d = (0, l.createContext)(void 0);
  function m(e) {
    console.error("Failed to start token account poll:", e);
  }
  e.s([
    "Q",
    0,
    (e) => {
      let f,
        g,
        p,
        h,
        y,
        b,
        x,
        v,
        w,
        _,
        k,
        P = (0, n.c)(27),
        { children: z } = e,
        [C, A] = (0, l.useState)(!1),
        [L, $] = (0, l.useState)(!1),
        { address: S } = (0, r.F)(),
        U = (0, i.useQueryClient)();
      P[0] !== S
        ? ((f = { address: S, limit: 50, offset: 0, showDustCoin: !0 }),
          (P[0] = S),
          (P[1] = f))
        : (f = P[1]);
      let { balances: j, fetchBalances: q } = (0, s.W)(f);
      P[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((g = new Map()), (P[2] = g))
        : (g = P[2]);
      let N = (0, l.useRef)(g),
        B = (0, l.useRef)(0);
      P[3] !== j
        ? ((p = () => {
            (!j || j.length <= 1) && $(!0);
          }),
          (P[3] = j),
          (P[4] = p))
        : (p = P[4]);
      let E = p;
      (P[5] !== C
        ? ((h = () => {
            if (!C) return;
            let e = () => {
                (A(!1), $(!1));
              },
              t = setTimeout(() => {
                document.addEventListener("click", e);
              }, 2e3);
            return () => {
              (clearTimeout(t), document.removeEventListener("click", e));
            };
          }),
          (y = [C]),
          (P[5] = C),
          (P[6] = h),
          (P[7] = y))
        : ((h = P[6]), (y = P[7])),
        (0, l.useEffect)(h, y),
        P[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = () => {
              let e = N.current;
              return () => {
                for (let t of ((B.current = B.current + 1), e.values()))
                  clearInterval(t);
                e.clear();
              };
            }),
            (P[8] = b))
          : (b = P[8]),
        P[9] !== S ? ((x = [S]), (P[9] = S), (P[10] = x)) : (x = P[10]),
        (0, l.useEffect)(b, x),
        P[11] !== S || P[12] !== q || P[13] !== U
          ? ((v = async (e) => {
              (await q(),
                S &&
                  (e && (0, o.r)(U, S, e),
                  (0, o.g)(U, S),
                  (0, u.K)(U, S),
                  await Promise.all([
                    U.invalidateQueries({ queryKey: ["walletBalances", S] }),
                    U.invalidateQueries({ queryKey: a.Q.BALANCE_SUMMARY(S) }),
                  ])));
            }),
            (P[11] = S),
            (P[12] = q),
            (P[13] = U),
            (P[14] = v))
          : (v = P[14]));
      let M = v;
      P[15] !== S || P[16] !== M
        ? ((w = (e) => {
            if (!S) return;
            let t = B.current;
            c({
              tokenMint: e,
              address: S,
              pollingInterval: 1e3,
              maxAttempts: 10,
              activePolls: N.current,
              isPollValid: () => B.current === t,
              refreshBalances: () => M(e),
            }).catch(m);
          }),
          (P[15] = S),
          (P[16] = M),
          (P[17] = w))
        : (w = P[17]);
      let T = w;
      P[18] !== j || P[19] !== E || P[20] !== T || P[21] !== L || P[22] !== C
        ? ((_ = {
            recentlyTraded: C,
            setRecentlyTraded: A,
            isFirstTrade: L,
            setIsFirstTrade: $,
            handleFirstTrade: E,
            handleRecentTrade: T,
            balances: j,
          }),
          (P[18] = j),
          (P[19] = E),
          (P[20] = T),
          (P[21] = L),
          (P[22] = C),
          (P[23] = _))
        : (_ = P[23]);
      let F = _;
      return (
        P[24] !== z || P[25] !== F
          ? ((k = (0, t.jsx)(d.Provider, { value: F, children: z })),
            (P[24] = z),
            (P[25] = F),
            (P[26] = k))
          : (k = P[26]),
        k
      );
    },
    "L",
    0,
    () => {
      let e = (0, l.useContext)(d);
      if (void 0 === e)
        throw Error("useRecentTrade must be used within a RecentTradeProvider");
      return e;
    },
  ]);
};
