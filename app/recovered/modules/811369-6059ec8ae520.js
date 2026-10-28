// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(532617);
  class n extends e.f {
    constructor({ offset: t }) {
      super(`Offset \`${t}\` cannot be negative.`, {
        name: "NegativeOffsetError",
      });
    }
  }
  class i extends e.f {
    constructor({ length: t, position: e }) {
      super(`Position \`${e}\` is out of bounds (\`0 < position < ${t}\`).`, {
        name: "PositionOutOfBoundsError",
      });
    }
  }
  class s extends e.f {
    constructor({ count: t, limit: e }) {
      super(
        `Recursive read limit of \`${e}\` exceeded (recursive read count: \`${t}\`).`,
        { name: "RecursiveReadLimitExceededError" },
      );
    }
  }
  t.s(["R", 0, n, "n", 0, i, "_", 0, s], 782102);
  let r = {
    bytes: new Uint8Array(),
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map(),
    recursiveReadCount: 0,
    recursiveReadLimit: 1 / 0,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new s({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit,
        });
    },
    assertPosition(t) {
      if (t < 0 || t > this.bytes.length - 1)
        throw new i({ length: this.bytes.length, position: t });
    },
    decrementPosition(t) {
      if (t < 0) throw new n({ offset: t });
      let e = this.position - t;
      (this.assertPosition(e), (this.position = e));
    },
    getReadCount(t) {
      return this.positionReadCount.get(t || this.position) || 0;
    },
    incrementPosition(t) {
      if (t < 0) throw new n({ offset: t });
      let e = this.position + t;
      (this.assertPosition(e), (this.position = e));
    },
    inspectByte(t) {
      let e = t ?? this.position;
      return (this.assertPosition(e), this.bytes[e]);
    },
    inspectBytes(t, e) {
      let n = e ?? this.position;
      return (this.assertPosition(n + t - 1), this.bytes.subarray(n, n + t));
    },
    inspectUint8(t) {
      let e = t ?? this.position;
      return (this.assertPosition(e), this.bytes[e]);
    },
    inspectUint16(t) {
      let e = t ?? this.position;
      return (this.assertPosition(e + 1), this.dataView.getUint16(e));
    },
    inspectUint24(t) {
      let e = t ?? this.position;
      return (
        this.assertPosition(e + 2),
        (this.dataView.getUint16(e) << 8) + this.dataView.getUint8(e + 2)
      );
    },
    inspectUint32(t) {
      let e = t ?? this.position;
      return (this.assertPosition(e + 3), this.dataView.getUint32(e));
    },
    pushByte(t) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = t),
        this.position++);
    },
    pushBytes(t) {
      (this.assertPosition(this.position + t.length - 1),
        this.bytes.set(t, this.position),
        (this.position += t.length));
    },
    pushUint8(t) {
      (this.assertPosition(this.position),
        (this.bytes[this.position] = t),
        this.position++);
    },
    pushUint16(t) {
      (this.assertPosition(this.position + 1),
        this.dataView.setUint16(this.position, t),
        (this.position += 2));
    },
    pushUint24(t) {
      (this.assertPosition(this.position + 2),
        this.dataView.setUint16(this.position, t >> 8),
        this.dataView.setUint8(this.position + 2, 255 & t),
        (this.position += 3));
    },
    pushUint32(t) {
      (this.assertPosition(this.position + 3),
        this.dataView.setUint32(this.position, t),
        (this.position += 4));
    },
    readByte() {
      (this.assertReadLimit(), this._touch());
      let t = this.inspectByte();
      return (this.position++, t);
    },
    readBytes(t, e) {
      (this.assertReadLimit(), this._touch());
      let n = this.inspectBytes(t);
      return ((this.position += e ?? t), n);
    },
    readUint8() {
      (this.assertReadLimit(), this._touch());
      let t = this.inspectUint8();
      return ((this.position += 1), t);
    },
    readUint16() {
      (this.assertReadLimit(), this._touch());
      let t = this.inspectUint16();
      return ((this.position += 2), t);
    },
    readUint24() {
      (this.assertReadLimit(), this._touch());
      let t = this.inspectUint24();
      return ((this.position += 3), t);
    },
    readUint32() {
      (this.assertReadLimit(), this._touch());
      let t = this.inspectUint32();
      return ((this.position += 4), t);
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(t) {
      let e = this.position;
      return (
        this.assertPosition(t),
        (this.position = t),
        () => (this.position = e)
      );
    },
    _touch() {
      if (1 / 0 === this.recursiveReadLimit) return;
      let t = this.getReadCount();
      (this.positionReadCount.set(this.position, t + 1),
        t > 0 && this.recursiveReadCount++);
    },
  };
  t.s(
    [
      "f",
      0,
      function (t, { recursiveReadLimit: e = 8192 } = {}) {
        let n = Object.create(r);
        return (
          (n.bytes = t),
          (n.dataView = new DataView(
            t.buffer ?? t,
            t.byteOffset,
            t.byteLength,
          )),
          (n.positionReadCount = new Map()),
          (n.recursiveReadLimit = e),
          n
        );
      },
    ],
    811369,
  );
};
