// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(613677),
    n = e.i(417326),
    s = e.i(297865),
    r = e.i(342463),
    o = e.i(38279);
  let i = t.z.object({
      success: n.z.literal(!0),
      reconciled: s.z.boolean(),
      payedOutAt: r.z.string().optional(),
    }),
    a = t.z.object({
      success: n.z.literal(!0),
      reconciled: s.z.boolean(),
      disputeEndsAt: r.z.string().optional(),
    }),
    u = t.z.object({
      success: n.z.literal(!0),
      reconciled: s.z.boolean(),
      disputeEndsAt: r.z.string().optional(),
    }),
    d = (e, t) => {
      (e.invalidateQueries({
        queryKey: o.Q.BOUNTY_TASK_ONCHAIN_STATE(t),
        refetchType: "all",
      }),
        e.invalidateQueries({
          queryKey: o.Q.BOUNTY_TASK_ONCHAIN_DISPUTES(t),
          refetchType: "all",
        }));
    };
  e.s([
    "s",
    0,
    50,
    "p",
    0,
    "open-proposals-infinite",
    "i",
    0,
    100,
    "x",
    0,
    (e) => ("shadow" === e ? "users-banned-shadow" : "users-banned-perma"),
    "f",
    0,
    (e) => {
      let t = new URLSearchParams();
      (t.set("status", e.status),
        void 0 !== e.limit && t.set("limit", String(e.limit)),
        void 0 !== e.cursor && t.set("cursor", e.cursor));
      let n = t.toString();
      return n ? `?${n}` : "";
    },
    "A",
    0,
    (e) => {
      let t = new URLSearchParams();
      (void 0 !== e.limit && t.set("limit", String(e.limit)),
        void 0 !== e.cursor && t.set("cursor", e.cursor));
      let n = t.toString();
      return n ? `?${n}` : "";
    },
    "a",
    0,
    (e) => {
      for (let t of (e.invalidateQueries({
        queryKey: ["bounties", "publicListV2"],
      }),
      e.invalidateQueries({ queryKey: ["bounties", "publicList"] }),
      o.w))
        e.invalidateQueries({ queryKey: t });
    },
    "z",
    0,
    (e) => {
      (e.invalidateQueries({ queryKey: ["bounties", "moderation"] }),
        e.invalidateQueries({ queryKey: ["bounties", "publicList"] }));
    },
    "F",
    0,
    (e, t) => {
      for (let n of t)
        (e.invalidateQueries({
          queryKey: o.Q.BOUNTY_MODERATION_TASK_PROPOSALS(n),
        }),
          e.invalidateQueries({ queryKey: o.Q.BOUNTY_PUBLIC_TASK(n) }),
          e.invalidateQueries({ queryKey: o.Q.BOUNTY_TASK_DISPUTES(n) }),
          d(e, n));
    },
    "y",
    0,
    d,
    "v",
    0,
    (e, t) =>
      o.Q.BOUNTY_MODERATION_QUEUE(e, {
        limit: t,
        variant: "kanban-lane-infinite",
      }),
    "_",
    0,
    (e) =>
      o.Q.BOUNTY_MODERATION_QUEUE(e, { variant: "moderation-count-query" }),
    "o",
    0,
    (e, t) =>
      o.Q.BOUNTY_MODERATION_QUEUE(e, {
        limit: t,
        variant: "moderation-list-infinite",
      }),
    "P",
    0,
    (e) => ["bounties", "moderation", "task-title", e],
    "S",
    0,
    a,
    "q",
    0,
    u,
    "d",
    0,
    i,
  ]);
};
