// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, { dir: t = "left" } = {}) {
      let n = "string" == typeof e ? e.replace("0x", "") : e,
        r = 0;
      for (let e = 0; e < n.length - 1; e++)
        if ("0" === n["left" === t ? e : n.length - e - 1].toString()) r++;
        else break;
      return ((n = "left" === t ? n.slice(r) : n.slice(0, n.length - r)),
      "string" == typeof e)
        ? (1 === n.length && "right" === t && (n = `${n}0`),
          `0x${n.length % 2 == 1 ? `0${n}` : n}`)
        : n;
    },
  ]);
};
