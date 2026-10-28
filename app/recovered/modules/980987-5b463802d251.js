// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(393048),
    r = e.i(927974);
  class n extends r.f {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: "BaseFeeScalarError",
      });
    }
  }
  class i extends r.f {
    constructor() {
      super("Chain does not support EIP-1559 fees.", {
        name: "Eip1559FeesNotSupportedError",
      });
    }
  }
  class a extends r.f {
    constructor({ maxPriorityFeePerGas: e }) {
      super(
        `\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${(0, t.f)(e)} gwei).`,
        { name: "MaxFeePerGasTooLowError" },
      );
    }
  }
  e.s(["W", 0, n, "D", 0, i, "C", 0, a]);
};
