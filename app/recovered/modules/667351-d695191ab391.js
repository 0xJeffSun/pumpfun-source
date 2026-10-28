// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(411792),
    n = e.i(213090),
    r = e.i(401169),
    i = e.i(858042),
    a = e.i(703114);
  function s(e) {
    if (e && 0 !== e.length)
      return e.reduce((e, { slot: t, value: r }) => {
        if (66 !== t.length)
          throw new n.i({ size: t.length, targetSize: 66, type: "hex" });
        if (66 !== r.length)
          throw new n.i({ size: r.length, targetSize: 66, type: "hex" });
        return ((e[t] = r), e);
      }, {});
  }
  e.s([
    "f",
    0,
    function (e) {
      if (!e) return;
      let n = {};
      for (let { address: o, ...f } of e) {
        if (!(0, i.f)(o, { strict: !1 })) throw new t.f({ address: o });
        if (n[o]) throw new r.n({ address: o });
        n[o] = (function (e) {
          let { balance: t, nonce: n, state: i, stateDiff: o, code: f } = e,
            c = {};
          if (
            (void 0 !== f && (c.code = f),
            void 0 !== t && (c.balance = (0, a.N)(t)),
            void 0 !== n && (c.nonce = (0, a.N)(n)),
            void 0 !== i && (c.state = s(i)),
            void 0 !== o)
          ) {
            if (c.state) throw new r._();
            c.stateDiff = s(o);
          }
          return c;
        })(f);
      }
      return n;
    },
  ]);
};
