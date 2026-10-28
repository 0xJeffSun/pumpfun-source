// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(157633),
    n = e.i(745018);
  e.i(12692);
  var s = e.i(398902),
    a = e.i(418292),
    o = e.i(154998);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        c,
        d,
        u,
        m = (0, i.c)(28),
        { t: p } = (0, s.f)(),
        {
          bountyId: f,
          bountyTitle: x,
          bountyDescription: b,
          bountyImageUrl: h,
          coinImageUrl: y,
          coinMint: g,
          submissionId: v,
          shareMedia: w,
          showShare: k,
          showLike: j,
          likeCount: _,
          viewerLiked: N,
          onToggleLike: I,
          pending: C,
          showComments: S,
          commentCount: A,
          commentsActive: F,
          onToggleComments: U,
        } = e,
        T = void 0 === k || k,
        E = void 0 === j || j,
        D = void 0 !== C && C,
        B = void 0 !== S && S,
        L = void 0 === A ? 0 : A,
        P = void 0 !== F && F;
      return E || T || B
        ? (m[0] !== _ ||
          m[1] !== I ||
          m[2] !== D ||
          m[3] !== E ||
          m[4] !== p ||
          m[5] !== N
            ? ((l = E
                ? (0, t.jsx)(o.f, {
                    accent: "danger",
                    active: N,
                    count: _,
                    icon: N
                      ? (0, t.jsx)(r.cJ, {
                          className: "h-5 w-5 text-[#F87171]",
                        })
                      : (0, t.jsx)(n.cJ, { className: "h-5 w-5" }),
                    label: p("web.bounties.likes"),
                    onClick: D ? void 0 : I,
                  })
                : null),
              (m[0] = _),
              (m[1] = I),
              (m[2] = D),
              (m[3] = E),
              (m[4] = p),
              (m[5] = N),
              (m[6] = l))
            : (l = m[6]),
          m[7] !== L || m[8] !== P || m[9] !== U || m[10] !== B || m[11] !== p
            ? ((c = B
                ? (0, t.jsx)(o.f, {
                    accent: "info",
                    active: P,
                    "aria-expanded": P,
                    count: L,
                    icon: (0, t.jsx)(n.t7, { className: "h-5 w-5" }),
                    label: p("web.bounties.comments"),
                    onClick: U,
                  })
                : null),
              (m[7] = L),
              (m[8] = P),
              (m[9] = U),
              (m[10] = B),
              (m[11] = p),
              (m[12] = c))
            : (c = m[12]),
          m[13] !== b ||
          m[14] !== f ||
          m[15] !== h ||
          m[16] !== x ||
          m[17] !== y ||
          m[18] !== g ||
          m[19] !== w ||
          m[20] !== T ||
          m[21] !== v ||
          m[22] !== p
            ? ((d = T
                ? (0, t.jsx)("div", {
                    className: "ml-auto",
                    children: (0, t.jsx)(a.f, {
                      bountyDescription: b,
                      bountyId: f,
                      bountyImageUrl: h,
                      bountyTitle: x,
                      coinImageUrl: y,
                      coinMint: g,
                      shareMedia: w,
                      submissionId: v,
                      trigger: (0, t.jsx)(o.f, {
                        accent: "positive",
                        icon: (0, t.jsx)(n.AS, { className: "h-4 w-4" }),
                        label: p("common.share"),
                        showLabel: !0,
                      }),
                    }),
                  })
                : null),
              (m[13] = b),
              (m[14] = f),
              (m[15] = h),
              (m[16] = x),
              (m[17] = y),
              (m[18] = g),
              (m[19] = w),
              (m[20] = T),
              (m[21] = v),
              (m[22] = p),
              (m[23] = d))
            : (d = m[23]),
          m[24] !== l || m[25] !== c || m[26] !== d
            ? ((u = (0, t.jsxs)("div", {
                className: "mt-1 flex items-center gap-4",
                children: [l, c, d],
              })),
              (m[24] = l),
              (m[25] = c),
              (m[26] = d),
              (m[27] = u))
            : (u = m[27]),
          u)
        : null;
    },
  ]);
};
