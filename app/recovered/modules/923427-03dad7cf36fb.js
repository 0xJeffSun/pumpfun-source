// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(352386),
    r = e.i(85324);
  let i = 3e4,
    s = 1e4,
    o = 6e4,
    a = 5e3,
    l = 6e5,
    u = 36e5,
    d = 2e3,
    c = 2e4,
    f = async (e, t) => {
      for (;;) {
        let n = e - Date.now();
        if (n <= 0 || t()) return;
        await new Promise((e) => {
          setTimeout(e, Math.min(n, 50));
        });
      }
    },
    m = (e, t) => `${e}:${t}`,
    p = new Map(),
    _ = new Map(),
    g = new Map(),
    h = 0,
    v = new Set(),
    y = 0,
    w = new Map(),
    b = (e) => (p.get(e) ?? 0) > 0,
    I = (e) => {
      g.set(e, (g.get(e) ?? 0) + 1);
    },
    k = (e) => {
      let t = (g.get(e) ?? 1) - 1;
      t <= 0 ? g.delete(e) : g.set(e, t);
    },
    x = new Map(),
    S = {
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
    A = (e, t, n) => {
      let r = e.entry(t);
      return null !== r
        ? r.consumed
          ? "held_consumed"
          : "held"
        : n
          ? "in_flight"
          : e.budgetStopped
            ? "budget_stopped"
            : e.active
              ? e.backoffUntil > t
                ? "backoff"
                : "waiting"
              : "inactive";
    },
    E = { waited: !1, waitedMs: 0, kept: !1, timedOut: !1 };
  e.s([
    "w",
    0,
    (e, t, n = d) => {
      let r = m(e, t),
        i = _.get(r);
      if (void 0 === i) return Promise.resolve(E);
      let s = Date.now();
      return (
        I(r),
        new Promise((e) => {
          let t = !1,
            o = null,
            a = (n, a, u) => {
              t ||
                ((t = !0),
                null !== o && clearTimeout(o),
                i.delete(l),
                k(r),
                e({
                  waited: !0,
                  waitedMs: Date.now() - s,
                  kept: n,
                  timedOut: a,
                  refusalCode: u,
                }));
            },
            l = (e, t) => a(e, !1, t);
          (i.add(l), (o = setTimeout(() => a(!1, !0), n)));
        })
      );
    },
    "M",
    0,
    (e, t) => {
      let n = m(e, t);
      I(n);
      let r = !1,
        i = null,
        s = () => {
          r || ((r = !0), null !== i && clearTimeout(i), k(n));
        };
      return ((i = setTimeout(s, 12e4)), s);
    },
    "f",
    0,
    (e, t, n) => {
      let r = m(e, t),
        i = x.get(r);
      if (void 0 === i)
        return void 0 !== n &&
          ((e, t) => {
            let n = `${e}:`,
              r = t.toLowerCase();
            for (let [e, t] of x)
              if (e.startsWith(n)) {
                for (let e of t) if (e.mint.toLowerCase() === r) return !0;
              }
            return !1;
          })(e, n)
          ? "mounted_other_key"
          : "not_mounted";
      let s = Date.now(),
        o = _.has(r),
        a = "not_mounted";
      for (let e of i) {
        let t = A(e, s, o);
        S[t] > S[a] && (a = t);
      }
      return a;
    },
    "U",
    0,
    () => {
      h += 1;
      let e = !1,
        t = null,
        n = () => {
          if (!e && ((e = !0), null !== t && clearTimeout(t), !((h -= 1) > 0)))
            for (let e of ((y = Date.now()), [...v])) e();
        };
      return ((t = setTimeout(n, 12e4)), n);
    },
    "R",
    0,
    f,
    "G",
    0,
    ({
      namespace: e,
      lane: d,
      key: c,
      mint: f,
      make: I,
      peek: k,
      store: S,
      expiring: A,
      priceMoved: E,
      priceSignal: R,
      remakeSignal: M,
      onReady: P,
      onFailed: D,
      refreshFloorMs: T = i,
      keyChangeSpacingMs: $ = s,
      failureBackoffMs: F = o,
      pricePollMs: q = a,
      budgetMs: B = l,
      hardBudgetMs: C = u,
    }) => {
      let L = null === c ? null : m(e, c),
        N = (0, r.W)(),
        U = (0, n.useRef)(Date.now() + B),
        z = (0, n.useRef)(Date.now() + C),
        O = (0, n.useRef)(0),
        j = (0, n.useRef)("budget"),
        [W, V] = (0, n.useState)(0),
        H = (0, n.useRef)({
          make: I,
          peek: k,
          store: S,
          expiring: A,
          priceMoved: E,
          onReady: P,
          onFailed: D,
        });
      (0, n.useEffect)(() => {
        H.current = {
          make: I,
          peek: k,
          store: S,
          expiring: A,
          priceMoved: E,
          onReady: P,
          onFailed: D,
        };
      });
      let Q = (0, n.useRef)(0),
        G = (0, n.useRef)(0),
        Y = (0, n.useRef)(0),
        K = (0, n.useRef)(0),
        J = (0, n.useRef)(null),
        X = (0, n.useRef)(null),
        Z = (0, n.useRef)(!1),
        ee = (0, n.useRef)(null),
        et = (0, n.useRef)(null),
        en = (0, n.useRef)(0),
        er = (0, n.useRef)(0),
        ei = (0, n.useRef)({
          mint: f,
          active: !1,
          budgetStopped: !1,
          backoffUntil: 0,
          entry: (e) => {
            let { peek: t, expiring: n } = H.current,
              r = t();
            return null === r || n(r, e) ? null : r;
          },
        });
      ((0, n.useEffect)(() => {
        let e;
        if (null === L) return;
        let t = ei.current;
        (p.set(L, (p.get(L) ?? 0) + 1),
          void 0 === (e = x.get(L)) && ((e = new Set()), x.set(L, e)),
          e.add(t));
        let n = Date.now();
        ((K.current = 0), (t.backoffUntil = Y.current), (z.current = n + C));
        let r = n - y < 15e3 && en.current !== y,
          i = null !== ee.current;
        return (
          r && ((en.current = y), i && (er.current = y)),
          (Q.current = Math.min(Q.current, n + (r && !i ? 0 : $))),
          () => {
            let e, n;
            ((e = (p.get(L) ?? 1) - 1) > 0
              ? p.set(L, e)
              : (p.delete(L), w.delete(L)),
              void 0 !== (n = x.get(L)) &&
                (n.delete(t), 0 === n.size && x.delete(L)));
          }
        );
      }, [L, $, C]),
        (0, n.useEffect)(() => {
          let e = () => {
              let e = Date.now(),
                t = ei.current.budgetStopped && z.current > e;
              (t || !(e - O.current < 1e4)) &&
                ((O.current = e), (U.current = e + B), t && V((e) => e + 1));
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
        }, [B]),
        (0, n.useEffect)(() => {
          let n = ei.current;
          if (((n.active = N), (n.mint = f), null === L)) {
            n.budgetStopped = !1;
            return;
          }
          let r = (r) => {
              ((j.current = r),
                n.budgetStopped ||
                  ((n.budgetStopped = !0),
                  t.y.info("[presignLoop] stopped", {
                    reason: r,
                    namespace: e,
                    lane: d,
                    mint: f,
                    budget_ms: B,
                    hard_budget_ms: C,
                  })));
            },
            i = Date.now(),
            o = z.current - i,
            a = U.current - i;
          if (o <= 0) return void r("hard_budget");
          if (a <= 0) return void r("budget");
          if (
            (n.budgetStopped &&
              ((n.budgetStopped = !1),
              t.y.info("[presignLoop] resumed", {
                reason:
                  "hard_budget" === j.current ? "key_change" : "interaction",
                namespace: e,
                lane: d,
                mint: f,
                budget_ms: B,
              })),
            !N)
          )
            return;
          let l = !1,
            u = !1,
            c = !1,
            m = null,
            p = null,
            I = () => {
              null !== m && (clearTimeout(m), (m = null));
            },
            k = () =>
              Math.max(Math.max(G.current, w.get(L) ?? 0) + 3e3, y + 1500),
            x = {
              schedule(e, t) {
                l ||
                  u ||
                  (I(),
                  (m = setTimeout(() => {
                    ((m = null), x.run(t));
                  }, e)));
              },
              run(e) {
                if (l || u || c) return;
                let t = ee.current;
                if (null !== t)
                  return void t.then(() => {
                    l || u || x.run(e);
                  });
                if (h > 0) return;
                let r = H.current,
                  i = Date.now(),
                  o =
                    Math.max(
                      "price" === e ? k() : Q.current,
                      K.current,
                      Y.current,
                    ) - i;
                if (o > 0) return void x.schedule(o, e);
                let a = r.peek();
                if (null !== a && !a.consumed && !r.expiring(a, i)) {
                  let t = i - a.signedAt;
                  if ("price" === e) {
                    if (!r.priceMoved(a))
                      return void x.schedule(Math.max(0, T - t), "floor");
                  } else if (t < T) return void x.schedule(T - t, e);
                }
                let d = _.get(L);
                if (void 0 !== d) {
                  null !== p && d.delete(p);
                  let t = (t) => {
                    ((p = null),
                      l || u || (I(), t ? x.run(e) : x.schedule(s, e)));
                  };
                  ((p = t), d.add(t), x.schedule(s, e));
                  return;
                }
                c = !0;
                let f = new Set();
                _.set(L, f);
                let m = Date.now();
                ((Q.current = m + s), (G.current = m), w.set(L, m));
                let v = () => (g.get(L) ?? 0) > 0,
                  S = r.make({
                    wanted: () => (h > 0 ? v() : !l || b(L) || v()),
                    tapWaiting: v,
                  });
                ((ee.current = S),
                  (n.backoffUntil = 0),
                  S.then((t) => {
                    (ee.current === S && (ee.current = null),
                      (c = !1),
                      _.delete(L));
                    let i = er.current;
                    0 !== i &&
                      ((er.current = 0), i === y && (Q.current = Date.now()));
                    let o = h > 0,
                      a = v(),
                      d = t.ok && (b(L) || a) && (!o || a);
                    d && (r.store(t.entry), r.onReady?.(t.entry, e));
                    let p = t.ok ? void 0 : t.code;
                    for (let e of f) e(d, p);
                    if (!t.ok && !0 !== t.quiet) {
                      let i = Date.now() + F;
                      (t.retryable
                        ? ((Y.current = i), (n.backoffUntil = i))
                        : ((K.current = i), (n.backoffUntil = 1 / 0)),
                        r.onFailed?.(e, t.reason, Date.now() - m));
                    }
                    if (!l && !u) {
                      if (d) return void x.schedule(T, "floor");
                      if (t.ok) {
                        o && x.schedule(s, e);
                        return;
                      }
                      if (!0 === t.quiet) return void x.schedule(s, e);
                      t.retryable && x.schedule(F, "retry");
                    }
                  }));
              },
            },
            S = () => {
              x.schedule(1500, "settled");
            };
          v.add(S);
          let A = null,
            E = () => {
              null !== A && (clearTimeout(A), (A = null));
            },
            R = () => {
              if (l || u) return;
              let e = H.current,
                t = e.peek();
              if (
                null === t ||
                t.consumed ||
                e.expiring(t, Date.now()) ||
                !e.priceMoved(t)
              )
                return;
              let n = Math.max(k(), K.current, Y.current) - Date.now();
              if (n > 0) {
                null === A &&
                  (A = setTimeout(() => {
                    ((A = null), R());
                  }, n));
                return;
              }
              x.run("price");
            };
          ((J.current = R), (X.current = () => x.run("remake")));
          let M = setInterval(() => {
              if (l || u) return;
              let e = H.current.peek();
              if (null !== e && !e.consumed) {
                if (H.current.expiring(e, Date.now()))
                  return void x.run("expiry");
                R();
              }
            }, q),
            P = null,
            D = () => {
              let e = Date.now(),
                t = z.current - e,
                n = Math.min(U.current - e, t);
              if (n > 0) {
                P = setTimeout(D, n);
                return;
              }
              ((P = null),
                (u = !0),
                I(),
                E(),
                clearInterval(M),
                r(t <= 0 ? "hard_budget" : "budget"));
            };
          P = setTimeout(D, Math.min(a, o));
          let $ = et.current === L ? "focus" : "open";
          return (
            (et.current = L),
            x.run($),
            () => {
              ((l = !0),
                (J.current = null),
                I(),
                E(),
                clearInterval(M),
                null !== P && clearTimeout(P),
                null !== p && _.get(L)?.delete(p),
                v.delete(S));
            }
          );
        }, [L, N, W, e, d, f, T, F, q, B, C]),
        (0, n.useEffect)(() => {
          void 0 !== R && J.current?.();
        }, [R]),
        (0, n.useEffect)(() => {
          if (void 0 !== M) {
            if (!Z.current) {
              Z.current = !0;
              return;
            }
            X.current?.();
          }
        }, [M]));
    },
    "x",
    0,
    (e, t, n = c) =>
      new Promise((r, i) => {
        let s = setTimeout(() => {
          i(Error(`${e}_timeout`));
        }, n);
        t.then(
          (e) => {
            (clearTimeout(s), r(e));
          },
          (e) => {
            (clearTimeout(s), i(e));
          },
        );
      }),
  ]);
};
