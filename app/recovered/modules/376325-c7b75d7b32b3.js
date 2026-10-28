// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e) =>
      "object" == typeof e &&
      null !== e &&
      "name" in e &&
      "AbortError" === e.name
        ? "aborted"
        : e instanceof TypeError
          ? "network"
          : "other",
  ]);
};
