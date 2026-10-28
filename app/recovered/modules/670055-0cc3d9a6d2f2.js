// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(97296),
    r = e.i(572544),
    a = e.i(605587),
    i = e.i(639374);
  let s = ["pump.fun", "www.pump.fun", "devnet.pump.fun"],
    n = null,
    o = (e) => (0, a.h)(e) || (0, i.f)(e),
    l = (e) => {
      try {
        return decodeURIComponent(e);
      } catch {
        return null;
      }
    },
    c = (e) => {
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
          if (null !== n) return n;
          let e = new Set(s);
          try {
            e.add(new URL((0, r.f)()).hostname.toLowerCase());
          } catch {}
          return ((n = e), e);
        })().has(t.hostname.toLowerCase())
      )
        return null;
      let a = t.pathname.split("/").filter((e) => "" !== e),
        i = [];
      for (let e of a) {
        let t = l(e);
        if (null === t || "" === t) return null;
        i.push(t);
      }
      let [c, ...u] = i;
      return "coin" === c && 1 === u.length && o(u[0])
        ? { kind: "coin", mint: u[0], url: e }
        : "profile" === c && 1 === u.length
          ? { kind: "profile", profileId: u[0], url: e }
          : "callouts" === c && 2 === u.length && o(u[0])
            ? { kind: "callout", mint: u[0], calloutId: u[1], url: e }
            : "callouts" === c && 3 === u.length && o(u[0])
              ? {
                  kind: "reply",
                  mint: u[0],
                  calloutId: u[1],
                  replyId: u[2],
                  url: e,
                }
              : null;
    },
    u = (e) => {
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
    m = /\s+$/;
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
          (void 0 === r || ("text" === r.kind && m.test(r.text))) &&
            (e = e.replace(d, ""));
        }
        "" !== e && ((r = !1), t.push({ kind: "text", text: e }));
      }
      let a = t.at(-1);
      if (r && void 0 !== a && "text" === a.kind) {
        let e = a.text.replace(m, "");
        "" === e ? t.pop() : (t[t.length - 1] = { kind: "text", text: e });
      }
      return t;
    },
    "P",
    0,
    u,
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
        i = new Set();
      for (let s of (0, t.f)(e)) {
        if ("link" !== s.kind) {
          r.push(s);
          continue;
        }
        let e = c(s.url);
        if (null === e) {
          r.push(s);
          continue;
        }
        let t = u(e);
        if (!i.has(t)) {
          if (a.length >= 3) {
            r.push(s);
            continue;
          }
          (i.add(t), a.push(e));
        }
        r.push({ kind: "embed", text: s.text, embed: e });
      }
      return { segments: r, embeds: a };
    },
    "H",
    0,
    c,
  ]);
};
