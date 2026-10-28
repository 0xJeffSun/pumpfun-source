// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(447700),
    r = e.i(658103);
  let n = (e) => {
      try {
        return JSON.stringify(e, (e, t) =>
          t instanceof Error
            ? {
                ...t,
                name: t.name,
                message: t.message,
                ...(t.stack ? { stack: t.stack.slice(0, 1500) } : {}),
              }
            : t,
        );
      } catch {
        return '{"context":"[unserializable]"}';
      }
    },
    o = 60;
  var i = e.i(259506);
  class s {
    consoleLoggingEnabled = !1;
    serverLogBudget = ((e = o) => {
      let t = new Map();
      return {
        admit(r, n) {
          if (!(t.size <= 512))
            for (let [e, r] of t) n - r.startedAt >= 6e4 && t.delete(e);
          let o = t.get(r);
          if (!o || n - o.startedAt >= 6e4)
            return (t.set(r, { startedAt: n, count: 1 }), "admit");
          let i = o.count + 1;
          return (t.set(r, { startedAt: o.startedAt, count: i }), i <= e)
            ? "admit"
            : i === e + 1
              ? "notice"
              : "drop";
        },
      };
    })();
    sourcePackage = t.R;
    userAddress;
    userId;
    logLevel = t.d.INFO;
    setUserIdentity({ address: e, userId: t }) {
      ((this.userAddress = e), (this.userId = t));
    }
    clearUserIdentity() {
      ((this.userAddress = void 0), (this.userId = void 0));
    }
    shouldLog(e) {
      return e >= this.logLevel;
    }
    init({ sourcePackage: e, ...t }) {
      (e && (this.sourcePackage = e),
        t.forwardConsoleLogs &&
          t.forwardConsoleLogs.length > 0 &&
          (this.consoleLoggingEnabled = !1),
        i.f && r.f.init(t));
    }
    getEnrichedContext(e) {
      return {
        ...e,
        source: this.sourcePackage,
        ...(this.userAddress ? { userAddress: this.userAddress } : {}),
        ...(this.userId ? { userId: this.userId } : {}),
      };
    }
    getConsoleArgs(e, t, r) {
      let n = [`[${e.toUpperCase()}] ${t}`];
      return (r && Object.keys(r).length > 0 && n.push(r), n);
    }
    log(e, n, o) {
      let s = this.getEnrichedContext(o);
      if (this.consoleLoggingEnabled) {
        let t = this.getConsoleArgs(e, n, o);
        console.log(t[0], ...t.slice(1));
      }
      let a = "*" === e ? s : { ...s, logGroup: e };
      i.f && this.shouldLog(t.d.INFO) && r.f.logger.info(n, a);
    }
    info(e, n) {
      let o = this.getEnrichedContext(n);
      if (this.consoleLoggingEnabled) {
        let t = this.getConsoleArgs("info", e, n);
        console.info(t[0], ...t.slice(1));
      }
      i.f && this.shouldLog(t.d.INFO) && r.f.logger.info(e, o);
    }
    warn(e, n) {
      let o = this.getEnrichedContext(n);
      if (this.consoleLoggingEnabled) {
        let t = this.getConsoleArgs("warn", e, n);
        console.warn(t[0], ...t.slice(1));
      }
      (i.f && this.shouldLog(t.d.WARN) && r.f.logger.warn(e, o),
        this.writeServerLog("warn", e, o));
    }
    error(e, n) {
      let o = this.getEnrichedContext(n);
      if (this.consoleLoggingEnabled) {
        let t = this.getConsoleArgs("error", e, n);
        console.error(t[0], ...t.slice(1));
      }
      (i.f && this.shouldLog(t.d.ERROR) && r.f.logger.error(e, o),
        this.writeServerLog("error", e, o));
    }
    writeServerLog(e, r, s) {
      if (i.f || this.consoleLoggingEnabled) return;
      let a = "error" === e ? t.d.ERROR : t.d.WARN;
      if (!this.shouldLog(a)) return;
      let l = this.serverLogBudget.admit(`${e}|${r}`, Date.now());
      if ("drop" === l) return;
      if ("notice" === l)
        return void console.warn(
          `Server log budget exhausted for "${r}" ${n({ level: e, limitPerMinute: o, source: this.sourcePackage })}`,
        );
      let u = `${r} ${n(s)}`;
      "error" === e ? console.error(u) : console.warn(u);
    }
    debug(e, n) {
      let o = this.getEnrichedContext(n);
      if (this.consoleLoggingEnabled) {
        let t = this.getConsoleArgs("debug", e, n);
        console.debug(t[0], ...t.slice(1));
      }
      i.f && this.shouldLog(t.d.DEBUG) && r.f.logger.debug(e, o);
    }
  }
  let a = new s();
  e.s(["v", 0, s, "y", 0, a], 254667);
};
