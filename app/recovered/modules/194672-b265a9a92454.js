// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(895453);
  let r = !1;
  function i(e) {
    return function () {
      return o(e, this, arguments);
    };
  }
  function o(e, t, n) {
    try {
      return e.apply(t, n);
    } catch (e) {
      s(e);
    }
  }
  function s(e) {
    if ((u(e), t))
      try {
        t(e);
      } catch (e) {
        u(e);
      }
  }
  function u(...e) {
    r && n.s.error("[MONITOR]", ...e);
  }
  function a() {
    if ("object" == typeof globalThis) return globalThis;
    Object.defineProperty(Object.prototype, "_dd_temp_", {
      get() {
        return this;
      },
      configurable: !0,
    });
    let e = _dd_temp_;
    return (
      delete Object.prototype._dd_temp_,
      "object" != typeof e &&
        (e =
          "object" == typeof self
            ? self
            : "object" == typeof window
              ? window
              : {}),
      e
    );
  }
  e.s(
    [
      "G",
      0,
      o,
      "u",
      0,
      u,
      "l",
      0,
      i,
      "v",
      0,
      s,
      "F",
      0,
      function (e, n, r) {
        let o = r.value;
        r.value = function (...e) {
          return (t ? i(o) : o).apply(this, e);
        };
      },
      "d",
      0,
      function (e) {
        r = e;
      },
      "M",
      0,
      function (e) {
        t = e;
      },
    ],
    194672,
  );
  let l = a();
  e.s(["K", 0, a, "P", 0, l, "Q", 0, "WorkerGlobalScope" in l], 63794);
};
