// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t;
  var n = e.i(352386),
    r = e.i(880269);
  function o(e) {
    let t = e.activeElement;
    for (
      ;
      (null == (n = t) || null == (n = n.shadowRoot)
        ? void 0
        : n.activeElement) != null;

    ) {
      var n;
      t = t.shadowRoot.activeElement;
    }
    return t;
  }
  function u(e, t) {
    if (!e || !t) return !1;
    let n = null == t.getRootNode ? void 0 : t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && (0, r.R)(n)) {
      let n = t;
      for (; n; ) {
        if (e === n) return !0;
        n = n.parentNode || n.host;
      }
    }
    return !1;
  }
  function l() {
    let e = navigator.userAgentData;
    return null != e && e.platform ? e.platform : navigator.platform;
  }
  function i() {
    let e = navigator.userAgentData;
    return e && Array.isArray(e.brands)
      ? e.brands
          .map((e) => {
            let { brand: t, version: n } = e;
            return t + "/" + n;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function c() {
    return /apple/i.test(navigator.vendor);
  }
  function a() {
    let e = /android/i;
    return e.test(l()) || e.test(i());
  }
  function s(e, t) {
    let n = ["mouse", "pen"];
    return (t || n.push("", void 0), n.includes(e));
  }
  function f(e) {
    return (null == e ? void 0 : e.ownerDocument) || document;
  }
  function d(e, t) {
    return (
      null != t &&
      ("composedPath" in e
        ? e.composedPath().includes(t)
        : null != e.target && t.contains(e.target))
    );
  }
  function m(e) {
    return "composedPath" in e ? e.composedPath()[0] : e.target;
  }
  function v(e) {
    return (
      (0, r.E)(e) &&
      e.matches(
        "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",
      )
    );
  }
  var p = e.i(210242),
    g = e.i(996972),
    h = e.i(231332),
    E = e.i(266440),
    b = e.i(825339);
  let y = { ...n },
    w = y.useInsertionEffect || ((e) => e());
  function R(e) {
    let t = n.useRef(() => {});
    return (
      w(() => {
        t.current = e;
      }),
      n.useCallback(function () {
        for (var e = arguments.length, n = Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        return null == t.current ? void 0 : t.current(...n);
      }, [])
    );
  }
  var x = "u" > typeof document ? n.useLayoutEffect : n.useEffect;
  function T() {
    return (T = Object.assign.bind()).apply(this, arguments);
  }
  let k = !1,
    C = 0,
    L = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + C++,
    M =
      y.useId ||
      function () {
        let [e, t] = n.useState(() => (k ? L() : void 0));
        return (
          x(() => {
            null == e && t(L());
          }, []),
          n.useEffect(() => {
            k = !0;
          }, []),
          e
        );
      },
    P = n.createContext(null),
    A = n.createContext(null),
    D = () => {
      var e;
      return (null == (e = n.useContext(P)) ? void 0 : e.id) || null;
    };
  function S(e) {
    return "data-floating-ui-" + e;
  }
  function H(e) {
    let t = (0, n.useRef)(e);
    return (
      x(() => {
        t.current = e;
      }),
      t
    );
  }
  let O = S("safe-polygon");
  function K(e, t, n) {
    return n && !s(n)
      ? 0
      : "number" == typeof e
        ? e
        : null == e
          ? void 0
          : e[t];
  }
  function B(e, t) {
    let n = e.filter((e) => {
        var n;
        return e.parentId === t && (null == (n = e.context) ? void 0 : n.open);
      }),
      r = n;
    for (; r.length; )
      ((r = e.filter((e) => {
        var t;
        return null == (t = r)
          ? void 0
          : t.some((t) => {
              var n;
              return (
                e.parentId === t.id &&
                (null == (n = e.context) ? void 0 : n.open)
              );
            });
      })),
        (n = n.concat(r)));
    return n;
  }
  let _ = () => ({
    getShadowRoot: !0,
    displayCheck:
      "function" == typeof ResizeObserver &&
      ResizeObserver.toString().includes("[native code]")
        ? "full"
        : "none",
  });
  function j(e, t) {
    let n = (0, g.T)(e, _());
    "prev" === t && n.reverse();
    let r = n.indexOf(o(f(e)));
    return n.slice(r + 1)[0];
  }
  function I(e, t) {
    let n = t || e.currentTarget,
      r = e.relatedTarget;
    return !r || !u(n, r);
  }
  function F(e) {
    e.querySelectorAll("[data-tabindex]").forEach((e) => {
      let t = e.dataset.tabindex;
      (delete e.dataset.tabindex,
        t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex"));
    });
  }
  let W = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "fixed",
    whiteSpace: "nowrap",
    width: "1px",
    top: 0,
    left: 0,
  };
  function q(e) {
    "Tab" === e.key && (e.target, clearTimeout(t));
  }
  let X = n.forwardRef(function (e, t) {
      let [r, o] = n.useState();
      x(
        () => (
          c() && o("button"),
          document.addEventListener("keydown", q),
          () => {
            document.removeEventListener("keydown", q);
          }
        ),
        [],
      );
      let u = {
        ref: t,
        tabIndex: 0,
        role: r,
        "aria-hidden": !r || void 0,
        [S("focus-guard")]: "",
        style: W,
      };
      return n.createElement("span", T({}, e, u));
    }),
    N = n.createContext(null),
    Y = S("portal");
  function U(e) {
    return (0, r.E)(e.target) && "BUTTON" === e.target.tagName;
  }
  let Z = {
      pointerdown: "onPointerDown",
      mousedown: "onMouseDown",
      click: "onClick",
    },
    z = {
      pointerdown: "onPointerDownCapture",
      mousedown: "onMouseDownCapture",
      click: "onClickCapture",
    },
    G = (e) => {
      var t, n;
      return {
        escapeKey:
          "boolean" == typeof e
            ? e
            : null != (t = null == e ? void 0 : e.escapeKey) && t,
        outsidePress:
          "boolean" == typeof e
            ? e
            : null == (n = null == e ? void 0 : e.outsidePress) || n,
      };
    },
    V = "active",
    J = "selected";
  function Q(e, t, n) {
    let r = new Map(),
      o = "item" === n,
      u = e;
    if (o && e) {
      let { [V]: t, [J]: n, ...r } = e;
      u = r;
    }
    return {
      ...("floating" === n && {
        tabIndex: -1,
        "data-floating-ui-focusable": "",
      }),
      ...u,
      ...t
        .map((t) => {
          let r = t ? t[n] : null;
          return "function" == typeof r ? (e ? r(e) : null) : r;
        })
        .concat(e)
        .reduce(
          (e, t) => (
            t &&
              Object.entries(t).forEach((t) => {
                let [n, u] = t;
                if (!(o && [V, J].includes(n)))
                  if (0 === n.indexOf("on")) {
                    if ((r.has(n) || r.set(n, []), "function" == typeof u)) {
                      var l;
                      (null == (l = r.get(n)) || l.push(u),
                        (e[n] = function () {
                          for (
                            var e, t = arguments.length, o = Array(t), u = 0;
                            u < t;
                            u++
                          )
                            o[u] = arguments[u];
                          return null == (e = r.get(n))
                            ? void 0
                            : e.map((e) => e(...o)).find((e) => void 0 !== e);
                        }));
                    }
                  } else e[n] = u;
              }),
            e
          ),
          {},
        ),
    };
  }
  let $ = new Map([
      ["select", "listbox"],
      ["combobox", "listbox"],
      ["label", !1],
    ]),
    ee = (e) =>
      e.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        (e, t) => (t ? "-" : "") + e.toLowerCase(),
      );
  function et(e, t) {
    return "function" == typeof e ? e(t) : e;
  }
  function en(e, t) {
    return {
      ...e,
      rects: { ...e.rects, floating: { ...e.rects.floating, height: t } },
    };
  }
  function er(e, t) {
    let [n, r] = e,
      o = !1,
      u = t.length;
    for (let e = 0, l = u - 1; e < u; l = e++) {
      let [u, i] = t[e] || [0, 0],
        [c, a] = t[l] || [0, 0];
      i >= r != a >= r && n <= ((c - u) * (r - i)) / (a - i) + u && (o = !o);
    }
    return o;
  }
  e.s(
    [
      "r",
      0,
      function (e) {
        let { children: t, id: o, root: u, preserveTabOrder: l = !0 } = e,
          i = (function (e) {
            void 0 === e && (e = {});
            let { id: t, root: o } = e,
              u = M(),
              l = n.useContext(N),
              [i, c] = n.useState(null),
              a = n.useRef(null);
            return (
              x(
                () => () => {
                  (null == i || i.remove(),
                    queueMicrotask(() => {
                      a.current = null;
                    }));
                },
                [i],
              ),
              x(() => {
                if (!u || a.current) return;
                let e = t ? document.getElementById(t) : null;
                if (!e) return;
                let n = document.createElement("div");
                ((n.id = u),
                  n.setAttribute(Y, ""),
                  e.appendChild(n),
                  (a.current = n),
                  c(n));
              }, [t, u]),
              x(() => {
                if (null === o || !u || a.current) return;
                let e = o || (null == l ? void 0 : l.portalNode);
                (e && !(0, r.m)(e) && (e = e.current),
                  (e = e || document.body));
                let n = null;
                t &&
                  (((n = document.createElement("div")).id = t),
                  e.appendChild(n));
                let i = document.createElement("div");
                ((i.id = u),
                  i.setAttribute(Y, ""),
                  (e = n || e).appendChild(i),
                  (a.current = i),
                  c(i));
              }, [t, o, u, l]),
              i
            );
          })({ id: o, root: u }),
          [c, a] = n.useState(null),
          s = n.useRef(null),
          f = n.useRef(null),
          d = n.useRef(null),
          m = n.useRef(null),
          v = null == c ? void 0 : c.modal,
          p = null == c ? void 0 : c.open,
          E = !!c && !c.modal && c.open && l && !!(u || i);
        return (
          n.useEffect(() => {
            if (i && l && !v)
              return (
                i.addEventListener("focusin", e, !0),
                i.addEventListener("focusout", e, !0),
                () => {
                  (i.removeEventListener("focusin", e, !0),
                    i.removeEventListener("focusout", e, !0));
                }
              );
            function e(e) {
              i &&
                I(e) &&
                ("focusin" === e.type
                  ? F
                  : function (e) {
                      (0, g.T)(e, _()).forEach((e) => {
                        ((e.dataset.tabindex =
                          e.getAttribute("tabindex") || ""),
                          e.setAttribute("tabindex", "-1"));
                      });
                    })(i);
            }
          }, [i, l, v]),
          n.useEffect(() => {
            !i || p || F(i);
          }, [p, i]),
          n.createElement(
            N.Provider,
            {
              value: n.useMemo(
                () => ({
                  preserveTabOrder: l,
                  beforeOutsideRef: s,
                  afterOutsideRef: f,
                  beforeInsideRef: d,
                  afterInsideRef: m,
                  portalNode: i,
                  setFocusManagerState: a,
                }),
                [l, i],
              ),
            },
            E &&
              i &&
              n.createElement(X, {
                "data-type": "outside",
                ref: s,
                onFocus: (e) => {
                  if (I(e, i)) {
                    var t;
                    null == (t = d.current) || t.focus();
                  } else {
                    let e =
                      j(document.body, "prev") ||
                      (null == c ? void 0 : c.refs.domReference.current);
                    null == e || e.focus();
                  }
                },
              }),
            E && i && n.createElement("span", { "aria-owns": i.id, style: W }),
            i && h.createPortal(t, i),
            E &&
              i &&
              n.createElement(X, {
                "data-type": "outside",
                ref: f,
                onFocus: (e) => {
                  if (I(e, i)) {
                    var t;
                    null == (t = m.current) || t.focus();
                  } else {
                    let t =
                      j(document.body, "next") ||
                      (null == c ? void 0 : c.refs.domReference.current);
                    (null == t || t.focus(),
                      (null == c ? void 0 : c.closeOnFocusOut) &&
                        (null == c ||
                          c.onOpenChange(!1, e.nativeEvent, "focus-out")));
                  }
                },
              }),
          )
        );
      },
      "I",
      0,
      (e) => ({
        name: "inner",
        options: e,
        async fn(t) {
          let {
              listRef: n,
              overflowRef: r,
              onFallbackChange: o,
              offset: u = 0,
              index: l = 0,
              minItemsVisible: i = 4,
              referenceOverflowThreshold: c = 0,
              scrollRef: a,
              ...s
            } = (0, p.h)(e, t),
            {
              rects: f,
              elements: { floating: d },
            } = t,
            m = n.current[l],
            v = (null == a ? void 0 : a.current) || d,
            g = d.clientTop || v.clientTop,
            y = 0 !== d.clientTop,
            w = 0 !== v.clientTop,
            R = d === v;
          if (!m) return {};
          let x = {
              ...t,
              ...(await (0, E.T)(
                -m.offsetTop -
                  d.clientTop -
                  f.reference.height / 2 -
                  m.offsetHeight / 2 -
                  u,
              ).fn(t)),
            },
            T = await (0, b.k)(en(x, v.scrollHeight + g + d.clientTop), s),
            k = await (0, b.k)(x, { ...s, elementContext: "reference" }),
            C = (0, p.y)(0, T.top),
            L = x.y + C,
            M = (v.scrollHeight > v.clientHeight ? (e) => e : p.H)(
              (0, p.y)(
                0,
                v.scrollHeight +
                  ((y && R) || w ? 2 * g : 0) -
                  C -
                  (0, p.y)(0, T.bottom),
              ),
            );
          if (((v.style.maxHeight = M + "px"), (v.scrollTop = C), o)) {
            let e =
              v.offsetHeight <
                m.offsetHeight * (0, p.u)(i, n.current.length) - 1 ||
              k.top >= -c ||
              k.bottom >= -c;
            h.flushSync(() => o(e));
          }
          return (
            r &&
              (r.current = await (0, b.k)(
                en({ ...x, y: L }, v.offsetHeight + g + d.clientTop),
                s,
              )),
            { y: L }
          );
        },
      }),
      "i",
      0,
      function (e) {
        let t;
        void 0 === e && (e = {});
        let {
            buffer: n = 0.5,
            blockPointerEvents: o = !1,
            requireIntent: l = !0,
          } = e,
          i = !1,
          c = null,
          a = null,
          s = performance.now(),
          f = (e) => {
            let {
              x: o,
              y: f,
              placement: d,
              elements: v,
              onClose: p,
              nodeId: g,
              tree: h,
            } = e;
            return function (e) {
              function E() {
                (clearTimeout(t), p());
              }
              if (
                (clearTimeout(t),
                !v.domReference ||
                  !v.floating ||
                  null == d ||
                  null == o ||
                  null == f)
              )
                return;
              let { clientX: b, clientY: y } = e,
                w = [b, y],
                R = m(e),
                x = "mouseleave" === e.type,
                T = u(v.floating, R),
                k = u(v.domReference, R),
                C = v.domReference.getBoundingClientRect(),
                L = v.floating.getBoundingClientRect(),
                M = d.split("-")[0],
                P = o > L.right - L.width / 2,
                A = f > L.bottom - L.height / 2,
                D =
                  w[0] >= C.x &&
                  w[0] <= C.x + C.width &&
                  w[1] >= C.y &&
                  w[1] <= C.y + C.height,
                S = L.width > C.width,
                H = L.height > C.height,
                O = (S ? C : L).left,
                K = (S ? C : L).right,
                _ = (H ? C : L).top,
                j = (H ? C : L).bottom;
              if (T && ((i = !0), !x)) return;
              if ((k && (i = !1), k && !x)) {
                i = !0;
                return;
              }
              if (
                (x &&
                  (0, r.m)(e.relatedTarget) &&
                  u(v.floating, e.relatedTarget)) ||
                (h &&
                  B(h.nodesRef.current, g).some((e) => {
                    let { context: t } = e;
                    return null == t ? void 0 : t.open;
                  }))
              )
                return;
              if (
                ("top" === M && f >= C.bottom - 1) ||
                ("bottom" === M && f <= C.top + 1) ||
                ("left" === M && o >= C.right - 1) ||
                ("right" === M && o <= C.left + 1)
              )
                return E();
              let I = [];
              switch (M) {
                case "top":
                  I = [
                    [O, C.top + 1],
                    [O, L.bottom - 1],
                    [K, L.bottom - 1],
                    [K, C.top + 1],
                  ];
                  break;
                case "bottom":
                  I = [
                    [O, L.top + 1],
                    [O, C.bottom - 1],
                    [K, C.bottom - 1],
                    [K, L.top + 1],
                  ];
                  break;
                case "left":
                  I = [
                    [L.right - 1, j],
                    [L.right - 1, _],
                    [C.left + 1, _],
                    [C.left + 1, j],
                  ];
                  break;
                case "right":
                  I = [
                    [C.right - 1, j],
                    [C.right - 1, _],
                    [L.left + 1, _],
                    [L.left + 1, j],
                  ];
              }
              if (!er([b, y], I)) {
                if (i && !D) return E();
                if (!x && l) {
                  let t = (function (e, t) {
                    let n = performance.now(),
                      r = n - s;
                    if (null === c || null === a || 0 === r)
                      return ((c = e), (a = t), (s = n), null);
                    let o = e - c,
                      u = t - a,
                      l = Math.sqrt(o * o + u * u);
                    return ((c = e), (a = t), (s = n), l / r);
                  })(e.clientX, e.clientY);
                  if (null !== t && t < 0.1) return E();
                }
                er(
                  [b, y],
                  (function (e) {
                    let [t, r] = e;
                    switch (M) {
                      case "top": {
                        let e = [
                          [L.left, P || S ? L.bottom - n : L.top],
                          [
                            L.right,
                            P ? (S ? L.bottom - n : L.top) : L.bottom - n,
                          ],
                        ];
                        return [
                          [
                            S ? t + n / 2 : P ? t + 4 * n : t - 4 * n,
                            r + n + 1,
                          ],
                          [
                            S ? t - n / 2 : P ? t + 4 * n : t - 4 * n,
                            r + n + 1,
                          ],
                          ...e,
                        ];
                      }
                      case "bottom": {
                        let e = [
                          [L.left, P || S ? L.top + n : L.bottom],
                          [L.right, P ? (S ? L.top + n : L.bottom) : L.top + n],
                        ];
                        return [
                          [S ? t + n / 2 : P ? t + 4 * n : t - 4 * n, r - n],
                          [S ? t - n / 2 : P ? t + 4 * n : t - 4 * n, r - n],
                          ...e,
                        ];
                      }
                      case "left":
                        return [
                          [A || H ? L.right - n : L.left, L.top],
                          [
                            A ? (H ? L.right - n : L.left) : L.right - n,
                            L.bottom,
                          ],
                          [
                            t + n + 1,
                            H ? r + n / 2 : A ? r + 4 * n : r - 4 * n,
                          ],
                          [
                            t + n + 1,
                            H ? r - n / 2 : A ? r + 4 * n : r - 4 * n,
                          ],
                        ];
                      case "right": {
                        let e = [
                          [A || H ? L.left + n : L.right, L.top],
                          [
                            A ? (H ? L.left + n : L.right) : L.left + n,
                            L.bottom,
                          ],
                        ];
                        return [
                          [t - n, H ? r + n / 2 : A ? r + 4 * n : r - 4 * n],
                          [t - n, H ? r - n / 2 : A ? r + 4 * n : r - 4 * n],
                          ...e,
                        ];
                      }
                    }
                  })([o, f]),
                )
                  ? !i && l && (t = window.setTimeout(E, 40))
                  : E();
              }
            };
          };
        return ((f.__options = { blockPointerEvents: o }), f);
      },
      "F",
      0,
      function (e, t) {
        void 0 === t && (t = {});
        let {
            open: r,
            onOpenChange: o,
            dataRef: u,
            elements: { domReference: l },
          } = e,
          {
            enabled: i = !0,
            event: c = "click",
            toggle: a = !0,
            ignoreMouse: f = !1,
            keyboardHandlers: d = !0,
            stickIfOpen: m = !0,
          } = t,
          p = n.useRef(),
          g = n.useRef(!1),
          h = n.useMemo(
            () => ({
              onPointerDown(e) {
                p.current = e.pointerType;
              },
              onMouseDown(e) {
                let t = p.current;
                0 !== e.button ||
                  "click" === c ||
                  (s(t, !0) && f) ||
                  (r &&
                  a &&
                  (!u.current.openEvent ||
                    !m ||
                    "mousedown" === u.current.openEvent.type)
                    ? o(!1, e.nativeEvent, "click")
                    : (e.preventDefault(), o(!0, e.nativeEvent, "click")));
              },
              onClick(e) {
                let t = p.current;
                if ("mousedown" === c && p.current) {
                  p.current = void 0;
                  return;
                }
                (s(t, !0) && f) ||
                  (r &&
                  a &&
                  (!u.current.openEvent ||
                    !m ||
                    "click" === u.current.openEvent.type)
                    ? o(!1, e.nativeEvent, "click")
                    : o(!0, e.nativeEvent, "click"));
              },
              onKeyDown(e) {
                ((p.current = void 0),
                  e.defaultPrevented ||
                    !d ||
                    U(e) ||
                    (" " !== e.key ||
                      v(l) ||
                      (e.preventDefault(), (g.current = !0)),
                    "Enter" === e.key &&
                      (r && a
                        ? o(!1, e.nativeEvent, "click")
                        : o(!0, e.nativeEvent, "click"))));
              },
              onKeyUp(e) {
                !(e.defaultPrevented || !d || U(e) || v(l)) &&
                  " " === e.key &&
                  g.current &&
                  ((g.current = !1),
                  r && a
                    ? o(!1, e.nativeEvent, "click")
                    : o(!0, e.nativeEvent, "click"));
              },
            }),
            [u, l, c, f, d, o, r, m, a],
          );
        return n.useMemo(() => (i ? { reference: h } : {}), [i, h]);
      },
      "H",
      0,
      function (e, t) {
        void 0 === t && (t = {});
        let { open: o, onOpenChange: l, elements: i, dataRef: c } = e,
          {
            enabled: a = !0,
            escapeKey: s = !0,
            outsidePress: v = !0,
            outsidePressEvent: p = "pointerdown",
            referencePress: g = !1,
            referencePressEvent: h = "pointerdown",
            ancestorScroll: E = !1,
            bubbles: b,
            capture: y,
          } = t,
          w = n.useContext(A),
          x = R("function" == typeof v ? v : () => !1),
          T = "function" == typeof v ? x : v,
          k = n.useRef(!1),
          C = n.useRef(!1),
          { escapeKey: L, outsidePress: M } = G(b),
          { escapeKey: P, outsidePress: D } = G(y),
          H = n.useRef(!1),
          O = R((e) => {
            var t;
            if (!o || !a || !s || "Escape" !== e.key || H.current) return;
            let n = null == (t = c.current.floatingContext) ? void 0 : t.nodeId,
              r = w ? B(w.nodesRef.current, n) : [];
            if (!L && (e.stopPropagation(), r.length > 0)) {
              let e = !0;
              if (
                (r.forEach((t) => {
                  var n;
                  if (
                    null != (n = t.context) &&
                    n.open &&
                    !t.context.dataRef.current.__escapeKeyBubbles
                  ) {
                    e = !1;
                    return;
                  }
                }),
                !e)
              )
                return;
            }
            l(!1, "nativeEvent" in e ? e.nativeEvent : e, "escape-key");
          }),
          K = R((e) => {
            var t;
            let n = () => {
              var t;
              (O(e), null == (t = m(e)) || t.removeEventListener("keydown", n));
            };
            null == (t = m(e)) || t.addEventListener("keydown", n);
          }),
          _ = R((e) => {
            var t;
            let n = k.current;
            k.current = !1;
            let o = C.current;
            if (
              ((C.current = !1),
              ("click" === p && o) || n || ("function" == typeof T && !T(e)))
            )
              return;
            let a = m(e),
              s = "[" + S("inert") + "]",
              v = f(i.floating).querySelectorAll(s),
              g = (0, r.m)(a) ? a : null;
            for (; g && !(0, r.Z)(g); ) {
              let e = (0, r.J)(g);
              if ((0, r.Z)(e) || !(0, r.m)(e)) break;
              g = e;
            }
            if (
              v.length &&
              (0, r.m)(a) &&
              !a.matches("html,body") &&
              !u(a, i.floating) &&
              Array.from(v).every((e) => !u(g, e))
            )
              return;
            if ((0, r.E)(a) && F) {
              let t = a.clientWidth > 0 && a.scrollWidth > a.clientWidth,
                n = a.clientHeight > 0 && a.scrollHeight > a.clientHeight,
                o = n && e.offsetX > a.clientWidth;
              if (
                (n &&
                  "rtl" === (0, r.X)(a).direction &&
                  (o = e.offsetX <= a.offsetWidth - a.clientWidth),
                o || (t && e.offsetY > a.clientHeight))
              )
                return;
            }
            let h = null == (t = c.current.floatingContext) ? void 0 : t.nodeId,
              E =
                w &&
                B(w.nodesRef.current, h).some((t) => {
                  var n;
                  return d(
                    e,
                    null == (n = t.context) ? void 0 : n.elements.floating,
                  );
                });
            if (d(e, i.floating) || d(e, i.domReference) || E) return;
            let b = w ? B(w.nodesRef.current, h) : [];
            if (b.length > 0) {
              let e = !0;
              if (
                (b.forEach((t) => {
                  var n;
                  if (
                    null != (n = t.context) &&
                    n.open &&
                    !t.context.dataRef.current.__outsidePressBubbles
                  ) {
                    e = !1;
                    return;
                  }
                }),
                !e)
              )
                return;
            }
            l(!1, e, "outside-press");
          }),
          j = R((e) => {
            var t;
            let n = () => {
              var t;
              (_(e), null == (t = m(e)) || t.removeEventListener(p, n));
            };
            null == (t = m(e)) || t.addEventListener(p, n);
          });
        (n.useEffect(() => {
          if (!o || !a) return;
          ((c.current.__escapeKeyBubbles = L),
            (c.current.__outsidePressBubbles = M));
          let e = -1;
          function t(e) {
            l(!1, e, "ancestor-scroll");
          }
          function n() {
            (window.clearTimeout(e), (H.current = !0));
          }
          function u() {
            e = window.setTimeout(
              () => {
                H.current = !1;
              },
              5 * !!(0, r.i)(),
            );
          }
          let d = f(i.floating);
          (s &&
            (d.addEventListener("keydown", P ? K : O, P),
            d.addEventListener("compositionstart", n),
            d.addEventListener("compositionend", u)),
            T && d.addEventListener(p, D ? j : _, D));
          let m = [];
          return (
            E &&
              ((0, r.m)(i.domReference) && (m = (0, r.G)(i.domReference)),
              (0, r.m)(i.floating) && (m = m.concat((0, r.G)(i.floating))),
              !(0, r.m)(i.reference) &&
                i.reference &&
                i.reference.contextElement &&
                (m = m.concat((0, r.G)(i.reference.contextElement)))),
            (m = m.filter((e) => {
              var t;
              return (
                e !== (null == (t = d.defaultView) ? void 0 : t.visualViewport)
              );
            })).forEach((e) => {
              e.addEventListener("scroll", t, { passive: !0 });
            }),
            () => {
              (s &&
                (d.removeEventListener("keydown", P ? K : O, P),
                d.removeEventListener("compositionstart", n),
                d.removeEventListener("compositionend", u)),
                T && d.removeEventListener(p, D ? j : _, D),
                m.forEach((e) => {
                  e.removeEventListener("scroll", t);
                }),
                window.clearTimeout(e));
            }
          );
        }, [c, i, s, T, p, o, l, E, a, L, M, O, P, K, _, D, j]),
          n.useEffect(() => {
            k.current = !1;
          }, [T, p]));
        let I = n.useMemo(
            () => ({
              onKeyDown: O,
              [Z[h]]: (e) => {
                g && l(!1, e.nativeEvent, "reference-press");
              },
            }),
            [O, l, g, h],
          ),
          F = n.useMemo(
            () => ({
              onKeyDown: O,
              onMouseDown() {
                C.current = !0;
              },
              onMouseUp() {
                C.current = !0;
              },
              [z[p]]: () => {
                k.current = !0;
              },
            }),
            [O, p],
          );
        return n.useMemo(
          () => (a ? { reference: I, floating: F } : {}),
          [a, I, F],
        );
      },
      "E",
      0,
      function (e) {
        void 0 === e && (e = {});
        let { nodeId: t } = e,
          o = (function (e) {
            let { open: t = !1, onOpenChange: r, elements: o } = e,
              u = M(),
              l = n.useRef({}),
              [i] = n.useState(() => {
                let e;
                return (
                  (e = new Map()),
                  {
                    emit(t, n) {
                      var r;
                      null == (r = e.get(t)) || r.forEach((e) => e(n));
                    },
                    on(t, n) {
                      e.set(t, [...(e.get(t) || []), n]);
                    },
                    off(t, n) {
                      var r;
                      e.set(
                        t,
                        (null == (r = e.get(t))
                          ? void 0
                          : r.filter((e) => e !== n)) || [],
                      );
                    },
                  }
                );
              }),
              c = null != D(),
              [a, s] = n.useState(o.reference),
              f = R((e, t, n) => {
                ((l.current.openEvent = e ? t : void 0),
                  i.emit("openchange", {
                    open: e,
                    event: t,
                    reason: n,
                    nested: c,
                  }),
                  null == r || r(e, t, n));
              }),
              d = n.useMemo(() => ({ setPositionReference: s }), []),
              m = n.useMemo(
                () => ({
                  reference: a || o.reference || null,
                  floating: o.floating || null,
                  domReference: o.reference,
                }),
                [a, o.reference, o.floating],
              );
            return n.useMemo(
              () => ({
                dataRef: l,
                open: t,
                onOpenChange: f,
                elements: m,
                events: i,
                floatingId: u,
                refs: d,
              }),
              [t, f, m, i, u, d],
            );
          })({
            ...e,
            elements: { reference: null, floating: null, ...e.elements },
          }),
          u = e.rootContext || o,
          l = u.elements,
          [i, c] = n.useState(null),
          [a, s] = n.useState(null),
          f = (null == l ? void 0 : l.domReference) || i,
          d = n.useRef(null),
          m = n.useContext(A);
        x(() => {
          f && (d.current = f);
        }, [f]);
        let v = (0, E.E)({
            ...e,
            elements: { ...l, ...(a && { reference: a }) },
          }),
          p = n.useCallback(
            (e) => {
              let t = (0, r.m)(e)
                ? {
                    getBoundingClientRect: () => e.getBoundingClientRect(),
                    contextElement: e,
                  }
                : e;
              (s(t), v.refs.setReference(t));
            },
            [v.refs],
          ),
          g = n.useCallback(
            (e) => {
              (((0, r.m)(e) || null === e) && ((d.current = e), c(e)),
                ((0, r.m)(v.refs.reference.current) ||
                  null === v.refs.reference.current ||
                  (null !== e && !(0, r.m)(e))) &&
                  v.refs.setReference(e));
            },
            [v.refs],
          ),
          h = n.useMemo(
            () => ({
              ...v.refs,
              setReference: g,
              setPositionReference: p,
              domReference: d,
            }),
            [v.refs, g, p],
          ),
          b = n.useMemo(
            () => ({ ...v.elements, domReference: f }),
            [v.elements, f],
          ),
          y = n.useMemo(
            () => ({ ...v, ...u, refs: h, elements: b, nodeId: t }),
            [v, h, b, t, u],
          );
        return (
          x(() => {
            u.dataRef.current.floatingContext = y;
            let e =
              null == m ? void 0 : m.nodesRef.current.find((e) => e.id === t);
            e && (e.context = y);
          }),
          n.useMemo(
            () => ({ ...v, context: y, refs: h, elements: b }),
            [v, h, b, y],
          )
        );
      },
      "Z",
      0,
      function (e, t) {
        void 0 === t && (t = {});
        let {
            open: s,
            onOpenChange: d,
            events: p,
            dataRef: g,
            elements: h,
          } = e,
          { enabled: E = !0, visibleOnly: b = !0 } = t,
          y = n.useRef(!1),
          w = n.useRef(),
          R = n.useRef(!0);
        (n.useEffect(() => {
          if (!E) return;
          let e = (0, r.K)(h.domReference);
          function t() {
            !s &&
              (0, r.E)(h.domReference) &&
              h.domReference === o(f(h.domReference)) &&
              (y.current = !0);
          }
          function n() {
            R.current = !0;
          }
          return (
            e.addEventListener("blur", t),
            e.addEventListener("keydown", n, !0),
            () => {
              (e.removeEventListener("blur", t),
                e.removeEventListener("keydown", n, !0));
            }
          );
        }, [h.domReference, s, E]),
          n.useEffect(() => {
            if (E)
              return (
                p.on("openchange", e),
                () => {
                  p.off("openchange", e);
                }
              );
            function e(e) {
              let { reason: t } = e;
              ("reference-press" === t || "escape-key" === t) &&
                (y.current = !0);
            }
          }, [p, E]),
          n.useEffect(
            () => () => {
              clearTimeout(w.current);
            },
            [],
          ));
        let x = n.useMemo(
          () => ({
            onPointerDown(e) {
              var t;
              ((t = e.nativeEvent),
                (!i().includes("jsdom/") &&
                  ((!a() && 0 === t.width && 0 === t.height) ||
                    (a() &&
                      1 === t.width &&
                      1 === t.height &&
                      0 === t.pressure &&
                      0 === t.detail &&
                      "mouse" === t.pointerType) ||
                    (t.width < 1 &&
                      t.height < 1 &&
                      0 === t.pressure &&
                      0 === t.detail &&
                      "touch" === t.pointerType))) ||
                  (R.current = !1));
            },
            onMouseLeave() {
              y.current = !1;
            },
            onFocus(e) {
              if (y.current) return;
              let t = m(e.nativeEvent);
              if (b && (0, r.m)(t))
                try {
                  if (
                    c() &&
                    l().toLowerCase().startsWith("mac") &&
                    !navigator.maxTouchPoints
                  )
                    throw Error();
                  if (!t.matches(":focus-visible")) return;
                } catch (e) {
                  if (!R.current && !v(t)) return;
                }
              d(!0, e.nativeEvent, "focus");
            },
            onBlur(e) {
              y.current = !1;
              let t = e.relatedTarget,
                n = e.nativeEvent,
                l =
                  (0, r.m)(t) &&
                  t.hasAttribute(S("focus-guard")) &&
                  "outside" === t.getAttribute("data-type");
              w.current = window.setTimeout(() => {
                var e;
                let r = o(
                  h.domReference ? h.domReference.ownerDocument : document,
                );
                (!t && r === h.domReference) ||
                  u(
                    null == (e = g.current.floatingContext)
                      ? void 0
                      : e.refs.floating.current,
                    r,
                  ) ||
                  u(h.domReference, r) ||
                  l ||
                  d(!1, n, "focus");
              });
            },
          }),
          [g, h.domReference, d, b],
        );
        return n.useMemo(() => (E ? { reference: x } : {}), [E, x]);
      },
      "V",
      0,
      function (e, t) {
        void 0 === t && (t = {});
        let {
            open: o,
            onOpenChange: l,
            dataRef: i,
            events: c,
            elements: a,
          } = e,
          {
            enabled: d = !0,
            delay: m = 0,
            handleClose: v = null,
            mouseOnly: p = !1,
            restMs: g = 0,
            move: h = !0,
          } = t,
          E = n.useContext(A),
          b = D(),
          y = H(v),
          w = H(m),
          T = H(o),
          k = n.useRef(),
          C = n.useRef(-1),
          L = n.useRef(),
          M = n.useRef(-1),
          P = n.useRef(!0),
          S = n.useRef(!1),
          B = n.useRef(() => {}),
          _ = n.useRef(!1),
          j = n.useCallback(() => {
            var e;
            let t = null == (e = i.current.openEvent) ? void 0 : e.type;
            return (
              (null == t ? void 0 : t.includes("mouse")) && "mousedown" !== t
            );
          }, [i]);
        (n.useEffect(() => {
          if (d)
            return (
              c.on("openchange", e),
              () => {
                c.off("openchange", e);
              }
            );
          function e(e) {
            let { open: t } = e;
            t ||
              (clearTimeout(C.current),
              clearTimeout(M.current),
              (P.current = !0),
              (_.current = !1));
          }
        }, [d, c]),
          n.useEffect(() => {
            if (!d || !y.current || !o) return;
            function e(e) {
              j() && l(!1, e, "hover");
            }
            let t = f(a.floating).documentElement;
            return (
              t.addEventListener("mouseleave", e),
              () => {
                t.removeEventListener("mouseleave", e);
              }
            );
          }, [a.floating, o, l, d, y, j]));
        let I = n.useCallback(
            function (e, t, n) {
              (void 0 === t && (t = !0), void 0 === n && (n = "hover"));
              let r = K(w.current, "close", k.current);
              r && !L.current
                ? (clearTimeout(C.current),
                  (C.current = window.setTimeout(() => l(!1, e, n), r)))
                : t && (clearTimeout(C.current), l(!1, e, n));
            },
            [w, l],
          ),
          F = R(() => {
            (B.current(), (L.current = void 0));
          }),
          W = R(() => {
            if (S.current) {
              let e = f(a.floating).body;
              ((e.style.pointerEvents = ""),
                e.removeAttribute(O),
                (S.current = !1));
            }
          }),
          q = R(
            () =>
              !!i.current.openEvent &&
              ["click", "mousedown"].includes(i.current.openEvent.type),
          );
        (n.useEffect(() => {
          if (d && (0, r.m)(a.domReference)) {
            var e;
            let r = a.domReference;
            return (
              o && r.addEventListener("mouseleave", c),
              null == (e = a.floating) || e.addEventListener("mouseleave", c),
              h && r.addEventListener("mousemove", t, { once: !0 }),
              r.addEventListener("mouseenter", t),
              r.addEventListener("mouseleave", n),
              () => {
                var e;
                (o && r.removeEventListener("mouseleave", c),
                  null == (e = a.floating) ||
                    e.removeEventListener("mouseleave", c),
                  h && r.removeEventListener("mousemove", t),
                  r.removeEventListener("mouseenter", t),
                  r.removeEventListener("mouseleave", n));
              }
            );
          }
          function t(e) {
            if (
              (clearTimeout(C.current),
              (P.current = !1),
              (p && !s(k.current)) || (g > 0 && !K(w.current, "open")))
            )
              return;
            let t = K(w.current, "open", k.current);
            t
              ? (C.current = window.setTimeout(() => {
                  T.current || l(!0, e, "hover");
                }, t))
              : o || l(!0, e, "hover");
          }
          function n(e) {
            if (q()) return;
            B.current();
            let t = f(a.floating);
            if (
              (clearTimeout(M.current),
              (_.current = !1),
              y.current && i.current.floatingContext)
            ) {
              (o || clearTimeout(C.current),
                (L.current = y.current({
                  ...i.current.floatingContext,
                  tree: E,
                  x: e.clientX,
                  y: e.clientY,
                  onClose() {
                    (W(), F(), q() || I(e, !0, "safe-polygon"));
                  },
                })));
              let n = L.current;
              (t.addEventListener("mousemove", n),
                (B.current = () => {
                  t.removeEventListener("mousemove", n);
                }));
              return;
            }
            ("touch" === k.current && u(a.floating, e.relatedTarget)) || I(e);
          }
          function c(e) {
            q() ||
              (i.current.floatingContext &&
                (null == y.current ||
                  y.current({
                    ...i.current.floatingContext,
                    tree: E,
                    x: e.clientX,
                    y: e.clientY,
                    onClose() {
                      (W(), F(), q() || I(e));
                    },
                  })(e)));
          }
        }, [a, d, e, p, g, h, I, F, W, l, o, T, E, w, y, i, q]),
          x(() => {
            var e, t;
            if (
              d &&
              o &&
              null != (e = y.current) &&
              e.__options.blockPointerEvents &&
              j()
            ) {
              S.current = !0;
              let e = a.floating;
              if ((0, r.m)(a.domReference) && e) {
                let n = f(a.floating).body;
                n.setAttribute(O, "");
                let r = a.domReference,
                  o =
                    null == E ||
                    null == (t = E.nodesRef.current.find((e) => e.id === b)) ||
                    null == (t = t.context)
                      ? void 0
                      : t.elements.floating;
                return (
                  o && (o.style.pointerEvents = ""),
                  (n.style.pointerEvents = "none"),
                  (r.style.pointerEvents = "auto"),
                  (e.style.pointerEvents = "auto"),
                  () => {
                    ((n.style.pointerEvents = ""),
                      (r.style.pointerEvents = ""),
                      (e.style.pointerEvents = ""));
                  }
                );
              }
            }
          }, [d, o, b, a, E, y, j]),
          x(() => {
            o || ((k.current = void 0), (_.current = !1), F(), W());
          }, [o, F, W]),
          n.useEffect(
            () => () => {
              (F(), clearTimeout(C.current), clearTimeout(M.current), W());
            },
            [d, a.domReference, F, W],
          ));
        let X = n.useMemo(() => {
            function e(e) {
              k.current = e.pointerType;
            }
            return {
              onPointerDown: e,
              onPointerEnter: e,
              onMouseMove(e) {
                let { nativeEvent: t } = e;
                function n() {
                  P.current || T.current || l(!0, t, "hover");
                }
                (p && !s(k.current)) ||
                  o ||
                  0 === g ||
                  (_.current && e.movementX ** 2 + e.movementY ** 2 < 2) ||
                  (clearTimeout(M.current),
                  "touch" === k.current
                    ? n()
                    : ((_.current = !0),
                      (M.current = window.setTimeout(n, g))));
              },
            };
          }, [p, l, o, T, g]),
          N = n.useMemo(
            () => ({
              onMouseEnter() {
                clearTimeout(C.current);
              },
              onMouseLeave(e) {
                q() || I(e.nativeEvent, !1);
              },
            }),
            [I, q],
          );
        return n.useMemo(
          () => (d ? { reference: X, floating: N } : {}),
          [d, X, N],
        );
      },
      "a",
      0,
      function (e, t) {
        let { open: r, elements: o } = e,
          { enabled: u = !0, overflowRef: l, scrollRef: c, onChange: a } = t,
          s = R(a),
          f = n.useRef(!1),
          d = n.useRef(null),
          m = n.useRef(null);
        n.useEffect(() => {
          if (!u) return;
          function e(e) {
            if (e.ctrlKey || !t || null == l.current) return;
            let n = e.deltaY,
              r = l.current.top >= -0.5,
              o = l.current.bottom >= -0.5,
              u = t.scrollHeight - t.clientHeight,
              c = n < 0 ? -1 : 1,
              a = n < 0 ? "max" : "min";
            !(t.scrollHeight <= t.clientHeight) &&
              ((!r && n > 0) || (!o && n < 0)
                ? (e.preventDefault(),
                  h.flushSync(() => {
                    s((e) => e + Math[a](n, u * c));
                  }))
                : /firefox/i.test(i()) && (t.scrollTop += n));
          }
          let t = (null == c ? void 0 : c.current) || o.floating;
          if (r && t)
            return (
              t.addEventListener("wheel", e),
              requestAnimationFrame(() => {
                ((d.current = t.scrollTop),
                  null != l.current && (m.current = { ...l.current }));
              }),
              () => {
                ((d.current = null),
                  (m.current = null),
                  t.removeEventListener("wheel", e));
              }
            );
        }, [u, r, o.floating, l, c, s]);
        let v = n.useMemo(
          () => ({
            onKeyDown() {
              f.current = !0;
            },
            onWheel() {
              f.current = !1;
            },
            onPointerMove() {
              f.current = !1;
            },
            onScroll() {
              let e = (null == c ? void 0 : c.current) || o.floating;
              if (l.current && e && f.current) {
                if (null !== d.current) {
                  let t = e.scrollTop - d.current;
                  ((l.current.bottom < -0.5 && t < -1) ||
                    (l.current.top < -0.5 && t > 1)) &&
                    h.flushSync(() => s((e) => e + t));
                }
                requestAnimationFrame(() => {
                  d.current = e.scrollTop;
                });
              }
            },
          }),
          [o.floating, s, l, c],
        );
        return n.useMemo(() => (u ? { floating: v } : {}), [u, v]);
      },
      "t",
      0,
      function (e) {
        void 0 === e && (e = []);
        let t = e.map((e) => (null == e ? void 0 : e.reference)),
          r = e.map((e) => (null == e ? void 0 : e.floating)),
          o = e.map((e) => (null == e ? void 0 : e.item)),
          u = n.useCallback((t) => Q(t, e, "reference"), t),
          l = n.useCallback((t) => Q(t, e, "floating"), r),
          i = n.useCallback((t) => Q(t, e, "item"), o);
        return n.useMemo(
          () => ({
            getReferenceProps: u,
            getFloatingProps: l,
            getItemProps: i,
          }),
          [u, l, i],
        );
      },
      "M",
      0,
      function (e, t) {
        var r;
        void 0 === t && (t = {});
        let { open: o, floatingId: u } = e,
          { enabled: l = !0, role: i = "dialog" } = t,
          c = null != (r = $.get(i)) ? r : i,
          a = M(),
          s = null != D(),
          f = n.useMemo(
            () =>
              "tooltip" === c || "label" === i
                ? {
                    ["aria-" + ("label" === i ? "labelledby" : "describedby")]:
                      o ? u : void 0,
                  }
                : {
                    "aria-expanded": o ? "true" : "false",
                    "aria-haspopup": "alertdialog" === c ? "dialog" : c,
                    "aria-controls": o ? u : void 0,
                    ...("listbox" === c && { role: "combobox" }),
                    ...("menu" === c && { id: a }),
                    ...("menu" === c && s && { role: "menuitem" }),
                    ...("select" === i && { "aria-autocomplete": "none" }),
                    ...("combobox" === i && { "aria-autocomplete": "list" }),
                  },
            [c, u, s, o, a, i],
          ),
          d = n.useMemo(() => {
            let e = { id: u, ...(c && { role: c }) };
            return "tooltip" === c || "label" === i
              ? e
              : { ...e, ...("menu" === c && { "aria-labelledby": a }) };
          }, [c, u, a, i]),
          m = n.useCallback(
            (e) => {
              let { active: t, selected: n } = e,
                r = { role: "option", ...(t && { id: u + "-option" }) };
              switch (i) {
                case "select":
                  return { ...r, "aria-selected": t && n };
                case "combobox":
                  return { ...r, ...(t && { "aria-selected": !0 }) };
              }
              return {};
            },
            [u, i],
          );
        return n.useMemo(
          () => (l ? { reference: f, floating: d, item: m } : {}),
          [l, f, d, m],
        );
      },
      "z",
      0,
      function (e, t) {
        void 0 === t && (t = {});
        let {
            initial: r = { opacity: 0 },
            open: o,
            close: u,
            common: l,
            duration: i = 250,
          } = t,
          c = e.placement,
          a = c.split("-")[0],
          s = n.useMemo(() => ({ side: a, placement: c }), [a, c]),
          f = "number" == typeof i,
          d = (f ? i : i.open) || 0,
          m = (f ? i : i.close) || 0,
          [v, p] = n.useState(() => ({ ...et(l, s), ...et(r, s) })),
          { isMounted: g, status: h } = (function (e, t) {
            void 0 === t && (t = {});
            let {
                open: r,
                elements: { floating: o },
              } = e,
              { duration: u = 250 } = t,
              l = ("number" == typeof u ? u : u.close) || 0,
              [i, c] = n.useState("unmounted"),
              a = (function (e, t) {
                let [r, o] = n.useState(e);
                return (
                  e && !r && o(!0),
                  n.useEffect(() => {
                    if (!e && r) {
                      let e = setTimeout(() => o(!1), t);
                      return () => clearTimeout(e);
                    }
                  }, [e, r, t]),
                  r
                );
              })(r, l);
            return (
              a || "close" !== i || c("unmounted"),
              x(() => {
                if (o) {
                  if (r) {
                    c("initial");
                    let e = requestAnimationFrame(() => {
                      c("open");
                    });
                    return () => {
                      cancelAnimationFrame(e);
                    };
                  }
                  c("close");
                }
              }, [r, o]),
              { isMounted: a, status: i }
            );
          })(e, { duration: i }),
          E = H(r),
          b = H(o),
          y = H(u),
          w = H(l);
        return (
          x(() => {
            let e = et(E.current, s),
              t = et(y.current, s),
              n = et(w.current, s),
              r =
                et(b.current, s) ||
                Object.keys(e).reduce((e, t) => ((e[t] = ""), e), {});
            if (
              ("initial" === h &&
                p((t) => ({
                  transitionProperty: t.transitionProperty,
                  ...n,
                  ...e,
                })),
              "open" === h &&
                p({
                  transitionProperty: Object.keys(r).map(ee).join(","),
                  transitionDuration: d + "ms",
                  ...n,
                  ...r,
                }),
              "close" === h)
            ) {
              let r = t || e;
              p({
                transitionProperty: Object.keys(r).map(ee).join(","),
                transitionDuration: m + "ms",
                ...n,
                ...r,
              });
            }
          }, [m, y, E, b, w, d, h, s]),
          { isMounted: g, styles: v }
        );
      },
    ],
    493143,
  );
};
