// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(536925);
  let i = (e) =>
      "object" == typeof e &&
      null !== e &&
      "string" == typeof e.nftAddress &&
      "string" == typeof e.name &&
      "number" == typeof e.viewedAt,
    a = (e) => (Array.isArray(e) ? e.filter(i) : []);
  e.s([
    "f",
    0,
    () => {
      let e,
        i,
        n,
        s,
        l,
        o = (0, t.c)(11);
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = []), (o[0] = e))
        : (e = o[0]);
      let [c, m] = (0, r.j)("recently-viewed-cards", e);
      o[1] !== c ? ((i = a(c)), (o[1] = c), (o[2] = i)) : (i = o[2]);
      let d = i;
      o[3] !== m
        ? ((n = (e) => {
            m((t) => {
              let r, i;
              return (
                (r = a(t)),
                [
                  (i = { ...e, viewedAt: Date.now() }),
                  ...r.filter((e) => e.nftAddress !== i.nftAddress),
                ].slice(0, 10)
              );
            });
          }),
          (o[3] = m),
          (o[4] = n))
        : (n = o[4]);
      let u = n;
      o[5] !== m
        ? ((s = () => {
            m([]);
          }),
          (o[5] = m),
          (o[6] = s))
        : (s = o[6]);
      let h = s;
      return (
        o[7] !== u || o[8] !== h || o[9] !== d
          ? ((l = [d, u, h]), (o[7] = u), (o[8] = h), (o[9] = d), (o[10] = l))
          : (l = o[10]),
        l
      );
    },
  ]);
};
