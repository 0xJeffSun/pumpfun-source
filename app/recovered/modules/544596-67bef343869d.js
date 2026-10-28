// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    r = e.i(426091),
    i = e.i(599077),
    n = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    l = e.i(63289),
    o = e.i(367643),
    d = e.i(832705),
    c = e.i(777683),
    u = e.i(429285),
    m = e.i(410718),
    x = e.i(280667);
  function p(e) {
    e.stopPropagation();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let b,
          f,
          g,
          h,
          v,
          y,
          k,
          j,
          w,
          N = (0, s.c)(27),
          { taskId: I, draftTitle: C, className: _ } = e,
          { t: A } = (0, a.f)(),
          S = (0, i.useRouter)(),
          { openWithDraft: P } = (0, m.useBountyCreateDialog)(),
          [U, T] = (0, n.useState)(!1);
        (N[0] !== A
          ? ((b = () => {
              (T(!1), l.c.success(A("web.bounties.draft_deleted")));
            }),
            (N[0] = A),
            (N[1] = b))
          : (b = N[1]),
          N[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = async (e) => {
                let t = await (0, c.A)(e);
                t?.code === "BOUNTY_FUNDED_ON_CHAIN" && T(!0);
              }),
              (N[2] = f))
            : (f = N[2]),
          N[3] !== b
            ? ((g = { onSuccess: b, onError: f }), (N[3] = b), (N[4] = g))
            : (g = N[4]));
        let E = (0, o.f)(g);
        N[5] !== P || N[6] !== S || N[7] !== A
          ? ((h = {
              onSuccess: (e) => {
                if ((T(!1), "NEEDS_FUNDING" === e.status)) {
                  (l.c.success(A("web.bounties.draft_restored")), P(e.taskId));
                  return;
                }
                (l.c.success(A("web.bounties.bounty_recovered")),
                  S.push((0, u.$)({ taskId: e.taskId })));
              },
            }),
            (N[5] = P),
            (N[6] = S),
            (N[7] = A),
            (N[8] = h))
          : (h = N[8]);
        let B = (0, d.f)(h),
          D = E.isPending && E.variables?.taskId === I,
          L = B.isPending && B.variables?.taskId === I;
        return (
          N[9] !== _
            ? ((v = (0, r.c)(
                "w-auto rounded-full border border-border-tertiary bg-bg-tertiary px-3 py-1.5 text-xs font-semibold hover:bg-bg-quaternary hover:text-[#FCA5A5]",
                _,
              )),
              (N[9] = _),
              (N[10] = v))
            : (v = N[10]),
          N[11] !== E || N[12] !== I
            ? ((y = () => E.mutate({ taskId: I })),
              (k = () => E.mutate({ taskId: I, force: !0 })),
              (N[11] = E),
              (N[12] = I),
              (N[13] = y),
              (N[14] = k))
            : ((y = N[13]), (k = N[14])),
          N[15] !== B || N[16] !== I
            ? ((j = () => B.mutate({ taskId: I })),
              (N[15] = B),
              (N[16] = I),
              (N[17] = j))
            : (j = N[17]),
          N[18] !== C ||
          N[19] !== D ||
          N[20] !== U ||
          N[21] !== L ||
          N[22] !== v ||
          N[23] !== y ||
          N[24] !== k ||
          N[25] !== j
            ? ((w = (0, t.jsx)(x.f, {
                className: v,
                draftTitle: C,
                isDeleting: D,
                isFundedOnChain: U,
                isRecovering: L,
                onClick: p,
                onConfirm: y,
                onConfirmForce: k,
                onFinishPublishing: j,
              })),
              (N[18] = C),
              (N[19] = D),
              (N[20] = U),
              (N[21] = L),
              (N[22] = v),
              (N[23] = y),
              (N[24] = k),
              (N[25] = j),
              (N[26] = w))
            : (w = N[26]),
          w
        );
      },
    ],
    544596,
  );
  var b = e.i(745018),
    f = e.i(928529),
    g = e.i(806968);
  let h = "aspect-[4/3]";
  function v(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          l,
          o = (0, s.c)(55),
          {
            media: d,
            showVideoOverlay: c,
            overlays: u,
            className: m,
            priority: x,
            muxAnalytics: p,
          } = e,
          y = void 0 === c || c,
          k = void 0 !== x && x,
          { t: j } = (0, a.f)(),
          [w, N] = (0, n.useState)(!1),
          [I, C] = (0, n.useState)(!1),
          [_, A] = (0, n.useState)(null),
          [S, P] = (0, n.useState)(null),
          U = d?.type === "video" ? d.posterUrl : void 0;
        (o[0] !== U
          ? ((i = () => {
              if (!U) return;
              let e = !1,
                t = new window.Image();
              return (
                (t.onload = () => {
                  var s, r;
                  if (e) return;
                  let i =
                    ((s = t.naturalWidth),
                    (r = t.naturalHeight),
                    s <= 0 || r <= 0 ? null : r > s ? "portrait" : "landscape");
                  i && P({ posterUrl: U, orientation: i });
                }),
                (t.src = U),
                () => {
                  ((e = !0), (t.onload = null));
                }
              );
            }),
            (l = [U]),
            (o[0] = U),
            (o[1] = i),
            (o[2] = l))
          : ((i = o[1]), (l = o[2])),
          (0, n.useEffect)(i, l));
        let T = S && S.posterUrl === U ? S.orientation : null;
        if (!d) return null;
        if ("image" === d.type || "gallery" === d.type) {
          let e, s, i, n, a;
          o[3] !== d.type || o[4] !== d.url || o[5] !== d.urls
            ? ((e = "image" === d.type ? [d.url] : d.urls),
              (o[3] = d.type),
              (o[4] = d.url),
              (o[5] = d.urls),
              (o[6] = e))
            : (e = o[6]);
          let l = e,
            c = l[0],
            x = Math.max(0, l.length - 1);
          return (
            o[7] !== m
              ? ((s = (0, r.c)(
                  "relative block w-full overflow-hidden bg-bg-tertiary",
                  h,
                  m,
                )),
                (o[7] = m),
                (o[8] = s))
              : (s = o[8]),
            o[9] !== c || o[10] !== k
              ? ((i = (0, t.jsx)(f.default, {
                  alt: "",
                  className: "object-cover saturate-[1.05]",
                  fill: !0,
                  priority: k,
                  sizes:
                    "(max-width: 640px) 100vw, (max-width: 940px) 50vw, 33vw",
                  src: c,
                  unoptimized: !0,
                })),
                (o[9] = c),
                (o[10] = k),
                (o[11] = i))
              : (i = o[11]),
            o[12] !== x
              ? ((n =
                  x > 0
                    ? (0, t.jsxs)("span", {
                        className:
                          "pointer-events-none absolute right-2 top-2 inline-flex items-center rounded-md bg-black/65 px-1.5 py-0.5 text-[11px] font-semibold text-white",
                        children: ["+", x],
                      })
                    : null),
                (o[12] = x),
                (o[13] = n))
              : (n = o[13]),
            o[14] !== u || o[15] !== s || o[16] !== i || o[17] !== n
              ? ((a = (0, t.jsxs)("div", {
                  className: s,
                  children: [i, n, u],
                })),
                (o[14] = u),
                (o[15] = s),
                (o[16] = i),
                (o[17] = n),
                (o[18] = a))
              : (a = o[18]),
            a
          );
        }
        if ("video" === d.type) {
          let e,
            s,
            i,
            n,
            a,
            l,
            c,
            x = d.posterUrl,
            S = !!x && x !== _,
            P = "portrait" === T ? "aspect-[3/4]" : h;
          o[19] !== y
            ? ((e = y
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "pointer-events-none absolute inset-0 flex items-center justify-center",
                    children: (0, t.jsx)("span", {
                      className:
                        "flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-white/85 bg-black/55 text-white backdrop-blur-sm",
                      children: (0, t.jsx)(b.qJ, {
                        className: "ml-0.5 h-5 w-5",
                      }),
                    }),
                  })
                : null),
              (o[19] = y),
              (o[20] = e))
            : (e = o[20]);
          let U = e;
          if (!w) {
            let e, s, i, n, a;
            return (
              o[21] !== j
                ? ((e = j("web.bounties.play_video")), (o[21] = j), (o[22] = e))
                : (e = o[22]),
              o[23] !== m || o[24] !== P
                ? ((s = (0, r.c)(
                    "relative block w-full overflow-hidden bg-bg-tertiary",
                    P,
                    m,
                  )),
                  (o[23] = m),
                  (o[24] = P),
                  (o[25] = s))
                : (s = o[25]),
              o[26] === Symbol.for("react.memo_cache_sentinel")
                ? ((i = (e) => {
                    (e.stopPropagation(), N(!0), C(!0));
                  }),
                  (o[26] = i))
                : (i = o[26]),
              o[27] !== x || o[28] !== k || o[29] !== S
                ? ((n = S
                    ? (0, t.jsx)(f.default, {
                        alt: "",
                        className: "object-cover saturate-[1.05]",
                        fill: !0,
                        onError: () => A(x),
                        priority: k,
                        sizes:
                          "(max-width: 640px) 100vw, (max-width: 940px) 50vw, 33vw",
                        src: x,
                        unoptimized: !0,
                      })
                    : null),
                  (o[27] = x),
                  (o[28] = k),
                  (o[29] = S),
                  (o[30] = n))
                : (n = o[30]),
              o[31] !== u ||
              o[32] !== U ||
              o[33] !== e ||
              o[34] !== s ||
              o[35] !== n
                ? ((a = (0, t.jsxs)("button", {
                    "aria-label": e,
                    className: s,
                    onClick: i,
                    type: "button",
                    children: [n, U, u],
                  })),
                  (o[31] = u),
                  (o[32] = U),
                  (o[33] = e),
                  (o[34] = s),
                  (o[35] = n),
                  (o[36] = a))
                : (a = o[36]),
              a
            );
          }
          return (
            o[37] !== m || o[38] !== P
              ? ((s = (0, r.c)(
                  "relative block w-full overflow-hidden bg-bg-tertiary",
                  P,
                  m,
                )),
                (o[37] = m),
                (o[38] = P),
                (o[39] = s))
              : (s = o[39]),
            o[40] === Symbol.for("react.memo_cache_sentinel")
              ? ((i = () => C(!1)), (n = () => C(!1)), (o[40] = i), (o[41] = n))
              : ((i = o[40]), (n = o[41])),
            o[42] !== d.mimeType ||
            o[43] !== d.posterUrl ||
            o[44] !== d.sources ||
            o[45] !== d.url ||
            o[46] !== p
              ? ((a = (0, t.jsx)(g.f, {
                  autoPlay: !0,
                  className: "absolute inset-0 aspect-auto h-full w-full",
                  controls: !0,
                  controlsLayout: "compact",
                  controlsVisibility: "hover",
                  mediaClassName: "object-contain",
                  muxAnalytics: p,
                  onCanPlay: i,
                  onError: n,
                  poster: d.posterUrl,
                  sources: d.sources,
                  sourceType: d.mimeType,
                  src: d.url,
                })),
                (o[42] = d.mimeType),
                (o[43] = d.posterUrl),
                (o[44] = d.sources),
                (o[45] = d.url),
                (o[46] = p),
                (o[47] = a))
              : (a = o[47]),
            o[48] !== j || o[49] !== I
              ? ((l = I
                  ? (0, t.jsx)("span", {
                      "aria-label": j("web.bounties.loading_video"),
                      className:
                        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
                      role: "status",
                      children: (0, t.jsx)("span", {
                        className:
                          "flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-white/85 bg-black/55 backdrop-blur-sm",
                        children: (0, t.jsx)("span", {
                          className:
                            "size-5 animate-spin rounded-full border-2 border-white/30 border-t-white",
                        }),
                      }),
                    })
                  : null),
                (o[48] = j),
                (o[49] = I),
                (o[50] = l))
              : (l = o[50]),
            o[51] !== l || o[52] !== s || o[53] !== a
              ? ((c = (0, t.jsxs)("div", {
                  className: s,
                  onClick: v,
                  children: [a, l],
                })),
                (o[51] = l),
                (o[52] = s),
                (o[53] = a),
                (o[54] = c))
              : (c = o[54]),
            c
          );
        }
        return null;
      },
    ],
    551467,
  );
  var y = e.i(157633);
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          n,
          a,
          l,
          o,
          d = (0, s.c)(18),
          {
            likeCount: c,
            viewerLiked: u,
            pending: m,
            onToggleLike: x,
            shouldSuppressClick: p,
            className: f,
          } = e,
          g = u ? "Unlike" : "Like",
          h = u && "text-[#F87171]";
        return (
          d[0] !== f || d[1] !== h
            ? ((i = (0, r.c)(
                "inline-flex items-center gap-1 text-[11.5px] font-semibold text-text-primary transition-colors hover:text-[#F87171]",
                h,
                f,
              )),
              (d[0] = f),
              (d[1] = h),
              (d[2] = i))
            : (i = d[2]),
          d[3] !== x || d[4] !== m || d[5] !== p
            ? ((n = (e) => {
                (e.stopPropagation(), p?.(e) || m || x());
              }),
              (d[3] = x),
              (d[4] = m),
              (d[5] = p),
              (d[6] = n))
            : (n = d[6]),
          d[7] !== u
            ? ((a = u
                ? (0, t.jsx)(y.cJ, { className: "size-3 text-[#F87171]" })
                : (0, t.jsx)(b.cJ, { className: "size-3" })),
              (d[7] = u),
              (d[8] = a))
            : (a = d[8]),
          d[9] !== c
            ? ((l = (0, t.jsx)("span", {
                className: "tabular-nums",
                children: c,
              })),
              (d[9] = c),
              (d[10] = l))
            : (l = d[10]),
          d[11] !== g ||
          d[12] !== i ||
          d[13] !== n ||
          d[14] !== a ||
          d[15] !== l ||
          d[16] !== u
            ? ((o = (0, t.jsxs)("button", {
                "aria-label": g,
                "aria-pressed": u,
                className: i,
                onClick: n,
                type: "button",
                children: [a, l],
              })),
              (d[11] = g),
              (d[12] = i),
              (d[13] = n),
              (d[14] = a),
              (d[15] = l),
              (d[16] = u),
              (d[17] = o))
            : (o = d[17]),
          o
        );
      },
    ],
    883793,
  );
  let k =
      "border border-border-secondary bg-[rgba(8,8,10,0.88)] shadow-[0_1px_6px_rgba(0,0,0,0.45)] backdrop-blur-sm",
    j = {
      open: "border-transparent bg-[rgba(134,239,172,0.95)] text-[#052e16]",
      dispute: "border-[#F87171]/30 bg-[#F87171]/14 text-[#F87171]",
      winner:
        "border border-[#f0d080]/55 bg-gradient-to-br from-[#fde68a] via-[#e8b84a] to-[#c9922e] text-[#1a1208] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_2px_14px_rgba(200,154,60,0.55)]",
      draft: "border-border-tertiary bg-bg-tertiary text-text-tertiary",
      review: "border-[#FACC15]/30 bg-[#FACC15]/14 text-[#FACC15]",
      pending:
        "border-[rgba(255,255,255,0.16)] bg-[rgba(17,17,19,0.78)] text-text-secondary",
      submission: "border-blue-400/35 bg-blue-400/[0.28] text-blue-300",
      endingSoon: "border-transparent bg-[#FACC15] text-[#1a1208]",
    },
    w = {
      dispute: (0, r.c)(k, "text-[#F87171]"),
      draft: (0, r.c)(k, "text-text-tertiary"),
      review: (0, r.c)(k, "text-[#FACC15]"),
      pending: (0, r.c)(k, "text-text-secondary"),
      submission: (0, r.c)(k, "text-[#93c5fd]"),
      endingSoon: (0, r.c)(k, "text-[#FDE047]"),
    },
    N = {
      open: "OPEN",
      dispute: "IN DISPUTE",
      winner: "PAID",
      draft: "DRAFT",
      review: "IN REVIEW",
      pending: "PENDING",
      submission: "SUBMISSION",
      endingSoon: "ENDING SOON",
    },
    I = (e) => {
      let i,
        n,
        a = (0, s.c)(4),
        { size: l } = e,
        o = "xs" === l ? "h-2.5 w-2.5" : "h-3 w-3";
      return (
        a[0] !== o
          ? ((i = (0, r.c)("shrink-0", o)), (a[0] = o), (a[1] = i))
          : (i = a[1]),
        a[2] !== i
          ? ((n = (0, t.jsx)(b.WV, { "aria-hidden": !0, className: i })),
            (a[2] = i),
            (a[3] = n))
          : (n = a[3]),
        n
      );
    };
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          n,
          a,
          l = (0, s.c)(11),
          { tone: o, label: d, size: c, variant: u, className: m } = e,
          x = void 0 === c ? "md" : c,
          p =
            "onMedia" === (void 0 === u ? "default" : u) &&
            "winner" !== o &&
            "open" !== o
              ? w[o]
              : j[o],
          b =
            "xs" === x
              ? "h-[18px] px-1.5 text-[9px] tracking-[0.06em]"
              : "h-[22px] px-2 text-[10px] tracking-[0.06em]";
        (l[0] !== m || l[1] !== b || l[2] !== p
          ? ((i = (0, r.c)(
              "inline-flex items-center gap-1 rounded-full border font-extrabold uppercase tabular-nums",
              b,
              p,
              m,
            )),
            (l[0] = m),
            (l[1] = b),
            (l[2] = p),
            (l[3] = i))
          : (i = l[3]),
          l[4] !== x || l[5] !== o
            ? ((n = "winner" === o ? (0, t.jsx)(I, { size: x }) : null),
              (l[4] = x),
              (l[5] = o),
              (l[6] = n))
            : (n = l[6]));
        let f = d ?? N[o];
        return (
          l[7] !== i || l[8] !== n || l[9] !== f
            ? ((a = (0, t.jsxs)("span", {
                className: i,
                suppressHydrationWarning: !0,
                children: [n, f],
              })),
              (l[7] = i),
              (l[8] = n),
              (l[9] = f),
              (l[10] = a))
            : (a = l[10]),
          a
        );
      },
    ],
    433610,
  );
  var C = e.i(158791);
  e.s(
    [
      "f",
      0,
      (e) => {
        let i,
          n,
          a,
          l,
          o = (0, s.c)(10),
          { expiresAt: d, createdAt: c } = e;
        if (!d) return null;
        o[0] !== c || o[1] !== d
          ? ((i = (0, C.t)({ expiresAt: d, createdAt: c })),
            (o[0] = c),
            (o[1] = d),
            (o[2] = i))
          : (i = o[2]);
        let u = i,
          m = u < 30 ? "bg-text-warning" : "bg-positive";
        o[3] !== m
          ? ((n = (0, r.c)("block h-full", m)), (o[3] = m), (o[4] = n))
          : (n = o[4]);
        let x = `${u}%`;
        return (
          o[5] !== x
            ? ((a = { width: x }), (o[5] = x), (o[6] = a))
            : (a = o[6]),
          o[7] !== n || o[8] !== a
            ? ((l = (0, t.jsx)("span", {
                className:
                  "mt-1 block h-[3px] overflow-hidden rounded-sm bg-bg-tertiary",
                children: (0, t.jsx)("span", {
                  className: n,
                  style: a,
                  suppressHydrationWarning: !0,
                }),
              })),
              (o[7] = n),
              (o[8] = a),
              (o[9] = l))
            : (l = o[9]),
          l
        );
      },
    ],
    745726,
  );
};
