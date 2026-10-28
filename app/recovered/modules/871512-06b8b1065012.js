// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    createMutableActionQueue: function () {
      return p;
    },
    getCurrentAppRouterState: function () {
      return y;
    },
    publicAppRouterInstance: function () {
      return g;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(313537),
    u = e.r(751030),
    o = e.r(352386),
    i = e.r(35938);
  (e.r(813328),
    e.r(212835),
    e.r(944112),
    e.r(814621),
    e.r(611520),
    e.r(863090));
  let c = e.r(311134),
    s = e.r(387951);
  function f(e, t, n) {
    e.pending === t && ((e.pending = t.next), null !== e.pending)
      ? d({ actionQueue: e, action: e.pending, setState: n })
      : null === e.pending &&
        (e.wasPreempted &&
          ((e.wasPreempted = !1), (0, o.startTransition)(() => n(e.state))),
        e.needsRefresh &&
          ((e.needsRefresh = !1), e.dispatch({ type: l.ACTION_REFRESH }, n)));
  }
  function d({ actionQueue: e, action: t, setState: n }) {
    let r,
      a = e.state;
    e.pending = t;
    let u = t.payload;
    function o(r) {
      (f(e, t, n), t.reject(r));
    }
    function c(r) {
      if (t.discarded) {
        (t.payload.type === l.ACTION_SERVER_ACTION &&
          t.payload.didRevalidate &&
          (e.needsRefresh = !0),
          f(e, t, n));
        return;
      }
      ((e.state = r), f(e, t, n), t.resolve(r));
    }
    try {
      r = e.action(a, u);
    } catch (e) {
      o(e);
      return;
    }
    (0, i.isThenable)(r) ? r.then(c, o) : c(r);
  }
  let h = null;
  function p(e) {
    let t = {
      state: e,
      dispatch: (e, n) =>
        (function (e, t, n) {
          let r = { resolve: n, reject: () => {} };
          if (t.type !== l.ACTION_RESTORE) {
            let e = new Promise((e, t) => {
              r = { resolve: e, reject: t };
            });
            (0, o.startTransition)(() => {
              n(e);
            });
          }
          let a = {
            payload: t,
            next: null,
            resolve: r.resolve,
            reject: r.reject,
          };
          null === e.pending
            ? ((e.last = a), d({ actionQueue: e, action: a, setState: n }))
            : t.type === l.ACTION_NAVIGATE || t.type === l.ACTION_RESTORE
              ? ((e.pending.discarded = !0),
                (e.wasPreempted = !0),
                (a.next = e.pending.next),
                e.last === e.pending && (e.last = a),
                d({ actionQueue: e, action: a, setState: n }))
              : (null !== e.last && (e.last.next = a), (e.last = a));
        })(t, e, n),
      action: u.reducer,
      pending: null,
      last: null,
    };
    if ("u" > typeof window) {
      if (null !== h)
        throw Error(
          "Internal Next.js Error: createMutableActionQueue was called more than once",
        );
      h = t;
    }
    return t;
  }
  function y() {
    return null !== h ? h.state : null;
  }
  let g = {
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    prefetch: s.prefetchRoute,
    replace: c.replace,
    push: c.push,
    refresh: c.refresh,
    hmrRefresh: c.hmrRefresh,
    bfcacheId: "0",
  };
  ("u" > typeof window && window.next && (window.next.router = g),
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default)));
};
