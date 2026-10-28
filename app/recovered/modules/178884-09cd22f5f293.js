// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.privyLinkRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(525364),
    a = o.z
      .string()
      .max(64)
      .regex(/^(0x[0-9a-fA-F]{40}|[1-9A-HJ-NP-Za-km-z]{32,44})$/)
      .describe(
        "Wallet address being imported (base58 for solana, 0x hex for ethereum)",
      ),
    i = o.z.enum(["solana", "ethereum"]),
    l = o.z
      .string()
      .max(44)
      .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/),
    d = o.z
      .string()
      .regex(/^did:privy:[A-Za-z0-9]{1,64}$/)
      .describe("Privy user DID that must own the imported wallet"),
    c = o.z
      .object({
        signature: o.z
          .string()
          .regex(/^0x[0-9a-fA-F]{130}$/)
          .describe(
            "0x-prefixed 65-byte EIP-191 signature by the EVM key being imported over the canonical v1 link message binding it to the session wallet (@pump-fun/evm-link-message buildEvmLinkMessageV1(sessionWallet, address))",
          ),
        messageVersion: o.z
          .literal(1)
          .describe("Only the v1 (bare) link message is accepted for imports"),
      })
      .describe(
        "Proof of control of the EVM key being imported. Required when an ethereum address is not the session wallet’s registered SOL→EVM mapping (replace-by-import: the rebind follows the import); ignored for solana imports and for an address that already is the mapping. A proven address another account maps is still refused.",
      ),
    u = o.z.object({ address: a, chainType: i, proof: c.optional() }),
    h = o.z.object({
      encryptionPublicKey: o.z
        .string()
        .describe(
          "Base64 P-256 public key the client HPKE-encrypts the wallet key to",
        ),
      encryptionType: o.z.string(),
    }),
    m = o.z.union([
      h,
      o.z
        .object({
          alreadyImported: o.z.literal(!0),
          walletId: o.z
            .string()
            .describe("The Privy wallet id already holding it"),
          address: o.z.string(),
        })
        .describe(
          "Only when the request carries the x-privy-id-token header and that Privy user already holds `address` as a Privy-managed wallet (a resumed import): the import step is done, so seal and submit nothing",
        ),
    ]),
    p = o.z.object({
      address: a,
      chainType: i,
      ciphertext: o.z
        .base64()
        .max(512)
        .describe("Base64 HPKE ciphertext of the wallet private key"),
      encapsulatedKey: o.z
        .base64()
        .max(256)
        .describe("Base64 HPKE encapsulated key"),
      privyUserId: d,
      proof: c
        .optional()
        .describe(
          "Same proof as on init; the ownership gate runs again on submit so a leaked init encryption key alone cannot import an unmapped address",
        ),
    }),
    b = o.z.object({ walletId: o.z.string(), address: o.z.string() }),
    g = o.z.object({
      walletId: o.z
        .string()
        .regex(/^[A-Za-z0-9_-]{1,128}$/)
        .describe(
          "Privy wallet id of the wallet to export; must be a Privy-managed wallet of `privyUserId` on `chainType`",
        ),
      chainType: i,
      recipientPublicKey: o.z
        .base64()
        .max(256)
        .describe(
          "Base64 DER (SubjectPublicKeyInfo) encoding of the device's P-256 recipient public key; Privy seals the private key to it and the relay forwards it verbatim",
        ),
      privyUserId: d.describe(
        "Privy user DID the x-privy-access-token must belong to and the wallet must be owned by",
      ),
    }),
    w = o.z.object({
      walletId: o.z.string(),
      address: o.z
        .string()
        .describe(
          "Address of the exported wallet; the device verifies the opened key derives it",
        ),
      chainType: i,
      encryptionType: o.z
        .literal("HPKE")
        .describe(
          "Only HPKE is relayed; Privy answering anything else is a 503",
        ),
      ciphertext: o.z
        .string()
        .describe(
          "Base64 HPKE ciphertext of the private key, as Privy returned it",
        ),
      encapsulatedKey: o.z
        .string()
        .describe("Base64 HPKE encapsulated key (uncompressed P-256 point)"),
    });
  r.privyLinkRoutes = (0, n.defineRoutes)({
    "POST /privy-link/import/init": {
      summary:
        "Start importing a wallet key into Privy; with the optional x-privy-id-token header, a wallet that Privy user already holds answers alreadyImported and one another Privy user owns is refused; a Privy user with two-factor authentication enabled is refused",
      body: u,
      response: m,
      emits: ["PRIVY_LINK_MFA_ENROLLED", "PRIVY_LINK_WALLET_ALREADY_LINKED"],
    },
    "POST /privy-link/import/submit": {
      summary:
        "Submit an HPKE-encrypted wallet key to Privy; a Privy user with two-factor authentication enabled is refused",
      body: p,
      response: b,
      emits: ["PRIVY_LINK_MFA_ENROLLED", "PRIVY_LINK_WALLET_ALREADY_LINKED"],
    },
    "POST /privy-link/signup-import/init": {
      summary:
        "Start importing a device-minted wallet key into a wallet-less Privy user; authorized by the x-privy-id-token header, no session",
      body: u,
      response: h,
      emits: [
        "PRIVY_SIGNUP_IMPORT_CHAIN_OCCUPIED",
        "PRIVY_SIGNUP_IMPORT_ADDRESS_IN_USE",
      ],
    },
    "POST /privy-link/signup-import/submit": {
      summary:
        "Submit an HPKE-encrypted device-minted wallet key for a wallet-less Privy user; authorized by the x-privy-id-token header, no session",
      body: p,
      response: b,
      emits: [
        "PRIVY_SIGNUP_IMPORT_CHAIN_OCCUPIED",
        "PRIVY_SIGNUP_IMPORT_ADDRESS_IN_USE",
      ],
    },
    "POST /privy-link/export": {
      summary:
        "Have Privy export one of the session user's TEE wallets, HPKE-sealed to a recipient key the device minted; authorized by the session plus the x-privy-access-token header (the user's Privy access token), whose subject must be privyUserId and must carry the session wallet; a wallet id that is not a Privy-managed wallet of that user on chainType is refused, and a user Privy gates behind a second factor is refused",
      body: g,
      response: w,
      emits: ["PRIVY_EXPORT_WALLET_NOT_OWNED", "PRIVY_EXPORT_MFA_REQUIRED"],
    },
    "GET /privy-link/status": {
      summary:
        "Whether the session wallet is already a Privy account, and the login method that owns it",
      response: o.z.object({
        linked: o.z
          .boolean()
          .describe(
            "True when a Privy account already owns the session wallet as an embedded or imported wallet",
          ),
        provider: s.privyLoginProvider
          .nullable()
          .describe(
            "That account's primary login method; null when not linked",
          ),
      }),
    },
    "POST /privy-link/finalize": {
      summary: "Record a completed non-custodial → Privy link",
      body: o.z.object({
        solanaAddress: o.z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/),
        evmAddress: o.z.string().regex(/^0x[0-9a-fA-F]{40}$/),
        privyUserId: d,
      }),
      response: o.z.void(),
    },
    "POST /privy-link/owner-lookup": {
      summary:
        "Which Privy login owns each wallet, for wallets whose key the caller proves it holds",
      body: o.z.object({
        wallets: o.z
          .array(
            o.z.object({
              address: l.describe(
                "Solana wallet whose owning Privy login is asked for",
              ),
              timestamp: o.z
                .int()
                .min(0)
                .describe(
                  "Milliseconds since epoch the proof was signed at; refused when more than 5 minutes from server time",
                ),
              signature: o.z
                .string()
                .max(88)
                .regex(/^[1-9A-HJ-NP-Za-km-z]{64,88}$/)
                .describe(
                  "Base58 ed25519 signature by THIS wallet over `pump.fun: reveal the sign-in that owns wallet <address> for session <sessionWallet> at <timestamp>`; single-use",
                ),
            }),
          )
          .min(1)
          .max(10),
      }),
      response: o.z.object({
        wallets: o.z
          .array(
            o.z.object({
              address: o.z.string(),
              owner: o.z
                .object({
                  privyUserId: o.z.string().describe("Privy user DID"),
                  provider: s.privyLoginProvider.describe(
                    "That account's primary login method",
                  ),
                  email: o.z
                    .string()
                    .nullable()
                    .describe(
                      "The email a google / apple / email login is under; null for other providers",
                    ),
                  username: o.z
                    .string()
                    .nullable()
                    .describe(
                      "X handle (without @) for a twitter login; null for other providers",
                    ),
                })
                .nullable()
                .describe(
                  "Null when no Privy account owns the wallet as an embedded or imported wallet",
                ),
            }),
          )
          .describe("One row per requested wallet, in request order"),
      }),
    },
  });
};
