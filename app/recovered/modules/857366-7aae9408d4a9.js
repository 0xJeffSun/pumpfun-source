// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(697781),
    r = e.i(42799);
  let n = Symbol("solana-funding-plugin"),
    i = Symbol("solana-ledger-plugin");
  e.s([
    "S",
    0,
    n,
    "a",
    0,
    i,
    "b",
    0,
    ({ message: e, address: n }) => {
      let i = e.match(/^URI: (.+)$/m)?.[1];
      if (!i) throw Error("SIWS message must include a URI");
      return (0, r.H)({
        message: e,
        signerPublicKey: t.e.decode(n),
        domain: i,
      });
    },
    "p",
    0,
    ({
      address: e,
      nonce: t,
    }) => `${window.location.host} wants you to sign in with your Solana account:
${e}

You are proving you own ${e}.

URI: ${window.location.origin}
Version: 1
Chain ID: mainnet
Nonce: ${t}
Issued At: ${new Date().toISOString()}
Resources:
- https://privy.io`,
  ]);
};
