// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(574472),
    l = e.i(690877),
    r = e.i(352386),
    a = e.i(759257);
  let o = ["explore", "followed-holders"],
    n = (e) =>
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
  let d = (e, t) =>
    !(t instanceof s && (401 === t.status || 403 === t.status)) && e < 1;
  async function c({ mints: e, signal: t, followedHoldersLimit: i = 3 }) {
    return (0, a.j)()("POST /coins/mints", {
      body: {
        mints: e,
        includeFollowedHolders: !0,
        followedHoldersLimit: i,
        includeLiveStreamInfo: !1,
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: t,
      throwHttpErrors: !1,
      hooks: {
        afterResponse: [
          (e, t, i) => {
            if (!i.ok) throw new s(i.status);
          },
        ],
      },
    });
  }
  let u = (e) => {
    let i,
      l,
      a,
      o,
      n = (0, t.c)(13),
      { mints: s, enabled: d, settleMs: c } = e;
    n[0] !== d || n[1] !== s
      ? ((i = d
          ? Array.from(new Set(s.filter(Boolean)))
              .sort()
              .join(",")
          : ""),
        (n[0] = d),
        (n[1] = s),
        (n[2] = i))
      : (i = n[2]);
    let u = i,
      [p] = (0, r.useState)(m);
    n[3] !== u || n[4] !== p
      ? ((l = () => ({ key: u, at: p })), (n[3] = u), (n[4] = p), (n[5] = l))
      : (l = n[5]);
    let [f, h] = (0, r.useState)(l);
    return (
      n[6] !== f || n[7] !== d || n[8] !== u || n[9] !== p || n[10] !== c
        ? ((a = () => {
            if (!d) {
              "" !== f.key && h({ key: "", at: p });
              return;
            }
            if (u === f.key) return;
            let e = setTimeout(
              () => h({ key: u, at: Date.now() }),
              (({ adopted: e, mountedAt: t, now: i }) =>
                "" !== e.key && (i - t < 5e3 || i - e.at < 2e3))({
                adopted: f,
                mountedAt: p,
                now: Date.now(),
              })
                ? c
                : 0,
            );
            return () => clearTimeout(e);
          }),
          (o = [f, d, u, p, c]),
          (n[6] = f),
          (n[7] = d),
          (n[8] = u),
          (n[9] = p),
          (n[10] = c),
          (n[11] = a),
          (n[12] = o))
        : ((a = n[11]), (o = n[12])),
      (0, r.useEffect)(a, o),
      d ? f.key : ""
    );
  };
  function m() {
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
    d,
    "P",
    0,
    (e) => {
      let r,
        a,
        s,
        m,
        p,
        f,
        h = (0, t.c)(19),
        { mints: I, enabled: x, settleMs: y } = e,
        b = void 0 === y ? 1500 : y,
        { decodedJwt: g } = (0, i.F)(),
        v = g?.address?.trim() || null;
      h[0] !== x || h[1] !== I || h[2] !== b
        ? ((r = { mints: I, enabled: x, settleMs: b }),
          (h[0] = x),
          (h[1] = I),
          (h[2] = b),
          (h[3] = r))
        : (r = h[3]);
      let C = u(r);
      h[4] !== C
        ? ((a = "" === C ? [] : C.split(",")), (h[4] = C), (h[5] = a))
        : (a = h[5]);
      let w = a,
        k = x && null !== v && w.length > 0,
        M = [...o, v, C];
      (h[6] !== w
        ? ((s = (e) => {
            let { signal: t } = e;
            return c({ mints: w, signal: t });
          }),
          (h[6] = w),
          (h[7] = s))
        : (s = h[7]),
        h[8] !== v
          ? ((m = (e, t) => (t?.queryKey[2] === v ? e : void 0)),
            (h[8] = v),
            (h[9] = m))
          : (m = h[9]),
        h[10] !== k || h[11] !== M || h[12] !== s || h[13] !== m
          ? ((p = {
              queryKey: M,
              queryFn: s,
              enabled: k,
              staleTime: 6e4,
              retry: d,
              select: n,
              placeholderData: m,
            }),
            (h[10] = k),
            (h[11] = M),
            (h[12] = s),
            (h[13] = m),
            (h[14] = p))
          : (p = h[14]));
      let N = (0, l.useQuery)(p),
        j = k ? N.data : void 0,
        _ = k && N.isPending;
      return (
        h[15] !== N.isError || h[16] !== j || h[17] !== _
          ? ((f = { byMint: j, isPending: _, isError: N.isError }),
            (h[15] = N.isError),
            (h[16] = j),
            (h[17] = _),
            (h[18] = f))
          : (f = h[18]),
        f
      );
    },
    "m",
    0,
    u,
  ]);
};
