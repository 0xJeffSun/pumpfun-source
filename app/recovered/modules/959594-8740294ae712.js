// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var a = e.i(398902),
    i = e.i(605255),
    s = e.i(890088),
    l = e.i(187611);
  let n = (e, t) =>
    (0, l.T)(
      (0, s.R)(e, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number.isFinite(t) ? t : 0),
      "date-format",
    );
  var o = e.i(167958),
    c = e.i(634661),
    d = e.i(592209),
    u = e.i(338319);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          s,
          l,
          m,
          x,
          p,
          f,
          g,
          b,
          h = (0, r.c)(27),
          { t: y, i18n: v } = (0, a.f)(),
          w = (0, o.M)();
        if (h[0] !== w || h[1] !== v.language || h[2] !== y) {
          let r,
            a,
            o = (0, d.v)(v.language) ?? "en";
          ((m = "callout-rewards-empty"),
            (x = "flex flex-col gap-3 opacity-50"));
          let f = c.s[w];
          (h[9] !== f
            ? ((r = (0, u.c)(f, "text-text-tertiary")), (h[9] = f), (h[10] = r))
            : (r = h[10]),
            h[11] !== y
              ? ((a = y("callouts.rewards.earned_all_time")),
                (h[11] = y),
                (h[12] = a))
              : (a = h[12]),
            h[13] !== r || h[14] !== a
              ? ((p = (0, t.jsx)("div", {
                  className: "flex h-8 items-center",
                  children: (0, t.jsx)("span", { className: r, children: a }),
                })),
                (h[13] = r),
                (h[14] = a),
                (h[15] = p))
              : (p = h[15]),
            (l = "flex h-8 items-center"),
            (e = i.lJ),
            (s = n(o, 0)),
            (h[0] = w),
            (h[1] = v.language),
            (h[2] = y),
            (h[3] = e),
            (h[4] = s),
            (h[5] = l),
            (h[6] = m),
            (h[7] = x),
            (h[8] = p));
        } else
          ((e = h[3]),
            (s = h[4]),
            (l = h[5]),
            (m = h[6]),
            (x = h[7]),
            (p = h[8]));
        return (
          h[16] !== e || h[17] !== s
            ? ((f = (0, t.jsx)("span", { className: e, children: s })),
              (h[16] = e),
              (h[17] = s),
              (h[18] = f))
            : (f = h[18]),
          h[19] !== l || h[20] !== f
            ? ((g = (0, t.jsx)("div", { className: l, children: f })),
              (h[19] = l),
              (h[20] = f),
              (h[21] = g))
            : (g = h[21]),
          h[22] !== m || h[23] !== x || h[24] !== p || h[25] !== g
            ? ((b = (0, t.jsxs)("section", {
                "data-testid": m,
                className: x,
                children: [p, g],
              })),
              (h[22] = m),
              (h[23] = x),
              (h[24] = p),
              (h[25] = g),
              (h[26] = b))
            : (b = h[26]),
          b
        );
      },
    ],
    959594,
  );
  var m = e.i(928529),
    x = e.i(787773);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          i,
          s,
          l,
          n,
          d,
          u = (0, r.c)(14),
          { t: p } = (0, a.f)(),
          f = (0, o.M)();
        u[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              className:
                "relative h-[134px] w-full overflow-hidden rounded-xl bg-bg-secondary",
              children: (0, t.jsx)(m.default, {
                src: "/rewards/callout-rewards-hero.webp",
                alt: "",
                fill: !0,
                sizes: "(max-width: 640px) 100vw, 768px",
                className: "object-cover",
              }),
            })),
            (u[0] = e))
          : (e = u[0]);
        let g = c.s[f];
        (u[1] !== p
          ? ((i = p("callouts.rewards.how_it_works_title")),
            (u[1] = p),
            (u[2] = i))
          : (i = u[2]),
          u[3] !== g || u[4] !== i
            ? ((s = (0, t.jsx)("p", { className: g, children: i })),
              (u[3] = g),
              (u[4] = i),
              (u[5] = s))
            : (s = u[5]));
        let b = x.Q[f];
        return (
          u[6] !== p
            ? ((l = p("callouts.rewards.how_it_works_description")),
              (u[6] = p),
              (u[7] = l))
            : (l = u[7]),
          u[8] !== b || u[9] !== l
            ? ((n = (0, t.jsx)("p", { className: b, children: l })),
              (u[8] = b),
              (u[9] = l),
              (u[10] = n))
            : (n = u[10]),
          u[11] !== s || u[12] !== n
            ? ((d = (0, t.jsxs)("section", {
                "data-testid": "callout-rewards-how-it-works",
                className: "flex flex-col gap-3",
                children: [
                  e,
                  (0, t.jsxs)("div", {
                    className: "flex flex-col gap-1",
                    children: [s, n],
                  }),
                ],
              })),
              (u[11] = s),
              (u[12] = n),
              (u[13] = d))
            : (d = u[13]),
          d
        );
      },
    ],
    411534,
  );
  var p = e.i(745018),
    f = e.i(292686),
    g = e.i(146695),
    b = e.i(352386),
    h = e.i(63289),
    y = e.i(529653),
    v = e.i(154121);
  let w =
    "flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-secondary bg-bg-secondary py-3 text-sm font-semibold leading-normal text-text-primary transition-colors hover:bg-bg-tertiary disabled:opacity-40";
  var _ = e.i(182119),
    j = e.i(635236),
    N = e.i(292032),
    k = e.i(355330),
    S = e.i(466931),
    z = e.i(140550),
    C = e.i(666617),
    U = e.i(75971);
  let E = [
      { id: "rick-roll", uri: e.i(188291).Z, kind: "gif" },
      ...U.R.flatMap((e) => {
        let t = U.Q[e];
        return t ? [{ id: e, uri: t, kind: "image" }] : [];
      }),
    ],
    T = { background: { type: "gradient" }, exportKind: "png" },
    P = (e, t) =>
      "video" === e ? { type: "video", uri: t } : { type: "image", uri: t };
  var $ = e.i(390421),
    K = e.i(98642),
    A = e.i(595673),
    I = e.i(90832),
    R = e.i(446640);
  e.i(566551);
  var q = e.i(106006),
    O = e.i(716983),
    F = e.i(538794);
  let M = Math.round(161500 / 395),
    D = "linear-gradient(180deg, #86EFAC 0%, #22C55E 50%, #052E16 100%)",
    Y = "#86EFAC";
  function B(e) {
    let i,
      o,
      c,
      m,
      x,
      p,
      f,
      g,
      b,
      h,
      y,
      v,
      w,
      _,
      j,
      N,
      k,
      S,
      z,
      C,
      U,
      E,
      T,
      P,
      $,
      K,
      A,
      O,
      D,
      B = (0, r.c)(73),
      {
        holder: Q,
        username: L,
        totalPaidUsdc: W,
        mostRecentPayout: J,
        variant: H,
        background: V,
        transparentCapture: Z,
        ref: X,
      } = e,
      ee = void 0 === H ? "total" : H,
      et = void 0 !== Z && Z,
      { t: er, i18n: ea } = (0, a.f)();
    if (
      B[0] !== ea.language ||
      B[1] !== J ||
      B[2] !== W ||
      B[3] !== L ||
      B[4] !== ee
    ) {
      let e,
        t = (0, d.v)(ea.language) ?? "en";
      (B[10] !== L ? ((e = L?.trim()), (B[10] = L), (B[11] = e)) : (e = B[11]),
        (i = e));
      let r = (m = "recent" === ee && null != J) && J ? J.amountUsdc : W;
      ((c = `${r < 0 ? "" : "+"}${n(t, r)}`),
        (o = Math.min(56, 300 / (0, F.x)(c, 1))),
        (x = J?.createdAt
          ? (0, s.r)(t, { dateStyle: "long" }).format(new Date(J.createdAt))
          : null),
        (B[0] = ea.language),
        (B[1] = J),
        (B[2] = W),
        (B[3] = L),
        (B[4] = ee),
        (B[5] = i),
        (B[6] = o),
        (B[7] = c),
        (B[8] = m),
        (B[9] = x));
    } else ((i = B[5]), (o = B[6]), (c = B[7]), (m = B[8]), (x = B[9]));
    let ei = x;
    B[12] !== m || B[13] !== J || B[14] !== ei || B[15] !== er || B[16] !== W
      ? ((p = m
          ? (0, t.jsxs)("p", {
              className: "flex items-center gap-1.5 pt-2 text-xs",
              children: [
                (0, t.jsx)("span", {
                  className: "font-semibold",
                  children: er("callouts.rewards.share_card.total_payouts"),
                }),
                (0, t.jsx)("span", {
                  className: "text-white/70",
                  children: (0, l.T)((0, I.w)(W), "number-format"),
                }),
              ],
            })
          : J && ei
            ? (0, t.jsxs)("p", {
                className: "flex flex-wrap items-center gap-1.5 pt-2 text-xs",
                children: [
                  (0, t.jsx)("span", {
                    className: "font-semibold",
                    children: er(
                      "callouts.rewards.share_card.most_recent_payout",
                    ),
                  }),
                  (0, t.jsx)("span", {
                    className: "text-white/70",
                    children: (0, l.T)(
                      `${ei} \xb7 ${(0, I.w)(J.amountUsdc)}`,
                      "date-format",
                    ),
                  }),
                ],
              })
            : null),
        (B[12] = m),
        (B[13] = J),
        (B[14] = ei),
        (B[15] = er),
        (B[16] = W),
        (B[17] = p))
      : (p = B[17]);
    let es = p,
      el = m ? "recent" : "total",
      en = et ? "" : "border border-white/10";
    B[18] !== en
      ? ((f = (0, u.c)(
          q.f.className,
          "relative overflow-hidden rounded-[22px] text-white antialiased",
          en,
        )),
        (B[18] = en),
        (B[19] = f))
      : (f = B[19]);
    let eo = et ? "transparent" : "#111113";
    (B[20] !== eo
      ? ((g = { width: 340, height: M, backgroundColor: eo }),
        (B[20] = eo),
        (B[21] = g))
      : (g = B[21]),
      B[22] !== V || B[23] !== et
        ? ((b = et ? null : (0, t.jsx)(G, { background: V })),
          (B[22] = V),
          (B[23] = et),
          (B[24] = b))
        : (b = B[24]),
      B[25] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "pointer-events-none absolute inset-0",
            style: {
              background:
                "linear-gradient(180deg, rgba(17,17,19,0.15) 0%, rgba(17,17,19,0.42) 55%, rgba(17,17,19,0.8) 100%)",
            },
          })),
          (B[25] = h))
        : (h = B[25]),
      B[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = { padding: 16 }), (B[26] = y))
        : (y = B[26]),
      B[27] !== Q
        ? ((v = (0, t.jsx)(R.K, { holder: Q, sizeClass: "size-8" })),
          (B[27] = Q),
          (B[28] = v))
        : (v = B[28]),
      B[29] !== i
        ? ((w = i
            ? (0, t.jsx)("span", {
                style: { color: Y },
                children: (0, l.T)("@", "unicode-symbol"),
              })
            : null),
          (B[29] = i),
          (B[30] = w))
        : (w = B[30]));
    let ec = i || Q.displayName;
    (B[31] !== ec
      ? ((_ = (0, l.T)(ec, "user-name")), (B[31] = ec), (B[32] = _))
      : (_ = B[32]),
      B[33] !== _
        ? ((j = (0, t.jsx)("span", { className: "truncate", children: _ })),
          (B[33] = _),
          (B[34] = j))
        : (j = B[34]),
      B[35] !== w || B[36] !== j
        ? ((N = (0, t.jsxs)("span", {
            className:
              "flex min-w-0 items-center gap-1 text-sm font-semibold leading-tight",
            children: [w, j],
          })),
          (B[35] = w),
          (B[36] = j),
          (B[37] = N))
        : (N = B[37]),
      B[38] !== v || B[39] !== N
        ? ((k = (0, t.jsxs)("div", {
            className: "flex items-center gap-2.5",
            children: [v, N],
          })),
          (B[38] = v),
          (B[39] = N),
          (B[40] = k))
        : (k = B[40]),
      B[41] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, t.jsx)("div", { className: "flex-1" })), (B[41] = S))
        : (S = B[41]));
    let ed = m
      ? "callouts.rewards.share_card.my_latest_callout_paid_me"
      : "callouts.rewards.share_card.my_callouts_paid_me";
    return (
      B[42] !== er || B[43] !== ed
        ? ((z = er(ed)), (B[42] = er), (B[43] = ed), (B[44] = z))
        : (z = B[44]),
      B[45] !== z
        ? ((C = (0, t.jsx)("p", {
            className: "text-lg font-semibold leading-tight",
            children: z,
          })),
          (B[45] = z),
          (B[46] = C))
        : (C = B[46]),
      B[47] !== o
        ? ((U = { color: Y, fontSize: o, height: 64 }),
          (B[47] = o),
          (B[48] = U))
        : (U = B[48]),
      B[49] !== c
        ? ((E = (0, l.T)(c, "number-format")), (B[49] = c), (B[50] = E))
        : (E = B[50]),
      B[51] !== U || B[52] !== E
        ? ((T = (0, t.jsx)("p", {
            "data-testid": "callout-rewards-share-hero",
            className:
              "flex items-center whitespace-nowrap font-bold tracking-[-0.02em]",
            style: U,
            children: E,
          })),
          (B[51] = U),
          (B[52] = E),
          (B[53] = T))
        : (T = B[53]),
      B[54] === Symbol.for("react.memo_cache_sentinel")
        ? ((P = (0, t.jsx)("div", {
            className: "mt-4 h-px w-full bg-white/15",
          })),
          (B[54] = P))
        : (P = B[54]),
      B[55] === Symbol.for("react.memo_cache_sentinel")
        ? (($ = (0, t.jsx)(R.n, {})), (B[55] = $))
        : ($ = B[55]),
      B[56] !== er
        ? ((K = er("share.card.taste_pays")), (B[56] = er), (B[57] = K))
        : (K = B[57]),
      B[58] !== K
        ? ((A = (0, t.jsxs)("div", {
            className: "flex items-center justify-between pt-3.5",
            children: [
              $,
              (0, t.jsx)("span", {
                className: "max-w-[180px] text-right text-sm font-semibold",
                children: K,
              }),
            ],
          })),
          (B[58] = K),
          (B[59] = A))
        : (A = B[59]),
      B[60] !== es || B[61] !== k || B[62] !== C || B[63] !== T || B[64] !== A
        ? ((O = (0, t.jsxs)("div", {
            className: "absolute inset-0 flex flex-col",
            style: y,
            children: [k, S, C, T, es, P, A],
          })),
          (B[60] = es),
          (B[61] = k),
          (B[62] = C),
          (B[63] = T),
          (B[64] = A),
          (B[65] = O))
        : (O = B[65]),
      B[66] !== X ||
      B[67] !== b ||
      B[68] !== O ||
      B[69] !== el ||
      B[70] !== f ||
      B[71] !== g
        ? ((D = (0, t.jsxs)("div", {
            ref: X,
            "data-testid": "callout-rewards-share-card",
            "data-variant": el,
            className: f,
            style: g,
            children: [b, h, O],
          })),
          (B[66] = X),
          (B[67] = b),
          (B[68] = O),
          (B[69] = el),
          (B[70] = f),
          (B[71] = g),
          (B[72] = D))
        : (D = B[72]),
      D
    );
  }
  function G(e) {
    let a,
      i = (0, r.c)(7),
      { background: s } = e;
    if ("video" === s.type) {
      let e;
      return (
        i[0] !== s.uri
          ? ((e = (0, t.jsx)("video", {
              src: s.uri,
              autoPlay: !0,
              loop: !0,
              muted: !0,
              playsInline: !0,
              className: "absolute inset-0 size-full object-cover",
            })),
            (i[0] = s.uri),
            (i[1] = e))
          : (e = i[1]),
        e
      );
    }
    if ("image" === s.type) {
      let e, r;
      return (
        i[2] !== s.uri
          ? ((e = (0, O.f)(s.uri)), (i[2] = s.uri), (i[3] = e))
          : (e = i[3]),
        i[4] !== e
          ? ((r = (0, t.jsx)("img", {
              src: e,
              alt: "",
              crossOrigin: "anonymous",
              className: "absolute inset-0 size-full object-cover",
            })),
            (i[4] = e),
            (i[5] = r))
          : (r = i[5]),
        r
      );
    }
    return (
      i[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "absolute inset-0",
            style: { background: D },
          })),
          (i[6] = a))
        : (a = i[6]),
      a
    );
  }
  var Q = e.i(743477);
  function L(e) {
    let i,
      s,
      l,
      n,
      o,
      c,
      d,
      u,
      m,
      x = (0, r.c)(36),
      {
        selection: f,
        customBackgrounds: g,
        onSelectDefault: b,
        onSelectPreset: h,
        onSelectCustom: y,
        onUpload: v,
        onRemoveCustom: w,
      } = e,
      { t: _ } = (0, a.f)(),
      j = "default" === f.type;
    if (
      (x[0] !== _
        ? ((i = _("share.profile.bg_default_a11y")), (x[0] = _), (x[1] = i))
        : (i = x[1]),
      x[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)("div", {
            className: "size-full",
            style: { background: D },
          })),
          (x[2] = s))
        : (s = x[2]),
      x[3] !== b || x[4] !== j || x[5] !== i
        ? ((l = (0, t.jsx)(Q.a, {
            testId: "bg-default",
            isSelected: j,
            label: i,
            onClick: b,
            children: s,
          })),
          (x[3] = b),
          (x[4] = j),
          (x[5] = i),
          (x[6] = l))
        : (l = x[6]),
      x[7] !== h || x[8] !== f.presetId || x[9] !== f.type || x[10] !== _
        ? ((n = E.map((e) =>
            (0, t.jsxs)(
              Q.a,
              {
                testId: `bg-preset-${e.id}`,
                isSelected: "preset" === f.type && f.presetId === e.id,
                label: _("share.profile.bg_preset_a11y"),
                onClick: () => h(e.id),
                children: [
                  (0, t.jsx)("img", {
                    src: e.uri,
                    alt: "",
                    className: "size-full object-cover",
                  }),
                  "image" !== e.kind ? (0, t.jsx)(Q.g, {}) : null,
                ],
              },
              e.id,
            ),
          )),
          (x[7] = h),
          (x[8] = f.presetId),
          (x[9] = f.type),
          (x[10] = _),
          (x[11] = n))
        : (n = x[11]),
      x[12] !== g ||
        x[13] !== w ||
        x[14] !== y ||
        x[15] !== f.type ||
        x[16] !== f.uri ||
        x[17] !== _)
    ) {
      let e;
      (x[19] !== w ||
      x[20] !== y ||
      x[21] !== f.type ||
      x[22] !== f.uri ||
      x[23] !== _
        ? ((e = (e) =>
            (0, t.jsxs)(
              "div",
              {
                className: "relative",
                children: [
                  (0, t.jsxs)(Q.a, {
                    testId: "bg-custom",
                    isSelected: "custom" === f.type && f.uri === e.uri,
                    label: _("share.profile.bg_custom_a11y"),
                    onClick: () => y(e.uri),
                    children: [
                      "video" === e.kind
                        ? (0, t.jsx)("video", {
                            src: e.uri,
                            muted: !0,
                            playsInline: !0,
                            preload: "metadata",
                            className: "size-full object-cover",
                          })
                        : (0, t.jsx)("img", {
                            src: e.uri,
                            alt: "",
                            className: "size-full object-cover",
                          }),
                      "image" !== e.kind ? (0, t.jsx)(Q.g, {}) : null,
                    ],
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    "aria-label": _("share.profile.bg_remove"),
                    onClick: () => w(e.uri),
                    className:
                      "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-bg-primary text-text-secondary ring-1 ring-border-secondary hover:text-text-primary",
                    children: (0, t.jsx)(p.x6, { className: "size-2.5" }),
                  }),
                ],
              },
              e.uri,
            )),
          (x[19] = w),
          (x[20] = y),
          (x[21] = f.type),
          (x[22] = f.uri),
          (x[23] = _),
          (x[24] = e))
        : (e = x[24]),
        (o = g.map(e)),
        (x[12] = g),
        (x[13] = w),
        (x[14] = y),
        (x[15] = f.type),
        (x[16] = f.uri),
        (x[17] = _),
        (x[18] = o));
    } else o = x[18];
    return (
      x[25] !== _
        ? ((c = _("share.profile.bg_upload_a11y")), (x[25] = _), (x[26] = c))
        : (c = x[26]),
      x[27] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsx)("div", {
            className:
              "flex size-full items-center justify-center bg-bg-tertiary text-text-tertiary",
            children: (0, t.jsx)(p.YC, { className: "size-4" }),
          })),
          (x[27] = d))
        : (d = x[27]),
      x[28] !== v || x[29] !== c
        ? ((u = (0, t.jsx)(Q.a, {
            testId: "bg-upload",
            isSelected: !1,
            label: c,
            onClick: v,
            children: d,
          })),
          (x[28] = v),
          (x[29] = c),
          (x[30] = u))
        : (u = x[30]),
      x[31] !== l || x[32] !== n || x[33] !== o || x[34] !== u
        ? ((m = (0, t.jsxs)("div", {
            className: "grid w-full grid-cols-7 gap-2",
            "data-testid": "rewards-share-backgrounds",
            children: [l, n, o, u],
          })),
          (x[31] = l),
          (x[32] = n),
          (x[33] = o),
          (x[34] = u),
          (x[35] = m))
        : (m = x[35]),
      m
    );
  }
  var W = e.i(532470);
  let J = "pump_callout_rewards";
  e.s(
    [
      "f",
      0,
      function ({
        open: e,
        onOpenChange: i,
        holderAddress: s,
        user: l,
        totalPaidUsdc: n,
        mostRecentPayout: o,
      }) {
        let { t: c } = (0, a.f)(),
          d = (0, b.useRef)(null),
          m = (0, b.useRef)(null),
          x = (0, b.useRef)(null),
          [U, R] = (0, b.useState)(null),
          [q, O] = (0, b.useState)("total"),
          F = (0, v.f)({ address: s, user: l, enabled: e }),
          D = (function (e) {
            let t,
              a,
              i,
              s,
              l,
              n,
              o,
              c,
              d,
              u = (0, r.c)(19),
              { enabled: m } = e;
            u[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((t = { type: "default" }), (u[0] = t))
              : (t = u[0]);
            let [x, p] = (0, b.useState)(t);
            u[1] !== m
              ? ((a = { scope: "rewards", enabled: m }), (u[1] = m), (u[2] = a))
              : (a = u[2]);
            let f = (0, W.f)(a);
            u[3] !== f
              ? ((i = (e) => {
                  (f.removeUpload(e),
                    p((t) =>
                      "custom" === t.type && t.uri === e
                        ? { type: "default" }
                        : t,
                    ));
                }),
                (u[3] = f),
                (u[4] = i))
              : (i = u[4]);
            let g = i;
            return (
              u[5] !== x
                ? ((s = ((e) => {
                    switch (e.type) {
                      case "default":
                        return "default";
                      case "preset":
                        return `preset:${e.presetId}`;
                      case "custom":
                        return `custom:${e.uri}`;
                    }
                  })(x)),
                  (u[5] = x),
                  (u[6] = s))
                : (s = u[6]),
              u[7] === Symbol.for("react.memo_cache_sentinel")
                ? ((l = () => p({ type: "default" })),
                  (n = (e) => p({ type: "preset", presetId: e })),
                  (o = (e) => p({ type: "custom", uri: e })),
                  (u[7] = l),
                  (u[8] = n),
                  (u[9] = o))
                : ((l = u[7]), (n = u[8]), (o = u[9])),
              u[10] !== f
                ? ((c = (e) => {
                    e &&
                      f.addUpload(e).then((e) => {
                        e && p({ type: "custom", uri: e.uri });
                      });
                  }),
                  (u[10] = f),
                  (u[11] = c))
                : (c = u[11]),
              u[12] !== g ||
              u[13] !== x ||
              u[14] !== s ||
              u[15] !== c ||
              u[16] !== f.customBackgrounds ||
              u[17] !== f.isPicking
                ? ((d = {
                    selection: x,
                    selectionKey: s,
                    customBackgrounds: f.customBackgrounds,
                    isPicking: f.isPicking,
                    selectDefault: l,
                    selectPreset: n,
                    selectCustom: o,
                    onFilePicked: c,
                    removeCustom: g,
                  }),
                  (u[12] = g),
                  (u[13] = x),
                  (u[14] = s),
                  (u[15] = c),
                  (u[16] = f.customBackgrounds),
                  (u[17] = f.isPicking),
                  (u[18] = d))
                : (d = u[18]),
              d
            );
          })({ enabled: e }),
          Y = ((e, t) => {
            if ("default" === e.type) return T;
            if ("preset" === e.type) {
              let t = E.find((t) => t.id === e.presetId);
              return t
                ? "image" === t.kind
                  ? {
                      background: { type: "image", uri: t.uri },
                      exportKind: "png",
                    }
                  : {
                      background: P(t.kind, t.uri),
                      exportKind: "video",
                      compose: { backgroundUrl: t.uri, fit: "cover" },
                    }
                : T;
            }
            let r = t.find((t) => t.uri === e.uri);
            return r
              ? "image" === r.kind
                ? {
                    background: { type: "image", uri: r.uri },
                    exportKind: "png",
                  }
                : {
                    background: P(r.kind, r.uri),
                    exportKind: "video",
                    compose: {
                      file: r.file,
                      fit: "cover",
                      durationSeconds: r.durationSeconds,
                    },
                  }
              : T;
          })(D.selection, D.customBackgrounds),
          G = "video" === Y.exportKind,
          Q = (0, y.f)(),
          H = (0, g.d)(s, l?.username),
          V = (0, k.f)({ path: H, enabled: e }),
          Z = () => V ?? (0, $.M)(`${window.location.origin}${H}`),
          X = c("web.rewards.share_text", { amount: (0, I.w)(n) }),
          ee = (e) =>
            (0, A.fG)({
              shareType: f.qp.CALLOUT_REWARDS,
              shareMethod: e,
              shareUrl: Z(),
            }),
          et = `${J}.png`,
          er = `${J}.mp4`,
          ea = (e, t) =>
            (0, S.l)({
              error: e,
              feature: "share",
              operation: "callout-rewards-card",
              context: { variant: q, exportKind: Y.exportKind, ...t },
            }),
          ei = async (e, t) => {
            let { blob: r, failedImages: a } = await (0, z.f)({
              root: e,
              width: 340,
              height: M,
            });
            return (
              a.length > 0 &&
                ea(Error("share card image could not be inlined"), {
                  stage: `${t}-image`,
                  failedImages: a,
                }),
              r
            );
          },
          es = async () => {
            let e = m.current;
            if (!e || !Y.compose) return null;
            let t = null;
            try {
              let r = await ei(e, "foreground");
              t = `${q}:${D.selectionKey}:${r.size}`;
              let a = await Q.render({
                foregroundPng: r,
                compose: Y.compose,
                width: 680,
                height: 2 * M,
                cacheKey: t,
              });
              if ("busy" === a.status) return null;
              if ("error" === a.status)
                return (
                  h.c.error(
                    c(
                      "unauthorized" === a.reason
                        ? "web.wallets.manage.sign_in_required"
                        : "share.profile.gif_render_error",
                    ),
                  ),
                  null
                );
              return await (0, K.f)(a.videoUrl, er);
            } catch (e) {
              return (
                t && Q.forget(t),
                ea(e, { stage: "video" }),
                h.c.error(c("share.pnl.verified_bg_save_error")),
                null
              );
            }
          },
          el = async () => {
            let e = d.current;
            if (e) {
              if ((R("download"), ee(f.hF.DOWNLOAD), G)) {
                let e = await es();
                if (e)
                  try {
                    ((0, C.f)({ blob: e, fileName: er }),
                      h.c.success(c("share.pnl.video_saved")));
                  } catch (e) {
                    (ea(e, { stage: "video-download" }),
                      h.c.error(c("share.pnl.verified_bg_save_error")));
                  }
                R(null);
                return;
              }
              try {
                let t = await ei(e, "card");
                (0, C.f)({ blob: t, fileName: et });
              } catch (e) {
                (ea(e, { stage: "png" }),
                  h.c.error(c("web.share.download_image_failed")));
              }
              R(null);
            }
          },
          en = async () => {
            let e = Z();
            ee(f.hF.COPY_LINK);
            try {
              (await navigator.clipboard.writeText(e),
                h.c.success(c("callouts.reply.link_copied")));
            } catch {
              h.c.error(c("web.coin.copy_link_failed"));
            }
          },
          eo = async () => {
            let e = Z();
            if (
              !("u" > typeof navigator && "function" == typeof navigator.share)
            ) {
              (ee(f.hF.TWITTER),
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(X)}&url=${encodeURIComponent(e)}`,
                  "_blank",
                  "noopener",
                ));
              return;
            }
            let t = d.current;
            (R("share"), ee(f.hF.NATIVE));
            try {
              let r = G ? await es() : t ? await ei(t, "card") : null,
                a = r ? new File([r], G ? er : et, { type: r.type }) : null,
                i =
                  null !== a &&
                  ("function" != typeof navigator.canShare ||
                    navigator.canShare({ files: [a] }));
              await navigator.share(
                i && a ? { files: [a], text: X, url: e } : { text: X, url: e },
              );
            } catch (e) {
              (e instanceof DOMException && "AbortError" === e.name) ||
                (ea(e, { stage: "share" }),
                h.c.error(c("common.something_went_wrong")));
            }
            R(null);
          },
          ec = ({ transparentCapture: e, ref: r }) =>
            F
              ? (0, t.jsx)(B, {
                  ref: r,
                  holder: F,
                  username: l?.username,
                  totalPaidUsdc: n,
                  mostRecentPayout: o,
                  variant: q,
                  background: Y.background,
                  transparentCapture: e,
                })
              : null,
          ed = null !== U || Q.isRendering;
        return (0, t.jsx)(_.N, {
          open: e,
          onOpenChange: i,
          children: (0, t.jsx)(_.d, {
            "data-testid": "callout-rewards-share-dialog",
            className:
              "max-h-[calc(100dvh-2rem)] w-[372px] max-w-[calc(100vw-2rem)] overflow-y-auto border-zinc-800 bg-zinc-900 p-0 text-text-primary shadow-lg",
            children: (0, t.jsxs)("div", {
              className: "flex flex-col gap-3 p-4",
              children: [
                (0, t.jsxs)(N.f, {
                  children: [
                    (0, t.jsx)(_.F, {
                      children: c("callouts.rewards.share_title"),
                    }),
                    (0, t.jsx)(_.C, { children: X }),
                  ],
                }),
                o
                  ? (0, t.jsxs)("div", {
                      role: "group",
                      className: "flex gap-1",
                      children: [
                        (0, t.jsx)("button", {
                          type: "button",
                          "aria-pressed": "total" === q,
                          "aria-label": c(
                            "callouts.rewards.share_card.toggle_total_a11y",
                          ),
                          "data-testid": "callout-rewards-share-variant-total",
                          onClick: () => O("total"),
                          className: (0, u.c)(
                            (0, j.f)("total" === q, "sm"),
                            "text-text-primary",
                          ),
                          children: c(
                            "callouts.rewards.share_card.toggle_total_label",
                          ),
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          "aria-pressed": "recent" === q,
                          "aria-label": c(
                            "callouts.rewards.share_card.toggle_latest_a11y",
                          ),
                          "data-testid": "callout-rewards-share-variant-recent",
                          onClick: () => O("recent"),
                          className: (0, u.c)(
                            (0, j.f)("recent" === q, "sm"),
                            "text-text-primary",
                          ),
                          children: c(
                            "callouts.rewards.share_card.toggle_latest_label",
                          ),
                        }),
                      ],
                    })
                  : null,
                (0, t.jsxs)("div", {
                  className: "relative flex justify-center",
                  children: [
                    ec({ transparentCapture: !1, ref: d }),
                    Q.isRendering
                      ? (0, t.jsxs)("div", {
                          className:
                            "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[22px] bg-bg-primary/90 px-8 text-center",
                          children: [
                            (0, t.jsx)("span", {
                              className:
                                "size-6 animate-spin rounded-full border-2 border-primary-green border-t-transparent",
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "text-xs font-medium text-text-primary",
                              children: c("share.profile.gif_generating"),
                            }),
                          ],
                        })
                      : null,
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "mx-auto",
                  style: { width: 340 },
                  children: (0, t.jsx)(L, {
                    selection: D.selection,
                    customBackgrounds: D.customBackgrounds,
                    onSelectDefault: D.selectDefault,
                    onSelectPreset: D.selectPreset,
                    onSelectCustom: D.selectCustom,
                    onUpload: () => x.current?.click(),
                    onRemoveCustom: D.removeCustom,
                  }),
                }),
                (0, t.jsx)("input", {
                  ref: x,
                  type: "file",
                  accept: "image/*,video/*,.gif",
                  className: "hidden",
                  "data-testid": "callout-rewards-share-upload",
                  onChange: (e) => {
                    (D.onFilePicked(e.target.files?.[0]),
                      (e.target.value = ""));
                  },
                }),
                G
                  ? (0, t.jsx)("div", {
                      "aria-hidden": !0,
                      className:
                        "pointer-events-none absolute -left-[9999px] top-0",
                      children: ec({ transparentCapture: !0, ref: m }),
                    })
                  : null,
                (0, t.jsxs)("div", {
                  className: "flex gap-3",
                  children: [
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: el,
                      disabled: ed,
                      "aria-label": c("common.save"),
                      "data-testid": "callout-rewards-share-save",
                      className: w,
                      children: [
                        (0, t.jsx)(p.qY, { className: "size-5" }),
                        c("common.save"),
                      ],
                    }),
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: en,
                      "aria-label": c("common.copy_link"),
                      "data-testid": "callout-rewards-share-copy-link",
                      className: w,
                      children: [
                        (0, t.jsx)(p.HU, { className: "size-5" }),
                        c("common.copy_link"),
                      ],
                    }),
                    (0, t.jsxs)("button", {
                      type: "button",
                      onClick: eo,
                      disabled: ed,
                      "aria-label": c("common.share"),
                      "data-testid": "callout-rewards-share-share",
                      className: (0, u.c)(
                        w,
                        "border-primary-green bg-primary-green text-bg-primary hover:bg-primary-green/90",
                      ),
                      children: [
                        (0, t.jsx)(p.AS, { className: "size-5" }),
                        c("common.share"),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      },
    ],
    218578,
  );
  var H = e.i(439587),
    V = e.i(248496);
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          l,
          u,
          m,
          x,
          f,
          g,
          b = (0, r.c)(30),
          { totalPaidUsdc: h, onShare: y } = e,
          { t: v, i18n: w } = (0, a.f)(),
          _ = (0, o.M)();
        if (
          b[0] !== _ ||
          b[1] !== w.language ||
          b[2] !== y ||
          b[3] !== v ||
          b[4] !== h
        ) {
          let e,
            r,
            a,
            o = (0, d.v)(w.language) ?? "en",
            f = void 0 !== h;
          ((u = "callout-rewards-hero"), (m = "flex flex-col gap-3"));
          let g = c.s[_];
          (b[10] !== v
            ? ((e = v("callouts.rewards.earned_all_time")),
              (b[10] = v),
              (b[11] = e))
            : (e = b[11]),
            b[12] !== g || b[13] !== e
              ? ((r = (0, t.jsx)("span", { className: g, children: e })),
                (b[12] = g),
                (b[13] = e),
                (b[14] = r))
              : (r = b[14]),
            b[15] !== f || b[16] !== y || b[17] !== v
              ? ((a = f
                  ? (0, t.jsx)(H.K, {
                      variant: "primary",
                      size: 32,
                      onClick: y,
                      iconStart: (0, t.jsx)(p.AS, {
                        size: 16,
                        "aria-hidden": !0,
                      }),
                      "data-testid": "callout-rewards-share",
                      children: v("common.share"),
                    })
                  : null),
                (b[15] = f),
                (b[16] = y),
                (b[17] = v),
                (b[18] = a))
              : (a = b[18]),
            b[19] !== r || b[20] !== a
              ? ((x = (0, t.jsxs)("div", {
                  className: "flex h-8 items-center justify-between gap-3",
                  children: [r, a],
                })),
                (b[19] = r),
                (b[20] = a),
                (b[21] = x))
              : (x = b[21]),
            (s = "flex h-8 items-center"),
            (l = f
              ? (0, t.jsx)("span", {
                  className: i.lJ,
                  "data-testid": "callout-rewards-total",
                  children: n(o, h),
                })
              : (0, t.jsx)(V.l, { width: 128, height: 28 })),
            (b[0] = _),
            (b[1] = w.language),
            (b[2] = y),
            (b[3] = v),
            (b[4] = h),
            (b[5] = s),
            (b[6] = l),
            (b[7] = u),
            (b[8] = m),
            (b[9] = x));
        } else ((s = b[5]), (l = b[6]), (u = b[7]), (m = b[8]), (x = b[9]));
        return (
          b[22] !== s || b[23] !== l
            ? ((f = (0, t.jsx)("div", { className: s, children: l })),
              (b[22] = s),
              (b[23] = l),
              (b[24] = f))
            : (f = b[24]),
          b[25] !== u || b[26] !== m || b[27] !== x || b[28] !== f
            ? ((g = (0, t.jsxs)("section", {
                "data-testid": u,
                className: m,
                children: [x, f],
              })),
              (b[25] = u),
              (b[26] = m),
              (b[27] = x),
              (b[28] = f),
              (b[29] = g))
            : (g = b[29]),
          g
        );
      },
    ],
    360633,
  );
  var Z = e.i(690877),
    X = e.i(38279),
    ee = e.i(759257);
  async function et(e) {
    let {
      fetchOptions: t,
      kind: r,
      page: a = X.v.USER_PAYOUTS.PAGE,
      pageSize: i = X.v.USER_PAYOUTS.PAGE_SIZE,
    } = e;
    return (0, ee.j)()("GET /payouts", {
      query: {
        kind: "referral" === r ? "referral" : void 0,
        page: a,
        pageSize: i,
      },
      credentials: "include",
      ...t,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to fetch ${r} payouts (${a.status})`);
          },
        ],
      },
    });
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          a,
          i,
          s,
          l = (0, r.c)(16),
          {
            kind: n,
            page: o,
            pageSize: c,
            queryOptions: d,
            userAddress: u,
          } = e,
          m = void 0 === o ? X.v.USER_PAYOUTS.PAGE : o,
          x = void 0 === c ? X.v.USER_PAYOUTS.PAGE_SIZE : c,
          p = !!u;
        return (
          l[0] !== n || l[1] !== x || l[2] !== u
            ? ((t = (e, t) => {
                let r = t?.queryKey;
                return r?.[1] === n && r?.[2] === u && r?.[4] === x
                  ? e
                  : void 0;
              }),
              (l[0] = n),
              (l[1] = x),
              (l[2] = u),
              (l[3] = t))
            : (t = l[3]),
          l[4] !== n || l[5] !== m || l[6] !== x || l[7] !== u
            ? ((a = () =>
                et({ kind: n, page: m, pageSize: x, userAddress: u })),
              (i = X.Q.USER_PAYOUTS({
                kind: n,
                page: m,
                pageSize: x,
                userAddress: u,
              })),
              (l[4] = n),
              (l[5] = m),
              (l[6] = x),
              (l[7] = u),
              (l[8] = a),
              (l[9] = i))
            : ((a = l[8]), (i = l[9])),
          l[10] !== d ||
          l[11] !== p ||
          l[12] !== t ||
          l[13] !== a ||
          l[14] !== i
            ? ((s = {
                enabled: p,
                placeholderData: t,
                queryFn: a,
                queryKey: i,
                staleTime: 3e5,
                ...d,
              }),
              (l[10] = d),
              (l[11] = p),
              (l[12] = t),
              (l[13] = a),
              (l[14] = i),
              (l[15] = s))
            : (s = l[15]),
          (0, Z.useQuery)(s)
        );
      },
    ],
    629169,
  );
};
