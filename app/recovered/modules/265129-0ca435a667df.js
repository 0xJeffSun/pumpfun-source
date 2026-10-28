// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(549613);
  let n = (e) => {
      if (null == e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    r = (e, r) =>
      null == r
        ? null
        : {
            nftAddress: e,
            name: n(r.name),
            image: (0, t.G)(r.provider, r.imageUrl),
            grade: n(r.grade),
            setName: n(r.setName),
          };
  e.s([
    "Q",
    0,
    (e) => null != e && (null != e.collectibleLeg || null != e.collectible),
    "q",
    0,
    r,
    "M",
    0,
    (e) => {
      let t = r(e.mint, e.collectible);
      return (
        t ||
        ("ASSET_CLASS_NFT_LIKE" !== e.assetClass
          ? null
          : {
              nftAddress: e.mint,
              name: n(e.name),
              image: n(e.image_uri),
              grade: null,
              setName: null,
            })
      );
    },
    "B",
    0,
    (e) => ({
      nftAddress: e.nftAddress,
      name: e.name,
      image: e.image,
      grade: e.grade,
      setName: e.setName,
    }),
  ]);
};
