// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526658),
    n = e.i(651151),
    r = e.i(775975),
    i = e.i(411365),
    o = e.i(433710),
    s = e.i(354878),
    u = e.i(513510),
    a = e.i(484247),
    l = e.i(333575),
    c = e.i(883589),
    d = e.i(194672),
    f = e.i(347773),
    p = e.i(784548),
    g = e.i(634357),
    y = e.i(137447),
    m = e.i(944767);
  let v = r._,
    h = f.d,
    b = [];
  async function S() {
    let e = (0, y.G)();
    (0, s.Y)("Unexpected session state", {
      session: e,
      isSyntheticsTest: (0, u.P)(),
      createdTimestamp: null == e ? void 0 : e.created,
      expireTimestamp: null == e ? void 0 : e.expire,
      cookie: await w(),
      currentDomain: `${window.location.protocol}//${window.location.hostname}`,
    });
  }
  async function w() {
    let e;
    return {
      count: (e =
        "cookieStore" in window
          ? await window.cookieStore.getAll(m.f)
          : document.cookie.split(/\s*;\s*/).filter((e) => e.startsWith(m.f)))
        .length,
      domain: (0, a.V)() || "undefined",
      ...e,
    };
  }
  e.s(
    [
      "f",
      0,
      function (e, u, a, y) {
        let _ = new t.S(),
          k = new t.S(),
          E = (0, p.p)(e.sessionStoreStrategyType, e, u, a);
        b.push(() => E.stop());
        let O = (0, n.f)({ expireDelay: h });
        if (
          (b.push(() => O.stop()),
          E.renewObservable.subscribe(() => {
            (O.add(x(), (0, r.H)()), _.notify());
          }),
          E.expireObservable.subscribe(() => {
            (k.notify(), O.closeActive((0, r.H)()));
          }),
          E.expandOrRenewSession(),
          O.add(x(), (0, r.t)().relative),
          (0, l.M)(l.J.SHORT_SESSION_INVESTIGATION))
        ) {
          let t = E.getSession();
          t &&
            (function (e, t) {
              if (!window.cookieStore || !t.created) return;
              let n = Number(t.created),
                o = (0, r.C)(),
                { stop: u } = (0, i.W)(e, cookieStore, "change", function (e) {
                  let i = (0, c.x)(e.changed, (e) => e.name === m.f);
                  if (!i) return;
                  let a = (0, r.C)() - n;
                  if (a > 14 * r._) u();
                  else {
                    let e = (0, g.j)(i.value);
                    if (e.id && e.id !== t.id) {
                      u();
                      let n = (0, r.C)() - o;
                      w()
                        .then((r) => {
                          (0, s.Y)("Session cookie changed", {
                            time: n,
                            session_age: a,
                            old: t,
                            new: e,
                            cookie: r,
                          });
                        })
                        .catch(d.v);
                    }
                  }
                });
              b.push(u);
            })(e, t);
        }
        function x() {
          let e = E.getSession();
          return e
            ? {
                id: e.id,
                trackingType: e[u],
                isReplayForced: !!e.forcedReplay,
                anonymousId: e.anonymousId,
              }
            : (S().catch(() => void 0),
              {
                id: "invalid",
                trackingType: f.S,
                isReplayForced: !1,
                anonymousId: void 0,
              });
        }
        return (
          y.observable.subscribe(() => {
            y.isGranted() ? E.expandOrRenewSession() : E.expire();
          }),
          (function (e, t) {
            let { stop: n } = (0, i.U)(
              e,
              window,
              ["click", "touchstart", "keydown", "scroll"],
              t,
              { capture: !0, passive: !0 },
            );
            b.push(n);
          })(e, () => {
            y.isGranted() && E.expandOrRenewSession();
          }),
          (function (e, t) {
            let n = () => {
                "visible" === document.visibilityState && t();
              },
              { stop: r } = (0, i.W)(e, document, "visibilitychange", n);
            b.push(r);
            let s = (0, o.y)(n, v);
            b.push(() => {
              (0, o.x)(s);
            });
          })(e, () => E.expandSession()),
          (function (e, t) {
            let { stop: n } = (0, i.W)(e, window, "resume", t, { capture: !0 });
            b.push(n);
          })(e, () => E.restartSession()),
          {
            findSession: (e, t) => O.find(e, t),
            renewObservable: _,
            expireObservable: k,
            sessionStateUpdateObservable: E.sessionStateUpdateObservable,
            expire: E.expire,
            updateSessionState: E.updateSessionState,
          }
        );
      },
    ],
    57549,
  );
  var _ = e.i(393386);
  e.s(
    [
      "f",
      0,
      function (e, t, n) {
        let i = 0,
          s = !1;
        return {
          isLimitReached() {
            if (
              (0 === i &&
                (0, o.Q)(() => {
                  i = 0;
                }, r._),
              (i += 1) <= t || s)
            )
              return ((s = !1), !1);
            if (i === t + 1) {
              s = !0;
              try {
                n({
                  message: `Reached max number of ${e}s by minute: ${t}`,
                  source: _.f.AGENT,
                  startClocks: (0, r.o)(),
                });
              } finally {
                s = !1;
              }
            }
            return !0;
          },
        };
      },
    ],
    921636,
  );
};
