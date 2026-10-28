// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(441315),
    l = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let r,
        n,
        o,
        s,
        d,
        c,
        u = (0, i.c)(32),
        {
          density: m,
          value: f,
          onChange: p,
          options: h,
          label: b,
          variant: y,
          leading: x,
          align: v,
          className: g,
          "aria-label": w,
          "data-testid": k,
        } = e,
        C = void 0 === y ? "outlined" : y,
        N = void 0 === v ? "start" : v;
      if (u[0] !== h || u[1] !== f) {
        let e;
        (u[3] !== f
          ? ((e = (e) => e.value === f), (u[3] = f), (u[4] = e))
          : (e = u[4]),
          (r = h.find(e)),
          (u[0] = h),
          (u[1] = f),
          (u[2] = r));
      } else r = u[2];
      let j = r,
        I = b ?? j?.label ?? f;
      (u[5] !== g || u[6] !== m || u[7] !== x || u[8] !== I || u[9] !== C
        ? ((n = (0, t.jsx)(a.p, {
            density: m,
            variant: C,
            leading: x,
            trailing: !0,
            className: g,
            children: I,
          })),
          (u[5] = g),
          (u[6] = m),
          (u[7] = x),
          (u[8] = I),
          (u[9] = C),
          (u[10] = n))
        : (n = u[10]),
        u[11] !== w || u[12] !== n || u[13] !== k || u[14] !== f
          ? ((o = (0, t.jsx)(l.g, {
              "aria-label": w,
              "data-testid": k,
              "data-value": f,
              render: n,
            })),
            (u[11] = w),
            (u[12] = n),
            (u[13] = k),
            (u[14] = f),
            (u[15] = o))
          : (o = u[15]));
      let _ = "terminal" === m;
      if (u[16] !== p || u[17] !== h || u[18] !== k || u[19] !== f) {
        let e;
        (u[21] !== p || u[22] !== k || u[23] !== f
          ? ((e = (e) =>
              (0, t.jsx)(
                l.d,
                {
                  active: e.value === f,
                  onClick: () => {
                    e.value !== f && p(e.value);
                  },
                  "data-testid": k ? `${k}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = p),
            (u[22] = k),
            (u[23] = f),
            (u[24] = e))
          : (e = u[24]),
          (s = h.map(e)),
          (u[16] = p),
          (u[17] = h),
          (u[18] = k),
          (u[19] = f),
          (u[20] = s));
      } else s = u[20];
      return (
        u[25] !== N || u[26] !== _ || u[27] !== s
          ? ((d = (0, t.jsx)(l.A, {
              align: N,
              dense: _,
              className: "min-w-[11rem]",
              children: s,
            })),
            (u[25] = N),
            (u[26] = _),
            (u[27] = s),
            (u[28] = d))
          : (d = u[28]),
        u[29] !== o || u[30] !== d
          ? ((c = (0, t.jsxs)(l.k, { modal: !1, children: [o, d] })),
            (u[29] = o),
            (u[30] = d),
            (u[31] = c))
          : (c = u[31]),
        c
      );
    },
  ]);
};
