// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(747337),
    r = e.i(256617),
    i = e.i(12345);
  function n(e) {
    try {
      return new URL(e).origin === new URL("https://images.pump.fun").origin;
    } catch {
      return !1;
    }
  }
  var a = e.i(646908),
    o = e.i(338319);
  let l = { COIN_IMAGE: "coin-image", COIN_BANNER: "coin-banner" };
  e.s(
    [
      "d",
      0,
      l,
      "t",
      0,
      function (e) {
        let s = (function (e) {
          let {
            sourceImageUrl: s,
            mint: d,
            width: c,
            height: u,
            isBanned: m,
          } = e;
          if (m) return "";
          let h = e.imageType ?? l.COIN_IMAGE,
            p = (0, r.l)({ width: c, height: u }),
            f = `${h}/${d}`;
          if (s && (0, t.H)(s)) return (0, t.N)(`${s}/${p}`);
          if (s && n(s)) return (0, t.F)({ url: s, variant: p });
          if ((0, i.a)(d))
            return (0, i.o)({
              mint: d,
              imageType: h,
              variant: p,
              sourceImageUrl: s,
            });
          if (!s)
            return `https://images.pump.fun/${f}?${new URLSearchParams({ variant: p })}`;
          if (s.startsWith("/") || (!(0, a.u)(d) && (0, i.n)(s))) return s;
          let b = `https://images.pump.fun/${f}`,
            g = new URLSearchParams({ variant: p }),
            x = (0, o.k)(s);
          return (
            x && g.set("ipfs", x),
            g.set("src", s),
            `${b}?${g.toString()}`
          );
        })(e);
        if (!e.suppressPlaceholder || !n(s)) return s;
        let d = new URL(s);
        return (d.searchParams.set("placeholder", "none"), d.toString());
      },
    ],
    56087,
  );
};
