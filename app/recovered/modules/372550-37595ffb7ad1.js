// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(441315),
    i = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        n,
        o,
        s,
        d,
        c,
        u = (0, r.c)(32),
        {
          density: f,
          value: m,
          onChange: p,
          options: b,
          label: h,
          variant: v,
          leading: x,
          align: g,
          className: y,
          "aria-label": w,
          "data-testid": j,
        } = e,
        N = void 0 === v ? "outlined" : v,
        R = void 0 === g ? "start" : g;
      if (u[0] !== b || u[1] !== m) {
        let e;
        (u[3] !== m
          ? ((e = (e) => e.value === m), (u[3] = m), (u[4] = e))
          : (e = u[4]),
          (l = b.find(e)),
          (u[0] = b),
          (u[1] = m),
          (u[2] = l));
      } else l = u[2];
      let k = l,
        _ = h ?? k?.label ?? m;
      (u[5] !== y || u[6] !== f || u[7] !== x || u[8] !== _ || u[9] !== N
        ? ((n = (0, t.jsx)(a.p, {
            density: f,
            variant: N,
            leading: x,
            trailing: !0,
            className: y,
            children: _,
          })),
          (u[5] = y),
          (u[6] = f),
          (u[7] = x),
          (u[8] = _),
          (u[9] = N),
          (u[10] = n))
        : (n = u[10]),
        u[11] !== w || u[12] !== n || u[13] !== j || u[14] !== m
          ? ((o = (0, t.jsx)(i.g, {
              "aria-label": w,
              "data-testid": j,
              "data-value": m,
              render: n,
            })),
            (u[11] = w),
            (u[12] = n),
            (u[13] = j),
            (u[14] = m),
            (u[15] = o))
          : (o = u[15]));
      let A = "terminal" === f;
      if (u[16] !== p || u[17] !== b || u[18] !== j || u[19] !== m) {
        let e;
        (u[21] !== p || u[22] !== j || u[23] !== m
          ? ((e = (e) =>
              (0, t.jsx)(
                i.d,
                {
                  active: e.value === m,
                  onClick: () => {
                    e.value !== m && p(e.value);
                  },
                  "data-testid": j ? `${j}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = p),
            (u[22] = j),
            (u[23] = m),
            (u[24] = e))
          : (e = u[24]),
          (s = b.map(e)),
          (u[16] = p),
          (u[17] = b),
          (u[18] = j),
          (u[19] = m),
          (u[20] = s));
      } else s = u[20];
      return (
        u[25] !== R || u[26] !== A || u[27] !== s
          ? ((d = (0, t.jsx)(i.A, {
              align: R,
              dense: A,
              className: "min-w-[11rem]",
              children: s,
            })),
            (u[25] = R),
            (u[26] = A),
            (u[27] = s),
            (u[28] = d))
          : (d = u[28]),
        u[29] !== o || u[30] !== d
          ? ((c = (0, t.jsxs)(i.k, { modal: !1, children: [o, d] })),
            (u[29] = o),
            (u[30] = d),
            (u[31] = c))
          : (c = u[31]),
        c
      );
    },
  ]);
};
