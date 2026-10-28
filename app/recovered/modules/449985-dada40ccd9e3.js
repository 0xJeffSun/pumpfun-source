// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "f",
    0,
    function (t, { dir: e = "left" } = {}) {
      let n = "string" == typeof t ? t.replace("0x", "") : t,
        i = 0;
      for (let t = 0; t < n.length - 1; t++)
        if ("0" === n["left" === e ? t : n.length - t - 1].toString()) i++;
        else break;
      return ((n = "left" === e ? n.slice(i) : n.slice(0, n.length - i)),
      "string" == typeof t)
        ? (1 === n.length && "right" === e && (n = `${n}0`),
          `0x${n.length % 2 == 1 ? `0${n}` : n}`)
        : n;
    },
  ]);
};
