// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    a = e.i(732392),
    i = e.i(462024),
    o = e.i(994598),
    l = e.i(47831),
    u = e.i(618112),
    s = e.i(907704),
    c = e.i(665010);
  let d = "PUMP",
    f = new Set([i.i.SOL.mint, i.i.PUMP.mint]);
  function m(e) {
    return !f.has(e.mint) && !(0, i.j)(e.mint);
  }
  let p = "$PUMP";
  function h(e) {
    return {
      value: e.mint,
      label: (0, t.jsx)(b, {
        balance: e.balance,
        label: `${e.symbol} \xb7 ${e.name}`,
      }),
      searchKey: { mint: e.mint, symbol: e.symbol, name: e.name },
    };
  }
  function b(e) {
    let n,
      a,
      i,
      o = (0, r.c)(7),
      { label: l, balance: u } = e;
    return (
      o[0] !== l
        ? ((n = (0, t.jsx)("span", { className: "truncate", children: l })),
          (o[0] = l),
          (o[1] = n))
        : (n = o[1]),
      o[2] !== u
        ? ((a =
            null != u &&
            u > 0 &&
            (0, t.jsxs)("span", {
              className: "shrink-0 text-xs text-text-secondary",
              children: [v(u), " available"],
            })),
          (o[2] = u),
          (o[3] = a))
        : (a = o[3]),
      o[4] !== n || o[5] !== a
        ? ((i = (0, t.jsxs)("span", {
            className: "flex w-full items-center justify-between gap-3",
            children: [n, a],
          })),
          (o[4] = n),
          (o[5] = a),
          (o[6] = i))
        : (i = o[6]),
      i
    );
  }
  function v(e) {
    let t = (e) => (Math.floor(100 * e) / 100).toFixed(2);
    return e >= 1e9
      ? `${t(e / 1e9)}B`
      : e >= 1e6
        ? `${t(e / 1e6)}M`
        : e >= 1e3
          ? `${t(e / 1e3)}k`
          : t(e);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let f,
          g,
          y,
          x,
          w,
          S,
          N,
          P,
          M,
          j,
          A = (0, r.c)(83),
          { t: k } = (0, n.f)(),
          {
            value: _,
            onValueChange: O,
            placeholder: C,
            customWalletCoins: E,
            solBalance: V,
            pumpBalance: L,
            heldBalance: U,
            selectedBalance: D,
            totalAssigned: I,
            selectedSymbol: T,
          } = (function (e) {
            let t,
              a,
              i,
              l,
              u,
              f,
              p,
              h,
              b,
              v,
              g,
              y = (0, r.c)(38),
              { t: x } = (0, n.f)(),
              { pool: w, allPools: S, onChange: N } = e,
              { walletCoinOptions: P, isLoadingWalletBalances: M } = (0, c.f)(),
              { getForPool: j, getAvailableForPool: A } = (0, s.f)();
            y[0] !== P
              ? ((t = P.filter(m)), (y[0] = P), (y[1] = t))
              : (t = y[1]);
            let k = t;
            y[2] !== j
              ? ((a = j({
                  id: "_sol",
                  kind: "SOL",
                  humanAmount: "",
                  customMint: "",
                })),
                (y[2] = j),
                (y[3] = a))
              : (a = y[3]);
            let _ = a;
            y[4] !== j
              ? ((i = j({
                  id: "_pump",
                  kind: "PUMP",
                  humanAmount: "",
                  customMint: "",
                })),
                (y[4] = j),
                (y[5] = i))
              : (i = y[5]);
            let O = i;
            y[6] !== S || y[7] !== A || y[8] !== w
              ? ((l = A(w, S)), (y[6] = S), (y[7] = A), (y[8] = w), (y[9] = l))
              : (l = y[9]);
            let C = l;
            y[10] !== j || y[11] !== w
              ? ((u = j(w)), (y[10] = j), (y[11] = w), (y[12] = u))
              : (u = y[12]);
            let E = u;
            y[13] !== w
              ? ((f = (0, o.r)(w)), (y[13] = w), (y[14] = f))
              : (f = y[14]);
            let V = f;
            e: {
              let e;
              if (!V) {
                p = 0;
                break e;
              }
              (y[15] !== S || y[16] !== V
                ? ((e = (0, o.$)(V, S)), (y[15] = S), (y[16] = V), (y[17] = e))
                : (e = y[17]),
                (p = e));
            }
            let L = p;
            y[18] !== w.customMint || y[19] !== w.kind || y[20] !== P
              ? ((h =
                  "SOL" === w.kind
                    ? "SOL"
                    : "PUMP" === w.kind
                      ? "$PUMP"
                      : P.find((e) => e.mint === w.customMint)?.symbol),
                (y[18] = w.customMint),
                (y[19] = w.kind),
                (y[20] = P),
                (y[21] = h))
              : (h = y[21]);
            let U = h,
              D =
                "SOL" === w.kind ? "SOL" : "PUMP" === w.kind ? d : w.customMint;
            y[22] !== N
              ? ((b = (e) => {
                  "SOL" === e
                    ? N({ kind: "SOL", customMint: "" })
                    : e === d
                      ? N({ kind: "PUMP", customMint: "" })
                      : N({ kind: "CUSTOM", customMint: e });
                }),
                (y[22] = N),
                (y[23] = b))
              : (b = y[23]);
            let I = b;
            y[24] !== M || y[25] !== x
              ? ((v = x(
                  M
                    ? "web.bounties.create_coin_loading_wallet_coins"
                    : "web.bounties.pool_token_select_placeholder",
                )),
                (y[24] = M),
                (y[25] = x),
                (y[26] = v))
              : (v = y[26]);
            let T = v;
            return (
              y[27] !== k ||
              y[28] !== E ||
              y[29] !== I ||
              y[30] !== T ||
              y[31] !== O ||
              y[32] !== C ||
              y[33] !== U ||
              y[34] !== _ ||
              y[35] !== L ||
              y[36] !== D
                ? ((g = {
                    value: D,
                    onValueChange: I,
                    placeholder: T,
                    customWalletCoins: k,
                    solBalance: _,
                    pumpBalance: O,
                    heldBalance: E,
                    selectedBalance: C,
                    totalAssigned: L,
                    selectedSymbol: U,
                  }),
                  (y[27] = k),
                  (y[28] = E),
                  (y[29] = I),
                  (y[30] = T),
                  (y[31] = O),
                  (y[32] = C),
                  (y[33] = U),
                  (y[34] = _),
                  (y[35] = L),
                  (y[36] = D),
                  (y[37] = g))
                : (g = y[37]),
              g
            );
          })(e),
          F = Number(e.pool.humanAmount || 0);
        A[0] !== F || A[1] !== e.isPublished || A[2] !== D
          ? ((f = !e.isPublished && null != D && Number.isFinite(F) && F > D),
            (A[0] = F),
            (A[1] = e.isPublished),
            (A[2] = D),
            (A[3] = f))
          : (f = A[3]);
        let B = f;
        A[4] !== e.allPools
          ? ((g = (0, o.k)(e.allPools)), (A[4] = e.allPools), (A[5] = g))
          : (g = A[5]);
        let $ = g;
        A[6] !== $ || A[7] !== e.isPublished || A[8] !== e.pool.id
          ? ((y = !e.isPublished && $.has(e.pool.id)),
            (A[6] = $),
            (A[7] = e.isPublished),
            (A[8] = e.pool.id),
            (A[9] = y))
          : (y = A[9]);
        let R = y;
        if (
          A[10] !== E ||
          A[11] !== U ||
          A[12] !== R ||
          A[13] !== O ||
          A[14] !== B ||
          A[15] !== C ||
          A[16] !== e.isPublished ||
          A[17] !== e.pool ||
          A[18] !== L ||
          A[19] !== D ||
          A[20] !== T ||
          A[21] !== V ||
          A[22] !== k ||
          A[23] !== I ||
          A[24] !== _
        ) {
          let r,
            n,
            l,
            s,
            c,
            f,
            m,
            g,
            y,
            M,
            j = e.isPublished ? void 0 : (0, i.j)((0, o.r)(e.pool));
          (A[30] !== V
            ? ((r = (0, t.jsx)(b, { balance: V, label: "SOL" })),
              (A[30] = V),
              (A[31] = r))
            : (r = A[31]),
            A[32] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = { mint: i.i.SOL.mint, symbol: "SOL", name: "SOL" }),
                (A[32] = n))
              : (n = A[32]),
            A[33] !== r
              ? ((l = { value: "SOL", label: r, searchKey: n }),
                (A[33] = r),
                (A[34] = l))
              : (l = A[34]),
            A[35] !== L
              ? ((s = (0, t.jsx)(b, { balance: L, label: p })),
                (A[35] = L),
                (A[36] = s))
              : (s = A[36]),
            A[37] === Symbol.for("react.memo_cache_sentinel")
              ? ((c = { mint: i.i.PUMP.mint, symbol: "PUMP", name: "PUMP" }),
                (A[37] = c))
              : (c = A[37]),
            A[38] !== s
              ? ((f = { value: d, label: s, searchKey: c }),
                (A[38] = s),
                (A[39] = f))
              : (f = A[39]),
            A[40] !== E || A[41] !== l || A[42] !== f
              ? ((m = [l, f, ...E.map(h)]),
                (A[40] = E),
                (A[41] = l),
                (A[42] = f),
                (A[43] = m))
              : (m = A[43]));
          let F = m;
          e: {
            let t;
            if ("SOL" === e.pool.kind) {
              g = "SOL";
              break e;
            }
            if ("PUMP" === e.pool.kind) {
              g = p;
              break e;
            }
            if (A[44] !== E || A[45] !== e.pool.customMint) {
              let r;
              (A[47] !== e.pool.customMint
                ? ((r = (t) => t.mint === e.pool.customMint),
                  (A[47] = e.pool.customMint),
                  (A[48] = r))
                : (r = A[48]),
                (t = E.find(r)),
                (A[44] = E),
                (A[45] = e.pool.customMint),
                (A[46] = t));
            } else t = A[46];
            let r = t;
            g = r ? `${r.symbol} \xb7 ${r.name}` : void 0;
          }
          let $ = g;
          (A[49] !== k
            ? ((y = k("web.bounties.token_label")), (A[49] = k), (A[50] = y))
            : (y = A[50]),
            A[51] === Symbol.for("react.memo_cache_sentinel")
              ? ((M = (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className: "text-text-error",
                  children: "*",
                })),
                (A[51] = M))
              : (M = A[51]),
            A[52] !== y
              ? ((x = (0, t.jsxs)(a.f, {
                  className: "mb-2 block text-white",
                  children: [y, " ", M],
                })),
                (A[52] = y),
                (A[53] = x))
              : (x = A[53]),
            A[54] !== F ||
            A[55] !== O ||
            A[56] !== C ||
            A[57] !== $ ||
            A[58] !== _
              ? ((w = (0, t.jsx)(u.f, {
                  items: F,
                  onValueChange: O,
                  triggerClassName: "bg-bg-secondary",
                  triggerLabel: $,
                  triggerPlaceholder: C,
                  value: _,
                })),
                (A[54] = F),
                (A[55] = O),
                (A[56] = C),
                (A[57] = $),
                (A[58] = _),
                (A[59] = w))
              : (w = A[59]),
            A[60] !== U ||
            A[61] !== B ||
            A[62] !== D ||
            A[63] !== T ||
            A[64] !== k ||
            A[65] !== I
              ? ((S =
                  null != D &&
                  (0, t.jsx)("p", {
                    className: B
                      ? "mt-1.5 text-xs text-[#FCA5A5]"
                      : "mt-1.5 text-xs text-text-secondary",
                    children:
                      B && null != U
                        ? k("web.bounties.pool_over_balance", {
                            amount: `${v(I)}${T ? ` ${T}` : ""}`,
                            available: v(U),
                          })
                        : k("web.bounties.pool_available", {
                            amount: `${v(D)}${T ? ` ${T}` : ""}`,
                          }),
                  })),
                (A[60] = U),
                (A[61] = B),
                (A[62] = D),
                (A[63] = T),
                (A[64] = k),
                (A[65] = I),
                (A[66] = S))
              : (S = A[66]),
            A[67] !== R || A[68] !== T || A[69] !== k
              ? ((N =
                  R &&
                  (0, t.jsx)("p", {
                    className: "mt-1.5 text-xs text-[#FCA5A5]",
                    children: T
                      ? k("web.bounties.pool_duplicate_symbol", { symbol: T })
                      : k("web.bounties.pool_duplicate_token"),
                  })),
                (A[67] = R),
                (A[68] = T),
                (A[69] = k),
                (A[70] = N))
              : (N = A[70]),
            (P =
              j &&
              (0, t.jsx)("p", {
                className: "mt-1.5 text-xs text-[#FCA5A5]",
                children: k("web.bounties.symbol_not_supported", { symbol: j }),
              })),
            (A[10] = E),
            (A[11] = U),
            (A[12] = R),
            (A[13] = O),
            (A[14] = B),
            (A[15] = C),
            (A[16] = e.isPublished),
            (A[17] = e.pool),
            (A[18] = L),
            (A[19] = D),
            (A[20] = T),
            (A[21] = V),
            (A[22] = k),
            (A[23] = I),
            (A[24] = _),
            (A[25] = x),
            (A[26] = w),
            (A[27] = S),
            (A[28] = N),
            (A[29] = P));
        } else
          ((x = A[25]), (w = A[26]), (S = A[27]), (N = A[28]), (P = A[29]));
        return (
          A[71] !== U ||
          A[72] !== B ||
          A[73] !== e.isPublished ||
          A[74] !== e.pool.kind
            ? ((M =
                !e.isPublished &&
                "PUMP" === e.pool.kind &&
                ((null != U && U <= 0) || B) &&
                (0, t.jsx)(l.f, {})),
              (A[71] = U),
              (A[72] = B),
              (A[73] = e.isPublished),
              (A[74] = e.pool.kind),
              (A[75] = M))
            : (M = A[75]),
          A[76] !== x ||
          A[77] !== w ||
          A[78] !== S ||
          A[79] !== N ||
          A[80] !== P ||
          A[81] !== M
            ? ((j = (0, t.jsxs)("div", { children: [x, w, S, N, P, M] })),
              (A[76] = x),
              (A[77] = w),
              (A[78] = S),
              (A[79] = N),
              (A[80] = P),
              (A[81] = M),
              (A[82] = j))
            : (j = A[82]),
          j
        );
      },
    ],
    455068,
  );
};
