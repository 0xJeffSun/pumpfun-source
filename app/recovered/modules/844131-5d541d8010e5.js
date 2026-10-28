// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024);
  function n(e) {
    let { latestUpdate: t } = e;
    return t
      ? { iso: t.createdAt, kind: "updated" }
      : e.publishedAt
        ? { iso: e.publishedAt, kind: "published" }
        : { iso: e.createdAt, kind: "draft" };
  }
  e.s([
    "t",
    0,
    function (e) {
      return (0, t.I)(e, { displayUpdate: e.latestUpdate });
    },
    "E",
    0,
    function (e, r, i) {
      let { iso: s, kind: o } = n(e);
      return "published" === o
        ? (0, t.r)(s, { now: i?.now, timeZone: i?.timeZone })
        : `${"updated" === o ? "updated" : "draft"} ${r(s)}`;
    },
    "F",
    0,
    function (e) {
      let { latestUpdate: t } = e;
      return t
        ? {
            bodyMarkdown: t.bodyMarkdown,
            attachments: t.attachments ?? [],
            links: t.links ?? [],
          }
        : {
            bodyMarkdown: e.bodyMarkdown,
            attachments: e.attachments ?? [],
            links: e.links ?? [],
          };
    },
    "g",
    0,
    function (e) {
      let { kind: r } = n(e);
      if ("updated" !== r) return (0, t.V)(e);
    },
    "B",
    0,
    n,
    "T",
    0,
    function (e) {
      let t = [
          e.createdAt,
          e.updatedAt,
          e.editedAt,
          e.publishedAt,
          e.latestUpdate?.createdAt,
        ],
        n = 0;
      for (let e of t) {
        if (!e) continue;
        let t = Date.parse(e);
        Number.isFinite(t) && t > n && (n = t);
      }
      return n;
    },
  ]);
};
