// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(646908),
    a = e.i(84976),
    i = e.i(605587),
    n = e.i(449597);
  let r = {
      pump: {
        id: "pump",
        label: "Pump",
        iconSrc: "/pump-logomark.svg",
        color: "#53d38e",
      },
      launchlab: {
        id: "launchlab",
        label: "Launchlab",
        iconSrc: "/launchpads/launchlab.png",
        color: "#4bbccf",
      },
      bonk: {
        id: "bonk",
        label: "Bonkfun",
        iconSrc: "/launchpads/bonk.png",
        color: "#e78c19",
      },
      meteora: {
        id: "meteora",
        label: "Meteora",
        iconSrc: "/launchpads/meteora.png",
        color: "#e23a3a",
      },
      believe: {
        id: "believe",
        label: "Believe",
        iconSrc: "/launchpads/believe.png",
        color: "#00d945",
      },
      moonshot: {
        id: "moonshot",
        label: "Moonshot",
        iconSrc: "/launchpads/moonshot.png",
        color: "#ff88fe",
      },
      bags: {
        id: "bags",
        label: "Bags",
        iconSrc: "/launchpads/bags.png",
        color: "#03d52b",
      },
      jup_studio: {
        id: "jup_studio",
        label: "Jup Studio",
        iconSrc: "/launchpads/jup-studio.png",
        color: "#fe997b",
      },
      basedpad: {
        id: "basedpad",
        label: "BasedPad",
        iconSrc: "/launchpads/meteora.png",
        color: "#e23a3a",
      },
      hooked: {
        id: "hooked",
        label: "Hooked",
        iconSrc: "/launchpads/meteora.png",
        color: "#e23a3a",
      },
      stonkfun: {
        id: "stonkfun",
        label: "stonkFUN",
        iconSrc: "/launchpads/stonkfun.png",
        color: "#A4C4CF",
      },
      loadout: {
        id: "loadout",
        label: "Loadout",
        iconSrc: "/chains/solana.png",
        color: "#9945FF",
      },
      meme_fun: {
        id: "meme_fun",
        label: "meme.fun",
        iconSrc: "/chains/solana.png",
        color: "#9945FF",
      },
    },
    l = {
      pump: "pump",
      bonk: "bonk",
      bags: "bags",
      believe: "believe",
      moonshot: "moonshot",
      jup_studio: "jup_studio",
      basedpad: "basedpad",
      hooked: "hooked",
      stonkfun: "stonkfun",
      dbc: "meteora",
    },
    s = "pons",
    o = { iconSrc: "/launchpads/uniswap.png", color: "#FF007A" },
    d = { iconSrc: "/launchpads/fourmeme.png", color: "#42E2A8" },
    u = {
      [s]: {
        id: "pons",
        label: "Pons",
        iconSrc: "/launchpads/pons.png",
        color: "#CAFE03",
      },
      tolly_launchpad: {
        id: "tolly_launchpad",
        label: "Tolly",
        iconSrc: "/launchpads/tolly.png",
        color: "#D3F303",
      },
      argus_launchpad: {
        id: "argus_launchpad",
        label: "Argus",
        iconSrc: "/launchpads/argus.png",
        color: "#5D13FB",
      },
      lift_launchpad: {
        id: "lift_launchpad",
        label: "Lift",
        iconSrc: "/launchpads/lift.png",
        color: "#81B8F9",
      },
      minara_launchpad: {
        id: "minara_launchpad",
        label: "Minara",
        iconSrc: "/launchpads/minara.png",
        color: "#4CEBB6",
      },
      uniswap_liquidity_launcher: {
        id: "uniswap_liquidity_launcher",
        label: "Uniswap Launcher",
        ...o,
      },
      doppler: {
        id: "doppler",
        label: "Doppler",
        iconSrc: "/launchpads/doppler.png",
        color: "#DEDFDF",
      },
      kumbaya_fire: { id: "kumbaya_fire", label: "Kumbaya Fire" },
      ignix: {
        id: "ignix",
        label: "Ignix",
        iconSrc: "/launchpads/ignix.png",
        color: "#F1CE3E",
      },
      nadfun: {
        id: "nadfun",
        label: "nad.fun",
        iconSrc: "/launchpads/nadfun.png",
        color: "#B484ED",
        isTile: !0,
      },
      abyss_launchpad: { id: "abyss_launchpad", label: "Abyss" },
      four_meme: { id: "four_meme", label: "four.meme", ...d },
      open_four: { id: "open_four", label: "four.meme", ...d },
      flap: {
        id: "flap",
        label: "Flap",
        iconSrc: "/launchpads/flap.png",
        color: "#967AFF",
      },
      rooket: { id: "rooket", label: "Rooket" },
      uniswap_cca: { id: "uniswap_cca", label: "Uniswap CCA", ...o },
      liquid_launch: {
        id: "liquid_launch",
        label: "LiquidLaunch",
        iconSrc: "/launchpads/liquidlaunch.png",
        color: "#5FD5BB",
      },
      dyorpump: {
        id: "dyorpump",
        label: "DyorPump",
        iconSrc: "/launchpads/dyorpump.png",
        color: "#27D1FD",
      },
      inkypump: {
        id: "inkypump",
        label: "InkyPump",
        iconSrc: "/launchpads/inkypump.png",
        color: "#E3E3E3",
      },
      warp_launchpad: {
        id: "warp_launchpad",
        label: "Warp",
        iconSrc: "/launchpads/warp.png",
        color: "#FAFAFA",
      },
      sharc_launchpad: { id: "sharc_launchpad", label: "Sharc" },
      printr: { id: "printr", label: "Printr" },
      lotus_launchpad: {
        id: "lotus_launchpad",
        label: "Lotus",
        iconSrc: "/launchpads/lotus.png",
        color: "#3781EE",
      },
    },
    c = (e) =>
      void 0 === e.board_program ? e.program : e.board_program || void 0,
    p = {
      nearly_trade: "nearly.trade",
      meme_cooking: "Meme Cooking",
      justhoot: "JustHoot",
    },
    m = { rhea_v1: "Rhea", rhea_dcl: "Rhea DCL" },
    h = (e) => {
      if ((0, i.N)({ mint: e.mint, chainId: e.chain_id })) {
        let t = u[e.protocol?.trim().toLowerCase() ?? ""] ?? null;
        return {
          kind: "evm",
          chainId: e.chain_id ?? null,
          venue: t ? null : (0, i.k)(e.protocol),
          launchpad: t,
        };
      }
      if ((0, t.e)(e)) return { kind: "ton", chainId: t.J };
      if ((0, t.a)(e)) {
        let a;
        return (
          (a = e.protocol?.trim().toLowerCase() ?? ""),
          {
            kind: "near",
            chainId: t.d,
            launchpad: p[a] ?? null,
            venue: m[a] ?? null,
          }
        );
      }
      if ((0, t.X)(e)) return { kind: "starknet", chainId: t.W };
      let a = ((e) => {
        let t = l[e.platform?.toLowerCase() ?? ""],
          a = c(e);
        switch (a) {
          case "pump":
          case "pump_amm":
            return r.pump;
          case "meteora_dbc":
            return t &&
              [
                "bags",
                "basedpad",
                "believe",
                "hooked",
                "jup_studio",
                "moonshot",
              ].includes(t)
              ? r[t]
              : r.meteora;
          case "raydium_launchpad":
            return t && ["bonk", "stonkfun"].includes(t) ? r[t] : r.launchlab;
          case "raydium_launchpad_bonk":
            return r.bonk;
          case "stonkfun":
            return r.stonkfun;
          case "loadout":
            return r.loadout;
          case "meme_fun":
            return r.meme_fun;
          default:
            if (a) return null;
            return t ? r[t] : null;
        }
      })(e);
      return a ? { kind: "launchpad", launchpad: a } : { kind: "solana" };
    },
    f = {
      uniswap: { label: "Uniswap", ...o },
      pancakeswap: {
        label: "PancakeSwap",
        iconSrc: "/launchpads/pancakeswap.png",
        color: "#3CD4DF",
      },
      aerodrome: {
        label: "Aerodrome",
        iconSrc: "/launchpads/aerodrome.png",
        color: "#0432FF",
      },
      raydium: {
        label: "Raydium",
        iconSrc: "/launchpads/raydium.png",
        color: "#4bbccf",
        isTile: !0,
      },
      meteora: {
        label: "Meteora",
        iconSrc: "/launchpads/meteora.png",
        color: "#e23a3a",
      },
    },
    g = (e) => {
      let t = e?.trim().toLowerCase().split("_")[0],
        a = t ? f[t] : void 0;
      return a ? { kind: "dex", ...a } : null;
    };
  e.s([
    "G",
    0,
    s,
    "s",
    0,
    (e) => {
      let t = r[e];
      if (t) return { iconSrc: t.iconSrc, isTile: !1 };
      let a = u[e];
      return a?.iconSrc
        ? { iconSrc: a.iconSrc, isTile: !0 === a.isTile }
        : null;
    },
    "M",
    0,
    h,
    "b",
    0,
    (e) => {
      if ((0, i.N)({ mint: e.mint, chainId: e.chain_id }))
        return { kind: "native" };
      let t = e.quote_mint?.trim();
      return t && t !== a.d && t !== n.X && t !== e.mint
        ? (0, n.Y)(t)
          ? { kind: "usdc" }
          : { kind: "mint", mint: t }
        : { kind: "native" };
    },
    "O",
    0,
    (e) => {
      let t = h(e);
      if ("launchpad" === t.kind) {
        let { label: e, iconSrc: a, color: i } = t.launchpad;
        return { kind: "launchpad", label: e, iconSrc: a, color: i };
      }
      if ("evm" === t.kind) {
        if (null == t.launchpad) return g(e.protocol);
        let { label: a, iconSrc: i, color: n, isTile: r } = t.launchpad;
        return null == i || null == n
          ? null
          : r
            ? { kind: "launchpad", label: a, iconSrc: i, color: n, isTile: r }
            : { kind: "launchpad", label: a, iconSrc: i, color: n };
      }
      return "near" === t.kind ? null : g(c(e));
    },
    "m",
    0,
    (e) =>
      (0, i.N)({ mint: e.mint, chainId: e.chain_id })
        ? null
        : !0 === e.is_holder_reward
          ? "holders"
          : !0 === e.is_cashback_enabled
            ? "traders"
            : !1 === e.is_cashback_enabled &&
                "pump" === e.program &&
                !1 !== e.initialized
              ? "creator"
              : null,
    "z",
    0,
    (e) => {
      let t = h(e);
      return "evm" !== t.kind ? null : (t.launchpad?.label ?? t.venue);
    },
  ]);
};
