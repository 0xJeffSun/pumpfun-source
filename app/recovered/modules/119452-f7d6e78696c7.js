// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(520669);
  let n = [0, 3e3],
    r = new Set(["1d", "1w", "1m", "all"]),
    i = new Map(),
    a = new Map(),
    o = (e, n) => {
      if (n.inFlight) {
        n.queued = !0;
        return;
      }
      let { queryClient: i } = n,
        s = ((e, n) => {
          let i = new Set();
          for (let a of e
            .getQueryCache()
            .findAll({ queryKey: t.g.walletPrefix(n) })) {
            if (0 === a.getObserversCount()) continue;
            let e = a.queryKey[2];
            "string" == typeof e && r.has(e) && i.add(e);
          }
          return [...i];
        })(i, e).map((n) => (0, t.H)(i, e, n));
      0 !== s.length &&
        ((n.inFlight = !0),
        Promise.allSettled(s).then(() => {
          ((n.inFlight = !1),
            n.queued && a.get(e) === n && ((n.queued = !1), o(e, n)));
        }));
    },
    s = (e, t, n) => {
      ((t.nextLegDueAt = n),
        (t.nextLeg = setTimeout(
          () => {
            ((t.nextLeg = null), o(e, t));
            let n = t.trailingDueAt;
            ((t.trailingDueAt = 0), n > Date.now() && s(e, t, n));
          },
          Math.max(0, n - Date.now()),
        )));
    };
  e.s([
    "T",
    0,
    (e) => {
      i.set(e, (i.get(e) ?? 0) + 1);
      let t = !1;
      return () => {
        var n;
        if (t) return;
        t = !0;
        let r = (i.get(e) ?? 1) - 1;
        r > 0
          ? i.set(e, r)
          : (i.delete(e),
            (n = a.get(e)) &&
              (n.firstLeg && clearTimeout(n.firstLeg),
              n.nextLeg && clearTimeout(n.nextLeg),
              (n.firstLeg = null),
              (n.nextLeg = null)),
            a.delete(e));
      };
    },
    "K",
    0,
    (e, t) => {
      if (!t || !i.has(t)) return;
      let r = Date.now(),
        l = a.get(t);
      if (
        (l && (l.queryClient = e),
        !l || (!l.firstLeg && !l.nextLeg && !l.inFlight))
      ) {
        let i = l ?? {
            queryClient: e,
            firstLeg: null,
            nextLeg: null,
            nextLegDueAt: 0,
            trailingDueAt: 0,
            inFlight: !1,
            queued: !1,
          },
          [u, c] = n;
        ((i.trailingDueAt = 0),
          (i.firstLeg = setTimeout(() => {
            ((i.firstLeg = null), o(t, i));
          }, u)),
          s(t, i, r + c),
          a.set(t, i));
        return;
      }
      if (l.firstLeg) return;
      let u = r + 3e3;
      l.nextLeg
        ? l.nextLegDueAt < u && (l.trailingDueAt = Math.max(l.trailingDueAt, u))
        : s(t, l, u);
    },
  ]);
};
