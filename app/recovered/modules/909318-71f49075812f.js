// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(426091),
    n = e.i(928529),
    a = e.i(352386),
    o = e.i(56087);
  function l(e) {
    return e + 1;
  }
  e.s([
    "f",
    0,
    (e) => {
      let s,
        d,
        c,
        u = (0, r.c)(21),
        {
          sourceImageUrl: m,
          mint: h,
          imageType: p,
          isBanned: f,
          onError: b,
          maxRetries: g,
          suppressPlaceholder: x,
          ...v
        } = e,
        y = void 0 === g ? 5 : g,
        [w, _] = (0, a.useState)(!1),
        [k, j] = (0, a.useState)(0),
        [C, z] = (0, a.useState)(!0),
        S = (0, o.t)({
          sourceImageUrl: m,
          mint: h,
          imageType: p,
          isBanned: f,
          width: "number" == typeof v.width ? v.width : void 0,
          height: "number" == typeof v.height ? v.height : void 0,
          suppressPlaceholder: void 0 !== x && x,
        }),
        [N, $] = (0, a.useState)(S),
        [M, I] = (0, a.useState)(S);
      (M !== S && (I(S), $(S), _(!1), j(0), z(!0)),
        u[0] !== y ||
        u[1] !== b ||
        u[2] !== k ||
        u[3] !== _ ||
        u[4] !== z ||
        u[5] !== j ||
        u[6] !== S
          ? ((s = () => {
              (z(!1),
                k < y
                  ? setTimeout(
                      () => {
                        j(l);
                        let e = S.includes("?") ? "&" : "?";
                        ($(`${S}${e}retry=${k + 1}`), z(!0));
                      },
                      k < 3 ? 100 : 100 * Math.pow(2, k - 3),
                    )
                  : (_(!0), z(!0), b && b()));
            }),
            (u[0] = y),
            (u[1] = b),
            (u[2] = k),
            (u[3] = _),
            (u[4] = z),
            (u[5] = j),
            (u[6] = S),
            (u[7] = s))
          : (s = u[7]));
      let A = s;
      if (f) {
        let e,
          r = v.alt || `Coin image for ${h}`;
        return (
          u[8] !== v || u[9] !== r
            ? ((e = (0, t.jsx)(n.default, {
                ...v,
                alt: r,
                draggable: !1,
                src: i.A,
                unoptimized: !0,
              })),
              (u[8] = v),
              (u[9] = r),
              (u[10] = e))
            : (e = u[10]),
          e
        );
      }
      if (!N && !w) return null;
      let T = v.alt || `Coin image for ${h}`,
        O = w ? void 0 : A,
        P = w ? i.A : N,
        R = C ? "visible" : "hidden",
        E = +!!C;
      return (
        u[11] !== v.style || u[12] !== R || u[13] !== E
          ? ((d = {
              ...v.style,
              visibility: R,
              opacity: E,
              transition: "opacity 0.1s ease-in-out",
            }),
            (u[11] = v.style),
            (u[12] = R),
            (u[13] = E),
            (u[14] = d))
          : (d = u[14]),
        u[15] !== v || u[16] !== T || u[17] !== O || u[18] !== P || u[19] !== d
          ? ((c = (0, t.jsx)(n.default, {
              ...v,
              alt: T,
              draggable: !1,
              onError: O,
              src: P,
              style: d,
              unoptimized: !0,
            })),
            (u[15] = v),
            (u[16] = T),
            (u[17] = O),
            (u[18] = P),
            (u[19] = d),
            (u[20] = c))
          : (c = u[20]),
        c
      );
    },
  ]);
};
