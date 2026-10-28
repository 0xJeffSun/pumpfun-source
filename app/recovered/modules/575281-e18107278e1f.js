// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    f,
    n,
    i = e.i(753887),
    a = e.i(742542);
  e.i(457417);
  var s = e.i(973926),
    c = e.i(340907),
    o = e.i(232215),
    u = e.i(971370),
    d = e.i(959719);
  class l extends Error {
    constructor(e) {
      super(e);
    }
  }
  class h extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenAccountNotFoundError"));
    }
  }
  class m extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountError"));
    }
  }
  class g extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountOwnerError"));
    }
  }
  class p extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountSizeError"));
    }
  }
  class B extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidMintError"));
    }
  }
  class y extends l {
    constructor() {
      (super(...arguments), (this.name = "TokenOwnerOffCurveError"));
    }
  }
  (e.s(
    [
      "z",
      0,
      h,
      "M",
      0,
      m,
      "n",
      0,
      g,
      "o",
      0,
      p,
      "P",
      0,
      B,
      "p",
      0,
      y,
      "_",
      0,
      class extends l {
        constructor() {
          (super(...arguments),
            (this.name = "TokenUnsupportedInstructionError"));
        }
      },
    ],
    521492,
  ),
    ((t = f || (f = {}))[(t.Uninitialized = 0)] = "Uninitialized"),
    (t[(t.Mint = 1)] = "Mint"),
    (t[(t.Account = 2)] = "Account"),
    e.s(["h", 0, 1, "d", 0, f], 512619));
  let b = (0, a.struct)([
    (0, a.u8)("m"),
    (0, a.u8)("n"),
    (0, s.f)("isInitialized"),
    (0, c.f)("signer1"),
    (0, c.f)("signer2"),
    (0, c.f)("signer3"),
    (0, c.f)("signer4"),
    (0, c.f)("signer5"),
    (0, c.f)("signer6"),
    (0, c.f)("signer7"),
    (0, c.f)("signer8"),
    (0, c.f)("signer9"),
    (0, c.f)("signer10"),
    (0, c.f)("signer11"),
  ]).span;
  (e.s(["f", 0, b], 17186),
    ((r = n || (n = {}))[(r.Uninitialized = 0)] = "Uninitialized"),
    (r[(r.Initialized = 1)] = "Initialized"),
    (r[(r.Frozen = 2)] = "Frozen"));
  let x = (0, a.struct)([
      (0, c.f)("mint"),
      (0, c.f)("owner"),
      (0, o.H)("amount"),
      (0, a.u32)("delegateOption"),
      (0, c.f)("delegate"),
      (0, a.u8)("state"),
      (0, a.u32)("isNativeOption"),
      (0, o.H)("isNative"),
      (0, o.H)("delegatedAmount"),
      (0, a.u32)("closeAuthorityOption"),
      (0, c.f)("closeAuthority"),
    ]),
    w = x.span;
  async function E(e, t, r, f = d.z) {
    let n = await e.getAccountInfo(t, r);
    return I(t, n, f);
  }
  function I(e, t, r = d.z) {
    if (!t) throw new h();
    if (!t.owner.equals(r)) throw new g();
    if (t.data.length < w) throw new p();
    let a = x.decode(t.data.slice(0, w)),
      s = i.Buffer.alloc(0);
    if (t.data.length > w) {
      if (t.data.length === b) throw new p();
      if (t.data[w] != f.Account) throw new m();
      s = t.data.slice(w + 1);
    }
    return {
      address: e,
      mint: a.mint,
      owner: a.owner,
      amount: a.amount,
      delegate: a.delegateOption ? a.delegate : null,
      delegatedAmount: a.delegatedAmount,
      isInitialized: a.state !== n.Uninitialized,
      isFrozen: a.state === n.Frozen,
      isNative: !!a.isNativeOption,
      rentExemptReserve: a.isNativeOption ? a.isNative : null,
      closeAuthority: a.closeAuthorityOption ? a.closeAuthority : null,
      tlvData: s,
    };
  }
  e.s(["C", 0, w, "d", 0, x, "l", 0, E, "V", 0, I], 824425);
  let v = (0, a.struct)([
      (0, a.u32)("mintAuthorityOption"),
      (0, c.f)("mintAuthority"),
      (0, o.H)("supply"),
      (0, a.u8)("decimals"),
      (0, s.f)("isInitialized"),
      (0, a.u32)("freezeAuthorityOption"),
      (0, c.f)("freezeAuthority"),
    ]),
    A = v.span;
  async function S(e, t, r, f = d.z) {
    let n = await e.getAccountInfo(t, r);
    return z(t, n, f);
  }
  function z(e, t, r = d.z) {
    if (!t) throw new h();
    if (!t.owner.equals(r)) throw new g();
    if (t.data.length < A) throw new p();
    let n = v.decode(t.data.slice(0, A)),
      a = i.Buffer.alloc(0);
    if (t.data.length > A) {
      if (t.data.length <= w || t.data.length === b) throw new p();
      if (t.data[w] != f.Mint) throw new B();
      a = t.data.slice(w + 1);
    }
    return {
      address: e,
      mintAuthority: n.mintAuthorityOption ? n.mintAuthority : null,
      supply: n.supply,
      decimals: n.decimals,
      isInitialized: n.isInitialized,
      freezeAuthority: n.freezeAuthorityOption ? n.freezeAuthority : null,
      tlvData: a,
    };
  }
  e.s(
    [
      "b",
      0,
      A,
      "x",
      0,
      v,
      "h",
      0,
      function (e, t, r = !1, f = d.z, n = d.x) {
        if (!r && !u.PublicKey.isOnCurve(t.toBuffer())) throw new y();
        let [i] = u.PublicKey.findProgramAddressSync(
          [t.toBuffer(), f.toBuffer(), e.toBuffer()],
          n,
        );
        return i;
      },
      "R",
      0,
      S,
      "g",
      0,
      z,
    ],
    575281,
  );
};
