// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "competitions";
  e.s([
    "f",
    0,
    {
      all: [t],
      list: (e) => [t, "list", e],
      detail: (e, r) => [t, "detail", e, r],
      details: [t, "detail"],
      tosAccept: [t, "tos-accept"],
      entry: (e, r) => [t, "entry", e, r],
      entryPositions: (e, r) => [t, "entry-positions", e, r],
      highlights: (e, r) => [t, "highlights", e, r],
      highlightMedia: (e) => [t, "highlight-media", e],
    },
  ]);
};
