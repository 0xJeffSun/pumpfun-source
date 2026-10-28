// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(440519),
    r = e.i(620016),
    n = e.i(421957),
    i = e.i(389238),
    a = e.i(803085),
    s = e.i(415415),
    o = e.i(990963),
    u = e.i(703114),
    l = e.i(425817),
    c = e.i(661569),
    f = e.i(897781),
    d = e.i(812008),
    p = e.i(586844),
    y = e.i(559787);
  async function h(e, h) {
    let {
        blockNumber: m,
        blockTag: g,
        coinType: b,
        name: w,
        gatewayUrls: v,
        strict: x,
      } = h,
      { chain: P } = e,
      k = (() => {
        if (h.universalResolverAddress) return h.universalResolverAddress;
        if (!P)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, a.f)({
          blockNumber: m,
          chain: P,
          contract: "ensUniversalResolver",
        });
      })(),
      A = P?.ensTlds;
    if (A && !A.some((e) => w.endsWith(e))) return null;
    let I = null != b ? [(0, f.f)(w), BigInt(b)] : [(0, f.f)(w)];
    try {
      let a = (0, n.f)({ abi: t._, functionName: "addr", args: I }),
        l = {
          address: k,
          abi: t.i,
          functionName: "resolveWithGateways",
          args: [(0, u.g)((0, d.f)(w)), a, v ?? [c.o]],
          blockNumber: m,
          blockTag: g,
        },
        f = (0, p.f)(e, y.f, "readContract"),
        h = await f(l);
      if ("0x" === h[0]) return null;
      let x = (function ({ coinType: e, data: n, args: a }) {
        try {
          return (0, r.f)({ abi: t._, args: a, functionName: "addr", data: n });
        } catch (r) {
          if (null == e) throw r;
          let t = (0, o.f)(n);
          if (20 === (0, s.f)(t)) return (0, i.A)(t);
          throw r;
        }
      })({ coinType: b, data: h[0], args: I });
      if ("0x" === x || "0x00" === (0, o.f)(x)) return null;
      return x;
    } catch (e) {
      if (x) throw e;
      if ((0, l.f)(e)) return null;
      throw e;
    }
  }
  e.s(["f", 0, h], 97467);
  var m = e.i(927974);
  class g extends m.f {
    constructor({ data: e }) {
      super(
        "Unable to extract image from metadata. The metadata may be malformed or invalid.",
        {
          metaMessages: [
            "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
            "",
            `Provided data: ${JSON.stringify(e)}`,
          ],
          name: "EnsAvatarInvalidMetadataError",
        },
      );
    }
  }
  class b extends m.f {
    constructor({ reason: e }) {
      super(`ENS NFT avatar URI is invalid. ${e}`, {
        name: "EnsAvatarInvalidNftUriError",
      });
    }
  }
  class w extends m.f {
    constructor({ uri: e }) {
      super(
        `Unable to resolve ENS avatar URI "${e}". The URI may be malformed, invalid, or does not respond with a valid image.`,
        { name: "EnsAvatarUriResolutionError" },
      );
    }
  }
  class v extends m.f {
    constructor({ namespace: e }) {
      super(
        `ENS NFT avatar namespace "${e}" is not supported. Must be "erc721" or "erc1155".`,
        { name: "EnsAvatarUnsupportedNamespaceError" },
      );
    }
  }
  m.f;
  let x =
      /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,
    P =
      /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,
    k = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/,
    A = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
  async function I(e) {
    try {
      let t = await fetch(e, { method: "HEAD" });
      if (200 === t.status) {
        let e = t.headers.get("content-type");
        return e?.startsWith("image/");
      }
      return !1;
    } catch (t) {
      if (
        ("object" == typeof t && void 0 !== t.response) ||
        !Object.hasOwn(globalThis, "Image")
      )
        return !1;
      return new Promise((t) => {
        let r = new Image();
        ((r.onload = () => {
          t(!0);
        }),
          (r.onerror = () => {
            t(!1);
          }),
          (r.src = e));
      });
    }
  }
  function B(e, t) {
    return e ? (e.endsWith("/") ? e.slice(0, -1) : e) : t;
  }
  function E({ uri: e, gatewayUrls: t }) {
    let r = k.test(e);
    if (r) return { uri: e, isOnChain: !0, isEncoded: r };
    let n = B(t?.ipfs, "https://ipfs.io"),
      i = B(t?.arweave, "https://arweave.net"),
      a = e.match(x),
      {
        protocol: s,
        subpath: o,
        target: u,
        subtarget: l = "",
      } = a?.groups || {},
      c = "ipns:/" === s || "ipns/" === o,
      f = "ipfs:/" === s || "ipfs/" === o || P.test(e);
    if (e.startsWith("http") && !c && !f) {
      let r = e;
      return (
        t?.arweave && (r = e.replace(/https:\/\/arweave.net/g, t?.arweave)),
        { uri: r, isOnChain: !1, isEncoded: !1 }
      );
    }
    if ((c || f) && u)
      return {
        uri: `${n}/${c ? "ipns" : "ipfs"}/${u}${l}`,
        isOnChain: !1,
        isEncoded: !1,
      };
    if ("ar:/" === s && u)
      return { uri: `${i}/${u}${l || ""}`, isOnChain: !1, isEncoded: !1 };
    let d = e.replace(A, "");
    if (
      (d.startsWith("<svg") && (d = `data:image/svg+xml;base64,${btoa(d)}`),
      d.startsWith("data:") || d.startsWith("{"))
    )
      return { uri: d, isOnChain: !0, isEncoded: !1 };
    throw new w({ uri: e });
  }
  function N(e) {
    if (
      "object" != typeof e ||
      (!("image" in e) && !("image_url" in e) && !("image_data" in e))
    )
      throw new g({ data: e });
    return e.image || e.image_url || e.image_data;
  }
  async function T({ gatewayUrls: e, uri: t }) {
    try {
      let r = await fetch(t).then((e) => e.json());
      return await S({ gatewayUrls: e, uri: N(r) });
    } catch {
      throw new w({ uri: t });
    }
  }
  async function S({ gatewayUrls: e, uri: t }) {
    let { uri: r, isOnChain: n } = E({ uri: t, gatewayUrls: e });
    if (n || (await I(r))) return r;
    throw new w({ uri: t });
  }
  async function M(e, { nft: t }) {
    if ("erc721" === t.namespace)
      return (0, y.f)(e, {
        address: t.contractAddress,
        abi: [
          {
            name: "tokenURI",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "tokenId", type: "uint256" }],
            outputs: [{ name: "", type: "string" }],
          },
        ],
        functionName: "tokenURI",
        args: [BigInt(t.tokenID)],
      });
    if ("erc1155" === t.namespace)
      return (0, y.f)(e, {
        address: t.contractAddress,
        abi: [
          {
            name: "uri",
            type: "function",
            stateMutability: "view",
            inputs: [{ name: "_id", type: "uint256" }],
            outputs: [{ name: "", type: "string" }],
          },
        ],
        functionName: "uri",
        args: [BigInt(t.tokenID)],
      });
    throw new v({ namespace: t.namespace });
  }
  async function z(e, { gatewayUrls: t, record: r }) {
    return /eip155:/i.test(r)
      ? U(e, { gatewayUrls: t, record: r })
      : S({ uri: r, gatewayUrls: t });
  }
  async function U(e, { gatewayUrls: t, record: r }) {
    let n = (function (e) {
        let t = e;
        t.startsWith("did:nft:") &&
          (t = t.replace("did:nft:", "").replace(/_/g, "/"));
        let [r, n, i] = t.split("/"),
          [a, s] = r.split(":"),
          [o, u] = n.split(":");
        if (!a || "eip155" !== a.toLowerCase())
          throw new b({ reason: "Only EIP-155 supported" });
        if (!s) throw new b({ reason: "Chain ID not found" });
        if (!u) throw new b({ reason: "Contract address not found" });
        if (!i) throw new b({ reason: "Token ID not found" });
        if (!o) throw new b({ reason: "ERC namespace not found" });
        return {
          chainID: Number.parseInt(s, 10),
          namespace: o.toLowerCase(),
          contractAddress: u,
          tokenID: i,
        };
      })(r),
      {
        uri: i,
        isOnChain: a,
        isEncoded: s,
      } = E({ uri: await M(e, { nft: n }), gatewayUrls: t });
    if (a && (i.includes("data:application/json;base64,") || i.startsWith("{")))
      return S({
        uri: N(
          JSON.parse(
            s ? atob(i.replace("data:application/json;base64,", "")) : i,
          ),
        ),
        gatewayUrls: t,
      });
    let o = n.tokenID;
    return (
      "erc1155" === n.namespace && (o = o.replace("0x", "").padStart(64, "0")),
      T({ gatewayUrls: t, uri: i.replace(/(?:0x)?{id}/, o) })
    );
  }
  async function C(e, i) {
    let {
        blockNumber: s,
        blockTag: o,
        key: h,
        name: m,
        gatewayUrls: g,
        strict: b,
      } = i,
      { chain: w } = e,
      v = (() => {
        if (i.universalResolverAddress) return i.universalResolverAddress;
        if (!w)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, a.f)({
          blockNumber: s,
          chain: w,
          contract: "ensUniversalResolver",
        });
      })(),
      x = w?.ensTlds;
    if (x && !x.some((e) => m.endsWith(e))) return null;
    try {
      let i = {
          address: v,
          abi: t.i,
          args: [
            (0, u.g)((0, d.f)(m)),
            (0, n.f)({
              abi: t.N,
              functionName: "text",
              args: [(0, f.f)(m), h],
            }),
            g ?? [c.o],
          ],
          functionName: "resolveWithGateways",
          blockNumber: s,
          blockTag: o,
        },
        a = (0, p.f)(e, y.f, "readContract"),
        l = await a(i);
      if ("0x" === l[0]) return null;
      let b = (0, r.f)({ abi: t.N, functionName: "text", data: l[0] });
      return "" === b ? null : b;
    } catch (e) {
      if (b) throw e;
      if ((0, l.f)(e)) return null;
      throw e;
    }
  }
  async function R(
    e,
    {
      blockNumber: t,
      blockTag: r,
      assetGatewayUrls: n,
      name: i,
      gatewayUrls: a,
      strict: s,
      universalResolverAddress: o,
    },
  ) {
    let u = await (0, p.f)(
      e,
      C,
      "getEnsText",
    )({
      blockNumber: t,
      blockTag: r,
      key: "avatar",
      name: i,
      universalResolverAddress: o,
      gatewayUrls: a,
      strict: s,
    });
    if (!u) return null;
    try {
      return await z(e, { record: u, gatewayUrls: n });
    } catch {
      return null;
    }
  }
  async function F(e, r) {
    let {
        address: n,
        blockNumber: i,
        blockTag: s,
        coinType: o = 60n,
        gatewayUrls: u,
        strict: f,
      } = r,
      { chain: d } = e,
      h = (() => {
        if (r.universalResolverAddress) return r.universalResolverAddress;
        if (!d)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, a.f)({
          blockNumber: i,
          chain: d,
          contract: "ensUniversalResolver",
        });
      })();
    try {
      let r = {
          address: h,
          abi: t.$,
          args: [n, o, u ?? [c.o]],
          functionName: "reverseWithGateways",
          blockNumber: i,
          blockTag: s,
        },
        a = (0, p.f)(e, y.f, "readContract"),
        [l] = await a(r);
      return l || null;
    } catch (e) {
      if (f) throw e;
      if ((0, l.f)(e)) return null;
      throw e;
    }
  }
  async function O(e, t) {
    let { blockNumber: r, blockTag: n, name: i } = t,
      { chain: s } = e,
      o = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!s)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, a.f)({
          blockNumber: r,
          chain: s,
          contract: "ensUniversalResolver",
        });
      })(),
      l = s?.ensTlds;
    if (l && !l.some((e) => i.endsWith(e)))
      throw Error(
        `${i} is not a valid ENS TLD (${l?.join(", ")}) for chain "${s.name}" (id: ${s.id}).`,
      );
    let [c] = await (0, p.f)(
      e,
      y.f,
      "readContract",
    )({
      address: o,
      abi: [
        {
          inputs: [{ type: "bytes" }],
          name: "findResolver",
          outputs: [
            { type: "address" },
            { type: "bytes32" },
            { type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "findResolver",
      args: [(0, u.g)((0, d.f)(i))],
      blockNumber: r,
      blockTag: n,
    });
    return c;
  }
  (e.s(["f", 0, C], 353459),
    e.s(["f", 0, R], 392782),
    e.s(["f", 0, F], 868058),
    e.s(["f", 0, O], 523833));
  var $ = e.i(717473),
    L = e.i(236310),
    j = e.i(723566),
    K = e.i(109340),
    G = e.i(41096);
  async function D(e, t) {
    let {
        account: r = e.account,
        blockNumber: n,
        blockTag: i = "latest",
        blobs: a,
        data: s,
        gas: o,
        gasPrice: l,
        maxFeePerBlobGas: c,
        maxFeePerGas: f,
        maxPriorityFeePerGas: d,
        to: p,
        value: y,
        ...h
      } = t,
      g = r ? (0, $.f)(r) : void 0;
    try {
      (0, G.f)(t);
      let r = "bigint" == typeof n ? (0, u.N)(n) : void 0,
        b = e.chain?.formatters?.transactionRequest?.format,
        w = (b || K.F)(
          {
            ...(0, j.f)(h, { format: b }),
            account: g,
            blobs: a,
            data: s,
            gas: o,
            gasPrice: l,
            maxFeePerBlobGas: c,
            maxFeePerGas: f,
            maxPriorityFeePerGas: d,
            to: p,
            value: y,
          },
          "createAccessList",
        ),
        v = await e.request({
          method: "eth_createAccessList",
          params: [w, r || i],
        });
      if (v.error) throw new m.f(v.error, { details: v.error });
      return { accessList: v.accessList, gasUsed: BigInt(v.gasUsed) };
    } catch (r) {
      throw (0, L.f)(r, { ...t, account: g, chain: e.chain });
    }
  }
  function q(e, { method: t }) {
    let r = {};
    return (
      "fallback" === e.transport.type &&
        e.transport.onResponse?.(
          ({ method: e, response: n, status: i, transport: a }) => {
            "success" === i && t === e && (r[n] = a.request);
          },
        ),
      (t) => r[t] || e.request
    );
  }
  async function W(e) {
    let t = q(e, { method: "eth_newBlockFilter" }),
      r = await e.request({ method: "eth_newBlockFilter" });
    return { id: r, request: t(r), type: "block" };
  }
  (e.s(["f", 0, D], 696220), e.s(["f", 0, W], 158601));
  var _ = e.i(641802),
    V = m;
  class H extends V.f {
    constructor(e) {
      super(`Filter type "${e}" is not supported.`, {
        name: "FilterTypeNotSupportedError",
      });
    }
  }
  var J = e.i(67223),
    Z = e.i(772488),
    X = e.i(404820),
    Y = e.i(640279),
    Q = e.i(730755),
    ee = e.i(923148);
  let et = "/docs/contract/encodeEventTopics";
  function er(e) {
    let { abi: t, eventName: r, args: n } = e,
      i = t[0];
    if (r) {
      let e = (0, ee.f)({ abi: t, name: r });
      if (!e) throw new _.V(r, { docsPath: et });
      i = e;
    }
    if ("event" !== i.type) throw new _.V(void 0, { docsPath: et });
    let a = [];
    if (n && "inputs" in i) {
      let e = i.inputs?.filter((e) => "indexed" in e && e.indexed),
        t = Array.isArray(n)
          ? n
          : Object.values(n).length > 0
            ? (e?.map((e) => n[e.name]) ?? [])
            : [];
      t.length > 0 &&
        (a =
          e?.map((e, r) =>
            Array.isArray(t[r])
              ? t[r].map((n, i) => en({ param: e, value: t[r][i] }))
              : void 0 !== t[r] && null !== t[r]
                ? en({ param: e, value: t[r] })
                : null,
          ) ?? []);
    }
    if (i.anonymous) return a;
    let s = (0, Q.r)(i);
    return [(0, X.f)(s), ...a];
  }
  function en({ param: e, value: t }) {
    if ("string" === e.type || "bytes" === e.type) return (0, Z.f)((0, J.D)(t));
    if ("tuple" === e.type || e.type.match(/^(.*)\[(\d+)?\]$/))
      throw new H(e.type);
    return (0, Y.N)([e], [t]);
  }
  async function ei(e, t) {
    let {
        address: r,
        abi: n,
        args: i,
        eventName: a,
        fromBlock: s,
        strict: o,
        toBlock: l,
      } = t,
      c = q(e, { method: "eth_newFilter" }),
      f = a ? er({ abi: n, args: i, eventName: a }) : void 0,
      d = await e.request({
        method: "eth_newFilter",
        params: [
          {
            address: r,
            fromBlock: "bigint" == typeof s ? (0, u.N)(s) : s,
            toBlock: "bigint" == typeof l ? (0, u.N)(l) : l,
            topics: f,
          },
        ],
      });
    return {
      abi: n,
      args: i,
      eventName: a,
      id: d,
      request: c(d),
      strict: !!o,
      type: "event",
    };
  }
  async function ea(
    e,
    {
      address: t,
      args: r,
      event: n,
      events: i,
      fromBlock: a,
      strict: s,
      toBlock: o,
    } = {},
  ) {
    let l = i ?? (n ? [n] : void 0),
      c = q(e, { method: "eth_newFilter" }),
      f = [];
    l &&
      ((f = [l.flatMap((e) => er({ abi: [e], eventName: e.name, args: r }))]),
      n && (f = f[0]));
    let d = await e.request({
      method: "eth_newFilter",
      params: [
        {
          address: t,
          fromBlock: "bigint" == typeof a ? (0, u.N)(a) : a,
          toBlock: "bigint" == typeof o ? (0, u.N)(o) : o,
          ...(f.length ? { topics: f } : {}),
        },
      ],
    });
    return {
      abi: l,
      args: r,
      eventName: n ? n.name : void 0,
      fromBlock: a,
      id: d,
      request: c(d),
      strict: !!s,
      toBlock: o,
      type: "event",
    };
  }
  async function es(e) {
    let t = q(e, { method: "eth_newPendingTransactionFilter" }),
      r = await e.request({ method: "eth_newPendingTransactionFilter" });
    return { id: r, request: t(r), type: "transaction" };
  }
  (e.s(["f", 0, er], 50569),
    e.s(["f", 0, ei], 413417),
    e.s(["f", 0, ea], 344997),
    e.s(["f", 0, es], 600934));
};
