// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    n = e.i(565530),
    i = e.i(496194),
    a = e.i(499868),
    s = e.i(65177),
    o = e.i(706426),
    u = e.i(417451),
    l = e.i(105072),
    c = e.i(673228),
    f = e.i(460366),
    d = e.i(722854),
    p = e.i(375804),
    y = e.i(285945),
    h = e.i(278133),
    m = e.i(997214),
    g = e.i(954982),
    b = e.i(920779),
    w = e.i(943343),
    v = e.i(891487),
    x = e.i(109340),
    P = e.i(586844),
    k = e.i(772488),
    A = e.i(184055),
    I = e.i(717473),
    B = e.i(559787),
    E = e.i(476831),
    N = e.i(218552),
    T = e.i(616883);
  let S = [
      {
        name: "authorizeKey",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "uint8", name: "signatureType" },
          { type: "uint64", name: "expiry" },
          { type: "bool", name: "enforceLimits" },
          {
            type: "tuple[]",
            name: "limits",
            components: [
              { type: "address", name: "token" },
              { type: "uint256", name: "amount" },
            ],
          },
        ],
        outputs: [],
      },
      {
        name: "authorizeKey",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "uint8", name: "signatureType" },
          {
            type: "tuple",
            name: "config",
            components: [
              { type: "uint64", name: "expiry" },
              { type: "bool", name: "enforceLimits" },
              {
                type: "tuple[]",
                name: "limits",
                components: [
                  { type: "address", name: "token" },
                  { type: "uint256", name: "amount" },
                  { type: "uint64", name: "period" },
                ],
              },
              { type: "bool", name: "allowAnyCalls" },
              {
                type: "tuple[]",
                name: "allowedCalls",
                components: [
                  { type: "address", name: "target" },
                  {
                    type: "tuple[]",
                    name: "selectorRules",
                    components: [
                      { type: "bytes4", name: "selector" },
                      { type: "address[]", name: "recipients" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        outputs: [],
      },
      {
        name: "authorizeKey",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "uint8", name: "signatureType" },
          {
            type: "tuple",
            name: "config",
            components: [
              { type: "uint64", name: "expiry" },
              { type: "bool", name: "enforceLimits" },
              {
                type: "tuple[]",
                name: "limits",
                components: [
                  { type: "address", name: "token" },
                  { type: "uint256", name: "amount" },
                  { type: "uint64", name: "period" },
                ],
              },
              { type: "bool", name: "allowAnyCalls" },
              {
                type: "tuple[]",
                name: "allowedCalls",
                components: [
                  { type: "address", name: "target" },
                  {
                    type: "tuple[]",
                    name: "selectorRules",
                    components: [
                      { type: "bytes4", name: "selector" },
                      { type: "address[]", name: "recipients" },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "bytes32", name: "witness" },
        ],
        outputs: [],
      },
      {
        name: "authorizeAdminKey",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "uint8", name: "signatureType" },
          { type: "bytes32", name: "witness" },
        ],
        outputs: [],
      },
      {
        name: "burnKeyAuthorizationWitness",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ type: "bytes32", name: "witness" }],
        outputs: [],
      },
      {
        name: "revokeKey",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ type: "address", name: "keyId" }],
        outputs: [],
      },
      {
        name: "updateSpendingLimit",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "address", name: "token" },
          { type: "uint256", name: "newLimit" },
        ],
        outputs: [],
      },
      {
        name: "setAllowedCalls",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          {
            type: "tuple[]",
            name: "scopes",
            components: [
              { type: "address", name: "target" },
              {
                type: "tuple[]",
                name: "selectorRules",
                components: [
                  { type: "bytes4", name: "selector" },
                  { type: "address[]", name: "recipients" },
                ],
              },
            ],
          },
        ],
        outputs: [],
      },
      {
        name: "removeAllowedCalls",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "address", name: "keyId" },
          { type: "address", name: "target" },
        ],
        outputs: [],
      },
      {
        name: "getKey",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "address", name: "keyId" },
        ],
        outputs: [
          {
            type: "tuple",
            components: [
              { type: "uint8", name: "signatureType" },
              { type: "address", name: "keyId" },
              { type: "uint64", name: "expiry" },
              { type: "bool", name: "enforceLimits" },
              { type: "bool", name: "isRevoked" },
            ],
          },
        ],
      },
      {
        name: "getRemainingLimit",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "address", name: "keyId" },
          { type: "address", name: "token" },
        ],
        outputs: [{ type: "uint256", name: "remaining" }],
      },
      {
        name: "getRemainingLimitWithPeriod",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "address", name: "keyId" },
          { type: "address", name: "token" },
        ],
        outputs: [
          { type: "uint256", name: "remaining" },
          { type: "uint64", name: "periodEnd" },
        ],
      },
      {
        name: "getAllowedCalls",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "address", name: "keyId" },
        ],
        outputs: [
          { type: "bool", name: "isScoped" },
          {
            type: "tuple[]",
            name: "scopes",
            components: [
              { type: "address", name: "target" },
              {
                type: "tuple[]",
                name: "selectorRules",
                components: [
                  { type: "bytes4", name: "selector" },
                  { type: "address[]", name: "recipients" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "isKeyAuthorizationWitnessBurned",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "bytes32", name: "witness" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        name: "isAdminKey",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "address", name: "keyId" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        name: "getTransactionKey",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "address" }],
      },
      {
        name: "KeyAuthorized",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "address", name: "publicKey", indexed: !0 },
          { type: "uint8", name: "signatureType" },
          { type: "uint64", name: "expiry" },
        ],
      },
      {
        name: "AdminKeyAuthorized",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "address", name: "publicKey", indexed: !0 },
        ],
      },
      {
        name: "KeyRevoked",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "address", name: "publicKey", indexed: !0 },
        ],
      },
      {
        name: "SpendingLimitUpdated",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "address", name: "publicKey", indexed: !0 },
          { type: "address", name: "token", indexed: !0 },
          { type: "uint256", name: "newLimit" },
        ],
      },
      {
        name: "AccessKeySpend",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "address", name: "publicKey", indexed: !0 },
          { type: "address", name: "token", indexed: !0 },
          { type: "uint256", name: "amount" },
          { type: "uint256", name: "remainingLimit" },
        ],
      },
      {
        name: "KeyAuthorizationWitness",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "bytes32", name: "witness", indexed: !0 },
        ],
      },
      {
        name: "KeyAuthorizationWitnessBurned",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "bytes32", name: "witness", indexed: !0 },
        ],
      },
      { name: "UnauthorizedCaller", type: "error", inputs: [] },
      { name: "KeyAlreadyExists", type: "error", inputs: [] },
      { name: "KeyNotFound", type: "error", inputs: [] },
      { name: "KeyExpired", type: "error", inputs: [] },
      { name: "SpendingLimitExceeded", type: "error", inputs: [] },
      { name: "InvalidSpendingLimit", type: "error", inputs: [] },
      { name: "InvalidSignatureType", type: "error", inputs: [] },
      { name: "ZeroPublicKey", type: "error", inputs: [] },
      { name: "ExpiryInPast", type: "error", inputs: [] },
      { name: "KeyAlreadyRevoked", type: "error", inputs: [] },
      {
        name: "SignatureTypeMismatch",
        type: "error",
        inputs: [
          { type: "uint8", name: "expected" },
          { type: "uint8", name: "actual" },
        ],
      },
      { name: "CallNotAllowed", type: "error", inputs: [] },
      { name: "InvalidCallScope", type: "error", inputs: [] },
      { name: "InvalidKeyId", type: "error", inputs: [] },
      { name: "InvalidKeyAuthorizationWitness", type: "error", inputs: [] },
      {
        name: "KeyAuthorizationWitnessAlreadyBurned",
        type: "error",
        inputs: [],
      },
      {
        name: "LegacyAuthorizeKeySelectorChanged",
        type: "error",
        inputs: [{ type: "bytes4", name: "newSelector" }],
      },
    ],
    M = [
      {
        name: "deriveAccount",
        type: "function",
        stateMutability: "pure",
        inputs: [
          { type: "bytes32", name: "salt" },
          { type: "uint8", name: "threshold" },
          {
            type: "tuple[]",
            name: "owners",
            components: [
              { type: "address", name: "owner" },
              { type: "uint8", name: "weight" },
            ],
          },
        ],
        outputs: [{ type: "address", name: "account" }],
      },
      {
        name: "isMultisigAccount",
        type: "function",
        stateMutability: "view",
        inputs: [{ type: "address", name: "account" }],
        outputs: [{ type: "bool" }],
      },
      {
        name: "getConfig",
        type: "function",
        stateMutability: "view",
        inputs: [{ type: "address", name: "account" }],
        outputs: [
          {
            type: "tuple",
            components: [
              { type: "uint64", name: "version" },
              { type: "uint8", name: "threshold" },
              {
                type: "tuple[]",
                name: "owners",
                components: [
                  { type: "address", name: "owner" },
                  { type: "uint8", name: "weight" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "updateConfig",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { type: "uint8", name: "threshold" },
          {
            type: "tuple[]",
            name: "owners",
            components: [
              { type: "address", name: "owner" },
              { type: "uint8", name: "weight" },
            ],
          },
        ],
        outputs: [],
      },
      {
        name: "MultisigInitialized",
        type: "event",
        inputs: [{ type: "address", name: "account", indexed: !0 }],
      },
      {
        name: "MultisigConfigUpdated",
        type: "event",
        inputs: [
          { type: "address", name: "account", indexed: !0 },
          { type: "uint8", name: "threshold" },
          {
            type: "tuple[]",
            name: "owners",
            components: [
              { type: "address", name: "owner" },
              { type: "uint8", name: "weight" },
            ],
          },
        ],
      },
      { name: "NotMultisigAccount", type: "error", inputs: [] },
      { name: "InvalidAccount", type: "error", inputs: [] },
      { name: "InvalidConfig", type: "error", inputs: [] },
      { name: "InvalidThreshold", type: "error", inputs: [] },
      { name: "InvalidOwner", type: "error", inputs: [] },
      { name: "InvalidWeight", type: "error", inputs: [] },
      { name: "TooManyOwners", type: "error", inputs: [] },
      { name: "DuplicateOwner", type: "error", inputs: [] },
      { name: "InvalidOwnerOrder", type: "error", inputs: [] },
      { name: "AccountAlreadyInitialized", type: "error", inputs: [] },
      { name: "UnauthorizedCaller", type: "error", inputs: [] },
      { name: "SameTransactionUpdateNotAllowed", type: "error", inputs: [] },
    ],
    z = [
      {
        name: "recover",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "bytes32", name: "hash" },
          { type: "bytes", name: "signature" },
        ],
        outputs: [{ type: "address", name: "signer" }],
      },
      {
        name: "verify",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "signer" },
          { type: "bytes32", name: "hash" },
          { type: "bytes", name: "signature" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        name: "verifyKeychain",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "bytes32", name: "hash" },
          { type: "bytes", name: "signature" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        name: "verifyKeychainAdmin",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "address", name: "account" },
          { type: "bytes32", name: "hash" },
          { type: "bytes", name: "signature" },
        ],
        outputs: [{ type: "bool" }],
      },
      { name: "InvalidFormat", type: "error", inputs: [] },
      { name: "InvalidSignature", type: "error", inputs: [] },
    ];
  [...S, ...M, ...z];
  var U = e.i(12550),
    C = e.i(987303),
    R = e.i(185962),
    F = e.i(755805),
    O = e.i(93398),
    $ = e.i(379101),
    L = e.i(702133);
  function j(e) {
    return e.startsWith("tempo")
      ? (function (e) {
          if (!e.startsWith("tempox")) throw new K({ address: e });
          let t = e.slice(6);
          return (s.n(t, { strict: !0 }), { address: U.Y(t) });
        })(e).address
      : e;
  }
  class K extends L.f {
    constructor({ address: e }) {
      (super(`Tempo address "${e}" has an invalid prefix. Expected "tempox".`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TempoAddress.InvalidPrefixError",
        }));
    }
  }
  function G(e, t = {}) {
    if ("keyId" in e) return D(e);
    (void 0 !== e.witness && X(e.witness), e.signature && Y(e.signature));
    let r = {
      ...e,
      address: j(e.address),
      ...(e.limits
        ? { limits: e.limits.map((e) => ({ ...e, token: j(e.token) })) }
        : {}),
      ...(e.scopes
        ? {
            scopes: e.scopes.map((e) => ({
              ...e,
              address: j(e.address),
              selector: Z(e.selector),
              ...(e.recipients
                ? { recipients: e.recipients.map((e) => j(e)) }
                : {}),
            })),
          }
        : {}),
    };
    if (t.signature) {
      let e = $.from(t.signature);
      return (Y(e), { ...r, signature: e });
    }
    return r;
  }
  function D(e) {
    let {
        allowedCalls: t,
        chainId: r,
        keyId: n,
        expiry: i,
        limits: a,
        keyType: o,
      } = e,
      u = e.witness ?? void 0,
      l = e.isAdmin ?? void 0,
      c = e.account ?? void 0,
      f = $.fromRpc(e.signature);
    (Y(f), void 0 !== u && X(u));
    let d = t
      ? t.flatMap((e) =>
          e.selectorRules && 0 !== e.selectorRules.length
            ? e.selectorRules.map((t) => {
                var r;
                return {
                  address: e.target,
                  selector:
                    "string" == typeof (r = t.selector)
                      ? r
                      : Array.isArray(r)
                        ? s.J(new Uint8Array(r))
                        : r,
                  ...(t.recipients && t.recipients.length > 0
                    ? { recipients: t.recipients }
                    : {}),
                };
              })
            : [{ address: e.target }],
        )
      : void 0;
    return {
      address: n,
      chainId: "0x" === r ? 0n : s.k(r),
      ...(null != i ? { expiry: Number(i) } : {}),
      limits: a?.map((e) => ({
        token: e.token,
        limit: BigInt(e.limit),
        ...(e.period && J(e.period) > 0 ? { period: J(e.period) } : {}),
      })),
      ...(d ? { scopes: d } : {}),
      signature: f,
      type: o,
      ...(void 0 !== u ? { witness: u } : {}),
      ...(void 0 !== c ? { account: c, isAdmin: l ?? !1 } : {}),
    };
  }
  function q(e) {
    let [t, r] = e,
      [n, i, a, ...o] = t,
      u = (() => {
        switch (i) {
          case "0x":
          case "0x00":
            return "secp256k1";
          case "0x01":
            return "p256";
          case "0x02":
            return "webAuthn";
          default:
            throw Error(`Invalid key type: ${i}`);
        }
      })(),
      [l, c, f, d, p, y] = o,
      h = Q(l) ? void 0 : J(l) || void 0,
      m =
        Array.isArray(c) && c.length > 0
          ? c.map((e) => {
              var t;
              let [r, n, i] = e;
              return {
                token: r,
                limit: "0x" === (t = n) ? 0n : BigInt(t),
                ...(void 0 !== i ? { period: J(i) } : {}),
              };
            })
          : void 0,
      g = Array.isArray(f)
        ? f.flatMap((e) => {
            let [t, r] = e;
            return Array.isArray(r) && 0 !== r.length
              ? r.map((e) => {
                  let [r, n] = e;
                  return {
                    address: t,
                    selector: r,
                    ...(Array.isArray(n) && n.length > 0
                      ? { recipients: n }
                      : {}),
                  };
                })
              : [{ address: t }];
          })
        : void 0,
      b = Q(d) ? void 0 : d;
    void 0 !== b && X(b);
    let w = (() => {
        if (!Q(p)) {
          if ("0x01" !== p) throw new et(p);
          return !0;
        }
      })(),
      v = Q(y) ? void 0 : y,
      x = {
        address: a,
        chainId: "0x" === n ? 0n : s.k(n),
        type: u,
        ...(void 0 !== h ? { expiry: h } : {}),
        ...(void 0 !== m ? { limits: m } : {}),
        ...(void 0 !== g ? { scopes: g } : {}),
        ...(void 0 !== b ? { witness: b } : {}),
        ...(void 0 !== v ? { account: v, isAdmin: w ?? !1 } : {}),
      };
    if (r) {
      let e = $.deserialize(r);
      (Y(e), (x.signature = e));
    }
    return G(x);
  }
  function W(e) {
    let {
      address: t,
      scopes: r,
      chainId: n,
      expiry: i,
      limits: a,
      type: o,
      signature: u,
      witness: l,
      isAdmin: c,
      account: f,
    } = e;
    (Y(u), void 0 !== l && X(l));
    let d = (() => {
      if (!r) return;
      let e = new Map();
      for (let t of r) {
        let r = t.address;
        (e.has(r) || e.set(r, []),
          t.selector &&
            e
              .get(r)
              .push({
                selector: Z(t.selector),
                ...(t.recipients && t.recipients.length > 0
                  ? { recipients: t.recipients }
                  : {}),
              }));
      }
      return [...e.entries()].map(([e, t]) => ({
        target: e,
        ...(t.length > 0 ? { selectorRules: t } : {}),
      }));
    })();
    return {
      chainId: 0n === n ? "0x" : s.u(n),
      expiry: "number" == typeof i ? s.u(i) : null,
      keyId: j(t),
      keyType: o,
      limits: a?.map(({ token: e, limit: t, period: r }) => ({
        token: e,
        limit: s.u(t),
        ...(r ? { period: H(r) } : {}),
      })),
      signature: $.toRpc(u),
      ...(d ? { allowedCalls: d } : {}),
      ...(void 0 !== l ? { witness: l } : {}),
      ...(c ? { isAdmin: !0 } : {}),
      ...(void 0 !== f ? { account: f } : {}),
    };
  }
  function _(e) {
    let {
      address: t,
      chainId: r,
      scopes: n,
      expiry: i,
      limits: a,
      witness: s,
      isAdmin: o,
      account: u,
    } = e;
    void 0 !== s && X(s);
    let l = (() => {
        if (e.signature) return (Y(e.signature), $.serialize(e.signature));
      })(),
      c = (() => {
        switch (e.type) {
          case "secp256k1":
            return "0x";
          case "p256":
            return "0x01";
          case "webAuthn":
            return "0x02";
          default:
            throw Error(`Invalid key type: ${e.type}`);
        }
      })(),
      f = a?.map((e) => {
        let t = [e.token, V(e.limit)];
        return (e.period && e.period > 0 && t.push(H(e.period)), t);
      }),
      d = (() => {
        if (!n) return;
        let e = new Map();
        for (let t of n) {
          let r = t.address;
          (e.has(r) || e.set(r, []),
            t.selector && e.get(r).push([Z(t.selector), t.recipients ?? []]));
        }
        return [...e.entries()].map(([e, t]) => [e, t.map(([e, t]) => [e, t])]);
      })(),
      p = void 0 !== s || o || void 0 !== u,
      y = [
        { value: null != i && 0 !== i ? H(i) : void 0, placeholder: "0x" },
        { value: f, placeholder: p ? "0x" : [] },
        { value: d, placeholder: "0x" },
        { value: s, placeholder: "0x" },
        { value: o ? "0x01" : void 0, placeholder: "0x" },
        { value: u, placeholder: "0x" },
      ],
      h = -1;
    for (let e = y.length - 1; e >= 0; e--)
      if (void 0 !== y[e].value) {
        h = e;
        break;
      }
    let m = y.slice(0, h + 1).map(({ value: e, placeholder: t }) => e ?? t);
    return [[V(r), c, t, ...m], ...(l ? [l] : [])];
  }
  function V(e) {
    return 0n === e ? "0x" : s.u(e);
  }
  function H(e) {
    return 0 === e ? "0x" : s.u(e);
  }
  function J(e) {
    return "0x" === e ? 0 : s.L(e);
  }
  function Z(e) {
    if (e) return e.startsWith("0x") ? e : R.e(e);
  }
  function X(e) {
    if (32 !== s.o(e)) throw new ee(e);
  }
  function Y(e) {
    if ("keychain" === e.type) throw new er(e.type);
  }
  function Q(e) {
    return void 0 === e || "0x" === e;
  }
  class ee extends Error {
    constructor(e) {
      (super(
        `Witness \`${e}\` must be exactly 32 bytes (got ${s.o(e)} bytes).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "KeyAuthorization.InvalidWitnessSizeError",
        }));
    }
  }
  class et extends Error {
    constructor(e) {
      (super(`Admin marker \`${e}\` is invalid; expected \`0x01\` (TIP-1049).`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "KeyAuthorization.InvalidAdminMarkerError",
        }));
    }
  }
  class er extends Error {
    constructor(e) {
      (super(
        `Signature type \`${e}\` is invalid for key authorizations; expected \`secp256k1\`, \`p256\`, \`webAuthn\`, or \`multisig\`.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "KeyAuthorization.InvalidSignatureTypeError",
        }));
    }
  }
  e.s(
    [
      "from",
      0,
      G,
      "fromRpc",
      0,
      D,
      "fromTuple",
      0,
      q,
      "getSignPayload",
      0,
      function (e) {
        return (function (e) {
          let [t] = _(e),
            r = O.E(t);
          return F.y(r);
        })(e);
      },
      "toRpc",
      0,
      W,
      "toTuple",
      0,
      _,
    ],
    517165,
  );
  var en = e.i(517165),
    en = en,
    ei = en,
    ea = $;
  function es(e) {
    return "multisig" === e.source;
  }
  async function eo(e, t) {
    let {
        init: r = !1,
        payload: n,
        signatures: i = [],
        states: a = [],
        version: s = 0n,
      } = t,
      o = a.find((t) => U.M(t.account, e.address)),
      u = o?.config ?? e.config;
    if (!u)
      throw Error("Current multisig config is required for local signing.");
    let l = A.f.getSignPayload({ account: e.address, payload: n, version: s }),
      f = [...i],
      d = new Set(),
      y = 0;
    for (let e of i) {
      let t = p.f.extractAddress({ payload: l, signature: e }).toLowerCase(),
        r = u.owners.find((e) => U.M(e.owner, t));
      !r || d.has(t) || (d.add(t), (y += Number(r.weight)));
    }
    for (let t of u.owners) {
      let r = t.owner.toLowerCase();
      if (d.has(r)) continue;
      let n = e.owners.find((e) => U.M(e.address, t.owner));
      if (n) {
        if (es(n)) {
          let e = a.find((e) => U.M(e.account, n.address));
          if (e && !e.initialized)
            throw Error("Nested multisig owners must be initialized.");
          f.push(await eo(n, { payload: l, states: a, version: e?.version }));
        } else {
          if (!n.sign) throw Error("Multisig owner account cannot sign.");
          f.push(c.f.from(await n.sign({ hash: l })));
        }
        if ((d.add(r), (y += Number(t.weight)) >= Number(u.threshold))) break;
      }
    }
    if (y < Number(u.threshold))
      throw Error("Local multisig owners do not meet the threshold.");
    if (r && !e.config)
      throw Error("Initial multisig config is required for bootstrap.");
    return c.f.from({
      account: e.address,
      ...(r ? { init: e.config } : {}),
      signatures: ea.sortMultisigApprovals({
        account: e.address,
        payload: n,
        signatures: f,
        version: s,
      }),
    });
  }
  function eu(e) {
    return "accessKey" === e.source && "accessKeyAddress" in e;
  }
  function el(e, t) {
    let {
        admin: r,
        chainId: n,
        expiry: i,
        key: a,
        limits: s,
        scopes: o,
        witness: u,
      } = t,
      { accessKeyAddress: l, keyType: c } = ef(a),
      f = eu(e) || es(e) ? { account: e.address } : {};
    return en.getSignPayload({
      address: l,
      chainId: n,
      type: c,
      witness: u,
      ...(r ? { isAdmin: !0 } : {}),
      ...f,
      ...(r ? {} : { expiry: i, limits: s, scopes: o }),
    });
  }
  async function ec(e, t) {
    let {
        admin: r,
        chainId: n,
        expiry: i,
        key: a,
        limits: s,
        multisig: o,
        scopes: u,
        signatures: l,
        witness: f,
      } = t,
      { accessKeyAddress: d, keyType: p } = ef(a),
      y = eu(e),
      h = es(e),
      m = y || h ? { account: e.address } : {},
      g = el(e, t),
      b = await (async () => {
        if (y) return e.sign({ hash: g, raw: !0 });
        if (h) {
          if (!o)
            throw Error(
              "Multisig state is required to sign a key authorization.",
            );
          return $.serialize(
            await eo(e, {
              init: o.init,
              payload: g,
              signatures: l?.map((e) => c.f.from(e)),
              states: o.states,
              version: o.version,
            }),
          );
        }
        return e.sign({ hash: g });
      })();
    return ei.from({
      address: d,
      chainId: n,
      signature: c.f.from(b),
      type: p,
      ...(f ? { witness: f } : {}),
      ...(r ? { isAdmin: !0 } : {}),
      ...m,
      ...(r ? {} : { expiry: i, limits: s, scopes: u }),
    });
  }
  function ef(e) {
    return "accessKeyAddress" in e
      ? { accessKeyAddress: e.accessKeyAddress, keyType: e.keyType }
      : "publicKey" in e && e.publicKey
        ? { accessKeyAddress: U.E(C.E(e.publicKey)), keyType: e.type }
        : { accessKeyAddress: e.address, keyType: e.type };
  }
  var ed = L;
  let ep = {
    4217: { base: 4217e5, range: 100261e4 },
    42431: { base: 142431e4, range: 0x2b1ac110 },
  };
  ep[4217].base;
  class ey extends ed.f {
    constructor({ sourceId: e }) {
      (super(`Source chain ID "${e}" is not supported.`, {
        metaMessages: ["Supported source chain IDs: 4217, 42431."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ZoneId.UnsupportedSourceIdError",
        }));
    }
  }
  function eh(e) {
    if (4217 === e || 42431 === e) return ep[e];
    throw new ey({ sourceId: e });
  }
  e.s(
    [
      "fromChainId",
      0,
      function (e, t = 4217) {
        return e - eh(t).base;
      },
      "toChainId",
      0,
      function (e, t = 4217) {
        let { base: r, range: n } = eh(t);
        return r + (e % n);
      },
    ],
    342339,
  );
  var em = e.i(342339),
    em = em;
  (em.toChainId(0), em.toChainId(0, 42431));
  let eg = "0xaAAAaaAA00000000000000000000000000000000",
    eb = "0xAACC000000000000000000000000000000000000",
    ew = [
      "genesis",
      "t0",
      "t1",
      "t1a",
      "t1b",
      "t1c",
      "t2",
      "t3",
      "t4",
      "t5",
      "t6",
    ];
  var ev = e.i(927974),
    ex = e.i(815727);
  function eP(e) {
    let t = new Map();
    return (r) => {
      let n = r.toLowerCase(),
        i = t.get(n);
      if (i) return i;
      let a = (async () => {
        try {
          let t = await e(r);
          return {
            account: r,
            config: { owners: t.owners, threshold: t.threshold },
            initialized: !0,
            version: t.version,
          };
        } catch (t) {
          let e = t instanceof ev.f ? t.walk((e) => e instanceof ex.P) : void 0;
          if (
            !(e instanceof ex.P) ||
            e.data?.errorName !== "NotMultisigAccount"
          )
            throw t;
          return { account: r, initialized: !1, version: 0n };
        }
      })();
      return (t.set(n, a), a);
    };
  }
  function ek(e, t) {
    let r = [e],
      n = new Set([e.address.toLowerCase()]),
      i = (e) => {
        for (let t of e.owners) {
          if ("multisig" !== t.source) continue;
          let e = t.address.toLowerCase();
          n.has(e) || (n.add(e), r.push(t), i(t));
        }
      };
    return (i(e), Promise.all(r.map((e) => t(e.address))));
  }
  var eA = e.i(421957);
  function eI(e) {
    return { ...e, data: (0, eA.f)(e), to: e.address };
  }
  async function eB(e, t) {
    let { account: r, ...n } = t;
    return (0, B.f)(e, { ...n, ...eB.call({ account: r }) });
  }
  async function eE(e, t) {
    let { account: r, ...n } = t;
    return (0, B.f)(e, { ...n, ...eE.call({ account: r }) });
  }
  async function eN(e, t) {
    return eN.inner(N.f, e, t);
  }
  (((eB || (eB = {})).call = function (e) {
    return eI({
      address: eb,
      abi: M,
      args: [e.account],
      functionName: "isMultisigAccount",
    });
  }),
    ((eE || (eE = {})).call = function (e) {
      return eI({
        address: eb,
        abi: M,
        args: [e.account],
        functionName: "getConfig",
      });
    }));
  var eT = eN || (eN = {});
  async function eS(e, t, r) {
    let { owners: n, threshold: i, ...a } = r;
    return await e(t, { ...a, ...eT.call({ owners: n, threshold: i }) });
  }
  ((eT.inner = eS),
    (eT.call = function (e) {
      let t = o.f.from(e);
      return eI({
        address: eb,
        abi: M,
        args: [t.threshold, t.owners],
        functionName: "updateConfig",
      });
    }),
    (eT.extractEvent = function (e) {
      let [t] = (0, T.f)({
        abi: M,
        logs: e,
        eventName: "MultisigConfigUpdated",
        strict: !0,
      });
      if (!t) throw Error("`MultisigConfigUpdated` event not found.");
      return t;
    }));
  let eM = { 0: "secp256k1", 1: "p256", 2: "webAuthn" },
    ez = { true: "limited", false: "unlimited" };
  async function eU(e, t) {
    return eU.inner(E.f, e, t);
  }
  async function eC(e, t) {
    return eC.inner(N.f, e, t);
  }
  (((t = eU || (eU = {})).inner = async function (e, t, r) {
    let {
        accessKey: n,
        admin: i,
        chainId: a = t.chain?.id,
        expiry: s,
        limits: o,
        scopes: u,
        witness: l,
        ...c
      } = r,
      f = c.account ?? t.account;
    if (!f) throw Error("account is required.");
    if (!a) throw Error("chainId is required.");
    let d = await eW(t, {
      account: f,
      accessKey: n,
      chainId: a,
      admin: i,
      expiry: s,
      limits: o,
      scopes: u,
      witness: l,
    });
    return await e(t, { ...c, keyAuthorization: d });
  }),
    (t.extractEvent = function (e) {
      let [t] = (0, T.f)({
        abi: S,
        logs: e,
        eventName: "KeyAuthorized",
        strict: !0,
      });
      if (!t) throw Error("`KeyAuthorized` event not found.");
      return t;
    }));
  var eR = eC || (eC = {});
  async function eF(e, t, r) {
    let { witness: n, ...i } = r,
      a = eR.call({ witness: n });
    return await e(t, { ...i, ...a });
  }
  async function eO(e, t) {
    let { account: r = e.account, accessKey: n, ...i } = t;
    if (!r) throw Error("account is required.");
    let a = (0, I.f)(r),
      s = await (0, B.f)(e, {
        ...i,
        account: null,
        ...eO.call({ account: a.address, accessKey: n }),
      });
    return {
      address: s.keyId,
      keyType: eM[s.signatureType] ?? "secp256k1",
      expiry: s.expiry,
      spendPolicy: ez[`${s.enforceLimits}`],
      isRevoked: s.isRevoked,
    };
  }
  async function e$(e, t) {
    let { account: r = e.account, accessKey: n, token: i, ...a } = t;
    if (!r) throw Error("account is required.");
    let s = (0, I.f)(r),
      o = e.chain?.hardfork;
    if (o && ew.indexOf(o) < ew.indexOf("t3"))
      return {
        remaining: await (0, B.f)(e, {
          ...a,
          ...e$.call({ account: s.address, accessKey: n, token: i }),
        }),
        periodEnd: void 0,
      };
    let [u, l] = await (0, B.f)(e, {
      ...a,
      ...e$.callWithPeriod({ account: s.address, accessKey: n, token: i }),
    });
    return { remaining: u, periodEnd: l };
  }
  async function eL(e, t) {
    let { account: r = e.account, accessKey: n, ...i } = t;
    if (!r) throw Error("account is required.");
    let a = (0, I.f)(r);
    return (0, B.f)(e, {
      ...i,
      account: null,
      ...eL.call({ account: a.address, accessKey: n }),
    });
  }
  async function ej(e, t) {
    let { account: r = e.account, witness: n, ...i } = t;
    if (!r) throw Error("account is required.");
    let a = (0, I.f)(r);
    return (0, B.f)(e, {
      ...i,
      account: null,
      ...ej.call({ account: a.address, witness: n }),
    });
  }
  async function eK(e, t) {
    return eK.inner(N.f, e, t);
  }
  ((eR.inner = eF),
    (eR.call = function (e) {
      let { witness: t } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "burnKeyAuthorizationWitness",
        args: [t],
      });
    }),
    (eR.extractEvent = function (e) {
      let [t] = (0, T.f)({
        abi: S,
        logs: e,
        eventName: "KeyAuthorizationWitnessBurned",
        strict: !0,
      });
      if (!t) throw Error("`KeyAuthorizationWitnessBurned` event not found.");
      return t;
    }),
    ((eO || (eO = {})).call = function (e) {
      let { account: t, accessKey: r } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "getKey",
        args: [t, eZ(r)],
      });
    }),
    ((r = e$ || (e$ = {})).call = function (e) {
      let { account: t, accessKey: r, token: n } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "getRemainingLimit",
        args: [t, eZ(r), n],
      });
    }),
    (r.callWithPeriod = function (e) {
      let { account: t, accessKey: r, token: n } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "getRemainingLimitWithPeriod",
        args: [t, eZ(r), n],
      });
    }),
    ((eL || (eL = {})).call = function (e) {
      let { account: t, accessKey: r } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "isAdminKey",
        args: [t, eZ(r)],
      });
    }),
    ((ej || (ej = {})).call = function (e) {
      let { account: t, witness: r } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "isKeyAuthorizationWitnessBurned",
        args: [t, r],
      });
    }));
  var eG = eK || (eK = {});
  async function eD(e, t, r) {
    let { accessKey: n, ...i } = r,
      a = eG.call({ accessKey: n });
    return await e(t, { ...i, ...a });
  }
  async function eq(e, t) {
    let { chainId: r = e.chain?.id } = t,
      n = t.account ?? e.account;
    if (!n) throw Error("account is required.");
    if (!r) throw Error("chainId is required.");
    let i = (0, I.f)(n),
      a = await (async () => {
        if ("multisig" in t) return t.multisig;
        if ("multisig" !== i.source) return;
        let r = eP((t) => eE(e, { account: t })),
          n = await ek(i, r),
          a = n[0];
        return { init: !a.initialized, states: n, version: a.version };
      })(),
      s = el(i, { ...t, chainId: BigInt(r), key: t.accessKey }),
      o =
        "multisig" === i.source && a
          ? A.f.getSignPayload({
              account: i.address,
              payload: s,
              version: a.version,
            })
          : s;
    return { ...t, account: i, chainId: r, multisig: a, signPayload: o };
  }
  async function eW(e, t) {
    let {
      accessKey: r,
      account: n,
      chainId: i,
      multisig: a,
      signPayload: s,
      ...o
    } = "multisig" in t ? t : await eq(e, t);
    return ec(n, { chainId: BigInt(i), key: r, multisig: a, ...o });
  }
  async function e_(e, t) {
    return e_.inner(N.f, e, t);
  }
  ((eG.inner = eD),
    (eG.call = function (e) {
      let { accessKey: t } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "revokeKey",
        args: [eZ(t)],
      });
    }),
    (eG.extractEvent = function (e) {
      let [t] = (0, T.f)({
        abi: S,
        logs: e,
        eventName: "KeyRevoked",
        strict: !0,
      });
      if (!t) throw Error("`KeyRevoked` event not found.");
      return t;
    }));
  var eV = e_ || (e_ = {});
  async function eH(e, t, r) {
    let { accessKey: n, token: i, limit: a, ...s } = r,
      o = eV.call({ accessKey: n, token: i, limit: a });
    return await e(t, { ...s, ...o });
  }
  async function eJ(e, t) {
    let { account: r, admin: n, hash: i, signature: a, ...s } = t;
    return (0, B.f)(e, {
      ...s,
      ...eJ.call({ account: r, admin: n, hash: i, signature: a }),
    });
  }
  function eZ(e) {
    return "string" == typeof e ? e : e.accessKeyAddress;
  }
  ((eV.inner = eH),
    (eV.call = function (e) {
      let { accessKey: t, token: r, limit: n } = e;
      return eI({
        address: eg,
        abi: S,
        functionName: "updateSpendingLimit",
        args: [eZ(t), r, n],
      });
    }),
    (eV.extractEvent = function (e) {
      let [t] = (0, T.f)({
        abi: S,
        logs: e,
        eventName: "SpendingLimitUpdated",
        strict: !0,
      });
      if (!t) throw Error("`SpendingLimitUpdated` event not found.");
      return t;
    }),
    ((eJ || (eJ = {})).call = function (e) {
      let { account: t, admin: r = !0, hash: n, signature: i } = e;
      return eI({
        address: "0x5165300000000000000000000000000000000000",
        abi: z,
        functionName: r ? "verifyKeychainAdmin" : "verifyKeychain",
        args: [t, n, i],
      });
    }));
  var eX = e.i(425810),
    eY = e.i(829090);
  let eQ = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2",
      eip4844: "0x3",
      eip7702: "0x4",
    },
    e0 = {
      "0x0": "legacy",
      "0x1": "eip2930",
      "0x2": "eip1559",
      "0x3": "eip4844",
      "0x4": "eip7702",
    };
  function e1(e) {
    let { address: t, chainId: r, nonce: n } = e,
      i = $.fromRpc(e.signature);
    return { address: t, chainId: Number(r), nonce: BigInt(n), signature: i };
  }
  let e2 = { ...eQ, tempo: "0x76" },
    e5 = { ...e0, "0x76": "tempo" };
  e.s(
    [
      "fromRpc",
      0,
      function (e, t = {}) {
        if (!e) return null;
        let r = (function (e) {
          if (!e) return null;
          let t = eX.X(e),
            r = { ...e, ...t };
          return (
            (r.blockNumber = e.blockNumber ? BigInt(e.blockNumber) : null),
            "blockTimestamp" in e &&
              (r.blockTimestamp = e.blockTimestamp
                ? BigInt(e.blockTimestamp)
                : null === e.blockTimestamp
                  ? null
                  : void 0),
            (r.data = e.input),
            (r.gas = BigInt(e.gas ?? 0n)),
            (r.nonce = BigInt(e.nonce ?? 0n)),
            (r.transactionIndex = e.transactionIndex
              ? Number(e.transactionIndex)
              : null),
            (r.value = BigInt(e.value ?? 0n)),
            e.authorizationList &&
              (r.authorizationList = eY.o(e.authorizationList)),
            e.chainId && (r.chainId = Number(e.chainId)),
            e.gasPrice && (r.gasPrice = BigInt(e.gasPrice)),
            e.maxFeePerBlobGas &&
              (r.maxFeePerBlobGas = BigInt(e.maxFeePerBlobGas)),
            e.maxFeePerGas && (r.maxFeePerGas = BigInt(e.maxFeePerGas)),
            e.maxPriorityFeePerGas &&
              (r.maxPriorityFeePerGas = BigInt(e.maxPriorityFeePerGas)),
            e.type && (r.type = e0[e.type] ?? e.type),
            t && (r.v = eX.H(t.yParity)),
            r
          );
        })(e);
        return (
          (r.type = e5[e.type]),
          e.aaAuthorizationList &&
            ((r.authorizationList = e.aaAuthorizationList.map((e) => e1(e))),
            delete r.aaAuthorizationList),
          e.calls &&
            (r.calls = e.calls.map((e) => ({
              to: e.to,
              value: e.value && "0x" !== e.value ? BigInt(e.value) : void 0,
              data: e.input || e.data || "0x",
            }))),
          e.feeToken && (r.feeToken = e.feeToken),
          e.nonceKey && (r.nonceKey = BigInt(e.nonceKey)),
          e.signature && (r.signature = $.fromRpc(e.signature)),
          e.validAfter && (r.validAfter = Number(e.validAfter)),
          e.validBefore && (r.validBefore = Number(e.validBefore)),
          e.keyAuthorization && (r.keyAuthorization = D(e.keyAuthorization)),
          e.feePayerSignature &&
            ((r.feePayerSignature = eX.M(e.feePayerSignature)),
            (r.feePayerSignature.v = eX.H(r.feePayerSignature.yParity))),
          r
        );
      },
      "fromRpcType",
      0,
      e5,
      "toRpcType",
      0,
      e2,
    ],
    923543,
  );
  var e3 = e.i(923543),
    e3 = e3,
    e6 = e3;
  function e8(e) {
    if ("string" == typeof e) {
      let t = j(e);
      return (U.n(t), t);
    }
    let t = s.u(e, { size: 18 });
    return s.w("0x20c0", t);
  }
  e.s(
    [
      "toRpc",
      0,
      function (e) {
        var t;
        let r,
          n =
            ((t = { ...e, authorizationList: void 0 }),
            (r = {}),
            void 0 !== t.accessList && (r.accessList = t.accessList),
            void 0 !== t.authorizationList &&
              (r.authorizationList = eY.J(t.authorizationList)),
            void 0 !== t.blobVersionedHashes &&
              (r.blobVersionedHashes = t.blobVersionedHashes),
            void 0 !== t.blobs && (r.blobs = t.blobs),
            void 0 !== t.chainId && (r.chainId = s.u(t.chainId)),
            void 0 !== t.data
              ? ((r.data = t.data), (r.input = t.data))
              : void 0 !== t.input && ((r.data = t.input), (r.input = t.input)),
            void 0 !== t.from && (r.from = t.from),
            void 0 !== t.gas && (r.gas = s.u(t.gas)),
            void 0 !== t.gasPrice && (r.gasPrice = s.u(t.gasPrice)),
            void 0 !== t.maxFeePerBlobGas &&
              (r.maxFeePerBlobGas = s.u(t.maxFeePerBlobGas)),
            void 0 !== t.maxFeePerGas && (r.maxFeePerGas = s.u(t.maxFeePerGas)),
            void 0 !== t.maxPriorityFeePerGas &&
              (r.maxPriorityFeePerGas = s.u(t.maxPriorityFeePerGas)),
            void 0 !== t.maxPriorityFeePerGas &&
              (r.maxPriorityFeePerGas = s.u(t.maxPriorityFeePerGas)),
            void 0 !== t.nonce && (r.nonce = s.u(t.nonce)),
            void 0 !== t.to && (r.to = t.to),
            void 0 !== t.type && (r.type = eQ[t.type] || t.type),
            void 0 !== t.value && (r.value = s.u(t.value)),
            r);
        (e.authorizationList &&
          (n.authorizationList = e.authorizationList.map((e) =>
            (function (e) {
              let { address: t, chainId: r, nonce: n, signature: i } = e;
              return {
                address: t,
                chainId: s.u(r),
                nonce: s.u(n),
                signature: $.toRpc(i),
              };
            })(e),
          )),
          e.calls
            ? (n.calls = e.calls.map((e) => ({
                to: e.to ? j(e.to) : e.to,
                value: e.value ? s.u(e.value) : "0x",
                data: e.data ?? "0x",
              })))
            : (e.to || e.data || e.value) &&
              (n.calls = [
                {
                  to: e.to ? j(e.to) : void 0,
                  value: e.value ? s.u(e.value) : "0x",
                  data: e.data ?? "0x",
                },
              ]),
          void 0 !== e.feeToken && (n.feeToken = e8(e.feeToken)),
          e.keyAuthorization && (n.keyAuthorization = W(e.keyAuthorization)),
          void 0 !== e.validBefore && (n.validBefore = s.u(e.validBefore)),
          void 0 !== e.validAfter && (n.validAfter = s.u(e.validAfter)));
        let i =
          "random" === e.nonceKey
            ? s.W(6)
            : "bigint" == typeof e.nonceKey
              ? s.u(e.nonceKey)
              : void 0;
        return (
          i && (n.nonceKey = i),
          (void 0 !== e.calls ||
            void 0 !== e.feePayer ||
            void 0 !== e.feeToken ||
            void 0 !== e.keyAuthorization ||
            void 0 !== e.nonceKey ||
            void 0 !== e.validBefore ||
            void 0 !== e.validAfter ||
            "tempo" === e.type) &&
            ((n.type = e2.tempo),
            delete n.data,
            delete n.input,
            delete n.to,
            delete n.value),
          n
        );
      },
    ],
    535745,
  );
  var e4 = e.i(535745),
    e4 = e4,
    ea = $,
    e7 = L;
  class e9 extends e7.f {
    constructor({ storageKey: e }) {
      (super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${s.o(e)} bytes.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AccessList.InvalidStorageKeySizeError",
        }));
    }
  }
  var te = L,
    tt = e.i(847514),
    tr = L;
  let tn = { wei: 0, gwei: 9, szabo: 12, finney: 15, ether: 18 };
  function ti(e, t = "wei") {
    return (function (e, t = 0) {
      let r = e.toString(),
        n = r.startsWith("-");
      n && (r = r.slice(1));
      let [i, a] = [
        (r = r.padStart(t, "0")).slice(0, r.length - t),
        r.slice(r.length - t),
      ];
      return (
        (a = a.replace(/(0+)$/, "")),
        `${n ? "-" : ""}${i || "0"}${a ? `.${a}` : ""}`
      );
    })(e, tn.gwei - tn[t]);
  }
  L.f;
  class ta extends tr.f {
    constructor({ feeCap: e } = {}) {
      (super(
        `The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${e ? ` = ${ti(e)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TransactionEnvelope.FeeCapTooHighError",
        }));
    }
  }
  tr.f;
  class ts extends tr.f {
    constructor({ chainId: e }) {
      (super(
        void 0 !== e ? `Chain ID "${e}" is invalid.` : "Chain ID is invalid.",
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TransactionEnvelope.InvalidChainIdError",
        }));
    }
  }
  class to extends tr.f {
    constructor({ attributes: e, serialized: t, type: r }) {
      let n = Object.entries(e)
        .map(([e, t]) => (void 0 === t ? e : void 0))
        .filter(Boolean);
      (super(`Invalid serialized transaction of type "${r}" was provided.`, {
        metaMessages: [
          `Serialized Transaction: "${t}"`,
          n.length > 0 ? `Missing Attributes: ${n.join(", ")}` : "",
        ].filter(Boolean),
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TransactionEnvelope.InvalidSerializedError",
        }));
    }
  }
  class tu extends tr.f {
    constructor({ maxPriorityFeePerGas: e, maxFeePerGas: t } = {}) {
      (super(
        `The provided tip (\`maxPriorityFeePerGas\`${e ? ` = ${ti(e)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${t ? ` = ${ti(t)} gwei` : ""}).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TransactionEnvelope.TipAboveFeeCapError",
        }));
    }
  }
  let tl = "tempo";
  function tc(e) {
    let {
      calls: t,
      chainId: r,
      maxFeePerGas: n,
      maxPriorityFeePerGas: i,
      validBefore: a,
      validAfter: s,
    } = e;
    if (!t || 0 === t.length) throw new th();
    if ("number" == typeof a && "number" == typeof s && a <= s)
      throw new tm({ validBefore: a, validAfter: s });
    if (t) for (let e of t) e.to && U.n(e.to, { strict: !1 });
    if (r <= 0) throw new ts({ chainId: r });
    if (n && BigInt(n) > 2n ** 256n - 1n) throw new ta({ feeCap: n });
    if (i && n && i > n)
      throw new tu({ maxFeePerGas: n, maxPriorityFeePerGas: i });
  }
  function tf(e) {
    let t = O.g(s.M(e, 1)),
      [r, n, i, a, o, u, l, c, f, d, p, y, h, m, g] = t,
      b = Array.isArray(m) ? m : void 0,
      w = b ? g : m;
    if (13 !== t.length && 14 !== t.length && 15 !== t.length)
      throw new to({
        attributes: {
          authorizationList: h,
          chainId: r,
          maxPriorityFeePerGas: n,
          maxFeePerGas: i,
          gas: a,
          calls: o,
          accessList: u,
          keyAuthorization: b,
          nonceKey: l,
          nonce: c,
          validBefore: f,
          validAfter: d,
          feeToken: p,
          feePayerSignatureOrSender: y,
          ...(t.length > 12 ? { signature: w } : {}),
        },
        serialized: e,
        type: tl,
      });
    let v = { chainId: Number(r), type: tl };
    (s.g(a) && "0x" !== a && (v.gas = BigInt(a)),
      s.g(c) && (v.nonce = "0x" === c ? 0n : BigInt(c)),
      s.g(i) && "0x" !== i && (v.maxFeePerGas = BigInt(i)),
      s.g(n) && "0x" !== n && (v.maxPriorityFeePerGas = BigInt(n)),
      s.g(l) && (v.nonceKey = "0x" === l ? 0n : BigInt(l)),
      s.g(f) && "0x" !== f && (v.validBefore = Number(f)),
      s.g(d) && "0x" !== d && (v.validAfter = Number(d)),
      s.g(p) && "0x" !== p && (v.feeToken = p),
      o &&
        "0x" !== o &&
        (v.calls = o.map((e) => {
          let [t, r, n] = e,
            i = {};
          return (
            t && "0x" !== t && (i.to = t),
            r && "0x" !== r && (i.value = BigInt(r)),
            n && "0x" !== n && (i.data = n),
            i
          );
        })),
      u?.length !== 0 &&
        "0x" !== u &&
        (v.accessList = (function (e) {
          let t = [];
          for (let r = 0; r < e.length; r++) {
            let [n, i] = e[r];
            (n && U.n(n, { strict: !1 }),
              t.push({
                address: n,
                storageKeys: i.map((e) => (F.f(e) ? e : s.q(e))),
              }));
          }
          return t;
        })(u)),
      h?.length !== 0 &&
        "0x" !== h &&
        (v.authorizationList = (function (e) {
          let t = [];
          for (let r of e)
            t.push(
              (function (e) {
                let [t, r, n, i] = e,
                  a = {
                    address: r,
                    chainId: "0x" === t ? 0 : Number(t),
                    nonce: "0x" === n ? 0n : BigInt(n),
                  };
                return (
                  i && (a.signature = $.deserialize(i)),
                  (function (e, t = {}) {
                    if ("string" == typeof e.chainId) return e1(e);
                    let r = { ...e, address: j(e.address) };
                    return t.signature ? { ...r, signature: t.signature } : r;
                  })(a)
                );
              })(r),
            );
          return t;
        })(h)),
      "0x" !== y &&
        void 0 !== y &&
        ("0x00" === y || U.g(y)
          ? ((v.feePayerSignature = null), U.g(y) && (v.from = y))
          : (v.feePayerSignature = eX.K(y))),
      b && (v.keyAuthorization = q(b)));
    let x = w ? $.deserialize(w) : void 0;
    if ((x && (v = { ...v, signature: x }), !v.from && x))
      try {
        v.from = $.extractAddress({
          payload: ty(td(v)),
          signature: x,
          root: !0,
        });
      } catch {}
    return (tc(v), v);
  }
  function td(e, t = {}) {
    let { feePayerSignature: r, signature: n } = t,
      i = "string" == typeof e ? tf(e) : e;
    return (
      i.from && (i.from = j(i.from)),
      i.calls &&
        (i.calls = i.calls.map((e) => ({
          ...e,
          ...(e.to ? { to: j(e.to) } : {}),
        }))),
      tc(i),
      {
        ...i,
        ...(n ? { signature: $.from(n) } : {}),
        ...(r ? { feePayerSignature: eX.f(r) } : {}),
        type: "tempo",
      }
    );
  }
  function tp(e, t = {}) {
    let {
      accessList: r,
      authorizationList: n,
      calls: i,
      chainId: a,
      feeToken: o,
      gas: u,
      keyAuthorization: l,
      nonce: c,
      nonceKey: f,
      maxFeePerGas: d,
      maxPriorityFeePerGas: p,
      validBefore: y,
      validAfter: h,
    } = e;
    tc(e);
    let m = (function (e) {
        if (!e || 0 === e.length) return [];
        let t = [];
        for (let { address: r, storageKeys: n } of e) {
          for (let e = 0; e < n.length; e++)
            if (32 !== s.o(n[e])) throw new e9({ storageKey: n[e] });
          (r && U.n(r, { strict: !1 }), t.push([r, n]));
        }
        return t;
      })(r),
      g = t.signature || e.signature,
      b = (function (e) {
        if (!e || 0 === e.length) return [];
        let t = [];
        for (let r of e)
          t.push(
            (function (e) {
              let { address: t, chainId: r, nonce: n } = e,
                i = e.signature ? $.serialize(e.signature) : void 0;
              return [
                r ? s.u(r) : "0x",
                t,
                n ? s.u(n) : "0x",
                ...(i ? [i] : []),
              ];
            })(r),
          );
        return t;
      })(n),
      w = i.map((e) => [
        e.to ? j(e.to) : "0x",
        e.value ? s.u(e.value) : "0x",
        e.data ?? "0x",
      ]),
      v = !1,
      x = (() => {
        if (t.sender) return t.sender;
        if ("feePayer" === t.format && g) {
          let t = $.from(g);
          if ("keychain" === t.type) return t.userAddress;
          if ("p256" === t.type || "webAuthn" === t.type)
            return U.E(t.publicKey);
          if ("secp256k1" === t.type)
            return tt.R({ payload: ty(td(e)), signature: t.signature });
        }
        let r =
          void 0 !== t.feePayerSignature
            ? t.feePayerSignature
            : e.feePayerSignature;
        return null === r ? ((v = !0), "0x00") : r ? eX.G(r) : "0x";
      })(),
      P = [
        s.u(a),
        p ? s.u(p) : "0x",
        d ? s.u(d) : "0x",
        u ? s.u(u) : "0x",
        w,
        m,
        f ? s.u(f) : "0x",
        c ? s.u(c) : "0x",
        "number" == typeof y ? s.u(y) : "0x",
        "number" == typeof h ? s.u(h) : "0x",
        v || ("bigint" != typeof o && "string" != typeof o) ? "0x" : e8(o),
        x,
        b,
        ...(l ? [_(l)] : []),
        ...(g ? [$.serialize($.from(g))] : []),
      ];
    return s.w("feePayer" === t.format ? "0x78" : "0x76", O.E(P));
  }
  function ty(e, t = {}) {
    let r = (function (e, t = {}) {
      let r = t.presign
        ? tp({
            ...e,
            signature: void 0,
            ...(void 0 !== e.feePayerSignature
              ? { feePayerSignature: null }
              : {}),
          })
        : tp(e);
      return F.y(r);
    })(e, { presign: !0 });
    return t.from ? F.y(s.w("0x04", r, j(t.from))) : r;
  }
  class th extends te.f {
    constructor() {
      (super("Calls list cannot be empty."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TxEnvelopeTempo.CallsEmptyError",
        }));
    }
  }
  class tm extends te.f {
    constructor({ validBefore: e, validAfter: t }) {
      (super(`validBefore (${e}) must be greater than validAfter (${t}).`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "TxEnvelopeTempo.InvalidValidityWindowError",
        }));
    }
  }
  e.s(
    [
      "deserialize",
      0,
      tf,
      "from",
      0,
      td,
      "getFeePayerSignPayload",
      0,
      function (e, t) {
        let r = j(t.sender),
          n = tp(
            { ...e, signature: void 0 },
            { sender: r, format: "feePayer" },
          );
        return F.y(n);
      },
      "getSignPayload",
      0,
      ty,
      "serialize",
      0,
      tp,
    ],
    48107,
  );
  var tg = e.i(48107),
    tg = tg,
    tb = tg,
    tw = tg,
    tv = tg,
    tx = tg,
    tP = e.i(629173),
    tk = e.i(147864),
    tA = e.i(703114),
    tI = e.i(177008),
    tB = e.i(927749),
    tE = e.i(663903),
    tN = e.i(512753),
    tT = e.i(850697),
    tS = e.i(990963),
    tM = e.i(377510),
    tz = e.i(212174),
    tU = e.i(411792),
    tC = e.i(562412),
    tR = e.i(64989),
    tF = e.i(790336),
    tO = e.i(858042),
    t$ = e.i(415415),
    tL = e.i(612164),
    tj = e.i(339513);
  function tK(e) {
    let { chainId: t, maxPriorityFeePerGas: r, maxFeePerGas: n, to: i } = e;
    if (t <= 0) throw new tR.O({ chainId: t });
    if (i && !(0, tO.f)(i)) throw new tU.f({ address: i });
    if (n && n > m.f) throw new tF.k({ maxFeePerGas: n });
    if (r && n && r > n)
      throw new tF.M({ maxFeePerGas: n, maxPriorityFeePerGas: r });
  }
  function tG(e) {
    if (!e || 0 === e.length) return [];
    let t = [];
    for (let r = 0; r < e.length; r++) {
      let { address: n, storageKeys: i } = e[r];
      for (let e = 0; e < i.length; e++)
        if (i[e].length - 2 != 64) throw new tk.J({ storageKey: i[e] });
      if (!(0, tO.f)(n, { strict: !1 })) throw new tU.f({ address: n });
      t.push([n, i]);
    }
    return t;
  }
  function tD(e, t) {
    let r = (0, tP.f)(e);
    return "eip1559" === r
      ? (function (e, t) {
          let {
            chainId: r,
            gas: n,
            nonce: i,
            to: a,
            value: s,
            maxFeePerGas: o,
            maxPriorityFeePerGas: u,
            accessList: l,
            data: c,
          } = e;
          tK(e);
          let f = tG(l),
            d = [
              (0, tA.N)(r),
              i ? (0, tA.N)(i) : "0x",
              u ? (0, tA.N)(u) : "0x",
              o ? (0, tA.N)(o) : "0x",
              n ? (0, tA.N)(n) : "0x",
              a ?? "0x",
              s ? (0, tA.N)(s) : "0x",
              c ?? "0x",
              f,
              ...tq(e, t),
            ];
          return (0, tT.s)(["0x02", (0, tM.f)(d)]);
        })(e, t)
      : "eip2930" === r
        ? (function (e, t) {
            let {
              chainId: r,
              gas: n,
              data: i,
              nonce: a,
              to: s,
              value: o,
              accessList: u,
              gasPrice: l,
            } = e;
            !(function (e) {
              let {
                chainId: t,
                maxPriorityFeePerGas: r,
                gasPrice: n,
                maxFeePerGas: i,
                to: a,
              } = e;
              if (t <= 0) throw new tR.O({ chainId: t });
              if (a && !(0, tO.f)(a)) throw new tU.f({ address: a });
              if (r || i)
                throw new ev.f(
                  "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.",
                );
              if (n && n > m.f) throw new tF.k({ maxFeePerGas: n });
            })(e);
            let c = tG(u),
              f = [
                (0, tA.N)(r),
                a ? (0, tA.N)(a) : "0x",
                l ? (0, tA.N)(l) : "0x",
                n ? (0, tA.N)(n) : "0x",
                s ?? "0x",
                o ? (0, tA.N)(o) : "0x",
                i ?? "0x",
                c,
                ...tq(e, t),
              ];
            return (0, tT.s)(["0x01", (0, tM.f)(f)]);
          })(e, t)
        : "eip4844" === r
          ? (function (e, t) {
              let {
                chainId: r,
                gas: n,
                nonce: i,
                to: a,
                value: s,
                maxFeePerBlobGas: o,
                maxFeePerGas: u,
                maxPriorityFeePerGas: l,
                accessList: c,
                data: f,
              } = e;
              !(function (e) {
                let { blobVersionedHashes: t } = e;
                if (t) {
                  if (0 === t.length) throw new tC.h();
                  for (let e of t) {
                    let t = (0, t$.f)(e),
                      r = (0, tj.T)((0, tL.M)(e, 0, 1));
                    if (32 !== t) throw new tC.S({ hash: e, size: t });
                    if (r !== tz.f) throw new tC.t({ hash: e, version: r });
                  }
                }
                tK(e);
              })(e);
              let d = e.blobVersionedHashes,
                p = e.sidecars;
              if (e.blobs && (void 0 === d || void 0 === p)) {
                let t =
                    "string" == typeof e.blobs[0]
                      ? e.blobs
                      : e.blobs.map((e) => (0, tA.v)(e)),
                  r = e.kzg,
                  n = (0, tI.f)({ blobs: t, kzg: r });
                if (
                  (void 0 === d && (d = (0, tE.f)({ commitments: n })),
                  void 0 === p)
                ) {
                  let e = (0, tB.f)({ blobs: t, commitments: n, kzg: r });
                  p = (0, tN.f)({ blobs: t, commitments: n, proofs: e });
                }
              }
              let y = tG(c),
                h = [
                  (0, tA.N)(r),
                  i ? (0, tA.N)(i) : "0x",
                  l ? (0, tA.N)(l) : "0x",
                  u ? (0, tA.N)(u) : "0x",
                  n ? (0, tA.N)(n) : "0x",
                  a ?? "0x",
                  s ? (0, tA.N)(s) : "0x",
                  f ?? "0x",
                  y,
                  o ? (0, tA.N)(o) : "0x",
                  d ?? [],
                  ...tq(e, t),
                ],
                m = [],
                g = [],
                b = [];
              if (p)
                for (let e = 0; e < p.length; e++) {
                  let { blob: t, commitment: r, proof: n } = p[e];
                  (m.push(t), g.push(r), b.push(n));
                }
              return (0, tT.s)([
                "0x03",
                p ? (0, tM.f)([h, m, g, b]) : (0, tM.f)(h),
              ]);
            })(e, t)
          : "eip7702" === r
            ? (function (e, t) {
                let {
                  authorizationList: r,
                  chainId: n,
                  gas: i,
                  nonce: a,
                  to: s,
                  value: o,
                  maxFeePerGas: u,
                  maxPriorityFeePerGas: l,
                  accessList: c,
                  data: f,
                } = e;
                !(function (e) {
                  let { authorizationList: t } = e;
                  if (t)
                    for (let e of t) {
                      let { chainId: t } = e,
                        r = e.address;
                      if (!(0, tO.f)(r)) throw new tU.f({ address: r });
                      if (t < 0) throw new tR.O({ chainId: t });
                    }
                  tK(e);
                })(e);
                let d = tG(c),
                  p = (function (e) {
                    if (!e || 0 === e.length) return [];
                    let t = [];
                    for (let r of e) {
                      let { chainId: e, nonce: n, ...i } = r,
                        a = r.address;
                      t.push([
                        e ? (0, tA.g)(e) : "0x",
                        a,
                        n ? (0, tA.g)(n) : "0x",
                        ...tq({}, i),
                      ]);
                    }
                    return t;
                  })(r);
                return (0, tT.s)([
                  "0x04",
                  (0, tM.f)([
                    (0, tA.N)(n),
                    a ? (0, tA.N)(a) : "0x",
                    l ? (0, tA.N)(l) : "0x",
                    u ? (0, tA.N)(u) : "0x",
                    i ? (0, tA.N)(i) : "0x",
                    s ?? "0x",
                    o ? (0, tA.N)(o) : "0x",
                    f ?? "0x",
                    d,
                    p,
                    ...tq(e, t),
                  ]),
                ]);
              })(e, t)
            : (function (e, t) {
                let {
                  chainId: r = 0,
                  gas: n,
                  data: i,
                  nonce: a,
                  to: s,
                  value: o,
                  gasPrice: u,
                } = e;
                !(function (e) {
                  let {
                    chainId: t,
                    maxPriorityFeePerGas: r,
                    gasPrice: n,
                    maxFeePerGas: i,
                    to: a,
                  } = e;
                  if (a && !(0, tO.f)(a)) throw new tU.f({ address: a });
                  if (void 0 !== t && t <= 0) throw new tR.O({ chainId: t });
                  if (r || i)
                    throw new ev.f(
                      "`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.",
                    );
                  if (n && n > m.f) throw new tF.k({ maxFeePerGas: n });
                })(e);
                let l = [
                  a ? (0, tA.N)(a) : "0x",
                  u ? (0, tA.N)(u) : "0x",
                  n ? (0, tA.N)(n) : "0x",
                  s ?? "0x",
                  o ? (0, tA.N)(o) : "0x",
                  i ?? "0x",
                ];
                if (t) {
                  let e = (() => {
                      if (t.v >= 35n)
                        return (t.v - 35n) / 2n > 0
                          ? t.v
                          : 27n + (35n === t.v ? 0n : 1n);
                      if (r > 0) return BigInt(2 * r) + BigInt(35n + t.v - 27n);
                      let e = 27n + (27n === t.v ? 0n : 1n);
                      if (t.v !== e) throw new tk.t({ v: t.v });
                      return e;
                    })(),
                    n = (0, tS.f)(t.r),
                    i = (0, tS.f)(t.s);
                  l = [
                    ...l,
                    (0, tA.N)(e),
                    "0x00" === n ? "0x" : n,
                    "0x00" === i ? "0x" : i,
                  ];
                } else r > 0 && (l = [...l, (0, tA.N)(r), "0x", "0x"]);
                return (0, tM.f)(l);
              })(e, t);
  }
  function tq(e, t) {
    let r = t ?? e,
      { v: n, yParity: i } = r;
    if (void 0 === r.r || void 0 === r.s || (void 0 === n && void 0 === i))
      return [];
    let a = (0, tS.f)(r.r),
      s = (0, tS.f)(r.s);
    return [
      "number" == typeof i
        ? i
          ? (0, tA.N)(1)
          : "0x"
        : 0n === n
          ? "0x"
          : 1n === n
            ? (0, tA.N)(1)
            : 27n === n
              ? "0x"
              : (0, tA.N)(1),
      "0x00" === a ? "0x" : a,
      "0x00" === s ? "0x" : s,
    ];
  }
  function tW(e) {
    let t = e.account;
    return (t?.keyType && "secp256k1" !== t.keyType) ||
      t?.source === "accessKey" ||
      t?.source === "multisig" ||
      void 0 !== e.calls ||
      void 0 !== e.feePayer ||
      void 0 !== e.feePayerSignature ||
      void 0 !== e.feeToken ||
      void 0 !== e.keyAuthorization ||
      void 0 !== e.multisig ||
      void 0 !== e.multisigVersion ||
      void 0 !== e.nonceKey ||
      void 0 !== e.signature ||
      void 0 !== e.signatures ||
      void 0 !== e.validBefore ||
      void 0 !== e.validAfter
      ? "tempo"
      : e.type
        ? e.type
        : (0, tP.f)(e);
  }
  function t_(e) {
    try {
      let t = tW(e);
      return "tempo" === t;
    } catch {
      return !1;
    }
  }
  async function tV(e, t) {
    if (!t_(e)) {
      if (t && "type" in t && "secp256k1" !== t.type)
        throw Error(
          "Unsupported signature type. Expected `secp256k1` but got `" +
            t.type +
            "`.",
        );
      if (t && "type" in t) {
        let { r, s: n, yParity: i } = t?.signature;
        return tD(e, {
          r: s.u(r, { size: 32 }),
          s: s.u(n, { size: 32 }),
          yParity: i,
        });
      }
      return tD(e, t);
    }
    if ("tempo" === tW(e)) return tH(e, t);
    throw Error("Unsupported transaction type");
  }
  async function tH(e, t) {
    let r,
      n = e.signature
        ? e.signature
        : t && "type" in t
          ? t
          : t
            ? c.f.from({
                r: BigInt(t.r),
                s: BigInt(t.s),
                yParity: Number(t.yParity),
              })
            : void 0,
      { chainId: i, feePayer: a, nonce: s, ...o } = e,
      u = (r = e.feePayerSignature)
        ? { r: BigInt(r.r), s: BigInt(r.s), yParity: Number(r.yParity) }
        : null === r || a
          ? null
          : void 0,
      l = void 0 !== e.feePayerSignature && null !== e.feePayerSignature,
      f = void 0 !== n || !!(e.multisig && e.signatures),
      d = {
        ...o,
        calls: o.calls?.length
          ? o.calls
          : [
              {
                to:
                  o.to ||
                  (o.data && "0x" !== o.data
                    ? void 0
                    : "0x0000000000000000000000000000000000000000"),
                value: o.value,
                data: o.data,
              },
            ],
        chainId: Number(i),
        feePayerSignature: u,
        type: "tempo",
        ...(s ? { nonce: BigInt(s) } : {}),
      },
      y = { ...d };
    ((!0 !== a || (f && u)) && ("object" != typeof a || f) && (f || !l)) ||
      delete y.feeToken;
    let h = (() => {
      if (n) return n;
      if (!e.multisig || !e.signatures) return;
      let t = tb.getSignPayload(tw.from(y)),
        r = e.signatures.map((e) => c.f.from(e)),
        i =
          "string" == typeof e.multisig
            ? ea.sortMultisigApprovals({
                account: e.multisig,
                payload: t,
                signatures: r,
                version: e.multisigVersion,
              })
            : ea.sortMultisigApprovals({
                initialConfig: e.multisig,
                payload: t,
                signatures: r,
                version: e.multisigVersion,
              }),
        a = e.keyAuthorization?.signature,
        o = a?.type === "multisig" && void 0 !== a.init;
      return "string" == typeof e.multisig
        ? c.f.from({ account: e.multisig, signatures: i })
        : c.f.from({
            initialConfig: e.multisig,
            signatures: i,
            ...(s || e.nonceKey || o ? {} : { init: !0 }),
          });
    })();
    if (h && "object" == typeof e.feePayer) {
      let t = tw.from(d, { signature: h }),
        r =
          e.from ??
          p.f.extractAddress({
            payload: tb.getSignPayload(t),
            root: !0,
            signature: h,
          }),
        n = tx.getFeePayerSignPayload(t, { sender: r }),
        i = await e.feePayer.sign({ hash: n });
      return tv.serialize(t, { feePayerSignature: eX.f(i) });
    }
    return !0 === a || (!h && l)
      ? h && u
        ? tv.serialize(y, { signature: h })
        : h
          ? tv.serialize(y, {
              format: "feePayer",
              sender: e.from,
              signature: h,
            })
          : tv.serialize(y, { feePayerSignature: null })
      : tv.serialize(y, { feePayerSignature: void 0, signature: h });
  }
  function tJ(e) {
    if (!e) return e;
    let t = (e.length - 2) / 2;
    return t <= 4 ? e : s.u(t, { size: 2 });
  }
  let tZ = new Map();
  async function tX(e) {
    (tZ.set(e, (tZ.get(e) ?? 0) + 1), await Promise.resolve());
    let t = (tZ.get(e) ?? 0) > 1;
    return (
      queueMicrotask(() => {
        let t = tZ.get(e) ?? 0;
        t <= 1 ? tZ.delete(e) : tZ.set(e, t - 1);
      }),
      t
    );
  }
  let tY = {
      blockTime: 1e3,
      extendSchema: (0, b.S)(),
      formatters: {
        transaction: (0, w.K)({
          exclude: ["aaAuthorizationList"],
          format: function (e) {
            if (!t_(e)) return (0, w.F)(e);
            let t =
                null == e.blockTimestamp ? void 0 : BigInt(e.blockTimestamp),
              {
                feePayerSignature: r,
                gasPrice: n,
                nonce: i,
                ...a
              } = e3.fromRpc(e);
            return {
              ...a,
              accessList: a.accessList,
              ...(void 0 !== t && { blockTimestamp: t }),
              feePayerSignature: r
                ? {
                    r: s.u(r.r, { size: 32 }),
                    s: s.u(r.s, { size: 32 }),
                    v: BigInt(r.v ?? 27),
                    yParity: r.yParity,
                  }
                : void 0,
              nonce: Number(i),
              typeHex: e6.toRpcType[a.type],
              type: a.type,
            };
          },
        }),
        transactionReceipt: (0, v.l)({
          format: function (e) {
            return (0, v.L)(e);
          },
        }),
        transactionRequest: (0, x.V)({
          format: function (e, t) {
            let r,
              n = e.account ? (0, I.f)(e.account) : void 0;
            if (!t_(e)) return (0, x.F)(e, t);
            (t &&
              (e.calls = e.calls ?? [
                {
                  to:
                    e.to ||
                    (e.data && "0x" !== e.data
                      ? void 0
                      : "0x0000000000000000000000000000000000000000"),
                  value: e.value,
                  data: e.data,
                },
              ]),
              !0 !== e.feePayer || e.feePayerSignature || delete e.feeToken);
            let {
                multisig: i,
                multisigInit: a,
                multisigOwnerStates: s,
                multisigSignatureCount: o,
                multisigVersion: u,
                signatures: l,
                ...c
              } = e,
              f = e4.toRpc({ ...c, type: "tempo" });
            ("estimateGas" === t &&
              ((f.maxFeePerGas = void 0), (f.maxPriorityFeePerGas = void 0)),
              (f.to = void 0),
              (f.data = void 0),
              (f.value = void 0));
            let [d, p] = (r = n && "keyType" in n ? n.keyType : n?.source)
                ? "webAuthn" === r
                  ? ["webAuthn", "0x0578"]
                  : ["p256", "secp256k1"].includes(r)
                    ? [r, void 0]
                    : [e.keyType, tJ(e.keyData)]
                : [e.keyType, tJ(e.keyData)],
              y = n && "accessKeyAddress" in n ? n.accessKeyAddress : e.keyId;
            return (
              n && (f.from = n.address),
              {
                ...f,
                ...(a ? { multisigInit: a } : {}),
                ...(void 0 !== o ? { multisigSignatureCount: o } : {}),
                ...(e.capabilities ? { capabilities: e.capabilities } : {}),
                ...(p ? { keyData: p } : {}),
                ...(y ? { keyId: y } : {}),
                ...(d ? { keyType: d } : {}),
                ...(void 0 !== e.feePayer
                  ? {
                      feePayer:
                        "object" == typeof e.feePayer
                          ? (0, I.f)(e.feePayer)
                          : e.feePayer,
                    }
                  : {}),
                ...("feePayerSignature" in e && void 0 !== e.feePayerSignature
                  ? { feePayerSignature: e.feePayerSignature }
                  : {}),
              }
            );
          },
        }),
      },
      prepareTransactionRequest: [
        async (e, { client: t, phase: r }) => {
          if ("afterFillParameters" === r)
            return (
              void 0 !== e.gas &&
                e.feePayer &&
                !e.feePayerSignature &&
                (e.keyAuthorization?.signature.type === "webAuthn"
                  ? (e.gas = (e.gas ?? 0n) + 20000n)
                  : e.account?.source === "accessKey" &&
                    (e.gas = (e.gas ?? 0n) + 10000n)),
              e
            );
          let n =
            e.multisig ??
            (e.account?.source === "multisig"
              ? (e.account.config ?? e.account.address)
              : void 0);
          if (n) {
            let r = "string" == typeof n ? void 0 : o.f.from(n),
              i = "string" == typeof n ? n : u.f.getAddress(r);
            ((e.multisig = r ?? n),
              (e.from = i),
              void 0 === e.keyType &&
                ((e.keyType = "webAuthn"),
                void 0 === e.keyData && (e.keyData = "0x0578")));
            let a = eP((e) => (0, P.f)(t, eE, "getConfig")({ account: e })),
              s = e.account?.source === "multisig" ? ek(e.account, a) : void 0,
              f = s ? (await s)[0] : await a(i);
            if (!r && !f.initialized)
              throw Error(
                "Cannot prepare an uninitialized multisig account from an address. Provide its initial config instead.",
              );
            void 0 === e.multisigVersion && (e.multisigVersion = f.version);
            let d = e.keyAuthorization?.signature;
            d?.type === "multisig" &&
              void 0 !== d.init &&
              (e.keyAuthorization = {
                ...e.keyAuthorization,
                signature: c.f.from({
                  initialConfig: d.init,
                  signatures: d.signatures,
                }),
              });
            let p = e.keyAuthorization?.signature,
              y = p?.type === "multisig" && void 0 !== p.init;
            if (
              (r &&
                !y &&
                (e.multisigInit = {
                  salt: r.salt ?? l.f.zeroSalt,
                  threshold: Number(r.threshold),
                  owners: r.owners.map((e) => ({
                    owner: e.owner,
                    weight: Number(e.weight),
                  })),
                }),
              s)
            ) {
              let t = await s;
              t.length > 0 && (e.multisigOwnerStates = t);
            }
            e.account?.source !== "multisig" && delete e.account;
          }
          if (
            await (async () => {
              if ("expiring" === e.nonceKey || e.nonceKey === m.f) return !0;
              if (n) return !1;
              if (e.feePayer && void 0 === e.nonceKey) return !0;
              let t = e.account,
                r = "string" == typeof t ? t : t?.address;
              return (
                !!r && void 0 === e.nonceKey && (await tX(r.toLowerCase()))
              );
            })()
          ) {
            let t;
            ((e.nonceKey = m.f),
              (e.nonce = 0),
              void 0 === e.validAfter &&
                (e.validAfter =
                  (t = BigInt(Math.floor(Date.now() / 1e3)) - 60n) <= 0n
                    ? 0
                    : Number(BigInt(s.W(8)) % t)),
              void 0 === e.validBefore &&
                (e.validBefore = Math.floor(Date.now() / 1e3) + 25));
          } else
            void 0 !== e.nonceKey &&
              (e.nonce = "number" == typeof e.nonce ? e.nonce : 0);
          if (!e.keyAuthorization && e.account?.source === "accessKey") {
            let r = e.account.keyAuthorizationManager;
            if (r) {
              let n = e.chainId ?? e.chain?.id;
              if (void 0 !== n) {
                let i = e.account.address,
                  a = e.account.accessKeyAddress,
                  s = { address: i, accessKey: a, chainId: n },
                  o = await r.get(s);
                if (o) {
                  let n = BigInt(Math.floor(Date.now() / 1e3));
                  if (null != o.expiry && BigInt(o.expiry) <= n)
                    await r.remove(s);
                  else {
                    let u = await (0, P.f)(
                      t,
                      eO,
                      "getMetadata",
                    )({ account: i, accessKey: a });
                    (0, g.f)(u.address, a) && !u.isRevoked && u.expiry > n
                      ? await r.remove(s)
                      : (e.keyAuthorization = o);
                  }
                }
              }
            }
          }
          return (
            !e.feeToken && e.chain?.feeToken && (e.feeToken = e.chain.feeToken),
            e
          );
        },
        { runAt: ["beforeFillTransaction", "afterFillParameters"] },
      ],
      serializers: { transaction: (e, t) => tV(e, t) },
      async verifyHash(e, t) {
        let { address: r, hash: n, signature: i, mode: a } = t,
          o = (() => {
            if ("string" == typeof i)
              try {
                return f.f.deserialize(i);
              } catch {
                return;
              }
          })();
        if (o) {
          if (o?.type === "keychain" && "allowAccessKey" === a) {
            let i = "v2" === o.version ? (0, k.f)(s.w("0x04", n, r)) : n,
              a = (() => {
                try {
                  return p.f.extractAddress({ payload: i, signature: o.inner });
                } catch {
                  return;
                }
              })();
            if (!a) return !1;
            let u = await eO(e, {
              account: r,
              accessKey: a,
              blockHash: t.blockHash,
              blockNumber: t.blockNumber,
              blockTag: t.blockTag,
              requireCanonical: t.requireCanonical,
            });
            return (
              !(
                u.isRevoked || u.expiry <= BigInt(Math.floor(Date.now() / 1e3))
              ) && d.f.verify(o.inner, { address: a, payload: i })
            );
          }
          if ("p256" === o.type || "webAuthn" === o.type) {
            let i = await (0, y.f)(e, {
              address: r,
              blockHash: t.blockHash,
              blockNumber: t.blockNumber,
              blockTag: t.blockTag,
              requireCanonical: t.requireCanonical,
            });
            if (!i || "0xef01007702c00000000000000000000000000000000000" === i)
              return d.f.verify(o, { address: r, payload: n });
          }
        }
        return await (0, P.f)(e, h.f, "verifyHash")({ ...t, chain: null });
      },
    },
    tQ = (0, b.l)({
      ...tY,
      id: 4217,
      blockExplorers: {
        default: { name: "Tempo Explorer", url: "https://explore.tempo.xyz" },
      },
      name: "Tempo Mainnet",
      nativeCurrency: { name: "USD", symbol: "USD", decimals: 6 },
      rpcUrls: {
        default: {
          http: ["https://rpc.tempo.xyz"],
          webSocket: ["wss://rpc.tempo.xyz"],
        },
      },
    });
  e.s(["f", 0, tQ], 315888);
  let t0 = (0, b.l)({
    ...tY,
    id: 42431,
    hardfork: "t5",
    blockExplorers: {
      default: {
        name: "Tempo Explorer",
        url: "https://explore.testnet.tempo.xyz",
      },
    },
    name: "Tempo Testnet (Moderato)",
    nativeCurrency: { name: "USD", symbol: "USD", decimals: 6 },
    rpcUrls: {
      default: {
        http: ["https://rpc.moderato.tempo.xyz"],
        webSocket: ["wss://rpc.moderato.tempo.xyz"],
      },
    },
    testnet: !0,
  });
  e.s(["f", 0, t0], 144876);
  let t1 = (e, t, r) => {
    let i,
      a = e.id,
      s = Number(e.id);
    if (e.rpcUrls.privyWalletOverride && e.rpcUrls.privyWalletOverride.http[0])
      i = e.rpcUrls.privyWalletOverride.http[0];
    else if (t.rpcUrls && t.rpcUrls[s]) i = t.rpcUrls[s];
    else if (e.rpcUrls.privy?.http[0]) {
      let t = new URL(e.rpcUrls.privy.http[0]);
      (t.searchParams.append("privyAppId", r), (i = t.toString()));
    } else
      i = e.rpcUrls.public?.http[0]
        ? e.rpcUrls.public.http[0]
        : e.rpcUrls.default?.http[0];
    if (!i) throw new n.e(`No RPC url found for ${a}`);
    return i;
  };
  e.s(
    [
      "a",
      0,
      t1,
      "g",
      0,
      (e, t, r, s) => {
        let o = Number(e),
          u = t.find((e) => e.id === o);
        if (!u) throw new n.e(`Unsupported chainId ${e}`, 4901);
        let l = t1(u, r, s.appId);
        if (o === tQ.id || o === t0.id) {
          let e = o === tQ.id ? tQ : t0;
          return (0, i.f)({ transport: (0, a.f)(l), chain: e });
        }
        return (0, i.f)({ transport: (0, a.f)(l), chain: u });
      },
    ],
    451993,
  );
  let t2 = (e) =>
      e.isApexWallet
        ? "Apex Wallet"
        : e.isAvalanche
          ? "Core Wallet"
          : e.isBackpack
            ? "Backpack"
            : e.isBifrost
              ? "Bifrost Wallet"
              : e.isBitKeep
                ? "BitKeep"
                : e.isBitski
                  ? "Bitski"
                  : e.isBlockWallet
                    ? "BlockWallet"
                    : e.isBraveWallet
                      ? "Brave Wallet"
                      : e.isClover
                        ? "Clover"
                        : e.isCoin98
                          ? "Coin98 Wallet"
                          : e.isCoinbaseWallet
                            ? "Coinbase Wallet"
                            : e.isDawn
                              ? "Dawn Wallet"
                              : e.isDefiant
                                ? "Defiant"
                                : e.isDesig
                                  ? "Desig Wallet"
                                  : e.isEnkrypt
                                    ? "Enkrypt"
                                    : e.isExodus
                                      ? "Exodus"
                                      : e.isFordefi
                                        ? "Fordefi"
                                        : e.isFrame
                                          ? "Frame"
                                          : e.isFrontier
                                            ? "Frontier Wallet"
                                            : e.isGamestop
                                              ? "GameStop Wallet"
                                              : e.isHaqqWallet
                                                ? "HAQQ Wallet"
                                                : e.isHyperPay
                                                  ? "HyperPay Wallet"
                                                  : e.isImToken
                                                    ? "ImToken"
                                                    : e.isHaloWallet
                                                      ? "Halo Wallet"
                                                      : e.isKuCoinWallet
                                                        ? "KuCoin Wallet"
                                                        : e.isMathWallet
                                                          ? "MathWallet"
                                                          : e.isNovaWallet
                                                            ? "Nova Wallet"
                                                            : e.isOkxWallet ||
                                                                e.isOKExWallet
                                                              ? "OKX Wallet"
                                                              : e.isOneInchIOSWallet ||
                                                                  e.isOneInchAndroidWallet
                                                                ? "1inch Wallet"
                                                                : e.isOneKey
                                                                  ? "OneKey Wallet"
                                                                  : e.isOpera
                                                                    ? "Opera"
                                                                    : e.isPhantom ||
                                                                        "isPhantom" in
                                                                          e
                                                                      ? "Phantom"
                                                                      : e.isPortal
                                                                        ? "Ripio Portal"
                                                                        : e.isRabby
                                                                          ? "Rabby Wallet"
                                                                          : e.isRainbow
                                                                            ? "Rainbow"
                                                                            : e.isSafePal
                                                                              ? "SafePal Wallet"
                                                                              : e.isStatus
                                                                                ? "Status"
                                                                                : e.isSubWallet
                                                                                  ? "SubWallet"
                                                                                  : e.isTalisman
                                                                                    ? "Talisman"
                                                                                    : e.isTally ||
                                                                                        e.isTaho
                                                                                      ? "Taho"
                                                                                      : e.isTokenPocket
                                                                                        ? "TokenPocket"
                                                                                        : e.isTokenary
                                                                                          ? "Tokenary"
                                                                                          : e.isTrust ||
                                                                                              e.isTrustWallet
                                                                                            ? "Trust Wallet"
                                                                                            : e.isTTWallet
                                                                                              ? "TTWallet"
                                                                                              : e.isXDEFI
                                                                                                ? "XDEFI Wallet"
                                                                                                : e.isZeal
                                                                                                  ? "Zeal"
                                                                                                  : e.isZerion
                                                                                                    ? "Zerion"
                                                                                                    : e.isMetaMask
                                                                                                      ? "MetaMask"
                                                                                                      : void 0,
    t5 = (e, t) => {
      if (!e.isMetaMask) return !1;
      if (e.isMetaMask && !t) return !0;
      if ((e.isBraveWallet && !e._events && !e._state) || "MetaMask" !== t2(e))
        return !1;
      if (e.providers) {
        for (let t of e.providers) if (!t5(t)) return !1;
      }
      return !0;
    },
    t3 = (e, t = 3, r = 4, n = "ethereum") => {
      if (!e) return "";
      let i = 2 * ("ethereum" === n);
      return t + r + i + 3 >= e.length
        ? e
        : `${e.slice(0, i + t)}...${e.slice(e.length - r, e.length)}`;
    },
    t6 = (e) => new Promise((t) => setTimeout(t, e));
  async function t8({
    store: e,
    walletList: t,
    externalWalletConfig: r,
    walletChainType: n,
    timeout: i = 3e3,
  }) {
    let a = !1,
      s = window;
    return new Promise((o) => {
      function u() {
        if (a) return;
        ((a = !0), window.removeEventListener("ethereum#initialized", u));
        let i = e.getProviders();
        console.debug(
          "Detected injected providers:",
          i.map((e) => e.info),
        );
        let s = [];
        for (let e of i)
          (t.includes("coinbase_wallet") &&
            "com.coinbase.wallet" === e.info.rdns) ||
            ("solana-only" === n && "app.phantom" === e.info.rdns) ||
            s.push({
              type: e.info.name.toLowerCase().replace(/\s/g, "_"),
              eip6963InjectedProvider: e,
            });
        if ("solana-only" !== n)
          for (let e of (function () {
            let e = window,
              t = e.ethereum;
            if (!t) return [];
            let r = [];
            if (t.providers?.length) for (let e of t.providers) e && r.push(e);
            return (r.push(e.ethereum), r);
          })()) {
            let t = t2(e);
            if (!i.some((e) => e.info.name === t)) {
              if (t5(e, !0) && !s.find((e) => "metamask" === e.type)) {
                s.push({ type: "metamask", legacyInjectedProvider: e });
                continue;
              }
              if ("Phantom" === t && !s.find((e) => "phantom" === e.type)) {
                s.push({ type: "phantom", legacyInjectedProvider: e });
                continue;
              }
              if (
                "Coinbase Wallet" === t &&
                !s.find(
                  (e) =>
                    "coinbase_wallet" === e.type &&
                    "smartWalletOnly" !==
                      r.coinbaseWallet?.config?.preference?.options,
                )
              ) {
                s.push({ type: "coinbase_wallet", legacyInjectedProvider: e });
                continue;
              }
              s.find((e) => "unknown_browser_extension" === e.type) ||
                s.push({
                  type: "unknown_browser_extension",
                  legacyInjectedProvider: e,
                });
            }
          }
        o(s);
      }
      s.ethereum
        ? u()
        : (window.addEventListener("ethereum#initialized", u, { once: !0 }),
          setTimeout(() => {
            u();
          }, i));
    });
  }
  class t4 {
    get(e) {
      let t = localStorage.getItem(e);
      return null === t ? void 0 : JSON.parse(t);
    }
    put(e, t) {
      void 0 !== t ? localStorage.setItem(e, JSON.stringify(t)) : this.del(e);
    }
    del(e) {
      localStorage.removeItem(e);
    }
    getKeys() {
      return Object.entries(localStorage).map(([e]) => e);
    }
  }
  var t7 =
    "u" > typeof window && window.localStorage
      ? new t4()
      : new (class {
          get(e) {
            return this._cache[e];
          }
          put(e, t) {
            void 0 !== t ? (this._cache[e] = t) : this.del(e);
          }
          del(e) {
            delete this._cache[e];
          }
          getKeys() {
            return Object.keys(this._cache);
          }
          constructor() {
            this._cache = {};
          }
        })();
  e.s(
    [
      "a",
      0,
      t6,
      "b",
      0,
      (e) =>
        e?.map((e) => ({
          signer_id: e.signerId,
          override_policy_ids: e.policyIds,
        })),
      "c",
      0,
      t3,
      "d",
      0,
      (e) =>
        e.replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          "",
        ),
      "e",
      0,
      function () {
        try {
          let e = "privy:__session_storage__test",
            t = new t4();
          return (t.put(e, "blobby"), t.del(e), !0);
        } catch (e) {
          return !1;
        }
      },
      "f",
      0,
      function (e) {
        return `eip155:${String(Number(e))}`;
      },
      "g",
      0,
      (e) => {
        let t = {
            name: "string",
            version: "string",
            chainId: "uint256",
            verifyingContract: "address",
            salt: "bytes32",
          },
          r =
            e.types.EIP712Domain ??
            Object.entries(e.domain)
              .map(([e, r]) => {
                if (null != r && "string" == typeof e && e in t)
                  return { name: e, type: t[e] };
              })
              .filter((e) => void 0 !== e);
        return { ...e, types: { ...e.types, EIP712Domain: r } };
      },
      "h",
      0,
      (e, t, r, i) => {
        let a = Number(e),
          s = t.find((e) => e.id === a);
        if (!s) throw new n.e(`Unsupported chainId ${e}`, 4901);
        return t1(s, r, i);
      },
      "i",
      0,
      (e, t = {}) => {
        let r = t.delayMs || 150,
          n = t.maxAttempts || 270;
        return new Promise(async (i, a) => {
          let s = !1,
            o = 0;
          for (; !s && o < n; ) {
            if (t.abortSignal?.aborted) return;
            (e().then(
              (e) => {
                ((s = !0), i(e));
              },
              (...e) => {
                ((s = !0), a(...e));
              },
            ),
              (o += 1),
              await t6(r));
          }
          s || a(Error("Exceeded max attempts before resolving function"));
        });
      },
      "j",
      0,
      t8,
      "k",
      0,
      (e, t) => {
        let r = [],
          n = [];
        for (let [i, a] of e.entries()) i < t ? r.push(a) : n.push(a);
        return [r, n];
      },
      "l",
      0,
      (e, t) => {
        let r = e.slice(0),
          n = [];
        for (; r.length; ) n.push(r.splice(0, t));
        return n;
      },
      "m",
      0,
      function (e, { min: t, max: r }) {
        return Math.min(Math.max(e, t), r);
      },
      "n",
      0,
      (e, t) => {
        let r = Number(e),
          i = t.find((e) => e.id === r);
        if (!i) throw new n.e(`Unsupported chainId ${e}`, 4901);
        return i.blockExplorers?.default.url;
      },
      "o",
      0,
      (e, t = 3, r = 4) => t3(e, t, r, "solana"),
      "p",
      0,
      function (e, { interval: t = 100, timeout: r = 5e3 } = {}) {
        return new Promise((n, i) => {
          let a,
            s = 0,
            o = () => {
              s >= r
                ? i("Max attempts reached without result")
                : ((a = e()), (s += t), null == a ? setTimeout(o, t) : n(a));
            };
          o();
        });
      },
      "q",
      0,
      () => {
        let e = window;
        if (!e.ethereum) return !1;
        if (e.ethereum.isCoinbaseWallet) return !0;
        if (e.ethereum.providers) {
          for (let t of e.ethereum.providers)
            if (t && t.isCoinbaseWallet) return !0;
        }
        return !1;
      },
      "s",
      0,
      t7,
      "t",
      0,
      (e) => ("string" == typeof e ? e : "0x" + e.toString(16)),
      "v",
      0,
      (e) =>
        !!String(e)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
    ],
    336291,
  );
};
