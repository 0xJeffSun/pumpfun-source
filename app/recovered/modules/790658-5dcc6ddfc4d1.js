// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    i = e.i(588812),
    a = e.i(392968),
    s = e.i(529841),
    n = e.i(908163),
    o = e.i(975982),
    d = e.i(605587);
  let c = /^(?:[a-z0-9]{1,16}:)?[A-Za-z0-9]{1,24}$/,
    u = (e) => {
      let t = e?.trim() ?? "";
      return c.test(t) && !(0, o.k)(t) && !(0, d.h)(t);
    };
  e.s(
    [
      "K",
      0,
      (e) => {
        try {
          return decodeURIComponent(e);
        } catch {
          return e;
        }
      },
      "f",
      0,
      u,
    ],
    121742,
  );
  var m = e.i(21617);
  let p = (e) => e?.chain === m.g,
    f = (e) => e?.closedAt != null,
    x = (e) => p(e) || null != e.perp,
    h = (e) => u(e?.coinMint);
  e.s(
    [
      "d",
      0,
      f,
      "I",
      0,
      p,
      "o",
      0,
      x,
      "l",
      0,
      (e) => {
        switch (e.type) {
          case "callout":
            return x(e.entry);
          case "reply":
          case "quote":
            return h(e.row.callout);
          case "repost":
            return h(e.callout);
          default:
            return !1;
        }
      },
      "j",
      0,
      (e) => {
        let t = e.trim(),
          l = t.lastIndexOf(":");
        return -1 === l ? t : t.slice(l + 1) || t;
      },
      "z",
      0,
      (e) => ({
        side: e.side,
        leverage:
          Number.isFinite(e.leverageBps) && e.leverageBps > 0
            ? Math.round((e.leverageBps / 1e4) * 100) / 100
            : 0,
        entryPx: Number.isFinite(e.entryPx) ? e.entryPx : null,
        closePx: Number.isFinite(e.closePx) ? e.closePx : null,
        closedAt: e.closedAt ?? null,
      }),
    ],
    662986,
  );
  var g = e.i(592209),
    y = e.i(243719),
    v = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          d,
          c,
          u,
          m,
          p,
          x,
          h,
          b,
          w,
          j = (0, l.c)(36),
          { perp: N, szDecimals: I, multiple: _, className: k } = e,
          { t: C, i18n: S } = (0, r.f)();
        if (j[0] !== S.language || j[1] !== N || j[2] !== I) {
          let e,
            t = (0, g.v)(S.language) ?? g.T;
          (j[6] !== N ? ((e = f(N)), (j[6] = N), (j[7] = e)) : (e = j[7]),
            (d = e));
          let l = (e) =>
            null != e && e > 0
              ? String((0, y.Q)({ px: e, szDecimals: I, locale: t }))
              : null;
          ((o = l(N.entryPx)),
            (c = d ? l(N.closePx) : null),
            (j[0] = S.language),
            (j[1] = N),
            (j[2] = I),
            (j[3] = o),
            (j[4] = d),
            (j[5] = c));
        } else ((o = j[3]), (d = j[4]), (c = j[5]));
        let P = c,
          U = null != _ && Number.isFinite(_) && _ > 0 ? (_ - 1) * 100 : null;
        j[8] !== k
          ? ((u = (0, v.c)(
              "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-4 text-text-tertiary",
              k,
            )),
            (j[8] = k),
            (j[9] = u))
          : (u = j[9]);
        let A = d || void 0,
          F = !d;
        return (
          j[10] !== N.leverage || j[11] !== N.side || j[12] !== F
            ? ((m = (0, t.jsx)(i.A, {
                side: N.side,
                leverage: N.leverage,
                isLive: F,
              })),
              (j[10] = N.leverage),
              (j[11] = N.side),
              (j[12] = F),
              (j[13] = m))
            : (m = j[13]),
          j[14] !== o || j[15] !== C
            ? ((p = o
                ? (0, t.jsx)("span", {
                    className: "tabular-nums",
                    "data-testid": "perp-callout-position-entry",
                    children: C("web.perps.callouts.entry", { price: o }),
                  })
                : null),
              (j[14] = o),
              (j[15] = C),
              (j[16] = p))
            : (p = j[16]),
          j[17] !== P || j[18] !== C
            ? ((x = P
                ? (0, t.jsx)("span", {
                    className: "tabular-nums",
                    "data-testid": "perp-callout-position-exit",
                    children: C("web.perps.callouts.exit", { price: P }),
                  })
                : null),
              (j[17] = P),
              (j[18] = C),
              (j[19] = x))
            : (x = j[19]),
          j[20] !== d || j[21] !== N.closedAt || j[22] !== C
            ? ((h = d
                ? (0, t.jsxs)("span", {
                    className: "flex items-center gap-1",
                    "data-testid": "perp-callout-position-closed",
                    children: [
                      (0, t.jsx)(n.E, {
                        density: "terminal",
                        children: C("web.perps.callouts.closed"),
                      }),
                      (0, t.jsx)(s.f, {
                        timestamp: N.closedAt,
                        density: "terminal",
                      }),
                    ],
                  })
                : null),
              (j[20] = d),
              (j[21] = N.closedAt),
              (j[22] = C),
              (j[23] = h))
            : (h = j[23]),
          j[24] !== U || j[25] !== C
            ? ((b =
                null != U
                  ? (0, t.jsxs)("span", {
                      className: "flex items-center gap-1",
                      "data-testid": "perp-callout-position-return",
                      children: [
                        (0, t.jsx)("span", {
                          children: C("web.perps.callouts.return"),
                        }),
                        (0, t.jsx)(a.f, {
                          changePercent: U,
                          variant: "text",
                          density: "terminal",
                          isPnl: !0,
                          signed: !0,
                          hideArrow: !0,
                        }),
                      ],
                    })
                  : null),
              (j[24] = U),
              (j[25] = C),
              (j[26] = b))
            : (b = j[26]),
          j[27] !== N.side ||
          j[28] !== u ||
          j[29] !== A ||
          j[30] !== m ||
          j[31] !== p ||
          j[32] !== x ||
          j[33] !== h ||
          j[34] !== b
            ? ((w = (0, t.jsxs)("div", {
                className: u,
                "data-testid": "perp-callout-position",
                "data-side": N.side,
                "data-closed": A,
                children: [m, p, x, h, b],
              })),
              (j[27] = N.side),
              (j[28] = u),
              (j[29] = A),
              (j[30] = m),
              (j[31] = p),
              (j[32] = x),
              (j[33] = h),
              (j[34] = b),
              (j[35] = w))
            : (w = j[35]),
          w
        );
      },
    ],
    790658,
  );
};
