// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    n = e.i(426091),
    s = e.i(352386),
    a = e.i(439587);
  e.i(12692);
  var o = e.i(398902);
  function l(e) {
    let r,
      n,
      s,
      l,
      d,
      u,
      m,
      p,
      f,
      x,
      b,
      h,
      y,
      g,
      v = (0, i.c)(48),
      {
        open: w,
        onOpenChange: k,
        draftTitle: j,
        isDeleting: _,
        isRecovering: N,
        onConfirm: I,
        isFundedOnChain: C,
        onConfirmForce: S,
        onFinishPublishing: A,
      } = e,
      F = void 0 !== C && C,
      { t: U } = (0, o.f)(),
      T = _ || N;
    (v[0] !== T || v[1] !== k
      ? ((r = (e) => {
          T || k(e);
        }),
        (v[0] = T),
        (v[1] = k),
        (v[2] = r))
      : (r = v[2]),
      v[3] !== F || v[4] !== U
        ? ((n = U(
            F
              ? "web.bounties.rewards_already_funded"
              : "web.bounties.delete_draft_confirm_title",
          )),
          (v[3] = F),
          (v[4] = U),
          (v[5] = n))
        : (n = v[5]),
      v[6] !== n
        ? ((s = (0, t.jsx)("p", {
            className: "text-lg font-semibold text-white",
            children: n,
          })),
          (v[6] = n),
          (v[7] = s))
        : (s = v[7]),
      v[8] !== j || v[9] !== F || v[10] !== U
        ? ((l = (0, t.jsx)("p", {
            className: "text-sm text-text-secondary",
            children: F
              ? (0, t.jsx)(t.Fragment, {
                  children: U("web.bounties.delete_funded_body"),
                })
              : j
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      "“",
                      (0, t.jsx)("span", {
                        className: "text-white",
                        children: j,
                      }),
                      "” ",
                      U("web.bounties.delete_draft_titled_body"),
                    ],
                  })
                : (0, t.jsx)(t.Fragment, {
                    children: U("web.bounties.delete_draft_body"),
                  }),
          })),
          (v[8] = j),
          (v[9] = F),
          (v[10] = U),
          (v[11] = l))
        : (l = v[11]),
      v[12] !== s || v[13] !== l
        ? ((d = (0, t.jsxs)("header", {
            className: "flex flex-col gap-1.5",
            children: [s, l],
          })),
          (v[12] = s),
          (v[13] = l),
          (v[14] = d))
        : (d = v[14]),
      v[15] !== k ? ((u = () => k(!1)), (v[15] = k), (v[16] = u)) : (u = v[16]),
      v[17] !== U
        ? ((m = U("common.cancel")), (v[17] = U), (v[18] = m))
        : (m = v[18]),
      v[19] !== T || v[20] !== u || v[21] !== m
        ? ((p = (0, t.jsx)(a.K, {
            isDisabled: T,
            onClick: u,
            variant: "secondary",
            children: m,
          })),
          (v[19] = T),
          (v[20] = u),
          (v[21] = m),
          (v[22] = p))
        : (p = v[22]),
      v[23] !== T || v[24] !== F || v[25] !== N || v[26] !== A || v[27] !== U
        ? ((f =
            F && A
              ? (0, t.jsx)(a.K, {
                  isDisabled: T,
                  onClick: A,
                  variant: "primary",
                  children: U(
                    N
                      ? "web.bounties.finishing_progress"
                      : "web.bounties.finish_publishing",
                  ),
                })
              : null),
          (v[23] = T),
          (v[24] = F),
          (v[25] = N),
          (v[26] = A),
          (v[27] = U),
          (v[28] = f))
        : (f = v[28]));
    let E = F && S ? S : I;
    return (
      v[29] !== _ || v[30] !== F || v[31] !== U
        ? ((x = U(
            _
              ? "web.bounties.deleting_progress"
              : F
                ? "web.bounties.delete_anyway"
                : "web.bounties.delete_draft",
          )),
          (v[29] = _),
          (v[30] = F),
          (v[31] = U),
          (v[32] = x))
        : (x = v[32]),
      v[33] !== T || v[34] !== E || v[35] !== x
        ? ((b = (0, t.jsx)(a.K, {
            className: "bg-[#F87171] text-bg-primary hover:bg-[#EF4444]",
            isDisabled: T,
            onClick: E,
            variant: "primary",
            children: x,
          })),
          (v[33] = T),
          (v[34] = E),
          (v[35] = x),
          (v[36] = b))
        : (b = v[36]),
      v[37] !== f || v[38] !== b || v[39] !== p
        ? ((h = (0, t.jsxs)("footer", {
            className: "flex items-center justify-end gap-2 pt-1",
            children: [p, f, b],
          })),
          (v[37] = f),
          (v[38] = b),
          (v[39] = p),
          (v[40] = h))
        : (h = v[40]),
      v[41] !== h || v[42] !== d
        ? ((y = (0, t.jsx)(a.s, {
            className: "max-w-[440px]",
            children: (0, t.jsxs)("div", {
              className: "flex flex-col gap-4 p-1",
              children: [d, h],
            }),
          })),
          (v[41] = h),
          (v[42] = d),
          (v[43] = y))
        : (y = v[43]),
      v[44] !== w || v[45] !== y || v[46] !== r
        ? ((g = (0, t.jsx)("div", {
            onClick: c,
            onMouseDown: c,
            onPointerDown: c,
            children: (0, t.jsx)(a.v, {
              isOpen: w,
              onIsOpenChange: r,
              children: y,
            }),
          })),
          (v[44] = w),
          (v[45] = y),
          (v[46] = r),
          (v[47] = g))
        : (g = v[47]),
      g
    );
  }
  function c(e) {
    return e.stopPropagation();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          o,
          c,
          d,
          u,
          m,
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
          S = (0, i.c)(45);
        S[0] !== e
          ? (({
              draftTitle: c,
              onConfirm: u,
              isDeleting: f,
              isRecovering: x,
              isFundedOnChain: b,
              onConfirmForce: m,
              onFinishPublishing: p,
              className: o,
              onClick: d,
              ...a
            } = e),
            (S[0] = e),
            (S[1] = a),
            (S[2] = o),
            (S[3] = c),
            (S[4] = d),
            (S[5] = u),
            (S[6] = m),
            (S[7] = p),
            (S[8] = f),
            (S[9] = x),
            (S[10] = b))
          : ((a = S[1]),
            (o = S[2]),
            (c = S[3]),
            (d = S[4]),
            (u = S[5]),
            (m = S[6]),
            (p = S[7]),
            (f = S[8]),
            (x = S[9]),
            (b = S[10]));
        let A = void 0 !== f && f,
          F = void 0 !== x && x,
          U = void 0 !== b && b,
          [T, E] = (0, s.useState)(!1),
          D = A || F,
          B = (0, s.useRef)(!1),
          L = (0, s.useRef)(!1),
          P = (0, s.useRef)(U);
        (S[11] !== U
          ? ((h = () => {
              (U && !P.current && E(!0), (P.current = U));
            }),
            (y = [U]),
            (S[11] = U),
            (S[12] = h),
            (S[13] = y))
          : ((h = S[12]), (y = S[13])),
          (0, s.useEffect)(h, y),
          S[14] !== A || S[15] !== U || S[16] !== F
            ? ((g = () => {
                let e = B.current && !A,
                  t = L.current && !F;
                ((e || t) && !U && E(!1), (B.current = A), (L.current = F));
              }),
              (v = [A, F, U]),
              (S[14] = A),
              (S[15] = U),
              (S[16] = F),
              (S[17] = g),
              (S[18] = v))
            : ((g = S[17]), (v = S[18])),
          (0, s.useEffect)(g, v));
        let Q = F ? "Finishing…" : A ? "Deleting…" : "Delete";
        return (
          S[19] !== o
            ? ((w = (0, n.c)(
                "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#FCA5A5] transition-colors hover:bg-white/[0.06] disabled:opacity-60",
                o,
              )),
              (S[19] = o),
              (S[20] = w))
            : (w = S[20]),
          S[21] !== d
            ? ((k = (e) => {
                (d?.(e), E(!0));
              }),
              (S[21] = d),
              (S[22] = k))
            : (k = S[22]),
          S[23] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = (0, t.jsx)(r.bO, { className: "h-4 w-4" })), (S[23] = j))
            : (j = S[23]),
          S[24] !== a ||
          S[25] !== D ||
          S[26] !== w ||
          S[27] !== k ||
          S[28] !== Q
            ? ((_ = (0, t.jsxs)("button", {
                ...a,
                className: w,
                disabled: D,
                onClick: k,
                type: "button",
                children: [j, Q],
              })),
              (S[24] = a),
              (S[25] = D),
              (S[26] = w),
              (S[27] = k),
              (S[28] = Q),
              (S[29] = _))
            : (_ = S[29]),
          S[30] !== D
            ? ((N = (e) => {
                D || E(e);
              }),
              (S[30] = D),
              (S[31] = N))
            : (N = S[31]),
          S[32] !== T ||
          S[33] !== c ||
          S[34] !== A ||
          S[35] !== U ||
          S[36] !== F ||
          S[37] !== u ||
          S[38] !== m ||
          S[39] !== p ||
          S[40] !== N
            ? ((I = (0, t.jsx)(l, {
                draftTitle: c,
                isDeleting: A,
                isFundedOnChain: U,
                isRecovering: F,
                onConfirm: u,
                onConfirmForce: m,
                onFinishPublishing: p,
                onOpenChange: N,
                open: T,
              })),
              (S[32] = T),
              (S[33] = c),
              (S[34] = A),
              (S[35] = U),
              (S[36] = F),
              (S[37] = u),
              (S[38] = m),
              (S[39] = p),
              (S[40] = N),
              (S[41] = I))
            : (I = S[41]),
          S[42] !== _ || S[43] !== I
            ? ((C = (0, t.jsxs)(t.Fragment, { children: [_, I] })),
              (S[42] = _),
              (S[43] = I),
              (S[44] = C))
            : (C = S[44]),
          C
        );
      },
    ],
    280667,
  );
};
