// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e, t, n) {
    if (!e) return "";
    let r = 4,
      i = 4;
    return ("number" == typeof t && "number" == typeof n
      ? ((r = t), (i = n))
      : t &&
        "object" == typeof t &&
        ((r = t.startLength ?? 4), (i = t.endLength ?? 4)),
    e.length <= r + i + 1)
      ? e
      : `${e.slice(0, r)}…${e.slice(-i)}`;
  }
  e.s([
    "V",
    0,
    (e, t, n) => (1 === n ? e : t),
    "J",
    0,
    (e) => (e.startsWith("0x") ? t(e, 6, 4) : t(e, 4, 4)),
    "d",
    0,
    t,
    "L",
    0,
    function (e, t) {
      let { maxWords: n, maxChars: r, ellipsis: i = "…" } = t,
        o = e.trim();
      if (!o) return "";
      let s = o;
      if (n > 0) {
        let e = o.split(/\s+/);
        e.length > n && (s = `${e.slice(0, n).join(" ")}${i}`);
      }
      if (void 0 !== r && s.length > r) {
        let e = Math.max(0, r - i.length);
        s = `${s.slice(0, e).trimEnd()}${i}`;
      }
      return s;
    },
  ]);
};
