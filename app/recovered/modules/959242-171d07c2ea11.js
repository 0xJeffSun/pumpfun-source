// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(921152);
  e.s([
    "b",
    0,
    (e, t, r) => {
      let l = "marketcap" === t ? r : 1;
      return e.map((e) => ({
        ...e,
        volume: Number(e.volume).toFixed(2),
        open: Number(e.open) * l,
        high: Number(e.high) * l,
        low: Number(e.low) * l,
        close: Number(e.close) * l,
      }));
    },
    "j",
    0,
    (e, r, l, a, o, i) => {
      let n = (0, t.v)(i, l),
        s = (0, t.K)(l, e),
        c = r.get(l);
      if (!c || c.time < n) {
        let e = c ? c.close : a,
          t = {
            time: n,
            open: e,
            high: Math.max(e, a),
            low: 0 === e && a > 0 ? a : Math.min(e, a),
            close: a,
            volume: o,
          };
        return (s.set(n, t), r.set(l, t), t);
      }
      if (c.time !== n)
        return (
          console.warn(
            `Time violation detected for interval ${l}: latestCandle.time (${c.time}) > currentIntervalTimestamp (${n}).`,
          ),
          null
        );
      {
        let e = s.get(c.time);
        return e
          ? ((e.high = Math.max(e.high, a)),
            (e.low = 0 === e.low && a > 0 ? a : Math.min(e.low, a)),
            (e.close = a),
            (e.volume += o),
            e)
          : (console.error(
              `Inconsistency: latestCandle time ${c.time} matches timestamp ${n}, but candle not found in sessionMap for interval ${l}.`,
            ),
            null);
      }
    },
    "M",
    0,
    (e, r, l, a) => {
      if (0 === e.length) return;
      let o = (0, t.K)(r, l);
      e.forEach((e) => {
        let t = {
          time: e.timestamp,
          open: e.open,
          high: e.high,
          low: e.low,
          close: e.close,
          volume: e.volume,
        };
        o.set(e.timestamp, t);
        let l = a.get(r);
        (!l || e.timestamp >= l.time) && a.set(r, t);
      });
    },
  ]);
};
