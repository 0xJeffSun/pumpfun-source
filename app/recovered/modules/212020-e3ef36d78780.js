// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  function n(e, t) {
    return `pump.fun: link EVM wallet ${t.toLowerCase()} to Solana wallet ${e}`;
  }
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.EVM_LINK_CHALLENGE_TTL_SECONDS =
      r.EVM_LINK_MESSAGE_VERSION_V2 =
      r.EVM_LINK_MESSAGE_VERSION_V1 =
      r.EVM_LINK_AUDIENCE =
        void 0),
    (r.buildEvmLinkMessageV1 = n),
    (r.buildEvmLinkMessageV2 = function (e, t, i, a) {
      return [
        n(e, t),
        `Version: ${r.EVM_LINK_MESSAGE_VERSION_V2}`,
        `Audience: ${r.EVM_LINK_AUDIENCE}`,
        `Nonce: ${i}`,
        `Expires: ${a}`,
      ].join("\n");
    }),
    (r.EVM_LINK_AUDIENCE = "pump.fun/wallet-rebind"),
    (r.EVM_LINK_MESSAGE_VERSION_V1 = 1),
    (r.EVM_LINK_MESSAGE_VERSION_V2 = 2),
    (r.EVM_LINK_CHALLENGE_TTL_SECONDS = 900));
};
