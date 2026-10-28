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
      let i = t.exec(e);
      for (; null !== i; ) {
        let s = i[0],
          o = i.index,
          l = o + s.length,
          c = s.match(r),
          u = c ? c[0] : "",
          d = u ? s.slice(0, -u.length) : s;
        (o > n && a.push({ kind: "text", text: e.slice(n, o) }),
          a.push({ kind: "link", text: d, url: d }),
          (n = l - u.length),
          (i = t.exec(e)));
      }
      return (n < e.length && a.push({ kind: "text", text: e.slice(n) }), a);
    },
  ]);
};
