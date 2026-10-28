// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    f = e.i(944445),
    r = e.i(515466),
    a = e.i(79262),
    i = e.i(288667),
    n = e.i(856714),
    c = e.i(878660);
  let s = {
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
    d = BigInt(0),
    u = BigInt(2),
    l = (0, i.N)(s.p, {
      sqrt: function (e) {
        let t = s.p,
          f = BigInt(3),
          r = BigInt(6),
          a = BigInt(11),
          n = BigInt(22),
          c = BigInt(23),
          o = BigInt(44),
          d = BigInt(88),
          m = (e * e * e) % t,
          h = (m * m * e) % t,
          B = ((0, i.m)(h, f, t) * h) % t,
          p = ((0, i.m)(B, f, t) * h) % t,
          b = ((0, i.m)(p, u, t) * m) % t,
          g = ((0, i.m)(b, a, t) * b) % t,
          y = ((0, i.m)(g, n, t) * g) % t,
          x = ((0, i.m)(y, o, t) * y) % t,
          E = ((0, i.m)(x, d, t) * x) % t,
          I = ((0, i.m)(E, o, t) * y) % t,
          v = ((0, i.m)(I, f, t) * h) % t,
          w = ((0, i.m)(v, c, t) * g) % t,
          S = ((0, i.m)(w, r, t) * m) % t,
          O = (0, i.m)(S, u, t);
        if (!l.eql(l.sqr(O), e)) throw Error("Cannot find square root");
        return O;
      },
    }),
    m = (0, r.f)({ ...s, Fp: l, lowS: !0, endo: o }, t.E);
  m.Point;
  c.s;
  let h = (0, a.J)(
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
    B = (0, n.h)(l, {
      A: BigInt(
        "0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533",
      ),
      B: BigInt("1771"),
      Z: l.create(BigInt("-11")),
    });
  ((0, a.O)(
    m.Point,
    (e) => {
      let { x: t, y: f } = B(l.create(e[0]));
      return h(t, f);
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
    e.s(["f", 0, m]));
};
