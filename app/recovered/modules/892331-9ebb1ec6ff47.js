// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(613677),
    r = e.i(303413),
    r = r,
    n = e.i(342463);
  let i = t.z.object({
    getProfileUrl: r
      .function()
      .args(n.z.string())
      .returns(n.z.string())
      .default(() => (e) => `/profile/${encodeURIComponent(e)}`),
    getSessionId: r.function().returns(n.z.string()).optional(),
  });
  e.s(["f", 0, i], 892331);
};
