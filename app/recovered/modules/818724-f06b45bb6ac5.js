// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018),
    r = e.i(928529),
    a = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    n = e.i(66732),
    s = e.i(637172),
    d = e.i(541710),
    c = e.i(338319);
  function u(e) {
    let l,
      a,
      o,
      n,
      d = (0, i.c)(11),
      { chain: u, sizeClassName: m, glyphClassName: p, className: f } = e;
    d[0] !== f || d[1] !== m
      ? ((l = (0, c.c)(
          "flex items-center justify-center overflow-hidden rounded-full bg-bg-primary",
          m,
          f,
        )),
        (d[0] = f),
        (d[1] = m),
        (d[2] = l))
      : (l = d[2]);
    let h = s.S[u];
    return (
      d[3] !== p
        ? ((a = (0, c.c)("object-contain", p)), (d[3] = p), (d[4] = a))
        : (a = d[4]),
      d[5] !== h || d[6] !== a
        ? ((o = (0, t.jsx)(r.default, {
            src: h,
            alt: "",
            width: 32,
            height: 32,
            className: a,
          })),
          (d[5] = h),
          (d[6] = a),
          (d[7] = o))
        : (o = d[7]),
      d[8] !== l || d[9] !== o
        ? ((n = (0, t.jsx)("span", { className: l, children: o })),
          (d[8] = l),
          (d[9] = o),
          (d[10] = n))
        : (n = d[10]),
      n
    );
  }
  function m(e) {
    let l,
      r,
      a = (0, i.c)(7),
      { options: o, discSize: n } = e,
      s = void 0 === n ? "size-5" : n;
    if (a[0] !== s || a[1] !== o) {
      let e;
      (a[3] !== s
        ? ((e = (e, i) =>
            (0, t.jsx)(
              u,
              {
                chain: e,
                sizeClassName: (0, c.c)(s, "border border-bg-primary"),
                glyphClassName: "size-full",
                className: i > 0 ? "-ml-2" : void 0,
              },
              e,
            )),
          (a[3] = s),
          (a[4] = e))
        : (e = a[4]),
        (l = o.map(e)),
        (a[0] = s),
        (a[1] = o),
        (a[2] = l));
    } else l = a[2];
    return (
      a[5] !== l
        ? ((r = (0, t.jsx)("span", {
            className: "flex items-center",
            children: l,
          })),
          (a[5] = l),
          (a[6] = r))
        : (r = a[6]),
      r
    );
  }
  function p(e) {
    let l,
      r,
      a,
      o,
      n,
      s = (0, i.c)(17),
      { label: d, chain: p, options: f, isSelected: h, onSelect: I } = e,
      x = `feed-chain-option-${p ?? "all"}`,
      y = h
        ? "border-positive"
        : "border-border-tertiary hover:border-border-secondary";
    return (
      s[0] !== y
        ? ((l = (0, c.c)(
            "flex w-full items-center gap-3 rounded-xl border bg-bg-tertiary p-3 text-left transition-colors",
            y,
          )),
          (s[0] = y),
          (s[1] = l))
        : (l = s[1]),
      s[2] !== p || s[3] !== f
        ? ((r = (0, t.jsx)("span", {
            className: "flex min-w-8 items-center justify-center",
            children: p
              ? (0, t.jsx)(u, {
                  chain: p,
                  sizeClassName: "size-8",
                  glyphClassName: "size-[30px]",
                })
              : (0, t.jsx)(m, { options: f }),
          })),
          (s[2] = p),
          (s[3] = f),
          (s[4] = r))
        : (r = s[4]),
      s[5] !== d
        ? ((a = (0, t.jsx)("span", {
            className: "flex-1 text-sm font-semibold text-text-primary",
            children: d,
          })),
          (s[5] = d),
          (s[6] = a))
        : (a = s[6]),
      s[7] !== h
        ? ((o = h
            ? (0, t.jsx)("span", {
                className: "size-2 shrink-0 rounded-full bg-positive",
              })
            : null),
          (s[7] = h),
          (s[8] = o))
        : (o = s[8]),
      s[9] !== h ||
      s[10] !== I ||
      s[11] !== x ||
      s[12] !== l ||
      s[13] !== r ||
      s[14] !== a ||
      s[15] !== o
        ? ((n = (0, t.jsxs)("button", {
            type: "button",
            role: "radio",
            "aria-checked": h,
            onClick: I,
            "data-testid": x,
            className: l,
            children: [r, a, o],
          })),
          (s[9] = h),
          (s[10] = I),
          (s[11] = x),
          (s[12] = l),
          (s[13] = r),
          (s[14] = a),
          (s[15] = o),
          (s[16] = n))
        : (n = s[16]),
      n
    );
  }
  e.s([
    "h",
    0,
    u,
    "A",
    0,
    function (e) {
      let r,
        f,
        h,
        I,
        x,
        y,
        b,
        g,
        v,
        C,
        w,
        k,
        M,
        N,
        j,
        _,
        U,
        S,
        A = (0, i.c)(53),
        { value: E, onChange: P, className: z, ariaLabel: T } = e,
        R = e.options,
        D = (0, d.l)();
      A[0] !== e.options || A[1] !== D
        ? ((r = (0, s.W)(R, D)), (A[0] = e.options), (A[1] = D), (A[2] = r))
        : (r = A[2]);
      let $ = r,
        { t: q } = (0, o.f)(),
        [B, F] = (0, a.useState)(!1);
      A[3] !== P || A[4] !== E
        ? ((f = (e) => {
            (e !== E && P(e), F(!1));
          }),
          (A[3] = P),
          (A[4] = E),
          (A[5] = f))
        : (f = A[5]);
      let O = f;
      (A[6] !== T || A[7] !== q
        ? ((h = T ?? q("web.feed.filter_by_chain")),
          (A[6] = T),
          (A[7] = q),
          (A[8] = h))
        : (h = A[8]),
        A[9] !== z
          ? ((I = (0, c.c)(
              "flex items-center gap-1 rounded-full py-1 transition-opacity hover:opacity-80",
              z,
            )),
            (A[9] = z),
            (A[10] = I))
          : (I = A[10]),
        A[11] !== $ || A[12] !== E
          ? ((x =
              "all" === E
                ? (0, t.jsx)(m, { options: $, discSize: "size-[18px]" })
                : (0, t.jsxs)("span", {
                    className: "flex items-center gap-1.5",
                    children: [
                      (0, t.jsx)(u, {
                        chain: E,
                        sizeClassName: "size-[18px]",
                        glyphClassName: "size-4",
                      }),
                      (0, t.jsx)("span", {
                        className: "text-xs font-semibold text-text-secondary",
                        children: s.z[E],
                      }),
                    ],
                  })),
            (A[11] = $),
            (A[12] = E),
            (A[13] = x))
          : (x = A[13]));
      let H = B && "rotate-180";
      (A[14] !== H
        ? ((y = (0, c.c)(
            "size-4 shrink-0 text-text-tertiary transition-transform",
            H,
          )),
          (A[14] = H),
          (A[15] = y))
        : (y = A[15]),
        A[16] !== y
          ? ((b = (0, t.jsx)(l.vY, { "aria-hidden": !0, className: y })),
            (A[16] = y),
            (A[17] = b))
          : (b = A[17]),
        A[18] !== h || A[19] !== I || A[20] !== x || A[21] !== b
          ? ((g = (0, t.jsx)(n.J, {
              asChild: !0,
              children: (0, t.jsxs)("button", {
                type: "button",
                "aria-label": h,
                "data-testid": "feed-chain-filter",
                className: I,
                children: [x, b],
              }),
            })),
            (A[18] = h),
            (A[19] = I),
            (A[20] = x),
            (A[21] = b),
            (A[22] = g))
          : (g = A[22]),
        A[23] !== q
          ? ((v = q("web.feed.filter_by_chain_title")),
            (A[23] = q),
            (A[24] = v))
          : (v = A[24]),
        A[25] !== v
          ? ((C = (0, t.jsx)("p", {
              className:
                "shrink-0 pb-3 text-center text-sm font-semibold text-text-primary",
              children: v,
            })),
            (A[25] = v),
            (A[26] = C))
          : (C = A[26]),
        A[27] !== q
          ? ((w = q("web.feed.feed_chain")), (A[27] = q), (A[28] = w))
          : (w = A[28]),
        A[29] !== q
          ? ((k = q("common.all")), (A[29] = q), (A[30] = k))
          : (k = A[30]));
      let L = "all" === E;
      return (
        A[31] !== O
          ? ((M = () => O("all")), (A[31] = O), (A[32] = M))
          : (M = A[32]),
        A[33] !== $ || A[34] !== k || A[35] !== L || A[36] !== M
          ? ((N = (0, t.jsx)(p, {
              label: k,
              options: $,
              isSelected: L,
              onSelect: M,
            })),
            (A[33] = $),
            (A[34] = k),
            (A[35] = L),
            (A[36] = M),
            (A[37] = N))
          : (N = A[37]),
        A[38] !== O || A[39] !== $ || A[40] !== E
          ? ((j = $.map((e) =>
              (0, t.jsx)(
                p,
                {
                  label: s.z[e],
                  chain: e,
                  options: $,
                  isSelected: E === e,
                  onSelect: () => O(e),
                },
                e,
              ),
            )),
            (A[38] = O),
            (A[39] = $),
            (A[40] = E),
            (A[41] = j))
          : (j = A[41]),
        A[42] !== w || A[43] !== N || A[44] !== j
          ? ((_ = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": w,
              "data-testid": "feed-chain-options",
              className: "-m-1 flex min-h-0 flex-col gap-2 overflow-y-auto p-1",
              children: [N, j],
            })),
            (A[42] = w),
            (A[43] = N),
            (A[44] = j),
            (A[45] = _))
          : (_ = A[45]),
        A[46] !== C || A[47] !== _
          ? ((U = (0, t.jsxs)(n.T, {
              align: "end",
              collisionPadding: 16,
              className:
                "flex max-h-[var(--radix-popover-content-available-height)] w-64 flex-col rounded-xl p-3",
              children: [C, _],
            })),
            (A[46] = C),
            (A[47] = _),
            (A[48] = U))
          : (U = A[48]),
        A[49] !== B || A[50] !== g || A[51] !== U
          ? ((S = (0, t.jsxs)(n.V, {
              open: B,
              onOpenChange: F,
              children: [g, U],
            })),
            (A[49] = B),
            (A[50] = g),
            (A[51] = U),
            (A[52] = S))
          : (S = A[52]),
        S
      );
    },
  ]);
};
