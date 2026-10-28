// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(
    ["H", 0, ["all", "open", "drafts", "banned", "recoverable"], "u", 0, "all"],
    375372,
  );
  let n = "/go/submissions",
    o = "/go/open",
    i = "/go/mine",
    e = `${n}/recent`,
    r = `${n}/mine`;
  t.s(
    [
      "Y",
      0,
      "/go",
      "Z",
      0,
      "/go/action-items",
      "b",
      0,
      "/go/bounties",
      "u",
      0,
      i,
      "c",
      0,
      o,
      "v",
      0,
      function (t = "all", n) {
        let o = new URLSearchParams();
        return ("all" !== t && o.set("mineStatus", t),
        n?.pendingRecoverableTaskId &&
          o.set("pendingRecoverableTaskId", n.pendingRecoverableTaskId),
        0 === o.size)
          ? i
          : `${i}?${o.toString()}`;
      },
      "W",
      0,
      n,
      "P",
      0,
      r,
      "F",
      0,
      e,
      "p",
      0,
      function (t, n) {
        if ("all" === t) return "/go";
        if ("bounty" === t)
          switch (n) {
            case "open":
            default:
              return o;
            case "mine":
              return i;
            case "drafts":
              return "/go/drafts";
          }
        return "submission" === t ? ("mine" === n ? r : e) : "/go";
      },
      "A",
      0,
      function (t, n) {
        return `/go/${t}/submissions/${n}`;
      },
      "E",
      0,
      function (t) {
        return t.fundingLandedOnChain || t.recoverableTaskIds.has(t.taskId)
          ? "recoverable"
          : "drafts";
      },
    ],
    409355,
  );
};
