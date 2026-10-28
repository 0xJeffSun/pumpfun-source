// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(353110);
  var t = e.i(648470),
    r = e.i(292686),
    n = e.i(254667),
    u = e.i(574472),
    l = e.i(971370),
    i = e.i(352386);
  e.i(70833);
  var s = e.i(688208),
    o = e.i(328242),
    a = e.i(102824),
    c = e.i(988801),
    m = e.i(68700),
    f = e.i(363250),
    d = e.i(111740),
    p = e.i(268888),
    b = e.i(255538),
    v = e.i(97326),
    _ = e.i(143950),
    S = e.i(50133),
    k = e.i(918120),
    g = e.i(51954),
    y = e.i(674013),
    E = e.i(933256),
    B = e.i(655397),
    R = e.i(592054),
    A = e.i(887009),
    I = e.i(518664),
    P = e.i(732757),
    h = e.i(165816);
  let C = /^\d+$/,
    M = /^\d*$/,
    F = (e, t) => {
      let r = 10 ** t,
        [n, u = ""] = e.toString().split(".");
      if (!C.test(n) || !M.test(u)) return BigInt(Math.floor(e * r));
      let l = u.padEnd(t, "0").slice(0, t);
      return BigInt(`${n}${l}`);
    },
    w = (e, t) => BigInt(Math.floor(e * 10 ** t)),
    U = (e, t) => {
      let r = 10 ** t,
        n = BigInt(e.toString());
      if (n <= BigInt(0)) return 0;
      let u = Number(n) / r;
      for (let e = 0; e < 8; e++) {
        if (w(u, t) <= n && F(u, t) <= n) return u;
        let e = Math.max(Number.EPSILON * Math.max(Math.abs(u), 1), 1 / r);
        u = Math.max(0, u - e);
      }
      return Math.max(0, u - 1 / r);
    };
  e.s(
    [
      "f",
      0,
      function ({ coin: e }) {
        let [C, M] = (0, i.useState)(!0),
          w = C ? "buy" : "sell",
          { address: T, wallet: q, shouldUsePrivy: N } = (0, u.F)(),
          x = !!T && !!q,
          { solBalance: Q, solBalanceLoaded: O, usdcBalance: L } = (0, a.f)(),
          {
            bondingCurve: $,
            pool: D,
            tokenBalance: K,
            transferFeeBps: j,
          } = (0, o.g)(e.mint, e.token_program, e.quote_mint, e.pool_address),
          G = e.base_decimals ?? 6,
          H = (0, i.useMemo)(
            () => (0, B.k)($?.quoteMint ?? (0, B.H)(e)),
            [$?.quoteMint, e],
          ),
          X = (0, B.w)(H),
          W = (0, B.N)(H, e.quote_decimals),
          Z = (0, b.f)(H),
          z = (0, B.Z)(H),
          J = $?.quoteMint != null || null != e.quote_mint,
          { data: V = 0, isPending: Y = !1 } = (0, f.f)({}),
          ee = !!e.raydium_pool && !e.pump_swap_pool;
        (0, s.f)(ee ? e.mint : void 0, ee ? e.market_id : void 0);
        let { slippage: et } = (0, v.f)(),
          { tipAmount: er } = (0, k.f)(),
          { priorityFee: en } = (0, p.f)(),
          { frontRunningProtection: eu } = (0, d.f)(),
          el = (0, m.c)(e),
          { solPerToken: ei } = (function ({
            coin: e,
            slippagePercentage: t = 0,
          }) {
            let [r, n] = (0, i.useState)(0),
              u = (0, g.f)((e) => e.getQuote),
              l = e.mint,
              s = (0, i.useCallback)((e) => (0, P.f)(e, l), [l]),
              o = (0, I.f)(g.f, s),
              a = (0, i.useMemo)(() => (0, B.k)((0, B.H)(e)), [e]),
              c = (0, i.useMemo)(
                () => (0, B.N)(a, e.quote_decimals),
                [a, e.quote_decimals],
              ),
              m = (0, i.useMemo)(() => ((0, B.w)(a) ? 1e6 : 1), [a]);
            return (
              (0, i.useEffect)(() => {
                if (!o || void 0 === c) return;
                let r = !1;
                return (
                  (async () => {
                    try {
                      let l = await u({
                        direction: "sell",
                        uiAmount: m,
                        slippagePercentage: t,
                        mint: e.mint,
                        coin: e,
                      });
                      if (r || !l?.quote) return;
                      let i = Number(l.quote.amount ?? 0) / 10 ** c / m;
                      n(i);
                    } catch {}
                  })(),
                  () => {
                    r = !0;
                  }
                );
              }, [e, o, u, m, c, t]),
              { solPerToken: r }
            );
          })({ coin: e }),
          es = !!$?.complete && !D && !ee,
          eo = (0, c.f)(e, C, M, {
            resolvedQuoteMint: H.toBase58(),
            isMigrationTrade: es,
          }),
          {
            handlePlaceTradeWithInputs: ea,
            enqueueQuickTrade: ec,
            handlePlaceTrade: em,
            amount: ef,
            setAmount: ed,
            clearAmountInputAtomic: ep,
            solAmount: eb,
            setSolAmount: ev,
            nativeSelected: e_,
            setNativeSelected: eS,
            isTradeLoading: ek,
            isSolBalanceInsufficient: eg,
            isTokenBalanceInsufficient: ey,
          } = eo,
          eE = (0, i.useRef)(null),
          eB = (0, i.useCallback)(
            (e) => {
              ((eE.current = e), ev(e));
            },
            [ev],
          ),
          eR = eo.paymentAsset ?? (X ? "usdc" : "sol"),
          eA = eo.isPaymentRouted ?? !1,
          eI = eo.canChoosePaymentAsset ?? !1,
          eP = "usdc" === eR,
          eh = eP ? "USDC" : "SOL",
          eC = eP ? 6 : 9,
          eM = eA && (z || eP !== X),
          eF = !eP && V <= 0 && !Y,
          {
            mode: ew,
            setMode: eU,
            cycle: eT,
            canCycle: eq,
          } = (0, h.f)(w, eP, eF, eM, !1),
          eN = eM ? (V <= 0 ? 0 : X ? ei / V : ei * V) : ei,
          ex = (0, S.f)(e).tokenUsdPrice,
          eQ = eN > 0 ? eN : ex > 0 ? (eP ? ex : V > 0 ? ex / V : 0) : 0,
          eO = (0, i.useCallback)(
            (e) => (!eM || z ? e : V <= 0 ? 0 : X ? e / V : e * V),
            [eM, z, X, V],
          ),
          eL = (0, i.useCallback)((e) => (e === eE.current ? e : eO(e)), [eO]),
          e$ = J && (eP ? null != L : O),
          eD = (0, i.useMemo)(() => {
            if (!C || !e$) return !1;
            if (!eP) return eg;
            if (!e_ || !eb || eb <= 0) return !1;
            let e = eb * 10 ** eC;
            return (L ? Number(L.balanceRaw) : 0) < e;
          }, [C, e$, eg, eP, e_, eC, eb, L]),
          eK = (0, i.useCallback)(
            (e, t) => {
              "sell" === e ? eS(!1) : eS("token" !== t);
            },
            [eS],
          ),
          [ej, eG] = (0, i.useState)(0),
          eH = (0, g.f)((e) => e.refreshAccountsOnUse),
          eX = (0, i.useRef)(!1);
        (0, i.useEffect)(() => {
          if (!eX.current) {
            eX.current = !0;
            return;
          }
          eH(e.mint);
        }, [eH, e.mint, w, ej]);
        let eW = (0, i.useRef)(!1),
          eZ = (0, i.useRef)(!1),
          ez = (0, i.useRef)(null),
          eJ = (0, i.useCallback)((e) => (eP ? e : V > 0 ? e / V : 0), [eP, V]),
          eV = (0, i.useCallback)((e) => (eP ? e : V > 0 ? e * V : 0), [eP, V]),
          eY = (0, i.useCallback)(
            (e) => {
              (M("buy" === e),
                ed(0),
                eB(0),
                eG(0),
                (eW.current = !1),
                (eZ.current = !1),
                (ez.current = null),
                eK(e, ew));
            },
            [ew, ed, eB, eK],
          );
        ((0, i.useEffect)(() => {
          eK(w, ew);
        }, [ew, w, eK]),
          (0, i.useEffect)(() => {
            x ||
              (ed(0),
              eB(0),
              eG(0),
              (eW.current = !1),
              (eZ.current = !1),
              (ez.current = null));
          }, [x, ed, eB]));
        let [e0, e1] = (0, i.useState)(null),
          e2 = (0, i.useRef)(null),
          e3 = (0, i.useRef)(null),
          e6 = (0, i.useRef)(null),
          e5 = (0, i.useRef)(!1),
          e8 = (0, i.useRef)(!1),
          e4 = (0, i.useRef)("idle"),
          e7 = (0, i.useCallback)(() => {
            e6.current && (clearTimeout(e6.current), (e6.current = null));
          }, []),
          e9 = (0, i.useCallback)(() => {
            ((e5.current = !1),
              e2.current && (e7(), (e2.current = null)),
              (e4.current = "idle"));
          }, [e7]);
        (0, i.useEffect)(() => {
          let e = K ? K.toString() : null,
            t = e3.current;
          if (t === e) return;
          e3.current = e;
          let r = e5.current;
          e5.current = !1;
          let n = e8.current;
          ((e8.current = !1),
            r ||
              n ||
              (ed(0),
              eB(0),
              eG(0),
              (eW.current = !1),
              (eZ.current = !1),
              (ez.current = null)),
            e2.current &&
              (e1({
                side:
                  (K ? BigInt(K.toString()) : BigInt(0)) >=
                  (t ? BigInt(t) : BigInt(0))
                    ? "buy"
                    : "sell",
                key: Date.now(),
              }),
              (e2.current = null),
              (e4.current = "idle"),
              e7()));
        }, [K, ed, eB, e7]);
        let te = (0, i.useCallback)(
            (e) => {
              ((e2.current = e),
                e7(),
                (e6.current = setTimeout(() => {
                  ((e2.current = null),
                    (e5.current = !1),
                    (e4.current = "idle"),
                    (e6.current = null));
                }, 12e4)));
            },
            [e7],
          ),
          tt = (0, i.useCallback)(
            (e) => {
              (te(e), (e5.current = !0));
            },
            [te],
          );
        (0, i.useEffect)(() => () => e7(), [e7]);
        let tr = (0, i.useRef)(!1),
          tn = (0, i.useRef)(null),
          tu = (0, i.useCallback)(
            (e) => {
              let t = (0, R.n)({
                quoteTarget: e,
                paymentPerToken: eQ,
                balanceAtomic: K ? BigInt(K.toString()) : null,
                tokenDecimals: G,
                balanceUi: K ? U(K, G) : 0,
                displayDecimals: "usd" === ew ? 2 : (W ?? 9),
              });
              return (
                !!t &&
                (t.isSellAll && null !== t.atomicAmount && K
                  ? ((ez.current = K),
                    ed(t.tokensUi, { inputAtomicAmount: t.atomicAmount }))
                  : ed(t.tokensUi),
                !0)
              );
            },
            [ew, W, eQ, ed, K, G],
          ),
          tl = (0, i.useCallback)(
            (e) => {
              let t = Number.isFinite(e) && e >= 0 ? e : 0;
              if (
                ((ez.current = null),
                ep(),
                eG(t),
                (tr.current = !1),
                (tn.current = null),
                "token" === ew)
              ) {
                ((eW.current = !1), (eZ.current = !1), ed(t));
                return;
              }
              if ("sell" === w) {
                if (((eZ.current = !1), eQ <= 0)) {
                  t > 0 && (eW.current = !0);
                  return;
                }
                ((eW.current = !1), tu("sol" === ew ? t : eJ(t)) || ed(0));
                return;
              }
              if (((eW.current = !1), "sol" === ew)) {
                ((eZ.current = !1), eB(t));
                return;
              }
              ((eZ.current = t > 0 && !eP && V <= 0), eB(eJ(t)));
            },
            [ep, tu, eP, ew, w, eQ, ed, V, eB, eJ],
          ),
          ti = (0, y.g)(e.mint);
        (0, i.useEffect)(() => {
          ti &&
            x &&
            ("buy" !== w
              ? eY("buy")
              : "token" === ew
                ? eU("usd")
                : (eP || !(V <= 0)) &&
                  ((0, y.p)(e.mint),
                  (e8.current = !0),
                  tl("usd" === ew ? ti.usd : eJ(ti.usd))));
        }, [ti, x, w, ew, eP, V, e.mint, eY, eU, tl, eJ]);
        let ts = (0, i.useRef)(`${w}|${ew}`);
        (0, i.useLayoutEffect)(() => {
          let e = `${w}|${ew}`;
          if (ts.current === e) return;
          if (((ts.current = e), "token" === ew)) return void eG(ef);
          let t = eL(eb);
          "sol" === ew ? eG(t) : eG(eV(t));
        }, [ef, ew, eL, w, eb, eV]);
        let to = (0, i.useRef)(eR),
          ta = (0, i.useRef)(ew);
        (0, i.useLayoutEffect)(() => {
          let e = to.current,
            t = ta.current;
          if (
            ((to.current = eR),
            (ta.current = ew),
            e === eR || "buy" !== w || "token" === t)
          )
            return;
          let r = "usd" === t ? ej : "usdc" === e ? eb : eb * V,
            n = eJ(r);
          (eB(n), eG("sol" === ew ? n : r));
        }, [ew, eR, eB, w, eb, V, ej, eJ]);
        let tc = Q / l.LAMPORTS_PER_SOL,
          tm = L?.balance ?? 0,
          tf = eP ? tm : tc,
          td = (0, i.useMemo)(
            () => !!x && !!C && !!e$ && (0 === tf || eD),
            [C, x, e$, eD, tf],
          ),
          tp = (0, E.f)(K, G),
          tb = K?.gt(new t.BN(0)) ?? !1,
          tv = (0, i.useCallback)(
            (e, t) => {
              if (!x) return !1;
              let r = Number.isFinite(e) && e > 0 ? e : 0;
              if (r <= 0) return !0;
              if (!e$) return !1;
              let n = "usd" === t ? eJ(r) : r;
              if (n <= 0) return !0;
              if (eP) {
                let e = n * 10 ** eC;
                return (L ? Number(L.balanceRaw) : 0) < e;
              }
              return Q < n * l.LAMPORTS_PER_SOL;
            },
            [x, e$, eP, eC, Q, L, eJ],
          ),
          t_ = (0, i.useCallback)(
            (e) => {
              ez.current = e.gt(new t.BN(0)) ? e : null;
              let r = U(e, G),
                n = eQ > 0 ? r * eQ : 0;
              if (
                (eB(n),
                ed(r, {
                  inputAtomicAmount: e.gt(new t.BN(0))
                    ? BigInt(e.toString())
                    : null,
                }),
                "token" === ew)
              ) {
                (eG(r), (tr.current = !1), (tn.current = null));
                return;
              }
              ("sol" === ew ? eG(n) : eG(eV(n)),
                (tn.current = n > 0 ? n : null),
                (tr.current = !0));
            },
            [ew, eQ, ed, eB, eV, G],
          ),
          tS = (0, i.useCallback)(
            (e) => {
              if (((eW.current = !1), !K)) return;
              let t = Math.max(0, Math.min(100, e));
              t_(K.muln(Math.round(100 * t)).divn(1e4));
            },
            [t_, K],
          );
        ((0, i.useEffect)(() => {
          if (!tr.current) return;
          if ("sell" !== w) {
            ((tr.current = !1), (tn.current = null));
            return;
          }
          if (eb <= 0) return;
          if (null !== tn.current) {
            if (eb === tn.current) return;
            tn.current = null;
          }
          let e = eL(eb);
          if (!(e <= 0)) {
            if ("sol" === ew) eG(e);
            else if ("usd" === ew) {
              if (!eP && V <= 0) return;
              eG(eV(e));
            }
            ((tr.current = !1), (tn.current = null));
          }
        }, [eP, ew, eL, eV, w, eb, V]),
          (0, i.useEffect)(() => {
            if (
              "sell" !== w ||
              "token" === ew ||
              ej <= 0 ||
              eQ <= 0 ||
              (ef > 0 && !eW.current)
            )
              return;
            let e = "sol" === ew ? ej : eJ(ej);
            e <= 0 || (tu(e) && (eW.current = !1));
          }, [ef, tu, ew, eQ, w, ej, eJ]),
          (0, i.useEffect)(() => {
            if (eZ.current) {
              if ("buy" !== w || "usd" !== ew) {
                eZ.current = !1;
                return;
              }
              eP || V <= 0 || ((eZ.current = !1), ej <= 0 || eB(eJ(ej)));
            }
          }, [eP, ew, w, V, ej, eJ, eB]));
        let tk = ez.current,
          tg = "sell" === w && tk ? !K || K.lt(tk) : ey,
          ty =
            "sell" === w ? (tk ? BigInt(tk.toString()) : F(ef, G)) : BigInt(0),
          tE = (0, i.useMemo)(() => {
            if ("sell" !== w || D) return null;
            let e = (function ({ reserves: e, amountAtomic: t }) {
              return !e ||
                t <= BigInt(0) ||
                !(function ({ reserves: e, amountAtomic: t }) {
                  return (
                    (function ({ reserves: e, amountAtomic: t }) {
                      if (t <= BigInt(0)) return BigInt(0);
                      let r = e.virtualTokenReserves + t;
                      return r <= BigInt(0)
                        ? BigInt(0)
                        : (t * e.virtualQuoteReserves) / r;
                    })({ reserves: e, amountAtomic: t }) > e.realQuoteReserves
                  );
                })({ reserves: e, amountAtomic: t })
                ? null
                : {
                    maxSellableAtomic:
                      (function (e) {
                        let {
                          realQuoteReserves: t,
                          virtualQuoteReserves: r,
                          virtualTokenReserves: n,
                        } = e;
                        return t < BigInt(0) ||
                          r <= BigInt(0) ||
                          n <= BigInt(0) ||
                          t >= r
                          ? null
                          : (t * n) / (r - t);
                      })(e) ?? BigInt(0),
                    realQuoteReserves: e.realQuoteReserves,
                  };
            })({
              reserves: (function (e) {
                if (!e || e.complete) return null;
                let {
                  realQuoteReserves: t,
                  virtualQuoteReserves: r,
                  virtualTokenReserves: n,
                } = e;
                if (null == t || null == r || null == n) return null;
                try {
                  return {
                    realQuoteReserves: BigInt(t.toString()),
                    virtualQuoteReserves: BigInt(r.toString()),
                    virtualTokenReserves: BigInt(n.toString()),
                  };
                } catch {
                  return null;
                }
              })($),
              amountAtomic: ty,
            });
            return e
              ? {
                  ...e,
                  maxSellableUi: (0, E.f)(e.maxSellableAtomic.toString(), G),
                  realQuoteUi: (0, E.f)(e.realQuoteReserves.toString(), W),
                }
              : null;
          }, [$, D, W, ty, w, G]),
          tB = null !== tE,
          tR = (0, i.useRef)(null);
        (0, i.useEffect)(() => {
          tE &&
            tR.current !== e.mint &&
            ((tR.current = e.mint),
            n.y.warn("[curveSellLiquidity] sell_over_curve_liquidity", {
              mint: e.mint,
              is_mayhem_mode: $?.isMayhemMode ?? null,
              amount_atomic: ty.toString(),
              max_sellable_atomic: tE.maxSellableAtomic.toString(),
              real_quote_reserves: tE.realQuoteReserves.toString(),
              virtual_quote_reserves:
                $?.virtualQuoteReserves?.toString() ?? null,
              virtual_token_reserves:
                $?.virtualTokenReserves?.toString() ?? null,
            }));
        }, [$, e.mint, ty, tE]);
        let tA = (0, i.useCallback)(() => {
            !tE ||
              tE.maxSellableAtomic <= BigInt(0) ||
              ((eW.current = !1),
              t_(new t.BN(tE.maxSellableAtomic.toString())));
          }, [t_, tE]),
          [tI, tP] = (0, i.useState)(!1),
          th = (0, i.useCallback)(
            (e) => (tP(!0), Promise.resolve(e()).finally(() => tP(!1))),
            [],
          ),
          tC = (0, i.useCallback)(
            (e) => {
              "buy" === w && "token" !== ew && tl("usd" === ew ? eV(e) : e);
            },
            [ew, eV, tl, w],
          ),
          tM = (0, i.useCallback)(() => {
            e8.current = !1;
            let e = ez.current;
            return "sell" === w && e
              ? th(() => ea(e, !1, !1))
              : th(() => em({ onAmountClamped: tC }));
          }, [tC, em, ea, th, w]),
          tF = (0, i.useRef)(!1),
          [tw, tU] = (0, i.useState)(null),
          tT = null !== tw,
          tq = (0, i.useMemo)(
            () =>
              tw?.kind === "quick"
                ? {
                    tone: tw.tone,
                    value: tw.value,
                    sourceElement: tw.sourceElement,
                  }
                : null,
            [tw],
          ),
          { autoApprove: tN } = (0, A.f)(),
          tx = x && tN,
          tQ = (0, i.useRef)(tx);
        tQ.current = tx;
        let tO = (0, i.useCallback)((e) => {
            ((tF.current = !0), tU(e));
          }, []),
          tL = (0, i.useCallback)(() => {
            ((tF.current = !1), tU(null));
          }, []),
          t$ = (0, i.useMemo)(
            () => ({
              syncFormState: !1,
              sourceElement: r.k9.QUICK_TRADE,
              onTradeSubmitted: () => {
                e4.current = "submitted";
              },
            }),
            [],
          ),
          tD = (0, i.useCallback)(() => {
            (tL(), "idle" === e4.current && e9());
          }, [e9, tL]),
          tK = (0, i.useRef)(0),
          tj = (0, i.useRef)(new t.BN(0)),
          tG = (0, i.useCallback)((e) => {
            let r = tj.current.sub(e);
            tj.current = r.isNeg() ? new t.BN(0) : r;
          }, []),
          tH = (0, i.useCallback)(() => {
            ((tK.current = Math.max(0, tK.current - 1)),
              tK.current > 0 ||
                ((tj.current = new t.BN(0)), "idle" === e4.current && e9()));
          }, [e9]),
          tX = (0, i.useCallback)(() => {
            if (!tF.current && !ek && !(!K || K.lten(0)))
              return (
                eY("sell"),
                te("sell"),
                tO({ kind: "sell-all" }),
                th(() => ea(K, !1, !1, { sellBps: 1e4 })).finally(tL)
              );
          }, [tO, tL, ea, ek, te, th, eY, K]),
          tW = (0, i.useCallback)(() => {
            !K || K.lten(0) || tS(100);
          }, [tS, K]),
          tZ = (0, i.useCallback)(
            (e, r, n) => {
              let u = tQ.current;
              if (!u && (tF.current || ek)) return;
              let i = Number.isFinite(e) && e > 0 ? e : 0;
              if (i <= 0) return;
              let s = "usd" === r ? eJ(i) : i;
              if (tv(i, r)) return;
              let o = Math.min(
                Math.floor(s * l.LAMPORTS_PER_SOL),
                Number.MAX_SAFE_INTEGER,
              );
              if (!(o <= 0)) {
                if ((x && tt("buy"), u)) {
                  ((tK.current += 1),
                    Promise.resolve(
                      ec(new t.BN(o), !0, !0, {
                        onTradeSubmitted: t$.onTradeSubmitted,
                        sourceElement: n?.sourceElement ?? t$.sourceElement,
                      }),
                    ).finally(tH));
                  return;
                }
                return (
                  tO({
                    kind: "quick",
                    tone: "buy",
                    value: i,
                    sourceElement: n?.sourceElement ?? t$.sourceElement,
                  }),
                  Promise.resolve(
                    ea(new t.BN(o), !0, !0, {
                      ...t$,
                      sourceElement: n?.sourceElement ?? t$.sourceElement,
                    }),
                  ).finally(tD)
                );
              }
            },
            [tO, tt, ec, tD, tH, ea, x, tv, ek, t$, eJ],
          ),
          tz = (0, i.useCallback)(
            (e, t) => {
              let r = tQ.current;
              if ((!r && (tF.current || ek)) || !K || K.lten(0)) return;
              let n = Math.max(0, Math.min(100, e)),
                u = r ? K.sub(tj.current.gt(K) ? K : tj.current) : K;
              if (u.lten(0)) return;
              let l = u.muln(Math.round(100 * n)).divn(1e4);
              if (!l.lten(0)) {
                if ((x && tt("sell"), r)) {
                  ((tK.current += 1),
                    (tj.current = tj.current.add(l)),
                    Promise.resolve(
                      ec(l, !1, !1, {
                        onTradeSubmitted: t$.onTradeSubmitted,
                        sourceElement: t?.sourceElement ?? t$.sourceElement,
                      }),
                    ).finally(() => {
                      (tG(l), tH());
                    }));
                  return;
                }
                return (
                  tO({
                    kind: "quick",
                    tone: "sell",
                    value: e,
                    sourceElement: t?.sourceElement ?? t$.sourceElement,
                  }),
                  Promise.resolve(
                    ea(l, !1, !1, {
                      ...t$,
                      sourceElement: t?.sourceElement ?? t$.sourceElement,
                    }),
                  ).finally(tD)
                );
              }
            },
            [tO, tt, ec, tD, tH, ea, x, ek, t$, tG, K],
          ),
          tJ = ek && tI,
          tV = {
            coin: e,
            isLoggedIn: x,
            shouldUsePrivy: N,
            side: w,
            setSide: eY,
            mode: ew,
            setMode: eU,
            cycleMode: eT,
            canCycleMode: eq,
            solBalanceUi: tc,
            usdcBalanceUi: tm,
            quoteBalanceUi: tf,
            tokenBalanceUi: tp,
            hasTokenBalance: tb,
            solUsdPrice: V,
            slippage: et,
            tipAmount: er,
            priorityFee: en,
            frontRunningProtection: eu,
            buyAffordability: el,
            solAmount: eb,
            tokenAmount: ef,
            nativeSelected: e_,
            typedValue: ej,
            setTypedValue: tl,
            setAmountFromSellPercentage: tS,
            executeQuickBuyPreset: tZ,
            executeQuickSellPreset: tz,
            isQuickBuyPresetInsufficient: tv,
            handleSellAll: tX,
            handleSellMax: tW,
            handleSellCurveMax: tA,
            sellLiquidityCap: tE,
            isSellOverCurveLiquidity: tB,
            handlePlaceTrade: tM,
            isTradeLoading: ek,
            isFormTradeLoading: tJ,
            isSolBalanceInsufficient: eD,
            isTokenBalanceInsufficient: tg,
            isMigrationTrade: es,
            immediateTradeInFlight: tT,
            activeQuickTrade: tq,
            spamQuickTrade: tx,
            setSolAmount: ev,
            setAmount: ed,
            celebration: e0,
            markTradePending: te,
            quoteMint: H,
            quoteDecimals: W,
            quoteSymbol: Z,
            isUsdcQuote: X,
            mintTransferFeeBps: j ?? null,
            isQuoting: eo.isQuoting ?? !1,
            quoteError: eo.quoteError ?? null,
            priceImpactPercent: eo.priceImpactPercent ?? null,
            isUsdDenomUnavailable: eF,
            shouldPromptAddQuoteFunds: td,
            paymentAsset: eR,
            isUsdcPayment: eP,
            paymentTicker: eh,
            paymentDecimals: eC,
            isPaymentRouted: eA,
            isCrossCurrencyTrade: eM,
            isExoticQuote: z,
            isUntradeable: eo.isUntradeable ?? !1,
            canChoosePaymentAsset: eI && x && !es,
          };
        return (0, _.f)(tV);
      },
    ],
    463276,
  );
};
