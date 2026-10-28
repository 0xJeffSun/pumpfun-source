// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    ["H", 0, ["all", "open", "drafts", "banned", "recoverable"], "u", 0, "all"],
    375372,
  );
  let t = "/go/submissions",
    r = "/go/open",
    n = "/go/mine",
    a = `${t}/recent`,
    i = `${t}/mine`;
  e.s(
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
      n,
      "c",
      0,
      r,
      "v",
      0,
      function (e = "all", t) {
        let r = new URLSearchParams();
        return ("all" !== e && r.set("mineStatus", e),
        t?.pendingRecoverableTaskId &&
          r.set("pendingRecoverableTaskId", t.pendingRecoverableTaskId),
        0 === r.size)
          ? n
          : `${n}?${r.toString()}`;
      },
      "W",
      0,
      t,
      "P",
      0,
      i,
      "F",
      0,
      a,
      "p",
      0,
      function (e, t) {
        if ("all" === e) return "/go";
        if ("bounty" === e)
          switch (t) {
            case "open":
            default:
              return r;
            case "mine":
              return n;
            case "drafts":
              return "/go/drafts";
          }
        return "submission" === e ? ("mine" === t ? i : a) : "/go";
      },
      "A",
      0,
      function (e, t) {
        return `/go/${e}/submissions/${t}`;
      },
      "E",
      0,
      function (e) {
        return e.fundingLandedOnChain || e.recoverableTaskIds.has(e.taskId)
          ? "recoverable"
          : "drafts";
      },
    ],
    409355,
  );
};
