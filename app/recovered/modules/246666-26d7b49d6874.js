// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
  class n extends t.f {
    constructor({ blockNumber: e, chain: t, contract: n }) {
      super(`Chain "${t.name}" does not support contract "${n.name}".`, {
        metaMessages: [
          "This could be due to any of the following:",
          ...(e && n.blockCreated && n.blockCreated > e
            ? [
                `- The contract "${n.name}" was not deployed until block ${n.blockCreated} (current block ${e}).`,
              ]
            : [
                `- The chain does not have the contract "${n.name}" configured.`,
              ]),
        ],
        name: "ChainDoesNotSupportContract",
      });
    }
  }
  (t.f, t.f);
  class r extends t.f {
    constructor() {
      super("No chain was provided to the Client.", {
        name: "ClientChainNotConfiguredError",
      });
    }
  }
  class i extends t.f {
    constructor({ chainId: e }) {
      super(
        "number" == typeof e
          ? `Chain ID "${e}" is invalid.`
          : "Chain ID is invalid.",
        { name: "InvalidChainIdError" },
      );
    }
  }
  e.s(["m", 0, n, "L", 0, r, "O", 0, i]);
};
