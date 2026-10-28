// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "https://img.phygitals.com",
    r = [`${t}/`, "https://gateway.irys.xyz/"],
    n = "-cropped",
    i = 512,
    a = (e, a = i) => {
      let l = ((e) => {
        let t = r.find((t) => e.startsWith(t));
        if (void 0 === t) return;
        let i = e.slice(t.length);
        if (!("" === i || i.includes("/") || i.includes("?")))
          return i.endsWith(n) ? i.slice(0, -n.length) : i;
      })(e);
      if (void 0 === l) return e;
      let o = encodeURIComponent(`${t}/${l}${n}`);
      return `${t}/cdn-cgi/image/width=${a},quality=85,format=auto,fit=scale-down/${o}`;
    };
  e.s([
    "H",
    0,
    a,
    "G",
    0,
    (e, t) => {
      let r = t?.trim() ?? "";
      return "" === r ? null : "phygitals" === e ? a(r) : r;
    },
  ]);
};
