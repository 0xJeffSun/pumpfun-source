// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "p",
    0,
    function (e) {
      let t = e?.x_username?.trim();
      return t
        ? { status: "ok", profile: { x_username: t } }
        : { status: "notFound" };
    },
    "k",
    0,
    function (e) {
      let t = e?.x_username?.trim();
      return t
        ? {
            x_username: t,
            x_profile_image_url: null,
            x_follower_count: null,
            x_profile_url: `https://x.com/${encodeURIComponent(t)}`,
          }
        : null;
    },
    "I",
    0,
    function (e, t) {
      if (!t) return e;
      let r = t.username.trim();
      if (!r) return e;
      let n = t.url?.trim() || null,
        i =
          "number" == typeof t.followerCount && Number.isFinite(t.followerCount)
            ? t.followerCount
            : (e?.x_follower_count ?? null);
      return {
        x_username: r,
        x_profile_image_url:
          t.profileImageUrl?.trim() || e?.x_profile_image_url || null,
        x_follower_count: i,
        x_profile_url:
          n ??
          (e && e.x_username === r ? e.x_profile_url : null) ??
          `https://x.com/${encodeURIComponent(r)}`,
      };
    },
  ]);
};
