// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(426091),
    r = e.i(146695);
  let n = new Map([
      ["ig", "IG"],
      ["tiktok", "TikTok"],
      ["x", "X"],
    ]),
    i = new Set([
      "chillhouse",
      "cta",
      "damian",
      "discord",
      "download",
      "fb",
      "giveaway",
      "goals",
      "humbletest",
      "ig",
      "instagram",
      "kolscan",
      "neet",
      "news",
      "nikkkosd",
      "pftv",
      "tbc",
      "tiktok",
      "tomato",
      "trencher",
      "trenches",
      "ugctest",
      "youtube",
    ]);
  var a = e.i(261907),
    l = e.i(572544);
  let s = /^[A-Za-z0-9_-]{1,64}$/,
    o = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  e.s(
    [
      "l",
      0,
      ({ username: e, avatarUrl: t, inAppBrowser: n }) =>
        (({ destination: e, sharer: t, inAppBrowser: r, openGraph: n }) => {
          let i = new URLSearchParams();
          for (let [a, l] of (e.deepLink && i.set("af_dp", e.deepLink),
          i.set("af_web_dp", e.webFallback),
          i.set("af_force_deeplink", "true"),
          n &&
            (i.set("af_og_title", n.title),
            i.set("af_og_description", n.description),
            i.set("af_og_type", "website"),
            n.image && i.set("af_og_image", n.image)),
          "twitter" === r && i.set("af_r", e.webFallback),
          i.set("pid", t ? "User_invite" : "web_retail"),
          i.set("c", e.campaign),
          t &&
            (i.set("af_siteid", t),
            i.set("af_adset", t),
            i.set("shared_by", t),
            i.set("deep_link_sub1", t)),
          i.set("share_type", e.campaign),
          i.set("content_type", e.contentType),
          Object.entries(e.routingParams ?? {})))
            i.set(a, l);
          return `${a.f.APPSFLYER_BASE_URL}?${i.toString()}`;
        })({
          destination: {
            deepLink: `pump://profile/${e}`,
            webFallback: `${(0, l.f)()}${(0, r.$)(e)}`,
            campaign: "referral_link",
            contentType: "profile",
          },
          sharer: e,
          inAppBrowser: n,
          openGraph: {
            title: `${e} invited you to pump.fun`,
            description: "Trade internet trends.",
            image: t,
          },
        }),
      "H",
      0,
      ({ address: e, username: r }) => {
        let a;
        return !r ||
          !s.test(r) ||
          o.test(r) ||
          (0, t.Z)({ address: e, username: r })
          ? null
          : ((a = r.toLowerCase()), n.has(a) || i.has(a))
            ? null
            : r;
      },
      "y",
      0,
      (e) => `${(0, l.f)()}/u/${encodeURIComponent(e)}`,
      "d",
      0,
      (e) => `/?signup=1&referral=${encodeURIComponent(e)}`,
    ],
    137886,
  );
};
