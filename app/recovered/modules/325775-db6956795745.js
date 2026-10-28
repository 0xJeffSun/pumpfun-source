// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  function r(e, n) {
    var t = e.length;
    for (e.push(n); 0 < t; ) {
      var r = (t - 1) >>> 1,
        l = e[r];
      if (0 < o(l, n)) ((e[r] = n), (e[t] = l), (t = r));
      else break;
    }
  }
  function l(e) {
    return 0 === e.length ? null : e[0];
  }
  function a(e) {
    if (0 === e.length) return null;
    var n = e[0],
      t = e.pop();
    if (t !== n) {
      e[0] = t;
      for (var r = 0, l = e.length, a = l >>> 1; r < a; ) {
        var i = 2 * (r + 1) - 1,
          u = e[i],
          s = i + 1,
          c = e[s];
        if (0 > o(u, t))
          s < l && 0 > o(c, u)
            ? ((e[r] = c), (e[s] = t), (r = s))
            : ((e[r] = u), (e[i] = t), (r = i));
        else if (s < l && 0 > o(c, t)) ((e[r] = c), (e[s] = t), (r = s));
        else break;
      }
    }
    return n;
  }
  function o(e, n) {
    var t = e.sortIndex - n.sortIndex;
    return 0 !== t ? t : e.id - n.id;
  }
  if (
    ((t.unstable_now = void 0),
    "object" == typeof performance && "function" == typeof performance.now)
  ) {
    var i,
      u = performance;
    t.unstable_now = function () {
      return u.now();
    };
  } else {
    var s = Date,
      c = s.now();
    t.unstable_now = function () {
      return s.now() - c;
    };
  }
  var f = [],
    d = [],
    p = 1,
    m = null,
    h = 3,
    g = !1,
    v = !1,
    y = !1,
    b = !1,
    k = "function" == typeof setTimeout ? setTimeout : null,
    w = "function" == typeof clearTimeout ? clearTimeout : null,
    S = "u" > typeof setImmediate ? setImmediate : null;
  function E(e) {
    for (var n = l(d); null !== n; ) {
      if (null === n.callback) a(d);
      else if (n.startTime <= e)
        (a(d), (n.sortIndex = n.expirationTime), r(f, n));
      else break;
      n = l(d);
    }
  }
  function x(e) {
    if (((y = !1), E(e), !v))
      if (null !== l(f)) ((v = !0), N || ((N = !0), i()));
      else {
        var n = l(d);
        null !== n && F(x, n.startTime - e);
      }
  }
  var N = !1,
    C = -1,
    P = 5,
    z = -1;
  function T() {
    return !!b || !(t.unstable_now() - z < P);
  }
  function _() {
    if (((b = !1), N)) {
      var e = t.unstable_now();
      z = e;
      var n = !0;
      try {
        e: {
          ((v = !1), y && ((y = !1), w(C), (C = -1)), (g = !0));
          var r = h;
          try {
            n: {
              for (
                E(e), m = l(f);
                null !== m && !(m.expirationTime > e && T());

              ) {
                var o = m.callback;
                if ("function" == typeof o) {
                  ((m.callback = null), (h = m.priorityLevel));
                  var u = o(m.expirationTime <= e);
                  if (((e = t.unstable_now()), "function" == typeof u)) {
                    ((m.callback = u), E(e), (n = !0));
                    break n;
                  }
                  (m === l(f) && a(f), E(e));
                } else a(f);
                m = l(f);
              }
              if (null !== m) n = !0;
              else {
                var s = l(d);
                (null !== s && F(x, s.startTime - e), (n = !1));
              }
            }
            break e;
          } finally {
            ((m = null), (h = r), (g = !1));
          }
        }
      } finally {
        n ? i() : (N = !1);
      }
    }
  }
  if ("function" == typeof S)
    i = function () {
      S(_);
    };
  else if ("u" > typeof MessageChannel) {
    var L = new MessageChannel(),
      O = L.port2;
    ((L.port1.onmessage = _),
      (i = function () {
        O.postMessage(null);
      }));
  } else
    i = function () {
      k(_, 0);
    };
  function F(e, n) {
    C = k(function () {
      e(t.unstable_now());
    }, n);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (e) {
      e.callback = null;
    }),
    (t.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (P = 0 < e ? Math.floor(1e3 / e) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (t.unstable_next = function (e) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var n = 3;
          break;
        default:
          n = h;
      }
      var t = h;
      h = n;
      try {
        return e();
      } finally {
        h = t;
      }
    }),
    (t.unstable_requestPaint = function () {
      b = !0;
    }),
    (t.unstable_runWithPriority = function (e, n) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var t = h;
      h = e;
      try {
        return n();
      } finally {
        h = t;
      }
    }),
    (t.unstable_scheduleCallback = function (e, n, a) {
      var o = t.unstable_now();
      switch (
        ((a =
          "object" == typeof a &&
          null !== a &&
          "number" == typeof (a = a.delay) &&
          0 < a
            ? o + a
            : o),
        e)
      ) {
        case 1:
          var u = -1;
          break;
        case 2:
          u = 250;
          break;
        case 5:
          u = 0x3fffffff;
          break;
        case 4:
          u = 1e4;
          break;
        default:
          u = 5e3;
      }
      return (
        (u = a + u),
        (e = {
          id: p++,
          callback: n,
          priorityLevel: e,
          startTime: a,
          expirationTime: u,
          sortIndex: -1,
        }),
        a > o
          ? ((e.sortIndex = a),
            r(d, e),
            null === l(f) &&
              e === l(d) &&
              (y ? (w(C), (C = -1)) : (y = !0), F(x, a - o)))
          : ((e.sortIndex = u),
            r(f, e),
            v || g || ((v = !0), N || ((N = !0), i()))),
        e
      );
    }),
    (t.unstable_shouldYield = T),
    (t.unstable_wrapCallback = function (e) {
      var n = h;
      return function () {
        var t = h;
        h = n;
        try {
          return e.apply(this, arguments);
        } finally {
          h = t;
        }
      };
    }));
};
