// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(761459),
    i = e.i(352386),
    r = e.i(594483),
    l = e.i(592036),
    a = e.i(861398),
    u = e.i(940106),
    o = e.i(784521),
    s = e.i(364245),
    d = e.i(876262),
    c = e.i(889451),
    f = e.i(759257),
    m = e.i(646908),
    p = e.i(832971),
    h = e.i(674801);
  let b = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null,
    g = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    v = (e) => e.chainId === h.S && !e.isNative && !e.isExited,
    y = (e) => {
      if (!v(e) || !0 === e.hasTransfers) return !1;
      let t = b(e.costBasisAmount);
      return (
        null !== t &&
        (Number.isFinite(e.amountHeld) ? e.amountHeld : 0) < t * (1 - p.f)
      );
    },
    _ = (e) => e?.some(y) ?? !1;
  var k = e.i(906305);
  let w = (e, t, n) => {
      if (null != t && t > 0)
        return void 0 !== e && e > 0 ? e * t : null != n && n > 0 ? n : void 0;
    },
    S = ({
      baseMarketCapUsd: e,
      liveMarketCapUsd: t,
      positionUsd: n,
      pnlUsd: i,
    }) => {
      if (
        null == e ||
        !Number.isFinite(e) ||
        e <= 0 ||
        void 0 === t ||
        !Number.isFinite(t) ||
        t <= 0 ||
        null === n
      )
        return { positionUsd: n, pnlUsd: i };
      let r = t / e;
      return {
        positionUsd: n * r,
        pnlUsd: null === i ? null : i + n * (r - 1),
      };
    },
    U = ({ entry: e, pricedAtMs: t, isEvm: n, anchorSupplyUi: i }) => {
      if (
        void 0 !== e &&
        e.isLiveData &&
        !(e.lastUpdated < t) &&
        e.usdMarketCap > 0
      )
        return n &&
          void 0 !== e.priceUsd &&
          e.priceUsd > 0 &&
          void 0 !== i &&
          i > 0
          ? e.priceUsd * i
          : e.usdMarketCap;
    };
  e.s(
    [
      "p",
      0,
      U,
      "C",
      0,
      ({ anchorMarketCapUsd: e, positionUsd: t, ...n }) => {
        if (void 0 === e || null === t) return;
        let i = U(n);
        if (void 0 !== i)
          return (
            S({
              baseMarketCapUsd: e,
              liveMarketCapUsd: i,
              positionUsd: t,
              pnlUsd: null,
            }).positionUsd ?? void 0
          );
      },
      "t",
      0,
      S,
      "P",
      0,
      w,
    ],
    459177,
  );
  var N = e.i(582453),
    M = e.i(670550),
    P = e.i(973698),
    I = e.i(528766),
    F = e.i(699365),
    E = e.i(639374),
    T = e.i(622285),
    A = e.i(333757),
    C = e.i(21617);
  let q = (e) =>
      "ASSET_CLASS_PERPETUAL" === e.assetClass ||
      e.chain === C.g ||
      null != e.perp,
    D = (e) => (0, A.M)([e])[0] ?? null;
  e.s(["F", 0, q, "l", 0, D], 888902);
  let z = {
      subject: (e) => ["userPortfolioPositions", e],
      board: (e, t, n) => ["userPortfolioPositions", e, t, n ?? "default"],
    },
    B = [],
    R = [],
    x = (e) => !0 !== e.isNative && !(0, F.P)(e.coinMint),
    H = (e) => "number" == typeof e && Number.isFinite(e),
    L = `${M.F}${m.d}`,
    O = (e) =>
      null == e.chainId && (0, m.B)(e.chain) && (0, M.k)(e)
        ? !0 === e.isNative && e.coinMint === L
          ? e
          : { ...e, coinMint: L, isNative: !0 }
        : (0, M.V)(e);
  function $(e) {
    return (0, N.f)(e);
  }
  function K(e) {
    return (0, N.f)(e);
  }
  function j(e) {
    return e.coinMint;
  }
  function Q(e) {
    return !(0, F.V)(e);
  }
  function V(e) {
    return e.positions;
  }
  function G(e, t, n) {
    return e.positions.length < 100
      ? null
      : t.reduce(W, 0) < e.summary.positionCount
        ? n + 1
        : null;
  }
  function W(e, t) {
    return e + t.positions.length;
  }
  function X(e, t, n) {
    if (!n.ok) throw Error(`Failed to fetch portfolio: ${n.status}`);
  }
  e.s(
    [
      "m",
      0,
      z,
      "c",
      0,
      (e) => {
        let t, n, i;
        return {
          mint: e.coinMint,
          chainId: e.chainId,
          ...(null == e.chainId && (0, m.B)(e.chain) ? { chain: m.d } : {}),
          balance: e.amountHeld,
          balanceUSD: e.valueUsd ?? 0,
          updatedAt: e.updatedAt ?? void 0,
          ...(e.openedAt ? { openedAt: e.openedAt } : {}),
          ...(e.coin ? { servedCoin: e.coin } : {}),
          ...((t = e.coin?.totalSupply),
          void 0 ===
            (n = w(e.tokenPriceUsd ?? void 0, t, e.coin?.marketCapUsd)) ||
          null == t
            ? {}
            : { liveAnchorMarketCapUsd: n, liveAnchorSupplyUi: t }),
          ...(null == e.valueUsd ? { quoteUnavailable: !0 } : {}),
          ...(!0 === e.isNative ? { isNative: !0 } : {}),
          ...((e) => {
            if (!q(e)) return {};
            let t = D(e);
            return { isPerp: !0, ...(t ? { perp: t } : {}) };
          })(e),
          ...((i = e), (0, T.$)(i) ? { collectible: (0, T.L)(i) } : {}),
          pnl: ((e) => {
            if (null !== e.pnlUsd)
              return {
                total_pnl: {
                  usd: e.pnlUsd,
                  percent: String(e.pnlPercentage ?? 0),
                },
              };
            let { valueUsd: t, costBasisUsd: n, realizedPnlUsd: i } = e;
            if (!(e.amountHeld > 0) || !H(t) || !H(n)) return;
            let r = t - n + (H(i) ? i : 0),
              l = e.pnlPercentage ?? (0, c.i)(r, e) ?? 0;
            return { total_pnl: { usd: r, percent: String(l) } };
          })(e),
        };
      },
      "D",
      0,
      function (e) {
        let m,
          p,
          y,
          w,
          S,
          U,
          M,
          F,
          T,
          A,
          C,
          q,
          D,
          H,
          L,
          W,
          Y,
          J,
          Z,
          ee,
          et,
          en,
          ei,
          er,
          el,
          ea,
          eu,
          eo,
          es = (0, t.c)(109),
          {
            address: ed,
            filter: ec,
            sortBy: ef,
            enabled: em,
            subject: ep,
            withCreatedMints: eh,
            includeNativeRows: eb,
            walkToEnd: eg,
          } = e,
          ev = void 0 === ec ? "open" : ec,
          ey = void 0 === em || em,
          e_ = void 0 === ep ? "wallet" : ep,
          ek = void 0 !== eh && eh,
          ew = void 0 !== eg && eg,
          eS = void 0 !== eb && eb && "open" === ev;
        es[0] !== ed || es[1] !== ev || es[2] !== ef
          ? ((m = z.board(ed, ev, ef)),
            (es[0] = ed),
            (es[1] = ev),
            (es[2] = ef),
            (es[3] = m))
          : (m = es[3]);
        let eU = !!ed && ey,
          eN = !ew;
        (es[4] !== ed
          ? ((p = (e, t) => {
              if (!t) return;
              let [, n] = t.queryKey;
              return n === ed ? e : void 0;
            }),
            (es[4] = ed),
            (es[5] = p))
          : (p = es[5]),
          es[6] !== ed || es[7] !== ev || es[8] !== ef
            ? ((y = async (e) => {
                let { pageParam: t, signal: n } = e,
                  i = ef ?? ("open" === ev ? "POSITION_SIZE" : void 0),
                  r = await (0, f.j)()("GET /user-portfolio/{userId}", {
                    params: { userId: ed ?? "" },
                    query: { filter: ev, page: t, pageSize: 100, sortBy: i },
                    credentials: "include",
                    signal: n,
                    throwHttpErrors: !1,
                    hooks: { afterResponse: [X] },
                  });
                return { ...r, positions: (0, I.X)(r.positions) };
              }),
              (es[6] = ed),
              (es[7] = ev),
              (es[8] = ef),
              (es[9] = y))
            : (y = es[9]),
          es[10] !== eS
            ? ((w = (e) => {
                var t;
                let n,
                  i = e.pages.flatMap(V);
                return (
                  (t = eS ? i.map(O) : i.filter(x)),
                  (n = new Set()),
                  t.filter((e) => {
                    let t = `${e.chainId ?? e.chain ?? null}:${e.coinMint}`;
                    return !n.has(t) && (n.add(t), !0);
                  })
                );
              }),
              (es[10] = eS),
              (es[11] = w))
            : (w = es[11]),
          es[12] !== p ||
          es[13] !== y ||
          es[14] !== w ||
          es[15] !== m ||
          es[16] !== eU ||
          es[17] !== eN
            ? ((S = {
                queryKey: m,
                enabled: eU,
                staleTime: 3e4,
                refetchOnWindowFocus: eN,
                placeholderData: p,
                initialPageParam: 0,
                queryFn: y,
                getNextPageParam: G,
                select: w,
              }),
              (es[12] = p),
              (es[13] = y),
              (es[14] = w),
              (es[15] = m),
              (es[16] = eU),
              (es[17] = eN),
              (es[18] = S))
            : (S = es[18]));
        let eM = (0, n.useInfiniteQuery)(S);
        es[19] !== ev || es[20] !== eM.data
          ? ((U = "open" === ev ? (0, h.R)(eM.data?.filter(Q)) : B),
            (es[19] = ev),
            (es[20] = eM.data),
            (es[21] = U))
          : (U = es[21]);
        let eP = U,
          eI = "open" === ev;
        es[22] !== eI || es[23] !== eP
          ? ((M = { mints: eP, enabled: eI }),
            (es[22] = eI),
            (es[23] = eP),
            (es[24] = M))
          : (M = es[24]);
        let eF = (0, u.f)(M);
        es[25] !== eM.data
          ? ((F = (0, P.f)(eM.data)), (es[25] = eM.data), (es[26] = F))
          : (F = es[26]);
        let eE = F;
        es[27] !== eE
          ? ((T = { mints: eE }), (es[27] = eE), (es[28] = T))
          : (T = es[28]);
        let eT = (0, s.f)(T),
          eA = "open" === ev && "wallet" === e_,
          eC = !!ed && ey && eA;
        es[29] !== ed || es[30] !== eC
          ? ((A = { address: ed, enabled: eC }),
            (es[29] = ed),
            (es[30] = eC),
            (es[31] = A))
          : (A = es[31]);
        let eq = (0, a.f)(A);
        es[32] !== eq || es[33] !== eA
          ? ((C = eA ? eq.filter(x) : R),
            (es[32] = eq),
            (es[33] = eA),
            (es[34] = C))
          : (C = es[34]);
        let eD = C;
        es[35] !== ev ||
        es[36] !== eM.data ||
        es[37] !== eM.hasNextPage ||
        es[38] !== eD
          ? ((q =
              "open" === ev
                ? (0, k.K)({
                    positions: eM.data,
                    holdings: eD,
                    indexedBoardComplete: !eM.hasNextPage,
                  }).map(j)
                : B),
            (es[35] = ev),
            (es[36] = eM.data),
            (es[37] = eM.hasNextPage),
            (es[38] = eD),
            (es[39] = q))
          : (q = es[39]);
        let ez = q,
          eB = "open" === ev;
        es[40] !== ed || es[41] !== ez || es[42] !== eB
          ? ((D = { address: ed, mints: ez, enabled: eB }),
            (es[40] = ed),
            (es[41] = ez),
            (es[42] = eB),
            (es[43] = D))
          : (D = es[43]);
        let { exitedMints: eR, coveredMints: ex } = (0, r.f)(D);
        es[44] !== eR || es[45] !== eD
          ? ((H =
              0 === eR.size
                ? R
                : eD.filter((e) => eR.has((0, N.f)(e.coinMint)))),
            (es[44] = eR),
            (es[45] = eD),
            (es[46] = H))
          : (H = es[46]);
        let eH = H,
          eL = "open" === ev;
        es[47] !== ed || es[48] !== eL || es[49] !== eH
          ? ((L = { address: ed, holdings: eH, enabled: eL }),
            (es[47] = ed),
            (es[48] = eL),
            (es[49] = eH),
            (es[50] = L))
          : (L = es[50]);
        let eO = (0, l.f)(L);
        e: {
          let e;
          if (0 === eO.size) {
            W = eR;
            break e;
          }
          (es[51] !== eR || es[52] !== eO
            ? ((e = new Set([...eR].filter((e) => !eO.has(e)))),
              (es[51] = eR),
              (es[52] = eO),
              (es[53] = e))
            : (e = es[53]),
            (W = e));
        }
        let e$ = W;
        if (es[54] !== ex || es[55] !== ez || es[56] !== eD) {
          t: {
            let e, t;
            if (0 === ez.length) {
              Y = eD;
              break t;
            }
            es[58] !== ex
              ? ((e = (e) => !ex.has((0, N.f)(e))), (es[58] = ex), (es[59] = e))
              : (e = es[59]);
            let n = ez.filter(e);
            if (0 === n.length) {
              Y = eD;
              break t;
            }
            let i = new Set(n.map(K));
            if (es[60] !== i || es[61] !== eD) {
              let e;
              (es[63] !== i
                ? ((e = (e) => !i.has((0, N.f)(e.coinMint))),
                  (es[63] = i),
                  (es[64] = e))
                : (e = es[64]),
                (t = eD.filter(e)),
                (es[60] = i),
                (es[61] = eD),
                (es[62] = t));
            } else t = es[62];
            Y = t;
          }
          ((es[54] = ex), (es[55] = ez), (es[56] = eD), (es[57] = Y));
        } else Y = es[57];
        let eK = Y;
        if (
          es[65] !== eF ||
          es[66] !== e$ ||
          es[67] !== eT ||
          es[68] !== eM.data ||
          es[69] !== eM.hasNextPage ||
          es[70] !== eK
        ) {
          let e =
              0 === eF.size && 0 === eT.size
                ? eM.data
                : eM.data?.filter(
                    (e) => !eF.has(e.coinMint) && !eT.has(e.coinMint),
                  ),
            t = 0 === eF.size ? e$ : new Set([...e$, ...[...eF].map($)]);
          ((J = (0, k.m)({
            positions: e,
            holdings: eK,
            indexedBoardComplete: !eM.hasNextPage,
            closedMints: t,
          })),
            (es[65] = eF),
            (es[66] = e$),
            (es[67] = eT),
            (es[68] = eM.data),
            (es[69] = eM.hasNextPage),
            (es[70] = eK),
            (es[71] = J));
        } else J = es[71];
        let ej = J;
        es[72] !== ej || es[73] !== eM.data
          ? ((Z = _(eM.data) || _(ej)),
            (es[72] = ej),
            (es[73] = eM.data),
            (es[74] = Z))
          : (Z = es[74]);
        let eQ = Z;
        es[75] !== ed || es[76] !== eA || es[77] !== eQ
          ? ((ee = eA && !!ed && (0, E.f)(ed ?? "") && eQ),
            (es[75] = ed),
            (es[76] = eA),
            (es[77] = eQ),
            (es[78] = ee))
          : (ee = es[78]);
        let eV = ee,
          eG = !!ed && ey && eV;
        es[79] !== ed || es[80] !== eG
          ? ((et = { owner: ed, enabled: eG }),
            (es[79] = ed),
            (es[80] = eG),
            (es[81] = et))
          : (et = es[81]);
        let eW = (0, d.q)(et);
        es[82] !== ej || es[83] !== eW || es[84] !== eV
          ? ((en =
              ej && eV
                ? (({ positions: e, totals: t }) => {
                    if (!t?.size) return e;
                    let n = !1,
                      i = e.map((e) => {
                        if (!v(e)) return e;
                        let i = b(t.get(e.coinMint));
                        if (null === i) return e;
                        let r = Number.isFinite(e.amountHeld)
                          ? Math.max(e.amountHeld, 0)
                          : 0;
                        if (i <= r * (1 + 1e-6)) return e;
                        n = !0;
                        let l = b(e.valueUsd),
                          a =
                            b(e.tokenPriceUsd) ??
                            (null !== l && r > 0 ? l / r : null);
                        if (null === a)
                          return { ...e, amountHeld: i, heldFromChain: !0 };
                        let u = i * a,
                          o = g(e.realizedPnlUsd),
                          s = g(e.costBasisUsd),
                          d = null !== o && null !== s ? o + u - s : null,
                          f = d ?? e.pnlUsd,
                          m =
                            null !== d
                              ? ((0, c.i)(d, e) ?? e.pnlPercentage)
                              : e.pnlPercentage;
                        return {
                          ...e,
                          amountHeld: i,
                          valueUsd: u,
                          pnlUsd: f,
                          pnlPercentage: m,
                          heldFromChain: !0,
                        };
                      });
                    return n ? i : e;
                  })({ positions: ej, totals: eW })
                : ej),
            (es[82] = ej),
            (es[83] = eW),
            (es[84] = eV),
            (es[85] = en))
          : (en = es[85]);
        let eX = en,
          eY = !!ed && ey && ek && "wallet" === e_;
        es[86] !== ed || es[87] !== eY
          ? ((ei = { address: ed, enabled: eY }),
            (es[86] = ed),
            (es[87] = eY),
            (es[88] = ei))
          : (ei = es[88]);
        let eJ = (0, o.f)(ei),
          eZ = eM.data?.length ?? 0,
          e0 = ew && !!eM.hasNextPage && eZ < 2e3 && !eM.isFetchNextPageError,
          e1 = !!ew && eM.isFetchingNextPage,
          { fetchNextPage: e5 } = eM;
        (es[89] !== e5 || es[90] !== e1 || es[91] !== e0
          ? ((er = () => {
              e0 && !e1 && e5({ cancelRefetch: !1 });
            }),
            (es[89] = e5),
            (es[90] = e1),
            (es[91] = e0),
            (es[92] = er))
          : (er = es[92]),
          es[93] !== e5 || es[94] !== e1 || es[95] !== e0 || es[96] !== eZ
            ? ((el = [e0, e1, eZ, e5]),
              (es[93] = e5),
              (es[94] = e1),
              (es[95] = e0),
              (es[96] = eZ),
              (es[97] = el))
            : (el = es[97]),
          (0, i.useEffect)(er, el),
          es[98] !== eX || es[99] !== eM
            ? ((ea = eX === eM.data ? eM : { ...eM, data: eX }),
              (es[98] = eX),
              (es[99] = eM),
              (es[100] = ea))
            : (ea = es[100]));
        let e6 = ea;
        es[101] !== e6 || es[102] !== eJ || es[103] !== ek
          ? ((eu = ek && eJ.size > 0 ? { ...e6, createdMints: eJ } : e6),
            (es[101] = e6),
            (es[102] = eJ),
            (es[103] = ek),
            (es[104] = eu))
          : (eu = es[104]);
        let e4 = eu;
        return (
          es[105] !== e0 || es[106] !== e4 || es[107] !== ew
            ? ((eo = ew ? { ...e4, isWalkingToEnd: e0 } : e4),
              (es[105] = e0),
              (es[106] = e4),
              (es[107] = ew),
              (es[108] = eo))
            : (eo = es[108]),
          eo
        );
      },
    ],
    768359,
  );
};
