// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var r = e.i(605587);
  let t = "token-media.defined.fi",
    o = [
      { hostname: t },
      { hostname: "backpack.exchange", pathPrefix: "/api/stock-logo/" },
      { hostname: "nft.collectorcrypt.com" },
      { hostname: "arweave.net" },
      { hostname: "d1xpxki1g4htqu.cloudfront.net" },
    ],
    n = (e) => {
      try {
        let r = new URL(e);
        return (
          "https:" === r.protocol &&
          o.some(
            ({ hostname: e, pathPrefix: t }) =>
              r.hostname === e && (void 0 === t || r.pathname.startsWith(t)),
          )
        );
      } catch {
        return !1;
      }
    };
  e.s([
    "o",
    0,
    function ({ mint: e, imageType: r, variant: t, sourceImageUrl: o }) {
      let n = new URLSearchParams({ variant: t });
      return (
        o && n.set("evmFallbackImage", o),
        `https://images.pump.fun/${r}/${e}?${n.toString()}`
      );
    },
    "X",
    0,
    function (e) {
      return !!e.image_uri || (0, r.N)({ mint: e.mint, chainId: e.chain_id });
    },
    "e",
    0,
    (e) => {
      try {
        let r = new URL(e);
        return "https:" === r.protocol && r.hostname === t;
      } catch {
        return !1;
      }
    },
    "n",
    0,
    n,
    "a",
    0,
    function (e) {
      return (0, r.N)({ mint: e });
    },
    "I",
    0,
    function (e) {
      if (e)
        return [e.highResImageUri, e.imageUri].find(
          (e) => "string" == typeof e && n(e),
        );
    },
  ]);
};
