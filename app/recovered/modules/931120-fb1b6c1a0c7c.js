// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => f], 931120);
  var t = e.i(359702),
    i = e.i(450314),
    s = e.i(142792),
    r = e.i(376744),
    a = e.i(683767),
    n = e.i(656976),
    o = e.i(770924),
    c = e.i(191529);
  let l = (0, t.s)({ message: "", variant: "info", open: !1 }),
    h = {
      state: l,
      subscribeKey: (e, t) => (0, o.T)(l, e, t),
      open(e, t) {
        let { debug: i } = c.f.state,
          { shortMessage: s, longMessage: r } = e;
        (i && ((l.message = s), (l.variant = t), (l.open = !0)),
          r && console.error("function" == typeof r ? r() : r));
      },
      close() {
        ((l.open = !1), (l.message = ""), (l.variant = "info"));
      },
    };
  e.s(["f", 0, h], 578108);
  let u = r.f.getAnalyticsUrl(),
    d = new a.f({ baseUrl: u, clientId: null }),
    p = ["MODAL_CREATED"],
    g = (0, t.s)({
      timestamp: Date.now(),
      reportedErrors: {},
      data: { type: "track", event: "MODAL_CREATED" },
    }),
    f = {
      state: g,
      subscribe: (e) => (0, t.i)(g, () => e(g)),
      getSdkProperties() {
        let { projectId: e, sdkType: t, sdkVersion: i } = c.f.state;
        return { projectId: e, st: t, sv: i || "html-wagmi-4.2.2" };
      },
      async _sendAnalyticsEvent(e) {
        try {
          let t = n.f.state.address;
          if (p.includes(e.data.event) || "u" < typeof window) return;
          (await d.post({
            path: "/e",
            params: f.getSdkProperties(),
            body: {
              eventId: r.f.getUUID(),
              url: window.location.href,
              domain: window.location.hostname,
              timestamp: e.timestamp,
              props: { ...e.data, address: t },
            },
          }),
            (g.reportedErrors.FORBIDDEN = !1));
        } catch (e) {
          e instanceof Error &&
            e.cause instanceof Response &&
            e.cause.status === i.f.HTTP_STATUS_CODES.FORBIDDEN &&
            !g.reportedErrors.FORBIDDEN &&
            (h.open(
              {
                shortMessage: "Invalid App Configuration",
                longMessage: `Origin ${(0, s.v)() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`,
              },
              "error",
            ),
            (g.reportedErrors.FORBIDDEN = !0));
        }
      },
      sendEvent(e) {
        ((g.timestamp = Date.now()),
          (g.data = e),
          c.f.state.features?.analytics && f._sendAnalyticsEvent(g));
      },
    };
};
