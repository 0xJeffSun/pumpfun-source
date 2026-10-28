// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class n extends t.f {
    constructor({ address: e }) {
      super(`State for account "${e}" is set multiple times.`, {
        name: "AccountStateConflictError",
      });
    }
  }
  class r extends t.f {
    constructor() {
      super("state and stateDiff are set on the same account.", {
        name: "StateAssignmentConflictError",
      });
    }
  }
  function i(e) {
    return e.reduce(
      (e, { slot: t, value: n }) => `${e}        ${t}: ${n}
`,
      "",
    );
  }
  e.s([
    "n",
    0,
    n,
    "_",
    0,
    r,
    "O",
    0,
    function (e) {
      return e
        .reduce((e, { address: t, ...n }) => {
          let r = `${e}    ${t}:
`;
          return (
            n.nonce &&
              (r += `      nonce: ${n.nonce}
`),
            n.balance &&
              (r += `      balance: ${n.balance}
`),
            n.code &&
              (r += `      code: ${n.code}
`),
            n.state && ((r += "      state:\n"), (r += i(n.state))),
            n.stateDiff && ((r += "      stateDiff:\n"), (r += i(n.stateDiff))),
            r
          );
        }, "  State Override:\n")
        .slice(0, -1);
    },
  ]);
};
