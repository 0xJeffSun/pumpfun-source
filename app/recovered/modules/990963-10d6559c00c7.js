// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, { dir: t = "left" } = {}) {
      let a = "string" == typeof e ? e.replace("0x", "") : e,
        r = 0;
      for (let e = 0; e < a.length - 1; e++)
        if ("0" === a["left" === t ? e : a.length - e - 1].toString()) r++;
        else break;
      return ((a = "left" === t ? a.slice(r) : a.slice(0, a.length - r)),
      "string" == typeof e)
        ? (1 === a.length && "right" === t && (a = `${a}0`),
          `0x${a.length % 2 == 1 ? `0${a}` : a}`)
        : a;
    },
  ]);
};
