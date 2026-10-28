// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(697781),
    n = e.i(42799);
  let r = Symbol("solana-funding-plugin"),
    a = Symbol("solana-ledger-plugin");
  e.s([
    "S",
    0,
    r,
    "a",
    0,
    a,
    "b",
    0,
    ({ message: e, address: r }) => {
      let a = e.match(/^URI: (.+)$/m)?.[1];
      if (!a) throw Error("SIWS message must include a URI");
      return (0, n.H)({
        message: e,
        signerPublicKey: t.e.decode(r),
        domain: a,
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
