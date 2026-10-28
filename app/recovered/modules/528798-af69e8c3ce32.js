// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(322315),
    n = e.i(254010);
  e.s(["f", 0, () => (0, n.k)(t.D.WEB_HERMES_NOTIFICATIONS)], 528798);
  let i = {
    inbox: (e) => ["hermes-notifications", "inbox", e],
    settings: (e) => ["hermes-notifications", "settings", e],
    topics: (e) => ["hermes-notifications", "topics", e],
  };
  e.s(
    [
      "F",
      0,
      i,
      "O",
      0,
      ({ queryClient: e, viewer: t }) =>
        e.invalidateQueries({ queryKey: i.inbox(t) }),
    ],
    484018,
  );
};
