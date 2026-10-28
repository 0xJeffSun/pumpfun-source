// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(78436),
    r = e.i(634103),
    i = e.i(352386);
  let l = (e, t) => {
    let n = e instanceof Map ? e : new Map(e.entries()),
      r = t instanceof Map ? t : new Map(t.entries());
    if (n.size !== r.size) return !1;
    for (let [e, t] of n) if (!Object.is(t, r.get(e))) return !1;
    return !0;
  };
  function a(e) {
    let t = i.default.useRef(void 0);
    return (n) => {
      let r = e(n);
      return !(function (e, t) {
        if (Object.is(e, t)) return !0;
        if (
          "object" != typeof e ||
          null === e ||
          "object" != typeof t ||
          null === t ||
          Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)
        )
          return !1;
        if (Symbol.iterator in e && Symbol.iterator in t) {
          if ("entries" in e && "entries" in t) return l(e, t);
          let n = e[Symbol.iterator](),
            r = t[Symbol.iterator](),
            i = n.next(),
            a = r.next();
          for (; !i.done && !a.done; ) {
            if (!Object.is(i.value, a.value)) return !1;
            ((i = n.next()), (a = r.next()));
          }
          return !!i.done && !!a.done;
        }
        return l(
          { entries: () => Object.entries(e) },
          { entries: () => Object.entries(t) },
        );
      })(t.current, r)
        ? (t.current = r)
        : t.current;
    };
  }
  e.s(["f", 0, a], 362324);
  var o = e.i(811005);
  let s = (e, t) => (void 0 === e ? t : void 0 === t ? e : Math.max(e, t)),
    u = (e, t) => ({
      base: "committed" === t.base ? e.base : t.base,
      updates: ((e, t) => {
        if (!e) return t;
        if (!t) return e;
        let n = { ...e, ...t },
          r = s(e.usdAthMarketCap, t.usdAthMarketCap);
        return (void 0 !== r && (n.usdAthMarketCap = r), n);
      })(e.updates, t.updates),
      queuedAt: t.queuedAt,
    }),
    d = (e, t, n) => {
      let r,
        i =
          "committed" === n.base
            ? t
            : "empty" === n.base
              ? void 0
              : { ...n.base, lastUpdated: n.queuedAt };
      if (!n.updates) return i;
      let l =
          i ??
          ((r = {}),
          {
            mint: e,
            usdMarketCap: 0,
            lastUpdated: Date.now(),
            isLiveData: !1,
            ...r,
          }),
        a = s(l.usdAthMarketCap, n.updates.usdAthMarketCap);
      return {
        ...l,
        ...n.updates,
        ...(void 0 !== a ? { usdAthMarketCap: a } : {}),
        lastUpdated: n.queuedAt,
        isLiveData: !0,
      };
    },
    c = (0, n.$)()(
      (0, r.u)((e, t) => {
        let n = (0, o.H)({
            merge: u,
            onFlush: (t) => {
              e((e) => {
                let n = { ...e.coins };
                return (
                  t.forEach((e, t) => {
                    let r = d(t, n[t], e);
                    r ? (n[t] = r) : delete n[t];
                  }),
                  { coins: n }
                );
              });
            },
          }),
          r = (e, t) => n.set(e, { ...t, queuedAt: Date.now() });
        return {
          coins: {},
          updateCoin: (e, t) => r(e, { base: "committed", updates: t }),
          setCoin: (e) => r(e.mint, { base: e }),
          removeCoin: (e) => r(e, { base: "empty" }),
          getCoin: (e) => t().coins[e],
          getCoins: (e) => {
            let { coins: n } = t();
            return e.map((e) => n[e]);
          },
          hasLiveData: (e) => t().coins[e]?.isLiveData ?? !1,
          peekCoin: (e) => {
            let r = t().coins[e],
              i = n.peek(e);
            return i ? d(e, r, i) : r;
          },
        };
      }),
    ),
    f = [];
  e.s(
    [
      "J",
      0,
      (e) => {
        let n,
          r = (0, t.c)(2);
        return (
          r[0] !== e
            ? ((n = (t) => t.coins[e]?.usdMarketCap), (r[0] = e), (r[1] = n))
            : (n = r[1]),
          c(n)
        );
      },
      "F",
      0,
      (e) => {
        let n,
          r = (0, t.c)(2);
        return (
          r[0] !== e
            ? ((n = (t) => t.coins[e]), (r[0] = e), (r[1] = n))
            : (n = r[1]),
          c(n)
        );
      },
      "k",
      0,
      (e) => {
        let n,
          r = (0, t.c)(2);
        return (
          r[0] !== e
            ? ((n = (t) => (0 === e.length ? f : e.map((e) => t.coins[e]))),
              (r[0] = e),
              (r[1] = n))
            : (n = r[1]),
          c(a(n))
        );
      },
      "x",
      0,
      c,
    ],
    653805,
  );
};
