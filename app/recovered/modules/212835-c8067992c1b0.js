// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    dispatchAppRouterAction: function () {
      return c;
    },
    dispatchGestureState: function () {
      return f;
    },
    refreshOnInstantNavigationUnlock: function () {
      return i;
    },
    useActionQueue: function () {
      return d;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(56421)._(e.r(352386)),
    u = e.r(35938);
  e.r(313537);
  let o = null;
  function i() {}
  function c(e) {
    if (null === o)
      throw Error(
        "Internal Next.js error: Router action dispatched before initialization.",
      );
    o(e);
  }
  let s = null;
  function f(e) {
    if (null === s)
      throw Error(
        "Internal Next.js error: Router action dispatched before initialization.",
      );
    s(e);
  }
  function d(e) {
    let [t, n] = l.default.useState(e.state),
      [r, a] = (0, l.useOptimistic)(t);
    ("u" > typeof window && (s = a),
      "u" > typeof window && (o = (t) => e.dispatch(t, n)));
    let i = (0, l.useMemo)(() => r, [r]);
    return (0, u.isThenable)(i) ? (0, l.use)(i) : i;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
