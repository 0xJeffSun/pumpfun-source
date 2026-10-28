// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(660315),
    n = n,
    i = n,
    a = n;
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          s,
          o = (0, r.c)(4),
          { children: c, className: u } = e,
          d = void 0 === c ? "" : c;
        o[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (0, t.jsx)(n.Backdrop, {
              className:
                "fixed inset-0 z-[9990] min-h-dvh bg-[rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
            })),
            (o[0] = l))
          : (l = o[0]);
        let f =
          "fixed left-1/2 top-1/2 z-[9990] flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-[10px] border border-border-secondary bg-bg-primary p-6 outline-offset-2 outline-bg-accent transition-all duration-150 data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 " +
          (void 0 === u ? "" : u);
        return (
          o[1] !== d || o[2] !== f
            ? ((s = (0, t.jsxs)(i.Portal, {
                children: [
                  l,
                  (0, t.jsx)(a.Popup, { className: f, children: d }),
                ],
              })),
              (o[1] = d),
              (o[2] = f),
              (o[3] = s))
            : (s = o[3]),
          s
        );
      },
    ],
    598695,
  );
};
