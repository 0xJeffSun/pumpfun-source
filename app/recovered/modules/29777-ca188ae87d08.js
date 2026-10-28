// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(982069),
    r = t.i(51435),
    a = t.i(213618),
    s = new (class extends r.f {
      #P = !0;
      #e;
      #r;
      constructor() {
        (super(),
          (this.#r = (t) => {
            if (!a.l && window.addEventListener) {
              let e = () => t(!0),
                r = () => t(!1);
              return (
                window.addEventListener("online", e, !1),
                window.addEventListener("offline", r, !1),
                () => {
                  (window.removeEventListener("online", e),
                    window.removeEventListener("offline", r));
                }
              );
            }
          }));
      }
      onSubscribe() {
        this.#e || this.setEventListener(this.#r);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#e?.(), (this.#e = void 0));
      }
      setEventListener(t) {
        ((this.#r = t), this.#e?.(), (this.#e = t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        this.#P !== t &&
          ((this.#P = t),
          this.listeners.forEach((e) => {
            e(t);
          }));
      }
      isOnline() {
        return this.#P;
      }
    })();
  function n() {
    let t,
      e,
      r = new Promise((r, a) => {
        ((t = r), (e = a));
      });
    function a(t) {
      (Object.assign(r, t), delete r.resolve, delete r.reject);
    }
    return (
      (r.status = "pending"),
      r.catch(() => {}),
      (r.resolve = (e) => {
        (a({ status: "fulfilled", value: e }), t(e));
      }),
      (r.reject = (t) => {
        (a({ status: "rejected", reason: t }), e(t));
      }),
      r
    );
  }
  function i(t) {
    return Math.min(1e3 * 2 ** t, 3e4);
  }
  function o(t) {
    return (t ?? "online") !== "online" || s.isOnline();
  }
  (t.s(["f", 0, s], 523218), t.s(["f", 0, n], 591379));
  var l = class extends Error {
    constructor(t) {
      (super("CancelledError"),
        (this.revert = t?.revert),
        (this.silent = t?.silent));
    }
  };
  t.s(
    [
      "e",
      0,
      o,
      "v",
      0,
      function (t) {
        let r,
          u = !1,
          d = 0,
          c = !1,
          h = n(),
          f = () =>
            e.f.isFocused() &&
            ("always" === t.networkMode || s.isOnline()) &&
            t.canRun(),
          p = () => o(t.networkMode) && t.canRun(),
          m = (e) => {
            c || ((c = !0), t.onSuccess?.(e), r?.(), h.resolve(e));
          },
          y = (e) => {
            c || ((c = !0), t.onError?.(e), r?.(), h.reject(e));
          },
          v = () =>
            new Promise((e) => {
              ((r = (t) => {
                (c || f()) && e(t);
              }),
                t.onPause?.());
            }).then(() => {
              ((r = void 0), c || t.onContinue?.());
            }),
          g = () => {
            let e;
            if (c) return;
            let r = 0 === d ? t.initialPromise : void 0;
            try {
              e = r ?? t.fn();
            } catch (t) {
              e = Promise.reject(t);
            }
            Promise.resolve(e)
              .then(m)
              .catch((e) => {
                if (c) return;
                let r = t.retry ?? 3 * !a.l,
                  s = t.retryDelay ?? i,
                  n = "function" == typeof s ? s(d, e) : s,
                  o =
                    !0 === r ||
                    ("number" == typeof r && d < r) ||
                    ("function" == typeof r && r(d, e));
                u || !o
                  ? y(e)
                  : (d++,
                    t.onFail?.(d, e),
                    (0, a.s)(n)
                      .then(() => (f() ? void 0 : v()))
                      .then(() => {
                        u ? y(e) : g();
                      }));
              });
          };
        return {
          promise: h,
          cancel: (e) => {
            c || (y(new l(e)), t.abort?.());
          },
          continue: () => (r?.(), h),
          cancelRetry: () => {
            u = !0;
          },
          continueRetry: () => {
            u = !1;
          },
          canStart: p,
          start: () => (p() ? g() : v().then(g), h),
        };
      },
      "M",
      0,
      function (t) {
        return t instanceof l;
      },
    ],
    29777,
  );
};
