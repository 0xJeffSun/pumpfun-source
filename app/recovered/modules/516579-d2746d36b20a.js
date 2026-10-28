// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(947187);
  let r = /\/status\/(\d+)/,
    i = /\/i\/communities\/(\d+)/;
  function l(e) {
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
      l,
      "h",
      0,
      function (e) {
        let a = (function (e) {
          if (!e?.trim()) return null;
          let i = (0, t._)(e);
          if (!i) return null;
          try {
            let e,
              t = new URL(i);
            if (
              ((e = t.hostname.replace(/^www\./, "")),
              "twitter.com" !== e &&
                "x.com" !== e &&
                "mobile.twitter.com" !== e)
            )
              return null;
            let l = t.pathname.match(r);
            return l?.[1] ?? null;
          } catch {
            return null;
          }
        })(e);
        if (a) return { kind: "post", tweetId: a };
        if (!e?.trim()) return null;
        let s = (0, t._)(e);
        if (!s) return null;
        try {
          let e = new URL(s);
          if (!l(e.hostname)) return null;
          let t = e.pathname.match(i);
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
