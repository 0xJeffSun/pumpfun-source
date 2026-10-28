// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(322315),
    n = e.i(254010),
    r = e.i(646908);
  let i = {
      megaeth: { evmChainId: 4326, flag: t.D.WEB_MEGAETH_CHAIN },
      xlayer: { evmChainId: 196, flag: t.D.WEB_XLAYER_CHAIN },
      ton: { evmChainId: null, caip2: r.J, flag: t.D.WEB_TON_CHAIN },
      polygon: { evmChainId: 137, flag: t.D.WEB_POLYGON_CHAIN },
      near: { evmChainId: null, caip2: r.d, flag: t.D.WEB_NEAR_CHAIN },
      starknet: { evmChainId: null, caip2: r.W, flag: t.D.WEB_STARKNET_CHAIN },
      arbitrum: { evmChainId: 42161, flag: t.D.WEB_ARBITRUM_CHAIN },
    },
    o = {
      megaeth: !1,
      xlayer: !1,
      ton: !1,
      polygon: !1,
      near: !1,
      starknet: !1,
      arbitrum: !1,
    },
    s = new Map(
      Object.entries(i).flatMap(([e, t]) =>
        null === t.evmChainId ? [] : [[t.evmChainId, e]],
      ),
    ),
    a = (e, t) => {
      let n = s.get(e);
      return void 0 === n || !0 === t[n];
    },
    l = Array.from({ length: 128 }, (e, t) =>
      0 === t
        ? o
        : {
            megaeth: (1 & t) != 0,
            xlayer: (2 & t) != 0,
            ton: (4 & t) != 0,
            polygon: (8 & t) != 0,
            near: (16 & t) != 0,
            starknet: (32 & t) != 0,
            arbitrum: (64 & t) != 0,
          },
    );
  e.s([
    "D",
    0,
    42161,
    "q",
    0,
    o,
    "E",
    0,
    i,
    "g",
    0,
    4326,
    "j",
    0,
    137,
    "h",
    0,
    196,
    "T",
    0,
    (e) => (e === r.d || e === r.W ? e : void 0),
    "m",
    0,
    (e, t) => {
      if (e === i.ton.caip2) return !0 === t.ton;
      if (e === i.near.caip2) return !0 === t.near;
      if (e === i.starknet.caip2) return !0 === t.starknet;
      let n = e.startsWith("eip155:") ? Number(e.slice(7)) : 0 / 0;
      return Number.isNaN(n) || a(n, t);
    },
    "F",
    0,
    (e, t) => !(e in i) || !0 === (t ?? o)[e],
    "b",
    0,
    a,
    "M",
    0,
    (e) => !0 === e.near,
    "k",
    0,
    (e) => !0 === e.starknet,
    "l",
    0,
    () =>
      l[
        !!(0, n.k)(i.megaeth.flag, !1) |
          (2 * !!(0, n.k)(i.xlayer.flag, !1)) |
          (4 * !!(0, n.k)(i.ton.flag, !1)) |
          (8 * !!(0, n.k)(i.polygon.flag, !1)) |
          (16 * !!(0, n.k)(i.near.flag, !1)) |
          (32 * !!(0, n.k)(i.starknet.flag, !1)) |
          (64 * !!(0, n.k)(i.arbitrum.flag, !1))
      ],
  ]);
};
