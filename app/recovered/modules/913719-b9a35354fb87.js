// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "x",
    0,
    (e, t, r) => {
      let n = BigInt(10) ** BigInt(t),
        i = e / n,
        l = (e % n)
          .toString()
          .padStart(t, "0")
          .slice(0, Math.max(0, r))
          .replace(/0+$/, ""),
        a = l ? `${i}.${l}` : i.toString();
      return "0" === a ? "" : a;
    },
    "N",
    0,
    function (e, t, r = 6) {
      let n;
      try {
        n = "bigint" == typeof e ? e : BigInt(e);
      } catch {
        return "0";
      }
      let i = n < BigInt(0),
        l = i ? -n : n,
        a = BigInt(10) ** BigInt(t),
        s = (l % a)
          .toString()
          .padStart(t, "0")
          .slice(0, Math.max(0, r))
          .replace(/0+$/, ""),
        o = (l / a).toLocaleString("en-US"),
        u = i ? "-" : "";
      return s ? `${u}${o}.${s}` : `${u}${o}`;
    },
    "f",
    0,
    (e) => {
      let t = e.includes(".") ? e.replace(/\.?0+$/, "") : e;
      return "" === t || "0" === t ? "" : t;
    },
    "v",
    0,
    function e(t, r) {
      let n = t.trim();
      if (!/^\d*\.?\d*$/.test(n) || "" === n || "." === n) return null;
      let [i = "", l = ""] = n.split(".");
      if (l.length > r) return e(`${i}.${l.slice(0, r)}`, r);
      let a = `${i}${l.padEnd(r, "0")}`;
      try {
        return BigInt("" === a ? "0" : a);
      } catch {
        return null;
      }
    },
  ]);
};
