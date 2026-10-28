// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  ((r.read = function (t, e, r, i, n) {
    var s,
      o,
      a = 8 * n - i - 1,
      u = (1 << a) - 1,
      c = u >> 1,
      l = -7,
      h = r ? n - 1 : 0,
      f = r ? -1 : 1,
      d = t[e + h];
    for (
      h += f, s = d & ((1 << -l) - 1), d >>= -l, l += a;
      l > 0;
      s = 256 * s + t[e + h], h += f, l -= 8
    );
    for (
      o = s & ((1 << -l) - 1), s >>= -l, l += i;
      l > 0;
      o = 256 * o + t[e + h], h += f, l -= 8
    );
    if (0 === s) s = 1 - c;
    else {
      if (s === u) return o ? 0 / 0 : (d ? -1 : 1) * 2e308;
      ((o += Math.pow(2, i)), (s -= c));
    }
    return (d ? -1 : 1) * o * Math.pow(2, s - i);
  }),
    (r.write = function (t, e, r, i, n, s) {
      var o,
        a,
        u,
        c = 8 * s - n - 1,
        l = (1 << c) - 1,
        h = l >> 1,
        f = 5960464477539062e-23 * (23 === n),
        d = i ? 0 : s - 1,
        p = i ? 1 : -1,
        g = +(e < 0 || (0 === e && 1 / e < 0));
      for (
        isNaN((e = Math.abs(e))) || 1 / 0 === e
          ? ((a = +!!isNaN(e)), (o = l))
          : ((o = Math.floor(Math.log(e) / Math.LN2)),
            e * (u = Math.pow(2, -o)) < 1 && (o--, (u *= 2)),
            o + h >= 1 ? (e += f / u) : (e += f * Math.pow(2, 1 - h)),
            e * u >= 2 && (o++, (u /= 2)),
            o + h >= l
              ? ((a = 0), (o = l))
              : o + h >= 1
                ? ((a = (e * u - 1) * Math.pow(2, n)), (o += h))
                : ((a = e * Math.pow(2, h - 1) * Math.pow(2, n)), (o = 0)));
        n >= 8;
        t[r + d] = 255 & a, d += p, a /= 256, n -= 8
      );
      for (
        o = (o << n) | a, c += n;
        c > 0;
        t[r + d] = 255 & o, d += p, o /= 256, c -= 8
      );
      t[r + d - p] |= 128 * g;
    }));
};
