// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => e.toLowerCase(),
    r = (e) => Math.max(0, 10 - e),
    n = (e) =>
      new Set(e.existingMintAddresses.map(t)).size +
      Math.max(0, e.existingUnknownPoolCount ?? 0),
    a = (e) => {
      let r = new Set(e.existingMintAddresses.map(t)),
        n = new Set();
      for (let a of e.intendedMints) {
        let e = t(a);
        r.has(e) || n.add(e);
      }
      return n.size;
    };
  class i extends Error {
    existingPoolCount;
    newMintCount;
    constructor(e, t) {
      (super(
        `This bounty already has ${e} reward pool${1 === e ? "" : "s"}. You can add at most ${r(e)} more new token${1 === r(e) ? "" : "s"}.`,
      ),
        (this.existingPoolCount = e),
        (this.newMintCount = t),
        (this.name = "BountyRewardPoolCapExceededError"));
    }
  }
  e.s([
    "W",
    0,
    i,
    "f",
    0,
    10,
    "k",
    0,
    (e) => {
      let t = a(e),
        o = n(e);
      if (t > r(o)) throw new i(o, t);
    },
    "w",
    0,
    n,
    "v",
    0,
    a,
    "n",
    0,
    r,
    "e",
    0,
    (e) => {
      let t = [],
        r = 0;
      for (let n of e) n.mintAddress ? t.push(n.mintAddress) : (r += 1);
      return r > 0
        ? { existingMintAddresses: t, existingUnknownPoolCount: r }
        : { existingMintAddresses: t };
    },
    "N",
    0,
    (e) => a(e) > r(n(e)),
  ]);
};
