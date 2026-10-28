// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(352386),
    n = e.i(85324);
  let i = 3e4,
    o = 1e4,
    a = 6e4,
    s = 5e3,
    u = 6e5,
    c = 36e5,
    l = 2e3,
    d = 2e4,
    f = async (e, t) => {
      for (;;) {
        let r = e - Date.now();
        if (r <= 0 || t()) return;
        await new Promise((e) => {
          setTimeout(e, Math.min(r, 50));
        });
      }
    },
    p = (e, t) => `${e}:${t}`,
    m = new Map(),
    h = new Map(),
    y = new Map(),
    g = 0,
    b = new Set(),
    v = 0,
    w = new Map(),
    x = (e) => (m.get(e) ?? 0) > 0,
    $ = (e) => {
      y.set(e, (y.get(e) ?? 0) + 1);
    },
    E = (e) => {
      let t = (y.get(e) ?? 1) - 1;
      t <= 0 ? y.delete(e) : y.set(e, t);
    },
    A = new Map(),
    I = {
      not_mounted: 0,
      mounted_other_key: 1,
      budget_stopped: 2,
      inactive: 3,
      backoff: 4,
      waiting: 5,
      in_flight: 6,
      held_consumed: 7,
      held: 8,
    },
    M = (e, t, r) => {
      let n = e.entry(t);
      return null !== n
        ? n.consumed
          ? "held_consumed"
          : "held"
        : r
          ? "in_flight"
          : e.budgetStopped
            ? "budget_stopped"
            : e.active
              ? e.backoffUntil > t
                ? "backoff"
                : "waiting"
              : "inactive";
    },
    T = { waited: !1, waitedMs: 0, kept: !1, timedOut: !1 };
  e.s([
    "w",
    0,
    (e, t, r = l) => {
      let n = p(e, t),
        i = h.get(n);
      if (void 0 === i) return Promise.resolve(T);
      let o = Date.now();
      return (
        $(n),
        new Promise((e) => {
          let t = !1,
            a = null,
            s = (r, s, c) => {
              t ||
                ((t = !0),
                null !== a && clearTimeout(a),
                i.delete(u),
                E(n),
                e({
                  waited: !0,
                  waitedMs: Date.now() - o,
                  kept: r,
                  timedOut: s,
                  refusalCode: c,
                }));
            },
            u = (e, t) => s(e, !1, t);
          (i.add(u), (a = setTimeout(() => s(!1, !0), r)));
        })
      );
    },
    "M",
    0,
    (e, t) => {
      let r = p(e, t);
      $(r);
      let n = !1,
        i = null,
        o = () => {
          n || ((n = !0), null !== i && clearTimeout(i), E(r));
        };
      return ((i = setTimeout(o, 12e4)), o);
    },
    "f",
    0,
    (e, t, r) => {
      let n = p(e, t),
        i = A.get(n);
      if (void 0 === i)
        return void 0 !== r &&
          ((e, t) => {
            let r = `${e}:`,
              n = t.toLowerCase();
            for (let [e, t] of A)
              if (e.startsWith(r)) {
                for (let e of t) if (e.mint.toLowerCase() === n) return !0;
              }
            return !1;
          })(e, r)
          ? "mounted_other_key"
          : "not_mounted";
      let o = Date.now(),
        a = h.has(n),
        s = "not_mounted";
      for (let e of i) {
        let t = M(e, o, a);
        I[t] > I[s] && (s = t);
      }
      return s;
    },
    "U",
    0,
    () => {
      g += 1;
      let e = !1,
        t = null,
        r = () => {
          if (!e && ((e = !0), null !== t && clearTimeout(t), !((g -= 1) > 0)))
            for (let e of ((v = Date.now()), [...b])) e();
        };
      return ((t = setTimeout(r, 12e4)), r);
    },
    "R",
    0,
    f,
    "G",
    0,
    ({
      namespace: e,
      lane: l,
      key: d,
      mint: f,
      make: $,
      peek: E,
      store: I,
      expiring: M,
      priceMoved: T,
      priceSignal: k,
      remakeSignal: S,
      onReady: D,
      onFailed: B,
      refreshFloorMs: N = i,
      keyChangeSpacingMs: P = o,
      failureBackoffMs: z = a,
      pricePollMs: R = s,
      budgetMs: O = u,
      hardBudgetMs: _ = c,
    }) => {
      let L = null === d ? null : p(e, d),
        j = (0, n.W)(),
        C = (0, r.useRef)(Date.now() + O),
        F = (0, r.useRef)(Date.now() + _),
        U = (0, r.useRef)(0),
        W = (0, r.useRef)("budget"),
        [q, K] = (0, r.useState)(0),
        V = (0, r.useRef)({
          make: $,
          peek: E,
          store: I,
          expiring: M,
          priceMoved: T,
          onReady: D,
          onFailed: B,
        });
      (0, r.useEffect)(() => {
        V.current = {
          make: $,
          peek: E,
          store: I,
          expiring: M,
          priceMoved: T,
          onReady: D,
          onFailed: B,
        };
      });
      let Y = (0, r.useRef)(0),
        G = (0, r.useRef)(0),
        J = (0, r.useRef)(0),
        H = (0, r.useRef)(0),
        Q = (0, r.useRef)(null),
        X = (0, r.useRef)(null),
        Z = (0, r.useRef)(!1),
        ee = (0, r.useRef)(null),
        et = (0, r.useRef)(null),
        er = (0, r.useRef)(0),
        en = (0, r.useRef)(0),
        ei = (0, r.useRef)({
          mint: f,
          active: !1,
          budgetStopped: !1,
          backoffUntil: 0,
          entry: (e) => {
            let { peek: t, expiring: r } = V.current,
              n = t();
            return null === n || r(n, e) ? null : n;
          },
        });
      ((0, r.useEffect)(() => {
        let e;
        if (null === L) return;
        let t = ei.current;
        (m.set(L, (m.get(L) ?? 0) + 1),
          void 0 === (e = A.get(L)) && ((e = new Set()), A.set(L, e)),
          e.add(t));
        let r = Date.now();
        ((H.current = 0), (t.backoffUntil = J.current), (F.current = r + _));
        let n = r - v < 15e3 && er.current !== v,
          i = null !== ee.current;
        return (
          n && ((er.current = v), i && (en.current = v)),
          (Y.current = Math.min(Y.current, r + (n && !i ? 0 : P))),
          () => {
            let e, r;
            ((e = (m.get(L) ?? 1) - 1) > 0
              ? m.set(L, e)
              : (m.delete(L), w.delete(L)),
              void 0 !== (r = A.get(L)) &&
                (r.delete(t), 0 === r.size && A.delete(L)));
          }
        );
      }, [L, P, _]),
        (0, r.useEffect)(() => {
          let e = () => {
              let e = Date.now(),
                t = ei.current.budgetStopped && F.current > e;
              (t || !(e - U.current < 1e4)) &&
                ((U.current = e), (C.current = e + O), t && K((e) => e + 1));
            },
            t = { capture: !0, passive: !0 };
          return (
            document.addEventListener("pointerdown", e, t),
            document.addEventListener("keydown", e, t),
            () => {
              (document.removeEventListener("pointerdown", e, t),
                document.removeEventListener("keydown", e, t));
            }
          );
        }, [O]),
        (0, r.useEffect)(() => {
          let r = ei.current;
          if (((r.active = j), (r.mint = f), null === L)) {
            r.budgetStopped = !1;
            return;
          }
          let n = (n) => {
              ((W.current = n),
                r.budgetStopped ||
                  ((r.budgetStopped = !0),
                  t.y.info("[presignLoop] stopped", {
                    reason: n,
                    namespace: e,
                    lane: l,
                    mint: f,
                    budget_ms: O,
                    hard_budget_ms: _,
                  })));
            },
            i = Date.now(),
            a = F.current - i,
            s = C.current - i;
          if (a <= 0) return void n("hard_budget");
          if (s <= 0) return void n("budget");
          if (
            (r.budgetStopped &&
              ((r.budgetStopped = !1),
              t.y.info("[presignLoop] resumed", {
                reason:
                  "hard_budget" === W.current ? "key_change" : "interaction",
                namespace: e,
                lane: l,
                mint: f,
                budget_ms: O,
              })),
            !j)
          )
            return;
          let u = !1,
            c = !1,
            d = !1,
            p = null,
            m = null,
            $ = () => {
              null !== p && (clearTimeout(p), (p = null));
            },
            E = () =>
              Math.max(Math.max(G.current, w.get(L) ?? 0) + 3e3, v + 1500),
            A = {
              schedule(e, t) {
                u ||
                  c ||
                  ($(),
                  (p = setTimeout(() => {
                    ((p = null), A.run(t));
                  }, e)));
              },
              run(e) {
                if (u || c || d) return;
                let t = ee.current;
                if (null !== t)
                  return void t.then(() => {
                    u || c || A.run(e);
                  });
                if (g > 0) return;
                let n = V.current,
                  i = Date.now(),
                  a =
                    Math.max(
                      "price" === e ? E() : Y.current,
                      H.current,
                      J.current,
                    ) - i;
                if (a > 0) return void A.schedule(a, e);
                let s = n.peek();
                if (null !== s && !s.consumed && !n.expiring(s, i)) {
                  let t = i - s.signedAt;
                  if ("price" === e) {
                    if (!n.priceMoved(s))
                      return void A.schedule(Math.max(0, N - t), "floor");
                  } else if (t < N) return void A.schedule(N - t, e);
                }
                let l = h.get(L);
                if (void 0 !== l) {
                  null !== m && l.delete(m);
                  let t = (t) => {
                    ((m = null),
                      u || c || ($(), t ? A.run(e) : A.schedule(o, e)));
                  };
                  ((m = t), l.add(t), A.schedule(o, e));
                  return;
                }
                d = !0;
                let f = new Set();
                h.set(L, f);
                let p = Date.now();
                ((Y.current = p + o), (G.current = p), w.set(L, p));
                let b = () => (y.get(L) ?? 0) > 0,
                  I = n.make({
                    wanted: () => (g > 0 ? b() : !u || x(L) || b()),
                    tapWaiting: b,
                  });
                ((ee.current = I),
                  (r.backoffUntil = 0),
                  I.then((t) => {
                    (ee.current === I && (ee.current = null),
                      (d = !1),
                      h.delete(L));
                    let i = en.current;
                    0 !== i &&
                      ((en.current = 0), i === v && (Y.current = Date.now()));
                    let a = g > 0,
                      s = b(),
                      l = t.ok && (x(L) || s) && (!a || s);
                    l && (n.store(t.entry), n.onReady?.(t.entry, e));
                    let m = t.ok ? void 0 : t.code;
                    for (let e of f) e(l, m);
                    if (!t.ok && !0 !== t.quiet) {
                      let i = Date.now() + z;
                      (t.retryable
                        ? ((J.current = i), (r.backoffUntil = i))
                        : ((H.current = i), (r.backoffUntil = 1 / 0)),
                        n.onFailed?.(e, t.reason, Date.now() - p));
                    }
                    if (!u && !c) {
                      if (l) return void A.schedule(N, "floor");
                      if (t.ok) {
                        a && A.schedule(o, e);
                        return;
                      }
                      if (!0 === t.quiet) return void A.schedule(o, e);
                      t.retryable && A.schedule(z, "retry");
                    }
                  }));
              },
            },
            I = () => {
              A.schedule(1500, "settled");
            };
          b.add(I);
          let M = null,
            T = () => {
              null !== M && (clearTimeout(M), (M = null));
            },
            k = () => {
              if (u || c) return;
              let e = V.current,
                t = e.peek();
              if (
                null === t ||
                t.consumed ||
                e.expiring(t, Date.now()) ||
                !e.priceMoved(t)
              )
                return;
              let r = Math.max(E(), H.current, J.current) - Date.now();
              if (r > 0) {
                null === M &&
                  (M = setTimeout(() => {
                    ((M = null), k());
                  }, r));
                return;
              }
              A.run("price");
            };
          ((Q.current = k), (X.current = () => A.run("remake")));
          let S = setInterval(() => {
              if (u || c) return;
              let e = V.current.peek();
              if (null !== e && !e.consumed) {
                if (V.current.expiring(e, Date.now()))
                  return void A.run("expiry");
                k();
              }
            }, R),
            D = null,
            B = () => {
              let e = Date.now(),
                t = F.current - e,
                r = Math.min(C.current - e, t);
              if (r > 0) {
                D = setTimeout(B, r);
                return;
              }
              ((D = null),
                (c = !0),
                $(),
                T(),
                clearInterval(S),
                n(t <= 0 ? "hard_budget" : "budget"));
            };
          D = setTimeout(B, Math.min(s, a));
          let P = et.current === L ? "focus" : "open";
          return (
            (et.current = L),
            A.run(P),
            () => {
              ((u = !0),
                (Q.current = null),
                $(),
                T(),
                clearInterval(S),
                null !== D && clearTimeout(D),
                null !== m && h.get(L)?.delete(m),
                b.delete(I));
            }
          );
        }, [L, j, q, e, l, f, N, z, R, O, _]),
        (0, r.useEffect)(() => {
          void 0 !== k && Q.current?.();
        }, [k]),
        (0, r.useEffect)(() => {
          if (void 0 !== S) {
            if (!Z.current) {
              Z.current = !0;
              return;
            }
            X.current?.();
          }
        }, [S]));
    },
    "x",
    0,
    (e, t, r = d) =>
      new Promise((n, i) => {
        let o = setTimeout(() => {
          i(Error(`${e}_timeout`));
        }, r);
        t.then(
          (e) => {
            (clearTimeout(o), n(e));
          },
          (e) => {
            (clearTimeout(o), i(e));
          },
        );
      }),
  ]);
};
