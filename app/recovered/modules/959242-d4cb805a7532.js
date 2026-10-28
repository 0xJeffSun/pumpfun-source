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
    (e, r, l, o, i, a) => {
      let n = (0, t.v)(a, l),
        s = (0, t.K)(l, e),
        c = r.get(l);
      if (!c || c.time < n) {
        let e = c ? c.close : o,
          t = {
            time: n,
            open: e,
            high: Math.max(e, o),
            low: 0 === e && o > 0 ? o : Math.min(e, o),
            close: o,
            volume: i,
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
          ? ((e.high = Math.max(e.high, o)),
            (e.low = 0 === e.low && o > 0 ? o : Math.min(e.low, o)),
            (e.close = o),
            (e.volume += i),
            e)
          : (console.error(
              `Inconsistency: latestCandle time ${c.time} matches timestamp ${n}, but candle not found in sessionMap for interval ${l}.`,
            ),
            null);
      }
    },
    "M",
    0,
    (e, r, l, o) => {
      if (0 === e.length) return;
      let i = (0, t.K)(r, l);
      e.forEach((e) => {
        let t = {
          time: e.timestamp,
          open: e.open,
          high: e.high,
          low: e.low,
          close: e.close,
          volume: e.volume,
        };
        i.set(e.timestamp, t);
        let l = o.get(r);
        (!l || e.timestamp >= l.time) && o.set(r, t);
      });
    },
  ]);
};
