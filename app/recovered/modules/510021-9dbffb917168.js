// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    a = e.i(439587),
    n = e.i(7284),
    s = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    o = e.i(182119),
    c = e.i(200165);
  e.s([
    "ManageWatchlistDialog",
    0,
    function (e) {
      let m,
        d,
        u,
        h,
        x,
        f,
        b,
        p,
        y,
        v,
        g,
        w,
        k,
        N,
        j,
        _,
        C,
        I,
        S,
        T,
        A,
        F,
        E,
        R,
        O,
        B,
        D,
        M,
        z,
        L,
        U,
        q,
        H = (0, r.c)(84),
        {
          isOpen: P,
          onOpenChange: W,
          bookmarks: K,
          createBookmark: V,
          deleteBookmark: G,
          updateBookmarkName: Q,
        } = e,
        { t: Y } = (0, l.f)(),
        [J, $] = (0, s.useState)(""),
        [X, Z] = (0, s.useState)(null),
        [ee, et] = (0, s.useState)(""),
        [er, ei] = (0, s.useState)(!1),
        [ea, en] = (0, s.useState)(null),
        es = (0, s.useRef)(null);
      (H[0] !== P
        ? ((m = () => {
            if (!P) return;
            let e = setTimeout(() => {
              es.current?.focus();
            }, 0);
            return () => clearTimeout(e);
          }),
          (d = [P]),
          (H[0] = P),
          (H[1] = m),
          (H[2] = d))
        : ((m = H[1]), (d = H[2])),
        (0, s.useEffect)(m, d),
        H[3] !== W
          ? ((u = (e) => {
              (e || (Z(null), et("")), W(e));
            }),
            (H[3] = W),
            (H[4] = u))
          : (u = H[4]));
      let el = u;
      H[5] !== V || H[6] !== er || H[7] !== J
        ? ((h = async () => {
            if (J.trim() && !er) {
              ei(!0);
              try {
                (await V(J.trim()), $(""));
              } catch (e) {
                console.error("Failed to create bookmark:", e);
              }
              ei(!1);
            }
          }),
          (H[5] = V),
          (H[6] = er),
          (H[7] = J),
          (H[8] = h))
        : (h = H[8]);
      let eo = h;
      H[9] !== G || H[10] !== er
        ? ((x = async (e) => {
            if (!er) {
              ei(!0);
              try {
                await G(e);
              } catch (e) {
                console.error("Failed to delete bookmark:", e);
              }
              ei(!1);
            }
          }),
          (H[9] = G),
          (H[10] = er),
          (H[11] = x))
        : (x = H[11]);
      let ec = x;
      H[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (e) => {
            (Z(e.id), et(e.name));
          }),
          (H[12] = f))
        : (f = H[12]);
      let em = f;
      H[13] !== ee || H[14] !== er || H[15] !== Q
        ? ((b = async (e) => {
            if (ee.trim() && !er) {
              ei(!0);
              try {
                (await Q(e, ee.trim()), Z(null), et(""));
              } catch (e) {
                console.error("Failed to update bookmark name:", e);
              }
              ei(!1);
            }
          }),
          (H[13] = ee),
          (H[14] = er),
          (H[15] = Q),
          (H[16] = b))
        : (b = H[16]);
      let ed = b;
      H[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = () => {
            (Z(null), et(""));
          }),
          (H[17] = p))
        : (p = H[17]);
      let eu = p;
      H[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (e) => {
            en(e);
          }),
          (H[18] = y))
        : (y = H[18]);
      let eh = y;
      H[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = () => {
            en(null);
          }),
          (H[19] = v))
        : (v = H[19]);
      let ex = v;
      H[20] !== el
        ? ((g = () => el(!1)), (H[20] = el), (H[21] = g))
        : (g = H[21]);
      let ef = er && "cursor-not-allowed";
      return (
        H[22] !== ef
          ? ((w = (0, n.U)(
              "absolute right-4 top-4 rounded p-1 transition-colors hover:bg-bg-tertiary",
              ef,
            )),
            (H[22] = ef),
            (H[23] = w))
          : (w = H[23]),
        H[24] === Symbol.for("react.memo_cache_sentinel")
          ? ((k = (0, t.jsx)(i.x6, { className: "size-4 text-text-tertiary" })),
            (H[24] = k))
          : (k = H[24]),
        H[25] !== er || H[26] !== g || H[27] !== w
          ? ((N = (0, t.jsx)("button", {
              onClick: g,
              className: w,
              disabled: er,
              children: k,
            })),
            (H[25] = er),
            (H[26] = g),
            (H[27] = w),
            (H[28] = N))
          : (N = H[28]),
        H[29] !== Y
          ? ((j = Y("web.watchlist.manage_lists")), (H[29] = Y), (H[30] = j))
          : (j = H[30]),
        H[31] !== j
          ? ((_ = (0, t.jsx)(o.F, { className: "mb-2", children: j })),
            (H[31] = j),
            (H[32] = _))
          : (_ = H[32]),
        H[33] !== Y
          ? ((C = Y("web.watchlist.manage_lists_description")),
            (H[33] = Y),
            (H[34] = C))
          : (C = H[34]),
        H[35] !== C
          ? ((I = (0, t.jsx)("p", {
              className: "text-sm text-text-tertiary",
              children: C,
            })),
            (H[35] = C),
            (H[36] = I))
          : (I = H[36]),
        H[37] !== _ || H[38] !== I
          ? ((S = (0, t.jsxs)(o.s, { children: [_, I] })),
            (H[37] = _),
            (H[38] = I),
            (H[39] = S))
          : (S = H[39]),
        H[40] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (e) => $(e.target.value)), (H[40] = T))
          : (T = H[40]),
        H[41] !== eo || H[42] !== er || H[43] !== J
          ? ((A = (e) => {
              "Enter" === e.key && J.trim() && !er && eo();
            }),
            (H[41] = eo),
            (H[42] = er),
            (H[43] = J),
            (H[44] = A))
          : (A = H[44]),
        H[45] !== Y
          ? ((F = Y("web.watchlist.add_new_list_placeholder")),
            (H[45] = Y),
            (H[46] = F))
          : (F = H[46]),
        H[47] !== er || H[48] !== J || H[49] !== A || H[50] !== F
          ? ((E = (0, t.jsx)(c.f, {
              ref: es,
              value: J,
              onChange: T,
              onKeyDown: A,
              placeholder: F,
              className:
                "flex-1 border-border-tertiary bg-transparent text-text-primary placeholder:text-text-quaternary",
              disabled: er,
            })),
            (H[47] = er),
            (H[48] = J),
            (H[49] = A),
            (H[50] = F),
            (H[51] = E))
          : (E = H[51]),
        H[52] === Symbol.for("react.memo_cache_sentinel")
          ? ((R = (0, t.jsx)(i.YC, { className: "size-4" })), (H[52] = R))
          : (R = H[52]),
        H[53] !== Y
          ? ((O = Y("web.watchlist.create_new_list")), (H[53] = Y), (H[54] = O))
          : (O = H[54]),
        H[55] !== eo || H[56] !== er || H[57] !== O
          ? ((B = (0, t.jsx)(a.K, {
              onClick: eo,
              isDisabled: er,
              iconStart: R,
              children: O,
            })),
            (H[55] = eo),
            (H[56] = er),
            (H[57] = O),
            (H[58] = B))
          : (B = H[58]),
        H[59] !== E || H[60] !== B
          ? ((D = (0, t.jsxs)("div", {
              className: "flex gap-2",
              children: [E, B],
            })),
            (H[59] = E),
            (H[60] = B),
            (H[61] = D))
          : (D = H[61]),
        H[62] !== K ||
        H[63] !== ea ||
        H[64] !== X ||
        H[65] !== ee ||
        H[66] !== ec ||
        H[67] !== ed ||
        H[68] !== er ||
        H[69] !== Y
          ? ((M =
              K && K.map
                ? K.map((e) =>
                    (0, t.jsx)(
                      "div",
                      {
                        className: (0, n.U)(
                          "group flex h-10 items-center justify-between gap-2 rounded p-2",
                          X === e.id && "pl-[3px]",
                          X !== e.id && "hover:bg-bg-tertiary",
                        ),
                        children:
                          X === e.id
                            ? (0, t.jsxs)(t.Fragment, {
                                children: [
                                  (0, t.jsx)(c.f, {
                                    value: ee,
                                    onChange: (e) => et(e.target.value),
                                    onKeyDown: (t) => {
                                      "Enter" === t.key && ee.trim() !== e.name
                                        ? ed(e.id)
                                        : "Escape" === t.key && eu();
                                    },
                                    className:
                                      "flex-1 border-border-tertiary bg-transparent py-0 pl-[8px] text-sm text-text-primary",
                                    autoFocus: !0,
                                    disabled: er,
                                  }),
                                  (0, t.jsxs)("div", {
                                    className: "flex gap-2",
                                    children: [
                                      (0, t.jsx)("button", {
                                        onClick: () => ed(e.id),
                                        className: (0, n.U)(
                                          "rounded p-1 hover:bg-bg-quaternary",
                                          (er || ee.trim() === e.name) &&
                                            "cursor-not-allowed",
                                        ),
                                        disabled: er || ee.trim() === e.name,
                                        children: (0, t.jsx)(i.S7, {
                                          className: (0, n.U)(
                                            "size-4",
                                            ee.trim() === e.name
                                              ? "text-text-quaternary"
                                              : "text-text-accent",
                                          ),
                                        }),
                                      }),
                                      (0, t.jsx)("button", {
                                        onClick: eu,
                                        className: (0, n.U)(
                                          "rounded p-1 hover:bg-bg-quaternary",
                                          er && "cursor-not-allowed",
                                        ),
                                        disabled: er,
                                        children: (0, t.jsx)(i.x6, {
                                          className:
                                            "size-4 text-text-tertiary",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : ea === e.id
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)("span", {
                                      className:
                                        "flex h-7 flex-1 items-center px-1 py-0 text-sm text-text-error",
                                      children: Y("web.common.are_you_sure"),
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        (0, t.jsx)("button", {
                                          onClick: () => ec(e.id),
                                          className: (0, n.U)(
                                            "rounded bg-bg-error px-2 py-1 text-xs text-[var(--color-text-on-error)] hover:opacity-90",
                                            er &&
                                              "cursor-not-allowed opacity-50",
                                          ),
                                          disabled: er,
                                          children: Y("common.yes"),
                                        }),
                                        (0, t.jsx)("button", {
                                          onClick: ex,
                                          className: (0, n.U)(
                                            "rounded px-2 py-1 text-xs hover:bg-bg-quaternary",
                                            er && "cursor-not-allowed",
                                          ),
                                          disabled: er,
                                          children: Y(
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
                                          ? Y("home.tabs.watchlist")
                                          : e.name,
                                    }),
                                    "default" !== e.name
                                      ? (0, t.jsxs)("div", {
                                          className:
                                            "flex gap-2 opacity-0 transition-opacity group-hover:opacity-100",
                                          children: [
                                            (0, t.jsx)("button", {
                                              onClick: () => em(e),
                                              className: (0, n.U)(
                                                "rounded p-1 hover:bg-bg-quaternary",
                                                er && "cursor-not-allowed",
                                              ),
                                              disabled: er,
                                              children: (0, t.jsx)(i.yR, {
                                                className:
                                                  "size-4 text-text-tertiary",
                                              }),
                                            }),
                                            (0, t.jsx)("button", {
                                              onClick: () => eh(e.id),
                                              className: (0, n.U)(
                                                "rounded p-1 hover:bg-bg-quaternary",
                                                er && "cursor-not-allowed",
                                              ),
                                              disabled: er,
                                              children: (0, t.jsx)(i.bO, {
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
            (H[62] = K),
            (H[63] = ea),
            (H[64] = X),
            (H[65] = ee),
            (H[66] = ec),
            (H[67] = ed),
            (H[68] = er),
            (H[69] = Y),
            (H[70] = M))
          : (M = H[70]),
        H[71] !== M
          ? ((z = (0, t.jsx)("div", {
              className: "max-h-[300px] space-y-2 overflow-y-auto py-1",
              children: M,
            })),
            (H[71] = M),
            (H[72] = z))
          : (z = H[72]),
        H[73] !== D || H[74] !== z
          ? ((L = (0, t.jsxs)("div", {
              className: "space-y-4",
              children: [D, z],
            })),
            (H[73] = D),
            (H[74] = z),
            (H[75] = L))
          : (L = H[75]),
        H[76] !== N || H[77] !== S || H[78] !== L
          ? ((U = (0, t.jsxs)(o.d, {
              className: "max-w-md bg-bg-primary p-4 text-text-primary",
              children: [N, S, L],
            })),
            (H[76] = N),
            (H[77] = S),
            (H[78] = L),
            (H[79] = U))
          : (U = H[79]),
        H[80] !== el || H[81] !== P || H[82] !== U
          ? ((q = (0, t.jsx)(o.N, { open: P, onOpenChange: el, children: U })),
            (H[80] = el),
            (H[81] = P),
            (H[82] = U),
            (H[83] = q))
          : (q = H[83]),
        q
      );
    },
  ]);
};
