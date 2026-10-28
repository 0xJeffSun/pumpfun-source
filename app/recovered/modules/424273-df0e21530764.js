// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(300157),
    n = e.i(605587);
  let i = (e, t) => {
    let i = (0, r.y)({ mint: t.mint, chainId: t.chain_id });
    return e && e.find((e) => (0, n.I)(e.item_id, i));
  };
  var a = e.i(960107),
    l = e.i(906032);
  let s = [];
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          n,
          o,
          c = (0, t.c)(11);
        c[0] !== e
          ? ((r = void 0 === e ? {} : e), (c[0] = e), (c[1] = r))
          : (r = c[1]);
        let { enabled: u, bookmarkId: d } = r,
          f = void 0 === u || u,
          m = void 0 === d ? l.f : d,
          {
            bookmarkedCoins: p,
            bookmarkedItems: h,
            bookmarks: g,
            bookmarkedCoinsLoading: x,
            bookmarkedCoinsIsError: v,
          } = (0, a.j)(f, f, 0, 50, !0, m);
        e: {
          let e;
          if (!p.length) {
            n = s;
            break e;
          }
          if (c[2] !== m || c[3] !== p || c[4] !== h || c[5] !== g) {
            let t;
            ((e = [...p].sort(
              ((t =
                g.find((e) => (m === l.f ? "default" === e.name : e.id === m))
                  ?.bookmark_items_with_created_at ?? h),
              (e, r) => {
                let n = i(t, e),
                  a = i(t, r);
                return n?.created_at && a?.created_at
                  ? new Date(a.created_at) - new Date(n.created_at)
                  : 1;
              }),
            )),
              (c[2] = m),
              (c[3] = p),
              (c[4] = h),
              (c[5] = g),
              (c[6] = e));
          } else e = c[6];
          n = e;
        }
        let y = n,
          b = v && 0 === y.length;
        return (
          c[7] !== x || c[8] !== y || c[9] !== b
            ? ((o = { coins: y, isLoading: x, isError: b }),
              (c[7] = x),
              (c[8] = y),
              (c[9] = b),
              (c[10] = o))
            : (o = c[10]),
          o
        );
      },
    ],
    424273,
  );
};
