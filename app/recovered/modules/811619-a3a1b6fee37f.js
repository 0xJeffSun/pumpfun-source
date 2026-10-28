// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(426091);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(199995),
    l = e.i(372550),
    s = e.i(607122);
  let u = ["RANKED", "LATEST", "TOP"],
    d = ["open", "closed"],
    c = {
      RANKED: "coin_details.sections.callouts.sort_for_you",
      LATEST: "coin_details.sections.callouts.sort_most_recent",
      TOP: "coin_details.sections.callouts.sort_size",
    },
    f = {
      RANKED: "coin_details.sections.callouts.sort_for_you",
      LATEST: "coin_details.sections.callouts.sort_most_recent",
      TOP: "coin_details.sections.callouts.sort_size_option",
    },
    h = {
      open: "coin_details.sections.callouts.view_open",
      closed: "coin_details.sections.callouts.view_closed",
    };
  var m = e.i(352386),
    g = e.i(78436),
    p = e.i(634103);
  let b = (0, g.$)()(
      (0, p.V)(
        (e) => ({
          view: "open",
          openSort: null,
          setView: (t) => e({ view: t }),
          setOpenSort: (t) => e({ openSort: t }),
        }),
        {
          name: "coin-callouts-feed",
          storage: (0, p.j)(() => localStorage),
          version: 1,
          partialize: (e) => ({ openSort: e.openSort }),
          onRehydrateStorage: () => (e, t) => {
            t && y();
          },
          merge: (e, t) => ({
            ...t,
            openSort: ((e) => {
              if (!e || "object" != typeof e) return null;
              let t = e.openSort;
              return u.some((e) => e === t) ? t : null;
            })(e),
          }),
        },
      ),
    ),
    w = !1,
    _ = new Set(),
    y = () => {
      for (let e of ((w = !0), _)) e();
    },
    z = (e) => {
      _.add(e);
      let t = b.persist?.onFinishHydration(e);
      return () => {
        (_.delete(e), t?.());
      };
    },
    v = () => !b.persist || b.persist.hasHydrated() || w,
    x = () => !1,
    M = () => {
      let e = (0, m.useSyncExternalStore)(z, v, x),
        t = b(T);
      return e ? (t ?? "TOP") : "TOP";
    },
    S = () => b(D);
  function T(e) {
    return e.openSort;
  }
  function D(e) {
    return e.view;
  }
  e.s(
    [
      "b",
      0,
      () => {
        let e,
          t = (0, n.c)(3),
          r = S(),
          i = M();
        if (t[0] !== i || t[1] !== r)
          ((e = "closed" === r ? "CLOSED_PNL" : i),
            (t[0] = i),
            (t[1] = r),
            (t[2] = e));
        else e = t[2];
        return e;
      },
      "W",
      0,
      S,
      "G",
      0,
      M,
    ],
    67016,
  );
  var P = e.i(595673);
  function k(e) {
    return e.view;
  }
  function N(e) {
    return e.setView;
  }
  function O(e) {
    return e.setOpenSort;
  }
  let C = {
    strip: o.C,
    row: "flex min-h-9 min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-border-secondary py-1.5",
    compact:
      "flex min-h-8 min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-border-secondary px-1 pb-1.5",
  };
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          m,
          g,
          p,
          w,
          _,
          y,
          z,
          v,
          x,
          S,
          T,
          D,
          E,
          H,
          q,
          F,
          W,
          $ = (0, n.c)(26),
          { mint: Y, variant: I, className: L } = e,
          j = void 0 === I ? "strip" : I,
          { t: R } = (0, a.f)(),
          {
            view: U,
            sort: A,
            showSortControl: B,
            onChangeView: Q,
            onChangeSort: G,
          } = ((S = (0, n.c)(13)),
          (T = b(k)),
          (D = b(N)),
          (E = b(O)),
          (H = M()),
          S[0] !== Y || S[1] !== D
            ? ((z = (e) => {
                let t = b.getState().view;
                e !== t &&
                  ((0, P.PF)({ mint: Y, fromValue: t, toValue: e }), D(e));
              }),
              (S[0] = Y),
              (S[1] = D),
              (S[2] = z))
            : (z = S[2]),
          (q = z),
          S[3] !== Y || S[4] !== E || S[5] !== H
            ? ((v = (e) => {
                let t = b.getState().openSort ?? H;
                e !== t &&
                  ((0, P.au)({ mint: Y, fromValue: t, toValue: e }), E(e));
              }),
              (S[3] = Y),
              (S[4] = E),
              (S[5] = H),
              (S[6] = v))
            : (v = S[6]),
          (F = v),
          (W = "open" === T),
          S[7] !== F || S[8] !== q || S[9] !== H || S[10] !== W || S[11] !== T
            ? ((x = {
                view: T,
                sort: H,
                showSortControl: W,
                onChangeView: q,
                onChangeSort: F,
              }),
              (S[7] = F),
              (S[8] = q),
              (S[9] = H),
              (S[10] = W),
              (S[11] = T),
              (S[12] = x))
            : (x = S[12]),
          x);
        $[0] !== R
          ? ((o = d.map((e) => ({
              value: e,
              label: (0, t.jsx)("span", {
                "data-testid": `coin-callouts-view-${e}`,
                children: R(h[e]),
              }),
            }))),
            ($[0] = R),
            ($[1] = o))
          : (o = $[1]);
        let X = o;
        $[2] !== R
          ? ((m = u.map((e) => ({ value: e, label: R(f[e]) }))),
            ($[2] = R),
            ($[3] = m))
          : (m = $[3]);
        let K = m,
          V = C[j];
        return (
          $[4] !== L || $[5] !== V
            ? ((g = (0, i.c)(V, L)), ($[4] = L), ($[5] = V), ($[6] = g))
            : (g = $[6]),
          $[7] !== R
            ? ((p = R("coin_details.sections.callouts.title")),
              ($[7] = R),
              ($[8] = p))
            : (p = $[8]),
          $[9] !== Q || $[10] !== p || $[11] !== U || $[12] !== X
            ? ((w = (0, t.jsx)(s.X, {
                density: "terminal",
                "aria-label": p,
                value: U,
                onValueChange: Q,
                options: X,
              })),
              ($[9] = Q),
              ($[10] = p),
              ($[11] = U),
              ($[12] = X),
              ($[13] = w))
            : (w = $[13]),
          $[14] !== G ||
          $[15] !== B ||
          $[16] !== A ||
          $[17] !== K ||
          $[18] !== R
            ? ((_ = B
                ? (0, t.jsx)(l.f, {
                    density: "terminal",
                    "aria-label": R("common.sort_by"),
                    value: A,
                    label: R(c[A]),
                    onChange: G,
                    options: K,
                    leading: (0, t.jsx)(r.v_, { "aria-hidden": !0 }),
                    align: "end",
                    className: "ml-auto",
                    "data-testid": "coin-callouts-sort",
                  })
                : null),
              ($[14] = G),
              ($[15] = B),
              ($[16] = A),
              ($[17] = K),
              ($[18] = R),
              ($[19] = _))
            : (_ = $[19]),
          $[20] !== g ||
          $[21] !== w ||
          $[22] !== _ ||
          $[23] !== j ||
          $[24] !== U
            ? ((y = (0, t.jsxs)("div", {
                "data-testid": "coin-callouts-feed-controls",
                "data-variant": j,
                "data-view": U,
                className: g,
                children: [w, _],
              })),
              ($[20] = g),
              ($[21] = w),
              ($[22] = _),
              ($[23] = j),
              ($[24] = U),
              ($[25] = y))
            : (y = $[25]),
          y
        );
      },
    ],
    811619,
  );
};
