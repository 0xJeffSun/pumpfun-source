// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "Z",
    0,
    (e) => ("bridge" === e ? { rail: "bridge" } : {}),
    "O",
    0,
    (e) => (e ? "bridge" : void 0),
    "A",
    0,
    (e) => (e ? { rail: "bridge", swapId: crypto.randomUUID() } : void 0),
    "W",
    0,
    (e) => e ?? "relay",
  ]);
};
