// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(947187);
  let r = /\/status\/(\d+)/,
    a = /\/i\/communities\/(\d+)/;
  function i(e) {
    let t = e.replace(/^www\./, "").toLowerCase();
    return "twitter.com" === t || "x.com" === t || "mobile.twitter.com" === t;
  }
  let n = new Set([
    "i",
    "home",
    "explore",
    "search",
    "notifications",
    "messages",
    "settings",
    "compose",
    "intent",
    "hashtag",
    "share",
    "login",
    "signup",
    "tos",
    "privacy",
  ]);
  e.s(
    [
      "l",
      0,
      i,
      "h",
      0,
      function (e) {
        let l = (function (e) {
          if (!e?.trim()) return null;
          let a = (0, t._)(e);
          if (!a) return null;
          try {
            let e,
              t = new URL(a);
            if (
              ((e = t.hostname.replace(/^www\./, "")),
              "twitter.com" !== e &&
                "x.com" !== e &&
                "mobile.twitter.com" !== e)
            )
              return null;
            let i = t.pathname.match(r);
            return i?.[1] ?? null;
          } catch {
            return null;
          }
        })(e);
        if (l) return { kind: "post", tweetId: l };
        if (!e?.trim()) return null;
        let s = (0, t._)(e);
        if (!s) return null;
        try {
          let e = new URL(s);
          if (!i(e.hostname)) return null;
          let t = e.pathname.match(a);
          if (t?.[1]) return { kind: "community", communityId: t[1] };
          if (e.pathname.includes("/status/")) return null;
          let r = e.pathname.split("/").filter(Boolean)[0]?.replace(/^@/, "");
          if (r && !n.has(r.toLowerCase()))
            return { kind: "profile", handle: r };
          return null;
        } catch {
          return null;
        }
      },
    ],
    516579,
  );
};
