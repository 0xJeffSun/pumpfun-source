// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(146695),
    n = e.i(399861),
    i = e.i(646908);
  let r = `${i.d}:`,
    a = (e) => {
      let { pathname: t, params: n } = e,
        i = n?.mint,
        r = n?.id ?? n?.userIdentifier,
        a = n?.taskId;
      return "/coins/[mint]" === t && i
        ? { type: "coin", mint: i, ...(n?.source ? { source: n.source } : {}) }
        : "/profile/[id]" === t && r
          ? { type: "profile", id: r }
          : "/achievements/[id]" === t && r
            ? { type: "achievement", id: r }
            : "/trending/[mint]" === t && i
              ? {
                  type: "trending",
                  mint: i,
                  ...(n?.source ? { source: n.source } : {}),
                }
              : "/bounties/[taskId]" === t && a
                ? {
                    type: "bounty",
                    taskId: a,
                    ...(n?.submissionId
                      ? { submissionId: n.submissionId }
                      : {}),
                    ...(n?.comment ? { comment: n.comment } : {}),
                  }
                : "/go/[id]/submissions/[submissionId]" === t &&
                    n?.id &&
                    n?.submissionId
                  ? {
                      type: "bounty",
                      taskId: n.id,
                      submissionId: n.submissionId,
                      ...(n.comment ? { comment: n.comment } : {}),
                    }
                  : "/go/[id]" === t && n?.id
                    ? {
                        type: "bounty",
                        taskId: n.id,
                        ...(n.submissionId
                          ? { submissionId: n.submissionId }
                          : {}),
                        ...(n.comment ? { comment: n.comment } : {}),
                      }
                    : "/communities" === t
                      ? { type: "communities" }
                      : "/coins/community/[mint]" === t && i
                        ? { type: "community", mint: i }
                        : "/dms" === t
                          ? { type: "dm" }
                          : "/dms/[userId]" === t && n?.userId
                            ? { type: "dm", id: n.userId }
                            : { type: "route", pathname: t, params: n };
    },
    s = (e) => {
      switch (e.type) {
        case "coin":
          return `/coin/${encodeURIComponent(
            ((e) => {
              if (!e.startsWith(r)) return e;
              let t = e.slice(r.length);
              return (0, i.n)(t) ? t : e;
            })(e.mint),
          )}`;
        case "profile":
          return (0, t.$)(e.id);
        case "trending":
          return `/trending/${encodeURIComponent(e.mint)}`;
        case "communities":
          return "/communities";
        case "community":
          return `/coins/community/${encodeURIComponent(e.mint)}`;
        case "communityPost":
          return `/coins/community/replies/${encodeURIComponent(e.mint)}/${encodeURIComponent(e.postId)}`;
        case "bounty": {
          let t = e.submissionId
            ? `/go/${encodeURIComponent(e.taskId)}/submissions/${encodeURIComponent(e.submissionId)}`
            : `/go/${encodeURIComponent(e.taskId)}`;
          return e.comment
            ? `${t}?comment=${encodeURIComponent(e.comment)}`
            : t;
        }
        case "dm":
          return e.id ? `/messages/${encodeURIComponent(e.id)}` : "/messages";
        case "achievement":
          return (0, n.B)(e.id, { reveal: !0 });
        case "route":
          var a, s;
          return (
            (a = e.pathname),
            (s = e.params)
              ? Object.entries(s).reduce(
                  (e, [t, n]) => e.replace(`[${t}]`, encodeURIComponent(n)),
                  a,
                )
              : a
          );
        default:
          return "/";
      }
    },
    l = (e) => {
      let t = e.replace(/^pump:\/\/coin\//, "pump://coins/");
      try {
        let e = new URL(t);
        if ("pump:" !== e.protocol) return null;
        let n = e.searchParams.get("source") ?? "notification";
        if ("coins" === e.hostname) {
          let t = e.pathname.replace(/^\//, "").split("/")[0];
          if (!t) return null;
          return { type: "coin", mint: t, source: n };
        }
        if ("coin" === e.hostname) {
          let t = e.searchParams.get("mint");
          if (!t) return null;
          return { type: "coin", mint: t, source: n };
        }
        if ("profile" === e.hostname) {
          let t = e.pathname.replace(/^\//, "").split("/")[0];
          if (!t) return null;
          return { type: "profile", id: t };
        }
        if ("trending" === e.hostname) {
          let t = e.pathname.replace(/^\//, "").split("/")[0];
          if (!t) return null;
          return { type: "trending", mint: t, source: n };
        }
        if ("communities" === e.hostname) {
          let t = e.pathname.split("/").filter(Boolean),
            n = t[0]?.trim();
          if (!n) return { type: "communities" };
          let i = "posts" === t[1] ? t[2]?.trim() : void 0;
          if (i) return { type: "communityPost", mint: n, postId: i };
          return { type: "community", mint: n };
        }
        if ("go" === e.hostname) {
          let t = e.pathname.split("/").filter(Boolean),
            n = t[0]?.trim();
          if (!n) return null;
          let i = "submissions" === t[1] ? t[2]?.trim() : void 0,
            r = e.searchParams.get("comment") ?? void 0;
          return {
            type: "bounty",
            taskId: n,
            ...(i ? { submissionId: i } : {}),
            ...(r ? { comment: r } : {}),
          };
        }
        if ("account" === e.hostname)
          return { type: "route", pathname: `/account${e.pathname}` };
        if ("dms" === e.hostname) {
          let t = e.pathname.replace(/^\//, "").split("/")[0]?.trim();
          return t ? { type: "dm", id: t } : { type: "dm" };
        }
        if ("achievements" === e.hostname) {
          let t = e.pathname.replace(/^\//, "").split("/")[0]?.trim();
          if (!t) return null;
          return { type: "achievement", id: t };
        }
        return {
          type: "route",
          pathname: `/${e.hostname}${e.pathname}`,
          params: Object.fromEntries(e.searchParams.entries()),
        };
      } catch {
        return null;
      }
    };
  e.s([
    "_",
    0,
    s,
    "G",
    0,
    a,
    "Y",
    0,
    l,
    "H",
    0,
    ({ deeplink: e, listNavigation: t }) => {
      if (t) return s(a(t));
      if (e?.startsWith("pump://")) {
        let t = l(e);
        if (t) return s(t);
      }
      if (e?.startsWith("/")) return e;
      if (e?.startsWith("http"))
        try {
          let t = new URL(e);
          return `${t.pathname}${t.search}`;
        } catch {}
      return "/";
    },
  ]);
};
