// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702232),
    n = Symbol("NOT_FOUND"),
    r = (e) => (Array.isArray(e) ? e : [e]),
    i = 0,
    o = class {
      revision = i;
      _value;
      _lastValue;
      _isEqual = l;
      constructor(e, t = l) {
        ((this._value = this._lastValue = e), (this._isEqual = t));
      }
      get value() {
        return this._value;
      }
      set value(e) {
        this.value !== e && ((this._value = e), (this.revision = ++i));
      }
    };
  function l(e, t) {
    return e === t;
  }
  function s(e) {
    return (e instanceof o || console.warn("Not a valid cell! ", e), e.value);
  }
  var u = (e, t) => !1;
  function a() {
    return (function (e = l) {
      return new o(null, e);
    })(u);
  }
  var c = (e) => {
    let t = e.collectionTag;
    (null === t && (t = e.collectionTag = a()), s(t));
  };
  Symbol();
  var f = 0,
    d = Object.getPrototypeOf({}),
    p = class {
      constructor(e) {
        ((this.value = e), (this.value = e), (this.tag.value = e));
      }
      proxy = new Proxy(this, g);
      tag = a();
      tags = {};
      children = {};
      collectionTag = null;
      id = f++;
    },
    g = {
      get: (e, t) =>
        (function () {
          let { value: n } = e,
            r = Reflect.get(n, t);
          if ("symbol" == typeof t || t in d) return r;
          if ("object" == typeof r && null !== r) {
            var i;
            let n = e.children[t];
            return (
              void 0 === n &&
                (n = e.children[t] =
                  Array.isArray((i = r)) ? new h(i) : new p(i)),
              n.tag && s(n.tag),
              n.proxy
            );
          }
          {
            let n = e.tags[t];
            return (void 0 === n && ((n = e.tags[t] = a()).value = r), s(n), r);
          }
        })(),
      ownKeys: (e) => (c(e), Reflect.ownKeys(e.value)),
      getOwnPropertyDescriptor: (e, t) =>
        Reflect.getOwnPropertyDescriptor(e.value, t),
      has: (e, t) => Reflect.has(e.value, t),
    },
    h = class {
      constructor(e) {
        ((this.value = e), (this.value = e), (this.tag.value = e));
      }
      proxy = new Proxy([this], m);
      tag = a();
      tags = {};
      children = {};
      collectionTag = null;
      id = f++;
    },
    m = {
      get: ([e], t) => ("length" === t && c(e), g.get(e, t)),
      ownKeys: ([e]) => g.ownKeys(e),
      getOwnPropertyDescriptor: ([e], t) => g.getOwnPropertyDescriptor(e, t),
      has: ([e], t) => g.has(e, t),
    },
    v = (e, t) => e === t,
    y =
      "u" > typeof WeakRef
        ? WeakRef
        : class {
            constructor(e) {
              this.value = e;
            }
            deref() {
              return this.value;
            }
          };
  function b() {
    return { s: 0, v: void 0, o: null, p: null };
  }
  function w(e, t = {}) {
    let n,
      r = b(),
      { resultEqualityCheck: i } = t,
      o = 0;
    function l() {
      let t,
        l = r,
        { length: s } = arguments;
      for (let e = 0; e < s; e++) {
        let t = arguments[e];
        if ("function" == typeof t || ("object" == typeof t && null !== t)) {
          let e = l.o;
          null === e && (l.o = e = new WeakMap());
          let n = e.get(t);
          void 0 === n ? ((l = b()), e.set(t, l)) : (l = n);
        } else {
          let e = l.p;
          null === e && (l.p = e = new Map());
          let n = e.get(t);
          void 0 === n ? ((l = b()), e.set(t, l)) : (l = n);
        }
      }
      let u = l;
      if (1 === l.s) t = l.v;
      else if (((t = e.apply(null, arguments)), o++, i)) {
        let e = n?.deref?.() ?? n;
        (null != e && i(e, t) && ((t = e), 0 !== o && o--),
          (n =
            ("object" == typeof t && null !== t) || "function" == typeof t
              ? new y(t)
              : t));
      }
      return ((u.s = 1), (u.v = t), t);
    }
    return (
      (l.clearCache = () => {
        ((r = b()), l.resetResultsCount());
      }),
      (l.resultsCount = () => o),
      (l.resetResultsCount = () => {
        o = 0;
      }),
      l
    );
  }
  function E(e, ...t) {
    let n = "function" == typeof e ? { memoize: e, memoizeOptions: t } : e,
      i = (...e) => {
        let t,
          i,
          o = 0,
          l = 0,
          s = {},
          u = e.pop();
        ("object" == typeof u && ((s = u), (u = e.pop())),
          (function (
            e,
            t = `expected a function, instead received ${typeof e}`,
          ) {
            if ("function" != typeof e) throw TypeError(t);
          })(
            u,
            `createSelector expects an output function after the inputs, but received: [${typeof u}]`,
          ));
        let {
            memoize: a,
            memoizeOptions: c = [],
            argsMemoize: f = w,
            argsMemoizeOptions: d = [],
            devModeChecks: p = {},
          } = { ...n, ...s },
          g = r(c),
          h = r(d),
          m =
            (!(function (
              e,
              t = "expected all items to be functions, instead received the following types: ",
            ) {
              if (!e.every((e) => "function" == typeof e)) {
                let n = e
                  .map((e) =>
                    "function" == typeof e
                      ? `function ${e.name || "unnamed"}()`
                      : typeof e,
                  )
                  .join(", ");
                throw TypeError(`${t}[${n}]`);
              }
            })(
              (t = Array.isArray(e[0]) ? e[0] : e),
              "createSelector expects all input-selectors to be functions, but received the following types: ",
            ),
            t),
          v = a(
            function () {
              return (o++, u.apply(null, arguments));
            },
            ...g,
          );
        return Object.assign(
          f(
            function () {
              l++;
              let e = (function (e, t) {
                let n = [],
                  { length: r } = e;
                for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
                return n;
              })(m, arguments);
              return (i = v.apply(null, e));
            },
            ...h,
          ),
          {
            resultFunc: u,
            memoizedResultFunc: v,
            dependencies: m,
            dependencyRecomputations: () => l,
            resetDependencyRecomputations: () => {
              l = 0;
            },
            lastResult: () => i,
            recomputations: () => o,
            resetRecomputations: () => {
              o = 0;
            },
            memoize: a,
            argsMemoize: f,
          },
        );
      };
    return (Object.assign(i, { withTypes: () => i }), i);
  }
  var x = E(w),
    R = Object.assign(
      (e, t = x) => {
        !(function (e, t = `expected an object, instead received ${typeof e}`) {
          if ("object" != typeof e) throw TypeError(t);
        })(
          e,
          `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`,
        );
        let n = Object.keys(e);
        return t(
          n.map((t) => e[t]),
          (...e) => e.reduce((e, t, r) => ((e[n[r]] = t), e), {}),
        );
      },
      { withTypes: () => R },
    );
  (E({
    memoize: function (e, t) {
      let r,
        {
          equalityCheck: i = v,
          maxSize: o = 1,
          resultEqualityCheck: l,
        } = "object" == typeof t ? t : { equalityCheck: t },
        s = function (e, t) {
          if (null === e || null === t || e.length !== t.length) return !1;
          let { length: n } = e;
          for (let r = 0; r < n; r++) if (!i(e[r], t[r])) return !1;
          return !0;
        },
        u = 0,
        a =
          o <= 1
            ? {
                get: (e) => (r && s(r.key, e) ? r.value : n),
                put(e, t) {
                  r = { key: e, value: t };
                },
                getEntries: () => (r ? [r] : []),
                clear() {
                  r = void 0;
                },
              }
            : (function (e, t) {
                let r = [];
                function i(e) {
                  let i = r.findIndex((n) => t(e, n.key));
                  if (i > -1) {
                    let e = r[i];
                    return (i > 0 && (r.splice(i, 1), r.unshift(e)), e.value);
                  }
                  return n;
                }
                return {
                  get: i,
                  put: function (t, o) {
                    i(t) === n &&
                      (r.unshift({ key: t, value: o }),
                      r.length > e && r.pop());
                  },
                  getEntries: function () {
                    return r;
                  },
                  clear: function () {
                    r = [];
                  },
                };
              })(o, s);
      function c() {
        let t = a.get(arguments);
        if (t === n) {
          if (((t = e.apply(null, arguments)), u++, l)) {
            let e = a.getEntries().find((e) => l(e.value, t));
            e && ((t = e.value), 0 !== u && u--);
          }
          a.put(arguments, t);
        }
        return t;
      }
      return (
        (c.clearCache = () => {
          (a.clear(), c.resetResultsCount());
        }),
        (c.resultsCount = () => u),
        (c.resetResultsCount = () => {
          u = 0;
        }),
        c
      );
    },
    memoizeOptions: { maxSize: 1, equalityCheck: Object.is },
  }),
    e.s(
      [
        "f",
        0,
        (e, n, r, i, o, l, ...s) => {
          let u;
          if (s.length > 0) throw Error((0, t.f)(1));
          if (e && n && r && i && o && l)
            u = (t, s, u, a) =>
              l(
                e(t, s, u, a),
                n(t, s, u, a),
                r(t, s, u, a),
                i(t, s, u, a),
                o(t, s, u, a),
                s,
                u,
                a,
              );
          else if (e && n && r && i && o)
            u = (t, l, s, u) =>
              o(
                e(t, l, s, u),
                n(t, l, s, u),
                r(t, l, s, u),
                i(t, l, s, u),
                l,
                s,
                u,
              );
          else if (e && n && r && i)
            u = (t, o, l, s) =>
              i(e(t, o, l, s), n(t, o, l, s), r(t, o, l, s), o, l, s);
          else if (e && n && r)
            u = (t, i, o, l) => r(e(t, i, o, l), n(t, i, o, l), i, o, l);
          else if (e && n) u = (t, r, i, o) => n(e(t, r, i, o), r, i, o);
          else if (e) u = e;
          else throw Error("Missing arguments");
          return u;
        },
      ],
      209296,
    ));
  var S = e.i(352386),
    T = e.i(33347),
    C = e.i(551165),
    k = e.i(189572),
    O = e.i(659208);
  let I = (0, k.f)(19)
    ? function (e, t, n, r, i) {
        let o,
          l = (0, O._)();
        if (!l) {
          let o;
          return (
            (o = S.useCallback(
              () => t(e.getSnapshot(), n, r, i),
              [e, t, n, r, i],
            )),
            (0, T.useSyncExternalStore)(e.subscribe, o, o)
          );
        }
        let s = l.syncIndex;
        return (
          (l.syncIndex += 1),
          l.didInitialize
            ? ((o = l.syncHooks[s]).store === e &&
                o.selector === t &&
                Object.is(o.a1, n) &&
                Object.is(o.a2, r) &&
                Object.is(o.a3, i)) ||
              (o.store !== e && (l.didChangeStore = !0),
              (o.store = e),
              (o.selector = t),
              (o.a1 = n),
              (o.a2 = r),
              (o.a3 = i),
              (o.didChange = !0))
            : ((o = {
                store: e,
                selector: t,
                a1: n,
                a2: r,
                a3: i,
                value: t(e.getSnapshot(), n, r, i),
                didChange: !1,
              }),
              l.syncHooks.push(o)),
          o.value
        );
      }
    : function (e, t, n, r, i) {
        return (0, C.useSyncExternalStoreWithSelector)(
          e.subscribe,
          e.getSnapshot,
          e.getSnapshot,
          (e) => t(e, n, r, i),
        );
      };
  (0, O.V)({
    before(e) {
      ((e.syncIndex = 0),
        e.didInitialize ||
          ((e.syncTick = 1),
          (e.syncHooks = []),
          (e.didChangeStore = !0),
          (e.getSnapshot = () => {
            let t = !1;
            for (let n = 0; n < e.syncHooks.length; n += 1) {
              let r = e.syncHooks[n],
                i = r.selector(r.store.state, r.a1, r.a2, r.a3);
              (r.didChange || !Object.is(r.value, i)) &&
                ((t = !0), (r.value = i), (r.didChange = !1));
            }
            return (t && (e.syncTick += 1), e.syncTick);
          })));
    },
    after(e) {
      e.syncHooks.length > 0 &&
        (e.didChangeStore &&
          ((e.didChangeStore = !1),
          (e.subscribe = (t) => {
            let n = new Set();
            for (let t of e.syncHooks) n.add(t.store);
            let r = [];
            for (let e of n) r.push(e.subscribe(t));
            return () => {
              for (let e of r) e();
            };
          })),
        (0, T.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot));
    },
  });
  class P {
    constructor(e) {
      ((this.state = e), (this.listeners = new Set()), (this.updateTick = 0));
    }
    subscribe = (e) => (
      this.listeners.add(e),
      () => {
        this.listeners.delete(e);
      }
    );
    getSnapshot = () => this.state;
    setState(e) {
      if (this.state === e) return;
      ((this.state = e), (this.updateTick += 1));
      let t = this.updateTick;
      for (let n of this.listeners) {
        if (t !== this.updateTick) return;
        n(e);
      }
    }
    update(e) {
      for (let t in e)
        if (!Object.is(this.state[t], e[t]))
          return void this.setState({ ...this.state, ...e });
    }
    set(e, t) {
      Object.is(this.state[e], t) || this.setState({ ...this.state, [e]: t });
    }
    notifyAll() {
      let e = { ...this.state };
      this.setState(e);
    }
    use(e, t, n, r) {
      return I(this, e, t, n, r);
    }
  }
  var M = e.i(278051),
    A = e.i(565693),
    L = e.i(297454);
  e.s(
    [
      "f",
      0,
      class extends P {
        constructor(e, t = {}, n) {
          (super(e), (this.context = t), (this.selectors = n));
        }
        useSyncedValue(e, t) {
          (S.useDebugValue(e),
            (0, A.f)(() => {
              this.state[e] !== t && this.set(e, t);
            }, [e, t]));
        }
        useSyncedValueWithCleanup(e, t) {
          let n = this;
          (0, A.f)(
            () => (
              n.state[e] !== t && n.set(e, t),
              () => {
                n.set(e, void 0);
              }
            ),
            [n, e, t],
          );
        }
        useSyncedValues(e) {
          let t = this,
            n = Object.values(e);
          (0, A.f)(() => {
            t.update(e);
          }, [t, ...n]);
        }
        useControlledProp(e, t) {
          S.useDebugValue(e);
          let n = void 0 !== t;
          (0, A.f)(() => {
            n &&
              !Object.is(this.state[e], t) &&
              super.setState({ ...this.state, [e]: t });
          }, [e, t, n]);
        }
        select(e, t, n, r) {
          return (0, this.selectors[e])(this.state, t, n, r);
        }
        useState(e, t, n, r) {
          return (S.useDebugValue(e), I(this, this.selectors[e], t, n, r));
        }
        useContextCallback(e, t) {
          S.useDebugValue(e);
          let n = (0, M.f)(t ?? L.x);
          this.context[e] = n;
        }
        useStateSetter(e) {
          let t = S.useRef(void 0);
          return (
            void 0 === t.current &&
              (t.current = (t) => {
                this.set(e, t);
              }),
            t.current
          );
        }
        observe(e, t) {
          let n,
            r = (n = "function" == typeof e ? e : this.selectors[e])(
              this.state,
            );
          return (
            t(r, r, this),
            this.subscribe((e) => {
              let i = n(e);
              if (!Object.is(r, i)) {
                let e = r;
                ((r = i), t(i, e, this));
              }
            })
          );
        }
      },
    ],
    726062,
  );
};
