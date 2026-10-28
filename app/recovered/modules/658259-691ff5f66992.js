// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(439587),
    o = e.i(426091),
    a = e.i(179236),
    c = e.i(16004),
    l = e.i(29542);
  let s = (e) => {
    let i,
      o,
      a,
      c,
      s,
      u,
      f,
      p = (0, n.c)(11),
      { isBanner: d } = e,
      m = void 0 !== d && d;
    return (
      p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(r.y4, { size: 24, strokeWidth: 1 })), (p[0] = i))
        : (i = p[0]),
      p[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, t.jsx)("p", {
            className: "text-sm font-bold text-text-primary",
            children:
              l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.FILE_INFO.FILE.LABEL,
          })),
          (p[1] = o))
        : (o = p[1]),
      p[2] !== m
        ? ((a = (0, t.jsxs)("div", {
            className:
              "flex w-full flex-col gap-3 px-3 py-2 text-[#9da3ae] sm:w-1/2",
            children: [
              i,
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [
                  o,
                  (0, t.jsx)("ul", {
                    className: "list-disc pl-3 text-xs",
                    children: m
                      ? (0, t.jsx)("li", {
                          children:
                            l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.FILE_INFO
                              .FILE.BANNER,
                        })
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("li", {
                              children:
                                l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                  .FILE_INFO.FILE.IMAGE,
                            }),
                            (0, t.jsx)("li", {
                              children:
                                l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                  .FILE_INFO.FILE.VIDEO,
                            }),
                          ],
                        }),
                  }),
                ],
              }),
            ],
          })),
          (p[2] = m),
          (p[3] = a))
        : (a = p[3]),
      p[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)(r.CC, { size: 24, strokeWidth: 1 })), (p[4] = c))
        : (c = p[4]),
      p[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)("p", {
            className: "text-sm font-bold text-text-primary",
            children:
              l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.FILE_INFO.RESOLUTION
                .LABEL,
          })),
          (p[5] = s))
        : (s = p[5]),
      p[6] !== m
        ? ((u = (0, t.jsxs)("div", {
            className:
              "flex w-full flex-col gap-4 px-3 py-2 text-[#9da3ae] sm:w-1/2",
            children: [
              c,
              (0, t.jsxs)("div", {
                className: "flex flex-col gap-1",
                children: [
                  s,
                  (0, t.jsx)("ul", {
                    className: "list-disc pl-3 text-xs",
                    children: m
                      ? (0, t.jsx)("li", {
                          children:
                            l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT.FILE_INFO
                              .RESOLUTION.BANNER,
                        })
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("li", {
                              children:
                                l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                  .FILE_INFO.RESOLUTION.IMAGE,
                            }),
                            (0, t.jsx)("li", {
                              children:
                                l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                  .FILE_INFO.RESOLUTION.VIDEO,
                            }),
                          ],
                        }),
                  }),
                ],
              }),
            ],
          })),
          (p[6] = m),
          (p[7] = u))
        : (u = p[7]),
      p[8] !== a || p[9] !== u
        ? ((f = (0, t.jsxs)("div", {
            className: "flex flex-col gap-4 sm:flex-row",
            children: [a, u],
          })),
          (p[8] = a),
          (p[9] = u),
          (p[10] = f))
        : (f = p[10]),
      f
    );
  };
  e.s(
    [
      "FileDropzoneInner",
      0,
      (e) => {
        let u,
          f,
          p,
          d,
          m = (0, n.c)(23),
          {
            onDrop: v,
            onDropRejected: g,
            accept: b,
            maxFiles: y,
            noClick: h,
            uploading: E,
            progress: x,
            preview: O,
            fileType: D,
            onReplace: I,
            isBanner: A,
            showWallet: j,
            isLoggedIn: w,
          } = e,
          C = void 0 === y ? 1 : y,
          N = void 0 !== E && E,
          F = void 0 === x ? 0 : x,
          P = void 0 !== A && A,
          T = void 0 === w || w,
          _ = P ? "min-h-32" : "h-80 min-h-44",
          S = (void 0 !== h && h) || !T,
          L = !T;
        return (
          m[0] !== D?.category ||
          m[1] !== _ ||
          m[2] !== P ||
          m[3] !== T ||
          m[4] !== I ||
          m[5] !== O ||
          m[6] !== F ||
          m[7] !== j ||
          m[8] !== N
            ? ((u = (e) => {
                let {
                  getRootProps: n,
                  getInputProps: a,
                  isDragAccept: s,
                  isDragReject: u,
                } = e;
                return (0, t.jsxs)("div", {
                  ...n({ className: "dropzone" }),
                  className: (0, o.c)(
                    `relative flex ${_} w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-white/30 bg-transparent transition-colors duration-200`,
                    s && "border-[#86efac]",
                    u && "border-red-500",
                  ),
                  children: [
                    (0, t.jsx)("input", { ...a() }),
                    O
                      ? null
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            P
                              ? (0, t.jsx)(r.CC, {
                                  size: 24,
                                  strokeWidth: 1.5,
                                  className: (0, o.c)(
                                    "text-[#9da3ae] transition-colors duration-200",
                                    s && "text-[#86efac]",
                                    u && "text-red-500",
                                  ),
                                })
                              : (0, t.jsx)(r.jG, {
                                  size: 48,
                                  strokeWidth: 1,
                                  className: (0, o.c)(
                                    "text-[#9da3ae] transition-colors duration-200",
                                    s && "text-[#86efac]",
                                    u && "text-red-500",
                                  ),
                                }),
                            (0, t.jsxs)("span", {
                              className: "text-center",
                              children: [
                                (0, t.jsx)("p", {
                                  className:
                                    "font-semibold leading-5 text-text-primary",
                                  children: P
                                    ? l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                        .FILE_DROPZONE.UPLOAD_FILE
                                    : l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                        .FILE_DROPZONE.SELECT_VIDEO_OR_IMAGE,
                                }),
                                !P &&
                                  (0, t.jsx)("p", {
                                    className: "leading-5 text-[#9da3ae]",
                                    children:
                                      l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                        .FILE_DROPZONE.OR_DRAG_AND_DROP,
                                  }),
                              ],
                            }),
                            T
                              ? (0, t.jsx)(i.K, {
                                  children:
                                    l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                      .FILE_DROPZONE.SELECT_FILE,
                                })
                              : (0, t.jsx)(i.K, {
                                  onClick: (e) => {
                                    (e.preventDefault(),
                                      e.stopPropagation(),
                                      j?.());
                                  },
                                  children:
                                    l.f.CREATE_COIN_PAGE.SECTION.DETAIL.INPUT
                                      .FILE_DROPZONE.LOG_IN,
                                }),
                          ],
                        }),
                    O
                      ? (0, t.jsx)("div", {
                          className: `w-full ${F ? "" : "h-full"} overflow-hidden`,
                          children:
                            D?.category === "image"
                              ? (0, t.jsxs)(t.Fragment, {
                                  children: [
                                    (0, t.jsx)("img", {
                                      src: O,
                                      alt: "preview",
                                      className: (0, o.c)(
                                        P
                                          ? "aspect-[3/1] max-h-96 w-full rounded-lg object-cover"
                                          : "h-full w-full object-contain",
                                      ),
                                    }),
                                    (0, t.jsx)("div", {
                                      className:
                                        "absolute bottom-0 right-0 p-2",
                                      children: (0, t.jsx)(i.K, {
                                        variant: "secondary",
                                        onClick: I,
                                        children:
                                          l.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                            .INPUT.FILE_DROPZONE.REPLACE,
                                      }),
                                    }),
                                  ],
                                })
                              : D?.category === "video"
                                ? (0, t.jsxs)("div", {
                                    className: "max-h-80 w-full",
                                    children: [
                                      (0, t.jsx)("video", {
                                        src: O,
                                        preload: "auto",
                                        loop: !0,
                                        className: "max-h-60 w-full",
                                        playsInline: !0,
                                        controls: !0,
                                        autoPlay: !0,
                                      }),
                                      N &&
                                        (0, t.jsx)("div", {
                                          className:
                                            "absolute inset-0 flex items-center justify-center bg-black/50",
                                          children: (0, t.jsx)("div", {
                                            className:
                                              "flex w-96 flex-col gap-2",
                                            children: (0, t.jsx)(c.f, {
                                              className: "w-full bg-black",
                                              value: F,
                                              barColor: "bg-bg-accent",
                                            }),
                                          }),
                                        }),
                                      (0, t.jsx)("div", {
                                        className:
                                          "absolute bottom-0 right-0 p-2",
                                        children: (0, t.jsx)(i.K, {
                                          variant: "secondary",
                                          onClick: I,
                                          children:
                                            l.f.CREATE_COIN_PAGE.SECTION.DETAIL
                                              .INPUT.FILE_DROPZONE.REPLACE,
                                        }),
                                      }),
                                    ],
                                  })
                                : null,
                        })
                      : null,
                  ],
                });
              }),
              (m[0] = D?.category),
              (m[1] = _),
              (m[2] = P),
              (m[3] = T),
              (m[4] = I),
              (m[5] = O),
              (m[6] = F),
              (m[7] = j),
              (m[8] = N),
              (m[9] = u))
            : (u = m[9]),
          m[10] !== b ||
          m[11] !== C ||
          m[12] !== v ||
          m[13] !== g ||
          m[14] !== S ||
          m[15] !== L ||
          m[16] !== u
            ? ((f = (0, t.jsx)(a.U, {
                onDrop: v,
                onDropRejected: g,
                accept: b,
                maxFiles: C,
                noClick: S,
                noDrag: L,
                children: u,
              })),
              (m[10] = b),
              (m[11] = C),
              (m[12] = v),
              (m[13] = g),
              (m[14] = S),
              (m[15] = L),
              (m[16] = u),
              (m[17] = f))
            : (f = m[17]),
          m[18] !== P
            ? ((p = (0, t.jsx)(s, { isBanner: P })), (m[18] = P), (m[19] = p))
            : (p = m[19]),
          m[20] !== f || m[21] !== p
            ? ((d = (0, t.jsxs)("div", {
                className: "flex w-full flex-col gap-4",
                children: [f, p],
              })),
              (m[20] = f),
              (m[21] = p),
              (m[22] = d))
            : (d = m[22]),
          d
        );
      },
    ],
    658259,
  );
};
