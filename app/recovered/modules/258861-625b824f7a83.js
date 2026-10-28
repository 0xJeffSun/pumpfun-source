// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(137886);
  let r = "pump-referral-pending-code";
  e.s([
    "s",
    0,
    (e, n = "vanity_link") => {
      let i = (0, t.H)({ username: e });
      if (!i) return !1;
      let a = { code: i, source: n, capturedAt: new Date().toISOString() };
      try {
        return (localStorage.setItem(r, JSON.stringify(a)), !0);
      } catch {
        return !1;
      }
    },
    "S",
    0,
    () => {
      try {
        localStorage.removeItem(r);
      } catch {}
    },
    "t",
    0,
    () => {
      try {
        let e = localStorage.getItem(r);
        if (!e) return null;
        let n = JSON.parse(e);
        if (
          "object" != typeof n ||
          null === n ||
          "string" != typeof n.code ||
          "vanity_link" !== n.source ||
          "string" != typeof n.capturedAt
        )
          return (localStorage.removeItem(r), null);
        let i = Date.parse(n.capturedAt);
        if (Number.isNaN(i) || Date.now() - i > 2592e6)
          return (localStorage.removeItem(r), null);
        let a = (0, t.H)({ username: n.code });
        if (!a) return (localStorage.removeItem(r), null);
        return { code: a, source: n.source, capturedAt: n.capturedAt };
      } catch {
        return null;
      }
    },
  ]);
};
