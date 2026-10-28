// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  i.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  ((i.isValid = function (t) {
    return null != t && "" !== t && !isNaN(t) && t >= 0 && t <= 7;
  }),
    (i.from = function (t) {
      return i.isValid(t) ? parseInt(t, 10) : void 0;
    }),
    (i.getPenaltyN1 = function (t) {
      let e = t.size,
        i = 0,
        r = 0,
        o = 0,
        n = null,
        a = null;
      for (let s = 0; s < e; s++) {
        ((r = o = 0), (n = a = null));
        for (let l = 0; l < e; l++) {
          let e = t.get(s, l);
          (e === n ? r++ : (r >= 5 && (i += 3 + (r - 5)), (n = e), (r = 1)),
            (e = t.get(l, s)) === a
              ? o++
              : (o >= 5 && (i += 3 + (o - 5)), (a = e), (o = 1)));
        }
        (r >= 5 && (i += 3 + (r - 5)), o >= 5 && (i += 3 + (o - 5)));
      }
      return i;
    }),
    (i.getPenaltyN2 = function (t) {
      let e = t.size,
        i = 0;
      for (let r = 0; r < e - 1; r++)
        for (let o = 0; o < e - 1; o++) {
          let e =
            t.get(r, o) +
            t.get(r, o + 1) +
            t.get(r + 1, o) +
            t.get(r + 1, o + 1);
          (4 === e || 0 === e) && i++;
        }
      return 3 * i;
    }),
    (i.getPenaltyN3 = function (t) {
      let e = t.size,
        i = 0,
        r = 0,
        o = 0;
      for (let n = 0; n < e; n++) {
        r = o = 0;
        for (let a = 0; a < e; a++)
          ((r = ((r << 1) & 2047) | t.get(n, a)),
            a >= 10 && (1488 === r || 93 === r) && i++,
            (o = ((o << 1) & 2047) | t.get(a, n)),
            a >= 10 && (1488 === o || 93 === o) && i++);
      }
      return 40 * i;
    }),
    (i.getPenaltyN4 = function (t) {
      let e = 0,
        i = t.data.length;
      for (let r = 0; r < i; r++) e += t.data[r];
      return 10 * Math.abs(Math.ceil((100 * e) / i / 5) - 10);
    }),
    (i.applyMask = function (t, e) {
      let r = e.size;
      for (let o = 0; o < r; o++)
        for (let n = 0; n < r; n++)
          e.isReserved(n, o) ||
            e.xor(
              n,
              o,
              (function (t, e, r) {
                switch (t) {
                  case i.Patterns.PATTERN000:
                    return (e + r) % 2 == 0;
                  case i.Patterns.PATTERN001:
                    return e % 2 == 0;
                  case i.Patterns.PATTERN010:
                    return r % 3 == 0;
                  case i.Patterns.PATTERN011:
                    return (e + r) % 3 == 0;
                  case i.Patterns.PATTERN100:
                    return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                  case i.Patterns.PATTERN101:
                    return ((e * r) % 2) + ((e * r) % 3) == 0;
                  case i.Patterns.PATTERN110:
                    return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
                  case i.Patterns.PATTERN111:
                    return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
                  default:
                    throw Error("bad maskPattern:" + t);
                }
              })(t, n, o),
            );
    }),
    (i.getBestMask = function (t, e) {
      let r = Object.keys(i.Patterns).length,
        o = 0,
        n = 1 / 0;
      for (let a = 0; a < r; a++) {
        (e(a), i.applyMask(a, t));
        let r =
          i.getPenaltyN1(t) +
          i.getPenaltyN2(t) +
          i.getPenaltyN3(t) +
          i.getPenaltyN4(t);
        (i.applyMask(a, t), r < n && ((n = r), (o = a)));
      }
      return o;
    }));
};
