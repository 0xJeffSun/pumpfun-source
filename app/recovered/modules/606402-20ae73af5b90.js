// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    s = e.i(785373);
  class n extends Error {
    constructor(e, t) {
      (super(e), (this.error = t));
    }
  }
  class o extends n {
    constructor() {
      (super(...arguments), (this.name = "WalletNotConnectedError"));
    }
  }
  class i extends n {
    constructor() {
      (super(...arguments), (this.name = "WalletSendTransactionError"));
    }
  }
  class a extends n {
    constructor() {
      (super(...arguments), (this.name = "WalletSignTransactionError"));
    }
  }
  (e.s(
    [
      "W",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletAccountError"));
        }
      },
      "O",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletConfigError"));
        }
      },
      "K",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletConnectionError"));
        }
      },
      "h",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletDisconnectedError"));
        }
      },
      "M",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletDisconnectionError"));
        }
      },
      "X",
      0,
      n,
      "s",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletLoadError"));
        }
      },
      "t",
      0,
      o,
      "F",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletNotReadyError"));
        }
      },
      "r",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletPublicKeyError"));
        }
      },
      "E",
      0,
      i,
      "i",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletSignInError"));
        }
      },
      "J",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletSignMessageError"));
        }
      },
      "I",
      0,
      a,
      "G",
      0,
      class extends n {
        constructor() {
          (super(...arguments), (this.name = "WalletWindowClosedError"));
        }
      },
    ],
    142309,
  ),
    ((t = r || (r = {})).Installed = "Installed"),
    (t.NotDetected = "NotDetected"),
    (t.Loadable = "Loadable"),
    (t.Unsupported = "Unsupported"));
  class c extends s.f {
    get connected() {
      return !!this.publicKey;
    }
    async autoConnect() {
      await this.connect();
    }
    async prepareTransaction(e, t, r = {}) {
      let s = this.publicKey;
      if (!s) throw new o();
      return (
        (e.feePayer = e.feePayer || s),
        (e.recentBlockhash =
          e.recentBlockhash ||
          (
            await t.getLatestBlockhash({
              commitment: r.preflightCommitment,
              minContextSlot: r.minContextSlot,
            })
          ).blockhash),
        e
      );
    }
  }
  function l(e) {
    return "version" in e;
  }
  (e.s(
    [
      "C",
      0,
      c,
      "m",
      0,
      r,
      "V",
      0,
      function () {
        let e = navigator.userAgent.toLowerCase(),
          t = e.includes("iphone") || e.includes("ipad"),
          r = e.includes("safari");
        return t && r;
      },
      "b",
      0,
      function (e) {
        if ("u" < typeof window || "u" < typeof document) return;
        let t = [];
        function r() {
          if (e()) for (let e of t) e();
        }
        let s = setInterval(r, 1e3);
        (t.push(() => clearInterval(s)),
          "loading" === document.readyState &&
            (document.addEventListener("DOMContentLoaded", r, { once: !0 }),
            t.push(() => document.removeEventListener("DOMContentLoaded", r))),
          "complete" !== document.readyState &&
            (window.addEventListener("load", r, { once: !0 }),
            t.push(() => window.removeEventListener("load", r))),
          r());
      },
    ],
    712771,
  ),
    e.s(["f", 0, l], 178610));
  class u extends c {
    async sendTransaction(e, t, r = {}) {
      let s = !0;
      try {
        if (l(e)) {
          if (!this.supportedTransactionVersions)
            throw new i(
              "Sending versioned transactions isn't supported by this wallet",
            );
          if (!this.supportedTransactionVersions.has(e.version))
            throw new i(
              `Sending transaction version ${e.version} isn't supported by this wallet`,
            );
          try {
            let s = (e = await this.signTransaction(e)).serialize();
            return await t.sendRawTransaction(s, r);
          } catch (e) {
            if (e instanceof a) throw ((s = !1), e);
            throw new i(e?.message, e);
          }
        }
        try {
          let { signers: s, ...n } = r;
          ((e = await this.prepareTransaction(e, t, n)),
            s?.length && e.partialSign(...s));
          let o = (e = await this.signTransaction(e)).serialize();
          return await t.sendRawTransaction(o, n);
        } catch (e) {
          if (e instanceof a) throw ((s = !1), e);
          throw new i(e?.message, e);
        }
      } catch (e) {
        throw (s && this.emit("error", e), e);
      }
    }
    async signAllTransactions(e) {
      for (let t of e)
        if (l(t)) {
          if (!this.supportedTransactionVersions)
            throw new a(
              "Signing versioned transactions isn't supported by this wallet",
            );
          if (!this.supportedTransactionVersions.has(t.version))
            throw new a(
              `Signing transaction version ${t.version} isn't supported by this wallet`,
            );
        }
      let t = [];
      for (let r of e) t.push(await this.signTransaction(r));
      return t;
    }
  }
  class h extends u {}
  e.s(["m", 0, h, "a", 0, class extends h {}, "L", 0, u], 606402);
};
