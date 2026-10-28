// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t =
    "object" == typeof globalThis && "crypto" in globalThis
      ? globalThis.crypto
      : void 0;
  function n(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function r(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function i(e, ...t) {
    if (!n(e)) throw Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  let o =
      68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0]
        ? (e) => e
        : function (e) {
            for (let n = 0; n < e.length; n++) {
              var t;
              e[n] =
                (((t = e[n]) << 24) & 0xff000000) |
                ((t << 8) & 0xff0000) |
                ((t >>> 8) & 65280) |
                ((t >>> 24) & 255);
            }
            return e;
          },
    s =
      "function" == typeof Uint8Array.from([]).toHex &&
      "function" == typeof Uint8Array.fromHex,
    a = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function l(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function u(e) {
    if ("string" != typeof e) throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(e));
  }
  function c(e) {
    return ("string" == typeof e && (e = u(e)), i(e), e);
  }
  e.s(
    [
      "B",
      0,
      class {},
      "C",
      0,
      i,
      "s",
      0,
      function (e, t = !0) {
        if (e.destroyed) throw Error("Hash instance has been destroyed");
        if (t && e.finished)
          throw Error("Hash#digest() has already been called");
      },
      "v",
      0,
      function (e) {
        if ("function" != typeof e || "function" != typeof e.create)
          throw Error("Hash should be wrapped by utils.createHasher");
        (r(e.outputLen), r(e.blockLen));
      },
      "N",
      0,
      r,
      "W",
      0,
      function (e, t) {
        i(e);
        let n = t.outputLen;
        if (e.length < n)
          throw Error(
            "digestInto() expects output buffer of length at least " + n,
          );
      },
      "w",
      0,
      function (e) {
        if ((i(e), s)) return e.toHex();
        let t = "";
        for (let n = 0; n < e.length; n++) t += a[e[n]];
        return t;
      },
      "d",
      0,
      function (e, t) {
        if (void 0 !== t && "[object Object]" !== {}.toString.call(t))
          throw Error("options should be object or undefined");
        return Object.assign(e, t);
      },
      "f",
      0,
      function (...e) {
        for (let t = 0; t < e.length; t++) e[t].fill(0);
      },
      "t",
      0,
      function (...e) {
        let t = 0;
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          (i(r), (t += r.length));
        }
        let n = new Uint8Array(t);
        for (let t = 0, r = 0; t < e.length; t++) {
          let i = e[t];
          (n.set(i, r), (r += i.length));
        }
        return n;
      },
      "O",
      0,
      function (e) {
        let t = (t) => e().update(c(t)).digest(),
          n = e();
        return (
          (t.outputLen = n.outputLen),
          (t.blockLen = n.blockLen),
          (t.create = () => e()),
          t
        );
      },
      "y",
      0,
      function (e) {
        return new DataView(e.buffer, e.byteOffset, e.byteLength);
      },
      "i",
      0,
      function (e) {
        let t = (t, n) => e(n).update(c(t)).digest(),
          n = e({});
        return (
          (t.outputLen = n.outputLen),
          (t.blockLen = n.blockLen),
          (t.create = (t) => e(t)),
          t
        );
      },
      "X",
      0,
      function (e) {
        if ("string" != typeof e)
          throw Error("hex string expected, got " + typeof e);
        if (s) return Uint8Array.fromHex(e);
        let t = e.length,
          n = t / 2;
        if (t % 2)
          throw Error("hex string expected, got unpadded hex of length " + t);
        let r = new Uint8Array(n);
        for (let t = 0, i = 0; t < n; t++, i += 2) {
          let n = l(e.charCodeAt(i)),
            o = l(e.charCodeAt(i + 1));
          if (void 0 === n || void 0 === o)
            throw Error(
              'hex string expected, got non-hex character "' +
                (e[i] + e[i + 1]) +
                '" at index ' +
                i,
            );
          r[t] = 16 * n + o;
        }
        return r;
      },
      "g",
      0,
      n,
      "R",
      0,
      function (e) {
        return ("string" == typeof e && (e = u(e)), i(e), e);
      },
      "a",
      0,
      function (e = 32) {
        if (t && "function" == typeof t.getRandomValues)
          return t.getRandomValues(new Uint8Array(e));
        if (t && "function" == typeof t.randomBytes)
          return Uint8Array.from(t.randomBytes(e));
        throw Error("crypto.getRandomValues must be defined");
      },
      "h",
      0,
      function (e, t) {
        return (e << t) | ((e >>> (32 - t)) >>> 0);
      },
      "M",
      0,
      function (e, t) {
        return (e << (32 - t)) | (e >>> t);
      },
      "o",
      0,
      o,
      "D",
      0,
      c,
      "b",
      0,
      function (e) {
        return new Uint32Array(
          e.buffer,
          e.byteOffset,
          Math.floor(e.byteLength / 4),
        );
      },
      "k",
      0,
      u,
    ],
    944445,
  );
};
