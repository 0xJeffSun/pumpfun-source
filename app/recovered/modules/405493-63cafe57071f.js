// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    i = e.i(63289);
  e.i(622862);
  var s = e.i(136207),
    o = e.i(232719);
  e.s(
    [
      "f",
      0,
      function (e) {
        let d,
          a,
          u,
          l,
          m,
          c,
          f,
          w,
          p,
          b,
          A = (0, n.c)(25);
        A[0] !== e
          ? (({ taskId: l, isBanned: u, banInfo: d, unbanInfo: m, ...a } = e),
            (A[0] = e),
            (A[1] = d),
            (A[2] = a),
            (A[3] = u),
            (A[4] = l),
            (A[5] = m))
          : ((d = A[1]), (a = A[2]), (u = A[3]), (l = A[4]), (m = A[5]));
        let h = void 0 !== u && u,
          { t: g } = (0, r.f)();
        A[6] !== g
          ? ((c = {
              onSuccess: () => i.c.success(g("web.bounties.bounty_banned")),
            }),
            (A[6] = g),
            (A[7] = c))
          : (c = A[7]);
        let y = (0, s.u)(c);
        A[8] !== g
          ? ((f = {
              onSuccess: () => i.c.success(g("web.bounties.bounty_unbanned")),
            }),
            (A[8] = g),
            (A[9] = f))
          : (f = A[9]);
        let S = (0, s.s)(f),
          U = y.isPending || S.isPending;
        return (
          A[10] !== l
            ? ((w = { entityType: "bounty", taskId: l }),
              (A[10] = l),
              (A[11] = w))
            : (w = A[11]),
          A[12] !== y || A[13] !== h || A[14] !== l || A[15] !== S
            ? ((p = (e, t) => {
                let n = { taskId: l, body: { reason: e } },
                  r = { onSuccess: t };
                h ? S.mutate(n, r) : y.mutate(n, r);
              }),
              (A[12] = y),
              (A[13] = h),
              (A[14] = l),
              (A[15] = S),
              (A[16] = p))
            : (p = A[16]),
          A[17] !== d ||
          A[18] !== a ||
          A[19] !== h ||
          A[20] !== U ||
          A[21] !== w ||
          A[22] !== p ||
          A[23] !== m
            ? ((b = (0, t.jsx)(o.f, {
                ...a,
                actionType: "ban",
                entityLabel: "bounty",
                isActive: h,
                isPending: U,
                priorBanInfo: d,
                priorUnbanInfo: m,
                secondOpinionTarget: w,
                onConfirm: p,
              })),
              (A[17] = d),
              (A[18] = a),
              (A[19] = h),
              (A[20] = U),
              (A[21] = w),
              (A[22] = p),
              (A[23] = m),
              (A[24] = b))
            : (b = A[24]),
          b
        );
      },
    ],
    405493,
  );
  var d = e.i(352386);
  let a = (0, e.i(78436).$)((e) => ({
    overrides: {},
    setOverride: (t, n) =>
      e((e) => ({ overrides: { ...e.overrides, [t]: n } })),
    clearOverride: (t) =>
      e((e) => {
        if (!(t in e.overrides)) return e;
        let n = { ...e.overrides };
        return (delete n[t], { overrides: n });
      }),
  }));
  function u(e) {
    let t,
      r = (0, n.c)(2);
    return (
      r[0] !== e
        ? ((t = (t) => t.overrides[e]), (r[0] = e), (r[1] = t))
        : (t = r[1]),
      a(t)
    );
  }
  function l(e) {
    return e.clearOverride;
  }
  function m(e) {
    return e.setOverride;
  }
  function c(e) {
    return e.clearOverride;
  }
  function f(e) {
    return e.setOverride;
  }
  (e.s(["_", 0, u, "p", 0, a], 938041),
    e.s(
      [
        "f",
        0,
        function (e) {
          let r,
            c,
            f,
            w,
            p,
            b,
            A,
            h,
            g = (0, n.c)(22);
          g[0] !== e
            ? (({ taskId: f, isNsfw: c, ...r } = e),
              (g[0] = e),
              (g[1] = r),
              (g[2] = c),
              (g[3] = f))
            : ((r = g[1]), (c = g[2]), (f = g[3]));
          let y = void 0 !== c && c,
            S = u(f),
            U = a(m),
            $ = a(l),
            k = S ?? y;
          (g[4] !== $ || g[5] !== y || g[6] !== S || g[7] !== f
            ? ((w = () => {
                void 0 !== S && y === S && $(f);
              }),
              (p = [y, S, f, $]),
              (g[4] = $),
              (g[5] = y),
              (g[6] = S),
              (g[7] = f),
              (g[8] = w),
              (g[9] = p))
            : ((w = g[8]), (p = g[9])),
            (0, d.useEffect)(w, p),
            g[10] !== U || g[11] !== f
              ? ((b = {
                  onSuccess: (e, t) => {
                    (U(f, t.body.isNsfw),
                      i.c.success(
                        `${t.body.isNsfw ? "Bounty marked NSFW." : "Bounty unmarked NSFW."} It can take a few seconds to update across listings.`,
                      ));
                  },
                }),
                (g[10] = U),
                (g[11] = f),
                (g[12] = b))
              : (b = g[12]));
          let v = (0, s.x)(b);
          return (
            g[13] !== k || g[14] !== v || g[15] !== f
              ? ((A = (e, t) => {
                  v.mutate(
                    { taskId: f, body: { reason: e, isNsfw: !k } },
                    { onSuccess: t },
                  );
                }),
                (g[13] = k),
                (g[14] = v),
                (g[15] = f),
                (g[16] = A))
              : (A = g[16]),
            g[17] !== r || g[18] !== k || g[19] !== v.isPending || g[20] !== A
              ? ((h = (0, t.jsx)(o.f, {
                  ...r,
                  actionType: "nsfw",
                  entityLabel: "bounty",
                  isActive: k,
                  isPending: v.isPending,
                  onConfirm: A,
                })),
                (g[17] = r),
                (g[18] = k),
                (g[19] = v.isPending),
                (g[20] = A),
                (g[21] = h))
              : (h = g[21]),
            h
          );
        },
      ],
      716704,
    ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let d,
            a,
            u,
            l,
            m,
            c,
            f,
            w,
            p,
            b,
            A,
            h = (0, n.c)(28);
          h[0] !== e
            ? (({
                taskId: m,
                submissionId: u,
                isBanned: l,
                banInfo: d,
                unbanInfo: c,
                ...a
              } = e),
              (h[0] = e),
              (h[1] = d),
              (h[2] = a),
              (h[3] = u),
              (h[4] = l),
              (h[5] = m),
              (h[6] = c))
            : ((d = h[1]),
              (a = h[2]),
              (u = h[3]),
              (l = h[4]),
              (m = h[5]),
              (c = h[6]));
          let g = void 0 !== l && l,
            { t: y } = (0, r.f)();
          h[7] !== y
            ? ((f = {
                onSuccess: () =>
                  i.c.success(y("web.bounties.submission_banned")),
              }),
              (h[7] = y),
              (h[8] = f))
            : (f = h[8]);
          let S = (0, s.S)(f);
          h[9] !== y
            ? ((w = {
                onSuccess: () =>
                  i.c.success(y("web.bounties.submission_unbanned")),
              }),
              (h[9] = y),
              (h[10] = w))
            : (w = h[10]);
          let U = (0, s.O)(w),
            $ = S.isPending || U.isPending;
          return (
            h[11] !== u || h[12] !== m
              ? ((p = { entityType: "submission", taskId: m, submissionId: u }),
                (h[11] = u),
                (h[12] = m),
                (h[13] = p))
              : (p = h[13]),
            h[14] !== S ||
            h[15] !== g ||
            h[16] !== u ||
            h[17] !== m ||
            h[18] !== U
              ? ((b = (e, t) => {
                  let n = { taskId: m, submissionId: u, body: { reason: e } },
                    r = { onSuccess: t };
                  g ? U.mutate(n, r) : S.mutate(n, r);
                }),
                (h[14] = S),
                (h[15] = g),
                (h[16] = u),
                (h[17] = m),
                (h[18] = U),
                (h[19] = b))
              : (b = h[19]),
            h[20] !== d ||
            h[21] !== a ||
            h[22] !== g ||
            h[23] !== $ ||
            h[24] !== p ||
            h[25] !== b ||
            h[26] !== c
              ? ((A = (0, t.jsx)(o.f, {
                  ...a,
                  actionType: "ban",
                  entityLabel: "submission",
                  isActive: g,
                  isPending: $,
                  priorBanInfo: d,
                  priorUnbanInfo: c,
                  secondOpinionTarget: p,
                  onConfirm: b,
                })),
                (h[20] = d),
                (h[21] = a),
                (h[22] = g),
                (h[23] = $),
                (h[24] = p),
                (h[25] = b),
                (h[26] = c),
                (h[27] = A))
              : (A = h[27]),
            A
          );
        },
      ],
      24050,
    ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let r,
            l,
            m,
            w,
            p,
            b,
            A,
            h,
            g,
            y = (0, n.c)(24);
          y[0] !== e
            ? (({ taskId: w, submissionId: l, isNsfw: m, ...r } = e),
              (y[0] = e),
              (y[1] = r),
              (y[2] = l),
              (y[3] = m),
              (y[4] = w))
            : ((r = y[1]), (l = y[2]), (m = y[3]), (w = y[4]));
          let S = void 0 !== m && m,
            U = u(l),
            $ = a(f),
            k = a(c),
            v = U ?? S;
          (y[5] !== k || y[6] !== S || y[7] !== U || y[8] !== l
            ? ((p = () => {
                void 0 !== U && S === U && k(l);
              }),
              (b = [S, U, l, k]),
              (y[5] = k),
              (y[6] = S),
              (y[7] = U),
              (y[8] = l),
              (y[9] = p),
              (y[10] = b))
            : ((p = y[9]), (b = y[10])),
            (0, d.useEffect)(p, b),
            y[11] !== $ || y[12] !== l
              ? ((A = {
                  onSuccess: (e, t) => {
                    ($(l, t.body.isNsfw),
                      i.c.success(
                        `${t.body.isNsfw ? "Submission marked NSFW." : "Submission unmarked NSFW."} It can take a few seconds to update across listings.`,
                      ));
                  },
                }),
                (y[11] = $),
                (y[12] = l),
                (y[13] = A))
              : (A = y[13]));
          let D = (0, s.d)(A);
          return (
            y[14] !== v || y[15] !== D || y[16] !== l || y[17] !== w
              ? ((h = (e, t) => {
                  D.mutate(
                    {
                      taskId: w,
                      submissionId: l,
                      body: { reason: e, isNsfw: !v },
                    },
                    { onSuccess: t },
                  );
                }),
                (y[14] = v),
                (y[15] = D),
                (y[16] = l),
                (y[17] = w),
                (y[18] = h))
              : (h = y[18]),
            y[19] !== r || y[20] !== v || y[21] !== D.isPending || y[22] !== h
              ? ((g = (0, t.jsx)(o.f, {
                  ...r,
                  actionType: "nsfw",
                  entityLabel: "submission",
                  isActive: v,
                  isPending: D.isPending,
                  onConfirm: h,
                })),
                (y[19] = r),
                (y[20] = v),
                (y[21] = D.isPending),
                (y[22] = h),
                (y[23] = g))
              : (g = y[23]),
            g
          );
        },
      ],
      419506,
    ));
};
