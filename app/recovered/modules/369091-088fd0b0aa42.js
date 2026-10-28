// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  let i = (0, r.createContext)({
      ipfsPrefix: "https://ipfs.io/ipfs/",
      findIpfsPrefix: () => {},
    }),
    a = "https://pump.mypinata.cloud/ipfs/";
  function o(e) {
    return e.json();
  }
  function s(e) {
    return e.json();
  }
  e.s([
    "IpfsPrefixProvider",
    0,
    (e) => {
      let l,
        u,
        c,
        d,
        f,
        h = (0, n.c)(8),
        { children: p } = e,
        [m, g] = (0, r.useState)(a);
      h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = async () => {
            let e = [
              "https://pump.mypinata.cloud/ipfs/",
              "https://ipfs.io/ipfs/",
              "https://gateway.pinata.cloud/ipfs/",
            ];
            await fetch(`${a}QmXeG5tTjC63hjTF7a4GcUyetE6yPcsR4rBzX7wb8mmpzg`)
              .then(o)
              .then(() => {
                g(a);
              })
              .catch((t) => {
                (console.error(t),
                  e.forEach(async (e) => {
                    let t = await fetch(
                      `${e}QmXeG5tTjC63hjTF7a4GcUyetE6yPcsR4rBzX7wb8mmpzg`,
                    ).then(s);
                    t?.name && g((t) => (t !== a ? t : e));
                  }));
              });
          }),
          (h[0] = l))
        : (l = h[0]);
      let y = l;
      return (
        h[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => {
              y();
            }),
            (c = []),
            (h[1] = u),
            (h[2] = c))
          : ((u = h[1]), (c = h[2])),
        (0, r.useEffect)(u, c),
        h[3] !== m
          ? ((d = { ipfsPrefix: m, findIpfsPrefix: y }), (h[3] = m), (h[4] = d))
          : (d = h[4]),
        h[5] !== p || h[6] !== d
          ? ((f = (0, t.jsx)(i.Provider, { value: d, children: p })),
            (h[5] = p),
            (h[6] = d),
            (h[7] = f))
          : (f = h[7]),
        f
      );
    },
    "useIpfsPrefix",
    0,
    () => (0, r.useContext)(i),
  ]);
};
