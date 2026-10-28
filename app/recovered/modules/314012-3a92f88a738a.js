// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /[A-Za-z0-9_]/,
    r = /^[A-Za-z0-9_]{1,15}$/,
    l = (e) => r.test(e),
    a = (e) => !t.test(e),
    n = (e, t) => {
      let r = `@${t}`,
        l = [],
        n = 0;
      for (let t = e.indexOf(r, n); -1 !== t; t = e.indexOf(r, n))
        ((n = t + 1),
          a(e.charAt(t - 1)) && a(e.charAt(t + r.length)) && l.push(t));
      return l;
    },
    i = (e, t) => n(e, t).length > 0,
    s = (e, t, r) => {
      let l = n(e, t);
      if (0 === l.length) return null;
      let a = t.length + 1,
        i = "",
        s = 0;
      for (let t of l) ((i += e.slice(s, t) + r), (s = t + a));
      return i + e.slice(s);
    };
  e.s([
    "P",
    0,
    5,
    "j",
    0,
    (e, t) => {
      if (0 === t.length || !e.includes("@")) return 0;
      let r = new Set();
      for (let a of t)
        !r.has(a.userId) &&
          l(a.username) &&
          i(e, a.username) &&
          r.add(a.userId);
      return r.size;
    },
    "N",
    0,
    (e, r) => {
      if (r < 1 || r > e.length) return null;
      let l = r;
      for (; l > 0 && t.test(e.charAt(l - 1)); )
        if (r - (l -= 1) > 15) return null;
      if (0 === l || "@" !== e.charAt(l - 1)) return null;
      let a = l >= 2 ? e.charAt(l - 2) : "";
      return a && /[A-Za-z0-9_@\]]/.test(a)
        ? null
        : { start: l - 1, end: r, query: e.slice(l, r) };
    },
    "s",
    0,
    i,
    "m",
    0,
    (e) => {
      if (!e.includes("@[")) return e ? [{ kind: "text", text: e }] : [];
      let t = [],
        r = RegExp("@\\[([A-Za-z0-9_]{1,15})\\]\\(([0-9a-fA-F-]{36})\\)", "g"),
        l = 0;
      for (let a = r.exec(e); null !== a; a = r.exec(e))
        (a.index > l && t.push({ kind: "text", text: e.slice(l, a.index) }),
          t.push({ kind: "mention", username: a[1], userId: a[2] }),
          (l = a.index + a[0].length));
      return (l < e.length && t.push({ kind: "text", text: e.slice(l) }), t);
    },
    "k",
    0,
    (e, t) => {
      if (0 === t.length || !e.includes("@")) return e;
      let r = [...t].sort((e, t) => t.username.length - e.username.length),
        a = e,
        n = 0,
        i = new Set();
      for (let e of r) {
        if (n >= 5) break;
        if (i.has(e.userId) || !l(e.username)) continue;
        let t = s(a, e.username, `@[${e.username}](${e.userId})`);
        null !== t && ((a = t), (n += 1), i.add(e.userId));
      }
      return a;
    },
    "e",
    0,
    (e) =>
      e.includes("@[")
        ? e.replace(
            RegExp("@\\[([A-Za-z0-9_]{1,15})\\]\\(([0-9a-fA-F-]{36})\\)", "g"),
            (e, t) => `@${t}`,
          )
        : e,
  ]);
};
