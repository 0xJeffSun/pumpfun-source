// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(928529),
    n = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    s = e.i(66732),
    o = e.i(637172),
    c = e.i(541710),
    d = e.i(338319);
  function m(e) {
    let a,
      n,
      l,
      s,
      c = (0, r.c)(11),
      { chain: m, sizeClassName: u, glyphClassName: f, className: h } = e;
    c[0] !== h || c[1] !== u
      ? ((a = (0, d.c)(
          "flex items-center justify-center overflow-hidden rounded-full bg-bg-primary",
          u,
          h,
        )),
        (c[0] = h),
        (c[1] = u),
        (c[2] = a))
      : (a = c[2]);
    let p = o.S[m];
    return (
      c[3] !== f
        ? ((n = (0, d.c)("object-contain", f)), (c[3] = f), (c[4] = n))
        : (n = c[4]),
      c[5] !== p || c[6] !== n
        ? ((l = (0, t.jsx)(i.default, {
            src: p,
            alt: "",
            width: 32,
            height: 32,
            className: n,
          })),
          (c[5] = p),
          (c[6] = n),
          (c[7] = l))
        : (l = c[7]),
      c[8] !== a || c[9] !== l
        ? ((s = (0, t.jsx)("span", { className: a, children: l })),
          (c[8] = a),
          (c[9] = l),
          (c[10] = s))
        : (s = c[10]),
      s
    );
  }
  function u(e) {
    let a,
      i,
      n = (0, r.c)(7),
      { options: l, discSize: s } = e,
      o = void 0 === s ? "size-5" : s;
    if (n[0] !== o || n[1] !== l) {
      let e;
      (n[3] !== o
        ? ((e = (e, r) =>
            (0, t.jsx)(
              m,
              {
                chain: e,
                sizeClassName: (0, d.c)(o, "border border-bg-primary"),
                glyphClassName: "size-full",
                className: r > 0 ? "-ml-2" : void 0,
              },
              e,
            )),
          (n[3] = o),
          (n[4] = e))
        : (e = n[4]),
        (a = l.map(e)),
        (n[0] = o),
        (n[1] = l),
        (n[2] = a));
    } else a = n[2];
    return (
      n[5] !== a
        ? ((i = (0, t.jsx)("span", {
            className: "flex items-center",
            children: a,
          })),
          (n[5] = a),
          (n[6] = i))
        : (i = n[6]),
      i
    );
  }
  function f(e) {
    let a,
      i,
      n,
      l,
      s,
      o = (0, r.c)(17),
      { label: c, chain: f, options: h, isSelected: p, onSelect: x } = e,
      g = `feed-chain-option-${f ?? "all"}`,
      b = p
        ? "border-positive"
        : "border-border-tertiary hover:border-border-secondary";
    return (
      o[0] !== b
        ? ((a = (0, d.c)(
            "flex w-full items-center gap-3 rounded-xl border bg-bg-tertiary p-3 text-left transition-colors",
            b,
          )),
          (o[0] = b),
          (o[1] = a))
        : (a = o[1]),
      o[2] !== f || o[3] !== h
        ? ((i = (0, t.jsx)("span", {
            className: "flex min-w-8 items-center justify-center",
            children: f
              ? (0, t.jsx)(m, {
                  chain: f,
                  sizeClassName: "size-8",
                  glyphClassName: "size-[30px]",
                })
              : (0, t.jsx)(u, { options: h }),
          })),
          (o[2] = f),
          (o[3] = h),
          (o[4] = i))
        : (i = o[4]),
      o[5] !== c
        ? ((n = (0, t.jsx)("span", {
            className: "flex-1 text-sm font-semibold text-text-primary",
            children: c,
          })),
          (o[5] = c),
          (o[6] = n))
        : (n = o[6]),
      o[7] !== p
        ? ((l = p
            ? (0, t.jsx)("span", {
                className: "size-2 shrink-0 rounded-full bg-positive",
              })
            : null),
          (o[7] = p),
          (o[8] = l))
        : (l = o[8]),
      o[9] !== p ||
      o[10] !== x ||
      o[11] !== g ||
      o[12] !== a ||
      o[13] !== i ||
      o[14] !== n ||
      o[15] !== l
        ? ((s = (0, t.jsxs)("button", {
            type: "button",
            role: "radio",
            "aria-checked": p,
            onClick: x,
            "data-testid": g,
            className: a,
            children: [i, n, l],
          })),
          (o[9] = p),
          (o[10] = x),
          (o[11] = g),
          (o[12] = a),
          (o[13] = i),
          (o[14] = n),
          (o[15] = l),
          (o[16] = s))
        : (s = o[16]),
      s
    );
  }
  e.s([
    "h",
    0,
    m,
    "A",
    0,
    function (e) {
      let i,
        h,
        p,
        x,
        g,
        b,
        v,
        y,
        j,
        w,
        N,
        _,
        k,
        S,
        C,
        M,
        E,
        A,
        R = (0, r.c)(53),
        { value: D, onChange: z, className: T, ariaLabel: P } = e,
        B = e.options,
        I = (0, c.l)();
      R[0] !== e.options || R[1] !== I
        ? ((i = (0, o.W)(B, I)), (R[0] = e.options), (R[1] = I), (R[2] = i))
        : (i = R[2]);
      let F = i,
        { t: L } = (0, l.f)(),
        [H, K] = (0, n.useState)(!1);
      R[3] !== z || R[4] !== D
        ? ((h = (e) => {
            (e !== D && z(e), K(!1));
          }),
          (R[3] = z),
          (R[4] = D),
          (R[5] = h))
        : (h = R[5]);
      let q = h;
      (R[6] !== P || R[7] !== L
        ? ((p = P ?? L("web.feed.filter_by_chain")),
          (R[6] = P),
          (R[7] = L),
          (R[8] = p))
        : (p = R[8]),
        R[9] !== T
          ? ((x = (0, d.c)(
              "flex items-center gap-1 rounded-full py-1 transition-opacity hover:opacity-80",
              T,
            )),
            (R[9] = T),
            (R[10] = x))
          : (x = R[10]),
        R[11] !== F || R[12] !== D
          ? ((g =
              "all" === D
                ? (0, t.jsx)(u, { options: F, discSize: "size-[18px]" })
                : (0, t.jsxs)("span", {
                    className: "flex items-center gap-1.5",
                    children: [
                      (0, t.jsx)(m, {
                        chain: D,
                        sizeClassName: "size-[18px]",
                        glyphClassName: "size-4",
                      }),
                      (0, t.jsx)("span", {
                        className: "text-xs font-semibold text-text-secondary",
                        children: o.z[D],
                      }),
                    ],
                  })),
            (R[11] = F),
            (R[12] = D),
            (R[13] = g))
          : (g = R[13]));
      let U = H && "rotate-180";
      (R[14] !== U
        ? ((b = (0, d.c)(
            "size-4 shrink-0 text-text-tertiary transition-transform",
            U,
          )),
          (R[14] = U),
          (R[15] = b))
        : (b = R[15]),
        R[16] !== b
          ? ((v = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: b })),
            (R[16] = b),
            (R[17] = v))
          : (v = R[17]),
        R[18] !== p || R[19] !== x || R[20] !== g || R[21] !== v
          ? ((y = (0, t.jsx)(s.J, {
              asChild: !0,
              children: (0, t.jsxs)("button", {
                type: "button",
                "aria-label": p,
                "data-testid": "feed-chain-filter",
                className: x,
                children: [g, v],
              }),
            })),
            (R[18] = p),
            (R[19] = x),
            (R[20] = g),
            (R[21] = v),
            (R[22] = y))
          : (y = R[22]),
        R[23] !== L
          ? ((j = L("web.feed.filter_by_chain_title")),
            (R[23] = L),
            (R[24] = j))
          : (j = R[24]),
        R[25] !== j
          ? ((w = (0, t.jsx)("p", {
              className:
                "shrink-0 pb-3 text-center text-sm font-semibold text-text-primary",
              children: j,
            })),
            (R[25] = j),
            (R[26] = w))
          : (w = R[26]),
        R[27] !== L
          ? ((N = L("web.feed.feed_chain")), (R[27] = L), (R[28] = N))
          : (N = R[28]),
        R[29] !== L
          ? ((_ = L("common.all")), (R[29] = L), (R[30] = _))
          : (_ = R[30]));
      let W = "all" === D;
      return (
        R[31] !== q
          ? ((k = () => q("all")), (R[31] = q), (R[32] = k))
          : (k = R[32]),
        R[33] !== F || R[34] !== _ || R[35] !== W || R[36] !== k
          ? ((S = (0, t.jsx)(f, {
              label: _,
              options: F,
              isSelected: W,
              onSelect: k,
            })),
            (R[33] = F),
            (R[34] = _),
            (R[35] = W),
            (R[36] = k),
            (R[37] = S))
          : (S = R[37]),
        R[38] !== q || R[39] !== F || R[40] !== D
          ? ((C = F.map((e) =>
              (0, t.jsx)(
                f,
                {
                  label: o.z[e],
                  chain: e,
                  options: F,
                  isSelected: D === e,
                  onSelect: () => q(e),
                },
                e,
              ),
            )),
            (R[38] = q),
            (R[39] = F),
            (R[40] = D),
            (R[41] = C))
          : (C = R[41]),
        R[42] !== N || R[43] !== S || R[44] !== C
          ? ((M = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": N,
              "data-testid": "feed-chain-options",
              className: "-m-1 flex min-h-0 flex-col gap-2 overflow-y-auto p-1",
              children: [S, C],
            })),
            (R[42] = N),
            (R[43] = S),
            (R[44] = C),
            (R[45] = M))
          : (M = R[45]),
        R[46] !== w || R[47] !== M
          ? ((E = (0, t.jsxs)(s.T, {
              align: "end",
              collisionPadding: 16,
              className:
                "flex max-h-[var(--radix-popover-content-available-height)] w-64 flex-col rounded-xl p-3",
              children: [w, M],
            })),
            (R[46] = w),
            (R[47] = M),
            (R[48] = E))
          : (E = R[48]),
        R[49] !== H || R[50] !== y || R[51] !== E
          ? ((A = (0, t.jsxs)(s.V, {
              open: H,
              onOpenChange: K,
              children: [y, E],
            })),
            (R[49] = H),
            (R[50] = y),
            (R[51] = E),
            (R[52] = A))
          : (A = R[52]),
        A
      );
    },
  ]);
};
