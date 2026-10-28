// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(402030),
    n = e.i(322315),
    a = e.i(254010),
    i = e.i(690877),
    o = e.i(38279),
    s = e.i(633113);
  let l = 10,
    u = ({ count: e, threshold: t = l }) =>
      "number" != typeof e || !Number.isFinite(e) || e < 0
        ? "unknown"
        : e >= t
          ? "eligible"
          : "ineligible",
    c = (e) => "ineligible" === e,
    d = (e) => (1 === e ? "follower" : "followers");
  e.s(
    [
      "W",
      0,
      l,
      "p",
      0,
      (e) => {
        let t =
            "number" == typeof e.minFollowers && e.minFollowers > 0
              ? e.minFollowers
              : l,
          r = `Bounties need at least ${t} followers on your pump.fun profile.`;
        return "number" != typeof e.currentFollowers
          ? r
          : `${r} You have ${e.currentFollowers} ${d(e.currentFollowers)} right now.`;
      },
      "R",
      0,
      (e) => {
        let t = "number" == typeof e && e > 0 ? e : l;
        return `You need at least ${t} ${d(t)} to do this`;
      },
      "f",
      0,
      u,
      "s",
      0,
      c,
    ],
    635666,
  );
  var f = e.i(779106);
  let m = async (e) => {
      try {
        let t = await (0, s.H)("followers", e);
        return "number" == typeof t.count && Number.isFinite(t.count)
          ? t.count
          : null;
      } catch (e) {
        if ((0, r.isContractError)(e)) return null;
        throw e;
      }
    },
    h = (e) => {
      let r,
        n,
        a,
        s = (0, t.c)(8),
        l = !!e;
      return (
        s[0] !== e
          ? ((r = o.Q.PUMP_FOLLOWERS_COUNT(e ?? null)), (s[0] = e), (s[1] = r))
          : (r = s[1]),
        s[2] !== e ? ((n = () => m(e)), (s[2] = e), (s[3] = n)) : (n = s[3]),
        s[4] !== l || s[5] !== r || s[6] !== n
          ? ((a = { enabled: l, queryKey: r, queryFn: n, staleTime: 6e4 }),
            (s[4] = l),
            (s[5] = r),
            (s[6] = n),
            (s[7] = a))
          : (a = s[7]),
        (0, i.useQuery)(a)
      );
    };
  e.s(
    [
      "z",
      0,
      () => {
        let e,
          r,
          i,
          o,
          s = (0, t.c)(11),
          d = (0, a.k)(n.D.BOUNTY_PUMP_FOLLOWER_GATE, !0),
          m = (0, f.f)("bounty-follower-gate"),
          p = d && !!m,
          { data: w, isLoading: y } = h(p ? m : null),
          b = p ? (w ?? null) : null;
        if (s[0] !== d || s[1] !== b) {
          let t = d ? u({ count: b }) : "unknown";
          ((e = d),
            (r = t),
            (i = d && c(t)),
            (s[0] = d),
            (s[1] = b),
            (s[2] = e),
            (s[3] = r),
            (s[4] = i));
        } else ((e = s[2]), (r = s[3]), (i = s[4]));
        let g = p && y;
        return (
          s[5] !== b || s[6] !== e || s[7] !== r || s[8] !== i || s[9] !== g
            ? ((o = {
                enabled: e,
                eligibility: r,
                isBlocked: i,
                followersCount: b,
                minFollowers: l,
                isLoading: g,
              }),
              (s[5] = b),
              (s[6] = e),
              (s[7] = r),
              (s[8] = i),
              (s[9] = g),
              (s[10] = o))
            : (o = s[10]),
          o
        );
      },
      "s",
      0,
      h,
    ],
    18107,
  );
};
