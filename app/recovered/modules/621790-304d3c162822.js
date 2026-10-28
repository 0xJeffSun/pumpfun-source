// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n,
    r,
    o,
    a,
    i,
    c,
    u = e.i(824627),
    l = e.i(352386),
    s = "right-scroll-bar-position",
    f = "width-before-scroll-bar";
  function d(e, t) {
    return ("function" == typeof e ? e(t) : e && (e.current = t), e);
  }
  var p = "u" > typeof window ? l.useLayoutEffect : l.useEffect,
    v = new WeakMap(),
    h =
      (void 0 === t && (t = {}),
      ((void 0 === n &&
        (n = function (e) {
          return e;
        }),
      (r = []),
      (o = !1),
      (a = {
        read: function () {
          if (o)
            throw Error(
              "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
            );
          return r.length ? r[r.length - 1] : null;
        },
        useMedium: function (e) {
          var t = n(e, o);
          return (
            r.push(t),
            function () {
              r = r.filter(function (e) {
                return e !== t;
              });
            }
          );
        },
        assignSyncMedium: function (e) {
          for (o = !0; r.length; ) {
            var t = r;
            ((r = []), t.forEach(e));
          }
          r = {
            push: function (t) {
              return e(t);
            },
            filter: function () {
              return r;
            },
          };
        },
        assignMedium: function (e) {
          o = !0;
          var t = [];
          if (r.length) {
            var n = r;
            ((r = []), n.forEach(e), (t = r));
          }
          var a = function () {
              var n = t;
              ((t = []), n.forEach(e));
            },
            i = function () {
              return Promise.resolve().then(a);
            };
          (i(),
            (r = {
              push: function (e) {
                (t.push(e), i());
              },
              filter: function (e) {
                return ((t = t.filter(e)), r);
              },
            }));
        },
      })).options = (0, u.u)({ async: !0, ssr: !1 }, t)),
      a),
    m = function () {},
    y = l.forwardRef(function (e, t) {
      var n,
        r,
        o,
        a,
        i = l.useRef(null),
        c = l.useState({
          onScrollCapture: m,
          onWheelCapture: m,
          onTouchMoveCapture: m,
        }),
        s = c[0],
        f = c[1],
        y = e.forwardProps,
        g = e.children,
        b = e.className,
        w = e.removeScrollBar,
        E = e.enabled,
        S = e.shards,
        C = e.sideCar,
        T = e.noRelative,
        k = e.noIsolation,
        A = e.inert,
        N = e.allowPinchZoom,
        R = e.as,
        x = e.gapMode,
        M = (0, u.z)(e, [
          "forwardProps",
          "children",
          "className",
          "removeScrollBar",
          "enabled",
          "shards",
          "sideCar",
          "noRelative",
          "noIsolation",
          "inert",
          "allowPinchZoom",
          "as",
          "gapMode",
        ]),
        O =
          ((n = [i, t]),
          (r = function (e) {
            return n.forEach(function (t) {
              return d(t, e);
            });
          }),
          ((o = (0, l.useState)(function () {
            return {
              value: null,
              callback: r,
              facade: {
                get current() {
                  return o.value;
                },
                set current(e) {
                  var t = o.value;
                  t !== e && ((o.value = e), o.callback(e, t));
                },
              },
            };
          })[0]).callback = r),
          (a = o.facade),
          p(
            function () {
              var e = v.get(a);
              if (e) {
                var t = new Set(e),
                  r = new Set(n),
                  o = a.current;
                (t.forEach(function (e) {
                  r.has(e) || d(e, null);
                }),
                  r.forEach(function (e) {
                    t.has(e) || d(e, o);
                  }));
              }
              v.set(a, n);
            },
            [n],
          ),
          a),
        P = (0, u.u)((0, u.u)({}, M), s);
      return l.createElement(
        l.Fragment,
        null,
        E &&
          l.createElement(C, {
            sideCar: h,
            removeScrollBar: w,
            shards: S,
            noRelative: T,
            noIsolation: k,
            inert: A,
            setCallbacks: f,
            allowPinchZoom: !!N,
            lockRef: i,
            gapMode: x,
          }),
        y
          ? l.cloneElement(
              l.Children.only(g),
              (0, u.u)((0, u.u)({}, P), { ref: O }),
            )
          : l.createElement(
              void 0 === R ? "div" : R,
              (0, u.u)({}, P, { className: b, ref: O }),
              g,
            ),
      );
    });
  ((y.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
    (y.classNames = { fullWidth: f, zeroRight: s }));
  var g = function (e) {
    var t = e.sideCar,
      n = (0, u.z)(e, ["sideCar"]);
    if (!t)
      throw Error(
        "Sidecar: please provide `sideCar` property to import the right car",
      );
    var r = t.read();
    if (!r) throw Error("Sidecar medium not found");
    return l.createElement(r, (0, u.u)({}, n));
  };
  g.isSideCarExport = !0;
  var b = function () {
      var e = 0,
        t = null;
      return {
        add: function (n) {
          if (
            0 == e &&
            (t = (function () {
              if (!document) return null;
              var e = document.createElement("style");
              e.type = "text/css";
              var t =
                c ||
                ("u" > typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
              return (t && e.setAttribute("nonce", t), e);
            })())
          ) {
            var r, o;
            ((r = t).styleSheet
              ? (r.styleSheet.cssText = n)
              : r.appendChild(document.createTextNode(n)),
              (o = t),
              (
                document.head || document.getElementsByTagName("head")[0]
              ).appendChild(o));
          }
          e++;
        },
        remove: function () {
          --e ||
            !t ||
            (t.parentNode && t.parentNode.removeChild(t), (t = null));
        },
      };
    },
    w = function () {
      var e = b();
      return function (t, n) {
        l.useEffect(
          function () {
            return (
              e.add(t),
              function () {
                e.remove();
              }
            );
          },
          [t && n],
        );
      };
    },
    E = function () {
      var e = w();
      return function (t) {
        return (e(t.styles, t.dynamic), null);
      };
    },
    S = { left: 0, top: 0, right: 0, gap: 0 },
    C = function (e) {
      return parseInt(e || "", 10) || 0;
    },
    T = function (e) {
      var t = window.getComputedStyle(document.body),
        n = t["padding" === e ? "paddingLeft" : "marginLeft"],
        r = t["padding" === e ? "paddingTop" : "marginTop"],
        o = t["padding" === e ? "paddingRight" : "marginRight"];
      return [C(n), C(r), C(o)];
    },
    k = function (e) {
      if ((void 0 === e && (e = "margin"), "u" < typeof window)) return S;
      var t = T(e),
        n = document.documentElement.clientWidth,
        r = window.innerWidth;
      return {
        left: t[0],
        top: t[1],
        right: t[2],
        gap: Math.max(0, r - n + t[2] - t[0]),
      };
    },
    A = E(),
    N = "data-scroll-locked",
    R = function (e, t, n, r) {
      var o = e.left,
        a = e.top,
        i = e.right,
        c = e.gap;
      return (
        void 0 === n && (n = "margin"),
        "\n  ."
          .concat("with-scroll-bars-hidden", " {\n   overflow: hidden ")
          .concat(r, ";\n   padding-right: ")
          .concat(c, "px ")
          .concat(r, ";\n  }\n  body[")
          .concat(N, "] {\n    overflow: hidden ")
          .concat(r, ";\n    overscroll-behavior: contain;\n    ")
          .concat(
            [
              t && "position: relative ".concat(r, ";"),
              "margin" === n &&
                "\n    padding-left: "
                  .concat(o, "px;\n    padding-top: ")
                  .concat(a, "px;\n    padding-right: ")
                  .concat(
                    i,
                    "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ",
                  )
                  .concat(c, "px ")
                  .concat(r, ";\n    "),
              "padding" === n &&
                "padding-right: ".concat(c, "px ").concat(r, ";"),
            ]
              .filter(Boolean)
              .join(""),
            "\n  }\n  \n  .",
          )
          .concat(s, " {\n    right: ")
          .concat(c, "px ")
          .concat(r, ";\n  }\n  \n  .")
          .concat(f, " {\n    margin-right: ")
          .concat(c, "px ")
          .concat(r, ";\n  }\n  \n  .")
          .concat(s, " .")
          .concat(s, " {\n    right: 0 ")
          .concat(r, ";\n  }\n  \n  .")
          .concat(f, " .")
          .concat(f, " {\n    margin-right: 0 ")
          .concat(r, ";\n  }\n  \n  body[")
          .concat(N, "] {\n    ")
          .concat("--removed-body-scroll-bar-size", ": ")
          .concat(c, "px;\n  }\n")
      );
    },
    x = function () {
      var e = parseInt(document.body.getAttribute(N) || "0", 10);
      return isFinite(e) ? e : 0;
    },
    M = function () {
      l.useEffect(function () {
        return (
          document.body.setAttribute(N, (x() + 1).toString()),
          function () {
            var e = x() - 1;
            e <= 0
              ? document.body.removeAttribute(N)
              : document.body.setAttribute(N, e.toString());
          }
        );
      }, []);
    },
    O = function (e) {
      var t = e.noRelative,
        n = e.noImportant,
        r = e.gapMode,
        o = void 0 === r ? "margin" : r;
      M();
      var a = l.useMemo(
        function () {
          return k(o);
        },
        [o],
      );
      return l.createElement(A, { styles: R(a, !t, o, n ? "" : "!important") });
    },
    P = !1;
  if ("u" > typeof window)
    try {
      var I = Object.defineProperty({}, "passive", {
        get: function () {
          return ((P = !0), !0);
        },
      });
      (window.addEventListener("test", I, I),
        window.removeEventListener("test", I, I));
    } catch (e) {
      P = !1;
    }
  var L = !!P && { passive: !1 },
    _ = function (e, t) {
      if (!(e instanceof Element)) return !1;
      var n = window.getComputedStyle(e);
      return (
        "hidden" !== n[t] &&
        (n.overflowY !== n.overflowX ||
          "TEXTAREA" === e.tagName ||
          "visible" !== n[t])
      );
    },
    j = function (e, t) {
      var n = t.ownerDocument,
        r = t;
      do {
        if (
          ("u" > typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host),
          W(e, r))
        ) {
          var o = F(e, r);
          if (o[1] > o[2]) return !0;
        }
        r = r.parentNode;
      } while (r && r !== n.body);
      return !1;
    },
    W = function (e, t) {
      return "v" === e ? _(t, "overflowY") : _(t, "overflowX");
    },
    F = function (e, t) {
      return "v" === e
        ? [t.scrollTop, t.scrollHeight, t.clientHeight]
        : [t.scrollLeft, t.scrollWidth, t.clientWidth];
    },
    B = function (e, t, n, r, o) {
      var a,
        i =
          ((a = window.getComputedStyle(t).direction),
          "h" === e && "rtl" === a ? -1 : 1),
        c = i * r,
        u = n.target,
        l = t.contains(u),
        s = !1,
        f = c > 0,
        d = 0,
        p = 0;
      do {
        if (!u) break;
        var v = F(e, u),
          h = v[0],
          m = v[1] - v[2] - i * h;
        (h || m) && W(e, u) && ((d += m), (p += h));
        var y = u.parentNode;
        u = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
      } while (
        (!l && u !== document.body) ||
        (l && (t.contains(u) || t === u))
      );
      return (
        f && ((o && 1 > Math.abs(d)) || (!o && c > d))
          ? (s = !0)
          : !f && ((o && 1 > Math.abs(p)) || (!o && -c > p)) && (s = !0),
        s
      );
    },
    D = function (e) {
      return "changedTouches" in e
        ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
        : [0, 0];
    },
    K = function (e) {
      return [e.deltaX, e.deltaY];
    },
    X = function (e) {
      return e && "current" in e ? e.current : e;
    },
    Y = 0,
    U = [];
  let z =
    ((i = function (e) {
      var t = l.useRef([]),
        n = l.useRef([0, 0]),
        r = l.useRef(),
        o = l.useState(Y++)[0],
        a = l.useState(E)[0],
        i = l.useRef(e);
      (l.useEffect(
        function () {
          i.current = e;
        },
        [e],
      ),
        l.useEffect(
          function () {
            if (e.inert) {
              document.body.classList.add("block-interactivity-".concat(o));
              var t = (0, u.p)(
                [e.lockRef.current],
                (e.shards || []).map(X),
                !0,
              ).filter(Boolean);
              return (
                t.forEach(function (e) {
                  return e.classList.add("allow-interactivity-".concat(o));
                }),
                function () {
                  (document.body.classList.remove(
                    "block-interactivity-".concat(o),
                  ),
                    t.forEach(function (e) {
                      return e.classList.remove(
                        "allow-interactivity-".concat(o),
                      );
                    }));
                }
              );
            }
          },
          [e.inert, e.lockRef.current, e.shards],
        ));
      var c = l.useCallback(function (e, t) {
          if (
            ("touches" in e && 2 === e.touches.length) ||
            ("wheel" === e.type && e.ctrlKey)
          )
            return !i.current.allowPinchZoom;
          var o,
            a = D(e),
            c = n.current,
            u = "deltaX" in e ? e.deltaX : c[0] - a[0],
            l = "deltaY" in e ? e.deltaY : c[1] - a[1],
            s = e.target,
            f = Math.abs(u) > Math.abs(l) ? "h" : "v";
          if ("touches" in e && "h" === f && "range" === s.type) return !1;
          var d = window.getSelection(),
            p = d && d.anchorNode;
          if (p && (p === s || p.contains(s))) return !1;
          var v = j(f, s);
          if (!v) return !0;
          if ((v ? (o = f) : ((o = "v" === f ? "h" : "v"), (v = j(f, s))), !v))
            return !1;
          if (
            (!r.current && "changedTouches" in e && (u || l) && (r.current = o),
            !o)
          )
            return !0;
          var h = r.current || o;
          return B(h, t, e, "h" === h ? u : l, !0);
        }, []),
        s = l.useCallback(function (e) {
          if (U.length && U[U.length - 1] === a) {
            var n = "deltaY" in e ? K(e) : D(e),
              r = t.current.filter(function (t) {
                var r;
                return (
                  t.name === e.type &&
                  (t.target === e.target || e.target === t.shadowParent) &&
                  ((r = t.delta), r[0] === n[0] && r[1] === n[1])
                );
              })[0];
            if (r && r.should) {
              e.cancelable && e.preventDefault();
              return;
            }
            if (!r) {
              var o = (i.current.shards || [])
                .map(X)
                .filter(Boolean)
                .filter(function (t) {
                  return t.contains(e.target);
                });
              (o.length > 0 ? c(e, o[0]) : !i.current.noIsolation) &&
                e.cancelable &&
                e.preventDefault();
            }
          }
        }, []),
        f = l.useCallback(function (e, n, r, o) {
          var a = {
            name: e,
            delta: n,
            target: r,
            should: o,
            shadowParent: (function (e) {
              for (var t = null; null !== e; )
                (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
                  (e = e.parentNode));
              return t;
            })(r),
          };
          (t.current.push(a),
            setTimeout(function () {
              t.current = t.current.filter(function (e) {
                return e !== a;
              });
            }, 1));
        }, []),
        d = l.useCallback(function (e) {
          ((n.current = D(e)), (r.current = void 0));
        }, []),
        p = l.useCallback(function (t) {
          f(t.type, K(t), t.target, c(t, e.lockRef.current));
        }, []),
        v = l.useCallback(function (t) {
          f(t.type, D(t), t.target, c(t, e.lockRef.current));
        }, []);
      l.useEffect(function () {
        return (
          U.push(a),
          e.setCallbacks({
            onScrollCapture: p,
            onWheelCapture: p,
            onTouchMoveCapture: v,
          }),
          document.addEventListener("wheel", s, L),
          document.addEventListener("touchmove", s, L),
          document.addEventListener("touchstart", d, L),
          function () {
            ((U = U.filter(function (e) {
              return e !== a;
            })),
              document.removeEventListener("wheel", s, L),
              document.removeEventListener("touchmove", s, L),
              document.removeEventListener("touchstart", d, L));
          }
        );
      }, []);
      var h = e.removeScrollBar,
        m = e.inert;
      return l.createElement(
        l.Fragment,
        null,
        m
          ? l.createElement(a, {
              styles: "\n  .block-interactivity-"
                .concat(o, " {pointer-events: none;}\n  .allow-interactivity-")
                .concat(o, " {pointer-events: all;}\n"),
            })
          : null,
        h
          ? l.createElement(O, { noRelative: e.noRelative, gapMode: e.gapMode })
          : null,
      );
    }),
    h.useMedium(i),
    g);
  var Z = l.forwardRef(function (e, t) {
    return l.createElement(y, (0, u.u)({}, e, { ref: t, sideCar: z }));
  });
  ((Z.classNames = y.classNames), e.s(["f", 0, Z], 621790));
};
