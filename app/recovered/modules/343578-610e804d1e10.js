// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(958083);
  e.s(
    [
      "j",
      0,
      ({ price: e, referenceClose: t }) =>
        !Number.isFinite(e) ||
        e <= 0 ||
        (!!Number.isFinite(t) && !(t <= 0) && (e > 100 * t || e < t / 100)),
      "l",
      0,
      ({ price: e, reference: t, now: r }) =>
        !!t &&
        !(r - t.at > 3e5) &&
        !!Number.isFinite(t.price) &&
        !(t.price <= 0) &&
        Math.abs(e / t.price - 1) > 0.05,
      "w",
      0,
      ({ event: e, solPriceUsd: r }) => {
        let l = e.priceUsd ? new t.U(e.priceUsd).toNumber() : 0;
        if (Number.isFinite(l) && l > 0) return l;
        if (e.priceSol && r > 0) {
          let l = new t.U(e.priceSol).toNumber() * r;
          if (Number.isFinite(l) && l > 0) return l;
        }
        return null;
      },
    ],
    343578,
  );
  var r = e.i(445242),
    l = e.i(352386);
  e.s(
    [
      "f",
      0,
      (e) => {
        let t,
          a,
          s = (0, r.c)(7),
          { defaultMode: i, displayMode: n, onDisplayModeChange: d } = e,
          o = void 0 === i ? "marketcap" : i,
          [u, m] = (0, l.useState)(o),
          c = void 0 !== n,
          f = n ?? u,
          h = n ?? o;
        s[0] !== c || s[1] !== d
          ? ((t = (e) => {
              (c || m(e), d?.(e));
            }),
            (s[0] = c),
            (s[1] = d),
            (s[2] = t))
          : (t = s[2]);
        let g = t;
        return (
          s[3] !== f || s[4] !== h || s[5] !== g
            ? ((a = { displayMode: f, setDisplayMode: g, seedDisplayMode: h }),
              (s[3] = f),
              (s[4] = h),
              (s[5] = g),
              (s[6] = a))
            : (a = s[6]),
          a
        );
      },
    ],
    592896,
  );
};
