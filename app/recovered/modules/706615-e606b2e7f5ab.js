// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(890088);
  let r = /^\d+(?:\.\d+)?$/,
    l = (e) => {
      if (null === e) return null;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : null;
    };
  e.s([
    "v",
    0,
    (e, t) => {
      let r = Math.max(0, Math.floor((e - t) / 1e3));
      return {
        days: Math.floor(r / 86400),
        hours: Math.floor(r / 3600) % 24,
        minutes: Math.floor(r / 60) % 60,
        seconds: r % 60,
      };
    },
    "H",
    0,
    (e) => {
      if ("live" === e.phase) {
        let t = l(e.endsAt);
        return null === t ? null : { kind: "ends", atMs: t };
      }
      if ("upcoming" === e.phase || "registration" === e.phase) {
        let t = l(e.startsAt);
        return null === t ? null : { kind: "starts", atMs: t };
      }
      return null;
    },
    "k",
    0,
    ({ text: e, locale: l }) => {
      let i = e.trim();
      if (!r.test(i)) return e;
      let a = Number(i);
      return (0, t.R)(l, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2 * !Number.isInteger(a),
      }).format(a);
    },
    "g",
    0,
    (e, t) => e?.live.some((e) => e.kind === t) ?? !1,
    "V",
    0,
    (e) => e.reduce((e, t) => Math.max(e, t.rankTo), 0),
    "y",
    0,
    (e, t) => {
      if (!e) return null;
      let r = (e) => e.kind === t;
      return e.live.find(r) ?? e.upcoming.find(r) ?? e.past.find(r) ?? null;
    },
    "J",
    0,
    (e, t) =>
      t < 1 ? null : (e.find((e) => t >= e.rankFrom && t <= e.rankTo) ?? null),
  ]);
};
