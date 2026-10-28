// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e, t) {
    return `pump.fun: link EVM wallet ${t.toLowerCase()} to Solana wallet ${e}`;
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    (n.EVM_LINK_CHALLENGE_TTL_SECONDS =
      n.EVM_LINK_MESSAGE_VERSION_V2 =
      n.EVM_LINK_MESSAGE_VERSION_V1 =
      n.EVM_LINK_AUDIENCE =
        void 0),
    (n.buildEvmLinkMessageV1 = r),
    (n.buildEvmLinkMessageV2 = function (e, t, a, i) {
      return [
        r(e, t),
        `Version: ${n.EVM_LINK_MESSAGE_VERSION_V2}`,
        `Audience: ${n.EVM_LINK_AUDIENCE}`,
        `Nonce: ${a}`,
        `Expires: ${i}`,
      ].join("\n");
    }),
    (n.EVM_LINK_AUDIENCE = "pump.fun/wallet-rebind"),
    (n.EVM_LINK_MESSAGE_VERSION_V1 = 1),
    (n.EVM_LINK_MESSAGE_VERSION_V2 = 2),
    (n.EVM_LINK_CHALLENGE_TTL_SECONDS = 900));
};
