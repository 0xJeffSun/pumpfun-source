// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["b", () => c, "A", () => u], 612528), e.s(["f", () => o], 821292));
  var t = e.i(572659),
    n = e.i(821316),
    r = e.i(78603);
  class a extends Map {
    constructor(e) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e));
    }
    get(e) {
      let t = super.get(e);
      return (
        super.has(e) && void 0 !== t && (this.delete(e), super.set(e, t)),
        t
      );
    }
    set(e, t) {
      if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
        let e = this.keys().next().value;
        e && this.delete(e);
      }
      return this;
    }
  }
  e.s(["f", 0, a], 933455);
  let i = /^0x[a-fA-F0-9]{40}$/,
    s = new a(8192);
  function o(e, t) {
    let { strict: n = !0 } = t ?? {},
      r = `${e}.${n}`;
    if (s.has(r)) return s.get(r);
    let a = !!i.test(e) && (e.toLowerCase() === e || !n || c(e) === e);
    return (s.set(r, a), a);
  }
  let f = new a(8192);
  function c(e, t) {
    if (f.has(`${e}.${t}`)) return f.get(`${e}.${t}`);
    let a = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
      i = (0, r.f)((0, n.T)(a), "bytes"),
      s = (t ? a.substring(`${t}0x`.length) : a).split("");
    for (let e = 0; e < 40; e += 2)
      (i[e >> 1] >> 4 >= 8 && s[e] && (s[e] = s[e].toUpperCase()),
        (15 & i[e >> 1]) >= 8 &&
          s[e + 1] &&
          (s[e + 1] = s[e + 1].toUpperCase()));
    let o = `0x${s.join("")}`;
    return (f.set(`${e}.${t}`, o), o);
  }
  function u(e, n) {
    if (!o(e, { strict: !1 })) throw new t.f({ address: e });
    return c(e, n);
  }
  var l = e.i(548801);
  class d extends l.f {
    constructor({ offset: e }) {
      super(`Offset \`${e}\` cannot be negative.`, {
        name: "NegativeOffsetError",
      });
    }
  }
  class b extends l.f {
    constructor({ length: e, position: t }) {
      super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`, {
        name: "PositionOutOfBoundsError",
      });
    }
  }
  class p extends l.f {
    constructor({ count: e, limit: t }) {
      super(
        `Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`,
        { name: "RecursiveReadLimitExceededError" },
      );
    }
  }
  e.s(["R", 0, d, "n", 0, b, "_", 0, p], 384757);
  let h = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: 1 / 0,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new p({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit,
        });
    },
    assertPosition(e) {
      if (e < 0 || e > this.bytes.length - 1)
        throw new b({ length: this.bytes.length, position: e });
    },
    decrementPosition(e) {
      if (e < 0) throw new d({ offset: e });
      let t = this.position - e;
      (this.assertPosition(t), (this.position = t));
    },
    getReadCount(e) {
      return this.positionReadCount.get(e || this.position) || 0;
    },
    incrementPosition(e) {
      if (e < 0) throw new d({ offset: e });
      let t = this.position + e;
      (this.assertPosition(t), (this.position = t));
    },
    inspectByte(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t), this.bytes[t]);
    },
    inspectBytes(e, t) {
      let n = t ?? this.position;
      return (this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e));
    },
    inspectUint8(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t), this.bytes[t]);
    },
    inspectUint16(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t + 1), this.dataView.getUint16(t));
    },
    inspectUint24(e) {
      let t = e ?? this.position;
      return (
        this.assertPosition(t + 2),
        (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
      );
    },
    inspectUint32(e) {
      let t = e ?? this.position;
      return (this.assertPosition(t + 3), this.dataView.getUint32(t));
    },
    pushByte(e) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = e),
        this.position++);
    },
    pushBytes(e) {
      (this.assertPosition(this.position + e.length - 1),
        this.bytes.set(e, this.position),
        (this.position += e.length));
    },
    pushUint8(e) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = e),
        this.position++);
    },
    pushUint16(e) {
      (this.assertPosition(this.position + 1),
        this.dataView.setUint16(this.position, e),
        (this.position += 2));
    },
    pushUint24(e) {
      (this.assertPosition(this.position + 2),
        this.dataView.setUint16(this.position, e >> 8),
        this.dataView.setUint8(this.position + 2, 255 & e),
        (this.position += 3));
    },
    pushUint32(e) {
      (this.assertPosition(this.position + 3),
        this.dataView.setUint32(this.position, e),
        (this.position += 4));
    },
    readByte() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectByte();
      return (this.position++, e);
    },
    readBytes(e, t) {
      (this.assertReadLimit(), this._touch());
      let n = this.inspectBytes(e);
      return ((this.position += t ?? e), n);
    },
    readUint8() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint8();
      return ((this.position += 1), e);
    },
    readUint16() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint16();
      return ((this.position += 2), e);
    },
    readUint24() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint24();
      return ((this.position += 3), e);
    },
    readUint32() {
      (this.assertReadLimit(), this._touch());
      let e = this.inspectUint32();
      return ((this.position += 4), e);
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(e) {
      let t = this.position;
      return (
        this.assertPosition(e),
        (this.position = e),
        () => (this.position = t)
      );
    },
    _touch() {
      if (1 / 0 === this.recursiveReadLimit) return;
      let e = this.getReadCount();
      (this.positionReadCount.set(this.position, e + 1),
        e > 0 && this.recursiveReadCount++);
    },
  };
  e.s(
    [
      "f",
      0,
      function (e, { recursiveReadLimit: t = 8192 } = {}) {
        let n = Object.create(h);
        return (
          (n.bytes = e),
          (n.dataView = new DataView(
            e.buffer ?? e,
            e.byteOffset,
            e.byteLength,
          )),
          (n.positionReadCount = new Map()),
          (n.recursiveReadLimit = t),
          n
        );
      },
    ],
    850936,
  );
};
