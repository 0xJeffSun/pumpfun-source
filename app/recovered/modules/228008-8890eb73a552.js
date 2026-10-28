// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(352386),
    r = e.i(724423);
  let l = /^\d*\.?\d*$/;
  e.s([
    "f",
    0,
    function (e) {
      let a,
        s,
        o,
        c,
        d,
        u = (0, n.c)(15),
        {
          value: x,
          onCommit: m,
          suffix: p,
          "aria-label": f,
          className: h,
          allowZero: g,
        } = e,
        b = void 0 !== g && g,
        [j, v] = (0, i.useState)(null),
        y = j ?? String(x);
      return (
        u[0] !== x
          ? ((a = () => v(String(x))), (u[0] = x), (u[1] = a))
          : (a = u[1]),
        u[2] !== b || u[3] !== m
          ? ((s = (e) => {
              let t = e.replace(/,/g, ".");
              if (!l.test(t) || t.length > 12) return;
              v(t);
              let n = Number(t);
              "" !== t && Number.isFinite(n) && n > 0
                ? m(n)
                : b && ("" === t || 0 === n) && m(0);
            }),
            (u[2] = b),
            (u[3] = m),
            (u[4] = s))
          : (s = u[4]),
        u[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = () => v(null)), (u[5] = o))
          : (o = u[5]),
        u[6] !== p
          ? ((c = p
              ? (0, t.jsx)("span", {
                  className: "text-[11px] font-medium",
                  children: p,
                })
              : void 0),
            (u[6] = p),
            (u[7] = c))
          : (c = u[7]),
        u[8] !== f ||
        u[9] !== h ||
        u[10] !== y ||
        u[11] !== a ||
        u[12] !== s ||
        u[13] !== c
          ? ((d = (0, t.jsx)(r.N, {
              density: "terminal",
              type: "text",
              inputMode: "decimal",
              autoComplete: "off",
              spellCheck: !1,
              "aria-label": f,
              className: h,
              inputClassName: "text-right font-medium",
              value: y,
              onFocus: a,
              onValueChange: s,
              onBlur: o,
              trailing: c,
            })),
            (u[8] = f),
            (u[9] = h),
            (u[10] = y),
            (u[11] = a),
            (u[12] = s),
            (u[13] = c),
            (u[14] = d))
          : (d = u[14]),
        d
      );
    },
  ]);
};
