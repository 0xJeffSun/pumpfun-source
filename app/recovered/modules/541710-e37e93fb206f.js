// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(322315),
    r = e.i(254010),
    n = e.i(646908);
  let i = {
      megaeth: { evmChainId: 4326, flag: t.D.WEB_MEGAETH_CHAIN },
      xlayer: { evmChainId: 196, flag: t.D.WEB_XLAYER_CHAIN },
      ton: { evmChainId: null, caip2: n.J, flag: t.D.WEB_TON_CHAIN },
      polygon: { evmChainId: 137, flag: t.D.WEB_POLYGON_CHAIN },
      near: { evmChainId: null, caip2: n.d, flag: t.D.WEB_NEAR_CHAIN },
      starknet: { evmChainId: null, caip2: n.W, flag: t.D.WEB_STARKNET_CHAIN },
      arbitrum: { evmChainId: 42161, flag: t.D.WEB_ARBITRUM_CHAIN },
    },
    a = {
      megaeth: !1,
      xlayer: !1,
      ton: !1,
      polygon: !1,
      near: !1,
      starknet: !1,
      arbitrum: !1,
    },
    l = new Map(
      Object.entries(i).flatMap(([e, t]) =>
        null === t.evmChainId ? [] : [[t.evmChainId, e]],
      ),
    ),
    o = (e, t) => {
      let r = l.get(e);
      return void 0 === r || !0 === t[r];
    },
    s = Array.from({ length: 128 }, (e, t) =>
      0 === t
        ? a
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
    a,
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
    (e) => (e === n.d || e === n.W ? e : void 0),
    "m",
    0,
    (e, t) => {
      if (e === i.ton.caip2) return !0 === t.ton;
      if (e === i.near.caip2) return !0 === t.near;
      if (e === i.starknet.caip2) return !0 === t.starknet;
      let r = e.startsWith("eip155:") ? Number(e.slice(7)) : 0 / 0;
      return Number.isNaN(r) || o(r, t);
    },
    "F",
    0,
    (e, t) => !(e in i) || !0 === (t ?? a)[e],
    "b",
    0,
    o,
    "M",
    0,
    (e) => !0 === e.near,
    "k",
    0,
    (e) => !0 === e.starknet,
    "l",
    0,
    () =>
      s[
        !!(0, r.k)(i.megaeth.flag, !1) |
          (2 * !!(0, r.k)(i.xlayer.flag, !1)) |
          (4 * !!(0, r.k)(i.ton.flag, !1)) |
          (8 * !!(0, r.k)(i.polygon.flag, !1)) |
          (16 * !!(0, r.k)(i.near.flag, !1)) |
          (32 * !!(0, r.k)(i.starknet.flag, !1)) |
          (64 * !!(0, r.k)(i.arbitrum.flag, !1))
      ],
  ]);
};
