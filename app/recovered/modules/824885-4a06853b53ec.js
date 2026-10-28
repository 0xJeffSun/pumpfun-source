// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, r, e) => {
  var o = t.i(149502),
    n =
      Object.getOwnPropertyDescriptors ||
      function (t) {
        for (var r = Object.keys(t), e = {}, o = 0; o < r.length; o++)
          e[r[o]] = Object.getOwnPropertyDescriptor(t, r[o]);
        return e;
      },
    i = /%[sdj%]/g;
  ((e.format = function (t) {
    if (!m(t)) {
      for (var r = [], e = 0; e < arguments.length; e++)
        r.push(y(arguments[e]));
      return r.join(" ");
    }
    for (
      var e = 1,
        o = arguments,
        n = o.length,
        a = String(t).replace(i, function (t) {
          if ("%%" === t) return "%";
          if (e >= n) return t;
          switch (t) {
            case "%s":
              return String(o[e++]);
            case "%d":
              return Number(o[e++]);
            case "%j":
              try {
                return JSON.stringify(o[e++]);
              } catch (t) {
                return "[Circular]";
              }
            default:
              return t;
          }
        }),
        u = o[e];
      e < n;
      u = o[++e]
    )
      h(u) || !S(u) ? (a += " " + u) : (a += " " + y(u));
    return a;
  }),
    (e.deprecate = function (t, r) {
      if (void 0 !== o.default && !0 === o.default.noDeprecation) return t;
      if (void 0 === o.default)
        return function () {
          return e.deprecate(t, r).apply(this, arguments);
        };
      var n = !1;
      return function () {
        if (!n) {
          if (o.default.throwDeprecation) throw Error(r);
          (o.default.traceDeprecation ? console.trace(r) : console.error(r),
            (n = !0));
        }
        return t.apply(this, arguments);
      };
    }));
  var a = {},
    u = /^$/;
  if (o.default.env.NODE_DEBUG) {
    var p = o.default.env.NODE_DEBUG;
    u = RegExp(
      "^" +
        (p = p
          .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
          .replace(/\*/g, ".*")
          .replace(/,/g, "$|^")
          .toUpperCase()) +
        "$",
      "i",
    );
  }
  function y(t, r) {
    var o = { seen: [], stylize: f };
    return (
      arguments.length >= 3 && (o.depth = arguments[2]),
      arguments.length >= 4 && (o.colors = arguments[3]),
      v(r) ? (o.showHidden = r) : r && e._extend(o, r),
      A(o.showHidden) && (o.showHidden = !1),
      A(o.depth) && (o.depth = 2),
      A(o.colors) && (o.colors = !1),
      A(o.customInspect) && (o.customInspect = !0),
      o.colors && (o.stylize = c),
      l(o, t, o.depth)
    );
  }
  function c(t, r) {
    var e = y.styles[r];
    return e
      ? "\x1b[" + y.colors[e][0] + "m" + t + "\x1b[" + y.colors[e][1] + "m"
      : t;
  }
  function f(t, r) {
    return t;
  }
  function l(t, r, o) {
    if (
      t.customInspect &&
      r &&
      P(r.inspect) &&
      r.inspect !== e.inspect &&
      !(r.constructor && r.constructor.prototype === r)
    ) {
      var n,
        i,
        a,
        u,
        p,
        y,
        c = r.inspect(o, t);
      return (m(c) || (c = l(t, c, o)), c);
    }
    var f = (function (t, r) {
      if (A(r)) return t.stylize("undefined", "undefined");
      if (m(r)) {
        var e =
          "'" +
          JSON.stringify(r)
            .replace(/^"|"$/g, "")
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"') +
          "'";
        return t.stylize(e, "string");
      }
      return d(r)
        ? t.stylize("" + r, "number")
        : v(r)
          ? t.stylize("" + r, "boolean")
          : h(r)
            ? t.stylize("null", "null")
            : void 0;
    })(t, r);
    if (f) return f;
    var S = Object.keys(r),
      x =
        ((p = {}),
        S.forEach(function (t, r) {
          p[t] = !0;
        }),
        p);
    if (
      (t.showHidden && (S = Object.getOwnPropertyNames(r)),
      O(r) && (S.indexOf("message") >= 0 || S.indexOf("description") >= 0))
    )
      return s(r);
    if (0 === S.length) {
      if (P(r)) {
        var E = r.name ? ": " + r.name : "";
        return t.stylize("[Function" + E + "]", "special");
      }
      if (w(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
      if (j(r)) return t.stylize(Date.prototype.toString.call(r), "date");
      if (O(r)) return s(r);
    }
    var F = "",
      U = !1,
      B = ["{", "}"];
    if (
      (b(r) && ((U = !0), (B = ["[", "]"])),
      P(r) && (F = " [Function" + (r.name ? ": " + r.name : "") + "]"),
      w(r) && (F = " " + RegExp.prototype.toString.call(r)),
      j(r) && (F = " " + Date.prototype.toUTCString.call(r)),
      O(r) && (F = " " + s(r)),
      0 === S.length && (!U || 0 == r.length))
    )
      return B[0] + F + B[1];
    if (o < 0)
      if (w(r)) return t.stylize(RegExp.prototype.toString.call(r), "regexp");
      else return t.stylize("[Object]", "special");
    return (
      t.seen.push(r),
      (y = U
        ? (function (t, r, e, o, n) {
            for (var i = [], a = 0, u = r.length; a < u; ++a)
              I(r, String(a))
                ? i.push(g(t, r, e, o, String(a), !0))
                : i.push("");
            return (
              n.forEach(function (n) {
                n.match(/^\d+$/) || i.push(g(t, r, e, o, n, !0));
              }),
              i
            );
          })(t, r, o, x, S)
        : S.map(function (e) {
            return g(t, r, o, x, e, U);
          })),
      t.seen.pop(),
      (n = y),
      (i = F),
      (a = B),
      (u = 0),
      n.reduce(function (t, r) {
        return (
          u++,
          r.indexOf("\n") >= 0 && u++,
          t + r.replace(/\u001b\[\d\d?m/g, "").length + 1
        );
      }, 0) > 60
        ? a[0] +
          ("" === i ? "" : i + "\n ") +
          " " +
          n.join(",\n  ") +
          " " +
          a[1]
        : a[0] + i + " " + n.join(", ") + " " + a[1]
    );
  }
  function s(t) {
    return "[" + Error.prototype.toString.call(t) + "]";
  }
  function g(t, r, e, o, n, i) {
    var a, u, p;
    if (
      ((p = Object.getOwnPropertyDescriptor(r, n) || { value: r[n] }).get
        ? (u = p.set
            ? t.stylize("[Getter/Setter]", "special")
            : t.stylize("[Getter]", "special"))
        : p.set && (u = t.stylize("[Setter]", "special")),
      I(o, n) || (a = "[" + n + "]"),
      !u &&
        (0 > t.seen.indexOf(p.value)
          ? (u = h(e) ? l(t, p.value, null) : l(t, p.value, e - 1)).indexOf(
              "\n",
            ) > -1 &&
            (u = i
              ? u
                  .split("\n")
                  .map(function (t) {
                    return "  " + t;
                  })
                  .join("\n")
                  .slice(2)
              : "\n" +
                u
                  .split("\n")
                  .map(function (t) {
                    return "   " + t;
                  })
                  .join("\n"))
          : (u = t.stylize("[Circular]", "special"))),
      A(a))
    ) {
      if (i && n.match(/^\d+$/)) return u;
      (a = JSON.stringify("" + n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
        ? ((a = a.slice(1, -1)), (a = t.stylize(a, "name")))
        : ((a = a
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/(^"|"$)/g, "'")),
          (a = t.stylize(a, "string")));
    }
    return a + ": " + u;
  }
  function b(t) {
    return Array.isArray(t);
  }
  function v(t) {
    return "boolean" == typeof t;
  }
  function h(t) {
    return null === t;
  }
  function d(t) {
    return "number" == typeof t;
  }
  function m(t) {
    return "string" == typeof t;
  }
  function A(t) {
    return void 0 === t;
  }
  function w(t) {
    return S(t) && "[object RegExp]" === x(t);
  }
  function S(t) {
    return "object" == typeof t && null !== t;
  }
  function j(t) {
    return S(t) && "[object Date]" === x(t);
  }
  function O(t) {
    return S(t) && ("[object Error]" === x(t) || t instanceof Error);
  }
  function P(t) {
    return "function" == typeof t;
  }
  function x(t) {
    return Object.prototype.toString.call(t);
  }
  function E(t) {
    return t < 10 ? "0" + t.toString(10) : t.toString(10);
  }
  ((e.debuglog = function (t) {
    if (!a[(t = t.toUpperCase())])
      if (u.test(t)) {
        var r = o.default.pid;
        a[t] = function () {
          var o = e.format.apply(e, arguments);
          console.error("%s %d: %s", t, r, o);
        };
      } else a[t] = function () {};
    return a[t];
  }),
    (e.inspect = y),
    (y.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39],
    }),
    (y.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red",
    }),
    (e.types = t.r(600089)),
    (e.isArray = b),
    (e.isBoolean = v),
    (e.isNull = h),
    (e.isNullOrUndefined = function (t) {
      return null == t;
    }),
    (e.isNumber = d),
    (e.isString = m),
    (e.isSymbol = function (t) {
      return "symbol" == typeof t;
    }),
    (e.isUndefined = A),
    (e.isRegExp = w),
    (e.types.isRegExp = w),
    (e.isObject = S),
    (e.isDate = j),
    (e.types.isDate = j),
    (e.isError = O),
    (e.types.isNativeError = O),
    (e.isFunction = P),
    (e.isPrimitive = function (t) {
      return (
        null === t ||
        "boolean" == typeof t ||
        "number" == typeof t ||
        "string" == typeof t ||
        "symbol" == typeof t ||
        void 0 === t
      );
    }),
    (e.isBuffer = t.r(106023)));
  var F = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function I(t, r) {
    return Object.prototype.hasOwnProperty.call(t, r);
  }
  ((e.log = function () {
    var t, r;
    console.log(
      "%s - %s",
      ((r = [
        E((t = new Date()).getHours()),
        E(t.getMinutes()),
        E(t.getSeconds()),
      ].join(":")),
      [t.getDate(), F[t.getMonth()], r].join(" ")),
      e.format.apply(e, arguments),
    );
  }),
    (e.inherits = t.r(896812)),
    (e._extend = function (t, r) {
      if (!r || !S(r)) return t;
      for (var e = Object.keys(r), o = e.length; o--; ) t[e[o]] = r[e[o]];
      return t;
    }));
  var U = "u" > typeof Symbol ? Symbol("util.promisify.custom") : void 0;
  function B(t, r) {
    if (!t) {
      var e = Error("Promise was rejected with a falsy value");
      ((e.reason = t), (t = e));
    }
    return r(t);
  }
  ((e.promisify = function (t) {
    if ("function" != typeof t)
      throw TypeError('The "original" argument must be of type Function');
    if (U && t[U]) {
      var r = t[U];
      if ("function" != typeof r)
        throw TypeError(
          'The "util.promisify.custom" argument must be of type Function',
        );
      return (
        Object.defineProperty(r, U, {
          value: r,
          enumerable: !1,
          writable: !1,
          configurable: !0,
        }),
        r
      );
    }
    function r() {
      for (
        var r,
          e,
          o = new Promise(function (t, o) {
            ((r = t), (e = o));
          }),
          n = [],
          i = 0;
        i < arguments.length;
        i++
      )
        n.push(arguments[i]);
      n.push(function (t, o) {
        t ? e(t) : r(o);
      });
      try {
        t.apply(this, n);
      } catch (t) {
        e(t);
      }
      return o;
    }
    return (
      Object.setPrototypeOf(r, Object.getPrototypeOf(t)),
      U &&
        Object.defineProperty(r, U, {
          value: r,
          enumerable: !1,
          writable: !1,
          configurable: !0,
        }),
      Object.defineProperties(r, n(t))
    );
  }),
    (e.promisify.custom = U),
    (e.callbackify = function (t) {
      if ("function" != typeof t)
        throw TypeError('The "original" argument must be of type Function');
      function r() {
        for (var r = [], e = 0; e < arguments.length; e++) r.push(arguments[e]);
        var n = r.pop();
        if ("function" != typeof n)
          throw TypeError("The last argument must be of type Function");
        var i = this,
          a = function () {
            return n.apply(i, arguments);
          };
        t.apply(this, r).then(
          function (t) {
            o.default.nextTick(a.bind(null, null, t));
          },
          function (t) {
            o.default.nextTick(B.bind(null, t, a));
          },
        );
      }
      return (
        Object.setPrototypeOf(r, Object.getPrototypeOf(t)),
        Object.defineProperties(r, n(t)),
        r
      );
    }));
};
