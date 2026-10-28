// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(575281),
    r = e.i(959719),
    n = e.i(971370),
    a = e.i(424509),
    i = e.i(711902),
    o = e.i(462024),
    l = e.i(10355),
    u = e.i(279852);
  let s = new Map(),
    c = async (e, a) => {
      let i = s.get(a);
      if (void 0 !== i) return i;
      let o = new n.PublicKey(a),
        l = await e.getAccountInfo(o, "confirmed");
      if (!l) throw Error(`Mint ${a} not found on chain.`);
      let u = l.owner.equals(r.S) ? r.S : r.z,
        c = await (0, t.R)(e, o, void 0, u);
      return (s.set(a, c.decimals), c.decimals);
    },
    d = (e, t) => {
      let r = new a.default(10).pow(new a.default(t)),
        [n, i = ""] = e.split("."),
        o = new a.default((n || "0").replace(/[^0-9]/g, "") || "0"),
        l = (i.replace(/[^0-9]/g, "") + "0".repeat(t)).slice(0, t),
        u = new a.default(l.length > 0 ? l : "0");
      return o.mul(r).add(u);
    };
  async function f(e, t) {
    if (t.length > u.f)
      throw Error(`A bounty supports at most ${u.f} reward pools.`);
    let n = [],
      a = new Set();
    for (let u of t) {
      let t,
        s,
        f = u.humanAmount.replace(/,/g, "").trim(),
        m = Number(f);
      if (!Number.isFinite(m) || m <= 0)
        throw Error("Each pool needs a positive reward amount.");
      if ("SOL" === u.kind) ((t = r.w.toBase58()), (s = l.N.SOL));
      else if ("PUMP" === u.kind) ((t = o.i.PUMP.mint), (s = l.N.PUMP));
      else {
        let r = u.customMint.trim();
        if (!(0, i.l)(r))
          throw Error("Paste a valid mint address for every custom pool.");
        ((t = r), (s = await c(e, r)));
      }
      let p = (0, o.j)(t);
      if (p) throw Error(`$${p} is not currently supported`);
      if (a.has(t)) throw Error("Each reward pool must use a distinct mint.");
      a.add(t);
      let h = d(f, s);
      if (h.lten(0)) throw Error("Each pool needs a positive reward amount.");
      n.push({ mintAddress: t, amountAtomic: h.toString() });
    }
    return n;
  }
  async function m(e, t) {
    let n = [],
      a = new Set();
    for (let s of t.slice(0, u.f))
      try {
        let t,
          u,
          f = s.humanAmount.replace(/,/g, "").trim(),
          m = Number(f);
        if (!Number.isFinite(m) || m <= 0) continue;
        if ("SOL" === s.kind) ((t = r.w.toBase58()), (u = l.N.SOL));
        else if ("PUMP" === s.kind) ((t = o.i.PUMP.mint), (u = l.N.PUMP));
        else {
          let r = s.customMint.trim();
          if (!(0, i.l)(r)) continue;
          ((t = r), (u = await c(e, r)));
        }
        if ((0, o.j)(t) || a.has(t)) continue;
        let p = d(f, u);
        if (p.lten(0)) continue;
        (a.add(t), n.push({ mintAddress: t, amountAtomic: p.toString() }));
      } catch {}
    return n;
  }
  e.s(["I", 0, f, "J", 0, m]);
};
