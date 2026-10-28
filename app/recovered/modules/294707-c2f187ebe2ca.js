// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(493367);
  var t = e.i(947427);
  (e.i(400648), e.i(148269));
  let r = 5,
    a = (e) => (e <= 0 ? r : e < 610 ? 0 : e < 820 ? 3 : e < 1e3 ? 4 : r),
    i = ({ held: e, from: t, limit: r }) => {
      for (let a = 0; a < r; a += 1) {
        let i = t - a;
        if (i >= 0 && !e.has(i)) return i;
        let n = t + a;
        if (n < r && !e.has(n)) return n;
      }
      return -1;
    };
  e.s(
    [
      "g",
      0,
      r,
      "H",
      0,
      (e) =>
        "social-terminal" === e.variant &&
        "table" === e.homeLayout &&
        "terminal" === e.homeFeed &&
        (0, t.n)(e.sort) &&
        0 === e.offset &&
        "" === e.searchTerm.trim() &&
        !e.hasActiveFilters,
      "z",
      0,
      a,
      "a",
      0,
      (e) => {
        let t,
          r = ((t = a(e)), e <= 0 || 0 === t ? 0 : (e - 12 * (t - 1)) / t);
        return r > 0 ? Math.max(0, Math.floor(r - 24)) : 0;
      },
      "h",
      0,
      ({ cards: e, pinned: t, visibleSlots: a = r }) => {
        let n = [...e],
          l = new Set(),
          s = [];
        for (let e of t) {
          let t = n.findIndex((t) => t.mint === e.coin.mint);
          -1 === t ? s.push(e) : l.add(t);
        }
        let o = (e) => {
          (l.add(n.length), n.push(e));
        };
        for (let { coin: e, index: t } of s) {
          let r = 0 === n.length ? -1 : Math.min(t, n.length - 1);
          if (-1 === r) {
            o(e);
            continue;
          }
          if (l.has(r)) {
            if (n.length < a) {
              o(e);
              continue;
            }
            let t = i({ held: l, from: r, limit: Math.min(n.length, a) });
            if (-1 === t) {
              o(e);
              continue;
            }
            (l.add(t), (n[t] = e));
            continue;
          }
          (l.add(r), (n[r] = e));
        }
        return n;
      },
    ],
    294707,
  );
};
