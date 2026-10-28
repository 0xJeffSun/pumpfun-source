// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    r = e.i(439587),
    s = e.i(599077),
    l = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(375670),
    o = e.i(338319);
  let d = "rounded-2xl border border-border-secondary bg-bg-secondary",
    c = `${d} transition-colors hover:border-border-tertiary`,
    m =
      "h-9 rounded-full border border-border-secondary bg-bg-secondary text-sm text-text-primary transition-colors hover:border-border-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/40",
    u = `${m} inline-flex size-9 shrink-0 items-center justify-center text-text-secondary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50`;
  function x(e, a) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "flex items-center gap-3 border-t border-border-secondary/50 px-4 py-3 first:border-t-0",
        children: [
          (0, t.jsx)(n.f, { className: "h-3 w-5" }),
          (0, t.jsx)(n.f, { className: "size-9 rounded-[10px]" }),
          (0, t.jsx)(n.f, { className: "h-3.5 w-36" }),
          (0, t.jsx)(n.f, { className: "ml-auto h-3.5 w-24" }),
          (0, t.jsx)(n.f, { className: "h-3.5 w-20" }),
        ],
      },
      a,
    );
  }
  function h(e, a) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex flex-col gap-2 px-5 py-4",
        children: [
          (0, t.jsx)(n.f, { className: "h-3 w-24" }),
          (0, t.jsx)(n.f, { className: "h-8 w-32" }),
          (0, t.jsx)(n.f, { className: "h-3 w-28" }),
        ],
      },
      a,
    );
  }
  (e.s(
    [
      "I",
      0,
      d,
      "t",
      0,
      c,
      "O",
      0,
      "inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary",
      "B",
      0,
      "inline-flex items-center gap-2 text-base font-semibold text-text-primary",
      "x",
      0,
      m,
      "K",
      0,
      "font-bold tabular-nums text-text-accent",
      "p",
      0,
      "pointer-events-none absolute -inset-x-[var(--padding-x-main)] -top-24 -z-10 h-[620px] bg-[radial-gradient(1000px_560px_at_16%_40px,rgba(134,239,172,0.10),transparent_62%)]",
      "v",
      0,
      u,
      "X",
      0,
      "text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary",
      "z",
      0,
      "text-xs text-text-tertiary",
      "T",
      0,
      "text-xl font-semibold leading-[26px] tracking-[-0.02em] text-text-primary",
    ],
    118863,
  ),
    e.s(
      [
        "HolderRewardsEmpty",
        0,
        function (e) {
          let r,
            s,
            l,
            n,
            o,
            d,
            c,
            m = (0, a.c)(17),
            { onReset: u } = e,
            { t: x } = (0, i.f)();
          return (
            m[0] !== x
              ? ((r = x("web.holder_rewards.empty_title")),
                (m[0] = x),
                (m[1] = r))
              : (r = m[1]),
            m[2] !== r
              ? ((s = (0, t.jsx)("p", {
                  className: "text-base font-semibold text-text-primary",
                  children: r,
                })),
                (m[2] = r),
                (m[3] = s))
              : (s = m[3]),
            m[4] !== x
              ? ((l = x("web.holder_rewards.empty_body")),
                (m[4] = x),
                (m[5] = l))
              : (l = m[5]),
            m[6] !== l
              ? ((n = (0, t.jsx)("p", {
                  className: "text-sm text-text-tertiary",
                  children: l,
                })),
                (m[6] = l),
                (m[7] = n))
              : (n = m[7]),
            m[8] !== x
              ? ((o = x("web.holder_rewards.clear_all")),
                (m[8] = x),
                (m[9] = o))
              : (o = m[9]),
            m[10] !== u || m[11] !== o
              ? ((d = (0, t.jsx)("button", {
                  type: "button",
                  onClick: u,
                  className:
                    "mt-3 rounded-full border border-border-tertiary px-4 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-secondary",
                  children: o,
                })),
                (m[10] = u),
                (m[11] = o),
                (m[12] = d))
              : (d = m[12]),
            m[13] !== s || m[14] !== n || m[15] !== d
              ? ((c = (0, t.jsxs)("div", {
                  className:
                    "flex flex-col items-center gap-2 px-6 py-14 text-center",
                  "data-testid": "holder-rewards-empty",
                  children: [s, n, d],
                })),
                (m[13] = s),
                (m[14] = n),
                (m[15] = d),
                (m[16] = c))
              : (c = m[16]),
            c
          );
        },
        "HolderRewardsLoadFailed",
        0,
        function () {
          let e,
            n,
            c,
            m,
            u,
            x,
            h,
            p,
            f,
            b = (0, a.c)(21),
            { t: w } = (0, i.f)(),
            { refresh: g } = (0, s.useRouter)(),
            [y, _] = (0, l.useTransition)();
          return (
            b[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, o.c)(
                  d,
                  "mx-auto my-16 flex max-w-xl flex-col items-center gap-2 px-6 py-12 text-center",
                )),
                (b[0] = e))
              : (e = b[0]),
            b[1] !== w
              ? ((n = w("web.holder_rewards.error_title")),
                (b[1] = w),
                (b[2] = n))
              : (n = b[2]),
            b[3] !== n
              ? ((c = (0, t.jsx)("p", {
                  className: "text-base font-semibold text-text-primary",
                  children: n,
                })),
                (b[3] = n),
                (b[4] = c))
              : (c = b[4]),
            b[5] !== w
              ? ((m = w("web.holder_rewards.error_body")),
                (b[5] = w),
                (b[6] = m))
              : (m = b[6]),
            b[7] !== m
              ? ((u = (0, t.jsx)("p", {
                  className: "text-sm text-text-tertiary",
                  children: m,
                })),
                (b[7] = m),
                (b[8] = u))
              : (u = b[8]),
            b[9] !== g
              ? ((x = () => _(() => g())), (b[9] = g), (b[10] = x))
              : (x = b[10]),
            b[11] !== w
              ? ((h = w("web.common.try_again")), (b[11] = w), (b[12] = h))
              : (h = b[12]),
            b[13] !== y || b[14] !== x || b[15] !== h
              ? ((p = (0, t.jsx)("div", {
                  className: "mt-4",
                  children: (0, t.jsx)(r.K, {
                    isRounded: !0,
                    size: 40,
                    variant: "secondary",
                    isLoading: y,
                    onClick: x,
                    children: h,
                  }),
                })),
                (b[13] = y),
                (b[14] = x),
                (b[15] = h),
                (b[16] = p))
              : (p = b[16]),
            b[17] !== c || b[18] !== u || b[19] !== p
              ? ((f = (0, t.jsxs)("div", {
                  className: e,
                  role: "alert",
                  "data-testid": "holder-rewards-load-failed",
                  children: [c, u, p],
                })),
                (b[17] = c),
                (b[18] = u),
                (b[19] = p),
                (b[20] = f))
              : (f = b[20]),
            f
          );
        },
        "HolderRewardsPageSkeleton",
        0,
        function () {
          let e,
            r,
            s,
            l,
            c,
            m,
            u = (0, a.c)(9),
            { t: p } = (0, i.f)();
          return (
            u[0] !== p
              ? ((e = p("web.holder_rewards.loading")), (u[0] = p), (u[1] = e))
              : (e = u[1]),
            u[2] !== e
              ? ((r = (0, t.jsx)("span", {
                  className: "sr-only",
                  children: e,
                })),
                (u[2] = e),
                (u[3] = r))
              : (r = u[3]),
            u[4] === Symbol.for("react.memo_cache_sentinel")
              ? ((s = (0, t.jsxs)("div", {
                  className: "flex flex-col gap-3 px-2",
                  children: [
                    (0, t.jsx)(n.f, { className: "h-12 w-[min(520px,80%)]" }),
                    (0, t.jsx)(n.f, { className: "h-5 w-[min(720px,100%)]" }),
                  ],
                })),
                (u[4] = s))
              : (s = u[4]),
            u[5] === Symbol.for("react.memo_cache_sentinel")
              ? ((l = (0, t.jsx)("div", {
                  className: "@container",
                  children: (0, t.jsx)("div", {
                    className: (0, o.c)(d, "grid grid-cols-1 @xl:grid-cols-2"),
                    children: Array.from({ length: 2 }).map(h),
                  }),
                })),
                (c = (0, t.jsx)("div", {
                  className: (0, o.c)(d, "overflow-hidden"),
                  children: Array.from({ length: 8 }).map(x),
                })),
                (u[5] = l),
                (u[6] = c))
              : ((l = u[5]), (c = u[6])),
            u[7] !== r
              ? ((m = (0, t.jsxs)("div", {
                  "aria-busy": !0,
                  className: "flex w-full flex-col gap-10 pb-16 pt-6",
                  "data-testid": "holder-rewards-skeleton",
                  children: [r, s, l, c],
                })),
                (u[7] = r),
                (u[8] = m))
              : (m = u[8]),
            m
          );
        },
      ],
      754296,
    ));
};
