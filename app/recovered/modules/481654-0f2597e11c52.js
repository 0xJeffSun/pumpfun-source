// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(45417),
    r = e.i(841087);
  function n(e) {
    let {
        batch: n,
        chain: a,
        ccipRead: i,
        key: s = "base",
        name: o = "Base Client",
        type: c = "base",
      } = e,
      l =
        e.experimental_blockTag ??
        ("number" == typeof a?.experimental_preconfirmationTime
          ? "pending"
          : void 0),
      u = Math.min(Math.max(Math.floor((a?.blockTime ?? 12e3) / 2), 500), 4e3),
      f = e.pollingInterval ?? u,
      d = e.cacheTime ?? f,
      p = e.account ? (0, t.f)(e.account) : void 0,
      {
        config: h,
        request: m,
        value: y,
      } = e.transport({ account: p, chain: a, pollingInterval: f }),
      g = {
        account: p,
        batch: n,
        cacheTime: d,
        ccipRead: i,
        chain: a,
        key: s,
        name: o,
        pollingInterval: f,
        request: m,
        transport: { ...h, ...y },
        type: c,
        uid: (0, r.f)(),
        ...(l ? { experimental_blockTag: l } : {}),
      };
    return Object.assign(g, {
      extend: (function e(t) {
        return (r) => {
          let n = r(t);
          for (let e in g) delete n[e];
          let a = { ...t, ...n };
          return Object.assign(a, { extend: e(a) });
        };
      })(g),
    });
  }
  e.s(["f", 0, n], 128752);
  var a = e.i(58904),
    i = e.i(774279),
    s = e.i(293341),
    o = e.i(20425),
    c = e.i(449985),
    l = e.i(19648),
    u = e.i(532617),
    f = e.i(886598);
  function d(e) {
    if (!(e instanceof u.f)) return !1;
    let t = e.walk((e) => e instanceof f.P);
    return (
      t instanceof f.P &&
      (t.data?.errorName === "HttpError" ||
        t.data?.errorName === "ResolverError" ||
        t.data?.errorName === "ResolverNotContract" ||
        t.data?.errorName === "ResolverNotFound" ||
        t.data?.errorName === "ReverseAddressMismatch" ||
        t.data?.errorName === "UnsupportedResolverProfile")
    );
  }
  var p = e.i(931638),
    h = e.i(990149),
    m = e.i(590719),
    y = e.i(497763),
    g = e.i(470083);
  function b(e) {
    if (66 !== e.length || 0 !== e.indexOf("[") || 65 !== e.indexOf("]"))
      return null;
    let t = `0x${e.slice(1, 65)}`;
    return (0, g.f)(t) ? t : null;
  }
  function w(e) {
    let t = new Uint8Array(32).fill(0);
    if (!e) return (0, l.v)(t);
    let r = e.split(".");
    for (let e = r.length - 1; e >= 0; e -= 1) {
      let n = b(r[e]),
        a = n ? (0, m.D)(n) : (0, y.f)((0, m.T)(r[e]), "bytes");
      t = (0, y.f)((0, h.w)([t, a]), "bytes");
    }
    return (0, l.v)(t);
  }
  function v(e) {
    let t = e.replace(/^\.|\.$/gm, "");
    if (0 === t.length) return new Uint8Array(1);
    let r = new Uint8Array((0, m.T)(t).byteLength + 2),
      n = 0,
      a = t.split(".");
    for (let e = 0; e < a.length; e++) {
      var i;
      let t = (0, m.T)(a[e]);
      (t.byteLength > 255 &&
        (t = (0, m.T)(
          ((i = (function (e) {
            let t = new Uint8Array(32).fill(0);
            return e ? b(e) || (0, y.f)((0, m.T)(e)) : (0, l.v)(t);
          })(a[e])),
          `[${i.slice(2)}]`),
        )),
        (r[n] = t.length),
        r.set(t, n + 1),
        (n += t.length + 1));
    }
    return r.byteLength !== n + 1 ? r.slice(0, n + 1) : r;
  }
  function P(e, t, r) {
    let n = e[t.name];
    if ("function" == typeof n) return n;
    let a = e[r];
    return "function" == typeof a ? a : (r) => t(e, r);
  }
  e.s(["f", 0, P], 678085);
  var x = e.i(76373),
    B = e.i(503725),
    A = e.i(416532);
  function N(
    e,
    { abi: t, address: r, args: n, docsPath: a, functionName: i, sender: s },
  ) {
    let o =
        e instanceof f.w
          ? e
          : e instanceof u.f
            ? e.walk((e) => "data" in e) || e.walk()
            : {},
      { code: c, data: l, details: d, message: p, shortMessage: h } = o,
      m =
        e instanceof x.g
          ? new f.v({ functionName: i })
          : ([3, A.D.code].includes(c) && (l || d || p || h)) ||
              (c === A.L.code && "execution reverted" === d && l)
            ? new f.P({
                abi: t,
                data: "object" == typeof l ? l.data : l,
                functionName: i,
                message: o instanceof B.V ? d : (h ?? p),
              })
            : e;
    return new f.h(m, {
      abi: t,
      args: n,
      contractAddress: r,
      docsPath: a,
      functionName: i,
      sender: s,
    });
  }
  var k = e.i(432526);
  async function E(e, t) {
    let { abi: r, address: n, args: a, functionName: o, ...c } = t,
      l = (0, s.f)({ abi: r, args: a, functionName: o });
    try {
      let { data: t } = await P(e, k.f, "call")({ ...c, data: l, to: n });
      return (0, i.f)({ abi: r, args: a, functionName: o, data: t || "0x" });
    } catch (e) {
      throw N(e, {
        abi: r,
        address: n,
        args: a,
        docsPath: "/docs/contract/readContract",
        functionName: o,
      });
    }
  }
  async function I(e, t) {
    let {
        blockNumber: r,
        blockTag: n,
        coinType: u,
        name: f,
        gatewayUrls: h,
        strict: m,
      } = t,
      { chain: y } = e,
      g = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!y)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, o.f)({
          blockNumber: r,
          chain: y,
          contract: "ensUniversalResolver",
        });
      })(),
      b = y?.ensTlds;
    if (b && !b.some((e) => f.endsWith(e))) return null;
    let x = null != u ? [w(f), BigInt(u)] : [w(f)];
    try {
      let t = (0, s.f)({ abi: a._, functionName: "addr", args: x }),
        o = {
          address: g,
          abi: a.i,
          functionName: "resolveWithGateways",
          args: [(0, l.g)(v(f)), t, h ?? [p.o]],
          blockNumber: r,
          blockTag: n,
        },
        u = P(e, E, "readContract"),
        d = await u(o);
      if ("0x" === d[0]) return null;
      let m = (0, i.f)({ abi: a._, args: x, functionName: "addr", data: d[0] });
      if ("0x" === m || "0x00" === (0, c.f)(m)) return null;
      return m;
    } catch (e) {
      if (m) throw e;
      if (d(e)) return null;
      throw e;
    }
  }
  e.s(["f", 0, E], 635972);
  var T = u;
  class F extends T.f {
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
  class $ extends T.f {
    constructor({ reason: e }) {
      super(`ENS NFT avatar URI is invalid. ${e}`, {
        name: "EnsAvatarInvalidNftUriError",
      });
    }
  }
  class R extends T.f {
    constructor({ uri: e }) {
      super(
        `Unable to resolve ENS avatar URI "${e}". The URI may be malformed, invalid, or does not respond with a valid image.`,
        { name: "EnsAvatarUriResolutionError" },
      );
    }
  }
  class C extends T.f {
    constructor({ namespace: e }) {
      super(
        `ENS NFT avatar namespace "${e}" is not supported. Must be "erc721" or "erc1155".`,
        { name: "EnsAvatarUnsupportedNamespaceError" },
      );
    }
  }
  T.f;
  let S =
      /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,
    O =
      /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,
    z = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/,
    U = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
  async function G(e) {
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
  function _(e, t) {
    return e ? (e.endsWith("/") ? e.slice(0, -1) : e) : t;
  }
  function L({ uri: e, gatewayUrls: t }) {
    let r = z.test(e);
    if (r) return { uri: e, isOnChain: !0, isEncoded: r };
    let n = _(t?.ipfs, "https://ipfs.io"),
      a = _(t?.arweave, "https://arweave.net"),
      i = e.match(S),
      {
        protocol: s,
        subpath: o,
        target: c,
        subtarget: l = "",
      } = i?.groups || {},
      u = "ipns:/" === s || "ipns/" === o,
      f = "ipfs:/" === s || "ipfs/" === o || O.test(e);
    if (e.startsWith("http") && !u && !f) {
      let r = e;
      return (
        t?.arweave && (r = e.replace(/https:\/\/arweave.net/g, t?.arweave)),
        { uri: r, isOnChain: !1, isEncoded: !1 }
      );
    }
    if ((u || f) && c)
      return {
        uri: `${n}/${u ? "ipns" : "ipfs"}/${c}${l}`,
        isOnChain: !1,
        isEncoded: !1,
      };
    if ("ar:/" === s && c)
      return { uri: `${a}/${c}${l || ""}`, isOnChain: !1, isEncoded: !1 };
    let d = e.replace(U, "");
    if (
      (d.startsWith("<svg") && (d = `data:image/svg+xml;base64,${btoa(d)}`),
      d.startsWith("data:") || d.startsWith("{"))
    )
      return { uri: d, isOnChain: !0, isEncoded: !1 };
    throw new R({ uri: e });
  }
  function q(e) {
    if (
      "object" != typeof e ||
      (!("image" in e) && !("image_url" in e) && !("image_data" in e))
    )
      throw new F({ data: e });
    return e.image || e.image_url || e.image_data;
  }
  async function M({ gatewayUrls: e, uri: t }) {
    try {
      let r = await fetch(t).then((e) => e.json());
      return await j({ gatewayUrls: e, uri: q(r) });
    } catch {
      throw new R({ uri: t });
    }
  }
  async function j({ gatewayUrls: e, uri: t }) {
    let { uri: r, isOnChain: n } = L({ uri: t, gatewayUrls: e });
    if (n || (await G(r))) return r;
    throw new R({ uri: t });
  }
  async function D(e, { nft: t }) {
    if ("erc721" === t.namespace)
      return E(e, {
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
      return E(e, {
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
    throw new C({ namespace: t.namespace });
  }
  async function V(e, { gatewayUrls: t, record: r }) {
    return /eip155:/i.test(r)
      ? H(e, { gatewayUrls: t, record: r })
      : j({ uri: r, gatewayUrls: t });
  }
  async function H(e, { gatewayUrls: t, record: r }) {
    let n = (function (e) {
        let t = e;
        t.startsWith("did:nft:") &&
          (t = t.replace("did:nft:", "").replace(/_/g, "/"));
        let [r, n, a] = t.split("/"),
          [i, s] = r.split(":"),
          [o, c] = n.split(":");
        if (!i || "eip155" !== i.toLowerCase())
          throw new $({ reason: "Only EIP-155 supported" });
        if (!s) throw new $({ reason: "Chain ID not found" });
        if (!c) throw new $({ reason: "Contract address not found" });
        if (!a) throw new $({ reason: "Token ID not found" });
        if (!o) throw new $({ reason: "ERC namespace not found" });
        return {
          chainID: Number.parseInt(s, 10),
          namespace: o.toLowerCase(),
          contractAddress: c,
          tokenID: a,
        };
      })(r),
      {
        uri: a,
        isOnChain: i,
        isEncoded: s,
      } = L({ uri: await D(e, { nft: n }), gatewayUrls: t });
    if (i && (a.includes("data:application/json;base64,") || a.startsWith("{")))
      return j({
        uri: q(
          JSON.parse(
            s ? atob(a.replace("data:application/json;base64,", "")) : a,
          ),
        ),
        gatewayUrls: t,
      });
    let o = n.tokenID;
    return (
      "erc1155" === n.namespace && (o = o.replace("0x", "").padStart(64, "0")),
      M({ gatewayUrls: t, uri: a.replace(/(?:0x)?{id}/, o) })
    );
  }
  async function W(e, t) {
    let {
        blockNumber: r,
        blockTag: n,
        key: c,
        name: u,
        gatewayUrls: f,
        strict: h,
      } = t,
      { chain: m } = e,
      y = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!m)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, o.f)({
          blockNumber: r,
          chain: m,
          contract: "ensUniversalResolver",
        });
      })(),
      g = m?.ensTlds;
    if (g && !g.some((e) => u.endsWith(e))) return null;
    try {
      let t = {
          address: y,
          abi: a.i,
          args: [
            (0, l.g)(v(u)),
            (0, s.f)({ abi: a.N, functionName: "text", args: [w(u), c] }),
            f ?? [p.o],
          ],
          functionName: "resolveWithGateways",
          blockNumber: r,
          blockTag: n,
        },
        o = P(e, E, "readContract"),
        d = await o(t);
      if ("0x" === d[0]) return null;
      let h = (0, i.f)({ abi: a.N, functionName: "text", data: d[0] });
      return "" === h ? null : h;
    } catch (e) {
      if (h) throw e;
      if (d(e)) return null;
      throw e;
    }
  }
  async function K(
    e,
    {
      blockNumber: t,
      blockTag: r,
      assetGatewayUrls: n,
      name: a,
      gatewayUrls: i,
      strict: s,
      universalResolverAddress: o,
    },
  ) {
    let c = await P(
      e,
      W,
      "getEnsText",
    )({
      blockNumber: t,
      blockTag: r,
      key: "avatar",
      name: a,
      universalResolverAddress: o,
      gatewayUrls: i,
      strict: s,
    });
    if (!c) return null;
    try {
      return await V(e, { record: c, gatewayUrls: n });
    } catch {
      return null;
    }
  }
  async function J(e, t) {
    let {
        address: r,
        blockNumber: n,
        blockTag: i,
        coinType: s = 60n,
        gatewayUrls: c,
        strict: l,
      } = t,
      { chain: u } = e,
      f = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!u)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, o.f)({
          blockNumber: n,
          chain: u,
          contract: "ensUniversalResolver",
        });
      })();
    try {
      let t = {
          address: f,
          abi: a.$,
          args: [r, s, c ?? [p.o]],
          functionName: "reverseWithGateways",
          blockNumber: n,
          blockTag: i,
        },
        o = P(e, E, "readContract"),
        [l] = await o(t);
      return l || null;
    } catch (e) {
      if (l) throw e;
      if (d(e)) return null;
      throw e;
    }
  }
  async function Z(e, t) {
    let { blockNumber: r, blockTag: n, name: a } = t,
      { chain: i } = e,
      s = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!i)
          throw Error(
            "client chain not configured. universalResolverAddress is required.",
          );
        return (0, o.f)({
          blockNumber: r,
          chain: i,
          contract: "ensUniversalResolver",
        });
      })(),
      c = i?.ensTlds;
    if (c && !c.some((e) => a.endsWith(e)))
      throw Error(
        `${a} is not a valid ENS TLD (${c?.join(", ")}) for chain "${i.name}" (id: ${i.id}).`,
      );
    let [u] = await P(
      e,
      E,
      "readContract",
    )({
      address: s,
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
      args: [(0, l.g)(v(a))],
      blockNumber: r,
      blockTag: n,
    });
    return u;
  }
  var Y = e.i(836970),
    Q = e.i(691806),
    X = e.i(54003),
    ee = e.i(272903);
  async function et(e, r) {
    let {
        account: n = e.account,
        blockNumber: a,
        blockTag: i = "latest",
        blobs: s,
        data: o,
        gas: c,
        gasPrice: u,
        maxFeePerBlobGas: f,
        maxFeePerGas: d,
        maxPriorityFeePerGas: p,
        to: h,
        value: m,
        ...y
      } = r,
      g = n ? (0, t.f)(n) : void 0;
    try {
      (0, ee.f)(r);
      let t = "bigint" == typeof a ? (0, l.N)(a) : void 0,
        n = e.chain?.formatters?.transactionRequest?.format,
        b = (n || X.f)(
          {
            ...(0, Q.f)(y, { format: n }),
            account: g,
            blobs: s,
            data: o,
            gas: c,
            gasPrice: u,
            maxFeePerBlobGas: f,
            maxFeePerGas: d,
            maxPriorityFeePerGas: p,
            to: h,
            value: m,
          },
          "createAccessList",
        ),
        w = await e.request({
          method: "eth_createAccessList",
          params: [b, t || i],
        });
      return { accessList: w.accessList, gasUsed: BigInt(w.gasUsed) };
    } catch (t) {
      throw (0, Y.f)(t, { ...r, account: g, chain: e.chain });
    }
  }
  function er(e, { method: t }) {
    let r = {};
    return (
      "fallback" === e.transport.type &&
        e.transport.onResponse?.(
          ({ method: e, response: n, status: a, transport: i }) => {
            "success" === a && t === e && (r[n] = i.request);
          },
        ),
      (t) => r[t] || e.request
    );
  }
  async function en(e) {
    let t = er(e, { method: "eth_newBlockFilter" }),
      r = await e.request({ method: "eth_newBlockFilter" });
    return { id: r, request: t(r), type: "block" };
  }
  var ea = u;
  class ei extends ea.f {
    constructor(e) {
      super(`Filter type "${e}" is not supported.`, {
        name: "FilterTypeNotSupportedError",
      });
    }
  }
  var es = e.i(624097),
    eo = e.i(971860),
    ec = e.i(515752),
    el = e.i(178868);
  let eu = "/docs/contract/encodeEventTopics";
  function ef(e) {
    let { abi: t, eventName: r, args: n } = e,
      a = t[0];
    if (r) {
      let e = (0, el.f)({ abi: t, name: r });
      if (!e) throw new x.V(r, { docsPath: eu });
      a = e;
    }
    if ("event" !== a.type) throw new x.V(void 0, { docsPath: eu });
    let i = (0, ec.r)(a),
      s = (0, es.f)(i),
      o = [];
    if (n && "inputs" in a) {
      let e = a.inputs?.filter((e) => "indexed" in e && e.indexed),
        t = Array.isArray(n)
          ? n
          : Object.values(n).length > 0
            ? (e?.map((e) => n[e.name]) ?? [])
            : [];
      t.length > 0 &&
        (o =
          e?.map((e, r) =>
            Array.isArray(t[r])
              ? t[r].map((n, a) => ed({ param: e, value: t[r][a] }))
              : void 0 !== t[r] && null !== t[r]
                ? ed({ param: e, value: t[r] })
                : null,
          ) ?? []);
    }
    return [s, ...o];
  }
  function ed({ param: e, value: t }) {
    if ("string" === e.type || "bytes" === e.type) return (0, y.f)((0, m.D)(t));
    if ("tuple" === e.type || e.type.match(/^(.*)\[(\d+)?\]$/))
      throw new ei(e.type);
    return (0, eo.N)([e], [t]);
  }
  async function ep(e, t) {
    let {
        address: r,
        abi: n,
        args: a,
        eventName: i,
        fromBlock: s,
        strict: o,
        toBlock: c,
      } = t,
      u = er(e, { method: "eth_newFilter" }),
      f = i ? ef({ abi: n, args: a, eventName: i }) : void 0,
      d = await e.request({
        method: "eth_newFilter",
        params: [
          {
            address: r,
            fromBlock: "bigint" == typeof s ? (0, l.N)(s) : s,
            toBlock: "bigint" == typeof c ? (0, l.N)(c) : c,
            topics: f,
          },
        ],
      });
    return {
      abi: n,
      args: a,
      eventName: i,
      id: d,
      request: u(d),
      strict: !!o,
      type: "event",
    };
  }
  async function eh(
    e,
    {
      address: t,
      args: r,
      event: n,
      events: a,
      fromBlock: i,
      strict: s,
      toBlock: o,
    } = {},
  ) {
    let c = a ?? (n ? [n] : void 0),
      u = er(e, { method: "eth_newFilter" }),
      f = [];
    c &&
      ((f = [c.flatMap((e) => ef({ abi: [e], eventName: e.name, args: r }))]),
      n && (f = f[0]));
    let d = await e.request({
      method: "eth_newFilter",
      params: [
        {
          address: t,
          fromBlock: "bigint" == typeof i ? (0, l.N)(i) : i,
          toBlock: "bigint" == typeof o ? (0, l.N)(o) : o,
          ...(f.length ? { topics: f } : {}),
        },
      ],
    });
    return {
      abi: c,
      args: r,
      eventName: n ? n.name : void 0,
      fromBlock: i,
      id: d,
      request: u(d),
      strict: !!s,
      toBlock: o,
      type: "event",
    };
  }
  async function em(e) {
    let t = er(e, { method: "eth_newPendingTransactionFilter" }),
      r = await e.request({ method: "eth_newPendingTransactionFilter" });
    return { id: r, request: t(r), type: "transaction" };
  }
  var ey = e.i(460678),
    eg = e.i(495325),
    eb = e.i(408708),
    ew = u,
    ev = e.i(534446);
  class eP extends ew.f {
    constructor(
      e,
      {
        account: t,
        docsPath: r,
        chain: n,
        data: a,
        gas: i,
        gasPrice: s,
        maxFeePerGas: o,
        maxPriorityFeePerGas: c,
        nonce: l,
        to: u,
        value: f,
      },
    ) {
      let d = (0, ev.P)({
        from: t?.address,
        to: u,
        value:
          void 0 !== f &&
          `${(0, eg.f)(f)} ${n?.nativeCurrency?.symbol || "ETH"}`,
        data: a,
        gas: i,
        gasPrice: void 0 !== s && `${(0, eb.f)(s)} gwei`,
        maxFeePerGas: void 0 !== o && `${(0, eb.f)(o)} gwei`,
        maxPriorityFeePerGas: void 0 !== c && `${(0, eb.f)(c)} gwei`,
        nonce: l,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: r,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Estimate Gas Arguments:",
          d,
        ].filter(Boolean),
        name: "EstimateGasExecutionError",
      }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = e));
    }
  }
  var ex = e.i(960872),
    eB = e.i(938910),
    eA = e.i(323836),
    eN = u;
  class ek extends eN.f {
    constructor() {
      super("`baseFeeMultiplier` must be greater than 1.", {
        name: "BaseFeeScalarError",
      });
    }
  }
  class eE extends eN.f {
    constructor() {
      super("Chain does not support EIP-1559 fees.", {
        name: "Eip1559FeesNotSupportedError",
      });
    }
  }
  class eI extends eN.f {
    constructor({ maxPriorityFeePerGas: e }) {
      super(
        `\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${(0, eb.f)(e)} gwei).`,
        { name: "MaxFeePerGasTooLowError" },
      );
    }
  }
  var eT = e.i(382772),
    eF = u;
  class e$ extends eF.f {
    constructor({ blockHash: e, blockNumber: t }) {
      let r = "Block";
      (e && (r = `Block at hash "${e}"`),
        t && (r = `Block at number "${t}"`),
        super(`${r} could not be found.`, { name: "BlockNotFoundError" }));
    }
  }
  var eR = e.i(694810);
  async function eC(
    e,
    {
      blockHash: t,
      blockNumber: r,
      blockTag: n = e.experimental_blockTag ?? "latest",
      includeTransactions: a,
    } = {},
  ) {
    let i = a ?? !1,
      s = void 0 !== r ? (0, l.N)(r) : void 0,
      o = null;
    if (
      !(o = t
        ? await e.request(
            { method: "eth_getBlockByHash", params: [t, i] },
            { dedupe: !0 },
          )
        : await e.request(
            { method: "eth_getBlockByNumber", params: [s || n, i] },
            { dedupe: !!s },
          ))
    )
      throw new e$({ blockHash: t, blockNumber: r });
    return (e.chain?.formatters?.block?.format || eR.K)(o, "getBlock");
  }
  async function eS(e) {
    return BigInt(await e.request({ method: "eth_gasPrice" }));
  }
  async function eO(e, t) {
    return ez(e, t);
  }
  async function ez(e, t) {
    let { block: r, chain: n = e.chain, request: a } = t || {};
    try {
      let t = n?.fees?.maxPriorityFeePerGas ?? n?.fees?.defaultPriorityFee;
      if ("function" == typeof t) {
        let n = r || (await P(e, eC, "getBlock")({})),
          i = await t({ block: n, client: e, request: a });
        if (null === i) throw Error();
        return i;
      }
      if (void 0 !== t) return t;
      let i = await e.request({ method: "eth_maxPriorityFeePerGas" });
      return (0, eT.K)(i);
    } catch {
      let [t, n] = await Promise.all([
        r ? Promise.resolve(r) : P(e, eC, "getBlock")({}),
        P(e, eS, "getGasPrice")({}),
      ]);
      if ("bigint" != typeof t.baseFeePerGas) throw new eE();
      let a = n - t.baseFeePerGas;
      if (a < 0n) return 0n;
      return a;
    }
  }
  async function eU(e, t) {
    return eG(e, t);
  }
  async function eG(e, t) {
    let {
        block: r,
        chain: n = e.chain,
        request: a,
        type: i = "eip1559",
      } = t || {},
      s = await (async () =>
        "function" == typeof n?.fees?.baseFeeMultiplier
          ? n.fees.baseFeeMultiplier({ block: r, client: e, request: a })
          : (n?.fees?.baseFeeMultiplier ?? 1.2))();
    if (s < 1) throw new ek();
    let o = s.toString().split(".")[1]?.length ?? 0,
      c = 10 ** o,
      l = (e) => (e * BigInt(Math.ceil(s * c))) / BigInt(c),
      u = r || (await P(e, eC, "getBlock")({}));
    if ("function" == typeof n?.fees?.estimateFeesPerGas) {
      let t = await n.fees.estimateFeesPerGas({
        block: r,
        client: e,
        multiply: l,
        request: a,
        type: i,
      });
      if (null !== t) return t;
    }
    if ("eip1559" === i) {
      if ("bigint" != typeof u.baseFeePerGas) throw new eE();
      let t =
          "bigint" == typeof a?.maxPriorityFeePerGas
            ? a.maxPriorityFeePerGas
            : await ez(e, { block: u, chain: n, request: a }),
        r = l(u.baseFeePerGas);
      return {
        maxFeePerGas: a?.maxFeePerGas ?? r + t,
        maxPriorityFeePerGas: t,
      };
    }
    return { gasPrice: a?.gasPrice ?? l(await P(e, eS, "getGasPrice")({})) };
  }
  async function e_(e, { address: t, blockTag: r = "latest", blockNumber: n }) {
    let a = await e.request(
      {
        method: "eth_getTransactionCount",
        params: [t, "bigint" == typeof n ? (0, l.N)(n) : r],
      },
      { dedupe: !!n },
    );
    return (0, eT.T)(a);
  }
  (e.s(["w", 0, eU, "p", 0, eG], 406699), e.s(["f", 0, e_], 260430));
  var eL = e.i(373967),
    eq = e.i(873055),
    eM = e.i(651464),
    ej = e.i(406638),
    eD = e.i(533030),
    eV = e.i(23094),
    eH = e.i(787821);
  async function eW(e) {
    let t = await e.request({ method: "eth_chainId" }, { dedupe: !0 });
    return (0, eT.T)(t);
  }
  async function eK(e, r) {
    let {
        account: n = e.account,
        accessList: a,
        authorizationList: i,
        chain: s = e.chain,
        blobVersionedHashes: o,
        blobs: c,
        data: l,
        gas: u,
        gasPrice: f,
        maxFeePerBlobGas: d,
        maxFeePerGas: p,
        maxPriorityFeePerGas: h,
        nonce: m,
        nonceManager: y,
        to: g,
        type: b,
        value: w,
        ...v
      } = r,
      x = await (async () => {
        if (!n || !y || void 0 !== m) return m;
        let r = (0, t.f)(n),
          a = s ? s.id : await P(e, eW, "getChainId")({});
        return await y.consume({ address: r.address, chainId: a, client: e });
      })();
    (0, ee.f)(r);
    let B = s?.formatters?.transactionRequest?.format,
      A = (B || X.f)(
        {
          ...(0, Q.f)(v, { format: B }),
          account: n ? (0, t.f)(n) : void 0,
          accessList: a,
          authorizationList: i,
          blobs: c,
          blobVersionedHashes: o,
          data: l,
          gas: u,
          gasPrice: f,
          maxFeePerBlobGas: d,
          maxFeePerGas: p,
          maxPriorityFeePerGas: h,
          nonce: x,
          to: g,
          type: b,
          value: w,
        },
        "fillTransaction",
      );
    try {
      let t = await e.request({ method: "eth_fillTransaction", params: [A] }),
        n = (s?.formatters?.transaction?.format || eH.F)(t.tx);
      (delete n.blockHash,
        delete n.blockNumber,
        delete n.r,
        delete n.s,
        delete n.transactionIndex,
        delete n.v,
        delete n.yParity,
        (n.data = n.input),
        n.gas && (n.gas = r.gas ?? n.gas),
        n.gasPrice && (n.gasPrice = r.gasPrice ?? n.gasPrice),
        n.maxFeePerBlobGas &&
          (n.maxFeePerBlobGas = r.maxFeePerBlobGas ?? n.maxFeePerBlobGas),
        n.maxFeePerGas && (n.maxFeePerGas = r.maxFeePerGas ?? n.maxFeePerGas),
        n.maxPriorityFeePerGas &&
          (n.maxPriorityFeePerGas =
            r.maxPriorityFeePerGas ?? n.maxPriorityFeePerGas),
        n.nonce && (n.nonce = r.nonce ?? n.nonce));
      let a = await (async () => {
        if ("function" == typeof s?.fees?.baseFeeMultiplier) {
          let t = await P(e, eC, "getBlock")({});
          return s.fees.baseFeeMultiplier({ block: t, client: e, request: r });
        }
        return s?.fees?.baseFeeMultiplier ?? 1.2;
      })();
      if (a < 1) throw new ek();
      let i = a.toString().split(".")[1]?.length ?? 0,
        o = 10 ** i,
        c = (e) => (e * BigInt(Math.ceil(a * o))) / BigInt(o);
      return (
        n.maxFeePerGas &&
          !r.maxFeePerGas &&
          (n.maxFeePerGas = c(n.maxFeePerGas)),
        n.gasPrice && !r.gasPrice && (n.gasPrice = c(n.gasPrice)),
        { raw: t.raw, transaction: { from: A.from, ...n } }
      );
    } catch (t) {
      throw (function (e, { docsPath: t, ...r }) {
        let n,
          a = (n = (0, eB.f)(e, r)) instanceof ex.b ? e : n;
        return new ev.T(a, { docsPath: t, ...r });
      })(t, { ...r, chain: e.chain });
    }
  }
  e.s(["f", 0, eW], 656025);
  let eJ = ["blobVersionedHashes", "chainId", "fees", "gas", "nonce", "type"],
    eZ = new Map(),
    eY = new eD.f(128);
  async function eQ(e, r) {
    let n,
      a,
      i = r;
    ((i.account ??= e.account), (i.parameters ??= eJ));
    let { account: s, chain: o = e.chain, nonceManager: c, parameters: l } = i,
      u =
        "function" == typeof o?.prepareTransactionRequest
          ? {
              fn: o.prepareTransactionRequest,
              runAt: ["beforeFillTransaction"],
            }
          : Array.isArray(o?.prepareTransactionRequest)
            ? {
                fn: o.prepareTransactionRequest[0],
                runAt: o.prepareTransactionRequest[1].runAt,
              }
            : void 0;
    async function f() {
      return (
        n ||
        (void 0 !== i.chainId
          ? i.chainId
          : o
            ? o.id
            : (n = await P(e, eW, "getChainId")({})))
      );
    }
    let d = s ? (0, t.f)(s) : s,
      p = i.nonce;
    if (l.includes("nonce") && void 0 === p && d && c) {
      let t = await f();
      p = await c.consume({ address: d.address, chainId: t, client: e });
    }
    u?.fn &&
      u.runAt?.includes("beforeFillTransaction") &&
      ((i = await u.fn({ ...i, chain: o }, { phase: "beforeFillTransaction" })),
      (p ??= i.nonce));
    let h =
      (!(l.includes("blobVersionedHashes") || l.includes("sidecars")) ||
        !i.kzg ||
        !i.blobs) &&
      !1 !== eY.get(e.uid) &&
      ["fees", "gas"].some((e) => l.includes(e)) &&
      ((l.includes("chainId") && "number" != typeof i.chainId) ||
        (l.includes("nonce") && "number" != typeof p) ||
        (l.includes("fees") &&
          "bigint" != typeof i.gasPrice &&
          ("bigint" != typeof i.maxFeePerGas ||
            "bigint" != typeof i.maxPriorityFeePerGas)) ||
        (l.includes("gas") && "bigint" != typeof i.gas))
        ? await P(
            e,
            eK,
            "fillTransaction",
          )({ ...i, nonce: p })
            .then((t) => {
              let {
                chainId: r,
                from: n,
                gas: a,
                gasPrice: s,
                nonce: o,
                maxFeePerBlobGas: c,
                maxFeePerGas: l,
                maxPriorityFeePerGas: u,
                type: f,
                ...d
              } = t.transaction;
              return (
                eY.set(e.uid, !0),
                {
                  ...i,
                  ...(n ? { from: n } : {}),
                  ...(f ? { type: f } : {}),
                  ...(void 0 !== r ? { chainId: r } : {}),
                  ...(void 0 !== a ? { gas: a } : {}),
                  ...(void 0 !== s ? { gasPrice: s } : {}),
                  ...(void 0 !== o ? { nonce: o } : {}),
                  ...(void 0 !== c ? { maxFeePerBlobGas: c } : {}),
                  ...(void 0 !== l ? { maxFeePerGas: l } : {}),
                  ...(void 0 !== u ? { maxPriorityFeePerGas: u } : {}),
                  ...("nonceKey" in d && void 0 !== d.nonceKey
                    ? { nonceKey: d.nonceKey }
                    : {}),
                }
              );
            })
            .catch(
              (t) => (
                "TransactionExecutionError" !== t.name ||
                  (t.walk?.(
                    (e) =>
                      "MethodNotFoundRpcError" === e.name ||
                      "MethodNotSupportedRpcError" === e.name,
                  ) &&
                    eY.set(e.uid, !1)),
                i
              ),
            )
        : i;
    p ??= h.nonce;
    let {
      blobs: m,
      gas: y,
      kzg: g,
      type: b,
    } = (i = {
      ...h,
      ...(d ? { from: d?.address } : {}),
      ...(p ? { nonce: p } : {}),
    });
    async function w() {
      return a || (a = await P(e, eC, "getBlock")({ blockTag: "latest" }));
    }
    if (
      (u?.fn &&
        u.runAt?.includes("beforeFillParameters") &&
        (i = await u.fn({ ...i, chain: o }, { phase: "beforeFillParameters" })),
      l.includes("nonce") &&
        void 0 === p &&
        d &&
        !c &&
        (i.nonce = await P(
          e,
          e_,
          "getTransactionCount",
        )({ address: d.address, blockTag: "pending" })),
      (l.includes("blobVersionedHashes") || l.includes("sidecars")) && m && g)
    ) {
      let e = (0, eL.f)({ blobs: m, kzg: g });
      if (l.includes("blobVersionedHashes")) {
        let t = (0, eM.f)({ commitments: e, to: "hex" });
        i.blobVersionedHashes = t;
      }
      if (l.includes("sidecars")) {
        let t = (0, eq.f)({ blobs: m, commitments: e, kzg: g }),
          r = (0, ej.f)({ blobs: m, commitments: e, proofs: t, to: "hex" });
        i.sidecars = r;
      }
    }
    if (
      (l.includes("chainId") && (i.chainId = await f()),
      (l.includes("fees") || l.includes("type")) && void 0 === b)
    )
      try {
        i.type = (0, eV.f)(i);
      } catch {
        let t = eZ.get(e.uid);
        if (void 0 === t) {
          let r = await w();
          ((t = "bigint" == typeof r?.baseFeePerGas), eZ.set(e.uid, t));
        }
        i.type = t ? "eip1559" : "legacy";
      }
    if (l.includes("fees"))
      if ("legacy" !== i.type && "eip2930" !== i.type) {
        if (void 0 === i.maxFeePerGas || void 0 === i.maxPriorityFeePerGas) {
          let t = await w(),
            { maxFeePerGas: r, maxPriorityFeePerGas: n } = await eG(e, {
              block: t,
              chain: o,
              request: i,
            });
          if (
            void 0 === i.maxPriorityFeePerGas &&
            i.maxFeePerGas &&
            i.maxFeePerGas < n
          )
            throw new eI({ maxPriorityFeePerGas: n });
          ((i.maxPriorityFeePerGas = n), (i.maxFeePerGas = r));
        }
      } else {
        if (void 0 !== i.maxFeePerGas || void 0 !== i.maxPriorityFeePerGas)
          throw new eE();
        if (void 0 === i.gasPrice) {
          let t = await w(),
            { gasPrice: r } = await eG(e, {
              block: t,
              chain: o,
              request: i,
              type: "legacy",
            });
          i.gasPrice = r;
        }
      }
    return (
      l.includes("gas") &&
        void 0 === y &&
        (i.gas = await P(
          e,
          eX,
          "estimateGas",
        )({
          ...i,
          account: d,
          prepare: d?.type === "local" ? [] : ["blobVersionedHashes"],
        })),
      u?.fn &&
        u.runAt?.includes("afterFillParameters") &&
        (i = await u.fn({ ...i, chain: o }, { phase: "afterFillParameters" })),
      (0, ee.f)(i),
      delete i.parameters,
      i
    );
  }
  async function eX(e, r) {
    let { account: n = e.account, prepare: a = !0 } = r,
      i = n ? (0, t.f)(n) : void 0,
      s = Array.isArray(a)
        ? a
        : i?.type !== "local"
          ? ["blobVersionedHashes"]
          : void 0;
    try {
      let t = await (async () =>
          r.to
            ? r.to
            : r.authorizationList && r.authorizationList.length > 0
              ? await (0, ey.f)({
                  authorization: r.authorizationList[0],
                }).catch(() => {
                  throw new u.f(
                    "`to` is required. Could not infer from `authorizationList`",
                  );
                })
              : void 0)(),
        {
          accessList: n,
          authorizationList: o,
          blobs: c,
          blobVersionedHashes: f,
          blockNumber: d,
          blockTag: p,
          data: h,
          gas: m,
          gasPrice: y,
          maxFeePerBlobGas: g,
          maxFeePerGas: b,
          maxPriorityFeePerGas: w,
          nonce: v,
          value: P,
          stateOverride: x,
          ...B
        } = a ? await eQ(e, { ...r, parameters: s, to: t }) : r;
      if (m && r.gas !== m) return m;
      let A = ("bigint" == typeof d ? (0, l.N)(d) : void 0) || p,
        N = (0, eA.f)(x);
      (0, ee.f)(r);
      let k = e.chain?.formatters?.transactionRequest?.format,
        E = (k || X.f)(
          {
            ...(0, Q.f)(B, { format: k }),
            account: i,
            accessList: n,
            authorizationList: o,
            blobs: c,
            blobVersionedHashes: f,
            data: h,
            gasPrice: y,
            maxFeePerBlobGas: g,
            maxFeePerGas: b,
            maxPriorityFeePerGas: w,
            nonce: v,
            to: t,
            value: P,
          },
          "estimateGas",
        );
      return BigInt(
        await e.request({
          method: "eth_estimateGas",
          params: N
            ? [E, A ?? e.experimental_blockTag ?? "latest", N]
            : A
              ? [E, A]
              : [E],
        }),
      );
    } catch (t) {
      throw (function (e, { docsPath: t, ...r }) {
        let n;
        return new eP((n = (0, eB.f)(e, r)) instanceof ex.b ? e : n, {
          docsPath: t,
          ...r,
        });
      })(t, { ...r, account: i, chain: e.chain });
    }
  }
  async function e0(e, r) {
    let {
        abi: n,
        address: a,
        args: i,
        functionName: o,
        dataSuffix: c,
        ...l
      } = r,
      u = (0, s.f)({ abi: n, args: i, functionName: o });
    try {
      return await P(
        e,
        eX,
        "estimateGas",
      )({ data: `${u}${c ? c.replace("0x", "") : ""}`, to: a, ...l });
    } catch (r) {
      let e = l.account ? (0, t.f)(l.account) : void 0;
      throw N(r, {
        abi: n,
        address: a,
        args: i,
        docsPath: "/docs/contract/estimateContractGas",
        functionName: o,
        sender: e?.address,
      });
    }
  }
  async function e1(
    e,
    {
      address: t,
      blockNumber: r,
      blockTag: n = e.experimental_blockTag ?? "latest",
    },
  ) {
    let a = "bigint" == typeof r ? (0, l.N)(r) : void 0;
    return BigInt(
      await e.request({ method: "eth_getBalance", params: [t, a || n] }),
    );
  }
  async function e2(e) {
    return BigInt(await e.request({ method: "eth_blobBaseFee" }));
  }
  let e6 = new Map(),
    e5 = new Map();
  async function e3(e, { cacheKey: t, cacheTime: r = 1 / 0 }) {
    let n,
      a,
      i,
      s =
        ((a = (n = (e, t) => ({
          clear: () => t.delete(e),
          get: () => t.get(e),
          set: (r) => t.set(e, r),
        }))(t, e6)),
        {
          clear: () => {
            (a.clear(), i.clear());
          },
          promise: a,
          response: (i = n(t, e5)),
        }),
      o = s.response.get();
    if (o && r > 0 && Date.now() - o.created.getTime() < r) return o.data;
    let c = s.promise.get();
    c || ((c = e()), s.promise.set(c));
    try {
      let e = await c;
      return (s.response.set({ created: new Date(), data: e }), e);
    } finally {
      s.promise.clear();
    }
  }
  async function e8(e, { cacheTime: t = e.cacheTime } = {}) {
    let r;
    return BigInt(
      await e3(() => e.request({ method: "eth_blockNumber" }), {
        cacheKey: ((r = e.uid), `blockNumber.${r}`),
        cacheTime: t,
      }),
    );
  }
  async function e4(
    e,
    { blockHash: t, blockNumber: r, blockTag: n = "latest" } = {},
  ) {
    let a,
      i = void 0 !== r ? (0, l.N)(r) : void 0;
    return (
      (a = t
        ? await e.request(
            { method: "eth_getBlockTransactionCountByHash", params: [t] },
            { dedupe: !0 },
          )
        : await e.request(
            {
              method: "eth_getBlockTransactionCountByNumber",
              params: [i || n],
            },
            { dedupe: !!i },
          )),
      (0, eT.T)(a)
    );
  }
  async function e9(e, { address: t, blockNumber: r, blockTag: n = "latest" }) {
    let a = void 0 !== r ? (0, l.N)(r) : void 0,
      i = await e.request(
        { method: "eth_getCode", params: [t, a || n] },
        { dedupe: !!a },
      );
    if ("0x" !== i) return i;
  }
  e.s(["f", 0, e9], 351658);
  var e7 = e.i(542231),
    te = e.i(782102),
    tt = e.i(612735),
    tr = e.i(887857);
  let tn = "/docs/contract/decodeEventLog";
  function ta(e) {
    let { abi: t, data: r, strict: n, topics: a } = e,
      i = n ?? !0,
      [s, ...o] = a;
    if (!s) throw new x.R({ docsPath: tn });
    let c = t.find((e) => "event" === e.type && s === (0, es.f)((0, ec.r)(e)));
    if (!(c && "name" in c) || "event" !== c.type)
      throw new x.u(s, { docsPath: tn });
    let { name: l, inputs: u } = c,
      f = u?.some((e) => !("name" in e && e.name)),
      d = f ? [] : {},
      p = u.map((e, t) => [e, t]).filter(([e]) => "indexed" in e && e.indexed);
    for (let e = 0; e < p.length; e++) {
      let [t, r] = p[e],
        n = o[e];
      if (!n) throw new x.s({ abiItem: c, param: t });
      d[f ? r : t.name || r] = (function ({ param: e, value: t }) {
        return "string" === e.type ||
          "bytes" === e.type ||
          "tuple" === e.type ||
          e.type.match(/^(.*)\[(\d+)?\]$/)
          ? t
          : ((0, tr.f)([e], t) || [])[0];
      })({ param: t, value: n });
    }
    let h = u.filter((e) => !("indexed" in e && e.indexed));
    if (h.length > 0) {
      if (r && "0x" !== r)
        try {
          let e = (0, tr.f)(h, r);
          if (e)
            if (f) for (let t = 0; t < u.length; t++) d[t] = d[t] ?? e.shift();
            else for (let t = 0; t < h.length; t++) d[h[t].name] = e[t];
        } catch (e) {
          if (i) {
            if (e instanceof x.D || e instanceof te.n)
              throw new x.t({
                abiItem: c,
                data: r,
                params: h,
                size: (0, tt.f)(r),
              });
            throw e;
          }
        }
      else if (i) throw new x.t({ abiItem: c, data: "0x", params: h, size: 0 });
    }
    return { eventName: l, args: Object.values(d).length > 0 ? d : void 0 };
  }
  function ti(e) {
    let { abi: t, args: r, logs: n, strict: a = !0 } = e,
      i = (() => {
        if (e.eventName)
          return Array.isArray(e.eventName) ? e.eventName : [e.eventName];
      })();
    return n
      .map((e) => {
        let n,
          s,
          o = t.filter(
            (t) => "event" === t.type && e.topics[0] === (0, es.f)(t),
          );
        if (0 === o.length) return null;
        for (let t of o)
          try {
            ((n = ta({ ...e, abi: [t], strict: !0 })), (s = t));
            break;
          } catch {}
        if (!n && !a) {
          s = o[0];
          try {
            n = ta({ ...e, abi: [s], strict: !1 });
          } catch {
            let t = s.inputs?.some((e) => !("name" in e && e.name));
            return { ...e, args: t ? [] : {}, eventName: s.name };
          }
        }
        return n &&
          s &&
          (!i || i.includes(n.eventName)) &&
          (function (e) {
            let { args: t, inputs: r, matchArgs: n } = e;
            if (!n) return !0;
            if (!t) return !1;
            function a(e, t, r) {
              try {
                if ("address" === e.type) return (0, e7.f)(t, r);
                if ("string" === e.type || "bytes" === e.type)
                  return (0, y.f)((0, m.D)(t)) === r;
                return t === r;
              } catch {
                return !1;
              }
            }
            return Array.isArray(t) && Array.isArray(n)
              ? n.every((e, n) => {
                  if (null == e) return !0;
                  let i = r[n];
                  return (
                    !!i &&
                    (Array.isArray(e) ? e : [e]).some((e) => a(i, e, t[n]))
                  );
                })
              : !(
                  "object" != typeof t ||
                  Array.isArray(t) ||
                  "object" != typeof n ||
                  Array.isArray(n)
                ) &&
                  Object.entries(n).every(([e, n]) => {
                    if (null == n) return !0;
                    let i = r.find((t) => t.name === e);
                    return (
                      !!i &&
                      (Array.isArray(n) ? n : [n]).some((r) => a(i, r, t[e]))
                    );
                  });
          })({ args: n.args, inputs: s.inputs, matchArgs: r })
          ? { ...n, ...e }
          : null;
      })
      .filter(Boolean);
  }
  e.s(["f", 0, ta], 427718);
  var ts = e.i(564099);
  async function to(
    e,
    {
      address: t,
      blockHash: r,
      fromBlock: n,
      toBlock: a,
      event: i,
      events: s,
      args: o,
      strict: c,
    } = {},
  ) {
    let u = s ?? (i ? [i] : void 0),
      f = [];
    u &&
      ((f = [
        u.flatMap((e) =>
          ef({ abi: [e], eventName: e.name, args: s ? void 0 : o }),
        ),
      ]),
      i && (f = f[0]));
    let d = (
      r
        ? await e.request({
            method: "eth_getLogs",
            params: [{ address: t, topics: f, blockHash: r }],
          })
        : await e.request({
            method: "eth_getLogs",
            params: [
              {
                address: t,
                topics: f,
                fromBlock: "bigint" == typeof n ? (0, l.N)(n) : n,
                toBlock: "bigint" == typeof a ? (0, l.N)(a) : a,
              },
            ],
          })
    ).map((e) => (0, ts.f)(e));
    return u ? ti({ abi: u, args: o, logs: d, strict: c ?? !1 }) : d;
  }
  async function tc(e, t) {
    let {
        abi: r,
        address: n,
        args: a,
        blockHash: i,
        eventName: s,
        fromBlock: o,
        toBlock: c,
        strict: l,
      } = t,
      u = s ? (0, el.f)({ abi: r, name: s }) : void 0,
      f = u ? void 0 : r.filter((e) => "event" === e.type);
    return P(
      e,
      to,
      "getLogs",
    )({
      address: n,
      args: a,
      blockHash: i,
      event: u,
      events: f,
      fromBlock: o,
      toBlock: c,
      strict: l,
    });
  }
  var tl = u;
  class tu extends tl.f {
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
  async function tf(e, t) {
    let { address: r, factory: n, factoryData: a } = t;
    try {
      let [t, i, s, o, c, l, u] = await P(
        e,
        E,
        "readContract",
      )({
        abi: td,
        address: r,
        functionName: "eip712Domain",
        factory: n,
        factoryData: a,
      });
      return {
        domain: {
          name: i,
          version: s,
          chainId: Number(o),
          verifyingContract: c,
          salt: l,
        },
        extensions: u,
        fields: t,
      };
    } catch (e) {
      if (
        "ContractFunctionExecutionError" === e.name &&
        "ContractFunctionZeroDataError" === e.cause.name
      )
        throw new tu({ address: r });
      throw e;
    }
  }
  let td = [
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
  async function tp(
    e,
    {
      blockCount: t,
      blockNumber: r,
      blockTag: n = "latest",
      rewardPercentiles: a,
    },
  ) {
    var i;
    let s = "bigint" == typeof r ? (0, l.N)(r) : void 0;
    return {
      baseFeePerGas: (i = await e.request(
        { method: "eth_feeHistory", params: [(0, l.N)(t), s || n, a] },
        { dedupe: !!s },
      )).baseFeePerGas.map((e) => BigInt(e)),
      gasUsedRatio: i.gasUsedRatio,
      oldestBlock: BigInt(i.oldestBlock),
      reward: i.reward?.map((e) => e.map((e) => BigInt(e))),
    };
  }
  async function th(e, { filter: t }) {
    let r = "strict" in t && t.strict,
      n = await t.request({ method: "eth_getFilterChanges", params: [t.id] });
    if ("string" == typeof n[0]) return n;
    let a = n.map((e) => (0, ts.f)(e));
    return "abi" in t && t.abi ? ti({ abi: t.abi, logs: a, strict: r }) : a;
  }
  async function tm(e, { filter: t }) {
    let r = t.strict ?? !1,
      n = (
        await t.request({ method: "eth_getFilterLogs", params: [t.id] })
      ).map((e) => (0, ts.f)(e));
    return t.abi ? ti({ abi: t.abi, logs: n, strict: r }) : n;
  }
  async function ty(
    e,
    { address: t, blockNumber: r, blockTag: n, storageKeys: a },
  ) {
    let i = void 0 !== r ? (0, l.N)(r) : void 0;
    var s = await e.request({
      method: "eth_getProof",
      params: [t, a, i || (n ?? "latest")],
    });
    return {
      ...s,
      balance: s.balance ? BigInt(s.balance) : void 0,
      nonce: s.nonce ? (0, eT.T)(s.nonce) : void 0,
      storageProof: s.storageProof
        ? s.storageProof.map((e) => ({ ...e, value: BigInt(e.value) }))
        : void 0,
    };
  }
  async function tg(
    e,
    { address: t, blockNumber: r, blockTag: n = "latest", slot: a },
  ) {
    let i = void 0 !== r ? (0, l.N)(r) : void 0;
    return await e.request({
      method: "eth_getStorageAt",
      params: [t, a, i || n],
    });
  }
  async function tb(
    e,
    {
      blockHash: t,
      blockNumber: r,
      blockTag: n,
      hash: a,
      index: i,
      sender: s,
      nonce: o,
    },
  ) {
    let c = n || "latest",
      u = void 0 !== r ? (0, l.N)(r) : void 0,
      f = null;
    if (
      (a
        ? (f = await e.request(
            { method: "eth_getTransactionByHash", params: [a] },
            { dedupe: !0 },
          ))
        : t
          ? (f = await e.request(
              {
                method: "eth_getTransactionByBlockHashAndIndex",
                params: [t, (0, l.N)(i)],
              },
              { dedupe: !0 },
            ))
          : (u || c) && "number" == typeof i
            ? (f = await e.request(
                {
                  method: "eth_getTransactionByBlockNumberAndIndex",
                  params: [u || c, (0, l.N)(i)],
                },
                { dedupe: !!u },
              ))
            : s &&
              "number" == typeof o &&
              (f = await e.request(
                {
                  method: "eth_getTransactionBySenderAndNonce",
                  params: [s, (0, l.N)(o)],
                },
                { dedupe: !0 },
              )),
      !f)
    )
      throw new ev.z({
        blockHash: t,
        blockNumber: r,
        blockTag: c,
        hash: a,
        index: i,
      });
    return (e.chain?.formatters?.transaction?.format || eH.F)(
      f,
      "getTransaction",
    );
  }
  async function tw(e, { hash: t, transactionReceipt: r }) {
    let [n, a] = await Promise.all([
        P(e, e8, "getBlockNumber")({}),
        t ? P(e, tb, "getTransaction")({ hash: t }) : void 0,
      ]),
      i = r?.blockNumber || a?.blockNumber;
    return i ? n - i + 1n : 0n;
  }
  var tv = e.i(767924);
  async function tP(e, { hash: t }) {
    let r = await e.request(
      { method: "eth_getTransactionReceipt", params: [t] },
      { dedupe: !0 },
    );
    if (!r) throw new ev.r({ hash: t });
    return (e.chain?.formatters?.transactionReceipt?.format || tv.L)(
      r,
      "getTransactionReceipt",
    );
  }
  var tx = e.i(896675);
  async function tB(e, t) {
    let {
        account: r,
        authorizationList: n,
        allowFailure: c = !0,
        blockNumber: l,
        blockOverrides: d,
        blockTag: p,
        stateOverride: h,
      } = t,
      m = t.contracts,
      {
        batchSize: y = t.batchSize ?? 1024,
        deployless: g = t.deployless ?? !1,
      } = "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      b = (() => {
        if (t.multicallAddress) return t.multicallAddress;
        if (g) return null;
        if (e.chain)
          return (0, o.f)({
            blockNumber: l,
            chain: e.chain,
            contract: "multicall3",
          });
        throw Error(
          "client chain not configured. multicallAddress is required.",
        );
      })(),
      w = [[]],
      v = 0,
      B = 0;
    for (let e = 0; e < m.length; e++) {
      let { abi: t, address: n, args: a, functionName: i } = m[e];
      try {
        let e = (0, s.f)({ abi: t, args: a, functionName: i });
        ((B += (e.length - 2) / 2),
          y > 0 &&
            B > y &&
            w[v].length > 0 &&
            (v++, (B = (e.length - 2) / 2), (w[v] = [])),
          (w[v] = [...w[v], { allowFailure: !0, callData: e, target: n }]));
      } catch (s) {
        let e = N(s, {
          abi: t,
          address: n,
          args: a,
          docsPath: "/docs/contract/multicall",
          functionName: i,
          sender: r,
        });
        if (!c) throw e;
        w[v] = [...w[v], { allowFailure: !0, callData: "0x", target: n }];
      }
    }
    let A = await Promise.allSettled(
        w.map((t) =>
          P(
            e,
            E,
            "readContract",
          )({
            ...(null === b ? { code: tx.c } : { address: b }),
            abi: a.v,
            account: r,
            args: [t],
            authorizationList: n,
            blockNumber: l,
            blockOverrides: d,
            blockTag: p,
            functionName: "aggregate3",
            stateOverride: h,
          }),
        ),
      ),
      k = [];
    for (let e = 0; e < A.length; e++) {
      let t = A[e];
      if ("rejected" === t.status) {
        if (!c) throw t.reason;
        for (let r = 0; r < w[e].length; r++)
          k.push({ status: "failure", error: t.reason, result: void 0 });
        continue;
      }
      let r = t.value;
      for (let t = 0; t < r.length; t++) {
        let { returnData: n, success: a } = r[t],
          { callData: s } = w[e][t],
          { abi: o, address: l, functionName: u, args: d } = m[k.length];
        try {
          if ("0x" === s) throw new x.g();
          if (!a) throw new f.w({ data: n });
          let e = (0, i.f)({ abi: o, args: d, data: n, functionName: u });
          k.push(c ? { result: e, status: "success" } : e);
        } catch (t) {
          let e = N(t, {
            abi: o,
            address: l,
            args: d,
            docsPath: "/docs/contract/multicall",
            functionName: u,
          });
          if (!c) throw e;
          k.push({ error: e, result: void 0, status: "failure" });
        }
      }
    }
    if (k.length !== m.length) throw new u.f("multicall results mismatch");
    return k;
  }
  var tA = e.i(690095);
  async function tN(e, r) {
    let {
      blockNumber: n,
      blockTag: a = e.experimental_blockTag ?? "latest",
      blocks: o,
      returnFullTransactions: c,
      traceTransfers: u,
      validation: d,
    } = r;
    try {
      let r = [];
      for (let e of o) {
        let n = e.blockOverrides ? tA.f(e.blockOverrides) : void 0,
          a = e.calls.map((e) => {
            let r = e.account ? (0, t.f)(e.account) : void 0,
              n = e.abi ? (0, s.f)(e) : e.data,
              a = {
                ...e,
                account: r,
                data: e.dataSuffix ? (0, h.w)([n || "0x", e.dataSuffix]) : n,
                from: e.from ?? r?.address,
              };
            return ((0, ee.f)(a), (0, X.f)(a));
          }),
          i = e.stateOverrides ? (0, eA.f)(e.stateOverrides) : void 0;
        r.push({ blockOverrides: n, calls: a, stateOverrides: i });
      }
      let p = "bigint" == typeof n ? (0, l.N)(n) : void 0;
      return (
        await e.request({
          method: "eth_simulateV1",
          params: [
            {
              blockStateCalls: r,
              returnFullTransactions: c,
              traceTransfers: u,
              validation: d,
            },
            p || a,
          ],
        })
      ).map((e, t) => ({
        ...(0, eR.K)(e),
        calls: e.calls.map((e, r) => {
          let { abi: n, args: a, functionName: s, to: c } = o[t].calls[r],
            l = e.error?.data ?? e.returnData,
            u = BigInt(e.gasUsed),
            d = e.logs?.map((e) => (0, ts.f)(e)),
            p = "0x1" === e.status ? "success" : "failure",
            h =
              n && "success" === p && "0x" !== l
                ? (0, i.f)({ abi: n, data: l, functionName: s })
                : null,
            m = (() => {
              let t;
              if (
                "success" !== p &&
                (e.error?.data === "0x"
                  ? (t = new x.g())
                  : e.error && (t = new f.w(e.error)),
                t)
              )
                return N(t, {
                  abi: n ?? [],
                  address: c ?? "0x",
                  args: a,
                  functionName: s ?? "<unknown>",
                });
            })();
          return {
            data: l,
            gasUsed: u,
            logs: d,
            status: p,
            ...("success" === p ? { result: h } : { error: m }),
          };
        }),
      }));
    } catch (t) {
      let e = (0, eB.f)(t, {});
      if (e instanceof ex.b) throw t;
      throw e;
    }
  }
  var tk = e.i(622275),
    tE = e.i(714764),
    tI = e.i(471418),
    tT = e.i(626014),
    tF = tI,
    t$ = e.i(289214);
  function tR(e, t) {
    if (tL(e) > t) throw new tD({ givenSize: tL(e), maxSize: t });
  }
  function tC(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function tS(e, t = {}) {
    let { dir: r = "left" } = t,
      n = e,
      a = 0;
    for (let e = 0; e < n.length - 1; e++)
      if ("0" === n["left" === r ? e : n.length - e - 1].toString()) a++;
      else break;
    return "left" === r ? n.slice(a) : n.slice(0, n.length - a);
  }
  var tO = e.i(597753),
    tz = e.i(896421);
  let tU = new TextDecoder(),
    tG = new TextEncoder();
  function t_(e, t = {}) {
    let { size: r } = t,
      n = e;
    r && (tO.u(e, r), (n = t$.i(e, r)));
    let a = n.slice(2);
    a.length % 2 && (a = `0${a}`);
    let i = a.length / 2,
      s = new Uint8Array(i);
    for (let e = 0, t = 0; e < i; e++) {
      let r = tC(a.charCodeAt(t++)),
        n = tC(a.charCodeAt(t++));
      if (void 0 === r || void 0 === n)
        throw new tF.f(
          `Invalid byte sequence ("${a[t - 2]}${a[t - 1]}" in "${a}").`,
        );
      s[e] = (r << 4) | n;
    }
    return s;
  }
  function tL(e) {
    return e.length;
  }
  function tq(e, t = {}) {
    let { size: r } = t;
    void 0 !== r && tR(e, r);
    let n = t$.J(e, t);
    return t$.L(n, t);
  }
  function tM(e) {
    return tS(e, { dir: "left" });
  }
  class tj extends tF.f {
    constructor(e) {
      (super(`Bytes value \`${e}\` is not a valid boolean.`, {
        metaMessages: [
          "The bytes array must contain a single byte of either a `0` or `1` value.",
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.InvalidBytesBooleanError",
        }));
    }
  }
  tF.f;
  class tD extends tF.f {
    constructor({ givenSize: e, maxSize: t }) {
      (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeOverflowError",
        }));
    }
  }
  class tV extends tF.f {
    constructor({ offset: e, position: t, size: r }) {
      (super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${r}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SliceOffsetOutOfBoundsError",
        }));
    }
  }
  class tH extends tF.f {
    constructor({ size: e, targetSize: t, type: r }) {
      (super(
        `${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeExceedsPaddingSizeError",
        }));
    }
  }
  function tW(e, t = {}) {
    var r;
    let { as: n = "string" == typeof e ? "Hex" : "Bytes" } = t,
      a = (0, tT.f)(
        e instanceof Uint8Array
          ? e
          : "string" == typeof e
            ? t_(e)
            : (r = e) instanceof Uint8Array
              ? r
              : new Uint8Array(r),
      );
    return "Bytes" === n ? a : t$.J(a);
  }
  class tK extends Map {
    constructor(e) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e));
    }
    get(e) {
      let t = super.get(e);
      return (
        super.has(e) && void 0 !== t && (this.delete(e), super.set(e, t)),
        t
      );
    }
    set(e, t) {
      if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
        let e = this.keys().next().value;
        e && this.delete(e);
      }
      return this;
    }
  }
  let tJ = { checksum: new tK(8192) }.checksum;
  var tZ = tI;
  let tY = /^0x[a-fA-F0-9]{40}$/;
  function tQ(e, t = {}) {
    let { strict: r = !0 } = t;
    if (!tY.test(e)) throw new t1({ address: e, cause: new t2() });
    if (r) {
      if (e.toLowerCase() === e) return;
      if (tX(e) !== e) throw new t1({ address: e, cause: new t6() });
    }
  }
  function tX(e) {
    if (tJ.has(e)) return tJ.get(e);
    tQ(e, { strict: !1 });
    let t = e.substring(2).toLowerCase(),
      r = tW(
        (function (e, t = {}) {
          let { size: r } = t,
            n = tG.encode(e);
          return "number" == typeof r
            ? (tR(n, r),
              (function (e, t = {}) {
                let { dir: r, size: n = 32 } = t;
                if (0 === n) return e;
                if (e.length > n)
                  throw new tH({
                    size: e.length,
                    targetSize: n,
                    type: "Bytes",
                  });
                let a = new Uint8Array(n);
                for (let t = 0; t < n; t++) {
                  let i = "right" === r;
                  a[i ? t : n - t - 1] = e[i ? t : e.length - t - 1];
                }
                return a;
              })(n, { dir: "right", size: r }))
            : n;
        })(t),
        { as: "Bytes" },
      ),
      n = t.split("");
    for (let e = 0; e < 40; e += 2)
      (r[e >> 1] >> 4 >= 8 && n[e] && (n[e] = n[e].toUpperCase()),
        (15 & r[e >> 1]) >= 8 &&
          n[e + 1] &&
          (n[e + 1] = n[e + 1].toUpperCase()));
    let a = `0x${n.join("")}`;
    return (tJ.set(e, a), a);
  }
  function t0(e, t = {}) {
    let { strict: r = !0 } = t ?? {};
    try {
      return (tQ(e, { strict: r }), !0);
    } catch {
      return !1;
    }
  }
  class t1 extends tZ.f {
    constructor({ address: e, cause: t }) {
      (super(`Address "${e}" is invalid.`, { cause: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidAddressError",
        }));
    }
  }
  class t2 extends tZ.f {
    constructor() {
      (super("Address is not a 20 byte (40 hexadecimal character) value."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidInputError",
        }));
    }
  }
  class t6 extends tZ.f {
    constructor() {
      (super("Address does not match its checksum counterpart."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidChecksumError",
        }));
    }
  }
  function t5(e) {
    let t = !0,
      r = "",
      n = 0,
      a = "",
      i = !1;
    for (let s = 0; s < e.length; s++) {
      let o = e[s];
      if (
        (["(", ")", ","].includes(o) && (t = !0),
        "(" === o && n++,
        ")" === o && n--,
        t)
      ) {
        if (0 === n) {
          if (" " === o && ["event", "function", "error", ""].includes(a))
            a = "";
          else if (((a += o), ")" === o)) {
            i = !0;
            break;
          }
          continue;
        }
        if (" " === o) {
          "," !== e[s - 1] && "," !== r && ",(" !== r && ((r = ""), (t = !1));
          continue;
        }
        ((a += o), (r += o));
      }
    }
    if (!i) throw new tI.f("Unable to normalize signature.");
    return a;
  }
  function t3(e, t = {}) {
    let { prepare: r = !0 } = t,
      n = Array.isArray(e) || "string" == typeof e ? tE.f(e) : e;
    return { ...n, ...(r ? { hash: t9(n) } : {}) };
  }
  function t8(e, t, r) {
    let n,
      { args: a = [], prepare: i = !0 } = r ?? {},
      s = t$.g(t, { strict: !1 }),
      o = e.filter((e) =>
        s
          ? "function" === e.type || "error" === e.type
            ? t4(e) === t$.M(t, 0, 4)
            : "event" === e.type && t9(e) === t
          : "name" in e && e.name === t,
      );
    if (0 === o.length) throw new re({ name: t });
    if (1 === o.length) return { ...o[0], ...(i ? { hash: t9(o[0]) } : {}) };
    for (let e of o) {
      if ("inputs" in e) {
        if (!a || 0 === a.length) {
          if (!e.inputs || 0 === e.inputs.length)
            return { ...e, ...(i ? { hash: t9(e) } : {}) };
          continue;
        }
        if (
          e.inputs &&
          0 !== e.inputs.length &&
          e.inputs.length === a.length &&
          a.every((t, r) => {
            let n = "inputs" in e && e.inputs[r];
            return (
              !!n &&
              (function e(t, r) {
                let n = typeof t,
                  a = r.type;
                switch (a) {
                  case "address":
                    return t0(t, { strict: !1 });
                  case "bool":
                    return "boolean" === n;
                  case "function":
                  case "string":
                    return "string" === n;
                  default:
                    if ("tuple" === a && "components" in r)
                      return Object.values(r.components).every((r, n) =>
                        e(Object.values(t)[n], r),
                      );
                    if (
                      /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
                        a,
                      )
                    )
                      return "number" === n || "bigint" === n;
                    if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(a))
                      return "string" === n || t instanceof Uint8Array;
                    if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(a))
                      return (
                        Array.isArray(t) &&
                        t.every((t) =>
                          e(t, {
                            ...r,
                            type: a.replace(/(\[[0-9]{0,}\])$/, ""),
                          }),
                        )
                      );
                    return !1;
                }
              })(t, n)
            );
          })
        ) {
          if (n && "inputs" in n && n.inputs) {
            let t = (function e(t, r, n) {
              for (let a in t) {
                let i = t[a],
                  s = r[a];
                if (
                  "tuple" === i.type &&
                  "tuple" === s.type &&
                  "components" in i &&
                  "components" in s
                )
                  return e(i.components, s.components, n[a]);
                let o = [i.type, s.type];
                if (
                  (o.includes("address") && o.includes("bytes20")) ||
                  (((o.includes("address") && o.includes("string")) ||
                    (o.includes("address") && o.includes("bytes"))) &&
                    t0(n[a], { strict: !1 }))
                )
                  return o;
              }
            })(e.inputs, n.inputs, a);
            if (t)
              throw new t7(
                { abiItem: e, type: t[0] },
                { abiItem: n, type: t[1] },
              );
          }
          n = e;
        }
      }
    }
    let c = (() => {
      if (n) return n;
      let [e, ...t] = o;
      return { ...e, overloads: t };
    })();
    if (!c) throw new re({ name: t });
    return { ...c, ...(i ? { hash: t9(c) } : {}) };
  }
  function t4(...e) {
    let t = (() => {
      if (Array.isArray(e[0])) {
        let [t, r] = e;
        return t8(t, r);
      }
      return e[0];
    })();
    return t$.M(t9(t), 0, 4);
  }
  function t9(...e) {
    let t = (() => {
      if (Array.isArray(e[0])) {
        let [t, r] = e;
        return t8(t, r);
      }
      return e[0];
    })();
    return "string" != typeof t && "hash" in t && t.hash
      ? t.hash
      : tW(
          t$.A(
            (function (...e) {
              let t = (() => {
                if (Array.isArray(e[0])) {
                  let [t, r] = e;
                  return t8(t, r);
                }
                return e[0];
              })();
              return t5("string" == typeof t ? t : tk.f(t));
            })(t),
          ),
        );
  }
  class t7 extends tI.f {
    constructor(e, t) {
      (super("Found ambiguous types in overloaded ABI Items.", {
        metaMessages: [
          `\`${e.type}\` in \`${t5(tk.f(e.abiItem))}\`, and`,
          `\`${t.type}\` in \`${t5(tk.f(t.abiItem))}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI.",
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiItem.AmbiguityError",
        }));
    }
  }
  class re extends tI.f {
    constructor({ name: e, data: t, type: r = "item" }) {
      let n = e ? ` with name "${e}"` : t ? ` with data "${t}"` : "";
      (super(`ABI ${r}${n} not found.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiItem.NotFoundError",
        }));
    }
  }
  tI.f;
  var rt = e.i(269953),
    rr = e.i(623846),
    rn = tI;
  let ra = /^(.*)\[([0-9]*)\]$/,
    ri = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
    rs =
      /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
    ro = 2n ** 256n - 1n;
  function rc(e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let { dynamic: n, encoded: a } = e[r];
      n ? (t += 32) : (t += t$.o(a));
    }
    let r = [],
      n = [],
      a = 0;
    for (let i = 0; i < e.length; i++) {
      let { dynamic: s, encoded: o } = e[i];
      s
        ? (r.push(t$.u(t + a, { size: 32 })), n.push(o), (a += t$.o(o)))
        : r.push(o);
    }
    return t$.w(...r, ...n);
  }
  function rl(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  function ru(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(ru);
    let r = rl(e.type);
    return !!(r && ru({ ...e, type: r[1] }));
  }
  var rf = tI;
  let rd = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: 1 / 0,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new rm({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit,
        });
    },
    assertPosition(e) {
      if (e < 0 || e > this.bytes.length - 1)
        throw new rh({ length: this.bytes.length, position: e });
    },
    decrementPosition(e) {
      if (e < 0) throw new rp({ offset: e });
      let t = this.position - e;
      (this.assertPosition(t), (this.position = t));
    },
    getReadCount(e) {
      return this.positionReadCount.get(e || this.position) || 0;
    },
    incrementPosition(e) {
      if (e < 0) throw new rp({ offset: e });
      let t = this.position + e;
      (this.assertPosition(t), (this.position = t));
    },
    inspectByte(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t), this.bytes[t]);
    },
    inspectBytes(e, t) {
      let r = t ?? this.position;
      return (this.assertPosition(r + e - 1), this.bytes.subarray(r, r + e));
    },
    inspectUint8(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t), this.bytes[t]);
    },
    inspectUint16(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t + 1), this.dataView.getUint16(t));
    },
    inspectUint24(e) {
      let t = e ?? this.position;
      return (
        this.assertPosition(t + 2),
        (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
      );
    },
    inspectUint32(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t + 3), this.dataView.getUint32(t));
    },
    pushByte(e) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = e),
        this.position++);
    },
    pushBytes(e) {
      (this.assertPosition(this.position + e.length - 1),
        this.bytes.set(e, this.position),
        (this.position += e.length));
    },
    pushUint8(e) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = e),
        this.position++);
    },
    pushUint16(e) {
      (this.assertPosition(this.position + 1),
        this.dataView.setUint16(this.position, e),
        (this.position += 2));
    },
    pushUint24(e) {
      (this.assertPosition(this.position + 2),
        this.dataView.setUint16(this.position, e >> 8),
        this.dataView.setUint8(this.position + 2, 255 & e),
        (this.position += 3));
    },
    pushUint32(e) {
      (this.assertPosition(this.position + 3),
        this.dataView.setUint32(this.position, e),
        (this.position += 4));
    },
    readByte() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectByte();
      return (this.position++, e);
    },
    readBytes(e, t) {
      (this.assertReadLimit(), this._touch());
      let r = this.inspectBytes(e);
      return ((this.position += t ?? e), r);
    },
    readUint8() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint8();
      return ((this.position += 1), e);
    },
    readUint16() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint16();
      return ((this.position += 2), e);
    },
    readUint24() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint24();
      return ((this.position += 3), e);
    },
    readUint32() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint32();
      return ((this.position += 4), e);
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(e) {
      let t = this.position;
      return (
        this.assertPosition(e),
        (this.position = e),
        () => (this.position = t)
      );
    },
    _touch() {
      if (1 / 0 === this.recursiveReadLimit) return;
      let e = this.getReadCount();
      (this.positionReadCount.set(this.position, e + 1),
        e > 0 && this.recursiveReadCount++);
    },
  };
  class rp extends rf.f {
    constructor({ offset: e }) {
      (super(`Offset \`${e}\` cannot be negative.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.NegativeOffsetError",
        }));
    }
  }
  class rh extends rf.f {
    constructor({ length: e, position: t }) {
      (super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.PositionOutOfBoundsError",
        }));
    }
  }
  class rm extends rf.f {
    constructor({ count: e, limit: t }) {
      (super(
        `Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.RecursiveReadLimitExceededError",
        }));
    }
  }
  function ry(e, t, r) {
    let { checksumAddress: n = !1 } = r ?? {};
    if (e.length !== t.length)
      throw new rB({ expectedLength: e.length, givenLength: t.length });
    let a = rc(
      (function ({ checksumAddress: e, parameters: t, values: r }) {
        let n = [];
        for (let a = 0; a < t.length; a++)
          n.push(
            (function e({ checksumAddress: t = !1, parameter: r, value: n }) {
              let a = rl(r.type);
              if (a) {
                let [i, s] = a;
                return (function (t, r) {
                  let { checksumAddress: n, length: a, parameter: i } = r,
                    s = null === a;
                  if (!Array.isArray(t)) throw new rA(t);
                  if (!s && t.length !== a)
                    throw new rP({
                      expectedLength: a,
                      givenLength: t.length,
                      type: `${i.type}[${a}]`,
                    });
                  let o = !1,
                    c = [];
                  for (let r = 0; r < t.length; r++) {
                    let a = e({
                      checksumAddress: n,
                      parameter: i,
                      value: t[r],
                    });
                    (a.dynamic && (o = !0), c.push(a));
                  }
                  if (s || o) {
                    let e = rc(c);
                    if (s) {
                      let t = t$.u(c.length, { size: 32 });
                      return {
                        dynamic: !0,
                        encoded: c.length > 0 ? t$.w(t, e) : t,
                      };
                    }
                    if (o) return { dynamic: !0, encoded: e };
                  }
                  return {
                    dynamic: !1,
                    encoded: t$.w(...c.map(({ encoded: e }) => e)),
                  };
                })(n, {
                  checksumAddress: t,
                  length: i,
                  parameter: { ...r, type: s },
                });
              }
              if ("tuple" === r.type)
                return (function (t, r) {
                  let { checksumAddress: n, parameter: a } = r,
                    i = !1,
                    s = [];
                  for (let r = 0; r < a.components.length; r++) {
                    let o = a.components[r],
                      c = Array.isArray(t) ? r : o.name,
                      l = e({ checksumAddress: n, parameter: o, value: t[c] });
                    (s.push(l), l.dynamic && (i = !0));
                  }
                  return {
                    dynamic: i,
                    encoded: i ? rc(s) : t$.w(...s.map(({ encoded: e }) => e)),
                  };
                })(n, { checksumAddress: t, parameter: r });
              if ("address" === r.type)
                return (function (e, t) {
                  let { checksum: r = !1 } = t;
                  return (
                    tQ(e, { strict: r }),
                    { dynamic: !1, encoded: t$.V(e.toLowerCase()) }
                  );
                })(n, { checksum: t });
              if ("bool" === r.type) {
                var i = n;
                if ("boolean" != typeof i)
                  throw new tI.f(
                    `Invalid boolean value: "${i}" (type: ${typeof i}). Expected: \`true\` or \`false\`.`,
                  );
                return { dynamic: !1, encoded: t$.V(t$.U(i)) };
              }
              if (r.type.startsWith("uint") || r.type.startsWith("int")) {
                let e = r.type.startsWith("int"),
                  [, , t = "256"] = rs.exec(r.type) ?? [];
                return (function (e, { signed: t, size: r }) {
                  if ("number" == typeof r) {
                    let n = 2n ** (BigInt(r) - (t ? 1n : 0n)) - 1n,
                      a = t ? -n - 1n : 0n;
                    if (e > n || e < a)
                      throw new t$.d({
                        max: n.toString(),
                        min: a.toString(),
                        signed: t,
                        size: r / 8,
                        value: e.toString(),
                      });
                  }
                  return {
                    dynamic: !1,
                    encoded: t$.u(e, { size: 32, signed: t }),
                  };
                })(n, { signed: e, size: Number(t) });
              }
              if (r.type.startsWith("bytes"))
                return (function (e, { type: t }) {
                  let [, r] = t.split("bytes"),
                    n = t$.o(e);
                  if (!r) {
                    let t = e;
                    return (
                      n % 32 != 0 &&
                        (t = t$.i(t, 32 * Math.ceil((e.length - 2) / 2 / 32))),
                      {
                        dynamic: !0,
                        encoded: t$.w(t$.V(t$.u(n, { size: 32 })), t),
                      }
                    );
                  }
                  if (n !== Number.parseInt(r, 10))
                    throw new rx({
                      expectedSize: Number.parseInt(r, 10),
                      value: e,
                    });
                  return { dynamic: !1, encoded: t$.i(e) };
                })(n, { type: r.type });
              if ("string" === r.type) {
                var s = n;
                let e = t$.A(s),
                  t = Math.ceil(t$.o(e) / 32),
                  r = [];
                for (let n = 0; n < t; n++)
                  r.push(t$.i(t$.M(e, 32 * n, (n + 1) * 32)));
                return {
                  dynamic: !0,
                  encoded: t$.w(t$.i(t$.u(t$.o(e), { size: 32 })), ...r),
                };
              }
              throw new rN(r.type);
            })({ checksumAddress: e, parameter: t[a], value: r[a] }),
          );
        return n;
      })({ checksumAddress: n, parameters: e, values: t }),
    );
    return 0 === a.length ? "0x" : a;
  }
  function rg(e, t) {
    if (e.length !== t.length)
      throw new rB({ expectedLength: e.length, givenLength: t.length });
    let r = [];
    for (let n = 0; n < e.length; n++) {
      let a = e[n],
        i = t[n];
      r.push(rg.encode(a, i));
    }
    return t$.w(...r);
  }
  function rb(e) {
    return (Array.isArray(e) && "string" == typeof e[0]) || "string" == typeof e
      ? rr.f(e)
      : e;
  }
  (rg || (rg = {})).encode = function e(t, r, n = !1) {
    if ("address" === t) return (tQ(r), t$.V(r.toLowerCase(), 32 * !!n));
    if ("string" === t) return t$.A(r);
    if ("bytes" === t) return r;
    if ("bool" === t) return t$.V(t$.U(r), n ? 32 : 1);
    let a = t.match(rs);
    if (a) {
      let [e, t, i = "256"] = a,
        s = Number.parseInt(i, 10) / 8;
      return t$.u(r, { size: n ? 32 : s, signed: "int" === t });
    }
    let i = t.match(ri);
    if (i) {
      let [e, t] = i;
      if (Number.parseInt(t, 10) !== (r.length - 2) / 2)
        throw new rx({ expectedSize: Number.parseInt(t, 10), value: r });
      return t$.i(r, 32 * !!n);
    }
    let s = t.match(ra);
    if (s && Array.isArray(r)) {
      let [t, n] = s,
        a = [];
      for (let t = 0; t < r.length; t++) a.push(e(n, r[t], !0));
      return 0 === a.length ? "0x" : t$.w(...a);
    }
    throw new rN(t);
  };
  class rw extends rn.f {
    constructor({ data: e, parameters: t, size: r }) {
      (super(`Data size of ${r} bytes is too small for given parameters.`, {
        metaMessages: [`Params: (${rt.f(t)})`, `Data:   ${e} (${r} bytes)`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.DataSizeTooSmallError",
        }));
    }
  }
  class rv extends rn.f {
    constructor() {
      (super('Cannot decode zero data ("0x") with ABI parameters.'),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.ZeroDataError",
        }));
    }
  }
  class rP extends rn.f {
    constructor({ expectedLength: e, givenLength: t, type: r }) {
      (super(
        `Array length mismatch for type \`${r}\`. Expected: \`${e}\`. Given: \`${t}\`.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.ArrayLengthMismatchError",
        }));
    }
  }
  class rx extends rn.f {
    constructor({ expectedSize: e, value: t }) {
      (super(
        `Size of bytes "${t}" (bytes${t$.o(t)}) does not match expected size (bytes${e}).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.BytesSizeMismatchError",
        }));
    }
  }
  class rB extends rn.f {
    constructor({ expectedLength: e, givenLength: t }) {
      (super(`ABI encoding parameters/values length mismatch.
Expected length (parameters): ${e}
Given length (values): ${t}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.LengthMismatchError",
        }));
    }
  }
  class rA extends rn.f {
    constructor(e) {
      (super(`Value \`${e}\` is not a valid array.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.InvalidArrayError",
        }));
    }
  }
  class rN extends rn.f {
    constructor(e) {
      (super(`Type \`${e}\` is not a valid ABI Type.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.InvalidTypeError",
        }));
    }
  }
  function rk(e, t = {}) {
    return t3(e, t);
  }
  function rE(e, t, r) {
    let n = t8(e, t, r);
    if ("function" !== n.type) throw new re({ name: t, type: "function" });
    return n;
  }
  var rI = e.i(790907);
  async function rT(e, r) {
    let {
        blockNumber: n,
        blockTag: a,
        calls: i,
        stateOverrides: o,
        traceAssetChanges: c,
        traceTransfers: l,
        validation: f,
      } = r,
      d = r.account ? (0, t.f)(r.account) : void 0;
    if (c && !d)
      throw new u.f("`account` is required when `traceAssetChanges` is true");
    let p = d
        ? (function (...e) {
            let [t, r] = (() => {
                if (Array.isArray(e[0])) {
                  let [t, r] = e;
                  return [
                    (function (e) {
                      let t = e.find((e) => "constructor" === e.type);
                      if (!t) throw new re({ name: "constructor" });
                      return t;
                    })(t),
                    r,
                  ];
                }
                return e;
              })(),
              { bytecode: n, args: a } = r;
            return t$.w(
              n,
              t.inputs?.length && a?.length ? ry(t.inputs, a) : "0x",
            );
          })(t3("constructor(bytes, bytes)"), {
            bytecode: tx.I,
            args: [
              "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033",
              (function (...e) {
                let [t, r = []] = (() => {
                    if (Array.isArray(e[0])) {
                      let [t, r, n] = e;
                      return [rE(t, r, { args: n }), n];
                    }
                    let [t, r] = e;
                    return [t, r];
                  })(),
                  { overloads: n } = t,
                  a = n ? rE([t, ...n], t.name, { args: r }) : t,
                  i = t4(a),
                  s = r.length > 0 ? ry(a.inputs, r) : void 0;
                return s ? t$.w(i, s) : i;
              })(rk("function getBalance(address)"), [d.address]),
            ],
          })
        : void 0,
      h = c
        ? await Promise.all(
            r.calls.map(async (t) => {
              if (!t.data && !t.abi) return;
              let { accessList: r } = await et(e, {
                account: d.address,
                ...t,
                data: t.abi ? (0, s.f)(t) : t.data,
              });
              return r.map(({ address: e, storageKeys: t }) =>
                t.length > 0 ? e : null,
              );
            }),
          ).then((e) => e.flat().filter(Boolean))
        : [],
      m = await tN(e, {
        blockNumber: n,
        blockTag: a,
        blocks: [
          ...(c
            ? [
                { calls: [{ data: p }], stateOverrides: o },
                {
                  calls: h.map((e, t) => ({
                    abi: [rk("function balanceOf(address) returns (uint256)")],
                    functionName: "balanceOf",
                    args: [d.address],
                    to: e,
                    from: rI.B,
                    nonce: t,
                  })),
                  stateOverrides: [{ address: rI.B, nonce: 0 }],
                },
              ]
            : []),
          {
            calls: [...i, {}].map((e) => ({ ...e, from: d?.address })),
            stateOverrides: o,
          },
          ...(c
            ? [
                { calls: [{ data: p }] },
                {
                  calls: h.map((e, t) => ({
                    abi: [rk("function balanceOf(address) returns (uint256)")],
                    functionName: "balanceOf",
                    args: [d.address],
                    to: e,
                    from: rI.B,
                    nonce: t,
                  })),
                  stateOverrides: [{ address: rI.B, nonce: 0 }],
                },
                {
                  calls: h.map((e, t) => ({
                    to: e,
                    abi: [rk("function decimals() returns (uint256)")],
                    functionName: "decimals",
                    from: rI.B,
                    nonce: t,
                  })),
                  stateOverrides: [{ address: rI.B, nonce: 0 }],
                },
                {
                  calls: h.map((e, t) => ({
                    to: e,
                    abi: [rk("function tokenURI(uint256) returns (string)")],
                    functionName: "tokenURI",
                    args: [0n],
                    from: rI.B,
                    nonce: t,
                  })),
                  stateOverrides: [{ address: rI.B, nonce: 0 }],
                },
                {
                  calls: h.map((e, t) => ({
                    to: e,
                    abi: [rk("function symbol() returns (string)")],
                    functionName: "symbol",
                    from: rI.B,
                    nonce: t,
                  })),
                  stateOverrides: [{ address: rI.B, nonce: 0 }],
                },
              ]
            : []),
        ],
        traceTransfers: l,
        validation: f,
      }),
      y = c ? m[2] : m[0],
      [g, b, , w, v, P, x, B] = c ? m : [],
      { calls: A, ...N } = y,
      k = A.slice(0, -1) ?? [],
      E = [...(g?.calls ?? []), ...(b?.calls ?? [])].map((e) =>
        "success" === e.status ? (0, eT.K)(e.data) : null,
      ),
      I = [...(w?.calls ?? []), ...(v?.calls ?? [])].map((e) =>
        "success" === e.status ? (0, eT.K)(e.data) : null,
      ),
      T = (P?.calls ?? []).map((e) =>
        "success" === e.status ? e.result : null,
      ),
      F = (B?.calls ?? []).map((e) =>
        "success" === e.status ? e.result : null,
      ),
      $ = (x?.calls ?? []).map((e) =>
        "success" === e.status ? e.result : null,
      ),
      R = [];
    for (let [e, t] of I.entries()) {
      let r = E[e];
      if ("bigint" != typeof t || "bigint" != typeof r) continue;
      let n = T[e - 1],
        a = F[e - 1],
        i = $[e - 1],
        s =
          0 === e
            ? { address: rI.l, decimals: 18, symbol: "ETH" }
            : {
                address: h[e - 1],
                decimals: i || n ? Number(n ?? 1) : void 0,
                symbol: a ?? void 0,
              };
      R.some((e) => e.token.address === s.address) ||
        R.push({ token: s, value: { pre: r, post: t, diff: t - r } });
    }
    return { assetChanges: R, block: N, results: k };
  }
  async function rF(e, r) {
    let {
        abi: n,
        address: a,
        args: o,
        dataSuffix: c,
        functionName: l,
        ...u
      } = r,
      f = u.account ? (0, t.f)(u.account) : e.account,
      d = (0, s.f)({ abi: n, args: o, functionName: l });
    try {
      let { data: t } = await P(
          e,
          k.f,
          "call",
        )({
          batch: !1,
          data: `${d}${c ? c.replace("0x", "") : ""}`,
          to: a,
          ...u,
          account: f,
        }),
        s = (0, i.f)({ abi: n, args: o, functionName: l, data: t || "0x" }),
        p = n.filter((e) => "name" in e && e.name === r.functionName);
      return {
        result: s,
        request: {
          abi: p,
          address: a,
          args: o,
          dataSuffix: c,
          functionName: l,
          ...u,
          account: f,
        },
      };
    } catch (e) {
      throw N(e, {
        abi: n,
        address: a,
        args: o,
        docsPath: "/docs/contract/simulateContract",
        functionName: l,
        sender: f?.address,
      });
    }
  }
  async function r$(e, { filter: t }) {
    return t.request({ method: "eth_uninstallFilter", params: [t.id] });
  }
  var rR = tI;
  let rC = "0x6492649264926492649264926492649264926492649264926492649264926492";
  class rS extends rR.f {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid ERC-6492 wrapped signature.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc6492.InvalidWrappedSignatureError",
        }));
    }
  }
  e.s(
    [
      "validate",
      0,
      function (e) {
        try {
          if (t$.M(e, -32) !== rC) throw new rS(e);
          return !0;
        } catch {
          return !1;
        }
      },
      "wrap",
      0,
      function (e) {
        let { data: t, signature: r, to: n } = e;
        return t$.w(ry(rb("address, bytes, bytes"), [n, t, r]), rC);
      },
    ],
    839663,
  );
  var rO = e.i(839663),
    rO = rO,
    rz = rO,
    rU = tI;
  function rG(e, t = {}) {
    let { recovered: r } = t;
    if (void 0 === e.r || void 0 === e.s || (r && void 0 === e.yParity))
      throw new rM({ signature: e });
    if (e.r < 0n || e.r > ro) throw new rj({ value: e.r });
    if (e.s < 0n || e.s > ro) throw new rD({ value: e.s });
    if ("number" == typeof e.yParity && 0 !== e.yParity && 1 !== e.yParity)
      throw new rV({ value: e.yParity });
  }
  function r_(e) {
    if (130 !== e.length && 132 !== e.length) throw new rq({ signature: e });
    let t = BigInt(t$.M(e, 0, 32)),
      r = BigInt(t$.M(e, 32, 64)),
      n = (() => {
        let t = Number(`0x${e.slice(130)}`);
        if (!Number.isNaN(t))
          try {
            return rL(t);
          } catch {
            throw new rV({ value: t });
          }
      })();
    return void 0 === n ? { r: t, s: r } : { r: t, s: r, yParity: n };
  }
  function rL(e) {
    if (0 === e || 27 === e) return 0;
    if (1 === e || 28 === e) return 1;
    if (e >= 35) return +(e % 2 == 0);
    throw new rH({ value: e });
  }
  class rq extends rU.f {
    constructor({ signature: e }) {
      (super(`Value \`${e}\` is an invalid signature size.`, {
        metaMessages: [
          "Expected: 64 bytes or 65 bytes.",
          `Received ${t$.o(t$.f(e))} bytes.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSerializedSizeError",
        }));
    }
  }
  class rM extends rU.f {
    constructor({ signature: e }) {
      (super(
        `Signature \`${tz.f(e)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.MissingPropertiesError",
        }));
    }
  }
  class rj extends rU.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid r value. r must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidRError",
        }));
    }
  }
  class rD extends rU.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid s value. s must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSError",
        }));
    }
  }
  class rV extends rU.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid y-parity value. Y-parity must be 0 or 1.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidYParityError",
        }));
    }
  }
  class rH extends rU.f {
    constructor({ value: e }) {
      (super(`Value \`${e}\` is an invalid v value. v must be 27, 28 or >=35.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidVError",
        }));
    }
  }
  var rW = tI;
  let rK = rb(
    "(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data",
  );
  function rJ(e) {
    if ("string" == typeof e) {
      if (
        "0x8010801080108010801080108010801080108010801080108010801080108010" !==
        t$.M(e, -32)
      )
        throw new rZ(e);
    } else rG(e.authorization);
  }
  class rZ extends rW.f {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid ERC-8010 wrapped signature.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc8010.InvalidWrappedSignatureError",
        }));
    }
  }
  e.s(
    [
      "unwrap",
      0,
      function (e) {
        rJ(e);
        let t = t$.L(t$.M(e, -64, -32)),
          r = t$.M(e, -t - 64, -64),
          n = t$.M(e, 0, -t - 64),
          [a, i, s] = (function (e, t, r = {}) {
            let { as: n = "Array", checksumAddress: a = !1 } = r,
              i = "string" == typeof t ? t_(t) : t,
              s = (function (e, { recursiveReadLimit: t = 8192 } = {}) {
                let r = Object.create(rd);
                return (
                  (r.bytes = e),
                  (r.dataView = new DataView(
                    e.buffer,
                    e.byteOffset,
                    e.byteLength,
                  )),
                  (r.positionReadCount = new Map()),
                  (r.recursiveReadLimit = t),
                  r
                );
              })(i);
            if (0 === tL(i) && e.length > 0) throw new rv();
            if (tL(i) && 32 > tL(i))
              throw new rw({
                data: "string" == typeof t ? t : t$.J(t),
                parameters: e,
                size: tL(i),
              });
            let o = 0,
              c = "Array" === n ? [] : {};
            for (let t = 0; t < e.length; ++t) {
              let r = e[t];
              s.setPosition(o);
              let [i, l] = (function e(t, r, n) {
                let { checksumAddress: a, staticPosition: i } = n,
                  s = rl(r.type);
                if (s) {
                  let [n, o] = s;
                  return (function (t, r, n) {
                    let {
                      checksumAddress: a,
                      length: i,
                      staticPosition: s,
                    } = n;
                    if (!i) {
                      let n = s + tq(t.readBytes(32)),
                        i = n + 32;
                      t.setPosition(n);
                      let o = tq(t.readBytes(32)),
                        c = ru(r),
                        l = 0,
                        u = [];
                      for (let n = 0; n < o; ++n) {
                        t.setPosition(i + (c ? 32 * n : l));
                        let [s, o] = e(t, r, {
                          checksumAddress: a,
                          staticPosition: i,
                        });
                        ((l += o), u.push(s));
                      }
                      return (t.setPosition(s + 32), [u, 32]);
                    }
                    if (ru(r)) {
                      let n = s + tq(t.readBytes(32)),
                        o = [];
                      for (let s = 0; s < i; ++s) {
                        t.setPosition(n + 32 * s);
                        let [i] = e(t, r, {
                          checksumAddress: a,
                          staticPosition: n,
                        });
                        o.push(i);
                      }
                      return (t.setPosition(s + 32), [o, 32]);
                    }
                    let o = 0,
                      c = [];
                    for (let n = 0; n < i; ++n) {
                      let [n, i] = e(t, r, {
                        checksumAddress: a,
                        staticPosition: s + o,
                      });
                      ((o += i), c.push(n));
                    }
                    return [c, o];
                  })(
                    t,
                    { ...r, type: o },
                    { checksumAddress: a, length: n, staticPosition: i },
                  );
                }
                if ("tuple" === r.type)
                  return (function (t, r, n) {
                    let { checksumAddress: a, staticPosition: i } = n,
                      s =
                        0 === r.components.length ||
                        r.components.some(({ name: e }) => !e),
                      o = s ? [] : {},
                      c = 0;
                    if (ru(r)) {
                      let n = i + tq(t.readBytes(32));
                      for (let i = 0; i < r.components.length; ++i) {
                        let l = r.components[i];
                        t.setPosition(n + c);
                        let [u, f] = e(t, l, {
                          checksumAddress: a,
                          staticPosition: n,
                        });
                        ((c += f), (o[s ? i : l?.name] = u));
                      }
                      return (t.setPosition(i + 32), [o, 32]);
                    }
                    for (let n = 0; n < r.components.length; ++n) {
                      let l = r.components[n],
                        [u, f] = e(t, l, {
                          checksumAddress: a,
                          staticPosition: i,
                        });
                      ((o[s ? n : l?.name] = u), (c += f));
                    }
                    return [o, c];
                  })(t, r, { checksumAddress: a, staticPosition: i });
                if ("address" === r.type)
                  return (function (e, t = {}) {
                    let r,
                      { checksum: n = !1 } = t,
                      a = e.readBytes(32);
                    return [
                      ((r = t$.J(
                        (function (e, t = {}) {
                          let { strict: r } = t;
                          !1;
                          let n = e.slice(-20, void 0);
                          return (
                            r &&
                              (function (e, t) {
                                if ("number" == typeof t && tL(e) !== t - -20)
                                  throw new tV({
                                    offset: t,
                                    position: "end",
                                    size: tL(e),
                                  });
                              })(n, void 0),
                            n
                          );
                        })(a),
                      )),
                      n ? tX(r) : r),
                      32,
                    ];
                  })(t, { checksum: a });
                if ("bool" === r.type)
                  return [
                    (function (e, t = {}) {
                      let { size: r } = t,
                        n = e;
                      if (
                        (void 0 !== r && (tR(n, r), (n = tM(n))),
                        n.length > 1 || n[0] > 1)
                      )
                        throw new tj(n);
                      return !!n[0];
                    })(t.readBytes(32), { size: 32 }),
                    32,
                  ];
                if (r.type.startsWith("bytes"))
                  return (function (e, t, { staticPosition: r }) {
                    let [n, a] = t.type.split("bytes");
                    if (!a) {
                      let t = tq(e.readBytes(32));
                      e.setPosition(r + t);
                      let n = tq(e.readBytes(32));
                      if (0 === n) return (e.setPosition(r + 32), ["0x", 32]);
                      let a = e.readBytes(n);
                      return (e.setPosition(r + 32), [t$.J(a), 32]);
                    }
                    return [t$.J(e.readBytes(Number.parseInt(a, 10), 32)), 32];
                  })(t, r, { staticPosition: i });
                if (r.type.startsWith("uint") || r.type.startsWith("int")) {
                  var o, c;
                  let e, n, a;
                  return (
                    (o = t),
                    (e = (c = r).type.startsWith("int")),
                    (n = Number.parseInt(c.type.split("int")[1] || "256", 10)),
                    (a = o.readBytes(32)),
                    [
                      n > 48
                        ? (function (e, t = {}) {
                            let { size: r } = t;
                            void 0 !== r && tR(e, r);
                            let n = t$.J(e, t);
                            return t$.k(n, t);
                          })(a, { signed: e })
                        : tq(a, { signed: e }),
                      32,
                    ]
                  );
                }
                if ("string" === r.type)
                  return (function (e, { staticPosition: t }) {
                    let r = tq(e.readBytes(32));
                    e.setPosition(t + r);
                    let n = tq(e.readBytes(32));
                    if (0 === n) return (e.setPosition(t + 32), ["", 32]);
                    let a = (function (e, t = {}) {
                      let { size: r } = t,
                        n = e;
                      return (
                        void 0 !== r &&
                          (tR(n, r), (n = tS(n, { dir: "right" }))),
                        tU.decode(n)
                      );
                    })(tM(e.readBytes(n, 32)));
                    return (e.setPosition(t + 32), [a, 32]);
                  })(t, { staticPosition: i });
                throw new rN(r.type);
              })(s, r, { checksumAddress: a, staticPosition: 0 });
              ((o += l), "Array" === n ? c.push(i) : (c[r.name ?? t] = i));
            }
            return c;
          })(rK, r);
        return {
          authorization: (function (e, t = {}) {
            return "string" == typeof e.chainId
              ? (function (e) {
                  let { address: t, chainId: r, nonce: n } = e,
                    a = (function (e) {
                      if (void 0 !== e.r && void 0 !== e.s) {
                        var t;
                        let r;
                        return (
                          (t = e),
                          rG(
                            (r = (() => {
                              var e, r;
                              let n;
                              if ("string" == typeof t) return r_(t);
                              if (t instanceof Uint8Array) return r_(t$.J(t));
                              return "string" == typeof t.r
                                ? ((e = t),
                                  (n = (() => {
                                    let t = e.v ? Number(e.v) : void 0,
                                      r = e.yParity
                                        ? Number(e.yParity)
                                        : void 0;
                                    if (
                                      ("number" == typeof t &&
                                        "number" != typeof r &&
                                        (r = rL(t)),
                                      "number" != typeof r)
                                    )
                                      throw new rV({ value: e.yParity });
                                    return r;
                                  })()),
                                  {
                                    r: BigInt(e.r),
                                    s: BigInt(e.s),
                                    yParity: n,
                                  })
                                : t.v
                                  ? { r: (r = t).r, s: r.s, yParity: rL(r.v) }
                                  : {
                                      r: t.r,
                                      s: t.s,
                                      ...(void 0 !== t.yParity
                                        ? { yParity: t.yParity }
                                        : {}),
                                    };
                            })()),
                          ),
                          r
                        );
                      }
                    })(e);
                  return {
                    address: t,
                    chainId: Number(r),
                    nonce: BigInt(n),
                    ...a,
                  };
                })(e)
              : { ...e, ...t.signature };
          })({
            address: a.delegation,
            chainId: Number(a.chainId),
            nonce: a.nonce,
            yParity: a.yParity,
            r: a.r,
            s: a.s,
          }),
          signature: n,
          ...(s && "0x" !== s ? { data: s, to: i } : {}),
        };
      },
      "validate",
      0,
      function (e) {
        try {
          return (rJ(e), !0);
        } catch {
          return !1;
        }
      },
    ],
    286021,
  );
  var rY = e.i(286021),
    rY = rY,
    rQ = rY,
    rX = e.i(729323),
    r0 = e.i(183249);
  async function r1({ address: e, authorization: t, signature: r }) {
    return (0, e7.f)(
      (0, r0.A)(e),
      await (0, ey.f)({ authorization: t, signature: r }),
    );
  }
  var r2 = e.i(526960),
    r6 = e.i(125975);
  async function r5(e, t) {
    let r,
      {
        address: n,
        chain: a = e.chain,
        hash: i,
        erc6492VerifierAddress: s = t.universalSignatureVerifierAddress ??
          a?.contracts?.erc6492Verifier?.address,
        multicallAddress: o = t.multicallAddress ??
          a?.contracts?.multicall3?.address,
      } = t;
    if (a?.verifyHash) return await a.verifyHash(e, t);
    let c =
      ((r = t.signature),
      (0, g.f)(r)
        ? r
        : "object" == typeof r && "r" in r && "s" in r
          ? (0, r6.f)(r)
          : (0, l.v)(r));
    try {
      if (rY.validate(c))
        return await r3(e, { ...t, multicallAddress: o, signature: c });
      return await r8(e, { ...t, verifierAddress: s, signature: c });
    } catch (e) {
      try {
        if ((0, e7.f)((0, r0.A)(n), await (0, r2.f)({ hash: i, signature: c })))
          return !0;
      } catch {}
      if (e instanceof r9) return !1;
      throw e;
    }
  }
  async function r3(e, t) {
    let {
        address: r,
        blockNumber: n,
        blockTag: i,
        hash: o,
        multicallAddress: c,
      } = t,
      {
        authorization: u,
        data: f,
        signature: d,
        to: p,
      } = rQ.unwrap(t.signature);
    if (
      (await e9(e, { address: r, blockNumber: n, blockTag: i })) ===
      (0, h.s)(["0xef0100", u.address])
    )
      return await r4(e, {
        address: r,
        blockNumber: n,
        blockTag: i,
        hash: o,
        signature: d,
      });
    let m = {
      address: u.address,
      chainId: Number(u.chainId),
      nonce: Number(u.nonce),
      r: (0, l.N)(u.r, { size: 32 }),
      s: (0, l.N)(u.s, { size: 32 }),
      yParity: u.yParity,
    };
    if (!(await r1({ address: r, authorization: m }))) throw new r9();
    let y = await P(
        e,
        E,
        "readContract",
      )({
        ...(c ? { address: c } : { code: tx.c }),
        authorizationList: [m],
        abi: a.v,
        blockNumber: n,
        blockTag: "pending",
        functionName: "aggregate3",
        args: [
          [
            ...(f ? [{ allowFailure: !0, target: p ?? r, callData: f }] : []),
            {
              allowFailure: !0,
              target: r,
              callData: (0, s.f)({
                abi: a.w,
                functionName: "isValidSignature",
                args: [o, d],
              }),
            },
          ],
        ],
      }),
      g = y[y.length - 1]?.returnData;
    if (g?.startsWith("0x1626ba7e")) return !0;
    throw new r9();
  }
  async function r8(e, t) {
    let {
        address: r,
        factory: n,
        factoryData: i,
        hash: o,
        signature: c,
        verifierAddress: l,
        ...u
      } = t,
      d = await (async () =>
        (!n && !i) || rO.validate(c)
          ? c
          : rz.wrap({ data: i, signature: c, to: n }))(),
      p = l
        ? {
            to: l,
            data: (0, s.f)({
              abi: a.m,
              functionName: "isValidSig",
              args: [r, o, d],
            }),
            ...u,
          }
        : {
            data: (0, rX.f)({ abi: a.m, args: [r, o, d], bytecode: tx.$ }),
            ...u,
          },
      { data: h } = await P(
        e,
        k.f,
        "call",
      )(p).catch((e) => {
        if (e instanceof f.o) throw new r9();
        throw e;
      });
    if ((0, eT.d)(h ?? "0x0")) return !0;
    throw new r9();
  }
  async function r4(e, t) {
    let { address: r, blockNumber: n, blockTag: i, hash: s, signature: o } = t;
    if (
      (
        await P(
          e,
          E,
          "readContract",
        )({
          address: r,
          abi: a.w,
          args: [s, o],
          blockNumber: n,
          blockTag: i,
          functionName: "isValidSignature",
        }).catch((e) => {
          if (e instanceof f.h) throw new r9();
          throw e;
        })
      ).startsWith("0x1626ba7e")
    )
      return !0;
    throw new r9();
  }
  class r9 extends Error {}
  var r7 = e.i(541332);
  async function ne(
    e,
    { address: t, message: r, factory: n, factoryData: a, signature: i, ...s },
  ) {
    let o = (0, r7.f)(r);
    return P(
      e,
      r5,
      "verifyHash",
    )({ address: t, factory: n, factoryData: a, hash: o, signature: i, ...s });
  }
  var nt = e.i(136636);
  async function nr(e, t) {
    let {
        address: r,
        factory: n,
        factoryData: a,
        signature: i,
        message: s,
        primaryType: o,
        types: c,
        domain: l,
        ...u
      } = t,
      f = (0, nt.f)({ message: s, primaryType: o, types: c, domain: l });
    return P(
      e,
      r5,
      "verifyHash",
    )({ address: r, factory: n, factoryData: a, hash: f, signature: i, ...u });
  }
  let nn = new Map(),
    na = new Map(),
    ni = 0;
  function ns(e, t, r) {
    let n = ++ni,
      a = () => nn.get(e) || [],
      i = () => {
        let t,
          r = a();
        if (!r.some((e) => e.id === n)) return;
        let i = na.get(e);
        if (1 === r.length && i) {
          let e = i();
          e instanceof Promise && e.catch(() => {});
        }
        ((t = a()),
          nn.set(
            e,
            t.filter((e) => e.id !== n),
          ));
      },
      s = a();
    if ((nn.set(e, [...s, { id: n, fns: t }]), s && s.length > 0)) return i;
    let o = {};
    for (let e in t)
      o[e] = (...t) => {
        let r = a();
        if (0 !== r.length) for (let n of r) n.fns[e]?.(...t);
      };
    let c = r(o);
    return ("function" == typeof c && na.set(e, c), i);
  }
  e.s(["f", 0, ns], 792445);
  var no = e.i(737219),
    nc = e.i(300950),
    nl = e.i(393547),
    nu = e.i(631777);
  function nf(e, { emitOnBegin: t, initialWaitTime: r, interval: n }) {
    let a = !0,
      i = () => (a = !1);
    return (
      (async () => {
        let s;
        t && (s = await e({ unpoll: i }));
        let o = (await r?.(s)) ?? n;
        await (0, nu.f)(o);
        let c = async () => {
          a && (await e({ unpoll: i }), await (0, nu.f)(n), c());
        };
        c();
      })(),
      i
    );
  }
  function nd(
    e,
    {
      emitOnBegin: t = !1,
      emitMissed: r = !1,
      onBlockNumber: n,
      onError: a,
      poll: i,
      pollingInterval: s = e.pollingInterval,
    },
  ) {
    let o;
    return (
      void 0 !== i
        ? i
        : "webSocket" !== e.transport.type &&
          "ipc" !== e.transport.type &&
          ("fallback" !== e.transport.type ||
            ("webSocket" !== e.transport.transports[0].config.type &&
              "ipc" !== e.transport.transports[0].config.type))
    )
      ? ns(
          (0, nl.f)(["watchBlockNumber", e.uid, t, r, s]),
          { onBlockNumber: n, onError: a },
          (n) =>
            nf(
              async () => {
                try {
                  let t = await P(e, e8, "getBlockNumber")({ cacheTime: 0 });
                  if (void 0 !== o) {
                    if (t === o) return;
                    if (t - o > 1 && r)
                      for (let e = o + 1n; e < t; e++)
                        (n.onBlockNumber(e, o), (o = e));
                  }
                  (void 0 === o || t > o) && (n.onBlockNumber(t, o), (o = t));
                } catch (e) {
                  n.onError?.(e);
                }
              },
              { emitOnBegin: t, interval: s },
            ),
        )
      : ns(
          (0, nl.f)(["watchBlockNumber", e.uid, t, r]),
          { onBlockNumber: n, onError: a },
          (t) => {
            let r = !0,
              n = () => (r = !1);
            return (
              (async () => {
                try {
                  let a = (() => {
                      if ("fallback" === e.transport.type) {
                        let t = e.transport.transports.find(
                          (e) =>
                            "webSocket" === e.config.type ||
                            "ipc" === e.config.type,
                        );
                        return t ? t.value : e.transport;
                      }
                      return e.transport;
                    })(),
                    { unsubscribe: i } = await a.subscribe({
                      params: ["newHeads"],
                      onData(e) {
                        if (!r) return;
                        let n = (0, eT.K)(e.result?.number);
                        (t.onBlockNumber(n, o), (o = n));
                      },
                      onError(e) {
                        t.onError?.(e);
                      },
                    });
                  ((n = i), r || n());
                } catch (e) {
                  a?.(e);
                }
              })(),
              () => n()
            );
          },
        );
  }
  async function np(e, t) {
    let r,
      n,
      a,
      i,
      s,
      {
        checkReplacement: o = !0,
        confirmations: c = 1,
        hash: l,
        onReplaced: u,
        retryCount: f = 6,
        retryDelay: d = ({ count: e }) => 200 * ~~(1 << e),
        timeout: p = 18e4,
      } = t,
      h = (0, nl.f)(["waitForTransactionReceipt", e.uid, l]),
      m = t.pollingInterval
        ? t.pollingInterval
        : e.chain?.experimental_preconfirmationTime
          ? e.chain.experimental_preconfirmationTime
          : e.pollingInterval,
      y = !1,
      { promise: g, resolve: b, reject: w } = (0, no.f)(),
      v = p
        ? setTimeout(() => {
            (s?.(), i?.(), w(new ev.K({ hash: l })));
          }, p)
        : void 0;
    return (
      (i = ns(h, { onReplaced: u, resolve: b, reject: w }, async (t) => {
        if (
          (a = await P(
            e,
            tP,
            "getTransactionReceipt",
          )({ hash: l }).catch(() => void 0)) &&
          c <= 1
        ) {
          (clearTimeout(v), t.resolve(a), i?.());
          return;
        }
        s = P(
          e,
          nd,
          "watchBlockNumber",
        )({
          emitMissed: !0,
          emitOnBegin: !0,
          poll: !0,
          pollingInterval: m,
          async onBlockNumber(u) {
            let p = (e) => {
                (clearTimeout(v), s?.(), e(), i?.());
              },
              h = u;
            if (!y)
              try {
                if (a) {
                  if (c > 1 && (!a.blockNumber || h - a.blockNumber + 1n < c))
                    return;
                  p(() => t.resolve(a));
                  return;
                }
                if (
                  (o &&
                    !r &&
                    ((y = !0),
                    await (0, nc.f)(
                      async () => {
                        (r = await P(e, tb, "getTransaction")({ hash: l }))
                          .blockNumber && (h = r.blockNumber);
                      },
                      { delay: d, retryCount: f },
                    ),
                    (y = !1)),
                  (a = await P(e, tP, "getTransactionReceipt")({ hash: l })),
                  c > 1 && (!a.blockNumber || h - a.blockNumber + 1n < c))
                )
                  return;
                p(() => t.resolve(a));
              } catch (i) {
                if (i instanceof ev.z || i instanceof ev.r) {
                  if (!r) {
                    y = !1;
                    return;
                  }
                  try {
                    ((n = r), (y = !0));
                    let i = await (0, nc.f)(
                      () =>
                        P(
                          e,
                          eC,
                          "getBlock",
                        )({ blockNumber: h, includeTransactions: !0 }),
                      {
                        delay: d,
                        retryCount: f,
                        shouldRetry: ({ error: e }) => e instanceof e$,
                      },
                    );
                    y = !1;
                    let s = i.transactions.find(
                      ({ from: e, nonce: t }) => e === n.from && t === n.nonce,
                    );
                    if (
                      !s ||
                      ((a = await P(
                        e,
                        tP,
                        "getTransactionReceipt",
                      )({ hash: s.hash })),
                      c > 1 && (!a.blockNumber || h - a.blockNumber + 1n < c))
                    )
                      return;
                    let o = "replaced";
                    (s.to === n.to && s.value === n.value && s.input === n.input
                      ? (o = "repriced")
                      : s.from === s.to && 0n === s.value && (o = "cancelled"),
                      p(() => {
                        (t.onReplaced?.({
                          reason: o,
                          replacedTransaction: n,
                          transaction: s,
                          transactionReceipt: a,
                        }),
                          t.resolve(a));
                      }));
                  } catch (e) {
                    p(() => t.reject(e));
                  }
                } else p(() => t.reject(i));
              }
          },
        });
      })),
      g
    );
  }
  e.s(["f", 0, nf], 743576);
  let nh =
      /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/,
    nm =
      /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
  var ny = e.i(4911);
  async function ng(e, t) {
    let {
        address: r,
        domain: n,
        message: a,
        nonce: i,
        scheme: s,
        signature: o,
        time: c = new Date(),
        ...l
      } = t,
      u = (function (e) {
        let { scheme: t, statement: r, ...n } = e.match(nh)?.groups ?? {},
          {
            chainId: a,
            expirationTime: i,
            issuedAt: s,
            notBefore: o,
            requestId: c,
            ...l
          } = e.match(nm)?.groups ?? {},
          u = e.split("Resources:")[1]?.split("\n- ").slice(1);
        return {
          ...n,
          ...l,
          ...(a ? { chainId: Number(a) } : {}),
          ...(i ? { expirationTime: new Date(i) } : {}),
          ...(s ? { issuedAt: new Date(s) } : {}),
          ...(o ? { notBefore: new Date(o) } : {}),
          ...(c ? { requestId: c } : {}),
          ...(u ? { resources: u } : {}),
          ...(t ? { scheme: t } : {}),
          ...(r ? { statement: r } : {}),
        };
      })(a);
    if (
      !u.address ||
      !(function (e) {
        let {
          address: t,
          domain: r,
          message: n,
          nonce: a,
          scheme: i,
          time: s = new Date(),
        } = e;
        if (
          (r && n.domain !== r) ||
          (a && n.nonce !== a) ||
          (i && n.scheme !== i) ||
          (n.expirationTime && s >= n.expirationTime) ||
          (n.notBefore && s < n.notBefore)
        )
          return !1;
        try {
          if (
            !n.address ||
            !(0, ny.f)(n.address, { strict: !1 }) ||
            (t && !(0, e7.f)(n.address, t))
          )
            return !1;
        } catch {
          return !1;
        }
        return !0;
      })({ address: r, domain: n, message: u, nonce: i, scheme: s, time: c })
    )
      return !1;
    let f = (0, r7.f)(a);
    return r5(e, { address: u.address, hash: f, signature: o, ...l });
  }
  async function nb(e, { serializedTransaction: t }) {
    return e.request(
      { method: "eth_sendRawTransaction", params: [t] },
      { retryCount: 0 },
    );
  }
  async function nw(
    e,
    { serializedTransaction: t, throwOnReceiptRevert: r, timeout: n },
  ) {
    let a = await e.request(
        {
          method: "eth_sendRawTransactionSync",
          params: n ? [t, (0, l.N)(n)] : [t],
        },
        { retryCount: 0 },
      ),
      i = (e.chain?.formatters?.transactionReceipt?.format || tv.L)(a);
    if ("reverted" === i.status && r) throw new ev.E({ receipt: i });
    return i;
  }
  function nv(e) {
    return {
      call: (t) => (0, k.f)(e, t),
      createAccessList: (t) => et(e, t),
      createBlockFilter: () => en(e),
      createContractEventFilter: (t) => ep(e, t),
      createEventFilter: (t) => eh(e, t),
      createPendingTransactionFilter: () => em(e),
      estimateContractGas: (t) => e0(e, t),
      estimateGas: (t) => eX(e, t),
      getBalance: (t) => e1(e, t),
      getBlobBaseFee: () => e2(e),
      getBlock: (t) => eC(e, t),
      getBlockNumber: (t) => e8(e, t),
      getBlockTransactionCount: (t) => e4(e, t),
      getBytecode: (t) => e9(e, t),
      getChainId: () => eW(e),
      getCode: (t) => e9(e, t),
      getContractEvents: (t) => tc(e, t),
      getEip712Domain: (t) => tf(e, t),
      getEnsAddress: (t) => I(e, t),
      getEnsAvatar: (t) => K(e, t),
      getEnsName: (t) => J(e, t),
      getEnsResolver: (t) => Z(e, t),
      getEnsText: (t) => W(e, t),
      getFeeHistory: (t) => tp(e, t),
      estimateFeesPerGas: (t) => eU(e, t),
      getFilterChanges: (t) => th(e, t),
      getFilterLogs: (t) => tm(e, t),
      getGasPrice: () => eS(e),
      getLogs: (t) => to(e, t),
      getProof: (t) => ty(e, t),
      estimateMaxPriorityFeePerGas: (t) => eO(e, t),
      fillTransaction: (t) => eK(e, t),
      getStorageAt: (t) => tg(e, t),
      getTransaction: (t) => tb(e, t),
      getTransactionConfirmations: (t) => tw(e, t),
      getTransactionCount: (t) => e_(e, t),
      getTransactionReceipt: (t) => tP(e, t),
      multicall: (t) => tB(e, t),
      prepareTransactionRequest: (t) => eQ(e, t),
      readContract: (t) => E(e, t),
      sendRawTransaction: (t) => nb(e, t),
      sendRawTransactionSync: (t) => nw(e, t),
      simulate: (t) => tN(e, t),
      simulateBlocks: (t) => tN(e, t),
      simulateCalls: (t) => rT(e, t),
      simulateContract: (t) => rF(e, t),
      verifyHash: (t) => r5(e, t),
      verifyMessage: (t) => ne(e, t),
      verifySiweMessage: (t) => ng(e, t),
      verifyTypedData: (t) => nr(e, t),
      uninstallFilter: (t) => r$(e, t),
      waitForTransactionReceipt: (t) => np(e, t),
      watchBlocks: (t) =>
        (function (
          e,
          {
            blockTag: t = e.experimental_blockTag ?? "latest",
            emitMissed: r = !1,
            emitOnBegin: n = !1,
            onBlock: a,
            onError: i,
            includeTransactions: s,
            poll: o,
            pollingInterval: c = e.pollingInterval,
          },
        ) {
          let l,
            u,
            f,
            d,
            p =
              void 0 !== o
                ? o
                : "webSocket" !== e.transport.type &&
                  "ipc" !== e.transport.type &&
                  ("fallback" !== e.transport.type ||
                    ("webSocket" !== e.transport.transports[0].config.type &&
                      "ipc" !== e.transport.transports[0].config.type)),
            h = s ?? !1;
          return p
            ? ns(
                (0, nl.f)(["watchBlocks", e.uid, t, r, n, h, c]),
                { onBlock: a, onError: i },
                (a) =>
                  nf(
                    async () => {
                      try {
                        let n = await P(
                          e,
                          eC,
                          "getBlock",
                        )({ blockTag: t, includeTransactions: h });
                        if (null !== n.number && l?.number != null) {
                          if (n.number === l.number) return;
                          if (n.number - l.number > 1 && r)
                            for (let t = l?.number + 1n; t < n.number; t++) {
                              let r = await P(
                                e,
                                eC,
                                "getBlock",
                              )({ blockNumber: t, includeTransactions: h });
                              (a.onBlock(r, l), (l = r));
                            }
                        }
                        (l?.number == null ||
                          ("pending" === t && n?.number == null) ||
                          (null !== n.number && n.number > l.number)) &&
                          (a.onBlock(n, l), (l = n));
                      } catch (e) {
                        a.onError?.(e);
                      }
                    },
                    { emitOnBegin: n, interval: c },
                  ),
              )
            : ((u = !0),
              (f = !0),
              (d = () => (u = !1)),
              (async () => {
                try {
                  n &&
                    P(
                      e,
                      eC,
                      "getBlock",
                    )({ blockTag: t, includeTransactions: h })
                      .then((e) => {
                        !u || (f && (a(e, void 0), (f = !1)));
                      })
                      .catch(i);
                  let r = (() => {
                      if ("fallback" === e.transport.type) {
                        let t = e.transport.transports.find(
                          (e) =>
                            "webSocket" === e.config.type ||
                            "ipc" === e.config.type,
                        );
                        return t ? t.value : e.transport;
                      }
                      return e.transport;
                    })(),
                    { unsubscribe: s } = await r.subscribe({
                      params: ["newHeads"],
                      async onData(t) {
                        if (!u) return;
                        let r = await P(
                          e,
                          eC,
                          "getBlock",
                        )({
                          blockNumber: t.result?.number,
                          includeTransactions: h,
                        }).catch(() => {});
                        u && (a(r, l), (f = !1), (l = r));
                      },
                      onError(e) {
                        i?.(e);
                      },
                    });
                  ((d = s), u || d());
                } catch (e) {
                  i?.(e);
                }
              })(),
              () => d());
        })(e, t),
      watchBlockNumber: (t) => nd(e, t),
      watchContractEvent: (t) =>
        (function (e, t) {
          let r,
            n,
            a,
            i,
            {
              abi: s,
              address: o,
              args: c,
              batch: l = !0,
              eventName: u,
              fromBlock: f,
              onError: d,
              onLogs: p,
              poll: h,
              pollingInterval: m = e.pollingInterval,
              strict: y,
            } = t;
          return (
            void 0 !== h
              ? h
              : "bigint" == typeof f ||
                ("webSocket" !== e.transport.type &&
                  "ipc" !== e.transport.type &&
                  ("fallback" !== e.transport.type ||
                    ("webSocket" !== e.transport.transports[0].config.type &&
                      "ipc" !== e.transport.transports[0].config.type)))
          )
            ? ((r = y ?? !1),
              ns(
                (0, nl.f)(["watchContractEvent", o, c, l, e.uid, u, m, r, f]),
                { onLogs: p, onError: d },
                (t) => {
                  let n, a;
                  void 0 !== f && (n = f - 1n);
                  let i = !1,
                    d = nf(
                      async () => {
                        if (!i) {
                          try {
                            a = await P(
                              e,
                              ep,
                              "createContractEventFilter",
                            )({
                              abi: s,
                              address: o,
                              args: c,
                              eventName: u,
                              strict: r,
                              fromBlock: f,
                            });
                          } catch {}
                          i = !0;
                          return;
                        }
                        try {
                          let i;
                          if (a)
                            i = await P(
                              e,
                              th,
                              "getFilterChanges",
                            )({ filter: a });
                          else {
                            let t = await P(e, e8, "getBlockNumber")({});
                            ((i =
                              n && n < t
                                ? await P(
                                    e,
                                    tc,
                                    "getContractEvents",
                                  )({
                                    abi: s,
                                    address: o,
                                    args: c,
                                    eventName: u,
                                    fromBlock: n + 1n,
                                    toBlock: t,
                                    strict: r,
                                  })
                                : []),
                              (n = t));
                          }
                          if (0 === i.length) return;
                          if (l) t.onLogs(i);
                          else for (let e of i) t.onLogs([e]);
                        } catch (e) {
                          (a && e instanceof A.L && (i = !1), t.onError?.(e));
                        }
                      },
                      { emitOnBegin: !0, interval: m },
                    );
                  return async () => {
                    (a && (await P(e, r$, "uninstallFilter")({ filter: a })),
                      d());
                  };
                },
              ))
            : ((n = (0, nl.f)([
                "watchContractEvent",
                o,
                c,
                l,
                e.uid,
                u,
                m,
                y ?? !1,
              ])),
              (a = !0),
              (i = () => (a = !1)),
              ns(
                n,
                { onLogs: p, onError: d },
                (t) => (
                  (async () => {
                    try {
                      let r = (() => {
                          if ("fallback" === e.transport.type) {
                            let t = e.transport.transports.find(
                              (e) =>
                                "webSocket" === e.config.type ||
                                "ipc" === e.config.type,
                            );
                            return t ? t.value : e.transport;
                          }
                          return e.transport;
                        })(),
                        n = u ? ef({ abi: s, eventName: u, args: c }) : [],
                        { unsubscribe: l } = await r.subscribe({
                          params: ["logs", { address: o, topics: n }],
                          onData(e) {
                            if (!a) return;
                            let r = e.result;
                            try {
                              let { eventName: e, args: n } = ta({
                                  abi: s,
                                  data: r.data,
                                  topics: r.topics,
                                  strict: y,
                                }),
                                a = (0, ts.f)(r, { args: n, eventName: e });
                              t.onLogs([a]);
                            } catch (i) {
                              let e, n;
                              if (i instanceof x.t || i instanceof x.s) {
                                if (y) return;
                                ((e = i.abiItem.name),
                                  (n = i.abiItem.inputs?.some(
                                    (e) => !("name" in e && e.name),
                                  )));
                              }
                              let a = (0, ts.f)(r, {
                                args: n ? [] : {},
                                eventName: e,
                              });
                              t.onLogs([a]);
                            }
                          },
                          onError(e) {
                            t.onError?.(e);
                          },
                        });
                      ((i = l), a || i());
                    } catch (e) {
                      d?.(e);
                    }
                  })(),
                  () => i()
                ),
              ));
        })(e, t),
      watchEvent: (t) =>
        (function (
          e,
          {
            address: t,
            args: r,
            batch: n = !0,
            event: a,
            events: i,
            fromBlock: s,
            onError: o,
            onLogs: c,
            poll: l,
            pollingInterval: u = e.pollingInterval,
            strict: f,
          },
        ) {
          let d,
            p,
            h =
              void 0 !== l
                ? l
                : "bigint" == typeof s ||
                  ("webSocket" !== e.transport.type &&
                    "ipc" !== e.transport.type &&
                    ("fallback" !== e.transport.type ||
                      ("webSocket" !== e.transport.transports[0].config.type &&
                        "ipc" !== e.transport.transports[0].config.type))),
            m = f ?? !1;
          return h
            ? ns(
                (0, nl.f)(["watchEvent", t, r, n, e.uid, a, u, s]),
                { onLogs: c, onError: o },
                (o) => {
                  let c, l;
                  void 0 !== s && (c = s - 1n);
                  let f = !1,
                    d = nf(
                      async () => {
                        if (!f) {
                          try {
                            l = await P(
                              e,
                              eh,
                              "createEventFilter",
                            )({
                              address: t,
                              args: r,
                              event: a,
                              events: i,
                              strict: m,
                              fromBlock: s,
                            });
                          } catch {}
                          f = !0;
                          return;
                        }
                        try {
                          let s;
                          if (l)
                            s = await P(
                              e,
                              th,
                              "getFilterChanges",
                            )({ filter: l });
                          else {
                            let n = await P(e, e8, "getBlockNumber")({});
                            ((s =
                              c && c !== n
                                ? await P(
                                    e,
                                    to,
                                    "getLogs",
                                  )({
                                    address: t,
                                    args: r,
                                    event: a,
                                    events: i,
                                    fromBlock: c + 1n,
                                    toBlock: n,
                                  })
                                : []),
                              (c = n));
                          }
                          if (0 === s.length) return;
                          if (n) o.onLogs(s);
                          else for (let e of s) o.onLogs([e]);
                        } catch (e) {
                          (l && e instanceof A.L && (f = !1), o.onError?.(e));
                        }
                      },
                      { emitOnBegin: !0, interval: u },
                    );
                  return async () => {
                    (l && (await P(e, r$, "uninstallFilter")({ filter: l })),
                      d());
                  };
                },
              )
            : ((d = !0),
              (p = () => (d = !1)),
              (async () => {
                try {
                  let n = (() => {
                      if ("fallback" === e.transport.type) {
                        let t = e.transport.transports.find(
                          (e) =>
                            "webSocket" === e.config.type ||
                            "ipc" === e.config.type,
                        );
                        return t ? t.value : e.transport;
                      }
                      return e.transport;
                    })(),
                    s = i ?? (a ? [a] : void 0),
                    l = [];
                  s &&
                    ((l = [
                      s.flatMap((e) =>
                        ef({ abi: [e], eventName: e.name, args: r }),
                      ),
                    ]),
                    a && (l = l[0]));
                  let { unsubscribe: u } = await n.subscribe({
                    params: ["logs", { address: t, topics: l }],
                    onData(e) {
                      if (!d) return;
                      let t = e.result;
                      try {
                        let { eventName: e, args: r } = ta({
                            abi: s ?? [],
                            data: t.data,
                            topics: t.topics,
                            strict: m,
                          }),
                          n = (0, ts.f)(t, { args: r, eventName: e });
                        c([n]);
                      } catch (n) {
                        let e, r;
                        if (n instanceof x.t || n instanceof x.s) {
                          if (f) return;
                          ((e = n.abiItem.name),
                            (r = n.abiItem.inputs?.some(
                              (e) => !("name" in e && e.name),
                            )));
                        }
                        c([(0, ts.f)(t, { args: r ? [] : {}, eventName: e })]);
                      }
                    },
                    onError(e) {
                      o?.(e);
                    },
                  });
                  ((p = u), d || p());
                } catch (e) {
                  o?.(e);
                }
              })(),
              () => p());
        })(e, t),
      watchPendingTransactions: (t) =>
        (function (
          e,
          {
            batch: t = !0,
            onError: r,
            onTransactions: n,
            poll: a,
            pollingInterval: i = e.pollingInterval,
          },
        ) {
          let s, o;
          return (
            void 0 !== a
              ? a
              : "webSocket" !== e.transport.type && "ipc" !== e.transport.type
          )
            ? ns(
                (0, nl.f)(["watchPendingTransactions", e.uid, t, i]),
                { onTransactions: n, onError: r },
                (r) => {
                  let n,
                    a = nf(
                      async () => {
                        try {
                          if (!n)
                            try {
                              n = await P(
                                e,
                                em,
                                "createPendingTransactionFilter",
                              )({});
                              return;
                            } catch (e) {
                              throw (a(), e);
                            }
                          let i = await P(
                            e,
                            th,
                            "getFilterChanges",
                          )({ filter: n });
                          if (0 === i.length) return;
                          if (t) r.onTransactions(i);
                          else for (let e of i) r.onTransactions([e]);
                        } catch (e) {
                          r.onError?.(e);
                        }
                      },
                      { emitOnBegin: !0, interval: i },
                    );
                  return async () => {
                    (n && (await P(e, r$, "uninstallFilter")({ filter: n })),
                      a());
                  };
                },
              )
            : ((s = !0),
              (o = () => (s = !1)),
              (async () => {
                try {
                  let { unsubscribe: t } = await e.transport.subscribe({
                    params: ["newPendingTransactions"],
                    onData(e) {
                      s && n([e.result]);
                    },
                    onError(e) {
                      r?.(e);
                    },
                  });
                  ((o = t), s || o());
                } catch (e) {
                  r?.(e);
                }
              })(),
              () => o());
        })(e, t),
    };
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { key: t = "public", name: r = "Public Client" } = e;
        return n({ ...e, key: t, name: r, type: "publicClient" }).extend(nv);
      },
    ],
    481654,
  );
};
