// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(921152);
  class r extends Error {
    status;
    fallback;
    constructor(e, t, r = null) {
      (super(e),
        (this.name = "CandleHistoryFetchError"),
        (this.status = t),
        (this.fallback = r));
    }
  }
  e.s(["F", 0, { priority: "high" }, "o", 0, [300, 900], "s", 0, r], 442951);
  let a = 300,
    i = {
      "1s": 1e3,
      "15s": 15e3,
      "30s": 3e4,
      "1m": 6e4,
      "5m": 3e5,
      "15m": 9e5,
      "1h": 36e5,
      "4h": 144e5,
      "1d": 864e5,
    },
    s = Object.keys(i),
    n = (e, t) => {
      let r = e.served.res,
        a = e.points.length;
      return r !== t
        ? { points: [], barCount: a, servedRes: r, intervalMismatch: !0 }
        : {
            points: e.points
              .flatMap((e) => {
                let t = Number(e.price);
                return Number.isFinite(e.time) && Number.isFinite(t) && t > 0
                  ? [{ time: e.time, price: t }]
                  : [];
              })
              .sort((e, t) => e.time - t.time),
            barCount: a,
            servedRes: r,
            intervalMismatch: !1,
          };
    },
    o = {
      s: 1e3,
      m: 6e4,
      h: 36e5,
      d: 864e5,
      w: 6048e5,
      mo: 2592e6,
      y: 31536e6,
    };
  e.s(
    [
      "p",
      0,
      a,
      "Y",
      0,
      2e3,
      "$",
      0,
      2,
      "H",
      0,
      36e5,
      "I",
      0,
      6e4,
      "b",
      0,
      ({ createdTs: e, timeframe: t, width: r, nowMs: n = Date.now() }) => {
        let l,
          m,
          u =
            ((m = (l = /^(\d+)\s*(mo|[smhdwy])$/i.exec(t.trim()))
              ? o[l[2].toLowerCase()]
              : void 0),
            l && m ? Number(l[1]) * m : null);
        if (null === u) return null;
        let c = n - Math.max(n - u, Number.isFinite(e) && e > 0 ? e : 0),
          d = s.find((e) => c / i[e] <= a) ?? "1d",
          h = Math.min(a, Math.max(1, Math.ceil(c / i[d])));
        return {
          res: d,
          count: h,
          maxPoints: Math.min(
            2e3,
            Math.max(2, Number.isFinite(r) ? Math.round(r) : 0),
          ),
        };
      },
      "s",
      0,
      n,
    ],
    628731,
  );
  var l = e.i(503630),
    m = e.i(99415),
    u = e.i(646908),
    c = e.i(771073),
    d = e.i(605587);
  let h = (e) => (t) => Math.floor(t / e) * e,
    p = (e) => ({ res: e, bars: 1 }),
    b = {
      "1s": p("1s"),
      "15s": p("15s"),
      "30s": p("30s"),
      "1m": p("1m"),
      "5m": p("5m"),
      "15m": p("15m"),
      "30m": { res: "15m", bars: 2, bucketStart: h(18e5) },
      "1h": p("1h"),
      "4h": p("4h"),
      "6h": p("4h"),
      "12h": { res: "4h", bars: 3, bucketStart: h(432e5) },
      "24h": p("1d"),
      "1d": p("1d"),
      "1w": { res: "1d", bars: 7, bucketStart: t.h },
    },
    f = (e) => b[e],
    y = (e, t, r) =>
      `${e.replace(/\/+$/, "")}/candles/${t}/${encodeURIComponent(r)}`,
    g = (e) => (void 0 !== e && e > 0 ? Math.floor(e) - 1 : void 0),
    v = (e) =>
      "object" == typeof e &&
      null !== e &&
      Array.isArray(e.candles) &&
      "boolean" == typeof e.hasOlder &&
      "string" == typeof e.served?.res,
    w = (e) =>
      "object" == typeof e &&
      null !== e &&
      Array.isArray(e.points) &&
      "string" == typeof e.served?.res,
    A = async (e, t, a, i) => {
      let s, n;
      try {
        s = await t(e, a);
      } catch (e) {
        if (e?.name === "AbortError") throw e;
        return {
          ok: !1,
          error: new r(
            e instanceof Error ? e.message : "candle history fetch failed",
            null,
          ),
          retryable: !0,
        };
      }
      if (!1 === s.ok) {
        let e;
        return {
          ok: !1,
          error: new r(`candle history responded ${s.status}`, s.status),
          retryable: 429 === (e = s.status) || e >= 500,
        };
      }
      try {
        n = await s.json();
      } catch {
        return {
          ok: !1,
          error: new r("candle history body was not JSON", s.status),
          retryable: !0,
        };
      }
      return i(n)
        ? { ok: !0, body: n }
        : {
            ok: !1,
            error: new r("candle history body was not a candle page", s.status),
            retryable: !0,
          };
    },
    M = (e) => new Promise((t) => setTimeout(t, e)),
    T = async (
      e,
      t,
      {
        fetchImpl: a = fetch,
        init: i,
        relay: s = !1,
        relayFetchImpl: n = fetch,
        retryDelaysMs: o = [],
        sleep: l = M,
        onRelayServed: m,
      },
    ) => {
      let u = s
          ? ((e) => {
              let t;
              try {
                t = new URL(e);
              } catch {
                return;
              }
              return `/api/swap-api${t.pathname}${t.search}`;
            })(e)
          : void 0,
        c = null,
        d = null;
      for (let r = 0; r <= o.length; r++) {
        r > 0 && (await l(o[r - 1]));
        let s = await A(e, a, i, t);
        if (s.ok) return s.body;
        if (((c = s.error), null === s.error.status && u)) {
          let e = await A(u, n, i, t);
          if (e.ok) return (m?.({ attempt: r }), e.body);
          d = e.error;
        }
        if (!s.retryable) break;
      }
      throw new r(
        c?.message ?? "candle history fetch failed",
        c?.status ?? null,
        d ? { status: d.status, message: d.message } : null,
      );
    },
    x = ({
      chainId: e,
      address: t,
      interval: r,
      measure: i,
      beforeTs: s,
      count: n = a,
      baseUrl: o,
    }) => {
      let { res: m, bars: u } = f(r);
      return (({
        baseUrl: e = (0, l.R)(),
        chainId: t,
        address: r,
        res: i,
        count: s,
        measure: n,
        beforeTs: o,
      }) => {
        let m = [
            `res=${i}`,
            `count=${Math.min(Math.max(1, Math.ceil(s)), a)}`,
            `measure=${n}`,
          ],
          u = g(o);
        return (
          void 0 !== u && m.push(`to=${u}`),
          `${y(e, t, r)}?${m.join("&")}`
        );
      })({
        baseUrl: o,
        chainId: e,
        address: t,
        res: m,
        count: n * u,
        measure: i,
        beforeTs: s,
      });
    },
    _ = async (e) =>
      ((e, t) => {
        let { res: r, bucketStart: a } = f(t),
          i = e.served.res,
          s = ((e) => {
            if ("string" != typeof e || "" === e.trim()) return;
            let t = Number(e);
            return Number.isFinite(t) && t > 0 ? t : void 0;
          })(e.supplyUsed);
        if (i !== r)
          return {
            candles: [],
            hasOlder: !1,
            servedRes: i,
            intervalMismatch: !0,
            supplyUsed: s,
          };
        let n = new Map();
        for (let t of e.candles) {
          let e = (0, c.Z)(t);
          e && n.set(e.timestamp, e);
        }
        let o = Array.from(n.values()).sort(
          (e, t) => e.timestamp - t.timestamp,
        );
        if (!a)
          return {
            candles: o,
            hasOlder: e.hasOlder,
            servedRes: i,
            intervalMismatch: !1,
            supplyUsed: s,
          };
        let l = ((e, t) => {
          let r = new Map();
          for (let a of [...e].sort((e, t) => e.timestamp - t.timestamp)) {
            let e = t(a.timestamp),
              i = r.get(e);
            if (!i) {
              r.set(e, { ...a, timestamp: e });
              continue;
            }
            ((i.high = Math.max(i.high, a.high)),
              (i.low = Math.min(i.low, a.low)),
              (i.close = a.close),
              (i.volume = Number(i.volume) + Number(a.volume)));
          }
          return Array.from(r.values()).sort(
            (e, t) => e.timestamp - t.timestamp,
          );
        })(o, a);
        return {
          candles: e.hasOlder && l.length > 1 ? l.slice(1) : l,
          hasOlder: e.hasOlder,
          servedRes: i,
          intervalMismatch: !1,
          supplyUsed: s,
        };
      })(await T(x(e), v, e), e.interval),
    k = async ({
      chainId: e,
      address: t,
      res: r,
      count: i,
      maxPoints: s,
      measure: o,
      beforeTs: m,
      baseUrl: u,
      ...c
    }) =>
      n(
        await T(
          (({
            baseUrl: e = (0, l.R)(),
            chainId: t,
            address: r,
            res: i,
            count: s,
            maxPoints: n,
            measure: o,
            beforeTs: m,
          }) => {
            let u = [
                `res=${i}`,
                `count=${Math.min(Math.max(1, Math.ceil(s)), a)}`,
                `maxPoints=${Math.min(Math.max(2, Math.round(n)), 2e3)}`,
                `measure=${o}`,
              ],
              c = g(m);
            return (
              void 0 !== c && u.push(`to=${c}`),
              `${y(e, t, r)}/line?${u.join("&")}`
            );
          })({
            baseUrl: u,
            chainId: e,
            address: t,
            res: r,
            count: i,
            maxPoints: s,
            measure: o,
            beforeTs: m,
          }),
          w,
          c,
        ),
        r,
      );
  e.s(
    [
      "W",
      0,
      (e) => ("SOL" === e ? "price_native" : "price_usd"),
      "h",
      0,
      x,
      "O",
      0,
      f,
      "U",
      0,
      ({ mint: e, chainId: t }) => {
        if ((0, u.L)(t)) return u.J;
        if ((0, u.B)(t)) return u.d;
        if ((0, u._)(t)) return u.W;
        if (!(0, d.N)({ mint: e, chainId: t })) return m.y;
        let r = (0, d.w)(t);
        return r ? `eip155:${r}` : null;
      },
      "y",
      0,
      (e) => ("6h" === e ? "4h" : e),
      "Z",
      0,
      _,
      "x",
      0,
      k,
    ],
    505835,
  );
};
