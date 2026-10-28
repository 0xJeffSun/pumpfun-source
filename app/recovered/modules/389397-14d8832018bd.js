// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = { wei: 0, gwei: 9, szabo: 12, finney: 15, ether: 18 };
  function n(e, t = 0) {
    if (!Number.isInteger(t) || t < 0) throw new a({ decimals: t });
    let r = e.toString(),
      i = r.startsWith("-");
    i && (r = r.slice(1));
    let [s, o] = [
      (r = r.padStart(t, "0")).slice(0, r.length - t),
      r.slice(r.length - t),
    ];
    return (
      (o = o.replace(/(0+)$/, "")),
      `${i ? "-" : ""}${s || "0"}${o ? `.${o}` : ""}`
    );
  }
  function r(e, t = 0) {
    if (!Number.isInteger(t) || t < 0) throw new a({ decimals: t });
    if (!/^-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(e))
      throw new i({ value: e });
    let [n = "", s = "0"] = e.split("."),
      o = n.startsWith("-");
    if (
      (o && (n = n.slice(1)),
      "" === n && (n = "0"),
      (s = s.replace(/(0+)$/, "")),
      0 === t)
    )
      (s.length > 0 &&
        Number.parseInt(s[0], 10) >= 5 &&
        (n = `${BigInt(n) + 1n}`),
        (s = ""));
    else if (s.length > t) {
      let e = s.slice(0, t);
      if (Number.parseInt(s.slice(t, t + 1), 10) >= 5) {
        let r = (function (e) {
          let t = e.split(""),
            n = t.length - 1;
          for (; n >= 0; ) {
            let e = Number.parseInt(t[n], 10) + 1;
            if (e < 10) return ((t[n] = String(e)), t.join(""));
            ((t[n] = "0"), n--);
          }
          return `1${t.join("")}`;
        })(e);
        r.length > t ? ((s = r.slice(1)), (n = `${BigInt(n) + 1n}`)) : (s = r);
      } else s = e;
    } else s = s.padEnd(t, "0");
    return BigInt(`${o ? "-" : ""}${n}${s}`);
  }
  class i extends Error {
    constructor({ value: e }) {
      (super(`Value \`${e}\` is not a valid decimal number.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Value.InvalidDecimalNumberError",
        }));
    }
  }
  class a extends Error {
    constructor({ decimals: e }) {
      (super(`\`decimals\` must be a non-negative integer. Got \`${e}\`.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Value.InvalidDecimalsError",
        }));
    }
  }
  e.s([
    "R",
    0,
    n,
    "i",
    0,
    function (e, r = "wei") {
      return n(e, t.ether - t[r]);
    },
    "C",
    0,
    function (e, r = "wei") {
      return n(e, t.gwei - t[r]);
    },
    "f",
    0,
    r,
    "L",
    0,
    function (e, n = "wei") {
      return r(e, t.ether - t[n]);
    },
  ]);
};
