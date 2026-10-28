// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(375670);
  let i = ["a", "b", "c", "d"];
  function s(e) {
    return (0, t.jsxs)(
      "span",
      {
        className: "flex w-14 flex-col items-center gap-1.5",
        children: [
          (0, t.jsx)(a.f, { className: "size-11 rounded-full" }),
          (0, t.jsx)(a.f, { className: "h-3 w-10" }),
        ],
      },
      e,
    );
  }
  e.s([
    "$",
    0,
    function (e) {
      let a,
        i,
        s,
        n = (0, l.c)(8),
        { children: o } = e,
        { t: d } = (0, r.f)();
      n[0] !== d
        ? ((a = d("chat.dms.share.send_in_dm")), (n[0] = d), (n[1] = a))
        : (a = n[1]);
      let c = a;
      return (
        n[2] !== c
          ? ((i = (0, t.jsx)("p", {
              className: "text-xs font-semibold text-text-secondary",
              children: c,
            })),
            (n[2] = c),
            (n[3] = i))
          : (i = n[3]),
        n[4] !== o || n[5] !== i || n[6] !== c
          ? ((s = (0, t.jsxs)("section", {
              "aria-label": c,
              className: "flex flex-col gap-2",
              "data-testid": "dm-share-strip",
              children: [i, o],
            })),
            (n[4] = o),
            (n[5] = i),
            (n[6] = c),
            (n[7] = s))
          : (s = n[7]),
        s
      );
    },
    "t",
    0,
    function () {
      let e,
        r = (0, l.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              "aria-busy": !0,
              className: "flex gap-2.5",
              children: i.map(s),
            })),
            (r[0] = e))
          : (e = r[0]),
        e
      );
    },
  ]);
};
