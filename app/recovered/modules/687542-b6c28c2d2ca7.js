// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(544311),
    i = e.i(243274);
  let s = "custom_context";
  class r {
    constructor(e) {
      ((this.nodeValue = e),
        (this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length),
        (this.next = null));
    }
    get value() {
      return this.nodeValue;
    }
    get size() {
      return this.sizeInBytes;
    }
  }
  class a {
    constructor(e) {
      ((this.head = null),
        (this.tail = null),
        (this.lengthInNodes = 0),
        (this.maxSizeInBytes = e),
        (this.sizeInBytes = 0));
    }
    append(e) {
      let t = new r(e);
      if (t.size > this.maxSizeInBytes)
        throw Error(
          `[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`,
        );
      for (; this.size + t.size > this.maxSizeInBytes; ) this.shift();
      (this.head ? this.tail && (this.tail.next = t) : (this.head = t),
        (this.tail = t),
        this.lengthInNodes++,
        (this.sizeInBytes += t.size));
    }
    shift() {
      if (!this.head) return;
      let e = this.head;
      ((this.head = this.head.next),
        this.head || (this.tail = null),
        this.lengthInNodes--,
        (this.sizeInBytes -= e.size));
    }
    toArray() {
      let e = [],
        t = this.head;
      for (; null !== t; ) (e.push(t.value), (t = t.next));
      return e;
    }
    get length() {
      return this.lengthInNodes;
    }
    get size() {
      return this.sizeInBytes;
    }
    toOrderedArray() {
      return Array.from(this);
    }
    [Symbol.iterator]() {
      let e = this.head;
      return {
        next: () => {
          if (!e) return { done: !0, value: null };
          let t = e.value;
          return ((e = e.next), { done: !1, value: t });
        },
      };
    }
  }
  class n {
    constructor(e, i = 1024e3) {
      ((this.level = e ?? "error"),
        (this.levelValue = t.levels.values[this.level]),
        (this.MAX_LOG_SIZE_IN_BYTES = i),
        (this.logs = new a(this.MAX_LOG_SIZE_IN_BYTES)));
    }
    forwardToConsole(e, i) {
      i === t.levels.values.error
        ? console.error(e)
        : i === t.levels.values.warn
          ? console.warn(e)
          : i === t.levels.values.debug
            ? console.debug(e)
            : i === t.levels.values.trace
              ? console.trace(e)
              : console.log(e);
    }
    appendToLogs(e) {
      this.logs.append(
        (0, i.I)({ timestamp: new Date().toISOString(), log: e }),
      );
      let t = "string" == typeof e ? JSON.parse(e).level : e.level;
      t >= this.levelValue && this.forwardToConsole(e, t);
    }
    getLogs() {
      return this.logs;
    }
    clearLogs() {
      this.logs = new a(this.MAX_LOG_SIZE_IN_BYTES);
    }
    getLogArray() {
      return Array.from(this.logs);
    }
    logsToBlob(e) {
      let t = this.getLogArray();
      return (
        t.push((0, i.I)({ extraMetadata: e })),
        new Blob(t, { type: "application/json" })
      );
    }
  }
  class o {
    constructor(e, t = 1024e3) {
      this.baseChunkLogger = new n(e, t);
    }
    write(e) {
      this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
      return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
      this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
      return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
      return this.baseChunkLogger.logsToBlob(e);
    }
    downloadLogsBlobInBrowser(e) {
      let t = URL.createObjectURL(this.logsToBlob(e)),
        i = document.createElement("a");
      ((i.href = t),
        (i.download = `walletconnect-logs-${new Date().toISOString()}.txt`),
        document.body.appendChild(i),
        i.click(),
        document.body.removeChild(i),
        URL.revokeObjectURL(t));
    }
  }
  class c {
    constructor(e, t = 1024e3) {
      this.baseChunkLogger = new n(e, t);
    }
    write(e) {
      this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
      return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
      this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
      return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
      return this.baseChunkLogger.logsToBlob(e);
    }
  }
  var l = Object.defineProperty,
    h = Object.defineProperties,
    u = Object.getOwnPropertyDescriptors,
    d = Object.getOwnPropertySymbols,
    p = Object.prototype.hasOwnProperty,
    g = Object.prototype.propertyIsEnumerable,
    f = (e, t, i) =>
      t in e
        ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    m = (e, t) => {
      for (var i in t || (t = {})) p.call(t, i) && f(e, i, t[i]);
      if (d) for (var i of d(t)) g.call(t, i) && f(e, i, t[i]);
      return e;
    };
  function w(e, t = s) {
    return typeof e.bindings > "u"
      ? (function (e, t = s) {
          return e[t] || "";
        })(e, t)
      : e.bindings().context || "";
  }
  (e.s(
    [
      "v",
      0,
      function (e, t, i = s) {
        let r = (function (e, t, i = s) {
          let r = w(e, i);
          return r.trim() ? `${r}/${t}` : t;
        })(e, t, i);
        return (function (e, t, i = s) {
          return ((e[i] = t), e);
        })(e.child({ context: r }), r, i);
      },
      "z",
      0,
      function (e) {
        var i, s, r, a;
        let n, l, d, p;
        return "u" > typeof e.loggerOverride &&
          "string" != typeof e.loggerOverride
          ? { logger: e.loggerOverride, chunkLoggerController: null }
          : "u" > typeof window
            ? ((p = new o(
                null == (r = (s = e).opts) ? void 0 : r.level,
                s.maxSizeInBytes,
              )),
              {
                logger: (0, t.default)(
                  ((l = m({}, s.opts)),
                  (d = {
                    level: "trace",
                    browser: h(
                      m({}, null == (a = s.opts) ? void 0 : a.browser),
                      u({ write: (e) => p.write(e) }),
                    ),
                  }),
                  h(l, u(d))),
                ),
                chunkLoggerController: p,
              })
            : ((n = new c(
                null == (i = e.opts) ? void 0 : i.level,
                e.maxSizeInBytes,
              )),
              {
                logger: (0, t.default)(
                  h(m({}, e.opts), u({ level: "trace" })),
                  n,
                ),
                chunkLoggerController: n,
              });
      },
      "l",
      0,
      function (e) {
        return h(m({}, e), u({ level: e?.level || "info" }));
      },
      "u",
      0,
      w,
    ],
    687542,
  ),
    e.s(["pino", () => t.default], 770749));
};
