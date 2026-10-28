// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    n = e.i(426091),
    s = e.i(352386),
    a = e.i(231332);
  e.i(12692);
  var o = e.i(398902);
  function l(e) {
    return !e;
  }
  e.s([
    "f",
    0,
    function (e) {
      let c,
        d,
        u,
        m,
        p,
        f,
        x,
        b,
        h,
        y,
        g,
        v,
        w,
        k = (0, i.c)(30),
        {
          onReport: j,
          children: _,
          triggerClassName: N,
          triggerIconClassName: I,
        } = e,
        { t: C } = (0, o.f)(),
        [S, A] = (0, s.useState)(!1),
        [F, U] = (0, s.useState)(!1),
        [T, E] = (0, s.useState)(null),
        D = (0, s.useRef)(null),
        B = (0, s.useRef)(null);
      k[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = () => {
            let e = D.current;
            if (!e) return;
            let t = e.getBoundingClientRect();
            E({
              top: t.bottom + 4,
              right: Math.max(8, window.innerWidth - t.right),
            });
          }),
          (k[0] = c))
        : (c = k[0]);
      let L = c;
      return (k[1] !== S
        ? ((d = () => {
            S && L();
          }),
          (u = [S, L]),
          (k[1] = S),
          (k[2] = d),
          (k[3] = u))
        : ((d = k[2]), (u = k[3])),
      (0, s.useLayoutEffect)(d, u),
      k[4] !== S
        ? ((m = () => {
            if (!S) return;
            let e = function (e) {
                let t = e.target;
                D.current?.contains(t) || B.current?.contains(t) || A(!1);
              },
              t = function (e) {
                "Escape" === e.key && A(!1);
              },
              i = function () {
                L();
              };
            return (
              document.addEventListener("mousedown", e),
              document.addEventListener("keydown", t),
              window.addEventListener("resize", i),
              window.addEventListener("scroll", i, !0),
              () => {
                (document.removeEventListener("mousedown", e),
                  document.removeEventListener("keydown", t),
                  window.removeEventListener("resize", i),
                  window.removeEventListener("scroll", i, !0));
              }
            );
          }),
          (p = [S, L]),
          (k[4] = S),
          (k[5] = m),
          (k[6] = p))
        : ((m = k[5]), (p = k[6])),
      (0, s.useEffect)(m, p),
      null == j && null == _)
        ? null
        : (k[7] !== C
            ? ((f = C("web.bounties.more_options")), (k[7] = C), (k[8] = f))
            : (f = k[8]),
          k[9] !== N
            ? ((x = (0, n.c)(
                "flex h-[22px] w-[22px] items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-white",
                N,
              )),
              (k[9] = N),
              (k[10] = x))
            : (x = k[10]),
          k[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = (e) => {
                (e.stopPropagation(), U(!0), A(l));
              }),
              (k[11] = b))
            : (b = k[11]),
          k[12] !== I
            ? ((h = (0, n.c)("h-3.5 w-3.5", I)), (k[12] = I), (k[13] = h))
            : (h = k[13]),
          k[14] !== h
            ? ((y = (0, t.jsx)(r.Hs, { className: h })),
              (k[14] = h),
              (k[15] = y))
            : (y = k[15]),
          k[16] !== y || k[17] !== f || k[18] !== x
            ? ((g = (0, t.jsx)("button", {
                "aria-label": f,
                className: x,
                onClick: b,
                ref: D,
                type: "button",
                children: y,
              })),
              (k[16] = y),
              (k[17] = f),
              (k[18] = x),
              (k[19] = g))
            : (g = k[19]),
          k[20] !== _ ||
          k[21] !== F ||
          k[22] !== j ||
          k[23] !== S ||
          k[24] !== T ||
          k[25] !== C
            ? ((v =
                F && "u" > typeof document
                  ? (0, a.createPortal)(
                      (0, t.jsxs)("div", {
                        className: (0, n.c)(
                          "fixed z-[60] max-h-[min(360px,70vh)] w-[240px] overflow-y-auto rounded-xl border border-border-secondary bg-bg-secondary shadow-lg shadow-black/40",
                          !S && "hidden",
                        ),
                        onClickCapture: () => A(!1),
                        ref: B,
                        style: T ? { top: T.top, right: T.right } : void 0,
                        children: [
                          j
                            ? (0, t.jsxs)("button", {
                                className:
                                  "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-white transition-colors hover:bg-bg-tertiary",
                                onClick: (e) => {
                                  (e.stopPropagation(), j());
                                },
                                type: "button",
                                children: [
                                  (0, t.jsx)(r.Ig, {
                                    className: "h-4 w-4 text-text-secondary",
                                  }),
                                  C("common.report_action"),
                                ],
                              })
                            : null,
                          _,
                        ],
                      }),
                      document.body,
                    )
                  : null),
              (k[20] = _),
              (k[21] = F),
              (k[22] = j),
              (k[23] = S),
              (k[24] = T),
              (k[25] = C),
              (k[26] = v))
            : (v = k[26]),
          k[27] !== g || k[28] !== v
            ? ((w = (0, t.jsxs)("div", {
                className: "relative flex-shrink-0",
                children: [g, v],
              })),
              (k[27] = g),
              (k[28] = v),
              (k[29] = w))
            : (w = k[29]),
          w);
    },
  ]);
};
