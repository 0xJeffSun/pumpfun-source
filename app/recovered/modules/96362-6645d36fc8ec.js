// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(574472),
    r = e.i(690877),
    i = e.i(352386),
    a = e.i(349417),
    s = e.i(825015);
  let l = [3e3, 6e3, 1e4, 15e3],
    o = [12e3, 24e3],
    u = 5,
    c = 2,
    d = [1e4, 2e4, 4e4, 6e4],
    m = (({ limit: e, windowMs: t }) => {
      let n = [],
        r = (e) => {
          for (; n.length > 0 && e - (n[0] ?? e) >= t; ) n.shift();
        },
        i = (i) =>
          (r(i), n.length < e) ? 0 : Math.max(1, (n[0] ?? i) + t - i);
      return {
        waitMs: i,
        used: (e) => (r(e), n.length),
        reserve: (e) => {
          let t = i(e);
          return (0 === t && n.push(e), t);
        },
        reset: () => {
          n.length = 0;
        },
      };
    })({ limit: 20, windowMs: 6e4 }),
    f = (e) =>
      e.reason ?? new DOMException("swap-build preview aborted", "AbortError"),
    p = (e, t) =>
      new Promise((n, r) => {
        let i = () => {
            (clearTimeout(a), r(t ? f(t) : Error("aborted")));
          },
          a = setTimeout(() => {
            (t?.removeEventListener("abort", i), n());
          }, e);
        t?.addEventListener("abort", i, { once: !0 });
      }),
    g = async (e, t = m, n = () => Date.now()) => {
      for (;;) {
        if (e?.aborted) throw f(e);
        let r = t.reserve(n());
        if (0 === r) return;
        await p(r, e);
      }
    },
    h = (({
      readValue: e,
      scheduleMs: t = l,
      stepMaxMs: n = o,
      stableWithinBps: r = u,
      errorBackoffMs: i = d,
      movingFloorStep: a = c,
      budget: s = m,
      now: f = () => Date.now(),
    }) => {
      let p = new WeakMap(),
        g = t.length - 1,
        h = (e) => t[Math.min(e, g)] ?? t[0],
        v = (e) => Math.max(e, s.waitMs(f()));
      return (t) => {
        var s;
        let {
            data: l,
            dataUpdateCount: o,
            dataUpdatedAt: u,
            errorUpdateCount: c,
          } = t.state,
          d = p.get(t);
        if (!d) {
          let n = {
            dataUpdateCount: o,
            errorUpdateCount: c,
            value: void 0 === l ? null : e(l),
            step: 0,
            stepEnteredAt: o > 0 ? u : null,
            errorStreak: 0,
            intervalMs: v(h(0)),
          };
          return (p.set(t, n), n.intervalMs);
        }
        let m = o !== d.dataUpdateCount,
          f = c !== d.errorUpdateCount;
        if (!m && !f) return d.intervalMs;
        if (!m)
          return (
            (d.errorUpdateCount = c),
            (d.errorStreak += 1),
            (d.intervalMs = v(
              i[Math.min(d.errorStreak - 1, i.length - 1)] ?? i[0],
            )),
            d.intervalMs
          );
        let b = void 0 === l ? null : e(l),
          y =
            null !== d.value &&
            null !== b &&
            ((s = d.value),
            !(s <= 0) &&
              !(b <= 0) &&
              (s === b || (Math.abs(b - s) / s) * 1e4 <= r)),
          _ = n[d.step],
          w =
            null !== d.stepEnteredAt &&
            void 0 !== _ &&
            u - d.stepEnteredAt >= _,
          x = d.step;
        return (
          y || w ? (x = Math.min(x + 1, g)) : x > a && (x = a),
          (null === d.stepEnteredAt || x !== d.step) && (d.stepEnteredAt = u),
          (d.step = x),
          (d.value = b),
          (d.dataUpdateCount = o),
          (d.errorUpdateCount = c),
          (d.errorStreak = 0),
          (d.intervalMs = v(h(x))),
          d.intervalMs
        );
      };
    })({
      readValue: (e) => {
        let t = e.amountOut.atomic > 0 ? e.amountOut.atomic : e.amountOut.ui;
        return t > 0 ? t : null;
      },
    });
  class v extends Error {
    kind;
    constructor(e, t) {
      (super(t), (this.name = "SwapBuildPreviewError"), (this.kind = e));
    }
  }
  let b = {
      outputUi: null,
      minOutputUi: null,
      venue: null,
      priceImpact: null,
      transferFeeBps: null,
      pricedInputAtomic: null,
      builtDenomination: null,
      referralFeeKind: null,
      isFetching: !1,
      isError: !1,
      errorKind: null,
      isSettled: !0,
      dataUpdatedAt: 0,
    },
    y = () => "visible" === document.visibilityState && document.hasFocus(),
    _ = () => !1,
    w = (e) => (
      document.addEventListener("visibilitychange", e),
      window.addEventListener("focus", e),
      window.addEventListener("blur", e),
      () => {
        (document.removeEventListener("visibilitychange", e),
          window.removeEventListener("focus", e),
          window.removeEventListener("blur", e));
      }
    );
  function x(e, t) {
    return e.ui > 0 ? e.ui : e.atomic / 10 ** t;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          u,
          c,
          d,
          m,
          f,
          p,
          S,
          A,
          k,
          j = (0, t.c)(56),
          {
            mint: I,
            amountAtomic: B,
            isBuy: E,
            paymentAsset: $,
            outputDecimals: N,
            slippage: T,
            venueHint: M,
            enabled: U,
            paused: z,
          } = e,
          { address: C } = (0, n.F)();
        j[0] !== B ? ((o = B.toString()), (j[0] = B), (j[1] = o)) : (o = j[1]);
        let F = o,
          O = (function (e) {
            let n,
              r,
              a = (0, t.c)(4),
              [s, l] = (0, i.useState)(e);
            return (
              250 !== a[0] || a[1] !== e
                ? ((n = () => {
                    let t = setTimeout(() => l(e), 250);
                    return () => clearTimeout(t);
                  }),
                  (r = [e, 250]),
                  (a[0] = 250),
                  (a[1] = e),
                  (a[2] = n),
                  (a[3] = r))
                : ((n = a[2]), (r = a[3])),
              (0, i.useEffect)(n, r),
              s
            );
          })(F),
          P = O === F,
          K = C ?? "",
          L = U && "" !== K && B > BigInt(0) && BigInt(O) > BigInt(0);
        j[2] !== T ? ((u = (0, s.q)(T)), (j[2] = T), (j[3] = u)) : (u = j[3]);
        let D = u,
          R = (0, i.useSyncExternalStore)(w, y, _),
          q = P && !(void 0 !== z && z) && R,
          V = E ? "buy" : "sell";
        j[4] !== O ||
        j[5] !== I ||
        j[6] !== $ ||
        j[7] !== D ||
        j[8] !== V ||
        j[9] !== K ||
        j[10] !== M
          ? ((c = ["swapBuildQuotePreview", I, O, V, $, D, M, K]),
            (j[4] = O),
            (j[5] = I),
            (j[6] = $),
            (j[7] = D),
            (j[8] = V),
            (j[9] = K),
            (j[10] = M),
            (j[11] = c))
          : (c = j[11]);
        let W = c;
        j[12] !== O ||
        j[13] !== E ||
        j[14] !== I ||
        j[15] !== $ ||
        j[16] !== D ||
        j[17] !== K ||
        j[18] !== M
          ? ((d = async (e) => {
              let { signal: t } = e;
              await g(t);
              let n = await (0, a.y)(
                {
                  mint: I,
                  amount_in: (0, a.d)(BigInt(O)),
                  side: E ? "buy" : "sell",
                  denomination: $,
                  user: K,
                  slippage_bps: D,
                  compute_unit_limit: 3e5,
                  venue_hint: M,
                  fetch_user_states: !1,
                },
                { signal: t, retries: 0 },
              );
              if ("ok" === n.kind) return n.data;
              if ("insufficient_funds" === n.kind)
                throw new v("insufficient_funds", "insufficient funds");
              throw new v("failed", n.message);
            }),
            (j[12] = O),
            (j[13] = E),
            (j[14] = I),
            (j[15] = $),
            (j[16] = D),
            (j[17] = K),
            (j[18] = M),
            (j[19] = d))
          : (d = j[19]);
        let Q = !!q && h;
        j[20] !== L || j[21] !== W || j[22] !== d || j[23] !== Q
          ? ((m = {
              enabled: L,
              queryKey: W,
              queryFn: d,
              refetchInterval: Q,
              refetchIntervalInBackground: !1,
              refetchOnWindowFocus: !1,
              staleTime: 0,
              gcTime: 12e3,
              retry: !1,
            }),
            (j[20] = L),
            (j[21] = W),
            (j[22] = d),
            (j[23] = Q),
            (j[24] = m))
          : (m = j[24]);
        let J = (0, r.useQuery)(m),
          { refetch: G, dataUpdatedAt: Y, isFetching: Z, isError: H } = J,
          X = (0, i.useRef)(R);
        if (
          (j[25] !== L ||
          j[26] !== Y ||
          j[27] !== R ||
          j[28] !== H ||
          j[29] !== Z ||
          j[30] !== G ||
          j[31] !== q
            ? ((p = () => {
                let e = X.current;
                ((X.current = R),
                  !R ||
                    e ||
                    !q ||
                    !L ||
                    Z ||
                    H ||
                    Date.now() - Y < l[0] ||
                    G());
              }),
              (f = [L, Y, R, H, Z, G, q]),
              (j[25] = L),
              (j[26] = Y),
              (j[27] = R),
              (j[28] = H),
              (j[29] = Z),
              (j[30] = G),
              (j[31] = q),
              (j[32] = f),
              (j[33] = p))
            : ((f = j[32]), (p = j[33])),
          (0, i.useEffect)(p, f),
          !L)
        ) {
          let e;
          return (
            j[34] !== P
              ? ((e = P ? b : { ...b, isSettled: !1 }),
                (j[34] = P),
                (j[35] = e))
              : (e = j[35]),
            e
          );
        }
        let { data: ee } = J,
          et = J.isError && void 0 === ee;
        (j[36] !== ee || j[37] !== N
          ? ((S = ee ? x(ee.amountOut, N) : null),
            (j[36] = ee),
            (j[37] = N),
            (j[38] = S))
          : (S = j[38]),
          j[39] !== ee || j[40] !== N
            ? ((A = ee ? x(ee.minAmountOut, N) : null),
              (j[39] = ee),
              (j[40] = N),
              (j[41] = A))
            : (A = j[41]));
        let en = ee?.venue ?? null,
          er = ee?.priceImpact ?? null,
          ei = ee?.transferFeeBps ?? null,
          ea = ee?.clampedAmountIn ?? null,
          es = ee?.networkFee?.denomination ?? null,
          el = ee?.referralFeeKind ?? null,
          eo = et ? (J.error instanceof v ? J.error.kind : "failed") : null;
        return (
          j[42] !== Y ||
          j[43] !== et ||
          j[44] !== P ||
          j[45] !== J.isFetching ||
          j[46] !== S ||
          j[47] !== A ||
          j[48] !== en ||
          j[49] !== er ||
          j[50] !== ei ||
          j[51] !== ea ||
          j[52] !== es ||
          j[53] !== el ||
          j[54] !== eo
            ? ((k = {
                outputUi: S,
                minOutputUi: A,
                venue: en,
                priceImpact: er,
                transferFeeBps: ei,
                pricedInputAtomic: ea,
                builtDenomination: es,
                referralFeeKind: el,
                isFetching: J.isFetching,
                isError: et,
                errorKind: eo,
                isSettled: P,
                dataUpdatedAt: Y,
              }),
              (j[42] = Y),
              (j[43] = et),
              (j[44] = P),
              (j[45] = J.isFetching),
              (j[46] = S),
              (j[47] = A),
              (j[48] = en),
              (j[49] = er),
              (j[50] = ei),
              (j[51] = ea),
              (j[52] = es),
              (j[53] = el),
              (j[54] = eo),
              (j[55] = k))
            : (k = j[55]),
          k
        );
      },
    ],
    96362,
  );
};
