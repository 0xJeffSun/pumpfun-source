// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(439587),
    n = e.i(352386);
  e.i(12692);
  var s = e.i(398902),
    a = e.i(944410),
    o = e.i(132838),
    l = e.i(63289),
    c = e.i(777683),
    d = e.i(711902);
  let u = { task: "bounty", submission: "submission", comment: "comment" },
    m = (e, t) =>
      t(
        "bounty" === e
          ? "web.bounties.entity_bounty"
          : "submission" === e
            ? "web.bounties.entity_submission"
            : "web.bounties.entity_comment",
      );
  function p(e) {
    return e.stopPropagation();
  }
  function f(e) {
    let a,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      x,
      b,
      h,
      y,
      g,
      v,
      w,
      k,
      j,
      _,
      N,
      I,
      C,
      S,
      A,
      F,
      U,
      T,
      E = (0, i.c)(80),
      { isPending: D, onOpenChange: B, onSubmit: L, targetLabel: P } = e,
      { t: Q } = (0, s.f)(),
      [O, K] = (0, n.useState)(null),
      [M, R] = (0, n.useState)(""),
      [q, $] = (0, n.useState)(null),
      Y = (0, n.useId)();
    E[0] !== M ? ((a = M.trim()), (E[0] = M), (E[1] = a)) : (a = E[1]);
    let H = a,
      W = "other" === O,
      V = null !== O && !D && (!W || H.length > 0);
    E[2] !== L || E[3] !== O || E[4] !== Q || E[5] !== H
      ? ((o = (e) => {
          (e.preventDefault(),
            null !== O &&
              ($(null),
              L(O, H || void 0, (e) => {
                $(
                  "object" == typeof e &&
                    null !== e &&
                    "message" in e &&
                    "string" == typeof e.message &&
                    e.message
                    ? e.message
                    : Q("web.bounties.report_submit_error"),
                );
              })));
        }),
        (E[2] = L),
        (E[3] = O),
        (E[4] = Q),
        (E[5] = H),
        (E[6] = o))
      : (o = E[6]);
    let z = o;
    if (
      (E[7] !== Q || E[8] !== P
        ? ((l = Q("web.bounties.report_target", { target: m(P, Q) })),
          (E[7] = Q),
          (E[8] = P),
          (E[9] = l))
        : (l = E[9]),
      E[10] !== l
        ? ((c = (0, t.jsx)("p", {
            className: "text-lg font-semibold text-white",
            children: l,
          })),
          (E[10] = l),
          (E[11] = c))
        : (c = E[11]),
      E[12] !== Q || E[13] !== P
        ? ((d = Q("web.bounties.report_dialog_description", {
            target: m(P, Q),
          })),
          (E[12] = Q),
          (E[13] = P),
          (E[14] = d))
        : (d = E[14]),
      E[15] !== d
        ? ((u = (0, t.jsx)("p", {
            className: "text-sm text-text-secondary",
            children: d,
          })),
          (E[15] = d),
          (E[16] = u))
        : (u = E[16]),
      E[17] !== c || E[18] !== u
        ? ((p = (0, t.jsxs)("header", {
            className: "flex flex-col gap-1.5",
            children: [c, u],
          })),
          (E[17] = c),
          (E[18] = u),
          (E[19] = p))
        : (p = E[19]),
      E[20] !== Q
        ? ((f = Q("web.bounties.report_reason_legend")),
          (E[20] = Q),
          (E[21] = f))
        : (f = E[21]),
      E[22] !== f
        ? ((x = (0, t.jsx)("legend", { className: "sr-only", children: f })),
          (E[22] = f),
          (E[23] = x))
        : (x = E[23]),
      E[24] !== Y || E[25] !== O || E[26] !== Q)
    ) {
      let e;
      (E[28] !== Y || E[29] !== O
        ? ((e = (e) => {
            let i = `${Y}-${e.value}`;
            return (0, t.jsxs)(
              "label",
              {
                className:
                  "flex cursor-pointer items-start gap-2.5 rounded-lg border border-border-secondary bg-bg-secondary p-3 transition-colors hover:bg-bg-tertiary has-[input:checked]:border-primary-green has-[input:checked]:bg-primary-green/10",
                htmlFor: i,
                children: [
                  (0, t.jsx)("input", {
                    checked: O === e.value,
                    className: "mt-1 size-4 flex-shrink-0 accent-primary-green",
                    id: i,
                    name: Y,
                    onChange: () => K(e.value),
                    type: "radio",
                    value: e.value,
                  }),
                  (0, t.jsxs)("span", {
                    className: "flex flex-col gap-0.5",
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-sm font-semibold text-white",
                        children: e.label,
                      }),
                      (0, t.jsx)("span", {
                        className: "text-xs text-text-tertiary",
                        children: e.description,
                      }),
                    ],
                  }),
                ],
              },
              e.value,
            );
          }),
          (E[28] = Y),
          (E[29] = O),
          (E[30] = e))
        : (e = E[30]),
        (b = [
          {
            value: "spam",
            label: Q("home.bounties.report.reason.spam"),
            description: Q("web.bounties.report_reason_spam_description"),
          },
          {
            value: "scam",
            label: Q("home.bounties.report.reason.scam"),
            description: Q("web.bounties.report_reason_scam_description"),
          },
          {
            value: "harassment",
            label: Q("home.bounties.report.reason.harassment"),
            description: Q("web.bounties.report_reason_harassment_description"),
          },
          {
            value: "hate_speech",
            label: Q("home.bounties.report.reason.hate_speech"),
            description: Q(
              "web.bounties.report_reason_hate_speech_description",
            ),
          },
          {
            value: "inappropriate_content",
            label: Q("home.bounties.report.reason.inappropriate_content"),
            description: Q(
              "web.bounties.report_reason_inappropriate_description",
            ),
          },
          {
            value: "other",
            label: Q("home.bounties.report.reason.other"),
            description: Q("web.bounties.report_reason_other_description"),
          },
        ].map(e)),
        (E[24] = Y),
        (E[25] = O),
        (E[26] = Q),
        (E[27] = b));
    } else b = E[27];
    E[31] !== b || E[32] !== x
      ? ((h = (0, t.jsxs)("fieldset", {
          className: "flex flex-col gap-2",
          children: [x, b],
        })),
        (E[31] = b),
        (E[32] = x),
        (E[33] = h))
      : (h = E[33]);
    let G = `${Y}-details`;
    (E[34] !== W || E[35] !== Q
      ? ((y = W
          ? Q("web.bounties.details_required")
          : Q("web.bounties.details_optional")),
        (E[34] = W),
        (E[35] = Q),
        (E[36] = y))
      : (y = E[36]),
      E[37] !== G || E[38] !== y
        ? ((g = (0, t.jsx)("label", {
            className:
              "text-xs font-semibold uppercase tracking-wide text-text-tertiary",
            htmlFor: G,
            children: y,
          })),
          (E[37] = G),
          (E[38] = y),
          (E[39] = g))
        : (g = E[39]));
    let X = `${Y}-details`;
    (E[40] === Symbol.for("react.memo_cache_sentinel")
      ? ((v = (e) => R(e.target.value)), (E[40] = v))
      : (v = E[40]),
      E[41] !== W || E[42] !== Q
        ? ((w = W
            ? Q("web.bounties.report_details_required_placeholder")
            : Q("web.bounties.report_details_optional_placeholder")),
          (E[41] = W),
          (E[42] = Q),
          (E[43] = w))
        : (w = E[43]),
      E[44] !== M || E[45] !== X || E[46] !== w
        ? ((k = (0, t.jsx)("textarea", {
            className:
              "min-h-[88px] w-full rounded-lg border border-border-secondary bg-bg-secondary p-3 text-sm text-white placeholder:text-text-tertiary focus:border-primary-green focus:outline-none",
            id: X,
            maxLength: 500,
            onChange: v,
            placeholder: w,
            value: M,
          })),
          (E[44] = M),
          (E[45] = X),
          (E[46] = w),
          (E[47] = k))
        : (k = E[47]),
      E[48] !== M.length
        ? ((j = (0, t.jsxs)("span", {
            className: "self-end text-[11px] tabular-nums text-text-tertiary",
            children: [M.length, "/", 500],
          })),
          (E[48] = M.length),
          (E[49] = j))
        : (j = E[49]),
      E[50] !== g || E[51] !== k || E[52] !== j
        ? ((_ = (0, t.jsxs)("div", {
            className: "flex flex-col gap-1.5",
            children: [g, k, j],
          })),
          (E[50] = g),
          (E[51] = k),
          (E[52] = j),
          (E[53] = _))
        : (_ = E[53]),
      E[54] !== q
        ? ((N = q
            ? (0, t.jsx)("p", {
                className: "text-sm text-text-danger",
                role: "alert",
                children: q,
              })
            : null),
          (E[54] = q),
          (E[55] = N))
        : (N = E[55]),
      E[56] !== B ? ((I = () => B(!1)), (E[56] = B), (E[57] = I)) : (I = E[57]),
      E[58] !== Q
        ? ((C = Q("common.cancel")), (E[58] = Q), (E[59] = C))
        : (C = E[59]),
      E[60] !== D || E[61] !== I || E[62] !== C
        ? ((S = (0, t.jsx)(r.K, {
            isDisabled: D,
            onClick: I,
            type: "button",
            variant: "secondary",
            children: C,
          })),
          (E[60] = D),
          (E[61] = I),
          (E[62] = C),
          (E[63] = S))
        : (S = E[63]));
    let Z = !V;
    return (
      E[64] !== D || E[65] !== Q
        ? ((A = D
            ? Q("web.bounties.report_submitting")
            : Q("home.bounties.report.details.submit")),
          (E[64] = D),
          (E[65] = Q),
          (E[66] = A))
        : (A = E[66]),
      E[67] !== Z || E[68] !== A
        ? ((F = (0, t.jsx)(r.K, {
            isDisabled: Z,
            type: "submit",
            variant: "primary",
            children: A,
          })),
          (E[67] = Z),
          (E[68] = A),
          (E[69] = F))
        : (F = E[69]),
      E[70] !== S || E[71] !== F
        ? ((U = (0, t.jsxs)("footer", {
            className: "flex items-center justify-end gap-2 pt-1",
            children: [S, F],
          })),
          (E[70] = S),
          (E[71] = F),
          (E[72] = U))
        : (U = E[72]),
      E[73] !== z ||
      E[74] !== h ||
      E[75] !== _ ||
      E[76] !== N ||
      E[77] !== U ||
      E[78] !== p
        ? ((T = (0, t.jsx)(r.s, {
            className: "max-w-[480px]",
            children: (0, t.jsxs)("form", {
              className: "flex flex-col gap-4 p-1",
              onSubmit: z,
              children: [p, h, _, N, U],
            }),
          })),
          (E[73] = z),
          (E[74] = h),
          (E[75] = _),
          (E[76] = N),
          (E[77] = U),
          (E[78] = p),
          (E[79] = T))
        : (T = E[79]),
      T
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          m,
          x,
          b,
          h,
          y,
          g = (0, i.c)(21),
          { open: v, onOpenChange: w, target: k } = e;
        g[0] !== w
          ? ((n = { onSuccess: () => w(!1), showErrorToast: !1 }),
            (g[0] = w),
            (g[1] = n))
          : (n = g[1]);
        let j = ((e) => {
          let t,
            r,
            n,
            u,
            m,
            p,
            f,
            x,
            b,
            h = (0, i.c)(21);
          (h[0] !== e
            ? ((t = void 0 === e ? {} : e), (h[0] = e), (h[1] = t))
            : (t = h[1]),
            h[2] !== t
              ? (({ onSuccess: n, onError: r, showErrorToast: m, ...u } = t),
                (h[2] = t),
                (h[3] = r),
                (h[4] = n),
                (h[5] = u),
                (h[6] = m))
              : ((r = h[3]), (n = h[4]), (u = h[5]), (m = h[6])));
          let y = void 0 === m || m,
            { t: g } = (0, s.f)(),
            v = (0, a.useLivestreamApiClient)();
          return (
            h[7] !== v
              ? ((p = async (e) => {
                  let { taskId: t, reason: i, details: r } = e,
                    n = await v
                      .post(`bounties/tasks/${encodeURIComponent(t)}/report`, {
                        json: { reason: i, details: r },
                      })
                      .json();
                  return d.s.parse(n);
                }),
                (h[7] = v),
                (h[8] = p))
              : (p = h[8]),
            h[9] !== n || h[10] !== g
              ? ((f = (e, t, i) => {
                  (l.c.success(g("web.report.bounty_report_submitted")),
                    n?.(e, t, i));
                }),
                (h[9] = n),
                (h[10] = g),
                (h[11] = f))
              : (f = h[11]),
            h[12] !== r || h[13] !== y || h[14] !== g
              ? ((x = async (e, t, i) => {
                  if (y) {
                    let t = await (0, c.u)(e, g("web.report.submit_failed"));
                    l.c.error(t);
                  }
                  r?.(e, t, i);
                }),
                (h[12] = r),
                (h[13] = y),
                (h[14] = g),
                (h[15] = x))
              : (x = h[15]),
            h[16] !== u || h[17] !== p || h[18] !== f || h[19] !== x
              ? ((b = { ...u, mutationFn: p, onSuccess: f, onError: x }),
                (h[16] = u),
                (h[17] = p),
                (h[18] = f),
                (h[19] = x),
                (h[20] = b))
              : (b = h[20]),
            (0, o.f)(b)
          );
        })(n);
        g[2] !== w
          ? ((m = { onSuccess: () => w(!1), showErrorToast: !1 }),
            (g[2] = w),
            (g[3] = m))
          : (m = g[3]);
        let _ = ((e) => {
          let t,
            r,
            n,
            u,
            m,
            p,
            f,
            x,
            b,
            h = (0, i.c)(21);
          (h[0] !== e
            ? ((t = void 0 === e ? {} : e), (h[0] = e), (h[1] = t))
            : (t = h[1]),
            h[2] !== t
              ? (({ onSuccess: n, onError: r, showErrorToast: m, ...u } = t),
                (h[2] = t),
                (h[3] = r),
                (h[4] = n),
                (h[5] = u),
                (h[6] = m))
              : ((r = h[3]), (n = h[4]), (u = h[5]), (m = h[6])));
          let y = void 0 === m || m,
            { t: g } = (0, s.f)(),
            v = (0, a.useLivestreamApiClient)();
          return (
            h[7] !== v
              ? ((p = async (e) => {
                  let { taskId: t, submissionId: i, reason: r, details: n } = e,
                    s = await v
                      .post(
                        `bounties/tasks/${encodeURIComponent(t)}/submissions/${encodeURIComponent(i)}/report`,
                        { json: { reason: r, details: n } },
                      )
                      .json();
                  return d.s.parse(s);
                }),
                (h[7] = v),
                (h[8] = p))
              : (p = h[8]),
            h[9] !== n || h[10] !== g
              ? ((f = (e, t, i) => {
                  (l.c.success(g("web.report.bounty_report_submitted")),
                    n?.(e, t, i));
                }),
                (h[9] = n),
                (h[10] = g),
                (h[11] = f))
              : (f = h[11]),
            h[12] !== r || h[13] !== y || h[14] !== g
              ? ((x = async (e, t, i) => {
                  if (y) {
                    let t = await (0, c.u)(e, g("web.report.submit_failed"));
                    l.c.error(t);
                  }
                  r?.(e, t, i);
                }),
                (h[12] = r),
                (h[13] = y),
                (h[14] = g),
                (h[15] = x))
              : (x = h[15]),
            h[16] !== u || h[17] !== p || h[18] !== f || h[19] !== x
              ? ((b = { ...u, mutationFn: p, onSuccess: f, onError: x }),
                (h[16] = u),
                (h[17] = p),
                (h[18] = f),
                (h[19] = x),
                (h[20] = b))
              : (b = h[20]),
            (0, o.f)(b)
          );
        })(m);
        g[4] !== w
          ? ((x = { onSuccess: () => w(!1), showErrorToast: !1 }),
            (g[4] = w),
            (g[5] = x))
          : (x = g[5]);
        let N = ((e) => {
            let t,
              r,
              n,
              u,
              m,
              p,
              f,
              x,
              b,
              h = (0, i.c)(21);
            (h[0] !== e
              ? ((t = void 0 === e ? {} : e), (h[0] = e), (h[1] = t))
              : (t = h[1]),
              h[2] !== t
                ? (({ onSuccess: n, onError: r, showErrorToast: m, ...u } = t),
                  (h[2] = t),
                  (h[3] = r),
                  (h[4] = n),
                  (h[5] = u),
                  (h[6] = m))
                : ((r = h[3]), (n = h[4]), (u = h[5]), (m = h[6])));
            let y = void 0 === m || m,
              { t: g } = (0, s.f)(),
              v = (0, a.useLivestreamApiClient)();
            return (
              h[7] !== v
                ? ((p = async (e) => {
                    let { commentId: t, reason: i, details: r } = e,
                      n = await v
                        .post(
                          `bounties/comments/${encodeURIComponent(t)}/report`,
                          { json: { reason: i, details: r } },
                        )
                        .json();
                    return d.s.parse(n);
                  }),
                  (h[7] = v),
                  (h[8] = p))
                : (p = h[8]),
              h[9] !== n || h[10] !== g
                ? ((f = (e, t, i) => {
                    (l.c.success(g("web.report.bounty_report_submitted")),
                      n?.(e, t, i));
                  }),
                  (h[9] = n),
                  (h[10] = g),
                  (h[11] = f))
                : (f = h[11]),
              h[12] !== r || h[13] !== y || h[14] !== g
                ? ((x = async (e, t, i) => {
                    if (y) {
                      let t = await (0, c.u)(e, g("web.report.submit_failed"));
                      l.c.error(t);
                    }
                    r?.(e, t, i);
                  }),
                  (h[12] = r),
                  (h[13] = y),
                  (h[14] = g),
                  (h[15] = x))
                : (x = h[15]),
              h[16] !== u || h[17] !== p || h[18] !== f || h[19] !== x
                ? ((b = { ...u, mutationFn: p, onSuccess: f, onError: x }),
                  (h[16] = u),
                  (h[17] = p),
                  (h[18] = f),
                  (h[19] = x),
                  (h[20] = b))
                : (b = h[20]),
              (0, o.f)(b)
            );
          })(x),
          I = j.isPending || _.isPending || N.isPending;
        return (
          g[6] !== I || g[7] !== w
            ? ((b = (e) => {
                I || w(e);
              }),
              (g[6] = I),
              (g[7] = w),
              (g[8] = b))
            : (b = g[8]),
          g[9] !== N ||
          g[10] !== I ||
          g[11] !== w ||
          g[12] !== v ||
          g[13] !== _ ||
          g[14] !== k ||
          g[15] !== j
            ? ((h = v
                ? (0, t.jsx)(f, {
                    isPending: I,
                    onOpenChange: w,
                    onSubmit: (e, t, i) => {
                      "task" === k.type
                        ? j.mutate(
                            { taskId: k.taskId, reason: e, details: t },
                            { onError: i },
                          )
                        : "comment" === k.type
                          ? N.mutate(
                              { commentId: k.commentId, reason: e, details: t },
                              { onError: i },
                            )
                          : _.mutate(
                              {
                                taskId: k.taskId,
                                submissionId: k.submissionId,
                                reason: e,
                                details: t,
                              },
                              { onError: i },
                            );
                    },
                    targetLabel: u[k.type],
                  })
                : null),
              (g[9] = N),
              (g[10] = I),
              (g[11] = w),
              (g[12] = v),
              (g[13] = _),
              (g[14] = k),
              (g[15] = j),
              (g[16] = h))
            : (h = g[16]),
          g[17] !== v || g[18] !== b || g[19] !== h
            ? ((y = (0, t.jsx)("div", {
                onClick: p,
                onMouseDown: p,
                onPointerDown: p,
                children: (0, t.jsx)(r.v, {
                  isOpen: v,
                  onIsOpenChange: b,
                  children: h,
                }),
              })),
              (g[17] = v),
              (g[18] = b),
              (g[19] = h),
              (g[20] = y))
            : (y = g[20]),
          y
        );
      },
    ],
    128054,
  );
};
