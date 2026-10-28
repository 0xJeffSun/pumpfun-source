// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(536925);
  let n = (e) => e.userId?.trim() || e.address;
  e.s([
    "f",
    0,
    () => {
      let e,
        i,
        a,
        l,
        s = (0, t.c)(9);
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = []), (s[0] = e))
        : (e = s[0]);
      let [o, c] = (0, r.j)("recently-viewed-profiles", e);
      s[1] !== c
        ? ((i = (e) => {
            c((t) => {
              let r;
              return [
                (r = { ...e, viewedAt: Date.now() }),
                ...t.filter((e) => n(e) !== n(r)).slice(0, 9),
              ];
            });
          }),
          (s[1] = c),
          (s[2] = i))
        : (i = s[2]);
      let u = i;
      s[3] !== c
        ? ((a = () => {
            c([]);
          }),
          (s[3] = c),
          (s[4] = a))
        : (a = s[4]);
      let d = a;
      return (
        s[5] !== u || s[6] !== d || s[7] !== o
          ? ((l = [o, u, d]), (s[5] = u), (s[6] = d), (s[7] = o), (s[8] = l))
          : (l = s[8]),
        l
      );
    },
  ]);
};
