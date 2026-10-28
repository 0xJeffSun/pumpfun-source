// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(574472),
    a = e.i(516755),
    s = e.i(213618),
    i = e.i(352386),
    n = e.i(536925),
    d = e.i(374701),
    o = e.i(368265),
    u = e.i(683012),
    m = e.i(267951),
    c = e.i(256272),
    f = e.i(67016),
    h = e.i(128624),
    g = e.i(142318),
    p = e.i(233283),
    T = e.i(212251),
    b = e.i(646908);
  let v = new Map(),
    y = (e, t) => {
      for (let r of new Set([...Object.keys(e), ...Object.keys(t)]))
        if (e[r] !== t[r]) return !1;
      return !0;
    };
  var w = e.i(494018),
    k = e.i(146742),
    I = e.i(576766),
    S = e.i(544514),
    M = e.i(689943);
  let A = {
    myTrades: [],
    devTrades: [],
    trackedTrades: {},
    mayhemTrades: [],
    kolTrades: {},
    followingTrades: {},
    verifiedTrades: {},
    evmAddressByWallet: {},
  };
  var U = e.i(540945),
    _ = e.i(711902);
  e.i(550675);
  var x = e.i(547562),
    W = e.i(595673),
    B = e.i(79386),
    P = e.i(793121);
  let F = [],
    O = (0, i.createContext)(null);
  function C(e) {
    return e.trackedWalletAddress;
  }
  e.s(
    [
      "t",
      0,
      (e) => {
        let E,
          N,
          j,
          D,
          q,
          $,
          R,
          L,
          z,
          V,
          H,
          J,
          K,
          G,
          Q,
          Z,
          X,
          Y,
          ee,
          et,
          er,
          el,
          ea,
          es,
          ei,
          en,
          ed,
          eo,
          eu,
          em,
          ec,
          ef,
          eh,
          eg,
          ep,
          eT,
          eb,
          ev,
          ey,
          ew,
          ek,
          eI,
          eS,
          eM,
          eA,
          eU,
          e_,
          ex,
          eW,
          eB,
          eP,
          eF,
          eO,
          eC,
          eE,
          eN,
          ej,
          eD,
          eq,
          e$,
          eR,
          eL,
          ez,
          eV,
          eH,
          eJ,
          eK,
          eG,
          eQ = (0, r.c)(374),
          { children: eZ, coin: eX } = e,
          { publicKey: eY } = (0, a.P)(),
          { address: e1, authReady: e0 } = (0, l.F)();
        eQ[0] !== eY || eQ[1] !== e1
          ? ((E = eY?.toBase58() ?? e1 ?? ""),
            (eQ[0] = eY),
            (eQ[1] = e1),
            (eQ[2] = E))
          : (E = eQ[2]);
        let e2 = E;
        eQ[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((N = []), (eQ[3] = N))
          : (N = eQ[3]);
        let [e3] = (0, n.j)("trackedWallets", N),
          e5 = (0, i.useRef)(null),
          e6 = (0, i.useRef)(!1);
        if (eQ[4] === Symbol.for("react.memo_cache_sentinel")) {
          let e, t;
          ((e = null),
            (t = !1),
            (j = (r, l) => {
              (e && clearTimeout(e),
                (e = setTimeout(() => {
                  if (!t && r.current && l.current)
                    try {
                      ((t = !0), r.current.activeChart().refreshMarks());
                    } catch (e) {
                      console.error("Error refreshing marks:", e);
                    } finally {
                      ((t = !1), (e = null));
                    }
                }, 150)));
            }),
            (eQ[4] = j));
        } else j = eQ[4];
        let e4 = j,
          [e7, e8] = (0, x.l)("chart.markers.myTrades"),
          [e9, te] = (0, x.l)("chart.markers.devTrades"),
          [tt, tr] = (0, x.l)("chart.markers.trackedTrades"),
          [tl, ta] = (0, x.l)("chart.markers.mayhemTrades"),
          [ts, ti] = (0, x.l)("chart.markers.callouts"),
          [tn, td] = (0, x.l)("chart.markers.bounties"),
          [to, tu] = (0, x.l)("chart.markers.kolTrades"),
          [tm, tc] = (0, x.l)("chart.markers.followingTrades"),
          [tf, th] = (0, x.l)("chart.markers.verifiedTrades"),
          [tg] = (0, x.l)("chart.markers.groupThreshold"),
          tp = "active" === eX.mayhem_state || "enabled" === eX.mayhem_state,
          [tT, tb] = (0, n.j)("coinTradingView_myTradesWalletAddress", e2),
          tv = eX.creator;
        eQ[5] !== e3
          ? ((D = e3.map(C)), (eQ[5] = e3), (eQ[6] = D))
          : (D = eQ[6]);
        let ty = D;
        (eQ[7] !== tT || eQ[8] !== tb || eQ[9] !== e2
          ? ((q = () => {
              e2 && e2 !== tT && tb(e2);
            }),
            ($ = [e2, tT, tb]),
            (eQ[7] = tT),
            (eQ[8] = tb),
            (eQ[9] = e2),
            (eQ[10] = q),
            (eQ[11] = $))
          : ((q = eQ[10]), ($ = eQ[11])),
          (0, i.useEffect)(q, $));
        let tw = e2 || (e0 ? "" : tT);
        eQ[12] !== eX.mint || eQ[13] !== e8
          ? ((R = (e) => {
              ((0, W.hl)({ mint: eX.mint, setting: "my_trades", enabled: e }),
                e8(e));
            }),
            (eQ[12] = eX.mint),
            (eQ[13] = e8),
            (eQ[14] = R))
          : (R = eQ[14]);
        let tk = R;
        eQ[15] !== eX.mint || eQ[16] !== te
          ? ((L = (e) => {
              ((0, W.hl)({ mint: eX.mint, setting: "dev_trades", enabled: e }),
                te(e));
            }),
            (eQ[15] = eX.mint),
            (eQ[16] = te),
            (eQ[17] = L))
          : (L = eQ[17]);
        let tI = L;
        eQ[18] !== eX.mint || eQ[19] !== tr
          ? ((z = (e) => {
              ((0, W.hl)({
                mint: eX.mint,
                setting: "tracked_trades",
                enabled: e,
              }),
                tr(e));
            }),
            (eQ[18] = eX.mint),
            (eQ[19] = tr),
            (eQ[20] = z))
          : (z = eQ[20]);
        let tS = z;
        eQ[21] !== eX.mint || eQ[22] !== ta
          ? ((V = (e) => {
              ((0, W.hl)({
                mint: eX.mint,
                setting: "mayhem_trades",
                enabled: e,
              }),
                ta(e));
            }),
            (eQ[21] = eX.mint),
            (eQ[22] = ta),
            (eQ[23] = V))
          : (V = eQ[23]);
        let tM = V;
        eQ[24] !== ti
          ? ((H = (e) => {
              ((0, W.fy)({ isEnabled: e }), ti(e));
            }),
            (eQ[24] = ti),
            (eQ[25] = H))
          : (H = eQ[25]);
        let tA = H;
        eQ[26] !== td
          ? ((J = (e) => {
              ((0, W.ri)({
                buttonId: `chart_toggle:bounties:${e ? "on" : "off"}`,
              }),
                td(e));
            }),
            (eQ[26] = td),
            (eQ[27] = J))
          : (J = eQ[27]);
        let tU = J;
        eQ[28] !== eX.mint || eQ[29] !== tu
          ? ((K = (e) => {
              ((0, W.hl)({ mint: eX.mint, setting: "kol_trades", enabled: e }),
                tu(e));
            }),
            (eQ[28] = eX.mint),
            (eQ[29] = tu),
            (eQ[30] = K))
          : (K = eQ[30]);
        let t_ = K;
        eQ[31] !== eX.mint || eQ[32] !== tc
          ? ((G = (e) => {
              ((0, W.hl)({
                mint: eX.mint,
                setting: "following_trades",
                enabled: e,
              }),
                tc(e));
            }),
            (eQ[31] = eX.mint),
            (eQ[32] = tc),
            (eQ[33] = G))
          : (G = eQ[33]);
        let tx = G;
        eQ[34] !== th
          ? ((Q = (e) => {
              ((0, W.ri)({
                buttonId: `chart_toggle:verified_trades:${e ? "on" : "off"}`,
              }),
                th(e));
            }),
            (eQ[34] = th),
            (eQ[35] = Q))
          : (Q = eQ[35]);
        let tW = Q;
        eQ[36] !== eX
          ? ((Z = { coin: eX }), (eQ[36] = eX), (eQ[37] = Z))
          : (Z = eQ[37]);
        let tB = (0, U.f)(Z);
        eQ[38] !== ts ||
        eQ[39] !== eX.chain_id ||
        eQ[40] !== eX.mint ||
        eQ[41] !== tB
          ? ((X = {
              mint: eX.mint,
              chainId: eX.chain_id,
              pricePerTokenUsd: tB,
              enabled: ts,
            }),
            (eQ[38] = ts),
            (eQ[39] = eX.chain_id),
            (eQ[40] = eX.mint),
            (eQ[41] = tB),
            (eQ[42] = X))
          : (X = eQ[42]);
        let { callouts: tP, loading: tF } = ((e) => {
          let t,
            l,
            a,
            s,
            n,
            d,
            o,
            u = (0, r.c)(27),
            { mint: m, chainId: c, pricePerTokenUsd: w, enabled: k } = e,
            I = k && !!m,
            S = (0, f.G)();
          u[0] !== c || u[1] !== m
            ? ((t = (0, p.$)({ mint: m, chain_id: c })),
              (u[0] = c),
              (u[1] = m),
              (u[2] = t))
            : (t = u[2]);
          let M = (0, b.L)(c) ? b.J : void 0;
          u[3] !== c ||
          u[4] !== I ||
          u[5] !== m ||
          u[6] !== S ||
          u[7] !== t ||
          u[8] !== M
            ? ((l = {
                mint: m,
                sortBy: S,
                withThesis: !0,
                pageSize: g.$,
                chainId: t,
                chain: M,
                coinChain: c,
                enabled: I,
              }),
              (u[3] = c),
              (u[4] = I),
              (u[5] = m),
              (u[6] = S),
              (u[7] = t),
              (u[8] = M),
              (u[9] = l))
            : (l = u[9]);
          let { positions: A, isLoading: U } = (0, g.z)(l),
            { minPositionUsd: _ } = (0, h.f)();
          u[10] !== I || u[11] !== _ || u[12] !== A || u[13] !== w
            ? ((a = I
                ? (({
                    positions: e,
                    pricePerTokenUsd: t,
                    minPositionUsd: r = T.e,
                  }) =>
                    t > 0
                      ? e.flatMap((e) => {
                          let l, a, s;
                          if (!(e.amountHeld * t > r)) return [];
                          let i =
                            ((l = e.callout),
                            (a = ((e) => {
                              let t = e.callout?.calloutTimestamp;
                              if (!t) return null;
                              let r = Date.parse(t);
                              return Number.isFinite(r) ? r : null;
                            })(e)),
                            (s = l?.thesis?.trim()),
                            l?.calloutId && a && s
                              ? {
                                  calloutId: l.calloutId,
                                  userId: e.walletAddress || e.userId,
                                  authorCcUserId: e.userId,
                                  coinMint: e.coinMint,
                                  marketCap: l.calledOutAtMcap ?? 0,
                                  calloutPrice: 0,
                                  multiple: l.multiple ?? 1,
                                  createdAt: a,
                                  maxPriceSol: 0,
                                  note: s,
                                  mediaUrl: l.mediaUrl ?? null,
                                  likeCount: l.likes,
                                  callerName: e.userName?.trim() || void 0,
                                  callerAvatar:
                                    e.profileImage?.trim() || void 0,
                                }
                              : null);
                          return i ? [i] : [];
                        })
                      : [])({
                    positions: A,
                    pricePerTokenUsd: w,
                    minPositionUsd: _,
                  })
                : []),
              (u[10] = I),
              (u[11] = _),
              (u[12] = A),
              (u[13] = w),
              (u[14] = a))
            : (a = u[14]);
          let x = a;
          u[15] !== _ || u[16] !== m || u[17] !== S
            ? ((s = () => ({
                mint: m,
                sortBy: S,
                minPositionUsd: _,
                marks: v,
              })),
              (u[15] = _),
              (u[16] = m),
              (u[17] = S),
              (u[18] = s))
            : (s = u[18]);
          let [W, B] = (0, i.useState)(s),
            P = W.mint === m && W.sortBy === S && W.minPositionUsd === _,
            F = P && I ? W.marks : v;
          u[19] !== x || u[20] !== F
            ? ((n = ((e, t) => {
                let r = new Set(t.map((e) => e.calloutId)),
                  l = new Map(e),
                  a = !1;
                for (let e of t) {
                  let t = l.get(e.calloutId);
                  if (void 0 !== t) {
                    y(t, e) || (l.set(e.calloutId, e), (a = !0));
                    continue;
                  }
                  if (l.size >= 20) {
                    let e = [...l.keys()].find((e) => !r.has(e));
                    if (void 0 === e) continue;
                    l.delete(e);
                  }
                  (l.set(e.calloutId, e), (a = !0));
                }
                return a ? l : e;
              })(F, x)),
              (u[19] = x),
              (u[20] = F),
              (u[21] = n))
            : (n = u[21]);
          let O = n;
          ((P && O === W.marks) ||
            B({ mint: m, sortBy: S, minPositionUsd: _, marks: O }),
            u[22] !== O
              ? ((d = Array.from(O.values())), (u[22] = O), (u[23] = d))
              : (d = u[23]));
          let C = d,
            E = I && U;
          return (
            u[24] !== C || u[25] !== E
              ? ((o = { callouts: C, loading: E }),
                (u[24] = C),
                (u[25] = E),
                (u[26] = o))
              : (o = u[26]),
            o
          );
        })(X);
        (eQ[43] !== tn || eQ[44] !== eX.mint
          ? ((Y = !!eX.mint && tn && (0, _.l)(eX.mint)),
            (eQ[43] = tn),
            (eQ[44] = eX.mint),
            (eQ[45] = Y))
          : (Y = eQ[45]),
          eQ[46] !== eX.mint || eQ[47] !== Y
            ? ((ee = {
                coinAddress: eX.mint,
                phase: k.H,
                limit: 50,
                enabled: Y,
              }),
              (eQ[46] = eX.mint),
              (eQ[47] = Y),
              (eQ[48] = ee))
            : (ee = eQ[48]));
        let { data: tO, isLoading: tC } = (0, k.Q)(ee);
        e: {
          let e,
            t = tO?.items;
          if (!t?.length) {
            let e;
            (eQ[49] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (eQ[49] = e))
              : (e = eQ[49]),
              (et = e));
            break e;
          }
          if (eQ[50] !== t) {
            for (let r of ((e = []), t)) {
              let t = Date.parse(r.publishedAt ?? r.fundedAt ?? r.createdAt);
              Number.isFinite(t) &&
                e.push({
                  taskId: r.taskId,
                  title: r.title,
                  postedAtMs: t,
                  rewardTotalUsd: r.rewardTotalUsd,
                });
            }
            ((eQ[50] = t), (eQ[51] = e));
          } else e = eQ[51];
          et = e;
        }
        let tE = et,
          tN = (0, P.Z)(eX.mint),
          tj = (0, S.f)(),
          tD = to && tj;
        eQ[52] !== eX.chain_id || eQ[53] !== eX.mint || eQ[54] !== tD
          ? ((er = { mint: eX.mint, chainId: eX.chain_id, enabled: tD }),
            (eQ[52] = eX.chain_id),
            (eQ[53] = eX.mint),
            (eQ[54] = tD),
            (eQ[55] = er))
          : (er = eQ[55]);
        let tq = (0, w.f)(er),
          t$ = tq.data.tradesByWallet,
          tR = tq.data.byWallet,
          tL = tm ? tN.followingWallets : F,
          tz = tN.followingByWallet,
          tV = tm && tN.loading.following,
          tH = tf ? tN.verifiedWallets : F,
          tJ = tN.verifiedByWallet;
        if (eQ[56] !== tJ) {
          for (let e of ((el = {}), Object.keys(tJ))) el[e] = !0;
          ((eQ[56] = tJ), (eQ[57] = el));
        } else el = eQ[57];
        let tK = el,
          tG = tf && tN.loading.verified;
        (eQ[58] !== tt || eQ[59] !== ty
          ? ((ea = tt ? ty : []), (eQ[58] = tt), (eQ[59] = ty), (eQ[60] = ea))
          : (ea = eQ[60]),
          eQ[61] !== tm || eQ[62] !== tL
            ? ((es = tm ? tL : []), (eQ[61] = tm), (eQ[62] = tL), (eQ[63] = es))
            : (es = eQ[63]),
          eQ[64] !== tf || eQ[65] !== tH
            ? ((ei = tf ? tH : []), (eQ[64] = tf), (eQ[65] = tH), (eQ[66] = ei))
            : (ei = eQ[66]),
          eQ[67] !== eX.chain_id
            ? ((en = { chainId: eX.chain_id }),
              (eQ[67] = eX.chain_id),
              (eQ[68] = en))
            : (en = eQ[68]));
        let { trades: tQ, loading: tZ } = ((
            e,
            t,
            l,
            a,
            s,
            i,
            n,
            d,
            o,
            u,
            m,
            c,
          ) => {
            let f,
              h,
              g,
              p,
              T,
              b = (0, r.c)(12);
            b[0] !== o
              ? ((f = void 0 === o ? [] : o), (b[0] = o), (b[1] = f))
              : (f = b[1]);
            let v = f;
            b[2] !== u
              ? ((h = void 0 === u ? [] : u), (b[2] = u), (b[3] = h))
              : (h = b[3]);
            let y = h;
            b[4] !== m
              ? ((g = void 0 === m ? [] : m), (b[4] = m), (b[5] = g))
              : (g = b[5]);
            let w = g;
            b[6] !== c
              ? ((p = void 0 === c ? {} : c), (b[6] = c), (b[7] = p))
              : (p = b[7]);
            let k = p,
              {
                data: I,
                isLoading: S,
                error: U,
              } = (0, M.t)(e, t, l, a, s, i, void 0 !== n && n, d, v, y, w, k),
              _ = U?.message || null,
              x = I || A;
            return (
              b[8] !== _ || b[9] !== S || b[10] !== x
                ? ((T = { trades: x, loading: S, error: _ }),
                  (b[8] = _),
                  (b[9] = S),
                  (b[10] = x),
                  (b[11] = T))
                : (T = b[11]),
              T
            );
          })(
            eX.mint,
            eX.program,
            eX.created_timestamp ?? null,
            e7 ? tw : void 0,
            e9 ? tv : void 0,
            ea,
            !1,
            tp && tl ? m.v : void 0,
            F,
            es,
            ei,
            en,
          ),
          tX = tN.evmAddressByWallet;
        t: {
          let e,
            t = tQ.evmAddressByWallet;
          if (0 === Object.keys(tX).length) {
            ed = t;
            break t;
          }
          (eQ[69] !== t || eQ[70] !== tX
            ? ((e = { ...tX, ...t }), (eQ[69] = t), (eQ[70] = tX), (eQ[71] = e))
            : (e = eQ[71]),
            (ed = e));
        }
        let tY = ed;
        eQ[72] !== tY || eQ[73] !== tR
          ? ((eo = (0, B.f)(tR, tY)),
            (eQ[72] = tY),
            (eQ[73] = tR),
            (eQ[74] = eo))
          : (eo = eQ[74]);
        let t1 = eo;
        eQ[75] !== tY || eQ[76] !== tz
          ? ((eu = (0, B.f)(tz, tY)),
            (eQ[75] = tY),
            (eQ[76] = tz),
            (eQ[77] = eu))
          : (eu = eQ[77]);
        let t0 = eu;
        eQ[78] !== tY || eQ[79] !== tK
          ? ((em = (0, B.f)(tK, tY)),
            (eQ[78] = tY),
            (eQ[79] = tK),
            (eQ[80] = em))
          : (em = eQ[80]);
        let t2 = em;
        eQ[81] !== tY || eQ[82] !== tJ
          ? ((ec = (0, B.f)(tJ, tY)),
            (eQ[81] = tY),
            (eQ[82] = tJ),
            (eQ[83] = ec))
          : (ec = eQ[83]);
        let t3 = ec;
        if (eQ[84] !== tY || eQ[85] !== e3) {
          let e;
          eQ[87] !== tY
            ? ((e = (e) => {
                let t = tY[e.trackedWalletAddress];
                return t ? [{ ...e, trackedWalletAddress: t }] : [];
              }),
              (eQ[87] = tY),
              (eQ[88] = e))
            : (e = eQ[88]);
          let t = e3.flatMap(e);
          ((ef = t.length ? [...e3, ...t] : e3),
            (eQ[84] = tY),
            (eQ[85] = e3),
            (eQ[86] = ef));
        } else ef = eQ[86];
        let t5 = ef,
          t6 = tY[tw] ?? tw;
        if (
          eQ[89] !== tP ||
          eQ[90] !== t0 ||
          eQ[91] !== t1 ||
          eQ[92] !== t$ ||
          eQ[93] !== tQ.devTrades ||
          eQ[94] !== tQ.followingTrades ||
          eQ[95] !== tQ.mayhemTrades ||
          eQ[96] !== tQ.myTrades ||
          eQ[97] !== tQ.verifiedTrades ||
          eQ[98] !== t3
        ) {
          for (let e of ((eh = new Set()), tP))
            e.userId && ((e.callerName && e.callerAvatar) || eh.add(e.userId));
          for (let e of tQ.myTrades ?? [])
            e.userAddress && eh.add(e.userAddress);
          for (let e of tQ.devTrades ?? [])
            e.userAddress && eh.add(e.userAddress);
          for (let e of tQ.mayhemTrades ?? [])
            e.userAddress && eh.add(e.userAddress);
          for (let [e, t] of Object.entries(t$)) {
            if (!t?.length || !e) continue;
            let r = t1[e];
            (r?.username && r?.profileImage) || eh.add(e);
          }
          let e = (e, t) => {
            for (let [r, l] of Object.entries(e ?? {})) {
              if (!l?.length || !r) continue;
              let e = t[r];
              (e?.username && e?.profileImage) || eh.add(r);
            }
          };
          (e(tQ.followingTrades, t0),
            e(tQ.verifiedTrades, t3),
            (eQ[89] = tP),
            (eQ[90] = t0),
            (eQ[91] = t1),
            (eQ[92] = t$),
            (eQ[93] = tQ.devTrades),
            (eQ[94] = tQ.followingTrades),
            (eQ[95] = tQ.mayhemTrades),
            (eQ[96] = tQ.myTrades),
            (eQ[97] = tQ.verifiedTrades),
            (eQ[98] = t3),
            (eQ[99] = eh));
        } else eh = eQ[99];
        eQ[100] !== eh
          ? ((eg = Array.from(eh)), (eQ[100] = eh), (eQ[101] = eg))
          : (eg = eQ[101]);
        let t4 = eg;
        (eQ[102] === Symbol.for("react.memo_cache_sentinel")
          ? ((ep = { placeholderData: s.y }), (eQ[102] = ep))
          : (ep = eQ[102]),
          eQ[103] !== t4
            ? ((eT = { userAddresses: t4, queryOptions: ep }),
              (eQ[103] = t4),
              (eQ[104] = eT))
            : (eT = eQ[104]));
        let { data: t7 } = (0, I.f)(eT);
        if (
          eQ[105] !== t7 ||
          eQ[106] !== tY ||
          eQ[107] !== t0 ||
          eQ[108] !== t1 ||
          eQ[109] !== t3
        ) {
          let e, t, r;
          for (let t of ((eb = new Map()),
          eQ[111] !== t0 || eQ[112] !== t3
            ? ((e = [t3, t0]), (eQ[111] = t0), (eQ[112] = t3), (eQ[113] = e))
            : (e = eQ[113]),
          e))
            for (let [e, r] of Object.entries(t))
              r.username && eb.set(e, r.username);
          for (let [e, r] of (eQ[114] !== t1
            ? ((t = Object.entries(t1)), (eQ[114] = t1), (eQ[115] = t))
            : (t = eQ[115]),
          t))
            r.username && eb.set(e, r.username);
          for (let e of t7 ?? []) {
            let t = e?.username?.trim();
            e?.address && t && eb.set(e.address, t);
          }
          for (let [e, t] of (eQ[116] !== tY
            ? ((r = Object.entries(tY)), (eQ[116] = tY), (eQ[117] = r))
            : (r = eQ[117]),
          r)) {
            let r = eb.get(e);
            r && !eb.has(t) && eb.set(t, r);
          }
          ((eQ[105] = t7),
            (eQ[106] = tY),
            (eQ[107] = t0),
            (eQ[108] = t1),
            (eQ[109] = t3),
            (eQ[110] = eb));
        } else eb = eQ[110];
        let t8 = eb;
        if (
          eQ[118] !== t7 ||
          eQ[119] !== tY ||
          eQ[120] !== t0 ||
          eQ[121] !== t1 ||
          eQ[122] !== t3
        ) {
          let e, t, r;
          for (let t of ((ev = new Map()),
          eQ[124] !== t0 || eQ[125] !== t3
            ? ((e = [t3, t0]), (eQ[124] = t0), (eQ[125] = t3), (eQ[126] = e))
            : (e = eQ[126]),
          e))
            for (let [e, r] of Object.entries(t))
              r.profileImage && ev.set(e, r.profileImage);
          for (let [e, r] of (eQ[127] !== t1
            ? ((t = Object.entries(t1)), (eQ[127] = t1), (eQ[128] = t))
            : (t = eQ[128]),
          t))
            r.profileImage && ev.set(e, r.profileImage);
          for (let e of t7 ?? []) {
            let t = e?.profile_image?.trim();
            e?.address && t && ev.set(e.address, t);
          }
          for (let [e, t] of (eQ[129] !== tY
            ? ((r = Object.entries(tY)), (eQ[129] = tY), (eQ[130] = r))
            : (r = eQ[130]),
          r)) {
            let r = ev.get(e);
            r && !ev.has(t) && ev.set(t, r);
          }
          ((eQ[118] = t7),
            (eQ[119] = tY),
            (eQ[120] = t0),
            (eQ[121] = t1),
            (eQ[122] = t3),
            (eQ[123] = ev));
        } else ev = eQ[123];
        let t9 = ev,
          re = !1;
        if (eQ[131] !== t9 || eQ[132] !== t1 || eQ[133] !== t8) {
          let e;
          for (let [t, r] of ((ey = {}),
          eQ[136] !== t1
            ? ((e = Object.entries(t1)), (eQ[136] = t1), (eQ[137] = e))
            : (e = eQ[137]),
          e)) {
            let e = r.username ?? t8.get(t) ?? null,
              l = r.profileImage ?? t9.get(t) ?? null;
            if (e === r.username && l === r.profileImage) {
              ey[t] = r;
              continue;
            }
            ((re = !0),
              (ey[t] = {
                ...r,
                username: e,
                profileImage: l,
                name: e ?? r.name,
              }));
          }
          ((eQ[131] = t9),
            (eQ[132] = t1),
            (eQ[133] = t8),
            (eQ[134] = ey),
            (eQ[135] = re));
        } else ((ey = eQ[134]), (re = eQ[135]));
        let rt = re ? ey : t1;
        if (eQ[138] !== t8) {
          for (let [e, t] of ((ew = {}), t8)) ew[e] = t;
          ((eQ[138] = t8), (eQ[139] = ew));
        } else ew = eQ[139];
        let rr = ew;
        if (eQ[140] !== tY) {
          for (let [e, t] of ((ek = {}), Object.entries(tY))) t && (ek[t] = e);
          ((eQ[140] = tY), (eQ[141] = ek));
        } else ek = eQ[141];
        let rl = ek;
        if (eQ[142] !== t9) {
          for (let [e, t] of ((eI = {}), t9)) eI[e] = t;
          ((eQ[142] = t9), (eQ[143] = eI));
        } else eI = eQ[143];
        let ra = eI;
        r: {
          let e;
          if (!tP.length) {
            let e;
            (eQ[144] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = []), (eQ[144] = e))
              : (e = eQ[144]),
              (eS = e));
            break r;
          }
          if (eQ[145] !== t9 || eQ[146] !== tP || eQ[147] !== t8) {
            let t;
            (eQ[149] !== t9 || eQ[150] !== t8
              ? ((t = (e) => ({
                  ...e,
                  callerName: t8.get(e.userId) ?? e.callerName,
                  callerAvatar: t9.get(e.userId) ?? e.callerAvatar,
                })),
                (eQ[149] = t9),
                (eQ[150] = t8),
                (eQ[151] = t))
              : (t = eQ[151]),
              (e = tP.map(t)),
              (eQ[145] = t9),
              (eQ[146] = tP),
              (eQ[147] = t8),
              (eQ[148] = e));
          } else e = eQ[148];
          eS = e;
        }
        let rs = eS;
        eQ[152] !== eX.mint
          ? ((eM = { mint: eX.mint }), (eQ[152] = eX.mint), (eQ[153] = eM))
          : (eM = eQ[153]);
        let { wallet: ri } = (0, o.h)(eM);
        eQ[154] !== eX || eQ[155] !== ri
          ? ((eA = { coin: eX, wallet: ri }),
            (eQ[154] = eX),
            (eQ[155] = ri),
            (eQ[156] = eA))
          : (eA = eQ[156]);
        let rn = (0, d.f)(eA),
          rd = rn.actorAddress ?? "",
          ro = rn.trades,
          ru = (0, c.u)();
        (eQ[157] !== e7 ||
        eQ[158] !== t6 ||
        eQ[159] !== tQ.myTrades ||
        eQ[160] !== tZ
          ? ((eU = {
              enabled: e7,
              walletAddress: t6,
              trades: tQ.myTrades,
              loading: tZ,
            }),
            (eQ[157] = e7),
            (eQ[158] = t6),
            (eQ[159] = tQ.myTrades),
            (eQ[160] = tZ),
            (eQ[161] = eU))
          : (eU = eQ[161]),
          eQ[162] !== e9 ||
          eQ[163] !== tv ||
          eQ[164] !== tQ.devTrades ||
          eQ[165] !== tZ
            ? ((e_ = {
                enabled: e9,
                walletAddress: tv,
                trades: tQ.devTrades,
                loading: tZ,
              }),
              (eQ[162] = e9),
              (eQ[163] = tv),
              (eQ[164] = tQ.devTrades),
              (eQ[165] = tZ),
              (eQ[166] = e_))
            : (e_ = eQ[166]),
          eQ[167] !== tt ||
          eQ[168] !== t5 ||
          eQ[169] !== tQ.trackedTrades ||
          eQ[170] !== tZ
            ? ((ex = {
                enabled: tt,
                trackedWallets: t5,
                tradesByWallet: tQ.trackedTrades,
                loading: tZ,
              }),
              (eQ[167] = tt),
              (eQ[168] = t5),
              (eQ[169] = tQ.trackedTrades),
              (eQ[170] = tZ),
              (eQ[171] = ex))
            : (ex = eQ[171]));
        let rm = tp && tl,
          rc = tp ? m.v : "";
        (eQ[172] !== tp || eQ[173] !== tQ.mayhemTrades
          ? ((eW = tp ? tQ.mayhemTrades : []),
            (eQ[172] = tp),
            (eQ[173] = tQ.mayhemTrades),
            (eQ[174] = eW))
          : (eW = eQ[174]),
          eQ[175] !== rm || eQ[176] !== rc || eQ[177] !== eW || eQ[178] !== tZ
            ? ((eB = {
                enabled: rm,
                walletAddress: rc,
                trades: eW,
                loading: tZ,
              }),
              (eQ[175] = rm),
              (eQ[176] = rc),
              (eQ[177] = eW),
              (eQ[178] = tZ),
              (eQ[179] = eB))
            : (eB = eQ[179]),
          eQ[180] !== ts || eQ[181] !== rs || eQ[182] !== tF
            ? ((eP = { enabled: ts, callouts: rs, loading: tF }),
              (eQ[180] = ts),
              (eQ[181] = rs),
              (eQ[182] = tF),
              (eQ[183] = eP))
            : (eP = eQ[183]),
          eQ[184] !== tn || eQ[185] !== tE || eQ[186] !== tC
            ? ((eF = { enabled: tn, bounties: tE, loading: tC }),
              (eQ[184] = tn),
              (eQ[185] = tE),
              (eQ[186] = tC),
              (eQ[187] = eF))
            : (eF = eQ[187]),
          eQ[188] !== rt ||
          eQ[189] !== to ||
          eQ[190] !== tq.loading ||
          eQ[191] !== t$
            ? ((eO = {
                enabled: to,
                tradesByWallet: t$,
                kolByWallet: rt,
                loading: tq.loading,
              }),
              (eQ[188] = rt),
              (eQ[189] = to),
              (eQ[190] = tq.loading),
              (eQ[191] = t$),
              (eQ[192] = eO))
            : (eO = eQ[192]));
        let rf = tZ || tV;
        eQ[193] !== t0 ||
        eQ[194] !== tm ||
        eQ[195] !== rf ||
        eQ[196] !== tQ.followingTrades
          ? ((eC = {
              enabled: tm,
              tradesByWallet: tQ.followingTrades,
              followingByWallet: t0,
              loading: rf,
            }),
            (eQ[193] = t0),
            (eQ[194] = tm),
            (eQ[195] = rf),
            (eQ[196] = tQ.followingTrades),
            (eQ[197] = eC))
          : (eC = eQ[197]);
        let rh = tZ || tG;
        (eQ[198] !== rh ||
        eQ[199] !== tQ.verifiedTrades ||
        eQ[200] !== tf ||
        eQ[201] !== t2
          ? ((eE = {
              enabled: tf,
              tradesByWallet: tQ.verifiedTrades,
              verifiedWallets: t2,
              loading: rh,
            }),
            (eQ[198] = rh),
            (eQ[199] = tQ.verifiedTrades),
            (eQ[200] = tf),
            (eQ[201] = t2),
            (eQ[202] = eE))
          : (eE = eQ[202]),
          eQ[203] !== eU ||
          eQ[204] !== e_ ||
          eQ[205] !== ex ||
          eQ[206] !== eB ||
          eQ[207] !== eP ||
          eQ[208] !== eF ||
          eQ[209] !== eO ||
          eQ[210] !== eC ||
          eQ[211] !== eE
            ? ((eN = {
                myTrades: eU,
                devTrades: e_,
                trackedTrades: ex,
                mayhemTrades: eB,
                callouts: eP,
                bounties: eF,
                kolTrades: eO,
                followingTrades: eC,
                verifiedTrades: eE,
              }),
              (eQ[203] = eU),
              (eQ[204] = e_),
              (eQ[205] = ex),
              (eQ[206] = eB),
              (eQ[207] = eP),
              (eQ[208] = eF),
              (eQ[209] = eO),
              (eQ[210] = eC),
              (eQ[211] = eE),
              (eQ[212] = eN))
            : (eN = eQ[212]));
        let rg = tp ? tM : void 0;
        (eQ[213] !== tU ||
        eQ[214] !== tA ||
        eQ[215] !== tI ||
        eQ[216] !== tx ||
        eQ[217] !== t_ ||
        eQ[218] !== tk ||
        eQ[219] !== tS ||
        eQ[220] !== tW ||
        eQ[221] !== rg
          ? ((ej = {
              onMyTradesToggle: tk,
              onDevTradesToggle: tI,
              onTrackedTradesToggle: tS,
              onMayhemTradesToggle: rg,
              onCalloutsToggle: tA,
              onBountiesToggle: tU,
              onKolTradesToggle: t_,
              onFollowingTradesToggle: tx,
              onVerifiedTradesToggle: tW,
            }),
            (eQ[213] = tU),
            (eQ[214] = tA),
            (eQ[215] = tI),
            (eQ[216] = tx),
            (eQ[217] = t_),
            (eQ[218] = tk),
            (eQ[219] = tS),
            (eQ[220] = tW),
            (eQ[221] = rg),
            (eQ[222] = ej))
          : (ej = eQ[222]),
          eQ[223] !== ru
            ? ((eD = (0, u.A)(ru)), (eQ[223] = ru), (eQ[224] = eD))
            : (eD = eQ[224]),
          eQ[225] !== rd ||
          eQ[226] !== ro ||
          eQ[227] !== tg ||
          eQ[228] !== eN ||
          eQ[229] !== ej ||
          eQ[230] !== eD ||
          eQ[231] !== rl ||
          eQ[232] !== ra ||
          eQ[233] !== rr ||
          eQ[234] !== tZ
            ? ((eq = {
                displayButtons: !0,
                initalFetchLoading: tZ,
                traderProfileImages: ra,
                traderUsernames: rr,
                traderIdentities: rl,
                buttonDisplayOptions: eN,
                indicatorsEnabled: !0,
                activeWalletFilter: rd,
                filteredWalletTrades: ro,
                markerGroupThreshold: tg,
                callbacks: ej,
                backgroundType: "solid",
                backgroundColor: eD,
              }),
              (eQ[225] = rd),
              (eQ[226] = ro),
              (eQ[227] = tg),
              (eQ[228] = eN),
              (eQ[229] = ej),
              (eQ[230] = eD),
              (eQ[231] = rl),
              (eQ[232] = ra),
              (eQ[233] = rr),
              (eQ[234] = tZ),
              (eQ[235] = eq))
            : (eq = eQ[235]));
        let rp = (0, i.useRef)(eq);
        (eQ[236] !== rd ||
        eQ[237] !== tn ||
        eQ[238] !== tE ||
        eQ[239] !== tC ||
        eQ[240] !== ts ||
        eQ[241] !== rs ||
        eQ[242] !== tF ||
        eQ[243] !== e9 ||
        eQ[244] !== tv ||
        eQ[245] !== ro ||
        eQ[246] !== t0 ||
        eQ[247] !== tV ||
        eQ[248] !== tm ||
        eQ[249] !== tp ||
        eQ[250] !== rt ||
        eQ[251] !== to ||
        eQ[252] !== tg ||
        eQ[253] !== tl ||
        eQ[254] !== e7 ||
        eQ[255] !== t6 ||
        eQ[256] !== ru ||
        eQ[257] !== tq.loading ||
        eQ[258] !== t$ ||
        eQ[259] !== tt ||
        eQ[260] !== t5 ||
        eQ[261] !== rl ||
        eQ[262] !== ra ||
        eQ[263] !== rr ||
        eQ[264] !== tQ.devTrades ||
        eQ[265] !== tQ.followingTrades ||
        eQ[266] !== tQ.mayhemTrades ||
        eQ[267] !== tQ.myTrades ||
        eQ[268] !== tQ.trackedTrades ||
        eQ[269] !== tQ.verifiedTrades ||
        eQ[270] !== tZ ||
        eQ[271] !== tG ||
        eQ[272] !== tf ||
        eQ[273] !== t2
          ? ((e$ = () => {
              rp.current = {
                ...rp.current,
                initalFetchLoading: tZ,
                backgroundColor: (0, u.A)(ru),
                traderProfileImages: ra,
                traderUsernames: rr,
                traderIdentities: rl,
                activeWalletFilter: rd,
                filteredWalletTrades: ro,
                markerGroupThreshold: tg,
                buttonDisplayOptions: {
                  ...rp.current.buttonDisplayOptions,
                  myTrades: {
                    enabled: e7,
                    walletAddress: t6,
                    trades: tQ.myTrades,
                    loading: tZ,
                  },
                  devTrades: {
                    enabled: e9,
                    walletAddress: tv,
                    trades: tQ.devTrades,
                    loading: tZ,
                  },
                  trackedTrades: {
                    enabled: tt,
                    trackedWallets: t5,
                    tradesByWallet: tQ.trackedTrades,
                    loading: tZ,
                  },
                  mayhemTrades: {
                    enabled: tp && tl,
                    walletAddress: tp ? m.v : "",
                    trades: tp ? tQ.mayhemTrades : [],
                    loading: tZ,
                  },
                  callouts: { enabled: ts, callouts: rs, loading: tF },
                  bounties: { enabled: tn, bounties: tE, loading: tC },
                  kolTrades: {
                    enabled: to,
                    tradesByWallet: t$,
                    kolByWallet: rt,
                    loading: tq.loading,
                  },
                  followingTrades: {
                    enabled: tm,
                    tradesByWallet: tQ.followingTrades,
                    followingByWallet: t0,
                    loading: tZ || tV,
                  },
                  verifiedTrades: {
                    enabled: tf,
                    tradesByWallet: tQ.verifiedTrades,
                    verifiedWallets: t2,
                    loading: tZ || tG,
                  },
                },
              };
            }),
            (eQ[236] = rd),
            (eQ[237] = tn),
            (eQ[238] = tE),
            (eQ[239] = tC),
            (eQ[240] = ts),
            (eQ[241] = rs),
            (eQ[242] = tF),
            (eQ[243] = e9),
            (eQ[244] = tv),
            (eQ[245] = ro),
            (eQ[246] = t0),
            (eQ[247] = tV),
            (eQ[248] = tm),
            (eQ[249] = tp),
            (eQ[250] = rt),
            (eQ[251] = to),
            (eQ[252] = tg),
            (eQ[253] = tl),
            (eQ[254] = e7),
            (eQ[255] = t6),
            (eQ[256] = ru),
            (eQ[257] = tq.loading),
            (eQ[258] = t$),
            (eQ[259] = tt),
            (eQ[260] = t5),
            (eQ[261] = rl),
            (eQ[262] = ra),
            (eQ[263] = rr),
            (eQ[264] = tQ.devTrades),
            (eQ[265] = tQ.followingTrades),
            (eQ[266] = tQ.mayhemTrades),
            (eQ[267] = tQ.myTrades),
            (eQ[268] = tQ.trackedTrades),
            (eQ[269] = tQ.verifiedTrades),
            (eQ[270] = tZ),
            (eQ[271] = tG),
            (eQ[272] = tf),
            (eQ[273] = t2),
            (eQ[274] = e$))
          : (e$ = eQ[274]),
          eQ[275] !== rd ||
          eQ[276] !== tn ||
          eQ[277] !== tE ||
          eQ[278] !== tC ||
          eQ[279] !== ts ||
          eQ[280] !== rs ||
          eQ[281] !== tF ||
          eQ[282] !== e9 ||
          eQ[283] !== tv ||
          eQ[284] !== ro ||
          eQ[285] !== t0 ||
          eQ[286] !== tV ||
          eQ[287] !== tm ||
          eQ[288] !== tp ||
          eQ[289] !== rt ||
          eQ[290] !== to ||
          eQ[291] !== tg ||
          eQ[292] !== tl ||
          eQ[293] !== e7 ||
          eQ[294] !== t6 ||
          eQ[295] !== ru ||
          eQ[296] !== tq.loading ||
          eQ[297] !== t$ ||
          eQ[298] !== tt ||
          eQ[299] !== t5 ||
          eQ[300] !== rl ||
          eQ[301] !== ra ||
          eQ[302] !== rr ||
          eQ[303] !== tQ ||
          eQ[304] !== tZ ||
          eQ[305] !== tG ||
          eQ[306] !== tf ||
          eQ[307] !== t2 ||
          eQ[308] !== e2
            ? ((eR = [
                tQ,
                tZ,
                e7,
                e9,
                tt,
                tl,
                ts,
                tn,
                to,
                rt,
                t$,
                tq.loading,
                tm,
                t0,
                tV,
                tf,
                t2,
                tG,
                rs,
                tF,
                tE,
                tC,
                tp,
                t6,
                tv,
                t5,
                ra,
                rr,
                rl,
                e2,
                rd,
                ro,
                tg,
                ru,
              ]),
              (eQ[275] = rd),
              (eQ[276] = tn),
              (eQ[277] = tE),
              (eQ[278] = tC),
              (eQ[279] = ts),
              (eQ[280] = rs),
              (eQ[281] = tF),
              (eQ[282] = e9),
              (eQ[283] = tv),
              (eQ[284] = ro),
              (eQ[285] = t0),
              (eQ[286] = tV),
              (eQ[287] = tm),
              (eQ[288] = tp),
              (eQ[289] = rt),
              (eQ[290] = to),
              (eQ[291] = tg),
              (eQ[292] = tl),
              (eQ[293] = e7),
              (eQ[294] = t6),
              (eQ[295] = ru),
              (eQ[296] = tq.loading),
              (eQ[297] = t$),
              (eQ[298] = tt),
              (eQ[299] = t5),
              (eQ[300] = rl),
              (eQ[301] = ra),
              (eQ[302] = rr),
              (eQ[303] = tQ),
              (eQ[304] = tZ),
              (eQ[305] = tG),
              (eQ[306] = tf),
              (eQ[307] = t2),
              (eQ[308] = e2),
              (eQ[309] = eR))
            : (eR = eQ[309]),
          (0, i.useEffect)(e$, eR),
          eQ[310] === Symbol.for("react.memo_cache_sentinel")
            ? ((eL = () => {
                e5.current && e6.current && e4(e5, e6);
              }),
              (eQ[310] = eL))
            : (eL = eQ[310]),
          eQ[311] !== rd ||
          eQ[312] !== tn ||
          eQ[313] !== tE ||
          eQ[314] !== ts ||
          eQ[315] !== rs ||
          eQ[316] !== e9 ||
          eQ[317] !== ro ||
          eQ[318] !== t0 ||
          eQ[319] !== tm ||
          eQ[320] !== rt ||
          eQ[321] !== to ||
          eQ[322] !== tg ||
          eQ[323] !== tl ||
          eQ[324] !== e7 ||
          eQ[325] !== tt ||
          eQ[326] !== rl ||
          eQ[327] !== ra ||
          eQ[328] !== rr ||
          eQ[329] !== tQ ||
          eQ[330] !== tf ||
          eQ[331] !== t2
            ? ((ez = [
                e4,
                tQ,
                e7,
                e9,
                tt,
                tl,
                ts,
                tn,
                to,
                rt,
                tm,
                t0,
                tf,
                t2,
                rs,
                tE,
                ra,
                rr,
                rl,
                rd,
                ro,
                tg,
              ]),
              (eQ[311] = rd),
              (eQ[312] = tn),
              (eQ[313] = tE),
              (eQ[314] = ts),
              (eQ[315] = rs),
              (eQ[316] = e9),
              (eQ[317] = ro),
              (eQ[318] = t0),
              (eQ[319] = tm),
              (eQ[320] = rt),
              (eQ[321] = to),
              (eQ[322] = tg),
              (eQ[323] = tl),
              (eQ[324] = e7),
              (eQ[325] = tt),
              (eQ[326] = rl),
              (eQ[327] = ra),
              (eQ[328] = rr),
              (eQ[329] = tQ),
              (eQ[330] = tf),
              (eQ[331] = t2),
              (eQ[332] = ez))
            : (ez = eQ[332]),
          (0, i.useEffect)(eL, ez),
          eQ[333] !== tQ.devTrades ||
          eQ[334] !== tQ.mayhemTrades ||
          eQ[335] !== tQ.myTrades ||
          eQ[336] !== tQ.trackedTrades
            ? ((eV = {
                myTrades: tQ.myTrades,
                devTrades: tQ.devTrades,
                trackedTrades: tQ.trackedTrades,
                mayhemTrades: tQ.mayhemTrades,
              }),
              (eQ[333] = tQ.devTrades),
              (eQ[334] = tQ.mayhemTrades),
              (eQ[335] = tQ.myTrades),
              (eQ[336] = tQ.trackedTrades),
              (eQ[337] = eV))
            : (eV = eQ[337]));
        let rT = tp ? m.v : void 0;
        (eQ[338] !== rd || eQ[339] !== ro
          ? ((eH = rd ? { address: rd, trades: ro } : null),
            (eQ[338] = rd),
            (eQ[339] = ro),
            (eQ[340] = eH))
          : (eH = eQ[340]),
          eQ[341] !== tn ||
          eQ[342] !== tE ||
          eQ[343] !== ts ||
          eQ[344] !== rs ||
          eQ[345] !== e9 ||
          eQ[346] !== tv ||
          eQ[347] !== t0 ||
          eQ[348] !== tm ||
          eQ[349] !== tp ||
          eQ[350] !== rt ||
          eQ[351] !== to ||
          eQ[352] !== tl ||
          eQ[353] !== e7 ||
          eQ[354] !== t6 ||
          eQ[355] !== eV ||
          eQ[356] !== rT ||
          eQ[357] !== eH ||
          eQ[358] !== t$ ||
          eQ[359] !== tt ||
          eQ[360] !== t5 ||
          eQ[361] !== rl ||
          eQ[362] !== ra ||
          eQ[363] !== rr ||
          eQ[364] !== tQ.followingTrades ||
          eQ[365] !== tQ.verifiedTrades ||
          eQ[366] !== tf ||
          eQ[367] !== t2
            ? ((eJ = {
                myTradesEnabled: e7,
                devTradesEnabled: e9,
                trackedTradesEnabled: tt,
                mayhemTradesEnabled: tl,
                calloutsEnabled: ts,
                bountiesEnabled: tn,
                kolTradesEnabled: to,
                followingTradesEnabled: tm,
                verifiedTradesEnabled: tf,
                isMayhemCoin: tp,
                trades: eV,
                myTradesWalletAddress: t6,
                devTradesWalletAddress: tv,
                mayhemTradesWalletAddress: rT,
                trackedWallets: t5,
                callouts: rs,
                bounties: tE,
                traderProfileImages: ra,
                traderUsernames: rr,
                traderIdentities: rl,
                kolTrades: t$,
                kolByWallet: rt,
                followingTrades: tQ.followingTrades,
                followingByWallet: t0,
                verifiedTrades: tQ.verifiedTrades,
                verifiedWallets: t2,
                linkedWallet: eH,
              }),
              (eQ[341] = tn),
              (eQ[342] = tE),
              (eQ[343] = ts),
              (eQ[344] = rs),
              (eQ[345] = e9),
              (eQ[346] = tv),
              (eQ[347] = t0),
              (eQ[348] = tm),
              (eQ[349] = tp),
              (eQ[350] = rt),
              (eQ[351] = to),
              (eQ[352] = tl),
              (eQ[353] = e7),
              (eQ[354] = t6),
              (eQ[355] = eV),
              (eQ[356] = rT),
              (eQ[357] = eH),
              (eQ[358] = t$),
              (eQ[359] = tt),
              (eQ[360] = t5),
              (eQ[361] = rl),
              (eQ[362] = ra),
              (eQ[363] = rr),
              (eQ[364] = tQ.followingTrades),
              (eQ[365] = tQ.verifiedTrades),
              (eQ[366] = tf),
              (eQ[367] = t2),
              (eQ[368] = eJ))
            : (eJ = eQ[368]));
        let rb = eJ;
        eQ[369] !== rb
          ? ((eK = {
              chartSettingsRef: rp,
              chartInstance: e5,
              chartReadyRef: e6,
              debouncedRefreshMarks: e4,
              markerState: rb,
            }),
            (eQ[369] = rb),
            (eQ[370] = eK))
          : (eK = eQ[370]);
        let rv = eK;
        return (
          eQ[371] !== eZ || eQ[372] !== rv
            ? ((eG = (0, t.jsx)(O.Provider, { value: rv, children: eZ })),
              (eQ[371] = eZ),
              (eQ[372] = rv),
              (eQ[373] = eG))
            : (eG = eQ[373]),
          eG
        );
      },
      "E",
      0,
      () => {
        let e = (0, i.useContext)(O);
        if (!e)
          throw Error(
            "useCoinTradingViewSettings must be used within a CoinTradingViewProvider",
          );
        return e;
      },
      "r",
      0,
      () => (0, i.useContext)(O),
    ],
    838587,
  );
};
