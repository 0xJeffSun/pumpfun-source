// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n, r, a, i, s, o, l, c, u, d, p, f, h, m, y, g, w, b;
  e.s(
    [
      "f",
      0,
      function () {
        let e = new Set(),
          t = [],
          n = () =>
            (function (e) {
              if ("u" < typeof window) return;
              let t = (t) => e(t.detail);
              return (
                window.addEventListener("eip6963:announceProvider", t),
                window.dispatchEvent(
                  new CustomEvent("eip6963:requestProvider"),
                ),
                () => window.removeEventListener("eip6963:announceProvider", t)
              );
            })((n) => {
              t.some(({ info: e }) => e.uuid === n.info.uuid) ||
                ((t = [...t, n]), e.forEach((e) => e(t, { added: [n] })));
            }),
          r = n();
        return {
          _listeners: () => e,
          clear() {
            (e.forEach((e) => e([], { removed: [...t] })), (t = []));
          },
          destroy() {
            (this.clear(), e.clear(), r?.());
          },
          findProvider: ({ rdns: e }) => t.find((t) => t.info.rdns === e),
          getProviders: () => t,
          reset() {
            (this.clear(), r?.(), (r = n()));
          },
          subscribe: (n, { emitImmediately: r } = {}) => (
            e.add(n),
            r && n(t, { added: t }),
            () => e.delete(n)
          ),
        };
      },
    ],
    804562,
  );
  var v,
    T,
    A,
    E,
    k,
    x,
    P,
    C = e.i(689391),
    S = e.i(732486),
    _ = e.i(352386);
  function I(e) {
    "function" == typeof queueMicrotask
      ? queueMicrotask(e)
      : Promise.resolve()
          .then(e)
          .catch((e) =>
            setTimeout(() => {
              throw e;
            }),
          );
  }
  function N() {
    let e = [],
      t = {
        addEventListener: (e, n, r, a) => (
          e.addEventListener(n, r, a),
          t.add(() => e.removeEventListener(n, r, a))
        ),
        requestAnimationFrame(...e) {
          let n = requestAnimationFrame(...e);
          return t.add(() => cancelAnimationFrame(n));
        },
        nextFrame: (...e) =>
          t.requestAnimationFrame(() => t.requestAnimationFrame(...e)),
        setTimeout(...e) {
          let n = setTimeout(...e);
          return t.add(() => clearTimeout(n));
        },
        microTask(...e) {
          let n = { current: !0 };
          return (
            I(() => {
              n.current && e[0]();
            }),
            t.add(() => {
              n.current = !1;
            })
          );
        },
        style(e, t, n) {
          let r = e.style.getPropertyValue(t);
          return (
            Object.assign(e.style, { [t]: n }),
            this.add(() => {
              Object.assign(e.style, { [t]: r });
            })
          );
        },
        group(e) {
          let t = N();
          return (e(t), this.add(() => t.dispose()));
        },
        add: (t) => (
          e.includes(t) || e.push(t),
          () => {
            let n = e.indexOf(t);
            if (n >= 0) for (let t of e.splice(n, 1)) t();
          }
        ),
        dispose() {
          for (let t of e.splice(0)) t();
        },
      };
    return t;
  }
  function M() {
    let [e] = (0, _.useState)(N);
    return ((0, _.useEffect)(() => () => e.dispose(), [e]), e);
  }
  (e.s(["f", 0, N], 464427), e.s(["f", 0, M], 555361));
  var R = Object.defineProperty,
    O = (e, t, n) => {
      let r;
      return (
        (r = "symbol" != typeof t ? t + "" : t) in e
          ? R(e, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: n,
            })
          : (e[r] = n),
        n
      );
    };
  let F = new (class {
      constructor() {
        (O(this, "current", this.detect()),
          O(this, "handoffState", "pending"),
          O(this, "currentId", 0));
      }
      set(e) {
        this.current !== e &&
          ((this.handoffState = "pending"),
          (this.currentId = 0),
          (this.current = e));
      }
      reset() {
        this.set(this.detect());
      }
      nextId() {
        return ++this.currentId;
      }
      get isServer() {
        return "server" === this.current;
      }
      get isClient() {
        return "client" === this.current;
      }
      detect() {
        return "u" < typeof window || "u" < typeof document
          ? "server"
          : "client";
      }
      handoff() {
        "pending" === this.handoffState && (this.handoffState = "complete");
      }
      get isHandoffComplete() {
        return "complete" === this.handoffState;
      }
    })(),
    U = (e, t) => {
      F.isServer ? (0, _.useEffect)(e, t) : (0, _.useLayoutEffect)(e, t);
    };
  function L(e) {
    let t = (0, _.useRef)(e);
    return (
      U(() => {
        t.current = e;
      }, [e]),
      t
    );
  }
  e.s(["f", 0, U], 279116);
  let D = function (e) {
    let t = L(e);
    return _.default.useCallback((...e) => t.current(...e), [t]);
  };
  function B() {
    let e = (0, _.useRef)(!1);
    return (
      U(
        () => (
          (e.current = !0),
          () => {
            e.current = !1;
          }
        ),
        [],
      ),
      e
    );
  }
  function W() {
    let e,
      t =
        ((e = "u" < typeof document),
        "useSyncExternalStore" in _ &&
          (0, _.useSyncExternalStore)(
            () => () => {},
            () => !1,
            () => !e,
          )),
      [n, r] = _.useState(F.isHandoffComplete);
    return (
      n && !1 === F.isHandoffComplete && r(!1),
      _.useEffect(() => {
        !0 !== n && r(!0);
      }, [n]),
      _.useEffect(() => F.handoff(), []),
      !t && n
    );
  }
  e.s(["f", 0, D], 5741);
  let z = Symbol();
  function j(e, t = !0) {
    return Object.assign(e, { [z]: t });
  }
  function q(...e) {
    let t = (0, _.useRef)(e);
    (0, _.useEffect)(() => {
      t.current = e;
    }, [e]);
    let n = D((e) => {
      for (let n of t.current)
        null != n && ("function" == typeof n ? n(e) : (n.current = e));
    });
    return e.every((e) => null == e || (null == e ? void 0 : e[z]))
      ? void 0
      : n;
  }
  e.s(["f", 0, j, "V", 0, q], 285972);
  var H = e.i(149502);
  void 0 !== H.default &&
    "u" > typeof globalThis &&
    "u" > typeof Element &&
    (null == (A = null == H.default ? void 0 : H.default.env)
      ? void 0
      : A.NODE_ENV) === "test" &&
    void 0 ===
      (null == (E = null == Element ? void 0 : Element.prototype)
        ? void 0
        : E.getAnimations) &&
    (Element.prototype.getAnimations = function () {
      return (
        console.warn(
          [
            "Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.",
            "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.",
            "",
            "Example usage:",
            "```js",
            "import { mockAnimationsApi } from 'jsdom-testing-mocks'",
            "mockAnimationsApi()",
            "```",
          ].join(`
`),
        ),
        []
      );
    });
  var G =
    (((t = G || {})[(t.None = 0)] = "None"),
    (t[(t.Closed = 1)] = "Closed"),
    (t[(t.Enter = 2)] = "Enter"),
    (t[(t.Leave = 4)] = "Leave"),
    t);
  function $(e) {
    let t = {};
    for (let n in e) !0 === e[n] && (t[`data-${n}`] = "");
    return t;
  }
  function V(e, t, n, r) {
    let [a, i] = (0, _.useState)(n),
      {
        hasFlag: s,
        addFlag: o,
        removeFlag: l,
      } = (function (e = 0) {
        let [t, n] = (0, _.useState)(e),
          r = (0, _.useCallback)((e) => n(e), []),
          a = (0, _.useCallback)((e) => n((t) => t | e), []),
          i = (0, _.useCallback)((e) => (t & e) === e, [t]);
        return {
          flags: t,
          setFlag: r,
          addFlag: a,
          hasFlag: i,
          removeFlag: (0, _.useCallback)((e) => n((t) => t & ~e), []),
          toggleFlag: (0, _.useCallback)((e) => n((t) => t ^ e), []),
        };
      })(e && a ? 3 : 0),
      c = (0, _.useRef)(!1),
      u = (0, _.useRef)(!1);
    return (
      U(() => {
        var a;
        if (e) {
          if ((n && i(!0), !t)) {
            n && o(3);
            return;
          }
          return (
            null == (a = null == r ? void 0 : r.start) || a.call(r, n),
            (function (e, { prepare: t, run: n, done: r, inFlight: a }) {
              let i = N();
              return (
                (function (e, { inFlight: t, prepare: n }) {
                  if (null != t && t.current) return n();
                  let r = e.style.transition;
                  ((e.style.transition = "none"),
                    n(),
                    e.offsetHeight,
                    (e.style.transition = r));
                })(e, { prepare: t, inFlight: a }),
                i.nextFrame(() => {
                  (n(),
                    i.requestAnimationFrame(() => {
                      i.add(
                        (function (e, t) {
                          var n, r;
                          let a = N();
                          if (!e) return a.dispose;
                          let i = !1;
                          a.add(() => {
                            i = !0;
                          });
                          let s =
                            null !=
                            (r =
                              null == (n = e.getAnimations)
                                ? void 0
                                : n
                                    .call(e)
                                    .filter((e) => e instanceof CSSTransition))
                              ? r
                              : [];
                          return (
                            0 === s.length
                              ? t()
                              : Promise.allSettled(
                                  s.map((e) => e.finished),
                                ).then(() => {
                                  i || t();
                                }),
                            a.dispose
                          );
                        })(e, r),
                      );
                    }));
                }),
                i.dispose
              );
            })(t, {
              inFlight: c,
              prepare() {
                (u.current ? (u.current = !1) : (u.current = c.current),
                  (c.current = !0),
                  u.current || (n ? (o(3), l(4)) : (o(4), l(2))));
              },
              run() {
                u.current ? (n ? (l(3), o(4)) : (l(4), o(3))) : n ? l(1) : o(1);
              },
              done() {
                var e, a, s, o;
                (u.current &&
                  (null !=
                  (o = null == (s = (a = t).getAnimations) ? void 0 : s.call(a))
                    ? o
                    : []
                  ).some(
                    (e) =>
                      e instanceof CSSTransition && "finished" !== e.playState,
                  )) ||
                  ((c.current = !1),
                  l(7),
                  n || i(!1),
                  null == (e = null == r ? void 0 : r.end) || e.call(r, n));
              },
            })
          );
        }
      }, [e, n, t, M()]),
      e
        ? [
            a,
            {
              closed: s(1),
              enter: s(2),
              leave: s(4),
              transition: s(2) || s(4),
            },
          ]
        : [
            n,
            {
              closed: void 0,
              enter: void 0,
              leave: void 0,
              transition: void 0,
            },
          ]
    );
  }
  e.s(["p", 0, $, "S", 0, V], 437421);
  let K = (0, _.createContext)(null);
  K.displayName = "OpenClosedContext";
  var J =
    (((n = J || {})[(n.Open = 1)] = "Open"),
    (n[(n.Closed = 2)] = "Closed"),
    (n[(n.Closing = 4)] = "Closing"),
    (n[(n.Opening = 8)] = "Opening"),
    n);
  function X() {
    return (0, _.useContext)(K);
  }
  function Y({ value: e, children: t }) {
    return _.default.createElement(K.Provider, { value: e }, t);
  }
  function Z({ children: e }) {
    return _.default.createElement(K.Provider, { value: null }, e);
  }
  function Q(...e) {
    return Array.from(
      new Set(e.flatMap((e) => ("string" == typeof e ? e.split(" ") : []))),
    )
      .filter(Boolean)
      .join(" ");
  }
  function ee(e, t, ...n) {
    if (e in t) {
      let r = t[e];
      return "function" == typeof r ? r(...n) : r;
    }
    let r = Error(
      `Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
        t,
      )
        .map((e) => `"${e}"`)
        .join(", ")}.`,
    );
    throw (Error.captureStackTrace && Error.captureStackTrace(r, ee), r);
  }
  (e.s(["z", 0, Y, "P", 0, Z, "A", 0, J, "N", 0, X], 623388),
    e.s(["f", 0, ee], 957932));
  var et =
      (((r = et || {})[(r.None = 0)] = "None"),
      (r[(r.RenderStrategy = 1)] = "RenderStrategy"),
      (r[(r.Static = 2)] = "Static"),
      r),
    en =
      (((a = en || {})[(a.Unmount = 0)] = "Unmount"),
      (a[(a.Hidden = 1)] = "Hidden"),
      a);
  function er() {
    let e,
      t,
      n =
        ((e = (0, _.useRef)([])),
        (t = (0, _.useCallback)((t) => {
          for (let n of e.current)
            null != n && ("function" == typeof n ? n(t) : (n.current = t));
        }, [])),
        (...n) => {
          if (!n.every((e) => null == e)) return ((e.current = n), t);
        });
    return (0, _.useCallback)(
      (e) =>
        (function ({
          ourProps: e,
          theirProps: t,
          slot: n,
          defaultTag: r,
          features: a,
          visible: i = !0,
          name: s,
          mergeRefs: o,
        }) {
          o = null != o ? o : ei;
          let l = es(t, e);
          if (i) return ea(l, n, r, s, o);
          let c = null != a ? a : 0;
          if (2 & c) {
            let { static: e = !1, ...t } = l;
            if (e) return ea(t, n, r, s, o);
          }
          if (1 & c) {
            let { unmount: e = !0, ...t } = l;
            return ee(+!e, {
              0: () => null,
              1: () =>
                ea(
                  { ...t, hidden: !0, style: { display: "none" } },
                  n,
                  r,
                  s,
                  o,
                ),
            });
          }
          return ea(l, n, r, s, o);
        })({ mergeRefs: n, ...e }),
      [n],
    );
  }
  function ea(e, t = {}, n, r, a) {
    let {
        as: i = n,
        children: s,
        refName: o = "ref",
        ...l
      } = ec(e, ["unmount", "static"]),
      c = void 0 !== e.ref ? { [o]: e.ref } : {},
      u = "function" == typeof s ? s(t) : s;
    ("className" in l &&
      l.className &&
      "function" == typeof l.className &&
      (l.className = l.className(t)),
      l["aria-labelledby"] &&
        l["aria-labelledby"] === l.id &&
        (l["aria-labelledby"] = void 0));
    let d = {};
    if (t) {
      let e = !1,
        n = [];
      for (let [r, a] of Object.entries(t))
        ("boolean" == typeof a && (e = !0),
          !0 === a &&
            n.push(r.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`)));
      if (e)
        for (let e of ((d["data-headlessui-state"] = n.join(" ")), n))
          d[`data-${e}`] = "";
    }
    if (
      eu(i) &&
      (Object.keys(el(l)).length > 0 || Object.keys(el(d)).length > 0)
    )
      if (
        !(0, _.isValidElement)(u) ||
        (Array.isArray(u) && u.length > 1) ||
        eu(u.type)
      ) {
        if (Object.keys(el(l)).length > 0)
          throw Error(
            [
              'Passing props on "Fragment"!',
              "",
              `The current component <${r} /> is rendering a "Fragment".`,
              "However we need to passthrough the following props:",
              Object.keys(el(l))
                .concat(Object.keys(el(d)))
                .map((e) => `  - ${e}`).join(`
`),
              "",
              "You can apply a few solutions:",
              [
                'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
                "Render a single element as the child so that we can forward the props onto that element.",
              ].map((e) => `  - ${e}`).join(`
`),
            ].join(`
`),
          );
      } else {
        var p;
        let e = u.props,
          t = null == e ? void 0 : e.className,
          n =
            "function" == typeof t
              ? (...e) => Q(t(...e), l.className)
              : Q(t, l.className),
          r = es(u.props, el(ec(l, ["ref"])));
        for (let e in d) e in r && delete d[e];
        return (0, _.cloneElement)(
          u,
          Object.assign(
            {},
            r,
            d,
            c,
            {
              ref: a(
                ((p = u),
                _.default.version.split(".")[0] >= "19" ? p.props.ref : p.ref),
                c.ref,
              ),
            },
            n ? { className: n } : {},
          ),
        );
      }
    return (0, _.createElement)(
      i,
      Object.assign({}, ec(l, ["ref"]), !eu(i) && c, !eu(i) && d),
      u,
    );
  }
  function ei(...e) {
    return e.every((e) => null == e)
      ? void 0
      : (t) => {
          for (let n of e)
            null != n && ("function" == typeof n ? n(t) : (n.current = t));
        };
  }
  function es(...e) {
    if (0 === e.length) return {};
    if (1 === e.length) return e[0];
    let t = {},
      n = {};
    for (let r of e)
      for (let e in r)
        e.startsWith("on") && "function" == typeof r[e]
          ? (null != n[e] || (n[e] = []), n[e].push(r[e]))
          : (t[e] = r[e]);
    if (t.disabled || t["aria-disabled"])
      for (let e in n)
        /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e) &&
          (n[e] = [
            (e) => {
              var t;
              return null == (t = null == e ? void 0 : e.preventDefault)
                ? void 0
                : t.call(e);
            },
          ]);
    for (let e in n)
      Object.assign(t, {
        [e](t, ...r) {
          for (let a of n[e]) {
            if (
              (t instanceof Event ||
                (null == t ? void 0 : t.nativeEvent) instanceof Event) &&
              t.defaultPrevented
            )
              return;
            a(t, ...r);
          }
        },
      });
    return t;
  }
  function eo(e) {
    var t;
    return Object.assign((0, _.forwardRef)(e), {
      displayName: null != (t = e.displayName) ? t : e.name,
    });
  }
  function el(e) {
    let t = Object.assign({}, e);
    for (let e in t) void 0 === t[e] && delete t[e];
    return t;
  }
  function ec(e, t = []) {
    let n = Object.assign({}, e);
    for (let e of t) e in n && delete n[e];
    return n;
  }
  function eu(e) {
    return e === _.Fragment || e === Symbol.for("react.fragment");
  }
  function ed(e) {
    var t;
    return (
      !!(
        e.enter ||
        e.enterFrom ||
        e.enterTo ||
        e.leave ||
        e.leaveFrom ||
        e.leaveTo
      ) ||
      !eu(null != (t = e.as) ? t : eg) ||
      1 === _.default.Children.count(e.children)
    );
  }
  e.s(
    [
      "J",
      0,
      et,
      "j",
      0,
      en,
      "x",
      0,
      el,
      "t",
      0,
      eo,
      "F",
      0,
      eu,
      "w",
      0,
      function (...e) {
        if (0 === e.length) return {};
        if (1 === e.length) return e[0];
        let t = {},
          n = {};
        for (let r of e)
          for (let e in r)
            e.startsWith("on") && "function" == typeof r[e]
              ? (null != n[e] || (n[e] = []), n[e].push(r[e]))
              : (t[e] = r[e]);
        for (let e in n)
          Object.assign(t, {
            [e](...t) {
              for (let r of n[e]) null == r || r(...t);
            },
          });
        return t;
      },
      "n",
      0,
      er,
    ],
    621418,
  );
  let ep = (0, _.createContext)(null);
  ep.displayName = "TransitionContext";
  var ef = (((i = ef || {}).Visible = "visible"), (i.Hidden = "hidden"), i);
  let eh = (0, _.createContext)(null);
  function em(e) {
    return "children" in e
      ? em(e.children)
      : e.current
          .filter(({ el: e }) => null !== e.current)
          .filter(({ state: e }) => "visible" === e).length > 0;
  }
  function ey(e, t) {
    let n = L(e),
      r = (0, _.useRef)([]),
      a = B(),
      i = M(),
      s = D((e, t = en.Hidden) => {
        let s = r.current.findIndex(({ el: t }) => t === e);
        -1 !== s &&
          (ee(t, {
            [en.Unmount]() {
              r.current.splice(s, 1);
            },
            [en.Hidden]() {
              r.current[s].state = "hidden";
            },
          }),
          i.microTask(() => {
            var e;
            !em(r) && a.current && (null == (e = n.current) || e.call(n));
          }));
      }),
      o = D((e) => {
        let t = r.current.find(({ el: t }) => t === e);
        return (
          t
            ? "visible" !== t.state && (t.state = "visible")
            : r.current.push({ el: e, state: "visible" }),
          () => s(e, en.Unmount)
        );
      }),
      l = (0, _.useRef)([]),
      c = (0, _.useRef)(Promise.resolve()),
      u = (0, _.useRef)({ enter: [], leave: [] }),
      d = D((e, n, r) => {
        (l.current.splice(0),
          t &&
            (t.chains.current[n] = t.chains.current[n].filter(
              ([t]) => t !== e,
            )),
          null == t ||
            t.chains.current[n].push([
              e,
              new Promise((e) => {
                l.current.push(e);
              }),
            ]),
          null == t ||
            t.chains.current[n].push([
              e,
              new Promise((e) => {
                Promise.all(u.current[n].map(([e, t]) => t)).then(() => e());
              }),
            ]),
          "enter" === n
            ? (c.current = c.current
                .then(() => (null == t ? void 0 : t.wait.current))
                .then(() => r(n)))
            : r(n));
      }),
      p = D((e, t, n) => {
        Promise.all(u.current[t].splice(0).map(([e, t]) => t))
          .then(() => {
            var e;
            null == (e = l.current.shift()) || e();
          })
          .then(() => n(t));
      });
    return (0, _.useMemo)(
      () => ({
        children: r,
        register: o,
        unregister: s,
        onStart: d,
        onStop: p,
        wait: c,
        chains: u,
      }),
      [o, s, r, d, p, u, c],
    );
  }
  eh.displayName = "NestingContext";
  let eg = _.Fragment,
    ew = et.RenderStrategy,
    eb = eo(function (e, t) {
      let { show: n, appear: r = !1, unmount: a = !0, ...i } = e,
        s = (0, _.useRef)(null),
        o = q(...(ed(e) ? [s, t] : null === t ? [] : [t]));
      W();
      let l = X();
      if (
        (void 0 === n && null !== l && (n = (l & J.Open) === J.Open),
        void 0 === n)
      )
        throw Error(
          "A <Transition /> is used but it is missing a `show={true | false}` prop.",
        );
      let [c, u] = (0, _.useState)(n ? "visible" : "hidden"),
        d = ey(() => {
          n || u("hidden");
        }),
        [p, f] = (0, _.useState)(!0),
        h = (0, _.useRef)([n]);
      U(() => {
        !1 !== p &&
          h.current[h.current.length - 1] !== n &&
          (h.current.push(n), f(!1));
      }, [h, n]);
      let m = (0, _.useMemo)(
        () => ({ show: n, appear: r, initial: p }),
        [n, r, p],
      );
      U(() => {
        n ? u("visible") : em(d) || null === s.current || u("hidden");
      }, [n, d]);
      let y = { unmount: a },
        g = D(() => {
          var t;
          (p && f(!1), null == (t = e.beforeEnter) || t.call(e));
        }),
        w = D(() => {
          var t;
          (p && f(!1), null == (t = e.beforeLeave) || t.call(e));
        }),
        b = er();
      return _.default.createElement(
        eh.Provider,
        { value: d },
        _.default.createElement(
          ep.Provider,
          { value: m },
          b({
            ourProps: {
              ...y,
              as: _.Fragment,
              children: _.default.createElement(ev, {
                ref: o,
                ...y,
                ...i,
                beforeEnter: g,
                beforeLeave: w,
              }),
            },
            theirProps: {},
            defaultTag: _.Fragment,
            features: ew,
            visible: "visible" === c,
            name: "Transition",
          }),
        ),
      );
    }),
    ev = eo(function (e, t) {
      var n, r;
      let {
          transition: a = !0,
          beforeEnter: i,
          afterEnter: s,
          beforeLeave: o,
          afterLeave: l,
          enter: c,
          enterFrom: u,
          enterTo: d,
          entered: p,
          leave: f,
          leaveFrom: h,
          leaveTo: m,
          ...y
        } = e,
        [g, w] = (0, _.useState)(null),
        b = (0, _.useRef)(null),
        v = ed(e),
        T = q(...(v ? [b, t, w] : null === t ? [] : [t])),
        A = null == (n = y.unmount) || n ? en.Unmount : en.Hidden,
        {
          show: E,
          appear: k,
          initial: x,
        } = (function () {
          let e = (0, _.useContext)(ep);
          if (null === e)
            throw Error(
              "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
            );
          return e;
        })(),
        [P, C] = (0, _.useState)(E ? "visible" : "hidden"),
        S = (function () {
          let e = (0, _.useContext)(eh);
          if (null === e)
            throw Error(
              "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.",
            );
          return e;
        })(),
        { register: I, unregister: N } = S;
      (U(() => I(b), [I, b]),
        U(() => {
          if (A === en.Hidden && b.current)
            return E && "visible" !== P
              ? void C("visible")
              : ee(P, { hidden: () => N(b), visible: () => I(b) });
        }, [P, b, I, N, E, A]));
      let M = W();
      U(() => {
        if (v && M && "visible" === P && null === b.current)
          throw Error(
            "Did you forget to passthrough the `ref` to the actual DOM node?",
          );
      }, [b, P, M, v]);
      let R = x && !k,
        O = k && E && x,
        F = (0, _.useRef)(!1),
        L = ey(() => {
          F.current || (C("hidden"), N(b));
        }, S),
        B = D((e) => {
          ((F.current = !0),
            L.onStart(b, e ? "enter" : "leave", (e) => {
              "enter" === e
                ? null == i || i()
                : "leave" === e && (null == o || o());
            }));
        }),
        z = D((e) => {
          let t = e ? "enter" : "leave";
          ((F.current = !1),
            L.onStop(b, t, (e) => {
              "enter" === e
                ? null == s || s()
                : "leave" === e && (null == l || l());
            }),
            "leave" !== t || em(L) || (C("hidden"), N(b)));
        });
      (0, _.useEffect)(() => {
        (v && a) || (B(E), z(E));
      }, [E, v, a]);
      let [, j] = V(!(!a || !v || !M || R), g, E, { start: B, end: z }),
        H = el({
          ref: T,
          className:
            (null ==
            (r = Q(
              y.className,
              O && c,
              O && u,
              j.enter && c,
              j.enter && j.closed && u,
              j.enter && !j.closed && d,
              j.leave && f,
              j.leave && !j.closed && h,
              j.leave && j.closed && m,
              !j.transition && E && p,
            ))
              ? void 0
              : r.trim()) || void 0,
          ...$(j),
        }),
        G = 0;
      ("visible" === P && (G |= J.Open),
        "hidden" === P && (G |= J.Closed),
        E && "hidden" === P && (G |= J.Opening),
        E || "visible" !== P || (G |= J.Closing));
      let K = er();
      return _.default.createElement(
        eh.Provider,
        { value: L },
        _.default.createElement(
          Y,
          { value: G },
          K({
            ourProps: H,
            theirProps: y,
            defaultTag: eg,
            features: ew,
            visible: "visible" === P,
            name: "Transition.Child",
          }),
        ),
      );
    }),
    eT = eo(function (e, t) {
      let n = null !== (0, _.useContext)(ep),
        r = null !== X();
      return _.default.createElement(
        _.default.Fragment,
        null,
        !n && r
          ? _.default.createElement(eb, { ref: t, ...e })
          : _.default.createElement(ev, { ref: t, ...e }),
      );
    }),
    eA = Object.assign(eb, { Child: eT, Root: eb });
  var eE =
    (((s = eE || {}).Space = " "),
    (s.Enter = "Enter"),
    (s.Escape = "Escape"),
    (s.Backspace = "Backspace"),
    (s.Delete = "Delete"),
    (s.ArrowLeft = "ArrowLeft"),
    (s.ArrowUp = "ArrowUp"),
    (s.ArrowRight = "ArrowRight"),
    (s.ArrowDown = "ArrowDown"),
    (s.Home = "Home"),
    (s.End = "End"),
    (s.PageUp = "PageUp"),
    (s.PageDown = "PageDown"),
    (s.Tab = "Tab"),
    s);
  function ek(e, t, n, r) {
    let a = L(n);
    (0, _.useEffect)(() => {
      function n(e) {
        a.current(e);
      }
      return (
        (e = null != e ? e : window).addEventListener(t, n, r),
        () => e.removeEventListener(t, n, r)
      );
    }, [e, t, r]);
  }
  e.s(["f", 0, eE], 152594);
  class ex extends Map {
    constructor(e) {
      (super(), (this.factory = e));
    }
    get(e) {
      let t = super.get(e);
      return (void 0 === t && ((t = this.factory(e)), this.set(e, t)), t);
    }
  }
  var eP = Object.defineProperty,
    eC = (e, t, n) => {
      if (!t.has(e)) throw TypeError("Cannot " + n);
    },
    eS = (e, t, n) => (
      eC(e, t, "read from private field"),
      n ? n.call(e) : t.get(e)
    ),
    e_ = (e, t, n) => {
      if (t.has(e))
        throw TypeError("Cannot add the same private member more than once");
      t instanceof WeakSet ? t.add(e) : t.set(e, n);
    },
    eI = (e, t, n, r) => (
      eC(e, t, "write to private field"),
      r ? r.call(e, n) : t.set(e, n),
      n
    );
  class eN {
    constructor(e) {
      var t, n;
      let r;
      (e_(this, k, {}),
        e_(this, x, new ex(() => new Set())),
        e_(this, P, new Set()),
        (t = "disposables"),
        (n = N()),
        (r = "symbol" != typeof t ? t + "" : t) in this
          ? eP(this, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: n,
            })
          : (this[r] = n),
        eI(this, k, e),
        F.isServer &&
          this.disposables.microTask(() => {
            this.dispose();
          }));
    }
    dispose() {
      this.disposables.dispose();
    }
    get state() {
      return eS(this, k);
    }
    subscribe(e, t) {
      if (F.isServer) return () => {};
      let n = { selector: e, callback: t, current: e(eS(this, k)) };
      return (
        eS(this, P).add(n),
        this.disposables.add(() => {
          eS(this, P).delete(n);
        })
      );
    }
    on(e, t) {
      return F.isServer
        ? () => {}
        : (eS(this, x).get(e).add(t),
          this.disposables.add(() => {
            eS(this, x).get(e).delete(t);
          }));
    }
    send(e) {
      let t = this.reduce(eS(this, k), e);
      if (t !== eS(this, k)) {
        for (let e of (eI(this, k, t), eS(this, P))) {
          let t = e.selector(eS(this, k));
          eM(e.current, t) || ((e.current = t), e.callback(t));
        }
        for (let t of eS(this, x).get(e.type)) t(eS(this, k), e);
      }
    }
  }
  function eM(e, t) {
    return (
      !!Object.is(e, t) ||
      ("object" == typeof e &&
        null !== e &&
        "object" == typeof t &&
        null !== t &&
        (Array.isArray(e) && Array.isArray(t)
          ? e.length === t.length &&
            eR(e[Symbol.iterator](), t[Symbol.iterator]())
          : (e instanceof Map && t instanceof Map) ||
              (e instanceof Set && t instanceof Set)
            ? e.size === t.size && eR(e.entries(), t.entries())
            : !!(eO(e) && eO(t)) &&
              eR(
                Object.entries(e)[Symbol.iterator](),
                Object.entries(t)[Symbol.iterator](),
              )))
    );
  }
  function eR(e, t) {
    for (;;) {
      let n = e.next(),
        r = t.next();
      if (n.done && r.done) return !0;
      if (n.done || r.done || !Object.is(n.value, r.value)) return !1;
    }
  }
  function eO(e) {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
    let t = Object.getPrototypeOf(e);
    return null === t || null === Object.getPrototypeOf(t);
  }
  ((k = new WeakMap()),
    (x = new WeakMap()),
    (P = new WeakMap()),
    e.s(
      [
        "$",
        0,
        eN,
        "W",
        0,
        function (e) {
          let [t, n] = e(),
            r = N();
          return (...e) => {
            (t(...e), r.dispose(), r.microTask(n));
          };
        },
        "o",
        0,
        eM,
      ],
      756345,
    ));
  var eF = Object.defineProperty,
    eU = (e, t, n) => {
      let r;
      return (
        (r = "symbol" != typeof t ? t + "" : t) in e
          ? eF(e, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: n,
            })
          : (e[r] = n),
        n
      );
    },
    eL = (((o = eL || {})[(o.Push = 0)] = "Push"), (o[(o.Pop = 1)] = "Pop"), o);
  let eD = {
    0(e, t) {
      let n = t.id,
        r = e.stack,
        a = e.stack.indexOf(n);
      if (-1 !== a) {
        let t = e.stack.slice();
        return (t.splice(a, 1), t.push(n), (r = t), { ...e, stack: r });
      }
      return { ...e, stack: [...e.stack, n] };
    },
    1(e, t) {
      let n = t.id,
        r = e.stack.indexOf(n);
      if (-1 === r) return e;
      let a = e.stack.slice();
      return (a.splice(r, 1), { ...e, stack: a });
    },
  };
  class eB extends eN {
    constructor() {
      (super(...arguments),
        eU(this, "actions", {
          push: (e) => this.send({ type: 0, id: e }),
          pop: (e) => this.send({ type: 1, id: e }),
        }),
        eU(this, "selectors", {
          isTop: (e, t) => e.stack[e.stack.length - 1] === t,
          inStack: (e, t) => e.stack.includes(t),
        }));
    }
    static new() {
      return new eB({ stack: [] });
    }
    reduce(e, t) {
      return ee(t.type, eD, e, t);
    }
  }
  let eW = new ex(() => eB.new());
  e.s(["R", 0, eL, "l", 0, eW], 719036);
  var ez = e.i(129852);
  function ej(e, t, n = eM) {
    return (0, ez.useSyncExternalStoreWithSelector)(
      D((t) => e.subscribe(eq, t)),
      D(() => e.state),
      D(() => e.state),
      D(t),
      n,
    );
  }
  function eq(e) {
    return e;
  }
  function eH(e, t) {
    let n = (0, _.useId)(),
      r = eW.get(t),
      [a, i] = ej(
        r,
        (0, _.useCallback)(
          (e) => [r.selectors.isTop(e, n), r.selectors.inStack(e, n)],
          [r, n],
        ),
      );
    return (
      U(() => {
        if (e) return (r.actions.push(n), () => r.actions.pop(n));
      }, [r, e, n]),
      !!e && (!i || a)
    );
  }
  function eG(e) {
    var t;
    return F.isServer
      ? null
      : null == e
        ? document
        : null != (t = null == e ? void 0 : e.ownerDocument)
          ? t
          : document;
  }
  function e$(e) {
    var t, n;
    return F.isServer
      ? null
      : null == e
        ? document
        : null !=
            (n =
              null == (t = null == e ? void 0 : e.getRootNode)
                ? void 0
                : t.call(e))
          ? n
          : document;
  }
  function eV(e) {
    var t, n;
    return null != (n = null == (t = e$(e)) ? void 0 : t.activeElement)
      ? n
      : null;
  }
  function eK(e) {
    return eV(e) === e;
  }
  (e.s(["f", 0, ej], 892009),
    e.s(["z", 0, eV, "o", 0, eG, "g", 0, e$, "M", 0, eK], 327422));
  let eJ = new Map(),
    eX = new Map();
  function eY(e) {
    var t;
    let n = null != (t = eX.get(e)) ? t : 0;
    return (
      eX.set(e, n + 1),
      0 !== n
        ? () => eZ(e)
        : (eJ.set(e, {
            "aria-hidden": e.getAttribute("aria-hidden"),
            inert: e.inert,
          }),
          e.setAttribute("aria-hidden", "true"),
          (e.inert = !0),
          () => eZ(e))
    );
  }
  function eZ(e) {
    var t;
    let n = null != (t = eX.get(e)) ? t : 1;
    if ((1 === n ? eX.delete(e) : eX.set(e, n - 1), 1 !== n)) return;
    let r = eJ.get(e);
    r &&
      (null === r["aria-hidden"]
        ? e.removeAttribute("aria-hidden")
        : e.setAttribute("aria-hidden", r["aria-hidden"]),
      (e.inert = r.inert),
      eJ.delete(e));
  }
  function eQ(e, { allowed: t, disallowed: n } = {}) {
    let r = eH(e, "inert-others");
    U(() => {
      var e, a;
      if (!r) return;
      let i = N();
      for (let t of null != (e = null == n ? void 0 : n()) ? e : [])
        t && i.add(eY(t));
      let s = null != (a = null == t ? void 0 : t()) ? a : [];
      for (let e of s) {
        if (!e) continue;
        let t = eG(e);
        if (!t) continue;
        let n = e.parentElement;
        for (; n && n !== t.body; ) {
          for (let e of n.children)
            s.some((t) => e.contains(t)) || i.add(eY(e));
          n = n.parentElement;
        }
      }
      return i.dispose;
    }, [r, t, n]);
  }
  function e0(e) {
    return "object" == typeof e && null !== e && "nodeType" in e;
  }
  function e1(e) {
    return e0(e) && "tagName" in e;
  }
  function e2(e) {
    return e1(e) && "accessKey" in e;
  }
  function e3(e) {
    return e1(e) && "tabIndex" in e;
  }
  function e5(e) {
    return e1(e) && "style" in e;
  }
  function e6(e) {
    return e2(e) && "IFRAME" === e.nodeName;
  }
  function e4(e) {
    return e2(e) && "INPUT" === e.nodeName;
  }
  function e8(e, t, n) {
    let r = L((e) => {
      let t = e.getBoundingClientRect();
      0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height && n();
    });
    (0, _.useEffect)(() => {
      if (!e) return;
      let n = null === t ? null : e2(t) ? t : t.current;
      if (!n) return;
      let a = N();
      if ("u" > typeof ResizeObserver) {
        let e = new ResizeObserver(() => r.current(n));
        (e.observe(n), a.add(() => e.disconnect()));
      }
      if ("u" > typeof IntersectionObserver) {
        let e = new IntersectionObserver(() => r.current(n));
        (e.observe(n), a.add(() => e.disconnect()));
      }
      return () => a.dispose();
    }, [t, r, e]);
  }
  (e.s(["f", 0, eQ], 436392),
    e.s(
      [
        "E",
        0,
        e5,
        "m",
        0,
        e1,
        "F",
        0,
        e2,
        "J",
        0,
        function (e) {
          return e2(e) && "FIELDSET" === e.nodeName;
        },
        "I",
        0,
        e6,
        "k",
        0,
        e4,
        "M",
        0,
        function (e) {
          return e2(e) && "LABEL" === e.nodeName;
        },
        "D",
        0,
        function (e) {
          return e2(e) && "LEGEND" === e.nodeName;
        },
        "N",
        0,
        e3,
        "W",
        0,
        function (e) {
          return (
            !!e1(e) &&
            e.matches(
              'a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]',
            )
          );
        },
        "t",
        0,
        e0,
      ],
      291329,
    ),
    e.s(["f", 0, e8], 85905));
  let e7 = [
      "[contentEditable=true]",
      "[tabindex]",
      "a[href]",
      "area[href]",
      "button:not([disabled])",
      "iframe",
      "input:not([disabled])",
      "select:not([disabled])",
      "details>summary",
      "textarea:not([disabled])",
    ]
      .map((e) => `${e}:not([tabindex='-1'])`)
      .join(","),
    e9 = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
  var te =
      (((l = te || {})[(l.First = 1)] = "First"),
      (l[(l.Previous = 2)] = "Previous"),
      (l[(l.Next = 4)] = "Next"),
      (l[(l.Last = 8)] = "Last"),
      (l[(l.WrapAround = 16)] = "WrapAround"),
      (l[(l.NoScroll = 32)] = "NoScroll"),
      (l[(l.AutoFocus = 64)] = "AutoFocus"),
      l),
    tt =
      (((c = tt || {})[(c.Error = 0)] = "Error"),
      (c[(c.Overflow = 1)] = "Overflow"),
      (c[(c.Success = 2)] = "Success"),
      (c[(c.Underflow = 3)] = "Underflow"),
      c),
    tn =
      (((u = tn || {})[(u.Previous = -1)] = "Previous"),
      (u[(u.Next = 1)] = "Next"),
      u);
  function tr(e = document.body) {
    return null == e
      ? []
      : Array.from(e.querySelectorAll(e7)).sort((e, t) =>
          Math.sign(
            (e.tabIndex || Number.MAX_SAFE_INTEGER) -
              (t.tabIndex || Number.MAX_SAFE_INTEGER),
          ),
        );
  }
  var ta =
    (((d = ta || {})[(d.Strict = 0)] = "Strict"),
    (d[(d.Loose = 1)] = "Loose"),
    d);
  function ti(e, t = 0) {
    var n;
    return (
      e !== (null == (n = eG(e)) ? void 0 : n.body) &&
      ee(t, {
        0: () => e.matches(e7),
        1() {
          let t = e;
          for (; null !== t; ) {
            if (t.matches(e7)) return !0;
            t = t.parentElement;
          }
          return !1;
        },
      })
    );
  }
  var ts =
    (((p = ts || {})[(p.Keyboard = 0)] = "Keyboard"),
    (p[(p.Mouse = 1)] = "Mouse"),
    p);
  function to(e) {
    null == e || e.focus({ preventScroll: !0 });
  }
  function tl(e, t = (e) => e) {
    return e.slice().sort((e, n) => {
      let r = t(e),
        a = t(n);
      if (null === r || null === a) return 0;
      let i = r.compareDocumentPosition(a);
      return i & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : i & Node.DOCUMENT_POSITION_PRECEDING
          ? 1
          : 0;
    });
  }
  function tc(
    e,
    t,
    { sorted: n = !0, relativeTo: r = null, skipElements: a = [] } = {},
  ) {
    var i, s, o;
    let l = Array.isArray(e) ? (e.length > 0 ? e$(e[0]) : document) : e$(e),
      c = Array.isArray(e)
        ? n
          ? tl(e)
          : e
        : 64 & t
          ? (function (e = document.body) {
              return null == e
                ? []
                : Array.from(e.querySelectorAll(e9)).sort((e, t) =>
                    Math.sign(
                      (e.tabIndex || Number.MAX_SAFE_INTEGER) -
                        (t.tabIndex || Number.MAX_SAFE_INTEGER),
                    ),
                  );
            })(e)
          : tr(e);
    (a.length > 0 &&
      c.length > 1 &&
      (c = c.filter(
        (e) =>
          !a.some((t) =>
            null != t && "current" in t
              ? (null == t ? void 0 : t.current) === e
              : t === e,
          ),
      )),
      (r = null != r ? r : null == l ? void 0 : l.activeElement));
    let u = (() => {
        if (5 & t) return 1;
        if (10 & t) return -1;
        throw Error(
          "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
        );
      })(),
      d = (() => {
        if (1 & t) return 0;
        if (2 & t) return Math.max(0, c.indexOf(r)) - 1;
        if (4 & t) return Math.max(0, c.indexOf(r)) + 1;
        if (8 & t) return c.length - 1;
        throw Error(
          "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
        );
      })(),
      p = 32 & t ? { preventScroll: !0 } : {},
      f = 0,
      h = c.length,
      m;
    do {
      if (f >= h || f + h <= 0) return 0;
      let e = d + f;
      if (16 & t) e = (e + h) % h;
      else {
        if (e < 0) return 3;
        if (e >= h) return 1;
      }
      (null == (m = c[e]) || m.focus(p), (f += u));
    } while (m !== eV(m));
    return (
      6 & t &&
        null !=
          (o =
            null == (s = null == (i = m) ? void 0 : i.matches)
              ? void 0
              : s.call(i, "textarea,input")) &&
        o &&
        m.select(),
      2
    );
  }
  function tu() {
    return (
      /iPhone/gi.test(window.navigator.platform) ||
      (/Mac/gi.test(window.navigator.platform) &&
        window.navigator.maxTouchPoints > 0)
    );
  }
  function td() {
    return tu() || /Android/gi.test(window.navigator.userAgent);
  }
  function tp(e, t, n, r) {
    let a = L(n);
    (0, _.useEffect)(() => {
      if (e)
        return (
          document.addEventListener(t, n, r),
          () => document.removeEventListener(t, n, r)
        );
      function n(e) {
        a.current(e);
      }
    }, [e, t, r]);
  }
  function tf(e, t, n, r) {
    let a = L(n);
    (0, _.useEffect)(() => {
      if (e)
        return (
          window.addEventListener(t, n, r),
          () => window.removeEventListener(t, n, r)
        );
      function n(e) {
        a.current(e);
      }
    }, [e, t, r]);
  }
  function th(e, t, n) {
    let r = L(n),
      a = (0, _.useCallback)(
        function (e, n) {
          if (e.defaultPrevented) return;
          let a = n(e);
          if (null !== a && a.getRootNode().contains(a) && a.isConnected) {
            for (let n of (function e(t) {
              return "function" == typeof t
                ? e(t())
                : Array.isArray(t) || t instanceof Set
                  ? t
                  : [t];
            })(t))
              if (
                null !== n &&
                (n.contains(a) || (e.composed && e.composedPath().includes(n)))
              )
                return;
            return (
              ti(a, ta.Loose) || -1 === a.tabIndex || e.preventDefault(),
              r.current(e, a)
            );
          }
        },
        [r, t],
      ),
      i = (0, _.useRef)(null);
    (tp(
      e,
      "pointerdown",
      (e) => {
        var t, n;
        td() ||
          (i.current =
            (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e))
              ? void 0
              : n[0]) || e.target);
      },
      !0,
    ),
      tp(
        e,
        "pointerup",
        (e) => {
          if (td() || !i.current) return;
          let t = i.current;
          return ((i.current = null), a(e, () => t));
        },
        !0,
      ));
    let s = (0, _.useRef)({ x: 0, y: 0 });
    (tp(
      e,
      "touchstart",
      (e) => {
        ((s.current.x = e.touches[0].clientX),
          (s.current.y = e.touches[0].clientY));
      },
      !0,
    ),
      tp(
        e,
        "touchend",
        (e) => {
          let t = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          };
          if (
            !(
              Math.abs(t.x - s.current.x) >= 30 ||
              Math.abs(t.y - s.current.y) >= 30
            )
          )
            return a(e, () => (e3(e.target) ? e.target : null));
        },
        !0,
      ),
      tf(
        e,
        "blur",
        (e) =>
          a(e, () =>
            e6(window.document.activeElement)
              ? window.document.activeElement
              : null,
          ),
        !0,
      ));
  }
  function tm(...e) {
    return (0, _.useMemo)(() => eG(...e), [...e]);
  }
  ("u" > typeof window &&
    "u" > typeof document &&
    (document.addEventListener(
      "keydown",
      (e) => {
        e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          (document.documentElement.dataset.headlessuiFocusVisible = "");
      },
      !0,
    ),
    document.addEventListener(
      "click",
      (e) => {
        1 === e.detail
          ? delete document.documentElement.dataset.headlessuiFocusVisible
          : 0 === e.detail &&
            (document.documentElement.dataset.headlessuiFocusVisible = "");
      },
      !0,
    )),
    e.s(
      [
        "b",
        0,
        te,
        "f",
        0,
        tt,
        "m",
        0,
        ta,
        "a",
        0,
        to,
        "e",
        0,
        function (e, t, n = null === e ? document.body : e$(e)) {
          return tc(tr(n), t, { relativeTo: e });
        },
        "R",
        0,
        tc,
        "c",
        0,
        e7,
        "d",
        0,
        ti,
        "W",
        0,
        function (e) {
          N().nextFrame(() => {
            let t = eV(e);
            t && e3(t) && !ti(t, 0) && to(e);
          });
        },
        "T",
        0,
        tl,
      ],
      622039,
    ),
    e.s(["f", 0, tp], 157516),
    e.s(["f", 0, th], 813170),
    e.s(["f", 0, tm], 644546));
  var ty =
    (((f = ty || {})[(f.None = 1)] = "None"),
    (f[(f.Focusable = 2)] = "Focusable"),
    (f[(f.Hidden = 4)] = "Hidden"),
    f);
  let tg = eo(function (e, t) {
      var n;
      let { features: r = 1, ...a } = e,
        i = {
          ref: t,
          "aria-hidden":
            (2 & r) == 2 || (null != (n = a["aria-hidden"]) ? n : void 0),
          hidden: (4 & r) == 4 || void 0,
          style: {
            position: "fixed",
            top: 1,
            left: 1,
            width: 1,
            height: 0,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
            ...((4 & r) == 4 && (2 & r) != 2 && { display: "none" }),
          },
        };
      return er()({
        ourProps: i,
        theirProps: a,
        slot: {},
        defaultTag: "span",
        name: "Hidden",
      });
    }),
    tw = (0, _.createContext)(null);
  function tb({ children: e, node: t }) {
    let [n, r] = (0, _.useState)(null),
      a = tv(null != t ? t : n);
    return _.default.createElement(
      tw.Provider,
      { value: a },
      e,
      null === a &&
        _.default.createElement(tg, {
          features: ty.Hidden,
          ref: (e) => {
            var t, n;
            if (e) {
              for (let a of null !=
              (n =
                null == (t = eG(e))
                  ? void 0
                  : t.querySelectorAll("html > *, body > *"))
                ? n
                : [])
                if (
                  a !== document.body &&
                  a !== document.head &&
                  e1(a) &&
                  null != a &&
                  a.contains(e)
                ) {
                  r(a);
                  break;
                }
            }
          },
        }),
    );
  }
  function tv(e = null) {
    var t;
    return null != (t = (0, _.useContext)(tw)) ? t : e;
  }
  function tT(e) {
    let t = {};
    for (let n of e) Object.assign(t, n(t));
    return t;
  }
  let tA =
    ((v = () => new Map()),
    (T = {
      PUSH(e, t) {
        var n;
        let r =
          null != (n = this.get(e))
            ? n
            : { doc: e, count: 0, d: N(), meta: new Set(), computedMeta: {} };
        return (
          r.count++,
          r.meta.add(t),
          (r.computedMeta = tT(r.meta)),
          this.set(e, r),
          this
        );
      },
      POP(e, t) {
        let n = this.get(e);
        return (
          n && (n.count--, n.meta.delete(t), (n.computedMeta = tT(n.meta))),
          this
        );
      },
      SCROLL_PREVENT(e) {
        let t,
          n = { doc: e.doc, d: e.d, meta: () => e.computedMeta },
          r = [
            tu()
              ? {
                  before({ doc: e, d: t, meta: n }) {
                    function r(e) {
                      for (let t of n().containers)
                        for (let n of t()) if (n.contains(e)) return !0;
                      return !1;
                    }
                    t.microTask(() => {
                      var n;
                      if (
                        "auto" !==
                        window.getComputedStyle(e.documentElement)
                          .scrollBehavior
                      ) {
                        let n = N();
                        (n.style(e.documentElement, "scrollBehavior", "auto"),
                          t.add(() => t.microTask(() => n.dispose())));
                      }
                      let a =
                          null != (n = window.scrollY) ? n : window.pageYOffset,
                        i = null;
                      (t.addEventListener(
                        e,
                        "click",
                        (t) => {
                          if (e3(t.target))
                            try {
                              let n = t.target.closest("a");
                              if (!n) return;
                              let { hash: a } = new URL(n.href),
                                s = e.querySelector(a);
                              e3(s) && !r(s) && (i = s);
                            } catch {}
                        },
                        !0,
                      ),
                        t.group((n) => {
                          t.addEventListener(e, "touchstart", (e) => {
                            if ((n.dispose(), e3(e.target) && e5(e.target)))
                              if (r(e.target)) {
                                let t = e.target;
                                for (; t.parentElement && r(t.parentElement); )
                                  t = t.parentElement;
                                n.style(t, "overscrollBehavior", "contain");
                              } else n.style(e.target, "touchAction", "none");
                          });
                        }),
                        t.addEventListener(
                          e,
                          "touchmove",
                          (e) => {
                            if (e3(e.target) && !e4(e.target))
                              if (r(e.target)) {
                                let t = e.target;
                                for (
                                  ;
                                  t.parentElement &&
                                  "" !== t.dataset.headlessuiPortal &&
                                  !(
                                    t.scrollHeight > t.clientHeight ||
                                    t.scrollWidth > t.clientWidth
                                  );

                                )
                                  t = t.parentElement;
                                "" === t.dataset.headlessuiPortal &&
                                  e.preventDefault();
                              } else e.preventDefault();
                          },
                          { passive: !1 },
                        ),
                        t.add(() => {
                          var e;
                          (a !==
                            (null != (e = window.scrollY)
                              ? e
                              : window.pageYOffset) && window.scrollTo(0, a),
                            i &&
                              i.isConnected &&
                              (i.scrollIntoView({ block: "nearest" }),
                              (i = null)));
                        }));
                    });
                  },
                }
              : {},
            {
              before({ doc: e }) {
                var n;
                let r = e.documentElement;
                t = Math.max(
                  0,
                  (null != (n = e.defaultView) ? n : window).innerWidth -
                    r.clientWidth,
                );
              },
              after({ doc: e, d: n }) {
                let r = e.documentElement,
                  a = Math.max(0, r.clientWidth - r.offsetWidth),
                  i = Math.max(0, t - a);
                n.style(r, "paddingRight", `${i}px`);
              },
            },
            {
              before({ doc: e, d: t }) {
                t.style(e.documentElement, "overflow", "hidden");
              },
            },
          ];
        (r.forEach(({ before: e }) => (null == e ? void 0 : e(n))),
          r.forEach(({ after: e }) => (null == e ? void 0 : e(n))));
      },
      SCROLL_ALLOW({ d: e }) {
        e.dispose();
      },
      TEARDOWN({ doc: e }) {
        this.delete(e);
      },
    }),
    (h = v()),
    (m = new Set()),
    {
      getSnapshot: () => h,
      subscribe: (e) => (m.add(e), () => m.delete(e)),
      dispatch(e, ...t) {
        let n = T[e].call(h, ...t);
        n && ((h = n), m.forEach((e) => e()));
      },
    });
  function tE(e, t, n = () => [document.body]) {
    !(function (e, t, n = () => ({ containers: [] })) {
      let r = (0, _.useSyncExternalStore)(
          tA.subscribe,
          tA.getSnapshot,
          tA.getSnapshot,
        ),
        a = t ? r.get(t) : void 0;
      (a && a.count,
        U(() => {
          if (!(!t || !e))
            return (tA.dispatch("PUSH", t, n), () => tA.dispatch("POP", t, n));
        }, [e, t]));
    })(eH(e, "scroll-lock"), t, (e) => {
      var t;
      return { containers: [...(null != (t = e.containers) ? t : []), n] };
    });
  }
  function tk(e) {
    return (0, _.useMemo)(() => e, Object.values(e));
  }
  (tA.subscribe(() => {
    let e = tA.getSnapshot(),
      t = new Map();
    for (let [n] of e) t.set(n, n.documentElement.style.overflow);
    for (let n of e.values()) {
      let e = "hidden" === t.get(n.doc),
        r = 0 !== n.count;
      (((r && !e) || (!r && e)) &&
        tA.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n),
        0 === n.count && tA.dispatch("TEARDOWN", n));
    }
  }),
    e.s(["f", 0, tE], 359948),
    e.s(["f", 0, tk], 855481));
  let tx = (0, _.createContext)(() => {});
  function tP({ value: e, children: t }) {
    return _.default.createElement(tx.Provider, { value: e }, t);
  }
  let tC = (0, _.createContext)(!1);
  function tS(e) {
    return _.default.createElement(tC.Provider, { value: e.force }, e.children);
  }
  let t_ = (0, _.createContext)(void 0);
  function tI() {
    return (0, _.useContext)(t_);
  }
  e.s(["f", 0, tI], 475835);
  let tN = (0, _.createContext)(null);
  function tM() {
    let [e, t] = (0, _.useState)([]);
    return [
      e.length > 0 ? e.join(" ") : void 0,
      (0, _.useMemo)(
        () =>
          function (e) {
            let n = D(
                (e) => (
                  t((t) => [...t, e]),
                  () =>
                    t((t) => {
                      let n = t.slice(),
                        r = n.indexOf(e);
                      return (-1 !== r && n.splice(r, 1), n);
                    })
                ),
              ),
              r = (0, _.useMemo)(
                () => ({
                  register: n,
                  slot: e.slot,
                  name: e.name,
                  props: e.props,
                  value: e.value,
                }),
                [n, e.slot, e.name, e.props, e.value],
              );
            return _.default.createElement(
              tN.Provider,
              { value: r },
              e.children,
            );
          },
        [t],
      ),
    ];
  }
  tN.displayName = "DescriptionContext";
  let tR = Object.assign(
    eo(function (e, t) {
      let n = (0, _.useId)(),
        r = tI(),
        { id: a = `headlessui-description-${n}`, ...i } = e,
        s = (function e() {
          let t = (0, _.useContext)(tN);
          if (null === t) {
            let t = Error(
              "You used a <Description /> component, but it is not inside a relevant parent.",
            );
            throw (Error.captureStackTrace && Error.captureStackTrace(t, e), t);
          }
          return t;
        })(),
        o = q(t);
      U(() => s.register(a), [a, s.register]);
      let l = tk({ ...s.slot, disabled: r || !1 }),
        c = { ref: o, ...s.props, id: a };
      return er()({
        ourProps: c,
        theirProps: i,
        slot: l,
        defaultTag: "p",
        name: s.name || "Description",
      });
    }),
    {},
  );
  function tO(e) {
    let t = D(e),
      n = (0, _.useRef)(!1);
    (0, _.useEffect)(
      () => (
        (n.current = !1),
        () => {
          ((n.current = !0),
            I(() => {
              n.current && t();
            }));
        }
      ),
      [t],
    );
  }
  (e.s(["u", 0, tR, "s", 0, tM], 879058), e.s(["f", 0, tO], 676389));
  var tF =
    (((y = tF || {})[(y.Forwards = 0)] = "Forwards"),
    (y[(y.Backwards = 1)] = "Backwards"),
    y);
  function tU(e, t) {
    let n = (0, _.useRef)([]),
      r = D(e);
    (0, _.useEffect)(() => {
      let e = [...n.current];
      for (let [a, i] of t.entries())
        if (n.current[a] !== i) {
          let a = r(t, e);
          return ((n.current = t), a);
        }
    }, [r, ...t]);
  }
  let tL = [];
  function tD() {
    "loading" !== document.readyState &&
      ((() => {
        function e(e) {
          if (!e3(e.target) || e.target === document.body || tL[0] === e.target)
            return;
          let t = e.target;
          ((t = t.closest(e7)),
            tL.unshift(null != t ? t : e.target),
            (tL = tL.filter((e) => null != e && e.isConnected)).splice(10));
        }
        (window.addEventListener("click", e, { capture: !0 }),
          window.addEventListener("mousedown", e, { capture: !0 }),
          window.addEventListener("focus", e, { capture: !0 }),
          document.body.addEventListener("click", e, { capture: !0 }),
          document.body.addEventListener("mousedown", e, { capture: !0 }),
          document.body.addEventListener("focus", e, { capture: !0 }));
      })(),
      document.removeEventListener("DOMContentLoaded", tD));
  }
  function tB(e) {
    if (!e) return new Set();
    if ("function" == typeof e) return new Set(e());
    let t = new Set();
    for (let n of e.current) e1(n.current) && t.add(n.current);
    return t;
  }
  "u" > typeof window &&
    "u" > typeof document &&
    (document.addEventListener("DOMContentLoaded", tD), tD());
  var tW =
    (((g = tW || {})[(g.None = 0)] = "None"),
    (g[(g.InitialFocus = 1)] = "InitialFocus"),
    (g[(g.TabLock = 2)] = "TabLock"),
    (g[(g.FocusLock = 4)] = "FocusLock"),
    (g[(g.RestoreFocus = 8)] = "RestoreFocus"),
    (g[(g.AutoFocus = 16)] = "AutoFocus"),
    g);
  let tz = Object.assign(
    eo(function (e, t) {
      let n,
        r = (0, _.useRef)(null),
        a = q(r, t),
        {
          initialFocus: i,
          initialFocusFallback: s,
          containers: o,
          features: l = 15,
          ...c
        } = e;
      W() || (l = 0);
      let u = tm(r.current);
      !(function (e, { ownerDocument: t }) {
        let n = !!(8 & e),
          r = (function (e = !0) {
            let t = (0, _.useRef)(tL.slice());
            return (
              tU(
                ([e], [n]) => {
                  (!0 === n &&
                    !1 === e &&
                    I(() => {
                      t.current.splice(0);
                    }),
                    !1 === n && !0 === e && (t.current = tL.slice()));
                },
                [e, tL, t],
              ),
              D(() => {
                var e;
                return null !=
                  (e = t.current.find((e) => null != e && e.isConnected))
                  ? e
                  : null;
              })
            );
          })(n);
        (tU(() => {
          n || (eK(null == t ? void 0 : t.body) && to(r()));
        }, [n]),
          tO(() => {
            n && to(r());
          }));
      })(l, { ownerDocument: u });
      let d = (function (
        e,
        {
          ownerDocument: t,
          container: n,
          initialFocus: r,
          initialFocusFallback: a,
        },
      ) {
        let i = (0, _.useRef)(null),
          s = eH(!!(1 & e), "focus-trap#initial-focus"),
          o = B();
        return (
          tU(() => {
            if (0 === e) return;
            if (!s) {
              null != a && a.current && to(a.current);
              return;
            }
            let l = n.current;
            l &&
              I(() => {
                if (!o.current) return;
                let n = null == t ? void 0 : t.activeElement;
                if (null != r && r.current) {
                  if ((null == r ? void 0 : r.current) === n) {
                    i.current = n;
                    return;
                  }
                } else if (l.contains(n)) {
                  i.current = n;
                  return;
                }
                if (null != r && r.current) to(r.current);
                else {
                  if (16 & e) {
                    if (tc(l, te.First | te.AutoFocus) !== tt.Error) return;
                  } else if (tc(l, te.First) !== tt.Error) return;
                  if (
                    null != a &&
                    a.current &&
                    (to(a.current),
                    (null == t ? void 0 : t.activeElement) === a.current)
                  )
                    return;
                  console.warn(
                    "There are no focusable elements inside the <FocusTrap />",
                  );
                }
                i.current = null == t ? void 0 : t.activeElement;
              });
          }, [a, s, e]),
          i
        );
      })(l, {
        ownerDocument: u,
        container: r,
        initialFocus: i,
        initialFocusFallback: s,
      });
      !(function (
        e,
        {
          ownerDocument: t,
          container: n,
          containers: r,
          previousActiveElement: a,
        },
      ) {
        let i = B(),
          s = !!(4 & e);
        ek(
          null == t ? void 0 : t.defaultView,
          "focus",
          (e) => {
            if (!s || !i.current) return;
            let t = tB(r);
            e2(n.current) && t.add(n.current);
            let o = a.current;
            if (!o) return;
            let l = e.target;
            e2(l)
              ? tj(t, l)
                ? ((a.current = l), to(l))
                : (e.preventDefault(), e.stopPropagation(), to(o))
              : to(a.current);
          },
          !0,
        );
      })(l, {
        ownerDocument: u,
        container: r,
        containers: o,
        previousActiveElement: d,
      });
      let p =
          ((n = (0, _.useRef)(0)),
          tf(
            !0,
            "keydown",
            (e) => {
              "Tab" === e.key && (n.current = +!!e.shiftKey);
            },
            !0,
          ),
          n),
        f = D((e) => {
          if (!e2(r.current)) return;
          let t = r.current;
          ee(p.current, {
            [tF.Forwards]: () => {
              tc(t, te.First, { skipElements: [e.relatedTarget, s] });
            },
            [tF.Backwards]: () => {
              tc(t, te.Last, { skipElements: [e.relatedTarget, s] });
            },
          });
        }),
        h = eH(!!(2 & l), "focus-trap#tab-lock"),
        m = M(),
        y = (0, _.useRef)(!1),
        g = er();
      return _.default.createElement(
        _.default.Fragment,
        null,
        h &&
          _.default.createElement(tg, {
            as: "button",
            type: "button",
            "data-headlessui-focus-guard": !0,
            onFocus: f,
            features: ty.Focusable,
          }),
        g({
          ourProps: {
            ref: a,
            onKeyDown(e) {
              "Tab" == e.key &&
                ((y.current = !0),
                m.requestAnimationFrame(() => {
                  y.current = !1;
                }));
            },
            onBlur(e) {
              if (!(4 & l)) return;
              let t = tB(o);
              e2(r.current) && t.add(r.current);
              let n = e.relatedTarget;
              e3(n) &&
                "true" !== n.dataset.headlessuiFocusGuard &&
                (tj(t, n) ||
                  (y.current
                    ? tc(
                        r.current,
                        ee(p.current, {
                          [tF.Forwards]: () => te.Next,
                          [tF.Backwards]: () => te.Previous,
                        }) | te.WrapAround,
                        { relativeTo: e.target },
                      )
                    : e3(e.target) && to(e.target)));
            },
          },
          theirProps: c,
          defaultTag: "div",
          name: "FocusTrap",
        }),
        h &&
          _.default.createElement(tg, {
            as: "button",
            type: "button",
            "data-headlessui-focus-guard": !0,
            onFocus: f,
            features: ty.Focusable,
          }),
      );
    }),
    { features: tW },
  );
  function tj(e, t) {
    for (let n of e) if (n.contains(t)) return !0;
    return !1;
  }
  var tq = e.i(231332);
  let tH = _.Fragment,
    tG = eo(function (e, t) {
      let { ownerDocument: n = null, ...r } = e,
        a = (0, _.useRef)(null),
        i = q(
          j((e) => {
            a.current = e;
          }),
          t,
        ),
        s = tm(a.current),
        o = (function (e) {
          let t = (0, _.useContext)(tC),
            n = (0, _.useContext)(tV),
            [r, a] = (0, _.useState)(() => {
              var r;
              if (!t && null !== n) return null != (r = n.current) ? r : null;
              if (F.isServer) return null;
              let a =
                null == e ? void 0 : e.getElementById("headlessui-portal-root");
              if (a) return a;
              if (null === e) return null;
              let i = e.createElement("div");
              return (
                i.setAttribute("id", "headlessui-portal-root"),
                e.body.appendChild(i)
              );
            });
          return (
            (0, _.useEffect)(() => {
              null !== r &&
                ((null != e && e.body.contains(r)) ||
                  null == e ||
                  e.body.appendChild(r));
            }, [r, e]),
            (0, _.useEffect)(() => {
              t || (null !== n && a(n.current));
            }, [n, a, t]),
            r
          );
        })(null != n ? n : s),
        l = (0, _.useContext)(tK),
        c = M(),
        u = er();
      return (
        tO(() => {
          var e;
          o &&
            o.childNodes.length <= 0 &&
            (null == (e = o.parentElement) || e.removeChild(o));
        }),
        o
          ? (0, tq.createPortal)(
              _.default.createElement(
                "div",
                {
                  "data-headlessui-portal": "",
                  ref: (e) => {
                    (c.dispose(), l && e && c.add(l.register(e)));
                  },
                },
                u({
                  ourProps: { ref: i },
                  theirProps: r,
                  slot: {},
                  defaultTag: tH,
                  name: "Portal",
                }),
              ),
              o,
            )
          : null
      );
    }),
    t$ = _.Fragment,
    tV = (0, _.createContext)(null),
    tK = (0, _.createContext)(null);
  function tJ() {
    let e = (0, _.useContext)(tK),
      t = (0, _.useRef)([]),
      n = D((n) => (t.current.push(n), e && e.register(n), () => r(n))),
      r = D((n) => {
        let r = t.current.indexOf(n);
        (-1 !== r && t.current.splice(r, 1), e && e.unregister(n));
      }),
      a = (0, _.useMemo)(
        () => ({ register: n, unregister: r, portals: t }),
        [n, r, t],
      );
    return [
      t,
      (0, _.useMemo)(
        () =>
          function ({ children: e }) {
            return _.default.createElement(tK.Provider, { value: a }, e);
          },
        [a],
      ),
    ];
  }
  let tX = eo(function (e, t) {
      let n = q(t),
        { enabled: r = !0, ownerDocument: a, ...i } = e,
        s = er();
      return r
        ? _.default.createElement(tG, { ...i, ownerDocument: a, ref: n })
        : s({
            ourProps: { ref: n },
            theirProps: i,
            slot: {},
            defaultTag: tH,
            name: "Portal",
          });
    }),
    tY = eo(function (e, t) {
      let { target: n, ...r } = e,
        a = { ref: q(t) },
        i = er();
      return _.default.createElement(
        tV.Provider,
        { value: n },
        i({
          ourProps: a,
          theirProps: r,
          defaultTag: t$,
          name: "Popover.Group",
        }),
      );
    }),
    tZ = Object.assign(tX, { Group: tY });
  e.s(["z", 0, tZ, "n", 0, tY, "U", 0, tJ], 854569);
  var tQ =
      (((w = tQ || {})[(w.Open = 0)] = "Open"),
      (w[(w.Closed = 1)] = "Closed"),
      w),
    t0 = (((b = t0 || {})[(b.SetTitleId = 0)] = "SetTitleId"), b);
  let t1 = { 0: (e, t) => (e.titleId === t.id ? e : { ...e, titleId: t.id }) },
    t2 = (0, _.createContext)(null);
  function t3(e) {
    let t = (0, _.useContext)(t2);
    if (null === t) {
      let t = Error(`<${e} /> is missing a parent <Dialog /> component.`);
      throw (Error.captureStackTrace && Error.captureStackTrace(t, t3), t);
    }
    return t;
  }
  function t5(e, t) {
    return ee(t.type, t1, e, t);
  }
  t2.displayName = "DialogContext";
  let t6 = eo(function (e, t) {
      let n = (0, _.useId)(),
        {
          id: r = `headlessui-dialog-${n}`,
          open: a,
          onClose: i,
          initialFocus: s,
          role: o = "dialog",
          autoFocus: l = !0,
          __demoMode: c = !1,
          unmount: u = !1,
          ...d
        } = e,
        p = (0, _.useRef)(!1);
      o =
        "dialog" === o || "alertdialog" === o
          ? o
          : (p.current ||
              ((p.current = !0),
              console.warn(
                `Invalid role [${o}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`,
              )),
            "dialog");
      let f = X();
      void 0 === a && null !== f && (a = (f & J.Open) === J.Open);
      let h = (0, _.useRef)(null),
        m = q(h, t),
        y = tm(h.current),
        g = +!a,
        [w, b] = (0, _.useReducer)(t5, {
          titleId: null,
          descriptionId: null,
          panelRef: (0, _.createRef)(),
        }),
        v = D(() => i(!1)),
        T = D((e) => b({ type: 0, id: e })),
        A = !!W() && 0 === g,
        [E, k] = tJ(),
        x = tv(),
        { resolveContainers: P } = (function ({
          defaultContainers: e = [],
          portals: t,
          mainTreeNode: n,
        } = {}) {
          let r = D(() => {
            var r, a;
            let i = eG(n),
              s = [];
            for (let t of e)
              null !== t &&
                (e1(t)
                  ? s.push(t)
                  : "current" in t && e1(t.current) && s.push(t.current));
            if (null != t && t.current) for (let e of t.current) s.push(e);
            for (let e of null !=
            (r = null == i ? void 0 : i.querySelectorAll("html > *, body > *"))
              ? r
              : [])
              e !== document.body &&
                e !== document.head &&
                e1(e) &&
                "headlessui-portal-root" !== e.id &&
                ((n &&
                  (e.contains(n) ||
                    e.contains(
                      null == (a = null == n ? void 0 : n.getRootNode())
                        ? void 0
                        : a.host,
                    ))) ||
                  s.some((t) => e.contains(t)) ||
                  s.push(e));
            return s;
          });
          return {
            resolveContainers: r,
            contains: D((e) => r().some((t) => t.contains(e))),
          };
        })({
          mainTreeNode: x,
          portals: E,
          defaultContainers: [
            {
              get current() {
                var e;
                return null != (e = w.panelRef.current) ? e : h.current;
              },
            },
          ],
        }),
        C = null !== f && (f & J.Closing) === J.Closing;
      eQ(!c && !C && A, {
        allowed: D(() => {
          var e, t;
          return [
            null !=
            (t =
              null == (e = h.current)
                ? void 0
                : e.closest("[data-headlessui-portal]"))
              ? t
              : null,
          ];
        }),
        disallowed: D(() => {
          var e;
          return [
            null !=
            (e =
              null == x
                ? void 0
                : x.closest("body > *:not(#headlessui-portal-root)"))
              ? e
              : null,
          ];
        }),
      });
      let S = eW.get(null);
      U(() => {
        if (A) return (S.actions.push(r), () => S.actions.pop(r));
      }, [S, r, A]);
      let I = ej(
        S,
        (0, _.useCallback)((e) => S.selectors.isTop(e, r), [S, r]),
      );
      (th(I, P, (e) => {
        (e.preventDefault(), v());
      }),
        (function (
          e,
          t = "u" > typeof document ? document.defaultView : null,
          n,
        ) {
          let r = eH(e, "escape");
          ek(t, "keydown", (e) => {
            r && (e.defaultPrevented || (e.key === eE.Escape && n(e)));
          });
        })(I, null == y ? void 0 : y.defaultView, (e) => {
          (e.preventDefault(),
            e.stopPropagation(),
            document.activeElement &&
              "blur" in document.activeElement &&
              "function" == typeof document.activeElement.blur &&
              document.activeElement.blur(),
            v());
        }),
        tE(!c && !C && A, y, P),
        e8(A, h, v));
      let [N, M] = tM(),
        R = (0, _.useMemo)(
          () => [{ dialogState: g, close: v, setTitleId: T, unmount: u }, w],
          [g, v, T, u, w],
        ),
        O = tk({ open: 0 === g }),
        F = {
          ref: m,
          id: r,
          role: o,
          tabIndex: -1,
          "aria-modal": c ? void 0 : 0 === g || void 0,
          "aria-labelledby": w.titleId,
          "aria-describedby": N,
          unmount: u,
        },
        L = !(function () {
          var e;
          let [t] = (0, _.useState)(() =>
              "u" > typeof window && "function" == typeof window.matchMedia
                ? window.matchMedia("(pointer: coarse)")
                : null,
            ),
            [n, r] = (0, _.useState)(
              null != (e = null == t ? void 0 : t.matches) && e,
            );
          return (
            U(() => {
              if (t)
                return (
                  t.addEventListener("change", e),
                  () => t.removeEventListener("change", e)
                );
              function e(e) {
                r(e.matches);
              }
            }, [t]),
            n
          );
        })(),
        B = tW.None;
      A &&
        !c &&
        ((B |= tW.RestoreFocus),
        (B |= tW.TabLock),
        l && (B |= tW.AutoFocus),
        L && (B |= tW.InitialFocus));
      let z = er();
      return _.default.createElement(
        Z,
        null,
        _.default.createElement(
          tS,
          { force: !0 },
          _.default.createElement(
            tZ,
            null,
            _.default.createElement(
              t2.Provider,
              { value: R },
              _.default.createElement(
                tY,
                { target: h },
                _.default.createElement(
                  tS,
                  { force: !1 },
                  _.default.createElement(
                    M,
                    { slot: O },
                    _.default.createElement(
                      k,
                      null,
                      _.default.createElement(
                        tz,
                        {
                          initialFocus: s,
                          initialFocusFallback: h,
                          containers: P,
                          features: B,
                        },
                        _.default.createElement(
                          tP,
                          { value: v },
                          z({
                            ourProps: F,
                            theirProps: d,
                            slot: O,
                            defaultTag: t4,
                            features: t8,
                            visible: 0 === g,
                            name: "Dialog",
                          }),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
    }),
    t4 = "div",
    t8 = et.RenderStrategy | et.Static,
    t7 = eo(function (e, t) {
      let { transition: n = !1, open: r, ...a } = e,
        i = X(),
        s = e.hasOwnProperty("open") || null !== i,
        o = e.hasOwnProperty("onClose");
      if (!s && !o)
        throw Error(
          "You have to provide an `open` and an `onClose` prop to the `Dialog` component.",
        );
      if (!s)
        throw Error(
          "You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.",
        );
      if (!o)
        throw Error(
          "You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.",
        );
      if (!i && "boolean" != typeof e.open)
        throw Error(
          `You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`,
        );
      if ("function" != typeof e.onClose)
        throw Error(
          `You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`,
        );
      return (void 0 !== r || n) && !a.static
        ? _.default.createElement(
            tb,
            null,
            _.default.createElement(
              eA,
              { show: r, transition: n, unmount: a.unmount },
              _.default.createElement(t6, { ref: t, ...a }),
            ),
          )
        : _.default.createElement(
            tb,
            null,
            _.default.createElement(t6, { ref: t, open: r, ...a }),
          );
    }),
    t9 = eo(function (e, t) {
      let n = (0, _.useId)(),
        {
          id: r = `headlessui-dialog-panel-${n}`,
          transition: a = !1,
          ...i
        } = e,
        [{ dialogState: s, unmount: o }, l] = t3("Dialog.Panel"),
        c = q(t, l.panelRef),
        u = tk({ open: 0 === s }),
        d = D((e) => {
          e.stopPropagation();
        }),
        p = a ? eT : _.Fragment,
        f = er();
      return _.default.createElement(
        p,
        { ...(a ? { unmount: o } : {}) },
        f({
          ourProps: { ref: c, id: r, onClick: d },
          theirProps: i,
          slot: u,
          defaultTag: "div",
          name: "Dialog.Panel",
        }),
      );
    }),
    ne = Object.assign(t7, {
      Panel: t9,
      Title:
        (eo(function (e, t) {
          let { transition: n = !1, ...r } = e,
            [{ dialogState: a, unmount: i }] = t3("Dialog.Backdrop"),
            s = tk({ open: 0 === a }),
            o = n ? eT : _.Fragment,
            l = er();
          return _.default.createElement(
            o,
            { ...(n ? { unmount: i } : {}) },
            l({
              ourProps: { ref: t, "aria-hidden": !0 },
              theirProps: r,
              slot: s,
              defaultTag: "div",
              name: "Dialog.Backdrop",
            }),
          );
        }),
        eo(function (e, t) {
          let n = (0, _.useId)(),
            { id: r = `headlessui-dialog-title-${n}`, ...a } = e,
            [{ dialogState: i, setTitleId: s }] = t3("Dialog.Title"),
            o = q(t);
          (0, _.useEffect)(() => (s(r), () => s(null)), [r, s]);
          let l = tk({ open: 0 === i });
          return er()({
            ourProps: { ref: o, id: r },
            theirProps: a,
            slot: l,
            defaultTag: "h2",
            name: "Dialog.Title",
          });
        })),
      Description: tR,
    });
  (e.i(623213), e.i(933185));
  let nt = C.m`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
  }

  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-feature-settings: normal;

  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  abbr:where([title]) {
    text-decoration: underline dotted;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
    font-family:
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji';
    display: inline;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
  }

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  :-moz-ui-invalid {
    box-shadow: none;
  }

  legend {
    padding: 0;
  }

  progress {
    vertical-align: baseline;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  summary {
    display: list-item;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  fieldset {
    margin: 0;
    padding: 0;
  }

  legend {
    padding: 0;
  }

  ol,
  ul,
  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: #9ca3af;
  }

  button,
  [role='button'] {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  [hidden] {
    display: none;
  }
`,
    nn = C.Q`
  :root {
     ${(e) => nr(e.palette)}
  };
`,
    nr = (e) => {
      let t = {
        "--privy-color-background": e.background,
        "--privy-color-background-2": e.background2,
        "--privy-color-background-3": e.background3,
        "--privy-color-foreground": e.foreground,
        "--privy-color-foreground-2": e.foreground2,
        "--privy-color-foreground-3": e.foreground3,
        "--privy-color-foreground-4": e.foreground4,
        "--privy-color-foreground-accent": e.foregroundAccent,
        "--privy-color-accent": e.accent,
        "--privy-color-accent-light": e.accentLight,
        "--privy-color-accent-hover": e.accentHover,
        "--privy-color-accent-dark": e.accentDark,
        "--privy-color-accent-darkest": e.accentDarkest,
        "--privy-color-success": e.success,
        "--privy-color-success-dark": e.successDark,
        "--privy-color-success-light": e.successLight,
        "--privy-color-success-bg": e.successBg,
        "--privy-color-error": e.error,
        "--privy-color-error-light": e.errorLight,
        "--privy-color-error-bg": e.errorBg,
        "--privy-color-error-bg-hover": e.errorBgHover,
        "--privy-color-warn": e.warn,
        "--privy-color-warn-light": e.warnLight,
        "--privy-color-warn-bg": e.warnBg,
        "--privy-color-warning-dark": e.warningDark,
        "--privy-color-error-dark": e.errorDark,
        "--privy-color-info-bg": e.infoBg,
        "--privy-color-info-bg-hover": e.infoBgHover,
        "--privy-color-border-default": e.borderDefault,
        "--privy-color-border-hover": e.borderHover,
        "--privy-color-border-focus": e.borderFocus,
        "--privy-color-border-error": e.borderError,
        "--privy-color-border-success": e.borderSuccess,
        "--privy-color-border-warning": e.borderWarning,
        "--privy-color-border-info": e.borderInfo,
        "--privy-color-border-interactive": e.borderInteractive,
        "--privy-color-border-interactive-hover": e.borderInteractiveHover,
        "--privy-color-background-hover": e.backgroundHover,
        "--privy-color-background-clicked": e.backgroundClicked,
        "--privy-color-background-disabled": e.backgroundDisabled,
        "--privy-color-background-interactive": e.backgroundInteractive,
        "--privy-color-background-interactive-hover":
          e.backgroundInteractiveHover,
        "--privy-color-background-interactive-clicked":
          e.backgroundInteractiveClicked,
        "--privy-color-background-interactive-disabled":
          e.backgroundInteractiveDisabled,
        "--privy-color-foreground-hover": e.foregroundHover,
        "--privy-color-foreground-clicked": e.foregroundClicked,
        "--privy-color-foreground-disabled": e.foregroundDisabled,
        "--privy-color-foreground-interactive": e.foregroundInteractive,
        "--privy-color-foreground-interactive-hover":
          e.foregroundInteractiveHover,
        "--privy-link-navigation-color": e.linkNavigationColor,
        "--privy-link-navigation-decoration": e.linkNavigationDecoration,
        "--privy-accent-has-good-contrast": e.accentHasGoodContrast,
        "--privy-color-icon-default": e.iconDefault,
        "--privy-color-icon-muted": e.iconMuted,
        "--privy-color-icon-subtle": e.iconSubtle,
        "--privy-color-icon-inverse": e.iconInverse,
        "--privy-color-icon-success": e.iconSuccess,
        "--privy-color-icon-warning": e.iconWarning,
        "--privy-color-icon-error": e.iconError,
        "--privy-color-icon-interactive": e.iconInteractive,
        "--privy-color-icon-default-hover": e.iconDefaultHover,
        "--privy-color-icon-muted-hover": e.iconMutedHover,
        "--privy-color-icon-subtle-hover": e.iconSubtleHover,
        "--privy-color-icon-default-clicked": e.iconDefaultClicked,
        "--privy-color-icon-muted-clicked": e.iconMutedClicked,
        "--privy-color-icon-subtle-clicked": e.iconSubtleClicked,
        "--privy-color-icon-default-disabled": e.iconDefaultDisabled,
        "--privy-color-icon-muted-disabled": e.iconMutedDisabled,
        "--privy-color-icon-subtle-disabled": e.iconSubtleDisabled,
        "--privy-color-icon-error-hover": e.iconErrorHover,
        "--privy-color-icon-interactive-hover": e.iconInteractiveHover,
        "--privy-color-icon-error-clicked": e.iconErrorClicked,
        "--privy-color-icon-interactive-clicked": e.iconInteractiveClicked,
        "--privy-color-icon-muted-disabled-alt": e.iconMutedDisabledAlt,
        "--privy-color-icon-subtle-disabled-alt": e.iconSubtleDisabledAlt,
        "--privy-color-shadow-elevation": e.shadow,
        "--privy-shadow-popover":
          "0 2px 4px var(--privy-color-shadow-elevation)",
        "--privy-shadow-sheet": "0 0 36px var(--privy-color-shadow-elevation)",
        "--privy-shadow-modal":
          "0 8px 36px var(--privy-color-shadow-elevation)",
        "--privy-shadow-focus-ring":
          "0 0 0 3px var(--privy-color-border-focus)",
        "--privy-border-radius-xs": "6px",
        "--privy-border-radius-sm": "8px",
        "--privy-border-radius-md": "12px",
        "--privy-border-radius-mdlg": "16px",
        "--privy-border-radius-lg": "24px",
        "--privy-border-radius-full": "9999px",
        "--privy-height-modal-full": "620px",
        "--privy-height-modal-compact": "480px",
      };
      return C.m`
    ${Object.entries(t)
      .map(([e, t]) => `${e}: ${t};`)
      .join("\n")}
  `;
    },
    na = C.z.div`
  /* css normalize only the privy application to avoid conflicts
     with consuming application */
  ${nt}

  /* Privy styles */
  color: var(--privy-color-foreground-2);

  h3 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: var(--privy-color-foreground-2);
  }

  h4 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: var(--privy-color-foreground);
  }

  p {
    font-size: 13px;
    line-height: 20px;
    color: var(--privy-color-foreground-2);
  }

  button:focus,
  input:focus,
  optgroup:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }

  button:focus-visible,
  input:focus-visible,
  optgroup:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: none;
    border-color: var(--privy-color-accent-light);
    box-shadow: var(--privy-shadow-focus-ring);
  }

  .mobile-only {
    @media (min-width: 441px) {
      display: none;
    }
  }

  /* Animations */

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`,
    ni = C.z.div`
  position: fixed;
  inset: 0;

  transition: backdrop-filter 100ms ease;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);

  &.entering,
  &.leaving {
    backdrop-filter: unset;
    -webkit-backdrop-filter: unset;
  }
`,
    ns = C.z.div`
  position: relative;
  z-index: 999999;
`,
    no = C.z.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100dvh;
  /* overflow-y: auto allows the browser to scroll the focused input into view
     when the mobile keyboard opens, preventing the keyboard from covering inputs */
  overflow-y: auto;

  @media (max-width: 440px) {
    align-items: flex-end;
  }
`,
    nl = C.z.div`
  /* reset some default dialog styles */
  padding: 0;
  background: transparent;
  border: none;
  width: 100%;
  pointer-events: auto;

  outline: none;
  display: block;

  /*
   * Normally it is bad to mix media queries like this We are doing
   * this here specifically for animations to avoid weird jank.
   */
  /* Mobile animation is a bottom drawer */
  @media (max-width: 440px) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms ease-in;
    position: sticky;
    bottom: 0;

    &.entering,
    &.leaving {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
      transition:
        transform 150ms ease-in 0ms,
        opacity 0ms ease 150ms;
    }
  }

  /* Tablet/Desktop animation is a fade in */
  @media (min-width: 441px) {
    opacity: 1;
    transition: opacity 100ms ease-in;

    &.entering,
    &.leaving {
      opacity: 0;
      transition-delay: 5ms;
    }

    margin: auto;
    width: 360px;
    box-shadow: var(--privy-shadow-modal);
    border-radius: var(--privy-border-radius-lg);
  }
`;
  (C.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`,
    e.s(
      [
        "D",
        0,
        ({ children: e, open: t, onClick: n, ...r }) =>
          (0, S.jsx)(eA, {
            show: t,
            as: _.default.Fragment,
            children: (0, S.jsxs)(ne, {
              onClose: n,
              ...r,
              as: ns,
              children: [
                (0, S.jsx)(eT, {
                  as: _.default.Fragment,
                  enterFrom: "entering",
                  leaveTo: "leaving",
                  children: (0, S.jsx)(ni, {
                    id: "privy-dialog-backdrop",
                    "aria-hidden": "true",
                  }),
                }),
                (0, S.jsx)(no, {
                  children: (0, S.jsx)(eT, {
                    as: _.default.Fragment,
                    enterFrom: "entering",
                    leaveTo: "leaving",
                    children: (0, S.jsx)(t9, { as: nl, children: e }),
                  }),
                }),
              ],
            }),
          }),
        "G",
        0,
        nn,
        "S",
        0,
        na,
      ],
      154014,
    ));
  var nc = e.i(565530),
    nu = e.i(445143);
  e.s(
    [
      "F",
      0,
      class {
        async init() {
          if (!this.api) throw new nc.P("Auth flow has no API instance");
          let { nonce: e, expires_at: t } = await this.api.post(nu.a5, {});
          return { nonce: e, expiresAt: t };
        }
        async authenticate() {
          if (!this.message || !this.signature || !this.fid)
            throw new nc.P("Auth flow has no message, signature, or fid");
          if (!this.api) throw new nc.P("Auth flow has no API instance");
          try {
            let e = await this.api.post(nu.a6, {
              message: this.message,
              signature: this.signature,
              fid: this.fid,
            });
            if (!e) throw new nc.P("No response from authentication");
            return e;
          } catch (e) {
            throw (0, nc.f)(e);
          }
        }
        async link() {
          throw Error("Not implemented");
        }
        setAuthData({ message: e, signature: t, fid: n }) {
          ((this.message = e), (this.signature = t), (this.fid = n));
        }
        constructor() {
          this.meta = {};
        }
      },
    ],
    553246,
  );
};
