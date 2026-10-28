// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(365089),
    r = e.i(786480),
    i = e.i(574472),
    l = e.i(606933),
    o = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(63289),
    a = e.i(633113),
    c = e.i(445242),
    d = e.i(690877);
  let u = (e) => ({
    ...e,
    address: e.address ?? "",
    userId: e.user_id ?? e.userId ?? null,
    kind: e.kind ?? "person",
  });
  var f = e.i(759257);
  let p = "followers";
  e.s(
    [
      "r",
      0,
      p,
      "x",
      0,
      ["followers", "recent"],
      "B",
      0,
      ({ t: e, sort: t }) =>
        e(
          "recent" === t
            ? "profile.list.sort.recent"
            : "common.profile_followers",
        ),
      "z",
      0,
      ({ t: e, sort: t }) =>
        e(
          "recent" === t
            ? "profile.list.sort.recent_option"
            : "profile.list.sort.followers_option",
        ),
    ],
    802331,
  );
  let m = ["follow-list"],
    h = [];
  e.s(
    [
      "X",
      0,
      m,
      "Q",
      0,
      (e, t, r) => {
        let i,
          l,
          n,
          s,
          a,
          x,
          g,
          y,
          w = (0, c.c)(33);
        w[0] !== r
          ? ((i = void 0 === r ? {} : r), (w[0] = r), (w[1] = i))
          : (i = w[1]);
        let { enabled: b, sort: v, searchTerm: j } = i,
          _ = void 0 === v ? p : v;
        w[2] !== j || w[3] !== _ || w[4] !== e || w[5] !== t
          ? ((l = ((e, t, r = p, i) => [...m, e, t, r, i ?? ""])(e, t, _, j)),
            (w[2] = j),
            (w[3] = _),
            (w[4] = e),
            (w[5] = t),
            (w[6] = l))
          : (l = w[6]);
        let I = !!t && (void 0 === b || b);
        (w[7] !== j || w[8] !== _ || w[9] !== e || w[10] !== t
          ? ((n = async (r) => {
              let i,
                { signal: l } = r;
              return Array.isArray(
                (i = await ((e, t, { sort: r, searchTerm: i }, l) => {
                  let o = (0, f.j)(),
                    n = { userId: t };
                  return void 0 !== i
                    ? o(
                        "followers" === e
                          ? "GET /following/v3/followers/search/{userId}"
                          : "GET /following/v3/following/search/{userId}",
                        {
                          params: n,
                          query: { searchTerm: i, limit: 100 },
                          signal: l,
                        },
                      )
                    : o(
                        "followers" === e
                          ? "GET /following/v3/followers/{userId}"
                          : "GET /following/v3/following/{userId}",
                        {
                          params: n,
                          query:
                            r === p ? { limit: 1e3 } : { limit: 1e3, sort: r },
                          signal: l,
                        },
                      );
                })(e, t, { sort: _, searchTerm: j }, l)),
              )
                ? i.map(u)
                : [];
            }),
            (w[7] = j),
            (w[8] = _),
            (w[9] = e),
            (w[10] = t),
            (w[11] = n))
          : (n = w[11]),
          w[12] !== l || w[13] !== I || w[14] !== n
            ? ((s = {
                queryKey: l,
                enabled: I,
                queryFn: n,
                staleTime: 3e4,
                refetchInterval: 6e4,
                refetchIntervalInBackground: !1,
                refetchOnWindowFocus: !0,
              }),
              (w[12] = l),
              (w[13] = I),
              (w[14] = n),
              (w[15] = s))
            : (s = w[15]));
        let k = (0, d.useQuery)(s),
          N = `${t}|${_}|${j ?? ""}`;
        w[16] !== N
          ? ((a = { listKey: N, page: 1 }), (w[16] = N), (w[17] = a))
          : (a = w[17]);
        let [F, C] = (0, o.useState)(a),
          O = F.listKey === N ? F.page : 1;
        w[18] !== N
          ? ((x = (e) => C({ listKey: N, page: e })), (w[18] = N), (w[19] = x))
          : (x = w[19]);
        let E = x,
          L = k.data ?? h,
          P = (O - 1) * 10;
        w[20] !== L || w[21] !== P
          ? ((g = L.slice(P, P + 10)), (w[20] = L), (w[21] = P), (w[22] = g))
          : (g = w[22]);
        let T = k.isLoading,
          S = k.error,
          q = k.isRefetching,
          z = L.length,
          R = Math.ceil(L.length / 10);
        return (
          w[23] !== L ||
          w[24] !== O ||
          w[25] !== k.error ||
          w[26] !== k.isLoading ||
          w[27] !== k.isRefetching ||
          w[28] !== k.refetch ||
          w[29] !== E ||
          w[30] !== g ||
          w[31] !== R
            ? ((y = {
                all: L,
                displayed: g,
                loading: T,
                error: S,
                retrying: q,
                totalCount: z,
                currentPage: O,
                totalPages: R,
                setPage: E,
                refetch: k.refetch,
              }),
              (w[23] = L),
              (w[24] = O),
              (w[25] = k.error),
              (w[26] = k.isLoading),
              (w[27] = k.isRefetching),
              (w[28] = k.refetch),
              (w[29] = E),
              (w[30] = g),
              (w[31] = R),
              (w[32] = y))
            : (y = w[32]),
          y
        );
      },
    ],
    500056,
  );
  var x = e.i(779106);
  let g = ["mutual-followers"],
    y = ({ profileId: e, limit: t, viewer: r }) => [...g, e, t, r];
  function w(e, t, r) {
    if (!r.ok) throw Error(`Failed to fetch mutual followers: ${r.status}`);
  }
  e.s(
    [
      "J",
      0,
      g,
      "_",
      0,
      5,
      "I",
      0,
      y,
      "z",
      0,
      function (e) {
        let t,
          r,
          i,
          l = (0, c.c)(11),
          { profileId: o, limit: n, enabled: s } = e,
          a = void 0 === n ? 5 : n,
          u = (0, x.f)("mutual-followers"),
          p = o ?? "",
          m = u ?? "";
        l[0] !== a || l[1] !== p || l[2] !== m
          ? ((t = y({ profileId: p, limit: a, viewer: m })),
            (l[0] = a),
            (l[1] = p),
            (l[2] = m),
            (l[3] = t))
          : (t = l[3]);
        let h = (void 0 === s || s) && !!o && !!u;
        return (
          l[4] !== a || l[5] !== o
            ? ((r = async (e) => {
                let { signal: t } = e;
                return (0, f.j)()("GET /users/{id}/mutual-followers", {
                  params: { id: o ?? "" },
                  query: { limit: a, offset: 0 },
                  credentials: "include",
                  signal: t,
                  throwHttpErrors: !1,
                  hooks: { afterResponse: [w] },
                });
              }),
              (l[4] = a),
              (l[5] = o),
              (l[6] = r))
            : (r = l[6]),
          l[7] !== t || l[8] !== h || l[9] !== r
            ? ((i = {
                queryKey: t,
                enabled: h,
                staleTime: 6e4,
                retry: 1,
                queryFn: r,
              }),
              (l[7] = t),
              (l[8] = h),
              (l[9] = r),
              (l[10] = i))
            : (i = l[10]),
          (0, d.useQuery)(i)
        );
      },
    ],
    366510,
  );
  var b = e.i(303599),
    v = e.i(126965),
    j = e.i(595673);
  let _ = (e) => ((0, r.f)(e) ? { viewedUserId: e } : { profileId: e });
  e.s(
    [
      "f",
      0,
      (e, c) => {
        let { t: d } = (0, n.f)(),
          { decodedJwt: u, address: p, userId: h } = (0, i.F)(),
          y = (0, x.f)("follow"),
          w = (0, l.useQueryClient)(),
          [I, k] = (0, o.useState)(c?.initialIsFollowing ?? !1),
          [N, F] = (0, o.useState)(c?.initialIsFollowedBack ?? !1),
          C = (0, o.useRef)(null),
          [O, E] = (0, o.useState)(
            !!(c?.skipInitialFetch && c?.initialIsFollowing !== void 0),
          ),
          [L, P] = (0, o.useState)(!1),
          [, T] = (0, o.useState)(null),
          S = (e) => {
            let t = `; ${document.cookie}`.split(`; ${e}=`);
            if (2 === t.length) return t.pop()?.split(";").shift();
          },
          q = (t) => {
            if (!y) return;
            let i = (0, b.j)(y);
            (w.setQueryData(i, (i) => {
              if (void 0 === i) return i;
              let l = e.toLowerCase(),
                o = (e) => {
                  let t = e?.user_id ?? e?.userId;
                  return (
                    ("string" == typeof e?.address &&
                      e.address.toLowerCase() === l) ||
                    ("string" == typeof t && t.toLowerCase() === l)
                  );
                },
                n = i.some(o);
              if (t) {
                let t = (0, r.f)(e) ? { userId: e } : { address: e };
                return n ? i : [...i, t];
              }
              return n ? i.filter((e) => !o(e)) : i;
            }),
              w.invalidateQueries({ queryKey: i }),
              z(t ? 1 : -1),
              R());
          },
          z = (t) => {
            for (let r of (w.cancelQueries({ queryKey: a.c }),
            (0, a.U)({
              queryClient: w,
              type: "followers",
              userId: e,
              delta: t,
            }),
            new Set(
              [y, h, p].filter((e) => "string" == typeof e && e.length > 0),
            )))
              (0, a.U)({
                queryClient: w,
                type: "following",
                userId: r,
                delta: t,
              });
          },
          R = () => {
            let e = ({ settled: e }) => {
              (w.invalidateQueries({ queryKey: (0, v.e)() }),
                w.invalidateQueries({
                  queryKey: (0, v.z)(),
                  refetchType: "none",
                }),
                w.invalidateQueries({ queryKey: g, refetchType: "none" }),
                w.invalidateQueries({
                  queryKey: m,
                  refetchType: e ? "active" : "none",
                }),
                e && w.invalidateQueries({ queryKey: a.c }));
            };
            (e({ settled: !1 }), setTimeout(() => e({ settled: !0 }), 4e3));
          },
          A = async (r) => {
            if (u) {
              C.current = e;
              try {
                let i = { "Content-Type": "application/json" },
                  l = S("aws-waf-token");
                (l && (i["x-aws-waf-token"] = l),
                  r && (i["x-aws-waf-token"] = r));
                let o = !1;
                if (
                  (await (0, f.j)()("POST /following/v2/{userId}", {
                    params: { userId: e },
                    credentials: "include",
                    headers: i,
                    parseJson: () => void 0,
                    throwHttpErrors: !1,
                    hooks: {
                      afterResponse: [
                        (e, t, r) => {
                          if (405 === r.status) {
                            o = !0;
                            return;
                          }
                          if (!r.ok) throw Error("Follow request failed");
                        },
                      ],
                    },
                  }),
                  o)
                ) {
                  (P(!0), k(!1));
                  return;
                }
                (k(!0),
                  q(!0),
                  (0, j.L8)({
                    ..._(e),
                    action: "follow",
                    ...(c?.attribution ? { attribution: c.attribution } : {}),
                  }),
                  s.c.success(
                    d("web.profile.you_followed", {
                      name: c?.displayName?.trim() || (0, t.d)(e, 4, 4),
                    }),
                  ),
                  c?.onFollowSuccess?.());
              } catch (e) {
                if ((k(!1), e instanceof Error)) throw e;
                throw Error("Follow request failed");
              } finally {
                $();
              }
            }
          },
          U = async (e) => {
            (T(e), P(!1));
            try {
              await A(e);
            } catch {
              s.c.error(d("web.profile.follow_after_verification_failed"));
            }
          },
          $ = async () => {
            if (e && y)
              try {
                let { follow: t } = await (0, f.j)()(
                  "GET /following/single/{id}",
                  {
                    params: { id: e },
                    query: { userId: y },
                    headers: { "Content-Type": "application/json" },
                    throwHttpErrors: !1,
                  },
                );
                k(!!t);
              } finally {
                E(!0);
              }
          },
          G = async () => {
            if (!e || !y) return;
            let { follow: t } = await (0, f.j)()("GET /following/single/{id}", {
              params: { id: y },
              query: { userId: e },
              headers: { "Content-Type": "application/json" },
              throwHttpErrors: !1,
            });
            F(!!t);
          },
          W = async (t) => {
            if (u) {
              C.current = e;
              try {
                let r = { "Content-Type": "application/json" },
                  i = S("aws-waf-token");
                (i && (r["x-aws-waf-token"] = i),
                  t && (r["x-aws-waf-token"] = t),
                  await (0, f.j)()("DELETE /following/{userId}", {
                    params: { userId: e },
                    credentials: "include",
                    headers: r,
                    parseJson: () => void 0,
                    throwHttpErrors: !1,
                    hooks: {
                      afterResponse: [
                        (e, t, r) => {
                          if (!r.ok) throw Error("Unfollow request failed");
                        },
                      ],
                    },
                  }),
                  k(!1),
                  q(!1),
                  (0, j.L8)({
                    ..._(e),
                    action: "unfollow",
                    ...(c?.attribution ? { attribution: c.attribution } : {}),
                  }),
                  c?.onUnfollowSuccess?.());
              } catch (e) {
                if ((k(!0), e instanceof Error)) throw e;
                throw Error("Unfollow request failed");
              } finally {
                $();
              }
            }
          };
        return (
          (0, o.useEffect)(() => {
            if (c?.skipInitialFetch) {
              if (C.current === e) return;
              (c?.initialIsFollowing !== void 0 &&
                (k(c.initialIsFollowing), E(!0)),
                c?.initialIsFollowedBack !== void 0 &&
                  F(c.initialIsFollowedBack));
              return;
            }
            y ? ($(), G()) : E(!0);
          }, [
            e,
            y,
            c?.skipInitialFetch,
            c?.initialIsFollowing,
            c?.initialIsFollowedBack,
          ]),
          {
            fetchIsFollowing: $,
            follow: A,
            unfollow: W,
            isFollowing: I,
            isFollowedBack: N,
            isReady: O,
            showCaptcha: L,
            setShowCaptcha: P,
            handleCaptchaSuccess: U,
            handleCaptchaError: (e) => {
              (console.error("CAPTCHA error:", e), k(!1));
            },
          }
        );
      },
    ],
    350989,
  );
};
