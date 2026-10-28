// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    n = e.i(426091);
  e.i(12692);
  var s = e.i(398902),
    a = e.i(410718);
  e.s([
    "f",
    0,
    function (e) {
      let o,
        l,
        c,
        d,
        u,
        m,
        p,
        f,
        x,
        b = (0, i.c)(19);
      b[0] !== e
        ? (({ taskId: d, className: l, onClick: c, ...o } = e),
          (b[0] = e),
          (b[1] = o),
          (b[2] = l),
          (b[3] = c),
          (b[4] = d))
        : ((o = b[1]), (l = b[2]), (c = b[3]), (d = b[4]));
      let { t: h } = (0, s.f)(),
        { openWithDraft: y } = (0, a.useBountyCreateDialog)();
      return (
        b[5] !== l
          ? ((u = (0, n.c)(
              "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-white transition-colors hover:bg-bg-secondary",
              l,
            )),
            (b[5] = l),
            (b[6] = u))
          : (u = b[6]),
        b[7] !== c || b[8] !== y || b[9] !== d
          ? ((m = (e) => {
              (c?.(e), y(d));
            }),
            (b[7] = c),
            (b[8] = y),
            (b[9] = d),
            (b[10] = m))
          : (m = b[10]),
        b[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = (0, t.jsx)(r.wh, {
              className: "h-4 w-4 text-text-secondary",
            })),
            (b[11] = p))
          : (p = b[11]),
        b[12] !== h
          ? ((f = h("web.bounties.edit_draft")), (b[12] = h), (b[13] = f))
          : (f = b[13]),
        b[14] !== o || b[15] !== u || b[16] !== m || b[17] !== f
          ? ((x = (0, t.jsxs)("button", {
              ...o,
              className: u,
              onClick: m,
              type: "button",
              children: [p, f],
            })),
            (b[14] = o),
            (b[15] = u),
            (b[16] = m),
            (b[17] = f),
            (b[18] = x))
          : (x = b[18]),
        x
      );
    },
  ]);
};
