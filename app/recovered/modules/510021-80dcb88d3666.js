// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    a = e.i(445242),
    r = e.i(745018),
    s = e.i(439587),
    l = e.i(7284),
    n = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    o = e.i(182119),
    c = e.i(200165);
  e.s([
    "ManageWatchlistDialog",
    0,
    function (e) {
      let d,
        m,
        x,
        u,
        h,
        b,
        p,
        y,
        g,
        f,
        j,
        w,
        N,
        v,
        _,
        k,
        S,
        C,
        U,
        F,
        q,
        z,
        T,
        K,
        D,
        E,
        O,
        R,
        A,
        B,
        P,
        M,
        W = (0, a.c)(84),
        {
          isOpen: Y,
          onOpenChange: G,
          bookmarks: H,
          createBookmark: I,
          deleteBookmark: J,
          updateBookmarkName: L,
        } = e,
        { t: Q } = (0, i.f)(),
        [V, X] = (0, n.useState)(""),
        [Z, $] = (0, n.useState)(null),
        [ee, et] = (0, n.useState)(""),
        [ea, er] = (0, n.useState)(!1),
        [es, el] = (0, n.useState)(null),
        en = (0, n.useRef)(null);
      (W[0] !== Y
        ? ((d = () => {
            if (!Y) return;
            let e = setTimeout(() => {
              en.current?.focus();
            }, 0);
            return () => clearTimeout(e);
          }),
          (m = [Y]),
          (W[0] = Y),
          (W[1] = d),
          (W[2] = m))
        : ((d = W[1]), (m = W[2])),
        (0, n.useEffect)(d, m),
        W[3] !== G
          ? ((x = (e) => {
              (e || ($(null), et("")), G(e));
            }),
            (W[3] = G),
            (W[4] = x))
          : (x = W[4]));
      let ei = x;
      W[5] !== I || W[6] !== ea || W[7] !== V
        ? ((u = async () => {
            if (V.trim() && !ea) {
              er(!0);
              try {
                (await I(V.trim()), X(""));
              } catch (e) {
                console.error("Failed to create bookmark:", e);
              }
              er(!1);
            }
          }),
          (W[5] = I),
          (W[6] = ea),
          (W[7] = V),
          (W[8] = u))
        : (u = W[8]);
      let eo = u;
      W[9] !== J || W[10] !== ea
        ? ((h = async (e) => {
            if (!ea) {
              er(!0);
              try {
                await J(e);
              } catch (e) {
                console.error("Failed to delete bookmark:", e);
              }
              er(!1);
            }
          }),
          (W[9] = J),
          (W[10] = ea),
          (W[11] = h))
        : (h = W[11]);
      let ec = h;
      W[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = (e) => {
            ($(e.id), et(e.name));
          }),
          (W[12] = b))
        : (b = W[12]);
      let ed = b;
      W[13] !== ee || W[14] !== ea || W[15] !== L
        ? ((p = async (e) => {
            if (ee.trim() && !ea) {
              er(!0);
              try {
                (await L(e, ee.trim()), $(null), et(""));
              } catch (e) {
                console.error("Failed to update bookmark name:", e);
              }
              er(!1);
            }
          }),
          (W[13] = ee),
          (W[14] = ea),
          (W[15] = L),
          (W[16] = p))
        : (p = W[16]);
      let em = p;
      W[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = () => {
            ($(null), et(""));
          }),
          (W[17] = y))
        : (y = W[17]);
      let ex = y;
      W[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((g = (e) => {
            el(e);
          }),
          (W[18] = g))
        : (g = W[18]);
      let eu = g;
      W[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = () => {
            el(null);
          }),
          (W[19] = f))
        : (f = W[19]);
      let eh = f;
      W[20] !== ei
        ? ((j = () => ei(!1)), (W[20] = ei), (W[21] = j))
        : (j = W[21]);
      let eb = ea && "cursor-not-allowed";
      return (
        W[22] !== eb
          ? ((w = (0, l.U)(
              "absolute right-4 top-4 rounded p-1 transition-colors hover:bg-bg-tertiary",
              eb,
            )),
            (W[22] = eb),
            (W[23] = w))
          : (w = W[23]),
        W[24] === Symbol.for("react.memo_cache_sentinel")
          ? ((N = (0, t.jsx)(r.x6, { className: "size-4 text-text-tertiary" })),
            (W[24] = N))
          : (N = W[24]),
        W[25] !== ea || W[26] !== j || W[27] !== w
          ? ((v = (0, t.jsx)("button", {
              onClick: j,
              className: w,
              disabled: ea,
              children: N,
            })),
            (W[25] = ea),
            (W[26] = j),
            (W[27] = w),
            (W[28] = v))
          : (v = W[28]),
        W[29] !== Q
          ? ((_ = Q("web.watchlist.manage_lists")), (W[29] = Q), (W[30] = _))
          : (_ = W[30]),
        W[31] !== _
          ? ((k = (0, t.jsx)(o.F, { className: "mb-2", children: _ })),
            (W[31] = _),
            (W[32] = k))
          : (k = W[32]),
        W[33] !== Q
          ? ((S = Q("web.watchlist.manage_lists_description")),
            (W[33] = Q),
            (W[34] = S))
          : (S = W[34]),
        W[35] !== S
          ? ((C = (0, t.jsx)("p", {
              className: "text-sm text-text-tertiary",
              children: S,
            })),
            (W[35] = S),
            (W[36] = C))
          : (C = W[36]),
        W[37] !== k || W[38] !== C
          ? ((U = (0, t.jsxs)(o.s, { children: [k, C] })),
            (W[37] = k),
            (W[38] = C),
            (W[39] = U))
          : (U = W[39]),
        W[40] === Symbol.for("react.memo_cache_sentinel")
          ? ((F = (e) => X(e.target.value)), (W[40] = F))
          : (F = W[40]),
        W[41] !== eo || W[42] !== ea || W[43] !== V
          ? ((q = (e) => {
              "Enter" === e.key && V.trim() && !ea && eo();
            }),
            (W[41] = eo),
            (W[42] = ea),
            (W[43] = V),
            (W[44] = q))
          : (q = W[44]),
        W[45] !== Q
          ? ((z = Q("web.watchlist.add_new_list_placeholder")),
            (W[45] = Q),
            (W[46] = z))
          : (z = W[46]),
        W[47] !== ea || W[48] !== V || W[49] !== q || W[50] !== z
          ? ((T = (0, t.jsx)(c.f, {
              ref: en,
              value: V,
              onChange: F,
              onKeyDown: q,
              placeholder: z,
              className:
                "flex-1 border-border-tertiary bg-transparent text-text-primary placeholder:text-text-quaternary",
              disabled: ea,
            })),
            (W[47] = ea),
            (W[48] = V),
            (W[49] = q),
            (W[50] = z),
            (W[51] = T))
          : (T = W[51]),
        W[52] === Symbol.for("react.memo_cache_sentinel")
          ? ((K = (0, t.jsx)(r.YC, { className: "size-4" })), (W[52] = K))
          : (K = W[52]),
        W[53] !== Q
          ? ((D = Q("web.watchlist.create_new_list")), (W[53] = Q), (W[54] = D))
          : (D = W[54]),
        W[55] !== eo || W[56] !== ea || W[57] !== D
          ? ((E = (0, t.jsx)(s.K, {
              onClick: eo,
              isDisabled: ea,
              iconStart: K,
              children: D,
            })),
            (W[55] = eo),
            (W[56] = ea),
            (W[57] = D),
            (W[58] = E))
          : (E = W[58]),
        W[59] !== T || W[60] !== E
          ? ((O = (0, t.jsxs)("div", {
              className: "flex gap-2",
              children: [T, E],
            })),
            (W[59] = T),
            (W[60] = E),
            (W[61] = O))
          : (O = W[61]),
        W[62] !== H ||
        W[63] !== es ||
        W[64] !== Z ||
        W[65] !== ee ||
        W[66] !== ec ||
        W[67] !== em ||
        W[68] !== ea ||
        W[69] !== Q
          ? ((R =
              H && H.map
                ? H.map((e) =>
                    (0, t.jsx)(
                      "div",
                      {
                        className: (0, l.U)(
                          "group flex h-10 items-center justify-between gap-2 rounded p-2",
                          Z === e.id && "pl-[3px]",
                          Z !== e.id && "hover:bg-bg-tertiary",
                        ),
                        children:
                          Z === e.id
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)(c.f, {
                                    value: ee,
                                    onChange: (e) => et(e.target.value),
                                    onKeyDown: (t) => {
                                      "Enter" === t.key && ee.trim() !== e.name
                                        ? em(e.id)
                                        : "Escape" === t.key && ex();
                                    },
                                    className:
                                      "flex-1 border-border-tertiary bg-transparent py-0 pl-[8px] text-sm text-text-primary",
                                    autoFocus: !0,
                                    disabled: ea,
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, t.jsx)("button", {
                                        onClick: () => em(e.id),
                                        className: (0, l.U)(
                                          "rounded p-1 hover:bg-bg-quaternary",
                                          (ea || ee.trim() === e.name) &&
                                            "cursor-not-allowed",
                                        ),
                                        disabled: ea || ee.trim() === e.name,
                                        children: (0, t.jsx)(r.S7, {
                                          className: (0, l.U)(
                                            "size-4",
                                            ee.trim() === e.name
                                              ? "text-text-quaternary"
                                              : "text-text-accent",
                                          ),
                                        }),
                                      }),
                                      (0, t.jsx)("button", {
                                        onClick: ex,
                                        className: (0, l.U)(
                                          "rounded p-1 hover:bg-bg-quaternary",
                                          ea && "cursor-not-allowed",
                                        ),
                                        disabled: ea,
                                        children: (0, t.jsx)(r.x6, {
                                          className:
                                            "size-4 text-text-tertiary",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : es === e.id
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "flex h-7 flex-1 items-center px-1 py-0 text-sm text-text-error",
                                      children: Q("web.common.are_you_sure"),
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        (0, t.jsx)("button", {
                                          onClick: () => ec(e.id),
                                          className: (0, l.U)(
                                            "rounded bg-bg-error px-2 py-1 text-xs text-[var(--color-text-on-error)] hover:opacity-90",
                                            ea &&
                                              "cursor-not-allowed opacity-50",
                                          ),
                                          disabled: ea,
                                          children: Q("common.yes"),
                                        }),
                                        (0, t.jsx)("button", {
                                          onClick: eh,
                                          className: (0, l.U)(
                                            "rounded px-2 py-1 text-xs hover:bg-bg-quaternary",
                                            ea && "cursor-not-allowed",
                                          ),
                                          disabled: ea,
                                          children: Q(
                                            "web.watchlist.no_cancel",
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                })
                              : (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "flex h-7 flex-1 items-center px-1 py-0 text-sm",
                                      children:
                                        "default" === e.name
                                          ? Q("home.tabs.watchlist")
                                          : e.name,
                                    }),
                                    "default" !== e.name
                                      ? (0, t.jsxs)("div", {
                                          className:
                                            "flex gap-2 opacity-0 transition-opacity group-hover:opacity-100",
                                          children: [
                                            (0, t.jsx)("button", {
                                              onClick: () => ed(e),
                                              className: (0, l.U)(
                                                "rounded p-1 hover:bg-bg-quaternary",
                                                ea && "cursor-not-allowed",
                                              ),
                                              disabled: ea,
                                              children: (0, t.jsx)(r.yR, {
                                                className:
                                                  "size-4 text-text-tertiary",
                                              }),
                                            }),
                                            (0, t.jsx)("button", {
                                              onClick: () => eu(e.id),
                                              className: (0, l.U)(
                                                "rounded p-1 hover:bg-bg-quaternary",
                                                ea && "cursor-not-allowed",
                                              ),
                                              disabled: ea,
                                              children: (0, t.jsx)(r.bO, {
                                                className:
                                                  "size-4 text-text-error",
                                              }),
                                            }),
                                          ],
                                        })
                                      : null,
                                  ],
                                }),
                      },
                      e.id,
                    ),
                  )
                : null),
            (W[62] = H),
            (W[63] = es),
            (W[64] = Z),
            (W[65] = ee),
            (W[66] = ec),
            (W[67] = em),
            (W[68] = ea),
            (W[69] = Q),
            (W[70] = R))
          : (R = W[70]),
        W[71] !== R
          ? ((A = (0, t.jsx)("div", {
              className: "max-h-[300px] space-y-2 overflow-y-auto py-1",
              children: R,
            })),
            (W[71] = R),
            (W[72] = A))
          : (A = W[72]),
        W[73] !== O || W[74] !== A
          ? ((B = (0, t.jsxs)("div", {
              className: "space-y-4",
              children: [O, A],
            })),
            (W[73] = O),
            (W[74] = A),
            (W[75] = B))
          : (B = W[75]),
        W[76] !== v || W[77] !== U || W[78] !== B
          ? ((P = (0, t.jsxs)(o.d, {
              className: "max-w-md bg-bg-primary p-4 text-text-primary",
              children: [v, U, B],
            })),
            (W[76] = v),
            (W[77] = U),
            (W[78] = B),
            (W[79] = P))
          : (P = W[79]),
        W[80] !== ei || W[81] !== Y || W[82] !== P
          ? ((M = (0, t.jsx)(o.N, { open: Y, onOpenChange: ei, children: P })),
            (W[80] = ei),
            (W[81] = Y),
            (W[82] = P),
            (W[83] = M))
          : (M = W[83]),
        M
      );
    },
  ]);
};
