// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  r.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  ((r.isValid = function (t) {
    return null != t && "" !== t && !isNaN(t) && t >= 0 && t <= 7;
  }),
    (r.from = function (t) {
      return r.isValid(t) ? parseInt(t, 10) : void 0;
    }),
    (r.getPenaltyN1 = function (t) {
      let e = t.size,
        r = 0,
        n = 0,
        o = 0,
        i = null,
        a = null;
      for (let l = 0; l < e; l++) {
        ((n = o = 0), (i = a = null));
        for (let s = 0; s < e; s++) {
          let e = t.get(l, s);
          (e === i ? n++ : (n >= 5 && (r += 3 + (n - 5)), (i = e), (n = 1)),
            (e = t.get(s, l)) === a
              ? o++
              : (o >= 5 && (r += 3 + (o - 5)), (a = e), (o = 1)));
        }
        (n >= 5 && (r += 3 + (n - 5)), o >= 5 && (r += 3 + (o - 5)));
      }
      return r;
    }),
    (r.getPenaltyN2 = function (t) {
      let e = t.size,
        r = 0;
      for (let n = 0; n < e - 1; n++)
        for (let o = 0; o < e - 1; o++) {
          let e =
            t.get(n, o) +
            t.get(n, o + 1) +
            t.get(n + 1, o) +
            t.get(n + 1, o + 1);
          (4 === e || 0 === e) && r++;
        }
      return 3 * r;
    }),
    (r.getPenaltyN3 = function (t) {
      let e = t.size,
        r = 0,
        n = 0,
        o = 0;
      for (let i = 0; i < e; i++) {
        n = o = 0;
        for (let a = 0; a < e; a++)
          ((n = ((n << 1) & 2047) | t.get(i, a)),
            a >= 10 && (1488 === n || 93 === n) && r++,
            (o = ((o << 1) & 2047) | t.get(a, i)),
            a >= 10 && (1488 === o || 93 === o) && r++);
      }
      return 40 * r;
    }),
    (r.getPenaltyN4 = function (t) {
      let e = 0,
        r = t.data.length;
      for (let n = 0; n < r; n++) e += t.data[n];
      return 10 * Math.abs(Math.ceil((100 * e) / r / 5) - 10);
    }),
    (r.applyMask = function (t, e) {
      let n = e.size;
      for (let o = 0; o < n; o++)
        for (let i = 0; i < n; i++)
          e.isReserved(i, o) ||
            e.xor(
              i,
              o,
              (function (t, e, n) {
                switch (t) {
                  case r.Patterns.PATTERN000:
                    return (e + n) % 2 == 0;
                  case r.Patterns.PATTERN001:
                    return e % 2 == 0;
                  case r.Patterns.PATTERN010:
                    return n % 3 == 0;
                  case r.Patterns.PATTERN011:
                    return (e + n) % 3 == 0;
                  case r.Patterns.PATTERN100:
                    return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0;
                  case r.Patterns.PATTERN101:
                    return ((e * n) % 2) + ((e * n) % 3) == 0;
                  case r.Patterns.PATTERN110:
                    return (((e * n) % 2) + ((e * n) % 3)) % 2 == 0;
                  case r.Patterns.PATTERN111:
                    return (((e * n) % 3) + ((e + n) % 2)) % 2 == 0;
                  default:
                    throw Error("bad maskPattern:" + t);
                }
              })(t, i, o),
            );
    }),
    (r.getBestMask = function (t, e) {
      let n = Object.keys(r.Patterns).length,
        o = 0,
        i = 1 / 0;
      for (let a = 0; a < n; a++) {
        (e(a), r.applyMask(a, t));
        let n =
          r.getPenaltyN1(t) +
          r.getPenaltyN2(t) +
          r.getPenaltyN3(t) +
          r.getPenaltyN4(t);
        (r.applyMask(a, t), n < i && ((i = n), (o = a)));
      }
      return o;
    }));
};
