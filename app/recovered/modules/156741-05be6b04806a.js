// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(616800);
  e.s(["f", () => t.I], 156741);
  var r = e.i(584229);
  let n = [/not loaded on (this )?device/i, /embedded wallet not found/i],
    i = /0x[0-9a-fA-F]{40}/g,
    a = {
      unavailable: "web.trade.evm_wallet_unavailable_in_browser",
      masked: "web.trade.evm_wallet_sign_failed_in_browser",
    },
    o = (e) => (e && "object" == typeof e && "cause" in e ? e.cause : void 0),
    s = (e) => 4900 === (0, r.N)(e) || /^Disconnected$/.test((0, r.A)(e)),
    l = (e) => {
      let t = (0, r.A)(e);
      return n.some((e) => e.test(t));
    };
  e.s(
    [
      "Z",
      0,
      function (e) {
        let t = ((e) => {
            let t = [],
              r = e;
            for (let e = 0; e <= 4 && null != r; e++) (t.push(r), (r = o(r)));
            return t;
          })(e),
          n = t.some(l);
        if (n || t.some(s))
          return {
            kind: n ? "unavailable" : "masked",
            cause: ((e) => {
              let t = e.findIndex(s);
              if (-1 === t) return;
              let n = e
                .slice(t + 1)
                .filter((e) => !s(e))
                .map(r.A)
                .find((e) => "" !== e);
              return n?.replace(i, "0x…").slice(0, 300);
            })(t),
          };
      },
      "e",
      0,
      (e, t) => t(a[e.kind]),
    ],
    534710,
  );
};
