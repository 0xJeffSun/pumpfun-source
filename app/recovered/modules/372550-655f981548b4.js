// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(441315),
    i = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        n,
        s,
        o,
        d,
        u,
        c = (0, r.c)(32),
        {
          density: m,
          value: p,
          onChange: h,
          options: f,
          label: g,
          variant: y,
          leading: b,
          align: v,
          className: w,
          "aria-label": x,
          "data-testid": C,
        } = e,
        I = void 0 === y ? "outlined" : y,
        A = void 0 === v ? "start" : v;
      if (c[0] !== f || c[1] !== p) {
        let e;
        (c[3] !== p
          ? ((e = (e) => e.value === p), (c[3] = p), (c[4] = e))
          : (e = c[4]),
          (a = f.find(e)),
          (c[0] = f),
          (c[1] = p),
          (c[2] = a));
      } else a = c[2];
      let k = a,
        _ = g ?? k?.label ?? p;
      (c[5] !== w || c[6] !== m || c[7] !== b || c[8] !== _ || c[9] !== I
        ? ((n = (0, t.jsx)(l.p, {
            density: m,
            variant: I,
            leading: b,
            trailing: !0,
            className: w,
            children: _,
          })),
          (c[5] = w),
          (c[6] = m),
          (c[7] = b),
          (c[8] = _),
          (c[9] = I),
          (c[10] = n))
        : (n = c[10]),
        c[11] !== x || c[12] !== n || c[13] !== C || c[14] !== p
          ? ((s = (0, t.jsx)(i.g, {
              "aria-label": x,
              "data-testid": C,
              "data-value": p,
              render: n,
            })),
            (c[11] = x),
            (c[12] = n),
            (c[13] = C),
            (c[14] = p),
            (c[15] = s))
          : (s = c[15]));
      let U = "terminal" === m;
      if (c[16] !== h || c[17] !== f || c[18] !== C || c[19] !== p) {
        let e;
        (c[21] !== h || c[22] !== C || c[23] !== p
          ? ((e = (e) =>
              (0, t.jsx)(
                i.d,
                {
                  active: e.value === p,
                  onClick: () => {
                    e.value !== p && h(e.value);
                  },
                  "data-testid": C ? `${C}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (c[21] = h),
            (c[22] = C),
            (c[23] = p),
            (c[24] = e))
          : (e = c[24]),
          (o = f.map(e)),
          (c[16] = h),
          (c[17] = f),
          (c[18] = C),
          (c[19] = p),
          (c[20] = o));
      } else o = c[20];
      return (
        c[25] !== A || c[26] !== U || c[27] !== o
          ? ((d = (0, t.jsx)(i.A, {
              align: A,
              dense: U,
              className: "min-w-[11rem]",
              children: o,
            })),
            (c[25] = A),
            (c[26] = U),
            (c[27] = o),
            (c[28] = d))
          : (d = c[28]),
        c[29] !== s || c[30] !== d
          ? ((u = (0, t.jsxs)(i.k, { modal: !1, children: [s, d] })),
            (c[29] = s),
            (c[30] = d),
            (c[31] = u))
          : (u = c[31]),
        u
      );
    },
  ]);
};
