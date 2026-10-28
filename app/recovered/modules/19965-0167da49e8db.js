// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  function l(e, t) {
    return { ...e, id: t.getId(e) };
  }
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.wrapWithFeedItem = l),
    (r.wrapItemsWithFeedItem = function (e, t) {
      return e.map((e) => l(e, t));
    }));
};
