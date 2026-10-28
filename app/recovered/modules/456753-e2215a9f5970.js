// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    n = e.i(833499),
    i = e.i(595673),
    a = e.i(293205);
  let l = "batchId",
    s = new Set(),
    o = !1,
    c = null,
    u = null,
    d = (e) => (
      !o &&
        ((o = !0),
        h() || m({ id: (0, n.f)(), expiresAt: Date.now() + 18e5 }, !1)),
      s.add(e),
      () => {
        s.delete(e);
      }
    ),
    f = () => {
      ((c = null), (u = null));
    },
    m = (e, t = !0) => {
      let r = JSON.stringify(e);
      (localStorage.setItem(l, r),
        (c = e),
        (u = r),
        t &&
          (() => {
            for (let e of s) e();
          })());
    },
    p = () => {
      let e = localStorage.getItem(l);
      if (!e) return (f(), null);
      if (e === u && c)
        return c.expiresAt < Date.now()
          ? (localStorage.removeItem(l), f(), null)
          : c;
      try {
        let t = JSON.parse(e);
        if (t.expiresAt < Date.now())
          return (localStorage.removeItem(l), f(), null);
        return ((c = t), (u = e), c);
      } catch {
        return (localStorage.removeItem(l), f(), null);
      }
    },
    h = () => p(),
    g = () => null,
    x = (0, r.createContext)({
      observe: () => {},
      unobserve: () => {},
      addSeenCoin: () => {},
      generateNewSession: () => {},
      logSeenCoins: async () => {},
      notifyPageOrFilterChange: () => {},
      sessionId: null,
      batchId: null,
      getCurrentBatchId: () => ({ id: "", expiresAt: 0 }),
    });
  e.s([
    "l",
    0,
    ({ children: e }) => {
      let l = (0, r.useRef)(null),
        s = (0, r.useRef)(new Map()),
        o = (0, r.useRef)(new Set()),
        c = (0, r.useRef)(new WeakMap()),
        u = (0, r.useRef)(0),
        f = (0, r.useRef)(0),
        v = (0, r.useRef)(0),
        y = (0, r.useRef)(null),
        [b, w] = (0, r.useState)([]),
        { sessionData: _ } = (0, a.useSession)(),
        C = _?.pump_session_id ?? null,
        [S, k] = (0, r.useState)(!1),
        j = (0, r.useSyncExternalStore)(d, h, g),
        N = (0, r.useCallback)(() => {
          let e = p();
          if (!e || e.expiresAt < Date.now()) {
            let e;
            return (
              m((e = { id: (0, n.f)(), expiresAt: Date.now() + 18e5 })),
              e
            );
          }
          return e;
        }, []),
        I = (0, r.useCallback)(() => N(), [N]),
        E = (0, r.useCallback)(() => {
          (s.current.clear(), o.current.clear(), w([]));
        }, []);
      (0, r.useEffect)(
        () => (
          (l.current = new IntersectionObserver(
            (e) => {
              e.flatMap((e) => {
                let t = e.intersectionRatio >= 0.5;
                c.current.set(e.target, t);
                let r = s.current.get(e.target);
                if (!r) return [];
                let n = r.isVisible;
                return (
                  (r.isVisible = t),
                  [{ entry: e, data: r, wasVisible: n, nowVisible: t }]
                );
              }).forEach(
                ({ entry: e, data: t, wasVisible: r, nowVisible: n }) => {
                  let { coinId: i, callback: a, rec_id: l } = t;
                  (n ||
                    !r ||
                    ((e) => {
                      for (let t of s.current.values())
                        if (t.coinId === e && t.isVisible) return !0;
                      return !1;
                    })(i) ||
                    o.current.delete(i),
                    n &&
                      !o.current.has(i) &&
                      (a({ entry: e, metadata: { coinId: i, rec_id: l } }),
                      o.current.add(i)));
                },
              );
            },
            { threshold: [0, 0.5] },
          )),
          () => {
            l.current?.disconnect();
          }
        ),
        [],
      );
      let R = (0, r.useCallback)((e, t, r, n) => {
          l.current &&
            e &&
            (l.current.observe(e),
            s.current.set(e, {
              coinId: t,
              callback: r,
              isVisible: c.current.get(e) ?? !1,
              rec_id: n,
            }));
        }, []),
        A = (0, r.useCallback)((e) => {
          l.current && e && (l.current.unobserve(e), s.current.delete(e));
        }, []),
        P = (0, r.useCallback)(() => {
          let e = window.scrollY,
            t = Date.now(),
            r = Math.abs(e - u.current),
            n = t - f.current;
          (n > 0 && (v.current = r / n),
            (u.current = e),
            (f.current = t),
            y.current && clearTimeout(y.current));
        }, []);
      (0, r.useEffect)(
        () => (
          window.addEventListener("scroll", P),
          () => {
            window.removeEventListener("scroll", P);
          }
        ),
        [P],
      );
      let L = (0, r.useCallback)(() => {
          (k(!0),
            setTimeout(() => {
              k(!1);
            }, 1e3),
            setTimeout(() => {
              s.current.forEach((e, t) => {
                t &&
                  e.isVisible &&
                  !o.current.has(e.coinId) &&
                  (e.callback({
                    entry: { target: t },
                    metadata: { coinId: e.coinId, rec_id: e.rec_id },
                  }),
                  o.current.add(e.coinId));
              });
            }, 1300));
        }, []),
        M = (0, r.useCallback)(
          (e) => {
            w((t) => (t.some((t) => t.coinId === e.coinId) ? t : [...t, e]));
          },
          [S],
        ),
        $ = (0, r.useCallback)(async (e, t) => {
          if (e.length > 40) {
            (t(), s.current.clear(), o.current.clear());
            return;
          }
          if (0 !== e.length)
            try {
              ((0, i.pn)(e), t());
            } catch (e) {
              console.error("Error logging seen coins:", e);
            }
        }, []);
      (0, r.useEffect)(() => {
        let e = setInterval(() => {
          $(b, () => w([]));
        }, 1e3);
        return () => clearInterval(e);
      }, [b, $]);
      let D = (0, r.useCallback)(async () => {
        await $(b, () => w([]));
      }, [b, $]);
      return (0, t.jsx)(x.Provider, {
        value: {
          observe: R,
          unobserve: A,
          addSeenCoin: M,
          generateNewSession: E,
          logSeenCoins: D,
          sessionId: C,
          notifyPageOrFilterChange: L,
          batchId: j,
          getCurrentBatchId: I,
        },
        children: e,
      });
    },
    "j",
    0,
    () => (0, r.useContext)(x),
  ]);
};
