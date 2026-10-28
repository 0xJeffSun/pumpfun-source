// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e) => {
      let t =
        null === e
          ? []
          : e
              .split(",")
              .map((e) => e.trim().toLowerCase())
              .filter((e) => e.length > 0);
      if (!t.includes("no-store"))
        for (let e of t) {
          let [t, r] = e.split("=");
          if ("max-age" !== t || void 0 === r) continue;
          let a = Number(r);
          return Number.isFinite(a) && a >= 0 ? 1e3 * a : void 0;
        }
    },
  ]);
};
