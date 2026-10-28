// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(352386),
    n = e.i(85324);
  let i = 3e4,
    a = 1e4,
    o = 6e4,
    s = 5e3,
    l = 6e5,
    u = 36e5,
    d = 2e3,
    c = 2e4,
    f = async (e, t) => {
      for (;;) {
        let r = e - Date.now();
        if (r <= 0 || t()) return;
        await new Promise((e) => {
          setTimeout(e, Math.min(r, 50));
        });
      }
    },
    m = (e, t) => `${e}:${t}`,
    p = new Map(),
    y = new Map(),
    h = new Map(),
    g = 0,
    v = new Set(),
    w = 0,
    b = new Map(),
    _ = (e) => (p.get(e) ?? 0) > 0,
    k = (e) => {
      h.set(e, (h.get(e) ?? 0) + 1);
    },
    x = (e) => {
      let t = (h.get(e) ?? 1) - 1;
      t <= 0 ? h.delete(e) : h.set(e, t);
    },
    T = new Map(),
    R = {
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
    S = (e, t, r) => {
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
    D = { waited: !1, waitedMs: 0, kept: !1, timedOut: !1 };
  e.s([
    "w",
    0,
    (e, t, r = d) => {
      let n = m(e, t),
        i = y.get(n);
      if (void 0 === i) return Promise.resolve(D);
      let a = Date.now();
      return (
        k(n),
        new Promise((e) => {
          let t = !1,
            o = null,
            s = (r, s, u) => {
              t ||
                ((t = !0),
                null !== o && clearTimeout(o),
                i.delete(l),
                x(n),
                e({
                  waited: !0,
                  waitedMs: Date.now() - a,
                  kept: r,
                  timedOut: s,
                  refusalCode: u,
                }));
            },
            l = (e, t) => s(e, !1, t);
          (i.add(l), (o = setTimeout(() => s(!1, !0), r)));
        })
      );
    },
    "M",
    0,
    (e, t) => {
      let r = m(e, t);
      k(r);
      let n = !1,
        i = null,
        a = () => {
          n || ((n = !0), null !== i && clearTimeout(i), x(r));
        };
      return ((i = setTimeout(a, 12e4)), a);
    },
    "f",
    0,
    (e, t, r) => {
      let n = m(e, t),
        i = T.get(n);
      if (void 0 === i)
        return void 0 !== r &&
          ((e, t) => {
            let r = `${e}:`,
              n = t.toLowerCase();
            for (let [e, t] of T)
              if (e.startsWith(r)) {
                for (let e of t) if (e.mint.toLowerCase() === n) return !0;
              }
            return !1;
          })(e, r)
          ? "mounted_other_key"
          : "not_mounted";
      let a = Date.now(),
        o = y.has(n),
        s = "not_mounted";
      for (let e of i) {
        let t = S(e, a, o);
        R[t] > R[s] && (s = t);
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
            for (let e of ((w = Date.now()), [...v])) e();
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
      lane: d,
      key: c,
      mint: f,
      make: k,
      peek: x,
      store: R,
      expiring: S,
      priceMoved: D,
      priceSignal: I,
      remakeSignal: A,
      onReady: E,
      onFailed: M,
      refreshFloorMs: C = i,
      keyChangeSpacingMs: P = a,
      failureBackoffMs: $ = o,
      pricePollMs: L = s,
      budgetMs: O = l,
      hardBudgetMs: U = u,
    }) => {
      let q = null === c ? null : m(e, c),
        B = (0, n.W)(),
        N = (0, r.useRef)(Date.now() + O),
        z = (0, r.useRef)(Date.now() + U),
        F = (0, r.useRef)(0),
        H = (0, r.useRef)("budget"),
        [V, G] = (0, r.useState)(0),
        W = (0, r.useRef)({
          make: k,
          peek: x,
          store: R,
          expiring: S,
          priceMoved: D,
          onReady: E,
          onFailed: M,
        });
      (0, r.useEffect)(() => {
        W.current = {
          make: k,
          peek: x,
          store: R,
          expiring: S,
          priceMoved: D,
          onReady: E,
          onFailed: M,
        };
      });
      let j = (0, r.useRef)(0),
        Q = (0, r.useRef)(0),
        Y = (0, r.useRef)(0),
        K = (0, r.useRef)(0),
        J = (0, r.useRef)(null),
        Z = (0, r.useRef)(null),
        X = (0, r.useRef)(!1),
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
            let { peek: t, expiring: r } = W.current,
              n = t();
            return null === n || r(n, e) ? null : n;
          },
        });
      ((0, r.useEffect)(() => {
        let e;
        if (null === q) return;
        let t = ei.current;
        (p.set(q, (p.get(q) ?? 0) + 1),
          void 0 === (e = T.get(q)) && ((e = new Set()), T.set(q, e)),
          e.add(t));
        let r = Date.now();
        ((K.current = 0), (t.backoffUntil = Y.current), (z.current = r + U));
        let n = r - w < 15e3 && er.current !== w,
          i = null !== ee.current;
        return (
          n && ((er.current = w), i && (en.current = w)),
          (j.current = Math.min(j.current, r + (n && !i ? 0 : P))),
          () => {
            let e, r;
            ((e = (p.get(q) ?? 1) - 1) > 0
              ? p.set(q, e)
              : (p.delete(q), b.delete(q)),
              void 0 !== (r = T.get(q)) &&
                (r.delete(t), 0 === r.size && T.delete(q)));
          }
        );
      }, [q, P, U]),
        (0, r.useEffect)(() => {
          let e = () => {
              let e = Date.now(),
                t = ei.current.budgetStopped && z.current > e;
              (t || !(e - F.current < 1e4)) &&
                ((F.current = e), (N.current = e + O), t && G((e) => e + 1));
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
          if (((r.active = B), (r.mint = f), null === q)) {
            r.budgetStopped = !1;
            return;
          }
          let n = (n) => {
              ((H.current = n),
                r.budgetStopped ||
                  ((r.budgetStopped = !0),
                  t.y.info("[presignLoop] stopped", {
                    reason: n,
                    namespace: e,
                    lane: d,
                    mint: f,
                    budget_ms: O,
                    hard_budget_ms: U,
                  })));
            },
            i = Date.now(),
            o = z.current - i,
            s = N.current - i;
          if (o <= 0) return void n("hard_budget");
          if (s <= 0) return void n("budget");
          if (
            (r.budgetStopped &&
              ((r.budgetStopped = !1),
              t.y.info("[presignLoop] resumed", {
                reason:
                  "hard_budget" === H.current ? "key_change" : "interaction",
                namespace: e,
                lane: d,
                mint: f,
                budget_ms: O,
              })),
            !B)
          )
            return;
          let l = !1,
            u = !1,
            c = !1,
            m = null,
            p = null,
            k = () => {
              null !== m && (clearTimeout(m), (m = null));
            },
            x = () =>
              Math.max(Math.max(Q.current, b.get(q) ?? 0) + 3e3, w + 1500),
            T = {
              schedule(e, t) {
                l ||
                  u ||
                  (k(),
                  (m = setTimeout(() => {
                    ((m = null), T.run(t));
                  }, e)));
              },
              run(e) {
                if (l || u || c) return;
                let t = ee.current;
                if (null !== t)
                  return void t.then(() => {
                    l || u || T.run(e);
                  });
                if (g > 0) return;
                let n = W.current,
                  i = Date.now(),
                  o =
                    Math.max(
                      "price" === e ? x() : j.current,
                      K.current,
                      Y.current,
                    ) - i;
                if (o > 0) return void T.schedule(o, e);
                let s = n.peek();
                if (null !== s && !s.consumed && !n.expiring(s, i)) {
                  let t = i - s.signedAt;
                  if ("price" === e) {
                    if (!n.priceMoved(s))
                      return void T.schedule(Math.max(0, C - t), "floor");
                  } else if (t < C) return void T.schedule(C - t, e);
                }
                let d = y.get(q);
                if (void 0 !== d) {
                  null !== p && d.delete(p);
                  let t = (t) => {
                    ((p = null),
                      l || u || (k(), t ? T.run(e) : T.schedule(a, e)));
                  };
                  ((p = t), d.add(t), T.schedule(a, e));
                  return;
                }
                c = !0;
                let f = new Set();
                y.set(q, f);
                let m = Date.now();
                ((j.current = m + a), (Q.current = m), b.set(q, m));
                let v = () => (h.get(q) ?? 0) > 0,
                  R = n.make({
                    wanted: () => (g > 0 ? v() : !l || _(q) || v()),
                    tapWaiting: v,
                  });
                ((ee.current = R),
                  (r.backoffUntil = 0),
                  R.then((t) => {
                    (ee.current === R && (ee.current = null),
                      (c = !1),
                      y.delete(q));
                    let i = en.current;
                    0 !== i &&
                      ((en.current = 0), i === w && (j.current = Date.now()));
                    let o = g > 0,
                      s = v(),
                      d = t.ok && (_(q) || s) && (!o || s);
                    d && (n.store(t.entry), n.onReady?.(t.entry, e));
                    let p = t.ok ? void 0 : t.code;
                    for (let e of f) e(d, p);
                    if (!t.ok && !0 !== t.quiet) {
                      let i = Date.now() + $;
                      (t.retryable
                        ? ((Y.current = i), (r.backoffUntil = i))
                        : ((K.current = i), (r.backoffUntil = 1 / 0)),
                        n.onFailed?.(e, t.reason, Date.now() - m));
                    }
                    if (!l && !u) {
                      if (d) return void T.schedule(C, "floor");
                      if (t.ok) {
                        o && T.schedule(a, e);
                        return;
                      }
                      if (!0 === t.quiet) return void T.schedule(a, e);
                      t.retryable && T.schedule($, "retry");
                    }
                  }));
              },
            },
            R = () => {
              T.schedule(1500, "settled");
            };
          v.add(R);
          let S = null,
            D = () => {
              null !== S && (clearTimeout(S), (S = null));
            },
            I = () => {
              if (l || u) return;
              let e = W.current,
                t = e.peek();
              if (
                null === t ||
                t.consumed ||
                e.expiring(t, Date.now()) ||
                !e.priceMoved(t)
              )
                return;
              let r = Math.max(x(), K.current, Y.current) - Date.now();
              if (r > 0) {
                null === S &&
                  (S = setTimeout(() => {
                    ((S = null), I());
                  }, r));
                return;
              }
              T.run("price");
            };
          ((J.current = I), (Z.current = () => T.run("remake")));
          let A = setInterval(() => {
              if (l || u) return;
              let e = W.current.peek();
              if (null !== e && !e.consumed) {
                if (W.current.expiring(e, Date.now()))
                  return void T.run("expiry");
                I();
              }
            }, L),
            E = null,
            M = () => {
              let e = Date.now(),
                t = z.current - e,
                r = Math.min(N.current - e, t);
              if (r > 0) {
                E = setTimeout(M, r);
                return;
              }
              ((E = null),
                (u = !0),
                k(),
                D(),
                clearInterval(A),
                n(t <= 0 ? "hard_budget" : "budget"));
            };
          E = setTimeout(M, Math.min(s, o));
          let P = et.current === q ? "focus" : "open";
          return (
            (et.current = q),
            T.run(P),
            () => {
              ((l = !0),
                (J.current = null),
                k(),
                D(),
                clearInterval(A),
                null !== E && clearTimeout(E),
                null !== p && y.get(q)?.delete(p),
                v.delete(R));
            }
          );
        }, [q, B, V, e, d, f, C, $, L, O, U]),
        (0, r.useEffect)(() => {
          void 0 !== I && J.current?.();
        }, [I]),
        (0, r.useEffect)(() => {
          if (void 0 !== A) {
            if (!X.current) {
              X.current = !0;
              return;
            }
            Z.current?.();
          }
        }, [A]));
    },
    "x",
    0,
    (e, t, r = c) =>
      new Promise((n, i) => {
        let a = setTimeout(() => {
          i(Error(`${e}_timeout`));
        }, r);
        t.then(
          (e) => {
            (clearTimeout(a), n(e));
          },
          (e) => {
            (clearTimeout(a), i(e));
          },
        );
      }),
  ]);
};
