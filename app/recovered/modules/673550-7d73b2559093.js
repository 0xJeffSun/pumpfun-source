// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(146695),
    a = e.i(786480),
    i = e.i(365089),
    s = e.i(782067),
    n = e.i(605587),
    o = e.i(639374);
  let l = (e) => (0, o.f)(e) || (0, n.h)(e);
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          c,
          u,
          d,
          m,
          p,
          h,
          g,
          f = (0, t.c)(30);
        f[0] !== e
          ? ((n = { address: e }), (f[0] = e), (f[1] = n))
          : (n = f[1]);
        let { data: b, isLoading: y } = (0, s.T)(n),
          v = b?.username ?? null,
          w = b?.address ?? "";
        f[2] !== w || f[3] !== e
          ? ((c = l(e) ? e : "" !== w && w !== e && l(w) ? w : null),
            (f[2] = w),
            (f[3] = e),
            (f[4] = c))
          : (c = f[4]);
        let k = c;
        f[5] !== w || f[6] !== e
          ? ((u = (0, o.f)(e)
              ? e
              : "" !== w && w !== e && (0, o.f)(w)
                ? w
                : null),
            (f[5] = w),
            (f[6] = e),
            (f[7] = u))
          : (u = f[7]);
        let x = u;
        f[8] !== e || f[9] !== v
          ? ((d = v ?? (0, i.d)(e)), (f[8] = e), (f[9] = v), (f[10] = d))
          : (d = f[10]);
        let I = d;
        f[11] !== e || f[12] !== b?.userId
          ? ((m = (0, a.f)(e) ? e : (b?.userId ?? null)),
            (f[11] = e),
            (f[12] = b?.userId),
            (f[13] = m))
          : (m = f[13]);
        let j = m;
        f[14] !== b?.bio
          ? ((p = b?.bio?.trim() || null), (f[14] = b?.bio), (f[15] = p))
          : (p = f[15]);
        let _ = p,
          z = b?.profile_image ?? void 0,
          S = k ?? e;
        return (
          f[16] !== j || f[17] !== k
            ? ((h = (0, r.$)({ address: k, userId: j })),
              (f[16] = j),
              (f[17] = k),
              (f[18] = h))
            : (h = f[18]),
          f[19] !== _ ||
          f[20] !== j ||
          f[21] !== I ||
          f[22] !== y ||
          f[23] !== x ||
          f[24] !== z ||
          f[25] !== S ||
          f[26] !== h ||
          f[27] !== v ||
          f[28] !== k
            ? ((g = {
                displayName: I,
                username: v,
                avatarSrc: z,
                bio: _,
                avatarSeed: S,
                walletAddress: k,
                profileHref: h,
                solanaWalletAddress: x,
                ccUserId: j,
                isLoading: y,
              }),
              (f[19] = _),
              (f[20] = j),
              (f[21] = I),
              (f[22] = y),
              (f[23] = x),
              (f[24] = z),
              (f[25] = S),
              (f[26] = h),
              (f[27] = v),
              (f[28] = k),
              (f[29] = g))
            : (g = f[29]),
          g
        );
      },
    ],
    673550,
  );
  var c = e.i(402030),
    u = e.i(322315),
    d = e.i(254010),
    m = e.i(574472),
    p = e.i(761459),
    h = e.i(759257),
    g = e.i(126965),
    f = e.i(779106);
  let b =
      c.contract["GET /users/{id}/mutual-followers"].response.shape
        .mutualFollowers.element,
    y = c.contract["GET /users/{id}/mutual-followers"].response
      .pick({ mutualFollowers: !0, hasMore: !0 })
      .extend({
        mutualFollowers: b
          .pick({ userId: !0 })
          .extend({
            username: b.shape.username.nullish(),
            bio: b.shape.bio.nullish(),
            profileImageUrl: b.shape.profileImageUrl.nullish(),
            walletAddress: b.shape.walletAddress.nullish(),
          })
          .array(),
      }),
    v = async ({ profileId: e, offset: t, limit: r, signal: a }) => {
      let i = await (0, h.j)()("GET /users/{id}/mutual-followers", {
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
        s = y.parse(i);
      return {
        hasMore: s.hasMore,
        picks: s.mutualFollowers.map((e) => ({
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
  function k(e) {
    return e.picks;
  }
  function x(e) {
    let t = new Set();
    return e.pages
      .flatMap(k)
      .filter((e) => !t.has(e.userId) && (t.add(e.userId), !0));
  }
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          a,
          i,
          s,
          n = (0, t.c)(10);
        n[0] !== e
          ? ((r = void 0 === e ? {} : e), (n[0] = e), (n[1] = r))
          : (r = n[1]);
        let { enabled: o } = r,
          { address: l } = (0, m.F)(),
          c = (0, f.f)("dm-mutual-picks"),
          h = (0, d.k)(u.D.WEB_DIRECT_MESSAGES),
          b = l ?? "";
        n[2] !== c
          ? ((a = (0, g.b)(c, 50)), (n[2] = c), (n[3] = a))
          : (a = n[3]);
        let y = (void 0 === o || o) && h && null !== c && "" !== b;
        return (
          n[4] !== b
            ? ((i = (e) => {
                let { pageParam: t, signal: r } = e;
                return v({ profileId: b, offset: t, limit: 50, signal: r });
              }),
              (n[4] = b),
              (n[5] = i))
            : (i = n[5]),
          n[6] !== a || n[7] !== y || n[8] !== i
            ? ((s = {
                queryKey: a,
                enabled: y,
                staleTime: 6e4,
                initialPageParam: 0,
                queryFn: i,
                getNextPageParam: w,
                select: x,
              }),
              (n[6] = a),
              (n[7] = y),
              (n[8] = i),
              (n[9] = s))
            : (s = n[9]),
          (0, p.useInfiniteQuery)(s)
        );
      },
    ],
    279577,
  );
};
