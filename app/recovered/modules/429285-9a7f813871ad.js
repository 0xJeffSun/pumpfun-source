// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "justPublished";
  e.s([
    "L",
    0,
    t,
    "$",
    0,
    ({ taskId: e, signature: r }) =>
      `/go/${encodeURIComponent(e)}?${t}=${encodeURIComponent(r ?? "1")}`,
    "U",
    0,
    ({ searchParams: e }) => {
      let r = e.get(t);
      return null === r || "" === r
        ? { isJustPublished: !1, signature: null }
        : "1" === r
          ? { isJustPublished: !0, signature: null }
          : { isJustPublished: !0, signature: r };
    },
  ]);
};
