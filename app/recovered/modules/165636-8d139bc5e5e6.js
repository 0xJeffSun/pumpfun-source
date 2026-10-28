// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t, i;
  var s,
    r = e.i(753887),
    a = e.i(679877),
    n = e.i(710600),
    o = e.i(441631),
    c = e.i(687542),
    l = e.i(770749),
    h = e.i(839811),
    u = e.i(550483),
    d = e.i(243274),
    p = e.i(232232),
    g = e.i(149502),
    f = e.i(33898),
    m = e.i(12791),
    w = e.i(571232),
    y = e.i(971275),
    b = e.i(344048);
  e.i(547762);
  var v = e.i(266188),
    I = e.i(835230),
    E = e.i(913095),
    C = e.i(895886),
    S = e.i(208910);
  function A(e) {
    let [t, i] = e.split(":");
    return { namespace: t, reference: i };
  }
  function P(e, t) {
    return e.includes(":") ? [e] : t.chains || [];
  }
  let N = "react-native",
    _ = "node",
    x = "browser";
  function O() {
    return (
      "u" > typeof g.default &&
      "u" > typeof g.default.versions &&
      "u" > typeof g.default.versions.node
    );
  }
  function T() {
    return (
      !(0, m.getDocument)() &&
      !!(0, m.getNavigator)() &&
      "ReactNative" === navigator.product
    );
  }
  function k() {
    return !O() && !!(0, m.getNavigator)() && !!(0, m.getDocument)();
  }
  function R() {
    return T() ? N : O() ? _ : k() ? x : "unknown";
  }
  function U() {
    var t;
    try {
      return T() && "u" > typeof (null == e.g ? void 0 : e.g.Application)
        ? null == (t = e.g.Application)
          ? void 0
          : t.applicationId
        : void 0;
    } catch {
      return;
    }
  }
  function D() {
    return (
      (0, w.getWindowMetadata)() || {
        name: "",
        description: "",
        url: "",
        icons: [""],
      }
    );
  }
  function L(t, i, s) {
    var r;
    let a,
      n = (function () {
        if (R() === N && "u" > typeof (null == e.g ? void 0 : e.g.Platform)) {
          let { OS: t, Version: i } = e.g.Platform;
          return [t, i].join("-");
        }
        let t = (0, f.f)();
        if (null === t) return "unknown";
        let i = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
        return "browser" === t.type
          ? [i, t.name, t.version].join("-")
          : [i, t.version].join("-");
      })(),
      o =
        (a = R()) === x
          ? [
              a,
              (null == (r = (0, m.getLocation)()) ? void 0 : r.host) ||
                "unknown",
            ].join(":")
          : a;
    return [[t, i].join("-"), ["js", s].join("-"), n, o].join("/");
  }
  function j(e, t) {
    return e.filter((e) => t.includes(e)).length === e.length;
  }
  function $(e) {
    return Object.fromEntries(e.entries());
  }
  function M(e) {
    return new Map(Object.entries(e));
  }
  function q(e = u.FIVE_MINUTES, t) {
    let i,
      s,
      r,
      a,
      n = (0, u.toMiliseconds)(e || u.FIVE_MINUTES);
    return {
      resolve: (e) => {
        r && i && (clearTimeout(r), i(e), (a = Promise.resolve(e)));
      },
      reject: (e) => {
        r && s && (clearTimeout(r), s(e));
      },
      done: () =>
        new Promise((e, o) => {
          if (a) return e(a);
          ((r = setTimeout(() => {
            let e = Error(t);
            ((a = Promise.reject(e)), o(e));
          }, n)),
            (i = e),
            (s = o));
        }),
    };
  }
  function B(e, t, i) {
    return new Promise(async (s, r) => {
      let a = setTimeout(() => r(Error(i)), t);
      try {
        let t = await e;
        s(t);
      } catch (e) {
        r(e);
      }
      clearTimeout(a);
    });
  }
  function z(e, t) {
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
  function H(e) {
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
  function V(e, t) {
    return (0, u.fromMiliseconds)((t || Date.now()) + (0, u.toMiliseconds)(e));
  }
  function F(e) {
    return Date.now() >= (0, u.toMiliseconds)(e);
  }
  function K(e, t) {
    return `${e}${t ? `:${t}` : ""}`;
  }
  function W(e = [], t = []) {
    return [...new Set([...e, ...t])];
  }
  async function G({ id: t, topic: i, wcDeepLink: s }) {
    var a, n;
    try {
      if (!s) return;
      let o = "string" == typeof s ? JSON.parse(s) : s,
        c = o?.href;
      if ("string" != typeof c) return;
      let l = (function (e, t, i) {
          let s = `requestId=${t}&sessionTopic=${i}`;
          e.endsWith("/") && (e = e.slice(0, -1));
          let a = `${e}`;
          if (e.startsWith("https://t.me")) {
            let t = e.includes("?") ? "&startapp=" : "?startapp=";
            a = `${a}${t}${(function (e, t = !1) {
              let i = r.Buffer.from(e).toString("base64");
              return t ? i.replace(/[=]/g, "") : i;
            })(s, !0)}`;
          } else a = `${a}/wc?${s}`;
          return a;
        })(c, t, i),
        h = R();
      if (h === x) {
        let e;
        if (!(null != (a = (0, m.getDocument)()) && a.hasFocus()))
          return void console.warn(
            "Document does not have focus, skipping deeplink.",
          );
        ((n = l),
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
        h === N &&
          "u" > typeof (null == e.g ? void 0 : e.g.Linking) &&
          (await e.g.Linking.openURL(l));
    } catch (e) {
      console.error(e);
    }
  }
  async function Y(e, t) {
    let i = "";
    try {
      if (k() && (i = localStorage.getItem(t))) return i;
      i = await e.getItem(t);
    } catch (e) {
      console.error(e);
    }
    return i;
  }
  function J(e, t) {
    if (!e.includes(t)) return null;
    let i = e.split(/([&,?,=])/),
      s = i.indexOf(t);
    return i[s + 2];
  }
  function X() {
    return "u" > typeof crypto && null != crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
          let t = (16 * Math.random()) | 0;
          return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
  }
  function Q() {
    return "u" > typeof g.default && "true" === g.default.env.IS_VITEST;
  }
  function Z(e) {
    return r.Buffer.from(e, "base64").toString("utf-8");
  }
  function ee(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function et(e, ...t) {
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
  function ei(e) {
    if ("function" != typeof e || "function" != typeof e.create)
      throw Error("Hash should be wrapped by utils.wrapConstructor");
    (ee(e.outputLen), ee(e.blockLen));
  }
  function es(e, t = !0) {
    if (e.destroyed) throw Error("Hash instance has been destroyed");
    if (t && e.finished) throw Error("Hash#digest() has already been called");
  }
  function er(e, t) {
    et(e);
    let i = t.outputLen;
    if (e.length < i)
      throw Error("digestInto() expects output buffer of length at least " + i);
  }
  let ea = BigInt(0xffffffff),
    en = BigInt(32),
    eo =
      "object" == typeof globalThis && "crypto" in globalThis
        ? globalThis.crypto
        : void 0;
  function ec(e) {
    return new DataView(e.buffer, e.byteOffset, e.byteLength);
  }
  function el(e, t) {
    return (e << (32 - t)) | (e >>> t);
  }
  let eh = 68 === new Uint8Array(new Uint32Array([0x11223344]).buffer)[0];
  function eu(e) {
    for (let i = 0; i < e.length; i++) {
      var t;
      e[i] =
        (((t = e[i]) << 24) & 0xff000000) |
        ((t << 8) & 0xff0000) |
        ((t >>> 8) & 65280) |
        ((t >>> 24) & 255);
    }
  }
  function ed(e) {
    return (
      "string" == typeof e &&
        (e = (function (e) {
          if ("string" != typeof e)
            throw Error("utf8ToBytes expected string, got " + typeof e);
          return new Uint8Array(new TextEncoder().encode(e));
        })(e)),
      et(e),
      e
    );
  }
  class ep {
    clone() {
      return this._cloneInto();
    }
  }
  function eg(e) {
    let t = (t) => e().update(ed(t)).digest(),
      i = e();
    return (
      (t.outputLen = i.outputLen),
      (t.blockLen = i.blockLen),
      (t.create = () => e()),
      t
    );
  }
  function ef(e = 32) {
    if (eo && "function" == typeof eo.getRandomValues)
      return eo.getRandomValues(new Uint8Array(e));
    if (eo && "function" == typeof eo.randomBytes) return eo.randomBytes(e);
    throw Error("crypto.getRandomValues must be defined");
  }
  let em = [],
    ew = [],
    ey = [],
    eb = BigInt(0),
    ev = BigInt(1),
    eI = BigInt(2),
    eE = BigInt(7),
    eC = BigInt(256),
    eS = BigInt(113);
  for (let e = 0, t = ev, i = 1, s = 0; e < 24; e++) {
    (([i, s] = [s, (2 * i + 3 * s) % 5]),
      em.push(2 * (5 * s + i)),
      ew.push((((e + 1) * (e + 2)) / 2) % 64));
    let r = eb;
    for (let e = 0; e < 7; e++)
      (t = ((t << ev) ^ ((t >> eE) * eS)) % eC) & eI &&
        (r ^= ev << ((ev << BigInt(e)) - ev));
    ey.push(r);
  }
  let [eA, eP] = (function (e, t = !1) {
      let i = new Uint32Array(e.length),
        s = new Uint32Array(e.length);
      for (let r = 0; r < e.length; r++) {
        let { h: a, l: n } = (function (e, t = !1) {
          return t
            ? { h: Number(e & ea), l: Number((e >> en) & ea) }
            : { h: 0 | Number((e >> en) & ea), l: 0 | Number(e & ea) };
        })(e[r], t);
        [i[r], s[r]] = [a, n];
      }
      return [i, s];
    })(ey, !0),
    eN = (e, t, i) =>
      i > 32 ? (t << (i - 32)) | (e >>> (64 - i)) : (e << i) | (t >>> (32 - i)),
    e_ = (e, t, i) =>
      i > 32 ? (e << (i - 32)) | (t >>> (64 - i)) : (t << i) | (e >>> (32 - i));
  class ex extends ep {
    constructor(e, t, i, s = !1, r = 24) {
      var a;
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
        ee(i),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw Error("Sha3 supports only keccak-f1600 function");
      ((this.state = new Uint8Array(200)),
        (this.state32 = new Uint32Array(
          (a = this.state).buffer,
          a.byteOffset,
          Math.floor(a.byteLength / 4),
        )));
    }
    keccak() {
      (eh || eu(this.state32),
        (function (e, t = 24) {
          let i = new Uint32Array(10);
          for (let s = 24 - t; s < 24; s++) {
            for (let t = 0; t < 10; t++)
              i[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              let s = (t + 8) % 10,
                r = (t + 2) % 10,
                a = i[r],
                n = i[r + 1],
                o = eN(a, n, 1) ^ i[s],
                c = e_(a, n, 1) ^ i[s + 1];
              for (let i = 0; i < 50; i += 10)
                ((e[t + i] ^= o), (e[t + i + 1] ^= c));
            }
            let t = e[2],
              r = e[3];
            for (let i = 0; i < 24; i++) {
              let s = ew[i],
                a = eN(t, r, s),
                n = e_(t, r, s),
                o = em[i];
              ((t = e[o]), (r = e[o + 1]), (e[o] = a), (e[o + 1] = n));
            }
            for (let t = 0; t < 50; t += 10) {
              for (let s = 0; s < 10; s++) i[s] = e[t + s];
              for (let s = 0; s < 10; s++)
                e[t + s] ^= ~i[(s + 2) % 10] & i[(s + 4) % 10];
            }
            ((e[0] ^= eA[s]), (e[1] ^= eP[s]));
          }
          i.fill(0);
        })(this.state32, this.rounds),
        eh || eu(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(e) {
      es(this);
      let { blockLen: t, state: i } = this,
        s = (e = ed(e)).length;
      for (let r = 0; r < s; ) {
        let a = Math.min(t - this.pos, s - r);
        for (let t = 0; t < a; t++) i[this.pos++] ^= e[r++];
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
      (es(this, !1), et(e), this.finish());
      let t = this.state,
        { blockLen: i } = this;
      for (let s = 0, r = e.length; s < r; ) {
        this.posOut >= i && this.keccak();
        let a = Math.min(i - this.posOut, r - s);
        (e.set(t.subarray(this.posOut, this.posOut + a), s),
          (this.posOut += a),
          (s += a));
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return (ee(e), this.xofInto(new Uint8Array(e)));
    }
    digestInto(e) {
      if ((er(e, this), this.finished))
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
        enableXOF: a,
      } = this;
      return (
        e || (e = new ex(t, i, s, a, r)),
        e.state32.set(this.state32),
        (e.pos = this.pos),
        (e.posOut = this.posOut),
        (e.finished = this.finished),
        (e.rounds = r),
        (e.suffix = i),
        (e.outputLen = s),
        (e.enableXOF = a),
        (e.destroyed = this.destroyed),
        e
      );
    }
  }
  let eO = eg(() => new ex(136, 1, 32));
  function eT(e) {
    let t = `\x19Ethereum Signed Message:
${e.length}`,
      i = new TextEncoder().encode(t + e);
    return "0x" + r.Buffer.from(eO(i)).toString("hex");
  }
  async function ek(e, t, i, s, r, a) {
    switch (i.t) {
      case "eip191":
        return await eR(e, t, i.s);
      case "eip1271":
        return await eU(e, t, i.s, s, r, a);
      default:
        throw Error(
          `verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${i.t}`,
        );
    }
  }
  async function eR(e, t, i) {
    return (
      (await (0, y.f)({ hash: eT(t), signature: i })).toLowerCase() ===
      e.toLowerCase()
    );
  }
  async function eU(e, t, i, s, r, a) {
    let n = A(s);
    if (!n.namespace || !n.reference)
      throw Error(
        `isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${s}`,
      );
    try {
      let n = "0x1626ba7e",
        o = i.substring(2),
        c = eT(t).substring(2),
        l =
          n +
          c +
          "00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041" +
          o,
        h = await fetch(
          `${a || "https://rpc.walletconnect.org/v1"}/?chainId=${s}&projectId=${r}`,
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
        { result: u } = await h.json();
      return !!u && u.slice(0, n.length).toLowerCase() === n.toLowerCase();
    } catch (e) {
      return (console.error("isValidEip1271Signature: ", e), !1);
    }
  }
  var eD = Object.defineProperty,
    eL = Object.defineProperties,
    ej = Object.getOwnPropertyDescriptors,
    e$ = Object.getOwnPropertySymbols,
    eM = Object.prototype.hasOwnProperty,
    eq = Object.prototype.propertyIsEnumerable,
    eB = (e, t, i) =>
      t in e
        ? eD(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i);
  let ez = (e) => e?.split(":"),
    eH = (e) => {
      let t = e && ez(e);
      if (t) return t[2] + ":" + t[3];
    },
    eV = (e) => {
      let t = e && ez(e);
      if (t) return t.pop();
    };
  async function eF(e) {
    let { cacao: t, projectId: i } = e,
      { s: s, p: r } = t,
      a = eK(r, r.iss),
      n = eV(r.iss);
    return await ek(n, a, s, eH(r.iss), i);
  }
  let eK = (e, t) => {
    let i = `${e.domain} wants you to sign in with your Ethereum account:`,
      s = eV(t);
    if (!e.aud && !e.uri)
      throw Error("Either `aud` or `uri` is required to construct the message");
    let r = e.statement || void 0,
      a = `URI: ${e.aud || e.uri}`,
      n = `Version: ${e.version}`,
      o = `Chain ID: ${((e) => {
        let t = e && ez(e);
        if (t) return e.includes("did:pkh:") ? t[3] : t[1];
      })(t)}`,
      c = `Nonce: ${e.nonce}`,
      l = `Issued At: ${e.iat}`,
      h = e.exp ? `Expiration Time: ${e.exp}` : void 0,
      u = e.nbf ? `Not Before: ${e.nbf}` : void 0,
      d = e.requestId ? `Request ID: ${e.requestId}` : void 0,
      p = e.resources
        ? `Resources:${e.resources
            .map(
              (e) => `
- ${e}`,
            )
            .join("")}`
        : void 0,
      g = eQ(e.resources);
    return (
      g &&
        (r = (function (e = "", t) {
          eW(t);
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
            let a = {};
            i.forEach((e) => {
              (a[e.ability] || (a[e.ability] = []),
                a[e.ability].push(e.action));
            });
            let n = Object.keys(a).map(
              (t) => (r++, `(${r}) '${t}': '${a[t].join("', '")}' for '${e}'.`),
            );
            s.push(n.join(", ").replace(".,", "."));
          });
          let a = s.join(" "),
            n = `${i}${a}`;
          return `${e ? e + " " : ""}${n}`;
        })(r, eY(g))),
      [i, s, "", r, "", a, n, o, c, l, h, u, d, p].filter((e) => null != e)
        .join(`
`)
    );
  };
  function eW(e) {
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
  function eG(e) {
    return (
      eW(e),
      `urn:recap:${r.Buffer.from(JSON.stringify(e)).toString("base64").replace(/=/g, "")}`
    );
  }
  function eY(e) {
    var t;
    let i =
      ((t = e.replace("urn:recap:", "")),
      JSON.parse(r.Buffer.from(t, "base64").toString("utf-8")));
    return (eW(i), i);
  }
  function eJ(e) {
    var t;
    let i = eY(e);
    eW(i);
    let s = null == (t = i.att) ? void 0 : t.eip155;
    return s ? Object.keys(s).map((e) => e.split("/")[1]) : [];
  }
  function eX(e) {
    let t = eY(e);
    eW(t);
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
  function eQ(e) {
    if (!e) return;
    let t = e?.[e.length - 1];
    return t && t.includes("urn:recap:") ? t : void 0;
  }
  function eZ(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw Error("positive integer expected, got " + e);
  }
  function e0(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function e1(e, ...t) {
    if (!e0(e)) throw Error("Uint8Array expected");
    if (t.length > 0 && !t.includes(e.length))
      throw Error(
        "Uint8Array expected of length " + t + ", got length=" + e.length,
      );
  }
  function e2(e, t = !0) {
    if (e.destroyed) throw Error("Hash instance has been destroyed");
    if (t && e.finished) throw Error("Hash#digest() has already been called");
  }
  function e5(e) {
    if ("boolean" != typeof e) throw Error(`boolean expected, not ${e}`);
  }
  let e3 = (e) =>
    new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
  if (68 !== new Uint8Array(new Uint32Array([0x11223344]).buffer)[0])
    throw Error("Non little-endian hardware is not supported");
  function e8(e) {
    if ("string" == typeof e)
      e = (function (e) {
        if ("string" != typeof e) throw Error("string expected");
        return new Uint8Array(new TextEncoder().encode(e));
      })(e);
    else if (e0(e)) e = e9(e);
    else throw Error("Uint8Array expected, got " + typeof e);
    return e;
  }
  function e6(e, t, i = !0) {
    if (void 0 === t) return new Uint8Array(e);
    if (t.length !== e)
      throw Error(
        "invalid output length, expected " + e + ", got: " + t.length,
      );
    if (i && t.byteOffset % 4 != 0)
      throw Error("invalid output, must be aligned");
    return t;
  }
  function e4(e, t, i, s) {
    if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, s);
    let r = BigInt(32),
      a = BigInt(0xffffffff),
      n = Number((i >> r) & a),
      o = Number(i & a),
      c = 4 * !!s,
      l = 4 * !s;
    (e.setUint32(t + c, n, s), e.setUint32(t + l, o, s));
  }
  function e9(e) {
    return Uint8Array.from(e);
  }
  function e7(...e) {
    for (let t = 0; t < e.length; t++) e[t].fill(0);
  }
  let te = (e) => Uint8Array.from(e.split("").map((e) => e.charCodeAt(0))),
    tt = te("expand 16-byte k"),
    ti = te("expand 32-byte k"),
    ts = e3(tt),
    tr = e3(ti);
  function ta(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  function tn(e) {
    return e.byteOffset % 4 == 0;
  }
  let to = new Uint32Array(),
    tc = (e, t) => (255 & e[t++]) | ((255 & e[t++]) << 8);
  class tl {
    constructor(e) {
      ((this.blockLen = 16),
        (this.outputLen = 16),
        (this.buffer = new Uint8Array(16)),
        (this.r = new Uint16Array(10)),
        (this.h = new Uint16Array(10)),
        (this.pad = new Uint16Array(8)),
        (this.pos = 0),
        (this.finished = !1),
        e1((e = e8(e)), 32));
      let t = tc(e, 0),
        i = tc(e, 2),
        s = tc(e, 4),
        r = tc(e, 6),
        a = tc(e, 8),
        n = tc(e, 10),
        o = tc(e, 12),
        c = tc(e, 14);
      ((this.r[0] = 8191 & t),
        (this.r[1] = ((t >>> 13) | (i << 3)) & 8191),
        (this.r[2] = ((i >>> 10) | (s << 6)) & 7939),
        (this.r[3] = ((s >>> 7) | (r << 9)) & 8191),
        (this.r[4] = ((r >>> 4) | (a << 12)) & 255),
        (this.r[5] = (a >>> 1) & 8190),
        (this.r[6] = ((a >>> 14) | (n << 2)) & 8191),
        (this.r[7] = ((n >>> 11) | (o << 5)) & 8065),
        (this.r[8] = ((o >>> 8) | (c << 8)) & 8191),
        (this.r[9] = (c >>> 5) & 127));
      for (let t = 0; t < 8; t++) this.pad[t] = tc(e, 16 + 2 * t);
    }
    process(e, t, i = !1) {
      let { h: s, r: r } = this,
        a = r[0],
        n = r[1],
        o = r[2],
        c = r[3],
        l = r[4],
        h = r[5],
        u = r[6],
        d = r[7],
        p = r[8],
        g = r[9],
        f = tc(e, t + 0),
        m = tc(e, t + 2),
        w = tc(e, t + 4),
        y = tc(e, t + 6),
        b = tc(e, t + 8),
        v = tc(e, t + 10),
        I = tc(e, t + 12),
        E = tc(e, t + 14),
        C = s[0] + (8191 & f),
        S = s[1] + (((f >>> 13) | (m << 3)) & 8191),
        A = s[2] + (((m >>> 10) | (w << 6)) & 8191),
        P = s[3] + (((w >>> 7) | (y << 9)) & 8191),
        N = s[4] + (((y >>> 4) | (b << 12)) & 8191),
        _ = s[5] + ((b >>> 1) & 8191),
        x = s[6] + (((b >>> 14) | (v << 2)) & 8191),
        O = s[7] + (((v >>> 11) | (I << 5)) & 8191),
        T = s[8] + (((I >>> 8) | (E << 8)) & 8191),
        k = s[9] + ((E >>> 5) | (2048 * !i)),
        R = 0,
        U = 0 + C * a + 5 * g * S + 5 * p * A + 5 * d * P + 5 * u * N;
      ((R = U >>> 13),
        (U &= 8191),
        (U += 5 * h * _ + 5 * l * x + 5 * c * O + 5 * o * T + 5 * n * k),
        (R += U >>> 13),
        (U &= 8191));
      let D = R + C * n + S * a + 5 * g * A + 5 * p * P + 5 * d * N;
      ((R = D >>> 13),
        (D &= 8191),
        (D += 5 * u * _ + 5 * h * x + 5 * l * O + 5 * c * T + 5 * o * k),
        (R += D >>> 13),
        (D &= 8191));
      let L = R + C * o + S * n + A * a + 5 * g * P + 5 * p * N;
      ((R = L >>> 13),
        (L &= 8191),
        (L += 5 * d * _ + 5 * u * x + 5 * h * O + 5 * l * T + 5 * c * k),
        (R += L >>> 13),
        (L &= 8191));
      let j = R + C * c + S * o + A * n + P * a + 5 * g * N;
      ((R = j >>> 13),
        (j &= 8191),
        (j += 5 * p * _ + 5 * d * x + 5 * u * O + 5 * h * T + 5 * l * k),
        (R += j >>> 13),
        (j &= 8191));
      let $ = R + C * l + S * c + A * o + P * n + N * a;
      ((R = $ >>> 13),
        ($ &= 8191),
        ($ += 5 * g * _ + 5 * p * x + 5 * d * O + 5 * u * T + 5 * h * k),
        (R += $ >>> 13),
        ($ &= 8191));
      let M = R + C * h + S * l + A * c + P * o + N * n;
      ((R = M >>> 13),
        (M &= 8191),
        (M += _ * a + 5 * g * x + 5 * p * O + 5 * d * T + 5 * u * k),
        (R += M >>> 13),
        (M &= 8191));
      let q = R + C * u + S * h + A * l + P * c + N * o;
      ((R = q >>> 13),
        (q &= 8191),
        (q += _ * n + x * a + 5 * g * O + 5 * p * T + 5 * d * k),
        (R += q >>> 13),
        (q &= 8191));
      let B = R + C * d + S * u + A * h + P * l + N * c;
      ((R = B >>> 13),
        (B &= 8191),
        (B += _ * o + x * n + O * a + 5 * g * T + 5 * p * k),
        (R += B >>> 13),
        (B &= 8191));
      let z = R + C * p + S * d + A * u + P * h + N * l;
      ((R = z >>> 13),
        (z &= 8191),
        (z += _ * c + x * o + O * n + T * a + 5 * g * k),
        (R += z >>> 13),
        (z &= 8191));
      let H = R + C * g + S * p + A * d + P * u + N * h;
      ((R = H >>> 13),
        (H &= 8191),
        (H += _ * l + x * c + O * o + T * n + k * a),
        (R += H >>> 13),
        (H &= 8191),
        (U = 8191 & (R = ((R = ((R << 2) + R) | 0) + U) | 0)),
        (R >>>= 13),
        (D += R),
        (s[0] = U),
        (s[1] = D),
        (s[2] = L),
        (s[3] = j),
        (s[4] = $),
        (s[5] = M),
        (s[6] = q),
        (s[7] = B),
        (s[8] = z),
        (s[9] = H));
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
      let a = e[0] + t[0];
      e[0] = 65535 & a;
      for (let i = 1; i < 8; i++)
        ((a = (((e[i] + t[i]) | 0) + (a >>> 16)) | 0), (e[i] = 65535 & a));
      e7(i);
    }
    update(e) {
      e2(this);
      let { buffer: t, blockLen: i } = this,
        s = (e = e8(e)).length;
      for (let r = 0; r < s; ) {
        let a = Math.min(i - this.pos, s - r);
        if (a === i) {
          for (; i <= s - r; r += i) this.process(e, r);
          continue;
        }
        (t.set(e.subarray(r, r + a), this.pos),
          (this.pos += a),
          (r += a),
          this.pos === i && (this.process(t, 0, !1), (this.pos = 0)));
      }
      return this;
    }
    destroy() {
      e7(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(e) {
      (e2(this),
        (function (e, t) {
          e1(e);
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
  let th =
      ((s = (e) => new tl(e)),
      ((t = (e, t) => s(t).update(e8(e)).digest()).outputLen = (i = s(
        new Uint8Array(32),
      )).outputLen),
      (t.blockLen = i.blockLen),
      (t.create = (e) => s(e)),
      t),
    tu = (function (e, t) {
      let {
        allowShortKeys: i,
        extendNonceFn: s,
        counterLength: r,
        counterRight: a,
        rounds: n,
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
        eZ(r),
        eZ(n),
        e5(a),
        e5(i),
        (t, o, c, l, h = 0) => {
          (e1(t), e1(o), e1(c));
          let u = c.length;
          if (
            (void 0 === l && (l = new Uint8Array(u)),
            e1(l),
            eZ(h),
            h < 0 || h >= 0xffffffff)
          )
            throw Error("arx: counter overflow");
          if (l.length < u)
            throw Error(
              `arx: output (${l.length}) is shorter than data (${u})`,
            );
          let d = [],
            p = t.length,
            g,
            f;
          if (32 === p) (d.push((g = e9(t))), (f = tr));
          else if (16 === p && i)
            ((g = new Uint8Array(32)).set(t),
              g.set(t, 16),
              (f = ts),
              d.push(g));
          else throw Error(`arx: invalid 32-byte key, got length=${p}`);
          tn(o) || d.push((o = e9(o)));
          let m = e3(g);
          if (s) {
            if (24 !== o.length)
              throw Error("arx: extended nonce must be 24 bytes");
            (s(f, m, e3(o.subarray(0, 16)), m), (o = o.subarray(16)));
          }
          let w = 16 - r;
          if (w !== o.length)
            throw Error(`arx: nonce must be ${w} or 16 bytes`);
          if (12 !== w) {
            let e = new Uint8Array(12);
            (e.set(o, a ? 0 : 12 - o.length), (o = e), d.push(o));
          }
          return (
            (function (e, t, i, s, r, a, n, o) {
              let c = r.length,
                l = new Uint8Array(64),
                h = e3(l),
                u = tn(r) && tn(a),
                d = u ? e3(r) : to,
                p = u ? e3(a) : to;
              for (let g = 0; g < c; n++) {
                if ((e(t, i, s, h, n, o), n >= 0xffffffff))
                  throw Error("arx: counter overflow");
                let f = Math.min(64, c - g);
                if (u && 64 === f) {
                  let e = g / 4;
                  if (g % 4 != 0) throw Error("arx: invalid block position");
                  for (let t = 0, i; t < 16; t++) p[(i = e + t)] = d[i] ^ h[t];
                  g += 64;
                  continue;
                }
                for (let e = 0, t; e < f; e++) a[(t = g + e)] = r[t] ^ l[e];
                g += f;
              }
            })(e, f, m, e3(o), c, l, h, n),
            e7(...d),
            l
          );
        }
      );
    })(
      function (e, t, i, s, r, a = 20) {
        let n = e[0],
          o = e[1],
          c = e[2],
          l = e[3],
          h = t[0],
          u = t[1],
          d = t[2],
          p = t[3],
          g = t[4],
          f = t[5],
          m = t[6],
          w = t[7],
          y = i[0],
          b = i[1],
          v = i[2],
          I = n,
          E = o,
          C = c,
          S = l,
          A = h,
          P = u,
          N = d,
          _ = p,
          x = g,
          O = f,
          T = m,
          k = w,
          R = r,
          U = y,
          D = b,
          L = v;
        for (let e = 0; e < a; e += 2)
          ((x = (x + (R = ta(R ^ (I = (I + A) | 0), 16))) | 0),
            (I = (I + (A = ta(A ^ x, 12))) | 0),
            (x = (x + (R = ta(R ^ I, 8))) | 0),
            (A = ta(A ^ x, 7)),
            (O = (O + (U = ta(U ^ (E = (E + P) | 0), 16))) | 0),
            (E = (E + (P = ta(P ^ O, 12))) | 0),
            (O = (O + (U = ta(U ^ E, 8))) | 0),
            (P = ta(P ^ O, 7)),
            (T = (T + (D = ta(D ^ (C = (C + N) | 0), 16))) | 0),
            (C = (C + (N = ta(N ^ T, 12))) | 0),
            (T = (T + (D = ta(D ^ C, 8))) | 0),
            (N = ta(N ^ T, 7)),
            (k = (k + (L = ta(L ^ (S = (S + _) | 0), 16))) | 0),
            (S = (S + (_ = ta(_ ^ k, 12))) | 0),
            (k = (k + (L = ta(L ^ S, 8))) | 0),
            (_ = ta(_ ^ k, 7)),
            (T = (T + (L = ta(L ^ (I = (I + P) | 0), 16))) | 0),
            (I = (I + (P = ta(P ^ T, 12))) | 0),
            (T = (T + (L = ta(L ^ I, 8))) | 0),
            (P = ta(P ^ T, 7)),
            (k = (k + (R = ta(R ^ (E = (E + N) | 0), 16))) | 0),
            (E = (E + (N = ta(N ^ k, 12))) | 0),
            (k = (k + (R = ta(R ^ E, 8))) | 0),
            (N = ta(N ^ k, 7)),
            (x = (x + (U = ta(U ^ (C = (C + _) | 0), 16))) | 0),
            (C = (C + (_ = ta(_ ^ x, 12))) | 0),
            (x = (x + (U = ta(U ^ C, 8))) | 0),
            (_ = ta(_ ^ x, 7)),
            (O = (O + (D = ta(D ^ (S = (S + A) | 0), 16))) | 0),
            (S = (S + (A = ta(A ^ O, 12))) | 0),
            (O = (O + (D = ta(D ^ S, 8))) | 0),
            (A = ta(A ^ O, 7)));
        let j = 0;
        ((s[j++] = (n + I) | 0),
          (s[j++] = (o + E) | 0),
          (s[j++] = (c + C) | 0),
          (s[j++] = (l + S) | 0),
          (s[j++] = (h + A) | 0),
          (s[j++] = (u + P) | 0),
          (s[j++] = (d + N) | 0),
          (s[j++] = (p + _) | 0),
          (s[j++] = (g + x) | 0),
          (s[j++] = (f + O) | 0),
          (s[j++] = (m + T) | 0),
          (s[j++] = (w + k) | 0),
          (s[j++] = (r + R) | 0),
          (s[j++] = (y + U) | 0),
          (s[j++] = (b + D) | 0),
          (s[j++] = (v + L) | 0));
      },
      { counterRight: !1, counterLength: 4, allowShortKeys: !1 },
    ),
    td = new Uint8Array(16),
    tp = (e, t) => {
      e.update(t);
      let i = t.length % 16;
      i && e.update(td.subarray(i));
    },
    tg = new Uint8Array(32);
  function tf(e, t, i, s, r) {
    let a = e(t, i, tg),
      n = th.create(a);
    (r && tp(n, r), tp(n, s));
    let o = new Uint8Array(16),
      c = new DataView(o.buffer, o.byteOffset, o.byteLength);
    (e4(c, 0, BigInt(r ? r.length : 0), !0),
      e4(c, 8, BigInt(s.length), !0),
      n.update(o));
    let l = n.digest();
    return (e7(a, o), l);
  }
  let tm = ((e, t) => {
    function i(s, ...r) {
      if ((e1(s), void 0 !== e.nonceLength)) {
        let t = r[0];
        if (!t) throw Error("nonce / iv required");
        e.varSizeNonce ? e1(t) : e1(t, e.nonceLength);
      }
      let a = e.tagLength;
      a && void 0 !== r[1] && e1(r[1]);
      let n = t(s, ...r),
        o = (e, t) => {
          if (void 0 !== t) {
            if (2 !== e) throw Error("cipher output not supported");
            e1(t);
          }
        },
        c = !1;
      return {
        encrypt(e, t) {
          if (c) throw Error("cannot encrypt() twice with same key + nonce");
          return ((c = !0), e1(e), o(n.encrypt.length, t), n.encrypt(e, t));
        },
        decrypt(e, t) {
          if ((e1(e), a && e.length < a))
            throw Error(
              "invalid ciphertext length: smaller than tagLength=" + a,
            );
          return (o(n.decrypt.length, t), n.decrypt(e, t));
        },
      };
    }
    return (Object.assign(i, e), i);
  })({ blockSize: 64, nonceLength: 12, tagLength: 16 }, (e, t, i) => ({
    encrypt(s, r) {
      let a = s.length;
      (r = e6(a + 16, r, !1)).set(s);
      let n = r.subarray(0, -16);
      tu(e, t, n, n, 1);
      let o = tf(tu, e, t, n, i);
      return (r.set(o, a), e7(o), r);
    },
    decrypt(s, r) {
      r = e6(s.length - 16, r, !1);
      let a = s.subarray(0, -16),
        n = s.subarray(-16),
        o = tf(tu, e, t, a, i);
      if (
        !(function (e, t) {
          if (e.length !== t.length) return !1;
          let i = 0;
          for (let s = 0; s < e.length; s++) i |= e[s] ^ t[s];
          return 0 === i;
        })(n, o)
      )
        throw Error("invalid tag");
      return (r.set(s.subarray(0, -16)), tu(e, t, r, r, 1), e7(o), r);
    },
  }));
  class tw extends ep {
    constructor(e, t) {
      (super(), (this.finished = !1), (this.destroyed = !1), ei(e));
      let i = ed(t);
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
      return (es(this), this.iHash.update(e), this);
    }
    digestInto(e) {
      (es(this),
        et(e, this.outputLen),
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
        blockLen: a,
        outputLen: n,
      } = this;
      return (
        (e.finished = s),
        (e.destroyed = r),
        (e.blockLen = a),
        (e.outputLen = n),
        (e.oHash = t._cloneInto(e.oHash)),
        (e.iHash = i._cloneInto(e.iHash)),
        e
      );
    }
    destroy() {
      ((this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy());
    }
  }
  let ty = (e, t, i) => new tw(e, t).update(i).digest();
  ty.create = (e, t) => new tw(e, t);
  let tb = new Uint8Array([0]),
    tv = new Uint8Array();
  class tI extends ep {
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
        (this.view = ec(this.buffer)));
    }
    update(e) {
      es(this);
      let { view: t, buffer: i, blockLen: s } = this,
        r = (e = ed(e)).length;
      for (let a = 0; a < r; ) {
        let n = Math.min(s - this.pos, r - a);
        if (n === s) {
          let t = ec(e);
          for (; s <= r - a; a += s) this.process(t, a);
          continue;
        }
        (i.set(e.subarray(a, a + n), this.pos),
          (this.pos += n),
          (a += n),
          this.pos === s && (this.process(t, 0), (this.pos = 0)));
      }
      return ((this.length += e.length), this.roundClean(), this);
    }
    digestInto(e) {
      (es(this), er(e, this), (this.finished = !0));
      let { buffer: t, view: i, blockLen: s, isLE: r } = this,
        { pos: a } = this;
      ((t[a++] = 128),
        this.buffer.subarray(a).fill(0),
        this.padOffset > s - a && (this.process(i, 0), (a = 0)));
      for (let e = a; e < s; e++) t[e] = 0;
      ((function (e, t, i, s) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, s);
        let r = BigInt(32),
          a = BigInt(0xffffffff),
          n = Number((i >> r) & a),
          o = Number(i & a),
          c = 4 * !!s,
          l = 4 * !s;
        (e.setUint32(t + c, n, s), e.setUint32(t + l, o, s));
      })(i, s - 8, BigInt(8 * this.length), r),
        this.process(i, 0));
      let n = ec(e),
        o = this.outputLen;
      if (o % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      let c = o / 4,
        l = this.get();
      if (c > l.length) throw Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) n.setUint32(4 * e, l[e], r);
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
        destroyed: a,
        pos: n,
      } = this;
      return (
        (e.length = s),
        (e.pos = n),
        (e.finished = r),
        (e.destroyed = a),
        s % t && e.buffer.set(i),
        e
      );
    }
  }
  let tE = new Uint32Array([
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
    tC = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    tS = new Uint32Array(64);
  class tA extends tI {
    constructor() {
      (super(64, 32, 8, !1),
        (this.A = 0 | tC[0]),
        (this.B = 0 | tC[1]),
        (this.C = 0 | tC[2]),
        (this.D = 0 | tC[3]),
        (this.E = 0 | tC[4]),
        (this.F = 0 | tC[5]),
        (this.G = 0 | tC[6]),
        (this.H = 0 | tC[7]));
    }
    get() {
      let { A: e, B: t, C: i, D: s, E: r, F: a, G: n, H: o } = this;
      return [e, t, i, s, r, a, n, o];
    }
    set(e, t, i, s, r, a, n, o) {
      ((this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | i),
        (this.D = 0 | s),
        (this.E = 0 | r),
        (this.F = 0 | a),
        (this.G = 0 | n),
        (this.H = 0 | o));
    }
    process(e, t) {
      for (let i = 0; i < 16; i++, t += 4) tS[i] = e.getUint32(t, !1);
      for (let e = 16; e < 64; e++) {
        let t = tS[e - 15],
          i = tS[e - 2],
          s = el(t, 7) ^ el(t, 18) ^ (t >>> 3),
          r = el(i, 17) ^ el(i, 19) ^ (i >>> 10);
        tS[e] = (r + tS[e - 7] + s + tS[e - 16]) | 0;
      }
      let { A: i, B: s, C: r, D: a, E: n, F: o, G: c, H: l } = this;
      for (let e = 0; e < 64; e++) {
        var h, u, d, p;
        let t =
            (l +
              (el(n, 6) ^ el(n, 11) ^ el(n, 25)) +
              (((h = n) & o) ^ (~h & c)) +
              tE[e] +
              tS[e]) |
            0,
          g =
            ((el(i, 2) ^ el(i, 13) ^ el(i, 22)) +
              (((u = i) & (d = s)) ^ (u & (p = r)) ^ (d & p))) |
            0;
        ((l = c),
          (c = o),
          (o = n),
          (n = (a + t) | 0),
          (a = r),
          (r = s),
          (s = i),
          (i = (t + g) | 0));
      }
      ((i = (i + this.A) | 0),
        (s = (s + this.B) | 0),
        (r = (r + this.C) | 0),
        (a = (a + this.D) | 0),
        (n = (n + this.E) | 0),
        (o = (o + this.F) | 0),
        (c = (c + this.G) | 0),
        (l = (l + this.H) | 0),
        this.set(i, s, r, a, n, o, c, l));
    }
    roundClean() {
      tS.fill(0);
    }
    destroy() {
      (this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0));
    }
  }
  let tP = eg(() => new tA()),
    tN = BigInt(0);
  function t_(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function tx(e) {
    if (!t_(e)) throw Error("Uint8Array expected");
  }
  let tO = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function tT(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function tk(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    let t = e.length,
      i = t / 2;
    if (t % 2)
      throw Error("hex string expected, got unpadded hex of length " + t);
    let s = new Uint8Array(i);
    for (let t = 0, r = 0; t < i; t++, r += 2) {
      let i = tT(e.charCodeAt(r)),
        a = tT(e.charCodeAt(r + 1));
      if (void 0 === i || void 0 === a)
        throw Error(
          'hex string expected, got non-hex character "' +
            (e[r] + e[r + 1]) +
            '" at index ' +
            r,
        );
      s[t] = 16 * i + a;
    }
    return s;
  }
  function tR(e) {
    return (
      tx(e),
      (function (e) {
        if ("string" != typeof e)
          throw Error("hex string expected, got " + typeof e);
        return "" === e ? tN : BigInt("0x" + e);
      })(
        (function (e) {
          tx(e);
          let t = "";
          for (let i = 0; i < e.length; i++) t += tO[e[i]];
          return t;
        })(Uint8Array.from(e).reverse()),
      )
    );
  }
  function tU(e, t, i) {
    let s;
    if ("string" == typeof t)
      try {
        s = tk(t);
      } catch (t) {
        throw Error(e + " must be hex string or Uint8Array, cause: " + t);
      }
    else if (t_(t)) s = Uint8Array.from(t);
    else throw Error(e + " must be hex string or Uint8Array");
    let r = s.length;
    if ("number" == typeof i && r !== i)
      throw Error(e + " of length " + i + " expected, got " + r);
    return s;
  }
  let tD = (e) => "bigint" == typeof e && tN <= e;
  function tL(e, t, i, s) {
    if (!(tD(t) && tD(i) && tD(s)) || !(i <= t) || !(t < s))
      throw Error(
        "expected valid " + e + ": " + i + " <= n < " + s + ", got " + t,
      );
  }
  let tj = {
      bigint: (e) => "bigint" == typeof e,
      function: (e) => "function" == typeof e,
      boolean: (e) => "boolean" == typeof e,
      string: (e) => "string" == typeof e,
      stringOrUint8Array: (e) => "string" == typeof e || t_(e),
      isSafeInteger: (e) => Number.isSafeInteger(e),
      array: (e) => Array.isArray(e),
      field: (e, t) => t.Fp.isValid(e),
      hash: (e) => "function" == typeof e && Number.isSafeInteger(e.outputLen),
    },
    t$ = BigInt(0),
    tM = BigInt(1);
  function tq(e, t) {
    let i = e % t;
    return i >= t$ ? i : t + i;
  }
  function tB(e, t, i) {
    let s = e;
    for (; t-- > t$; ) ((s *= s), (s %= i));
    return s;
  }
  (BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8));
  let tz = BigInt(0),
    tH = BigInt(1),
    tV = BigInt(
      "57896044618658097711785492504343953926634992332820282019728792003956564819949",
    );
  BigInt(0);
  let tF = BigInt(1),
    tK = BigInt(2),
    tW = BigInt(3),
    tG = BigInt(5);
  BigInt(8);
  let tY = (function (e) {
      let t =
          ((function (e, t, i = {}) {
            let s = (t, i, s) => {
              let r = tj[i];
              if ("function" != typeof r)
                throw Error("invalid validator function");
              let a = e[t];
              if (!(s && void 0 === a) && !r(a, e))
                throw Error(
                  "param " +
                    String(t) +
                    " is invalid. Expected " +
                    i +
                    ", got " +
                    a,
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
        s = (e) => tq(e, i),
        r = t.montgomeryBits,
        a = Math.ceil(r / 8),
        n = t.nByteLength,
        o = t.adjustScalarBytes || ((e) => e),
        c =
          t.powPminus2 ||
          ((e) =>
            (function (e, t, i) {
              if (t < t$)
                throw Error("invalid exponent, negatives unsupported");
              if (i <= t$) throw Error("invalid modulus");
              if (i === tM) return t$;
              let s = tM;
              for (; t > t$; )
                (t & tM && (s = (s * e) % i), (e = (e * e) % i), (t >>= tM));
              return s;
            })(e, i - BigInt(2), i));
      function l(e, t, i) {
        let r = s(e * (t - i));
        return [(t = s(t - r)), (i = s(i + r))];
      }
      let h = (t.a - BigInt(2)) / BigInt(4);
      function u(e) {
        var t;
        return ((t = s(e)), tk(t.toString(16).padStart(2 * a, "0")).reverse());
      }
      function d(e, t) {
        let d,
          p = (function (e, t) {
            (tL("u", e, tz, i), tL("scalar", t, tz, i));
            let a = tH,
              n = tz,
              o = e,
              u = tH,
              d = tz,
              p;
            for (let i = BigInt(r - 1); i >= tz; i--) {
              let r = (t >> i) & tH;
              ((d ^= r),
                (a = (p = l(d, a, o))[0]),
                (o = p[1]),
                (n = (p = l(d, n, u))[0]),
                (u = p[1]),
                (d = r));
              let c = a + n,
                g = s(c * c),
                f = a - n,
                m = s(f * f),
                w = g - m,
                y = o + u,
                b = s((o - u) * c),
                v = s(y * f),
                I = b + v,
                E = b - v;
              ((o = s(I * I)),
                (u = s(e * s(E * E))),
                (a = s(g * m)),
                (n = s(w * (g + s(h * w)))));
            }
            return (
              (a = (p = l(d, a, o))[0]),
              (o = p[1]),
              (n = (p = l(d, n, u))[0]),
              (u = p[1]),
              s(a * c(n))
            );
          })(
            ((d = tU("u coordinate", t, a)), 32 === n && (d[31] &= 127), tR(d)),
            (function (e) {
              let t = tU("scalar", e),
                i = t.length;
              if (i !== a && i !== n)
                throw Error(
                  "invalid scalar, expected " +
                    ("" + a + " or ") +
                    n +
                    " bytes, got " +
                    i,
                );
              return tR(o(t));
            })(e),
          );
        if (p === tz) throw Error("invalid private or public key received");
        return u(p);
      }
      let p = u(t.Gu);
      function g(e) {
        return d(e, p);
      }
      return {
        scalarMult: d,
        scalarMultBase: g,
        getSharedSecret: (e, t) => d(e, t),
        getPublicKey: (e) => g(e),
        utils: { randomPrivateKey: () => t.randomBytes(t.nByteLength) },
        GuBytes: p,
      };
    })({
      P: tV,
      a: BigInt(486662),
      montgomeryBits: 255,
      nByteLength: 32,
      Gu: BigInt(9),
      powPminus2: (e) => {
        let t,
          i,
          s,
          r,
          a,
          n,
          o,
          c,
          l,
          h,
          u,
          d,
          p,
          g,
          { pow_p_5_8: f, b2: m } =
            ((t = BigInt(10)),
            (i = BigInt(20)),
            (s = BigInt(40)),
            (r = BigInt(80)),
            (n = (tB((a = (((e * e) % tV) * e) % tV), tK, tV) * a) % tV),
            (o = (tB(n, tF, tV) * e) % tV),
            (c = (tB(o, tG, tV) * o) % tV),
            (l = (tB(c, t, tV) * c) % tV),
            (h = (tB(l, i, tV) * l) % tV),
            (u = (tB(h, s, tV) * h) % tV),
            (d = (tB(u, r, tV) * u) % tV),
            (p = (tB(d, r, tV) * u) % tV),
            (g = (tB(p, t, tV) * c) % tV),
            { pow_p_5_8: (tB(g, tK, tV) * e) % tV, b2: a });
        return tq(tB(f, tW, tV) * m, tV);
      },
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      randomBytes: ef,
    }),
    tJ = "base10",
    tX = "base16",
    tQ = "base64pad",
    tZ = "base64url",
    t0 = "utf8";
  function t1() {
    let e = ef(32);
    return (0, v.f)(e, tX);
  }
  function t2(e) {
    let t = tP((0, I.f)(e, tX));
    return (0, v.f)(t, tX);
  }
  function t5(e) {
    let t = tP((0, I.f)(e, t0));
    return (0, v.f)(t, tX);
  }
  function t3(e) {
    return (0, I.f)(`${e}`, tJ);
  }
  function t8(e) {
    return Number((0, v.f)(e, tJ));
  }
  function t6(e) {
    let { encoding: t = tQ } = e;
    if (2 === t8(e.type)) return (0, v.f)((0, E.f)([e.type, e.sealed]), t);
    if (1 === t8(e.type)) {
      if (typeof e.senderPublicKey > "u")
        throw Error("Missing sender public key for type 1 envelope");
      return (0, v.f)((0, E.f)([e.type, e.senderPublicKey, e.iv, e.sealed]), t);
    }
    return (0, v.f)((0, E.f)([e.type, e.iv, e.sealed]), t);
  }
  function t4(e) {
    let { encoded: t, encoding: i = tQ } = e,
      s = (0, I.f)(t, i),
      r = s.slice(0, 1);
    if (1 === t8(r)) {
      let e = s.slice(1, 33),
        t = s.slice(33, 45);
      return { type: r, sealed: s.slice(45), iv: t, senderPublicKey: e };
    }
    if (2 === t8(r)) return { type: r, sealed: s.slice(1), iv: ef(12) };
    let a = s.slice(1, 13);
    return { type: r, sealed: s.slice(13), iv: a };
  }
  function t9(e) {
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
  function t7(e) {
    return (
      1 === e.type &&
      "string" == typeof e.senderPublicKey &&
      "string" == typeof e.receiverPublicKey
    );
  }
  function ie(e) {
    return e?.relay || { protocol: "irn" };
  }
  function it(e) {
    let t = S.f[e];
    if (typeof t > "u") throw Error(`Relay Protocol not supported: ${e}`);
    return t;
  }
  function ii(e) {
    var t;
    if (!e.includes("wc:")) {
      let t = Z(e);
      null != t && t.includes("wc:") && (e = t);
    }
    let i = (e = (e = e.includes("wc://")
        ? e.replace("wc://", "")
        : e).includes("wc:")
        ? e.replace("wc:", "")
        : e).indexOf(":"),
      s = -1 !== e.indexOf("?") ? e.indexOf("?") : void 0,
      r = e.substring(0, i),
      a = e.substring(i + 1, s).split("@"),
      n = new URLSearchParams("u" > typeof s ? e.substring(s) : ""),
      o = {};
    n.forEach((e, t) => {
      o[t] = e;
    });
    let c = "string" == typeof o.methods ? o.methods.split(",") : void 0;
    return {
      protocol: r,
      topic: (t = a[0]).startsWith("//") ? t.substring(2) : t,
      version: parseInt(a[1], 10),
      symKey: o.symKey,
      relay: (function (e, t = "-") {
        let i = {},
          s = "relay" + t;
        return (
          Object.keys(e).forEach((t) => {
            if (t.startsWith(s)) {
              let r = t.replace(s, ""),
                a = e[t];
              i[r] = a;
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
  function is(e) {
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
  function ir(e, t, i) {
    return `${e}?wc_ev=${i}&topic=${t}`;
  }
  function ia(e) {
    let t = [];
    return (
      e.forEach((e) => {
        let [i, s] = e.split(":");
        t.push(`${i}:${s}`);
      }),
      t
    );
  }
  function io(e) {
    return e.includes(":");
  }
  function ic(e) {
    return io(e) ? e.split(":")[0] : e;
  }
  function il(e, t) {
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
      (i.methods ? (i.methods = W(i.methods, e)) : (i.methods = e),
        (i.events = ["chainChanged", "accountsChanged"]));
    return r;
  }
  (Object.prototype.hasOwnProperty, Object.prototype.propertyIsEnumerable);
  let ih = {
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
    iu = {
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
  function id(e, t) {
    let { message: i, code: s } = iu[e];
    return { message: t ? `${i} ${t}` : i, code: s };
  }
  function ip(e, t) {
    let { message: i, code: s } = ih[e];
    return { message: t ? `${i} ${t}` : i, code: s };
  }
  function ig(e, t) {
    return !!Array.isArray(e) && (!("u" > typeof t) || !e.length || e.every(t));
  }
  function im(e) {
    return (
      Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length
    );
  }
  function iw(e) {
    return typeof e > "u";
  }
  function iy(e, t) {
    return !!(t && iw(e)) || ("string" == typeof e && !!e.trim().length);
  }
  function ib(e, t) {
    return !!(t && iw(e)) || ("number" == typeof e && !isNaN(e));
  }
  function iv(e) {
    return !!(iy(e, !1) && e.includes(":")) && 2 === e.split(":").length;
  }
  function iI(e) {
    let t = !0;
    return (ig(e) ? e.length && (t = e.every((e) => iy(e, !1))) : (t = !1), t);
  }
  function iE(e, t) {
    let i = null;
    return (
      Object.values(e).forEach((e) => {
        var s;
        let r;
        if (i) return;
        let a =
          ((s = `${t}, namespace`),
          (r = null),
          iI(e?.methods)
            ? iI(e?.events) ||
              (r = ip(
                "UNSUPPORTED_EVENTS",
                `${s}, events should be an array of strings or empty array for no events`,
              ))
            : (r = ip(
                "UNSUPPORTED_METHODS",
                `${s}, methods should be an array of strings or empty array for no methods`,
              )),
          r);
        a && (i = a);
      }),
      i
    );
  }
  function iC(e, t) {
    let i = null;
    if (e && im(e)) {
      let s,
        r = iE(e, t);
      r && (i = r);
      let a =
        ((s = null),
        Object.values(e).forEach((e) => {
          var i, r;
          let a;
          if (s) return;
          let n =
            ((i = e?.accounts),
            (r = `${t} namespace`),
            (a = null),
            ig(i)
              ? i.forEach((e) => {
                  a ||
                    (function (e) {
                      if (iy(e, !1) && e.includes(":")) {
                        let t = e.split(":");
                        if (3 === t.length) {
                          let e = t[0] + ":" + t[1];
                          return !!t[2] && iv(e);
                        }
                      }
                      return !1;
                    })(e) ||
                    (a = ip(
                      "UNSUPPORTED_ACCOUNTS",
                      `${r}, account ${e} should be a string and conform to "namespace:chainId:address" format`,
                    ));
                })
              : (a = ip(
                  "UNSUPPORTED_ACCOUNTS",
                  `${r}, accounts should be an array of strings conforming to "namespace:chainId:address" format`,
                )),
            a);
          n && (s = n);
        }),
        s);
      a && (i = a);
    } else
      i = id(
        "MISSING_OR_INVALID",
        `${t}, namespaces should be an object with data`,
      );
    return i;
  }
  function iS(e) {
    return iy(e.protocol, !0);
  }
  function iA(e) {
    return "u" > typeof e;
  }
  function iP(e, t) {
    let i;
    return !(
      !iv(t) ||
      !((i = []),
      Object.values(e).forEach((e) => {
        i.push(...ia(e.accounts));
      }),
      i).includes(t)
    );
  }
  function iN(e, t, i) {
    var s, r;
    let a,
      n,
      o = null,
      c =
        ((a = {}),
        Object.keys((s = e)).forEach((e) => {
          var t;
          e.includes(":")
            ? (a[e] = s[e])
            : null == (t = s[e].chains) ||
              t.forEach((t) => {
                a[t] = { methods: s[e].methods, events: s[e].events };
              });
        }),
        a),
      l =
        ((n = {}),
        Object.keys((r = t)).forEach((e) => {
          if (e.includes(":")) n[e] = r[e];
          else {
            let t = ia(r[e].accounts);
            t?.forEach((t) => {
              n[t] = {
                accounts: r[e].accounts.filter((e) => e.includes(`${t}:`)),
                methods: r[e].methods,
                events: r[e].events,
              };
            });
          }
        }),
        n),
      h = Object.keys(c),
      u = Object.keys(l),
      d = i_(Object.keys(e)),
      p = i_(Object.keys(t)),
      g = d.filter((e) => !p.includes(e));
    return (
      g.length &&
        (o = id(
          "NON_CONFORMING_NAMESPACES",
          `${i} namespaces keys don't satisfy requiredNamespaces.
      Required: ${g.toString()}
      Received: ${Object.keys(t).toString()}`,
        )),
      j(h, u) ||
        (o = id(
          "NON_CONFORMING_NAMESPACES",
          `${i} namespaces chains don't satisfy required namespaces.
      Required: ${h.toString()}
      Approved: ${u.toString()}`,
        )),
      Object.keys(t).forEach((e) => {
        if (!e.includes(":") || o) return;
        let s = ia(t[e].accounts);
        s.includes(e) ||
          (o = id(
            "NON_CONFORMING_NAMESPACES",
            `${i} namespaces accounts don't satisfy namespace accounts for ${e}
        Required: ${e}
        Approved: ${s.toString()}`,
          ));
      }),
      h.forEach((e) => {
        o ||
          (j(c[e].methods, l[e].methods)
            ? j(c[e].events, l[e].events) ||
              (o = id(
                "NON_CONFORMING_NAMESPACES",
                `${i} namespaces events don't satisfy namespace events for ${e}`,
              ))
            : (o = id(
                "NON_CONFORMING_NAMESPACES",
                `${i} namespaces methods don't satisfy namespace methods for ${e}`,
              )));
      }),
      o
    );
  }
  function i_(e) {
    return [...new Set(e.map((e) => (e.includes(":") ? e.split(":")[0] : e)))];
  }
  function ix() {
    let e = R();
    return new Promise((t) => {
      switch (e) {
        case x:
          t(k() && navigator?.onLine);
          break;
        case N:
          t(iO());
          break;
        default:
          t(!0);
      }
    });
  }
  async function iO() {
    if (T() && null != e.g && e.g.NetInfo) {
      let t = await (null == e.g ? void 0 : e.g.NetInfo.fetch());
      return t?.isConnected;
    }
    return !0;
  }
  let iT = {};
  class ik {
    static get(e) {
      return iT[e];
    }
    static set(e, t) {
      iT[e] = t;
    }
    static delete(e) {
      delete iT[e];
    }
  }
  var iR = e.i(409482);
  e.i(660075);
  var iU = e.i(669941),
    iD = e.i(139434),
    iL = e.i(327026);
  let ij = "core",
    i$ = `wc@2:${ij}:`,
    iM = { database: ":memory:" },
    iq = "client_ed25519_seed",
    iB = u.ONE_DAY,
    iz = u.SIX_HOURS,
    iH = "wss://relay.walletconnect.org",
    iV = "relayer_message",
    iF = "relayer_message_ack",
    iK = "relayer_connection_stalled",
    iW = "relayer_publish",
    iG = "payload",
    iY = "connect",
    iJ = "disconnect",
    iX = "error",
    iQ = "2.19.1",
    iZ = "link_mode",
    i0 = "relay",
    i1 = "inbound",
    i2 = "WALLETCONNECT_LINK_MODE_APPS",
    i5 = "subscription_created",
    i3 = "subscription_deleted",
    i8 =
      (u.THIRTY_DAYS,
      u.FIVE_SECONDS,
      u.THIRTY_DAYS,
      {
        wc_pairingDelete: {
          req: { ttl: u.ONE_DAY, prompt: !1, tag: 1e3 },
          res: { ttl: u.ONE_DAY, prompt: !1, tag: 1001 },
        },
        wc_pairingPing: {
          req: { ttl: u.THIRTY_SECONDS, prompt: !1, tag: 1002 },
          res: { ttl: u.THIRTY_SECONDS, prompt: !1, tag: 1003 },
        },
        unregistered_method: {
          req: { ttl: u.ONE_DAY, prompt: !1, tag: 0 },
          res: { ttl: u.ONE_DAY, prompt: !1, tag: 0 },
        },
      }),
    i6 = "pairing_create",
    i4 = "pairing_delete",
    i9 = "history_created",
    i7 = "history_updated",
    se = "history_deleted",
    st = "expirer_created",
    si = "expirer_deleted",
    ss = "expirer_expired",
    sr = (u.ONE_DAY, "https://verify.walletconnect.org"),
    sa = `${sr}/v3`,
    sn = ["https://verify.walletconnect.com", sr],
    so = "malformed_pairing_uri",
    sc = "session_approve_started";
  var sl = function (e, t) {
    if (e.length >= 255) throw TypeError("Alphabet too long");
    for (var i = new Uint8Array(256), s = 0; s < i.length; s++) i[s] = 255;
    for (var r = 0; r < e.length; r++) {
      var a = e.charAt(r),
        n = a.charCodeAt(0);
      if (255 !== i[n]) throw TypeError(a + " is ambiguous");
      i[n] = r;
    }
    var o = e.length,
      c = e.charAt(0),
      l = Math.log(o) / Math.log(256),
      h = Math.log(256) / Math.log(o);
    function u(e) {
      if ("string" != typeof e) throw TypeError("Expected String");
      if (0 === e.length) return new Uint8Array();
      var t = 0;
      if (" " !== e[0]) {
        for (var s = 0, r = 0; e[t] === c; ) (s++, t++);
        for (
          var a = ((e.length - t) * l + 1) >>> 0, n = new Uint8Array(a);
          e[t];

        ) {
          var h = i[e.charCodeAt(t)];
          if (255 === h) return;
          for (var u = 0, d = a - 1; (0 !== h || u < r) && -1 !== d; d--, u++)
            ((h += (o * n[d]) >>> 0),
              (n[d] = h % 256 >>> 0),
              (h = (h / 256) >>> 0));
          if (0 !== h) throw Error("Non-zero carry");
          ((r = u), t++);
        }
        if (" " !== e[t]) {
          for (var p = a - r; p !== a && 0 === n[p]; ) p++;
          for (var g = new Uint8Array(s + (a - p)), f = s; p !== a; )
            g[f++] = n[p++];
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
        for (var i = 0, s = 0, r = 0, a = t.length; r !== a && 0 === t[r]; )
          (r++, i++);
        for (
          var n = ((a - r) * h + 1) >>> 0, l = new Uint8Array(n);
          r !== a;

        ) {
          for (
            var u = t[r], d = 0, p = n - 1;
            (0 !== u || d < s) && -1 !== p;
            p--, d++
          )
            ((u += (256 * l[p]) >>> 0),
              (l[p] = u % o >>> 0),
              (u = (u / o) >>> 0));
          if (0 !== u) throw Error("Non-zero carry");
          ((s = d), r++);
        }
        for (var g = n - s; g !== n && 0 === l[g]; ) g++;
        for (var f = c.repeat(i); g < n; ++g) f += e.charAt(l[g]);
        return f;
      },
      decodeUnsafe: u,
      decode: function (e) {
        var i = u(e);
        if (i) return i;
        throw Error(`Non-${t} character`);
      },
    };
  };
  let sh = (e) => {
    if (e instanceof Uint8Array && "Uint8Array" === e.constructor.name)
      return e;
    if (e instanceof ArrayBuffer) return new Uint8Array(e);
    if (ArrayBuffer.isView(e))
      return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    throw Error("Unknown type, must be binary type");
  };
  class su {
    constructor(e, t, i) {
      ((this.name = e), (this.prefix = t), (this.baseEncode = i));
    }
    encode(e) {
      if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
      throw Error("Unknown type, must be binary type");
    }
  }
  class sd {
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
      return sg(this, e);
    }
  }
  class sp {
    constructor(e) {
      this.decoders = e;
    }
    or(e) {
      return sg(this, e);
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
  let sg = (e, t) =>
    new sp({
      ...(e.decoders || { [e.prefix]: e }),
      ...(t.decoders || { [t.prefix]: t }),
    });
  class sf {
    constructor(e, t, i, s) {
      ((this.name = e),
        (this.prefix = t),
        (this.baseEncode = i),
        (this.baseDecode = s),
        (this.encoder = new su(e, t, i)),
        (this.decoder = new sd(e, t, s)));
    }
    encode(e) {
      return this.encoder.encode(e);
    }
    decode(e) {
      return this.decoder.decode(e);
    }
  }
  let sm = ({ name: e, prefix: t, encode: i, decode: s }) => new sf(e, t, i, s),
    sw = ({ prefix: e, name: t, alphabet: i }) => {
      let { encode: s, decode: r } = sl(i, t);
      return sm({ prefix: e, name: t, encode: s, decode: (e) => sh(r(e)) });
    },
    sy = ({ name: e, prefix: t, bitsPerChar: i, alphabet: s }) =>
      sm({
        prefix: t,
        name: e,
        encode: (e) =>
          ((e, t, i) => {
            let s = "=" === t[t.length - 1],
              r = (1 << i) - 1,
              a = "",
              n = 0,
              o = 0;
            for (let s = 0; s < e.length; ++s)
              for (o = (o << 8) | e[s], n += 8; n > i; )
                ((n -= i), (a += t[r & (o >> n)]));
            if ((n && (a += t[r & (o << (i - n))]), s))
              for (; (a.length * i) & 7; ) a += "=";
            return a;
          })(e, s, i),
        decode: (t) =>
          ((e, t, i, s) => {
            let r = {};
            for (let e = 0; e < t.length; ++e) r[t[e]] = e;
            let a = e.length;
            for (; "=" === e[a - 1]; ) --a;
            let n = new Uint8Array(((a * i) / 8) | 0),
              o = 0,
              c = 0,
              l = 0;
            for (let t = 0; t < a; ++t) {
              let a = r[e[t]];
              if (void 0 === a) throw SyntaxError(`Non-${s} character`);
              ((c = (c << i) | a),
                (o += i) >= 8 && ((o -= 8), (n[l++] = 255 & (c >> o))));
            }
            if (o >= i || 255 & (c << (8 - o)))
              throw SyntaxError("Unexpected end of data");
            return n;
          })(t, s, i, e),
      });
  var sb = Object.freeze({
      __proto__: null,
      identity: sm({
        prefix: "\0",
        name: "identity",
        encode: (e) => new TextDecoder().decode(e),
        decode: (e) => new TextEncoder().encode(e),
      }),
    }),
    sv = Object.freeze({
      __proto__: null,
      base2: sy({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 }),
    }),
    sI = Object.freeze({
      __proto__: null,
      base8: sy({
        prefix: "7",
        name: "base8",
        alphabet: "01234567",
        bitsPerChar: 3,
      }),
    }),
    sE = Object.freeze({
      __proto__: null,
      base10: sw({ prefix: "9", name: "base10", alphabet: "0123456789" }),
    }),
    sC = Object.freeze({
      __proto__: null,
      base16: sy({
        prefix: "f",
        name: "base16",
        alphabet: "0123456789abcdef",
        bitsPerChar: 4,
      }),
      base16upper: sy({
        prefix: "F",
        name: "base16upper",
        alphabet: "0123456789ABCDEF",
        bitsPerChar: 4,
      }),
    }),
    sS = Object.freeze({
      __proto__: null,
      base32: sy({
        prefix: "b",
        name: "base32",
        alphabet: "abcdefghijklmnopqrstuvwxyz234567",
        bitsPerChar: 5,
      }),
      base32upper: sy({
        prefix: "B",
        name: "base32upper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        bitsPerChar: 5,
      }),
      base32pad: sy({
        prefix: "c",
        name: "base32pad",
        alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
        bitsPerChar: 5,
      }),
      base32padupper: sy({
        prefix: "C",
        name: "base32padupper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
        bitsPerChar: 5,
      }),
      base32hex: sy({
        prefix: "v",
        name: "base32hex",
        alphabet: "0123456789abcdefghijklmnopqrstuv",
        bitsPerChar: 5,
      }),
      base32hexupper: sy({
        prefix: "V",
        name: "base32hexupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        bitsPerChar: 5,
      }),
      base32hexpad: sy({
        prefix: "t",
        name: "base32hexpad",
        alphabet: "0123456789abcdefghijklmnopqrstuv=",
        bitsPerChar: 5,
      }),
      base32hexpadupper: sy({
        prefix: "T",
        name: "base32hexpadupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
        bitsPerChar: 5,
      }),
      base32z: sy({
        prefix: "h",
        name: "base32z",
        alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
        bitsPerChar: 5,
      }),
    }),
    sA = Object.freeze({
      __proto__: null,
      base36: sw({
        prefix: "k",
        name: "base36",
        alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
      }),
      base36upper: sw({
        prefix: "K",
        name: "base36upper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      }),
    }),
    sP = Object.freeze({
      __proto__: null,
      base58btc: sw({
        name: "base58btc",
        prefix: "z",
        alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      }),
      base58flickr: sw({
        name: "base58flickr",
        prefix: "Z",
        alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
      }),
    }),
    sN = Object.freeze({
      __proto__: null,
      base64: sy({
        prefix: "m",
        name: "base64",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        bitsPerChar: 6,
      }),
      base64pad: sy({
        prefix: "M",
        name: "base64pad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        bitsPerChar: 6,
      }),
      base64url: sy({
        prefix: "u",
        name: "base64url",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
        bitsPerChar: 6,
      }),
      base64urlpad: sy({
        prefix: "U",
        name: "base64urlpad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        bitsPerChar: 6,
      }),
    });
  let s_ = Array.from(
      "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂",
    ),
    sx = s_.reduce((e, t, i) => ((e[i] = t), e), []),
    sO = s_.reduce((e, t, i) => ((e[t.codePointAt(0)] = i), e), []);
  var sT = Object.freeze({
    __proto__: null,
    base256emoji: sm({
      prefix: "🚀",
      name: "base256emoji",
      encode: function (e) {
        return e.reduce((e, t) => (e += sx[t]), "");
      },
      decode: function (e) {
        let t = [];
        for (let i of e) {
          let e = sO[i.codePointAt(0)];
          if (void 0 === e) throw Error(`Non-base256emoji character: ${i}`);
          t.push(e);
        }
        return new Uint8Array(t);
      },
    }),
  });
  function sk(e, t, i) {
    ((t = t || []), (i = i || 0));
    for (var s = i; e >= 0x80000000; ) ((t[i++] = (255 & e) | 128), (e /= 128));
    for (; -128 & e; ) ((t[i++] = (255 & e) | 128), (e >>>= 7));
    return ((t[i] = 0 | e), (sk.bytes = i - s + 1), t);
  }
  var sR = function (e) {
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
  let sU = (e, t, i = 0) => (sk(e, t, i), t),
    sD = (e, t) => {
      let i = t.byteLength,
        s = sR(e),
        r = s + sR(i),
        a = new Uint8Array(r + i);
      return (sU(e, a, 0), sU(i, a, s), a.set(t, r), new sL(e, i, t, a));
    };
  class sL {
    constructor(e, t, i, s) {
      ((this.code = e), (this.size = t), (this.digest = i), (this.bytes = s));
    }
  }
  let sj = ({ name: e, code: t, encode: i }) => new s$(e, t, i);
  class s$ {
    constructor(e, t, i) {
      ((this.name = e), (this.code = t), (this.encode = i));
    }
    digest(e) {
      if (e instanceof Uint8Array) {
        let t = this.encode(e);
        return t instanceof Uint8Array
          ? sD(this.code, t)
          : t.then((e) => sD(this.code, e));
      }
      throw Error("Unknown type, must be binary type");
    }
  }
  let sM = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t));
  var sq = Object.freeze({
      __proto__: null,
      sha256: sj({ name: "sha2-256", code: 18, encode: sM("SHA-256") }),
      sha512: sj({ name: "sha2-512", code: 19, encode: sM("SHA-512") }),
    }),
    sB = Object.freeze({
      __proto__: null,
      identity: {
        code: 0,
        name: "identity",
        encode: sh,
        digest: (e) => sD(0, sh(e)),
      },
    });
  (new TextEncoder(), new TextDecoder());
  let sz = {
    ...sb,
    ...sv,
    ...sI,
    ...sE,
    ...sC,
    ...sS,
    ...sA,
    ...sP,
    ...sN,
    ...sT,
  };
  function sH(e, t, i, s) {
    return {
      name: e,
      prefix: t,
      encoder: { name: e, prefix: t, encode: i },
      decoder: { decode: s },
    };
  }
  ({ ...sq, ...sB });
  let sV = sH(
      "utf8",
      "u",
      (e) => "u" + new TextDecoder("utf8").decode(e),
      (e) => new TextEncoder().encode(e.substring(1)),
    ),
    sF = sH(
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
    sK = {
      utf8: sV,
      "utf-8": sV,
      hex: sz.base16,
      latin1: sF,
      ascii: sF,
      binary: sF,
      ...sz,
    };
  var sW = Object.defineProperty,
    sG = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? sW(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class sY {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        sG(this, "keychain", new Map()),
        sG(this, "name", "keychain"),
        sG(this, "version", "0.3"),
        sG(this, "initialized", !1),
        sG(this, "storagePrefix", i$),
        sG(this, "init", async () => {
          if (!this.initialized) {
            let e = await this.getKeyChain();
            ("u" > typeof e && (this.keychain = e), (this.initialized = !0));
          }
        }),
        sG(this, "has", (e) => (this.isInitialized(), this.keychain.has(e))),
        sG(this, "set", async (e, t) => {
          (this.isInitialized(), this.keychain.set(e, t), await this.persist());
        }),
        sG(this, "get", (e) => {
          this.isInitialized();
          let t = this.keychain.get(e);
          if (typeof t > "u") {
            let { message: t } = id("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw Error(t);
          }
          return t;
        }),
        sG(this, "del", async (e) => {
          (this.isInitialized(), this.keychain.delete(e), await this.persist());
        }),
        (this.core = e),
        (this.logger = (0, c.v)(t, this.name)));
    }
    get context() {
      return (0, c.u)(this.logger);
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
      await this.core.storage.setItem(this.storageKey, $(e));
    }
    async getKeyChain() {
      let e = await this.core.storage.getItem(this.storageKey);
      return "u" > typeof e ? M(e) : void 0;
    }
    async persist() {
      await this.setKeyChain(this.keychain);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var sJ = Object.defineProperty,
    sX = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? sJ(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class sQ {
    constructor(e, t, i) {
      ((this.core = e),
        (this.logger = t),
        sX(this, "name", "crypto"),
        sX(this, "keychain"),
        sX(this, "randomSessionIdentifier", t1()),
        sX(this, "initialized", !1),
        sX(this, "init", async () => {
          this.initialized ||
            (await this.keychain.init(), (this.initialized = !0));
        }),
        sX(
          this,
          "hasKeys",
          (e) => (this.isInitialized(), this.keychain.has(e)),
        ),
        sX(this, "getClientId", async () => {
          this.isInitialized();
          let e = await this.getClientSeed(),
            t = p.G(e);
          return p.j(t.publicKey);
        }),
        sX(this, "generateKeyPair", () => {
          let e, t;
          this.isInitialized();
          let i =
            ((e = tY.utils.randomPrivateKey()),
            (t = tY.getPublicKey(e)),
            { privateKey: (0, v.f)(e, tX), publicKey: (0, v.f)(t, tX) });
          return this.setPrivateKey(i.publicKey, i.privateKey);
        }),
        sX(this, "signJWT", async (e) => {
          this.isInitialized();
          let t = await this.getClientSeed(),
            i = p.G(t),
            s = this.randomSessionIdentifier;
          return await p.X(s, e, iB, i);
        }),
        sX(this, "generateSharedKey", (e, t, i) => {
          var s, r, a;
          let n, o;
          this.isInitialized();
          let c =
            ((s = this.getPrivateKey(e)),
            (n = tY.getSharedSecret((0, I.f)(s, tX), (0, I.f)(t, tX))),
            (r = void 0),
            (o = (function (e, t, i, s = 32) {
              if ((ei(e), ee(s), s > 255 * e.outputLen))
                throw Error("Length should be <= 255*HashLen");
              let r = Math.ceil(s / e.outputLen);
              void 0 === i && (i = tv);
              let a = new Uint8Array(r * e.outputLen),
                n = ty.create(e, t),
                o = n._cloneInto(),
                c = new Uint8Array(n.outputLen);
              for (let t = 0; t < r; t++)
                ((tb[0] = t + 1),
                  o
                    .update(0 === t ? tv : c)
                    .update(i)
                    .update(tb)
                    .digestInto(c),
                  a.set(c, e.outputLen * t),
                  n._cloneInto(o));
              return (
                n.destroy(),
                o.destroy(),
                c.fill(0),
                tb.fill(0),
                a.slice(0, s)
              );
            })(
              tP,
              ((a = void 0),
              ei(tP),
              void 0 === a && (a = new Uint8Array(tP.outputLen)),
              ty(tP, ed(a), ed(n))),
              r,
              32,
            )),
            (0, v.f)(o, tX));
          return this.setSymKey(c, i);
        }),
        sX(this, "setSymKey", async (e, t) => {
          this.isInitialized();
          let i = t || t2(e);
          return (await this.keychain.set(i, e), i);
        }),
        sX(this, "deleteKeyPair", async (e) => {
          (this.isInitialized(), await this.keychain.del(e));
        }),
        sX(this, "deleteSymKey", async (e) => {
          (this.isInitialized(), await this.keychain.del(e));
        }),
        sX(this, "encode", async (e, t, i) => {
          this.isInitialized();
          let s = t9(i),
            r = (0, d.I)(t);
          if (2 === s.type) {
            var a;
            let e, t;
            return (
              (a = i?.encoding),
              (e = t3(2)),
              (t = ef(12)),
              t6({ type: e, sealed: (0, I.f)(r, t0), iv: t, encoding: a })
            );
          }
          if (t7(s)) {
            let t = s.senderPublicKey,
              i = s.receiverPublicKey;
            e = await this.generateSharedKey(t, i);
          }
          let n = this.getSymKey(e),
            { type: o, senderPublicKey: c } = s;
          return (function (e) {
            let t = t3("u" > typeof e.type ? e.type : 0);
            if (1 === t8(t) && typeof e.senderPublicKey > "u")
              throw Error("Missing sender public key for type 1 envelope");
            let i =
                "u" > typeof e.senderPublicKey
                  ? (0, I.f)(e.senderPublicKey, tX)
                  : void 0,
              s = "u" > typeof e.iv ? (0, I.f)(e.iv, tX) : ef(12);
            return t6({
              type: t,
              sealed: tm((0, I.f)(e.symKey, tX), s).encrypt(
                (0, I.f)(e.message, t0),
              ),
              iv: s,
              senderPublicKey: i,
              encoding: e.encoding,
            });
          })({
            type: o,
            symKey: n,
            message: r,
            senderPublicKey: c,
            encoding: i?.encoding,
          });
        }),
        sX(this, "decode", async (e, t, i) => {
          let s;
          this.isInitialized();
          let r = t9({
            type: t8((s = t4({ encoded: t, encoding: i?.encoding })).type),
            senderPublicKey:
              "u" > typeof s.senderPublicKey
                ? (0, v.f)(s.senderPublicKey, tX)
                : void 0,
            receiverPublicKey: i?.receiverPublicKey,
          });
          if (2 === r.type) {
            let e = (function (e, t) {
              let { sealed: i } = t4({ encoded: e, encoding: t });
              return (0, v.f)(i, t0);
            })(t, i?.encoding);
            return (0, d.U)(e);
          }
          if (t7(r)) {
            let t = r.receiverPublicKey,
              i = r.senderPublicKey;
            e = await this.generateSharedKey(t, i);
          }
          try {
            let s = this.getSymKey(e),
              r = (function (e) {
                let t = (0, I.f)(e.symKey, tX),
                  { sealed: i, iv: s } = t4(e),
                  r = tm(t, s).decrypt(i);
                if (null === r) throw Error("Failed to decrypt");
                return (0, v.f)(r, t0);
              })({ symKey: s, encoded: t, encoding: i?.encoding });
            return (0, d.U)(r);
          } catch (t) {
            (this.logger.error(
              `Failed to decode message from topic: '${e}', clientId: '${await this.getClientId()}'`,
            ),
              this.logger.error(t));
          }
        }),
        sX(this, "getPayloadType", (e, t = tQ) =>
          t8(t4({ encoded: e, encoding: t }).type),
        ),
        sX(this, "getPayloadSenderPublicKey", (e, t = tQ) => {
          let i = t4({ encoded: e, encoding: t });
          return i.senderPublicKey ? (0, v.f)(i.senderPublicKey, tX) : void 0;
        }),
        (this.core = e),
        (this.logger = (0, c.v)(t, this.name)),
        (this.keychain = i || new sY(this.core, this.logger)));
    }
    get context() {
      return (0, c.u)(this.logger);
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
        e = this.keychain.get(iq);
      } catch {
        ((e = t1()), await this.keychain.set(iq, e));
      }
      return (function (e, t = "utf8") {
        let i = sK[t];
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
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var sZ = Object.defineProperty,
    s0 = Object.defineProperties,
    s1 = Object.getOwnPropertyDescriptors,
    s2 = Object.getOwnPropertySymbols,
    s5 = Object.prototype.hasOwnProperty,
    s3 = Object.prototype.propertyIsEnumerable,
    s8 = (e, t, i) =>
      t in e
        ? sZ(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    s6 = (e, t, i) => s8(e, "symbol" != typeof t ? t + "" : t, i);
  class s4 extends h.a {
    constructor(e, t) {
      (super(e, t),
        (this.logger = e),
        (this.core = t),
        s6(this, "messages", new Map()),
        s6(this, "messagesWithoutClientAck", new Map()),
        s6(this, "name", "messages"),
        s6(this, "version", "0.3"),
        s6(this, "initialized", !1),
        s6(this, "storagePrefix", i$),
        s6(this, "init", async () => {
          if (!this.initialized) {
            this.logger.trace("Initialized");
            try {
              let e = await this.getRelayerMessages();
              "u" > typeof e && (this.messages = e);
              let t = await this.getRelayerMessagesWithoutClientAck();
              ("u" > typeof t && (this.messagesWithoutClientAck = t),
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
        s6(this, "set", async (e, t, i) => {
          this.isInitialized();
          let s = t5(t),
            r = this.messages.get(e);
          if ((typeof r > "u" && (r = {}), "u" > typeof r[s])) return s;
          if (((r[s] = t), this.messages.set(e, r), i === i1)) {
            let i = this.messagesWithoutClientAck.get(e) || {};
            this.messagesWithoutClientAck.set(
              e,
              s0(
                ((e, t) => {
                  for (var i in t || (t = {})) s5.call(t, i) && s8(e, i, t[i]);
                  if (s2) for (var i of s2(t)) s3.call(t, i) && s8(e, i, t[i]);
                  return e;
                })({}, i),
                s1({ [s]: t }),
              ),
            );
          }
          return (await this.persist(), s);
        }),
        s6(this, "get", (e) => {
          this.isInitialized();
          let t = this.messages.get(e);
          return (typeof t > "u" && (t = {}), t);
        }),
        s6(this, "getWithoutAck", (e) => {
          this.isInitialized();
          let t = {};
          for (let i of e) {
            let e = this.messagesWithoutClientAck.get(i) || {};
            t[i] = Object.values(e);
          }
          return t;
        }),
        s6(
          this,
          "has",
          (e, t) => (this.isInitialized(), "u" > typeof this.get(e)[t5(t)]),
        ),
        s6(this, "ack", async (e, t) => {
          this.isInitialized();
          let i = this.messagesWithoutClientAck.get(e);
          if (typeof i > "u") return;
          let s = t5(t);
          (delete i[s],
            0 === Object.keys(i).length
              ? this.messagesWithoutClientAck.delete(e)
              : this.messagesWithoutClientAck.set(e, i),
            await this.persist());
        }),
        s6(this, "del", async (e) => {
          (this.isInitialized(),
            this.messages.delete(e),
            this.messagesWithoutClientAck.delete(e),
            await this.persist());
        }),
        (this.logger = (0, c.v)(e, this.name)),
        (this.core = t));
    }
    get context() {
      return (0, c.u)(this.logger);
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
    get storageKeyWithoutClientAck() {
      return (
        this.storagePrefix +
        this.version +
        this.core.customStoragePrefix +
        "//" +
        this.name +
        "_withoutClientAck"
      );
    }
    async setRelayerMessages(e) {
      await this.core.storage.setItem(this.storageKey, $(e));
    }
    async setRelayerMessagesWithoutClientAck(e) {
      await this.core.storage.setItem(this.storageKeyWithoutClientAck, $(e));
    }
    async getRelayerMessages() {
      let e = await this.core.storage.getItem(this.storageKey);
      return "u" > typeof e ? M(e) : void 0;
    }
    async getRelayerMessagesWithoutClientAck() {
      let e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
      return "u" > typeof e ? M(e) : void 0;
    }
    async persist() {
      (await this.setRelayerMessages(this.messages),
        await this.setRelayerMessagesWithoutClientAck(
          this.messagesWithoutClientAck,
        ));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var s9 = Object.defineProperty,
    s7 = Object.defineProperties,
    re = Object.getOwnPropertyDescriptors,
    rt = Object.getOwnPropertySymbols,
    ri = Object.prototype.hasOwnProperty,
    rs = Object.prototype.propertyIsEnumerable,
    rr = (e, t, i) =>
      t in e
        ? s9(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    ra = (e, t) => {
      for (var i in t || (t = {})) ri.call(t, i) && rr(e, i, t[i]);
      if (rt) for (var i of rt(t)) rs.call(t, i) && rr(e, i, t[i]);
      return e;
    },
    rn = (e, t, i) => rr(e, "symbol" != typeof t ? t + "" : t, i);
  class ro extends h.G {
    constructor(e, t) {
      (super(e, t),
        (this.relayer = e),
        (this.logger = t),
        rn(this, "events", new a.EventEmitter()),
        rn(this, "name", "publisher"),
        rn(this, "queue", new Map()),
        rn(this, "publishTimeout", (0, u.toMiliseconds)(u.ONE_MINUTE)),
        rn(
          this,
          "initialPublishTimeout",
          (0, u.toMiliseconds)(15 * u.ONE_SECOND),
        ),
        rn(this, "needsTransportRestart", !1),
        rn(this, "publish", async (e, t, i) => {
          var s;
          (this.logger.debug("Publishing Payload"),
            this.logger.trace({
              type: "method",
              method: "publish",
              params: { topic: e, message: t, opts: i },
            }));
          let r = i?.ttl || iz,
            a = ie(i),
            n = i?.prompt || !1,
            o = i?.tag || 0,
            c = i?.id || (0, iU.f)().toString(),
            l = {
              topic: e,
              message: t,
              opts: {
                ttl: r,
                relay: a,
                prompt: n,
                tag: o,
                id: c,
                attestation: i?.attestation,
                tvf: i?.tvf,
              },
            },
            h = `Failed to publish payload, please try again. id:${c} tag:${o}`;
          try {
            let s = new Promise(async (s) => {
              let a = ({ id: e }) => {
                l.opts.id === e &&
                  (this.removeRequestFromQueue(e),
                  this.relayer.events.removeListener(iW, a),
                  s(l));
              };
              this.relayer.events.on(iW, a);
              let h = B(
                new Promise((s, a) => {
                  this.rpcPublish({
                    topic: e,
                    message: t,
                    ttl: r,
                    prompt: n,
                    tag: o,
                    id: c,
                    attestation: i?.attestation,
                    tvf: i?.tvf,
                  })
                    .then(s)
                    .catch((e) => {
                      (this.logger.warn(e, e?.message), a(e));
                    });
                }),
                this.initialPublishTimeout,
                `Failed initial publish, retrying.... id:${c} tag:${o}`,
              );
              try {
                (await h, this.events.removeListener(iW, a));
              } catch (e) {
                (this.queue.set(c, s7(ra({}, l), re({ attempt: 1 }))),
                  this.logger.warn(e, e?.message));
              }
            });
            (this.logger.trace({
              type: "method",
              method: "publish",
              params: { id: c, topic: e, message: t, opts: i },
            }),
              await B(s, this.publishTimeout, h));
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
        rn(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        rn(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        rn(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        rn(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.relayer = e),
        (this.logger = (0, c.v)(t, this.name)),
        this.registerEventListeners());
    }
    get context() {
      return (0, c.u)(this.logger);
    }
    async rpcPublish(e) {
      var t, i, s, r;
      let {
          topic: a,
          message: n,
          ttl: o = iz,
          prompt: c,
          tag: l,
          id: h,
          attestation: u,
          tvf: d,
        } = e,
        p = {
          method: it(ie().protocol).publish,
          params: ra(
            { topic: a, message: n, ttl: o, prompt: c, tag: l, attestation: u },
            d,
          ),
          id: h,
        };
      (iw(null == (t = p.params) ? void 0 : t.prompt) &&
        (null == (i = p.params) || delete i.prompt),
        iw(null == (s = p.params) ? void 0 : s.tag) &&
          (null == (r = p.params) || delete r.tag),
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "message",
          direction: "outgoing",
          request: p,
        }));
      let g = await this.relayer.request(p);
      return (
        this.relayer.events.emit(iW, e),
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
        this.queue.set(t, s7(ra({}, e), re({ attempt: i })));
        let { topic: s, message: r, opts: a, attestation: n } = e;
        (this.logger.warn(
          {},
          `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${i}`,
        ),
          await this.rpcPublish(
            s7(
              ra({}, e),
              re({
                topic: s,
                message: r,
                ttl: a.ttl,
                prompt: a.prompt,
                tag: a.tag,
                id: a.id,
                attestation: n,
                tvf: a.tvf,
              }),
            ),
          ),
          this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`));
      });
    }
    registerEventListeners() {
      (this.relayer.core.heartbeat.on(n.W.pulse, () => {
        if (this.needsTransportRestart) {
          ((this.needsTransportRestart = !1), this.relayer.events.emit(iK));
          return;
        }
        this.checkQueue();
      }),
        this.relayer.on(iF, (e) => {
          this.removeRequestFromQueue(e.id.toString());
        }));
    }
  }
  var rc = Object.defineProperty,
    rl = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rc(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rh {
    constructor() {
      (rl(this, "map", new Map()),
        rl(this, "set", (e, t) => {
          let i = this.get(e);
          this.exists(e, t) || this.map.set(e, [...i, t]);
        }),
        rl(this, "get", (e) => this.map.get(e) || []),
        rl(this, "exists", (e, t) => this.get(e).includes(t)),
        rl(this, "delete", (e, t) => {
          if (typeof t > "u") return void this.map.delete(e);
          if (!this.map.has(e)) return;
          let i = this.get(e);
          if (!this.exists(e, t)) return;
          let s = i.filter((e) => e !== t);
          s.length ? this.map.set(e, s) : this.map.delete(e);
        }),
        rl(this, "clear", () => {
          this.map.clear();
        }));
    }
    get topics() {
      return Array.from(this.map.keys());
    }
  }
  var ru = Object.defineProperty,
    rd = Object.defineProperties,
    rp = Object.getOwnPropertyDescriptors,
    rg = Object.getOwnPropertySymbols,
    rf = Object.prototype.hasOwnProperty,
    rm = Object.prototype.propertyIsEnumerable,
    rw = (e, t, i) =>
      t in e
        ? ru(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    ry = (e, t) => {
      for (var i in t || (t = {})) rf.call(t, i) && rw(e, i, t[i]);
      if (rg) for (var i of rg(t)) rm.call(t, i) && rw(e, i, t[i]);
      return e;
    },
    rb = (e, t, i) => rw(e, "symbol" != typeof t ? t + "" : t, i);
  class rv extends h.B {
    constructor(e, t) {
      (super(e, t),
        (this.relayer = e),
        (this.logger = t),
        rb(this, "subscriptions", new Map()),
        rb(this, "topicMap", new rh()),
        rb(this, "events", new a.EventEmitter()),
        rb(this, "name", "subscription"),
        rb(this, "version", "0.3"),
        rb(this, "pending", new Map()),
        rb(this, "cached", []),
        rb(this, "initialized", !1),
        rb(this, "storagePrefix", i$),
        rb(this, "subscribeTimeout", (0, u.toMiliseconds)(u.ONE_MINUTE)),
        rb(
          this,
          "initialSubscribeTimeout",
          (0, u.toMiliseconds)(15 * u.ONE_SECOND),
        ),
        rb(this, "clientId"),
        rb(this, "batchSubscribeTopicsLimit", 500),
        rb(this, "init", async () => {
          (this.initialized ||
            (this.logger.trace("Initialized"),
            this.registerEventListeners(),
            await this.restore()),
            (this.initialized = !0));
        }),
        rb(this, "subscribe", async (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Subscribing Topic"),
            this.logger.trace({
              type: "method",
              method: "subscribe",
              params: { topic: e, opts: t },
            }));
          try {
            let i = ie(t),
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
        rb(this, "unsubscribe", async (e, t) => {
          (this.isInitialized(),
            "u" > typeof t?.id
              ? await this.unsubscribeById(e, t.id, t)
              : await this.unsubscribeByTopic(e, t));
        }),
        rb(
          this,
          "isSubscribed",
          (e) =>
            new Promise((t) => {
              t(this.topicMap.topics.includes(e));
            }),
        ),
        rb(
          this,
          "isKnownTopic",
          (e) =>
            new Promise((t) => {
              t(
                this.topicMap.topics.includes(e) ||
                  this.pending.has(e) ||
                  this.cached.some((t) => t.topic === e),
              );
            }),
        ),
        rb(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        rb(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        rb(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        rb(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        rb(this, "start", async () => {
          await this.onConnect();
        }),
        rb(this, "stop", async () => {
          await this.onDisconnect();
        }),
        rb(this, "restart", async () => {
          (await this.restore(), await this.onRestart());
        }),
        rb(this, "checkPending", async () => {
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
        rb(this, "registerEventListeners", () => {
          (this.relayer.core.heartbeat.on(n.W.pulse, async () => {
            await this.checkPending();
          }),
            this.events.on(i5, async (e) => {
              (this.logger.info(`Emitting ${i5}`),
                this.logger.debug({ type: "event", event: i5, data: e }),
                await this.persist());
            }),
            this.events.on(i3, async (e) => {
              (this.logger.info(`Emitting ${i3}`),
                this.logger.debug({ type: "event", event: i3, data: e }),
                await this.persist());
            }));
        }),
        (this.relayer = e),
        (this.logger = (0, c.v)(t, this.name)),
        (this.clientId = ""));
    }
    get context() {
      return (0, c.u)(this.logger);
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
        let s = ie(i);
        (await this.restartToComplete({ topic: e, id: t, relay: s }),
          await this.rpcUnsubscribe(e, t, s));
        let r = ip("USER_DISCONNECTED", `${this.name}, ${e}`);
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
      (i && i?.transportType !== i0) ||
        (await this.restartToComplete({ topic: e, id: e, relay: t }));
      let r = { method: it(t.protocol).subscribe, params: { topic: e } };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: r,
        }));
      let a = null == (s = i?.internal) ? void 0 : s.throwOnFailedPublish;
      try {
        let t = await this.getSubscriptionId(e);
        if (i?.transportType === iZ)
          return (
            setTimeout(
              () => {
                (this.relayer.connected || this.relayer.connecting) &&
                  this.relayer.request(r).catch((e) => this.logger.warn(e));
              },
              (0, u.toMiliseconds)(u.ONE_SECOND),
            ),
            t
          );
        let s = new Promise(async (t) => {
            let i = (s) => {
              s.topic === e && (this.events.removeListener(i5, i), t(s.id));
            };
            this.events.on(i5, i);
            try {
              let s = await B(
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
              (this.events.removeListener(i5, i), t(s));
            } catch {}
          }),
          n = await B(
            s,
            this.subscribeTimeout,
            `Subscribing to ${e} failed, please try again`,
          );
        if (!n && a)
          throw Error(`Subscribing to ${e} failed, please try again`);
        return n ? t : null;
      } catch (e) {
        if (
          (this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
          this.relayer.events.emit(iK),
          a)
        )
          throw e;
      }
      return null;
    }
    async rpcBatchSubscribe(e) {
      if (!e.length) return;
      let t = {
        method: it(e[0].relay.protocol).batchSubscribe,
        params: { topics: e.map((e) => e.topic) },
      };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: t,
        }));
      try {
        await await B(
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
        this.relayer.events.emit(iK);
      }
    }
    async rpcBatchFetchMessages(e) {
      let t;
      if (!e.length) return;
      let i = {
        method: it(e[0].relay.protocol).batchFetchMessages,
        params: { topics: e.map((e) => e.topic) },
      };
      (this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
          type: "payload",
          direction: "outgoing",
          request: i,
        }));
      try {
        t = await await B(
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
        this.relayer.events.emit(iK);
      }
      return t;
    }
    rpcUnsubscribe(e, t, i) {
      let s = {
        method: it(i.protocol).unsubscribe,
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
      (this.setSubscription(e, rd(ry({}, t), rp({ id: e }))),
        this.pending.delete(t.topic));
    }
    onBatchSubscribe(e) {
      e.length &&
        e.forEach((e) => {
          (this.setSubscription(e.id, ry({}, e)), this.pending.delete(e.topic));
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
      (this.subscriptions.set(e, ry({}, t)),
        this.topicMap.set(t.topic, e),
        this.events.emit(i5, t));
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
        let { message: t } = id("NO_MATCHING_KEY", `${this.name}: ${e}`);
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
        this.events.emit(i3, rd(ry({}, i), rp({ reason: t }))));
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
          let { message: e } = id("RESTORE_WILL_OVERRIDE", this.name);
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
              rd(ry({}, e), rp({ id: await this.getSubscriptionId(e.topic) })),
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
        (await ((t = (0, u.toMiliseconds)(u.ONE_SECOND)),
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
        let { message: e } = id("NOT_INITIALIZED", this.name);
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
      return t5(e + (await this.getClientId()));
    }
  }
  var rI = Object.defineProperty,
    rE = Object.getOwnPropertySymbols,
    rC = Object.prototype.hasOwnProperty,
    rS = Object.prototype.propertyIsEnumerable,
    rA = (e, t, i) =>
      t in e
        ? rI(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    rP = (e, t) => {
      for (var i in t || (t = {})) rC.call(t, i) && rA(e, i, t[i]);
      if (rE) for (var i of rE(t)) rS.call(t, i) && rA(e, i, t[i]);
      return e;
    },
    rN = (e, t, i) => rA(e, "symbol" != typeof t ? t + "" : t, i);
  class r_ extends h.k {
    constructor(t) {
      (super(t),
        rN(this, "protocol", "wc"),
        rN(this, "version", 2),
        rN(this, "core"),
        rN(this, "logger"),
        rN(this, "events", new a.EventEmitter()),
        rN(this, "provider"),
        rN(this, "messages"),
        rN(this, "subscriber"),
        rN(this, "publisher"),
        rN(this, "name", "relayer"),
        rN(this, "transportExplicitlyClosed", !1),
        rN(this, "initialized", !1),
        rN(this, "connectionAttemptInProgress", !1),
        rN(this, "relayUrl"),
        rN(this, "projectId"),
        rN(this, "packageName"),
        rN(this, "bundleId"),
        rN(this, "hasExperiencedNetworkDisruption", !1),
        rN(this, "pingTimeout"),
        rN(
          this,
          "heartBeatTimeout",
          (0, u.toMiliseconds)(u.THIRTY_SECONDS + u.FIVE_SECONDS),
        ),
        rN(this, "reconnectTimeout"),
        rN(this, "connectPromise"),
        rN(this, "reconnectInProgress", !1),
        rN(this, "requestsInFlight", []),
        rN(this, "connectTimeout", (0, u.toMiliseconds)(15 * u.ONE_SECOND)),
        rN(this, "request", async (e) => {
          var t, i;
          this.logger.debug("Publishing Request Payload");
          let s = e.id || (0, iU.f)().toString();
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
            let a = await this.provider.request(e);
            return (
              (this.requestsInFlight = this.requestsInFlight.filter(
                (e) => e !== r,
              )),
              a
            );
          } catch (e) {
            throw (this.logger.debug(`Failed to Publish Request: ${s}`), e);
          }
        }),
        rN(this, "resetPingTimeout", () => {
          O() &&
            (clearTimeout(this.pingTimeout),
            (this.pingTimeout = setTimeout(() => {
              var e, t, i, s;
              try {
                (this.logger.debug(
                  {},
                  "pingTimeout: Connection stalled, terminating...",
                ),
                  null ==
                    (s =
                      null ==
                      (i =
                        null ==
                        (t =
                          null == (e = this.provider) ? void 0 : e.connection)
                          ? void 0
                          : t.socket)
                        ? void 0
                        : i.terminate) || s.call(i));
              } catch (e) {
                this.logger.warn(e, e?.message);
              }
            }, this.heartBeatTimeout)));
        }),
        rN(this, "onPayloadHandler", (e) => {
          (this.onProviderPayload(e), this.resetPingTimeout());
        }),
        rN(this, "onConnectHandler", () => {
          (this.logger.warn({}, "Relayer connected 🛜"),
            this.startPingTimeout(),
            this.events.emit("relayer_connect"));
        }),
        rN(this, "onDisconnectHandler", () => {
          (this.logger.warn({}, "Relayer disconnected 🛑"),
            (this.requestsInFlight = []),
            this.onProviderDisconnect());
        }),
        rN(this, "onProviderErrorHandler", (e) => {
          (this.logger.fatal(`Fatal socket error: ${e.message}`),
            this.events.emit("relayer_error", e),
            this.logger.fatal("Fatal socket error received, closing transport"),
            this.transportClose());
        }),
        rN(this, "registerProviderListeners", () => {
          (this.provider.on(iG, this.onPayloadHandler),
            this.provider.on(iY, this.onConnectHandler),
            this.provider.on(iJ, this.onDisconnectHandler),
            this.provider.on(iX, this.onProviderErrorHandler));
        }),
        (this.core = t.core),
        (this.logger =
          "u" > typeof t.logger && "string" != typeof t.logger
            ? (0, c.v)(t.logger, this.name)
            : (0, l.pino)((0, c.l)({ level: t.logger || "error" }))),
        (this.messages = new s4(this.logger, t.core)),
        (this.subscriber = new rv(this, this.logger)),
        (this.publisher = new ro(this, this.logger)),
        (this.relayUrl = t?.relayUrl || iH),
        (this.projectId = t.projectId),
        T() &&
        "u" > typeof (null == e.g ? void 0 : e.g.Platform) &&
        (null == e.g ? void 0 : e.g.Platform.OS) === "android"
          ? (this.packageName = U())
          : T() &&
            "u" > typeof (null == e.g ? void 0 : e.g.Platform) &&
            (null == e.g ? void 0 : e.g.Platform.OS) === "ios" &&
            (this.bundleId = U()),
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
      return (0, c.u)(this.logger);
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
        await this.recordMessageEvent(
          { topic: e, message: t, publishedAt: Date.now(), transportType: i0 },
          "outbound",
        ));
    }
    async subscribe(e, t) {
      var i, s, r;
      (this.isInitialized(),
        (null != t && t.transportType && t?.transportType !== "relay") ||
          (await this.toEstablishConnection()));
      let a =
          typeof (null == (i = t?.internal) ? void 0 : i.throwOnFailedPublish) >
            "u" ||
          (null == (s = t?.internal) ? void 0 : s.throwOnFailedPublish),
        n =
          (null == (r = this.subscriber.topicMap.get(e)) ? void 0 : r[0]) || "",
        o,
        c = (t) => {
          t.topic === e && (this.subscriber.off(i5, c), o());
        };
      return (
        await Promise.all([
          new Promise((e) => {
            ((o = e), this.subscriber.on(i5, c));
          }),
          new Promise(async (i, s) => {
            ((n =
              (await this.subscriber
                .subscribe(e, rP({ internal: { throwOnFailedPublish: a } }, t))
                .catch((e) => {
                  a && s(e);
                })) || n),
              i());
          }),
        ]),
        n
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
        ? await B(
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
      if (!(await ix()))
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
        let e = V(u.FIVE_MINUTES);
        await this.core.pairing.pairings.set(i, {
          topic: i,
          expiry: e,
          relay: { protocol: "irn" },
          active: !1,
        });
      }
      (this.events.emit(iV, e), await this.recordMessageEvent(e, i1));
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
              (this.provider.once(iJ, i),
                await B(
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
                    (this.provider.off(iJ, i),
                      clearTimeout(this.reconnectTimeout));
                  }),
                await new Promise(async (e, t) => {
                  let i = () => {
                    t(
                      Error("Connection interrupted while trying to subscribe"),
                    );
                  };
                  (this.provider.once(iJ, i),
                    await this.subscriber
                      .start()
                      .then(e)
                      .catch(t)
                      .finally(() => {
                        this.provider.off(iJ, i);
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
        (await new Promise((e) => setTimeout(e, (0, u.toMiliseconds)(+t))),
          t++);
      }
    }
    startPingTimeout() {
      var e, t, i, s, r;
      if (O())
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
      ((this.provider = new iR.f(
        new iL.f(
          (function ({
            protocol: e,
            version: t,
            relayUrl: i,
            sdkVersion: s,
            auth: r,
            projectId: a,
            useOnCloseEvent: n,
            bundleId: o,
            packageName: c,
          }) {
            let l = i.split("?"),
              h = L(e, t, s),
              u = (function (e, t) {
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
                projectId: a,
                useOnCloseEvent: n || void 0,
                packageName: c || void 0,
                bundleId: o || void 0,
              });
            return l[0] + "?" + u;
          })({
            sdkVersion: iQ,
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
    async recordMessageEvent(e, t) {
      let { topic: i, message: s } = e;
      await this.messages.set(i, s, t);
    }
    async shouldIgnoreMessageEvent(e) {
      let { topic: t, message: i } = e;
      if (!i || 0 === i.length)
        return (this.logger.warn(`Ignoring invalid/empty message: ${i}`), !0);
      if (!(await this.subscriber.isKnownTopic(t)))
        return (
          this.logger.warn(`Ignoring message for unknown topic ${t}`),
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
        (0, iD.N)(e))
      ) {
        if (!e.method.endsWith("_subscription")) return;
        let t = e.params,
          { topic: i, message: s, publishedAt: r, attestation: a } = t.data,
          n = {
            topic: i,
            message: s,
            publishedAt: r,
            transportType: i0,
            attestation: a,
          };
        (this.logger.debug("Emitting Relayer Payload"),
          this.logger.trace(rP({ type: "event", event: t.id }, n)),
          this.events.emit(t.id, n),
          await this.acknowledgePayload(e),
          await this.onMessageEvent(n));
      } else (0, iD.Z)(e) && this.events.emit(iF, e);
    }
    async onMessageEvent(e) {
      (await this.shouldIgnoreMessageEvent(e)) ||
        (await this.recordMessageEvent(e, i1), this.events.emit(iV, e));
    }
    async acknowledgePayload(e) {
      let t = (0, iU.P)(e.id, !0);
      await this.provider.connection.send(t);
    }
    unregisterProviderListeners() {
      (this.provider.off(iG, this.onPayloadHandler),
        this.provider.off(iY, this.onConnectHandler),
        this.provider.off(iJ, this.onDisconnectHandler),
        this.provider.off(iX, this.onProviderErrorHandler),
        clearTimeout(this.pingTimeout));
    }
    async registerEventListeners() {
      let t = await ix();
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
      switch (R()) {
        case x:
          ((i = r),
            !T() &&
              k() &&
              (window.addEventListener("online", () => i(!0)),
              window.addEventListener("offline", () => i(!1))));
          break;
        case N:
          ((s = r),
            T() &&
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
                (0, u.toMiliseconds)(0.1),
              )))));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    async toEstablishConnection() {
      (await this.confirmOnlineStateOrThrow(),
        this.connected || (await this.connect()));
    }
  }
  function rx() {}
  function rO(e) {
    if (!e || "object" != typeof e) return !1;
    let t = Object.getPrototypeOf(e);
    return (
      (null === t ||
        t === Object.prototype ||
        null === Object.getPrototypeOf(t)) &&
      "[object Object]" === Object.prototype.toString.call(e)
    );
  }
  function rT(e) {
    return Object.getOwnPropertySymbols(e).filter((t) =>
      Object.prototype.propertyIsEnumerable.call(e, t),
    );
  }
  function rk(e) {
    return null == e
      ? void 0 === e
        ? "[object Undefined]"
        : "[object Null]"
      : Object.prototype.toString.call(e);
  }
  let rR = "[object Arguments]",
    rU = "[object Object]";
  var rD = Object.defineProperty,
    rL = Object.getOwnPropertySymbols,
    rj = Object.prototype.hasOwnProperty,
    r$ = Object.prototype.propertyIsEnumerable,
    rM = (e, t, i) =>
      t in e
        ? rD(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    rq = (e, t) => {
      for (var i in t || (t = {})) rj.call(t, i) && rM(e, i, t[i]);
      if (rL) for (var i of rL(t)) r$.call(t, i) && rM(e, i, t[i]);
      return e;
    },
    rB = (e, t, i) => rM(e, "symbol" != typeof t ? t + "" : t, i);
  class rz extends h.i {
    constructor(e, t, i, s = i$, a) {
      (super(e, t, i, s),
        (this.core = e),
        (this.logger = t),
        (this.name = i),
        rB(this, "map", new Map()),
        rB(this, "version", "0.3"),
        rB(this, "cached", []),
        rB(this, "initialized", !1),
        rB(this, "getKey"),
        rB(this, "storagePrefix", i$),
        rB(this, "recentlyDeleted", []),
        rB(this, "recentlyDeletedLimit", 200),
        rB(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => {
              var t;
              this.getKey && null !== e && !iw(e)
                ? this.map.set(this.getKey(e), e)
                : (null == (t = e?.proposer) ? void 0 : t.publicKey)
                  ? this.map.set(e.id, e)
                  : e?.topic && this.map.set(e.topic, e);
            }),
            (this.cached = []),
            (this.initialized = !0));
        }),
        rB(this, "set", async (e, t) => {
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
        rB(
          this,
          "get",
          (e) => (
            this.isInitialized(),
            this.logger.debug("Getting value"),
            this.logger.trace({ type: "method", method: "get", key: e }),
            this.getData(e)
          ),
        ),
        rB(
          this,
          "getAll",
          (e) => (
            this.isInitialized(),
            e
              ? this.values.filter((t) =>
                  Object.keys(e).every((i) => {
                    var s;
                    return (
                      (s = t[i]),
                      (function e(t, i, s, a, n, o, c) {
                        let l = c(t, i, s, a, n, o);
                        if (void 0 !== l) return l;
                        if (typeof t == typeof i)
                          switch (typeof t) {
                            case "bigint":
                            case "string":
                            case "boolean":
                            case "symbol":
                            case "undefined":
                            case "function":
                              return t === i;
                            case "number":
                              return t === i || Object.is(t, i);
                          }
                        return (function t(i, s, a, n) {
                          if (Object.is(i, s)) return !0;
                          let o = rk(i),
                            c = rk(s);
                          if (
                            (o === rR && (o = rU),
                            c === rR && (c = rU),
                            o !== c)
                          )
                            return !1;
                          switch (o) {
                            case "[object String]":
                              return i.toString() === s.toString();
                            case "[object Number]": {
                              let e = i.valueOf(),
                                t = s.valueOf();
                              return (
                                e === t || (Number.isNaN(e) && Number.isNaN(t))
                              );
                            }
                            case "[object Boolean]":
                            case "[object Date]":
                            case "[object Symbol]":
                              return Object.is(i.valueOf(), s.valueOf());
                            case "[object RegExp]":
                              return (
                                i.source === s.source && i.flags === s.flags
                              );
                            case "[object Function]":
                              return i === s;
                          }
                          let l = (a = a ?? new Map()).get(i),
                            h = a.get(s);
                          if (null != l && null != h) return l === s;
                          (a.set(i, s), a.set(s, i));
                          try {
                            switch (o) {
                              case "[object Map]":
                                if (i.size !== s.size) return !1;
                                for (let [t, r] of i.entries())
                                  if (
                                    !s.has(t) ||
                                    !e(r, s.get(t), t, i, s, a, n)
                                  )
                                    return !1;
                                return !0;
                              case "[object Set]": {
                                if (i.size !== s.size) return !1;
                                let t = Array.from(i.values()),
                                  r = Array.from(s.values());
                                for (let o = 0; o < t.length; o++) {
                                  let c = t[o],
                                    l = r.findIndex((t) =>
                                      e(c, t, void 0, i, s, a, n),
                                    );
                                  if (-1 === l) return !1;
                                  r.splice(l, 1);
                                }
                                return !0;
                              }
                              case "[object Array]":
                              case "[object Uint8Array]":
                              case "[object Uint8ClampedArray]":
                              case "[object Uint16Array]":
                              case "[object Uint32Array]":
                              case "[object BigUint64Array]":
                              case "[object Int8Array]":
                              case "[object Int16Array]":
                              case "[object Int32Array]":
                              case "[object BigInt64Array]":
                              case "[object Float32Array]":
                              case "[object Float64Array]":
                                if (
                                  ("u" > typeof r.Buffer &&
                                    r.Buffer.isBuffer(i) !==
                                      r.Buffer.isBuffer(s)) ||
                                  i.length !== s.length
                                )
                                  return !1;
                                for (let t = 0; t < i.length; t++)
                                  if (!e(i[t], s[t], t, i, s, a, n)) return !1;
                                return !0;
                              case "[object ArrayBuffer]":
                                return (
                                  i.byteLength === s.byteLength &&
                                  t(new Uint8Array(i), new Uint8Array(s), a, n)
                                );
                              case "[object DataView]":
                                return (
                                  i.byteLength === s.byteLength &&
                                  i.byteOffset === s.byteOffset &&
                                  t(new Uint8Array(i), new Uint8Array(s), a, n)
                                );
                              case "[object Error]":
                                return (
                                  i.name === s.name && i.message === s.message
                                );
                              case rU: {
                                if (
                                  !(
                                    t(i.constructor, s.constructor, a, n) ||
                                    (rO(i) && rO(s))
                                  )
                                )
                                  return !1;
                                let r = [...Object.keys(i), ...rT(i)],
                                  o = [...Object.keys(s), ...rT(s)];
                                if (r.length !== o.length) return !1;
                                for (let t = 0; t < r.length; t++) {
                                  let o = r[t],
                                    c = i[o];
                                  if (!Object.hasOwn(s, o)) return !1;
                                  let l = s[o];
                                  if (!e(c, l, o, i, s, a, n)) return !1;
                                }
                                return !0;
                              }
                              default:
                                return !1;
                            }
                          } finally {
                            (a.delete(i), a.delete(s));
                          }
                        })(t, i, o, c);
                      })(s, e[i], void 0, void 0, void 0, void 0, rx)
                    );
                  }),
                )
              : this.values
          ),
        ),
        rB(this, "update", async (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Updating value"),
            this.logger.trace({
              type: "method",
              method: "update",
              key: e,
              update: t,
            }));
          let i = rq(rq({}, this.getData(e)), t);
          (this.map.set(e, i), await this.persist());
        }),
        rB(this, "delete", async (e, t) => {
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
        (this.logger = (0, c.v)(t, this.name)),
        (this.storagePrefix = s),
        (this.getKey = a));
    }
    get context() {
      return (0, c.u)(this.logger);
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
          let { message: t } = id(
            "MISSING_OR_INVALID",
            `Record was recently deleted - ${this.name}: ${e}`,
          );
          throw (this.logger.error(t), Error(t));
        }
        let { message: t } = id("NO_MATCHING_KEY", `${this.name}: ${e}`);
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
          let { message: e } = id("RESTORE_WILL_OVERRIDE", this.name);
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
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rH = Object.defineProperty,
    rV = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rH(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rF {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        rV(this, "name", "pairing"),
        rV(this, "version", "0.3"),
        rV(this, "events", new a.default()),
        rV(this, "pairings"),
        rV(this, "initialized", !1),
        rV(this, "storagePrefix", i$),
        rV(this, "ignoredPayloadTypes", [1]),
        rV(this, "registeredMethods", []),
        rV(this, "init", async () => {
          this.initialized ||
            (await this.pairings.init(),
            await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            (this.initialized = !0),
            this.logger.trace("Initialized"));
        }),
        rV(this, "register", ({ methods: e }) => {
          (this.isInitialized(),
            (this.registeredMethods = [
              ...new Set([...this.registeredMethods, ...e]),
            ]));
        }),
        rV(this, "create", async (e) => {
          this.isInitialized();
          let t = t1(),
            i = await this.core.crypto.setSymKey(t),
            s = V(u.FIVE_MINUTES),
            r = { protocol: "irn" },
            a = {
              topic: i,
              expiry: s,
              relay: r,
              active: !1,
              methods: e?.methods,
            },
            n = is({
              protocol: this.core.protocol,
              version: this.core.version,
              topic: i,
              symKey: t,
              relay: r,
              expiryTimestamp: s,
              methods: e?.methods,
            });
          return (
            this.events.emit(i6, a),
            this.core.expirer.set(i, s),
            await this.pairings.set(i, a),
            await this.core.relayer.subscribe(i, {
              transportType: e?.transportType,
            }),
            { topic: i, uri: n }
          );
        }),
        rV(this, "pair", async (e) => {
          let t;
          this.isInitialized();
          let i = this.core.eventClient.createEvent({
            properties: { topic: e?.uri, trace: ["pairing_started"] },
          });
          this.isValidPair(e, i);
          let {
            topic: s,
            symKey: r,
            relay: a,
            expiryTimestamp: n,
            methods: o,
          } = ii(e.uri);
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
          let c = n || V(u.FIVE_MINUTES),
            l = { topic: s, relay: a, expiry: c, active: !1, methods: o };
          (this.core.expirer.set(s, c),
            await this.pairings.set(s, l),
            i.addTrace("store_new_pairing"),
            e.activatePairing && (await this.activate({ topic: s })),
            this.events.emit(i6, l),
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
            await this.core.relayer.subscribe(s, { relay: a });
          } catch (e) {
            throw (i.setError("subscribe_pairing_topic_failure"), e);
          }
          return (i.addTrace("subscribe_pairing_topic_success"), l);
        }),
        rV(this, "activate", async ({ topic: e }) => {
          this.isInitialized();
          let t = V(u.FIVE_MINUTES);
          (this.core.expirer.set(e, t),
            await this.pairings.update(e, { active: !0, expiry: t }));
        }),
        rV(this, "ping", async (e) => {
          (this.isInitialized(),
            await this.isValidPing(e),
            this.logger.warn(
              "ping() is deprecated and will be removed in the next major release.",
            ));
          let { topic: t } = e;
          if (this.pairings.keys.includes(t)) {
            let e = await this.sendRequest(t, "wc_pairingPing", {}),
              { done: i, resolve: s, reject: r } = q();
            (this.events.once(K("pairing_ping", e), ({ error: e }) => {
              e ? r(e) : s();
            }),
              await i());
          }
        }),
        rV(this, "updateExpiry", async ({ topic: e, expiry: t }) => {
          (this.isInitialized(), await this.pairings.update(e, { expiry: t }));
        }),
        rV(this, "updateMetadata", async ({ topic: e, metadata: t }) => {
          (this.isInitialized(),
            await this.pairings.update(e, { peerMetadata: t }));
        }),
        rV(
          this,
          "getPairings",
          () => (this.isInitialized(), this.pairings.values),
        ),
        rV(this, "disconnect", async (e) => {
          (this.isInitialized(), await this.isValidDisconnect(e));
          let { topic: t } = e;
          this.pairings.keys.includes(t) &&
            (await this.sendRequest(
              t,
              "wc_pairingDelete",
              ip("USER_DISCONNECTED"),
            ),
            await this.deletePairing(t));
        }),
        rV(this, "formatUriFromPairing", (e) => {
          this.isInitialized();
          let { topic: t, relay: i, expiry: s, methods: r } = e,
            a = this.core.crypto.keychain.get(t);
          return is({
            protocol: this.core.protocol,
            version: this.core.version,
            topic: t,
            symKey: a,
            relay: i,
            expiryTimestamp: s,
            methods: r,
          });
        }),
        rV(this, "sendRequest", async (e, t, i) => {
          let s = (0, iU.i)(t, i),
            r = await this.core.crypto.encode(e, s),
            a = i8[t].req;
          return (
            this.core.history.set(e, s),
            this.core.relayer.publish(e, r, a),
            s.id
          );
        }),
        rV(this, "sendResult", async (e, t, i) => {
          let s = (0, iU.P)(e, i),
            r = await this.core.crypto.encode(t, s),
            a = i8[(await this.core.history.get(t, e)).request.method].res;
          (await this.core.relayer.publish(t, r, a),
            await this.core.history.resolve(s));
        }),
        rV(this, "sendError", async (e, t, i) => {
          let s = (0, iU.U)(e, i),
            r = await this.core.crypto.encode(t, s),
            a = (await this.core.history.get(t, e)).request.method,
            n = i8[a] ? i8[a].res : i8.unregistered_method.res;
          (await this.core.relayer.publish(t, r, n),
            await this.core.history.resolve(s));
        }),
        rV(this, "deletePairing", async (e, t) => {
          (await this.core.relayer.unsubscribe(e),
            await Promise.all([
              this.pairings.delete(e, ip("USER_DISCONNECTED")),
              this.core.crypto.deleteSymKey(e),
              t ? Promise.resolve() : this.core.expirer.del(e),
            ]));
        }),
        rV(this, "cleanup", async () => {
          let e = this.pairings.getAll().filter((e) => F(e.expiry));
          await Promise.all(e.map((e) => this.deletePairing(e.topic)));
        }),
        rV(this, "onRelayEventRequest", async (e) => {
          let { topic: t, payload: i } = e;
          switch (i.method) {
            case "wc_pairingPing":
              return await this.onPairingPingRequest(t, i);
            case "wc_pairingDelete":
              return await this.onPairingDeleteRequest(t, i);
            default:
              return await this.onUnknownRpcMethodRequest(t, i);
          }
        }),
        rV(this, "onRelayEventResponse", async (e) => {
          let { topic: t, payload: i } = e,
            s = (await this.core.history.get(t, i.id)).request.method;
          return "wc_pairingPing" === s
            ? this.onPairingPingResponse(t, i)
            : this.onUnknownRpcMethodResponse(s);
        }),
        rV(this, "onPairingPingRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidPing({ topic: e }),
              await this.sendResult(i, e, !0),
              this.events.emit("pairing_ping", { id: i, topic: e }));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        rV(this, "onPairingPingResponse", (e, t) => {
          let { id: i } = t;
          setTimeout(() => {
            (0, iD.t)(t)
              ? this.events.emit(K("pairing_ping", i), {})
              : (0, iD.x)(t) &&
                this.events.emit(K("pairing_ping", i), { error: t.error });
          }, 500);
        }),
        rV(this, "onPairingDeleteRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidDisconnect({ topic: e }),
              await this.deletePairing(e),
              this.events.emit(i4, { id: i, topic: e }));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        rV(this, "onUnknownRpcMethodRequest", async (e, t) => {
          let { id: i, method: s } = t;
          try {
            if (this.registeredMethods.includes(s)) return;
            let t = ip("WC_METHOD_UNSUPPORTED", s);
            (await this.sendError(i, e, t), this.logger.error(t));
          } catch (t) {
            (await this.sendError(i, e, t), this.logger.error(t));
          }
        }),
        rV(this, "onUnknownRpcMethodResponse", (e) => {
          this.registeredMethods.includes(e) ||
            this.logger.error(ip("WC_METHOD_UNSUPPORTED", e));
        }),
        rV(this, "isValidPair", (e, t) => {
          var i;
          if (!iA(e)) {
            let { message: i } = id(
              "MISSING_OR_INVALID",
              `pair() params: ${e}`,
            );
            throw (t.setError(so), Error(i));
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
                if (iy(e, !1)) {
                  if (t(e)) return !0;
                  let i = Z(e);
                  return t(i);
                }
              } catch {}
              return !1;
            })(e.uri)
          ) {
            let { message: i } = id(
              "MISSING_OR_INVALID",
              `pair() uri: ${e.uri}`,
            );
            throw (t.setError(so), Error(i));
          }
          let s = ii(e?.uri);
          if (!(null != (i = s?.relay) && i.protocol)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              "pair() uri#relay-protocol",
            );
            throw (t.setError(so), Error(e));
          }
          if (!(null != s && s.symKey)) {
            let { message: e } = id("MISSING_OR_INVALID", "pair() uri#symKey");
            throw (t.setError(so), Error(e));
          }
          if (
            null != s &&
            s.expiryTimestamp &&
            (0, u.toMiliseconds)(s?.expiryTimestamp) < Date.now()
          ) {
            t.setError("pairing_expired");
            let { message: e } = id(
              "EXPIRED",
              "pair() URI has expired. Please try again with a new connection URI.",
            );
            throw Error(e);
          }
        }),
        rV(this, "isValidPing", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `ping() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidPairingTopic(t);
        }),
        rV(this, "isValidDisconnect", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `disconnect() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidPairingTopic(t);
        }),
        rV(this, "isValidPairingTopic", async (e) => {
          if (!iy(e, !1)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `pairing topic should be a string: ${e}`,
            );
            throw Error(t);
          }
          if (!this.pairings.keys.includes(e)) {
            let { message: t } = id(
              "NO_MATCHING_KEY",
              `pairing topic doesn't exist: ${e}`,
            );
            throw Error(t);
          }
          if (F(this.pairings.get(e).expiry)) {
            await this.deletePairing(e);
            let { message: t } = id("EXPIRED", `pairing topic: ${e}`);
            throw Error(t);
          }
        }),
        (this.core = e),
        (this.logger = (0, c.v)(t, this.name)),
        (this.pairings = new rz(
          this.core,
          this.logger,
          this.name,
          this.storagePrefix,
        )));
    }
    get context() {
      return (0, c.u)(this.logger);
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    registerRelayerEvents() {
      this.core.relayer.on(iV, async (e) => {
        let { topic: t, message: i, transportType: s } = e;
        if (
          this.pairings.keys.includes(t) &&
          s !== iZ &&
          !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))
        )
          try {
            let e = await this.core.crypto.decode(t, i);
            ((0, iD.N)(e)
              ? (this.core.history.set(t, e),
                await this.onRelayEventRequest({ topic: t, payload: e }))
              : (0, iD.Z)(e) &&
                (await this.core.history.resolve(e),
                await this.onRelayEventResponse({ topic: t, payload: e }),
                this.core.history.delete(t, e.id)),
              await this.core.relayer.messages.ack(t, i));
          } catch (e) {
            this.logger.error(e);
          }
      });
    }
    registerExpirerEvents() {
      this.core.expirer.on(ss, async (e) => {
        let { topic: t } = H(e.target);
        t &&
          this.pairings.keys.includes(t) &&
          (await this.deletePairing(t, !0),
          this.events.emit("pairing_expire", { topic: t }));
      });
    }
  }
  var rK = Object.defineProperty,
    rW = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rK(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rG extends h.d {
    constructor(e, t) {
      (super(e, t),
        (this.core = e),
        (this.logger = t),
        rW(this, "records", new Map()),
        rW(this, "events", new a.EventEmitter()),
        rW(this, "name", "history"),
        rW(this, "version", "0.3"),
        rW(this, "cached", []),
        rW(this, "initialized", !1),
        rW(this, "storagePrefix", i$),
        rW(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => this.records.set(e.id, e)),
            (this.cached = []),
            this.registerEventListeners(),
            (this.initialized = !0));
        }),
        rW(this, "set", (e, t, i) => {
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
            expiry: V(u.THIRTY_DAYS),
          };
          (this.records.set(s.id, s), this.persist(), this.events.emit(i9, s));
        }),
        rW(this, "resolve", async (e) => {
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
            ((t.response = (0, iD.x)(e)
              ? { error: e.error }
              : { result: e.result }),
            this.records.set(t.id, t),
            this.persist(),
            this.events.emit(i7, t));
        }),
        rW(
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
        rW(this, "delete", (e, t) => {
          (this.isInitialized(),
            this.logger.debug("Deleting record"),
            this.logger.trace({ type: "method", method: "delete", id: t }),
            this.values.forEach((i) => {
              i.topic === e &&
                (("u" > typeof t && i.id !== t) ||
                  (this.records.delete(i.id), this.events.emit(se, i)));
            }),
            this.persist());
        }),
        rW(
          this,
          "exists",
          async (e, t) => (
            this.isInitialized(),
            !!this.records.has(t) && (await this.getRecord(t)).topic === e
          ),
        ),
        rW(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        rW(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        rW(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        rW(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.logger = (0, c.v)(t, this.name)));
    }
    get context() {
      return (0, c.u)(this.logger);
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
            request: (0, iU.i)(t.request.method, t.request.params, t.id),
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
        let { message: t } = id("NO_MATCHING_KEY", `${this.name}: ${e}`);
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
          let { message: e } = id("RESTORE_WILL_OVERRIDE", this.name);
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
      (this.events.on(i9, (e) => {
        (this.logger.info(`Emitting ${i9}`),
          this.logger.debug({ type: "event", event: i9, record: e }));
      }),
        this.events.on(i7, (e) => {
          (this.logger.info(`Emitting ${i7}`),
            this.logger.debug({ type: "event", event: i7, record: e }));
        }),
        this.events.on(se, (e) => {
          (this.logger.info(`Emitting ${se}`),
            this.logger.debug({ type: "event", event: se, record: e }));
        }),
        this.core.heartbeat.on(n.W.pulse, () => {
          this.cleanup();
        }));
    }
    cleanup() {
      try {
        this.isInitialized();
        let e = !1;
        (this.records.forEach((t) => {
          (0, u.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 &&
            (this.logger.info(`Deleting expired history log: ${t.id}`),
            this.records.delete(t.id),
            this.events.emit(se, t, !1),
            (e = !0));
        }),
          e && this.persist());
      } catch (e) {
        this.logger.warn(e);
      }
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rY = Object.defineProperty,
    rJ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rY(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class rX extends h.g {
    constructor(e, t) {
      (super(e, t),
        (this.core = e),
        (this.logger = t),
        rJ(this, "expirations", new Map()),
        rJ(this, "events", new a.EventEmitter()),
        rJ(this, "name", "expirer"),
        rJ(this, "version", "0.3"),
        rJ(this, "cached", []),
        rJ(this, "initialized", !1),
        rJ(this, "storagePrefix", i$),
        rJ(this, "init", async () => {
          this.initialized ||
            (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach((e) => this.expirations.set(e.target, e)),
            (this.cached = []),
            this.registerEventListeners(),
            (this.initialized = !0));
        }),
        rJ(this, "has", (e) => {
          try {
            let t = this.formatTarget(e);
            return "u" > typeof this.getExpiration(t);
          } catch {
            return !1;
          }
        }),
        rJ(this, "set", (e, t) => {
          this.isInitialized();
          let i = this.formatTarget(e),
            s = { target: i, expiry: t };
          (this.expirations.set(i, s),
            this.checkExpiry(i, s),
            this.events.emit(st, { target: i, expiration: s }));
        }),
        rJ(this, "get", (e) => {
          this.isInitialized();
          let t = this.formatTarget(e);
          return this.getExpiration(t);
        }),
        rJ(this, "del", (e) => {
          if ((this.isInitialized(), this.has(e))) {
            let t = this.formatTarget(e),
              i = this.getExpiration(t);
            (this.expirations.delete(t),
              this.events.emit(si, { target: t, expiration: i }));
          }
        }),
        rJ(this, "on", (e, t) => {
          this.events.on(e, t);
        }),
        rJ(this, "once", (e, t) => {
          this.events.once(e, t);
        }),
        rJ(this, "off", (e, t) => {
          this.events.off(e, t);
        }),
        rJ(this, "removeListener", (e, t) => {
          this.events.removeListener(e, t);
        }),
        (this.logger = (0, c.v)(t, this.name)));
    }
    get context() {
      return (0, c.u)(this.logger);
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
      if ("string" == typeof e) return z("topic", e);
      if ("number" == typeof e) return z("id", e);
      let { message: t } = id("UNKNOWN_TYPE", `Target type: ${typeof e}`);
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
          let { message: e } = id("RESTORE_WILL_OVERRIDE", this.name);
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
        let { message: t } = id("NO_MATCHING_KEY", `${this.name}: ${e}`);
        throw (this.logger.warn(t), Error(t));
      }
      return t;
    }
    checkExpiry(e, t) {
      let { expiry: i } = t;
      (0, u.toMiliseconds)(i) - Date.now() <= 0 && this.expire(e, t);
    }
    expire(e, t) {
      (this.expirations.delete(e),
        this.events.emit(ss, { target: e, expiration: t }));
    }
    checkExpirations() {
      this.core.relayer.connected &&
        this.expirations.forEach((e, t) => this.checkExpiry(t, e));
    }
    registerEventListeners() {
      (this.core.heartbeat.on(n.W.pulse, () => this.checkExpirations()),
        this.events.on(st, (e) => {
          (this.logger.info(`Emitting ${st}`),
            this.logger.debug({ type: "event", event: st, data: e }),
            this.persist());
        }),
        this.events.on(ss, (e) => {
          (this.logger.info(`Emitting ${ss}`),
            this.logger.debug({ type: "event", event: ss, data: e }),
            this.persist());
        }),
        this.events.on(si, (e) => {
          (this.logger.info(`Emitting ${si}`),
            this.logger.debug({ type: "event", event: si, data: e }),
            this.persist());
        }));
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
  }
  var rQ = Object.defineProperty,
    rZ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? rQ(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class r0 extends h.y {
    constructor(e, t, i) {
      (super(e, t, i),
        (this.core = e),
        (this.logger = t),
        (this.store = i),
        rZ(this, "name", "verify-api"),
        rZ(this, "abortController"),
        rZ(this, "isDevEnv"),
        rZ(this, "verifyUrlV3", sa),
        rZ(this, "storagePrefix", i$),
        rZ(this, "version", 2),
        rZ(this, "publicKey"),
        rZ(this, "fetchPromise"),
        rZ(this, "init", async () => {
          var e;
          this.isDevEnv ||
            ((this.publicKey = await this.store.getItem(this.storeKey)),
            this.publicKey &&
              (0, u.toMiliseconds)(
                null == (e = this.publicKey) ? void 0 : e.expiresAt,
              ) < Date.now() &&
              (this.logger.debug("verify v2 public key expired"),
              await this.removePublicKey()));
        }),
        rZ(this, "register", async (e) => {
          if (!k() || this.isDevEnv) return;
          let t = window.location.origin,
            { id: i, decryptedId: s } = e,
            r = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${t}&id=${i}&decryptedId=${s}`;
          try {
            let e = (0, m.getDocument)(),
              t = this.startAbortTimer(5 * u.ONE_SECOND),
              s = await new Promise((s, a) => {
                let n = () => {
                  (window.removeEventListener("message", c),
                    e.body.removeChild(o),
                    a("attestation aborted"));
                };
                this.abortController.signal.addEventListener("abort", n);
                let o = e.createElement("iframe");
                ((o.src = r),
                  (o.style.display = "none"),
                  o.addEventListener("error", n, {
                    signal: this.abortController.signal,
                  }));
                let c = (r) => {
                  if (r.data && "string" == typeof r.data)
                    try {
                      let a = JSON.parse(r.data);
                      if ("verify_attestation" === a.type) {
                        if ((0, p.R)(a.attestation).payload.id !== i) return;
                        (clearInterval(t),
                          e.body.removeChild(o),
                          this.abortController.signal.removeEventListener(
                            "abort",
                            n,
                          ),
                          window.removeEventListener("message", c),
                          s(null === a.attestation ? "" : a.attestation));
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
        rZ(this, "resolve", async (e) => {
          if (this.isDevEnv) return "";
          let { attestationId: t, hash: i, encryptedId: s } = e;
          if ("" === t)
            return void this.logger.debug(
              "resolve: attestationId is empty, skipping",
            );
          if (t) {
            if ((0, p.R)(t).payload.id !== s) return;
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
        rZ(this, "fetchAttestation", async (e, t) => {
          this.logger.debug(`resolving attestation: ${e} from url: ${t}`);
          let i = this.startAbortTimer(5 * u.ONE_SECOND),
            s = await fetch(`${t}/attestation/${e}?v2Supported=true`, {
              signal: this.abortController.signal,
            });
          return (clearTimeout(i), 200 === s.status ? await s.json() : void 0);
        }),
        rZ(this, "getVerifyUrl", (e) => {
          let t = e || sr;
          return (
            sn.includes(t) ||
              (this.logger.info(
                `verify url: ${t}, not included in trusted list, assigning default: ${sr}`,
              ),
              (t = sr)),
            t
          );
        }),
        rZ(this, "fetchPublicKey", async () => {
          try {
            this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
            let e = this.startAbortTimer(u.FIVE_SECONDS),
              t = await fetch(`${this.verifyUrlV3}/public-key`, {
                signal: this.abortController.signal,
              });
            return (clearTimeout(e), await t.json());
          } catch (e) {
            this.logger.warn(e);
          }
        }),
        rZ(this, "persistPublicKey", async (e) => {
          (this.logger.debug("persisting public key to local storage", e),
            await this.store.setItem(this.storeKey, e),
            (this.publicKey = e));
        }),
        rZ(this, "removePublicKey", async () => {
          (this.logger.debug("removing verify v2 public key from storage"),
            await this.store.removeItem(this.storeKey),
            (this.publicKey = void 0));
        }),
        rZ(this, "isValidJwtAttestation", async (e) => {
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
        rZ(this, "getPublicKey", async () =>
          this.publicKey
            ? this.publicKey
            : await this.fetchAndPersistPublicKey(),
        ),
        rZ(this, "fetchAndPersistPublicKey", async () => {
          if (this.fetchPromise)
            return (await this.fetchPromise, this.publicKey);
          this.fetchPromise = new Promise(async (e) => {
            let t = await this.fetchPublicKey();
            t && (await this.persistPublicKey(t), e(t));
          });
          let e = await this.fetchPromise;
          return ((this.fetchPromise = void 0), e);
        }),
        rZ(this, "validateAttestation", (e, t) => {
          let i = (function (e, t) {
              var i;
              let s,
                a,
                [n, o, c] = e.split("."),
                l =
                  ((i = c),
                  r.Buffer.from(
                    ((a =
                      (s = i.replace(/-/g, "+").replace(/_/g, "/")).length %
                      4) > 0 && (s += "=".repeat(4 - a)),
                    s),
                    "base64",
                  ));
              if (64 !== l.length) throw Error("Invalid signature length");
              let h = l.slice(0, 32).toString("hex"),
                u = l.slice(32, 64).toString("hex"),
                d = tP(`${n}.${o}`),
                g = new C.ec("p256").keyFromPublic(
                  {
                    x: r.Buffer.from(t.x, "base64").toString("hex"),
                    y: r.Buffer.from(t.y, "base64").toString("hex"),
                  },
                  "hex",
                ),
                f = (0, v.f)(d, tX);
              if (!g.verify(f, { r: h, s: u }))
                throw Error("Invalid signature");
              return (0, p.R)(e).payload;
            })(e, t.publicKey),
            s = {
              hasExpired: (0, u.toMiliseconds)(i.exp) < Date.now(),
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
        (this.logger = (0, c.v)(t, this.name)),
        (this.abortController = new AbortController()),
        (this.isDevEnv = Q()),
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
      return (0, c.u)(this.logger);
    }
    startAbortTimer(e) {
      return (
        (this.abortController = new AbortController()),
        setTimeout(() => this.abortController.abort(), (0, u.toMiliseconds)(e))
      );
    }
  }
  var r1 = Object.defineProperty,
    r2 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? r1(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class r5 extends h.r {
    constructor(e, t) {
      (super(e, t),
        (this.projectId = e),
        (this.logger = t),
        r2(this, "context", "echo"),
        r2(this, "registerDeviceToken", async (e) => {
          let {
              clientId: t,
              token: i,
              notificationType: s,
              enableEncrypted: r = !1,
            } = e,
            a = `https://echo.walletconnect.com/${this.projectId}/clients`;
          await fetch(a, {
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
        (this.logger = (0, c.v)(t, this.context)));
    }
  }
  var r3 = Object.defineProperty,
    r8 = Object.getOwnPropertySymbols,
    r6 = Object.prototype.hasOwnProperty,
    r4 = Object.prototype.propertyIsEnumerable,
    r9 = (e, t, i) =>
      t in e
        ? r3(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    r7 = (e, t) => {
      for (var i in t || (t = {})) r6.call(t, i) && r9(e, i, t[i]);
      if (r8) for (var i of r8(t)) r4.call(t, i) && r9(e, i, t[i]);
      return e;
    },
    ae = (e, t, i) => r9(e, "symbol" != typeof t ? t + "" : t, i);
  class at extends h.I {
    constructor(e, t, i = !0) {
      (super(e, t, i),
        (this.core = e),
        (this.logger = t),
        ae(this, "context", "event-client"),
        ae(this, "storagePrefix", i$),
        ae(this, "storageVersion", 0.1),
        ae(this, "events", new Map()),
        ae(this, "shouldPersist", !1),
        ae(this, "init", async () => {
          if (!Q())
            try {
              let e = {
                eventId: X(),
                timestamp: Date.now(),
                domain: this.getAppDomain(),
                props: {
                  event: "INIT",
                  type: "",
                  properties: {
                    client_id: await this.core.crypto.getClientId(),
                    user_agent: L(
                      this.core.relayer.protocol,
                      this.core.relayer.version,
                      iQ,
                    ),
                  },
                },
              };
              await this.sendEvent([e]);
            } catch (e) {
              this.logger.warn(e);
            }
        }),
        ae(this, "createEvent", (e) => {
          let {
              event: t = "ERROR",
              type: i = "",
              properties: { topic: s, trace: r },
            } = e,
            a = X(),
            n = this.core.projectId || "",
            o = r7(
              {
                eventId: a,
                timestamp: Date.now(),
                props: {
                  event: t,
                  type: i,
                  properties: { topic: s, trace: r },
                },
                bundleId: n,
                domain: this.getAppDomain(),
              },
              this.setMethods(a),
            );
          return (
            this.telemetryEnabled &&
              (this.events.set(a, o), (this.shouldPersist = !0)),
            o
          );
        }),
        ae(this, "getEvent", (e) => {
          let { eventId: t, topic: i } = e;
          if (t) return this.events.get(t);
          let s = Array.from(this.events.values()).find(
            (e) => e.props.properties.topic === i,
          );
          if (s) return r7(r7({}, s), this.setMethods(s.eventId));
        }),
        ae(this, "deleteEvent", (e) => {
          let { eventId: t } = e;
          (this.events.delete(t), (this.shouldPersist = !0));
        }),
        ae(this, "setEventListeners", () => {
          this.core.heartbeat.on(n.W.pulse, async () => {
            (this.shouldPersist && (await this.persist()),
              this.events.forEach((e) => {
                (0, u.fromMiliseconds)(Date.now()) -
                  (0, u.fromMiliseconds)(e.timestamp) >
                  86400 &&
                  (this.events.delete(e.eventId), (this.shouldPersist = !0));
              }));
          });
        }),
        ae(this, "setMethods", (e) => ({
          addTrace: (t) => this.addTrace(e, t),
          setError: (t) => this.setError(e, t),
        })),
        ae(this, "addTrace", (e, t) => {
          let i = this.events.get(e);
          i &&
            (i.props.properties.trace.push(t),
            this.events.set(e, i),
            (this.shouldPersist = !0));
        }),
        ae(this, "setError", (e, t) => {
          let i = this.events.get(e);
          i &&
            ((i.props.type = t),
            (i.timestamp = Date.now()),
            this.events.set(e, i),
            (this.shouldPersist = !0));
        }),
        ae(this, "persist", async () => {
          (await this.core.storage.setItem(
            this.storageKey,
            Array.from(this.events.values()),
          ),
            (this.shouldPersist = !1));
        }),
        ae(this, "restore", async () => {
          try {
            let e = (await this.core.storage.getItem(this.storageKey)) || [];
            if (!e.length) return;
            e.forEach((e) => {
              this.events.set(
                e.eventId,
                r7(r7({}, e), this.setMethods(e.eventId)),
              );
            });
          } catch (e) {
            this.logger.warn(e);
          }
        }),
        ae(this, "submit", async () => {
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
        ae(this, "sendEvent", async (e) => {
          let t = this.getAppDomain() ? "" : "&sp=desktop";
          return await fetch(
            `https://pulse.walletconnect.org/batch?projectId=${this.core.projectId}&st=events_sdk&sv=js-${iQ}${t}`,
            { method: "POST", body: JSON.stringify(e) },
          );
        }),
        ae(this, "getAppDomain", () => D().url),
        (this.logger = (0, c.v)(t, this.context)),
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
  var ai = Object.defineProperty,
    as = Object.getOwnPropertySymbols,
    ar = Object.prototype.hasOwnProperty,
    aa = Object.prototype.propertyIsEnumerable,
    an = (e, t, i) =>
      t in e
        ? ai(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    ao = (e, t) => {
      for (var i in t || (t = {})) ar.call(t, i) && an(e, i, t[i]);
      if (as) for (var i of as(t)) aa.call(t, i) && an(e, i, t[i]);
      return e;
    },
    ac = (e, t, i) => an(e, "symbol" != typeof t ? t + "" : t, i);
  class al extends h.C {
    constructor(e) {
      var t;
      (super(e),
        ac(this, "protocol", "wc"),
        ac(this, "version", 2),
        ac(this, "name", ij),
        ac(this, "relayUrl"),
        ac(this, "projectId"),
        ac(this, "customStoragePrefix"),
        ac(this, "events", new a.EventEmitter()),
        ac(this, "logger"),
        ac(this, "heartbeat"),
        ac(this, "relayer"),
        ac(this, "crypto"),
        ac(this, "storage"),
        ac(this, "history"),
        ac(this, "expirer"),
        ac(this, "pairing"),
        ac(this, "verify"),
        ac(this, "echoClient"),
        ac(this, "linkModeSupportedApps"),
        ac(this, "eventClient"),
        ac(this, "initialized", !1),
        ac(this, "logChunkController"),
        ac(this, "on", (e, t) => this.events.on(e, t)),
        ac(this, "once", (e, t) => this.events.once(e, t)),
        ac(this, "off", (e, t) => this.events.off(e, t)),
        ac(this, "removeListener", (e, t) => this.events.removeListener(e, t)),
        ac(
          this,
          "dispatchEnvelope",
          ({ topic: e, message: t, sessionExists: i }) => {
            if (!e || !t) return;
            let s = {
              topic: e,
              message: t,
              publishedAt: Date.now(),
              transportType: iZ,
            };
            this.relayer.onLinkMessageEvent(s, { sessionExists: i });
          },
        ),
        (this.projectId = e?.projectId),
        (this.relayUrl = e?.relayUrl || iH),
        (this.customStoragePrefix =
          null != e && e.customStoragePrefix
            ? `:${e.customStoragePrefix}`
            : ""));
      let i = (0, c.l)({
          level: "string" == typeof e?.logger && e.logger ? e.logger : "error",
          name: ij,
        }),
        { logger: s, chunkLoggerController: r } = (0, c.z)({
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
        (this.logger = (0, c.v)(s, this.name)),
        (this.heartbeat = new n.k()),
        (this.crypto = new sQ(this, this.logger, e?.keychain)),
        (this.history = new rG(this, this.logger)),
        (this.expirer = new rX(this, this.logger)),
        (this.storage =
          null != e && e.storage
            ? e.storage
            : new o.f(ao(ao({}, iM), e?.storageOptions))),
        (this.relayer = new r_({
          core: this,
          logger: this.logger,
          relayUrl: this.relayUrl,
          projectId: this.projectId,
        })),
        (this.pairing = new rF(this, this.logger)),
        (this.verify = new r0(this, this.logger, this.storage)),
        (this.echoClient = new r5(this.projectId || "", this.logger)),
        (this.linkModeSupportedApps = []),
        (this.eventClient = new at(this, this.logger, e?.telemetryEnabled)));
    }
    static async init(e) {
      let t = new al(e);
      await t.initialize();
      let i = await t.crypto.getClientId();
      return (await t.storage.setItem("WALLETCONNECT_CLIENT_ID", i), t);
    }
    get context() {
      return (0, c.u)(this.logger);
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
        await this.storage.setItem(i2, this.linkModeSupportedApps));
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
          (this.linkModeSupportedApps = (await this.storage.getItem(i2)) || []),
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
  }
  var ah = h;
  let au = "client",
    ad = `wc@2:${au}:`,
    ap = "WALLETCONNECT_DEEPLINK_CHOICE",
    ag = (u.THIRTY_DAYS, "Proposal expired"),
    af = u.SEVEN_DAYS,
    am = {
      wc_sessionPropose: {
        req: { ttl: u.FIVE_MINUTES, prompt: !0, tag: 1100 },
        res: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1101 },
        reject: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1120 },
        autoReject: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1121 },
      },
      wc_sessionSettle: {
        req: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1102 },
        res: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1103 },
      },
      wc_sessionUpdate: {
        req: { ttl: u.ONE_DAY, prompt: !1, tag: 1104 },
        res: { ttl: u.ONE_DAY, prompt: !1, tag: 1105 },
      },
      wc_sessionExtend: {
        req: { ttl: u.ONE_DAY, prompt: !1, tag: 1106 },
        res: { ttl: u.ONE_DAY, prompt: !1, tag: 1107 },
      },
      wc_sessionRequest: {
        req: { ttl: u.FIVE_MINUTES, prompt: !0, tag: 1108 },
        res: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1109 },
      },
      wc_sessionEvent: {
        req: { ttl: u.FIVE_MINUTES, prompt: !0, tag: 1110 },
        res: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1111 },
      },
      wc_sessionDelete: {
        req: { ttl: u.ONE_DAY, prompt: !1, tag: 1112 },
        res: { ttl: u.ONE_DAY, prompt: !1, tag: 1113 },
      },
      wc_sessionPing: {
        req: { ttl: u.ONE_DAY, prompt: !1, tag: 1114 },
        res: { ttl: u.ONE_DAY, prompt: !1, tag: 1115 },
      },
      wc_sessionAuthenticate: {
        req: { ttl: u.ONE_HOUR, prompt: !0, tag: 1116 },
        res: { ttl: u.ONE_HOUR, prompt: !1, tag: 1117 },
        reject: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1118 },
        autoReject: { ttl: u.FIVE_MINUTES, prompt: !1, tag: 1119 },
      },
    },
    aw = { min: u.FIVE_MINUTES, max: u.SEVEN_DAYS },
    ay = "IDLE",
    ab = "ACTIVE",
    av = {
      eth_sendTransaction: { key: "" },
      eth_sendRawTransaction: { key: "" },
      wallet_sendCalls: { key: "" },
      solana_signTransaction: { key: "signature" },
      solana_signAllTransactions: { key: "transactions" },
      solana_signAndSendTransaction: { key: "signature" },
    },
    aI = [
      "wc_sessionPropose",
      "wc_sessionRequest",
      "wc_authRequest",
      "wc_sessionAuthenticate",
    ],
    aE = "wc@1.5:auth:",
    aC = `${aE}:PUB_KEY`;
  var aS = Object.defineProperty,
    aA = Object.defineProperties,
    aP = Object.getOwnPropertyDescriptors,
    aN = Object.getOwnPropertySymbols,
    a_ = Object.prototype.hasOwnProperty,
    ax = Object.prototype.propertyIsEnumerable,
    aO = (e, t, i) =>
      t in e
        ? aS(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    aT = (e, t) => {
      for (var i in t || (t = {})) a_.call(t, i) && aO(e, i, t[i]);
      if (aN) for (var i of aN(t)) ax.call(t, i) && aO(e, i, t[i]);
      return e;
    },
    ak = (e, t, i) => aO(e, "symbol" != typeof t ? t + "" : t, i);
  class aR extends ah.M {
    constructor(t) {
      (super(t),
        ak(this, "name", "engine"),
        ak(this, "events", new a.default()),
        ak(this, "initialized", !1),
        ak(this, "requestQueue", { state: ay, queue: [] }),
        ak(this, "sessionRequestQueue", { state: ay, queue: [] }),
        ak(this, "requestQueueDelay", u.ONE_SECOND),
        ak(this, "expectedPairingMethodMap", new Map()),
        ak(this, "recentlyDeletedMap", new Map()),
        ak(this, "recentlyDeletedLimit", 200),
        ak(this, "relayMessageCache", []),
        ak(this, "pendingSessions", new Map()),
        ak(this, "init", async () => {
          this.initialized ||
            (await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.registerPairingEvents(),
            await this.registerLinkModeListeners(),
            this.client.core.pairing.register({ methods: Object.keys(am) }),
            (this.initialized = !0),
            setTimeout(
              async () => {
                (await this.processPendingMessageEvents(),
                  (this.sessionRequestQueue.queue =
                    this.getPendingSessionRequests()),
                  this.processSessionRequestQueue());
              },
              (0, u.toMiliseconds)(this.requestQueueDelay),
            ));
        }),
        ak(this, "connect", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          let t = aA(
            aT({}, e),
            aP({
              requiredNamespaces: e.requiredNamespaces || {},
              optionalNamespaces: e.optionalNamespaces || {},
            }),
          );
          await this.isValidConnect(t);
          let {
              pairingTopic: i,
              requiredNamespaces: s,
              optionalNamespaces: r,
              sessionProperties: a,
              scopedProperties: n,
              relays: o,
            } = t,
            c = i,
            l,
            h = !1;
          try {
            if (c) {
              let e = this.client.core.pairing.pairings.get(c);
              (this.client.logger.warn(
                "connect() with existing pairing topic is deprecated and will be removed in the next major release.",
              ),
                (h = e.active));
            }
          } catch (e) {
            throw (
              this.client.logger.error(`connect() -> pairing.get(${c}) failed`),
              e
            );
          }
          if (!c || !h) {
            let { topic: e, uri: t } = await this.client.core.pairing.create();
            ((c = e), (l = t));
          }
          if (!c) {
            let { message: e } = id(
              "NO_MATCHING_KEY",
              `connect() pairing topic: ${c}`,
            );
            throw Error(e);
          }
          let d = await this.client.core.crypto.generateKeyPair(),
            p = am.wc_sessionPropose.req.ttl || u.FIVE_MINUTES,
            g = V(p),
            f = aA(
              aT(
                aT(
                  {
                    requiredNamespaces: s,
                    optionalNamespaces: r,
                    relays: o ?? [{ protocol: "irn" }],
                    proposer: { publicKey: d, metadata: this.client.metadata },
                    expiryTimestamp: g,
                    pairingTopic: c,
                  },
                  a && { sessionProperties: a },
                ),
                n && { scopedProperties: n },
              ),
              aP({ id: (0, iU.I)() }),
            ),
            m = K("session_connect", f.id),
            { reject: w, resolve: y, done: b } = q(p, ag),
            v = ({ id: e }) => {
              e === f.id &&
                (this.client.events.off("proposal_expire", v),
                this.pendingSessions.delete(f.id),
                this.events.emit(m, { error: { message: ag, code: 0 } }));
            };
          return (
            this.client.events.on("proposal_expire", v),
            this.events.once(m, ({ error: e, session: t }) => {
              (this.client.events.off("proposal_expire", v),
                e ? w(e) : t && y(t));
            }),
            await this.sendRequest({
              topic: c,
              method: "wc_sessionPropose",
              params: f,
              throwOnFailedPublish: !0,
              clientRpcId: f.id,
            }),
            await this.setProposal(f.id, f),
            { uri: l, approval: b }
          );
        }),
        ak(this, "pair", async (e) => {
          (this.isInitialized(), await this.confirmOnlineStateOrThrow());
          try {
            return await this.client.core.pairing.pair(e);
          } catch (e) {
            throw (this.client.logger.error("pair() failed"), e);
          }
        }),
        ak(this, "approve", async (e) => {
          var t, i, s;
          let r = this.client.core.eventClient.createEvent({
            properties: {
              topic: null == (t = e?.id) ? void 0 : t.toString(),
              trace: [sc],
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
              id: a,
              relayProtocol: n,
              namespaces: o,
              sessionProperties: c,
              scopedProperties: l,
              sessionConfig: h,
            } = e,
            u = this.client.proposal.get(a);
          this.client.core.eventClient.deleteEvent({ eventId: r.eventId });
          let {
              pairingTopic: d,
              proposer: p,
              requiredNamespaces: g,
              optionalNamespaces: f,
            } = u,
            m =
              null == (i = this.client.core.eventClient)
                ? void 0
                : i.getEvent({ topic: d });
          m ||
            (m =
              null == (s = this.client.core.eventClient)
                ? void 0
                : s.createEvent({
                    type: sc,
                    properties: {
                      topic: d,
                      trace: [sc, "session_namespaces_validation_success"],
                    },
                  }));
          let w = await this.client.core.crypto.generateKeyPair(),
            y = p.publicKey,
            b = await this.client.core.crypto.generateSharedKey(w, y),
            v = aT(
              aT(
                aT(
                  {
                    relay: { protocol: n ?? "irn" },
                    namespaces: o,
                    controller: {
                      publicKey: w,
                      metadata: this.client.metadata,
                    },
                    expiry: V(af),
                  },
                  c && { sessionProperties: c },
                ),
                l && { scopedProperties: l },
              ),
              h && { sessionConfig: h },
            );
          m.addTrace("subscribing_session_topic");
          try {
            await this.client.core.relayer.subscribe(b, { transportType: i0 });
          } catch (e) {
            throw (m.setError("subscribe_session_topic_failure"), e);
          }
          m.addTrace("subscribe_session_topic_success");
          let I = aA(
            aT({}, v),
            aP({
              topic: b,
              requiredNamespaces: g,
              optionalNamespaces: f,
              pairingTopic: d,
              acknowledged: !1,
              self: v.controller,
              peer: { publicKey: p.publicKey, metadata: p.metadata },
              controller: w,
              transportType: i0,
            }),
          );
          (await this.client.session.set(b, I), m.addTrace("store_session"));
          try {
            (m.addTrace("publishing_session_settle"),
              await this.sendRequest({
                topic: b,
                method: "wc_sessionSettle",
                params: v,
                throwOnFailedPublish: !0,
              }).catch((e) => {
                throw (m?.setError("session_settle_publish_failure"), e);
              }),
              m.addTrace("session_settle_publish_success"),
              m.addTrace("publishing_session_approve"),
              await this.sendResult({
                id: a,
                topic: d,
                result: {
                  relay: { protocol: n ?? "irn" },
                  responderPublicKey: w,
                },
                throwOnFailedPublish: !0,
              }).catch((e) => {
                throw (m?.setError("session_approve_publish_failure"), e);
              }),
              m.addTrace("session_approve_publish_success"));
          } catch (e) {
            throw (
              this.client.logger.error(e),
              this.client.session.delete(b, ip("USER_DISCONNECTED")),
              await this.client.core.relayer.unsubscribe(b),
              e
            );
          }
          return (
            this.client.core.eventClient.deleteEvent({ eventId: m.eventId }),
            await this.client.core.pairing.updateMetadata({
              topic: d,
              metadata: p.metadata,
            }),
            await this.client.proposal.delete(a, ip("USER_DISCONNECTED")),
            await this.client.core.pairing.activate({ topic: d }),
            await this.setExpiry(b, V(af)),
            {
              topic: b,
              acknowledged: () => Promise.resolve(this.client.session.get(b)),
            }
          );
        }),
        ak(this, "reject", async (e) => {
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
              rpcOpts: am.wc_sessionPropose.reject,
            }),
            await this.client.proposal.delete(i, ip("USER_DISCONNECTED")));
        }),
        ak(this, "update", async (e) => {
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
            { done: s, resolve: r, reject: a } = q(),
            n = (0, iU.I)(),
            o = (0, iU.f)().toString(),
            c = this.client.session.get(t).namespaces;
          return (
            this.events.once(K("session_update", n), ({ error: e }) => {
              e ? a(e) : r();
            }),
            await this.client.session.update(t, { namespaces: i }),
            await this.sendRequest({
              topic: t,
              method: "wc_sessionUpdate",
              params: { namespaces: i },
              throwOnFailedPublish: !0,
              clientRpcId: n,
              relayRpcId: o,
            }).catch((e) => {
              (this.client.logger.error(e),
                this.client.session.update(t, { namespaces: c }),
                a(e));
            }),
            { acknowledged: s }
          );
        }),
        ak(this, "extend", async (e) => {
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
            i = (0, iU.I)(),
            { done: s, resolve: r, reject: a } = q();
          return (
            this.events.once(K("session_extend", i), ({ error: e }) => {
              e ? a(e) : r();
            }),
            await this.setExpiry(t, V(af)),
            this.sendRequest({
              topic: t,
              method: "wc_sessionExtend",
              params: {},
              clientRpcId: i,
              throwOnFailedPublish: !0,
            }).catch((e) => {
              a(e);
            }),
            { acknowledged: s }
          );
        }),
        ak(this, "request", async (e) => {
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
              expiry: r = am.wc_sessionRequest.req.ttl,
            } = e,
            a = this.client.session.get(s);
          a?.transportType === i0 && (await this.confirmOnlineStateOrThrow());
          let n = (0, iU.I)(),
            o = (0, iU.f)().toString(),
            {
              done: c,
              resolve: l,
              reject: h,
            } = q(r, "Request expired. Please try again.");
          this.events.once(
            K("session_request", n),
            ({ error: e, result: t }) => {
              e ? h(e) : l(t);
            },
          );
          let u = "wc_sessionRequest",
            d = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
          if (d)
            return (
              await this.sendRequest({
                clientRpcId: n,
                relayRpcId: o,
                topic: s,
                method: u,
                params: {
                  request: aA(aT({}, i), aP({ expiryTimestamp: V(r) })),
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
                id: n,
              }),
              await c()
            );
          let p = {
              request: aA(aT({}, i), aP({ expiryTimestamp: V(r) })),
              chainId: t,
            },
            g = this.shouldSetTVF(u, p);
          return await Promise.all([
            new Promise(async (e) => {
              (await this.sendRequest(
                aT(
                  {
                    clientRpcId: n,
                    relayRpcId: o,
                    topic: s,
                    method: u,
                    params: p,
                    expiry: r,
                    throwOnFailedPublish: !0,
                  },
                  g && { tvf: this.getTVFParams(n, p) },
                ),
              ).catch((e) => h(e)),
                this.client.events.emit("session_request_sent", {
                  topic: s,
                  request: i,
                  chainId: t,
                  id: n,
                }),
                e());
            }),
            new Promise(async (e) => {
              var t;
              if (!(null != (t = a.sessionConfig) && t.disableDeepLink)) {
                let e = await Y(this.client.core.storage, ap);
                await G({ id: n, topic: s, wcDeepLink: e });
              }
              e();
            }),
            c(),
          ]).then((e) => e[2]);
        }),
        ak(this, "respond", async (e) => {
          (this.isInitialized(), await this.isValidRespond(e));
          let { topic: t, response: i } = e,
            { id: s } = i,
            r = this.client.session.get(t);
          r.transportType === i0 && (await this.confirmOnlineStateOrThrow());
          let a = this.getAppLinkIfEnabled(r.peer.metadata, r.transportType);
          ((0, iD.t)(i)
            ? await this.sendResult({
                id: s,
                topic: t,
                result: i.result,
                throwOnFailedPublish: !0,
                appLink: a,
              })
            : (0, iD.x)(i) &&
              (await this.sendError({
                id: s,
                topic: t,
                error: i.error,
                appLink: a,
              })),
            this.cleanupAfterResponse(e));
        }),
        ak(this, "ping", async (e) => {
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
            let e = (0, iU.I)(),
              i = (0, iU.f)().toString(),
              { done: s, resolve: r, reject: a } = q();
            (this.events.once(K("session_ping", e), ({ error: e }) => {
              e ? a(e) : r();
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
        ak(this, "emit", async (e) => {
          (this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidEmit(e));
          let { topic: t, event: i, chainId: s } = e,
            r = (0, iU.f)().toString(),
            a = (0, iU.I)();
          await this.sendRequest({
            topic: t,
            method: "wc_sessionEvent",
            params: { event: i, chainId: s },
            throwOnFailedPublish: !0,
            relayRpcId: r,
            clientRpcId: a,
          });
        }),
        ak(this, "disconnect", async (e) => {
          (this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidDisconnect(e));
          let { topic: t } = e;
          if (this.client.session.keys.includes(t))
            (await this.sendRequest({
              topic: t,
              method: "wc_sessionDelete",
              params: ip("USER_DISCONNECTED"),
              throwOnFailedPublish: !0,
            }),
              await this.deleteSession({ topic: t, emitEvent: !1 }));
          else if (this.client.core.pairing.pairings.keys.includes(t))
            await this.client.core.pairing.disconnect({ topic: t });
          else {
            let { message: e } = id(
              "MISMATCHED_TOPIC",
              `Session or pairing topic not found: ${t}`,
            );
            throw Error(e);
          }
        }),
        ak(
          this,
          "find",
          (e) => (
            this.isInitialized(),
            this.client.session.getAll().filter((t) =>
              (function (e, t) {
                let { requiredNamespaces: i } = t,
                  s = Object.keys(e.namespaces),
                  r = Object.keys(i),
                  a = !0;
                return (
                  !!j(r, s) &&
                  (s.forEach((t) => {
                    let {
                        accounts: s,
                        methods: r,
                        events: n,
                      } = e.namespaces[t],
                      o = ia(s),
                      c = i[t];
                    (j(P(t, c), o) && j(c.methods, r) && j(c.events, n)) ||
                      (a = !1);
                  }),
                  a)
                );
              })(t, e),
            )
          ),
        ),
        ak(this, "getPendingSessionRequests", () =>
          this.client.pendingRequest.getAll(),
        ),
        ak(this, "authenticate", async (e, t) => {
          var i, s, r, a, n;
          let o;
          (this.isInitialized(), this.isValidAuthenticate(e));
          let c =
              t &&
              this.client.core.linkModeSupportedApps.includes(t) &&
              (null == (i = this.client.metadata.redirect)
                ? void 0
                : i.linkMode),
            l = c ? iZ : i0;
          l === i0 && (await this.confirmOnlineStateOrThrow());
          let {
              chains: h,
              statement: u = "",
              uri: d,
              domain: p,
              nonce: g,
              type: f,
              exp: m,
              nbf: w,
              methods: y = [],
              expiry: b,
            } = e,
            v = [...(e.resources || [])],
            { topic: I, uri: E } = await this.client.core.pairing.create({
              methods: ["wc_sessionAuthenticate"],
              transportType: l,
            });
          this.client.logger.info({
            message: "Generated new pairing",
            pairing: { topic: I, uri: E },
          });
          let C = await this.client.core.crypto.generateKeyPair(),
            S = t2(C);
          if (
            (await Promise.all([
              this.client.auth.authKeys.set(aC, {
                responseTopic: S,
                publicKey: C,
              }),
              this.client.auth.pairingTopics.set(S, {
                topic: S,
                pairingTopic: I,
              }),
            ]),
            await this.client.core.relayer.subscribe(S, { transportType: l }),
            this.client.logger.info(
              `sending request to new pairing topic: ${I}`,
            ),
            y.length > 0)
          ) {
            let e,
              t,
              { namespace: i } = A(h[0]),
              o = eG(
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
                })(i, "request", y),
              );
            (eQ(v) &&
              ((s = o),
              (r = v.pop()),
              (o = eG(
                ((a = eY(s)),
                (n = eY(r)),
                eW(a),
                eW(n),
                (e = Object.keys(a.att)
                  .concat(Object.keys(n.att))
                  .sort((e, t) => e.localeCompare(t))),
                (t = { att: {} }),
                e.forEach((e) => {
                  var i, s;
                  Object.keys((null == (i = a.att) ? void 0 : i[e]) || {})
                    .concat(
                      Object.keys((null == (s = n.att) ? void 0 : s[e]) || {}),
                    )
                    .sort((e, t) => e.localeCompare(t))
                    .forEach((i) => {
                      var s, r;
                      t.att[e] = eL(
                        ((e, t) => {
                          for (var i in t || (t = {}))
                            eM.call(t, i) && eB(e, i, t[i]);
                          if (e$)
                            for (var i of e$(t))
                              eq.call(t, i) && eB(e, i, t[i]);
                          return e;
                        })({}, t.att[e]),
                        ej({
                          [i]:
                            (null == (s = a.att[e]) ? void 0 : s[i]) ||
                            (null == (r = n.att[e]) ? void 0 : r[i]),
                        }),
                      );
                    });
                }),
                t),
              ))),
              v.push(o));
          }
          let P =
              b && b > am.wc_sessionAuthenticate.req.ttl
                ? b
                : am.wc_sessionAuthenticate.req.ttl,
            N = {
              authPayload: {
                type: f ?? "caip122",
                chains: h,
                statement: u,
                aud: d,
                domain: p,
                version: "1",
                nonce: g,
                iat: new Date().toISOString(),
                exp: m,
                nbf: w,
                resources: v,
              },
              requester: { publicKey: C, metadata: this.client.metadata },
              expiryTimestamp: V(P),
            },
            _ = {
              requiredNamespaces: {},
              optionalNamespaces: {
                eip155: {
                  chains: h,
                  methods: [...new Set(["personal_sign", ...y])],
                  events: ["chainChanged", "accountsChanged"],
                },
              },
              relays: [{ protocol: "irn" }],
              pairingTopic: I,
              proposer: { publicKey: C, metadata: this.client.metadata },
              expiryTimestamp: V(am.wc_sessionPropose.req.ttl),
              id: (0, iU.I)(),
            },
            { done: x, resolve: O, reject: T } = q(P, "Request expired"),
            k = (0, iU.I)(),
            R = K("session_connect", _.id),
            U = K("session_request", k),
            D = async ({ error: e, session: t }) => {
              (this.events.off(U, L), e ? T(e) : t && O({ session: t }));
            },
            L = async (e) => {
              var i, s, r;
              let a;
              if (
                (await this.deletePendingAuthRequest(k, {
                  message: "fulfilled",
                  code: 0,
                }),
                e.error)
              ) {
                let t = ip("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
                return e.error.code === t.code
                  ? void 0
                  : (this.events.off(R, D), T(e.error.message));
              }
              (await this.deleteProposal(_.id), this.events.off(R, D));
              let { cacaos: n, responder: o } = e.result,
                c = [],
                h = [];
              for (let e of n) {
                (await eF({
                  cacao: e,
                  projectId: this.client.core.projectId,
                })) ||
                  (this.client.logger.error(e, "Signature verification failed"),
                  T(
                    ip(
                      "SESSION_SETTLEMENT_FAILED",
                      "Signature verification failed",
                    ),
                  ));
                let { p: t } = e,
                  i = eQ(t.resources),
                  s = [eH(t.iss)],
                  r = eV(t.iss);
                if (i) {
                  let e = eJ(i),
                    t = eX(i);
                  (c.push(...e), s.push(...t));
                }
                for (let e of s) h.push(`${e}:${r}`);
              }
              let u = await this.client.core.crypto.generateSharedKey(
                C,
                o.publicKey,
              );
              (c.length > 0 &&
                ((a = {
                  topic: u,
                  acknowledged: !0,
                  self: { publicKey: C, metadata: this.client.metadata },
                  peer: o,
                  controller: o.publicKey,
                  expiry: V(af),
                  requiredNamespaces: {},
                  optionalNamespaces: {},
                  relay: { protocol: "irn" },
                  pairingTopic: I,
                  namespaces: il([...new Set(c)], [...new Set(h)]),
                  transportType: l,
                }),
                await this.client.core.relayer.subscribe(u, {
                  transportType: l,
                }),
                await this.client.session.set(u, a),
                I &&
                  (await this.client.core.pairing.updateMetadata({
                    topic: I,
                    metadata: o.metadata,
                  })),
                (a = this.client.session.get(u))),
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
                  this.client.session.update(u, { transportType: iZ })),
                O({ auths: n, session: a }));
            };
          (this.events.once(R, D), this.events.once(U, L));
          try {
            if (c) {
              let e = (0, iU.i)("wc_sessionAuthenticate", N, k);
              this.client.core.history.set(I, e);
              let i = await this.client.core.crypto.encode("", e, {
                type: 2,
                encoding: tZ,
              });
              o = ir(t, I, i);
            } else
              await Promise.all([
                this.sendRequest({
                  topic: I,
                  method: "wc_sessionAuthenticate",
                  params: N,
                  expiry: e.expiry,
                  throwOnFailedPublish: !0,
                  clientRpcId: k,
                }),
                this.sendRequest({
                  topic: I,
                  method: "wc_sessionPropose",
                  params: _,
                  expiry: am.wc_sessionPropose.req.ttl,
                  throwOnFailedPublish: !0,
                  clientRpcId: _.id,
                }),
              ]);
          } catch (e) {
            throw (this.events.off(R, D), this.events.off(U, L), e);
          }
          return (
            await this.setProposal(_.id, _),
            await this.setAuthRequest(k, {
              request: aA(aT({}, N), aP({ verifyContext: {} })),
              pairingTopic: I,
              transportType: l,
            }),
            { uri: o ?? E, response: x }
          );
        }),
        ak(this, "approveSessionAuthenticate", async (e) => {
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
          let a = this.getPendingAuthRequest(i);
          if (!a)
            throw (
              r.setError("authenticated_session_pending_request_not_found"),
              Error(`Could not find pending auth request with id ${i}`)
            );
          let n = a.transportType || i0;
          n === i0 && (await this.confirmOnlineStateOrThrow());
          let o = a.requester.publicKey,
            c = await this.client.core.crypto.generateKeyPair(),
            l = t2(o),
            h = { type: 1, receiverPublicKey: o, senderPublicKey: c },
            u = [],
            d = [];
          for (let e of s) {
            if (
              !(await eF({ cacao: e, projectId: this.client.core.projectId }))
            ) {
              r.setError("invalid_cacao");
              let e = ip(
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
              s = eQ(t.resources),
              a = [eH(t.iss)],
              n = eV(t.iss);
            if (s) {
              let e = eJ(s),
                t = eX(s);
              (u.push(...e), a.push(...t));
            }
            for (let e of a) d.push(`${e}:${n}`);
          }
          let p = await this.client.core.crypto.generateSharedKey(c, o);
          if (
            (r.addTrace("create_authenticated_session_topic"), u?.length > 0)
          ) {
            ((t = {
              topic: p,
              acknowledged: !0,
              self: { publicKey: c, metadata: this.client.metadata },
              peer: { publicKey: o, metadata: a.requester.metadata },
              controller: o,
              expiry: V(af),
              authentication: s,
              requiredNamespaces: {},
              optionalNamespaces: {},
              relay: { protocol: "irn" },
              pairingTopic: a.pairingTopic,
              namespaces: il([...new Set(u)], [...new Set(d)]),
              transportType: n,
            }),
              r.addTrace("subscribing_authenticated_session_topic"));
            try {
              await this.client.core.relayer.subscribe(p, { transportType: n });
            } catch (e) {
              throw (
                r.setError("subscribe_authenticated_session_topic_failure"),
                e
              );
            }
            (r.addTrace("subscribe_authenticated_session_topic_success"),
              await this.client.session.set(p, t),
              r.addTrace("store_authenticated_session"),
              await this.client.core.pairing.updateMetadata({
                topic: a.pairingTopic,
                metadata: a.requester.metadata,
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
              appLink: this.getAppLinkIfEnabled(a.requester.metadata, n),
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
            await this.client.core.pairing.activate({ topic: a.pairingTopic }),
            this.client.core.eventClient.deleteEvent({ eventId: r.eventId }),
            { session: t }
          );
        }),
        ak(this, "rejectSessionAuthenticate", async (e) => {
          this.isInitialized();
          let { id: t, reason: i } = e,
            s = this.getPendingAuthRequest(t);
          if (!s)
            throw Error(`Could not find pending auth request with id ${t}`);
          s.transportType === i0 && (await this.confirmOnlineStateOrThrow());
          let r = s.requester.publicKey,
            a = await this.client.core.crypto.generateKeyPair(),
            n = t2(r);
          (await this.sendError({
            id: t,
            topic: n,
            error: i,
            encodeOpts: { type: 1, receiverPublicKey: r, senderPublicKey: a },
            rpcOpts: am.wc_sessionAuthenticate.reject,
            appLink: this.getAppLinkIfEnabled(
              s.requester.metadata,
              s.transportType,
            ),
          }),
            await this.client.auth.requests.delete(t, {
              message: "rejected",
              code: 0,
            }),
            await this.client.proposal.delete(t, ip("USER_DISCONNECTED")));
        }),
        ak(this, "formatAuthMessage", (e) => {
          this.isInitialized();
          let { request: t, iss: i } = e;
          return eK(t, i);
        }),
        ak(this, "processRelayMessageCache", () => {
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
        ak(this, "cleanupDuplicatePairings", async (e) => {
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
        ak(this, "deleteSession", async (e) => {
          var t;
          let {
              topic: i,
              expirerHasDeleted: s = !1,
              emitEvent: r = !0,
              id: a = 0,
            } = e,
            { self: n } = this.client.session.get(i);
          (await this.client.core.relayer.unsubscribe(i),
            await this.client.session.delete(i, ip("USER_DISCONNECTED")),
            this.addToRecentlyDeleted(i, "session"),
            this.client.core.crypto.keychain.has(n.publicKey) &&
              (await this.client.core.crypto.deleteKeyPair(n.publicKey)),
            this.client.core.crypto.keychain.has(i) &&
              (await this.client.core.crypto.deleteSymKey(i)),
            s || this.client.core.expirer.del(i),
            this.client.core.storage
              .removeItem(ap)
              .catch((e) => this.client.logger.warn(e)),
            this.getPendingSessionRequests().forEach((e) => {
              e.topic === i &&
                this.deletePendingSessionRequest(e.id, ip("USER_DISCONNECTED"));
            }),
            i ===
              (null == (t = this.sessionRequestQueue.queue[0])
                ? void 0
                : t.topic) && (this.sessionRequestQueue.state = ay),
            r &&
              this.client.events.emit("session_delete", { id: a, topic: i }));
        }),
        ak(this, "deleteProposal", async (e, t) => {
          if (t)
            try {
              let t = this.client.proposal.get(e),
                i = this.client.core.eventClient.getEvent({
                  topic: t.pairingTopic,
                });
              i?.setError("proposal_expired");
            } catch {}
          (await Promise.all([
            this.client.proposal.delete(e, ip("USER_DISCONNECTED")),
            t ? Promise.resolve() : this.client.core.expirer.del(e),
          ]),
            this.addToRecentlyDeleted(e, "proposal"));
        }),
        ak(this, "deletePendingSessionRequest", async (e, t, i = !1) => {
          (await Promise.all([
            this.client.pendingRequest.delete(e, t),
            i ? Promise.resolve() : this.client.core.expirer.del(e),
          ]),
            this.addToRecentlyDeleted(e, "request"),
            (this.sessionRequestQueue.queue =
              this.sessionRequestQueue.queue.filter((t) => t.id !== e)),
            i &&
              ((this.sessionRequestQueue.state = ay),
              this.client.events.emit("session_request_expire", { id: e })));
        }),
        ak(this, "deletePendingAuthRequest", async (e, t, i = !1) => {
          await Promise.all([
            this.client.auth.requests.delete(e, t),
            i ? Promise.resolve() : this.client.core.expirer.del(e),
          ]);
        }),
        ak(this, "setExpiry", async (e, t) => {
          this.client.session.keys.includes(e) &&
            (this.client.core.expirer.set(e, t),
            await this.client.session.update(e, { expiry: t }));
        }),
        ak(this, "setProposal", async (e, t) => {
          (this.client.core.expirer.set(e, V(am.wc_sessionPropose.req.ttl)),
            await this.client.proposal.set(e, t));
        }),
        ak(this, "setAuthRequest", async (e, t) => {
          let { request: i, pairingTopic: s, transportType: r = i0 } = t;
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
        ak(this, "setPendingSessionRequest", async (e) => {
          let { id: t, topic: i, params: s, verifyContext: r } = e,
            a = s.request.expiryTimestamp || V(am.wc_sessionRequest.req.ttl);
          (this.client.core.expirer.set(t, a),
            await this.client.pendingRequest.set(t, {
              id: t,
              topic: i,
              params: s,
              verifyContext: r,
            }));
        }),
        ak(this, "sendRequest", async (t) => {
          let i,
            s,
            {
              topic: r,
              method: a,
              params: n,
              expiry: o,
              relayRpcId: c,
              clientRpcId: l,
              throwOnFailedPublish: h,
              appLink: u,
              tvf: d,
            } = t,
            p = (0, iU.i)(a, n, l),
            g = !!u;
          try {
            let e = g ? tZ : tQ;
            i = await this.client.core.crypto.encode(r, p, { encoding: e });
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendRequest() -> core.crypto.encode() for topic ${r} failed`,
              ),
              e
            );
          }
          if (aI.includes(a)) {
            let e = t5(JSON.stringify(p)),
              t = t5(i);
            s = await this.client.core.verify.register({
              id: t,
              decryptedId: e,
            });
          }
          let f = am[a].req;
          if (
            ((f.attestation = s),
            o && (f.ttl = o),
            c && (f.id = c),
            this.client.core.history.set(r, p),
            g)
          ) {
            let t = ir(u, r, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e,
              t = am[a].req;
            (o && (t.ttl = o),
              c && (t.id = c),
              (t.tvf = aA(aT({}, d), aP({ correlationId: p.id }))),
              h
                ? ((e = aT({}, t.internal)),
                  (t.internal = aA(e, aP({ throwOnFailedPublish: !0 }))),
                  await this.client.core.relayer.publish(r, i, t))
                : this.client.core.relayer
                    .publish(r, i, t)
                    .catch((e) => this.client.logger.error(e)));
          }
          return p.id;
        }),
        ak(this, "sendResult", async (t) => {
          let i,
            s,
            r,
            {
              id: a,
              topic: n,
              result: o,
              throwOnFailedPublish: c,
              encodeOpts: l,
              appLink: h,
            } = t,
            u = (0, iU.P)(a, o),
            d = h && "u" > typeof (null == e.g ? void 0 : e.g.Linking);
          try {
            let e,
              t,
              s = d ? tZ : tQ;
            i = await this.client.core.crypto.encode(
              n,
              u,
              ((e = aT({}, l || {})), (t = { encoding: s }), aA(e, aP(t))),
            );
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendResult() -> core.crypto.encode() for topic ${n} failed`,
              ),
              e
            );
          }
          try {
            let e = (s = await this.client.core.history.get(n, a)).request;
            try {
              this.shouldSetTVF(e.method, e.params) &&
                (r = this.getTVFParams(a, e.params, o));
            } catch (e) {
              this.client.logger.warn(
                "sendResult() -> getTVFParams() failed",
                e,
              );
            }
          } catch (e) {
            throw (
              this.client.logger.error(
                `sendResult() -> history.get(${n}, ${a}) failed`,
              ),
              e
            );
          }
          if (d) {
            let t = ir(h, n, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e,
              t = am[s.request.method].res;
            ((t.tvf = aA(aT({}, r), aP({ correlationId: a }))),
              c
                ? ((e = aT({}, t.internal)),
                  (t.internal = aA(e, aP({ throwOnFailedPublish: !0 }))),
                  await this.client.core.relayer.publish(n, i, t))
                : this.client.core.relayer
                    .publish(n, i, t)
                    .catch((e) => this.client.logger.error(e)));
          }
          await this.client.core.history.resolve(u);
        }),
        ak(this, "sendError", async (t) => {
          let i,
            s,
            {
              id: r,
              topic: a,
              error: n,
              encodeOpts: o,
              rpcOpts: c,
              appLink: l,
            } = t,
            h = (0, iU.U)(r, n),
            u = l && "u" > typeof (null == e.g ? void 0 : e.g.Linking);
          try {
            let e,
              t,
              s = u ? tZ : tQ;
            i = await this.client.core.crypto.encode(
              a,
              h,
              ((e = aT({}, o || {})), (t = { encoding: s }), aA(e, aP(t))),
            );
          } catch (e) {
            throw (
              await this.cleanup(),
              this.client.logger.error(
                `sendError() -> core.crypto.encode() for topic ${a} failed`,
              ),
              e
            );
          }
          try {
            s = await this.client.core.history.get(a, r);
          } catch (e) {
            throw (
              this.client.logger.error(
                `sendError() -> history.get(${a}, ${r}) failed`,
              ),
              e
            );
          }
          if (u) {
            let t = ir(l, a, i);
            await e.g.Linking.openURL(t, this.client.name);
          } else {
            let e = s.request.method,
              t = c || am[e].res;
            this.client.core.relayer.publish(a, i, t);
          }
          await this.client.core.history.resolve(h);
        }),
        ak(this, "cleanup", async () => {
          let e = [],
            t = [];
          (this.client.session.getAll().forEach((t) => {
            let i = !1;
            (F(t.expiry) && (i = !0),
              this.client.core.crypto.keychain.has(t.topic) || (i = !0),
              i && e.push(t.topic));
          }),
            this.client.proposal.getAll().forEach((e) => {
              F(e.expiryTimestamp) && t.push(e.id);
            }),
            await Promise.all([
              ...e.map((e) => this.deleteSession({ topic: e })),
              ...t.map((e) => this.deleteProposal(e)),
            ]));
        }),
        ak(this, "onProviderMessageEvent", async (e) => {
          !this.initialized || this.relayMessageCache.length > 0
            ? this.relayMessageCache.push(e)
            : await this.onRelayMessage(e);
        }),
        ak(this, "onRelayEventRequest", async (e) => {
          (this.requestQueue.queue.push(e), await this.processRequestsQueue());
        }),
        ak(this, "processRequestsQueue", async () => {
          if (this.requestQueue.state === ab)
            return void this.client.logger.info(
              "Request queue already active, skipping...",
            );
          for (
            this.client.logger.info(
              `Request queue starting with ${this.requestQueue.queue.length} requests`,
            );
            this.requestQueue.queue.length > 0;

          ) {
            this.requestQueue.state = ab;
            let e = this.requestQueue.queue.shift();
            if (e)
              try {
                await this.processRequest(e);
              } catch (e) {
                this.client.logger.warn(e);
              }
          }
          this.requestQueue.state = ay;
        }),
        ak(this, "processRequest", async (e) => {
          let {
              topic: t,
              payload: i,
              attestation: s,
              transportType: r,
              encryptedId: a,
            } = e,
            n = i.method;
          if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: n }))
            switch (n) {
              case "wc_sessionPropose":
                return await this.onSessionProposeRequest({
                  topic: t,
                  payload: i,
                  attestation: s,
                  encryptedId: a,
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
                  encryptedId: a,
                  transportType: r,
                });
              case "wc_sessionEvent":
                return await this.onSessionEventRequest(t, i);
              case "wc_sessionAuthenticate":
                return await this.onSessionAuthenticateRequest({
                  topic: t,
                  payload: i,
                  attestation: s,
                  encryptedId: a,
                  transportType: r,
                });
              default:
                return this.client.logger.info(
                  `Unsupported request method ${n}`,
                );
            }
        }),
        ak(this, "onRelayEventResponse", async (e) => {
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
        ak(this, "onRelayEventUnknownPayload", (e) => {
          let { topic: t } = e,
            { message: i } = id(
              "MISSING_OR_INVALID",
              `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`,
            );
          throw Error(i);
        }),
        ak(this, "shouldIgnorePairingRequest", (e) => {
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
        ak(this, "onSessionProposeRequest", async (e) => {
          let { topic: t, payload: i, attestation: s, encryptedId: r } = e,
            { params: a, id: n } = i;
          try {
            let e = this.client.core.eventClient.getEvent({ topic: t });
            (0 === this.client.events.listenerCount("session_proposal") &&
              (console.warn("No listener for session_proposal event"),
              e?.setError("proposal_listener_not_found")),
              this.isValidConnect(aT({}, i.params)));
            let o = a.expiryTimestamp || V(am.wc_sessionPropose.req.ttl),
              c = aT({ id: n, pairingTopic: t, expiryTimestamp: o }, a);
            await this.setProposal(n, c);
            let l = await this.getVerifyContext({
              attestationId: s,
              hash: t5(JSON.stringify(i)),
              encryptedId: r,
              metadata: c.proposer.metadata,
            });
            (e?.addTrace("emit_session_proposal"),
              this.client.events.emit("session_proposal", {
                id: n,
                params: c,
                verifyContext: l,
              }));
          } catch (e) {
            (await this.sendError({
              id: n,
              topic: t,
              error: e,
              rpcOpts: am.wc_sessionPropose.autoReject,
            }),
              this.client.logger.error(e));
          }
        }),
        ak(this, "onSessionProposeResponse", async (e, t, i) => {
          let { id: s } = t;
          if ((0, iD.t)(t)) {
            let { result: r } = t;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              result: r,
            });
            let a = this.client.proposal.get(s);
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              proposal: a,
            });
            let n = a.proposer.publicKey;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              selfPublicKey: n,
            });
            let o = r.responderPublicKey;
            this.client.logger.trace({
              type: "method",
              method: "onSessionProposeResponse",
              peerPublicKey: o,
            });
            let c = await this.client.core.crypto.generateSharedKey(n, o);
            this.pendingSessions.set(s, {
              sessionTopic: c,
              pairingTopic: e,
              proposalId: s,
              publicKey: n,
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
          } else if ((0, iD.x)(t)) {
            await this.client.proposal.delete(s, ip("USER_DISCONNECTED"));
            let e = K("session_connect", s);
            if (0 === this.events.listenerCount(e))
              throw Error(`emitting ${e} without any listeners, 954`);
            this.events.emit(e, { error: t.error });
          }
        }),
        ak(this, "onSessionSettleRequest", async (e, t) => {
          let { id: i, params: s } = t;
          try {
            let i, r;
            this.isValidSessionSettleRequest(s);
            let {
                relay: a,
                controller: n,
                expiry: o,
                namespaces: c,
                sessionProperties: l,
                scopedProperties: h,
                sessionConfig: u,
              } = t.params,
              d = [...this.pendingSessions.values()].find(
                (t) => t.sessionTopic === e,
              );
            if (!d)
              return this.client.logger.error(
                `Pending session not found for topic ${e}`,
              );
            let p = this.client.proposal.get(d.proposalId),
              g =
                ((i = aT(
                  aT(
                    aT(
                      {
                        topic: e,
                        relay: a,
                        expiry: o,
                        namespaces: c,
                        acknowledged: !0,
                        pairingTopic: d.pairingTopic,
                        requiredNamespaces: p.requiredNamespaces,
                        optionalNamespaces: p.optionalNamespaces,
                        controller: n.publicKey,
                        self: {
                          publicKey: d.publicKey,
                          metadata: this.client.metadata,
                        },
                        peer: { publicKey: n.publicKey, metadata: n.metadata },
                      },
                      l && { sessionProperties: l },
                    ),
                    h && { scopedProperties: h },
                  ),
                  u && { sessionConfig: u },
                )),
                (r = { transportType: i0 }),
                aA(i, aP(r)));
            (await this.client.session.set(g.topic, g),
              await this.setExpiry(g.topic, g.expiry),
              await this.client.core.pairing.updateMetadata({
                topic: d.pairingTopic,
                metadata: g.peer.metadata,
              }),
              this.client.events.emit("session_connect", { session: g }),
              this.events.emit(K("session_connect", d.proposalId), {
                session: g,
              }),
              this.pendingSessions.delete(d.proposalId),
              this.deleteProposal(d.proposalId, !1),
              this.cleanupDuplicatePairings(g),
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
        ak(this, "onSessionSettleResponse", async (e, t) => {
          let { id: i } = t;
          (0, iD.t)(t)
            ? (await this.client.session.update(e, { acknowledged: !0 }),
              this.events.emit(K("session_approve", i), {}))
            : (0, iD.x)(t) &&
              (await this.client.session.delete(e, ip("USER_DISCONNECTED")),
              this.events.emit(K("session_approve", i), { error: t.error }));
        }),
        ak(this, "onSessionUpdateRequest", async (e, t) => {
          let { params: i, id: s } = t;
          try {
            let t = `${e}_session_update`,
              r = ik.get(t);
            if (r && this.isRequestOutOfSync(r, s)) {
              (this.client.logger.warn(`Discarding out of sync request - ${s}`),
                this.sendError({
                  id: s,
                  topic: e,
                  error: ip("INVALID_UPDATE_REQUEST"),
                }));
              return;
            }
            this.isValidUpdate(aT({ topic: e }, i));
            try {
              (ik.set(t, s),
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
              throw (ik.delete(t), e);
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
        ak(
          this,
          "isRequestOutOfSync",
          (e, t) => t.toString().slice(0, -3) < e.toString().slice(0, -3),
        ),
        ak(this, "onSessionUpdateResponse", (e, t) => {
          let { id: i } = t,
            s = K("session_update", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, iD.t)(t)
            ? this.events.emit(K("session_update", i), {})
            : (0, iD.x)(t) &&
              this.events.emit(K("session_update", i), { error: t.error });
        }),
        ak(this, "onSessionExtendRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidExtend({ topic: e }),
              await this.setExpiry(e, V(af)),
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
        ak(this, "onSessionExtendResponse", (e, t) => {
          let { id: i } = t,
            s = K("session_extend", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, iD.t)(t)
            ? this.events.emit(K("session_extend", i), {})
            : (0, iD.x)(t) &&
              this.events.emit(K("session_extend", i), { error: t.error });
        }),
        ak(this, "onSessionPingRequest", async (e, t) => {
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
        ak(this, "onSessionPingResponse", (e, t) => {
          let { id: i } = t,
            s = K("session_ping", i);
          setTimeout(() => {
            if (0 === this.events.listenerCount(s))
              throw Error(`emitting ${s} without any listeners 2176`);
            (0, iD.t)(t)
              ? this.events.emit(K("session_ping", i), {})
              : (0, iD.x)(t) &&
                this.events.emit(K("session_ping", i), { error: t.error });
          }, 500);
        }),
        ak(this, "onSessionDeleteRequest", async (e, t) => {
          let { id: i } = t;
          try {
            (this.isValidDisconnect({ topic: e, reason: t.params }),
              Promise.all([
                new Promise((t) => {
                  this.client.core.relayer.once(iW, async () => {
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
                  error: ip("USER_DISCONNECTED"),
                }),
              ]).catch((e) => this.client.logger.error(e)));
          } catch (e) {
            this.client.logger.error(e);
          }
        }),
        ak(this, "onSessionRequest", async (e) => {
          var t, i, s;
          let {
              topic: r,
              payload: a,
              attestation: n,
              encryptedId: o,
              transportType: c,
            } = e,
            { id: l, params: h } = a;
          try {
            await this.isValidRequest(aT({ topic: r }, h));
            let e = this.client.session.get(r),
              a = await this.getVerifyContext({
                attestationId: n,
                hash: t5(JSON.stringify((0, iU.i)("wc_sessionRequest", h, l))),
                encryptedId: o,
                metadata: e.peer.metadata,
                transportType: c,
              }),
              u = { id: l, topic: r, params: h, verifyContext: a };
            (await this.setPendingSessionRequest(u),
              c === iZ &&
                null != (t = e.peer.metadata.redirect) &&
                t.universal &&
                this.client.core.addLinkModeSupportedApp(
                  null == (i = e.peer.metadata.redirect) ? void 0 : i.universal,
                ),
              null != (s = this.client.signConfig) && s.disableRequestQueue
                ? this.emitSessionRequest(u)
                : (this.addSessionRequestToSessionRequestQueue(u),
                  this.processSessionRequestQueue()));
          } catch (e) {
            (await this.sendError({ id: l, topic: r, error: e }),
              this.client.logger.error(e));
          }
        }),
        ak(this, "onSessionRequestResponse", (e, t) => {
          let { id: i } = t,
            s = K("session_request", i);
          if (0 === this.events.listenerCount(s))
            throw Error(`emitting ${s} without any listeners`);
          (0, iD.t)(t)
            ? this.events.emit(K("session_request", i), { result: t.result })
            : (0, iD.x)(t) &&
              this.events.emit(K("session_request", i), { error: t.error });
        }),
        ak(this, "onSessionEventRequest", async (e, t) => {
          let { id: i, params: s } = t;
          try {
            let t = `${e}_session_event_${s.event.name}`,
              r = ik.get(t);
            if (r && this.isRequestOutOfSync(r, i))
              return void this.client.logger.info(
                `Discarding out of sync request - ${i}`,
              );
            (this.isValidEmit(aT({ topic: e }, s)),
              this.client.events.emit("session_event", {
                id: i,
                topic: e,
                params: s,
              }),
              ik.set(t, i));
          } catch (t) {
            (await this.sendError({ id: i, topic: e, error: t }),
              this.client.logger.error(t));
          }
        }),
        ak(this, "onSessionAuthenticateResponse", (e, t) => {
          let { id: i } = t;
          (this.client.logger.trace({
            type: "method",
            method: "onSessionAuthenticateResponse",
            topic: e,
            payload: t,
          }),
            (0, iD.t)(t)
              ? this.events.emit(K("session_request", i), { result: t.result })
              : (0, iD.x)(t) &&
                this.events.emit(K("session_request", i), { error: t.error }));
        }),
        ak(this, "onSessionAuthenticateRequest", async (e) => {
          var t;
          let {
            topic: i,
            payload: s,
            attestation: r,
            encryptedId: a,
            transportType: n,
          } = e;
          try {
            let { requester: e, authPayload: o, expiryTimestamp: c } = s.params,
              l = await this.getVerifyContext({
                attestationId: r,
                hash: t5(JSON.stringify(s)),
                encryptedId: a,
                metadata: e.metadata,
                transportType: n,
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
              transportType: n,
            }),
              n === iZ &&
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
          } catch (a) {
            this.client.logger.error(a);
            let e = s.params.requester.publicKey,
              t = await this.client.core.crypto.generateKeyPair(),
              r = this.getAppLinkIfEnabled(s.params.requester.metadata, n);
            await this.sendError({
              id: s.id,
              topic: i,
              error: a,
              encodeOpts: { type: 1, receiverPublicKey: e, senderPublicKey: t },
              rpcOpts: am.wc_sessionAuthenticate.autoReject,
              appLink: r,
            });
          }
        }),
        ak(this, "addSessionRequestToSessionRequestQueue", (e) => {
          this.sessionRequestQueue.queue.push(e);
        }),
        ak(this, "cleanupAfterResponse", (e) => {
          (this.deletePendingSessionRequest(e.response.id, {
            message: "fulfilled",
            code: 0,
          }),
            setTimeout(
              () => {
                ((this.sessionRequestQueue.state = ay),
                  this.processSessionRequestQueue());
              },
              (0, u.toMiliseconds)(this.requestQueueDelay),
            ));
        }),
        ak(
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
                  let i = K("session_request", e.request.id);
                  if (0 === this.events.listenerCount(i))
                    throw Error(`emitting ${i} without any listeners`);
                  this.events.emit(K("session_request", e.request.id), {
                    error: t,
                  });
                });
          },
        ),
        ak(this, "processSessionRequestQueue", () => {
          if (this.sessionRequestQueue.state === ab)
            return void this.client.logger.info(
              "session request queue is already active.",
            );
          let e = this.sessionRequestQueue.queue[0];
          if (!e)
            return void this.client.logger.info(
              "session request queue is empty.",
            );
          try {
            ((this.sessionRequestQueue.state = ab), this.emitSessionRequest(e));
          } catch (e) {
            this.client.logger.error(e);
          }
        }),
        ak(this, "emitSessionRequest", (e) => {
          this.client.events.emit("session_request", e);
        }),
        ak(this, "onPairingCreated", (e) => {
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
              payload: (0, iU.i)(
                "wc_sessionPropose",
                aA(
                  aT({}, t),
                  aP({
                    requiredNamespaces: t.requiredNamespaces,
                    optionalNamespaces: t.optionalNamespaces,
                    relays: t.relays,
                    proposer: t.proposer,
                    sessionProperties: t.sessionProperties,
                    scopedProperties: t.scopedProperties,
                  }),
                ),
                t.id,
              ),
            });
        }),
        ak(this, "isValidConnect", async (e) => {
          let t;
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `connect() params: ${JSON.stringify(e)}`,
            );
            throw Error(t);
          }
          let {
            pairingTopic: i,
            requiredNamespaces: s,
            optionalNamespaces: r,
            sessionProperties: a,
            scopedProperties: n,
            relays: o,
          } = e;
          if (
            (iw(i) || (await this.isValidPairingTopic(i)),
            (t = !1),
            o
              ? o &&
                ig(o) &&
                o.length &&
                o.forEach((e) => {
                  t = iS(e);
                })
              : (t = !0),
            !t)
          ) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `connect() relays: ${o}`,
            );
            throw Error(e);
          }
          if (
            (iw(s) ||
              0 === im(s) ||
              this.validateNamespaces(s, "requiredNamespaces"),
            iw(r) ||
              0 === im(r) ||
              this.validateNamespaces(r, "optionalNamespaces"),
            iw(a) || this.validateSessionProps(a, "sessionProperties"),
            !iw(n))
          ) {
            this.validateSessionProps(n, "scopedProperties");
            let e = Object.keys(s || {}).concat(Object.keys(r || {}));
            if (!Object.keys(n).every((t) => e.includes(t)))
              throw Error(
                `Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(n)}, required/optional namespaces: ${JSON.stringify(e)}`,
              );
          }
        }),
        ak(this, "validateNamespaces", (e, t) => {
          let i = (function (e, t, i) {
            let s = null;
            if (e && im(e)) {
              let r,
                a = iE(e, t);
              a && (s = a);
              let n =
                ((r = null),
                Object.entries(e).forEach(([e, s]) => {
                  var a, n;
                  let o;
                  if (r) return;
                  let c =
                    ((a = P(e, s)),
                    (n = `${t} ${i}`),
                    (o = null),
                    ig(a) && a.length
                      ? a.forEach((e) => {
                          o ||
                            iv(e) ||
                            (o = ip(
                              "UNSUPPORTED_CHAINS",
                              `${n}, chain ${e} should be a string and conform to "namespace:chainId" format`,
                            ));
                        })
                      : iv(e) ||
                        (o = ip(
                          "UNSUPPORTED_CHAINS",
                          `${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`,
                        )),
                    o);
                  c && (r = c);
                }),
                r);
              n && (s = n);
            } else
              s = id(
                "MISSING_OR_INVALID",
                `${t}, ${i} should be an object with data`,
              );
            return s;
          })(e, "connect()", t);
          if (i) throw Error(i.message);
        }),
        ak(this, "isValidApprove", async (e) => {
          if (!iA(e))
            throw Error(
              id("MISSING_OR_INVALID", `approve() params: ${e}`).message,
            );
          let {
            id: t,
            namespaces: i,
            relayProtocol: s,
            sessionProperties: r,
            scopedProperties: a,
          } = e;
          (this.checkRecentlyDeleted(t), await this.isValidProposalId(t));
          let n = this.client.proposal.get(t),
            o = iC(i, "approve()");
          if (o) throw Error(o.message);
          let c = iN(n.requiredNamespaces, i, "approve()");
          if (c) throw Error(c.message);
          if (!iy(s, !0)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `approve() relayProtocol: ${s}`,
            );
            throw Error(e);
          }
          if (
            (iw(r) || this.validateSessionProps(r, "sessionProperties"), !iw(a))
          ) {
            this.validateSessionProps(a, "scopedProperties");
            let e = new Set(Object.keys(i));
            if (!Object.keys(a).every((t) => e.has(t)))
              throw Error(
                `Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(e).join(", ")}`,
              );
          }
        }),
        ak(this, "isValidReject", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
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
              !ib(i.code, !1) ||
              !i.message ||
              !iy(i.message, !1))
          ) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `reject() reason: ${JSON.stringify(i)}`,
            );
            throw Error(e);
          }
        }),
        ak(this, "isValidSessionSettleRequest", (e) => {
          let t;
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `onSessionSettleRequest() params: ${e}`,
            );
            throw Error(t);
          }
          let { relay: i, controller: s, namespaces: r, expiry: a } = e;
          if (!iS(i)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              "onSessionSettleRequest() relay protocol should be a string",
            );
            throw Error(e);
          }
          let n =
            ((t = null),
            iy(s?.publicKey, !1) ||
              (t = id(
                "MISSING_OR_INVALID",
                "onSessionSettleRequest() controller public key should be a string",
              )),
            t);
          if (n) throw Error(n.message);
          let o = iC(r, "onSessionSettleRequest()");
          if (o) throw Error(o.message);
          if (F(a)) {
            let { message: e } = id("EXPIRED", "onSessionSettleRequest()");
            throw Error(e);
          }
        }),
        ak(this, "isValidUpdate", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `update() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t, namespaces: i } = e;
          (this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t));
          let s = this.client.session.get(t),
            r = iC(i, "update()");
          if (r) throw Error(r.message);
          let a = iN(s.requiredNamespaces, i, "update()");
          if (a) throw Error(a.message);
        }),
        ak(this, "isValidExtend", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `extend() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          (this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t));
        }),
        ak(this, "isValidRequest", async (e) => {
          var t;
          let i;
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `request() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: s, request: r, chainId: a, expiry: n } = e;
          (this.checkRecentlyDeleted(s), await this.isValidSessionTopic(s));
          let { namespaces: o } = this.client.session.get(s);
          if (!iP(o, a)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `request() chainId: ${a}`,
            );
            throw Error(e);
          }
          if (iw(r) || !iy(r.method, !1)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `request() ${JSON.stringify(r)}`,
            );
            throw Error(e);
          }
          if (
            !(
              iy((t = r.method), !1) &&
              ((i = []),
              Object.values(o).forEach((e) => {
                ia(e.accounts).includes(a) && i.push(...e.methods);
              }),
              i).includes(t)
            )
          ) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `request() method: ${r.method}`,
            );
            throw Error(e);
          }
          if (n && (!ib(n, !1) || !(n <= aw.max) || !(n >= aw.min))) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `request() expiry: ${n}. Expiry must be a number (in seconds) between ${aw.min} and ${aw.max}`,
            );
            throw Error(e);
          }
        }),
        ak(this, "isValidRespond", async (e) => {
          var t;
          if (!iA(e)) {
            let { message: t } = id(
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
            iw(s) ||
            (iw(s.result) && iw(s.error)) ||
            !ib(s.id, !1) ||
            !iy(s.jsonrpc, !1)
          ) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `respond() response: ${JSON.stringify(s)}`,
            );
            throw Error(e);
          }
        }),
        ak(this, "isValidPing", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `ping() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidSessionOrPairingTopic(t);
        }),
        ak(this, "isValidEmit", async (e) => {
          var t;
          let i;
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `emit() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: s, event: r, chainId: a } = e;
          await this.isValidSessionTopic(s);
          let { namespaces: n } = this.client.session.get(s);
          if (!iP(n, a)) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `emit() chainId: ${a}`,
            );
            throw Error(e);
          }
          if (
            iw(r) ||
            !iy(r.name, !1) ||
            !(
              iy((t = r.name), !1) &&
              ((i = []),
              Object.values(n).forEach((e) => {
                ia(e.accounts).includes(a) && i.push(...e.events);
              }),
              i).includes(t)
            )
          ) {
            let { message: e } = id(
              "MISSING_OR_INVALID",
              `emit() event: ${JSON.stringify(r)}`,
            );
            throw Error(e);
          }
        }),
        ak(this, "isValidDisconnect", async (e) => {
          if (!iA(e)) {
            let { message: t } = id(
              "MISSING_OR_INVALID",
              `disconnect() params: ${e}`,
            );
            throw Error(t);
          }
          let { topic: t } = e;
          await this.isValidSessionOrPairingTopic(t);
        }),
        ak(this, "isValidAuthenticate", (e) => {
          let { chains: t, uri: i, domain: s, nonce: r } = e;
          if (!Array.isArray(t) || 0 === t.length)
            throw Error("chains is required and must be a non-empty array");
          if (!iy(i, !1)) throw Error("uri is required parameter");
          if (!iy(s, !1)) throw Error("domain is required parameter");
          if (!iy(r, !1)) throw Error("nonce is required parameter");
          if ([...new Set(t.map((e) => A(e).namespace))].length > 1)
            throw Error(
              "Multi-namespace requests are not supported. Please request single namespace only.",
            );
          let { namespace: a } = A(t[0]);
          if ("eip155" !== a)
            throw Error(
              "Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.",
            );
        }),
        ak(this, "getVerifyContext", async (e) => {
          let {
              attestationId: t,
              hash: i,
              encryptedId: s,
              metadata: r,
              transportType: a,
            } = e,
            n = {
              verified: {
                verifyUrl: r.verifyUrl || sr,
                validation: "UNKNOWN",
                origin: r.url || "",
              },
            };
          try {
            if (a === iZ) {
              let e = this.getAppLinkIfEnabled(r, a);
              return (
                (n.verified.validation =
                  e && new URL(e).origin === new URL(r.url).origin
                    ? "VALID"
                    : "INVALID"),
                n
              );
            }
            let e = await this.client.core.verify.resolve({
              attestationId: t,
              hash: i,
              encryptedId: s,
              verifyUrl: r.verifyUrl,
            });
            e &&
              ((n.verified.origin = e.origin),
              (n.verified.isScam = e.isScam),
              (n.verified.validation =
                e.origin === new URL(r.url).origin ? "VALID" : "INVALID"));
          } catch (e) {
            this.client.logger.warn(e);
          }
          return (
            this.client.logger.debug(`Verify context: ${JSON.stringify(n)}`),
            n
          );
        }),
        ak(this, "validateSessionProps", (e, t) => {
          Object.values(e).forEach((i, s) => {
            if (null == i) {
              let { message: r } = id(
                "MISSING_OR_INVALID",
                `${t} must contain an existing value for each key. Received: ${i} for key ${Object.keys(e)[s]}`,
              );
              throw Error(r);
            }
          });
        }),
        ak(this, "getPendingAuthRequest", (e) => {
          let t = this.client.auth.requests.get(e);
          return "object" == typeof t ? t : void 0;
        }),
        ak(this, "addToRecentlyDeleted", (e, t) => {
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
        ak(this, "checkRecentlyDeleted", (e) => {
          let t = this.recentlyDeletedMap.get(e);
          if (t) {
            let { message: i } = id(
              "MISSING_OR_INVALID",
              `Record was recently deleted - ${t}: ${e}`,
            );
            throw Error(i);
          }
        }),
        ak(this, "isLinkModeEnabled", (t, i) => {
          var s, r, a, n, o, c, l, h, u;
          return (
            !!t &&
            i === iZ &&
            (null ==
            (r = null == (s = this.client.metadata) ? void 0 : s.redirect)
              ? void 0
              : r.linkMode) === !0 &&
            (null ==
            (n = null == (a = this.client.metadata) ? void 0 : a.redirect)
              ? void 0
              : n.universal) !== void 0 &&
            (null ==
            (c = null == (o = this.client.metadata) ? void 0 : o.redirect)
              ? void 0
              : c.universal) !== "" &&
            (null == (l = t?.redirect) ? void 0 : l.universal) !== void 0 &&
            (null == (h = t?.redirect) ? void 0 : h.universal) !== "" &&
            (null == (u = t?.redirect) ? void 0 : u.linkMode) === !0 &&
            this.client.core.linkModeSupportedApps.includes(
              t.redirect.universal,
            ) &&
            "u" > typeof (null == e.g ? void 0 : e.g.Linking)
          );
        }),
        ak(this, "getAppLinkIfEnabled", (e, t) => {
          var i;
          return this.isLinkModeEnabled(e, t)
            ? null == (i = e?.redirect)
              ? void 0
              : i.universal
            : void 0;
        }),
        ak(this, "handleLinkModeMessage", ({ url: e }) => {
          if (!e || !e.includes("wc_ev") || !e.includes("topic")) return;
          let t = J(e, "topic") || "",
            i = decodeURIComponent(J(e, "wc_ev") || ""),
            s = this.client.session.keys.includes(t);
          (s && this.client.session.update(t, { transportType: iZ }),
            this.client.core.dispatchEnvelope({
              topic: t,
              message: i,
              sessionExists: s,
            }));
        }),
        ak(this, "registerLinkModeListeners", async () => {
          var t;
          if (
            Q() ||
            (T() && null != (t = this.client.metadata.redirect) && t.linkMode)
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
        ak(this, "shouldSetTVF", (e, t) => {
          if (!t || "wc_sessionRequest" !== e) return !1;
          let { request: i } = t;
          return Object.keys(av).includes(i.method);
        }),
        ak(this, "getTVFParams", (e, t, i) => {
          var s, r;
          try {
            let a,
              n,
              o = t.request.method,
              c = this.extractTxHashesFromResult(o, i);
            return (
              (a = aT(
                { correlationId: e, rpcMethods: [o], chainId: t.chainId },
                this.isValidContractData(t.request.params) && {
                  contractAddresses: [
                    null == (r = null == (s = t.request.params) ? void 0 : s[0])
                      ? void 0
                      : r.to,
                  ],
                },
              )),
              (n = { txHashes: c }),
              aA(a, aP(n))
            );
          } catch (e) {
            this.client.logger.warn("Error getting TVF params", e);
          }
          return {};
        }),
        ak(this, "isValidContractData", (e) => {
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
        ak(this, "extractTxHashesFromResult", (e, t) => {
          try {
            let i = av[e];
            if ("string" == typeof t) return [t];
            let s = t[i.key];
            if (ig(s))
              return "solana_signAllTransactions" === e
                ? s.map((e) =>
                    (function (e) {
                      let t = atob(e),
                        i = new Uint8Array(t.length);
                      for (let e = 0; e < t.length; e++) i[e] = t.charCodeAt(e);
                      let s = i[0];
                      if (0 === s) throw Error("No signatures found");
                      if (i.length < 1 + 64 * s)
                        throw Error(
                          "Transaction data too short for claimed signature count",
                        );
                      if (i.length < 100) throw Error("Transaction too short");
                      let a = r.Buffer.from(e, "base64").slice(1, 65);
                      return b.f.encode(a);
                    })(e),
                  )
                : s;
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
    async processPendingMessageEvents() {
      try {
        let e = this.client.session.keys,
          t = this.client.core.relayer.messages.getWithoutAck(e);
        for (let [e, i] of Object.entries(t))
          for (let t of i)
            try {
              await this.onProviderMessageEvent({
                topic: e,
                message: t,
                publishedAt: Date.now(),
              });
            } catch {
              this.client.logger.warn(
                `Error processing pending message event for topic: ${e}, message: ${t}`,
              );
            }
      } catch (e) {
        this.client.logger.warn("processPendingMessageEvents failed", e);
      }
    }
    isInitialized() {
      if (!this.initialized) {
        let { message: e } = id("NOT_INITIALIZED", this.name);
        throw Error(e);
      }
    }
    async confirmOnlineStateOrThrow() {
      await this.client.core.relayer.confirmOnlineStateOrThrow();
    }
    registerRelayerEvents() {
      this.client.core.relayer.on(iV, (e) => {
        this.onProviderMessageEvent(e);
      });
    }
    async onRelayMessage(e) {
      let { topic: t, message: i, attestation: s, transportType: r } = e,
        { publicKey: a } = this.client.auth.authKeys.keys.includes(aC)
          ? this.client.auth.authKeys.get(aC)
          : { responseTopic: void 0, publicKey: void 0 };
      try {
        let e = await this.client.core.crypto.decode(t, i, {
          receiverPublicKey: a,
          encoding: r === iZ ? tZ : tQ,
        });
        ((0, iD.N)(e)
          ? (this.client.core.history.set(t, e),
            await this.onRelayEventRequest({
              topic: t,
              payload: e,
              attestation: s,
              transportType: r,
              encryptedId: t5(i),
            }))
          : (0, iD.Z)(e)
            ? (await this.client.core.history.resolve(e),
              await this.onRelayEventResponse({
                topic: t,
                payload: e,
                transportType: r,
              }),
              this.client.core.history.delete(t, e.id))
            : await this.onRelayEventUnknownPayload({
                topic: t,
                payload: e,
                transportType: r,
              }),
          await this.client.core.relayer.messages.ack(t, i));
      } catch (e) {
        this.client.logger.error(e);
      }
    }
    registerExpirerEvents() {
      this.client.core.expirer.on(ss, async (e) => {
        let { topic: t, id: i } = H(e.target);
        return i && this.client.pendingRequest.keys.includes(i)
          ? await this.deletePendingSessionRequest(i, id("EXPIRED"), !0)
          : i && this.client.auth.requests.keys.includes(i)
            ? await this.deletePendingAuthRequest(i, id("EXPIRED"), !0)
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
      (this.client.core.pairing.events.on(i6, (e) => this.onPairingCreated(e)),
        this.client.core.pairing.events.on(i4, (e) => {
          this.addToRecentlyDeleted(e.topic, "pairing");
        }));
    }
    isValidPairingTopic(e) {
      if (!iy(e, !1)) {
        let { message: t } = id(
          "MISSING_OR_INVALID",
          `pairing topic should be a string: ${e}`,
        );
        throw Error(t);
      }
      if (!this.client.core.pairing.pairings.keys.includes(e)) {
        let { message: t } = id(
          "NO_MATCHING_KEY",
          `pairing topic doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (F(this.client.core.pairing.pairings.get(e).expiry)) {
        let { message: t } = id("EXPIRED", `pairing topic: ${e}`);
        throw Error(t);
      }
    }
    async isValidSessionTopic(e) {
      if (!iy(e, !1)) {
        let { message: t } = id(
          "MISSING_OR_INVALID",
          `session topic should be a string: ${e}`,
        );
        throw Error(t);
      }
      if (
        (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e))
      ) {
        let { message: t } = id(
          "NO_MATCHING_KEY",
          `session topic doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (F(this.client.session.get(e).expiry)) {
        await this.deleteSession({ topic: e });
        let { message: t } = id("EXPIRED", `session topic: ${e}`);
        throw Error(t);
      }
      if (!this.client.core.crypto.keychain.has(e)) {
        let { message: t } = id(
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
      else if (iy(e, !1)) {
        let { message: t } = id(
          "NO_MATCHING_KEY",
          `session or pairing topic doesn't exist: ${e}`,
        );
        throw Error(t);
      } else {
        let { message: t } = id(
          "MISSING_OR_INVALID",
          `session or pairing topic should be a string: ${e}`,
        );
        throw Error(t);
      }
    }
    async isValidProposalId(e) {
      if ("number" != typeof e) {
        let { message: t } = id(
          "MISSING_OR_INVALID",
          `proposal id should be a number: ${e}`,
        );
        throw Error(t);
      }
      if (!this.client.proposal.keys.includes(e)) {
        let { message: t } = id(
          "NO_MATCHING_KEY",
          `proposal id doesn't exist: ${e}`,
        );
        throw Error(t);
      }
      if (F(this.client.proposal.get(e).expiryTimestamp)) {
        await this.deleteProposal(e);
        let { message: t } = id("EXPIRED", `proposal id: ${e}`);
        throw Error(t);
      }
    }
  }
  class aU extends rz {
    constructor(e, t) {
      (super(e, t, "proposal", ad), (this.core = e), (this.logger = t));
    }
  }
  class aD extends rz {
    constructor(e, t) {
      (super(e, t, "session", ad), (this.core = e), (this.logger = t));
    }
  }
  class aL extends rz {
    constructor(e, t) {
      (super(e, t, "request", ad, (e) => e.id),
        (this.core = e),
        (this.logger = t));
    }
  }
  class aj extends rz {
    constructor(e, t) {
      (super(e, t, "authKeys", aE, () => aC),
        (this.core = e),
        (this.logger = t));
    }
  }
  class a$ extends rz {
    constructor(e, t) {
      (super(e, t, "pairingTopics", aE), (this.core = e), (this.logger = t));
    }
  }
  class aM extends rz {
    constructor(e, t) {
      (super(e, t, "requests", aE, (e) => e.id),
        (this.core = e),
        (this.logger = t));
    }
  }
  var aq = Object.defineProperty,
    aB = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? aq(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class az {
    constructor(e, t) {
      ((this.core = e),
        (this.logger = t),
        aB(this, "authKeys"),
        aB(this, "pairingTopics"),
        aB(this, "requests"),
        (this.authKeys = new aj(this.core, this.logger)),
        (this.pairingTopics = new a$(this.core, this.logger)),
        (this.requests = new aM(this.core, this.logger)));
    }
    async init() {
      (await this.authKeys.init(),
        await this.pairingTopics.init(),
        await this.requests.init());
    }
  }
  var aH = Object.defineProperty,
    aV = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? aH(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class aF extends ah.W {
    constructor(e) {
      (super(e),
        aV(this, "protocol", "wc"),
        aV(this, "version", 2),
        aV(this, "name", au),
        aV(this, "metadata"),
        aV(this, "core"),
        aV(this, "logger"),
        aV(this, "events", new a.EventEmitter()),
        aV(this, "engine"),
        aV(this, "session"),
        aV(this, "proposal"),
        aV(this, "pendingRequest"),
        aV(this, "auth"),
        aV(this, "signConfig"),
        aV(this, "on", (e, t) => this.events.on(e, t)),
        aV(this, "once", (e, t) => this.events.once(e, t)),
        aV(this, "off", (e, t) => this.events.off(e, t)),
        aV(this, "removeListener", (e, t) => this.events.removeListener(e, t)),
        aV(this, "removeAllListeners", (e) =>
          this.events.removeAllListeners(e),
        ),
        aV(this, "connect", async (e) => {
          try {
            return await this.engine.connect(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "pair", async (e) => {
          try {
            return await this.engine.pair(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "approve", async (e) => {
          try {
            return await this.engine.approve(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "reject", async (e) => {
          try {
            return await this.engine.reject(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "update", async (e) => {
          try {
            return await this.engine.update(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "extend", async (e) => {
          try {
            return await this.engine.extend(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "request", async (e) => {
          try {
            return await this.engine.request(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "respond", async (e) => {
          try {
            return await this.engine.respond(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "ping", async (e) => {
          try {
            return await this.engine.ping(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "emit", async (e) => {
          try {
            return await this.engine.emit(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "disconnect", async (e) => {
          try {
            return await this.engine.disconnect(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "find", (e) => {
          try {
            return this.engine.find(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "getPendingSessionRequests", () => {
          try {
            return this.engine.getPendingSessionRequests();
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "authenticate", async (e, t) => {
          try {
            return await this.engine.authenticate(e, t);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "formatAuthMessage", (e) => {
          try {
            return this.engine.formatAuthMessage(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "approveSessionAuthenticate", async (e) => {
          try {
            return await this.engine.approveSessionAuthenticate(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        aV(this, "rejectSessionAuthenticate", async (e) => {
          try {
            return await this.engine.rejectSessionAuthenticate(e);
          } catch (e) {
            throw (this.logger.error(e.message), e);
          }
        }),
        (this.name = e?.name || au),
        (this.metadata = e?.metadata || D()),
        (this.signConfig = e?.signConfig));
      let t =
        "u" > typeof e?.logger && "string" != typeof e?.logger
          ? e.logger
          : (0, l.pino)((0, c.l)({ level: e?.logger || "error" }));
      ((this.core = e?.core || new al(e)),
        (this.logger = (0, c.v)(t, this.name)),
        (this.session = new aD(this.core, this.logger)),
        (this.proposal = new aU(this.core, this.logger)),
        (this.pendingRequest = new aL(this.core, this.logger)),
        (this.engine = new aR(this)),
        (this.auth = new az(this.core, this.logger)));
    }
    static async init(e) {
      let t = new aF(e);
      return (await t.initialize(), t);
    }
    get context() {
      return (0, c.u)(this.logger);
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
            (0, u.toMiliseconds)(u.ONE_SECOND),
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
  var aK = e.i(700545);
  let aW = "error",
    aG = "wc@2:universal_provider:",
    aY = "https://rpc.walletconnect.org/v1/",
    aJ = "generic",
    aX = `${aY}bundler`,
    aQ = "default_chain_changed";
  function aZ() {}
  function a0(e) {
    return null == e || ("object" != typeof e && "function" != typeof e);
  }
  function a1(e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
  }
  function a2(e) {
    return "object" == typeof e && null !== e;
  }
  function a5(e) {
    return Object.getOwnPropertySymbols(e).filter((t) =>
      Object.prototype.propertyIsEnumerable.call(e, t),
    );
  }
  function a3(e) {
    return null == e
      ? void 0 === e
        ? "[object Undefined]"
        : "[object Null]"
      : Object.prototype.toString.call(e);
  }
  let a8 = "[object String]",
    a6 = "[object Number]",
    a4 = "[object Boolean]",
    a9 = "[object Arguments]";
  function a7(e, t, i, s = new Map(), a) {
    let n = a?.(e, t, i, s);
    if (null != n) return n;
    if (a0(e)) return e;
    if (s.has(e)) return s.get(e);
    if (Array.isArray(e)) {
      let t = Array(e.length);
      s.set(e, t);
      for (let r = 0; r < e.length; r++) t[r] = a7(e[r], r, i, s, a);
      return (
        Object.hasOwn(e, "index") && (t.index = e.index),
        Object.hasOwn(e, "input") && (t.input = e.input),
        t
      );
    }
    if (e instanceof Date) return new Date(e.getTime());
    if (e instanceof RegExp) {
      let t = new RegExp(e.source, e.flags);
      return ((t.lastIndex = e.lastIndex), t);
    }
    if (e instanceof Map) {
      let t = new Map();
      for (let [r, n] of (s.set(e, t), e)) t.set(r, a7(n, r, i, s, a));
      return t;
    }
    if (e instanceof Set) {
      let t = new Set();
      for (let r of (s.set(e, t), e)) t.add(a7(r, void 0, i, s, a));
      return t;
    }
    if ("u" > typeof r.Buffer && r.Buffer.isBuffer(e)) return e.subarray();
    if (a1(e)) {
      let t = new (Object.getPrototypeOf(e).constructor)(e.length);
      s.set(e, t);
      for (let r = 0; r < e.length; r++) t[r] = a7(e[r], r, i, s, a);
      return t;
    }
    if (
      e instanceof ArrayBuffer ||
      ("u" > typeof SharedArrayBuffer && e instanceof SharedArrayBuffer)
    )
      return e.slice(0);
    if (e instanceof DataView) {
      let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
      return (s.set(e, t), ne(t, e, i, s, a), t);
    }
    if ("u" > typeof File && e instanceof File) {
      let t = new File([e], e.name, { type: e.type });
      return (s.set(e, t), ne(t, e, i, s, a), t);
    }
    if (e instanceof Blob) {
      let t = new Blob([e], { type: e.type });
      return (s.set(e, t), ne(t, e, i, s, a), t);
    }
    if (e instanceof Error) {
      let t = new e.constructor();
      return (
        s.set(e, t),
        (t.message = e.message),
        (t.name = e.name),
        (t.stack = e.stack),
        (t.cause = e.cause),
        ne(t, e, i, s, a),
        t
      );
    }
    if (
      "object" == typeof e &&
      (function (e) {
        switch (a3(e)) {
          case a9:
          case "[object Array]":
          case "[object ArrayBuffer]":
          case "[object DataView]":
          case a4:
          case "[object Date]":
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Map]":
          case a6:
          case "[object Object]":
          case "[object RegExp]":
          case "[object Set]":
          case a8:
          case "[object Symbol]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return !0;
          default:
            return !1;
        }
      })(e)
    ) {
      let t = Object.create(Object.getPrototypeOf(e));
      return (s.set(e, t), ne(t, e, i, s, a), t);
    }
    return e;
  }
  function ne(e, t, i = e, s, r) {
    let a = [...Object.keys(t), ...a5(t)];
    for (let n = 0; n < a.length; n++) {
      let o = a[n],
        c = Object.getOwnPropertyDescriptor(e, o);
      (null == c || c.writable) && (e[o] = a7(t[o], o, i, s, r));
    }
  }
  function nt(e) {
    var t;
    return (
      (t = (t, i, s, r) => {
        let a;
        if (null != a) return a;
        if ("object" == typeof e)
          switch (Object.prototype.toString.call(e)) {
            case a6:
            case a8:
            case a4: {
              let t = new e.constructor(e?.valueOf());
              return (ne(t, e), t);
            }
            case a9: {
              let t = {};
              return (
                ne(t, e),
                (t.length = e.length),
                (t[Symbol.iterator] = e[Symbol.iterator]),
                t
              );
            }
            default:
              return;
          }
      }),
      a7(e, void 0, e, new Map(), t)
    );
  }
  function ni(e) {
    return null !== e && "object" == typeof e && "[object Arguments]" === a3(e);
  }
  var ns = Object.defineProperty,
    nr = Object.defineProperties,
    na = Object.getOwnPropertyDescriptors,
    nn = Object.getOwnPropertySymbols,
    no = Object.prototype.hasOwnProperty,
    nc = Object.prototype.propertyIsEnumerable,
    nl = (e, t, i) =>
      t in e
        ? ns(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nh = (e, t) => {
      for (var i in t || (t = {})) no.call(t, i) && nl(e, i, t[i]);
      if (nn) for (var i of nn(t)) nc.call(t, i) && nl(e, i, t[i]);
      return e;
    },
    nu = (e, t) => nr(e, na(t));
  function nd(e, t, i) {
    var s;
    let r = A(e);
    return (
      (null == (s = t.rpcMap) ? void 0 : s[r.reference]) ||
      `${aY}?chainId=${r.namespace}:${r.reference}&projectId=${i}`
    );
  }
  function np(e) {
    return e.includes(":") ? e.split(":")[1] : e;
  }
  function ng(e) {
    return e.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
  }
  function nf(e = {}, t = {}) {
    return (function (e, ...t) {
      return (function (e, ...t) {
        let i = t.slice(0, -1),
          s = t[t.length - 1],
          a = e;
        for (let e = 0; e < i.length; e++)
          a = (function e(t, i, s, a) {
            if ((a0(t) && (t = Object(t)), null == i || "object" != typeof i))
              return t;
            if (a.has(i))
              return (function (e) {
                if (a0(e)) return e;
                if (
                  Array.isArray(e) ||
                  a1(e) ||
                  e instanceof ArrayBuffer ||
                  ("u" > typeof SharedArrayBuffer &&
                    e instanceof SharedArrayBuffer)
                )
                  return e.slice(0);
                let t = Object.getPrototypeOf(e),
                  i = t.constructor;
                if (e instanceof Date || e instanceof Map || e instanceof Set)
                  return new i(e);
                if (e instanceof RegExp) {
                  let t = new i(e);
                  return ((t.lastIndex = e.lastIndex), t);
                }
                if (e instanceof DataView) return new i(e.buffer.slice(0));
                if (e instanceof Error) {
                  let t = new i(e.message);
                  return (
                    (t.stack = e.stack),
                    (t.name = e.name),
                    (t.cause = e.cause),
                    t
                  );
                }
                return "u" > typeof File && e instanceof File
                  ? new i([e], e.name, {
                      type: e.type,
                      lastModified: e.lastModified,
                    })
                  : "object" == typeof e
                    ? Object.assign(Object.create(t), e)
                    : e;
              })(a.get(i));
            if ((a.set(i, t), Array.isArray(i))) {
              i = i.slice();
              for (let e = 0; e < i.length; e++) i[e] = i[e] ?? void 0;
            }
            let n = [...Object.keys(i), ...a5(i)];
            for (let o = 0; o < n.length; o++) {
              let c = n[o],
                l = i[c],
                h = t[c];
              if (
                (ni(l) && (l = { ...l }),
                ni(h) && (h = { ...h }),
                "u" > typeof r.Buffer && r.Buffer.isBuffer(l) && (l = nt(l)),
                Array.isArray(l))
              )
                if ("object" == typeof h && null != h) {
                  let e = [],
                    t = Reflect.ownKeys(h);
                  for (let i = 0; i < t.length; i++) {
                    let s = t[i];
                    e[s] = h[s];
                  }
                  h = e;
                } else h = [];
              let u = s(h, l, c, t, i, a);
              null != u
                ? (t[c] = u)
                : Array.isArray(l) || (a2(h) && a2(l))
                  ? (t[c] = e(h, l, s, a))
                  : null == h &&
                      (function (e) {
                        if ("object" != typeof e || null == e) return !1;
                        if (null === Object.getPrototypeOf(e)) return !0;
                        if (
                          "[object Object]" !==
                          Object.prototype.toString.call(e)
                        ) {
                          let t = e[Symbol.toStringTag];
                          return (
                            null != t &&
                            !!Object.getOwnPropertyDescriptor(
                              e,
                              Symbol.toStringTag,
                            )?.writable &&
                            e.toString() === `[object ${t}]`
                          );
                        }
                        let t = e;
                        for (; null !== Object.getPrototypeOf(t); )
                          t = Object.getPrototypeOf(t);
                        return Object.getPrototypeOf(e) === t;
                      })(l)
                    ? (t[c] = e({}, l, s, a))
                    : null == h && a1(l)
                      ? (t[c] = nt(l))
                      : (void 0 === h || void 0 !== l) && (t[c] = l);
            }
            return t;
          })(a, i[e], s, new Map());
        return a;
      })(e, ...t, aZ);
    })(nm(e), nm(t));
  }
  function nm(e) {
    var t, i, s, r;
    let a = {};
    if (!im(e)) return a;
    for (let [n, o] of Object.entries(e)) {
      let e = io(n) ? [n] : o.chains,
        c = o.methods || [],
        l = o.events || [],
        h = o.rpcMap || {},
        u = ic(n);
      a[u] = nu(nh(nh({}, a[u]), o), {
        chains: W(e, null == (t = a[u]) ? void 0 : t.chains),
        methods: W(c, null == (i = a[u]) ? void 0 : i.methods),
        events: W(l, null == (s = a[u]) ? void 0 : s.events),
        rpcMap: nh(nh({}, h), null == (r = a[u]) ? void 0 : r.rpcMap),
      });
    }
    return a;
  }
  function nw(e) {
    return e.includes(":") ? e.split(":")[2] : e;
  }
  function ny(e) {
    let t = {};
    for (let [i, s] of Object.entries(e)) {
      let e = s.methods || [],
        r = s.events || [],
        a = s.accounts || [],
        n = io(i) ? [i] : s.chains ? s.chains : ng(s.accounts);
      t[i] = { chains: n, methods: e, events: r, accounts: a };
    }
    return t;
  }
  function nb(e) {
    return "number" == typeof e
      ? e
      : e.includes("0x")
        ? parseInt(e, 16)
        : isNaN(Number((e = e.includes(":") ? e.split(":")[1] : e)))
          ? e
          : Number(e);
  }
  let nv = {},
    nI = (e) => nv[e],
    nE = (e, t) => {
      nv[e] = t;
    };
  var nC = Object.defineProperty,
    nS = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nC(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nA {
    constructor(e) {
      (nS(this, "name", "polkadot"),
        nS(this, "client"),
        nS(this, "httpProviders"),
        nS(this, "events"),
        nS(this, "namespace"),
        nS(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
          let s = np(t);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nP = Object.defineProperty,
    nN = Object.defineProperties,
    n_ = Object.getOwnPropertyDescriptors,
    nx = Object.getOwnPropertySymbols,
    nO = Object.prototype.hasOwnProperty,
    nT = Object.prototype.propertyIsEnumerable,
    nk = (e, t, i) =>
      t in e
        ? nP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    nR = (e, t) => {
      for (var i in t || (t = {})) nO.call(t, i) && nk(e, i, t[i]);
      if (nx) for (var i of nx(t)) nT.call(t, i) && nk(e, i, t[i]);
      return e;
    },
    nU = (e, t, i) => nk(e, "symbol" != typeof t ? t + "" : t, i);
  class nD {
    constructor(e) {
      (nU(this, "name", "eip155"),
        nU(this, "client"),
        nU(this, "chainId"),
        nU(this, "namespace"),
        nU(this, "httpProviders"),
        nU(this, "events"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
        nd(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.t(i, nI("disableProviderPing")));
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
          let s = parseInt(np(t));
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
      let a = this.client.session.get(e.topic),
        n =
          (null == (s = a?.sessionProperties) ? void 0 : s.capabilities) || {};
      if (null != n && n[r]) return n?.[r];
      let o = await this.client.request(e);
      try {
        let t, i, s, c;
        await this.client.session.update(e.topic, {
          sessionProperties:
            ((s = nR({}, a.sessionProperties || {})),
            (c = {
              capabilities:
                ((t = nR({}, n || {})), (i = { [r]: o }), nN(t, n_(i))),
            }),
            nN(s, n_(c))),
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
      let a = null == (i = s.sessionProperties) ? void 0 : i.bundler_url;
      if (a)
        try {
          return await this.getUserOperationReceipt(a, e);
        } catch (e) {
          console.warn("Failed to fetch call status from custom bundler", e, a);
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
            (0, iU.i)("eth_getUserOperationReceipt", [
              null == (i = t.request.params) ? void 0 : i[0],
            ]),
          ),
        });
      if (!r.ok)
        throw Error(`Failed to fetch user operation receipt - ${r.status}`);
      return await r.json();
    }
    getBundlerUrl(e, t) {
      return `${aX}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
    }
  }
  var nL = Object.defineProperty,
    nj = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nL(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class n$ {
    constructor(e) {
      (nj(this, "name", "solana"),
        nj(this, "client"),
        nj(this, "httpProviders"),
        nj(this, "events"),
        nj(this, "namespace"),
        nj(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
          let s = np(t);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nM = Object.defineProperty,
    nq = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nM(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nB {
    constructor(e) {
      (nq(this, "name", "cosmos"),
        nq(this, "client"),
        nq(this, "httpProviders"),
        nq(this, "events"),
        nq(this, "namespace"),
        nq(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${this.chainId}`));
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
          let s = np(t);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nz = Object.defineProperty,
    nH = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nz(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nV {
    constructor(e) {
      (nH(this, "name", "algorand"),
        nH(this, "client"),
        nH(this, "httpProviders"),
        nH(this, "events"),
        nH(this, "namespace"),
        nH(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
          nd(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
        this.setHttpProvider(e, i);
      }
      ((this.chainId = e),
        this.events.emit(aQ, `${this.name}:${this.chainId}`));
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return typeof i > "u"
        ? void 0
        : new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nF = Object.defineProperty,
    nK = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nF(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nW {
    constructor(e) {
      (nK(this, "name", "cip34"),
        nK(this, "client"),
        nK(this, "httpProviders"),
        nK(this, "events"),
        nK(this, "namespace"),
        nK(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${this.chainId}`));
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
            s = np(t);
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
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nG = Object.defineProperty,
    nY = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nG(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nJ {
    constructor(e) {
      (nY(this, "name", "elrond"),
        nY(this, "client"),
        nY(this, "httpProviders"),
        nY(this, "events"),
        nY(this, "namespace"),
        nY(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
          let s = np(t);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var nX = Object.defineProperty,
    nQ = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? nX(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class nZ {
    constructor(e) {
      (nQ(this, "name", "multiversx"),
        nQ(this, "client"),
        nQ(this, "httpProviders"),
        nQ(this, "events"),
        nQ(this, "namespace"),
        nQ(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
          let s = np(t);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var n0 = Object.defineProperty,
    n1 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? n0(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class n2 {
    constructor(e) {
      (n1(this, "name", "near"),
        n1(this, "client"),
        n1(this, "httpProviders"),
        n1(this, "events"),
        n1(this, "namespace"),
        n1(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        let i = t || nd(`${this.name}:${e}`, this.namespace);
        this.setHttpProvider(e, i);
      }
      this.events.emit(aQ, `${this.name}:${this.chainId}`);
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
      let i = t || nd(e, this.namespace);
      return typeof i > "u"
        ? void 0
        : new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var n5 = Object.defineProperty,
    n3 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? n5(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class n8 {
    constructor(e) {
      (n3(this, "name", "tezos"),
        n3(this, "client"),
        n3(this, "httpProviders"),
        n3(this, "events"),
        n3(this, "namespace"),
        n3(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        let i = t || nd(`${this.name}:${e}`, this.namespace);
        this.setHttpProvider(e, i);
      }
      this.events.emit(aQ, `${this.name}:${this.chainId}`);
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
      let i = t || nd(e, this.namespace);
      return typeof i > "u" ? void 0 : new iR.f(new aK.U(i));
    }
  }
  var n6 = Object.defineProperty,
    n4 = (e, t, i) => {
      let s;
      return (s = "symbol" != typeof t ? t + "" : t) in e
        ? n6(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[s] = i);
    };
  class n9 {
    constructor(e) {
      (n4(this, "name", aJ),
        n4(this, "client"),
        n4(this, "httpProviders"),
        n4(this, "events"),
        n4(this, "namespace"),
        n4(this, "chainId"),
        (this.namespace = e.namespace),
        (this.events = nI("events")),
        (this.client = nI("client")),
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
        this.events.emit(aQ, `${this.name}:${e}`));
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
            let t = A(e);
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
      let i = t || nd(e, this.namespace, this.client.core.projectId);
      return new iR.f(new aK.U(i, nI("disableProviderPing")));
    }
  }
  var n7 = Object.defineProperty,
    oe = Object.defineProperties,
    ot = Object.getOwnPropertyDescriptors,
    oi = Object.getOwnPropertySymbols,
    os = Object.prototype.hasOwnProperty,
    or = Object.prototype.propertyIsEnumerable,
    oa = (e, t, i) =>
      t in e
        ? n7(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    on = (e, t) => {
      for (var i in t || (t = {})) os.call(t, i) && oa(e, i, t[i]);
      if (oi) for (var i of oi(t)) or.call(t, i) && oa(e, i, t[i]);
      return e;
    },
    oo = (e, t, i) => oa(e, "symbol" != typeof t ? t + "" : t, i);
  (e.s(
    [
      "f",
      0,
      class e {
        constructor(e) {
          (oo(this, "client"),
            oo(this, "namespaces"),
            oo(this, "optionalNamespaces"),
            oo(this, "sessionProperties"),
            oo(this, "scopedProperties"),
            oo(this, "events", new a.default()),
            oo(this, "rpcProviders", {}),
            oo(this, "session"),
            oo(this, "providerOpts"),
            oo(this, "logger"),
            oo(this, "uri"),
            oo(this, "disableProviderPing", !1),
            (this.providerOpts = e),
            (this.logger =
              "u" > typeof e?.logger && "string" != typeof e?.logger
                ? e.logger
                : (0, l.pino)((0, c.l)({ level: e?.logger || aW }))),
            (this.disableProviderPing = e?.disableProviderPing || !1));
        }
        static async init(t) {
          let i = new e(t);
          return (await i.initialize(), i);
        }
        async request(e, t, i) {
          let [s, r] = this.validateChain(t);
          if (!this.session)
            throw Error("Please call connect() before request()");
          return await this.getProvider(s).request({
            request: on({}, e),
            chainId: `${s}:${r}`,
            topic: this.session.topic,
            expiry: i,
          });
        }
        sendAsync(e, t, i, s) {
          let r = new Date().getTime();
          this.request(e, i, s)
            .then((e) => t(null, (0, iU.P)(r, e)))
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
                scopedProperties: this.scopedProperties,
              })),
            await this.requestAccounts()
          );
        }
        async disconnect() {
          var e;
          if (!this.session)
            throw Error("Please call connect() before enable()");
          (await this.client.disconnect({
            topic: null == (e = this.session) ? void 0 : e.topic,
            reason: ip("USER_DISCONNECTED"),
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
            let e = ny(this.session.namespaces);
            ((this.namespaces = nf(this.namespaces, e)),
              await this.persist("namespaces", this.namespaces),
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
            scopedProperties: this.scopedProperties,
          });
          t && ((this.uri = t), this.events.emit("display_uri", t));
          let s = await i();
          this.session = s;
          let r = ny(s.namespaces);
          return (
            (this.namespaces = nf(this.namespaces, r)),
            await this.persist("namespaces", this.namespaces),
            await this.persist("optionalNamespaces", this.optionalNamespaces),
            this.onConnect(),
            this.session
          );
        }
        setDefaultChain(e, t) {
          try {
            if (!this.session) return;
            let [i, s] = this.validateChain(e),
              r = this.getProvider(i);
            r.name === aJ
              ? r.setDefaultChain(`${i}:${s}`, t)
              : r.setDefaultChain(s, t);
          } catch (e) {
            if (!/Please call connect/.test(e.message)) throw e;
          }
        }
        async cleanupPendingPairings(e = {}) {
          this.logger.info("Cleaning up inactive pairings...");
          let t = this.client.pairing.getAll();
          if (ig(t)) {
            for (let i of t)
              e.deletePairings
                ? this.client.core.expirer.set(i.topic, 0)
                : await this.client.core.relayer.subscriber.unsubscribe(
                    i.topic,
                  );
            this.logger.info(`Inactive pairings cleared: ${t.length}`);
          }
        }
        abortPairingAttempt() {
          this.logger.warn(
            "abortPairingAttempt is deprecated. This is now a no-op.",
          );
        }
        async checkStorage() {
          ((this.namespaces = (await this.getFromStore("namespaces")) || {}),
            (this.optionalNamespaces =
              (await this.getFromStore("optionalNamespaces")) || {}),
            this.session && this.createProviders());
        }
        async initialize() {
          (this.logger.trace("Initialized"),
            await this.createClient(),
            await this.checkStorage(),
            this.registerEventListeners());
        }
        async createClient() {
          var e, t;
          if (
            ((this.client =
              this.providerOpts.client ||
              (await aF.init({
                core: this.providerOpts.core,
                logger: this.providerOpts.logger || aW,
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
            this.providerOpts.session)
          )
            try {
              this.session = this.client.session.get(
                this.providerOpts.session.topic,
              );
            } catch (i) {
              throw (
                this.logger.error("Failed to get session", i),
                Error(
                  `The provided session: ${null == (t = null == (e = this.providerOpts) ? void 0 : e.session) ? void 0 : t.topic} doesn't exist in the Sign client`,
                )
              );
            }
          else {
            let e = this.client.session.getAll();
            this.session = e[0];
          }
          this.logger.trace("SignClient Initialized");
        }
        createProviders() {
          if (!this.client) throw Error("Sign Client not initialized");
          if (!this.session)
            throw Error(
              "Session not initialized. Please call connect() before enable()",
            );
          let e = [
            ...new Set(Object.keys(this.session.namespaces).map((e) => ic(e))),
          ];
          (nE("client", this.client),
            nE("events", this.events),
            nE("disableProviderPing", this.disableProviderPing),
            e.forEach((e) => {
              if (!this.session) return;
              let t = (function (e, t) {
                  let i = Object.keys(t.namespaces).filter((t) =>
                    t.includes(e),
                  );
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
                i = ng(t),
                s = oe(
                  on({}, nf(this.namespaces, this.optionalNamespaces)[e]),
                  ot({ accounts: t, chains: i }),
                );
              switch (e) {
                case "eip155":
                  this.rpcProviders[e] = new nD({ namespace: s });
                  break;
                case "algorand":
                  this.rpcProviders[e] = new nV({ namespace: s });
                  break;
                case "solana":
                  this.rpcProviders[e] = new n$({ namespace: s });
                  break;
                case "cosmos":
                  this.rpcProviders[e] = new nB({ namespace: s });
                  break;
                case "polkadot":
                  this.rpcProviders[e] = new nA({ namespace: s });
                  break;
                case "cip34":
                  this.rpcProviders[e] = new nW({ namespace: s });
                  break;
                case "elrond":
                  this.rpcProviders[e] = new nJ({ namespace: s });
                  break;
                case "multiversx":
                  this.rpcProviders[e] = new nZ({ namespace: s });
                  break;
                case "near":
                  this.rpcProviders[e] = new n2({ namespace: s });
                  break;
                case "tezos":
                  this.rpcProviders[e] = new n8({ namespace: s });
                  break;
                default:
                  this.rpcProviders[aJ]
                    ? this.rpcProviders[aJ].updateNamespace(s)
                    : (this.rpcProviders[aJ] = new n9({ namespace: s }));
              }
            }));
        }
        registerEventListeners() {
          if (typeof this.client > "u")
            throw Error("Sign Client is not initialized");
          (this.client.on("session_ping", (e) => {
            var t;
            let { topic: i } = e;
            i === (null == (t = this.session) ? void 0 : t.topic) &&
              this.events.emit("session_ping", e);
          }),
            this.client.on("session_event", (e) => {
              var t;
              let { params: i, topic: s } = e;
              if (s !== (null == (t = this.session) ? void 0 : t.topic)) return;
              let { event: r } = i;
              if ("accountsChanged" === r.name) {
                let e = r.data;
                e && ig(e) && this.events.emit("accountsChanged", e.map(nw));
              } else if ("chainChanged" === r.name) {
                let e = i.chainId,
                  t = i.event.data,
                  s = ic(e),
                  r = nb(e) !== nb(t) ? `${s}:${nb(t)}` : e;
                this.onChainChanged(r);
              } else this.events.emit(r.name, r.data);
              this.events.emit("session_event", e);
            }),
            this.client.on("session_update", ({ topic: e, params: t }) => {
              var i, s;
              if (e !== (null == (i = this.session) ? void 0 : i.topic)) return;
              let { namespaces: r } = t,
                a = null == (s = this.client) ? void 0 : s.session.get(e);
              ((this.session = oe(on({}, a), ot({ namespaces: r }))),
                this.onSessionUpdate(),
                this.events.emit("session_update", { topic: e, params: t }));
            }),
            this.client.on("session_delete", async (e) => {
              var t;
              e.topic === (null == (t = this.session) ? void 0 : t.topic) &&
                (await this.cleanup(),
                this.events.emit("session_delete", e),
                this.events.emit(
                  "disconnect",
                  oe(on({}, ip("USER_DISCONNECTED")), ot({ data: e.topic })),
                ));
            }),
            this.on(aQ, (e) => {
              this.onChainChanged(e, !0);
            }));
        }
        getProvider(e) {
          return this.rpcProviders[e] || this.rpcProviders[aJ];
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
          let {
            namespaces: t,
            optionalNamespaces: i,
            sessionProperties: s,
            scopedProperties: r,
          } = e;
          (t && Object.keys(t).length && (this.namespaces = t),
            i && Object.keys(i).length && (this.optionalNamespaces = i),
            (this.sessionProperties = s),
            (this.scopedProperties = r));
        }
        validateChain(e) {
          let [t, i] = e?.split(":") || ["", ""];
          if (!this.namespaces || !Object.keys(this.namespaces).length)
            return [t, i];
          if (
            t &&
            !Object.keys(this.namespaces || {})
              .map((e) => ic(e))
              .includes(t)
          )
            throw Error(
              `Namespace '${t}' is not configured. Please call connect() first with namespace config.`,
            );
          if (t && i) return [t, i];
          let s = ic(Object.keys(this.namespaces)[0]),
            r = this.rpcProviders[s].getDefaultChain();
          return [s, r];
        }
        async requestAccounts() {
          let [e] = this.validateChain();
          return await this.getProvider(e).requestAccounts();
        }
        async onChainChanged(e, t = !1) {
          if (!this.namespaces) return;
          let [i, s] = this.validateChain(e);
          s &&
            (t || this.getProvider(i).setDefaultChain(s),
            this.namespaces[i]
              ? (this.namespaces[i].defaultChain = s)
              : this.namespaces[`${i}:${s}`]
                ? (this.namespaces[`${i}:${s}`].defaultChain = s)
                : (this.namespaces[`${i}:${s}`] = { defaultChain: s }),
            this.events.emit("chainChanged", s),
            await this.persist("namespaces", this.namespaces));
        }
        onConnect() {
          (this.createProviders(),
            this.events.emit("connect", { session: this.session }));
        }
        async cleanup() {
          ((this.namespaces = void 0),
            (this.optionalNamespaces = void 0),
            (this.sessionProperties = void 0),
            await this.deleteFromStore("namespaces"),
            await this.deleteFromStore("optionalNamespaces"),
            await this.deleteFromStore("sessionProperties"),
            (this.session = void 0),
            await this.cleanupPendingPairings({ deletePairings: !0 }),
            await this.cleanupStorage());
        }
        async persist(e, t) {
          var i;
          let s = (null == (i = this.session) ? void 0 : i.topic) || "";
          await this.client.core.storage.setItem(`${aG}/${e}${s}`, t);
        }
        async getFromStore(e) {
          var t;
          let i = (null == (t = this.session) ? void 0 : t.topic) || "";
          return await this.client.core.storage.getItem(`${aG}/${e}${i}`);
        }
        async deleteFromStore(e) {
          var t;
          let i = (null == (t = this.session) ? void 0 : t.topic) || "";
          await this.client.core.storage.removeItem(`${aG}/${e}${i}`);
        }
        async cleanupStorage() {
          var e;
          try {
            if ((null == (e = this.client) ? void 0 : e.session.length) > 0)
              return;
            for (let e of await this.client.core.storage.getKeys())
              e.startsWith(aG) &&
                (await this.client.core.storage.removeItem(e));
          } catch (e) {
            this.logger.warn("Failed to cleanup storage", e);
          }
        }
      },
    ],
    165636,
  ),
    void 0 !== g.default &&
      void 0 !== g.default.env &&
      g.default.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL,
    void 0 !== g.default &&
      void 0 !== g.default.env &&
      g.default.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL,
    void 0 !== g.default &&
      void 0 !== g.default.env &&
      g.default.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION,
    e.s(
      [
        "f",
        0,
        {
          SAFE_RPC_METHODS: [
            "eth_accounts",
            "eth_blockNumber",
            "eth_call",
            "eth_chainId",
            "eth_estimateGas",
            "eth_feeHistory",
            "eth_gasPrice",
            "eth_getAccount",
            "eth_getBalance",
            "eth_getBlockByHash",
            "eth_getBlockByNumber",
            "eth_getBlockReceipts",
            "eth_getBlockTransactionCountByHash",
            "eth_getBlockTransactionCountByNumber",
            "eth_getCode",
            "eth_getFilterChanges",
            "eth_getFilterLogs",
            "eth_getLogs",
            "eth_getProof",
            "eth_getStorageAt",
            "eth_getTransactionByBlockHashAndIndex",
            "eth_getTransactionByBlockNumberAndIndex",
            "eth_getTransactionByHash",
            "eth_getTransactionCount",
            "eth_getTransactionReceipt",
            "eth_getUncleCountByBlockHash",
            "eth_getUncleCountByBlockNumber",
            "eth_maxPriorityFeePerGas",
            "eth_newBlockFilter",
            "eth_newFilter",
            "eth_newPendingTransactionFilter",
            "eth_sendRawTransaction",
            "eth_syncing",
            "eth_uninstallFilter",
            "wallet_getCapabilities",
            "wallet_getCallsStatus",
            "eth_getUserOperationReceipt",
            "eth_estimateUserOperationGas",
            "eth_getUserOperationByHash",
            "eth_supportedEntryPoints",
            "wallet_getAssets",
          ],
          NOT_SAFE_RPC_METHODS: [
            "personal_sign",
            "eth_signTypedData_v4",
            "eth_sendTransaction",
            "solana_signMessage",
            "solana_signTransaction",
            "solana_signAllTransactions",
            "solana_signAndSendTransaction",
            "wallet_sendCalls",
            "wallet_grantPermissions",
            "wallet_revokePermissions",
            "eth_sendUserOperation",
          ],
          GET_CHAIN_ID: "eth_chainId",
          RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
          RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
          ACCOUNT_TYPES: { EOA: "eoa", SMART_ACCOUNT: "smartAccount" },
        },
      ],
      793884,
    ));
};
