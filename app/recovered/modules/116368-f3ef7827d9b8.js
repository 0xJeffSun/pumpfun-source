// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e = t.i(352386),
    r = t.i(7284),
    n = t.i(33082),
    i = t.i(462931),
    o = t.i(757158),
    s = t.i(180793),
    a = t.i(972947),
    u = t.i(661642),
    l = t.i(783615),
    c = t.i(509406),
    f = t.i(748213),
    h = t.i(467255),
    d = t.i(861468),
    p = t.i(756438),
    v = t.i(223025),
    y = t.i(871791),
    m = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"],
    g = ["key"];
  function b(t) {
    return (b =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function w(t, e) {
    if (null == t) return {};
    var r,
      n,
      i = (function (t, e) {
        if (null == t) return {};
        var r = {};
        for (var n in t)
          if (Object.prototype.hasOwnProperty.call(t, n)) {
            if (e.indexOf(n) >= 0) continue;
            r[n] = t[n];
          }
        return r;
      })(t, e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      for (n = 0; n < o.length; n++)
        ((r = o[n]),
          !(e.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(t, r) &&
            (i[r] = t[r]));
    }
    return i;
  }
  function E() {
    return (E = Object.assign.bind()).apply(this, arguments);
  }
  function x(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      (e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        r.push.apply(r, n));
    }
    return r;
  }
  function O(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? x(Object(r), !0).forEach(function (e) {
            D(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
          : x(Object(r)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(r, e),
              );
            });
    }
    return t;
  }
  function A(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      ((n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, k(n.key), n));
    }
  }
  function P() {
    try {
      var t = !Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {}),
      );
    } catch (t) {}
    return (P = function () {
      return !!t;
    })();
  }
  function N(t) {
    return (N = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function j(t, e) {
    return (j = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return ((t.__proto__ = e), t);
        })(t, e);
  }
  function D(t, e, r) {
    return (
      (e = k(e)) in t
        ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = r),
      t
    );
  }
  function k(t) {
    var e = (function (t, e) {
      if ("object" != b(t) || !t) return t;
      var r = t[Symbol.toPrimitive];
      if (void 0 !== r) {
        var n = r.call(t, e || "default");
        if ("object" != b(n)) return n;
        throw TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === e ? String : Number)(t);
    })(t, "string");
    return "symbol" == b(e) ? e : e + "";
  }
  var L = (function (t) {
    var c, d;
    function v() {
      var t, e, r;
      if (!(this instanceof v))
        throw TypeError("Cannot call a class as a function");
      for (var n = arguments.length, o = Array(n), s = 0; s < n; s++)
        o[s] = arguments[s];
      return (
        (e = v),
        (r = [].concat(o)),
        (e = N(e)),
        D(
          (t = (function (t, e) {
            if (e && ("object" === b(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw TypeError(
                "Derived constructors may only return object or undefined",
              );
            var r = t;
            if (void 0 === r)
              throw ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
              );
            return r;
          })(
            this,
            P()
              ? Reflect.construct(e, r || [], N(this).constructor)
              : e.apply(this, r),
          )),
          "state",
          { isAnimationFinished: !0 },
        ),
        D(t, "id", (0, p.C)("recharts-area-")),
        D(t, "handleAnimationEnd", function () {
          var e = t.props.onAnimationEnd;
          (t.setState({ isAnimationFinished: !0 }), (0, i.default)(e) && e());
        }),
        D(t, "handleAnimationStart", function () {
          var e = t.props.onAnimationStart;
          (t.setState({ isAnimationFinished: !1 }), (0, i.default)(e) && e());
        }),
        t
      );
    }
    if ("function" != typeof t && null !== t)
      throw TypeError("Super expression must either be null or a function");
    return (
      (v.prototype = Object.create(t && t.prototype, {
        constructor: { value: v, writable: !0, configurable: !0 },
      })),
      Object.defineProperty(v, "prototype", { writable: !1 }),
      t && j(v, t),
      (c = [
        {
          key: "renderDots",
          value: function (t, r, n) {
            var i = this.props.isAnimationActive,
              o = this.state.isAnimationFinished;
            if (i && !o) return null;
            var s = this.props,
              a = s.dot,
              u = s.points,
              l = s.dataKey,
              c = (0, y.T)(this.props, !1),
              h = (0, y.T)(a, !0),
              d = u.map(function (t, e) {
                var r = O(
                  O(O({ key: "dot-".concat(e), r: 3 }, c), h),
                  {},
                  {
                    index: e,
                    cx: t.x,
                    cy: t.y,
                    dataKey: l,
                    value: t.value,
                    payload: t.payload,
                    points: u,
                  },
                );
                return v.renderDotItem(a, r);
              }),
              p = {
                clipPath: t
                  ? "url(#clipPath-".concat(r ? "" : "dots-").concat(n, ")")
                  : null,
              };
            return e.default.createElement(
              f.f,
              E({ className: "recharts-area-dots" }, p),
              d,
            );
          },
        },
        {
          key: "renderHorizontalRect",
          value: function (t) {
            var r = this.props,
              n = r.baseLine,
              i = r.points,
              s = r.strokeWidth,
              a = i[0].x,
              u = i[i.length - 1].x,
              l = t * Math.abs(a - u),
              c = (0, o.default)(
                i.map(function (t) {
                  return t.y || 0;
                }),
              );
            return ((0, p.H)(n) && "number" == typeof n
              ? (c = Math.max(n, c))
              : n &&
                Array.isArray(n) &&
                n.length &&
                (c = Math.max(
                  (0, o.default)(
                    n.map(function (t) {
                      return t.y || 0;
                    }),
                  ),
                  c,
                )),
            (0, p.H)(c))
              ? e.default.createElement("rect", {
                  x: a < u ? a : a - l,
                  y: 0,
                  width: l,
                  height: Math.floor(c + (s ? parseInt("".concat(s), 10) : 1)),
                })
              : null;
          },
        },
        {
          key: "renderVerticalRect",
          value: function (t) {
            var r = this.props,
              n = r.baseLine,
              i = r.points,
              s = r.strokeWidth,
              a = i[0].y,
              u = i[i.length - 1].y,
              l = t * Math.abs(a - u),
              c = (0, o.default)(
                i.map(function (t) {
                  return t.x || 0;
                }),
              );
            return ((0, p.H)(n) && "number" == typeof n
              ? (c = Math.max(n, c))
              : n &&
                Array.isArray(n) &&
                n.length &&
                (c = Math.max(
                  (0, o.default)(
                    n.map(function (t) {
                      return t.x || 0;
                    }),
                  ),
                  c,
                )),
            (0, p.H)(c))
              ? e.default.createElement("rect", {
                  x: 0,
                  y: a < u ? a : a - l,
                  width: c + (s ? parseInt("".concat(s), 10) : 1),
                  height: Math.floor(l),
                })
              : null;
          },
        },
        {
          key: "renderClipRect",
          value: function (t) {
            return "vertical" === this.props.layout
              ? this.renderVerticalRect(t)
              : this.renderHorizontalRect(t);
          },
        },
        {
          key: "renderAreaStatically",
          value: function (t, r, n, i) {
            var o = this.props,
              s = o.layout,
              a = o.type,
              u = o.stroke,
              c = o.connectNulls,
              h = o.isRange,
              d = (o.ref, w(o, m));
            return e.default.createElement(
              f.f,
              { clipPath: n ? "url(#clipPath-".concat(i, ")") : null },
              e.default.createElement(
                l.f,
                E({}, (0, y.T)(d, !0), {
                  points: t,
                  connectNulls: c,
                  type: a,
                  baseLine: r,
                  layout: s,
                  stroke: "none",
                  className: "recharts-area-area",
                }),
              ),
              "none" !== u &&
                e.default.createElement(
                  l.f,
                  E({}, (0, y.T)(this.props, !1), {
                    className: "recharts-area-curve",
                    layout: s,
                    type: a,
                    connectNulls: c,
                    fill: "none",
                    points: t,
                  }),
                ),
              "none" !== u &&
                h &&
                e.default.createElement(
                  l.f,
                  E({}, (0, y.T)(this.props, !1), {
                    className: "recharts-area-curve",
                    layout: s,
                    type: a,
                    connectNulls: c,
                    fill: "none",
                    points: r,
                  }),
                ),
            );
          },
        },
        {
          key: "renderAreaWithAnimation",
          value: function (t, r) {
            var i = this,
              o = this.props,
              u = o.points,
              l = o.baseLine,
              c = o.isAnimationActive,
              h = o.animationBegin,
              d = o.animationDuration,
              v = o.animationEasing,
              y = o.animationId,
              m = this.state,
              g = m.prevPoints,
              b = m.prevBaseLine;
            return e.default.createElement(
              n.f,
              {
                begin: h,
                duration: d,
                isActive: c,
                easing: v,
                from: { t: 0 },
                to: { t: 1 },
                key: "area-".concat(y),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (n) {
                var o = n.t;
                if (g) {
                  var c,
                    h = g.length / u.length,
                    d = u.map(function (t, e) {
                      var r = Math.floor(e * h);
                      if (g[r]) {
                        var n = g[r],
                          i = (0, p.P)(n.x, t.x),
                          s = (0, p.P)(n.y, t.y);
                        return O(O({}, t), {}, { x: i(o), y: s(o) });
                      }
                      return t;
                    });
                  return (
                    (c =
                      (0, p.H)(l) && "number" == typeof l
                        ? (0, p.P)(b, l)(o)
                        : (0, s.default)(l) || (0, a.default)(l)
                          ? (0, p.P)(b, 0)(o)
                          : l.map(function (t, e) {
                              var r = Math.floor(e * h);
                              if (b[r]) {
                                var n = b[r],
                                  i = (0, p.P)(n.x, t.x),
                                  s = (0, p.P)(n.y, t.y);
                                return O(O({}, t), {}, { x: i(o), y: s(o) });
                              }
                              return t;
                            })),
                    i.renderAreaStatically(d, c, t, r)
                  );
                }
                return e.default.createElement(
                  f.f,
                  null,
                  e.default.createElement(
                    "defs",
                    null,
                    e.default.createElement(
                      "clipPath",
                      { id: "animationClipPath-".concat(r) },
                      i.renderClipRect(o),
                    ),
                  ),
                  e.default.createElement(
                    f.f,
                    { clipPath: "url(#animationClipPath-".concat(r, ")") },
                    i.renderAreaStatically(u, l, t, r),
                  ),
                );
              },
            );
          },
        },
        {
          key: "renderArea",
          value: function (t, e) {
            var r = this.props,
              n = r.points,
              i = r.baseLine,
              o = r.isAnimationActive,
              s = this.state,
              a = s.prevPoints,
              l = s.prevBaseLine,
              c = s.totalLength;
            return o &&
              n &&
              n.length &&
              ((!a && c > 0) || !(0, u.default)(a, n) || !(0, u.default)(l, i))
              ? this.renderAreaWithAnimation(t, e)
              : this.renderAreaStatically(n, i, t, e);
          },
        },
        {
          key: "render",
          value: function () {
            var t,
              n = this.props,
              i = n.hide,
              o = n.dot,
              a = n.points,
              u = n.className,
              l = n.top,
              c = n.left,
              d = n.xAxis,
              p = n.yAxis,
              v = n.width,
              m = n.height,
              g = n.isAnimationActive,
              b = n.id;
            if (i || !a || !a.length) return null;
            var w = this.state.isAnimationFinished,
              E = 1 === a.length,
              x = (0, r.U)("recharts-area", u),
              O = d && d.allowDataOverflow,
              A = p && p.allowDataOverflow,
              P = O || A,
              N = (0, s.default)(b) ? this.id : b,
              j = null != (t = (0, y.T)(o, !1)) ? t : { r: 3, strokeWidth: 2 },
              D = j.r,
              k = j.strokeWidth,
              L = ((0, y.b)(o) ? o : {}).clipDot,
              S = void 0 === L || L,
              M = 2 * (void 0 === D ? 3 : D) + (void 0 === k ? 2 : k);
            return e.default.createElement(
              f.f,
              { className: x },
              O || A
                ? e.default.createElement(
                    "defs",
                    null,
                    e.default.createElement(
                      "clipPath",
                      { id: "clipPath-".concat(N) },
                      e.default.createElement("rect", {
                        x: O ? c : c - v / 2,
                        y: A ? l : l - m / 2,
                        width: O ? v : 2 * v,
                        height: A ? m : 2 * m,
                      }),
                    ),
                    !S &&
                      e.default.createElement(
                        "clipPath",
                        { id: "clipPath-dots-".concat(N) },
                        e.default.createElement("rect", {
                          x: c - M / 2,
                          y: l - M / 2,
                          width: v + M,
                          height: m + M,
                        }),
                      ),
                  )
                : null,
              E ? null : this.renderArea(P, N),
              (o || E) && this.renderDots(P, S, N),
              (!g || w) && h.f.renderCallByParent(this.props, a),
            );
          },
        },
      ]),
      (d = [
        {
          key: "getDerivedStateFromProps",
          value: function (t, e) {
            return t.animationId !== e.prevAnimationId
              ? {
                  prevAnimationId: t.animationId,
                  curPoints: t.points,
                  curBaseLine: t.baseLine,
                  prevPoints: e.curPoints,
                  prevBaseLine: e.curBaseLine,
                }
              : t.points !== e.curPoints || t.baseLine !== e.curBaseLine
                ? { curPoints: t.points, curBaseLine: t.baseLine }
                : null;
          },
        },
      ]),
      c && A(v.prototype, c),
      d && A(v, d),
      Object.defineProperty(v, "prototype", { writable: !1 }),
      v
    );
  })(e.PureComponent);
  (D(L, "displayName", "Area"),
    D(L, "defaultProps", {
      stroke: "#3182bd",
      fill: "#3182bd",
      fillOpacity: 0.6,
      xAxisId: 0,
      yAxisId: 0,
      legendType: "line",
      connectNulls: !1,
      points: [],
      dot: !1,
      activeDot: !0,
      hide: !1,
      isAnimationActive: !d.f.isSsr,
      animationBegin: 0,
      animationDuration: 1500,
      animationEasing: "ease",
    }),
    D(L, "getBaseValue", function (t, e, r, n) {
      var i = t.layout,
        o = t.baseValue,
        s = e.props.baseValue,
        a = null != s ? s : o;
      if ((0, p.H)(a) && "number" == typeof a) return a;
      var u = "horizontal" === i ? n : r,
        l = u.scale.domain();
      if ("number" === u.type) {
        var c = Math.max(l[0], l[1]),
          f = Math.min(l[0], l[1]);
        return "dataMin" === a
          ? f
          : "dataMax" === a || c < 0
            ? c
            : Math.max(Math.min(l[0], l[1]), 0);
      }
      return "dataMin" === a ? l[0] : "dataMax" === a ? l[1] : l[0];
    }),
    D(L, "getComposedData", function (t) {
      var e,
        r = t.props,
        n = t.item,
        i = t.xAxis,
        o = t.yAxis,
        s = t.xAxisTicks,
        a = t.yAxisTicks,
        u = t.bandSize,
        l = t.dataKey,
        c = t.stackedData,
        f = t.dataStartIndex,
        h = t.displayedData,
        d = t.offset,
        p = r.layout,
        y = c && c.length,
        m = L.getBaseValue(r, n, i, o),
        g = "horizontal" === p,
        b = !1,
        w = h.map(function (t, e) {
          y
            ? (r = c[f + e])
            : Array.isArray((r = (0, v.K)(t, l)))
              ? (b = !0)
              : (r = [m, r]);
          var r,
            n = null == r[1] || (y && null == (0, v.K)(t, l));
          return g
            ? {
                x: (0, v.q)({
                  axis: i,
                  ticks: s,
                  bandSize: u,
                  entry: t,
                  index: e,
                }),
                y: n ? null : o.scale(r[1]),
                value: r,
                payload: t,
              }
            : {
                x: n ? null : i.scale(r[1]),
                y: (0, v.q)({
                  axis: o,
                  ticks: a,
                  bandSize: u,
                  entry: t,
                  index: e,
                }),
                value: r,
                payload: t,
              };
        });
      return (
        (e =
          y || b
            ? w.map(function (t) {
                var e = Array.isArray(t.value) ? t.value[0] : null;
                return g
                  ? { x: t.x, y: null != e && null != t.y ? o.scale(e) : null }
                  : { x: null != e ? i.scale(e) : null, y: t.y };
              })
            : g
              ? o.scale(m)
              : i.scale(m)),
        O({ points: w, baseLine: e, layout: p, isRange: b }, d)
      );
    }),
    D(L, "renderDotItem", function (t, n) {
      var o;
      if (e.default.isValidElement(t)) o = e.default.cloneElement(t, n);
      else if ((0, i.default)(t)) o = t(n);
      else {
        var s = (0, r.U)(
            "recharts-area-dot",
            "boolean" != typeof t ? t.className : "",
          ),
          a = n.key,
          u = w(n, g);
        o = e.default.createElement(c.f, E({}, u, { key: a, className: s }));
      }
      return o;
    }),
    t.s(["f", 0, L]));
};
