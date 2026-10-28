// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n,
    r,
    o,
    i = e.i(753887),
    u = e.i(742542);
  e.i(457417);
  var a = e.i(973926),
    l = e.i(340907),
    c = e.i(232215),
    s = e.i(971370),
    f = e.i(959719);
  class d extends Error {
    constructor(e) {
      super(e);
    }
  }
  class m extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenAccountNotFoundError"));
    }
  }
  class h extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountError"));
    }
  }
  class g extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountOwnerError"));
    }
  }
  class p extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidAccountSizeError"));
    }
  }
  class b extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenInvalidMintError"));
    }
  }
  class A extends d {
    constructor() {
      (super(...arguments), (this.name = "TokenOwnerOffCurveError"));
    }
  }
  (e.s(
    [
      "z",
      0,
      m,
      "M",
      0,
      h,
      "n",
      0,
      g,
      "o",
      0,
      p,
      "P",
      0,
      b,
      "p",
      0,
      A,
      "_",
      0,
      class extends d {
        constructor() {
          (super(...arguments),
            (this.name = "TokenUnsupportedInstructionError"));
        }
      },
    ],
    521492,
  ),
    ((t = r || (r = {}))[(t.Uninitialized = 0)] = "Uninitialized"),
    (t[(t.Mint = 1)] = "Mint"),
    (t[(t.Account = 2)] = "Account"),
    e.s(["h", 0, 1, "d", 0, r], 512619));
  let y = (0, u.struct)([
    (0, u.u8)("m"),
    (0, u.u8)("n"),
    (0, a.f)("isInitialized"),
    (0, l.f)("signer1"),
    (0, l.f)("signer2"),
    (0, l.f)("signer3"),
    (0, l.f)("signer4"),
    (0, l.f)("signer5"),
    (0, l.f)("signer6"),
    (0, l.f)("signer7"),
    (0, l.f)("signer8"),
    (0, l.f)("signer9"),
    (0, l.f)("signer10"),
    (0, l.f)("signer11"),
  ]).span;
  (e.s(["f", 0, y], 17186),
    ((n = o || (o = {}))[(n.Uninitialized = 0)] = "Uninitialized"),
    (n[(n.Initialized = 1)] = "Initialized"),
    (n[(n.Frozen = 2)] = "Frozen"));
  let v = (0, u.struct)([
      (0, l.f)("mint"),
      (0, l.f)("owner"),
      (0, c.H)("amount"),
      (0, u.u32)("delegateOption"),
      (0, l.f)("delegate"),
      (0, u.u8)("state"),
      (0, u.u32)("isNativeOption"),
      (0, c.H)("isNative"),
      (0, c.H)("delegatedAmount"),
      (0, u.u32)("closeAuthorityOption"),
      (0, l.f)("closeAuthority"),
    ]),
    w = v.span;
  async function B(e, t, n, r = f.z) {
    let o = await e.getAccountInfo(t, n);
    return k(t, o, r);
  }
  function k(e, t, n = f.z) {
    if (!t) throw new m();
    if (!t.owner.equals(n)) throw new g();
    if (t.data.length < w) throw new p();
    let u = v.decode(t.data.slice(0, w)),
      a = i.Buffer.alloc(0);
    if (t.data.length > w) {
      if (t.data.length === y) throw new p();
      if (t.data[w] != r.Account) throw new h();
      a = t.data.slice(w + 1);
    }
    return {
      address: e,
      mint: u.mint,
      owner: u.owner,
      amount: u.amount,
      delegate: u.delegateOption ? u.delegate : null,
      delegatedAmount: u.delegatedAmount,
      isInitialized: u.state !== o.Uninitialized,
      isFrozen: u.state === o.Frozen,
      isNative: !!u.isNativeOption,
      rentExemptReserve: u.isNativeOption ? u.isNative : null,
      closeAuthority: u.closeAuthorityOption ? u.closeAuthority : null,
      tlvData: a,
    };
  }
  e.s(["C", 0, w, "d", 0, v, "l", 0, B, "V", 0, k], 824425);
  let S = (0, u.struct)([
      (0, u.u32)("mintAuthorityOption"),
      (0, l.f)("mintAuthority"),
      (0, c.H)("supply"),
      (0, u.u8)("decimals"),
      (0, a.f)("isInitialized"),
      (0, u.u32)("freezeAuthorityOption"),
      (0, l.f)("freezeAuthority"),
    ]),
    T = S.span;
  async function C(e, t, n, r = f.z) {
    let o = await e.getAccountInfo(t, n);
    return I(t, o, r);
  }
  function I(e, t, n = f.z) {
    if (!t) throw new m();
    if (!t.owner.equals(n)) throw new g();
    if (t.data.length < T) throw new p();
    let o = S.decode(t.data.slice(0, T)),
      u = i.Buffer.alloc(0);
    if (t.data.length > T) {
      if (t.data.length <= w || t.data.length === y) throw new p();
      if (t.data[w] != r.Mint) throw new b();
      u = t.data.slice(w + 1);
    }
    return {
      address: e,
      mintAuthority: o.mintAuthorityOption ? o.mintAuthority : null,
      supply: o.supply,
      decimals: o.decimals,
      isInitialized: o.isInitialized,
      freezeAuthority: o.freezeAuthorityOption ? o.freezeAuthority : null,
      tlvData: u,
    };
  }
  e.s(
    [
      "b",
      0,
      T,
      "x",
      0,
      S,
      "h",
      0,
      function (e, t, n = !1, r = f.z, o = f.x) {
        if (!n && !s.PublicKey.isOnCurve(t.toBuffer())) throw new A();
        let [i] = s.PublicKey.findProgramAddressSync(
          [t.toBuffer(), r.toBuffer(), e.toBuffer()],
          o,
        );
        return i;
      },
      "R",
      0,
      C,
      "g",
      0,
      I,
    ],
    575281,
  );
};
