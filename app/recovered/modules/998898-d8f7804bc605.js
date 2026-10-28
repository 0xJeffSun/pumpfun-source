// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "e",
    0,
    (e) => {
      let t = {
        kind: "multi",
        user: {
          name: "user",
          anonymous: null == e?.userAddress,
          key: e?.userAddress || "anonymous",
        },
        platform: { name: "platform", key: "web" },
        ...(e?.ccUserId
          ? { account: { name: "account", key: e.ccUserId } }
          : {}),
      };
      return e?.deviceId
        ? { ...t, device: { name: "device", key: e.deviceId } }
        : t;
    },
    "w",
    0,
    (e, t) =>
      e.user.key === t.user.key &&
      e.user.anonymous === t.user.anonymous &&
      e.account?.key === t.account?.key &&
      e.device?.key === t.device?.key,
  ]);
};
