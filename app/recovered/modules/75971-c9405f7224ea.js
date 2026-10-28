// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var r = e.i(747337),
    a = e.i(256617);
  let i =
      ((t = r.M),
      Object.fromEntries(
        Object.entries({
          default: null,
          variant1: "7f3d3ed7-a1fe-41d4-b1bf-07f679e37d00",
          variant2: "455299be-2856-4c1e-2160-739d69c03a00",
          variant3: "c1e3d849-beb8-44bb-9e05-0df190851e00",
          variant4: "5637879e-a39c-4601-d1c5-24e80eff8900",
          variant5: "73cccfdb-4405-4cf6-f413-027e9c0d6e00",
          variant6: "4da60c4e-b872-40b5-9c6c-bb0ce1e52d00",
          variant7: "d1b5d573-2e38-445e-0bdd-30b28cd0e900",
          variant8: "2ffc89b7-19d2-409a-1f9e-cf7f533edf00",
          variant9: "5422ed03-9392-4726-fa58-63d060b02400",
          variant10: "99972995-de2b-41fb-dd60-204f9d2dad00",
          variant11: "adf925b3-c36d-484d-867b-1384e5edf800",
          variant12: "042a8fc7-0444-4867-bbe5-8294674aca00",
          variant13: "6b0fc278-d541-400d-48d8-5d5bd2232300",
        }).map(([e, r]) => [
          e,
          null === r ? null : t({ id: r, variant: "profiles" }),
        ]),
      )),
    s = ["variant7", "variant9"],
    l = Object.keys(i).filter((e) => !s.includes(e)),
    n = i.variant9,
    o = (0, r.M)({
      id: "squad-bboy-banner-v6",
      variant: (0, a.l)({ width: 1500, height: 500 }),
    }),
    c = new Map(
      Object.entries(i)
        .filter((e) => null !== e[1])
        .map(([e, t]) => [t, e]),
    );
  e.s([
    "Q",
    0,
    i,
    "M",
    0,
    n,
    "R",
    0,
    l,
    "P",
    0,
    o,
    "e",
    0,
    (e) => (null === e ? "default" : (c.get((0, r.N)(e)) ?? null)),
    "u",
    0,
    (e) => i[e] ?? n,
  ]);
};
