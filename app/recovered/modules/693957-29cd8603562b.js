// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(63526);
  e.s(["f", 0, r], 421667);
  var r = r,
    o = r;
  e.s(["f", 0, o], 923964);
  var o = r,
    i = r;
  e.s(["f", 0, i], 858184);
  var i = r,
    a = e.i(426091),
    u = e.i(388528),
    s = e.i(360827),
    l = e.i(414074);
  e.s(
    [
      "f",
      0,
      function (e) {
        let c,
          f,
          d,
          p,
          g,
          v,
          m,
          h,
          y,
          x,
          b,
          R,
          E,
          w,
          I,
          S,
          k = (0, n.c)(33);
        k[0] !== e
          ? (({
              align: p,
              alignOffset: g,
              className: c,
              density: v,
              side: m,
              sideOffset: h,
              positionMethod: f,
              collisionAvoidance: y,
              collisionPadding: x,
              ...d
            } = e),
            (k[0] = e),
            (k[1] = c),
            (k[2] = f),
            (k[3] = d),
            (k[4] = p),
            (k[5] = g),
            (k[6] = v),
            (k[7] = m),
            (k[8] = h),
            (k[9] = y),
            (k[10] = x))
          : ((c = k[1]),
            (f = k[2]),
            (d = k[3]),
            (p = k[4]),
            (g = k[5]),
            (v = k[6]),
            (m = k[7]),
            (h = k[8]),
            (y = k[9]),
            (x = k[10]));
        let C = void 0 === p ? "start" : p,
          T = void 0 === g ? 0 : g,
          M = void 0 === v ? "comfortable" : v,
          O = void 0 === m ? "bottom" : m,
          P = void 0 === h ? 4 : h;
        k[11] !== y
          ? ((b =
              void 0 === y
                ? { side: "flip", align: "flip", fallbackAxisSide: "end" }
                : y),
            (k[11] = y),
            (k[12] = b))
          : (b = k[12]);
        let A = b,
          F = void 0 === x ? 8 : x;
        return (
          k[13] !== f
            ? ((R = f ? { positionMethod: f } : {}), (k[13] = f), (k[14] = R))
            : (R = k[14]),
          k[15] !== c
            ? ((E = (0, a.c)(
                "data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 max-h-[var(--available-height)] min-w-32 origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto outline-none duration-100 data-[closed]:overflow-hidden",
                s.V,
                u.t,
                c,
              )),
              (k[15] = c),
              (k[16] = E))
            : (E = k[16]),
          k[17] !== M || k[18] !== d || k[19] !== E
            ? ((w = (0, t.jsx)(r.Popup, {
                className: E,
                "data-density": M,
                "data-slot": "dropdown-menu-content",
                ...d,
              })),
              (k[17] = M),
              (k[18] = d),
              (k[19] = E),
              (k[20] = w))
            : (w = k[20]),
          k[21] !== M || k[22] !== w
            ? ((I = (0, t.jsx)(l.q.Provider, { value: M, children: w })),
              (k[21] = M),
              (k[22] = w),
              (k[23] = I))
            : (I = k[23]),
          k[24] !== C ||
          k[25] !== T ||
          k[26] !== A ||
          k[27] !== F ||
          k[28] !== O ||
          k[29] !== P ||
          k[30] !== I ||
          k[31] !== R
            ? ((S = (0, t.jsx)(o.Portal, {
                children: (0, t.jsx)(i.Positioner, {
                  align: C,
                  alignOffset: T,
                  className: "isolate z-[1000] outline-none",
                  side: O,
                  sideOffset: P,
                  collisionAvoidance: A,
                  collisionPadding: F,
                  ...R,
                  children: I,
                }),
              })),
              (k[24] = C),
              (k[25] = T),
              (k[26] = A),
              (k[27] = F),
              (k[28] = O),
              (k[29] = P),
              (k[30] = I),
              (k[31] = R),
              (k[32] = S))
            : (S = k[32]),
          S
        );
      },
    ],
    693957,
  );
};
