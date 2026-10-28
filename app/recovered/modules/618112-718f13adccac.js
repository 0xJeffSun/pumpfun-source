// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    a = e.i(426091),
    i = e.i(352386),
    o = e.i(200165),
    l = e.i(66732);
  function u(e) {
    return !e.disabled;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          c,
          d,
          f,
          m,
          p,
          h,
          b,
          v,
          g,
          y,
          x,
          w,
          S,
          N,
          P,
          M = (0, r.c)(47),
          {
            value: j,
            onValueChange: A,
            items: k,
            triggerId: _,
            triggerClassName: O,
            triggerLabel: C,
            triggerPlaceholder: E,
            searchPlaceholder: V,
            emptyState: L,
            contentClassName: U,
            disabled: D,
          } = e,
          I = void 0 === V ? "Search by ticker, name, or CA" : V,
          T = void 0 === L ? "No coins match this search." : L,
          [F, B] = (0, i.useState)(!1),
          [$, R] = (0, i.useState)("");
        M[0] !== k || M[1] !== $
          ? ((s = (function (e, t) {
              let r = t.trim();
              if (0 === r.length) return [...e];
              let n = e.filter((e) => !!e.searchKey),
                a = new Set(
                  (function (e, t) {
                    let r = t.trim();
                    if (0 === r.length) return [...e];
                    let n = e.filter((e) => e.mint === r);
                    if (n.length > 0) return n;
                    let a = r.toLowerCase(),
                      i = e.filter((e) => e.symbol.toLowerCase() === a);
                    return i.length > 0
                      ? i
                      : e.filter(
                          (e) =>
                            e.symbol.toLowerCase().includes(a) ||
                            e.name.toLowerCase().includes(a),
                        );
                  })(
                    n.map((e) => e.searchKey),
                    r,
                  ).map((e) => e.mint),
                );
              return n.filter((e) => a.has(e.searchKey.mint));
            })(k, $)),
            (M[0] = k),
            (M[1] = $),
            (M[2] = s))
          : (s = M[2]);
        let K = s,
          q = (0, i.useId)();
        return (
          M[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = (e) => {
                (B(e), e || R(""));
              }),
              (M[3] = c))
            : (c = M[3]),
          M[4] !== O
            ? ((d = (0, a.c)(
                "flex h-11 w-full items-center justify-between gap-2 rounded-[14px] border border-border-tertiary bg-bg-tertiary px-3 text-left text-sm text-white outline-none transition-colors focus-visible:ring-1 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-border-tertiary",
                O,
              )),
              (M[4] = O),
              (M[5] = d))
            : (d = M[5]),
          M[6] !== C || M[7] !== E
            ? ((f =
                C ??
                (0, t.jsx)("span", {
                  className: "text-text-tertiary",
                  children: E,
                })),
              (M[6] = C),
              (M[7] = E),
              (M[8] = f))
            : (f = M[8]),
          M[9] !== f
            ? ((m = (0, t.jsx)("span", {
                className: "flex-1 truncate",
                children: f,
              })),
              (M[9] = f),
              (M[10] = m))
            : (m = M[10]),
          M[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (0, t.jsx)(n.J0, {
                "aria-hidden": !0,
                className: "h-4 w-4 shrink-0 opacity-70",
              })),
              (M[11] = p))
            : (p = M[11]),
          M[12] !== D ||
          M[13] !== F ||
          M[14] !== d ||
          M[15] !== m ||
          M[16] !== _
            ? ((h = (0, t.jsx)(l.J, {
                asChild: !0,
                children: (0, t.jsxs)("button", {
                  "aria-expanded": F,
                  "aria-haspopup": "listbox",
                  className: d,
                  disabled: D,
                  id: _,
                  type: "button",
                  children: [m, p],
                }),
              })),
              (M[12] = D),
              (M[13] = F),
              (M[14] = d),
              (M[15] = m),
              (M[16] = _),
              (M[17] = h))
            : (h = M[17]),
          M[18] !== U
            ? ((b = (0, a.c)(
                "z-[999] w-[--radix-popover-trigger-width] overflow-hidden rounded-[14px] border-border-secondary bg-bg-secondary p-0 text-white shadow-md",
                U,
              )),
              (M[18] = U),
              (M[19] = b))
            : (b = M[19]),
          M[20] !== q
            ? ((v = (e) => {
                (e.preventDefault(),
                  requestAnimationFrame(() => {
                    let e = document.getElementById(q);
                    e instanceof HTMLInputElement && e.focus();
                  }));
              }),
              (M[20] = q),
              (M[21] = v))
            : (v = M[21]),
          M[22] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (e) => R(e.target.value)), (M[22] = g))
            : (g = M[22]),
          M[23] !== A || M[24] !== K
            ? ((y = (e) => {
                if ("Enter" !== e.key) return;
                e.preventDefault();
                let t = K.find(u);
                t && (A(t.value), B(!1), R(""));
              }),
              (M[23] = A),
              (M[24] = K),
              (M[25] = y))
            : (y = M[25]),
          M[26] !== $ || M[27] !== q || M[28] !== I || M[29] !== y
            ? ((x = (0, t.jsx)("div", {
                className: "border-b border-border-secondary p-2",
                children: (0, t.jsx)(o.f, {
                  "aria-label": I,
                  autoComplete: "off",
                  className:
                    "h-9 rounded-[10px] border-border-secondary bg-bg-tertiary text-sm text-white placeholder:text-text-tertiary focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:ring-offset-0 dark:border-border-secondary dark:bg-bg-tertiary",
                  id: q,
                  onChange: g,
                  onKeyDown: y,
                  placeholder: I,
                  type: "text",
                  value: $,
                }),
              })),
              (M[26] = $),
              (M[27] = q),
              (M[28] = I),
              (M[29] = y),
              (M[30] = x))
            : (x = M[30]),
          M[31] !== T || M[32] !== A || M[33] !== j || M[34] !== K
            ? ((w =
                0 === K.length
                  ? (0, t.jsx)("li", {
                      "aria-live": "polite",
                      className: "px-3 py-3 text-xs text-text-tertiary",
                      children: T,
                    })
                  : K.map((e) => {
                      let r = e.value === j;
                      return (0, t.jsx)(
                        "li",
                        {
                          role: "presentation",
                          children: (0, t.jsx)("button", {
                            "aria-selected": r,
                            className: (0, a.c)(
                              "flex w-full cursor-pointer items-center gap-2 rounded-[10px] px-3 py-2 text-left text-sm text-white transition-colors hover:bg-bg-tertiary focus-visible:bg-bg-tertiary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                              r && "bg-bg-tertiary",
                            ),
                            disabled: e.disabled,
                            onClick: () => {
                              e.disabled || (A(e.value), B(!1), R(""));
                            },
                            role: "option",
                            type: "button",
                            children: e.label,
                          }),
                        },
                        e.value,
                      );
                    })),
              (M[31] = T),
              (M[32] = A),
              (M[33] = j),
              (M[34] = K),
              (M[35] = w))
            : (w = M[35]),
          M[36] !== w
            ? ((S = (0, t.jsx)("ul", {
                className: "max-h-[260px] overflow-y-auto p-1",
                role: "listbox",
                children: w,
              })),
              (M[36] = w),
              (M[37] = S))
            : (S = M[37]),
          M[38] !== b || M[39] !== v || M[40] !== x || M[41] !== S
            ? ((N = (0, t.jsxs)(l.T, {
                align: "start",
                className: b,
                onOpenAutoFocus: v,
                sideOffset: 6,
                children: [x, S],
              })),
              (M[38] = b),
              (M[39] = v),
              (M[40] = x),
              (M[41] = S),
              (M[42] = N))
            : (N = M[42]),
          M[43] !== F || M[44] !== N || M[45] !== h
            ? ((P = (0, t.jsxs)(l.V, {
                onOpenChange: c,
                open: F,
                children: [h, N],
              })),
              (M[43] = F),
              (M[44] = N),
              (M[45] = h),
              (M[46] = P))
            : (P = M[46]),
          P
        );
      },
    ],
    618112,
  );
};
