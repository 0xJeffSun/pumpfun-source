// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.deprecationNoticeDays =
      r.isoDateToUnixMs =
      r.publicDeprecations =
      r.deprecations =
      r.isDeprecated =
      r.DEPRECATION_NOTICE_EXCEPTIONS =
      r.MIN_DEPRECATION_NOTICE_DAYS =
        void 0),
    (r.MIN_DEPRECATION_NOTICE_DAYS = 90),
    (r.DEPRECATION_NOTICE_EXCEPTIONS = {}),
    (r.isDeprecated = (e) => void 0 !== e.deprecation));
  let o = ([e], [t]) => (e < t ? -1 : +(e > t));
  ((r.deprecations = (e) =>
    Object.fromEntries(
      Object.entries(e)
        .filter((e) => (0, r.isDeprecated)(e[1]))
        .map(([e, t]) => [e, t.deprecation])
        .sort(o),
    )),
    (r.publicDeprecations = (e) =>
      (0, r.deprecations)(
        Object.fromEntries(
          Object.entries(e).filter(([, e]) => "public" === e.visibility),
        ),
      )));
  let n = /^\d{4}-\d{2}-\d{2}$/;
  ((r.isoDateToUnixMs = (e) => {
    if (!n.test(e)) return null;
    let t = Date.parse(`${e}T00:00:00.000Z`);
    return Number.isNaN(t)
      ? null
      : new Date(t).toISOString().slice(0, 10) === e
        ? t
        : null;
  }),
    (r.deprecationNoticeDays = (e) => {
      let t = (0, r.isoDateToUnixMs)(e.since),
        o = (0, r.isoDateToUnixMs)(e.sunset);
      return null === t || null === o ? null : Math.floor((o - t) / 864e5);
    }));
};
