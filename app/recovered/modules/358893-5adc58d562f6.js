// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(628127);
  let r = (e) => !0 === e,
    i = (e) => !1 !== e,
    s = (0, t.f)({
      name: "user-settings",
      fields: {
        includeNsfw: { default: !1, coerce: r },
        hidePersonalInfo: { default: !1, coerce: r },
        showProfileAdminControls: { default: !0, coerce: i },
        showCoinAdminControls: { default: !0, coerce: i },
        hideCoinStreamReplay: { default: !1, coerce: r },
      },
      extra: (e) => ({
        toggleNsfw: () => e((e) => ({ includeNsfw: !e.includeNsfw })),
        toggleHidePersonalInfo: () =>
          e((e) => ({ hidePersonalInfo: !e.hidePersonalInfo })),
        setShowProfileAdminControls: (t) => e({ showProfileAdminControls: t }),
        setShowCoinAdminControls: (t) => e({ showCoinAdminControls: t }),
        setHideCoinStreamReplay: (t) => e({ hideCoinStreamReplay: t }),
      }),
    });
  e.s([
    "V",
    0,
    "••••••••",
    "u",
    0,
    () => s((e) => e.hideCoinStreamReplay),
    "L",
    0,
    () => s((e) => e.hidePersonalInfo),
    "M",
    0,
    () => s((e) => e.includeNsfw),
    "q",
    0,
    () => s((e) => e.setHideCoinStreamReplay),
    "s",
    0,
    () => s((e) => e.showCoinAdminControls),
    "X",
    0,
    () => s((e) => e.showProfileAdminControls),
    "C",
    0,
    () => s((e) => e.toggleHidePersonalInfo),
    "O",
    0,
    () => s((e) => e.toggleNsfw),
    "W",
    0,
    s,
  ]);
};
