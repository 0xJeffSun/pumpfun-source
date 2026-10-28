// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  function r(e, n) {
    if ((({ lo: e, hi: n } = { lo: e >>> 0, hi: n >>> 0 }), n <= 2097151))
      return String(0x100000000 * n + e);
    let t = 0xffffff & e,
      r = ((e >>> 24) | (n << 8)) & 0xffffff,
      o = (n >> 16) & 65535,
      a = t + 6777216 * r + 6710656 * o,
      i = r + 8147497 * o,
      m = 2 * o;
    return (
      a >= 1e7 && ((i += Math.floor(a / 1e7)), (a %= 1e7)),
      i >= 1e7 && ((m += Math.floor(i / 1e7)), (i %= 1e7)),
      m.toString() + s(i) + s(a)
    );
  }
  function o(e, n) {
    return { lo: 0 | e, hi: 0 | n };
  }
  function a(e, n) {
    return ((n = ~n), e ? (e = ~e + 1) : (n += 1), o(e, n));
  }
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.varint32read =
      t.varint32write =
      t.uInt64ToString =
      t.int64ToString =
      t.int64FromString =
      t.varint64write =
      t.varint64read =
        void 0),
    (t.varint64read = function () {
      let e = 0,
        n = 0;
      for (let t = 0; t < 28; t += 7) {
        let r = this.buf[this.pos++];
        if (((e |= (127 & r) << t), (128 & r) == 0))
          return (this.assertBounds(), [e, n]);
      }
      let t = this.buf[this.pos++];
      if (((e |= (15 & t) << 28), (n = (112 & t) >> 4), (128 & t) == 0))
        return (this.assertBounds(), [e, n]);
      for (let t = 3; t <= 31; t += 7) {
        let r = this.buf[this.pos++];
        if (((n |= (127 & r) << t), (128 & r) == 0))
          return (this.assertBounds(), [e, n]);
      }
      throw Error("invalid varint");
    }),
    (t.varint64write = function (e, n, t) {
      for (let r = 0; r < 28; r += 7) {
        let o = e >>> r,
          a = o >>> 7 != 0 || 0 != n,
          s = (a ? 128 | o : o) & 255;
        if ((t.push(s), !a)) return;
      }
      let r = ((e >>> 28) & 15) | ((7 & n) << 4),
        o = n >> 3 != 0;
      if ((t.push((o ? 128 | r : r) & 255), o)) {
        for (let e = 3; e < 31; e += 7) {
          let r = n >>> e,
            o = r >>> 7 != 0,
            a = (o ? 128 | r : r) & 255;
          if ((t.push(a), !o)) return;
        }
        t.push((n >>> 31) & 1);
      }
    }),
    (t.int64FromString = function (e) {
      let n = "-" === e[0];
      n && (e = e.slice(1));
      let t = 0,
        r = 0;
      function s(n, o) {
        let a = Number(e.slice(n, o));
        ((r *= 1e6),
          (t = 1e6 * t + a) >= 0x100000000 &&
            ((r += (t / 0x100000000) | 0), (t %= 0x100000000)));
      }
      return (
        s(-24, -18),
        s(-18, -12),
        s(-12, -6),
        s(-6),
        n ? a(t, r) : o(t, r)
      );
    }),
    (t.int64ToString = function (e, n) {
      let t = o(e, n),
        s = 0x80000000 & t.hi;
      s && (t = a(t.lo, t.hi));
      let i = r(t.lo, t.hi);
      return s ? "-" + i : i;
    }),
    (t.uInt64ToString = r));
  let s = (e) => {
    let n = String(e);
    return "0000000".slice(n.length) + n;
  };
  ((t.varint32write = function (e, n) {
    if (e >= 0) {
      for (; e > 127; ) (n.push((127 & e) | 128), (e >>>= 7));
      n.push(e);
    } else {
      for (let t = 0; t < 9; t++) (n.push((127 & e) | 128), (e >>= 7));
      n.push(1);
    }
  }),
    (t.varint32read = function () {
      let e = this.buf[this.pos++],
        n = 127 & e;
      if (
        (128 & e) == 0 ||
        ((n |= (127 & (e = this.buf[this.pos++])) << 7), (128 & e) == 0) ||
        ((n |= (127 & (e = this.buf[this.pos++])) << 14), (128 & e) == 0) ||
        ((n |= (127 & (e = this.buf[this.pos++])) << 21), (128 & e) == 0)
      )
        return (this.assertBounds(), n);
      n |= (15 & (e = this.buf[this.pos++])) << 28;
      for (let n = 5; (128 & e) != 0 && n < 10; n++) e = this.buf[this.pos++];
      if ((128 & e) != 0) throw Error("invalid varint");
      return (this.assertBounds(), n >>> 0);
    }));
};
