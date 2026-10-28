// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "Z",
      0,
      1e9,
      "f",
      0,
      9,
      "n",
      0,
      (e) => {
        let t = Math.floor(e / 1e9),
          r = String(Math.floor(e % 1e9))
            .padStart(9, "0")
            .replace(/0+$/, "");
        return "" === r ? String(t) : `${t}.${r}`;
      },
      "K",
      0,
      (e, t) => {
        let r = Math.max(0, e - (t ? 0.3 : 99588e-8));
        return t ? r : Math.floor(1e9 * r + 1e-6) / 1e9;
      },
      "h",
      0,
      (e, t) => (e > 0 && t > 0 ? Math.floor((e / t) * 1e9) : 0),
    ],
    926556,
  );
  let t = /^\d*\.?\d*$/,
    r = (e, r) => {
      let n = e.trim();
      if ("" === n || "." === n || !t.test(n)) return "0";
      let [i = "", l = ""] = n.split("."),
        a = `${i}${l.slice(0, r).padEnd(r, "0")}`.replace(/^0+(?=\d)/, "");
      return "" === a ? "0" : a;
    };
  e.s(
    [
      "Q",
      0,
      2,
      "K",
      0,
      6,
      "e",
      0,
      ({ positionUsd: e, leverage: t }) =>
        e > 0 && t > 0 ? String(Math.floor((e / t) * 1e6 + 1e-6) / 1e6) : "",
      "B",
      0,
      (e) => {
        let t = Number(e);
        return Number.isFinite(t) && t > 0 ? t : 0;
      },
      "F",
      0,
      (e, t) => r(e, "usd" === t ? 6 : 9),
      "S",
      0,
      (e) =>
        Number.isFinite(e) && e > 0
          ? String(Math.floor(100 * e + 1e-6) / 100)
          : "",
      "w",
      0,
      (e) => r(e, 6),
    ],
    896545,
  );
};
