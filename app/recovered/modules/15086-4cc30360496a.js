// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.ipfsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      name: o.z.string(),
      symbol: o.z.string(),
      description: o.z.string(),
      showName: o.z.boolean(),
      image: o.z.string(),
      createdOn: o.z.string(),
      twitter: o.z.string().optional(),
      telegram: o.z.string().optional(),
      website: o.z.string().optional(),
    }),
    a = o.z.object({
      name: o.z.string(),
      symbol: o.z.string(),
      description: o.z.string(),
      showName: o.z.boolean(),
      twitter: o.z.string().optional(),
      telegram: o.z.string().optional(),
      website: o.z.string().optional(),
    }),
    i = o.z.object({ metadataUri: o.z.string(), metadata: s });
  r.ipfsRoutes = (0, n.defineRoutes)({
    "POST /ipfs/token-metadata": {
      summary: "Upload token image + metadata JSON to IPFS",
      multipart: !0,
      multipartFiles: ["file"],
      body: a,
      response: i,
    },
    "POST /ipfs/image": {
      summary: "Upload a single file to IPFS",
      multipart: !0,
      multipartFiles: ["file"],
      response: o.z.object({
        fileUri: o.z.string().describe("Gateway URL of the pinned file"),
      }),
    },
    "GET /ipfs/pinata-presigned": {
      summary: "Get a presigned Pinata upload URL",
      response: o.z.object({
        presignedUri: o.z.string().describe("Presigned Pinata upload URI"),
      }),
    },
  });
};
