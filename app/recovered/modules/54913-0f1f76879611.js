// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    return null === e ? "null" : Array.isArray(e) ? "array" : typeof e;
  }
  function n(
    e,
    r,
    i = (function () {
      if ("u" > typeof WeakSet) {
        let e = new WeakSet();
        return {
          hasAlreadyBeenSeen(t) {
            let n = e.has(t);
            return (n || e.add(t), n);
          },
        };
      }
      let e = [];
      return {
        hasAlreadyBeenSeen(t) {
          let n = e.indexOf(t) >= 0;
          return (n || e.push(t), n);
        },
      };
    })(),
  ) {
    if (void 0 === r) return e;
    if ("object" != typeof r || null === r) return r;
    if (r instanceof Date) return new Date(r.getTime());
    if (r instanceof RegExp) {
      let e =
        r.flags ||
        [
          r.global ? "g" : "",
          r.ignoreCase ? "i" : "",
          r.multiline ? "m" : "",
          r.sticky ? "y" : "",
          r.unicode ? "u" : "",
        ].join("");
      return new RegExp(r.source, e);
    }
    if (i.hasAlreadyBeenSeen(r)) return;
    if (Array.isArray(r)) {
      let t = Array.isArray(e) ? e : [];
      for (let e = 0; e < r.length; ++e) t[e] = n(t[e], r[e], i);
      return t;
    }
    let o = "object" === t(e) ? e : {};
    for (let e in r)
      Object.prototype.hasOwnProperty.call(r, e) && (o[e] = n(o[e], r[e], i));
    return o;
  }
  (e.s(["f", 0, t], 970961),
    e.s(
      [
        "i",
        0,
        function (...e) {
          let t;
          for (let r of e) null != r && (t = n(t, r));
          return t;
        },
        "F",
        0,
        function (e) {
          return n(void 0, e);
        },
      ],
      54913,
    ));
  var r = e.i(63794);
  function i() {
    let e = (0, r.K)().DatadogEventBridge;
    if (e)
      return {
        getCapabilities() {
          var t;
          return JSON.parse(
            (null == (t = e.getCapabilities) ? void 0 : t.call(e)) || "[]",
          );
        },
        getPrivacyLevel() {
          var t;
          return null == (t = e.getPrivacyLevel) ? void 0 : t.call(e);
        },
        getAllowedWebViewHosts: () => JSON.parse(e.getAllowedWebViewHosts()),
        send(t, n, r) {
          e.send(
            JSON.stringify({
              eventType: t,
              event: n,
              view: r ? { id: r } : void 0,
            }),
          );
        },
      };
  }
  (e.s(
    [
      "f",
      0,
      function () {
        var e;
        let t = r.P.navigator;
        return {
          status: t.onLine ? "connected" : "not_connected",
          interfaces:
            t.connection && t.connection.type ? [t.connection.type] : void 0,
          effective_type: null == (e = t.connection) ? void 0 : e.effectiveType,
        };
      },
    ],
    654518,
  ),
    e.s(
      [
        "S",
        0,
        function (e) {
          let t = i();
          return !!t && t.getCapabilities().includes(e);
        },
        "K",
        0,
        function (e) {
          var t;
          void 0 === e &&
            (e = null == (t = (0, r.K)().location) ? void 0 : t.hostname);
          let n = i();
          return (
            !!n &&
            n
              .getAllowedWebViewHosts()
              .some((t) => e === t || e.endsWith(`.${t}`))
          );
        },
        "g",
        0,
        i,
      ],
      715363,
    ));
  var o = e.i(526658),
    s = e.i(433710);
  e.s(
    [
      "f",
      0,
      function ({
        messagesLimit: e,
        bytesLimit: t,
        durationLimit: n,
        pageMayExitObservable: r,
        sessionExpireObservable: i,
      }) {
        let u,
          a = r.subscribe((e) => p(e.reason)),
          l = i.subscribe(() => p("session_expire")),
          c = new o.S(() => () => {
            (a.unsubscribe(), l.unsubscribe());
          }),
          d = 0,
          f = 0;
        function p(e) {
          if (0 === f) return;
          let t = f,
            n = d;
          ((f = 0),
            (d = 0),
            g(),
            c.notify({ reason: e, messagesCount: t, bytesCount: n }));
        }
        function g() {
          ((0, s.z)(u), (u = void 0));
        }
        return {
          flushObservable: c,
          get messagesCount() {
            return f;
          },
          notifyBeforeAddMessage(e) {
            (d + e >= t && p("bytes_limit"),
              (f += 1),
              (d += e),
              void 0 === u &&
                (u = (0, s.Q)(() => {
                  p("duration_limit");
                }, n)));
          },
          notifyAfterAddMessage(n = 0) {
            ((d += n),
              f >= e ? p("messages_limit") : d >= t && p("bytes_limit"));
          },
          notifyAfterRemoveMessage(e) {
            ((d -= e), 0 == (f -= 1) && g());
          },
        };
      },
    ],
    181349,
  );
};
