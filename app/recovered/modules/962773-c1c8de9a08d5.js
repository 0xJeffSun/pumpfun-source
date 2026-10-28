// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(598883),
    i = e.i(630164),
    n = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    s = e.i(745018);
  let o = (e) => {
    let a,
      i,
      n,
      l = (0, r.c)(4),
      { className: s } = e,
      o = void 0 === s ? "" : s;
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("mask", {
            id: "path-1-inside-1_4446_62488",
            fill: "white",
            children: (0, t.jsx)("path", {
              d: "M8.70164 1.75H10.1426L6.99452 5.35051L10.698 10.25H7.79821L5.52698 7.27849L2.92819 10.25H1.48635L4.85354 6.39885L1.30078 1.75H4.27419L6.32718 4.46608L8.70164 1.75ZM8.19591 9.38692H8.99437L3.84034 2.56774H2.98351L8.19591 9.38692Z",
            }),
          })),
          (i = (0, t.jsx)("path", {
            d: "M8.70164 1.75H10.1426L6.99452 5.35051L10.698 10.25H7.79821L5.52698 7.27849L2.92819 10.25H1.48635L4.85354 6.39885L1.30078 1.75H4.27419L6.32718 4.46608L8.70164 1.75ZM8.19591 9.38692H8.99437L3.84034 2.56774H2.98351L8.19591 9.38692Z",
            stroke: "#A1A1AA",
            strokeWidth: "1",
            mask: "url(#path-1-inside-1_4446_62488)",
          })),
          (l[0] = a),
          (l[1] = i))
        : ((a = l[0]), (i = l[1])),
      l[2] !== o
        ? ((n = (0, t.jsxs)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            className: o,
            children: [a, i],
          })),
          (l[2] = o),
          (l[3] = n))
        : (n = l[3]),
      n
    );
  };
  function d(e) {
    let i,
      n,
      d,
      c,
      m,
      p,
      h,
      f,
      g,
      b,
      y = (0, r.c)(23),
      { communityUrl: v, label: w } = e,
      { t: k } = (0, l.f)();
    return (
      y[0] !== w || y[1] !== k
        ? ((i = k("web.coin.view_on_x", { name: w })),
          (y[0] = w),
          (y[1] = k),
          (y[2] = i))
        : (i = y[2]),
      y[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(s._3, { className: "size-9 text-foreground/70" })),
          (y[3] = n))
        : (n = y[3]),
      y[4] === Symbol.for("react.memo_cache_sentinel")
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
          (y[4] = d))
        : (d = y[4]),
      y[5] !== w
        ? ((c = (0, t.jsx)("div", {
            className:
              "mt-3 truncate text-sm font-semibold leading-tight text-foreground",
            children: w,
          })),
          (y[5] = w),
          (y[6] = c))
        : (c = y[6]),
      y[7] !== k
        ? ((m = k("web.coin.x_community")), (y[7] = k), (y[8] = m))
        : (m = y[8]),
      y[9] !== m
        ? ((p = (0, t.jsx)("div", {
            className: "text-xs text-muted-foreground",
            children: m,
          })),
          (y[9] = m),
          (y[10] = p))
        : (p = y[10]),
      y[11] !== k
        ? ((h = k("web.coin.view_community_on_x")), (y[11] = k), (y[12] = h))
        : (h = y[12]),
      y[13] !== h
        ? ((f = (0, t.jsx)("div", {
            className:
              "mt-4 inline-flex w-full items-center justify-center rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/40",
            children: h,
          })),
          (y[13] = h),
          (y[14] = f))
        : (f = y[14]),
      y[15] !== c || y[16] !== p || y[17] !== f
        ? ((g = (0, t.jsxs)("div", {
            className: "px-4 pb-4",
            children: [c, p, f],
          })),
          (y[15] = c),
          (y[16] = p),
          (y[17] = f),
          (y[18] = g))
        : (g = y[18]),
      y[19] !== v || y[20] !== i || y[21] !== g
        ? ((b = (0, t.jsx)(a.P, {
            align: "center",
            className:
              "w-72 overflow-hidden border-border/50 bg-card/95 p-0 backdrop-blur-xl",
            collisionPadding: 12,
            side: "top",
            children: (0, t.jsxs)("a", {
              "aria-label": i,
              className:
                "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              "data-testid": "x-community-hover-card",
              href: v,
              onClick: u,
              rel: "noreferrer",
              target: "_blank",
              children: [d, g],
            }),
          })),
          (y[19] = v),
          (y[20] = i),
          (y[21] = g),
          (y[22] = b))
        : (b = y[22]),
      b
    );
  }
  function u(e) {
    return e.stopPropagation();
  }
  e.s(["f", 0, o], 6360);
  var c = e.i(270707),
    m = e.i(17097),
    p = e.i(128873),
    h = n;
  class f extends h.Component {
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
  function g(e) {
    let t = e.entities ?? {},
      r = t.media,
      a = Array.isArray(r) && r.length > 0 ? r : void 0,
      i = "string" == typeof e.text ? e.text : "";
    return {
      ...e,
      text: i,
      display_text_range: Array.isArray(e.display_text_range)
        ? e.display_text_range
        : [0, i.length],
      entities: {
        ...t,
        hashtags: Array.isArray(t.hashtags) ? t.hashtags : [],
        user_mentions: Array.isArray(t.user_mentions) ? t.user_mentions : [],
        urls: Array.isArray(t.urls) ? t.urls : [],
        symbols: Array.isArray(t.symbols) ? t.symbols : [],
        media: a,
      },
    };
  }
  function b(e) {
    let a,
      i,
      n,
      s,
      o = (0, r.c)(10),
      { href: d } = e,
      { t: u } = (0, l.f)();
    return (
      o[0] !== u
        ? ((a = u("web.embeds.preview_unavailable")), (o[0] = u), (o[1] = a))
        : (a = o[1]),
      o[2] !== u
        ? ((i = u("web.embeds.open_on_x")), (o[2] = u), (o[3] = i))
        : (i = o[3]),
      o[4] !== d || o[5] !== i
        ? ((n = (0, t.jsx)("a", {
            className: "text-text-primary underline-offset-4 hover:underline",
            href: d,
            rel: "noopener noreferrer",
            target: "_blank",
            children: i,
          })),
          (o[4] = d),
          (o[5] = i),
          (o[6] = n))
        : (n = o[6]),
      o[7] !== a || o[8] !== n
        ? ((s = (0, t.jsxs)("p", {
            className: "text-sm text-text-secondary",
            children: [a, " ", n],
          })),
          (o[7] = a),
          (o[8] = n),
          (o[9] = s))
        : (s = o[9]),
      s
    );
  }
  function y(e) {
    let a,
      i,
      n = (0, r.c)(5),
      { id: l, notFoundFallback: s } = e,
      { data: o, error: d, isLoading: u } = (0, p.f)(l);
    if (n[0] !== o) {
      let e;
      ((a = o
        ? {
            ...(e = g(o)),
            quoted_tweet: e.quoted_tweet ? g(e.quoted_tweet) : void 0,
          }
        : void 0),
        (n[0] = o),
        (n[1] = a));
    } else a = n[1];
    let h = a;
    if (u) {
      let e;
      return (
        n[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(m.f, {})), (n[2] = e))
          : (e = n[2]),
        e
      );
    }
    return d || !h
      ? s
      : (n[3] !== h
          ? ((i = (0, t.jsx)(c.f, { tweet: h })), (n[3] = h), (n[4] = i))
          : (i = n[4]),
        i);
  }
  function v(e) {
    let a,
      i,
      l,
      s,
      o,
      d = (0, r.c)(13),
      { id: u, href: c, fallback: m } = e;
    if (d[0] !== c || d[1] !== u)
      ((a = c ?? `https://x.com/i/status/${u}`),
        (d[0] = c),
        (d[1] = u),
        (d[2] = a));
    else a = d[2];
    let p = a;
    d[3] !== m || d[4] !== p
      ? ((i = m ?? (0, t.jsx)(b, { href: p })),
        (d[3] = m),
        (d[4] = p),
        (d[5] = i))
      : (i = d[5]);
    let h = i,
      g = (0, n.useRef)(null);
    return (
      d[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { containerRef: g }), (d[6] = l))
        : (l = d[6]),
      ((e) => {
        let t,
          a,
          i = (0, r.c)(3),
          { containerRef: l } = e;
        (i[0] !== l
          ? ((t = () => {
              let e = l.current;
              if (!e) return;
              let t = new Set(),
                r = (e) => {
                  if (
                    (e instanceof HTMLMediaElement && t.add(e),
                    e instanceof Element)
                  )
                    for (let r of e.querySelectorAll("video, audio")) t.add(r);
                },
                a = () => {
                  for (let e of t)
                    if (!e.paused)
                      try {
                        e.pause();
                      } catch {}
                };
              r(e);
              let i =
                "u" > typeof MutationObserver
                  ? new MutationObserver((e) => {
                      for (let t of e) for (let e of t.addedNodes) r(e);
                    })
                  : void 0;
              i?.observe(e, { childList: !0, subtree: !0 });
              let n = () => {
                  "hidden" === document.visibilityState && a();
                },
                s = () => a();
              return (
                document.addEventListener("visibilitychange", n),
                window.addEventListener("pagehide", s),
                () => {
                  (i?.disconnect(),
                    document.removeEventListener("visibilitychange", n),
                    window.removeEventListener("pagehide", s),
                    a());
                }
              );
            }),
            (a = [l]),
            (i[0] = l),
            (i[1] = t),
            (i[2] = a))
          : ((t = i[1]), (a = i[2])),
          (0, n.useEffect)(t, a));
      })(l),
      d[7] !== h || d[8] !== u
        ? ((s = (0, t.jsx)(y, { id: u, notFoundFallback: h })),
          (d[7] = h),
          (d[8] = u),
          (d[9] = s))
        : (s = d[9]),
      d[10] !== h || d[11] !== s
        ? ((o = (0, t.jsx)("div", {
            ref: g,
            children: (0, t.jsx)(f, { fallback: h, children: s }),
          })),
          (d[10] = h),
          (d[11] = s),
          (d[12] = o))
        : (o = d[12]),
      o
    );
  }
  function w(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "D",
      0,
      function (e) {
        let s,
          o,
          u,
          c = (0, r.c)(28),
          {
            href: m,
            link: p,
            communityLabel: h,
            children: f,
            open: g,
            onOpenChange: b,
          } = e,
          { t: y } = (0, l.f)(),
          [k, C] = (0, n.useState)(!1),
          x = g ?? k,
          I = p?.kind === "post";
        c[0] !== b
          ? ((s = (e) => {
              (C(e), b?.(e));
            }),
            (c[0] = b),
            (c[1] = s))
          : (s = c[1]);
        let _ = s,
          T = null;
        if (p?.kind === "profile") {
          let e;
          (c[2] !== p.handle
            ? ((e = (0, t.jsx)(i.z, { seed: { xUsername: p.handle } })),
              (c[2] = p.handle),
              (c[3] = e))
            : (e = c[3]),
            (T = e));
        } else if (p?.kind === "community" && m) {
          let e;
          (c[4] !== h || c[5] !== m
            ? ((e = (0, t.jsx)(d, { communityUrl: m, label: h })),
              (c[4] = h),
              (c[5] = m),
              (c[6] = e))
            : (e = c[6]),
            (T = e));
        } else if (p?.kind === "post" && m) {
          let e, r, i, n;
          (c[7] !== y
            ? ((e = y("web.coin.open_on_x")), (c[7] = y), (c[8] = e))
            : (e = c[8]),
            c[9] !== m || c[10] !== e
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
                (c[9] = m),
                (c[10] = e),
                (c[11] = r))
              : (r = c[11]));
          let l = r;
          (c[12] !== m || c[13] !== x || c[14] !== p || c[15] !== l
            ? ((i = x
                ? (0, t.jsx)("div", {
                    className:
                      "dark [&_.react-tweet-theme]:max-w-none [&_.react-tweet-theme]:[--tweet-bg-color:transparent] [&_.react-tweet-theme]:[--tweet-bg-color-hover:transparent] [&_.react-tweet-theme]:[--tweet-border:none] [&_.react-tweet-theme]:[--tweet-container-margin:0] [&_[class*=tweet-body]]:line-clamp-6 [&_[class*=tweet-media][class*=root]]:max-h-60 [&_[class*=tweet-media][class*=root]]:overflow-hidden",
                    children: (0, t.jsx)(v, {
                      fallback: l,
                      href: m,
                      id: p.tweetId,
                    }),
                  })
                : null),
              (c[12] = m),
              (c[13] = x),
              (c[14] = p),
              (c[15] = l),
              (c[16] = i))
            : (i = c[16]),
            c[17] !== i
              ? ((n = (0, t.jsx)(a.P, {
                  align: "start",
                  className:
                    "w-[min(420px,calc(100vw-2rem))] rounded-2xl border-border-secondary bg-bg-secondary p-3 text-text-primary shadow-xl",
                  collisionPadding: 12,
                  side: "bottom",
                  sideOffset: 8,
                  children: i,
                })),
                (c[17] = i),
                (c[18] = n))
              : (n = c[18]),
            (T = n));
        }
        let E = I ? 200 : 120,
          S = 150 * !I;
        return (
          c[19] !== f
            ? ((o = (0, t.jsx)(a.b, {
                asChild: !0,
                children: (0, t.jsx)("span", {
                  className: "inline-flex max-w-full",
                  onPointerDown: w,
                  children: f,
                }),
              })),
              (c[19] = f),
              (c[20] = o))
            : (o = c[20]),
          c[21] !== T ||
          c[22] !== _ ||
          c[23] !== g ||
          c[24] !== E ||
          c[25] !== S ||
          c[26] !== o
            ? ((u = (0, t.jsxs)(a.c, {
                closeDelay: E,
                onOpenChange: _,
                open: g,
                openDelay: S,
                children: [o, T],
              })),
              (c[21] = T),
              (c[22] = _),
              (c[23] = g),
              (c[24] = E),
              (c[25] = S),
              (c[26] = o),
              (c[27] = u))
            : (u = c[27]),
          u
        );
      },
      "y",
      0,
      function (e) {
        let t,
          a = (0, r.c)(7),
          { t: i } = (0, l.f)();
        if (e?.kind === "community") {
          let e;
          return (
            a[0] !== i
              ? ((e = i("web.coin.view_community_on_x")),
                (a[0] = i),
                (a[1] = e))
              : (e = a[1]),
            e
          );
        }
        if (e?.kind === "profile") {
          let t,
            r = `@${e.handle}`;
          return (
            a[2] !== i || a[3] !== r
              ? ((t = i("web.coin.view_on_x", { name: r })),
                (a[2] = i),
                (a[3] = r),
                (a[4] = t))
              : (t = a[4]),
            t
          );
        }
        return (
          a[5] !== i
            ? ((t = i("web.coin.open_on_x")), (a[5] = i), (a[6] = t))
            : (t = a[6]),
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
          let a = r.split("/")[1];
          return a ? `${a}` : "Twitter";
        } catch {
          return "Twitter";
        }
      },
    ],
    962773,
  );
};
