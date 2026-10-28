// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(149502),
    t = e.i(352386),
    a = e.i(305288),
    r = e.i(484169);
  function i() {
    for (var e, n, t = 0, a = "", r = arguments.length; t < r; t++)
      (e = arguments[t]) &&
        (n = (function e(n) {
          var t,
            a,
            r = "";
          if ("string" == typeof n || "number" == typeof n) r += n;
          else if ("object" == typeof n)
            if (Array.isArray(n)) {
              var i = n.length;
              for (t = 0; t < i; t++)
                n[t] && (a = e(n[t])) && (r && (r += " "), (r += a));
            } else for (a in n) n[a] && (r && (r += " "), (r += a));
          return r;
        })(e)) &&
        (a && (a += " "), (a += n));
    return a;
  }
  function o(...e) {
    let n = { ...e[0] };
    for (let t = 1; t < e.length; t++) {
      let a = e[t];
      for (let e in a) {
        let t = n[e],
          r = a[e];
        "function" == typeof t &&
        "function" == typeof r &&
        "o" === e[0] &&
        "n" === e[1] &&
        e.charCodeAt(2) >= 65 &&
        90 >= e.charCodeAt(2)
          ? (n[e] = (function (...e) {
              return (...n) => {
                for (let t of e)
                  if ("function" == typeof t)
                    try {
                      t(...n);
                    } catch (e) {
                      console.error(e);
                    }
              };
            })(t, r))
          : ("className" === e || "UNSAFE_className" === e) &&
              "string" == typeof t &&
              "string" == typeof r
            ? (n[e] = i(t, r))
            : (n[e] = void 0 !== r ? r : t);
      }
    }
    return n;
  }
  function s(e) {
    return void 0 !== e;
  }
  function l(e, n) {
    return "processor" === e && n && "object" == typeof n && "name" in n
      ? n.name
      : "e2ee" === e && n
        ? "e2ee-enabled"
        : n;
  }
  let c = { connect: !0, audio: !1, video: !1 },
    u = t.forwardRef(function (e, n) {
      let { room: i, htmlProps: s } = (function (e) {
        let {
          token: n,
          serverUrl: i,
          options: s,
          room: u,
          connectOptions: d,
          connect: m,
          audio: p,
          video: f,
          screen: h,
          onConnected: g,
          onDisconnected: k,
          onError: T,
          onMediaDeviceFailure: v,
          onEncryptionError: y,
          simulateParticipants: b,
          ...E
        } = { ...c, ...e };
        s &&
          u &&
          a.l.warn(
            "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead.",
          );
        let [_, S] = t.useState(),
          w = t.useRef(m);
        t.useEffect(() => {
          S(u ?? new r.Room(s));
        }, [u, JSON.stringify(s, l)]);
        let I = t.useMemo(() => {
          let { className: e } = (0, a.s)();
          return o(E, { className: e });
        }, [E]);
        return (
          t.useEffect(() => {
            if (!_) return;
            let e = () => {
                let e = _.localParticipant;
                (a.l.debug("trying to publish local tracks"),
                  Promise.all([
                    e.setMicrophoneEnabled(
                      !!p,
                      "boolean" != typeof p ? p : void 0,
                    ),
                    e.setCameraEnabled(!!f, "boolean" != typeof f ? f : void 0),
                    e.setScreenShareEnabled(
                      !!h,
                      "boolean" != typeof h ? h : void 0,
                    ),
                  ]).catch((e) => {
                    (a.l.warn(e), null == T || T(e));
                  }));
              },
              n = (e, n) => {
                let t = r.MediaDeviceFailure.getFailure(e);
                null == v || v(t, n);
              },
              t = (e) => {
                null == y || y(e);
              },
              i = (e) => {
                null == k || k(e);
              },
              o = () => {
                null == g || g();
              };
            return (
              _.on(r.RoomEvent.SignalConnected, e)
                .on(r.RoomEvent.MediaDevicesError, n)
                .on(r.RoomEvent.EncryptionError, t)
                .on(r.RoomEvent.Disconnected, i)
                .on(r.RoomEvent.Connected, o),
              () => {
                _.off(r.RoomEvent.SignalConnected, e)
                  .off(r.RoomEvent.MediaDevicesError, n)
                  .off(r.RoomEvent.EncryptionError, t)
                  .off(r.RoomEvent.Disconnected, i)
                  .off(r.RoomEvent.Connected, o);
              }
            );
          }, [_, p, f, h, T, y, v, g, k]),
          t.useEffect(() => {
            if (_) {
              if (b)
                return void _.simulateParticipants({
                  participants: { count: b },
                  publish: { audio: !0, useRealTracks: !0 },
                });
              if (m) {
                if (((w.current = !0), a.l.debug("connecting"), !n))
                  return void a.l.debug("no token yet");
                if (!i) {
                  (a.l.warn("no livekit url provided"),
                    null == T || T(Error("no livekit url provided")));
                  return;
                }
                _.connect(i, n, d).catch((e) => {
                  (a.l.warn(e), !0 === w.current && (null == T || T(e)));
                });
              } else
                (a.l.debug("disconnecting because connect is false"),
                  (w.current = !1),
                  _.disconnect());
            }
          }, [m, n, JSON.stringify(d), _, T, i, b]),
          t.useEffect(() => {
            if (_)
              return () => {
                (a.l.info("disconnecting on onmount"), _.disconnect());
              };
          }, [_]),
          { room: _, htmlProps: I }
        );
      })(e);
      return t.createElement(
        "div",
        { ref: n, ...s },
        i &&
          t.createElement(
            a.R.Provider,
            { value: i },
            t.createElement(
              a.L.Provider,
              { value: e.featureFlags },
              e.children,
            ),
          ),
      );
    });
  e.s([
    "L",
    0,
    u,
    "a",
    0,
    function (...e) {
      return o(...e.filter(s));
    },
    "c",
    0,
    function (e, n, a) {
      return t.Children.map(e, (r) =>
        t.isValidElement(r) && t.Children.only(e)
          ? (r.props.className &&
              (n ?? (n = {}),
              (n.className = i(r.props.className, n.className)),
              (n.style = { ...r.props.style, ...n.style })),
            t.cloneElement(r, { ...n, key: a }))
          : r,
      );
    },
    "m",
    0,
    o,
    "r",
    0,
    l,
    "w",
    0,
    function (e) {
      var t, r;
      if (
        "u" > typeof window &&
        "u" > typeof n.default &&
        ((null == (t = null == n.default ? void 0 : n.default.env)
          ? void 0
          : t.NODE_ENV) === "dev" ||
          (null == (r = null == n.default ? void 0 : n.default.env)
            ? void 0
            : r.NODE_ENV) === "development")
      ) {
        let e = document.querySelector(".lk-room-container");
        e &&
          !getComputedStyle(e).getPropertyValue("--lk-has-imported-styles") &&
          a.l.warn(
            "It looks like you're not using the `@livekit/components-styles package`. To render the UI with the default styling, please import it in your layout or page.",
          );
      }
    },
  ]);
};
