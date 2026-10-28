// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(146695),
    a = e.i(786480),
    n = e.i(365089),
    i = e.i(782067),
    s = e.i(605587),
    o = e.i(639374);
  let l = (e) => (0, o.f)(e) || (0, s.h)(e);
  e.s(
    [
      "f",
      0,
      (e) => {
        let s,
          c,
          u,
          d,
          p,
          m,
          h,
          f,
          g = (0, t.c)(30);
        g[0] !== e
          ? ((s = { address: e }), (g[0] = e), (g[1] = s))
          : (s = g[1]);
        let { data: y, isLoading: b } = (0, i.T)(s),
          v = y?.username ?? null,
          w = y?.address ?? "";
        g[2] !== w || g[3] !== e
          ? ((c = l(e) ? e : "" !== w && w !== e && l(w) ? w : null),
            (g[2] = w),
            (g[3] = e),
            (g[4] = c))
          : (c = g[4]);
        let E = c;
        g[5] !== w || g[6] !== e
          ? ((u = (0, o.f)(e)
              ? e
              : "" !== w && w !== e && (0, o.f)(w)
                ? w
                : null),
            (g[5] = w),
            (g[6] = e),
            (g[7] = u))
          : (u = g[7]);
        let _ = u;
        g[8] !== e || g[9] !== v
          ? ((d = v ?? (0, n.d)(e)), (g[8] = e), (g[9] = v), (g[10] = d))
          : (d = g[10]);
        let k = d;
        g[11] !== e || g[12] !== y?.userId
          ? ((p = (0, a.f)(e) ? e : (y?.userId ?? null)),
            (g[11] = e),
            (g[12] = y?.userId),
            (g[13] = p))
          : (p = g[13]);
        let I = p;
        g[14] !== y?.bio
          ? ((m = y?.bio?.trim() || null), (g[14] = y?.bio), (g[15] = m))
          : (m = g[15]);
        let O = m,
          T = y?.profile_image ?? void 0,
          R = E ?? e;
        return (
          g[16] !== I || g[17] !== E
            ? ((h = (0, r.$)({ address: E, userId: I })),
              (g[16] = I),
              (g[17] = E),
              (g[18] = h))
            : (h = g[18]),
          g[19] !== O ||
          g[20] !== I ||
          g[21] !== k ||
          g[22] !== b ||
          g[23] !== _ ||
          g[24] !== T ||
          g[25] !== R ||
          g[26] !== h ||
          g[27] !== v ||
          g[28] !== E
            ? ((f = {
                displayName: k,
                username: v,
                avatarSrc: T,
                bio: O,
                avatarSeed: R,
                walletAddress: E,
                profileHref: h,
                solanaWalletAddress: _,
                ccUserId: I,
                isLoading: b,
              }),
              (g[19] = O),
              (g[20] = I),
              (g[21] = k),
              (g[22] = b),
              (g[23] = _),
              (g[24] = T),
              (g[25] = R),
              (g[26] = h),
              (g[27] = v),
              (g[28] = E),
              (g[29] = f))
            : (f = g[29]),
          f
        );
      },
    ],
    673550,
  );
  var c = e.i(402030),
    u = e.i(322315),
    d = e.i(254010),
    p = e.i(574472),
    m = e.i(761459),
    h = e.i(759257),
    f = e.i(126965),
    g = e.i(779106);
  let y =
      c.contract["GET /users/{id}/mutual-followers"].response.shape
        .mutualFollowers.element,
    b = c.contract["GET /users/{id}/mutual-followers"].response
      .pick({ mutualFollowers: !0, hasMore: !0 })
      .extend({
        mutualFollowers: y
          .pick({ userId: !0 })
          .extend({
            username: y.shape.username.nullish(),
            bio: y.shape.bio.nullish(),
            profileImageUrl: y.shape.profileImageUrl.nullish(),
            walletAddress: y.shape.walletAddress.nullish(),
          })
          .array(),
      }),
    v = async ({ profileId: e, offset: t, limit: r, signal: a }) => {
      let n = await (0, h.j)()("GET /users/{id}/mutual-followers", {
          params: { id: e },
          query: { limit: r, offset: t },
          credentials: "include",
          signal: a,
          throwHttpErrors: !1,
          hooks: {
            afterResponse: [
              (e, t, r) => {
                if (!r.ok)
                  throw Error(`Failed to fetch mutual followers: ${r.status}`);
              },
            ],
          },
        }),
        i = b.parse(n);
      return {
        hasMore: i.hasMore,
        picks: i.mutualFollowers.map((e) => ({
          userId: e.userId,
          username: e.username ?? "",
          bio: e.bio?.trim() || null,
          profileImageUrl: e.profileImageUrl || null,
          walletAddress: e.walletAddress || null,
        })),
      };
    };
  function w(e, t) {
    return e.hasMore ? 50 * t.length : void 0;
  }
  function E(e) {
    return e.picks;
  }
  function _(e) {
    let t = new Set();
    return e.pages
      .flatMap(E)
      .filter((e) => !t.has(e.userId) && (t.add(e.userId), !0));
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          a,
          n,
          i,
          s = (0, t.c)(10);
        s[0] !== e
          ? ((r = void 0 === e ? {} : e), (s[0] = e), (s[1] = r))
          : (r = s[1]);
        let { enabled: o } = r,
          { address: l } = (0, p.F)(),
          c = (0, g.f)("dm-mutual-picks"),
          h = (0, d.k)(u.D.WEB_DIRECT_MESSAGES),
          y = l ?? "";
        s[2] !== c
          ? ((a = (0, f.b)(c, 50)), (s[2] = c), (s[3] = a))
          : (a = s[3]);
        let b = (void 0 === o || o) && h && null !== c && "" !== y;
        return (
          s[4] !== y
            ? ((n = (e) => {
                let { pageParam: t, signal: r } = e;
                return v({ profileId: y, offset: t, limit: 50, signal: r });
              }),
              (s[4] = y),
              (s[5] = n))
            : (n = s[5]),
          s[6] !== a || s[7] !== b || s[8] !== n
            ? ((i = {
                queryKey: a,
                enabled: b,
                staleTime: 6e4,
                initialPageParam: 0,
                queryFn: n,
                getNextPageParam: w,
                select: _,
              }),
              (s[6] = a),
              (s[7] = b),
              (s[8] = n),
              (s[9] = i))
            : (i = s[9]),
          (0, m.useInfiniteQuery)(i)
        );
      },
    ],
    279577,
  );
};
