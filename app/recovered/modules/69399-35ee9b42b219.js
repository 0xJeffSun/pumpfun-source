// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /^[A-Za-z0-9_]{1,15}$/,
    r = new Set(["create", "invitations"]),
    n = ({ groupId: e, username: n }) =>
      n && t.test(n) && !r.has(n.toLowerCase()) ? n : e;
  e.s(["Z", 0, (e) => `/squads/${encodeURIComponent(n(e))}`, "D", 0, n]);
};
