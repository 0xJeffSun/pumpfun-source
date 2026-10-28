// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.isApiScope = r.API_SCOPES = void 0),
    (r.API_SCOPES = [
      "profiles.read",
      "graph.read",
      "content.read",
      "leaderboards.read",
      "positions.read",
      "moderation.read",
    ]),
    (r.isApiScope = (e) => r.API_SCOPES.includes(e)));
};
