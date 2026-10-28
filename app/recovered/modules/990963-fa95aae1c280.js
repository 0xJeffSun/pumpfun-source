// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, { dir: t = "left" } = {}) {
      let r = "string" == typeof e ? e.replace("0x", "") : e,
        n = 0;
      for (let e = 0; e < r.length - 1; e++)
        if ("0" === r["left" === t ? e : r.length - e - 1].toString()) n++;
        else break;
      return ((r = "left" === t ? r.slice(n) : r.slice(0, r.length - n)),
      "string" == typeof e)
        ? (1 === r.length && "right" === t && (r = `${r}0`),
          `0x${r.length % 2 == 1 ? `0${r}` : r}`)
        : r;
    },
  ]);
};
