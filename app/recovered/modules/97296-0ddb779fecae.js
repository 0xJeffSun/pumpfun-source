// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /(https?:\/\/(?:[^\s"'(),;<>\]`]+|\([^\s"'(),;<>\]`]*\))+)/gi,
    r = /[!,.:;?]+$/;
  e.s([
    "f",
    0,
    (e) => {
      let a = [],
        n = 0;
      t.lastIndex = 0;
      let s = t.exec(e);
      for (; null !== s; ) {
        let i = s[0],
          o = s.index,
          l = o + i.length,
          u = i.match(r),
          c = u ? u[0] : "",
          d = c ? i.slice(0, -c.length) : i;
        (o > n && a.push({ kind: "text", text: e.slice(n, o) }),
          a.push({ kind: "link", text: d, url: d }),
          (n = l - c.length),
          (s = t.exec(e)));
      }
      return (n < e.length && a.push({ kind: "text", text: e.slice(n) }), a);
    },
  ]);
};
