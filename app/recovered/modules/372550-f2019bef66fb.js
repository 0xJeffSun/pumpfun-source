// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(441315),
    a = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        l,
        o,
        s,
        c,
        d,
        m = (0, i.c)(32),
        {
          density: x,
          value: u,
          onChange: p,
          options: b,
          label: f,
          variant: h,
          leading: g,
          align: y,
          className: v,
          "aria-label": _,
          "data-testid": w,
        } = e,
        N = void 0 === h ? "outlined" : h,
        k = void 0 === y ? "start" : y;
      if (m[0] !== b || m[1] !== u) {
        let e;
        (m[3] !== u
          ? ((e = (e) => e.value === u), (m[3] = u), (m[4] = e))
          : (e = m[4]),
          (n = b.find(e)),
          (m[0] = b),
          (m[1] = u),
          (m[2] = n));
      } else n = m[2];
      let j = n,
        S = f ?? j?.label ?? u;
      (m[5] !== v || m[6] !== x || m[7] !== g || m[8] !== S || m[9] !== N
        ? ((l = (0, t.jsx)(r.p, {
            density: x,
            variant: N,
            leading: g,
            trailing: !0,
            className: v,
            children: S,
          })),
          (m[5] = v),
          (m[6] = x),
          (m[7] = g),
          (m[8] = S),
          (m[9] = N),
          (m[10] = l))
        : (l = m[10]),
        m[11] !== _ || m[12] !== l || m[13] !== w || m[14] !== u
          ? ((o = (0, t.jsx)(a.g, {
              "aria-label": _,
              "data-testid": w,
              "data-value": u,
              render: l,
            })),
            (m[11] = _),
            (m[12] = l),
            (m[13] = w),
            (m[14] = u),
            (m[15] = o))
          : (o = m[15]));
      let C = "terminal" === x;
      if (m[16] !== p || m[17] !== b || m[18] !== w || m[19] !== u) {
        let e;
        (m[21] !== p || m[22] !== w || m[23] !== u
          ? ((e = (e) =>
              (0, t.jsx)(
                a.d,
                {
                  active: e.value === u,
                  onClick: () => {
                    e.value !== u && p(e.value);
                  },
                  "data-testid": w ? `${w}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (m[21] = p),
            (m[22] = w),
            (m[23] = u),
            (m[24] = e))
          : (e = m[24]),
          (s = b.map(e)),
          (m[16] = p),
          (m[17] = b),
          (m[18] = w),
          (m[19] = u),
          (m[20] = s));
      } else s = m[20];
      return (
        m[25] !== k || m[26] !== C || m[27] !== s
          ? ((c = (0, t.jsx)(a.A, {
              align: k,
              dense: C,
              className: "min-w-[11rem]",
              children: s,
            })),
            (m[25] = k),
            (m[26] = C),
            (m[27] = s),
            (m[28] = c))
          : (c = m[28]),
        m[29] !== o || m[30] !== c
          ? ((d = (0, t.jsxs)(a.k, { modal: !1, children: [o, c] })),
            (m[29] = o),
            (m[30] = c),
            (m[31] = d))
          : (d = m[31]),
        d
      );
    },
  ]);
};
