// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    n,
    a,
    i,
    o = e.i(352386);
  function l(e, t) {
    var r = {};
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        0 > t.indexOf(n) &&
        (r[n] = e[n]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols)
      for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
        0 > t.indexOf(n[a]) &&
          Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
          (r[n[a]] = e[n[a]]);
    return r;
  }
  function u() {}
  function s(e) {
    return !!(e || "").match(/\d/);
  }
  function c(e) {
    return null == e;
  }
  function d(e) {
    return (
      c(e) ||
      ("number" == typeof e && isNaN(e)) ||
      ("number" == typeof e && !isFinite(e))
    );
  }
  function f(e) {
    return e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
  }
  function m(e, t) {
    void 0 === t && (t = !0);
    var r = "-" === e[0],
      n = r && t,
      a = (e = e.replace("-", "")).split(".");
    return {
      beforeDecimal: a[0],
      afterDecimal: a[1] || "",
      hasNegation: r,
      addNegation: n,
    };
  }
  function p(e, t, r) {
    for (var n = "", a = r ? "0" : "", i = 0; i <= t - 1; i++) n += e[i] || a;
    return n;
  }
  function h(e, t) {
    return Array(t + 1).join(e);
  }
  function b(e) {
    var t = e + "",
      r = "-" === t[0] ? "-" : "";
    r && (t = t.substring(1));
    var n = t.split(/[eE]/g),
      a = n[0],
      i = n[1];
    if (!(i = Number(i))) return r + a;
    a = a.replace(".", "");
    var o = 1 + i,
      l = a.length;
    return (
      o < 0
        ? (a = "0." + h("0", Math.abs(o)) + a)
        : o >= l
          ? (a += h("0", o - l))
          : (a = (a.substring(0, o) || "0") + "." + a.substring(o)),
      r + a
    );
  }
  function v(e, t, r) {
    if (-1 !== ["", "-"].indexOf(e)) return e;
    var n = (-1 !== e.indexOf(".") || r) && t,
      a = m(e),
      i = a.beforeDecimal,
      o = a.afterDecimal,
      l = a.hasNegation,
      u = parseFloat("0." + (o || "0")),
      s = (o.length <= t ? "0." + o : u.toFixed(t)).split("."),
      c = i;
    return (
      i &&
        Number(s[0]) &&
        (c = i
          .split("")
          .reverse()
          .reduce(function (e, t, r) {
            return e.length > r
              ? (Number(e[0]) + Number(t)).toString() + e.substring(1, e.length)
              : t + e;
          }, s[0])),
      (l ? "-" : "") + c + (n ? "." : "") + p(s[1] || "", t, r)
    );
  }
  function g(e, t) {
    if (((e.value = e.value), null !== e)) {
      if (e.createTextRange) {
        var r = e.createTextRange();
        return (r.move("character", t), r.select(), !0);
      }
      return e.selectionStart || 0 === e.selectionStart
        ? (e.focus(), e.setSelectionRange(t, t), !0)
        : (e.focus(), !1);
    }
  }
  (((t = i || (i = {})).event = "event"), (t.props = "prop"));
  var y =
      ((r = function (e, t) {
        for (
          var r = 0, n = 0, a = e.length, i = t.length;
          e[r] === t[r] && r < a;

        )
          r++;
        for (; e[a - 1 - n] === t[i - 1 - n] && i - n > r && a - n > r; ) n++;
        return { from: { start: r, end: a - n }, to: { start: r, end: i - n } };
      }),
      (a = void 0),
      function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        return n &&
          e.length === n.length &&
          e.every(function (e, t) {
            return e === n[t];
          })
          ? a
          : ((n = e), (a = r.apply(void 0, e)));
      }),
    x = function (e, t) {
      var r = Math.min(e.selectionStart, t);
      return {
        from: { start: r, end: e.selectionEnd },
        to: { start: r, end: t },
      };
    };
  function w(e) {
    return Math.max(e.selectionStart, e.selectionEnd);
  }
  function S(e) {
    var t = e.currentValue,
      r = e.formattedValue,
      n = e.currentValueIndex,
      a = e.formattedValueIndex;
    return t[n] === r[a];
  }
  function N(e, t, r, n) {
    var a = e.length;
    if (((t = Math.min(Math.max(t, 0), a)), "left" === n)) {
      for (; t >= 0 && !r[t]; ) t--;
      -1 === t && (t = r.indexOf(!0));
    } else {
      for (; t <= a && !r[t]; ) t++;
      t > a && (t = r.lastIndexOf(!0));
    }
    return (-1 === t && (t = a), t);
  }
  function P(e) {
    for (
      var t = Array.from({ length: e.length + 1 }).map(function () {
          return !0;
        }),
        r = 0,
        n = t.length;
      r < n;
      r++
    )
      t[r] = !!(s(e[r]) || s(e[r - 1]));
    return t;
  }
  function M(e, t, r, n, a, i) {
    void 0 === i && (i = u);
    var l,
      s,
      f =
        ((l = function (e, t) {
          var r, i;
          return (
            d(e)
              ? ((i = ""), (r = ""))
              : (r =
                  "number" == typeof e || t
                    ? n((i = "number" == typeof e ? b(e) : e))
                    : n((i = a(e, void 0)))),
            { formattedValue: r, numAsString: i }
          );
        }),
        ((s = (0, o.useRef)(l)).current = l),
        (0, o.useRef)(function () {
          for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
          return s.current.apply(s, e);
        }).current),
      m = (0, o.useState)(function () {
        return f(c(e) ? t : e, r);
      }),
      p = m[0],
      h = m[1],
      v = e,
      g = r;
    c(e) && ((v = p.numAsString), (g = !0));
    var y = f(v, g);
    return (
      (0, o.useMemo)(
        function () {
          h(y);
        },
        [y.formattedValue],
      ),
      [
        p,
        function (e, t) {
          (e.formattedValue !== p.formattedValue &&
            h({ formattedValue: e.formattedValue, numAsString: e.value }),
            i(e, t));
        },
      ]
    );
  }
  function j(e) {
    return e.replace(/[^0-9]/g, "");
  }
  function A(e) {
    return e;
  }
  function k(e) {
    var t = e.type;
    void 0 === t && (t = "text");
    var r = e.displayType;
    void 0 === r && (r = "input");
    var n = e.customInput,
      a = e.renderText,
      c = e.getInputRef,
      d = e.format;
    void 0 === d && (d = A);
    var f = e.removeFormatting;
    void 0 === f && (f = j);
    var m = e.defaultValue,
      p = e.valueIsNumericString,
      h = e.onValueChange,
      b = e.isAllowed,
      v = e.onChange;
    void 0 === v && (v = u);
    var k = e.onKeyDown;
    void 0 === k && (k = u);
    var _ = e.onMouseUp;
    void 0 === _ && (_ = u);
    var O = e.onFocus;
    void 0 === O && (O = u);
    var C = e.onBlur;
    void 0 === C && (C = u);
    var E = e.value,
      V = e.getCaretBoundary;
    void 0 === V && (V = P);
    var L = e.isValidInputCharacter;
    void 0 === L && (L = s);
    var U = e.isCharacterSame,
      D = l(e, [
        "type",
        "displayType",
        "customInput",
        "renderText",
        "getInputRef",
        "format",
        "removeFormatting",
        "defaultValue",
        "valueIsNumericString",
        "onValueChange",
        "isAllowed",
        "onChange",
        "onKeyDown",
        "onMouseUp",
        "onFocus",
        "onBlur",
        "value",
        "getCaretBoundary",
        "isValidInputCharacter",
        "isCharacterSame",
      ]),
      I = M(E, m, !!p, d, f, h),
      T = I[0],
      F = T.formattedValue,
      B = T.numAsString,
      $ = I[1],
      R = (0, o.useRef)(),
      K = (0, o.useRef)({ formattedValue: F, numAsString: B }),
      q = function (e, t) {
        ((K.current = {
          formattedValue: e.formattedValue,
          numAsString: e.value,
        }),
          $(e, t));
      },
      W = (0, o.useState)(!1),
      z = W[0],
      Q = W[1],
      J = (0, o.useRef)(null),
      Z = (0, o.useRef)({ setCaretTimeout: null, focusTimeout: null });
    (0, o.useEffect)(function () {
      return (
        Q(!0),
        function () {
          (clearTimeout(Z.current.setCaretTimeout),
            clearTimeout(Z.current.focusTimeout));
        }
      );
    }, []);
    var G = d,
      H = function (e, t) {
        var r = parseFloat(t);
        return {
          formattedValue: e,
          value: t,
          floatValue: isNaN(r) ? void 0 : r,
        };
      },
      Y = function (e, t, r) {
        (0 !== e.selectionStart || e.selectionEnd !== e.value.length) &&
          (g(e, t),
          (Z.current.setCaretTimeout = setTimeout(function () {
            e.value === r && e.selectionStart !== t && g(e, t);
          }, 0)));
      },
      X = function (e, t, r) {
        return N(e, t, V(e), r);
      },
      ee = function (e, t, r) {
        var n = V(t),
          a = (function (e, t, r, n, a, i, o) {
            void 0 === o && (o = S);
            var l = a.findIndex(function (e) {
                return e;
              }),
              u = e.slice(0, l);
            t || r.startsWith(u) || ((t = u), (r = u + r), (n += u.length));
            for (
              var s = r.length, c = e.length, d = {}, f = Array(s), m = 0;
              m < s;
              m++
            ) {
              f[m] = -1;
              for (var p = 0; p < c; p++)
                if (
                  o({
                    currentValue: r,
                    lastValue: t,
                    formattedValue: e,
                    currentValueIndex: m,
                    formattedValueIndex: p,
                  }) &&
                  !0 !== d[p]
                ) {
                  ((f[m] = p), (d[p] = !0));
                  break;
                }
            }
            for (var h = n; h < s && (-1 === f[h] || !i(r[h])); ) h++;
            var b = h === s || -1 === f[h] ? c : f[h];
            for (h = n - 1; h > 0 && -1 === f[h]; ) h--;
            var v = -1 === h || -1 === f[h] ? 0 : f[h] + 1;
            return v > b ? b : n - v < b - n ? v : b;
          })(t, F, e, r, n, L, U);
        return N(t, a, n);
      },
      et = function (e) {
        var t,
          r = e.formattedValue;
        void 0 === r && (r = "");
        var n = e.input,
          a = e.source,
          i = e.event,
          o = e.numAsString;
        if (n) {
          var l = e.inputValue || n.value,
            u = w(n);
          ((n.value = r), void 0 !== (t = ee(l, r, u)) && Y(n, t, r));
        }
        r !== F && q(H(r, o), { event: i, source: a });
      };
    (0, o.useEffect)(
      function () {
        var e = K.current,
          t = e.formattedValue,
          r = e.numAsString;
        (F !== t || B !== r) && q(H(F, B), { event: void 0, source: i.props });
      },
      [F, B],
    );
    var er = J.current ? w(J.current) : void 0;
    ("u" > typeof window ? o.useLayoutEffect : o.useEffect)(
      function () {
        var e = J.current;
        if (F !== K.current.formattedValue && e) {
          var t = ee(K.current.formattedValue, F, er);
          ((e.value = F), Y(e, t, F));
        }
      },
      [F],
    );
    var en = function (e, t, r) {
        var n = t.target,
          a = Object.assign(
            Object.assign(
              {},
              R.current ? x(R.current, n.selectionEnd) : y(F, e),
            ),
            { lastValue: F },
          ),
          i = f(e, a),
          o = G(i);
        if (((i = f(o, void 0)), b && !b(H(o, i)))) {
          var l = t.target,
            u = ee(e, F, w(l));
          return ((l.value = F), Y(l, u, F), !1);
        }
        return (
          et({
            formattedValue: o,
            numAsString: i,
            inputValue: e,
            event: t,
            source: r,
            input: t.target,
          }),
          !0
        );
      },
      ea = function (e, t) {
        (void 0 === t && (t = 0),
          (R.current = {
            selectionStart: e.selectionStart,
            selectionEnd: e.selectionEnd + t,
          }));
      },
      ei = Object.assign(
        {
          inputMode:
            z &&
            "u" > typeof navigator &&
            !(navigator.platform && /iPhone|iPod/.test(navigator.platform))
              ? "numeric"
              : void 0,
        },
        D,
        {
          type: t,
          value: F,
          onChange: function (e) {
            (en(e.target.value, e, i.event) && v(e), (R.current = void 0));
          },
          onKeyDown: function (e) {
            var t,
              r = e.target,
              n = e.key,
              a = r.selectionStart,
              i = r.selectionEnd,
              o = r.value;
            (void 0 === o && (o = ""),
              "ArrowLeft" === n || "Backspace" === n
                ? (t = Math.max(a - 1, 0))
                : "ArrowRight" === n
                  ? (t = Math.min(a + 1, o.length))
                  : "Delete" === n && (t = a));
            var l = 0;
            "Delete" === n && a === i && (l = 1);
            var u = "ArrowLeft" === n || "ArrowRight" === n;
            if (void 0 === t || (a !== i && !u)) {
              (k(e), ea(r, l));
              return;
            }
            var s = t;
            (u
              ? (s = X(o, t, "ArrowLeft" === n ? "left" : "right")) !== t &&
                e.preventDefault()
              : "Delete" !== n || L(o[t])
                ? "Backspace" !== n || L(o[t]) || (s = X(o, t, "left"))
                : (s = X(o, t, "right")),
              s !== t && Y(r, s, o),
              k(e),
              ea(r, l));
          },
          onMouseUp: function (e) {
            var t = e.target,
              r = function () {
                var e = t.selectionStart,
                  r = t.selectionEnd,
                  n = t.value;
                if ((void 0 === n && (n = ""), e === r)) {
                  var a = X(n, e);
                  a !== e && Y(t, a, n);
                }
              };
            (r(),
              requestAnimationFrame(function () {
                r();
              }),
              _(e),
              ea(t));
          },
          onFocus: function (e) {
            e.persist && e.persist();
            var t = e.target,
              r = e.currentTarget;
            ((J.current = t),
              (Z.current.focusTimeout = setTimeout(function () {
                var n = t.selectionStart,
                  a = t.selectionEnd,
                  i = t.value;
                void 0 === i && (i = "");
                var o = X(i, n);
                (o !== n && (0 !== n || a !== i.length) && Y(t, o, i),
                  O(Object.assign(Object.assign({}, e), { currentTarget: r })));
              }, 0)));
          },
          onBlur: function (e) {
            ((J.current = null),
              clearTimeout(Z.current.focusTimeout),
              clearTimeout(Z.current.setCaretTimeout),
              C(e));
          },
        },
      );
    return "text" === r
      ? a
        ? o.default.createElement(o.default.Fragment, null, a(F, D) || null)
        : o.default.createElement("span", Object.assign({}, D, { ref: c }), F)
      : n
        ? o.default.createElement(n, Object.assign({}, ei, { ref: c }))
        : o.default.createElement("input", Object.assign({}, ei, { ref: c }));
  }
  function _(e, t) {
    var r,
      n,
      a,
      i = t.decimalScale,
      o = t.fixedDecimalScale,
      l = t.prefix;
    void 0 === l && (l = "");
    var u = t.suffix;
    void 0 === u && (u = "");
    var s = t.allowNegative,
      c = t.thousandsGroupStyle;
    if ((void 0 === c && (c = "thousand"), "" === e || "-" === e)) return e;
    var d = O(t),
      f = d.thousandSeparator,
      h = d.decimalSeparator,
      b = (0 !== i && -1 !== e.indexOf(".")) || (i && o),
      v = m(e, s),
      g = v.beforeDecimal,
      y = v.afterDecimal,
      x = v.addNegation;
    return (
      void 0 !== i && (y = p(y, i, !!o)),
      f &&
        ((r = g),
        (n = (function (e) {
          switch (e) {
            case "lakh":
              return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
            case "wan":
              return /(\d)(?=(\d{4})+(?!\d))/g;
            default:
              return /(\d)(?=(\d{3})+(?!\d))/g;
          }
        })(c)),
        (a = -1 === (a = r.search(/[1-9]/)) ? r.length : a),
        (g =
          r.substring(0, a) + r.substring(a, r.length).replace(n, "$1" + f))),
      l && (g = l + g),
      u && (y += u),
      x && (g = "-" + g),
      (e = g + ((b && h) || "") + y)
    );
  }
  function O(e) {
    var t = e.decimalSeparator;
    void 0 === t && (t = ".");
    var r = e.thousandSeparator,
      n = e.allowedDecimalSeparators;
    return (
      !0 === r && (r = ","),
      n || (n = [t, "."]),
      { decimalSeparator: t, thousandSeparator: r, allowedDecimalSeparators: n }
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      var t,
        r,
        n,
        a,
        p,
        h,
        x,
        w,
        S,
        N,
        P,
        j,
        A,
        C,
        E,
        V,
        L,
        U,
        D,
        I,
        T,
        F,
        B,
        $,
        R,
        K,
        q,
        W,
        z,
        Q =
          ((t = (function (e) {
            var t = O(e),
              r = t.thousandSeparator,
              n = t.decimalSeparator,
              a = e.prefix;
            void 0 === a && (a = "");
            var i = e.allowNegative;
            if ((void 0 === i && (i = !0), r === n))
              throw Error(
                "\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " +
                  r +
                  ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: ' +
                  n +
                  " (default value for decimalSeparator is .)\n     ",
              );
            return (
              a.startsWith("-") &&
                i &&
                (console.error(
                  "\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " +
                    a +
                    "\n      allowNegative: " +
                    i +
                    "\n    ",
                ),
                (i = !1)),
              Object.assign(Object.assign({}, e), { allowNegative: i })
            );
          })((t = e))).decimalSeparator,
          t.allowedDecimalSeparators,
          t.thousandsGroupStyle,
          (r = t.suffix),
          (n = t.allowNegative),
          (a = t.allowLeadingZeros),
          void 0 === (p = t.onKeyDown) && (p = u),
          void 0 === (h = t.onBlur) && (h = u),
          (x = t.thousandSeparator),
          (w = t.decimalScale),
          (S = t.fixedDecimalScale),
          void 0 === (N = t.prefix) && (N = ""),
          (P = t.defaultValue),
          (j = t.value),
          (A = t.valueIsNumericString),
          (C = t.onValueChange),
          (E = l(t, [
            "decimalSeparator",
            "allowedDecimalSeparators",
            "thousandsGroupStyle",
            "suffix",
            "allowNegative",
            "allowLeadingZeros",
            "onKeyDown",
            "onBlur",
            "thousandSeparator",
            "decimalScale",
            "fixedDecimalScale",
            "prefix",
            "defaultValue",
            "value",
            "valueIsNumericString",
            "onValueChange",
          ])),
          (L = (V = O(t)).decimalSeparator),
          (U = V.allowedDecimalSeparators),
          (D = function (e) {
            return _(e, t);
          }),
          (I = function (e, r) {
            return (function (e, t, r) {
              void 0 === t &&
                (t = {
                  from: { start: 0, end: 0 },
                  to: { start: 0, end: e.length },
                  lastValue: "",
                });
              var n,
                a,
                i,
                o,
                l = r.allowNegative,
                u = r.prefix;
              void 0 === u && (u = "");
              var c = r.suffix;
              void 0 === c && (c = "");
              var d = r.decimalScale,
                p = t.from,
                h = t.to,
                b = h.start,
                v = h.end,
                g = O(r),
                y = g.allowedDecimalSeparators,
                x = g.decimalSeparator,
                w = e[v] === x;
              if (s(e) && (e === u || e === c) && "" === t.lastValue) return e;
              if (v - b == 1 && -1 !== y.indexOf(e[b])) {
                var S = 0 === d ? "" : x;
                e = e.substring(0, b) + S + e.substring(b + 1, e.length);
              }
              var N = function (e, t, r) {
                  var n = !1,
                    a = !1;
                  u.startsWith("-")
                    ? (n = !1)
                    : e.startsWith("--")
                      ? ((n = !1), (a = !0))
                      : c.startsWith("-") && e.length === c.length
                        ? (n = !1)
                        : "-" === e[0] && (n = !0);
                  var i = +!!n;
                  return (
                    a && (i = 2),
                    i && ((e = e.substring(i)), (t -= i), (r -= i)),
                    { value: e, start: t, end: r, hasNegation: n }
                  );
                },
                P = N(e, b, v),
                M = P.hasNegation;
              ((e = P.value), (b = P.start), (v = P.end));
              var j = N(t.lastValue, p.start, p.end),
                A = j.start,
                k = j.end,
                _ = j.value,
                C = e.substring(b, v);
              e.length &&
                _.length &&
                (A > _.length - c.length || k < u.length) &&
                !(C && c.startsWith(C)) &&
                (e = _);
              var E = 0;
              (e.startsWith(u) ? (E += u.length) : b < u.length && (E = b),
                (e = e.substring(E)),
                (v -= E));
              var V = e.length,
                L = e.length - c.length;
              (e.endsWith(c)
                ? (V = L)
                : v > L
                  ? (V = v)
                  : v > e.length - c.length && (V = v),
                (e = e.substring(0, V)),
                void 0 === (n = M ? "-" + e : e) && (n = ""),
                (a = RegExp("(-)(.)*(-)")),
                (i = /(-)/.test(n)),
                (o = a.test(n)),
                (n = n.replace(/-/g, "")),
                i && !o && l && (n = "-" + n));
              var U = (e = (
                  (e = n).match(RegExp("(^-)|[0-9]|" + f(x), "g")) || []
                ).join("")).indexOf(x),
                D = m(
                  (e = e.replace(RegExp(f(x), "g"), function (e, t) {
                    return t === U ? "." : "";
                  })),
                  l,
                ),
                I = D.beforeDecimal,
                T = D.afterDecimal,
                F = D.addNegation;
              return (
                h.end - h.start < p.end - p.start &&
                  "" === I &&
                  w &&
                  !parseFloat(T) &&
                  (e = F ? "-" : ""),
                e
              );
            })(e, r, t);
          }),
          (T = c(j) ? P : j),
          (B =
            null != A
              ? A
              : ((F = N),
                "" === T ||
                  (!(null == F ? void 0 : F.match(/\d/)) &&
                    !(null == r ? void 0 : r.match(/\d/)) &&
                    "string" == typeof T &&
                    !isNaN(Number(T))))),
          c(j)
            ? c(P) || (B = B || "number" == typeof P)
            : (B = B || "number" == typeof j),
          (q = (K = (R = M(
            ($ = function (e) {
              return d(e)
                ? e
                : ("number" == typeof e && (e = b(e)),
                    B && "number" == typeof w)
                  ? v(e, w, !!S)
                  : e;
            })(j),
            $(P),
            !!B,
            D,
            I,
            C,
          ))[0]).numAsString),
          (W = K.formattedValue),
          (z = R[1]),
          Object.assign(Object.assign({}, E), {
            value: W,
            valueIsNumericString: !1,
            isValidInputCharacter: function (e) {
              return e === L || s(e);
            },
            isCharacterSame: function (e) {
              var t = e.currentValue,
                r = e.lastValue,
                n = e.formattedValue,
                a = e.currentValueIndex,
                i = e.formattedValueIndex,
                o = t[a],
                l = n[i],
                u = y(r, t).to,
                s = function (e) {
                  return I(e).indexOf(".") + N.length;
                };
              return (
                !(
                  0 === j &&
                  S &&
                  w &&
                  t[u.start] === L &&
                  s(t) < a &&
                  s(n) > i
                ) &&
                ((!!(a >= u.start && a < u.end && U && U.includes(o)) &&
                  l === L) ||
                  o === l)
              );
            },
            onValueChange: z,
            format: D,
            removeFormatting: I,
            getCaretBoundary: function (e) {
              var r, n, a, i, o, l;
              return (
                void 0 === (n = (r = t).prefix) && (n = ""),
                void 0 === (a = r.suffix) && (a = ""),
                (i = Array.from({ length: e.length + 1 }).map(function () {
                  return !0;
                })),
                (o = "-" === e[0]),
                i.fill(!1, 0, n.length + +!!o),
                (l = e.length),
                i.fill(!1, l - a.length + 1, l + 1),
                i
              );
            },
            onKeyDown: function (e) {
              var t = e.target,
                r = e.key,
                a = t.selectionStart,
                i = t.selectionEnd,
                o = t.value;
              if (
                (void 0 === o && (o = ""),
                ("Backspace" === r || "Delete" === r) && i < N.length)
              )
                return void e.preventDefault();
              if (a !== i) return void p(e);
              ("Backspace" === r &&
                "-" === o[0] &&
                a === N.length + 1 &&
                n &&
                g(t, 1),
                w &&
                  S &&
                  ("Backspace" === r && o[a - 1] === L
                    ? (g(t, a - 1), e.preventDefault())
                    : "Delete" === r && o[a] === L && e.preventDefault()),
                (null == U ? void 0 : U.includes(r)) &&
                  o[a] === L &&
                  g(t, a + 1));
              var l = !0 === x ? "," : x;
              ("Backspace" === r && o[a - 1] === l && g(t, a - 1),
                "Delete" === r && o[a] === l && g(t, a + 1),
                p(e));
            },
            onBlur: function (e) {
              var r = q;
              (r.match(/\d/g) || (r = ""),
                a ||
                  (r = (function (e) {
                    if (!e) return e;
                    var t = "-" === e[0];
                    t && (e = e.substring(1, e.length));
                    var r = e.split("."),
                      n = r[0].replace(/^0+/, "") || "0",
                      a = r[1] || "";
                    return (t ? "-" : "") + n + (a ? "." + a : "");
                  })(r)),
                S && w && (r = v(r, w, S)),
                r !== q &&
                  z(
                    {
                      formattedValue: _(r, t),
                      value: r,
                      floatValue: parseFloat(r),
                    },
                    { event: e, source: i.event },
                  ),
                h(e));
            },
          }));
      return o.default.createElement(k, Object.assign({}, Q));
    },
  ]);
};
