// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(548801);
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
  class r extends t.f {
    constructor({ chain: e, currentChainId: t }) {
      super(
        `The current chain of the wallet (id: ${t}) does not match the target chain for the transaction (id: ${e.id} – ${e.name}).`,
        {
          metaMessages: [
            `Current Chain ID:  ${t}`,
            `Expected Chain ID: ${e.id} – ${e.name}`,
          ],
          name: "ChainMismatchError",
        },
      );
    }
  }
  class a extends t.f {
    constructor() {
      super(
        "No chain was provided to the request.\nPlease provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient.",
        { name: "ChainNotFoundError" },
      );
    }
  }
  class i extends t.f {
    constructor() {
      super("No chain was provided to the Client.", {
        name: "ClientChainNotConfiguredError",
      });
    }
  }
  class s extends t.f {
    constructor({ chainId: e }) {
      super(
        "number" == typeof e
          ? `Chain ID "${e}" is invalid.`
          : "Chain ID is invalid.",
        { name: "InvalidChainIdError" },
      );
    }
  }
  e.s(["m", 0, n, "F", 0, r, "r", 0, a, "L", 0, i, "O", 0, s]);
};
