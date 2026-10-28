// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    a = e.i(146695),
    n = e.i(458310),
    i = e.i(599077),
    s = e.i(352386),
    o = e.i(441315);
  let u = /^[ \t]*>/,
    d = /(?:^|\n)[ \t]*>/;
  var c = e.i(314012);
  let m = /(https?:\/\/(?:[^\s"'(),;<>\]`]+|\([^\s"'(),;<>\]`]*\))+)/gi,
    f = /[!,.:;?]+$/,
    p = /^(?:[\w-]+\.)?(?:twitter|x)\.com$/i,
    h = /^\/([^/]+)\/status\/(\d+)/,
    y = (e) => {
      let t;
      try {
        t = new URL(e);
      } catch {
        return null;
      }
      if (!p.test(t.hostname)) return null;
      let r = t.pathname.match(h);
      return r?.[2] ? { id: r[2], username: r[1], url: e } : null;
    },
    g = "relative z-[2] font-medium text-text-accent hover:underline",
    x = "relative z-[2] w-fit max-w-full align-middle",
    I = {
      terminal: (0, o.C)({
        density: "terminal",
        variant: "outlined",
        interactive: !0,
        className: x,
      }),
      comfortable: (0, o.C)({
        density: "comfortable",
        variant: "outlined",
        interactive: !0,
        className: x,
      }),
    },
    v = (e) => {
      (e.preventDefault(), e.stopPropagation());
    },
    w = (e) => {
      let l,
        a,
        n = (0, r.c)(6),
        { href: s, children: o } = e,
        u = (0, i.useRouter)();
      return (
        n[0] !== s || n[1] !== u
          ? ((l = (e) => {
              (v(e), u.push(s));
            }),
            (n[0] = s),
            (n[1] = u),
            (n[2] = l))
          : (l = n[2]),
        n[3] !== o || n[4] !== l
          ? ((a = (0, t.jsx)("button", {
              type: "button",
              className: g,
              onClick: l,
              children: o,
            })),
            (n[3] = o),
            (n[4] = l),
            (n[5] = a))
          : (a = n[5]),
        a
      );
    },
    b = (e) => {
      let a,
        n,
        i = (0, r.c)(3),
        { username: s } = e;
      return (
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)(l.Tc, {
              "aria-hidden": !0,
              className: "size-3.5 shrink-0 text-text-quaternary",
            })),
            (i[0] = a))
          : (a = i[0]),
        i[1] !== s
          ? ((n = (0, t.jsxs)(t.Fragment, {
              children: [
                a,
                (0, t.jsxs)("span", {
                  className: "truncate",
                  children: ["@", s],
                }),
              ],
            })),
            (i[1] = s),
            (i[2] = n))
          : (n = i[2]),
        n
      );
    },
    A = (e, r) =>
      (0, c.m)(e)
        .flatMap((e) =>
          "text" === e.kind
            ? ((e) => {
                let t;
                if (!e.includes("/status/"))
                  return e ? [{ kind: "text", text: e }] : [];
                let r = [],
                  l = 0;
                for (m.lastIndex = 0; null !== (t = m.exec(e)); ) {
                  let a = t[0].replace(f, ""),
                    n = y(a);
                  n &&
                    (t.index > l &&
                      r.push({ kind: "text", text: e.slice(l, t.index) }),
                    r.push({ kind: "tweet", ...n }),
                    (l = t.index + a.length));
                }
                return (
                  l < e.length && r.push({ kind: "text", text: e.slice(l) }),
                  r
                );
              })(e.text)
            : [e],
        )
        .map((e, l) =>
          ((e, r, { withinLink: l, density: i, tweetChipClassName: o }) => {
            if ("mention" === e.kind) {
              let i = (0, a.$)(e.userId),
                s = `@${e.username}`;
              return l
                ? (0, t.jsx)(w, { href: i, children: s }, r)
                : (0, t.jsx)(
                    n.default,
                    {
                      href: i,
                      className: g,
                      prefetch: !1,
                      onClick: (e) => e.stopPropagation(),
                      children: s,
                    },
                    r,
                  );
            }
            return "tweet" === e.kind
              ? l
                ? (0, t.jsx)(
                    "button",
                    {
                      type: "button",
                      title: e.url,
                      "data-testid": "callout-tweet-chip",
                      "data-density": i,
                      className: o,
                      onClick: (t) => {
                        (v(t),
                          window.open(e.url, "_blank", "noopener,noreferrer"));
                      },
                      children: (0, t.jsx)(b, { username: e.username }),
                    },
                    r,
                  )
                : (0, t.jsx)(
                    "a",
                    {
                      href: e.url,
                      title: e.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-testid": "callout-tweet-chip",
                      "data-density": i,
                      className: o,
                      onClick: (e) => e.stopPropagation(),
                      children: (0, t.jsx)(b, { username: e.username }),
                    },
                    r,
                  )
              : (0, t.jsx)(s.Fragment, { children: e.text }, r);
          })(e, l, r),
        ),
    N = (0, s.memo)(
      ({ content: e, withinLink: r = !1, density: l = "comfortable" }) => {
        let a = d.test(e);
        if (!a && !e.includes("@[") && !e.includes("/status/")) return e;
        let n = { withinLink: r, density: l, tweetChipClassName: I[l] };
        if (!a) return A(e, n);
        let i = e.split("\n").map((e) => ({ text: e, greentext: u.test(e) }));
        return i.map((e, r) => {
          let l = A(e.text, n);
          return (0, t.jsxs)(
            s.Fragment,
            {
              children: [
                e.greentext
                  ? (0, t.jsx)("span", {
                      "data-testid": "callout-greentext",
                      className: "text-greentext",
                      children: l,
                    })
                  : l,
                r < i.length - 1 ? "\n" : null,
              ],
            },
            r,
          );
        });
      },
    );
  ((N.displayName = "MentionText"), e.s(["f", 0, N], 174251));
};
