// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(181789);
  e.s([
    "f",
    0,
    function () {
      let e,
        i = (0, t.c)(1),
        { address: a, user: l } = (0, r.F)();
      if (l) return l.profile_image ?? void 0;
      if (!a) return;
      i[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, n.J)()), (i[0] = e))
        : (e = i[0]);
      let s = e;
      return s?.address === a ? (s.profileImage ?? void 0) : void 0;
    },
  ]);
};
