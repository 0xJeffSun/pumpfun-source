// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  function n(e) {
    return (0x100000000 + e).toString(16).substring(1);
  }
  t.exports = {
    normalizeInput: function (e) {
      let t;
      if (e instanceof Uint8Array) t = e;
      else if ("string" == typeof e) t = new TextEncoder().encode(e);
      else throw Error("Input must be an string, Buffer or Uint8Array");
      return t;
    },
    toHex: function (e) {
      return Array.prototype.map
        .call(e, function (e) {
          return (e < 16 ? "0" : "") + e.toString(16);
        })
        .join("");
    },
    debugPrint: function (e, t, r) {
      let i = "\n" + e + " = ";
      for (let s = 0; s < t.length; s += 2) {
        if (32 === r)
          ((i += n(t[s]).toUpperCase()),
            (i += " "),
            (i += n(t[s + 1]).toUpperCase()));
        else if (64 === r)
          ((i += n(t[s + 1]).toUpperCase()), (i += n(t[s]).toUpperCase()));
        else throw Error("Invalid size " + r);
        s % 6 == 4
          ? (i += "\n" + Array(e.length + 4).join(" "))
          : s < t.length - 2 && (i += " ");
      }
      console.log(i);
    },
    testSpeed: function (e, t, r) {
      let n = new Date().getTime(),
        i = new Uint8Array(t);
      for (let e = 0; e < t; e++) i[e] = e % 256;
      let s = new Date().getTime();
      (console.log("Generated random input in " + (s - n) + "ms"), (n = s));
      for (let s = 0; s < r; s++) {
        let r = e(i),
          s = new Date().getTime(),
          o = s - n;
        ((n = s),
          console.log("Hashed in " + o + "ms: " + r.substring(0, 20) + "..."),
          console.log(
            Math.round((t / 1048576 / (o / 1e3)) * 100) / 100 +
              " MB PER SECOND",
          ));
      }
    },
  };
};
