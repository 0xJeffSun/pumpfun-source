// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(753887),
    n = e.i(353110),
    a = e.i(30181),
    o = e.i(971370),
    r = e.i(548127),
    i = e.i(728141),
    s = e.i(761321);
  let u =
      "Transaction failed due to high slippage - please increase max slippage",
    c = i.n.toBase58(),
    m = s.y.toBase58(),
    l = (0, n.y)(i.d),
    d = (0, n.y)(s.s),
    p = { [c]: "Pump", [m]: "PumpSwap" },
    _ = { [c]: l, [m]: d };
  function y(e, t) {
    if (e === c) {
      if (6002 === t || 6003 === t) return u;
      if (6024 === t)
        return "The bonding curve doesn't hold enough liquidity to pay out this sell - wait for buys or sell a smaller amount";
    }
    return e === m && 6004 === t ? u : null;
  }
  class f extends Error {
    code;
    constructor(e, t) {
      (super(`${e}: ${t}`), (this.code = e));
    }
  }
  function b(e) {
    if ("AccountNotFound" === e.err)
      return Error(
        "Your account has 0 SOL. Please transfer some SOL to your account.",
      );
    if (e.err?.InstructionError === void 0) return Error(JSON.stringify(e.err));
    let t = e.logs;
    if (!t) throw Error("Missing tx simulation logs on failure");
    let a = (0, n.z)(e, l);
    if (a instanceof n.U) return a;
    if (a instanceof n.x) {
      let e;
      return (
        (e = y(a.program.toBase58(), a.error.errorCode.number)) &&
          (a.message = e),
        a
      );
    }
    let o = (function (e) {
      let t = /Program (\w+) failed: (.+)/,
        n = /custom program error: (0x[0-9a-fA-F]+)/;
      for (let a of e) {
        let o = a.match(t);
        if (o)
          switch (o[1]) {
            case "11111111111111111111111111111111":
              switch (parseInt(o[2].match(n)[1])) {
                case 0:
                  return new f(
                    "AccountAlreadyExists",
                    `${e[e.indexOf(a) - 1]}`,
                  );
                case 1:
                  return new f("InsufficientFunds", `${e[e.indexOf(a) - 1]}`);
              }
              break;
            case "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8":
              switch (parseInt(o[2].match(n)[1])) {
                case 30:
                  return new f(
                    "RaydiumExceededSlippage",
                    `${e[e.indexOf(a) - 2]}`,
                  );
                case 40:
                  return new f(
                    "RaydiumInsufficientFunds",
                    `${e[e.indexOf(a) - 2]}`,
                  );
              }
              break;
            case "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL":
              if ("Provided owner is not allowed" === o[2])
                return new f("IllegalOwner", `${a}`);
          }
      }
      return null;
    })(t);
    return (
      o ||
      (t[t.length - 1].includes("exceeded CUs meter at BPF instruction")
        ? Error(`Exhausted compute units: ${t[t.length - 2]}`)
        : t.length >= 4
          ? Error([t[t.length - 4], t[t.length - 3]].join(" "))
          : Error(t.join(" ")))
    );
  }
  e.s(
    [
      "d",
      0,
      function (e, t) {
        if ("string" == typeof e)
          return "AccountNotFound" === e
            ? Error(
                "Your account has 0 SOL. Please transfer some SOL to your account.",
              )
            : Error(`Transaction failed: ${e}`);
        let n = e?.InstructionError;
        if (!n) return Error(`Transaction failed: ${JSON.stringify(e)}`);
        let [a, o] = n,
          r = (function (e, t) {
            if (!e) return null;
            try {
              let n = e.message,
                a = n.compiledInstructions?.[t],
                o = a && n.staticAccountKeys?.[a.programIdIndex];
              return o ? o.toBase58() : null;
            } catch {
              return null;
            }
          })(t, a);
        if (
          "object" == typeof o &&
          null !== o &&
          "Custom" in o &&
          "number" == typeof o.Custom
        ) {
          let e = o.Custom;
          if (r) {
            let t = y(r, e);
            if (t) return Error(t);
            let n = _[r]?.get(e);
            if (n) {
              let e = p[r];
              return Error(e ? `${e}: ${n}` : n);
            }
            let a = p[r];
            if (a) return Error(`${a} program error ${e}`);
          }
          return Error(`Transaction failed: program error ${e}`);
        }
        return "string" == typeof o
          ? Error(`Transaction failed: ${o}`)
          : Error(`Transaction failed: ${JSON.stringify(o)}`);
      },
      "t",
      0,
      b,
    ],
    43074,
  );
  var g = e.i(110823),
    h = e.i(172e3),
    k = e.i(424509),
    v = e.i(358052);
  function w(e, t) {
    return e ? Math.floor(t * o.LAMPORTS_PER_SOL) : 1e6;
  }
  e.s(
    [
      "B",
      0,
      function (e) {
        return new k.default(e.supply.toString());
      },
      "j",
      0,
      w,
      "b",
      0,
      function (e) {
        return new k.default(e.amount.toString());
      },
      "w",
      0,
      function (e) {
        return h.bs58.encode(e.signatures[0]);
      },
      "Z",
      0,
      function (e) {
        return h.bs58.encode((0, v.f)(e));
      },
    ],
    480133,
  );
  let { bs58: A } = n.Y.bytes;
  function C(e, t, n) {
    return new o.VersionedTransaction(
      new o.TransactionMessage({
        payerKey: e,
        instructions: t,
        recentBlockhash: n,
      }).compileToV0Message(),
    );
  }
  let P = new o.PublicKey("jitodontfront11111111111111111111111111pump");
  function B({ frontRunningProtection: e, ...t }) {
    let n = o.ComputeBudgetProgram.setComputeUnitLimit(t);
    return (e && n.keys.push({ pubkey: P, isSigner: !1, isWritable: !1 }), n);
  }
  async function S(e, t) {
    if (t.some((e) => e.programId.equals(o.ComputeBudgetProgram.programId)))
      throw Error("ComputeBudgetInstructions present in simulatedInstructions");
    let n = [
      B({ units: 14e5, frontRunningProtection: !1 }),
      o.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }),
    ];
    return (n.push(...t), C(e, n, "11111111111111111111111111111111"));
  }
  function E(e) {
    return t.Buffer.from((0, v.f)(e)).toString("base64");
  }
  let T = "/api/jito";
  async function q(e) {
    if (0 === e.length) return { ok: !1, message: "empty bundle" };
    let t = e.map((e) => E(e)),
      n = JSON.stringify({
        jsonrpc: "2.0",
        id: crypto.randomUUID(),
        method: "sendBundle",
        params: [t, { encoding: "base64" }],
      });
    try {
      let e = await fetch(T, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: n,
      });
      if (!e.ok) {
        let t;
        try {
          let n = await e.json();
          n.error?.message && (t = n.error.message);
        } catch {}
        let n = t
          ? `${t} (HTTP ${e.status})`
          : `HTTP ${e.status} ${e.statusText}`.trim();
        return (
          console.error(`sendJitoBundle non-OK status=${e.status} ${n}`),
          { ok: !1, message: n }
        );
      }
      let t = await e.json();
      if ("string" == typeof t.result) return { ok: !0, bundleId: t.result };
      if (t.error?.message)
        return (
          console.error(`sendJitoBundle error ${t.error.message}`),
          { ok: !1, message: t.error.message }
        );
      return (
        console.error("sendJitoBundle malformed response", t),
        { ok: !1, message: "missing result and error in response" }
      );
    } catch (t) {
      let e = t instanceof Error ? t.message : String(t);
      return (
        console.error("sendJitoBundle failed", t),
        { ok: !1, message: e }
      );
    }
  }
  async function M(e, t, n, { throwOnSimulationError: a = !0 } = {}) {
    let o = await e.simulateTransaction(t, {
        sigVerify: !1,
        replaceRecentBlockhash: !0,
        commitment: r.M,
      }),
      i = o.value;
    if (i.err) {
      if ((console.error("failed to simulate transaction", o), a)) throw b(i);
      return n;
    }
    return i.unitsConsumed ?? n;
  }
  async function F(e, t, n = "High") {
    try {
      let a = await fetch(e.rpcEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "1",
          method: "getPriorityFeeEstimate",
          params: [
            {
              transaction: E(t),
              options: { priorityLevel: n, transactionEncoding: "base64" },
            },
          ],
        }),
      }).then((e) => e.json());
      if (a.error) throw Error(a.error.message);
      return Math.floor(
        Math.min(Math.max(a?.result?.priorityFeeEstimate || 0, 1e5), r.r),
      );
    } catch (e) {
      console.error("failed to fetch priority fee", e);
    }
    return 1e5;
  }
  async function I(e, t, n, a, r, i, s) {
    let u = await S(t, n),
      [c, m] = await Promise.all([M(e, u, a), F(e, u, i)]);
    return [
      B({ units: c * r, frontRunningProtection: s }),
      o.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: m }),
      ...n,
    ];
  }
  let x = [
      "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5",
      "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe",
      "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY",
      "ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49",
      "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",
      "ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt",
      "DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL",
      "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT",
    ].map((e) => new o.PublicKey(e)),
    R = [
      "pfnP85qobXv2wETniKjXBhxKvgivpfT8EGAcS8sb3bq",
      "pfnSAoQWtJCDKnjmR8oduqbZYXr69Q4cFQ6VhgFkvgT",
      "pfnntQ8jDjE6aP9uPVYBsTEnzwFZuQqBx9XZ7wpzXNC",
      "pfn2d1g6xkwhykkyjtoccFbC7r19ADf5dGB2YnT1Hgw",
      "pfnXi2FdpFUUn6VyoxUohNyWk2Nup3ruguTgK8jaZaF",
      "pfnKWwarhjuKKg3WV3nw3wAE8zuymigT3vuJHwZeL4s",
      "pfngGVVQLiVRFbLWw3Ektiv17ef9NiRZbcgdAhh4ZEW",
      "pfnSbG36fCGpT8WsB1NEbQ2BH11iog6qjFqMEVCZZgV",
      "pfnaxrmMoemfvbhXek6offTNXas11GtepGQMN9UF3gk",
      "pfn9b35be4L7xh7G8P2jUzWsJAigrKDSoBeRMiyg75p",
      "pfnaZXdkjJq26auzzFKeQm7YKphuNCdDGcJVqqb6awr",
      "pfnUxCuZcfP6yidkG3EsqyR5DTbyie3R74fGoA5oB3J",
      "pfnTcJ1i4mRYzbqGduF71RsooUCFkPSpk8UE7drCkjh",
      "pfnEJvqLGddJxQTA9DcYLTbVwiFdT3KmLXo6UcnmcgC",
      "pfn6dyanKiTTinHs887D7qe2S4727wzK7xi7ERGaizC",
      "pfnSbziLrSSVNqPBD9tpx3Ud4VtbxwsXjdfYv9SmBDx",
    ].map((e) => new o.PublicKey(e)),
    U = "4ce4ba59-0216-4d12-9530-0ff85cef47c6",
    V = [
      `https://ams1.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://ash1.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://ewr1.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://fra2.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://pit1.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://sgp1.secure.nozomi.temporal.xyz/?c=${U}`,
      `https://tyo1.secure.nozomi.temporal.xyz/?c=${U}`,
    ];
  class N extends Error {
    endpoint;
    status;
    body;
    constructor({ endpoint: e, status: t, body: n, rejected: a = !1 }) {
      let o = n.replace(/\s+/g, " ").trim().slice(0, 200);
      (super(
        a
          ? `${e} rejected the transaction (${t}): ${o}`
          : `${e} responded ${t}: ${o}`,
      ),
        (this.name = "TransactionBroadcastError"),
        (this.endpoint = e),
        (this.status = t),
        (this.body = n));
    }
  }
  function L({ endpoint: e, wireTransaction: n }) {
    let a = JSON.stringify({
        jsonrpc: "2.0",
        id: crypto.randomUUID(),
        method: "sendTransaction",
        params: [t.Buffer.from(n).toString("base64"), { encoding: "base64" }],
      }),
      o = e.split("?")[0] ?? e;
    return async (t) => {
      let n,
        r = await fetch(e, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: a,
          signal: t,
        }),
        i = await r.text();
      if (!r.ok) throw new N({ endpoint: o, status: r.status, body: i });
      try {
        n = "" === i ? void 0 : JSON.parse(i);
      } catch {
        throw new N({ endpoint: o, status: r.status, body: i });
      }
      let s = ((e) => {
        if ("object" != typeof e || null === e) return;
        let t = e.error;
        if (null != t) {
          if ("object" == typeof t && "message" in t) {
            let e = t.message;
            if ("string" == typeof e) return e;
          }
          return JSON.stringify(t);
        }
      })(n);
      if (void 0 !== s)
        throw new N({ endpoint: o, status: r.status, body: s, rejected: !0 });
      return n;
    };
  }
  async function D(e, t) {
    var n;
    let r = await (0, a.K)({ clientServerUrl: e })(
      "POST /coins/sign-create-tx",
      {
        body: t,
        hooks: {
          afterResponse: [
            (e, t, n) => {
              if (!n.ok) throw Error(`sign-create-tx failed: HTTP ${n.status}`);
            },
          ],
        },
      },
    );
    if (!r.serializedTx || "string" != typeof r.serializedTx)
      throw Error("sign-create-tx: missing serializedTx in response");
    return (
      (n = r.serializedTx),
      o.VersionedTransaction.deserialize(A.decode(n))
    );
  }
  (e.s(
    [
      "e",
      0,
      function (e) {
        return L({ endpoint: T, wireTransaction: e });
      },
      "f",
      0,
      function (e) {
        return V.map((t) => L({ endpoint: t, wireTransaction: e }));
      },
      "g",
      0,
      M,
      "s",
      0,
      F,
      "c",
      0,
      I,
      "u",
      0,
      function (e, t, n, a, i, s = r.u, u = g.f) {
        if ("dust" === u)
          return [B({ units: t, frontRunningProtection: !1 }), ...e];
        let c = w(n, a);
        return [
          B({ units: t, frontRunningProtection: n }),
          o.ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: Math.floor((1e6 * s) / t),
          }),
          n
            ? o.SystemProgram.transfer({
                fromPubkey: i,
                toPubkey: x[Math.floor(Math.random() * x.length)],
                lamports: c,
              })
            : o.SystemProgram.transfer({
                fromPubkey: i,
                toPubkey: R[Math.floor(Math.random() * R.length)],
                lamports: c,
              }),
          ...e,
        ];
      },
      "x",
      0,
      q,
      "U",
      0,
      B,
      "k",
      0,
      D,
      "t",
      0,
      C,
    ],
    679925,
  ),
    e.s([], 753134));
};
