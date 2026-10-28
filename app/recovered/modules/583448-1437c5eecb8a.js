// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(50969),
    r = e.i(637172),
    n = e.i(559015);
  let i = ["1h", "4h", "12h", "24h"],
    a = "1h",
    l = (e) => "string" == typeof e && i.includes(e);
  e.s(["L", 0, a, "W", 0, i, "U", 0, (e) => (l(e) ? e : a), "M", 0, l], 491208);
  let o = "trending",
    s = ({ board: e, window: t = a }) =>
      e === o ? { ranking: "social", window: t } : {},
    d = "label",
    u = (e) => (e === o ? { hot: d } : {});
  e.s(
    [
      "s",
      0,
      "movers",
      "D",
      0,
      d,
      "X",
      0,
      o,
      "h",
      0,
      (e) =>
        !!e &&
        "object" == typeof e &&
        "delta" === e.type &&
        Array.isArray(e.patches),
      "f",
      0,
      (e) =>
        !!e &&
        "object" == typeof e &&
        "snapshot" === e.type &&
        Array.isArray(e.entries),
      "j",
      0,
      u,
      "_",
      0,
      s,
    ],
    239453,
  );
  var c = e.i(503774);
  let p = [
    "solana",
    "robinhood",
    "base",
    "bsc",
    "ethereum",
    "arc",
    "megaeth",
    "xlayer",
    "monad",
    "polygon",
    "arbitrum",
    "near",
    "ton",
    "starknet",
  ];
  e.s(
    [
      "y",
      0,
      150,
      "D",
      0,
      p,
      "f",
      0,
      function (e) {
        let i = new URLSearchParams({
          tier: "web",
          surface: "trending" === e.board ? "TRENDING" : "WEB",
          platform: "WEB",
          limit: String(Math.min(e.limit, 150)),
        });
        (e.userId && i.append("userId", e.userId),
          e.pumpUserId && i.append("pumpUserId", e.pumpUserId),
          e.sessionId && i.append("session_id", e.sessionId),
          e.deviceId && i.append("device_id", e.deviceId),
          void 0 !== e.sessionStartTimestampMs &&
            i.append(
              "session_start_timestamp_ms",
              String(e.sessionStartTimestampMs),
            ),
          e.country && i.append("country", e.country),
          i.append(
            "chains",
            (({ chain: e = "all", chains: t, exposure: n }) => {
              let i = (0, r.W)(p, n),
                a = t?.length ? i.filter((e) => t.includes(e)) : [];
              return a.length > 0
                ? a.map(r.r).join(",")
                : "all" !== e
                  ? (0, r.r)(e)
                  : i.map(r.r).join(",");
            })(e),
          ),
          void 0 !== e.offset && i.append("offset", String(e.offset)));
        let a = e.board ?? "movers";
        for (let [t, r] of Object.entries({
          ...s({ board: a, window: e.window }),
          ...u(a),
        }))
          i.append(t, r);
        return (
          e.includeFollowedHolders &&
            (i.append("includeFollowedHolders", "true"),
            i.append("followedHoldersLimit", String(n.A))),
          `${(0, t.f)()}/boards/${a}?${i.toString()}`
        );
      },
      "$",
      0,
      function (e, t) {
        return (0, c.q)(e, t);
      },
    ],
    583448,
  );
};
