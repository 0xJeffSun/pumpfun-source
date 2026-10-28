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
    m = e.i(338319);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          s,
          l,
          u,
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
          ((u = "callout-rewards-empty"),
            (x = "flex flex-col gap-3 opacity-50"));
          let f = c.s[w];
          (h[9] !== f
            ? ((r = (0, m.c)(f, "text-text-tertiary")), (h[9] = f), (h[10] = r))
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
            (h[6] = u),
            (h[7] = x),
            (h[8] = p));
        } else
          ((e = h[3]),
            (s = h[4]),
            (l = h[5]),
            (u = h[6]),
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
          h[22] !== u || h[23] !== x || h[24] !== p || h[25] !== g
            ? ((b = (0, t.jsxs)("section", {
                "data-testid": u,
                className: x,
                children: [p, g],
              })),
              (h[22] = u),
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
  var u = e.i(928529),
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
          m = (0, r.c)(14),
          { t: p } = (0, a.f)(),
          f = (0, o.M)();
        m[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              className:
                "relative h-[134px] w-full overflow-hidden rounded-xl bg-bg-secondary",
              children: (0, t.jsx)(u.default, {
                src: "/rewards/callout-rewards-hero.webp",
                alt: "",
                fill: !0,
                sizes: "(max-width: 640px) 100vw, 768px",
                className: "object-cover",
              }),
            })),
            (m[0] = e))
          : (e = m[0]);
        let g = c.s[f];
        (m[1] !== p
          ? ((i = p("callouts.rewards.how_it_works_title")),
            (m[1] = p),
            (m[2] = i))
          : (i = m[2]),
          m[3] !== g || m[4] !== i
            ? ((s = (0, t.jsx)("p", { className: g, children: i })),
              (m[3] = g),
              (m[4] = i),
              (m[5] = s))
            : (s = m[5]));
        let b = x.Q[f];
        return (
          m[6] !== p
            ? ((l = p("callouts.rewards.how_it_works_description")),
              (m[6] = p),
              (m[7] = l))
            : (l = m[7]),
          m[8] !== b || m[9] !== l
            ? ((n = (0, t.jsx)("p", { className: b, children: l })),
              (m[8] = b),
              (m[9] = l),
              (m[10] = n))
            : (n = m[10]),
          m[11] !== s || m[12] !== n
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
              (m[11] = s),
              (m[12] = n),
              (m[13] = d))
            : (d = m[13]),
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
  let P = [
      { id: "rick-roll", uri: e.i(188291).Z, kind: "gif" },
      ...U.R.flatMap((e) => {
        let t = U.Q[e];
        return t ? [{ id: e, uri: t, kind: "image" }] : [];
      }),
    ],
    T = { background: { type: "gradient" }, exportKind: "png" },
    $ = (e, t) =>
      "video" === e ? { type: "video", uri: t } : { type: "image", uri: t };
  var A = e.i(390421),
    E = e.i(98642),
    R = e.i(595673),
    I = e.i(90832),
    O = e.i(446640);
  e.i(566551);
  var K = e.i(106006),
    F = e.i(716983),
    q = e.i(538794);
  let D = Math.round(161500 / 395),
    B = "linear-gradient(180deg, #86EFAC 0%, #22C55E 50%, #052E16 100%)",
    M = "#86EFAC";
  function Y(e) {
    let i,
      o,
      c,
      u,
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
      P,
      T,
      $,
      A,
      E,
      R,
      F,
      B,
      Y = (0, r.c)(73),
      {
        holder: Q,
        username: W,
        totalPaidUsdc: L,
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
      Y[0] !== ea.language ||
      Y[1] !== J ||
      Y[2] !== L ||
      Y[3] !== W ||
      Y[4] !== ee
    ) {
      let e,
        t = (0, d.v)(ea.language) ?? "en";
      (Y[10] !== W ? ((e = W?.trim()), (Y[10] = W), (Y[11] = e)) : (e = Y[11]),
        (i = e));
      let r = (u = "recent" === ee && null != J) && J ? J.amountUsdc : L;
      ((c = `${r < 0 ? "" : "+"}${n(t, r)}`),
        (o = Math.min(56, 300 / (0, q.x)(c, 1))),
        (x = J?.createdAt
          ? (0, s.r)(t, { dateStyle: "long" }).format(new Date(J.createdAt))
          : null),
        (Y[0] = ea.language),
        (Y[1] = J),
        (Y[2] = L),
        (Y[3] = W),
        (Y[4] = ee),
        (Y[5] = i),
        (Y[6] = o),
        (Y[7] = c),
        (Y[8] = u),
        (Y[9] = x));
    } else ((i = Y[5]), (o = Y[6]), (c = Y[7]), (u = Y[8]), (x = Y[9]));
    let ei = x;
    Y[12] !== u || Y[13] !== J || Y[14] !== ei || Y[15] !== er || Y[16] !== L
      ? ((p = u
          ? (0, t.jsxs)("p", {
              className: "flex items-center gap-1.5 pt-2 text-xs",
              children: [
                (0, t.jsx)("span", {
                  className: "font-semibold",
                  children: er("callouts.rewards.share_card.total_payouts"),
                }),
                (0, t.jsx)("span", {
                  className: "text-white/70",
                  children: (0, l.T)((0, I.w)(L), "number-format"),
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
        (Y[12] = u),
        (Y[13] = J),
        (Y[14] = ei),
        (Y[15] = er),
        (Y[16] = L),
        (Y[17] = p))
      : (p = Y[17]);
    let es = p,
      el = u ? "recent" : "total",
      en = et ? "" : "border border-white/10";
    Y[18] !== en
      ? ((f = (0, m.c)(
          K.f.className,
          "relative overflow-hidden rounded-[22px] text-white antialiased",
          en,
        )),
        (Y[18] = en),
        (Y[19] = f))
      : (f = Y[19]);
    let eo = et ? "transparent" : "#111113";
    (Y[20] !== eo
      ? ((g = { width: 340, height: D, backgroundColor: eo }),
        (Y[20] = eo),
        (Y[21] = g))
      : (g = Y[21]),
      Y[22] !== V || Y[23] !== et
        ? ((b = et ? null : (0, t.jsx)(G, { background: V })),
          (Y[22] = V),
          (Y[23] = et),
          (Y[24] = b))
        : (b = Y[24]),
      Y[25] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "pointer-events-none absolute inset-0",
            style: {
              background:
                "linear-gradient(180deg, rgba(17,17,19,0.15) 0%, rgba(17,17,19,0.42) 55%, rgba(17,17,19,0.8) 100%)",
            },
          })),
          (Y[25] = h))
        : (h = Y[25]),
      Y[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = { padding: 16 }), (Y[26] = y))
        : (y = Y[26]),
      Y[27] !== Q
        ? ((v = (0, t.jsx)(O.K, { holder: Q, sizeClass: "size-8" })),
          (Y[27] = Q),
          (Y[28] = v))
        : (v = Y[28]),
      Y[29] !== i
        ? ((w = i
            ? (0, t.jsx)("span", {
                style: { color: M },
                children: (0, l.T)("@", "unicode-symbol"),
              })
            : null),
          (Y[29] = i),
          (Y[30] = w))
        : (w = Y[30]));
    let ec = i || Q.displayName;
    (Y[31] !== ec
      ? ((_ = (0, l.T)(ec, "user-name")), (Y[31] = ec), (Y[32] = _))
      : (_ = Y[32]),
      Y[33] !== _
        ? ((j = (0, t.jsx)("span", { className: "truncate", children: _ })),
          (Y[33] = _),
          (Y[34] = j))
        : (j = Y[34]),
      Y[35] !== w || Y[36] !== j
        ? ((N = (0, t.jsxs)("span", {
            className:
              "flex min-w-0 items-center gap-1 text-sm font-semibold leading-tight",
            children: [w, j],
          })),
          (Y[35] = w),
          (Y[36] = j),
          (Y[37] = N))
        : (N = Y[37]),
      Y[38] !== v || Y[39] !== N
        ? ((k = (0, t.jsxs)("div", {
            className: "flex items-center gap-2.5",
            children: [v, N],
          })),
          (Y[38] = v),
          (Y[39] = N),
          (Y[40] = k))
        : (k = Y[40]),
      Y[41] === Symbol.for("react.memo_cache_sentinel")
        ? ((S = (0, t.jsx)("div", { className: "flex-1" })), (Y[41] = S))
        : (S = Y[41]));
    let ed = u
      ? "callouts.rewards.share_card.my_latest_callout_paid_me"
      : "callouts.rewards.share_card.my_callouts_paid_me";
    return (
      Y[42] !== er || Y[43] !== ed
        ? ((z = er(ed)), (Y[42] = er), (Y[43] = ed), (Y[44] = z))
        : (z = Y[44]),
      Y[45] !== z
        ? ((C = (0, t.jsx)("p", {
            className: "text-lg font-semibold leading-tight",
            children: z,
          })),
          (Y[45] = z),
          (Y[46] = C))
        : (C = Y[46]),
      Y[47] !== o
        ? ((U = { color: M, fontSize: o, height: 64 }),
          (Y[47] = o),
          (Y[48] = U))
        : (U = Y[48]),
      Y[49] !== c
        ? ((P = (0, l.T)(c, "number-format")), (Y[49] = c), (Y[50] = P))
        : (P = Y[50]),
      Y[51] !== U || Y[52] !== P
        ? ((T = (0, t.jsx)("p", {
            "data-testid": "callout-rewards-share-hero",
            className:
              "flex items-center whitespace-nowrap font-bold tracking-[-0.02em]",
            style: U,
            children: P,
          })),
          (Y[51] = U),
          (Y[52] = P),
          (Y[53] = T))
        : (T = Y[53]),
      Y[54] === Symbol.for("react.memo_cache_sentinel")
        ? (($ = (0, t.jsx)("div", {
            className: "mt-4 h-px w-full bg-white/15",
          })),
          (Y[54] = $))
        : ($ = Y[54]),
      Y[55] === Symbol.for("react.memo_cache_sentinel")
        ? ((A = (0, t.jsx)(O.n, {})), (Y[55] = A))
        : (A = Y[55]),
      Y[56] !== er
        ? ((E = er("share.card.taste_pays")), (Y[56] = er), (Y[57] = E))
        : (E = Y[57]),
      Y[58] !== E
        ? ((R = (0, t.jsxs)("div", {
            className: "flex items-center justify-between pt-3.5",
            children: [
              A,
              (0, t.jsx)("span", {
                className: "max-w-[180px] text-right text-sm font-semibold",
                children: E,
              }),
            ],
          })),
          (Y[58] = E),
          (Y[59] = R))
        : (R = Y[59]),
      Y[60] !== es || Y[61] !== k || Y[62] !== C || Y[63] !== T || Y[64] !== R
        ? ((F = (0, t.jsxs)("div", {
            className: "absolute inset-0 flex flex-col",
            style: y,
            children: [k, S, C, T, es, $, R],
          })),
          (Y[60] = es),
          (Y[61] = k),
          (Y[62] = C),
          (Y[63] = T),
          (Y[64] = R),
          (Y[65] = F))
        : (F = Y[65]),
      Y[66] !== X ||
      Y[67] !== b ||
      Y[68] !== F ||
      Y[69] !== el ||
      Y[70] !== f ||
      Y[71] !== g
        ? ((B = (0, t.jsxs)("div", {
            ref: X,
            "data-testid": "callout-rewards-share-card",
            "data-variant": el,
            className: f,
            style: g,
            children: [b, h, F],
          })),
          (Y[66] = X),
          (Y[67] = b),
          (Y[68] = F),
          (Y[69] = el),
          (Y[70] = f),
          (Y[71] = g),
          (Y[72] = B))
        : (B = Y[72]),
      B
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
          ? ((e = (0, F.f)(s.uri)), (i[2] = s.uri), (i[3] = e))
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
            style: { background: B },
          })),
          (i[6] = a))
        : (a = i[6]),
      a
    );
  }
  var Q = e.i(743477);
  function W(e) {
    let i,
      s,
      l,
      n,
      o,
      c,
      d,
      m,
      u,
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
            style: { background: B },
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
        ? ((n = P.map((e) =>
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
        ? ((m = (0, t.jsx)(Q.a, {
            testId: "bg-upload",
            isSelected: !1,
            label: c,
            onClick: v,
            children: d,
          })),
          (x[28] = v),
          (x[29] = c),
          (x[30] = m))
        : (m = x[30]),
      x[31] !== l || x[32] !== n || x[33] !== o || x[34] !== m
        ? ((u = (0, t.jsxs)("div", {
            className: "grid w-full grid-cols-7 gap-2",
            "data-testid": "rewards-share-backgrounds",
            children: [l, n, o, m],
          })),
          (x[31] = l),
          (x[32] = n),
          (x[33] = o),
          (x[34] = m),
          (x[35] = u))
        : (u = x[35]),
      u
    );
  }
  var L = e.i(532470);
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
          u = (0, b.useRef)(null),
          x = (0, b.useRef)(null),
          [U, O] = (0, b.useState)(null),
          [K, F] = (0, b.useState)("total"),
          q = (0, v.f)({ address: s, user: l, enabled: e }),
          B = (function (e) {
            let t,
              a,
              i,
              s,
              l,
              n,
              o,
              c,
              d,
              m = (0, r.c)(19),
              { enabled: u } = e;
            m[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((t = { type: "default" }), (m[0] = t))
              : (t = m[0]);
            let [x, p] = (0, b.useState)(t);
            m[1] !== u
              ? ((a = { scope: "rewards", enabled: u }), (m[1] = u), (m[2] = a))
              : (a = m[2]);
            let f = (0, L.f)(a);
            m[3] !== f
              ? ((i = (e) => {
                  (f.removeUpload(e),
                    p((t) =>
                      "custom" === t.type && t.uri === e
                        ? { type: "default" }
                        : t,
                    ));
                }),
                (m[3] = f),
                (m[4] = i))
              : (i = m[4]);
            let g = i;
            return (
              m[5] !== x
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
                  (m[5] = x),
                  (m[6] = s))
                : (s = m[6]),
              m[7] === Symbol.for("react.memo_cache_sentinel")
                ? ((l = () => p({ type: "default" })),
                  (n = (e) => p({ type: "preset", presetId: e })),
                  (o = (e) => p({ type: "custom", uri: e })),
                  (m[7] = l),
                  (m[8] = n),
                  (m[9] = o))
                : ((l = m[7]), (n = m[8]), (o = m[9])),
              m[10] !== f
                ? ((c = (e) => {
                    e &&
                      f.addUpload(e).then((e) => {
                        e && p({ type: "custom", uri: e.uri });
                      });
                  }),
                  (m[10] = f),
                  (m[11] = c))
                : (c = m[11]),
              m[12] !== g ||
              m[13] !== x ||
              m[14] !== s ||
              m[15] !== c ||
              m[16] !== f.customBackgrounds ||
              m[17] !== f.isPicking
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
                  (m[12] = g),
                  (m[13] = x),
                  (m[14] = s),
                  (m[15] = c),
                  (m[16] = f.customBackgrounds),
                  (m[17] = f.isPicking),
                  (m[18] = d))
                : (d = m[18]),
              d
            );
          })({ enabled: e }),
          M = ((e, t) => {
            if ("default" === e.type) return T;
            if ("preset" === e.type) {
              let t = P.find((t) => t.id === e.presetId);
              return t
                ? "image" === t.kind
                  ? {
                      background: { type: "image", uri: t.uri },
                      exportKind: "png",
                    }
                  : {
                      background: $(t.kind, t.uri),
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
                    background: $(r.kind, r.uri),
                    exportKind: "video",
                    compose: {
                      file: r.file,
                      fit: "cover",
                      durationSeconds: r.durationSeconds,
                    },
                  }
              : T;
          })(B.selection, B.customBackgrounds),
          G = "video" === M.exportKind,
          Q = (0, y.f)(),
          H = (0, g.d)(s, l?.username),
          V = (0, k.f)({ path: H, enabled: e }),
          Z = () => V ?? (0, A.M)(`${window.location.origin}${H}`),
          X = c("web.rewards.share_text", { amount: (0, I.w)(n) }),
          ee = (e) =>
            (0, R.fG)({
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
              context: { variant: K, exportKind: M.exportKind, ...t },
            }),
          ei = async (e, t) => {
            let { blob: r, failedImages: a } = await (0, z.f)({
              root: e,
              width: 340,
              height: D,
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
            let e = u.current;
            if (!e || !M.compose) return null;
            let t = null;
            try {
              let r = await ei(e, "foreground");
              t = `${K}:${B.selectionKey}:${r.size}`;
              let a = await Q.render({
                foregroundPng: r,
                compose: M.compose,
                width: 680,
                height: 2 * D,
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
              return await (0, E.f)(a.videoUrl, er);
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
              if ((O("download"), ee(f.hF.DOWNLOAD), G)) {
                let e = await es();
                if (e)
                  try {
                    ((0, C.f)({ blob: e, fileName: er }),
                      h.c.success(c("share.pnl.video_saved")));
                  } catch (e) {
                    (ea(e, { stage: "video-download" }),
                      h.c.error(c("share.pnl.verified_bg_save_error")));
                  }
                O(null);
                return;
              }
              try {
                let t = await ei(e, "card");
                (0, C.f)({ blob: t, fileName: et });
              } catch (e) {
                (ea(e, { stage: "png" }),
                  h.c.error(c("web.share.download_image_failed")));
              }
              O(null);
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
            (O("share"), ee(f.hF.NATIVE));
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
            O(null);
          },
          ec = ({ transparentCapture: e, ref: r }) =>
            q
              ? (0, t.jsx)(Y, {
                  ref: r,
                  holder: q,
                  username: l?.username,
                  totalPaidUsdc: n,
                  mostRecentPayout: o,
                  variant: K,
                  background: M.background,
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
                          "aria-pressed": "total" === K,
                          "aria-label": c(
                            "callouts.rewards.share_card.toggle_total_a11y",
                          ),
                          "data-testid": "callout-rewards-share-variant-total",
                          onClick: () => F("total"),
                          className: (0, m.c)(
                            (0, j.f)("total" === K, "sm"),
                            "text-text-primary",
                          ),
                          children: c(
                            "callouts.rewards.share_card.toggle_total_label",
                          ),
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          "aria-pressed": "recent" === K,
                          "aria-label": c(
                            "callouts.rewards.share_card.toggle_latest_a11y",
                          ),
                          "data-testid": "callout-rewards-share-variant-recent",
                          onClick: () => F("recent"),
                          className: (0, m.c)(
                            (0, j.f)("recent" === K, "sm"),
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
                  children: (0, t.jsx)(W, {
                    selection: B.selection,
                    customBackgrounds: B.customBackgrounds,
                    onSelectDefault: B.selectDefault,
                    onSelectPreset: B.selectPreset,
                    onSelectCustom: B.selectCustom,
                    onUpload: () => x.current?.click(),
                    onRemoveCustom: B.removeCustom,
                  }),
                }),
                (0, t.jsx)("input", {
                  ref: x,
                  type: "file",
                  accept: "image/*,video/*,.gif",
                  className: "hidden",
                  "data-testid": "callout-rewards-share-upload",
                  onChange: (e) => {
                    (B.onFilePicked(e.target.files?.[0]),
                      (e.target.value = ""));
                  },
                }),
                G
                  ? (0, t.jsx)("div", {
                      "aria-hidden": !0,
                      className:
                        "pointer-events-none absolute -left-[9999px] top-0",
                      children: ec({ transparentCapture: !0, ref: u }),
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
                      className: (0, m.c)(
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
          m,
          u,
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
          ((m = "callout-rewards-hero"), (u = "flex flex-col gap-3"));
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
            (b[7] = m),
            (b[8] = u),
            (b[9] = x));
        } else ((s = b[5]), (l = b[6]), (m = b[7]), (u = b[8]), (x = b[9]));
        return (
          b[22] !== s || b[23] !== l
            ? ((f = (0, t.jsx)("div", { className: s, children: l })),
              (b[22] = s),
              (b[23] = l),
              (b[24] = f))
            : (f = b[24]),
          b[25] !== m || b[26] !== u || b[27] !== x || b[28] !== f
            ? ((g = (0, t.jsxs)("section", {
                "data-testid": m,
                className: u,
                children: [x, f],
              })),
              (b[25] = m),
              (b[26] = u),
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
            userAddress: m,
          } = e,
          u = void 0 === o ? X.v.USER_PAYOUTS.PAGE : o,
          x = void 0 === c ? X.v.USER_PAYOUTS.PAGE_SIZE : c,
          p = !!m;
        return (
          l[0] !== n || l[1] !== x || l[2] !== m
            ? ((t = (e, t) => {
                let r = t?.queryKey;
                return r?.[1] === n && r?.[2] === m && r?.[4] === x
                  ? e
                  : void 0;
              }),
              (l[0] = n),
              (l[1] = x),
              (l[2] = m),
              (l[3] = t))
            : (t = l[3]),
          l[4] !== n || l[5] !== u || l[6] !== x || l[7] !== m
            ? ((a = () =>
                et({ kind: n, page: u, pageSize: x, userAddress: m })),
              (i = X.Q.USER_PAYOUTS({
                kind: n,
                page: u,
                pageSize: x,
                userAddress: m,
              })),
              (l[4] = n),
              (l[5] = u),
              (l[6] = x),
              (l[7] = m),
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
