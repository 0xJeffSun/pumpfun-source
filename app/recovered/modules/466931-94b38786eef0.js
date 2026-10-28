// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(315706),
    r = e.i(372123);
  let n = (e) =>
      e
        ? Object.fromEntries(
            Object.entries(e).filter(([, e]) => null != e && "" !== e),
          )
        : {},
    o = (0, r.S)({ dedupeWindowMs: 1e4, maxPerMinute: 30, maxPerSession: 300 }),
    i = (0, r.S)({ dedupeWindowMs: 0, maxPerMinute: 60, maxPerSession: 1e3 });
  e.s([
    "B",
    0,
    function ({ name: e, feature: o, operation: s, context: a }) {
      let l = i.admit(`${o}|${s ?? ""}|${e}`, Date.now());
      if (!l.admit && !l.notice) return;
      let u = { feature: o, ...(s ? { operation: s } : {}), ...n(a) };
      (0, t.f)()
        .then(({ datadogRum: t }) => {
          if ((l.admit && t.addAction(e, u), l.notice)) {
            let e = (0, r.n)(l.notice);
            t.addError(e.error, { ...e.context, operation: "action-budget" });
          }
        })
        .catch(() => {});
    },
    "l",
    0,
    function ({ error: e, feature: i, operation: s, context: a }) {
      let l = ((e) => {
          if (e instanceof Error) return e;
          if ("string" == typeof e) return Error(e);
          try {
            return Error(JSON.stringify(e));
          } catch {
            return Error("Unknown error");
          }
        })(e),
        u = o.admit(`${i}|${s ?? ""}|${l.message}`, Date.now());
      if (!u.admit && !u.notice) return;
      let c = { feature: i, ...(s ? { operation: s } : {}), ...n(a) };
      (0, t.f)()
        .then(({ datadogRum: e }) => {
          if ((u.admit && e.addError(l, c), u.notice)) {
            let t = (0, r.n)(u.notice);
            e.addError(t.error, t.context);
          }
        })
        .catch(() => {});
    },
  ]);
};
