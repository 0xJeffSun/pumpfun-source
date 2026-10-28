// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(149502);
  let r = {};
  function n() {
    return (t.default.env.NEXT_PUBLIC_EVENT_TRACKING_ENABLED, !0);
  }
  let o = [],
    i = null,
    s = !1,
    a = 0,
    l = null;
  function u() {
    return (
      i ||
        (i = e.A(696922).then((e) => e)).catch((e) => {
          ((i = null),
            console.error("[UserEventsSDK] Failed to load recorder", e));
        }),
      i
    );
  }
  function c(e) {
    (o.push(e), d());
  }
  function d() {
    if (!s) {
      var e;
      ((s = !0),
        (e = () => {
          ((s = !1),
            (function e() {
              0 !== o.length &&
                u()
                  .then((e) => {
                    if (((a = 0), f(), 0 === o.length)) return;
                    let t = o.splice(0, o.length);
                    e.flushQueue(t, c);
                  })
                  .catch(() => {
                    !(function () {
                      if (s || 0 === o.length) return;
                      if (a >= 5) {
                        if (l || 0 === o.length) return;
                        let e = (e) => {
                          (e?.type !== "visibilitychange" ||
                            "visible" === document.visibilityState) &&
                            (f(), (a = 0), d());
                        };
                        ((l = e),
                          window.addEventListener("online", e),
                          window.addEventListener("focus", e),
                          document.addEventListener("visibilitychange", e));
                        return;
                      }
                      let t = Math.min(2e3 * 2 ** a, 3e4);
                      ((a += 1),
                        (s = !0),
                        setTimeout(() => {
                          ((s = !1), e());
                        }, t));
                    })();
                  });
            })());
        }),
        "requestIdleCallback" in window
          ? requestIdleCallback(() => e())
          : setTimeout(e, 0));
    }
  }
  function f() {
    l &&
      (window.removeEventListener("online", l),
      window.removeEventListener("focus", l),
      document.removeEventListener("visibilitychange", l),
      (l = null));
  }
  async function p() {
    n();
    try {
      return (await u()).ensureSdk();
    } catch {
      return;
    }
  }
  e.s([
    "i",
    0,
    p,
    "Z",
    0,
    function () {
      return r;
    },
    "j",
    0,
    function (e, t, r) {
      (n(),
        o.push({ userEventBody: e, sourceContext: t, options: r }),
        a >= 5 && (a = 0),
        d());
    },
    "K",
    0,
    function (e) {
      r = e;
    },
  ]);
};
