// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var l = e.i(445242),
    t = e.i(352386),
    n = e.i(83421),
    s = e.i(606933),
    r = e.i(68740),
    i = e.i(79631),
    u = e.i(175649),
    o = e.i(85324),
    a = e.i(268156),
    d = e.i(421906),
    c = e.i(311872),
    f = e.i(943141),
    m = e.i(855914),
    p = e.i(251397),
    g = e.i(381720),
    k = e.i(93903),
    h = e.i(978854),
    y = e.i(814582);
  let v = (e, l) =>
      null != e && "number" == typeof l && Number.isInteger(l) && l >= 0
        ? (0, y.C)(Number(e) / 10 ** l)
        : null,
    U = (e) => (null == e ? null : (0, y.C)(Number(e))),
    T = (e) => {
      if ("string" != typeof e) return null;
      let l = e.trim();
      return l.length > 0 ? l : null;
    },
    b = (e, l) => {
      let t = T(e.tx);
      return null == t
        ? null
        : {
            key: t,
            direction: e.type,
            tokens: U(e.baseAmount),
            usd: U(e.amountUsd),
            priceUsd: U(e.priceUsd),
            slot: T(e.slotIndexId),
            at: l,
            chainTokensAfter: null,
            sources: new Set(["nats"]),
          };
    },
    B = (e) => e ?? "anon",
    A = (e) => ({ position: (0, m.I)(e), lastEventAt: 0 }),
    w = (e, l) => {
      let t = (0, m.G)(e.position, l),
        n = "now" in l ? Math.max(e.lastEventAt, l.now) : e.lastEventAt;
      return t === e.position && n === e.lastEventAt
        ? e
        : { position: t, lastEventAt: n };
    },
    H = (e) => {
      let m,
        U,
        H,
        E,
        _,
        S,
        C,
        M,
        x,
        F,
        P,
        L,
        D,
        z,
        R,
        K,
        I,
        O,
        N,
        Z,
        G,
        q,
        J,
        W,
        j,
        $,
        V,
        Q,
        Y,
        X,
        ee,
        el,
        et,
        en,
        es = (0, l.c)(99),
        { coin: er, wallet: ei, balance: eu, priceUsd: eo, onOwnFill: ea } = e,
        { mint: ed } = er,
        ec = er.base_decimals ?? null,
        ef = (0, s.useQueryClient)();
      es[0] !== ec || es[1] !== ed || es[2] !== ei
        ? ((m = { wallet: ei, mint: ed, decimals: ec }),
          (es[0] = ec),
          (es[1] = ed),
          (es[2] = ei),
          (es[3] = m))
        : (m = es[3]);
      let [em, ep] = (0, t.useReducer)(w, m, A);
      (em.position.subject.wallet !== ei || em.position.subject.mint !== ed) &&
        ep({ type: "SUBJECT_CHANGED", wallet: ei, mint: ed, decimals: ec });
      let eg = em.position,
        [ek, eh] = (0, t.useState)(0),
        ey = ((e, l) => {
          let { ledger: t } = e;
          if (null == t || !t.reportsClosed) return null;
          let n = [];
          (t.transitionalZero &&
            n.push(
              (e.exit?.at ?? e.transitionalZeroSince ?? t.cursor.at) + p.w,
            ),
            "cc" === t.source && null == e.exit && n.push(t.cursor.at + p.W));
          let s = n.filter((e) => e > l);
          return s.length > 0 ? Math.min(...s) : null;
        })(eg, em.lastEventAt);
      (es[4] !== ey
        ? ((U = () => {
            if (null == ey) return;
            let e = setTimeout(() => eh(ey), Math.max(0, ey - Date.now()));
            return () => clearTimeout(e);
          }),
          (H = [ey]),
          (es[4] = ey),
          (es[5] = U),
          (es[6] = H))
        : ((U = es[5]), (H = es[6])),
        (0, t.useEffect)(U, H));
      let ev = Math.max(em.lastEventAt, ek);
      es[7] !== ev || es[8] !== eo || es[9] !== eg
        ? ((E = (0, n.V)(eg, { priceUsd: eo, now: ev })),
          (es[7] = ev),
          (es[8] = eo),
          (es[9] = eg),
          (es[10] = E))
        : (E = es[10]);
      let eU = E,
        eT = "open" === eU.kind ? eU.netPnlUsd : null,
        eb = (0, t.useRef)(null);
      (es[11] !== eT
        ? ((_ = () => {
            eb.current = eT;
          }),
          (S = [eT]),
          (es[11] = eT),
          (es[12] = _),
          (es[13] = S))
        : ((_ = es[12]), (S = es[13])),
        (0, t.useEffect)(_, S),
        es[14] === Symbol.for("react.memo_cache_sentinel")
          ? ((C = () => {
              let e = eb.current;
              null != e && ep({ type: "VIEW_SHOWN", netPnlUsd: e });
            }),
            (es[14] = C))
          : (C = es[14]));
      let eB = C;
      if (es[15] !== eu)
        ((M =
          "resolved" === eu.status
            ? `resolved:${eu.raw}:${eu.offAtaTokens ?? "?"}:${eu.readAt}`
            : eu.status),
          (es[15] = eu),
          (es[16] = M));
      else M = es[16];
      let eA = M;
      es[17] !== eu
        ? ((x = () => {
            (eB(), ep({ type: "BALANCE", balance: eu, now: Date.now() }));
          }),
          (es[17] = eu),
          (es[18] = x))
        : (x = es[18]);
      let ew = (0, t.useEffectEvent)(x);
      (es[19] !== ew
        ? ((F = () => {
            ew();
          }),
          (es[19] = ew),
          (es[20] = F))
        : (F = es[20]),
        es[21] !== eA
          ? ((P = [eA]), (es[21] = eA), (es[22] = P))
          : (P = es[22]),
        (0, t.useEffect)(F, P),
        es[23] === Symbol.for("react.memo_cache_sentinel")
          ? ((L = (e) => ep({ type: "POLL_TICK", now: e })),
            (D = (e) => ep({ type: "POLL_GIVE_UP", now: e })),
            (es[23] = L),
            (es[24] = D))
          : ((L = es[23]), (D = es[24])),
        es[25] !== ev || es[26] !== eg
          ? ((z = { state: eg, now: ev, onTick: L, onGiveUp: D }),
            (es[25] = ev),
            (es[26] = eg),
            (es[27] = z))
          : (z = es[27]));
      let { v2RefetchInterval: eH, armCc: eE } = (0, g.c)(z),
        e_ = (0, o.q)(eH, null != ei),
        eS = null != ei;
      es[28] !== ed || es[29] !== eS || es[30] !== e_ || es[31] !== ei
        ? ((R = { wallet: ei, mint: ed, enabled: eS, refetchInterval: e_ }),
          (es[28] = ed),
          (es[29] = eS),
          (es[30] = e_),
          (es[31] = ei),
          (es[32] = R))
        : (R = es[32]);
      let {
        data: eC,
        dataUpdatedAt: eM,
        errorUpdatedAt: ex,
        isError: eF,
        isLoading: eP,
      } = (0, u.f)(R);
      es[33] !== eM || es[34] !== eC
        ? ((K = eM > 0 ? (0, c.f)(eC, eM) : null),
          (es[33] = eM),
          (es[34] = eC),
          (es[35] = K))
        : (K = es[35]);
      let eL = K,
        eD = "empty" === eL || (eF && void 0 === eC);
      es[36] !== eg
        ? ((I = ((e) => {
            let { balance: l } = e;
            if ("resolved" !== l.status) return !1;
            let t = (0, n.J)(l) ?? 0;
            return t <= (0, p.K)(e.subject.decimals, t, e.ledger?.amountHeld);
          })(eg)),
          (es[36] = eg),
          (es[37] = I))
        : (I = es[37]);
      let ez = I,
        eR =
          null != ei &&
          eD &&
          ((ez && eg.sawHeld) ||
            "exit" === eg.poll.reason ||
            "cold-settle" === eg.poll.reason);
      (es[38] !== ed ? ((O = [ed]), (es[38] = ed), (es[39] = O)) : (O = es[39]),
        es[40] !== eR || es[41] !== O || es[42] !== ei
          ? ((N = { userId: ei, mints: O, enabled: eR, skipChainDispute: !0 }),
            (es[40] = eR),
            (es[41] = O),
            (es[42] = ei),
            (es[43] = N))
          : (N = es[43]));
      let eK = (0, i._)(N);
      es[44] !== eK || es[45] !== eR || es[46] !== ed
        ? ((Z = eR ? eK.positionFor(ed) : void 0),
          (es[44] = eK),
          (es[45] = eR),
          (es[46] = ed),
          (es[47] = Z))
        : (Z = es[47]);
      let eI = Z,
        eO = eK.dataUpdatedAt,
        eN = eR && eK.isLoading,
        eZ = eR && !eK.isLoading && !eK.isError && null == eI,
        eG = "empty" === eL && eZ && ez && eg.sawHeld,
        eq = er.created_timestamp ?? null;
      es[48] !== er.base_decimals ||
      es[49] !== er.program ||
      es[50] !== ed ||
      es[51] !== eq ||
      es[52] !== eG ||
      es[53] !== ei
        ? ((G = {
            mint: ed,
            program: er.program,
            createdTs: eq,
            walletAddress: ei,
            baseDecimals: er.base_decimals,
            enabled: eG,
          }),
          (es[48] = er.base_decimals),
          (es[49] = er.program),
          (es[50] = ed),
          (es[51] = eq),
          (es[52] = eG),
          (es[53] = ei),
          (es[54] = G))
        : (G = es[54]);
      let eJ = (0, r.I)(G),
        eW = eG ? eJ.summary : null,
        ej = eG && eJ.isLoading;
      (es[55] !== eP
        ? ((q = () => {
            eP && ep({ type: "LEDGER_LOADING" });
          }),
          (J = [eP]),
          (es[55] = eP),
          (es[56] = q),
          (es[57] = J))
        : ((q = es[56]), (J = es[57])),
        (0, t.useEffect)(q, J),
        es[58] !== ex || es[59] !== eF
          ? ((W = () => {
              0 !== ex && eF && ep({ type: "LEDGER_ERROR", now: ex });
            }),
            (j = [ex, eF]),
            (es[58] = ex),
            (es[59] = eF),
            (es[60] = W),
            (es[61] = j))
          : ((W = es[60]), (j = es[61])),
        (0, t.useEffect)(W, j),
        es[62] !== eO ||
        es[63] !== eR ||
        es[64] !== eN ||
        es[65] !== eI ||
        es[66] !== eM ||
        es[67] !== eC ||
        es[68] !== eG ||
        es[69] !== ej ||
        es[70] !== eW
          ? (($ = () => {
              if (0 === eM) return;
              let e = (0, c.f)(eC, eM);
              if ("empty" !== e)
                return void ep({ type: "LEDGER_OK", ledger: e, now: eM });
              if (!eR) return void ep({ type: "LEDGER_EMPTY", now: eM });
              if (eN) return;
              let l = Date.now();
              if (null != eI)
                return void ep({
                  type: "LEDGER_OK",
                  ledger: (0, d.f)(eI, eO > 0 ? eO : l),
                  now: l,
                });
              if (eG) {
                if (ej) return;
                let e = (0, f.f)(eW, l);
                if ("empty" !== e)
                  return void ep({ type: "LEDGER_OK", ledger: e, now: l });
              }
              ep({ type: "LEDGER_EMPTY", now: l });
            }),
            (V = [eC, eM, eR, eN, eI, eO, eG, ej, eW]),
            (es[62] = eO),
            (es[63] = eR),
            (es[64] = eN),
            (es[65] = eI),
            (es[66] = eM),
            (es[67] = eC),
            (es[68] = eG),
            (es[69] = ej),
            (es[70] = eW),
            (es[71] = $),
            (es[72] = V))
          : (($ = es[71]), (V = es[72])),
        (0, t.useEffect)($, V),
        es[73] !== ed || es[74] !== ef || es[75] !== ei
          ? ((Q = () => {
              (0, a.f)(ef, ei, ed);
            }),
            (es[73] = ed),
            (es[74] = ef),
            (es[75] = ei),
            (es[76] = Q))
          : (Q = es[76]));
      let e$ = (0, t.useEffectEvent)(Q);
      return (
        es[77] !== eE || es[78] !== e$
          ? ((Y = () => {
              eE && e$();
            }),
            (es[77] = eE),
            (es[78] = e$),
            (es[79] = Y))
          : (Y = es[79]),
        es[80] !== eE
          ? ((X = [eE]), (es[80] = eE), (es[81] = X))
          : (X = es[81]),
        (0, t.useEffect)(Y, X),
        es[82] !== ed || es[83] !== ea || es[84] !== ef || es[85] !== ei
          ? ((ee = (e) => {
              (eB(),
                ep({ type: "OWN_FILL", fill: e, now: Date.now() }),
                (0, a.f)(ef, ei, ed),
                ea?.(e));
            }),
            (es[82] = ed),
            (es[83] = ea),
            (es[84] = ef),
            (es[85] = ei),
            (es[86] = ee))
          : (ee = es[86]),
        es[87] !== ec || es[88] !== ed || es[89] !== ee || es[90] !== ei
          ? ((el = { wallet: ei, mint: ed, decimals: ec, onFill: ee }),
            (es[87] = ec),
            (es[88] = ed),
            (es[89] = ee),
            (es[90] = ei),
            (es[91] = el))
          : (el = es[91]),
        ((e) => {
          let n,
            s,
            r,
            i = (0, l.c)(11),
            { wallet: u, mint: o, decimals: a, onFill: d } = e;
          i[0] !== d
            ? ((n = (e) => {
                d(e);
              }),
              (i[0] = d),
              (i[1] = n))
            : (n = i[1]);
          let c = (0, t.useEffectEvent)(n);
          (i[2] !== a || i[3] !== c || i[4] !== o || i[5] !== u
            ? ((s = () => {
                if (!u) return;
                let e = (0, k.p)((e) => {
                    if (e.walletAddress !== u || e.mint !== o) return;
                    let l = ((e, l, t) => {
                      let n = T(e.signature);
                      if (null == n) return null;
                      let s = e.tokenDecimals ?? l,
                        r =
                          "sell" === e.direction
                            ? v(e.soldAtomic, s)
                            : v(e.boughtAtomic, s),
                        i = v(e.quoteSpentAtomic, e.quoteDecimals),
                        u = (0, y.C)(e.quoteUsd),
                        o =
                          "buy" === e.direction && null != i && null != u
                            ? i * u
                            : null;
                      return {
                        key: n,
                        direction: e.direction,
                        tokens: r,
                        usd: o,
                        priceUsd: null,
                        slot: null,
                        at: t,
                        chainTokensAfter: null,
                        sources: new Set(["tradeSuccess"]),
                      };
                    })(e, a, Date.now());
                    l && c(l);
                  }),
                  l = (0, h.a)({
                    mint: o,
                    onFlush: (e) => {
                      let l = Date.now();
                      for (let t of e) {
                        if (t.userAddress !== u) continue;
                        let e = b(t, l);
                        e && c(e);
                      }
                    },
                  });
                return () => {
                  (e(), l());
                };
              }),
              (i[2] = a),
              (i[3] = c),
              (i[4] = o),
              (i[5] = u),
              (i[6] = s))
            : (s = i[6]),
            i[7] !== a || i[8] !== o || i[9] !== u
              ? ((r = [u, o, a]),
                (i[7] = a),
                (i[8] = o),
                (i[9] = u),
                (i[10] = r))
              : (r = i[10]),
            (0, t.useEffect)(s, r));
        })(el),
        es[92] !== ei
          ? ((et = B(ei)), (es[92] = ei), (es[93] = et))
          : (et = es[93]),
        es[94] !== eg || es[95] !== et || es[96] !== eH || es[97] !== eU
          ? ((en = {
              view: eU,
              state: eg,
              dispatch: ep,
              key: et,
              pollIntervalMs: eH,
            }),
            (es[94] = eg),
            (es[95] = et),
            (es[96] = eH),
            (es[97] = eU),
            (es[98] = en))
          : (en = es[98]),
        en
      );
    };
  e.s(["f", 0, B, "_", 0, H], 249557);
  var E = e.i(540945),
    _ = e.i(575281),
    S = e.i(959719),
    C = e.i(971370),
    M = e.i(328242),
    x = e.i(431869),
    F = e.i(663628),
    P = e.i(361317),
    L = e.i(51954);
  let D = [5e3, 1e4, 2e4, 3e4],
    z = { status: "unresolved" },
    R = { status: "lost" },
    K = BigInt(0),
    I = (e, l) => Number(e) / 10 ** l,
    O = [500, 1500, 4e3, 8e3],
    N = (e) => new Promise((l) => setTimeout(l, e)),
    Z = ({ mint: e, wallet: l, tokenProgram: t }) => {
      try {
        return (0, _.h)(new C.PublicKey(e), new C.PublicKey(l), !0, t);
      } catch {
        return null;
      }
    },
    G = ({
      mint: e,
      wallet: l,
      raw: t,
      exists: n,
      tokenProgram: s,
      baseDecimals: r,
      readStartedAt: i,
    }) => {
      L.f.setState((u) => {
        if (u.currentWallet !== l) return;
        let o = u.tokenBalanceByMint[e];
        if (void 0 !== o && o.updatedAt >= i) return;
        let a =
          r ?? u.coinsByMint[e]?.mintAccount?.decodedAccount?.decimals ?? 6;
        u.tokenBalanceByMint[e] = {
          tokenProgram: s,
          balanceRaw: t,
          balance: I(t, a),
          doesTokenAccountExist: n,
          updatedAt: Date.now(),
        };
      });
    },
    q = (e, l, t) => (void 0 === t ? e !== l : "buy" === t ? e > l : e < l),
    J = async ({
      wallet: e,
      mint: l,
      baseDecimals: t,
      preTradeRaw: n,
      direction: s,
      queryClient: r,
      isCancelled: i,
    }) => {
      let u = Date.now(),
        o = 0;
      for (let a of O) {
        let d;
        if ((await N(a - o), (o = a), i())) return;
        let c = L.f.getState(),
          f = c.tokenBalanceByMint[l];
        if (void 0 !== f && f.updatedAt > u && f.balanceRaw !== n) return;
        let m = f?.tokenProgram ?? c.coinsByMint[l]?.tokenProgram ?? S.z,
          p = Z({ mint: l, wallet: e, tokenProgram: m });
        if (null === p) return;
        r.refetchQueries({
          queryKey: x.b.wallet(e, l),
          exact: !0,
          type: "active",
        });
        let g = Date.now();
        try {
          d = await c.connection.getAccountInfo(p);
        } catch {
          d = void 0;
        }
        if (i()) return;
        if (void 0 === d) continue;
        let k = (0, P.I)(d),
          h = k?.amount ?? K;
        if (
          (void 0 === n || h === n || q(h, n, s)) &&
          (G({
            mint: l,
            wallet: e,
            raw: h,
            exists: null !== k,
            tokenProgram: m,
            baseDecimals: t,
            readStartedAt: g,
          }),
          void 0 === n || h !== n)
        )
          return;
      }
    };
  function W(e) {
    return e.currentWallet;
  }
  function j(e) {
    return e + 1;
  }
  let $ = { heldBefore: !1, settleActive: !1, zeroUnexplained: !1 };
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          i,
          u,
          o,
          a,
          d,
          c,
          f = (0, l.c)(28),
          { coin: m, wallet: p } = e;
        f[0] !== m ? ((r = { coin: m }), (f[0] = m), (f[1] = r)) : (r = f[1]);
        let g = (0, E.f)(r),
          k = g > 0 ? g : null;
        f[2] !== m || f[3] !== p
          ? ((i = { coin: m, wallet: p }), (f[2] = m), (f[3] = p), (f[4] = i))
          : (i = f[4]);
        let h = ((e) => {
            let n,
              r,
              i,
              u = (0, l.c)(9),
              { coin: o, wallet: a } = e,
              d = (0, s.useQueryClient)(),
              { mint: c, base_decimals: f } = o,
              m = (0, t.useRef)(null);
            return (
              u[0] !== c || u[1] !== a
                ? ((n = () => () => {
                    let e = m.current;
                    e &&
                      e.wallet === a &&
                      e.mint === c &&
                      ((e.cancelled = !0), (m.current = null));
                  }),
                  (r = [a, c]),
                  (u[0] = c),
                  (u[1] = a),
                  (u[2] = n),
                  (u[3] = r))
                : ((n = u[2]), (r = u[3])),
              (0, t.useEffect)(n, r),
              u[4] !== f || u[5] !== c || u[6] !== d || u[7] !== a
                ? ((i = (e) => {
                    if (void 0 === a) return;
                    m.current && (m.current.cancelled = !0);
                    let l = { wallet: a, mint: c, cancelled: !1 };
                    m.current = l;
                    let t =
                      e?.preTradeRaw ??
                      L.f.getState().tokenBalanceByMint[c]?.balanceRaw;
                    J({
                      wallet: a,
                      mint: c,
                      baseDecimals: f,
                      preTradeRaw: t,
                      direction: e?.direction,
                      queryClient: d,
                      isCancelled: () => l.cancelled,
                    });
                  }),
                  (u[4] = f),
                  (u[5] = c),
                  (u[6] = d),
                  (u[7] = a),
                  (u[8] = i))
                : (i = u[8]),
              i
            );
          })(i),
          [y, v] = (0, t.useState)($);
        f[5] !== m ||
        f[6] !== y.heldBefore ||
        f[7] !== y.settleActive ||
        f[8] !== y.zeroUnexplained ||
        f[9] !== p
          ? ((u = {
              coin: m,
              wallet: p,
              heldBefore: y.heldBefore,
              settleActive: y.settleActive,
              zeroUnexplained: y.zeroUnexplained,
            }),
            (f[5] = m),
            (f[6] = y.heldBefore),
            (f[7] = y.settleActive),
            (f[8] = y.zeroUnexplained),
            (f[9] = p),
            (f[10] = u))
          : (u = f[10]);
        let U = ((e) => {
          let n,
            s,
            r,
            i,
            u,
            o,
            a,
            d = (0, l.c)(22),
            {
              coin: c,
              wallet: f,
              heldBefore: m,
              settleActive: p,
              zeroUnexplained: g,
            } = e,
            { mint: k } = c;
          (0, M.g)(k, c.token_program, c.quote_mint, c.pool_address);
          let h = (0, M.$)(k),
            y = (0, L.f)(W);
          d[0] !== k
            ? ((n = (e) =>
                e.coinsByMint[k]?.mintAccount?.decodedAccount?.decimals),
              (d[0] = k),
              (d[1] = n))
            : (n = d[1]);
          let v = (0, L.f)(n),
            U = c.base_decimals ?? v ?? 6,
            T = void 0 !== f && y === f,
            b = T ? h : void 0,
            B = b?.balanceRaw,
            A = b?.updatedAt,
            w = void 0 !== B && (B > K || m || p);
          d[2] !== k || d[3] !== w || d[4] !== f
            ? ((s = { owner: f, mint: k, enabled: w }),
              (d[2] = k),
              (d[3] = w),
              (d[4] = f),
              (d[5] = s))
            : (s = d[5]);
          let {
              amountUi: H,
              isPending: E,
              refetch: P,
            } = (function (e) {
              let t,
                n,
                s,
                r = (0, l.c)(12),
                { owner: i, mint: u, enabled: o } = e,
                a = void 0 === o || o;
              r[0] !== a || r[1] !== u || r[2] !== i
                ? ((t = { owner: i, mint: u, enabled: a }),
                  (r[0] = a),
                  (r[1] = u),
                  (r[2] = i),
                  (r[3] = t))
                : (t = r[3]);
              let { accounts: d, isPending: c, refetch: f } = (0, x.H)(t);
              r[4] !== d || r[5] !== u || r[6] !== i
                ? ((n =
                    void 0 !== d && i
                      ? (({ accounts: e, owner: l, mint: t }) => {
                          let n = (({ owner: e, mint: l }) => {
                              try {
                                let t = new C.PublicKey(e),
                                  n = new C.PublicKey(l);
                                return new Set(
                                  [S.z, S.S].map((e) =>
                                    (0, _.h)(n, t, !0, e).toBase58(),
                                  ),
                                );
                              } catch {
                                return new Set();
                              }
                            })({ owner: l, mint: t }),
                            s = 0;
                          for (let l of e) {
                            if (null === l.pubkey || n.has(l.pubkey)) continue;
                            let e = (0, F.Y)(l.amountRaw, l.decimals);
                            null !== e && e > 0 && (s += e);
                          }
                          return s;
                        })({ accounts: d, owner: i, mint: u })
                      : void 0),
                  (r[4] = d),
                  (r[5] = u),
                  (r[6] = i),
                  (r[7] = n))
                : (n = r[7]);
              let m = n;
              return (
                r[8] !== m || r[9] !== c || r[10] !== f
                  ? ((s = { amountUi: m, isPending: c, refetch: f }),
                    (r[8] = m),
                    (r[9] = c),
                    (r[10] = f),
                    (r[11] = s))
                  : (s = r[11]),
                s
              );
            })(s),
            O = w && !E && void 0 === H,
            [N, Z] = (0, t.useState)(0);
          (O || 0 === N || Z(0),
            d[6] !== P
              ? ((r = () => {
                  P();
                }),
                (d[6] = P),
                (d[7] = r))
              : (r = d[7]));
          let G = (0, t.useEffectEvent)(r);
          (d[8] !== O || d[9] !== N || d[10] !== G
            ? ((i = () => {
                if (!O) return;
                let e = setTimeout(
                  () => {
                    (Z(j), G());
                  },
                  D[Math.min(N, D.length - 1)] ?? D[0],
                );
                return () => clearTimeout(e);
              }),
              (d[8] = O),
              (d[9] = N),
              (d[10] = G),
              (d[11] = i))
            : (i = d[11]),
            d[12] !== O || d[13] !== N
              ? ((u = [O, N]), (d[12] = O), (d[13] = N), (d[14] = u))
              : (u = d[14]),
            (0, t.useEffect)(i, u));
          let q = void 0 === f ? null : `${f}:${k}`;
          d[15] !== q
            ? ((o = { key: q, resolved: !1 }), (d[15] = q), (d[16] = o))
            : (o = d[16]);
          let [J, $] = (0, t.useState)(o);
          J.key !== q
            ? $({ key: q, resolved: void 0 !== B })
            : void 0 === B || J.resolved || $({ key: q, resolved: !0 });
          let V = J.key === q && J.resolved;
          d[17] !== U || d[18] !== H || d[19] !== B || d[20] !== A
            ? ((a =
                void 0 === B || void 0 === A
                  ? null
                  : {
                      status: "resolved",
                      tokens: I(B, U),
                      raw: B,
                      offAtaTokens: H,
                      readAt: A,
                    }),
              (d[17] = U),
              (d[18] = H),
              (d[19] = B),
              (d[20] = A),
              (d[21] = a))
            : (a = d[21]);
          let Q = a;
          return T
            ? null === Q
              ? V
                ? R
                : z
              : B === K && w && void 0 === H && (E || g)
                ? z
                : Q
            : z;
        })(u);
        (f[11] !== h
          ? ((o = (e) => h({ direction: e.direction })),
            (f[11] = h),
            (f[12] = o))
          : (o = f[12]),
          f[13] !== U ||
          f[14] !== m ||
          f[15] !== k ||
          f[16] !== o ||
          f[17] !== p
            ? ((a = {
                coin: m,
                wallet: p,
                balance: U,
                priceUsd: k,
                onOwnFill: o,
              }),
              (f[13] = U),
              (f[14] = m),
              (f[15] = k),
              (f[16] = o),
              (f[17] = p),
              (f[18] = a))
            : (a = f[18]));
        let { view: T, state: b, pollIntervalMs: B } = H(a),
          A = ((e) => {
            let { ledger: l } = e;
            return {
              heldBefore: l?.heldBefore ?? !1,
              settleActive:
                "exit" === e.poll.reason ||
                "cold-settle" === e.poll.reason ||
                e.sawHeld,
              zeroUnexplained:
                null != l &&
                !l.reportsClosed &&
                (l.amountHeld ?? 0) > 0 &&
                !e.sawHeld &&
                null == e.exit,
            };
          })(b);
        return (
          (A.heldBefore !== y.heldBefore ||
            A.settleActive !== y.settleActive ||
            A.zeroUnexplained !== y.zeroUnexplained) &&
            v(A),
          f[19] !== k || f[20] !== b
            ? ((d = (0, n.i)(b, k)), (f[19] = k), (f[20] = b), (f[21] = d))
            : (d = f[21]),
          f[22] !== B ||
          f[23] !== k ||
          f[24] !== b ||
          f[25] !== d ||
          f[26] !== T
            ? ((c = {
                view: T,
                state: b,
                ledger: d,
                priceUsd: k,
                pollIntervalMs: B,
              }),
              (f[22] = B),
              (f[23] = k),
              (f[24] = b),
              (f[25] = d),
              (f[26] = T),
              (f[27] = c))
            : (c = f[27]),
          c
        );
      },
    ],
    882303,
  );
};
