// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  let s = e.r(443426);
  t.exports = a;
  let r =
    (function () {
      function e(e) {
        return void 0 !== e && e;
      }
      try {
        if ("u" > typeof globalThis) return globalThis;
        return (
          Object.defineProperty(Object.prototype, "globalThis", {
            get: function () {
              return (
                delete Object.prototype.globalThis,
                (this.globalThis = this)
              );
            },
            configurable: !0,
          }),
          globalThis
        );
      } catch (t) {
        return e(self) || e(window) || e(this) || {};
      }
    })().console || {};
  function a(e) {
    var t, i;
    (e = e || {}).browser = e.browser || {};
    let s = e.browser.transmit;
    if (s && "function" != typeof s.send)
      throw Error("pino: transmit option must have a send function");
    let h = e.browser.write || r;
    e.browser.write && (e.browser.asObject = !0);
    let u = e.serializers || {},
      f =
        ((t = e.browser.serialize),
        Array.isArray(t)
          ? t.filter(function (e) {
              return "!stdSerializers.err" !== e;
            })
          : !0 === t && Object.keys(u)),
      m = e.browser.serialize;
    (Array.isArray(e.browser.serialize) &&
      e.browser.serialize.indexOf("!stdSerializers.err") > -1 &&
      (m = !1),
      "function" == typeof h &&
        (h.error = h.fatal = h.warn = h.info = h.debug = h.trace = h),
      !1 === e.enabled && (e.level = "silent"));
    let w = e.level || "info",
      y = Object.create(h);
    (y.log || (y.log = d),
      Object.defineProperty(y, "levelVal", {
        get: function () {
          return "silent" === this.level
            ? 1 / 0
            : this.levels.values[this.level];
        },
      }),
      Object.defineProperty(y, "level", {
        get: function () {
          return this._level;
        },
        set: function (e) {
          if ("silent" !== e && !this.levels.values[e])
            throw Error("unknown level " + e);
          ((this._level = e),
            n(b, y, "error", "log"),
            n(b, y, "fatal", "error"),
            n(b, y, "warn", "error"),
            n(b, y, "info", "log"),
            n(b, y, "debug", "log"),
            n(b, y, "trace", "log"));
        },
      }));
    let b = {
      transmit: s,
      serialize: f,
      asObject: e.browser.asObject,
      levels: ["error", "fatal", "warn", "info", "debug", "trace"],
      timestamp:
        "function" == typeof (i = e).timestamp
          ? i.timestamp
          : !1 === i.timestamp
            ? p
            : g,
    };
    return (
      (y.levels = a.levels),
      (y.level = w),
      (y.setMaxListeners =
        y.getMaxListeners =
        y.emit =
        y.addListener =
        y.on =
        y.prependListener =
        y.once =
        y.prependOnceListener =
        y.removeListener =
        y.removeAllListeners =
        y.listeners =
        y.listenerCount =
        y.eventNames =
        y.write =
        y.flush =
          d),
      (y.serializers = u),
      (y._serialize = f),
      (y._stdErrSerialize = m),
      (y.child = function (t, i) {
        if (!t) throw Error("missing bindings for child Pino");
        ((i = i || {}), f && t.serializers && (i.serializers = t.serializers));
        let r = i.serializers;
        if (f && r) {
          var a = Object.assign({}, u, r),
            n = !0 === e.browser.serialize ? Object.keys(a) : f;
          (delete t.serializers, o([t], n, a, this._stdErrSerialize));
        }
        function h(e) {
          ((this._childLevel = (0 | e._childLevel) + 1),
            (this.error = c(e, t, "error")),
            (this.fatal = c(e, t, "fatal")),
            (this.warn = c(e, t, "warn")),
            (this.info = c(e, t, "info")),
            (this.debug = c(e, t, "debug")),
            (this.trace = c(e, t, "trace")),
            a && ((this.serializers = a), (this._serialize = n)),
            s && (this._logEvent = l([].concat(e._logEvent.bindings, t))));
        }
        return ((h.prototype = this), new h(this));
      }),
      s && (y._logEvent = l()),
      y
    );
  }
  function n(e, t, i, n) {
    let c = Object.getPrototypeOf(t);
    ((t[i] =
      t.levelVal > t.levels.values[i] ? d : c[i] ? c[i] : r[i] || r[n] || d),
      (function (e, t, i) {
        if (e.transmit || t[i] !== d) {
          var n;
          t[i] =
            ((n = t[i]),
            function () {
              let c = e.timestamp(),
                h = Array(arguments.length),
                u =
                  Object.getPrototypeOf && Object.getPrototypeOf(this) === r
                    ? r
                    : this;
              for (var d, p, g, f = 0; f < h.length; f++) h[f] = arguments[f];
              if (
                (e.serialize &&
                  !e.asObject &&
                  o(
                    h,
                    this._serialize,
                    this.serializers,
                    this._stdErrSerialize,
                  ),
                e.asObject
                  ? n.call(
                      u,
                      (function (e, t, i, r) {
                        e._serialize &&
                          o(i, e._serialize, e.serializers, e._stdErrSerialize);
                        let n = i.slice(),
                          c = n[0],
                          l = {};
                        (r && (l.time = r), (l.level = a.levels.values[t]));
                        let h = (0 | e._childLevel) + 1;
                        if (
                          (h < 1 && (h = 1), null !== c && "object" == typeof c)
                        ) {
                          for (; h-- && "object" == typeof n[0]; )
                            Object.assign(l, n.shift());
                          c = n.length ? s(n.shift(), n) : void 0;
                        } else "string" == typeof c && (c = s(n.shift(), n));
                        return (void 0 !== c && (l.msg = c), l);
                      })(this, i, h, c),
                    )
                  : n.apply(u, h),
                e.transmit)
              ) {
                let s,
                  r,
                  n,
                  u,
                  f,
                  m,
                  w = e.transmit.level || t.level,
                  y = a.levels.values[w],
                  b = a.levels.values[i];
                if (b < y) return;
                ((d = this),
                  (p = {
                    ts: c,
                    methodLevel: i,
                    methodValue: b,
                    transmitLevel: w,
                    transmitValue: a.levels.values[e.transmit.level || t.level],
                    send: e.transmit.send,
                    val: t.levelVal,
                  }),
                  (g = h),
                  (s = p.send),
                  (r = p.ts),
                  (n = p.methodLevel),
                  (u = p.methodValue),
                  (f = p.val),
                  (m = d._logEvent.bindings),
                  o(
                    g,
                    d._serialize || Object.keys(d.serializers),
                    d.serializers,
                    void 0 === d._stdErrSerialize || d._stdErrSerialize,
                  ),
                  (d._logEvent.ts = r),
                  (d._logEvent.messages = g.filter(function (e) {
                    return -1 === m.indexOf(e);
                  })),
                  (d._logEvent.level.label = n),
                  (d._logEvent.level.value = u),
                  s(n, d._logEvent, f),
                  (d._logEvent = l(m)));
              }
            });
        }
      })(e, t, i));
  }
  function o(e, t, i, s) {
    for (let r in e)
      if (s && e[r] instanceof Error) e[r] = a.stdSerializers.err(e[r]);
      else if ("object" == typeof e[r] && !Array.isArray(e[r]))
        for (let s in e[r])
          t && t.indexOf(s) > -1 && s in i && (e[r][s] = i[s](e[r][s]));
  }
  function c(e, t, i) {
    return function () {
      let s = Array(1 + arguments.length);
      s[0] = t;
      for (var r = 1; r < s.length; r++) s[r] = arguments[r - 1];
      return e[i].apply(this, s);
    };
  }
  function l(e) {
    return {
      ts: 0,
      messages: [],
      bindings: e || [],
      level: { label: "", value: 0 },
    };
  }
  function h() {
    return {};
  }
  function u(e) {
    return e;
  }
  function d() {}
  function p() {
    return !1;
  }
  function g() {
    return Date.now();
  }
  ((a.levels = {
    values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal",
    },
  }),
    (a.stdSerializers = {
      mapHttpRequest: h,
      mapHttpResponse: h,
      wrapRequestSerializer: u,
      wrapResponseSerializer: u,
      wrapErrorSerializer: u,
      req: h,
      res: h,
      err: function (e) {
        let t = { type: e.constructor.name, msg: e.message, stack: e.stack };
        for (let i in e) void 0 === t[i] && (t[i] = e[i]);
        return t;
      },
    }),
    (a.stdTimeFunctions = Object.assign(
      {},
      {
        nullTime: p,
        epochTime: g,
        unixTime: function () {
          return Math.round(Date.now() / 1e3);
        },
        isoTime: function () {
          return new Date(Date.now()).toISOString();
        },
      },
    )));
};
