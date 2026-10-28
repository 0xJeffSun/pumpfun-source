// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "pump:open-settings";
  e.s([
    "O",
    0,
    t,
    "v",
    0,
    (e) => {
      let r = new URL(window.location.href);
      (r.searchParams.set("settings", e.section),
        e.settingId
          ? r.searchParams.set("setting", e.settingId)
          : r.searchParams.delete("setting"),
        window.history.replaceState(window.history.state, "", r),
        window.dispatchEvent(new CustomEvent(t, { detail: e })));
    },
  ]);
};
