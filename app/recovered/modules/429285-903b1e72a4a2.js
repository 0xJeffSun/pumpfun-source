// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "justPublished";
  e.s([
    "L",
    0,
    t,
    "$",
    0,
    ({ taskId: e, signature: n }) =>
      `/go/${encodeURIComponent(e)}?${t}=${encodeURIComponent(n ?? "1")}`,
    "U",
    0,
    ({ searchParams: e }) => {
      let n = e.get(t);
      return null === n || "" === n
        ? { isJustPublished: !1, signature: null }
        : "1" === n
          ? { isJustPublished: !0, signature: null }
          : { isJustPublished: !0, signature: n };
    },
  ]);
};
