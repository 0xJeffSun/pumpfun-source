// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n;
  var i = e.i(254667),
    r = e.i(896342),
    s = e.i(526317);
  let o = (e) => (e instanceof Error ? e.message : String(e)),
    a = (e) => {
      let t;
      if ("string" != typeof e) return;
      try {
        t = JSON.parse(e);
      } catch {
        return;
      }
      let n = s.$.safeParse(t);
      return n.success ? n.data : void 0;
    };
  e.s(
    [
      "r",
      0,
      () => {
        let e, t, n, s;
        if (!(0, r._)() || "u" < typeof WebSocket) return null;
        let l = (0, r.z)(),
          d = performance.now();
        try {
          e = new WebSocket(l);
        } catch (e) {
          return (
            i.y.warn("[bridgeIntentFeed] open_failed", { error_message: o(e) }),
            null
          );
        }
        let u = !1,
          c = (e) => {
            if (n)
              try {
                n(e);
              } catch (t) {
                i.y.warn("[bridgeIntentFeed] listener_failed", {
                  intent_id: e.intent_id,
                  intent_status: e.status,
                  error_message: o(t),
                });
              }
          };
        return (
          (e.onopen = () => {
            ((t ??= performance.now() - d),
              i.y.info("[bridgeIntentFeed] open", { open_ms: Math.round(t) }));
          }),
          (e.onmessage = (e) => {
            if (u) return;
            let t = a(e.data);
            t && ((s = t), c(t));
          }),
          (e.onerror = () => {
            u ||
              ((u = !0),
              i.y.warn("[bridgeIntentFeed] error", { opened: void 0 !== t }));
          }),
          (e.onclose = (e) => {
            u ||
              ((u = !0),
              i.y.info("[bridgeIntentFeed] closed_by_peer", {
                code: e.code,
                reason: e.reason,
                opened: void 0 !== t,
              }));
          }),
          {
            listen: (e) => {
              ((n = e), s && !u && c(s));
            },
            close: () => {
              if (!u) {
                u = !0;
                try {
                  e.close();
                } catch (e) {
                  i.y.warn("[bridgeIntentFeed] close_failed", {
                    error_message: o(e),
                  });
                  return;
                }
                i.y.info("[bridgeIntentFeed] closed", { opened: void 0 !== t });
              }
            },
            openedAt: d,
            socketOpenMs: () => t,
            live: () => !u,
          }
        );
      },
      "o",
      0,
      a,
    ],
    618119,
  );
  let l = (e) => (e instanceof Error ? e.message : String(e)),
    d = null,
    u = !1,
    c = (e, t) => {
      if (e.listener)
        try {
          e.listener(t);
        } catch (e) {
          i.y.warn("[bridgeIntentFeedPool] listener_failed", {
            intent_id: t.intent_id,
            intent_status: t.status,
            error_message: l(e),
          });
        }
    },
    _ = (e, t, n) => {
      if (d !== e) return;
      ((d = null),
        (u = !0),
        void 0 !== e.lifetime && clearTimeout(e.lifetime),
        window.removeEventListener("pagehide", e.onPageHide));
      let r = {
        reason: t,
        opened: void 0 !== e.openedAt,
        listeners: e.slots.size,
        age_ms: Math.round(performance.now() - e.dialledAt),
      };
      if ((e.slots.clear(), "peer" !== t))
        try {
          e.socket.close();
        } catch (e) {
          i.y.warn("[bridgeIntentFeedPool] close_failed", {
            ...r,
            error_message: l(e),
          });
          return;
        }
      "error" === t
        ? i.y.warn("[bridgeIntentFeedPool] error", r)
        : i.y.info("[bridgeIntentFeedPool] closed", {
            ...r,
            code: n?.code,
            close_reason: n?.reason,
          });
    };
  e.s(
    [
      "o",
      0,
      () => {
        if (u) return null;
        null === d &&
          ((n = t),
          (d = (() => {
            let e;
            if (!(0, r._)() || "u" < typeof WebSocket) return null;
            let t = (0, r.z)(),
              n = performance.now();
            try {
              e = new WebSocket(t);
            } catch (e) {
              return (
                (u = !0),
                i.y.warn("[bridgeIntentFeedPool] open_failed", {
                  error_message: l(e),
                }),
                null
              );
            }
            let s = {
              socket: e,
              dialledAt: n,
              openedAt: void 0,
              lastEvent: void 0,
              slots: new Set(),
              lifetime: void 0,
              onPageHide: () => _(s, "unload"),
            };
            return (
              (e.onopen = () => {
                void 0 === s.openedAt &&
                  ((s.openedAt = performance.now()),
                  (s.lifetime = setTimeout(() => _(s, "lifetime"), 18e5)),
                  i.y.info("[bridgeIntentFeedPool] open", {
                    open_ms: Math.round(s.openedAt - n),
                  }));
              }),
              (e.onmessage = (e) => {
                if (d !== s) return;
                let t = a(e.data);
                if (t) for (let e of ((s.lastEvent = t), s.slots)) c(e, t);
              }),
              (e.onerror = () => _(s, "error")),
              (e.onclose = (e) => _(s, "peer", e)),
              window.addEventListener("pagehide", s.onPageHide),
              s
            );
          })()));
        let e = d;
        if (null === e) return null;
        let s = performance.now(),
          o = { listener: void 0, closed: !1 };
        return (
          e.slots.add(o),
          {
            listen: (t) => {
              !o.closed &&
                d === e &&
                ((o.listener = t), e.lastEvent && c(o, e.lastEvent));
            },
            close: () => {
              ((o.closed = !0), (o.listener = void 0), e.slots.delete(o));
            },
            openedAt: s,
            socketOpenMs: () =>
              d !== e || void 0 === e.openedAt
                ? void 0
                : Math.max(0, e.openedAt - s),
            live: () => d === e && !o.closed,
          }
        );
      },
      "k",
      0,
      (e) => {
        ((t = e), n !== e && (null !== d && _(d, "session"), (u = !1)));
      },
    ],
    203941,
  );
};
