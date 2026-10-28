// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(292686),
    r = e.i(352386),
    a = e.i(257004),
    i = e.i(595673),
    s = e.i(569526),
    n = e.i(639374);
  let o = ({ mint: e, calloutId: t, authorId: l, attach: r }) => {
    if (t && l) {
      if ((0, n.f)(l)) return { calloutAuthorWallet: l };
      (0, a.M)(l).then((l) => {
        l && r({ mint: e, calloutId: t, wallet: l });
      });
    }
  };
  (e.s(
    [
      "p",
      0,
      function (e) {
        let { mint: t, calloutId: a, authorId: n } = e,
          {
            lastClickImpression: d,
            setLastClickImpression: c,
            attachCalloutAuthorWallet: u,
          } = (0, s.y)(),
          p = (0, r.useRef)(d);
        ((p.current = d),
          (0, r.useEffect)(() => {
            if (!a) return;
            let e = p.current;
            if (
              e?.mint === t &&
              e.impression.calloutId === a &&
              e.impression.sourceElement === l.k9.POSITION_FEED_CALLOUT_ROW
            ) {
              if (e.impression.calloutAuthorWallet) return;
              let l = o({ mint: t, calloutId: a, authorId: n, attach: u });
              l && u({ mint: t, calloutId: a, wallet: l.calloutAuthorWallet });
              return;
            }
            let { sourceScreen: r, sourceElement: s } = (0, i.oj)(
              "callout_detail",
            );
            c(t, {
              itemPosition: 0,
              marketCap: 0,
              sourceScreen: r,
              sourceElement: s,
              calloutId: a,
              ...o({ mint: t, calloutId: a, authorId: n, attach: u }),
            });
          }, [t, a, n, c, u]));
      },
      "q",
      0,
      function () {
        let e,
          l = (0, t.c)(3),
          { setLastClickImpression: r, attachCalloutAuthorWallet: a } = (0,
          s.y)();
        return (
          l[0] !== a || l[1] !== r
            ? ((e = (e) => {
                let { authorId: t, ...l } = e;
                (0, i.ie)(l);
                let { sourceScreen: s, sourceElement: n } = (0, i.oj)(
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
                    attach: a,
                  }),
                  ...(d && l.recommendationId
                    ? { rec_id: l.recommendationId }
                    : {}),
                  ...(d && l.positionId ? { positionId: l.positionId } : {}),
                });
              }),
              (l[0] = a),
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
              position: a,
              coin: s,
              recommendationId: n,
              recommendationRank: o,
              positionId: d,
              chain: c,
            } = e,
            u = s?.usd_market_cap,
            p = (0, r.useRef)(null),
            m = (0, r.useRef)(""),
            f = (0, r.useRef)(!1),
            x = (0, r.useRef)(!1),
            h = (0, r.useRef)(!1),
            g = (0, r.useRef)({
              surface: t,
              coinMint: l.coinMint,
              calloutId: l.calloutId,
              authorUserId: l.userId,
              authorCcUserId: l.authorCcUserId,
              position: a,
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
            position: a,
            usdMarketCap: u,
            recommendationId: n,
            recommendationRank: o,
            positionId: d,
            chain: c,
          };
          let y = t ? `${l.calloutId}:${t}:${String(a ?? "")}` : "";
          m.current !== y &&
            ((m.current = y), (f.current = !1), (x.current = !1));
          let v = (0, r.useCallback)(() => {
            let e = g.current;
            if (!e.surface) return;
            let t =
              "number" == typeof e.usdMarketCap &&
              !Number.isNaN(e.usdMarketCap);
            (!f.current || (!x.current && t)) &&
              ((0, i.Ve)({
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
              let e = p.current;
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
            p
          );
        },
      ],
      598005,
    ));
};
