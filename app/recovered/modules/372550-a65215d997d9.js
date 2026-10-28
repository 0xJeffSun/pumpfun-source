// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(441315),
    l = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        a,
        s,
        o,
        d,
        c,
        u = (0, r.c)(32),
        {
          density: m,
          value: h,
          onChange: f,
          options: x,
          label: p,
          variant: y,
          leading: v,
          align: w,
          className: b,
          "aria-label": g,
          "data-testid": j,
        } = e,
        _ = void 0 === y ? "outlined" : y,
        k = void 0 === w ? "start" : w;
      if (u[0] !== x || u[1] !== h) {
        let e;
        (u[3] !== h
          ? ((e = (e) => e.value === h), (u[3] = h), (u[4] = e))
          : (e = u[4]),
          (n = x.find(e)),
          (u[0] = x),
          (u[1] = h),
          (u[2] = n));
      } else n = u[2];
      let C = n,
        N = p ?? C?.label ?? h;
      (u[5] !== b || u[6] !== m || u[7] !== v || u[8] !== N || u[9] !== _
        ? ((a = (0, t.jsx)(i.p, {
            density: m,
            variant: _,
            leading: v,
            trailing: !0,
            className: b,
            children: N,
          })),
          (u[5] = b),
          (u[6] = m),
          (u[7] = v),
          (u[8] = N),
          (u[9] = _),
          (u[10] = a))
        : (a = u[10]),
        u[11] !== g || u[12] !== a || u[13] !== j || u[14] !== h
          ? ((s = (0, t.jsx)(l.g, {
              "aria-label": g,
              "data-testid": j,
              "data-value": h,
              render: a,
            })),
            (u[11] = g),
            (u[12] = a),
            (u[13] = j),
            (u[14] = h),
            (u[15] = s))
          : (s = u[15]));
      let A = "terminal" === m;
      if (u[16] !== f || u[17] !== x || u[18] !== j || u[19] !== h) {
        let e;
        (u[21] !== f || u[22] !== j || u[23] !== h
          ? ((e = (e) =>
              (0, t.jsx)(
                l.d,
                {
                  active: e.value === h,
                  onClick: () => {
                    e.value !== h && f(e.value);
                  },
                  "data-testid": j ? `${j}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = f),
            (u[22] = j),
            (u[23] = h),
            (u[24] = e))
          : (e = u[24]),
          (o = x.map(e)),
          (u[16] = f),
          (u[17] = x),
          (u[18] = j),
          (u[19] = h),
          (u[20] = o));
      } else o = u[20];
      return (
        u[25] !== k || u[26] !== A || u[27] !== o
          ? ((d = (0, t.jsx)(l.A, {
              align: k,
              dense: A,
              className: "min-w-[11rem]",
              children: o,
            })),
            (u[25] = k),
            (u[26] = A),
            (u[27] = o),
            (u[28] = d))
          : (d = u[28]),
        u[29] !== s || u[30] !== d
          ? ((c = (0, t.jsxs)(l.k, { modal: !1, children: [s, d] })),
            (u[29] = s),
            (u[30] = d),
            (u[31] = c))
          : (c = u[31]),
        c
      );
    },
  ]);
};
