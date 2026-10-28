// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    s = e.i(439587),
    i = e.i(426091),
    a = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    l = e.i(63289),
    c = e.i(182119),
    u = e.i(347269),
    d = e.i(640821),
    m = e.i(64457),
    b = e.i(711902);
  let x = (e) => {
    let t = new Date(e);
    return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
  };
  function p(e) {
    let r,
      s,
      i,
      a,
      l,
      c,
      u,
      d,
      m,
      p,
      g = (0, n.c)(27),
      { banInfo: f, unbanInfo: h, variant: y } = e,
      { t: w } = (0, o.f)();
    if (!h || (0, b.S)({ banInfo: f, unbanInfo: h })) return null;
    let _ =
      "modal" === (void 0 === y ? "sheet" : y)
        ? "flex flex-col gap-1.5 rounded-xl border border-amber-400/40 bg-amber-500/10 px-3 py-2.5 text-xs leading-5"
        : "flex flex-col gap-1.5 rounded-md border border-amber-400/30 bg-amber-500/[0.06] px-3 py-2 text-[11px] leading-5";
    return (
      g[0] !== w
        ? ((r = w("web.bounties.previously_banned_unbanned")),
          (g[0] = w),
          (g[1] = r))
        : (r = g[1]),
      g[2] !== r
        ? ((s = (0, t.jsx)("p", {
            className: "font-semibold text-amber-300",
            children: r,
          })),
          (g[2] = r),
          (g[3] = s))
        : (s = g[3]),
      g[4] !== f || g[5] !== w
        ? ((i = f
            ? (0, t.jsxs)("p", {
                className: "text-text-secondary",
                children: [
                  (0, t.jsx)("span", {
                    className: "font-medium text-white",
                    children: w("web.bounties.ban_reason_label"),
                  }),
                  " ",
                  f.reason.trim() || w("web.bounties.no_reason_provided"),
                  " ",
                  (0, t.jsxs)("span", {
                    className: "text-text-tertiary",
                    children: ["(", x(f.timestamp), ")"],
                  }),
                ],
              })
            : null),
          (g[4] = f),
          (g[5] = w),
          (g[6] = i))
        : (i = g[6]),
      g[7] !== w
        ? ((a = w("web.bounties.unban_reason_history_label")),
          (g[7] = w),
          (g[8] = a))
        : (a = g[8]),
      g[9] !== a
        ? ((l = (0, t.jsx)("span", {
            className: "font-medium text-white",
            children: a,
          })),
          (g[9] = a),
          (g[10] = l))
        : (l = g[10]),
      g[11] !== w || g[12] !== h.reason
        ? ((c = h.reason.trim() || w("web.bounties.no_reason_provided")),
          (g[11] = w),
          (g[12] = h.reason),
          (g[13] = c))
        : (c = g[13]),
      g[14] !== h.timestamp
        ? ((u = x(h.timestamp)), (g[14] = h.timestamp), (g[15] = u))
        : (u = g[15]),
      g[16] !== u
        ? ((d = (0, t.jsxs)("span", {
            className: "text-text-tertiary",
            children: ["(", u, ")"],
          })),
          (g[16] = u),
          (g[17] = d))
        : (d = g[17]),
      g[18] !== l || g[19] !== c || g[20] !== d
        ? ((m = (0, t.jsxs)("p", {
            className: "text-text-secondary",
            children: [l, " ", c, " ", d],
          })),
          (g[18] = l),
          (g[19] = c),
          (g[20] = d),
          (g[21] = m))
        : (m = g[21]),
      g[22] !== _ || g[23] !== m || g[24] !== s || g[25] !== i
        ? ((p = (0, t.jsxs)("div", { className: _, children: [s, i, m] })),
          (g[22] = _),
          (g[23] = m),
          (g[24] = s),
          (g[25] = i),
          (g[26] = p))
        : (p = g[26]),
      p
    );
  }
  var g = e.i(553220),
    f = e.i(613677),
    h = e.i(417326),
    y = e.i(342463),
    w = e.i(418096),
    _ = e.i(866890),
    N = e.i(297865);
  g.z.discriminatedUnion("entityType", [
    f.z.object({
      entityType: h.z.literal("bounty"),
      taskId: y.z.string().trim().min(1).max(256),
    }),
    f.z.object({
      entityType: h.z.literal("submission"),
      taskId: y.z.string().trim().min(1).max(256),
      submissionId: y.z.string().trim().min(1).max(256),
    }),
  ]);
  let v = f.z.object({
    entityType: w.z.enum(["bounty", "submission"]),
    recommendation: w.z.enum(["ban", "do_not_ban", "needs_human_review"]),
    confidence: w.z.enum(["low", "medium", "high"]),
    headline: y.z.string().trim().max(160),
    rationale: y.z.string().trim().max(1200),
    concerns: _.z
      .array(
        f.z.object({
          category: y.z.string().trim().max(60),
          detail: y.z.string().trim().max(320),
        }),
      )
      .max(8),
    suggestedReason: y.z.string().trim().max(120),
    xEngagementFlagged: N.z.boolean(),
    xEngagementWarning: y.z.string().optional(),
  });
  async function j(e) {
    try {
      let t = await e.json();
      if ("string" == typeof t.message) return t.message;
      if ("string" == typeof t.error) return t.error;
    } catch {}
    return "Could not get a second opinion. Try again.";
  }
  let O = {
    danger: "bg-text-error/15 text-text-error",
    positive: "bg-positive/15 text-positive",
    warning: "bg-amber-400/15 text-amber-300",
  };
  function E(e) {
    let s,
      i,
      l,
      c,
      u,
      d,
      m,
      b,
      x,
      p,
      g,
      f,
      h,
      y = (0, n.c)(48),
      { target: w, entityLabel: _, disabled: N, onApplyReason: O } = e,
      E = void 0 !== N && N,
      { t: C } = (0, o.f)(),
      {
        data: T,
        error: S,
        isPending: R,
        run: A,
        reset: L,
      } = (function () {
        let [e, t] = (0, a.useState)(null),
          [n, r] = (0, a.useState)(null),
          [s, i] = (0, a.useState)(!1),
          [o, l] = (0, a.useTransition)(),
          c = (0, a.useRef)(0),
          u = (0, a.useCallback)(() => {
            ((c.current += 1), t(null), r(null), i(!1));
          }, []);
        return {
          data: e,
          error: n,
          isPending: s || o,
          run: (0, a.useCallback)(async (e) => {
            let n = ++c.current;
            (i(!0), r(null));
            try {
              let r = await fetch("/api/bounties/moderation/second-opinion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e),
              });
              if (c.current !== n) return;
              if (!r.ok) throw Error(await j(r));
              let s = v.safeParse(await r.json());
              if (!s.success)
                throw Error("The AI response was not usable. Try again.");
              if (c.current !== n) return;
              l(() => {
                c.current === n && t(s.data);
              });
            } catch (e) {
              if (c.current !== n) return;
              r(
                e instanceof Error
                  ? e.message
                  : "Could not get a second opinion.",
              );
            } finally {
              c.current === n && i(!1);
            }
          }, []),
          reset: u,
        };
      })();
    y[0] !== A || y[1] !== w
      ? ((s = () => {
          A(w);
        }),
        (y[0] = A),
        (y[1] = w),
        (y[2] = s))
      : (s = y[2]);
    let z = s;
    y[3] !== L || y[4] !== A || y[5] !== w
      ? ((i = () => {
          (L(), A(w));
        }),
        (y[3] = L),
        (y[4] = A),
        (y[5] = w),
        (y[6] = i))
      : (i = y[6]);
    let I = i;
    if (!T && !R && !S) {
      let e, n, s;
      return (
        y[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(r.Ip, { className: "size-3.5" })), (y[7] = e))
          : (e = y[7]),
        y[8] !== C
          ? ((n = C("web.bounties.second_opinion")), (y[8] = C), (y[9] = n))
          : (n = y[9]),
        y[10] !== E || y[11] !== z || y[12] !== n
          ? ((s = (0, t.jsxs)("button", {
              className:
                "inline-flex w-fit items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50",
              disabled: E,
              onClick: z,
              type: "button",
              children: [e, n],
            })),
            (y[10] = E),
            (y[11] = z),
            (y[12] = n),
            (y[13] = s))
          : (s = y[13]),
        s
      );
    }
    return (
      y[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(r.Ip, { className: "size-3.5 text-positive" })),
          (y[14] = l))
        : (l = y[14]),
      y[15] !== C
        ? ((c = C("web.bounties.ai_second_opinion")), (y[15] = C), (y[16] = c))
        : (c = y[16]),
      y[17] !== c
        ? ((u = (0, t.jsxs)("p", {
            className:
              "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-text-tertiary",
            children: [l, c],
          })),
          (y[17] = c),
          (y[18] = u))
        : (u = y[18]),
      y[19] !== R || y[20] !== I || y[21] !== C
        ? ((d = R
            ? null
            : (0, t.jsxs)("button", {
                className:
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold text-text-secondary transition-colors hover:bg-bg-quaternary hover:text-white",
                onClick: I,
                type: "button",
                children: [
                  (0, t.jsx)(r.B4, { className: "size-3" }),
                  C("web.bounties.regenerate"),
                ],
              })),
          (y[19] = R),
          (y[20] = I),
          (y[21] = C),
          (y[22] = d))
        : (d = y[22]),
      y[23] !== u || y[24] !== d
        ? ((m = (0, t.jsxs)("div", {
            className: "flex items-center justify-between gap-2",
            children: [u, d],
          })),
          (y[23] = u),
          (y[24] = d),
          (y[25] = m))
        : (m = y[25]),
      y[26] !== _ || y[27] !== R || y[28] !== C
        ? ((b = R
            ? (0, t.jsxs)("p", {
                className:
                  "flex items-center gap-2 text-[13px] text-text-secondary",
                children: [
                  (0, t.jsx)(r.Ip, {
                    className: "size-4 animate-pulse text-positive",
                  }),
                  C("web.bounties.reviewing_entity", {
                    entity: C(
                      "bounty" === _
                        ? "web.bounties.entity_bounty"
                        : "submission" === _
                          ? "web.bounties.entity_submission"
                          : "web.bounties.entity_comment",
                    ),
                  }),
                ],
              })
            : null),
          (y[26] = _),
          (y[27] = R),
          (y[28] = C),
          (y[29] = b))
        : (b = y[29]),
      y[30] !== S || y[31] !== I || y[32] !== C
        ? ((x = S
            ? (0, t.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                  (0, t.jsxs)("p", {
                    className:
                      "flex items-start gap-2 text-[13px] text-text-secondary",
                    children: [
                      (0, t.jsx)(r.wB, {
                        "aria-hidden": !0,
                        className: "mt-0.5 size-4 shrink-0 text-text-error",
                      }),
                      S,
                    ],
                  }),
                  (0, t.jsxs)("button", {
                    className:
                      "inline-flex w-fit items-center gap-1.5 rounded-full bg-bg-quaternary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-bg-quaternary",
                    onClick: I,
                    type: "button",
                    children: [
                      (0, t.jsx)(r.B4, { className: "size-3.5" }),
                      C("common.try_again"),
                    ],
                  }),
                ],
              })
            : null),
          (y[30] = S),
          (y[31] = I),
          (y[32] = C),
          (y[33] = x))
        : (x = y[33]),
      y[34] !== T || y[35] !== R || y[36] !== O
        ? ((p = T && !R ? (0, t.jsx)(k, { data: T, onApplyReason: O }) : null),
          (y[34] = T),
          (y[35] = R),
          (y[36] = O),
          (y[37] = p))
        : (p = y[37]),
      y[38] !== C
        ? ((g = C("web.bounties.second_opinion_disclaimer")),
          (y[38] = C),
          (y[39] = g))
        : (g = y[39]),
      y[40] !== g
        ? ((f = (0, t.jsx)("p", {
            className: "text-[11px] leading-4 text-text-tertiary",
            children: g,
          })),
          (y[40] = g),
          (y[41] = f))
        : (f = y[41]),
      y[42] !== x || y[43] !== p || y[44] !== f || y[45] !== m || y[46] !== b
        ? ((h = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-2.5 rounded-xl border border-border-secondary bg-bg-tertiary p-3",
            children: [m, b, x, p, f],
          })),
          (y[42] = x),
          (y[43] = p),
          (y[44] = f),
          (y[45] = m),
          (y[46] = b),
          (y[47] = h))
        : (h = y[47]),
      h
    );
  }
  function k(e) {
    let r,
      s,
      a,
      l,
      c,
      u,
      d,
      m,
      b,
      x,
      p,
      g,
      f = (0, n.c)(36),
      { data: h, onApplyReason: y } = e,
      { t: w } = (0, o.f)();
    f[0] !== h.recommendation || f[1] !== w
      ? ((r = ((e, t) => {
          switch (e) {
            case "ban":
              return {
                label: t("web.bounties.opinion_leans_ban"),
                tone: "danger",
              };
            case "do_not_ban":
              return {
                label: t("web.bounties.opinion_leans_allow"),
                tone: "positive",
              };
            default:
              return {
                label: t("web.bounties.opinion_needs_human"),
                tone: "warning",
              };
          }
        })(h.recommendation, w)),
        (f[0] = h.recommendation),
        (f[1] = w),
        (f[2] = r))
      : (r = f[2]);
    let _ = r,
      N = O[_.tone];
    return (
      f[3] !== N
        ? ((s = (0, i.c)(
            "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
            N,
          )),
          (f[3] = N),
          (f[4] = s))
        : (s = f[4]),
      f[5] !== _.label || f[6] !== s
        ? ((a = (0, t.jsx)("span", { className: s, children: _.label })),
          (f[5] = _.label),
          (f[6] = s),
          (f[7] = a))
        : (a = f[7]),
      f[8] !== h.confidence || f[9] !== w
        ? ((l = w("web.bounties.opinion_confidence", {
            confidence: h.confidence,
          })),
          (f[8] = h.confidence),
          (f[9] = w),
          (f[10] = l))
        : (l = f[10]),
      f[11] !== l
        ? ((c = (0, t.jsx)("span", {
            className:
              "text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary",
            children: l,
          })),
          (f[11] = l),
          (f[12] = c))
        : (c = f[12]),
      f[13] !== a || f[14] !== c
        ? ((u = (0, t.jsxs)("div", {
            className: "flex flex-wrap items-center gap-2",
            children: [a, c],
          })),
          (f[13] = a),
          (f[14] = c),
          (f[15] = u))
        : (u = f[15]),
      f[16] !== h.headline
        ? ((d = h.headline
            ? (0, t.jsx)("p", {
                className: "text-[13px] font-semibold leading-5 text-white",
                children: h.headline,
              })
            : null),
          (f[16] = h.headline),
          (f[17] = d))
        : (d = f[17]),
      f[18] !== h.rationale
        ? ((m = h.rationale
            ? (0, t.jsx)("p", {
                className: "text-[13px] leading-5 text-text-secondary",
                children: h.rationale,
              })
            : null),
          (f[18] = h.rationale),
          (f[19] = m))
        : (m = f[19]),
      f[20] !== h.xEngagementWarning || f[21] !== w
        ? ((b = h.xEngagementWarning
            ? (0, t.jsxs)("div", {
                className:
                  "rounded-lg border border-text-error/30 bg-text-error/[0.08] p-2.5",
                children: [
                  (0, t.jsx)("p", {
                    className: "text-[12px] font-semibold text-text-error",
                    children: w("web.bounties.x_engagement_warning_title"),
                  }),
                  (0, t.jsx)("p", {
                    className:
                      "mt-0.5 text-[12px] leading-4 text-text-secondary",
                    children: h.xEngagementWarning,
                  }),
                ],
              })
            : null),
          (f[20] = h.xEngagementWarning),
          (f[21] = w),
          (f[22] = b))
        : (b = f[22]),
      f[23] !== h.concerns
        ? ((x =
            h.concerns.length > 0
              ? (0, t.jsx)("ul", {
                  className: "flex flex-col gap-1.5",
                  children: h.concerns.map(C),
                })
              : null),
          (f[23] = h.concerns),
          (f[24] = x))
        : (x = f[24]),
      f[25] !== h.suggestedReason || f[26] !== y || f[27] !== w
        ? ((p =
            h.suggestedReason && y
              ? (0, t.jsx)("button", {
                  className:
                    "inline-flex w-fit items-center gap-1.5 rounded-full bg-bg-tertiary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-bg-quaternary",
                  onClick: () => y(h.suggestedReason),
                  type: "button",
                  children: w("web.bounties.use_reason", {
                    reason: h.suggestedReason,
                  }),
                })
              : null),
          (f[25] = h.suggestedReason),
          (f[26] = y),
          (f[27] = w),
          (f[28] = p))
        : (p = f[28]),
      f[29] !== b ||
      f[30] !== x ||
      f[31] !== p ||
      f[32] !== u ||
      f[33] !== d ||
      f[34] !== m
        ? ((g = (0, t.jsxs)("div", {
            className: "flex flex-col gap-2.5",
            children: [u, d, m, b, x, p],
          })),
          (f[29] = b),
          (f[30] = x),
          (f[31] = p),
          (f[32] = u),
          (f[33] = d),
          (f[34] = m),
          (f[35] = g))
        : (g = f[35]),
      g
    );
  }
  function C(e) {
    return (0, t.jsxs)(
      "li",
      {
        className: "text-[12px] leading-4 text-text-secondary",
        children: [
          (0, t.jsx)("span", {
            className: "font-semibold text-white",
            children: e.category,
          }),
          e.detail ? `: ${e.detail}` : null,
        ],
      },
      `${e.category}:${e.detail}`,
    );
  }
  let T = m.c,
    S = ["Nudity", "Sexual content", "Graphic violence", "Graphic injury", m.b],
    R = ({
      isActive: e,
      selectedReason: t,
      otherReason: n,
      inactiveReason: r,
    }) => (e ? r.trim() : t === m.b ? n.trim() : t.trim());
  function A(e) {
    let r,
      i,
      a,
      l,
      d,
      b,
      x,
      g,
      f,
      h,
      y,
      w,
      _,
      N,
      v,
      j,
      O,
      k,
      C,
      A,
      z,
      I,
      D = (0, n.c)(85),
      {
        open: U,
        actionType: W,
        isActive: F,
        isPending: B,
        entityLabel: P,
        requiresReason: H,
        inactiveReason: M,
        selectedReason: q,
        otherReason: K,
        showSecondOpinion: X,
        secondOpinionTarget: V,
        priorBanInfo: $,
        priorUnbanInfo: Y,
        onInactiveReasonChange: G,
        onSelectedReasonChange: J,
        onOtherReasonChange: Q,
        onOpenChange: Z,
        onConfirm: ee,
      } = e,
      { t: et } = (0, o.f)();
    if (
      D[0] !== W ||
      D[1] !== P ||
      D[2] !== M ||
      D[3] !== F ||
      D[4] !== B ||
      D[5] !== G ||
      D[6] !== Z ||
      D[7] !== Q ||
      D[8] !== J ||
      D[9] !== U ||
      D[10] !== K ||
      D[11] !== $ ||
      D[12] !== Y ||
      D[13] !== H ||
      D[14] !== q ||
      D[15] !== et
    ) {
      let e,
        n,
        s = et(
          "bounty" === P
            ? "web.bounties.entity_bounty"
            : "submission" === P
              ? "web.bounties.entity_submission"
              : "web.bounties.entity_comment",
        );
      (D[29] !== Q || D[30] !== J
        ? ((e = (e) => {
            let t = ((e) => {
              let t = e.trim();
              if (!t) return null;
              let n = T.find(
                (e) => e !== m.b && e.toLowerCase() === t.toLowerCase(),
              );
              return n
                ? { selectedReason: n, otherReason: "" }
                : { selectedReason: m.b, otherReason: t };
            })(e);
            t && (J(t.selectedReason), Q(t.otherReason));
          }),
          (D[29] = Q),
          (D[30] = J),
          (D[31] = e))
        : (e = D[31]),
        (a = e));
      let o = et(
          "ban" === W
            ? F
              ? "web.bounties.mod_unban"
              : "web.bounties.mod_ban"
            : F
              ? "web.bounties.mod_unmark_nsfw"
              : "web.bounties.mod_mark_nsfw",
        ),
        N = o.toLowerCase(),
        v = "ban" === W ? T : S;
      D[32] !== M || D[33] !== F || D[34] !== K || D[35] !== q
        ? ((n = R({
            isActive: F,
            selectedReason: q,
            otherReason: K,
            inactiveReason: M,
          })),
          (D[32] = M),
          (D[33] = F),
          (D[34] = K),
          (D[35] = q),
          (D[36] = n))
        : (n = D[36]);
      let j = n;
      d = !H || j.length >= 3;
      let O = H && !F && q === m.b;
      ((l = B
        ? et(
            "ban" === W
              ? F
                ? "web.bounties.mod_unbanning"
                : "web.bounties.mod_banning"
              : F
                ? "web.bounties.mod_unmarking_nsfw"
                : "web.bounties.mod_marking_nsfw",
          )
        : d
          ? et("web.bounties.mod_confirm_action", { action: o, entity: s })
          : et(
              O
                ? "web.bounties.mod_enter_reason"
                : "web.bounties.mod_select_reason",
              { action: N },
            )),
        (i = c.N),
        (w = U),
        D[37] !== B || D[38] !== Z
          ? ((_ = (e) => {
              B || Z(e);
            }),
            (D[37] = B),
            (D[38] = Z),
            (D[39] = _))
          : (_ = D[39]),
        (r = c.d),
        (h = "max-w-[440px] border-border-secondary bg-bg-primary p-6"),
        (y = "bg-black/75 backdrop-blur-sm"),
        (b = "flex flex-col gap-4 p-1"),
        (x = (0, t.jsxs)("header", {
          className: "flex flex-col gap-1.5",
          children: [
            (0, t.jsx)("p", {
              className: "text-lg font-semibold text-white",
              children: et("web.bounties.mod_confirm_title", {
                action: o,
                entity: s,
              }),
            }),
            (0, t.jsx)("p", {
              className: "text-sm text-text-secondary",
              children: H
                ? et("web.bounties.mod_reason_hint")
                : et("web.bounties.mod_will_apply", { action: N, entity: s }),
            }),
          ],
        })),
        D[40] !== W || D[41] !== F || D[42] !== $ || D[43] !== Y
          ? ((g =
              "ban" !== W || F
                ? null
                : (0, t.jsx)(p, {
                    banInfo: $,
                    unbanInfo: Y,
                    variant: "modal",
                  })),
            (D[40] = W),
            (D[41] = F),
            (D[42] = $),
            (D[43] = Y),
            (D[44] = g))
          : (g = D[44]),
        (f = H
          ? F
            ? (0, t.jsxs)("label", {
                className: "flex flex-col gap-1.5 text-sm text-text-secondary",
                children: [
                  et("web.bounties.reason_label"),
                  (0, t.jsx)("textarea", {
                    "aria-label": et("web.bounties.moderation_reason"),
                    className:
                      "min-h-[96px] resize-none rounded-xl border border-border-tertiary bg-bg-tertiary px-3 py-2 text-sm text-white outline-none placeholder:text-text-tertiary focus:border-border-tertiary",
                    disabled: B,
                    onChange: (e) => G(e.target.value),
                    placeholder: et("web.bounties.mod_explain_reason", {
                      entity: s,
                      state: et(
                        "ban" === W
                          ? "web.bounties.mod_state_unbanned"
                          : "web.bounties.mod_state_unmarked_nsfw",
                      ),
                    }),
                    value: M,
                  }),
                ],
              })
            : (0, t.jsxs)("div", {
                className: "flex flex-col gap-1.5 text-sm text-text-secondary",
                children: [
                  (0, t.jsx)("span", {
                    children: et("web.bounties.reason_label"),
                  }),
                  (0, t.jsxs)(u.d, {
                    disabled: B,
                    onValueChange: J,
                    value: q,
                    children: [
                      (0, t.jsx)(u.P, {
                        "aria-label": et("web.bounties.moderation_reason"),
                        className:
                          "h-11 rounded-xl border-border-secondary bg-bg-tertiary px-3 text-sm text-white data-[placeholder]:text-text-tertiary",
                        children: (0, t.jsx)(u.U, {
                          placeholder: et(
                            "web.bounties.select_reason_placeholder",
                          ),
                        }),
                      }),
                      (0, t.jsx)(u.r, {
                        className:
                          "border-border-secondary bg-bg-primary text-white",
                        children: v.map(L),
                      }),
                    ],
                  }),
                  O
                    ? (0, t.jsx)("textarea", {
                        "aria-label": et(
                          "web.bounties.other_moderation_reason",
                        ),
                        className:
                          "min-h-[96px] resize-none rounded-xl border border-border-tertiary bg-bg-tertiary px-3 py-2 text-sm text-white outline-none placeholder:text-text-tertiary focus:border-border-tertiary",
                        disabled: B,
                        onChange: (e) => Q(e.target.value),
                        placeholder: et("web.bounties.mod_explain_reason", {
                          entity: s,
                          state: et(
                            "ban" === W
                              ? "web.bounties.mod_state_banned"
                              : "web.bounties.mod_state_tagged_nsfw",
                          ),
                        }),
                        value: K,
                      })
                    : null,
                ],
              })
          : null),
        (D[0] = W),
        (D[1] = P),
        (D[2] = M),
        (D[3] = F),
        (D[4] = B),
        (D[5] = G),
        (D[6] = Z),
        (D[7] = Q),
        (D[8] = J),
        (D[9] = U),
        (D[10] = K),
        (D[11] = $),
        (D[12] = Y),
        (D[13] = H),
        (D[14] = q),
        (D[15] = et),
        (D[16] = r),
        (D[17] = i),
        (D[18] = a),
        (D[19] = l),
        (D[20] = d),
        (D[21] = b),
        (D[22] = x),
        (D[23] = g),
        (D[24] = f),
        (D[25] = h),
        (D[26] = y),
        (D[27] = w),
        (D[28] = _));
    } else
      ((r = D[16]),
        (i = D[17]),
        (a = D[18]),
        (l = D[19]),
        (d = D[20]),
        (b = D[21]),
        (x = D[22]),
        (g = D[23]),
        (f = D[24]),
        (h = D[25]),
        (y = D[26]),
        (w = D[27]),
        (_ = D[28]));
    (D[45] !== a ||
    D[46] !== P ||
    D[47] !== F ||
    D[48] !== B ||
    D[49] !== H ||
    D[50] !== V ||
    D[51] !== X
      ? ((N =
          X && V && H && !F
            ? (0, t.jsx)(E, {
                disabled: B,
                entityLabel: P,
                onApplyReason: a,
                target: V,
              })
            : null),
        (D[45] = a),
        (D[46] = P),
        (D[47] = F),
        (D[48] = B),
        (D[49] = H),
        (D[50] = V),
        (D[51] = X),
        (D[52] = N))
      : (N = D[52]),
      D[53] !== Z ? ((v = () => Z(!1)), (D[53] = Z), (D[54] = v)) : (v = D[54]),
      D[55] !== et
        ? ((j = et("common.cancel")), (D[55] = et), (D[56] = j))
        : (j = D[56]),
      D[57] !== B || D[58] !== v || D[59] !== j
        ? ((O = (0, t.jsx)(s.K, {
            isDisabled: B,
            onClick: v,
            variant: "secondary",
            children: j,
          })),
          (D[57] = B),
          (D[58] = v),
          (D[59] = j),
          (D[60] = O))
        : (O = D[60]));
    let en = B || !d;
    return (
      D[61] !== l || D[62] !== ee || D[63] !== en
        ? ((k = (0, t.jsx)(s.K, {
            className: "bg-[#F87171] text-bg-primary hover:bg-[#EF4444]",
            isDisabled: en,
            onClick: ee,
            variant: "primary",
            children: l,
          })),
          (D[61] = l),
          (D[62] = ee),
          (D[63] = en),
          (D[64] = k))
        : (k = D[64]),
      D[65] !== O || D[66] !== k
        ? ((C = (0, t.jsxs)("footer", {
            className: "flex items-center justify-end gap-2 pt-1",
            children: [O, k],
          })),
          (D[65] = O),
          (D[66] = k),
          (D[67] = C))
        : (C = D[67]),
      D[68] !== b ||
      D[69] !== C ||
      D[70] !== x ||
      D[71] !== g ||
      D[72] !== f ||
      D[73] !== N
        ? ((A = (0, t.jsxs)("div", {
            className: b,
            children: [x, g, f, N, C],
          })),
          (D[68] = b),
          (D[69] = C),
          (D[70] = x),
          (D[71] = g),
          (D[72] = f),
          (D[73] = N),
          (D[74] = A))
        : (A = D[74]),
      D[75] !== r || D[76] !== A || D[77] !== h || D[78] !== y
        ? ((z = (0, t.jsx)(r, {
            className: h,
            overlayClassName: y,
            children: A,
          })),
          (D[75] = r),
          (D[76] = A),
          (D[77] = h),
          (D[78] = y),
          (D[79] = z))
        : (z = D[79]),
      D[80] !== i || D[81] !== z || D[82] !== w || D[83] !== _
        ? ((I = (0, t.jsx)(i, { open: w, onOpenChange: _, children: z })),
          (D[80] = i),
          (D[81] = z),
          (D[82] = w),
          (D[83] = _),
          (D[84] = I))
        : (I = D[84]),
      I
    );
  }
  function L(e) {
    return (0, t.jsx)(
      u.T,
      {
        className:
          "text-white transition-colors hover:bg-bg-tertiary hover:text-white focus:bg-bg-tertiary focus:text-white",
        value: e,
        children: e,
      },
      e,
    );
  }
  function z(e) {
    let s,
      c,
      u,
      m,
      b,
      x,
      p,
      g,
      f,
      h,
      y,
      w,
      _,
      N,
      v,
      j,
      O,
      E,
      k,
      C,
      T = (0, n.c)(56);
    T[0] !== e
      ? (({
          entityLabel: m,
          actionType: s,
          isActive: y,
          isPending: b,
          onConfirm: p,
          secondOpinionTarget: h,
          priorBanInfo: g,
          priorUnbanInfo: f,
          className: u,
          onClick: x,
          ...c
        } = e),
        (T[0] = e),
        (T[1] = s),
        (T[2] = c),
        (T[3] = u),
        (T[4] = m),
        (T[5] = b),
        (T[6] = x),
        (T[7] = p),
        (T[8] = g),
        (T[9] = f),
        (T[10] = h),
        (T[11] = y))
      : ((s = T[1]),
        (c = T[2]),
        (u = T[3]),
        (m = T[4]),
        (b = T[5]),
        (x = T[6]),
        (p = T[7]),
        (g = T[8]),
        (f = T[9]),
        (h = T[10]),
        (y = T[11]));
    let S = void 0 !== y && y,
      { t: L } = (0, o.f)(),
      z = (0, d.f)(),
      I = "ban" === s,
      [D, U] = (0, a.useState)(!1),
      [W, F] = (0, a.useState)(""),
      [B, P] = (0, a.useState)(""),
      [H, M] = (0, a.useState)("");
    T[12] !== x
      ? ((w = (e) => {
          (x?.(e), e.stopPropagation(), U(!0));
        }),
        (T[12] = x),
        (T[13] = w))
      : (w = T[13]);
    let q = w;
    T[14] !== b
      ? ((_ = (e) => {
          !b && (U(e), e || (F(""), P(""), M("")));
        }),
        (T[14] = b),
        (T[15] = _))
      : (_ = T[15]);
    let K = _;
    T[16] !== W ||
    T[17] !== S ||
    T[18] !== p ||
    T[19] !== H ||
    T[20] !== I ||
    T[21] !== B ||
    T[22] !== L
      ? ((N = () => {
          let e = () => {
            (U(!1), F(""), P(""), M(""));
          };
          if (!I) return void p(S ? "Unmarked as NSFW" : "Marked as NSFW", e);
          let t = R({
            isActive: S,
            selectedReason: B,
            otherReason: H,
            inactiveReason: W,
          });
          t.length < 3
            ? l.c.error(L("web.bounties.mod_reason_required"))
            : p(t, e);
        }),
        (T[16] = W),
        (T[17] = S),
        (T[18] = p),
        (T[19] = H),
        (T[20] = I),
        (T[21] = B),
        (T[22] = L),
        (T[23] = N))
      : (N = T[23]);
    let X = N;
    if (!z) return null;
    T[24] !== u
      ? ((v = (0, i.c)(
          "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#FCA5A5] transition-colors hover:bg-white/[0.06] disabled:opacity-60",
          u,
        )),
        (T[24] = u),
        (T[25] = v))
      : (v = T[25]);
    let V = b || c.disabled;
    return (
      T[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, t.jsx)(r.O2, { className: "h-4 w-4" })), (T[26] = j))
        : (j = T[26]),
      T[27] !== s || T[28] !== S || T[29] !== b || T[30] !== L
        ? ((O = b
            ? "ban" === s
              ? S
                ? L("web.bounties.mod_unbanning")
                : L("web.bounties.mod_banning")
              : S
                ? L("web.bounties.mod_unmarking_nsfw")
                : L("web.bounties.mod_marking_nsfw")
            : "ban" === s
              ? S
                ? L("web.bounties.mod_unban")
                : L("web.bounties.mod_ban")
              : S
                ? L("web.bounties.mod_unmark_nsfw")
                : L("web.bounties.mod_mark_nsfw")),
          (T[27] = s),
          (T[28] = S),
          (T[29] = b),
          (T[30] = L),
          (T[31] = O))
        : (O = T[31]),
      T[32] !== c || T[33] !== q || T[34] !== v || T[35] !== V || T[36] !== O
        ? ((E = (0, t.jsxs)("button", {
            ...c,
            className: v,
            disabled: V,
            onClick: q,
            type: "button",
            children: [j, O],
          })),
          (T[32] = c),
          (T[33] = q),
          (T[34] = v),
          (T[35] = V),
          (T[36] = O),
          (T[37] = E))
        : (E = T[37]),
      T[38] !== s ||
      T[39] !== D ||
      T[40] !== m ||
      T[41] !== X ||
      T[42] !== K ||
      T[43] !== W ||
      T[44] !== S ||
      T[45] !== b ||
      T[46] !== H ||
      T[47] !== g ||
      T[48] !== f ||
      T[49] !== I ||
      T[50] !== h ||
      T[51] !== B
        ? ((k = (0, t.jsx)(A, {
            actionType: s,
            entityLabel: m,
            isActive: S,
            isPending: b,
            requiresReason: I,
            secondOpinionTarget: h,
            priorBanInfo: g,
            priorUnbanInfo: f,
            showSecondOpinion: !0,
            onOtherReasonChange: M,
            onConfirm: X,
            onOpenChange: K,
            onSelectedReasonChange: P,
            onInactiveReasonChange: F,
            otherReason: H,
            open: D,
            selectedReason: B,
            inactiveReason: W,
          })),
          (T[38] = s),
          (T[39] = D),
          (T[40] = m),
          (T[41] = X),
          (T[42] = K),
          (T[43] = W),
          (T[44] = S),
          (T[45] = b),
          (T[46] = H),
          (T[47] = g),
          (T[48] = f),
          (T[49] = I),
          (T[50] = h),
          (T[51] = B),
          (T[52] = k))
        : (k = T[52]),
      T[53] !== k || T[54] !== E
        ? ((C = (0, t.jsxs)(t.Fragment, { children: [E, k] })),
          (T[53] = k),
          (T[54] = E),
          (T[55] = C))
        : (C = T[55]),
      C
    );
  }
  ((z.displayName = "ModerationActionButton"), e.s(["f", 0, z], 232719));
};
