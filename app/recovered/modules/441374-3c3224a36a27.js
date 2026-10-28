// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(959719),
    a = e.i(971370);
  e.i(12692);
  var n = e.i(398902);
  e.i(70833);
  var s = e.i(102824),
    l = e.i(90832),
    o = e.i(655397),
    c = e.i(449597);
  e.s(
    [
      "f",
      0,
      (e) => {
        let m,
          d,
          h = (0, i.c)(7),
          { solAmount: u, quoteMint: f } = e,
          x = void 0 === f ? r.w : f,
          { t: p } = (0, n.f)(),
          { solBalance: g, usdcBalance: y } = (0, s.f)();
        h[0] !== x ? ((m = (0, o.w)(x)), (h[0] = x), (h[1] = m)) : (m = h[1]);
        let b = m,
          w = (u ?? 0) * Math.pow(10, b ? c.J : c.K);
        return (b ? (y?.balanceRaw ?? 0) < w : g < w)
          ? (h[2] !== b || h[3] !== g || h[4] !== p || h[5] !== y?.balance
              ? ((d = b
                  ? (0, t.jsx)("div", {
                      className: "h-0.5 text-xs text-red-500",
                      children: p("web.create.insufficient_usdc_balance", {
                        balance: (y?.balance ?? 0).toFixed(2),
                      }),
                    })
                  : (0, t.jsx)("div", {
                      className: "h-0.5 text-xs text-red-500",
                      children: p("web.create.insufficient_sol_balance", {
                        balance: (0, l.m)(g / a.LAMPORTS_PER_SOL),
                      }),
                    })),
                (h[2] = b),
                (h[3] = g),
                (h[4] = p),
                (h[5] = y?.balance),
                (h[6] = d))
              : (d = h[6]),
            d)
          : null;
      },
    ],
    441374,
  );
  var m = e.i(352386),
    d = e.i(63289),
    h = e.i(789087),
    u = e.i(498826),
    f = e.i(705672);
  e.s(
    [
      "f",
      0,
      function ({ onManualModeSet: e, resetSelectionOnSuccess: t = !0 } = {}) {
        let { t: i } = (0, n.f)(),
          { mutateAsync: r } = (0, u.e)(),
          { setIsMayhemEnabled: a, setIsMayhemManualMode: s } = (0, h.i)(),
          l = (0, f.f)();
        return (0, m.useCallback)(
          async ({ mintAddress: n, mayhemStateAtCreate: o }) => {
            if (!o.isMayhemEnabled || !o.isMayhemManualMode) return;
            let c = !0 === o.isMultiplayer && l,
              m = async (e) => {
                try {
                  return await r({
                    mint: n,
                    mode: "manual",
                    ...(e ? { multiplayer: !0 } : {}),
                  });
                } catch {
                  return null;
                }
              },
              h = await m(c);
            if (
              (c &&
                (null === h || !h.ok) &&
                (d.c.error(
                  i("web.mayhem.multiplayer_unavailable", {
                    multiplayer: i("web.mayhem.mode_multiplayer"),
                    mode: i("mayhem_mode.filters.manual"),
                  }),
                ),
                (h = await m(!1))),
              null === h)
            )
              return void d.c.error(
                i("web.mayhem.could_not_set_starting_mode"),
              );
            if (!h.ok) {
              let e = h.reason ?? i("web.mayhem.could_not_set_starting_mode");
              d.c.error(e);
              return;
            }
            t && (a(!1), s(!1), e && e());
          },
          [l, e, t, a, s, r, i],
        );
      },
    ],
    700903,
  );
};
