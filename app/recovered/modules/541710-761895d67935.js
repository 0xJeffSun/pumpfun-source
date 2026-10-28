// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(322315),
    a = e.i(254010),
    i = e.i(646908);
  let n = {
      megaeth: { evmChainId: 4326, flag: t.D.WEB_MEGAETH_CHAIN },
      xlayer: { evmChainId: 196, flag: t.D.WEB_XLAYER_CHAIN },
      ton: { evmChainId: null, caip2: i.J, flag: t.D.WEB_TON_CHAIN },
      polygon: { evmChainId: 137, flag: t.D.WEB_POLYGON_CHAIN },
      near: { evmChainId: null, caip2: i.d, flag: t.D.WEB_NEAR_CHAIN },
      starknet: { evmChainId: null, caip2: i.W, flag: t.D.WEB_STARKNET_CHAIN },
      arbitrum: { evmChainId: 42161, flag: t.D.WEB_ARBITRUM_CHAIN },
    },
    r = {
      megaeth: !1,
      xlayer: !1,
      ton: !1,
      polygon: !1,
      near: !1,
      starknet: !1,
      arbitrum: !1,
    },
    l = new Map(
      Object.entries(n).flatMap(([e, t]) =>
        null === t.evmChainId ? [] : [[t.evmChainId, e]],
      ),
    ),
    s = (e, t) => {
      let a = l.get(e);
      return void 0 === a || !0 === t[a];
    },
    o = Array.from({ length: 128 }, (e, t) =>
      0 === t
        ? r
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
    r,
    "E",
    0,
    n,
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
    (e) => (e === i.d || e === i.W ? e : void 0),
    "m",
    0,
    (e, t) => {
      if (e === n.ton.caip2) return !0 === t.ton;
      if (e === n.near.caip2) return !0 === t.near;
      if (e === n.starknet.caip2) return !0 === t.starknet;
      let a = e.startsWith("eip155:") ? Number(e.slice(7)) : 0 / 0;
      return Number.isNaN(a) || s(a, t);
    },
    "F",
    0,
    (e, t) => !(e in n) || !0 === (t ?? r)[e],
    "b",
    0,
    s,
    "M",
    0,
    (e) => !0 === e.near,
    "k",
    0,
    (e) => !0 === e.starknet,
    "l",
    0,
    () =>
      o[
        !!(0, a.k)(n.megaeth.flag, !1) |
          (2 * !!(0, a.k)(n.xlayer.flag, !1)) |
          (4 * !!(0, a.k)(n.ton.flag, !1)) |
          (8 * !!(0, a.k)(n.polygon.flag, !1)) |
          (16 * !!(0, a.k)(n.near.flag, !1)) |
          (32 * !!(0, a.k)(n.starknet.flag, !1)) |
          (64 * !!(0, a.k)(n.arbitrum.flag, !1))
      ],
  ]);
};
