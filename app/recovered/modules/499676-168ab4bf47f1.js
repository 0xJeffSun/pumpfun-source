// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(921152),
    r = e.i(793793),
    l = e.i(896291);
  let a = 1e3,
    s = {
      "1s": "1S",
      "15s": "15S",
      "30s": "30S",
      "1m": "1",
      "5m": "5",
      "15m": "15",
      "30m": "30",
      "1h": "60",
      "4h": "240",
      "6h": "240",
      "12h": "720",
      "1d": "1D",
      "1w": "1D",
    },
    i = (e) => ("1w" === e ? "1d" : e),
    n = ({
      chartInterval: e,
      beforeTs: r,
      barCount: l = a,
      edgeQuantumSecs: s,
    }) => {
      let n = Math.max(1, (0, t.B)(i(e)) / 1e3),
        d = s ?? Math.min(10, n),
        o = Math.floor(Date.now() / 1e3),
        u = r ? Math.floor(r / 1e3) : o - (o % d);
      return { from: u - n * l, to: u, intervalSecs: n };
    },
    d = ({ open: e, high: t, low: r, close: l, volume: a }) =>
      0 === a && e === t && t === r && r === l,
    o = new Map(),
    u = new Map(),
    m = (e) => ({ ...e, records: e.records.map((e) => ({ ...e })) }),
    c = async (e) => {
      let t = new AbortController(),
        a = setTimeout(() => t.abort(), 1e4);
      try {
        let a = await fetch(e, { signal: t.signal });
        if (!a.ok) throw await (0, l.k)(a);
        let s = null;
        try {
          s = JSON.parse(await a.text());
        } catch {
          s = null;
        }
        let i = (0, r.f)(a.headers.get("cache-control"));
        return {
          ...((e) => {
            let t,
              r = { records: [], firstBucketSecs: null, lastBucketSecs: null };
            if (
              !e ||
              "object" != typeof e ||
              !(
                Array.isArray((t = e.t)) && t.every((e) => "number" == typeof e)
              )
            )
              return r;
            let l = [],
              a = null,
              s = null;
            for (let t = 0; t < e.t.length; t++) {
              let r = e.t[t];
              if (null == r) continue;
              ((null === a || r < a) && (a = r),
                (null === s || r > s) && (s = r));
              let i = e.o?.[t],
                n = e.h?.[t],
                o = e.l?.[t],
                u = e.c?.[t];
              if (null == i || null == n || null == o || null == u) continue;
              let m = e.volume?.[t],
                c = null == m ? 0 : Number(m) || 0;
              d({ open: i, high: n, low: o, close: u, volume: c }) ||
                l.push({
                  timestamp: 1e3 * r,
                  open: i,
                  high: n,
                  low: o,
                  close: u,
                  volume: c,
                });
            }
            return (
              l.sort((e, t) => e.timestamp - t.timestamp),
              { records: l, firstBucketSecs: a, lastBucketSecs: s }
            );
          })(s),
          ...(void 0 === i ? {} : { maxAgeMs: i }),
        };
      } catch (e) {
        throw (0, l.T)(e);
      } finally {
        clearTimeout(a);
      }
    },
    f = async (e) => {
      try {
        return await c(e);
      } catch (t) {
        if (!(0, l.t)(t)) throw t;
        return (await new Promise((e) => setTimeout(e, 400)), c(e));
      }
    },
    h = (e, t) => {
      let r,
        l =
          ((r = new URLSearchParams({
            poolAddress: e.poolAddress,
            chain: e.chain,
            from: String(t.from),
            to: String(t.to),
            resolution: s[e.chartInterval],
            barCount: String(a),
            ...(e.tokenAddress ? { tokenAddress: e.tokenAddress } : {}),
          })),
          `/api/relay/rpc/tokens/candles?${r.toString()}`),
        i = o.get(l);
      if (i && i.expiresAt > Date.now()) return Promise.resolve(m(i.page));
      let n = u.get(l);
      if (n) return n.then(m);
      let d = f(l)
        .then((e) => {
          if (o.size >= 64) {
            let e = o.keys().next().value;
            void 0 !== e && o.delete(e);
          }
          return (
            o.set(l, {
              expiresAt: Date.now() + Math.max(1e4, e.maxAgeMs ?? 0),
              page: e,
            }),
            e
          );
        })
        .finally(() => {
          u.delete(l);
        });
      return (u.set(l, d), d.then(m));
    },
    g = (e) => Math.max(1, (0, t.B)(i(e)) / 1e3),
    p = (e) => g(e) * ("1s" === e ? 600 : a),
    T = ["1m", "1h", "1d"],
    b = (e, t) =>
      0 === e.floorSecs ||
      t >= e.floorSecs ||
      (e.newestBeyondFloor && !e.yielded),
    v = (e, t) =>
      0 === e.floorSecs ||
      t > e.floorSecs ||
      (e.newestBeyondFloor && !e.yielded),
    y = (e, t, r) =>
      h(
        { ...e.req, chartInterval: t },
        n({ chartInterval: t, beforeTs: 1e3 * r }),
      ),
    w = (e, t, r) =>
      e.records
        .map((e) => e.timestamp / 1e3)
        .filter((e) => e >= t && e < r)
        .reverse(),
    k = (e, t, r) =>
      null === e.firstBucketSecs || null === e.lastBucketSecs
        ? [r - p(t), r]
        : [e.firstBucketSecs, e.lastBucketSecs + g(t)],
    I = (e) => "not_found" !== e.kind && "bad_request" !== e.kind,
    S = (e) => (e.retryAfterSec ? Math.min(1e3 * e.retryAfterSec, 2e3) : 400),
    M = (e, t, r, l, a) => {
      for (let s of (e.covered.push(k(t, r, l)), t.records))
        s.timestamp < e.floorMs ||
          (!e.bars.has(s.timestamp) &&
            (e.bars.set(s.timestamp, s), s.timestamp < a && (e.progress += 1)));
    },
    A = async (e, t, r, a) => {
      let s,
        i = g(e.chartInterval),
        n = T.filter((e) => g(e) > i);
      if (0 === n.length) return;
      let d = {
          req: e,
          rungs: n,
          budget: { left: 40 },
          floorSecs: a.floorSecs,
          newestBeyondFloor: a.newestBeyondFloor,
          yielded: !1,
        },
        o = g(n[0]),
        u = p(e.chartInterval),
        m = 1e3 * r,
        c = (e) => Math.min(r, e + o),
        f = (e) => t.covered.some(([t, r]) => e >= t && c(e) <= r),
        h =
          ((s = [
            {
              rungIndex: 0,
              pageEnd: r,
              startSecs: 0,
              queue: null,
              coveredFrom: 0,
            },
          ]),
          {
            next: async () => {
              for (; s.length > 0; ) {
                let e = s[s.length - 1],
                  t = d.rungs[e.rungIndex];
                if (null === e.queue) {
                  if (d.budget.left <= 0) return;
                  d.budget.left -= 1;
                  let r = await y(d, t, e.pageEnd);
                  if (
                    ((e.queue = w(r, e.startSecs, e.pageEnd)),
                    ([e.coveredFrom] = k(r, t, e.pageEnd)),
                    0 === e.queue.length)
                  ) {
                    (s.pop(),
                      0 === e.startSecs &&
                        e.rungIndex + 1 < d.rungs.length &&
                        v(d, e.coveredFrom) &&
                        s.push({
                          rungIndex: e.rungIndex + 1,
                          pageEnd: e.pageEnd,
                          startSecs: 0,
                          queue: null,
                          coveredFrom: 0,
                        }));
                    continue;
                  }
                }
                let r = e.queue.shift();
                if (void 0 === r) {
                  if (
                    e.startSecs > 0 ||
                    e.coveredFrom >= e.pageEnd ||
                    !v(d, e.coveredFrom)
                  ) {
                    s.pop();
                    continue;
                  }
                  ((e.pageEnd = e.coveredFrom), (e.queue = null));
                  continue;
                }
                if (!b(d, r)) break;
                if (0 === e.rungIndex) return ((d.yielded = !0), r);
                s.push({
                  rungIndex: e.rungIndex - 1,
                  pageEnd: Math.min(e.pageEnd, r + g(t)),
                  startSecs: r,
                  queue: null,
                  coveredFrom: 0,
                });
              }
            },
          }),
        A = [],
        U = new Set(),
        _ = !1,
        x = (e) => {
          let t = (0, l.T)(e);
          if ((0, l.o)(t)) throw t;
          return t;
        },
        W = (e) => {
          null === t.failure && (t.failure = e);
        },
        B = (t) => Promise.allSettled(t.map((t) => y(d, e.chartInterval, t)));
      for (; t.progress < 300; ) {
        let r = [],
          l = [];
        for (; r.length < 6 && !(d.budget.left <= 0); ) {
          let e = A.shift();
          if (void 0 === e) {
            if (_) break;
            try {
              e = await h.next();
            } catch (e) {
              (W(x(e)), (_ = !0));
              break;
            }
            if (void 0 === e) {
              _ = !0;
              break;
            }
          }
          if (f(e)) continue;
          let t = c(e);
          if (!U.has(t)) {
            if (r.some((r) => t <= r && e >= r - u) || d.budget.left <= 0) {
              l.push(e);
              continue;
            }
            ((d.budget.left -= 1), r.push(t));
          }
        }
        if (0 === r.length) return;
        let a = await B(r),
          s = [];
        if (
          (a.forEach((l, a) => {
            if ("fulfilled" === l.status)
              return void M(t, l.value, e.chartInterval, r[a], m);
            let i = x(l.reason);
            I(i) && s.length < d.budget.left
              ? s.push({ end: r[a], failure: i })
              : (U.add(r[a]), W(i));
          }),
          s.length > 0)
        ) {
          d.budget.left -= s.length;
          let r = Math.max(...s.map((e) => S(e.failure)));
          (await new Promise((e) => setTimeout(e, r)),
            (await B(s.map((e) => e.end))).forEach((r, l) => {
              let a = s[l].end;
              "fulfilled" === r.status
                ? M(t, r.value, e.chartInterval, a, m)
                : (W(x(r.reason)), U.add(a));
            }));
        }
        A.unshift(...l);
      }
    },
    U = async (e) => {
      let t,
        r,
        a = n(e),
        s = await h(e, a),
        i = s.maxAgeMs,
        d = e.beforeTs,
        o = void 0 === d ? 1 / 0 : 1e3 * a.to,
        u = {
          bars: new Map(),
          progress: 0,
          covered: [],
          failure: null,
          floorMs: 0,
        };
      M(u, s, e.chartInterval, a.to, o);
      let m = () => ({
        bars: [...u.bars.values()].sort((e, t) => e.timestamp - t.timestamp),
        ...(void 0 === i ? {} : { maxAgeMs: i }),
      });
      if (e.directOnly || u.progress >= 300) return m();
      let c =
        ((t = e.chartInterval),
        (r = Math.floor(Date.now() / 1e3)),
        7200 > p(t) ? r - 7200 : 0);
      if (c > 0 && void 0 !== d) {
        var f = 1e3 * c;
        for (let e of ((u.floorMs = f), [...u.bars.keys()]))
          !(e >= f) && (u.bars.delete(e), e < o && (u.progress -= 1));
        if (a.to <= c) return m();
      }
      try {
        await A(e, u, a.to, {
          floorSecs: c,
          newestBeyondFloor: void 0 === d && 0 === u.progress,
        });
      } catch (e) {
        if (0 === u.progress || (0, l.o)(e)) throw e;
        return m();
      }
      if (0 === u.progress && null !== u.failure) throw u.failure;
      return m();
    },
    _ = {
      "1S": 1,
      "15S": 15,
      "30S": 30,
      1: 60,
      5: 300,
      15: 900,
      30: 1800,
      60: 3600,
      240: 14400,
      720: 43200,
      "1D": 86400,
    },
    x = _["15S"] * a * 1e3,
    W = (e) => Number(e.volume) || 0,
    B = async (e) => {
      let t,
        r = await U(e),
        l = r.bars,
        a = _[s[e.chartInterval]],
        i = l.at(-1),
        d = 1e3 * a,
        o = Date.now(),
        u = i ? Math.floor(i.timestamp / d) * d + d : 0;
      if (void 0 !== e.beforeTs || a < 60 || !i || u > o || o - u > x) return r;
      try {
        t = await h(
          { ...e, chartInterval: "15s" },
          n({ chartInterval: "15s" }),
        );
      } catch {
        return r;
      }
      return {
        ...r,
        bars: (({ bars: e, seconds: t, barSecs: r }) => {
          let l = e.at(-1);
          if (!l) return e;
          let a = 1e3 * r,
            s = (e) => Math.floor(e / a) * a,
            i = s(l.timestamp),
            n = t.filter((e) => s(e.timestamp) > i);
          if (0 === n.length) return e;
          let d = t.filter((e) => s(e.timestamp) === i),
            o =
              0 === d.length
                ? l
                : {
                    ...l,
                    high: Math.max(l.high, ...d.map((e) => e.high)),
                    low: Math.min(l.low, ...d.map((e) => e.low)),
                    close: d[d.length - 1].close,
                    volume: Math.max(
                      W(l),
                      d.reduce((e, t) => e + W(t), 0),
                    ),
                  },
            u = [...e.slice(0, -1), o],
            m = new Map();
          for (let e of n) {
            let t = s(e.timestamp),
              r = m.get(t);
            r ? r.push(e) : m.set(t, [e]);
          }
          let c = o.close;
          for (let [e, t] of m) {
            let r = c,
              l = t[t.length - 1].close;
            (u.push({
              timestamp: e,
              open: r,
              high: Math.max(r, ...t.map((e) => e.high)),
              low: Math.min(r, ...t.map((e) => e.low)),
              close: l,
              volume: t.reduce((e, t) => e + W(t), 0),
            }),
              (c = l));
          }
          return u;
        })({ bars: l, seconds: t.records, barSecs: a }),
      };
    },
    P = async (e) => (await B(e)).bars;
  e.s(["C", 0, s, "k", 0, 10, "q", 0, P, "l", 0, B]);
};
