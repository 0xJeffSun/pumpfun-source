// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(146695),
    r = e.i(426091);
  e.s([
    "f",
    0,
    (e) => {
      let n = (({ address: e, user: n }) => {
        if (!n?.username || !0 !== n.is_pump_user || !0 === n.is_banned)
          return null;
        let { username: i } = n;
        return i.length > 20 ||
          !(0, t.C)(i) ||
          (0, r.Z)({ address: e, username: i })
          ? null
          : i;
      })(e);
      return n
        ? (0, t.d)(e.address ?? "", n)
        : (0, t.$)({ address: e.address, userId: e.userId });
    },
  ]);
};
