// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(879868),
    i = e.i(183249),
    a = e.i(4911),
    s = e.i(470083),
    n = e.i(790907),
    o = e.i(613677),
    d = e.i(342463),
    l = e.i(319440),
    u = e.i(637782),
    p = e.i(169119),
    _ = e.i(866890),
    c = e.i(727464);
  let m = "Exchange",
    w = "RelayNonceMapping",
    g = "HyperliquidTransaction:UserSetAbstraction",
    h = ["unifiedAccount"],
    f = {
      Exchange: ["Agent"],
      HyperliquidSignTransaction: [
        "HyperliquidTransaction:ApproveBuilderFee",
        "HyperliquidTransaction:SendAsset",
        g,
      ],
      RelayNonceMapping: ["NonceMapping"],
    },
    y = new Map([
      ["approve_builder_fee", "HyperliquidTransaction:ApproveBuilderFee"],
      ["set_referrer", "Agent"],
      ["update_leverage", "Agent"],
      ["add_margin", "Agent"],
      ["open", "Agent"],
      ["open_fallback", "Agent"],
      ["close", "Agent"],
      ["cancel", "Agent"],
      ["set_tpsl", "Agent"],
      ["hl_send_asset", "HyperliquidTransaction:SendAsset"],
      ["set_abstraction", g],
      ["relay_nonce_mapping", "NonceMapping"],
    ]),
    b = o.z.object({ name: d.z.string(), type: d.z.string() }).strict(),
    v = d.z.string().refine(s.f),
    z = o.z
      .object({
        domain: o.z
          .object({
            name: d.z.string().optional(),
            version: d.z.string().optional(),
            chainId: l.z.union([u.z.number(), d.z.string()]).optional(),
            verifyingContract: d.z.string().optional(),
            salt: v.optional(),
          })
          .strict(),
        types: p.z.record(d.z.string(), _.z.array(b)),
        primaryType: d.z.string(),
        message: p.z.record(d.z.string(), c.z.unknown()),
      })
      .strict();
  class k extends Error {
    constructor(e) {
      (super(e), (this.name = "HyperliquidTypedDataError"));
    }
  }
  let x = /^(address|bool|string|bytes\d*|u?int\d*)(\[\d*\])*$/,
    q = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
    ],
    A = ({ raw: e, kind: t, account: r }) => {
      let s,
        o = z.safeParse(e);
      if (!o.success)
        throw new k(
          `malformed hyperliquid typed_data: ${o.error.issues.map((e) => e.path.join(".")).join(", ")}`,
        );
      let { domain: d, types: l, primaryType: u, message: p } = o.data,
        _ = d.name;
      if (
        void 0 === _ ||
        (_ !== m && "HyperliquidSignTransaction" !== _ && _ !== w)
      )
        throw new k(
          `hyperliquid typed_data domain ${_ ?? "<missing>"} is not signable`,
        );
      if (void 0 === d.verifyingContract)
        throw new k("hyperliquid typed_data verifyingContract is missing");
      try {
        s = (0, i.A)(d.verifyingContract);
      } catch {
        throw new k(
          "hyperliquid typed_data verifyingContract is not an address",
        );
      }
      if (s !== n.B)
        throw new k(
          "hyperliquid typed_data verifyingContract is not the zero address",
        );
      if (void 0 === d.chainId)
        throw new k("hyperliquid typed_data chainId is missing");
      let c = Number(d.chainId);
      if (!Number.isSafeInteger(c) || c <= 0)
        throw new k("hyperliquid typed_data chainId is invalid");
      let b = _ === m ? 1337 : _ === w ? 1 : void 0;
      if (void 0 !== b && c !== b)
        throw new k(`hyperliquid typed_data ${_} chainId ${c} is not ${b}`);
      if (!Object.hasOwn(l, u))
        throw new k(`hyperliquid typed_data primaryType ${u} is not in types`);
      if (!f[_].includes(u))
        throw new k(
          `hyperliquid typed_data primaryType ${u} is not one the flows sign under ${_}`,
        );
      if (void 0 !== t) {
        let e = y.get(t);
        if (void 0 === e)
          throw new k(
            `hyperliquid typed_data payload kind ${t} is not one the flows build`,
          );
        if (e !== u)
          throw new k(
            `hyperliquid typed_data payload kind ${t} must carry primaryType ${e}, not ${u}`,
          );
      }
      if (
        (u === g &&
          (({ message: e, account: t }) => {
            let { abstraction: r, user: i } = e;
            if ("string" != typeof r || !h.includes(r))
              throw new k(
                `hyperliquid typed_data abstraction ${"string" == typeof r ? r : "<missing>"} is not one the flows switch to`,
              );
            if ("string" != typeof i || !(0, a.f)(i, { strict: !1 }))
              throw new k("hyperliquid typed_data user is not an address");
            if (void 0 !== t && i.toLowerCase() !== t.toLowerCase())
              throw new k(
                "hyperliquid typed_data user is not the signing wallet",
              );
          })({ message: p, account: r }),
        !Object.keys(l).every((e) => !x.test(e)))
      )
        throw new k(
          "hyperliquid typed_data names a primitive type as a struct",
        );
      let v = l.EIP712Domain;
      if (void 0 === v)
        throw new k("hyperliquid typed_data types.EIP712Domain is missing");
      if (
        !(({ fields: e, domain: t }) => {
          let r = q.filter((e) => void 0 !== t[e.name]);
          return (
            e.length === r.length &&
            r.every((t, r) => e[r]?.name === t.name && e[r]?.type === t.type)
          );
        })({ fields: v, domain: d })
      )
        throw new k(
          "hyperliquid typed_data types.EIP712Domain does not match the domain",
        );
      return {
        raw: e,
        definition: {
          domain: {
            name: _,
            version: d.version,
            chainId: c,
            verifyingContract: s,
            salt: d.salt,
          },
          types: l,
          primaryType: u,
          message: p,
        },
      };
    };
  e.s(["f", 0, A], 468577);
  var S = e.i(835436),
    E = e.i(967936);
  let I = ({ left: e, right: t }) => e.toLowerCase() === t.toLowerCase(),
    T = async ({ definition: e, signature: t }) => {
      try {
        return await (0, r.f)({ ...e, signature: t });
      } catch {
        return;
      }
    },
    C = (e) => {
      if (void 0 === e)
        throw Error("batch signer returned no result for the payload");
      if ("rejected" === e.status) throw e.reason;
      return e.value;
    },
    M = async ({
      payloads: e,
      account: r,
      signTypedData: i,
      concurrent: a = !1,
      signTypedDataBatch: s,
      tradeError: n = new S.I(),
      onSigned: o,
    }) => {
      let d = e.map((e) => {
          try {
            return {
              payload: e,
              parsed: A({ raw: e.typedData, kind: e.kind, account: r }),
            };
          } catch (t) {
            if ((0, E.c)(t)) throw t;
            throw (
              n.updateContext({ actionKind: e.kind }),
              n.fatal({ reason: "failed_to_sign_transaction", cause: t }),
              n
            );
          }
        }),
        l = a && void 0 !== s && d.length > 1,
        u = l ? await s(d.map(({ parsed: e }) => e.raw)) : void 0,
        p = [];
      for (let [e, { payload: a, parsed: s }] of d.entries()) {
        let d;
        try {
          d = void 0 === u ? await i(s.raw) : C(u[e]);
        } catch (e) {
          if ((0, E.c)(e)) throw e;
          throw (
            n.updateContext({ actionKind: a.kind }),
            n.fatal({ reason: "failed_to_sign_transaction", cause: e }),
            n
          );
        }
        let _ = await T({ definition: s.definition, signature: d });
        if (void 0 === _ || !I({ left: _, right: r }))
          throw (
            n.updateContext({
              actionKind: a.kind,
              serverReason: "signer_mismatch",
            }),
            n.fatal({
              reason: "perp_session_expired",
              cause: Error("signature does not recover to the EVM wallet"),
            }),
            n
          );
        (t.y.info("perp_payload_signed", {
          kind: a.kind,
          domain_name: s.definition.domain.name,
          chain_id: s.definition.domain.chainId,
          primary_type: s.definition.primaryType,
          index: e,
          ...(l ? { concurrent: !0 } : {}),
        }),
          p.push({ template: a.template, signature: d }),
          o?.({ index: e, payload: a }));
      }
      return p;
    };
  e.s(["f", 0, M], 931464);
};
