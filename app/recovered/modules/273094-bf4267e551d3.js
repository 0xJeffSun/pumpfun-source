// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(445242),
    a = e.i(882376),
    a = a,
    r = e.i(814048),
    i = e.i(264458),
    o = e.i(188014),
    s = e.i(352386);
  let l = (e) => {
    let a,
      r = (0, t.c)(9),
      { trackRef: o, className: l, children: c } = e,
      { isPortrait: u } = ((e) => {
        let n,
          a,
          r,
          i = (0, t.c)(12);
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = { isPortrait: !1 }), (i[0] = n))
          : (n = i[0]);
        let [o, l] = (0, s.useState)(n),
          c = e?.publication,
          u = c?.track;
        i[1] !== u?.elementInfos?.[0] ||
        i[2] !== u?.lastDimensions ||
        i[3] !== u?.prevStats ||
        i[4] !== c
          ? ((a = () => {
              if (!c) return void l({ isPortrait: !1 });
              let e = (() => {
                  let e = u?.elementInfos?.[0];
                  if (e?._width && e?._height)
                    return { width: e._width, height: e._height };
                  let n = u?.lastDimensions;
                  if (n?.width && n?.height) return n;
                  let t = u?.prevStats;
                  if (t?.frameWidth && t?.frameHeight)
                    return { width: t.frameWidth, height: t.frameHeight };
                  let a = c?.dimensions;
                  if (a?.width && a?.height) return a;
                })(),
                n = e?.width,
                t = e?.height;
              l({ isPortrait: !!t && !!n && t > n, width: n, height: t });
            }),
            (i[1] = u?.elementInfos?.[0]),
            (i[2] = u?.lastDimensions),
            (i[3] = u?.prevStats),
            (i[4] = c),
            (i[5] = a))
          : (a = i[5]);
        let d = c?.dimensions,
          m = u?.prevStats,
          p = u?.lastDimensions,
          f = u?.elementInfos;
        return (
          i[6] !== c || i[7] !== d || i[8] !== m || i[9] !== p || i[10] !== f
            ? ((r = [c, d, m, p, f]),
              (i[6] = c),
              (i[7] = d),
              (i[8] = m),
              (i[9] = p),
              (i[10] = f),
              (i[11] = r))
            : (r = i[11]),
          (0, s.useEffect)(a, r),
          o
        );
      })(o);
    if (u) {
      let e, t, a;
      return (
        r[0] !== l
          ? ((e = (0, i.default)(
              "flex aspect-video h-full w-full items-center justify-center bg-black",
              l,
            )),
            (r[0] = l),
            (r[1] = e))
          : (e = r[1]),
        r[2] !== c
          ? ((t = (0, n.jsx)("div", {
              className: "aspect-[9/16] h-full",
              children: c,
            })),
            (r[2] = c),
            (r[3] = t))
          : (t = r[3]),
        r[4] !== e || r[5] !== t
          ? ((a = (0, n.jsx)("div", { className: e, children: t })),
            (r[4] = e),
            (r[5] = t),
            (r[6] = a))
          : (a = r[6]),
        a
      );
    }
    return (
      r[7] !== c
        ? ((a = (0, n.jsx)(n.Fragment, { children: c })),
          (r[7] = c),
          (r[8] = a))
        : (a = r[8]),
      a
    );
  };
  var c = e.i(166037);
  let u = () => {
    let e,
      a = (0, t.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, n.jsx)("div", {
            "data-speaking-indicator": !0,
            className: "absolute bottom-1 right-1",
            style: { zIndex: c.f.ParticipantVideoTile.gradientOverlay + 1 },
            children: (0, n.jsx)("img", {
              src: "/livestreams/speaking.gif",
              className: "w-8",
              alt: "Speaking indicator",
            }),
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  };
  var d = e.i(952080);
  let m = () => {
    let e,
      a = (0, t.c)(1);
    return (
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, n.jsxs)("div", {
            "data-tile-gradient": !0,
            children: [
              (0, n.jsx)("div", {
                className:
                  "absolute inset-x-0 top-0 h-[33px] bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover/main:opacity-100 group-hover/tile:opacity-100",
              }),
              (0, n.jsx)("div", {
                className:
                  "absolute inset-x-0 bottom-0 h-[33px] bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 ease-in-out group-hover/main:opacity-100 group-hover/tile:opacity-100",
              }),
            ],
          })),
          (a[0] = e))
        : (e = a[0]),
      e
    );
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        let s,
          c,
          p,
          f,
          h,
          g,
          k,
          T,
          v = (0, t.c)(22),
          {
            participant: y,
            trackRef: b,
            showGradient: E,
            isOnMainVideoView: _,
            className: S,
            children: w,
          } = e,
          I = void 0 === E || E,
          A = void 0 !== _ && _,
          N = (0, r.f)(y);
        v[0] !== b ? ((s = (0, o.K)(b)), (v[0] = b), (v[1] = s)) : (s = v[1]);
        let R = s;
        return (
          v[2] !== S
            ? ((c = (0, i.default)(
                "group/tile relative overflow-hidden rounded-[4px]",
                S,
              )),
              (v[2] = S),
              (v[3] = c))
            : (c = v[3]),
          v[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (0, i.default)(
                "relative h-full overflow-hidden rounded-[4px] bg-neutral-700",
                "max-h-full max-w-full",
              )),
              (v[4] = p))
            : (p = v[4]),
          v[5] !== A || v[6] !== y || v[7] !== R || v[8] !== b
            ? ((f =
                R && b
                  ? (0, n.jsx)(l, {
                      trackRef: b,
                      children: (0, n.jsx)(a.P, {
                        trackRef: b,
                        className: (0, i.default)(
                          "!h-full !w-full [&_.lk-connection-quality]:hidden [&_.lk-participant-metadata]:hidden",
                          "[&_.lk-participant-placeholder]:z-20",
                        ),
                      }),
                    })
                  : (0, n.jsx)(d.f, {
                      participant: y,
                      size: A ? "big" : "small",
                    })),
              (v[5] = A),
              (v[6] = y),
              (v[7] = R),
              (v[8] = b),
              (v[9] = f))
            : (f = v[9]),
          v[10] !== N
            ? ((h = N && (0, n.jsx)(u, {})), (v[10] = N), (v[11] = h))
            : (h = v[11]),
          v[12] !== I
            ? ((g = I && (0, n.jsx)(m, {})), (v[12] = I), (v[13] = g))
            : (g = v[13]),
          v[14] !== w || v[15] !== f || v[16] !== h || v[17] !== g
            ? ((k = (0, n.jsx)("div", {
                className: p,
                children: (0, n.jsxs)("div", {
                  className: "absolute inset-0",
                  children: [f, w, h, g],
                }),
              })),
              (v[14] = w),
              (v[15] = f),
              (v[16] = h),
              (v[17] = g),
              (v[18] = k))
            : (k = v[18]),
          v[19] !== c || v[20] !== k
            ? ((T = (0, n.jsx)("div", { className: c, children: k })),
              (v[19] = c),
              (v[20] = k),
              (v[21] = T))
            : (T = v[21]),
          T
        );
      },
    ],
    273094,
  );
};
