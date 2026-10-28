// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(692159);
  let n = async ({ api: e, payload: t }) => {
    await e
      .post("notifications/confirm-delivery", {
        json: {
          notificationId: t.notificationId,
          userId: t.userId,
          timestamp: t.timestamp,
          platform: "web",
          deliveryLocation: "in_app",
          ...(t.deviceId ? { deviceId: t.deviceId } : {}),
        },
      })
      .catch(() => void 0);
  };
  e.s([
    "F",
    0,
    n,
    "m",
    0,
    (e) =>
      (0, t.H)({
        deeplink: e.deeplink,
        listNavigation: e.navigation ?? e.genericV1?.listNavigation,
      }),
    "P",
    0,
    (e) => ({
      id: e.notificationId || e.messageId,
      title: e.title,
      body: e.body,
      deeplink: e.deeplink,
      imageUrl: e.imageURL || void 0,
      timestamp: e.timestamp || e.createdAt,
      type: e.type,
      navigation: e.genericV1?.listNavigation,
      genericV1: e.genericV1,
      mintAddress: e.mintAddress || e.genericV1?.coinMetadata?.mintAddress,
    }),
  ]);
};
