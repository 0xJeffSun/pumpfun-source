// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024),
    r = e.i(146742),
    n = e.i(959193),
    i = e.i(90832);
  let s = { SOL: t.i.SOL.mint },
    a = { min: 0, max: 1e4 },
    o = {
      "reward-desc": { sort: "rewardTotalUsd", order: "desc" },
      "reward-asc": { sort: "rewardTotalUsd", order: "asc" },
      "time-asc": { sort: "expiresAt", order: "asc" },
      "submissions-desc": { sort: "submissionCount", order: "desc" },
      recent: { sort: "createdAt", order: "desc" },
    };
  function l(e) {
    if (e >= 1e6) {
      let t = Math.round(e / 1e6);
      return t >= 1e3
        ? `${Math.round(e / 1e9).toLocaleString()}B`
        : `${t.toLocaleString()}M`;
    }
    if (e >= 1e3) {
      let t = Math.round(e / 1e3);
      return t >= 1e3
        ? `${Math.round(e / 1e6).toLocaleString()}M`
        : `${t.toLocaleString()}K`;
    }
    return Math.round(e).toLocaleString();
  }
  function u(e, t = Date.now()) {
    if (!e) return null;
    let r = Date.parse(e);
    if (Number.isNaN(r)) return null;
    let n = r - t;
    if (n <= 0) return "Expired";
    let i = Math.floor(n / 36e5),
      s = Math.floor(i / 24);
    if (s >= 1) return `${s}d ${String(i % 24).padStart(2, "0")}h`;
    let a = Math.max(1, Math.floor((n % 36e5) / 6e4));
    return i >= 1 ? `${i}h ${a}m` : `${a}m`;
  }
  e.s([
    "h",
    0,
    s,
    "Z",
    0,
    [{ key: "SOL", label: "SOL" }],
    "V",
    0,
    a,
    "k",
    0,
    [
      { value: "reward-desc", label: "Highest reward" },
      { value: "recent", label: "Newest" },
      { value: "time-asc", label: "Ending soon" },
    ],
    "X",
    0,
    [
      { key: "OPEN", label: "Open" },
      { key: "PENDING_RESOLUTION", label: "Pending dispute" },
      { key: "CLOSED", label: "Expired" },
      { key: "IN_DISPUTE_PERIOD", label: "In dispute period" },
    ],
    "w",
    0,
    [
      { key: "lt-24h", label: "< 24 hours" },
      { key: "lt-3d", label: "< 3 days" },
      { key: "lt-7d", label: "< 7 days" },
      { key: "gte-7d", label: "7+ days" },
    ],
    "B",
    0,
    [
      { value: "submissions-desc", label: "Most liked" },
      { value: "reward-desc", label: "Highest reward" },
      { value: "recent", label: "Newest" },
    ],
    "N",
    0,
    function ({ sortKey: e, filters: t, nearMe: i = null, now: l = Date.now }) {
      let u = {},
        d = l(),
        c = "time-asc" === e;
      if (i)
        ((u.sort = "distance"),
          (u.order = "asc"),
          (u.lat = i.lat),
          (u.lng = i.lng),
          (u.radiusKm = i.radiusKm));
      else {
        let t = o[e];
        t && ((u.sort = t.sort), (u.order = t.order));
      }
      (t.q.trim().length > 0 && (u.q = t.q.trim()),
        c || (i && 0 === t.statuses.length)
          ? (u.phase = n.d)
          : 0 === t.statuses.length
            ? (u.phase = r.H)
            : 1 === t.statuses.length
              ? (u.phase = t.statuses[0])
              : t.statuses.length > 1 && (u.phase = t.statuses.join(",")),
        t.rewardTokens.length > 0 &&
          (u.rewardMints = t.rewardTokens.map((e) => s[e])),
        null != t.rewardUsdMin &&
          t.rewardUsdMin > 0 &&
          (u.rewardTotalUsdGte = t.rewardUsdMin),
        null != t.rewardUsdMax &&
          t.rewardUsdMax < a.max &&
          (u.rewardTotalUsdLte = t.rewardUsdMax));
      let f = (function (e, t) {
        if (!e) return t;
        if (!t) return e;
        let r =
            e.gte && t.gte ? (e.gte > t.gte ? e.gte : t.gte) : (e.gte ?? t.gte),
          n =
            e.lte && t.lte ? (e.lte < t.lte ? e.lte : t.lte) : (e.lte ?? t.lte);
        return { ...(r ? { gte: r } : {}), ...(n ? { lte: n } : {}) };
      })(
        c ? { lte: new Date(d + 864e5).toISOString() } : null,
        (function (e, t) {
          if (!e) return null;
          let r = new Date(t).toISOString();
          switch (e) {
            case "lt-24h":
              return { gte: r, lte: new Date(t + 864e5).toISOString() };
            case "lt-3d":
              return { gte: r, lte: new Date(t + 2592e5).toISOString() };
            case "lt-7d":
              return { gte: r, lte: new Date(t + 6048e5).toISOString() };
            case "gte-7d":
              return { gte: new Date(t + 6048e5).toISOString() };
            default:
              return null;
          }
        })(t.timeLeft, d),
      );
      return (
        f &&
          (f.gte && (u.expiresAtGte = f.gte),
          f.lte && (u.expiresAtLte = f.lte)),
        u
      );
    },
    "t",
    0,
    function ({ expiresAt: e, createdAt: t, nowMs: r = Date.now() }) {
      if (!e) return 100;
      let n = Date.parse(e),
        i = Date.parse(t);
      if (Number.isNaN(n) || Number.isNaN(i)) return 100;
      let s = n - r;
      if (s <= 0) return 0;
      let a = n - i;
      return a <= 0 ? 100 : Math.min(100, Math.max(0, (s / a) * 100));
    },
    "G",
    0,
    function (e) {
      return !Number.isFinite(e) || e <= 0
        ? "$0"
        : e < 1e3
          ? (0, i.c)(e)
          : `$${l(e)}`;
    },
    "u",
    0,
    u,
    "U",
    0,
    function (e, t = Date.now()) {
      let r = u(e, t);
      return r
        ? "Expired" === r || r.endsWith(" left")
          ? r
          : `${r} left`
        : null;
    },
    "z",
    0,
    l,
    "v",
    0,
    (e, t) => {
      if ("DRAFT" === e) return "DRAFT";
      if ("PENDING_RESOLUTION" !== e) return e;
      if (!t) return "OPEN";
      let r = Date.parse(t);
      return Number.isNaN(r) || r > Date.now() ? "OPEN" : "PENDING_RESOLUTION";
    },
  ]);
};
