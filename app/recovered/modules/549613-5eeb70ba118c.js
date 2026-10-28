// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "https://img.phygitals.com",
    a = [`${t}/`, "https://gateway.irys.xyz/"],
    i = "-cropped",
    n = 512,
    r = (e, r = n) => {
      let l = ((e) => {
        let t = a.find((t) => e.startsWith(t));
        if (void 0 === t) return;
        let n = e.slice(t.length);
        if (!("" === n || n.includes("/") || n.includes("?")))
          return n.endsWith(i) ? n.slice(0, -i.length) : n;
      })(e);
      if (void 0 === l) return e;
      let s = encodeURIComponent(`${t}/${l}${i}`);
      return `${t}/cdn-cgi/image/width=${r},quality=85,format=auto,fit=scale-down/${s}`;
    };
  e.s([
    "H",
    0,
    r,
    "G",
    0,
    (e, t) => {
      let a = t?.trim() ?? "";
      return "" === a ? null : "phygitals" === e ? r(a) : a;
    },
  ]);
};
