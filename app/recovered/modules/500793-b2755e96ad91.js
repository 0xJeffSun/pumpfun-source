// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    l = e.i(690877),
    n = e.i(352386),
    i = e.i(759257);
  let s = ["explore", "followed-holders"],
    a = (e) =>
      Object.fromEntries(
        e
          .filter((e) => "string" == typeof e.mint && e.mint.length > 0)
          .map((e) => [
            e.mint,
            {
              followedHolders: e.followed_holders ?? null,
              links: {
                twitter: e.twitter,
                telegram: e.telegram,
                website: e.website,
              },
            },
          ]),
      );
  class o extends Error {
    status;
    constructor(e) {
      (super(`Failed to hydrate explore rows: ${e}`),
        (this.name = "ExploreHydrationHttpError"),
        (this.status = e));
    }
  }
  let u = (e, t) =>
    !(t instanceof o && (401 === t.status || 403 === t.status)) && e < 1;
  async function c({ mints: e, signal: t, followedHoldersLimit: r = 3 }) {
    return (0, i.j)()("POST /coins/mints", {
      body: {
        mints: e,
        includeFollowedHolders: !0,
        followedHoldersLimit: r,
        includeLiveStreamInfo: !1,
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: t,
      throwHttpErrors: !1,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw new o(r.status);
          },
        ],
      },
    });
  }
  let f = (e) => {
    let r,
      l,
      i,
      s,
      a = (0, t.c)(13),
      { mints: o, enabled: u, settleMs: c } = e;
    a[0] !== u || a[1] !== o
      ? ((r = u
          ? Array.from(new Set(o.filter(Boolean)))
              .sort()
              .join(",")
          : ""),
        (a[0] = u),
        (a[1] = o),
        (a[2] = r))
      : (r = a[2]);
    let f = r,
      [E] = (0, n.useState)(d);
    a[3] !== f || a[4] !== E
      ? ((l = () => ({ key: f, at: E })), (a[3] = f), (a[4] = E), (a[5] = l))
      : (l = a[5]);
    let [h, m] = (0, n.useState)(l);
    return (
      a[6] !== h || a[7] !== u || a[8] !== f || a[9] !== E || a[10] !== c
        ? ((i = () => {
            if (!u) {
              "" !== h.key && m({ key: "", at: E });
              return;
            }
            if (f === h.key) return;
            let e = setTimeout(
              () => m({ key: f, at: Date.now() }),
              (({ adopted: e, mountedAt: t, now: r }) =>
                "" !== e.key && (r - t < 5e3 || r - e.at < 2e3))({
                adopted: h,
                mountedAt: E,
                now: Date.now(),
              })
                ? c
                : 0,
            );
            return () => clearTimeout(e);
          }),
          (s = [h, u, f, E, c]),
          (a[6] = h),
          (a[7] = u),
          (a[8] = f),
          (a[9] = E),
          (a[10] = c),
          (a[11] = i),
          (a[12] = s))
        : ((i = a[11]), (s = a[12])),
      (0, n.useEffect)(i, s),
      u ? h.key : ""
    );
  };
  function d() {
    return Date.now();
  }
  e.s([
    "N",
    0,
    3,
    "S",
    0,
    1500,
    "e",
    0,
    c,
    "Z",
    0,
    u,
    "P",
    0,
    (e) => {
      let n,
        i,
        o,
        d,
        E,
        h,
        m = (0, t.c)(19),
        { mints: y, enabled: p, settleMs: S } = e,
        w = void 0 === S ? 1500 : S,
        { decodedJwt: g } = (0, r.F)(),
        k = g?.address?.trim() || null;
      m[0] !== p || m[1] !== y || m[2] !== w
        ? ((n = { mints: y, enabled: p, settleMs: w }),
          (m[0] = p),
          (m[1] = y),
          (m[2] = w),
          (m[3] = n))
        : (n = m[3]);
      let b = f(n);
      m[4] !== b
        ? ((i = "" === b ? [] : b.split(",")), (m[4] = b), (m[5] = i))
        : (i = m[5]);
      let T = i,
        C = p && null !== k && T.length > 0,
        R = [...s, k, b];
      (m[6] !== T
        ? ((o = (e) => {
            let { signal: t } = e;
            return c({ mints: T, signal: t });
          }),
          (m[6] = T),
          (m[7] = o))
        : (o = m[7]),
        m[8] !== k
          ? ((d = (e, t) => (t?.queryKey[2] === k ? e : void 0)),
            (m[8] = k),
            (m[9] = d))
          : (d = m[9]),
        m[10] !== C || m[11] !== R || m[12] !== o || m[13] !== d
          ? ((E = {
              queryKey: R,
              queryFn: o,
              enabled: C,
              staleTime: 6e4,
              retry: u,
              select: a,
              placeholderData: d,
            }),
            (m[10] = C),
            (m[11] = R),
            (m[12] = o),
            (m[13] = d),
            (m[14] = E))
          : (E = m[14]));
      let v = (0, l.useQuery)(E),
        A = C ? v.data : void 0,
        D = C && v.isPending;
      return (
        m[15] !== v.isError || m[16] !== A || m[17] !== D
          ? ((h = { byMint: A, isPending: D, isError: v.isError }),
            (m[15] = v.isError),
            (m[16] = A),
            (m[17] = D),
            (m[18] = h))
          : (h = m[18]),
        h
      );
    },
    "m",
    0,
    f,
  ]);
};
