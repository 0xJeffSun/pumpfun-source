// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e =
    "object" == typeof globalThis && "crypto" in globalThis
      ? globalThis.crypto
      : void 0;
  function n(t) {
    return (
      t instanceof Uint8Array ||
      (ArrayBuffer.isView(t) && "Uint8Array" === t.constructor.name)
    );
  }
  function i(t) {
    if (!Number.isSafeInteger(t) || t < 0)
      throw Error("positive integer expected, got " + t);
  }
  function s(t, ...e) {
    if (!n(t)) throw Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length))
      throw Error(
        "Uint8Array expected of length " + e + ", got length=" + t.length,
      );
  }
  let r =
      68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0]
        ? (t) => t
        : function (t) {
            for (let n = 0; n < t.length; n++) {
              var e;
              t[n] =
                (((e = t[n]) << 24) & 0xff000000) |
                ((e << 8) & 0xff0000) |
                ((e >>> 8) & 65280) |
                ((e >>> 24) & 255);
            }
            return t;
          },
    o =
      "function" == typeof Uint8Array.from([]).toHex &&
      "function" == typeof Uint8Array.fromHex,
    a = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
  function u(t) {
    return t >= 48 && t <= 57
      ? t - 48
      : t >= 65 && t <= 70
        ? t - 55
        : t >= 97 && t <= 102
          ? t - 87
          : void 0;
  }
  function p(t) {
    if ("string" != typeof t) throw Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t));
  }
  function l(t) {
    return ("string" == typeof t && (t = p(t)), s(t), t);
  }
  t.s(
    [
      "B",
      0,
      class {},
      "C",
      0,
      s,
      "s",
      0,
      function (t, e = !0) {
        if (t.destroyed) throw Error("Hash instance has been destroyed");
        if (e && t.finished)
          throw Error("Hash#digest() has already been called");
      },
      "v",
      0,
      function (t) {
        if ("function" != typeof t || "function" != typeof t.create)
          throw Error("Hash should be wrapped by utils.createHasher");
        (i(t.outputLen), i(t.blockLen));
      },
      "N",
      0,
      i,
      "W",
      0,
      function (t, e) {
        s(t);
        let n = e.outputLen;
        if (t.length < n)
          throw Error(
            "digestInto() expects output buffer of length at least " + n,
          );
      },
      "w",
      0,
      function (t) {
        if ((s(t), o)) return t.toHex();
        let e = "";
        for (let n = 0; n < t.length; n++) e += a[t[n]];
        return e;
      },
      "d",
      0,
      function (t, e) {
        if (void 0 !== e && "[object Object]" !== {}.toString.call(e))
          throw Error("options should be object or undefined");
        return Object.assign(t, e);
      },
      "f",
      0,
      function (...t) {
        for (let e = 0; e < t.length; e++) t[e].fill(0);
      },
      "t",
      0,
      function (...t) {
        let e = 0;
        for (let n = 0; n < t.length; n++) {
          let i = t[n];
          (s(i), (e += i.length));
        }
        let n = new Uint8Array(e);
        for (let e = 0, i = 0; e < t.length; e++) {
          let s = t[e];
          (n.set(s, i), (i += s.length));
        }
        return n;
      },
      "O",
      0,
      function (t) {
        let e = (e) => t().update(l(e)).digest(),
          n = t();
        return (
          (e.outputLen = n.outputLen),
          (e.blockLen = n.blockLen),
          (e.create = () => t()),
          e
        );
      },
      "y",
      0,
      function (t) {
        return new DataView(t.buffer, t.byteOffset, t.byteLength);
      },
      "i",
      0,
      function (t) {
        let e = (e, n) => t(n).update(l(e)).digest(),
          n = t({});
        return (
          (e.outputLen = n.outputLen),
          (e.blockLen = n.blockLen),
          (e.create = (e) => t(e)),
          e
        );
      },
      "X",
      0,
      function (t) {
        if ("string" != typeof t)
          throw Error("hex string expected, got " + typeof t);
        if (o) return Uint8Array.fromHex(t);
        let e = t.length,
          n = e / 2;
        if (e % 2)
          throw Error("hex string expected, got unpadded hex of length " + e);
        let i = new Uint8Array(n);
        for (let e = 0, s = 0; e < n; e++, s += 2) {
          let n = u(t.charCodeAt(s)),
            r = u(t.charCodeAt(s + 1));
          if (void 0 === n || void 0 === r)
            throw Error(
              'hex string expected, got non-hex character "' +
                (t[s] + t[s + 1]) +
                '" at index ' +
                s,
            );
          i[e] = 16 * n + r;
        }
        return i;
      },
      "g",
      0,
      n,
      "R",
      0,
      function (t) {
        return ("string" == typeof t && (t = p(t)), s(t), t);
      },
      "a",
      0,
      function (t = 32) {
        if (e && "function" == typeof e.getRandomValues)
          return e.getRandomValues(new Uint8Array(t));
        if (e && "function" == typeof e.randomBytes)
          return Uint8Array.from(e.randomBytes(t));
        throw Error("crypto.getRandomValues must be defined");
      },
      "h",
      0,
      function (t, e) {
        return (t << e) | ((t >>> (32 - e)) >>> 0);
      },
      "M",
      0,
      function (t, e) {
        return (t << (32 - e)) | (t >>> e);
      },
      "o",
      0,
      r,
      "D",
      0,
      l,
      "b",
      0,
      function (t) {
        return new Uint32Array(
          t.buffer,
          t.byteOffset,
          Math.floor(t.byteLength / 4),
        );
      },
      "k",
      0,
      p,
    ],
    944445,
  );
};
