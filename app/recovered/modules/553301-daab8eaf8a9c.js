// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(683023);
  e.s([
    "U",
    0,
    (e) => (0, t.S)(e),
    "K",
    0,
    ({
      decodedJwt: e,
      privyAuthenticated: t,
      publicKeyAddress: n,
      nowMs: i = Date.now(),
    }) =>
      !t &&
      !!n &&
      (!(e && "string" == typeof e.address && Number.isFinite(e.exp)) ||
        1e3 * e.exp <= i ||
        e.address !== n),
    "O",
    0,
    ({
      decodedJwt: e,
      privyAuthenticated: t,
      previousPublicKeyAddress: n,
      publicKeyAddress: i,
    }) =>
      !t &&
      !!e &&
      "string" == typeof e.address &&
      !!i &&
      n !== i &&
      e.address !== i,
  ]);
};
