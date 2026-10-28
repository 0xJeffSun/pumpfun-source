// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e) => {
      let t = 0;
      for (let r = 0; r < e.length; r++)
        ((t = e.charCodeAt(r) + ((t << 5) - t)), (t &= t));
      let r = ((t = Math.abs(t)) % 128) + 127,
        a = ((t >> 8) % 128) + 127,
        i = ((t >> 16) % 128) + 127;
      return `#${r.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}`;
    },
  ]);
};
