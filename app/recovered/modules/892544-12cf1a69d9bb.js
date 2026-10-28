// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(691471);
  e.i(84455);
  var s = e.i(392968),
    n = e.i(540805);
  e.i(87798);
  var l = e.i(63121),
    o = e.i(787773),
    c = e.i(967694),
    d = e.i(908163);
  e.i(267146);
  var u = e.i(592209),
    m = e.i(243719),
    p = e.i(499141);
  let f = (e) => e.trim().toLowerCase();
  var x = e.i(338319),
    g = e.i(187611);
  let h = (e) => (null === e ? "—" : (0, n.l)(e)),
    b = (e, t) => (e ?? -1 / 0) - (t ?? -1 / 0),
    y = {
      comfortable:
        "text-sm font-medium leading-5 tabular-nums text-text-primary",
      terminal: "text-xs font-medium leading-4 tabular-nums text-text-primary",
    },
    v = "text-xs leading-4 text-text-tertiary",
    w = { comfortable: "comfortable", terminal: "compact" },
    N = { columnId: "volume", direction: "desc" };
  function j(e) {
    return (0, g.T)(e.ticker, "other");
  }
  function k(e) {
    return (0, p.o)(e.coin);
  }
  function C(e) {
    return e.coin;
  }
  function P(e, t) {
    return b(e.volume24hUsd, t.volume24hUsd);
  }
  function _(e, t) {
    return b(e.openInterestUsd, t.openInterestUsd);
  }
  function S(e, t) {
    return e.fundingRateHourlyPct - t.fundingRateHourlyPct;
  }
  function I(e, t) {
    return b(e.change24hPct, t.change24hPct);
  }
  function F(e, t) {
    return Number(e.markPx) - Number(t.markPx);
  }
  function A(e) {
    let s,
      n,
      l,
      o,
      c,
      u,
      m,
      p,
      f,
      g,
      h = (0, r.c)(30),
      { market: b, density: y } = e,
      { t: w } = (0, i.f)(),
      N = "terminal" === y,
      j = N ? 20 : 32;
    h[0] !== b || h[1] !== j
      ? ((s = (0, t.jsx)(a.f, {
          market: b,
          size: j,
          testIdPrefix: "perps-table-row",
        })),
        (h[0] = b),
        (h[1] = j),
        (h[2] = s))
      : (s = h[2]);
    let k = N ? "text-xs leading-4" : "text-sm leading-5";
    return (
      h[3] !== k
        ? ((n = (0, x.c)("truncate font-medium text-text-primary", k)),
          (h[3] = k),
          (h[4] = n))
        : (n = h[4]),
      h[5] !== b.ticker || h[6] !== n
        ? ((l = (0, t.jsx)("span", {
            className: n,
            "data-testid": "perps-table-ticker",
            children: b.ticker,
          })),
          (h[5] = b.ticker),
          (h[6] = n),
          (h[7] = l))
        : (l = h[7]),
      h[8] !== b.maxLeverage || h[9] !== w
        ? ((o = w("web.screeners.perps_max_leverage", {
            value: b.maxLeverage,
          })),
          (h[8] = b.maxLeverage),
          (h[9] = w),
          (h[10] = o))
        : (o = h[10]),
      h[11] !== y || h[12] !== o
        ? ((c = (0, t.jsx)(d.E, {
            density: y,
            className: "hidden @[360px]:inline-flex",
            children: o,
          })),
          (h[11] = y),
          (h[12] = o),
          (h[13] = c))
        : (c = h[13]),
      h[14] !== y || h[15] !== b.dex
        ? ((u =
            null !== b.dex
              ? (0, t.jsx)(d.E, {
                  density: y,
                  className: "hidden @[480px]:inline-flex",
                  "data-testid": "perps-table-dex",
                  children: b.dex,
                })
              : null),
          (h[14] = y),
          (h[15] = b.dex),
          (h[16] = u))
        : (u = h[16]),
      h[17] !== l || h[18] !== c || h[19] !== u
        ? ((m = (0, t.jsxs)("span", {
            className: "flex min-w-0 items-center gap-2",
            children: [l, c, u],
          })),
          (h[17] = l),
          (h[18] = c),
          (h[19] = u),
          (h[20] = m))
        : (m = h[20]),
      h[21] !== N || h[22] !== b.displayName
        ? ((p = N
            ? null
            : (0, t.jsx)("span", {
                className: (0, x.c)(v, "truncate"),
                children: b.displayName,
              })),
          (h[21] = N),
          (h[22] = b.displayName),
          (h[23] = p))
        : (p = h[23]),
      h[24] !== p || h[25] !== m
        ? ((f = (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-col",
            children: [m, p],
          })),
          (h[24] = p),
          (h[25] = m),
          (h[26] = f))
        : (f = h[26]),
      h[27] !== f || h[28] !== s
        ? ((g = (0, t.jsxs)("div", {
            className: "flex w-0 min-w-full items-center gap-3",
            children: [s, f],
          })),
          (h[27] = f),
          (h[28] = s),
          (h[29] = g))
        : (g = h[29]),
      g
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          d,
          p,
          g,
          b,
          E,
          R,
          T,
          $,
          q,
          D,
          U,
          O,
          z,
          L,
          G,
          M,
          H,
          Q,
          W,
          B,
          K,
          V,
          Y,
          Z,
          J,
          X,
          ee = (0, r.c)(84),
          {
            markets: et,
            status: er,
            emptyLabel: ei,
            errorLabel: ea,
            onRetry: es,
            density: en,
            scroll: el,
            scrollClassName: eo,
            query: ec,
            currentCoin: ed,
            loadingRowCount: eu,
            testId: em,
            rowTestId: ep,
          } = e,
          ef = void 0 === en ? "comfortable" : en,
          ex = void 0 === ec ? "" : ec,
          eg = void 0 === ed ? null : ed,
          eh = void 0 === eu ? 12 : eu,
          eb = void 0 === em ? "perps-markets-table" : em,
          ey = void 0 === ep ? "perps-market-table-row" : ep,
          { t: ev, i18n: ew } = (0, i.f)();
        ee[0] !== ew.language
          ? ((a = (0, u.v)(ew.language) ?? u.T),
            (ee[0] = ew.language),
            (ee[1] = a))
          : (a = ee[1]);
        let eN = a,
          ej = y[ef];
        ee[2] !== et || ee[3] !== ex
          ? ((d = (({ markets: e, query: t }) => {
              let r = f(t);
              return "" === r
                ? e
                : e.filter(
                    (e) =>
                      f(e.ticker).includes(r) ||
                      f(e.displayName).includes(r) ||
                      f(e.coin).includes(r),
                  );
            })({ markets: et, query: ex })),
            (ee[2] = et),
            (ee[3] = ex),
            (ee[4] = d))
          : (d = ee[4]);
        let ek = d,
          eC = "ready" === er && 0 === ek.length ? "empty" : er;
        (ee[5] !== ev
          ? ((p = ev("web.perps.discovery.col_market")),
            (ee[5] = ev),
            (ee[6] = p))
          : (p = ee[6]),
          ee[7] !== ef
            ? ((g = (e) => {
                let { row: r } = e;
                return (0, t.jsx)(A, { market: r, density: ef });
              }),
              (ee[7] = ef),
              (ee[8] = g))
            : (g = ee[8]),
          ee[9] !== g || ee[10] !== p
            ? ((b = { id: "market", header: p, cell: g }),
              (ee[9] = g),
              (ee[10] = p),
              (ee[11] = b))
            : (b = ee[11]),
          ee[12] !== ev
            ? ((E = ev("web.perps.market.mark")), (ee[12] = ev), (ee[13] = E))
            : (E = ee[13]),
          ee[14] !== ej || ee[15] !== eN
            ? ((R = (e) => {
                let { row: r } = e;
                return (0, t.jsx)("span", {
                  className: ej,
                  "data-testid": "perps-table-mark",
                  children: (0, m.Q)({ px: r.markPx, locale: eN }),
                });
              }),
              (ee[14] = ej),
              (ee[15] = eN),
              (ee[16] = R))
            : (R = ee[16]),
          ee[17] !== E || ee[18] !== R
            ? ((T = {
                id: "mark",
                header: E,
                size: 120,
                align: "end",
                className: "tabular-nums",
                sortFn: F,
                defaultSortDirection: "desc",
                cell: R,
              }),
              (ee[17] = E),
              (ee[18] = R),
              (ee[19] = T))
            : (T = ee[19]),
          ee[20] !== ev
            ? (($ = ev("web.perps.discovery.col_change_24h")),
              (ee[20] = ev),
              (ee[21] = $))
            : ($ = ee[21]),
          ee[22] !== ef
            ? ((q = (e) => {
                let { row: r } = e;
                return null !== r.change24hPct &&
                  Number.isFinite(r.change24hPct)
                  ? (0, t.jsx)(s.f, {
                      changePercent: r.change24hPct,
                      density: ef,
                      "data-testid": "perps-table-change",
                    })
                  : (0, t.jsx)("span", { className: v, children: "—" });
              }),
              (ee[22] = ef),
              (ee[23] = q))
            : (q = ee[23]),
          ee[24] !== $ || ee[25] !== q
            ? ((D = {
                id: "change",
                header: $,
                size: 96,
                minContainerWidth: 480,
                align: "end",
                sortFn: I,
                defaultSortDirection: "desc",
                cell: q,
              }),
              (ee[24] = $),
              (ee[25] = q),
              (ee[26] = D))
            : (D = ee[26]),
          ee[27] !== ev
            ? ((U = ev("web.perps.market.funding")),
              (ee[27] = ev),
              (ee[28] = U))
            : (U = ee[28]),
          ee[29] !== ej || ee[30] !== eN || ee[31] !== ev
            ? ((O = (e) => {
                let { row: r } = e;
                return (0, t.jsxs)("span", {
                  className: "flex items-baseline justify-end gap-1",
                  "data-testid": "perps-table-funding",
                  children: [
                    (0, t.jsx)("span", {
                      className: ej,
                      children: (0, m.g)({
                        pct: r.fundingRateHourlyPct,
                        locale: eN,
                      }),
                    }),
                    (0, t.jsx)("span", {
                      className: (0, x.c)(
                        "whitespace-nowrap text-[11px] leading-4",
                        (0, n.k)(r.fundingAprPct),
                      ),
                      children: ev("web.perps.market.funding_apr", {
                        value: (0, m.P)({ pct: r.fundingAprPct, locale: eN }),
                      }),
                    }),
                  ],
                });
              }),
              (ee[29] = ej),
              (ee[30] = eN),
              (ee[31] = ev),
              (ee[32] = O))
            : (O = ee[32]),
          ee[33] !== U || ee[34] !== O
            ? ((z = {
                id: "funding",
                header: U,
                size: 170,
                align: "end",
                minContainerWidth: 760,
                className: "tabular-nums",
                sortFn: S,
                defaultSortDirection: "desc",
                cell: O,
              }),
              (ee[33] = U),
              (ee[34] = O),
              (ee[35] = z))
            : (z = ee[35]),
          ee[36] !== ev
            ? ((L = ev("web.perps.market.open_interest")),
              (ee[36] = ev),
              (ee[37] = L))
            : (L = ee[37]),
          ee[38] !== ej
            ? ((G = (e) => {
                let { row: r } = e;
                return (0, t.jsx)("span", {
                  className: ej,
                  "data-testid": "perps-table-open-interest",
                  children: h(r.openInterestUsd),
                });
              }),
              (ee[38] = ej),
              (ee[39] = G))
            : (G = ee[39]),
          ee[40] !== L || ee[41] !== G
            ? ((M = {
                id: "open_interest",
                header: L,
                size: 120,
                align: "end",
                minContainerWidth: 920,
                className: "tabular-nums",
                sortFn: _,
                defaultSortDirection: "desc",
                cell: G,
              }),
              (ee[40] = L),
              (ee[41] = G),
              (ee[42] = M))
            : (M = ee[42]),
          ee[43] !== ev
            ? ((H = ev("web.perps.market.volume_24h")),
              (ee[43] = ev),
              (ee[44] = H))
            : (H = ee[44]),
          ee[45] !== ej
            ? ((Q = (e) => {
                let { row: r } = e;
                return (0, t.jsx)("span", {
                  className: ej,
                  "data-testid": "perps-table-volume",
                  children: h(r.volume24hUsd),
                });
              }),
              (ee[45] = ej),
              (ee[46] = Q))
            : (Q = ee[46]),
          ee[47] !== H || ee[48] !== Q
            ? ((W = {
                id: "volume",
                header: H,
                size: 120,
                align: "end",
                minContainerWidth: 600,
                className: "tabular-nums pr-5",
                sortFn: P,
                defaultSortDirection: "desc",
                cell: Q,
              }),
              (ee[47] = H),
              (ee[48] = Q),
              (ee[49] = W))
            : (W = ee[49]),
          ee[50] !== b ||
          ee[51] !== T ||
          ee[52] !== D ||
          ee[53] !== z ||
          ee[54] !== M ||
          ee[55] !== W
            ? ((B = [b, T, D, z, M, W]),
              (ee[50] = b),
              (ee[51] = T),
              (ee[52] = D),
              (ee[53] = z),
              (ee[54] = M),
              (ee[55] = W),
              (ee[56] = B))
            : (B = ee[56]));
        let eP = B,
          e_ = w[ef];
        return (
          ee[57] !== eg
            ? ((K = (e) => (e.coin === eg ? "bg-bg-tertiary" : void 0)),
              (V = (e) => ({
                "data-coin": e.coin,
                "data-current": e.coin === eg ? "true" : void 0,
              })),
              (ee[57] = eg),
              (ee[58] = K),
              (ee[59] = V))
            : ((K = ee[58]), (V = ee[59])),
          ee[60] !== ef || ee[61] !== ei
            ? ((Y = () => (0, t.jsx)(o.L, { density: ef, children: ei })),
              (ee[60] = ef),
              (ee[61] = ei),
              (ee[62] = Y))
            : (Y = ee[62]),
          ee[63] !== ef || ee[64] !== ea
            ? ((Z = (e) => {
                let { retry: r } = e;
                return (0, t.jsx)(c.f, {
                  density: ef,
                  onRetry: r,
                  children: ea,
                });
              }),
              (ee[63] = ef),
              (ee[64] = ea),
              (ee[65] = Z))
            : (Z = ee[65]),
          ee[66] !== ev
            ? ((J = ev("web.perps.discovery.table_aria")),
              (ee[66] = ev),
              (ee[67] = J))
            : (J = ee[67]),
          ee[68] !== eP ||
          ee[69] !== eC ||
          ee[70] !== eh ||
          ee[71] !== es ||
          ee[72] !== ey ||
          ee[73] !== ek ||
          ee[74] !== el ||
          ee[75] !== eo ||
          ee[76] !== e_ ||
          ee[77] !== K ||
          ee[78] !== V ||
          ee[79] !== Y ||
          ee[80] !== Z ||
          ee[81] !== J ||
          ee[82] !== eb
            ? ((X = (0, t.jsx)(l.k, {
                rows: ek,
                columns: eP,
                rowKey: C,
                status: eC,
                defaultSortState: N,
                chrome: "flat",
                density: e_,
                scroll: el,
                scrollClassName: eo,
                rowHref: k,
                rowActionLabel: j,
                rowClassName: K,
                rowAttributes: V,
                renderEmpty: Y,
                renderError: Z,
                onRetry: es,
                loadingRowCount: eh,
                "aria-label": J,
                testId: eb,
                rowTestId: ey,
              })),
              (ee[68] = eP),
              (ee[69] = eC),
              (ee[70] = eh),
              (ee[71] = es),
              (ee[72] = ey),
              (ee[73] = ek),
              (ee[74] = el),
              (ee[75] = eo),
              (ee[76] = e_),
              (ee[77] = K),
              (ee[78] = V),
              (ee[79] = Y),
              (ee[80] = Z),
              (ee[81] = J),
              (ee[82] = eb),
              (ee[83] = X))
            : (X = ee[83]),
          X
        );
      },
    ],
    892544,
  );
};
