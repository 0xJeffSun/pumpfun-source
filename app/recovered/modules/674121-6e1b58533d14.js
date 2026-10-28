// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(876262),
    n = e.i(768359),
    r = e.i(431869),
    i = e.i(211670),
    l = e.i(58159),
    a = e.i(520669);
  e.s([
    "g",
    0,
    (e, r) => {
      (e.invalidateQueries({ queryKey: a.g.walletPrefix(r) }),
        e.invalidateQueries({ queryKey: l.f.walletPrefix(r) }),
        e.invalidateQueries({ queryKey: n.m.subject(r) }),
        e.invalidateQueries({ queryKey: t.Y.owner(r) }));
    },
    "r",
    0,
    (e, t, n) => {
      (e.invalidateQueries({ queryKey: i.V.token(t, n) }),
        e.invalidateQueries({ queryKey: i.V.batchPrefix(t) }),
        e.invalidateQueries({ queryKey: r.b.wallet(t, n) }));
    },
  ]);
};
