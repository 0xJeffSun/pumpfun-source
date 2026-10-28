// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(921152);
  e.s([
    "b",
    0,
    (e, t, r) => {
      let i = "marketcap" === t ? r : 1;
      return e.map((e) => ({
        ...e,
        volume: Number(e.volume).toFixed(2),
        open: Number(e.open) * i,
        high: Number(e.high) * i,
        low: Number(e.low) * i,
        close: Number(e.close) * i,
      }));
    },
    "j",
    0,
    (e, r, i, l, a, n) => {
      let o = (0, t.v)(n, i),
        s = (0, t.K)(i, e),
        c = r.get(i);
      if (!c || c.time < o) {
        let e = c ? c.close : l,
          t = {
            time: o,
            open: e,
            high: Math.max(e, l),
            low: 0 === e && l > 0 ? l : Math.min(e, l),
            close: l,
            volume: a,
          };
        return (s.set(o, t), r.set(i, t), t);
      }
      if (c.time !== o)
        return (
          console.warn(
            `Time violation detected for interval ${i}: latestCandle.time (${c.time}) > currentIntervalTimestamp (${o}).`,
          ),
          null
        );
      {
        let e = s.get(c.time);
        return e
          ? ((e.high = Math.max(e.high, l)),
            (e.low = 0 === e.low && l > 0 ? l : Math.min(e.low, l)),
            (e.close = l),
            (e.volume += a),
            e)
          : (console.error(
              `Inconsistency: latestCandle time ${c.time} matches timestamp ${o}, but candle not found in sessionMap for interval ${i}.`,
            ),
            null);
      }
    },
    "M",
    0,
    (e, r, i, l) => {
      if (0 === e.length) return;
      let a = (0, t.K)(r, i);
      e.forEach((e) => {
        let t = {
          time: e.timestamp,
          open: e.open,
          high: e.high,
          low: e.low,
          close: e.close,
          volume: e.volume,
        };
        a.set(e.timestamp, t);
        let i = l.get(r);
        (!i || e.timestamp >= i.time) && l.set(r, t);
      });
    },
  ]);
};
