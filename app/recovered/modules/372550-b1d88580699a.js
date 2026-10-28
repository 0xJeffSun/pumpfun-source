// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(441315),
    o = e.i(764844);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a,
        n,
        s,
        c,
        d,
        u = (0, r.c)(32),
        {
          density: m,
          value: p,
          onChange: b,
          options: h,
          label: y,
          variant: f,
          leading: g,
          align: v,
          className: x,
          "aria-label": w,
          "data-testid": C,
        } = e,
        k = void 0 === f ? "outlined" : f,
        S = void 0 === v ? "start" : v;
      if (u[0] !== h || u[1] !== p) {
        let e;
        (u[3] !== p
          ? ((e = (e) => e.value === p), (u[3] = p), (u[4] = e))
          : (e = u[4]),
          (i = h.find(e)),
          (u[0] = h),
          (u[1] = p),
          (u[2] = i));
      } else i = u[2];
      let N = i,
        P = y ?? N?.label ?? p;
      (u[5] !== x || u[6] !== m || u[7] !== g || u[8] !== P || u[9] !== k
        ? ((a = (0, t.jsx)(l.p, {
            density: m,
            variant: k,
            leading: g,
            trailing: !0,
            className: x,
            children: P,
          })),
          (u[5] = x),
          (u[6] = m),
          (u[7] = g),
          (u[8] = P),
          (u[9] = k),
          (u[10] = a))
        : (a = u[10]),
        u[11] !== w || u[12] !== a || u[13] !== C || u[14] !== p
          ? ((n = (0, t.jsx)(o.g, {
              "aria-label": w,
              "data-testid": C,
              "data-value": p,
              render: a,
            })),
            (u[11] = w),
            (u[12] = a),
            (u[13] = C),
            (u[14] = p),
            (u[15] = n))
          : (n = u[15]));
      let j = "terminal" === m;
      if (u[16] !== b || u[17] !== h || u[18] !== C || u[19] !== p) {
        let e;
        (u[21] !== b || u[22] !== C || u[23] !== p
          ? ((e = (e) =>
              (0, t.jsx)(
                o.d,
                {
                  active: e.value === p,
                  onClick: () => {
                    e.value !== p && b(e.value);
                  },
                  "data-testid": C ? `${C}-option-${e.value}` : void 0,
                  children: e.label,
                },
                e.value,
              )),
            (u[21] = b),
            (u[22] = C),
            (u[23] = p),
            (u[24] = e))
          : (e = u[24]),
          (s = h.map(e)),
          (u[16] = b),
          (u[17] = h),
          (u[18] = C),
          (u[19] = p),
          (u[20] = s));
      } else s = u[20];
      return (
        u[25] !== S || u[26] !== j || u[27] !== s
          ? ((c = (0, t.jsx)(o.A, {
              align: S,
              dense: j,
              className: "min-w-[11rem]",
              children: s,
            })),
            (u[25] = S),
            (u[26] = j),
            (u[27] = s),
            (u[28] = c))
          : (c = u[28]),
        u[29] !== n || u[30] !== c
          ? ((d = (0, t.jsxs)(o.k, { modal: !1, children: [n, c] })),
            (u[29] = n),
            (u[30] = c),
            (u[31] = d))
          : (d = u[31]),
        d
      );
    },
  ]);
};
