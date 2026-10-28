// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r,
    t,
    s = e.i(753887),
    i = e.i(946269),
    n = e.i(97209);
  let o = { data: s.Buffer.alloc(0), dataLength: 0, sequence: 0 };
  var a = e.i(742507);
  (((r = t || (t = {})).blue = "blue"),
    (r.nanoS = "nanoS"),
    (r.nanoSP = "nanoSP"),
    (r.nanoX = "nanoX"),
    (r.stax = "stax"),
    (r.europa = "europa"),
    (r.apex = "apex"));
  let l = {
    [t.blue]: {
      id: t.blue,
      productName: "Ledger Blue",
      productIdMM: 0,
      legacyUsbProductId: 0,
      usbOnly: !0,
      memorySize: 491520,
      masks: [0x31000000, 0x31010000],
      getBlockSize: (e) => 4096,
    },
    [t.nanoS]: {
      id: t.nanoS,
      productName: "Ledger Nano S",
      productIdMM: 16,
      legacyUsbProductId: 1,
      usbOnly: !0,
      memorySize: 327680,
      masks: [0x31100000],
      getBlockSize: (e) =>
        a.default.lt(a.default.coerce(e) ?? "", "2.0.0") ? 4096 : 2048,
    },
    [t.nanoX]: {
      id: t.nanoX,
      productName: "Ledger Nano X",
      productIdMM: 64,
      legacyUsbProductId: 4,
      usbOnly: !1,
      memorySize: 2097152,
      masks: [0x33000000],
      getBlockSize: (e) => 4096,
      bluetoothSpec: [
        {
          serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
          notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
          writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
          writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572",
        },
      ],
    },
    [t.nanoSP]: {
      id: t.nanoSP,
      productName: "Ledger Nano S Plus",
      productIdMM: 80,
      legacyUsbProductId: 5,
      usbOnly: !0,
      memorySize: 1569792,
      masks: [0x33100000],
      getBlockSize: (e) => 32,
    },
    [t.apex]: {
      id: t.apex,
      productName: "Ledger Nano Gen5",
      productIdMM: 128,
      legacyUsbProductId: 8,
      usbOnly: !1,
      memorySize: 1569792,
      masks: [0x33400000],
      getBlockSize: (e) => 32,
      bluetoothSpec: [
        {
          serviceUuid: "13d63400-2c97-8004-0000-4c6564676572",
          notifyUuid: "13d63400-2c97-8004-0001-4c6564676572",
          writeUuid: "13d63400-2c97-8004-0002-4c6564676572",
          writeCmdUuid: "13d63400-2c97-8004-0003-4c6564676572",
        },
      ],
    },
    [t.stax]: {
      id: t.stax,
      productName: "Ledger Stax",
      productIdMM: 96,
      legacyUsbProductId: 6,
      usbOnly: !1,
      memorySize: 1569792,
      masks: [0x33200000],
      getBlockSize: (e) => 32,
      bluetoothSpec: [
        {
          serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
          notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
          writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
          writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572",
        },
      ],
    },
    [t.europa]: {
      id: t.europa,
      productName: "Ledger Flex",
      productIdMM: 112,
      legacyUsbProductId: 7,
      usbOnly: !1,
      memorySize: 1569792,
      masks: [0x33300000],
      getBlockSize: (e) => 32,
      bluetoothSpec: [
        {
          serviceUuid: "13d63400-2c97-3004-0000-4c6564676572",
          notifyUuid: "13d63400-2c97-3004-0001-4c6564676572",
          writeUuid: "13d63400-2c97-3004-0002-4c6564676572",
          writeCmdUuid: "13d63400-2c97-3004-0003-4c6564676572",
        },
      ],
    },
  };
  (t.blue, t.nanoS, t.nanoSP, t.nanoX, t.stax, t.europa);
  let p = Object.values(l),
    c = (e) => {
      let r = p.find((r) => r.legacyUsbProductId === e);
      if (r) return r;
      let t = e >> 8;
      return p.find((e) => e.productIdMM === t);
    },
    h = [],
    u = {};
  for (let e in l) {
    let r = l[e],
      { bluetoothSpec: t } = r;
    if (t)
      for (let e = 0; e < t.length; e++) {
        let s = t[e];
        (h.push(s.serviceUuid),
          (u[s.serviceUuid] = u[s.serviceUuid.replace(/-/g, "")] =
            { deviceModel: r, ...s }));
      }
  }
  var E = e.i(547975);
  let d = [{ vendorId: 11415 }],
    f = () => Promise.resolve(!!(window.navigator && window.navigator.hid)),
    m = () => {
      let { hid: e } = navigator;
      if (!e)
        throw new n.k("navigator.hid is not supported", "HIDNotSupported");
      return e;
    };
  async function I() {
    let e = await m().requestDevice({ filters: d });
    return Array.isArray(e) ? e : [e];
  }
  async function $() {
    return (await m().getDevices()).filter((e) => 11415 === e.vendorId);
  }
  async function R() {
    let e = await $();
    return e.length > 0 ? e[0] : (await I())[0];
  }
  class v extends i.f {
    device;
    deviceModel;
    channel = Math.floor(65535 * Math.random());
    packetSize = 64;
    constructor(e) {
      (super(),
        (this.device = e),
        (this.deviceModel =
          "number" == typeof e.productId ? c(e.productId) : void 0),
        e.addEventListener("inputreport", this.onInputReport));
    }
    inputs = [];
    inputCallback;
    read = () =>
      this.inputs.length
        ? Promise.resolve(this.inputs.shift())
        : new Promise((e) => {
            this.inputCallback = e;
          });
    onInputReport = (e) => {
      let r = s.Buffer.from(e.data.buffer);
      this.inputCallback
        ? (this.inputCallback(r), (this.inputCallback = null))
        : this.inputs.push(r);
    };
    static isSupported = f;
    static list = $;
    static listen = (e) => {
      let r = !1;
      return (
        R().then(
          (t) => {
            if (t) {
              if (!r) {
                let r =
                  "number" == typeof t.productId ? c(t.productId) : void 0;
                (e.next({ type: "add", descriptor: t, deviceModel: r }),
                  e.complete());
              }
            } else e.error(new n.N("Access denied to use Ledger device"));
          },
          (r) => {
            e.error(new n.N(r.message));
          },
        ),
        {
          unsubscribe: function () {
            r = !0;
          },
        }
      );
    };
    static async request() {
      let [e] = await I();
      return v.open(e);
    }
    static async openConnected() {
      let e = await $();
      return 0 === e.length ? null : v.open(e[0]);
    }
    static async open(e) {
      await e.open();
      let r = new v(e),
        t = (s) => {
          e === s.device &&
            (m().removeEventListener("disconnect", t),
            r._emitDisconnect(new n.w()));
        };
      return (m().addEventListener("disconnect", t), r);
    }
    _disconnectEmitted = !1;
    _emitDisconnect = (e) => {
      this._disconnectEmitted ||
        ((this._disconnectEmitted = !0), this.emit("disconnect", e));
    };
    async close() {
      (await this.exchangeBusyPromise,
        this.device.removeEventListener("inputreport", this.onInputReport),
        await this.device.close());
    }
    exchange = async (e) =>
      await this.exchangeAtomicImpl(async () => {
        let r,
          t,
          { channel: i, packetSize: a } = this;
        (0, E.d)("apdu", "=> " + e.toString("hex"));
        let l = {
            makeBlocks(e) {
              var r;
              let t,
                n = s.Buffer.concat([
                  ((r = e.length),
                  (t = s.Buffer.alloc(2)).writeUInt16BE(r, 0),
                  t),
                  e,
                ]),
                o = a - 5,
                l = Math.ceil(n.length / o);
              n = s.Buffer.concat([
                n,
                s.Buffer.alloc(l * o - n.length + 1).fill(0),
              ]);
              let p = [];
              for (let e = 0; e < l; e++) {
                let r = s.Buffer.alloc(5);
                (r.writeUInt16BE(i, 0),
                  r.writeUInt8(5, 2),
                  r.writeUInt16BE(e, 3));
                let t = n.slice(e * o, (e + 1) * o);
                p.push(s.Buffer.concat([r, t]));
              }
              return p;
            },
            reduceResponse(e, r) {
              let { data: t, dataLength: a, sequence: l } = e || o;
              if (r.readUInt16BE(0) !== i)
                throw new n.k("Invalid channel", "InvalidChannel");
              if (5 !== r.readUInt8(2))
                throw new n.k("Invalid tag", "InvalidTag");
              if (r.readUInt16BE(3) !== l)
                throw new n.k("Invalid sequence", "InvalidSequence");
              (e || (a = r.readUInt16BE(5)), l++);
              let p = r.slice(e ? 5 : 7);
              return (
                (t = s.Buffer.concat([t, p])).length > a && (t = t.slice(0, a)),
                { data: t, dataLength: a, sequence: l }
              );
            },
            getReducedResult(e) {
              if (e && e.dataLength === e.data.length) return e.data;
            },
          },
          p = l.makeBlocks(e);
        for (let e = 0; e < p.length; e++)
          await this.device.sendReport(0, p[e]);
        for (; !(r = l.getReducedResult(t)); )
          try {
            let e = await this.read();
            t = l.reduceResponse(t, e);
          } catch (e) {
            if (e instanceof n.k && "InvalidChannel" === e.id) continue;
            throw e;
          }
        return ((0, E.d)("apdu", "<= " + r.toString("hex")), r);
      }).catch((e) => {
        if (e && e.message && e.message.includes("write"))
          throw (this._emitDisconnect(e), new n.X(e.message));
        throw e;
      });
    setScrambleKey() {}
  }
  e.s(["default", 0, v], 774583);
};
