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
    i = (e) => r[e] ?? `${e.slice(0, 4)}..${e.slice(-4)}`,
    a = (e) => {
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
    o = (e, r) => {
      let o, u;
      try {
        ((o = t.VersionedMessage.deserialize(e)),
          (u = t.VersionedMessage.deserialize(r)));
      } catch {
        return l;
      }
      let c = [],
        d = [],
        m = (e, t) => {
          (c.includes(e) || c.push(e), d.push(t));
        };
      (String(o.version) !== String(u.version) &&
        m("version", `version ${o.version} -> ${u.version}`),
        o.recentBlockhash !== u.recentBlockhash &&
          m("blockhash", "blockhash replaced"));
      let p = (e) =>
        [
          e.header.numRequiredSignatures,
          e.header.numReadonlySignedAccounts,
          e.header.numReadonlyUnsignedAccounts,
        ].join("/");
      p(o) !== p(u) && m("header", `header ${p(o)} -> ${p(u)}`);
      let f = o.staticAccountKeys.map((e) => e.toBase58()),
        g = u.staticAccountKeys.map((e) => e.toBase58());
      f.length !== g.length
        ? m("account-keys", `static keys ${f.length} -> ${g.length}`)
        : f.some((e, t) => e !== g[t]) &&
          m(
            "account-keys",
            [...f].sort().join(",") === [...g].sort().join(",")
              ? "static keys reordered"
              : "static keys changed",
          );
      let h = (e) =>
          e.addressTableLookups.map(
            (e) =>
              `${e.accountKey.toBase58()}:${e.writableIndexes.join(".")}|${e.readonlyIndexes.join(".")}`,
          ),
        y = h(o),
        b = h(u);
      (y.length !== b.length || y.some((e, t) => e !== b[t])) &&
        m("address-table-lookups", `lookup tables ${y.length} -> ${b.length}`);
      let v = (e, t) => {
          let n = e.staticAccountKeys[t];
          return n ? n.toBase58() : `alt#${t}`;
        },
        x = o.compiledInstructions,
        w = u.compiledInstructions;
      if (x.length !== w.length) {
        let e = x.map((e) => v(o, e.programIdIndex)),
          t = w.map((e) => v(u, e.programIdIndex)),
          n = [...new Set(t.filter((t) => !e.includes(t)))],
          r = [...new Set(e.filter((e) => !t.includes(e)))];
        m(
          "instruction-count",
          `instructions ${x.length} -> ${w.length}` +
            (n.length ? ` (added ${n.map(i).join(",")})` : "") +
            (r.length ? ` (removed ${r.map(i).join(",")})` : ""),
        );
      } else
        x.forEach((e, t) => {
          let r,
            l,
            c = w[t],
            d = v(o, e.programIdIndex),
            p = v(u, c.programIdIndex);
          d !== p
            ? m("instruction-program", `ix[${t}] ${i(d)} -> ${i(p)}`)
            : ((r = e.accountKeyIndexes),
              (l = c.accountKeyIndexes),
              (r.length === l.length && r.every((e, t) => e === l[t])) ||
                m(
                  "instruction-accounts",
                  `ix[${t}] ${i(d)} account indexes changed`,
                ),
              s(e.data, c.data) ||
                (d === n
                  ? m(
                      "compute-budget",
                      `ix[${t}] ComputeBudget ${a(e.data)} -> ${a(c.data)}`,
                    )
                  : m("instruction-data", `ix[${t}] ${i(d)} data changed`)));
        });
      return (
        0 === c.length &&
          m(
            "unclassified",
            "message bytes differ with no field-level difference",
          ),
        { kinds: c, summary: d.join("; ").slice(0, 300) }
      );
    };
  class u extends Error {
    kinds;
    constructor(e, t) {
      (super(e), (this.name = "SponsoredSigningError"), (this.kinds = t));
    }
  }
  class c extends u {
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
  class d extends u {
    constructor() {
      (super("wallet dropped the sponsor signature while signing", [
        "sponsor-signature-dropped",
      ]),
        (this.name = "SponsorSignatureDroppedError"));
    }
  }
  let m = (e) => e.some((e) => 0 !== e),
    p = (e, t) => {
      let n = Uint8Array.from(t.message.serialize());
      if (!s(e.messageBytes, n)) throw new c(o(e.messageBytes, n));
      if (!e.setSignatureSlots.every((e, n) => !e || m(t.signatures[n])))
        throw new d();
    };
  class f extends Error {
    constructor(e) {
      (super(e), (this.name = "PartialSignError"));
    }
  }
  let g = /fee ?payer/i;
  e.s([
    "m",
    0,
    "Your wallet does not support this trade route (it would not sign a transaction whose fee payer is not the connected wallet). Try a different wallet or a smaller amount.",
    "E",
    0,
    f,
    "e",
    0,
    u,
    "s",
    0,
    c,
    "D",
    0,
    (e) => {
      let [t, n] = e.signatures;
      if (!t || !n || m(t) || !m(n))
        throw new f(
          "wallet did not return the partially signed transaction intact",
        );
    },
    "a",
    0,
    p,
    "U",
    0,
    (e) => ({
      messageBytes: Uint8Array.from(e.message.serialize()),
      setSignatureSlots: e.signatures.map(m),
    }),
    "f",
    0,
    (e) => e instanceof Error && g.test(e.message),
    "K",
    0,
    m,
    "_",
    0,
    (e, t) => {
      if (e.setSignatureSlots.some(Boolean))
        return (p(e, t), { kind: "intact" });
      let n = Uint8Array.from(t.message.serialize());
      return s(e.messageBytes, n)
        ? { kind: "intact" }
        : { kind: "rebuilt-unsigned", report: o(e.messageBytes, n) };
    },
  ]);
};
