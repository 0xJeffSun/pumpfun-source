// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386),
    i = e.i(453706);
  e.i(12692);
  var n = e.i(398902),
    l = e.i(909318),
    s = e.i(56087),
    o = e.i(544514),
    c = e.i(12345);
  let d = (0, i.default)(() => e.A(16807), {
    loadableGenerated: { modules: [371429] },
    ssr: !1,
  });
  function m(e) {
    let a,
      i,
      n,
      o = (0, r.c)(9),
      { coin: d, width: m, height: u, eager: f, priority: h } = e;
    return (
      o[0] !== d || o[1] !== f || o[2] !== u || o[3] !== h || o[4] !== m
        ? ((a = (0, c.X)(d)
            ? (0, t.jsx)(l.f, {
                alt: d.name ?? d.mint,
                className:
                  "aspect-square h-full w-full rounded-md object-cover",
                width: m,
                height: u,
                imageType: s.d.COIN_IMAGE,
                mint: d.mint,
                sourceImageUrl: d.image_uri,
                isBanned: d.is_banned,
                priority: h,
                loading: !h && f ? "eager" : void 0,
              })
            : (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "size-full rounded-md bg-bg-secondary",
              })),
          (o[0] = d),
          (o[1] = f),
          (o[2] = u),
          (o[3] = h),
          (o[4] = m),
          (o[5] = a))
        : (a = o[5]),
      o[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className:
              "pointer-events-none absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-green-300",
            children: (0, t.jsx)("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 15 15",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: (0, t.jsx)("path", {
                d: "M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z",
                fill: "currentColor",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }),
            }),
          })),
          (o[6] = i))
        : (i = o[6]),
      o[7] !== a
        ? ((n = (0, t.jsxs)(t.Fragment, { children: [a, i] })),
          (o[7] = a),
          (o[8] = n))
        : (n = o[8]),
      n
    );
  }
  function u(e) {
    let i,
      l,
      s,
      c,
      u,
      f,
      h = (0, r.c)(18),
      { t: p } = (0, n.f)(),
      { coin: x, videoUrl: g, width: b, height: v, eager: y, priority: j } = e,
      w = (0, a.useRef)(null),
      [N, _] = (0, a.useState)(!1),
      k = (0, o.f)();
    (h[0] !== N
      ? ((i = () => {
          if (N || !w.current) return;
          let e = new IntersectionObserver(
            (t) => {
              let [r] = t;
              r?.isIntersecting && (_(!0), e.disconnect());
            },
            { rootMargin: "300px" },
          );
          return (e.observe(w.current), () => e.disconnect());
        }),
        (l = [N]),
        (h[0] = N),
        (h[1] = i),
        (h[2] = l))
      : ((i = h[1]), (l = h[2])),
      (0, a.useEffect)(i, l));
    let S = N && k;
    return (
      h[3] !== x ||
      h[4] !== y ||
      h[5] !== v ||
      h[6] !== j ||
      h[7] !== S ||
      h[8] !== g ||
      h[9] !== b
        ? ((s = S
            ? (0, t.jsx)(d, {
                className: "size-full",
                controls: !0,
                width: "100%",
                height: "100%",
                loop: !0,
                muted: !0,
                playing: !0,
                playsinline: !0,
                url: g,
              })
            : (0, t.jsx)(m, {
                coin: x,
                width: b,
                height: v,
                eager: y,
                priority: j,
              })),
          (h[3] = x),
          (h[4] = y),
          (h[5] = v),
          (h[6] = j),
          (h[7] = S),
          (h[8] = g),
          (h[9] = b),
          (h[10] = s))
        : (s = h[10]),
      h[11] !== p
        ? ((c = p("home.bounties.submit.add_video")), (h[11] = p), (h[12] = c))
        : (c = h[12]),
      h[13] !== c
        ? ((u = (0, t.jsx)("div", {
            className:
              "absolute left-1 top-1 rounded bg-black bg-opacity-75 p-1 text-xs",
            children: c,
          })),
          (h[13] = c),
          (h[14] = u))
        : (u = h[14]),
      h[15] !== s || h[16] !== u
        ? ((f = (0, t.jsxs)("div", {
            ref: w,
            className:
              "relative aspect-square h-full w-full [&_video]:object-cover",
            children: [s, u],
          })),
          (h[15] = s),
          (h[16] = u),
          (h[17] = f))
        : (f = h[17]),
      f
    );
  }
  var f = e.i(425444);
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          n,
          o,
          c = (0, r.c)(26),
          { coin: d, width: m, height: h, eager: p, priority: x } = e,
          [g, b] = (0, a.useState)(!1);
        c[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = () => {
              b(!0);
            }),
            (c[0] = i))
          : (i = c[0]);
        let v = i;
        c[1] !== d.video_uri
          ? ((n = ((e) => {
              if (!e) return null;
              let t = e.split("/").pop();
              if (!t)
                return (
                  console.warn("Could not extract filename from video URI:", e),
                  null
                );
              try {
                return new URL(
                  `https://s3.amazonaws.com/media.pump.fun/videos/${t}`,
                ).toString();
              } catch (t) {
                return (
                  console.error("Failed to construct or validate video URL:", {
                    videoUri: e,
                    error: t instanceof Error ? t.message : String(t),
                  }),
                  null
                );
              }
            })(d.video_uri)),
            (c[1] = d.video_uri),
            (c[2] = n))
          : (n = c[2]);
        let y = n;
        if (y) {
          let e;
          return (
            c[3] !== d ||
            c[4] !== p ||
            c[5] !== h ||
            c[6] !== x ||
            c[7] !== y ||
            c[8] !== m
              ? ((e = (0, t.jsx)(u, {
                  coin: d,
                  videoUrl: y,
                  width: m,
                  height: h,
                  eager: p,
                  priority: x,
                })),
                (c[3] = d),
                (c[4] = p),
                (c[5] = h),
                (c[6] = x),
                (c[7] = y),
                (c[8] = m),
                (c[9] = e))
              : (e = c[9]),
            e
          );
        }
        if (
          d.is_currently_live &&
          d.thumbnail &&
          d.thumbnail_updated_at &&
          !g
        ) {
          let e,
            r = d.name ?? d.mint,
            a = !x && p ? "eager" : void 0;
          return (
            c[10] !== d.thumbnail ||
            c[11] !== h ||
            c[12] !== x ||
            c[13] !== r ||
            c[14] !== a ||
            c[15] !== m
              ? ((e = (0, t.jsx)(f.default, {
                  className:
                    "aspect-square h-full w-full rounded-md object-cover",
                  src: d.thumbnail,
                  alt: r,
                  width: m,
                  height: h,
                  priority: x,
                  loading: a,
                  onError: v,
                  draggable: !1,
                })),
                (c[10] = d.thumbnail),
                (c[11] = h),
                (c[12] = x),
                (c[13] = r),
                (c[14] = a),
                (c[15] = m),
                (c[16] = e))
              : (e = c[16]),
            e
          );
        }
        let j = d.name ?? d.mint,
          w = !x && p ? "eager" : void 0;
        return (
          c[17] !== d.image_uri ||
          c[18] !== d.is_banned ||
          c[19] !== d.mint ||
          c[20] !== h ||
          c[21] !== x ||
          c[22] !== j ||
          c[23] !== w ||
          c[24] !== m
            ? ((o = (0, t.jsx)(l.f, {
                alt: j,
                className:
                  "aspect-square h-full w-full rounded-md object-cover",
                width: m,
                height: h,
                imageType: s.d.COIN_IMAGE,
                mint: d.mint,
                sourceImageUrl: d.image_uri,
                isBanned: d.is_banned,
                priority: x,
                loading: w,
              })),
              (c[17] = d.image_uri),
              (c[18] = d.is_banned),
              (c[19] = d.mint),
              (c[20] = h),
              (c[21] = x),
              (c[22] = j),
              (c[23] = w),
              (c[24] = m),
              (c[25] = o))
            : (o = c[25]),
          o
        );
      },
    ],
    644350,
  );
};
