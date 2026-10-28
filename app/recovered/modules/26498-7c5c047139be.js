// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(613677),
    n = e.i(169119),
    i = e.i(342463),
    r = e.i(404224),
    a = e.i(126965),
    s = e.i(692159);
  let l = "/messages",
    o = t.z.object({
      metadata: n.z.record(i.z.string(), i.z.string()).optional(),
    }),
    c = new Set(["dm_message", "dm", "chat", "direct_message"]);
  e.s([
    "q",
    0,
    (e) => {
      let t = e.senderUserId ?? e.conversationId;
      return t ? `${l}/${encodeURIComponent(t)}` : l;
    },
    "$",
    0,
    ({ data: e, notificationImage: t }) =>
      e.enhancedPresentationIconUrl || e.imageUrl || e.imageURL || t || void 0,
    "k",
    0,
    (e) => {
      let { deeplink: t } = e;
      if (!t?.startsWith("pump://")) return;
      let n = (0, s.Y)(t);
      if (n?.type !== "dm") return;
      let i = ((e) => {
        if (e)
          try {
            let t = o.safeParse(JSON.parse(e));
            if (!t.success) return;
            return t.data.metadata?.senderUserId || void 0;
          } catch {
            return;
          }
      })(e.genericV1);
      return {
        ...(n.id ? { conversationId: n.id } : {}),
        ...(i ? { senderUserId: i } : {}),
      };
    },
    "Y",
    0,
    (e) => {
      let t = e.genericV1?.notificationSubtype;
      return (
        !!(
          (void 0 !== t && c.has(t)) ||
          e.navigation?.pathname.startsWith("/dms")
        ) || e.deeplink.startsWith("pump://dms")
      );
    },
    "O",
    0,
    ({ target: e, pathname: t, queryClient: n }) => {
      let i = [e.senderUserId, e.conversationId].filter((e) => !!e);
      return i.some(r.X)
        ? "active_room"
        : t === l
          ? "inbox_open"
          : (({ queryClient: e, ids: t, now: n = Date.now() }) => {
                if (0 === t.length) return !1;
                let i = new Set(t);
                for (let [, t] of e.getQueriesData({ queryKey: (0, a.c)() }))
                  for (let e of t?.pages ?? [])
                    for (let t of e.entries)
                      if (i.has(t.conversationId) || i.has(t.peerId)) {
                        if (!t.isMuted) return !1;
                        if (null === t.mutedUntil) return !0;
                        return Date.parse(t.mutedUntil) > n;
                      }
                return !1;
              })({ queryClient: n, ids: i })
            ? "muted"
            : "toast";
    },
  ]);
};
