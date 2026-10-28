// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(944410),
    s = e.i(690877),
    n = e.i(54567);
  let o = "get-coin",
    a = ({ mintId: e, enabled: r, onSuccess: a, interval: i = 25e3 }) => {
      let d = (0, t.useClientServerApiClient)();
      return (0, s.useQuery)({
        queryKey: [o, e],
        queryFn: async () => {
          try {
            let r = await d.get(`coins-v3/${e}`).json();
            return (
              n.logger.debug("[useGetCoin] Fetch coin data successful", {
                mintId: e,
                coinName: r?.name,
                hasData: !!r,
              }),
              a?.(r),
              r
            );
          } catch (t) {
            let r = t instanceof Error ? t.message : String(t);
            throw (
              n.logger.error("[useGetCoin] Fetch coin data failed", {
                mintId: e,
                error: r,
              }),
              t
            );
          }
        },
        enabled: r,
        refetchInterval: i,
        refetchIntervalInBackground: !0,
      });
    };
  (e.s(["T", 0, o, "G", 0, a], 113427),
    e.s(
      [
        "f",
        0,
        (e) => {
          let t,
            s,
            o,
            i = (0, r.c)(17),
            { mintId: d, enabled: l, onSuccess: u } = e,
            c = l && !!d;
          i[0] !== d || i[1] !== u || i[2] !== c
            ? ((t = { mintId: d, enabled: c, onSuccess: u }),
              (i[0] = d),
              (i[1] = u),
              (i[2] = c),
              (i[3] = t))
            : (t = i[3]);
          let { data: m } = a(t);
          e: {
            let e, r;
            if (!m) {
              s = void 0;
              break e;
            }
            n.logger.debug("[useLivestreamCoinInfo] Recalculating coinInfo", {
              mintId: d,
              hasCoinQueryData: !!m,
            });
            let t = m.name || "",
              o = m.symbol || "",
              a = m.usd_market_cap || 0;
            i[4] !== a
              ? ((e = ((e) => {
                  try {
                    return new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(e);
                  } catch {
                    return e?.toString() ?? "0";
                  }
                })(a)),
                (i[4] = a),
                (i[5] = e))
              : (e = i[5]);
            let l = !!m.king_of_the_hill_timestamp;
            (i[6] !== m.creator ||
            i[7] !== m.profile_image ||
            i[8] !== m.usd_market_cap ||
            i[9] !== m.username ||
            i[10] !== t ||
            i[11] !== o ||
            i[12] !== e ||
            i[13] !== l
              ? ((r = {
                  coinName: t,
                  coinSymbol: o,
                  marketCap: e,
                  usdMarketCap: m.usd_market_cap,
                  creatorAddress: m.creator,
                  creatorUsername: m.username,
                  creatorAvatar: m.profile_image,
                  isKingOfTheHill: l,
                }),
                (i[6] = m.creator),
                (i[7] = m.profile_image),
                (i[8] = m.usd_market_cap),
                (i[9] = m.username),
                (i[10] = t),
                (i[11] = o),
                (i[12] = e),
                (i[13] = l),
                (i[14] = r))
              : (r = i[14]),
              (s = r));
          }
          let g = s;
          return (
            i[15] !== g
              ? ((o = { coinInfo: g }), (i[15] = g), (i[16] = o))
              : (o = i[16]),
            o
          );
        },
      ],
      470049,
    ));
};
