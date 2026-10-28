// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617);
  class r extends t.f {
    constructor({ blockNumber: e, chain: t, contract: r }) {
      super(`Chain "${t.name}" does not support contract "${r.name}".`, {
        metaMessages: [
          "This could be due to any of the following:",
          ...(e && r.blockCreated && r.blockCreated > e
            ? [
                `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${e}).`,
              ]
            : [
                `- The chain does not have the contract "${r.name}" configured.`,
              ]),
        ],
        name: "ChainDoesNotSupportContract",
      });
    }
  }
  (t.f, t.f);
  class o extends t.f {
    constructor() {
      super("No chain was provided to the Client.", {
        name: "ClientChainNotConfiguredError",
      });
    }
  }
  class a extends t.f {
    constructor({ chainId: e }) {
      super(
        "number" == typeof e
          ? `Chain ID "${e}" is invalid.`
          : "Chain ID is invalid.",
        { name: "InvalidChainIdError" },
      );
    }
  }
  e.s(["m", 0, r, "L", 0, o, "O", 0, a]);
};
