// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    s = e.i(445242),
    i = e.i(745018),
    r = e.i(439587),
    n = e.i(426091),
    a = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(147038),
    d = e.i(200165),
    c = e.i(732392),
    x = e.i(815096),
    m = e.i(928529),
    b = e.i(63289);
  function u(e) {
    let d,
      x,
      u,
      p,
      h,
      g,
      f,
      y,
      v,
      j,
      _,
      w,
      N,
      k,
      S,
      I,
      z,
      C,
      $ = (0, s.c)(55),
      {
        value: P,
        onChange: O,
        disabled: T,
        label: U,
        helpText: E,
        allowRemove: R,
      } = e,
      q = void 0 === R || R,
      { t: D } = (0, l.f)(),
      K = (0, a.useId)(),
      A = (0, a.useRef)(null),
      F = (0, o.f)(),
      [B, G] = (0, a.useState)(!1);
    $[0] !== O || $[1] !== D || $[2] !== F
      ? ((d = async (e) => {
          G(!0);
          try {
            let { imageUrl: t } = await F({ file: e, contentType: e.type });
            O(t);
          } catch (e) {
            if (e instanceof DOMException && "AbortError" === e.name)
              return void G(!1);
            b.c.error(
              e instanceof Error
                ? e.message
                : D("web.bounties.dev_image_upload_failed"),
            );
          }
          G(!1);
        }),
        ($[0] = O),
        ($[1] = D),
        ($[2] = F),
        ($[3] = d))
      : (d = $[3]);
    let L = d,
      J = (void 0 !== T && T) || B,
      H = `${K}-image`;
    ($[4] !== U || $[5] !== D
      ? ((x = U ?? D("web.bounties.dev_logo_label")),
        ($[4] = U),
        ($[5] = D),
        ($[6] = x))
      : (x = $[6]),
      $[7] !== H || $[8] !== x
        ? ((u = (0, t.jsx)(c.f, {
            className: "mb-2 block text-xs font-medium text-text-secondary",
            htmlFor: H,
            children: x,
          })),
          ($[7] = H),
          ($[8] = x),
          ($[9] = u))
        : (u = $[9]));
    let M = P
      ? "border border-border-secondary"
      : "border border-dashed border-border-secondary text-text-tertiary hover:border-border-tertiary hover:text-text-secondary";
    ($[10] !== M
      ? ((p = (0, n.c)(
          "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-bg-secondary transition-colors",
          M,
        )),
        ($[10] = M),
        ($[11] = p))
      : (p = $[11]),
      $[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = () => A.current?.click()), ($[12] = h))
        : (h = $[12]),
      $[13] !== D || $[14] !== P
        ? ((g = P
            ? (0, t.jsx)(m.default, {
                alt: D("web.bounties.dev_logo_alt"),
                height: 56,
                src: P,
                style: { height: 56, width: 56 },
                unoptimized: !0,
                width: 56,
              })
            : (0, t.jsx)(i.YC, { className: "size-4" })),
          ($[13] = D),
          ($[14] = P),
          ($[15] = g))
        : (g = $[15]),
      $[16] !== J || $[17] !== g || $[18] !== p
        ? ((f = (0, t.jsx)("button", {
            "aria-hidden": !0,
            className: p,
            disabled: J,
            onClick: h,
            tabIndex: -1,
            type: "button",
            children: g,
          })),
          ($[16] = J),
          ($[17] = g),
          ($[18] = p),
          ($[19] = f))
        : (f = $[19]));
    let Y = `${K}-image`;
    return (
      $[20] !== L
        ? ((y = (e) => {
            let t = e.target.files?.[0];
            ((e.target.value = ""), t && L(t));
          }),
          ($[20] = L),
          ($[21] = y))
        : (y = $[21]),
      $[22] !== J || $[23] !== Y || $[24] !== y
        ? ((v = (0, t.jsx)("input", {
            accept: "image/png,image/jpeg,image/webp,image/gif",
            className: "hidden",
            disabled: J,
            id: Y,
            onChange: y,
            ref: A,
            type: "file",
          })),
          ($[22] = J),
          ($[23] = Y),
          ($[24] = y),
          ($[25] = v))
        : (v = $[25]),
      $[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = () => A.current?.click()), ($[26] = j))
        : (j = $[26]),
      $[27] !== B || $[28] !== D || $[29] !== P
        ? ((_ = B
            ? D("web.bounties.uploading")
            : P
              ? D("web.bounties.replace")
              : D("web.bounties.dev_upload_logo")),
          ($[27] = B),
          ($[28] = D),
          ($[29] = P),
          ($[30] = _))
        : (_ = $[30]),
      $[31] !== J || $[32] !== _
        ? ((w = (0, t.jsx)(r.K, {
            isDisabled: J,
            onClick: j,
            size: 32,
            type: "button",
            variant: "secondary",
            children: _,
          })),
          ($[31] = J),
          ($[32] = _),
          ($[33] = w))
        : (w = $[33]),
      $[34] !== q || $[35] !== J || $[36] !== O || $[37] !== D || $[38] !== P
        ? ((N =
            q && P
              ? (0, t.jsx)("button", {
                  className:
                    "text-xs font-medium text-text-tertiary transition-colors hover:text-white disabled:opacity-50",
                  disabled: J,
                  onClick: () => O(void 0),
                  type: "button",
                  children: D("web.bounties.remove"),
                })
              : null),
          ($[34] = q),
          ($[35] = J),
          ($[36] = O),
          ($[37] = D),
          ($[38] = P),
          ($[39] = N))
        : (N = $[39]),
      $[40] !== w || $[41] !== N
        ? ((k = (0, t.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [w, N],
          })),
          ($[40] = w),
          ($[41] = N),
          ($[42] = k))
        : (k = $[42]),
      $[43] !== E
        ? ((S = E
            ? (0, t.jsx)("p", {
                className: "text-xs leading-4 text-text-tertiary",
                children: E,
              })
            : null),
          ($[43] = E),
          ($[44] = S))
        : (S = $[44]),
      $[45] !== k || $[46] !== S
        ? ((I = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col gap-1.5",
            children: [k, S],
          })),
          ($[45] = k),
          ($[46] = S),
          ($[47] = I))
        : (I = $[47]),
      $[48] !== f || $[49] !== v || $[50] !== I
        ? ((z = (0, t.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [f, v, I],
          })),
          ($[48] = f),
          ($[49] = v),
          ($[50] = I),
          ($[51] = z))
        : (z = $[51]),
      $[52] !== z || $[53] !== u
        ? ((C = (0, t.jsxs)("div", { children: [u, z] })),
          ($[52] = z),
          ($[53] = u),
          ($[54] = C))
        : (C = $[54]),
      C
    );
  }
  let p = "mb-2 block text-xs font-medium text-text-secondary",
    h =
      "h-11 rounded-xl border-border-secondary bg-bg-secondary text-sm text-white placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0 dark:border-border-secondary dark:bg-bg-secondary",
    g =
      "w-full rounded-xl border border-border-secondary bg-bg-secondary px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-text-tertiary focus:border-border-tertiary",
    f = () => {
      let e,
        i = (0, s.c)(1);
      return (
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsxs)("span", {
              "aria-hidden": !0,
              className: "text-text-error",
              children: [" ", "*"],
            })),
            (i[0] = e))
          : (e = i[0]),
        e
      );
    };
  function y(e) {
    let i,
      n,
      m,
      b,
      y,
      v,
      j,
      _,
      w,
      N,
      k,
      S,
      I,
      z,
      C,
      $,
      P,
      O,
      T,
      U,
      E,
      R,
      q,
      D,
      K,
      A,
      F,
      B,
      G,
      L,
      J,
      H,
      M,
      Y,
      Q,
      V,
      X,
      Z,
      W,
      ee,
      et = (0, s.c)(113),
      { onCreated: es } = e,
      { t: ei } = (0, l.f)(),
      er = (0, a.useId)(),
      [en, ea] = (0, a.useState)(""),
      [el, eo] = (0, a.useState)(""),
      [ed, ec] = (0, a.useState)(""),
      [ex, em] = (0, a.useState)(void 0),
      [eb, eu] = (0, a.useState)(""),
      [ep, eh] = (0, a.useState)(!1);
    et[0] !== es
      ? ((i = {
          onSuccess: () => {
            (ea(""), eo(""), ec(""), em(void 0), eu(""), eh(!1), es?.());
          },
        }),
        (et[0] = es),
        (et[1] = i))
      : (i = et[1]);
    let eg = (0, o._)(i);
    et[2] !== eb
      ? ((n = (0, x.G)(eb)), (et[2] = eb), (et[3] = n))
      : (n = et[3]);
    let ef = n;
    et[4] !== eb
      ? ((m = (0, x.C)(eb)), (et[4] = eb), (et[5] = m))
      : (m = et[5]);
    let ey = m,
      ev = ep && !ey;
    et[6] !== eg.isPending || et[7] !== ey || et[8] !== en
      ? ((b = en.trim().length > 0 && ey && !eg.isPending),
        (et[6] = eg.isPending),
        (et[7] = ey),
        (et[8] = en),
        (et[9] = b))
      : (b = et[9]);
    let ej = b;
    et[10] !== ej ||
    et[11] !== eg ||
    et[12] !== el ||
    et[13] !== ed ||
    et[14] !== ex ||
    et[15] !== en ||
    et[16] !== ef
      ? ((y = (e) => {
          (e.preventDefault(),
            eh(!0),
            ej &&
              eg.mutate({
                name: en.trim(),
                description: el.trim(),
                homepageUrl: ed.trim(),
                imageUrl: ex,
                allowedOrigins: ef,
              }));
        }),
        (et[10] = ej),
        (et[11] = eg),
        (et[12] = el),
        (et[13] = ed),
        (et[14] = ex),
        (et[15] = en),
        (et[16] = ef),
        (et[17] = y))
      : (y = et[17]);
    let e_ = y,
      ew = `${er}-name`;
    (et[18] !== ei
      ? ((v = ei("web.bounties.dev_name_label")), (et[18] = ei), (et[19] = v))
      : (v = et[19]),
      et[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, t.jsx)(f, {})), (et[20] = j))
        : (j = et[20]),
      et[21] !== ew || et[22] !== v
        ? ((_ = (0, t.jsxs)(c.f, {
            className: p,
            htmlFor: ew,
            children: [v, j],
          })),
          (et[21] = ew),
          (et[22] = v),
          (et[23] = _))
        : (_ = et[23]));
    let eN = `${er}-name`;
    (et[24] === Symbol.for("react.memo_cache_sentinel")
      ? ((w = (e) => ea(e.target.value)), (et[24] = w))
      : (w = et[24]),
      et[25] !== ei
        ? ((N = ei("web.bounties.dev_name_placeholder")),
          (et[25] = ei),
          (et[26] = N))
        : (N = et[26]),
      et[27] !== en || et[28] !== eN || et[29] !== N
        ? ((k = (0, t.jsx)(d.f, {
            className: h,
            id: eN,
            maxLength: x.J,
            onChange: w,
            placeholder: N,
            required: !0,
            value: en,
          })),
          (et[27] = en),
          (et[28] = eN),
          (et[29] = N),
          (et[30] = k))
        : (k = et[30]),
      et[31] !== k || et[32] !== _
        ? ((S = (0, t.jsxs)("div", { children: [_, k] })),
          (et[31] = k),
          (et[32] = _),
          (et[33] = S))
        : (S = et[33]));
    let ek = `${er}-description`;
    (et[34] !== ei
      ? ((I = ei("web.bounties.description_label")),
        (et[34] = ei),
        (et[35] = I))
      : (I = et[35]),
      et[36] !== ek || et[37] !== I
        ? ((z = (0, t.jsx)(c.f, { className: p, htmlFor: ek, children: I })),
          (et[36] = ek),
          (et[37] = I),
          (et[38] = z))
        : (z = et[38]));
    let eS = `${er}-description`;
    (et[39] === Symbol.for("react.memo_cache_sentinel")
      ? ((C = (e) => eo(e.target.value)), (et[39] = C))
      : (C = et[39]),
      et[40] !== ei
        ? (($ = ei("web.bounties.dev_description_placeholder")),
          (et[40] = ei),
          (et[41] = $))
        : ($ = et[41]),
      et[42] !== el || et[43] !== eS || et[44] !== $
        ? ((P = (0, t.jsx)("textarea", {
            className: `${g} min-h-[80px]`,
            id: eS,
            maxLength: x.I,
            onChange: C,
            placeholder: $,
            value: el,
          })),
          (et[42] = el),
          (et[43] = eS),
          (et[44] = $),
          (et[45] = P))
        : (P = et[45]),
      et[46] !== z || et[47] !== P
        ? ((O = (0, t.jsxs)("div", { children: [z, P] })),
          (et[46] = z),
          (et[47] = P),
          (et[48] = O))
        : (O = et[48]));
    let eI = `${er}-homepage`;
    (et[49] !== ei
      ? ((T = ei("web.bounties.dev_homepage_label")),
        (et[49] = ei),
        (et[50] = T))
      : (T = et[50]),
      et[51] !== eI || et[52] !== T
        ? ((U = (0, t.jsx)(c.f, { className: p, htmlFor: eI, children: T })),
          (et[51] = eI),
          (et[52] = T),
          (et[53] = U))
        : (U = et[53]));
    let ez = `${er}-homepage`;
    (et[54] === Symbol.for("react.memo_cache_sentinel")
      ? ((E = (e) => ec(e.target.value)), (et[54] = E))
      : (E = et[54]),
      et[55] !== ed || et[56] !== ez
        ? ((R = (0, t.jsx)(d.f, {
            className: h,
            id: ez,
            onChange: E,
            placeholder: "https://example.com",
            type: "url",
            value: ed,
          })),
          (et[55] = ed),
          (et[56] = ez),
          (et[57] = R))
        : (R = et[57]),
      et[58] !== U || et[59] !== R
        ? ((q = (0, t.jsxs)("div", { children: [U, R] })),
          (et[58] = U),
          (et[59] = R),
          (et[60] = q))
        : (q = et[60]));
    let eC = eg.isPending;
    (et[61] !== ei
      ? ((D = ei("web.bounties.dev_logo_help")), (et[61] = ei), (et[62] = D))
      : (D = et[62]),
      et[63] !== eg.isPending || et[64] !== ex || et[65] !== D
        ? ((K = (0, t.jsx)(u, {
            disabled: eC,
            helpText: D,
            onChange: em,
            value: ex,
          })),
          (et[63] = eg.isPending),
          (et[64] = ex),
          (et[65] = D),
          (et[66] = K))
        : (K = et[66]));
    let e$ = `${er}-origins`;
    (et[67] !== ei
      ? ((A = ei("web.bounties.dev_allowed_origins")),
        (et[67] = ei),
        (et[68] = A))
      : (A = et[68]),
      et[69] === Symbol.for("react.memo_cache_sentinel")
        ? ((F = (0, t.jsx)(f, {})), (et[69] = F))
        : (F = et[69]),
      et[70] !== e$ || et[71] !== A
        ? ((B = (0, t.jsxs)(c.f, {
            className: "text-xs font-medium text-text-secondary",
            htmlFor: e$,
            children: [A, F],
          })),
          (et[70] = e$),
          (et[71] = A),
          (et[72] = B))
        : (B = et[72]),
      et[73] !== ef.length
        ? ((G = (0, t.jsxs)("span", {
            className: "font-mono text-[11px] tabular-nums text-text-tertiary",
            children: [ef.length, "/", x.p],
          })),
          (et[73] = ef.length),
          (et[74] = G))
        : (G = et[74]),
      et[75] !== B || et[76] !== G
        ? ((L = (0, t.jsxs)("div", {
            className: "mb-2 flex items-baseline justify-between gap-2",
            children: [B, G],
          })),
          (et[75] = B),
          (et[76] = G),
          (et[77] = L))
        : (L = et[77]));
    let eP = `${er}-origins-help${ev ? ` ${er}-origins-error` : ""}`,
      eO = `${er}-origins`;
    (et[78] === Symbol.for("react.memo_cache_sentinel")
      ? ((J = () => eh(!0)),
        (H = (e) => eu(e.target.value)),
        (et[78] = J),
        (et[79] = H))
      : ((J = et[78]), (H = et[79])),
      et[80] !== eb || et[81] !== ev || et[82] !== eP || et[83] !== eO
        ? ((M = (0, t.jsx)("textarea", {
            "aria-describedby": eP,
            "aria-invalid": ev,
            className: `${g} min-h-[64px] font-mono text-xs`,
            id: eO,
            onBlur: J,
            onChange: H,
            placeholder: "https://app.example.com\nhttps://example.com",
            required: !0,
            value: eb,
          })),
          (et[80] = eb),
          (et[81] = ev),
          (et[82] = eP),
          (et[83] = eO),
          (et[84] = M))
        : (M = et[84]));
    let eT = `${er}-origins-help`;
    (et[85] !== ei
      ? ((Y = ei("web.bounties.dev_origins_help")), (et[85] = ei), (et[86] = Y))
      : (Y = et[86]),
      et[87] !== eT || et[88] !== Y
        ? ((Q = (0, t.jsx)("p", {
            className: "mt-1.5 text-xs leading-5 text-text-tertiary",
            id: eT,
            children: Y,
          })),
          (et[87] = eT),
          (et[88] = Y),
          (et[89] = Q))
        : (Q = et[89]),
      et[90] !== er || et[91] !== ev || et[92] !== ei
        ? ((V = ev
            ? (0, t.jsx)("p", {
                className: "mt-1.5 text-xs text-text-error",
                id: `${er}-origins-error`,
                role: "alert",
                children: ei("web.bounties.dev_origins_required"),
              })
            : null),
          (et[90] = er),
          (et[91] = ev),
          (et[92] = ei),
          (et[93] = V))
        : (V = et[93]),
      et[94] !== L || et[95] !== M || et[96] !== Q || et[97] !== V
        ? ((X = (0, t.jsxs)("div", { children: [L, M, Q, V] })),
          (et[94] = L),
          (et[95] = M),
          (et[96] = Q),
          (et[97] = V),
          (et[98] = X))
        : (X = et[98]));
    let eU = !ej;
    return (
      et[99] !== eg.isPending || et[100] !== ei
        ? ((Z = ei(
            eg.isPending
              ? "web.bounties.dev_submitting"
              : "web.bounties.dev_submit_review",
          )),
          (et[99] = eg.isPending),
          (et[100] = ei),
          (et[101] = Z))
        : (Z = et[101]),
      et[102] !== eU || et[103] !== Z
        ? ((W = (0, t.jsx)(r.K, {
            className: "w-full",
            isDisabled: eU,
            type: "submit",
            variant: "primary",
            children: Z,
          })),
          (et[102] = eU),
          (et[103] = Z),
          (et[104] = W))
        : (W = et[104]),
      et[105] !== e_ ||
      et[106] !== S ||
      et[107] !== O ||
      et[108] !== q ||
      et[109] !== K ||
      et[110] !== X ||
      et[111] !== W
        ? ((ee = (0, t.jsxs)("form", {
            className: "flex flex-col gap-4",
            onSubmit: e_,
            children: [S, O, q, K, X, W],
          })),
          (et[105] = e_),
          (et[106] = S),
          (et[107] = O),
          (et[108] = q),
          (et[109] = K),
          (et[110] = X),
          (et[111] = W),
          (et[112] = ee))
        : (ee = et[112]),
      ee
    );
  }
  var v = e.i(96224);
  let j = "text-[11px] font-medium uppercase tracking-wide text-text-tertiary";
  function _(e) {
    let r,
      n,
      o,
      d,
      c,
      x,
      m,
      u,
      p,
      h = (0, s.c)(26),
      { code: g, label: f } = e,
      { t: y } = (0, l.f)(),
      [v, j] = (0, a.useState)(!1);
    h[0] !== g || h[1] !== y
      ? ((r = async () => {
          try {
            (await navigator.clipboard.writeText(g),
              j(!0),
              window.setTimeout(() => j(!1), 2e3));
          } catch {
            b.c.error(y("web.bounties.dev_copy_error"));
          }
        }),
        (h[0] = g),
        (h[1] = y),
        (h[2] = r))
      : (r = h[2]);
    let _ = r;
    return (
      h[3] !== f
        ? ((n = (0, t.jsx)("span", {
            className:
              "text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
            children: f,
          })),
          (h[3] = f),
          (h[4] = n))
        : (n = h[4]),
      h[5] !== f || h[6] !== y
        ? ((o = y("web.bounties.dev_copy_label", { label: f })),
          (h[5] = f),
          (h[6] = y),
          (h[7] = o))
        : (o = h[7]),
      h[8] !== v
        ? ((d = v
            ? (0, t.jsx)(i.S7, { className: "size-3 text-positive" })
            : (0, t.jsx)(i.QO, { className: "size-3" })),
          (h[8] = v),
          (h[9] = d))
        : (d = h[9]),
      h[10] !== v || h[11] !== y
        ? ((c = v ? y("web.bounties.copied") : y("common.copy")),
          (h[10] = v),
          (h[11] = y),
          (h[12] = c))
        : (c = h[12]),
      h[13] !== _ || h[14] !== o || h[15] !== d || h[16] !== c
        ? ((x = (0, t.jsxs)("button", {
            "aria-label": o,
            className:
              "inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1 text-[11px] font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-white",
            onClick: _,
            type: "button",
            children: [d, c],
          })),
          (h[13] = _),
          (h[14] = o),
          (h[15] = d),
          (h[16] = c),
          (h[17] = x))
        : (x = h[17]),
      h[18] !== n || h[19] !== x
        ? ((m = (0, t.jsxs)("div", {
            className:
              "flex items-center justify-between gap-2 border-b border-border-secondary px-3 py-2",
            children: [n, x],
          })),
          (h[18] = n),
          (h[19] = x),
          (h[20] = m))
        : (m = h[20]),
      h[21] !== g
        ? ((u = (0, t.jsx)("pre", {
            className:
              "overflow-x-auto px-3 py-3 text-[12px] leading-5 text-text-primary",
            children: (0, t.jsx)("code", {
              className: "font-mono",
              children: g,
            }),
          })),
          (h[21] = g),
          (h[22] = u))
        : (u = h[22]),
      h[23] !== m || h[24] !== u
        ? ((p = (0, t.jsxs)("div", {
            className:
              "overflow-hidden rounded-xl border border-border-secondary bg-bg-primary",
            children: [m, u],
          })),
          (h[23] = m),
          (h[24] = u),
          (h[25] = p))
        : (p = h[25]),
      p
    );
  }
  function w(e) {
    let r,
      n,
      a,
      o,
      d,
      c,
      x,
      m,
      b,
      u,
      p,
      h,
      g,
      f,
      y,
      w,
      S,
      I,
      z,
      C,
      $,
      P,
      O,
      T,
      U,
      E,
      R,
      q,
      D,
      K,
      A,
      F,
      B,
      G,
      L,
      J,
      H,
      M,
      Y,
      Q,
      V,
      X,
      Z,
      W,
      ee,
      et,
      es,
      ei,
      er,
      en,
      ea,
      el,
      eo,
      ed,
      ec,
      ex,
      em,
      eb,
      eu,
      ep,
      eh,
      eg,
      ef,
      ey,
      ev,
      ej,
      e_,
      ew,
      eN,
      ek,
      eS,
      eI,
      ez,
      eC = (0, s.c)(169),
      { onBack: e$ } = e,
      { t: eP } = (0, l.f)(),
      { livestreamsUrl: eO } = (0, v.useApiClientsConfig)();
    (eC[0] !== eP
      ? ((r = eP("web.bounties.dev_step_apply_title")),
        (eC[0] = eP),
        (eC[1] = r))
      : (r = eC[1]),
      eC[2] !== eP
        ? ((n = eP("web.bounties.dev_step_apply_body")),
          (eC[2] = eP),
          (eC[3] = n))
        : (n = eC[3]),
      eC[4] !== r || eC[5] !== n
        ? ((a = { title: r, body: n }), (eC[4] = r), (eC[5] = n), (eC[6] = a))
        : (a = eC[6]),
      eC[7] !== eP
        ? ((o = eP("web.bounties.dev_step_authorized_title")),
          (eC[7] = eP),
          (eC[8] = o))
        : (o = eC[8]),
      eC[9] !== eP
        ? ((d = eP("web.bounties.dev_step_authorized_body")),
          (eC[9] = eP),
          (eC[10] = d))
        : (d = eC[10]),
      eC[11] !== o || eC[12] !== d
        ? ((c = { title: o, body: d }),
          (eC[11] = o),
          (eC[12] = d),
          (eC[13] = c))
        : (c = eC[13]),
      eC[14] !== eP
        ? ((x = eP("web.bounties.dev_step_verify_title")),
          (eC[14] = eP),
          (eC[15] = x))
        : (x = eC[15]),
      eC[16] !== eP
        ? ((m = eP("web.bounties.dev_step_verify_body")),
          (eC[16] = eP),
          (eC[17] = m))
        : (m = eC[17]),
      eC[18] !== x || eC[19] !== m
        ? ((b = { title: x, body: m }),
          (eC[18] = x),
          (eC[19] = m),
          (eC[20] = b))
        : (b = eC[20]),
      eC[21] !== a || eC[22] !== c || eC[23] !== b
        ? ((u = [a, c, b]),
          (eC[21] = a),
          (eC[22] = c),
          (eC[23] = b),
          (eC[24] = u))
        : (u = eC[24]));
    let eT = u;
    (eC[25] !== eP
      ? ((p = eP("web.bounties.dev_note_attestation")),
        (eC[25] = eP),
        (eC[26] = p))
      : (p = eC[26]),
      eC[27] !== eP
        ? ((h = eP("web.bounties.dev_note_idempotent")),
          (eC[27] = eP),
          (eC[28] = h))
        : (h = eC[28]),
      eC[29] !== eP
        ? ((g = eP("web.bounties.dev_note_key_limit")),
          (eC[29] = eP),
          (eC[30] = g))
        : (g = eC[30]),
      eC[31] !== eP
        ? ((f = eP("web.bounties.dev_note_rate_limit")),
          (eC[31] = eP),
          (eC[32] = f))
        : (f = eC[32]),
      eC[33] !== p || eC[34] !== h || eC[35] !== g || eC[36] !== f
        ? ((y = [p, h, g, f]),
          (eC[33] = p),
          (eC[34] = h),
          (eC[35] = g),
          (eC[36] = f),
          (eC[37] = y))
        : (y = eC[37]));
    let eU = y;
    if (eC[38] !== eO) {
      let e;
      (eC[40] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = /\/$/), (eC[40] = e))
        : (e = eC[40]),
        (w = eO.replace(e, "")),
        (eC[38] = eO),
        (eC[39] = w));
    } else w = eC[39];
    let eE = `${w}/bounties/integrations/v1`,
      eR = `curl -X POST ${eE}/verifications \\`;
    eC[41] !== eR
      ? ((S = [
          eR,
          '  -H "Authorization: Bearer $PUMP_FUN_API_KEY" \\',
          '  -H "Origin: https://app.example.com" \\',
          '  -H "Content-Type: application/json" \\',
          "  -d '{",
          '    "taskId": "b1a7c0de-0000-4000-8000-0000000000e9",',
          '    "subject": { "address": "<user_wallet_address>" },',
          '    "idempotencyKey": "your-event-id"',
          "  }'",
        ]),
        (eC[41] = eR),
        (eC[42] = S))
      : (S = eC[42]);
    let eq = S.join("\n");
    eC[43] === Symbol.for("react.memo_cache_sentinel")
      ? ((I = [
          "{",
          '  "taskId": "b1a7c0de-0000-4000-8000-0000000000e9",',
          '  "subjectAddress": "<user_wallet_address>",',
          '  "verifiedAt": "2026-06-26T00:00:00.000Z",',
          '  "alreadyVerified": false',
          "}",
        ]),
        (eC[43] = I))
      : (I = eC[43]);
    let eD = I.join("\n");
    return (
      eC[44] === Symbol.for("react.memo_cache_sentinel")
        ? ((z = (0, t.jsx)(i.S, { className: "size-3.5" })), (eC[44] = z))
        : (z = eC[44]),
      eC[45] !== eP
        ? ((C = eP("web.bounties.dev_back_to_portal")),
          (eC[45] = eP),
          (eC[46] = C))
        : (C = eC[46]),
      eC[47] !== e$ || eC[48] !== C
        ? (($ = (0, t.jsxs)("button", {
            className:
              "-ml-1 inline-flex w-fit items-center gap-1 rounded-full py-1 pl-1 pr-2.5 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-white",
            onClick: e$,
            type: "button",
            children: [z, C],
          })),
          (eC[47] = e$),
          (eC[48] = C),
          (eC[49] = $))
        : ($ = eC[49]),
      eC[50] === Symbol.for("react.memo_cache_sentinel")
        ? ((P = (0, t.jsx)("span", {
            className:
              "flex size-9 items-center justify-center rounded-xl bg-positive/15 text-positive",
            children: (0, t.jsx)(i.Ip, { className: "size-4" }),
          })),
          (eC[50] = P))
        : (P = eC[50]),
      eC[51] !== eP
        ? ((O = eP("web.bounties.dev_docs_title")), (eC[51] = eP), (eC[52] = O))
        : (O = eC[52]),
      eC[53] !== O
        ? ((T = (0, t.jsx)("h3", {
            className: "text-lg font-semibold text-white",
            children: O,
          })),
          (eC[53] = O),
          (eC[54] = T))
        : (T = eC[54]),
      eC[55] !== eP
        ? ((U = eP("web.bounties.dev_docs_sub")), (eC[55] = eP), (eC[56] = U))
        : (U = eC[56]),
      eC[57] !== U
        ? ((E = (0, t.jsx)("p", {
            className: "text-sm leading-6 text-text-secondary",
            children: U,
          })),
          (eC[57] = U),
          (eC[58] = E))
        : (E = eC[58]),
      eC[59] !== T || eC[60] !== E
        ? ((R = (0, t.jsxs)("section", {
            className: "flex flex-col gap-2",
            children: [P, T, E],
          })),
          (eC[59] = T),
          (eC[60] = E),
          (eC[61] = R))
        : (R = eC[61]),
      eC[62] !== eP
        ? ((q = eP("web.bounties.dev_how_it_works")),
          (eC[62] = eP),
          (eC[63] = q))
        : (q = eC[63]),
      eC[64] !== q
        ? ((D = (0, t.jsx)("h4", { className: j, children: q })),
          (eC[64] = q),
          (eC[65] = D))
        : (D = eC[65]),
      eC[66] !== eT
        ? ((K = (0, t.jsx)("ol", {
            className: "flex flex-col gap-3",
            children: eT.map(k),
          })),
          (eC[66] = eT),
          (eC[67] = K))
        : (K = eC[67]),
      eC[68] !== D || eC[69] !== K
        ? ((A = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [D, K],
          })),
          (eC[68] = D),
          (eC[69] = K),
          (eC[70] = A))
        : (A = eC[70]),
      eC[71] !== eP
        ? ((F = eP("web.bounties.dev_authenticate")),
          (eC[71] = eP),
          (eC[72] = F))
        : (F = eC[72]),
      eC[73] !== F
        ? ((B = (0, t.jsx)("h4", { className: j, children: F })),
          (eC[73] = F),
          (eC[74] = B))
        : (B = eC[74]),
      eC[75] === Symbol.for("react.memo_cache_sentinel")
        ? ((G = (0, t.jsx)(i.bi, {
            className: "mt-0.5 size-4 shrink-0 text-text-secondary",
          })),
          (eC[75] = G))
        : (G = eC[75]),
      eC[76] !== eP
        ? ((L = eP("web.bounties.dev_send_key_prefix")),
          (eC[76] = eP),
          (eC[77] = L))
        : (L = eC[77]),
      eC[78] === Symbol.for("react.memo_cache_sentinel")
        ? ((J = (0, t.jsx)("code", {
            className:
              "rounded bg-bg-primary px-1 py-0.5 font-mono text-[11px] text-white",
            children: "Authorization: Bearer <key>",
          })),
          (eC[78] = J))
        : (J = eC[78]),
      eC[79] !== eP
        ? ((H = eP("web.bounties.dev_generate_keys_infix")),
          (eC[79] = eP),
          (eC[80] = H))
        : (H = eC[80]),
      eC[81] !== eP
        ? ((M = eP("web.bounties.manage")), (eC[81] = eP), (eC[82] = M))
        : (M = eC[82]),
      eC[83] !== M
        ? ((Y = (0, t.jsx)("span", { className: "text-white", children: M })),
          (eC[83] = M),
          (eC[84] = Y))
        : (Y = eC[84]),
      eC[85] !== eP
        ? ((Q = eP("web.bounties.dev_generate_keys_suffix")),
          (eC[85] = eP),
          (eC[86] = Q))
        : (Q = eC[86]),
      eC[87] !== L || eC[88] !== H || eC[89] !== Y || eC[90] !== Q
        ? ((V = (0, t.jsxs)("div", {
            className: "flex items-start gap-2.5",
            children: [
              G,
              (0, t.jsxs)("p", {
                className: "text-xs leading-5 text-text-secondary",
                children: [L, " ", J, H, " ", Y, " ", Q],
              }),
            ],
          })),
          (eC[87] = L),
          (eC[88] = H),
          (eC[89] = Y),
          (eC[90] = Q),
          (eC[91] = V))
        : (V = eC[91]),
      eC[92] === Symbol.for("react.memo_cache_sentinel")
        ? ((X = (0, t.jsx)(i.dl, {
            className: "mt-0.5 size-4 shrink-0 text-text-secondary",
          })),
          (eC[92] = X))
        : (X = eC[92]),
      eC[93] !== eP
        ? ((Z = eP("web.bounties.dev_origin_prefix")),
          (eC[93] = eP),
          (eC[94] = Z))
        : (Z = eC[94]),
      eC[95] === Symbol.for("react.memo_cache_sentinel")
        ? ((W = (0, t.jsx)("code", {
            className:
              "rounded bg-bg-primary px-1 py-0.5 font-mono text-[11px] text-white",
            children: "Origin",
          })),
          (eC[95] = W))
        : (W = eC[95]),
      eC[96] !== eP
        ? ((ee = eP("web.bounties.dev_origin_suffix")),
          (eC[96] = eP),
          (eC[97] = ee))
        : (ee = eC[97]),
      eC[98] !== Z || eC[99] !== ee
        ? ((et = (0, t.jsxs)("div", {
            className: "flex items-start gap-2.5",
            children: [
              X,
              (0, t.jsxs)("p", {
                className: "text-xs leading-5 text-text-secondary",
                children: [Z, " ", W, " ", ee],
              }),
            ],
          })),
          (eC[98] = Z),
          (eC[99] = ee),
          (eC[100] = et))
        : (et = eC[100]),
      eC[101] !== V || eC[102] !== et
        ? ((es = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-2.5 rounded-xl border border-border-secondary bg-bg-tertiary p-3.5",
            children: [V, et],
          })),
          (eC[101] = V),
          (eC[102] = et),
          (eC[103] = es))
        : (es = eC[103]),
      eC[104] !== B || eC[105] !== es
        ? ((ei = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [B, es],
          })),
          (eC[104] = B),
          (eC[105] = es),
          (eC[106] = ei))
        : (ei = eC[106]),
      eC[107] !== eP
        ? ((er = eP("web.bounties.dev_endpoints")),
          (eC[107] = eP),
          (eC[108] = er))
        : (er = eC[108]),
      eC[109] !== er
        ? ((en = (0, t.jsx)("h4", { className: j, children: er })),
          (eC[109] = er),
          (eC[110] = en))
        : (en = eC[110]),
      eC[111] === Symbol.for("react.memo_cache_sentinel")
        ? ((ea = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, t.jsx)("span", {
                className:
                  "rounded bg-positive/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-positive",
                children: "POST",
              }),
              (0, t.jsx)("code", {
                className: "min-w-0 truncate font-mono text-xs text-white",
                children: "/verifications",
              }),
            ],
          })),
          (eC[111] = ea))
        : (ea = eC[111]),
      eC[112] !== eP
        ? ((el = eP("web.bounties.dev_post_verifications_desc")),
          (eC[112] = eP),
          (eC[113] = el))
        : (el = eC[113]),
      eC[114] !== el
        ? ((eo = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-1 rounded-xl border border-border-secondary bg-bg-tertiary p-3",
            children: [
              ea,
              (0, t.jsx)("p", {
                className: "text-xs leading-5 text-text-secondary",
                children: el,
              }),
            ],
          })),
          (eC[114] = el),
          (eC[115] = eo))
        : (eo = eC[115]),
      eC[116] === Symbol.for("react.memo_cache_sentinel")
        ? ((ed = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, t.jsx)("span", {
                className:
                  "rounded bg-bg-quaternary px-1.5 py-0.5 font-mono text-[10px] font-semibold text-text-secondary",
                children: "GET",
              }),
              (0, t.jsxs)("code", {
                className: "min-w-0 truncate font-mono text-xs text-white",
                children: ["/bounties/", "{taskId}"],
              }),
            ],
          })),
          (eC[116] = ed))
        : (ed = eC[116]),
      eC[117] !== eP
        ? ((ec = eP("web.bounties.dev_get_bounty_desc")),
          (eC[117] = eP),
          (eC[118] = ec))
        : (ec = eC[118]),
      eC[119] !== ec
        ? ((ex = (0, t.jsxs)("div", {
            className:
              "flex flex-col gap-1 rounded-xl border border-border-secondary bg-bg-tertiary p-3",
            children: [
              ed,
              (0, t.jsx)("p", {
                className: "text-xs leading-5 text-text-secondary",
                children: ec,
              }),
            ],
          })),
          (eC[119] = ec),
          (eC[120] = ex))
        : (ex = eC[120]),
      eC[121] !== eo || eC[122] !== ex
        ? ((em = (0, t.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [eo, ex],
          })),
          (eC[121] = eo),
          (eC[122] = ex),
          (eC[123] = em))
        : (em = eC[123]),
      eC[124] !== eP
        ? ((eb = eP("web.bounties.dev_base_url")),
          (eC[124] = eP),
          (eC[125] = eb))
        : (eb = eC[125]),
      eC[126] !== eE
        ? ((eu = (0, t.jsx)("code", {
            className: "break-all font-mono text-text-secondary",
            children: eE,
          })),
          (eC[126] = eE),
          (eC[127] = eu))
        : (eu = eC[127]),
      eC[128] !== eb || eC[129] !== eu
        ? ((ep = (0, t.jsxs)("p", {
            className: "text-[11px] leading-5 text-text-tertiary",
            children: [eb, " ", eu],
          })),
          (eC[128] = eb),
          (eC[129] = eu),
          (eC[130] = ep))
        : (ep = eC[130]),
      eC[131] !== en || eC[132] !== em || eC[133] !== ep
        ? ((eh = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [en, em, ep],
          })),
          (eC[131] = en),
          (eC[132] = em),
          (eC[133] = ep),
          (eC[134] = eh))
        : (eh = eC[134]),
      eC[135] !== eP
        ? ((eg = eP("web.bounties.dev_verify_completion")),
          (eC[135] = eP),
          (eC[136] = eg))
        : (eg = eC[136]),
      eC[137] !== eg
        ? ((ef = (0, t.jsx)("h4", { className: j, children: eg })),
          (eC[137] = eg),
          (eC[138] = ef))
        : (ef = eC[138]),
      eC[139] !== eP
        ? ((ey = eP("web.bounties.dev_request")),
          (eC[139] = eP),
          (eC[140] = ey))
        : (ey = eC[140]),
      eC[141] !== eq || eC[142] !== ey
        ? ((ev = (0, t.jsx)(_, { code: eq, label: ey })),
          (eC[141] = eq),
          (eC[142] = ey),
          (eC[143] = ev))
        : (ev = eC[143]),
      eC[144] !== eP
        ? ((ej = eP("web.bounties.dev_response")),
          (eC[144] = eP),
          (eC[145] = ej))
        : (ej = eC[145]),
      eC[146] !== ej
        ? ((e_ = (0, t.jsx)(_, { code: eD, label: ej })),
          (eC[146] = ej),
          (eC[147] = e_))
        : (e_ = eC[147]),
      eC[148] !== ef || eC[149] !== ev || eC[150] !== e_
        ? ((ew = (0, t.jsxs)("section", {
            className: "flex flex-col gap-3",
            children: [ef, ev, e_],
          })),
          (eC[148] = ef),
          (eC[149] = ev),
          (eC[150] = e_),
          (eC[151] = ew))
        : (ew = eC[151]),
      eC[152] !== eP
        ? ((eN = eP("web.bounties.dev_good_to_know")),
          (eC[152] = eP),
          (eC[153] = eN))
        : (eN = eC[153]),
      eC[154] !== eN
        ? ((ek = (0, t.jsx)("h4", { className: j, children: eN })),
          (eC[154] = eN),
          (eC[155] = ek))
        : (ek = eC[155]),
      eC[156] !== eU
        ? ((eS = (0, t.jsx)("ul", {
            className: "flex flex-col gap-2",
            children: eU.map(N),
          })),
          (eC[156] = eU),
          (eC[157] = eS))
        : (eS = eC[157]),
      eC[158] !== ek || eC[159] !== eS
        ? ((eI = (0, t.jsxs)("section", {
            className: "flex flex-col gap-2.5",
            children: [ek, eS],
          })),
          (eC[158] = ek),
          (eC[159] = eS),
          (eC[160] = eI))
        : (eI = eC[160]),
      eC[161] !== $ ||
      eC[162] !== R ||
      eC[163] !== A ||
      eC[164] !== ei ||
      eC[165] !== eh ||
      eC[166] !== ew ||
      eC[167] !== eI
        ? ((ez = (0, t.jsxs)("div", {
            className: "flex flex-col gap-6 p-5",
            children: [$, R, A, ei, eh, ew, eI],
          })),
          (eC[161] = $),
          (eC[162] = R),
          (eC[163] = A),
          (eC[164] = ei),
          (eC[165] = eh),
          (eC[166] = ew),
          (eC[167] = eI),
          (eC[168] = ez))
        : (ez = eC[168]),
      ez
    );
  }
  function N(e) {
    return (0, t.jsxs)(
      "li",
      {
        className: "flex gap-2.5 text-xs leading-5 text-text-secondary",
        children: [
          (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "mt-1.5 size-1 shrink-0 rounded-full bg-text-tertiary",
          }),
          (0, t.jsx)("span", { children: e }),
        ],
      },
      e,
    );
  }
  function k(e, s) {
    return (0, t.jsxs)(
      "li",
      {
        className: "flex gap-3",
        children: [
          (0, t.jsx)("span", {
            className:
              "flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-[11px] font-semibold tabular-nums text-white",
            children: s + 1,
          }),
          (0, t.jsxs)("div", {
            className: "min-w-0",
            children: [
              (0, t.jsx)("p", {
                className: "text-sm font-medium text-white",
                children: e.title,
              }),
              (0, t.jsx)("p", {
                className: "mt-0.5 text-xs leading-5 text-text-secondary",
                children: e.body,
              }),
            ],
          }),
        ],
      },
      e.title,
    );
  }
  function S(e) {
    let i,
      r,
      a,
      l,
      o,
      d = (0, s.c)(10),
      { integration: c } = e;
    if (d[0] !== c)
      ((a =
        "PENDING" === c.reviewStatus
          ? { label: "Pending", text: "text-amber-300", dot: "bg-amber-300" }
          : "REJECTED" === c.reviewStatus
            ? {
                label: "Rejected",
                text: "text-text-error",
                dot: "bg-text-error",
              }
            : c.isLive
              ? { label: "Live", text: "text-positive", dot: "bg-positive" }
              : {
                  label: "Suspended",
                  text: "text-text-tertiary",
                  dot: "bg-text-tertiary",
                }),
        (r = (0, n.c)(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-bg-tertiary py-0.5 pl-2 pr-2.5 text-[11px] font-medium uppercase tracking-wide",
          a.text,
        )),
        (i = (0, n.c)("size-1.5 rounded-full", a.dot)),
        (d[0] = c),
        (d[1] = i),
        (d[2] = r),
        (d[3] = a));
    else ((i = d[1]), (r = d[2]), (a = d[3]));
    return (
      d[4] !== i
        ? ((l = (0, t.jsx)("span", { className: i })), (d[4] = i), (d[5] = l))
        : (l = d[5]),
      d[6] !== r || d[7] !== l || d[8] !== a.label
        ? ((o = (0, t.jsxs)("span", { className: r, children: [l, a.label] })),
          (d[6] = r),
          (d[7] = l),
          (d[8] = a.label),
          (d[9] = o))
        : (o = d[9]),
      o
    );
  }
  function I(e) {
    let i,
      r,
      n = (0, s.c)(7),
      { integration: a } = e;
    if (a.imageUrl) {
      let e, s;
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = { height: 44, width: 44 }), (n[0] = e))
          : (e = n[0]),
        n[1] !== a.imageUrl
          ? ((s = (0, t.jsx)(m.default, {
              alt: "",
              className:
                "size-11 shrink-0 rounded-xl border border-border-secondary object-cover",
              height: 44,
              src: a.imageUrl,
              style: e,
              unoptimized: !0,
              width: 44,
            })),
            (n[1] = a.imageUrl),
            (n[2] = s))
          : (s = n[2]),
        s
      );
    }
    let l = a.name || a.issuerId;
    return (
      n[3] !== l
        ? ((i = l.charAt(0).toUpperCase()), (n[3] = l), (n[4] = i))
        : (i = n[4]),
      n[5] !== i
        ? ((r = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-secondary bg-bg-secondary text-sm font-semibold text-text-secondary",
            children: i,
          })),
          (n[5] = i),
          (n[6] = r))
        : (r = n[6]),
      r
    );
  }
  function z(e) {
    let r,
      n,
      o,
      d,
      c,
      x,
      m,
      u,
      p,
      h,
      g = (0, s.c)(25),
      { apiKey: f } = e,
      { t: y } = (0, l.f)(),
      [v, j] = (0, a.useState)(!1);
    g[0] !== f || g[1] !== y
      ? ((r = async () => {
          try {
            (await navigator.clipboard.writeText(f),
              j(!0),
              window.setTimeout(() => j(!1), 2e3));
          } catch {
            b.c.error(y("web.bounties.dev_copy_key_error"));
          }
        }),
        (g[0] = f),
        (g[1] = y),
        (g[2] = r))
      : (r = g[2]);
    let _ = r;
    if (
      (g[3] !== y
        ? ((n = y("web.bounties.dev_copy_key_now")), (g[3] = y), (g[4] = n))
        : (n = g[4]),
      g[5] !== n
        ? ((o = (0, t.jsx)("p", {
            className: "text-xs font-medium text-positive",
            children: n,
          })),
          (g[5] = n),
          (g[6] = o))
        : (o = g[6]),
      g[7] !== f)
    )
      ((d = `•••• ${f.slice(-4)}`), (g[7] = f), (g[8] = d));
    else d = g[8];
    return (
      g[9] !== d
        ? ((c = (0, t.jsx)("code", {
            "aria-hidden": !0,
            className:
              "min-w-0 flex-1 truncate rounded-[8px] bg-bg-primary px-2.5 py-2 font-mono text-xs text-text-secondary select-none",
            children: d,
          })),
          (g[9] = d),
          (g[10] = c))
        : (c = g[10]),
      g[11] !== y
        ? ((x = y("web.bounties.dev_copy_api_key")), (g[11] = y), (g[12] = x))
        : (x = g[12]),
      g[13] !== v
        ? ((m = v
            ? (0, t.jsx)(i.S7, { className: "size-4 text-positive" })
            : (0, t.jsx)(i.QO, { className: "size-4" })),
          (g[13] = v),
          (g[14] = m))
        : (m = g[14]),
      g[15] !== _ || g[16] !== x || g[17] !== m
        ? ((u = (0, t.jsx)("button", {
            "aria-label": x,
            className:
              "inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-bg-secondary text-text-secondary transition-colors hover:text-white",
            onClick: _,
            type: "button",
            children: m,
          })),
          (g[15] = _),
          (g[16] = x),
          (g[17] = m),
          (g[18] = u))
        : (u = g[18]),
      g[19] !== c || g[20] !== u
        ? ((p = (0, t.jsxs)("div", {
            className: "mt-2 flex items-center gap-2",
            children: [c, u],
          })),
          (g[19] = c),
          (g[20] = u),
          (g[21] = p))
        : (p = g[21]),
      g[22] !== o || g[23] !== p
        ? ((h = (0, t.jsxs)("div", {
            className:
              "rounded-xl border border-positive/30 bg-positive/[0.08] p-3",
            children: [o, p],
          })),
          (g[22] = o),
          (g[23] = p),
          (g[24] = h))
        : (h = g[24]),
      h
    );
  }
  let C = "text-[11px] font-medium uppercase tracking-wide text-text-tertiary";
  function $(e) {
    let d,
      c,
      m,
      b,
      p,
      h,
      g,
      f,
      y,
      v,
      j,
      _,
      w,
      N,
      k,
      $,
      O,
      T,
      U,
      E,
      R,
      q,
      D,
      K,
      A,
      F,
      B,
      G,
      L = (0, s.c)(94),
      { integration: J } = e,
      { t: H } = (0, l.f)(),
      M = (0, a.useId)();
    L[0] !== J.allowedOrigins
      ? ((d = () => J.allowedOrigins.join("\n")),
        (L[0] = J.allowedOrigins),
        (L[1] = d))
      : (d = L[1]);
    let [Y, Q] = (0, a.useState)(d),
      [V, X] = (0, a.useState)(!1),
      [Z, W] = (0, a.useState)(!1),
      [ee, et] = (0, a.useState)(null),
      es = (0, o.j)(),
      ei = (0, o.A)(),
      er = (0, o.M)();
    L[2] !== J.issuerId || L[3] !== Z
      ? ((c = { issuerId: J.issuerId, enabled: Z }),
        (L[2] = J.issuerId),
        (L[3] = Z),
        (L[4] = c))
      : (c = L[4]);
    let { data: en, isLoading: ea } = (0, o.v)(c),
      el = en?.length ?? 0,
      eo = el >= x.v;
    L[5] !== Y ? ((m = (0, x.C)(Y)), (L[5] = Y), (L[6] = m)) : (m = L[6]);
    let ed = m,
      ec = V && !ed;
    L[7] !== ed || L[8] !== J.issuerId || L[9] !== Y || L[10] !== es
      ? ((b = () => {
          (X(!0),
            ed &&
              es.mutate({
                issuerId: J.issuerId,
                body: { allowedOrigins: (0, x.G)(Y) },
              }));
        }),
        (L[7] = ed),
        (L[8] = J.issuerId),
        (L[9] = Y),
        (L[10] = es),
        (L[11] = b))
      : (b = L[11]);
    let ex = b;
    L[12] !== J.issuerId || L[13] !== es
      ? ((p = (e) => {
          e && es.mutate({ issuerId: J.issuerId, body: { imageUrl: e } });
        }),
        (L[12] = J.issuerId),
        (L[13] = es),
        (L[14] = p))
      : (p = L[14]);
    let em = p;
    L[15] !== ei || L[16] !== J.issuerId || L[17] !== eo || L[18] !== ea
      ? ((h = () => {
          ea ||
            eo ||
            ei.mutate(
              { issuerId: J.issuerId },
              { onSuccess: (e) => et(e.apiKey) },
            );
        }),
        (L[15] = ei),
        (L[16] = J.issuerId),
        (L[17] = eo),
        (L[18] = ea),
        (L[19] = h))
      : (h = L[19]);
    let eb = h;
    L[20] !== ei || L[21] !== J.issuerId
      ? ((g = (e) => {
          ei.mutate(
            { issuerId: J.issuerId, rotateKeyId: e },
            { onSuccess: (e) => et(e.apiKey) },
          );
        }),
        (L[20] = ei),
        (L[21] = J.issuerId),
        (L[22] = g))
      : (g = L[22]);
    let eu = g,
      ep = J.allowedOrigins.length;
    if (
      (L[23] !== J
        ? ((f = (0, t.jsx)(I, { integration: J })), (L[23] = J), (L[24] = f))
        : (f = L[24]),
      L[25] !== J.name
        ? ((y = (0, t.jsx)("h3", {
            className: "truncate text-sm font-semibold text-white",
            children: J.name,
          })),
          (L[25] = J.name),
          (L[26] = y))
        : (y = L[26]),
      L[27] !== J
        ? ((v = (0, t.jsx)(S, { integration: J })), (L[27] = J), (L[28] = v))
        : (v = L[28]),
      L[29] !== v || L[30] !== y
        ? ((j = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [y, v],
          })),
          (L[29] = v),
          (L[30] = y),
          (L[31] = j))
        : (j = L[31]),
      L[32] !== J.issuerId)
    ) {
      let e;
      ((_ =
        (e = J.issuerId).length > 14 ? `${e.slice(0, 6)}…${e.slice(-4)}` : e),
        (L[32] = J.issuerId),
        (L[33] = _));
    } else _ = L[33];
    (L[34] !== _
      ? ((w = (0, t.jsx)("span", {
          className: "font-mono text-[11px] tabular-nums",
          children: _,
        })),
        (L[34] = _),
        (L[35] = w))
      : (w = L[35]),
      L[36] === Symbol.for("react.memo_cache_sentinel")
        ? ((N = (0, t.jsx)("span", { "aria-hidden": !0, children: "·" })),
          (L[36] = N))
        : (N = L[36]),
      L[37] !== ep || L[38] !== H
        ? ((k = H("web.bounties.dev_origins_count", { count: ep })),
          (L[37] = ep),
          (L[38] = H),
          (L[39] = k))
        : (k = L[39]),
      L[40] !== k
        ? (($ = (0, t.jsx)("span", { className: "tabular-nums", children: k })),
          (L[40] = k),
          (L[41] = $))
        : ($ = L[41]),
      L[42] !== J.homepageUrl
        ? ((O = J.homepageUrl
            ? (0, t.jsxs)("a", {
                className:
                  "inline-flex min-w-0 items-center gap-0.5 text-text-secondary transition-colors hover:text-white",
                href: J.homepageUrl,
                rel: "noopener noreferrer",
                target: "_blank",
                children: [
                  (0, t.jsx)("span", {
                    className: "truncate",
                    children: J.homepageUrl.replace(/^https?:\/\//, ""),
                  }),
                  (0, t.jsx)(i.x8, { className: "size-3 shrink-0" }),
                ],
              })
            : null),
          (L[42] = J.homepageUrl),
          (L[43] = O))
        : (O = L[43]),
      L[44] !== w || L[45] !== $ || L[46] !== O
        ? ((T = (0, t.jsxs)("div", {
            className:
              "mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-text-tertiary",
            children: [w, N, $, O],
          })),
          (L[44] = w),
          (L[45] = $),
          (L[46] = O),
          (L[47] = T))
        : (T = L[47]),
      L[48] !== j || L[49] !== T
        ? ((U = (0, t.jsxs)("div", {
            className: "min-w-0 flex-1",
            children: [j, T],
          })),
          (L[48] = j),
          (L[49] = T),
          (L[50] = U))
        : (U = L[50]),
      L[51] === Symbol.for("react.memo_cache_sentinel")
        ? ((E = () => W(P)), (L[51] = E))
        : (E = L[51]),
      L[52] !== H
        ? ((R = H("web.bounties.manage")), (L[52] = H), (L[53] = R))
        : (R = L[53]));
    let eh = Z && "rotate-180";
    return (
      L[54] !== eh
        ? ((q = (0, n.c)("size-3.5 transition-transform duration-200", eh)),
          (L[54] = eh),
          (L[55] = q))
        : (q = L[55]),
      L[56] !== q
        ? ((D = (0, t.jsx)(i.J0, { "aria-hidden": !0, className: q })),
          (L[56] = q),
          (L[57] = D))
        : (D = L[57]),
      L[58] !== Z || L[59] !== R || L[60] !== D
        ? ((K = (0, t.jsxs)("button", {
            "aria-expanded": Z,
            className:
              "inline-flex shrink-0 items-center gap-1 rounded-full bg-bg-quaternary px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-quaternary hover:text-white",
            onClick: E,
            type: "button",
            children: [R, D],
          })),
          (L[58] = Z),
          (L[59] = R),
          (L[60] = D),
          (L[61] = K))
        : (K = L[61]),
      L[62] !== U || L[63] !== K || L[64] !== f
        ? ((A = (0, t.jsxs)("div", {
            className: "flex items-start gap-3 p-4",
            children: [f, U, K],
          })),
          (L[62] = U),
          (L[63] = K),
          (L[64] = f),
          (L[65] = A))
        : (A = L[65]),
      L[66] !== J.rejectionReason || L[67] !== J.reviewStatus
        ? ((F =
            "REJECTED" === J.reviewStatus && J.rejectionReason
              ? (0, t.jsx)("p", {
                  className:
                    "mx-4 mb-4 rounded-[10px] bg-text-error/10 px-3 py-2 text-xs leading-5 text-text-error",
                  children: J.rejectionReason,
                })
              : null),
          (L[66] = J.rejectionReason),
          (L[67] = J.reviewStatus),
          (L[68] = F))
        : (F = L[68]),
      L[69] !== el ||
      L[70] !== ei ||
      L[71] !== er ||
      L[72] !== M ||
      L[73] !== eb ||
      L[74] !== em ||
      L[75] !== eu ||
      L[76] !== ex ||
      L[77] !== ed ||
      L[78] !== J.imageUrl ||
      L[79] !== J.issuerId ||
      L[80] !== eo ||
      L[81] !== ea ||
      L[82] !== Z ||
      L[83] !== en ||
      L[84] !== Y ||
      L[85] !== ee ||
      L[86] !== ec ||
      L[87] !== H ||
      L[88] !== es
        ? ((B = Z
            ? (0, t.jsxs)("div", {
                className:
                  "flex flex-col gap-5 border-t border-border-tertiary bg-bg-secondary p-4",
                children: [
                  (0, t.jsx)(u, {
                    allowRemove: !1,
                    disabled: es.isPending,
                    onChange: em,
                    value: J.imageUrl,
                  }),
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsxs)("div", {
                        className:
                          "mb-2 flex items-baseline justify-between gap-2",
                        children: [
                          (0, t.jsx)("label", {
                            className: C,
                            htmlFor: `${M}-origins`,
                            children: H("web.bounties.dev_allowed_origins"),
                          }),
                          (0, t.jsx)("span", {
                            className:
                              "font-mono text-[11px] tabular-nums text-text-tertiary",
                            children: (0, x.G)(Y).length,
                          }),
                        ],
                      }),
                      (0, t.jsx)("textarea", {
                        "aria-describedby": `${M}-origins-help${ec ? ` ${M}-origins-error` : ""}`,
                        "aria-invalid": ec,
                        className:
                          "min-h-[64px] w-full rounded-xl border border-border-secondary bg-bg-secondary px-3 py-2.5 font-mono text-xs text-white outline-none transition-colors placeholder:text-text-tertiary focus:border-border-tertiary",
                        id: `${M}-origins`,
                        onBlur: () => X(!0),
                        onChange: (e) => Q(e.target.value),
                        placeholder: "https://app.example.com",
                        value: Y,
                      }),
                      (0, t.jsx)("p", {
                        className:
                          "mt-1.5 text-xs leading-5 text-text-tertiary",
                        id: `${M}-origins-help`,
                        children: H("web.bounties.dev_origins_help"),
                      }),
                      ec
                        ? (0, t.jsx)("p", {
                            className: "mt-1.5 text-xs text-text-error",
                            id: `${M}-origins-error`,
                            role: "alert",
                            children: H("web.bounties.dev_origins_required"),
                          })
                        : null,
                      (0, t.jsx)("div", {
                        className: "mt-2.5 flex justify-end",
                        children: (0, t.jsx)(r.K, {
                          isDisabled: es.isPending || !ed,
                          onClick: ex,
                          size: 32,
                          type: "button",
                          variant: "secondary",
                          children: es.isPending
                            ? H("web.bounties.saving")
                            : H("web.bounties.dev_save_origins"),
                        }),
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: "border-t border-border-secondary pt-4",
                    children: [
                      (0, t.jsxs)("div", {
                        className:
                          "mb-2.5 flex items-center justify-between gap-2",
                        children: [
                          (0, t.jsxs)("span", {
                            className: (0, n.c)(
                              "inline-flex items-center gap-1.5",
                              C,
                            ),
                            children: [
                              (0, t.jsx)(i.bi, { className: "size-3.5" }),
                              H("web.bounties.dev_api_keys"),
                            ],
                          }),
                          ea
                            ? null
                            : (0, t.jsxs)("span", {
                                className:
                                  "font-mono text-[11px] tabular-nums text-text-tertiary",
                                children: [el, "/", x.v],
                              }),
                        ],
                      }),
                      ee
                        ? (0, t.jsx)("div", {
                            className: "mb-2.5",
                            children: (0, t.jsx)(z, { apiKey: ee }),
                          })
                        : null,
                      ea
                        ? (0, t.jsx)("p", {
                            className: "text-xs text-text-tertiary",
                            children: H("web.bounties.dev_loading_keys"),
                          })
                        : en && en.length > 0
                          ? (0, t.jsx)("ul", {
                              className: "flex flex-col gap-1.5",
                              children: en.map((e) =>
                                (0, t.jsxs)(
                                  "li",
                                  {
                                    className:
                                      "flex items-center justify-between gap-2 rounded-[10px] bg-bg-secondary px-3 py-2",
                                    children: [
                                      (0, t.jsxs)("span", {
                                        className:
                                          "min-w-0 truncate font-mono text-xs tabular-nums text-text-secondary",
                                        children: ["•••• ", e.lastFour],
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "flex shrink-0 items-center gap-1",
                                        children: [
                                          (0, t.jsx)("button", {
                                            "aria-label": H(
                                              "web.bounties.dev_rotate_key",
                                            ),
                                            className:
                                              "inline-flex size-8 items-center justify-center rounded-[8px] text-text-tertiary transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-50",
                                            disabled:
                                              ei.isPending || er.isPending,
                                            onClick: () => eu(e.keyId),
                                            title: H(
                                              "web.bounties.dev_rotate_key",
                                            ),
                                            type: "button",
                                            children: (0, t.jsx)(i.Dh, {
                                              className: "size-3.5",
                                            }),
                                          }),
                                          (0, t.jsx)("button", {
                                            "aria-label": H(
                                              "web.bounties.dev_revoke_key",
                                            ),
                                            className:
                                              "inline-flex size-8 items-center justify-center rounded-[8px] text-text-tertiary transition-colors hover:bg-text-error/10 hover:text-text-error disabled:opacity-50",
                                            disabled: er.isPending,
                                            onClick: () =>
                                              er.mutate({
                                                issuerId: J.issuerId,
                                                keyId: e.keyId,
                                              }),
                                            title: H(
                                              "web.bounties.dev_revoke_key",
                                            ),
                                            type: "button",
                                            children: (0, t.jsx)(i.bO, {
                                              className: "size-3.5",
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e.keyId,
                                ),
                              ),
                            })
                          : (0, t.jsx)("p", {
                              className: "text-xs text-text-tertiary",
                              children: H("web.bounties.dev_no_keys"),
                            }),
                      eo
                        ? (0, t.jsx)("p", {
                            className:
                              "mt-2 text-xs leading-5 text-text-tertiary",
                            children: H("web.bounties.dev_key_limit", {
                              max: x.v,
                            }),
                          })
                        : null,
                      (0, t.jsx)("div", {
                        className: "mt-2.5 flex justify-end",
                        children: (0, t.jsx)(r.K, {
                          isDisabled: ei.isPending || ea || eo,
                          onClick: eb,
                          size: 32,
                          type: "button",
                          variant: "secondary",
                          children: ei.isPending
                            ? H("web.bounties.dev_generating")
                            : H("web.bounties.dev_generate_key"),
                        }),
                      }),
                    ],
                  }),
                ],
              })
            : null),
          (L[69] = el),
          (L[70] = ei),
          (L[71] = er),
          (L[72] = M),
          (L[73] = eb),
          (L[74] = em),
          (L[75] = eu),
          (L[76] = ex),
          (L[77] = ed),
          (L[78] = J.imageUrl),
          (L[79] = J.issuerId),
          (L[80] = eo),
          (L[81] = ea),
          (L[82] = Z),
          (L[83] = en),
          (L[84] = Y),
          (L[85] = ee),
          (L[86] = ec),
          (L[87] = H),
          (L[88] = es),
          (L[89] = B))
        : (B = L[89]),
      L[90] !== A || L[91] !== F || L[92] !== B
        ? ((G = (0, t.jsxs)("div", {
            className:
              "overflow-hidden rounded-[16px] border border-border-tertiary bg-bg-tertiary",
            children: [A, F, B],
          })),
          (L[90] = A),
          (L[91] = F),
          (L[92] = B),
          (L[93] = G))
        : (G = L[93]),
      G
    );
  }
  function P(e) {
    return !e;
  }
  function O(e) {
    return (0, t.jsx)($, { integration: e }, e.issuerId);
  }
  function T(e) {
    return (0, t.jsx)(
      "div",
      { className: "h-[76px] animate-pulse rounded-[16px] bg-bg-tertiary" },
      e,
    );
  }
  e.s(
    [
      "DeveloperPortalDialog",
      0,
      function (e) {
        let d,
          c,
          x,
          m,
          b,
          u,
          p,
          h,
          g,
          f,
          v,
          j,
          _,
          N,
          k,
          S = (0, s.c)(42),
          { open: I, onOpenChange: z } = e,
          { t: C } = (0, l.f)(),
          { data: $, isLoading: P, isError: U } = (0, o.e)(),
          [E, R] = (0, a.useState)(null),
          [q, D] = (0, a.useState)("portal"),
          K = (0, a.useRef)(null);
        (S[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = () => {
              K.current?.scrollTo({ top: 0 });
            }),
            (S[0] = d))
          : (d = S[0]),
          S[1] !== q ? ((c = [q]), (S[1] = q), (S[2] = c)) : (c = S[2]),
          (0, a.useEffect)(d, c));
        let A = ($?.length ?? 0) > 0,
          F = E ?? !A,
          B = "docs" === q;
        return (
          S[3] !== B || S[4] !== C
            ? ((x = C(
                B
                  ? "web.bounties.dev_guide_title"
                  : "web.bounties.dev_portal_title",
              )),
              (S[3] = B),
              (S[4] = C),
              (S[5] = x))
            : (x = S[5]),
          S[6] !== x
            ? ((m = (0, t.jsx)("h2", {
                className: "text-base font-semibold text-white",
                children: x,
              })),
              (S[6] = x),
              (S[7] = m))
            : (m = S[7]),
          S[8] !== B || S[9] !== C
            ? ((b = C(
                B
                  ? "web.bounties.dev_guide_subtitle"
                  : "web.bounties.dev_portal_subtitle",
              )),
              (S[8] = B),
              (S[9] = C),
              (S[10] = b))
            : (b = S[10]),
          S[11] !== b
            ? ((u = (0, t.jsx)("p", {
                className: "mt-1 text-xs leading-5 text-text-secondary",
                children: b,
              })),
              (S[11] = b),
              (S[12] = u))
            : (u = S[12]),
          S[13] !== m || S[14] !== u
            ? ((p = (0, t.jsxs)("div", {
                className: "min-w-0",
                children: [m, u],
              })),
              (S[13] = m),
              (S[14] = u),
              (S[15] = p))
            : (p = S[15]),
          S[16] !== C
            ? ((h = C("common.close")), (S[16] = C), (S[17] = h))
            : (h = S[17]),
          S[18] !== z
            ? ((g = () => z(!1)), (S[18] = z), (S[19] = g))
            : (g = S[19]),
          S[20] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = (0, t.jsx)(i.x6, { size: 14 })), (S[20] = f))
            : (f = S[20]),
          S[21] !== h || S[22] !== g
            ? ((v = (0, t.jsx)("button", {
                "aria-label": h,
                className:
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-white",
                onClick: g,
                type: "button",
                children: f,
              })),
              (S[21] = h),
              (S[22] = g),
              (S[23] = v))
            : (v = S[23]),
          S[24] !== v || S[25] !== p
            ? ((j = (0, t.jsxs)("div", {
                className:
                  "flex items-start justify-between gap-3 border-b border-border-secondary px-5 py-4",
                children: [p, v],
              })),
              (S[24] = v),
              (S[25] = p),
              (S[26] = j))
            : (j = S[26]),
          S[27] !== A ||
          S[28] !== $ ||
          S[29] !== F ||
          S[30] !== B ||
          S[31] !== U ||
          S[32] !== P ||
          S[33] !== C
            ? ((_ = (0, t.jsx)("div", {
                ref: K,
                className: "min-h-0 overflow-y-auto overscroll-contain",
                children: B
                  ? (0, t.jsx)(w, { onBack: () => D("portal") })
                  : (0, t.jsxs)("div", {
                      className: "flex flex-col gap-5 p-5",
                      children: [
                        (0, t.jsxs)("button", {
                          className:
                            "group flex items-center gap-3 rounded-[16px] border border-border-tertiary bg-bg-tertiary px-4 py-3.5 text-left transition-colors hover:border-border-tertiary hover:bg-bg-quaternary",
                          onClick: () => D("docs"),
                          type: "button",
                          children: [
                            (0, t.jsxs)("span", {
                              className: "min-w-0 flex-1",
                              children: [
                                (0, t.jsx)("span", {
                                  className:
                                    "block text-sm font-medium text-white",
                                  children: C("web.bounties.dev_read_guide"),
                                }),
                                (0, t.jsx)("span", {
                                  className:
                                    "mt-0.5 block text-xs leading-5 text-text-secondary",
                                  children: C(
                                    "web.bounties.dev_read_guide_sub",
                                  ),
                                }),
                              ],
                            }),
                            (0, t.jsx)(i.x8, {
                              className:
                                "size-4 shrink-0 text-text-tertiary transition-colors group-hover:text-white",
                            }),
                          ],
                        }),
                        (0, t.jsxs)("section", {
                          className: "flex flex-col gap-3",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "flex items-center justify-between gap-2",
                              children: [
                                (0, t.jsx)("h3", {
                                  className:
                                    "text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
                                  children: C(
                                    "web.bounties.dev_your_integrations",
                                  ),
                                }),
                                A
                                  ? (0, t.jsx)("span", {
                                      className:
                                        "inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-bg-tertiary px-2 py-0.5 text-[11px] font-medium tabular-nums text-text-secondary",
                                      children: $?.length,
                                    })
                                  : null,
                              ],
                            }),
                            P
                              ? (0, t.jsx)("div", {
                                  className: "flex flex-col gap-3",
                                  children: ["skeleton-a", "skeleton-b"].map(T),
                                })
                              : U
                                ? (0, t.jsx)("p", {
                                    className:
                                      "rounded-xl bg-text-error/10 px-3 py-2.5 text-xs text-text-error",
                                    children: C(
                                      "web.bounties.dev_integrations_error",
                                    ),
                                  })
                                : A
                                  ? (0, t.jsx)("div", {
                                      className: "flex flex-col gap-3",
                                      children: $?.map(O),
                                    })
                                  : (0, t.jsxs)("div", {
                                      className:
                                        "flex flex-col items-center gap-2 rounded-[16px] bg-bg-tertiary px-4 py-8 text-center",
                                      children: [
                                        (0, t.jsx)("span", {
                                          className:
                                            "flex size-10 items-center justify-center rounded-full bg-bg-quaternary text-text-tertiary",
                                          children: (0, t.jsx)(i.bi, {
                                            className: "size-5",
                                          }),
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-sm font-medium text-white",
                                          children: C(
                                            "web.bounties.dev_no_integrations",
                                          ),
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "max-w-[34ch] text-xs leading-5 text-text-secondary",
                                          children: C(
                                            "web.bounties.dev_no_integrations_sub",
                                          ),
                                        }),
                                      ],
                                    }),
                          ],
                        }),
                        P
                          ? null
                          : (0, t.jsxs)("section", {
                              className:
                                "overflow-hidden rounded-[16px] border border-border-tertiary bg-bg-tertiary",
                              children: [
                                (0, t.jsxs)("button", {
                                  "aria-expanded": F,
                                  className:
                                    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-bg-quaternary",
                                  onClick: () => R(!F),
                                  type: "button",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-quaternary text-text-secondary",
                                      children: (0, t.jsx)(i.YC, {
                                        className: (0, n.c)(
                                          "size-4 transition-transform duration-200",
                                          F && "rotate-45",
                                        ),
                                      }),
                                    }),
                                    (0, t.jsxs)("span", {
                                      className: "min-w-0 flex-1",
                                      children: [
                                        (0, t.jsx)("span", {
                                          className:
                                            "block text-sm font-medium text-white",
                                          children: C(
                                            "web.bounties.dev_apply_new",
                                          ),
                                        }),
                                        (0, t.jsx)("span", {
                                          className:
                                            "mt-0.5 block text-xs leading-5 text-text-secondary",
                                          children: C(
                                            "web.bounties.dev_apply_new_sub",
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                F
                                  ? (0, t.jsx)("div", {
                                      className:
                                        "border-t border-border-tertiary p-4",
                                      children: (0, t.jsx)(y, {
                                        onCreated: () => R(!1),
                                      }),
                                    })
                                  : null,
                              ],
                            }),
                      ],
                    }),
              })),
              (S[27] = A),
              (S[28] = $),
              (S[29] = F),
              (S[30] = B),
              (S[31] = U),
              (S[32] = P),
              (S[33] = C),
              (S[34] = _))
            : (_ = S[34]),
          S[35] !== j || S[36] !== _
            ? ((N = (0, t.jsxs)(r.s, {
                className:
                  "grid max-h-[min(92dvh,calc(100vh-48px))] w-full max-w-[min(560px,100%)] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden border-border-secondary bg-bg-primary p-0 text-white",
                children: [j, _],
              })),
              (S[35] = j),
              (S[36] = _),
              (S[37] = N))
            : (N = S[37]),
          S[38] !== z || S[39] !== I || S[40] !== N
            ? ((k = (0, t.jsx)(r.v, {
                isOpen: I,
                onIsOpenChange: z,
                children: N,
              })),
              (S[38] = z),
              (S[39] = I),
              (S[40] = N),
              (S[41] = k))
            : (k = S[41]),
          k
        );
      },
    ],
    729478,
  );
};
