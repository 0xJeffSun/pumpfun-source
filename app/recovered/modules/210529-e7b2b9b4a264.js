// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(292686),
    r = e.i(352386),
    i = e.i(257004),
    a = e.i(595673),
    s = e.i(569526),
    n = e.i(639374);
  let o = ({ mint: e, calloutId: t, authorId: l, attach: r }) => {
    if (t && l) {
      if ((0, n.f)(l)) return { calloutAuthorWallet: l };
      (0, i.M)(l).then((l) => {
        l && r({ mint: e, calloutId: t, wallet: l });
      });
    }
  };
  (e.s(
    [
      "p",
      0,
      function (e) {
        let { mint: t, calloutId: i, authorId: n } = e,
          {
            lastClickImpression: d,
            setLastClickImpression: c,
            attachCalloutAuthorWallet: u,
          } = (0, s.y)(),
          m = (0, r.useRef)(d);
        ((m.current = d),
          (0, r.useEffect)(() => {
            if (!i) return;
            let e = m.current;
            if (
              e?.mint === t &&
              e.impression.calloutId === i &&
              e.impression.sourceElement === l.k9.POSITION_FEED_CALLOUT_ROW
            ) {
              if (e.impression.calloutAuthorWallet) return;
              let l = o({ mint: t, calloutId: i, authorId: n, attach: u });
              l && u({ mint: t, calloutId: i, wallet: l.calloutAuthorWallet });
              return;
            }
            let { sourceScreen: r, sourceElement: s } = (0, a.oj)(
              "callout_detail",
            );
            c(t, {
              itemPosition: 0,
              marketCap: 0,
              sourceScreen: r,
              sourceElement: s,
              calloutId: i,
              ...o({ mint: t, calloutId: i, authorId: n, attach: u }),
            });
          }, [t, i, n, c, u]));
      },
      "q",
      0,
      function () {
        let e,
          l = (0, t.c)(3),
          { setLastClickImpression: r, attachCalloutAuthorWallet: i } = (0,
          s.y)();
        return (
          l[0] !== i || l[1] !== r
            ? ((e = (e) => {
                let { authorId: t, ...l } = e;
                (0, a.ie)(l);
                let { sourceScreen: s, sourceElement: n } = (0, a.oj)(
                    l.surface,
                  ),
                  d = "home_feed" === l.surface;
                r(l.mint, {
                  itemPosition: l.absolutePosition ?? 0,
                  marketCap: l.usdMarketCap ?? 0,
                  sourceScreen: s,
                  sourceElement: n,
                  calloutId: l.calloutId,
                  ...o({
                    mint: l.mint,
                    calloutId: l.calloutId,
                    authorId: t,
                    attach: i,
                  }),
                  ...(d && l.recommendationId
                    ? { rec_id: l.recommendationId }
                    : {}),
                  ...(d && l.positionId ? { positionId: l.positionId } : {}),
                });
              }),
              (l[0] = i),
              (l[1] = r),
              (l[2] = e))
            : (e = l[2]),
          e
        );
      },
    ],
    210529,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let {
              surface: t,
              callout: l,
              position: i,
              coin: s,
              recommendationId: n,
              recommendationRank: o,
              positionId: d,
              chain: c,
            } = e,
            u = s?.usd_market_cap,
            m = (0, r.useRef)(null),
            p = (0, r.useRef)(""),
            f = (0, r.useRef)(!1),
            x = (0, r.useRef)(!1),
            h = (0, r.useRef)(!1),
            g = (0, r.useRef)({
              surface: t,
              coinMint: l.coinMint,
              calloutId: l.calloutId,
              authorUserId: l.userId,
              authorCcUserId: l.authorCcUserId,
              position: i,
              usdMarketCap: u,
              recommendationId: n,
              recommendationRank: o,
              positionId: d,
              chain: c,
            });
          g.current = {
            surface: t,
            coinMint: l.coinMint,
            calloutId: l.calloutId,
            authorUserId: l.userId,
            authorCcUserId: l.authorCcUserId,
            position: i,
            usdMarketCap: u,
            recommendationId: n,
            recommendationRank: o,
            positionId: d,
            chain: c,
          };
          let y = t ? `${l.calloutId}:${t}:${String(i ?? "")}` : "";
          p.current !== y &&
            ((p.current = y), (f.current = !1), (x.current = !1));
          let v = (0, r.useCallback)(() => {
            let e = g.current;
            if (!e.surface) return;
            let t =
              "number" == typeof e.usdMarketCap &&
              !Number.isNaN(e.usdMarketCap);
            (!f.current || (!x.current && t)) &&
              ((0, a.Ve)({
                mint: e.coinMint,
                calloutId: e.calloutId,
                authorUserId: e.authorUserId,
                authorCcUserId: e.authorCcUserId,
                surface: e.surface,
                absolutePosition: e.position,
                usdMarketCap: e.usdMarketCap,
                recommendationId: e.recommendationId,
                recommendationRank: e.recommendationRank,
                positionId: e.positionId,
                chain: e.chain,
              }),
              (f.current = !0),
              t && (x.current = !0));
          }, []);
          return (
            (0, r.useEffect)(() => {
              if (!t) return;
              let e = m.current;
              if (!e) return;
              if ("u" < typeof IntersectionObserver) {
                ((h.current = !0), v());
                return;
              }
              let l = new IntersectionObserver(
                (e) => {
                  for (let t of e) {
                    let e = t.intersectionRatio >= 0.5;
                    e && !h.current
                      ? ((h.current = !0), v())
                      : !e && h.current && (h.current = !1);
                  }
                },
                { threshold: [0, 0.5] },
              );
              return (
                l.observe(e),
                () => {
                  (l.disconnect(), (h.current = !1));
                }
              );
            }, [t, v]),
            (0, r.useEffect)(() => {
              !h.current ||
                !f.current ||
                x.current ||
                "number" != typeof u ||
                Number.isNaN(u) ||
                v();
            }, [u, v]),
            m
          );
        },
      ],
      598005,
    ));
};
