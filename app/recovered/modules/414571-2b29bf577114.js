// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    i = e.i(56087),
    r = e.i(807757);
  function a(e) {
    if (
      e.url &&
      (function (e) {
        try {
          return new URL(e).pathname
            .split("/")
            .some((e) => e.startsWith("placeholder"));
        } catch {
          return !1;
        }
      })(e.url)
    )
      throw Error("Image CDN holds no copy of this mint (placeholder answer)");
  }
  async function n({ imageUri: e, mint: s }) {
    try {
      return await (0, r.O)(e);
    } catch (l) {
      let n = (function ({ imageUri: e, mint: t }) {
        if (!t) return null;
        let r = (0, i.t)({
          mint: t,
          imageType: i.d.COIN_IMAGE,
          suppressPlaceholder: !0,
        });
        return !(function (e) {
          try {
            return "https:" === new URL(e).protocol;
          } catch {
            return !1;
          }
        })(r) || r === e
          ? null
          : r;
      })({ imageUri: e, mint: s });
      if (!n) throw l;
      return (
        t.y.warn(
          "Coin image direct fetch failed; retrying through the image CDN",
          {
            mint: s,
            sourceHost: (function (e) {
              try {
                return new URL(e).hostname;
              } catch {
                return;
              }
            })(e),
            error: l instanceof Error ? l.message : String(l),
          },
        ),
        (0, r.O)(n, { assertResponse: a })
      );
    }
  }
  e.s(["f", 0, n]);
};
