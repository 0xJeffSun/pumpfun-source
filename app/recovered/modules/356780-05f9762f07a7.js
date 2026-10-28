// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function r(e, ...t) {
    if (
      !(
        e instanceof Uint8Array ||
        (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
      )
    )
      throw Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  e.s(
    [
      "B",
      0,
      r,
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
          throw Error("Hash should be wrapped by utils.wrapConstructor");
        (t(e.outputLen), t(e.blockLen));
      },
      "N",
      0,
      t,
      "W",
      0,
      function (e, t) {
        r(e);
        let s = t.outputLen;
        if (e.length < s)
          throw Error(
            "digestInto() expects output buffer of length at least " + s,
          );
      },
    ],
    356780,
  );
  let s =
      "object" == typeof globalThis && "crypto" in globalThis
        ? globalThis.crypto
        : void 0,
    n = 68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0];
  function o(e) {
    return (
      "string" == typeof e &&
        (e = (function (e) {
          if ("string" != typeof e)
            throw Error("utf8ToBytes expected string, got " + typeof e);
          return new Uint8Array(new TextEncoder().encode(e));
        })(e)),
      r(e),
      e
    );
  }
  e.s(
    [
      "B",
      0,
      class {
        clone() {
          return this._cloneInto();
        }
      },
      "p",
      0,
      function (e) {
        for (let r = 0; r < e.length; r++) {
          var t;
          e[r] =
            (((t = e[r]) << 24) & 0xff000000) |
            ((t << 8) & 0xff0000) |
            ((t >>> 8) & 65280) |
            ((t >>> 24) & 255);
        }
      },
      "t",
      0,
      function (...e) {
        let t = 0;
        for (let s = 0; s < e.length; s++) {
          let n = e[s];
          (r(n), (t += n.length));
        }
        let s = new Uint8Array(t);
        for (let t = 0, r = 0; t < e.length; t++) {
          let n = e[t];
          (s.set(n, r), (r += n.length));
        }
        return s;
      },
      "y",
      0,
      function (e) {
        return new DataView(e.buffer, e.byteOffset, e.byteLength);
      },
      "o",
      0,
      n,
      "a",
      0,
      function (e = 32) {
        if (s && "function" == typeof s.getRandomValues)
          return s.getRandomValues(new Uint8Array(e));
        if (s && "function" == typeof s.randomBytes) return s.randomBytes(e);
        throw Error("crypto.getRandomValues must be defined");
      },
      "M",
      0,
      function (e, t) {
        return (e << (32 - t)) | (e >>> t);
      },
      "D",
      0,
      o,
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
      function (e) {
        let t = (t) => e().update(o(t)).digest(),
          r = e();
        return (
          (t.outputLen = r.outputLen),
          (t.blockLen = r.blockLen),
          (t.create = () => e()),
          t
        );
      },
      "c",
      0,
      function (e) {
        let t = (t, r) => e(r).update(o(t)).digest(),
          r = e({});
        return (
          (t.outputLen = r.outputLen),
          (t.blockLen = r.blockLen),
          (t.create = (t) => e(t)),
          t
        );
      },
    ],
    8099,
  );
};
