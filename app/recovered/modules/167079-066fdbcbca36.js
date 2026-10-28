// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(747337),
    n = e.i(142742);
  let r = ({ path: e, variant: n, version: r }) => {
      let o = (0, t.M)({ id: `mobile-resources/gacha/${e}`, variant: n });
      return void 0 === r ? o : `${o}&v=${r}`;
    },
    o = [
      "Pokemon",
      "One Piece",
      "Basketball",
      "Baseball",
      "Football",
      "Soccer",
      "Sports",
      "Watch",
      "Riftbound",
      "Dragon Ball",
      "Yu-Gi-Oh",
      "Others",
    ],
    i = (e) => "string" == typeof e && o.includes(e),
    a = {
      basketball: "Basketball",
      baseball: "Baseball",
      football: "Football",
      soccer: "Soccer",
      riftbound: "Riftbound",
      dragonball: "Dragon Ball",
      yugioh: "Yu-Gi-Oh",
    },
    s = (e) => {
      let [t] = e.pack_type.split("_"),
        n = a[t ?? ""];
      return void 0 !== n ? n : i(e.category) ? e.category : "Others";
    },
    l = {
      all: "all",
      Pokemon: "pokemon",
      "One Piece": "one_piece",
      Basketball: "basketball",
      Baseball: "baseball",
      Football: "football",
      Soccer: "soccer",
      Sports: "sports",
      Watch: "watches",
      Riftbound: "riftbound",
      "Dragon Ball": "dragon_ball",
      "Yu-Gi-Oh": "yugioh",
      Others: "others",
    },
    c = ["onepiece_1000", "sports_500", "ewatch_500"],
    u = (e, t) =>
      [...e].sort((e, n) =>
        "price_asc" === t
          ? e.price_usdc - n.price_usdc
          : n.price_usdc - e.price_usdc,
      ),
    p = /\b(gacha|pack)\b/gi,
    d = /\b(pok[eé]mon|one piece|sports|watch)\b/gi,
    f = (e) =>
      e
        .replace(/\s+/g, " ")
        .replace(/^[\s$-]+|[\s$-]+$/g, "")
        .trim(),
    g = {
      soccer_50: "Soccer Rookie",
      sports_100: "Sports Pro",
      basketball_100: "Basketball Pro",
      baseball_100: "Baseball Pro",
      football_100: "Football Pro",
      soccer_100: "Soccer Pro",
      basketball_250: "Basketball MVP",
      baseball_250: "Baseball MVP",
      football_250: "Football MVP",
      soccer_250: "Soccer MVP",
      sports_500: "Sports All-Star",
      dragonball_50: "Dragon Ball Power",
      dragonball_100: "Dragon Ball Ultra",
      riftbound_100: "Riftbound Champion",
      riftbound_250: "Riftbound Legend",
      ewatch_250: "Watches Luxury",
      ewatch_500: "Watches Prestige",
      e10_10: "Gem Mint 10",
    },
    m = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  e.s([
    "n",
    0,
    o,
    "t",
    0,
    1.8,
    "G",
    0,
    {
      common: "#fafafa",
      uncommon: "#60a5fa",
      rare: "#c084fc",
      epic: "#fb923c",
      legendary: "#f87171",
      mythic: "#ffd447",
    },
    "O",
    0,
    ["common", "uncommon", "rare", "epic", "legendary", "mythic"],
    "L",
    0,
    ["mythic", "legendary", "epic", "rare", "uncommon", "common"],
    "q",
    0,
    (e) => {
      if (void 0 === e || 0 === e.length) return;
      let t = e.filter((e) => "Pokemon" === s(e));
      return [...(t.length > 0 ? t : e)].sort(
        (e, t) => e.price_usdc - t.price_usdc,
      )[0];
    },
    "u",
    0,
    (e) => {
      let t = new Map(e.map((e) => [e.pack_type, e])),
        n = t.get("pumpfun-promo-pack-t2dhxr"),
        r = u(
          e.filter((e) => e !== n && "Pokemon" === s(e)),
          "price_asc",
        ),
        o = [
          ...(n ? [n] : []),
          ...r,
          ...c.flatMap((e) => {
            let n = t.get(e);
            return n ? [n] : [];
          }),
        ];
      if (o.length >= 3) return o;
      let i = e
        .filter((e) => !o.includes(e))
        .sort((e, t) => t.price_usdc - e.price_usdc)
        .slice(0, 3 - o.length);
      return [...o, ...i];
    },
    "$",
    0,
    s,
    "o",
    0,
    (e) => r({ path: `categories/${l[e]}`, variant: "128x128", version: 3 }),
    "r",
    0,
    (e) => r({ path: `packs/${e}`, variant: "profiles", version: 4 }),
    "p",
    0,
    (e) => r({ path: `packs/${e}-matrix`, variant: "full", version: 1 }),
    "m",
    0,
    (e) => r({ path: `profile/${e}-tile`, variant: "full", version: 3 }),
    "J",
    0,
    (e) => {
      let t = g[e.pack_type];
      if (void 0 !== t) return t;
      let n = f(e.name ?? e.pack_type),
        r = f(n.replace(p, " ")),
        o = f(r.replace(d, " "));
      return /[a-z]/i.test(o) ? o : "" === r ? n : r;
    },
    "T",
    0,
    (e, t) => {
      let n = s(e);
      return (
        m[
          t
            .filter((e) => s(e) === n)
            .sort((e, t) => e.price_usdc - t.price_usdc)
            .findIndex((t) => t.pack_type === e.pack_type)
        ] ?? null
      );
    },
    "s",
    0,
    (e, t) => (0, n.h)(e.odds, t),
    "b",
    0,
    (e) => {
      let t = 0;
      for (let n of Object.values(e.tier_ranges ?? {}))
        n.end > t && (t = n.end);
      return t > 0 ? t : void 0;
    },
    "v",
    0,
    (e) =>
      o.flatMap((t) => {
        let n = e
          .filter((e) => s(e) === t)
          .sort((e, t) => e.price_usdc - t.price_usdc);
        return n.length > 0 ? [{ category: t, packs: n }] : [];
      }),
    "V",
    0,
    i,
    "P",
    0,
    (e) => {
      if (!0 === e.sold_out) return !0;
      let t = Object.values(e.stock ?? {});
      return t.length > 0 && t.every((e) => 0 === e);
    },
    "Q",
    0,
    r,
    "x",
    0,
    u,
  ]);
};
