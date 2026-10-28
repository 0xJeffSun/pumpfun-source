// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(986071),
    r = e.i(409355);
  let n = "bounties:lastExploreHref",
    i = [
      t.f.BOUNTIES_EXPLORE.Q,
      t.f.BOUNTIES_EXPLORE.STATUS,
      t.f.BOUNTIES_EXPLORE.SUBMISSION_STATUS,
      t.f.BOUNTIES_EXPLORE.TOKENS,
      t.f.BOUNTIES_EXPLORE.TIME_LEFT,
      t.f.BOUNTIES_EXPLORE.REWARD_MIN,
      t.f.BOUNTIES_EXPLORE.REWARD_MAX,
      t.f.BOUNTIES_EXPLORE.SORT,
      t.f.BOUNTIES_EXPLORE.ORDER,
      t.f.BOUNTIES_EXPLORE.VIEW,
    ],
    s = { label: "Bounties", href: r.b },
    a = { label: "Submissions", href: r.W };
  e.s([
    "a",
    0,
    (e, t = r.b) => ({ label: "Bounties", href: t }),
    "R",
    0,
    s,
    "p",
    0,
    a,
    "n",
    0,
    (e) => {
      let t = new URLSearchParams();
      for (let r of i)
        for (let n of e?.getAll(r) ?? []) 0 !== n.length && t.append(r, n);
      let n = t.toString();
      return n.length > 0 ? `${r.b}?${n}` : r.b;
    },
    "_",
    0,
    (e) => {
      e === r.b
        ? window.sessionStorage.removeItem(n)
        : window.sessionStorage.setItem(n, e);
    },
    "A",
    0,
    () => {
      let e = window.sessionStorage.getItem(n);
      return e && e.startsWith(r.b) ? e : r.b;
    },
  ]);
};
