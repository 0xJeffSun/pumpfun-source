// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(971370);
  let n = t.ComputeBudgetProgram.programId.toBase58(),
    i = {
      [n]: "ComputeBudget",
      "11111111111111111111111111111111": "System",
      TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: "Token",
      ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: "AssociatedToken",
    },
    a = (e) => i[e] ?? `${e.slice(0, 4)}..${e.slice(-4)}`,
    r = (e) => {
      if (0 === e.length) return "empty";
      let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
      return 2 === e[0] && e.length >= 5
        ? `limit=${t.getUint32(1, !0)}`
        : 3 === e[0] && e.length >= 9
          ? `price=${t.getBigUint64(1, !0)}`
          : `op=${e[0]}`;
    },
    s = (e, t) => e.length === t.length && e.every((e, n) => e === t[n]),
    l = {
      kinds: ["undecodable"],
      summary: "returned message could not be decoded",
    },
    o = (e, i) => {
      let o, u;
      try {
        ((o = t.VersionedMessage.deserialize(e)),
          (u = t.VersionedMessage.deserialize(i)));
      } catch {
        return l;
      }
      let d = [],
        c = [],
        m = (e, t) => {
          (d.includes(e) || d.push(e), c.push(t));
        };
      (String(o.version) !== String(u.version) &&
        m("version", `version ${o.version} -> ${u.version}`),
        o.recentBlockhash !== u.recentBlockhash &&
          m("blockhash", "blockhash replaced"));
      let g = (e) =>
        [
          e.header.numRequiredSignatures,
          e.header.numReadonlySignedAccounts,
          e.header.numReadonlyUnsignedAccounts,
        ].join("/");
      g(o) !== g(u) && m("header", `header ${g(o)} -> ${g(u)}`);
      let p = o.staticAccountKeys.map((e) => e.toBase58()),
        f = u.staticAccountKeys.map((e) => e.toBase58());
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
        _ = h(o),
        b = h(u);
      (_.length !== b.length || _.some((e, t) => e !== b[t])) &&
        m("address-table-lookups", `lookup tables ${_.length} -> ${b.length}`);
      let y = (e, t) => {
          let n = e.staticAccountKeys[t];
          return n ? n.toBase58() : `alt#${t}`;
        },
        v = o.compiledInstructions,
        w = u.compiledInstructions;
      if (v.length !== w.length) {
        let e = v.map((e) => y(o, e.programIdIndex)),
          t = w.map((e) => y(u, e.programIdIndex)),
          n = [...new Set(t.filter((t) => !e.includes(t)))],
          i = [...new Set(e.filter((e) => !t.includes(e)))];
        m(
          "instruction-count",
          `instructions ${v.length} -> ${w.length}` +
            (n.length ? ` (added ${n.map(a).join(",")})` : "") +
            (i.length ? ` (removed ${i.map(a).join(",")})` : ""),
        );
      } else
        v.forEach((e, t) => {
          let i,
            l,
            d = w[t],
            c = y(o, e.programIdIndex),
            g = y(u, d.programIdIndex);
          c !== g
            ? m("instruction-program", `ix[${t}] ${a(c)} -> ${a(g)}`)
            : ((i = e.accountKeyIndexes),
              (l = d.accountKeyIndexes),
              (i.length === l.length && i.every((e, t) => e === l[t])) ||
                m(
                  "instruction-accounts",
                  `ix[${t}] ${a(c)} account indexes changed`,
                ),
              s(e.data, d.data) ||
                (c === n
                  ? m(
                      "compute-budget",
                      `ix[${t}] ComputeBudget ${r(e.data)} -> ${r(d.data)}`,
                    )
                  : m("instruction-data", `ix[${t}] ${a(c)} data changed`)));
        });
      return (
        0 === d.length &&
          m(
            "unclassified",
            "message bytes differ with no field-level difference",
          ),
        { kinds: d, summary: c.join("; ").slice(0, 300) }
      );
    };
  class u extends Error {
    kinds;
    constructor(e, t) {
      (super(e), (this.name = "SponsoredSigningError"), (this.kinds = t));
    }
  }
  class d extends u {
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
  class c extends u {
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
      if (!s(e.messageBytes, n)) throw new d(o(e.messageBytes, n));
      if (!e.setSignatureSlots.every((e, n) => !e || m(t.signatures[n])))
        throw new c();
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
    u,
    "s",
    0,
    d,
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
      return s(e.messageBytes, n)
        ? { kind: "intact" }
        : { kind: "rebuilt-unsigned", report: o(e.messageBytes, n) };
    },
  ]);
};
