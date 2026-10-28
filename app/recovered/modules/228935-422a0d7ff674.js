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
      let n = e < BigInt(0),
        i = (n ? -e : e).toString().padStart(t + 1, "0"),
        r = i.slice(0, i.length - t),
        a = i.slice(i.length - t),
        s = Number(`${n ? "-" : ""}${r}.${a}`);
      return Number.isFinite(s) ? s : 0;
    },
  ]);
};
