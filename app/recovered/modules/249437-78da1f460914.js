// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let n, t, a, r;
  var i = e.i(352386),
    o = e.i(305288),
    s = e.i(525665),
    l = e.i(484169);
  let c = (e) => {
    let t,
      a,
      r,
      [o, s] = i.useState({ width: 0, height: 0 });
    i.useLayoutEffect(() => {
      if (e.current) {
        let { width: n, height: t } = e.current.getBoundingClientRect();
        s({ width: n, height: t });
      }
    }, [e.current]);
    let l = i.useCallback((e) => s(e.contentRect), []);
    return (
      (a =
        n ||
        (n = (function () {
          let e = !1,
            n = [],
            t = new Map();
          if (typeof window > "u") return;
          let a = new ResizeObserver((a, r) => {
            ((n = n.concat(a)),
              e ||
                window.requestAnimationFrame(() => {
                  let a = new Set();
                  for (let e = 0; e < n.length; e++) {
                    if (a.has(n[e].target)) continue;
                    a.add(n[e].target);
                    let i = t.get(n[e].target);
                    null == i || i.forEach((t) => t(n[e], r));
                  }
                  ((n = []), (e = !1));
                }),
              (e = !0));
          });
          return {
            observer: a,
            subscribe(e, n) {
              a.observe(e);
              let r = t.get(e) ?? [];
              (r.push(n), t.set(e, r));
            },
            unsubscribe(e, n) {
              let r = t.get(e) ?? [];
              if (1 === r.length) {
                (a.unobserve(e), t.delete(e));
                return;
              }
              let i = r.indexOf(n);
              (-1 !== i && r.splice(i, 1), t.set(e, r));
            },
          };
        })())),
      (t = i.useRef(l)),
      i.useEffect(() => {
        t.current = l;
      }),
      (r = t),
      i.useLayoutEffect(() => {
        let n = !1,
          t = e.current;
        if (t)
          return (
            null == a || a.subscribe(t, i),
            () => {
              ((n = !0), null == a || a.unsubscribe(t, i));
            }
          );
        function i(e, t) {
          n || r.current(e, t);
        }
      }, [e.current, a, r]),
      null == a || a.observer,
      o
    );
  };
  function u(e, n, t = !0) {
    let [a, r] = i.useState(n);
    return (
      i.useEffect(() => {
        if ((t && r(n), typeof window > "u" || !e)) return;
        let a = e.subscribe(r);
        return () => a.unsubscribe();
      }, [e, t]),
      a
    );
  }
  function d(e) {
    let n = (0, o.u)(e);
    return u(
      i.useMemo(() => (0, o.e)(n), [n]),
      n.state,
    );
  }
  function m(e, n = {}) {
    var t, a;
    let r = "string" == typeof e ? n.participant : e.participant,
      s = (0, o.c)(r),
      l = "string" == typeof e ? { participant: s, source: e } : e,
      [c, u] = i.useState(
        !!(
          (null != (t = l.publication) && t.isMuted) ||
          (null != (a = s.getTrackPublication(l.source)) && a.isMuted)
        ),
      );
    return (
      i.useEffect(() => {
        let e = (0, o.o)(l).subscribe(u);
        return () => e.unsubscribe();
      }, [(0, o.p)(l)]),
      c
    );
  }
  function p(e) {
    let n = (0, o.c)(e);
    return u(
      i.useMemo(() => (0, o.q)(n), [n]),
      n.isSpeaking,
    );
  }
  function f(e = {}) {
    let n = (0, o.u)(e.room),
      [t, a] = i.useState(n.localParticipant),
      [r, s] = i.useState(t.isMicrophoneEnabled),
      [l, c] = i.useState(t.isCameraEnabled),
      [u, d] = i.useState(t.isScreenShareEnabled),
      [m, p] = i.useState(t.lastMicrophoneError),
      [h, g] = i.useState(t.lastCameraError),
      [k, T] = i.useState(void 0),
      [v, y] = i.useState(void 0),
      b = (e) => {
        (c(e.isCameraEnabled),
          s(e.isMicrophoneEnabled),
          d(e.isScreenShareEnabled),
          y(e.cameraTrack),
          T(e.microphoneTrack),
          p(e.participant.lastMicrophoneError),
          g(e.participant.lastCameraError),
          a(e.participant));
      };
    return (
      i.useEffect(() => {
        let e = (0, o.t)(n.localParticipant).subscribe(b);
        return () => e.unsubscribe();
      }, [n]),
      {
        isMicrophoneEnabled: r,
        isScreenShareEnabled: u,
        isCameraEnabled: l,
        microphoneTrack: k,
        cameraTrack: v,
        lastMicrophoneError: m,
        lastCameraError: h,
        localParticipant: t,
      }
    );
  }
  function h(e, n, t = {}) {
    let a = i.useRef([]),
      r = i.useRef(-1),
      s = n !== r.current,
      l =
        "function" == typeof t.customSortFunction
          ? t.customSortFunction(e)
          : (0, o.z)(e),
      c = [...l];
    if (!1 === s)
      try {
        c = (0, o.A)(a.current, l, n);
      } catch (e) {
        o.l.error("Error while running updatePages(): ", e);
      }
    return (s ? (a.current = l) : (a.current = c), (r.current = n), c);
  }
  function g(e = {}) {
    let n = (0, o.u)(e.room),
      [t, a] = i.useState([]);
    return (
      i.useEffect(() => {
        let t = (0, o.E)(n, { additionalRoomEvents: e.updateOnlyOn }).subscribe(
          a,
        );
        return () => t.unsubscribe();
      }, [n, JSON.stringify(e.updateOnlyOn)]),
      t
    );
  }
  let k = {
    bands: 5,
    loPass: 100,
    hiPass: 600,
    updateInterval: 32,
    analyserOptions: { fftSize: 2048 },
  };
  o.a8.AgentState;
  var T,
    v = { exports: {} };
  !(function () {
    if (T) return v.exports;
    T = 1;
    var e,
      n = "object" == typeof Reflect ? Reflect : null,
      t =
        n && "function" == typeof n.apply
          ? n.apply
          : function (e, n, t) {
              return Function.prototype.apply.call(e, n, t);
            };
    e =
      n && "function" == typeof n.ownKeys
        ? n.ownKeys
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
    function r() {
      r.init.call(this);
    }
    ((v.exports = r),
      (v.exports.once = function (e, n) {
        return new Promise(function (t, a) {
          var r, i, o;
          function s(t) {
            (e.removeListener(n, l), a(t));
          }
          function l() {
            ("function" == typeof e.removeListener &&
              e.removeListener("error", s),
              t([].slice.call(arguments)));
          }
          (f(e, n, l, { once: !0 }),
            "error" !== n &&
              ((r = e),
              (i = s),
              (o = { once: !0 }),
              "function" == typeof r.on && f(r, "error", i, o)));
        });
      }),
      (r.EventEmitter = r),
      (r.prototype._events = void 0),
      (r.prototype._eventsCount = 0),
      (r.prototype._maxListeners = void 0));
    var i = 10;
    function o(e) {
      if ("function" != typeof e)
        throw TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof e,
        );
    }
    function s(e) {
      return void 0 === e._maxListeners
        ? r.defaultMaxListeners
        : e._maxListeners;
    }
    function l(e, n, t, a) {
      var r, i, l;
      if (
        (o(t),
        void 0 === (i = e._events)
          ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
          : (void 0 !== i.newListener &&
              (e.emit("newListener", n, t.listener ? t.listener : t),
              (i = e._events)),
            (l = i[n])),
        void 0 === l)
      )
        ((l = i[n] = t), ++e._eventsCount);
      else if (
        ("function" == typeof l
          ? (l = i[n] = a ? [t, l] : [l, t])
          : a
            ? l.unshift(t)
            : l.push(t),
        (r = s(e)) > 0 && l.length > r && !l.warned)
      ) {
        l.warned = !0;
        var c = Error(
          "Possible EventEmitter memory leak detected. " +
            l.length +
            " " +
            String(n) +
            " listeners added. Use emitter.setMaxListeners() to increase limit",
        );
        ((c.name = "MaxListenersExceededWarning"),
          (c.emitter = e),
          (c.type = n),
          (c.count = l.length),
          console && console.warn && console.warn(c));
      }
      return e;
    }
    function c() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          0 == arguments.length
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function u(e, n, t) {
      var a = { fired: !1, wrapFn: void 0, target: e, type: n, listener: t },
        r = c.bind(a);
      return ((r.listener = t), (a.wrapFn = r), r);
    }
    function d(e, n, t) {
      var a = e._events;
      if (void 0 === a) return [];
      var r = a[n];
      return void 0 === r
        ? []
        : "function" == typeof r
          ? t
            ? [r.listener || r]
            : [r]
          : t
            ? (function (e) {
                for (var n = Array(e.length), t = 0; t < n.length; ++t)
                  n[t] = e[t].listener || e[t];
                return n;
              })(r)
            : p(r, r.length);
    }
    function m(e) {
      var n = this._events;
      if (void 0 !== n) {
        var t = n[e];
        if ("function" == typeof t) return 1;
        if (void 0 !== t) return t.length;
      }
      return 0;
    }
    function p(e, n) {
      for (var t = Array(n), a = 0; a < n; ++a) t[a] = e[a];
      return t;
    }
    function f(e, n, t, a) {
      if ("function" == typeof e.on) a.once ? e.once(n, t) : e.on(n, t);
      else if ("function" == typeof e.addEventListener)
        e.addEventListener(n, function r(i) {
          (a.once && e.removeEventListener(n, r), t(i));
        });
      else
        throw TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof e,
        );
    }
    (Object.defineProperty(r, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return i;
      },
      set: function (e) {
        if ("number" != typeof e || e < 0 || a(e))
          throw RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              e +
              ".",
          );
        i = e;
      },
    }),
      (r.init = function () {
        ((void 0 === this._events ||
          this._events === Object.getPrototypeOf(this)._events) &&
          ((this._events = Object.create(null)), (this._eventsCount = 0)),
          (this._maxListeners = this._maxListeners || void 0));
      }),
      (r.prototype.setMaxListeners = function (e) {
        if ("number" != typeof e || e < 0 || a(e))
          throw RangeError(
            'The value of "n" is out of range. It must be a non-negative number. Received ' +
              e +
              ".",
          );
        return ((this._maxListeners = e), this);
      }),
      (r.prototype.getMaxListeners = function () {
        return s(this);
      }),
      (r.prototype.emit = function (e) {
        for (var n = [], a = 1; a < arguments.length; a++) n.push(arguments[a]);
        var r = "error" === e,
          i = this._events;
        if (void 0 !== i) r = r && void 0 === i.error;
        else if (!r) return !1;
        if (r) {
          if ((n.length > 0 && (o = n[0]), o instanceof Error)) throw o;
          var o,
            s = Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
          throw ((s.context = o), s);
        }
        var l = i[e];
        if (void 0 === l) return !1;
        if ("function" == typeof l) t(l, this, n);
        else
          for (var c = l.length, u = p(l, c), a = 0; a < c; ++a)
            t(u[a], this, n);
        return !0;
      }),
      (r.prototype.addListener = function (e, n) {
        return l(this, e, n, !1);
      }),
      (r.prototype.on = r.prototype.addListener),
      (r.prototype.prependListener = function (e, n) {
        return l(this, e, n, !0);
      }),
      (r.prototype.once = function (e, n) {
        return (o(n), this.on(e, u(this, e, n)), this);
      }),
      (r.prototype.prependOnceListener = function (e, n) {
        return (o(n), this.prependListener(e, u(this, e, n)), this);
      }),
      (r.prototype.removeListener = function (e, n) {
        var t, a, r, i, s;
        if ((o(n), void 0 === (a = this._events) || void 0 === (t = a[e])))
          return this;
        if (t === n || t.listener === n)
          0 == --this._eventsCount
            ? (this._events = Object.create(null))
            : (delete a[e],
              a.removeListener &&
                this.emit("removeListener", e, t.listener || n));
        else if ("function" != typeof t) {
          for (r = -1, i = t.length - 1; i >= 0; i--)
            if (t[i] === n || t[i].listener === n) {
              ((s = t[i].listener), (r = i));
              break;
            }
          if (r < 0) return this;
          (0 === r
            ? t.shift()
            : (function (e, n) {
                for (; n + 1 < e.length; n++) e[n] = e[n + 1];
                e.pop();
              })(t, r),
            1 === t.length && (a[e] = t[0]),
            void 0 !== a.removeListener &&
              this.emit("removeListener", e, s || n));
        }
        return this;
      }),
      (r.prototype.off = r.prototype.removeListener),
      (r.prototype.removeAllListeners = function (e) {
        var n, t, a;
        if (void 0 === (t = this._events)) return this;
        if (void 0 === t.removeListener)
          return (
            0 == arguments.length
              ? ((this._events = Object.create(null)), (this._eventsCount = 0))
              : void 0 !== t[e] &&
                (0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : delete t[e]),
            this
          );
        if (0 == arguments.length) {
          var r,
            i = Object.keys(t);
          for (a = 0; a < i.length; ++a)
            "removeListener" !== (r = i[a]) && this.removeAllListeners(r);
          return (
            this.removeAllListeners("removeListener"),
            (this._events = Object.create(null)),
            (this._eventsCount = 0),
            this
          );
        }
        if ("function" == typeof (n = t[e])) this.removeListener(e, n);
        else if (void 0 !== n)
          for (a = n.length - 1; a >= 0; a--) this.removeListener(e, n[a]);
        return this;
      }),
      (r.prototype.listeners = function (e) {
        return d(this, e, !0);
      }),
      (r.prototype.rawListeners = function (e) {
        return d(this, e, !1);
      }),
      (r.listenerCount = function (e, n) {
        return "function" == typeof e.listenerCount
          ? e.listenerCount(n)
          : m.call(e, n);
      }),
      (r.prototype.listenerCount = m),
      (r.prototype.eventNames = function () {
        return this._eventsCount > 0 ? e(this._events) : [];
      }),
      v.exports);
  })();
  var y =
      (((t = y || {}).CameraChanged = "cameraChanged"),
      (t.MicrophoneChanged = "microphoneChanged"),
      (t.StateChanged = "stateChanged"),
      t),
    b =
      (((a = b || {}).ConnectionStateChanged = "connectionStateChanged"),
      (a.MediaDevicesError = "mediaDevicesError"),
      (a.EncryptionError = "encryptionError"),
      a),
    E = (((r = E || {}).MessageReceived = "messageReceived"), r);
  e.s([
    "A",
    0,
    function () {
      let e = (0, o.f)();
      return u(
        i.useMemo(() => (0, o.v)(e.localParticipant), [e]),
        e.localParticipant.permissions,
      );
    },
    "B",
    0,
    function (e) {
      return (
        (e = (0, o.F)(e)),
        i.useMemo(
          () =>
            (null == e ? void 0 : e.pin.state) !== void 0 &&
            e.pin.state.length >= 1
              ? e.pin.state
              : [],
          [e.pin.state],
        )
      );
    },
    "C",
    0,
    f,
    "H",
    0,
    p,
    "K",
    0,
    function (e = {}) {
      let n = g(e),
        { localParticipant: t } = f(e);
      return i.useMemo(() => [t, ...n], [t, n]);
    },
    "L",
    0,
    function (e, n = {}) {
      let t = (0, o.f)(),
        [a] = i.useState(n.updateOnlyOn),
        r = i.useMemo(
          () =>
            "string" == typeof e
              ? (0, o.H)(t, e, { additionalEvents: a })
              : (0, o.I)(t, e, { additionalEvents: a }),
          [t, JSON.stringify(e), a],
        ),
        [s, l] = i.useState({ p: void 0 });
      return (
        i.useEffect(() => {
          let e = r.subscribe((e) => l({ p: e }));
          return () => e.unsubscribe();
        }, [r]),
        s.p
      );
    },
    "M",
    0,
    g,
    "a",
    0,
    d,
    "b",
    0,
    function ({ props: e }) {
      let { dispatch: n, state: t } = (0, o.a)().widget,
        { className: a } = i.useMemo(() => (0, o.P)(), []);
      return {
        mergedProps: i.useMemo(
          () =>
            (0, s.m)(e, {
              className: a,
              onClick: () => {
                n && n({ msg: "toggle_chat" });
              },
              "aria-pressed": null != t && t.showChat ? "true" : "false",
              "data-lk-unread-msgs": t
                ? t.unreadMessages < 10
                  ? t.unreadMessages.toFixed(0)
                  : "9+"
                : "0",
            }),
          [e, a, n, t],
        ),
      };
    },
    "c",
    0,
    function (e) {
      let n = (0, o.f)(),
        t = d(n);
      return {
        buttonProps: i.useMemo(() => {
          let { className: a, disconnect: r } = (0, o.h)(n);
          return (0, s.m)(e, {
            className: a,
            onClick: () => r(e.stopTracks ?? !0),
            disabled: t === l.ConnectionState.Disconnected,
          });
        }, [n, e, t]),
      };
    },
    "d",
    0,
    function ({ trackRef: e, props: n }) {
      let t = (0, o.i)(e),
        a = (0, o.j)(),
        { className: r } = i.useMemo(() => (0, o.k)(), []),
        l = i.useMemo(
          () => (0, o.m)(t, null == a ? void 0 : a.pin.state),
          [t, null == a ? void 0 : a.pin.state],
        );
      return {
        mergedProps: i.useMemo(
          () =>
            (0, s.m)(n, {
              className: r,
              onClick: (e) => {
                var r, i, o, s, c;
                (null == (r = n.onClick) || r.call(n, e),
                  l
                    ? null == (o = null == a ? void 0 : (i = a.pin).dispatch) ||
                      o.call(i, { msg: "clear_pin" })
                    : null == (c = null == a ? void 0 : (s = a.pin).dispatch) ||
                      c.call(s, { msg: "set_pin", trackReference: t }));
              },
            }),
          [n, r, t, l, null == a ? void 0 : a.pin],
        ),
        inFocus: l,
      };
    },
    "e",
    0,
    function ({
      kind: e,
      room: n,
      track: t,
      requestPermissions: a,
      onError: r,
    }) {
      let s = (0, o.w)(),
        c = i.useMemo(() => n ?? s ?? new l.Room(), [n, s]),
        d = u(
          i.useMemo(() => (0, o.x)(e, r, a), [e, a, r]),
          [],
        ),
        [m, p] = i.useState(
          (null == c ? void 0 : c.getActiveDevice(e)) ?? "default",
        ),
        {
          className: f,
          activeDeviceObservable: h,
          setActiveMediaDevice: g,
        } = i.useMemo(() => (0, o.y)(e, c), [e, c, t]);
      return (
        i.useEffect(() => {
          let e = h.subscribe((e) => {
            e && (o.l.info("setCurrentDeviceId", e), p(e));
          });
          return () => {
            null == e || e.unsubscribe();
          };
        }, [h]),
        { devices: d, className: f, activeDeviceId: m, setActiveMediaDevice: g }
      );
    },
    "f",
    0,
    function ({ room: e, props: n }) {
      let t = (0, o.u)(e),
        {
          className: a,
          roomAudioPlaybackAllowedObservable: r,
          handleStartAudioPlayback: l,
        } = i.useMemo(() => (0, o.N)(), []),
        { canPlayAudio: c } = u(
          i.useMemo(() => r(t), [t, r]),
          { canPlayAudio: t.canPlaybackAudio },
        );
      return {
        mergedProps: i.useMemo(
          () =>
            (0, s.m)(n, {
              className: a,
              onClick: () => {
                l(t);
              },
              style: { display: c ? "none" : "block" },
            }),
          [n, a, c, l, t],
        ),
        canPlayAudio: c,
      };
    },
    "g",
    0,
    function ({ room: e, props: n }) {
      let t = (0, o.u)(e),
        {
          className: a,
          roomVideoPlaybackAllowedObservable: r,
          handleStartVideoPlayback: l,
        } = i.useMemo(() => (0, o.O)(), []),
        { canPlayVideo: c } = u(
          i.useMemo(() => r(t), [t, r]),
          { canPlayVideo: t.canPlaybackVideo },
        );
      return {
        mergedProps: i.useMemo(
          () =>
            (0, s.m)(n, {
              className: a,
              onClick: () => {
                l(t);
              },
              style: { display: c ? "none" : "block" },
            }),
          [n, a, c, l, t],
        ),
        canPlayVideo: c,
      };
    },
    "h",
    0,
    function ({
      source: e,
      onChange: n,
      initialState: t,
      captureOptions: a,
      publishOptions: r,
      onDeviceError: l,
      room: c,
      ...d
    }) {
      var m;
      let p = (0, o.w)(),
        f = i.useMemo(() => c ?? p, [c, p]),
        h =
          null == (m = null == f ? void 0 : f.localParticipant)
            ? void 0
            : m.getTrackPublication(e),
        g = i.useRef(!1),
        {
          toggle: k,
          className: T,
          pendingObserver: v,
          enabledObserver: y,
        } = i.useMemo(
          () => (f ? (0, o.S)(e, f, a, r, l) : (0, o.T)()),
          [f, e, JSON.stringify(a), r],
        ),
        b = u(v, !1),
        E = u(y, t ?? !!(null != h && h.isEnabled));
      (i.useEffect(() => {
        (null == n || n(E, g.current), (g.current = !1));
      }, [E, n]),
        i.useEffect(() => {
          void 0 !== t &&
            (o.l.debug("forcing initial toggle state", e, t), k(t));
        }, []));
      let _ = i.useMemo(() => (0, s.m)(d, { className: T }), [d, T]),
        S = i.useCallback(
          (e) => {
            var n;
            ((g.current = !0),
              k().catch(() => (g.current = !1)),
              null == (n = d.onClick) || n.call(d, e));
          },
          [d, k],
        );
      return {
        toggle: k,
        enabled: E,
        pending: b,
        track: h,
        buttonProps: {
          ..._,
          "aria-pressed": E,
          "data-lk-source": e,
          "data-lk-enabled": E,
          disabled: b,
          onClick: S,
        },
      };
    },
    "i",
    0,
    function (e = {}) {
      let n = (0, o.c)(e.participant),
        { className: t, connectionQualityObserver: a } = i.useMemo(
          () => (0, o.d)(n),
          [n],
        );
      return { className: t, quality: u(a, n.connectionQuality) };
    },
    "j",
    0,
    u,
    "k",
    0,
    function (e) {
      var n, t;
      let a = (0, o.i)(e),
        { className: r, mediaMutedObserver: s } = i.useMemo(
          () => (0, o.Q)(a),
          [(0, o.p)(a)],
        );
      return {
        isMuted: u(
          s,
          !!(
            (null != (n = a.publication) && n.isMuted) ||
            (null != (t = a.participant.getTrackPublication(a.source)) &&
              t.isMuted)
          ),
        ),
        className: r,
      };
    },
    "l",
    0,
    function ({
      trackRef: e,
      onParticipantClick: n,
      disableSpeakingIndicator: t,
      htmlProps: a,
    }) {
      let r = (0, o.i)(e),
        c = i.useMemo(() => {
          let { className: e } = (0, o.D)();
          return (0, s.m)(a, {
            className: e,
            onClick: (e) => {
              var t;
              if (
                (null == (t = a.onClick) || t.call(a, e),
                "function" == typeof n)
              ) {
                let e =
                  r.publication ?? r.participant.getTrackPublication(r.source);
                n({ participant: r.participant, track: e });
              }
            },
          });
        }, [a, n, r.publication, r.source, r.participant]),
        u = r.participant.getTrackPublication(l.Track.Source.Microphone),
        d = i.useMemo(
          () => ({
            participant: r.participant,
            source: l.Track.Source.Microphone,
            publication: u,
          }),
          [u, r.participant],
        ),
        f = m(r),
        h = m(d),
        g = p(r.participant),
        k = (function (e) {
          if (e.publication instanceof l.LocalTrackPublication) {
            let n = e.publication.track;
            if (n) {
              let { facingMode: e } = (0, l.facingModeFromLocalTrack)(n);
              return e;
            }
          }
          return "undefined";
        })(r);
      return {
        elementProps: {
          "data-lk-audio-muted": h,
          "data-lk-video-muted": f,
          "data-lk-speaking": !0 !== t && g,
          "data-lk-local-participant": r.participant.isLocal,
          "data-lk-source": r.source,
          "data-lk-facing-mode": k,
          ...c,
        },
      };
    },
    "m",
    0,
    function (e, n = {}) {
      let t = (0, o.c)(e),
        a = (0, o.u)(n.room);
      return u(
        i.useMemo(() => (0, o.a0)(a, t), [a, t]),
        t.isLocal ? t.isE2EEEnabled : !!(null != t && t.isEncrypted),
      );
    },
    "n",
    0,
    function (e, n, t = {}) {
      let a = t.gridLayouts ?? o.G,
        { width: r, height: s } = c(e),
        l = (0, o.n)(a, n, r, s);
      return (
        i.useEffect(() => {
          e.current &&
            l &&
            (e.current.style.setProperty(
              "--lk-col-count",
              null == l ? void 0 : l.columns.toString(),
            ),
            e.current.style.setProperty(
              "--lk-row-count",
              null == l ? void 0 : l.rows.toString(),
            ));
        }, [e, l]),
        { layout: l, containerWidth: r, containerHeight: s }
      );
    },
    "o",
    0,
    function (e, n) {
      let [t, a] = i.useState(1),
        r = Math.max(Math.ceil(n.length / e), 1);
      t > r && a(r);
      let o = t * e,
        s = o - e,
        l = (e) => {
          a((n) =>
            "next" === e ? (n === r ? n : n + 1) : 1 === n ? n : n - 1,
          );
        },
        c = h(n, e).slice(s, o);
      return {
        totalPageCount: r,
        nextPage: () => l("next"),
        prevPage: () => l("previous"),
        setPage: (e) => {
          e > r ? a(r) : e < 1 ? a(1) : a(e);
        },
        firstItemIndex: s,
        lastItemIndex: o,
        tracks: c,
        currentPage: t,
      };
    },
    "p",
    0,
    function (e, n = {}) {
      let t = i.useRef(null),
        a = i.useRef(null),
        r = n.minSwipeDistance ?? 50,
        o = (e) => {
          ((a.current = null), (t.current = e.targetTouches[0].clientX));
        },
        s = (e) => {
          a.current = e.targetTouches[0].clientX;
        },
        l = i.useCallback(() => {
          if (!t.current || !a.current) return;
          let e = t.current - a.current,
            i = e > r,
            o = e < -r;
          (i && n.onLeftSwipe && n.onLeftSwipe(),
            o && n.onRightSwipe && n.onRightSwipe());
        }, [r, n]);
      i.useEffect(() => {
        let n = e.current;
        return (
          n &&
            (n.addEventListener("touchstart", o, { passive: !0 }),
            n.addEventListener("touchmove", s, { passive: !0 }),
            n.addEventListener("touchend", l, { passive: !0 })),
          () => {
            n &&
              (n.removeEventListener("touchstart", o),
              n.removeEventListener("touchmove", s),
              n.removeEventListener("touchend", l));
          }
        );
      }, [e, l]);
    },
    "q",
    0,
    c,
    "r",
    0,
    h,
    "s",
    0,
    function (e, n = {}) {
      var t;
      let a =
          e instanceof l.Track
            ? e
            : null == (t = null == e ? void 0 : e.publication)
              ? void 0
              : t.track,
        r = { ...k, ...n },
        [o, s] = i.useState(Array(r.bands).fill(0));
      return (
        i.useEffect(() => {
          if (!a || !(null != a && a.mediaStream))
            return void s((e) => e.slice().fill(0));
          let { analyser: e, cleanup: t } = (0, l.createAudioAnalyser)(
              a,
              r.analyserOptions,
            ),
            i = new Float32Array(e.frequencyBinCount),
            o = setInterval(() => {
              e.getFloatFrequencyData(i);
              let t = new Float32Array(i.length);
              for (let e = 0; e < i.length; e++) t[e] = i[e];
              let a = (t = t.slice(n.loPass, n.hiPass)).map((e) =>
                  -1 / 0 === e
                    ? 0
                    : Math.sqrt(
                        1 - (-1 * Math.max(-100, Math.min(-10, e))) / 100,
                      ),
                ),
                o = Math.ceil(a.length / r.bands),
                l = [];
              for (let e = 0; e < r.bands; e++) {
                let n = a
                  .slice(e * o, (e + 1) * o)
                  .reduce((e, n) => (e += n), 0);
                l.push(n / o);
              }
              s(l);
            }, r.updateInterval);
          return () => {
            (t(), clearInterval(o));
          };
        }, [a, null == a ? void 0 : a.mediaStream, JSON.stringify(n)]),
        o
      );
    },
    "t",
    0,
    function (
      e = [
        l.Track.Source.Camera,
        l.Track.Source.Microphone,
        l.Track.Source.ScreenShare,
        l.Track.Source.ScreenShareAudio,
        l.Track.Source.Unknown,
      ],
      n = {},
    ) {
      let t = (0, o.u)(n.room),
        [a, r] = i.useState([]),
        [s, c] = i.useState([]),
        u = i.useMemo(
          () => e.map((e) => ((0, o.U)(e) ? e.source : e)),
          [JSON.stringify(e)],
        );
      return (
        i.useEffect(() => {
          let e = (0, o.V)(t, u, {
            additionalRoomEvents: n.updateOnlyOn,
            onlySubscribed: n.onlySubscribed,
          }).subscribe(({ trackReferences: e, participants: n }) => {
            (o.l.debug("setting track bundles", e, n), r(e), c(n));
          });
          return () => e.unsubscribe();
        }, [
          t,
          JSON.stringify(n.onlySubscribed),
          JSON.stringify(n.updateOnlyOn),
          JSON.stringify(e),
        ]),
        i.useMemo(() => {
          if (!(0, o.W)(e)) return a;
          {
            let n = (function (e, n) {
                let t = new Map();
                if ((0, o.W)(e)) {
                  let a = e
                    .filter((e) => e.withPlaceholder)
                    .map((e) => e.source);
                  n.forEach((e) => {
                    let n = e
                        .getTrackPublications()
                        .map((e) => {
                          var n;
                          return null == (n = e.track) ? void 0 : n.source;
                        })
                        .filter((e) => void 0 !== e),
                      r = Array.from(
                        (function (e, n) {
                          let t = new Set(e);
                          for (let e of n) t.delete(e);
                          return t;
                        })(new Set(a), new Set(n)),
                      );
                    r.length > 0 && t.set(e.identity, r);
                  });
                }
                return t;
              })(e, s),
              t = Array.from(a);
            return (
              s.forEach((e) => {
                n.has(e.identity) &&
                  (n.get(e.identity) ?? []).forEach((n) => {
                    a.find(
                      ({ participant: t, publication: a }) =>
                        e.identity === t.identity && a.source === n,
                    ) ||
                      (o.l.debug(
                        `Add ${n} placeholder for participant ${e.identity}.`,
                      ),
                      t.push({ participant: e, source: n }));
                  });
              }),
              t
            );
          }
        }, [a, s, e])
      );
    },
    "u",
    0,
    function (e) {
      let { state: n, dispatch: t } = (0, o.a)().pin;
      return {
        buttonProps: i.useMemo(() => {
          let { className: a } = (0, o.b)();
          return (0, s.m)(e, {
            className: a,
            disabled: !(null != n && n.length),
            onClick: () => {
              t && t({ msg: "clear_pin" });
            },
          });
        }, [e, t, n]),
      };
    },
    "v",
    0,
    function (e = {}) {
      let n = (0, o.u)(e.room),
        { name: t, metadata: a } = u(
          i.useMemo(() => (0, o.J)(n), [n]),
          { name: n.name, metadata: n.metadata },
        );
      return { name: t, metadata: a };
    },
    "w",
    0,
    function (e) {
      let n = (0, o.u)(null == e ? void 0 : e.room),
        t = d(n),
        a = i.useMemo(() => t === l.ConnectionState.Disconnected, [t]),
        r = i.useMemo(() => (0, o.Z)(n, e), [n, e, a]),
        s = u(r.isSendingObservable, !1),
        c = u(r.messageObservable, []);
      return { send: r.send, chatMessages: c, isSending: s };
    },
    "x",
    0,
    function (e = {}) {
      let [n, t] = i.useState((0, o._)(e.defaults, e.preventLoad ?? !1)),
        a = i.useCallback((e) => {
          t((n) => ({ ...n, audioEnabled: e }));
        }, []),
        r = i.useCallback((e) => {
          t((n) => ({ ...n, videoEnabled: e }));
        }, []),
        s = i.useCallback((e) => {
          t((n) => ({ ...n, audioDeviceId: e }));
        }, []),
        l = i.useCallback((e) => {
          t((n) => ({ ...n, videoDeviceId: e }));
        }, []),
        c = i.useCallback((e) => {
          t((n) => ({ ...n, username: e }));
        }, []);
      return (
        i.useEffect(() => {
          (0, o.$)(n, e.preventSave ?? !1);
        }, [n, e.preventSave]),
        {
          userChoices: n,
          saveAudioInputEnabled: a,
          saveVideoInputEnabled: r,
          saveAudioInputDeviceId: s,
          saveVideoInputDeviceId: l,
          saveUsername: c,
        }
      );
    },
    "y",
    0,
    function ({ kind: e, onError: n }) {
      return u(
        i.useMemo(() => (0, o.x)(e, n), [e, n]),
        [],
      );
    },
    "z",
    0,
    function (e) {
      let n = (e) => "u" > typeof window && window.matchMedia(e).matches,
        [t, a] = i.useState(n(e));
      function r() {
        a(n(e));
      }
      return (
        i.useEffect(() => {
          let n = window.matchMedia(e);
          return (
            r(),
            n.addListener ? n.addListener(r) : n.addEventListener("change", r),
            () => {
              n.removeListener
                ? n.removeListener(r)
                : n.removeEventListener("change", r);
            }
          );
        }, [e]),
        t
      );
    },
  ]);
};
