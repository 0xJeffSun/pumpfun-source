// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(520669);
  let n = [0, 3e3],
    r = new Set(["1d", "1w", "1m", "all"]),
    i = new Map(),
    l = new Map(),
    a = (e, n) => {
      if (n.inFlight) {
        n.queued = !0;
        return;
      }
      let { queryClient: i } = n,
        s = ((e, n) => {
          let i = new Set();
          for (let l of e
            .getQueryCache()
            .findAll({ queryKey: t.g.walletPrefix(n) })) {
            if (0 === l.getObserversCount()) continue;
            let e = l.queryKey[2];
            "string" == typeof e && r.has(e) && i.add(e);
          }
          return [...i];
        })(i, e).map((n) => (0, t.H)(i, e, n));
      0 !== s.length &&
        ((n.inFlight = !0),
        Promise.allSettled(s).then(() => {
          ((n.inFlight = !1),
            n.queued && l.get(e) === n && ((n.queued = !1), a(e, n)));
        }));
    },
    s = (e, t, n) => {
      ((t.nextLegDueAt = n),
        (t.nextLeg = setTimeout(
          () => {
            ((t.nextLeg = null), a(e, t));
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
            (n = l.get(e)) &&
              (n.firstLeg && clearTimeout(n.firstLeg),
              n.nextLeg && clearTimeout(n.nextLeg),
              (n.firstLeg = null),
              (n.nextLeg = null)),
            l.delete(e));
      };
    },
    "K",
    0,
    (e, t) => {
      if (!t || !i.has(t)) return;
      let r = Date.now(),
        o = l.get(t);
      if (
        (o && (o.queryClient = e),
        !o || (!o.firstLeg && !o.nextLeg && !o.inFlight))
      ) {
        let i = o ?? {
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
            ((i.firstLeg = null), a(t, i));
          }, u)),
          s(t, i, r + c),
          l.set(t, i));
        return;
      }
      if (o.firstLeg) return;
      let u = r + 3e3;
      o.nextLeg
        ? o.nextLegDueAt < u && (o.trailingDueAt = Math.max(o.trailingDueAt, u))
        : s(t, o, u);
    },
  ]);
};
