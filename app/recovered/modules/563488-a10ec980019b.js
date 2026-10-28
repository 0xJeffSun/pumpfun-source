// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    f = e.i(515466),
    n = e.i(79262),
    i = e.i(288667),
    a = e.i(856714),
    s = e.i(878660);
  let c = {
      p: BigInt(
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
      ),
      n: BigInt(
        "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
      ),
      h: BigInt(1),
      a: BigInt(0),
      b: BigInt(7),
      Gx: BigInt(
        "0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      ),
      Gy: BigInt(
        "0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      ),
    },
    o = {
      beta: BigInt(
        "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      ),
      basises: [
        [
          BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
          -BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
        ],
        [
          BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
          BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
        ],
      ],
    },
    u = BigInt(0),
    d = BigInt(2),
    l = (0, i.N)(c.p, {
      sqrt: function (e) {
        let t = c.p,
          r = BigInt(3),
          f = BigInt(6),
          n = BigInt(11),
          a = BigInt(22),
          s = BigInt(23),
          o = BigInt(44),
          u = BigInt(88),
          h = (e * e * e) % t,
          m = (h * h * e) % t,
          g = ((0, i.m)(m, r, t) * m) % t,
          p = ((0, i.m)(g, r, t) * m) % t,
          B = ((0, i.m)(p, d, t) * h) % t,
          y = ((0, i.m)(B, n, t) * B) % t,
          b = ((0, i.m)(y, a, t) * y) % t,
          x = ((0, i.m)(b, o, t) * b) % t,
          w = ((0, i.m)(x, u, t) * x) % t,
          E = ((0, i.m)(w, o, t) * b) % t,
          I = ((0, i.m)(E, r, t) * m) % t,
          v = ((0, i.m)(I, s, t) * y) % t,
          A = ((0, i.m)(v, f, t) * h) % t,
          S = (0, i.m)(A, d, t);
        if (!l.eql(l.sqr(S), e)) throw Error("Cannot find square root");
        return S;
      },
    }),
    h = (0, f.f)({ ...c, Fp: l, lowS: !0, endo: o }, t.E);
  h.Point;
  s.s;
  let m = (0, n.J)(
      l,
      [
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c",
        ],
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84",
        ],
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
      ].map((e) => e.map((e) => BigInt(e))),
    ),
    g = (0, a.h)(l, {
      A: BigInt(
        "0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533",
      ),
      B: BigInt("1771"),
      Z: l.create(BigInt("-11")),
    });
  ((0, n.O)(
    h.Point,
    (e) => {
      let { x: t, y: r } = g(l.create(e[0]));
      return m(t, r);
    },
    {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: l.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.E,
    },
  ),
    e.s(["f", 0, h]));
};
