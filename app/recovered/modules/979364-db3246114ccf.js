// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(439587),
    n = e.i(458310);
  e.i(12692);
  var r = e.i(398902),
    s = e.i(528798),
    l = e.i(32596);
  e.s([
    "NotificationPermissionPrompt",
    0,
    (e) => {
      let o,
        c,
        d,
        m,
        u,
        p,
        f,
        x,
        g,
        h,
        b = (0, i.c)(27),
        { className: y } = e,
        { t: v } = (0, r.f)(),
        {
          permission: w,
          isConfigured: _,
          isRegistering: k,
          enablePushNotifications: j,
        } = (0, l.y)();
      if (!(0, s.f)() || !_ || "granted" === w || "unsupported" === w)
        return null;
      let C = `flex flex-col gap-3 rounded-xl border border-border-secondary bg-bg-secondary p-4 ${y ?? ""}`;
      return (
        b[0] !== v
          ? ((o = v("web.notification_settings.enable_browser_notifications")),
            (b[0] = v),
            (b[1] = o))
          : (o = b[1]),
        b[2] !== o
          ? ((c = (0, t.jsx)("p", {
              className: "text-sm font-semibold text-text-primary",
              children: o,
            })),
            (b[2] = o),
            (b[3] = c))
          : (c = b[3]),
        b[4] !== v
          ? ((d = v(
              "web.notification_settings.enable_browser_notifications_description",
            )),
            (b[4] = v),
            (b[5] = d))
          : (d = b[5]),
        b[6] !== d
          ? ((m = (0, t.jsx)("p", {
              className: "mt-1 text-sm text-text-secondary",
              children: d,
            })),
            (b[6] = d),
            (b[7] = m))
          : (m = b[7]),
        b[8] !== c || b[9] !== m
          ? ((u = (0, t.jsxs)("div", { children: [c, m] })),
            (b[8] = c),
            (b[9] = m),
            (b[10] = u))
          : (u = b[10]),
        b[11] !== j || b[12] !== k || b[13] !== w || b[14] !== v
          ? ((p =
              "default" === w
                ? (0, t.jsx)(a.K, {
                    isDisabled: k,
                    onClick: () => void j(),
                    size: 32,
                    variant: "primary",
                    children: v(
                      k
                        ? "web.notification_settings.enabling"
                        : "web.notification_settings.enable_notifications",
                    ),
                  })
                : (0, t.jsx)("p", {
                    className: "text-sm text-text-secondary",
                    children: v("web.notification_settings.blocked_in_browser"),
                  })),
            (b[11] = j),
            (b[12] = k),
            (b[13] = w),
            (b[14] = v),
            (b[15] = p))
          : (p = b[15]),
        b[16] !== v
          ? ((f = v("notifications.settings.title")), (b[16] = v), (b[17] = f))
          : (f = b[17]),
        b[18] !== f
          ? ((x = (0, t.jsx)(n.default, {
              className:
                "inline-flex h-9 items-center justify-center rounded-xl border border-border-secondary px-3 text-sm font-semibold text-text-primary hover:bg-bg-secondary",
              href: "/settings/notifications",
              children: f,
            })),
            (b[18] = f),
            (b[19] = x))
          : (x = b[19]),
        b[20] !== p || b[21] !== x
          ? ((g = (0, t.jsxs)("div", {
              className: "flex flex-wrap gap-2",
              children: [p, x],
            })),
            (b[20] = p),
            (b[21] = x),
            (b[22] = g))
          : (g = b[22]),
        b[23] !== C || b[24] !== g || b[25] !== u
          ? ((h = (0, t.jsxs)("div", { className: C, children: [u, g] })),
            (b[23] = C),
            (b[24] = g),
            (b[25] = u),
            (b[26] = h))
          : (h = b[26]),
        h
      );
    },
  ]);
};
