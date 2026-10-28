// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(426091),
    n = e.i(367498),
    i = e.i(352386),
    a = e.i(897665);
  let l = "pump-recent-profile:v1";
  function s() {
    try {
      var e = window.localStorage.getItem(l);
      if (!e) return null;
      try {
        let t = JSON.parse(e);
        if ("string" == typeof t?.address && t.address)
          return {
            address: t.address,
            ...("string" == typeof t.userId && t.userId
              ? { userId: t.userId }
              : {}),
            profileImage:
              "string" == typeof t.profileImage && t.profileImage
                ? t.profileImage
                : null,
            displayImage:
              "string" == typeof t.displayImage && t.displayImage
                ? t.displayImage
                : null,
            username:
              "string" == typeof t.username && t.username ? t.username : null,
            lastUsedAt: "number" == typeof t.lastUsedAt ? t.lastUsedAt : null,
          };
      } catch {}
      return null;
    } catch {
      return null;
    }
  }
  e.s([
    "J",
    0,
    s,
    "X",
    0,
    function () {
      let e,
        r,
        n,
        a = (0, t.c)(4),
        [l, o] = (0, i.useState)(null);
      return (
        a[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = () => {
              o(s());
            }),
            (r = []),
            (a[0] = e),
            (a[1] = r))
          : ((e = a[0]), (r = a[1])),
        (0, i.useEffect)(e, r),
        a[2] !== l
          ? ((n = { recentProfile: l }), (a[2] = l), (a[3] = n))
          : (n = a[3]),
        n
      );
    },
    "v",
    0,
    function (e) {
      try {
        let t = {
          ...e,
          displayImage: (function (e) {
            if (!e) return null;
            let t = (0, n.D)(e, a.f);
            return t && t !== r.A ? (0, n.p)(t, 80, 80) : null;
          })(e.profileImage),
        };
        window.localStorage.setItem(l, JSON.stringify(t));
      } catch {}
    },
  ]);
};
