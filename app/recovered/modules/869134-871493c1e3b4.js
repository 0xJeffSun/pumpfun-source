// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var i = e.i(547562),
    a = e.i(221930);
  function n(e) {
    return e.length >= a.X ? e : [...e, { ...a.Z }];
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        r,
        s,
        l,
        o,
        c,
        d,
        m,
        u = (0, t.c)(24),
        [p, f] = (0, i.l)("trading.profileQuickTradeButtons");
      u[0] !== f
        ? ((e = (e, t) => {
            f((i) => {
              if (e < 0 || e >= i.length) return i;
              let a = [...i];
              return ((a[e] = t(a[e])), a);
            });
          }),
          (u[0] = f),
          (u[1] = e))
        : (e = u[1]);
      let x = e;
      u[2] !== x
        ? ((r = (e, t) => {
            x(e, (e) =>
              e.side === t
                ? e
                : "sell" === t
                  ? (0, a.I)(a.W)
                  : (0, a.h)(a.P, a.y),
            );
          }),
          (u[2] = x),
          (u[3] = r))
        : (r = u[3]);
      let g = r;
      u[4] !== x
        ? ((s = (e, t) => {
            x(e, (e) => ("sell" === e.side ? (0, a.I)(t) : e));
          }),
          (u[4] = x),
          (u[5] = s))
        : (s = u[5]);
      let h = s;
      u[6] !== x
        ? ((l = (e, t, i) => {
            x(e, (e) =>
              "buy" !== e.side
                ? e
                : "sol" === t
                  ? (0, a.h)(i, e.usdc)
                  : (0, a.h)(e.sol, i),
            );
          }),
          (u[6] = x),
          (u[7] = l))
        : (l = u[7]);
      let b = l;
      u[8] !== f
        ? ((o = () => {
            f(n);
          }),
          (u[8] = f),
          (u[9] = o))
        : (o = u[9]);
      let y = o;
      u[10] !== f
        ? ((c = (e) => {
            f((t) => (t.length <= 1 ? t : t.filter((t, i) => i !== e)));
          }),
          (u[10] = f),
          (u[11] = c))
        : (c = u[11]);
      let v = c;
      u[12] !== f
        ? ((d = () => f((0, a.e)())), (u[12] = f), (u[13] = d))
        : (d = u[13]);
      let w = d,
        _ = p.length < a.X,
        k = p.length > 1;
      return (
        u[14] !== y ||
        u[15] !== v ||
        u[16] !== w ||
        u[17] !== b ||
        u[18] !== h ||
        u[19] !== g ||
        u[20] !== _ ||
        u[21] !== k ||
        u[22] !== p
          ? ((m = {
              values: p,
              setSide: g,
              setSellPercent: h,
              setBuyAmount: b,
              addButton: y,
              removeButton: v,
              reset: w,
              canAddButton: _,
              canRemoveButton: k,
            }),
            (u[14] = y),
            (u[15] = v),
            (u[16] = w),
            (u[17] = b),
            (u[18] = h),
            (u[19] = g),
            (u[20] = _),
            (u[21] = k),
            (u[22] = p),
            (u[23] = m))
          : (m = u[23]),
        m
      );
    },
  ]);
};
