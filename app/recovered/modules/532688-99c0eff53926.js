// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386);
  let a = (0, n.lazy)(() =>
    e.A(265123).then((e) => ({ default: e.BountyAttachmentUploader })),
  );
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          o,
          s = (0, r.c)(3);
        return (
          s[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((i = (0, t.jsx)("div", {
                className:
                  "min-h-[132px] animate-pulse rounded-[18px] border border-border-secondary bg-bg-tertiary",
              })),
              (s[0] = i))
            : (i = s[0]),
          s[1] !== e
            ? ((o = (0, t.jsx)(n.Suspense, {
                fallback: i,
                children: (0, t.jsx)(a, { ...e }),
              })),
              (s[1] = e),
              (s[2] = o))
            : (o = s[2]),
          o
        );
      },
    ],
    532688,
  );
  var i = e.i(745018),
    o = e.i(536925),
    s = e.i(630782),
    l = e.i(64457);
  function u(e) {
    return (0, t.jsxs)(
      "li",
      {
        children: [
          (0, t.jsx)("span", {
            className: "font-medium text-white",
            children: e,
          }),
          ": ",
          l.G[e],
        ],
      },
      e,
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          a,
          c,
          d,
          f,
          m,
          h = (0, r.c)(11),
          { surface: p } = e,
          [w, y] = (0, o.j)("bountyContentBanPolicyExpanded", !0),
          b = "create" === p ? l.W : l.H;
        return (
          h[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, t.jsx)(i.wB, {
                "aria-hidden": !0,
                className: "mt-0.5 size-4 shrink-0 text-yellow-400",
              })),
              (h[0] = n))
            : (n = h[0]),
          h[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = (0, t.jsxs)(s.v, {
                className: "group flex w-full items-start gap-3 text-left",
                type: "button",
                children: [
                  n,
                  (0, t.jsxs)("span", {
                    className:
                      "min-w-0 flex-1 text-xs leading-5 text-text-secondary",
                    children: [
                      (0, t.jsx)("span", {
                        className: "font-medium text-white",
                        children: l.r,
                      }),
                      ": ",
                      l.u,
                    ],
                  }),
                  (0, t.jsx)(i.J0, {
                    "aria-hidden": !0,
                    className:
                      "mt-0.5 size-4 shrink-0 text-yellow-400/80 transition-transform duration-200 group-data-[state=open]:rotate-180",
                  }),
                ],
              })),
              (h[1] = a))
            : (a = h[1]),
          h[2] !== b
            ? ((c = (0, t.jsx)("p", {
                className: "text-xs leading-5 text-text-secondary",
                children: b,
              })),
              (h[2] = b),
              (h[3] = c))
            : (c = h[3]),
          h[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = (0, t.jsx)("ul", {
                className:
                  "mt-1.5 space-y-1 text-xs leading-5 text-text-secondary",
                children: l.J.map(u),
              })),
              (h[4] = d))
            : (d = h[4]),
          h[5] !== c
            ? ((f = (0, t.jsxs)("div", {
                className:
                  "rounded-[18px] border border-yellow-500/30 bg-yellow-500/10 p-4",
                role: "note",
                children: [
                  a,
                  (0, t.jsx)(s.C, {
                    children: (0, t.jsxs)("div", {
                      className: "pt-2 pl-7",
                      children: [c, d],
                    }),
                  }),
                ],
              })),
              (h[5] = c),
              (h[6] = f))
            : (f = h[6]),
          h[7] !== w || h[8] !== y || h[9] !== f
            ? ((m = (0, t.jsx)(s.Y, { onOpenChange: y, open: w, children: f })),
              (h[7] = w),
              (h[8] = y),
              (h[9] = f),
              (h[10] = m))
            : (m = h[10]),
          m
        );
      },
    ],
    885802,
  );
  var c = e.i(146695),
    d = e.i(574472),
    f = e.i(458310);
  e.i(12692);
  var m = e.i(398902),
    h = e.i(18107);
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          a,
          o,
          s,
          l,
          u,
          p = (0, r.c)(17),
          { surface: w } = e,
          { t: y } = (0, m.f)(),
          { isBlocked: b, followersCount: g, minFollowers: x } = (0, h.z)(),
          { address: v } = (0, d.F)();
        return b
          ? (p[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = (0, t.jsx)(i._3, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-red-400",
                })),
                (p[0] = n))
              : (n = p[0]),
            p[1] !== x || p[2] !== w || p[3] !== y
              ? ((a = y(
                  "create" === w
                    ? "web.bounties.follower_gate_create_title"
                    : "web.bounties.follower_gate_submit_title",
                  { count: x },
                )),
                (p[1] = x),
                (p[2] = w),
                (p[3] = y),
                (p[4] = a))
              : (a = p[4]),
            p[5] !== a
              ? ((o = (0, t.jsx)("span", {
                  className: "font-medium text-white",
                  children: a,
                })),
                (p[5] = a),
                (p[6] = o))
              : (o = p[6]),
            p[7] !== g || p[8] !== y
              ? ((s =
                  null !== g
                    ? (0, t.jsxs)(t.Fragment, {
                        children: [
                          " ",
                          y("web.bounties.follower_gate_current", { count: g }),
                        ],
                      })
                    : null),
                (p[7] = g),
                (p[8] = y),
                (p[9] = s))
              : (s = p[9]),
            p[10] !== v || p[11] !== y
              ? ((l = v
                  ? (0, t.jsx)(f.default, {
                      className:
                        "font-medium text-white underline underline-offset-2",
                      href: (0, c.$)(v),
                      children: y("web.bounties.view_your_profile"),
                    })
                  : null),
                (p[10] = v),
                (p[11] = y),
                (p[12] = l))
              : (l = p[12]),
            p[13] !== o || p[14] !== s || p[15] !== l
              ? ((u = (0, t.jsx)("div", {
                  className:
                    "rounded-[18px] border border-red-500/30 bg-red-500/10 p-4",
                  role: "note",
                  children: (0, t.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      n,
                      (0, t.jsxs)("div", {
                        className:
                          "min-w-0 flex-1 text-xs leading-5 text-text-secondary",
                        children: [o, s, " ", l],
                      }),
                    ],
                  }),
                })),
                (p[13] = o),
                (p[14] = s),
                (p[15] = l),
                (p[16] = u))
              : (u = p[16]),
            u)
          : null;
      },
    ],
    544191,
  );
};
