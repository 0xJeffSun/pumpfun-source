// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091),
    i = e.i(928529),
    a = e.i(352386);
  e.i(12692);
  var l = e.i(398902);
  let s = (e) => {
    let n,
      i = (0, r.c)(4),
      {
        width: a,
        height: l,
        color: s,
        background: o,
        fontSize: c,
        text: u,
        className: d,
      } = e,
      f = void 0 === a ? 100 : a,
      m = void 0 === l ? 100 : l,
      p = void 0 === s ? "#666" : s,
      h = u || `${f}x${m}`,
      g = encodeURIComponent(`
    <svg width="${f}" height="${m}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${void 0 === o ? "#ccc" : o}" stroke="${p}" />
      <text x="50%" y="50%" dominant-baseline="middle" font-family="-apple-system, Inter, sans-serif" text-anchor="middle" fill="${p}" font-size="${void 0 === c ? "20" : c}" font-size-adjust="0.58" >
        ${h}
      </text>

    </svg>

`),
      x = `data:image/svg+xml;charset=UTF-8,${g}`,
      v = `${f}x${m} placeholder`;
    return (
      i[0] !== d || i[1] !== x || i[2] !== v
        ? ((n = (0, t.jsx)("img", { className: d, src: x, alt: v })),
          (i[0] = d),
          (i[1] = x),
          (i[2] = v),
          (i[3] = n))
        : (n = i[3]),
      n
    );
  };
  e.s(
    [
      "default",
      0,
      (e) => {
        let o,
          c,
          u,
          d = (0, r.c)(21),
          { t: f } = (0, l.f)(),
          m = e.src || "",
          p = m
            ? "string" == typeof m && m.startsWith("blob:")
              ? m
              : `${m}?img-width=${e.width}&img-dpr=2&img-onerror=redirect`
            : "";
        d[0] !== p
          ? ((o = { source: p, useRawSrc: !1, hasError: !1 }),
            (d[0] = p),
            (d[1] = o))
          : (o = d[1]);
        let [h, g] = (0, a.useState)(o),
          x = h.source === p ? h : { source: p, useRawSrc: !1, hasError: !1 },
          v = x.useRawSrc ? e.src : p;
        d[2] !== v || d[3] !== e || d[4] !== p
          ? ((c = () => {
              v === e.src
                ? (g({ source: p, useRawSrc: !0, hasError: !0 }),
                  e.onError && e.onError())
                : g({ source: p, useRawSrc: !0, hasError: !1 });
            }),
            (d[2] = v),
            (d[3] = e),
            (d[4] = p),
            (d[5] = c))
          : (c = d[5]);
        let y = c;
        if (!v || x.hasError) {
          let r, i, a;
          d[6] !== e.className
            ? ((r = (0, n.c)(e.className)), (d[6] = e.className), (d[7] = r))
            : (r = d[7]);
          let l = e.width || 100,
            o = e.height || 100;
          return (
            d[8] !== f
              ? ((i = f("web.ui.image_unavailable")), (d[8] = f), (d[9] = i))
              : (i = d[9]),
            d[10] !== r || d[11] !== l || d[12] !== o || d[13] !== i
              ? ((a = (0, t.jsx)(s, {
                  className: r,
                  width: l,
                  height: o,
                  text: i,
                  fontSize: "65%",
                  background: "transparent",
                })),
                (d[10] = r),
                (d[11] = l),
                (d[12] = o),
                (d[13] = i),
                (d[14] = a))
              : (a = d[14]),
            a
          );
        }
        let b = e.unoptimized ?? !0,
          w = e.alt || "";
        return (
          d[15] !== y ||
          d[16] !== v ||
          d[17] !== e ||
          d[18] !== b ||
          d[19] !== w
            ? ((u = (0, t.jsx)(i.default, {
                ...e,
                src: v,
                unoptimized: b,
                onError: y,
                alt: w,
              })),
              (d[15] = y),
              (d[16] = v),
              (d[17] = e),
              (d[18] = b),
              (d[19] = w),
              (d[20] = u))
            : (u = d[20]),
          u
        );
      },
    ],
    425444,
  );
};
