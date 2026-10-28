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
    p = (e) =>
      e.reason ?? new DOMException("swap-build preview aborted", "AbortError"),
    f = (e, t) =>
      new Promise((n, r) => {
        let i = () => {
            (clearTimeout(a), r(t ? p(t) : Error("aborted")));
          },
          a = setTimeout(() => {
            (t?.removeEventListener("abort", i), n());
          }, e);
        t?.addEventListener("abort", i, { once: !0 });
      }),
    g = async (e, t = m, n = () => Date.now()) => {
      for (;;) {
        if (e?.aborted) throw p(e);
        let r = t.reserve(n());
        if (0 === r) return;
        await f(r, e);
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
      now: p = () => Date.now(),
    }) => {
      let f = new WeakMap(),
        g = t.length - 1,
        h = (e) => t[Math.min(e, g)] ?? t[0],
        y = (e) => Math.max(e, s.waitMs(p()));
      return (t) => {
        var s;
        let {
            data: l,
            dataUpdateCount: o,
            dataUpdatedAt: u,
            errorUpdateCount: c,
          } = t.state,
          d = f.get(t);
        if (!d) {
          let n = {
            dataUpdateCount: o,
            errorUpdateCount: c,
            value: void 0 === l ? null : e(l),
            step: 0,
            stepEnteredAt: o > 0 ? u : null,
            errorStreak: 0,
            intervalMs: y(h(0)),
          };
          return (f.set(t, n), n.intervalMs);
        }
        let m = o !== d.dataUpdateCount,
          p = c !== d.errorUpdateCount;
        if (!m && !p) return d.intervalMs;
        if (!m)
          return (
            (d.errorUpdateCount = c),
            (d.errorStreak += 1),
            (d.intervalMs = y(
              i[Math.min(d.errorStreak - 1, i.length - 1)] ?? i[0],
            )),
            d.intervalMs
          );
        let b = void 0 === l ? null : e(l),
          v =
            null !== d.value &&
            null !== b &&
            ((s = d.value),
            !(s <= 0) &&
              !(b <= 0) &&
              (s === b || (Math.abs(b - s) / s) * 1e4 <= r)),
          x = n[d.step],
          w =
            null !== d.stepEnteredAt &&
            void 0 !== x &&
            u - d.stepEnteredAt >= x,
          _ = d.step;
        return (
          v || w ? (_ = Math.min(_ + 1, g)) : _ > a && (_ = a),
          (null === d.stepEnteredAt || _ !== d.step) && (d.stepEnteredAt = u),
          (d.step = _),
          (d.value = b),
          (d.dataUpdateCount = o),
          (d.errorUpdateCount = c),
          (d.errorStreak = 0),
          (d.intervalMs = y(h(_))),
          d.intervalMs
        );
      };
    })({
      readValue: (e) => {
        let t = e.amountOut.atomic > 0 ? e.amountOut.atomic : e.amountOut.ui;
        return t > 0 ? t : null;
      },
    });
  class y extends Error {
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
    v = () => "visible" === document.visibilityState && document.hasFocus(),
    x = () => !1,
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
  function _(e, t) {
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
          p,
          f,
          S,
          A,
          k,
          j = (0, t.c)(56),
          {
            mint: T,
            amountAtomic: $,
            isBuy: P,
            paymentAsset: B,
            outputDecimals: E,
            slippage: F,
            venueHint: I,
            enabled: U,
            paused: M,
          } = e,
          { address: C } = (0, n.F)();
        j[0] !== $ ? ((o = $.toString()), (j[0] = $), (j[1] = o)) : (o = j[1]);
        let q = o,
          N = (function (e) {
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
          })(q),
          K = N === q,
          L = C ?? "",
          R = U && "" !== L && $ > BigInt(0) && BigInt(N) > BigInt(0);
        j[2] !== F ? ((u = (0, s.q)(F)), (j[2] = F), (j[3] = u)) : (u = j[3]);
        let O = u,
          Q = (0, i.useSyncExternalStore)(w, v, x),
          D = K && !(void 0 !== M && M) && Q,
          V = P ? "buy" : "sell";
        j[4] !== N ||
        j[5] !== T ||
        j[6] !== B ||
        j[7] !== O ||
        j[8] !== V ||
        j[9] !== L ||
        j[10] !== I
          ? ((c = ["swapBuildQuotePreview", T, N, V, B, O, I, L]),
            (j[4] = N),
            (j[5] = T),
            (j[6] = B),
            (j[7] = O),
            (j[8] = V),
            (j[9] = L),
            (j[10] = I),
            (j[11] = c))
          : (c = j[11]);
        let z = c;
        j[12] !== N ||
        j[13] !== P ||
        j[14] !== T ||
        j[15] !== B ||
        j[16] !== O ||
        j[17] !== L ||
        j[18] !== I
          ? ((d = async (e) => {
              let { signal: t } = e;
              await g(t);
              let n = await (0, a.y)(
                {
                  mint: T,
                  amount_in: (0, a.d)(BigInt(N)),
                  side: P ? "buy" : "sell",
                  denomination: B,
                  user: L,
                  slippage_bps: O,
                  compute_unit_limit: 3e5,
                  venue_hint: I,
                  fetch_user_states: !1,
                },
                { signal: t, retries: 0 },
              );
              if ("ok" === n.kind) return n.data;
              if ("insufficient_funds" === n.kind)
                throw new y("insufficient_funds", "insufficient funds");
              throw new y("failed", n.message);
            }),
            (j[12] = N),
            (j[13] = P),
            (j[14] = T),
            (j[15] = B),
            (j[16] = O),
            (j[17] = L),
            (j[18] = I),
            (j[19] = d))
          : (d = j[19]);
        let W = !!D && h;
        j[20] !== R || j[21] !== z || j[22] !== d || j[23] !== W
          ? ((m = {
              enabled: R,
              queryKey: z,
              queryFn: d,
              refetchInterval: W,
              refetchIntervalInBackground: !1,
              refetchOnWindowFocus: !1,
              staleTime: 0,
              gcTime: 12e3,
              retry: !1,
            }),
            (j[20] = R),
            (j[21] = z),
            (j[22] = d),
            (j[23] = W),
            (j[24] = m))
          : (m = j[24]);
        let G = (0, r.useQuery)(m),
          { refetch: H, dataUpdatedAt: J, isFetching: X, isError: Z } = G,
          Y = (0, i.useRef)(Q);
        if (
          (j[25] !== R ||
          j[26] !== J ||
          j[27] !== Q ||
          j[28] !== Z ||
          j[29] !== X ||
          j[30] !== H ||
          j[31] !== D
            ? ((f = () => {
                let e = Y.current;
                ((Y.current = Q),
                  !Q ||
                    e ||
                    !D ||
                    !R ||
                    X ||
                    Z ||
                    Date.now() - J < l[0] ||
                    H());
              }),
              (p = [R, J, Q, Z, X, H, D]),
              (j[25] = R),
              (j[26] = J),
              (j[27] = Q),
              (j[28] = Z),
              (j[29] = X),
              (j[30] = H),
              (j[31] = D),
              (j[32] = p),
              (j[33] = f))
            : ((p = j[32]), (f = j[33])),
          (0, i.useEffect)(f, p),
          !R)
        ) {
          let e;
          return (
            j[34] !== K
              ? ((e = K ? b : { ...b, isSettled: !1 }),
                (j[34] = K),
                (j[35] = e))
              : (e = j[35]),
            e
          );
        }
        let { data: ee } = G,
          et = G.isError && void 0 === ee;
        (j[36] !== ee || j[37] !== E
          ? ((S = ee ? _(ee.amountOut, E) : null),
            (j[36] = ee),
            (j[37] = E),
            (j[38] = S))
          : (S = j[38]),
          j[39] !== ee || j[40] !== E
            ? ((A = ee ? _(ee.minAmountOut, E) : null),
              (j[39] = ee),
              (j[40] = E),
              (j[41] = A))
            : (A = j[41]));
        let en = ee?.venue ?? null,
          er = ee?.priceImpact ?? null,
          ei = ee?.transferFeeBps ?? null,
          ea = ee?.clampedAmountIn ?? null,
          es = ee?.networkFee?.denomination ?? null,
          el = ee?.referralFeeKind ?? null,
          eo = et ? (G.error instanceof y ? G.error.kind : "failed") : null;
        return (
          j[42] !== J ||
          j[43] !== et ||
          j[44] !== K ||
          j[45] !== G.isFetching ||
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
                isFetching: G.isFetching,
                isError: et,
                errorKind: eo,
                isSettled: K,
                dataUpdatedAt: J,
              }),
              (j[42] = J),
              (j[43] = et),
              (j[44] = K),
              (j[45] = G.isFetching),
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
