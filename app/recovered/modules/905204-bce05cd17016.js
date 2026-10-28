// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.publicRoutes = void 0),
    (r.publicRoutes = (e) =>
      Object.fromEntries(
        Object.entries(e)
          .filter((e) => "public" === e[1].visibility)
          .map(([e, t]) => [e, t.scope])
          .sort(([e], [t]) => (e < t ? -1 : +(e > t))),
      )));
};
