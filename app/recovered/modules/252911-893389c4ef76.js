// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370);
  let n = t.ComputeBudgetProgram.programId.toBase58(),
    r = {
      [n]: "ComputeBudget",
      "11111111111111111111111111111111": "System",
      TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: "Token",
      ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: "AssociatedToken",
    },
    s = (e) => r[e] ?? `${e.slice(0, 4)}..${e.slice(-4)}`,
    a = (e) => {
      if (0 === e.length) return "empty";
      let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
      return 2 === e[0] && e.length >= 5
        ? `limit=${t.getUint32(1, !0)}`
        : 3 === e[0] && e.length >= 9
          ? `price=${t.getBigUint64(1, !0)}`
          : `op=${e[0]}`;
    },
    i = (e, t) => e.length === t.length && e.every((e, n) => e === t[n]),
    o = {
      kinds: ["undecodable"],
      summary: "returned message could not be decoded",
    },
    l = (e, r) => {
      let l, c;
      try {
        ((l = t.VersionedMessage.deserialize(e)),
          (c = t.VersionedMessage.deserialize(r)));
      } catch {
        return o;
      }
      let u = [],
        d = [],
        m = (e, t) => {
          (u.includes(e) || u.push(e), d.push(t));
        };
      (String(l.version) !== String(c.version) &&
        m("version", `version ${l.version} -> ${c.version}`),
        l.recentBlockhash !== c.recentBlockhash &&
          m("blockhash", "blockhash replaced"));
      let g = (e) =>
        [
          e.header.numRequiredSignatures,
          e.header.numReadonlySignedAccounts,
          e.header.numReadonlyUnsignedAccounts,
        ].join("/");
      g(l) !== g(c) && m("header", `header ${g(l)} -> ${g(c)}`);
      let p = l.staticAccountKeys.map((e) => e.toBase58()),
        f = c.staticAccountKeys.map((e) => e.toBase58());
      p.length !== f.length
        ? m("account-keys", `static keys ${p.length} -> ${f.length}`)
        : p.some((e, t) => e !== f[t]) &&
          m(
            "account-keys",
            [...p].sort().join(",") === [...f].sort().join(",")
              ? "static keys reordered"
              : "static keys changed",
          );
      let h = (e) =>
          e.addressTableLookups.map(
            (e) =>
              `${e.accountKey.toBase58()}:${e.writableIndexes.join(".")}|${e.readonlyIndexes.join(".")}`,
          ),
        b = h(l),
        _ = h(c);
      (b.length !== _.length || b.some((e, t) => e !== _[t])) &&
        m("address-table-lookups", `lookup tables ${b.length} -> ${_.length}`);
      let y = (e, t) => {
          let n = e.staticAccountKeys[t];
          return n ? n.toBase58() : `alt#${t}`;
        },
        w = l.compiledInstructions,
        v = c.compiledInstructions;
      if (w.length !== v.length) {
        let e = w.map((e) => y(l, e.programIdIndex)),
          t = v.map((e) => y(c, e.programIdIndex)),
          n = [...new Set(t.filter((t) => !e.includes(t)))],
          r = [...new Set(e.filter((e) => !t.includes(e)))];
        m(
          "instruction-count",
          `instructions ${w.length} -> ${v.length}` +
            (n.length ? ` (added ${n.map(s).join(",")})` : "") +
            (r.length ? ` (removed ${r.map(s).join(",")})` : ""),
        );
      } else
        w.forEach((e, t) => {
          let r,
            o,
            u = v[t],
            d = y(l, e.programIdIndex),
            g = y(c, u.programIdIndex);
          d !== g
            ? m("instruction-program", `ix[${t}] ${s(d)} -> ${s(g)}`)
            : ((r = e.accountKeyIndexes),
              (o = u.accountKeyIndexes),
              (r.length === o.length && r.every((e, t) => e === o[t])) ||
                m(
                  "instruction-accounts",
                  `ix[${t}] ${s(d)} account indexes changed`,
                ),
              i(e.data, u.data) ||
                (d === n
                  ? m(
                      "compute-budget",
                      `ix[${t}] ComputeBudget ${a(e.data)} -> ${a(u.data)}`,
                    )
                  : m("instruction-data", `ix[${t}] ${s(d)} data changed`)));
        });
      return (
        0 === u.length &&
          m(
            "unclassified",
            "message bytes differ with no field-level difference",
          ),
        { kinds: u, summary: d.join("; ").slice(0, 300) }
      );
    };
  class c extends Error {
    kinds;
    constructor(e, t) {
      (super(e), (this.name = "SponsoredSigningError"), (this.kinds = t));
    }
  }
  class u extends c {
    report;
    constructor(e) {
      (super(
        `wallet rebuilt the transaction message; sponsor signature invalidated (${e.summary})`,
        e.kinds,
      ),
        (this.name = "WalletRebuiltMessageError"),
        (this.report = e));
    }
  }
  class d extends c {
    constructor() {
      (super("wallet dropped the sponsor signature while signing", [
        "sponsor-signature-dropped",
      ]),
        (this.name = "SponsorSignatureDroppedError"));
    }
  }
  let m = (e) => e.some((e) => 0 !== e),
    g = (e, t) => {
      let n = Uint8Array.from(t.message.serialize());
      if (!i(e.messageBytes, n)) throw new u(l(e.messageBytes, n));
      if (!e.setSignatureSlots.every((e, n) => !e || m(t.signatures[n])))
        throw new d();
    };
  class p extends Error {
    constructor(e) {
      (super(e), (this.name = "PartialSignError"));
    }
  }
  let f = /fee ?payer/i;
  e.s([
    "m",
    0,
    "Your wallet does not support this trade route (it would not sign a transaction whose fee payer is not the connected wallet). Try a different wallet or a smaller amount.",
    "E",
    0,
    p,
    "e",
    0,
    c,
    "s",
    0,
    u,
    "D",
    0,
    (e) => {
      let [t, n] = e.signatures;
      if (!t || !n || m(t) || !m(n))
        throw new p(
          "wallet did not return the partially signed transaction intact",
        );
    },
    "a",
    0,
    g,
    "U",
    0,
    (e) => ({
      messageBytes: Uint8Array.from(e.message.serialize()),
      setSignatureSlots: e.signatures.map(m),
    }),
    "f",
    0,
    (e) => e instanceof Error && f.test(e.message),
    "K",
    0,
    m,
    "_",
    0,
    (e, t) => {
      if (e.setSignatureSlots.some(Boolean))
        return (g(e, t), { kind: "intact" });
      let n = Uint8Array.from(t.message.serialize());
      return i(e.messageBytes, n)
        ? { kind: "intact" }
        : { kind: "rebuilt-unsigned", report: l(e.messageBytes, n) };
    },
  ]);
};
