// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(923148),
    r = e.i(586844),
    n = e.i(50569),
    i = e.i(616883),
    a = e.i(703114),
    s = e.i(548291);
  async function o(
    e,
    {
      address: t,
      blockHash: r,
      fromBlock: u,
      toBlock: l,
      event: c,
      events: f,
      args: d,
      strict: p,
    } = {},
  ) {
    let y = f ?? (c ? [c] : void 0),
      h = [];
    y &&
      ((h = [
        y.flatMap((e) =>
          (0, n.f)({ abi: [e], eventName: e.name, args: f ? void 0 : d }),
        ),
      ]),
      c && (h = h[0]));
    let m = (
      r
        ? await e.request({
            method: "eth_getLogs",
            params: [{ address: t, topics: h, blockHash: r }],
          })
        : await e.request({
            method: "eth_getLogs",
            params: [
              {
                address: t,
                topics: h,
                fromBlock: "bigint" == typeof u ? (0, a.N)(u) : u,
                toBlock: "bigint" == typeof l ? (0, a.N)(l) : l,
              },
            ],
          })
    ).map((e) => (0, s.f)(e));
    return y ? (0, i.f)({ abi: y, args: d, logs: m, strict: p ?? !1 }) : m;
  }
  async function u(e, n) {
    let {
        abi: i,
        address: a,
        args: s,
        blockHash: u,
        eventName: l,
        fromBlock: c,
        toBlock: f,
        strict: d,
      } = n,
      p = l ? (0, t.f)({ abi: i, name: l }) : void 0,
      y = p ? void 0 : i.filter((e) => "event" === e.type);
    return (0, r.f)(
      e,
      o,
      "getLogs",
    )({
      address: a,
      args: s,
      blockHash: u,
      event: p,
      events: y,
      fromBlock: c,
      toBlock: f,
      strict: d,
    });
  }
  (e.s(["f", 0, o], 262425), e.s(["f", 0, u], 201033));
  var l = e.i(389238),
    c = e.i(415415),
    f = e.i(612164),
    d = e.i(285945);
  async function p(e, { address: t, blockNumber: r, blockTag: n = "latest" }) {
    let i = await (0, d.f)(e, {
      address: t,
      ...(void 0 !== r ? { blockNumber: r } : { blockTag: n }),
    });
    if (i && 23 === (0, c.f)(i) && i.startsWith("0xef0100"))
      return (0, l.A)((0, f.M)(i, 3, 23));
  }
  e.s(["f", 0, p], 20108);
  var y = e.i(927974);
  class h extends y.f {
    constructor({ address: e }) {
      super(`No EIP-712 domain found on contract "${e}".`, {
        metaMessages: [
          "Ensure that:",
          `- The contract is deployed at the address "${e}".`,
          "- `eip712Domain()` function exists on the contract.",
          "- `eip712Domain()` function matches signature to ERC-5267 specification.",
        ],
        name: "Eip712DomainNotFoundError",
      });
    }
  }
  var m = e.i(559787);
  async function g(e, t) {
    let { address: n, factory: i, factoryData: a } = t;
    try {
      let [t, s, o, u, l, c, f] = await (0, r.f)(
        e,
        m.f,
        "readContract",
      )({
        abi: b,
        address: n,
        functionName: "eip712Domain",
        factory: i,
        factoryData: a,
      });
      return {
        domain: {
          name: s,
          version: o,
          chainId: Number(u),
          verifyingContract: l,
          salt: c,
        },
        extensions: f,
        fields: t,
      };
    } catch (e) {
      if (
        "ContractFunctionExecutionError" === e.name &&
        "ContractFunctionZeroDataError" === e.cause.name
      )
        throw new h({ address: n });
      throw e;
    }
  }
  let b = [
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        { name: "fields", type: "bytes1" },
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
        { name: "extensions", type: "uint256[]" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  async function w(
    e,
    {
      blockCount: t,
      blockNumber: r,
      blockTag: n = "latest",
      rewardPercentiles: i,
    },
  ) {
    var s;
    let o = "bigint" == typeof r ? (0, a.N)(r) : void 0;
    return {
      baseFeePerGas: (s = await e.request(
        { method: "eth_feeHistory", params: [(0, a.N)(t), o || n, i] },
        { dedupe: !!o },
      )).baseFeePerGas.map((e) => BigInt(e)),
      gasUsedRatio: s.gasUsedRatio,
      oldestBlock: BigInt(s.oldestBlock),
      reward: s.reward?.map((e) => e.map((e) => BigInt(e))),
    };
  }
  async function v(e, { filter: t }) {
    let r = "strict" in t && t.strict,
      n = await t.request({ method: "eth_getFilterChanges", params: [t.id] });
    if ("string" == typeof n[0]) return n;
    let a = n.map((e) => (0, s.f)(e));
    return "abi" in t && t.abi
      ? (0, i.f)({ abi: t.abi, logs: a, strict: r })
      : a;
  }
  async function x(e, { filter: t }) {
    let r = t.strict ?? !1,
      n = (
        await t.request({ method: "eth_getFilterLogs", params: [t.id] })
      ).map((e) => (0, s.f)(e));
    return t.abi ? (0, i.f)({ abi: t.abi, logs: n, strict: r }) : n;
  }
  (e.s(["f", 0, g], 314635),
    e.s(["f", 0, w], 679733),
    e.s(["f", 0, v], 336934),
    e.s(["f", 0, x], 508953));
  var P = e.i(698174),
    k = e.i(339513);
  async function A(
    e,
    {
      address: t,
      blockHash: r,
      blockNumber: n,
      blockTag: i = "latest",
      requireCanonical: a,
      storageKeys: s,
    },
  ) {
    let o = (0, P.f)({
      blockHash: r,
      blockNumber: n,
      blockTag: i,
      requireCanonical: a,
    });
    var u = await e.request({ method: "eth_getProof", params: [t, s, o] });
    return {
      ...u,
      balance: u.balance ? BigInt(u.balance) : void 0,
      nonce: u.nonce ? (0, k.T)(u.nonce) : void 0,
      storageProof: u.storageProof
        ? u.storageProof.map((e) => ({ ...e, value: BigInt(e.value) }))
        : void 0,
    };
  }
  e.s(["f", 0, A], 920804);
  var I = e.i(147864);
  async function B(e, { hash: t }) {
    let r = await e.request(
      { method: "eth_getRawTransactionByHash", params: [t] },
      { dedupe: !0 },
    );
    if (!r) throw new I.z({ hash: t });
    return r;
  }
  async function E(
    e,
    {
      address: t,
      blockHash: r,
      blockNumber: n,
      blockTag: i = "latest",
      requireCanonical: a,
      slot: s,
    },
  ) {
    let o = (0, P.f)({
      blockHash: r,
      blockNumber: n,
      blockTag: i,
      requireCanonical: a,
    });
    return await e.request({ method: "eth_getStorageAt", params: [t, s, o] });
  }
  (e.s(["f", 0, B], 802565), e.s(["f", 0, E], 343658));
};
