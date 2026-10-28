// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      if (e === BigInt(0)) return 0;
      if (t <= 0) {
        let t = Number(e);
        return Number.isFinite(t) ? t : 0;
      }
      let l = e < BigInt(0),
        r = (l ? -e : e).toString().padStart(t + 1, "0"),
        n = r.slice(0, r.length - t),
        i = r.slice(r.length - t),
        a = Number(`${l ? "-" : ""}${n}.${i}`);
      return Number.isFinite(a) ? a : 0;
    },
  ]);
};
