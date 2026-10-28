// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(586090),
    r = t.i(729047);
  let a = async ({
    video: t,
    videoUploaded: a,
    name: i,
    ticker: n,
    description: o,
    showName: s,
    videoFileName: u,
    twitter: c,
    telegram: l,
    website: d,
    imageIpfsHash: h,
    coinAddress: p,
    includeCoinCommunity: w,
  }) => {
    try {
      let f = "";
      if (h) f = `https://ipfs.io/ipfs/${h}`;
      else throw Error("No image hash provided");
      let g = {
          name: i,
          symbol: n,
          description: o,
          image: f,
          showName: s,
          createdOn: "https://pump.fun",
          ...(t && a && { video: e.z + "videos/" + u }),
          ...(c && { twitter: c }),
          ...(l && { telegram: l }),
          ...(d && { website: d }),
          ...(w &&
            p && {
              coin_community: `https://coincommunities.org/communities/${p}`,
            }),
        },
        { metadataUri: m } = await (0, r.o)(g);
      return { metadata: g, metadataUri: m };
    } catch (t) {
      throw (console.error("Error setting up metadata:", t), t);
    }
  };
  t.s(["f", 0, a], 778435);
  var i = t.i(684182);
  async function n({
    clientServerUrl: t,
    reservedMint: e,
    reservedMintKeypair: r,
    isVanityMint: o,
    metadata: s,
  }) {
    let u = await (0, i.Y)({
        clientServerUrl: t,
        reservedMint: e,
        reservedMintKeypair: r,
        isVanityMint: o,
      }),
      c = u.mint.toBase58(),
      { metadata: l, metadataUri: d } = await a({
        ...s,
        coinAddress: c,
        includeCoinCommunity: !0,
      });
    return { preResolvedMint: u, metadata: l, metadataUri: d };
  }
  t.s(["f", 0, n], 421159);
};
