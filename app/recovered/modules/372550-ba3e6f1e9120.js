// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(441315),
    a = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        n,
        l,
        o,
        c,
        d,
        u = (0, r.c)(32),
        {
          density: m,
          value: p,
          onChange: f,
          options: x,
          label: g,
          variant: h,
          leading: b,
          align: y,
          className: v,
          "aria-label": w,
          "data-testid": N,
        } = e,
        j = void 0 === h ? "outlined" : h,
        k = void 0 === y ? "start" : y;
      if (u[0] !== x || u[1] !== p) {
        let e;
        (u[3] !== p
          ? ((e = (e) => e.value === p), (u[3] = p), (u[4] = e))
          : (e = u[4]),
          (s = x.find(e)),
          (u[0] = x),
          (u[1] = p),
          (u[2] = s));
      } else s = u[2];
      let C = s,
        P = g ?? C?.label ?? p;
      (u[5] !== v || u[6] !== m || u[7] !== b || u[8] !== P || u[9] !== j
        ? ((n = (0, t.jsx)(i.p, {
            density: m,
            variant: j,
            leading: b,
            trailing: !0,
            className: v,
            children: P,
          })),
          (u[5] = v),
          (u[6] = m),
          (u[7] = b),
          (u[8] = P),
          (u[9] = j),
          (u[10] = n))
        : (n = u[10]),
        u[11] !== w || u[12] !== n || u[13] !== N || u[14] !== p
          ? ((l = (0, t.jsx)(a.g, {
              "aria-label": w,
              "data-testid": N,
              "data-value": p,
              render: n,
            })),
            (u[11] = w),
            (u[12] = n),
            (u[13] = N),
            (u[14] = p),
            (u[15] = l))
          : (l = u[15]));
      let _ = "terminal" === m;
      if (u[16] !== f || u[17] !== x || u[18] !== N || u[19] !== p) {
        let e;
        (u[21] !== f || u[22] !== N || u[23] !== p
          ? ((e = (e) =>
              (0, t.jsx)(
                a.d,
                {
                  active: e.value === p,
                  onClick: () => {
                    e.value !== p && f(e.value);
                  },
                  "data-testid": N ? `${N}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = f),
            (u[22] = N),
            (u[23] = p),
            (u[24] = e))
          : (e = u[24]),
          (o = x.map(e)),
          (u[16] = f),
          (u[17] = x),
          (u[18] = N),
          (u[19] = p),
          (u[20] = o));
      } else o = u[20];
      return (
        u[25] !== k || u[26] !== _ || u[27] !== o
          ? ((c = (0, t.jsx)(a.A, {
              align: k,
              dense: _,
              className: "min-w-[11rem]",
              children: o,
            })),
            (u[25] = k),
            (u[26] = _),
            (u[27] = o),
            (u[28] = c))
          : (c = u[28]),
        u[29] !== l || u[30] !== c
          ? ((d = (0, t.jsxs)(a.k, { modal: !1, children: [l, c] })),
            (u[29] = l),
            (u[30] = c),
            (u[31] = d))
          : (d = u[31]),
        d
      );
    },
  ]);
};
