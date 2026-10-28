// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    l = e.i(426091);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(199995),
    o = e.i(372550),
    s = e.i(607122);
  let c = ["RANKED", "LATEST", "TOP"],
    d = ["open", "closed"],
    u = {
      RANKED: "coin_details.sections.callouts.sort_for_you",
      LATEST: "coin_details.sections.callouts.sort_most_recent",
      TOP: "coin_details.sections.callouts.sort_size",
    },
    m = {
      RANKED: "coin_details.sections.callouts.sort_for_you",
      LATEST: "coin_details.sections.callouts.sort_most_recent",
      TOP: "coin_details.sections.callouts.sort_size_option",
    },
    p = {
      open: "coin_details.sections.callouts.view_open",
      closed: "coin_details.sections.callouts.view_closed",
    };
  var h = e.i(352386),
    f = e.i(78436),
    y = e.i(634103);
  let b = (0, f.$)()(
      (0, y.V)(
        (e) => ({
          view: "open",
          openSort: null,
          setView: (t) => e({ view: t }),
          setOpenSort: (t) => e({ openSort: t }),
        }),
        {
          name: "coin-callouts-feed",
          storage: (0, y.j)(() => localStorage),
          version: 1,
          partialize: (e) => ({ openSort: e.openSort }),
          onRehydrateStorage: () => (e, t) => {
            t && x();
          },
          merge: (e, t) => ({
            ...t,
            openSort: ((e) => {
              if (!e || "object" != typeof e) return null;
              let t = e.openSort;
              return c.some((e) => e === t) ? t : null;
            })(e),
          }),
        },
      ),
    ),
    v = !1,
    g = new Set(),
    x = () => {
      for (let e of ((v = !0), g)) e();
    },
    C = (e) => {
      g.add(e);
      let t = b.persist?.onFinishHydration(e);
      return () => {
        (g.delete(e), t?.());
      };
    },
    k = () => !b.persist || b.persist.hasHydrated() || v,
    w = () => !1,
    S = () => {
      let e = (0, h.useSyncExternalStore)(C, k, w),
        t = b(P);
      return e ? (t ?? "TOP") : "TOP";
    },
    _ = () => b(N);
  function P(e) {
    return e.openSort;
  }
  function N(e) {
    return e.view;
  }
  e.s(
    [
      "b",
      0,
      () => {
        let e,
          t = (0, r.c)(3),
          i = _(),
          l = S();
        if (t[0] !== l || t[1] !== i)
          ((e = "closed" === i ? "CLOSED_PNL" : l),
            (t[0] = l),
            (t[1] = i),
            (t[2] = e));
        else e = t[2];
        return e;
      },
      "W",
      0,
      _,
      "G",
      0,
      S,
    ],
    67016,
  );
  var T = e.i(595673);
  function M(e) {
    return e.view;
  }
  function j(e) {
    return e.setView;
  }
  function A(e) {
    return e.setOpenSort;
  }
  let I = {
    strip: n.C,
    row: "flex min-h-9 min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-border-secondary py-1.5",
    compact:
      "flex min-h-8 min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-border-secondary px-1 pb-1.5",
  };
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          h,
          f,
          y,
          v,
          g,
          x,
          C,
          k,
          w,
          _,
          P,
          N,
          E,
          L,
          U,
          $,
          D,
          B = (0, r.c)(26),
          { mint: F, variant: V, className: O } = e,
          R = void 0 === V ? "strip" : V,
          { t: H } = (0, a.f)(),
          {
            view: W,
            sort: G,
            showSortControl: z,
            onChangeView: K,
            onChangeSort: q,
          } = ((_ = (0, r.c)(13)),
          (P = b(M)),
          (N = b(j)),
          (E = b(A)),
          (L = S()),
          _[0] !== F || _[1] !== N
            ? ((C = (e) => {
                let t = b.getState().view;
                e !== t &&
                  ((0, T.PF)({ mint: F, fromValue: t, toValue: e }), N(e));
              }),
              (_[0] = F),
              (_[1] = N),
              (_[2] = C))
            : (C = _[2]),
          (U = C),
          _[3] !== F || _[4] !== E || _[5] !== L
            ? ((k = (e) => {
                let t = b.getState().openSort ?? L;
                e !== t &&
                  ((0, T.au)({ mint: F, fromValue: t, toValue: e }), E(e));
              }),
              (_[3] = F),
              (_[4] = E),
              (_[5] = L),
              (_[6] = k))
            : (k = _[6]),
          ($ = k),
          (D = "open" === P),
          _[7] !== $ || _[8] !== U || _[9] !== L || _[10] !== D || _[11] !== P
            ? ((w = {
                view: P,
                sort: L,
                showSortControl: D,
                onChangeView: U,
                onChangeSort: $,
              }),
              (_[7] = $),
              (_[8] = U),
              (_[9] = L),
              (_[10] = D),
              (_[11] = P),
              (_[12] = w))
            : (w = _[12]),
          w);
        B[0] !== H
          ? ((n = d.map((e) => ({
              value: e,
              label: (0, t.jsx)("span", {
                "data-testid": `coin-callouts-view-${e}`,
                children: H(p[e]),
              }),
            }))),
            (B[0] = H),
            (B[1] = n))
          : (n = B[1]);
        let Q = n;
        B[2] !== H
          ? ((h = c.map((e) => ({ value: e, label: H(m[e]) }))),
            (B[2] = H),
            (B[3] = h))
          : (h = B[3]);
        let X = h,
          Y = I[R];
        return (
          B[4] !== O || B[5] !== Y
            ? ((f = (0, l.c)(Y, O)), (B[4] = O), (B[5] = Y), (B[6] = f))
            : (f = B[6]),
          B[7] !== H
            ? ((y = H("coin_details.sections.callouts.title")),
              (B[7] = H),
              (B[8] = y))
            : (y = B[8]),
          B[9] !== K || B[10] !== y || B[11] !== W || B[12] !== Q
            ? ((v = (0, t.jsx)(s.X, {
                density: "terminal",
                "aria-label": y,
                value: W,
                onValueChange: K,
                options: Q,
              })),
              (B[9] = K),
              (B[10] = y),
              (B[11] = W),
              (B[12] = Q),
              (B[13] = v))
            : (v = B[13]),
          B[14] !== q ||
          B[15] !== z ||
          B[16] !== G ||
          B[17] !== X ||
          B[18] !== H
            ? ((g = z
                ? (0, t.jsx)(o.f, {
                    density: "terminal",
                    "aria-label": H("common.sort_by"),
                    value: G,
                    label: H(u[G]),
                    onChange: q,
                    options: X,
                    leading: (0, t.jsx)(i.v_, { "aria-hidden": !0 }),
                    align: "end",
                    className: "ml-auto",
                    "data-testid": "coin-callouts-sort",
                  })
                : null),
              (B[14] = q),
              (B[15] = z),
              (B[16] = G),
              (B[17] = X),
              (B[18] = H),
              (B[19] = g))
            : (g = B[19]),
          B[20] !== f ||
          B[21] !== v ||
          B[22] !== g ||
          B[23] !== R ||
          B[24] !== W
            ? ((x = (0, t.jsxs)("div", {
                "data-testid": "coin-callouts-feed-controls",
                "data-variant": R,
                "data-view": W,
                className: f,
                children: [v, g],
              })),
              (B[20] = f),
              (B[21] = v),
              (B[22] = g),
              (B[23] = R),
              (B[24] = W),
              (B[25] = x))
            : (x = B[25]),
          x
        );
      },
    ],
    811619,
  );
};
