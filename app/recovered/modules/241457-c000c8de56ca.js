// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n,
    i,
    o,
    a = (t.exports = {});
  function s() {
    throw Error("setTimeout has not been defined");
  }
  function l() {
    throw Error("clearTimeout has not been defined");
  }
  try {
    n = "function" == typeof setTimeout ? setTimeout : s;
  } catch (e) {
    n = s;
  }
  try {
    i = "function" == typeof clearTimeout ? clearTimeout : l;
  } catch (e) {
    i = l;
  }
  function u(e) {
    if (n === setTimeout) return setTimeout(e, 0);
    if ((n === s || !n) && setTimeout)
      return ((n = setTimeout), setTimeout(e, 0));
    try {
      return n(e, 0);
    } catch (t) {
      try {
        return n.call(null, e, 0);
      } catch (t) {
        return n.call(this, e, 0);
      }
    }
  }
  var d = [],
    c = !1,
    f = -1;
  function h() {
    c &&
      o &&
      ((c = !1), o.length ? (d = o.concat(d)) : (f = -1), d.length && p());
  }
  function p() {
    if (!c) {
      var e = u(h);
      c = !0;
      for (var t = d.length; t; ) {
        for (o = d, d = []; ++f < t; ) o && o[f].run();
        ((f = -1), (t = d.length));
      }
      ((o = null),
        (c = !1),
        (function (e) {
          if (i === clearTimeout) return clearTimeout(e);
          if ((i === l || !i) && clearTimeout)
            return ((i = clearTimeout), clearTimeout(e));
          try {
            i(e);
          } catch (t) {
            try {
              return i.call(null, e);
            } catch (t) {
              return i.call(this, e);
            }
          }
        })(e));
    }
  }
  function g(e, t) {
    ((this.fun = e), (this.array = t));
  }
  function b() {}
  ((a.nextTick = function (e) {
    var t = Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    (d.push(new g(e, t)), 1 !== d.length || c || u(p));
  }),
    (g.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (a.title = "browser"),
    (a.browser = !0),
    (a.env = {}),
    (a.argv = []),
    (a.version = ""),
    (a.versions = {}),
    (a.on = b),
    (a.addListener = b),
    (a.once = b),
    (a.off = b),
    (a.removeListener = b),
    (a.removeAllListeners = b),
    (a.emit = b),
    (a.prependListener = b),
    (a.prependOnceListener = b),
    (a.listeners = function (e) {
      return [];
    }),
    (a.binding = function (e) {
      throw Error("process.binding is not supported");
    }),
    (a.cwd = function () {
      return "/";
    }),
    (a.chdir = function (e) {
      throw Error("process.chdir is not supported");
    }),
    (a.umask = function () {
      return 0;
    }));
};
