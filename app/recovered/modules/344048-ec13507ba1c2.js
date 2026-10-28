// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (function (e) {
    if (e.length >= 255) throw TypeError("Alphabet too long");
    let t = new Uint8Array(256);
    for (let e = 0; e < t.length; e++) t[e] = 255;
    for (let n = 0; n < e.length; n++) {
      let r = e.charAt(n),
        i = r.charCodeAt(0);
      if (255 !== t[i]) throw TypeError(r + " is ambiguous");
      t[i] = n;
    }
    let n = e.length,
      r = e.charAt(0),
      i = Math.log(n) / Math.log(256),
      o = Math.log(256) / Math.log(n);
    function s(e) {
      if ("string" != typeof e) throw TypeError("Expected String");
      if (0 === e.length) return new Uint8Array();
      let o = 0,
        s = 0,
        l = 0;
      for (; e[o] === r; ) (s++, o++);
      let a = ((e.length - o) * i + 1) >>> 0,
        u = new Uint8Array(a);
      for (; o < e.length; ) {
        let r = e.charCodeAt(o);
        if (r > 255) return;
        let i = t[r];
        if (255 === i) return;
        let s = 0;
        for (let e = a - 1; (0 !== i || s < l) && -1 !== e; e--, s++)
          ((i += (n * u[e]) >>> 0),
            (u[e] = i % 256 >>> 0),
            (i = (i / 256) >>> 0));
        if (0 !== i) throw Error("Non-zero carry");
        ((l = s), o++);
      }
      let d = a - l;
      for (; d !== a && 0 === u[d]; ) d++;
      let c = new Uint8Array(s + (a - d)),
        f = s;
      for (; d !== a; ) c[f++] = u[d++];
      return c;
    }
    return {
      encode: function (t) {
        if (
          (t instanceof Uint8Array ||
            (ArrayBuffer.isView(t)
              ? (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
              : Array.isArray(t) && (t = Uint8Array.from(t))),
          !(t instanceof Uint8Array))
        )
          throw TypeError("Expected Uint8Array");
        if (0 === t.length) return "";
        let i = 0,
          s = 0,
          l = 0,
          a = t.length;
        for (; l !== a && 0 === t[l]; ) (l++, i++);
        let u = ((a - l) * o + 1) >>> 0,
          d = new Uint8Array(u);
        for (; l !== a; ) {
          let e = t[l],
            r = 0;
          for (let t = u - 1; (0 !== e || r < s) && -1 !== t; t--, r++)
            ((e += (256 * d[t]) >>> 0),
              (d[t] = e % n >>> 0),
              (e = (e / n) >>> 0));
          if (0 !== e) throw Error("Non-zero carry");
          ((s = r), l++);
        }
        let c = u - s;
        for (; c !== u && 0 === d[c]; ) c++;
        let f = r.repeat(i);
        for (; c < u; ++c) f += e.charAt(d[c]);
        return f;
      },
      decodeUnsafe: s,
      decode: function (e) {
        let t = s(e);
        if (t) return t;
        throw Error("Non-base" + n + " character");
      },
    };
  })("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  e.s(["f", 0, t], 344048);
};
