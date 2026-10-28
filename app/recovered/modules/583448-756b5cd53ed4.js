// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(50969),
    a = e.i(637172),
    i = e.i(559015);
  let n = ["1h", "4h", "12h", "24h"],
    r = "1h",
    l = (e) => "string" == typeof e && n.includes(e);
  e.s(["L", 0, r, "W", 0, n, "U", 0, (e) => (l(e) ? e : r), "M", 0, l], 491208);
  let s = "trending",
    o = ({ board: e, window: t = r }) =>
      e === s ? { ranking: "social", window: t } : {},
    d = "label",
    u = (e) => (e === s ? { hot: d } : {});
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
      s,
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
      o,
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
        let n = new URLSearchParams({
          tier: "web",
          surface: "trending" === e.board ? "TRENDING" : "WEB",
          platform: "WEB",
          limit: String(Math.min(e.limit, 150)),
        });
        (e.userId && n.append("userId", e.userId),
          e.pumpUserId && n.append("pumpUserId", e.pumpUserId),
          e.sessionId && n.append("session_id", e.sessionId),
          e.deviceId && n.append("device_id", e.deviceId),
          void 0 !== e.sessionStartTimestampMs &&
            n.append(
              "session_start_timestamp_ms",
              String(e.sessionStartTimestampMs),
            ),
          e.country && n.append("country", e.country),
          n.append(
            "chains",
            (({ chain: e = "all", chains: t, exposure: i }) => {
              let n = (0, a.W)(p, i),
                r = t?.length ? n.filter((e) => t.includes(e)) : [];
              return r.length > 0
                ? r.map(a.r).join(",")
                : "all" !== e
                  ? (0, a.r)(e)
                  : n.map(a.r).join(",");
            })(e),
          ),
          void 0 !== e.offset && n.append("offset", String(e.offset)));
        let r = e.board ?? "movers";
        for (let [t, a] of Object.entries({
          ...o({ board: r, window: e.window }),
          ...u(r),
        }))
          n.append(t, a);
        return (
          e.includeFollowedHolders &&
            (n.append("includeFollowedHolders", "true"),
            n.append("followedHoldersLimit", String(i.A))),
          `${(0, t.f)()}/boards/${r}?${n.toString()}`
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
