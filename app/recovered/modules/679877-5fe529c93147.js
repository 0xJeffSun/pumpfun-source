// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n,
    f = "object" == typeof Reflect ? Reflect : null,
    i =
      f && "function" == typeof f.apply
        ? f.apply
        : function (e, t, r) {
            return Function.prototype.apply.call(e, t, r);
          };
  n =
    f && "function" == typeof f.ownKeys
      ? f.ownKeys
      : Object.getOwnPropertySymbols
        ? function (e) {
            return Object.getOwnPropertyNames(e).concat(
              Object.getOwnPropertySymbols(e),
            );
          }
        : function (e) {
            return Object.getOwnPropertyNames(e);
          };
  var a =
    Number.isNaN ||
    function (e) {
      return e != e;
    };
  function s() {
    s.init.call(this);
  }
  ((t.exports = s),
    (t.exports.once = function (e, t) {
      return new Promise(function (r, n) {
        var f, i, a;
        function s(r) {
          (e.removeListener(t, o), n(r));
        }
        function o() {
          ("function" == typeof e.removeListener &&
            e.removeListener("error", s),
            r([].slice.call(arguments)));
        }
        (v(e, t, o, { once: !0 }),
          "error" !== t &&
            ((f = e),
            (i = s),
            (a = { once: !0 }),
            "function" == typeof f.on && v(f, "error", i, a)));
      });
    }),
    (s.EventEmitter = s),
    (s.prototype._events = void 0),
    (s.prototype._eventsCount = 0),
    (s.prototype._maxListeners = void 0));
  var o = 10;
  function c(e) {
    if ("function" != typeof e)
      throw TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof e,
      );
  }
  function u(e) {
    return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners;
  }
  function l(e, t, r, n) {
    if (
      (c(r),
      void 0 === (i = e._events)
        ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
        : (void 0 !== i.newListener &&
            (e.emit("newListener", t, r.listener ? r.listener : r),
            (i = e._events)),
          (a = i[t])),
      void 0 === a)
    )
      ((a = i[t] = r), ++e._eventsCount);
    else if (
      ("function" == typeof a
        ? (a = i[t] = n ? [r, a] : [a, r])
        : n
          ? a.unshift(r)
          : a.push(r),
      (f = u(e)) > 0 && a.length > f && !a.warned)
    ) {
      a.warned = !0;
      var f,
        i,
        a,
        s = Error(
          "Possible EventEmitter memory leak detected. " +
            a.length +
            " " +
            String(t) +
            " listeners added. Use emitter.setMaxListeners() to increase limit",
        );
      ((s.name = "MaxListenersExceededWarning"),
        (s.emitter = e),
        (s.type = t),
        (s.count = a.length),
        console && console.warn && console.warn(s));
    }
    return e;
  }
  function d() {
    if (!this.fired)
      return (this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      0 == arguments.length)
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments);
  }
  function h(e, t, r) {
    var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r },
      f = d.bind(n);
    return ((f.listener = r), (n.wrapFn = f), f);
  }
  function p(e, t, r) {
    var n = e._events;
    if (void 0 === n) return [];
    var f = n[t];
    return void 0 === f
      ? []
      : "function" == typeof f
        ? r
          ? [f.listener || f]
          : [f]
        : r
          ? (function (e) {
              for (var t = Array(e.length), r = 0; r < t.length; ++r)
                t[r] = e[r].listener || e[r];
              return t;
            })(f)
          : y(f, f.length);
  }
  function m(e) {
    var t = this._events;
    if (void 0 !== t) {
      var r = t[e];
      if ("function" == typeof r) return 1;
      if (void 0 !== r) return r.length;
    }
    return 0;
  }
  function y(e, t) {
    for (var r = Array(t), n = 0; n < t; ++n) r[n] = e[n];
    return r;
  }
  function v(e, t, r, n) {
    if ("function" == typeof e.on) n.once ? e.once(t, r) : e.on(t, r);
    else if ("function" == typeof e.addEventListener)
      e.addEventListener(t, function f(i) {
        (n.once && e.removeEventListener(t, f), r(i));
      });
    else
      throw TypeError(
        'The "emitter" argument must be of type EventEmitter. Received type ' +
          typeof e,
      );
  }
  (Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: !0,
    get: function () {
      return o;
    },
    set: function (e) {
      if ("number" != typeof e || e < 0 || a(e))
        throw RangeError(
          'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
            e +
            ".",
        );
      o = e;
    },
  }),
    (s.init = function () {
      ((void 0 === this._events ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0));
    }),
    (s.prototype.setMaxListeners = function (e) {
      if ("number" != typeof e || e < 0 || a(e))
        throw RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            e +
            ".",
        );
      return ((this._maxListeners = e), this);
    }),
    (s.prototype.getMaxListeners = function () {
      return u(this);
    }),
    (s.prototype.emit = function (e) {
      for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
      var n = "error" === e,
        f = this._events;
      if (void 0 !== f) n = n && void 0 === f.error;
      else if (!n) return !1;
      if (n) {
        if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
        var a,
          s = Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
        throw ((s.context = a), s);
      }
      var o = f[e];
      if (void 0 === o) return !1;
      if ("function" == typeof o) i(o, this, t);
      else
        for (var c = o.length, u = y(o, c), r = 0; r < c; ++r) i(u[r], this, t);
      return !0;
    }),
    (s.prototype.addListener = function (e, t) {
      return l(this, e, t, !1);
    }),
    (s.prototype.on = s.prototype.addListener),
    (s.prototype.prependListener = function (e, t) {
      return l(this, e, t, !0);
    }),
    (s.prototype.once = function (e, t) {
      return (c(t), this.on(e, h(this, e, t)), this);
    }),
    (s.prototype.prependOnceListener = function (e, t) {
      return (c(t), this.prependListener(e, h(this, e, t)), this);
    }),
    (s.prototype.removeListener = function (e, t) {
      var r, n, f, i, a;
      if ((c(t), void 0 === (n = this._events) || void 0 === (r = n[e])))
        return this;
      if (r === t || r.listener === t)
        0 == --this._eventsCount
          ? (this._events = Object.create(null))
          : (delete n[e],
            n.removeListener &&
              this.emit("removeListener", e, r.listener || t));
      else if ("function" != typeof r) {
        for (f = -1, i = r.length - 1; i >= 0; i--)
          if (r[i] === t || r[i].listener === t) {
            ((a = r[i].listener), (f = i));
            break;
          }
        if (f < 0) return this;
        (0 === f
          ? r.shift()
          : (function (e, t) {
              for (; t + 1 < e.length; t++) e[t] = e[t + 1];
              e.pop();
            })(r, f),
          1 === r.length && (n[e] = r[0]),
          void 0 !== n.removeListener &&
            this.emit("removeListener", e, a || t));
      }
      return this;
    }),
    (s.prototype.off = s.prototype.removeListener),
    (s.prototype.removeAllListeners = function (e) {
      var t, r, n;
      if (void 0 === (r = this._events)) return this;
      if (void 0 === r.removeListener)
        return (
          0 == arguments.length
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : void 0 !== r[e] &&
              (0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : delete r[e]),
          this
        );
      if (0 == arguments.length) {
        var f,
          i = Object.keys(r);
        for (n = 0; n < i.length; ++n)
          "removeListener" !== (f = i[n]) && this.removeAllListeners(f);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if ("function" == typeof (t = r[e])) this.removeListener(e, t);
      else if (void 0 !== t)
        for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
      return this;
    }),
    (s.prototype.listeners = function (e) {
      return p(this, e, !0);
    }),
    (s.prototype.rawListeners = function (e) {
      return p(this, e, !1);
    }),
    (s.listenerCount = function (e, t) {
      return "function" == typeof e.listenerCount
        ? e.listenerCount(t)
        : m.call(e, t);
    }),
    (s.prototype.listenerCount = m),
    (s.prototype.eventNames = function () {
      return this._eventsCount > 0 ? n(this._events) : [];
    }));
};
