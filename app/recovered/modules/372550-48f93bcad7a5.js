// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(441315),
    r = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        n,
        o,
        s,
        d,
        c,
        u = (0, i.c)(32),
        {
          density: m,
          value: f,
          onChange: y,
          options: h,
          label: p,
          variant: x,
          leading: b,
          align: v,
          className: g,
          "aria-label": C,
          "data-testid": w,
        } = e,
        k = void 0 === x ? "outlined" : x,
        _ = void 0 === v ? "start" : v;
      if (u[0] !== h || u[1] !== f) {
        let e;
        (u[3] !== f
          ? ((e = (e) => e.value === f), (u[3] = f), (u[4] = e))
          : (e = u[4]),
          (a = h.find(e)),
          (u[0] = h),
          (u[1] = f),
          (u[2] = a));
      } else a = u[2];
      let j = a,
        A = p ?? j?.label ?? f;
      (u[5] !== g || u[6] !== m || u[7] !== b || u[8] !== A || u[9] !== k
        ? ((n = (0, t.jsx)(l.p, {
            density: m,
            variant: k,
            leading: b,
            trailing: !0,
            className: g,
            children: A,
          })),
          (u[5] = g),
          (u[6] = m),
          (u[7] = b),
          (u[8] = A),
          (u[9] = k),
          (u[10] = n))
        : (n = u[10]),
        u[11] !== C || u[12] !== n || u[13] !== w || u[14] !== f
          ? ((o = (0, t.jsx)(r.g, {
              "aria-label": C,
              "data-testid": w,
              "data-value": f,
              render: n,
            })),
            (u[11] = C),
            (u[12] = n),
            (u[13] = w),
            (u[14] = f),
            (u[15] = o))
          : (o = u[15]));
      let I = "terminal" === m;
      if (u[16] !== y || u[17] !== h || u[18] !== w || u[19] !== f) {
        let e;
        (u[21] !== y || u[22] !== w || u[23] !== f
          ? ((e = (e) =>
              (0, t.jsx)(
                r.d,
                {
                  active: e.value === f,
                  onClick: () => {
                    e.value !== f && y(e.value);
                  },
                  "data-testid": w ? `${w}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = y),
            (u[22] = w),
            (u[23] = f),
            (u[24] = e))
          : (e = u[24]),
          (s = h.map(e)),
          (u[16] = y),
          (u[17] = h),
          (u[18] = w),
          (u[19] = f),
          (u[20] = s));
      } else s = u[20];
      return (
        u[25] !== _ || u[26] !== I || u[27] !== s
          ? ((d = (0, t.jsx)(r.A, {
              align: _,
              dense: I,
              className: "min-w-[11rem]",
              children: s,
            })),
            (u[25] = _),
            (u[26] = I),
            (u[27] = s),
            (u[28] = d))
          : (d = u[28]),
        u[29] !== o || u[30] !== d
          ? ((c = (0, t.jsxs)(r.k, { modal: !1, children: [o, d] })),
            (u[29] = o),
            (u[30] = d),
            (u[31] = c))
          : (c = u[31]),
        c
      );
    },
  ]);
};
