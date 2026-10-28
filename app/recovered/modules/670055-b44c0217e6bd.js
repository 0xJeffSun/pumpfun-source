// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(97296),
    r = e.i(572544),
    a = e.i(605587),
    n = e.i(639374);
  let s = ["pump.fun", "www.pump.fun", "devnet.pump.fun"],
    i = null,
    o = (e) => (0, a.h)(e) || (0, n.f)(e),
    l = (e) => {
      try {
        return decodeURIComponent(e);
      } catch {
        return null;
      }
    },
    u = (e) => {
      let t;
      try {
        t = new URL(e);
      } catch {
        return null;
      }
      if (
        ("https:" !== t.protocol && "http:" !== t.protocol) ||
        "" !== t.username ||
        "" !== t.password ||
        !(() => {
          if (null !== i) return i;
          let e = new Set(s);
          try {
            e.add(new URL((0, r.f)()).hostname.toLowerCase());
          } catch {}
          return ((i = e), e);
        })().has(t.hostname.toLowerCase())
      )
        return null;
      let a = t.pathname.split("/").filter((e) => "" !== e),
        n = [];
      for (let e of a) {
        let t = l(e);
        if (null === t || "" === t) return null;
        n.push(t);
      }
      let [u, ...c] = n;
      return "coin" === u && 1 === c.length && o(c[0])
        ? { kind: "coin", mint: c[0], url: e }
        : "profile" === u && 1 === c.length
          ? { kind: "profile", profileId: c[0], url: e }
          : "callouts" === u && 2 === c.length && o(c[0])
            ? { kind: "callout", mint: c[0], calloutId: c[1], url: e }
            : "callouts" === u && 3 === c.length && o(c[0])
              ? {
                  kind: "reply",
                  mint: c[0],
                  calloutId: c[1],
                  replyId: c[2],
                  url: e,
                }
              : null;
    },
    c = (e) => {
      switch (e.kind) {
        case "coin":
          return `coin:${(0, a.c)(e.mint)}`;
        case "profile":
          return `profile:${e.profileId}`;
        case "callout":
          return `callout:${(0, a.c)(e.mint)}:${e.calloutId}`;
        case "reply":
          return `reply:${(0, a.c)(e.mint)}:${e.calloutId}:${e.replyId}`;
      }
    },
    d = /^\s+/,
    p = /\s+$/;
  e.s([
    "O",
    0,
    (e) => {
      let t = [],
        r = !1;
      for (let a of e) {
        if ("embed" === a.kind) {
          r = !0;
          continue;
        }
        if ("link" === a.kind) {
          (t.push(a), (r = !1));
          continue;
        }
        let e = a.text;
        if (r) {
          let r = t.at(-1);
          (void 0 === r || ("text" === r.kind && p.test(r.text))) &&
            (e = e.replace(d, ""));
        }
        "" !== e && ((r = !1), t.push({ kind: "text", text: e }));
      }
      let a = t.at(-1);
      if (r && void 0 !== a && "text" === a.kind) {
        let e = a.text.replace(p, "");
        "" === e ? t.pop() : (t[t.length - 1] = { kind: "text", text: e });
      }
      return t;
    },
    "P",
    0,
    c,
    "z",
    0,
    (e) =>
      e.embeds.length > 0 &&
      e.segments.every(
        (e) =>
          "embed" === e.kind || ("text" === e.kind && "" === e.text.trim()),
      ),
    "Y",
    0,
    (e) => {
      if ("" === e) return { segments: [], embeds: [] };
      if (!e.includes("://"))
        return { segments: [{ kind: "text", text: e }], embeds: [] };
      let r = [],
        a = [],
        n = new Set();
      for (let s of (0, t.f)(e)) {
        if ("link" !== s.kind) {
          r.push(s);
          continue;
        }
        let e = u(s.url);
        if (null === e) {
          r.push(s);
          continue;
        }
        let t = c(e);
        if (!n.has(t)) {
          if (a.length >= 3) {
            r.push(s);
            continue;
          }
          (n.add(t), a.push(e));
        }
        r.push({ kind: "embed", text: s.text, embed: e });
      }
      return { segments: r, embeds: a };
    },
    "H",
    0,
    u,
  ]);
};
