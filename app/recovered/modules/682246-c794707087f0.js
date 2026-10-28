// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    s = e.i(928529),
    i = e.i(352386),
    a = e.i(745018);
  e.i(12692);
  var o = e.i(398902);
  let l = (0, i.lazy)(() =>
    e.A(424402).then((e) => ({ default: e.MediaLightbox })),
  );
  function c(e) {
    let r,
      s,
      a,
      o = (0, n.c)(8),
      [c, d] = (0, i.useState)(e.isOpen);
    return (e.isOpen && !c && d(!0), c)
      ? (o[0] !== e.isOpen || o[1] !== e.onOpenChange
          ? ((r = (0, t.jsx)(u, {
              isOpen: e.isOpen,
              onOpenChange: e.onOpenChange,
            })),
            (o[0] = e.isOpen),
            (o[1] = e.onOpenChange),
            (o[2] = r))
          : (r = o[2]),
        o[3] !== e
          ? ((s = (0, t.jsx)(l, { ...e })), (o[3] = e), (o[4] = s))
          : (s = o[4]),
        o[5] !== r || o[6] !== s
          ? ((a = (0, t.jsx)(i.Suspense, { fallback: r, children: s })),
            (o[5] = r),
            (o[6] = s),
            (o[7] = a))
          : (a = o[7]),
        a)
      : null;
  }
  function u(e) {
    let r,
      s,
      l,
      c,
      u,
      d,
      m,
      b,
      x,
      p = (0, n.c)(19),
      { isOpen: g, onOpenChange: f } = e,
      { t: h } = (0, o.f)();
    return (p[0] !== g || p[1] !== f
      ? ((r = () => {
          if (!g) return;
          let e = function (e) {
            "Escape" === e.key && f(!1);
          };
          return (
            window.addEventListener("keydown", e),
            () => window.removeEventListener("keydown", e)
          );
        }),
        (s = [g, f]),
        (p[0] = g),
        (p[1] = f),
        (p[2] = r),
        (p[3] = s))
      : ((r = p[2]), (s = p[3])),
    (0, i.useEffect)(r, s),
    g)
      ? (p[4] !== h
          ? ((l = h("common.close")), (p[4] = h), (p[5] = l))
          : (l = p[5]),
        p[6] !== f ? ((c = () => f(!1)), (p[6] = f), (p[7] = c)) : (c = p[7]),
        p[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(a.x6, { className: "size-4" })), (p[8] = u))
          : (u = p[8]),
        p[9] !== l || p[10] !== c
          ? ((d = (0, t.jsx)("button", {
              "aria-label": l,
              className:
                "absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80",
              onClick: c,
              type: "button",
              children: u,
            })),
            (p[9] = l),
            (p[10] = c),
            (p[11] = d))
          : (d = p[11]),
        p[12] !== h
          ? ((m = h("web.bounties.loading_image_viewer")),
            (p[12] = h),
            (p[13] = m))
          : (m = p[13]),
        p[14] !== m
          ? ((b = (0, t.jsx)("span", {
              "aria-label": m,
              className:
                "size-8 animate-spin rounded-full border-2 border-white/30 border-t-white",
              role: "status",
            })),
            (p[14] = m),
            (p[15] = b))
          : (b = p[15]),
        p[16] !== d || p[17] !== b
          ? ((x = (0, t.jsxs)("div", {
              className:
                "fixed inset-0 z-[998] flex items-center justify-center bg-black/90 backdrop-blur-[2px]",
              children: [d, b],
            })),
            (p[16] = d),
            (p[17] = b),
            (p[18] = x))
          : (x = p[18]),
        x)
      : null;
  }
  function d(e) {
    return e.stopPropagation();
  }
  function m(e) {
    return e.stopPropagation();
  }
  function b(e) {
    let r,
      i,
      a,
      o = (0, n.c)(8),
      { url: l, maxHeight: c, onOpen: u } = e;
    return (
      o[0] !== c
        ? ((r = { maxHeight: c }), (o[0] = c), (o[1] = r))
        : (r = o[1]),
      o[2] !== l
        ? ((i = (0, t.jsx)(s.default, {
            alt: "",
            className: "object-contain",
            fill: !0,
            sizes: "(max-width: 768px) 100vw, 600px",
            src: l,
            unoptimized: !0,
          })),
          (o[2] = l),
          (o[3] = i))
        : (i = o[3]),
      o[4] !== u || o[5] !== r || o[6] !== i
        ? ((a = (0, t.jsx)("button", {
            className: "relative block aspect-[16/9] w-full bg-bg-tertiary",
            onClick: u,
            style: r,
            type: "button",
            children: i,
          })),
          (o[4] = u),
          (o[5] = r),
          (o[6] = i),
          (o[7] = a))
        : (a = o[7]),
      a
    );
  }
  function x(e) {
    let i,
      a,
      o,
      l = (0, n.c)(11),
      { visible: c, totalCount: u, extra: d, onOpen: m } = e,
      b =
        2 === c.length
          ? "grid grid-cols-2 gap-[2px] aspect-[16/9]"
          : "grid grid-cols-2 grid-rows-2 gap-[2px] aspect-[16/10]",
      x = 3 === c.length ? "row-span-2 h-full" : void 0;
    if (
      l[0] !== d ||
      l[1] !== x ||
      l[2] !== b ||
      l[3] !== m ||
      l[4] !== u ||
      l[5] !== c
    ) {
      let e = new Map(),
        n = c.map((t) => {
          let n = e.get(t) ?? 0;
          return (e.set(t, n + 1), { key: `${t}-${n}`, url: t });
        });
      ((i = b),
        (a = n.map((e, i) => {
          let a = i === n.length - 1 && d > 0;
          return (0, t.jsxs)(
            "button",
            {
              "aria-label": a ? `View all ${u} images` : `View image ${i + 1}`,
              className: (0, r.c)(
                "group relative h-full w-full overflow-hidden",
                0 === i ? x : void 0,
              ),
              onClick: m(i),
              type: "button",
              children: [
                (0, t.jsx)(s.default, {
                  alt: "",
                  className:
                    "object-cover transition-transform duration-200 group-hover:scale-[1.02]",
                  fill: !0,
                  sizes: "(max-width: 768px) 50vw, 300px",
                  src: e.url,
                  unoptimized: !0,
                }),
                a
                  ? (0, t.jsxs)("span", {
                      className:
                        "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-semibold text-white",
                      children: ["+", d],
                    })
                  : null,
              ],
            },
            e.key,
          );
        })),
        (l[0] = d),
        (l[1] = x),
        (l[2] = b),
        (l[3] = m),
        (l[4] = u),
        (l[5] = c),
        (l[6] = i),
        (l[7] = a));
    } else ((i = l[6]), (a = l[7]));
    return (
      l[8] !== i || l[9] !== a
        ? ((o = (0, t.jsx)("div", { className: i, children: a })),
          (l[8] = i),
          (l[9] = a),
          (l[10] = o))
        : (o = l[10]),
      o
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          a,
          o,
          l,
          u,
          p,
          g,
          f,
          h = (0, n.c)(21),
          { urls: y, maxHeight: w, className: _ } = e,
          N = void 0 === w ? 520 : w,
          [v, j] = (0, i.useState)(null);
        if (0 === y.length) return null;
        h[0] !== y ? ((s = y.slice(0, 4)), (h[0] = y), (h[1] = s)) : (s = h[1]);
        let O = s,
          E = y.length - O.length;
        h[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = function (e) {
              return (t) => {
                (t.stopPropagation(), j(e));
              };
            }),
            (h[2] = a))
          : (a = h[2]);
        let k = a;
        (h[3] !== _
          ? ((o = (0, r.c)(
              "mt-1 overflow-hidden rounded-xl border border-border-primary",
              _,
            )),
            (h[3] = _),
            (h[4] = o))
          : (o = h[4]),
          h[5] !== E || h[6] !== N || h[7] !== y.length || h[8] !== O
            ? ((l =
                1 === O.length
                  ? (0, t.jsx)(b, { maxHeight: N, onOpen: k(0), url: O[0] })
                  : (0, t.jsx)(x, {
                      extra: E,
                      onOpen: k,
                      totalCount: y.length,
                      visible: O,
                    })),
              (h[5] = E),
              (h[6] = N),
              (h[7] = y.length),
              (h[8] = O),
              (h[9] = l))
            : (l = h[9]),
          h[10] !== o || h[11] !== l
            ? ((u = (0, t.jsx)("div", {
                className: o,
                onClick: m,
                onKeyDown: d,
                role: "presentation",
                children: l,
              })),
              (h[10] = o),
              (h[11] = l),
              (h[12] = u))
            : (u = h[12]));
        let C = v ?? 0,
          T = null !== v;
        return (
          h[13] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (e) => {
                e || j(null);
              }),
              (h[13] = p))
            : (p = h[13]),
          h[14] !== C || h[15] !== T || h[16] !== y
            ? ((g = (0, t.jsx)(c, {
                initialIndex: C,
                isOpen: T,
                onOpenChange: p,
                urls: y,
              })),
              (h[14] = C),
              (h[15] = T),
              (h[16] = y),
              (h[17] = g))
            : (g = h[17]),
          h[18] !== g || h[19] !== u
            ? ((f = (0, t.jsxs)(t.Fragment, { children: [u, g] })),
              (h[18] = g),
              (h[19] = u),
              (h[20] = f))
            : (f = h[20]),
          f
        );
      },
    ],
    682246,
  );
};
