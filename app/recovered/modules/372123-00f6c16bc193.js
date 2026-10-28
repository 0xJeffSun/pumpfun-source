// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "rumErrorBudget";
  e.s([
    "S",
    0,
    (e) => {
      let { dedupeWindowMs: t, maxPerMinute: r, maxPerSession: n } = e,
        o = new Map(),
        i = -1 / 0,
        s = 0,
        a = !1,
        l = 0,
        u = 0,
        c = !1,
        d = (e) => ({
          scope: e,
          limit: "minute" === e ? r : n,
          admittedInWindow: s,
          sessionAdmitted: l,
          sessionSuppressed: u,
        });
      return {
        admit: (e, f) => {
          if (c) return ((u += 1), { admit: !1, reason: "session-exhausted" });
          f - i >= 6e4 && ((i = f), (s = 0), (a = !1));
          let p = o.get(e);
          if (void 0 !== p && f - p < t)
            return ((u += 1), { admit: !1, reason: "duplicate" });
          if (s >= r)
            return ((u += 1), a)
              ? { admit: !1, reason: "rate-limited" }
              : ((a = !0),
                { admit: !1, reason: "rate-limited", notice: d("minute") });
          if (o.size >= 512) {
            for (let [e, r] of o) f - r >= t && o.delete(e);
            o.size >= 512 && o.clear();
          }
          return (o.set(e, f), (s += 1), (l += 1) >= n)
            ? ((c = !0), { admit: !0, notice: d("session") })
            : { admit: !0 };
        },
      };
    },
    "D",
    0,
    ({ budget: e, onExhausted: r, now: n = () => Date.now() }) =>
      (o) => {
        if ("error" !== o.type || o.context?.[t] === "notice") return !1;
        let i = e.admit(
          ((e) => {
            if ("error" !== e.type) return "";
            let t = e.context;
            return [
              e.error.source,
              e.error.message ?? "",
              t?.feature ?? "",
              t?.operation ?? "",
            ].join("|");
          })(o),
          n(),
        );
        if (i.notice) {
          let e = i.notice;
          setTimeout(() => r(e), 0);
        }
        return !i.admit;
      },
    "n",
    0,
    (e) => ({
      error: Error("RUM error budget exhausted"),
      context: {
        feature: "observability",
        operation: "error-budget",
        [t]: "notice",
        scope: e.scope,
        limit: e.limit,
        admittedInWindow: e.admittedInWindow,
        sessionAdmitted: e.sessionAdmitted,
        sessionSuppressed: e.sessionSuppressed,
      },
    }),
  ]);
};
