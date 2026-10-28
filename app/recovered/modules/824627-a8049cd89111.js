// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = function (e, n) {
      return (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        })(e, n);
    },
    n = function () {
      return (n =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var o in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }).apply(this, arguments);
    };
  function r(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      r = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && r >= e.length && (e = void 0),
            { value: e && e[r++], done: !e }
          );
        },
      };
    throw TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined.",
    );
  }
  function o(e) {
    return this instanceof o ? ((this.v = e), this) : new o(e);
  }
  ("function" == typeof SuppressedError && SuppressedError,
    e.s([
      "u",
      () => n,
      "Q",
      0,
      function (e, t, n) {
        if (!Symbol.asyncIterator)
          throw TypeError("Symbol.asyncIterator is not defined.");
        var r,
          a = n.apply(e, t || []),
          i = [];
        return (
          (r = Object.create(
            ("function" == typeof AsyncIterator ? AsyncIterator : Object)
              .prototype,
          )),
          c("next"),
          c("throw"),
          c("return", function (e) {
            return function (t) {
              return Promise.resolve(t).then(e, s);
            };
          }),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function c(e, t) {
          a[e] &&
            ((r[e] = function (t) {
              return new Promise(function (n, r) {
                i.push([e, t, n, r]) > 1 || u(e, t);
              });
            }),
            t && (r[e] = t(r[e])));
        }
        function u(e, t) {
          try {
            var n;
            (n = a[e](t)).value instanceof o
              ? Promise.resolve(n.value.v).then(l, s)
              : f(i[0][2], n);
          } catch (e) {
            f(i[0][3], e);
          }
        }
        function l(e) {
          u("next", e);
        }
        function s(e) {
          u("throw", e);
        }
        function f(e, t) {
          (e(t), i.shift(), i.length && u(i[0][0], i[0][1]));
        }
      },
      "I",
      0,
      function (e) {
        if (!Symbol.asyncIterator)
          throw TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = r(e)),
            (t = {}),
            o("next"),
            o("throw"),
            o("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function o(n) {
          t[n] =
            e[n] &&
            function (t) {
              return new Promise(function (r, o) {
                var a, i, c;
                ((a = r),
                  (i = o),
                  (c = (t = e[n](t)).done),
                  Promise.resolve(t.value).then(function (e) {
                    a({ value: e, done: c });
                  }, i));
              });
            };
        }
      },
      "Z",
      0,
      o,
      "W",
      0,
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (o, a) {
          function i(e) {
            try {
              u(r.next(e));
            } catch (e) {
              a(e);
            }
          }
          function c(e) {
            try {
              u(r.throw(e));
            } catch (e) {
              a(e);
            }
          }
          function u(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value) instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })
                ).then(i, c);
          }
          u((r = r.apply(e, t || [])).next());
        });
      },
      "w",
      0,
      function (e, n) {
        if ("function" != typeof n && null !== n)
          throw TypeError(
            "Class extends value " +
              String(n) +
              " is not a constructor or null",
          );
        function r() {
          this.constructor = e;
        }
        (t(e, n),
          (e.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r())));
      },
      "t",
      0,
      function (e, t) {
        var n,
          r,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          },
          i = Object.create(
            ("function" == typeof Iterator ? Iterator : Object).prototype,
          );
        return (
          (i.next = c(0)),
          (i.throw = c(1)),
          (i.return = c(2)),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function c(c) {
          return function (u) {
            var l = [c, u];
            if (n) throw TypeError("Generator is already executing.");
            for (; i && ((i = 0), l[0] && (a = 0)), a; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (o =
                      2 & l[0]
                        ? r.return
                        : l[0]
                          ? r.throw || ((o = r.return) && o.call(r), 0)
                          : r.next) &&
                    !(o = o.call(r, l[1])).done)
                )
                  return o;
                switch (((r = 0), o && (l = [2 & l[0], o.value]), l[0])) {
                  case 0:
                  case 1:
                    o = l;
                    break;
                  case 4:
                    return (a.label++, { value: l[1], done: !1 });
                  case 5:
                    (a.label++, (r = l[1]), (l = [0]));
                    continue;
                  case 7:
                    ((l = a.ops.pop()), a.trys.pop());
                    continue;
                  default:
                    if (
                      !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                      (6 === l[0] || 2 === l[0])
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === l[0] && (!o || (l[1] > o[0] && l[1] < o[3]))) {
                      a.label = l[1];
                      break;
                    }
                    if (6 === l[0] && a.label < o[1]) {
                      ((a.label = o[1]), (o = l));
                      break;
                    }
                    if (o && a.label < o[2]) {
                      ((a.label = o[2]), a.ops.push(l));
                      break;
                    }
                    (o[2] && a.ops.pop(), a.trys.pop());
                    continue;
                }
                l = t.call(e, a);
              } catch (e) {
                ((l = [6, e]), (r = 0));
              } finally {
                n = o = 0;
              }
            if (5 & l[0]) throw l[1];
            return { value: l[0] ? l[1] : void 0, done: !0 };
          };
        }
      },
      "J",
      0,
      function (e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          o,
          a = n.call(e),
          i = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = a.next()).done; )
            i.push(r.value);
        } catch (e) {
          o = { error: e };
        } finally {
          try {
            r && !r.done && (n = a.return) && n.call(a);
          } finally {
            if (o) throw o.error;
          }
        }
        return i;
      },
      "z",
      0,
      function (e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            0 > t.indexOf(r) &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var o = 0, r = Object.getOwnPropertySymbols(e);
            o < r.length;
            o++
          )
            0 > t.indexOf(r[o]) &&
              Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
              (n[r[o]] = e[r[o]]);
        return n;
      },
      "p",
      0,
      function (e, t, n) {
        if (n || 2 == arguments.length)
          for (var r, o = 0, a = t.length; o < a; o++)
            (!r && o in t) ||
              (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
        return e.concat(r || Array.prototype.slice.call(t));
      },
      "_",
      0,
      r,
    ]));
};
