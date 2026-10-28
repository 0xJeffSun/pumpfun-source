// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974),
    r = e.i(815727);
  e.s(
    [
      "f",
      0,
      function (e) {
        if (!(e instanceof t.f)) return !1;
        let n = e.walk((e) => e instanceof r.P);
        return (
          n instanceof r.P &&
          (n.data?.errorName === "HttpError" ||
            n.data?.errorName === "ResolverError" ||
            n.data?.errorName === "ResolverNotContract" ||
            n.data?.errorName === "ResolverNotFound" ||
            n.data?.errorName === "ReverseAddressMismatch" ||
            n.data?.errorName === "UnsupportedResolverProfile")
        );
      },
    ],
    425817,
  );
  var n = e.i(850697),
    i = e.i(67223),
    a = e.i(703114),
    s = e.i(772488),
    o = e.i(520417);
  function u(e) {
    if (66 !== e.length || 0 !== e.indexOf("[") || 65 !== e.indexOf("]"))
      return null;
    let t = `0x${e.slice(1, 65)}`;
    return (0, o.f)(t) ? t : null;
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        let t = new Uint8Array(32).fill(0);
        if (!e) return (0, a.v)(t);
        let r = e.split(".");
        for (let e = r.length - 1; e >= 0; e -= 1) {
          let a = u(r[e]),
            o = a ? (0, i.D)(a) : (0, s.f)((0, i.T)(r[e]), "bytes");
          t = (0, s.f)((0, n.w)([t, o]), "bytes");
        }
        return (0, a.v)(t);
      },
    ],
    897781,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t = e.replace(/^\.|\.$/gm, "");
          if (0 === t.length) return new Uint8Array(1);
          let r = new Uint8Array((0, i.T)(t).byteLength + 2),
            n = 0,
            o = t.split(".");
          for (let e = 0; e < o.length; e++) {
            var l;
            let t = (0, i.T)(o[e]);
            (t.byteLength > 255 &&
              (t = (0, i.T)(
                ((l = (function (e) {
                  let t = new Uint8Array(32).fill(0);
                  return e ? u(e) || (0, s.f)((0, i.T)(e)) : (0, a.v)(t);
                })(o[e])),
                `[${l.slice(2)}]`),
              )),
              (r[n] = t.length),
              r.set(t, n + 1),
              (n += t.length + 1));
          }
          return r.byteLength !== n + 1 ? r.slice(0, n + 1) : r;
        },
      ],
      812008,
    ));
};
