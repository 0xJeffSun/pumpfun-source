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
      let a,
        n,
        o,
        s,
        c,
        d,
        u = (0, r.c)(32),
        {
          density: m,
          value: p,
          onChange: h,
          options: f,
          label: y,
          variant: b,
          leading: v,
          align: g,
          className: x,
          "aria-label": C,
          "data-testid": k,
        } = e,
        w = void 0 === b ? "outlined" : b,
        S = void 0 === g ? "start" : g;
      if (u[0] !== f || u[1] !== p) {
        let e;
        (u[3] !== p
          ? ((e = (e) => e.value === p), (u[3] = p), (u[4] = e))
          : (e = u[4]),
          (a = f.find(e)),
          (u[0] = f),
          (u[1] = p),
          (u[2] = a));
      } else a = u[2];
      let _ = a,
        P = y ?? _?.label ?? p;
      (u[5] !== x || u[6] !== m || u[7] !== v || u[8] !== P || u[9] !== w
        ? ((n = (0, t.jsx)(i.p, {
            density: m,
            variant: w,
            leading: v,
            trailing: !0,
            className: x,
            children: P,
          })),
          (u[5] = x),
          (u[6] = m),
          (u[7] = v),
          (u[8] = P),
          (u[9] = w),
          (u[10] = n))
        : (n = u[10]),
        u[11] !== C || u[12] !== n || u[13] !== k || u[14] !== p
          ? ((o = (0, t.jsx)(l.g, {
              "aria-label": C,
              "data-testid": k,
              "data-value": p,
              render: n,
            })),
            (u[11] = C),
            (u[12] = n),
            (u[13] = k),
            (u[14] = p),
            (u[15] = o))
          : (o = u[15]));
      let N = "terminal" === m;
      if (u[16] !== h || u[17] !== f || u[18] !== k || u[19] !== p) {
        let e;
        (u[21] !== h || u[22] !== k || u[23] !== p
          ? ((e = (e) =>
              (0, t.jsx)(
                l.d,
                {
                  active: e.value === p,
                  onClick: () => {
                    e.value !== p && h(e.value);
                  },
                  "data-testid": k ? `${k}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = h),
            (u[22] = k),
            (u[23] = p),
            (u[24] = e))
          : (e = u[24]),
          (s = f.map(e)),
          (u[16] = h),
          (u[17] = f),
          (u[18] = k),
          (u[19] = p),
          (u[20] = s));
      } else s = u[20];
      return (
        u[25] !== S || u[26] !== N || u[27] !== s
          ? ((c = (0, t.jsx)(l.A, {
              align: S,
              dense: N,
              className: "min-w-[11rem]",
              children: s,
            })),
            (u[25] = S),
            (u[26] = N),
            (u[27] = s),
            (u[28] = c))
          : (c = u[28]),
        u[29] !== o || u[30] !== c
          ? ((d = (0, t.jsxs)(l.k, { modal: !1, children: [o, c] })),
            (u[29] = o),
            (u[30] = c),
            (u[31] = d))
          : (d = u[31]),
        d
      );
    },
  ]);
};
