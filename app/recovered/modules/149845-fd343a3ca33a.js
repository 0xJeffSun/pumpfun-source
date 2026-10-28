// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(574472),
    a = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(56267),
    l = e.i(66732),
    o = e.i(887827),
    c = e.i(510021),
    m = e.i(960107),
    d = e.i(300157),
    u = e.i(338319);
  let h = (0, a.memo)((e) => {
    let h,
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
      F = (0, r.c)(55),
      {
        coin: E,
        isBookmarked: R,
        addToBookmark: O,
        removeFromBookmark: B,
        onManageWatchlistClick: D,
        position: M,
        analytics: z,
        align: L,
      } = e,
      U = void 0 === L ? "end" : L,
      { t: q } = (0, n.f)(),
      { decodedJwt: H } = (0, i.F)(),
      [P, W] = (0, a.useState)(!1),
      [K, V] = (0, a.useState)(!1),
      [G, Q] = (0, a.useState)(!1);
    H?.address;
    let Y = !!H?.address,
      {
        bookmarks: J,
        createBookmark: $,
        deleteBookmark: X,
        updateBookmarkName: Z,
        checkIfCoinIsBookmarked: ee,
        addToBookmark: et,
        removeFromBookmark: er,
      } = (0, m.j)(!1, Y),
      ei = O ?? et,
      ea = B ?? er;
    F[0] !== E.chain_id || F[1] !== E.mint
      ? ((h = (0, d.y)({ mint: E.mint, chainId: E.chain_id })),
        (F[0] = E.chain_id),
        (F[1] = E.mint),
        (F[2] = h))
      : (h = F[2]);
    let en = h;
    F[3] !== en || F[4] !== ee
      ? ((p = ee(en)), (F[3] = en), (F[4] = ee), (F[5] = p))
      : (p = F[5]);
    let es = p ?? R;
    F[6] !== J
      ? ((y = J?.reduce(x, {}) || {}), (F[6] = J), (F[7] = y))
      : (y = F[7]);
    let el = y;
    F[8] !== ei ||
    F[9] !== z ||
    F[10] !== en ||
    F[11] !== el ||
    F[12] !== E.mint ||
    F[13] !== M ||
    F[14] !== ea
      ? ((v = (e) => {
          let t = el[e];
          ((0, m.w)(t, en)
            ? (z && void 0 !== M && z.trackBookmarkToggle(E.mint, "remove", M),
              ea((0, m.T)(t, en), e))
            : (z && void 0 !== M && z.trackBookmarkToggle(E.mint, "add", M),
              W(!0),
              ei(en, e),
              setTimeout(() => W(!1), 600)),
            V(!1));
        }),
        (F[8] = ei),
        (F[9] = z),
        (F[10] = en),
        (F[11] = el),
        (F[12] = E.mint),
        (F[13] = M),
        (F[14] = ea),
        (F[15] = v))
      : (v = F[15]);
    let eo = v;
    F[16] !== D
      ? ((g = () => {
          (D ? D() : Q(!0), V(!1));
        }),
        (F[16] = D),
        (F[17] = g))
      : (g = F[17]);
    let ec = g;
    F[18] === Symbol.for("react.memo_cache_sentinel")
      ? ((w = (e) => {
          (e.preventDefault(), e.stopPropagation(), V(!0));
        }),
        (F[18] = w))
      : (w = F[18]);
    let em = w;
    F[19] !== es || F[20] !== q
      ? ((k = q(
          es
            ? "web.watchlist.remove_from_watchlist"
            : "web.watchlist.add_to_watchlist",
        )),
        (F[19] = es),
        (F[20] = q),
        (F[21] = k))
      : (k = F[21]);
    let ed = es
        ? "fill-positive text-positive"
        : "fill-none text-text-tertiary hover:text-positive",
      eu = P && "animate-pulse";
    return (
      F[22] !== eu || F[23] !== ed
        ? ((N = (0, u.c)("h-4 w-4", ed, eu)),
          (F[22] = eu),
          (F[23] = ed),
          (F[24] = N))
        : (N = F[24]),
      F[25] !== N
        ? ((j = (0, t.jsx)(s.j, { className: N })), (F[25] = N), (F[26] = j))
        : (j = F[26]),
      F[27] !== j || F[28] !== k
        ? ((_ = (0, t.jsx)(l.J, {
            asChild: !0,
            children: (0, t.jsx)("button", {
              onClick: em,
              className:
                "flex h-6 w-6 items-center justify-center rounded-sm transition-transform hover:scale-110 hover:bg-bg-secondary",
              "aria-label": k,
              children: j,
            }),
          })),
          (F[27] = j),
          (F[28] = k),
          (F[29] = _))
        : (_ = F[29]),
      F[30] !== en ||
      F[31] !== el ||
      F[32] !== J ||
      F[33] !== eo ||
      F[34] !== ec ||
      F[35] !== Y ||
      F[36] !== q
        ? ((C = Y
            ? (0, t.jsx)(o.f, {
                bookmarks: J || [],
                bookmarkedItems: el,
                mint: en,
                onBookmarkClick: eo,
                onManageClick: ec,
              })
            : (0, t.jsx)("div", {
                className: "p-3 text-sm text-text-tertiary",
                children: q("web.watchlist.log_in_to_bookmark"),
              })),
          (F[30] = en),
          (F[31] = el),
          (F[32] = J),
          (F[33] = eo),
          (F[34] = ec),
          (F[35] = Y),
          (F[36] = q),
          (F[37] = C))
        : (C = F[37]),
      F[38] !== U || F[39] !== C
        ? ((I = (0, t.jsx)(l.T, {
            className:
              "w-48 border-border-secondary bg-bg-secondary p-0 text-text-primary",
            align: U,
            side: "bottom",
            children: C,
          })),
          (F[38] = U),
          (F[39] = C),
          (F[40] = I))
        : (I = F[40]),
      F[41] !== K || F[42] !== _ || F[43] !== I
        ? ((S = (0, t.jsx)("div", {
            className: "flex justify-center",
            children: (0, t.jsx)("div", {
              className: "flex-shrink-0",
              onClick: f,
              onMouseDown: b,
              children: (0, t.jsxs)(l.V, {
                open: K,
                onOpenChange: V,
                children: [_, I],
              }),
            }),
          })),
          (F[41] = K),
          (F[42] = _),
          (F[43] = I),
          (F[44] = S))
        : (S = F[44]),
      F[45] !== J ||
      F[46] !== $ ||
      F[47] !== X ||
      F[48] !== G ||
      F[49] !== D ||
      F[50] !== Z
        ? ((T =
            !D &&
            (0, t.jsx)(c.ManageWatchlistDialog, {
              isOpen: G,
              onOpenChange: Q,
              bookmarks: J || [],
              createBookmark: $,
              deleteBookmark: X,
              updateBookmarkName: Z,
            })),
          (F[45] = J),
          (F[46] = $),
          (F[47] = X),
          (F[48] = G),
          (F[49] = D),
          (F[50] = Z),
          (F[51] = T))
        : (T = F[51]),
      F[52] !== S || F[53] !== T
        ? ((A = (0, t.jsxs)(t.Fragment, { children: [S, T] })),
          (F[52] = S),
          (F[53] = T),
          (F[54] = A))
        : (A = F[54]),
      A
    );
  });
  function x(e, t) {
    return ((e[t.id] = t.bookmark_items), e);
  }
  function f(e) {
    return e.stopPropagation();
  }
  function b(e) {
    return e.stopPropagation();
  }
  ((h.displayName = "BookmarkCell"), e.s(["f", 0, h]));
};
