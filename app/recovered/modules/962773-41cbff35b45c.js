// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(598883),
    l = e.i(630164),
    n = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(745018);
  let o = (e) => {
    let i,
      l,
      n,
      a = (0, r.c)(4),
      { className: s } = e,
      o = void 0 === s ? "" : s;
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("mask", {
            id: "path-1-inside-1_4446_62488",
            fill: "white",
            children: (0, t.jsx)("path", {
              d: "M8.70164 1.75H10.1426L6.99452 5.35051L10.698 10.25H7.79821L5.52698 7.27849L2.92819 10.25H1.48635L4.85354 6.39885L1.30078 1.75H4.27419L6.32718 4.46608L8.70164 1.75ZM8.19591 9.38692H8.99437L3.84034 2.56774H2.98351L8.19591 9.38692Z",
            }),
          })),
          (l = (0, t.jsx)("path", {
            d: "M8.70164 1.75H10.1426L6.99452 5.35051L10.698 10.25H7.79821L5.52698 7.27849L2.92819 10.25H1.48635L4.85354 6.39885L1.30078 1.75H4.27419L6.32718 4.46608L8.70164 1.75ZM8.19591 9.38692H8.99437L3.84034 2.56774H2.98351L8.19591 9.38692Z",
            stroke: "#A1A1AA",
            strokeWidth: "1",
            mask: "url(#path-1-inside-1_4446_62488)",
          })),
          (a[0] = i),
          (a[1] = l))
        : ((i = a[0]), (l = a[1])),
      a[2] !== o
        ? ((n = (0, t.jsxs)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            className: o,
            children: [i, l],
          })),
          (a[2] = o),
          (a[3] = n))
        : (n = a[3]),
      n
    );
  };
  function d(e) {
    let l,
      n,
      d,
      u,
      m,
      h,
      f,
      x,
      p,
      y,
      v = (0, r.c)(23),
      { communityUrl: w, label: b } = e,
      { t: g } = (0, a.f)();
    return (
      v[0] !== b || v[1] !== g
        ? ((l = g("web.coin.view_on_x", { name: b })),
          (v[0] = b),
          (v[1] = g),
          (v[2] = l))
        : (l = v[2]),
      v[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(s._3, { className: "size-9 text-foreground/70" })),
          (v[3] = n))
        : (n = v[3]),
      v[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsxs)("div", {
            "aria-hidden": !0,
            className:
              "relative flex h-20 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/40 to-primary/5",
            children: [
              n,
              (0, t.jsx)("span", {
                className:
                  "absolute right-3 top-3 inline-flex size-6 items-center justify-center rounded-full bg-card/70 text-foreground backdrop-blur",
                children: (0, t.jsx)(o, { className: "size-3" }),
              }),
            ],
          })),
          (v[4] = d))
        : (d = v[4]),
      v[5] !== b
        ? ((u = (0, t.jsx)("div", {
            className:
              "mt-3 truncate text-sm font-semibold leading-tight text-foreground",
            children: b,
          })),
          (v[5] = b),
          (v[6] = u))
        : (u = v[6]),
      v[7] !== g
        ? ((m = g("web.coin.x_community")), (v[7] = g), (v[8] = m))
        : (m = v[8]),
      v[9] !== m
        ? ((h = (0, t.jsx)("div", {
            className: "text-xs text-muted-foreground",
            children: m,
          })),
          (v[9] = m),
          (v[10] = h))
        : (h = v[10]),
      v[11] !== g
        ? ((f = g("web.coin.view_community_on_x")), (v[11] = g), (v[12] = f))
        : (f = v[12]),
      v[13] !== f
        ? ((x = (0, t.jsx)("div", {
            className:
              "mt-4 inline-flex w-full items-center justify-center rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/40",
            children: f,
          })),
          (v[13] = f),
          (v[14] = x))
        : (x = v[14]),
      v[15] !== u || v[16] !== h || v[17] !== x
        ? ((p = (0, t.jsxs)("div", {
            className: "px-4 pb-4",
            children: [u, h, x],
          })),
          (v[15] = u),
          (v[16] = h),
          (v[17] = x),
          (v[18] = p))
        : (p = v[18]),
      v[19] !== w || v[20] !== l || v[21] !== p
        ? ((y = (0, t.jsx)(i.P, {
            align: "center",
            className:
              "w-72 overflow-hidden border-border/50 bg-card/95 p-0 backdrop-blur-xl",
            collisionPadding: 12,
            side: "top",
            children: (0, t.jsxs)("a", {
              "aria-label": l,
              className:
                "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              "data-testid": "x-community-hover-card",
              href: w,
              onClick: c,
              rel: "noreferrer",
              target: "_blank",
              children: [d, p],
            }),
          })),
          (v[19] = w),
          (v[20] = l),
          (v[21] = p),
          (v[22] = y))
        : (y = v[22]),
      y
    );
  }
  function c(e) {
    return e.stopPropagation();
  }
  e.s(["f", 0, o], 6360);
  var u = e.i(270707),
    m = e.i(17097),
    h = e.i(128873),
    f = n;
  class x extends f.Component {
    state = { hasError: !1 };
    static getDerivedStateFromError() {
      return { hasError: !0 };
    }
    componentDidCatch(e, t) {
      console.error("[TweetEmbedErrorBoundary] embed crashed", { error: e });
    }
    render() {
      return this.state.hasError ? this.props.fallback : this.props.children;
    }
  }
  function p(e) {
    let t = e.entities ?? {},
      r = t.media,
      i = Array.isArray(r) && r.length > 0 ? r : void 0,
      l = "string" == typeof e.text ? e.text : "";
    return {
      ...e,
      text: l,
      display_text_range: Array.isArray(e.display_text_range)
        ? e.display_text_range
        : [0, l.length],
      entities: {
        ...t,
        hashtags: Array.isArray(t.hashtags) ? t.hashtags : [],
        user_mentions: Array.isArray(t.user_mentions) ? t.user_mentions : [],
        urls: Array.isArray(t.urls) ? t.urls : [],
        symbols: Array.isArray(t.symbols) ? t.symbols : [],
        media: i,
      },
    };
  }
  function y(e) {
    let i,
      l,
      n,
      s,
      o = (0, r.c)(10),
      { href: d } = e,
      { t: c } = (0, a.f)();
    return (
      o[0] !== c
        ? ((i = c("web.embeds.preview_unavailable")), (o[0] = c), (o[1] = i))
        : (i = o[1]),
      o[2] !== c
        ? ((l = c("web.embeds.open_on_x")), (o[2] = c), (o[3] = l))
        : (l = o[3]),
      o[4] !== d || o[5] !== l
        ? ((n = (0, t.jsx)("a", {
            className: "text-text-primary underline-offset-4 hover:underline",
            href: d,
            rel: "noopener noreferrer",
            target: "_blank",
            children: l,
          })),
          (o[4] = d),
          (o[5] = l),
          (o[6] = n))
        : (n = o[6]),
      o[7] !== i || o[8] !== n
        ? ((s = (0, t.jsxs)("p", {
            className: "text-sm text-text-secondary",
            children: [i, " ", n],
          })),
          (o[7] = i),
          (o[8] = n),
          (o[9] = s))
        : (s = o[9]),
      s
    );
  }
  function v(e) {
    let i,
      l,
      n = (0, r.c)(5),
      { id: a, notFoundFallback: s } = e,
      { data: o, error: d, isLoading: c } = (0, h.f)(a);
    if (n[0] !== o) {
      let e;
      ((i = o
        ? {
            ...(e = p(o)),
            quoted_tweet: e.quoted_tweet ? p(e.quoted_tweet) : void 0,
          }
        : void 0),
        (n[0] = o),
        (n[1] = i));
    } else i = n[1];
    let f = i;
    if (c) {
      let e;
      return (
        n[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(m.f, {})), (n[2] = e))
          : (e = n[2]),
        e
      );
    }
    return d || !f
      ? s
      : (n[3] !== f
          ? ((l = (0, t.jsx)(u.f, { tweet: f })), (n[3] = f), (n[4] = l))
          : (l = n[4]),
        l);
  }
  function w(e) {
    let i,
      l,
      a,
      s,
      o,
      d = (0, r.c)(13),
      { id: c, href: u, fallback: m } = e;
    if (d[0] !== u || d[1] !== c)
      ((i = u ?? `https://x.com/i/status/${c}`),
        (d[0] = u),
        (d[1] = c),
        (d[2] = i));
    else i = d[2];
    let h = i;
    d[3] !== m || d[4] !== h
      ? ((l = m ?? (0, t.jsx)(y, { href: h })),
        (d[3] = m),
        (d[4] = h),
        (d[5] = l))
      : (l = d[5]);
    let f = l,
      p = (0, n.useRef)(null);
    return (
      d[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = { containerRef: p }), (d[6] = a))
        : (a = d[6]),
      ((e) => {
        let t,
          i,
          l = (0, r.c)(3),
          { containerRef: a } = e;
        (l[0] !== a
          ? ((t = () => {
              let e = a.current;
              if (!e) return;
              let t = new Set(),
                r = (e) => {
                  if (
                    (e instanceof HTMLMediaElement && t.add(e),
                    e instanceof Element)
                  )
                    for (let r of e.querySelectorAll("video, audio")) t.add(r);
                },
                i = () => {
                  for (let e of t)
                    if (!e.paused)
                      try {
                        e.pause();
                      } catch {}
                };
              r(e);
              let l =
                "u" > typeof MutationObserver
                  ? new MutationObserver((e) => {
                      for (let t of e) for (let e of t.addedNodes) r(e);
                    })
                  : void 0;
              l?.observe(e, { childList: !0, subtree: !0 });
              let n = () => {
                  "hidden" === document.visibilityState && i();
                },
                s = () => i();
              return (
                document.addEventListener("visibilitychange", n),
                window.addEventListener("pagehide", s),
                () => {
                  (l?.disconnect(),
                    document.removeEventListener("visibilitychange", n),
                    window.removeEventListener("pagehide", s),
                    i());
                }
              );
            }),
            (i = [a]),
            (l[0] = a),
            (l[1] = t),
            (l[2] = i))
          : ((t = l[1]), (i = l[2])),
          (0, n.useEffect)(t, i));
      })(a),
      d[7] !== f || d[8] !== c
        ? ((s = (0, t.jsx)(v, { id: c, notFoundFallback: f })),
          (d[7] = f),
          (d[8] = c),
          (d[9] = s))
        : (s = d[9]),
      d[10] !== f || d[11] !== s
        ? ((o = (0, t.jsx)("div", {
            ref: p,
            children: (0, t.jsx)(x, { fallback: f, children: s }),
          })),
          (d[10] = f),
          (d[11] = s),
          (d[12] = o))
        : (o = d[12]),
      o
    );
  }
  function b(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "D",
      0,
      function (e) {
        let s,
          o,
          c,
          u = (0, r.c)(28),
          {
            href: m,
            link: h,
            communityLabel: f,
            children: x,
            open: p,
            onOpenChange: y,
          } = e,
          { t: v } = (0, a.f)(),
          [g, j] = (0, n.useState)(!1),
          _ = p ?? g,
          k = h?.kind === "post";
        u[0] !== y
          ? ((s = (e) => {
              (j(e), y?.(e));
            }),
            (u[0] = y),
            (u[1] = s))
          : (s = u[1]);
        let C = s,
          N = null;
        if (h?.kind === "profile") {
          let e;
          (u[2] !== h.handle
            ? ((e = (0, t.jsx)(l.z, { seed: { xUsername: h.handle } })),
              (u[2] = h.handle),
              (u[3] = e))
            : (e = u[3]),
            (N = e));
        } else if (h?.kind === "community" && m) {
          let e;
          (u[4] !== f || u[5] !== m
            ? ((e = (0, t.jsx)(d, { communityUrl: m, label: f })),
              (u[4] = f),
              (u[5] = m),
              (u[6] = e))
            : (e = u[6]),
            (N = e));
        } else if (h?.kind === "post" && m) {
          let e, r, l, n;
          (u[7] !== v
            ? ((e = v("web.coin.open_on_x")), (u[7] = v), (u[8] = e))
            : (e = u[8]),
            u[9] !== m || u[10] !== e
              ? ((r = (0, t.jsx)("p", {
                  className: "text-center text-sm",
                  children: (0, t.jsx)("a", {
                    href: m,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "font-medium text-text-primary underline-offset-4 hover:underline",
                    children: e,
                  }),
                })),
                (u[9] = m),
                (u[10] = e),
                (u[11] = r))
              : (r = u[11]));
          let a = r;
          (u[12] !== m || u[13] !== _ || u[14] !== h || u[15] !== a
            ? ((l = _
                ? (0, t.jsx)("div", {
                    className:
                      "dark [&_.react-tweet-theme]:max-w-none [&_.react-tweet-theme]:[--tweet-bg-color:transparent] [&_.react-tweet-theme]:[--tweet-bg-color-hover:transparent] [&_.react-tweet-theme]:[--tweet-border:none] [&_.react-tweet-theme]:[--tweet-container-margin:0] [&_[class*=tweet-body]]:line-clamp-6 [&_[class*=tweet-media][class*=root]]:max-h-60 [&_[class*=tweet-media][class*=root]]:overflow-hidden",
                    children: (0, t.jsx)(w, {
                      fallback: a,
                      href: m,
                      id: h.tweetId,
                    }),
                  })
                : null),
              (u[12] = m),
              (u[13] = _),
              (u[14] = h),
              (u[15] = a),
              (u[16] = l))
            : (l = u[16]),
            u[17] !== l
              ? ((n = (0, t.jsx)(i.P, {
                  align: "start",
                  className:
                    "w-[min(420px,calc(100vw-2rem))] rounded-2xl border-border-secondary bg-bg-secondary p-3 text-text-primary shadow-xl",
                  collisionPadding: 12,
                  side: "bottom",
                  sideOffset: 8,
                  children: l,
                })),
                (u[17] = l),
                (u[18] = n))
              : (n = u[18]),
            (N = n));
        }
        let A = k ? 200 : 120,
          I = 150 * !k;
        return (
          u[19] !== x
            ? ((o = (0, t.jsx)(i.b, {
                asChild: !0,
                children: (0, t.jsx)("span", {
                  className: "inline-flex max-w-full",
                  onPointerDown: b,
                  children: x,
                }),
              })),
              (u[19] = x),
              (u[20] = o))
            : (o = u[20]),
          u[21] !== N ||
          u[22] !== C ||
          u[23] !== p ||
          u[24] !== A ||
          u[25] !== I ||
          u[26] !== o
            ? ((c = (0, t.jsxs)(i.c, {
                closeDelay: A,
                onOpenChange: C,
                open: p,
                openDelay: I,
                children: [o, N],
              })),
              (u[21] = N),
              (u[22] = C),
              (u[23] = p),
              (u[24] = A),
              (u[25] = I),
              (u[26] = o),
              (u[27] = c))
            : (c = u[27]),
          c
        );
      },
      "y",
      0,
      function (e) {
        let t,
          i = (0, r.c)(7),
          { t: l } = (0, a.f)();
        if (e?.kind === "community") {
          let e;
          return (
            i[0] !== l
              ? ((e = l("web.coin.view_community_on_x")),
                (i[0] = l),
                (i[1] = e))
              : (e = i[1]),
            e
          );
        }
        if (e?.kind === "profile") {
          let t,
            r = `@${e.handle}`;
          return (
            i[2] !== l || i[3] !== r
              ? ((t = l("web.coin.view_on_x", { name: r })),
                (i[2] = l),
                (i[3] = r),
                (i[4] = t))
              : (t = i[4]),
            t
          );
        }
        return (
          i[5] !== l
            ? ((t = l("web.coin.open_on_x")), (i[5] = l), (i[6] = t))
            : (t = i[6]),
          t
        );
      },
      "X",
      0,
      function ({ href: e, coinName: t }) {
        try {
          let r = new URL(e).pathname;
          if (r.includes("/i/communities/"))
            return t ? `${t} community` : "coin community";
          let i = r.split("/")[1];
          return i ? `${i}` : "Twitter";
        } catch {
          return "Twitter";
        }
      },
    ],
    962773,
  );
};
