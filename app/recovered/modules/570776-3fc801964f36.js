// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t, i;
  var s,
    r,
    n,
    a,
    o,
    c,
    l,
    h,
    p,
    d,
    u,
    g,
    f,
    y,
    m,
    w,
    v,
    b,
    I,
    E,
    N,
    _,
    C,
    P,
    A,
    O,
    S = e.i(149502),
    T = e.i(606402),
    x = e.i(735747),
    k = e.i(142309),
    D = e.i(712771);
  (((n = A || (A = {})).Mainnet = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"),
    (n.Devnet = "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"),
    (n.Deprecated_Mainnet = "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"),
    (n.Deprecated_Devnet = "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"),
    ((a = O || (O = {})).signTransaction = "solana_signTransaction"),
    (a.signMessage = "solana_signMessage"),
    (a.signAndSendTransaction = "solana_signAndSendTransaction"),
    (a.signAndSendAllTransactions = "solana_signAndSendAllTransactions"),
    (a.signAllTransactions = "solana_signAllTransactions"));
  let R = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    M = "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    j = "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
    U = "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
  var q = e.i(753887),
    L = e.i(178610),
    $ = e.i(971370),
    z = e.i(679877),
    K = e.i(710600),
    V = e.i(441631),
    H = e.i(687542),
    B = e.i(770749),
    F = e.i(862570),
    W = Object.defineProperty,
    Y = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? W(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class G extends F.f {
    constructor(e) {
      (super(),
        (this.opts = e),
        Y(this, "protocol", "wc"),
        Y(this, "version", 2));
    }
  }
  var Q = Object.defineProperty;
  class J extends F.f {
    constructor(e, t) {
      var i, s;
      let r;
      (super(),
        (this.core = e),
        (this.logger = t),
        (i = "records"),
        (s = new Map()),
        (r = "symbol" != typeof i ? i + "" : i) in this
          ? Q(this, r, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: s,
            })
          : (this[r] = s));
    }
  }
  class Z {
    constructor(e, t) {
      ((this.logger = e), (this.core = t));
    }
  }
  class X extends F.f {
    constructor(e, t) {
      (super(), (this.relayer = e), (this.logger = t));
    }
  }
  class ee extends F.f {
    constructor(e) {
      super();
    }
  }
  class et {
    constructor(e, t, i, s) {
      ((this.core = e), (this.logger = t), (this.name = i));
    }
  }
  class ei extends F.f {
    constructor(e, t) {
      (super(), (this.relayer = e), (this.logger = t));
    }
  }
  class es extends F.f {
    constructor(e, t) {
      (super(), (this.core = e), (this.logger = t));
    }
  }
  class er {
    constructor(e, t, i) {
      ((this.core = e), (this.logger = t), (this.store = i));
    }
  }
  class en {
    constructor(e, t) {
      ((this.projectId = e), (this.logger = t));
    }
  }
  class ea {
    constructor(e, t, i) {
      ((this.core = e), (this.logger = t), (this.telemetryEnabled = i));
    }
  }
  var eo = Object.defineProperty,
    ec = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? eo(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  z.default;
  class el {
    constructor(e) {
      ((this.opts = e), ec(this, "protocol", "wc"), ec(this, "version", 2));
    }
  }
  z.EventEmitter;
  class eh {
    constructor(e) {
      this.client = e;
    }
  }
  var ep = e.i(550483),
    ed = e.i(243274),
    eu = e.i(232232),
    eg = e.i(33898),
    ef = e.i(12791),
    ey = e.i(571232),
    em = e.i(971275);
  e.i(547762);
  var ew = e.i(266188),
    ev = e.i(835230),
    eb = e.i(913095),
    eI = e.i(895886),
    eE = e.i(208910);
  function eN(e) {
    let [t, i] = e.split(":");
    return { namespace: t, reference: i };
  }
  function e_(e, t) {
    return e.includes(":") ? [e] : t.chains || [];
  }
  let eC = "react-native",
    eP = "node",
    eA = "browser";
  function eO() {
    return (
      "u" > typeof S.default &&
      "u" > typeof S.default.versions &&
      "u" > typeof S.default.versions.node
    );
  }
  function eS() {
    return (
      !(0, ef.getDocument)() &&
      !!(0, ef.getNavigator)() &&
      "ReactNative" === navigator.product
    );
  }
  function eT() {
    return !eO() && !!(0, ef.getNavigator)() && !!(0, ef.getDocument)();
  }
  function ex() {
    return eS() ? eC : eO() ? eP : eT() ? eA : "unknown";
  }
  function ek() {
    var t;
    try {
      return eS() && "u" > typeof (null == e.g ? void 0 : e.g.Application)
        ? null == (t = e.g.Application)
          ? void 0
          : t.applicationId
        : void 0;
    } catch {
      return;
    }
  }
  function eD() {
    return (
      (0, ey.getWindowMetadata)() || {
        name: "",
        description: "",
        url: "",
        icons: [""],
      }
    );
  }
  function eR(t, i, s) {
    var r;
    let n,
      a = (function () {
        if (ex() === eC && "u" > typeof (null == e.g ? void 0 : e.g.Platform)) {
          let { OS: t, Version: i } = e.g.Platform;
          return [t, i].join("-");
        }
        let t = (0, eg.f)();
        if (null === t) return "unknown";
        let i = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
        return "browser" === t.type
          ? [i, t.name, t.version].join("-")
          : [i, t.version].join("-");
      })(),
      o =
        (n = ex()) === eA
          ? [
              n,
              (null == (r = (0, ef.getLocation)()) ? void 0 : r.host) ||
                "unknown",
            ].join(":")
          : n;
    return [[t, i].join("-"), ["js", s].join("-"), a, o].join("/");
  }
  function eM(e, t) {
    return e.filter((e) => t.includes(e)).length === e.length;
  }
  function ej(e) {
    return Object.fromEntries(e.entries());
  }
  function eU(e) {
    return new Map(Object.entries(e));
  }
  function eq(e = ep.FIVE_MINUTES, t) {
    let i,
      s,
      r,
      n,
      a = (0, ep.toMiliseconds)(e || ep.FIVE_MINUTES);
    return {
      resolve: (e) => {
        r && i && (clearTimeout(r), i(e), (n = Promise.resolve(e)));
      },
      reject: (e) => {
        r && s && (clearTimeout(r), s(e));
      },
      done: () =>
        new Promise((e, o) => {
          if (n) return e(n);
          ((r = setTimeout(() => {
            let e = Error(t);
            ((n = Promise.reject(e)), o(e));
          }, a)),
            (i = e),
            (s = o));
        }),
    };
  }
  function eL(e, t, i) {
    return new Promise(async (s, r) => {
      let n = setTimeout(() => r(Error(i)), t);
      try {
        let t = await e;
        s(t);
      } catch (e) {
        r(e);
      }
      clearTimeout(n);
    });
  }
  function e$(e, t) {
    if ("string" == typeof t && t.startsWith(`${e}:`)) return t;
    if ("topic" === e.toLowerCase()) {
      if ("string" != typeof t)
        throw Error('Value must be "string" for expirer target type: topic');
      return `topic:${t}`;
    }
    if ("id" === e.toLowerCase()) {
      if ("number" != typeof t)
        throw Error('Value must be "number" for expirer target type: id');
      return `id:${t}`;
    }
    throw Error(`Unknown expirer target type: ${e}`);
  }
  function ez(e) {
    let [t, i] = e.split(":"),
      s = { id: void 0, topic: void 0 };
    if ("topic" === t && "string" == typeof i) s.topic = i;
    else if ("id" === t && Number.isInteger(Number(i))) s.id = Number(i);
    else
      throw Error(
        `Invalid target, expected id:number or topic:string, got ${t}:${i}`,
      );
    return s;
  }
  function eK(e, t) {
    return (0, ep.fromMiliseconds)(
      (t || Date.now()) + (0, ep.toMiliseconds)(e),
    );
  }
  function eV(e) {
    return Date.now() >= (0, ep.toMiliseconds)(e);
  }
  function eH(e, t) {
    return `${e}${t ? `:${t}` : ""}`;
  }
  function eB(e = [], t = []) {
    return [...new Set([...e, ...t])];
  }
  async function eF({ id: t, topic: i, wcDeepLink: s }) {
    var r, n;
    try {
      if (!s) return;
      let a = "string" == typeof s ? JSON.parse(s) : s,
        o = a?.href;
      if ("string" != typeof o) return;
      let c = (function (e, t, i) {
          let s = `requestId=${t}&sessionTopic=${i}`;
          e.endsWith("/") && (e = e.slice(0, -1));
          let r = `${e}`;
          if (e.startsWith("https://t.me")) {
            let t = e.includes("?") ? "&startapp=" : "?startapp=";
            r = `${r}${t}${(function (e, t = !1) {
              let i = q.Buffer.from(e).toString("base64");
              return t ? i.replace(/[=]/g, "") : i;
            })(s, !0)}`;
          } else r = `${r}/wc?${s}`;
          return r;
        })(o, t, i),
        l = ex();
      if (l === eA) {
        let e;
        if (!(null != (r = (0, ef.getDocument)()) && r.hasFocus()))
          return void console.warn(
            "Document does not have focus, skipping deeplink.",
          );
        ((n = c),
          (e = "_self"),
          !(function () {
            try {
              return window.self !== window.top;
            } catch {
              return !1;
            }
          })()
            ? (("u" > typeof window &&
                (window.TelegramWebviewProxy ||
                  window.Telegram ||
                  window.TelegramWebviewProxyProto)) ||
                n.startsWith("https://") ||
                n.startsWith("http://")) &&
              (e = "_blank")
            : (e = "_top"),
          window.open(n, e, "noreferrer noopener"));
      } else
        l === eC &&
          "u" > typeof (null == e.g ? void 0 : e.g.Linking) &&
          (await e.g.Linking.openURL(c));
    } catch (e) {
      console.error(e);
    }
  }
  async function eW(e, t) {
    let i = "";
    try {
      if (eT() && (i = localStorage.getItem(t))) return i;
      i = await e.getItem(t);
    } catch (e) {
      console.error(e);
    }
    return i;
  }
  function eY(e, t) {
    if (!e.includes(t)) return null;
    let i = e.split(/([&,?,=])/),
      s = i.indexOf(t);
    return i[s + 2];
  }
  function eG() {
    return "u" > typeof crypto && null != crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
          let t = (16 * Math.random()) | 0;
          return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
  }
  function eQ() {
    return "u" > typeof S.default && "true" === S.default.env.IS_VITEST;
  }
  function eJ(e) {
    return q.Buffer.from(e, "base64").toString("utf-8");
  }
  function eZ(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function eX(e, ...t) {
    if (
      !(
        e instanceof Uint8Array ||
        (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
      )
    )
      throw Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  function e0(e) {
    if ("function" != typeof e || "function" != typeof e.create)
      throw Error("Hash should be wrapped by utils.wrapConstructor");
    (eZ(e.outputLen), eZ(e.blockLen));
  }
  function e1(e, t = !0) {
    if (e.destroyed) throw Error("Hash instance has been destroyed");
    if (t && e.finished) throw Error("Hash#digest() has already been called");
  }
  function e2(e, t) {
    eX(e);
    let i = t.outputLen;
    if (e.length < i)
      throw Error("digestInto() expects output buffer of length at least " + i);
  }
  let e5 = BigInt(0xffffffff),
    e4 = BigInt(32),
    e8 =
      "object" == typeof globalThis && "crypto" in globalThis
        ? globalThis.crypto
        : void 0;
  function e3(e) {
    return new DataView(e.buffer, e.byteOffset, e.byteLength);
  }
  function e6(e, t) {
    return (e << (32 - t)) | (e >>> t);
  }
  let e9 = 68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0];
  function e7(e) {
    for (let i = 0; i < e.length; i++) {
      var t;
      e[i] =
        (((t = e[i]) << 24) & 0xff000000) |
        ((t << 8) & 0xff0000) |
        ((t >>> 8) & 65280) |
        ((t >>> 24) & 255);
    }
  }
  function te(e) {
    return (
      "string" == typeof e &&
        (e = (function (e) {
          if ("string" != typeof e)
            throw Error("utf8ToBytes expected string, got " + typeof e);
          return new Uint8Array(new TextEncoder().encode(e));
        })(e)),
      eX(e),
      e
    );
  }
  class tt {
    clone() {
      return this._cloneInto();
    }
  }
  function ti(e) {
    let t = (t) => e().update(te(t)).digest(),
      i = e();
    return (
      (t.outputLen = i.outputLen),
      (t.blockLen = i.blockLen),
      (t.create = () => e()),
      t
    );
  }
  function ts(e = 32) {
    if (e8 && "function" == typeof e8.getRandomValues)
      return e8.getRandomValues(new Uint8Array(e));
    if (e8 && "function" == typeof e8.randomBytes) return e8.randomBytes(e);
    throw Error("crypto.getRandomValues must be defined");
  }
  let tr = [],
    tn = [],
    ta = [],
    to = BigInt(0),
    tc = BigInt(1),
    tl = BigInt(2),
    th = BigInt(7),
    tp = BigInt(256),
    td = BigInt(113);
  for (let e = 0, t = tc, i = 1, s = 0; e < 24; e++) {
    (([i, s] = [s, (2 * i + 3 * s) % 5]),
      tr.push(2 * (5 * s + i)),
      tn.push((((e + 1) * (e + 2)) / 2) % 64));
    let r = to;
    for (let e = 0; e < 7; e++)
      (t = ((t << tc) ^ ((t >> th) * td)) % tp) & tl &&
        (r ^= tc << ((tc << BigInt(e)) - tc));
    ta.push(r);
  }
  let [tu, tg] = (function (e, t = !1) {
      let i = new Uint32Array(e.length),
        s = new Uint32Array(e.length);
      for (let r = 0; r < e.length; r++) {
        let { h: n, l: a } = (function (e, t = !1) {
          return t
            ? { h: Number(e & e5), l: Number((e >> e4) & e5) }
            : { h: 0 | Number((e >> e4) & e5), l: 0 | Number(e & e5) };
        })(e[r], t);
        [i[r], s[r]] = [n, a];
      }
      return [i, s];
    })(ta, !0),
    tf = (e, t, i) =>
      i > 32 ? (t << (i - 32)) | (e >>> (64 - i)) : (e << i) | (t >>> (32 - i)),
    ty = (e, t, i) =>
      i > 32 ? (e << (i - 32)) | (t >>> (64 - i)) : (t << i) | (e >>> (32 - i));
  class tm extends tt {
    constructor(e, t, i, s = !1, r = 24) {
      var n;
      if (
        (super(),
        (this.blockLen = e),
        (this.suffix = t),
        (this.outputLen = i),
        (this.enableXOF = s),
        (this.rounds = r),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        eZ(i),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw Error("Sha3 supports only keccak-f1600 function");
      ((this.state = new Uint8Array(200)),
        (this.state32 = new Uint32Array(
          (n = this.state).buffer,
          n.byteOffset,
          Math.floor(n.byteLength / 4),
        )));
    }
    keccak() {
      (e9 || e7(this.state32),
        (function (e, t = 24) {
          let i = new Uint32Array(10);
          for (let s = 24 - t; s < 24; s++) {
            for (let t = 0; t < 10; t++)
              i[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              let s = (t + 8) % 10,
                r = (t + 2) % 10,
                n = i[r],
                a = i[r + 1],
                o = tf(n, a, 1) ^ i[s],
                c = ty(n, a, 1) ^ i[s + 1];
              for (let i = 0; i < 50; i += 10)
                ((e[t + i] ^= o), (e[t + i + 1] ^= c));
            }
            let t = e[2],
              r = e[3];
            for (let i = 0; i < 24; i++) {
              let s = tn[i],
                n = tf(t, r, s),
                a = ty(t, r, s),
                o = tr[i];
              ((t = e[o]), (r = e[o + 1]), (e[o] = n), (e[o + 1] = a));
            }
            for (let t = 0; t < 50; t += 10) {
              for (let s = 0; s < 10; s++) i[s] = e[t + s];
              for (let s = 0; s < 10; s++)
                e[t + s] ^= ~i[(s + 2) % 10] & i[(s + 4) % 10];
            }
            ((e[0] ^= tu[s]), (e[1] ^= tg[s]));
          }
          i.fill(0);
        })(this.state32, this.rounds),
        e9 || e7(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(e) {
      e1(this);
      let { blockLen: t, state: i } = this,
        s = (e = te(e)).length;
      for (let r = 0; r < s; ) {
        let n = Math.min(t - this.pos, s - r);
        for (let t = 0; t < n; t++) i[this.pos++] ^= e[r++];
        this.pos === t && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: e, suffix: t, pos: i, blockLen: s } = this;
      ((e[i] ^= t),
        (128 & t) != 0 && i === s - 1 && this.keccak(),
        (e[s - 1] ^= 128),
        this.keccak());
    }
    writeInto(e) {
      (e1(this, !1), eX(e), this.finish());
      let t = this.state,
        { blockLen: i } = this;
      for (let s = 0, r = e.length; s < r; ) {
        this.posOut >= i && this.keccak();
        let n = Math.min(i - this.posOut, r - s);
        (e.set(t.subarray(this.posOut, this.posOut + n), s),
          (this.posOut += n),
          (s += n));
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return (eZ(e), this.xofInto(new Uint8Array(e)));
    }
    digestInto(e) {
      if ((e2(e, this), this.finished))
        throw Error("digest() was already called");
      return (this.writeInto(e), this.destroy(), e);
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      ((this.destroyed = !0), this.state.fill(0));
    }
    _cloneInto(e) {
      let {
        blockLen: t,
        suffix: i,
        outputLen: s,
        rounds: r,
        enableXOF: n,
      } = this;
      return (
        e || (e = new tm(t, i, s, n, r)),
        e.state32.set(this.state32),
        (e.pos = this.pos),
        (e.posOut = this.posOut),
        (e.finished = this.finished),
        (e.rounds = r),
        (e.suffix = i),
        (e.outputLen = s),
        (e.enableXOF = n),
        (e.destroyed = this.destroyed),
        e
      );
    }
  }
  let tw = ti(() => new tm(136, 1, 32));
  function tv(e) {
    let t = `\x19Ethereum Signed Message:
${e.length}`,
      i = new TextEncoder().encode(t + e);
    return "0x" + q.Buffer.from(tw(i)).toString("hex");
  }
  async function tb(e, t, i, s, r, n) {
    switch (i.t) {
      case "eip191":
        return await tI(e, t, i.s);
      case "eip1271":
        return await tE(e, t, i.s, s, r, n);
      default:
        throw Error(
          `verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${i.t}`,
        );
    }
  }
  async function tI(e, t, i) {
    return (
      (await (0, em.f)({ hash: tv(t), signature: i })).toLowerCase() ===
      e.toLowerCase()
    );
  }
  async function tE(e, t, i, s, r, n) {
    let a = eN(s);
    if (!a.namespace || !a.reference)
      throw Error(
        `isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${s}`,
      );
    try {
      let a = "0x1626ba7e",
        o = i.substring(2),
        c = tv(t).substring(2),
        l =
          a +
          c +
          "00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041" +
          o,
        h = await fetch(
          `${n || "https://rpc.walletconnect.org/v1"}/?chainId=${s}&projectId=${r}`,
          {
            method: "POST",
            body: JSON.stringify({
              id: Date.now() + Math.floor(1e3 * Math.random()),
              jsonrpc: "2.0",
              method: "eth_call",
              params: [{ to: e, data: l }, "latest"],
            }),
          },
        ),
        { result: p } = await h.json();
      return !!p && p.slice(0, a.length).toLowerCase() === a.toLowerCase();
    } catch (e) {
      return (console.error("isValidEip1271Signature: ", e), !1);
    }
  }
  var tN = Object.defineProperty,
    t_ = Object.defineProperties,
    tC = Object.getOwnPropertyDescriptors,
    tP = Object.getOwnPropertySymbols,
    tA = Object.prototype.hasOwnProperty,
    tO = Object.prototype.propertyIsEnumerable,
    tS = (e, t, i) =>
      t in e
        ? tN(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i);
  let tT = (e) => e?.split(":"),
    tx = (e) => {
      let t = e && tT(e);
      if (t) return t[2] + ":" + t[3];
    },
    tk = (e) => {
      let t = e && tT(e);
      if (t) return t.pop();
    };
  async function tD(e) {
    let { cacao: t, projectId: i } = e,
      { s: s, p: r } = t,
      n = tR(r, r.iss),
      a = tk(r.iss);
    return await tb(a, n, s, tx(r.iss), i);
  }
  let tR = (e, t) => {
    let i = `${e.domain} wants you to sign in with your Ethereum account:`,
      s = tk(t);
    if (!e.aud && !e.uri)
      throw Error("Either `aud` or `uri` is required to construct the message");
    let r = e.statement || void 0,
      n = `URI: ${e.aud || e.uri}`,
      a = `Version: ${e.version}`,
      o = `Chain ID: ${((e) => {
        let t = e && tT(e);
        if (t) return e.includes("did:pkh:") ? t[3] : t[1];
      })(t)}`,
      c = `Nonce: ${e.nonce}`,
      l = `Issued At: ${e.iat}`,
      h = e.exp ? `Expiration Time: ${e.exp}` : void 0,
      p = e.nbf ? `Not Before: ${e.nbf}` : void 0,
      d = e.requestId ? `Request ID: ${e.requestId}` : void 0,
      u = e.resources
        ? `Resources:${e.resources
            .map(
              (e) => `
- ${e}`,
            )
            .join("")}`
        : void 0,
      g = t$(e.resources);
    return (
      g &&
        (r = (function (e = "", t) {
          tM(t);
          let i =
            "I further authorize the stated URI to perform the following actions on my behalf: ";
          if (e.includes(i)) return e;
          let s = [],
            r = 0;
          Object.keys(t.att).forEach((e) => {
            let i = Object.keys(t.att[e]).map((e) => ({
              ability: e.split("/")[0],
              action: e.split("/")[1],
            }));
            i.sort((e, t) => e.action.localeCompare(t.action));
            let n = {};
            i.forEach((e) => {
              (n[e.ability] || (n[e.ability] = []),
                n[e.ability].push(e.action));
            });
            let a = Object.keys(n).map(
              (t) => (r++, `(${r}) '${t}': '${n[t].join("', '")}' for '${e}'.`),
            );
            s.push(a.join(", ").replace(".,", "."));
          });
          let n = s.join(" "),
            a = `${i}${n}`;
          return `${e ? e + " " : ""}${a}`;
        })(r, tU(g))),
      [i, s, "", r, "", n, a, o, c, l, h, p, d, u].filter((e) => null != e)
        .join(`
`)
    );
  };
  function tM(e) {
    if (!e) throw Error("No recap provided, value is undefined");
    if (!e.att) throw Error("No `att` property found");
    let t = Object.keys(e.att);
    if (!(null != t && t.length))
      throw Error("No resources found in `att` property");
    t.forEach((t) => {
      let i = e.att[t];
      if (Array.isArray(i) || "object" != typeof i)
        throw Error(`Resource must be an object: ${t}`);
      if (!Object.keys(i).length) throw Error(`Resource object is empty: ${t}`);
      Object.keys(i).forEach((e) => {
        let t = i[e];
        if (!Array.isArray(t))
          throw Error(
            `Ability limits ${e} must be an array of objects, found: ${t}`,
          );
        if (!t.length)
          throw Error(
            `Value of ${e} is empty array, must be an array with objects`,
          );
        t.forEach((t) => {
          if ("object" != typeof t)
            throw Error(
              `Ability limits (${e}) must be an array of objects, found: ${t}`,
            );
        });
      });
    });
  }
  function tj(e) {
    return (
      tM(e),
      `urn:recap:${q.Buffer.from(JSON.stringify(e)).toString("base64").replace(/=/g, "")}`
    );
  }
  function tU(e) {
    var t;
    let i =
      ((t = e.replace("urn:recap:", "")),
      JSON.parse(q.Buffer.from(t, "base64").toString("utf-8")));
    return (tM(i), i);
  }
  function tq(e) {
    var t;
    let i = tU(e);
    tM(i);
    let s = null == (t = i.att) ? void 0 : t.eip155;
    return s ? Object.keys(s).map((e) => e.split("/")[1]) : [];
  }
  function tL(e) {
    let t = tU(e);
    tM(t);
    let i = [];
    return (
      Object.values(t.att).forEach((e) => {
        Object.values(e).forEach((e) => {
          var t;
          null != (t = e?.[0]) && t.chains && i.push(e[0].chains);
        });
      }),
      [...new Set(i.flat())]
    );
  }
  function t$(e) {
    if (!e) return;
    let t = e?.[e.length - 1];
    return t && t.includes("urn:recap:") ? t : void 0;
  }
  function tz(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function tK(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function tV(e, ...t) {
    if (!tK(e)) throw Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  function tH(e, t = !0) {
    if (e.destroyed) throw Error("Hash instance has been destroyed");
    if (t && e.finished) throw Error("Hash#digest() has already been called");
  }
  function tB(e) {
    if ("boolean" != typeof e) throw Error(`boolean expected, not ${e}`);
  }
  let tF = (e) =>
    new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
  if (68 !== new Uint8Array(new Uint32Array([0x11223344]).buffer)[0])
    throw Error("Non little-endian hardware is not supported");
  function tW(e) {
    if ("string" == typeof e)
      e = (function (e) {
        if ("string" != typeof e) throw Error("string expected");
        return new Uint8Array(new TextEncoder().encode(e));
      })(e);
    else if (tK(e)) e = tQ(e);
    else throw Error("Uint8Array expected, got " + typeof e);
    return e;
  }
  function tY(e, t, i = !0) {
    if (void 0 === t) return new Uint8Array(e);
    if (t.length !== e)
      throw Error(
        "invalid output length, expected " + e + ", got: " + t.length,
      );
    if (i && t.byteOffset % 4 != 0)
      throw Error("invalid output, must be aligned");
    return t;
  }
  function tG(e, t, i, s) {
    if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, s);
    let r = BigInt(32),
      n = BigInt(0xffffffff),
      a = Number((i >> r) & n),
      o = Number(i & n),
      c = 4 * !!s,
      l = 4 * !s;
    (e.setUint32(t + c, a, s), e.setUint32(t + l, o, s));
  }
  function tQ(e) {
    return Uint8Array.from(e);
  }
  function tJ(...e) {
    for (let t = 0; t < e.length; t++) e[t].fill(0);
  }
  let tZ = (e) => Uint8Array.from(e.split("").map((e) => e.charCodeAt(0))),
    tX = tZ("expand 16-byte k"),
    t0 = tZ("expand 32-byte k"),
    t1 = tF(tX),
    t2 = tF(t0);
  function t5(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  function t4(e) {
    return e.byteOffset % 4 == 0;
  }
  let t8 = new Uint32Array(),
    t3 = (e, t) => (255 & e[t++]) | ((255 & e[t++]) << 8);
  class t6 {
    constructor(e) {
      ((this.blockLen = 16),
        (this.outputLen = 16),
        (this.buffer = new Uint8Array(16)),
        (this.r = new Uint16Array(10)),
        (this.h = new Uint16Array(10)),
        (this.pad = new Uint16Array(8)),
        (this.pos = 0),
        (this.finished = !1),
        tV((e = tW(e)), 32));
      let t = t3(e, 0),
        i = t3(e, 2),
        s = t3(e, 4),
        r = t3(e, 6),
        n = t3(e, 8),
        a = t3(e, 10),
        o = t3(e, 12),
        c = t3(e, 14);
      ((this.r[0] = 8191 & t),
        (this.r[1] = ((t >>> 13) | (i << 3)) & 8191),
        (this.r[2] = ((i >>> 10) | (s << 6)) & 7939),
        (this.r[3] = ((s >>> 7) | (r << 9)) & 8191),
        (this.r[4] = ((r >>> 4) | (n << 12)) & 255),
        (this.r[5] = (n >>> 1) & 8190),
        (this.r[6] = ((n >>> 14) | (a << 2)) & 8191),
        (this.r[7] = ((a >>> 11) | (o << 5)) & 8065),
        (this.r[8] = ((o >>> 8) | (c << 8)) & 8191),
        (this.r[9] = (c >>> 5) & 127));
      for (let t = 0; t < 8; t++) this.pad[t] = t3(e, 16 + 2 * t);
    }
    process(e, t, i = !1) {
      let { h: s, r: r } = this,
        n = r[0],
        a = r[1],
        o = r[2],
        c = r[3],
        l = r[4],
        h = r[5],
        p = r[6],
        d = r[7],
        u = r[8],
        g = r[9],
        f = t3(e, t + 0),
        y = t3(e, t + 2),
        m = t3(e, t + 4),
        w = t3(e, t + 6),
        v = t3(e, t + 8),
        b = t3(e, t + 10),
        I = t3(e, t + 12),
        E = t3(e, t + 14),
        N = s[0] + (8191 & f),
        _ = s[1] + (((f >>> 13) | (y << 3)) & 8191),
        C = s[2] + (((y >>> 10) | (m << 6)) & 8191),
        P = s[3] + (((m >>> 7) | (w << 9)) & 8191),
        A = s[4] + (((w >>> 4) | (v << 12)) & 8191),
        O = s[5] + ((v >>> 1) & 8191),
        S = s[6] + (((v >>> 14) | (b << 2)) & 8191),
        T = s[7] + (((b >>> 11) | (I << 5)) & 8191),
        x = s[8] + (((I >>> 8) | (E << 8)) & 8191),
        k = s[9] + ((E >>> 5) | (2048 * !i)),
        D = 0,
        R = 0 + N * n + 5 * g * _ + 5 * u * C + 5 * d * P + 5 * p * A;
      ((D = R >>> 13),
        (R &= 8191),
        (R += 5 * h * O + 5 * l * S + 5 * c * T + 5 * o * x + 5 * a * k),
        (D += R >>> 13),
        (R &= 8191));
      let M = D + N * a + _ * n + 5 * g * C + 5 * u * P + 5 * d * A;
      ((D = M >>> 13),
        (M &= 8191),
        (M += 5 * p * O + 5 * h * S + 5 * l * T + 5 * c * x + 5 * o * k),
        (D += M >>> 13),
        (M &= 8191));
      let j = D + N * o + _ * a + C * n + 5 * g * P + 5 * u * A;
      ((D = j >>> 13),
        (j &= 8191),
        (j += 5 * d * O + 5 * p * S + 5 * h * T + 5 * l * x + 5 * c * k),
        (D += j >>> 13),
        (j &= 8191));
      let U = D + N * c + _ * o + C * a + P * n + 5 * g * A;
      ((D = U >>> 13),
        (U &= 8191),
        (U += 5 * u * O + 5 * d * S + 5 * p * T + 5 * h * x + 5 * l * k),
        (D += U >>> 13),
        (U &= 8191));
      let q = D + N * l + _ * c + C * o + P * a + A * n;
      ((D = q >>> 13),
        (q &= 8191),
        (q += 5 * g * O + 5 * u * S + 5 * d * T + 5 * p * x + 5 * h * k),
        (D += q >>> 13),
        (q &= 8191));
      let L = D + N * h + _ * l + C * c + P * o + A * a;
      ((D = L >>> 13),
        (L &= 8191),
        (L += O * n + 5 * g * S + 5 * u * T + 5 * d * x + 5 * p * k),
        (D += L >>> 13),
        (L &= 8191));
      let $ = D + N * p + _ * h + C * l + P * c + A * o;
      ((D = $ >>> 13),
        ($ &= 8191),
        ($ += O * a + S * n + 5 * g * T + 5 * u * x + 5 * d * k),
        (D += $ >>> 13),
        ($ &= 8191));
      let z = D + N * d + _ * p + C * h + P * l + A * c;
      ((D = z >>> 13),
        (z &= 8191),
        (z += O * o + S * a + T * n + 5 * g * x + 5 * u * k),
        (D += z >>> 13),
        (z &= 8191));
      let K = D + N * u + _ * d + C * p + P * h + A * l;
      ((D = K >>> 13),
        (K &= 8191),
        (K += O * c + S * o + T * a + x * n + 5 * g * k),
        (D += K >>> 13),
        (K &= 8191));
      let V = D + N * g + _ * u + C * d + P * p + A * h;
      ((D = V >>> 13),
        (V &= 8191),
        (V += O * l + S * c + T * o + x * a + k * n),
        (D += V >>> 13),
        (V &= 8191),
        (R = 8191 & (D = ((D = ((D << 2) + D) | 0) + R) | 0)),
        (D >>>= 13),
        (M += D),
        (s[0] = R),
        (s[1] = M),
        (s[2] = j),
        (s[3] = U),
        (s[4] = q),
        (s[5] = L),
        (s[6] = $),
        (s[7] = z),
        (s[8] = K),
        (s[9] = V));
    }
    finalize() {
      let { h: e, pad: t } = this,
        i = new Uint16Array(10),
        s = e[1] >>> 13;
      e[1] &= 8191;
      for (let t = 2; t < 10; t++)
        ((e[t] += s), (s = e[t] >>> 13), (e[t] &= 8191));
      ((e[0] += 5 * s),
        (s = e[0] >>> 13),
        (e[0] &= 8191),
        (e[1] += s),
        (s = e[1] >>> 13),
        (e[1] &= 8191),
        (e[2] += s),
        (i[0] = e[0] + 5),
        (s = i[0] >>> 13),
        (i[0] &= 8191));
      for (let t = 1; t < 10; t++)
        ((i[t] = e[t] + s), (s = i[t] >>> 13), (i[t] &= 8191));
      i[9] -= 8192;
      let r = (1 ^ s) - 1;
      for (let e = 0; e < 10; e++) i[e] &= r;
      r = ~r;
      for (let t = 0; t < 10; t++) e[t] = (e[t] & r) | i[t];
      ((e[0] = (e[0] | (e[1] << 13)) & 65535),
        (e[1] = ((e[1] >>> 3) | (e[2] << 10)) & 65535),
        (e[2] = ((e[2] >>> 6) | (e[3] << 7)) & 65535),
        (e[3] = ((e[3] >>> 9) | (e[4] << 4)) & 65535),
        (e[4] = ((e[4] >>> 12) | (e[5] << 1) | (e[6] << 14)) & 65535),
        (e[5] = ((e[6] >>> 2) | (e[7] << 11)) & 65535),
        (e[6] = ((e[7] >>> 5) | (e[8] << 8)) & 65535),
        (e[7] = ((e[8] >>> 8) | (e[9] << 5)) & 65535));
      let n = e[0] + t[0];
      e[0] = 65535 & n;
      for (let i = 1; i < 8; i++)
        ((n = (((e[i] + t[i]) | 0) + (n >>> 16)) | 0), (e[i] = 65535 & n));
      tJ(i);
    }
    update(e) {
      tH(this);
      let { buffer: t, blockLen: i } = this,
        s = (e = tW(e)).length;
      for (let r = 0; r < s; ) {
        let n = Math.min(i - this.pos, s - r);
        if (n === i) {
          for (; i <= s - r; r += i) this.process(e, r);
          continue;
        }
        (t.set(e.subarray(r, r + n), this.pos),
          (this.pos += n),
          (r += n),
          this.pos === i && (this.process(t, 0, !1), (this.pos = 0)));
      }
      return this;
    }
    destroy() {
      tJ(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(e) {
      (tH(this),
        (function (e, t) {
          tV(e);
          let i = t.outputLen;
          if (e.length < i)
            throw Error(
              "digestInto() expects output buffer of length at least " + i,
            );
        })(e, this),
        (this.finished = !0));
      let { buffer: t, h: i } = this,
        { pos: s } = this;
      if (s) {
        for (t[s++] = 1; s < 16; s++) t[s] = 0;
        this.process(t, 0, !0);
      }
      this.finalize();
      let r = 0;
      for (let t = 0; t < 8; t++)
        ((e[r++] = i[t] >>> 0), (e[r++] = i[t] >>> 8));
      return e;
    }
    digest() {
      let { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      let i = e.slice(0, t);
      return (this.destroy(), i);
    }
  }
  let t9 =
      ((o = (e) => new t6(e)),
      ((t = (e, t) => o(t).update(tW(e)).digest()).outputLen = (i = o(
        new Uint8Array(32),
      )).outputLen),
      (t.blockLen = i.blockLen),
      (t.create = (e) => o(e)),
      t),
    t7 = (function (e, t) {
      let {
        allowShortKeys: i,
        extendNonceFn: s,
        counterLength: r,
        counterRight: n,
        rounds: a,
      } = (function (e, t) {
        if (null == t || "object" != typeof t)
          throw Error("options must be defined");
        return Object.assign(e, t);
      })(
        { allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 },
        t,
      );
      if ("function" != typeof e) throw Error("core must be a function");
      return (
        tz(r),
        tz(a),
        tB(n),
        tB(i),
        (t, o, c, l, h = 0) => {
          (tV(t), tV(o), tV(c));
          let p = c.length;
          if (
            (void 0 === l && (l = new Uint8Array(p)),
            tV(l),
            tz(h),
            h < 0 || h >= 0xffffffff)
          )
            throw Error("arx: counter overflow");
          if (l.length < p)
            throw Error(
              `arx: output (${l.length}) is shorter than data (${p})`,
            );
          let d = [],
            u = t.length,
            g,
            f;
          if (32 === u) (d.push((g = tQ(t))), (f = t2));
          else if (16 === u && i)
            ((g = new Uint8Array(32)).set(t),
              g.set(t, 16),
              (f = t1),
              d.push(g));
          else throw Error(`arx: invalid 32-byte key, got length=${u}`);
          t4(o) || d.push((o = tQ(o)));
          let y = tF(g);
          if (s) {
            if (24 !== o.length)
              throw Error("arx: extended nonce must be 24 bytes");
            (s(f, y, tF(o.subarray(0, 16)), y), (o = o.subarray(16)));
          }
          let m = 16 - r;
          if (m !== o.length)
            throw Error(`arx: nonce must be ${m} or 16 bytes`);
          if (12 !== m) {
            let e = new Uint8Array(12);
            (e.set(o, n ? 0 : 12 - o.length), (o = e), d.push(o));
          }
          return (
            (function (e, t, i, s, r, n, a, o) {
              let c = r.length,
                l = new Uint8Array(64),
                h = tF(l),
                p = t4(r) && t4(n),
                d = p ? tF(r) : t8,
                u = p ? tF(n) : t8;
              for (let g = 0; g < c; a++) {
                if ((e(t, i, s, h, a, o), a >= 0xffffffff))
                  throw Error("arx: counter overflow");
                let f = Math.min(64, c - g);
                if (p && 64 === f) {
                  let e = g / 4;
                  if (g % 4 != 0) throw Error("arx: invalid block position");
                  for (let t = 0, i; t < 16; t++) u[(i = e + t)] = d[i] ^ h[t];
                  g += 64;
                  continue;
                }
                for (let e = 0, t; e < f; e++) n[(t = g + e)] = r[t] ^ l[e];
                g += f;
              }
            })(e, f, y, tF(o), c, l, h, a),
            tJ(...d),
            l
          );
        }
      );
    })(
      function (e, t, i, s, r, n = 20) {
        let a = e[0],
          o = e[1],
          c = e[2],
          l = e[3],
          h = t[0],
          p = t[1],
          d = t[2],
          u = t[3],
          g = t[4],
          f = t[5],
          y = t[6],
          m = t[7],
          w = i[0],
          v = i[1],
          b = i[2],
          I = a,
          E = o,
          N = c,
          _ = l,
          C = h,
          P = p,
          A = d,
          O = u,
          S = g,
          T = f,
          x = y,
          k = m,
          D = r,
          R = w,
          M = v,
          j = b;
        for (let e = 0; e < n; e += 2)
          ((S = (S + (D = t5(D ^ (I = (I + C) | 0), 16))) | 0),
            (I = (I + (C = t5(C ^ S, 12))) | 0),
            (S = (S + (D = t5(D ^ I, 8))) | 0),
            (C = t5(C ^ S, 7)),
            (T = (T + (R = t5(R ^ (E = (E + P) | 0), 16))) | 0),
            (E = (E + (P = t5(P ^ T, 12))) | 0),
            (T = (T + (R = t5(R ^ E, 8))) | 0),
            (P = t5(P ^ T, 7)),
            (x = (x + (M = t5(M ^ (N = (N + A) | 0), 16))) | 0),
            (N = (N + (A = t5(A ^ x, 12))) | 0),
            (x = (x + (M = t5(M ^ N, 8))) | 0),
            (A = t5(A ^ x, 7)),
            (k = (k + (j = t5(j ^ (_ = (_ + O) | 0), 16))) | 0),
            (_ = (_ + (O = t5(O ^ k, 12))) | 0),
            (k = (k + (j = t5(j ^ _, 8))) | 0),
            (O = t5(O ^ k, 7)),
            (x = (x + (j = t5(j ^ (I = (I + P) | 0), 16))) | 0),
            (I = (I + (P = t5(P ^ x, 12))) | 0),
            (x = (x + (j = t5(j ^ I, 8))) | 0),
            (P = t5(P ^ x, 7)),
            (k = (k + (D = t5(D ^ (E = (E + A) | 0), 16))) | 0),
            (E = (E + (A = t5(A ^ k, 12))) | 0),
            (k = (k + (D = t5(D ^ E, 8))) | 0),
            (A = t5(A ^ k, 7)),
            (S = (S + (R = t5(R ^ (N = (N + O) | 0), 16))) | 0),
            (N = (N + (O = t5(O ^ S, 12))) | 0),
            (S = (S + (R = t5(R ^ N, 8))) | 0),
            (O = t5(O ^ S, 7)),
            (T = (T + (M = t5(M ^ (_ = (_ + C) | 0), 16))) | 0),
            (_ = (_ + (C = t5(C ^ T, 12))) | 0),
            (T = (T + (M = t5(M ^ _, 8))) | 0),
            (C = t5(C ^ T, 7)));
        let U = 0;
        ((s[U++] = (a + I) | 0),
          (s[U++] = (o + E) | 0),
          (s[U++] = (c + N) | 0),
          (s[U++] = (l + _) | 0),
          (s[U++] = (h + C) | 0),
          (s[U++] = (p + P) | 0),
          (s[U++] = (d + A) | 0),
          (s[U++] = (u + O) | 0),
          (s[U++] = (g + S) | 0),
          (s[U++] = (f + T) | 0),
          (s[U++] = (y + x) | 0),
          (s[U++] = (m + k) | 0),
          (s[U++] = (r + D) | 0),
          (s[U++] = (w + R) | 0),
          (s[U++] = (v + M) | 0),
          (s[U++] = (b + j) | 0));
      },
      { counterRight: !1, counterLength: 4, allowShortKeys: !1 },
    ),
    ie = new Uint8Array(16),
    it = (e, t) => {
      e.update(t);
      let i = t.length % 16;
      i && e.update(ie.subarray(i));
    },
    ii = new Uint8Array(32);
  function is(e, t, i, s, r) {
    let n = e(t, i, ii),
      a = t9.create(n);
    (r && it(a, r), it(a, s));
    let o = new Uint8Array(16),
      c = new DataView(o.buffer, o.byteOffset, o.byteLength);
    (tG(c, 0, BigInt(r ? r.length : 0), !0),
      tG(c, 8, BigInt(s.length), !0),
      a.update(o));
    let l = a.digest();
    return (tJ(n, o), l);
  }
  let ir = ((e, t) => {
    function i(s, ...r) {
      if ((tV(s), void 0 !== e.nonceLength)) {
        let t = r[0];
        if (!t) throw Error("nonce / iv required");
        e.varSizeNonce ? tV(t) : tV(t, e.nonceLength);
      }
      let n = e.tagLength;
      n && void 0 !== r[1] && tV(r[1]);
      let a = t(s, ...r),
        o = (e, t) => {
          if (void 0 !== t) {
            if (2 !== e) throw Error("cipher output not supported");
            tV(t);
          }
        },
        c = !1;
      return {
        encrypt(e, t) {
          if (c) throw Error("cannot encrypt() twice with same key + nonce");
          return ((c = !0), tV(e), o(a.encrypt.length, t), a.encrypt(e, t));
        },
        decrypt(e, t) {
          if ((tV(e), n && e.length < n))
            throw Error(
              "invalid ciphertext length: smaller than tagLength=" + n,
            );
          return (o(a.decrypt.length, t), a.decrypt(e, t));
        },
      };
    }
    return (Object.assign(i, e), i);
  })({ blockSize: 64, nonceLength: 12, tagLength: 16 }, (e, t, i) => ({
    encrypt(s, r) {
      let n = s.length;
      (r = tY(n + 16, r, !1)).set(s);
      let a = r.subarray(0, -16);
      t7(e, t, a, a, 1);
      let o = is(t7, e, t, a, i);
      return (r.set(o, n), tJ(o), r);
    },
    decrypt(s, r) {
      r = tY(s.length - 16, r, !1);
      let n = s.subarray(0, -16),
        a = s.subarray(-16),
        o = is(t7, e, t, n, i);
      if (
        !(function (e, t) {
          if (e.length !== t.length) return !1;
          let i = 0;
          for (let s = 0; s < e.length; s++) i |= e[s] ^ t[s];
          return 0 === i;
        })(a, o)
      )
        throw Error("invalid tag");
      return (r.set(s.subarray(0, -16)), t7(e, t, r, r, 1), tJ(o), r);
    },
  }));
  class ia extends tt {
    constructor(e, t) {
      (super(), (this.finished = !1), (this.destroyed = !1), e0(e));
      let i = te(t);
      if (((this.iHash = e.create()), "function" != typeof this.iHash.update))
        throw Error("Expected instance of class which extends utils.Hash");
      ((this.blockLen = this.iHash.blockLen),
        (this.outputLen = this.iHash.outputLen));
      let s = this.blockLen,
        r = new Uint8Array(s);
      r.set(i.length > s ? e.create().update(i).digest() : i);
      for (let e = 0; e < r.length; e++) r[e] ^= 54;
      (this.iHash.update(r), (this.oHash = e.create()));
      for (let e = 0; e < r.length; e++) r[e] ^= 106;
      (this.oHash.update(r), r.fill(0));
    }
    update(e) {
      return (e1(this), this.iHash.update(e), this);
    }
    digestInto(e) {
      (e1(this),
        eX(e, this.outputLen),
        (this.finished = !0),
        this.iHash.digestInto(e),
        this.oHash.update(e),
        this.oHash.digestInto(e),
        this.destroy());
    }
    digest() {
      let e = new Uint8Array(this.oHash.outputLen);
      return (this.digestInto(e), e);
    }
    _cloneInto(e) {
      e || (e = Object.create(Object.getPrototypeOf(this), {}));
      let {
        oHash: t,
        iHash: i,
        finished: s,
        destroyed: r,
        blockLen: n,
        outputLen: a,
      } = this;
      return (
        (e.finished = s),
        (e.destroyed = r),
        (e.blockLen = n),
        (e.outputLen = a),
        (e.oHash = t._cloneInto(e.oHash)),
        (e.iHash = i._cloneInto(e.iHash)),
        e
      );
    }
    destroy() {
      ((this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy());
    }
  }
  let io = (e, t, i) => new ia(e, t).update(i).digest();
  io.create = (e, t) => new ia(e, t);
  let ic = new Uint8Array([0]),
    il = new Uint8Array();
  class ih extends tt {
    constructor(e, t, i, s) {
      (super(),
        (this.blockLen = e),
        (this.outputLen = t),
        (this.padOffset = i),
        (this.isLE = s),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.buffer = new Uint8Array(e)),
        (this.view = e3(this.buffer)));
    }
    update(e) {
      e1(this);
      let { view: t, buffer: i, blockLen: s } = this,
        r = (e = te(e)).length;
      for (let n = 0; n < r; ) {
        let a = Math.min(s - this.pos, r - n);
        if (a === s) {
          let t = e3(e);
          for (; s <= r - n; n += s) this.process(t, n);
          continue;
        }
        (i.set(e.subarray(n, n + a), this.pos),
          (this.pos += a),
          (n += a),
          this.pos === s && (this.process(t, 0), (this.pos = 0)));
      }
      return ((this.length += e.length), this.roundClean(), this);
    }
    digestInto(e) {
      (e1(this), e2(e, this), (this.finished = !0));
      let { buffer: t, view: i, blockLen: s, isLE: r } = this,
        { pos: n } = this;
      ((t[n++] = 128),
        this.buffer.subarray(n).fill(0),
        this.padOffset > s - n && (this.process(i, 0), (n = 0)));
      for (let e = n; e < s; e++) t[e] = 0;
      ((function (e, t, i, s) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, s);
        let r = BigInt(32),
          n = BigInt(0xffffffff),
          a = Number((i >> r) & n),
          o = Number(i & n),
          c = 4 * !!s,
          l = 4 * !s;
        (e.setUint32(t + c, a, s), e.setUint32(t + l, o, s));
      })(i, s - 8, BigInt(8 * this.length), r),
        this.process(i, 0));
      let a = e3(e),
        o = this.outputLen;
      if (o % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      let c = o / 4,
        l = this.get();
      if (c > l.length) throw Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) a.setUint32(4 * e, l[e], r);
    }
    digest() {
      let { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      let i = e.slice(0, t);
      return (this.destroy(), i);
    }
    _cloneInto(e) {
      (e || (e = new this.constructor()), e.set(...this.get()));
      let {
        blockLen: t,
        buffer: i,
        length: s,
        finished: r,
        destroyed: n,
        pos: a,
      } = this;
      return (
        (e.length = s),
        (e.pos = a),
        (e.finished = r),
        (e.destroyed = n),
        s % t && e.buffer.set(i),
        e
      );
    }
  }
  let ip = new Uint32Array([
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ]),
    id = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    iu = new Uint32Array(64);
  class ig extends ih {
    constructor() {
      (super(64, 32, 8, !1),
        (this.A = 0 | id[0]),
        (this.B = 0 | id[1]),
        (this.C = 0 | id[2]),
        (this.D = 0 | id[3]),
        (this.E = 0 | id[4]),
        (this.F = 0 | id[5]),
        (this.G = 0 | id[6]),
        (this.H = 0 | id[7]));
    }
    get() {
      let { A: e, B: t, C: i, D: s, E: r, F: n, G: a, H: o } = this;
      return [e, t, i, s, r, n, a, o];
    }
    set(e, t, i, s, r, n, a, o) {
      ((this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | i),
        (this.D = 0 | s),
        (this.E = 0 | r),
        (this.F = 0 | n),
        (this.G = 0 | a),
        (this.H = 0 | o));
    }
    process(e, t) {
      for (let i = 0; i < 16; i++, t += 4) iu[i] = e.getUint32(t, !1);
      for (let e = 16; e < 64; e++) {
        let t = iu[e - 15],
          i = iu[e - 2],
          s = e6(t, 7) ^ e6(t, 18) ^ (t >>> 3),
          r = e6(i, 17) ^ e6(i, 19) ^ (i >>> 10);
        iu[e] = (r + iu[e - 7] + s + iu[e - 16]) | 0;
      }
      let { A: i, B: s, C: r, D: n, E: a, F: o, G: c, H: l } = this;
      for (let e = 0; e < 64; e++) {
        var h, p, d, u;
        let t =
            (l +
              (e6(a, 6) ^ e6(a, 11) ^ e6(a, 25)) +
              (((h = a) & o) ^ (~h & c)) +
              ip[e] +
              iu[e]) |
            0,
          g =
            ((e6(i, 2) ^ e6(i, 13) ^ e6(i, 22)) +
              (((p = i) & (d = s)) ^ (p & (u = r)) ^ (d & u))) |
            0;
        ((l = c),
          (c = o),
          (o = a),
          (a = (n + t) | 0),
          (n = r),
          (r = s),
          (s = i),
          (i = (t + g) | 0));
      }
      ((i = (i + this.A) | 0),
        (s = (s + this.B) | 0),
        (r = (r + this.C) | 0),
        (n = (n + this.D) | 0),
        (a = (a + this.E) | 0),
        (o = (o + this.F) | 0),
        (c = (c + this.G) | 0),
        (l = (l + this.H) | 0),
        this.set(i, s, r, n, a, o, c, l));
    }
    roundClean() {
      iu.fill(0);
    }
    destroy() {
      (this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0));
    }
  }
  let iy = ti(() => new ig()),
    im = BigInt(0);
  function iw(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function iv(e) {
    if (!iw(e)) throw Error("Uint8Array expected");
  }
  let ib = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function iI(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function iE(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    let t = e.length,
      i = t / 2;
    if (t % 2)
      throw Error("hex string expected, got unpadded hex of length " + t);
    let s = new Uint8Array(i);
    for (let t = 0, r = 0; t < i; t++, r += 2) {
      let i = iI(e.charCodeAt(r)),
        n = iI(e.charCodeAt(r + 1));
      if (void 0 === i || void 0 === n)
        throw Error(
          'hex string expected, got non-hex character "' +
            (e[r] + e[r + 1]) +
            '" at index ' +
            r,
        );
      s[t] = 16 * i + n;
    }
    return s;
  }
  function iN(e) {
    return (
      iv(e),
      (function (e) {
        if ("string" != typeof e)
          throw Error("hex string expected, got " + typeof e);
        return "" === e ? im : BigInt("0x" + e);
      })(
        (function (e) {
          iv(e);
          let t = "";
          for (let i = 0; i < e.length; i++) t += ib[e[i]];
          return t;
        })(Uint8Array.from(e).reverse()),
      )
    );
  }
  function i_(e, t, i) {
    let s;
    if ("string" == typeof t)
      try {
        s = iE(t);
      } catch (t) {
        throw Error(e + " must be hex string or Uint8Array, cause: " + t);
      }
    else if (iw(t)) s = Uint8Array.from(t);
    else throw Error(e + " must be hex string or Uint8Array");
    let r = s.length;
    if ("number" == typeof i && r !== i)
      throw Error(e + " of length " + i + " expected, got " + r);
    return s;
  }
  let iC = (e) => "bigint" == typeof e && im <= e;
  function iP(e, t, i, s) {
    if (!(iC(t) && iC(i) && iC(s)) || !(i <= t) || !(t < s))
      throw Error(
        "expected valid " + e + ": " + i + " <= n < " + s + ", got " + t,
      );
  }
  let iA = {
      bigint: (e) => "bigint" == typeof e,
      function: (e) => "function" == typeof e,
      boolean: (e) => "boolean" == typeof e,
      string: (e) => "string" == typeof e,
      stringOrUint8Array: (e) => "string" == typeof e || iw(e),
      isSafeInteger: (e) => Number.isSafeInteger(e),
      array: (e) => Array.isArray(e),
      field: (e, t) => t.Fp.isValid(e),
      hash: (e) => "function" == typeof e && Number.isSafeInteger(e.outputLen),
    },
    iO = BigInt(0),
    iS = BigInt(1);
  function iT(e, t) {
    let i = e % t;
    return i >= iO ? i : t + i;
  }
  function ix(e, t, i) {
    let s = e;
    for (; t-- > iO; ) ((s *= s), (s %= i));
    return s;
  }
  (BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8));
  let ik = BigInt(0),
    iD = BigInt(1),
    iR = BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    );
  BigInt(0);
  let iM = BigInt(1),
    ij = BigInt(2),
    iU = BigInt(3),
    iq = BigInt(5);
  BigInt(8);
  let iL = (function (e) {
      let t =
          ((function (e, t, i = {}) {
            let s = (t, i, s) => {
              let r = iA[i];
              if ("function" != typeof r)
                throw Error("invalid validator function");
              let n = e[t];
              if (!(s && void 0 === n) && !r(n, e))
                throw Error(
                  "param " +
                    String(t) +
                    " is invalid. Expected " +
                    i +
                    ", got " +
                    n,
                );
            };
            for (let [e, i] of Object.entries(t)) s(e, i, !1);
            for (let [e, t] of Object.entries(i)) s(e, t, !0);
          })(
            e,
            { a: "bigint" },
            {
              montgomeryBits: "isSafeInteger",
              nByteLength: "isSafeInteger",
              adjustScalarBytes: "function",
              domain: "function",
              powPminus2: "function",
              Gu: "bigint",
            },
          ),
          Object.freeze({ ...e })),
        { P: i } = t,
        s = (e) => iT(e, i),
        r = t.montgomeryBits,
        n = Math.ceil(r / 8),
        a = t.nByteLength,
        o = t.adjustScalarBytes || ((e) => e),
        c =
          t.powPminus2 ||
          ((e) =>
            (function (e, t, i) {
              if (t < iO)
                throw Error("invalid exponent, negatives unsupported");
              if (i <= iO) throw Error("invalid modulus");
              if (i === iS) return iO;
              let s = iS;
              for (; t > iO; )
                (t & iS && (s = (s * e) % i), (e = (e * e) % i), (t >>= iS));
              return s;
            })(e, i - BigInt(2), i));
      function l(e, t, i) {
        let r = s(e * (t - i));
        return [(t = s(t - r)), (i = s(i + r))];
      }
      let h = (t.a - BigInt(2)) / BigInt(4);
      function p(e) {
        var t;
        return ((t = s(e)), iE(t.toString(16).padStart(2 * n, "0")).reverse());
      }
      function d(e, t) {
        let d,
          u = (function (e, t) {
            (iP("u", e, ik, i), iP("scalar", t, ik, i));
            let n = iD,
              a = ik,
              o = e,
              p = iD,
              d = ik,
              u;
            for (let i = BigInt(r - 1); i >= ik; i--) {
              let r = (t >> i) & iD;
              ((d ^= r),
                (n = (u = l(d, n, o))[0]),
                (o = u[1]),
                (a = (u = l(d, a, p))[0]),
                (p = u[1]),
                (d = r));
              let c = n + a,
                g = s(c * c),
                f = n - a,
                y = s(f * f),
                m = g - y,
                w = o + p,
                v = s((o - p) * c),
                b = s(w * f),
                I = v + b,
                E = v - b;
              ((o = s(I * I)),
                (p = s(e * s(E * E))),
                (n = s(g * y)),
                (a = s(m * (g + s(h * m)))));
            }
            return (
              (n = (u = l(d, n, o))[0]),
              (o = u[1]),
              (a = (u = l(d, a, p))[0]),
              (p = u[1]),
              s(n * c(a))
            );
          })(
            ((d = i_("u coordinate", t, n)), 32 === a && (d[31] &= 127), iN(d)),
            (function (e) {
              let t = i_("scalar", e),
                i = t.length;
              if (i !== n && i !== a)
                throw Error(
                  "invalid scalar, expected " +
                    ("" + n + " or ") +
                    a +
                    " bytes, got " +
                    i,
                );
              return iN(o(t));
            })(e),
          );
        if (u === ik) throw Error("invalid private or public key received");
        return p(u);
      }
      let u = p(t.Gu);
      function g(e) {
        return d(e, u);
      }
      return {
        scalarMult: d,
        scalarMultBase: g,
        getSharedSecret: (e, t) => d(e, t),
        getPublicKey: (e) => g(e),
        utils: { randomPrivateKey: () => t.randomBytes(t.nByteLength) },
        GuBytes: u,
      };
    })({
      P: iR,
      a: BigInt(486662),
      montgomeryBits: 255,
      nByteLength: 32,
      Gu: BigInt(9),
      powPminus2: (e) => {
        let t,
          i,
          s,
          r,
          n,
          a,
          o,
          c,
          l,
          h,
          p,
          d,
          u,
          g,
          { pow_p_5_8: f, b2: y } =
            ((t = BigInt(10)),
            (i = BigInt(20)),
            (s = BigInt(40)),
            (r = BigInt(80)),
            (a = (ix((n = (((e * e) % iR) * e) % iR), ij, iR) * n) % iR),
            (o = (ix(a, iM, iR) * e) % iR),
            (c = (ix(o, iq, iR) * o) % iR),
            (l = (ix(c, t, iR) * c) % iR),
            (h = (ix(l, i, iR) * l) % iR),
            (p = (ix(h, s, iR) * h) % iR),
            (d = (ix(p, r, iR) * p) % iR),
            (u = (ix(d, r, iR) * p) % iR),
            (g = (ix(u, t, iR) * c) % iR),
            { pow_p_5_8: (ix(g, ij, iR) * e) % iR, b2: n });
        return iT(ix(f, iU, iR) * y, iR);
      },
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      randomBytes: ts,
    }),
    i$ = "base10",
    iz = "base16",
    iK = "base64pad",
    iV = "base64url",
    iH = "utf8";
  function iB() {
    let e = ts(32);
    return (0, ew.f)(e, iz);
  }
  function iF(e) {
    let t = iy((0, ev.f)(e, iz));
    return (0, ew.f)(t, iz);
  }
  function iW(e) {
    let t = iy((0, ev.f)(e, iH));
    return (0, ew.f)(t, iz);
  }
  function iY(e) {
    return (0, ev.f)(`${e}`, i$);
  }
  function iG(e) {
    return Number((0, ew.f)(e, i$));
  }
  function iQ(e) {
    let { encoding: t = iK } = e;
    if (2 === iG(e.type)) return (0, ew.f)((0, eb.f)([e.type, e.sealed]), t);
    if (1 === iG(e.type)) {
      if (typeof e.senderPublicKey > "u")
        throw Error("Missing sender public key for type 1 envelope");
      return (0, ew.f)(
        (0, eb.f)([e.type, e.senderPublicKey, e.iv, e.sealed]),
        t,
      );
    }
    return (0, ew.f)((0, eb.f)([e.type, e.iv, e.sealed]), t);
  }
  function iJ(e) {
    let { encoded: t, encoding: i = iK } = e,
      s = (0, ev.f)(t, i),
      r = s.slice(0, 1);
    if (1 === iG(r)) {
      let e = s.slice(1, 33),
        t = s.slice(33, 45);
      return { type: r, sealed: s.slice(45), iv: t, senderPublicKey: e };
    }
    if (2 === iG(r)) return { type: r, sealed: s.slice(1), iv: ts(12) };
    let n = s.slice(1, 13);
    return { type: r, sealed: s.slice(13), iv: n };
  }
  function iZ(e) {
    let t = e?.type || 0;
    if (1 === t) {
      if (typeof e?.senderPublicKey > "u")
        throw Error("missing sender public key");
      if (typeof e?.receiverPublicKey > "u")
        throw Error("missing receiver public key");
    }
    return {
      type: t,
      senderPublicKey: e?.senderPublicKey,
      receiverPublicKey: e?.receiverPublicKey,
    };
  }
  function iX(e) {
    return (
      1 === e.type &&
      "string" == typeof e.senderPublicKey &&
      "string" == typeof e.receiverPublicKey
    );
  }
  function i0(e) {
    return e?.relay || { protocol: "irn" };
  }
  function i1(e) {
    let t = eE.f[e];
    if (typeof t > "u") throw Error(`Relay Protocol not supported: ${e}`);
    return t;
  }
  function i2(e) {
    var t;
    if (!e.includes("wc:")) {
      let t = eJ(e);
      null != t && t.includes("wc:") && (e = t);
    }
    let i = (e = (e = e.includes("wc://")
        ? e.replace("wc://", "")
        : e).includes("wc:")
        ? e.replace("wc:", "")
        : e).indexOf(":"),
      s = -1 !== e.indexOf("?") ? e.indexOf("?") : void 0,
      r = e.substring(0, i),
      n = e.substring(i + 1, s).split("@"),
      a = new URLSearchParams("u" > typeof s ? e.substring(s) : ""),
      o = {};
    a.forEach((e, t) => {
      o[t] = e;
    });
    let c = "string" == typeof o.methods ? o.methods.split(",") : void 0;
    return {
      protocol: r,
      topic: (t = n[0]).startsWith("//") ? t.substring(2) : t,
      version: parseInt(n[1], 10),
      symKey: o.symKey,
      relay: (function (e, t = "-") {
        let i = {},
          s = "relay" + t;
        return (
          Object.keys(e).forEach((t) => {
            if (t.startsWith(s)) {
              let r = t.replace(s, ""),
                n = e[t];
              i[r] = n;
            }
          }),
          i
        );
      })(o),
      methods: c,
      expiryTimestamp: o.expiryTimestamp
        ? parseInt(o.expiryTimestamp, 10)
        : void 0,
    };
  }
  function i5(e) {
    let t = new URLSearchParams(),
      i = (function (e, t = "-") {
        let i = {};
        return (
          Object.keys(e).forEach((s) => {
            e[s] && (i["relay" + t + s] = e[s]);
          }),
          i
        );
      })(e.relay);
    (Object.keys(i)
      .sort()
      .forEach((e) => {
        t.set(e, i[e]);
      }),
      t.set("symKey", e.symKey),
      e.expiryTimestamp &&
        t.set("expiryTimestamp", e.expiryTimestamp.toString()),
      e.methods && t.set("methods", e.methods.join(",")));
    let s = t.toString();
    return `${e.protocol}:${e.topic}@${e.version}?${s}`;
  }
  function i4(e, t, i) {
    return `${e}?wc_ev=${i}&topic=${t}`;
  }
  function i8(e) {
    let t = [];
    return (
      e.forEach((e) => {
        let [i, s] = e.split(":");
        t.push(`${i}:${s}`);
      }),
      t
    );
  }
  function i3(e) {
    return e.includes(":");
  }
  function i6(e) {
    return i3(e) ? e.split(":")[0] : e;
  }
  function i9(e, t) {
    var i;
    let s,
      r =
        ((i = t = t.map((e) => e.replace("did:pkh:", ""))),
        (s = {}),
        i?.forEach((e) => {
          var t;
          let [i, r] = e.split(":");
          (s[i] ||
            (s[i] = { accounts: [], chains: [], events: [], methods: [] }),
            s[i].accounts.push(e),
            null == (t = s[i].chains) || t.push(`${i}:${r}`));
        }),
        s);
    for (let [t, i] of Object.entries(r))
      (i.methods ? (i.methods = eB(i.methods, e)) : (i.methods = e),
        (i.events = ["chainChanged", "accountsChanged"]));
    return r;
  }
  (Object.prototype.hasOwnProperty, Object.prototype.propertyIsEnumerable);
  let i7 = {
      INVALID_METHOD: { message: "Invalid method.", code: 1001 },
      INVALID_EVENT: { message: "Invalid event.", code: 1002 },
      INVALID_UPDATE_REQUEST: {
        message: "Invalid update request.",
        code: 1003,
      },
      INVALID_EXTEND_REQUEST: {
        message: "Invalid extend request.",
        code: 1004,
      },
      INVALID_SESSION_SETTLE_REQUEST: {
        message: "Invalid session settle request.",
        code: 1005,
      },
      UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 },
      UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 },
      UNAUTHORIZED_UPDATE_REQUEST: {
        message: "Unauthorized update request.",
        code: 3003,
      },
      UNAUTHORIZED_EXTEND_REQUEST: {
        message: "Unauthorized extend request.",
        code: 3004,
      },
      USER_REJECTED: { message: "User rejected.", code: 5e3 },
      USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 },
      USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 },
      USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 },
      UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 },
      UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 },
      UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 },
      UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 },
      UNSUPPORTED_NAMESPACE_KEY: {
        message: "Unsupported namespace key.",
        code: 5104,
      },
      USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 },
      SESSION_SETTLEMENT_FAILED: {
        message: "Session settlement failed.",
        code: 7e3,
      },
      WC_METHOD_UNSUPPORTED: {
        message: "Unsupported wc_ method.",
        code: 10001,
      },
    },
    se = {
      NOT_INITIALIZED: { message: "Not initialized.", code: 1 },
      NO_MATCHING_KEY: { message: "No matching key.", code: 2 },
      RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 },
      RESUBSCRIBED: { message: "Resubscribed.", code: 4 },
      MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 },
      EXPIRED: { message: "Expired.", code: 6 },
      UNKNOWN_TYPE: { message: "Unknown type.", code: 7 },
      MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 },
      NON_CONFORMING_NAMESPACES: {
        message: "Non conforming namespaces.",
        code: 9,
      },
    };
  function st(e, t) {
    let { message: i, code: s } = se[e];
    return { message: t ? `${i} ${t}` : i, code: s };
  }
  function si(e, t) {
    let { message: i, code: s } = i7[e];
    return { message: t ? `${i} ${t}` : i, code: s };
  }
  function ss(e, t) {
    return !!Array.isArray(e) && (!("u" > typeof t) || !e.length || e.every(t));
  }
  function sr(e) {
    return (
      Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length
    );
  }
  function sn(e) {
    return typeof e > "u";
  }
  function sa(e, t) {
    return !!(t && sn(e)) || ("string" == typeof e && !!e.trim().length);
  }
  function so(e, t) {
    return !!(t && sn(e)) || ("number" == typeof e && !isNaN(e));
  }
  function sc(e) {
    return !!(sa(e, !1) && e.includes(":")) && 2 === e.split(":").length;
  }
  function sl(e) {
    let t = !0;
    return (ss(e) ? e.length && (t = e.every((e) => sa(e, !1))) : (t = !1), t);
  }
  function sh(e, t) {
    let i = null;
    return (
      Object.values(e).forEach((e) => {
        var s;
        let r;
        if (i) return;
        let n =
          ((s = `${t}, namespace`),
          (r = null),
          sl(e?.methods)
            ? sl(e?.events) ||
              (r = si(
                "UNSUPPORTED_EVENTS",
                `${s}, events should be an array of strings or empty array for no events`,
              ))
            : (r = si(
                "UNSUPPORTED_METHODS",
                `${s}, methods should be an array of strings or empty array for no methods`,
              )),
          r);
        n && (i = n);
      }),
      i
    );
  }
  function sp(e, t) {
    let i = null;
    if (e && sr(e)) {
      let s,
        r = sh(e, t);
      r && (i = r);
      let n =
        ((s = null),
        Object.values(e).forEach((e) => {
          var i, r;
          let n;
          if (s) return;
          let a =
            ((i = e?.accounts),
            (r = `${t} namespace`),
            (n = null),
            ss(i)
              ? i.forEach((e) => {
                  n ||
                    (function (e) {
                      if (sa(e, !1) && e.includes(":")) {
                        let t = e.split(":");
                        if (3 === t.length) {
                          let e = t[0] + ":" + t[1];
                          return !!t[2] && sc(e);
                        }
                      }
                      return !1;
                    })(e) ||
                    (n = si(
                      "UNSUPPORTED_ACCOUNTS",
                      `${r}, account ${e} should be a string and conform to "namespace:chainId:address" format`,
                    ));
                })
              : (n = si(
                  "UNSUPPORTED_ACCOUNTS",
                  `${r}, accounts should be an array of strings conforming to "namespace:chainId:address" format`,
                )),
            n);
          a && (s = a);
        }),
        s);
      n && (i = n);
    } else
      i = st(
        "MISSING_OR_INVALID",
        `${t}, namespaces should be an object with data`,
      );
    return i;
  }
  function sd(e) {
    return sa(e.protocol, !0);
  }
  function su(e) {
    return "u" > typeof e;
  }
  function sg(e, t) {
    let i;
    return !(
      !sc(t) ||
      !((i = []),
      Object.values(e).forEach((e) => {
        i.push(...i8(e.accounts));
      }),
      i).includes(t)
    );
  }
  function sf(e, t, i) {
    var s, r;
    let n,
      a,
      o = null,
      c =
        ((n = {}),
        Object.keys((s = e)).forEach((e) => {
          var t;
          e.includes(":")
            ? (n[e] = s[e])
            : null == (t = s[e].chains) ||
              t.forEach((t) => {
                n[t] = { methods: s[e].methods, events: s[e].events };
              });
        }),
        n),
      l =
        ((a = {}),
        Object.keys((r = t)).forEach((e) => {
          if (e.includes(":")) a[e] = r[e];
          else {
            let t = i8(r[e].accounts);
            t?.forEach((t) => {
              a[t] = {
                accounts: r[e].accounts.filter((e) => e.includes(`${t}:`)),
                methods: r[e].methods,
                events: r[e].events,
              };
            });
          }
        }),
        a),
      h = Object.keys(c),
      p = Object.keys(l),
      d = sy(Object.keys(e)),
      u = sy(Object.keys(t)),
      g = d.filter((e) => !u.includes(e));
    return (
      g.length &&
        (o = st(
          "NON_CONFORMING_NAMESPACES",
          `${i} namespaces keys don't satisfy requiredNamespaces.
      Required: ${g.toString()}
      Received: ${Object.keys(t).toString()}`,
        )),
      eM(h, p) ||
        (o = st(
          "NON_CONFORMING_NAMESPACES",
          `${i} namespaces chains don't satisfy required namespaces.
      Required: ${h.toString()}
      Approved: ${p.toString()}`,
        )),
      Object.keys(t).forEach((e) => {
        if (!e.includes(":") || o) return;
        let s = i8(t[e].accounts);
        s.includes(e) ||
          (o = st(
            "NON_CONFORMING_NAMESPACES",
            `${i} namespaces accounts don't satisfy namespace accounts for ${e}
        Required: ${e}
        Approved: ${s.toString()}`,
          ));
      }),
      h.forEach((e) => {
        o ||
          (eM(c[e].methods, l[e].methods)
            ? eM(c[e].events, l[e].events) ||
              (o = st(
                "NON_CONFORMING_NAMESPACES",
                `${i} namespaces events don't satisfy namespace events for ${e}`,
              ))
            : (o = st(
                "NON_CONFORMING_NAMESPACES",
                `${i} namespaces methods don't satisfy namespace methods for ${e}`,
              )));
      }),
      o
    );
  }
  function sy(e) {
    return [...new Set(e.map((e) => (e.includes(":") ? e.split(":")[0] : e)))];
  }
  function sm() {
    let e = ex();
    return new Promise((t) => {
      switch (e) {
        case eA:
          t(eT() && navigator?.onLine);
          break;
        case eC:
          t(sw());
          break;
        default:
          t(!0);
      }
    });
  }
  async function sw() {
    if (eS() && null != e.g && e.g.NetInfo) {
      let t = await (null == e.g ? void 0 : e.g.NetInfo.fetch());
      return t?.isConnected;
    }
    return !0;
  }
  let sv = {};
  class sb {
    static get(e) {
      return sv[e];
    }
    static set(e, t) {
      sv[e] = t;
    }
    static delete(e) {
      delete sv[e];
    }
  }
  var sI = e.i(409482);
  e.i(660075);
  var sE = e.i(669941),
    sN = e.i(139434),
    s_ = e.i(327026),
    sC = e.i(155067);
  let sP = "core",
    sA = `wc@2:${sP}:`,
    sO = { database: ":memory:" },
    sS = "client_ed25519_seed",
    sT = ep.ONE_DAY,
    sx = ep.SIX_HOURS,
    sk = "wss://relay.walletconnect.org",
    sD = "relayer_message",
    sR = "relayer_message_ack",
    sM = "relayer_connection_stalled",
    sj = "relayer_publish",
    sU = "payload",
    sq = "connect",
    sL = "disconnect",
    s$ = "error",
    sz = "2.19.0",
    sK = "link_mode",
    sV = "relay",
    sH = "WALLETCONNECT_LINK_MODE_APPS",
    sB = "subscription_created",
    sF = "subscription_deleted",
    sW = (ep.THIRTY_DAYS, 1e3 * ep.FIVE_SECONDS),
    sY =
      (ep.THIRTY_DAYS,
      {
        wc_pairingDelete: {
          req: { ttl: ep.ONE_DAY, prompt: !1, tag: 1e3 },
          res: { ttl: ep.ONE_DAY, prompt: !1, tag: 1001 },
        },
        wc_pairingPing: {
          req: { ttl: ep.THIRTY_SECONDS, prompt: !1, tag: 1002 },
          res: { ttl: ep.THIRTY_SECONDS, prompt: !1, tag: 1003 },
        },
        unregistered_method: {
          req: { ttl: ep.ONE_DAY, prompt: !1, tag: 0 },
          res: { ttl: ep.ONE_DAY, prompt: !1, tag: 0 },
        },
      }),
    sG = "pairing_create",
    sQ = "pairing_delete",
    sJ = "history_created",
    sZ = "history_updated",
    sX = "history_deleted",
    s0 = "expirer_created",
    s1 = "expirer_deleted",
    s2 = "expirer_expired",
    s5 = (ep.ONE_DAY, "https://verify.walletconnect.org"),
    s4 = `${s5}/v3`,
    s8 = ["https://verify.walletconnect.com", s5],
    s3 = "malformed_pairing_uri",
    s6 = "session_approve_started";
  var s9 = function (e, t) {
    if (e.length >= 255) throw TypeError("Alphabet too long");
    for (var i = new Uint8Array(256), s = 0; s < i.length; s++) i[s] = 255;
    for (var r = 0; r < e.length; r++) {
      var n = e.charAt(r),
        a = n.charCodeAt(0);
      if (255 !== i[a]) throw TypeError(n + " is ambiguous");
      i[a] = r;
    }
    var o = e.length,
      c = e.charAt(0),
      l = Math.log(o) / Math.log(256),
      h = Math.log(256) / Math.log(o);
    function p(e) {
      if ("string" != typeof e) throw TypeError("Expected String");
      if (0 === e.length) return new Uint8Array();
      var t = 0;
      if (" " !== e[0]) {
        for (var s = 0, r = 0; e[t] === c; ) (s++, t++);
        for (
          var n = ((e.length - t) * l + 1) >>> 0, a = new Uint8Array(n);
          e[t];

        ) {
          var h = i[e.charCodeAt(t)];
          if (255 === h) return;
          for (var p = 0, d = n - 1; (0 !== h || p < r) && -1 !== d; d--, p++)
            ((h += (o * a[d]) >>> 0),
              (a[d] = h % 256 >>> 0),
              (h = (h / 256) >>> 0));
          if (0 !== h) throw Error("Non-zero carry");
          ((r = p), t++);
        }
        if (" " !== e[t]) {
          for (var u = n - r; u !== n && 0 === a[u]; ) u++;
          for (var g = new Uint8Array(s + (n - u)), f = s; u !== n; )
            g[f++] = a[u++];
          return g;
        }
      }
    }
    return {
      encode: function (t) {
        if (
          (t instanceof Uint8Array ||
            (ArrayBuffer.isView(t)
              ? (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
              : Array.isArray(t) && (t = Uint8Array.from(t))),
          !(t instanceof Uint8Array))
        )
          throw TypeError("Expected Uint8Array");
        if (0 === t.length) return "";
        for (var i = 0, s = 0, r = 0, n = t.length; r !== n && 0 === t[r]; )
          (r++, i++);
        for (
          var a = ((n - r) * h + 1) >>> 0, l = new Uint8Array(a);
          r !== n;

        ) {
          for (
            var p = t[r], d = 0, u = a - 1;
            (0 !== p || d < s) && -1 !== u;
            u--, d++
          )
            ((p += (256 * l[u]) >>> 0),
              (l[u] = p % o >>> 0),
              (p = (p / o) >>> 0));
          if (0 !== p) throw Error("Non-zero carry");
          ((s = d), r++);
        }
        for (var g = a - s; g !== a && 0 === l[g]; ) g++;
        for (var f = c.repeat(i); g < a; ++g) f += e.charAt(l[g]);
        return f;
      },
      decodeUnsafe: p,
      decode: function (e) {
        var i = p(e);
        if (i) return i;
        throw Error(`Non-${t} character`);
      },
    };
  };
  let s7 = (e) => {
    if (e instanceof Uint8Array && "Uint8Array" === e.constructor.name)
      return e;
    if (e instanceof ArrayBuffer) return new Uint8Array(e);
    if (ArrayBuffer.isView(e))
      return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    throw Error("Unknown type, must be binary type");
  };
  class re {
    constructor(e, t, i) {
      ((this.name = e), (this.prefix = t), (this.baseEncode = i));
    }
    encode(e) {
      if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
      throw Error("Unknown type, must be binary type");
    }
  }
  class rt {
    constructor(e, t, i) {
      if (((this.name = e), (this.prefix = t), void 0 === t.codePointAt(0)))
        throw Error("Invalid prefix character");
      ((this.prefixCodePoint = t.codePointAt(0)), (this.baseDecode = i));
    }
    decode(e) {
      if ("string" == typeof e) {
        if (e.codePointAt(0) !== this.prefixCodePoint)
          throw Error(
            `Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`,
          );
        return this.baseDecode(e.slice(this.prefix.length));
      }
      throw Error("Can only multibase decode strings");
    }
    or(e) {
      return rs(this, e);
    }
  }
  class ri {
    constructor(e) {
      this.decoders = e;
    }
    or(e) {
      return rs(this, e);
    }
    decode(e) {
      let t = e[0],
        i = this.decoders[t];
      if (i) return i.decode(e);
      throw RangeError(
        `Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`,
      );
    }
  }
  let rs = (e, t) =>
    new ri({
      ...(e.decoders || { [e.prefix]: e }),
      ...(t.decoders || { [t.prefix]: t }),
    });
  class rr {
    constructor(e, t, i, s) {
      ((this.name = e),
        (this.prefix = t),
        (this.baseEncode = i),
        (this.baseDecode = s),
        (this.encoder = new re(e, t, i)),
        (this.decoder = new rt(e, t, s)));
    }
    encode(e) {
      return this.encoder.encode(e);
    }
    decode(e) {
      return this.decoder.decode(e);
    }
  }
  let rn = ({ name: e, prefix: t, encode: i, decode: s }) => new rr(e, t, i, s),
    ra = ({ prefix: e, name: t, alphabet: i }) => {
      let { encode: s, decode: r } = s9(i, t);
      return rn({ prefix: e, name: t, encode: s, decode: (e) => s7(r(e)) });
    },
    ro = ({ name: e, prefix: t, bitsPerChar: i, alphabet: s }) =>
      rn({
        prefix: t,
        name: e,
        encode: (e) =>
          ((e, t, i) => {
            let s = "=" === t[t.length - 1],
              r = (1 << i) - 1,
              n = "",
              a = 0,
              o = 0;
            for (let s = 0; s < e.length; ++s)
              for (o = (o << 8) | e[s], a += 8; a > i; )
                ((a -= i), (n += t[r & (o >> a)]));
            if ((a && (n += t[r & (o << (i - a))]), s))
              for (; (n.length * i) & 7; ) n += "=";
            return n;
          })(e, s, i),
        decode: (t) =>
          ((e, t, i, s) => {
            let r = {};
            for (let e = 0; e < t.length; ++e) r[t[e]] = e;
            let n = e.length;
            for (; "=" === e[n - 1]; ) --n;
            let a = new Uint8Array(((n * i) / 8) | 0),
              o = 0,
              c = 0,
              l = 0;
            for (let t = 0; t < n; ++t) {
              let n = r[e[t]];
              if (void 0 === n) throw SyntaxError(`Non-${s} character`);
              ((c = (c << i) | n),
                (o += i) >= 8 && ((o -= 8), (a[l++] = 255 & (c >> o))));
            }
            if (o >= i || 255 & (c << (8 - o)))
              throw SyntaxError("Unexpected end of data");
            return a;
          })(t, s, i, e),
      });
  var rc = Object.freeze({
      __proto__: null,
      identity: rn({
        prefix: "\0",
        name: "identity",
        encode: (e) => new TextDecoder().decode(e),
        decode: (e) => new TextEncoder().encode(e),
      }),
    }),
    rl = Object.freeze({
      __proto__: null,
      base2: ro({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 }),
    }),
    rh = Object.freeze({
      __proto__: null,
      base8: ro({
        prefix: "7",
        name: "base8",
        alphabet: "01234567",
        bitsPerChar: 3,
      }),
    }),
    rp = Object.freeze({
      __proto__: null,
      base10: ra({ prefix: "9", name: "base10", alphabet: "0123456789" }),
    }),
    rd = Object.freeze({
      __proto__: null,
      base16: ro({
        prefix: "f",
        name: "base16",
        alphabet: "0123456789abcdef",
        bitsPerChar: 4,
      }),
      base16upper: ro({
        prefix: "F",
        name: "base16upper",
        alphabet: "0123456789ABCDEF",
        bitsPerChar: 4,
      }),
    }),
    ru = Object.freeze({
      __proto__: null,
      base32: ro({
        prefix: "b",
        name: "base32",
        alphabet: "abcdefghijklmnopqrstuvwxyz234567",
        bitsPerChar: 5,
      }),
      base32upper: ro({
        prefix: "B",
        name: "base32upper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        bitsPerChar: 5,
      }),
      base32pad: ro({
        prefix: "c",
        name: "base32pad",
        alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
        bitsPerChar: 5,
      }),
      base32padupper: ro({
        prefix: "C",
        name: "base32padupper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
        bitsPerChar: 5,
      }),
      base32hex: ro({
        prefix: "v",
        name: "base32hex",
        alphabet: "0123456789abcdefghijklmnopqrstuv",
        bitsPerChar: 5,
      }),
      base32hexupper: ro({
        prefix: "V",
        name: "base32hexupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        bitsPerChar: 5,
      }),
      base32hexpad: ro({
        prefix: "t",
        name: "base32hexpad",
        alphabet: "0123456789abcdefghijklmnopqrstuv=",
        bitsPerChar: 5,
      }),
      base32hexpadupper: ro({
        prefix: "T",
        name: "base32hexpadupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
        bitsPerChar: 5,
      }),
      base32z: ro({
        prefix: "h",
        name: "base32z",
        alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
        bitsPerChar: 5,
      }),
    }),
    rg = Object.freeze({
      __proto__: null,
      base36: ra({
        prefix: "k",
        name: "base36",
        alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
      }),
      base36upper: ra({
        prefix: "K",
        name: "base36upper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      }),
    }),
    rf = Object.freeze({
      __proto__: null,
      base58btc: ra({
        name: "base58btc",
        prefix: "z",
        alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      }),
      base58flickr: ra({
        name: "base58flickr",
        prefix: "Z",
        alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
      }),
    }),
    ry = Object.freeze({
      __proto__: null,
      base64: ro({
        prefix: "m",
        name: "base64",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        bitsPerChar: 6,
      }),
      base64pad: ro({
        prefix: "M",
        name: "base64pad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        bitsPerChar: 6,
      }),
      base64url: ro({
        prefix: "u",
        name: "base64url",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
        bitsPerChar: 6,
      }),
      base64urlpad: ro({
        prefix: "U",
        name: "base64urlpad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        bitsPerChar: 6,
      }),
    });
  let rm = Array.from(
      "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂",
    ),
    rw = rm.reduce((e, t, i) => ((e[i] = t), e), []),
    rv = rm.reduce((e, t, i) => ((e[t.codePointAt(0)] = i), e), []);
  var rb = Object.freeze({
    __proto__: null,
    base256emoji: rn({
      prefix: "🚀",
      name: "base256emoji",
      encode: function (e) {
        return e.reduce((e, t) => (e += rw[t]), "");
      },
      decode: function (e) {
        let t = [];
        for (let i of e) {
          let e = rv[i.codePointAt(0)];
          if (void 0 === e) throw Error(`Non-base256emoji character: ${i}`);
          t.push(e);
        }
        return new Uint8Array(t);
      },
    }),
  });
  function rI(e, t, i) {
    ((t = t || []), (i = i || 0));
    for (var s = i; e >= 0x80000000; ) ((t[i++] = (255 & e) | 128), (e /= 128));
    for (; -128 & e; ) ((t[i++] = (255 & e) | 128), (e >>>= 7));
    return ((t[i] = 0 | e), (rI.bytes = i - s + 1), t);
  }
  var rE = function (e) {
    return e < 128
      ? 1
      : e < 16384
        ? 2
        : e < 2097152
          ? 3
          : e < 0x10000000
            ? 4
            : e < 0x800000000
              ? 5
              : e < 0x40000000000
                ? 6
                : e < 0x2000000000000
                  ? 7
                  : e < 0x100000000000000
                    ? 8
                    : e < 0x8000000000000000
                      ? 9
                      : 10;
  };
  let rN = (e, t, i = 0) => (rI(e, t, i), t),
    r_ = (e, t) => {
      let i = t.byteLength,
        s = rE(e),
        r = s + rE(i),
        n = new Uint8Array(r + i);
      return (rN(e, n, 0), rN(i, n, s), n.set(t, r), new rC(e, i, t, n));
    };
  class rC {
    constructor(e, t, i, s) {
      ((this.code = e), (this.size = t), (this.digest = i), (this.bytes = s));
    }
  }
  let rP = ({ name: e, code: t, encode: i }) => new rA(e, t, i);
  class rA {
    constructor(e, t, i) {
      ((this.name = e), (this.code = t), (this.encode = i));
    }
    digest(e) {
      if (e instanceof Uint8Array) {
        let t = this.encode(e);
        return t instanceof Uint8Array
          ? r_(this.code, t)
          : t.then((e) => r_(this.code, e));
      }
      throw Error("Unknown type, must be binary type");
    }
  }
  let rO = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t));
  var rS = Object.freeze({
      __proto__: null,
      sha256: rP({ name: "sha2-256", code: 18, encode: rO("SHA-256") }),
      sha512: rP({ name: "sha2-512", code: 19, encode: rO("SHA-512") }),
    }),
    rT = Object.freeze({
      __proto__: null,
      identity: {
        code: 0,
        name: "identity",
        encode: s7,
        digest: (e) => r_(0, s7(e)),
      },
    });
  (new TextEncoder(), new TextDecoder());
  let rx = {
    ...rc,
    ...rl,
    ...rh,
    ...rp,
    ...rd,
    ...ru,
    ...rg,
    ...rf,
    ...ry,
    ...rb,
  };
  function rk(e, t, i, s) {
    return {
      name: e,
      prefix: t,
      encoder: { name: e, prefix: t, encode: i },
      decoder: { decode: s },
    };
  }
  ({ ...rS, ...rT });
  let rD = rk(
      "utf8",
      "u",
      (e) => "u" + new TextDecoder("utf8").decode(e),
      (e) => new TextEncoder().encode(e.substring(1)),
    ),
    rR = rk(
      "ascii",
      "a",
      (e) => {
        let t = "a";
        for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
        return t;
      },
      (e) => {
        let t = (function (e = 0) {
          return null != globalThis.Buffer &&
            null != globalThis.Buffer.allocUnsafe
            ? globalThis.Buffer.allocUnsafe(e)
            : new Uint8Array(e);
        })((e = e.substring(1)).length);
        for (let i = 0; i < e.length; i++) t[i] = e.charCodeAt(i);
        return t;
      },
    ),
    rM = {
      utf8: rD,
      "utf-8": rD,
      hex: rx.base16,
      latin1: rR,
      ascii: rR,
      binary: rR,
      ...rx,
    };
  var rj = Object.defineProperty,
    rU = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rj(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rq {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        rU(this, "keychain", new Map()),
        rU(this, "name", "keychain"),
        rU(this, "version", "0.3"),
        rU(this, "initialized", !1),
        rU(this, "storagePrefix", sA),
        rU(this, "init", async () => {
          if (!this.initialized) {
            let e = await this.getKeyChain();
            ("u" > typeof e && (this.keychain = e), (this.initialized = !0));
          }
        }),
        rU(this, "has", (e) => (this.isInitialized(), this.keychain.has(e))),
        rU(this, "set", async (e, t) => {
          (this.isInitialized(), this.keychain.set(e, t), await this.persist());
        }),
        rU(this, "get", (e) => {
          this.isInitialized();
          let t = this.keychain.get(e);
          if (typeof t > "u") {
            let { message: t } = st("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw Error(t);
          }
          return t;
        }),
        rU(this, "del", async (e) => {
          (this.isInitialized(), this.keychain.delete(e), await this.persist());
        }),
        (this.core = e),
        (this.logger = (0, H.v)(t, this.name)));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    async setKeyChain(e) {
      await this.core.storage.setItem(this.storageKey, ej(e));
    }
    async getKeyChain() {
      let e = await this.core.storage.getItem(this.storageKey);
      return "u" > typeof e ? eU(e) : void 0;
    }
    async persist() {
      await this.setKeyChain(this.keychain);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rL = Object.defineProperty,
    r$ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rL(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rz {
    constructor(e, t, i) {
      ((this.core = e),
        (this.logger = t),
        r$(this, "name", "crypto"),
        r$(this, "keychain"),
        r$(this, "randomSessionIdentifier", iB()),
        r$(this, "initialized", !1),
        r$(this, "init", async () => {
          this.initialized ||
            (await this.keychain.init(), (this.initialized = !0));
        }),
        r$(
          this,
          "hasKeys",
          (e) => (this.isInitialized(), this.keychain.has(e)),
        ),
        r$(this, "getClientId", async () => {
          this.isInitialized();
          let e = await this.getClientSeed(),
            t = eu.G(e);
          return eu.j(t.publicKey);
        }),
        r$(this, "generateKeyPair", () => {
          let e, t;
          this.isInitialized();
          let i =
            ((e = iL.utils.randomPrivateKey()),
            (t = iL.getPublicKey(e)),
            { privateKey: (0, ew.f)(e, iz), publicKey: (0, ew.f)(t, iz) });
          return this.setPrivateKey(i.publicKey, i.privateKey);
        }),
        r$(this, "signJWT", async (e) => {
          this.isInitialized();
          let t = await this.getClientSeed(),
            i = eu.G(t),
            s = this.randomSessionIdentifier;
          return await eu.X(s, e, sT, i);
        }),
        r$(this, "generateSharedKey", (e, t, i) => {
          var s, r, n;
          let a, o;
          this.isInitialized();
          let c =
            ((s = this.getPrivateKey(e)),
            (a = iL.getSharedSecret((0, ev.f)(s, iz), (0, ev.f)(t, iz))),
            (r = void 0),
            (o = (function (e, t, i, s = 32) {
              if ((e0(e), eZ(s), s > 255 * e.outputLen))
                throw Error("Length should be <= 255*HashLen");
              let r = Math.ceil(s / e.outputLen);
              void 0 === i && (i = il);
              let n = new Uint8Array(r * e.outputLen),
                a = io.create(e, t),
                o = a._cloneInto(),
                c = new Uint8Array(a.outputLen);
              for (let t = 0; t < r; t++)
                ((ic[0] = t + 1),
                  o
                    .update(0 === t ? il : c)
                    .update(i)
                    .update(ic)
                    .digestInto(c),
                  n.set(c, e.outputLen * t),
                  a._cloneInto(o));
              return (
                a.destroy(),
                o.destroy(),
                c.fill(0),
                ic.fill(0),
                n.slice(0, s)
              );
            })(
              iy,
              ((n = void 0),
              e0(iy),
              void 0 === n && (n = new Uint8Array(iy.outputLen)),
              io(iy, te(n), te(a))),
              r,
              32,
            )),
            (0, ew.f)(o, iz));
          return this.setSymKey(c, i);
        }),
        r$(this, "setSymKey", async (e, t) => {
          this.isInitialized();
          let i = t || iF(e);
          return (await this.keychain.set(i, e), i);
        }),
        r$(this, "deleteKeyPair", async (e) => {
          (this.isInitialized(), await this.keychain.del(e));
        }),
        r$(this, "deleteSymKey", async (e) => {
          (this.isInitialized(), await this.keychain.del(e));
        }),
        r$(this, "encode", async (e, t, i) => {
          this.isInitialized();
          let s = iZ(i),
            r = (0, ed.I)(t);
          if (2 === s.type) {
            var n;
            let e, t;
            return (
              (n = i?.encoding),
              (e = iY(2)),
              (t = ts(12)),
              iQ({ type: e, sealed: (0, ev.f)(r, iH), iv: t, encoding: n })
            );
          }
          if (iX(s)) {
            let t = s.senderPublicKey,
              i = s.receiverPublicKey;
            e = await this.generateSharedKey(t, i);
          }
          let a = this.getSymKey(e),
            { type: o, senderPublicKey: c } = s;
          return (function (e) {
            let t = iY("u" > typeof e.type ? e.type : 0);
            if (1 === iG(t) && typeof e.senderPublicKey > "u")
              throw Error("Missing sender public key for type 1 envelope");
            let i =
                "u" > typeof e.senderPublicKey
                  ? (0, ev.f)(e.senderPublicKey, iz)
                  : void 0,
              s = "u" > typeof e.iv ? (0, ev.f)(e.iv, iz) : ts(12);
            return iQ({
              type: t,
              sealed: ir((0, ev.f)(e.symKey, iz), s).encrypt(
                (0, ev.f)(e.message, iH),
              ),
              iv: s,
              senderPublicKey: i,
              encoding: e.encoding,
            });
          })({
            type: o,
            symKey: a,
            message: r,
            senderPublicKey: c,
            encoding: i?.encoding,
          });
        }),
        r$(this, "decode", async (e, t, i) => {
          let s;
          this.isInitialized();
          let r = iZ({
            type: iG((s = iJ({ encoded: t, encoding: i?.encoding })).type),
            senderPublicKey:
              "u" > typeof s.senderPublicKey
                ? (0, ew.f)(s.senderPublicKey, iz)
                : void 0,
            receiverPublicKey: i?.receiverPublicKey,
          });
          if (2 === r.type) {
            let e = (function (e, t) {
              let { sealed: i } = iJ({ encoded: e, encoding: t });
              return (0, ew.f)(i, iH);
            })(t, i?.encoding);
            return (0, ed.U)(e);
          }
          if (iX(r)) {
            let t = r.receiverPublicKey,
              i = r.senderPublicKey;
            e = await this.generateSharedKey(t, i);
          }
          try {
            let s = this.getSymKey(e),
              r = (function (e) {
                let t = (0, ev.f)(e.symKey, iz),
                  { sealed: i, iv: s } = iJ(e),
                  r = ir(t, s).decrypt(i);
                if (null === r) throw Error("Failed to decrypt");
                return (0, ew.f)(r, iH);
              })({ symKey: s, encoded: t, encoding: i?.encoding });
            return (0, ed.U)(r);
          } catch (t) {
            (this.logger.error(
              `Failed to decode message from topic: '${e}', clientId: '${await this.getClientId()}'`,
            ),
              this.logger.error(t));
          }
        }),
        r$(this, "getPayloadType", (e, t = iK) =>
          iG(iJ({ encoded: e, encoding: t }).type),
        ),
        r$(this, "getPayloadSenderPublicKey", (e, t = iK) => {
          let i = iJ({ encoded: e, encoding: t });
          return i.senderPublicKey ? (0, ew.f)(i.senderPublicKey, iz) : void 0;
        }),
        (this.core = e),
        (this.logger = (0, H.v)(t, this.name)),
        (this.keychain = i || new rq(this.core, this.logger)));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    async setPrivateKey(e, t) {
      return (await this.keychain.set(e, t), e);
    }
    getPrivateKey(e) {
      return this.keychain.get(e);
    }
    async getClientSeed() {
      let e = "";
      try {
        e = this.keychain.get(sS);
      } catch {
        ((e = iB()), await this.keychain.set(sS, e));
      }
      return (function (e, t = "utf8") {
        let i = rM[t];
        if (!i) throw Error(`Unsupported encoding "${t}"`);
        return ("utf8" === t || "utf-8" === t) &&
          null != globalThis.Buffer &&
          null != globalThis.Buffer.from
          ? globalThis.Buffer.from(e, "utf8")
          : i.decoder.decode(`${i.prefix}${e}`);
      })(e, "base16");
    }
    getSymKey(e) {
      return this.keychain.get(e);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rK = Object.defineProperty,
    rV = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rK(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rH extends Z {
    constructor(e, t) {
      (super(e, t),
        (this.logger = e),
        (this.core = t),
        rV(this, "messages", new Map()),
        rV(this, "name", "messages"),
        rV(this, "version", "0.3"),
        rV(this, "initialized", !1),
        rV(this, "storagePrefix", sA),
        rV(this, "init", async () => {
          if (!this.initialized) {
            this.logger.trace("Initialized");
            try {
              let e = await this.getRelayerMessages();
              ("u" > typeof e && (this.messages = e),
                this.logger.debug(
                  `Successfully Restored records for ${this.name}`,
                ),
                this.logger.trace({
                  type: "method",
                  method: "restore",
                  size: this.messages.size,
                }));
            } catch (e) {
              (this.logger.debug(`Failed to Restore records for ${this.name}`),
                this.logger.error(e));
            } finally {
              this.initialized = !0;
            }
          }
        }),
        rV(this, "set", async (e, t) => {
          this.isInitialized();
          let i = iW(t),
            s = this.messages.get(e);
          return (
            typeof s > "u" && (s = {}),
            "u" > typeof s[i] ||
              ((s[i] = t), this.messages.set(e, s), await this.persist()),
            i
          );
        }),
        rV(this, "get", (e) => {
          this.isInitialized();
          let t = this.messages.get(e);
          return (typeof t > "u" && (t = {}), t);
        }),
        rV(
          this,
          "has",
          (e, t) => (this.isInitialized(), "u" > typeof this.get(e)[iW(t)]),
        ),
        rV(this, "del", async (e) => {
          (this.isInitialized(), this.messages.delete(e), await this.persist());
        }),
        (this.logger = (0, H.v)(e, this.name)),
        (this.core = t));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    async setRelayerMessages(e) {
      await this.core.storage.setItem(this.storageKey, ej(e));
    }
    async getRelayerMessages() {
      let e = await this.core.storage.getItem(this.storageKey);
      return "u" > typeof e ? eU(e) : void 0;
    }
    async persist() {
      await this.setRelayerMessages(this.messages);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rB = Object.defineProperty,
    rF = Object.defineProperties,
    rW = Object.getOwnPropertyDescriptors,
    rY = Object.getOwnPropertySymbols,
    rG = Object.prototype.hasOwnProperty,
    rQ = Object.prototype.propertyIsEnumerable,
    rJ = (e, t, i) =>
      t in e
        ? rB(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    rZ = (e, t) => {
      for (var i in t || (t = {})) rG.call(t, i) && rJ(e, i, t[i]);
      if (rY) for (var i of rY(t)) rQ.call(t, i) && rJ(e, i, t[i]);
      return e;
    },
    rX = (e, t, i) => rJ(e, "symbol" != typeof t ? t + "" : t, i);
  class r0 extends X {
    constructor(e, t) {
      (super(e, t),
        (this.relayer = e),
        (this.logger = t),
        rX(this, "events", new z.EventEmitter()),
        rX(this, "name", "publisher"),
        rX(this, "queue", new Map()),
        rX(this, "publishTimeout", (0, ep.toMiliseconds)(ep.ONE_MINUTE)),
        rX(
          this,
          "initialPublishTimeout",
          (0, ep.toMiliseconds)(15 * ep.ONE_SECOND),
        ),
        rX(this, "needsTransportRestart", !1),
        rX(this, "publish", async (e, t, i) => {
          var s;
          (this.logger.debug("Publishing Payload"),
            this.logger.trace({
              type: "method",
              method: "publish",
              params: { topic: e, message: t, opts: i },
            }));
          let r = i?.ttl || sx,
            n = i0(i),
            a = i?.prompt || !1,
            o = i?.tag || 0,
            c = i?.id || (0, sE.f)().toString(),
            l = {
              topic: e,
              message: t,
              opts: {
                ttl: r,
                relay: n,
                prompt: a,
                tag: o,
                id: c,
                attestation: i?.attestation,
                tvf: i?.tvf,
              },
            },
            h = `Failed to publish payload, please try again. id:${c} tag:${o}`;
          try {
            let s = new Promise(async (s) => {
              let n = ({ id: e }) => {
                l.opts.id === e &&
                  (this.removeRequestFromQueue(e),
                  this.relayer.events.removeListener(sj, n),
                  s(l));
              };
              this.relayer.events.on(sj, n);
              let h = eL(
                new Promise((s, n) => {
                  this.rpcPublish({
                    topic: e,
                    message: t,
                    ttl: r,
                    prompt: a,
                    tag: o,
                    id: c,
                    attestation: i?.attestation,
                    tvf: i?.tvf,
                  })
                    .then(s)
                    .catch((e) => {
                      (this.logger.warn(e, e?.message), n(e));
                    });
                }),
                this.initialPublishTimeout,
                `Failed initial publish, retrying.... id:${c} tag:${o}`,
              );
              try {
                (await h, this.events.removeListener(sj, n));
              } catch (e) {
                (this.queue.set(c, rF(rZ({}, l), rW({ attempt: 1 }))),
                  this.logger.warn(e, e?.message));
              }
            });
            (this.logger.trace({
              type: "method",
              method: "publish",
              params: { id: c, topic: e, message: t, opts: i },
            }),
              await eL(s, this.publishTimeout, h));
          } catch (e) {
            if (
              (this.logger.debug("Failed to Publish Payload"),
              this.logger.error(e),
              null != (s = i?.internal) && s.throwOnFailedPublish)
            )
              throw e;
          } finally {
            this.queue.delete(c);
          }
        }),
        rX(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        rX(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        rX(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        rX(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.relayer = e),
        (this.logger = (0, H.v)(t, this.name)),
        this.registerEventListeners());
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    async rpcPublish(e) {
      var t, i, s, r;
      let {
          topic: n,
          message: a,
          ttl: o = sx,
          prompt: c,
          tag: l,
          id: h,
          attestation: p,
          tvf: d,
        } = e,
        u = {
          method: i1(i0().protocol).publish,
          params: rZ(
            { topic: n, message: a, ttl: o, prompt: c, tag: l, attestation: p },
            d,
          ),
          id: h,
        };
      (sn(null == (t = u.params) ? void 0 : t.prompt) &&
        (null == (i = u.params) || delete i.prompt),
        sn(null == (s = u.params) ? void 0 : s.tag) &&
          (null == (r = u.params) || delete r.tag),
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "message",
          direction: "outgoing",
          request: u,
        }));
      let g = await this.relayer.request(u);
      return (
        this.relayer.events.emit(sj, e),
        this.logger.debug("Successfully Published Payload"),
        g
      );
    }
    removeRequestFromQueue(e) {
      this.queue.delete(e);
    }
    checkQueue() {
      this.queue.forEach(async (e, t) => {
        let i = e.attempt + 1;
        this.queue.set(t, rF(rZ({}, e), rW({ attempt: i })));
        let { topic: s, message: r, opts: n, attestation: a } = e;
        (this.logger.warn(
          {},
          `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${i}`,
        ),
          await this.rpcPublish(
            rF(
              rZ({}, e),
              rW({
                topic: s,
                message: r,
                ttl: n.ttl,
                prompt: n.prompt,
                tag: n.tag,
                id: n.id,
                attestation: a,
                tvf: n.tvf,
              }),
            ),
          ),
          this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`));
      });
    }
    registerEventListeners() {
      (this.relayer.core.heartbeat.on(K.W.pulse, () => {
        if (this.needsTransportRestart) {
          ((this.needsTransportRestart = !1), this.relayer.events.emit(sM));
          return;
        }
        this.checkQueue();
      }),
        this.relayer.on(sR, (e) => {
          this.removeRequestFromQueue(e.id.toString());
        }));
    }
  }
  var r1 = Object.defineProperty,
    r2 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? r1(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class r5 {
    constructor() {
      (r2(this, "map", new Map()),
        r2(this, "set", (e, t) => {
          let i = this.get(e);
          this.exists(e, t) || this.map.set(e, [...i, t]);
        }),
        r2(this, "get", (e) => this.map.get(e) || []),
        r2(this, "exists", (e, t) => this.get(e).includes(t)),
        r2(this, "delete", (e, t) => {
          if (typeof t > "u") return void this.map.delete(e);
          if (!this.map.has(e)) return;
          let i = this.get(e);
          if (!this.exists(e, t)) return;
          let s = i.filter((e) => e !== t);
          s.length ? this.map.set(e, s) : this.map.delete(e);
        }),
        r2(this, "clear", () => {
          this.map.clear();
        }));
    }
    get topics() {
      return Array.from(this.map.keys());
    }
  }
  var r4 = Object.defineProperty,
    r8 = Object.defineProperties,
    r3 = Object.getOwnPropertyDescriptors,
    r6 = Object.getOwnPropertySymbols,
    r9 = Object.prototype.hasOwnProperty,
    r7 = Object.prototype.propertyIsEnumerable,
    ne = (e, t, i) =>
      t in e
        ? r4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nt = (e, t) => {
      for (var i in t || (t = {})) r9.call(t, i) && ne(e, i, t[i]);
      if (r6) for (var i of r6(t)) r7.call(t, i) && ne(e, i, t[i]);
      return e;
    },
    ni = (e, t, i) => ne(e, "symbol" != typeof t ? t + "" : t, i);
  class ns extends ei {
    constructor(e, t) {
      (super(e, t),
        (this.relayer = e),
        (this.logger = t),
        ni(this, "subscriptions", new Map()),
        ni(this, "topicMap", new r5()),
        ni(this, "events", new z.EventEmitter()),
        ni(this, "name", "subscription"),
        ni(this, "version", "0.3"),
        ni(this, "pending", new Map()),
        ni(this, "cached", []),
        ni(this, "initialized", !1),
        ni(this, "pendingSubscriptionWatchLabel", "pending_sub_watch_label"),
        ni(this, "pollingInterval", 20),
        ni(this, "storagePrefix", sA),
        ni(this, "subscribeTimeout", (0, ep.toMiliseconds)(ep.ONE_MINUTE)),
        ni(
          this,
          "initialSubscribeTimeout",
          (0, ep.toMiliseconds)(15 * ep.ONE_SECOND),
        ),
        ni(this, "clientId"),
        ni(this, "batchSubscribeTopicsLimit", 500),
        ni(this, "init", async () => {
          (this.initialized ||
            (this.logger.trace("Initialized"),
            this.registerEventListeners(),
            await this.restore()),
            (this.initialized = !0));
        }),
        ni(this, "subscribe", async (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Subscribing Topic"),
            this.logger.trace({
              type: "method",
              method: "subscribe",
              params: { topic: e, opts: t },
            }));
          try {
            let i = i0(t),
              s = { topic: e, relay: i, transportType: t?.transportType };
            this.pending.set(e, s);
            let r = await this.rpcSubscribe(e, i, t);
            return (
              "string" == typeof r &&
                (this.onSubscribe(r, s),
                this.logger.debug("Successfully Subscribed Topic"),
                this.logger.trace({
                  type: "method",
                  method: "subscribe",
                  params: { topic: e, opts: t },
                })),
              r
            );
          } catch (e) {
            throw (
              this.logger.debug("Failed to Subscribe Topic"),
              this.logger.error(e),
              e
            );
          }
        }),
        ni(this, "unsubscribe", async (e, t) => {
          (this.isInitialized(),
            "u" > typeof t?.id
              ? await this.unsubscribeById(e, t.id, t)
              : await this.unsubscribeByTopic(e, t));
        }),
        ni(this, "isSubscribed", async (e) => {
          if (this.topics.includes(e)) return !0;
          let t = `${this.pendingSubscriptionWatchLabel}_${e}`;
          return await new Promise((i, s) => {
            let r = new ep.Watch();
            r.start(t);
            let n = setInterval(() => {
              (((!this.pending.has(e) && this.topics.includes(e)) ||
                this.cached.some((t) => t.topic === e)) &&
                (clearInterval(n), r.stop(t), i(!0)),
                r.elapsed(t) >= sW &&
                  (clearInterval(n),
                  r.stop(t),
                  s(Error("Subscription resolution timeout"))));
            }, this.pollingInterval);
          }).catch(() => !1);
        }),
        ni(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        ni(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        ni(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        ni(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        ni(this, "start", async () => {
          await this.onConnect();
        }),
        ni(this, "stop", async () => {
          await this.onDisconnect();
        }),
        ni(this, "restart", async () => {
          (await this.restore(), await this.onRestart());
        }),
        ni(this, "checkPending", async () => {
          if (
            0 === this.pending.size &&
            (!this.initialized || !this.relayer.connected)
          )
            return;
          let e = [];
          (this.pending.forEach((t) => {
            e.push(t);
          }),
            await this.batchSubscribe(e));
        }),
        ni(this, "registerEventListeners", () => {
          (this.relayer.core.heartbeat.on(K.W.pulse, async () => {
            await this.checkPending();
          }),
            this.events.on(sB, async (e) => {
              (this.logger.info(`Emitting ${sB}`),
                this.logger.debug({ type: "event", event: sB, data: e }),
                await this.persist());
            }),
            this.events.on(sF, async (e) => {
              (this.logger.info(`Emitting ${sF}`),
                this.logger.debug({ type: "event", event: sF, data: e }),
                await this.persist());
            }));
        }),
        (this.relayer = e),
        (this.logger = (0, H.v)(t, this.name)),
        (this.clientId = ""));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.relayer.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    get length() {
      return this.subscriptions.size;
    }
    get ids() {
      return Array.from(this.subscriptions.keys());
    }
    get values() {
      return Array.from(this.subscriptions.values());
    }
    get topics() {
      return this.topicMap.topics;
    }
    get hasAnyTopics() {
      return (
        this.topicMap.topics.length > 0 ||
        this.pending.size > 0 ||
        this.cached.length > 0 ||
        this.subscriptions.size > 0
      );
    }
    hasSubscription(e, t) {
      let i = !1;
      try {
        i = this.getSubscription(e).topic === t;
      } catch {}
      return i;
    }
    reset() {
      ((this.cached = []), (this.initialized = !0));
    }
    onDisable() {
      ((this.cached = this.values),
        this.subscriptions.clear(),
        this.topicMap.clear());
    }
    async unsubscribeByTopic(e, t) {
      let i = this.topicMap.get(e);
      await Promise.all(
        i.map(async (i) => await this.unsubscribeById(e, i, t)),
      );
    }
    async unsubscribeById(e, t, i) {
      (this.logger.debug("Unsubscribing Topic"),
        this.logger.trace({
          type: "method",
          method: "unsubscribe",
          params: { topic: e, id: t, opts: i },
        }));
      try {
        let s = i0(i);
        (await this.restartToComplete({ topic: e, id: t, relay: s }),
          await this.rpcUnsubscribe(e, t, s));
        let r = si("USER_DISCONNECTED", `${this.name}, ${e}`);
        (await this.onUnsubscribe(e, t, r),
          this.logger.debug("Successfully Unsubscribed Topic"),
          this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: { topic: e, id: t, opts: i },
          }));
      } catch (e) {
        throw (
          this.logger.debug("Failed to Unsubscribe Topic"),
          this.logger.error(e),
          e
        );
      }
    }
    async rpcSubscribe(e, t, i) {
      var s;
      (i && i?.transportType !== sV) ||
        (await this.restartToComplete({ topic: e, id: e, relay: t }));
      let r = { method: i1(t.protocol).subscribe, params: { topic: e } };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: r,
        }));
      let n = null == (s = i?.internal) ? void 0 : s.throwOnFailedPublish;
      try {
        let t = await this.getSubscriptionId(e);
        if (i?.transportType === sK)
          return (
            setTimeout(
              () => {
                (this.relayer.connected || this.relayer.connecting) &&
                  this.relayer.request(r).catch((e) => this.logger.warn(e));
              },
              (0, ep.toMiliseconds)(ep.ONE_SECOND),
            ),
            t
          );
        let s = new Promise(async (t) => {
            let i = (s) => {
              s.topic === e && (this.events.removeListener(sB, i), t(s.id));
            };
            this.events.on(sB, i);
            try {
              let s = await eL(
                new Promise((e, t) => {
                  this.relayer
                    .request(r)
                    .catch((e) => {
                      (this.logger.warn(e, e?.message), t(e));
                    })
                    .then(e);
                }),
                this.initialSubscribeTimeout,
                `Subscribing to ${e} failed, please try again`,
              );
              (this.events.removeListener(sB, i), t(s));
            } catch {}
          }),
          a = await eL(
            s,
            this.subscribeTimeout,
            `Subscribing to ${e} failed, please try again`,
          );
        if (!a && n)
          throw Error(`Subscribing to ${e} failed, please try again`);
        return a ? t : null;
      } catch (e) {
        if (
          (this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
          this.relayer.events.emit(sM),
          n)
        )
          throw e;
      }
      return null;
    }
    async rpcBatchSubscribe(e) {
      if (!e.length) return;
      let t = {
        method: i1(e[0].relay.protocol).batchSubscribe,
        params: { topics: e.map((e) => e.topic) },
      };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: t,
        }));
      try {
        await await eL(
          new Promise((e) => {
            this.relayer
              .request(t)
              .catch((e) => this.logger.warn(e))
              .then(e);
          }),
          this.subscribeTimeout,
          "rpcBatchSubscribe failed, please try again",
        );
      } catch {
        this.relayer.events.emit(sM);
      }
    }
    async rpcBatchFetchMessages(e) {
      let t;
      if (!e.length) return;
      let i = {
        method: i1(e[0].relay.protocol).batchFetchMessages,
        params: { topics: e.map((e) => e.topic) },
      };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: i,
        }));
      try {
        t = await await eL(
          new Promise((e, t) => {
            this.relayer
              .request(i)
              .catch((e) => {
                (this.logger.warn(e), t(e));
              })
              .then(e);
          }),
          this.subscribeTimeout,
          "rpcBatchFetchMessages failed, please try again",
        );
      } catch {
        this.relayer.events.emit(sM);
      }
      return t;
    }
    rpcUnsubscribe(e, t, i) {
      let s = {
        method: i1(i.protocol).unsubscribe,
        params: { topic: e, id: t },
      };
      return (
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: s,
        }),
        this.relayer.request(s)
      );
    }
    onSubscribe(e, t) {
      (this.setSubscription(e, r8(nt({}, t), r3({ id: e }))),
        this.pending.delete(t.topic));
    }
    onBatchSubscribe(e) {
      e.length &&
        e.forEach((e) => {
          (this.setSubscription(e.id, nt({}, e)), this.pending.delete(e.topic));
        });
    }
    async onUnsubscribe(e, t, i) {
      (this.events.removeAllListeners(t),
        this.hasSubscription(t, e) && this.deleteSubscription(t, i),
        await this.relayer.messages.del(e));
    }
    async setRelayerSubscriptions(e) {
      await this.relayer.core.storage.setItem(this.storageKey, e);
    }
    async getRelayerSubscriptions() {
      return await this.relayer.core.storage.getItem(this.storageKey);
    }
    setSubscription(e, t) {
      (this.logger.debug("Setting subscription"),
        this.logger.trace({
          type: "method",
          method: "setSubscription",
          id: e,
          subscription: t,
        }),
        this.addSubscription(e, t));
    }
    addSubscription(e, t) {
      (this.subscriptions.set(e, nt({}, t)),
        this.topicMap.set(t.topic, e),
        this.events.emit(sB, t));
    }
    getSubscription(e) {
      (this.logger.debug("Getting subscription"),
        this.logger.trace({
          type: "method",
          method: "getSubscription",
          id: e,
        }));
      let t = this.subscriptions.get(e);
      if (!t) {
        let { message: t } = st("NO_MATCHING_KEY", `${this.name}: ${e}`);
        throw Error(t);
      }
      return t;
    }
    deleteSubscription(e, t) {
      (this.logger.debug("Deleting subscription"),
        this.logger.trace({
          type: "method",
          method: "deleteSubscription",
          id: e,
          reason: t,
        }));
      let i = this.getSubscription(e);
      (this.subscriptions.delete(e),
        this.topicMap.delete(i.topic, e),
        this.events.emit(sF, r8(nt({}, i), r3({ reason: t }))));
    }
    async persist() {
      (await this.setRelayerSubscriptions(this.values),
        this.events.emit("subscription_sync"));
    }
    async onRestart() {
      if (this.cached.length) {
        let e = [...this.cached],
          t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
        for (let i = 0; i < t; i++) {
          let t = e.splice(0, this.batchSubscribeTopicsLimit);
          await this.batchSubscribe(t);
        }
      }
      this.events.emit("subscription_resubscribed");
    }
    async restore() {
      try {
        let e = await this.getRelayerSubscriptions();
        if (typeof e > "u" || !e.length) return;
        if (this.subscriptions.size) {
          let { message: e } = st("RESTORE_WILL_OVERRIDE", this.name);
          throw (
            this.logger.error(e),
            this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
            Error(e)
          );
        }
        ((this.cached = e),
          this.logger.debug(
            `Successfully Restored subscriptions for ${this.name}`,
          ),
          this.logger.trace({
            type: "method",
            method: "restore",
            subscriptions: this.values,
          }));
      } catch (e) {
        (this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
          this.logger.error(e));
      }
    }
    async batchSubscribe(e) {
      e.length &&
        (await this.rpcBatchSubscribe(e),
        this.onBatchSubscribe(
          await Promise.all(
            e.map(async (e) =>
              r8(nt({}, e), r3({ id: await this.getSubscriptionId(e.topic) })),
            ),
          ),
        ));
    }
    async batchFetchMessages(e) {
      var t;
      if (!e.length) return;
      this.logger.trace(
        `Fetching batch messages for ${e.length} subscriptions`,
      );
      let i = await this.rpcBatchFetchMessages(e);
      i &&
        i.messages &&
        (await ((t = (0, ep.toMiliseconds)(ep.ONE_SECOND)),
        new Promise((e) => setTimeout(e, t))),
        await this.relayer.handleBatchMessageEvents(i.messages));
    }
    async onConnect() {
      (await this.restart(), this.reset());
    }
    onDisconnect() {
      this.onDisable();
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    async restartToComplete(e) {
      this.relayer.connected ||
        this.relayer.connecting ||
        (this.cached.push(e), await this.relayer.transportOpen());
    }
    async getClientId() {
      return (
        this.clientId ||
          (this.clientId = await this.relayer.core.crypto.getClientId()),
        this.clientId
      );
    }
    async getSubscriptionId(e) {
      return iW(e + (await this.getClientId()));
    }
  }
  var nr = Object.defineProperty,
    nn = Object.getOwnPropertySymbols,
    na = Object.prototype.hasOwnProperty,
    no = Object.prototype.propertyIsEnumerable,
    nc = (e, t, i) =>
      t in e
        ? nr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nl = (e, t) => {
      for (var i in t || (t = {})) na.call(t, i) && nc(e, i, t[i]);
      if (nn) for (var i of nn(t)) no.call(t, i) && nc(e, i, t[i]);
      return e;
    },
    nh = (e, t, i) => nc(e, "symbol" != typeof t ? t + "" : t, i);
  class np extends ee {
    constructor(t) {
      (super(t),
        nh(this, "protocol", "wc"),
        nh(this, "version", 2),
        nh(this, "core"),
        nh(this, "logger"),
        nh(this, "events", new z.EventEmitter()),
        nh(this, "provider"),
        nh(this, "messages"),
        nh(this, "subscriber"),
        nh(this, "publisher"),
        nh(this, "name", "relayer"),
        nh(this, "transportExplicitlyClosed", !1),
        nh(this, "initialized", !1),
        nh(this, "connectionAttemptInProgress", !1),
        nh(this, "relayUrl"),
        nh(this, "projectId"),
        nh(this, "packageName"),
        nh(this, "bundleId"),
        nh(this, "hasExperiencedNetworkDisruption", !1),
        nh(this, "pingTimeout"),
        nh(
          this,
          "heartBeatTimeout",
          (0, ep.toMiliseconds)(ep.THIRTY_SECONDS + ep.FIVE_SECONDS),
        ),
        nh(this, "reconnectTimeout"),
        nh(this, "connectPromise"),
        nh(this, "reconnectInProgress", !1),
        nh(this, "requestsInFlight", []),
        nh(this, "connectTimeout", (0, ep.toMiliseconds)(15 * ep.ONE_SECOND)),
        nh(this, "request", async (e) => {
          var t, i;
          this.logger.debug("Publishing Request Payload");
          let s = e.id || (0, sE.f)().toString();
          await this.toEstablishConnection();
          try {
            this.logger.trace(
              {
                id: s,
                method: e.method,
                topic: null == (t = e.params) ? void 0 : t.topic,
              },
              "relayer.request - publishing...",
            );
            let r = `${s}:${(null == (i = e.params) ? void 0 : i.tag) || ""}`;
            this.requestsInFlight.push(r);
            let n = await this.provider.request(e);
            return (
              (this.requestsInFlight = this.requestsInFlight.filter(
                (e) => e !== r,
              )),
              n
            );
          } catch (e) {
            throw (this.logger.debug(`Failed to Publish Request: ${s}`), e);
          }
        }),
        nh(this, "resetPingTimeout", () => {
          if (eO())
            try {
              (clearTimeout(this.pingTimeout),
                (this.pingTimeout = setTimeout(() => {
                  var e, t, i;
                  (this.logger.debug(
                    {},
                    "pingTimeout: Connection stalled, terminating...",
                  ),
                    null ==
                      (i =
                        null ==
                        (t =
                          null == (e = this.provider) ? void 0 : e.connection)
                          ? void 0
                          : t.socket) || i.terminate());
                }, this.heartBeatTimeout)));
            } catch (e) {
              this.logger.warn(e, e?.message);
            }
        }),
        nh(this, "onPayloadHandler", (e) => {
          (this.onProviderPayload(e), this.resetPingTimeout());
        }),
        nh(this, "onConnectHandler", () => {
          (this.logger.warn({}, "Relayer connected 🛜"),
            this.startPingTimeout(),
            this.events.emit("relayer_connect"));
        }),
        nh(this, "onDisconnectHandler", () => {
          (this.logger.warn({}, "Relayer disconnected 🛑"),
            (this.requestsInFlight = []),
            this.onProviderDisconnect());
        }),
        nh(this, "onProviderErrorHandler", (e) => {
          (this.logger.fatal(`Fatal socket error: ${e.message}`),
            this.events.emit("relayer_error", e),
            this.logger.fatal("Fatal socket error received, closing transport"),
            this.transportClose());
        }),
        nh(this, "registerProviderListeners", () => {
          (this.provider.on(sU, this.onPayloadHandler),
            this.provider.on(sq, this.onConnectHandler),
            this.provider.on(sL, this.onDisconnectHandler),
            this.provider.on(s$, this.onProviderErrorHandler));
        }),
        (this.core = t.core),
        (this.logger =
          "u" > typeof t.logger && "string" != typeof t.logger
            ? (0, H.v)(t.logger, this.name)
            : (0, B.pino)((0, H.l)({ level: t.logger || "error" }))),
        (this.messages = new rH(this.logger, t.core)),
        (this.subscriber = new ns(this, this.logger)),
        (this.publisher = new r0(this, this.logger)),
        (this.relayUrl = t?.relayUrl || sk),
        (this.projectId = t.projectId),
        eS() &&
        "u" > typeof (null == e.g ? void 0 : e.g.Platform) &&
        (null == e.g ? void 0 : e.g.Platform.OS) === "android"
          ? (this.packageName = ek())
          : eS() &&
            "u" > typeof (null == e.g ? void 0 : e.g.Platform) &&
            (null == e.g ? void 0 : e.g.Platform.OS) === "ios" &&
            (this.bundleId = ek()),
        (this.provider = {}));
    }
    async init() {
      if (
        (this.logger.trace("Initialized"),
        this.registerEventListeners(),
        await Promise.all([this.messages.init(), this.subscriber.init()]),
        (this.initialized = !0),
        this.subscriber.hasAnyTopics)
      )
        try {
          await this.transportOpen();
        } catch (e) {
          this.logger.warn(e, e?.message);
        }
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get connected() {
      var e, t, i;
      return (
        (null ==
        (i =
          null == (t = null == (e = this.provider) ? void 0 : e.connection)
            ? void 0
            : t.socket)
          ? void 0
          : i.readyState) === 1
      );
    }
    get connecting() {
      var e, t, i;
      return (
        (null ==
        (i =
          null == (t = null == (e = this.provider) ? void 0 : e.connection)
            ? void 0
            : t.socket)
          ? void 0
          : i.readyState) === 0 || void 0 !== this.connectPromise
      );
    }
    async publish(e, t, i) {
      (this.isInitialized(),
        await this.publisher.publish(e, t, i),
        await this.recordMessageEvent({
          topic: e,
          message: t,
          publishedAt: Date.now(),
          transportType: sV,
        }));
    }
    async subscribe(e, t) {
      var i, s, r;
      (this.isInitialized(),
        (null != t && t.transportType && t?.transportType !== "relay") ||
          (await this.toEstablishConnection()));
      let n =
          typeof (null == (i = t?.internal) ? void 0 : i.throwOnFailedPublish) >
            "u" ||
          (null == (s = t?.internal) ? void 0 : s.throwOnFailedPublish),
        a =
          (null == (r = this.subscriber.topicMap.get(e)) ? void 0 : r[0]) || "",
        o,
        c = (t) => {
          t.topic === e && (this.subscriber.off(sB, c), o());
        };
      return (
        await Promise.all([
          new Promise((e) => {
            ((o = e), this.subscriber.on(sB, c));
          }),
          new Promise(async (i, s) => {
            ((a =
              (await this.subscriber
                .subscribe(e, nl({ internal: { throwOnFailedPublish: n } }, t))
                .catch((e) => {
                  n && s(e);
                })) || a),
              i());
          }),
        ]),
        a
      );
    }
    async unsubscribe(e, t) {
      (this.isInitialized(), await this.subscriber.unsubscribe(e, t));
    }
    on(e, t) {
      this.events.on(e, t);
    }
    once(e, t) {
      this.events.once(e, t);
    }
    off(e, t) {
      this.events.off(e, t);
    }
    removeListener(e, t) {
      this.events.removeListener(e, t);
    }
    async transportDisconnect() {
      this.provider.disconnect &&
      (this.hasExperiencedNetworkDisruption || this.connected)
        ? await eL(
            this.provider.disconnect(),
            2e3,
            "provider.disconnect()",
          ).catch(() => this.onProviderDisconnect())
        : this.onProviderDisconnect();
    }
    async transportClose() {
      ((this.transportExplicitlyClosed = !0), await this.transportDisconnect());
    }
    async transportOpen(e) {
      if (!this.subscriber.hasAnyTopics)
        return void this.logger.warn(
          "Starting WS connection skipped because the client has no topics to work with.",
        );
      if (
        (this.connectPromise
          ? (this.logger.debug(
              {},
              "Waiting for existing connection attempt to resolve...",
            ),
            await this.connectPromise,
            this.logger.debug({}, "Existing connection attempt resolved"))
          : ((this.connectPromise = new Promise(async (t, i) => {
              await this.connect(e)
                .then(t)
                .catch(i)
                .finally(() => {
                  this.connectPromise = void 0;
                });
            })),
            await this.connectPromise),
        !this.connected)
      )
        throw Error(
          `Couldn't establish socket connection to the relay server: ${this.relayUrl}`,
        );
    }
    async restartTransport(e) {
      (this.logger.debug({}, "Restarting transport..."),
        this.connectionAttemptInProgress ||
          ((this.relayUrl = e || this.relayUrl),
          await this.confirmOnlineStateOrThrow(),
          await this.transportClose(),
          await this.transportOpen()));
    }
    async confirmOnlineStateOrThrow() {
      if (!(await sm()))
        throw Error(
          "No internet connection detected. Please restart your network and try again.",
        );
    }
    async handleBatchMessageEvents(e) {
      if (e?.length === 0)
        return void this.logger.trace(
          "Batch message events is empty. Ignoring...",
        );
      let t = e.sort((e, t) => e.publishedAt - t.publishedAt);
      for (let e of (this.logger.debug(
        `Batch of ${t.length} message events sorted`,
      ),
      t))
        try {
          await this.onMessageEvent(e);
        } catch (e) {
          this.logger.warn(
            e,
            "Error while processing batch message event: " + e?.message,
          );
        }
      this.logger.trace(`Batch of ${t.length} message events processed`);
    }
    async onLinkMessageEvent(e, t) {
      let { topic: i } = e;
      if (!t.sessionExists) {
        let e = eK(ep.FIVE_MINUTES);
        await this.core.pairing.pairings.set(i, {
          topic: i,
          expiry: e,
          relay: { protocol: "irn" },
          active: !1,
        });
      }
      (this.events.emit(sD, e), await this.recordMessageEvent(e));
    }
    async connect(e) {
      (await this.confirmOnlineStateOrThrow(),
        e &&
          e !== this.relayUrl &&
          ((this.relayUrl = e), await this.transportDisconnect()),
        (this.connectionAttemptInProgress = !0),
        (this.transportExplicitlyClosed = !1));
      let t = 1;
      for (; t < 6; ) {
        try {
          if (this.transportExplicitlyClosed) break;
          (this.logger.debug(
            {},
            `Connecting to ${this.relayUrl}, attempt: ${t}...`,
          ),
            await this.createProvider(),
            await new Promise(async (e, t) => {
              let i = () => {
                t(Error("Connection interrupted while trying to subscribe"));
              };
              (this.provider.once(sL, i),
                await eL(
                  new Promise((e, t) => {
                    this.provider.connect().then(e).catch(t);
                  }),
                  this.connectTimeout,
                  `Socket stalled when trying to connect to ${this.relayUrl}`,
                )
                  .catch((e) => {
                    t(e);
                  })
                  .finally(() => {
                    (this.provider.off(sL, i),
                      clearTimeout(this.reconnectTimeout));
                  }),
                await new Promise(async (e, t) => {
                  let i = () => {
                    t(
                      Error("Connection interrupted while trying to subscribe"),
                    );
                  };
                  (this.provider.once(sL, i),
                    await this.subscriber
                      .start()
                      .then(e)
                      .catch(t)
                      .finally(() => {
                        this.provider.off(sL, i);
                      }));
                }),
                (this.hasExperiencedNetworkDisruption = !1),
                e());
            }));
        } catch (e) {
          (await this.subscriber.stop(),
            this.logger.warn({}, e.message),
            (this.hasExperiencedNetworkDisruption = !0));
        } finally {
          this.connectionAttemptInProgress = !1;
        }
        if (this.connected) {
          this.logger.debug(
            {},
            `Connected to ${this.relayUrl} successfully on attempt: ${t}`,
          );
          break;
        }
        (await new Promise((e) => setTimeout(e, (0, ep.toMiliseconds)(+t))),
          t++);
      }
    }
    startPingTimeout() {
      var e, t, i, s, r;
      if (eO())
        try {
          (null != (t = null == (e = this.provider) ? void 0 : e.connection) &&
            t.socket &&
            (null ==
              (r =
                null ==
                (s = null == (i = this.provider) ? void 0 : i.connection)
                  ? void 0
                  : s.socket) ||
              r.on("ping", () => {
                this.resetPingTimeout();
              })),
            this.resetPingTimeout());
        } catch (e) {
          this.logger.warn(e, e?.message);
        }
    }
    async createProvider() {
      this.provider.connection && this.unregisterProviderListeners();
      let e = await this.core.crypto.signJWT(this.relayUrl);
      ((this.provider = new sI.f(
        new s_.f(
          (function ({
            protocol: e,
            version: t,
            relayUrl: i,
            sdkVersion: s,
            auth: r,
            projectId: n,
            useOnCloseEvent: a,
            bundleId: o,
            packageName: c,
          }) {
            let l = i.split("?"),
              h = eR(e, t, s),
              p = (function (e, t) {
                let i = new URLSearchParams(e);
                for (let e of Object.keys(t).sort())
                  if (t.hasOwnProperty(e)) {
                    let s = t[e];
                    void 0 !== s && i.set(e, s);
                  }
                return i.toString();
              })(l[1] || "", {
                auth: r,
                ua: h,
                projectId: n,
                useOnCloseEvent: a || void 0,
                packageName: c || void 0,
                bundleId: o || void 0,
              });
            return l[0] + "?" + p;
          })({
            sdkVersion: sz,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: e,
            useOnCloseEvent: !0,
            bundleId: this.bundleId,
            packageName: this.packageName,
          }),
        ),
      )),
        this.registerProviderListeners());
    }
    async recordMessageEvent(e) {
      let { topic: t, message: i } = e;
      await this.messages.set(t, i);
    }
    async shouldIgnoreMessageEvent(e) {
      let { topic: t, message: i } = e;
      if (!i || 0 === i.length)
        return (this.logger.warn(`Ignoring invalid/empty message: ${i}`), !0);
      if (!(await this.subscriber.isSubscribed(t)))
        return (
          this.logger.warn(`Ignoring message for non-subscribed topic ${t}`),
          !0
        );
      let s = this.messages.has(t, i);
      return (s && this.logger.warn(`Ignoring duplicate message: ${i}`), s);
    }
    async onProviderPayload(e) {
      if (
        (this.logger.debug("Incoming Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "incoming",
          payload: e,
        }),
        (0, sN.N)(e))
      ) {
        if (!e.method.endsWith("_subscription")) return;
        let t = e.params,
          { topic: i, message: s, publishedAt: r, attestation: n } = t.data,
          a = {
            topic: i,
            message: s,
            publishedAt: r,
            transportType: sV,
            attestation: n,
          };
        (this.logger.debug("Emitting Relayer Payload"),
          this.logger.trace(nl({ type: "event", event: t.id }, a)),
          this.events.emit(t.id, a),
          await this.acknowledgePayload(e),
          await this.onMessageEvent(a));
      } else (0, sN.Z)(e) && this.events.emit(sR, e);
    }
    async onMessageEvent(e) {
      (await this.shouldIgnoreMessageEvent(e)) ||
        (this.events.emit(sD, e), await this.recordMessageEvent(e));
    }
    async acknowledgePayload(e) {
      let t = (0, sE.P)(e.id, !0);
      await this.provider.connection.send(t);
    }
    unregisterProviderListeners() {
      (this.provider.off(sU, this.onPayloadHandler),
        this.provider.off(sq, this.onConnectHandler),
        this.provider.off(sL, this.onDisconnectHandler),
        this.provider.off(s$, this.onProviderErrorHandler),
        clearTimeout(this.pingTimeout));
    }
    async registerEventListeners() {
      let t = await sm();
      var i,
        s,
        r = async (e) => {
          t !== e &&
            ((t = e),
            e
              ? await this.transportOpen().catch((e) =>
                  this.logger.error(e, e?.message),
                )
              : ((this.hasExperiencedNetworkDisruption = !0),
                await this.transportDisconnect(),
                (this.transportExplicitlyClosed = !1)));
        };
      switch (ex()) {
        case eA:
          ((i = r),
            !eS() &&
              eT() &&
              (window.addEventListener("online", () => i(!0)),
              window.addEventListener("offline", () => i(!1))));
          break;
        case eC:
          ((s = r),
            eS() &&
              null != e.g &&
              e.g.NetInfo &&
              e.g?.NetInfo.addEventListener((e) => s(e?.isConnected)));
      }
    }
    async onProviderDisconnect() {
      (clearTimeout(this.pingTimeout),
        this.events.emit("relayer_disconnect"),
        (this.connectionAttemptInProgress = !1),
        !this.reconnectInProgress &&
          ((this.reconnectInProgress = !0),
          await this.subscriber.stop(),
          this.subscriber.hasAnyTopics &&
            (this.transportExplicitlyClosed ||
              (this.reconnectTimeout = setTimeout(
                async () => {
                  (await this.transportOpen().catch((e) =>
                    this.logger.error(e, e?.message),
                  ),
                    (this.reconnectTimeout = void 0),
                    (this.reconnectInProgress = !1));
                },
                (0, ep.toMiliseconds)(0.1),
              )))));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    async toEstablishConnection() {
      (await this.confirmOnlineStateOrThrow(),
        this.connected || (await this.connect()));
    }
  }
  var nd = Object.defineProperty,
    nu = Object.getOwnPropertySymbols,
    ng = Object.prototype.hasOwnProperty,
    nf = Object.prototype.propertyIsEnumerable,
    ny = (e, t, i) =>
      t in e
        ? nd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nm = (e, t) => {
      for (var i in t || (t = {})) ng.call(t, i) && ny(e, i, t[i]);
      if (nu) for (var i of nu(t)) nf.call(t, i) && ny(e, i, t[i]);
      return e;
    },
    nw = (e, t, i) => ny(e, "symbol" != typeof t ? t + "" : t, i);
  class nv extends et {
    constructor(e, t, i, s = sA, r) {
      (super(e, t, i, s),
        (this.core = e),
        (this.logger = t),
        (this.name = i),
        nw(this, "map", new Map()),
        nw(this, "version", "0.3"),
        nw(this, "cached", []),
        nw(this, "initialized", !1),
        nw(this, "getKey"),
        nw(this, "storagePrefix", sA),
        nw(this, "recentlyDeleted", []),
        nw(this, "recentlyDeletedLimit", 200),
        nw(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => {
              var t;
              this.getKey && null !== e && !sn(e)
                ? this.map.set(this.getKey(e), e)
                : (null == (t = e?.proposer) ? void 0 : t.publicKey)
                  ? this.map.set(e.id, e)
                  : e?.topic && this.map.set(e.topic, e);
            }),
            (this.cached = []),
            (this.initialized = !0));
        }),
        nw(this, "set", async (e, t) => {
          (this.isInitialized(),
            this.map.has(e)
              ? await this.update(e, t)
              : (this.logger.debug("Setting value"),
                this.logger.trace({
                  type: "method",
                  method: "set",
                  key: e,
                  value: t,
                }),
                this.map.set(e, t),
                await this.persist()));
        }),
        nw(
          this,
          "get",
          (e) => (
            this.isInitialized(),
            this.logger.debug("Getting value"),
            this.logger.trace({ type: "method", method: "get", key: e }),
            this.getData(e)
          ),
        ),
        nw(
          this,
          "getAll",
          (e) => (
            this.isInitialized(),
            e
              ? this.values.filter((t) =>
                  Object.keys(e).every((i) => (0, sC.default)(t[i], e[i])),
                )
              : this.values
          ),
        ),
        nw(this, "update", async (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Updating value"),
            this.logger.trace({
              type: "method",
              method: "update",
              key: e,
              update: t,
            }));
          let i = nm(nm({}, this.getData(e)), t);
          (this.map.set(e, i), await this.persist());
        }),
        nw(this, "delete", async (e, t) => {
          (this.isInitialized(),
            this.map.has(e) &&
              (this.logger.debug("Deleting value"),
              this.logger.trace({
                type: "method",
                method: "delete",
                key: e,
                reason: t,
              }),
              this.map.delete(e),
              this.addToRecentlyDeleted(e),
              await this.persist()));
        }),
        (this.logger = (0, H.v)(t, this.name)),
        (this.storagePrefix = s),
        (this.getKey = r));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    get length() {
      return this.map.size;
    }
    get keys() {
      return Array.from(this.map.keys());
    }
    get values() {
      return Array.from(this.map.values());
    }
    addToRecentlyDeleted(e) {
      (this.recentlyDeleted.push(e),
        this.recentlyDeleted.length >= this.recentlyDeletedLimit &&
          this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2));
    }
    async setDataStore(e) {
      await this.core.storage.setItem(this.storageKey, e);
    }
    async getDataStore() {
      return await this.core.storage.getItem(this.storageKey);
    }
    getData(e) {
      let t = this.map.get(e);
      if (!t) {
        if (this.recentlyDeleted.includes(e)) {
          let { message: t } = st(
            "MISSING_OR_INVALID",
            `Record was recently deleted - ${this.name}: ${e}`,
          );
          throw (this.logger.error(t), Error(t));
        }
        let { message: t } = st("NO_MATCHING_KEY", `${this.name}: ${e}`);
        throw (this.logger.error(t), Error(t));
      }
      return t;
    }
    async persist() {
      await this.setDataStore(this.values);
    }
    async restore() {
      try {
        let e = await this.getDataStore();
        if (typeof e > "u" || !e.length) return;
        if (this.map.size) {
          let { message: e } = st("RESTORE_WILL_OVERRIDE", this.name);
          throw (this.logger.error(e), Error(e));
        }
        ((this.cached = e),
          this.logger.debug(`Successfully Restored value for ${this.name}`),
          this.logger.trace({
            type: "method",
            method: "restore",
            value: this.values,
          }));
      } catch (e) {
        (this.logger.debug(`Failed to Restore value for ${this.name}`),
          this.logger.error(e));
      }
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var nb = Object.defineProperty,
    nI = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nb(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nE {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        nI(this, "name", "pairing"),
        nI(this, "version", "0.3"),
        nI(this, "events", new z.default()),
        nI(this, "pairings"),
        nI(this, "initialized", !1),
        nI(this, "storagePrefix", sA),
        nI(this, "ignoredPayloadTypes", [1]),
        nI(this, "registeredMethods", []),
        nI(this, "init", async () => {
          this.initialized ||
            (await this.pairings.init(),
            await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            (this.initialized = !0),
            this.logger.trace("Initialized"));
        }),
        nI(this, "register", ({ methods: e }) => {
          (this.isInitialized(),
            (this.registeredMethods = [
              ...new Set([...this.registeredMethods, ...e]),
            ]));
        }),
        nI(this, "create", async (e) => {
          this.isInitialized();
          let t = iB(),
            i = await this.core.crypto.setSymKey(t),
            s = eK(ep.FIVE_MINUTES),
            r = { protocol: "irn" },
            n = {
              topic: i,
              expiry: s,
              relay: r,
              active: !1,
              methods: e?.methods,
            },
            a = i5({
              protocol: this.core.protocol,
              version: this.core.version,
              topic: i,
              symKey: t,
              relay: r,
              expiryTimestamp: s,
              methods: e?.methods,
            });
          return (
            this.events.emit(sG, n),
            this.core.expirer.set(i, s),
            await this.pairings.set(i, n),
            await this.core.relayer.subscribe(i, {
              transportType: e?.transportType,
            }),
            { topic: i, uri: a }
          );
        }),
        nI(this, "pair", async (e) => {
          let t;
          this.isInitialized();
          let i = this.core.eventClient.createEvent({
            properties: { topic: e?.uri, trace: ["pairing_started"] },
          });
          this.isValidPair(e, i);
          let {
            topic: s,
            symKey: r,
            relay: n,
            expiryTimestamp: a,
            methods: o,
          } = i2(e.uri);
          if (
            ((i.props.properties.topic = s),
            i.addTrace("pairing_uri_validation_success"),
            i.addTrace("pairing_uri_not_expired"),
            this.pairings.keys.includes(s))
          ) {
            if (
              ((t = this.pairings.get(s)),
              i.addTrace("existing_pairing"),
              t.active)
            )
              throw (
                i.setError("active_pairing_already_exists"),
                Error(
                  `Pairing already exists: ${s}. Please try again with a new connection URI.`,
                )
              );
            i.addTrace("pairing_not_expired");
          }
          let c = a || eK(ep.FIVE_MINUTES),
            l = { topic: s, relay: n, expiry: c, active: !1, methods: o };
          (this.core.expirer.set(s, c),
            await this.pairings.set(s, l),
            i.addTrace("store_new_pairing"),
            e.activatePairing && (await this.activate({ topic: s })),
            this.events.emit(sG, l),
            i.addTrace("emit_inactive_pairing"),
            this.core.crypto.keychain.has(s) ||
              (await this.core.crypto.setSymKey(r, s)),
            i.addTrace("subscribing_pairing_topic"));
          try {
            await this.core.relayer.confirmOnlineStateOrThrow();
          } catch {
            i.setError("no_internet_connection");
          }
          try {
            await this.core.relayer.subscribe(s, { relay: n });
          } catch (e) {
            throw (i.setError("subscribe_pairing_topic_failure"), e);
          }
          return (i.addTrace("subscribe_pairing_topic_success"), l);
        }),
        nI(this, "activate", async ({ topic: e }) => {
          this.isInitialized();
          let t = eK(ep.FIVE_MINUTES);
          (this.core.expirer.set(e, t),
            await this.pairings.update(e, { active: !0, expiry: t }));
        }),
        nI(this, "ping", async (e) => {
          (this.isInitialized(),
            await this.isValidPing(e),
            this.logger.warn(
              "ping() is deprecated and will be removed in the next major release.",
            ));
          let { topic: t } = e;
          if (this.pairings.keys.includes(t)) {
            let e = await this.sendRequest(t, "wc_pairingPing", {}),
              { done: i, resolve: s, reject: r } = eq();
            (this.events.once(eH("pairing_ping", e), ({ error: e }) => {
              e ? r(e) : s();
            }),
              await i());
          }
        }),
        nI(this, "updateExpiry", async ({ topic: e, expiry: t }) => {
          (this.isInitialized(), await this.pairings.update(e, { expiry: t }));
        }),
        nI(this, "updateMetadata", async ({ topic: e, metadata: t }) => {
          (this.isInitialized(),
            await this.pairings.update(e, { peerMetadata: t }));
        }),
        nI(
          this,
          "getPairings",
          () => (this.isInitialized(), this.pairings.values),
        ),
        nI(this, "disconnect", async (e) => {
          (this.isInitialized(), await this.isValidDisconnect(e));
          let { topic: t } = e;
          this.pairings.keys.includes(t) &&
            (await this.sendRequest(
              t,
              "wc_pairingDelete",
              si("USER_DISCONNECTED"),
            ),
            await this.deletePairing(t));
        }),
        nI(this, "formatUriFromPairing", (e) => {
          this.isInitialized();
          let { topic: t, relay: i, expiry: s, methods: r } = e,
            n = this.core.crypto.keychain.get(t);
          return i5({
            protocol: this.core.protocol,
            version: this.core.version,
            topic: t,
            symKey: n,
            relay: i,
            expiryTimestamp: s,
            methods: r,
          });
        }),
        nI(this, "sendRequest", async (e, t, i) => {
          let s = (0, sE.i)(t, i),
            r = await this.core.crypto.encode(e, s),
            n = sY[t].req;
          return (
            this.core.history.set(e, s),
            this.core.relayer.publish(e, r, n),
            s.id
          );
        }),
        nI(this, "sendResult", async (e, t, i) => {
          let s = (0, sE.P)(e, i),
            r = await this.core.crypto.encode(t, s),
            n = sY[(await this.core.history.get(t, e)).request.method].res;
          (await this.core.relayer.publish(t, r, n),
            await this.core.history.resolve(s));
        }),
        nI(this, "sendError", async (e, t, i) => {
          let s = (0, sE.U)(e, i),
            r = await this.core.crypto.encode(t, s),
            n = (await this.core.history.get(t, e)).request.method,
            a = sY[n] ? sY[n].res : sY.unregistered_method.res;
          (await this.core.relayer.publish(t, r, a),
            await this.core.history.resolve(s));
        }),
        nI(this, "deletePairing", async (e, t) => {
          (await this.core.relayer.unsubscribe(e),
            await Promise.all([
              this.pairings.delete(e, si("USER_DISCONNECTED")),
              this.core.crypto.deleteSymKey(e),
              t ? Promise.resolve() : this.core.expirer.del(e),
            ]));
        }),
        nI(this, "cleanup", async () => {
          let e = this.pairings.getAll().filter((e) => eV(e.expiry));
          await Promise.all(e.map((e) => this.deletePairing(e.topic)));
        }),
        nI(this, "onRelayEventRequest", (e) => {
          let { topic: t, payload: i } = e;
          switch (i.method) {
            case "wc_pairingPing":
              return this.onPairingPingRequest(t, i);
            case "wc_pairingDelete":
              return this.onPairingDeleteRequest(t, i);
            default:
              return this.onUnknownRpcMethodRequest(t, i);
          }
        }),
        nI(this, "onRelayEventResponse", async (e) => {
          let { topic: t, payload: i } = e,
            s = (await this.core.history.get(t, i.id)).request.method;
          return "wc_pairingPing" === s
            ? this.onPairingPingResponse(t, i)
            : this.onUnknownRpcMethodResponse(s);
        }),
        nI(this, "onPairingPingRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidPing({ topic: e }),
              await this.sendResult(i, e, !0),
              this.events.emit("pairing_ping", { id: i, topic: e }));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        nI(this, "onPairingPingResponse", (e, t) => {
          let { id: i } = t;
          setTimeout(() => {
            (0, sN.t)(t)
              ? this.events.emit(eH("pairing_ping", i), {})
              : (0, sN.x)(t) &&
                this.events.emit(eH("pairing_ping", i), { error: t.error });
          }, 500);
        }),
        nI(this, "onPairingDeleteRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidDisconnect({ topic: e }),
              await this.deletePairing(e),
              this.events.emit(sQ, { id: i, topic: e }));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        nI(this, "onUnknownRpcMethodRequest", async (e, t) => {
          let { id: i, method: s } = t;
          try {
            if (this.registeredMethods.includes(s)) return;
            let t = si("WC_METHOD_UNSUPPORTED", s);
            (await this.sendError(i, e, t), this.logger.error(t));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        nI(this, "onUnknownRpcMethodResponse", (e) => {
          this.registeredMethods.includes(e) ||
            this.logger.error(si("WC_METHOD_UNSUPPORTED", e));
        }),
        nI(this, "isValidPair", (e, t) => {
          var i;
          if (!su(e)) {
            let { message: i } = st(
              "MISSING_OR_INVALID",
              `pair() params: ${e}`,
            );
            throw (t.setError(s3), Error(i));
          }
          if (
            !(function (e) {
              function t(e) {
                try {
                  return "u" > typeof new URL(e);
                } catch {
                  return !1;
                }
              }
              try {
                if (sa(e, !1)) {
                  if (t(e)) return !0;
                  let i = eJ(e);
                  return t(i);
                }
              } catch {}
              return !1;
            })(e.uri)
          ) {
            let { message: i } = st(
              "MISSING_OR_INVALID",
              `pair() uri: ${e.uri}`,
            );
            throw (t.setError(s3), Error(i));
          }
          let s = i2(e?.uri);
          if (!(null != (i = s?.relay) && i.protocol)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              "pair() uri#relay-protocol",
            );
            throw (t.setError(s3), Error(e));
          }
          if (!(null != s && s.symKey)) {
            let { message: e } = st("MISSING_OR_INVALID", "pair() uri#symKey");
            throw (t.setError(s3), Error(e));
          }
          if (
            null != s &&
            s.expiryTimestamp &&
            (0, ep.toMiliseconds)(s?.expiryTimestamp) < Date.now()
          ) {
            t.setError("pairing_expired");
            let { message: e } = st(
              "EXPIRED",
              "pair() URI has expired. Please try again with a new connection URI.",
            );
            throw Error(e);
          }
        }),
        nI(this, "isValidPing", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `ping() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidPairingTopic(t);
        }),
        nI(this, "isValidDisconnect", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `disconnect() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidPairingTopic(t);
        }),
        nI(this, "isValidPairingTopic", async (e) => {
          if (!sa(e, !1)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `pairing topic should be a string: ${e}`,
            );
            throw Error(t);
          }
          if (!this.pairings.keys.includes(e)) {
            let { message: t } = st(
              "NO_MATCHING_KEY",
              `pairing topic doesn't exist: ${e}`,
            );
            throw Error(t);
          }
          if (eV(this.pairings.get(e).expiry)) {
            await this.deletePairing(e);
            let { message: t } = st("EXPIRED", `pairing topic: ${e}`);
            throw Error(t);
          }
        }),
        (this.core = e),
        (this.logger = (0, H.v)(t, this.name)),
        (this.pairings = new nv(
          this.core,
          this.logger,
          this.name,
          this.storagePrefix,
        )));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    registerRelayerEvents() {
      this.core.relayer.on(sD, async (e) => {
        let { topic: t, message: i, transportType: s } = e;
        if (
          !this.pairings.keys.includes(t) ||
          s === sK ||
          this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))
        )
          return;
        let r = await this.core.crypto.decode(t, i);
        try {
          (0, sN.N)(r)
            ? (this.core.history.set(t, r),
              this.onRelayEventRequest({ topic: t, payload: r }))
            : (0, sN.Z)(r) &&
              (await this.core.history.resolve(r),
              await this.onRelayEventResponse({ topic: t, payload: r }),
              this.core.history.delete(t, r.id));
        } catch (e) {
          this.logger.error(e);
        }
      });
    }
    registerExpirerEvents() {
      this.core.expirer.on(s2, async (e) => {
        let { topic: t } = ez(e.target);
        t &&
          this.pairings.keys.includes(t) &&
          (await this.deletePairing(t, !0),
          this.events.emit("pairing_expire", { topic: t }));
      });
    }
  }
  var nN = Object.defineProperty,
    n_ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nN(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nC extends J {
    constructor(e, t) {
      (super(e, t),
        (this.core = e),
        (this.logger = t),
        n_(this, "records", new Map()),
        n_(this, "events", new z.EventEmitter()),
        n_(this, "name", "history"),
        n_(this, "version", "0.3"),
        n_(this, "cached", []),
        n_(this, "initialized", !1),
        n_(this, "storagePrefix", sA),
        n_(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => this.records.set(e.id, e)),
            (this.cached = []),
            this.registerEventListeners(),
            (this.initialized = !0));
        }),
        n_(this, "set", (e, t, i) => {
          if (
            (this.isInitialized(),
            this.logger.debug("Setting JSON-RPC request history record"),
            this.logger.trace({
              type: "method",
              method: "set",
              topic: e,
              request: t,
              chainId: i,
            }),
            this.records.has(t.id))
          )
            return;
          let s = {
            id: t.id,
            topic: e,
            request: { method: t.method, params: t.params || null },
            chainId: i,
            expiry: eK(ep.THIRTY_DAYS),
          };
          (this.records.set(s.id, s), this.persist(), this.events.emit(sJ, s));
        }),
        n_(this, "resolve", async (e) => {
          if (
            (this.isInitialized(),
            this.logger.debug("Updating JSON-RPC response history record"),
            this.logger.trace({
              type: "method",
              method: "update",
              response: e,
            }),
            !this.records.has(e.id))
          )
            return;
          let t = await this.getRecord(e.id);
          typeof t.response > "u" &&
            ((t.response = (0, sN.x)(e)
              ? { error: e.error }
              : { result: e.result }),
            this.records.set(t.id, t),
            this.persist(),
            this.events.emit(sZ, t));
        }),
        n_(
          this,
          "get",
          async (e, t) => (
            this.isInitialized(),
            this.logger.debug("Getting record"),
            this.logger.trace({
              type: "method",
              method: "get",
              topic: e,
              id: t,
            }),
            await this.getRecord(t)
          ),
        ),
        n_(this, "delete", (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Deleting record"),
            this.logger.trace({ type: "method", method: "delete", id: t }),
            this.values.forEach((i) => {
              i.topic === e &&
                (("u" > typeof t && i.id !== t) ||
                  (this.records.delete(i.id), this.events.emit(sX, i)));
            }),
            this.persist());
        }),
        n_(
          this,
          "exists",
          async (e, t) => (
            this.isInitialized(),
            !!this.records.has(t) && (await this.getRecord(t)).topic === e
          ),
        ),
        n_(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        n_(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        n_(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        n_(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.logger = (0, H.v)(t, this.name)));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    get size() {
      return this.records.size;
    }
    get keys() {
      return Array.from(this.records.keys());
    }
    get values() {
      return Array.from(this.records.values());
    }
    get pending() {
      let e = [];
      return (
        this.values.forEach((t) => {
          if ("u" > typeof t.response) return;
          let i = {
            topic: t.topic,
            request: (0, sE.i)(t.request.method, t.request.params, t.id),
            chainId: t.chainId,
          };
          return e.push(i);
        }),
        e
      );
    }
    async setJsonRpcRecords(e) {
      await this.core.storage.setItem(this.storageKey, e);
    }
    async getJsonRpcRecords() {
      return await this.core.storage.getItem(this.storageKey);
    }
    getRecord(e) {
      this.isInitialized();
      let t = this.records.get(e);
      if (!t) {
        let { message: t } = st("NO_MATCHING_KEY", `${this.name}: ${e}`);
        throw Error(t);
      }
      return t;
    }
    async persist() {
      (await this.setJsonRpcRecords(this.values),
        this.events.emit("history_sync"));
    }
    async restore() {
      try {
        let e = await this.getJsonRpcRecords();
        if (typeof e > "u" || !e.length) return;
        if (this.records.size) {
          let { message: e } = st("RESTORE_WILL_OVERRIDE", this.name);
          throw (this.logger.error(e), Error(e));
        }
        ((this.cached = e),
          this.logger.debug(`Successfully Restored records for ${this.name}`),
          this.logger.trace({
            type: "method",
            method: "restore",
            records: this.values,
          }));
      } catch (e) {
        (this.logger.debug(`Failed to Restore records for ${this.name}`),
          this.logger.error(e));
      }
    }
    registerEventListeners() {
      (this.events.on(sJ, (e) => {
        (this.logger.info(`Emitting ${sJ}`),
          this.logger.debug({ type: "event", event: sJ, record: e }));
      }),
        this.events.on(sZ, (e) => {
          (this.logger.info(`Emitting ${sZ}`),
            this.logger.debug({ type: "event", event: sZ, record: e }));
        }),
        this.events.on(sX, (e) => {
          (this.logger.info(`Emitting ${sX}`),
            this.logger.debug({ type: "event", event: sX, record: e }));
        }),
        this.core.heartbeat.on(K.W.pulse, () => {
          this.cleanup();
        }));
    }
    cleanup() {
      try {
        this.isInitialized();
        let e = !1;
        (this.records.forEach((t) => {
          (0, ep.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 &&
            (this.logger.info(`Deleting expired history log: ${t.id}`),
            this.records.delete(t.id),
            this.events.emit(sX, t, !1),
            (e = !0));
        }),
          e && this.persist());
      } catch (e) {
        this.logger.warn(e);
      }
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var nP = Object.defineProperty,
    nA = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nP(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nO extends es {
    constructor(e, t) {
      (super(e, t),
        (this.core = e),
        (this.logger = t),
        nA(this, "expirations", new Map()),
        nA(this, "events", new z.EventEmitter()),
        nA(this, "name", "expirer"),
        nA(this, "version", "0.3"),
        nA(this, "cached", []),
        nA(this, "initialized", !1),
        nA(this, "storagePrefix", sA),
        nA(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => this.expirations.set(e.target, e)),
            (this.cached = []),
            this.registerEventListeners(),
            (this.initialized = !0));
        }),
        nA(this, "has", (e) => {
          try {
            let t = this.formatTarget(e);
            return "u" > typeof this.getExpiration(t);
          } catch {
            return !1;
          }
        }),
        nA(this, "set", (e, t) => {
          this.isInitialized();
          let i = this.formatTarget(e),
            s = { target: i, expiry: t };
          (this.expirations.set(i, s),
            this.checkExpiry(i, s),
            this.events.emit(s0, { target: i, expiration: s }));
        }),
        nA(this, "get", (e) => {
          this.isInitialized();
          let t = this.formatTarget(e);
          return this.getExpiration(t);
        }),
        nA(this, "del", (e) => {
          if ((this.isInitialized(), this.has(e))) {
            let t = this.formatTarget(e),
              i = this.getExpiration(t);
            (this.expirations.delete(t),
              this.events.emit(s1, { target: t, expiration: i }));
          }
        }),
        nA(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        nA(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        nA(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        nA(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.logger = (0, H.v)(t, this.name)));
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name
      );
    }
    get length() {
      return this.expirations.size;
    }
    get keys() {
      return Array.from(this.expirations.keys());
    }
    get values() {
      return Array.from(this.expirations.values());
    }
    formatTarget(e) {
      if ("string" == typeof e) return e$("topic", e);
      if ("number" == typeof e) return e$("id", e);
      let { message: t } = st("UNKNOWN_TYPE", `Target type: ${typeof e}`);
      throw Error(t);
    }
    async setExpirations(e) {
      await this.core.storage.setItem(this.storageKey, e);
    }
    async getExpirations() {
      return await this.core.storage.getItem(this.storageKey);
    }
    async persist() {
      (await this.setExpirations(this.values),
        this.events.emit("expirer_sync"));
    }
    async restore() {
      try {
        let e = await this.getExpirations();
        if (typeof e > "u" || !e.length) return;
        if (this.expirations.size) {
          let { message: e } = st("RESTORE_WILL_OVERRIDE", this.name);
          throw (this.logger.error(e), Error(e));
        }
        ((this.cached = e),
          this.logger.debug(
            `Successfully Restored expirations for ${this.name}`,
          ),
          this.logger.trace({
            type: "method",
            method: "restore",
            expirations: this.values,
          }));
      } catch (e) {
        (this.logger.debug(`Failed to Restore expirations for ${this.name}`),
          this.logger.error(e));
      }
    }
    getExpiration(e) {
      let t = this.expirations.get(e);
      if (!t) {
        let { message: t } = st("NO_MATCHING_KEY", `${this.name}: ${e}`);
        throw (this.logger.warn(t), Error(t));
      }
      return t;
    }
    checkExpiry(e, t) {
      let { expiry: i } = t;
      (0, ep.toMiliseconds)(i) - Date.now() <= 0 && this.expire(e, t);
    }
    expire(e, t) {
      (this.expirations.delete(e),
        this.events.emit(s2, { target: e, expiration: t }));
    }
    checkExpirations() {
      this.core.relayer.connected &&
        this.expirations.forEach((e, t) => this.checkExpiry(t, e));
    }
    registerEventListeners() {
      (this.core.heartbeat.on(K.W.pulse, () => this.checkExpirations()),
        this.events.on(s0, (e) => {
          (this.logger.info(`Emitting ${s0}`),
            this.logger.debug({ type: "event", event: s0, data: e }),
            this.persist());
        }),
        this.events.on(s2, (e) => {
          (this.logger.info(`Emitting ${s2}`),
            this.logger.debug({ type: "event", event: s2, data: e }),
            this.persist());
        }),
        this.events.on(s1, (e) => {
          (this.logger.info(`Emitting ${s1}`),
            this.logger.debug({ type: "event", event: s1, data: e }),
            this.persist());
        }));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var nS = Object.defineProperty,
    nT = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nS(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nx extends er {
    constructor(e, t, i) {
      (super(e, t, i),
        (this.core = e),
        (this.logger = t),
        (this.store = i),
        nT(this, "name", "verify-api"),
        nT(this, "abortController"),
        nT(this, "isDevEnv"),
        nT(this, "verifyUrlV3", s4),
        nT(this, "storagePrefix", sA),
        nT(this, "version", 2),
        nT(this, "publicKey"),
        nT(this, "fetchPromise"),
        nT(this, "init", async () => {
          var e;
          this.isDevEnv ||
            ((this.publicKey = await this.store.getItem(this.storeKey)),
            this.publicKey &&
              (0, ep.toMiliseconds)(
                null == (e = this.publicKey) ? void 0 : e.expiresAt,
              ) < Date.now() &&
              (this.logger.debug("verify v2 public key expired"),
              await this.removePublicKey()));
        }),
        nT(this, "register", async (e) => {
          if (!eT() || this.isDevEnv) return;
          let t = window.location.origin,
            { id: i, decryptedId: s } = e,
            r = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${t}&id=${i}&decryptedId=${s}`;
          try {
            let e = (0, ef.getDocument)(),
              t = this.startAbortTimer(5 * ep.ONE_SECOND),
              s = await new Promise((s, n) => {
                let a = () => {
                  (window.removeEventListener("message", c),
                    e.body.removeChild(o),
                    n("attestation aborted"));
                };
                this.abortController.signal.addEventListener("abort", a);
                let o = e.createElement("iframe");
                ((o.src = r),
                  (o.style.display = "none"),
                  o.addEventListener("error", a, {
                    signal: this.abortController.signal,
                  }));
                let c = (r) => {
                  if (r.data && "string" == typeof r.data)
                    try {
                      let n = JSON.parse(r.data);
                      if ("verify_attestation" === n.type) {
                        if ((0, eu.R)(n.attestation).payload.id !== i) return;
                        (clearInterval(t),
                          e.body.removeChild(o),
                          this.abortController.signal.removeEventListener(
                            "abort",
                            a,
                          ),
                          window.removeEventListener("message", c),
                          s(null === n.attestation ? "" : n.attestation));
                      }
                    } catch (e) {
                      this.logger.warn(e);
                    }
                };
                (e.body.appendChild(o),
                  window.addEventListener("message", c, {
                    signal: this.abortController.signal,
                  }));
              });
            return (this.logger.debug("jwt attestation", s), s);
          } catch (e) {
            this.logger.warn(e);
          }
          return "";
        }),
        nT(this, "resolve", async (e) => {
          if (this.isDevEnv) return "";
          let { attestationId: t, hash: i, encryptedId: s } = e;
          if ("" === t)
            return void this.logger.debug(
              "resolve: attestationId is empty, skipping",
            );
          if (t) {
            if ((0, eu.R)(t).payload.id !== s) return;
            let e = await this.isValidJwtAttestation(t);
            if (e)
              return e.isVerified
                ? e
                : void this.logger.warn(
                    "resolve: jwt attestation: origin url not verified",
                  );
          }
          if (!i) return;
          let r = this.getVerifyUrl(e?.verifyUrl);
          return this.fetchAttestation(i, r);
        }),
        nT(this, "fetchAttestation", async (e, t) => {
          this.logger.debug(`resolving attestation: ${e} from url: ${t}`);
          let i = this.startAbortTimer(5 * ep.ONE_SECOND),
            s = await fetch(`${t}/attestation/${e}?v2Supported=true`, {
              signal: this.abortController.signal,
            });
          return (clearTimeout(i), 200 === s.status ? await s.json() : void 0);
        }),
        nT(this, "getVerifyUrl", (e) => {
          let t = e || s5;
          return (
            s8.includes(t) ||
              (this.logger.info(
                `verify url: ${t}, not included in trusted list, assigning default: ${s5}`,
              ),
              (t = s5)),
            t
          );
        }),
        nT(this, "fetchPublicKey", async () => {
          try {
            this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
            let e = this.startAbortTimer(ep.FIVE_SECONDS),
              t = await fetch(`${this.verifyUrlV3}/public-key`, {
                signal: this.abortController.signal,
              });
            return (clearTimeout(e), await t.json());
          } catch (e) {
            this.logger.warn(e);
          }
        }),
        nT(this, "persistPublicKey", async (e) => {
          (this.logger.debug("persisting public key to local storage", e),
            await this.store.setItem(this.storeKey, e),
            (this.publicKey = e));
        }),
        nT(this, "removePublicKey", async () => {
          (this.logger.debug("removing verify v2 public key from storage"),
            await this.store.removeItem(this.storeKey),
            (this.publicKey = void 0));
        }),
        nT(this, "isValidJwtAttestation", async (e) => {
          let t = await this.getPublicKey();
          try {
            if (t) return this.validateAttestation(e, t);
          } catch (e) {
            (this.logger.error(e),
              this.logger.warn("error validating attestation"));
          }
          let i = await this.fetchAndPersistPublicKey();
          try {
            if (i) return this.validateAttestation(e, i);
          } catch (e) {
            (this.logger.error(e),
              this.logger.warn("error validating attestation"));
          }
        }),
        nT(this, "getPublicKey", async () =>
          this.publicKey
            ? this.publicKey
            : await this.fetchAndPersistPublicKey(),
        ),
        nT(this, "fetchAndPersistPublicKey", async () => {
          if (this.fetchPromise)
            return (await this.fetchPromise, this.publicKey);
          this.fetchPromise = new Promise(async (e) => {
            let t = await this.fetchPublicKey();
            t && (await this.persistPublicKey(t), e(t));
          });
          let e = await this.fetchPromise;
          return ((this.fetchPromise = void 0), e);
        }),
        nT(this, "validateAttestation", (e, t) => {
          let i = (function (e, t) {
              var i;
              let s,
                r,
                [n, a, o] = e.split("."),
                c =
                  ((i = o),
                  q.Buffer.from(
                    ((r =
                      (s = i.replace(/-/g, "+").replace(/_/g, "/")).length %
                      4) > 0 && (s += "=".repeat(4 - r)),
                    s),
                    "base64",
                  ));
              if (64 !== c.length) throw Error("Invalid signature length");
              let l = c.slice(0, 32).toString("hex"),
                h = c.slice(32, 64).toString("hex"),
                p = iy(`${n}.${a}`),
                d = new eI.ec("p256").keyFromPublic(
                  {
                    x: q.Buffer.from(t.x, "base64").toString("hex"),
                    y: q.Buffer.from(t.y, "base64").toString("hex"),
                  },
                  "hex",
                ),
                u = (0, ew.f)(p, iz);
              if (!d.verify(u, { r: l, s: h }))
                throw Error("Invalid signature");
              return (0, eu.R)(e).payload;
            })(e, t.publicKey),
            s = {
              hasExpired: (0, ep.toMiliseconds)(i.exp) < Date.now(),
              payload: i,
            };
          if (s.hasExpired)
            throw (
              this.logger.warn("resolve: jwt attestation expired"),
              Error("JWT attestation expired")
            );
          return {
            origin: s.payload.origin,
            isScam: s.payload.isScam,
            isVerified: s.payload.isVerified,
          };
        }),
        (this.logger = (0, H.v)(t, this.name)),
        (this.abortController = new AbortController()),
        (this.isDevEnv = eQ()),
        this.init());
    }
    get storeKey() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//verify:public:key"
      );
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    startAbortTimer(e) {
      return (
        (this.abortController = new AbortController()),
        setTimeout(() => this.abortController.abort(), (0, ep.toMiliseconds)(e))
      );
    }
  }
  var nk = Object.defineProperty,
    nD = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nk(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nR extends en {
    constructor(e, t) {
      (super(e, t),
        (this.projectId = e),
        (this.logger = t),
        nD(this, "context", "echo"),
        nD(this, "registerDeviceToken", async (e) => {
          let {
              clientId: t,
              token: i,
              notificationType: s,
              enableEncrypted: r = !1,
            } = e,
            n = `https://echo.walletconnect.com/${this.projectId}/clients`;
          await fetch(n, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client_id: t,
              type: s,
              token: i,
              always_raw: r,
            }),
          });
        }),
        (this.logger = (0, H.v)(t, this.context)));
    }
  }
  var nM = Object.defineProperty,
    nj = Object.getOwnPropertySymbols,
    nU = Object.prototype.hasOwnProperty,
    nq = Object.prototype.propertyIsEnumerable,
    nL = (e, t, i) =>
      t in e
        ? nM(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    n$ = (e, t) => {
      for (var i in t || (t = {})) nU.call(t, i) && nL(e, i, t[i]);
      if (nj) for (var i of nj(t)) nq.call(t, i) && nL(e, i, t[i]);
      return e;
    },
    nz = (e, t, i) => nL(e, "symbol" != typeof t ? t + "" : t, i);
  class nK extends ea {
    constructor(e, t, i = !0) {
      (super(e, t, i),
        (this.core = e),
        (this.logger = t),
        nz(this, "context", "event-client"),
        nz(this, "storagePrefix", sA),
        nz(this, "storageVersion", 0.1),
        nz(this, "events", new Map()),
        nz(this, "shouldPersist", !1),
        nz(this, "init", async () => {
          if (!eQ())
            try {
              let e = {
                eventId: eG(),
                timestamp: Date.now(),
                domain: this.getAppDomain(),
                props: {
                  event: "INIT",
                  type: "",
                  properties: {
                    client_id: await this.core.crypto.getClientId(),
                    user_agent: eR(
                      this.core.relayer.protocol,
                      this.core.relayer.version,
                      sz,
                    ),
                  },
                },
              };
              await this.sendEvent([e]);
            } catch (e) {
              this.logger.warn(e);
            }
        }),
        nz(this, "createEvent", (e) => {
          let {
              event: t = "ERROR",
              type: i = "",
              properties: { topic: s, trace: r },
            } = e,
            n = eG(),
            a = this.core.projectId || "",
            o = n$(
              {
                eventId: n,
                timestamp: Date.now(),
                props: {
                  event: t,
                  type: i,
                  properties: { topic: s, trace: r },
                },
                bundleId: a,
                domain: this.getAppDomain(),
              },
              this.setMethods(n),
            );
          return (
            this.telemetryEnabled &&
              (this.events.set(n, o), (this.shouldPersist = !0)),
            o
          );
        }),
        nz(this, "getEvent", (e) => {
          let { eventId: t, topic: i } = e;
          if (t) return this.events.get(t);
          let s = Array.from(this.events.values()).find(
            (e) => e.props.properties.topic === i,
          );
          if (s) return n$(n$({}, s), this.setMethods(s.eventId));
        }),
        nz(this, "deleteEvent", (e) => {
          let { eventId: t } = e;
          (this.events.delete(t), (this.shouldPersist = !0));
        }),
        nz(this, "setEventListeners", () => {
          this.core.heartbeat.on(K.W.pulse, async () => {
            (this.shouldPersist && (await this.persist()),
              this.events.forEach((e) => {
                (0, ep.fromMiliseconds)(Date.now()) -
                  (0, ep.fromMiliseconds)(e.timestamp) >
                  86400 &&
                  (this.events.delete(e.eventId), (this.shouldPersist = !0));
              }));
          });
        }),
        nz(this, "setMethods", (e) => ({
          addTrace: (t) => this.addTrace(e, t),
          setError: (t) => this.setError(e, t),
        })),
        nz(this, "addTrace", (e, t) => {
          let i = this.events.get(e);
          i &&
            (i.props.properties.trace.push(t),
            this.events.set(e, i),
            (this.shouldPersist = !0));
        }),
        nz(this, "setError", (e, t) => {
          let i = this.events.get(e);
          i &&
            ((i.props.type = t),
            (i.timestamp = Date.now()),
            this.events.set(e, i),
            (this.shouldPersist = !0));
        }),
        nz(this, "persist", async () => {
          (await this.core.storage.setItem(
            this.storageKey,
            Array.from(this.events.values()),
          ),
            (this.shouldPersist = !1));
        }),
        nz(this, "restore", async () => {
          try {
            let e = (await this.core.storage.getItem(this.storageKey)) || [];
            if (!e.length) return;
            e.forEach((e) => {
              this.events.set(
                e.eventId,
                n$(n$({}, e), this.setMethods(e.eventId)),
              );
            });
          } catch (e) {
            this.logger.warn(e);
          }
        }),
        nz(this, "submit", async () => {
          if (!this.telemetryEnabled || 0 === this.events.size) return;
          let e = [];
          for (let [t, i] of this.events) i.props.type && e.push(i);
          if (0 !== e.length)
            try {
              if ((await this.sendEvent(e)).ok)
                for (let t of e)
                  (this.events.delete(t.eventId), (this.shouldPersist = !0));
            } catch (e) {
              this.logger.warn(e);
            }
        }),
        nz(this, "sendEvent", async (e) => {
          let t = this.getAppDomain() ? "" : "&sp=desktop";
          return await fetch(
            `https://pulse.walletconnect.org/batch?projectId=${this.core.projectId}&st=events_sdk&sv=js-${sz}${t}`,
            { method: "POST", body: JSON.stringify(e) },
          );
        }),
        nz(this, "getAppDomain", () => eD().url),
        (this.logger = (0, H.v)(t, this.context)),
        (this.telemetryEnabled = i),
        i
          ? this.restore().then(async () => {
              (await this.submit(), this.setEventListeners());
            })
          : this.persist());
    }
    get storageKey() {
      return (
        this.storagePrefix +
        this.storageVersion +
        this.core.customStoragePrefix +
        "//" +
        this.context
      );
    }
  }
  var nV = Object.defineProperty,
    nH = Object.getOwnPropertySymbols,
    nB = Object.prototype.hasOwnProperty,
    nF = Object.prototype.propertyIsEnumerable,
    nW = (e, t, i) =>
      t in e
        ? nV(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nY = (e, t) => {
      for (var i in t || (t = {})) nB.call(t, i) && nW(e, i, t[i]);
      if (nH) for (var i of nH(t)) nF.call(t, i) && nW(e, i, t[i]);
      return e;
    },
    nG = (e, t, i) => nW(e, "symbol" != typeof t ? t + "" : t, i);
  let nQ = class e extends G {
      constructor(e) {
        var t;
        (super(e),
          nG(this, "protocol", "wc"),
          nG(this, "version", 2),
          nG(this, "name", sP),
          nG(this, "relayUrl"),
          nG(this, "projectId"),
          nG(this, "customStoragePrefix"),
          nG(this, "events", new z.EventEmitter()),
          nG(this, "logger"),
          nG(this, "heartbeat"),
          nG(this, "relayer"),
          nG(this, "crypto"),
          nG(this, "storage"),
          nG(this, "history"),
          nG(this, "expirer"),
          nG(this, "pairing"),
          nG(this, "verify"),
          nG(this, "echoClient"),
          nG(this, "linkModeSupportedApps"),
          nG(this, "eventClient"),
          nG(this, "initialized", !1),
          nG(this, "logChunkController"),
          nG(this, "on", (e, t) => this.events.on(e, t)),
          nG(this, "once", (e, t) => this.events.once(e, t)),
          nG(this, "off", (e, t) => this.events.off(e, t)),
          nG(this, "removeListener", (e, t) =>
            this.events.removeListener(e, t),
          ),
          nG(
            this,
            "dispatchEnvelope",
            ({ topic: e, message: t, sessionExists: i }) => {
              if (!e || !t) return;
              let s = {
                topic: e,
                message: t,
                publishedAt: Date.now(),
                transportType: sK,
              };
              this.relayer.onLinkMessageEvent(s, { sessionExists: i });
            },
          ),
          (this.projectId = e?.projectId),
          (this.relayUrl = e?.relayUrl || sk),
          (this.customStoragePrefix =
            null != e && e.customStoragePrefix
              ? `:${e.customStoragePrefix}`
              : ""));
        let i = (0, H.l)({
            level:
              "string" == typeof e?.logger && e.logger ? e.logger : "error",
            name: sP,
          }),
          { logger: s, chunkLoggerController: r } = (0, H.z)({
            opts: i,
            maxSizeInBytes: e?.maxLogBlobSizeInBytes,
            loggerOverride: e?.logger,
          });
        ((this.logChunkController = r),
          null != (t = this.logChunkController) &&
            t.downloadLogsBlobInBrowser &&
            (window.downloadLogsBlobInBrowser = async () => {
              var e, t;
              null != (e = this.logChunkController) &&
                e.downloadLogsBlobInBrowser &&
                (null == (t = this.logChunkController) ||
                  t.downloadLogsBlobInBrowser({
                    clientId: await this.crypto.getClientId(),
                  }));
            }),
          (this.logger = (0, H.v)(s, this.name)),
          (this.heartbeat = new K.k()),
          (this.crypto = new rz(this, this.logger, e?.keychain)),
          (this.history = new nC(this, this.logger)),
          (this.expirer = new nO(this, this.logger)),
          (this.storage =
            null != e && e.storage
              ? e.storage
              : new V.f(nY(nY({}, sO), e?.storageOptions))),
          (this.relayer = new np({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
          })),
          (this.pairing = new nE(this, this.logger)),
          (this.verify = new nx(this, this.logger, this.storage)),
          (this.echoClient = new nR(this.projectId || "", this.logger)),
          (this.linkModeSupportedApps = []),
          (this.eventClient = new nK(this, this.logger, e?.telemetryEnabled)));
      }
      static async init(t) {
        let i = new e(t);
        await i.initialize();
        let s = await i.crypto.getClientId();
        return (await i.storage.setItem("WALLETCONNECT_CLIENT_ID", s), i);
      }
      get context() {
        return (0, H.u)(this.logger);
      }
      async start() {
        this.initialized || (await this.initialize());
      }
      async getLogsBlob() {
        var e;
        return null == (e = this.logChunkController)
          ? void 0
          : e.logsToBlob({ clientId: await this.crypto.getClientId() });
      }
      async addLinkModeSupportedApp(e) {
        this.linkModeSupportedApps.includes(e) ||
          (this.linkModeSupportedApps.push(e),
          await this.storage.setItem(sH, this.linkModeSupportedApps));
      }
      async initialize() {
        this.logger.trace("Initialized");
        try {
          (await this.crypto.init(),
            await this.history.init(),
            await this.expirer.init(),
            await this.relayer.init(),
            await this.heartbeat.init(),
            await this.pairing.init(),
            (this.linkModeSupportedApps =
              (await this.storage.getItem(sH)) || []),
            (this.initialized = !0),
            this.logger.info("Core Initialization Success"));
        } catch (e) {
          throw (
            this.logger.warn(
              `Core Initialization Failure at epoch ${Date.now()}`,
              e,
            ),
            this.logger.error(e.message),
            e
          );
        }
      }
    },
    nJ = "client",
    nZ = `wc@2:${nJ}:`,
    nX = "WALLETCONNECT_DEEPLINK_CHOICE",
    n0 = (ep.THIRTY_DAYS, "Proposal expired"),
    n1 = ep.SEVEN_DAYS,
    n2 = {
      wc_sessionPropose: {
        req: { ttl: ep.FIVE_MINUTES, prompt: !0, tag: 1100 },
        res: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1101 },
        reject: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1120 },
        autoReject: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1121 },
      },
      wc_sessionSettle: {
        req: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1102 },
        res: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1103 },
      },
      wc_sessionUpdate: {
        req: { ttl: ep.ONE_DAY, prompt: !1, tag: 1104 },
        res: { ttl: ep.ONE_DAY, prompt: !1, tag: 1105 },
      },
      wc_sessionExtend: {
        req: { ttl: ep.ONE_DAY, prompt: !1, tag: 1106 },
        res: { ttl: ep.ONE_DAY, prompt: !1, tag: 1107 },
      },
      wc_sessionRequest: {
        req: { ttl: ep.FIVE_MINUTES, prompt: !0, tag: 1108 },
        res: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1109 },
      },
      wc_sessionEvent: {
        req: { ttl: ep.FIVE_MINUTES, prompt: !0, tag: 1110 },
        res: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1111 },
      },
      wc_sessionDelete: {
        req: { ttl: ep.ONE_DAY, prompt: !1, tag: 1112 },
        res: { ttl: ep.ONE_DAY, prompt: !1, tag: 1113 },
      },
      wc_sessionPing: {
        req: { ttl: ep.ONE_DAY, prompt: !1, tag: 1114 },
        res: { ttl: ep.ONE_DAY, prompt: !1, tag: 1115 },
      },
      wc_sessionAuthenticate: {
        req: { ttl: ep.ONE_HOUR, prompt: !0, tag: 1116 },
        res: { ttl: ep.ONE_HOUR, prompt: !1, tag: 1117 },
        reject: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1118 },
        autoReject: { ttl: ep.FIVE_MINUTES, prompt: !1, tag: 1119 },
      },
    },
    n5 = { min: ep.FIVE_MINUTES, max: ep.SEVEN_DAYS },
    n4 = "IDLE",
    n8 = "ACTIVE",
    n3 = {
      eth_sendTransaction: { key: "" },
      eth_sendRawTransaction: { key: "" },
      wallet_sendCalls: { key: "" },
      solana_signTransaction: { key: "signature" },
      solana_signAllTransactions: { key: "transactions" },
      solana_signAndSendTransaction: { key: "signature" },
    },
    n6 = [
      "wc_sessionPropose",
      "wc_sessionRequest",
      "wc_authRequest",
      "wc_sessionAuthenticate",
    ],
    n9 = "wc@1.5:auth:",
    n7 = `${n9}:PUB_KEY`;
  var ae = Object.defineProperty,
    at = Object.defineProperties,
    ai = Object.getOwnPropertyDescriptors,
    as = Object.getOwnPropertySymbols,
    ar = Object.prototype.hasOwnProperty,
    an = Object.prototype.propertyIsEnumerable,
    aa = (e, t, i) =>
      t in e
        ? ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    ao = (e, t) => {
      for (var i in t || (t = {})) ar.call(t, i) && aa(e, i, t[i]);
      if (as) for (var i of as(t)) an.call(t, i) && aa(e, i, t[i]);
      return e;
    },
    ac = (e, t, i) => aa(e, "symbol" != typeof t ? t + "" : t, i);
  class al extends eh {
    constructor(t) {
      (super(t),
        ac(this, "name", "engine"),
        ac(this, "events", new z.default()),
        ac(this, "initialized", !1),
        ac(this, "requestQueue", { state: n4, queue: [] }),
        ac(this, "sessionRequestQueue", { state: n4, queue: [] }),
        ac(this, "requestQueueDelay", ep.ONE_SECOND),
        ac(this, "expectedPairingMethodMap", new Map()),
        ac(this, "recentlyDeletedMap", new Map()),
        ac(this, "recentlyDeletedLimit", 200),
        ac(this, "relayMessageCache", []),
        ac(this, "pendingSessions", new Map()),
        ac(this, "init", async () => {
          this.initialized ||
            (await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.registerPairingEvents(),
            await this.registerLinkModeListeners(),
            this.client.core.pairing.register({ methods: Object.keys(n2) }),
            (this.initialized = !0),
            setTimeout(
              () => {
                ((this.sessionRequestQueue.queue =
                  this.getPendingSessionRequests()),
                  this.processSessionRequestQueue());
              },
              (0, ep.toMiliseconds)(this.requestQueueDelay),
            ));
        }),
        ac(this, "connect", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          let t = at(
            ao({}, e),
            ai({
              requiredNamespaces: e.requiredNamespaces || {},
              optionalNamespaces: e.optionalNamespaces || {},
            }),
          );
          await this.isValidConnect(t);
          let {
              pairingTopic: i,
              requiredNamespaces: s,
              optionalNamespaces: r,
              sessionProperties: n,
              relays: a,
            } = t,
            o = i,
            c,
            l = !1;
          try {
            if (o) {
              let e = this.client.core.pairing.pairings.get(o);
              (this.client.logger.warn(
                "connect() with existing pairing topic is deprecated and will be removed in the next major release.",
              ),
                (l = e.active));
            }
          } catch (e) {
            throw (
              this.client.logger.error(`connect() -> pairing.get(${o}) failed`),
              e
            );
          }
          if (!o || !l) {
            let { topic: e, uri: t } = await this.client.core.pairing.create();
            ((o = e), (c = t));
          }
          if (!o) {
            let { message: e } = st(
              "NO_MATCHING_KEY",
              `connect() pairing topic: ${o}`,
            );
            throw Error(e);
          }
          let h = await this.client.core.crypto.generateKeyPair(),
            p = n2.wc_sessionPropose.req.ttl || ep.FIVE_MINUTES,
            d = eK(p),
            u = at(
              ao(
                {
                  requiredNamespaces: s,
                  optionalNamespaces: r,
                  relays: a ?? [{ protocol: "irn" }],
                  proposer: { publicKey: h, metadata: this.client.metadata },
                  expiryTimestamp: d,
                  pairingTopic: o,
                },
                n && { sessionProperties: n },
              ),
              ai({ id: (0, sE.I)() }),
            ),
            g = eH("session_connect", u.id),
            { reject: f, resolve: y, done: m } = eq(p, n0),
            w = ({ id: e }) => {
              e === u.id &&
                (this.client.events.off("proposal_expire", w),
                this.pendingSessions.delete(u.id),
                this.events.emit(g, { error: { message: n0, code: 0 } }));
            };
          return (
            this.client.events.on("proposal_expire", w),
            this.events.once(g, ({ error: e, session: t }) => {
              (this.client.events.off("proposal_expire", w),
                e ? f(e) : t && y(t));
            }),
            await this.sendRequest({
              topic: o,
              method: "wc_sessionPropose",
              params: u,
              throwOnFailedPublish: !0,
              clientRpcId: u.id,
            }),
            await this.setProposal(u.id, u),
            { uri: c, approval: m }
          );
        }),
        ac(this, "pair", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            return await this.client.core.pairing.pair(e);
          } catch (e) {
            throw (this.client.logger.error("pair() failed"), e);
          }
        }),
        ac(this, "approve", async (e) => {
          var t, i, s;
          let r = this.client.core.eventClient.createEvent({
            properties: {
              topic: null == (t = e?.id) ? void 0 : t.toString(),
              trace: [s6],
            },
          });
          try {
            (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          } catch (e) {
            throw (r.setError("no_internet_connection"), e);
          }
          try {
            await this.isValidProposalId(e?.id);
          } catch (t) {
            throw (
              this.client.logger.error(
                `approve() -> proposal.get(${e?.id}) failed`,
              ),
              r.setError("proposal_not_found"),
              t
            );
          }
          try {
            await this.isValidApprove(e);
          } catch (e) {
            throw (
              this.client.logger.error("approve() -> isValidApprove() failed"),
              r.setError("session_approve_namespace_validation_failure"),
              e
            );
          }
          let {
              id: n,
              relayProtocol: a,
              namespaces: o,
              sessionProperties: c,
              sessionConfig: l,
            } = e,
            h = this.client.proposal.get(n);
          this.client.core.eventClient.deleteEvent({ eventId: r.eventId });
          let {
              pairingTopic: p,
              proposer: d,
              requiredNamespaces: u,
              optionalNamespaces: g,
            } = h,
            f =
              null == (i = this.client.core.eventClient)
                ? void 0
                : i.getEvent({ topic: p });
          f ||
            (f =
              null == (s = this.client.core.eventClient)
                ? void 0
                : s.createEvent({
                    type: s6,
                    properties: {
                      topic: p,
                      trace: [s6, "session_namespaces_validation_success"],
                    },
                  }));
          let y = await this.client.core.crypto.generateKeyPair(),
            m = d.publicKey,
            w = await this.client.core.crypto.generateSharedKey(y, m),
            v = ao(
              ao(
                {
                  relay: { protocol: a ?? "irn" },
                  namespaces: o,
                  controller: { publicKey: y, metadata: this.client.metadata },
                  expiry: eK(n1),
                },
                c && { sessionProperties: c },
              ),
              l && { sessionConfig: l },
            );
          f.addTrace("subscribing_session_topic");
          try {
            await this.client.core.relayer.subscribe(w, { transportType: sV });
          } catch (e) {
            throw (f.setError("subscribe_session_topic_failure"), e);
          }
          f.addTrace("subscribe_session_topic_success");
          let b = at(
            ao({}, v),
            ai({
              topic: w,
              requiredNamespaces: u,
              optionalNamespaces: g,
              pairingTopic: p,
              acknowledged: !1,
              self: v.controller,
              peer: { publicKey: d.publicKey, metadata: d.metadata },
              controller: y,
              transportType: sV,
            }),
          );
          (await this.client.session.set(w, b), f.addTrace("store_session"));
          try {
            (f.addTrace("publishing_session_settle"),
              await this.sendRequest({
                topic: w,
                method: "wc_sessionSettle",
                params: v,
                throwOnFailedPublish: !0,
              }).catch((e) => {
                throw (f?.setError("session_settle_publish_failure"), e);
              }),
              f.addTrace("session_settle_publish_success"),
              f.addTrace("publishing_session_approve"),
              await this.sendResult({
                id: n,
                topic: p,
                result: {
                  relay: { protocol: a ?? "irn" },
                  responderPublicKey: y,
                },
                throwOnFailedPublish: !0,
              }).catch((e) => {
                throw (f?.setError("session_approve_publish_failure"), e);
              }),
              f.addTrace("session_approve_publish_success"));
          } catch (e) {
            throw (
              this.client.logger.error(e),
              this.client.session.delete(w, si("USER_DISCONNECTED")),
              await this.client.core.relayer.unsubscribe(w),
              e
            );
          }
          return (
            this.client.core.eventClient.deleteEvent({ eventId: f.eventId }),
            await this.client.core.pairing.updateMetadata({
              topic: p,
              metadata: d.metadata,
            }),
            await this.client.proposal.delete(n, si("USER_DISCONNECTED")),
            await this.client.core.pairing.activate({ topic: p }),
            await this.setExpiry(w, eK(n1)),
            {
              topic: w,
              acknowledged: () => Promise.resolve(this.client.session.get(w)),
            }
          );
        }),
        ac(this, "reject", async (e) => {
          let t;
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            await this.isValidReject(e);
          } catch (e) {
            throw (
              this.client.logger.error("reject() -> isValidReject() failed"),
              e
            );
          }
          let { id: i, reason: s } = e;
          try {
            t = this.client.proposal.get(i).pairingTopic;
          } catch (e) {
            throw (
              this.client.logger.error(`reject() -> proposal.get(${i}) failed`),
              e
            );
          }
          t &&
            (await this.sendError({
              id: i,
              topic: t,
              error: s,
              rpcOpts: n2.wc_sessionPropose.reject,
            }),
            await this.client.proposal.delete(i, si("USER_DISCONNECTED")));
        }),
        ac(this, "update", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            await this.isValidUpdate(e);
          } catch (e) {
            throw (
              this.client.logger.error("update() -> isValidUpdate() failed"),
              e
            );
          }
          let { topic: t, namespaces: i } = e,
            { done: s, resolve: r, reject: n } = eq(),
            a = (0, sE.I)(),
            o = (0, sE.f)().toString(),
            c = this.client.session.get(t).namespaces;
          return (
            this.events.once(eH("session_update", a), ({ error: e }) => {
              e ? n(e) : r();
            }),
            await this.client.session.update(t, { namespaces: i }),
            await this.sendRequest({
              topic: t,
              method: "wc_sessionUpdate",
              params: { namespaces: i },
              throwOnFailedPublish: !0,
              clientRpcId: a,
              relayRpcId: o,
            }).catch((e) => {
              (this.client.logger.error(e),
                this.client.session.update(t, { namespaces: c }),
                n(e));
            }),
            { acknowledged: s }
          );
        }),
        ac(this, "extend", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            await this.isValidExtend(e);
          } catch (e) {
            throw (
              this.client.logger.error("extend() -> isValidExtend() failed"),
              e
            );
          }
          let { topic: t } = e,
            i = (0, sE.I)(),
            { done: s, resolve: r, reject: n } = eq();
          return (
            this.events.once(eH("session_extend", i), ({ error: e }) => {
              e ? n(e) : r();
            }),
            await this.setExpiry(t, eK(n1)),
            this.sendRequest({
              topic: t,
              method: "wc_sessionExtend",
              params: {},
              clientRpcId: i,
              throwOnFailedPublish: !0,
            }).catch((e) => {
              n(e);
            }),
            { acknowledged: s }
          );
        }),
        ac(this, "request", async (e) => {
          this.isInitialized();
          try {
            await this.isValidRequest(e);
          } catch (e) {
            throw (
              this.client.logger.error("request() -> isValidRequest() failed"),
              e
            );
          }
          let {
              chainId: t,
              request: i,
              topic: s,
              expiry: r = n2.wc_sessionRequest.req.ttl,
            } = e,
            n = this.client.session.get(s);
          n?.transportType === sV && (await this.confirmOnlineStateOrThrow());
          let a = (0, sE.I)(),
            o = (0, sE.f)().toString(),
            {
              done: c,
              resolve: l,
              reject: h,
            } = eq(r, "Request expired. Please try again.");
          this.events.once(
            eH("session_request", a),
            ({ error: e, result: t }) => {
              e ? h(e) : l(t);
            },
          );
          let p = "wc_sessionRequest",
            d = this.getAppLinkIfEnabled(n.peer.metadata, n.transportType);
          if (d)
            return (
              await this.sendRequest({
                clientRpcId: a,
                relayRpcId: o,
                topic: s,
                method: p,
                params: {
                  request: at(ao({}, i), ai({ expiryTimestamp: eK(r) })),
                  chainId: t,
                },
                expiry: r,
                throwOnFailedPublish: !0,
                appLink: d,
              }).catch((e) => h(e)),
              this.client.events.emit("session_request_sent", {
                topic: s,
                request: i,
                chainId: t,
                id: a,
              }),
              await c()
            );
          let u = {
              request: at(ao({}, i), ai({ expiryTimestamp: eK(r) })),
              chainId: t,
            },
            g = this.shouldSetTVF(p, u);
          return await Promise.all([
            new Promise(async (e) => {
              (await this.sendRequest(
                ao(
                  {
                    clientRpcId: a,
                    relayRpcId: o,
                    topic: s,
                    method: p,
                    params: u,
                    expiry: r,
                    throwOnFailedPublish: !0,
                  },
                  g && { tvf: this.getTVFParams(a, u) },
                ),
              ).catch((e) => h(e)),
                this.client.events.emit("session_request_sent", {
                  topic: s,
                  request: i,
                  chainId: t,
                  id: a,
                }),
                e());
            }),
            new Promise(async (e) => {
              var t;
              if (!(null != (t = n.sessionConfig) && t.disableDeepLink)) {
                let e = await eW(this.client.core.storage, nX);
                await eF({ id: a, topic: s, wcDeepLink: e });
              }
              e();
            }),
            c(),
          ]).then((e) => e[2]);
        }),
        ac(this, "respond", async (e) => {
          (this.isInitialized(), await this.isValidRespond(e));
          let { topic: t, response: i } = e,
            { id: s } = i,
            r = this.client.session.get(t);
          r.transportType === sV && (await this.confirmOnlineStateOrThrow());
          let n = this.getAppLinkIfEnabled(r.peer.metadata, r.transportType);
          ((0, sN.t)(i)
            ? await this.sendResult({
                id: s,
                topic: t,
                result: i.result,
                throwOnFailedPublish: !0,
                appLink: n,
              })
            : (0, sN.x)(i) &&
              (await this.sendError({
                id: s,
                topic: t,
                error: i.error,
                appLink: n,
              })),
            this.cleanupAfterResponse(e));
        }),
        ac(this, "ping", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            await this.isValidPing(e);
          } catch (e) {
            throw (
              this.client.logger.error("ping() -> isValidPing() failed"),
              e
            );
          }
          let { topic: t } = e;
          if (this.client.session.keys.includes(t)) {
            let e = (0, sE.I)(),
              i = (0, sE.f)().toString(),
              { done: s, resolve: r, reject: n } = eq();
            (this.events.once(eH("session_ping", e), ({ error: e }) => {
              e ? n(e) : r();
            }),
              await Promise.all([
                this.sendRequest({
                  topic: t,
                  method: "wc_sessionPing",
                  params: {},
                  throwOnFailedPublish: !0,
                  clientRpcId: e,
                  relayRpcId: i,
                }),
                s(),
              ]));
          } else
            this.client.core.pairing.pairings.keys.includes(t) &&
              (this.client.logger.warn(
                "ping() on pairing topic is deprecated and will be removed in the next major release.",
              ),
              await this.client.core.pairing.ping({ topic: t }));
        }),
        ac(this, "emit", async (e) => {
          (this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidEmit(e));
          let { topic: t, event: i, chainId: s } = e,
            r = (0, sE.f)().toString(),
            n = (0, sE.I)();
          await this.sendRequest({
            topic: t,
            method: "wc_sessionEvent",
            params: { event: i, chainId: s },
            throwOnFailedPublish: !0,
            relayRpcId: r,
            clientRpcId: n,
          });
        }),
        ac(this, "disconnect", async (e) => {
          (this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidDisconnect(e));
          let { topic: t } = e;
          if (this.client.session.keys.includes(t))
            (await this.sendRequest({
              topic: t,
              method: "wc_sessionDelete",
              params: si("USER_DISCONNECTED"),
              throwOnFailedPublish: !0,
            }),
              await this.deleteSession({ topic: t, emitEvent: !1 }));
          else if (this.client.core.pairing.pairings.keys.includes(t))
            await this.client.core.pairing.disconnect({ topic: t });
          else {
            let { message: e } = st(
              "MISMATCHED_TOPIC",
              `Session or pairing topic not found: ${t}`,
            );
            throw Error(e);
          }
        }),
        ac(
          this,
          "find",
          (e) => (
            this.isInitialized(),
            this.client.session.getAll().filter((t) =>
              (function (e, t) {
                let { requiredNamespaces: i } = t,
                  s = Object.keys(e.namespaces),
                  r = Object.keys(i),
                  n = !0;
                return (
                  !!eM(r, s) &&
                  (s.forEach((t) => {
                    let {
                        accounts: s,
                        methods: r,
                        events: a,
                      } = e.namespaces[t],
                      o = i8(s),
                      c = i[t];
                    (eM(e_(t, c), o) && eM(c.methods, r) && eM(c.events, a)) ||
                      (n = !1);
                  }),
                  n)
                );
              })(t, e),
            )
          ),
        ),
        ac(this, "getPendingSessionRequests", () =>
          this.client.pendingRequest.getAll(),
        ),
        ac(this, "authenticate", async (e, t) => {
          var i, s, r, n, a;
          let o;
          (this.isInitialized(), this.isValidAuthenticate(e));
          let c =
              t &&
              this.client.core.linkModeSupportedApps.includes(t) &&
              (null == (i = this.client.metadata.redirect)
                ? void 0
                : i.linkMode),
            l = c ? sK : sV;
          l === sV && (await this.confirmOnlineStateOrThrow());
          let {
              chains: h,
              statement: p = "",
              uri: d,
              domain: u,
              nonce: g,
              type: f,
              exp: y,
              nbf: m,
              methods: w = [],
              expiry: v,
            } = e,
            b = [...(e.resources || [])],
            { topic: I, uri: E } = await this.client.core.pairing.create({
              methods: ["wc_sessionAuthenticate"],
              transportType: l,
            });
          this.client.logger.info({
            message: "Generated new pairing",
            pairing: { topic: I, uri: E },
          });
          let N = await this.client.core.crypto.generateKeyPair(),
            _ = iF(N);
          if (
            (await Promise.all([
              this.client.auth.authKeys.set(n7, {
                responseTopic: _,
                publicKey: N,
              }),
              this.client.auth.pairingTopics.set(_, {
                topic: _,
                pairingTopic: I,
              }),
            ]),
            await this.client.core.relayer.subscribe(_, { transportType: l }),
            this.client.logger.info(
              `sending request to new pairing topic: ${I}`,
            ),
            w.length > 0)
          ) {
            let e,
              t,
              { namespace: i } = eN(h[0]),
              o = tj(
                (function (e, t, i, s = {}) {
                  return (
                    i?.sort((e, t) => e.localeCompare(t)),
                    {
                      att: {
                        [e]: (function (e, t, i = {}) {
                          return Object.assign(
                            {},
                            ...(t = t?.sort((e, t) => e.localeCompare(t))).map(
                              (t) => ({ [`${e}/${t}`]: [i] }),
                            ),
                          );
                        })(t, i, s),
                      },
                    }
                  );
                })(i, "request", w),
              );
            (t$(b) &&
              ((s = o),
              (r = b.pop()),
              (o = tj(
                ((n = tU(s)),
                (a = tU(r)),
                tM(n),
                tM(a),
                (e = Object.keys(n.att)
                  .concat(Object.keys(a.att))
                  .sort((e, t) => e.localeCompare(t))),
                (t = { att: {} }),
                e.forEach((e) => {
                  var i, s;
                  Object.keys((null == (i = n.att) ? void 0 : i[e]) || {})
                    .concat(
                      Object.keys((null == (s = a.att) ? void 0 : s[e]) || {}),
                    )
                    .sort((e, t) => e.localeCompare(t))
                    .forEach((i) => {
                      var s, r;
                      t.att[e] = t_(
                        ((e, t) => {
                          for (var i in t || (t = {}))
                            tA.call(t, i) && tS(e, i, t[i]);
                          if (tP)
                            for (var i of tP(t))
                              tO.call(t, i) && tS(e, i, t[i]);
                          return e;
                        })({}, t.att[e]),
                        tC({
                          [i]:
                            (null == (s = n.att[e]) ? void 0 : s[i]) ||
                            (null == (r = a.att[e]) ? void 0 : r[i]),
                        }),
                      );
                    });
                }),
                t),
              ))),
              b.push(o));
          }
          let C =
              v && v > n2.wc_sessionAuthenticate.req.ttl
                ? v
                : n2.wc_sessionAuthenticate.req.ttl,
            P = {
              authPayload: {
                type: f ?? "caip122",
                chains: h,
                statement: p,
                aud: d,
                domain: u,
                version: "1",
                nonce: g,
                iat: new Date().toISOString(),
                exp: y,
                nbf: m,
                resources: b,
              },
              requester: { publicKey: N, metadata: this.client.metadata },
              expiryTimestamp: eK(C),
            },
            A = {
              requiredNamespaces: {},
              optionalNamespaces: {
                eip155: {
                  chains: h,
                  methods: [...new Set(["personal_sign", ...w])],
                  events: ["chainChanged", "accountsChanged"],
                },
              },
              relays: [{ protocol: "irn" }],
              pairingTopic: I,
              proposer: { publicKey: N, metadata: this.client.metadata },
              expiryTimestamp: eK(n2.wc_sessionPropose.req.ttl),
              id: (0, sE.I)(),
            },
            { done: O, resolve: S, reject: T } = eq(C, "Request expired"),
            x = (0, sE.I)(),
            k = eH("session_connect", A.id),
            D = eH("session_request", x),
            R = async ({ error: e, session: t }) => {
              (this.events.off(D, M), e ? T(e) : t && S({ session: t }));
            },
            M = async (e) => {
              var i, s, r;
              let n;
              if (
                (await this.deletePendingAuthRequest(x, {
                  message: "fulfilled",
                  code: 0,
                }),
                e.error)
              ) {
                let t = si("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
                return e.error.code === t.code
                  ? void 0
                  : (this.events.off(k, R), T(e.error.message));
              }
              (await this.deleteProposal(A.id), this.events.off(k, R));
              let { cacaos: a, responder: o } = e.result,
                c = [],
                h = [];
              for (let e of a) {
                (await tD({
                  cacao: e,
                  projectId: this.client.core.projectId,
                })) ||
                  (this.client.logger.error(e, "Signature verification failed"),
                  T(
                    si(
                      "SESSION_SETTLEMENT_FAILED",
                      "Signature verification failed",
                    ),
                  ));
                let { p: t } = e,
                  i = t$(t.resources),
                  s = [tx(t.iss)],
                  r = tk(t.iss);
                if (i) {
                  let e = tq(i),
                    t = tL(i);
                  (c.push(...e), s.push(...t));
                }
                for (let e of s) h.push(`${e}:${r}`);
              }
              let p = await this.client.core.crypto.generateSharedKey(
                N,
                o.publicKey,
              );
              (c.length > 0 &&
                ((n = {
                  topic: p,
                  acknowledged: !0,
                  self: { publicKey: N, metadata: this.client.metadata },
                  peer: o,
                  controller: o.publicKey,
                  expiry: eK(n1),
                  requiredNamespaces: {},
                  optionalNamespaces: {},
                  relay: { protocol: "irn" },
                  pairingTopic: I,
                  namespaces: i9([...new Set(c)], [...new Set(h)]),
                  transportType: l,
                }),
                await this.client.core.relayer.subscribe(p, {
                  transportType: l,
                }),
                await this.client.session.set(p, n),
                I &&
                  (await this.client.core.pairing.updateMetadata({
                    topic: I,
                    metadata: o.metadata,
                  })),
                (n = this.client.session.get(p))),
                null != (i = this.client.metadata.redirect) &&
                  i.linkMode &&
                  null != (s = o.metadata.redirect) &&
                  s.linkMode &&
                  null != (r = o.metadata.redirect) &&
                  r.universal &&
                  t &&
                  (this.client.core.addLinkModeSupportedApp(
                    o.metadata.redirect.universal,
                  ),
                  this.client.session.update(p, { transportType: sK })),
                S({ auths: a, session: n }));
            };
          (this.events.once(k, R), this.events.once(D, M));
          try {
            if (c) {
              let e = (0, sE.i)("wc_sessionAuthenticate", P, x);
              this.client.core.history.set(I, e);
              let i = await this.client.core.crypto.encode("", e, {
                type: 2,
                encoding: iV,
              });
              o = i4(t, I, i);
            } else
              await Promise.all([
                this.sendRequest({
                  topic: I,
                  method: "wc_sessionAuthenticate",
                  params: P,
                  expiry: e.expiry,
                  throwOnFailedPublish: !0,
                  clientRpcId: x,
                }),
                this.sendRequest({
                  topic: I,
                  method: "wc_sessionPropose",
                  params: A,
                  expiry: n2.wc_sessionPropose.req.ttl,
                  throwOnFailedPublish: !0,
                  clientRpcId: A.id,
                }),
              ]);
          } catch (e) {
            throw (this.events.off(k, R), this.events.off(D, M), e);
          }
          return (
            await this.setProposal(A.id, A),
            await this.setAuthRequest(x, {
              request: at(ao({}, P), ai({ verifyContext: {} })),
              pairingTopic: I,
              transportType: l,
            }),
            { uri: o ?? E, response: O }
          );
        }),
        ac(this, "approveSessionAuthenticate", async (e) => {
          let t,
            { id: i, auths: s } = e,
            r = this.client.core.eventClient.createEvent({
              properties: {
                topic: i.toString(),
                trace: ["authenticated_session_approve_started"],
              },
            });
          try {
            this.isInitialized();
          } catch (e) {
            throw (r.setError("no_internet_connection"), e);
          }
          let n = this.getPendingAuthRequest(i);
          if (!n)
            throw (
              r.setError("authenticated_session_pending_request_not_found"),
              Error(`Could not find pending auth request with id ${i}`)
            );
          let a = n.transportType || sV;
          a === sV && (await this.confirmOnlineStateOrThrow());
          let o = n.requester.publicKey,
            c = await this.client.core.crypto.generateKeyPair(),
            l = iF(o),
            h = { type: 1, receiverPublicKey: o, senderPublicKey: c },
            p = [],
            d = [];
          for (let e of s) {
            if (
              !(await tD({ cacao: e, projectId: this.client.core.projectId }))
            ) {
              r.setError("invalid_cacao");
              let e = si(
                "SESSION_SETTLEMENT_FAILED",
                "Signature verification failed",
              );
              throw (
                await this.sendError({
                  id: i,
                  topic: l,
                  error: e,
                  encodeOpts: h,
                }),
                Error(e.message)
              );
            }
            r.addTrace("cacaos_verified");
            let { p: t } = e,
              s = t$(t.resources),
              n = [tx(t.iss)],
              a = tk(t.iss);
            if (s) {
              let e = tq(s),
                t = tL(s);
              (p.push(...e), n.push(...t));
            }
            for (let e of n) d.push(`${e}:${a}`);
          }
          let u = await this.client.core.crypto.generateSharedKey(c, o);
          if (
            (r.addTrace("create_authenticated_session_topic"), p?.length > 0)
          ) {
            ((t = {
              topic: u,
              acknowledged: !0,
              self: { publicKey: c, metadata: this.client.metadata },
              peer: { publicKey: o, metadata: n.requester.metadata },
              controller: o,
              expiry: eK(n1),
              authentication: s,
              requiredNamespaces: {},
              optionalNamespaces: {},
              relay: { protocol: "irn" },
              pairingTopic: n.pairingTopic,
              namespaces: i9([...new Set(p)], [...new Set(d)]),
              transportType: a,
            }),
              r.addTrace("subscribing_authenticated_session_topic"));
            try {
              await this.client.core.relayer.subscribe(u, { transportType: a });
            } catch (e) {
              throw (
                r.setError("subscribe_authenticated_session_topic_failure"),
                e
              );
            }
            (r.addTrace("subscribe_authenticated_session_topic_success"),
              await this.client.session.set(u, t),
              r.addTrace("store_authenticated_session"),
              await this.client.core.pairing.updateMetadata({
                topic: n.pairingTopic,
                metadata: n.requester.metadata,
              }));
          }
          r.addTrace("publishing_authenticated_session_approve");
          try {
            await this.sendResult({
              topic: l,
              id: i,
              result: {
                cacaos: s,
                responder: { publicKey: c, metadata: this.client.metadata },
              },
              encodeOpts: h,
              throwOnFailedPublish: !0,
              appLink: this.getAppLinkIfEnabled(n.requester.metadata, a),
            });
          } catch (e) {
            throw (
              r.setError("authenticated_session_approve_publish_failure"),
              e
            );
          }
          return (
            await this.client.auth.requests.delete(i, {
              message: "fulfilled",
              code: 0,
            }),
            await this.client.core.pairing.activate({ topic: n.pairingTopic }),
            this.client.core.eventClient.deleteEvent({ eventId: r.eventId }),
            { session: t }
          );
        }),
        ac(this, "rejectSessionAuthenticate", async (e) => {
          this.isInitialized();
          let { id: t, reason: i } = e,
            s = this.getPendingAuthRequest(t);
          if (!s)
            throw Error(`Could not find pending auth request with id ${t}`);
          s.transportType === sV && (await this.confirmOnlineStateOrThrow());
          let r = s.requester.publicKey,
            n = await this.client.core.crypto.generateKeyPair(),
            a = iF(r);
          (await this.sendError({
            id: t,
            topic: a,
            error: i,
            encodeOpts: { type: 1, receiverPublicKey: r, senderPublicKey: n },
            rpcOpts: n2.wc_sessionAuthenticate.reject,
            appLink: this.getAppLinkIfEnabled(
              s.requester.metadata,
              s.transportType,
            ),
          }),
            await this.client.auth.requests.delete(t, {
              message: "rejected",
              code: 0,
            }),
            await this.client.proposal.delete(t, si("USER_DISCONNECTED")));
        }),
        ac(this, "formatAuthMessage", (e) => {
          this.isInitialized();
          let { request: t, iss: i } = e;
          return tR(t, i);
        }),
        ac(this, "processRelayMessageCache", () => {
          setTimeout(async () => {
            if (0 !== this.relayMessageCache.length)
              for (; this.relayMessageCache.length > 0; )
                try {
                  let e = this.relayMessageCache.shift();
                  e && (await this.onRelayMessage(e));
                } catch (e) {
                  this.client.logger.error(e);
                }
          }, 50);
        }),
        ac(this, "cleanupDuplicatePairings", async (e) => {
          if (e.pairingTopic)
            try {
              let t = this.client.core.pairing.pairings.get(e.pairingTopic),
                i = this.client.core.pairing.pairings.getAll().filter((i) => {
                  var s, r;
                  return (
                    (null == (s = i.peerMetadata) ? void 0 : s.url) &&
                    (null == (r = i.peerMetadata) ? void 0 : r.url) ===
                      e.peer.metadata.url &&
                    i.topic &&
                    i.topic !== t.topic
                  );
                });
              if (0 === i.length) return;
              (this.client.logger.info(
                `Cleaning up ${i.length} duplicate pairing(s)`,
              ),
                await Promise.all(
                  i.map((e) =>
                    this.client.core.pairing.disconnect({ topic: e.topic }),
                  ),
                ),
                this.client.logger.info(
                  "Duplicate pairings clean up finished",
                ));
            } catch (e) {
              this.client.logger.error(e);
            }
        }),
        ac(this, "deleteSession", async (e) => {
          var t;
          let {
              topic: i,
              expirerHasDeleted: s = !1,
              emitEvent: r = !0,
              id: n = 0,
            } = e,
            { self: a } = this.client.session.get(i);
          (await this.client.core.relayer.unsubscribe(i),
            await this.client.session.delete(i, si("USER_DISCONNECTED")),
            this.addToRecentlyDeleted(i, "session"),
            this.client.core.crypto.keychain.has(a.publicKey) &&
              (await this.client.core.crypto.deleteKeyPair(a.publicKey)),
            this.client.core.crypto.keychain.has(i) &&
              (await this.client.core.crypto.deleteSymKey(i)),
            s || this.client.core.expirer.del(i),
            this.client.core.storage
              .removeItem(nX)
              .catch((e) => this.client.logger.warn(e)),
            this.getPendingSessionRequests().forEach((e) => {
              e.topic === i &&
                this.deletePendingSessionRequest(e.id, si("USER_DISCONNECTED"));
            }),
            i ===
              (null == (t = this.sessionRequestQueue.queue[0])
                ? void 0
                : t.topic) && (this.sessionRequestQueue.state = n4),
            r &&
              this.client.events.emit("session_delete", { id: n, topic: i }));
        }),
        ac(this, "deleteProposal", async (e, t) => {
          if (t)
            try {
              let t = this.client.proposal.get(e),
                i = this.client.core.eventClient.getEvent({
                  topic: t.pairingTopic,
                });
              i?.setError("proposal_expired");
            } catch {}
          (await Promise.all([
            this.client.proposal.delete(e, si("USER_DISCONNECTED")),
            t ? Promise.resolve() : this.client.core.expirer.del(e),
          ]),
            this.addToRecentlyDeleted(e, "proposal"));
        }),
        ac(this, "deletePendingSessionRequest", async (e, t, i = !1) => {
          (await Promise.all([
            this.client.pendingRequest.delete(e, t),
            i ? Promise.resolve() : this.client.core.expirer.del(e),
          ]),
            this.addToRecentlyDeleted(e, "request"),
            (this.sessionRequestQueue.queue =
              this.sessionRequestQueue.queue.filter((t) => t.id !== e)),
            i &&
              ((this.sessionRequestQueue.state = n4),
              this.client.events.emit("session_request_expire", { id: e })));
        }),
        ac(this, "deletePendingAuthRequest", async (e, t, i = !1) => {
          await Promise.all([
            this.client.auth.requests.delete(e, t),
            i ? Promise.resolve() : this.client.core.expirer.del(e),
          ]);
        }),
        ac(this, "setExpiry", async (e, t) => {
          this.client.session.keys.includes(e) &&
            (this.client.core.expirer.set(e, t),
            await this.client.session.update(e, { expiry: t }));
        }),
        ac(this, "setProposal", async (e, t) => {
          (this.client.core.expirer.set(e, eK(n2.wc_sessionPropose.req.ttl)),
            await this.client.proposal.set(e, t));
        }),
        ac(this, "setAuthRequest", async (e, t) => {
          let { request: i, pairingTopic: s, transportType: r = sV } = t;
          (this.client.core.expirer.set(e, i.expiryTimestamp),
            await this.client.auth.requests.set(e, {
              authPayload: i.authPayload,
              requester: i.requester,
              expiryTimestamp: i.expiryTimestamp,
              id: e,
              pairingTopic: s,
              verifyContext: i.verifyContext,
              transportType: r,
            }));
        }),
        ac(this, "setPendingSessionRequest", async (e) => {
          let { id: t, topic: i, params: s, verifyContext: r } = e,
            n = s.request.expiryTimestamp || eK(n2.wc_sessionRequest.req.ttl);
          (this.client.core.expirer.set(t, n),
            await this.client.pendingRequest.set(t, {
              id: t,
              topic: i,
              params: s,
              verifyContext: r,
            }));
        }),
        ac(this, "sendRequest", async (t) => {
          let i,
            s,
            {
              topic: r,
              method: n,
              params: a,
              expiry: o,
              relayRpcId: c,
              clientRpcId: l,
              throwOnFailedPublish: h,
              appLink: p,
              tvf: d,
            } = t,
            u = (0, sE.i)(n, a, l),
            g = !!p;
          try {
            let e = g ? iV : iK;
            i = await this.client.core.crypto.encode(r, u, { encoding: e });
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendRequest() -> core.crypto.encode() for topic ${r} failed`,
              ),
              e
            );
          }
          if (n6.includes(n)) {
            let e = iW(JSON.stringify(u)),
              t = iW(i);
            s = await this.client.core.verify.register({
              id: t,
              decryptedId: e,
            });
          }
          let f = n2[n].req;
          if (
            ((f.attestation = s),
            o && (f.ttl = o),
            c && (f.id = c),
            this.client.core.history.set(r, u),
            g)
          ) {
            let t = i4(p, r, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e,
              t = n2[n].req;
            (o && (t.ttl = o),
              c && (t.id = c),
              (t.tvf = at(ao({}, d), ai({ correlationId: u.id }))),
              h
                ? ((e = ao({}, t.internal)),
                  (t.internal = at(e, ai({ throwOnFailedPublish: !0 }))),
                  await this.client.core.relayer.publish(r, i, t))
                : this.client.core.relayer
                    .publish(r, i, t)
                    .catch((e) => this.client.logger.error(e)));
          }
          return u.id;
        }),
        ac(this, "sendResult", async (t) => {
          let i,
            s,
            r,
            {
              id: n,
              topic: a,
              result: o,
              throwOnFailedPublish: c,
              encodeOpts: l,
              appLink: h,
            } = t,
            p = (0, sE.P)(n, o),
            d = h && "u" > typeof (null == e.g ? void 0 : e.g.Linking);
          try {
            let e,
              t,
              s = d ? iV : iK;
            i = await this.client.core.crypto.encode(
              a,
              p,
              ((e = ao({}, l || {})), (t = { encoding: s }), at(e, ai(t))),
            );
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendResult() -> core.crypto.encode() for topic ${a} failed`,
              ),
              e
            );
          }
          try {
            let e = (s = await this.client.core.history.get(a, n)).request;
            try {
              this.shouldSetTVF(e.method, e.params) &&
                (r = this.getTVFParams(n, e.params, o));
            } catch (e) {
              this.client.logger.warn(
                "sendResult() -> getTVFParams() failed",
                e,
              );
            }
          } catch (e) {
            throw (
              this.client.logger.error(
                `sendResult() -> history.get(${a}, ${n}) failed`,
              ),
              e
            );
          }
          if (d) {
            let t = i4(h, a, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e,
              t = n2[s.request.method].res;
            ((t.tvf = at(ao({}, r), ai({ correlationId: n }))),
              c
                ? ((e = ao({}, t.internal)),
                  (t.internal = at(e, ai({ throwOnFailedPublish: !0 }))),
                  await this.client.core.relayer.publish(a, i, t))
                : this.client.core.relayer
                    .publish(a, i, t)
                    .catch((e) => this.client.logger.error(e)));
          }
          await this.client.core.history.resolve(p);
        }),
        ac(this, "sendError", async (t) => {
          let i,
            s,
            {
              id: r,
              topic: n,
              error: a,
              encodeOpts: o,
              rpcOpts: c,
              appLink: l,
            } = t,
            h = (0, sE.U)(r, a),
            p = l && "u" > typeof (null == e.g ? void 0 : e.g.Linking);
          try {
            let e,
              t,
              s = p ? iV : iK;
            i = await this.client.core.crypto.encode(
              n,
              h,
              ((e = ao({}, o || {})), (t = { encoding: s }), at(e, ai(t))),
            );
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendError() -> core.crypto.encode() for topic ${n} failed`,
              ),
              e
            );
          }
          try {
            s = await this.client.core.history.get(n, r);
          } catch (e) {
            throw (
              this.client.logger.error(
                `sendError() -> history.get(${n}, ${r}) failed`,
              ),
              e
            );
          }
          if (p) {
            let t = i4(l, n, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e = s.request.method,
              t = c || n2[e].res;
            this.client.core.relayer.publish(n, i, t);
          }
          await this.client.core.history.resolve(h);
        }),
        ac(this, "cleanup", async () => {
          let e = [],
            t = [];
          (this.client.session.getAll().forEach((t) => {
            let i = !1;
            (eV(t.expiry) && (i = !0),
              this.client.core.crypto.keychain.has(t.topic) || (i = !0),
              i && e.push(t.topic));
          }),
            this.client.proposal.getAll().forEach((e) => {
              eV(e.expiryTimestamp) && t.push(e.id);
            }),
            await Promise.all([
              ...e.map((e) => this.deleteSession({ topic: e })),
              ...t.map((e) => this.deleteProposal(e)),
            ]));
        }),
        ac(this, "onRelayEventRequest", async (e) => {
          (this.requestQueue.queue.push(e), await this.processRequestsQueue());
        }),
        ac(this, "processRequestsQueue", async () => {
          if (this.requestQueue.state === n8)
            return void this.client.logger.info(
              "Request queue already active, skipping...",
            );
          for (
            this.client.logger.info(
              `Request queue starting with ${this.requestQueue.queue.length} requests`,
            );
            this.requestQueue.queue.length > 0;

          ) {
            this.requestQueue.state = n8;
            let e = this.requestQueue.queue.shift();
            if (e)
              try {
                await this.processRequest(e);
              } catch (e) {
                this.client.logger.warn(e);
              }
          }
          this.requestQueue.state = n4;
        }),
        ac(this, "processRequest", async (e) => {
          let {
              topic: t,
              payload: i,
              attestation: s,
              transportType: r,
              encryptedId: n,
            } = e,
            a = i.method;
          if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a }))
            switch (a) {
              case "wc_sessionPropose":
                return await this.onSessionProposeRequest({
                  topic: t,
                  payload: i,
                  attestation: s,
                  encryptedId: n,
                });
              case "wc_sessionSettle":
                return await this.onSessionSettleRequest(t, i);
              case "wc_sessionUpdate":
                return await this.onSessionUpdateRequest(t, i);
              case "wc_sessionExtend":
                return await this.onSessionExtendRequest(t, i);
              case "wc_sessionPing":
                return await this.onSessionPingRequest(t, i);
              case "wc_sessionDelete":
                return await this.onSessionDeleteRequest(t, i);
              case "wc_sessionRequest":
                return await this.onSessionRequest({
                  topic: t,
                  payload: i,
                  attestation: s,
                  encryptedId: n,
                  transportType: r,
                });
              case "wc_sessionEvent":
                return await this.onSessionEventRequest(t, i);
              case "wc_sessionAuthenticate":
                return await this.onSessionAuthenticateRequest({
                  topic: t,
                  payload: i,
                  attestation: s,
                  encryptedId: n,
                  transportType: r,
                });
              default:
                return this.client.logger.info(
                  `Unsupported request method ${a}`,
                );
            }
        }),
        ac(this, "onRelayEventResponse", async (e) => {
          let { topic: t, payload: i, transportType: s } = e,
            r = (await this.client.core.history.get(t, i.id)).request.method;
          switch (r) {
            case "wc_sessionPropose":
              return this.onSessionProposeResponse(t, i, s);
            case "wc_sessionSettle":
              return this.onSessionSettleResponse(t, i);
            case "wc_sessionUpdate":
              return this.onSessionUpdateResponse(t, i);
            case "wc_sessionExtend":
              return this.onSessionExtendResponse(t, i);
            case "wc_sessionPing":
              return this.onSessionPingResponse(t, i);
            case "wc_sessionRequest":
              return this.onSessionRequestResponse(t, i);
            case "wc_sessionAuthenticate":
              return this.onSessionAuthenticateResponse(t, i);
            default:
              return this.client.logger.info(
                `Unsupported response method ${r}`,
              );
          }
        }),
        ac(this, "onRelayEventUnknownPayload", (e) => {
          let { topic: t } = e,
            { message: i } = st(
              "MISSING_OR_INVALID",
              `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`,
            );
          throw Error(i);
        }),
        ac(this, "shouldIgnorePairingRequest", (e) => {
          let { topic: t, requestMethod: i } = e,
            s = this.expectedPairingMethodMap.get(t);
          return (
            !(!s || s.includes(i)) &&
            !!(
              s.includes("wc_sessionAuthenticate") &&
              this.client.events.listenerCount("session_authenticate") > 0
            )
          );
        }),
        ac(this, "onSessionProposeRequest", async (e) => {
          let { topic: t, payload: i, attestation: s, encryptedId: r } = e,
            { params: n, id: a } = i;
          try {
            let e = this.client.core.eventClient.getEvent({ topic: t });
            (0 === this.client.events.listenerCount("session_proposal") &&
              (console.warn("No listener for session_proposal event"),
              e?.setError("proposal_listener_not_found")),
              this.isValidConnect(ao({}, i.params)));
            let o = n.expiryTimestamp || eK(n2.wc_sessionPropose.req.ttl),
              c = ao({ id: a, pairingTopic: t, expiryTimestamp: o }, n);
            await this.setProposal(a, c);
            let l = await this.getVerifyContext({
              attestationId: s,
              hash: iW(JSON.stringify(i)),
              encryptedId: r,
              metadata: c.proposer.metadata,
            });
            (e?.addTrace("emit_session_proposal"),
              this.client.events.emit("session_proposal", {
                id: a,
                params: c,
                verifyContext: l,
              }));
          } catch (e) {
            (await this.sendError({
              id: a,
              topic: t,
              error: e,
              rpcOpts: n2.wc_sessionPropose.autoReject,
            }),
              this.client.logger.error(e));
          }
        }),
        ac(this, "onSessionProposeResponse", async (e, t, i) => {
          let { id: s } = t;
          if ((0, sN.t)(t)) {
            let { result: r } = t;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              result: r,
            });
            let n = this.client.proposal.get(s);
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              proposal: n,
            });
            let a = n.proposer.publicKey;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              selfPublicKey: a,
            });
            let o = r.responderPublicKey;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              peerPublicKey: o,
            });
            let c = await this.client.core.crypto.generateSharedKey(a, o);
            this.pendingSessions.set(s, {
              sessionTopic: c,
              pairingTopic: e,
              proposalId: s,
              publicKey: a,
            });
            let l = await this.client.core.relayer.subscribe(c, {
              transportType: i,
            });
            (this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              subscriptionId: l,
            }),
              await this.client.core.pairing.activate({ topic: e }));
          } else if ((0, sN.x)(t)) {
            await this.client.proposal.delete(s, si("USER_DISCONNECTED"));
            let e = eH("session_connect", s);
            if (0 === this.events.listenerCount(e))
              throw Error(`emitting ${e} without any listeners, 954`);
            this.events.emit(e, { error: t.error });
          }
        }),
        ac(this, "onSessionSettleRequest", async (e, t) => {
          let { id: i, params: s } = t;
          try {
            let i, r;
            this.isValidSessionSettleRequest(s);
            let {
                relay: n,
                controller: a,
                expiry: o,
                namespaces: c,
                sessionProperties: l,
                sessionConfig: h,
              } = t.params,
              p = [...this.pendingSessions.values()].find(
                (t) => t.sessionTopic === e,
              );
            if (!p)
              return this.client.logger.error(
                `Pending session not found for topic ${e}`,
              );
            let d = this.client.proposal.get(p.proposalId),
              u =
                ((i = ao(
                  ao(
                    {
                      topic: e,
                      relay: n,
                      expiry: o,
                      namespaces: c,
                      acknowledged: !0,
                      pairingTopic: p.pairingTopic,
                      requiredNamespaces: d.requiredNamespaces,
                      optionalNamespaces: d.optionalNamespaces,
                      controller: a.publicKey,
                      self: {
                        publicKey: p.publicKey,
                        metadata: this.client.metadata,
                      },
                      peer: { publicKey: a.publicKey, metadata: a.metadata },
                    },
                    l && { sessionProperties: l },
                  ),
                  h && { sessionConfig: h },
                )),
                (r = { transportType: sV }),
                at(i, ai(r)));
            (await this.client.session.set(u.topic, u),
              await this.setExpiry(u.topic, u.expiry),
              await this.client.core.pairing.updateMetadata({
                topic: p.pairingTopic,
                metadata: u.peer.metadata,
              }),
              this.client.events.emit("session_connect", { session: u }),
              this.events.emit(eH("session_connect", p.proposalId), {
                session: u,
              }),
              this.pendingSessions.delete(p.proposalId),
              this.deleteProposal(p.proposalId, !1),
              this.cleanupDuplicatePairings(u),
              await this.sendResult({
                id: t.id,
                topic: e,
                result: !0,
                throwOnFailedPublish: !0,
              }));
          } catch (t) {
            (await this.sendError({ id: i, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ac(this, "onSessionSettleResponse", async (e, t) => {
          let { id: i } = t;
          (0, sN.t)(t)
            ? (await this.client.session.update(e, { acknowledged: !0 }),
              this.events.emit(eH("session_approve", i), {}))
            : (0, sN.x)(t) &&
              (await this.client.session.delete(e, si("USER_DISCONNECTED")),
              this.events.emit(eH("session_approve", i), { error: t.error }));
        }),
        ac(this, "onSessionUpdateRequest", async (e, t) => {
          let { params: i, id: s } = t;
          try {
            let t = `${e}_session_update`,
              r = sb.get(t);
            if (r && this.isRequestOutOfSync(r, s)) {
              (this.client.logger.warn(`Discarding out of sync request - ${s}`),
                this.sendError({
                  id: s,
                  topic: e,
                  error: si("INVALID_UPDATE_REQUEST"),
                }));
              return;
            }
            this.isValidUpdate(ao({ topic: e }, i));
            try {
              (sb.set(t, s),
                await this.client.session.update(e, {
                  namespaces: i.namespaces,
                }),
                await this.sendResult({
                  id: s,
                  topic: e,
                  result: !0,
                  throwOnFailedPublish: !0,
                }));
            } catch (e) {
              throw (sb.delete(t), e);
            }
            this.client.events.emit("session_update", {
              id: s,
              topic: e,
              params: i,
            });
          } catch (t) {
            (await this.sendError({ id: s, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ac(
          this,
          "isRequestOutOfSync",
          (e, t) => t.toString().slice(0, -3) < e.toString().slice(0, -3),
        ),
        ac(this, "onSessionUpdateResponse", (e, t) => {
          let { id: i } = t,
            s = eH("session_update", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, sN.t)(t)
            ? this.events.emit(eH("session_update", i), {})
            : (0, sN.x)(t) &&
              this.events.emit(eH("session_update", i), { error: t.error });
        }),
        ac(this, "onSessionExtendRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidExtend({ topic: e }),
              await this.setExpiry(e, eK(n1)),
              await this.sendResult({
                id: i,
                topic: e,
                result: !0,
                throwOnFailedPublish: !0,
              }),
              this.client.events.emit("session_extend", { id: i, topic: e }));
          } catch (t) {
            (await this.sendError({ id: i, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ac(this, "onSessionExtendResponse", (e, t) => {
          let { id: i } = t,
            s = eH("session_extend", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, sN.t)(t)
            ? this.events.emit(eH("session_extend", i), {})
            : (0, sN.x)(t) &&
              this.events.emit(eH("session_extend", i), { error: t.error });
        }),
        ac(this, "onSessionPingRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidPing({ topic: e }),
              await this.sendResult({
                id: i,
                topic: e,
                result: !0,
                throwOnFailedPublish: !0,
              }),
              this.client.events.emit("session_ping", { id: i, topic: e }));
          } catch (t) {
            (await this.sendError({ id: i, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ac(this, "onSessionPingResponse", (e, t) => {
          let { id: i } = t,
            s = eH("session_ping", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          setTimeout(() => {
            (0, sN.t)(t)
              ? this.events.emit(eH("session_ping", i), {})
              : (0, sN.x)(t) &&
                this.events.emit(eH("session_ping", i), { error: t.error });
          }, 500);
        }),
        ac(this, "onSessionDeleteRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidDisconnect({ topic: e, reason: t.params }),
              Promise.all([
                new Promise((t) => {
                  this.client.core.relayer.once(sj, async () => {
                    t(await this.deleteSession({ topic: e, id: i }));
                  });
                }),
                this.sendResult({
                  id: i,
                  topic: e,
                  result: !0,
                  throwOnFailedPublish: !0,
                }),
                this.cleanupPendingSentRequestsForTopic({
                  topic: e,
                  error: si("USER_DISCONNECTED"),
                }),
              ]).catch((e) => this.client.logger.error(e)));
          } catch (e) {
            this.client.logger.error(e);
          }
        }),
        ac(this, "onSessionRequest", async (e) => {
          var t, i, s;
          let {
              topic: r,
              payload: n,
              attestation: a,
              encryptedId: o,
              transportType: c,
            } = e,
            { id: l, params: h } = n;
          try {
            await this.isValidRequest(ao({ topic: r }, h));
            let e = this.client.session.get(r),
              n = await this.getVerifyContext({
                attestationId: a,
                hash: iW(JSON.stringify((0, sE.i)("wc_sessionRequest", h, l))),
                encryptedId: o,
                metadata: e.peer.metadata,
                transportType: c,
              }),
              p = { id: l, topic: r, params: h, verifyContext: n };
            (await this.setPendingSessionRequest(p),
              c === sK &&
                null != (t = e.peer.metadata.redirect) &&
                t.universal &&
                this.client.core.addLinkModeSupportedApp(
                  null == (i = e.peer.metadata.redirect) ? void 0 : i.universal,
                ),
              null != (s = this.client.signConfig) && s.disableRequestQueue
                ? this.emitSessionRequest(p)
                : (this.addSessionRequestToSessionRequestQueue(p),
                  this.processSessionRequestQueue()));
          } catch (e) {
            (await this.sendError({ id: l, topic: r, error: e }),
              this.client.logger.error(e));
          }
        }),
        ac(this, "onSessionRequestResponse", (e, t) => {
          let { id: i } = t,
            s = eH("session_request", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, sN.t)(t)
            ? this.events.emit(eH("session_request", i), { result: t.result })
            : (0, sN.x)(t) &&
              this.events.emit(eH("session_request", i), { error: t.error });
        }),
        ac(this, "onSessionEventRequest", async (e, t) => {
          let { id: i, params: s } = t;
          try {
            let t = `${e}_session_event_${s.event.name}`,
              r = sb.get(t);
            if (r && this.isRequestOutOfSync(r, i))
              return void this.client.logger.info(
                `Discarding out of sync request - ${i}`,
              );
            (this.isValidEmit(ao({ topic: e }, s)),
              this.client.events.emit("session_event", {
                id: i,
                topic: e,
                params: s,
              }),
              sb.set(t, i));
          } catch (t) {
            (await this.sendError({ id: i, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ac(this, "onSessionAuthenticateResponse", (e, t) => {
          let { id: i } = t;
          (this.client.logger.trace({
            type: "method",
            method: "onSessionAuthenticateResponse",
            topic: e,
            payload: t,
          }),
            (0, sN.t)(t)
              ? this.events.emit(eH("session_request", i), { result: t.result })
              : (0, sN.x)(t) &&
                this.events.emit(eH("session_request", i), { error: t.error }));
        }),
        ac(this, "onSessionAuthenticateRequest", async (e) => {
          var t;
          let {
            topic: i,
            payload: s,
            attestation: r,
            encryptedId: n,
            transportType: a,
          } = e;
          try {
            let { requester: e, authPayload: o, expiryTimestamp: c } = s.params,
              l = await this.getVerifyContext({
                attestationId: r,
                hash: iW(JSON.stringify(s)),
                encryptedId: n,
                metadata: e.metadata,
                transportType: a,
              }),
              h = {
                requester: e,
                pairingTopic: i,
                id: s.id,
                authPayload: o,
                verifyContext: l,
                expiryTimestamp: c,
              };
            (await this.setAuthRequest(s.id, {
              request: h,
              pairingTopic: i,
              transportType: a,
            }),
              a === sK &&
                null != (t = e.metadata.redirect) &&
                t.universal &&
                this.client.core.addLinkModeSupportedApp(
                  e.metadata.redirect.universal,
                ),
              this.client.events.emit("session_authenticate", {
                topic: i,
                params: s.params,
                id: s.id,
                verifyContext: l,
              }));
          } catch (n) {
            this.client.logger.error(n);
            let e = s.params.requester.publicKey,
              t = await this.client.core.crypto.generateKeyPair(),
              r = this.getAppLinkIfEnabled(s.params.requester.metadata, a);
            await this.sendError({
              id: s.id,
              topic: i,
              error: n,
              encodeOpts: { type: 1, receiverPublicKey: e, senderPublicKey: t },
              rpcOpts: n2.wc_sessionAuthenticate.autoReject,
              appLink: r,
            });
          }
        }),
        ac(this, "addSessionRequestToSessionRequestQueue", (e) => {
          this.sessionRequestQueue.queue.push(e);
        }),
        ac(this, "cleanupAfterResponse", (e) => {
          (this.deletePendingSessionRequest(e.response.id, {
            message: "fulfilled",
            code: 0,
          }),
            setTimeout(
              () => {
                ((this.sessionRequestQueue.state = n4),
                  this.processSessionRequestQueue());
              },
              (0, ep.toMiliseconds)(this.requestQueueDelay),
            ));
        }),
        ac(
          this,
          "cleanupPendingSentRequestsForTopic",
          ({ topic: e, error: t }) => {
            let i = this.client.core.history.pending;
            i.length > 0 &&
              i
                .filter(
                  (t) =>
                    t.topic === e && "wc_sessionRequest" === t.request.method,
                )
                .forEach((e) => {
                  let i = eH("session_request", e.request.id);
                  if (0 === this.events.listenerCount(i))
                    throw Error(`emitting ${i} without any listeners`);
                  this.events.emit(eH("session_request", e.request.id), {
                    error: t,
                  });
                });
          },
        ),
        ac(this, "processSessionRequestQueue", () => {
          if (this.sessionRequestQueue.state === n8)
            return void this.client.logger.info(
              "session request queue is already active.",
            );
          let e = this.sessionRequestQueue.queue[0];
          if (!e)
            return void this.client.logger.info(
              "session request queue is empty.",
            );
          try {
            ((this.sessionRequestQueue.state = n8), this.emitSessionRequest(e));
          } catch (e) {
            this.client.logger.error(e);
          }
        }),
        ac(this, "emitSessionRequest", (e) => {
          this.client.events.emit("session_request", e);
        }),
        ac(this, "onPairingCreated", (e) => {
          if (
            (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods),
            e.active)
          )
            return;
          let t = this.client.proposal
            .getAll()
            .find((t) => t.pairingTopic === e.topic);
          t &&
            this.onSessionProposeRequest({
              topic: e.topic,
              payload: (0, sE.i)(
                "wc_sessionPropose",
                {
                  requiredNamespaces: t.requiredNamespaces,
                  optionalNamespaces: t.optionalNamespaces,
                  relays: t.relays,
                  proposer: t.proposer,
                  sessionProperties: t.sessionProperties,
                },
                t.id,
              ),
            });
        }),
        ac(this, "isValidConnect", async (e) => {
          let t;
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `connect() params: ${JSON.stringify(e)}`,
            );
            throw Error(t);
          }
          let {
            pairingTopic: i,
            requiredNamespaces: s,
            optionalNamespaces: r,
            sessionProperties: n,
            relays: a,
          } = e;
          if (
            (sn(i) || (await this.isValidPairingTopic(i)),
            (t = !1),
            a
              ? a &&
                ss(a) &&
                a.length &&
                a.forEach((e) => {
                  t = sd(e);
                })
              : (t = !0),
            !t)
          ) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `connect() relays: ${a}`,
            );
            throw Error(e);
          }
          (sn(s) ||
            0 === sr(s) ||
            this.validateNamespaces(s, "requiredNamespaces"),
            sn(r) ||
              0 === sr(r) ||
              this.validateNamespaces(r, "optionalNamespaces"),
            sn(n) || this.validateSessionProps(n, "sessionProperties"));
        }),
        ac(this, "validateNamespaces", (e, t) => {
          let i = (function (e, t, i) {
            let s = null;
            if (e && sr(e)) {
              let r,
                n = sh(e, t);
              n && (s = n);
              let a =
                ((r = null),
                Object.entries(e).forEach(([e, s]) => {
                  var n, a;
                  let o;
                  if (r) return;
                  let c =
                    ((n = e_(e, s)),
                    (a = `${t} ${i}`),
                    (o = null),
                    ss(n) && n.length
                      ? n.forEach((e) => {
                          o ||
                            sc(e) ||
                            (o = si(
                              "UNSUPPORTED_CHAINS",
                              `${a}, chain ${e} should be a string and conform to "namespace:chainId" format`,
                            ));
                        })
                      : sc(e) ||
                        (o = si(
                          "UNSUPPORTED_CHAINS",
                          `${a}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`,
                        )),
                    o);
                  c && (r = c);
                }),
                r);
              a && (s = a);
            } else
              s = st(
                "MISSING_OR_INVALID",
                `${t}, ${i} should be an object with data`,
              );
            return s;
          })(e, "connect()", t);
          if (i) throw Error(i.message);
        }),
        ac(this, "isValidApprove", async (e) => {
          if (!su(e))
            throw Error(
              st("MISSING_OR_INVALID", `approve() params: ${e}`).message,
            );
          let {
            id: t,
            namespaces: i,
            relayProtocol: s,
            sessionProperties: r,
          } = e;
          (this.checkRecentlyDeleted(t), await this.isValidProposalId(t));
          let n = this.client.proposal.get(t),
            a = sp(i, "approve()");
          if (a) throw Error(a.message);
          let o = sf(n.requiredNamespaces, i, "approve()");
          if (o) throw Error(o.message);
          if (!sa(s, !0)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `approve() relayProtocol: ${s}`,
            );
            throw Error(e);
          }
          sn(r) || this.validateSessionProps(r, "sessionProperties");
        }),
        ac(this, "isValidReject", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `reject() params: ${e}`,
            );
            throw Error(t);
          }
          let { id: t, reason: i } = e;
          if (
            (this.checkRecentlyDeleted(t),
            await this.isValidProposalId(t),
            !i ||
              "object" != typeof i ||
              !i.code ||
              !so(i.code, !1) ||
              !i.message ||
              !sa(i.message, !1))
          ) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `reject() reason: ${JSON.stringify(i)}`,
            );
            throw Error(e);
          }
        }),
        ac(this, "isValidSessionSettleRequest", (e) => {
          let t;
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `onSessionSettleRequest() params: ${e}`,
            );
            throw Error(t);
          }
          let { relay: i, controller: s, namespaces: r, expiry: n } = e;
          if (!sd(i)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              "onSessionSettleRequest() relay protocol should be a string",
            );
            throw Error(e);
          }
          let a =
            ((t = null),
            sa(s?.publicKey, !1) ||
              (t = st(
                "MISSING_OR_INVALID",
                "onSessionSettleRequest() controller public key should be a string",
              )),
            t);
          if (a) throw Error(a.message);
          let o = sp(r, "onSessionSettleRequest()");
          if (o) throw Error(o.message);
          if (eV(n)) {
            let { message: e } = st("EXPIRED", "onSessionSettleRequest()");
            throw Error(e);
          }
        }),
        ac(this, "isValidUpdate", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `update() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t, namespaces: i } = e;
          (this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t));
          let s = this.client.session.get(t),
            r = sp(i, "update()");
          if (r) throw Error(r.message);
          let n = sf(s.requiredNamespaces, i, "update()");
          if (n) throw Error(n.message);
        }),
        ac(this, "isValidExtend", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `extend() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          (this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t));
        }),
        ac(this, "isValidRequest", async (e) => {
          var t;
          let i;
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `request() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: s, request: r, chainId: n, expiry: a } = e;
          (this.checkRecentlyDeleted(s), await this.isValidSessionTopic(s));
          let { namespaces: o } = this.client.session.get(s);
          if (!sg(o, n)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `request() chainId: ${n}`,
            );
            throw Error(e);
          }
          if (sn(r) || !sa(r.method, !1)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `request() ${JSON.stringify(r)}`,
            );
            throw Error(e);
          }
          if (
            !(
              sa((t = r.method), !1) &&
              ((i = []),
              Object.values(o).forEach((e) => {
                i8(e.accounts).includes(n) && i.push(...e.methods);
              }),
              i).includes(t)
            )
          ) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `request() method: ${r.method}`,
            );
            throw Error(e);
          }
          if (a && (!so(a, !1) || !(a <= n5.max) || !(a >= n5.min))) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `request() expiry: ${a}. Expiry must be a number (in seconds) between ${n5.min} and ${n5.max}`,
            );
            throw Error(e);
          }
        }),
        ac(this, "isValidRespond", async (e) => {
          var t;
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `respond() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: i, response: s } = e;
          try {
            await this.isValidSessionTopic(i);
          } catch (i) {
            throw (
              null != (t = e?.response) && t.id && this.cleanupAfterResponse(e),
              i
            );
          }
          if (
            sn(s) ||
            (sn(s.result) && sn(s.error)) ||
            !so(s.id, !1) ||
            !sa(s.jsonrpc, !1)
          ) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `respond() response: ${JSON.stringify(s)}`,
            );
            throw Error(e);
          }
        }),
        ac(this, "isValidPing", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `ping() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidSessionOrPairingTopic(t);
        }),
        ac(this, "isValidEmit", async (e) => {
          var t;
          let i;
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `emit() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: s, event: r, chainId: n } = e;
          await this.isValidSessionTopic(s);
          let { namespaces: a } = this.client.session.get(s);
          if (!sg(a, n)) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `emit() chainId: ${n}`,
            );
            throw Error(e);
          }
          if (
            sn(r) ||
            !sa(r.name, !1) ||
            !(
              sa((t = r.name), !1) &&
              ((i = []),
              Object.values(a).forEach((e) => {
                i8(e.accounts).includes(n) && i.push(...e.events);
              }),
              i).includes(t)
            )
          ) {
            let { message: e } = st(
              "MISSING_OR_INVALID",
              `emit() event: ${JSON.stringify(r)}`,
            );
            throw Error(e);
          }
        }),
        ac(this, "isValidDisconnect", async (e) => {
          if (!su(e)) {
            let { message: t } = st(
              "MISSING_OR_INVALID",
              `disconnect() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidSessionOrPairingTopic(t);
        }),
        ac(this, "isValidAuthenticate", (e) => {
          let { chains: t, uri: i, domain: s, nonce: r } = e;
          if (!Array.isArray(t) || 0 === t.length)
            throw Error("chains is required and must be a non-empty array");
          if (!sa(i, !1)) throw Error("uri is required parameter");
          if (!sa(s, !1)) throw Error("domain is required parameter");
          if (!sa(r, !1)) throw Error("nonce is required parameter");
          if ([...new Set(t.map((e) => eN(e).namespace))].length > 1)
            throw Error(
              "Multi-namespace requests are not supported. Please request single namespace only.",
            );
          let { namespace: n } = eN(t[0]);
          if ("eip155" !== n)
            throw Error(
              "Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.",
            );
        }),
        ac(this, "getVerifyContext", async (e) => {
          let {
              attestationId: t,
              hash: i,
              encryptedId: s,
              metadata: r,
              transportType: n,
            } = e,
            a = {
              verified: {
                verifyUrl: r.verifyUrl || s5,
                validation: "UNKNOWN",
                origin: r.url || "",
              },
            };
          try {
            if (n === sK) {
              let e = this.getAppLinkIfEnabled(r, n);
              return (
                (a.verified.validation =
                  e && new URL(e).origin === new URL(r.url).origin
                    ? "VALID"
                    : "INVALID"),
                a
              );
            }
            let e = await this.client.core.verify.resolve({
              attestationId: t,
              hash: i,
              encryptedId: s,
              verifyUrl: r.verifyUrl,
            });
            e &&
              ((a.verified.origin = e.origin),
              (a.verified.isScam = e.isScam),
              (a.verified.validation =
                e.origin === new URL(r.url).origin ? "VALID" : "INVALID"));
          } catch (e) {
            this.client.logger.warn(e);
          }
          return (
            this.client.logger.debug(`Verify context: ${JSON.stringify(a)}`),
            a
          );
        }),
        ac(this, "validateSessionProps", (e, t) => {
          Object.values(e).forEach((e) => {
            if (!sa(e, !1)) {
              let { message: i } = st(
                "MISSING_OR_INVALID",
                `${t} must be in Record<string, string> format. Received: ${JSON.stringify(e)}`,
              );
              throw Error(i);
            }
          });
        }),
        ac(this, "getPendingAuthRequest", (e) => {
          let t = this.client.auth.requests.get(e);
          return "object" == typeof t ? t : void 0;
        }),
        ac(this, "addToRecentlyDeleted", (e, t) => {
          if (
            (this.recentlyDeletedMap.set(e, t),
            this.recentlyDeletedMap.size >= this.recentlyDeletedLimit)
          ) {
            let e = 0,
              t = this.recentlyDeletedLimit / 2;
            for (let i of this.recentlyDeletedMap.keys()) {
              if (e++ >= t) break;
              this.recentlyDeletedMap.delete(i);
            }
          }
        }),
        ac(this, "checkRecentlyDeleted", (e) => {
          let t = this.recentlyDeletedMap.get(e);
          if (t) {
            let { message: i } = st(
              "MISSING_OR_INVALID",
              `Record was recently deleted - ${t}: ${e}`,
            );
            throw Error(i);
          }
        }),
        ac(this, "isLinkModeEnabled", (t, i) => {
          var s, r, n, a, o, c, l, h, p;
          return (
            !!t &&
            i === sK &&
            (null ==
            (r = null == (s = this.client.metadata) ? void 0 : s.redirect)
              ? void 0
              : r.linkMode) === !0 &&
            (null ==
            (a = null == (n = this.client.metadata) ? void 0 : n.redirect)
              ? void 0
              : a.universal) !== void 0 &&
            (null ==
            (c = null == (o = this.client.metadata) ? void 0 : o.redirect)
              ? void 0
              : c.universal) !== "" &&
            (null == (l = t?.redirect) ? void 0 : l.universal) !== void 0 &&
            (null == (h = t?.redirect) ? void 0 : h.universal) !== "" &&
            (null == (p = t?.redirect) ? void 0 : p.linkMode) === !0 &&
            this.client.core.linkModeSupportedApps.includes(
              t.redirect.universal,
            ) &&
            "u" > typeof (null == e.g ? void 0 : e.g.Linking)
          );
        }),
        ac(this, "getAppLinkIfEnabled", (e, t) => {
          var i;
          return this.isLinkModeEnabled(e, t)
            ? null == (i = e?.redirect)
              ? void 0
              : i.universal
            : void 0;
        }),
        ac(this, "handleLinkModeMessage", ({ url: e }) => {
          if (!e || !e.includes("wc_ev") || !e.includes("topic")) return;
          let t = eY(e, "topic") || "",
            i = decodeURIComponent(eY(e, "wc_ev") || ""),
            s = this.client.session.keys.includes(t);
          (s && this.client.session.update(t, { transportType: sK }),
            this.client.core.dispatchEnvelope({
              topic: t,
              message: i,
              sessionExists: s,
            }));
        }),
        ac(this, "registerLinkModeListeners", async () => {
          var t;
          if (
            eQ() ||
            (eS() && null != (t = this.client.metadata.redirect) && t.linkMode)
          ) {
            let t = null == e.g ? void 0 : e.g.Linking;
            if ("u" > typeof t) {
              t.addEventListener(
                "url",
                this.handleLinkModeMessage,
                this.client.name,
              );
              let e = await t.getInitialURL();
              e &&
                setTimeout(() => {
                  this.handleLinkModeMessage({ url: e });
                }, 50);
            }
          }
        }),
        ac(this, "shouldSetTVF", (e, t) => {
          if (!t || "wc_sessionRequest" !== e) return !1;
          let { request: i } = t;
          return Object.keys(n3).includes(i.method);
        }),
        ac(this, "getTVFParams", (e, t, i) => {
          var s, r;
          try {
            let n,
              a,
              o = t.request.method,
              c = this.extractTxHashesFromResult(o, i);
            return (
              (n = ao(
                { correlationId: e, rpcMethods: [o], chainId: t.chainId },
                this.isValidContractData(t.request.params) && {
                  contractAddresses: [
                    null == (r = null == (s = t.request.params) ? void 0 : s[0])
                      ? void 0
                      : r.to,
                  ],
                },
              )),
              (a = { txHashes: c }),
              at(n, ai(a))
            );
          } catch (e) {
            this.client.logger.warn("Error getting TVF params", e);
          }
          return {};
        }),
        ac(this, "isValidContractData", (e) => {
          var t;
          if (!e) return !1;
          try {
            let i = e?.data || (null == (t = e?.[0]) ? void 0 : t.data);
            if (!i.startsWith("0x")) return !1;
            let s = i.slice(2);
            return !!/^[0-9a-fA-F]*$/.test(s) && s.length % 2 == 0;
          } catch {}
          return !1;
        }),
        ac(this, "extractTxHashesFromResult", (e, t) => {
          try {
            let i = n3[e];
            if ("string" == typeof t) return [t];
            let s = t[i.key];
            if (ss(s)) return s;
            if ("string" == typeof s) return [s];
          } catch (e) {
            this.client.logger.warn(
              "Error extracting tx hashes from result",
              e,
            );
          }
          return [];
        }));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = st("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    async confirmOnlineStateOrThrow() {
      await this.client.core.relayer.confirmOnlineStateOrThrow();
    }
    registerRelayerEvents() {
      this.client.core.relayer.on(sD, (e) => {
        !this.initialized || this.relayMessageCache.length > 0
          ? this.relayMessageCache.push(e)
          : this.onRelayMessage(e);
      });
    }
    async onRelayMessage(e) {
      let { topic: t, message: i, attestation: s, transportType: r } = e,
        { publicKey: n } = this.client.auth.authKeys.keys.includes(n7)
          ? this.client.auth.authKeys.get(n7)
          : { responseTopic: void 0, publicKey: void 0 },
        a = await this.client.core.crypto.decode(t, i, {
          receiverPublicKey: n,
          encoding: r === sK ? iV : iK,
        });
      try {
        (0, sN.N)(a)
          ? (this.client.core.history.set(t, a),
            this.onRelayEventRequest({
              topic: t,
              payload: a,
              attestation: s,
              transportType: r,
              encryptedId: iW(i),
            }))
          : (0, sN.Z)(a)
            ? (await this.client.core.history.resolve(a),
              await this.onRelayEventResponse({
                topic: t,
                payload: a,
                transportType: r,
              }),
              this.client.core.history.delete(t, a.id))
            : this.onRelayEventUnknownPayload({
                topic: t,
                payload: a,
                transportType: r,
              });
      } catch (e) {
        this.client.logger.error(e);
      }
    }
    registerExpirerEvents() {
      this.client.core.expirer.on(s2, async (e) => {
        let { topic: t, id: i } = ez(e.target);
        return i && this.client.pendingRequest.keys.includes(i)
          ? await this.deletePendingSessionRequest(i, st("EXPIRED"), !0)
          : i && this.client.auth.requests.keys.includes(i)
            ? await this.deletePendingAuthRequest(i, st("EXPIRED"), !0)
            : void (t
                ? this.client.session.keys.includes(t) &&
                  (await this.deleteSession({
                    topic: t,
                    expirerHasDeleted: !0,
                  }),
                  this.client.events.emit("session_expire", { topic: t }))
                : i &&
                  (await this.deleteProposal(i, !0),
                  this.client.events.emit("proposal_expire", { id: i })));
      });
    }
    registerPairingEvents() {
      (this.client.core.pairing.events.on(sG, (e) => this.onPairingCreated(e)),
        this.client.core.pairing.events.on(sQ, (e) => {
          this.addToRecentlyDeleted(e.topic, "pairing");
        }));
    }
    isValidPairingTopic(e) {
      if (!sa(e, !1)) {
        let { message: t } = st(
          "MISSING_OR_INVALID",
          `pairing topic should be a string: ${e}`,
        );
        throw Error(t);
      }
      if (!this.client.core.pairing.pairings.keys.includes(e)) {
        let { message: t } = st(
          "NO_MATCHING_KEY",
          `pairing topic doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (eV(this.client.core.pairing.pairings.get(e).expiry)) {
        let { message: t } = st("EXPIRED", `pairing topic: ${e}`);
        throw Error(t);
      }
    }
    async isValidSessionTopic(e) {
      if (!sa(e, !1)) {
        let { message: t } = st(
          "MISSING_OR_INVALID",
          `session topic should be a string: ${e}`,
        );
        throw Error(t);
      }
      if (
        (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e))
      ) {
        let { message: t } = st(
          "NO_MATCHING_KEY",
          `session topic doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (eV(this.client.session.get(e).expiry)) {
        await this.deleteSession({ topic: e });
        let { message: t } = st("EXPIRED", `session topic: ${e}`);
        throw Error(t);
      }
      if (!this.client.core.crypto.keychain.has(e)) {
        let { message: t } = st(
          "MISSING_OR_INVALID",
          `session topic does not exist in keychain: ${e}`,
        );
        throw (await this.deleteSession({ topic: e }), Error(t));
      }
    }
    async isValidSessionOrPairingTopic(e) {
      if ((this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)))
        await this.isValidSessionTopic(e);
      else if (this.client.core.pairing.pairings.keys.includes(e))
        this.isValidPairingTopic(e);
      else if (sa(e, !1)) {
        let { message: t } = st(
          "NO_MATCHING_KEY",
          `session or pairing topic doesn't exist: ${e}`,
        );
        throw Error(t);
      } else {
        let { message: t } = st(
          "MISSING_OR_INVALID",
          `session or pairing topic should be a string: ${e}`,
        );
        throw Error(t);
      }
    }
    async isValidProposalId(e) {
      if ("number" != typeof e) {
        let { message: t } = st(
          "MISSING_OR_INVALID",
          `proposal id should be a number: ${e}`,
        );
        throw Error(t);
      }
      if (!this.client.proposal.keys.includes(e)) {
        let { message: t } = st(
          "NO_MATCHING_KEY",
          `proposal id doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (eV(this.client.proposal.get(e).expiryTimestamp)) {
        await this.deleteProposal(e);
        let { message: t } = st("EXPIRED", `proposal id: ${e}`);
        throw Error(t);
      }
    }
  }
  class ah extends nv {
    constructor(e, t) {
      (super(e, t, "proposal", nZ), (this.core = e), (this.logger = t));
    }
  }
  class ap extends nv {
    constructor(e, t) {
      (super(e, t, "session", nZ), (this.core = e), (this.logger = t));
    }
  }
  class ad extends nv {
    constructor(e, t) {
      (super(e, t, "request", nZ, (e) => e.id),
        (this.core = e),
        (this.logger = t));
    }
  }
  class au extends nv {
    constructor(e, t) {
      (super(e, t, "authKeys", n9, () => n7),
        (this.core = e),
        (this.logger = t));
    }
  }
  class ag extends nv {
    constructor(e, t) {
      (super(e, t, "pairingTopics", n9), (this.core = e), (this.logger = t));
    }
  }
  class af extends nv {
    constructor(e, t) {
      (super(e, t, "requests", n9, (e) => e.id),
        (this.core = e),
        (this.logger = t));
    }
  }
  var ay = Object.defineProperty,
    am = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? ay(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class aw {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        am(this, "authKeys"),
        am(this, "pairingTopics"),
        am(this, "requests"),
        (this.authKeys = new au(this.core, this.logger)),
        (this.pairingTopics = new ag(this.core, this.logger)),
        (this.requests = new af(this.core, this.logger)));
    }
    async init() {
      (await this.authKeys.init(),
        await this.pairingTopics.init(),
        await this.requests.init());
    }
  }
  var av = Object.defineProperty,
    ab = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? av(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class aI extends el {
    constructor(e) {
      (super(e),
        ab(this, "protocol", "wc"),
        ab(this, "version", 2),
        ab(this, "name", nJ),
        ab(this, "metadata"),
        ab(this, "core"),
        ab(this, "logger"),
        ab(this, "events", new z.EventEmitter()),
        ab(this, "engine"),
        ab(this, "session"),
        ab(this, "proposal"),
        ab(this, "pendingRequest"),
        ab(this, "auth"),
        ab(this, "signConfig"),
        ab(this, "on", (e, t) => this.events.on(e, t)),
        ab(this, "once", (e, t) => this.events.once(e, t)),
        ab(this, "off", (e, t) => this.events.off(e, t)),
        ab(this, "removeListener", (e, t) => this.events.removeListener(e, t)),
        ab(this, "removeAllListeners", (e) =>
          this.events.removeAllListeners(e),
        ),
        ab(this, "connect", async (e) => {
          try {
            return await this.engine.connect(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "pair", async (e) => {
          try {
            return await this.engine.pair(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "approve", async (e) => {
          try {
            return await this.engine.approve(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "reject", async (e) => {
          try {
            return await this.engine.reject(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "update", async (e) => {
          try {
            return await this.engine.update(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "extend", async (e) => {
          try {
            return await this.engine.extend(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "request", async (e) => {
          try {
            return await this.engine.request(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "respond", async (e) => {
          try {
            return await this.engine.respond(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "ping", async (e) => {
          try {
            return await this.engine.ping(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "emit", async (e) => {
          try {
            return await this.engine.emit(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "disconnect", async (e) => {
          try {
            return await this.engine.disconnect(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "find", (e) => {
          try {
            return this.engine.find(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "getPendingSessionRequests", () => {
          try {
            return this.engine.getPendingSessionRequests();
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "authenticate", async (e, t) => {
          try {
            return await this.engine.authenticate(e, t);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "formatAuthMessage", (e) => {
          try {
            return this.engine.formatAuthMessage(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "approveSessionAuthenticate", async (e) => {
          try {
            return await this.engine.approveSessionAuthenticate(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        ab(this, "rejectSessionAuthenticate", async (e) => {
          try {
            return await this.engine.rejectSessionAuthenticate(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        (this.name = e?.name || nJ),
        (this.metadata = e?.metadata || eD()),
        (this.signConfig = e?.signConfig));
      let t =
        "u" > typeof e?.logger && "string" != typeof e?.logger
          ? e.logger
          : (0, B.pino)((0, H.l)({ level: e?.logger || "error" }));
      ((this.core = e?.core || new nQ(e)),
        (this.logger = (0, H.v)(t, this.name)),
        (this.session = new ap(this.core, this.logger)),
        (this.proposal = new ah(this.core, this.logger)),
        (this.pendingRequest = new ad(this.core, this.logger)),
        (this.engine = new al(this)),
        (this.auth = new aw(this.core, this.logger)));
    }
    static async init(e) {
      let t = new aI(e);
      return (await t.initialize(), t);
    }
    get context() {
      return (0, H.u)(this.logger);
    }
    get pairing() {
      return this.core.pairing.pairings;
    }
    async initialize() {
      this.logger.trace("Initialized");
      try {
        (await this.core.start(),
          await this.session.init(),
          await this.proposal.init(),
          await this.pendingRequest.init(),
          await this.auth.init(),
          await this.engine.init(),
          this.logger.info("SignClient Initialization Success"),
          setTimeout(
            () => {
              this.engine.processRelayMessageCache();
            },
            (0, ep.toMiliseconds)(ep.ONE_SECOND),
          ));
      } catch (e) {
        throw (
          this.logger.info("SignClient Initialization Failure"),
          this.logger.error(e.message),
          e
        );
      }
    }
  }
  var aE = e.i(700545);
  let aN = "error",
    a_ = "wc@2:universal_provider:",
    aC = "https://rpc.walletconnect.org/v1/",
    aP = "generic",
    aA = `${aC}bundler`,
    aO = "default_chain_changed";
  var aS =
      "u" > typeof globalThis ? globalThis : "u" > typeof window ? window : e.g,
    aT = function (e, t) {
      return e === t || (e != e && t != t);
    },
    ax = function (e, t) {
      for (var i = e.length; i--; ) if (aT(e[i][0], t)) return i;
      return -1;
    },
    ak = Array.prototype.splice;
  function aD(e) {
    var t = -1,
      i = null == e ? 0 : e.length;
    for (this.clear(); ++t < i; ) {
      var s = e[t];
      this.set(s[0], s[1]);
    }
  }
  ((aD.prototype.clear = function () {
    ((this.__data__ = []), (this.size = 0));
  }),
    (aD.prototype.delete = function (e) {
      var t = this.__data__,
        i = ax(t, e);
      return (
        !(i < 0) &&
        (i == t.length - 1 ? t.pop() : ak.call(t, i, 1), --this.size, !0)
      );
    }),
    (aD.prototype.get = function (e) {
      var t = this.__data__,
        i = ax(t, e);
      return i < 0 ? void 0 : t[i][1];
    }),
    (aD.prototype.has = function (e) {
      return ax(this.__data__, e) > -1;
    }),
    (aD.prototype.set = function (e, t) {
      var i = this.__data__,
        s = ax(i, e);
      return (s < 0 ? (++this.size, i.push([e, t])) : (i[s][1] = t), this);
    }));
  var aR = "object" == typeof aS && aS && aS.Object === Object && aS,
    aM = "object" == typeof self && self && self.Object === Object && self,
    aj = aR || aM || Function("return this")(),
    aU = aj.Symbol,
    aq = Object.prototype,
    aL = aq.hasOwnProperty,
    a$ = aq.toString,
    az = aU ? aU.toStringTag : void 0,
    aK = Object.prototype.toString,
    aV = function (e) {
      var t = aL.call(e, az),
        i = e[az];
      try {
        e[az] = void 0;
        var s = !0;
      } catch {}
      var r = a$.call(e);
      return (s && (t ? (e[az] = i) : delete e[az]), r);
    },
    aH = aU ? aU.toStringTag : void 0,
    aB = function (e) {
      return null == e
        ? void 0 === e
          ? "[object Undefined]"
          : "[object Null]"
        : aH && aH in Object(e)
          ? aV(e)
          : aK.call(e);
    },
    aF = function (e) {
      var t = typeof e;
      return null != e && ("object" == t || "function" == t);
    },
    aW = function (e) {
      if (!aF(e)) return !1;
      var t = aB(e);
      return (
        "[object Function]" == t ||
        "[object GeneratorFunction]" == t ||
        "[object AsyncFunction]" == t ||
        "[object Proxy]" == t
      );
    },
    aY = aj["__core-js_shared__"],
    aG = (c = /[^.]+$/.exec((aY && aY.keys && aY.keys.IE_PROTO) || ""))
      ? "Symbol(src)_1." + c
      : "",
    aQ = Function.prototype.toString,
    aJ = function (e) {
      if (null != e) {
        try {
          return aQ.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    },
    aZ = /^\[object .+?Constructor\]$/,
    aX = Object.prototype,
    a0 = Function.prototype.toString,
    a1 = aX.hasOwnProperty,
    a2 = RegExp(
      "^" +
        a0
          .call(a1)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?",
          ) +
        "$",
    ),
    a5 = function (e) {
      return !!aF(e) && (!aG || !(aG in e)) && (aW(e) ? a2 : aZ).test(aJ(e));
    },
    a4 = function (e, t) {
      var i = e?.[t];
      return a5(i) ? i : void 0;
    },
    a8 = a4(aj, "Map"),
    a3 = a4(Object, "create"),
    a6 = Object.prototype.hasOwnProperty,
    a9 = Object.prototype.hasOwnProperty;
  function a7(e) {
    var t = -1,
      i = null == e ? 0 : e.length;
    for (this.clear(); ++t < i; ) {
      var s = e[t];
      this.set(s[0], s[1]);
    }
  }
  ((a7.prototype.clear = function () {
    ((this.__data__ = a3 ? a3(null) : {}), (this.size = 0));
  }),
    (a7.prototype.delete = function (e) {
      var t = this.has(e) && delete this.__data__[e];
      return ((this.size -= !!t), t);
    }),
    (a7.prototype.get = function (e) {
      var t = this.__data__;
      if (a3) {
        var i = t[e];
        return "__lodash_hash_undefined__" === i ? void 0 : i;
      }
      return a6.call(t, e) ? t[e] : void 0;
    }),
    (a7.prototype.has = function (e) {
      var t = this.__data__;
      return a3 ? void 0 !== t[e] : a9.call(t, e);
    }),
    (a7.prototype.set = function (e, t) {
      var i = this.__data__;
      return (
        (this.size += +!this.has(e)),
        (i[e] = a3 && void 0 === t ? "__lodash_hash_undefined__" : t),
        this
      );
    }));
  var oe = function (e) {
      var t = typeof e;
      return "string" == t || "number" == t || "symbol" == t || "boolean" == t
        ? "__proto__" !== e
        : null === e;
    },
    ot = function (e, t) {
      var i = e.__data__;
      return oe(t) ? i["string" == typeof t ? "string" : "hash"] : i.map;
    };
  function oi(e) {
    var t = -1,
      i = null == e ? 0 : e.length;
    for (this.clear(); ++t < i; ) {
      var s = e[t];
      this.set(s[0], s[1]);
    }
  }
  function os(e) {
    var t = (this.__data__ = new aD(e));
    this.size = t.size;
  }
  ((oi.prototype.clear = function () {
    ((this.size = 0),
      (this.__data__ = {
        hash: new a7(),
        map: new (a8 || aD)(),
        string: new a7(),
      }));
  }),
    (oi.prototype.delete = function (e) {
      var t = ot(this, e).delete(e);
      return ((this.size -= !!t), t);
    }),
    (oi.prototype.get = function (e) {
      return ot(this, e).get(e);
    }),
    (oi.prototype.has = function (e) {
      return ot(this, e).has(e);
    }),
    (oi.prototype.set = function (e, t) {
      var i = ot(this, e),
        s = i.size;
      return (i.set(e, t), (this.size += +(i.size != s)), this);
    }),
    (os.prototype.clear = function () {
      ((this.__data__ = new aD()), (this.size = 0));
    }),
    (os.prototype.delete = function (e) {
      var t = this.__data__,
        i = t.delete(e);
      return ((this.size = t.size), i);
    }),
    (os.prototype.get = function (e) {
      return this.__data__.get(e);
    }),
    (os.prototype.has = function (e) {
      return this.__data__.has(e);
    }),
    (os.prototype.set = function (e, t) {
      var i = this.__data__;
      if (i instanceof aD) {
        var s = i.__data__;
        if (!a8 || s.length < 199)
          return (s.push([e, t]), (this.size = ++i.size), this);
        i = this.__data__ = new oi(s);
      }
      return (i.set(e, t), (this.size = i.size), this);
    }));
  var or = (function () {
      try {
        var e = a4(Object, "defineProperty");
        return (e({}, "", {}), e);
      } catch {}
    })(),
    on = function (e, t, i) {
      "__proto__" == t && or
        ? or(e, t, { configurable: !0, enumerable: !0, value: i, writable: !0 })
        : (e[t] = i);
    },
    oa = function (e, t, i) {
      ((void 0 === i || aT(e[t], i)) && (void 0 !== i || t in e)) ||
        on(e, t, i);
    },
    oo = { exports: {} };
  ((u = (d =
    (p =
      (h = (l = oo.exports) && !l.nodeType && l) && oo && !oo.nodeType && oo) &&
    p.exports === h
      ? aj.Buffer
      : void 0)
    ? d.allocUnsafe
    : void 0),
    (oo.exports = function (e, t) {
      if (t) return e.slice();
      var i = e.length,
        s = u ? u(i) : new e.constructor(i);
      return (e.copy(s), s);
    }));
  var oc = aj.Uint8Array,
    ol = function (e) {
      var t = new e.constructor(e.byteLength);
      return (new oc(t).set(new oc(e)), t);
    },
    oh = Object.create,
    op = (function () {
      function e() {}
      return function (t) {
        if (!aF(t)) return {};
        if (oh) return oh(t);
        e.prototype = t;
        var i = new e();
        return ((e.prototype = void 0), i);
      };
    })(),
    od =
      ((g = Object.getPrototypeOf),
      (f = Object),
      function (e) {
        return g(f(e));
      }),
    ou = Object.prototype,
    og = function (e) {
      var t = e && e.constructor;
      return e === (("function" == typeof t && t.prototype) || ou);
    },
    of = function (e) {
      return null != e && "object" == typeof e;
    },
    oy = function (e) {
      return of(e) && "[object Arguments]" == aB(e);
    },
    om = Object.prototype,
    ow = om.hasOwnProperty,
    ov = om.propertyIsEnumerable,
    ob = oy(
      (function () {
        return arguments;
      })(),
    )
      ? oy
      : function (e) {
          return of(e) && ow.call(e, "callee") && !ov.call(e, "callee");
        },
    oI = Array.isArray,
    oE = function (e) {
      return (
        "number" == typeof e && e > -1 && e % 1 == 0 && e <= 0x1fffffffffffff
      );
    },
    oN = function (e) {
      return null != e && oE(e.length) && !aW(e);
    },
    o_ = { exports: {} };
  ((v =
    (w =
      (m = (y = o_.exports) && !y.nodeType && y) && o_ && !o_.nodeType && o_) &&
    w.exports === m
      ? aj.Buffer
      : void 0),
    (o_.exports =
      (v ? v.isBuffer : void 0) ||
      function () {
        return !1;
      }));
  var oC = Object.prototype,
    oP = Function.prototype.toString,
    oA = oC.hasOwnProperty,
    oO = oP.call(Object),
    oS = {};
  ((oS["[object Float32Array]"] =
    oS["[object Float64Array]"] =
    oS["[object Int8Array]"] =
    oS["[object Int16Array]"] =
    oS["[object Int32Array]"] =
    oS["[object Uint8Array]"] =
    oS["[object Uint8ClampedArray]"] =
    oS["[object Uint16Array]"] =
    oS["[object Uint32Array]"] =
      !0),
    (oS["[object Arguments]"] =
      oS["[object Array]"] =
      oS["[object ArrayBuffer]"] =
      oS["[object Boolean]"] =
      oS["[object DataView]"] =
      oS["[object Date]"] =
      oS["[object Error]"] =
      oS["[object Function]"] =
      oS["[object Map]"] =
      oS["[object Number]"] =
      oS["[object Object]"] =
      oS["[object RegExp]"] =
      oS["[object Set]"] =
      oS["[object String]"] =
      oS["[object WeakMap]"] =
        !1));
  var oT = { exports: {} };
  ((N =
    (E =
      (I = (b = oT.exports) && !b.nodeType && b) && oT && !oT.nodeType && oT) &&
    E.exports === I &&
    aR.process),
    (oT.exports = (function () {
      try {
        return (
          (E && E.require && E.require("util").types) ||
          (N && N.binding && N.binding("util"))
        );
      } catch {}
    })()));
  var ox = oT.exports,
    ok = ox && ox.isTypedArray,
    oD = ok
      ? function (e) {
          return ok(e);
        }
      : function (e) {
          return of(e) && oE(e.length) && !!oS[aB(e)];
        },
    oR = function (e, t) {
      if (
        ("constructor" !== t || "function" != typeof e[t]) &&
        "__proto__" != t
      )
        return e[t];
    },
    oM = Object.prototype.hasOwnProperty,
    oj = function (e, t, i) {
      var s = e[t];
      (oM.call(e, t) && aT(s, i) && (void 0 !== i || t in e)) || on(e, t, i);
    },
    oU = /^(?:0|[1-9]\d*)$/,
    oq = function (e, t) {
      var i = typeof e;
      return (
        !!(t = t ?? 0x1fffffffffffff) &&
        ("number" == i || ("symbol" != i && oU.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
      );
    },
    oL = function (e, t) {
      for (var i = -1, s = Array(e); ++i < e; ) s[i] = t(i);
      return s;
    },
    o$ = o_.exports,
    oz = Object.prototype.hasOwnProperty,
    oK = function (e) {
      var t = [];
      if (null != e) for (var i in Object(e)) t.push(i);
      return t;
    },
    oV = Object.prototype.hasOwnProperty,
    oH = function (e, t) {
      var i = oI(e),
        s = !i && ob(e),
        r = !i && !s && o$(e),
        n = !i && !s && !r && oD(e),
        a = i || s || r || n,
        o = a ? oL(e.length, String) : [],
        c = o.length;
      for (var l in e)
        (t || oz.call(e, l)) &&
          !(
            a &&
            ("length" == l ||
              (r && ("offset" == l || "parent" == l)) ||
              (n &&
                ("buffer" == l || "byteLength" == l || "byteOffset" == l)) ||
              oq(l, c))
          ) &&
          o.push(l);
      return o;
    },
    oB = function (e) {
      if (!aF(e)) return oK(e);
      var t = og(e),
        i = [];
      for (var s in e)
        ("constructor" == s && (t || !oV.call(e, s))) || i.push(s);
      return i;
    },
    oF = function (e) {
      return oN(e) ? oH(e, !0) : oB(e);
    },
    oW = function (e, t, i, s) {
      var r = !i;
      i || (i = {});
      for (var n = -1, a = t.length; ++n < a; ) {
        var o = t[n],
          c = s ? s(i[o], e[o], o, i, e) : void 0;
        (void 0 === c && (c = e[o]), r ? on(i, o, c) : oj(i, o, c));
      }
      return i;
    },
    oY = oo.exports,
    oG = function (e, t) {
      var i = t ? ol(e.buffer) : e.buffer;
      return new e.constructor(i, e.byteOffset, e.length);
    },
    oQ = function (e, t) {
      var i = -1,
        s = e.length;
      for (t || (t = Array(s)); ++i < s; ) t[i] = e[i];
      return t;
    },
    oJ = o_.exports,
    oZ = function (e) {
      if (!of(e) || "[object Object]" != aB(e)) return !1;
      var t = od(e);
      if (null === t) return !0;
      var i = oA.call(t, "constructor") && t.constructor;
      return "function" == typeof i && i instanceof i && oP.call(i) == oO;
    },
    oX = function (e, t, i) {
      for (var s = -1, r = Object(e), n = i(e), a = n.length; a--; ) {
        var o = n[++s];
        if (!1 === t(r[o], o, r)) break;
      }
      return e;
    },
    o0 = function (e, t, i, s, r, n, a) {
      var o = oR(e, i),
        c = oR(t, i),
        l = a.get(c);
      if (l) return void oa(e, i, l);
      var h = n ? n(o, c, i + "", e, t, a) : void 0,
        p = void 0 === h;
      if (p) {
        var d = oI(c),
          u = !d && oJ(c),
          g = !d && !u && oD(c);
        ((h = c),
          d || u || g
            ? oI(o)
              ? (h = o)
              : of(o) && oN(o)
                ? (h = oQ(o))
                : u
                  ? ((p = !1), (h = oY(c, !0)))
                  : g
                    ? ((p = !1), (h = oG(c, !0)))
                    : (h = [])
            : oZ(c) || ob(c)
              ? ((h = o),
                ob(o)
                  ? (h = oW(o, oF(o)))
                  : (!aF(o) || aW(o)) &&
                    (h =
                      "function" != typeof c.constructor || og(c)
                        ? {}
                        : op(od(c))))
              : (p = !1));
      }
      (p && (a.set(c, h), r(h, c, s, n, a), a.delete(c)), oa(e, i, h));
    },
    o1 = function (e) {
      return e;
    },
    o2 = function (e, t, i) {
      switch (i.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, i[0]);
        case 2:
          return e.call(t, i[0], i[1]);
        case 3:
          return e.call(t, i[0], i[1], i[2]);
      }
      return e.apply(t, i);
    },
    o5 = Math.max,
    o4 = or
      ? function (e, t) {
          return or(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: function () {
              return t;
            },
            writable: !0,
          });
        }
      : o1,
    o8 = Date.now,
    o3 =
      ((_ = 0),
      (C = 0),
      function () {
        var e = o8(),
          t = 16 - (e - C);
        if (((C = e), t > 0)) {
          if (++_ >= 800) return arguments[0];
        } else _ = 0;
        return o4.apply(void 0, arguments);
      }),
    o6 = function (e, t, i) {
      if (!aF(i)) return !1;
      var s = typeof t;
      return (
        ("number" == s
          ? !!(oN(i) && oq(t, i.length))
          : "string" == s && t in i) && aT(i[t], e)
      );
    },
    o9 = function e(t, i, s, r, n) {
      t !== i &&
        oX(
          i,
          function (a, o) {
            if ((n || (n = new os()), aF(a))) o0(t, i, o, s, e, r, n);
            else {
              var c = r ? r(oR(t, o), a, o + "", t, i, n) : void 0;
              (void 0 === c && (c = a), oa(t, o, c));
            }
          },
          oF,
        );
    },
    o7 =
      ((P = function (e, t, i) {
        o9(e, t, i);
      }),
      o3(
        ((s = function (e, t) {
          var i = -1,
            s = t.length,
            r = s > 1 ? t[s - 1] : void 0,
            n = s > 2 ? t[2] : void 0;
          for (
            r = P.length > 3 && "function" == typeof r ? (s--, r) : void 0,
              n && o6(t[0], t[1], n) && ((r = s < 3 ? void 0 : r), (s = 1)),
              e = Object(e);
            ++i < s;

          ) {
            var a = t[i];
            a && P(e, a, i);
          }
          return e;
        }),
        (r = o5(((r = void 0), s.length - 1), 0)),
        function () {
          for (
            var e = arguments, t = -1, i = o5(e.length - r, 0), n = Array(i);
            ++t < i;

          )
            n[t] = e[r + t];
          t = -1;
          for (var a = Array(r + 1); ++t < r; ) a[t] = e[t];
          return ((a[r] = o1(n)), o2(s, this, a));
        }),
        s + "",
      )),
    ce = Object.defineProperty,
    ct = Object.defineProperties,
    ci = Object.getOwnPropertyDescriptors,
    cs = Object.getOwnPropertySymbols,
    cr = Object.prototype.hasOwnProperty,
    cn = Object.prototype.propertyIsEnumerable,
    ca = (e, t, i) =>
      t in e
        ? ce(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    co = (e, t) => {
      for (var i in t || (t = {})) cr.call(t, i) && ca(e, i, t[i]);
      if (cs) for (var i of cs(t)) cn.call(t, i) && ca(e, i, t[i]);
      return e;
    },
    cc = (e, t) => ct(e, ci(t));
  function cl(e, t, i) {
    var s;
    let r = eN(e);
    return (
      (null == (s = t.rpcMap) ? void 0 : s[r.reference]) ||
      `${aC}?chainId=${r.namespace}:${r.reference}&projectId=${i}`
    );
  }
  function ch(e) {
    return e.includes(":") ? e.split(":")[1] : e;
  }
  function cp(e) {
    return e.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
  }
  function cd(e = {}, t = {}) {
    return o7(cu(e), cu(t));
  }
  function cu(e) {
    var t, i, s, r;
    let n = {};
    if (!sr(e)) return n;
    for (let [a, o] of Object.entries(e)) {
      let e = i3(a) ? [a] : o.chains,
        c = o.methods || [],
        l = o.events || [],
        h = o.rpcMap || {},
        p = i6(a);
      n[p] = cc(co(co({}, n[p]), o), {
        chains: eB(e, null == (t = n[p]) ? void 0 : t.chains),
        methods: eB(c, null == (i = n[p]) ? void 0 : i.methods),
        events: eB(l, null == (s = n[p]) ? void 0 : s.events),
        rpcMap: co(co({}, h), null == (r = n[p]) ? void 0 : r.rpcMap),
      });
    }
    return n;
  }
  function cg(e) {
    return e.includes(":") ? e.split(":")[2] : e;
  }
  function cf(e) {
    let t = {};
    for (let [i, s] of Object.entries(e)) {
      let e = s.methods || [],
        r = s.events || [],
        n = s.accounts || [],
        a = i3(i) ? [i] : s.chains ? s.chains : cp(s.accounts);
      t[i] = { chains: a, methods: e, events: r, accounts: n };
    }
    return t;
  }
  function cy(e) {
    return "number" == typeof e
      ? e
      : e.includes("0x")
        ? parseInt(e, 16)
        : isNaN(Number((e = e.includes(":") ? e.split(":")[1] : e)))
          ? e
          : Number(e);
  }
  let cm = {},
    cw = (e) => cm[e],
    cv = (e, t) => {
      cm[e] = t;
    };
  var cb = Object.defineProperty,
    cI = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cb(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cE {
    constructor(e) {
      (cI(this, "name", "polkadot"),
        cI(this, "client"),
        cI(this, "httpProviders"),
        cI(this, "events"),
        cI(this, "namespace"),
        cI(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return (
        (e &&
          e
            .filter((e) => e.split(":")[1] === this.chainId.toString())
            .map((e) => e.split(":")[2])) ||
        []
      );
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = ch(t);
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cN = Object.defineProperty,
    c_ = Object.defineProperties,
    cC = Object.getOwnPropertyDescriptors,
    cP = Object.getOwnPropertySymbols,
    cA = Object.prototype.hasOwnProperty,
    cO = Object.prototype.propertyIsEnumerable,
    cS = (e, t, i) =>
      t in e
        ? cN(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    cT = (e, t) => {
      for (var i in t || (t = {})) cA.call(t, i) && cS(e, i, t[i]);
      if (cP) for (var i of cP(t)) cO.call(t, i) && cS(e, i, t[i]);
      return e;
    },
    cx = (e, t, i) => cS(e, "symbol" != typeof t ? t + "" : t, i);
  class ck {
    constructor(e) {
      (cx(this, "name", "eip155"),
        cx(this, "client"),
        cx(this, "chainId"),
        cx(this, "namespace"),
        cx(this, "httpProviders"),
        cx(this, "events"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.httpProviders = this.createHttpProviders()),
        (this.chainId = parseInt(this.getDefaultChain())));
    }
    async request(e) {
      switch (e.request.method) {
        case "eth_requestAccounts":
        case "eth_accounts":
          return this.getAccounts();
        case "wallet_switchEthereumChain":
          return await this.handleSwitchChain(e);
        case "eth_chainId":
          return parseInt(this.getDefaultChain());
        case "wallet_getCapabilities":
          return await this.getCapabilities(e);
        case "wallet_getCallsStatus":
          return await this.getCallStatus(e);
      }
      return this.namespace.methods.includes(e.request.method)
        ? await this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(parseInt(e), t),
        (this.chainId = parseInt(e)),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId.toString();
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    createHttpProvider(e, t) {
      let i =
        t ||
        cl(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.t(i, cw("disableProviderPing")));
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = parseInt(ch(t));
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    getHttpProvider() {
      let e = this.chainId,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    async handleSwitchChain(e) {
      var t, i;
      let s = e.request.params
          ? null == (t = e.request.params[0])
            ? void 0
            : t.chainId
          : "0x0",
        r = parseInt((s = s.startsWith("0x") ? s : `0x${s}`), 16);
      if (this.isChainApproved(r)) this.setDefaultChain(`${r}`);
      else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
        (await this.client.request({
          topic: e.topic,
          request: { method: e.request.method, params: [{ chainId: s }] },
          chainId: null == (i = this.namespace.chains) ? void 0 : i[0],
        }),
          this.setDefaultChain(`${r}`));
      else
        throw Error(
          `Failed to switch to chain 'eip155:${r}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`,
        );
      return null;
    }
    isChainApproved(e) {
      return this.namespace.chains.includes(`${this.name}:${e}`);
    }
    async getCapabilities(e) {
      var t, i, s;
      let r =
        null == (i = null == (t = e.request) ? void 0 : t.params)
          ? void 0
          : i[0];
      if (!r)
        throw Error(
          "Missing address parameter in `wallet_getCapabilities` request",
        );
      let n = this.client.session.get(e.topic),
        a =
          (null == (s = n?.sessionProperties) ? void 0 : s.capabilities) || {};
      if (null != a && a[r]) return a?.[r];
      let o = await this.client.request(e);
      try {
        let t, i, s, c;
        await this.client.session.update(e.topic, {
          sessionProperties:
            ((s = cT({}, n.sessionProperties || {})),
            (c = {
              capabilities:
                ((t = cT({}, a || {})), (i = { [r]: o }), c_(t, cC(i))),
            }),
            c_(s, cC(c))),
        });
      } catch (e) {
        console.warn("Failed to update session with capabilities", e);
      }
      return o;
    }
    async getCallStatus(e) {
      var t, i;
      let s = this.client.session.get(e.topic),
        r = null == (t = s.sessionProperties) ? void 0 : t.bundler_name;
      if (r) {
        let t = this.getBundlerUrl(e.chainId, r);
        try {
          return await this.getUserOperationReceipt(t, e);
        } catch (e) {
          console.warn("Failed to fetch call status from bundler", e, t);
        }
      }
      let n = null == (i = s.sessionProperties) ? void 0 : i.bundler_url;
      if (n)
        try {
          return await this.getUserOperationReceipt(n, e);
        } catch (e) {
          console.warn("Failed to fetch call status from custom bundler", e, n);
        }
      if (this.namespace.methods.includes(e.request.method))
        return await this.client.request(e);
      throw Error("Fetching call status not approved by the wallet.");
    }
    async getUserOperationReceipt(e, t) {
      var i;
      let s = new URL(e),
        r = await fetch(s, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            (0, sE.i)("eth_getUserOperationReceipt", [
              null == (i = t.request.params) ? void 0 : i[0],
            ]),
          ),
        });
      if (!r.ok)
        throw Error(`Failed to fetch user operation receipt - ${r.status}`);
      return await r.json();
    }
    getBundlerUrl(e, t) {
      return `${aA}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
    }
  }
  var cD = Object.defineProperty,
    cR = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cD(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cM {
    constructor(e) {
      (cR(this, "name", "solana"),
        cR(this, "client"),
        cR(this, "httpProviders"),
        cR(this, "events"),
        cR(this, "namespace"),
        cR(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = ch(t);
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cj = Object.defineProperty,
    cU = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cj(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cq {
    constructor(e) {
      (cU(this, "name", "cosmos"),
        cU(this, "client"),
        cU(this, "httpProviders"),
        cU(this, "events"),
        cU(this, "namespace"),
        cU(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${this.chainId}`));
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = ch(t);
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cL = Object.defineProperty,
    c$ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cL(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cz {
    constructor(e) {
      (c$(this, "name", "algorand"),
        c$(this, "client"),
        c$(this, "httpProviders"),
        c$(this, "events"),
        c$(this, "namespace"),
        c$(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      if (!this.httpProviders[e]) {
        let i =
          t ||
          cl(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
        this.setHttpProvider(e, i);
      }
      ((this.chainId = e),
        this.events.emit(aO, `${this.name}:${this.chainId}`));
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          e[t] = this.createHttpProvider(
            t,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return typeof i > "u"
        ? void 0
        : new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cK = Object.defineProperty,
    cV = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cK(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cH {
    constructor(e) {
      (cV(this, "name", "cip34"),
        cV(this, "client"),
        cV(this, "httpProviders"),
        cV(this, "events"),
        cV(this, "namespace"),
        cV(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${this.chainId}`));
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          let i = this.getCardanoRPCUrl(t),
            s = ch(t);
          e[s] = this.createHttpProvider(s, i);
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    getCardanoRPCUrl(e) {
      let t = this.namespace.rpcMap;
      if (t) return t[e];
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || this.getCardanoRPCUrl(e);
      if (!i) throw Error(`No RPC url provided for chainId: ${e}`);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cB = Object.defineProperty,
    cF = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cB(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cW {
    constructor(e) {
      (cF(this, "name", "elrond"),
        cF(this, "client"),
        cF(this, "httpProviders"),
        cF(this, "events"),
        cF(this, "namespace"),
        cF(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = ch(t);
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cY = Object.defineProperty,
    cG = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cY(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cQ {
    constructor(e) {
      (cG(this, "name", "multiversx"),
        cG(this, "client"),
        cG(this, "httpProviders"),
        cG(this, "events"),
        cG(this, "namespace"),
        cG(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          let s = ch(t);
          e[s] = this.createHttpProvider(
            s,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var cJ = Object.defineProperty,
    cZ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? cJ(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class cX {
    constructor(e) {
      (cZ(this, "name", "near"),
        cZ(this, "client"),
        cZ(this, "httpProviders"),
        cZ(this, "events"),
        cZ(this, "namespace"),
        cZ(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      if (((this.chainId = e), !this.httpProviders[e])) {
        let i = t || cl(`${this.name}:${e}`, this.namespace);
        this.setHttpProvider(e, i);
      }
      this.events.emit(aO, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return (
        (e &&
          e
            .filter((e) => e.split(":")[1] === this.chainId.toString())
            .map((e) => e.split(":")[2])) ||
        []
      );
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          var i;
          e[t] = this.createHttpProvider(
            t,
            null == (i = this.namespace.rpcMap) ? void 0 : i[t],
          );
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace);
      return typeof i > "u"
        ? void 0
        : new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var c0 = Object.defineProperty,
    c1 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? c0(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class c2 {
    constructor(e) {
      (c1(this, "name", "tezos"),
        c1(this, "client"),
        c1(this, "httpProviders"),
        c1(this, "events"),
        c1(this, "namespace"),
        c1(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
      return this.getAccounts();
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
      if (((this.chainId = e), !this.httpProviders[e])) {
        let i = t || cl(`${this.name}:${e}`, this.namespace);
        this.setHttpProvider(e, i);
      }
      this.events.emit(aO, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return (
        (e &&
          e
            .filter((e) => e.split(":")[1] === this.chainId.toString())
            .map((e) => e.split(":")[2])) ||
        []
      );
    }
    createHttpProviders() {
      let e = {};
      return (
        this.namespace.chains.forEach((t) => {
          e[t] = this.createHttpProvider(t);
        }),
        e
      );
    }
    getHttpProvider() {
      let e = `${this.name}:${this.chainId}`,
        t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace);
      return typeof i > "u" ? void 0 : new sI.f(new aE.U(i));
    }
  }
  var c5 = Object.defineProperty,
    c4 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? c5(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class c8 {
    constructor(e) {
      (c4(this, "name", aP),
        c4(this, "client"),
        c4(this, "httpProviders"),
        c4(this, "events"),
        c4(this, "namespace"),
        c4(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = cw("events")),
        (this.client = cw("client")),
        (this.chainId = this.getDefaultChain()),
        (this.httpProviders = this.createHttpProviders()));
    }
    updateNamespace(e) {
      ((this.namespace.chains = [
        ...new Set((this.namespace.chains || []).concat(e.chains || [])),
      ]),
        (this.namespace.accounts = [
          ...new Set((this.namespace.accounts || []).concat(e.accounts || [])),
        ]),
        (this.namespace.methods = [
          ...new Set((this.namespace.methods || []).concat(e.methods || [])),
        ]),
        (this.namespace.events = [
          ...new Set((this.namespace.events || []).concat(e.events || [])),
        ]),
        (this.httpProviders = this.createHttpProviders()));
    }
    requestAccounts() {
      return this.getAccounts();
    }
    request(e) {
      return this.namespace.methods.includes(e.request.method)
        ? this.client.request(e)
        : this.getHttpProvider(e.chainId).request(e.request);
    }
    setDefaultChain(e, t) {
      (this.httpProviders[e] || this.setHttpProvider(e, t),
        (this.chainId = e),
        this.events.emit(aO, `${this.name}:${e}`));
    }
    getDefaultChain() {
      if (this.chainId) return this.chainId;
      if (this.namespace.defaultChain) return this.namespace.defaultChain;
      let e = this.namespace.chains[0];
      if (!e) throw Error("ChainId not found");
      return e.split(":")[1];
    }
    getAccounts() {
      let e = this.namespace.accounts;
      return e
        ? [
            ...new Set(
              e
                .filter((e) => e.split(":")[1] === this.chainId.toString())
                .map((e) => e.split(":")[2]),
            ),
          ]
        : [];
    }
    createHttpProviders() {
      var e, t;
      let i = {};
      return (
        null == (t = null == (e = this.namespace) ? void 0 : e.accounts) ||
          t.forEach((e) => {
            let t = eN(e);
            i[`${t.namespace}:${t.reference}`] = this.createHttpProvider(e);
          }),
        i
      );
    }
    getHttpProvider(e) {
      let t = this.httpProviders[e];
      if (typeof t > "u") throw Error(`JSON-RPC provider for ${e} not found`);
      return t;
    }
    setHttpProvider(e, t) {
      let i = this.createHttpProvider(e, t);
      i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
      let i = t || cl(e, this.namespace, this.client.core.projectId);
      return new sI.f(new aE.U(i, cw("disableProviderPing")));
    }
  }
  var c3 = Object.defineProperty,
    c6 = Object.defineProperties,
    c9 = Object.getOwnPropertyDescriptors,
    c7 = Object.getOwnPropertySymbols,
    le = Object.prototype.hasOwnProperty,
    lt = Object.prototype.propertyIsEnumerable,
    li = (e, t, i) =>
      t in e
        ? c3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    ls = (e, t) => {
      for (var i in t || (t = {})) le.call(t, i) && li(e, i, t[i]);
      if (c7) for (var i of c7(t)) lt.call(t, i) && li(e, i, t[i]);
      return e;
    },
    lr = (e, t, i) => li(e, "symbol" != typeof t ? t + "" : t, i);
  let ln = class e {
    constructor(e) {
      (lr(this, "client"),
        lr(this, "namespaces"),
        lr(this, "optionalNamespaces"),
        lr(this, "sessionProperties"),
        lr(this, "events", new z.default()),
        lr(this, "rpcProviders", {}),
        lr(this, "session"),
        lr(this, "providerOpts"),
        lr(this, "logger"),
        lr(this, "uri"),
        lr(this, "disableProviderPing", !1),
        (this.providerOpts = e),
        (this.logger =
          "u" > typeof e?.logger && "string" != typeof e?.logger
            ? e.logger
            : (0, B.pino)((0, H.l)({ level: e?.logger || aN }))),
        (this.disableProviderPing = e?.disableProviderPing || !1));
    }
    static async init(t) {
      let i = new e(t);
      return (await i.initialize(), i);
    }
    async request(e, t, i) {
      let [s, r] = this.validateChain(t);
      if (!this.session) throw Error("Please call connect() before request()");
      return await this.getProvider(s).request({
        request: ls({}, e),
        chainId: `${s}:${r}`,
        topic: this.session.topic,
        expiry: i,
      });
    }
    sendAsync(e, t, i, s) {
      let r = new Date().getTime();
      this.request(e, i, s)
        .then((e) => t(null, (0, sE.P)(r, e)))
        .catch((e) => t(e, void 0));
    }
    async enable() {
      if (!this.client) throw Error("Sign Client not initialized");
      return (
        this.session ||
          (await this.connect({
            namespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
          })),
        await this.requestAccounts()
      );
    }
    async disconnect() {
      var e;
      if (!this.session) throw Error("Please call connect() before enable()");
      (await this.client.disconnect({
        topic: null == (e = this.session) ? void 0 : e.topic,
        reason: si("USER_DISCONNECTED"),
      }),
        await this.cleanup());
    }
    async connect(e) {
      if (!this.client) throw Error("Sign Client not initialized");
      if (
        (this.setNamespaces(e),
        await this.cleanupPendingPairings(),
        !e.skipPairing)
      )
        return await this.pair(e.pairingTopic);
    }
    async authenticate(e, t) {
      if (!this.client) throw Error("Sign Client not initialized");
      (this.setNamespaces(e), await this.cleanupPendingPairings());
      let { uri: i, response: s } = await this.client.authenticate(e, t);
      i && ((this.uri = i), this.events.emit("display_uri", i));
      let r = await s();
      if (((this.session = r.session), this.session)) {
        let e = cf(this.session.namespaces);
        ((this.namespaces = cd(this.namespaces, e)),
          this.persist("namespaces", this.namespaces),
          this.onConnect());
      }
      return r;
    }
    on(e, t) {
      this.events.on(e, t);
    }
    once(e, t) {
      this.events.once(e, t);
    }
    removeListener(e, t) {
      this.events.removeListener(e, t);
    }
    off(e, t) {
      this.events.off(e, t);
    }
    get isWalletConnect() {
      return !0;
    }
    async pair(e) {
      let { uri: t, approval: i } = await this.client.connect({
        pairingTopic: e,
        requiredNamespaces: this.namespaces,
        optionalNamespaces: this.optionalNamespaces,
        sessionProperties: this.sessionProperties,
      });
      t && ((this.uri = t), this.events.emit("display_uri", t));
      let s = await i();
      this.session = s;
      let r = cf(s.namespaces);
      return (
        (this.namespaces = cd(this.namespaces, r)),
        this.persist("namespaces", this.namespaces),
        this.onConnect(),
        this.session
      );
    }
    setDefaultChain(e, t) {
      try {
        if (!this.session) return;
        let [i, s] = this.validateChain(e),
          r = this.getProvider(i);
        r.name === aP
          ? r.setDefaultChain(`${i}:${s}`, t)
          : r.setDefaultChain(s, t);
      } catch (e) {
        if (!/Please call connect/.test(e.message)) throw e;
      }
    }
    async cleanupPendingPairings(e = {}) {
      this.logger.info("Cleaning up inactive pairings...");
      let t = this.client.pairing.getAll();
      if (ss(t)) {
        for (let i of t)
          e.deletePairings
            ? this.client.core.expirer.set(i.topic, 0)
            : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
        this.logger.info(`Inactive pairings cleared: ${t.length}`);
      }
    }
    abortPairingAttempt() {
      this.logger.warn(
        "abortPairingAttempt is deprecated. This is now a no-op.",
      );
    }
    async checkStorage() {
      if (
        ((this.namespaces = await this.getFromStore("namespaces")),
        (this.optionalNamespaces =
          (await this.getFromStore("optionalNamespaces")) || {}),
        this.client.session.length)
      ) {
        let e = this.client.session.keys.length - 1;
        ((this.session = this.client.session.get(this.client.session.keys[e])),
          this.createProviders());
      }
    }
    async initialize() {
      (this.logger.trace("Initialized"),
        await this.createClient(),
        await this.checkStorage(),
        this.registerEventListeners());
    }
    async createClient() {
      ((this.client =
        this.providerOpts.client ||
        (await aI.init({
          core: this.providerOpts.core,
          logger: this.providerOpts.logger || aN,
          relayUrl:
            this.providerOpts.relayUrl || "wss://relay.walletconnect.org",
          projectId: this.providerOpts.projectId,
          metadata: this.providerOpts.metadata,
          storageOptions: this.providerOpts.storageOptions,
          storage: this.providerOpts.storage,
          name: this.providerOpts.name,
          customStoragePrefix: this.providerOpts.customStoragePrefix,
          telemetryEnabled: this.providerOpts.telemetryEnabled,
        }))),
        this.logger.trace("SignClient Initialized"));
    }
    createProviders() {
      if (!this.client) throw Error("Sign Client not initialized");
      if (!this.session)
        throw Error(
          "Session not initialized. Please call connect() before enable()",
        );
      let e = [
        ...new Set(Object.keys(this.session.namespaces).map((e) => i6(e))),
      ];
      (cv("client", this.client),
        cv("events", this.events),
        cv("disableProviderPing", this.disableProviderPing),
        e.forEach((e) => {
          if (!this.session) return;
          let t = (function (e, t) {
              let i = Object.keys(t.namespaces).filter((t) => t.includes(e));
              if (!i.length) return [];
              let s = [];
              return (
                i.forEach((e) => {
                  let i = t.namespaces[e].accounts;
                  s.push(...i);
                }),
                s
              );
            })(e, this.session),
            i = cp(t),
            s = c6(
              ls({}, cd(this.namespaces, this.optionalNamespaces)[e]),
              c9({ accounts: t, chains: i }),
            );
          switch (e) {
            case "eip155":
              this.rpcProviders[e] = new ck({ namespace: s });
              break;
            case "algorand":
              this.rpcProviders[e] = new cz({ namespace: s });
              break;
            case "solana":
              this.rpcProviders[e] = new cM({ namespace: s });
              break;
            case "cosmos":
              this.rpcProviders[e] = new cq({ namespace: s });
              break;
            case "polkadot":
              this.rpcProviders[e] = new cE({ namespace: s });
              break;
            case "cip34":
              this.rpcProviders[e] = new cH({ namespace: s });
              break;
            case "elrond":
              this.rpcProviders[e] = new cW({ namespace: s });
              break;
            case "multiversx":
              this.rpcProviders[e] = new cQ({ namespace: s });
              break;
            case "near":
              this.rpcProviders[e] = new cX({ namespace: s });
              break;
            case "tezos":
              this.rpcProviders[e] = new c2({ namespace: s });
              break;
            default:
              this.rpcProviders[aP]
                ? this.rpcProviders[aP].updateNamespace(s)
                : (this.rpcProviders[aP] = new c8({ namespace: s }));
          }
        }));
    }
    registerEventListeners() {
      if (typeof this.client > "u")
        throw Error("Sign Client is not initialized");
      (this.client.on("session_ping", (e) => {
        this.events.emit("session_ping", e);
      }),
        this.client.on("session_event", (e) => {
          let { params: t } = e,
            { event: i } = t;
          if ("accountsChanged" === i.name) {
            let e = i.data;
            e && ss(e) && this.events.emit("accountsChanged", e.map(cg));
          } else if ("chainChanged" === i.name) {
            let e = t.chainId,
              i = t.event.data,
              s = i6(e),
              r = cy(e) !== cy(i) ? `${s}:${cy(i)}` : e;
            this.onChainChanged(r);
          } else this.events.emit(i.name, i.data);
          this.events.emit("session_event", e);
        }),
        this.client.on("session_update", ({ topic: e, params: t }) => {
          var i;
          let { namespaces: s } = t,
            r = null == (i = this.client) ? void 0 : i.session.get(e);
          ((this.session = c6(ls({}, r), c9({ namespaces: s }))),
            this.onSessionUpdate(),
            this.events.emit("session_update", { topic: e, params: t }));
        }),
        this.client.on("session_delete", async (e) => {
          (await this.cleanup(),
            this.events.emit("session_delete", e),
            this.events.emit(
              "disconnect",
              c6(ls({}, si("USER_DISCONNECTED")), c9({ data: e.topic })),
            ));
        }),
        this.on(aO, (e) => {
          this.onChainChanged(e, !0);
        }));
    }
    getProvider(e) {
      return this.rpcProviders[e] || this.rpcProviders[aP];
    }
    onSessionUpdate() {
      Object.keys(this.rpcProviders).forEach((e) => {
        var t;
        this.getProvider(e).updateNamespace(
          null == (t = this.session) ? void 0 : t.namespaces[e],
        );
      });
    }
    setNamespaces(e) {
      let { namespaces: t, optionalNamespaces: i, sessionProperties: s } = e;
      (t && Object.keys(t).length && (this.namespaces = t),
        i && Object.keys(i).length && (this.optionalNamespaces = i),
        (this.sessionProperties = s),
        this.persist("namespaces", t),
        this.persist("optionalNamespaces", i));
    }
    validateChain(e) {
      let [t, i] = e?.split(":") || ["", ""];
      if (!this.namespaces || !Object.keys(this.namespaces).length)
        return [t, i];
      if (
        t &&
        !Object.keys(this.namespaces || {})
          .map((e) => i6(e))
          .includes(t)
      )
        throw Error(
          `Namespace '${t}' is not configured. Please call connect() first with namespace config.`,
        );
      if (t && i) return [t, i];
      let s = i6(Object.keys(this.namespaces)[0]),
        r = this.rpcProviders[s].getDefaultChain();
      return [s, r];
    }
    async requestAccounts() {
      let [e] = this.validateChain();
      return await this.getProvider(e).requestAccounts();
    }
    onChainChanged(e, t = !1) {
      if (!this.namespaces) return;
      let [i, s] = this.validateChain(e);
      s &&
        (t || this.getProvider(i).setDefaultChain(s),
        this.namespaces[i]
          ? (this.namespaces[i].defaultChain = s)
          : this.namespaces[`${i}:${s}`]
            ? (this.namespaces[`${i}:${s}`].defaultChain = s)
            : (this.namespaces[`${i}:${s}`] = { defaultChain: s }),
        this.persist("namespaces", this.namespaces),
        this.events.emit("chainChanged", s));
    }
    onConnect() {
      (this.createProviders(),
        this.events.emit("connect", { session: this.session }));
    }
    async cleanup() {
      ((this.session = void 0),
        (this.namespaces = void 0),
        (this.optionalNamespaces = void 0),
        (this.sessionProperties = void 0),
        this.persist("namespaces", void 0),
        this.persist("optionalNamespaces", void 0),
        this.persist("sessionProperties", void 0),
        await this.cleanupPendingPairings({ deletePairings: !0 }));
    }
    persist(e, t) {
      this.client.core.storage.setItem(`${a_}/${e}`, t);
    }
    async getFromStore(e) {
      return await this.client.core.storage.getItem(`${a_}/${e}`);
    }
  };
  var la = e.i(656976),
    lo = e.i(752954),
    lc = e.i(650883),
    ll = e.i(376744),
    lh = e.i(191529),
    lp = e.i(165636),
    ld = e.i(450314),
    lu = e.i(259176);
  let lg = {
    validateCaipAddress(e) {
      if (e.split(":")?.length !== 3) throw Error("Invalid CAIP Address");
      return e;
    },
    parseCaipAddress(e) {
      let t = e.split(":");
      if (3 !== t.length) throw Error(`Invalid CAIP-10 address: ${e}`);
      let [i, s, r] = t;
      if (!i || !s || !r) throw Error(`Invalid CAIP-10 address: ${e}`);
      return { chainNamespace: i, chainId: s, address: r };
    },
    parseCaipNetworkId(e) {
      let t = e.split(":");
      if (2 !== t.length) throw Error(`Invalid CAIP-2 network id: ${e}`);
      let [i, s] = t;
      if (!i || !s) throw Error(`Invalid CAIP-2 network id: ${e}`);
      return { chainNamespace: i, chainId: s };
    },
  };
  var lf = e.i(578108),
    ly = e.i(530022),
    lm = e.i(702353),
    lw = e.i(8242),
    lv = e.i(359702),
    lb = e.i(770924);
  let lI = {
    convertEVMChainIdToCoinType(e) {
      if (e >= 0x80000000) throw Error("Invalid chainId");
      return (0x80000000 | e) >>> 0;
    },
  };
  var lE = e.i(489083),
    lN = e.i(220752);
  let l_ = (0, lv.s)({ suggestions: [], loading: !1 }),
    lC = {
      state: l_,
      subscribe: (e) => (0, lv.i)(l_, () => e(l_)),
      subscribeKey: (e, t) => (0, lb.T)(l_, e, t),
      async resolveName(e) {
        try {
          return await lm.f.lookupEnsName(e);
        } catch (e) {
          throw Error(e?.reasons?.[0]?.description || "Error resolving name");
        }
      },
      async isNameRegistered(e) {
        try {
          return (await lm.f.lookupEnsName(e), !0);
        } catch {
          return !1;
        }
      },
      async getSuggestions(e) {
        try {
          return (
            (l_.loading = !0),
            (l_.suggestions = []),
            (l_.suggestions =
              (await lm.f.getEnsNameSuggestions(e)).suggestions.map((e) => ({
                ...e,
                name: e.name,
              })) || []),
            l_.suggestions
          );
        } catch (t) {
          let e = this.parseEnsApiError(t, "Error fetching name suggestions");
          throw Error(e);
        } finally {
          l_.loading = !1;
        }
      },
      async getNamesForAddress(e) {
        try {
          if (!lw.f.state.activeCaipNetwork) return [];
          let t = lE.f.getEnsFromCacheForAddress(e);
          if (t) return t;
          let i = await lm.f.reverseLookupEnsName({ address: e });
          return (
            lE.f.updateEnsCache({ address: e, ens: i, timestamp: Date.now() }),
            i
          );
        } catch (e) {
          throw Error(
            this.parseEnsApiError(e, "Error fetching names for address"),
          );
        }
      },
      async registerName(e) {
        let t = lw.f.state.activeCaipNetwork;
        if (!t) throw Error("Network not found");
        let i = la.f.state.address,
          s = lc.f.getAuthConnector();
        if (!i || !s) throw Error("Address or auth connector not found");
        l_.loading = !0;
        try {
          let s = JSON.stringify({
            name: e,
            attributes: {},
            timestamp: Math.floor(Date.now() / 1e3),
          });
          lN.f.pushTransactionStack({
            view: "RegisterAccountNameSuccess",
            goBack: !1,
            replace: !0,
            onCancel() {
              l_.loading = !1;
            },
          });
          let r = await lo.f.signMessage(s),
            n = t.id;
          if (!n) throw Error("Network not found");
          let a = lI.convertEVMChainIdToCoinType(Number(n));
          (await lm.f.registerEnsName({
            coinType: a,
            address: i,
            signature: r,
            message: s,
          }),
            la.f.setProfileName(e, t.chainNamespace),
            lN.f.replace("RegisterAccountNameSuccess"));
        } catch (i) {
          let t = this.parseEnsApiError(i, `Error registering name ${e}`);
          throw (lN.f.replace("RegisterAccountName"), Error(t));
        } finally {
          l_.loading = !1;
        }
      },
      validateName: (e) => /^[a-zA-Z0-9-]{4,}$/u.test(e),
      parseEnsApiError: (e, t) => e?.reasons?.[0]?.description || t,
    };
  var lP = e.i(931120),
    lA = e.i(778818),
    lO = e.i(147670),
    lS = e.i(789336),
    lT = e.i(184580),
    lx = e.i(140881);
  e.i(484695);
  var lk = e.i(896343),
    lD = e.i(960872),
    lR = e.i(416532),
    lM = e.i(631777),
    lj = e.i(262356);
  function lU(e, t = {}) {
    let {
      key: i = "fallback",
      name: s = "Fallback",
      rank: r = !1,
      shouldThrow: n = lq,
      retryCount: a,
      retryDelay: o,
    } = t;
    return ({ chain: t, pollingInterval: c = 4e3, timeout: l, ...h }) => {
      let p = e,
        d = () => {},
        u = (0, lj.f)(
          {
            key: i,
            name: s,
            async request({ method: e, params: i }) {
              let s,
                r = async (a = 0) => {
                  let o = p[a]({ ...h, chain: t, retryCount: 0, timeout: l });
                  try {
                    let t = await o.request({ method: e, params: i });
                    return (
                      d({
                        method: e,
                        params: i,
                        response: t,
                        transport: o,
                        status: "success",
                      }),
                      t
                    );
                  } catch (c) {
                    if (
                      (d({
                        error: c,
                        method: e,
                        params: i,
                        transport: o,
                        status: "error",
                      }),
                      n(c) ||
                        a === p.length - 1 ||
                        !(s ??= p.slice(a + 1).some((i) => {
                          let { include: s, exclude: r } =
                            i({ chain: t }).config.methods || {};
                          return s ? s.includes(e) : !r || !r.includes(e);
                        })))
                    )
                      throw c;
                    return r(a + 1);
                  }
                };
              return r();
            },
            retryCount: a,
            retryDelay: o,
            type: "fallback",
          },
          {
            onResponse: (e) => (d = e),
            transports: p.map((e) => e({ chain: t, retryCount: 0 })),
          },
        );
      if (r) {
        let e = "object" == typeof r ? r : {};
        !(function ({
          chain: e,
          interval: t = 4e3,
          onTransports: i,
          ping: s,
          sampleCount: r = 10,
          timeout: n = 1e3,
          transports: a,
          weights: o = {},
        }) {
          let { stability: c = 0.7, latency: l = 0.3 } = o,
            h = [],
            p = async () => {
              let o = await Promise.all(
                a.map(async (t) => {
                  let i,
                    r,
                    a = t({ chain: e, retryCount: 0, timeout: n }),
                    o = Date.now();
                  try {
                    (await (s
                      ? s({ transport: a })
                      : a.request({ method: "net_listening" })),
                      (r = 1));
                  } catch {
                    r = 0;
                  } finally {
                    i = Date.now();
                  }
                  return { latency: i - o, success: r };
                }),
              );
              (h.push(o), h.length > r && h.shift());
              let d = Math.max(
                ...h.map((e) => Math.max(...e.map(({ latency: e }) => e))),
              );
              (i(
                a
                  .map((e, t) => {
                    let i = h.map((e) => e[t].latency),
                      s = i.reduce((e, t) => e + t, 0) / i.length,
                      r = h.map((e) => e[t].success),
                      n = r.reduce((e, t) => e + t, 0) / r.length;
                    return 0 === n ? [0, t] : [l * (1 - s / d) + c * n, t];
                  })
                  .sort((e, t) => t[0] - e[0])
                  .map(([, e]) => a[e]),
              ),
                await (0, lM.f)(t),
                p());
            };
          p();
        })({
          chain: t,
          interval: e.interval ?? c,
          onTransports: (e) => (p = e),
          ping: e.ping,
          sampleCount: e.sampleCount,
          timeout: e.timeout,
          transports: p,
          weights: e.weights,
        });
      }
      return u;
    };
  }
  function lq(e) {
    return !!(
      "code" in e &&
      "number" == typeof e.code &&
      (e.code === lR.g.code ||
        e.code === lR.k.code ||
        lD.s.nodeMessage.test(e.message) ||
        5e3 === e.code)
    );
  }
  var lL = e.i(641705),
    l$ = e.i(335190);
  (ld.f.CONNECTOR_ID.COINBASE,
    ld.f.CONNECTOR_ID.COINBASE_SDK,
    ld.f.CONNECTOR_ID.SAFE,
    ld.f.CONNECTOR_ID.LEDGER,
    ld.f.CONNECTOR_ID.OKX,
    l$.f.METMASK_CONNECTOR_NAME,
    l$.f.TRUST_CONNECTOR_NAME,
    l$.f.SOLFLARE_CONNECTOR_NAME,
    l$.f.PHANTOM_CONNECTOR_NAME,
    l$.f.COIN98_CONNECTOR_NAME,
    l$.f.MAGIC_EDEN_CONNECTOR_NAME,
    l$.f.BACKPACK_CONNECTOR_NAME,
    l$.f.BITGET_CONNECTOR_NAME,
    l$.f.FRONTIER_CONNECTOR_NAME,
    l$.f.XVERSE_CONNECTOR_NAME,
    l$.f.LEATHER_CONNECTOR_NAME);
  let lz = {
      1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
      42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
      43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
      56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
      250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
      10: "ab9c186a-c52f-464b-2906-ca59d760a400",
      137: "41d04d42-da3b-4453-8506-668cc0727900",
      5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
      295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
      0xaa36a7: "e909ea0a-f92a-4512-c8fc-748044ea6800",
      84532: "a18a7ecd-e307-4360-4746-283182228e00",
      1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
      130: "2257980a-3463-48c6-cbac-a42d2a956e00",
      10143: "0a728e83-bacb-46db-7844-948f05434900",
      100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
      9001: "f926ff41-260d-4028-635e-91913fc28e00",
      324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
      314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
      4689: "34e68754-e536-40da-c153-6ef2e7188a00",
      1088: "3897a66d-40b9-4833-162f-a2c90531c900",
      1284: "161038da-44ae-4ec7-1208-0ea569454b00",
      1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
      7777777: "845c60df-d429-4991-e687-91ae45791600",
      42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
      8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
      0x4e454152: "3ff73439-a619-4894-9262-4470c773a100",
      2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
      2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
      80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
      "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":
        "a1b58899-f671-4276-6a5e-56ca5bd59700",
      "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z":
        "a1b58899-f671-4276-6a5e-56ca5bd59700",
      EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
      "000000000019d6689c085ae165831e93":
        "0b4838db-0161-4ffe-022d-532bf03dba00",
      "000000000933ea01ad0ee984209779ba":
        "39354064-d79b-420b-065d-f980c4b78200",
    },
    lK = {
      [ld.f.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
      [ld.f.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
      [ld.f.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
      [ld.f.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
      [ld.f.CONNECTOR_ID.WALLET_CONNECT]:
        "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
      [ld.f.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00",
    },
    lV = {
      [ld.f.CONNECTOR_ID.INJECTED]: "Browser Wallet",
      [ld.f.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
      [ld.f.CONNECTOR_ID.COINBASE]: "Coinbase",
      [ld.f.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
      [ld.f.CONNECTOR_ID.LEDGER]: "Ledger",
      [ld.f.CONNECTOR_ID.SAFE]: "Safe",
    },
    lH =
      (ld.f.CONNECTOR_ID.INJECTED,
      ld.f.CONNECTOR_ID.WALLET_CONNECT,
      ld.f.CONNECTOR_ID.EIP6963,
      ld.f.CONNECTOR_ID.AUTH,
      [
        "near:mainnet",
        "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        "eip155:1101",
        "eip155:56",
        "eip155:42161",
        "eip155:7777777",
        "eip155:59144",
        "eip155:324",
        "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        "eip155:5000",
        "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
        "eip155:80084",
        "eip155:5003",
        "eip155:100",
        "eip155:8453",
        "eip155:42220",
        "eip155:1313161555",
        "eip155:17000",
        "eip155:1",
        "eip155:300",
        "eip155:1313161554",
        "eip155:1329",
        "eip155:84532",
        "eip155:421614",
        "eip155:11155111",
        "eip155:8217",
        "eip155:43114",
        "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
        "eip155:999999999",
        "eip155:11155420",
        "eip155:80002",
        "eip155:97",
        "eip155:43113",
        "eip155:137",
        "eip155:10",
        "eip155:1301",
        "bip122:000000000019d6689c085ae165831e93",
        "bip122:000000000933ea01ad0ee984209779ba",
      ]),
    lB = {
      extendRpcUrlWithProjectId(e, t) {
        let i = !1;
        try {
          i = "rpc.walletconnect.org" === new URL(e).host;
        } catch (e) {
          i = !1;
        }
        if (i) {
          let i = new URL(e);
          return (
            i.searchParams.has("projectId") ||
              i.searchParams.set("projectId", t),
            i.toString()
          );
        }
        return e;
      },
      isCaipNetwork: (e) => "chainNamespace" in e && "caipNetworkId" in e,
      getChainNamespace(e) {
        return this.isCaipNetwork(e) ? e.chainNamespace : ld.f.CHAIN.EVM;
      },
      getCaipNetworkId(e) {
        return this.isCaipNetwork(e)
          ? e.caipNetworkId
          : `${ld.f.CHAIN.EVM}:${e.id}`;
      },
      getDefaultRpcUrl(e, t, i) {
        let s = e.rpcUrls?.default?.http?.[0];
        if (lH.includes(t)) {
          let e;
          return (
            (e = new URL("https://rpc.walletconnect.org/v1/")).searchParams.set(
              "chainId",
              t,
            ),
            e.searchParams.set("projectId", i),
            e.toString()
          );
        }
        return s || "";
      },
      extendCaipNetwork(
        e,
        { customNetworkImageUrls: t, projectId: i, customRpcUrls: s },
      ) {
        let r = this.getChainNamespace(e),
          n = this.getCaipNetworkId(e),
          a = e.rpcUrls.default.http?.[0],
          o = this.getDefaultRpcUrl(e, n, i),
          c = e?.rpcUrls?.chainDefault?.http?.[0] || a,
          l = s?.[n]?.map((e) => e.url) || [],
          h = [...l, o],
          p = [...l];
        return (
          c && !p.includes(c) && p.push(c),
          {
            ...e,
            chainNamespace: r,
            caipNetworkId: n,
            assets: { imageId: lz[e.id], imageUrl: t?.[e.id] },
            rpcUrls: {
              ...e.rpcUrls,
              default: { http: h },
              chainDefault: { http: p },
            },
          }
        );
      },
      extendCaipNetworks: (
        e,
        { customNetworkImageUrls: t, projectId: i, customRpcUrls: s },
      ) =>
        e.map((e) =>
          lB.extendCaipNetwork(e, {
            customNetworkImageUrls: t,
            customRpcUrls: s,
            projectId: i,
          }),
        ),
      getViemTransport(e, t, i) {
        let s = [];
        if (
          (i?.forEach((e) => {
            s.push((0, lL.f)(e.url, e.config));
          }),
          lH.includes(e.caipNetworkId))
        ) {
          let i = this.getDefaultRpcUrl(e, e.caipNetworkId, t);
          s.push(
            (0, lL.f)(i, {
              fetchOptions: { headers: { "Content-Type": "text/plain" } },
            }),
          );
        }
        return lU(s);
      },
      extendWagmiTransports(e, t, i) {
        if (lH.includes(e.caipNetworkId)) {
          let s = this.getDefaultRpcUrl(e, e.caipNetworkId, t);
          return lU([i, (0, lL.f)(s)]);
        }
        return i;
      },
      getUnsupportedNetwork: (e) => ({
        id: e.split(":")[1],
        caipNetworkId: e,
        name: ld.f.UNSUPPORTED_NETWORK_NAME,
        chainNamespace: e.split(":")[0],
        nativeCurrency: { name: "", decimals: 0, symbol: "" },
        rpcUrls: { default: { http: [] } },
      }),
      getCaipNetworkFromStorage(e) {
        let t = lE.f.getActiveCaipNetworkId(),
          i = lw.f.getAllRequestedCaipNetworks(),
          s = Array.from(lw.f.state.chains?.keys() || []),
          r = t?.split(":")[0],
          n = !!r && s.includes(r),
          a = i?.find((e) => e.caipNetworkId === t);
        return n && !a && t ? this.getUnsupportedNetwork(t) : a || e || i?.[0];
      },
    },
    lF = {
      UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
        message: "Unauthorized: origin not allowed",
        alertErrorKey: "INVALID_APP_CONFIGURATION",
      },
      JWT_VALIDATION_ERROR: {
        message: "JWT validation error: JWT Token is not yet valid",
        alertErrorKey: "JWT_TOKEN_NOT_VALID",
      },
      INVALID_KEY: {
        message: "Unauthorized: invalid key",
        alertErrorKey: "INVALID_PROJECT_ID",
      },
    },
    lW = {
      SWITCH_NETWORK_NOT_FOUND: {
        shortMessage: "Network Not Found",
        longMessage:
          "Network not found - please make sure it is included in 'networks' array in createAppKit function",
      },
      INVALID_APP_CONFIGURATION: {
        shortMessage: "Invalid App Configuration",
        longMessage: () =>
          `Origin ${"u" > typeof window ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`,
      },
      SOCIALS_TIMEOUT: {
        shortMessage: "Invalid App Configuration",
        longMessage: () =>
          "There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com",
      },
      JWT_TOKEN_NOT_VALID: {
        shortMessage: "Session Expired",
        longMessage:
          "Invalid session found on UniversalProvider - please check your time settings and connect again",
      },
      INVALID_PROJECT_ID: {
        shortMessage: "Invalid App Configuration",
        longMessage: "Invalid Project ID - update configuration",
      },
      PROJECT_ID_NOT_CONFIGURED: {
        shortMessage: "Project ID Not Configured",
        longMessage:
          "Project ID Not Configured - update configuration on cloud.reown.com",
      },
    };
  var lY = e.i(875676);
  let lG = {
      createLogger(e, t = "error") {
        let i = (0, H.l)({ level: t }),
          { logger: s } = (0, H.z)({ opts: i });
        return (
          (s.error = (...t) => {
            for (let i of t) if (i instanceof Error) return void e(i, ...t);
            e(void 0, ...t);
          }),
          s
        );
      },
    },
    lQ = { eip155: void 0, solana: void 0, polkadot: void 0, bip122: void 0 },
    lJ = (0, lv.s)({ providers: { ...lQ }, providerIds: { ...lQ } }),
    lZ = {
      state: lJ,
      subscribeKey: (e, t) => (0, lb.T)(lJ, e, t),
      subscribe: (e) =>
        (0, lv.i)(lJ, () => {
          e(lJ);
        }),
      subscribeProviders: (e) => (0, lv.i)(lJ.providers, () => e(lJ.providers)),
      setProvider(e, t) {
        t && (lJ.providers[e] = (0, lv.C)(t));
      },
      getProvider: (e) => lJ.providers[e],
      setProviderId(e, t) {
        t && (lJ.providerIds[e] = t);
      },
      getProviderId(e) {
        if (e) return lJ.providerIds[e];
      },
      reset() {
        ((lJ.providers = { ...lQ }), (lJ.providerIds = { ...lQ }));
      },
      resetChain(e) {
        ((lJ.providers[e] = void 0), (lJ.providerIds[e] = void 0));
      },
    };
  var lX = e.i(344048),
    l0 = e.i(19648),
    l1 = e.i(901131),
    l2 = e.i(92363);
  function l5(e) {
    return { formatters: void 0, fees: void 0, serializers: void 0, ...e };
  }
  let l4 = l5({
      id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      name: "Solana",
      network: "solana-mainnet",
      nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
      rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } },
      blockExplorers: {
        default: { name: "Solscan", url: "https://solscan.io" },
      },
      testnet: !1,
      chainNamespace: "solana",
      caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      deprecatedCaipNetworkId: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
    }),
    l8 = l5({
      id: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
      name: "Solana Devnet",
      network: "solana-devnet",
      nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
      rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } },
      blockExplorers: {
        default: { name: "Solscan", url: "https://solscan.io" },
      },
      testnet: !0,
      chainNamespace: "solana",
      caipNetworkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
      deprecatedCaipNetworkId: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K",
    }),
    l3 = l5({
      id: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
      name: "Solana Testnet",
      network: "solana-testnet",
      nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
      rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } },
      blockExplorers: {
        default: { name: "Solscan", url: "https://solscan.io" },
      },
      testnet: !0,
      chainNamespace: "solana",
      caipNetworkId: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
    });
  (l5({
    id: "000000000019d6689c085ae165831e93",
    caipNetworkId: "bip122:000000000019d6689c085ae165831e93",
    chainNamespace: "bip122",
    name: "Bitcoin",
    nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
    rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } },
  }),
    l5({
      id: "000000000933ea01ad0ee984209779ba",
      caipNetworkId: "bip122:000000000933ea01ad0ee984209779ba",
      chainNamespace: "bip122",
      name: "Bitcoin Testnet",
      nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
      rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } },
      testnet: !0,
    }));
  let l6 = {
      solana: [
        "solana_signMessage",
        "solana_signTransaction",
        "solana_requestAccounts",
        "solana_getAccounts",
        "solana_signAllTransactions",
        "solana_signAndSendTransaction",
      ],
      eip155: [
        "eth_accounts",
        "eth_requestAccounts",
        "eth_sendRawTransaction",
        "eth_sign",
        "eth_signTransaction",
        "eth_signTypedData",
        "eth_signTypedData_v3",
        "eth_signTypedData_v4",
        "eth_sendTransaction",
        "personal_sign",
        "wallet_switchEthereumChain",
        "wallet_addEthereumChain",
        "wallet_getPermissions",
        "wallet_requestPermissions",
        "wallet_registerOnboarding",
        "wallet_watchAsset",
        "wallet_scanQRCode",
        "wallet_getCallsStatus",
        "wallet_showCallsStatus",
        "wallet_sendCalls",
        "wallet_getCapabilities",
        "wallet_grantPermissions",
        "wallet_revokePermissions",
        "wallet_getAssets",
      ],
      bip122: [
        "sendTransfer",
        "signMessage",
        "signPsbt",
        "getAccountAddresses",
      ],
    },
    l9 = {
      getMethodsByChainNamespace: (e) => l6[e] || [],
      createDefaultNamespace(e) {
        return {
          methods: this.getMethodsByChainNamespace(e),
          events: ["accountsChanged", "chainChanged"],
          chains: [],
          rpcMap: {},
        };
      },
      applyNamespaceOverrides(e, t) {
        if (!t) return { ...e };
        let i = { ...e },
          s = new Set();
        if (
          (t.methods && Object.keys(t.methods).forEach((e) => s.add(e)),
          t.chains && Object.keys(t.chains).forEach((e) => s.add(e)),
          t.events && Object.keys(t.events).forEach((e) => s.add(e)),
          t.rpcMap &&
            Object.keys(t.rpcMap).forEach((e) => {
              let [t] = e.split(":");
              t && s.add(t);
            }),
          s.forEach((e) => {
            i[e] || (i[e] = this.createDefaultNamespace(e));
          }),
          t.methods &&
            Object.entries(t.methods).forEach(([e, t]) => {
              i[e] && (i[e].methods = t);
            }),
          t.chains &&
            Object.entries(t.chains).forEach(([e, t]) => {
              i[e] && (i[e].chains = t);
            }),
          t.events &&
            Object.entries(t.events).forEach(([e, t]) => {
              i[e] && (i[e].events = t);
            }),
          t.rpcMap)
        ) {
          let e = new Set();
          Object.entries(t.rpcMap).forEach(([t, s]) => {
            let [r, n] = t.split(":");
            r &&
              n &&
              i[r] &&
              (i[r].rpcMap || (i[r].rpcMap = {}),
              e.has(r) || ((i[r].rpcMap = {}), e.add(r)),
              (i[r].rpcMap[n] = s));
          });
        }
        return i;
      },
      createNamespaces(e, t) {
        let i = e.reduce((e, t) => {
          let { id: i, chainNamespace: s, rpcUrls: r } = t,
            n = r.default.http[0];
          e[s] || (e[s] = this.createDefaultNamespace(s));
          let a = `${s}:${i}`,
            o = e[s];
          switch ((o.chains.push(a), a)) {
            case l4.caipNetworkId:
              o.chains.push(l4.deprecatedCaipNetworkId);
              break;
            case l8.caipNetworkId:
              o.chains.push(l8.deprecatedCaipNetworkId);
          }
          return (o?.rpcMap && n && (o.rpcMap[i] = n), e);
        }, {});
        return this.applyNamespaceOverrides(i, t);
      },
      resolveReownName: async (e) => {
        let t = await lC.resolveName(e),
          i = Object.values(t?.addresses) || [];
        return i[0]?.address || !1;
      },
      getChainsFromNamespaces: (e = {}) =>
        Object.values(e).flatMap((e) =>
          Array.from(
            new Set([
              ...(e.chains || []),
              ...e.accounts.map((e) => {
                let [t, i] = e.split(":");
                return `${t}:${i}`;
              }),
            ]),
          ),
        ),
      isSessionEventData: (e) =>
        "object" == typeof e &&
        null !== e &&
        "id" in e &&
        "topic" in e &&
        "params" in e &&
        "object" == typeof e.params &&
        null !== e.params &&
        "chainId" in e.params &&
        "event" in e.params &&
        "object" == typeof e.params.event &&
        null !== e.params.event,
    };
  class l7 {
    constructor({ provider: e, caipNetworks: t, namespace: i }) {
      ((this.id = ld.f.CONNECTOR_ID.WALLET_CONNECT),
        (this.name = lV[ld.f.CONNECTOR_ID.WALLET_CONNECT]),
        (this.type = "WALLET_CONNECT"),
        (this.imageId = lK[ld.f.CONNECTOR_ID.WALLET_CONNECT]),
        (this.caipNetworks = t),
        (this.provider = e),
        (this.chain = i));
    }
    get chains() {
      return this.caipNetworks;
    }
    async connectWalletConnect() {
      if (!(await this.authenticate())) {
        let e = lh.f.state.universalProviderConfigOverride,
          t = l9.createNamespaces(this.caipNetworks, e);
        await this.provider.connect({ optionalNamespaces: t });
      }
      return {
        clientId: await this.provider.client.core.crypto.getClientId(),
        session: this.provider.session,
      };
    }
    async disconnect() {
      await this.provider.disconnect();
    }
    async authenticate() {
      let e = this.chains.map((e) => e.caipNetworkId);
      return l2.f.universalProviderAuthenticate({
        universalProvider: this.provider,
        chains: e,
        methods: he,
      });
    }
  }
  let he = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    "wallet_getCallsStatus",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    "wallet_getAssets",
  ];
  class ht {
    constructor(e) {
      ((this.availableConnectors = []),
        (this.eventListeners = new Map()),
        e && this.construct(e));
    }
    construct(e) {
      ((this.caipNetworks = e.networks),
        (this.projectId = e.projectId),
        (this.namespace = e.namespace),
        (this.adapterType = e.adapterType));
    }
    get connectors() {
      return this.availableConnectors;
    }
    get networks() {
      return this.caipNetworks || [];
    }
    setAuthProvider(e) {
      this.addConnector({
        id: ld.f.CONNECTOR_ID.AUTH,
        type: "AUTH",
        name: ld.f.CONNECTOR_NAMES.AUTH,
        provider: e,
        imageId: lK[ld.f.CONNECTOR_ID.AUTH],
        chain: this.namespace,
        chains: [],
      });
    }
    addConnector(...e) {
      let t = new Set();
      ((this.availableConnectors = [...e, ...this.availableConnectors].filter(
        (e) => !t.has(e.id) && (t.add(e.id), !0),
      )),
        this.emit("connectors", this.availableConnectors));
    }
    setStatus(e, t) {
      la.f.setStatus(e, t);
    }
    on(e, t) {
      (this.eventListeners.has(e) || this.eventListeners.set(e, new Set()),
        this.eventListeners.get(e)?.add(t));
    }
    off(e, t) {
      let i = this.eventListeners.get(e);
      i && i.delete(t);
    }
    removeAllEventListeners() {
      this.eventListeners.forEach((e) => {
        e.clear();
      });
    }
    emit(e, t) {
      let i = this.eventListeners.get(e);
      i && i.forEach((e) => e(t));
    }
    async connectWalletConnect(e) {
      let t = this.getWalletConnectConnector();
      return { clientId: (await t.connectWalletConnect()).clientId };
    }
    async switchNetwork(e) {
      let { caipNetwork: t, providerType: i } = e;
      if (!e.provider) return;
      let s = "provider" in e.provider ? e.provider.provider : e.provider;
      if ("WALLET_CONNECT" === i)
        return void s.setDefaultChain(t.caipNetworkId);
      if (s && "AUTH" === i) {
        await s.switchNetwork(t.caipNetworkId);
        let e = await s.getUser({
          chainId: t.caipNetworkId,
          preferredAccountType:
            lh.f.state.defaultAccountTypes[t.chainNamespace],
        });
        this.emit("switchNetwork", e);
      }
    }
    getWalletConnectConnector() {
      let e = this.connectors.find((e) => e instanceof l7);
      if (!e) throw Error("WalletConnectConnector not found");
      return e;
    }
  }
  class hi extends ht {
    setUniversalProvider(e) {
      this.addConnector(
        new l7({
          provider: e,
          caipNetworks: this.caipNetworks || [],
          namespace: this.namespace,
        }),
      );
    }
    async connect(e) {
      return Promise.resolve({
        id: "WALLET_CONNECT",
        type: "WALLET_CONNECT",
        chainId: Number(e.chainId),
        provider: this.provider,
        address: "",
      });
    }
    async disconnect() {
      try {
        let e = this.getWalletConnectConnector();
        await e.disconnect();
      } catch (e) {
        console.warn("UniversalAdapter:disconnect - error", e);
      }
    }
    async getAccounts({ namespace: e }) {
      let t = this.provider;
      return Promise.resolve({
        accounts: (
          t?.session?.namespaces?.[e]?.accounts
            ?.map((e) => {
              let [, , t] = e.split(":");
              return t;
            })
            .filter((e, t, i) => i.indexOf(e) === t) || []
        ).map((t) =>
          ll.f.createAccount(e, t, "bip122" === e ? "payment" : "eoa"),
        ),
      });
    }
    async syncConnectors() {
      return Promise.resolve();
    }
    async getBalance(e) {
      if (
        !(
          e.caipNetwork &&
          l1.f.BALANCE_SUPPORTED_CHAINS.includes(e.caipNetwork?.chainNamespace)
        ) ||
        e.caipNetwork?.testnet
      )
        return {
          balance: "0.00",
          symbol: e.caipNetwork?.nativeCurrency.symbol || "",
        };
      if (
        la.f.state.balanceLoading &&
        e.chainId === lw.f.state.activeCaipNetwork?.id
      )
        return {
          balance: la.f.state.balance || "0.00",
          symbol: la.f.state.balanceSymbol || "",
        };
      let t = (await la.f.fetchTokenBalance()).find(
        (t) =>
          t.chainId === `${e.caipNetwork?.chainNamespace}:${e.chainId}` &&
          t.symbol === e.caipNetwork?.nativeCurrency.symbol,
      );
      return {
        balance: t?.quantity.numeric || "0.00",
        symbol: t?.symbol || e.caipNetwork?.nativeCurrency.symbol || "",
      };
    }
    async signMessage(e) {
      let { provider: t, message: i, address: s } = e;
      if (!t)
        throw Error("UniversalAdapter:signMessage - provider is undefined");
      return {
        signature:
          lw.f.state.activeCaipNetwork?.chainNamespace === ld.f.CHAIN.SOLANA
            ? (
                await t.request(
                  {
                    method: "solana_signMessage",
                    params: {
                      message: lX.f.encode(new TextEncoder().encode(i)),
                      pubkey: s,
                    },
                  },
                  lw.f.state.activeCaipNetwork?.caipNetworkId,
                )
              ).signature
            : await t.request(
                { method: "personal_sign", params: [i, s] },
                lw.f.state.activeCaipNetwork?.caipNetworkId,
              ),
      };
    }
    async estimateGas() {
      return Promise.resolve({ gas: BigInt(0) });
    }
    async getProfile() {
      return Promise.resolve({ profileImage: "", profileName: "" });
    }
    async sendTransaction() {
      return Promise.resolve({ hash: "" });
    }
    walletGetAssets(e) {
      return Promise.resolve({});
    }
    async writeContract() {
      return Promise.resolve({ hash: "" });
    }
    async getEnsAddress() {
      return Promise.resolve({ address: !1 });
    }
    parseUnits() {
      return 0n;
    }
    formatUnits() {
      return "0";
    }
    async getCapabilities() {
      return Promise.resolve({});
    }
    async grantPermissions() {
      return Promise.resolve({});
    }
    async revokePermissions() {
      return Promise.resolve("0x");
    }
    async syncConnection() {
      return Promise.resolve({
        id: "WALLET_CONNECT",
        type: "WALLET_CONNECT",
        chainId: 1,
        provider: this.provider,
        address: "",
      });
    }
    async switchNetwork(e) {
      let { caipNetwork: t } = e,
        i = this.getWalletConnectConnector();
      if (t.chainNamespace === ld.f.CHAIN.EVM)
        try {
          await i.provider?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: (0, l0.g)(t.id) }],
          });
        } catch (e) {
          if (
            4902 === e.code ||
            32603 === e.code ||
            5e3 === e.code ||
            e?.data?.originalError?.code === 4902
          )
            try {
              await i.provider?.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: (0, l0.g)(t.id),
                    rpcUrls: [t?.rpcUrls.chainDefault?.http],
                    chainName: t.name,
                    nativeCurrency: t.nativeCurrency,
                    blockExplorerUrls: [t.blockExplorers?.default.url],
                  },
                ],
              });
            } catch (e) {
              throw Error("Chain is not supported");
            }
        }
      i.provider.setDefaultChain(t.caipNetworkId);
    }
    getWalletConnectProvider() {
      let e = this.connectors.find((e) => "WALLET_CONNECT" === e.type);
      return e?.provider;
    }
  }
  class hs {
    constructor(e) {
      ((this.hasSwitchedToPreferredAccountTypeOnConnect = !1),
        (this.chainNamespaces = []),
        (this.reportedAlertErrors = {}),
        (this.getCaipNetwork = (e) => {
          if (e) {
            let t = lw.f.getNetworkData(e)?.caipNetwork;
            return (
              t ||
              lw.f
                .getRequestedCaipNetworks(e)
                .filter((t) => t.chainNamespace === e)?.[0]
            );
          }
          return lw.f.state.activeCaipNetwork || this.defaultCaipNetwork;
        }),
        (this.getCaipNetworkId = () => {
          let e = this.getCaipNetwork();
          if (e) return e.id;
        }),
        (this.getCaipNetworks = (e) => lw.f.getRequestedCaipNetworks(e)),
        (this.getActiveChainNamespace = () => lw.f.state.activeChain),
        (this.setRequestedCaipNetworks = (e, t) => {
          lw.f.setRequestedCaipNetworks(e, t);
        }),
        (this.getApprovedCaipNetworkIds = () =>
          lw.f.getAllApprovedCaipNetworkIds()),
        (this.getCaipAddress = (e) =>
          lw.f.state.activeChain !== e && e
            ? lw.f.getAccountProp("caipAddress", e)
            : lw.f.state.activeCaipAddress),
        (this.setClientId = (e) => {
          lm.f.setClientId(e);
        }),
        (this.getProvider = (e) => lZ.getProvider(e)),
        (this.getProviderType = (e) => lZ.getProviderId(e)),
        (this.getPreferredAccountType = () => la.f.state.preferredAccountType),
        (this.setCaipAddress = (e, t) => {
          la.f.setCaipAddress(e, t);
        }),
        (this.setBalance = (e, t, i) => {
          la.f.setBalance(e, t, i);
        }),
        (this.setProfileName = (e, t) => {
          la.f.setProfileName(e, t);
        }),
        (this.setProfileImage = (e, t) => {
          la.f.setProfileImage(e, t);
        }),
        (this.setUser = (e, t) => {
          (la.f.setUser(e, t), lh.f.state.enableEmbedded && lA.f.close());
        }),
        (this.resetAccount = (e) => {
          la.f.resetAccount(e);
        }),
        (this.setCaipNetwork = (e) => {
          lw.f.setActiveCaipNetwork(e);
        }),
        (this.setCaipNetworkOfNamespace = (e, t) => {
          lw.f.setChainNetworkData(t, { caipNetwork: e });
        }),
        (this.setAllAccounts = (e, t) => {
          (la.f.setAllAccounts(e, t),
            lh.f.setHasMultipleAddresses(e?.length > 1));
        }),
        (this.setStatus = (e, t) => {
          (la.f.setStatus(e, t),
            lc.f.isConnected()
              ? lE.f.setConnectionStatus("connected")
              : lE.f.setConnectionStatus("disconnected"));
        }),
        (this.getAddressByChainNamespace = (e) =>
          lw.f.getAccountProp("address", e)),
        (this.setConnectors = (e) => {
          let t = [...lc.f.getConnectors(), ...e];
          lc.f.setConnectors(t);
        }),
        (this.fetchIdentity = (e) => lm.f.fetchIdentity(e)),
        (this.getReownName = (e) => lC.getNamesForAddress(e)),
        (this.getConnectors = () => lc.f.getConnectors()),
        (this.getConnectorImage = (e) => ly.f.getConnectorImage(e)),
        (this.setConnectedWalletInfo = (e, t) => {
          let i = lZ.getProviderId(t),
            s = e ? { ...e, type: i } : void 0;
          la.f.setConnectedWalletInfo(s, t);
        }),
        (this.getIsConnectedState = () => !!lw.f.state.activeCaipAddress),
        (this.addAddressLabel = (e, t, i) => {
          la.f.addAddressLabel(e, t, i);
        }),
        (this.removeAddressLabel = (e, t) => {
          la.f.removeAddressLabel(e, t);
        }),
        (this.getAddress = (e) =>
          lw.f.state.activeChain !== e && e
            ? lw.f.getAccountProp("address", e)
            : la.f.state.address),
        (this.setApprovedCaipNetworksData = (e) =>
          lw.f.setApprovedCaipNetworksData(e)),
        (this.resetNetwork = (e) => {
          lw.f.resetNetwork(e);
        }),
        (this.addConnector = (e) => {
          lc.f.addConnector(e);
        }),
        (this.resetWcConnection = () => {
          lo.f.resetWcConnection();
        }),
        (this.setAddressExplorerUrl = (e, t) => {
          la.f.setAddressExplorerUrl(e, t);
        }),
        (this.setSmartAccountDeployed = (e, t) => {
          la.f.setSmartAccountDeployed(e, t);
        }),
        (this.setSmartAccountEnabledNetworks = (e, t) => {
          lw.f.setSmartAccountEnabledNetworks(e, t);
        }),
        (this.setPreferredAccountType = (e, t) => {
          la.f.setPreferredAccountType(e, t);
        }),
        (this.setEIP6963Enabled = (e) => {
          lh.f.setEIP6963Enabled(e);
        }),
        (this.handleUnsafeRPCRequest = () => {
          this.isOpen()
            ? this.isTransactionStackEmpty() ||
              this.redirect("ApproveTransaction")
            : this.open({ view: "ApproveTransaction" });
        }),
        (this.options = e),
        (this.version = e.sdkVersion),
        (this.caipNetworks = this.extendCaipNetworks(e)),
        (this.chainNamespaces = [
          ...new Set(this.caipNetworks?.map((e) => e.chainNamespace)),
        ]),
        (this.defaultCaipNetwork = this.extendDefaultCaipNetwork(e)),
        (this.chainAdapters = this.createAdapters(e.adapters)),
        this.initialize(e),
        this.sendInitializeEvent(e));
    }
    async initialize(e) {
      (this.initControllers(e),
        await this.initChainAdapters(),
        await this.injectModalUi(),
        await this.syncExistingConnection(),
        lO.f.set({ initialized: !0 }));
    }
    sendInitializeEvent(e) {
      let { ...t } = e;
      (delete t.adapters,
        lP.f.sendEvent({
          type: "track",
          event: "INITIALIZE",
          properties: {
            ...t,
            networks: e.networks.map((e) => e.id),
            siweConfig: { options: e.siweConfig?.options || {} },
          },
        }));
    }
    initControllers(e) {
      (this.initializeOptionsController(e),
        this.initializeChainController(e),
        this.initializeThemeController(e),
        this.initializeConnectionController(e),
        this.initializeConnectorController());
    }
    initializeThemeController(e) {
      (e.themeMode && lT.f.setThemeMode(e.themeMode),
        e.themeVariables && lT.f.setThemeVariables(e.themeVariables));
    }
    initializeChainController(e) {
      if (!this.connectionControllerClient || !this.networkControllerClient)
        throw Error(
          "ConnectionControllerClient and NetworkControllerClient must be set",
        );
      lw.f.initialize(e.adapters ?? [], this.caipNetworks, {
        connectionControllerClient: this.connectionControllerClient,
        networkControllerClient: this.networkControllerClient,
      });
      let t = this.getDefaultNetwork();
      t && lw.f.setActiveCaipNetwork(t);
    }
    initializeConnectionController(e) {
      lo.f.setWcBasic(e.basic ?? !1);
    }
    initializeConnectorController() {
      lc.f.initialize(this.chainNamespaces);
    }
    initializeOptionsController(e) {
      (lh.f.setDebug(!1 !== e.debug),
        lh.f.setEnableWalletConnect(!1 !== e.enableWalletConnect),
        lh.f.setEnableWalletGuide(!1 !== e.enableWalletGuide),
        lh.f.setEnableWallets(!1 !== e.enableWallets),
        lh.f.setEIP6963Enabled(!1 !== e.enableEIP6963),
        lh.f.setEnableNetworkSwitch(!1 !== e.enableNetworkSwitch),
        lh.f.setEnableAuthLogger(!1 !== e.enableAuthLogger),
        lh.f.setCustomRpcUrls(e.customRpcUrls),
        lh.f.setSdkVersion(e.sdkVersion),
        lh.f.setProjectId(e.projectId),
        lh.f.setEnableEmbedded(e.enableEmbedded),
        lh.f.setAllWallets(e.allWallets),
        lh.f.setIncludeWalletIds(e.includeWalletIds),
        lh.f.setExcludeWalletIds(e.excludeWalletIds),
        lh.f.setFeaturedWalletIds(e.featuredWalletIds),
        lh.f.setTokens(e.tokens),
        lh.f.setTermsConditionsUrl(e.termsConditionsUrl),
        lh.f.setPrivacyPolicyUrl(e.privacyPolicyUrl),
        lh.f.setCustomWallets(e.customWallets),
        lh.f.setFeatures(e.features),
        lh.f.setAllowUnsupportedChain(e.allowUnsupportedChain),
        lh.f.setDefaultAccountTypes(e.defaultAccountTypes),
        lh.f.setUniversalProviderConfigOverride(
          e.universalProviderConfigOverride,
        ));
      let t = this.getDefaultMetaData();
      if (
        (!e.metadata && t && (e.metadata = t),
        lh.f.setMetadata(e.metadata),
        lh.f.setDisableAppend(e.disableAppend),
        lh.f.setEnableEmbedded(e.enableEmbedded),
        lh.f.setSIWX(e.siwx),
        !e.projectId)
      )
        return void lf.f.open(lW.PROJECT_ID_NOT_CONFIGURED, "error");
      if (
        e.adapters?.find((e) => e.namespace === ld.f.CHAIN.EVM) &&
        e.siweConfig
      ) {
        if (e.siwx)
          throw Error("Cannot set both `siweConfig` and `siwx` options");
        lh.f.setSIWX(e.siweConfig.mapToSIWX());
      }
    }
    getDefaultMetaData() {
      return "u" > typeof window && "u" > typeof document
        ? {
            name:
              document.getElementsByTagName("title")?.[0]?.textContent || "",
            description:
              document.querySelector('meta[property="og:description"]')
                ?.content || "",
            url: window.location.origin,
            icons: [document.querySelector('link[rel~="icon"]')?.href || ""],
          }
        : null;
    }
    setUnsupportedNetwork(e) {
      let t = this.getActiveChainNamespace();
      if (t) {
        let i = lB.getUnsupportedNetwork(`${t}:${e}`);
        lw.f.setActiveCaipNetwork(i);
      }
    }
    getDefaultNetwork() {
      return lB.getCaipNetworkFromStorage(this.defaultCaipNetwork);
    }
    extendCaipNetwork(e, t) {
      return lB.extendCaipNetwork(e, {
        customNetworkImageUrls: t.chainImages,
        projectId: t.projectId,
      });
    }
    extendCaipNetworks(e) {
      return lB.extendCaipNetworks(e.networks, {
        customNetworkImageUrls: e.chainImages,
        customRpcUrls: e.customRpcUrls,
        projectId: e.projectId,
      });
    }
    extendDefaultCaipNetwork(e) {
      let t = e.networks.find((t) => t.id === e.defaultNetwork?.id);
      return t
        ? lB.extendCaipNetwork(t, {
            customNetworkImageUrls: e.chainImages,
            customRpcUrls: e.customRpcUrls,
            projectId: e.projectId,
          })
        : void 0;
    }
    createClients() {
      ((this.connectionControllerClient = {
        connectWalletConnect: async () => {
          let e = lw.f.state.activeChain,
            t = this.getAdapter(e),
            i = this.getCaipNetwork(e)?.id;
          if (!t) throw Error("Adapter not found");
          let s = await t.connectWalletConnect(i);
          (this.close(),
            this.setClientId(s?.clientId || null),
            lE.f.setConnectedNamespaces([...lw.f.state.chains.keys()]),
            this.chainNamespaces.forEach((e) => {
              lc.f.setConnectorId(l$.f.CONNECTOR_TYPE_WALLET_CONNECT, e);
            }),
            await this.syncWalletConnectAccount());
        },
        connectExternal: async ({
          id: e,
          info: t,
          type: i,
          provider: s,
          chain: r,
          caipNetwork: n,
        }) => {
          let a = lw.f.state.activeChain,
            o = r || a,
            c = this.getAdapter(o);
          if (r && r !== a && !n) {
            let e = this.caipNetworks?.find((e) => e.chainNamespace === r);
            e && this.setCaipNetwork(e);
          }
          if (!c) throw Error("Adapter not found");
          let l = this.getCaipNetwork(o),
            h = await c.connect({
              id: e,
              info: t,
              type: i,
              provider: s,
              chainId: n?.id || l?.id,
              rpcUrl:
                n?.rpcUrls?.default?.http?.[0] ||
                l?.rpcUrls?.default?.http?.[0],
            });
          if (!h) return;
          (lE.f.addConnectedNamespace(o),
            this.syncProvider({ ...h, chainNamespace: o }),
            await this.syncAccount({ ...h, chainNamespace: o }));
          let { accounts: p } = await c.getAccounts({ namespace: o, id: e });
          this.setAllAccounts(p, o);
        },
        reconnectExternal: async ({ id: e, info: t, type: i, provider: s }) => {
          let r = lw.f.state.activeChain,
            n = this.getAdapter(r);
          n?.reconnect &&
            (await n?.reconnect({
              id: e,
              info: t,
              type: i,
              provider: s,
              chainId: this.getCaipNetwork()?.id,
            }),
            lE.f.addConnectedNamespace(r));
        },
        disconnect: async (e) => {
          let t = e || lw.f.state.activeChain,
            i = this.getAdapter(t),
            s = lZ.getProvider(t),
            r = lZ.getProviderId(t);
          (await i?.disconnect({ provider: s, providerType: r }),
            lE.f.removeConnectedNamespace(t),
            lZ.resetChain(t),
            this.setUser(void 0, t),
            this.setStatus("disconnected", t),
            (this.hasSwitchedToPreferredAccountTypeOnConnect = !1));
        },
        checkInstalled: (e) =>
          e ? e.some((e) => !!window.ethereum?.[String(e)]) : !!window.ethereum,
        signMessage: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain),
            i = await t?.signMessage({
              message: e,
              address: la.f.state.address,
              provider: lZ.getProvider(lw.f.state.activeChain),
            });
          return i?.signature || "";
        },
        sendTransaction: async (e) => {
          if (e.chainNamespace === ld.f.CHAIN.EVM) {
            let t = this.getAdapter(lw.f.state.activeChain),
              i = lZ.getProvider(lw.f.state.activeChain),
              s = await t?.sendTransaction({
                ...e,
                caipNetwork: this.getCaipNetwork(),
                provider: i,
              });
            return s?.hash || "";
          }
          return "";
        },
        estimateGas: async (e) => {
          if (e.chainNamespace === ld.f.CHAIN.EVM) {
            let t = this.getAdapter(lw.f.state.activeChain),
              i = lZ.getProvider(lw.f.state.activeChain),
              s = this.getCaipNetwork();
            if (!s) throw Error("CaipNetwork is undefined");
            let r = await t?.estimateGas({ ...e, provider: i, caipNetwork: s });
            return r?.gas || 0n;
          }
          return 0n;
        },
        getEnsAvatar: async () => {
          let e = this.getAdapter(lw.f.state.activeChain),
            t = await e?.getProfile({
              address: la.f.state.address,
              chainId: Number(this.getCaipNetwork()?.id),
            });
          return t?.profileImage || !1;
        },
        getEnsAddress: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain),
            i = this.getCaipNetwork();
          if (!i) return !1;
          let s = await t?.getEnsAddress({ name: e, caipNetwork: i });
          return s?.address || !1;
        },
        writeContract: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain),
            i = this.getCaipNetwork(),
            s = this.getCaipAddress(),
            r = lZ.getProvider(lw.f.state.activeChain);
          if (!i || !s) throw Error("CaipNetwork or CaipAddress is undefined");
          let n = await t?.writeContract({
            ...e,
            caipNetwork: i,
            provider: r,
            caipAddress: s,
          });
          return n?.hash;
        },
        parseUnits: (e, t) => {
          let i = this.getAdapter(lw.f.state.activeChain);
          return i?.parseUnits({ value: e, decimals: t }) ?? 0n;
        },
        formatUnits: (e, t) => {
          let i = this.getAdapter(lw.f.state.activeChain);
          return i?.formatUnits({ value: e, decimals: t }) ?? "0";
        },
        getCapabilities: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain);
          return await t?.getCapabilities(e);
        },
        grantPermissions: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain);
          return await t?.grantPermissions(e);
        },
        revokePermissions: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain);
          return t?.revokePermissions ? await t.revokePermissions(e) : "0x";
        },
        walletGetAssets: async (e) => {
          let t = this.getAdapter(lw.f.state.activeChain);
          return (await t?.walletGetAssets(e)) ?? {};
        },
      }),
        (this.networkControllerClient = {
          switchCaipNetwork: async (e) => await this.switchCaipNetwork(e),
          getApprovedCaipNetworksData: async () =>
            this.getApprovedCaipNetworksData(),
        }),
        lo.f.setClient(this.connectionControllerClient));
    }
    getApprovedCaipNetworksData() {
      if (
        lZ.getProviderId(lw.f.state.activeChain) ===
        l$.f.CONNECTOR_TYPE_WALLET_CONNECT
      ) {
        let e = this.universalProvider?.session?.namespaces;
        return {
          supportsAllNetworks:
            this.universalProvider?.session?.peer?.metadata.name ===
            "MetaMask Wallet",
          approvedCaipNetworkIds: this.getChainsFromNamespaces(e),
        };
      }
      return { supportsAllNetworks: !0, approvedCaipNetworkIds: [] };
    }
    async switchCaipNetwork(e) {
      if (!e) return;
      let t = e.chainNamespace;
      if (this.getAddressByChainNamespace(e.chainNamespace)) {
        let i = lZ.getProvider(t),
          s = lZ.getProviderId(t);
        if (e.chainNamespace === lw.f.state.activeChain) {
          let r = this.getAdapter(t);
          await r?.switchNetwork({
            caipNetwork: e,
            provider: i,
            providerType: s,
          });
        } else if (
          (this.setCaipNetwork(e), s === l$.f.CONNECTOR_TYPE_WALLET_CONNECT)
        )
          this.syncWalletConnectAccount();
        else {
          let i = this.getAddressByChainNamespace(t);
          i &&
            this.syncAccount({ address: i, chainId: e.id, chainNamespace: t });
        }
      } else this.setCaipNetwork(e);
    }
    getChainsFromNamespaces(e = {}) {
      return Object.values(e).flatMap((e) =>
        Array.from(
          new Set([
            ...(e.chains || []),
            ...e.accounts.map((e) => {
              let { chainId: t, chainNamespace: i } = lg.parseCaipAddress(e);
              return `${i}:${t}`;
            }),
          ]),
        ),
      );
    }
    createAdapters(e) {
      return (
        this.createClients(),
        this.chainNamespaces.reduce((t, i) => {
          let s = e?.find((e) => e.namespace === i);
          return (
            s
              ? ((t[i] = s),
                (t[i].namespace = i),
                t[i].construct({
                  namespace: i,
                  projectId: this.options?.projectId,
                  networks: this.caipNetworks,
                }))
              : (t[i] = new hi({ namespace: i, networks: this.caipNetworks })),
            t
          );
        }, {})
      );
    }
    async initChainAdapter(e) {
      (this.onConnectors(e),
        this.listenAdapter(e),
        this.chainAdapters?.[e].syncConnectors(this.options, this),
        await this.createUniversalProviderForAdapter(e));
    }
    async initChainAdapters() {
      await Promise.all(
        this.chainNamespaces.map(async (e) => {
          await this.initChainAdapter(e);
        }),
      );
    }
    onConnectors(e) {
      let t = this.getAdapter(e);
      t?.on("connectors", this.setConnectors.bind(this));
    }
    listenAdapter(e) {
      let t = this.getAdapter(e);
      if (!t) return;
      let i = lE.f.getConnectionStatus();
      ("connected" === i
        ? this.setStatus("connecting", e)
        : ("disconnected" === i && lE.f.clearAddressCache(),
          this.setStatus(i, e)),
        t.on("switchNetwork", ({ address: t, chainId: i }) => {
          let s = this.caipNetworks?.find(
              (e) => e.id === i || e.caipNetworkId === i,
            ),
            r = lw.f.state.activeChain === e,
            n = lw.f.getAccountProp("address", e);
          if (s) {
            let s = r && t ? t : n;
            s &&
              this.syncAccount({ address: s, chainId: i, chainNamespace: e });
          } else this.setUnsupportedNetwork(i);
        }),
        t.on("disconnect", this.disconnect.bind(this, e)),
        t.on("pendingTransactions", () => {
          let e = la.f.state.address,
            t = lw.f.state.activeCaipNetwork;
          e && t?.id && this.updateNativeBalance(e, t.id, t.chainNamespace);
        }),
        t.on("accountChanged", ({ address: t, chainId: i }) => {
          let s = lw.f.state.activeChain === e;
          s && i
            ? this.syncAccount({ address: t, chainId: i, chainNamespace: e })
            : s && lw.f.state.activeCaipNetwork?.id
              ? this.syncAccount({
                  address: t,
                  chainId: lw.f.state.activeCaipNetwork?.id,
                  chainNamespace: e,
                })
              : this.syncAccountInfo(t, i, e);
        }));
    }
    async createUniversalProviderForAdapter(e) {
      (await this.getUniversalProvider(),
        this.universalProvider &&
          this.chainAdapters?.[e]?.setUniversalProvider?.(
            this.universalProvider,
          ));
    }
    async syncExistingConnection() {
      await Promise.allSettled(
        this.chainNamespaces.map((e) => this.syncNamespaceConnection(e)),
      );
    }
    async syncNamespaceConnection(e) {
      try {
        let t = lc.f.getConnectorId(e);
        switch ((this.setStatus("connecting", e), t)) {
          case ld.f.CONNECTOR_ID.WALLET_CONNECT:
            await this.syncWalletConnectAccount();
            break;
          case ld.f.CONNECTOR_ID.AUTH:
            break;
          default:
            await this.syncAdapterConnection(e);
        }
      } catch (t) {
        (console.warn("AppKit couldn't sync existing connection", t),
          this.setStatus("disconnected", e));
      }
    }
    async syncAdapterConnection(e) {
      let t = this.getAdapter(e),
        i = lc.f.getConnectorId(e),
        s = this.getCaipNetwork(e),
        r = lc.f.getConnectors(e).find((e) => e.id === i);
      try {
        if (!t || !r)
          throw Error(`Adapter or connector not found for namespace ${e}`);
        if (!s?.id) throw Error("CaipNetwork not found");
        let i = await t?.syncConnection({
          namespace: e,
          id: r.id,
          chainId: s.id,
          rpcUrl: s?.rpcUrls?.default?.http?.[0],
        });
        if (i) {
          let s = await t?.getAccounts({ namespace: e, id: r.id });
          (s && s.accounts.length > 0
            ? this.setAllAccounts(s.accounts, e)
            : this.setAllAccounts([ll.f.createAccount(e, i.address, "eoa")], e),
            this.syncProvider({ ...i, chainNamespace: e }),
            await this.syncAccount({ ...i, chainNamespace: e }),
            this.setStatus("connected", e));
        } else this.setStatus("disconnected", e);
      } catch (t) {
        this.setStatus("disconnected", e);
      }
    }
    async syncWalletConnectAccount() {
      let e = this.chainNamespaces.map(async (e) => {
        let t = this.getAdapter(e),
          i = this.universalProvider?.session?.namespaces?.[e]?.accounts || [],
          s = lw.f.state.activeCaipNetwork?.id,
          r =
            i.find((e) => {
              let { chainId: t } = lg.parseCaipAddress(e);
              return t === s?.toString();
            }) || i[0];
        if (r) {
          let i = lg.validateCaipAddress(r),
            { chainId: s, address: n } = lg.parseCaipAddress(i);
          if (
            (lZ.setProviderId(e, l$.f.CONNECTOR_TYPE_WALLET_CONNECT),
            this.caipNetworks &&
              lw.f.state.activeCaipNetwork &&
              t?.namespace !== ld.f.CHAIN.EVM)
          ) {
            let i = t?.getWalletConnectProvider({
              caipNetworks: this.caipNetworks,
              provider: this.universalProvider,
              activeCaipNetwork: lw.f.state.activeCaipNetwork,
            });
            lZ.setProvider(e, i);
          } else lZ.setProvider(e, this.universalProvider);
          (lc.f.setConnectorId(ld.f.CONNECTOR_ID.WALLET_CONNECT, e),
            lE.f.addConnectedNamespace(e),
            this.syncWalletConnectAccounts(e),
            await this.syncAccount({
              address: n,
              chainId: s,
              chainNamespace: e,
            }));
        } else this.setStatus("disconnected", e);
        await lw.f.setApprovedCaipNetworksData(e);
      });
      await Promise.all(e);
    }
    syncWalletConnectAccounts(e) {
      let t = this.universalProvider?.session?.namespaces?.[e]?.accounts
        ?.map((e) => {
          let { address: t } = lg.parseCaipAddress(e);
          return t;
        })
        .filter((e, t, i) => i.indexOf(e) === t);
      t &&
        this.setAllAccounts(
          t.map((t) =>
            ll.f.createAccount(e, t, "bip122" === e ? "payment" : "eoa"),
          ),
          e,
        );
    }
    syncProvider({ type: e, provider: t, id: i, chainNamespace: s }) {
      (lZ.setProviderId(s, e), lZ.setProvider(s, t), lc.f.setConnectorId(i, s));
    }
    async syncAccount(e) {
      let t = e.chainNamespace === lw.f.state.activeChain,
        i = lw.f.getCaipNetworkByNamespace(e.chainNamespace, e.chainId),
        { address: s, chainId: r, chainNamespace: n } = e,
        { chainId: a } = lE.f.getActiveNetworkProps(),
        o = r || a,
        c =
          lw.f.state.activeCaipNetwork?.name === ld.f.UNSUPPORTED_NETWORK_NAME,
        l = lw.f.getNetworkProp("supportsAllNetworks", n);
      if ((this.setStatus("connected", n), (!c || l) && o)) {
        let e = this.caipNetworks?.find(
            (e) => e.id.toString() === o.toString(),
          ),
          r = this.caipNetworks?.find((e) => e.chainNamespace === n);
        if (!l && !e && !r) {
          let t = this.getApprovedCaipNetworkIds() || [],
            i = t.find(
              (e) => lg.parseCaipNetworkId(e)?.chainId === o.toString(),
            ),
            s = t.find((e) => lg.parseCaipNetworkId(e)?.chainNamespace === n);
          ((e = this.caipNetworks?.find((e) => e.caipNetworkId === i)),
            (r = this.caipNetworks?.find(
              (e) =>
                e.caipNetworkId === s ||
                ("deprecatedCaipNetworkId" in e &&
                  e.deprecatedCaipNetworkId === s),
            )));
        }
        let a = e || r;
        (a?.chainNamespace === lw.f.state.activeChain
          ? lh.f.state.enableNetworkSwitch &&
            !lh.f.state.allowUnsupportedChain &&
            lw.f.state.activeCaipNetwork?.name === ld.f.UNSUPPORTED_NETWORK_NAME
            ? lw.f.showUnsupportedChainUI()
            : this.setCaipNetwork(a)
          : !t && i && this.setCaipNetworkOfNamespace(i, n),
          this.syncConnectedWalletInfo(n),
          lY.f.isLowerCaseMatch(s, la.f.state.address) ||
            this.syncAccountInfo(s, a?.id, n),
          t
            ? await this.syncBalance({
                address: s,
                chainId: a?.id,
                chainNamespace: n,
              })
            : await this.syncBalance({
                address: s,
                chainId: i?.id,
                chainNamespace: n,
              }));
      }
    }
    async syncAccountInfo(e, t, i) {
      let s = this.getCaipAddress(i),
        r = t || s?.split(":")[1];
      if (!r) return;
      let n = `${i}:${r}:${e}`;
      (this.setCaipAddress(n, i),
        await this.syncIdentity({ address: e, chainId: r, chainNamespace: i }));
    }
    async syncReownName(e, t) {
      try {
        let i = await this.getReownName(e);
        if (i[0]) {
          let e = i[0];
          this.setProfileName(e.name, t);
        } else this.setProfileName(null, t);
      } catch {
        this.setProfileName(null, t);
      }
    }
    syncConnectedWalletInfo(e) {
      let t = lc.f.getConnectorId(e),
        i = lZ.getProviderId(e);
      if (
        i === l$.f.CONNECTOR_TYPE_ANNOUNCED ||
        i === l$.f.CONNECTOR_TYPE_INJECTED
      ) {
        if (t) {
          let i = this.getConnectors().find((e) => e.id === t);
          if (i) {
            let { info: t, name: s, imageUrl: r } = i,
              n = r || this.getConnectorImage(i);
            this.setConnectedWalletInfo({ name: s, icon: n, ...t }, e);
          }
        }
      } else if (i === l$.f.CONNECTOR_TYPE_WALLET_CONNECT) {
        let t = lZ.getProvider(e);
        t?.session &&
          this.setConnectedWalletInfo(
            {
              ...t.session.peer.metadata,
              name: t.session.peer.metadata.name,
              icon: t.session.peer.metadata.icons?.[0],
            },
            e,
          );
      } else if (t)
        if (t === ld.f.CONNECTOR_ID.COINBASE) {
          let t = this.getConnectors().find(
            (e) => e.id === ld.f.CONNECTOR_ID.COINBASE,
          );
          this.setConnectedWalletInfo(
            { name: "Coinbase Wallet", icon: this.getConnectorImage(t) },
            e,
          );
        } else this.setConnectedWalletInfo({ name: t }, e);
    }
    async syncBalance(e) {
      lu.f
        .getNetworksByNamespace(this.caipNetworks, e.chainNamespace)
        .find((t) => t.id.toString() === e.chainId?.toString()) &&
        e.chainId &&
        (await this.updateNativeBalance(
          e.address,
          e.chainId,
          e.chainNamespace,
        ));
    }
    async updateNativeBalance(e, t, i) {
      let s = this.getAdapter(i);
      if (s) {
        let r = await s.getBalance({
          address: e,
          chainId: t,
          caipNetwork: this.getCaipNetwork(i),
          tokens: this.options.tokens,
        });
        this.setBalance(r.balance, r.symbol, i);
      }
    }
    async initializeUniversalAdapter() {
      let e = lG.createLogger((e, ...t) => {
          (e && this.handleAlertError(e), console.error(...t));
        }),
        t = {
          projectId: this.options?.projectId,
          metadata: {
            name: this.options?.metadata ? this.options?.metadata.name : "",
            description: this.options?.metadata
              ? this.options?.metadata.description
              : "",
            url: this.options?.metadata ? this.options?.metadata.url : "",
            icons: this.options?.metadata ? this.options?.metadata.icons : [""],
          },
          logger: e,
        };
      (lh.f.setManualWCControl(!!this.options?.manualWCControl),
        (this.universalProvider =
          this.options.universalProvider ?? (await lp.f.init(t))),
        this.listenWalletConnect());
    }
    listenWalletConnect() {
      this.universalProvider &&
        (this.universalProvider.on("display_uri", (e) => {
          lo.f.setUri(e);
        }),
        this.universalProvider.on("connect", lo.f.finalizeWcConnection),
        this.universalProvider.on("disconnect", () => {
          (this.chainNamespaces.forEach((e) => {
            this.resetAccount(e);
          }),
            lo.f.resetWcConnection());
        }),
        this.universalProvider.on("chainChanged", (e) => {
          let t = this.caipNetworks?.find((t) => t.id == e),
            i = this.getCaipNetwork();
          t
            ? i?.id !== t?.id && this.setCaipNetwork(t)
            : this.setUnsupportedNetwork(e);
        }),
        this.universalProvider.on("session_event", (e) => {
          if (l9.isSessionEventData(e)) {
            let { name: t, data: i } = e.params.event;
            "accountsChanged" === t &&
              Array.isArray(i) &&
              ll.f.isCaipAddress(i[0]) &&
              this.syncAccount(lg.parseCaipAddress(i[0]));
          }
        }));
    }
    createUniversalProvider() {
      return (
        !this.universalProviderInitPromise &&
          ll.f.isClient() &&
          this.options?.projectId &&
          (this.universalProviderInitPromise =
            this.initializeUniversalAdapter()),
        this.universalProviderInitPromise
      );
    }
    async getUniversalProvider() {
      if (!this.universalProvider)
        try {
          await this.createUniversalProvider();
        } catch (e) {
          (lP.f.sendEvent({
            type: "error",
            event: "INTERNAL_SDK_ERROR",
            properties: {
              errorType: "UniversalProviderInitError",
              errorMessage: e instanceof Error ? e.message : "Unknown",
              uncaught: !1,
            },
          }),
            console.error(
              "AppKit:getUniversalProvider - Cannot create provider",
              e,
            ));
        }
      return this.universalProvider;
    }
    handleAlertError(e) {
      let [t, i] =
          Object.entries(lF).find(([, { message: t }]) =>
            e.message.includes(t),
          ) ?? [],
        { message: s, alertErrorKey: r } = i ?? {};
      if (t && s && !this.reportedAlertErrors[t]) {
        let e = lW[r];
        e && (lf.f.open(e, "error"), (this.reportedAlertErrors[t] = !0));
      }
    }
    getAdapter(e) {
      if (e) return this.chainAdapters?.[e];
    }
    createAdapter(e) {
      if (!e) return;
      let t = e.namespace;
      t &&
        (this.createClients(),
        (e.namespace = t),
        e.construct({
          namespace: t,
          projectId: this.options?.projectId,
          networks: this.caipNetworks,
        }),
        this.chainNamespaces.includes(t) || this.chainNamespaces.push(t),
        this.chainAdapters && (this.chainAdapters[t] = e));
    }
    async open(e) {
      (await this.injectModalUi(),
        e?.uri && lo.f.setUri(e.uri),
        await lA.f.open(e));
    }
    async close() {
      (await this.injectModalUi(), lA.f.close());
    }
    setLoading(e, t) {
      lA.f.setLoading(e, t);
    }
    async disconnect(e) {
      await lo.f.disconnect(e);
    }
    getError() {
      return "";
    }
    getChainId() {
      return lw.f.state.activeCaipNetwork?.id;
    }
    async switchNetwork(e) {
      let t = this.caipNetworks?.find((t) => t.id === e.id);
      t
        ? await lw.f.switchActiveNetwork(t)
        : lf.f.open(lW.SWITCH_NETWORK_NOT_FOUND, "error");
    }
    getWalletProvider() {
      return lw.f.state.activeChain
        ? lZ.state.providers[lw.f.state.activeChain]
        : null;
    }
    getWalletProviderType() {
      return lZ.getProviderId(lw.f.state.activeChain);
    }
    subscribeProviders(e) {
      return lZ.subscribeProviders(e);
    }
    getThemeMode() {
      return lT.f.state.themeMode;
    }
    getThemeVariables() {
      return lT.f.state.themeVariables;
    }
    setThemeMode(e) {
      (lT.f.setThemeMode(e), (0, lk.H)(lT.f.state.themeMode));
    }
    setTermsConditionsUrl(e) {
      lh.f.setTermsConditionsUrl(e);
    }
    setPrivacyPolicyUrl(e) {
      lh.f.setPrivacyPolicyUrl(e);
    }
    setThemeVariables(e) {
      (lT.f.setThemeVariables(e), (0, lk.m)(lT.f.state.themeVariables));
    }
    subscribeTheme(e) {
      return lT.f.subscribe(e);
    }
    getWalletInfo() {
      return la.f.state.connectedWalletInfo;
    }
    getAccount(e) {
      let t = lc.f.getAuthConnector(e),
        i = lw.f.getAccountData(e);
      if (i)
        return {
          allAccounts: i.allAccounts,
          caipAddress: i.caipAddress,
          address: ll.f.getPlainAddress(i.caipAddress),
          isConnected: !!i.caipAddress,
          status: i.status,
          embeddedWalletInfo: t
            ? {
                user: i.user,
                authProvider: i.socialProvider || "email",
                accountType: i.preferredAccountType,
                isSmartAccountDeployed: !!i.smartAccountDeployed,
              }
            : void 0,
        };
    }
    subscribeAccount(e, t) {
      let i = () => {
        let i = this.getAccount(t);
        i && e(i);
      };
      (t ? lw.f.subscribeChainProp("accountState", i, t) : lw.f.subscribe(i),
        lc.f.subscribe(i));
    }
    subscribeNetwork(e) {
      return lw.f.subscribe(({ activeCaipNetwork: t }) => {
        e({ caipNetwork: t, chainId: t?.id, caipNetworkId: t?.caipNetworkId });
      });
    }
    subscribeWalletInfo(e) {
      return la.f.subscribeKey("connectedWalletInfo", e);
    }
    subscribeShouldUpdateToAddress(e) {
      la.f.subscribeKey("shouldUpdateToAddress", e);
    }
    subscribeCaipNetworkChange(e) {
      lw.f.subscribeKey("activeCaipNetwork", e);
    }
    getState() {
      return lO.f.state;
    }
    subscribeState(e) {
      return lO.f.subscribe(e);
    }
    showErrorMessage(e) {
      lS.f.showError(e);
    }
    showSuccessMessage(e) {
      lS.f.showSuccess(e);
    }
    getEvent() {
      return { ...lP.f.state };
    }
    subscribeEvents(e) {
      return lP.f.subscribe(e);
    }
    replace(e) {
      lN.f.replace(e);
    }
    redirect(e) {
      lN.f.push(e);
    }
    popTransactionStack(e) {
      lN.f.popTransactionStack(e);
    }
    isOpen() {
      return lA.f.state.open;
    }
    isTransactionStackEmpty() {
      return 0 === lN.f.state.transactionStack.length;
    }
    isTransactionShouldReplaceView() {
      return lN.f.state.transactionStack[lN.f.state.transactionStack.length - 1]
        ?.replace;
    }
    static getInstance() {
      return this.instance;
    }
    updateFeatures(e) {
      lh.f.setFeatures(e);
    }
    updateOptions(e) {
      let t = { ...(lh.f.state || {}), ...e };
      lh.f.setOptions(t);
    }
    setConnectMethodsOrder(e) {
      lh.f.setConnectMethodsOrder(e);
    }
    setWalletFeaturesOrder(e) {
      lh.f.setWalletFeaturesOrder(e);
    }
    setCollapseWallets(e) {
      lh.f.setCollapseWallets(e);
    }
    setSocialsOrder(e) {
      lh.f.setSocialsOrder(e);
    }
    getConnectMethodsOrder() {
      return lx.f.getConnectOrderMethod(
        lh.f.state.features,
        lc.f.getConnectors(),
      );
    }
    removeAdapter(e) {
      let t = this.getIsConnectedState(),
        i = this.getAdapter(e);
      if (!i || !this.chainAdapters || t) return;
      let s = this.caipNetworks?.filter((t) => t.chainNamespace !== e);
      (lw.f.removeAdapter(e),
        lc.f.removeAdapter(e),
        (this.chainNamespaces = this.chainNamespaces.filter((t) => t !== e)),
        (this.caipNetworks = s),
        i.removeAllEventListeners(),
        Reflect.deleteProperty(this.chainAdapters, e));
    }
    addAdapter(e, t) {
      let i = e.namespace;
      if (
        !this.connectionControllerClient ||
        !this.networkControllerClient ||
        !this.chainAdapters ||
        !i
      )
        return;
      let s = this.extendCaipNetworks({ ...this.options, networks: t });
      ((this.caipNetworks = [...(this.caipNetworks || []), ...s]),
        this.createAdapter(e),
        this.initChainAdapter(i),
        lw.f.addAdapter(
          e,
          {
            connectionControllerClient: this.connectionControllerClient,
            networkControllerClient: this.networkControllerClient,
          },
          s,
        ));
    }
    addNetwork(e, t) {
      if (this.chainAdapters && !this.chainAdapters[e])
        throw Error(`Adapter for namespace ${e} doesn't exist`);
      let i = this.extendCaipNetwork(t, this.options);
      (lw.f.addNetwork(i),
        this.caipNetworks &&
          !this.caipNetworks?.find((e) => e.id === i.id) &&
          this.caipNetworks.push(i));
    }
    removeNetwork(e, t) {
      if (this.chainAdapters && !this.chainAdapters[e])
        throw Error(`Adapter for namespace ${e} doesn't exist`);
      if (!this.caipNetworks?.find((e) => e.id === t))
        throw Error(`Network with ID ${t} not found`);
      if (!this.caipNetworks) return;
      let i = this.caipNetworks.filter(
        (i) => i.chainNamespace === e && i.id !== t,
      );
      if (!i?.length) throw Error("Cannot remove last network for a namespace");
      (lw.f.removeNetwork(e, t), (this.caipNetworks = [...i]));
    }
  }
  let hr = !1;
  class hn extends hs {
    async open(e) {
      lc.f.isConnected() || (await super.open(e));
    }
    async close() {
      (await super.close(),
        this.options.manualWCControl && lo.f.finalizeWcConnection());
    }
    async syncIdentity(e) {
      return Promise.resolve();
    }
    async syncBalance(e) {
      return Promise.resolve();
    }
    async injectModalUi() {
      if (!hr && ll.f.isClient()) {
        if (
          (await e.A(747691),
          await e.A(349922),
          !document.querySelector("w3m-modal"))
        ) {
          let e = document.createElement("w3m-modal");
          lh.f.state.disableAppend ||
            lh.f.state.enableEmbedded ||
            document.body.insertAdjacentElement("beforeend", e);
        }
        hr = !0;
      }
    }
  }
  class ha extends Error {
    constructor() {
      (super(), Object.setPrototypeOf(this, ha.prototype));
    }
  }
  class ho extends Error {
    constructor(e) {
      (super(
        `WalletConnect Adapter - Method ${e} is not supported by the wallet`,
      ),
        (this.name = "WalletConnectFeatureNotSupportedError"));
    }
  }
  let hc = {
    mainnet: `You are using a deprecated chain ID for Solana Mainnet, please use ${R} instead.`,
    devnet: `You are using a deprecated chain ID for Solana Devnet, please use ${M} instead.`,
    wallet:
      "The connected wallet is using a deprecated chain ID for Solana. Please, contact them to upgrade. You can learn more at https://github.com/ChainAgnostic/namespaces/blob/main/solana/caip10.md#chain-ids",
  };
  function hl(e, t) {
    let i = e.namespaces.solana?.accounts.map(
      (e) => `solana:${e.split(":")[1]}`,
    );
    if (t === R)
      return i?.find((e) => e === R) ? R : (console.warn(hc.wallet), j);
    if (t === M)
      return i?.find((e) => e === M) ? M : (console.warn(hc.wallet), U);
    throw Error(
      "WalletConnect Solana Adapter: Unable to get a default chain from the session.",
    );
  }
  class hh extends Error {
    constructor() {
      (super("QR Code Modal was closed by user"),
        Object.setPrototypeOf(this, hh.prototype),
        (this.name = "QRCodeModalError"));
    }
  }
  class hp {
    _UniversalProvider;
    _session;
    _modal;
    _projectId;
    _network;
    _ConnectQueueResolver;
    constructor(e) {
      if (
        (this.initClient(e.options),
        (this._network = e.network),
        !e.options.projectId)
      )
        throw Error("WalletConnect Adapter: Project ID is undefined");
      this._projectId = e.options.projectId;
    }
    async connect() {
      var e;
      let t;
      if (
        (this._UniversalProvider ||
          (await new Promise((e) => {
            this._ConnectQueueResolver = e;
          })),
        !this._UniversalProvider)
      )
        throw Error(
          "WalletConnect Adapter - Universal Provider was undefined while calling 'connect()'",
        );
      if (this._UniversalProvider.session) {
        this._session = this._UniversalProvider.session;
        let e = hl(this._session, this._network);
        return (
          (this._network = e),
          this._UniversalProvider.setDefaultChain(e),
          { publicKey: this.publicKey }
        );
      }
      await this.initModal();
      let i = {
        optionalNamespaces: {
          solana: {
            chains:
              ((t = [(e = this._network)]),
              e === R || e === j
                ? ((t = [R, j]), e === j && console.warn(hc.mainnet))
                : (e === U || e === M) &&
                  ((t = [M, U]), U && console.warn(hc.devnet)),
              t),
            methods: [O.signTransaction, O.signMessage],
            events: [],
          },
        },
      };
      this._modal?.open();
      let s = new AbortController(),
        r = s.signal;
      this._modal?.subscribeState((e) => {
        e.open || s.abort(new hh());
      });
      try {
        let e = await Promise.race([
          this._UniversalProvider?.connect(i),
          new Promise((e, t) => {
            r.addEventListener("abort", () => {
              t(r.reason);
            });
          }),
        ]);
        if ((this._modal?.close(), (this._session = e), !e)) throw new k.K();
        let t = hl(e, this._network);
        return (
          (this._network = t),
          this._UniversalProvider?.setDefaultChain(t),
          { publicKey: this.publicKey }
        );
      } catch (e) {
        throw (this._modal?.close(), e);
      }
    }
    async disconnect() {
      if (this._UniversalProvider?.session) {
        if ((await this.initModal(), !this._modal))
          throw Error(
            "WalletConnect Adapter -Modal is undefined: unable to disconnect",
          );
        (await this.client.disconnect(), (this._session = void 0));
      } else throw new ha();
    }
    get client() {
      if (this._UniversalProvider) return this._UniversalProvider;
      throw new ha();
    }
    get session() {
      if (!this._session) throw new ha();
      return this._session;
    }
    get publicKey() {
      if (this._UniversalProvider?.session && this._session) {
        let { address: e } = (function (e) {
          let [t, i, s] = e.split(":");
          return { namespace: t, reference: i, address: s };
        })(this._session?.namespaces.solana?.accounts[0] ?? "");
        return new $.PublicKey(e);
      }
      throw new ha();
    }
    async signTransaction(e) {
      this.checkIfWalletSupportsMethod(O.signTransaction);
      let t = (0, L.f)(e),
        i = t ? {} : e,
        { signature: s, transaction: r } = await this.client.client.request({
          chainId: this._network,
          topic: this.session.topic,
          request: {
            method: O.signTransaction,
            params: { ...i, transaction: this.serialize(e) },
          },
        });
      return r
        ? this.deserialize(r, t)
        : (e.addSignature(this.publicKey, q.Buffer.from(lX.f.decode(s))), e);
    }
    async signMessage(e) {
      this.checkIfWalletSupportsMethod(O.signMessage);
      let { signature: t } = await this.client.client.request({
        chainId: this._network,
        topic: this.session.topic,
        request: {
          method: O.signMessage,
          params: {
            pubkey: this.publicKey.toString(),
            message: lX.f.encode(e),
          },
        },
      });
      return lX.f.decode(t);
    }
    async signAndSendTransaction(e) {
      this.checkIfWalletSupportsMethod(O.signAndSendTransaction);
      let { signature: t } = await this.client.client.request({
        chainId: this._network,
        topic: this.session.topic,
        request: {
          method: O.signAndSendTransaction,
          params: { transaction: this.serialize(e) },
        },
      });
      return t;
    }
    async signAllTransactions(e) {
      try {
        this.checkIfWalletSupportsMethod(O.signAllTransactions);
        let t = e.map((e) => this.serialize(e)),
          { transactions: i } = await this.client.client.request({
            chainId: this._network,
            topic: this.session.topic,
            request: {
              method: O.signAllTransactions,
              params: { transactions: t },
            },
          });
        return e.map((e, t) =>
          (0, L.f)(e)
            ? this.deserialize(i[t] ?? "", !0)
            : this.deserialize(i[t] ?? ""),
        );
      } catch (t) {
        if (t instanceof ho) {
          let t = e.map((e) => this.signTransaction(e));
          return await Promise.all(t);
        }
        throw t;
      }
    }
    async initClient(e) {
      let t = await ln.init(e);
      ((this._UniversalProvider = t),
        this._ConnectQueueResolver && this._ConnectQueueResolver(!0));
    }
    async initModal() {
      if (!this._modal) {
        if (!this._UniversalProvider)
          throw Error(
            "WalletConnect Adapter - cannot init modal when Universal Provider is undefined",
          );
        this._modal = new hn({
          ...{
            projectId: this._projectId,
            universalProvider: this._UniversalProvider,
            networks: [l4, l8, l3],
            manualWCControl: !0,
          },
          basic: !0,
          sdkVersion: "html-core-1.7.2",
        });
      }
    }
    serialize(e) {
      return q.Buffer.from(e.serialize({ verifySignatures: !1 })).toString(
        "base64",
      );
    }
    deserialize(e, t = !1) {
      return t
        ? $.VersionedTransaction.deserialize(q.Buffer.from(e, "base64"))
        : $.Transaction.from(q.Buffer.from(e, "base64"));
    }
    checkIfWalletSupportsMethod(e) {
      if (!this.session.namespaces.solana?.methods.includes(e)) throw new ho(e);
    }
  }
  class hd extends T.L {
    name = "WalletConnect";
    url = "https://walletconnect.org";
    icon =
      "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4NSIgdmlld0JveD0iMCAwIDMwMCAxODUiIHdpZHRoPSIzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTYxLjQzODU0MjkgMzYuMjU2MjYxMmM0OC45MTEyMjQxLTQ3Ljg4ODE2NjMgMTI4LjIxMTk4NzEtNDcuODg4MTY2MyAxNzcuMTIzMjA5MSAwbDUuODg2NTQ1IDUuNzYzNDE3NGMyLjQ0NTU2MSAyLjM5NDQwODEgMi40NDU1NjEgNi4yNzY1MTEyIDAgOC42NzA5MjA0bC0yMC4xMzY2OTUgMTkuNzE1NTAzYy0xLjIyMjc4MSAxLjE5NzIwNTEtMy4yMDUzIDEuMTk3MjA1MS00LjQyODA4MSAwbC04LjEwMDU4NC03LjkzMTE0NzljLTM0LjEyMTY5Mi0zMy40MDc5ODE3LTg5LjQ0Mzg4Ni0zMy40MDc5ODE3LTEyMy41NjU1Nzg4IDBsLTguNjc1MDU2MiA4LjQ5MzYwNTFjLTEuMjIyNzgxNiAxLjE5NzIwNDEtMy4yMDUzMDEgMS4xOTcyMDQxLTQuNDI4MDgwNiAwbC0yMC4xMzY2OTQ5LTE5LjcxNTUwMzFjLTIuNDQ1NTYxMi0yLjM5NDQwOTItMi40NDU1NjEyLTYuMjc2NTEyMiAwLTguNjcwOTIwNHptMjE4Ljc2Nzc5NjEgNDAuNzczNzQ0OSAxNy45MjE2OTcgMTcuNTQ2ODk3YzIuNDQ1NTQ5IDIuMzk0Mzk2OSAyLjQ0NTU2MyA2LjI3NjQ3NjkuMDAwMDMxIDguNjcwODg5OWwtODAuODEwMTcxIDc5LjEyMTEzNGMtMi40NDU1NDQgMi4zOTQ0MjYtNi40MTA1ODIgMi4zOTQ0NTMtOC44NTYxNi4wMDAwNjItLjAwMDAxLS4wMDAwMS0uMDAwMDIyLS4wMDAwMjItLjAwMDAzMi0uMDAwMDMybC01Ny4zNTQxNDMtNTYuMTU0NTcyYy0uNjExMzktLjU5ODYwMi0xLjYwMjY1LS41OTg2MDItMi4yMTQwNCAwLS4wMDAwMDQuMDAwMDA0LS4wMDAwMDcuMDAwMDA4LS4wMDAwMTEuMDAwMDExbC01Ny4zNTI5MjEyIDU2LjE1NDUzMWMtMi40NDU1MzY4IDIuMzk0NDMyLTYuNDEwNTc1NSAyLjM5NDQ3Mi04Ljg1NjE2MTIuMDAwMDg3LS4wMDAwMTQzLS4wMDAwMTQtLjAwMDAyOTYtLjAwMDAyOC0uMDAwMDQ0OS0uMDAwMDQ0bC04MC44MTI0MTk0My03OS4xMjIxODVjLTIuNDQ1NTYwMjEtMi4zOTQ0MDgtMi40NDU1NjAyMS02LjI3NjUxMTUgMC04LjY3MDkxOTdsMTcuOTIxNzI5NjMtMTcuNTQ2ODY3M2MyLjQ0NTU2MDItMi4zOTQ0MDgyIDYuNDEwNTk4OS0yLjM5NDQwODIgOC44NTYxNjAyIDBsNTcuMzU0OTc3NSA1Ni4xNTUzNTdjLjYxMTM5MDguNTk4NjAyIDEuNjAyNjQ5LjU5ODYwMiAyLjIxNDAzOTggMCAuMDAwMDA5Mi0uMDAwMDA5LjAwMDAxNzQtLjAwMDAxNy4wMDAwMjY1LS4wMDAwMjRsNTcuMzUyMTAzMS01Ni4xNTUzMzNjMi40NDU1MDUtMi4zOTQ0NjMzIDYuNDEwNTQ0LTIuMzk0NTUzMSA4Ljg1NjE2MS0uMDAwMi4wMDAwMzQuMDAwMDMzNi4wMDAwNjguMDAwMDY3My4wMDAxMDEuMDAwMTAxbDU3LjM1NDkwMiA1Ni4xNTU0MzJjLjYxMTM5LjU5ODYwMSAxLjYwMjY1LjU5ODYwMSAyLjIxNDA0IDBsNTcuMzUzOTc1LTU2LjE1NDMyNDljMi40NDU1NjEtMi4zOTQ0MDkyIDYuNDEwNTk5LTIuMzk0NDA5MiA4Ljg1NjE2IDB6IiBmaWxsPSIjM2I5OWZjIi8+PC9zdmc+";
    supportedTransactionVersions = new Set(["legacy", 0]);
    _publicKey;
    _connecting;
    _wallet;
    _config;
    _readyState;
    _onDisconnect;
    constructor(e) {
      (super(),
        (this._publicKey = null),
        (this._connecting = !1),
        (this._config = e),
        (this._wallet = null),
        (this._readyState =
          "u" < typeof window ? D.m.Unsupported : D.m.Loadable),
        (this._onDisconnect = this.disconnect.bind(this)));
    }
    get publicKey() {
      return this._publicKey;
    }
    get connecting() {
      return this._connecting;
    }
    get readyState() {
      return this._readyState;
    }
    async connect() {
      try {
        if (this.connected || this.connecting) return;
        if (this._readyState !== D.m.Loadable) throw new k.F();
        ((this._connecting = !0),
          (this._wallet = new hp({
            network:
              this._config.network === x.f.Mainnet ? A.Mainnet : A.Devnet,
            options: this._config.options,
          })));
        let { publicKey: e } = await this._wallet.connect();
        ((this._publicKey = e),
          this.emit("connect", e),
          this._wallet.client.on("session_delete", this._onDisconnect));
      } catch (e) {
        if (
          "QRCodeModalError" === e.constructor.name ||
          (e instanceof Error && "QRCodeModalError" === e.name)
        )
          throw new k.G();
        throw ((this._connecting = !1), e);
      } finally {
        this._connecting = !1;
      }
    }
    async disconnect() {
      let e = this._wallet;
      if (e) {
        (e.client.off("session_delete", this._onDisconnect),
          (this._publicKey = null));
        try {
          e.client.session && (await e.disconnect());
        } catch (e) {
          (console.error("WalletConnectWalletAdapter: disconnect error", e),
            this.emit("error", new k.M(e?.message, e)));
        }
      }
      this.emit("disconnect");
    }
    async signTransaction(e) {
      try {
        let t = this._wallet;
        if (!t) throw new k.t();
        try {
          return await t.signTransaction(e);
        } catch (e) {
          throw new k.I(e?.message, e);
        }
      } catch (e) {
        throw (this.emit("error", e), e);
      }
    }
    async signMessage(e) {
      try {
        let t = this._wallet;
        if (!t) throw new k.t();
        try {
          return await t.signMessage(e);
        } catch (e) {
          throw new k.J(e?.message, e);
        }
      } catch (e) {
        throw (this.emit("error", e), e);
      }
    }
    async signAndSendTransaction(e) {
      try {
        let t = this._wallet;
        if (!t) throw new k.t();
        try {
          return await t.signAndSendTransaction(e);
        } catch (e) {
          throw new k.I(e?.message, e);
        }
      } catch (e) {
        throw (this.emit("error", e), e);
      }
    }
    async signAllTransactions(e) {
      try {
        let t = this._wallet;
        if (!t) throw new k.t();
        try {
          return await t.signAllTransactions(e);
        } catch (e) {
          throw new k.I(e?.message, e);
        }
      } catch (e) {
        throw (this.emit("error", e), e);
      }
    }
  }
  e.s(
    [
      "instantiateWalletConnectWalletAdapter",
      0,
      function (e) {
        return new hd({
          network: e,
          options: {
            relayUrl: "wss://relay.walletconnect.com",
            projectId: "7f7fa697ad2bb1eeb36edbbc13bd73d7",
            metadata: {
              name: "Pump",
              description:
                "Launch a coin that is instantly tradable without having to seed liquidity. Deploy a coin on Solana for under 2$ in one click.",
              url: "https://pump.fun",
              icons: ["https://pump.fun/_next/image?url=%2Flogo.png&w=64&q=75"],
            },
          },
        });
      },
    ],
    570776,
  );
};
