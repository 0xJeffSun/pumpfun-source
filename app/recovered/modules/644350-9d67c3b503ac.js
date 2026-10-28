// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(352386),
    a = e.i(453706);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(909318),
    l = e.i(56087),
    o = e.i(544514),
    c = e.i(12345);
  let m = (0, a.default)(() => e.A(16807), {
    loadableGenerated: { modules: [371429] },
    ssr: !1,
  });
  function u(e) {
    let r,
      a,
      n,
      o = (0, i.c)(9),
      { coin: m, width: u, height: d, eager: f, priority: p } = e;
    return (
      o[0] !== m || o[1] !== f || o[2] !== d || o[3] !== p || o[4] !== u
        ? ((r = (0, c.X)(m)
            ? (0, t.jsx)(s.f, {
                alt: m.name ?? m.mint,
                className:
                  "aspect-square h-full w-full rounded-md object-cover",
                width: u,
                height: d,
                imageType: l.d.COIN_IMAGE,
                mint: m.mint,
                sourceImageUrl: m.image_uri,
                isBanned: m.is_banned,
                priority: p,
                loading: !p && f ? "eager" : void 0,
              })
            : (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "size-full rounded-md bg-bg-secondary",
              })),
          (o[0] = m),
          (o[1] = f),
          (o[2] = d),
          (o[3] = p),
          (o[4] = u),
          (o[5] = r))
        : (r = o[5]),
      o[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)("span", {
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
          (o[6] = a))
        : (a = o[6]),
      o[7] !== r
        ? ((n = (0, t.jsxs)(t.Fragment, { children: [r, a] })),
          (o[7] = r),
          (o[8] = n))
        : (n = o[8]),
      n
    );
  }
  function d(e) {
    let a,
      s,
      l,
      c,
      d,
      f,
      p = (0, i.c)(18),
      { t: h } = (0, n.f)(),
      { coin: x, videoUrl: v, width: g, height: b, eager: y, priority: _ } = e,
      j = (0, r.useRef)(null),
      [N, w] = (0, r.useState)(!1),
      k = (0, o.f)();
    (p[0] !== N
      ? ((a = () => {
          if (N || !j.current) return;
          let e = new IntersectionObserver(
            (t) => {
              let [i] = t;
              i?.isIntersecting && (w(!0), e.disconnect());
            },
            { rootMargin: "300px" },
          );
          return (e.observe(j.current), () => e.disconnect());
        }),
        (s = [N]),
        (p[0] = N),
        (p[1] = a),
        (p[2] = s))
      : ((a = p[1]), (s = p[2])),
      (0, r.useEffect)(a, s));
    let C = N && k;
    return (
      p[3] !== x ||
      p[4] !== y ||
      p[5] !== b ||
      p[6] !== _ ||
      p[7] !== C ||
      p[8] !== v ||
      p[9] !== g
        ? ((l = C
            ? (0, t.jsx)(m, {
                className: "size-full",
                controls: !0,
                width: "100%",
                height: "100%",
                loop: !0,
                muted: !0,
                playing: !0,
                playsinline: !0,
                url: v,
              })
            : (0, t.jsx)(u, {
                coin: x,
                width: g,
                height: b,
                eager: y,
                priority: _,
              })),
          (p[3] = x),
          (p[4] = y),
          (p[5] = b),
          (p[6] = _),
          (p[7] = C),
          (p[8] = v),
          (p[9] = g),
          (p[10] = l))
        : (l = p[10]),
      p[11] !== h
        ? ((c = h("home.bounties.submit.add_video")), (p[11] = h), (p[12] = c))
        : (c = p[12]),
      p[13] !== c
        ? ((d = (0, t.jsx)("div", {
            className:
              "absolute left-1 top-1 rounded bg-black bg-opacity-75 p-1 text-xs",
            children: c,
          })),
          (p[13] = c),
          (p[14] = d))
        : (d = p[14]),
      p[15] !== l || p[16] !== d
        ? ((f = (0, t.jsxs)("div", {
            ref: j,
            className:
              "relative aspect-square h-full w-full [&_video]:object-cover",
            children: [l, d],
          })),
          (p[15] = l),
          (p[16] = d),
          (p[17] = f))
        : (f = p[17]),
      f
    );
  }
  var f = e.i(425444);
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          n,
          o,
          c = (0, i.c)(26),
          { coin: m, width: u, height: p, eager: h, priority: x } = e,
          [v, g] = (0, r.useState)(!1);
        c[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = () => {
              g(!0);
            }),
            (c[0] = a))
          : (a = c[0]);
        let b = a;
        c[1] !== m.video_uri
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
            })(m.video_uri)),
            (c[1] = m.video_uri),
            (c[2] = n))
          : (n = c[2]);
        let y = n;
        if (y) {
          let e;
          return (
            c[3] !== m ||
            c[4] !== h ||
            c[5] !== p ||
            c[6] !== x ||
            c[7] !== y ||
            c[8] !== u
              ? ((e = (0, t.jsx)(d, {
                  coin: m,
                  videoUrl: y,
                  width: u,
                  height: p,
                  eager: h,
                  priority: x,
                })),
                (c[3] = m),
                (c[4] = h),
                (c[5] = p),
                (c[6] = x),
                (c[7] = y),
                (c[8] = u),
                (c[9] = e))
              : (e = c[9]),
            e
          );
        }
        if (
          m.is_currently_live &&
          m.thumbnail &&
          m.thumbnail_updated_at &&
          !v
        ) {
          let e,
            i = m.name ?? m.mint,
            r = !x && h ? "eager" : void 0;
          return (
            c[10] !== m.thumbnail ||
            c[11] !== p ||
            c[12] !== x ||
            c[13] !== i ||
            c[14] !== r ||
            c[15] !== u
              ? ((e = (0, t.jsx)(f.default, {
                  className:
                    "aspect-square h-full w-full rounded-md object-cover",
                  src: m.thumbnail,
                  alt: i,
                  width: u,
                  height: p,
                  priority: x,
                  loading: r,
                  onError: b,
                  draggable: !1,
                })),
                (c[10] = m.thumbnail),
                (c[11] = p),
                (c[12] = x),
                (c[13] = i),
                (c[14] = r),
                (c[15] = u),
                (c[16] = e))
              : (e = c[16]),
            e
          );
        }
        let _ = m.name ?? m.mint,
          j = !x && h ? "eager" : void 0;
        return (
          c[17] !== m.image_uri ||
          c[18] !== m.is_banned ||
          c[19] !== m.mint ||
          c[20] !== p ||
          c[21] !== x ||
          c[22] !== _ ||
          c[23] !== j ||
          c[24] !== u
            ? ((o = (0, t.jsx)(s.f, {
                alt: _,
                className:
                  "aspect-square h-full w-full rounded-md object-cover",
                width: u,
                height: p,
                imageType: l.d.COIN_IMAGE,
                mint: m.mint,
                sourceImageUrl: m.image_uri,
                isBanned: m.is_banned,
                priority: x,
                loading: j,
              })),
              (c[17] = m.image_uri),
              (c[18] = m.is_banned),
              (c[19] = m.mint),
              (c[20] = p),
              (c[21] = x),
              (c[22] = _),
              (c[23] = j),
              (c[24] = u),
              (c[25] = o))
            : (o = c[25]),
          o
        );
      },
    ],
    644350,
  );
};
