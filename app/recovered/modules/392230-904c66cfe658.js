// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => c], 392230);
  var r = e.i(445242),
    t = e.i(470049),
    s = e.i(182251),
    n = e.i(54567),
    o = e.i(944410),
    a = e.i(690877),
    i = e.i(812768);
  let d = "get-livestream",
    l = ({
      mintId: e,
      enabled: r,
      onSuccess: t,
      refetchInterval: s,
      refetchIntervalInBackground: l,
      refetchOnWindowFocus: u,
    }) => {
      let c = (0, o.useLivestreamApiClient)();
      return (0, a.useQuery)({
        queryKey: [d, e],
        queryFn: async () => {
          n.logger.debug(
            "[useGetLivestream] Attempting to fetch livestream data",
            { mintId: e },
          );
          let r = new URLSearchParams();
          r.set("mintId", e);
          try {
            let e = await c.get(`livestream?${r.toString()}`).json(),
              s = "" === e ? null : e;
            return (t?.(s), s);
          } catch (s) {
            if (s instanceof i.f && 404 === s.response.status)
              return (t?.(null), null);
            let r = s instanceof Error ? s.message : String(s);
            throw (
              n.logger.error("[useGetLivestream] Fetch failed", {
                mintId: e,
                error: r,
              }),
              s
            );
          }
        },
        enabled: r,
        refetchOnWindowFocus: u ?? !1,
        refetchInterval: s,
        refetchIntervalInBackground: l,
      });
    };
  e.s(["U", 0, d, "p", 0, l], 212761);
  var u = e.i(325320);
  let c = (e) => {
    let o,
      a,
      i,
      d = (0, r.c)(11),
      {
        isLive: c,
        shouldGetLivestreamData: m,
        shouldGetCoinInfo: g,
        initialBanExpiry: f,
        initialLivestream: v,
        setIsBanned: y,
      } = e,
      { mintId: h, isDisconnected: p } = (0, u.E)(),
      I = !!p && 5e3,
      R = (p || null === v) && m;
    (d[0] !== h || d[1] !== I || d[2] !== R
      ? ((o = {
          mintId: h,
          refetchInterval: I,
          refetchIntervalInBackground: !1,
          refetchOnWindowFocus: !0,
          enabled: R,
        }),
        (d[0] = h),
        (d[1] = I),
        (d[2] = R),
        (d[3] = o))
      : (o = d[3]),
      ((e) => {
        let t,
          o,
          a,
          i,
          d = (0, r.c)(17),
          {
            mintId: u,
            enabled: c,
            refetchInterval: m,
            refetchIntervalInBackground: g,
            refetchOnWindowFocus: f,
          } = e,
          v = void 0 === c || c,
          { getLivestream: y, setLivestream: h } = (0, s.F)();
        d[0] !== y || d[1] !== u
          ? ((t = y(u)), (d[0] = y), (d[1] = u), (d[2] = t))
          : (t = d[2]);
        let p = t;
        (d[3] !== u || d[4] !== h
          ? ((o = (e) => {
              let r = !e || e?.isLive === !1,
                t = e?.isLive === !0;
              (r ? h(u, null) : t && h(u, e),
                n.logger.debug("[useLivestreamData] Query response", {
                  mintId: u,
                  action: r ? "clear" : t ? "update" : "keep",
                  isLive: e?.isLive,
                }));
            }),
            (d[3] = u),
            (d[4] = h),
            (d[5] = o))
          : (o = d[5]),
          d[6] !== v ||
          d[7] !== u ||
          d[8] !== m ||
          d[9] !== g ||
          d[10] !== f ||
          d[11] !== o
            ? ((a = {
                mintId: u,
                enabled: v,
                refetchInterval: m,
                refetchIntervalInBackground: g,
                refetchOnWindowFocus: f,
                onSuccess: o,
              }),
              (d[6] = v),
              (d[7] = u),
              (d[8] = m),
              (d[9] = g),
              (d[10] = f),
              (d[11] = o),
              (d[12] = a))
            : (a = d[12]));
        let { isLoading: I, error: R } = l(a);
        return d[13] !== R || d[14] !== I || d[15] !== p
          ? ((i = { livestream: p, isLoading: I, error: R }),
            (d[13] = R),
            (d[14] = I),
            (d[15] = p),
            (d[16] = i))
          : (i = d[16]);
      })(o),
      d[4] !== h || d[5] !== y
        ? ((a = (e) => {
            let r = Date.now(),
              t = e?.livestream_ban_expiry,
              s = !!t && t > r;
            (n.logger.debug(
              "[LivestreamProvider] useLivestreamCoinInfo onSuccess",
              { mintId: h, dataExists: !!e, calculatedIsBanned: s },
            ),
              y(s));
          }),
          (d[4] = h),
          (d[5] = y),
          (d[6] = a))
        : (a = d[6]));
    let M = c && void 0 === f && g;
    return (
      d[7] !== h || d[8] !== a || d[9] !== M
        ? ((i = { mintId: h, onSuccess: a, enabled: M }),
          (d[7] = h),
          (d[8] = a),
          (d[9] = M),
          (d[10] = i))
        : (i = d[10]),
      (0, t.f)(i),
      null
    );
  };
};
