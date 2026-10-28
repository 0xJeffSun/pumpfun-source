// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(574472);
  e.i(660947);
  var a = e.i(191168),
    s = e.i(67016),
    i = e.i(79631),
    n = e.i(142318),
    d = e.i(576766),
    o = e.i(676271),
    u = e.i(134188),
    m = e.i(927878),
    c = e.i(303599),
    f = e.i(306775),
    h = e.i(233283),
    g = e.i(889451),
    p = e.i(646908),
    T = e.i(662093),
    b = e.i(639374),
    v = e.i(361284);
  e.s(
    [
      "f",
      0,
      function (e) {
        let y,
          w,
          k,
          I,
          S,
          M,
          A,
          U,
          _,
          x,
          W,
          B,
          P,
          F,
          O,
          C,
          E,
          N,
          j,
          D,
          q,
          $ = (0, r.c)(88),
          { callout: R, coin: L } = e,
          { address: z } = (0, l.F)(),
          V = (0, c.o)(),
          H = (0, s.G)(),
          J = L.mint;
        $[0] !== L ? ((y = (0, h.$)(L)), ($[0] = L), ($[1] = y)) : (y = $[1]);
        let K = (0, p.L)(L.chain_id) ? p.J : void 0;
        $[2] !== L.chain_id ||
        $[3] !== L.mint ||
        $[4] !== H ||
        $[5] !== y ||
        $[6] !== K
          ? ((w = {
              mint: J,
              sortBy: H,
              withThesis: !0,
              pageSize: n.$,
              chainId: y,
              chain: K,
              coinChain: L.chain_id,
              enabled: !0,
            }),
            ($[2] = L.chain_id),
            ($[3] = L.mint),
            ($[4] = H),
            ($[5] = y),
            ($[6] = K),
            ($[7] = w))
          : (w = $[7]);
        let { positions: G } = (0, n.z)(w);
        $[8] !== L ? ((k = { coin: L }), ($[8] = L), ($[9] = k)) : (k = $[9]);
        let Q = (0, m.f)(k);
        $[10] !== L
          ? ((I = { coin: L }), ($[10] = L), ($[11] = I))
          : (I = $[11]);
        let Z = (0, u.f)(I);
        if ($[12] !== R.calloutId || $[13] !== G || $[14] !== Q) {
          let e,
            t = (0, f.f)(G, { pricePerTokenUsd: Q });
          ($[16] !== R.calloutId
            ? ((e = (e) => e.callout.calloutId === R.calloutId),
              ($[16] = R.calloutId),
              ($[17] = e))
            : (e = $[17]),
            (S = t.find(e)),
            ($[12] = R.calloutId),
            ($[13] = G),
            ($[14] = Q),
            ($[15] = S));
        } else S = $[15];
        let X = S;
        $[18] !== L.mint
          ? ((M = [L.mint]), ($[18] = L.mint), ($[19] = M))
          : (M = $[19]);
        let Y = !X;
        $[20] !== R.userId || $[21] !== M || $[22] !== Y
          ? ((A = { userId: R.userId, mints: M, enabled: Y }),
            ($[20] = R.userId),
            ($[21] = M),
            ($[22] = Y),
            ($[23] = A))
          : (A = $[23]);
        let { positionFor: ee } = (0, i._)(A);
        $[24] !== L.mint || $[25] !== X || $[26] !== ee
          ? ((U = X ? void 0 : ee(L.mint)),
            ($[24] = L.mint),
            ($[25] = X),
            ($[26] = ee),
            ($[27] = U))
          : (U = $[27]);
        let et = U;
        $[28] !== et || $[29] !== Q
          ? ((_ = (0, g.y)(et, Q)), ($[28] = et), ($[29] = Q), ($[30] = _))
          : (_ = $[30]);
        let er = _,
          el = R.userId;
        $[31] !== L.mint
          ? ((x = (0, b.f)(L.mint)), ($[31] = L.mint), ($[32] = x))
          : (x = $[32]);
        let ea = !x;
        $[33] !== R.userId || $[34] !== ea
          ? ((W = [{ address: el, skipPnl: ea }]),
            ($[33] = R.userId),
            ($[34] = ea),
            ($[35] = W))
          : (W = $[35]);
        let es = W;
        $[36] !== L.mint || $[37] !== es
          ? ((B = { mint: L.mint, holders: es }),
            ($[36] = L.mint),
            ($[37] = es),
            ($[38] = B))
          : (B = $[38]);
        let ei = (0, o.f)(B);
        $[39] !== R.userId || $[40] !== ei
          ? ((P = ei.get(R.userId)),
            ($[39] = R.userId),
            ($[40] = ei),
            ($[41] = P))
          : (P = $[41]);
        let en = P,
          ed = (0, T.b)(L);
        $[42] !== R.userId
          ? ((F = [R.userId]), ($[42] = R.userId), ($[43] = F))
          : (F = $[43]);
        let eo = F;
        $[44] !== eo
          ? ((O = { userAddresses: eo }), ($[44] = eo), ($[45] = O))
          : (O = $[45]);
        let { data: eu } = (0, d.f)(O);
        $[46] !== eu
          ? ((C = void 0 === eu ? [] : eu), ($[46] = eu), ($[47] = C))
          : (C = $[47]);
        let em = C;
        if ($[48] !== R.userId || $[49] !== em) {
          let e;
          ($[51] !== R.userId
            ? ((e = (e) => e?.address === R.userId),
              ($[51] = R.userId),
              ($[52] = e))
            : (e = $[52]),
            (E = em.find(e)),
            ($[48] = R.userId),
            ($[49] = em),
            ($[50] = E));
        } else E = $[50];
        let ec = E;
        e: {
          let e;
          if (X) {
            N = X;
            break e;
          }
          let t = er?.positionUsd ?? null,
            r = er && !er.isClosed ? (et?.amountHeld ?? null) : null,
            l = er?.netPnlUsd ?? null,
            a = er?.displayPct ?? null,
            s = er?.spentUsd ?? null,
            i = er?.avgEntryPriceUsd ?? null;
          ($[53] !== er ||
          $[54] !== R ||
          $[55] !== t ||
          $[56] !== r ||
          $[57] !== l ||
          $[58] !== a ||
          $[59] !== s ||
          $[60] !== i
            ? ((e = {
                callout: R,
                positionUsd: t,
                positionTokenAmount: r,
                netPnlUsd: l,
                netPnlPct: a,
                spentUsdFallback: s,
                avgEntryPriceUsdFallback: i,
                summary: er,
              }),
              ($[53] = er),
              ($[54] = R),
              ($[55] = t),
              ($[56] = r),
              ($[57] = l),
              ($[58] = a),
              ($[59] = s),
              ($[60] = i),
              ($[61] = e))
            : (e = $[61]),
            (N = e));
        }
        let ef = N,
          eh = !X && er?.isClosed === !0;
        $[62] !== eh ||
        $[63] !== ef.netPnlPct ||
        $[64] !== ef.netPnlUsd ||
        $[65] !== ef.spentUsdFallback ||
        $[66] !== ef.summary?.costBasisUsd ||
        $[67] !== ef.summary?.isExited ||
        $[68] !== ef.summary?.receiptBasisUsd ||
        $[69] !== ef.summary?.spentUsd
          ? ((j =
              ef.netPnlPct ??
              (null != ef.netPnlUsd
                ? (0, v.f)(
                    (0, g.i)(ef.netPnlUsd, {
                      amountBoughtUsd:
                        ef.summary?.spentUsd ?? ef.spentUsdFallback,
                      receiptBasisUsd: ef.summary?.receiptBasisUsd,
                      costBasisUsd: ef.summary?.costBasisUsd,
                      isExited: ef.summary?.isExited ?? eh,
                    }),
                  )
                : null)),
            ($[62] = eh),
            ($[63] = ef.netPnlPct),
            ($[64] = ef.netPnlUsd),
            ($[65] = ef.spentUsdFallback),
            ($[66] = ef.summary?.costBasisUsd),
            ($[67] = ef.summary?.isExited),
            ($[68] = ef.summary?.receiptBasisUsd),
            ($[69] = ef.summary?.spentUsd),
            ($[70] = j))
          : (j = $[70]);
        let eg = j,
          ep = en?.avgEntryUsdPerToken ?? ef.avgEntryPriceUsdFallback ?? null,
          eT = null != ep && ed > 0 ? ep * ed : null,
          eb = en?.costBasisUsd ?? ef.spentUsdFallback ?? null;
        return (
          $[71] !== R.userId || $[72] !== V
            ? ((D = V.isFollowing(R.userId) ?? !1),
              ($[71] = R.userId),
              ($[72] = V),
              ($[73] = D))
            : (D = $[73]),
          $[74] !== z ||
          $[75] !== eT ||
          $[76] !== L ||
          $[77] !== Z ||
          $[78] !== eh ||
          $[79] !== eg ||
          $[80] !== ef.callout ||
          $[81] !== ef.netPnlUsd ||
          $[82] !== ef.positionTokenAmount ||
          $[83] !== ef.positionUsd ||
          $[84] !== eb ||
          $[85] !== D ||
          $[86] !== ec
            ? ((q = (0, t.jsx)(a.f, {
                callout: ef.callout,
                coin: L,
                currentMarketCapUsd: Z,
                user: ec,
                position: 0,
                positionUsd: ef.positionUsd,
                positionTokenAmount: ef.positionTokenAmount,
                netPnlUsd: ef.netPnlUsd,
                netPnlPct: eg,
                spentUsd: eb,
                avgEntryMcapUsd: eT,
                isClosed: eh,
                viewerAddress: z,
                initialIsFollowing: D,
                narrow: !0,
                className:
                  "-mx-3 w-auto border-b-0 px-3 hover:bg-bg-quaternary",
              })),
              ($[74] = z),
              ($[75] = eT),
              ($[76] = L),
              ($[77] = Z),
              ($[78] = eh),
              ($[79] = eg),
              ($[80] = ef.callout),
              ($[81] = ef.netPnlUsd),
              ($[82] = ef.positionTokenAmount),
              ($[83] = ef.positionUsd),
              ($[84] = eb),
              ($[85] = D),
              ($[86] = ec),
              ($[87] = q))
            : (q = $[87]),
          q
        );
      },
    ],
    998580,
  );
  var y = e.i(352386);
  e.s(
    [
      "g",
      0,
      ({ pointer: e, tooltip: t, markSize: r }) => {
        let l = Math.max(r / 2, 8) + 2,
          { x: a, y: s } = e;
        if (t) {
          let i = Math.round(r / 2),
            n = i + 13 + Math.min(8, i),
            d = t.left + t.width + n,
            o = t.left - n,
            u = Math.abs(d - e.x) <= Math.abs(o - e.x) ? d : o;
          Math.abs(u - e.x) <= l && (a = u);
          let m = t.top + t.height / 2;
          Math.abs(m - e.y) <= l && (s = m);
        }
        return { x: a, y: s, size: r };
      },
      "b",
      0,
      ({ minSize: e, barSpacing: t }) =>
        Math.min(553, Math.max(7, e, 0.8 * (t ?? 0))),
      "A",
      0,
      ({ containerRef: e, point: t }) => {
        let r = t.size ?? 0;
        return (0, y.useMemo)(
          () => ({
            contextElement: e.current ?? void 0,
            getBoundingClientRect: () => {
              let l = e.current?.getBoundingClientRect();
              return DOMRect.fromRect({
                x: (l?.left ?? 0) + t.x - r / 2,
                y: (l?.top ?? 0) + t.y - r / 2,
                width: r,
                height: r,
              });
            },
          }),
          [e, t.x, t.y, r],
        );
      },
    ],
    755300,
  );
};
