// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(984086),
    o = r.getBCHDigit(1335);
  i.getEncodedBits = function (t, e) {
    let i = (t.bit << 3) | e,
      n = i << 10;
    for (; r.getBCHDigit(n) - o >= 0; ) n ^= 1335 << (r.getBCHDigit(n) - o);
    return ((i << 10) | n) ^ 21522;
  };
};
