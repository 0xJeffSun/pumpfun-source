// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(574472),
    n = e.i(690877),
    l = e.i(352386),
    i = e.i(759257);
  let u = ["explore", "followed-holders"],
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
  class s extends Error {
    status;
    constructor(e) {
      (super(`Failed to hydrate explore rows: ${e}`),
        (this.name = "ExploreHydrationHttpError"),
        (this.status = e));
    }
  }
  let o = (e, t) =>
    !(t instanceof s && (401 === t.status || 403 === t.status)) && e < 1;
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
            if (!r.ok) throw new s(r.status);
          },
        ],
      },
    });
  }
  let f = (e) => {
    let r,
      n,
      i,
      u,
      a = (0, t.c)(13),
      { mints: s, enabled: o, settleMs: c } = e;
    a[0] !== o || a[1] !== s
      ? ((r = o
          ? Array.from(new Set(s.filter(Boolean)))
              .sort()
              .join(",")
          : ""),
        (a[0] = o),
        (a[1] = s),
        (a[2] = r))
      : (r = a[2]);
    let f = r,
      [h] = (0, l.useState)(d);
    a[3] !== f || a[4] !== h
      ? ((n = () => ({ key: f, at: h })), (a[3] = f), (a[4] = h), (a[5] = n))
      : (n = a[5]);
    let [E, y] = (0, l.useState)(n);
    return (
      a[6] !== E || a[7] !== o || a[8] !== f || a[9] !== h || a[10] !== c
        ? ((i = () => {
            if (!o) {
              "" !== E.key && y({ key: "", at: h });
              return;
            }
            if (f === E.key) return;
            let e = setTimeout(
              () => y({ key: f, at: Date.now() }),
              (({ adopted: e, mountedAt: t, now: r }) =>
                "" !== e.key && (r - t < 5e3 || r - e.at < 2e3))({
                adopted: E,
                mountedAt: h,
                now: Date.now(),
              })
                ? c
                : 0,
            );
            return () => clearTimeout(e);
          }),
          (u = [E, o, f, h, c]),
          (a[6] = E),
          (a[7] = o),
          (a[8] = f),
          (a[9] = h),
          (a[10] = c),
          (a[11] = i),
          (a[12] = u))
        : ((i = a[11]), (u = a[12])),
      (0, l.useEffect)(i, u),
      o ? E.key : ""
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
    o,
    "P",
    0,
    (e) => {
      let l,
        i,
        s,
        d,
        h,
        E,
        y = (0, t.c)(19),
        { mints: m, enabled: g, settleMs: S } = e,
        p = void 0 === S ? 1500 : S,
        { decodedJwt: w } = (0, r.F)(),
        k = w?.address?.trim() || null;
      y[0] !== g || y[1] !== m || y[2] !== p
        ? ((l = { mints: m, enabled: g, settleMs: p }),
          (y[0] = g),
          (y[1] = m),
          (y[2] = p),
          (y[3] = l))
        : (l = y[3]);
      let b = f(l);
      y[4] !== b
        ? ((i = "" === b ? [] : b.split(",")), (y[4] = b), (y[5] = i))
        : (i = y[5]);
      let T = i,
        v = g && null !== k && T.length > 0,
        C = [...u, k, b];
      (y[6] !== T
        ? ((s = (e) => {
            let { signal: t } = e;
            return c({ mints: T, signal: t });
          }),
          (y[6] = T),
          (y[7] = s))
        : (s = y[7]),
        y[8] !== k
          ? ((d = (e, t) => (t?.queryKey[2] === k ? e : void 0)),
            (y[8] = k),
            (y[9] = d))
          : (d = y[9]),
        y[10] !== v || y[11] !== C || y[12] !== s || y[13] !== d
          ? ((h = {
              queryKey: C,
              queryFn: s,
              enabled: v,
              staleTime: 6e4,
              retry: o,
              select: a,
              placeholderData: d,
            }),
            (y[10] = v),
            (y[11] = C),
            (y[12] = s),
            (y[13] = d),
            (y[14] = h))
          : (h = y[14]));
      let A = (0, n.useQuery)(h),
        R = v ? A.data : void 0,
        I = v && A.isPending;
      return (
        y[15] !== A.isError || y[16] !== R || y[17] !== I
          ? ((E = { byMint: R, isPending: I, isError: A.isError }),
            (y[15] = A.isError),
            (y[16] = R),
            (y[17] = I),
            (y[18] = E))
          : (E = y[18]),
        E
      );
    },
    "m",
    0,
    f,
  ]);
};
