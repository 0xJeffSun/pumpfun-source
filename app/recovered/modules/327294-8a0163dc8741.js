// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(264458);
  let s = {
      default: "border-border-secondary bg-bg-secondary",
      brand: "border-livestream-green/40 bg-livestream-green/10",
      destructive: "border-red-500/40 bg-red-500/10",
    },
    l = {
      default: "text-text-primary",
      brand: "text-livestream-green",
      destructive: "text-red-400",
    },
    a = {
      default:
        "border-border-secondary bg-bg-tertiary text-text-primary hover:bg-bg-primary",
      brand:
        "border-livestream-green/40 bg-livestream-green/15 text-livestream-green hover:bg-livestream-green/20",
      destructive:
        "border-red-500/40 bg-red-500/15 text-red-300 hover:bg-red-500/20",
    },
    n = { default: "rounded-xl px-4 py-3", mini: "rounded-lg p-2" },
    o = { default: "mr-3", mini: "mr-1" },
    c = { default: "px-3 py-1.5 text-sm", mini: "px-2 py-1 text-xs" },
    d = (e) => {
      let d,
        m,
        u,
        f,
        h,
        x,
        p,
        v,
        g,
        b,
        w,
        y,
        N,
        j,
        _,
        C,
        E,
        I,
        S,
        T,
        L = (0, i.c)(45);
      L[0] !== e
        ? (({
            className: u,
            variant: g,
            size: b,
            title: w,
            description: f,
            leftIcon: h,
            actionText: m,
            onAction: x,
            actionButton: d,
            role: v,
            ...p
          } = e),
          (L[0] = e),
          (L[1] = d),
          (L[2] = m),
          (L[3] = u),
          (L[4] = f),
          (L[5] = h),
          (L[6] = x),
          (L[7] = p),
          (L[8] = v),
          (L[9] = g),
          (L[10] = b),
          (L[11] = w))
        : ((d = L[1]),
          (m = L[2]),
          (u = L[3]),
          (f = L[4]),
          (h = L[5]),
          (x = L[6]),
          (p = L[7]),
          (v = L[8]),
          (g = L[9]),
          (b = L[10]),
          (w = L[11]));
      let k = void 0 === g ? "default" : g,
        R = void 0 === b ? "default" : b;
      L[12] !== d || L[13] !== m || L[14] !== x || L[15] !== R || L[16] !== k
        ? ((y =
            d ??
            (m && x
              ? (0, t.jsx)("button", {
                  type: "button",
                  onClick: x,
                  className: (0, r.default)(
                    "rounded-md border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                    c[R],
                    a[k],
                  ),
                  children: m,
                })
              : null)),
          (L[12] = d),
          (L[13] = m),
          (L[14] = x),
          (L[15] = R),
          (L[16] = k),
          (L[17] = y))
        : (y = L[17]);
      let A = y,
        z = v ?? "alert",
        P = n[R],
        M = s[k];
      return (
        L[18] !== u || L[19] !== P || L[20] !== M
          ? ((N = (0, r.default)(
              "flex w-full items-center gap-1 border",
              P,
              M,
              u,
            )),
            (L[18] = u),
            (L[19] = P),
            (L[20] = M),
            (L[21] = N))
          : (N = L[21]),
        L[22] !== h || L[23] !== R || L[24] !== k
          ? ((j = h
              ? (0, t.jsx)("div", {
                  className: (0, r.default)(
                    "flex shrink-0 items-center justify-center pt-0.5",
                    o[R],
                  ),
                  children: (0, t.jsx)("span", {
                    className: (0, r.default)(
                      "flex h-4 w-4 items-center justify-center",
                      l[k],
                    ),
                    children: h,
                  }),
                })
              : null),
            (L[22] = h),
            (L[23] = R),
            (L[24] = k),
            (L[25] = j))
          : (j = L[25]),
        L[26] !== w
          ? ((_ = (0, t.jsx)("p", {
              className: "truncate text-sm font-medium text-text-primary",
              children: w,
            })),
            (L[26] = w),
            (L[27] = _))
          : (_ = L[27]),
        L[28] !== f || L[29] !== R
          ? ((C =
              "default" === R && f
                ? (0, t.jsx)("p", {
                    className: "mt-0.5 text-sm text-text-tertiary",
                    children: f,
                  })
                : null),
            (L[28] = f),
            (L[29] = R),
            (L[30] = C))
          : (C = L[30]),
        L[31] !== C || L[32] !== _
          ? ((E = (0, t.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [_, C],
            })),
            (L[31] = C),
            (L[32] = _),
            (L[33] = E))
          : (E = L[33]),
        L[34] !== E || L[35] !== j
          ? ((I = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 items-start",
              children: [j, E],
            })),
            (L[34] = E),
            (L[35] = j),
            (L[36] = I))
          : (I = L[36]),
        L[37] !== A
          ? ((S = A
              ? (0, t.jsx)("div", { className: "ml-3 shrink-0", children: A })
              : null),
            (L[37] = A),
            (L[38] = S))
          : (S = L[38]),
        L[39] !== p || L[40] !== I || L[41] !== S || L[42] !== z || L[43] !== N
          ? ((T = (0, t.jsxs)("div", {
              role: z,
              className: N,
              ...p,
              children: [I, S],
            })),
            (L[39] = p),
            (L[40] = I),
            (L[41] = S),
            (L[42] = z),
            (L[43] = N),
            (L[44] = T))
          : (T = L[44]),
        T
      );
    };
  var m = e.i(426091);
  e.i(12692);
  var u = e.i(398902),
    f = e.i(624335);
  let h = (e) => {
    let r,
      s,
      l = (0, i.c)(3),
      { className: a } = e;
    return (
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("path", {
            d: "M19.7783 4.22184L4.22197 19.7782M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12ZM18.5163 18.516C17.3167 19.7156 13.427 17.7707 9.82826 14.172C6.22955 10.5733 4.28467 6.68352 5.48424 5.48395C6.68381 4.28438 10.5736 6.22927 14.1723 9.82798C17.771 13.4267 19.7159 17.3165 18.5163 18.516Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          })),
          (l[0] = r))
        : (r = l[0]),
      l[1] !== a
        ? ((s = (0, t.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            className: a,
            children: r,
          })),
          (l[1] = a),
          (l[2] = s))
        : (s = l[2]),
      s
    );
  };
  e.s(
    [
      "LivestreamBlockedMessage",
      0,
      (e) => {
        let r,
          s,
          l,
          a,
          n,
          o,
          c = (0, i.c)(17),
          { title: x, description: p, className: v, onDismiss: g } = e,
          { t: b } = (0, u.f)();
        return (
          c[0] !== b || c[1] !== x
            ? ((r = x ?? b("web.livestream.blocked_title")),
              (c[0] = b),
              (c[1] = x),
              (c[2] = r))
            : (r = c[2]),
          c[3] !== p || c[4] !== b
            ? ((s = p ?? b("web.livestream.blocked_description")),
              (c[3] = p),
              (c[4] = b),
              (c[5] = s))
            : (s = c[5]),
          c[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, t.jsx)(h, { className: "h-4 w-4" })), (c[6] = l))
            : (l = c[6]),
          c[7] !== g || c[8] !== b
            ? ((a = g
                ? (0, t.jsx)("button", {
                    onClick: g,
                    className:
                      "flex h-6 w-6 items-center justify-center rounded-full text-text-mid-em transition-colors hover:bg-bg-tertiary hover:text-text-high-em",
                    "aria-label": b("common.dismiss"),
                    children: (0, t.jsx)(f.f, {}),
                  })
                : void 0),
              (c[7] = g),
              (c[8] = b),
              (c[9] = a))
            : (a = c[9]),
          c[10] !== v
            ? ((n = (0, m.c)(
                "border border-border-secondary bg-bg-secondary",
                v,
              )),
              (c[10] = v),
              (c[11] = n))
            : (n = c[11]),
          c[12] !== r || c[13] !== s || c[14] !== a || c[15] !== n
            ? ((o = (0, t.jsx)(d, {
                variant: "default",
                title: r,
                description: s,
                leftIcon: l,
                actionButton: a,
                className: n,
              })),
              (c[12] = r),
              (c[13] = s),
              (c[14] = a),
              (c[15] = n),
              (c[16] = o))
            : (o = c[16]),
          o
        );
      },
    ],
    327294,
  );
};
