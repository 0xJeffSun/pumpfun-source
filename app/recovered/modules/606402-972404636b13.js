// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r,
    n = e.i(785373);
  class a extends Error {
    constructor(e, t) {
      (super(e), (this.error = t));
    }
  }
  class i extends a {
    constructor() {
      (super(...arguments), (this.name = "WalletNotConnectedError"));
    }
  }
  class s extends a {
    constructor() {
      (super(...arguments), (this.name = "WalletSendTransactionError"));
    }
  }
  class f extends a {
    constructor() {
      (super(...arguments), (this.name = "WalletSignTransactionError"));
    }
  }
  (e.s(
    [
      "W",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletAccountError"));
        }
      },
      "O",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletConfigError"));
        }
      },
      "K",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletConnectionError"));
        }
      },
      "h",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletDisconnectedError"));
        }
      },
      "M",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletDisconnectionError"));
        }
      },
      "X",
      0,
      a,
      "s",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletLoadError"));
        }
      },
      "t",
      0,
      i,
      "F",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletNotReadyError"));
        }
      },
      "r",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletPublicKeyError"));
        }
      },
      "E",
      0,
      s,
      "i",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletSignInError"));
        }
      },
      "J",
      0,
      class extends a {
        constructor() {
          (super(...arguments), (this.name = "WalletSignMessageError"));
        }
      },
      "I",
      0,
      f,
      "G",
      0,
      class extends a {
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
  class o extends n.f {
    get connected() {
      return !!this.publicKey;
    }
    async autoConnect() {
      await this.connect();
    }
    async prepareTransaction(e, t, r = {}) {
      let n = this.publicKey;
      if (!n) throw new i();
      return (
        (e.feePayer = e.feePayer || n),
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
  function c(e) {
    return "version" in e;
  }
  (e.s(
    [
      "C",
      0,
      o,
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
        let n = setInterval(r, 1e3);
        (t.push(() => clearInterval(n)),
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
    e.s(["f", 0, c], 178610));
  class l extends o {
    async sendTransaction(e, t, r = {}) {
      let n = !0;
      try {
        if (c(e)) {
          if (!this.supportedTransactionVersions)
            throw new s(
              "Sending versioned transactions isn't supported by this wallet",
            );
          if (!this.supportedTransactionVersions.has(e.version))
            throw new s(
              `Sending transaction version ${e.version} isn't supported by this wallet`,
            );
          try {
            let n = (e = await this.signTransaction(e)).serialize();
            return await t.sendRawTransaction(n, r);
          } catch (e) {
            if (e instanceof f) throw ((n = !1), e);
            throw new s(e?.message, e);
          }
        }
        try {
          let { signers: n, ...a } = r;
          ((e = await this.prepareTransaction(e, t, a)),
            n?.length && e.partialSign(...n));
          let i = (e = await this.signTransaction(e)).serialize();
          return await t.sendRawTransaction(i, a);
        } catch (e) {
          if (e instanceof f) throw ((n = !1), e);
          throw new s(e?.message, e);
        }
      } catch (e) {
        throw (n && this.emit("error", e), e);
      }
    }
    async signAllTransactions(e) {
      for (let t of e)
        if (c(t)) {
          if (!this.supportedTransactionVersions)
            throw new f(
              "Signing versioned transactions isn't supported by this wallet",
            );
          if (!this.supportedTransactionVersions.has(t.version))
            throw new f(
              `Signing transaction version ${t.version} isn't supported by this wallet`,
            );
        }
      let t = [];
      for (let r of e) t.push(await this.signTransaction(r));
      return t;
    }
  }
  class d extends l {}
  e.s(["m", 0, d, "a", 0, class extends d {}, "L", 0, l], 606402);
};
