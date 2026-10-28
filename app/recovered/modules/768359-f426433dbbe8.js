// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(761459),
    i = e.i(352386),
    l = e.i(594483),
    r = e.i(592036),
    a = e.i(861398),
    u = e.i(940106),
    o = e.i(784521),
    s = e.i(364245),
    d = e.i(876262),
    c = e.i(889451),
    f = e.i(759257),
    p = e.i(646908),
    m = e.i(832971),
    h = e.i(674801);
  let b = (e) =>
      "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null,
    g = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    y = (e) => e.chainId === h.S && !e.isNative && !e.isExited,
    _ = (e) => {
      if (!y(e) || !0 === e.hasTransfers) return !1;
      let t = b(e.costBasisAmount);
      return (
        null !== t &&
        (Number.isFinite(e.amountHeld) ? e.amountHeld : 0) < t * (1 - m.f)
      );
    },
    v = (e) => e?.some(_) ?? !1;
  var k = e.i(906305);
  let w = (e, t, n) => {
      if (null != t && t > 0)
        return void 0 !== e && e > 0 ? e * t : null != n && n > 0 ? n : void 0;
    },
    U = ({
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
      let l = t / e;
      return {
        positionUsd: n * l,
        pnlUsd: null === i ? null : i + n * (l - 1),
      };
    },
    S = ({ entry: e, pricedAtMs: t, isEvm: n, anchorSupplyUi: i }) => {
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
      S,
      "C",
      0,
      ({ anchorMarketCapUsd: e, positionUsd: t, ...n }) => {
        if (void 0 === e || null === t) return;
        let i = S(n);
        if (void 0 !== i)
          return (
            U({
              baseMarketCapUsd: e,
              liveMarketCapUsd: i,
              positionUsd: t,
              pnlUsd: null,
            }).positionUsd ?? void 0
          );
      },
      "t",
      0,
      U,
      "P",
      0,
      w,
    ],
    459177,
  );
  var M = e.i(582453),
    P = e.i(670550),
    N = e.i(973698),
    A = e.i(528766),
    F = e.i(699365),
    T = e.i(639374),
    I = e.i(622285),
    q = e.i(333757),
    C = e.i(21617);
  let z = (e) =>
      "ASSET_CLASS_PERPETUAL" === e.assetClass ||
      e.chain === C.g ||
      null != e.perp,
    x = (e) => (0, q.M)([e])[0] ?? null;
  e.s(["F", 0, z, "l", 0, x], 888902);
  let D = {
      subject: (e) => ["userPortfolioPositions", e],
      board: (e, t, n) => ["userPortfolioPositions", e, t, n ?? "default"],
    },
    E = [],
    H = [],
    L = (e) => !0 !== e.isNative && !(0, F.P)(e.coinMint),
    $ = (e) => "number" == typeof e && Number.isFinite(e),
    B = `${P.F}${p.d}`,
    K = (e) =>
      null == e.chainId && (0, p.B)(e.chain) && (0, P.k)(e)
        ? !0 === e.isNative && e.coinMint === B
          ? e
          : { ...e, coinMint: B, isNative: !0 }
        : (0, P.V)(e);
  function R(e) {
    return (0, M.f)(e);
  }
  function O(e) {
    return (0, M.f)(e);
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
      D,
      "c",
      0,
      (e) => {
        let t, n, i;
        return {
          mint: e.coinMint,
          chainId: e.chainId,
          ...(null == e.chainId && (0, p.B)(e.chain) ? { chain: p.d } : {}),
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
            if (!z(e)) return {};
            let t = x(e);
            return { isPerp: !0, ...(t ? { perp: t } : {}) };
          })(e),
          ...((i = e), (0, I.$)(i) ? { collectible: (0, I.L)(i) } : {}),
          pnl: ((e) => {
            if (null !== e.pnlUsd)
              return {
                total_pnl: {
                  usd: e.pnlUsd,
                  percent: String(e.pnlPercentage ?? 0),
                },
              };
            let { valueUsd: t, costBasisUsd: n, realizedPnlUsd: i } = e;
            if (!(e.amountHeld > 0) || !$(t) || !$(n)) return;
            let l = t - n + ($(i) ? i : 0),
              r = e.pnlPercentage ?? (0, c.i)(l, e) ?? 0;
            return { total_pnl: { usd: l, percent: String(r) } };
          })(e),
        };
      },
      "D",
      0,
      function (e) {
        let p,
          m,
          _,
          w,
          U,
          S,
          P,
          F,
          I,
          q,
          C,
          z,
          x,
          $,
          B,
          W,
          Y,
          J,
          Z,
          ee,
          et,
          en,
          ei,
          el,
          er,
          ea,
          eu,
          eo,
          es = (0, t.c)(109),
          {
            address: ed,
            filter: ec,
            sortBy: ef,
            enabled: ep,
            subject: em,
            withCreatedMints: eh,
            includeNativeRows: eb,
            walkToEnd: eg,
          } = e,
          ey = void 0 === ec ? "open" : ec,
          e_ = void 0 === ep || ep,
          ev = void 0 === em ? "wallet" : em,
          ek = void 0 !== eh && eh,
          ew = void 0 !== eg && eg,
          eU = void 0 !== eb && eb && "open" === ey;
        es[0] !== ed || es[1] !== ey || es[2] !== ef
          ? ((p = D.board(ed, ey, ef)),
            (es[0] = ed),
            (es[1] = ey),
            (es[2] = ef),
            (es[3] = p))
          : (p = es[3]);
        let eS = !!ed && e_,
          eM = !ew;
        (es[4] !== ed
          ? ((m = (e, t) => {
              if (!t) return;
              let [, n] = t.queryKey;
              return n === ed ? e : void 0;
            }),
            (es[4] = ed),
            (es[5] = m))
          : (m = es[5]),
          es[6] !== ed || es[7] !== ey || es[8] !== ef
            ? ((_ = async (e) => {
                let { pageParam: t, signal: n } = e,
                  i = ef ?? ("open" === ey ? "POSITION_SIZE" : void 0),
                  l = await (0, f.j)()("GET /user-portfolio/{userId}", {
                    params: { userId: ed ?? "" },
                    query: { filter: ey, page: t, pageSize: 100, sortBy: i },
                    credentials: "include",
                    signal: n,
                    throwHttpErrors: !1,
                    hooks: { afterResponse: [X] },
                  });
                return { ...l, positions: (0, A.X)(l.positions) };
              }),
              (es[6] = ed),
              (es[7] = ey),
              (es[8] = ef),
              (es[9] = _))
            : (_ = es[9]),
          es[10] !== eU
            ? ((w = (e) => {
                var t;
                let n,
                  i = e.pages.flatMap(V);
                return (
                  (t = eU ? i.map(K) : i.filter(L)),
                  (n = new Set()),
                  t.filter((e) => {
                    let t = `${e.chainId ?? e.chain ?? null}:${e.coinMint}`;
                    return !n.has(t) && (n.add(t), !0);
                  })
                );
              }),
              (es[10] = eU),
              (es[11] = w))
            : (w = es[11]),
          es[12] !== m ||
          es[13] !== _ ||
          es[14] !== w ||
          es[15] !== p ||
          es[16] !== eS ||
          es[17] !== eM
            ? ((U = {
                queryKey: p,
                enabled: eS,
                staleTime: 3e4,
                refetchOnWindowFocus: eM,
                placeholderData: m,
                initialPageParam: 0,
                queryFn: _,
                getNextPageParam: G,
                select: w,
              }),
              (es[12] = m),
              (es[13] = _),
              (es[14] = w),
              (es[15] = p),
              (es[16] = eS),
              (es[17] = eM),
              (es[18] = U))
            : (U = es[18]));
        let eP = (0, n.useInfiniteQuery)(U);
        es[19] !== ey || es[20] !== eP.data
          ? ((S = "open" === ey ? (0, h.R)(eP.data?.filter(Q)) : E),
            (es[19] = ey),
            (es[20] = eP.data),
            (es[21] = S))
          : (S = es[21]);
        let eN = S,
          eA = "open" === ey;
        es[22] !== eA || es[23] !== eN
          ? ((P = { mints: eN, enabled: eA }),
            (es[22] = eA),
            (es[23] = eN),
            (es[24] = P))
          : (P = es[24]);
        let eF = (0, u.f)(P);
        es[25] !== eP.data
          ? ((F = (0, N.f)(eP.data)), (es[25] = eP.data), (es[26] = F))
          : (F = es[26]);
        let eT = F;
        es[27] !== eT
          ? ((I = { mints: eT }), (es[27] = eT), (es[28] = I))
          : (I = es[28]);
        let eI = (0, s.f)(I),
          eq = "open" === ey && "wallet" === ev,
          eC = !!ed && e_ && eq;
        es[29] !== ed || es[30] !== eC
          ? ((q = { address: ed, enabled: eC }),
            (es[29] = ed),
            (es[30] = eC),
            (es[31] = q))
          : (q = es[31]);
        let ez = (0, a.f)(q);
        es[32] !== ez || es[33] !== eq
          ? ((C = eq ? ez.filter(L) : H),
            (es[32] = ez),
            (es[33] = eq),
            (es[34] = C))
          : (C = es[34]);
        let ex = C;
        es[35] !== ey ||
        es[36] !== eP.data ||
        es[37] !== eP.hasNextPage ||
        es[38] !== ex
          ? ((z =
              "open" === ey
                ? (0, k.K)({
                    positions: eP.data,
                    holdings: ex,
                    indexedBoardComplete: !eP.hasNextPage,
                  }).map(j)
                : E),
            (es[35] = ey),
            (es[36] = eP.data),
            (es[37] = eP.hasNextPage),
            (es[38] = ex),
            (es[39] = z))
          : (z = es[39]);
        let eD = z,
          eE = "open" === ey;
        es[40] !== ed || es[41] !== eD || es[42] !== eE
          ? ((x = { address: ed, mints: eD, enabled: eE }),
            (es[40] = ed),
            (es[41] = eD),
            (es[42] = eE),
            (es[43] = x))
          : (x = es[43]);
        let { exitedMints: eH, coveredMints: eL } = (0, l.f)(x);
        es[44] !== eH || es[45] !== ex
          ? (($ =
              0 === eH.size
                ? H
                : ex.filter((e) => eH.has((0, M.f)(e.coinMint)))),
            (es[44] = eH),
            (es[45] = ex),
            (es[46] = $))
          : ($ = es[46]);
        let e$ = $,
          eB = "open" === ey;
        es[47] !== ed || es[48] !== eB || es[49] !== e$
          ? ((B = { address: ed, holdings: e$, enabled: eB }),
            (es[47] = ed),
            (es[48] = eB),
            (es[49] = e$),
            (es[50] = B))
          : (B = es[50]);
        let eK = (0, r.f)(B);
        e: {
          let e;
          if (0 === eK.size) {
            W = eH;
            break e;
          }
          (es[51] !== eH || es[52] !== eK
            ? ((e = new Set([...eH].filter((e) => !eK.has(e)))),
              (es[51] = eH),
              (es[52] = eK),
              (es[53] = e))
            : (e = es[53]),
            (W = e));
        }
        let eR = W;
        if (es[54] !== eL || es[55] !== eD || es[56] !== ex) {
          t: {
            let e, t;
            if (0 === eD.length) {
              Y = ex;
              break t;
            }
            es[58] !== eL
              ? ((e = (e) => !eL.has((0, M.f)(e))), (es[58] = eL), (es[59] = e))
              : (e = es[59]);
            let n = eD.filter(e);
            if (0 === n.length) {
              Y = ex;
              break t;
            }
            let i = new Set(n.map(O));
            if (es[60] !== i || es[61] !== ex) {
              let e;
              (es[63] !== i
                ? ((e = (e) => !i.has((0, M.f)(e.coinMint))),
                  (es[63] = i),
                  (es[64] = e))
                : (e = es[64]),
                (t = ex.filter(e)),
                (es[60] = i),
                (es[61] = ex),
                (es[62] = t));
            } else t = es[62];
            Y = t;
          }
          ((es[54] = eL), (es[55] = eD), (es[56] = ex), (es[57] = Y));
        } else Y = es[57];
        let eO = Y;
        if (
          es[65] !== eF ||
          es[66] !== eR ||
          es[67] !== eI ||
          es[68] !== eP.data ||
          es[69] !== eP.hasNextPage ||
          es[70] !== eO
        ) {
          let e =
              0 === eF.size && 0 === eI.size
                ? eP.data
                : eP.data?.filter(
                    (e) => !eF.has(e.coinMint) && !eI.has(e.coinMint),
                  ),
            t = 0 === eF.size ? eR : new Set([...eR, ...[...eF].map(R)]);
          ((J = (0, k.m)({
            positions: e,
            holdings: eO,
            indexedBoardComplete: !eP.hasNextPage,
            closedMints: t,
          })),
            (es[65] = eF),
            (es[66] = eR),
            (es[67] = eI),
            (es[68] = eP.data),
            (es[69] = eP.hasNextPage),
            (es[70] = eO),
            (es[71] = J));
        } else J = es[71];
        let ej = J;
        es[72] !== ej || es[73] !== eP.data
          ? ((Z = v(eP.data) || v(ej)),
            (es[72] = ej),
            (es[73] = eP.data),
            (es[74] = Z))
          : (Z = es[74]);
        let eQ = Z;
        es[75] !== ed || es[76] !== eq || es[77] !== eQ
          ? ((ee = eq && !!ed && (0, T.f)(ed ?? "") && eQ),
            (es[75] = ed),
            (es[76] = eq),
            (es[77] = eQ),
            (es[78] = ee))
          : (ee = es[78]);
        let eV = ee,
          eG = !!ed && e_ && eV;
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
                        if (!y(e)) return e;
                        let i = b(t.get(e.coinMint));
                        if (null === i) return e;
                        let l = Number.isFinite(e.amountHeld)
                          ? Math.max(e.amountHeld, 0)
                          : 0;
                        if (i <= l * (1 + 1e-6)) return e;
                        n = !0;
                        let r = b(e.valueUsd),
                          a =
                            b(e.tokenPriceUsd) ??
                            (null !== r && l > 0 ? r / l : null);
                        if (null === a)
                          return { ...e, amountHeld: i, heldFromChain: !0 };
                        let u = i * a,
                          o = g(e.realizedPnlUsd),
                          s = g(e.costBasisUsd),
                          d = null !== o && null !== s ? o + u - s : null,
                          f = d ?? e.pnlUsd,
                          p =
                            null !== d
                              ? ((0, c.i)(d, e) ?? e.pnlPercentage)
                              : e.pnlPercentage;
                        return {
                          ...e,
                          amountHeld: i,
                          valueUsd: u,
                          pnlUsd: f,
                          pnlPercentage: p,
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
          eY = !!ed && e_ && ek && "wallet" === ev;
        es[86] !== ed || es[87] !== eY
          ? ((ei = { address: ed, enabled: eY }),
            (es[86] = ed),
            (es[87] = eY),
            (es[88] = ei))
          : (ei = es[88]);
        let eJ = (0, o.f)(ei),
          eZ = eP.data?.length ?? 0,
          e0 = ew && !!eP.hasNextPage && eZ < 2e3 && !eP.isFetchNextPageError,
          e1 = !!ew && eP.isFetchingNextPage,
          { fetchNextPage: e6 } = eP;
        (es[89] !== e6 || es[90] !== e1 || es[91] !== e0
          ? ((el = () => {
              e0 && !e1 && e6({ cancelRefetch: !1 });
            }),
            (es[89] = e6),
            (es[90] = e1),
            (es[91] = e0),
            (es[92] = el))
          : (el = es[92]),
          es[93] !== e6 || es[94] !== e1 || es[95] !== e0 || es[96] !== eZ
            ? ((er = [e0, e1, eZ, e6]),
              (es[93] = e6),
              (es[94] = e1),
              (es[95] = e0),
              (es[96] = eZ),
              (es[97] = er))
            : (er = es[97]),
          (0, i.useEffect)(el, er),
          es[98] !== eX || es[99] !== eP
            ? ((ea = eX === eP.data ? eP : { ...eP, data: eX }),
              (es[98] = eX),
              (es[99] = eP),
              (es[100] = ea))
            : (ea = es[100]));
        let e5 = ea;
        es[101] !== e5 || es[102] !== eJ || es[103] !== ek
          ? ((eu = ek && eJ.size > 0 ? { ...e5, createdMints: eJ } : e5),
            (es[101] = e5),
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
