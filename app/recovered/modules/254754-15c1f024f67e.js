// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "w",
      () => eU,
      "M",
      () => eC,
      "z",
      () => eM,
      "r",
      () => eF,
      "U",
      () => eO,
      "G",
      () => eB,
      "q",
      () => eE,
      "R",
      () => eT,
      "f",
      () => eS,
    ],
    442903,
  );
  var t = e.i(440519),
    r = e.i(271948),
    n = e.i(641802),
    i = e.i(927974),
    a = e.i(815727),
    s = e.i(620016),
    o = e.i(421957),
    u = e.i(803085),
    l = e.i(286533),
    c = e.i(586844),
    f = e.i(20655),
    d = e.i(225587),
    p = e.i(559787);
  async function y(e, f) {
    let {
        account: d,
        authorizationList: y,
        allowFailure: m = !0,
        blockHash: g,
        blockNumber: b,
        blockOverrides: w,
        blockTag: v,
        requireCanonical: x,
        stateOverride: P,
      } = f,
      k = f.contracts,
      A = "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      I = f.batchSize ?? A.batchSize ?? 1024,
      B = f.deployless ?? A.deployless ?? !1,
      E = (() => {
        if (f.multicallAddress) return f.multicallAddress;
        if (B) return null;
        if (e.chain)
          return (0, u.f)({
            blockNumber: b,
            chain: e.chain,
            contract: "multicall3",
          });
        throw Error(
          "client chain not configured. multicallAddress is required.",
        );
      })(),
      N = [[]],
      T = 0,
      S = 0;
    for (let e = 0; e < k.length; e++) {
      let { abi: t, address: r, args: n, functionName: i } = k[e];
      try {
        let e = (0, o.f)({ abi: t, args: n, functionName: i });
        ((S += (e.length - 2) / 2),
          I > 0 &&
            S > I &&
            N[T].length > 0 &&
            (T++, (S = (e.length - 2) / 2), (N[T] = [])),
          (N[T] = [...N[T], { allowFailure: !0, callData: e, target: r }]));
      } catch (a) {
        let e = (0, l.f)(a, {
          abi: t,
          address: r,
          args: n,
          docsPath: "/docs/contract/multicall",
          functionName: i,
          sender: d,
        });
        if (!m) throw e;
        N[T] = [...N[T], { allowFailure: !0, callData: "0x", target: r }];
      }
    }
    let M = !!e.batch?.multicall,
      z = M ? N.flatMap((e) => e.map((e) => [e])) : N,
      U = await Promise.allSettled(
        z.map((n) =>
          M
            ? h(e, {
                account: d,
                authorizationList: y,
                batchSize: I,
                blockHash: g,
                blockNumber: b,
                blockOverrides: w,
                blockTag: v,
                call: n[0],
                multicallAddress: E,
                requireCanonical: x,
                stateOverride: P,
              }).then((e) => [e])
            : (0, c.f)(
                e,
                p.f,
                "readContract",
              )({
                ...(null === E ? { code: r.c } : { address: E }),
                abi: t.v,
                account: d,
                args: [n],
                authorizationList: y,
                blockHash: g,
                blockNumber: b,
                blockOverrides: w,
                blockTag: v,
                functionName: "aggregate3",
                requireCanonical: x,
                stateOverride: P,
              }),
        ),
      ),
      C = [];
    for (let e = 0; e < U.length; e++) {
      let t = U[e];
      if ("rejected" === t.status) {
        if (!m) throw t.reason;
        for (let r = 0; r < z[e].length; r++)
          C.push({ status: "failure", error: t.reason, result: void 0 });
        continue;
      }
      let r = t.value;
      for (let t = 0; t < r.length; t++) {
        let { returnData: i, success: o } = r[t],
          { callData: u } = z[e][t],
          { abi: c, address: f, functionName: d, args: p } = k[C.length];
        try {
          if ("0x" === u) throw new n.g();
          if (!o) throw new a.w({ data: i });
          let e = (0, s.f)({ abi: c, args: p, data: i, functionName: d });
          C.push(m ? { result: e, status: "success" } : e);
        } catch (t) {
          let e = (0, l.f)(t, {
            abi: c,
            address: f,
            args: p,
            docsPath: "/docs/contract/multicall",
            functionName: d,
          });
          if (!m) throw e;
          C.push({ error: e, result: void 0, status: "failure" });
        }
      }
    }
    if (C.length !== k.length) throw new i.f("multicall results mismatch");
    return C;
  }
  async function h(e, n) {
    let { batchSize: i, call: a, multicallAddress: s, ...o } = n,
      { wait: u = 0 } =
        "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      { schedule: l } = (0, f.f)({
        id: (0, d.f)(["multicall", e.uid, i, s, o]),
        wait: u,
        shouldSplitBatch: (e) =>
          0 !== i &&
          e.reduce((e, { callData: t }) => e + (t.length - 2) / 2, 0) > i,
        fn: (n) =>
          (0, c.f)(
            e,
            p.f,
            "readContract",
          )({
            ...(null === s ? { code: r.c } : { address: s }),
            ...o,
            abi: t.v,
            args: [n],
            functionName: "aggregate3",
          }),
      }),
      [y] = await l(a);
    return y;
  }
  e.s(["f", 0, y], 254754);
  var m = e.i(986316),
    g = e.i(717473),
    b = e.i(790336),
    w = e.i(850697),
    v = e.i(703114),
    x = e.i(197820),
    P = e.i(970358),
    k = e.i(548291),
    A = e.i(109340),
    I = e.i(667351),
    B = e.i(41096);
  async function E(e, t) {
    let {
      blockNumber: r,
      blockTag: i = e.experimental_blockTag ?? "latest",
      blocks: u,
      returnFullTransactions: c,
      traceTransfers: f,
      validation: d,
    } = t;
    try {
      let t = [];
      for (let e of u) {
        let r = e.blockOverrides ? m.f(e.blockOverrides) : void 0,
          n = e.calls.map((e) => {
            let t = e.account ? (0, g.f)(e.account) : void 0,
              r = e.abi ? (0, o.f)(e) : e.data,
              n = {
                ...e,
                account: t,
                data: e.dataSuffix ? (0, w.w)([r || "0x", e.dataSuffix]) : r,
                from: e.from ?? t?.address,
              };
            return ((0, B.f)(n), (0, A.F)(n));
          }),
          i = e.stateOverrides ? (0, I.f)(e.stateOverrides) : void 0;
        t.push({ blockOverrides: r, calls: n, stateOverrides: i });
      }
      let p = "bigint" == typeof r ? (0, v.N)(r) : void 0;
      return (
        await e.request({
          method: "eth_simulateV1",
          params: [
            {
              blockStateCalls: t,
              returnFullTransactions: c,
              traceTransfers: f,
              validation: d,
            },
            p || i,
          ],
        })
      ).map((e, t) => ({
        ...(0, P.f)(e),
        calls: e.calls.map((e, r) => {
          let { abi: i, args: o, functionName: c, to: f } = u[t].calls[r],
            d = e.error?.data ?? e.returnData,
            p = BigInt(e.gasUsed),
            y = e.logs?.map((e) => (0, k.f)(e)),
            h = "0x1" === e.status ? "success" : "failure",
            m =
              i && "success" === h && "0x" !== d
                ? (0, s.f)({ abi: i, data: d, functionName: c })
                : null,
            g = (() => {
              let e;
              if (
                "success" !== h &&
                ("0x" === d ? (e = new n.g()) : d && (e = new a.w({ data: d })),
                e)
              )
                return (0, l.f)(e, {
                  abi: i ?? [],
                  address: f ?? "0x",
                  args: o,
                  functionName: c ?? "<unknown>",
                });
            })();
          return {
            data: d,
            gasUsed: p,
            logs: y,
            status: h,
            ...("success" === h ? { result: m } : { error: g }),
          };
        }),
      }));
    } catch (t) {
      let e = (0, x.f)(t, {});
      if (e instanceof b.b) throw t;
      throw e;
    }
  }
  e.s(["f", 0, E], 509190);
  var N = e.i(622275),
    T = e.i(714764),
    S = e.i(702133),
    M = e.i(626014),
    z = e.i(403893),
    U = e.i(829833),
    C = e.i(65177);
  function R(e, t = {}) {
    let { as: r = "string" == typeof e ? "Hex" : "Bytes" } = t,
      n = (0, M.f)(U.f(e));
    return "Bytes" === r ? n : C.J(n);
  }
  e.s(
    [
      "y",
      0,
      R,
      "E",
      0,
      function (e, t = {}) {
        let { as: r = "string" == typeof e ? "Hex" : "Bytes" } = t,
          n = (0, z.f)(U.f(e));
        return "Bytes" === r ? n : C.J(n);
      },
      "f",
      0,
      function (e) {
        return C.g(e) && 32 === C.o(e);
      },
    ],
    755805,
  );
  class F extends Map {
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
  let O = { checksum: new F(8192) }.checksum;
  var $ = S,
    L = S,
    j = e.i(987439);
  function K(e, t = {}) {
    let { compressed: r } = t,
      { prefix: n, x: i, y: a } = e;
    if (!1 === r || ("bigint" == typeof i && "bigint" == typeof a)) {
      if (4 !== n) throw new W({ prefix: n, cause: new V() });
      return;
    }
    if (!0 === r || ("bigint" == typeof i && void 0 === a)) {
      if (3 !== n && 2 !== n) throw new W({ prefix: n, cause: new _() });
      return;
    }
    throw new q({ publicKey: e });
  }
  function G(e) {
    if (132 !== e.length && 130 !== e.length && 68 !== e.length)
      throw new H({ publicKey: e });
    if (130 === e.length)
      return { prefix: 4, x: BigInt(C.M(e, 0, 32)), y: BigInt(C.M(e, 32, 64)) };
    if (132 === e.length) {
      let t = Number(C.M(e, 0, 1));
      return { prefix: t, x: BigInt(C.M(e, 1, 33)), y: BigInt(C.M(e, 33, 65)) };
    }
    return { prefix: Number(C.M(e, 0, 1)), x: BigInt(C.M(e, 1, 33)) };
  }
  function D(e, t = {}) {
    K(e);
    let { prefix: r, x: n, y: i } = e,
      { includePrefix: a = !0 } = t;
    return C.w(
      a ? C.u(r, { size: 1 }) : "0x",
      C.u(n, { size: 32 }),
      "bigint" == typeof i ? C.u(i, { size: 32 }) : "0x",
    );
  }
  class q extends L.f {
    constructor({ publicKey: e }) {
      (super(`Value \`${j.f(e)}\` is not a valid public key.`, {
        metaMessages: [
          "Public key must contain:",
          "- an `x` and `prefix` value (compressed)",
          "- an `x`, `y`, and `prefix` value (uncompressed)",
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "PublicKey.InvalidError",
        }));
    }
  }
  class W extends L.f {
    constructor({ prefix: e, cause: t }) {
      (super(`Prefix "${e}" is invalid.`, { cause: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "PublicKey.InvalidPrefixError",
        }));
    }
  }
  class _ extends L.f {
    constructor() {
      (super("Prefix must be 2 or 3 for compressed public keys."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "PublicKey.InvalidCompressedPrefixError",
        }));
    }
  }
  class V extends L.f {
    constructor() {
      (super("Prefix must be 4 for uncompressed public keys."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "PublicKey.InvalidUncompressedPrefixError",
        }));
    }
  }
  class H extends L.f {
    constructor({ publicKey: e }) {
      (super(`Value \`${e}\` is an invalid public key size.`, {
        metaMessages: [
          "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
          `Received ${C.o(C.f(e))} bytes.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "PublicKey.InvalidSerializedSizeError",
        }));
    }
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let t = (() => {
          if (C.g(e)) return G(e);
          if (U.g(e)) {
            var t;
            return ((t = e), G(C.J(t)));
          }
          let { prefix: r, x: n, y: i } = e;
          return "bigint" == typeof n && "bigint" == typeof i
            ? { prefix: r ?? 4, x: n, y: i }
            : { prefix: r, x: n };
        })();
        return (K(t), t);
      },
      "E",
      0,
      G,
      "D",
      0,
      function (e, t = {}) {
        return U.E(D(e, t));
      },
      "g",
      0,
      D,
    ],
    987303,
  );
  let J = /^0x[a-fA-F0-9]{40}$/;
  function Z(e, t = {}) {
    let { strict: r = !0 } = t;
    if (!J.test(e)) throw new ee({ address: e, cause: new et() });
    if (r) {
      if (e.toLowerCase() === e) return;
      if (X(e) !== e) throw new ee({ address: e, cause: new er() });
    }
  }
  function X(e) {
    if (O.has(e)) return O.get(e);
    Z(e, { strict: !1 });
    let t = e.substring(2).toLowerCase(),
      r = R(U.A(t), { as: "Bytes" }),
      n = t.split("");
    for (let e = 0; e < 40; e += 2)
      (r[e >> 1] >> 4 >= 8 && n[e] && (n[e] = n[e].toUpperCase()),
        (15 & r[e >> 1]) >= 8 &&
          n[e + 1] &&
          (n[e + 1] = n[e + 1].toUpperCase()));
    let i = `0x${n.join("")}`;
    return (O.set(e, i), i);
  }
  function Y(e, t = {}) {
    let { checksum: r = !1 } = t;
    return (Z(e), r) ? X(e) : e;
  }
  function Q(e, t = {}) {
    let { strict: r = !0 } = t ?? {};
    try {
      return (Z(e, { strict: r }), !0);
    } catch {
      return !1;
    }
  }
  class ee extends $.f {
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
  class et extends $.f {
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
  class er extends $.f {
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
  function en(e) {
    let t = !0,
      r = "",
      n = 0,
      i = "",
      a = !1;
    for (let s = 0; s < e.length; s++) {
      let o = e[s];
      if (
        (["(", ")", ","].includes(o) && (t = !0),
        "(" === o && n++,
        ")" === o && n--,
        t)
      ) {
        if (0 === n) {
          if (" " === o && ["event", "function", "error", ""].includes(i))
            i = "";
          else if (((i += o), ")" === o)) {
            a = !0;
            break;
          }
          continue;
        }
        if (" " === o) {
          "," !== e[s - 1] && "," !== r && ",(" !== r && ((r = ""), (t = !1));
          continue;
        }
        ((i += o), (r += o));
      }
    }
    if (!a) throw new S.f("Unable to normalize signature.");
    return i;
  }
  function ei(e, t = {}) {
    let { prepare: r = !0 } = t,
      n = Array.isArray(e) || "string" == typeof e ? T.f(e) : e;
    return { ...n, ...(r ? { hash: eo(n) } : {}) };
  }
  function ea(e, t, r) {
    let n,
      { args: i = [], prepare: a = !0 } = r ?? {},
      s = C.g(t, { strict: !1 }),
      o = e.filter((e) =>
        s
          ? "function" === e.type || "error" === e.type
            ? es(e) === C.M(t, 0, 4)
            : "event" === e.type && eo(e) === t
          : "name" in e && e.name === t,
      );
    if (0 === o.length) throw new el({ name: t });
    if (1 === o.length) return { ...o[0], ...(a ? { hash: eo(o[0]) } : {}) };
    for (let e of o) {
      if ("inputs" in e) {
        if (!i || 0 === i.length) {
          if (!e.inputs || 0 === e.inputs.length)
            return { ...e, ...(a ? { hash: eo(e) } : {}) };
          continue;
        }
        if (
          e.inputs &&
          0 !== e.inputs.length &&
          e.inputs.length === i.length &&
          i.every((t, r) => {
            let n = "inputs" in e && e.inputs[r];
            return (
              !!n &&
              (function e(t, r) {
                let n = typeof t,
                  i = r.type;
                switch (i) {
                  case "address":
                    return Q(t, { strict: !1 });
                  case "bool":
                    return "boolean" === n;
                  case "function":
                  case "string":
                    return "string" === n;
                  default:
                    if ("tuple" === i && "components" in r)
                      return Object.values(r.components).every((r, n) =>
                        e(Object.values(t)[n], r),
                      );
                    if (
                      /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
                        i,
                      )
                    )
                      return "number" === n || "bigint" === n;
                    if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(i))
                      return "string" === n || t instanceof Uint8Array;
                    if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(i))
                      return (
                        Array.isArray(t) &&
                        t.every((t) =>
                          e(t, {
                            ...r,
                            type: i.replace(/(\[[0-9]{0,}\])$/, ""),
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
              for (let i in t) {
                let a = t[i],
                  s = r[i];
                if (
                  "tuple" === a.type &&
                  "tuple" === s.type &&
                  "components" in a &&
                  "components" in s
                )
                  return e(a.components, s.components, n[i]);
                let o = [a.type, s.type];
                if (
                  (o.includes("address") && o.includes("bytes20")) ||
                  (((o.includes("address") && o.includes("string")) ||
                    (o.includes("address") && o.includes("bytes"))) &&
                    Q(n[i], { strict: !1 }))
                )
                  return o;
              }
            })(e.inputs, n.inputs, i);
            if (t)
              throw new eu(
                { abiItem: e, type: t[0] },
                { abiItem: n, type: t[1] },
              );
          }
          n = e;
        }
      }
    }
    let u = (() => {
      if (n) return n;
      let [e, ...t] = o;
      return { ...e, overloads: t };
    })();
    if (!u) throw new el({ name: t });
    return { ...u, ...(a ? { hash: eo(u) } : {}) };
  }
  function es(...e) {
    let t = (() => {
      if (Array.isArray(e[0])) {
        let [t, r] = e;
        return ea(t, r);
      }
      return e[0];
    })();
    return C.M(eo(t), 0, 4);
  }
  function eo(...e) {
    let t = (() => {
      if (Array.isArray(e[0])) {
        let [t, r] = e;
        return ea(t, r);
      }
      return e[0];
    })();
    return "string" != typeof t && "hash" in t && t.hash
      ? t.hash
      : R(
          C.A(
            (function (...e) {
              let t = (() => {
                if (Array.isArray(e[0])) {
                  let [t, r] = e;
                  return ea(t, r);
                }
                return e[0];
              })();
              return en("string" == typeof t ? t : N.f(t));
            })(t),
          ),
        );
  }
  e.s(
    [
      "n",
      0,
      Z,
      "Y",
      0,
      X,
      "f",
      0,
      Y,
      "E",
      0,
      function (e, t = {}) {
        let r = R(`0x${D(e).slice(4)}`).substring(26);
        return Y(`0x${r}`, t);
      },
      "M",
      0,
      function (e, t) {
        return (
          Z(e, { strict: !1 }),
          Z(t, { strict: !1 }),
          e.toLowerCase() === t.toLowerCase()
        );
      },
      "g",
      0,
      Q,
    ],
    12550,
  );
  class eu extends S.f {
    constructor(e, t) {
      (super("Found ambiguous types in overloaded ABI Items.", {
        metaMessages: [
          `\`${e.type}\` in \`${en(N.f(e.abiItem))}\`, and`,
          `\`${t.type}\` in \`${en(N.f(t.abiItem))}\``,
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
  class el extends S.f {
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
  class ec extends S.f {
    constructor({ data: e }) {
      (super(
        `Selector size is invalid. Expected 4 bytes. Received ${C.o(e)} bytes ("${e}").`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiItem.InvalidSelectorSizeError",
        }));
    }
  }
  e.s(
    ["l", 0, ec, "i", 0, el, "f", 0, ei, "M", 0, ea, "e", 0, es, "p", 0, eo],
    185962,
  );
  var ef = e.i(269953),
    ed = e.i(623846),
    ep = S;
  let ey = /^(.*)\[([0-9]*)\]$/,
    eh = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
    em =
      /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  e.s(["c", 0, ey, "h", 0, eh, "x", 0, em, "_", 0, 2n ** 256n - 1n], 768093);
  function eg(e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let { dynamic: n, encoded: i } = e[r];
      n ? (t += 32) : (t += C.o(i));
    }
    let r = [],
      n = [],
      i = 0;
    for (let a = 0; a < e.length; a++) {
      let { dynamic: s, encoded: o } = e[a];
      s
        ? (r.push(C.u(t + i, { size: 32 })), n.push(o), (i += C.o(o)))
        : r.push(o);
    }
    return C.w(...r, ...n);
  }
  function eb(e) {
    let t = e.match(/^(.*)\[(\d+)?\]$/);
    return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
  }
  function ew(e) {
    let { type: t } = e;
    if ("string" === t || "bytes" === t || t.endsWith("[]")) return !0;
    if ("tuple" === t) return e.components?.some(ew);
    let r = eb(e.type);
    return !!(r && ew({ ...e, type: r[1] }));
  }
  var ev = S;
  let ex = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: 1 / 0,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new eI({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit,
        });
    },
    assertPosition(e) {
      if (e < 0 || e > this.bytes.length - 1)
        throw new eA({ length: this.bytes.length, position: e });
    },
    decrementPosition(e) {
      if (e < 0) throw new ek({ offset: e });
      let t = this.position - e;
      (this.assertPosition(t), (this.position = t));
    },
    getReadCount(e) {
      return this.positionReadCount.get(e || this.position) || 0;
    },
    incrementPosition(e) {
      if (e < 0) throw new ek({ offset: e });
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
  function eP(e, { recursiveReadLimit: t = 8192 } = {}) {
    let r = Object.create(ex);
    return (
      (r.bytes = e),
      (r.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
      (r.positionReadCount = new Map()),
      (r.recursiveReadLimit = t),
      r
    );
  }
  class ek extends ev.f {
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
  class eA extends ev.f {
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
  class eI extends ev.f {
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
  function eB(e, t, r = {}) {
    let { as: n = "Array", checksumAddress: i = !1 } = r,
      a = "string" == typeof t ? U.E(t) : t,
      s = eP(a);
    if (0 === U.o(a) && e.length > 0) throw new ez();
    if (U.o(a) && 32 > U.o(a))
      throw new eM({
        data: "string" == typeof t ? t : C.J(t),
        parameters: e,
        size: U.o(a),
      });
    let o = 0,
      u = "Array" === n ? [] : {};
    for (let t = 0; t < e.length; ++t) {
      let r = e[t];
      o < a.length && s.setPosition(o);
      let [l, c] = (function e(t, r, n) {
        var i, a, s;
        let { checksumAddress: o, staticPosition: u } = n,
          l = eb(r.type);
        if (l) {
          let [n, i] = l;
          return (function (t, r, n) {
            let { checksumAddress: i, length: a, staticPosition: s } = n;
            if (null === a) {
              let n = s + U.L(t.readBytes(32)),
                a = n + 32;
              t.setPosition(n);
              let o = U.L(t.readBytes(32)),
                u = ew(r),
                l = 0,
                c = [];
              for (let n = 0; n < o; ++n) {
                t.setPosition(a + (u ? 32 * n : l));
                let [s, o] = e(t, r, { checksumAddress: i, staticPosition: a });
                ((l += o),
                  c.push(s),
                  0 === o && (t.assertReadLimit(), t._touch()));
              }
              return (t.setPosition(s + 32), [c, 32]);
            }
            if (ew(r)) {
              let n = s + U.L(t.readBytes(32)),
                o = [];
              for (let s = 0; s < a; ++s) {
                t.setPosition(n + 32 * s);
                let [a] = e(t, r, { checksumAddress: i, staticPosition: n });
                o.push(a);
              }
              return (t.setPosition(s + 32), [o, 32]);
            }
            let o = 0,
              u = [];
            for (let n = 0; n < a; ++n) {
              let [n, a] = e(t, r, {
                checksumAddress: i,
                staticPosition: s + o,
              });
              ((o += a),
                u.push(n),
                0 === a && (t.assertReadLimit(), t._touch()));
            }
            return [u, o];
          })(
            t,
            { ...r, type: i },
            { checksumAddress: o, length: n, staticPosition: u },
          );
        }
        if ("tuple" === r.type)
          return (function (t, r, n) {
            let { checksumAddress: i, staticPosition: a } = n,
              s =
                0 === r.components.length ||
                r.components.some(({ name: e }) => !e),
              o = s ? [] : {},
              u = 0;
            if (ew(r)) {
              let n = a + U.L(t.readBytes(32));
              for (let a = 0; a < r.components.length; ++a) {
                let l = r.components[a];
                t.setPosition(n + u);
                let [c, f] = e(t, l, { checksumAddress: i, staticPosition: n });
                ((u += f), (o[s ? a : l?.name] = c));
              }
              return (t.setPosition(a + 32), [o, 32]);
            }
            for (let n = 0; n < r.components.length; ++n) {
              let l = r.components[n],
                [c, f] = e(t, l, { checksumAddress: i, staticPosition: a });
              ((o[s ? n : l?.name] = c), (u += f));
            }
            return [o, u];
          })(t, r, { checksumAddress: o, staticPosition: u });
        if ("address" === r.type)
          return (function (e, t = {}) {
            let r,
              { checksum: n = !1 } = t,
              i = e.readBytes(32);
            return [((r = C.J(U.N(i, -20))), n ? X(r) : r), 32];
          })(t, { checksum: o });
        if ("bool" === r.type) {
          return ((i = t), [U.K(i.readBytes(32), { size: 32 }), 32]);
        }
        if (r.type.startsWith("bytes"))
          return (function (e, t, { staticPosition: r }) {
            let [n, i] = t.type.split("bytes");
            if (!i) {
              let t = U.L(e.readBytes(32));
              e.setPosition(r + t);
              let n = U.L(e.readBytes(32));
              if (0 === n) return (e.setPosition(r + 32), ["0x", 32]);
              let i = e.readBytes(n);
              return (e.setPosition(r + 32), [C.J(i), 32]);
            }
            return [C.J(e.readBytes(Number.parseInt(i, 10), 32)), 32];
          })(t, r, { staticPosition: u });
        if (r.type.startsWith("uint") || r.type.startsWith("int")) {
          let e, n, i;
          return (
            (a = t),
            (e = (s = r).type.startsWith("int")),
            (n = Number.parseInt(s.type.split("int")[1] || "256", 10)),
            (i = a.readBytes(32)),
            [n > 48 ? U.k(i, { signed: e }) : U.L(i, { signed: e }), 32]
          );
        }
        if ("string" === r.type)
          return (function (e, { staticPosition: t }) {
            let r = U.L(e.readBytes(32));
            e.setPosition(t + r);
            let n = U.L(e.readBytes(32));
            if (0 === n) return (e.setPosition(t + 32), ["", 32]);
            let i = e.readBytes(n, 32),
              a = U.e(U.q(i));
            return (e.setPosition(t + 32), [a, 32]);
          })(t, { staticPosition: u });
        throw new eO(r.type);
      })(s, r, { checksumAddress: i, staticPosition: 0 });
      ((o += c), "Array" === n ? u.push(l) : (u[r.name ?? t] = l));
    }
    return u;
  }
  function eE(e, t, r) {
    let { checksumAddress: n = !1 } = r ?? {};
    if (e.length !== t.length)
      throw new eR({ expectedLength: e.length, givenLength: t.length });
    let i = eg(
      (function ({ checksumAddress: e, parameters: t, values: r }) {
        let n = [];
        for (let i = 0; i < t.length; i++)
          n.push(
            (function e({ checksumAddress: t = !1, parameter: r, value: n }) {
              let i = eb(r.type);
              if (i) {
                let [a, s] = i;
                return (function (t, r) {
                  let { checksumAddress: n, length: i, parameter: a } = r,
                    s = null === i;
                  if (!Array.isArray(t)) throw new eF(t);
                  if (!s && t.length !== i)
                    throw new eU({
                      expectedLength: i,
                      givenLength: t.length,
                      type: `${a.type}[${i}]`,
                    });
                  let o = 0 === t.length && ew(a),
                    u = [];
                  for (let r = 0; r < t.length; r++) {
                    let i = e({
                      checksumAddress: n,
                      parameter: a,
                      value: t[r],
                    });
                    (i.dynamic && (o = !0), u.push(i));
                  }
                  if (s || o) {
                    let e = eg(u);
                    if (s) {
                      let t = C.u(u.length, { size: 32 });
                      return {
                        dynamic: !0,
                        encoded: u.length > 0 ? C.w(t, e) : t,
                      };
                    }
                    if (o) return { dynamic: !0, encoded: e };
                  }
                  return {
                    dynamic: !1,
                    encoded: C.w(...u.map(({ encoded: e }) => e)),
                  };
                })(n, {
                  checksumAddress: t,
                  length: a,
                  parameter: { ...r, type: s },
                });
              }
              if ("tuple" === r.type)
                return (function (t, r) {
                  let { checksumAddress: n, parameter: i } = r,
                    a = !1,
                    s = [];
                  for (let r = 0; r < i.components.length; r++) {
                    let o = i.components[r],
                      u = Array.isArray(t) ? r : o.name,
                      l = e({ checksumAddress: n, parameter: o, value: t[u] });
                    (s.push(l), l.dynamic && (a = !0));
                  }
                  return {
                    dynamic: a,
                    encoded: a ? eg(s) : C.w(...s.map(({ encoded: e }) => e)),
                  };
                })(n, { checksumAddress: t, parameter: r });
              if ("address" === r.type)
                return (function (e, t) {
                  let { checksum: r = !1 } = t;
                  return (
                    Z(e, { strict: r }),
                    { dynamic: !1, encoded: C.V(e.toLowerCase()) }
                  );
                })(n, { checksum: t });
              if ("bool" === r.type) {
                var a = n;
                if ("boolean" != typeof a)
                  throw new S.f(
                    `Invalid boolean value: "${a}" (type: ${typeof a}). Expected: \`true\` or \`false\`.`,
                  );
                return { dynamic: !1, encoded: C.V(C.U(a)) };
              }
              if (r.type.startsWith("uint") || r.type.startsWith("int")) {
                let e = r.type.startsWith("int"),
                  [, , t = "256"] = em.exec(r.type) ?? [];
                return (function (e, { signed: t, size: r }) {
                  if ("number" == typeof r) {
                    let n = 2n ** (BigInt(r) - (t ? 1n : 0n)) - 1n,
                      i = t ? -n - 1n : 0n;
                    if (e > n || e < i)
                      throw new C.d({
                        max: n.toString(),
                        min: i.toString(),
                        signed: t,
                        size: r / 8,
                        value: e.toString(),
                      });
                  }
                  return {
                    dynamic: !1,
                    encoded: C.u(e, { size: 32, signed: t }),
                  };
                })(n, { signed: e, size: Number(t) });
              }
              if (r.type.startsWith("bytes"))
                return (function (e, { type: t }) {
                  let [, r] = t.split("bytes"),
                    n = C.o(e);
                  if (!r) {
                    let t = e;
                    return (
                      n % 32 != 0 &&
                        (t = C.i(t, 32 * Math.ceil((e.length - 2) / 2 / 32))),
                      {
                        dynamic: !0,
                        encoded: C.w(C.V(C.u(n, { size: 32 })), t),
                      }
                    );
                  }
                  if (n !== Number.parseInt(r, 10))
                    throw new eC({
                      expectedSize: Number.parseInt(r, 10),
                      value: e,
                    });
                  return { dynamic: !1, encoded: C.i(e) };
                })(n, { type: r.type });
              if ("string" === r.type) {
                var s = n;
                let e = C.A(s),
                  t = Math.ceil(C.o(e) / 32),
                  r = [];
                for (let n = 0; n < t; n++)
                  r.push(C.i(C.M(e, 32 * n, (n + 1) * 32)));
                return {
                  dynamic: !0,
                  encoded: C.w(C.i(C.u(C.o(e), { size: 32 })), ...r),
                };
              }
              throw new eO(r.type);
            })({ checksumAddress: e, parameter: t[i], value: r[i] }),
          );
        return n;
      })({ checksumAddress: n, parameters: e, values: t }),
    );
    return 0 === i.length ? "0x" : i;
  }
  function eN(e, t) {
    if (e.length !== t.length)
      throw new eR({ expectedLength: e.length, givenLength: t.length });
    let r = [];
    for (let n = 0; n < e.length; n++) {
      let i = e[n],
        a = t[n];
      r.push(eN.encode(i, a));
    }
    return C.w(...r);
  }
  function eT(e) {
    return ef.f(e);
  }
  function eS(e) {
    return (Array.isArray(e) && "string" == typeof e[0]) || "string" == typeof e
      ? ed.f(e)
      : e;
  }
  (e.s(["f", 0, eP], 368245),
    ((eN || (eN = {})).encode = function e(t, r, n = !1) {
      if ("address" === t) return (Z(r), C.V(r.toLowerCase(), 32 * !!n));
      if ("string" === t) return C.A(r);
      if ("bytes" === t) return r;
      if ("bool" === t) return C.V(C.U(r), n ? 32 : 1);
      let i = t.match(em);
      if (i) {
        let [e, t, a = "256"] = i,
          s = Number.parseInt(a, 10) / 8;
        return C.u(r, { size: n ? 32 : s, signed: "int" === t });
      }
      let a = t.match(eh);
      if (a) {
        let [e, t] = a;
        if (Number.parseInt(t, 10) !== (r.length - 2) / 2)
          throw new eC({ expectedSize: Number.parseInt(t, 10), value: r });
        return C.i(r, 32 * !!n);
      }
      let s = t.match(ey);
      if (s && Array.isArray(r)) {
        let [t, n] = s,
          i = [];
        for (let t = 0; t < r.length; t++) i.push(e(n, r[t], !0));
        return 0 === i.length ? "0x" : C.w(...i);
      }
      throw new eO(t);
    }));
  class eM extends ep.f {
    constructor({ data: e, parameters: t, size: r }) {
      (super(`Data size of ${r} bytes is too small for given parameters.`, {
        metaMessages: [`Params: (${ef.f(t)})`, `Data:   ${e} (${r} bytes)`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.DataSizeTooSmallError",
        }));
    }
  }
  class ez extends ep.f {
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
  class eU extends ep.f {
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
  class eC extends ep.f {
    constructor({ expectedSize: e, value: t }) {
      (super(
        `Size of bytes "${t}" (bytes${C.o(t)}) does not match expected size (bytes${e}).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.BytesSizeMismatchError",
        }));
    }
  }
  class eR extends ep.f {
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
  class eF extends ep.f {
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
  class eO extends ep.f {
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
  e.i(367101);
  function e$(...e) {
    let [t, r = []] = (() => {
        if (Array.isArray(e[0])) {
          let [t, r, n] = e;
          return [ej(t, r, { args: n }), n];
        }
        let [t, r] = e;
        return [t, r];
      })(),
      { overloads: n } = t,
      i = n ? ej([t, ...n], t.name, { args: r }) : t,
      a = es(i),
      s = r.length > 0 ? eE(i.inputs, r) : void 0;
    return s ? C.w(a, s) : a;
  }
  function eL(e, t = {}) {
    return ei(e, t);
  }
  function ej(e, t, r) {
    let n = ea(e, t, r);
    if ("function" !== n.type) throw new el({ name: t, type: "function" });
    return n;
  }
  (S.f, S.f, S.f, S.f, S.f, S.f);
  let eK = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    eG = "0x0000000000000000000000000000000000000000";
  e.s(["l", 0, eK, "B", 0, eG], 399814);
  var eD = e.i(160642),
    eq = e.i(339513),
    eW = e.i(859095),
    e_ = e.i(95285),
    eV = e.i(274994);
  let eH =
      "0x608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063fd00430c1461002d575b5f5ffd5b6100476004803603810190610042919061012b565b610049565b005b80825f375f5f825f865afa610060573d5f5f3e3d5ffd5b3d5f5f3e3d5ff35b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61009982610070565b9050919050565b6100a98161008f565b81146100b3575f5ffd5b50565b5f813590506100c4816100a0565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126100eb576100ea6100ca565b5b8235905067ffffffffffffffff811115610108576101076100ce565b5b602083019150836001820283011115610124576101236100d2565b5b9250929050565b5f5f5f6040848603121561014257610141610068565b5b5f61014f868287016100b6565b935050602084013567ffffffffffffffff8111156101705761016f61006c565b5b61017c868287016100d6565b9250925050925092509256fea2646970667358221220635ed99185cacf3f2acba6921f23687c969cec2bbaf5f9ad599f507e6e105e6964736f6c63430008230033",
    eJ = eo(
      (function (e, t = {}) {
        return ei(e, t);
      })(
        "event Transfer(address indexed from, address indexed to, uint256 value)",
      ),
    ),
    eZ = eL("function balanceOf(address) returns (uint256)"),
    eX = eL("function decimals() returns (uint256)"),
    eY = eL("function tokenURI(uint256) returns (string)"),
    eQ = eL("function symbol() returns (string)"),
    e0 = eL("function query(address target, bytes data)");
  async function e1(e, t) {
    var n, a;
    let s,
      {
        blockNumber: o,
        blockTag: u,
        calls: l,
        stateOverrides: c,
        traceAssetChanges: f,
        traceTransfers: d,
        validation: p,
      } = t,
      y = t.account ? (0, g.f)(t.account) : void 0;
    if (f && !y)
      throw new i.f("`account` is required when `traceAssetChanges` is true");
    let h = y
        ? (function (...e) {
            let [t, r] = (() => {
                if (Array.isArray(e[0])) {
                  let [t, r] = e;
                  return [
                    (function (e) {
                      let t = e.find((e) => "constructor" === e.type);
                      if (!t) throw new el({ name: "constructor" });
                      return t;
                    })(t),
                    r,
                  ];
                }
                return e;
              })(),
              { bytecode: n, args: i } = r;
            return C.w(
              n,
              t.inputs?.length && i?.length ? eE(t.inputs, i) : "0x",
            );
          })(ei("constructor(bytes, bytes)"), {
            bytecode: r.I,
            args: [
              "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033",
              e$(eL("function getBalance(address)"), [y.address]),
            ],
          })
        : void 0,
      m = u ?? e.experimental_blockTag ?? "latest",
      b = o;
    if (f && "bigint" != typeof b && "earliest" !== m && "pending" !== m)
      if ("latest" === m) b = await (0, eV.f)(e, { cacheTime: 0 });
      else {
        let t = await (0, e_.f)(e, { blockTag: m });
        if ("bigint" != typeof t.number)
          throw new i.f(`Block tag \`${m}\` did not resolve to a number.`);
        b = t.number;
      }
    let w = "bigint" == typeof b ? { blockNumber: b } : { blockTag: m },
      v = f
        ? await E(e, {
            ...w,
            blocks: [
              {
                calls: l.map((e) => ({ ...e, from: y.address })),
                stateOverrides: c,
              },
            ],
            traceTransfers: d,
            validation: p,
          })
        : void 0,
      x = v
        ? [
            ...new Set([
              ...((n = v[0].calls.flatMap((e) => e.logs ?? [])),
              (a = y.address),
              (s = (0, eD.g)(a.toLowerCase(), { size: 32 })),
              n
                .filter(
                  (e) =>
                    e.topics[0]?.toLowerCase() === eJ &&
                    e.address.toLowerCase() !== eK &&
                    (e.topics[1]?.toLowerCase() === s ||
                      e.topics[2]?.toLowerCase() === s),
                )
                .map((e) => e.address.toLowerCase())),
              ...t.calls.map((e) => e.to?.toLowerCase()),
            ]),
          ].filter((e) => !!e && e !== eK && e !== eG)
        : [],
      P = (function (e) {
        let t = new Set(e.map((e) => e.toLowerCase())),
          r = 3735928559n;
        for (; t.has(`0x${r.toString(16).padStart(40, "0")}`); ) r++;
        return `0x${r.toString(16).padStart(40, "0")}`;
      })([
        ...(y ? [y.address] : []),
        ...x,
        ...(c?.map(({ address: e }) => e) ?? []),
      ]),
      k = [{ address: P, code: eH }],
      [A, I] = await Promise.all([
        f
          ? Promise.all([
              e6(e, { account: y.address, ...w, data: h, stateOverride: c }),
              ...x.map((t) =>
                e6(e, {
                  account: y.address,
                  address: t,
                  ...w,
                  data: e$(eZ, [y.address]),
                  staticCallAddress: P,
                  stateOverride: c,
                }),
              ),
            ])
          : [],
        E(e, {
          ...w,
          blocks: [
            {
              calls: [...l, { to: eG }].map((e) => ({
                ...e,
                from: y?.address,
              })),
              stateOverrides: c,
            },
            ...(f
              ? [
                  { calls: [{ data: h }] },
                  {
                    calls: x.map((e) => ({
                      to: P,
                      data: e2(e, e$(eZ, [y.address])),
                    })),
                    stateOverrides: k,
                  },
                  {
                    calls: x.map((e) => ({ to: P, data: e2(e, e$(eX)) })),
                    stateOverrides: k,
                  },
                  {
                    calls: x.map((e) => ({ to: P, data: e2(e, e$(eY, [0n])) })),
                    stateOverrides: k,
                  },
                  {
                    calls: x.map((e) => ({ to: P, data: e2(e, e$(eQ)) })),
                    stateOverrides: k,
                  },
                ]
              : []),
          ],
          traceTransfers: d,
          validation: p,
        }),
      ]),
      B = I[0],
      [N, T, S, M, z] = f ? I.slice(1) : [],
      { calls: U, ...R } = B,
      F = U.slice(0, -1),
      O = A.map((e) => (e5(e) ? (0, eq.K)(e.data) : null)),
      $ = [...(N?.calls ?? []), ...(T?.calls ?? [])].map((e) =>
        e5(e) ? (0, eq.K)(e.data) : null,
      ),
      L = (S?.calls ?? []).map((e) => e3(e, eX)),
      j = (z?.calls ?? []).map((e) => e3(e, eQ)),
      K = (M?.calls ?? []).map((e) => e3(e, eY)),
      G = [];
    for (let [e, t] of $.entries()) {
      let r = O[e],
        n = A[e],
        i =
          "bigint" == typeof r
            ? r
            : e > 0 && n?.status === "success" && "0x" === n.data
              ? 0n
              : null;
      if ("bigint" != typeof t || "bigint" != typeof i) continue;
      let a = L[e - 1],
        s = j[e - 1],
        o = K[e - 1],
        u =
          0 === e
            ? { address: eK, decimals: 18, symbol: "ETH" }
            : {
                address: x[e - 1],
                decimals: o || a ? Number(a ?? 1) : void 0,
                symbol: s ?? void 0,
              };
      G.push({ token: u, value: { pre: i, post: t, diff: t - i } });
    }
    return { assetChanges: G, block: R, results: F };
  }
  function e2(e, t) {
    return e$(e0, [e, t]);
  }
  function e5(e) {
    return "success" === e.status && /^0x[\da-f]{64}$/i.test(e.data);
  }
  function e3(e, t) {
    if ("failure" === e.status || "0x" === e.data) return null;
    try {
      return (function (...e) {
        let [t, r, n = {}] = (() => {
            if (Array.isArray(e[0])) {
              let [t, r, n, i] = e;
              return [ej(t, r), n, i];
            }
            return e;
          })(),
          i = eB(t.outputs, r, n);
        if (!i || 0 !== Object.keys(i).length)
          return i && 1 === Object.keys(i).length
            ? Array.isArray(i)
              ? i[0]
              : Object.values(i)[0]
            : i;
      })(t, e.data);
    } catch {
      return null;
    }
  }
  async function e6(e, t) {
    let {
      account: r,
      address: n,
      blockNumber: i,
      blockTag: s,
      data: o,
      staticCallAddress: u,
      stateOverride: l,
    } = t;
    try {
      return {
        data:
          (
            await (0, eW.f)(
              { ...e, ccipRead: !1 },
              {
                account: n ? eG : r,
                data: n ? e2(n, o) : o,
                stateOverride:
                  n && u ? [...(l ?? []), { address: u, code: eH }] : l,
                ...(n ? { to: u } : {}),
                ...("bigint" == typeof i
                  ? { blockNumber: i }
                  : { blockTag: s }),
              },
            )
          ).data ?? "0x",
        status: "success",
      };
    } catch (e) {
      if (!(e instanceof a.o) || !(e.cause instanceof b.s)) throw e;
      return { data: "0x", status: "failure" };
    }
  }
  e.s(["f", 0, e1], 357947);
};
