// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(702547);
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(426091),
    l = e.i(598883),
    a = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    o = e.i(370562),
    c = e.i(162125),
    d = e.i(478783),
    m = e.i(769914),
    h = e.i(634557);
  function u(e) {
    let r,
      i,
      l,
      o,
      c,
      d,
      m,
      h,
      u = (0, n.c)(20),
      { embedSrc: f, href: x, title: p } = e,
      { t: g } = (0, s.f)(),
      [b, v] = (0, a.useState)(!1);
    u[0] !== g || u[1] !== p
      ? ((r = p ?? g("web.embeds.instagram_post")),
        (u[0] = g),
        (u[1] = p),
        (u[2] = r))
      : (r = u[2]);
    let w = r;
    return (
      u[3] !== b
        ? ((i = b
            ? null
            : (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "absolute inset-0 animate-pulse bg-bg-tertiary",
              })),
          (u[3] = b),
          (u[4] = i))
        : (i = u[4]),
      u[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = () => v(!0)), (u[5] = l))
        : (l = u[5]),
      u[6] !== f || u[7] !== w
        ? ((o = (0, t.jsx)("iframe", {
            className: "size-full",
            "data-testid": "instagram-embed",
            loading: "lazy",
            onLoad: l,
            src: f,
            title: w,
          })),
          (u[6] = f),
          (u[7] = w),
          (u[8] = o))
        : (o = u[8]),
      u[9] !== i || u[10] !== o
        ? ((c = (0, t.jsxs)("div", {
            className:
              "relative h-[480px] w-full overflow-hidden rounded-lg bg-white",
            children: [i, o],
          })),
          (u[9] = i),
          (u[10] = o),
          (u[11] = c))
        : (c = u[11]),
      u[12] !== g
        ? ((d = g("web.embeds.view_on_instagram")), (u[12] = g), (u[13] = d))
        : (d = u[13]),
      u[14] !== x || u[15] !== d
        ? ((m = (0, t.jsx)("a", {
            className:
              "text-xs text-text-secondary underline-offset-4 hover:text-text-primary hover:underline",
            href: x,
            rel: "noopener noreferrer",
            target: "_blank",
            children: d,
          })),
          (u[14] = x),
          (u[15] = d),
          (u[16] = m))
        : (m = u[16]),
      u[17] !== c || u[18] !== m
        ? ((h = (0, t.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [c, m],
          })),
          (u[17] = c),
          (u[18] = m),
          (u[19] = h))
        : (h = u[19]),
      h
    );
  }
  var f = e.i(972007),
    x = e.i(947187);
  let p = new Set(["p", "reel", "reels", "tv"]),
    g = new Set([
      "p",
      "reel",
      "reels",
      "tv",
      "explore",
      "accounts",
      "direct",
      "stories",
      "about",
      "developer",
      "legal",
      "web",
      "directory",
      "tags",
      "challenge",
      "s",
    ]),
    b = /^[A-Za-z0-9_-]+$/;
  function v(e) {
    if (!e?.trim()) return null;
    let t = (0, x._)(e);
    if (!t) return null;
    try {
      var n, r;
      let e = new URL(t);
      if (
        ((n = e.hostname),
        "instagram.com" !==
          n
            .replace(/^www\./, "")
            .replace(/^m\./, "")
            .toLowerCase())
      )
        return null;
      let i = e.pathname.split("/").filter(Boolean);
      if (0 === i.length) return null;
      let l = i.findIndex((e) => p.has(e.toLowerCase()));
      if (-1 !== l) {
        let e = i[l + 1];
        if (e && b.test(e))
          return {
            kind: "post",
            shortcode: e,
            postType:
              ((r = i[l].toLowerCase()),
              "reel" === r || "reels" === r ? "reel" : "tv" === r ? "tv" : "p"),
          };
        return null;
      }
      let a = i[0].replace(/^@/, "");
      if (a && !g.has(a.toLowerCase())) return { kind: "profile", username: a };
      return null;
    } catch {
      return null;
    }
  }
  function w(e) {
    return `https://www.instagram.com/${e.postType}/${e.shortcode}/embed/captioned`;
  }
  function y(e) {
    return e.stopPropagation();
  }
  function j(e) {
    return e.stopPropagation();
  }
  function _(e) {
    return e.stopPropagation();
  }
  (e.s(["_", 0, w, "I", 0, v], 844585),
    e.s(
      [
        "f",
        0,
        function (e) {
          let p,
            g,
            b,
            C,
            N,
            k,
            L,
            S,
            P,
            $,
            T,
            z,
            A,
            D,
            R,
            E,
            U = (0, n.c)(49),
            { instagramUrl: I, onInteract: B, variant: M } = e,
            O = void 0 === M ? "pill" : M,
            { t: H } = (0, s.f)(),
            W = I ? (0, x._)(I) : null,
            [q, Z] = (0, a.useState)(!1);
          if (!W) return null;
          let F = (function (e) {
              try {
                let t = new URL(e).pathname.split("/").filter(Boolean),
                  n = t[0]?.toLowerCase();
                if (n && !["p", "reel", "reels", "tv"].includes(n))
                  return t[0].replace(/^@/, "");
                return "Instagram";
              } catch {
                return "Instagram";
              }
            })(W),
            G = F.length > 10 ? `${F.slice(0, 10)}...` : F;
          U[0] !== F ||
          U[1] !== B ||
          U[2] !== W ||
          U[3] !== H ||
          U[4] !== G ||
          U[5] !== O
            ? ((p =
                "glyph" === O
                  ? (0, t.jsx)(h.f, {
                      "aria-label": H("web.embeds.view_on_instagram"),
                      className: d.x,
                      "data-testid": "instagram-badge",
                      href: W,
                      onClick: B,
                      onPointerDown: _,
                      children: (0, t.jsx)(r.PW, { className: d.v }),
                    })
                  : (0, t.jsx)(f.f, {
                      variant: "outline",
                      className: m.z,
                      "data-testid": "instagram-badge",
                      children: (0, t.jsxs)(h.f, {
                        href: W,
                        className: m.w,
                        onPointerDown: j,
                        onClick: B,
                        children: [
                          (0, t.jsx)(o.u, { className: "size-3.5 shrink-0" }),
                          (0, t.jsx)("span", {
                            className: "md:hidden",
                            children: F,
                          }),
                          (0, t.jsx)("span", {
                            className: "hidden md:inline lg:hidden",
                            children: G,
                          }),
                          (0, t.jsx)("span", {
                            className: "hidden lg:inline",
                            children: F,
                          }),
                        ],
                      }),
                    })),
              (U[0] = F),
              (U[1] = B),
              (U[2] = W),
              (U[3] = H),
              (U[4] = G),
              (U[5] = O),
              (U[6] = p))
            : (p = U[6]);
          let K = p;
          if (
            U[7] !== K ||
            U[8] !== I ||
            U[9] !== F ||
            U[10] !== q ||
            U[11] !== W ||
            U[12] !== Z ||
            U[13] !== O
          ) {
            L = Symbol.for("react.early_return_sentinel");
            e: {
              let e = v(I);
              if (e?.kind !== "post") {
                let e;
                (U[27] !== K || U[28] !== F || U[29] !== O
                  ? ((e =
                      "glyph" === O
                        ? (0, t.jsx)(c.f, {
                            trigger: (0, t.jsx)("span", {
                              className: "inline-flex",
                              children: K,
                            }),
                            children: (0, t.jsx)("p", { children: F }),
                          })
                        : K),
                    (U[27] = K),
                    (U[28] = F),
                    (U[29] = O),
                    (U[30] = e))
                  : (e = U[30]),
                  (L = e));
                break e;
              }
              ((b = l.c),
                (D = 200),
                (C = Z),
                (N = 0),
                U[31] !== K
                  ? ((k = (0, t.jsx)(l.b, {
                      asChild: !0,
                      children: (0, t.jsx)("div", {
                        className: "inline-flex max-w-full",
                        onPointerDown: y,
                        children: K,
                      }),
                    })),
                    (U[31] = K),
                    (U[32] = k))
                  : (k = U[32]),
                (g = l.P),
                (S = "start"),
                U[33] === Symbol.for("react.memo_cache_sentinel")
                  ? ((P = (0, i.c)(
                      "w-[min(420px,calc(100vw-2rem))] max-h-[min(560px,70vh)] overflow-y-auto border-border-secondary bg-bg-secondary p-3 text-text-primary shadow-xl",
                    )),
                    (U[33] = P))
                  : (P = U[33]),
                ($ = 12),
                (T = "bottom"),
                (z = 8),
                (A = q
                  ? (0, t.jsx)(u, {
                      embedSrc: w(e),
                      href: W,
                      title: `Instagram ${F}`,
                    })
                  : null));
            }
            ((U[7] = K),
              (U[8] = I),
              (U[9] = F),
              (U[10] = q),
              (U[11] = W),
              (U[12] = Z),
              (U[13] = O),
              (U[14] = g),
              (U[15] = b),
              (U[16] = C),
              (U[17] = N),
              (U[18] = k),
              (U[19] = L),
              (U[20] = S),
              (U[21] = P),
              (U[22] = $),
              (U[23] = T),
              (U[24] = z),
              (U[25] = A),
              (U[26] = D));
          } else
            ((g = U[14]),
              (b = U[15]),
              (C = U[16]),
              (N = U[17]),
              (k = U[18]),
              (L = U[19]),
              (S = U[20]),
              (P = U[21]),
              ($ = U[22]),
              (T = U[23]),
              (z = U[24]),
              (A = U[25]),
              (D = U[26]));
          return L !== Symbol.for("react.early_return_sentinel")
            ? L
            : (U[34] !== g ||
              U[35] !== S ||
              U[36] !== P ||
              U[37] !== $ ||
              U[38] !== T ||
              U[39] !== z ||
              U[40] !== A
                ? ((R = (0, t.jsx)(g, {
                    align: S,
                    className: P,
                    collisionPadding: $,
                    side: T,
                    sideOffset: z,
                    children: A,
                  })),
                  (U[34] = g),
                  (U[35] = S),
                  (U[36] = P),
                  (U[37] = $),
                  (U[38] = T),
                  (U[39] = z),
                  (U[40] = A),
                  (U[41] = R))
                : (R = U[41]),
              U[42] !== b ||
              U[43] !== C ||
              U[44] !== N ||
              U[45] !== k ||
              U[46] !== R ||
              U[47] !== D
                ? ((E = (0, t.jsxs)(b, {
                    closeDelay: D,
                    onOpenChange: C,
                    openDelay: N,
                    children: [k, R],
                  })),
                  (U[42] = b),
                  (U[43] = C),
                  (U[44] = N),
                  (U[45] = k),
                  (U[46] = R),
                  (U[47] = D),
                  (U[48] = E))
                : (E = U[48]),
              E);
        },
      ],
      317970,
    ),
    e.i(39065));
  var C = e.i(908163);
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          l,
          a,
          o,
          d = (0, n.c)(12),
          { className: m } = e,
          { t: h } = (0, s.f)();
        return (
          d[0] !== h
            ? ((r = h("web.coin.offchain")), (d[0] = h), (d[1] = r))
            : (r = d[1]),
          d[2] !== m || d[3] !== r
            ? ((i = (0, t.jsx)("span", {
                className: "inline-flex cursor-help",
                children: (0, t.jsx)(C.E, {
                  density: "terminal",
                  className: m,
                  children: r,
                }),
              })),
              (d[2] = m),
              (d[3] = r),
              (d[4] = i))
            : (i = d[4]),
          d[5] !== h
            ? ((l = h("web.coin.offchain_tooltip")), (d[5] = h), (d[6] = l))
            : (l = d[6]),
          d[7] !== l
            ? ((a = (0, t.jsx)("p", { children: l })), (d[7] = l), (d[8] = a))
            : (a = d[8]),
          d[9] !== i || d[10] !== a
            ? ((o = (0, t.jsx)(c.f, { trigger: i, children: a })),
              (d[9] = i),
              (d[10] = a),
              (d[11] = o))
            : (o = d[11]),
          o
        );
      },
    ],
    358225,
  );
  let N = (e) => {
    let r,
      i,
      l = (0, n.c)(3),
      { className: a } = e,
      s = void 0 === a ? "" : a;
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("path", {
            d: "M10.9199 1.74854C10.9508 1.74803 11.0073 1.75256 11.0684 1.76709C11.0995 1.77452 11.1291 1.78397 11.1553 1.79541L11.2236 1.83545C11.2801 1.88221 11.3013 1.94696 11.3145 2.01807V2.01904C11.3265 2.0941 11.3429 2.26522 11.3301 2.39111V2.39209C11.2116 3.63749 10.7944 6.22309 10.4453 8.22705L10.1318 9.96631C9.98764 10.7408 9.72123 10.8985 9.55664 10.9136C9.2975 10.9373 9.06216 10.854 8.80859 10.7056C8.68146 10.6311 8.55284 10.5427 8.41602 10.4458L7.98438 10.146C7.52006 9.84241 7.15678 9.59608 6.7959 9.35107L5.62207 8.56396C5.36924 8.39792 5.24325 8.26427 5.18848 8.15967C5.14008 8.06717 5.14217 7.98925 5.18066 7.90186C5.2242 7.80308 5.31372 7.69543 5.44336 7.56396C5.50691 7.49953 5.57609 7.43327 5.65039 7.36182C5.72389 7.29113 5.80125 7.21562 5.87793 7.13623H5.87891C5.95326 7.05906 6.66028 6.41285 7.37012 5.74463C7.72211 5.41327 8.07228 5.07806 8.33789 4.81201C8.47029 4.67939 8.58367 4.56239 8.66602 4.47021C8.70701 4.42431 8.74274 4.38191 8.76953 4.34619C8.78283 4.32845 8.7959 4.30961 8.80664 4.2915C8.8157 4.27619 8.83045 4.24995 8.83789 4.21826C8.84621 4.18305 8.8501 4.12886 8.8418 4.07275C8.83347 4.01649 8.80838 3.93225 8.73535 3.86865H8.73438C8.664 3.80695 8.5823 3.792 8.52051 3.7915C8.49041 3.79129 8.46119 3.79428 8.43555 3.79834L8.37207 3.81104C8.34123 3.81799 8.3107 3.83455 8.29785 3.84131C8.27764 3.85193 8.2522 3.86548 8.22363 3.88232C8.16606 3.91628 8.08761 3.96591 7.98828 4.02881C7.78927 4.15483 7.50304 4.34022 7.13086 4.58545C6.38582 5.07636 5.29152 5.80745 3.84863 6.77783L3.84766 6.77881C3.441 7.05762 3.09225 7.17875 2.7959 7.17236C2.62738 7.16872 2.36686 7.12022 2.07129 7.04639C1.92522 7.00989 1.77347 6.96778 1.625 6.92432L1.19727 6.79248C0.853458 6.68085 0.576242 6.60462 0.380859 6.51025C0.285521 6.4642 0.228292 6.42214 0.197266 6.38428C0.184398 6.36851 0.174938 6.35266 0.169922 6.33545L0.166992 6.27686C0.170244 6.25019 0.196349 6.18925 0.31543 6.10107C0.430211 6.01613 0.606757 5.9237 0.851562 5.82666L0.856445 5.82471C3.94417 4.48409 6.00158 3.60071 7.0293 3.17432C8.50066 2.5645 9.38516 2.20814 9.95117 2.00342C10.52 1.79767 10.7502 1.75155 10.9199 1.74854Z",
            fill: "#A1A1AA",
            stroke: "#A1A1AA",
            strokeWidth: "0.33093",
          })),
          (l[0] = r))
        : (r = l[0]),
      l[1] !== s
        ? ((i = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "13",
            viewBox: "0 0 12 13",
            fill: "none",
            className: s,
            children: r,
          })),
          (l[1] = s),
          (l[2] = i))
        : (i = l[2]),
      i
    );
  };
  e.s(
    [
      "f",
      0,
      function ({ telegramUrl: e, onInteract: n, variant: i = "pill" }) {
        let { t: l } = (0, s.f)(),
          a = e ? (0, x._)(e) : null;
        if (!a) return null;
        let o = ((e) => {
            try {
              let t = new URL(e).pathname.split("/").pop();
              return t ? `${t}` : "Telegram";
            } catch {
              return "Telegram";
            }
          })(a),
          u = o.length > 10 ? `${o.slice(0, 10)}...` : o;
        return "glyph" === i
          ? (0, t.jsx)(c.f, {
              trigger: (0, t.jsx)("span", {
                className: "inline-flex",
                children: (0, t.jsx)(h.f, {
                  "aria-label": l("coin_details.info.telegram"),
                  className: d.x,
                  "data-testid": "telegram-badge",
                  href: a,
                  onClick: n,
                  children: (0, t.jsx)(r.$$, { className: d.v }),
                }),
              }),
              children: (0, t.jsx)("p", { children: o }),
            })
          : (0, t.jsx)(f.f, {
              variant: "outline",
              className: m.z,
              "data-testid": "telegram-badge",
              children: (0, t.jsxs)(h.f, {
                href: a,
                className: m.w,
                onClick: n,
                children: [
                  (0, t.jsx)(N, { className: "h-3.5 w-3.5 shrink-0" }),
                  (0, t.jsx)("span", { className: "md:hidden", children: o }),
                  (0, t.jsx)("span", {
                    className: "hidden md:inline lg:hidden",
                    children: u,
                  }),
                  (0, t.jsx)("span", {
                    className: "hidden lg:inline",
                    children: o,
                  }),
                ],
              }),
            });
      },
    ],
    401488,
  );
  let k = /\/video\/(\d+)/,
    L = /^\d+$/,
    S = /^@([A-Za-z0-9._]+)$/;
  function P(e) {
    let t = e.replace(/^www\./, "").toLowerCase();
    return /(^|\.)tiktok\.com$/.test(t);
  }
  function $(e) {
    let t,
      n = (0, x._)(e ?? "");
    if (!n) return null;
    try {
      t = new URL(n);
    } catch {
      return null;
    }
    if (!P(t.hostname)) return null;
    let r = (function (e) {
        let t = e.split("/").filter(Boolean)[0];
        if (!t) return null;
        let n = t.match(S);
        return n?.[1] ?? null;
      })(t.pathname),
      i = (function (e) {
        let t = (0, x._)(e ?? "");
        if (!t) return null;
        try {
          var n;
          let e = new URL(t);
          if (!P(e.hostname)) return null;
          let r = e.pathname.match(k);
          return (n = r?.[1]) && L.test(n) ? n : null;
        } catch {
          return null;
        }
      })(n);
    return i
      ? { kind: "video", videoId: i, handle: r }
      : r
        ? { kind: "profile", handle: r }
        : null;
  }
  function T(e) {
    let t = new URLSearchParams({
      rel: "0",
      description: "0",
      music_info: "0",
    });
    return `https://www.tiktok.com/player/v1/${e}?${t.toString()}`;
  }
  function z(e) {
    let r,
      l,
      a,
      s,
      o = (0, n.c)(10),
      { videoId: c, className: d, title: m } = e,
      h = void 0 === m ? "TikTok video" : m;
    return (
      o[0] !== d
        ? ((r = (0, i.c)("relative aspect-[9/16] w-full", d)),
          (o[0] = d),
          (o[1] = r))
        : (r = o[1]),
      o[2] !== c ? ((l = T(c)), (o[2] = c), (o[3] = l)) : (l = o[3]),
      o[4] !== l || o[5] !== h
        ? ((a = (0, t.jsx)("iframe", {
            allow: "encrypted-media; fullscreen",
            allowFullScreen: !0,
            className: "absolute inset-0 h-full w-full border-0",
            src: l,
            title: h,
          })),
          (o[4] = l),
          (o[5] = h),
          (o[6] = a))
        : (a = o[6]),
      o[7] !== r || o[8] !== a
        ? ((s = (0, t.jsx)("div", { className: r, children: a })),
          (o[7] = r),
          (o[8] = a),
          (o[9] = s))
        : (s = o[9]),
      s
    );
  }
  function A(e) {
    return e.stopPropagation();
  }
  function D(e) {
    return e.stopPropagation();
  }
  function R(e) {
    return e.stopPropagation();
  }
  (e.s(["f", 0, T, "o", 0, $], 435048),
    e.s(
      [
        "f",
        0,
        function (e) {
          let u,
            p,
            g,
            b,
            v,
            w,
            y,
            j,
            _,
            C = (0, n.c)(28),
            { tiktokUrl: N, onInteract: k, variant: L } = e,
            S = void 0 === L ? "pill" : L,
            { t: P } = (0, s.f)();
          C[0] !== N
            ? ((u = N ? (0, x._)(N) : null), (C[0] = N), (C[1] = u))
            : (u = C[1]);
          let T = u,
            [E, U] = (0, a.useState)(!1);
          if (!T) return null;
          C[2] !== N ? ((p = $(N)), (C[2] = N), (C[3] = p)) : (p = C[3]);
          let I = p,
            B = I?.handle ? `@${I.handle}` : "TikTok";
          C[4] !== B
            ? ((g = B.length > 12 ? `${B.slice(0, 12)}...` : B),
              (C[4] = B),
              (C[5] = g))
            : (g = C[5]);
          let M = g;
          C[6] !== B ||
          C[7] !== k ||
          C[8] !== T ||
          C[9] !== P ||
          C[10] !== M ||
          C[11] !== S
            ? ((b =
                "glyph" === S
                  ? (0, t.jsx)(h.f, {
                      "aria-label": P("news.tiktok_embed.view_on_tiktok"),
                      className: d.x,
                      "data-testid": "tiktok-badge",
                      href: T,
                      onClick: k,
                      onPointerDown: R,
                      children: (0, t.jsx)(r.Tq, { className: d.v }),
                    })
                  : (0, t.jsx)(f.f, {
                      variant: "outline",
                      className: m.z,
                      "data-testid": "tiktok-badge",
                      children: (0, t.jsxs)(h.f, {
                        href: T,
                        className: m.w,
                        onPointerDown: D,
                        onClick: k,
                        children: [
                          (0, t.jsx)(o.l, { className: "size-3.5 shrink-0" }),
                          (0, t.jsx)("span", {
                            className: "md:hidden",
                            children: B,
                          }),
                          (0, t.jsx)("span", {
                            className: "hidden md:inline lg:hidden",
                            children: M,
                          }),
                          (0, t.jsx)("span", {
                            className: "hidden lg:inline",
                            children: B,
                          }),
                        ],
                      }),
                    })),
              (C[6] = B),
              (C[7] = k),
              (C[8] = T),
              (C[9] = P),
              (C[10] = M),
              (C[11] = S),
              (C[12] = b))
            : (b = C[12]);
          let O = b;
          if (I?.kind !== "video") {
            let e;
            return (
              C[13] !== O || C[14] !== B || C[15] !== S
                ? ((e =
                    "glyph" === S
                      ? (0, t.jsx)(c.f, {
                          trigger: (0, t.jsx)("span", {
                            className: "inline-flex",
                            children: O,
                          }),
                          children: (0, t.jsx)("p", { children: B }),
                        })
                      : O),
                  (C[13] = O),
                  (C[14] = B),
                  (C[15] = S),
                  (C[16] = e))
                : (e = C[16]),
              e
            );
          }
          C[17] !== O
            ? ((v = (0, t.jsx)(l.b, {
                asChild: !0,
                children: (0, t.jsx)("div", {
                  className: "inline-flex max-w-full",
                  onPointerDown: A,
                  children: O,
                }),
              })),
              (C[17] = O),
              (C[18] = v))
            : (v = C[18]);
          let H = v;
          return (
            C[19] === Symbol.for("react.memo_cache_sentinel")
              ? ((w = (0, i.c)(
                  "max-h-[min(560px,70vh)] w-[280px] overflow-y-auto border-border-secondary bg-bg-secondary p-3 text-text-primary shadow-xl",
                )),
                (C[19] = w))
              : (w = C[19]),
            C[20] !== I || C[21] !== E
              ? ((y = E
                  ? (0, t.jsx)("div", {
                      className:
                        "overflow-hidden rounded-xl border border-border-secondary bg-black",
                      children: (0, t.jsx)(z, { videoId: I.videoId }),
                    })
                  : null),
                (C[20] = I),
                (C[21] = E),
                (C[22] = y))
              : (y = C[22]),
            C[23] !== y
              ? ((j = (0, t.jsx)(l.P, {
                  align: "start",
                  className: w,
                  collisionPadding: 12,
                  side: "bottom",
                  sideOffset: 8,
                  children: y,
                })),
                (C[23] = y),
                (C[24] = j))
              : (j = C[24]),
            C[25] !== j || C[26] !== H
              ? ((_ = (0, t.jsxs)(l.c, {
                  closeDelay: 200,
                  onOpenChange: U,
                  openDelay: 0,
                  children: [H, j],
                })),
                (C[25] = j),
                (C[26] = H),
                (C[27] = _))
              : (_ = C[27]),
            _
          );
        },
      ],
      47029,
    ));
  var E = e.i(6360),
    U = e.i(962773),
    I = e.i(516579);
  function B(e) {
    return e.stopPropagation();
  }
  function M(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          l,
          a,
          s = (0, n.c)(19),
          {
            twitterUrl: o,
            coinName: u,
            onInteract: p,
            variant: g,
            glyphTone: b,
          } = e,
          v = void 0 === g ? "pill" : g,
          w = void 0 === b ? "blue" : b,
          y = o ? (0, x._)(o) : null;
        s[0] !== o ? ((i = (0, I.h)(o)), (s[0] = o), (s[1] = i)) : (i = s[1]);
        let j = i,
          _ = (0, U.y)(j);
        if (!y) return null;
        let C = (0, U.X)({ href: y, coinName: u }),
          N = C.length > 10 ? `${C.slice(0, 10)}...` : C;
        s[2] !== _ ||
        s[3] !== w ||
        s[4] !== C ||
        s[5] !== p ||
        s[6] !== y ||
        s[7] !== N ||
        s[8] !== v
          ? ((l =
              "glyph" === v
                ? (0, t.jsx)(h.f, {
                    "aria-label": _,
                    className: "neutral" === w ? d.$ : d.G,
                    "data-testid": "twitter-badge",
                    href: y,
                    onClick: p,
                    onPointerDown: M,
                    children: (0, t.jsx)(r.Tc, { className: d.v }),
                  })
                : (0, t.jsx)(f.f, {
                    variant: "outline",
                    className: m.z,
                    "data-testid": "twitter-badge",
                    children: (0, t.jsxs)(h.f, {
                      href: y,
                      className: m.w,
                      onPointerDown: B,
                      onClick: p,
                      children: [
                        (0, t.jsx)(E.f, { className: "size-3.5 shrink-0" }),
                        (0, t.jsx)("span", {
                          className: "md:hidden",
                          children: C,
                        }),
                        (0, t.jsx)("span", {
                          className: "hidden md:inline lg:hidden",
                          children: N,
                        }),
                        (0, t.jsx)("span", {
                          className: "hidden lg:inline",
                          children: C,
                        }),
                      ],
                    }),
                  })),
            (s[2] = _),
            (s[3] = w),
            (s[4] = C),
            (s[5] = p),
            (s[6] = y),
            (s[7] = N),
            (s[8] = v),
            (s[9] = l))
          : (l = s[9]);
        let k = l;
        if (!j) {
          let e;
          return (
            s[10] !== k || s[11] !== _ || s[12] !== v
              ? ((e =
                  "glyph" === v
                    ? (0, t.jsx)(c.f, {
                        trigger: (0, t.jsx)("span", {
                          className: "inline-flex",
                          children: k,
                        }),
                        children: (0, t.jsx)("p", { children: _ }),
                      })
                    : k),
                (s[10] = k),
                (s[11] = _),
                (s[12] = v),
                (s[13] = e))
              : (e = s[13]),
            e
          );
        }
        return (
          s[14] !== k || s[15] !== C || s[16] !== j || s[17] !== y
            ? ((a = (0, t.jsx)(U.D, {
                communityLabel: C,
                href: y,
                link: j,
                children: k,
              })),
              (s[14] = k),
              (s[15] = C),
              (s[16] = j),
              (s[17] = y),
              (s[18] = a))
            : (a = s[18]),
          a
        );
      },
    ],
    546485,
  );
  let O = (e) => {
    let r,
      i,
      l = (0, n.c)(3),
      { className: a } = e,
      s = void 0 === a ? "" : a;
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("path", {
            d: "M6 11.0835C8.62335 11.0835 10.75 8.95685 10.75 6.3335C10.75 3.71014 8.62335 1.5835 6 1.5835M6 11.0835C3.37665 11.0835 1.25 8.95685 1.25 6.3335C1.25 3.71014 3.37665 1.5835 6 1.5835M6 11.0835C4.89543 11.0835 4 8.95685 4 6.3335C4 3.71014 4.89543 1.5835 6 1.5835M6 11.0835C7.10457 11.0835 8 8.95685 8 6.3335C8 3.71014 7.10457 1.5835 6 1.5835M10.5 6.3335H1.5",
            stroke: "currentColor",
            strokeLinecap: "square",
          })),
          (l[0] = r))
        : (r = l[0]),
      l[1] !== s
        ? ((i = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "13",
            viewBox: "0 0 12 13",
            fill: "none",
            className: s,
            children: r,
          })),
          (l[1] = s),
          (l[2] = i))
        : (i = l[2]),
      i
    );
  };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          l,
          a,
          o,
          u,
          p,
          g,
          b,
          v = (0, n.c)(30),
          { websiteUrl: w, onInteract: y, variant: j } = e,
          { t: _ } = (0, s.f)();
        if (v[0] !== w) {
          l = Symbol.for("react.early_return_sentinel");
          e: {
            if (!(r = w ? (0, x._)(w) : null)) {
              l = null;
              break e;
            }
            i =
              (a = (function (e) {
                try {
                  let t = new URL(e).hostname;
                  return (t.startsWith("www.") && (t = t.substring(4)), t);
                } catch {
                  return "Website";
                }
              })(r)).length > 10
                ? `${a.slice(0, 10)}...`
                : a;
          }
          ((v[0] = w), (v[1] = r), (v[2] = i), (v[3] = l), (v[4] = a));
        } else ((r = v[1]), (i = v[2]), (l = v[3]), (a = v[4]));
        if (l !== Symbol.for("react.early_return_sentinel")) return l;
        let C = i;
        if ("glyph" === (void 0 === j ? "pill" : j)) {
          let e, n, i, l, s;
          return (
            v[5] !== _
              ? ((e = _("coin_details.info.website")), (v[5] = _), (v[6] = e))
              : (e = v[6]),
            v[7] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = (0, t.jsx)(O, { className: d.v })), (v[7] = n))
              : (n = v[7]),
            v[8] !== y || v[9] !== r || v[10] !== e
              ? ((i = (0, t.jsx)("span", {
                  className: "inline-flex",
                  children: (0, t.jsx)(h.f, {
                    "aria-label": e,
                    className: d.x,
                    "data-testid": "website-badge",
                    href: r,
                    onClick: y,
                    children: n,
                  }),
                })),
                (v[8] = y),
                (v[9] = r),
                (v[10] = e),
                (v[11] = i))
              : (i = v[11]),
            v[12] !== a
              ? ((l = (0, t.jsx)("p", { children: a })),
                (v[12] = a),
                (v[13] = l))
              : (l = v[13]),
            v[14] !== i || v[15] !== l
              ? ((s = (0, t.jsx)(c.f, { trigger: i, children: l })),
                (v[14] = i),
                (v[15] = l),
                (v[16] = s))
              : (s = v[16]),
            s
          );
        }
        return (
          v[17] === Symbol.for("react.memo_cache_sentinel")
            ? ((o = (0, t.jsx)(O, { className: "h-3.5 w-3.5 shrink-0" })),
              (v[17] = o))
            : (o = v[17]),
          v[18] !== a
            ? ((u = (0, t.jsx)("span", {
                className: "md:hidden",
                children: a,
              })),
              (v[18] = a),
              (v[19] = u))
            : (u = v[19]),
          v[20] !== C
            ? ((p = (0, t.jsx)("span", {
                className: "hidden md:inline lg:hidden",
                children: C,
              })),
              (v[20] = C),
              (v[21] = p))
            : (p = v[21]),
          v[22] !== a
            ? ((g = (0, t.jsx)("span", {
                className: "hidden lg:inline",
                children: a,
              })),
              (v[22] = a),
              (v[23] = g))
            : (g = v[23]),
          v[24] !== y ||
          v[25] !== r ||
          v[26] !== u ||
          v[27] !== p ||
          v[28] !== g
            ? ((b = (0, t.jsx)(f.f, {
                variant: "outline",
                className: m.z,
                "data-testid": "website-badge",
                children: (0, t.jsxs)(h.f, {
                  href: r,
                  className: m.w,
                  onClick: y,
                  children: [o, u, p, g],
                }),
              })),
              (v[24] = y),
              (v[25] = r),
              (v[26] = u),
              (v[27] = p),
              (v[28] = g),
              (v[29] = b))
            : (b = v[29]),
          b
        );
      },
    ],
    601829,
  ),
    e.s([], 20004));
};
