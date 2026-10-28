// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  async function t(e, { serializedTransaction: r }) {
    return e.request(
      { method: "eth_sendRawTransaction", params: [r] },
      { retryCount: 0 },
    );
  }
  e.s(["f", 0, t]);
};
