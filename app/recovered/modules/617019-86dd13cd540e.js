// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(759818),
    n = e.i(381577),
    l = e.i(458310),
    s = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    c = e.i(370562),
    d = e.i(382828),
    u = e.i(693957),
    m = e.i(231417),
    f = e.i(886973),
    p = e.i(29542),
    h = e.i(170450),
    b = e.i(187611);
  let x = {
      labelKey: "web.footer.blog",
      href: "https://medium.com/@pumpdotfun_",
      external: !0,
    },
    g = {
      titleKey: "web.footer.section_resources",
      links: [
        {
          labelKey: "web.footer.pump_swap",
          href: "https://swap.pump.fun",
          external: !0,
        },
        { labelKey: "web.footer.fees", href: "/docs/fees" },
        {
          labelKey: "web.footer.revenue",
          href: "https://fees.pump.fun/",
          external: !0,
        },
        {
          labelKey: "web.footer.updates",
          href: "https://t.me/pump_tech_updates",
          external: !0,
        },
        {
          labelKey: "web.footer.wallet_login_changes",
          href: "/docs/wallet-login-changes",
        },
      ],
    },
    y = [
      { labelKey: "web.footer.privacy_policy", href: "/docs/privacy-policy" },
      {
        labelKey: "web.footer.terms_of_service",
        href: "/docs/terms-and-conditions",
      },
      {
        labelKey: "web.footer.tokenized_agent_disclaimer",
        href: "/docs/tokenized-agent-disclaimer",
      },
      {
        labelKey: "web.footer.livestream_policy",
        href: "/docs/livestream-moderation-policy",
      },
      { labelKey: "web.footer.dmca_policy", href: "/docs/dmca-policy" },
      {
        labelKey: "web.footer.trademark_guidelines",
        href: "/docs/trademark-guidelines",
      },
      { labelKey: "web.footer.charity_coins", href: "/docs/charitycoins" },
      { labelKey: "web.footer.go_fun_terms", href: "/docs/go-fun-terms" },
    ],
    v = "--layout-footer-offset",
    w = "text-text-tertiary transition-colors hover:text-text-primary";
  function _(e) {
    let a,
      i,
      n = (0, r.c)(12),
      { link: s } = e,
      { t: c } = (0, o.f)();
    if (s.external) {
      let e,
        r,
        a = s.href;
      return (
        n[0] !== s.labelKey || n[1] !== c
          ? ((e = c(s.labelKey)), (n[0] = s.labelKey), (n[1] = c), (n[2] = e))
          : (e = n[2]),
        n[3] !== s.href || n[4] !== e
          ? ((r = (0, t.jsx)("a", {
              href: a,
              target: "_blank",
              rel: "noopener noreferrer",
              className: w,
              children: e,
            })),
            (n[3] = s.href),
            (n[4] = e),
            (n[5] = r))
          : (r = n[5]),
        r
      );
    }
    let d = s.href;
    return (
      n[6] !== s.labelKey || n[7] !== c
        ? ((a = c(s.labelKey)), (n[6] = s.labelKey), (n[7] = c), (n[8] = a))
        : (a = n[8]),
      n[9] !== s.href || n[10] !== a
        ? ((i = (0, t.jsx)(l.default, {
            href: d,
            prefetch: !1,
            className: w,
            children: a,
          })),
          (n[9] = s.href),
          (n[10] = a),
          (n[11] = i))
        : (i = n[11]),
      i
    );
  }
  function j(e) {
    let i,
      n,
      s,
      c,
      p,
      h,
      b = (0, r.c)(16),
      { labelKey: x, links: g } = e,
      { t: y } = (0, o.f)();
    if (
      (b[0] !== x || b[1] !== y
        ? ((i = y(x)), (b[0] = x), (b[1] = y), (b[2] = i))
        : (i = b[2]),
      b[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(a.J0, {
            className:
              "size-3 transition-transform group-data-[popup-open]:rotate-180",
          })),
          (b[3] = n))
        : (n = b[3]),
      b[4] !== i
        ? ((s = (0, t.jsxs)(f.f, {
            className: `${w} group inline-flex items-center gap-1 outline-none`,
            children: [i, n],
          })),
          (b[4] = i),
          (b[5] = s))
        : (s = b[5]),
      b[6] !== g || b[7] !== y)
    ) {
      let e;
      (b[9] !== y
        ? ((e = (e) =>
            e.external
              ? (0, t.jsx)(
                  m.f,
                  {
                    render: (0, t.jsx)("a", {
                      href: e.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }),
                    children: y(e.labelKey),
                  },
                  e.href,
                )
              : (0, t.jsx)(
                  m.f,
                  {
                    render: (0, t.jsx)(l.default, {
                      href: e.href,
                      prefetch: !1,
                    }),
                    children: y(e.labelKey),
                  },
                  e.href,
                )),
          (b[9] = y),
          (b[10] = e))
        : (e = b[10]),
        (c = g.map(e)),
        (b[6] = g),
        (b[7] = y),
        (b[8] = c));
    } else c = b[8];
    return (
      b[11] !== c
        ? ((p = (0, t.jsx)(u.f, {
            side: "top",
            align: "start",
            sideOffset: 8,
            className: "min-w-48",
            children: c,
          })),
          (b[11] = c),
          (b[12] = p))
        : (p = b[12]),
      b[13] !== s || b[14] !== p
        ? ((h = (0, t.jsxs)(d.f, { modal: !1, children: [s, p] })),
          (b[13] = s),
          (b[14] = p),
          (b[15] = h))
        : (h = b[15]),
      h
    );
  }
  function C(e) {
    let a,
      i = (0, r.c)(4),
      { href: n, label: l, children: s } = e;
    return (
      i[0] !== s || i[1] !== n || i[2] !== l
        ? ((a = (0, t.jsx)("a", {
            href: n,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": l,
            className:
              "text-text-tertiary transition-colors hover:text-text-primary",
            children: s,
          })),
          (i[0] = s),
          (i[1] = n),
          (i[2] = l),
          (i[3] = a))
        : (a = i[3]),
      a
    );
  }
  function N(e) {
    let a,
      i,
      n,
      l,
      s,
      o = (0, r.c)(7),
      { isInstagramDisabled: d } = e;
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(C, {
            href: "https://twitter.com/pumpfun",
            label: (0, b.T)("X", "brand-name"),
            children: (0, t.jsx)(c.T, { className: "h-4 w-4" }),
          })),
          (o[0] = a))
        : (a = o[0]),
      o[1] !== d
        ? ((i = d
            ? null
            : (0, t.jsx)(C, {
                href: "https://www.instagram.com/pumpdotfun_/",
                label: (0, b.T)("Instagram", "brand-name"),
                children: (0, t.jsx)(c.u, { className: "h-4 w-4" }),
              })),
          (o[1] = d),
          (o[2] = i))
        : (i = o[2]),
      o[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(C, {
            href: "https://www.tiktok.com/@pump.fun",
            label: (0, b.T)("TikTok", "brand-name"),
            children: (0, t.jsx)(c.l, { className: "h-4 w-4" }),
          })),
          (o[3] = n))
        : (n = o[3]),
      o[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(C, {
            href: "https://www.youtube.com/@pumpfunofficial",
            label: (0, b.T)("YouTube", "brand-name"),
            children: (0, t.jsx)(c.y, { className: "h-4 w-4" }),
          })),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== i
        ? ((s = (0, t.jsxs)("div", {
            className: "flex items-center gap-4",
            children: [a, i, n, l],
          })),
          (o[5] = i),
          (o[6] = s))
        : (s = o[6]),
      s
    );
  }
  function S(e) {
    return (0, t.jsx)("li", { children: (0, t.jsx)(_, { link: e }) }, e.href);
  }
  e.s(
    [
      "Footer",
      0,
      () => {
        let e,
          a,
          l,
          c,
          d,
          u,
          m,
          f,
          b,
          w,
          C,
          k,
          E,
          A,
          I,
          T,
          R,
          L,
          O,
          M,
          D,
          F,
          P,
          z = (0, r.c)(29);
        z[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = new Date().getFullYear()), (z[0] = e))
          : (e = z[0]);
        let K = e,
          B =
            ((M = (0, r.c)(2)),
            (D = (0, s.useRef)(null)),
            M[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((L = () => {
                  if ("u" < typeof ResizeObserver) return;
                  let e = D.current;
                  if (!e) return;
                  let t = () => {
                    let t = e.offsetHeight;
                    0 === t
                      ? document.documentElement.style.removeProperty(v)
                      : document.documentElement.style.setProperty(v, `${t}px`);
                  };
                  t();
                  let r = new ResizeObserver(t);
                  return (
                    r.observe(e),
                    () => {
                      (r.disconnect(),
                        document.documentElement.style.removeProperty(v));
                    }
                  );
                }),
                (O = []),
                (M[0] = L),
                (M[1] = O))
              : ((L = M[0]), (O = M[1])),
            (0, s.useEffect)(L, O),
            D),
          H =
            ((F = (0, h.f)()),
            (P = (0, n.useLaunchDarklyKillSwitch)(
              i.f.INSTAGRAM_SOCIAL_LINK_KILLSWITCH,
            )),
            !F || P),
          { t: q } = (0, o.f)();
        z[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = { titleKey: "web.footer.section_legal", links: y }),
            (z[1] = a))
          : (a = z[1]);
        let W = a;
        z[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = [g, W]), (z[2] = l))
          : (l = z[2]);
        let U = l;
        return (
          z[3] !== q
            ? ((c = U.map((e) =>
                (0, t.jsxs)(
                  "nav",
                  {
                    "aria-label": q(e.titleKey),
                    children: [
                      (0, t.jsx)("h2", {
                        className:
                          "mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary",
                        children: q(e.titleKey),
                      }),
                      (0, t.jsx)("ul", {
                        className: "flex flex-col gap-2 text-sm",
                        children: e.links.map(S),
                      }),
                    ],
                  },
                  e.titleKey,
                ),
              )),
              (z[3] = q),
              (z[4] = c))
            : (c = z[4]),
          z[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = (0, t.jsx)("div", {
                className: "flex flex-col gap-2 text-sm",
                children: (0, t.jsx)(_, { link: x }),
              })),
              (z[5] = d))
            : (d = z[5]),
          z[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (0, t.jsxs)("p", {
                className: "text-xs",
                children: [p.f.FOOTER.COPYRIGHT, " ", K],
              })),
              (z[6] = u))
            : (u = z[6]),
          z[7] !== H
            ? ((m = (0, t.jsxs)("div", {
                className:
                  "flex flex-col items-start gap-4 border-t border-border-secondary pt-4 sm:flex-row sm:items-center sm:justify-between",
                children: [u, (0, t.jsx)(N, { isInstagramDisabled: H })],
              })),
              (z[7] = H),
              (z[8] = m))
            : (m = z[8]),
          z[9] !== c || z[10] !== m
            ? ((f = (0, t.jsxs)("div", {
                className:
                  "flex flex-col gap-8 px-[var(--padding-x-main)] pt-8 pb-4 md:hidden",
                children: [c, d, m],
              })),
              (z[9] = c),
              (z[10] = m),
              (z[11] = f))
            : (f = z[11]),
          z[12] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = (0, t.jsxs)("p", {
                className: "whitespace-nowrap",
                children: [p.f.FOOTER.COPYRIGHT, " ", K],
              })),
              (z[12] = b))
            : (b = z[12]),
          z[13] !== q
            ? ((w = q("web.footer.landmark")), (z[13] = q), (z[14] = w))
            : (w = z[14]),
          z[15] === Symbol.for("react.memo_cache_sentinel")
            ? ((C = (0, t.jsx)(_, { link: x })),
              (k = (0, t.jsx)(j, { labelKey: g.titleKey, links: g.links })),
              (E = (0, t.jsx)(j, { labelKey: W.titleKey, links: W.links })),
              (z[15] = C),
              (z[16] = k),
              (z[17] = E))
            : ((C = z[15]), (k = z[16]), (E = z[17])),
          z[18] !== w
            ? ((A = (0, t.jsxs)("nav", {
                "aria-label": w,
                className: "flex flex-wrap items-center gap-x-5 gap-y-2",
                children: [C, k, E],
              })),
              (z[18] = w),
              (z[19] = A))
            : (A = z[19]),
          z[20] !== H
            ? ((I = (0, t.jsx)(N, { isInstagramDisabled: H })),
              (z[20] = H),
              (z[21] = I))
            : (I = z[21]),
          z[22] !== A || z[23] !== I
            ? ((T = (0, t.jsxs)("div", {
                className:
                  "mx-auto hidden w-full max-w-screen-2xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[var(--padding-x-main)] pt-[var(--site-footer-pad-top,1.5rem)] pb-[var(--site-footer-pad-bottom,0.5rem)] text-xs md:flex",
                children: [b, A, I],
              })),
              (z[22] = A),
              (z[23] = I),
              (z[24] = T))
            : (T = z[24]),
          z[25] !== B || z[26] !== T || z[27] !== f
            ? ((R = (0, t.jsxs)("footer", {
                ref: B,
                className:
                  "z-[1] mt-auto border-t border-border-secondary bg-bg-primary text-text-tertiary max-md:mb-12",
                children: [f, T],
              })),
              (z[25] = B),
              (z[26] = T),
              (z[27] = f),
              (z[28] = R))
            : (R = z[28]),
          R
        );
      },
    ],
    617019,
  );
};
