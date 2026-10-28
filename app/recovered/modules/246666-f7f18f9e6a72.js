// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
  class s extends t.f {
    constructor({ blockNumber: e, chain: t, contract: s }) {
      super(`Chain "${t.name}" does not support contract "${s.name}".`, {
        metaMessages: [
          "This could be due to any of the following:",
          ...(e && s.blockCreated && s.blockCreated > e
            ? [
                `- The contract "${s.name}" was not deployed until block ${s.blockCreated} (current block ${e}).`,
              ]
            : [
                `- The chain does not have the contract "${s.name}" configured.`,
              ]),
        ],
        name: "ChainDoesNotSupportContract",
      });
    }
  }
  (t.f, t.f);
  class i extends t.f {
    constructor() {
      super("No chain was provided to the Client.", {
        name: "ClientChainNotConfiguredError",
      });
    }
  }
  class r extends t.f {
    constructor({ chainId: e }) {
      super(
        "number" == typeof e
          ? `Chain ID "${e}" is invalid.`
          : "Chain ID is invalid.",
        { name: "InvalidChainIdError" },
      );
    }
  }
  e.s(["m", 0, s, "L", 0, i, "O", 0, r]);
};
