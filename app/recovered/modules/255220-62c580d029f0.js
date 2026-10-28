// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, r;
  var n,
    a = function (e, t, r, n) {
      if ("a" === r && !n)
        throw TypeError("Private accessor was defined without a getter");
      if ("function" == typeof t ? e !== t || !n : !t.has(e))
        throw TypeError(
          "Cannot read private member from an object whose class did not declare it",
        );
      return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e);
    },
    i = function (e, t, r, n, a) {
      if ("m" === n) throw TypeError("Private method is not writable");
      if ("a" === n && !a)
        throw TypeError("Private accessor was defined without a setter");
      if ("function" == typeof t ? e !== t || !a : !t.has(e))
        throw TypeError(
          "Cannot write private member to an object whose class did not declare it",
        );
      return ("a" === n ? a.call(e, r) : a ? (a.value = r) : t.set(e, r), r);
    };
  let s = new Set(),
    f = {};
  function o() {
    if (
      r ||
      ((r = Object.freeze({ register: c, get: l, on: d })), "u" < typeof window)
    )
      return r;
    let e = Object.freeze({ register: c });
    try {
      window.addEventListener(
        "wallet-standard:register-wallet",
        ({ detail: t }) => t(e),
      );
    } catch (e) {
      console.error(
        "wallet-standard:register-wallet event listener could not be added\n",
        e,
      );
    }
    try {
      window.dispatchEvent(new h(e));
    } catch (e) {
      console.error(
        "wallet-standard:app-ready event could not be dispatched\n",
        e,
      );
    }
    return r;
  }
  function c(...e) {
    return (e = e.filter((e) => !s.has(e))).length
      ? (e.forEach((e) => {
          ((t = void 0), s.add(e));
        }),
        f.register?.forEach((t) => u(() => t(...e))),
        function () {
          (e.forEach((e) => {
            ((t = void 0), s.delete(e));
          }),
            f.unregister?.forEach((t) => u(() => t(...e))));
        })
      : () => {};
  }
  function l() {
    return (t || (t = [...s]), t);
  }
  function d(e, t) {
    return (
      f[e]?.push(t) || (f[e] = [t]),
      function () {
        f[e] = f[e]?.filter((e) => t !== e);
      }
    );
  }
  function u(e) {
    try {
      e();
    } catch (e) {
      console.error(e);
    }
  }
  class h extends Event {
    get detail() {
      return a(this, n, "f");
    }
    get type() {
      return "wallet-standard:app-ready";
    }
    constructor(e) {
      (super("wallet-standard:app-ready", {
        bubbles: !1,
        cancelable: !1,
        composed: !1,
      }),
        n.set(this, void 0),
        i(this, n, e, "f"));
    }
    preventDefault() {
      throw Error("preventDefault cannot be called");
    }
    stopImmediatePropagation() {
      throw Error("stopImmediatePropagation cannot be called");
    }
    stopPropagation() {
      throw Error("stopPropagation cannot be called");
    }
  }
  ((n = new WeakMap()),
    e.s([
      "c",
      0,
      function () {
        if (r || ((r = o()), "u" < typeof window)) return r;
        let e = window.navigator.wallets || [];
        if (!Array.isArray(e))
          return (console.error("window.navigator.wallets is not an array"), r);
        let { register: t } = r,
          n = (...e) => e.forEach((e) => u(() => e({ register: t })));
        try {
          Object.defineProperty(window.navigator, "wallets", {
            value: Object.freeze({ push: n }),
          });
        } catch (e) {
          return (
            console.error("window.navigator.wallets could not be set"),
            r
          );
        }
        return (n(...e), r);
      },
      "T",
      0,
      o,
    ]));
};
