// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.encode = function (e) {
      return e.reduce((e, t) => e + t.toString(16).padStart(2, "0"), "0x");
    }),
    (n.decode = function (e) {
      (0 === e.indexOf("0x") && (e = e.substr(2)),
        e.length % 2 == 1 && (e = "0" + e));
      let t = e.match(/.{2}/g);
      return null === t
        ? a.Buffer.from([])
        : a.Buffer.from(t.map((e) => parseInt(e, 16)));
    }));
  let a = e.r(259390);
};
