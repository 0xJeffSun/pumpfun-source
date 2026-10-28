// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(375670);
  let n = ["a", "b", "c", "d"];
  function l(e) {
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
        n,
        l,
        o = (0, i.c)(8),
        { children: s } = e,
        { t: c } = (0, r.f)();
      o[0] !== c
        ? ((a = c("chat.dms.share.send_in_dm")), (o[0] = c), (o[1] = a))
        : (a = o[1]);
      let d = a;
      return (
        o[2] !== d
          ? ((n = (0, t.jsx)("p", {
              className: "text-xs font-semibold text-text-secondary",
              children: d,
            })),
            (o[2] = d),
            (o[3] = n))
          : (n = o[3]),
        o[4] !== s || o[5] !== n || o[6] !== d
          ? ((l = (0, t.jsxs)("section", {
              "aria-label": d,
              className: "flex flex-col gap-2",
              "data-testid": "dm-share-strip",
              children: [n, s],
            })),
            (o[4] = s),
            (o[5] = n),
            (o[6] = d),
            (o[7] = l))
          : (l = o[7]),
        l
      );
    },
    "t",
    0,
    function () {
      let e,
        r = (0, i.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)("div", {
              "aria-busy": !0,
              className: "flex gap-2.5",
              children: n.map(l),
            })),
            (r[0] = e))
          : (e = r[0]),
        e
      );
    },
  ]);
};
