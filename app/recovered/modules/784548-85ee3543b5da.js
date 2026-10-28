// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(433710),
    r = e.i(526658),
    i = e.i(775975),
    o = e.i(163981),
    s = e.i(839476),
    u = e.i(895453),
    a = e.i(801457),
    l = e.i(484247),
    c = e.i(944767),
    d = e.i(70296),
    f = e.i(883589),
    p = e.i(347773);
  let g = /^([a-zA-Z]+)=([a-z0-9-]+)$/;
  function y(e, t) {
    let n = { isExpired: "1" };
    return (
      t.trackAnonymousUser &&
        ((null == e ? void 0 : e.anonymousId)
          ? (n.anonymousId = null == e ? void 0 : e.anonymousId)
          : (n.anonymousId = (0, s.o)())),
      n
    );
  }
  function m(e) {
    return (0, d.n)(e);
  }
  function v(e) {
    return !m(e);
  }
  function h(e) {
    var t;
    return (
      void 0 !== e.isExpired ||
      !(
        (void 0 === (t = e).created || (0, i.C)() - Number(t.created) < p.d) &&
        (void 0 === t.expire || (0, i.C)() < Number(t.expire))
      )
    );
  }
  function b(e) {
    e.expire = String((0, i.C)() + p.e);
  }
  function S(e) {
    return (0, f._)(e)
      .map(([e, t]) => ("anonymousId" === e ? `aid=${t}` : `${e}=${t}`))
      .join("&");
  }
  function w(e) {
    let t = {};
    return (
      e &&
        (-1 !== e.indexOf("&") || g.test(e)) &&
        e.split("&").forEach((e) => {
          let n = g.exec(e);
          if (null !== n) {
            let [, e, r] = n;
            "aid" === e ? (t.anonymousId = r) : (t[e] = r);
          }
        }),
      t
    );
  }
  function _(e) {
    let t = (function (e) {
      let t = {};
      if (
        ((t.secure =
          !!e.useSecureSessionCookie ||
          !!e.usePartitionedCrossSiteSessionCookie),
        (t.crossSite = !!e.usePartitionedCrossSiteSessionCookie),
        (t.partitioned = !!e.usePartitionedCrossSiteSessionCookie),
        e.trackSessionAcrossSubdomains)
      ) {
        let e = (0, l.V)();
        if (!e) return;
        t.domain = e;
      }
      return t;
    })(e);
    return t && (0, l.h)(t) ? { type: p.Y.COOKIE, cookieOptions: t } : void 0;
  }
  function k(e, t) {
    let n = {
      isLockEnabled: (0, a.d)(),
      persistSession: (n) => E(t, e, n, p.e),
      retrieveSession: O,
      expireSession: (n) => E(t, e, y(n, e), p.d),
    };
    if (!(0, l.P)(c.f)) {
      let e = (0, l.P)("_dd"),
        t = (0, l.P)("_dd_r"),
        r = (0, l.P)("_dd_l"),
        i = {};
      (e && (i.id = e),
        r && /^[01]$/.test(r) && (i.logs = r),
        t && /^[012]$/.test(t) && (i.rum = t),
        v(i) && (b(i), n.persistSession(i)));
    }
    return n;
  }
  function E(e, t, n, r) {
    (0, l.d)(c.f, S(n), t.trackAnonymousUser ? p.H : r, e);
  }
  function O() {
    return w((0, l.Z)(c.f));
  }
  function x() {
    try {
      let e = (0, s.o)(),
        t = `_dd_test_${e}`;
      localStorage.setItem(t, e);
      let n = localStorage.getItem(t);
      return (
        localStorage.removeItem(t),
        e === n ? { type: p.Y.LOCAL_STORAGE } : void 0
      );
    } catch (e) {
      return;
    }
  }
  function C(e) {
    localStorage.setItem(c.f, S(e));
  }
  function T() {
    return w(localStorage.getItem(c.f));
  }
  (e.s(
    [
      "i",
      0,
      b,
      "d",
      0,
      y,
      "Y",
      0,
      h,
      "H",
      0,
      m,
      "I",
      0,
      v,
      "j",
      0,
      w,
      "n",
      0,
      S,
    ],
    634357,
  ),
    e.s(["A", 0, k, "G", 0, O, "a", 0, _], 137447));
  let R = i.R,
    A = [];
  function $(e, n, r = 0) {
    var o;
    let u,
      { isLockEnabled: a, persistSession: l, expireSession: c } = n,
      d = (e) => l({ ...e, lock: u }),
      f = () => {
        let { lock: e, ...t } = n.retrieveSession();
        return {
          session: t,
          lock:
            e &&
            !(function (e) {
              let [, t] = e.split("--");
              return !t || (0, i.G)(Number(t), (0, i.J)()) > R;
            })(e)
              ? e
              : void 0,
        };
      };
    if ((t || (t = e), e !== t)) return void A.push(e);
    if (a && r >= 100) return void I(n);
    let p = f();
    if (
      a &&
      (p.lock ||
        ((u = (0, s.o)() + "--" + (0, i.J)()),
        d(p.session),
        (p = f()).lock !== u))
    )
      return void P(e, n, r);
    let g = e.process(p.session);
    if (a && (p = f()).lock !== u) return void P(e, n, r);
    if ((g && (h(g) ? c(g) : (b(g), a ? d(g) : l(g))), a && !(g && h(g)))) {
      if ((p = f()).lock !== u) return void P(e, n, r);
      (l(p.session), (g = p.session));
    }
    (null == (o = e.after) || o.call(e, g || p.session), I(n));
  }
  function P(e, t, r) {
    (0, n.Q)(() => {
      $(e, t, r + 1);
    }, 10);
  }
  function I(e) {
    t = void 0;
    let n = A.shift();
    n && $(n, e);
  }
  let N = i.R;
  e.s(
    [
      "W",
      0,
      function (e) {
        switch (e.sessionPersistence) {
          case p.Y.COOKIE:
            return _(e);
          case p.Y.LOCAL_STORAGE:
            return x();
          case void 0: {
            let t = _(e);
            return (!t && e.allowFallbackToLocalStorage && (t = x()), t);
          }
          default:
            u.s.error(
              `Invalid session persistence '${String(e.sessionPersistence)}'`,
            );
        }
      },
      "p",
      0,
      function (
        e,
        t,
        u,
        a,
        l = (function (e, t) {
          return e.type === p.Y.COOKIE
            ? k(t, e.cookieOptions)
            : {
                isLockEnabled: !1,
                persistSession: C,
                retrieveSession: T,
                expireSession: (e) => {
                  C(y(e, t));
                },
              };
        })(e, t),
      ) {
        let c,
          d = new r.S(),
          f = new r.S(),
          g = new r.S(),
          b = (0, n.y)(function () {
            let e = l.retrieveSession();
            h(e)
              ? $({ process: (e) => (h(e) ? y(e, t) : void 0), after: _ }, l)
              : _(e);
          }, N);
        E();
        let { throttled: S, cancel: w } = (0, o.N)(() => {
          $(
            {
              process: (e) => {
                if (m(e)) return;
                let t = _(e);
                return (
                  (function (e) {
                    if (m(e)) return;
                    let t = a(e[u]);
                    ((e[u] = t),
                      delete e.isExpired,
                      t === p.S ||
                        e.id ||
                        ((e.id = (0, s.o)()),
                        (e.created = String((0, i.C)()))));
                  })(t),
                  t
                );
              },
              after: (e) => {
                (v(e) && !O() && ((c = e), d.notify()), (c = e));
              },
            },
            l,
          );
        }, N);
        function _(e) {
          var n;
          return (
            h(e) && (e = y(e, t)),
            O() &&
              (((n = e), c.id !== n.id || c[u] !== n[u])
                ? ((c = y(c, t)), f.notify())
                : (g.notify({ previousState: c, newState: e }), (c = e))),
            e
          );
        }
        function E() {
          $(
            {
              process: (e) => {
                if (m(e)) return y(e, t);
              },
              after: (e) => {
                c = e;
              },
            },
            l,
          );
        }
        function O() {
          return (null == c ? void 0 : c[u]) !== void 0;
        }
        return {
          expandOrRenewSession: S,
          expandSession: function () {
            $({ process: (e) => (O() ? _(e) : void 0) }, l);
          },
          getSession: () => c,
          renewObservable: d,
          expireObservable: f,
          sessionStateUpdateObservable: g,
          restartSession: E,
          expire: () => {
            (w(), l.expireSession(c), _(y(c, t)));
          },
          stop: () => {
            (0, n.x)(b);
          },
          updateSessionState: function (e) {
            $({ process: (t) => ({ ...t, ...e }), after: _ }, l);
          },
        };
      },
    ],
    784548,
  );
};
