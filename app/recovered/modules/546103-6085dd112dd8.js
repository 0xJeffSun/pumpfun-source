// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(628151),
    o = n.getBCHDigit(1335);
  r.getEncodedBits = function (t, e) {
    let r = (t.bit << 3) | e,
      i = r << 10;
    for (; n.getBCHDigit(i) - o >= 0; ) i ^= 1335 << (n.getBCHDigit(i) - o);
    return ((r << 10) | i) ^ 21522;
  };
};
