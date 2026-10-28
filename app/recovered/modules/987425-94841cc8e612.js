// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e) => {
      if ("string" != typeof e) return null;
      let t = e.trim();
      return /^\d+$/.test(t)
        ? `eip155:${t}`
        : /^eip155:\d+$/.test(t)
          ? t
          : null;
    },
  ]);
};
