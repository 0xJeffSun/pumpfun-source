// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, n;
  var r = e.i(254667),
    i = e.i(896342),
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
        if (!(0, i._)() || "u" < typeof WebSocket) return null;
        let l = (0, i.z)(),
          u = performance.now();
        try {
          e = new WebSocket(l);
        } catch (e) {
          return (
            r.y.warn("[bridgeIntentFeed] open_failed", { error_message: o(e) }),
            null
          );
        }
        let d = !1,
          c = (e) => {
            if (n)
              try {
                n(e);
              } catch (t) {
                r.y.warn("[bridgeIntentFeed] listener_failed", {
                  intent_id: e.intent_id,
                  intent_status: e.status,
                  error_message: o(t),
                });
              }
          };
        return (
          (e.onopen = () => {
            ((t ??= performance.now() - u),
              r.y.info("[bridgeIntentFeed] open", { open_ms: Math.round(t) }));
          }),
          (e.onmessage = (e) => {
            if (d) return;
            let t = a(e.data);
            t && ((s = t), c(t));
          }),
          (e.onerror = () => {
            d ||
              ((d = !0),
              r.y.warn("[bridgeIntentFeed] error", { opened: void 0 !== t }));
          }),
          (e.onclose = (e) => {
            d ||
              ((d = !0),
              r.y.info("[bridgeIntentFeed] closed_by_peer", {
                code: e.code,
                reason: e.reason,
                opened: void 0 !== t,
              }));
          }),
          {
            listen: (e) => {
              ((n = e), s && !d && c(s));
            },
            close: () => {
              if (!d) {
                d = !0;
                try {
                  e.close();
                } catch (e) {
                  r.y.warn("[bridgeIntentFeed] close_failed", {
                    error_message: o(e),
                  });
                  return;
                }
                r.y.info("[bridgeIntentFeed] closed", { opened: void 0 !== t });
              }
            },
            openedAt: u,
            socketOpenMs: () => t,
            live: () => !d,
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
    u = null,
    d = !1,
    c = (e, t) => {
      if (e.listener)
        try {
          e.listener(t);
        } catch (e) {
          r.y.warn("[bridgeIntentFeedPool] listener_failed", {
            intent_id: t.intent_id,
            intent_status: t.status,
            error_message: l(e),
          });
        }
    },
    f = (e, t, n) => {
      if (u !== e) return;
      ((u = null),
        (d = !0),
        void 0 !== e.lifetime && clearTimeout(e.lifetime),
        window.removeEventListener("pagehide", e.onPageHide));
      let i = {
        reason: t,
        opened: void 0 !== e.openedAt,
        listeners: e.slots.size,
        age_ms: Math.round(performance.now() - e.dialledAt),
      };
      if ((e.slots.clear(), "peer" !== t))
        try {
          e.socket.close();
        } catch (e) {
          r.y.warn("[bridgeIntentFeedPool] close_failed", {
            ...i,
            error_message: l(e),
          });
          return;
        }
      "error" === t
        ? r.y.warn("[bridgeIntentFeedPool] error", i)
        : r.y.info("[bridgeIntentFeedPool] closed", {
            ...i,
            code: n?.code,
            close_reason: n?.reason,
          });
    };
  e.s(
    [
      "o",
      0,
      () => {
        if (d) return null;
        null === u &&
          ((n = t),
          (u = (() => {
            let e;
            if (!(0, i._)() || "u" < typeof WebSocket) return null;
            let t = (0, i.z)(),
              n = performance.now();
            try {
              e = new WebSocket(t);
            } catch (e) {
              return (
                (d = !0),
                r.y.warn("[bridgeIntentFeedPool] open_failed", {
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
              onPageHide: () => f(s, "unload"),
            };
            return (
              (e.onopen = () => {
                void 0 === s.openedAt &&
                  ((s.openedAt = performance.now()),
                  (s.lifetime = setTimeout(() => f(s, "lifetime"), 18e5)),
                  r.y.info("[bridgeIntentFeedPool] open", {
                    open_ms: Math.round(s.openedAt - n),
                  }));
              }),
              (e.onmessage = (e) => {
                if (u !== s) return;
                let t = a(e.data);
                if (t) for (let e of ((s.lastEvent = t), s.slots)) c(e, t);
              }),
              (e.onerror = () => f(s, "error")),
              (e.onclose = (e) => f(s, "peer", e)),
              window.addEventListener("pagehide", s.onPageHide),
              s
            );
          })()));
        let e = u;
        if (null === e) return null;
        let s = performance.now(),
          o = { listener: void 0, closed: !1 };
        return (
          e.slots.add(o),
          {
            listen: (t) => {
              !o.closed &&
                u === e &&
                ((o.listener = t), e.lastEvent && c(o, e.lastEvent));
            },
            close: () => {
              ((o.closed = !0), (o.listener = void 0), e.slots.delete(o));
            },
            openedAt: s,
            socketOpenMs: () =>
              u !== e || void 0 === e.openedAt
                ? void 0
                : Math.max(0, e.openedAt - s),
            live: () => u === e && !o.closed,
          }
        );
      },
      "k",
      0,
      (e) => {
        ((t = e), n !== e && (null !== u && f(u, "session"), (d = !1)));
      },
    ],
    203941,
  );
};
