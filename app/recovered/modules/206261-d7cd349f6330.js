// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(867013),
    a = e.i(426091),
    l = e.i(294237),
    s = e.i(352386);
  e.i(12692);
  var o = e.i(398902);
  let c = i.G,
    u = i.z,
    d = s.forwardRef((e, n) => {
      let l,
        s,
        o,
        c,
        u = (0, r.c)(9);
      return (
        u[0] !== e
          ? (({ className: l, ...s } = e), (u[0] = e), (u[1] = l), (u[2] = s))
          : ((l = u[1]), (s = u[2])),
        u[3] !== l
          ? ((o = (0, a.c)(
              "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              l,
            )),
            (u[3] = l),
            (u[4] = o))
          : (o = u[4]),
        u[5] !== s || u[6] !== n || u[7] !== o
          ? ((c = (0, t.jsx)(i.k, { className: o, ...s, ref: n })),
            (u[5] = s),
            (u[6] = n),
            (u[7] = o),
            (u[8] = c))
          : (c = u[8]),
        c
      );
    });
  d.displayName = i.k.displayName;
  let f = (0, l.f)(
      "fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300 bg-bg-secondary",
      {
        variants: {
          side: {
            top: "inset-x-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom:
              "inset-x-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right:
              "inset-y-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          },
        },
        defaultVariants: { side: "left" },
      },
    ),
    m = {
      top: { top: 0 },
      bottom: { bottom: 0 },
      left: { left: 0 },
      right: { right: 0 },
    },
    p = s.forwardRef((e, l) => {
      let s,
        c,
        p,
        h,
        g,
        x,
        v,
        y,
        b,
        w,
        _,
        C,
        S,
        k,
        j = (0, r.c)(30);
      j[0] !== e
        ? (({
            side: g,
            className: c,
            overlayClassName: p,
            children: s,
            style: x,
            ...h
          } = e),
          (j[0] = e),
          (j[1] = s),
          (j[2] = c),
          (j[3] = p),
          (j[4] = h),
          (j[5] = g),
          (j[6] = x))
        : ((s = j[1]),
          (c = j[2]),
          (p = j[3]),
          (h = j[4]),
          (g = j[5]),
          (x = j[6]));
      let { t: N } = (0, o.f)(),
        I = g ?? "left";
      (j[7] !== p
        ? ((v = (0, t.jsx)(d, { className: p })), (j[7] = p), (j[8] = v))
        : (v = j[8]),
        j[9] !== c || j[10] !== I
          ? ((y = (0, a.c)(f({ side: I }), c)),
            (j[9] = c),
            (j[10] = I),
            (j[11] = y))
          : (y = j[11]));
      let E = m[I];
      return (
        j[12] !== x || j[13] !== E
          ? ((b = { ...E, ...x }), (j[12] = x), (j[13] = E), (j[14] = b))
          : (b = j[14]),
        j[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (0, t.jsx)(n.x6, { className: "h-4 w-4 text-text-primary" })),
            (j[15] = w))
          : (w = j[15]),
        j[16] !== N
          ? ((_ = N("common.close")), (j[16] = N), (j[17] = _))
          : (_ = j[17]),
        j[18] !== _
          ? ((C = (0, t.jsxs)(i.K, {
              className:
                "absolute right-4 top-4 rounded-sm p-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
              children: [
                w,
                (0, t.jsx)("span", { className: "sr-only", children: _ }),
              ],
            })),
            (j[18] = _),
            (j[19] = C))
          : (C = j[19]),
        j[20] !== s ||
        j[21] !== h ||
        j[22] !== l ||
        j[23] !== y ||
        j[24] !== b ||
        j[25] !== C
          ? ((S = (0, t.jsxs)(i.c, {
              ref: l,
              className: y,
              style: b,
              ...h,
              children: [s, C],
            })),
            (j[20] = s),
            (j[21] = h),
            (j[22] = l),
            (j[23] = y),
            (j[24] = b),
            (j[25] = C),
            (j[26] = S))
          : (S = j[26]),
        j[27] !== v || j[28] !== S
          ? ((k = (0, t.jsxs)(u, { children: [v, S] })),
            (j[27] = v),
            (j[28] = S),
            (j[29] = k))
          : (k = j[29]),
        k
      );
    });
  p.displayName = i.c.displayName;
  let h = (e) => {
    let n,
      i,
      l,
      s,
      o = (0, r.c)(8);
    return (
      o[0] !== e
        ? (({ className: n, ...i } = e), (o[0] = e), (o[1] = n), (o[2] = i))
        : ((n = o[1]), (i = o[2])),
      o[3] !== n
        ? ((l = (0, a.c)(
            "flex flex-col space-y-2 text-center sm:text-left",
            n,
          )),
          (o[3] = n),
          (o[4] = l))
        : (l = o[4]),
      o[5] !== i || o[6] !== l
        ? ((s = (0, t.jsx)("div", { className: l, ...i })),
          (o[5] = i),
          (o[6] = l),
          (o[7] = s))
        : (s = o[7]),
      s
    );
  };
  h.displayName = "SheetHeader";
  let g = s.forwardRef((e, n) => {
    let l,
      s,
      o,
      c,
      u = (0, r.c)(9);
    return (
      u[0] !== e
        ? (({ className: l, ...s } = e), (u[0] = e), (u[1] = l), (u[2] = s))
        : ((l = u[1]), (s = u[2])),
      u[3] !== l
        ? ((o = (0, a.c)("text-lg font-semibold text-text-primary", l)),
          (u[3] = l),
          (u[4] = o))
        : (o = u[4]),
      u[5] !== s || u[6] !== n || u[7] !== o
        ? ((c = (0, t.jsx)(i.Z, { ref: n, className: o, ...s })),
          (u[5] = s),
          (u[6] = n),
          (u[7] = o),
          (u[8] = c))
        : (c = u[8]),
      c
    );
  });
  g.displayName = i.Z.displayName;
  let x = s.forwardRef((e, n) => {
    let l,
      s,
      o,
      c,
      u = (0, r.c)(9);
    return (
      u[0] !== e
        ? (({ className: l, ...s } = e), (u[0] = e), (u[1] = l), (u[2] = s))
        : ((l = u[1]), (s = u[2])),
      u[3] !== l
        ? ((o = (0, a.c)("text-sm text-text-tertiary", l)),
          (u[3] = l),
          (u[4] = o))
        : (o = u[4]),
      u[5] !== s || u[6] !== n || u[7] !== o
        ? ((c = (0, t.jsx)(i.u, { ref: n, className: o, ...s })),
          (u[5] = s),
          (u[6] = n),
          (u[7] = o),
          (u[8] = c))
        : (c = u[8]),
      c
    );
  });
  ((x.displayName = i.u.displayName),
    e.s(["j", 0, c, "U", 0, p, "c", 0, x, "D", 0, h, "L", 0, g]));
};
